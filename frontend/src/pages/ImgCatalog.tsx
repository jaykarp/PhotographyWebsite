import React from "react";
import styled from "styled-components";
import { ImgCollection } from "./ImgCollection";
import { ImgMenu } from "./ImgMenu";
import { Switch, Route, useLocation } from "react-router-dom";
import { a, useTransition } from "react-spring";

interface Props {}

const Main = styled.div`
    display: flex;
    flex: 1;
    position: absolute;
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
    const location = useLocation();
    const transitions = useTransition(location, location => location.pathname, {
        from: { opacity: 0, transform: "translateX(100%)" },
        enter: { delay: 500, opacity: 1, transform: "translateX(0%)" },
        leave: {
            opacity: 0
        }
    });
    return (
        <>
            {transitions.map(({ item: location, props, key }) => {
                return (
                    <a.div key={key} style={props}>
                        <Switch location={location}>
                            <Route
                                exact
                                path="/catalog"
                                component={() => (
                                    <Main>
                                        <ImgMenu items={items} />
                                    </Main>
                                )}
                            />
                            <Route
                                path="/catalog/Birds"
                                component={() => (
                                    <Main>
                                        <ImgCollection items={items} />
                                    </Main>
                                )}
                            />
                            <Route
                                path="/catalog/Dogs"
                                component={() => (
                                    <Main>
                                        <ImgCollection items={items} />
                                    </Main>
                                )}
                            />
                        </Switch>
                    </a.div>
                );
            })}
        </>
    );
    //return (
    //<>
    //<Main>
    //<InfiniteSlider items={items} display={true} />
    //</Main>
    //<Main>
    //<InfiniteSlider items={items} display={false} />
    //</Main>
    //</>
    //);
};
