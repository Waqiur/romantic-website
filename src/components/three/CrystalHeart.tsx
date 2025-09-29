import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Sphere, Octahedron } from "@react-three/drei";
import * as THREE from "three";

interface CrystalHeartProps {
    position?: [number, number, number];
    scale?: number;
}

const CrystalHeart: React.FC<CrystalHeartProps> = ({
    position = [0, 0, 0],
    scale = 1,
}) => {
    const groupRef = useRef<THREE.Group>(null);
    const crystalRef = useRef<THREE.Mesh>(null);

    // Animation loop for smooth 60fps rotation
    useFrame((state) => {
        if (groupRef.current) {
            const time = state.clock.getElapsedTime();

            // Smooth rotation on multiple axes
            groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
            groupRef.current.rotation.y = time * 0.5;
            groupRef.current.rotation.z = Math.cos(time * 0.2) * 0.1;
        }

        if (crystalRef.current) {
            // Crystal inner glow animation
            const material = crystalRef.current
                .material as THREE.MeshStandardMaterial;
            material.emissive.setHSL(
                0.95,
                0.8,
                0.3 + Math.sin(state.clock.getElapsedTime() * 2) * 0.2
            );
        }
    });

    return (
        <group ref={groupRef} position={position} scale={scale}>
            {/* Main crystal structure */}
            <Octahedron ref={crystalRef} args={[1.2]} position={[0, 0, 0]}>
                <meshStandardMaterial
                    color="#ff69b4"
                    emissive="#ff1493"
                    emissiveIntensity={0.3}
                    transparent
                    opacity={0.9}
                    metalness={0.8}
                    roughness={0.2}
                />
            </Octahedron>

            {/* Inner glowing core */}
            <Sphere args={[0.3]} position={[0, 0, 0]}>
                <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
            </Sphere>

            {/* Floating particles around the crystal */}
            {Array.from({ length: 8 }, (_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const radius = 2;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;

                return (
                    <Sphere
                        key={i}
                        args={[0.05]}
                        position={[x, Math.sin(i) * 0.5, z]}
                    >
                        <meshBasicMaterial
                            color="#ffb6c1"
                            transparent
                            opacity={0.8}
                        />
                    </Sphere>
                );
            })}

            {/* Romantic text */}
            <Text
                position={[0, -2, 0]}
                fontSize={0.3}
                color="#ff69b4"
                anchorX="center"
                anchorY="middle"
                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2"
            >
                Love
            </Text>
        </group>
    );
};

export default CrystalHeart;
