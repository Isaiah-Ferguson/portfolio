"use client";

import { useMemo, useState } from "react";
import { skillConstellations } from "../../data/profile";
import type { SkillNode } from "../../data/types";
import { SectionShell, Panel } from "./SectionShell";

interface FlatSkill extends SkillNode {
  color: string;
  constellation: string;
}

/** Interactive star map: hovering a skill illuminates its related disciplines. */
export function Skills() {
  const [hovered, setHovered] = useState<string | null>(null);

  const allSkills = useMemo<FlatSkill[]>(
    () =>
      skillConstellations.flatMap((c) =>
        c.skills.map((s) => ({ ...s, color: c.color, constellation: c.name })),
      ),
    [],
  );

  const byId = useMemo(() => new Map(allSkills.map((s) => [s.id, s])), [allSkills]);
  const hoveredSkill = hovered ? byId.get(hovered) : undefined;
  const litIds = useMemo(() => {
    if (!hoveredSkill) return new Set<string>();
    return new Set([hoveredSkill.id, ...hoveredSkill.related]);
  }, [hoveredSkill]);

  const isLit = (id: string) => litIds.size === 0 || litIds.has(id);

  return (
    <SectionShell id="skills" label="Skill constellations" side="center" wide>
      <Panel>
        <p className="microlabel mb-3 text-violet">Star charts</p>
        <h2 className="font-display text-4xl text-ink sm:text-5xl">Skill constellations</h2>
        <p className="mt-4 max-w-xl leading-relaxed text-ink-muted">
          Five constellations, one sky. Hover or focus a star to illuminate the disciplines it
          works with — front-end to back-end, cloud to classroom.
        </p>

        {/* Constellation map — pointer devices, md+ */}
        <svg
          viewBox="0 0 100 62"
          role="group"
          aria-label="Interactive map of skills grouped into five constellations"
          className="mt-8 hidden w-full md:block"
        >
          {/* In-constellation chains */}
          {skillConstellations.map((c) =>
            c.skills.slice(0, -1).map((s, i) => {
              const next = c.skills[i + 1];
              const lit = litIds.size === 0 || (litIds.has(s.id) && litIds.has(next.id));
              return (
                <line
                  key={`${s.id}-${next.id}`}
                  x1={s.x}
                  y1={s.y}
                  x2={next.x}
                  y2={next.y}
                  stroke={c.color}
                  strokeWidth={0.12}
                  opacity={lit ? 0.5 : 0.12}
                  style={{ transition: "opacity 0.4s" }}
                />
              );
            }),
          )}

          {/* Cross-constellation relations for the hovered star */}
          {hoveredSkill &&
            hoveredSkill.related.map((rid) => {
              const r = byId.get(rid);
              if (!r) return null;
              return (
                <line
                  key={`rel-${hoveredSkill.id}-${rid}`}
                  x1={hoveredSkill.x}
                  y1={hoveredSkill.y}
                  x2={r.x}
                  y2={r.y}
                  stroke="#e9ebf7"
                  strokeWidth={0.14}
                  strokeDasharray="0.6 0.5"
                  opacity={0.55}
                />
              );
            })}

          {allSkills.map((s) => {
            const lit = isLit(s.id);
            const active = hovered === s.id;
            return (
              <g
                key={s.id}
                tabIndex={0}
                role="img"
                aria-label={`${s.label} — ${s.constellation}`}
                onMouseEnter={() => setHovered(s.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(s.id)}
                onBlur={() => setHovered(null)}
                style={{ cursor: "pointer", outline: "none" }}
              >
                <circle
                  cx={s.x}
                  cy={s.y}
                  r={active ? 1.05 : 0.65}
                  fill={s.color}
                  opacity={lit ? 1 : 0.3}
                  style={{ transition: "opacity 0.4s, r 0.3s" }}
                />
                {active && (
                  <circle cx={s.x} cy={s.y} r={1.7} fill="none" stroke={s.color} strokeWidth={0.12} opacity={0.7} />
                )}
                <text
                  x={s.x}
                  y={s.y - 1.6}
                  textAnchor="middle"
                  fill={lit ? "#e9ebf7" : "#8288b0"}
                  opacity={lit ? 1 : 0.55}
                  style={{ fontSize: "1.55px", fontFamily: "var(--font-mono)", transition: "opacity 0.4s" }}
                >
                  {s.label}
                </text>
              </g>
            );
          })}

          {/* Constellation names */}
          {skillConstellations.map((c) => {
            const cx = c.skills.reduce((a, s) => a + s.x, 0) / c.skills.length;
            const maxY = Math.max(...c.skills.map((s) => s.y));
            return (
              <text
                key={c.id}
                x={cx}
                y={maxY + 3.4}
                textAnchor="middle"
                fill={c.color}
                opacity={0.85}
                style={{ fontSize: "1.35px", fontFamily: "var(--font-mono)", letterSpacing: "0.25px", textTransform: "uppercase" }}
              >
                {c.name}
              </text>
            );
          })}
        </svg>

        {/* Vertical storytelling — touch / small screens */}
        <div className="mt-8 flex flex-col gap-7 md:hidden">
          {skillConstellations.map((c) => (
            <div key={c.id}>
              <p className="microlabel mb-3" style={{ color: c.color }}>
                {c.name}
              </p>
              <ul className="flex flex-wrap gap-2">
                {c.skills.map((s) => {
                  const lit = isLit(s.id);
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => setHovered(hovered === s.id ? null : s.id)}
                        aria-pressed={hovered === s.id}
                        className="min-h-9 rounded-sm border px-3 py-1.5 font-mono text-xs transition-all duration-300"
                        style={{
                          borderColor: lit ? c.color : "var(--color-rule)",
                          color: lit ? "#e9ebf7" : "var(--color-ink-soft)",
                          background: hovered === s.id ? `${c.color}22` : "transparent",
                        }}
                      >
                        {s.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <p className="font-mono text-xs text-ink-soft">
            Tap a skill to illuminate its related disciplines.
          </p>
        </div>
      </Panel>
    </SectionShell>
  );
}
