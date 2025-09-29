import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import FloatingHearts3D from "./FloatingHearts3D";
import CrystalHeart from "./CrystalHeart";
import RomanticStars from "./RomanticStars";

interface RomanticScene3DProps {
    className?: string;
    enableControls?: boolean;
    showFloatingHearts?: boolean;
    showCrystalHeart?: boolean;
    showRomanticStars?: boolean;
}

const Scene: React.FC<RomanticScene3DProps> = ({
    enableControls = false,
    showFloatingHearts = true,
    showCrystalHeart = true,
    showRomanticStars = true,
}) => {
    return (
        <>
            {/* Lighting setup for romantic atmosphere */}
            <ambientLight intensity={0.4} color="#ffb6c1" />
            <pointLight
                position={[10, 10, 10]}
                intensity={0.8}
                color="#ff69b4"
            />
            <pointLight
                position={[-10, -10, -10]}
                intensity={0.5}
                color="#ff1493"
            />
            <directionalLight
                position={[0, 10, 5]}
                intensity={0.6}
                color="#ffffff"
                castShadow
            />

            {/* Romantic background */}
            {showRomanticStars && <RomanticStars count={300} />}

            {/* Floating hearts particle system */}
            {showFloatingHearts && <FloatingHearts3D count={80} />}

            {/* Central crystal heart */}
            {showCrystalHeart && (
                <CrystalHeart position={[0, 0, 0]} scale={1.5} />
            )}

            {/* Camera controls (optional) */}
            {enableControls && (
                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={5}
                    maxDistance={20}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                />
            )}
        </>
    );
};

const RomanticScene3D: React.FC<RomanticScene3DProps> = (props) => {
    return (
        <div className={`w-full h-full ${props.className || ""}`}>
            <Canvas
                shadows
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                }}
                dpr={[1, 2]} // Responsive pixel ratio
            >
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
                <Suspense fallback={null}>
                    <Scene {...props} />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default RomanticScene3D;
