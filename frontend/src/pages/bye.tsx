import React from "react";
import { withBye } from "../generated/graphql";

interface Props {}

export const Bye: React.FC<Props> = () => {
    const data = withBye();
    debugger;

    //if (loading) {
    //return <div> loading </div>;
    //}

    //if (error) {
    //console.log(error);
    //return <div> error </div>;
    //}

    if (!data) {
        return <div> no data returned </div>;
    }

    return <div>{data}</div>;
};
