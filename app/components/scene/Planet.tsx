"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import type { Project } from "../../data/types";
import { planetPositions } from "./stations";
import { universeStore } from "../universe/store";
import {
  planetVertex,
  planetFragment,
  atmosphereVertex,
  atmosphereFragment,
  ringVertex,
  ringFragment,
} from "./shaders";

const STYLE_INDEX = { structured: 0, modular: 1, warm: 2, translucent: 3, network: 4 } as const;

interface PlanetProps {
  project: Project;
  quality: number;
  onSelect: (slug: string) => void;
  onHover: (slug: string | null) => void;
}

/** One interactive celestial body per featured project. */
export function Planet({ project, quality, onSelect, onHover }: PlanetProps) {
  const { planetStyle: style, slug } = project;
  const group = useRef<THREE.Group>(null);
  const body = useRef<THREE.Mesh>(null);
  const atmo = useRef<THREE.Mesh>(null);
  const moonsRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const hoverLerp = useRef(0);

  const position = useMemo(() => planetPositions.get(slug)!, [slug]);

  const surfaceMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: planetVertex,
        fragmentShader: planetFragment,
        transparent: style.surface === "translucent",
        uniforms: {
          uColorA: { value: new THREE.Color(style.colorA) },
          uColorB: { value: new THREE.Color(style.colorB) },
          uColorC: { value: new THREE.Color(style.colorC) },
          uAtmosphere: { value: new THREE.Color(style.atmosphere) },
          uTime: { value: 0 },
          uHover: { value: 0 },
          uStyle: { value: STYLE_INDEX[style.surface] },
        },
      }),
    [style],
  );

  const atmosphereMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: atmosphereVertex,
        fragmentShader: atmosphereFragment,
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uColor: { value: new THREE.Color(style.atmosphere) },
          uIntensity: { value: 0.55 },
        },
      }),
    [style],
  );

  const ringMaterial = useMemo(() => {
    if (!style.ring) return null;
    return new THREE.ShaderMaterial({
      vertexShader: ringVertex,
      fragmentShader: ringFragment,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        uColor: { value: new THREE.Color(style.ring.color) },
        uInner: { value: style.ring.inner },
        uOuter: { value: style.ring.outer },
      },
    });
  }, [style]);

  const moons = useMemo(
    () =>
      Array.from({ length: style.moons }, (_, i) => ({
        radius: style.radius * (1.9 + i * 0.65),
        speed: (0.35 - i * 0.08) * (style.spin > 0.1 ? 1.6 : 1),
        phase: (i / Math.max(style.moons, 1)) * Math.PI * 2 + slug.length,
        size: style.radius * (0.09 + i * 0.03),
      })),
    [style, slug],
  );

  useFrame((state, delta) => {
    // Hover: ease the glow, slow the spin, pull gently toward the camera.
    const target = hovered || universeStore.focused === slug ? 1 : 0;
    hoverLerp.current += (target - hoverLerp.current) * Math.min(delta * 5, 1);

    // Frame-loop mutations go through the mesh refs, never the memoized values.
    const surf = body.current?.material as THREE.ShaderMaterial | undefined;
    if (surf) {
      surf.uniforms.uTime.value += delta;
      surf.uniforms.uHover.value = hoverLerp.current;
    }
    const shell = atmo.current?.material as THREE.ShaderMaterial | undefined;
    if (shell) shell.uniforms.uIntensity.value = 0.55 + hoverLerp.current * 0.6;

    if (body.current) {
      const spinSpeed = style.spin * (1 - hoverLerp.current * 0.6);
      body.current.rotation.y += delta * spinSpeed * 4;
    }
    if (group.current) {
      const toCam = state.camera.position.clone().sub(position).normalize();
      const pull = toCam.multiplyScalar(hoverLerp.current * style.radius * 0.18);
      group.current.position.set(
        position.x + pull.x,
        position.y + pull.y,
        position.z + pull.z,
      );
      const s = 1 + hoverLerp.current * 0.04;
      group.current.scale.setScalar(s);
    }
    if (moonsRef.current) {
      const t = state.clock.elapsedTime;
      moonsRef.current.children.forEach((child, i) => {
        const m = moons[i];
        const a = m.phase + t * m.speed * (1 - hoverLerp.current * 0.5);
        child.position.set(Math.cos(a) * m.radius, Math.sin(a) * m.radius * 0.18, Math.sin(a) * m.radius);
      });
    }
  });

  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    onHover(slug);
    document.body.style.cursor = "pointer";
  };
  const handleOut = () => {
    setHovered(false);
    onHover(null);
    document.body.style.cursor = "";
  };
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelect(slug);
  };

  const segments = quality > 0.5 ? 64 : 32;

  return (
    <group ref={group} position={position}>
      <mesh
        ref={body}
        material={surfaceMaterial}
        onPointerOver={handleOver}
        onPointerOut={handleOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[style.radius, segments, segments]} />
      </mesh>
      <mesh ref={atmo} material={atmosphereMaterial} scale={1.18}>
        <sphereGeometry args={[style.radius, 32, 32]} />
      </mesh>
      {style.ring && ringMaterial && (
        <mesh material={ringMaterial} rotation={[Math.PI / 2 + style.ring.tilt, 0, 0]}>
          <ringGeometry args={[style.ring.inner, style.ring.outer, 96]} />
        </mesh>
      )}
      <group ref={moonsRef}>
        {moons.map((m, i) => (
          <mesh key={i}>
            <sphereGeometry args={[m.size, 16, 16]} />
            <meshStandardMaterial
              color={style.colorC}
              emissive={style.atmosphere}
              emissiveIntensity={0.25}
              roughness={0.8}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
