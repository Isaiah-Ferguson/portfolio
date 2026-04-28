<!-- BASELINE — captured 2026-04-28 from app/page.tsx + app/globals.css before $impeccable shape reshape. This file documents the CURRENT state, which PRODUCT.md flags as the bootcamp-grad anti-reference. Re-run $impeccable document after the reshape lands. -->

---
name: Isaiah Ferguson Portfolio
description: Personal portfolio for a Coding Advocate / .NET + Next.js engineer
colors:
  surface: "#0b1326"
  surface-container-lowest: "#060e20"
  surface-container-low: "#131b2e"
  surface-container: "#1a2337"
  surface-container-high: "#222a3d"
  surface-container-highest: "#2a3347"
  surface-variant: "#2d3449"
  primary: "#b5fff0"
  primary-container: "#5eead4"
  on-primary: "#0b1326"
  on-surface: "#dae2fd"
  on-surface-variant: "#a8b3d1"
  on-tertiary-container: "#565c63"
  outline-variant: "#3c4946"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "3.5rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "normal"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "normal"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body-large:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.1em"
rounded:
  xs: "0.125rem"
  sm: "0.375rem"
  md: "0.5rem"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2.75rem"
  xl: "4rem"
  2xl: "5.5rem"
  3xl: "7rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: "0.75rem 2rem"
  button-secondary:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "0.75rem 2rem"
  tag-pill:
    backgroundColor: "{colors.surface-container-highest}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "0.175rem 0.5rem"
  card-article:
    backgroundColor: "{colors.surface-container}"
    rounded: "{rounded.md}"
    padding: "1.5rem"
  nav-item-active:
    textColor: "{colors.primary}"
  nav-item-inactive:
    textColor: "{colors.on-tertiary-container}"
---

# Design System: Isaiah Ferguson Portfolio (Baseline)

> ⚠ This file is a **pre-reshape baseline**. PRODUCT.md classifies this exact aesthetic as the "bootcamp-grad dev portfolio" anti-reference. The system is documented here so the post-reshape `$impeccable document` run has a before/after to compare. Do not propagate these tokens into new work.

## 1. Overview

**Creative North Star: "The Brittany Chiang Clone."**

The current portfolio inherits the most-cloned developer-portfolio template of the last five years: a fixed left rail with a name + role + horizontal-line nav, paired with a right scroll column of About / Experience / Projects / Skills, accented with hover-dim-others on each entry. Layered onto that template is a dark navy + mint-cyan palette (Material-style surface ramp from `#060e20` through `#2a3347`, with a `#b5fff0` mint accent) and a single typeface (Inter) carrying every text role through weight contrast. The result is internally consistent and functionally clean — semantic landmarks, working scroll-spy, real responsive behavior — but compositionally indistinguishable from thousands of other developer portfolios.

The system explicitly rejects color and typographic risk. Every move is the safe one. Where PRODUCT.md asks for "evidence-led, sober, distinctive," the visual layer delivers "category-default, dark, generic." This is the gap the reshape is meant to close.

**Key Characteristics:**
- Dark navy ground with a single mint-cyan accent (Restrained color strategy).
- Single-typeface system (Inter, weights 400 / 500 / 600 / 700).
- Material-style tonal-layer ramp instead of shadows.
- Repeated card composition for both Experience and Projects (six entries, one shape).
- Fixed-rail desktop layout, hamburger-driven mobile layout, single `lg:` breakpoint at 1024px.

## 2. Colors: The Dev-Portfolio Default Palette

A high-contrast dark palette with one mint accent. The neutrals are a Material-derived tonal ramp. The accent is a near-clone of the most common dev-portfolio cyan-mint.

### Primary
- **Mint Cyan** (#b5fff0): The single accent. Used on the active nav indicator, project tag-pill text, primary CTA gradient, and hover-state highlights. Carries roughly 5% of the surface area at any given time. Pure category reflex — a hiring manager has seen this hue on dozens of portfolios.
- **Mint Cyan Deeper** (#5eead4): Gradient endpoint for the primary CTA button. Pairs with the lighter mint as a soft top-to-bottom gradient on `Contact Me` and `View Resume`.

### Neutral (the ramp does the heavy lifting)
- **Surface Base** (#0b1326): The page ground. Sits behind the left rail and below the scrolling column.
- **Surface Container — Lowest** (#060e20): The single deepest tone, used for footer / outermost wells.
- **Surface Container — Low** (#131b2e): The scrolling main column's background.
- **Surface Container** (#1a2337): The hover background for cards and articles, applied with `/80` opacity + backdrop blur for a glass-adjacent (but restrained) effect.
- **Surface Container — High** (#222a3d): One step up from default container; used sparingly.
- **Surface Container — Highest** (#2a3347): The chip / tag-pill background.
- **On-Surface** (#dae2fd): Body text. Light blue-tinted off-white. ≈12 : 1 contrast against the surface base — passes WCAG AA comfortably.
- **On-Surface Variant** (#a8b3d1): Secondary text. ≈7 : 1 contrast — passes WCAG AA.
- **On-Tertiary Container** (#565c63): Tertiary text — dates, inactive nav labels, footer copy. **Fails WCAG AA at 2.7 : 1 against the surface base.** This token is the contrast bug.
- **Outline Variant** (#3c4946): Borders, dividers, the footer top-rule.

### Named Rules

**The Category-Reflex Rule.** Dark navy + mint-cyan is the developer-portfolio category default. The current palette is honest about that. The reshape must move out of this lane — either by inverting (warm light theme) or by committing harder (Drenched / Committed strategy with one saturated hue).

**The Failing-Token Rule.** `on-tertiary-container` (#565c63) is below WCAG AA contrast against the page ground. Any continued use of this token must lighten it to ≥#7d8794 (≈4.6 : 1).

## 3. Typography

**Display Font:** Inter (system-ui, sans-serif fallback)
**Body Font:** Inter (same family — single-family system)

**Character:** The most-loaded webfont in the world. Inter does its job — it's neutral, legible, and ships in four weights. It is also on the brand register's reflex-reject list as the AI-default sans-serif. The current system uses it because it's what the Next.js starter ships with. This is exactly the "training-data default" the brand register warns against.

### Hierarchy

- **Display** (700, 3.5rem / 56px, line-height 1.1): The desktop sidebar `<h1>` ("Isaiah Ferguson"). The single largest type on the page.
- **Headline** (700, 2.5rem / 40px on `lg`, drops to 2rem / 32px on mobile, line-height 1.15): Hero `<h2>` ("Empowering the Next Generation Through Code"). Step jumps at `lg` breakpoint instead of fluid `clamp()`.
- **Title** (600, 1.5rem / 24px, line-height 1.3): Section `<h2>` headers (About, Experience, Projects, Skills). Currently nudged with `-ml-[1rem]` to compensate for a flat hierarchy.
- **Subtitle** (500–600, 1.125rem / 18px, line-height 1.4): Hero supporting copy + Experience / Project entry titles.
- **Body** (400, 1rem / 16px, line-height 1.6): Prose paragraphs in About, Experience descriptions, Project descriptions.
- **Label** (600, 0.75rem / 12px, letter-spacing 0.1em, UPPERCASE): Nav labels in the desktop sidebar, date strings on Experience entries, tag-pill text.

### Named Rules

**The Single-Family Rule.** Every text role on this site is Inter. Hierarchy is created by weight + size only. This is the safest typographic decision available; it is also the least distinctive.

**The Reflex-Reject Rule.** Inter is on the brand register's banned-by-reflex list. Future passes must replace it with a typeface chosen for the brand voice (confident craftsman, sober, evidence-led), not because it's the Next.js default.

## 4. Elevation

The system is **flat-by-default with tonal layering for depth.** No `box-shadow` declarations exist anywhere in the codebase. Depth is conveyed entirely through the surface-container ramp (`#060e20` → `#2a3347`, six tonal steps).

The only shadow-adjacent treatment is `hover:shadow-lg hover:shadow-primary/20` on the primary CTA button — a soft mint glow on hover. It is the single elevation moment in the entire design.

The hover state on Experience and Project cards uses `bg-surface-container/80 backdrop-blur-md` to lift entries — a glass-adjacent layering effect, not a shadow.

### Named Rules

**The Tonal-Only Rule.** Depth is communicated by surface tone, not by shadow. The single exception is the primary CTA's mint-glow hover, which functions as a focus signal more than an elevation signal.

## 5. Components

### Buttons

- **Shape:** Rounded-md (8px radius — `rounded-lg` in Tailwind). Consistent across both button variants.
- **Primary** (`Contact Me`): Linear gradient from `--color-primary` to `--color-primary-container`, with `--color-on-primary` text. 0.75rem × 2rem padding. Hover: `shadow-lg shadow-primary/20` + `scale-105`. Currently a `mailto:` anchor styled as a button.
- **Secondary** (`View Resume`): `--color-surface-container` ground, `--color-on-surface` text, 1px border at `--color-outline-variant/20`. Same padding as primary. Includes a leading download SVG. Hover: surface-container-high background + scale-105.
- **Hover / Focus:** Both buttons use `transform: scale(1.05)` on hover. **No `:focus-visible` style is defined.** Keyboard users get the browser default focus ring.

### Tag Pills (Tech Tags)

- **Style:** `--color-surface-container-highest` ground, `--color-primary` text. 0.75rem semibold, 0.5rem × 0.175rem padding. `rounded-md` (6px).
- **Used at:** Every Experience entry (skills used in role), every Project entry (tech stack), every Skills section group.
- **Volume:** ~50 pills appear across the page. The repetition is itself a signature, but a generic one — every dev portfolio uses this exact chip pattern.

### Cards / Article Entries (Experience + Projects)

- **Corner Style:** `rounded-lg` (8px). Same radius as buttons.
- **Background:** Transparent at rest. On hover: `bg-surface-container/80` + `backdrop-blur-md`.
- **Border:** None at rest.
- **Internal Padding:** 1.5rem (24px) all sides; the article uses `-mx-[1.5rem]` to extend the hover surface beyond the column gutter for an immersive hover feel.
- **Hover behavior:** `translate-x-[2px]` on hover; siblings dim to `opacity-50` while the hovered entry stays at `100`. This dim-others-on-hover pattern is the most-cloned interaction on the original Brittany Chiang template.

### Navigation

#### Desktop Sidebar Nav
- **Style:** Vertical stack. Each item is a horizontal flex row of a thin growing line + uppercase label.
- **Inactive:** Line is `w-[1rem]` (16px), color `bg-on-tertiary-container` (#565c63). Label is `text-on-tertiary-container` 0.75rem semibold uppercase, letter-spacing 0.1em.
- **Active:** Line grows to `w-[2rem]` (32px) with `bg-primary` color. Label switches to `text-primary`. Transition `duration-300`.
- **Hover (inactive):** Line grows to `w-[1.5rem]` and shifts to mint primary; label lightens.

#### Mobile Hamburger Menu
- **Trigger:** 24×24 icon SVG inside `p-2` button (40×40 tap area; below WCAG 2.5.5 minimum 44×44 by 4px).
- **Open state:** Full-screen overlay at `bg-surface-container/95` with `backdrop-blur-md`, vertical stack of nav links + social icons.
- **ARIA:** `aria-label="Toggle menu"` is set; `aria-expanded`, `aria-controls`, focus trap, and `Escape`-to-close are NOT implemented.

### Inputs

No form inputs exist anywhere in the current design (the only form was a contact modal that was removed in favor of `mailto:`).

### Hero Avatar

- **Shape:** 240×240 (mobile) → 280×280 (`lg`+) square with `rounded-lg` corners.
- **Treatment:** `ring-2 ring-primary/20` — a faint mint outline.
- **Image:** `/Isaiah.png`, served via `next/image` with `fill` + `sizes` + `priority`. Alt text: "Isaiah Ferguson" (could be richer per accessibility guidelines).

## 6. Do's and Don'ts

### Do:
- **Do** continue using semantic landmarks (`<header>`, `<aside>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`). The HTML is one of the few things that does not need to change in the reshape.
- **Do** keep the IntersectionObserver-based scroll-spy — it's the right tool for that job.
- **Do** keep using `next/image` with `sizes` + `priority` for any future imagery.
- **Do** preserve the named, dated, specific content (SEIS / 90% of CA districts / SJCOE / dated experience entries). The content is the strongest signal of credibility on the page.
- **Do** continue to define motion via `transform` properties only (`scale`, `translate`) and never animate layout properties.

### Don't:
- **Don't** keep the Brittany Chiang fixed-rail-with-growing-line + hover-dim-others layout. PRODUCT.md classifies it as the bootcamp-grad anti-reference; it is the single biggest reason the portfolio reads as generic.
- **Don't** keep Inter as the only typeface. Inter is on the brand register's [reflex-reject list](file:./.agents/skills/i-impeccable/reference/brand.md). Replace with a typeface chosen for the confident-craftsman voice.
- **Don't** keep `--color-on-tertiary-container` (#565c63) at 2.7 : 1 contrast. Lighten the token to ≥#7d8794 (≈4.6 : 1) before any visual is shipped.
- **Don't** drift toward edu-tech startup aesthetics — pastel gradients, friendly cartoon student illustrations, "we believe every child" mission copy. PRODUCT.md flags this as the strongest anti-reference.
- **Don't** drift toward corporate-consultant aesthetics — stock photos, navy/gray sterility, LinkedIn-flavored polish.
- **Don't** repeat identical card grids. Six entries of the same composition is monotony, not consistency.
- **Don't** ship without `:focus-visible` styles. A11y-conscious recruiters will Tab through the page and note the missing focus ring.
- **Don't** ship social-icon links smaller than 44×44 tap areas. Current 24×24 fails WCAG 2.5.5.
- **Don't** continue defaulting to dark + cyan for "developer portfolio." The category-reflex check fails on color alone.
- **Don't** keep the `-ml-[1rem]` heading nudge. If a heading needs to "pop," the hierarchy itself needs work — patching position is a band-aid.
- **Don't** use the `[arbitrary-value]` Tailwind syntax for spacing. Either use the design tokens or commit to a regular ratio scale.
- **Don't** keep the "Built with Next.js and Tailwind CSS." footer line. It's a tell-on-yourself that adds no value.

