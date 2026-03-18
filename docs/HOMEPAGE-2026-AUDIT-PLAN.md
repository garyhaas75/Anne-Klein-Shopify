# AK Homepage 2026 — Audit & Fix Plan (Final)

Plan for bringing the five AK 2026 homepage sections up to WCAG 2.2 AA, design fidelity, and code robustness. All items below were reviewed and agreed.

---

## A. WCAG 2.2 AA Accessibility

### A1. Duplicate links (Hero + Quad)

- **Problem:** Full-overlay `<a>` plus visible CTA `<a>` to the same URL → two tab stops and confusing announcements.
- **Fix:** Remove the overlay `<a>`. Keep only the visible CTA link. Use a **stretched link** pattern: on the CTA `<a>`, add `position: relative` to the caption wrapper and `::after { content: ''; position: absolute; inset: 0; }` on the link so the entire image area is clickable without a second link. One link, one tab stop, full-area click preserved.

### A2. Focus styles

- **Problem:** No `:focus-visible` styles on links/buttons.
- **Fix:** Add `outline: 2px solid currentColor; outline-offset: 3px;` on `:focus-visible` for every interactive element across all five sections. Use `:focus-visible` (not `:focus`) so mouse users don’t see the ring on click.

### A3. Category pills semantics

- **Problem:** Pills are `<div>`s; no list or nav semantics.
- **Fix:** Wrap in `<nav aria-label="Shop by category">`, use `<ul>` for the list and `<li>` for each pill. The `<a>` remains the pill (entire pill clickable). Reset list style with CSS. Add schema **info** tooltip explaining the control.

### A4. Heading hierarchy (Quad)

- **Problem:** Quad uses `<h3>`; if section order changes, hierarchy can skip `<h2>`.
- **Fix:** Use `<h2>` for quad panel headings so any section order is valid. Only the hero keeps `<h1>`.

### A5. Image alt text

- **Hero/Quad:** Use `image.alt` with fallback: `alt: image.alt | default: heading | default: preheading | default: "Campaign hero"` (and equivalent for quad). Schema **info** on image: “Add alt in media library; section heading used as fallback if blank.”
- **Insiders benefit icons:** Add optional **“Icon alt text”** per block. If blank → `alt=""` (decorative). If set → use for `alt`. Schema info: “Leave blank if decorative; add short description if the icon adds meaning.”
- **Insiders background image:** Keep `alt=""`, add `aria-hidden="true"` on wrapper.

### A6. Color contrast (text over photos)

- **Problem:** White text over 50% black gradient can fail 4.5:1 on bright photos.
- **Fix:** Increase gradient to `rgba(0,0,0,0.6)` and extend coverage. Add `text-shadow: 0 1px 4px rgba(0,0,0,0.4)` to overlay text. Schema **info** on “Text color”: “Use white or light text; section applies gradient and shadow for contrast.”

### A7. Hover and focus

- **Problem:** Hover-only styles; keyboard focus gets no feedback.
- **Fix:** Pair every `:hover` with `:focus-visible` for the same styles (e.g. opacity) on all CTAs and pills.

### A8. Touch target (Pills)

- **Problem:** Pills can be under 44px height on mobile.
- **Fix:** `min-height: 44px`, `display: inline-flex`, `align-items: center`, `justify-content: center` on `.ak-pills__pill`. Entire pill remains the `<a>` (no wrapper).

### A9. Section labels

- **Problem:** Sections have no accessible name for landmarks.
- **Fix:** When section has a heading → give heading an `id`, set `aria-labelledby` on `<section>`. When section has no heading → use `aria-label` with a sensible default. Add optional schema field **“Section label (for screen readers)”** with info: “Optional. Used when this section has no visible heading. Leave blank to use heading or default.” Logic: if heading exists use `aria-labelledby`; else if setting present use `aria-label="{{ section.settings.section_aria_label }}"; else use hardcoded default per section.

---

## B. Design fidelity

### B1. Quad aspect ratio

- **Problem:** Fixed `aspect-ratio: 1`; Figma uses 960×1080 (8:9).
- **Fix:** Support **dynamic** ratio from image: when image present, use `image.width` / `image.height` (inline style or data attribute). When no image, use fallback. Add schema **“Image aspect ratio”**: “Match image” (default) vs presets (Square 1:1, Portrait 3:4, Portrait 8:9, Landscape 4:3). Apply same pattern to other image-aspect sections (e.g. New Arrivals tiles) where appropriate.

### B2. New Arrivals heading font

- **Fix:** Use **system font stack**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`. No custom fonts for now. Add schema for **heading font size** and **letter spacing** (see B4).

### B3. New Arrivals heading link

- **Problem:** `href="{{ section.settings.heading_link | default: '#' }}"` when no link set.
- **Fix:** Only render `<a>` when `heading_link` is not blank; otherwise render heading as plain text (e.g. `<span>` or unstyled text).

### B4. Category pills font

- **Fix:** System font stack (same as B2). Add schema for **pill font size** and **letter spacing** so merchants can tune without code. Schema **info** tooltips on size/spacing. Apply same “system fonts + schema size/spacing” approach to other sections using that stack (e.g. New Arrivals heading).

### B5. Insiders Club layout

- **Problem:** Single column; Figma has two columns and divider.
- **Fix:** Desktop: two-column flex/grid. Left: logo + JOIN NOW + LOG IN. Right: headline + benefits row. Vertical divider (e.g. `border-left`) between columns. Mobile: single column, logical order (e.g. logo → headline → buttons → benefits).

### B6. Insiders Club background image

- **Fix:** **Option B:** Background image on **left column only** (not full width). Schema **“Background image opacity”** (range 0–100, default e.g. 25). Right column stays solid for readability.

---

## C. Code robustness

### C1. Liquid quote (Insiders)

- **Problem:** `alt: 'Anne Klein Insider\'s Club'` — backslash escape invalid in Liquid.
- **Fix:** `alt: "Anne Klein Insider's Club"`.

### C2. Scoped styles

- **Problem:** Unscoped `<style>` blocks with global class selectors.
- **Fix:** Move all section CSS into `{% style %}` and prefix selectors with `#shopify-section-{{ id }}`. Remove standalone `<style>` blocks.

### C3. Aspect-ratio fallback

- **Problem:** `aspect-ratio` unsupported in older Safari and some browsers.
- **Fix:** Use `@supports (aspect-ratio: 1)` for modern path. Add `@supports not (aspect-ratio: 1)` fallback with padding-bottom percentage. When aspect ratio is dynamic (B1), compute padding-bottom % from image dimensions or preset in Liquid.

---

## Schema and tooltips

- Add **info** text to schema settings where “how/when to use” is not obvious (e.g. icon alt, section label, overlay text color, aspect ratio).
- Optional **“Section label (for screen readers)”** on every section; optional **font size** and **letter spacing** where we use system fonts.
- Benefit block: optional **“Icon alt text”** with explanation of decorative vs meaningful.

---

## Implementation order (suggested)

1. C1 (Liquid fix), C2 (scoped styles).
2. A1 (stretched link on hero + quad), A2 (focus-visible), A7 (hover+focus).
3. A3 (nav + list), A4 (h2), A8 (pill min-height), B4 (system fonts + schema).
4. A5 (alt/aria), A6 (gradient + shadow), A9 (section labels + schema).
5. B1 (dynamic aspect ratio + schema), B3 (conditional heading link), B2 (system font on New Arrivals + schema).
6. B5 (Insiders two-column), B6 (bg on left + opacity schema).
7. C3 (aspect-ratio fallback).

---

## Files to change

| File | A | B | C |
|------|---|---|---|
| `sections/index__hero-campaign.liquid` | A1, A2, A5, A6, A7, A9 | — | C2 |
| `sections/index__category-pills.liquid` | A2, A3, A7, A8, A9 | B4 | C2 |
| `sections/index__lifestyle-quad.liquid` | A1, A2, A4, A5, A6, A7, A9 | B1 | C2, C3 |
| `sections/index__shop-new-arrivals.liquid` | A2, A7, A9 | B2, B3, B4 | C2, C3 |
| `sections/index__insiders-club.liquid` | A2, A5, A9 | B5, B6 | C1, C2 |
