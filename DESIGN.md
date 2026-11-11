---
name: SUNA Software e Desenvolvimento
description: Software que se molda ao seu negócio; a karesansui sand garden in the SUNA palette.
colors:
  sand: "#e5cfa5"
  sand-light: "#f9eed9"
  rake: "#b78b5a"
  stone: "#442d1d"
  stone-deep: "#2b1c12"
  ember: "#a23931"
  ember-dark: "#8a2f28"
  ink-soft: "#6b4a33"
typography:
  display:
    fontFamily: "'Unbounded Variable', 'Onest Variable', system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5.6vw, 5.6rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "'Unbounded Variable', 'Onest Variable', system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 3.7vw, 3.4rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  title:
    fontFamily: "'Unbounded Variable', 'Onest Variable', system-ui, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  body:
    fontFamily: "'Onest Variable', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  lead:
    fontFamily: "'Onest Variable', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Onest Variable', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.9rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  chip: "8px"
  field: "14px"
  card: "26px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4.5vw, 56px)"
  section: "clamp(80px, 11vw, 152px)"
  section-head: "clamp(48px, 6vw, 80px)"
  container: "1240px"
components:
  button-ember:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.sand-light}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "14px 26px"
    height: "52px"
  button-ember-hover:
    backgroundColor: "{colors.ember-dark}"
  button-stone:
    backgroundColor: "{colors.stone}"
    textColor: "{colors.sand-light}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "14px 26px"
    height: "52px"
  button-stone-hover:
    backgroundColor: "{colors.stone-deep}"
  round-button:
    textColor: "{colors.sand-light}"
    rounded: "{rounded.pill}"
    size: "54px"
  nav-link:
    textColor: "{colors.stone}"
    rounded: "{rounded.pill}"
    padding: "10px 14px"
  card-project:
    backgroundColor: "{colors.sand-light}"
    textColor: "{colors.stone}"
    rounded: "{rounded.card}"
    padding: "24px 26px 28px"
  chip-stack:
    textColor: "{colors.stone}"
    rounded: "{rounded.chip}"
    padding: "4px 11px"
  tag-stone:
    backgroundColor: "{colors.stone}"
    textColor: "{colors.sand-light}"
    rounded: "{rounded.pill}"
    padding: "5px 12px"
  input-composer:
    textColor: "{colors.sand-light}"
    rounded: "{rounded.field}"
    padding: "13px 15px"
---

# Design System: SUNA Software e Desenvolvimento

## Overview

**Creative North Star: "The Raked Garden"**

The SUNA symbol is a stone set in raked sand, and the whole system is that karesansui garden. The ground is Manteiga sand scored with Toffee grooves; anything placed on the page (a headline block, the symbol, the visitor's pointer, a team member) is a stone, and the grooves bend around it instead of running under it. Solid Espresso and Cereja stones carry the weight; the sand stays quiet.

The page alternates between day and night: sand and Linho bands for reading, Espresso "night garden" bands for the problem, the portfolio rail and the footer, and a single Cereja field drenched under the contact. Density is calm and generous, with wide section spacing and one idea per band. Type speaks in lowercase Unbounded, the same voice as the wordmark, against plain Onest for reading.

Surfaces are flat colour fields. Depth comes from tone (night bands, a darkened composer panel) and from a few soft, low shadows that make stones and chat bubbles sit on the ground. No gradients, no serif, no italic, no glass.

**Key Characteristics:**
- A living hero: dithered sand grains (React Bits Dither, WebGL2, with a Canvas 2D fallback) across the whole ground, and a raked Toffee dune at the base with the SUNA symbol resting on its crest.
- Raked-sand line field (groove plus offset crest): live canvas in the hero dune and the team garden, static SVG for service dividers and project placeholders.
- Stones are rounded, irregular ellipses; grooves part around them and break where they would cross.
- Full-bleed colour bands alternate sand, Linho, Espresso and Cereja; no boxed sections.
- Lowercase Unbounded display, Onest text.
- Pills and circles for every control; 26px soft corners for cards and panels.

## Colors

An earthy, warm five-colour brand palette (the team's official Toffee, Manteiga, Linho, Espresso, Cereja) plus three derived support neutrals.

### Primary
- **Cereja** (ember): the one red stone. Primary action fill (WhatsApp buttons), focus ring, text selection, the highlighted stone in every garden drawing, the final process step, the underline under the problem answer, and the full contact band.
- **Cereja Escuro** (ember-dark): hover state of Cereja fills only.

### Neutral
- **Espresso** (stone): body text on light grounds, solid stones, secondary button fill, step marks, borders (1.5px rules and outlined circles), and the night-band background for problem, projects and footer.
- **Espresso Profundo** (stone-deep): hover of Espresso fills; translucent at 28-35% as the composer panel and field fill on Cereja.
- **Manteiga** (sand): the principal ground (page, header, hero, team band); secondary text on night bands.
- **Linho** (sand-light): the lighter reading ground (services, process), card surfaces, chat bubbles, text on Espresso and Cereja, and the groove crest highlight.
- **Toffee** (rake): sand grooves, dashed process path, scrollbar, link underline colour, nav hover wash (at 30% alpha).
- **Tinta Suave** (ink-soft): secondary text and leads on sand and Linho grounds.

### Named Rules
**The One Red Stone Rule.** Cereja appears as a single accent per band: one action, one stone, one underline. The contact band is the only place it becomes the ground.

**The Day and Night Rule.** Light bands use Manteiga or Linho with Espresso text; night bands use Espresso with Linho text and Manteiga for secondary copy. Never place a light card on a light band without a band change between them.

## Typography

**Display Font:** Unbounded Variable (with Onest Variable, system-ui)
**Body Font:** Onest Variable (with system-ui, -apple-system, Segoe UI)

**Character:** Unbounded is wide and round like a pebble, set lowercase and tightly tracked to echo the wordmark; Onest is a plain, friendly grotesque that gets out of the way for non-technical readers.

### Hierarchy
- **Display** (500, clamp 2.5rem to 5.6rem, 1.04): hero headline only, max 13ch; contact title uses the same face at up to 4.6rem, max 12ch.
- **Headline** (500, clamp 1.9rem to 3.4rem, 1.04): section titles, max 17ch, balanced wrap. Service names sit between headline and title (clamp 1.6rem to 2.6rem).
- **Title** (500, 1.2rem to 1.5rem, -0.03em): project names, step names, composer heading, mobile menu links.
- **Body** (400, 1.125rem, 1.6): running text; leads at clamp 1.05rem to 1.25rem, capped at 44 to 46ch.
- **Label** (600, 0.85rem to 0.92rem): field labels, definition terms, footer column heads, tags. Sentence case, no tracking, no uppercase.

### Named Rules
**The Lowercase Voice Rule.** Every Unbounded heading is rendered lowercase (via text-transform), matching the wordmark. Onest text keeps normal sentence case.

**The Two Faces Rule.** Unbounded for headings, names and the contact channels; Onest for everything read in sentences. No third face, no serif, no italic.

## Layout

A single centred container (1240px max) with a fluid gutter (16px to 56px). Sections are full-bleed colour bands with fluid vertical padding (80px to 152px). Section heads are a two-column grid (headline 1.3fr, lead 1fr, bottom-aligned) that collapses to one column at 860px.

Layouts are asymmetric rather than equal-card grids: the hero is 7fr copy to 4fr symbol stone; services are ruled rows (icon circle, title, body) separated by a strip of raked sand; the problem band pairs a sticky intro with a staggered column of chat bubbles; projects run as a horizontal scroll-snap rail that bleeds to the viewport edge while aligning its first card to the container; process is four columns joined by a dashed Toffee path (two columns at 900px, one at 520px).

Breakpoints in use: 960px (nav collapses to menu toggle), 900px, 860px (most two-column grids stack), 760px, 520px. Header is sticky at 76px with 88px scroll padding.

## Elevation & Depth

Flat by default. Depth is tonal: night bands, the 28% Espresso-Profundo composer on Cereja, a 30% Toffee wash on nav hover. Shadows are soft, low and warm-brown, and exist only where something must sit on the ground.

### Shadow Vocabulary
- **Header lift** (`box-shadow: 0 10px 24px -18px rgba(43, 28, 18, 0.55)`): sticky header, only after scroll.
- **Bubble rest** (`box-shadow: 0 14px 28px -20px rgba(0, 0, 0, 0.7)`): chat bubbles on the night band.
- **Stone rest** (SVG drop shadow, dy 6, blur 6, Espresso at 28%): stones in garden drawings.
- **Field focus** (`box-shadow: 0 0 0 3px rgba(249, 238, 217, 0.3)`): composer inputs.

### Named Rules
**The Stones Sit Rule.** A shadow is always soft, offset downward and tinted brown, never a hard offset block; it means "resting on sand", not "floating".

## Shapes

Soft and pebble-like. Controls are full pills (999px) or circles (icon rings, rail arrows, menu toggle). Cards and panels take 26px corners; fields 14px; stack chips 8px. Chat bubbles are 22px with a 6px tail corner at bottom left. Process step marks are irregular stone blobs (per-step asymmetric border-radius), the last one in Cereja. Borders are 1.5px Espresso (or Manteiga on night bands); structural rules are full-width 1.5px lines.

## Components

### Buttons
Rounded, solid and weighty, like stones.
- **Shape:** full pill (999px), min-height 52px (46px in the header).
- **Primary (Cereja):** Cereja fill, Linho text, Onest 600 1rem, 14px 26px, with a leading 20px line icon. Used for the WhatsApp action outside the header.
- **Secondary (Espresso):** Espresso fill, Linho text; header CTA, mobile menu CTA, and the send button on the Cereja contact band.
- **Hover / Focus:** lifts 2px and darkens to the -dark/-deep tone over 0.25s with the out-expo easing; focus is a 3px Cereja outline offset 3px (Linho or Manteiga on coloured bands).
- **Text link:** Onest 600 with Toffee underline and a trailing arrow that slides 4px on hover.
- **Round button:** 54px circle, 1.5px Manteiga ring on Espresso; fills Linho on hover.

### Chips
- **Stack chip:** 8px corners, Espresso at 8% alpha, 0.85rem.
- **Category tag:** Espresso pill with Linho 600 text, pinned top-left on project imagery.

### Cards / Containers
- **Corner Style:** 26px.
- **Background:** Linho on the Espresso rail; composer is translucent Espresso-Profundo on Cereja.
- **Shadow Strategy:** none on cards; see Elevation.
- **Border:** none.
- **Internal Padding:** 24px 26px 28px (project), clamp 24px to 36px (composer).

### Inputs / Fields
- **Style:** 14px corners, 1.5px Linho border at 45%, Espresso-Profundo fill at 35%, Linho text, 13px 15px padding.
- **Focus:** border goes solid Linho plus a 3px Linho halo at 30%.

### Navigation
Wordmark at left (112px), four Onest 500 links as pills with a Toffee wash on hover, Espresso pill CTA at right. Below 960px the links collapse into a 48px outlined circle toggle that opens a stacked list of lowercase Unbounded links and a full-width CTA.

### Hero Dune (signature)
The whole hero ground is living dithered sand: the React Bits Dither component (`src/components/Dither.tsx`, Bayer 8x8, 2px grains, wind drift) restricted to four light sand tones (#d6ba8b, #e2c99d, #ebd7b2, #f4e6cb). The range is kept narrow so Espresso text reads at over 7:1 on every grain. The pointer erases grains and a click sends a ripple; with reduced motion it renders one static frame.

At the base sits a dune: a full-width strip (`--dune-h`, 230px to 440px; 170px to 260px below 860px) clipped by an SVG mask (low crest under the copy, peak near 80% width), filled Toffee #b78b5a and raked with the live line canvas (`SandGarden`): grooves in Espresso at 72%, crests in Manteiga. Lines rake in from the left over 1.6s, part around the symbol stone resting half-sunk on the crest, and open around the pointer; on touch screens a stone glides across once. `.hero-layout` passes pointer events through so the cursor reaches the dune under the stone row.

When WebGL2 is missing or only software-rendered (GPU off: SwiftShader, llvmpipe), Dither calls `onUnsupported` and the hero swaps to `DuneFallback`, a Canvas 2D version with the same palette, Bayer pattern, wind drift, pointer erase and click ripple at 4px grains and 30fps.

### Team Garden
Seven stones (HTML blobs with irregular radii, one Cereja) on a live raked-line canvas that starts raking when the section enters view; the stones are set one by one (scale 1.14 to 1, shadow settling, 90ms stagger) and the three reasons rise after them. Each reason carries a small stone mark and a lowercase Unbounded title. Default state is visible; the entrance only runs when the section starts below the fold and motion is allowed.

### Raked Sand Field
Horizontal grooves (Toffee 1.4-1.6px) each paired with a Linho crest 1.6-1.8px below at 60-70% opacity, spaced 10-15px. Stones (ellipses) displace the grooves outward; a groove breaks rather than crossing a stone. Drawn as static SVG (`garden.ts`) for service dividers and project placeholder art.

## Do's and Don'ts

### Do:
- **Do** let raked lines bend around content and break at stones; content is placed in the sand, not over it.
- **Do** use one Cereja stone per band (one action, one highlighted stone, one underline).
- **Do** alternate full-bleed sand, Linho, Espresso and Cereja bands to pace the page.
- **Do** set every Unbounded heading lowercase with negative tracking (-0.02em to -0.035em).
- **Do** keep controls as pills or circles and cards at 26px corners.
- **Do** honour reduced motion: the garden renders settled and transitions collapse.

### Don't:
- **Don't** use gradients, glass or backdrop blur; colour fields are flat. Texture comes from grains (the dune) and grooves (the raked field), never from colour ramps.
- **Don't** introduce a serif or italic face.
- **Don't** use hard offset shadows or floating, cool-grey shadows; shadows are soft, low and brown.
- **Don't** lay out services or features as three equal boxed cards, or a split hero with a product screenshot.
- **Don't** use Cereja for large body text areas outside the contact band.
