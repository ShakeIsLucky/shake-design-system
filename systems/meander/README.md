# Meander — "Electric blue, drawn like a Greek manual."

*Electric royal blue field · oversized light serif capitals · mono body · Greek-key meander borders · paper where the reading happens.*

A stark editorial microsite language: an electric royal-blue field carries the loud, short
things, and white **paper** bands carry everything you actually read. "Greek-drawn" is the
drawn line of Greek pottery and inscription — meander (Greek key) borders as section seams,
2px pottery-weight rules, one animated arc. A high-fashion software manual.

Blue-only identity: **the blue IS the theme.** No dark variant, no toggle.

## The readability law (non-negotiable)

**Long-form reading never sits raw on saturated blue.** The blue field carries the hero,
nav, kickers, stat bands, actions and footer — short, loud things. Body paragraphs, lists
and tables live in `.band.paper` sections: white ground, `#0000F2` blue ink. Blue and paper
bands alternate as full-bleed horizontal bands, and the **meander seam marks each transition.**
The text surface always wins over the field behind it.

## Quick start

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" />
<link rel="stylesheet" href="css/meander.css" />
<!-- optional enhancement (procedural grain on blue cards) -->
<script type="module" src="scripts/meander.js"></script>
```

Instrument Serif loads from Google Fonts; if it is unavailable the stack falls back to
Times New Roman, which stays respectable. Courier Prime is self-hosted in `fonts/`.

Published pages pin the stylesheet (and script, if used) to a commit SHA on jsDelivr:

```html
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/ShakeIsLucky/shake-design-system@<SHA>/systems/meander/css/meander.css" />
```

## Palette — five tokens, one accent

| Token | Value | Role |
|---|---|---|
| `--hermes` | `#0000F2` | Electric royal blue — page field, bands, blue ink on paper |
| `--fg` | `#F5F5F5` | Off-white — text on blue, button plates |
| `--paper` | `#FFFFFF` | Reading ground |
| `--accent` | `#EDFF45` | Acid yellow — selection, the arc, **tiny** marks only |
| `--shadow` | `rgba(0,0,0,.25)` | Button plate shadow |

Selection is `#EDFF45` on `#0000F2`. Focus rings are `#EDFF45` on blue, `#0000F2` on paper.
There are **no other hues.** The accent never sets body text and never fills a large area —
it is spent on selection, the hover arc, a drawn dash, a status underline. Status stays
editorial (blue ink on paper with a yellow underline), never dashboard chrome.

## Type — two voices

| Voice | Token | Role |
|---|---|---|
| Display | `--font-display` · Instrument Serif → Times New Roman | `h1`, `h2`, stat numerals — **ALL-CAPS**, weight 400, `.03em` |
| Mono / body | `--font-mono` · Courier Prime (self-hosted) | body, eyebrows, labels, tables — `.1em`, eyebrows `.18em` uppercase |

Scale is `clamp()`-based (`--type-hero`, `--type-h2`, `--type-stat`, `--type-body`, …) so it
drops onto ordinary content pages without container math. Tracking tokens: `--track-display`
`.03em`, `--track-mono` `.1em`, `--track-eyebrow` `.18em`.

## Greek-drawn devices

- **Meander seam** — a CSS-only Greek-key band (`--meander`, a `currentColor` mask), thick
  and deliberate, drawn at the top of every `.band` and as `.meander-rule`. It marks the seam
  between bands. A drawn ornament, **not** a scanline.
- **Drawn rules** — `--rule` is `2px`, pottery-line weight. Never a hairline.
- **`.column-list`** — a numbered list styled as inscription: upper-roman numerals in mono,
  a 2px left rule.
- **Arc hover** — the animated conic border on `.card`, cycling `fg → accent → blue`, `2.23s`
  linear, paused until hover/focus. The one moving ornament; kept to interactive elements.
- **Grain + vignette** — an optional `.card__field` layer on blue cards at ≤ .2 opacity.
  Never sits over reading text.

## Components

| Component | Class | Notes |
|---|---|---|
| Band shell | `.band.blue` / `.band.paper` | Full-bleed; each wears a meander seam. `.band--open` for the first (no crown) |
| Inner guard | `.band__inner` | Caps content at 1180px, centered |
| Hero | `.hero__title` `.hero__dek` `.hero__ornament` | Giant caps + serif dek + mono ornament |
| Eyebrow / kicker | `.eyebrow` (`.eyebrow--tick` for a yellow tick) | Mono uppercase, `.18em` |
| Badge | `.badge` | 1px currentColor border, mono |
| Buttons | `.btn` / `.btn.ghost` | Fg plate → pure white on hover; ghost is a 2px outline |
| Stat row | `.stats` / `.stat__n` / `.stat__l` | Giant serif numerals on blue |
| Cards | `.cards` / `.card` (+ `.card__field`) | Platform-style, meander crown, arc hover |
| Pull-quote | `.pull` | Paper band, huge blue serif quote, drawn accent dash |
| Column list | `.column-list` | Roman-numeral inscription |
| Table | `.data-table` | Paper, 2px rules, mono, tabular nums |
| Swatches | `.swatches` / `.swatch` | Token grid with 2px drawn gridlines |
| Type specimen | `.type-row` / `.type-display` / `.type-mono` | |
| Footer | `.colophon` + `.ghost-mark` | Oversized ghost wordmark at ~8% fg |

## Motion

Opacity fades `.2s ease-out`; the arc runs `2.23s` linear on hover only. No parallax in v1 —
the system stays calm and portable. `prefers-reduced-motion` kills the arc and the grain.

## Do / don't

**Do** keep every paragraph, list and table on paper · spend the accent tiny · draw seams with
the meander, subsections with space · set headings in Instrument Serif all-caps.

**Don't** run body text on saturated blue · fill anything large with acid yellow · add a second
hue · use hairline scanlines · reach for a heavy display face · ship `@main` on published pages.

## File map

```
systems/meander/
├── index.html          kitchen-sink reference
├── README.md           this file
├── css/
│   ├── meander.css     THE entry (link this) — @imports the three below
│   ├── tokens.css      custom properties, the five colours, the meander mask
│   ├── base.css        @font-face, reset, band shell + seam, drawn rules
│   └── components.css  hero, cards, stats, pull-quote, table, swatches, footer
├── scripts/
│   └── meander.js      optional procedural grain (reduced-motion aware)
└── fonts/
    ├── CourierPrime-Regular.woff2
    ├── CourierPrime-Bold.woff2
    └── CourierPrime-Italic.woff2
```

## License

Code: MIT. Courier Prime: SIL-OFL (redistribution fine). Instrument Serif is served by Google
Fonts (SIL-OFL). Source language reverse-engineered from the Hermes Agent Desktop extraction
(`shake-pages/references-extractions/hermes-agent-desktop-2026-06-12/`); Sigurd (the source's
licensed display face) is deliberately **not** used — Instrument Serif is the free stand-in.
