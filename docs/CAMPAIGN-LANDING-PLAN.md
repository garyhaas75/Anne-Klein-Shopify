# Campaign landing page — build order (10 sections)

Single checklist for the **AK Campaign Landing Page** (Figma: `AK_Homepage-Launch-2026`, mobile frame **`AK_Campaign Landing Page 2026_Mobile`**, node **`35:616`**; file key `agnYrbiuU2Ory43nJYA4Nk`).  
Work **one section per iteration**; update the **Status** row when something ships.

| Step | Section (Figma, top → bottom) | Theme approach (high level) | Status |
|------|------------------------------|-----------------------------|--------|
| 1 | Intro: hero still + vertical rule + “INTRODUCING” + main title | `page__ak-campaign-intro` + `templates/page.campaign.json` | **Done** |
| 2 | “The Film” heading + body copy (then main film video below in design) | **`page__ak-campaign-copy`** — heading + **richtext** body (bold/links in editor). Add **AK Video** below in theme editor when the film file is ready. | **Done** (copy); video = merchant adds `ak-video` section next |
| 3 | “Anne Klein Spring-Summer 2026” + paragraph + “SHOP THE COLLECTION” | Reuse / configure `index__rich-text` (or dedicated CTA section if needed) | Not started |
| 4 | Two full-bleed model portraits (name + role on image) | Two× `index__image-with-text-overlay` **or** one section with two blocks | Not started |
| 5 | Extra full-width stills (no copy) | Image-only: `index__image-with-text` / overlay with empty text, gutter off | Not started |
| 6 | Narrow tall inset (e.g. 9:16-style) | `ak-video` or image with max-width **or** small `page__ak-campaign-inset-media` | Not started |
| 7 | 2×2 BTS grid | `index__gallery` (e.g. 2 per row, 4 images) | Not started |
| 8 | Large pull quotes (Amiri-style + attribution), repeats | New `page__ak-campaign-quote` (blockquote + blocks or duplicate instances) | Not started |
| 9 | “Behind the Scenes” + Instagram line | `index__rich-text` or heading + RTE with link on `@handle` | Not started |
| 10 | Asymmetric editorial collage | New custom section (many positioned blocks) or simplified grid—confirm in Figma before build | Not started |

## Template

- Page template: **`campaign`** → [`templates/page.campaign.json`](../templates/page.campaign.json)
- Add new sections to that JSON (or via **Add section** in the theme editor) as each step is built.

## Current position

- **Completed through:** Step 2 copy block (`page__ak-campaign-copy` on `campaign` template).  
- **Still manual:** Under **AK Campaign copy**, use **Add section → AK Video** and assign the campaign film; `ak-video` only renders when a video is set.
