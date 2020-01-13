import React from "react";
import { PhotosQuery } from "../generated/graphql";
import { AsyncImage } from "../components/AsyncImage";
import { useSprings, animated } from "react-spring";
import styled from "styled-components";

interface Props {
    data: PhotosQuery;
}

const ImageContainer = styled(animated.div)`
    background-color: red;
    display: inline-block;
    margin: 5px;
`;

export const Photos: React.FC<Props> = ({ data }) => {
    const [springs, setSprings] = useSprings(data.photos.length, index => ({
        x: 0,
        opacity: 1,
        height: 200,
        width: 200
    }));

    return (
        <>
            {springs.map(({ height, width, opacity }, i) => {
                return (
                    <ImageContainer
                        onClick={() => {
                            setSprings(index => {
                                if (index === i) {
                                    return {
                                        height: 200,
                                        width: 200,
                                        opacity: 1
                                    };
                                } else {
                                    return {
                                        height: 200,
                                        width: 200,
                                        opacity: 0.5
                                    };
                                }
                            });
                        }}
                        style={{ height, width, opacity }}
                        key={i}
                    >
                        <AsyncImage
                            src={data.photos[i].url}
                            alt={data.photos[i].name}
                        />
                    </ImageContainer>
                );
            })}
        </>
    );
};

//<div>

//{data.photos.map(d => {
//return (
//<AsyncImage key={d.id} source={d.url} alt={d.name} />
//);
//})}
//</div>
