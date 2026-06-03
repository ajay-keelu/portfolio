'use client';

import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingShapeProps {
  position: [number, number, number];
  geometry: 'box' | 'sphere' | 'cone' | 'dodecahedron';
  color: string;
  speed: number;
  offset: number;
  scale: number;
}

function FloatingShape({ position, geometry, color, speed, offset, scale }: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    meshRef.current.position.x = position[0] + Math.sin(t * speed + offset) * 0.5;
    meshRef.current.position.y = position[1] + Math.cos(t * speed * 0.7 + offset) * 0.4;
    meshRef.current.position.z = position[2] + Math.sin(t * speed * 0.5 + offset * 2) * 0.3;

    meshRef.current.rotation.x = t * speed * 0.3;
    meshRef.current.rotation.y = t * speed * 0.4;

    // Mouse parallax
    meshRef.current.position.x += pointer.x * 0.15 * (position[2] + 2);
    meshRef.current.position.y += pointer.y * 0.1 * (position[2] + 2);
  });

  const renderGeometry = () => {
    switch (geometry) {
      case 'box':
        return <boxGeometry args={[0.4 * scale, 0.4 * scale, 0.4 * scale]} />;
      case 'sphere':
        return <sphereGeometry args={[0.25 * scale, 16, 16]} />;
      case 'cone':
        return <coneGeometry args={[0.2 * scale, 0.5 * scale, 8]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[0.25 * scale, 0]} />;
      default:
        return <boxGeometry args={[0.4 * scale, 0.4 * scale, 0.4 * scale]} />;
    }
  };

  return (
    <mesh ref={meshRef} position={position}>
      {renderGeometry()}
      <meshBasicMaterial color={color} wireframe transparent opacity={0.45} />
    </mesh>
  );
}

const shapes: FloatingShapeProps[] = [
  { position: [-3, 1.5, -1], geometry: 'dodecahedron', color: '#22d3ee', speed: 0.4, offset: 0, scale: 1 },
  { position: [3, -1, -2], geometry: 'box', color: '#a855f7', speed: 0.35, offset: 1.5, scale: 0.9 },
  { position: [-2, -1.5, 0], geometry: 'sphere', color: '#38bdf8', speed: 0.45, offset: 3, scale: 1.1 },
  { position: [2, 2, -1.5], geometry: 'cone', color: '#818cf8', speed: 0.3, offset: 4.5, scale: 0.85 },
  { position: [0, -2, -0.5], geometry: 'dodecahedron', color: '#c084fc', speed: 0.5, offset: 2, scale: 0.7 },
  { position: [-3.5, -0.5, -2], geometry: 'cone', color: '#67e8f9', speed: 0.38, offset: 5, scale: 0.8 },
  { position: [3.5, 0.5, -1], geometry: 'sphere', color: '#d946ef', speed: 0.42, offset: 1, scale: 0.75 },
  { position: [1, 1.8, -0.8], geometry: 'box', color: '#22d3ee', speed: 0.33, offset: 3.5, scale: 0.65 },
  { position: [-1.5, 0.8, -2.5], geometry: 'sphere', color: '#a78bfa', speed: 0.36, offset: 6, scale: 0.9 },
  { position: [0.5, -1.2, -1.8], geometry: 'dodecahedron', color: '#6ee7b7', speed: 0.28, offset: 2.5, scale: 0.7 },
];

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.05,
      0.03
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.y * 0.03,
      0.03
    );
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      {shapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} />
      ))}
    </group>
  );
}

export default function FloatingIcons() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        frameloop="always"
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <fog attach="fog" args={['#0a0a1a', 6, 14]} />
        <Scene />
      </Canvas>
    </div>
  );
}
