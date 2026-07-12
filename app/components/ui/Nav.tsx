"use client";

import { useState } from "react";
import { NAV_ITEMS, PROJECTS_ANCHOR, type SectionId } from "../universe/store";
import { contact } from "../../data/profile";

interface NavProps {
  active: SectionId;
}

/** Minimal fixed navigation: wordmark, orbital section map, skip link. */
export function Nav({ active }: NavProps) {
  const [open, setOpen] = useState(false);

  const activeIndex = NAV_ITEMS.findIndex((n) =>
    n.id === PROJECTS_ANCHOR ? active.startsWith("project-") : n.id === active,
  );

  return (
    <>
      <a
        href={`#${PROJECTS_ANCHOR}`}
        className="microlabel fixed left-1/2 top-3 z-70 -translate-x-1/2 rounded-sm bg-panel/80 px-3 py-2 text-ink-muted opacity-0 backdrop-blur-md transition-opacity focus-visible:opacity-100"
      >
        Skip the journey — go to projects
      </a>

      <header
        data-print-hide
        className="pointer-events-none fixed inset-x-0 top-0 z-60 flex items-start justify-between px-5 py-5 sm:px-8"
      >
        <a
          href="#hero"
          className="pointer-events-auto flex items-center gap-3 rounded-sm bg-void/55 px-3 py-2 backdrop-blur-md"
          aria-label="Back to the beginning"
        >
          <span
            className="block h-2.5 w-2.5 rounded-full bg-sun"
            style={{ boxShadow: "0 0 12px 2px rgba(232,180,90,0.6)" }}
            aria-hidden
          />
          <span className="microlabel text-ink">Isaiah Ferguson</span>
          <span className="microlabel hidden text-ink-soft sm:inline">
            · A Universe of Impact
          </span>
        </a>

        <div className="pointer-events-auto flex items-center gap-4">
          <a
            href={`#${PROJECTS_ANCHOR}`}
            className="microlabel hidden rounded-sm border border-rule px-3 py-2 text-ink-muted transition-colors hover:border-rule-strong hover:text-ink md:inline-block"
          >
            Skip to projects
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close navigation" : "Open navigation"}
            className="flex h-11 w-11 items-center justify-center rounded-sm border border-rule bg-panel/70 text-ink backdrop-blur-md md:hidden"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              {open ? (
                <path strokeLinecap="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeWidth={1.5} d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Orbital map — desktop */}
      <nav
        data-print-hide
        aria-label="Sections"
        className="fixed right-8 top-1/2 z-60 hidden -translate-y-1/2 md:block"
      >
        <ul className="flex flex-col items-end gap-1">
          {NAV_ITEMS.map((item, i) => {
            const isActive = i === activeIndex;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className="group flex min-h-11 items-center justify-end gap-3 py-1"
                >
                  <span
                    className={`microlabel transition-all duration-300 ${
                      isActive
                        ? "text-sun opacity-100"
                        : "text-ink-soft opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span
                    aria-hidden
                    className={`block rounded-full transition-all duration-300 ${
                      isActive
                        ? "h-2.5 w-2.5 bg-sun shadow-[0_0_10px_2px_rgba(232,180,90,0.5)]"
                        : "h-1.5 w-1.5 bg-ink-soft group-hover:bg-ink-muted"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile overlay menu */}
      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-65 flex flex-col bg-void/95 px-8 pt-24 backdrop-blur-lg md:hidden"
        >
          <nav aria-label="Sections">
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={`font-display block py-3 text-3xl transition-colors ${
                      i === activeIndex ? "text-sun" : "text-ink hover:text-sun-bright"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto flex gap-6 pb-12">
            <a href={contact.github} target="_blank" rel="noopener noreferrer" className="microlabel flex min-h-11 items-center text-ink-muted">
              GitHub
            </a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="microlabel flex min-h-11 items-center text-ink-muted">
              LinkedIn
            </a>
            <a href={contact.resume} target="_blank" rel="noopener noreferrer" className="microlabel flex min-h-11 items-center text-ink-muted">
              Résumé
            </a>
          </div>
        </div>
      )}
    </>
  );
}
