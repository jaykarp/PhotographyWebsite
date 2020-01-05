import React, { useState, useRef } from "react";
import { animated, useSpring, to, useSprings } from "react-spring";
import { useDrag } from "react-use-gesture";
import { RouteComponentProps } from "react-router-dom";

const pages = [
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/400",
    "https://picsum.photos/200",
    "https://picsum.photos/300",
    "https://picsum.photos/300",
    "https://picsum.photos/400",
    "https://picsum.photos/200",
    "https://picsum.photos/300"
];

export const PhotoList: React.FC<RouteComponentProps> = () => {
    const [{ x }, set] = useSpring(() => ({
        x: 0
    }));
    const [springs, setSprings] = useSprings(pages.length, () => ({
        opacity: 1,
        height: 200,
        width: 200
    }));

    const bind = useDrag(
        ({ down, movement: [mx], velocity, direction: [dx] }) => {
            if (down) {
                set({
                    x: mx,
                    config: {
                        velocity: 0,
                        decay: false
                    }
                });
            } else {
                set({
                    x: mx,
                    config: {
                        velocity: dx * velocity,
                        decay: true
                    }
                });
            }
        },
        {
            initial: () => {
                return [(x as any).value, 0];
            }
        }
    );
    return (
        <animated.div
            {...bind()}
            style={{
                transform: to(x, x => {
                    return `translate3d(${x}px,0px,0)`;
                }),
                whiteSpace: "nowrap"
            }}
        >
            {springs.map(({ height, width }, i) => {
                return (
                    <animated.div
                        key={i}
                        onMouseEnter={() => {
                            setSprings(index => {
                                if (index === i) {
                                    return {
                                        height: 210,
                                        width: 210
                                    };
                                } else {
                                    return {
                                        height: 200,
                                        widht: 200
                                    };
                                }
                            });
                        }}
                        onMouseLeave={() => {
                            setSprings(() => ({
                                height: 200,
                                width: 200
                            }));
                        }}
                        style={{
                            backgroundColor: "black",
                            height,
                            width,
                            display: "inline-block",
                            margin: "5px",
                            backgroundImage: `url(${pages[0]})`
                        }}
                    ></animated.div>
                );
            })}
        </animated.div>
    );
};
