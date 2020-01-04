import { Middleware } from "type-graphql/dist/interfaces/Middleware";
import { Context } from "./Context";
import { verify } from "jsonwebtoken";

export const isAuth: Middleware<Context> = ({ context }, next) => {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
        throw new Error("Not Authenticated");
    }

    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
        context.payload = payload as any;
    } catch (err) {
        console.log(err);
        throw Error("not Authenticated");
    }

    return next();
};
