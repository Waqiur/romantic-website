import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const RemindersModal = styled(motion.div)`
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

const RemindersModalContent = styled(motion.div)`
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

const ModalTitle = styled.h2`
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
        content: "✨";
        position: absolute;
        top: -10px;
        left: -40px;
        font-size: clamp(1.2rem, 3vw, 1.8rem);
        animation: sparkleFloat 3s ease-in-out infinite;

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            left: -25px;
            top: -5px;
        }

        @keyframes sparkleFloat {
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

const StarsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.spacing.xl};
    max-width: 450px;
    margin: 0 auto;
    justify-items: center;
    align-items: center;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        grid-template-columns: repeat(2, 1fr);
        gap: ${({ theme }) => theme.spacing.lg};
        padding: ${({ theme }) => theme.spacing.lg};
    }
`;

const StarWrapper = styled(motion.div)<{ clicked: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    opacity: ${({ clicked }) => (clicked ? 0.6 : 1)};
    transition: opacity 0.3s ease;

    &:hover {
        transform: scale(1.1);
    }

    &:active {
        transform: scale(0.95);
    }
`;

const Star = styled(motion.div)<{ clicked: boolean; color: string }>`
    font-size: clamp(3rem, 8vw, 5rem);
    color: ${({ clicked, color }) => (clicked ? "#FFD700" : color)};
    filter: ${({ clicked }) =>
        clicked
            ? "drop-shadow(0 0 15px #FFD700) drop-shadow(0 0 30px #FFD700)"
            : "drop-shadow(0 2px 8px rgba(255, 107, 157, 0.3))"};
    transition: all 0.3s ease;
    animation: ${({ clicked }) =>
        clicked ? "starGlow 1s ease-in-out infinite alternate" : "none"};

    @keyframes starGlow {
        0% {
            transform: scale(1) rotate(0deg);
        }
        100% {
            transform: scale(1.2) rotate(180deg);
        }
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: clamp(2.5rem, 10vw, 4rem);
    }
`;

const ConnectionMessage = styled(motion.div)<{
    x: number;
    y: number;
    flipped: boolean;
}>`
    position: absolute;
    left: ${({ x }) => x}px;
    top: ${({ y }) => y}px;
    transform: translate(-50%, -100%);
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.95),
        rgba(248, 249, 255, 0.95)
    );
    border-radius: 20px;
    padding: ${({ theme }) => theme.spacing.sm}
        ${({ theme }) => theme.spacing.md};
    border: 2px solid rgba(255, 107, 157, 0.8);
    font-size: 0.85rem;
    color: #2d3748;
    font-weight: 600;
    text-align: center;
    white-space: nowrap;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    z-index: 60;
    pointer-events: auto;
    cursor: pointer;
    margin: 0 10px;

    &::after {
        content: "✨";
        position: absolute;
        bottom: -12px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.8rem;
        animation: sparkle 2s ease-in-out infinite;
    }

    &::before {
        content: "";
        position: absolute;
        bottom: -8px;
        ${(props) =>
            props.flipped
                ? `
            left: 100%;
            transform: translateX(-100%);
            border-left: 8px solid rgba(255, 255, 255, 0.95);
            border-right: none;
            border-top: none;
            border-bottom: 8px solid transparent;
        `
                : `
            left: 50%;
            transform: translateX(-50%);
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid rgba(255, 255, 255, 0.95);
        `}
    }

    @keyframes sparkle {
        0%,
        100% {
            transform: translateX(-50%) scale(1);
        }
        50% {
            transform: translateX(-50%) scale(1.2) rotate(180deg);
        }
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        font-size: 0.8rem;
        padding: ${({ theme }) => theme.spacing.xs}
            ${({ theme }) => theme.spacing.sm};
        margin: 0 8px;
        max-width: 250px;
        min-width: 180px;
        white-space: normal;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 0.75rem;
        padding: ${({ theme }) => theme.spacing.xs}
            ${({ theme }) => theme.spacing.sm};
        border-radius: 15px;
        margin: 0 5px;
    }

    @media (max-width: 400px) {
        font-size: 0.7rem;
        padding: 6px 10px;
        margin: 0 3px;
    }
`;

const Instructions = styled.p`
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.1rem;
    text-align: center;
    font-style: italic;
    margin: ${({ theme }) => theme.spacing.xl} 0 0 0;
    padding: 0 ${({ theme }) => theme.spacing.md};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 1rem;
        padding: 0 ${({ theme }) => theme.spacing.sm};
        margin: ${({ theme }) => theme.spacing.lg} 0 0 0;
    }
`;

interface StarData {
    id: number;
    clicked: boolean;
    color: string;
    message: string;
}

interface CuteRemindersProps {
    isOpen: boolean;
    onClose: () => void;
}

const CuteReminders: React.FC<CuteRemindersProps> = ({ isOpen, onClose }) => {
    const [stars, setStars] = useState<StarData[]>([
        {
            id: 1,
            clicked: false,
            color: "#ff6b9d",
            message:
                "You’re effortlessly beautiful, even when you don’t try 💕",
        },
        {
            id: 2,
            clicked: false,
            color: "#a18cd1",
            message: "Your smile could brighten even the dullest day ☀️",
        },
        {
            id: 3,
            clicked: false,
            color: "#4fd1c7",
            message: "Every glance at you feels like the first time 💖",
        },
        {
            id: 4,
            clicked: false,
            color: "#ffd93d",
            message: "You look beautiful in every mood, every moment 💛",
        },
        {
            id: 5,
            clicked: false,
            color: "#ff9f43",
            message: "There’s something so gentle and lovely about you 🌸",
        },
        {
            id: 6,
            clicked: false,
            color: "#e74c3c",
            message: "You’re the kind of beautiful that stays in my heart ❤️",
        },
    ]);

    const [activeMessage, setActiveMessage] = useState<{
        starId: number;
        message: string;
    } | null>(null);
    const [starPositions, setStarPositions] = useState<{
        [key: number]: { x: number; y: number };
    }>({});
    const containerRef = useRef<HTMLDivElement>(null);
    const starRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

    useEffect(() => {
        if (isOpen && containerRef.current) {
            // Calculate positions after modal is fully rendered
            const timer = setTimeout(() => {
                const newPositions: {
                    [key: number]: { x: number; y: number };
                } = {};
                Object.entries(starRefs.current).forEach(([id, ref]) => {
                    if (ref && containerRef.current) {
                        const starRect = ref.getBoundingClientRect();
                        const containerRect =
                            containerRef.current.getBoundingClientRect();
                        newPositions[parseInt(id)] = {
                            x:
                                starRect.left +
                                starRect.width / 2 -
                                containerRect.left,
                            y:
                                starRect.top +
                                starRect.height / 2 -
                                containerRect.top,
                        };
                    }
                });
                setStarPositions(newPositions);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isOpen, stars]);

    const handleStarClick = (starId: number) => {
        const star = stars.find((s) => s.id === starId);
        if (!star) return;

        // Show message bubble
        setActiveMessage({ starId, message: star.message });

        // Hide message after 4 seconds for better readability
        setTimeout(() => {
            setActiveMessage(null);
        }, 4000);

        // Mark star as clicked
        setStars((prev) =>
            prev.map((s) => (s.id === starId ? { ...s, clicked: true } : s))
        );
    };

    const getConstrainedPosition = (starId: number) => {
        const starPos = starPositions[starId];
        if (!starPos || !containerRef.current)
            return { x: 0, y: 0, flipped: false };

        const containerRect = containerRef.current.getBoundingClientRect();
        const bubbleWidth = 250;
        const halfBubble = bubbleWidth / 2;
        const padding = 10;

        // Calculate constrained y position (always above the star)
        const constrainedY = Math.max(80, starPos.y - 20);

        let constrainedX = starPos.x;
        let flipped = false;

        if (constrainedX + halfBubble > containerRect.width - padding) {
            // Not enough space on right, flip to left
            flipped = true;
            constrainedX = starPos.x - halfBubble;
            if (constrainedX - halfBubble < padding) {
                constrainedX = padding + halfBubble;
            }
        }

        return { x: constrainedX, y: constrainedY, flipped };
    };

    const resetReminders = () => {
        setStars((prev) => prev.map((star) => ({ ...star, clicked: false })));
        setActiveMessage(null);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <RemindersModal
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                    >
                        <RemindersModalContent
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                            ref={containerRef}
                        >
                            <ModalCloseButton onClick={onClose}>
                                ×
                            </ModalCloseButton>

                            <ModalTitle>✨ Cute Reminders ✨</ModalTitle>

                            <StarsContainer>
                                {stars.map((star) => (
                                    <StarWrapper
                                        key={star.id}
                                        clicked={star.clicked}
                                        onClick={() => handleStarClick(star.id)}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        ref={(el) => {
                                            starRefs.current[star.id] = el;
                                        }}
                                    >
                                        <Star
                                            clicked={star.clicked}
                                            color={star.color}
                                        >
                                            ⭐
                                        </Star>
                                    </StarWrapper>
                                ))}

                                {activeMessage &&
                                    containerRef.current &&
                                    (() => {
                                        const { x, y, flipped } =
                                            getConstrainedPosition(
                                                activeMessage.starId
                                            );
                                        return (
                                            <ConnectionMessage
                                                x={x}
                                                y={y}
                                                flipped={flipped}
                                                initial={{
                                                    scale: 0,
                                                    opacity: 0,
                                                    y: 10,
                                                }}
                                                animate={{
                                                    scale: 1,
                                                    opacity: 1,
                                                    y: 0,
                                                }}
                                                exit={{
                                                    scale: 0,
                                                    opacity: 0,
                                                    y: 10,
                                                }}
                                                transition={{
                                                    duration: 0.5,
                                                    ease: "backOut",
                                                }}
                                                onClick={() =>
                                                    setActiveMessage(null)
                                                }
                                            >
                                                {activeMessage.message}
                                            </ConnectionMessage>
                                        );
                                    })()}
                            </StarsContainer>

                            <Instructions>
                                Click on the stars to reveal cute reminders! 💕
                                <br />
                                <button
                                    onClick={resetReminders}
                                    style={{
                                        background: "rgba(255, 107, 157, 0.2)",
                                        border: "1px solid rgba(255, 107, 157, 0.5)",
                                        borderRadius: "20px",
                                        padding: "5px 15px",
                                        color: "white",
                                        cursor: "pointer",
                                        marginTop: "10px",
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    Reset Stars ✨
                                </button>
                            </Instructions>
                        </RemindersModalContent>
                    </RemindersModal>
                )}
            </AnimatePresence>
        </>
    );
};

export default CuteReminders;
