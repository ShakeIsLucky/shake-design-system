# Sharing unlisted Shake HTML pages

**Default publish path for agents.** Whenever you are asked to create a Shake HTML page
(deck, explainer, report, plan, etc.), finish by publishing it here — not just returning
the file locally.

Standing host for self-contained HTML artifacts you share with coworkers by link only —
**unlisted**, not password-protected. Anyone with the URL can view the page; it is not
indexed and the URL is not guessable.

| | |
|---|---|
| **Vercel project** | `onda-decks-x7k2` |
| **Production base** | https://onda-decks-x7k2.vercel.app |
| **GitHub repo (private)** | https://github.com/ShakeIsLucky/shake-pages |
| **Local folder** | `/Users/notshake/Projects/shake-pages/` |

The repo source stays private. The **deployed site is public-by-URL** (same as GitHub
Pages from a private repo on a free plan). Do not treat the link as access control.

## Before you publish

Artifacts must be **self-contained** — inlined Shake DS CSS/JS (see the private-repo
exception in [`../PROMPT.md`](../PROMPT.md)). Do not link jsDelivr to this repo while
it remains private (CDN 404s).

`robots.txt` on the host blocks crawlers. The index page is a bare “Not found” with no
links to individual reports.

## Agent publish workflow (do this every time)

1. Drop a self-contained `.html` into `/Users/notshake/Projects/shake-pages/`
2. Commit + push to `main`
3. Vercel auto-deploys production (`ShakeIsLucky/shake-pages` → `onda-decks-x7k2`)
4. Return the live URL: `https://onda-decks-x7k2.vercel.app/your-file.html`

Use non-descriptive filenames if you want extra obscurity (e.g. `rpt-2026-07-foo.html`).

**Return value to the user:** the production URL, not just the local file path.

Manual fallback (no git push): `vercel deploy --prod --yes` from that folder.

Example live page: [`rpt-2026-06-meta.html`](https://onda-decks-x7k2.vercel.app/rpt-2026-06-meta.html)

## Adobe Fonts — add `onda-decks-x7k2.vercel.app` to kit `lao8mse`

Freight Display / Freight Text only load on domains allowlisted on the Adobe Fonts web
project. Off-list domains fall back to EB Garamond (page still works).

Kit embed (already in inlined CSS): `https://use.typekit.net/lao8mse.css`

### Steps (fonts.adobe.com, ~2 min)

1. Sign in at [fonts.adobe.com](https://fonts.adobe.com) with the Adobe account that owns the kit.
2. Open **Manage fonts** (account menu) → **Web Projects** (or **My Adobe Fonts → Web projects**).
3. Open the project whose embed code is **`lao8mse`** (the Shake DS kit).
4. Find **Domains** / **Allowed domains** (wording varies slightly).
5. **Add domain:** `onda-decks-x7k2.vercel.app`
   - No `https://`, no path, no trailing slash.
   - Keep existing entries (`localhost`, `127.0.0.1`, `onda-deploy-ten.vercel.app`, etc.).
6. **Save** / **Publish** the web project.
7. Hard-refresh the live page (or wait up to ~10 min — kit CSS is cached). Headings should render in Freight, not EB Garamond.

If Freight still looks wrong after publish, bump the Typekit query string in the artifact
(e.g. `lao8mse.css?v=7`) to bust browser cache.

**One-time setup** — you only repeat this when the Vercel hostname changes.

## GitHub ↔ Vercel auto-deploy

**Connected:** `ShakeIsLucky/shake-pages` → `onda-decks-x7k2`. Push to `main` and
production updates automatically.

Manual fallback: `vercel deploy --prod --yes` from the local folder.
