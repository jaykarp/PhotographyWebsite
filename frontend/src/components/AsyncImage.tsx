import React, { useState } from "react";
import styled from "styled-components";
import { a } from "react-spring";

interface Props {
    src: string;
    alt: string;
    setLoading?: any;
}

const LoadingContainer = styled.div`
    backgroundcolor: white;
    width: 75vmin;
    height: 45vmin;
`;

export const AsyncImage: React.FC<Props> = ({ src, alt, setLoading }) => {
    const img: HTMLImageElement = new Image();

    img.src = src;
    img.onload = () => {
        setLoading(false);
    };

    return (
        <img
            style={{ width: "75vmin", padding: "10px" }}
            draggable={false}
            alt={alt}
            src={src}
        />
    );
};
