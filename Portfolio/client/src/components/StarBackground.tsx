import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  blinkSpeed: number;
  blinkDirection: 1 | -1;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  lifetime: number;
  currentLife: number;
}

interface StarBackgroundProps {
  count?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  color?: string;
  showShootingStars?: boolean;
}

const StarBackground: React.FC<StarBackgroundProps> = ({
  count = 100,
  minSize = 1,
  maxSize = 3,
  speed = 1,
  color = 'white',
  showShootingStars = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const lastShootingStarTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Generate stars
    starsRef.current = Array.from({ length: count }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: minSize + Math.random() * (maxSize - minSize),
      opacity: 0.2 + Math.random() * 0.8,
      blinkSpeed: 0.001 + Math.random() * 0.005 * speed,
      blinkDirection: Math.random() > 0.5 ? 1 : -1,
    }));

    // Initialize shooting stars array
    shootingStarsRef.current = [];

    // Function to create a new shooting star
    const createShootingStar = () => {
      const shootingStar: ShootingStar = {
        x: Math.random() * canvas.width * 0.8,
        y: Math.random() * canvas.height * 0.8,
        length: 50 + Math.random() * 70,
        speed: 5 + Math.random() * 15,
        lifetime: 50 + Math.random() * 50, // Frames alive
        currentLife: 0
      };
      shootingStarsRef.current.push(shootingStar);
    };

    // Animation loop
    let animationFrame: number;
    let frame = 0;
    
    const animate = (timestamp: number) => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw regular stars
      starsRef.current.forEach(star => {
        // Update star opacity (blinking effect)
        star.opacity += star.blinkSpeed * star.blinkDirection;
        
        // Reverse direction when reaching opacity limits
        if (star.opacity >= 1) {
          star.opacity = 1;
          star.blinkDirection = -1;
        } else if (star.opacity <= 0.2) {
          star.opacity = 0.2;
          star.blinkDirection = 1;
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      // Handle shooting stars
      if (showShootingStars) {
        // Occasionally create a new shooting star (roughly every 3-8 seconds)
        if (timestamp - lastShootingStarTimeRef.current > 3000 + Math.random() * 5000) {
          createShootingStar();
          lastShootingStarTimeRef.current = timestamp;
        }

        // Update and draw shooting stars
        shootingStarsRef.current = shootingStarsRef.current.filter(star => {
          star.currentLife++;
          
          // Remove if lifetime exceeded
          if (star.currentLife > star.lifetime) {
            return false;
          }

          // Calculate current opacity (fade in and out)
          const progress = star.currentLife / star.lifetime;
          const opacity = progress < 0.3 
            ? (progress / 0.3) 
            : progress > 0.7 
              ? (1 - (progress - 0.7) / 0.3) 
              : 1;

          // Draw shooting star (as a line with gradient)
          const angle = Math.PI / 4; // 45-degree angle
          const endX = star.x + Math.cos(angle) * star.length;
          const endY = star.y + Math.sin(angle) * star.length;
          
          // Create gradient for the trail
          const gradient = ctx.createLinearGradient(star.x, star.y, endX, endY);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.stroke();

          // Move the shooting star for next frame
          star.x += Math.cos(angle) * star.speed;
          star.y += Math.sin(angle) * star.speed;
          
          return true;
        });
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, [count, minSize, maxSize, speed, color, showShootingStars]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default StarBackground;