"use client";

import { additionalProjects } from "../../data/projects";

/** Shipped, linkable work beyond the featured planets. */
export function FurtherTransmissions() {
  if (additionalProjects.length === 0) return null;

  return (
    <div className="mt-6 rounded-lg border border-rule bg-void/60 p-7 backdrop-blur-md sm:p-8">
      <p className="microlabel mb-5 text-ink-soft">Further transmissions — more shipped work</p>
      <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {additionalProjects.map((p) => (
          <li key={p.slug}>
            {p.liveUrl ? (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-11 flex-col justify-center py-1"
              >
                <span className="flex items-center gap-2 font-medium text-ink transition-colors group-hover:text-sun-bright">
                  {p.title}
                  <span aria-hidden className="text-xs text-ink-soft transition-transform group-hover:translate-x-0.5">
                    ↗
                  </span>
                </span>
                <span className="mt-0.5 font-mono text-xs text-ink-soft">{p.category}</span>
              </a>
            ) : (
              <div className="flex min-h-11 flex-col justify-center py-1">
                <span className="font-medium text-ink">{p.title}</span>
                <span className="mt-0.5 font-mono text-xs text-ink-soft">{p.category}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
