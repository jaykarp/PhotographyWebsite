import React, { useRef, useCallback } from "react";
import { useGesture, useDrag } from "react-use-gesture";
import { useSpring, useSprings, a } from "react-spring";
import styled from "styled-components";
import { AsyncImage } from "../components/AsyncImage";

const ImageContainer = styled(a.div)`
    position: relative;
    height: 100%;
    width: 100%;
    willchange: transform;
    flex-direction: row;
    align-items: center;
    display: flex;
`;

const Image = styled(a.div)`
    margin: 50px;
    position: relative;
    background: lightgrey;
    willchange: transform;
    width: 100%;
`;

interface Props {
    items: {
        url: string;
        height: number;
        width: number;
    }[];
}

export const InfiniteSlider: React.FC<Props> = ({ items }) => {
    const clicked = useRef(items.map(() => false));
    const [{ x }, setX] = useSpring(() => {
        return {
            x: 0
        };
    });

    const [springs, set] = useSprings(items.length, i => {
        return {
            height: `${items[i].height}px`,
            opacity: 1,
            x: 0,
            y: 0,
            config: {
                tension: 100,
                friction: 20
            }
        };
    });

    const runSpring = useCallback(
        x => {
            setX({
                x: x,
                immediate: false,
                config: {
                    tension: (1 + items.length) * 100,
                    friction: 30 + 1 * 40
                }
            });
        },
        [items.length, setX]
    );

    const getDisplacement = (e, oneClicked) => {
        const target = e.target as HTMLImageElement;
        const rect = target.getBoundingClientRect();
        const iw = window.innerWidth / 2;
        console.log(window.innerWidth > window.innerHeight);
        let widthFactor = 0;
        // change 200 below here and in setDelay to change growth factor
        if (oneClicked) {
            widthFactor = (window.innerHeight - 200) / target.height;
        } else {
            const i = items.findIndex(x => x);
            widthFactor = (window.innerHeight - 200) / items[i].height;
        }
        const width =
            (oneClicked
                ? widthFactor * target.width
                : target.width / widthFactor) / 2;
        return iw - rect.x - width;
    };

    const setDelay = (fn, delay) => {
        setTimeout(() => set(fn), delay);
    };

    const tapOffset = useRef(0);
    const bindImage = useDrag(({ args: [index], event, tap }) => {
        if (tap) {
            clicked.current = items.map((_, i) =>
                i === index ? !clicked.current[index] : false
            );

            const oneClicked = clicked.current.some(x => x);
            tapOffset.current += getDisplacement(event, oneClicked);

            setDelay(i => {
                if (i === index) {
                    const newHeight = `${window.innerHeight - 200}px`;
                    const newWidth = `${window.innerWidth - 20}px`;
                    return {
                        x: tapOffset.current,
                        y: clicked.current[i] ? 100 : 0,
                        opacity: 1,
                        height: clicked.current[i]
                            ? newHeight
                            : `${items[i].height}px`
                    };
                } else {
                    return {
                        x: oneClicked
                            ? i > index
                                ? 2 * window.innerWidth
                                : -2 * window.innerWidth
                            : tapOffset.current,
                        y: 0,
                        opacity: oneClicked ? 0 : 1,
                        height: `${items[i].height}`
                    };
                }
            }, 200);
        }
    });

    const wheelOffset = useRef(0);
    const dragOffset = useRef(0);
    const bindContainer = useGesture({
        onDrag: ({ offset: [x] }) => {
            dragOffset.current = -x;
            return runSpring(wheelOffset.current + x);
        },
        onWheel: ({ offset: [, y] }) => {
            wheelOffset.current = y;
            return runSpring(y - dragOffset.current);
        }
    });

    return (
        <ImageContainer {...bindContainer()} style={{ x }}>
            {springs.map(({ height, x, y, opacity }, i) => {
                return (
                    <Image
                        key={i}
                        {...bindImage(i)}
                        style={{ height, x, y, opacity }}
                    >
                        <AsyncImage src={items[i].url} alt={"image"} />
                    </Image>
                );
            })}
        </ImageContainer>
    );
};

//setDelay(i => {
//if (i === index) {
//const newWidth = `${window.innerWidth - 20}px`;
//const newHeight = `${window.innerHeight - 250}px`;
//console.log(newWidth);
//return {
//x: tapOffset.current,
//opacity: 1,
//width: clicked.current[i]
//? newWidth
//: `${items[i].width}px`,
//height: clicked.current[i]
//? newHeight
//: `${items[i].height}px`
//};
//} else {
//return {
//x: oneClicked
//? i > index
//? window.innerWidth
//: -window.innerWidth
//: tapOffset.current,
//opacity: oneClicked ? 0 : 1,
//width: `${items[i].width}`,
//height: `${items[i].height}`
//};
//}
//}, 500);
