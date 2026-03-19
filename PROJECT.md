# Anne Klein Shopify — Project Guide

Single source of truth for key decisions, rules, guidelines, and learnings. Use this to stay on track and avoid repeating past errors.

---

## Hard rules (non-negotiable)

### WCAG 2.2 Level AA

**All development for this project MUST meet WCAG 2.2 Level AA.**

- Every new or changed UI (sections, snippets, templates, assets) must be designed and implemented with WCAG 2.2 AA in mind.
- Before considering any feature “done,” verify it against the relevant WCAG 2.2 success criteria (perceivable, operable, understandable, robust).
- When in doubt, prioritize accessibility over convenience or speed.

**Practical checklist (reference, not exhaustive):**

- **Perceivable:** Sufficient color contrast (4.5:1 text, 3:1 large text/UI); text alternatives for non-text content (images, video); captions/transcripts for video; content not conveyed by color alone.
- **Operable:** Keyboard accessible (all actions, no keyboard traps); enough time for tasks; no flashing that could trigger seizures; clear focus order and visible focus indicators (`:focus-visible`); meaningful link/button labels and page titles.
- **Understandable:** Readable language; predictable behavior; clear labels and error messages; avoid and correct input errors.
- **Robust:** Valid, semantic HTML; names, roles, and states exposed to assistive tech (ARIA where needed); compatible with current and future user agents and assistive technologies.

**Resources:**

- [WCAG 2.2 W3C Recommendation](https://www.w3.org/TR/WCAG22/)
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)

---

## Key decisions

### Video player (AK Video section)

- **Single section:** One section file (`ak-video.liquid`) with Layout = Hero | Feature (no separate hero vs feature sections).
- **Logo overlay:** The Lotto “diamond” cutout overlay is kept and renamed to “Logo overlay” in schema and classes (`ak-video__logo-overlay`).
- **Start card:** Shown when the video is not yet playing (e.g. autoplay blocked, initial load). Avoids a blank screen. Schema: start card image, optional heading/text.
- **End card:** Shown when the video has ended and is not looping. Avoids a blank screen. Schema: end card image, optional heading, optional “Watch again” (or custom) button.
- **Global pause:** Logic (e.g. `ADA_GlobalPause.registerCustom`, `ada-global-pause:changed`) remains in the section script but is **non-functional** on Anne Klein (no global “Pause all” UI or script). Per-video pause/play and mute are fully functional.
- **Contrast mode:** Anne Klein does not use Lotto-style `data-contrast-mode` or contrast toggle; do not port that CSS or markup. Ensure default styling meets contrast requirements.

### Repository and theme

- **Git:** Project is in Git with remote `origin` → GitHub (Anne-Klein-Shopify). Default branch: `main`.
- **Existing video:** The theme’s current Video section (`index__video.liquid` / `include-video.liquid`) is unchanged; the new AK Video section is independent and additive.

---

## Guidelines

### Sections and templates

- New sections should be reusable where possible (home page and other pages).
- Use a consistent class prefix per section (e.g. `ak-video__*` for the AK Video section) and section ID `ak-video-{{ section.id }}` (or equivalent) to avoid clashes and allow scoped CSS/JS.
- Prefer Shopify schema (video, image_picker, etc.) for content so merchants can edit in the theme editor.
- **Always include `presets` in the schema** for any section that should be available via "Add section" in the theme editor. Without `presets`, the section will not appear in the editor UI.

### Standard text controls (homepage sections)

**Every homepage section** (all `index__*` and any section used on the home page) **must expose consistent typography controls** for each text level so merchants can control font size, weight, and underline across the site.

For each distinct text level in the section (heading, subheading, body/CTA, etc.), provide:

| Control | Schema pattern | Notes |
|--------|-----------------|--------|
| **Font size** | `range` (e.g. 14–48px headings, 12–24px subheading/CTA) or `select` | Per text level; sensible min/max and step. |
| **Font weight** | `select` with 300, 400, 500, 600, 700 (as applicable) | Optional for body; expected for heading and CTA. |
| **Underline** | `checkbox` or `select` (on/off) | Where underline is appropriate (e.g. headings, CTA links). |

**Minimum per section:**

- **Heading** (main title): font size, font weight, optional underline.
- **Subheading / subtitle** (if present): font size, font weight, optional underline.
- **Body / CTA / label** (links, buttons, tagline): font size, font weight, optional underline where it makes sense.

**Font family:** If the theme supports multiple typefaces, expose a font (family) select per text level; otherwise use and document the section default (e.g. Amiri for headings, system for body) so it can be made consistent later.

**Consistency:** When adding or auditing a section, ensure it follows this pattern so all homepage containers behave the same way and no section is missing these controls.

### Accessibility (WCAG 2.2 AA)

- **Interactive controls:** Minimum ~44x44px touch/click target where possible; visible focus styles (e.g. `outline` / `:focus-visible`).
- **Video:** Provide a text transcript (e.g. schema textarea + `aria-describedby` to transcript block); per-video pause/play and mute; avoid autoplay with sound.
- **Images:** Always set meaningful `alt` (or `aria-label` where appropriate); decorative images should have `alt=""` or `role="presentation"` as appropriate.
- **Regions/carousels:** Use `role="region"`, `aria-label` / `aria-roledescription` where they add clarity; live regions for dynamic updates when needed; no focus traps (keyboard can enter and exit).
- **Color:** Do not rely on color alone to convey information; ensure contrast ratios meet AA (text and UI components).
- **ARIA labels must reflect state:** Toggle buttons (mute/unmute, pause/play) must update `aria-label` on every state change so screen readers announce current state (WCAG 4.1.2).
- **No duplicate `aria-describedby`:** Only place `aria-describedby` on the element it most directly describes (e.g. `<video>`, not its wrapper `<section>`). Duplicates cause screen readers to announce the description twice.
- **Text over images needs a contrast scrim:** When placing text over a background image, always add a semi-transparent dark overlay (scrim) or `text-shadow` to guarantee WCAG 1.4.3 contrast regardless of image content.
- **Heading levels:** Use a schema `select` for heading level (`h1`-`h3` or `p`) when a section may appear at different positions on a page. Only one `<h1>` per page; default `h1` for hero usage, `h2` or lower elsewhere (WCAG 1.3.1).
- **Clickable regions need visible affordance:** If a large area (e.g. start card) is clickable, include a visible icon/button so users know it is interactive. Do not rely on `cursor: pointer` alone.
- **Controls must be visible on mobile:** `opacity: 0` + `:hover` show pattern does not work on touch devices. Always ensure controls are visible on mobile (e.g. `opacity: 1` in a mobile media query).
- **`prefers-reduced-motion`:** Respect the user's OS motion preference. When `prefers-reduced-motion: reduce` is set, skip autoplay and disable non-essential animations. Not strictly AA, but a strong best practice and recommended.
- **No-JS fallback for media controls:** Always include the native `controls` attribute on `<video>` and remove it via JS when custom controls are initialized. This ensures users can still pause/unmute if JavaScript fails to load (WCAG 2.2.2).
- **Minimum font size for readability:** Use at least 14px for small UI text (e.g. transcript controls). While WCAG does not mandate a minimum font size, 12px is difficult to read on many devices.

### Code and naming

- Use Anne Klein–specific naming (e.g. `ak-video`, `ak-*`) to avoid collisions with theme or app code.
- Keep inline section scripts in an IIFE and scoped to the section DOM node where possible.
- Do not introduce Lotto-specific dependencies (e.g. `ada-global-pause.js`, contrast control) unless explicitly decided for Anne Klein.

### What not to do

- Do not remove or weaken accessibility features to “simplify” — WCAG 2.2 AA is a hard rule.
- Do not copy Lotto contrast-mode or global-pause UI/scripts without a decision to support them on Anne Klein.
- Do not leave video (or other media) without a way to pause and without a text alternative (transcript/captions) when it carries meaningful content.
- Do not use `opacity: 0` hover-only patterns for controls without a mobile fallback.
- Do not place text over images without a contrast scrim or text-shadow.
- Do not hard-code heading levels (`<h1>`) in reusable sections — use a schema setting.
- Do not omit `presets` from section schemas intended to be added by merchants in the theme editor.
- Do not ship sections without verifying no-JS fallback for critical controls (video pause, mute).

---

## Rules summary

| Rule | Description |
|------|-------------|
| **WCAG 2.2 AA** | All development must meet WCAG 2.2 Level AA. Verify before marking work complete. |
| **Single AK Video section** | One `ak-video.liquid` with Layout (Hero/Feature), logo overlay, start card, end card. |
| **No global pause on AK** | Global-pause logic may stay in code but must remain non-functional (no global UI). |
| **No Lotto contrast mode** | Do not port `data-contrast-mode` or contrast toggle; rely on default theme meeting contrast. |
| **Naming** | Use `ak-*` prefixes and section-scoped IDs for new section work. |
| **Video accessibility** | Transcript option, per-video pause/play and mute; no autoplay with sound. |
| **Schema presets** | Always include `presets` in section schemas so they appear in the theme editor. |
| **ARIA reflects state** | Toggle buttons must update `aria-label` on every state change (WCAG 4.1.2). |
| **Text over images** | Always use a scrim or text-shadow for contrast (WCAG 1.4.3). |
| **Mobile controls** | Never rely on hover-only visibility; ensure controls are visible on touch devices. |
| **Heading levels** | Use schema select for heading level in reusable sections (WCAG 1.3.1). |
| **No-JS fallback** | Ship native `controls` on video; remove via JS when custom controls init. |
| **Reduced motion** | Respect `prefers-reduced-motion`; skip autoplay when set. |
| **Standard text controls** | Every homepage section: per text level (heading, subheading, CTA/body), expose font size, font weight, and underline where appropriate. |

---

## Learnings and references

- **Lotto Legends video:** Hero and Feature video sections were merged into one AK section with Layout + logo overlay + start/end cards. Lotto’s global pause and contrast mode are not used on Anne Klein.
- **Plans:** Feature work may be documented in Cursor plans or in `docs/` (e.g. `docs/HOMEPAGE-2026-AUDIT-PLAN.md`). This PROJECT.md records durable decisions and rules; plans record implementation steps for specific features.
- **Section best practices:** See `docs/BEST-PRACTICES-SECTIONS.md` for accessibility, semantics, links, focus, images, schema, and code patterns for building and auditing theme sections (WCAG 2.2 AA–aligned).
- **WCAG 2.2:** Always refer to the official W3C WCAG 2.2 specification and quick reference when checking or implementing accessibility.
- **Code review: AK Video v1 issues (all resolved):**
  1. Missing `presets` in schema = section invisible in theme editor.
  2. Mute `aria-label` never updated = screen reader state mismatch.
  3. Controls at `opacity: 0` with hover-only = invisible on mobile.
  4. White text over background image with no scrim = contrast failure.
  5. Hard-coded `<h1>` in reusable section = multiple `<h1>` on page.
  6. Start card clickable but no play icon = no visual affordance.
  7. Duplicate `aria-describedby` on `<section>` and `<video>`.
  8. No `prefers-reduced-motion` support.
  9. Transcript text at 12px too small.
  10. No native `controls` fallback when JS unavailable.
  11. Unused JS variable (`wrap`).

---

## Changelog (key updates to this doc)

- **Initial:** WCAG 2.2 AA as hard rule; project guide created; key decisions and guidelines for AK Video section and theme.
- **Video review pass:** Added 11 learnings from AK Video v1 code review; expanded accessibility, sections, and "what not to do" guidelines; added rules for presets, ARIA state, contrast scrims, mobile controls, heading levels, no-JS fallback, and reduced motion.
- **Homepage 2026 audit:** Added references to `docs/HOMEPAGE-2026-AUDIT-PLAN.md` (audit plan) and `docs/BEST-PRACTICES-SECTIONS.md` (section best practices for links, focus, semantics, images, schema, and code).
- **Standard text controls:** Added guideline and rules-summary entry: every homepage section must expose font size, font weight, and underline for each text level (heading, subheading, CTA/body) for consistency across sections.
