# Shake Design System

*Mono structure · racing-green palette · parchment accents.*

A personal HTML design system for everything Shake / Onda ships: research briefs, plan / diff / project recap reviews, research digests, email-triage summaries, decision-making artifacts.

Dark by default. Light variant ships alongside for print, PDF, and email-friendly sharing. Zero build step — pure CSS plus a couple of ES modules for Mermaid + Chart.js theming.

## Install

### From the repo (vendored)

```bash
git clone https://github.com/ShakeIsLucky/shake-design-system.git
```

Then link the single stylesheet:

```html
<link rel="stylesheet" href="./shake-design-system/css/shake.css" />
```

### From jsDelivr CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ShakeIsLucky/shake-design-system@main/css/shake.css" />
```

### Mermaid + theme toggle (optional)

```html
<button class="theme-toggle">LIGHT</button>

<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  import { initShakeMermaid } from 'https://cdn.jsdelivr.net/gh/ShakeIsLucky/shake-design-system@main/scripts/mermaid-theme.js';
  import { initThemeToggle } from 'https://cdn.jsdelivr.net/gh/ShakeIsLucky/shake-design-system@main/scripts/theme-toggle.js';
  initThemeToggle('.theme-toggle');
  initShakeMermaid(mermaid);
</script>
```

That's it. Every component reads through semantic CSS variables, so dark ↔ light toggles without any markup changes.

## See it

Open [`index.html`](./index.html) for the kitchen-sink reference — every component in both modes, plus the Mermaid theming.

## Voice rules

| Where | Style | Example |
|---|---|---|
| Clickable elements *only* (buttons, nav, toggles) | `[ BRACKET ]` mono brass via CSS | `[ READ FULL BRIEF ]` `[ SUMMARY ]` `[ LIGHT ]` |
| Status chips, eyebrows, section markers, labels | quiet hangtag block, no brackets | `RECOMMENDED` `§ 03 / 08` `DEEP RESEARCH` |
| Body links | sentence case, ivory underline, brass on hover | `…see the [previous brief](#)…` |

CTA verbs to prefer: `enter` · `ask` · `email` · `share` · `read` · `open`.

## Motifs

| Motif | Use | Don't |
|---|---|---|
| Shake star | Wordmark in topbar + footer; section dingbats | Don't scatter as decoration |
| Parchment hangtags | Status, dates, section IDs, table flags | Don't use as full button labels |
| Zero radius | Everywhere | No pills, no rounded cards |
| Brass accent | Clickable bracketed elements, Mermaid edges | Not for body text |

**Explicitly dropped from v1:** the film-strip perforated rail.

## Palette discipline

**Never invent a new hex.** Every colour token is sourced from the Shake DS v1 palette.

```
Surfaces
  canvas-deep    #06130C
  panel          #0D2A1B  (racing green)
  panel-raised   #123524

Ink
  ivory          #F0EAD7
  parchment      #CCC8B0
  sage-mute      #888E7A

Hangtags
  paper          #EFE8D0
  paper-warm     #DACBC2  (warm parchment)

Lines
  line-1         #1C3D2B
  line-2         #2C5440

Accent + status
  brass          #E1B06E  (sunkissed)
  brass-deep     #A85E0A
  terracotta     #844F3B  (error)
  sage           #A3A473  (success)
  tidal-blue     #4B607C  (info)
```

## Typography

| Token | Stack |
|---|---|
| `--font-serif` | `"PlantinNow", "Fraunces", "Plantin Std", "Plantin", "EB Garamond", "Adobe Caslon Pro", Georgia, serif` |
| `--font-mono` | `"DepartureMono", "JetBrains Mono", "Berkeley Mono", "IBM Plex Mono", ui-monospace, monospace` |

Body is **mono** (DepartureMono 13px). Display + h1/h2 are **serif italic** (PlantinNow → Fraunces fallback).

### Fonts shipping in the repo

- ✅ **DepartureMono-Regular.woff2** — SIL-OFL, free from [departuremono.com](https://departuremono.com/). License at `fonts/DepartureMono-LICENSE.txt`.
- ✅ **Fraunces** — Google Fonts, free. Loaded via `@import` in `css/base.css` with axes `opsz · wght · SOFT · WONK` so the headings get the chunky, slightly-wonky Plantin-adjacent italic.
- ⏳ **PlantinNow** — paid licence from [Atipo Foundry](https://atipofoundry.com/). Not yet acquired. Fraunces is a close stand-in; when PlantinNow is licensed, drop the `.woff2` files into `fonts/` and the `@font-face` declarations in `base.css` will pick them up automatically.

## File map

```
./
├── README.md                       (this file)
├── index.html                      (kitchen-sink reference)
├── css/
│   ├── shake.css                   (single link target — @imports the rest)
│   ├── tokens.css                  (palette + type + spacing + motion)
│   ├── base.css                    (reset, font-face, prose, layout)
│   ├── components.css              (the 12 components)
│   └── viz.css                     (Mermaid CSS, figure, legend, chart wrapper)
├── fonts/
│   ├── DepartureMono-Regular.woff2
│   ├── DepartureMono-LICENSE.txt
│   └── PlantinNow-*.woff2          (drop in when licensed)
└── scripts/
    ├── mermaid-theme.js            (dark + light themeVariables, auto re-render)
    ├── chart-theme.js              (Chart.js defaults + brassGradient helper)
    └── theme-toggle.js             (manual toggle, persists to localStorage)
```

## Components

| # | Name | Purpose |
|---|---|---|
| 01 | Topbar | Sticky slim. Star + bracket wordmark + brass-bracket nav + theme toggle. |
| 02 | Hero | Eyebrow hangtag → italic display h1 → mono lede → meta-row. |
| 03 | Section | Mono eyebrow `§ NN — Title` + italic h2. Optional `.with-rail` left hangtag. |
| 04 | Hangtag | Parchment block. `default · accent · success · warning · error · info · ghost`. |
| 05 | Callout | Parchment-on-green inset, brass left border. |
| 06 | Table | Hairlines only, mono cells, uppercase mono header, inline hangtag chips OK. |
| 07 | List row | `idx · who · snippet · status · action` — dense triage lists. |
| 08 | Decision card | Heading + 2-3 option columns with verdict hangtags. |
| 09 | Bar chart (CSS) | Mono label · 8px track · brass gradient fill · subtle shake on hover. |
| 10 | Code block | `pre` styled by `base.css`. `pre.bare` variant for raw blocks. |
| 11 | Button | `.btn` outline default · `.btn.primary` `[ BRACKETED ]` brass · `.btn.bare` link-style. |
| 12 | Site footer | Star + Shake wordmark left · mono meta right · hairline top border. |

## Theming

- **OS theme respected by default.** `:root:not([data-theme])` listens for `prefers-color-scheme: light`.
- **Manual override** via `<html data-theme="light">` or `data-theme="dark"`. `theme-toggle.js` writes this and persists to `localStorage["shake-theme"]`.
- **Mermaid re-renders** on theme change via a `MutationObserver` in `mermaid-theme.js`.

## Mermaid rules

1. Always use `theme: 'base'` — only theme where `themeVariables` apply. (`mermaid-theme.js` already does this.)
2. **Never set `color:` in `classDef`.** Let the CSS overrides in `viz.css` bind text to `var(--ink)`.
3. Use 8-digit hex alpha for fills (`fill:#E1B06E22`) — they tint over either mode's background.
4. Max 10-12 nodes per diagram. Beyond that, use the hybrid pattern: small Mermaid overview + CSS Grid detail.
5. `<br/>` for multi-line node labels — `\n` renders as literal text in flowcharts.
6. Quote labels with parens, colons, commas, brackets: `A["handleRequest(ctx)"]`.

## License

Design system code: MIT.
Fonts: see their individual licences in `fonts/`. DepartureMono is SIL-OFL (free).

---

*Shake · 2026*
