import React, { useCallback } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useMusic } from "../contexts/MusicContext";

const MusicContainer = styled.div`
    position: fixed;
    top: clamp(1rem, 3vw, ${({ theme }) => theme.spacing.lg});
    right: clamp(1rem, 3vw, ${({ theme }) => theme.spacing.lg});
    z-index: 1000;
`;

const MusicButton = styled(motion.button)<{ $isPlaying: boolean }>`
    width: clamp(50px, 8vw, 60px);
    height: clamp(50px, 8vw, 60px);
    background: ${({ $isPlaying }) =>
        $isPlaying
            ? "linear-gradient(135deg, #ff6b9d 0%, #a18cd1 100%)"
            : "rgba(255, 107, 157, 0.1)"};
    backdrop-filter: blur(10px);
    border: 2px solid #ff6b9d;
    border-radius: 50%;
    color: ${({ $isPlaying }) => ($isPlaying ? "#ffffff" : "#ff6b9d")};
    font-size: clamp(1.2rem, 2.5vw, 1.5rem);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    will-change: transform;
    transform: translate3d(0, 0, 0);

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
    top: clamp(-6px, -1vw, -8px);
    right: clamp(-6px, -1vw, -8px);
    width: clamp(16px, 3vw, 20px);
    height: clamp(16px, 3vw, 20px);
    background: linear-gradient(135deg, #ff6b9d 0%, #a18cd1 100%);
    border-radius: 50%;
    display: ${({ $isPlaying }) => ($isPlaying ? "flex" : "none")};
    align-items: center;
    justify-content: center;
    font-size: clamp(0.5rem, 1vw, 0.6rem);
    color: white;
    font-weight: bold;
    box-shadow: 0 2px 8px rgba(255, 107, 157, 0.3);
    z-index: 2;
`;

const PlayIcon = styled(motion.i)`
    position: relative;
    z-index: 1;
    will-change: transform;
    transform: translate3d(0, 0, 0);
`;

const MusicPlayer: React.FC = React.memo(() => {
    const { isPlaying, isLoading, toggleMusic, audioRef } = useMusic();

    const handleAudioError = useCallback(
        (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
            console.error("Audio loading error:", e);
        },
        []
    );

    const handleAudioLoad = useCallback(() => {
        // Audio file loaded successfully
    }, []);

    const handleAudioEnded = useCallback(() => {
        // Song ended - looping back to start
        // The loop attribute should handle this automatically,
        // but we can add custom logic here if needed
    }, []);

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
                <source src="/La Mentira.aac" type="audio/aac" />
                <source src="./La Mentira.aac" type="audio/aac" />
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
});

export default MusicPlayer;
