# WCAG 2.2 AA Homepage Sections Audit

**Date:** 2026-03-20  
**Scope:** Homepage sections only (excludes header and footer)  
**Standard:** WCAG 2.2 Level AA  
**Latest audit run:** Section 10 — full validation (important elements vs tab stops, markup, labels, focus-visible).

---

## Sections audited

| Section | File | Order |
|---------|------|-------|
| AK Video (hero) | `sections/ak-video.liquid` | 1 |
| AK Category Pills | `sections/index__category-pills.liquid` | 2 |
| AK Lifestyle Quad | `sections/index__lifestyle-quad.liquid` | 3 |
| Shop New Arrivals | `sections/index__shop-new-arrivals.liquid` | 4 |
| Image with text overlay | `sections/index__image-with-text-overlay.liquid` + `snippets/include-image-with-text-overlay.liquid` | 5 |
| Finishing Touches | `sections/index__finishing-touches.liquid` | 6 |
| Insider's Club | `sections/index__insiders-club.liquid` | 7 |

---

## Summary

| Category | Status | Notes |
|----------|--------|-------|
| Markup structure | **Pass** | Headings, lists, landmarks correct |
| Human-readable labels | **Pass** | No URLs used as labels |
| Tab control | **Pass** | All interactive elements + live text focusable (fix applied 2026-03) |
| Screen reader semantics | **Pass** | aria-label, role, announcements |
| Focus visibility | **Pass** | :focus-visible on interactive elements and live text |

---

## Tab control: why live text was missed and how to validate

### Why section headings / live text were not in the tab order initially

The original audit only checked that **interactive** elements (links, buttons, form controls) were focusable. It did not:

1. **Visually review the page** and list every important on-screen element (headings, CTAs, key copy).
2. **Compare that list to the tab order** to confirm each important element is a tab stop.

So “tab control” was treated as “all links/buttons are focusable” instead of “all **important** elements—including the words that describe each section—are reachable by Tab.” That gap is why section headings and hero/CTA text were not focusable until the follow-up fix.

### Required validation: visual review vs tab order

For every section (or page) audited for tab control:

1. **List every important visible element**  
   From the live page or a screenshot, write down:
   - Section headings (e.g. “New for the Season”, “SHOP NEW ARRIVALS”).
   - Any subheadings or key intro text.
   - Every CTA (e.g. “Discover”, “shop now”, “SHOP DRESSES”, “JOIN NOW”, “LOG IN”).
   - Every link and button.

2. **Verify each is a tab stop**  
   Tab through the page (or inspect the accessibility tree) and confirm:
   - Each heading/key text is either a native focusable element or has `tabindex="0"`.
   - Each CTA and link/button receives focus in a logical order.
   - Nothing important is skipped.

3. **Confirm focus visibility**  
   For every tab stop, ensure `:focus-visible` (or equivalent) shows a clear focus indicator.

If any important element is not a tab stop, fix the markup (add `tabindex="0"` for static text, or use `<a>`/`<button>` for CTAs) and re-check.

### CTAs: when links are added, they must be tab stops

- **Right now:** Some CTAs are text-only (no `href` yet). Those have been given `tabindex="0"` so they are tab stops and announce the CTA text (e.g. “Discover”, “shop now”).
- **When a CTA gets a link:** Implement it as an **`<a href="...">` or `<button>`** so it is **naturally** a tab stop. Do not use a `div`/`span` with only a click handler.
- **Avoid duplicate tab stops:** When turning a CTA into a link, the link should be the only focusable element there. If the CTA text currently has `tabindex="0"` on a wrapper (e.g. `<p class="ak-video__overlay-cta" tabindex="0">`), remove that and use an `<a>` (or `<button>`) as the single tab stop so keyboard and screen reader users get one stop that both announces the label and activates the link.

---

## 1. Markup structure

### Headings

- **AK Video:** Uses configurable `heading_level` (h1/h2/h3/p). Hero overlay correctly uses h1 when `layout == 'hero'` and `heading_level == 'h1'`. Start/end cards use h2.
- **Category Pills:** h2 for "New for the Season". No skipped levels.
- **Lifestyle Quad:** h2 per panel heading. Section has no section-level h2; panel headings provide structure.
- **Shop New Arrivals:** h2 for section heading. Tiles use spans, not headings (correct for link labels).
- **Image with text overlay:** h2 for overlay title.
- **Finishing Touches:** h2 for section heading.
- **Insider's Club:** h2 for headline; logo text fallback is h2 when no image.

**Verdict:** Heading hierarchy is logical (h1 in hero, h2 for sections). No skipped levels.

### Lists and navigation

- **Category Pills:** `<nav aria-label="...">` + `<ul>` + `<li>`. Correct.
- **Shop New Arrivals:** `<ul class="ak-new-arrivals__grid" role="list">` + `<li>`. List styling reset with `list-style: none`.
- **Finishing Touches:** Carousel uses `role="region"` + `aria-roledescription="carousel"`. Slides get `role="group"` + `aria-roledescription="slide"` via JS. Nav has `aria-label="Carousel navigation"`.

### Section landmarks

All sections use `aria-labelledby` (when heading present) or `aria-label` (when no heading):

- AK Video: `aria-label="{{ section.settings.title | default: 'Video' }}"`
- Category Pills: `aria-labelledby="pills-heading-{{ id }}"` or `aria-label="Shop by category"`
- Lifestyle Quad: `aria-label="Campaign lifestyle grid"` or custom
- Shop New Arrivals: `aria-labelledby="new-arrivals-heading-{{ id }}"` or `aria-label="Shop new arrivals"`
- Image overlay: `aria-label="{{ title | default: label | default: 'Promotional banner' }}"`
- Finishing Touches: `aria-labelledby="finishing-heading-{{ id }}"` or `aria-label="Finishing touches"`
- Insider's Club: `aria-label="Insider's Club"` or custom

---

## 2. Labels (human-readable, not URLs)

Audit checked that no links, buttons, or regions use raw URLs or technical paths as accessible names.

| Element | Label source | Verdict |
|---------|--------------|---------|
| Category pills | Block `label` (e.g. "Clothing") | Pass |
| Lifestyle Quad panel links | `panel_heading \| panel_cta_text \| 'View campaign'` | Pass |
| Shop New Arrivals tiles | Block `label` (e.g. "Clothing") | Pass |
| Image overlay full link | `label \| title \| 'Learn more'` | Pass |
| Finishing Touches product links | `aria-label="{{ product.title }}"` | Pass |
| Carousel prev/next | `aria-label="Previous products"` / `"Next products"` | Pass |
| AK Video controls | "Pause video", "Play video", "Unmute", "Mute" | Pass |
| Button snippet | Uses `label` (e.g. "JOIN NOW", "LOG IN") | Pass |
| +More Colors link | Visible text "+More Colors" | Pass |

**Verdict:** All labels are human-readable. No URLs used as accessible names.

---

## 3. Tab control and keyboard

### Focusable elements

- **AK Video:** Start card (tabindex="0", role="button"), pause, mute, replay, transcript details. All get `:focus-visible` styles.
- **Category Pills:** Pill links (`<a>`) and non-link spans (not focusable; correct). Pills have `min-height: 44px`, `min-width: 44px`.
- **Lifestyle Quad:** Panel links, pause buttons. `:focus-visible` on `.ak-quad__cta-link` and `.ak-quad__pause-btn`.
- **Shop New Arrivals:** Heading link (when set), tile links. `:focus-visible` on title link and tile link.
- **Image overlay:** Full-area link (when no buttons), button links. `:focus-visible` on `.banner--full-link` and `.image-with-text-overlay__buttons .button`. Stretched link gets `tabindex="-1" aria-hidden="true"` when buttons exist (avoids duplicate tab stops).
- **Finishing Touches:** Product links, +More Colors, prev/next, page dots. `:focus-visible` on product link, more_color, dots. Page dots have `min-width: 24px; min-height: 24px`.
- **Insider's Club:** Buttons, logo link. `:focus-visible` on both.

### Touch targets

- Pills: 44×44px min (WCAG 2.5.8)
- Video controls: 44×44px
- Carousel page dots: 24×24px min
- +More Colors: `min-height: 44px` (styles.scss.liquid)
- Shop New Arrivals title link: `min-height: 44px`

---

## 4. Screen reader functionality

### Announcements

- **AK Video:** Visually hidden `aria-live="polite"` region (`.ak-video__sr-status`) announces "Pause video" / "Play video" and "Mute" / "Unmute" on state change.
- **Finishing Touches carousel:** Visually hidden `aria-live="polite"` region announces "Page X of Y" on slide change.

### Dynamic labels

- **AK Video:** Pause button `aria-label` toggles "Play video" / "Pause video"; mute button toggles "Unmute" / "Mute".
- **Lifestyle Quad:** Video pause button toggles "Play video" / "Pause video".
- **Finishing Touches:** Prev/next get `aria-disabled` based on position.

### Price semantics

- **product-thumbnail__product-info.liquid:** Visually hidden "Sale price:", "Price:", "Original price:" labels for screen readers.

### Decorative content

- **AK Video:** Logo overlay `aria-hidden="true"`, play circle SVG `aria-hidden="true"`.
- **Lifestyle Quad:** Gradient overlay `aria-hidden="true"`.
- **Shop New Arrivals:** Label icons `aria-hidden="true"`.
- **Insider's Club:** Benefit icons use `aria-hidden="true"` when `icon_alt_text` blank; otherwise descriptive alt.

---

## 5. Notable implementations

### Nested links (Finishing Touches)

Product card and +More Colors are separate links (no nesting). Main product link closes before `product-thumbnail__swatch` inclusion.

### Duplicate links (Image overlay)

When buttons exist, the full-area link gets `tabindex="-1" aria-hidden="true"` so screen readers and keyboard users hit only the buttons.

### Reduced motion

- **AK Video:** `prefers-reduced-motion` keeps controls/transcript visible and disables animations.
- **Image overlay:** `prefers-reduced-motion` disables scroll-triggered animations.

### New-tab links

Image overlay and other link usages add `(opens in new tab)` to `aria-label` when `target="_blank"`, plus `rel="noopener"`.

---

## 6. Minor observations (non-blocking)

1. **Shop New Arrivals tile alt:** When `image_alt` and `image.alt` are blank, `tile_alt` falls back to `''` (decorative). The link’s accessible name from the visible label is sufficient.
2. **Lifestyle Quad panel link aria-label:** Uses `panel_heading | default: panel_cta_text | default: 'View campaign'`. "View campaign" is generic but acceptable when both are blank.
3. **Category Pills non-link pills:** Rendered as `<span>` with `cursor: default`. Correctly non-focusable; no fake link.

---

## 7. Validation recommendation

Per `shopify-section-render-validation.mdc`, after any visual or structural change to these sections:

1. Push and wait for Shopify sync.
2. Run: `curl -s <preview-url> | grep -o '<pattern>'` to inspect rendered HTML.
3. Confirm which Liquid branches are used (e.g. links vs. non-links).
4. Screenshot the section to verify appearance.

**Tab control (required):** Visually review the section and list every important element (headings, CTAs, links, buttons). Tab through the section and confirm each of those is a tab stop with a visible focus style. See **Tab control: why live text was missed and how to validate** above.

---

## 8. Tab control and screen reader messages — verification

### Tab control (keyboard focus order and focusability)

| Section | Focusable elements | Code verification |
|---------|--------------------|--------------------|
| **AK Video** | Start card (when shown), Pause, Mute, Replay, Transcript summary | Start card: `tabindex="0"` + `role="button"` + keydown for Enter/Space (`ak-video.liquid` ~157, 896–901). Pause/Mute: `<button>`. Dismiss overlay: `tabindex="-1"` (intentionally not in tab order). Transcript: `<details>`/`<summary>` (native focusable). |
| **Category Pills** | Pill links only | `<a>` for links; non-link pills are `<span>` (not focusable). `:focus-visible` on `.ak-pills__pill` (category-pills ~167–168). |
| **Lifestyle Quad** | Panel links, Pause buttons | `.ak-quad__cta-link`, `.ak-quad__pause-btn`; `:focus-visible` (lifestyle-quad ~128–129, 191–192). |
| **Shop New Arrivals** | Section title link (if set), tile links | `.ak-new-arrivals__title-link`, `.ak-new-arrivals__tile-link`; `:focus-visible` (shop-new-arrivals ~123–129, 151–152). Non-linked tiles use `<div>` (not focusable). |
| **Image overlay** | Full-area link OR button links | When buttons exist: full link has `tabindex="-1" aria-hidden="true"` so only buttons are in tab order (include-image-with-text-overlay ~435). `:focus-visible` on `.banner--full-link` and `.button` (~336–337). |
| **Finishing Touches** | Product links, +More Colors, Prev/Next, page dots | All are `<a>` or Flickity-generated focusable controls. `:focus-visible` on product link, `.more_color`, prev/next, dots (finishing-touches ~72–75). |
| **Insider's Club** | Buttons, logo link; optional scroll region | Scroll wrap gets `tabindex="0"` only when max height set (insiders-club ~247). `:focus-visible` on buttons and logo link (~164–165). |

**Live text in tab order (2026-03):** Section headings and key visible text are focusable so keyboard and screen reader users can tab to the words that describe each section. Each has `tabindex="0"` and `:focus-visible` styling:
- **AK Video:** Overlay subheading (line1), overlay heading, overlay CTA (e.g. "Discover").
- **Category Pills:** h2 section heading (e.g. "New for the Season").
- **Shop New Arrivals:** h2 when the heading is not a link (otherwise the link is focusable).
- **Lifestyle Quad:** Panel h2 and CTA text when the panel has no link (caption only).
- **Image overlay:** h2 (e.g. "Spring Botanicals").
- **Finishing Touches:** h2 section heading.
- **Insider's Club:** Headline h2 and logo-text h2 ("Anne Klein Insider's Club" when no image).

**Conclusion:** Tab order follows DOM order and includes live text stops. No interactive element that should be focusable uses `tabindex="-1"` except the image-overlay full link when buttons exist (to avoid duplicate tab stops) and the video dismiss overlay (not a control).

### Screen reader announcements (live regions and dynamic labels)

| Section | What is announced | Code verification |
|---------|-------------------|--------------------|
| **AK Video** | Play/Pause and Mute/Unmute state changes | Live region: `.ak-video__sr-status` with `aria-live="polite" aria-atomic="true"` (ak-video.liquid ~139). On mute click: `srStatus.textContent = label` ("Mute" or "Unmute") (~942). On pause/play (updatePauseBtn): `srStatus.textContent = label` ("Play video" or "Pause video") (~964). Button `aria-label` also toggles (updateMuteBtn ~936–937, updatePauseBtn ~956–957). |
| **Finishing Touches carousel** | Current page on load and on slide change | Live region: `.ak-finishing-touches__sr-status` with `aria-live="polite" aria-atomic="true"`, inserted in JS (finishing-touches ~304). `updateNavState` sets `$live.text(...'Page ' + (idx + 1) + ' of ' + total)` (~327). Called on Flickity `ready` and `change` (~266–270). Prev/Next get `aria-label="Previous products"` / `"Next products"` and `aria-disabled` (~309–310, 322–323). |
| **Finishing Touches slides** | Slide identity | Each cell gets `role="group"`, `aria-roledescription="slide"`, `aria-label` = product name or "Product X of Y" (~291–298). |

**Conclusion:** Video control state changes and carousel page changes are announced to screen readers via polite live regions; button/slide labels are human-readable and updated correctly.

### Recommended live checks (not done in this audit)

- **Keyboard:** Tab through the homepage sections in order and confirm focus is visible and no focus trap.
- **Screen reader:** With VoiceOver (macOS) or NVDA (Windows), confirm announcements for "Pause video" / "Play video" and "Mute" / "Unmute" when using AK Video controls, and "Page X of Y" when changing Finishing Touches slides.

---

## 9. Simulated live testing (browser accessibility snapshot)

**Date:** 2026-03-20  
**Method:** Cursor IDE Browser MCP — accessibility snapshot of preview URL (homepage), interactive elements and main-content structure.  
**URL:** `https://a3ivm5uy5adm3ogw-27473313863.shopifypreview.com/`

### 9.1 What was simulated

- **Accessibility tree:** Full snapshot of the page including `main` / main content, and interactive-only snapshot (focusable elements).
- **Tab order:** Inferred from the list of interactive refs (focusable elements in DOM order). Video control was not clicked (button is opacity: 0 until hover/focus); keyboard Tab would reach it.
- **Screen reader names:** Every interactive element’s accessible name was read from the snapshot (equivalent to what a screen reader would announce).

### 9.2 Homepage sections in the tree

| Section | Region / landmark | Observed names |
|--------|--------------------|-----------------|
| AK Video (hero) | region "Spring 2026 Campaign" | Heading "The Invisible Thread", link "Discover" |
| Category Pills | region "New for the Season", navigation "New for the Season" | Heading "New for the Season", listitems: Clothing, Shoes, Handbags, Watches, Jewelry |
| Lifestyle Quad | region "Campaign lifestyle grid" | Headings and links: Dress with Intention / SHOP DRESSES, Business Leisure / SHOP WORKWEAR, etc. |
| Shop New Arrivals | region "SHOP NEW ARRIVALS" | Heading, listitems: Clothing, Watches, Handbags, Opticals |
| Image overlay | region "Spring Botanicals" | Heading "Spring Botanicals", link "shop now" |
| Finishing Touches | region "FINISHING TOUCHES" | Heading, product links (product titles), navigation "Carousel navigation", "Page dot 1", "Page dot 2" |
| Insider's Club | region "Insider's Club" | Heading "Sign up today to gain access to exclusive deals!", Email, Sign Up, etc. |

### 9.3 Interactive elements (focusable) — names

- **Video:** "Play video" and "Pause video" (two controls; labels appropriate and dynamic per code).
- **Cart:** "Shopping cart, 0 items in cart".
- **Product links:** Product titles only (e.g. "15MM Twisted Hoop Earrings", "Large Printed Tote with Detachable Strap") — human-readable.
- **+More Colors:** "+More Colors" — clear.
- **Carousel:** "Carousel navigation", "Page dot 1", "Page dot 2" — clear.
- **Insider's Club:** "LOG IN", "Email", "Sign Up", "Sign Up & Save", "Anne Klein" (link) — clear.
- **Skip link:** "Skip to main content" — present and correct.

### 9.4 Issues found (outside homepage sections: header/footer)

| Item | Finding | WCAG |
|------|---------|------|
| Header logo link | Accessible name is long string starting with `<img ... alt="Anne Klein Log` (truncated) — not a short, human-readable label. | 2.4.4 (Link Purpose) |
| Footer logo link | Accessible name includes `alt="">` (empty alt) — effectively no descriptive name. | 2.4.4 |
| One link (footer/modal) | One focusable link has **no name** (empty accessible name). | 2.4.4 (Critical) |

These are in the header/footer, which are out of scope for this audit; recommend fixing in theme header/footer (logo links: use `aria-label="Anne Klein"` or `alt="Anne Klein"`; find and fix the link with no name).

### 9.5 Section-level outcome

- **Homepage sections (hero through Insider's Club):** All observed control and link names are human-readable and relevant. Tab order follows DOM; no focus trap observed. Carousel and video controls have appropriate roles and labels in the tree.
- **Video control:** Not clicked (opacity: 0); keyboard users would reach it by Tab and get `:focus-visible`; code confirms live region and `aria-label` updates on play/pause and mute.

---

## 10. Audit run (full validation)

**Date:** 2026-03-20  
**Method:** Code verification + accessibility snapshot. Tab control validated using “visual review vs tab order” (list important elements → verify each is a tab stop).

### 10.1 Important elements vs tab stops (homepage sections)

For each section, every important visible element was listed and verified as a tab stop (native focusable or `tabindex="0"`).

| Section | Important element | Tab stop? | Verification |
|---------|-------------------|-----------|--------------|
| **AK Video** | Overlay subheading (line 1) | Yes | `ak-video.liquid` L249: `<p class="ak-video__overlay-line1" tabindex="0">` |
| | Overlay heading (e.g. "The Invisible Thread") | Yes | L252: `<{{ heading_tag }} class="ak-video__overlay-heading" tabindex="0">` |
| | Overlay CTA (e.g. "Discover") | Yes | L255: `<p class="ak-video__overlay-cta" tabindex="0">` |
| | Start card (when shown) | Yes | L157: `tabindex="0" role="button"` |
| | Pause, Mute, Replay, Transcript | Yes | `<button>`, `<details>` |
| **Category Pills** | Section heading (e.g. "New for the Season") | Yes | `index__category-pills.liquid` L207: `<h2 ... tabindex="0">` |
| | Pill links (Clothing, Shoes, etc.) | Yes | `<a class="ak-pills__pill">` |
| **Lifestyle Quad** | Panel heading (when no link) | Yes | `index__lifestyle-quad.liquid` L340: `<h2 class="ak-quad__heading" tabindex="0">` |
| | Panel CTA text (when no link) | Yes | L343: `<p class="ak-quad__cta" tabindex="0">` |
| | Panel link (when link set) | Yes | `<a class="ak-quad__cta-link">` — single tab stop for heading + CTA |
| | Pause button per panel | Yes | `<button class="ak-quad__pause-btn">` |
| **Shop New Arrivals** | Section heading | Yes | When no link: `index__shop-new-arrivals.liquid` L243 `tabindex="0"` on h2. When link: `<a class="ak-new-arrivals__title-link">` |
| | Tile links (e.g. Clothing, Watches) | Yes | `<a class="ak-new-arrivals__tile-link">` |
| **Image overlay** | Section heading (e.g. "Spring Botanicals") | Yes | `include-image-with-text-overlay.liquid` L452: `<h2 ... tabindex="0">` |
| | Button(s) or full-area link | Yes | `<a>` via button snippet or `.banner--full-link` (when no buttons) |
| **Finishing Touches** | Section heading | Yes | `index__finishing-touches.liquid` L133: `<h2 ... tabindex="0">` |
| | Product links, +More Colors, prev/next, dots | Yes | `<a>`, Flickity controls |
| **Insider's Club** | Logo text (when no image) | Yes | `index__insiders-club.liquid` L264: `<h2 class="ak-insiders__logo-text" tabindex="0">` |
| | Headline | Yes | L281: `<h2 class="ak-insiders__headline" tabindex="0">` |
| | Buttons, logo link, scroll region (if max height) | Yes | `<a>`, `include 'button'`, optional `tabindex="0"` on scroll wrap |

**Result:** All listed important elements are tab stops. When CTAs get links, they must be implemented as `<a>` or `<button>` so they remain the single tab stop (see CTA rule in “Tab control: why live text was missed and how to validate”).

### 10.2 Markup, labels, focus-visible

| Check | Result |
|-------|--------|
| Heading hierarchy (h1 hero, h2 sections) | Pass — verified in section files |
| Landmarks (section, nav, region) with aria-labelledby / aria-label | Pass |
| No URL or technical path as accessible name | Pass |
| :focus-visible on all focusable elements (links, buttons, live text) | Pass — each section has focus-visible for headings, CTAs, links, buttons |

### 10.3 Live preview (browser snapshot)

An interactive-only accessibility snapshot was run on the preview URL. The snapshot currently shows **42 focusable elements** (links, buttons, inputs). The **live-text tab stops** (section headings, overlay heading/CTA) are implemented in theme code; the preview will show them as additional focusable elements **after the theme is pushed/synced** to Shopify. To confirm on the live site: tab through the homepage and verify focus lands on each section heading and key CTA text, with visible focus rings.

### 10.4 Audit result

| Category | Status |
|----------|--------|
| Markup structure | **Pass** |
| Human-readable labels | **Pass** |
| Tab control (including live text) | **Pass** — code verified; live tab-through recommended after sync |
| Screen reader (live regions, aria-label) | **Pass** |
| Focus visibility | **Pass** |

**Out of scope (header/footer):** Header logo link, footer logo link, and one link with no name remain as previously noted; fix in theme header/footer.

---

## 11. References

- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [BEST-PRACTICES-SECTIONS.md](BEST-PRACTICES-SECTIONS.md)
- [shopify-section-render-validation.mdc](../.cursor/rules/shopify-section-render-validation.mdc)
