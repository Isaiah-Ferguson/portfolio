"use client";

import { useEffect, useRef } from "react";
import { universeStore } from "../universe/store";
import { getProject } from "../../data/projects";

/**
 * Orbital pointer + label that trails the cursor while a planet is hovered.
 * Position is written directly to the DOM each frame — no re-renders.
 */
export function PlanetCursor({ hovered }: { hovered: string | null }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hovered) return;
    let raf = 0;
    const tick = () => {
      if (ref.current) {
        ref.current.style.transform = `translate(${universeStore.pointerX + 18}px, ${universeStore.pointerY + 18}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hovered]);

  const project = hovered ? getProject(hovered) : undefined;
  if (!project) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-70 hidden md:block"
      style={{
        transform: `translate(${universeStore.pointerX + 18}px, ${universeStore.pointerY + 18}px)`,
      }}
    >
      <div className="flex items-center gap-2 rounded-sm border border-rule bg-void/85 py-2 pl-2 pr-3 backdrop-blur-md">
        <span
          className="relative block h-4 w-4 rounded-full border"
          style={{ borderColor: project.planetStyle.atmosphere }}
        >
          <span
            className="absolute left-1/2 top-1/2 block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: project.planetStyle.atmosphere }}
          />
        </span>
        <span className="microlabel text-ink">{project.shortTitle}</span>
        <span className="microlabel text-ink-soft">· Enter project</span>
      </div>
    </div>
  );
}
