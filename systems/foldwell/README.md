# dimensional-paper — "Foldwell"

*Handcrafted die-cut paper · multi-accent · pop-up parallax.*

A reusable design system extracted from `liquid-glass-next/pages/20-dimensional-paper.html`. It packages the tactile-paper language — die-cut cards with real thickness, rotated paper tabs, warm hand-dyed stock, cursor-tied pop-up parallax, and count-up stats — so any page feels handmade. Zero build step: one CSS file, one ES module.

## Quick start

```html
<link rel="stylesheet" href="css/dimensional-paper.css" />
<!-- ...content... -->
<script type="module" src="scripts/dimensional-paper.js"></script>
```

Build with classes + data-attributes:

| Hook | Effect | Driven by |
|---|---|---|
| `class="cut"` | die-cut card (thickness + soft cast + cut-rim) | `effects.css` |
| `class="tab"` | rotated paper label on a card | `effects.css` |
| `class="reveal"` | rise + un-rotate entrance, staggered | `initReveal` |
| `data-tilt="22"` on `.pop` | pop-up parallax (bigger = pops further) | `initPopParallax` |
| `data-depth` on `.scene .layer` | background scenery drift | `initPopParallax` |
| `data-count="2.4"` `data-suffix="%"` | count-up on scroll | `initCountUp` |

## Palette discipline

**Multi-colour on purpose.** Unlike the calm/glass systems, Foldwell is *meant* to be colourful — three paper stocks plus four hand-dyed accents. Don't flatten it to one hue.

```
Stock    paper-0 #f7efe2 · paper-1 #f1e3cc · paper-2 #ecd9b8
Accents  terracotta #d2693f (+deep #b14e2c) · sage #8aa479 (+deep #647a55) · sky #9fc6cf · mustard #e2a838
Ink      ink #3a2e25 (= surface-dark for the stats band) · ink-soft #6c5b4d
```

## Typography

| Token | Stack | Role |
|---|---|---|
| `--font-display` | `'Fraunces', Georgia, serif` | headings, prices, stat numbers, brand |
| `--font-ui` | `'Baloo 2', 'Nunito', system-ui, sans-serif` | body, buttons |

Headings run `font-variation-settings: "opsz" 120, "SOFT" 40, "WONK" 1` — the SOFT/WONK axes give Fraunces its slightly-imperfect, handmade character. Loaded via `@import` in `base.css`.

## Signature qualities — and how to keep them

1. **The die-cut shadow** — `.cut` + `--cut-sm/md/lg`. Each preset is **two layers**: a hard `0 Npx 0` offset (= the card's *thickness*) and a soft diffuse cast (= its *lift*). **Keep both.** Drop the hard layer and the paper instantly looks flat and digital. The `border-top: 2px` rim is the lighter cut edge.
2. **The wobble** — `.tab` rotates `-2.5deg`; stat cards sit at `±1.5deg`; features hover to `-0.6deg`; the `em` underline tilts `-1.2deg`. These tiny rotations are the "scattered by hand" charm. Utilities `.tilt-l` / `.tilt-r` / `.tilt-sm` are provided. Don't straighten them.
3. **The boing** — hovers use `--ease-bounce: cubic-bezier(.2,.8,.3,1.1)`, which overshoots the target before settling. That little spring *is* paper.
4. **Pop-up parallax** — `data-tilt` on `.pop` + `initPopParallax` (0.07 damping); background `.scene` layers drift the opposite way via `data-depth`. Needs `perspective` on `.diorama` (set in components.css).
5. **Count-up stats** — `data-count` / `data-suffix` + `initCountUp` (easeOutCubic, 1.3s), firing when the dark `.stats-band` scrolls in. This is the `#stats` band.
6. **Paper grain** — layered radial-dot `background-image` on `body` (in effects.css). **Book-spine fold** (`.fold`) and **scalloped edge** (`.scallop`) are reusable utilities; the footer uses `.scallop`.

Motion gates on `prefers-reduced-motion` (`base.css`): parallax + count-up are skipped, `.reveal` content shows immediately.

## Components

| Component | Class | Notes |
|---|---|---|
| Nav | `header .nav` | die-cut bar, stacked-card logo |
| Buttons | `.btn` / `.btn.ghost` | stamped paper (hard bottom shadow, press on `:active`) |
| Hero + diorama | `.hero` / `.diorama` / `.pop` | parallax book + floating cards, scenery layers |
| Eyebrow | `.eyebrow` | uppercase pill on paper-2 |
| Feature card | `.feature.cut.fN` | `.f1`–`.f6` set icon + tab colour |
| Stat band | `.stats-band > .stats > .stat` | dark stock, rotated count-up cards |
| Pricing | `.pricing > .plan(.cut)(.feat)` | featured plan lifts higher |
| Footer | `.foot-card.scallop` | sage card with wavy bottom edge |
| Swatches (demo) | `.swatches > .swatch-chip` | token reference in `index.html` |

## Using better fonts

Both picks are **free and drop-in anywhere** (Google Fonts + self-hostable):

- **Stay on Google Fonts (default).** Wired in `base.css`. Fraunces stays (it's already premium-grade and variable); Baloo 2 is the warmer body swap for Nunito. Alternates listed there: **Bricolage Grotesque** (characterful display), **Fredoka** (chunkier body), **Quicksand** (geometric rounded). Uncomment one.
- **Self-host for offline / `file://`.** Download the variable `.woff2` (Google Fonts ▸ Download, or fontsource.org), drop into `fonts/`, uncomment the `@font-face` block in `base.css` (note `format("woff2-variations")` to keep the axes).
- **Premium (Adobe `lao8mse` → Freight).** Possible but **won't render over `file://`** (Typekit domain allowlist) and adds little here, since Fraunces is already excellent. Skip unless serving from an authorized host.

Change it in one place: the `--font-display` / `--font-ui` tokens in `tokens.css`, plus the `@import` in `base.css`.

## File map

```
dimensional-paper/
├── README.md
├── index.html                  kitchen-sink demo (tokens, components, effects, live)
├── css/
│   ├── dimensional-paper.css   the single <link> target — @imports the four below
│   ├── tokens.css              paper/accent palette · die-cut shadow presets · type
│   ├── base.css                font loading (+ self-host hooks) · reset · paper body · type
│   ├── components.css          nav · hero/diorama · features · stats · pricing · footer
│   └── effects.css             grain · .cut · .tab · .fold · .scallop · tilts · reveal
└── scripts/
    └── dimensional-paper.js    initReveal · initPopParallax · initCountUp (reduced-motion aware)
```

## Accessibility
`prefers-reduced-motion: reduce` disables animation/transition, skips parallax + count-up, and shows `.reveal` content immediately. Stat values fall back to their final numbers. Nothing depends on motion.

---
*Extracted from the liquid-glass-next sketch · a shake design system · 2026.*
