import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../../hooks/use-theme.tsx";

const ParticleBackground = () => {
  const { theme } = useTheme();
  const sphereRef = useRef<THREE.Mesh>(null);
  
  // Animation loop
  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });
  
  return (
    <>
      {/* Background color based on theme */}
      <color attach="background" args={[theme === "dark" ? "#111827" : "#F9FAFB"]} />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Simple sphere */}
      <mesh ref={sphereRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial 
          color="#3B82F6"
          metalness={0.4}
          roughness={0.7}
        />
      </mesh>
    </>
  );
};

export default ParticleBackground;
