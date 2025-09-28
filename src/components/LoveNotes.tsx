import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const NotesContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 998;

    /* Reduce motion on mobile for better performance */
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        * {
            animation-duration: 0.3s !important;
            transition-duration: 0.2s !important;
        }
    }
`;

const LoveNote = styled(motion.div)`
    position: absolute;
    background: ${({ theme }) => theme.colors.gradients.primary};
    color: ${({ theme }) => theme.colors.white};
    padding: ${({ theme }) => theme.spacing.md}
        ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    box-shadow: ${({ theme }) => theme.shadows.strong};
    max-width: min(280px, 85vw);
    width: 100%;
    font-size: clamp(0.9rem, 2.5vw, 1rem);
    line-height: 1.4;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.2);
    pointer-events: auto;
    cursor: pointer;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: ${({ theme }) => theme.spacing.sm}
            ${({ theme }) => theme.spacing.md};
        max-width: min(250px, 90vw);
        font-size: 0.85rem;
    }

    &::before {
        content: "";
        position: absolute;
        bottom: -10px;
        left: 20px;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid ${({ theme }) => theme.colors.primary};

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            left: 15px;
            border-left-width: 8px;
            border-right-width: 8px;
            border-top-width: 8px;
            bottom: -8px;
        }
    }

    &::after {
        content: "💕";
        position: absolute;
        top: -15px;
        right: -15px;
        font-size: 1.5rem;
        background: ${({ theme }) => theme.colors.white};
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            top: -12px;
            right: -12px;
            width: 24px;
            height: 24px;
            font-size: 1.2rem;
        }
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    transition: all 0.2s ease;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: 20px;
        height: 20px;
        font-size: 0.7rem;
        top: 3px;
        right: 3px;
    }

    &:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: scale(1.1);
    }
`;

interface Note {
    id: number;
    text: string;
    x: number;
    y: number;
}

const loveMessages = [
    "Even miles apart, you make my heart skip a beat every single day 💖",
    "Your smile may be far away, but it’s still my favorite view ✨",
    "With every message and call, I fall in love with you more 💕",
    "Even oceans apart, you’re my sunshine on cloudy days ☀️",
    "Every love song reminds me of us — no matter the distance 🎵",
    "You’re not just my love, you’re my best friend across the miles 👫",
    "Hearing your laugh makes the distance disappear 😄",
    "Even from afar, you make ordinary moments feel magical ✨",
    "Your soul shines brighter than any star I see from here 💫",
    "My love for you grows stronger, no matter how far apart we are 🌹",
    "You’re the reason I believe love knows no distance 🏰",
    "You see the world with such wonder — and I’m grateful I get to share it with you 🌍",
    "You inspire me to be my best, even from a thousand miles away 💪",
    "No matter where we are, your love feels like home 🌎",
];

const LoveNotes: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        const handleShowLoveNote = () => {
            showRandomNote();
        };

        // Listen for custom event
        window.addEventListener("showLoveNote", handleShowLoveNote);

        // Show random notes occasionally
        const interval = setInterval(() => {
            if (Math.random() < 0.3) {
                // 30% chance every 10 seconds
                showRandomNote();
            }
        }, 10000);
        return () => {
            window.removeEventListener("showLoveNote", handleShowLoveNote);
            clearInterval(interval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const showRandomNote = () => {
        const randomMessage =
            loveMessages[Math.floor(Math.random() * loveMessages.length)];
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const isMobile = windowWidth <= 768;

        // Adjust positioning for mobile vs desktop
        const sideMargin = isMobile ? 15 : 20;
        const topMargin = isMobile ? 80 : 20; // More top margin on mobile for status bar
        const noteWidth = isMobile ? 250 : 300;
        const noteHeight = isMobile ? 120 : 150;

        // Position the note randomly, but ensure it's visible
        const x = Math.max(
            sideMargin,
            Math.min(
                windowWidth - noteWidth - sideMargin,
                Math.random() * (windowWidth - noteWidth)
            )
        );
        const y = Math.max(
            topMargin,
            Math.min(
                windowHeight - noteHeight - sideMargin,
                Math.random() * (windowHeight - noteHeight)
            )
        );

        const newNote: Note = {
            id: Date.now(),
            text: randomMessage,
            x,
            y,
        };

        setNotes((prev) => [...prev, newNote]);

        // Auto-remove note after 5 seconds
        setTimeout(() => {
            removeNote(newNote.id);
        }, 5000);
    };

    const removeNote = (id: number) => {
        setNotes((prev) => prev.filter((note) => note.id !== id));
    };

    return (
        <NotesContainer>
            <AnimatePresence>
                {notes.map((note) => (
                    <LoveNote
                        key={note.id}
                        initial={{
                            x: note.x,
                            y: note.y + 50,
                            opacity: 0,
                            scale: 0.8,
                            rotate: -10,
                        }}
                        animate={{
                            x: note.x,
                            y: note.y,
                            opacity: 1,
                            scale: 1,
                            rotate: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.8,
                            y: note.y - 20,
                            rotate: 10,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                        }}
                        whileHover={{
                            scale: 1.02,
                            rotate: 1,
                            transition: { duration: 0.2 },
                        }}
                        onClick={() => removeNote(note.id)}
                    >
                        <CloseButton
                            onClick={(e) => {
                                e.stopPropagation();
                                removeNote(note.id);
                            }}
                        >
                            ×
                        </CloseButton>
                        {note.text}
                    </LoveNote>
                ))}
            </AnimatePresence>
        </NotesContainer>
    );
};

export default LoveNotes;
