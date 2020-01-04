import {
    Resolver,
    Query,
    Mutation,
    Arg,
    ObjectType,
    Field,
    Ctx,
    UseMiddleware,
    Int
} from "type-graphql";
import { User } from "./entity/User";
import * as argon2 from "argon2";
import { Context } from "src/Context";
import { createRefreshToken, createAccessToken } from "./auth";
import { isAuth } from "./isAuthMiddleware";
import { sendRefreshToken } from "./sendRefreshToken";
import { getConnection } from "typeorm";
import { verify } from "jsonwebtoken";

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string;

    @Field(() => User, { nullable: true })
    user: User | null;
}

@Resolver()
export default class UserResolver {
    @Query(() => String)
    @UseMiddleware(isAuth)
    bye(@Ctx() { payload }: Context) {
        console.log(payload);
        return `your user id is: ${payload!.userId}`;
    }

    @Query(() => [User])
    async users() {
        return await User.find();
    }

    @Query(() => User, { nullable: true })
    async self(@Ctx() context: Context) {
        const authorization = context.req.headers["authorization"];

        if (!authorization) {
            return null;
        }

        try {
            const token = authorization.split(" ")[1];
            const payload: any = verify(
                token,
                process.env.ACCESS_TOKEN_SECRET!
            );
            context.payload = payload as any;

            return await User.findOne(payload.userId);
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    //Mutation for Testing token Revolk
    @Mutation(() => Boolean)
    async revokeRefreshTokensForUser(@Arg("userId", () => Int) userId: number) {
        await getConnection()
            .getRepository(User)
            .increment({ id: userId }, "tokenVersion", 1);

        return true;
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() { res }: Context
    ): Promise<LoginResponse> {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.log("Login Invalid");
            return { accessToken: "", user: null };
            //throw new Error("Could not find user");
        }

        const valid = await argon2.verify(user.password, password);

        if (!valid) {
            console.log("Password Invalid");
            return { accessToken: "", user: null };
            //throw new Error("Bad Password");
        }

        // Login Successful

        sendRefreshToken(res, createRefreshToken(user));
        return { accessToken: createAccessToken(user), user };
    }

    @Mutation(() => Boolean)
    async logout(@Ctx() { res }: Context) {
        sendRefreshToken(res, "");

        return true;
    }

    @Mutation(() => Boolean)
    async register(
        @Arg("email") email: string,
        @Arg("password") password: string
    ) {
        const hashedPassword = await argon2.hash(password);

        try {
            await User.insert({
                email,
                password: hashedPassword
            });
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }
}
