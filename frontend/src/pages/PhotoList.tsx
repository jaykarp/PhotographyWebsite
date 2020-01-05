import React, { useState, useRef } from "react";
import { animated, useSpring, to } from "react-spring";
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
    const index = useRef(0);
    const [{ pos }, set] = useSpring(() => ({
        pos: [0, 0]
    }));

    const bind = useDrag(
        ({ down, movement: pos, velocity, direction: [dx] }) => {
            if (down) {
                set({
                    pos,
                    config: {
                        velocity: 0,
                        decay: false
                    }
                });
            } else {
                set({
                    pos,
                    config: {
                        velocity: dx * velocity,
                        decay: true
                    }
                });
            }
        },
        {
            initial: () => {
                return pos.getValue() as any;
            }
        }
    );
    return (
        <animated.div
            {...bind()}
            style={{
                transform: to([pos], ([x]) => {
                    return `translate3d(${x}px,0px,0)`;
                }),
                whiteSpace: "nowrap"
            }}
        >
            {pages.map((url, i) => {
                return (
                    <div
                        onMouseEnter={() => (index.current = i)}
                        style={{
                            backgroundColor: "black",
                            height: "200px",
                            width: "200px",
                            display: "inline-block",
                            margin: "5px",
                            backgroundImage: `url(${url})`
                        }}
                    ></div>
                );
            })}
        </animated.div>
    );
};
