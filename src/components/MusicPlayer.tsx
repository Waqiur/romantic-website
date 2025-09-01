import React, { useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const MusicContainer = styled.div`
    position: fixed;
    top: ${({ theme }) => theme.spacing.lg};
    right: ${({ theme }) => theme.spacing.lg};
    z-index: 1000;
`;

const MusicButton = styled(motion.button)<{ $isPlaying: boolean }>`
    width: 60px;
    height: 60px;
    background: ${({ $isPlaying }) =>
        $isPlaying
            ? "linear-gradient(135deg, #ff6b9d 0%, #a18cd1 100%)"
            : "rgba(255, 107, 157, 0.1)"};
    backdrop-filter: blur(10px);
    border: 2px solid #ff6b9d;
    border-radius: 50%;
    color: ${({ $isPlaying }) => ($isPlaying ? "#ffffff" : "#ff6b9d")};
    font-size: 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &:hover {
        transform: scale(1.1);
        box-shadow: 0 0 20px rgba(255, 107, 157, 0.4);
    }

    &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(135deg, #ff6b9d 0%, #a18cd1 100%);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        transition: transform 0.3s ease;
        z-index: -1;
    }

    &:hover::before {
        transform: translate(-50%, -50%) scale(1);
    }
`;

const LoopIndicator = styled.div<{ $isPlaying: boolean }>`
    position: absolute;
    top: -8px;
    right: -8px;
    width: 20px;
    height: 20px;
    background: linear-gradient(135deg, #ff6b9d 0%, #a18cd1 100%);
    border-radius: 50%;
    display: ${({ $isPlaying }) => ($isPlaying ? "flex" : "none")};
    align-items: center;
    justify-content: center;
    font-size: 0.6rem;
    color: white;
    font-weight: bold;
    box-shadow: 0 2px 8px rgba(255, 107, 157, 0.3);
    z-index: 2;
`;

const PlayIcon = styled(motion.i)`
    position: relative;
    z-index: 1;
`;

const MusicPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const toggleMusic = async () => {
        if (!audioRef.current || isLoading) return;

        setIsLoading(true);

        try {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                // Wait for any previous operations to complete
                await new Promise((resolve) => setTimeout(resolve, 100));

                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    await playPromise;
                    setIsPlaying(true);
                }
            }
        } catch (error) {
            console.error("Audio playback error:", error);
            // Reset state on error
            setIsPlaying(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAudioError = (
        e: React.SyntheticEvent<HTMLAudioElement, Event>
    ) => {
        console.error("Audio loading error:", e);
        setIsPlaying(false);
        setIsLoading(false);
    };

    const handleAudioLoad = () => {
        console.log("Audio file loaded successfully");
        setIsLoading(false);
    };

    const handleAudioEnded = () => {
        console.log("Song ended - looping back to start");
        // The loop attribute should handle this automatically,
        // but we can add custom logic here if needed
    };

    return (
        <MusicContainer>
            <audio
                ref={audioRef}
                loop
                onError={handleAudioError}
                onLoadedData={handleAudioLoad}
                onEnded={handleAudioEnded}
                preload="metadata"
            >
                <source src="/La Mentira.mp3" type="audio/mpeg" />
                <source src="./La Mentira.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>{" "}
            <MusicButton
                $isPlaying={isPlaying}
                onClick={toggleMusic}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={isLoading}
                style={{ opacity: isLoading ? 0.7 : 1 }}
            >
                <LoopIndicator $isPlaying={isPlaying}>∞</LoopIndicator>
                <PlayIcon
                    className={
                        isLoading
                            ? "fas fa-spinner fa-spin"
                            : isPlaying
                            ? "fas fa-pause"
                            : "fas fa-music"
                    }
                    animate={
                        isPlaying && !isLoading
                            ? {
                                  rotate: [0, 360],
                                  scale: [1, 1.1, 1],
                              }
                            : {}
                    }
                    transition={
                        isPlaying && !isLoading
                            ? {
                                  rotate: {
                                      duration: 3,
                                      repeat: Infinity,
                                      ease: "linear",
                                  },
                                  scale: {
                                      duration: 1,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                  },
                              }
                            : {}
                    }
                />
            </MusicButton>
        </MusicContainer>
    );
};

export default MusicPlayer;
