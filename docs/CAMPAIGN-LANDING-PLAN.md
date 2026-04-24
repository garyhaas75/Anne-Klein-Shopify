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
| 6 | Narrow tall inset — **Figma mobile** `189:47` *AK_SS26_4_9x16_NO LOGO* (666×1020, centered in 798-wide frame) | **`page__ak-campaign-inset-media`** — **`campaign_inset_media`**. Defaults: max width **660px** (20px slider step, nearest to Figma **666px**; slider max **2240px** for near full-width), aspect **111/170**. Desktop: compare **`102:586`** for same scroll band. | **In template** (add image + alt in admin) |
| 7 | 2×2 BTS grid — Figma mobile cells **`189:70`–`189:73`** (~360×553, 12px gap, 33px side inset on 798 frame) | **`index__gallery`** — **`campaign_bts_grid`**: classic, **2** per row, **crop** on, **wide** + gutter. Section **Image sizing (classic)**: crop focal, object fit/position, **Cell aspect ratio** (e.g. **360 / 553**), min heights. `css_class` **`ak-campaign-bts-grid`**. | **In template** (add 4 images + alt; tune sizing in section settings) |
| 7b | **Two images + text below** (not zigzag): pair of stills, then quote/RT | **`page__ak-campaign-two-up-text`** — **`campaign_two_up_text`** (after BTS or wherever Figma places it). Two pickers, RTE, attribution, image + text typography. | **In template** (images, alts, copy) |
| 8 | **Only if Figma has quote-only bands** (no paired half-image) | New `page__ak-campaign-quote` **or** reuse/duplicate **quote zigzag** text column styling — **confirm in Figma** vs Step 5b | Confirm in Figma |
| 9 | “Behind the Scenes” + Instagram line (Figma **196:119**–**196:120**, mobile frame **35:616**) | **`page__ak-campaign-bts-collage`** — heading + **richtext** subcopy (default Instagram link). Same section as Step 10. | **In template** (`campaign_bts_collage` after BTS grid) |
| 10 | Asymmetric editorial collage (backdrop **191:89**; tiles **191:97**, **191:96**, **191:90**, **191:91**, **191:92**, **191:98**, **191:94**, **191:95**, **191:93** on **798×1545** stage) | **`page__ak-campaign-bts-collage`** — optional backdrop; **nine** `collage_tile` blocks with presets **p1–p9** (% positions from Figma) or **Custom** %; mobile = backdrop → text → **2-col** tile stack. | **In template** (add backdrop + tile images + **alt** in admin) |

### Anne Klein Artist Series page (`page.anne-klein-artist-series`)

**Figma file key:** `0kmSuSntT1RaS2ElBXMw25` — **Canvas “Artist Series”** node **`333:421`**; frames **`AK_Artist Series_Desktop`** **`351:1393`**, **`AK_Artist Series_Mobile`** **`333:422`**.  
**Template:** [`templates/page.anne-klein-artist-series.json`](../templates/page.anne-klein-artist-series.json).

| # | Band (Figma, top → bottom) | Theme section (`page.anne-klein-artist-series.json`) |
|---|----------------------------|------------------------------------------------------|
| 1 | Hero — full-bleed photo (butterflies + AK signature **baked in**), top-left wordmark, **featured artist: Anjelica Roselyn** overlay, white band w/ centered AK logo | **NEW** [`sections/page__ak-artist-series-hero.liquid`](../sections/page__ak-artist-series-hero.liquid) — `artist_series_hero` |
| 2 | **Where Style & Story Connect** — heading + 3-paragraph mission copy, optional Anne Klein signature pinned **bottom-right** | **NEW** [`sections/page__ak-artist-series-mission.liquid`](../sections/page__ak-artist-series-mission.liquid) — `artist_series_mission` |
| 3 | Primary interview / film | `ak-video` (feature) — `artist_series_video_primary` |
| 4 | **About the Artist** + bio (no button) | `page__ak-campaign-copy` — `artist_series_about` |
| 5 | Tight horizontal product line-up — **single composed image** | `page__ak-campaign-stills` (1 still) — `artist_series_product_band_image` |
| 6a | 4×2 product grid | `index__finishing-touches` — `artist_series_products` (8 hand-picked products) |
| 6b | **SHOP THE COLLECTION** button | `page__ak-campaign-cta` (button only) — `artist_series_mid_cta` |
| 7 | Zigzag stills (two photos + butterflies) — **single composed image** per design call | `page__ak-campaign-stills` (1 still) — `artist_series_zigzag_image` |
| 8 | **The Invisible Thread with Anjelica Roselyn** title | `page__ak-campaign-copy` (heading-only) — `artist_series_thread_heading` |
| 9 | Secondary campaign film | `ak-video` (hero) — `artist_series_video_secondary` |
| 10 | Centered pull quote | `page__ak-campaign-copy` — `artist_series_quote` |
| 11 | Large feature still | `page__ak-campaign-stills` (1 still) — `artist_series_feature_still` |
| 12 | Footer CTA — centered photo, pull quote, **ANNE KLEIN** brand label, cursive **Anne Klein signature** image, SHOP THE COLLECTION button | **NEW** [`sections/page__ak-artist-series-footer-cta.liquid`](../sections/page__ak-artist-series-footer-cta.liquid) — `artist_series_footer_cta` |

**New Liquid sections (live in repo):** `page__ak-artist-series-hero`, `page__ak-artist-series-mission`, `page__ak-artist-series-footer-cta`. Existing campaign sections are reused as-is for all other bands.

**Admin follow-up:**
- **Hero:** upload background image (butterflies + AK signature baked in), top-left wordmark, AK logo for the bottom band; set alt text.
- **Mission:** upload Anne Klein signature image for the bottom-right (or leave blank to hide).
- **Section 5 / 7 / 11:** upload the single composed images (product line-up, zigzag stills, feature still); set alt text.
- **Section 6a:** assign the 8 product handles (or switch `product_source` to `From collection` and pick the Artist Series collection).
- **Sections 6b / 12 (CTAs):** set the button link URL to the Artist Series collection.
- **Sections 3 / 9 (videos):** assign actual video files in the theme editor.
- **Footer CTA:** upload the campaign image and the cursive Anne Klein signature image.

## Template

- Page template: **`campaign`** → [`templates/page.campaign.json`](../templates/page.campaign.json)
- Add new sections to that JSON (or via **Add section** in the theme editor) as each step is built.

## Current position

- **On `campaign` template (order):** intro → **AK Campaign copy** → **AK Video** → **AK Campaign CTA** → **AK Campaign quote zigzag** → **AK Campaign inset media** → **AK Campaign two-up + text** (`campaign_two_up_text`) → **Gallery** (`campaign_bts_grid`) → **BTS collage** (`campaign_bts_collage`, `page__ak-campaign-bts-collage`) → **AK Campaign two-up + text** (duplicate block). *Re-add **AK Campaign stills** / **portraits** in the theme editor if your Figma scroll includes them but they dropped out of JSON (Shopify merges).*  
- **You still do in admin:** assign **video**; CTA **button link**; **zigzag** + **inset** + **BTS grid** + **BTS collage** (backdrop, nine tiles, alts) + **two-up** images and **alt** text; restore stills/portraits if needed.
