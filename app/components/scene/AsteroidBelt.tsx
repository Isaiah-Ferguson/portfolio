"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { stations } from "./stations";

/** Deterministic pseudo-random, matching the starfield's approach. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const BELT_RADIUS = 52;
const BELT_WIDTH = 5.5;
const BELT_THICKNESS = 1.7;

/**
 * The outer asteroid belt. Its plane is computed so the band sweeps
 * directly through the Skills and Community vistas — the regions the
 * camera gazes into once it leaves the planets behind.
 */
export function AsteroidBelt({ quality }: { quality: number }) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.InstancedMesh>(null);

  const count = quality > 0.5 ? 1100 : 420;

  /* Orient the belt plane through both outer-region look targets. */
  const orientation = useMemo(() => {
    const a = stations.find((s) => s.id === "skills")?.target ?? new THREE.Vector3(-34, 20, -70);
    const b = stations.find((s) => s.id === "community")?.target ?? new THREE.Vector3(44, 12, -78);
    const normal = new THREE.Vector3().crossVectors(a, b).normalize();
    if (normal.y < 0) normal.negate();
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
    return q;
  }, []);

  useEffect(() => {
    const m = mesh.current;
    if (!m) return;
    const rand = mulberry32(4242);
    const matrix = new THREE.Matrix4();
    const pos = new THREE.Vector3();
    const rot = new THREE.Euler();
    const quat = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const angle = rand() * Math.PI * 2;
      // Cluster toward the band's center line.
      const radial = BELT_RADIUS + (rand() + rand() - 1) * BELT_WIDTH;
      const y = (rand() + rand() - 1) * BELT_THICKNESS;
      pos.set(Math.cos(angle) * radial, y, Math.sin(angle) * radial);

      rot.set(rand() * Math.PI * 2, rand() * Math.PI * 2, rand() * Math.PI * 2);
      quat.setFromEuler(rot);

      // Mostly gravel, occasional boulders.
      const boulder = rand() < 0.035;
      const s = boulder ? 0.45 + rand() * 0.4 : 0.06 + rand() * 0.22;
      scale.set(s, s * (0.7 + rand() * 0.6), s * (0.7 + rand() * 0.6));

      matrix.compose(pos, quat, scale);
      m.setMatrixAt(i, matrix);

      // Warm-gray rock with rare glinting accents.
      const glint = rand();
      if (glint > 0.97) color.set("#e8b45a");
      else if (glint > 0.94) color.set("#8ed3e6");
      else {
        const v = 0.45 + rand() * 0.4;
        color.setRGB(v * 0.62, v * 0.64, v * 0.78);
      }
      m.setColorAt(i, color);
    }
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [count]);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.0065;
  });

  return (
    <group quaternion={orientation}>
      <group ref={group}>
        <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={1}
            metalness={0.15}
            flatShading
            emissive="#2a2f4a"
            emissiveIntensity={0.55}
          />
        </instancedMesh>
      </group>
    </group>
  );
}
