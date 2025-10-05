import React, { useCallback } from "react";
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
    );
    position: relative;
    overflow: hidden;
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
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    text-align: center;
    position: relative;
    text-shadow: 0 0 30px rgba(255, 107, 157, 0.3);

    &::before {
        content: "✨";
        position: absolute;
        top: -25px;
        left: -30px;
        font-size: 1.8rem;
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
        color: #ff6b9d;

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            font-size: 1.4rem;
            top: -15px;
            right: -25px;
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
        background: rgba(255, 107, 157, 0.3);
        border-radius: ${({ theme }) => theme.borderRadius.xl};
        z-index: -1;
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

    background: rgba(255, 255, 255, 0.95);
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
        filter: drop-shadow(0 0 5px rgba(255, 107, 157, 0.5));
    }

    &::after {
        content: "✨";
        position: absolute;
        bottom: -15px;
        right: 20px;
        font-size: 1.5rem;
        filter: drop-shadow(0 0 5px rgba(161, 140, 209, 0.5));
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
    background: rgba(255, 255, 255, 0.95);
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
    -webkit-tap-highlight-color: transparent;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(255, 107, 157, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.7);
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 1) 0%,
            rgba(254, 207, 239, 0.9) 50%,
            rgba(255, 182, 193, 0.8) 100%
        );
        border-color: rgba(255, 107, 157, 0.6);
    }

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: rgba(255, 107, 157, 0.1);
        transition: left 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        z-index: 1;
    }

    &:hover::before {
        left: 100%;
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
    border-radius: 50%;
    opacity: 0.6;
`;

const FloatingHeart = styled(motion.div)<{ delay: number; size: number }>`
    position: absolute;
    font-size: ${({ size }) => size}px;
    opacity: 0.7;
    color: #ff6b9d;
`;

const FloatingSparkle = styled(motion.div)<{ delay: number; size: number }>`
    position: absolute;
    font-size: ${({ size }) => size}px;
    opacity: 0.6;
    color: #a18cd1;
`;

const AboutSection: React.FC = React.memo(() => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [hoveredDetail, setHoveredDetail] = React.useState<string | null>(
        null
    );

    const handleMouseEnterLaugh = useCallback(() => {
        setHoveredDetail("laugh");
    }, []);

    const handleMouseLeaveLaugh = useCallback(() => {
        setHoveredDetail(null);
    }, []);

    const handleMouseEnterForever = useCallback(() => {
        setHoveredDetail("forever");
    }, []);

    const handleMouseLeaveForever = useCallback(() => {
        setHoveredDetail(null);
    }, []);

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
                                    onMouseEnter={handleMouseEnterLaugh}
                                    onMouseLeave={handleMouseLeaveLaugh}
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
                                    onMouseEnter={handleMouseEnterForever}
                                    onMouseLeave={handleMouseLeaveForever}
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
});

export default AboutSection;
