import React, { useRef, useEffect } from "react";

const SpaceBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const STAR_COUNT = 800;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let stars: Star[] = [];
        let animationFrameId: number;

        class Star {
            x: number = 0;
            y: number = 0;
            radius: number = 0;
            twinkleSpeed: number = 0;
            twinkleOffset: number = 0;
            opacity: number = 0;

            constructor() {
                this.reset();
                this.twinkleOffset = Math.random() * Math.PI * 2;
            }

            reset() {
                if (!canvas) return;
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.radius = Math.random() * 1.5 + 0.5;
                this.twinkleSpeed = Math.random() * 0.005 + 0.002;
                this.opacity = Math.random();
            }

            update() {
                const sinValue = Math.sin(
                    performance.now() * this.twinkleSpeed + this.twinkleOffset
                );
                this.opacity = Math.max(0.4, 0.5 + sinValue * 0.5);
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.closePath();
            }
        }

        const initializeStars = () => {
            stars = [];
            for (let i = 0; i < STAR_COUNT; i++) {
                stars.push(new Star());
            }
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initializeStars();
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach((star) => {
                star.update();
                star.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        resizeCanvas();
        animate();
        window.addEventListener("resize", resizeCanvas);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return (
        <>
            <style>
                {`
                #space-container-react {
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
                }

                #space-container-react::before {
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
                        transform: scale(1.02) rotate(0.1deg);
                        opacity: 0.85;
                    }
                    100% {
                        transform: scale(1) rotate(0deg);
                        opacity: 0.8;
                    }
                }
                `}
            </style>

            <div id="space-container-react">
                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 0,
                        pointerEvents: "none",
                    }}
                />
            </div>
        </>
    );
};

export default SpaceBackground;
