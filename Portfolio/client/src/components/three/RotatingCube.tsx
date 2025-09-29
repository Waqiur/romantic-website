import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTheme } from "../../hooks/use-theme.tsx";
import * as THREE from "three";

const RotatingCube = () => {
  const { theme } = useTheme();
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Animation loop
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <mesh ref={meshRef} position={[0, 0, 0]} scale={2.5}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={theme === "dark" ? "#1f2937" : "#ffffff"}
          metalness={0.4}
          roughness={0.7}
          transparent
          opacity={0.2}
          wireframe
        />
      </mesh>
    </>
  );
};

export default RotatingCube;
