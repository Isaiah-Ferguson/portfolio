# Product

## Register

brand

## Users

Two audiences in equal weight, both screening Isaiah within 60–120 seconds:

1. **Hiring managers and senior engineers** evaluating Isaiah for software roles. Context: triaging a stack of portfolios between meetings, looking for evidence of taste, technical depth, and shippable work. They will judge the portfolio's design as a proxy for Isaiah's design sense.

2. **Education partners and speaking-circuit decision-makers** — school district leads, conference organizers, non-profit directors evaluating Isaiah for advocacy work, talks, and program partnerships at the K–12 / community-college layer. Context: deciding whether Isaiah is a credible representative for a coding-education initiative.

Both audiences must come away with the same impression: a working engineer who teaches because he chooses to, not an educator who happens to dabble in code.

## Product Purpose

A personal portfolio for Isaiah Ferguson — Coding Advocate at the San Joaquin County Office of Education and CodeStack Developer on SEIS, the special-education information system used by 90%+ of California school districts.

The site exists to:

- Document real, named, dated technical work (SEIS, Custom LMS, Team Cama, SJC Family Justice Center, Code Challenge platform).
- Establish Isaiah as both a credible C# / .NET / Next.js engineer AND an effective coding educator and outreach lead, without diluting either side.
- Generate two types of inbound: interview requests from engineering teams, and partnership / speaking requests from education organizations.

Success looks like a hiring manager screenshotting one of the project sections to share with their team, OR an education partner forwarding the link as "this is the kind of person we want at the conference."

## Brand Personality

**Confident craftsman who teaches.** Engineer first, educator second.

- **Three-word voice:** sober · evidence-led · grounded.
- **Tonal stance:** depth, not enthusiasm. Real numbers (90% of CA districts, .NET 7–10, named projects), no exclamation points, no mission-statement vocabulary.
- **Emotional goal:** the visitor leaves trusting Isaiah's technical judgment first, then noticing that he also teaches. Reverse the order and the audience for hiring evaporates.
- **Voice anchors:** GitHub's writing voice, Stripe Press copy density, a senior engineer's personal site.

## Anti-references

The portfolio must NOT live in any of the following visual worlds:

1. **Edu-tech startup landing page** *(strongest anti, named by user)*. Pastel gradients, friendly illustrations of diverse cartoon students, "we believe every child" mission copy, whitespace that signals "marketing-y." Specifically forbidden: hand-drawn icons of children + computers, gradient-on-white hero sections, bullet lists of platitudes.

2. **Bootcamp-grad dev portfolio.** Brittany Chiang fixed-rail clones, dark navy + cyan-mint accent palettes, Inter as the only typeface, identical project cards repeated five times, tag-pill chip walls. The portfolio's current state falls into this category and must move out of it.

3. **Corporate enterprise consultant.** Stock photo of person at laptop, navy/gray sterility, "I deliver value to stakeholders" copy, LinkedIn-flavored polish without personality.

## Design Principles

1. **Show before tell.** Every claim is paired with named, dated, linkable evidence. If a project can't be screenshotted or linked, it doesn't go on the front page.

2. **One identity, two readers.** Every section must work for both a senior engineer and a school-district lead. If a design choice serves only one audience, it is the wrong choice. Solve the dual-reader problem in form, not by hedging the content.

3. **Sober over warm.** When choosing between approachable and rigorous, choose rigorous. The advocacy work is communicated through specificity and scale (90% of CA districts), not through tonal warmth or illustration. Warmth is a side-effect of clarity, not a goal.

4. **Distinctive over safe.** A brand-register surface that visitors cannot tell apart from the next ten dev portfolios has failed. Take the typographic and structural risk required to be remembered, but stay inside the confident-craftsman lane — no editorial-magazine drift, no acid-maximalism.

5. **Evidence at the typographic level.** Numbers, dates, project names, and company names should be set with the weight a publication gives a pull-quote. The content is already specific; the typography should make that specificity legible at a glance.

## Accessibility & Inclusion

- Target WCAG 2.1 AA compliance throughout. The current implementation has at least one P1 contrast failure (`#565c63` on `#0b1326` measures 2.7:1) that any reshape must resolve.
- All text must hit ≥4.5:1 against its background; large text (≥18.66px regular or ≥14px bold) must hit ≥3:1.
- Define a visible `:focus-visible` style site-wide. Keyboard users include a11y-conscious recruiters, who will test the portfolio with Tab.
- Honor `prefers-reduced-motion`. Hover scale + translate effects should collapse to instant state changes when the user has reduced-motion set.
- Touch targets ≥44×44px on all interactive elements (currently fails on social-icon links).
- Image alt text should communicate context, not just identity (avatar alt should describe role + context, not only "Isaiah Ferguson").

