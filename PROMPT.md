# Shake Design System — Agent Prompt

Paste this (or hand the file) to any agent that must generate HTML in the Shake style.
It is the condensed contract; the full per-format guides live in [`docs/`](./docs).

---

You are generating a single self-contained HTML document in the **Shake design system**. The
roster is four systems — **calm-ink**, **lupine**, **blue**, **kiln** — and **lupine is the
default** unless the request says otherwise. Follow the chosen system's own contract exactly. Do
not improvise a look or blend systems.

## 1. Always link the stylesheet — never inline a palette or fonts

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ShakeIsLucky/shake-design-system@00e4c66/systems/lupine/css/lupine.css">
<script type="module" src="https://cdn.jsdelivr.net/gh/ShakeIsLucky/shake-design-system@00e4c66/systems/lupine/scripts/lupine.js"></script>
```

This already provides the palette, fonts, and components for that system. Do **not**
re-declare colour variables or `@font-face` in your file. Build once; day/night (or dark/light)
flips automatically via the tokens.

> **Private-repo exception:** this repo is private, so the jsDelivr CDN above 404s anywhere it isn't already public — if the artifact must open as a standalone file or be shared off such a host, vendor the chosen system's `css/` (tokens + base + components) into one inline `<style>` block instead of linking it.

### The four systems

| System | Entry stylesheet | Notes |
|---|---|---|
| **lupine** (default) | `systems/lupine/css/lupine.css` + `scripts/lupine.js` | one-ink field station; backdrop imgs are page-level |
| calm-ink | `systems/calm-ink/css/calm-eink.css` + `scripts/theme-init.js` + `scripts/calm-eink.js` | e-ink calm; theme-init.js is a classic script before the stylesheet (no-FOUC), calm-eink.js is a module that wires the toggle |
| blue | `systems/blue/css/blue.css` + `scripts/blue.js` | mini-app shell; reference shadow video in `assets/video/` |
| kiln | `systems/kiln/css/kiln.css` + `scripts/theme-init.js` + `scripts/kiln.js` | warm editorial long-form; same no-FOUC pattern as calm-ink. **No shadows** and **no hover lift** anywhere — prose pages use `.col` + `aside.rail` for margin sidenotes, and every `<td>` must carry `data-label` |

Each system's `README.md` is the authoring contract — palette tokens, type stack, and components
all vary by system; never assume one system's token names apply to another. Lupine pages must
include a `.world` layer with page-local `<img data-stop="…">` stops — see
`systems/lupine/README.md`. Blue pages must include atmosphere layers (`.noise-overlay`,
`.leaf-shadows` video) — see `systems/blue/README.md`. Kiln pages must not introduce a
`box-shadow` or a hover `transform` — see `systems/kiln/README.md`.

## 2. Palette — semantic tokens only (never invent a hex)

Token names are per-system — never assume one system's names apply to another, and never
invent a hex. Consult the chosen system's `css/tokens.css` and `README.md` for the exact list.
Lupine (the default), for reference: `--paper --paper-deep --ink --ink-soft --ink-mute --accent
--accent-deep --line --line-faint --line-strong`.

Inside inline `<svg>`, use the literal hexes the tokens resolve to (listed in
[`docs/svg.md`](./docs/svg.md)) because `var()` is unreliable in SVG fills.

## 3. Type — the chosen system's own stack, no substitutes

Every system exposes its own `--font-display` / `--font-body` (or `--font-serif`) /
`--font-type` (or `--font-mono`) — read its README for the exact roles and stacks. Do **not**
load a font family the chosen system doesn't itself declare. Whether emphasis is colour or
italic is also system-specific (e.g. Blue's titles are serif-italic by design; check the
system's own components before assuming either convention).

## 4. Pick the document type and follow its guide

| Doc type | Guide |
|---|---|
| Slide deck / presentation / performance review | [`docs/deck.md`](./docs/deck.md) |
| Interactive concept explainer | [`docs/concept-explainer.md`](./docs/concept-explainer.md) |
| Feature / capability explainer | [`docs/feature-explainer.md`](./docs/feature-explainer.md) |
| Implementation plan | [`docs/implementation-plan.md`](./docs/implementation-plan.md) |
| Status / analytics report | [`docs/status-report.md`](./docs/status-report.md) |

Read the matching guide, clone its skeleton/structure, and **fill content only** — do
not re-derive the layout. If a deck, also `<html class="deck">` and wire
`initDeckNav()`.

## 5. Charts are hand-coded inline SVG — never a placeholder

Every chart/diagram is a real inline `<svg viewBox="…" width="100%">` inside a
`.figure` with a mono `.figcap`. No grey placeholder boxes, no screenshots, no raw
stretched images. Use the patterns and colour table in [`docs/svg.md`](./docs/svg.md).
Images in decks go in `.figure.media .g{n}` (letterboxed), never a bare `<img>`.

## 6. Quality bar (what separates flagship from lazy)

- Numbers/state up top (KPI row or summary band).
- At least one real hand-coded SVG figure.
- Scannable tables (`.lead-tbl`) with status hangtags, tabular numbers.
- Tight, lead-bold bullets (`.dash-list`).
- Responsive: every grid collapses to one column on mobile.
- Follow the chosen system's own radius, hairline and motion conventions (see its README —
  don't assume zero radius or any other system's rule).

## 7. Self-check before returning

Grep your own output:
- ✅ contains the chosen system's entry stylesheet path (e.g. `lupine.css`, `calm-eink.css`,
  `blue.css`)
- ❌ contains a font family the chosen system doesn't itself declare
- ❌ contains any new `#RRGGBB` palette declaration (SVG figure hexes from the
  approved table are fine)
- ✅ every chart is `<svg>`, not a `<div>`/`<img>` placeholder

## 8. Publish every HTML artifact (default — do not skip)

After building the page, **always** publish to the unlisted host unless the user
explicitly says local-only / do not deploy.

1. Write self-contained `.html` to the local **`shake-pages`** repo (inline the DS, or link the
   public CDN now that this repo is public).
2. `git add`, commit, push to `main` — the connected Vercel project auto-deploys production.
3. **Return the live URL** to the user. The unlisted host base is configured privately in the
   `shake-pages` repo / local env — it is intentionally **not** stored in this public repo.

Workflow notes: [`docs/shake-pages-hosting.md`](./docs/shake-pages-hosting.md).
