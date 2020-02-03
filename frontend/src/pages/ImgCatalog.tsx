import React, { useRef, useCallback, useState } from "react";
import styled from "styled-components";
import { ImgCollection } from "./ImgCollection";
import { ImgMenu } from "./ImgMenu";
import { Switch, Route, useLocation } from "react-router-dom";
import { a, useTransition, useSpring } from "react-spring";
import { useGesture } from "react-use-gesture";

interface Props {}

const Main = styled.div`
    margin-top: 3vh;
    display: flex;
    flex: 1;
`;

const ImagesContainer = styled(a.div)`
    height: 70%;
    margin: auto 0 auto 0;
    willchange: transform;
    flex-direction: row;
    display: flex;
`;

const items = [
    {
        url:
            "http://nebula.wsimg.com/47fae273d108799a06f4d9cfadf36e1e?AccessKeyId=17CDDE21FD7F2ED3514F&disposition=0&alloworigin=1"
    },
    {
        url:
            "http://nebula.wsimg.com/5f1f2566eb59965bedb1a127ff3abc4e?AccessKeyId=17CDDE21FD7F2ED3514F&disposition=0&alloworigin=1"
    },
    {
        url:
            "http://nebula.wsimg.com/17a35064aff2dc044f34bf4f465982e5?AccessKeyId=17CDDE21FD7F2ED3514F&disposition=0&alloworigin=1"
    },
    {
        url:
            "http://nebula.wsimg.com/7e4228bff016fa5a40c5ed9700b11d2c?AccessKeyId=17CDDE21FD7F2ED3514F&disposition=0&alloworigin=1"
    },
    {
        url:
            "http://nebula.wsimg.com/30cc3c6e3db62ddcb2f0cd613e514e92?AccessKeyId=17CDDE21FD7F2ED3514F&disposition=0&alloworigin=1"
    }
];

export const ImgCatalog: React.FC<Props> = () => {
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
                    tension: 500,
                    friction: 70
                }
            });
        },
        [setX]
    );

    // Maintain Offsets, handle movements on ImagesContainer
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

    const location = useLocation();
    const transitions = useTransition(location, location => location.pathname, {
        from: { opacity: 0 },
        enter: () => {
            return { delay: 300, opacity: 1 };
        },
        leave: {
            opacity: 0.1
        }
    });

    return (
        <Main>
            <div style={{ position: "absolute", display: "flex" }}>
                {transitions.map(
                    ({ item: location, props: { opacity }, key }) => {
                        return (
                            <ImagesContainer
                                {...bindContainer()}
                                style={{ x, opacity }}
                                key={key}
                            >
                                <Switch location={location}>
                                    <Route
                                        exact
                                        path="/catalog"
                                        component={() => (
                                            <ImgMenu items={items} />
                                        )}
                                    />
                                    <Route
                                        path="/catalog/Birds"
                                        component={() => (
                                            <ImgCollection items={items} />
                                        )}
                                    />
                                    <Route
                                        path="/catalog/Dogs"
                                        component={() => (
                                            <ImgCollection items={items} />
                                        )}
                                    />
                                </Switch>
                            </ImagesContainer>
                        );
                    }
                )}
            </div>
        </Main>
    );
};
