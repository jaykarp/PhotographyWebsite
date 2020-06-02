import React, { useRef, createRef, forwardRef, useState } from "react";
import styled from "styled-components";
import { usePhotosQuery } from "../generated/graphql";
//import { DesktopPhoto } from "../components/Photo";

interface Props {}

const calcOffset = (ref, imageRef) => {
    const left = ref.current.offsetLeft;
    const width = ref.current.offsetWidth;
    const halfwindow = window.innerWidth / 2;

    return left - halfwindow + width / 2;
};

const scrollToRef = (ref, imageRef) => {
    imageRef.current.scrollTo(calcOffset(ref, imageRef), 0);
};

interface PhotoProps {
    ref?: any;
    scrollRef?: any;
    src?: any;
    height?: any;
    setModal?: any;
    setOpenModal?: any;
}

interface ButtonProps {
    onClick: any;
}

interface ModalProps {
    openModal: any;
    modal: any;
}

const PhotoRef = styled.img`
    flex: none;
    margin: 0 50px 0 0;
    height: 100%;
    width: auto;
    box-shadow: 10px 10px 22px 0px rgba(163, 163, 163, 1);
    :hover {
        box-shadow: 10px 10px 22px 0px rgba(90, 90, 90, 1);
    }
    transition: 0.3s ease all;
`;

const MiniRef = styled.img`
    flex: none;
    height: 100px;
    width: 100px;
    border: 1px solid black;
    margin: 0 10px 0 0;
    filter: saturate(0);
    :hover {
        filter: saturate(1);
        transform: scale(1.05);
    }
    transition: 0.3s ease all;
    object-fit: cover;
`;

const MiniRefContainer = styled.div<ButtonProps>`
    height: fit-content;
`;

const ImageRow = styled.div<PhotoProps>`
    height: ${p => p.height};
    display: flex;
    flex-flow: row;
    flex-wrap: nowrap;
    flex: none;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    ::-webkit-scrollbar {
        display: none;
    }
    margin-top: 10px;
    padding: 10px 0 40px 0;
`;

const RowContainer = styled.div`
    width: 100%;
    margin: 10px 0 0 0;
`;

const Spacer = styled.div`
    flex: none;
    width: 100px; //calc(50% - 250px);
    height: 1px;
`;

const ImageModalContainer = styled.div`
    position: fixed;
    z-index: 2;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalImage = styled.img`
    width: 100%;
    height: 85%;
    max-width: 1500px;
    object-fit: contain;
`;

const ModalClose = styled.button`
    position: fixed;
    right: 0;
    top: 0;
    border: none;
    background-color: transparent;
    color: white;
    font-size: 30px;
    padding: 10px;
`;

const ImageModal: React.FC<ModalProps> = ({ openModal, modal }) => {
    return (
        <ImageModalContainer>
            <ModalClose onClick={() => openModal(false)}> X </ModalClose>
            <ModalImage src={modal} />
        </ImageModalContainer>
    );
};

const DesktopPhoto: React.FC<PhotoProps> = forwardRef((props, ref: any) => (
    <PhotoRef
        src={props.src}
        ref={ref}
        onClick={() => props.setModal(props.src) || props.setOpenModal(true)}
    />
));

const DesktopPhotoMini: React.FC<PhotoProps> = forwardRef((props, ref: any) => (
    <MiniRefContainer onClick={() => scrollToRef(ref, props.scrollRef)}>
        <MiniRef src={props.src} />
    </MiniRefContainer>
));

export const DesktopCatalog: React.FC<Props> = () => {
    const { data, loading } = usePhotosQuery({ fetchPolicy: "network-only" });
    const [refs, setRefs] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [Modal, setModal] = useState(null);
    const ImageRowRef = createRef();
    const photos = data ? data.photos : [];

    console.log(photos);

    React.useEffect(() => {
        setRefs(refs =>
            Array(photos.length)
                .fill(null)
                .map((_, i) => refs[i] || createRef())
        );
    }, [photos.length]);

    if (loading) {
        return <div> loading ... </div>;
    }

    return (
        <>
            {openModal && <ImageModal openModal={setOpenModal} modal={Modal} />}
            <RowContainer>
                <ImageRow ref={ImageRowRef} height={"50vmin"}>
                    <Spacer />
                    {photos.map((_, i) => (
                        <DesktopPhoto
                            key={i}
                            ref={refs[i]}
                            src={photos[i].url}
                            setModal={setModal}
                            setOpenModal={setOpenModal}
                        >
                            {i}
                        </DesktopPhoto>
                    ))}
                    <Spacer />
                </ImageRow>
                <ImageRow height={"100px"}>
                    <Spacer />
                    {photos.map((_, i) => (
                        <DesktopPhotoMini
                            key={i}
                            ref={refs[i]}
                            scrollRef={ImageRowRef}
                            src={photos[i].url}
                        ></DesktopPhotoMini>
                    ))}
                    <Spacer />
                </ImageRow>
            </RowContainer>
        </>
    );
};
