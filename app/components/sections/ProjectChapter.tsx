"use client";

import type { Project } from "../../data/types";
import type { SectionId } from "../universe/store";
import { SectionShell, Panel } from "./SectionShell";

interface ProjectChapterProps {
  project: Project;
  side: "left" | "right";
  index: number;
  total: number;
  onEnter: (slug: string) => void;
  children?: React.ReactNode;
}

/** A scroll chapter anchored to one project planet. */
export function ProjectChapter({ project, side, index, total, onEnter, children }: ProjectChapterProps) {
  const accent = project.planetStyle.atmosphere;

  return (
    <SectionShell id={`project-${project.slug}` as SectionId} label={project.title} side={side}>
      <Panel>
        <div className="flex items-baseline justify-between gap-4">
          <p className="microlabel" style={{ color: accent }}>
            {project.category}
          </p>
          <p className="font-mono text-xs text-ink-soft">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>

        <h2 className="font-display mt-4 text-4xl leading-tight text-ink sm:text-5xl">
          {project.title}
        </h2>

        <p className="mt-5 leading-relaxed text-ink-muted">{project.summary}</p>

        <p className="mt-5 text-sm text-ink-soft">
          <span className="microlabel mr-2 text-ink-soft">Role</span>
          <span className="text-ink-muted">{project.role}</span>
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.technologies.slice(0, 6).map((t) => (
            <li key={t} className="rounded-sm border border-rule px-2.5 py-1 font-mono text-xs text-ink-muted">
              {t}
            </li>
          ))}
          {project.technologies.length > 6 && (
            <li className="px-1 py-1 font-mono text-xs text-ink-soft">
              +{project.technologies.length - 6} more
            </li>
          )}
        </ul>

        <div className="mt-7 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => onEnter(project.slug)}
            className="microlabel flex min-h-11 items-center gap-2 rounded-sm px-5 text-void transition-transform hover:scale-[1.02]"
            style={{ background: accent, boxShadow: `0 0 24px ${accent}33` }}
          >
            Enter project <span aria-hidden>→</span>
          </button>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="microlabel flex min-h-11 items-center rounded-sm border border-rule px-5 text-ink-muted transition-colors hover:border-rule-strong hover:text-ink"
            >
              Live site ↗
            </a>
          )}
        </div>
      </Panel>
      {children}
    </SectionShell>
  );
}
