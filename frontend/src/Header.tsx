import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { devices } from "./devices";
import home from "./svg/home.svg";
import mail from "./svg/mail.svg";
import photograph from "./svg/photograph.svg";
import user from "./svg/user.svg";

interface Props {}

const DesktopHeaderContainer = styled.header`
    padding: 0 12vw;
    display: flex;
    height: 85px;
    align-items: center;
    background-color: #f6f6f6;
    position: sticky;
    top: 0;
    z-index: 1;

    @media ${devices.M_UPPER} {
        flex-flow: column;
        height: 100px;
        padding: 0 12vw 10px 12vw;
    }
`;

const DesktopLogoContainer = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: flex-start;
    font-size: 25px;
`;

const DesktopLinkContainer = styled.div`
    flex-grow: 3;
    display: flex;
    justify-content: flex-end;

    @media ${devices.M_UPPER} {
        flex-grow: 0;
    }
`;

const DesktopLink = styled(NavLink)`
    text-decoration: none;
    color: #484848;
    padding: 5px 0;
    margin: 0 0 0 20px;
    font-size: 17px;

    &.active {
        border-bottom: 1px solid black;
    }
`;

export const DesktopHeader: React.FC<Props> = () => {
    return (
        <DesktopHeaderContainer>
            <DesktopLogoContainer>
                <div>
                    LAUREN KARP <br /> PHOTOGRAPHY
                </div>
            </DesktopLogoContainer>
            <DesktopLinkContainer>
                <DesktopLink exact to="/" activeClassName={"active"}>
                    Home
                </DesktopLink>
                <DesktopLink to="/Birds" activeClassName={"active"}>
                    Birds
                </DesktopLink>
                <DesktopLink to="/Wildlife" activeClassName={"active"}>
                    Wildlife
                </DesktopLink>
                <DesktopLink to="/Nature" activeClassName={"active"}>
                    Nature
                </DesktopLink>
                <DesktopLink to="/Contact" activeClassName={"active"}>
                    Contact Us
                </DesktopLink>
            </DesktopLinkContainer>
        </DesktopHeaderContainer>
    );
};

const MobileHeaderContainer = styled.header`
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    border-top: 1px solid #ebebeb;
    background-color: white;
    z-index: 1;
    height: 60px;
`;

const MobileLinkContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    text-align: center;
    max-width: 560px;
`;

const MobileLink = styled(Link)`
    text-decoration: none;
    color: #484848;
    flex-grow: 1;
    font-size: 10px;
    padding: 15px 0 15px 0;
    display: flex;
    flex-direction: column;
`;

const SVGContainer = styled.img`
    height: 15px;
    widhth: 15px;
`;

export const MobileHeader: React.FC<Props> = () => {
    return (
        <MobileHeaderContainer>
            <MobileLinkContainer>
                <MobileLink to="/">
                    <SVGContainer src={home} alt={"home"} />
                    Home
                </MobileLink>
                <MobileLink to="/catalog">
                    <SVGContainer src={photograph} alt={"home"} />
                    Portfolio
                </MobileLink>
                <MobileLink to="/about">
                    <SVGContainer src={user} alt={"home"} />
                    About
                </MobileLink>
                <MobileLink to="/contact">
                    <SVGContainer src={mail} alt={"home"} />
                    Contact
                </MobileLink>
            </MobileLinkContainer>
        </MobileHeaderContainer>
    );
};
