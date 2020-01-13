import React, { useState } from "react";
import styled from "styled-components";

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
            <img
                style={{ width: "auto", height: "100%" }}
                draggable={false}
                src={src}
                alt={alt}
            />
        );
    }
};
