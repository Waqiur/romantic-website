import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

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
    width: 100%;
    overflow-x: hidden;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: ${({ theme }) => theme.spacing.xl} 0;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: ${({ theme }) => theme.spacing.lg} 0;
    }

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
        pointer-events: none;
        z-index: 0;
    }

    @keyframes subtleFloat {
        0% {
            transform: translateY(0px) rotate(0deg);
        }
        100% {
            transform: translateY(-15px) rotate(0.3deg);
        }
    }

    /* Reduce animation on mobile for performance */
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        &::before {
            animation: none;
        }
    }
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.md};
    position: relative;
    z-index: 5;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: 0 ${({ theme }) => theme.spacing.sm};
        max-width: 95%;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 0 ${({ theme }) => theme.spacing.xs};
        max-width: 90%;
    }
`;

const SectionHeader = styled.div`
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const SectionTitle = styled(motion.h2)`
    font-size: clamp(1.8rem, 4vw, 3rem);
    font-family: ${({ theme }) => theme.fonts.heading};
    background: linear-gradient(
        135deg,
        #ff6b9d 0%,
        #c44569 30%,
        #a18cd1 60%,
        #4fd1c7 90%
    );
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: titleGradient 6s ease-in-out infinite;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    text-align: center;
    position: relative;
    font-weight: 600;
    text-shadow: 0 0 30px rgba(255, 107, 157, 0.3);

    @keyframes titleGradient {
        0%,
        100% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
    }

    &::before {
        content: "✨";
        position: absolute;
        top: -25px;
        left: -30px;
        font-size: 1.8rem;
        animation: sparkleFloat 4s ease-in-out infinite;
        color: #ff6b9d;

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            font-size: 1.2rem;
            top: -15px;
            left: -20px;
        }
    }

    &::after {
        content: "💕";
        position: absolute;
        top: -20px;
        right: -40px;
        font-size: 2rem;
        animation: heartFloat 3s ease-in-out infinite;

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            font-size: 1.4rem;
            top: -15px;
            right: -25px;
        }
    }

    @keyframes sparkleFloat {
        0%,
        100% {
            transform: translateY(0px) rotate(0deg) scale(1);
        }
        50% {
            transform: translateY(-8px) rotate(180deg) scale(1.2);
        }
    }

    @keyframes heartFloat {
        0%,
        100% {
            transform: translateY(0px) rotate(0deg);
        }
        50% {
            transform: translateY(-10px) rotate(5deg);
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

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: ${({ theme }) => theme.spacing.lg};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        grid-template-columns: 1fr;
        gap: ${({ theme }) => theme.spacing.md};
        max-width: 100%;
    }
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

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: ${({ theme }) => theme.spacing.lg};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: ${({ theme }) => theme.spacing.md};
        margin-bottom: ${({ theme }) => theme.spacing.sm};
    }

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 15px 35px rgba(255, 107, 157, 0.2);
        border-color: rgba(255, 107, 157, 0.4);
        background: rgba(255, 255, 255, 0.98);

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            transform: translateY(-4px);
            box-shadow: 0 10px 25px rgba(255, 107, 157, 0.15);
        }
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
    font-size: clamp(2.5rem, 6vw, 4rem);
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    filter: drop-shadow(0 2px 8px rgba(255, 107, 157, 0.2));
    transition: transform 0.15s ease-out, filter 0.15s ease-out;
    will-change: transform, filter;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin-bottom: ${({ theme }) => theme.spacing.md};
    }

    ${InteractiveCard}:hover & {
        transform: scale(1.1);
        filter: drop-shadow(0 4px 12px rgba(255, 107, 157, 0.3));

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            transform: scale(1.05);
        }
    }
`;

const CardTitle = styled.h3`
    font-size: clamp(1.3rem, 3vw, 1.8rem);
    font-family: ${({ theme }) => theme.fonts.heading};
    color: #2d3748;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    position: relative;
    font-weight: 600;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin-bottom: ${({ theme }) => theme.spacing.sm};
    }

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
    font-size: clamp(1rem, 2.2vw, 1.1rem);
    margin-bottom: ${({ theme }) => theme.spacing.md};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin-bottom: ${({ theme }) => theme.spacing.sm};
        line-height: 1.5;
    }
`;

const CountdownDisplay = styled(motion.div)`
    font-size: clamp(1rem, 2.5vw, 1.3rem);
    font-weight: bold;
    color: #ff6b9d;
    margin-top: ${({ theme }) => theme.spacing.md};
    font-family: ${({ theme }) => theme.fonts.heading};
    transition: transform 0.15s ease-out, background 0.15s ease-out;
    background: rgba(255, 255, 255, 0.9);
    padding: ${({ theme }) => theme.spacing.sm}
        ${({ theme }) => theme.spacing.sm};
    border-radius: 20px;
    border: 1px solid rgba(255, 107, 157, 0.2);
    will-change: transform, background;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: ${({ theme }) => theme.spacing.xs}
            ${({ theme }) => theme.spacing.sm};
        margin-top: ${({ theme }) => theme.spacing.sm};
    }

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
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(15px);
    display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const PuzzleContent = styled(motion.div)`
    background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 50%, #fff5f7 100%);
    backdrop-filter: blur(20px);
    padding: ${({ theme }) => theme.spacing.xxl};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    max-width: 700px;
    width: 90%;
    max-height: 85vh;
    overflow-y: auto;
    position: relative;
    border: 3px solid rgba(255, 107, 157, 0.3);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3),
        0 0 60px rgba(255, 107, 157, 0.1);
    animation: puzzleGlow 2s ease-in-out infinite alternate;

    @keyframes puzzleGlow {
        0% {
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3),
                0 0 60px rgba(255, 107, 157, 0.1);
        }
        100% {
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3),
                0 0 80px rgba(255, 107, 157, 0.2);
        }
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: ${({ theme }) => theme.spacing.xl};
        width: 95%;
        max-width: 600px;
        max-height: 90vh;
        border-radius: ${({ theme }) => theme.borderRadius.lg};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: ${({ theme }) => theme.spacing.md};
        width: 98%;
        max-width: none;
        max-height: 95vh;
        border-radius: ${({ theme }) => theme.borderRadius.md};
        border-width: 2px;
        margin: ${({ theme }) => theme.spacing.xs};
    }

    @media (max-width: 320px) {
        padding: ${({ theme }) => theme.spacing.sm};
        width: 95%;
        max-height: 98vh;
    }
`;

const PuzzleHeader = styled.div`
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    padding-top: ${({ theme }) => theme.spacing.lg};
    position: relative;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        margin-bottom: ${({ theme }) => theme.spacing.lg};
        padding-top: ${({ theme }) => theme.spacing.md};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin-bottom: ${({ theme }) => theme.spacing.md};
        padding-top: ${({ theme }) => theme.spacing.sm};
    }
`;

const PuzzleTitle = styled.h3`
    font-size: clamp(1.5rem, 4vw, 2.2rem);
    font-family: ${({ theme }) => theme.fonts.heading};
    background: linear-gradient(45deg, #ff6b9d, #a18cd1, #4fd1c7, #ffd93d);
    background-size: 400% 400%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: puzzleTitleGradient 3s ease-in-out infinite;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-weight: 600;

    @keyframes puzzleTitleGradient {
        0%,
        100% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
    }
`;

const PuzzleSubtitle = styled.p`
    font-size: clamp(0.9rem, 2.5vw, 1.1rem);
    color: #666;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    font-style: italic;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin-bottom: ${({ theme }) => theme.spacing.md};
    }
`;

const PuzzleContainer = styled.div`
    max-width: 600px;
    margin: 0 auto;
`;

const CloseButton = styled.button`
    position: absolute;
    top: ${({ theme }) => theme.spacing.md};
    right: ${({ theme }) => theme.spacing.md};
    background: rgba(255, 255, 255, 0.9);
    border: 2px solid rgba(255, 107, 157, 0.3);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    color: #666;
    font-size: 1.5rem;
    font-weight: bold;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        top: ${({ theme }) => theme.spacing.sm};
        right: ${({ theme }) => theme.spacing.sm};
        width: 36px;
        height: 36px;
        font-size: 1.3rem;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        top: ${({ theme }) => theme.spacing.xs};
        right: ${({ theme }) => theme.spacing.xs};
        width: 32px;
        height: 32px;
        font-size: 1.2rem;
    }

    &:hover {
        background: #ff6b9d;
        color: white;
        border-color: #ff6b9d;
        transform: scale(1.1);
        box-shadow: 0 4px 15px rgba(255, 107, 157, 0.3);

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            transform: scale(1.05);
        }
    }

    &:active {
        transform: scale(0.95);
    }
`;

const PuzzleButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: ${({ theme }) => theme.spacing.xxl};
    position: relative;
    z-index: 10;
`;

const PuzzleButton = styled(motion.button)`
    background: linear-gradient(135deg, #ff6b9d 0%, #a18cd1 100%);
    color: white;
    border: none;
    padding: ${({ theme }) => theme.spacing.lg}
        ${({ theme }) => theme.spacing.xl};
    border-radius: 50px;
    cursor: pointer;
    font-size: 1.4rem;
    font-weight: 500;
    font-family: ${({ theme }) => theme.fonts.heading};
    box-shadow: 0 4px 15px rgba(255, 107, 157, 0.3);
    transition: all 0.3s ease;
    position: relative;
    z-index: 11;
    pointer-events: auto;
    min-width: 120px;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    -webkit-tap-highlight-color: transparent;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: ${({ theme }) => theme.spacing.md}
            ${({ theme }) => theme.spacing.lg};
        font-size: 1.2rem;
        min-width: 100px;
        min-height: 45px;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: ${({ theme }) => theme.spacing.sm}
            ${({ theme }) => theme.spacing.md};
        font-size: 1rem;
        min-width: 90px;
        min-height: 40px;
    }

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(255, 107, 157, 0.4);

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(255, 107, 157, 0.3);
        }
    }

    &:active {
        transform: translateY(0px);
        box-shadow: 0 2px 8px rgba(255, 107, 157, 0.3);
    }

    &::before {
        content: "🧩";
        margin-right: 8px;

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            margin-right: 6px;
        }
    }
`;

const FloatingDecorations = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        display: none; /* Hide on mobile for better performance */
    }
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

const MemoryGameContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    max-width: 450px;
    margin: 0 auto;
    padding: ${({ theme }) => theme.spacing.lg};
    justify-items: center;
    align-items: center;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        max-width: 380px;
        gap: 12px;
        padding: ${({ theme }) => theme.spacing.md};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        max-width: 280px;
        gap: 8px;
        padding: ${({ theme }) => theme.spacing.sm};
    }

    @media (max-width: 320px) {
        max-width: 240px;
        gap: 6px;
        padding: ${({ theme }) => theme.spacing.xs};
    }
`;

const MemoryCard = styled(motion.div)<{ flipped: boolean; matched: boolean }>`
    width: 90px;
    height: 90px;
    perspective: 1000px;
    cursor: pointer;
    position: relative;
    transition: transform 0.2s ease;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        width: 75px;
        height: 75px;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: 60px;
        height: 60px;
    }

    @media (max-width: 320px) {
        width: 50px;
        height: 50px;
    }

    &:hover {
        transform: scale(1.05);

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            transform: scale(1.02);
        }
    }

    &:active {
        transform: scale(0.98);
    }
`;

const MemoryCardInner = styled.div<{ flipped: boolean }>`
    transform: ${({ flipped }) =>
        flipped ? "rotateY(180deg)" : "rotateY(0deg)"};
    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform-style: preserve-3d;
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 16px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
`;

const MemoryCardFront = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16px;
    border: 3px solid rgba(255, 255, 255, 0.2);
    font-size: 2.5rem;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        border-radius: 14px;
        border-width: 2px;
        font-size: 2rem;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        border-radius: 12px;
        font-size: 1.5rem;
    }

    @media (max-width: 320px) {
        border-radius: 10px;
        font-size: 1.2rem;
    }

    &::before {
        content: "?";
        font-size: inherit;
        font-weight: bold;
    }
`;

const MemoryCardBack = styled.div<{ matched: boolean }>`
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transform: rotateY(180deg);
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ matched }) =>
        matched
            ? "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)"
            : "linear-gradient(135deg, #ff6b9d 0%, #a18cd1 100%)"};
    border-radius: 16px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    font-size: 2.2rem;
    transition: all 0.3s ease;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        border-radius: 14px;
        border-width: 2px;
        font-size: 1.8rem;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        border-radius: 12px;
        font-size: 1.4rem;
    }

    @media (max-width: 320px) {
        border-radius: 10px;
        font-size: 1.1rem;
    }

    ${({ matched }) =>
        matched &&
        `
        box-shadow: 0 0 30px rgba(74, 222, 128, 0.6);
        transform: rotateY(180deg) scale(1.05);
        
        @media (max-width: 480px) {
            box-shadow: 0 0 20px rgba(74, 222, 128, 0.5);
            transform: rotateY(180deg) scale(1.03);
        }
    `}
`;

const MemoryGameTitle = styled.h3`
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    font-size: clamp(1.2rem, 3.5vw, 2.2rem);
    color: #ff6b9d;
    font-weight: 400;
    font-family: ${({ theme }) => theme.fonts.heading};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin-bottom: ${({ theme }) => theme.spacing.lg};
        line-height: 1.3;
    }
`;

const JourneyOverlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    gap: 2rem;
    padding: ${({ theme }) => theme.spacing.md};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        gap: 1.5rem;
        padding: ${({ theme }) => theme.spacing.sm};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        gap: 1rem;
        padding: ${({ theme }) => theme.spacing.xs};
    }
`;

const RocketEmoji = styled(motion.div)`
    font-size: clamp(4rem, 12vw, 8rem);
    color: white;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    animation: rocketFloat 3s ease-in-out infinite;

    @keyframes rocketFloat {
        0%,
        100% {
            transform: translateY(0px) rotate(-3deg) scale(1);
        }
        50% {
            transform: translateY(-20px) rotate(3deg) scale(1.1);

            @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
                transform: translateY(-10px) rotate(2deg) scale(1.05);
            }
        }
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        text-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    }
`;

const JourneyText = styled(motion.div)`
    font-size: clamp(1.8rem, 6vw, 3rem);
    font-weight: 600;
    letter-spacing: clamp(0.3px, 0.2vw, 1px);
    color: white;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    position: relative;
    text-align: center;
    font-family: ${({ theme }) => theme.fonts.heading};
    line-height: 1.2;
    max-width: 90vw;
    word-wrap: break-word;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        text-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
        max-width: 95vw;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        line-height: 1.1;
        max-width: 98vw;
    }

    &::after {
        content: "";
        position: absolute;
        bottom: -15px;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        height: 3px;
        background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.8) 50%,
            transparent 100%
        );
        border-radius: 2px;
        animation: rainbowLine 3s ease-in-out infinite;

        @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
            bottom: -10px;
            height: 2px;
            width: 85%;
        }

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            bottom: -8px;
            height: 1.5px;
            width: 90%;
        }
    }

    @keyframes rainbowLine {
        0%,
        100% {
            opacity: 0.7;
        }
        50% {
            opacity: 1;
            transform: translateX(-50%) scaleX(1.1);

            @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
                transform: translateX(-50%) scaleX(1.05);
            }
        }
    }
`;

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

const ModalPoemDate = styled.div`
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    text-align: right;
    font-style: italic;
    margin-top: ${({ theme }) => theme.spacing.lg};
    padding: ${({ theme }) => theme.spacing.sm} 0;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    font-weight: 500;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 0.9rem;
        margin-top: ${({ theme }) => theme.spacing.md};
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
    const [showJourneyMessage, setShowJourneyMessage] = useState(false);
    const navigate = useNavigate();

    // Memory game state
    const [cards, setCards] = useState<any[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [matchedCards, setMatchedCards] = useState<number[]>([]);

    // Poems modal state
    const [showPoemsModal, setShowPoemsModal] = useState(false);
    const [currentPoemIndex, setCurrentPoemIndex] = useState(0);

    // Sample poems data
    const poems = [
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

    // Initialize memory game
    useEffect(() => {
        if (showPuzzle) {
            // const cardEmojis = ["🌹", "💖", "🌸", "�", "🌺", "�", "🌷", "💓"];
            const cardEmojis = ["🌹", "💖"];
            const shuffledCards = [...cardEmojis, ...cardEmojis]
                .sort(() => Math.random() - 0.5)
                .map((emoji, index) => ({
                    id: index,
                    value: emoji,
                    flipped: false,
                    matched: false,
                }));
            setCards(shuffledCards);
            setFlippedCards([]);
            setMatchedCards([]);
        }
    }, [showPuzzle]);

    // Handle card click
    const handleCardClick = (index: number) => {
        if (
            flippedCards.length === 2 ||
            cards[index].flipped ||
            cards[index].matched
        )
            return;

        const newFlipped = [...flippedCards, index];
        setFlippedCards(newFlipped);

        const newCards = [...cards];
        newCards[index].flipped = true;
        setCards(newCards);

        if (newFlipped.length === 2) {
            const [first, second] = newFlipped;
            if (cards[first].value === cards[second].value) {
                // Match - instantly turn green
                newCards[first].matched = true;
                newCards[second].matched = true;
                setCards(newCards);
                setMatchedCards([...matchedCards, first, second]);
                setFlippedCards([]);
                if (matchedCards.length + 2 === cards.length) {
                    // Wait 2 seconds with modal open, then show rocket and close modal
                    setTimeout(() => {
                        setShowJourneyMessage(true);
                        setShowPuzzle(false); // Close modal after rocket appears
                        setTimeout(() => {
                            setShowJourneyMessage(false);
                            navigate("/earth");
                        }, 3000); // 3 seconds
                    }, 1000); // Wait 2 seconds before showing rocket
                }
            } else {
                // No match
                setTimeout(() => {
                    newCards[first].flipped = false;
                    newCards[second].flipped = false;
                    setCards(newCards);
                    setFlippedCards([]);
                }, 1000);
            }
        }
    };

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

    const handleLoveNotes = () => {
        const event = new CustomEvent("showLoveNote");
        window.dispatchEvent(event);
    };
    const handlePuzzle = () => {
        setShowPuzzle(true);
    };

    const handlePoemsClick = () => {
        setCurrentPoemIndex(0);
        setShowPoemsModal(true);
    };

    const handleNextPoem = () => {
        setCurrentPoemIndex((prev) => (prev + 1) % poems.length);
    };

    const handlePrevPoem = () => {
        setCurrentPoemIndex((prev) => (prev - 1 + poems.length) % poems.length);
    };

    const handleClosePoemsModal = () => {
        setShowPoemsModal(false);
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
                                onClick={handlePoemsClick}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <CardIcon>📝</CardIcon>
                                <CardTitle>Love Poems</CardTitle>
                                <CardDescription>
                                    Read beautiful poems written with love and
                                    stardust
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
                            Solve Me 💕
                        </PuzzleButton>
                    </PuzzleButtonContainer>
                </Container>
            </InteractiveContainer>{" "}
            <PuzzleModal $isVisible={showPuzzle}>
                <PuzzleContent
                    initial={{ scale: 0, opacity: 0, rotateY: -90 }}
                    animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <CloseButton onClick={() => setShowPuzzle(false)}>
                        ×
                    </CloseButton>

                    <PuzzleHeader>
                        <PuzzleTitle>💕 Love's Challenge 💕</PuzzleTitle>
                        <PuzzleSubtitle>
                            Show me the depth of your love, my dear!
                        </PuzzleSubtitle>
                    </PuzzleHeader>

                    <PuzzleContainer>
                        <MemoryGameTitle>
                            Find our matching hearts to unlock our cosmic love
                            story! 💖
                        </MemoryGameTitle>
                        <MemoryGameContainer>
                            {cards.map((card, index) => (
                                <MemoryCard
                                    key={card.id}
                                    flipped={card.flipped || card.matched}
                                    matched={card.matched}
                                    onClick={() => handleCardClick(index)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <MemoryCardInner
                                        flipped={card.flipped || card.matched}
                                    >
                                        <MemoryCardFront />
                                        <MemoryCardBack matched={card.matched}>
                                            {card.value}
                                        </MemoryCardBack>
                                    </MemoryCardInner>
                                </MemoryCard>
                            ))}
                        </MemoryGameContainer>
                    </PuzzleContainer>
                </PuzzleContent>
            </PuzzleModal>
            {/* Poems Modal */}
            <AnimatePresence>
                {showPoemsModal && (
                    <PoemsModal
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={handleClosePoemsModal}
                    >
                        <PoemsModalContent
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ModalCloseButton onClick={handleClosePoemsModal}>
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
            {/* Full-screen Journey Overlay */}
            {showJourneyMessage && (
                <JourneyOverlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <RocketEmoji
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            duration: 1,
                            ease: "easeOut",
                            delay: 0.2,
                        }}
                    >
                        🚀
                    </RocketEmoji>
                    <JourneyText
                        initial={{ scale: 0.5, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut",
                            delay: 0.5,
                        }}
                    >
                        Let's go to the space! 🚀💕
                    </JourneyText>
                </JourneyOverlay>
            )}
        </>
    );
};

export default InteractiveSection;
