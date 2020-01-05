import React from "react";
import { usePhotosQuery } from "../generated/graphql";
import { AsyncImage } from "../components/AsyncImage";

interface Props {}

export const Photos: React.FC<Props> = () => {
    const { data, loading } = usePhotosQuery({ fetchPolicy: "network-only" });

    if (loading || !data) {
        return <div> loading ... </div>;
    }

    return (
        <div>
            <div>
                {data.photos.map(d => {
                    return (
                        <AsyncImage key={d.id} source={d.url} alt={d.name} />
                    );
                })}
            </div>
        </div>
    );
};
