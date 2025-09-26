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
    background: radial-gradient(ellipse at bottom, #1c2837 0%, #050608 100%);
    background-attachment: fixed;
    display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
    align-items: center;
    justify-content: center;
    z-index: 1001;
    overflow: hidden;
    font: normal 1em/1.45em "Helvetica Neue", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #fff;
`;

const SolarSystem = styled.div`
    margin: 0 auto;
    width: 100%;
    height: 100%;
    position: relative;

    &::after {
        content: "";
        position: absolute;
        height: 2px;
        width: 2px;
        top: -2px;
        background: white;
        box-shadow: ${() => stars(500, 1800)};
        border-radius: 100px;
    }

    div {
        border-radius: 1000px;
        top: 50%;
        left: 50%;
        position: absolute;
        z-index: 999;

        &:not(.sun) {
            border: 1px solid rgba(102, 166, 229, 0.12);

            &:before {
                left: 50%;
                border-radius: 100px;
                content: "";
                position: absolute;
            }
        }

        &:not(.asteroids-belt) {
            &:before {
                box-shadow: inset 0 6px 0 -2px rgba(0, 0, 0, 0.25);
            }
        }
    }
`;

const Sun = styled.div`
    background: radial-gradient(
        ellipse at center,
        #ffd000 1%,
        #f9b700 39%,
        #f9b700 39%,
        #e06317 100%
    );
    height: 40px;
    width: 40px;
    margin-top: -20px;
    margin-left: -20px;
    background-clip: padding-box;
    border: 0 !important;
    background-position: -28px -103px;
    background-size: 175%;
    box-shadow: 0 0 10px 2px rgba(255, 107, 0, 0.4),
        0 0 22px 11px rgba(255, 203, 0, 0.13);
`;

const Mercury = styled.div`
    height: 70px;
    width: 70px;
    margin-top: -35px;
    margin-left: -35px;
    animation: orb ${(87.5 * 30) / 365.2563}s linear infinite;

    &:before {
        height: 4px;
        width: 4px;
        background: #9f5e26;
        margin-top: -2px;
        margin-left: -2px;
    }
`;

const Venus = styled.div`
    height: 100px;
    width: 100px;
    margin-top: -50px;
    margin-left: -50px;
    animation: orb ${(224.7 * 30) / 365.2563}s linear infinite;

    &:before {
        height: 8px;
        width: 8px;
        background: #beb768;
        margin-top: -4px;
        margin-left: -4px;
    }
`;

const Earth = styled.div`
    height: 145px;
    width: 145px;
    margin-top: -72.5px;
    margin-left: -72.5px;
    animation: orb ${(365.2563 * 30) / 365.2563}s linear infinite;

    &:before {
        height: 6px;
        width: 6px;
        background: #11abe9;
        margin-top: -3px;
        margin-left: -3px;
    }

    &:after {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 50%;
        top: 0px;
        margin-left: -9px;
        margin-top: -9px;
        border-radius: 100px;
        box-shadow: 0 -10px 0 -8px grey;
        animation: orb ${(27.3216 * 30) / 365.2563}s linear infinite;
    }
`;

const Mars = styled.div`
    height: 190px;
    width: 190px;
    margin-top: -95px;
    margin-left: -95px;
    animation: orb ${(687 * 30) / 365.2563}s linear infinite;

    &:before {
        height: 6px;
        width: 6px;
        background: #cf3921;
        margin-top: -3px;
        margin-left: -3px;
    }
`;

const Jupiter = styled.div`
    height: 340px;
    width: 340px;
    margin-top: -170px;
    margin-left: -170px;
    animation: orb ${(4331 * 30) / 365.2563}s linear infinite;

    &:before {
        height: 18px;
        width: 18px;
        background: #c76e2a;
        margin-top: -9px;
        margin-left: -9px;
    }
`;

const Saturn = styled.div`
    height: 440px;
    width: 440px;
    margin-top: -220px;
    margin-left: -220px;
    animation: orb ${(10747 * 30) / 365.2563}s linear infinite;

    &:before {
        height: 12px;
        width: 12px;
        background: #e7c194;
        margin-top: -6px;
        margin-left: -6px;
    }

    &:after {
        position: absolute;
        content: "";
        height: 2.34%;
        width: 4.676%;
        left: 50%;
        top: 0px;
        transform: rotateZ(-52deg);
        margin-left: -2.3%;
        margin-top: -1.2%;
        border-radius: 50% 50% 50% 50%;
        box-shadow: 0 1px 0 1px #987641, 3px 1px 0 #987641, -3px 1px 0 #987641;
        animation: orb ${(10747 * 30) / 365.2563}s linear infinite;
        animation-direction: reverse;
        transform-origin: 52% 60%;
    }
`;

const Uranus = styled.div`
    height: 520px;
    width: 520px;
    margin-top: -260px;
    margin-left: -260px;
    animation: orb ${(30589 * 30) / 365.2563}s linear infinite;

    &:before {
        height: 10px;
        width: 10px;
        background: #b5e3e3;
        margin-top: -5px;
        margin-left: -5px;
    }
`;

const Neptune = styled.div`
    height: 630px;
    width: 630px;
    margin-top: -315px;
    margin-left: -315px;
    animation: orb ${(59802 * 30) / 365.2563}s linear infinite;

    &:before {
        height: 10px;
        width: 10px;
        background: #175e9e;
        margin-top: -5px;
        margin-left: -5px;
    }
`;

const AsteroidsBelt = styled.div`
    opacity: 0.7;
    border-color: transparent !important;
    height: 300px;
    width: 300px;
    margin-top: -150px;
    margin-left: -150px;
    animation: orb ${(2191 * 30) / 365.2563}s linear infinite;
    overflow: hidden;

    &:before {
        top: 50%;
        height: 210px;
        width: 210px;
        margin-left: -105px;
        margin-top: -105px;
        background: transparent;
        border-radius: 140px !important;
        box-shadow: ${() => stars(390, 145, -145 / 2, -104)};
    }
`;

const BackToHomeButton = styled(motion.button)`
    position: absolute;
    top: 30px;
    right: 30px;
    background: linear-gradient(135deg, #42e1f5 0%, #06ca95 100%);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 50px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 600;
    font-family: ${({ theme }) => theme?.fonts?.heading || "Arial, sans-serif"};
    box-shadow: 0 10px 30px rgba(66, 225, 245, 0.4);
    transition: all 0.3s ease;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    z-index: 1000;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 40px rgba(66, 225, 245, 0.6);
        background: linear-gradient(135deg, #06ca95 0%, #42e1f5 100%);
    }
`;

const LoveMapButton = styled(motion.button)`
    position: absolute;
    top: 30px;
    left: 30px;
    background: linear-gradient(135deg, #ff6b9d 0%, #a18cd1 100%);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 50px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 600;
    font-family: ${({ theme }) => theme?.fonts?.heading || "Arial, sans-serif"};
    box-shadow: 0 10px 30px rgba(255, 107, 157, 0.4);
    transition: all 0.3s ease;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    z-index: 1000;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 40px rgba(255, 107, 157, 0.6);
        background: linear-gradient(135deg, #a18cd1 0%, #ff6b9d 100%);
    }
`;

interface GalaxyPageProps {
    isVisible?: boolean;
    onClose?: () => void;
}

// Helper functions for generating stars
function alphaRandom() {
    return Math.random() * 1000 * 0.001;
}

function stars(s: number, maxArea: number, minArea = 0, starSize = 0) {
    let stars = `${minArea + Math.random() * maxArea}px ${
        minArea + Math.random() * maxArea
    }px 0 ${starSize}px rgba(255, 255, 255, ${alphaRandom()})`;

    for (let i = 1; i < s; i++) {
        stars += `, ${minArea + Math.random() * maxArea}px ${
            minArea + Math.random() * maxArea
        }px 0 ${starSize}px rgba(255, 255, 255, ${alphaRandom()})`;
    }

    return stars;
}

const GalaxyPage: React.FC<GalaxyPageProps> = ({
    isVisible = true,
    onClose,
}) => {
    const navigate = useNavigate();

    return (
        <GalaxyPageContainer $isVisible={isVisible}>
            <SolarSystem>
                <Sun />
                <Mercury />
                <Venus />
                <Earth />
                <Mars />
                <AsteroidsBelt />
                <Jupiter />
                <Saturn />
                <Uranus />
                <Neptune />
                {/* <Pluto /> */}
            </SolarSystem>

            <LoveMapButton
                onClick={() => navigate("/lovemap")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
            >
                💕 Explore Love Map
            </LoveMapButton>

            <BackToHomeButton
                onClick={onClose || (() => window.history.back())}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
            >
                🌌 Return to Journey
            </BackToHomeButton>
        </GalaxyPageContainer>
    );
};
export default GalaxyPage;

// CSS for orbital animation
const style = document.createElement("style");
style.textContent = `
@keyframes orb {
    from {
        transform: rotate(0deg)
    }
    to {
        transform: rotate(-360deg)
    }
}`;
document.head.appendChild(style);
