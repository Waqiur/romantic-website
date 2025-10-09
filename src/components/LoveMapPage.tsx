import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SpaceBackground from "./SpaceBackground";
import { theme } from "../styles/theme";

const LoveMapContainer = styled(motion.div)<{ $isVisible: boolean }>`
    position: fixed;
    top: 0;
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
    width: clamp(200px, 25vw, 320px);
    height: clamp(200px, 25vw, 320px);
    object-fit: contain;
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }

    @media (max-width: ${theme.breakpoints.tablet}) {
        width: clamp(150px, 30vw, 250px);
        height: clamp(150px, 30vw, 250px);
    }

    @media (max-width: ${theme.breakpoints.mobile}) {
        width: clamp(120px, 35vw, 180px);
        height: clamp(120px, 35vw, 180px);
    }

    @media (max-width: 480px) {
        width: clamp(100px, 60vw, 150px);
        height: clamp(100px, 60vw, 150px);
    }
`;

const CenterContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    z-index: 1;

    @media (max-width: ${theme.breakpoints.tablet}) {
        padding: clamp(0.5rem, 3vw, 2rem);
        width: 100%;
    }

    @media (max-width: ${theme.breakpoints.mobile}) {
        width: 100%;
    }
`;

const CarouselImage = styled.img`
    width: 100%;
    max-width: clamp(200px, 25vw, 300px);
    height: auto;
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }

    @media (max-width: ${theme.breakpoints.tablet}) {
        max-width: clamp(150px, 30vw, 250px);
    }

    @media (max-width: ${theme.breakpoints.mobile}) {
        max-width: clamp(120px, 35vw, 180px);
    }

    @media (max-width: 480px) {
        max-width: clamp(100px, 60vw, 150px);
    }
`;

const ModalTitle = styled.h2`
    color: #42e1f5;
    margin-bottom: clamp(0.5rem, 2vw, 1rem);
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    font-weight: 600;

    @media (max-width: ${theme.breakpoints.mobile}) {
        font-size: clamp(1.5rem, 5vw, 2rem);
        margin-bottom: clamp(0.5rem, 2vw, 0.8rem);
    }
`;

const ModalText = styled.p`
    margin-bottom: clamp(1rem, 3vw, 1.5rem);
    line-height: 1.6;
    white-space: pre-line;
    font-size: clamp(1.5rem, 2.5vw, 1.15rem);

    @media (max-width: ${theme.breakpoints.mobile}) {
        font-size: clamp(1rem, 3vw, 1rem);
        line-height: 1.5;
        margin-bottom: clamp(0.8rem, 2.5vw, 1.2rem);
    }
`;

const ScrollingText = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at center, #1c2837 0%, #050608 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2500;
    overflow: hidden;
`;

const ScrollingContent = styled.div`
    text-align: center;
    color: white;
    font-size: clamp(1rem, 3vw, 1.4rem);
    line-height: 1.8;
    white-space: pre-line;

    @media (max-width: ${theme.breakpoints.mobile}) {
        font-size: clamp(1rem, 4vw, 1.2rem);
        line-height: 1.6;
    }
`;

const FinalImageContainer = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at center, #1c2837 0%, #050608 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2600;
`;

const FinalImage = styled.img`
    max-width: clamp(300px, 60vw, 500px);
    max-height: clamp(300px, 60vh, 500px);
    object-fit: contain;
    width: 100%;
    height: auto;

    @media (max-width: ${theme.breakpoints.tablet}) {
        max-width: clamp(250px, 70vw, 400px);
        max-height: clamp(250px, 50vh, 400px);
    }

    @media (max-width: ${theme.breakpoints.mobile}) {
        max-width: clamp(200px, 80vw, 350px);
        max-height: clamp(200px, 40vh, 350px);
    }
`;

const StatsPopup = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at center, #1c2837 0%, #050608 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2700;
    text-align: center;
    padding: clamp(1rem, 5vw, 2rem);
`;

const StatsContent = styled.div`
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: clamp(2rem, 5vw, 3rem);
    max-width: clamp(400px, 80vw, 600px);
    border: 2px solid rgba(66, 225, 245, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const StatsTitle = styled.h2`
    color: #42e1f5;
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    font-weight: 600;
    margin-bottom: clamp(1rem, 3vw, 1.5rem);
`;

const StatsText = styled.p`
    color: white;
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    line-height: 1.6;
    margin-bottom: clamp(0.5rem, 2vw, 1rem);
    white-space: pre-line;
`;

const PoemText = styled.p`
    color: #06ca95;
    font-size: clamp(1rem, 2.5vw, 1.2rem);
    line-height: 1.7;
    font-style: italic;
    margin-top: clamp(1rem, 3vw, 1.5rem);
    white-space: pre-line;
`;

const Button = styled(motion.button)`
    background: linear-gradient(135deg, #42e1f5 0%, #06ca95 100%);
    color: white;
    border: none;
    padding: clamp(0.6rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem);
    border-radius: 25px;
    cursor: pointer;
    font-size: clamp(1.1rem, 2.5vw, 1.3rem);
    font-weight: 600;
    margin: 0 clamp(0.25rem, 1vw, 0.5rem);
    transition: all 0.3s ease;
    white-space: nowrap;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(66, 225, 245, 0.4);
    }

    @media (max-width: ${theme.breakpoints.mobile}) {
        padding: clamp(0.5rem, 3vw, 0.7rem) clamp(0.8rem, 4vw, 1.2rem);
        font-size: clamp(1rem, 3.5vw, 1.2rem);
        margin: clamp(0.5rem, 2vw, 1rem) clamp(0.2rem, 1vw, 0.3rem);
    }
`;

interface Milestone {
    id: number;
    title: string;
    message: string;
    type: string;
}

const milestones: Milestone[] = [
    {
        id: 1,
        title: "Mercury",
        message:
            "Swift as Mercury's dance around the Sun,\nOur love is bright, a journey just begun.\nEach orbit closer, our hearts align,\nSo tell me, will you be my only one?",
        type: "mercury",
    },
    {
        id: 2,
        title: "Venus",
        message:
            "Like Venus, you shine with dazzling light,\nThe morning star that makes my world bright.\nIn your glow, my soul feels fine,\nWill you be my Venus, forever mine?",
        type: "venus",
    },
    {
        id: 3,
        title: "Earth",
        message:
            "Earth holds wonders, oceans wide,\nBut you're the beauty by my side.\nMy home, my joy, my grand design,\nWill you be my Earth, forever mine?",
        type: "earth",
    },
    {
        id: 4,
        title: "Mars",
        message:
            "Mars burns red with passion and flame,\nOur hearts together ignite the same.\nAcross the stars, our love imparts,\nWill you be my Mars, keeper of my heart?",
        type: "mars",
    },
    {
        id: 5,
        title: "Jupiter",
        message:
            "Jupiter reigns, the mighty king,\nYet your love is my everything.\nBigger than planets, brighter than time,\nWill you be my Jupiter, always mine?",
        type: "jupiter",
    },
    {
        id: 6,
        title: "Saturn",
        message:
            "Saturn wears its rings with grace,\nEndless circles in time and space.\nSo many layers, strong and true,\nWill you be my Saturn, I'll orbit you?",
        type: "saturn",
    },
    {
        id: 7,
        title: "Uranus",
        message:
            "Uranus spins, a mystery rare,\nLike our bond, beyond compare.\nThrough the unknown, we'll intertwine,\nWill you be my Uranus, forever mine?",
        type: "uranus",
    },
    {
        id: 8,
        title: "Neptune",
        message:
            "Neptune drifts in a world so far,\nYet love can cross the farthest star.\nNo distance breaks what we define,\nWill you be my Neptune, always mine?",
        type: "neptune",
    },
];

interface LoveMapPageProps {
    isVisible?: boolean;
}

const LoveMapPage: React.FC<LoveMapPageProps> = ({ isVisible = true }) => {
    const [proposalAccepted, setProposalAccepted] = useState(false);
    const [currentMilestoneIndex, setCurrentMilestoneIndex] = useState(0);
    const [showFinalMessage, setShowFinalMessage] = useState(false);
    const [showFinalImage, setShowFinalImage] = useState(false);
    const [showStatsPopup, setShowStatsPopup] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Auto redirect to main page after celebration
    useEffect(() => {
        if (proposalAccepted) {
            const timer = setTimeout(() => {
                navigate("/");
            }, 2500); // 2.5 seconds

            return () => clearTimeout(timer);
        }
    }, [proposalAccepted, navigate]);

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
                            justifyContent: isMobile
                                ? "center"
                                : "space-around",
                            width: isMobile
                                ? "clamp(100%, 75vw, 75%)"
                                : "clamp(80%, 75vw, 75%)",
                            height: "clamp(70%, 80vh, 80%)",
                            gap: "clamp(0.5rem, 3vw, 2rem)",
                            flexDirection: isMobile ? "column" : "row",
                        }}
                    >
                        <PlanetImage
                            src={`/planets/${milestones[currentMilestoneIndex].type}.png`}
                            alt={milestones[currentMilestoneIndex].type}
                        />

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "clamp(1rem, 2vw, 1.5rem)",
                            }}
                        >
                            <CenterContent>
                                <ModalTitle>
                                    {milestones[currentMilestoneIndex].title}
                                </ModalTitle>
                                <ModalText>
                                    {milestones[currentMilestoneIndex].message}
                                </ModalText>
                            </CenterContent>

                            {/* Button below text on large screens */}
                            {!isMobile && (
                                <Button
                                    onClick={() => {
                                        if (currentMilestoneIndex === 7) {
                                            setShowFinalMessage(true);
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
                            )}
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "clamp(1rem, 2vw, 1.5rem)",
                            }}
                        >
                            <CarouselImage
                                src={`/carousel-images/image_${
                                    currentMilestoneIndex + 1
                                }.webp`}
                                alt={`Carousel image ${
                                    currentMilestoneIndex + 1
                                }`}
                            />

                            {/* Button below carousel image on mobile */}
                            {isMobile && (
                                <Button
                                    onClick={() => {
                                        if (currentMilestoneIndex === 7) {
                                            setShowFinalMessage(true);
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
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </MapContainer>

            {/* Final Scrolling Message */}
            {showFinalMessage && (
                <ScrollingText
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <ScrollingContent>
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            style={{ marginBottom: "2rem" }}
                        >
                            <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 1 }}
                            >
                                We flew past Mercury, swift and bright,
                            </motion.div>
                            <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1, duration: 1 }}
                            >
                                Through Venus, glowing with love's pure light.
                            </motion.div>
                            <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1.5, duration: 1 }}
                            >
                                Across the Earth, where memories grow,
                            </motion.div>
                            <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 2, duration: 1 }}
                            >
                                To fiery Mars, where passions show.
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 2.5, duration: 1 }}
                            style={{ marginBottom: "2rem" }}
                        >
                            <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 2.5, duration: 1 }}
                            >
                                Through Jupiter's realm, so grand, so wide,
                            </motion.div>
                            <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 3, duration: 1 }}
                            >
                                And Saturn's rings where dreams reside.
                            </motion.div>
                            <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 3.5, duration: 1 }}
                            >
                                Past Uranus, unique and rare,
                            </motion.div>
                            <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 4, duration: 1 }}
                            >
                                To Neptune's depths, love beyond compare.
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 4.5, duration: 1 }}
                            style={{ marginBottom: "2rem" }}
                        >
                            <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 4.5, duration: 1 }}
                            >
                                Now in the stars, just you and me,
                            </motion.div>
                            <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 5, duration: 1 }}
                            >
                                Boundless love across the galaxy.
                            </motion.div>
                            <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 5.5, duration: 1 }}
                            >
                                Through every world, my heart is true,
                            </motion.div>
                            <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 6, duration: 1 }}
                            >
                                So tell me, will you be my girlfriend too?
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 7, duration: 1 }}
                        >
                            <Button
                                onClick={() => {
                                    setShowFinalMessage(false);
                                    setShowFinalImage(true);
                                    setImageLoaded(false); // Reset loading state
                                }}
                                style={{ marginTop: "2rem" }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Next
                            </Button>
                        </motion.div>
                    </ScrollingContent>
                </ScrollingText>
            )}

            {/* Final Image Display */}
            {showFinalImage && (
                <FinalImageContainer>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={
                            imageLoaded
                                ? { opacity: 1, scale: 1 }
                                : { opacity: 0, scale: 0.9 }
                        }
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <FinalImage
                            src="/carousel-images/image_9.webp"
                            alt="Final romantic image"
                            onLoad={() => setImageLoaded(true)}
                            style={{ display: imageLoaded ? "block" : "none" }}
                        />
                        {!imageLoaded && (
                            <div
                                style={{
                                    width: "500px",
                                    height: "500px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: "rgba(255,255,255,0.1)",
                                    borderRadius: "20px",
                                    color: "#42e1f5",
                                    fontSize: "1.2rem",
                                }}
                            >
                                Loading your special moment... ✨
                            </div>
                        )}
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                            imageLoaded
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 20 }
                        }
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <Button
                            onClick={() => {
                                setShowFinalImage(false);
                                setShowStatsPopup(true);
                            }}
                            style={{ marginTop: "2rem" }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Yes! 💕
                        </Button>
                    </motion.div>
                </FinalImageContainer>
            )}

            {/* Stats Popup */}
            {showStatsPopup && (
                <StatsPopup
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <StatsContent>
                        <StatsTitle>Development Journey</StatsTitle>
                        <StatsText>
                            57 Coding Files{"\n"}
                            68,778 Lines of Codes{"\n"}
                            423 Hours 37 Minutes of Work{"\n"}
                            132 Days{"\n"}
                        </StatsText>
                        <PoemText>
                            Through sleepless nights and endless lines of code,
                            {"\n"}I poured my heart into this complex code.
                            {"\n"}
                            Every file, every line, every minute spent,{"\n"}
                            Was all worth it the moment you said yes.
                        </PoemText>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            <Button
                                onClick={() => {
                                    setShowStatsPopup(false);
                                    setProposalAccepted(true);
                                }}
                                style={{ marginTop: "2rem" }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Continue to Celebration! 🎉
                            </Button>
                        </motion.div>
                    </StatsContent>
                </StatsPopup>
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
                        style={{
                            fontSize: "clamp(2rem, 8vw, 4rem)",
                            marginBottom: "clamp(0.5rem, 2vw, 1rem)",
                        }}
                    >
                        💕🎉
                    </motion.div>
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        style={{
                            color: "#42e1f5",
                            textAlign: "center",
                            fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
                            fontWeight: 600,
                            padding: "0 clamp(1rem, 5vw, 2rem)",
                        }}
                    >
                        She Said Yes! Forever Begins! 🚀❤️
                    </motion.h1>
                </motion.div>
            )}
        </LoveMapContainer>
    );
};

export default LoveMapPage;
