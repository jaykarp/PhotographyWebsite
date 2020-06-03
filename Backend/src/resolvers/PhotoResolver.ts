import {
    Resolver,
    Query,
    Mutation,
    UseMiddleware,
    Arg,
    Int
    //Ctx
} from "type-graphql";
import { Photo } from "../entity/Photo";
import { isAuth } from "../resolvers/isAuthMiddleware";
//import { Context } from "src/Context";
import { getS3Url } from "../s3";

@Resolver()
export default class PhotoResolver {
    @Query(() => [Photo])
    async photos() {
        return await Photo.find().then(p =>
            p.map(async p => {
                if (!p) throw "Could not get Photos";
                p.url = await getS3Url(p.url, 60);
                return p;
            })
        );
    }

    @Query(() => Photo, { nullable: true })
    async photo(@Arg("id", () => Int) id: number) {
        return await Photo.findOne({ id }).then(async p => {
            if (!p) throw "Could Not Find Photo ID";
            p.url = await getS3Url(p.url, 60);
            return p;
        });
    }

    @Query(() => [Photo])
    async birdPhotos() {
        let photos = await Photo.find();
        photos = photos.filter(p => p.category === "Birds");
        return photos.map(async p => {
            if (!p) throw "Could Not Find Photo ID";
            p.url = await getS3Url(p.url, 60);
            return p;
        });
    }

    @Query(() => [Photo])
    async wildlifePhotos() {
        let photos = await Photo.find();
        photos = photos.filter(p => p.category === "Wildlife");
        return photos.map(async p => {
            if (!p) throw "Could Not Find Photo ID";
            p.url = await getS3Url(p.url, 60);
            return p;
        });
    }

    @Query(() => [Photo])
    async naturePhotos() {
        let photos = await Photo.find();
        photos = photos.filter(p => p.category === "nature");
        return photos.map(async p => {
            if (!p) throw "Could Not Find Photo ID";
            p.url = await getS3Url(p.url, 60);
            return p;
        });
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async addPhoto(
        @Arg("url") url: string,
        @Arg("category") category: string,
        @Arg("name") name: string,
        @Arg("description") description: string,
        @Arg("date") date: string
    ) {
        try {
            await Photo.insert({
                url,
                category,
                name,
                description,
                date
            });
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }
}
