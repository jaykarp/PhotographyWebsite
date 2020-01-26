import React, { useState } from "react";
import styled from "styled-components";
import { a } from "react-spring";

interface Props {
    src: string;
    alt: string;
}

const LoadingContainer = styled.div`
    border: 1px solid black;
    backgroundcolor: white;
    width: 100%;
    height: 100%;
`;

export const AsyncImage: React.FC<Props> = ({ src, alt }) => {
    const [loading, setLoading] = useState(true);

    const img: HTMLImageElement = new Image();

    img.src = src;
    img.onload = () => {
        setLoading(false);
    };

    if (loading) {
        return <LoadingContainer>loading ...</LoadingContainer>;
    } else {
        return (
            <a.img
                style={{
                    height: "inherit",
                    width: "inherit",
                    margin: "inherit",
                    transform: "inherit",
                    boxShadow: "inherit"
                }}
                draggable={false}
                src={src}
                alt={alt}
            />
        );
    }
};
