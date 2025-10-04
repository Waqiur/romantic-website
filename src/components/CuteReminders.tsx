import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const RemindersModal = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
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
    position: relative;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        grid-template-columns: repeat(2, 1fr);
        gap: ${({ theme }) => theme.spacing.lg};
        padding: ${({ theme }) => theme.spacing.lg};
    }
`;

const StarWrapper = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    transition: opacity 0.3s ease;
    will-change: transform;

    &:hover {
        transform: scale(1.1);
        z-index: 10;
    }

    &:active {
        transform: scale(0.95);
    }
`;

const Star = styled(motion.div)<{ color: string }>`
    font-size: clamp(3rem, 8vw, 5rem);
    color: ${({ color }) => color};
    filter: drop-shadow(0 2px 8px rgba(255, 107, 157, 0.3));
    transition: color 0.3s ease, filter 0.3s ease;
    will-change: transform;

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

const ExpandedStarOverlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3000;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
`;

const ExpandedStarContainer = styled(motion.div)`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: clamp(300px, 50vw, 600px);
    height: clamp(300px, 50vw, 600px);

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: clamp(280px, 80vw, 500px);
        height: clamp(280px, 80vw, 500px);
    }
`;

const ExpandedStar = styled(motion.div)`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(18rem, 40vw, 30rem);
    filter: drop-shadow(0 0 30px #ffd700) drop-shadow(0 0 60px #ffd700);
    animation: expandedStarPulse 2s ease-in-out infinite;
    z-index: 1;

    @keyframes expandedStarPulse {
        0%,
        100% {
            transform: scale(1) rotate(0deg);
        }
        50% {
            transform: scale(1.05) rotate(2deg);
        }
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: clamp(15rem, 60vw, 25rem);
    }
`;

const ExpandedMessage = styled(motion.div)`
    position: relative;
    z-index: 2;
    color: #2d3748;
    font-weight: 700;
    text-align: center;
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    line-height: 1.4;
    max-width: 70%;
    text-shadow: 0 2px 4px rgba(255, 255, 255, 0.8),
        0 0 10px rgba(255, 255, 255, 0.6);
    padding: ${({ theme }) => theme.spacing.md};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        font-size: clamp(0.95rem, 3vw, 1.3rem);
        max-width: 75%;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: clamp(0.85rem, 3.5vw, 1.1rem);
        max-width: 80%;
        line-height: 1.3;
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
    color: string;
    message: string;
}

interface CuteRemindersProps {
    isOpen: boolean;
    onClose: () => void;
}

const CuteReminders: React.FC<CuteRemindersProps> = React.memo(
    ({ isOpen, onClose }) => {
        const stars: StarData[] = [
            {
                id: 1,
                color: "#ff6b9d",
                message:
                    "You’re effortlessly beautiful, even when you don’t try 💕",
            },
            {
                id: 2,
                color: "#a18cd1",
                message: "Your smile could brighten even the dullest day ☀️",
            },
            {
                id: 3,
                color: "#4fd1c7",
                message: "Every glance at you feels like the first time 💖",
            },
            {
                id: 4,
                color: "#ffd93d",
                message: "You look beautiful in every mood, every moment 💛",
            },
            {
                id: 5,
                color: "#ff9f43",
                message: "There’s something so gentle and lovely about you 🌸",
            },
            {
                id: 6,
                color: "#e74c3c",
                message:
                    "You’re the kind of beautiful that stays in my heart ❤️",
            },
        ];

        const [activeMessage, setActiveMessage] = useState<{
            starId: number;
            message: string;
        } | null>(null);

        const handleStarClick = (starId: number) => {
            const star = stars.find((s) => s.id === starId);
            if (!star) return;

            // Show expanded star with message
            setActiveMessage({ starId, message: star.message });

            // Auto-close after 3.5 seconds
            setTimeout(() => {
                setActiveMessage(null);
            }, 3500);
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
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ModalCloseButton onClick={onClose}>
                                    ×
                                </ModalCloseButton>

                                <ModalTitle>✨ Cute Reminders ✨</ModalTitle>

                                <StarsContainer>
                                    {stars.map((star) => (
                                        <StarWrapper
                                            key={star.id}
                                            onClick={() =>
                                                handleStarClick(star.id)
                                            }
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Star color={star.color}>⭐</Star>
                                        </StarWrapper>
                                    ))}
                                </StarsContainer>

                                {/* Expanded Star Overlay */}
                                <AnimatePresence>
                                    {activeMessage && (
                                        <ExpandedStarOverlay
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            onClick={() =>
                                                setActiveMessage(null)
                                            }
                                        >
                                            <ExpandedStarContainer
                                                initial={{
                                                    scale: 0,
                                                    rotate: -180,
                                                }}
                                                animate={{
                                                    scale: 1,
                                                    rotate: 0,
                                                }}
                                                exit={{ scale: 0, rotate: 180 }}
                                                transition={{
                                                    duration: 0.5,
                                                    ease: "backOut",
                                                }}
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                <ExpandedStar>⭐</ExpandedStar>
                                                <ExpandedMessage
                                                    initial={{
                                                        opacity: 0,
                                                        scale: 0.8,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1,
                                                    }}
                                                    transition={{
                                                        delay: 0.3,
                                                        duration: 0.4,
                                                    }}
                                                >
                                                    {activeMessage.message}
                                                </ExpandedMessage>
                                            </ExpandedStarContainer>
                                        </ExpandedStarOverlay>
                                    )}
                                </AnimatePresence>

                                <Instructions>
                                    Click on the stars to reveal cute reminders!
                                    💕
                                </Instructions>
                            </RemindersModalContent>
                        </RemindersModal>
                    )}
                </AnimatePresence>
            </>
        );
    }
);

export default CuteReminders;
