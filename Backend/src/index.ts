import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import UserResolver from "./resolvers/UserResolver";
import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { verify } from "jsonwebtoken";
import { createAccessToken, createRefreshToken } from "./auth";
import { User } from "./entity/User";
import { sendRefreshToken } from "./sendRefreshToken";
import cors from "cors";
import PhotoResolver from "./resolvers/PhotoResolver";
//import AWS from "aws-sdk";

(async () => {
    const app = express();

    app.use(
        cors({
            origin: "http://localhost:3000",
            credentials: true
        })
    );

    app.use(cookieParser());

    //app.get("/", (_, res) => res.send("hello"));

    app.post("/refresh_token", async (req, res) => {
        const token = req.cookies.jid;
        if (!token) {
            return res.send({ ok: false, accessToken: "" });
        }

        let payload: any = null;
        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
        } catch (err) {
            console.log(err);
            return res.send({ ok: false, accessToken: "" });
        }

        // Token is valid
        const user = await User.findOne({ id: payload.userId });

        if (!user) {
            return res.send({ ok: false, accessToken: "" });
        }

        if (user.tokenVersion !== payload.tokenVersion) {
            return res.send({ ok: false, accessToken: "" });
        }

        sendRefreshToken(res, createRefreshToken(user));

        return res.send({ ok: true, accessToken: createAccessToken(user) });
    });

    await createConnection()
        .then(async _ => {
            console.log("Connected to DB");
        })
        .catch(error => console.log("TypeORM connection error: ", error));

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, PhotoResolver]
        }),
        context: ({ req, res }) => ({ req, res })
    });

    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(4000, () => {
        console.log("express started on port 4000");
    });
})();

//createConnection().then(async connection => {

//console.log("Inserting a new user into the database...");
//const user = new User();
//user.firstName = "Timber";
//user.lastName = "Saw";
//user.age = 25;
//await connection.manager.save(user);
//console.log("Saved a new user with id: " + user.id);

//console.log("Loading users from the database...");
//const users = await connection.manager.find(User);
//console.log("Loaded users: ", users);

//console.log("Here you can setup and run express/koa/any other framework.");

//}).catch(error => console.log(error));
