import React from "react";
import { animated, useSpring, to } from "react-spring";
import { useDrag } from "react-use-gesture";
import { RouteComponentProps } from "react-router-dom";
import { Photos } from "./Photos";
import styled from "styled-components";
import { usePhotosQuery } from "../generated/graphql";

const PhotoContainer = styled(animated.div)`
    white-space: nowrap;
`;

export const PhotoList: React.FC<RouteComponentProps> = () => {
    const { data, loading } = usePhotosQuery({ fetchPolicy: "network-only" });
    const [{ x }, set] = useSpring(() => ({
        x: 0
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

    if (loading || !data) {
        return <div> loading ... </div>;
    }

    return (
        <div style={{ flex: "1 1 auto" }}>
            <PhotoContainer
                {...bind()}
                style={{
                    transform: to(x, x => {
                        return `translate3d(${x}px,0px,0)`;
                    })
                }}
            >
                {!loading && <Photos data={data} />}
            </PhotoContainer>
        </div>
    );
};
