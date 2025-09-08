import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const FooterContainer = styled.footer`
    padding: ${({ theme }) => theme.spacing.xxl} 0;
    background: ${({ theme }) => theme.colors.gradients.primary};
    position: relative;
    text-align: center;
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.md};
`;

const FooterContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xl};
`;

const FooterHeart = styled(motion.div)`
    font-size: 4rem;
    color: ${({ theme }) => theme.colors.white};
    filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
`;

const FooterMessage = styled.div`
    max-width: 600px;
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.2rem;
    line-height: 1.6;
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
        <>
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
                            {" "}
                            <TypewriterText $isTyping={isTyping}>
                                {displayedText}
                            </TypewriterText>
                        </FooterMessage>
                    </FooterContent>
                </Container>
            </FooterContainer>
        </>
    );
};

export default Footer;
