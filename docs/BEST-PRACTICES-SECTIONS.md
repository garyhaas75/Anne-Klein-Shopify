# Best Practices: Shopify Sections (AK Theme)

Reusable guidelines for building and auditing theme sections. Aligns with WCAG 2.2 AA and project standards. Derived from the AK Homepage 2026 section audit.

---

## 1. Links and clickable areas

### One link, one destination

- Do not use two `<a>` elements that point to the same URL (e.g. a full-area overlay link plus a visible CTA link). Screen readers announce both; keyboard users tab through both. Use a **stretched link** instead: a single visible `<a>` with a `::after` pseudo-element that fills the clickable area (`position: absolute; inset: 0;`), so the whole region is clickable with one tab stop and one announcement.

### Link only when there is a URL

- If a heading or label is only sometimes a link, render an `<a>` only when a URL is set. When no URL is set, render plain text. Do not use `href="#"` as a fallback.

### Entire control is clickable

- For buttons and pill-style links, the entire visible control (e.g. full pill) should be the `<a>` or `<button>`. Use `min-height: 44px`, `display: inline-flex`, `align-items: center`, `justify-content: center` so the touch target meets 44×44px and the whole area is clickable. Do not wrap the link in a non-focusable div that shrinks the clickable area.

---

## 2. Focus and hover

### Visible focus

- Every interactive element (links, buttons, form controls) must have a visible focus style. Use `:focus-visible` (not `:focus`) so the indicator shows for keyboard users but not for mouse clicks. Example: `outline: 2px solid currentColor; outline-offset: 3px;`.

### Hover and focus together

- Any visual change on `:hover` must also apply on `:focus` / `:focus-visible` so keyboard users get the same feedback (WCAG 1.4.13). Use the same rule: `.selector:hover, .selector:focus-visible { ... }`.

---

## 3. Semantics and structure

### Headings

- Use a logical heading hierarchy: one `<h1>` per page (typically the hero), then `<h2>` for each major section. Do not skip levels (e.g. avoid going from `<h1>` to `<h3>`). In section-based themes, each section’s primary heading is usually `<h2>` so that reordering sections in the theme editor cannot break the hierarchy.

### Navigation and lists

- If a group of links is a navigation menu (e.g. category pills), wrap it in `<nav aria-label="…">` and use a list: `<ul>` and `<li>`. Reset list styling with CSS. This gives screen reader users list length and landmark information.

### Section labels

- Every `<section>` should have an accessible name so landmarks are meaningful. When the section has a visible heading, give that heading a unique `id` and set `aria-labelledby` on the section. When the section has no heading, use `aria-label` with a short, descriptive name. Prefer an optional schema field “Section label (for screen readers)” so merchants can override when there’s no heading or want a different name; fall back to a sensible default in Liquid.

---

## 4. Images and media

### Alt text

- **Decorative images:** Use `alt=""`. For background or purely decorative images, add `aria-hidden="true"` on the wrapper so assistive tech skips them.
- **Meaningful images:** Provide descriptive `alt` from the media library or from section content. Use a fallback when the media alt is blank (e.g. `alt: image.alt | default: section_heading | default: "Description"`).
- **Icons with optional meaning:** Add an optional “Icon alt text” (or similar) in the block schema. If blank, use `alt=""` (decorative). If set, use it for `alt`. Document in schema **info**: “Leave blank if decorative; add a short description if the icon adds meaning.”

### Text over images

- Ensure sufficient contrast (WCAG 1.4.3). Use a dark gradient overlay (e.g. `rgba(0,0,0,0.6)`) over the text area and/or `text-shadow` (e.g. `0 1px 4px rgba(0,0,0,0.4)`) so text remains readable on any image. Add schema **info** on “Text color” explaining that the section applies overlay and shadow for accessibility.

### Aspect ratio

- Prefer **dynamic** aspect ratio from the image when possible (`image.width` / `image.height` in Liquid). Offer a schema choice: “Match image” vs fixed presets (e.g. Square, Portrait 3:4, 8:9, Landscape 4:3). For older browsers that don’t support `aspect-ratio`, provide an `@supports not (aspect-ratio: 1)` fallback using the padding-bottom percentage technique.

---

## 5. Touch targets and sizing

- Interactive targets must be at least 24×24px (WCAG 2.5.8). Prefer 44×44px for primary actions. Use `min-height: 44px` (and width as needed) plus flexbox centering so the entire control is tappable.

---

## 6. Typography and schema

### System fonts

- Use a system font stack (e.g. `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`) unless the project explicitly adds custom fonts. Do not rely on fonts that require extra assets until they are part of the theme.

### Configurable size and spacing

- Where type size or letter-spacing affects readability or design, expose them in the schema (e.g. “Font size”, “Letter spacing”) so merchants can tune without editing code. Use schema **info** to explain when and how to use each setting.

---

## 7. Schema and theme editor

### Info tooltips

- Add **info** text to schema settings when the purpose or “when to use” is not obvious: e.g. icon alt text, section label for screen readers, overlay text color, aspect ratio, background opacity. Keep tooltips short and actionable.

### Optional section label

- For each section, consider an optional “Section label (for screen readers)” (or “Accessibility label”) text field. Use it when the section has no visible heading; otherwise use `aria-labelledby` from the heading. Document: “Optional. Used when this section has no visible heading. Leave blank to use the section heading or a default.”

---

## 8. Code and styles

### Scoped CSS

- Put all section-specific CSS in `{% style %}` and scope selectors with `#shopify-section-{{ section.id }}` so styles don’t leak and multiple instances of the section don’t conflict. Avoid unscoped `<style>` blocks with global class names.

### Liquid strings

- Do not use backslash escaping in single-quoted Liquid strings (e.g. `\'`); it is not supported. Use double-quoted strings for content that contains apostrophes.

### Presets

- Always include **presets** in the section schema so the section can be added from the theme editor. Without presets, the section will not appear in the “Add section” UI.

---

## 9. Checklist for new or updated sections

- [ ] No duplicate links to the same URL; use stretched link if whole area must be clickable.
- [ ] Links only when URL is set; no `href="#"` fallback.
- [ ] Visible `:focus-visible` and matching hover/focus styles on all interactive elements.
- [ ] Logical heading hierarchy (one h1 per page; sections use h2); no skipped levels.
- [ ] Nav/lists use `<nav>`, `<ul>`, `<li>` where appropriate.
- [ ] Section has an accessible name (`aria-labelledby` or `aria-label`); optional schema label when no heading.
- [ ] Images have correct alt (or alt="" with aria-hidden for decorative); fallbacks where relevant; optional icon alt in blocks.
- [ ] Text over images has sufficient contrast (overlay and/or text-shadow).
- [ ] Touch targets ≥ 44×44px where possible; whole control is clickable.
- [ ] System font stack unless custom fonts are approved; schema for size/spacing where useful.
- [ ] Schema **info** on non-obvious settings; optional section label and icon alt where applicable.
- [ ] All section CSS in `{% style %}` and scoped; no unscoped global `<style>`.
- [ ] Liquid strings safe (e.g. double quotes for apostrophes).
- [ ] Presets included so section appears in theme editor.
- [ ] Aspect-ratio with fallback for older browsers if used.

---

## References

- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- Project rules: [PROJECT.md](../PROJECT.md)
- Audit plan (2026 homepage): [HOMEPAGE-2026-AUDIT-PLAN.md](HOMEPAGE-2026-AUDIT-PLAN.md)
