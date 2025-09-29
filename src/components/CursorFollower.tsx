import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const CursorContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 9999;
    /* Removed mix-blend-mode for better visibility */
`;

const CursorDot = styled.div.attrs<{ style: React.CSSProperties }>(
    ({ style }) => ({
        style,
    })
)`
    position: absolute;
    width: 16px;
    height: 16px;
    color: #ff6b9d;
    font-size: 16px;
    transition: all 0.15s ease-out;
    transform-origin: center;
    filter: drop-shadow(0 0 10px rgba(255, 107, 157, 0.6));
    text-shadow: 0 0 8px rgba(255, 107, 157, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    will-change: transform;
`;

const CursorRing = styled.div.attrs<{ style: React.CSSProperties }>(
    ({ style }) => ({
        style,
    })
)`
    position: absolute;
    width: 40px;
    height: 40px;
    color: rgba(255, 107, 157, 0.6);
    font-size: 40px;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform-origin: center;
    opacity: 0.8;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(0 0 10px rgba(255, 107, 157, 0.4));
`;

const CursorGlow = styled.div.attrs<{ style: React.CSSProperties }>(
    ({ style }) => ({
        style,
    })
)`
    position: absolute;
    width: 60px;
    height: 60px;
    background: radial-gradient(
        circle,
        rgba(255, 107, 157, 0.2) 0%,
        rgba(161, 140, 209, 0.1) 50%,
        transparent 100%
    );
    border-radius: 50%;
    transition: all 0.4s ease-out;
    transform-origin: center;
    opacity: 0;
`;

const starTwinkle = keyframes`
    0%, 100% {
        transform: scale(1) rotate(0deg);
        opacity: 0.8;
    }
    50% {
        transform: scale(1.3) rotate(180deg);
        opacity: 1;
    }
`;

const StarTrail = styled.div.attrs<{ style: React.CSSProperties }>(
    ({ style }) => ({
        style,
    })
)`
    position: absolute;
    font-size: 10px;
    color: #ff6b9d;
    animation: ${starTwinkle} 1.5s ease-in-out infinite;
    pointer-events: none;
    filter: drop-shadow(0 0 3px rgba(255, 107, 157, 0.6));
    opacity: 0.8;
    text-shadow: 0 0 5px rgba(255, 107, 157, 0.4);
    will-change: transform, opacity;
`;

const CursorFollower: React.FC = React.memo(() => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hoverType, setHoverType] = useState<string>("");
    const [isVisible, setIsVisible] = useState(false);
    const [starTrail, setStarTrail] = useState<
        Array<{ x: number; y: number; id: number }>
    >([]);

    useEffect(() => {
        let animationFrameId: number;

        const handleMouseMove = (e: MouseEvent) => {
            // Use requestAnimationFrame to throttle updates
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }

            animationFrameId = requestAnimationFrame(() => {
                const newPosition = { x: e.clientX, y: e.clientY };
                setPosition(newPosition);
                setIsVisible(true);

                // Reduce star frequency and trail length for better performance
                if (Math.random() < 0.3) {
                    // Only create stars 30% of the time
                    const newStar = {
                        x: e.clientX,
                        y: e.clientY,
                        id: Date.now() + Math.random(),
                    };

                    setStarTrail((prev) => {
                        const updatedTrail = [newStar, ...prev.slice(0, 19)]; // Reduced to 20 stars
                        return updatedTrail;
                    });

                    // Remove stars faster to prevent accumulation
                    setTimeout(() => {
                        setStarTrail((prev) =>
                            prev.filter((star) => star.id !== newStar.id)
                        );
                    }, 2000); // Reduced duration
                }
            });
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (target.tagName === "A") {
                setHoverType("link");
            } else if (target.tagName === "BUTTON") {
                setHoverType("button");
            } else if (target.closest("[data-cursor-hover]")) {
                setHoverType("interactive");
            } else if (
                target.closest(".card") ||
                target.closest('[role="button"]')
            ) {
                setHoverType("card");
            } else {
                setHoverType("");
            }
        };

        const handleMouseOut = () => {
            setHoverType("");
        };

        // Add cursor hover attributes to interactive elements
        const addHoverAttributes = () => {
            const interactiveElements = document.querySelectorAll(
                'button, a, [role="button"], .card, .interactive'
            );
            interactiveElements.forEach((el) => {
                el.setAttribute("data-cursor-hover", "true");
            });
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);

        // Add hover attributes after a short delay to ensure DOM is ready
        setTimeout(addHoverAttributes, 1000);

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
        };
    }, []);

    const getCursorStyles = () => {
        const baseTransform = `translate(${position.x - 8}px, ${
            position.y - 8
        }px)`;

        switch (hoverType) {
            case "link":
                return {
                    transform: `${baseTransform} scale(1.5)`,
                    color: "#ff6b9d",
                    filter: "drop-shadow(0 0 25px rgba(255, 107, 157, 1))",
                };
            case "button":
                return {
                    transform: `${baseTransform} scale(2)`,
                    color: "#a18cd1",
                    filter: "drop-shadow(0 0 30px rgba(161, 140, 209, 1))",
                };
            case "interactive":
                return {
                    transform: `${baseTransform} scale(1.8)`,
                    color: "#4fd1c7",
                    filter: "drop-shadow(0 0 28px rgba(79, 209, 199, 1))",
                };
            case "card":
                return {
                    transform: `${baseTransform} scale(2.2)`,
                    color: "#ffb6c1",
                    filter: "drop-shadow(0 0 35px rgba(255, 182, 193, 1))",
                };
            default:
                return {
                    transform: baseTransform,
                    color: "#ff6b9d",
                    filter: "drop-shadow(0 0 15px rgba(255, 107, 157, 0.8))",
                };
        }
    };

    const getRingStyles = () => {
        const baseTransform = `translate(${position.x - 20}px, ${
            position.y - 20
        }px)`;

        if (hoverType) {
            return {
                transform: `${baseTransform} scale(1.5)`,
                color: "rgba(255, 107, 157, 0.8)",
                opacity: 1,
            };
        }

        return {
            transform: baseTransform,
            color: "rgba(255, 107, 157, 0.6)",
            opacity: 0.8,
        };
    };

    const getGlowStyles = () => {
        const baseTransform = `translate(${position.x - 30}px, ${
            position.y - 30
        }px)`;

        if (hoverType) {
            return {
                transform: `${baseTransform} scale(1.8)`,
                opacity: 0.6,
            };
        }

        return {
            transform: baseTransform,
            opacity: 0,
        };
    };

    if (!isVisible) return null;

    return (
        <CursorContainer>
            {/* Star trail effect */}
            {starTrail.map((star, index) => (
                <StarTrail
                    key={star.id}
                    style={{
                        transform: `translate(${star.x - 5}px, ${
                            star.y - 5
                        }px)`,
                        opacity: Math.max(0.2, (20 - index) / 20), // Adjusted for 20 stars
                        animationDelay: `${index * 0.05}s`,
                        fontSize: `${Math.max(6, 10 - index * 0.15)}px`, // Smaller size variations
                    }}
                >
                    ⭐
                </StarTrail>
            ))}

            {/* Main cursor heart */}
            <CursorDot style={getCursorStyles()}>💖</CursorDot>

            {/* Heart ring for hover feedback */}
            {hoverType && <CursorRing style={getRingStyles()}>💕</CursorRing>}

            {/* Simple glow for hover feedback */}
            {hoverType && <CursorGlow style={getGlowStyles()} />}
        </CursorContainer>
    );
});

export default CursorFollower;
