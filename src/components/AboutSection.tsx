import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutContainer = styled.section`
    padding: ${({ theme }) => theme.spacing.xxl} 0;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: ${({ theme }) => theme.spacing.xl} 0;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: ${({ theme }) => theme.spacing.lg} 0;
    }

    background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(254, 207, 239, 0.7) 50%,
            rgba(255, 182, 193, 0.6) 100%
        ),
        radial-gradient(
            circle at 30% 20%,
            rgba(147, 51, 234, 0.1) 0%,
            transparent 50%
        ),
        radial-gradient(
            circle at 70% 80%,
            rgba(59, 130, 246, 0.1) 0%,
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
                rgba(255, 107, 157, 0.05) 0%,
                transparent 40%
            ),
            radial-gradient(
                circle at 80% 70%,
                rgba(161, 140, 209, 0.05) 0%,
                transparent 40%
            ),
            radial-gradient(
                circle at 50% 50%,
                rgba(79, 209, 199, 0.03) 0%,
                transparent 40%
            );
        animation: subtleFloat 15s ease-in-out infinite alternate;
    }

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: radial-gradient(
                circle at 25% 25%,
                rgba(255, 107, 157, 0.03) 0%,
                transparent 50%
            ),
            radial-gradient(
                circle at 75% 75%,
                rgba(161, 140, 209, 0.03) 0%,
                transparent 50%
            ),
            radial-gradient(
                circle at 50% 10%,
                rgba(255, 182, 193, 0.02) 0%,
                transparent 50%
            );
        animation: backgroundShift 20s ease-in-out infinite alternate;
    }

    @keyframes subtleFloat {
        0% {
            transform: translateY(0px) rotate(0deg);
        }
        100% {
            transform: translateY(-10px) rotate(0.5deg);
        }
    }

    @keyframes backgroundShift {
        0% {
            opacity: 0.3;
        }
        100% {
            opacity: 0.7;
        }
    }
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.md};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: 0 ${({ theme }) => theme.spacing.sm};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 0 ${({ theme }) => theme.spacing.xs};
    }
`;

const SectionHeader = styled.div`
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xxl};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        margin-bottom: ${({ theme }) => theme.spacing.xl};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin-bottom: ${({ theme }) => theme.spacing.lg};
    }
`;

const SectionTitle = styled(motion.h2)`
    font-size: clamp(2rem, 5vw, 3.5rem);
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
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    text-align: center;
    position: relative;
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

const AboutContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: ${({ theme }) => theme.spacing.xxl};
    align-items: center;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        grid-template-columns: 1fr;
        gap: ${({ theme }) => theme.spacing.xl};
        text-align: center;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        gap: ${({ theme }) => theme.spacing.lg};
    }
`;

const PortraitContainer = styled(motion.div)`
    position: relative;
`;

const PortraitFrame = styled.div`
    position: relative;
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2),
        0 0 0 1px rgba(255, 255, 255, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.2),
        0 0 20px rgba(255, 107, 157, 0.3);
    background: linear-gradient(
        135deg,
        rgba(255, 107, 157, 0.8) 0%,
        rgba(161, 140, 209, 0.8) 50%,
        rgba(79, 209, 199, 0.8) 100%
    );
    padding: 16px;
    transition: all 0.4s ease;
    filter: drop-shadow(0 0 15px rgba(255, 107, 157, 0.2));

    &:hover {
        transform: translateY(-12px) rotate(2deg) scale(1.02);
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            0 0 30px rgba(255, 107, 157, 0.5);
        filter: drop-shadow(0 0 25px rgba(255, 107, 157, 0.4));
    }

    &::before {
        content: "";
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(
            45deg,
            rgba(255, 107, 157, 0.3),
            rgba(161, 140, 209, 0.3),
            rgba(79, 209, 199, 0.3),
            rgba(255, 107, 157, 0.3)
        );
        border-radius: ${({ theme }) => theme.borderRadius.xl};
        z-index: -1;
        animation: borderGlow 3s ease-in-out infinite alternate;
    }

    @keyframes borderGlow {
        0% {
            opacity: 0.3;
        }
        100% {
            opacity: 0.8;
        }
    }
`;

const PortraitImg = styled.img`
    width: 100%;
    height: 500px;
    object-fit: contain;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    transition: transform 0.3s ease;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        height: 400px;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        height: 300px;
    }

    &:hover {
        transform: scale(1.05);

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            transform: scale(1.02);
        }
    }
`;

const PortraitOverlay = styled.div`
    position: absolute;
    top: 8px;
    left: 8px;
    right: 8px;
    bottom: 8px;
    background: linear-gradient(
        135deg,
        rgba(255, 107, 157, 0.1) 0%,
        rgba(161, 140, 209, 0.1) 100%
    );
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    opacity: 0;
    transition: opacity 0.3s ease;

    ${PortraitFrame}:hover & {
        opacity: 1;
    }
`;

const AboutText = styled(motion.div)`
    font-size: 1.1rem;
    line-height: 1.8;
    color: #2d3748;
`;

const HighlightText = styled(motion.p)`
    font-size: clamp(1.1rem, 2.5vw, 1.4rem);
    font-weight: 500;
    color: #1a202c;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    position: relative;
    padding: ${({ theme }) => theme.spacing.lg};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: ${({ theme }) => theme.spacing.md};
        margin-bottom: ${({ theme }) => theme.spacing.lg};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: ${({ theme }) => theme.spacing.sm};
        margin-bottom: ${({ theme }) => theme.spacing.md};
        font-size: 1rem;
    }

    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.95) 0%,
        rgba(254, 207, 239, 0.5) 50%,
        rgba(255, 182, 193, 0.4) 100%
    );
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    border-left: 5px solid #ff6b9d;
    box-shadow: 0 8px 25px rgba(255, 107, 157, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    font-style: italic;
    text-align: center;
    line-height: 1.6;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(255, 107, 157, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.7);
    }

    &::before {
        content: "💫";
        position: absolute;
        top: -15px;
        left: 20px;
        font-size: 1.5rem;
        animation: sparkle 2s ease-in-out infinite alternate;
        filter: drop-shadow(0 0 5px rgba(255, 107, 157, 0.5));
    }

    &::after {
        content: "✨";
        position: absolute;
        bottom: -15px;
        right: 20px;
        font-size: 1.5rem;
        animation: sparkle 2s ease-in-out infinite alternate-reverse;
        filter: drop-shadow(0 0 5px rgba(161, 140, 209, 0.5));
    }

    @keyframes sparkle {
        0% {
            transform: scale(1) rotate(0deg);
        }
        100% {
            transform: scale(1.2) rotate(10deg);
        }
    }
`;

const InteractiveDetails = styled.div`
    margin-top: ${({ theme }) => theme.spacing.xl};
`;

const DetailItem = styled(motion.div)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.lg};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: ${({ theme }) => theme.spacing.md};
        margin-bottom: ${({ theme }) => theme.spacing.md};
        flex-direction: column;
        gap: ${({ theme }) => theme.spacing.xs};
        text-align: center;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: ${({ theme }) => theme.spacing.sm};
        margin-bottom: ${({ theme }) => theme.spacing.sm};
    }
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.95) 0%,
        rgba(254, 207, 239, 0.4) 50%,
        rgba(255, 182, 193, 0.3) 100%
    );
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    will-change: transform, box-shadow;
    transform-style: preserve-3d;

    &:hover {
        transform: translateY(-20px) scale(1.08) rotateX(10deg) rotateY(3deg);

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            transform: translateY(-8px) scale(1.02);
        }
        box-shadow: 0 35px 70px rgba(255, 107, 157, 0.4),
            0 0 0 2px rgba(255, 107, 157, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.8),
            0 0 50px rgba(255, 107, 157, 0.3),
            0 0 100px rgba(161, 140, 209, 0.2);
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 1) 0%,
            rgba(254, 207, 239, 0.9) 50%,
            rgba(255, 182, 193, 0.8) 100%
        );
        border-color: rgba(255, 107, 157, 0.6);
        animation: cardPulse 1.5s ease-in-out infinite,
            cardGlow 3s ease-in-out infinite;
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
            rgba(255, 107, 157, 0.3),
            rgba(161, 140, 209, 0.3),
            rgba(79, 209, 199, 0.3),
            transparent
        );
        transition: left 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        z-index: 1;
    }

    &:hover::before {
        left: 100%;
    }

    &::after {
        content: "";
        position: absolute;
        top: -3px;
        left: -3px;
        right: -3px;
        bottom: -3px;
        background: linear-gradient(
            45deg,
            rgba(255, 107, 157, 0.4),
            rgba(161, 140, 209, 0.4),
            rgba(79, 209, 199, 0.4),
            rgba(255, 107, 157, 0.4)
        );
        border-radius: ${({ theme }) => theme.borderRadius.lg};
        z-index: -1;
        opacity: 0;
        transition: opacity 0.4s ease;
        animation: borderPulse 2s ease-in-out infinite;
    }

    &:hover::after {
        opacity: 1;
    }

    @keyframes cardPulse {
        0%,
        100% {
            transform: translateY(-20px) scale(1.08) rotateX(10deg)
                rotateY(3deg);
        }
        50% {
            transform: translateY(-25px) scale(1.12) rotateX(12deg)
                rotateY(4deg);
        }
    }

    @keyframes cardGlow {
        0%,
        100% {
            filter: drop-shadow(0 0 20px rgba(255, 107, 157, 0.3));
        }
        50% {
            filter: drop-shadow(0 0 40px rgba(255, 107, 157, 0.6));
        }
    }

    @keyframes borderPulse {
        0%,
        100% {
            opacity: 0.3;
        }
        50% {
            opacity: 0.8;
        }
    }

    /* Particle effects on hover */
    &:hover .particle {
        opacity: 1;
        animation: particleFloat 2.5s ease-in-out infinite;
        filter: drop-shadow(0 0 8px rgba(255, 107, 157, 0.8));
    }

    /* Add sparkle burst effect on hover */
    &:hover::before {
        left: 100%;
        animation: shimmerSweep 1.2s ease-in-out infinite;
    }

    @keyframes shimmerSweep {
        0% {
            background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 107, 157, 0.4),
                rgba(161, 140, 209, 0.4),
                rgba(79, 209, 199, 0.4),
                transparent
            );
        }
        50% {
            background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, 0.6),
                rgba(255, 107, 157, 0.5),
                rgba(161, 140, 209, 0.5),
                transparent
            );
        }
        100% {
            background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 107, 157, 0.4),
                rgba(161, 140, 209, 0.4),
                rgba(79, 209, 199, 0.4),
                transparent
            );
        }
    }

    @keyframes particleFloat {
        0%,
        100% {
            transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
            opacity: 0.8;
        }
        25% {
            transform: translateY(-20px) translateX(8px) scale(1.3)
                rotate(90deg);
            opacity: 1;
        }
        50% {
            transform: translateY(-35px) translateX(-8px) scale(0.9)
                rotate(180deg);
            opacity: 0.7;
        }
        75% {
            transform: translateY(-20px) translateX(5px) scale(1.2)
                rotate(270deg);
            opacity: 0.9;
        }
    }
`;

const DetailLabel = styled.span`
    font-weight: 600;
    color: #1a202c;
    position: relative;
    z-index: 2;
    transition: color 0.3s ease;
    font-size: clamp(0.9rem, 2vw, 1rem);

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin-bottom: ${({ theme }) => theme.spacing.xs};
    }

    ${DetailItem}:hover & {
        color: #2d3748;
    }
`;

const DetailValue = styled.span`
    color: #1a202c;
    font-weight: 700;
    font-size: clamp(1rem, 2.2vw, 1.1rem);
    position: relative;
    z-index: 2;
    transition: all 0.3s ease;

    ${DetailItem}:hover & {
        color: #ff6b9d;
        transform: scale(1.1);
        text-shadow: 0 0 15px rgba(255, 107, 157, 0.6),
            0 0 30px rgba(255, 107, 157, 0.4);
        animation: textPulse 2s ease-in-out infinite;
    }

    @keyframes textPulse {
        0%,
        100% {
            transform: scale(1.1);
        }
        50% {
            transform: scale(1.15);
        }
    }

    &::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, #ff6b9d, #a18cd1);
        transition: width 0.4s ease;
    }

    ${DetailItem}:hover &::after {
        width: 100%;
    }
`;

const Tooltip = styled(motion.div)`
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
    padding: ${({ theme }) => theme.spacing.xs}
        ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    font-size: 0.9rem;
    white-space: nowrap;
    z-index: 10;

    &::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 5px solid transparent;
        border-top-color: ${({ theme }) => theme.colors.black};
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

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        display: none; /* Hide floating decorations on mobile for better performance */
    }
`;

const FloatingDecoration = styled(motion.div)<{ delay: number; size: number }>`
    position: absolute;
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    background: linear-gradient(
        135deg,
        rgba(255, 107, 157, 0.2),
        rgba(161, 140, 209, 0.2)
    );
    border-radius: 50%;
    opacity: 0.6;
    animation: floatDecoration ${({ delay }) => 8 + delay}s ease-in-out infinite;

    @keyframes floatDecoration {
        0%,
        100% {
            transform: translateY(0px) translateX(0px) scale(1);
        }
        33% {
            transform: translateY(-20px) translateX(10px) scale(1.1);
        }
        66% {
            transform: translateY(-10px) translateX(-10px) scale(0.9);
        }
    }
`;

const FloatingHeart = styled(motion.div)<{ delay: number; size: number }>`
    position: absolute;
    font-size: ${({ size }) => size}px;
    opacity: 0.7;
    animation: heartPulse ${({ delay }) => 6 + delay}s ease-in-out infinite;
    color: #ff6b9d;

    @keyframes heartPulse {
        0%,
        100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.4;
        }
        50% {
            transform: scale(1.3) rotate(10deg);
            opacity: 0.8;
        }
    }
`;

const FloatingSparkle = styled(motion.div)<{ delay: number; size: number }>`
    position: absolute;
    font-size: ${({ size }) => size}px;
    opacity: 0.6;
    animation: sparkleTwinkle ${({ delay }) => 4 + delay}s ease-in-out infinite;
    color: #a18cd1;

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

const AboutSection: React.FC = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [hoveredDetail, setHoveredDetail] = React.useState<string | null>(
        null
    );

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2,
                ease: "easeOut",
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <AboutContainer ref={ref}>
            <FloatingDecorations>
                <FloatingDecoration
                    delay={0}
                    size={60}
                    style={{ top: "10%", left: "10%" }}
                />
                <FloatingDecoration
                    delay={2}
                    size={40}
                    style={{ top: "20%", right: "15%" }}
                />
                <FloatingDecoration
                    delay={4}
                    size={80}
                    style={{ bottom: "20%", left: "20%" }}
                />
                <FloatingDecoration
                    delay={1}
                    size={50}
                    style={{ bottom: "30%", right: "10%" }}
                />
                <FloatingDecoration
                    delay={3}
                    size={35}
                    style={{ top: "60%", left: "80%" }}
                />

                <FloatingHeart
                    delay={0}
                    size={24}
                    style={{ top: "15%", left: "5%" }}
                >
                    💖
                </FloatingHeart>
                <FloatingHeart
                    delay={1.5}
                    size={20}
                    style={{ top: "25%", right: "8%" }}
                >
                    💕
                </FloatingHeart>
                <FloatingHeart
                    delay={3}
                    size={18}
                    style={{ bottom: "25%", left: "15%" }}
                >
                    💗
                </FloatingHeart>

                <FloatingSparkle
                    delay={0}
                    size={16}
                    style={{ top: "8%", left: "20%" }}
                >
                    ✨
                </FloatingSparkle>
                <FloatingSparkle
                    delay={2}
                    size={14}
                    style={{ top: "35%", right: "5%" }}
                >
                    ⭐
                </FloatingSparkle>
                <FloatingSparkle
                    delay={4}
                    size={12}
                    style={{ bottom: "15%", left: "25%" }}
                >
                    🌟
                </FloatingSparkle>
                <FloatingSparkle
                    delay={1}
                    size={18}
                    style={{ top: "50%", right: "20%" }}
                >
                    💫
                </FloatingSparkle>
            </FloatingDecorations>
            <Container>
                <SectionHeader>
                    <SectionTitle
                        initial={{ opacity: 0, y: 30, scale: 0.8 }}
                        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        About My Beautiful Love
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
                    <AboutContent>
                        <PortraitContainer variants={itemVariants}>
                            <PortraitFrame>
                                <PortraitImg
                                    src="/image.webp"
                                    alt="Beautiful You"
                                />
                                <PortraitOverlay />
                            </PortraitFrame>
                        </PortraitContainer>

                        <AboutText variants={itemVariants}>
                            <HighlightText
                                initial={{ opacity: 0, x: 30 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                You light up my world with your beautiful smile
                                and kind heart. Every moment with you feels like
                                a dream come true.
                            </HighlightText>

                            <InteractiveDetails>
                                <DetailItem
                                    variants={itemVariants}
                                    onMouseEnter={() =>
                                        setHoveredDetail("laugh")
                                    }
                                    onMouseLeave={() => setHoveredDetail(null)}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                >
                                    {/* Floating particles */}
                                    <div
                                        className="particle"
                                        style={{
                                            position: "absolute",
                                            top: "20%",
                                            left: "30%",
                                            fontSize: "12px",
                                            opacity: 0,
                                            transition: "opacity 0.3s ease",
                                        }}
                                    >
                                        ✨
                                    </div>
                                    <div
                                        className="particle"
                                        style={{
                                            position: "absolute",
                                            top: "60%",
                                            right: "25%",
                                            fontSize: "10px",
                                            opacity: 0,
                                            transition: "opacity 0.3s ease",
                                            animationDelay: "0.5s",
                                        }}
                                    >
                                        💖
                                    </div>
                                    <div
                                        className="particle"
                                        style={{
                                            position: "absolute",
                                            bottom: "30%",
                                            left: "20%",
                                            fontSize: "8px",
                                            opacity: 0,
                                            transition: "opacity 0.3s ease",
                                            animationDelay: "1s",
                                        }}
                                    >
                                        ⭐
                                    </div>

                                    <DetailLabel>What I love most:</DetailLabel>
                                    <DetailValue>
                                        Everything about you ❤️
                                    </DetailValue>
                                    {hoveredDetail === "laugh" && (
                                        <Tooltip
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                        >
                                            Your laugh is my favorite sound
                                        </Tooltip>
                                    )}
                                </DetailItem>

                                <DetailItem
                                    variants={itemVariants}
                                    onMouseEnter={() =>
                                        setHoveredDetail("forever")
                                    }
                                    onMouseLeave={() => setHoveredDetail(null)}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                >
                                    {/* Floating particles */}
                                    <div
                                        className="particle"
                                        style={{
                                            position: "absolute",
                                            top: "25%",
                                            right: "30%",
                                            fontSize: "11px",
                                            opacity: 0,
                                            transition: "opacity 0.3s ease",
                                        }}
                                    >
                                        💫
                                    </div>
                                    <div
                                        className="particle"
                                        style={{
                                            position: "absolute",
                                            top: "70%",
                                            left: "25%",
                                            fontSize: "9px",
                                            opacity: 0,
                                            transition: "opacity 0.3s ease",
                                            animationDelay: "0.7s",
                                        }}
                                    >
                                        🌟
                                    </div>
                                    <div
                                        className="particle"
                                        style={{
                                            position: "absolute",
                                            bottom: "20%",
                                            right: "15%",
                                            fontSize: "7px",
                                            opacity: 0,
                                            transition: "opacity 0.3s ease",
                                            animationDelay: "1.2s",
                                        }}
                                    >
                                        💕
                                    </div>

                                    <DetailLabel>
                                        How long I'll love you:
                                    </DetailLabel>
                                    <DetailValue>
                                        Until the end of time ∞
                                    </DetailValue>
                                    {hoveredDetail === "forever" && (
                                        <Tooltip
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                        >
                                            Forever and always
                                        </Tooltip>
                                    )}
                                </DetailItem>
                            </InteractiveDetails>
                        </AboutText>
                    </AboutContent>
                </motion.div>
            </Container>
        </AboutContainer>
    );
};

export default AboutSection;
