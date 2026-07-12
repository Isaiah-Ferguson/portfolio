"use client";

import { useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Starfield } from "./Starfield";
import { Sun } from "./Sun";
import { Planet } from "./Planet";
import { Orbits } from "./Orbits";
import { AsteroidBelt } from "./AsteroidBelt";
import { Observatory } from "./Observatory";
import { CameraRig } from "./CameraRig";
import { featuredProjects } from "../../data/projects";

interface SceneProps {
  quality: number;
  onReady: () => void;
  onSelect: (slug: string) => void;
  onHover: (slug: string | null) => void;
}

/** Fires onReady after the first rendered frame. */
function ReadySignal({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    // A frame has certainly been produced once this effect + one rAF run.
    const id = requestAnimationFrame(() => onReady());
    return () => cancelAnimationFrame(id);
  }, [onReady]);
  useFrame(() => {});
  return null;
}

export default function Scene({ quality, onReady, onSelect, onHover }: SceneProps) {
  return (
    <Canvas
      dpr={quality > 0.5 ? [1, 2] : [1, 1.5]}
      camera={{ fov: 42, near: 0.1, far: 600, position: [0, 10, 44] }}
      gl={{ antialias: quality > 0.5, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden
    >
      <color attach="background" args={["#05060f"]} />
      <fog attach="fog" args={["#05060f", 90, 320]} />
      <ambientLight intensity={0.12} />
      <Starfield count={quality > 0.5 ? 3200 : 1300} />
      <Sun quality={quality} />
      <Orbits />
      {featuredProjects.map((p) => (
        <Planet key={p.slug} project={p} quality={quality} onSelect={onSelect} onHover={onHover} />
      ))}
      <AsteroidBelt quality={quality} />
      <Observatory />
      <CameraRig />
      <ReadySignal onReady={onReady} />
    </Canvas>
  );
}
