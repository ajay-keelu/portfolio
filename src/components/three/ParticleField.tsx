'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 200;
const SPREAD = 10;
const HEIGHT_LIMIT = 5;

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * SPREAD;
      pos[i3 + 1] = (Math.random() - 0.5) * SPREAD;
      pos[i3 + 2] = (Math.random() - 0.5) * SPREAD;

      vel[i3] = (Math.random() - 0.5) * 0.002;
      vel[i3 + 1] = Math.random() * 0.005 + 0.002;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    return [pos, vel];
  }, []);

  const colors = useMemo(() => {
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const cyanColor = new THREE.Color('#22d3ee');
    const whiteColor = new THREE.Color('#ffffff');

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const mixed = cyanColor.clone().lerp(whiteColor, Math.random() * 0.7);
      col[i3] = mixed.r;
      col[i3 + 1] = mixed.g;
      col[i3 + 2] = mixed.b;
    }

    return col;
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const positionAttr = pointsRef.current.geometry.attributes.position;
    const posArray = positionAttr.array as Float32Array;

    const mouseX = pointer.x * 3;
    const mouseY = pointer.y * 3;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      posArray[i3] += velocities[i3];
      posArray[i3 + 1] += velocities[i3 + 1];
      posArray[i3 + 2] += velocities[i3 + 2];

      // Reset particles that go too high
      if (posArray[i3 + 1] > HEIGHT_LIMIT) {
        posArray[i3 + 1] = -HEIGHT_LIMIT;
        posArray[i3] = (Math.random() - 0.5) * SPREAD;
        posArray[i3 + 2] = (Math.random() - 0.5) * SPREAD;
      }

      // Mouse interaction: spread particles near cursor
      const dx = posArray[i3] - mouseX;
      const dy = posArray[i3 + 1] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 1.5) {
        const force = (1.5 - dist) * 0.005;
        posArray[i3] += dx * force;
        posArray[i3 + 1] += dy * force;
      }
    }

    positionAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        transparent
        opacity={0.7}
        vertexColors
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticleField() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        frameloop="always"
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true, antialias: false }}
        style={{ background: 'transparent' }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
