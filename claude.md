# Agent rules — Anne Klein Shopify theme

Follow these rules **exactly**. Do not skip them.

## `main` branch: no promotion without explicit approval

- **Never** run `git push` to **`main`**, **never** merge into **`main`**, and **never** route work to land on **`main`** unless the user **explicitly** asked to push or merge to **`main`** in plain language.
- If the user **does** ask to push or merge to **`main`**, ask once: **“Are you sure you want to push/merge to `main`?”** and continue only after a **clear yes**.
- **Default** when the user wants changes on GitHub (e.g. “push this,” “get it on GitHub”): push to **`dev`** only (`git push origin dev`, or `git push -u origin dev` when setting upstream).
- These rules are **in addition to** any GitHub branch protection on **`main`**.

## GitHub: protect `main` (repo admin checklist)

Configure on **github.com** → repository **Anne-Klein-Shopify** → **Settings**. Use **Rules** → **Rulesets** (preferred on newer GitHub) or **Branches** → **Branch protection rules** if your account still shows that.

Target **branch `main`** only. Enable:

1. **Require a pull request before merging** — blocks casual **`git push` to `main`**; promoting work means opening GitHub → compare **`dev`** into **`main`** → **Create pull request** → **Merge** when you intend to release.
2. **Block force pushes** to **`main`**.
3. **Block branch deletion** for **`main`**.

**Solo maintainer:** set **required approving reviews** to **0** if you have no second GitHub user; the **Merge** on the PR is still an explicit action, and direct push to **`main`** stays blocked. Use **1+ required approvals** when a second trusted person can approve.

**Bypass:** disabling admin bypass reduces slip-ups but can complicate emergencies; only tighten bypass if you accept that tradeoff.

## Claims require evidence

- **Never** say something is **fixed**, **done**, **deployed**, **live in git**, **on the remote**, **synced**, **not in the codebase**, or **you’re on the wrong version** without **checking first**.
- **Before** those claims, gather facts, for example:
  - `git status -sb` and whether **`dev`** is **ahead/behind** `origin/dev` for routine work, or whether **`main`** is **ahead/behind** `origin/main` when the question is specifically about **production / `main`**
  - Whether there are **uncommitted** or **untracked** changes that match the feature
  - `git log origin/main -1 --oneline` (or equivalent) when “what’s on GitHub” matters
  - `rg` / search the repo when claiming a string or setting **does not exist**
- If you **have not** run checks, say **“I haven’t verified remote/local git state”** — do **not** imply it’s shipped.

## “Is this pushed?”

- Answer **specifically about the branch in scope** — usually **`origin/dev`** for ongoing theme work, or **`origin/main`** when the user asked about **production** or **`main`** explicitly:
  - **Uncommitted / untracked work** is **not** pushed even if it looks correct in the editor.
  - **Commits not pushed** are **not** on the remote.
- If the answer is **no**, ask: **Do you want this committed and pushed?** (default target: **`dev`** unless they asked for **`main`**.)
- Only say **yes, it’s on the remote** after **push succeeded** or the relevant local branch matches its remote (e.g. **`dev`** / **`origin/dev`**, or **`main`** / **`origin/main`**) with no leftover changes for that work (as appropriate).

## When the user says it’s pushed or gives status

- Treat that as **authoritative context** (they know their pipeline).
- **Do not** contradict them with a **local workspace-only** audit unless they **ask** for a sync check or debugging.

## After theme changes that must show in Shopify admin

- If the goal is for **Shopify / GitHub** to see the change, **commit and push to `dev`** (when the user wants that), and **confirm with evidence** (e.g. successful `git push origin dev`, commit hash). **Do not** push to **`main`** unless the user **explicitly** asked for **`main`** and you completed the **“Are you sure…”** check in the **`main` branch** section above.
- Do **not** assume “saved in Cursor” means “live on the theme.”

## Shopify section schema: `range` settings

- **`default`** (and preset values in **`templates/*.json`**) must be **`min` + _n_ × `step`**.
- The slider must have **at most 101 steps** (Shopify counts discrete values from `min` to `max` by `step`). With a wide span (e.g. 240–900), **`step: 1` is invalid** (too many steps). Prefer a coarser **`step`** (often 10) and pick the **`default`** nearest the design that still sits on the grid.
- Wrong combos fail upload with “default must be a step in the range” or “Range settings must have at most 101 steps.”

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

## Responsive: nothing gets clipped

- **Every** section, component, and layout must stay **fully within the viewport** at **every** width — desktop, tablet, mobile.
- **Nothing** gets cut off, clipped, or extends beyond the viewable area. This is **non-negotiable best practice**, applied to every build, every time.
- Use `overflow: hidden` on section wrappers, `max-width: 100%` on content containers, and percentage-based or fluid widths instead of fixed pixel widths that can exceed the viewport.
- Flex and grid children that can grow wider than the viewport must have `min-width: 0` so they can shrink.
- **Before** claiming a section is "done," visually verify at **375px, 768px, 1024px, 1360px, and 1920px** — use the browser tool, not guesswork from the code.
- If any content is clipped or extends past the viewport edge at any width, the work is **not done**.

## WCAG / code quality

- Continue to follow [.cursorrules](.cursorrules) for accessibility and implementation quality on all UI work.
