"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OBSERVATORY_POS } from "./stations";

/** The quiet personal body visited in the About chapter. */
export function Observatory() {
  const satellite = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (satellite.current) {
      const t = state.clock.elapsedTime * 0.3;
      satellite.current.position.set(Math.cos(t) * 1.5, Math.sin(t * 0.8) * 0.3, Math.sin(t) * 1.5);
    }
  });

  return (
    <group position={OBSERVATORY_POS}>
      <mesh>
        <sphereGeometry args={[0.8, 48, 48]} />
        <meshStandardMaterial color="#3c4266" roughness={0.85} metalness={0.1} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0, 0.4]}>
        <torusGeometry args={[1.15, 0.015, 12, 80]} />
        <meshStandardMaterial
          color="#a99bf5"
          emissive="#a99bf5"
          emissiveIntensity={0.4}
          transparent
          opacity={0.7}
        />
      </mesh>
      <group ref={satellite}>
        <mesh>
          <boxGeometry args={[0.09, 0.09, 0.16]} />
          <meshStandardMaterial color="#e9ebf7" emissive="#8ed3e6" emissiveIntensity={0.5} />
        </mesh>
      </group>
      <pointLight color="#a99bf5" intensity={4} distance={10} decay={2} position={[1.5, 1.5, 1.5]} />
    </group>
  );
}
