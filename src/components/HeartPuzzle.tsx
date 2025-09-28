import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const PoemsModal = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(25px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: ${({ theme }) => theme.spacing.lg};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: ${({ theme }) => theme.spacing.md};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: ${({ theme }) => theme.spacing.sm};
        align-items: flex-start;
        padding-top: 5vh;
    }

    @media (max-height: 600px) {
        align-items: flex-start;
        padding-top: 2vh;
    }
`;

const PoemsModalContent = styled(motion.div)`
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.18) 0%,
        rgba(255, 255, 255, 0.12) 30%,
        rgba(255, 255, 255, 0.08) 70%,
        rgba(255, 255, 255, 0.05) 100%
    );
    backdrop-filter: blur(35px);
    -webkit-backdrop-filter: blur(35px);
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    padding: ${({ theme }) => theme.spacing.lg}
        ${({ theme }) => theme.spacing.xxl};
    max-width: 650px;
    width: 90%;
    position: relative;
    border: 2px solid rgba(255, 255, 255, 0.25);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6),
        0 0 0 1px rgba(255, 255, 255, 0.1) inset,
        0 10px 30px rgba(255, 107, 157, 0.2);

    /* Custom scrollbar */
    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #ff6b9d, #a18cd1);
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #ff5a8a, #9578c4);
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: ${({ theme }) => theme.spacing.xl};
        max-width: 85%;
        width: 85%;
        border-radius: ${({ theme }) => theme.borderRadius.lg};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: ${({ theme }) => theme.spacing.lg};
        max-width: 95%;
        width: 95%;
        border-radius: ${({ theme }) => theme.borderRadius.md};
        margin: 0;
    }

    @media (max-width: 400px) {
        padding: ${({ theme }) => theme.spacing.md};
        width: 98%;
        max-width: 98%;
    }

    @media (max-height: 700px) {
        padding: ${({ theme }) => theme.spacing.lg};
    }

    @media (max-height: 600px) {
        padding: ${({ theme }) => theme.spacing.md};
    }
`;

const ModalCloseButton = styled.button`
    position: absolute;
    top: ${({ theme }) => theme.spacing.md};
    right: ${({ theme }) => theme.spacing.md};
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: 35px;
        height: 35px;
        font-size: 1.3rem;
        top: ${({ theme }) => theme.spacing.sm};
        right: ${({ theme }) => theme.spacing.sm};
    }

    &:hover {
        background: rgba(255, 107, 157, 0.3);
        border-color: rgba(255, 107, 157, 0.5);
        transform: scale(1.1);
    }
`;

const ModalPoemTitle = styled.h2`
    font-size: clamp(1.6rem, 5vw, 2.8rem);
    font-family: ${({ theme }) => theme.fonts.heading};
    background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 50%, #fff0f5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    text-align: center;
    font-weight: 700;
    text-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
    position: relative;
    line-height: 1.2;
    padding: 0 ${({ theme }) => theme.spacing.sm};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin-bottom: ${({ theme }) => theme.spacing.lg};
        padding: 0 ${({ theme }) => theme.spacing.xs};
        line-height: 1.1;
    }

    @media (max-width: 400px) {
        font-size: clamp(1.4rem, 6vw, 2rem);
    }

    &::after {
        content: "";
        position: absolute;
        bottom: -15px;
        left: 50%;
        transform: translateX(-50%);
        width: clamp(60px, 20vw, 100px);
        height: 3px;
        background: linear-gradient(90deg, #ff6b9d, #a18cd1, #4fd1c7);
        border-radius: 5px;
        box-shadow: 0 2px 8px rgba(255, 107, 157, 0.4);

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            bottom: -10px;
            height: 2px;
        }
    }

    &::before {
        content: "📖";
        position: absolute;
        top: -10px;
        left: -40px;
        font-size: clamp(1.2rem, 3vw, 1.8rem);
        animation: bookFloat 3s ease-in-out infinite;

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            left: -25px;
            top: -5px;
        }

        @keyframes bookFloat {
            0%,
            100% {
                transform: translateY(0px) rotate(0deg);
            }
            50% {
                transform: translateY(-8px) rotate(5deg);
            }
        }
    }
`;

const HeartPuzzleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xl};
    margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const HeartPuzzleArea = styled.div`
    position: relative;
    width: 350px;
    height: 300px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    border: 2px solid rgba(255, 107, 157, 0.3);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    /* Responsive styles for golden heart */
    .golden-heart-svg {
        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            width: 240px !important;
            height: 210px !important;
        }
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: 300px;
        height: 250px;
    }
`;

const HeartSVG = styled(motion.svg)<{ isGlowing: boolean }>`
    width: 280px;
    height: 250px;
    cursor: pointer;
    filter: ${({ isGlowing }) =>
        isGlowing
            ? `drop-shadow(0 0 25px rgba(255, 215, 0, 1)) 
               drop-shadow(0 0 50px rgba(255, 215, 0, 0.8)) 
               drop-shadow(0 0 100px rgba(255, 215, 0, 0.6)) 
               drop-shadow(0 0 150px rgba(255, 215, 0, 0.4))`
            : "drop-shadow(0 4px 20px rgba(255, 107, 157, 0.3))"};
    transition: filter 0.5s ease;

    @keyframes heartPulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: 240px;
        height: 210px;
    }
`;

const HeartSegment = styled(motion.path)<{
    filled: boolean;
    segmentColor: string;
    isGlowing: boolean;
}>`
    fill: ${({ filled, segmentColor, isGlowing }) => {
        if (!filled) return "rgba(255, 255, 255, 0.1)";
        if (isGlowing) return "#FFD700"; // Pure gold when glowing
        return segmentColor;
    }};
    stroke: ${({ isGlowing }) =>
        isGlowing ? "#FFD700" : "rgba(255, 107, 157, 0.3)"};
    stroke-width: ${({ isGlowing }) => (isGlowing ? "0" : "2")};
    cursor: ${({ isGlowing }) => (isGlowing ? "default" : "pointer")};
    pointer-events: ${({ isGlowing }) => (isGlowing ? "none" : "auto")};
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    filter: ${({ filled, isGlowing, segmentColor }) => {
        if (!filled) return "none";
        if (isGlowing) return "none"; // Remove individual segment glow
        return "drop-shadow(0 0 10px rgba(255, 107, 157, 0.6))";
    }};

    &:hover {
        fill: ${({ filled, segmentColor, isGlowing }) => {
            if (isGlowing) return "#FFD700"; // No hover effect when glowing
            return filled ? segmentColor : "rgba(255, 255, 255, 0.2)";
        }};
        stroke: ${({ isGlowing }) =>
            isGlowing ? "#FFD700" : "rgba(255, 107, 157, 0.8)"};
        stroke-width: ${({ isGlowing }) => (isGlowing ? "0" : "3")};
        transform: ${({ isGlowing }) => (isGlowing ? "none" : "scale(1.02)")};
        transform-origin: center;
    }

    &:active {
        transform: ${({ isGlowing }) => (isGlowing ? "none" : "scale(0.98)")};
    }
`;

const PuzzleInstructions = styled.p`
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.1rem;
    text-align: center;
    font-style: italic;
    margin: 0;
    padding: 0 ${({ theme }) => theme.spacing.md};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 1rem;
        padding: 0 ${({ theme }) => theme.spacing.sm};
    }
`;

interface HeartSegmentData {
    id: number;
    filled: boolean;
    color: string;
    path: string;
    label: string;
}

interface HeartPuzzleProps {
    isOpen: boolean;
    onClose: () => void;
}

const HeartPuzzle: React.FC<HeartPuzzleProps> = ({ isOpen, onClose }) => {
    const [heartSegments, setHeartSegments] = useState<HeartSegmentData[]>([
        {
            id: 1,
            filled: false,
            color: "#ff6b9d",
            path: "",
            label: "Top Left",
        },
        {
            id: 2,
            filled: false,
            color: "#a18cd1",
            path: "",
            label: "Top Right",
        },
        {
            id: 3,
            filled: false,
            color: "#4fd1c7",
            path: "",
            label: "Middle Left",
        },
        {
            id: 4,
            filled: false,
            color: "#ffd93d",
            path: "",
            label: "Center",
        },
        {
            id: 5,
            filled: false,
            color: "#ff9f43",
            path: "",
            label: "Middle Right",
        },
        {
            id: 6,
            filled: false,
            color: "#e74c3c",
            path: "",
            label: "Bottom",
        },
    ]);
    const [showGlowingHeart, setShowGlowingHeart] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const handleHeartSegmentClick = (segmentId: number) => {
        const newSegments = heartSegments.map((segment) => {
            if (segment.id === segmentId && !segment.filled) {
                return { ...segment, filled: true };
            }
            return segment;
        });

        setHeartSegments(newSegments);
        setCurrentStep((prev) => prev + 1);

        // Check if all segments are filled
        const allFilled = newSegments.every((segment) => segment.filled);
        if (allFilled && !showGlowingHeart) {
            setShowGlowingHeart(true);
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <PoemsModal
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                    >
                        <PoemsModalContent
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ModalCloseButton onClick={onClose}>
                                ×
                            </ModalCloseButton>

                            <ModalPoemTitle>
                                💖 Connect the Heart 💖
                            </ModalPoemTitle>

                            <HeartPuzzleContainer>
                                <HeartPuzzleArea>
                                    {showGlowingHeart && (
                                        <motion.svg
                                            viewBox="0 0 300 250"
                                            className="golden-heart-svg"
                                            style={{
                                                position: "absolute",
                                                width: "280px",
                                                height: "250px",
                                                zIndex: 10,
                                                pointerEvents: "none",
                                            }}
                                            animate={{ scale: [1, 1.05, 1] }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                repeatType: "reverse",
                                            }}
                                        >
                                            <path
                                                d="M150,50 C130,20 90,20 70,50 C50,80 70,120 150,180 C230,120 250,80 230,50 C210,20 170,20 150,50 Z"
                                                fill="#FFD700"
                                                stroke="none"
                                                filter="drop-shadow(0 0 25px #FFD700) drop-shadow(0 0 50px #FFD700) drop-shadow(0 0 100px #FFD700)"
                                            />
                                        </motion.svg>
                                    )}
                                    <HeartSVG
                                        viewBox="0 0 300 250"
                                        isGlowing={showGlowingHeart}
                                        animate={
                                            showGlowingHeart
                                                ? {
                                                      scale: [1, 1.05, 1],
                                                  }
                                                : {}
                                        }
                                        transition={{
                                            duration: 2,
                                            repeat: showGlowingHeart
                                                ? Infinity
                                                : 0,
                                            repeatType: "reverse",
                                        }}
                                        style={{
                                            opacity: showGlowingHeart ? 0 : 1,
                                            transition: "opacity 0.5s ease",
                                        }}
                                    >
                                        {/* Top left lobe - wood pattern */}
                                        <HeartSegment
                                            d="M150,50 C140,30 120,20 100,20 C80,20 65,35 65,55 C65,75 80,90 100,105 L150,50 Z"
                                            filled={
                                                heartSegments[0]?.filled ||
                                                false
                                            }
                                            segmentColor={
                                                heartSegments[0]?.color ||
                                                "#ff6b9d"
                                            }
                                            isGlowing={showGlowingHeart}
                                            onClick={() =>
                                                handleHeartSegmentClick(1)
                                            }
                                        />

                                        {/* Top right lobe - dotted pattern */}
                                        <HeartSegment
                                            d="M150,50 C160,30 180,20 200,20 C220,20 235,35 235,55 C235,75 220,90 200,105 L150,50 Z"
                                            filled={
                                                heartSegments[1]?.filled ||
                                                false
                                            }
                                            segmentColor={
                                                heartSegments[1]?.color ||
                                                "#a18cd1"
                                            }
                                            isGlowing={showGlowingHeart}
                                            onClick={() =>
                                                handleHeartSegmentClick(2)
                                            }
                                        />

                                        {/* Middle left - spotted pattern */}
                                        <HeartSegment
                                            d="M100,105 C80,90 65,75 65,55 C65,85 75,115 100,140 C115,150 130,155 150,160 L150,130 C130,125 115,115 100,105 Z"
                                            filled={
                                                heartSegments[2]?.filled ||
                                                false
                                            }
                                            segmentColor={
                                                heartSegments[2]?.color ||
                                                "#4fd1c7"
                                            }
                                            isGlowing={showGlowingHeart}
                                            onClick={() =>
                                                handleHeartSegmentClick(3)
                                            }
                                        />

                                        {/* Center core */}
                                        <HeartSegment
                                            d="M150,50 L100,105 C115,115 130,125 150,130 C170,125 185,115 200,105 L150,50 Z"
                                            filled={
                                                heartSegments[3]?.filled ||
                                                false
                                            }
                                            segmentColor={
                                                heartSegments[3]?.color ||
                                                "#ffd93d"
                                            }
                                            isGlowing={showGlowingHeart}
                                            onClick={() =>
                                                handleHeartSegmentClick(4)
                                            }
                                        />

                                        {/* Middle right - horizontal lines */}
                                        <HeartSegment
                                            d="M200,105 C220,90 235,75 235,55 C235,85 225,115 200,140 C185,150 170,155 150,160 L150,130 C170,125 185,115 200,105 Z"
                                            filled={
                                                heartSegments[4]?.filled ||
                                                false
                                            }
                                            segmentColor={
                                                heartSegments[4]?.color ||
                                                "#ff9f43"
                                            }
                                            isGlowing={showGlowingHeart}
                                            onClick={() =>
                                                handleHeartSegmentClick(5)
                                            }
                                        />

                                        {/* Bottom segment */}
                                        <HeartSegment
                                            d="M100,140 C115,155 135,170 150,180 C165,170 185,155 200,140 C185,150 170,155 150,160 C130,155 115,150 100,140 Z"
                                            filled={
                                                heartSegments[5]?.filled ||
                                                false
                                            }
                                            segmentColor={
                                                heartSegments[5]?.color ||
                                                "#e74c3c"
                                            }
                                            isGlowing={showGlowingHeart}
                                            onClick={() =>
                                                handleHeartSegmentClick(6)
                                            }
                                        />

                                        {/* Progress indicator */}
                                        <text
                                            x="150"
                                            y="205"
                                            textAnchor="middle"
                                            fill="rgba(255, 255, 255, 0.9)"
                                            fontSize="16"
                                            fontFamily="Arial, sans-serif"
                                            fontWeight="600"
                                        >
                                            {currentStep} /{" "}
                                            {heartSegments.length}
                                        </text>

                                        {/* Progress dots */}
                                        {heartSegments.map((segment, index) => (
                                            <circle
                                                key={`dot-${segment.id}`}
                                                cx={90 + index * 20}
                                                cy={225}
                                                r="5"
                                                fill={
                                                    segment.filled
                                                        ? segment.color
                                                        : "rgba(255, 255, 255, 0.3)"
                                                }
                                                stroke="rgba(255, 255, 255, 0.6)"
                                                strokeWidth="1.5"
                                            />
                                        ))}
                                    </HeartSVG>
                                </HeartPuzzleArea>

                                <PuzzleInstructions>
                                    Click on the heart segments to fill them
                                    with love! 💕
                                    <br />
                                    <span
                                        style={{
                                            fontSize: "0.9rem",
                                            opacity: 0.8,
                                        }}
                                    >
                                        Fill all {heartSegments.length} segments
                                        to complete the heart! ({currentStep}/
                                        {heartSegments.length})
                                    </span>
                                </PuzzleInstructions>
                            </HeartPuzzleContainer>
                        </PoemsModalContent>
                    </PoemsModal>
                )}
            </AnimatePresence>
        </>
    );
};

export default HeartPuzzle;
