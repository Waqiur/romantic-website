import React, { useState, useEffect, useCallback, Suspense, lazy } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// Lazy load the 3D scene for better performance
const RomanticScene3D = lazy(() => import("./three/RomanticScene3D"));

// Glassmorphic container
const Glass = styled.div`
    background: rgba(35, 41, 70, 0.5);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 2rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
`;

const HeroContainer = styled.section`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: transparent;
    overflow: hidden;
`;

const Hero3DBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0.8;
    pointer-events: none;
`;

const HeroContent = styled(Glass)`
    text-align: center;
    z-index: 2;
    width: 100%;
    max-width: 800px;
    margin: 0 ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing.xl};
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 24px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4),
        0 0 0 1px rgba(255, 255, 255, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    position: relative;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        max-width: 90%;
        margin: 0 ${({ theme }) => theme.spacing.sm};
        padding: ${({ theme }) => theme.spacing.lg};
        border-radius: 20px;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        max-width: 95%;
        margin: 0 ${({ theme }) => theme.spacing.xs};
        padding: ${({ theme }) => theme.spacing.md};
        border-radius: 16px;
    }

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(59, 130, 246, 0.1) 50%,
            rgba(16, 185, 129, 0.1) 100%
        );
        border-radius: 24px;
        opacity: 0.7;
        z-index: -1;

        @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
            border-radius: 20px;
        }

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            border-radius: 16px;
        }
    }
`;

const TypewriterContainer = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const HeroName = styled(motion.h1)`
    font-size: clamp(4rem, 12vw, 8rem);
    font-family: ${({ theme }) => theme.fonts.heading};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    font-weight: 800;
    background: linear-gradient(
        135deg,
        #ff6b9d 0%,
        #c44569 25%,
        #a18cd1 50%,
        #4fd1c7 75%,
        #ffd93d 100%
    );
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientShift 4s ease-in-out infinite;
    text-shadow: 0 0 40px rgba(255, 107, 157, 0.3),
        0 0 80px rgba(161, 140, 209, 0.2), 0 0 120px rgba(79, 209, 199, 0.1);
    letter-spacing: -0.02em;
    line-height: 1;
    padding-bottom: 0.2em;

    @keyframes gradientShift {
        0%,
        100% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
    }
`;

const Cursor = styled.span<{ $visible: boolean }>`
    opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    transition: opacity 0.1s;
    color: ${({ theme }) => theme.colors.textSecondary};
`;

const HeroSubtitle = styled(motion.p)`
    font-size: clamp(1rem, 3vw, 1.4rem);
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    font-weight: 400;
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
    line-height: 1.6;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    padding: 0 ${({ theme }) => theme.spacing.md};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        max-width: 100%;
        padding: 0 ${({ theme }) => theme.spacing.sm};
        margin-bottom: ${({ theme }) => theme.spacing.lg};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 0 ${({ theme }) => theme.spacing.xs};
        margin-bottom: ${({ theme }) => theme.spacing.md};
        line-height: 1.5;

        br {
            display: none;
        }
    }

    &::before {
        content: '"';
        position: absolute;
        top: -10px;
        left: -20px;
        font-size: clamp(2rem, 5vw, 3rem);
        color: rgba(255, 107, 157, 0.6);
        font-family: serif;

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            left: -10px;
            top: -5px;
        }
    }

    &::after {
        content: '"';
        position: absolute;
        bottom: -30px;
        right: -20px;
        font-size: clamp(2rem, 5vw, 3rem);
        color: rgba(255, 107, 157, 0.6);
        font-family: serif;

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            right: -10px;
            bottom: -15px;
        }
    }
`;

const PulsingHeart = styled(motion.div)`
    font-size: clamp(3rem, 8vw, 5rem);
    color: #ff6b9d;
    display: inline-block;
    margin: ${({ theme }) => theme.spacing.xl} 0;
    cursor: pointer;
    position: relative;
    filter: drop-shadow(0 0 40px rgba(255, 107, 157, 0.4));

    /* Touch-friendly for mobile */
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        margin: ${({ theme }) => theme.spacing.lg} 0;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin: ${({ theme }) => theme.spacing.md} 0;
    }

    @keyframes heartGlow {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.5;
        }
        100% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.8;
        }
    }
`;

const HeroSection: React.FC = React.memo(() => {
    const [typingState, setTypingState] = useState({
        displayedText: "",
        currentIndex: 0,
        showCursor: true,
        isTypingComplete: false,
    });

    // Poetic name for typewriter effect
    const poeticName = "My Love";

    useEffect(() => {
        // Cursor blinking effect
        const cursorInterval = setInterval(() => {
            setTypingState((prev) => ({
                ...prev,
                showCursor: !prev.showCursor,
            }));
        }, 500);

        return () => clearInterval(cursorInterval);
    }, []);

    useEffect(() => {
        if (typingState.currentIndex < poeticName.length) {
            const timeout = setTimeout(() => {
                setTypingState((prev) => ({
                    ...prev,
                    displayedText:
                        prev.displayedText + poeticName[prev.currentIndex],
                    currentIndex: prev.currentIndex + 1,
                }));
            }, 90);

            return () => clearTimeout(timeout);
        } else {
            setTypingState((prev) => ({ ...prev, isTypingComplete: true }));
        }
    }, [typingState.currentIndex, poeticName]);

    const handleHeartClick = useCallback(() => {
        // Trigger special heart animation
        const event = new CustomEvent("heartClicked");
        window.dispatchEvent(event);
    }, []);

    return (
        <HeroContainer>
            <Hero3DBackground>
                <Suspense fallback={null}>
                    <RomanticScene3D
                        showFloatingHearts={true}
                        showCrystalHeart={true}
                        showRomanticStars={true}
                        enableControls={false}
                    />
                </Suspense>
            </Hero3DBackground>

            <HeroContent>
                <TypewriterContainer>
                    <HeroName
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        {typingState.displayedText}
                        <Cursor
                            $visible={
                                typingState.showCursor &&
                                !typingState.isTypingComplete
                            }
                        >
                            |
                        </Cursor>
                    </HeroName>
                </TypewriterContainer>

                <HeroSubtitle
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                >
                    Beneath the stars, your love’s a light
                    <br />
                    That makes the darkness shine.
                    <br />
                    The universe in gentle rhyme,
                    <br />
                    Forever yours and mine.
                </HeroSubtitle>

                <PulsingHeart
                    onClick={handleHeartClick}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 2 }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    title="Click me for a burst of love!"
                >
                    <motion.i
                        className="fas fa-heart"
                        animate={{
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </PulsingHeart>
            </HeroContent>
        </HeroContainer>
    );
});

export default HeroSection;
