# spatial-ar — "Aperture"

*Warm translucent glass · spatial depth · one orange accent.*

A reusable design system extracted from `liquid-glass-next/pages/09-spatial-ar.html`. It packages the floating-glass language — translucent panels that cast volumetric shadows in a sunlit "passthrough" room, gaze-reactive bloom, and depth-aware parallax — so you can apply the look to any new page. Zero build step: one CSS file, one ES module.

## Quick start

```html
<link rel="stylesheet" href="css/spatial-ar.css" />
<!-- ...content... -->
<script type="module" src="scripts/spatial-ar.js"></script>
```

Then, once per page, drop the backdrop layers and a reticle right after `<body>`:

```html
<div class="passthrough"></div>
<div class="grain"></div>
<div class="haze"></div>
<div class="reticle" id="reticle"></div>
```

Float anything by adding `panel` (or `glass`). Sprinkle behaviour with data-attributes:

| Attribute | Effect | Driven by |
|---|---|---|
| `class="panel"` | floating translucent glass + volumetric shadow | `effects.css` |
| `data-rise` | fade + rise on scroll into view | `initReveal` |
| `data-depth="1.6"` | parallax (smaller = nearer = moves more) on `.float` | `initParallaxFloats` |
| `data-tilt` | gaze-bloom: brightens under the reticle | `initReticle` |

## Palette discipline

**One accent, and only one.** Everything is warm-neutral except `--accent` (#ff7a45). The moment a second saturated hue appears, the focal pop dies.

```
Room (backdrop)   room-1 #d9cbbd · room-2 #c7b4a3 · room-3 #a98b72 · room-glow #f4e9dd
Glass             panel rgba(252,249,245,.62) · panel-edge rgba(255,255,255,.85)
Ink               ink #2a2018 · ink-soft #6b5d50
Accent            accent #ff7a45   ← the only chroma
```

## Typography

| Token | Stack | Role |
|---|---|---|
| `--font-display` | `'Instrument Serif', 'Hedvig Letters Serif', Georgia, serif` | h1/h2, stat numbers, prices |
| `--font-ui` | `'Geist', 'Inter', system-ui, sans-serif` | everything else |

Loaded via Google Fonts `@import` in `base.css`. See **Using better fonts** below.

## Signature qualities — and how to keep them

This is the whole point of the extraction. Each lives as a reusable token/class/function; each has a rule that, if broken, kills the effect.

1. **Floating glass** — `.panel` / `.glass`. The magic is `--glass-blur: blur(26px) saturate(1.3)` + the **four-layer** `--shadow-float`. *Keep all four layers* — the `inset` highlight on top is what reads as "lit glass"; the two long `-18px`/`-50px` casts are the float. Keep blur ≥ ~22px **with** `saturate`. Thin either and panels flatten into cards.
2. **The lit room** — `.passthrough` (+ drifting `::before/::after` blobs, `drift1`/`drift2`), `.grain`, `.haze`. These three fixed layers sell "captured light, not a gradient." The grain is SVG `feTurbulence` at 5% on `overlay`; don't raise it.
3. **Depth stage** — `body { perspective: 1600px }`. A `perspective` **must** live on a parent or every `translateZ`/parallax/3D-hover collapses.
4. **Gaze reticle + bloom** — `.reticle` + `initReticle` (0.18 damping follow). Panels with `data-tilt` brighten under the cursor. The weighty, slightly-laggy follow *is* the feel; don't raise the damping.
5. **Parallax floats** — `data-depth` + `initParallaxFloats`. Nearer (smaller depth) moves more, plus a gentle sine bob.
6. **Micro-life** — `.dot-pulse` (pulsing status), `.bars > .bar > i` (`fill` animation). Tiny, ambient, never urgent.

All ambient motion is gated by `prefers-reduced-motion`.

## Components

| Component | Class | Notes |
|---|---|---|
| Nav | `.nav-wrap > nav.panel` | floating pill, gaze-bloom via `data-tilt` |
| Hero + scene | `.hero` / `.scene` / `.float` | 3D floating cluster (`card-main`, `chip-a/b/c`) |
| Eyebrow | `.eyebrow` + `.dot-pulse` | glass pill label |
| Buttons | `.btn-primary` / `.btn-ghost` | warm gloss vs. ghost glass |
| Feature card | `.feature.panel` | lifts toward you on hover (`--shadow-lift`) |
| Stat band | `.stats > .stat` | serif numbers, `em` in accent |
| Pricing / CTA | `.invite.panel` | radial accent glow |
| Footer | `.foot-grid.panel` | |
| Swatches (demo) | `.swatches > .swatch-chip` | token reference in `index.html` |

## Using better fonts

The picks above are **free and drop-in anywhere** — both Geist and Instrument Serif are on Google Fonts *and* self-hostable, so they work "whenever." Three ways to change them, easiest first:

- **Stay on Google Fonts (default).** Already wired in `base.css`. To try an alternate, comment the `@import` and uncomment one of the listed lines — **Hedvig Letters Serif** (softer display), **Hanken Grotesk** (calmer UI), or **Fraunces** (optical display).
- **Self-host for offline / `file://`.** Because this page often opens as a `file://` URL, true "use anytime, even offline" means self-hosting: download the `.woff2` (Google Fonts ▸ Download, or fontsource.org), drop into `fonts/`, and uncomment the `@font-face` block in `base.css`. No network needed.
- **Premium (Adobe kit `lao8mse` → Freight).** Possible but **won't render over `file://`** (Typekit enforces a domain allowlist), so it's not the "use anytime" answer. Only if you serve this from an authorized http(s) host.

Whatever you pick, change it in **one place** — the `--font-display` / `--font-ui` tokens in `tokens.css` — and load it in `base.css`.

## File map

```
spatial-ar/
├── README.md
├── index.html              kitchen-sink demo (tokens, components, effects, live)
├── css/
│   ├── spatial-ar.css      the single <link> target — @imports the four below
│   ├── tokens.css          palette · signature shadow/blur · type · motion
│   ├── base.css            font loading (+ self-host hooks) · reset · stage · type
│   ├── components.css      nav · hero/scene · buttons · features · stats · pricing · footer
│   └── effects.css         .glass · passthrough/grain/haze · reticle · pulse · reveal
└── scripts/
    └── spatial-ar.js       initReveal · initReticle · initParallaxFloats (reduced-motion aware)
```

## Accessibility
`prefers-reduced-motion: reduce` disables all animation/transition, forces `[data-rise]` content visible, and hides the reticle. Content never depends on motion.

---
*Extracted from the liquid-glass-next sketch · a shake design system · 2026.*
