"use client";

import { useEffect, useState } from "react";

/**
 * Cinematic arrival: a point of light expands into the universe while
 * real load milestones drive the progress readout.
 */
export function Loader({ progress, done }: { progress: number; done: boolean }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => setHidden(true), 900);
      return () => clearTimeout(t);
    }
  }, [done]);

  if (hidden) return null;

  return (
    <div
      role="status"
      aria-label={done ? "Universe loaded" : `Loading universe: ${Math.round(progress)}%`}
      className={`fixed inset-0 z-80 flex flex-col items-center justify-center bg-void transition-opacity duration-700 ${
        done ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* The point of light */}
      <div className="relative flex h-40 w-40 items-center justify-center">
        <div
          className="absolute rounded-full bg-sun-bright transition-all duration-700 ease-out"
          style={{
            width: `${6 + progress * 0.5}px`,
            height: `${6 + progress * 0.5}px`,
            boxShadow: `0 0 ${20 + progress * 1.2}px ${6 + progress * 0.35}px rgba(232, 180, 90, 0.45), 0 0 ${60 + progress * 2}px ${16 + progress}px rgba(169, 155, 245, 0.12)`,
          }}
        />
        <div
          className="absolute rounded-full border border-sun/25 transition-all duration-1000 ease-out"
          style={{
            width: `${40 + progress * 1.1}px`,
            height: `${40 + progress * 1.1}px`,
            opacity: 0.5 - progress * 0.003,
          }}
        />
      </div>

      <div className="mt-10 flex w-56 flex-col items-center gap-3">
        <div className="h-px w-full overflow-hidden bg-rule">
          <div
            className="h-full bg-sun transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="microlabel text-ink-soft">
          {done ? "Universe ready" : `Igniting the sun · ${Math.round(progress)}%`}
        </p>
      </div>
    </div>
  );
}
