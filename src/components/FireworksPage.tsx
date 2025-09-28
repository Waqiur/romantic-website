import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
`;

const BackButton = styled(motion.button)`
    position: fixed;
    top: 40px;
    left: 20px;
    background: rgba(255, 255, 255, 0.9);
    border: 2px solid rgba(255, 107, 157, 0.3);
    border-radius: 50px;
    padding: 12px 20px;
    cursor: pointer;
    color: #333;
    font-size: 1rem;
    font-weight: 600;
    z-index: 1001;
    transition: all 0.3s ease;

    /* Responsive design */
    @media (max-width: 768px) {
        top: 25px;
        left: 15px;
        padding: 10px 16px;
        font-size: 0.9rem;
    }

    @media (max-width: 480px) {
        top: 20px;
        left: 10px;
        padding: 8px 12px;
        font-size: 0.8rem;
    }

    &:hover {
        background: rgba(255, 107, 157, 0.8);
        border-color: rgba(255, 107, 157, 1);
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
    }
`;

const CanvasWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;

    canvas {
        position: absolute;
        top: 0;
        left: 0;
    }
`;

const FireworksPage: React.FC = () => {
    const navigate = useNavigate();
    const trailsCanvasRef = useRef<HTMLCanvasElement>(null);
    const mainCanvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!trailsCanvasRef.current || !mainCanvasRef.current) return;

        // Original fireworks engine implementation
        const trailsCanvas = trailsCanvasRef.current;
        const mainCanvas = mainCanvasRef.current;
        const trailsCtx = trailsCanvas.getContext("2d")!;
        const mainCtx = mainCanvas.getContext("2d")!;
        const dpr = window.devicePixelRatio || 1;

        // Fireworks constants and variables
        const MAX_WIDTH = 7680;
        const MAX_HEIGHT = 4320;
        const GRAVITY = 0.9;
        let simSpeed = 1;
        let stageW: number, stageH: number;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const quality = 2;
        let paused = false;
        let shellSize = 2;
        let scaleFactor = 1;

        const COLOR = {
            Red: "#ff0043",
            Green: "#14fc56",
            Blue: "#1e7fff",
            Purple: "#e60aff",
            Gold: "#ffbf36",
            White: "#ffffff",
        };

        const INVISIBLE = "_INVISIBLE_";
        const PI_2 = Math.PI * 2;
        const PI_HALF = Math.PI * 0.5;

        const COLOR_CODES = Object.values(COLOR);
        const COLOR_CODES_W_INVIS = [...COLOR_CODES, INVISIBLE];

        // Stage resize function
        const resize = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const containerW = Math.min(w, MAX_WIDTH);
            const containerH = w <= 420 ? h : Math.min(h, MAX_HEIGHT);

            trailsCanvas.width = containerW * dpr;
            trailsCanvas.height = containerH * dpr;
            trailsCanvas.style.width = containerW + "px";
            trailsCanvas.style.height = containerH + "px";

            mainCanvas.width = containerW * dpr;
            mainCanvas.height = containerH * dpr;
            mainCanvas.style.width = containerW + "px";
            mainCanvas.style.height = containerH + "px";

            trailsCtx.scale(dpr, dpr);
            mainCtx.scale(dpr, dpr);

            stageW = containerW / scaleFactor;
            stageH = containerH / scaleFactor;
        };

        resize();
        window.addEventListener("resize", resize);

        // Helper functions
        function randomColor(options?: {
            notSame?: boolean;
            notColor?: string;
            limitWhite?: boolean;
        }) {
            const { notSame, notColor, limitWhite } = options || {};
            let color =
                COLOR_CODES[Math.floor(Math.random() * COLOR_CODES.length)];

            if (limitWhite && color === COLOR.White && Math.random() < 0.6) {
                color =
                    COLOR_CODES[Math.floor(Math.random() * COLOR_CODES.length)];
            }

            if (notSame && color === lastColor) {
                while (color === lastColor) {
                    color =
                        COLOR_CODES[
                            Math.floor(Math.random() * COLOR_CODES.length)
                        ];
                }
            } else if (notColor && color === notColor) {
                while (color === notColor) {
                    color =
                        COLOR_CODES[
                            Math.floor(Math.random() * COLOR_CODES.length)
                        ];
                }
            }

            lastColor = color;
            return color;
        }

        let lastColor: string;

        function whiteOrGold() {
            return Math.random() < 0.5 ? COLOR.Gold : COLOR.White;
        }

        // Particle collections
        function createParticleCollection() {
            const collection: { [key: string]: any[] } = {};
            COLOR_CODES_W_INVIS.forEach((color) => {
                collection[color] = [];
            });
            return collection;
        }

        const stars = createParticleCollection();
        const sparks = createParticleCollection();
        const burstFlashes: any[] = [];
        const starsPool: any[] = [];
        const sparksPool: any[] = [];
        const burstFlashPool: any[] = [];

        // Star and Spark classes
        const Star = {
            drawWidth: 3,
            airDrag: 0.98,
            airDragHeavy: 0.992,
            active: stars,

            add(
                x: number,
                y: number,
                color: string,
                angle: number,
                speed: number,
                life: number,
                speedOffX = 0,
                speedOffY = 0
            ) {
                const instance = starsPool.pop() || {};

                instance.visible = true;
                instance.heavy = false;
                instance.x = x;
                instance.y = y;
                instance.prevX = x;
                instance.prevY = y;
                instance.color = color;
                instance.speedX = Math.sin(angle) * speed + speedOffX;
                instance.speedY = Math.cos(angle) * speed + speedOffY;
                instance.life = life;
                instance.fullLife = life;
                instance.textParticle = false;
                instance.staticTime = undefined;
                instance.noGravity = false;
                instance.updateFrame = 0;

                this.active[color].push(instance);
                return instance;
            },

            returnInstance(instance: any) {
                instance.onDeath && instance.onDeath(instance);
                instance.onDeath = null;
                instance.secondColor = null;
                instance.transitionTime = 0;
                instance.colorChanged = false;
                starsPool.push(instance);
            },
        };

        const Spark = {
            drawWidth: 1,
            airDrag: 0.9,
            active: sparks,

            add(
                x: number,
                y: number,
                color: string,
                angle: number,
                speed: number,
                life: number
            ) {
                const instance = sparksPool.pop() || {};

                instance.x = x;
                instance.y = y;
                instance.prevX = x;
                instance.prevY = y;
                instance.color = color;
                instance.speedX = Math.sin(angle) * speed;
                instance.speedY = Math.cos(angle) * speed;
                instance.life = life;
                instance.textParticle = false;
                instance.staticTime = undefined;
                instance.noGravity = false;

                this.active[color].push(instance);
                return instance;
            },

            returnInstance(instance: any) {
                sparksPool.push(instance);
            },
        };

        const BurstFlash = {
            add(x: number, y: number, radius: number) {
                const instance = burstFlashPool.pop() || {};
                instance.x = x;
                instance.y = y;
                instance.radius = radius;
                burstFlashes.push(instance);
                return instance;
            },

            returnInstance(instance: any) {
                burstFlashPool.push(instance);
            },
        };

        // Shell creation functions
        function createBurst(
            count: number,
            x: number,
            y: number,
            speed: number,
            color: string,
            life: number
        ) {
            const R = 0.5 * Math.sqrt(count / Math.PI);
            const C = 2 * R * Math.PI;
            const C_HALF = C / 2;

            for (let i = 0; i <= C_HALF; i++) {
                const ringAngle = (i / C_HALF) * PI_HALF;
                const ringSize = Math.cos(ringAngle);
                const partsPerFullRing = C * ringSize;
                const partsPerArc = partsPerFullRing * (PI_2 / PI_2);

                const angleInc = PI_2 / partsPerFullRing;
                const angleOffset = Math.random() * angleInc;

                for (let j = 0; j < partsPerArc; j++) {
                    const angle =
                        angleInc * j +
                        angleOffset +
                        Math.random() * angleInc * 0.33;
                    Star.add(
                        x,
                        y,
                        color,
                        angle,
                        speed * ringSize,
                        life + Math.random() * life * 0.125
                    );
                }
            }
        }

        function crysanthemumShell(size = 1) {
            const glitter = Math.random() < 0.25;
            const singleColor = Math.random() < 0.72;
            const color = singleColor
                ? randomColor({ limitWhite: true })
                : [randomColor(), randomColor({ notSame: true })];

            return {
                shellSize: size,
                spreadSize: 300 + size * 100,
                starLife: 900 + size * 200,
                starDensity: glitter ? 1.1 : 1.25,
                color,
                glitter: glitter ? "light" : "",
                glitterColor: whiteOrGold(),
            };
        }

        class Shell {
            public shellSize!: number;
            public spreadSize!: number;
            public starLife!: number;
            public starDensity!: number;
            public color: any;
            public glitter!: string;
            public glitterColor!: string;
            public comet?: any;
            public starCount?: number;

            constructor(options: any) {
                Object.assign(this, options);

                if (!this.starCount) {
                    const density = options.starDensity || 1;
                    const scaledSize = this.spreadSize / 54;
                    this.starCount = Math.max(
                        6,
                        scaledSize * scaledSize * density
                    );
                }
            }

            launch(position: number, launchHeight: number) {
                const width = stageW;
                const height = stageH;
                const hpad = 60;
                const vpad = 50;
                const minHeightPercent = 0.45;
                const minHeight = height - height * minHeightPercent;

                const launchX = position * (width - hpad * 2) + hpad;
                const launchY = height;
                const burstY = minHeight - launchHeight * (minHeight - vpad);

                const launchDistance = launchY - burstY;
                const launchVelocity = Math.pow(launchDistance * 0.04, 0.64);

                const comet = Star.add(
                    launchX,
                    launchY,
                    COLOR.White,
                    Math.PI,
                    launchVelocity,
                    launchVelocity * 400
                );
                comet.heavy = true;
                this.comet = comet;

                setTimeout(() => {
                    this.burst(launchX, burstY);
                }, (launchDistance / launchVelocity) * 16);
            }

            burst(x: number, y: number) {
                const speed = this.spreadSize / 96;
                const color = Array.isArray(this.color)
                    ? this.color[0]
                    : this.color;

                createBurst(
                    this.starDensity * 50,
                    x,
                    y,
                    speed,
                    color,
                    this.starLife
                );
                BurstFlash.add(x, y, this.spreadSize / 4);
            }
        }

        // Letter shapes for "I LOVE YOU ELIISE"
        const LETTER_SHAPES: { [key: string]: number[][] } = {
            I: [
                [1, 1, 1, 1, 1],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [1, 1, 1, 1, 1],
            ],
            L: [
                [1, 0, 0, 0, 0],
                [1, 0, 0, 0, 0],
                [1, 0, 0, 0, 0],
                [1, 0, 0, 0, 0],
                [1, 1, 1, 1, 1],
            ],
            O: [
                [0, 1, 1, 1, 0],
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1],
                [0, 1, 1, 1, 0],
            ],
            V: [
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1],
                [0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0],
                [0, 0, 1, 0, 0],
            ],
            E: [
                [1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0],
                [1, 1, 1, 1, 0],
                [1, 0, 0, 0, 0],
                [1, 1, 1, 1, 1],
            ],
            U: [
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1],
                [0, 1, 1, 1, 0],
            ],
            Y: [
                [1, 0, 0, 0, 1],
                [0, 1, 0, 1, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
            ],
            S: [
                [1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0],
                [1, 1, 1, 1, 1],
                [0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1],
            ],
            " ": [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
        };

        function createFireworksText(
            text: string,
            centerX: number,
            centerY: number,
            scale = 1
        ) {
            const words = text.toUpperCase().split(" ");
            let totalWidth = 0;
            words.forEach((word, index) => {
                totalWidth += word.length * 7 * scale;
                if (index < words.length - 1) totalWidth += 3 * scale;
            });

            let currentX = centerX - totalWidth / 2;
            const startY = centerY - (5 * scale * 1.5) / 2;

            const romanticColors = [
                [COLOR.Red, COLOR.Purple],
                [COLOR.Gold, COLOR.Red],
                [COLOR.Blue, COLOR.Purple],
                [COLOR.Gold, COLOR.White, COLOR.Red],
            ];

            words.forEach((word, wordIndex) => {
                for (let i = 0; i < word.length; i++) {
                    const letter = word[i];
                    if (LETTER_SHAPES[letter]) {
                        const shape = LETTER_SHAPES[letter];
                        const wordColors = romanticColors[wordIndex] || [
                            COLOR.Gold,
                            COLOR.White,
                        ];
                        const baseColor = wordColors[i % wordColors.length];

                        for (let y = 0; y < shape.length; y++) {
                            for (let x = 0; x < shape[y].length; x++) {
                                if (shape[y][x]) {
                                    for (let p = 0; p < 4; p++) {
                                        const offsetX =
                                            (Math.random() - 0.5) * scale * 0.3;
                                        const offsetY =
                                            (Math.random() - 0.5) * scale * 0.3;

                                        const star = Star.add(
                                            currentX +
                                                x * scale * 1.2 +
                                                offsetX,
                                            startY + y * scale * 1.2 + offsetY,
                                            baseColor,
                                            Math.PI,
                                            0,
                                            8000
                                        );
                                        star.noGravity = true;
                                        star.heavy = true;
                                        star.textParticle = true;
                                        star.staticTime = 3000;
                                    }
                                }
                            }
                        }
                    }
                    currentX += 7 * scale;
                }
                if (wordIndex < words.length - 1) {
                    currentX += 3 * scale;
                }
            });
        }

        // Sequence control
        let isFirstSeq = true;
        const finaleCount = 32;
        let currentFinaleCount = 0;
        let sequenceStartTime = 0;
        let hasTriggeredFinale = false;
        let autoLaunchTime = 0;
        let currentFrame = 0;

        function startSequence() {
            if (isFirstSeq) {
                isFirstSeq = false;
                sequenceStartTime = Date.now();
                hasTriggeredFinale = false;
                const shell = new Shell(crysanthemumShell(shellSize));
                shell.launch(0.5, 0.5);
                return 800;
            }

            const elapsedTime = Date.now() - sequenceStartTime;
            if (elapsedTime >= 10000 && !hasTriggeredFinale) {
                hasTriggeredFinale = true;
                currentFinaleCount = 0;

                const baseScale = Math.max(3, Math.min(stageW, stageH) / 100);
                const maxScaleForWidth = (stageW * 0.9) / (14 * 7 + 3 * 3);
                const responsiveScale = Math.min(baseScale, maxScaleForWidth);

                createFireworksText(
                    "I LOVE YOU ELIISE",
                    stageW / 2,
                    stageH / 2,
                    responsiveScale
                );
                return 8000;
            }

            if (hasTriggeredFinale) {
                const shell = new Shell(crysanthemumShell(shellSize));
                shell.launch(Math.random(), Math.random() * 0.7);
                if (currentFinaleCount < finaleCount) {
                    currentFinaleCount++;
                    return 170;
                } else {
                    currentFinaleCount = 0;
                    sequenceStartTime = Date.now();
                    hasTriggeredFinale = false;
                    return 1000;
                }
            }

            const rand = Math.random();
            if (rand < 0.5) {
                const shell = new Shell(crysanthemumShell(shellSize));
                shell.launch(Math.random(), Math.random() * 0.7);
            } else {
                const shell1 = new Shell(crysanthemumShell(shellSize));
                shell1.launch(0.3 + Math.random() * 0.2, Math.random() * 0.7);
                setTimeout(() => {
                    const shell2 = new Shell(crysanthemumShell(shellSize));
                    shell2.launch(
                        0.5 + Math.random() * 0.2,
                        Math.random() * 0.7
                    );
                }, 200);
            }

            return 300 + Math.random() * 500;
        }

        // Main update loop
        function update(frameTime: number, lag: number) {
            if (paused) return;

            const timeStep = frameTime * simSpeed;
            const speed = simSpeed * lag;

            currentFrame++;
            autoLaunchTime -= timeStep;
            if (autoLaunchTime <= 0) {
                autoLaunchTime = startSequence() * 1.25;
            }

            const gAcc = (timeStep / 1000) * GRAVITY;

            // Update stars
            COLOR_CODES_W_INVIS.forEach((color) => {
                const starArray = stars[color];
                for (let i = starArray.length - 1; i >= 0; i--) {
                    const star = starArray[i];
                    if (star.updateFrame === currentFrame) continue;
                    star.updateFrame = currentFrame;

                    star.life -= timeStep;
                    if (star.life <= 0) {
                        starArray.splice(i, 1);
                        Star.returnInstance(star);
                    } else {
                        if (
                            star.textParticle &&
                            star.staticTime !== undefined
                        ) {
                            star.staticTime -= timeStep;
                            if (star.staticTime <= 0) {
                                star.noGravity = false;
                                star.heavy = false;
                                if (star.speedX === 0 && star.speedY === 0) {
                                    star.speedX = (Math.random() - 0.5) * 0.5;
                                    star.speedY = Math.random() * 0.3;
                                }
                                star.staticTime = undefined;
                            }
                        }

                        star.prevX = star.x;
                        star.prevY = star.y;
                        star.x += star.speedX * speed;
                        star.y += star.speedY * speed;

                        if (!star.heavy) {
                            star.speedX *= 0.98;
                            star.speedY *= 0.98;
                        }
                        star.speedY += star.noGravity ? 0 : gAcc;
                    }
                }
            });

            // Update sparks
            COLOR_CODES_W_INVIS.forEach((color) => {
                const sparkArray = sparks[color];
                for (let i = sparkArray.length - 1; i >= 0; i--) {
                    const spark = sparkArray[i];
                    spark.life -= timeStep;
                    if (spark.life <= 0) {
                        sparkArray.splice(i, 1);
                        Spark.returnInstance(spark);
                    } else {
                        if (
                            spark.textParticle &&
                            spark.staticTime !== undefined
                        ) {
                            spark.staticTime -= timeStep;
                            if (spark.staticTime <= 0) {
                                spark.noGravity = false;
                                if (spark.speedX === 0 && spark.speedY === 0) {
                                    spark.speedX = (Math.random() - 0.5) * 0.5;
                                    spark.speedY = Math.random() * 0.3;
                                }
                                spark.staticTime = undefined;
                            }
                        }

                        spark.prevX = spark.x;
                        spark.prevY = spark.y;
                        spark.x += spark.speedX * speed;
                        spark.y += spark.speedY * speed;
                        spark.speedX *= 0.9;
                        spark.speedY *= 0.9;
                        spark.speedY += spark.noGravity ? 0 : gAcc;
                    }
                }
            });

            render(speed);
        }

        function render(speed: number) {
            const width = stageW;
            const height = stageH;

            trailsCtx.scale(dpr * scaleFactor, dpr * scaleFactor);
            mainCtx.scale(dpr * scaleFactor, dpr * scaleFactor);

            trailsCtx.globalCompositeOperation = "source-over";
            trailsCtx.fillStyle = `rgba(0, 0, 0, ${0.175 * speed})`;
            trailsCtx.fillRect(0, 0, width, height);

            mainCtx.clearRect(0, 0, width, height);

            // Draw burst flashes
            while (burstFlashes.length) {
                const bf = burstFlashes.pop()!;
                const gradient = trailsCtx.createRadialGradient(
                    bf.x,
                    bf.y,
                    0,
                    bf.x,
                    bf.y,
                    bf.radius
                );
                gradient.addColorStop(0.024, "rgba(255, 255, 255, 1)");
                gradient.addColorStop(0.125, "rgba(255, 160, 20, 0.2)");
                gradient.addColorStop(0.32, "rgba(255, 140, 20, 0.11)");
                gradient.addColorStop(1, "rgba(255, 120, 20, 0)");
                trailsCtx.fillStyle = gradient;
                trailsCtx.fillRect(
                    bf.x - bf.radius,
                    bf.y - bf.radius,
                    bf.radius * 2,
                    bf.radius * 2
                );
                BurstFlash.returnInstance(bf);
            }

            trailsCtx.globalCompositeOperation = "lighten";

            // Draw stars
            trailsCtx.lineWidth = 3;
            trailsCtx.lineCap = "round";
            mainCtx.strokeStyle = "#fff";
            mainCtx.lineWidth = 1;
            mainCtx.beginPath();

            COLOR_CODES.forEach((color) => {
                const starArray = stars[color];
                trailsCtx.strokeStyle = color;
                trailsCtx.beginPath();
                starArray.forEach((star: any) => {
                    if (star.visible !== false) {
                        trailsCtx.moveTo(star.x, star.y);
                        trailsCtx.lineTo(star.prevX, star.prevY);
                        mainCtx.moveTo(star.x, star.y);
                        mainCtx.lineTo(
                            star.x - star.speedX * 1.6,
                            star.y - star.speedY * 1.6
                        );
                    }
                });
                trailsCtx.stroke();
            });
            mainCtx.stroke();

            // Draw sparks
            trailsCtx.lineWidth = 1;
            trailsCtx.lineCap = "butt";
            COLOR_CODES.forEach((color) => {
                const sparkArray = sparks[color];
                trailsCtx.strokeStyle = color;
                trailsCtx.beginPath();
                sparkArray.forEach((spark: any) => {
                    trailsCtx.moveTo(spark.x, spark.y);
                    trailsCtx.lineTo(spark.prevX, spark.prevY);
                });
                trailsCtx.stroke();
            });

            trailsCtx.setTransform(1, 0, 0, 1, 0, 0);
            mainCtx.setTransform(1, 0, 0, 1, 0, 0);
        }

        // Animation loop
        let lastTime = 0;
        function animate(currentTime: number) {
            const deltaTime = currentTime - lastTime;
            lastTime = currentTime;
            const lag = Math.min(deltaTime / (1000 / 60), 1);

            update(deltaTime, lag);
            requestAnimationFrame(animate);
        }

        // Initialize and start
        paused = false;
        requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", resize);
            paused = true;
        };
    }, []);

    return (
        <Container>
            <CanvasWrapper>
                <canvas ref={trailsCanvasRef} />
                <canvas ref={mainCanvasRef} />
            </CanvasWrapper>

            <BackButton
                onClick={() => navigate("/")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                ← Back to Love
            </BackButton>
        </Container>
    );
};

export default FireworksPage;
