# Lupine — "One-Ink Field Station"

*One pigment per mode · paper sheet over an ink-drawn landscape · lupine-violet accent.*

A reusable design system for field documents written outdoors: a paper sheet floats in a
Northern-California landscape drawn in the same single pigment as the text. Light default
(blue-black iron gall on cool bone), night twin (bone chalk on ink slate), one lupine accent,
living 4-stop backdrop that follows the local clock. Zero build step: one CSS file, one ES module.

## Quick start

```html
<link rel="stylesheet" href="css/lupine.css" />
<!-- page-level backdrop imgs in .world — see Backdrop contract below -->
<script type="module" src="scripts/lupine.js"></script>
```

Published pages pin both URLs to the same commit SHA on jsDelivr:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ShakeIsLucky/shake-design-system@<SHA>/systems/lupine/css/lupine.css" />
<script type="module" src="https://cdn.jsdelivr.net/gh/ShakeIsLucky/shake-design-system@<SHA>/systems/lupine/scripts/lupine.js"></script>
```

## Palette discipline

**One accent — lupine violet — and one pigment per mode.**

| Token | Day | Night |
|---|---|---|
| `--paper` | `#F2F1EC` cool bone | `#14191F` ink slate |
| `--paper-deep` | `#EAE9E1` | `#10151B` |
| `--ink` | `#262D36` iron gall | `#D6D9D0` bone chalk |
| `--ink-soft` | `#4A525E` | `#A8AEA8` |
| `--ink-mute` | `#646C76` | `#79827E` |
| `--accent` | `#5E6FB4` lupine | `#8C9AD6` pale lupine |
| `--accent-deep` | `#48589B` | `#A7B3E4` |

Lines derive from ink at alpha: `--line-faint` 12%, `--line` 26%, `--line-strong` 55%.

## Typography

| Voice | Token / class | Role |
|---|---|---|
| Engraver | `--font-display` · `.masthead` | Page titles — tracked caps, two-weight stack |
| Book | `--font-body` · `.lede` `.subline` | Long reading, small-caps sublines |
| Typewriter | `--font-type` · `.note` `.fieldrow` `.btn` | Labels, buttons, coordinates, structure |

Arno Pro display + text optical load via Adobe kit `lao8mse`. Courier Prime is self-hosted in `fonts/`.

**The Upright Rule:** no italics anywhere. Emphasis = full ink, small caps, tracking, or accent.

## Backdrop contract

The system ships CSS/JS only. **Pages bring their own scene images.**

```html
<div class="world" aria-hidden="true">
  <img data-stop="dawn" data-src="img/stop-dawn.webp" alt="" />
  <img data-stop="day" src="img/stop-day.webp" alt="" />
  <img data-stop="dusk" data-src="img/stop-dusk.webp" alt="" />
  <img data-stop="night" data-src="img/stop-night.webp" alt="" />
</div>
```

- Stop schedule: dawn 05–08 · day 08–17 · dusk 17–20 · night 20–05 (local clock)
- Night mode pins the night stop; day mode follows the clock
- Lazy-load: only `day` needs `src` initially; others use `data-src`
- Night art is always true generated art — never CSS inversion
- Debug: `?mode=day|night` and `?stop=dawn|day|dusk|night`

## Components

| Component | Class | Notes |
|---|---|---|
| World layer | `.world` | fixed behind sheet; holds backdrop imgs |
| Sheet | `.sheet` | ledger double-rule panel; welcome ≤420px |
| Wide sheet | `.sheet.report` | reading template, up to 1120px |
| Compass mark | `.mark` | hand-inked Onda star; hover swing ~600ms |
| Field row | `.fieldrow` | typewriter metadata line |
| Tick rule | `.tickrule` | surveyor scale line |
| Masthead | `.masthead .lt` / `.hv` | two-weight engraver stack |
| Buttons | `.btn` `.btn.primary` | underlined text actions, no boxes |
| Toggle | `.bracket` | `[ DAY / NIGHT ]` family |
| Topbar | `.topbar` | fixed header row |
| Brief | `.brief` | full-width ledger summary |
| Entry | `.entry` | research column block |
| Plate | `.plate.fig` | figure with registration crosses |
| TOC | `.toc` | scrollspy bookmark strip |

## Do's and don'ts

### Do
- Keep one pigment per mode; draw every rule from the ink ladder
- Ration the lupine accent — one emphasis voice, never a surface
- Put precision where decoration would go: registration crosses, tick scales, coordinates
- Let the world breathe in the margins — sheet never spans viewport on desktop

### Don't
- Use italics. Ever.
- Let anything warm in: no orange, terracotta, cream, gold
- Borrow sibling moves: no glass/blur, emboss, die-cut, e-ink device chrome, racing-green darks
- Use photographs, gradients-as-decoration, glow, radius, or shadows
- Ship `@main` in published pages — pin a commit SHA

## File map

```
systems/lupine/
├── index.html          kitchen-sink specimen
├── README.md           this file
├── css/
│   ├── lupine.css      THE entry (link this)
│   ├── tokens.css
│   ├── base.css
│   └── components.css
├── scripts/
│   └── lupine.js       mode + clock-stop rig
└── fonts/
    └── CourierPrime-*.woff2
```

## License

Code: MIT. Courier Prime: SIL-OFL (see `fonts/CourierPrime-LICENSE.txt`). Arno via Adobe kit `lao8mse`.
