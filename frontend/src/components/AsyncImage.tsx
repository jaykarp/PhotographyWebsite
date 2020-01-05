import React, { useState } from "react";

interface Props {
    source: string;
    alt: string;
}

export const AsyncImage: React.FC<Props> = ({ source, alt }) => {
    const [loading, setLoading] = useState(true);

    const img: HTMLImageElement = new Image();

    img.src = source;
    img.onload = () => {
        setLoading(false);
    };

    if (loading) {
        return (
            <div
                style={{
                    display: "inline-block",
                    padding: "0",
                    margin: "0",
                    border: "1px solid black",
                    backgroundColor: "white",
                    height: "200px",
                    width: "200px",
                    textAlign: "center"
                }}
            >
                loading ...
            </div>
        );
    } else {
        return <img src={source} alt={alt} />;
    }
};
