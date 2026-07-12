import { featuredProjects } from "../../data/projects";

/**
 * Mutable frame-rate store shared between the scroll/DOM world and the
 * three.js render loop. The 3D loop reads these values every frame
 * without triggering React re-renders.
 */
export const universeStore = {
  /** Continuous camera parameter: sectionIndex + eased local t (0 → sections-1). */
  camT: 0,
  /** Raw scroll progress 0..1 across the whole document. */
  progress: 0,
  /** Slug of the planet currently hovered, if any. */
  hovered: null as string | null,
  /** Slug of the project whose detail view is open (camera focus). */
  focused: null as string | null,
  /** Last pointer position in client coordinates (for the orbital cursor). */
  pointerX: 0,
  pointerY: 0,
  /** 0 = reduced quality (mobile / low-power), 1 = full. */
  quality: 1,
};

/**
 * Scroll chapters, in travel order. Derived from the project registry so
 * adding a featured project automatically adds its chapter and camera station.
 */
export const SECTION_IDS: string[] = [
  "hero",
  "journey",
  ...featuredProjects.map((p) => `project-${p.slug}`),
  "skills",
  "community",
  "about",
  "contact",
];

export type SectionId = string;

/** Anchor of the first project chapter — used by "skip to projects" links. */
export const PROJECTS_ANCHOR = `project-${featuredProjects[0].slug}`;

export const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: "hero", label: "Home" },
  { id: "journey", label: "Journey" },
  { id: PROJECTS_ANCHOR, label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "community", label: "Community" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];
