import React from "react";
import styled from "styled-components";

const SpaceBackgroundContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    pointer-events: none;
    overflow: hidden;
    background: radial-gradient(
        ellipse at top,
        rgba(26, 32, 44, 0.9) 0%,
        rgba(17, 24, 39, 0.95) 50%,
        rgba(0, 0, 0, 1) 100%
    );

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(
                circle at 20% 80%,
                rgba(147, 51, 234, 0.15) 0%,
                transparent 50%
            ),
            radial-gradient(
                circle at 80% 20%,
                rgba(59, 130, 246, 0.15) 0%,
                transparent 50%
            ),
            radial-gradient(
                circle at 40% 40%,
                rgba(16, 185, 129, 0.1) 0%,
                transparent 50%
            );
        animation: backgroundShift 20s ease-in-out infinite alternate;
        will-change: transform, opacity;
        transform: translate3d(0, 0, 0);
    }

    @keyframes backgroundShift {
        0% {
            transform: scale(1) rotate(0deg);
            opacity: 0.8;
        }
        50% {
            transform: scale(1.02) rotate(0.1deg); /* Reduced scale and rotation */
            opacity: 0.85;
        }
        100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.8;
        }
    }
`;

const Starfield = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background: transparent;
    pointer-events: none;

    &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: radial-gradient(1px 1px at 10% 20%, #ffffff, transparent),
            radial-gradient(1px 1px at 20% 40%, #ffffff, transparent),
            radial-gradient(2px 2px at 30% 60%, #ffffff, transparent),
            radial-gradient(1px 1px at 40% 80%, #ffffff, transparent),
            radial-gradient(1px 1px at 50% 10%, #ffffff, transparent),
            radial-gradient(2px 2px at 60% 30%, #ffffff, transparent),
            radial-gradient(1px 1px at 70% 50%, #ffffff, transparent),
            radial-gradient(1px 1px at 80% 70%, #ffffff, transparent),
            radial-gradient(2px 2px at 90% 90%, #ffffff, transparent),
            radial-gradient(1px 1px at 15% 85%, #ffffff, transparent),
            radial-gradient(1px 1px at 25% 5%, #ffffff, transparent),
            radial-gradient(2px 2px at 35% 25%, #ffffff, transparent),
            radial-gradient(1px 1px at 45% 45%, #ffffff, transparent),
            radial-gradient(1px 1px at 55% 65%, #ffffff, transparent),
            radial-gradient(2px 2px at 65% 85%, #ffffff, transparent),
            radial-gradient(1px 1px at 75% 15%, #ffffff, transparent),
            radial-gradient(1px 1px at 85% 35%, #ffffff, transparent),
            radial-gradient(2px 2px at 95% 55%, #ffffff, transparent),
            radial-gradient(1px 1px at 5% 75%, #ffffff, transparent),
            radial-gradient(1px 1px at 35% 95%, #ffffff, transparent);
        background-repeat: repeat;
        background-size: 400px 300px;
        animation: twinkleField 8s ease-in-out infinite alternate; /* Reduced frequency */
        opacity: 0.9;
        will-change: transform, opacity;
        transform: translate3d(0, 0, 0);
    }

    @keyframes twinkleField {
        0% {
            opacity: 0.6;
            transform: scale(1);
        }
        50% {
            opacity: 1;
            transform: scale(1.02);
        }
        100% {
            opacity: 0.8;
            transform: scale(1);
        }
    }
`;

const TwinklingStars = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;

    &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: radial-gradient(
                circle at 10% 30%,
                rgba(255, 255, 255, 0.9) 1px,
                transparent 2px
            ),
            radial-gradient(
                circle at 25% 70%,
                rgba(255, 255, 255, 0.7) 1px,
                transparent 2px
            ),
            radial-gradient(
                circle at 40% 15%,
                rgba(255, 255, 255, 0.8) 1px,
                transparent 2px
            ),
            radial-gradient(
                circle at 55% 85%,
                rgba(255, 255, 255, 0.6) 1px,
                transparent 2px
            ),
            radial-gradient(
                circle at 70% 40%,
                rgba(255, 255, 255, 0.9) 1px,
                transparent 2px
            ),
            radial-gradient(
                circle at 85% 60%,
                rgba(255, 255, 255, 0.7) 1px,
                transparent 2px
            ),
            radial-gradient(
                circle at 15% 90%,
                rgba(255, 255, 255, 0.8) 1px,
                transparent 2px
            ),
            radial-gradient(
                circle at 30% 10%,
                rgba(255, 255, 255, 0.6) 1px,
                transparent 2px
            ),
            radial-gradient(
                circle at 45% 50%,
                rgba(255, 255, 255, 0.9) 1px,
                transparent 2px
            ),
            radial-gradient(
                circle at 60% 20%,
                rgba(255, 255, 255, 0.7) 1px,
                transparent 2px
            ),
            radial-gradient(
                circle at 75% 80%,
                rgba(255, 255, 255, 0.8) 1px,
                transparent 2px
            ),
            radial-gradient(
                circle at 90% 35%,
                rgba(255, 255, 255, 0.6) 1px,
                transparent 2px
            ),
            radial-gradient(
                circle at 5% 65%,
                rgba(255, 255, 255, 0.9) 1px,
                transparent 2px
            ),
            radial-gradient(
                circle at 35% 95%,
                rgba(255, 255, 255, 0.7) 1px,
                transparent 2px
            ),
            radial-gradient(
                circle at 50% 5%,
                rgba(255, 255, 255, 0.8) 1px,
                transparent 2px
            );
        background-size: 500px 400px;
        animation: twinkleStars 6s ease-in-out infinite alternate; /* Reduced frequency */
        will-change: transform, opacity;
        transform: translate3d(0, 0, 0);
    }

    &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: radial-gradient(
                circle at 20% 25%,
                rgba(255, 255, 255, 0.8) 1px,
                transparent 2px
            ),
            radial-gradient(
                circle at 35% 75%,
                rgba(255, 255, 255, 0.6) 1px,
                transparent 2px
            ),
            radial-gradient(
                circle at 50% 35%,
                rgba(255, 255, 255, 0.9) 1px,
                transparent 2px
            ),
            radial-gradient(
                circle at 65% 65%,
                rgba(255, 255, 255, 0.7) 1px,
                transparent 2px
            ),
            radial-gradient(
                circle at 80% 15%,
                rgba(255, 255, 255, 0.8) 1px,
                transparent 2px
            ),
            radial-gradient(
                circle at 95% 85%,
                rgba(255, 255, 255, 0.6) 1px,
                transparent 2px
            ),
            radial-gradient(
                circle at 12% 55%,
                rgba(255, 255, 255, 0.9) 1px,
                transparent 2px
            ),
            radial-gradient(
                circle at 28% 45%,
                rgba(255, 255, 255, 0.7) 1px,
                transparent 2px
            ),
            radial-gradient(
                circle at 42% 95%,
                rgba(255, 255, 255, 0.8) 1px,
                transparent 2px
            ),
            radial-gradient(
                circle at 58% 5%,
                rgba(255, 255, 255, 0.6) 1px,
                transparent 2px
            ),
            radial-gradient(
                circle at 72% 75%,
                rgba(255, 255, 255, 0.9) 1px,
                transparent 2px
            ),
            radial-gradient(
                circle at 88% 25%,
                rgba(255, 255, 255, 0.7) 1px,
                transparent 2px
            );
        background-size: 600px 500px;
        animation: twinkleStars2 8s ease-in-out infinite alternate-reverse; /* Reduced frequency */
        will-change: transform, opacity;
        transform: translate3d(0, 0, 0);
    }

    @keyframes twinkleStars {
        0% {
            opacity: 0.4;
            transform: scale(0.98);
        }
        50% {
            opacity: 1;
            transform: scale(1.02);
        }
        100% {
            opacity: 0.7;
            transform: scale(1);
        }
    }

    @keyframes twinkleStars2 {
        0% {
            opacity: 0.3;
            transform: scale(1.01);
        }
        50% {
            opacity: 0.9;
            transform: scale(0.99);
        }
        100% {
            opacity: 0.6;
            transform: scale(1);
        }
    }
`;

const SpaceBackground: React.FC = React.memo(() => {
    return (
        <SpaceBackgroundContainer>
            <Starfield />
            <TwinklingStars />
        </SpaceBackgroundContainer>
    );
});

export default SpaceBackground;
