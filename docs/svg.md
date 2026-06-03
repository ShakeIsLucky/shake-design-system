# Guide — SVG illustrations & diagrams in any doc

Reference example (form, not colours): Thariq `10-svg-illustrations.html`,
`15-research-concept-explainer.html`. Re-skin everything to Shake tokens.

The single biggest quality gap between flagship HTML and lazy HTML is **charts**.
A flagship doc hand-codes real inline `<svg>` with real coordinates. A lazy doc
drops a grey placeholder box. **Never** ship the placeholder.

## Core rules

1. **Inline `<svg>` only.** No `<img>` of a chart, no external chart lib for simple
   figures (Chart.js is allowed only for genuinely data-dense series — see `viz.css`).
2. **Wrap every figure** in `.figure` with a mono `.figcap` caption:
   ```html
   <div class="figure">
     <div class="figcap">Score = 0.70·ROAS + 0.20·CPM↓ + 0.10·CTR</div>
     <svg viewBox="0 0 620 150" width="100%" xmlns="http://www.w3.org/2000/svg"> … </svg>
     <p class="fnote">One-line note on how to read it.</p>
   </div>
   ```
3. **Always set `viewBox` + `width="100%"`** so the SVG is responsive. Never hardcode
   pixel width on the `<svg>` element.
4. **Colour from the palette only** (these are the literal hexes the tokens resolve to;
   use them directly inside SVG since `var()` is unreliable in `fill`/`stroke` across
   renderers):
   | Role | Hex | Token |
   |---|---|---|
   | Plot background | `#0D2A1B` | `--surface` |
   | Track / empty bar | `#071A11` | `--surface-inset` |
   | Hairline / grid | `#1C3D2B` | `--line` |
   | Axis line | `#2C5440` | `--line-strong` |
   | Primary accent / focus | `#E1B06E` | `--brass` |
   | Positive / success | `#A3A473` | `--sage` |
   | Negative / error | `#844F3B` | `--terracotta` |
   | Neutral info | `#4B607C` | `--tidal-blue` |
   | Ink in figures | `#F0EAD7` | `--ink` |
   | Muted labels | `#888E7A` | `--ink-mute` |
5. **Text in SVG uses the helper classes** so it inherits the right font:
   `.svm` (13px mono), `.svs` (11px mono), `.svn` (20px display), `.svn2` (12px mono).
   ```html
   <text x="96" y="43" text-anchor="end" class="svm" fill="#F0EAD7">ROAS</text>
   ```
6. **Tint fills for light/dark safety** when overlaying: use 8-digit hex alpha,
   e.g. `fill="#E1B06E22"`.
7. **Zero radius** matches the brand: bars and frames are square (`<rect>` with no `rx`).

## Patterns to reach for

- **Weighted-bar / proportion chart** — horizontal `<rect>` tracks with a brass fill
  segment + mono % label. (See flagship "Score = …" figure.)
- **Funnel** — stacked centered `<rect>`s narrowing downward with `<path>` arrow
  separators in `--ink-mute`.
- **Scatter / positioning** — axes in `--line-strong`, a dashed break-even line in
  `--brass`, bubbles sized by a third variable, coloured by status (`sage`/`terra`).
- **Ring / cycle** — `<circle class="track">` + coloured `<path>` arcs; great for
  concept explainers (consistent-hashing style).
- **Interactive demo** — render the SVG from a small JS function so sliders/buttons
  mutate it. Keep the hash/seed deterministic so it's stable.

## Anti-patterns (never do)

- ❌ A `<div>` with a background colour standing in for a chart.
- ❌ Random new hex values not in the palette table above.
- ❌ `font-family` declared inline on `<text>` — use `.svm/.svs/.svn/.svn2`.
- ❌ Rounded corners (`rx`) on bars/frames.
- ❌ Italic labels.
