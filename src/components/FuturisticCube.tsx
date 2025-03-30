import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, GradientTexture, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface FuturisticCubeProps {
  size?: number;
  position?: [number, number, number];
  wireframe?: boolean;
}

const FuturisticCube: React.FC<FuturisticCubeProps> = ({ 
  size = 1.5, 
  position = [0, 0, 0], 
  wireframe = false 
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Create an array of smaller cubes for a more complex shape
  const cubes = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => {
      const x = ((i % 2) - 0.5) * 0.6;
      const y = (Math.floor(i / 2) % 2 - 0.5) * 0.6;
      const z = (Math.floor(i / 4) - 0.5) * 0.6;
      return { position: [x, y, z] as [number, number, number], scale: 0.35 };
    });
  }, []);

  // Main animation
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Primary rotation
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
      
      // Pulse effect
      const t = state.clock.getElapsedTime();
      meshRef.current.scale.x = size * (1 + Math.sin(t * 2) * 0.05);
      meshRef.current.scale.y = size * (1 + Math.sin(t * 2 + 1) * 0.05);
      meshRef.current.scale.z = size * (1 + Math.sin(t * 2 + 2) * 0.05);
    }
  });

  return (
    <group
      position={position}
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Central cube */}
      <RoundedBox args={[1, 1, 1]} radius={0.1} smoothness={4}>
        <MeshDistortMaterial
          transparent
          opacity={0.9}
          distort={hovered ? 0.4 : 0.2}
          speed={2}
          roughness={0}
          metalness={1}
          color={"#db2777"}
          wireframe={wireframe}
        >
          <GradientTexture
            stops={[0, 0.5, 1]}
            colors={['#ec4899', '#f472b6', '#f9a8d4']}
            size={1024}
          />
        </MeshDistortMaterial>
      </RoundedBox>
      
      {/* Orbital smaller cubes */}
      {cubes.map((cube, i) => (
        <mesh key={i} position={cube.position} scale={cube.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial 
            color={i % 2 ? "#ec4899" : "#f472b6"} 
            emissive={i % 2 ? "#db2777" : "#be185d"}
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
            wireframe={i % 3 === 0}
          />
        </mesh>
      ))}
    </group>
  );
};

export default FuturisticCube; 