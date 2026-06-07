# calm-eink — "Margin"

*Calm monochrome e-ink · one sage accent · motion at a walk.*

A reusable design system extracted from `liquid-glass-next/pages/12-calm-eink.html`. It packages the quiet-software language — warm paper, near-black ink, paper grain, a single muted sage, and deliberately slow motion — so any page can feel like an e-ink reader. Zero build step: one CSS file, one ES module.

## Quick start

```html
<link rel="stylesheet" href="css/calm-eink.css" />
<!-- ...content... -->
<script type="module" src="scripts/calm-eink.js"></script>
```

The grain and refresh sweep attach to `body` automatically. Behaviour hooks:

| Hook | Effect | Driven by |
|---|---|---|
| `class="rise"` (+ `.d1`–`.d4`) | fade-up entrance, staggered | `initReveal` |
| `class="dot-breathe"` | the slow breathing brand dot | CSS `breathe` |
| `#readerText .word` | word-by-word reading illumination | `initReader` |
| `#clock` | ambient clock, 1 min / 3.2s | `initClock` |
| `#beginBtn` | calm "page is ready" acknowledgement | `initBegin` |

## Palette discipline

**One accent — sage — and a deliberately tiny ink/paper contrast.**

```
Paper   paper #eceae3 · paper-2 #e4e1d8
Ink     ink #23241f (NEVER pure #000) · ink-soft #54564d · ink-faint #8d8e84
Line    line #c9c6ba (hairlines do all the dividing)
Accent  sage #7f8c72 · sage-deep #5f6c53
```

## Typography

| Token | Stack | Role |
|---|---|---|
| `--font-read` | `'Literata', 'Newsreader', Georgia, serif` | all reading text, headings |
| `--font-mono` | `'IBM Plex Mono', 'Spline Sans Mono', monospace` | eyebrows, labels, numbers, buttons |

Body runs `font-feature-settings: "liga" 1, "onum" 1` — ligatures + **old-style numerals**, the quiet elegance. Loaded via `@import` in `base.css`.

## Signature qualities — and how to keep them

1. **No frost, ever.** There is **no `backdrop-filter: blur`** in the entire system. The sticky header uses `saturate(105%)` only. Clarity, not glass, is the identity — adding blur breaks it instantly.
2. **Paper grain** — `body::before`, SVG `feTurbulence` at `--grain` (0.035) on `multiply`. Felt, not seen. Don't raise it.
3. **E-ink refresh sweep** — `body::after`, a near-invisible vertical band (opacity 0 at rest; nudge it up to simulate a refresh).
4. **Breathing dot** — `.dot-breathe`, a 6s `breathe` cycle (scale 1 → .82, halo expands + fades). The one piece of perpetual motion; keep it slow.
5. **Walking-pace reader** — `.word` / `.word.lit` + `initReader`. Words light at **520ms** intervals, rest **4200ms**, dim, loop. These cadences *are* the calm — leave them.
6. **Slow clock** — `initClock` advances one minute every **3.2s**. Time passes, quietly.
7. **Self-drawing glyphs** — `.glyph .draw` (stroke-dasharray) animates via `drawln` when a `.card` gets `.seen`.
8. **Hairlines + near-zero radius** — dividers are 1px `--line`; corners are 2–4px. No cards lift, nothing glows.

Motion gates on `prefers-reduced-motion` (`base.css`): the reader shows all words lit, the rest goes still.

## Components

| Component | Class | Notes |
|---|---|---|
| Header / nav | `header > nav` | sticky, `saturate` only, underline-grow links |
| Hero | `.hero` / `.hero-grid` | text + the "calm meter" reader card |
| Reader card | `.reader` | the signature ambient device |
| Feature cards | `.cards > .card` | hairline grid, self-drawing `.glyph` |
| Stat band | `.rhythm > .stats > .stat` | numbers we keep small |
| Principles | `.principles > .principle` | two-column ledger |
| Pricing | `.plans > .plan(.feature)` | |
| Quote | `.quote > blockquote` | |
| Footer | `footer .foot-grid` | |
| Swatches (demo) | `.swatches > .swatch-chip` | token reference in `index.html` |

## Using better fonts

Both picks are **free and drop-in anywhere** (Google Fonts + self-hostable), so they work whenever:

- **Stay on Google Fonts (default).** Wired in `base.css`. Alternates are listed there commented out — **Source Serif 4** (crisper), **Spectral** (more literary), or **Newsreader** (the original sketch). Uncomment one, comment the default.
- **Self-host for offline / `file://`.** IBM Plex Mono is already in `~/Library/Fonts`; for the page, download Literata's `.woff2` (Google Fonts ▸ Download, or fontsource.org), drop into `fonts/`, uncomment the `@font-face` block in `base.css`.
- **Premium (Adobe `lao8mse` → Freight Text Pro).** A natural fit for reading, but **won't render over `file://`** (Typekit domain allowlist). Only when served from an authorized http(s) host — so not the "use anytime" answer here.

Change it in one place: the `--font-read` / `--font-mono` tokens in `tokens.css`, plus the `@import` in `base.css`.

## File map

```
calm-eink/
├── README.md
├── index.html             kitchen-sink demo (tokens, components, effects, live)
├── css/
│   ├── calm-eink.css      the single <link> target — @imports the four below
│   ├── tokens.css         paper/ink palette · grain · slow-motion tokens · type
│   ├── base.css           font loading (+ self-host hooks) · reset · paper body · type
│   ├── components.css     nav · hero/reader · cards · stats · principles · pricing · footer
│   └── effects.css        grain · e-ink sweep · breathe · sweep · reader · glyph draw · rise
└── scripts/
    └── calm-eink.js       initReveal · initReader · initClock · initBegin (reduced-motion aware)
```

## Accessibility
`prefers-reduced-motion: reduce` stops all animation/transition, reveals `.rise` content, shows the reader fully lit, and finishes drawn glyphs. Nothing depends on motion.

---
*Extracted from the liquid-glass-next sketch · a shake design system · 2026.*
