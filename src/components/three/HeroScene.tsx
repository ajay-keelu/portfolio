'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function AnimatedIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.15 + pointer.y * 0.3;
    meshRef.current.rotation.y = t * 0.2 + pointer.x * 0.3;
    meshRef.current.position.y = Math.sin(t * 0.8) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={[-1.5, 0, 0]}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.6} />
    </mesh>
  );
}

function AnimatedTorus() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = -t * 0.2 + pointer.y * 0.2;
    meshRef.current.rotation.y = -t * 0.15 + pointer.x * 0.2;
    meshRef.current.position.y = Math.sin(t * 0.6 + 1) * 0.4;
  });

  return (
    <mesh ref={meshRef} position={[1.8, 0, -0.5]}>
      <torusGeometry args={[0.8, 0.25, 16, 32]} />
      <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.5} />
    </mesh>
  );
}

function AnimatedOctahedron() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.25 + pointer.y * 0.15;
    meshRef.current.rotation.z = t * 0.18 + pointer.x * 0.15;
    meshRef.current.position.y = Math.sin(t * 0.7 + 2) * 0.35;
  });

  return (
    <mesh ref={meshRef} position={[0, 0.5, 0.5]}>
      <octahedronGeometry args={[0.7, 0]} />
      <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.55} />
    </mesh>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.1,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.y * 0.05,
      0.05
    );
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#22d3ee" />
      <pointLight position={[-5, -3, 3]} intensity={0.4} color="#a855f7" />
      <AnimatedIcosahedron />
      <AnimatedTorus />
      <AnimatedOctahedron />
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        frameloop="always"
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <fog attach="fog" args={['#0a0a1a', 5, 15]} />
        <Scene />
      </Canvas>
    </div>
  );
}
