import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const DeepSeaContainer = styled(motion.div)<{ isVisible: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        to bottom,
        #001f3f 0%,
        #003366 15%,
        #004080 30%,
        #002966 50%,
        #001a33 70%,
        #000d1a 85%,
        #000000 100%
    );
    display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
    align-items: center;
    justify-content: center;
    z-index: 1001;
    overflow: hidden;
    will-change: transform;
`;

const DeepSeaContent = styled(motion.div)`
    text-align: center;
    color: #87ceeb;
    position: relative;
    z-index: 10;
    text-shadow: 0 0 20px rgba(135, 206, 235, 0.8);
`;

const DeepSeaTitle = styled(motion.h1)`
    font-size: clamp(2rem, 8vw, 4rem);
    font-family: ${({ theme }) => theme.fonts.heading};
    background: linear-gradient(45deg, #00bfff, #4fd1c7, #20b2aa, #87ceeb);
    background-size: 400% 400%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: oceanWaves 4s ease-in-out infinite;
    margin-bottom: 2rem;
    filter: drop-shadow(0 0 10px rgba(79, 209, 199, 0.6));

    @keyframes oceanWaves {
        0%,
        100% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
    }
`;

const DeepSeaMessage = styled(motion.p)`
    font-size: 1.5rem;
    margin-bottom: 3rem;
    opacity: 0.9;
    max-width: 600px;
    line-height: 1.6;
    color: #b0e0e6;
    text-shadow: 0 0 15px rgba(176, 224, 230, 0.5);
`;

// Underwater Bubbles
const BubbleField = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
`;

const Bubble = styled(motion.div)<{
    size: number;
    delay: number;
    left: number;
}>`
    position: absolute;
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    border-radius: 50%;
    background: radial-gradient(
        circle at 30% 30%,
        rgba(255, 255, 255, 0.8),
        rgba(255, 255, 255, 0.3)
    );
    box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.4),
        0 0 20px rgba(135, 206, 235, 0.3);
    animation: bubbleRise ${({ delay }) => 8 + delay * 2}s linear infinite;
    left: ${({ left }) => left}%;
    bottom: -50px;
    will-change: transform;
    background: linear-gradient(
        45deg,
        transparent 0%,
        rgba(135, 206, 235, 0.1) 20%,
        transparent 40%,
        rgba(79, 209, 199, 0.1) 60%,
        transparent 80%,
            transform: translateY(-50vh) scale(1.2);
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100vh) scale(0.8);
            opacity: 0;
        }
    }
`;

// Jellyfish
const Jellyfish = styled(motion.div)<{ left: number; size: number }>`
    position: absolute;
    left: ${({ left }) => left}%;
    top: 20%;
    width: ${({ size }) => size}px;
    height: ${({ size }) => size * 1.2}px;
    will-change: transform;
`;

const JellyfishBody = styled.div<{ size: number }>`
    width: ${({ size }) => size}px;
    height: ${({ size }) => size * 0.7}px;
    background: radial-gradient(
        ellipse at center,
        rgba(147, 112, 219, 0.8) 0%,
        rgba(138, 43, 226, 0.6) 50%,
        rgba(75, 0, 130, 0.4) 100%
    );
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    position: relative;
    animation: jellyfishPulse 3s ease-in-out infinite;
    box-shadow: 0 0 20px rgba(147, 112, 219, 0.6),
        inset 0 0 15px rgba(255, 255, 255, 0.2);

    @keyframes jellyfishPulse {
        0%,
        100% {
            transform: scaleY(1) scaleX(1);
        }
        50% {
            transform: scaleY(0.9) scaleX(1.05);
        }
    }
`;

const JellyfishTentacle = styled.div<{ delay: number; length: number }>`
    position: absolute;
    bottom: -5px;
    left: 50%;
    width: 2px;
    height: ${({ length }) => length}px;
    background: linear-gradient(
        to bottom,
        rgba(147, 112, 219, 0.8) 0%,
        rgba(138, 43, 226, 0.4) 50%,
        transparent 100%
    );
    transform-origin: top center;
    animation: tentacleWave ${({ delay }) => 2 + delay}s ease-in-out infinite;

    @keyframes tentacleWave {
        0%,
        100% {
            transform: translateX(-50%) rotate(-5deg);
        }
        50% {
            transform: translateX(-50%) rotate(5deg);
        }
    }

    &:nth-child(2) {
        left: 30%;
    }
    &:nth-child(3) {
        left: 70%;
    }
    &:nth-child(4) {
        left: 40%;
    }
    &:nth-child(5) {
        left: 60%;
    }
`;

// Fish
const Fish = styled(motion.div)<{
    direction: number;
    speed: number;
    top: number;
}>`
    position: absolute;
    top: ${({ top }) => top}%;
    font-size: 2rem;
    animation: fishSwim ${({ speed }) => speed}s linear infinite;
    will-change: transform;
    filter: drop-shadow(0 0 10px rgba(79, 209, 199, 0.6));

    @keyframes fishSwim {
        0% {
            left: ${({ direction }) => (direction > 0 ? "-5%" : "105%")};
            transform: scaleX(${({ direction }) => direction});
        }
        100% {
            left: ${({ direction }) => (direction > 0 ? "105%" : "-5%")};
            transform: scaleX(${({ direction }) => direction});
        }
    }
`;

// Coral Reef
const CoralReef = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 25%;
    background: linear-gradient(
        to top,
        rgba(139, 69, 19, 0.8) 0%,
        rgba(160, 82, 45, 0.6) 30%,
        rgba(255, 127, 80, 0.4) 60%,
        transparent 100%
    );
    z-index: 2;
`;

const Coral = styled(motion.div)<{
    left: number;
    height: number;
    color: string;
}>`
    position: absolute;
    bottom: 0;
    left: ${({ left }) => left}%;
    width: 30px;
    height: ${({ height }) => height}px;
    background: ${({ color }) => color};
    border-radius: 50% 50% 0 0;
    transform-origin: bottom center;
    animation: coralSway 4s ease-in-out infinite;
    box-shadow: 0 0 15px ${({ color }) => color}80;

    @keyframes coralSway {
        0%,
        100% {
            transform: rotate(-2deg);
        }
        50% {
            transform: rotate(2deg);
        }
    }
`;

// Deep Sea Light Rays
const LightRays = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        45deg,
        transparent 0%,
        rgba(135, 206, 235, 0.1) 20%,
        transparent 40%,
        rgba(79, 209, 199, 0.1) 60%,
        transparent 80%,
        rgba(135, 206, 235, 0.1) 100%
    );
    animation: lightRayMove 20s linear infinite;
    pointer-events: none;

    @keyframes lightRayMove {
        0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
        }
        100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
        }
    }
`;

const BackToSurfaceButton = styled(motion.button)`
    background: linear-gradient(135deg, #20b2aa 0%, #4fd1c7 100%);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 50px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 600;
    font-family: ${({ theme }) => theme.fonts.heading};
    box-shadow: 0 10px 30px rgba(32, 178, 170, 0.4);
    transition: all 0.3s ease;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 40px rgba(32, 178, 170, 0.6);
        background: linear-gradient(135deg, #4fd1c7 0%, #20b2aa 100%);
    }
`;

interface DeepSeaPageProps {
    isVisible: boolean;
    onClose: () => void;
}

const DeepSeaPage: React.FC<DeepSeaPageProps> = ({ isVisible, onClose }) => {
    return (
        <DeepSeaContainer isVisible={isVisible}>
            {/* Light Rays */}
            <LightRays />

            {/* Bubble Field */}
            <BubbleField>
                {[...Array(15)].map((_, i) => (
                    <Bubble
                        key={i}
                        size={Math.random() * 20 + 10}
                        delay={Math.random() * 5}
                        left={Math.random() * 90 + 5}
                    />
                ))}
            </BubbleField>

            {/* Jellyfish */}
            {[...Array(3)].map((_, i) => (
                <Jellyfish
                    key={i}
                    left={20 + i * 30}
                    size={60 + i * 20}
                    animate={{
                        y: [0, -30, 0],
                        x: [-10, 10, -10],
                    }}
                    transition={{
                        duration: 8 + i * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <JellyfishBody size={60 + i * 20}>
                        {[...Array(5)].map((_, j) => (
                            <JellyfishTentacle
                                key={j}
                                delay={j * 0.2}
                                length={40 + j * 10}
                            />
                        ))}
                    </JellyfishBody>
                </Jellyfish>
            ))}

            {/* Swimming Fish */}
            {[...Array(6)].map((_, i) => (
                <Fish
                    key={i}
                    direction={i % 2 === 0 ? 1 : -1}
                    speed={15 + Math.random() * 10}
                    top={30 + i * 10}
                >
                    {i % 3 === 0 ? "🐠" : i % 3 === 1 ? "🐟" : "🦈"}
                </Fish>
            ))}

            {/* Coral Reef */}
            <CoralReef>
                {[...Array(8)].map((_, i) => (
                    <Coral
                        key={i}
                        left={i * 12 + 5}
                        height={60 + Math.random() * 40}
                        color={
                            i % 3 === 0
                                ? "linear-gradient(to top, #ff7f50, #ff6347)"
                                : i % 3 === 1
                                ? "linear-gradient(to top, #ff69b4, #da70d6)"
                                : "linear-gradient(to top, #20b2aa, #4fd1c7)"
                        }
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                    />
                ))}
            </CoralReef>

            {/* Main Content */}
            <DeepSeaContent
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
            >
                <DeepSeaTitle
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2, duration: 1.2 }}
                >
                    Congratulations! 🌊
                </DeepSeaTitle>
                <DeepSeaMessage
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2.5, duration: 1.2 }}
                >
                    You've solved the love riddle! Your wisdom flows as deep as
                    the ocean currents in this underwater paradise. 🐠✨
                </DeepSeaMessage>
                <BackToSurfaceButton
                    onClick={onClose}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 3, duration: 1.2 }}
                >
                    🌊 Return to Surface
                </BackToSurfaceButton>
            </DeepSeaContent>
        </DeepSeaContainer>
    );
};

export default DeepSeaPage;
