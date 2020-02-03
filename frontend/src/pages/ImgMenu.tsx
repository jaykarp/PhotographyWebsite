import React, { useRef, useCallback } from "react";
import { a, useSpring } from "react-spring";
import styled from "styled-components";
import { AsyncImage } from "../components/AsyncImage";
import { useGesture } from "react-use-gesture";
import { Link } from "react-router-dom";

const ImagesContainer = styled(a.div)`
    height: 70%;
    margin: auto 0 auto 0;
    willchange: transform;
    flex-direction: row;
    display: flex;
`;

const ImageContainer = styled(a.div)`
    height: 45vmin;
    margin: 0 10px 0 10px;
    max-height: 80%;
    display: contents;
    color: black;
    box-shadow: 0 10px 25px;
    &:hover {
        box-shadow: 0 20px 35px;
    }
`;

interface Props {
    items: {
        url: string;
    }[];
}

export const ImgMenu: React.FC<Props> = ({ items }) => {
    return (
        <>
            <Link draggable={false} to={"/catalog/Birds"}>
                <ImageContainer>
                    <AsyncImage src={items[4].url} alt={"image"} />
                </ImageContainer>
            </Link>
            <Link draggable={false} to={"/catalog/Dogs"}>
                <ImageContainer>
                    <AsyncImage src={items[4].url} alt={"image"} />
                </ImageContainer>
            </Link>
            <Link draggable={false} to={"/catalog/Dogs"}>
                <ImageContainer>
                    <AsyncImage src={items[4].url} alt={"image"} />
                </ImageContainer>
            </Link>
        </>
    );
};
