import React, { useRef, useCallback, useState } from "react";
import { a, useSpring, useSprings } from "react-spring";
import styled from "styled-components";
import { AsyncImage } from "../components/AsyncImage";
import { useDrag, useGesture } from "react-use-gesture";

const ImagesContainer = styled(a.div)`
    height: 70%;
    margin: auto 0 auto 0;
    willchange: transform;
    flex-direction: row;
    display: flex;
`;

const ImageContainer = styled(a.div)`
    margin: 0 10px 0 10px;
    max-height: 80%;
    display: contents;
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

export const ImgCollection: React.FC<Props> = ({ items }) => {
    const clickList = useRef(items.map(() => false));
    const [clicked, setClick] = useState(false);
    //const [{ x }, setX] = useSpring(() => {
    //return {
    //x: 0
    //};
    //});

    const [springs, setSprings] = useSprings(items.length, () => {
        return {
            height: `45`,
            opacity: 1,
            x: 0,
            config: {
                tension: 75,
                friction: 20
            }
        };
    });

    const setDelay = (fn, delay) => {
        setTimeout(() => setSprings(fn), delay);
    };

    // Function For Moving Image Div
    //const runSpring = useCallback(
    //x => {
    //setX({
    //x: x,
    //immediate: false,
    //config: {
    //tension: (1 + items.length) * 100,
    //friction: 70
    //}
    //});
    //},
    //[items.length, setX]
    //);

    // Function For Getting Image Displacement When Resized
    const getDisplacement = (e, oneClicked) => {
        const target = e.target as HTMLImageElement;
        const rect = target.getBoundingClientRect();
        const iw = window.innerWidth / 2;
        let widthFactor = 14 / 9;
        const width =
            (oneClicked
                ? widthFactor * target.width
                : target.width / widthFactor) / 2;
        return iw - rect.x - width;
    };

    // Maintain Tap Offset as well as transformation for Images
    const tapOffset = useRef(0);
    const bindImage = useDrag(({ args: [index], event, tap }) => {
        if (tap) {
            // Rerender Component so that bindContainer Rerenders
            setClick(() => !clicked);
            clickList.current = items.map((_, i) =>
                i === index ? !clickList.current[index] : false
            );

            const oneClicked = clickList.current.some(x => x);
            tapOffset.current += getDisplacement(event, oneClicked);

            // Set Image Properties based on whether or not they were clicked
            setDelay(i => {
                if (i === index) {
                    return {
                        x: tapOffset.current,
                        opacity: 1,
                        height: clickList.current[i] ? "70" : `45`
                    };
                } else {
                    return {
                        x: oneClicked
                            ? i > index
                                ? 2 * window.innerWidth
                                : -2 * window.innerWidth
                            : tapOffset.current,
                        opacity: oneClicked ? 0 : 1,
                        height: `45`
                    };
                }
            }, 200);
        }
    });

    // Maintain Offsets, handle movements on ImagesContainer
    //const wheelOffset = useRef(0);
    //const dragOffset = useRef(0);
    //const bindContainer = useGesture(
    //{
    //onDrag: ({ offset: [x], tap }) => {
    //dragOffset.current = -x;
    //return runSpring(wheelOffset.current + x);
    //},
    //onWheel: ({ offset: [, y] }) => {
    //wheelOffset.current = y;
    //return runSpring(y - dragOffset.current);
    //}
    //},
    //{
    //enabled: !clicked
    //}
    //);

    return (
        //<ImagesContainer {...bindContainer()} style={{ x }}>
        <>
            {springs.map(({ height, x, opacity }, i) => {
                return (
                    <ImageContainer
                        {...bindImage(i)}
                        style={{
                            height: height.to(h => `${h}vmin`),
                            x,
                            opacity
                        }}
                        key={i}
                    >
                        <AsyncImage src={items[i].url} alt={"image"} />
                    </ImageContainer>
                );
            })}
        </>
        //</ImagesContainer>
    );
};
