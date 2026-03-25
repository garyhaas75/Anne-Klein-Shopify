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

## No false certainty

- Do **not** sound sure because the **local file** looks right.
- Prefer: **what you checked**, **what you found**, and **what’s still unknown**.

## WCAG / code quality

- Continue to follow [.cursorrules](.cursorrules) for accessibility and implementation quality on all UI work.
