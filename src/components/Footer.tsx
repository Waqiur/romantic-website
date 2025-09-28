import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const FooterContainer = styled.footer`
    padding: ${({ theme }) => theme.spacing.xxl} 0;
    background: ${({ theme }) => theme.colors.gradients.primary};
    position: relative;
    text-align: center;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        padding: ${({ theme }) => theme.spacing.xl} 0;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: ${({ theme }) => theme.spacing.lg} 0;
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

const FooterContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xl};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        gap: ${({ theme }) => theme.spacing.lg};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        gap: ${({ theme }) => theme.spacing.md};
    }
`;

const FooterHeart = styled(motion.div)`
    font-size: clamp(2.5rem, 6vw, 4rem);
    color: ${({ theme }) => theme.colors.white};
    filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.4));
    }
`;

const FooterMessage = styled.div`
    max-width: 600px;
    color: ${({ theme }) => theme.colors.white};
    font-size: clamp(1rem, 2.5vw, 1.2rem);
    line-height: 1.6;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        max-width: 90%;
        line-height: 1.5;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        max-width: 95%;
        line-height: 1.4;
        padding: 0 ${({ theme }) => theme.spacing.xs};
    }
`;

const TypewriterText = styled.span<{ $isTyping: boolean }>`
    &::after {
        content: "|";
        opacity: ${({ $isTyping }) => ($isTyping ? 1 : 0)};
        animation: ${({ $isTyping }) =>
            $isTyping ? "blink 1s infinite" : "none"};
    }

    @keyframes blink {
        0%,
        50% {
            opacity: 1;
        }
        51%,
        100% {
            opacity: 0;
        }
    }
`;

const Footer: React.FC = () => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);

    const footerMessage =
        "Thank you for being the light of my life. I love you more than words can express. 💕";

    useEffect(() => {
        // Typewriter effect
        if (currentIndex < footerMessage.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + footerMessage[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, 100);

            return () => clearTimeout(timeout);
        } else {
            setIsTyping(false);
        }
    }, [currentIndex, footerMessage]);

    return (
        <FooterContainer>
            <Container>
                <FooterContent>
                    <FooterHeart
                        animate={{
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        💖
                    </FooterHeart>

                    <FooterMessage>
                        <TypewriterText $isTyping={isTyping}>
                            {displayedText}
                        </TypewriterText>
                    </FooterMessage>
                </FooterContent>
            </Container>
        </FooterContainer>
    );
};

export default Footer;
