"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const STAR_COLORS = ["#e9ebf7", "#a99bf5", "#8ed3e6", "#f6cd85"];

/** Deterministic pseudo-random, so SSR/CSR and re-renders agree. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function Starfield({ count }: { count: number }) {
  const group = useRef<THREE.Group>(null);
  const points = useRef<THREE.Points>(null);

  const [positions, colors, sizes] = useMemo(() => {
    const rand = mulberry32(1337);
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      // Shell distribution — far enough to parallax, never inside the system.
      const r = 90 + rand() * 240;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      c.set(STAR_COLORS[Math.floor(rand() * STAR_COLORS.length)]);
      const dim = 0.45 + rand() * 0.55;
      col[i * 3] = c.r * dim;
      col[i * 3 + 1] = c.g * dim;
      col[i * 3 + 2] = c.b * dim;
      size[i] = rand();
    }
    return [pos, col, size];
  }, [count]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    g.setAttribute("aTwinkle", new THREE.BufferAttribute(sizes, 1));
    return g;
  }, [positions, colors, sizes]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 } },
        vertexShader: /* glsl */ `
          attribute float aTwinkle;
          uniform float uTime;
          varying vec3 vColor;
          varying float vAlpha;
          void main() {
            vColor = color;
            vAlpha = 0.55 + 0.45 * sin(uTime * (0.4 + aTwinkle) + aTwinkle * 40.0);
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = (1.4 + aTwinkle * 2.2) * (140.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */ `
          varying vec3 vColor;
          varying float vAlpha;
          void main() {
            float d = length(gl_PointCoord - 0.5) * 2.0;
            float a = smoothstep(1.0, 0.2, d);
            gl_FragColor = vec4(vColor, a * vAlpha);
          }
        `,
        vertexColors: true,
      }),
    [],
  );

  useFrame((_, delta) => {
    const mat = points.current?.material as THREE.ShaderMaterial | undefined;
    if (mat) mat.uniforms.uTime.value += delta;
    if (group.current) group.current.rotation.y += delta * 0.004;
  });

  return (
    <group ref={group}>
      <points ref={points} geometry={geometry} material={material} />
    </group>
  );
}
