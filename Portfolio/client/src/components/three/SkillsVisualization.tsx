import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../../hooks/use-theme.tsx";
import { Text } from "@react-three/drei";

// Skills to display in the 3D visualization
const skills = [
  { name: "React", color: "#61DAFB" },
  { name: "Three.js", color: "#8B5CF6" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "WebGL", color: "#990000" },
  { name: "Node.js", color: "#689F63" },
  { name: "Tailwind", color: "#06B6D4" },
];

const SkillsVisualization = () => {
  const { theme } = useTheme();
  const groupRef = useRef<THREE.Group>(null);
  
  // Animation loop
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <group ref={groupRef}>
        {skills.map((skill, index) => {
          // Position skills in a circle
          const angle = (index / skills.length) * Math.PI * 2;
          const radius = 3;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          // Fixed static position for now, we'll animate in the useFrame hook
          const y = Math.sin(index) * 0.5; // slight up-down position based on index
          
          return (
            <group key={skill.name} position={[x, y, z]}>
              <Text
                color={skill.color}
                fontSize={0.4}
                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2"
                anchorX="center"
                anchorY="middle"
              >
                {skill.name}
              </Text>
            </group>
          );
        })}
      </group>
    </>
  );
};

export default SkillsVisualization;
