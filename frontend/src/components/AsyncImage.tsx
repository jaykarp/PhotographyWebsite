import React, { useState } from "react";

interface Props {
    source: string;
    alt: string;
    key: number;
}

export const AsyncImage: React.FC<Props> = ({ source, alt }) => {
    const [loading, setLoading] = useState(true);

    const img: HTMLImageElement = new Image();

    img.src = source;
    img.onload = () => {
        setLoading(false);
    };

    if (loading) {
        return <div> loading ... </div>;
    } else {
        return <img src={source} alt={alt} />;
    }
};
