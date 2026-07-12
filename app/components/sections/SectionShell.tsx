"use client";

import type { SectionId } from "../universe/store";

interface SectionShellProps {
  id: SectionId;
  label: string;
  side?: "left" | "right" | "center";
  wide?: boolean;
  children: React.ReactNode;
}

/**
 * A scroll chapter. The section itself lets pointer events fall through
 * to the planets behind it; only the content panel captures them.
 */
export function SectionShell({ id, label, side = "left", wide = false, children }: SectionShellProps) {
  const justify =
    side === "center" ? "justify-center" : side === "right" ? "md:justify-end" : "md:justify-start";

  return (
    <section
      id={id}
      aria-label={label}
      className={`pointer-events-none relative z-10 flex min-h-screen w-full items-center px-5 py-24 sm:px-10 md:px-16 lg:px-24 ${justify}`}
    >
      <div
        className={`reveal pointer-events-auto w-full ${
          wide ? "max-w-5xl" : side === "center" ? "max-w-3xl" : "max-w-xl"
        }`}
        data-reveal
      >
        {children}
      </div>
    </section>
  );
}

/** Translucent panel that keeps the universe visible behind the copy. */
export function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-lg border border-rule bg-void/60 p-7 backdrop-blur-md sm:p-10 ${className}`}
    >
      {children}
    </div>
  );
}
