import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const GalaxyPageContainer = styled(motion.div)<{ $isVisible: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
    display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
    align-items: center;
    justify-content: center;
    z-index: 1001;
    overflow: hidden;
`;

const GalaxyContent = styled(motion.div)`
    text-align: center;
    color: white;
    position: relative;
    z-index: 2;
`;

const GalaxyTitle = styled(motion.h1)`
    font-size: clamp(2rem, 8vw, 4rem);
    font-family: ${({ theme }) => theme.fonts.heading};
    background: linear-gradient(45deg, #ff6b9d, #a18cd1, #4fd1c7, #ffd93d);
    background-size: 400% 400%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: galaxyGradient 3s ease-in-out infinite;
    margin-bottom: 2rem;

    @keyframes galaxyGradient {
        0%,
        100% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
    }
`;

const GalaxyMessage = styled(motion.p)`
    font-size: 1.5rem;
    margin-bottom: 3rem;
    opacity: 0.9;
    max-width: 600px;
    line-height: 1.6;
`;

const StarField = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(2px 2px at 20px 30px, #eee, transparent),
        radial-gradient(
            2px 2px at 40px 70px,
            rgba(255, 255, 255, 0.8),
            transparent
        ),
        radial-gradient(1px 1px at 90px 40px, #fff, transparent),
        radial-gradient(
            1px 1px at 130px 80px,
            rgba(255, 255, 255, 0.6),
            transparent
        ),
        radial-gradient(2px 2px at 160px 30px, #ddd, transparent),
        radial-gradient(1px 1px at 300px 200px, #fff, transparent),
        radial-gradient(
            2px 2px at 350px 120px,
            rgba(255, 255, 255, 0.7),
            transparent
        );
    background-repeat: repeat;
    background-size: 400px 300px;
    animation: sparkle 25s linear infinite;

    @keyframes sparkle {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(-400px);
        }
    }
`;

const SolarSystem = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
`;

const Planet = styled(motion.div)<{
    size: number;
    color: string;
    distance: number;
}>`
    position: absolute;
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    border-radius: 50%;
    background: ${({ color }) => color};
    box-shadow: inset -10px -10px 20px rgba(0, 0, 0, 0.3),
        0 0 20px rgba(255, 255, 255, 0.1), 0 0 40px ${({ color }) => color}40;
    top: 50%;
    left: 50%;
    transform-origin: ${({ distance }) => distance}px 0;
`;

const Earth = styled(Planet)`
    background: linear-gradient(135deg, #4a90e2 0%, #7ed321 30%, #4a90e2 70%);
    animation: earthRotation 20s linear infinite;

    @keyframes earthRotation {
        from {
            transform: translate(-50%, -50%) rotate(0deg) translateX(250px)
                rotate(0deg);
        }
        to {
            transform: translate(-50%, -50%) rotate(360deg) translateX(250px)
                rotate(-360deg);
        }
    }
`;

const Mars = styled(Planet)`
    background: linear-gradient(135deg, #cd5c5c 0%, #ff6347 50%, #dc143c 100%);
    animation: marsRotation 35s linear infinite;

    @keyframes marsRotation {
        from {
            transform: translate(-50%, -50%) rotate(0deg) translateX(350px)
                rotate(0deg);
        }
        to {
            transform: translate(-50%, -50%) rotate(360deg) translateX(350px)
                rotate(-360deg);
        }
    }
`;

const Venus = styled(Planet)`
    background: linear-gradient(135deg, #ffc649 0%, #ff9500 100%);
    animation: venusRotation 15s linear infinite;

    @keyframes venusRotation {
        from {
            transform: translate(-50%, -50%) rotate(0deg) translateX(180px)
                rotate(0deg);
        }
        to {
            transform: translate(-50%, -50%) rotate(360deg) translateX(180px)
                rotate(-360deg);
        }
    }
`;

const Jupiter = styled(Planet)`
    background: linear-gradient(
        135deg,
        #d2691e 0%,
        #cd853f 30%,
        #daa520 70%,
        #b8860b 100%
    );
    animation: jupiterRotation 60s linear infinite;

    @keyframes jupiterRotation {
        from {
            transform: translate(-50%, -50%) rotate(0deg) translateX(450px)
                rotate(0deg);
        }
        to {
            transform: translate(-50%, -50%) rotate(360deg) translateX(450px)
                rotate(-360deg);
        }
    }
`;

const Sun = styled(motion.div)`
    position: absolute;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: radial-gradient(circle, #ffeb3b 0%, #ff9800 50%, #ff5722 100%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 40px #ffeb3b, 0 0 80px #ff9800, 0 0 120px #ff5722;
    animation: sunPulse 3s ease-in-out infinite;

    @keyframes sunPulse {
        0%,
        100% {
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 0 0 40px #ffeb3b, 0 0 80px #ff9800, 0 0 120px #ff5722;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.1);
            box-shadow: 0 0 50px #ffeb3b, 0 0 100px #ff9800, 0 0 150px #ff5722;
        }
    }
`;

const Meteor = styled(motion.div)<{ delay: number }>`
    position: absolute;
    width: 3px;
    height: 3px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 0 6px #fff, 0 0 12px #fff, 0 0 18px #fff;
    animation: meteorShower ${({ delay }) => 3 + delay}s linear infinite;

    @keyframes meteorShower {
        0% {
            top: -10px;
            left: ${({ delay }) => 10 + delay * 20}%;
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            top: 110vh;
            left: ${({ delay }) => 30 + delay * 20}%;
            opacity: 0;
        }
    }
`;

const Nebula = styled(motion.div)`
    position: absolute;
    width: 300px;
    height: 200px;
    background: radial-gradient(
        ellipse,
        rgba(255, 107, 157, 0.3) 0%,
        rgba(161, 140, 209, 0.2) 30%,
        rgba(79, 209, 199, 0.1) 60%,
        transparent 100%
    );
    border-radius: 50%;
    top: 20%;
    right: 10%;
    animation: nebulaFloat 20s ease-in-out infinite;

    @keyframes nebulaFloat {
        0%,
        100% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
        }
        50% {
            transform: translateY(-20px) scale(1.1);
            opacity: 0.8;
        }
    }
`;

const BackToHomeButton = styled(motion.button)`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 50px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 600;
    font-family: ${({ theme }) => theme.fonts.heading};
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
    }
`;

// Journey Popup Components
const JourneyPopup = styled(motion.div)<{ $isVisible: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
    align-items: center;
    justify-content: center;
    z-index: 1002;
`;

const PopupContent = styled(motion.div)`
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
    padding: 3rem;
    border-radius: 20px;
    text-align: center;
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    max-width: 500px;
    width: 90%;
`;

const PopupTitle = styled.h2`
    font-size: 2.5rem;
    color: #fff;
    margin-bottom: 1.5rem;
    font-family: ${({ theme }) => theme.fonts.heading};
    background: linear-gradient(45deg, #ff6b9d, #a18cd1, #4fd1c7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const PopupMessage = styled.p`
    font-size: 1.3rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 2.5rem;
    line-height: 1.6;
`;

const PopupButtons = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
`;

const PopupButton = styled(motion.button)<{ $isPrimary?: boolean }>`
    padding: 1rem 2rem;
    border: none;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    font-family: ${({ theme }) => theme.fonts.heading};
    transition: all 0.3s ease;

    ${({ $isPrimary }) =>
        $isPrimary
            ? `
        background: linear-gradient(135deg, #ff6b9d 0%, #a18cd1 100%);
        color: white;
        box-shadow: 0 10px 30px rgba(255, 107, 157, 0.3);

        &:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(255, 107, 157, 0.4);
        }
    `
            : `
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 2px solid rgba(255, 255, 255, 0.3);

        &:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
        }
    `}
`;

// Rocket Animation Components
const RocketContainer = styled(motion.div)<{ $isVisible: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #000000 0%, #1a1a2e 50%, #4a90e2 100%);
    display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
    z-index: 1003;
    overflow: hidden;
`;

const EarthBackground = styled(motion.div)`
    position: absolute;
    bottom: -50%;
    left: 50%;
    transform: translateX(-50%);
    width: 150vw;
    height: 150vw;
    max-width: 1500px;
    max-height: 1500px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4a90e2 0%, #7ed321 30%, #4a90e2 70%);
    box-shadow: inset -50px -50px 100px rgba(0, 0, 0, 0.3),
        0 0 100px rgba(79, 209, 199, 0.3);
`;

const Rocket = styled(motion.div)`
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 120px;
    z-index: 10;
`;

const RocketBody = styled.div`
    width: 40px;
    height: 80px;
    background: linear-gradient(180deg, #e74c3c 0%, #c0392b 50%, #a93226 100%);
    border-radius: 20px 20px 5px 5px;
    position: relative;
    margin: 0 auto;
    box-shadow: inset -5px 0 10px rgba(0, 0, 0, 0.3),
        0 0 20px rgba(231, 76, 60, 0.4);

    &::before {
        content: "";
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.8);
        box-shadow: inset -3px -3px 6px rgba(0, 0, 0, 0.2);
    }
`;

const RocketFins = styled.div`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    &::before,
    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        width: 15px;
        height: 30px;
        background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
        clip-path: polygon(0% 100%, 100% 100%, 50% 0%);
    }

    &::before {
        left: -25px;
    }

    &::after {
        right: -25px;
    }
`;

const RocketFlame = styled(motion.div)`
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 40px;
    background: linear-gradient(
        180deg,
        #ff6b35 0%,
        #f7931e 30%,
        #ffde59 60%,
        #ff4757 100%
    );
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    filter: blur(1px);
    animation: flameFlicker 0.1s ease-in-out infinite alternate;

    @keyframes flameFlicker {
        0% {
            transform: translateX(-50%) scaleY(1) scaleX(1);
        }
        100% {
            transform: translateX(-50%) scaleY(1.1) scaleX(0.9);
        }
    }
`;

const SpaceTransition = styled(motion.div)<{ $isVisible: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
            circle at 20% 80%,
            rgba(120, 119, 198, 0.3) 0%,
            transparent 50%
        ),
        radial-gradient(
            circle at 80% 20%,
            rgba(255, 119, 198, 0.2) 0%,
            transparent 50%
        ),
        radial-gradient(
            circle at 40% 40%,
            rgba(200, 200, 255, 0.1) 0%,
            transparent 50%
        ),
        radial-gradient(
            ellipse at center,
            #000814 0%,
            #001d3d 50%,
            #003566 100%
        );
    display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
    z-index: 1004;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: radial-gradient(
                1px 1px at 20px 30px,
                #eee,
                transparent
            ),
            radial-gradient(
                1px 1px at 40px 70px,
                rgba(255, 255, 255, 0.8),
                transparent
            ),
            radial-gradient(1px 1px at 90px 40px, #fff, transparent),
            radial-gradient(
                1px 1px at 130px 80px,
                rgba(255, 255, 255, 0.6),
                transparent
            ),
            radial-gradient(1px 1px at 160px 30px, #ddd, transparent),
            radial-gradient(1px 1px at 300px 200px, #fff, transparent),
            radial-gradient(
                1px 1px at 350px 120px,
                rgba(255, 255, 255, 0.7),
                transparent
            );
        background-repeat: repeat;
        background-size: 500px 400px;
        animation: starTwinkle 30s linear infinite;
    }

    @keyframes starTwinkle {
        from {
            transform: translateX(0) translateY(0);
            opacity: 0.8;
        }
        to {
            transform: translateX(-500px) translateY(-200px);
            opacity: 1;
        }
    }
`;

interface GalaxyPageProps {
    isVisible?: boolean;
    onClose?: () => void;
}

const GalaxyPage: React.FC<GalaxyPageProps> = ({
    isVisible = true,
    onClose,
}) => {
    const navigate = useNavigate();
    const [showJourneyPopup, setShowJourneyPopup] = React.useState(false);
    const [showRocketAnimation, setShowRocketAnimation] = React.useState(false);
    const [rocketLaunched, setRocketLaunched] = React.useState(false); // Show journey popup after a delay when page is visible
    React.useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                setShowJourneyPopup(true);
            }, 4000); // Show popup after 4 seconds to let user enjoy the space view
            return () => clearTimeout(timer);
        } else {
            // Reset states when page becomes invisible
            setShowJourneyPopup(false);
            setShowRocketAnimation(false);
            setRocketLaunched(false);
        }
    }, [isVisible]);

    const handleStartJourney = () => {
        setShowJourneyPopup(false);
        setShowRocketAnimation(true);

        // Launch rocket after Earth appears and user can see it
        setTimeout(() => {
            setRocketLaunched(true);
        }, 2500); // Complete animation and return to space view
        setTimeout(() => {
            setShowRocketAnimation(false);
            setRocketLaunched(false);
        }, 10000); // Extended to 10 seconds for smoother transition
    };

    const handleMaybeLater = () => {
        setShowJourneyPopup(false);
    };
    return (
        <GalaxyPageContainer $isVisible={isVisible}>
            <StarField />
            <Nebula
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.6, scale: 1 }}
                transition={{ duration: 2, delay: 1 }}
            />
            <SolarSystem>
                <Sun
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                />
                <Venus
                    size={25}
                    color="#ffc649"
                    distance={180}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                />
                <Earth
                    size={35}
                    color="#4a90e2"
                    distance={250}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                />
                <Mars
                    size={28}
                    color="#cd5c5c"
                    distance={350}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.4 }}
                />
                <Jupiter
                    size={60}
                    color="#d2691e"
                    distance={450}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.6 }}
                />
                {/* Meteors */}
                {[...Array(5)].map((_, i) => (
                    <Meteor
                        key={i}
                        delay={i * 0.5}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 2 + i * 0.3 }}
                    />
                ))}
            </SolarSystem>
            <GalaxyContent
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            >
                <GalaxyTitle
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    Congratulations! 🌟
                </GalaxyTitle>
                <GalaxyMessage
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                >
                    You've solved the love riddle! Your wisdom shines as bright
                    as the stars in this cosmic celebration. 💫
                </GalaxyMessage>
                <BackToHomeButton
                    onClick={onClose || (() => navigate("/"))}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2.5, duration: 1 }}
                >
                    ✨ Back to Earth
                </BackToHomeButton>
            </GalaxyContent>{" "}
            {/* Journey Popup */}
            <JourneyPopup $isVisible={showJourneyPopup}>
                <PopupContent
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <PopupTitle>Embark on a Journey! 🚀</PopupTitle>
                    <PopupMessage>
                        Ready to explore the universe? Join us on an epic
                        journey through the stars and discover the wonders of
                        the cosmos. Let's launch into space together!
                    </PopupMessage>
                    <PopupButtons>
                        <PopupButton
                            $isPrimary
                            onClick={handleStartJourney}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            🚀 Start Adventure
                        </PopupButton>
                        <PopupButton
                            onClick={handleMaybeLater}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Maybe Later
                        </PopupButton>
                    </PopupButtons>
                </PopupContent>
            </JourneyPopup>{" "}
            {/* Rocket Animation */}
            <RocketContainer
                $isVisible={showRocketAnimation}
                initial={{ opacity: 1 }}
                animate={{
                    opacity:
                        showRocketAnimation && !rocketLaunched
                            ? 1
                            : showRocketAnimation && rocketLaunched
                            ? 0.5
                            : 0,
                }}
                transition={{ duration: 2, delay: rocketLaunched ? 3 : 0 }}
            >
                <EarthBackground
                    initial={{ scale: 1.2, y: 0 }}
                    animate={{
                        scale: 1,
                        y: rocketLaunched ? "50%" : 0,
                    }}
                    transition={{
                        duration: rocketLaunched ? 5 : 1.5,
                        ease: "easeOut",
                    }}
                />
                <Rocket
                    initial={{ y: "100%", opacity: 0, scale: 1 }}
                    animate={
                        rocketLaunched
                            ? {
                                  y: "-300%",
                                  opacity: [1, 1, 0.8, 0],
                                  scale: [1, 0.8, 0.5, 0.2],
                                  rotateZ: [0, -5, 5, -2, 0],
                              }
                            : { y: "40%", opacity: 1, scale: 1 }
                    }
                    transition={
                        rocketLaunched
                            ? {
                                  duration: 5,
                                  ease: [0.23, 1, 0.32, 1],
                                  times: [0, 0.3, 0.7, 1],
                              }
                            : { duration: 1.5, ease: "easeOut" }
                    }
                >
                    <RocketBody />
                    <RocketFins />
                    <RocketFlame
                        animate={{
                            opacity: rocketLaunched ? [1, 1, 1, 0] : [0, 1, 0],
                            y: rocketLaunched
                                ? [0, -20, -30, -50]
                                : [0, -15, 0],
                            scaleY: rocketLaunched
                                ? [1, 2.5, 4, 6]
                                : [1, 1.2, 1],
                            scaleX: rocketLaunched
                                ? [1, 1.2, 1.5, 2]
                                : [1, 0.9, 1],
                        }}
                        transition={{
                            duration: rocketLaunched ? 5 : 0.6,
                            ease: rocketLaunched ? "easeOut" : "easeInOut",
                            repeat: rocketLaunched ? 0 : Infinity,
                            repeatType: "reverse",
                        }}
                    />
                </Rocket>

                {/* Launch effects */}
                {rocketLaunched && (
                    <>
                        {/* Speed lines effect */}
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={`speed-line-${i}`}
                                style={{
                                    position: "absolute",
                                    left: `${20 + i * 10}%`,
                                    top: "20%",
                                    width: "2px",
                                    height: "200px",
                                    background: "rgba(255, 255, 255, 0.6)",
                                    borderRadius: "1px",
                                }}
                                initial={{ opacity: 0, scaleY: 0 }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scaleY: [0, 1, 2],
                                    y: [0, -100, -300],
                                }}
                                transition={{
                                    duration: 3,
                                    delay: 1 + i * 0.1,
                                    ease: "easeOut",
                                }}
                            />
                        ))}
                    </>
                )}
            </RocketContainer>{" "}
            {/* Space Transition */}
            <SpaceTransition
                $isVisible={showRocketAnimation && rocketLaunched}
                initial={{ opacity: 0, scale: 1.5 }}
                animate={{
                    opacity: showRocketAnimation && rocketLaunched ? 1 : 0,
                    scale: showRocketAnimation && rocketLaunched ? 1 : 1.5,
                }}
                transition={{
                    duration: 3,
                    delay: 2.5,
                    ease: [0.23, 1, 0.32, 1], // Custom easing for smooth effect
                }}
            >
                {/* Floating particles for extra space effect */}
                {rocketLaunched &&
                    [...Array(12)].map((_, i) => (
                        <motion.div
                            key={`space-particle-${i}`}
                            style={{
                                position: "absolute",
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                width: `${2 + Math.random() * 4}px`,
                                height: `${2 + Math.random() * 4}px`,
                                borderRadius: "50%",
                                background: `rgba(${
                                    100 + Math.random() * 155
                                }, ${100 + Math.random() * 155}, 255, 0.8)`,
                                boxShadow: `0 0 ${
                                    5 + Math.random() * 10
                                }px rgba(255, 255, 255, 0.5)`,
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 1, 1.5],
                                y: [0, -50 - Math.random() * 100],
                                x: [0, (Math.random() - 0.5) * 100],
                            }}
                            transition={{
                                duration: 4 + Math.random() * 2,
                                delay: 3 + i * 0.2,
                                ease: "easeOut",
                            }}
                        />
                    ))}
            </SpaceTransition>
        </GalaxyPageContainer>
    );
};

export default GalaxyPage;
