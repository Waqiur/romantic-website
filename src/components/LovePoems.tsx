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

const ModalPoemContent = styled.div`
    color: rgba(255, 255, 255, 0.96);
    line-height: 1.9;
    font-size: clamp(1rem, 3vw, 1.25rem);
    text-align: center;
    font-style: italic;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    font-weight: 400;
    letter-spacing: 0.3px;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        font-size: clamp(0.95rem, 3.2vw, 1.15rem);
        line-height: 1.8;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: clamp(0.9rem, 4vw, 1.1rem);
        line-height: 1.7;
        margin-bottom: ${({ theme }) => theme.spacing.lg};
        padding: 0 ${({ theme }) => theme.spacing.xs};
        letter-spacing: 0.2px;
    }

    @media (max-width: 400px) {
        font-size: clamp(0.85rem, 4.5vw, 1rem);
        line-height: 1.6;
    }

    p {
        margin-bottom: ${({ theme }) => theme.spacing.lg};
        position: relative;
        padding: ${({ theme }) => theme.spacing.sm} 0;

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            margin-bottom: ${({ theme }) => theme.spacing.md};
            padding: ${({ theme }) => theme.spacing.xs} 0;
        }

        &:last-child {
            margin-bottom: 0;
        }

        &:first-child::before {
            content: "❝";
            position: absolute;
            top: -10px;
            left: -20px;
            font-size: 2.5rem;
            color: rgba(255, 107, 157, 0.6);
            font-style: normal;
            line-height: 1;

            @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
                font-size: 2rem;
                left: -15px;
                top: -5px;
            }
        }

        &:last-child::after {
            content: "❞";
            position: absolute;
            bottom: -20px;
            right: -20px;
            font-size: 2.5rem;
            color: rgba(161, 140, 209, 0.6);
            font-style: normal;
            line-height: 1;

            @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
                font-size: 2rem;
                right: -15px;
                bottom: -15px;
            }
        }
    }
`;

const PoemCounter = styled.div`
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.15rem;
    font-weight: 700;
    font-family: ${({ theme }) => theme.fonts.heading};
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.15) 0%,
        rgba(255, 255, 255, 0.08) 100%
    );
    padding: ${({ theme }) => theme.spacing.sm}
        ${({ theme }) => theme.spacing.md};
    border-radius: 20px;
    border: 2px solid rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2),
        0 0 0 1px rgba(255, 255, 255, 0.1) inset;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    letter-spacing: 1px;
    min-width: 60px;
    text-align: center;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        font-size: 1.1rem;
        padding: ${({ theme }) => theme.spacing.xs}
            ${({ theme }) => theme.spacing.sm};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 1.05rem;
        padding: ${({ theme }) => theme.spacing.sm};
        border-radius: 15px;
    }

    @media (max-width: 400px) {
        font-size: 1rem;
        padding: 6px 12px;
    }
`;

const NavigationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        gap: ${({ theme }) => theme.spacing.sm};
        margin-top: ${({ theme }) => theme.spacing.md};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        gap: ${({ theme }) => theme.spacing.xs};
        margin-top: ${({ theme }) => theme.spacing.sm};
    }
`;

const PoemContentWrapper = styled.div`
    flex: 1;
    min-width: 0;
`;

const BottomNavButton = styled(motion.button)`
    background: linear-gradient(135deg, #ff6b9d 0%, #a18cd1 50%, #4fd1c7 100%);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
    padding: ${({ theme }) => theme.spacing.sm};
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: 600;
    box-shadow: 0 6px 20px rgba(255, 107, 157, 0.4),
        0 0 0 1px rgba(255, 255, 255, 0.1) inset;
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        width: 40px;
        height: 40px;
        font-size: 1.1rem;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: 38px;
        height: 38px;
        font-size: 1rem;
    }

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        background: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.2),
            transparent,
            rgba(255, 255, 255, 0.1)
        );
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    &:hover {
        transform: scale(1.1);
        box-shadow: 0 10px 30px rgba(255, 107, 157, 0.6),
            0 0 0 2px rgba(255, 255, 255, 0.2) inset;

        &::before {
            opacity: 1;
        }
    }

    &:active {
        transform: scale(0.95);
    }
`;

interface Poem {
    id: number;
    title: string;
    content: string;
    date: string;
}

interface LovePoemsProps {
    isOpen: boolean;
    onClose: () => void;
}

const LovePoems: React.FC<LovePoemsProps> = React.memo(
    ({ isOpen, onClose }) => {
        const [currentPoemIndex, setCurrentPoemIndex] = useState(0);

        // Sample poems data
        const poems: Poem[] = [
            {
                id: 1,
                title: "Cosmic Love",
                content: `Among the stars so bright and true,
I found my universe in you.
Your eyes like galaxies so deep,
In your love, my soul does sleep.

Through meteor showers and moonlit nights,
You are my guiding starlight.
Forever orbiting your heart,
Never again shall we part.`,
                date: "September 2024",
            },
            {
                id: 2,
                title: "Stardust Dreams",
                content: `We are made of stardust, they say,
Born from the same celestial clay.
In the vastness of space and time,
Your heart found its way to mine.

Like comets dancing through the sky,
Our love will never say goodbye.
Written in the constellations above,
This is our eternal love.`,
                date: "August 2024",
            },
            {
                id: 3,
                title: "Gravity of Your Love",
                content: `Like planets pulled by gravity's force,
You changed my life, my destined course.
No black hole could consume the light,
That shines from you so pure and bright.

In this universe so vast and wide,
You're the constant by my side.
My personal star, my guiding sun,
With you, my journey's just begun.`,
                date: "July 2024",
            },
            {
                id: 4,
                title: "Moonlight Serenade",
                content: `Under the silver moonlight's glow,
Our love stories begin to grow.
Whispers carried on gentle breeze,
Bring you closer, put my heart at ease.

In the quiet of the night so deep,
Promises we silently keep.
Your love is my guiding light,
Through the darkness to morning bright.`,
                date: "June 2024",
            },
            {
                id: 5,
                title: "Aurora Whispers",
                content: `Northern lights dance in the sky,
Colors of love that never die.
Green and purple, pink and blue,
Each hue reminds me of you.

Like the aurora's gentle sway,
Our love grows stronger every day.
In the heavens above so grand,
I found my love, my promised land.`,
                date: "May 2024",
            },
        ];

        const handleNextPoem = () => {
            setCurrentPoemIndex((prev) => (prev + 1) % poems.length);
        };

        const handlePrevPoem = () => {
            setCurrentPoemIndex(
                (prev) => (prev - 1 + poems.length) % poems.length
            );
        };

        return (
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
                                {poems[currentPoemIndex].title}
                            </ModalPoemTitle>

                            <PoemContentWrapper>
                                <ModalPoemContent>
                                    {poems[currentPoemIndex].content
                                        .split("\n\n")
                                        .map((stanza, index) => (
                                            <p key={index}>
                                                {stanza
                                                    .split("\n")
                                                    .map(
                                                        (
                                                            line,
                                                            lineIndex,
                                                            array
                                                        ) => (
                                                            <span
                                                                key={lineIndex}
                                                            >
                                                                {line}
                                                                {lineIndex <
                                                                    array.length -
                                                                        1 && (
                                                                    <br />
                                                                )}
                                                            </span>
                                                        )
                                                    )}
                                            </p>
                                        ))}
                                </ModalPoemContent>
                            </PoemContentWrapper>

                            <NavigationContainer>
                                <BottomNavButton
                                    onClick={handlePrevPoem}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    ←
                                </BottomNavButton>
                                <PoemCounter>
                                    {currentPoemIndex + 1} / {poems.length}
                                </PoemCounter>
                                <BottomNavButton
                                    onClick={handleNextPoem}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    →
                                </BottomNavButton>
                            </NavigationContainer>
                        </PoemsModalContent>
                    </PoemsModal>
                )}
            </AnimatePresence>
        );
    }
);

export default LovePoems;
