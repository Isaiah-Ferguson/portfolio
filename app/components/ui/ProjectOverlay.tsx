"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Project } from "../../data/types";

interface ProjectOverlayProps {
  project: Project;
  onClose: () => void;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="microlabel mb-2 text-ink-soft">{label}</h4>
      {children}
    </div>
  );
}

/**
 * Project detail view — a station overlay that keeps the universe
 * visible behind it. Escape or "Return to orbit" closes it.
 */
export function ProjectOverlay({ project, onClose }: ProjectOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [onClose]);

  const accent = project.planetStyle.atmosphere;

  return (
    <div className="fixed inset-0 z-75 flex justify-end" role="dialog" aria-modal="true" aria-label={project.title}>
      {/* The universe stays visible through this veil; click it to return. */}
      <button
        type="button"
        aria-label="Return to orbit"
        onClick={onClose}
        className="absolute inset-0 cursor-pointer bg-void/45"
      />

      <div
        ref={panelRef}
        className="relative flex h-full w-full max-w-2xl flex-col overflow-y-auto border-l border-rule bg-space/90 backdrop-blur-xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-rule bg-space/95 px-6 py-4 backdrop-blur-xl sm:px-10">
          <p className="microlabel" style={{ color: accent }}>
            {project.category}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="microlabel flex min-h-11 items-center gap-2 rounded-sm border border-rule px-4 text-ink-muted transition-colors hover:border-rule-strong hover:text-ink"
          >
            <span aria-hidden>←</span> Return to orbit
          </button>
        </div>

        <div className="flex flex-col gap-10 px-6 py-10 sm:px-10">
          <div>
            <h3 className="font-display text-4xl text-ink sm:text-5xl">{project.title}</h3>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">{project.summary}</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <Field label="Isaiah's Role">
              <p className="leading-relaxed text-ink">{project.role}</p>
            </Field>
            <Field label="Technologies">
              <ul className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <li
                    key={t}
                    className="rounded-sm border border-rule px-2.5 py-1 font-mono text-xs text-ink-muted"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Field>
          </div>

          <Field label="The Problem / Opportunity">
            <p className="leading-relaxed text-ink-muted">{project.challenge}</p>
          </Field>

          <Field label="The Solution">
            <p className="leading-relaxed text-ink-muted">{project.solution}</p>
          </Field>

          {project.responsibilities.length > 0 && (
            <Field label="Responsibilities">
              <ul className="flex flex-col gap-2.5">
                {project.responsibilities.map((r) => (
                  <li key={r} className="flex gap-3 leading-relaxed text-ink-muted">
                    <span aria-hidden className="mt-2.5 block h-1 w-1 shrink-0 rounded-full" style={{ background: accent }} />
                    {r}
                  </li>
                ))}
              </ul>
            </Field>
          )}

          {project.process.length > 0 && (
            <Field label="Design & Development Process">
              <ol className="flex flex-col gap-3">
                {project.process.map((step, i) => (
                  <li key={step} className="flex gap-4 leading-relaxed text-ink-muted">
                    <span className="font-mono text-xs" style={{ color: accent }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </Field>
          )}

          {project.features.length > 0 && (
            <Field label="Key Features">
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li key={f} className="rounded-md border border-rule bg-panel/60 px-4 py-3 text-sm leading-relaxed text-ink-muted">
                    {f}
                  </li>
                ))}
              </ul>
            </Field>
          )}

          <Field label="Results & Impact">
            <p className="leading-relaxed text-ink-muted">{project.impact}</p>
          </Field>

          {project.images.length > 0 && (
            <Field label="Gallery">
              <div className="grid gap-4 sm:grid-cols-2">
                {project.images.map((img) => (
                  <figure key={img.caption} className="overflow-hidden rounded-md border border-rule">
                    {img.src ? (
                      <div className="relative aspect-video">
                        <Image src={img.src} alt={img.alt} fill sizes="(max-width: 640px) 100vw, 320px" className="object-cover" />
                      </div>
                    ) : (
                      <div
                        className="flex aspect-video items-center justify-center bg-panel/50"
                        role="img"
                        aria-label={`${img.alt} — image placeholder`}
                      >
                        <span className="microlabel text-ink-soft">Image slot</span>
                      </div>
                    )}
                    <figcaption className="border-t border-rule px-3 py-2 font-mono text-xs text-ink-soft">
                      {img.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </Field>
          )}

          {(project.liveUrl || project.repositoryUrl) && (
            <div className="flex flex-wrap gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="microlabel flex min-h-11 items-center rounded-sm px-5 text-void transition-transform hover:scale-[1.02]"
                  style={{ background: accent }}
                >
                  Visit live site ↗
                </a>
              )}
              {project.repositoryUrl && (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="microlabel flex min-h-11 items-center rounded-sm border border-rule px-5 text-ink-muted transition-colors hover:text-ink"
                >
                  Source code ↗
                </a>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="microlabel mt-2 flex min-h-11 w-fit items-center gap-2 rounded-sm border border-rule px-5 text-ink-muted transition-colors hover:border-rule-strong hover:text-ink"
          >
            <span aria-hidden>←</span> Return to orbit
          </button>
        </div>
      </div>
    </div>
  );
}
