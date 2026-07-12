/** Visual identity of a project's celestial body. */
export interface PlanetStyle {
  /** Base surface colors blended by the procedural shader. */
  colorA: string;
  colorB: string;
  colorC: string;
  /** Atmospheric rim glow. */
  atmosphere: string;
  /** Planet radius in scene units. */
  radius: number;
  /** Surface character — drives the shader's pattern mix. */
  surface: "structured" | "modular" | "warm" | "translucent" | "network";
  /** Optional ring system. */
  ring?: { color: string; inner: number; outer: number; tilt: number };
  /** Number of small satellite moons. */
  moons: number;
  /** Self-rotation speed (radians/sec at rest). */
  spin: number;
}

/** Position of the body within the solar system. */
export interface OrbitalPosition {
  /** Distance from the sun in scene units. */
  distance: number;
  /** Angle around the sun in radians. */
  angle: number;
  /** Vertical offset from the ecliptic plane. */
  inclination: number;
}

export interface ProjectImage {
  src: string | null;
  alt: string;
  caption: string;
}

export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  summary: string;
  role: string;
  responsibilities: string[];
  challenge: string;
  solution: string;
  process: string[];
  features: string[];
  impact: string;
  technologies: string[];
  images: ProjectImage[];
  liveUrl: string | null;
  repositoryUrl: string | null;
  featured: boolean;
  planetStyle: PlanetStyle;
  orbitalPosition: OrbitalPosition;
}

export interface JourneyMilestone {
  year: string;
  title: string;
  detail: string;
}

export interface SkillNode {
  id: string;
  label: string;
  /** ids of related skills in other constellations, illuminated on hover. */
  related: string[];
  /** Position within the constellation map (0–100 viewBox units). */
  x: number;
  y: number;
}

export interface SkillConstellation {
  id: string;
  name: string;
  color: string;
  skills: SkillNode[];
}
