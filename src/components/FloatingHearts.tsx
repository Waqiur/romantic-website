import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const HeartsContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 999;
    overflow: hidden;
    /* Hardware acceleration for container */
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
`;

const FloatingHeart = styled(motion.div)<{ size: number; color: string }>`
    position: absolute;
    font-size: ${({ size }) => size}rem;
    color: ${({ color }) => color};
    pointer-events: none;
    user-select: none;
    filter: drop-shadow(0 2px 10px rgba(255, 107, 157, 0.3));
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
`;

interface Heart {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    emoji: string;
}

const heartEmojis = ["💕", "💖", "💗", "💘", "💝", "❤️", "💓", "💞"];
const heartColors = ["#ff6b9d", "#a18cd1", "#fecfef", "#ff9a9e", "#fad0c4"];

const FloatingHearts: React.FC = React.memo(() => {
    const [hearts, setHearts] = useState<Heart[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [lastGenerationTime, setLastGenerationTime] = useState(0);
    const animationFrameRef = useRef<number | undefined>(undefined);

    const generateSpecialHearts = useCallback(() => {
        const now = Date.now();
        const timeSinceLastGeneration = now - lastGenerationTime;
        const minDelay = 2000; // Minimum 500ms between special heart generations (longer cooldown for more hearts)

        // If too soon since last generation, skip this one
        if (timeSinceLastGeneration < minDelay) {
            return;
        }

        // If currently generating hearts, skip this one
        if (isGenerating) {
            return;
        }

        setIsGenerating(true);
        setLastGenerationTime(now);

        const newHearts: Heart[] = [];
        const heartCount = 15; // Reduced to 8 hearts for better performance

        for (let i = 0; i < heartCount; i++) {
            newHearts.push({
                id: Date.now() + i + 1000,
                x: Math.random() * (window.innerWidth - 100),
                y: Math.random() * (window.innerHeight - 100),
                size: Math.random() * 2 + 1,
                color: heartColors[
                    Math.floor(Math.random() * heartColors.length)
                ],
                emoji: heartEmojis[
                    Math.floor(Math.random() * heartEmojis.length)
                ],
            });
        }

        setHearts((prev) => [...prev, ...newHearts]);

        // Remove hearts after animation and reset generating flag
        setTimeout(() => {
            setHearts((prev) =>
                prev.filter((heart) => !newHearts.includes(heart))
            );
            setIsGenerating(false);
        }, 4500);
    }, [isGenerating, lastGenerationTime]);

    useEffect(() => {
        const handleHeartClicked = () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            animationFrameRef.current = requestAnimationFrame(() => {
                generateSpecialHearts();
            });
        };

        // Listen for custom events
        window.addEventListener("heartClicked", handleHeartClicked);

        return () => {
            // window.removeEventListener("generateHearts", handleGenerateHearts);
            window.removeEventListener("heartClicked", handleHeartClicked);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [generateSpecialHearts]);

    return (
        <HeartsContainer>
            <AnimatePresence>
                {hearts.map((heart) => (
                    <FloatingHeart
                        key={heart.id}
                        size={heart.size}
                        color={heart.color}
                        initial={{
                            x: heart.x,
                            y: heart.y,
                            opacity: 0,
                            scale: 0,
                            rotate: 0,
                        }}
                        animate={{
                            x: heart.x + (Math.random() - 0.5) * 60,
                            y: heart.y + (Math.random() - 0.5) * 50,
                            opacity: [0, 1, 0.8, 0],
                            scale: [0, 1, 0],
                            rotate: [0, 45, 90],
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0,
                        }}
                        transition={{
                            duration: 2,
                            ease: "easeOut",
                            times: [0, 0.3, 0.7, 1],
                        }}
                    >
                        {heart.emoji}
                    </FloatingHeart>
                ))}
            </AnimatePresence>
        </HeartsContainer>
    );
});

export default FloatingHearts;
