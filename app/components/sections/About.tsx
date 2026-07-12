"use client";

import Image from "next/image";
import { about } from "../../data/profile";
import { SectionShell, Panel } from "./SectionShell";

/** The quiet region: a personal observatory away from the main orbits. */
export function About() {
  return (
    <SectionShell id="about" label="About Isaiah" side="left" wide>
      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <Panel>
          <p className="microlabel mb-3 text-violet">The observatory</p>
          <h2 className="font-display text-4xl text-ink sm:text-5xl">About Isaiah</h2>
          <p className="mt-6 leading-relaxed text-ink-muted">{about.bio}</p>

          <div className="mt-8 border-l-2 border-violet/40 pl-5">
            <p className="microlabel mb-2 text-ink-soft">Beyond the keyboard</p>
            <p className="leading-relaxed text-ink-muted">{about.martialArtsDetail}</p>
            <p className="font-display mt-4 text-xl italic leading-snug text-ink">
              “{about.martialArts}”
            </p>
          </div>
        </Panel>

        {/* Holographic memories orbiting the observatory */}
        <div className="flex flex-col gap-5">
          {about.photos.map((photo, i) => (
            <figure
              key={photo.caption}
              className={`overflow-hidden rounded-lg border border-rule bg-void/60 backdrop-blur-md ${
                i === 1 ? "lg:translate-x-6" : i === 2 ? "lg:-translate-x-3" : ""
              }`}
            >
              {photo.src ? (
                <div className="relative aspect-[4/3]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(160deg, rgba(169,155,245,0.12), transparent 40%, rgba(5,6,15,0.35))",
                    }}
                  />
                </div>
              ) : (
                <div
                  className="flex aspect-[4/3] flex-col items-center justify-center gap-2 bg-panel/40"
                  role="img"
                  aria-label={`${photo.alt} — photo placeholder`}
                >
                  <span aria-hidden className="block h-8 w-8 rounded-full border border-rule-strong opacity-60" />
                  <span className="microlabel text-ink-soft">Photo slot</span>
                </div>
              )}
              <figcaption className="border-t border-rule px-4 py-2.5 font-mono text-xs text-ink-soft">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
