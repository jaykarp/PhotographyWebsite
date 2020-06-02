import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Oval } from "svg-loaders-react";

// Define new keyframes
const photoScale = keyframes`
  0.00% {transform: scale(0);}
  20.55% {transform: scale(1.1015);}
  47.04% {transform: scale(0.9925);}
  73.52% {transform: scale(1.0005);}
  100.00% {transform: scale(1);}
`;

const Scale = styled.div`
    animation: ${photoScale} cubic-bezier(0.445, 0.05, 0.55, 0.95) 1.25s 0s both;
    position: relative;
`;

const TextOverlay = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 10vmin;
    text-shadow: 2px 2px 2px #000000;
    color: white;
`;

const LoadingMenu = styled.div`
    width: 75vmin;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

interface Props {
    menu: boolean;
    items: any;
}

export const ImgMenu: React.FC<Props> = ({ items: { photos }, menu }) => {
    const [loading, setLoading] = useState(true);

    const preload = photos => {
        let loaded = [];
        for (let i = 0; i < photos.length; i++) {
            const img: HTMLImageElement = new Image();

            img.src = photos[i].url;
            img.onload = () => {
                loaded.push(img);
                if (loaded.length === photos.length) {
                    setLoading(false);
                }
            };
        }
    };

    preload(photos);

    const history = useHistory();
    const path = ["", "/Birds", "/Dogs"];

    return (
        <>
            {loading ? (
                <LoadingMenu>
                    <Oval stroke="#000000" />
                </LoadingMenu>
            ) : (
                photos.map(({ url, name }, i) => {
                    return (
                        <div key={i}>
                            {menu ? (
                                <Scale>
                                    <Link
                                        draggable={false}
                                        to={`${history.location.pathname}${path[i]}`}
                                    >
                                        <img
                                            src={url}
                                            style={{
                                                width: "75vmin",
                                                padding: "10px"
                                            }}
                                            alt={"img"}
                                        />
                                        <TextOverlay> {name} </TextOverlay>
                                    </Link>
                                </Scale>
                            ) : (
                                <Scale>
                                    <Link
                                        draggable={false}
                                        to={`${history.location.pathname}/${i}`}
                                    >
                                        <img
                                            src={url}
                                            style={{
                                                width: "75vmin",
                                                padding: "10px"
                                            }}
                                            alt={"img"}
                                        />
                                    </Link>
                                </Scale>
                            )}
                        </div>
                    );
                })
            )}
        </>
    );
};
