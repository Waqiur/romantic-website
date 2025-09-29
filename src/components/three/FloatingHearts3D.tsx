import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingHearts3DProps {
    count?: number;
}

const FloatingHearts3D: React.FC<FloatingHearts3DProps> = ({ count = 50 }) => {
    const groupRef = useRef<THREE.Group>(null);

    // Create heart geometry
    const heartGeometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const indices = [];

        // Create a heart shape using parametric equations
        for (let i = 0; i <= 50; i++) {
            const t = (i / 50) * Math.PI * 2;
            const x = 16 * Math.sin(t) ** 3;
            const y =
                13 * Math.cos(t) -
                5 * Math.cos(2 * t) -
                2 * Math.cos(3 * t) -
                Math.cos(4 * t);
            const z = 0;

            positions.push(x * 0.01, y * 0.01, z);
        }

        // Create faces
        for (let i = 0; i < positions.length - 1; i++) {
            indices.push(0, i, i + 1);
        }

        geometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(positions.flat(), 3)
        );
        geometry.setIndex(indices);
        geometry.computeVertexNormals();

        return geometry;
    }, []);

    // Create hearts with random positions and properties
    const hearts = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            position: [
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 10,
            ] as [number, number, number],
            rotation: [
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI,
            ] as [number, number, number],
            scale: 0.1 + Math.random() * 0.2,
            speed: 0.005 + Math.random() * 0.01,
            color: new THREE.Color().setHSL(
                0.95 + Math.random() * 0.1,
                0.8,
                0.6 + Math.random() * 0.4
            ),
            floatOffset: Math.random() * Math.PI * 2,
        }));
    }, [count]);

    // Animation loop
    useFrame((state) => {
        if (!groupRef.current) return;

        const time = state.clock.getElapsedTime();

        groupRef.current.children.forEach((heart, index) => {
            const heartData = hearts[index];
            if (!heartData) return;

            // Floating motion
            heart.position.y =
                heartData.position[1] +
                Math.sin(time * heartData.speed + heartData.floatOffset) * 0.5;

            // Gentle rotation
            heart.rotation.x = heartData.rotation[0] + time * 0.2;
            heart.rotation.y = heartData.rotation[1] + time * 0.1;
            heart.rotation.z = heartData.rotation[2] + time * 0.15;

            // Subtle pulsing scale
            const pulseScale =
                heartData.scale *
                (1 + Math.sin(time * 2 + heartData.floatOffset) * 0.1);
            heart.scale.setScalar(pulseScale);
        });
    });

    return (
        <group ref={groupRef}>
            {hearts.map((heart) => (
                <mesh
                    key={heart.id}
                    position={heart.position}
                    rotation={heart.rotation}
                    scale={heart.scale}
                    geometry={heartGeometry}
                >
                    <meshStandardMaterial
                        color={heart.color}
                        emissive={heart.color.clone().multiplyScalar(0.1)}
                        transparent
                        opacity={0.8}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            ))}
        </group>
    );
};

export default FloatingHearts3D;
