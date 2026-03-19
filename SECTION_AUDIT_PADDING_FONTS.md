# Section audit: padding (desktop + mobile), fonts, overlay container

This document summarizes the pattern applied and which sections were updated.

## Standard pattern (AK Video–style)

1. **Section spacing**
   - `padding_top`, `padding_bottom` (desktop), range 0–200px, step 5.
   - `padding_top_mobile`, `padding_bottom_mobile` (mobile), same range; default to desktop values when blank.
   - Applied to section wrapper (`#shopify-section-{{ id }}` or section’s main container) with a `@media (max-width: 798px)` override for mobile.

2. **Fonts**
   - A **“Fonts”** (or “Fonts (video & cards)”) header in the schema.
   - Default font select: system, Arial, Georgia, Times New Roman, Verdana, Trebuchet MS.
   - Where relevant: per–text-type font (e.g. overlay line 1, heading, CTA, start/end card, hashtag) with “Section default” option.

3. **Text**
   - `text-transform: none` on all editable text so case matches schema input.

4. **Image + text overlay**
   - **Text overlay container:** controllable padding for the overlay/caption box:
     - `overlay_container_padding_top`, `overlay_container_padding_bottom` (desktop).
     - `overlay_container_padding_top_mobile`, `overlay_container_padding_bottom_mobile` (mobile).
   - **Spacing between text:** e.g. `text_spacing` or “Padding below line 1 / line 2” (like AK Video).

---

## Sections and snippets updated

| Section / snippet | Section spacing (desktop + mobile) | Fonts | Text overlay container | text-transform: none |
|------------------|------------------------------------|-------|------------------------|----------------------|
| **ak-video.liquid** | Already had overlay padding; section uses wrapper | Yes (per heading type) | Yes (overlay + line spacing) | Yes |
| **index__category-pills.liquid** | Yes (added mobile) | Yes (heading vs pills) | N/A | Yes |
| **index__image-with-text-overlay.liquid** | Yes (added mobile + Section spacing header) | Yes (Fonts header; preheading/heading/subheading already had font selects) | Yes (overlay_container_padding_*) | In snippet |
| **snippets/include-image-with-text-overlay.liquid** | Uses section padding + mobile; applies overlay padding to `.caption` | Uses object font settings | Yes (desktop + mobile on `.caption`) | Yes (preheading, heading, subheading) |
| **index__heading.liquid** | Yes (added mobile) | Yes (font_family) | N/A | In snippet |
| **snippets/include-heading.liquid** | Yes (mobile in media query) | Yes (font_family → font_stack) | N/A | Yes |
| **index__lifestyle-quad.liquid** | Yes (added mobile + Section spacing header) | Yes (Fonts header) | Yes (overlay_caption_padding_*; caption + cta-link) | Yes (heading, CTA) |
| **index__hero-campaign.liquid** | Yes (added mobile + Section spacing header) | Yes (Fonts header) | Yes (overlay_caption_padding_*) | Yes (preheading, heading, CTA) |
| **index__finishing-touches.liquid** | Yes (added mobile) | Yes (Fonts header) | N/A | Yes (heading) |
| **index__insiders-club.liquid** | Yes (added mobile) | Yes (Fonts header) | N/A | Yes (headline, benefit text) |
| **index__shop-new-arrivals.liquid** | Yes (added mobile) | Yes (Fonts header) | N/A | Yes (title) |

---

## Sections not yet updated (same pattern can be applied)

- Other **index__*** sections (e.g. index__featured-promotions, index__blog-posts, index__featured-collection, index__newsletter, index__gallery, index__content-page, index__icon-with-text-column, index__featured-product, index__slideshow-classic, index__testimonial, index__divider, index__contact-form, index__map, index__video_with_text, index__video-autoloop, index__slideshow-with-text, index__collection-list, index__logo-list, index__rich-text, index__html).
- **Page/template sections** (page__banner, page__main, search__banner, collection__banner, article__banner, blog__banner, etc.): add Section spacing (desktop + mobile) and Fonts where they have headings/body text.
- **Product/collection sections**: product__main, collection__main, etc. – add Section spacing + Fonts if they expose section-level heading/text.
- Any section that uses **include-image-with-text-overlay** (e.g. as a block) already benefits from snippet changes (overlay container padding, mobile padding, text-transform) as long as the section schema passes the new settings (padding_top_mobile, padding_bottom_mobile, overlay_container_padding_*). The **index__image-with-text-overlay** section schema was updated; other sections that use the snippet may need the same schema fields if they use the snippet as section (object = section).

---

## Reusing the pattern on a new section

1. **Liquid (top of section):**
   - `padding_top_mobile = section.settings.padding_top_mobile | default: padding_top`
   - `padding_bottom_mobile = section.settings.padding_bottom_mobile | default: padding_bottom`
   - Font: keep or add `font_family` and the usual `{% case %}... font_stack` block.

2. **Styles:**
   - Section wrapper: `padding-top: {{ padding_top }}px; padding-bottom: {{ padding_bottom }}px;`
   - Add:
     ```liquid
     @media only screen and (max-width: 798px) {
       #shopify-section-{{ id }} { padding-top: {{ padding_top_mobile }}px; padding-bottom: {{ padding_bottom_mobile }}px; }
     }
     ```
   - For overlay/caption: use `overlay_caption_padding_*` (or `overlay_container_padding_*`) variables on the caption div, with a mobile override in the same media query.
   - Add `text-transform: none` to heading and body text that comes from schema.

3. **Schema:**
   - Under a **“Section spacing”** or **“Layout”** header: `padding_top`, `padding_bottom` (label with “(desktop)”), then `padding_top_mobile`, `padding_bottom_mobile` (label with “(mobile)”), range 0–200, step 5.
   - Under a **“Fonts”** header: `font_family` select (options: system, arial, georgia, times, verdana, trebuchet).
   - For image+text overlay sections: under **“Text overlay container”**, add `overlay_container_padding_top`, `overlay_container_padding_bottom`, `overlay_container_padding_top_mobile`, `overlay_container_padding_bottom_mobile` (range 0–200 or 0–120, step 4 or 5).
