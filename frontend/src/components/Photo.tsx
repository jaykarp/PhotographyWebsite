import React, { useRef } from "react";
import styled from "styled-components";

interface Props {
    ref: any;
}

const Foo = styled.div`
    height: 100px;
    width: 100px;
    background-color: black;
`;

export const DesktopPhoto: React.FC<Props> = ({ ref }) => {
    //const PhotoRef = useRef(null);
    //console.log(get);
    //get(PhotoRef);
    return <Foo ref={ref} />;
};
