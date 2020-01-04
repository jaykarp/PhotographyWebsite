import React from "react";
import { useUsersQuery } from "../generated/graphql";

interface Props {}

export const Home: React.FC<Props> = () => {
    const { data, loading } = useUsersQuery({ fetchPolicy: "network-only" });

    if (loading || !data) {
        return <div> loading ... </div>;
    }

    return (
        <div>
            <div> Users: </div>
            <ul>
                {data.users.map(u => {
                    return <li key={u.id}> {u.email} </li>;
                })}
            </ul>
        </div>
    );
};
