"use client";

import Image from "next/image";
import { identity, about } from "../../data/profile";
import { PROJECTS_ANCHOR } from "../universe/store";
import { SectionShell } from "./SectionShell";

/** Arrival: the establishing shot of the whole system. */
export function Hero() {
  return (
    <SectionShell id="hero" label="Introduction" side="center">
      <div className="flex flex-col items-center text-center">
        {/* Mission badge: the human at the center of the universe */}
        {about.photos[0].src && (
        <div className="relative mb-6 h-24 w-24 sm:h-28 sm:w-28">
          <div
            aria-hidden
            className="absolute -inset-1.5 rounded-full border border-sun/40"
            style={{ boxShadow: "0 0 24px rgba(232,180,90,0.25), inset 0 0 18px rgba(232,180,90,0.12)" }}
          />
          <span
            aria-hidden
            className="absolute -top-1.5 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-sun"
            style={{ boxShadow: "0 0 8px 2px rgba(232,180,90,0.6)" }}
          />
          <Image
            src={about.photos[0].src}
            alt={about.photos[0].alt}
            fill
            sizes="112px"
            priority
            className="rounded-full object-cover"
          />
        </div>
        )}

        <p className="microlabel mb-6 text-ink-soft">{identity.organization}</p>

        <h1
          className="font-display text-6xl leading-[0.95] text-ink sm:text-7xl lg:text-8xl"
          style={{ textShadow: "0 0 60px rgba(169, 155, 245, 0.25)" }}
        >
          Isaiah
          <br />
          Ferguson
        </h1>

        <p className="microlabel mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-ink-muted">
          {identity.roles.map((r, i) => (
            <span key={r} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden className="text-sun">
                  ·
                </span>
              )}
              {r}
            </span>
          ))}
        </p>

        <p className="mt-7 max-w-lg rounded-md bg-void/55 px-5 py-3 text-lg leading-relaxed text-ink-muted backdrop-blur-sm">
          {identity.intro}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#journey"
            className="microlabel flex min-h-12 items-center rounded-sm bg-sun px-7 text-void transition-all hover:bg-sun-bright"
            style={{ boxShadow: "0 0 30px rgba(232, 180, 90, 0.25)" }}
          >
            Explore my universe
          </a>
          <a
            href={`#${PROJECTS_ANCHOR}`}
            className="microlabel flex min-h-12 items-center rounded-sm border border-rule bg-void/70 px-6 text-ink-muted backdrop-blur-md transition-colors hover:border-rule-strong hover:text-ink"
          >
            View projects
          </a>
          <a
            href="#about"
            className="microlabel flex min-h-12 items-center rounded-sm border border-rule bg-void/70 px-6 text-ink-muted backdrop-blur-md transition-colors hover:border-rule-strong hover:text-ink"
          >
            About my journey
          </a>
          <a
            href="#contact"
            className="microlabel flex min-h-12 items-center rounded-sm border border-rule bg-void/70 px-6 text-ink-muted backdrop-blur-md transition-colors hover:border-rule-strong hover:text-ink"
          >
            Contact me
          </a>
        </div>

        <div className="mt-12 flex flex-col items-center gap-2" aria-hidden>
          <span className="microlabel text-ink-soft">Scroll to travel</span>
          <span className="block h-10 w-px animate-pulse bg-linear-to-b from-sun/70 to-transparent" />
        </div>
      </div>
    </SectionShell>
  );
}
