"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  sunVertex,
  sunFragment,
  atmosphereVertex,
  atmosphereFragment,
  haloVertex,
  haloFragment,
} from "./shaders";
import { sunResponsibilities } from "../../data/profile";

const SUN_RADIUS = 3.2;

/**
 * The center of the universe: SJCOE / CodeStack Academy.
 * Five small moons orbit it — one per responsibility.
 */
export function Sun({ quality }: { quality: number }) {
  const surface = useRef<THREE.Mesh>(null);
  const moonsRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  const surfaceMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: sunVertex,
        fragmentShader: sunFragment,
        uniforms: { uTime: { value: 0 } },
      }),
    [],
  );

  const glowMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: atmosphereVertex,
        fragmentShader: atmosphereFragment,
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uColor: { value: new THREE.Color("#f0a24a") },
          uIntensity: { value: 0.9 },
        },
      }),
    [],
  );

  const haloMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: haloVertex,
        fragmentShader: haloFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uColor: { value: new THREE.Color("#e8934a") } },
      }),
    [],
  );

  const moons = useMemo(
    () =>
      sunResponsibilities.map((r, i) => ({
        id: r.id,
        radius: SUN_RADIUS + 1.6 + i * 0.75,
        speed: 0.16 - i * 0.02,
        phase: (i / sunResponsibilities.length) * Math.PI * 2,
        tilt: (i - 2) * 0.16,
        size: 0.16 + (i % 3) * 0.04,
      })),
    [],
  );

  useFrame((state, delta) => {
    const mat = surface.current?.material as THREE.ShaderMaterial | undefined;
    if (mat) mat.uniforms.uTime.value += delta;
    if (moonsRef.current) {
      const t = state.clock.elapsedTime;
      moonsRef.current.children.forEach((child, i) => {
        const m = moons[i];
        const a = m.phase + t * m.speed;
        child.position.set(
          Math.cos(a) * m.radius,
          Math.sin(a * 0.7) * m.radius * Math.sin(m.tilt) * 0.4,
          Math.sin(a) * m.radius,
        );
      });
    }
    if (haloRef.current) haloRef.current.lookAt(state.camera.position);
  });

  const segments = quality > 0.5 ? 96 : 48;

  return (
    <group>
      <mesh ref={surface} material={surfaceMaterial}>
        <sphereGeometry args={[SUN_RADIUS, segments, segments]} />
      </mesh>
      <mesh material={glowMaterial} scale={1.25}>
        <sphereGeometry args={[SUN_RADIUS, 48, 48]} />
      </mesh>
      <mesh ref={haloRef} material={haloMaterial}>
        <planeGeometry args={[SUN_RADIUS * 7, SUN_RADIUS * 7]} />
      </mesh>
      <pointLight color="#ffd9a0" intensity={220} distance={120} decay={1.6} />
      <group ref={moonsRef}>
        {moons.map((m) => (
          <mesh key={m.id}>
            <sphereGeometry args={[m.size, 20, 20]} />
            <meshStandardMaterial
              color="#c9b48a"
              emissive="#e8b45a"
              emissiveIntensity={0.35}
              roughness={0.7}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
