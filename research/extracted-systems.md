# liquid-glass-next · design systems

Three reusable design systems, each extracted from one of the `../pages/` sketches and packaged in the shake-design-system house format (split `css/`, one `@import` entry, `scripts/`, a kitchen-sink `index.html`, and a README). Each is **single-theme on purpose** — the aesthetic *is* the identity, so there's no dark/light toggle to dilute it. Zero build step.

| System | From sketch | Aesthetic | Open |
|---|---|---|---|
| [**spatial-ar**](./spatial-ar/) — *Aperture* | `09-spatial-ar.html` | Warm translucent glass, spatial depth, one orange accent | [`spatial-ar/index.html`](./spatial-ar/index.html) |
| [**calm-eink**](./calm-eink/) — *Margin* | `12-calm-eink.html` | Calm monochrome e-ink, one sage accent, motion at a walk | [`calm-eink/index.html`](./calm-eink/index.html) |
| [**dimensional-paper**](./dimensional-paper/) — *Foldwell* | `20-dimensional-paper.html` | Handcrafted die-cut paper, multi-accent, pop-up parallax | [`dimensional-paper/index.html`](./dimensional-paper/index.html) |

## Use one

```html
<link rel="stylesheet" href="spatial-ar/css/spatial-ar.css" />
<!-- ...content using the system's classes... -->
<script type="module" src="spatial-ar/scripts/spatial-ar.js"></script>
```

Each `css/<slug>.css` is the only stylesheet you link; it `@import`s `tokens → base → components → effects`. Each `scripts/<slug>.js` auto-inits on load (or import its named functions and wire them yourself). Open any `index.html` to see every token, component, and signature effect live.

## How each is organised

```
<slug>/
├── README.md          the spec + "signature qualities & how to keep them" + font guide
├── index.html         kitchen-sink demo
├── css/
│   ├── <slug>.css     single link target — @imports the four below
│   ├── tokens.css     palette · signature shadow/grain/shape tokens · type · motion
│   ├── base.css       font loading (+ self-host hooks) · reset · body · type defaults
│   ├── components.css nav · hero · cards · stats · pricing · footer …
│   └── effects.css    ← the special-qualities layer (the whole point)
└── scripts/
    └── <slug>.js      the interactive signatures (reduced-motion aware)
```

**`effects.css` + `scripts/<slug>.js` are where each system keeps its magic** — the glass shadow, the e-ink grain + slow reader, the die-cut shadow + parallax — isolated as reusable classes/functions, each with a written "don't-break" rule in its README. Read those sections before tweaking.

## Fonts — cool, free, use-anywhere

Each system ships a curated free pairing (sourced against [fontalternatives.com](https://fontalternatives.com)). Every pick is **on Google Fonts *and* self-hostable**, so it works online today and offline/`file://` once you drop in a `.woff2` — no licensing, no setup.

| System | Recommended pairing | Why it fits | Free alternates (in `base.css`) |
|---|---|---|---|
| spatial-ar | **Geist** + **Instrument Serif** | Geist = modern-OS grotesque for a spatial "next" UI; Instrument Serif is itself the free stand-in for Domaine/Canela | Hanken Grotesk · Hedvig Letters Serif · Fraunces |
| calm-eink | **Literata** + **IBM Plex Mono** | Literata was *designed for e-readers* (Google Play Books) — the literal e-ink feel; Plex Mono is already on this Mac | Source Serif 4 · Spectral · Newsreader |
| dimensional-paper | **Fraunces** + **Baloo 2** | Fraunces is already premium-grade (crank SOFT/WONK for handmade character); Baloo 2 is warmer than Nunito | Bricolage Grotesque · Fredoka · Quicksand |

**To change fonts, three ways (easiest first):**
1. **Stay on Google Fonts (default).** Already wired via `@import` in each `base.css`. Swap by commenting the default line and uncommenting a listed alternate.
2. **Self-host for offline / `file://`.** Download the `.woff2` (Google Fonts ▸ Download, or [fontsource.org](https://fontsource.org)), drop into the system's `fonts/` folder, and uncomment the `@font-face` block in `base.css`. Renders with no network at all.
3. **Premium — your Adobe kit `lao8mse` (Freight).** Possible, but Typekit enforces a **domain allowlist and will not serve over `file://`** — so it's not the "use anytime" answer. Only when serving from an authorized http(s) host (and it needs an active Adobe subscription).

Whatever you choose, change it in **one place** per system: the `--font-*` tokens in `tokens.css` plus the `@import` in `base.css`.

---
*Extracted from the liquid-glass-next sketches · shake design systems · 2026.*
