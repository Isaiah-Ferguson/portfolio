"use client";

import { community } from "../../data/profile";
import { SectionShell, Panel } from "./SectionShell";

/** Network positions for the connected-lights backdrop (viewBox 0 0 100 40). */
const NODES = [
  { x: 8, y: 12 }, { x: 22, y: 28 }, { x: 34, y: 8 }, { x: 47, y: 22 },
  { x: 58, y: 6 }, { x: 66, y: 30 }, { x: 78, y: 14 }, { x: 90, y: 26 },
  { x: 15, y: 36 }, { x: 41, y: 34 }, { x: 84, y: 4 }, { x: 95, y: 10 },
];
const LINKS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7],
  [1, 8], [3, 9], [6, 10], [7, 11], [2, 4], [5, 9],
];

/** A region of connected lights: schools, students, partners, community. */
export function Community() {
  return (
    <SectionShell id="community" label="Community impact" side="right" wide>
      <Panel className="relative overflow-hidden">
        <svg
          viewBox="0 0 100 40"
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
          preserveAspectRatio="xMidYMid slice"
        >
          {LINKS.map(([a, b], i) => (
            <line
              key={i}
              x1={NODES[a].x}
              y1={NODES[a].y}
              x2={NODES[b].x}
              y2={NODES[b].y}
              stroke="#8ed3e6"
              strokeWidth={0.08}
              opacity={0.5}
            />
          ))}
          {NODES.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r={0.55} fill={i % 3 === 0 ? "#e8b45a" : "#8ed3e6"}>
              <animate
                attributeName="opacity"
                values="0.4;1;0.4"
                dur={`${3 + (i % 4)}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </svg>

        <div className="relative">
          <p className="microlabel mb-3 text-cyan">A constellation of people</p>
          <h2 className="font-display text-4xl text-ink sm:text-5xl">Community impact</h2>
          <blockquote className="font-display mt-6 max-w-2xl text-2xl italic leading-snug text-ink sm:text-[1.7rem]">
            “{community.statement}”
          </blockquote>
          <p className="mt-5 max-w-2xl leading-relaxed text-ink-muted">
            Isaiah&apos;s work extends past the editor. Each light in this region is a relationship
            — a school visited, a student mentored, a partner organization connected to the next
            generation of Stockton technologists.
          </p>

          <ul className="mt-9 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {community.pillars.map((p) => (
              <li key={p.title} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-cyan shadow-[0_0_8px_1px_rgba(142,211,230,0.5)]"
                />
                <div>
                  <h3 className="font-medium text-ink">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{p.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Panel>
    </SectionShell>
  );
}
