import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface RomanticStarsProps {
    count?: number;
}

interface Star {
    position: [number, number, number];
    brightness: number;
    twinkleSpeed: number;
    size: number;
}

interface ShootingStar {
    startPosition: [number, number, number];
    endPosition: [number, number, number];
    speed: number;
    life: number;
    maxLife: number;
    active: boolean;
}

const RomanticStars: React.FC<RomanticStarsProps> = ({ count = 200 }) => {
    const starsRef = useRef<THREE.Points>(null);

    // Create stars with romantic positioning (forming heart shapes)
    const stars = useMemo(() => {
        const starArray: Star[] = [];

        // Generate random stars
        for (let i = 0; i < count; i++) {
            starArray.push({
                position: [
                    (Math.random() - 0.5) * 100,
                    (Math.random() - 0.5) * 100,
                    (Math.random() - 0.5) * 50,
                ],
                brightness: 0.3 + Math.random() * 0.7,
                twinkleSpeed: 0.5 + Math.random() * 2,
                size: 0.5 + Math.random() * 1.5,
            });
        }

        // Add stars in heart formation
        for (let i = 0; i < 50; i++) {
            const t = (i / 49) * Math.PI * 2;
            const x = 16 * Math.sin(t) ** 3 * 0.3;
            const y =
                (13 * Math.cos(t) -
                    5 * Math.cos(2 * t) -
                    2 * Math.cos(3 * t) -
                    Math.cos(4 * t)) *
                0.3;
            const z = (Math.random() - 0.5) * 10;

            starArray.push({
                position: [x, y + 5, z],
                brightness: 0.8 + Math.random() * 0.2,
                twinkleSpeed: 1 + Math.random(),
                size: 1 + Math.random(),
            });
        }

        return starArray;
    }, [count]);

    // Create shooting stars
    const shootingStars = useMemo(() => {
        return Array.from(
            { length: 3 },
            (): ShootingStar => ({
                startPosition: [
                    (Math.random() - 0.5) * 80,
                    40 + Math.random() * 20,
                    (Math.random() - 0.5) * 30,
                ],
                endPosition: [
                    (Math.random() - 0.5) * 80,
                    -40 - Math.random() * 20,
                    (Math.random() - 0.5) * 30,
                ],
                speed: 0.02 + Math.random() * 0.03,
                life: 0,
                maxLife: 100 + Math.random() * 200,
                active: false,
            })
        );
    }, []);

    // Create geometry and material for stars
    const { geometry, material } = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(stars.length * 3);
        const colors = new Float32Array(stars.length * 3);
        const sizes = new Float32Array(stars.length);

        stars.forEach((star, i) => {
            positions[i * 3] = star.position[0];
            positions[i * 3 + 1] = star.position[1];
            positions[i * 3 + 2] = star.position[2];

            // Pink/red romantic colors
            colors[i * 3] = 1; // R
            colors[i * 3 + 1] = 0.4 + Math.random() * 0.4; // G
            colors[i * 3 + 2] = 0.6 + Math.random() * 0.4; // B

            sizes[i] = star.size;
        });

        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

        const mat = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
            },
            vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float time;

        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
            fragmentShader: `
        varying vec3 vColor;

        void main() {
          float r = distance(gl_PointCoord, vec2(0.5, 0.5));
          if (r > 0.5) discard;

          float alpha = 1.0 - smoothstep(0.0, 0.5, r);
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
            transparent: true,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
        });

        return { geometry: geo, material: mat };
    }, [stars]);

    // Animation loop
    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Update star twinkling
        if (material.uniforms.time) {
            material.uniforms.time.value = time;
        }

        // Update shooting stars
        shootingStars.forEach((star, index) => {
            if (!star.active && Math.random() < 0.002) {
                // Activate shooting star
                star.active = true;
                star.life = 0;
            }

            if (star.active) {
                star.life += 1;

                if (star.life >= star.maxLife) {
                    star.active = false;
                    // Reset position for next activation
                    star.startPosition = [
                        (Math.random() - 0.5) * 80,
                        40 + Math.random() * 20,
                        (Math.random() - 0.5) * 30,
                    ];
                    star.endPosition = [
                        (Math.random() - 0.5) * 80,
                        -40 - Math.random() * 20,
                        (Math.random() - 0.5) * 30,
                    ];
                }
            }
        });
    });

    return (
        <group>
            {/* Main stars */}
            <points ref={starsRef} geometry={geometry} material={material} />

            {/* Shooting stars */}
            {shootingStars.map((star, index) => {
                if (!star.active) return null;

                const progress = star.life / star.maxLife;
                const currentPos: [number, number, number] = [
                    star.startPosition[0] +
                        (star.endPosition[0] - star.startPosition[0]) *
                            progress,
                    star.startPosition[1] +
                        (star.endPosition[1] - star.startPosition[1]) *
                            progress,
                    star.startPosition[2] +
                        (star.endPosition[2] - star.startPosition[2]) *
                            progress,
                ];

                const points = [];
                points.push(new THREE.Vector3(...star.startPosition));
                points.push(new THREE.Vector3(...currentPos));

                const geometry = new THREE.BufferGeometry().setFromPoints(
                    points
                );

                return (
                    <primitive
                        key={index}
                        object={
                            new THREE.Line(
                                geometry,
                                new THREE.LineBasicMaterial({
                                    color: "#ffb6c1",
                                    transparent: true,
                                    opacity: 1 - progress,
                                })
                            )
                        }
                    />
                );
            })}
        </group>
    );
};

export default RomanticStars;
