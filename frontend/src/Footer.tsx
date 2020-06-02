import React from "react";
import styled from "styled-components";
import linkedin from "./svg/linkedin.svg";
import instagram from "./svg/instagram.svg";

interface Props {}

const DesktopFooterContainer = styled.footer`
    padding: 10px 12vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
`;

const SVGWrapper = styled.div``;

const SVGContainer = styled.img`
    height: 45px;
    width: 45px;
    margin: 10px 10px;
`;

const CopyrightContainer = styled.div`
    height: 45px;
    margin: 10px 0 0 0;
    text-align: center;
`;

export const DesktopFooter: React.FC<Props> = () => {
    return (
        <DesktopFooterContainer>
            <SVGWrapper>
                <a href={"https://www.instagram.com/laurenkarpphotography/"}>
                    <SVGContainer src={instagram} alt={"instagram"} />
                </a>
                <a href={"https://www.linkedin.com/in/lauren-karp-b4a58b9/"}>
                    <SVGContainer src={linkedin} alt={"linkedin"} />
                </a>
            </SVGWrapper>
            <CopyrightContainer>
                Copyright &copy; 2020 Lauren Karp Photography - All Rights
                Reserved.
            </CopyrightContainer>
        </DesktopFooterContainer>
    );
};
