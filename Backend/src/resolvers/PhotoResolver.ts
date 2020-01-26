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

@Resolver()
export default class PhotoResolver {
    @Query(() => [Photo])
    async photos() {
        return await Photo.find();
    }

    @Query(() => Photo, { nullable: true })
    async photo(@Arg("id", () => Int) id: number) {
        return await Photo.findOne({
            id
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
