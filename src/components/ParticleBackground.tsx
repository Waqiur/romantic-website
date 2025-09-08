import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const ParticleContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
`;

const Canvas = styled.canvas`
    width: 100%;
    height: 100%;
`;

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    color: string;
}

const ParticleBackground: React.FC = React.memo(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | undefined>(undefined);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Initialize particles - reduce count for better performance
        const initParticles = () => {
            const particles: Particle[] = [];
            const particleCount = Math.min(
                50, // Reduced from 100
                Math.floor((canvas.width * canvas.height) / 30000) // Increased divisor
            );

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 0.5, // Smaller particles
                    speedX: (Math.random() - 0.5) * 0.3, // Slower movement
                    speedY: (Math.random() - 0.5) * 0.3,
                    opacity: Math.random() * 0.3 + 0.1, // More transparent
                    color: Math.random() > 0.5 ? "#ff6b9d" : "#a18cd1",
                });
            }

            particlesRef.current = particles;
        };

        initParticles();

        // Throttled mouse move handler for better performance
        let mouseThrottleTimeout: NodeJS.Timeout;
        const handleMouseMove = (e: MouseEvent) => {
            if (mouseThrottleTimeout) return;

            mouseThrottleTimeout = setTimeout(() => {
                mouseRef.current = {
                    x: e.clientX,
                    y: e.clientY,
                };
                mouseThrottleTimeout = null as any;
            }, 16); // ~60fps throttling
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Optimized animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((particle, index) => {
                // Update position
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Simplified mouse interaction - only for nearby particles
                const dx = mouseRef.current.x - particle.x;
                const dy = mouseRef.current.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 80) {
                    // Reduced interaction radius
                    const force = (80 - distance) / 80;
                    particle.x -= dx * force * 0.005; // Reduced force
                    particle.y -= dy * force * 0.005;
                }

                // Boundary check
                if (particle.x < 0 || particle.x > canvas.width) {
                    particle.speedX *= -1;
                }
                if (particle.y < 0 || particle.y > canvas.height) {
                    particle.speedY *= -1;
                }

                // Keep particles in bounds
                particle.x = Math.max(0, Math.min(canvas.width, particle.x));
                particle.y = Math.max(0, Math.min(canvas.height, particle.y));

                // Draw particle
                ctx.save();
                ctx.globalAlpha = particle.opacity;
                ctx.fillStyle = particle.color;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

                // Remove connections for better performance - too expensive
                // Only draw connections for every 3rd particle to reduce calculations
                if (index % 3 === 0) {
                    particlesRef.current
                        .slice(index + 1)
                        .forEach((otherParticle) => {
                            const dx = particle.x - otherParticle.x;
                            const dy = particle.y - otherParticle.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);

                            if (distance < 60) {
                                // Reduced connection distance
                                ctx.save();
                                ctx.globalAlpha = ((60 - distance) / 60) * 0.1; // More transparent
                                ctx.strokeStyle = particle.color;
                                ctx.lineWidth = 0.3; // Thinner lines
                                ctx.beginPath();
                                ctx.moveTo(particle.x, particle.y);
                                ctx.lineTo(otherParticle.x, otherParticle.y);
                                ctx.stroke();
                                ctx.restore();
                            }
                        });
                }
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <ParticleContainer>
            <Canvas ref={canvasRef} />
        </ParticleContainer>
    );
});

export default ParticleBackground;
