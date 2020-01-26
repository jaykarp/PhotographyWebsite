import React from "react";
import styled from "styled-components";
import { InfiniteSlider } from "./InfiniteSlider";

interface Props {}

const Main = styled.div`
    display: flex;
    flex: 1;
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

export const InfiniteList: React.FC<Props> = () => {
    return (
        <Main>
            <InfiniteSlider items={items} />
        </Main>
    );
};
