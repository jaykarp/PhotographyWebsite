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
    const [{ x }, setX] = useSpring(() => {
        return {
            x: 0
        };
    });

    // Function For Moving Image Div
    const runSpring = useCallback(
        x => {
            setX({
                x: x,
                immediate: false,
                config: {
                    tension: (1 + items.length) * 100,
                    friction: 70
                }
            });
        },
        [items.length, setX]
    );

    // Maintain Offsets, handle movements on ImagesContainer
    const wheelOffset = useRef(0);
    const dragOffset = useRef(0);
    const bindContainer = useGesture({
        onDrag: ({ offset: [x], tap }) => {
            if (tap) {
                return runSpring(0);
            }
            dragOffset.current = -x;
            return runSpring(wheelOffset.current + x);
        },
        onWheel: ({ offset: [, y] }) => {
            wheelOffset.current = y;
            return runSpring(y - dragOffset.current);
        }
    });

    return (
        <ImagesContainer {...bindContainer()} style={{ x }}>
            <Link to={"/catalog/Birds"}>
                <ImageContainer>
                    <AsyncImage src={items[4].url} alt={"image"} />
                </ImageContainer>
            </Link>
            <Link to={"/catalog/Dogs"}>
                <ImageContainer>
                    <AsyncImage src={items[4].url} alt={"image"} />
                </ImageContainer>
            </Link>
            <ImageContainer>
                <AsyncImage src={items[4].url} alt={"image"} />
            </ImageContainer>
        </ImagesContainer>
    );
};
