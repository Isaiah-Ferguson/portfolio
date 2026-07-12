"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { stations, focusStation } from "./stations";
import { universeStore } from "../universe/store";

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

/**
 * Scroll-driven camera: universeStore.camT is a continuous index into
 * the station list; a focused project overrides it with a close-up.
 * Everything is critically damped so motion stays cinematic, never abrupt.
 */
export function CameraRig() {
  const pos = useRef(stations[0].position.clone());
  const target = useRef(stations[0].target.clone());
  const desiredPos = useRef(new THREE.Vector3());
  const desiredTarget = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const { camT, focused, pointerX, pointerY } = universeStore;

    const focus = focused ? focusStation(focused) : null;
    if (focus) {
      desiredPos.current.copy(focus.position);
      desiredTarget.current.copy(focus.target);
    } else {
      const clamped = Math.min(Math.max(camT, 0), stations.length - 1);
      const i = Math.min(Math.floor(clamped), stations.length - 2);
      const t = smoothstep(clamped - i);
      desiredPos.current.lerpVectors(stations[i].position, stations[i + 1].position, t);
      desiredTarget.current.lerpVectors(stations[i].target, stations[i + 1].target, t);
    }

    // Gentle pointer parallax (disabled while reading a project).
    if (!focused) {
      const nx = (pointerX / Math.max(window.innerWidth, 1)) * 2 - 1;
      const ny = (pointerY / Math.max(window.innerHeight, 1)) * 2 - 1;
      desiredPos.current.x += nx * 0.6;
      desiredPos.current.y += -ny * 0.4;
    }

    const k = 1 - Math.exp(-delta * 2.6);
    pos.current.lerp(desiredPos.current, k);
    target.current.lerp(desiredTarget.current, k);

    state.camera.position.copy(pos.current);
    state.camera.lookAt(target.current);
  });

  return null;
}
