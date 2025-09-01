import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import GalaxyPage from "./GalaxyPage";

const InteractiveContainer = styled.section`
    padding: ${({ theme }) => theme.spacing.xxl} 0;
    background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(161, 140, 209, 0.1) 50%,
            rgba(255, 182, 193, 0.05) 100%
        ),
        radial-gradient(
            circle at 30% 20%,
            rgba(255, 107, 157, 0.08) 0%,
            transparent 50%
        ),
        radial-gradient(
            circle at 70% 80%,
            rgba(79, 209, 199, 0.06) 0%,
            transparent 50%
        );
    position: relative;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(
                circle at 20% 30%,
                rgba(255, 107, 157, 0.03) 0%,
                transparent 40%
            ),
            radial-gradient(
                circle at 80% 70%,
                rgba(161, 140, 209, 0.03) 0%,
                transparent 40%
            );
        animation: subtleFloat 20s ease-in-out infinite alternate;
    }

    @keyframes subtleFloat {
        0% {
            transform: translateY(0px) rotate(0deg);
        }
        100% {
            transform: translateY(-15px) rotate(0.3deg);
        }
    }
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.md};
`;

const SectionHeader = styled.div`
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const SectionTitle = styled(motion.h2)`
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-family: ${({ theme }) => theme.fonts.heading};
    color: #ff6b9d;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    text-align: center;
    position: relative;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

    &::before {
        content: "✨";
        position: absolute;
        top: -20px;
        left: -25px;
        font-size: 1.5rem;
        animation: sparkleFloat 4s ease-in-out infinite;
        color: #ff6b9d;
    }

    &::after {
        content: "💕";
        position: absolute;
        top: -15px;
        right: -30px;
        font-size: 1.8rem;
        animation: heartFloat 3s ease-in-out infinite;
    }

    @keyframes sparkleFloat {
        0%,
        100% {
            transform: translateY(0px) rotate(0deg) scale(1);
        }
        50% {
            transform: translateY(-6px) rotate(180deg) scale(1.2);
        }
    }

    @keyframes heartFloat {
        0%,
        100% {
            transform: translateY(0px) rotate(0deg);
        }
        50% {
            transform: translateY(-8px) rotate(3deg);
        }
    }
`;

const AnimatedUnderline = styled(motion.div)`
    width: 100px;
    height: 4px;
    background: ${({ theme }) => theme.colors.gradients.primary};
    margin: 0 auto;
    border-radius: 2px;
`;

const InteractiveGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: ${({ theme }) => theme.spacing.xl};
    max-width: 1000px;
    margin: 0 auto;
`;

const InteractiveCard = styled(motion.div)`
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    padding: ${({ theme }) => theme.spacing.xl};
    text-align: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border: 2px solid rgba(255, 107, 157, 0.2);
    transition: all 0.15s ease-out;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    will-change: transform, box-shadow, border-color;

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 15px 35px rgba(255, 107, 157, 0.2);
        border-color: rgba(255, 107, 157, 0.4);
        background: rgba(255, 255, 255, 0.98);
    }

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 107, 157, 0.1),
            transparent
        );
        transition: left 0.2s ease-out;
        z-index: 1;
    }

    &:hover::before {
        left: 100%;
    }
`;

const CardIcon = styled(motion.div)`
    font-size: 4rem;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    filter: drop-shadow(0 2px 8px rgba(255, 107, 157, 0.2));
    transition: transform 0.15s ease-out, filter 0.15s ease-out;
    will-change: transform, filter;

    ${InteractiveCard}:hover & {
        transform: scale(1.1);
        filter: drop-shadow(0 4px 12px rgba(255, 107, 157, 0.3));
    }
`;

const CardTitle = styled.h3`
    font-size: 1.4rem;
    font-family: ${({ theme }) => theme.fonts.heading};
    color: #2d3748;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    position: relative;
    font-weight: 600;

    &::after {
        content: "";
        position: absolute;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, #ff6b9d, #a18cd1);
        transition: width 0.15s ease-out;
        will-change: width;
    }

    ${InteractiveCard}:hover &::after {
        width: 100%;
    }
`;

const CardDescription = styled.p`
    color: #4a5568;
    line-height: 1.6;
    font-size: 0.95rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CountdownDisplay = styled(motion.div)`
    font-size: 1.8rem;
    font-weight: bold;
    color: #ff6b9d;
    margin-top: ${({ theme }) => theme.spacing.md};
    font-family: ${({ theme }) => theme.fonts.heading};
    transition: transform 0.15s ease-out, background 0.15s ease-out;
    background: rgba(255, 255, 255, 0.9);
    padding: ${({ theme }) => theme.spacing.sm}
        ${({ theme }) => theme.spacing.md};
    border-radius: 20px;
    border: 1px solid rgba(255, 107, 157, 0.2);
    will-change: transform, background;

    ${InteractiveCard}:hover & {
        transform: scale(1.05);
        background: rgba(255, 255, 255, 0.95);
    }
`;

const PuzzleModal = styled(motion.div)<{ $isVisible: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const PuzzleContent = styled(motion.div)`
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(15px);
    padding: ${({ theme }) => theme.spacing.xl};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
    border: 2px solid rgba(255, 107, 157, 0.2);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
    position: absolute;
    top: ${({ theme }) => theme.spacing.md};
    right: ${({ theme }) => theme.spacing.md};
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.gray.medium};
    transition: color 0.3s ease;

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const PuzzleContainer = styled.div`
    max-width: 500px;
    margin: ${({ theme }) => theme.spacing.lg} auto;
`;

const PuzzleQuestion = styled.h4`
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.primary};
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    font-family: ${({ theme }) => theme.fonts.heading};
`;

const PuzzleInput = styled.input`
    width: 100%;
    padding: ${({ theme }) => theme.spacing.md};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: 1.1rem;
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-family: ${({ theme }) => theme.fonts.body};

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.secondary};
        box-shadow: 0 0 10px rgba(255, 107, 157, 0.3);
    }
`;

const PuzzleHint = styled.p`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.gray.medium};
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    font-style: italic;
`;

const PuzzleResult = styled.div<{ isCorrect: boolean }>`
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    text-align: center;
    margin-top: ${({ theme }) => theme.spacing.md};
    background: ${({ isCorrect }) =>
        isCorrect
            ? "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)"
            : "linear-gradient(135deg, #f87171 0%, #ef4444 100%)"};
    color: white;
    font-weight: 600;
`;

const NewPuzzleButton = styled(motion.button)`
    background: linear-gradient(135deg, #a18cd1 0%, #ff6b9d 100%);
    color: white;
    border: none;
    padding: ${({ theme }) => theme.spacing.sm}
        ${({ theme }) => theme.spacing.lg};
    border-radius: 25px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    margin-top: ${({ theme }) => theme.spacing.md};
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(161, 140, 209, 0.4);
    }
`;

const PuzzleButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const PuzzleButton = styled(motion.button)`
    background: linear-gradient(135deg, #ff6b9d 0%, #a18cd1 100%);
    color: white;
    border: none;
    padding: ${({ theme }) => theme.spacing.lg}
        ${({ theme }) => theme.spacing.xl};
    border-radius: 50px;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: 600;
    font-family: ${({ theme }) => theme.fonts.heading};
    box-shadow: 0 4px 15px rgba(255, 107, 157, 0.3);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(255, 107, 157, 0.4);
    }

    &::before {
        content: "🧩";
        margin-right: 8px;
    }
`;

const FloatingDecorations = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
`;

const FloatingDecoration = styled(motion.div)<{ delay: number; size: number }>`
    position: absolute;
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    background: linear-gradient(
        135deg,
        rgba(255, 107, 157, 0.15),
        rgba(161, 140, 209, 0.15)
    );
    border-radius: 50%;
    opacity: 0.5;
    animation: floatDecoration ${({ delay }) => 10 + delay}s ease-in-out
        infinite;

    @keyframes floatDecoration {
        0%,
        100% {
            transform: translateY(0px) translateX(0px) scale(1);
        }
        33% {
            transform: translateY(-25px) translateX(15px) scale(1.2);
        }
        66% {
            transform: translateY(-15px) translateX(-15px) scale(0.8);
        }
    }
`;

const FloatingSparkle = styled(motion.div)<{ delay: number; size: number }>`
    position: absolute;
    font-size: ${({ size }) => size}px;
    opacity: 0.6;
    animation: sparkleTwinkle ${({ delay }) => 5 + delay}s ease-in-out infinite;
    color: #ff6b9d;

    @keyframes sparkleTwinkle {
        0%,
        100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.3;
        }
        50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.9;
        }
    }
`;

interface CountdownTime {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const InteractiveSection: React.FC = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    const [countdown, setCountdown] = useState<CountdownTime>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [showPuzzle, setShowPuzzle] = useState(false);
    const [currentPuzzle, setCurrentPuzzle] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showGalaxy, setShowGalaxy] = useState(false);

    // Text-based puzzles
    const puzzles = [
        {
            question:
                "What has four letters, is sometimes hot and sometimes cold, but always makes you feel better?",
            answer: "love",
            hint: "It's the feeling that brings us together 💕",
        },
        {
            question:
                "I am not a season, but I make everything bloom. I am not the sun, but I brighten your room. What am I?",
            answer: "smile",
            hint: "It's something you do with your face 😊",
        },
        {
            question:
                "What grows stronger when shared, costs nothing to give, but is priceless to receive?",
            answer: "happiness",
            hint: "It's a feeling that multiplies when given away ✨",
        },
        {
            question:
                "I have no wings, yet I can fly. I have no voice, yet I can cry. I bring people together and never say goodbye. What am I?",
            answer: "heart",
            hint: "It beats inside your chest ❤️",
        },
    ];

    // Countdown to a special date (you can customize this)
    useEffect(() => {
        const targetDate = new Date("2025-12-31"); // Change this to your special date

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor(
                    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                const minutes = Math.floor(
                    (distance % (1000 * 60 * 60)) / (1000 * 60)
                );
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setCountdown({ days, hours, minutes, seconds });
            }
        };

        const interval = setInterval(updateCountdown, 1000);
        updateCountdown();

        return () => clearInterval(interval);
    }, []);

    const handleHeartGenerator = () => {
        const event = new CustomEvent("generateHearts");
        window.dispatchEvent(event);
    };

    const handleLoveNotes = () => {
        const event = new CustomEvent("showLoveNote");
        window.dispatchEvent(event);
    };
    const handlePuzzle = () => {
        setShowPuzzle(true);
        setShowResult(false);
        setUserAnswer("");
    };
    const handleAnswerSubmit = () => {
        const currentPuzzleData = puzzles[currentPuzzle];
        const isAnswerCorrect =
            userAnswer.toLowerCase().trim() ===
            currentPuzzleData.answer.toLowerCase();
        setIsCorrect(isAnswerCorrect);
        setShowResult(true);

        if (isAnswerCorrect) {
            setTimeout(() => {
                setShowPuzzle(false);
                setShowGalaxy(true);
            }, 1500);
        }
    };

    const handleNextPuzzle = () => {
        setCurrentPuzzle((prev) => (prev + 1) % puzzles.length);
        setUserAnswer("");
        setShowResult(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleAnswerSubmit();
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    return (
        <>
            <InteractiveContainer ref={ref}>
                <FloatingDecorations>
                    <FloatingDecoration
                        delay={0}
                        size={50}
                        style={{ top: "15%", left: "10%" }}
                    />
                    <FloatingDecoration
                        delay={2}
                        size={35}
                        style={{ top: "25%", right: "15%" }}
                    />
                    <FloatingDecoration
                        delay={4}
                        size={60}
                        style={{ bottom: "25%", left: "20%" }}
                    />
                    <FloatingDecoration
                        delay={1}
                        size={45}
                        style={{ bottom: "35%", right: "10%" }}
                    />
                    <FloatingDecoration
                        delay={3}
                        size={30}
                        style={{ top: "60%", left: "75%" }}
                    />

                    <FloatingSparkle
                        delay={0}
                        size={16}
                        style={{ top: "12%", left: "25%" }}
                    >
                        ✨
                    </FloatingSparkle>
                    <FloatingSparkle
                        delay={2}
                        size={14}
                        style={{ top: "40%", right: "8%" }}
                    >
                        ⭐
                    </FloatingSparkle>
                    <FloatingSparkle
                        delay={4}
                        size={12}
                        style={{ bottom: "20%", left: "30%" }}
                    >
                        💫
                    </FloatingSparkle>
                    <FloatingSparkle
                        delay={1}
                        size={18}
                        style={{ top: "55%", right: "25%" }}
                    >
                        🌟
                    </FloatingSparkle>
                </FloatingDecorations>
                <Container>
                    <SectionHeader>
                        <SectionTitle
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                        >
                            Special Surprises
                        </SectionTitle>
                        <AnimatedUnderline
                            initial={{ scaleX: 0 }}
                            animate={inView ? { scaleX: 1 } : {}}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        />
                    </SectionHeader>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                    >
                        {" "}
                        <InteractiveGrid>
                            <InteractiveCard
                                variants={cardVariants}
                                onClick={handleHeartGenerator}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <CardIcon>😊</CardIcon>
                                <CardTitle>When you need to smile</CardTitle>
                                <CardDescription>
                                    Click to fill the screen with floating
                                    hearts
                                </CardDescription>
                            </InteractiveCard>
                            <InteractiveCard
                                variants={cardVariants}
                                onClick={handleLoveNotes}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <CardIcon>📝</CardIcon>
                                <CardTitle>Poems</CardTitle>
                                <CardDescription>
                                    Get a sweet surprise message
                                </CardDescription>
                            </InteractiveCard>
                            <InteractiveCard variants={cardVariants}>
                                <CardIcon>⏰</CardIcon>
                                <CardTitle>Countdown</CardTitle>
                                <CardDescription>
                                    Days until our special date
                                </CardDescription>
                                <CountdownDisplay>
                                    {countdown.days}d {countdown.hours}h{" "}
                                    {countdown.minutes}m {countdown.seconds}s
                                </CountdownDisplay>
                            </InteractiveCard>{" "}
                        </InteractiveGrid>
                    </motion.div>

                    <PuzzleButtonContainer>
                        <PuzzleButton
                            onClick={handlePuzzle}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            Solve Me
                        </PuzzleButton>
                    </PuzzleButtonContainer>
                </Container>
            </InteractiveContainer>{" "}
            <PuzzleModal $isVisible={showPuzzle}>
                <PuzzleContent
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <CloseButton onClick={() => setShowPuzzle(false)}>
                        ×
                    </CloseButton>
                    <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
                        Love Riddle 💕
                    </h3>
                    <PuzzleContainer>
                        <PuzzleQuestion>
                            {puzzles[currentPuzzle].question}
                        </PuzzleQuestion>{" "}
                        <PuzzleInput
                            type="text"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your answer here..."
                        />
                        {showResult && !isCorrect && (
                            <PuzzleHint>
                                💡 Hint: {puzzles[currentPuzzle].hint}
                            </PuzzleHint>
                        )}
                        {!showResult && (
                            <div style={{ textAlign: "center" }}>
                                <button
                                    onClick={handleAnswerSubmit}
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #ff6b9d 0%, #a18cd1 100%)",
                                        color: "white",
                                        border: "none",
                                        padding: "10px 20px",
                                        borderRadius: "25px",
                                        cursor: "pointer",
                                        fontSize: "1rem",
                                        fontWeight: "500",
                                    }}
                                >
                                    Submit Answer
                                </button>
                            </div>
                        )}
                        {showResult && (
                            <>
                                <PuzzleResult isCorrect={isCorrect}>
                                    {isCorrect
                                        ? "🎉 Correct! Well done!"
                                        : `❌ Not quite right. The answer is: ${puzzles[currentPuzzle].answer}`}
                                </PuzzleResult>
                                <div style={{ textAlign: "center" }}>
                                    <NewPuzzleButton
                                        onClick={handleNextPuzzle}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Next Riddle
                                    </NewPuzzleButton>
                                </div>
                            </>
                        )}{" "}
                    </PuzzleContainer>
                </PuzzleContent>{" "}
            </PuzzleModal>
            <GalaxyPage
                isVisible={showGalaxy}
                onClose={() => setShowGalaxy(false)}
            />
        </>
    );
};

export default InteractiveSection;
