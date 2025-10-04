import React, { useState, useEffect, forwardRef, useCallback } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LovePoems from "./LovePoems";
import CuteReminders from "./CuteReminders";

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
    padding: 0 ${({ theme }) => theme.spacing.xxl};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    max-width: 700px;
    width: 90%;
    max-height: 85vh;
    overflow-y: auto;
    position: relative;
    border: 3px solid rgba(255, 107, 157, 0.3);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3),
        0 0 60px rgba(255, 107, 157, 0.1);

    /* Performance optimization for scrolling */
    transform: translate3d(0, 0, 0);
    will-change: scroll-position;

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
    margin-bottom: ${({ theme }) => theme.spacing.md};
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

const InteractiveSection = forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<{}>
>((props, ref) => {
    const [inView, setInView] = useState(true);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
            },
            {
                threshold: 0.1,
                rootMargin: "50px 0px -10% 0px", // Start animations 50px before entering viewport, stop when 10% from bottom
            }
        );

        if (ref && "current" in ref && ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [ref]);

    const [modalState, setModalState] = useState({
        showPuzzle: false,
        showJourneyMessage: false,
        showPoemsModal: false,
        showCuteReminders: false,
    });
    const navigate = useNavigate();

    // Memory game state
    const [gameState, setGameState] = useState({
        cards: [] as any[],
        flippedCards: [] as number[],
        matchedCards: [] as number[],
        cardsToFlipBack: [] as number[],
    });

    // Handle flipping back unmatched cards
    useEffect(() => {
        if (gameState.cardsToFlipBack.length === 2) {
            const timeoutId = setTimeout(() => {
                setGameState((prev) => {
                    // Create a new array of cards with the unmatched cards flipped back
                    const resetCards = prev.cards.map((card, index) => {
                        if (prev.cardsToFlipBack.includes(index)) {
                            return { ...card, flipped: false };
                        }
                        return card;
                    });

                    return {
                        ...prev,
                        cards: resetCards,
                        flippedCards: [],
                        cardsToFlipBack: [],
                    };
                });
            }, 1000);

            return () => clearTimeout(timeoutId);
        }
    }, [gameState.cardsToFlipBack]);

    // Initialize memory game
    useEffect(() => {
        if (modalState.showPuzzle) {
            const cardEmojis = [
                "&#x1F493;",
                "&#x1F495;",
                "&#x1F496;",
                "&#x1F497;",
                "&#x1F498;",
                "&#x1F49D;",
                "&#x1F49E;",
                "&#x1F499;",
            ];
            const shuffledCards = [...cardEmojis, ...cardEmojis]
                .sort(() => Math.random() - 0.5)
                .map((emoji, index) => ({
                    id: index,
                    value: emoji,
                    flipped: false,
                    matched: false,
                }));
            setGameState({
                cards: shuffledCards,
                flippedCards: [],
                matchedCards: [],
                cardsToFlipBack: [],
            });
        }
    }, [modalState.showPuzzle]);

    // Handle card click
    const handleCardClick = useCallback(
        (index: number) => {
            setGameState((prev) => {
                // Prevent clicking during flip back animation or if card is already flipped/matched
                if (
                    prev.flippedCards.length === 2 ||
                    prev.cards[index].flipped ||
                    prev.cards[index].matched ||
                    prev.cardsToFlipBack.length > 0
                )
                    return prev;

                const newFlipped = [...prev.flippedCards, index];
                const newCards = prev.cards.map((card, i) =>
                    i === index ? { ...card, flipped: true } : card
                );

                if (newFlipped.length === 2) {
                    const [first, second] = newFlipped;
                    if (prev.cards[first].value === prev.cards[second].value) {
                        // Match - instantly turn green
                        const matchedCards = newCards.map((card, i) => {
                            if (i === first || i === second) {
                                return {
                                    ...card,
                                    matched: true,
                                    flipped: true,
                                };
                            }
                            return card;
                        });

                        const newMatchedCards = [
                            ...prev.matchedCards,
                            first,
                            second,
                        ];

                        if (newMatchedCards.length === matchedCards.length) {
                            // Wait 2 seconds with modal open, then show rocket and close modal
                            setTimeout(() => {
                                setModalState((prevModal) => ({
                                    ...prevModal,
                                    showJourneyMessage: true,
                                    showPuzzle: false,
                                }));
                                setTimeout(() => {
                                    setModalState((prevModal) => ({
                                        ...prevModal,
                                        showJourneyMessage: false,
                                    }));
                                    navigate("/earth");
                                }, 3000); // 3 seconds
                            }, 1000); // Wait 2 seconds before showing rocket
                        }

                        return {
                            ...prev,
                            cards: matchedCards,
                            matchedCards: newMatchedCards,
                            flippedCards: [],
                            cardsToFlipBack: [],
                        };
                    } else {
                        // No match - mark both cards to flip back
                        return {
                            ...prev,
                            cards: newCards,
                            flippedCards: newFlipped,
                            cardsToFlipBack: [first, second],
                        };
                    }
                }

                return {
                    ...prev,
                    cards: newCards,
                    flippedCards: newFlipped,
                };
            });
        },
        [navigate]
    );

    const handlePuzzle = useCallback(() => {
        setModalState((prev) => ({ ...prev, showPuzzle: true }));
    }, []);

    const handlePoemsClick = useCallback(() => {
        setModalState((prev) => ({ ...prev, showPoemsModal: true }));
    }, []);

    const handleCuteReminders = useCallback(() => {
        setModalState((prev) => ({ ...prev, showCuteReminders: true }));
    }, []);

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
                                    Where words dance among stars and every line
                                    glows with love
                                </CardDescription>
                            </InteractiveCard>
                            <InteractiveCard
                                variants={cardVariants}
                                onClick={handleCuteReminders}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <CardIcon>❤️</CardIcon>
                                <CardTitle>Cute Reminders</CardTitle>
                                <CardDescription>
                                    Click the stars to reveal sweet messages of
                                    love! 💕
                                </CardDescription>
                            </InteractiveCard>
                            <InteractiveCard
                                variants={cardVariants}
                                onClick={() => navigate("/fireworks")}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <CardIcon>🎆</CardIcon>
                                <CardTitle>Fireworks Show</CardTitle>
                                <CardDescription>
                                    Watch a spectacular fireworks display in the
                                    night sky! ✨
                                </CardDescription>
                            </InteractiveCard>
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
            </InteractiveContainer>
            <PuzzleModal $isVisible={modalState.showPuzzle}>
                <PuzzleContent
                    initial={{ scale: 0, opacity: 0, rotateY: -90 }}
                    animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <CloseButton
                        onClick={() =>
                            setModalState((prev) => ({
                                ...prev,
                                showPuzzle: false,
                            }))
                        }
                    >
                        ×
                    </CloseButton>

                    <PuzzleHeader>
                        <PuzzleTitle>💕 Love's Challenge 💕</PuzzleTitle>
                    </PuzzleHeader>

                    <PuzzleContainer>
                        <MemoryGameTitle>
                            Find our matching hearts to unlock our cosmic love
                            story! 💖
                        </MemoryGameTitle>
                        <MemoryGameContainer>
                            {gameState.cards.map((card, index) => (
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
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: card.value,
                                                }}
                                            />
                                        </MemoryCardBack>
                                    </MemoryCardInner>
                                </MemoryCard>
                            ))}
                        </MemoryGameContainer>
                    </PuzzleContainer>
                </PuzzleContent>
            </PuzzleModal>
            {/* Poems Modal */}
            <LovePoems
                isOpen={modalState.showPoemsModal}
                onClose={() =>
                    setModalState((prev) => ({
                        ...prev,
                        showPoemsModal: false,
                    }))
                }
            />
            {/* Cute Reminders Modal */}
            <CuteReminders
                isOpen={modalState.showCuteReminders}
                onClose={() =>
                    setModalState((prev) => ({
                        ...prev,
                        showCuteReminders: false,
                    }))
                }
            />
            {/* Full-screen Journey Overlay */}
            {modalState.showJourneyMessage && (
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
});

export default InteractiveSection;
