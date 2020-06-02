import React, { useState, useEffect } from "react";
import { usePhotosQuery } from "../generated/graphql";
import styled from "styled-components";
import elkImage from "../img/elk.jpg";
import butterflyImage from "../img/butterfly.jpg";
import flowerImage from "../img/flower.jpg";
import owlImage from "../img/owl.jpg";
import pelicanImage from "../img/pelican.jpg";
import walrusImage from "../img/walrus.jpg";
import headshot from "../img/headshot.jpg";
import { devices } from "../devices";

interface Props {}

interface ImageProps {
    //src: string;
    show?: boolean;
    //alt?: string;
}

// Change this height according to page layout
// Also image and Carousel have same size maybe for no reason?

const HomeWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
`;

const Image = styled.img<ImageProps>`
    width: 100%;
    opacity: ${p => Number(p.show)};
    position: absolute;
    //background: url("${p => p.src}") no-repeat center top; 
    //background-size: contain;
    transition: opacity 1s;
    object-fit: contain;

    @media ${devices.XL_BOUND} {
        min-height: 50vw;
        max-height: calc(100vh - 85px);
    }
    @media ${devices.L_BOUND} {
        max-height: calc(100vh - 85px);
    }
    @media ${devices.M_UPPER} {
        max-height: calc(100vh - 110px);
    }
`;

const HiddenImage = styled.img<ImageProps>`
    width: 100vw;
    visibility: hidden;

    @media ${devices.XL_BOUND} {
        min-height: 50vw;
        max-height: calc(100vh - 85px);
    }
    @media ${devices.L_BOUND} {
        max-height: calc(100vh - 85px);
    }
    @media ${devices.M_UPPER} {
        max-height: calc(100vh - 110px);
    }
`;

const Carousel = styled.div`
    //width: 100vw;
    //height: 56vw;
    //max-height: 600px;
`;

const AboutContainer = styled.div`
    margin: 40px 10vw;
    border-bottom: 1px solid #bfbfbf;

    @media ${devices.XL_BOUND} {
        width: 1000px;
    }

    @media ${devices.L_BOUND} {
        width: 900px;
    }

    @media ${devices.XS_UPPER} {
        margin: 40px 0;
    }
`;

const AboutHeader = styled.div`
    padding: 10px 0;
    font-size: 30px;
    border-bottom: 1px solid #bfbfbf;
`;

const AboutInfoContainer = styled.div`
    margin: 20px 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;

    @media ${devices.M_UPPER} {
        flex-flow: column;
        height: 600px;
    }
`;

const AboutPhoto = styled.img`
    display: flex;
    justify-content: flex-start;
    height: 300px;
    width: 450px;
    box-shadow: 10px 10px 22px 0px rgba(163, 163, 163, 1);

    @media ${devices.M_UPPER} {
        margin: 30px 0 0 0;
    }
`;

const AboutText = styled.div`
    display: flex;
    flex-flow: column;
    flex-grow: 1;
    justify-content: flex-end;
    text-align: end;
    font-size: 20px;

    @media ${devices.M_UPPER} {
        text-align: center;
        justify-content: center;
    }
`;

export const DesktopHome: React.FC<Props> = () => {
    const { data, loading } = usePhotosQuery({ fetchPolicy: "network-only" });
    const [photoNum, setPhoto] = useState(0);
    const photos = 6;

    if (!loading) {
        console.log(data);
    }

    useEffect(() => {
        const id = setTimeout(() => {
            setPhoto((photoNum + 1) % photos);
        }, 10000);
        return () => {
            clearTimeout(id);
        };
    }, [photoNum]);

    return (
        <HomeWrapper>
            <Carousel>
                <Image show={photoNum === 0} src={elkImage} />
                <Image show={photoNum === 1} src={butterflyImage} />
                <Image show={photoNum === 2} src={flowerImage} />
                <Image show={photoNum === 3} src={owlImage} />
                <Image show={photoNum === 4} src={pelicanImage} />
                <Image show={photoNum === 5} src={walrusImage} />
                <HiddenImage src={elkImage} />
            </Carousel>
            <AboutContainer>
                <AboutHeader> About </AboutHeader>
                <AboutInfoContainer>
                    <AboutPhoto src={headshot} />
                    <AboutText>
                        Photographing nature brings such great joy.
                        <br />
                        It has taught me appreciation for the fragile
                        <br />
                        world around us which changes moment by moment.
                    </AboutText>
                </AboutInfoContainer>
            </AboutContainer>
        </HomeWrapper>
    );
};

const MobileName = styled.div`
    width: 100%;
    font-size: 64px;
    text-align: center;
    margin: 20px 0 10px 0;
    overflow: wrap;
`;

const MobileTitle = styled.div`
    width: 100%;
    font-size: 40px;
    text-align: center;
    margin: 10px 0 10px 0;
`;

const MobileImage = styled.img`
    width: 100%;
`;

export const MobileHome: React.FC<Props> = () => {
    return (
        <>
            <MobileName>
                Lauren <br /> Karp
            </MobileName>
            <MobileTitle> Photography </MobileTitle>
            <MobileImage src={elkImage} alt={"elk"} />
        </>
    );
};
