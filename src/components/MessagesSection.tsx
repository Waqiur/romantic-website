import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const MessagesContainer = styled.section`
    padding: ${({ theme }) => theme.spacing.xxl} 0;
    background: ${({ theme }) => theme.colors.gradients.sunset};
    position: relative;
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.md};
`;

const SectionHeader = styled.div`
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const SectionTitle = styled(motion.h2)`
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-family: ${({ theme }) => theme.fonts.heading};
    color: ${({ theme }) => theme.colors.white};
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const AnimatedUnderline = styled(motion.div)`
    width: 100px;
    height: 4px;
    background: ${({ theme }) => theme.colors.white};
    margin: 0 auto;
    border-radius: 2px;
`;

const EnvelopesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: ${({ theme }) => theme.spacing.xl};
    max-width: 1000px;
    margin: 0 auto;
`;

const EnvelopeWrapper = styled(motion.div)`
    perspective: 1000px;
`;

const Envelope = styled(motion.div)<{ isOpen: boolean }>`
    position: relative;
    width: 100%;
    height: 250px;
    cursor: pointer;
    transform-style: preserve-3d;
    transition: transform 0.6s ease;
    transform: ${({ isOpen }) =>
        isOpen ? "rotateY(180deg)" : "rotateY(0deg)"};
`;

const EnvelopeSide = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const EnvelopeFront = styled(EnvelopeSide)`
    background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 3px solid ${({ theme }) => theme.colors.primary};
    position: relative;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: ${({ theme }) => theme.colors.gradients.primary};
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    &:hover::before {
        opacity: 0.1;
    }
`;

const EnvelopeBack = styled(EnvelopeSide)`
    background: ${({ theme }) => theme.colors.gradients.primary};
    transform: rotateY(180deg);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing.lg};
`;

const HeartSeal = styled(motion.div)`
    font-size: 3rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    filter: drop-shadow(0 4px 10px rgba(255, 107, 157, 0.3));
`;

const EnvelopeText = styled.p`
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.gray.dark};
    font-weight: 500;
    text-align: center;
`;

const MessageContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MessageText = styled(motion.div)`
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.1rem;
    line-height: 1.6;
    text-align: center;
    position: relative;

    p {
        margin: 0;
    }
`;

const TypewriterText = styled.span<{ isTyping: boolean }>`
    &::after {
        content: "|";
        opacity: ${({ isTyping }) => (isTyping ? 1 : 0)};
        animation: ${({ isTyping }) =>
            isTyping ? "blink 1s infinite" : "none"};
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

const FloatingHearts = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
`;

const FloatingHeart = styled(motion.div)`
    position: absolute;
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.5rem;
    opacity: 0.7;
`;

interface Message {
    id: number;
    seal: string;
    preview: string;
    content: string;
}

const messages: Message[] = [
    {
        id: 1,
        seal: "💕",
        preview: "Click to open",
        content:
            "My dearest love, every day with you is a new adventure. You make the ordinary feel extraordinary, and I'm so grateful to have you in my life. ❤️",
    },
    {
        id: 2,
        seal: "💖",
        preview: "Special surprise",
        content:
            "Remember our first date? I knew right then that you were special. Your eyes sparkled like stars, and I fell for you completely. ✨",
    },
    {
        id: 3,
        seal: "💝",
        preview: "Our future",
        content:
            "I dream of all the adventures we'll share, the places we'll see, and the memories we'll create together. You're my forever. 🌟",
    },
];

const MessagesSection: React.FC = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [openEnvelopes, setOpenEnvelopes] = useState<Set<number>>(new Set());
    const [typingEnvelopes, setTypingEnvelopes] = useState<Set<number>>(
        new Set()
    );

    const handleEnvelopeClick = (messageId: number) => {
        if (openEnvelopes.has(messageId)) {
            setOpenEnvelopes((prev) => {
                const newSet = new Set(prev);
                newSet.delete(messageId);
                return newSet;
            });
            setTypingEnvelopes((prev) => {
                const newSet = new Set(prev);
                newSet.delete(messageId);
                return newSet;
            });
        } else {
            setOpenEnvelopes((prev) => new Set(prev).add(messageId));
            setTypingEnvelopes((prev) => new Set(prev).add(messageId));

            // Stop typing animation after message is fully "typed"
            setTimeout(() => {
                setTypingEnvelopes((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(messageId);
                    return newSet;
                });
            }, 3000);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const envelopeVariants = {
        hidden: { opacity: 0, y: 50, rotateY: -15 },
        visible: {
            opacity: 1,
            y: 0,
            rotateY: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    return (
        <MessagesContainer ref={ref}>
            <Container>
                <SectionHeader>
                    <SectionTitle
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        Love Letters for You
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
                    <EnvelopesContainer>
                        {messages.map((message) => (
                            <EnvelopeWrapper
                                key={message.id}
                                variants={envelopeVariants}
                            >
                                <Envelope
                                    isOpen={openEnvelopes.has(message.id)}
                                    onClick={() =>
                                        handleEnvelopeClick(message.id)
                                    }
                                    whileHover={{ scale: 1.05, rotateZ: 2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <EnvelopeFront>
                                        <HeartSeal
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                rotate: [0, 10, -10, 0],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        >
                                            {message.seal}
                                        </HeartSeal>
                                        <EnvelopeText>
                                            {message.preview}
                                        </EnvelopeText>
                                    </EnvelopeFront>

                                    <EnvelopeBack>
                                        <MessageContent>
                                            <MessageText
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{
                                                    duration: 0.5,
                                                    delay: 0.3,
                                                }}
                                            >
                                                <p>
                                                    <TypewriterText
                                                        isTyping={typingEnvelopes.has(
                                                            message.id
                                                        )}
                                                    >
                                                        {message.content}
                                                    </TypewriterText>
                                                </p>
                                            </MessageText>
                                        </MessageContent>
                                    </EnvelopeBack>
                                </Envelope>

                                <AnimatePresence>
                                    {openEnvelopes.has(message.id) && (
                                        <FloatingHearts>
                                            {[...Array(5)].map((_, index) => (
                                                <FloatingHeart
                                                    key={index}
                                                    initial={{
                                                        opacity: 0,
                                                        y: 100,
                                                        x: Math.random() * 300,
                                                        scale: 0,
                                                    }}
                                                    animate={{
                                                        opacity: [0, 1, 0],
                                                        y: -100,
                                                        scale: [0, 1, 0.5],
                                                        rotate: [0, 360],
                                                    }}
                                                    transition={{
                                                        duration: 3,
                                                        delay: index * 0.2,
                                                        ease: "easeOut",
                                                    }}
                                                >
                                                    ❤️
                                                </FloatingHeart>
                                            ))}
                                        </FloatingHearts>
                                    )}
                                </AnimatePresence>
                            </EnvelopeWrapper>
                        ))}
                    </EnvelopesContainer>
                </motion.div>
            </Container>
        </MessagesContainer>
    );
};

export default MessagesSection;
