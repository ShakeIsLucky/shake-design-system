# Safelight — "Analog Darkroom + CRT Console"

*Amber glow on deep obsidian · cyan crosshair · monospaced instrument panels · high-ISO grain.*

A reusable design system for instrument-panel UIs: what a photographer's console looks like at 2am,
developing high-ISO film by safelight. Dark-only by design (a darkroom has no light mode). Self-hosted
fonts, semantic z-index scale, zero build step: one CSS file, one script.

## Quick start

```html
<link rel="stylesheet" href="css/safelight.css" />
<!-- first child of <body> -->
<div class="grain" aria-hidden="true"></div>
<script src="scripts/safelight.js"></script>
```

Published pages pin both URLs to the same commit SHA on jsDelivr:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ShakeIsLucky/shake-design-system@<SHA>/systems/safelight/css/safelight.css" />
<script src="https://cdn.jsdelivr.net/gh/ShakeIsLucky/shake-design-system@<SHA>/systems/safelight/scripts/safelight.js"></script>
```

## Palette discipline

**Warm instrument light on near-black.** No green or blue surfaces, no glass, no neumorphism.

| Token | Hex | Role |
|---|---|---|
| `--void` | `#050608` | Page background |
| `--panel` | `#0c0e12` | Cards, panels, cells |
| `--panel-raised` | `#14171e` | Hover / raised rows |
| `--surface` | `#1a1d26` | Inset tracks |
| `--line` / `--line-strong` | `#2a2e3a` / `#3d4254` | Hairlines, borders |
| `--amber` | `#f5a623` | Primary phosphor accent (text-shadow / box-shadow glow) |
| `--cyan` | `#3ecfb2` | Targeting / secondary accent |
| `--ink` / `--ink-soft` / `--ink-mute` | `#e8e0d0` / `#a89e8e` / `#948b78` | Text ramp |
| `--error` / `--ok` | `#e05555` / `#5cb85c` | Status |

`--ink-mute` is tuned to clear WCAG AA (≥4.5:1) on `--panel` / `--void` at small label sizes. Amber
and cyan carry a glow via `--glow-amber` / `--glow-cyan` (text-shadow + box-shadow), never gradient text.

## Typography

Two voices, self-hosted woff2 (both SIL-OFL, see `fonts/OFL-LICENSE.txt`).

| Voice | Token | Role |
|---|---|---|
| Serif | `--font-serif` (Fraunces) | Headings and display — **italic**, weight 300/400 |
| Mono | `--font-mono` (JetBrains Mono) | Everything else: copy, labels, data, chrome |

**Two-voice rule:** Fraunces italic carries titles; JetBrains Mono carries all structure and data.
No sans-serif anywhere. Emphasis is amber colour + italic, never gradient text.

## Atmosphere contract

A Safelight surface without the grain layer is not Safelight. Three fixed overlays sit on a semantic
z-index scale (`--z-grain` < `--z-vignette` < `--z-scanlines`):

| Layer | Source | Effect |
|---|---|---|
| `.grain` | SVG `feTurbulence` at 6%, `mix-blend-mode: overlay` | High-ISO film texture |
| `body::after` | radial-gradient | Darkroom vignette |
| `body::before` | repeating-linear-gradient at 4px | CRT scan lines |
| `.topbar::after` | `phosphor` keyframe | 8s flicker on a cheap overlay (not the blurred bar) |

`prefers-reduced-motion: reduce` hides the scan lines and flicker, disables animation, and shows all
`.reveal` content immediately.

## Shell DOM tree

```
body
├── a.skip-link
├── .grain
├── header.topbar > .inner ( .wordmark + nav )
├── main.wrap#main
│   ├── section.hero
│   └── section.section.reveal  (h2 + content)
└── footer.wrap > .site-footer
```

Sections lead with a Fraunces-italic `<h2>` and a single amber tick. Component groups inside a section
use `<h3 class="spec-label">`. There are no numbered per-section eyebrows; real channel/log numbering
(`CH-01`, `LOG-…`) lives on the panels where it carries meaning.

## Components

| Component | Class | Notes |
|---|---|---|
| Spec label | `.spec-label` | Group heading inside a section |
| Palette swatch | `.swatch` / `.chip` | `.glow-amber` / `.glow-cyan` modifiers |
| Status display | `.status-display` / `.status-cell` | KPI grid; `.delta.up/.down/.nominal` |
| Analog dial | `.dial` (`data-angle`, `data-range`) | Needle jitter on hover/focus |
| Level meter | `.meter` / `.track` / `.fill` | Glow-filled bar |
| Panel | `.panel` / `.panel-header` / `.panel-log` | Instrument panel + log lines |
| Button | `.btn` (`.primary` / `.cyan` / `.abort`) | Mono uppercase, ≥44px touch on coarse pointers |
| Data table | `.data-table` | `.num` tabular nums, `.status-dot` colours |
| Signal card | `.card` / `.card-icon` / `.card-tag` | Crosshair icon + italic title |

## Do's and don'ts

### Do
- Add the `.grain` layer first; keep the three atmosphere overlays
- Use amber/cyan glow (text-shadow + box-shadow) for the phosphor look
- Set titles in Fraunces italic; everything else in JetBrains Mono
- Keep motion quiet and honor `prefers-reduced-motion`

### Don't
- Add a light mode, glass, neumorphism, gradient text, or bounce easing
- Reintroduce numbered per-section eyebrows (`01 · …`) — use the `<h2>` + tick cadence
- Use sans-serif as identity; use em dashes in copy; hard-code arbitrary z-index values
- Ship `@main` in published pages — pin a commit SHA

## File map

```
systems/safelight/
├── index.html          kitchen-sink specimen
├── README.md           this file
├── css/
│   ├── safelight.css   THE entry (link this)
│   ├── tokens.css
│   ├── base.css        reset · fonts · atmosphere · shell · motion
│   └── components.css
├── scripts/
│   └── safelight.js    reveal + dial jitter + crosshair parallax
└── fonts/
    ├── Fraunces-Roman.woff2
    ├── Fraunces-Italic.woff2
    ├── JetBrainsMono.woff2
    └── OFL-LICENSE.txt
```

## License

Code: MIT. Fonts: Fraunces and JetBrains Mono are both SIL-OFL (see `fonts/OFL-LICENSE.txt`).
