"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { universeStore, SECTION_IDS, type SectionId } from "./store";
import { featuredProjects, getProject } from "../../data/projects";
import { Loader } from "../ui/Loader";
import { Nav } from "../ui/Nav";
import { PlanetCursor } from "../ui/PlanetCursor";
import { ProjectOverlay } from "../ui/ProjectOverlay";
import { Hero } from "../sections/Hero";
import { Journey } from "../sections/Journey";
import { ProjectChapter } from "../sections/ProjectChapter";
import { FurtherTransmissions } from "../sections/FurtherTransmissions";
import { Skills } from "../sections/Skills";
import { Community } from "../sections/Community";
import { About } from "../sections/About";
import { Contact } from "../sections/Contact";

// The WebGL scene never renders on the server (ssr:false is legal here:
// this file is a Client Component).
const Scene = dynamic(() => import("../scene/Scene"), { ssr: false });

type Mode = "detecting" | "webgl" | "fallback";

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function Universe() {
  const [mode, setMode] = useState<Mode>("detecting");
  const [progress, setProgress] = useState(8);
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<SectionId>("hero");
  const anchorsRef = useRef<number[]>([]);

  /* Capability detection — reduced motion or no WebGL gets the calm universe. */
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced || !detectWebGL()) {
        setMode("fallback");
        setProgress(100);
        setReady(true);
        return;
      }
      universeStore.quality =
        window.innerWidth < 768 || navigator.hardwareConcurrency <= 4 ? 0 : 1;
      setMode("webgl");
      setProgress(45);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const handleSceneReady = useCallback(() => {
    setProgress(100);
    setReady(true);
  }, []);

  /* Failsafe: never trap a visitor behind the loader. */
  useEffect(() => {
    if (mode !== "webgl" || ready) return;
    const t = setTimeout(() => {
      setProgress(100);
      setReady(true);
    }, 8000);
    return () => clearTimeout(t);
  }, [mode, ready]);

  /* Scroll → camera parameter + active section. */
  useEffect(() => {
    const measure = () => {
      anchorsRef.current = SECTION_IDS.map((id) => {
        const el = document.getElementById(id);
        return el ? el.offsetTop : 0;
      });
    };

    let activeId: SectionId = "hero";
    const onScroll = () => {
      const anchors = anchorsRef.current;
      if (anchors.length < 2) return;
      const y = window.scrollY;

      // Continuous station index for the camera.
      let t = 0;
      if (y <= anchors[0]) t = 0;
      else if (y >= anchors[anchors.length - 1]) t = anchors.length - 1;
      else {
        for (let i = 0; i < anchors.length - 1; i++) {
          if (y >= anchors[i] && y < anchors[i + 1]) {
            t = i + (y - anchors[i]) / Math.max(anchors[i + 1] - anchors[i], 1);
            break;
          }
        }
      }
      universeStore.camT = t;

      const doc = document.documentElement;
      universeStore.progress = y / Math.max(doc.scrollHeight - window.innerHeight, 1);

      // Nav state: nearest station wins.
      const nearest = SECTION_IDS[Math.min(Math.round(t), SECTION_IDS.length - 1)];
      if (nearest !== activeId) {
        activeId = nearest;
        setActive(nearest);
      }
    };

    measure();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    // Fonts/images can shift layout after mount; re-measure once settled.
    const settle = setTimeout(() => {
      measure();
      onScroll();
    }, 700);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      clearTimeout(settle);
    };
  }, [mode]);

  /* Pointer position for parallax + the orbital cursor. */
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      universeStore.pointerX = e.clientX;
      universeStore.pointerY = e.clientY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const applySelection = useCallback((slug: string | null) => {
    setSelected(slug);
    universeStore.focused = slug;
    setHovered(null);
    universeStore.hovered = null;
    document.body.style.cursor = "";
  }, []);

  /* Shareable deep links: ?project=<slug> opens the detail view. */
  const openProject = useCallback(
    (slug: string) => {
      applySelection(slug);
      const url = new URL(window.location.href);
      if (url.searchParams.get("project") !== slug) {
        url.searchParams.set("project", slug);
        window.history.pushState({ project: slug }, "", url);
      }
    },
    [applySelection],
  );

  const closeProject = useCallback(() => {
    applySelection(null);
    const url = new URL(window.location.href);
    if (url.searchParams.has("project")) {
      url.searchParams.delete("project");
      window.history.pushState({}, "", url);
    }
  }, [applySelection]);

  /* Open from the URL on arrival; keep the overlay in sync with back/forward. */
  useEffect(() => {
    const syncFromUrl = () => {
      const slug = new URLSearchParams(window.location.search).get("project");
      applySelection(slug && getProject(slug) ? slug : null);
    };
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [applySelection]);

  const handleHover = useCallback((slug: string | null) => {
    setHovered(slug);
    universeStore.hovered = slug;
  }, []);

  /* Reveal panels as they enter the viewport (both modes). */
  useEffect(() => {
    if (!ready) return;
    const els = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        }),
      { threshold: 0.15 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ready]);

  const selectedProject = selected ? getProject(selected) : undefined;

  return (
    <div className="relative">
      <Loader progress={progress} done={ready} />

      {/* The universe behind everything */}
      <div className="fixed inset-0 z-0" aria-hidden>
        {mode === "webgl" ? (
          <Scene
            quality={universeStore.quality}
            onReady={handleSceneReady}
            onSelect={openProject}
            onHover={handleHover}
          />
        ) : (
          <FallbackSky />
        )}
      </div>

      <Nav active={active} />
      <PlanetCursor hovered={hovered} />

      <main className="relative z-10">
        <Hero />
        <Journey />
        {featuredProjects.map((p, i) => (
          <ProjectChapter
            key={p.slug}
            project={p}
            side={i % 2 === 0 ? "left" : "right"}
            index={i}
            total={featuredProjects.length}
            onEnter={openProject}
          >
            {i === featuredProjects.length - 1 && <FurtherTransmissions />}
          </ProjectChapter>
        ))}
        <Skills />
        <Community />
        <About />
        <Contact />
      </main>

      {selectedProject && <ProjectOverlay project={selectedProject} onClose={closeProject} />}
    </div>
  );
}

/** Still, beautiful sky for reduced-motion or WebGL-less visits. */
function FallbackSky() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-void">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 108%, rgba(232,180,90,0.16), transparent 60%)," +
            "radial-gradient(ellipse 45% 35% at 18% 22%, rgba(169,155,245,0.10), transparent 65%)," +
            "radial-gradient(ellipse 50% 40% at 85% 30%, rgba(142,211,230,0.07), transparent 65%)",
        }}
      />
      <div className="css-stars" />
    </div>
  );
}
