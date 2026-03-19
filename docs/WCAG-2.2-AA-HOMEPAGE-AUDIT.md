# WCAG 2.2 AA Homepage Audit Report

**Scan date:** 2026-03-18  
**URL:** https://a3ivm5uy5adm3ogw-27473313863.shopifypreview.com/  
**Scope:** Homepage (all sections in view)  
**Tags scanned:** wcag22aa, wcag2aa, wcag21aa, wcag22a, wcag2a, wcag21a, cat.color, cat.keyboard, cat.text-alternatives, cat.aria, section508  

**Results summary:** 7 violation groups (multiple nodes in some); 7 incomplete; 42 passes; 29 inapplicable.

---

## Summary by priority

| Priority   | Count | Source                          |
|-----------|-------|----------------------------------|
| Critical  | 3     | Theme (footer, search, nav link) |
| Serious   | 6+    | Theme (contrast, iframe, link)   |
| Moderate  | 3     | Theme (landmarks)                |
| Third-party | 2   | Shopify preview bar (not in theme) |

---

## 1. Critical – fix first

### 1.1 Footer: Privacy choices icon missing `alt`

- **Rule:** Images must have text alternatives (WCAG 2.1.1 / 1.1.1).
- **Node:** `.footer__menu-link:nth-child(4) > a > img`  
  `<img src=".../privacy-choices-icon.png">` with no `alt`.
- **Section:** Footer (shared).
- **Fix:** Add `alt=""` if decorative, or `alt="Privacy choices"` (or match link purpose). Prefer a short descriptive `alt` since the image is inside a “Privacy” link.

**Where to fix:** Footer section/snippet that outputs the “Your Privacy Choices” link and icon (e.g. `footer-classic.liquid` or footer snippet).

---

### 1.2 Search submit button has no accessible name

- **Rule:** Buttons must have an accessible name (WCAG 4.1.2).
- **Node:** `input#search_submit.search_submit[value=""][type="submit"]` – empty `value`, no `aria-label` or `<label>`.
- **Section:** Header (search form).
- **Fix:** Either set `value="Search"` (visible label) or add `aria-label="Search"` so the button has an accessible name.

**Where to fix:** Header section or snippet that renders the search form (e.g. `header-centered.liquid` or search form partial).

---

### 1.3 Nav link with no accessible text (e.g. “Home”)

- **Rule:** Links must have accessible text (WCAG 2.4.4 / 4.1.2).
- **Node:** `<a href="/" class="is-active"> </a>` – empty content, no `aria-label` or `title`.
- **Section:** Header / navigation.
- **Fix:** Add visible text (e.g. “Home”) or `aria-label="Home"` so the link has an accessible name.

**Where to fix:** Header/nav snippet that outputs the desktop or mobile “Home” link with `class="is-active"`.

---

## 2. Serious – fix next

### 2.1 “+More Colors” link contrast (WCAG AAA 7:1)

- **Rule:** Color contrast (enhanced 7:1 for small text).
- **Nodes:** Multiple `.more_color` links in product thumbnails, e.g.  
  `p.more_color` with `#797067` on `#ffffff` → **4.85:1** (fails 7:1).
- **Section:** **Finishing Touches** (product carousel/grid).
- **Fix:** Darken the “+More Colors” text to meet at least 4.5:1 (AA) or 7:1 (AAA). Example: use a darker gray or match body text color; avoid `#797067` on white for 10px text.

**Where to fix:** Product thumbnail/card snippet or Finishing Touches section (e.g. `.thumbnail-swatch .more_color` or equivalent).

---

### 2.2 Footer / Klaviyo link contrast

- **Rule:** Color contrast (enhanced).
- **Nodes:**
  - Klaviyo form link: `#0066cc` on `#f6f5f1` → **5.1:1** (fails 7:1).
  - “Privacy Policy” link: same 5.1:1 on `#f6f5f1`.
- **Section:** Footer (newsletter/Klaviyo block and footer menu).
- **Fix:** Use a darker blue (or darker text color) so contrast is at least 4.5:1 (AA); 7:1 if targeting AAA.

**Where to fix:** Footer styles and/or Klaviyo embed (footer section, custom CSS, or Klaviyo snippet).

---

### 2.3 Shopify preview bar iframe (third-party)

- **Rule:** Frames must have a title (WCAG 2.1.1).
- **Node:** `#PBarNextFrame` – Shopify preview bar iframe with no `title`.
- **Section:** N/A (Shopify-injected preview bar).
- **Fix:** Not in theme code. Only present on preview URLs; production is unaffected. Optional: document for Shopify or ignore for production.

---

## 3. Moderate – improve structure

### 3.1 Content not in landmarks

- **Rule:** Best practice – page content should be in landmarks (regions).
- **Nodes:**
  - Skip link: `.skip` (“Skip to main content”).
  - Top bar: `.top-bar.navbar.is-justify-space-between`.
  - Preview bar content: `#PBarNextFrame ._LeftSlot_2i9ku_44`.
- **Section:** Layout (header) and Shopify preview bar.
- **Fix:** Wrap the top bar in a `<header>` (or existing header landmark) so the navbar is inside a landmark. Ensure the skip link target (`#main-content`) is the start of `<main>`. Preview bar is third-party.

**Where to fix:** `layout/theme.liquid` and header section – ensure structure is `<header>`, `<main id="main-content">`, etc.

---

## 4. Third-party (not in theme code)

| Item              | Node / source              | Note                                      |
|-------------------|----------------------------|-------------------------------------------|
| Preview bar button | `._GrabberButton_3033z_8` | No visible text / no aria-label; Shopify. |
| Preview bar iframe | `#PBarNextFrame`          | No title; Shopify. Only on preview URL.   |

No theme changes required for production; optional to report to Shopify.

---

## 5. Section mapping (homepage)

| Section                    | File / area                    | Issues in this audit                          |
|---------------------------|---------------------------------|-----------------------------------------------|
| Header                    | header-centered, search form   | Search submit (1.2), Home link (1.3), landmarks (3.1) |
| AK Hero Campaign          | index__hero-campaign           | —                                             |
| AK Category Pills         | index__category-pills         | —                                             |
| AK Lifestyle Quad         | index__lifestyle-quad          | —                                             |
| Shop New Arrivals         | index__shop-new-arrivals       | —                                             |
| Image with text overlay   | index__image-with-text-overlay | —                                             |
| Finishing Touches         | index__finishing-touches       | “+More Colors” contrast (2.1)                 |
| Insiders Club             | index__insiders-club           | —                                             |
| Footer                    | footer-classic, Klaviyo        | Privacy icon alt (1.1), link contrast (2.2)  |
| Layout                    | theme.liquid                   | Landmarks (3.1)                               |

---

## 6. Recommended order of fixes

1. **Critical:** Footer privacy icon `alt` (1.1), search submit name (1.2), nav “Home” link name (1.3).
2. **Serious:** “+More Colors” contrast in Finishing Touches (2.1), footer/Klaviyo link contrast (2.2).
3. **Moderate:** Wrap top bar in `<header>` and confirm `<main id="main-content">` (3.1).

---

## 7. References

- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- Project rules: [.cursorrules](../.cursorrules)
- Section best practices: [BEST-PRACTICES-SECTIONS.md](BEST-PRACTICES-SECTIONS.md)
- Homepage audit plan: [HOMEPAGE-2026-AUDIT-PLAN.md](HOMEPAGE-2026-AUDIT-PLAN.md)
