import * as THREE from "three";
import { featuredProjects } from "../../data/projects";
import type { OrbitalPosition } from "../../data/types";
import { SECTION_IDS, type SectionId } from "../universe/store";

export function orbitalToWorld(o: OrbitalPosition): THREE.Vector3 {
  return new THREE.Vector3(
    Math.cos(o.angle) * o.distance,
    o.inclination,
    Math.sin(o.angle) * o.distance,
  );
}

export const planetPositions = new Map<string, THREE.Vector3>(
  featuredProjects.map((p) => [p.slug, orbitalToWorld(p.orbitalPosition)]),
);

/** Small personal body visited in the About chapter. */
export const OBSERVATORY_POS = new THREE.Vector3(-24, 3, 24);

interface Station {
  id: SectionId;
  position: THREE.Vector3;
  target: THREE.Vector3;
}

/**
 * Camera viewpoint for a planet: pulled back along its sun-line, raised,
 * and panned so the planet rests on one side of the frame while the
 * chapter's text panel occupies the other (sideSign +1 → planet screen-left).
 */
function planetStation(
  slug: string,
  radius: number,
  sideSign: number,
): { position: THREE.Vector3; target: THREE.Vector3 } {
  const p = planetPositions.get(slug)!;
  const outward = p.clone().normalize();
  const side = new THREE.Vector3(-outward.z, 0, outward.x);
  const position = p
    .clone()
    .add(outward.clone().multiplyScalar(radius * 4.1))
    .add(side.clone().multiplyScalar(radius * 1.1))
    .add(new THREE.Vector3(0, radius * 1.3, 0));
  const target = p.clone().add(side.multiplyScalar(radius * 1.5 * sideSign));
  return { position, target };
}

function station(id: SectionId, pos: [number, number, number], tgt: [number, number, number]): Station {
  return { id, position: new THREE.Vector3(...pos), target: new THREE.Vector3(...tgt) };
}

const featured = featuredProjects;

/** One camera keyframe per scroll section, in SECTION_IDS order. */
export const stations: Station[] = [
  // Slightly raised look-at keeps the sun in the frame's lower half,
  // clear of the hero copy.
  station("hero", [0, 15.5, 51], [0, 9.4, 0]),
  station("journey", [3.2, 2.2, 10.5], [0, 0.4, 0]),
  ...featured.map((p, i) => {
    // Alternate: even chapters put the text panel right → planet pans left.
    const s = planetStation(p.slug, p.planetStyle.radius, i % 2 === 0 ? 1 : -1);
    return {
      id: `project-${p.slug}` as SectionId,
      position: s.position,
      target: s.target,
    };
  }),
  station("skills", [-12, 11, -30], [-34, 20, -70]),
  station("community", [10, 6, -36], [44, 12, -78]),
  station("about", [-19.5, 4.6, 30.5], [OBSERVATORY_POS.x, OBSERVATORY_POS.y, OBSERVATORY_POS.z]),
  station("contact", [0, 17, 68], [0, 1, 0]),
];

// Keep the station list aligned with the scroll sections.
if (stations.length !== SECTION_IDS.length) {
  throw new Error("stations must match SECTION_IDS length");
}

/**
 * Close-up viewpoint used when a project detail view is open.
 * Returns null for projects without a planet (deep-linked minor bodies) —
 * the camera then simply stays on its scroll path.
 */
export function focusStation(slug: string): { position: THREE.Vector3; target: THREE.Vector3 } | null {
  const p = planetPositions.get(slug);
  const project = featured.find((f) => f.slug === slug);
  if (!p || !project) return null;
  const r = project.planetStyle.radius;
  const outward = p.clone().normalize();
  const side = new THREE.Vector3(-outward.z, 0, outward.x);
  return {
    position: p
      .clone()
      .add(outward.multiplyScalar(r * 2.2))
      .add(side.multiplyScalar(r * 1.2))
      .add(new THREE.Vector3(0, r * 0.7, 0)),
    target: p.clone(),
  };
}
