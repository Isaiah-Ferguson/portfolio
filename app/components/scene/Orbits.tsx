"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { featuredProjects } from "../../data/projects";

/** Faint orbital paths around the sun, breathing slowly. */
export function Orbits() {
  const group = useRef<THREE.Group>(null);

  const rings = useMemo(
    () =>
      featuredProjects.map((p) => {
        const points: THREE.Vector3[] = [];
        const n = 160;
        for (let i = 0; i <= n; i++) {
          const a = (i / n) * Math.PI * 2;
          points.push(
            new THREE.Vector3(
              Math.cos(a) * p.orbitalPosition.distance,
              p.orbitalPosition.inclination,
              Math.sin(a) * p.orbitalPosition.distance,
            ),
          );
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
          color: new THREE.Color(p.planetStyle.atmosphere),
          transparent: true,
          opacity: 0.14,
        });
        return {
          line: new THREE.Line(geometry, material),
          material,
          slug: p.slug,
        };
      }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    rings.forEach((r, i) => {
      r.material.opacity = 0.1 + Math.sin(t * 0.4 + i * 1.7) * 0.05 + 0.05;
    });
  });

  return (
    <group ref={group}>
      {rings.map((r) => (
        <primitive key={r.slug} object={r.line} />
      ))}
    </group>
  );
}
