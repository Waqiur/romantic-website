import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import SpaceBackground from "./SpaceBackground";

const LoveMapContainer = styled(motion.div)<{ $isVisible: boolean }>`
    position: fixed;
    top                    <motion.div
                        key={currentMilestoneIndex}
                        initial={currentVariant.initial}
                        animate={currentVariant.animate}
                        exit={currentVariant.exit}
                        transition={currentVariant.transition || { duration: 0.5 }}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                            width: "80%",
                            height: "80%",
                            gap: "2rem",
                        }}
                    > 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at center, #1c2837 0%, #050608 100%);
    display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
    align-items: center;
    justify-content: center;
    z-index: 1001;
    overflow: hidden;
    font: normal 1em/1.45em "Helvetica Neue", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #fff;
`;

const MapContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PlanetImage = styled.img`
    position: relative;
    width: 320px;
    height: 320px;
    object-fit: contain;
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }
`;

const CenterContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    text-align: center;
    max-width: 500px;
    position: relative;
    z-index: 1;
`;

const CarouselImage = styled.img`
    width: 100%;
    max-width: 300px;
    height: auto;
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }
`;

const MilestoneModal = styled(motion.div)`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.9);
    padding: 2rem;
    border-radius: 20px;
    border: 2px solid #42e1f5;
    max-width: 400px;
    text-align: center;
    z-index: 2000;
    box-shadow: 0 0 50px rgba(66, 225, 245, 0.5);
`;

const ModalContent = styled.div`
    color: white;
`;

const ModalTitle = styled.h2`
    color: #42e1f5;
    margin-bottom: 1rem;
    font-size: 2.5rem;
    font-weight: 600;
`;

const ModalText = styled.p`
    margin-bottom: 1.5rem;
    line-height: 1.6;
    white-space: pre-line;
    font-size: 1.15rem;
`;

const Button = styled(motion.button)`
    background: linear-gradient(135deg, #42e1f5 0%, #06ca95 100%);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0.5rem;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(66, 225, 245, 0.4);
    }
`;

interface Milestone {
    id: number;
    title: string;
    description: string;
    message: string;
    x: number;
    y: number;
    type: string;
}

const milestones: Milestone[] = [
    {
        id: 1,
        title: "Mercury",
        description: "",
        message:
            "Swift as Mercury's dance around the Sun,\nOur love is bright, a journey just begun.\nEach orbit closer, our hearts align,\nSo tell me, will you be my only one?",
        x: -350,
        y: 0,
        type: "mercury",
    },
    {
        id: 2,
        title: "Venus",
        description: "",
        message:
            "Like Venus, you shine with dazzling light,\nThe morning star that makes my world bright.\nIn your glow, my soul feels fine,\nWill you be my Venus, forever mine?",
        x: -250,
        y: 0,
        type: "venus",
    },
    {
        id: 3,
        title: "Earth",
        description: "",
        message:
            "Earth holds wonders, oceans wide,\nBut you're the beauty by my side.\nMy home, my joy, my grand design,\nWill you be my Earth, forever mine?",
        x: -150,
        y: 0,
        type: "earth",
    },
    {
        id: 4,
        title: "Mars",
        description: "",
        message:
            "Mars burns red with passion and flame,\nOur hearts together ignite the same.\nAcross the stars, our love imparts,\nWill you be my Mars, keeper of my heart?",
        x: -50,
        y: 0,
        type: "mars",
    },
    {
        id: 5,
        title: "Jupiter",
        description: "",
        message:
            "Jupiter reigns, the mighty king,\nYet your love is my everything.\nBigger than planets, brighter than time,\nWill you be my Jupiter, always mine?",
        x: 50,
        y: 0,
        type: "jupiter",
    },
    {
        id: 6,
        title: "Saturn",
        description: "",
        message:
            "Saturn wears its rings with grace,\nEndless circles in time and space.\nSo many layers, strong and true,\nWill you be my Saturn, I'll orbit you?",
        x: 150,
        y: 0,
        type: "saturn",
    },
    {
        id: 7,
        title: "Uranus",
        description: "",
        message:
            "Uranus spins, a mystery rare,\nLike our bond, beyond compare.\nThrough the unknown, we'll intertwine,\nWill you be my Uranus, forever mine?",
        x: 250,
        y: 0,
        type: "uranus",
    },
    {
        id: 8,
        title: "Neptune",
        description: "",
        message:
            "Neptune drifts in a world so far,\nYet love can cross the farthest star.\nNo distance breaks what we define,\nWill you be my Neptune, always mine?",
        x: 350,
        y: 0,
        type: "neptune",
    },
];

interface LoveMapPageProps {
    isVisible?: boolean;
}

const LoveMapPage: React.FC<LoveMapPageProps> = ({ isVisible = true }) => {
    const [showProposal, setShowProposal] = useState(false);
    const [proposalAccepted, setProposalAccepted] = useState(false);
    const [currentMilestoneIndex, setCurrentMilestoneIndex] = useState(0);

    // Mixed transition variants for each milestone
    const transitionVariants = [
        // Slide from right
        {
            initial: { x: 300, opacity: 0 },
            animate: { x: 0, opacity: 1 },
            exit: { x: -300, opacity: 0 },
        },
        // Slide from left
        {
            initial: { x: -300, opacity: 0 },
            animate: { x: 0, opacity: 1 },
            exit: { x: 300, opacity: 0 },
        },
        // Slide from top
        {
            initial: { y: -300, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            exit: { y: 300, opacity: 0 },
        },
        // Slide from bottom
        {
            initial: { y: 300, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            exit: { y: -300, opacity: 0 },
        },
        // Scale in - Smooth and elegant
        {
            initial: { scale: 0.8, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.9, opacity: 0 },
            transition: { duration: 0.5, ease: "easeOut" },
        },
        // Rotate and scale - Gentle rotation
        {
            initial: { scale: 0.9, rotate: -90, opacity: 0 },
            animate: { scale: 1, rotate: 0, opacity: 1 },
            exit: { scale: 0.9, rotate: 90, opacity: 0 },
            transition: { duration: 0.6, ease: "easeOut" },
        },
        // Bounce in - Soft and subtle
        {
            initial: { scale: 0.95, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.95, opacity: 0 },
            transition: { type: "spring", stiffness: 200, damping: 25 },
        },
        // Fade with slight scale - Very subtle
        {
            initial: { scale: 0.98, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 1.02, opacity: 0 },
            transition: { duration: 0.4, ease: "easeInOut" },
        },
    ];

    const currentVariant =
        transitionVariants[currentMilestoneIndex % transitionVariants.length];

    const handleProposalResponse = (accepted: boolean) => {
        setProposalAccepted(accepted);
        if (accepted) {
            // Celebration animation or message
            setTimeout(() => {
                alert(
                    "Congratulations! You've embarked on the greatest journey of all! 💕"
                );
            }, 1000);
        } else {
            alert("That's okay! Our journey continues... 🌟");
        }
        setShowProposal(false);
    };

    return (
        <LoveMapContainer $isVisible={isVisible}>
            <SpaceBackground />
            <MapContainer>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentMilestoneIndex}
                        initial={currentVariant.initial}
                        animate={currentVariant.animate}
                        exit={currentVariant.exit}
                        transition={
                            currentVariant.transition || { duration: 0.5 }
                        }
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                            width: "75%",
                            height: "80%",
                            gap: "2rem",
                        }}
                    >
                        <PlanetImage
                            src={`/planets/${milestones[currentMilestoneIndex].type}.png`}
                            alt={milestones[currentMilestoneIndex].type}
                        />

                        <CenterContent>
                            <ModalTitle>
                                {milestones[currentMilestoneIndex].title}
                            </ModalTitle>
                            <ModalText>
                                {milestones[currentMilestoneIndex].message}
                            </ModalText>
                            <Button
                                onClick={() => {
                                    if (currentMilestoneIndex === 7) {
                                        setShowProposal(true);
                                    } else {
                                        setCurrentMilestoneIndex(
                                            (prev) => prev + 1
                                        );
                                    }
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Yes, continue our journey! 💕
                            </Button>
                        </CenterContent>

                        <CarouselImage
                            src={`/carousel-images/image_${
                                currentMilestoneIndex + 1
                            }.webp`}
                            alt={`Carousel image ${currentMilestoneIndex + 1}`}
                        />
                    </motion.div>
                </AnimatePresence>
            </MapContainer>

            {/* Proposal Modal */}
            {showProposal && (
                <MilestoneModal
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                >
                    <ModalContent>
                        <ModalTitle>� Our Future</ModalTitle>
                        <ModalText>
                            Just as we journeyed from Earth to the stars, will
                            you journey through life with me?
                        </ModalText>
                        <div>
                            <Button
                                onClick={() => handleProposalResponse(true)}
                            >
                                Yes! 💕
                            </Button>
                            <Button
                                onClick={() => handleProposalResponse(false)}
                            >
                                Maybe Later 🌟
                            </Button>
                        </div>
                    </ModalContent>
                </MilestoneModal>
            )}

            {/* Celebration */}
            {proposalAccepted && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.8)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 3000,
                        flexDirection: "column",
                    }}
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ fontSize: "4rem", marginBottom: "1rem" }}
                    >
                        💕🎉
                    </motion.div>
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        style={{ color: "#42e1f5", textAlign: "center" }}
                    >
                        She Said Yes! Forever Begins! 🚀❤️
                    </motion.h1>
                </motion.div>
            )}
        </LoveMapContainer>
    );
};

export default LoveMapPage;
