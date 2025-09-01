import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const SocialContainer = styled.section`
    padding: ${({ theme }) => theme.spacing.xxl} 0;
    background: ${({ theme }) => theme.colors.gradients.dreamy};
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

const SocialContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 600px;
    margin: 0 auto;
`;

const SocialLinks = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
`;

const SocialLink = styled(motion.a)`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing.lg};
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;
    transition: all 0.3s ease;
    border: 2px solid transparent;

    &:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: ${({ theme }) => theme.colors.white};
        transform: translateX(10px);
    }
`;

const SocialIcon = styled.div`
    width: 50px;
    height: 50px;
    background: ${({ theme }) => theme.colors.gradients.primary};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.white};
    transition: all 0.3s ease;

    ${SocialLink}:hover & {
        transform: scale(1.1) rotate(5deg);
    }
`;

const SocialSection: React.FC = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    return (
        <SocialContainer ref={ref}>
            <Container>
                <SectionHeader>
                    <SectionTitle
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        Stay Connected
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
                    <SocialContent>
                        <motion.div variants={itemVariants}>
                            <SocialLinks>
                                <SocialLink
                                    href="#"
                                    whileHover={{ x: 10 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <SocialIcon>
                                        <i className="fab fa-instagram"></i>
                                    </SocialIcon>
                                    <span>Follow Our Journey</span>
                                </SocialLink>

                                <SocialLink
                                    href="#"
                                    whileHover={{ x: 10 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <SocialIcon>
                                        <i className="fab fa-whatsapp"></i>
                                    </SocialIcon>
                                    <span>Message Me</span>
                                </SocialLink>

                                <SocialLink
                                    href="#"
                                    whileHover={{ x: 10 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <SocialIcon>
                                        <i className="fas fa-envelope"></i>
                                    </SocialIcon>
                                    <span>Send Love Letter</span>
                                </SocialLink>
                            </SocialLinks>
                        </motion.div>
                    </SocialContent>
                </motion.div>
            </Container>
        </SocialContainer>
    );
};

export default SocialSection;
