# Agent rules — Anne Klein Shopify theme

Follow these rules **exactly**. Do not skip them.

## Claims require evidence

- **Never** say something is **fixed**, **done**, **deployed**, **live in git**, **on the remote**, **synced**, **not in the codebase**, or **you’re on the wrong version** without **checking first**.
- **Before** those claims, gather facts, for example:
  - `git status -sb` and whether `main` is **ahead/behind** `origin/main`
  - Whether there are **uncommitted** or **untracked** changes that match the feature
  - `git log origin/main -1 --oneline` (or equivalent) when “what’s on GitHub” matters
  - `rg` / search the repo when claiming a string or setting **does not exist**
- If you **have not** run checks, say **“I haven’t verified remote/local git state”** — do **not** imply it’s shipped.

## “Is this pushed?”

- Answer **specifically about `origin/main` (or the relevant remote branch)**:
  - **Uncommitted / untracked work** is **not** pushed even if it looks correct in the editor.
  - **Commits not pushed** are **not** on the remote.
- If the answer is **no**, ask: **Do you want this committed and pushed?**
- Only say **yes, it’s on the remote** after **push succeeded** or **local `main` matches `origin/main` with no leftover changes** for that work (as appropriate).

## When the user says it’s pushed or gives status

- Treat that as **authoritative context** (they know their pipeline).
- **Do not** contradict them with a **local workspace-only** audit unless they **ask** for a sync check or debugging.

## After theme changes that must show in Shopify admin

- If the goal is for **Shopify / GitHub** to see the change, **commit and push** (when the user wants that), and **confirm with evidence** (e.g. successful `git push`, commit hash).
- Do **not** assume “saved in Cursor” means “live on the theme.”

## Shopify section schema: `range` settings

- For any **`type: "range"`** setting, **`default` must equal `min` plus an integer multiple of `step`** (same rule applies to values in **`templates/*.json`** section settings). If the design calls for a pixel value that does not fit `step` (e.g. **666** with `min: 240`, `step: 10`), either **set `step: 1`** (or another step that divides evenly) or **change `default`** to a valid step. Invalid combos fail theme upload with “default must be a step in the range.”

## No false certainty

- Do **not** sound sure because the **local file** looks right.
- Prefer: **what you checked**, **what you found**, and **what’s still unknown**.

## Figma before every new or revised campaign section

- **File:** `agnYrbiuU2Ory43nJYA4Nk` (see [docs/CAMPAIGN-LANDING-PLAN.md](docs/CAMPAIGN-LANDING-PLAN.md)).
- **MCP server id:** `user-Figma` (not `figma`).
- **Before implementing or changing** a `page__ak-campaign-*` band (or adding one to [templates/page.campaign.json](templates/page.campaign.json)):
  1. Call **`get_metadata`** with `fileKey` + the **node id** for the **desktop** and/or **mobile** campaign frame (e.g. mobile `35:616`, desktop `102:586`).
  2. For the **specific layer(s)** you are matching, call **`get_design_context`** on those **node id(s)**.
  3. Put **file key + node id(s)** in a **Liquid comment** at the top of the section file, and add/update the **plan table** row in `CAMPAIGN-LANDING-PLAN.md` with the same ids.
- Do **not** invent layout from a one-line plan step if Figma MCP is available—**use it** for that section.

## WCAG / code quality

- Continue to follow [.cursorrules](.cursorrules) for accessibility and implementation quality on all UI work.
