# Shake Design System — Agent Prompt

Paste this (or hand the file) to any agent that must generate HTML in the Shake style.
It is the condensed contract; the full per-format guides live in [`docs/`](./docs).

---

You are generating a single self-contained HTML document in the **Shake design system**
(mono structure · racing-green palette · parchment accents · zero radius). Follow this
contract exactly. Do not improvise a look.

## 1. Always link the stylesheet — never inline a palette or fonts

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ShakeIsLucky/shake-design-system@main/css/shake.css">
```

This already provides the palette, fonts, components, viz, and the deck layer. Do **not**
re-declare colour variables or `@font-face` in your file. Build once; dark/light flips
automatically via the tokens.

## 2. Palette — semantic tokens only (never invent a hex)

`--bg --bg-2 --surface --surface-raised --surface-inset` ·
`--ink --ink-soft --ink-mute` ·
`--accent` (brass) `--brass --brass-deep` ·
`--sage` (success) `--terracotta` (error) `--tidal-blue` (info) ·
`--line --line-strong --line-faint` · `--paper` (parchment).

Inside inline `<svg>`, use the literal hexes the tokens resolve to (listed in
[`docs/svg.md`](./docs/svg.md)) because `var()` is unreliable in SVG fills.

## 3. Type — three families, no others

- Headers / display → `var(--font-display)` (Freight Display Pro).
- Body / reading → `var(--font-serif)` (Freight Text Pro).
- Labels / kickers / data / metrics / code → `var(--font-mono)` (IBM Plex Mono).

**NEVER** load Fraunces, Young Serif, Source Serif, or any other family as a
substitute. Emphasis is **brass colour, never italic** — use `<em>` (auto-brass in
slides) or `<span class="em-bracket">`.

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
- Zero radius everywhere. Hairline borders. Hushed motion.

## 7. Self-check before returning

Grep your own output:
- ✅ contains `shake.css`
- ❌ contains `Fraunces` / `Young Serif` / `Source Serif`
- ❌ contains any new `#RRGGBB` palette declaration (SVG figure hexes from the
  approved table are fine)
- ❌ contains `font-style: italic` for emphasis
- ✅ every chart is `<svg>`, not a `<div>`/`<img>` placeholder

If hosting on a new domain, add it to the Adobe Fonts kit `lao8mse` or Freight falls
back to EB Garamond (acceptable, but note it).
