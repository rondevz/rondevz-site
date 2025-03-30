import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Sparkles } from '@react-three/drei';
import FuturisticCube from './FuturisticCube';
import * as THREE from 'three';

interface CubeSceneProps {
  className?: string;
}

const CubeScene: React.FC<CubeSceneProps> = ({ className }) => {
  return (
    <div className={`${className || ''}`}>
      <Canvas 
        camera={{ position: [0, 0, 4], fov: 45 }} 
        gl={{ 
          alpha: true,  // Enable transparency
          antialias: true,
          preserveDrawingBuffer: true
        }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.1} />
        <pointLight position={[-10, -10, -10]} color="#f472b6" intensity={0.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1} 
          castShadow 
          color="#f9a8d4"
        />
        <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ec4899" />
        
        <Suspense fallback={null}>
          {/* Particles/sparkles for futuristic effect */}
          <Sparkles count={100} scale={10} size={2} speed={0.3} color="#f9a8d4" />
          
          {/* Main cube with adjusted size */}
          <FuturisticCube size={1} position={[0, 0, 0]} />
          
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={1}
            minPolarAngle={Math.PI / 3.5}
            maxPolarAngle={Math.PI / 1.8}
          />
          
          {/* Ambient environment lighting */}
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CubeScene; 