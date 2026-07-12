"use client";

import { useState } from "react";
import { journey, sunResponsibilities, techOrbit } from "../../data/profile";
import { SectionShell, Panel } from "./SectionShell";

/**
 * The sun chapter: SJCOE & CodeStack Academy — the center of the universe.
 * Student → Junior Web Developer → Coding Advocate, a role that today
 * includes project leadership and mentorship.
 */
export function Journey() {
  const [openMoon, setOpenMoon] = useState<string | null>(sunResponsibilities[0].id);

  return (
    <SectionShell id="journey" label="The journey — SJCOE and CodeStack Academy" side="left" wide>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Panel>
          <p className="microlabel mb-4 text-sun">The center of this universe</p>
          <h2 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
            CodeStack Academy
            <span className="mt-1 block text-2xl text-ink-muted sm:text-[1.7rem]">
              San Joaquin County Office of Education
            </span>
          </h2>
          <p className="mt-6 leading-relaxed text-ink-muted">
            Everything here orbits one story. Isaiah walked into CodeStack Academy as a student in
            2023 — and never really left. He became a Junior Web Developer building systems for the
            county, then the academy&apos;s Coding Advocate, and today he leads projects and mentors
            the next class of developers in the same classrooms where he learned to code.
          </p>

          {/* Student → Mentor: the orbital timeline */}
          <ol className="relative mt-9 flex flex-col gap-0 border-l border-rule pl-6">
            {journey.map((m, i) => (
              <li key={m.title} className={i === journey.length - 1 ? "" : "pb-7"}>
                <span
                  aria-hidden
                  className={`absolute -left-1.25 mt-1.5 block h-2.5 w-2.5 rounded-full ${
                    i === journey.length - 1
                      ? "bg-sun shadow-[0_0_10px_2px_rgba(232,180,90,0.5)]"
                      : "bg-rule-strong"
                  }`}
                />
                <p className="microlabel text-sun">{m.year}</p>
                <h3 className="mt-1 text-lg font-medium text-ink">{m.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{m.detail}</p>
              </li>
            ))}
          </ol>
        </Panel>

        <div className="flex flex-col gap-6">
          <Panel>
            <p className="microlabel mb-5 text-ink-soft">Moons of the sun — what Isaiah does</p>
            <ul className="flex flex-col divide-y divide-rule">
              {sunResponsibilities.map((r) => {
                const open = openMoon === r.id;
                return (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => setOpenMoon(open ? null : r.id)}
                      aria-expanded={open}
                      className="flex min-h-11 w-full items-center justify-between gap-4 py-3 text-left"
                    >
                      <span className={`font-medium transition-colors ${open ? "text-sun" : "text-ink"}`}>
                        {r.title}
                      </span>
                      <span
                        aria-hidden
                        className={`text-ink-soft transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                      >
                        +
                      </span>
                    </button>
                    {open && (
                      <p className="pb-4 text-sm leading-relaxed text-ink-muted">{r.detail}</p>
                    )}
                  </li>
                );
              })}
            </ul>
          </Panel>

          <Panel>
            <p className="microlabel mb-4 text-ink-soft">Satellites in orbit — the working stack</p>
            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
              {techOrbit.map((t, i) => (
                <span
                  key={t}
                  className="font-mono text-ink-muted"
                  style={{
                    fontSize: `${0.68 + (i % 3) * 0.07}rem`,
                    opacity: 0.65 + (i % 4) * 0.11,
                  }}
                >
                  {t}
                  {i < techOrbit.length - 1 && (
                    <span aria-hidden className="ml-3 text-rule-strong">
                      ✦
                    </span>
                  )}
                </span>
              ))}
            </p>
          </Panel>
        </div>
      </div>
    </SectionShell>
  );
}
