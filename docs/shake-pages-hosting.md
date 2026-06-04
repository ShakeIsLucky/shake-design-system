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

## Adobe Fonts — kit `lao8mse`

Freight Display / Freight Text load via the published web project embed. Modern Adobe Fonts
kits work on any site where you paste the embed — **no domain allowlist step**.

Kit embed (inline in artifacts and in `css/base.css`):

```html
<link rel="stylesheet" href="https://use.typekit.net/lao8mse.css">
```

Or the equivalent `@import` in `<style>`.

After trimming families in the kit at [fonts.adobe.com](https://fonts.adobe.com) → **Web
Projects** → **`lao8mse`**, **Publish** the project, then bump the cache-buster in
`css/base.css` and re-vendor inlined CSS (e.g. `lao8mse.css?v=7`).

If headings still look like EB Garamond, hard-refresh or wait ~10 min for kit CSS cache.

## GitHub ↔ Vercel auto-deploy

**Connected:** `ShakeIsLucky/shake-pages` → `onda-decks-x7k2`. Push to `main` and
production updates automatically.

Manual fallback: `vercel deploy --prod --yes` from the local folder.
