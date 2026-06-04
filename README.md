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

## Document-type guides (for agents)

Per-doc HTML recipes live in [`docs/`](./docs/README.md) — slide decks, explainers, plans, status reports, and SVG rules. Point agents at one guide + `css/shake.css`; do not invent parallel palettes or heading patterns.

**Publishing HTML (agents):** build → drop in [`shake-pages`](https://github.com/ShakeIsLucky/shake-pages) → push `main` → share https://onda-decks-x7k2.vercel.app/your-file.html . See [`docs/shake-pages-hosting.md`](./docs/shake-pages-hosting.md).

## Voice rules

| Where | Style | Example |
|---|---|---|
| Clickable elements *only* (buttons, nav, toggles) | `[ BRACKET ]` mono cream via CSS | `[ READ FULL BRIEF ]` `[ SUMMARY ]` `[ LIGHT ]` |
| Status chips, eyebrows, section markers, labels | quiet hangtag block, no brackets | `RECOMMENDED` `§ 03 / 08` `DEEP RESEARCH` |
| Body links | sentence case, ivory underline, cream accent on hover | `…see the [previous brief](#)…` |

CTA verbs to prefer: `enter` · `ask` · `email` · `share` · `read` · `open`.

## Motifs

| Motif | Use | Don't |
|---|---|---|
| Shake star | Wordmark in topbar + footer; section dingbats | Don't scatter as decoration |
| Parchment hangtags | Status, dates, section IDs, table flags | Don't use as full button labels |
| Zero radius | Everywhere | No pills, no rounded cards |
| Cream accent (`--cream` / `--accent`) | Hangtag kickers, callout rules, chrome | Distinct from parchment `--paper`; chart “focus” may still use brass |

**Explicitly dropped from v1:** the film-strip perforated rail.

## Palette discipline

**Never invent a new hex.** Every colour token is sourced from the Shake DS palette. Dark-mode ink has been slightly lifted from v1 for long-form readability.

```
Surfaces
  canvas-deep    #06130C
  panel          #0D2A1B  (racing green)
  panel-raised   #123524

Ink
  ivory          #FAF8F2
  parchment      #DFDAC6
  sage-mute      #99A08A

Hangtags
  paper          #EFE8D0
  paper-warm     #DACBC2  (warm parchment)

Lines
  line-1         #1C3D2B
  line-2         #2C5440

Accent + status
  cream          #F3E2B4  (accent — buttery off-white)
  brass          #E1B06E  (sunkissed / chart focus)
  brass-deep     #A85E0A
  terracotta     #844F3B  (error)
  sage           #A3A473  (success)
  tidal-blue     #4B607C  (info)
```

## Typography

| Token | Role | Stack |
|---|---|---|
| `--font-display` | Display + h1/h2 | `"freight-display-pro-1", "Freight Display Pro", "Freight Big Pro", "EB Garamond", Georgia, serif` |
| `--font-serif` | Body / reading text | `"freight-text-pro-1", "Freight Text Pro", "EB Garamond", Georgia, serif` |
| `--font-mono` | Labels · kickers · data · code | `"IBM Plex Mono", "ibm-plex-mono-1", "DepartureMono", ui-monospace, monospace` |

Headings are **Freight Display Pro, upright** (no italic). Body is **Freight Text Pro**. Labels, kickers, metric values, and code are **IBM Plex Mono**. **Title emphasis** uses the **hangtag kicker** (`.hangtag.accent.head-kicker` above `h1`/`h2`) — not coloured `<em>` inside headlines. UI chrome uses **cream** (`--accent`); chart focus may still use **brass**.

### Fonts & licensing

- ✅ **IBM Plex Mono** — free (SIL-OFL), loaded via Google Fonts `@import` in `css/base.css`. Works on any domain.
- 🔒 **Freight Display Pro + Freight Text Pro** — Adobe Fonts. Loaded via the published **Adobe Fonts kit** `@import url("https://use.typekit.net/lao8mse.css")` in `css/base.css`. Adobe Fonts **cannot be self-hosted / redistributed**, so there are no `.woff2` files for them in `fonts/`. Paste the kit embed on any host you manage; bump `?v=` after editing the kit at fonts.adobe.com. CSS fallbacks use EB Garamond / Georgia if the kit fails to load.
- ✅ **DepartureMono-Regular.woff2** — SIL-OFL, retained in `fonts/` as a mono fallback. License at `fonts/DepartureMono-LICENSE.txt`.

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
│   ├── deck.css                    (full-bleed slide deck layer)
│   └── viz.css                     (Mermaid CSS, figure, legend, chart wrapper)
├── fonts/
│   ├── DepartureMono-Regular.woff2
│   ├── DepartureMono-LICENSE.txt
│   └── PlantinNow-*.woff2          (drop in when licensed)
└── scripts/
    ├── mermaid-theme.js            (dark + light themeVariables, auto re-render)
    ├── chart-theme.js              (Chart.js defaults + brassGradient helper)
    ├── deck-nav.js                 (slide counter, progress bar, keyboard nav)
    └── theme-toggle.js             (manual toggle, persists to localStorage)
```

## Components

| # | Name | Purpose |
|---|---|---|
| 01 | Topbar | Sticky slim. Star + bracket wordmark + cream-bracket nav + theme toggle. |
| 02 | Hero | Eyebrow → **hangtag kicker** (cream `.accent`) → Freight Display h1 → serif lede → meta-row. |
| 03 | Section | Mono eyebrow `§ NN —` + optional parchment hangtag kicker → plain Freight h2. Optional `.with-rail`. |
| 04 | Hangtag | Parchment default (`--paper`); cream `.accent` for primary kickers. |
| 05 | Callout | Panel inset, cream left border. |
| 06 | Table | Hairlines only, mono cells, uppercase mono header, inline hangtag chips OK. |
| 07 | List row | `idx · who · snippet · status · action` — dense triage lists. |
| 08 | Decision card | Heading + 2-3 option columns with verdict hangtags. |
| 09 | Bar chart (CSS) | Mono label · 8px track · brass gradient fill (data focus) · subtle shake on hover. |
| — | **Deck layer** | `html.deck` + `.slide` grammar — see [`docs/deck.md`](./docs/deck.md) |
| 10 | Code block | `pre` styled by `base.css`. `pre.bare` variant for raw blocks. |
| 11 | Button | `.btn` outline default · `.btn.primary` `[ BRACKETED ]` cream · `.btn.bare` link-style. |
| 12 | Site footer | Star + Shake wordmark left · mono meta right · hairline top border. |

## Theming

- **Dark mode is the default.** Pages stay dark regardless of OS color-scheme preference.
- **Manual override** via `<html data-theme="light">` or `data-theme="dark"`. `theme-toggle.js` writes this and persists to `localStorage["shake-theme"]`; the button displays the mode you can switch to, so dark pages show `[ LIGHT ]`.
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
