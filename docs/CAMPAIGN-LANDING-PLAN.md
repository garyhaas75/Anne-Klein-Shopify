# Campaign landing page — build order (10 sections)

Single checklist for the **AK Campaign Landing Page** (Figma: `AK_Homepage-Launch-2026`, mobile frame **`AK_Campaign Landing Page 2026_Mobile`**, node **`35:616`**; file key `agnYrbiuU2Ory43nJYA4Nk`).  
Work **one section per iteration**; update the **Status** row when something ships.

## Keeping the plan aligned with Figma

**Source of truth:** The **Figma file + named frames** (desktop campaign page + `AK_Campaign Landing Page 2026_Mobile`) define layout and content structure. This markdown table is a **map**, not a substitute for opening the frame.

**Before building or extending any step:**

1. **Identify the slice** — Which vertical band of the Figma scroll does this step cover? (Note frame name or node id in the table row when helpful.)
2. **Describe layout topology** — One column, two columns, zigzag (text/image swap), full-bleed vs inset, text overlay vs below vs separate band.
3. **Choose theme approach** — Reuse a section (`index__*`), extend an AK section, or add a new `page__ak-*` section. **Do not** assume “stills” = only stacked images if Figma shows quotes or split columns.
4. **Resolve gaps in writing** — If the plan row and Figma disagree, **update this table first**, then code.

**Questions to ask whenever a step is ambiguous** (human or AI should pause and answer these):

| Topic | Question |
|-------|----------|
| **Scroll order** | Does this block sit above or below [named neighbor] in **both** desktop and mobile frames? |
| **Columns** | Single full-width, 50/50 split, asymmetric %, or grid (e.g. 2×2)? |
| **Bleed** | Edge-to-edge, or max-width / side gutters? |
| **Copy** | Where does text live: section header, overlay on image, under image, or separate section? |
| **Repeatability** | Fixed number of blocks vs merchant-addable blocks? |
| **Motion / video** | Autoplay, poster, aspect ratio locked (e.g. 9:16)? |
| **Type** | Match an existing campaign section (Amiri + system) or unique styles per Figma spec? |

**Process discipline**

- Treat **merchant/editor claims** (“I’m on the campaign page”, “this section”) as true; **verify implementation** by reading the Liquid schema for that section and comparing to Figma topology—not by re-checking URL guesses.
- After each merge: **Current position** + template `order` in [`page.campaign.json`](../templates/page.campaign.json) should match the **Figma top-to-bottom** sequence (allowing optional sections omitted in admin).

**Overlap note:** **Step 5b** (`page__ak-campaign-quote-zigzag`) already covers **large quote + attribution beside/near imagery**. **Step 8** below is for **additional** large quotes if Figma shows a *different* pattern (e.g. full-width quote only, no half-image). If Figma has no separate quote-only band, treat Step 8 as **N/A** or fold into 5b in this table.

| Step | Section (Figma, top → bottom) | Theme approach (high level) | Status |
|------|------------------------------|-----------------------------|--------|
| 1 | Intro: hero still + vertical rule + “INTRODUCING” + main title | `page__ak-campaign-intro` + `templates/page.campaign.json` | **Done** |
| 2 | “The Film” heading + body copy | **`page__ak-campaign-copy`** — **richtext** body (bold/links). | **Done** |
| **2b** | **Main campaign film** (immediately below “The Film” copy) | **`ak-video`** — on `campaign` template as **`campaign_film`** after **`film_copy`**. Assign video in editor; section outputs nothing until a file is set. Default layout **Feature**. | **In template** (add video in admin) |
| 3 | “Anne Klein Spring-Summer 2026” + paragraph + “SHOP THE COLLECTION” | **`page__ak-campaign-cta`** — **`collection_cta`** on template. Set **Button link** to the campaign collection. | **In template** (set URL in admin) |
| 4 | Two full-bleed model portraits (name + role on image) | **`page__ak-campaign-portrait`** — **`model_portraits`** on template (repeatable blocks; **desktop two-column** default per Figma; wrapper uses **`columns one-whole`** so the theme flex `.container` does not collapse width). | **In template** (add images + alt in admin) |
| 5 | Extra full-width stills + optional copy | **`page__ak-campaign-stills`** — section **heading + intro** (optional); each **Still** block: **Caption** with placement **none / below / overlay (bottom)** + scrim. | **In template** (add images, alt, captions in admin) |
| 5b | **Figma zigzag:** quote left / image right, then **image left / quote right** | **`page__ak-campaign-quote-zigzag`** — **`campaign_quote_zigzag`**; blocks **Quote + image row**; **Row layout** auto-alternates; richtext quote + attribution; 50/50 split (adjustable). | **In template** (tune copy + images) |
| 6 | Narrow tall inset (e.g. 9:16-style) | `ak-video` or image with max-width **or** small `page__ak-campaign-inset-media` | Not started |
| 7 | 2×2 BTS grid | `index__gallery` (e.g. 2 per row, 4 images) | Not started |
| 8 | **Only if Figma has quote-only bands** (no paired half-image) | New `page__ak-campaign-quote` **or** reuse/duplicate **quote zigzag** text column styling — **confirm in Figma** vs Step 5b | Confirm in Figma |
| 9 | “Behind the Scenes” + Instagram line | `index__rich-text` or heading + RTE with link on `@handle` | Not started |
| 10 | Asymmetric editorial collage | New custom section (many positioned blocks) or simplified grid—confirm in Figma before build | Not started |

## Template

- Page template: **`campaign`** → [`templates/page.campaign.json`](../templates/page.campaign.json)
- Add new sections to that JSON (or via **Add section** in the theme editor) as each step is built.

## Current position

- **On `campaign` template (order):** intro → **AK Campaign copy** → **AK Video** → **AK Campaign CTA** → **AK Campaign portrait** → **AK Campaign stills** → **AK Campaign quote zigzag** (Figma alternating quote/image rows).  
- **You still do in admin:** pick the **video** for AK Video; set the CTA **button link** (collection); upload **portrait** and **stills** images with **alt** text; edit **zigzag** quotes/attribution/images per Figma.
