# kiln — "Commonplace"

*Warm editorial · terracotta on cream · notes in the margin.*

A reusable design system for long-form work: research pages, essays, explainers, anything that is
**read** rather than operated. Cream stock, warm near-black ink, one terracotta moment per viewport,
and asides that sit beside the line they belong to instead of interrupting it. Zero build step: one
CSS file, one ES module.

Derived from the **Warm Editorial** `DESIGN.md` in
[`rohitg00/awesome-claude-design`](https://github.com/rohitg00/awesome-claude-design/blob/main/design-md/warm/claude.md),
re-cut to Onda token conventions and given a dark stock.

## Quick start

```html
<!-- no-FOUC init: classic script in <head>, BEFORE the stylesheet -->
<script src="scripts/theme-init.js"></script>
<link rel="stylesheet" href="css/kiln.css" />
<!-- ...content... -->
<script type="module" src="scripts/kiln.js"></script>
```

Behaviour hooks:

| Hook | Effect | Driven by |
|---|---|---|
| `class="rise"` (+ `.d1`–`.d4`) | fade-up entrance, staggered | `initReveal` |
| `.col` + `aside.rail` | reading column beside a real outer margin | CSS |
| `.sidenote[id]` ← `.noteref[href="#id"]` | note pulled level with the line that cites it | `initSidenotes` |
| `.navlinks a[href^="#"]` | terracotta rule follows the section in view | `initCurrentSection` |
| `class="theme-toggle"` | `[ DARK ]` / `[ LIGHT ]` mode switch | `initThemeToggle` |

## Palette discipline

**One accent — terracotta — and it appears once per screen.**

```
Stock   paper #f4f3ee (NEVER pure #fff) · paper-2 #eeede6 · paper-deep #191817
Ink     ink #191817 (NEVER pure #000) · ink-soft #5a554e · ink-faint #8a847a
Line    line #d8d3c8 (hairlines do all the dividing)
Accent  terracotta #c96442 · terracotta-deep #b55738 · terracotta-soft #e89268
State   moss #6b7a3d · amber #c98a42 · brick #a53e2a
```

The **state** colours are not the accent and never stand in for it. Terracotta never means "error";
a flagged row is `--brick`. Conversely `--moss` never becomes a brand colour.

## Typography

| Token | Stack | Role |
|---|---|---|
| `--font-display` | `'quincy-cf-1', 'Quincy CF', 'Iowan Old Style', 'Newsreader', Georgia, serif` | headlines, pull-quotes, figures, plan names |
| `--font-body` | `'halyard-text-1', 'Halyard Text', 'Alegreya Sans', -apple-system, system-ui, sans-serif` | all running text and interface |
| `--font-mono` | `'IBM Plex Mono', 'Spline Sans Mono', ui-monospace, monospace` | eyebrows, column heads, note markers, inline code |

Display is **Quincy CF**, body is **Halyard Text**, both from the Onda Adobe kit `lao8mse` (`@import`
at the top of `kiln.css`). Off an authorized host the kit falls back silently to **Newsreader** and
**Alegreya Sans**, loaded via `@import` in `base.css` — the stacks are ordered so the fallback still
reads.

The Warm Editorial spec names **Inter** as its free body fallback and we deliberately do not use it.
The kit drops out silently on any unauthorized host — including `file://` — so the fallback is the
face most readers actually get, which makes it a real choice rather than a safety net. Inter is the
most over-used face in AI-generated interfaces, and the same spec's own don't-list says *"apply Inter
to every surface by default"* is a mistake. Alegreya Sans is the humanist the spec asks for, built as
a serif companion, with warmth the geometric neutrals lack.

**Emphasis is weight, never italic.** `<em>` renders at weight 500 in `--terracotta-deep`; the
source spec is explicit that italics on this stock read as an apology. Serif is for prose, sans is
for anything you operate, mono is for labels — three roles, and only three.

## Signature qualities — and how to keep them

1. **No shadows.** There is exactly one `box-shadow` in the system and it belongs to `.modal`.
   Depth is a **surface shift** (`--paper` → `--paper-2`), a **1px hairline**, and **type weight**.
   Adding a card shadow breaks the identity instantly.
2. **Nothing lifts.** No `transform` on hover anywhere — no lift, no scale. Hover changes colour and
   border only. A printed page does not float when you point at it.
3. **The margin rail** — `.col` gives a 680px reading column plus a 220px outer margin;
   `initSidenotes()` pulls each `.sidenote` level with the `.noteref` that cites it, and guarantees
   notes never overlap by placing each below the previous note's bottom edge.
4. **The floating pull-quote** — `.pullquote` floats *into* the margin so the text wraps around it,
   the way a magazine sets one. It stops floating below 1080px.
5. **One terracotta moment per viewport.** Primary button, or an active nav rule, or the pull-quote
   rule — pick one per screen. Never tint body text with the accent.
6. **Hairlines, not boxes.** Feature sets use `.entries` (rows on rules) and pricing uses `.plans`
   (a comparison), because a card grid makes every item an equal claim on attention.
7. **Numbered markers only for real sequences.** `.steps` is for a process where order carries
   information. An unordered set gets `.entries` instead — `01 / 02 / 03` on arbitrary features is
   decoration pretending to be structure.
8. **The type grows on mobile.** Body goes 17px → **18px** below 640px. Reading on a small screen is
   harder, not easier.

Motion gates on `prefers-reduced-motion` (`base.css`): all animation and transition stop and `.rise`
content is revealed. Nothing depends on motion.

## Layout tokens

| Token | Value | Meaning |
|---|---|---|
| `--longform` | `680px` | the reading column |
| `--shell` | `1180px` | full page chrome (app-shell width) |
| `--rail` | `220px` | the margin that carries sidenotes |
| `--measure` | `68ch` | running-text cap (65–72 characters) |
| `--break` | `96px` | section break |
| `--radius` / `--radius-lg` | `6px` / `8px` | buttons + inputs / panels |

## Components

| Component | Class | Notes |
|---|---|---|
| Header / nav | `header > nav` | **static, not sticky** — a document does not follow you |
| Eyebrow | `.eyebrow` | mono uppercase label |
| Hero | `.hero` | `h1` clamps 36 → 62px |
| Reading column + margin | `.col` > content + `aside.rail` | the signature layout |
| Sidenote | `.sidenote` + `.noteref` | anchored by `initSidenotes` |
| Pull-quote | `.pullquote` | floats into the margin |
| Figures | `.figures > .figure-stat` | numbers on a top rule, never cards |
| Sequence | `.steps > .step` | ordered process only |
| Unordered set | `.entries > .entry` | rows on hairlines |
| Panel | `.panel` | the one boxed surface; borderless at rest |
| Inverse band | `.band-inverse` | one dark interlude per page |
| Table | `table` (+ `.table-wrap`) | zebra on `--paper-2`, mono heads, `data-label` required |
| Pricing | `.plans > .plan` | a comparison, not three boxes |
| Quote band | `.quote > blockquote` | centred section break |
| Footer | `footer .foot-grid` | |
| Modal | `.modal` | the only shadow in the system |
| Swatches (demo) | `.swatches > .swatch-chip` | token reference in `index.html` |

**Tables must set `data-label` on every `<td>`** — below 640px rows restack as cards and print the
column head from that attribute.

## File map

```
kiln/
├── README.md
├── index.html             kitchen-sink demo (tokens, components, the margin rail, live)
├── css/
│   ├── kiln.css           the single <link> target — @imports the three below
│   ├── tokens.css         stock/ink palette · the one accent · state colours · measure · type
│   ├── base.css           font loading (+ self-host hooks) · reset · cream body · type · .col
│   └── components.css     nav · hero · rail/sidenotes · pull-quote · figures · steps · entries ·
│                          inverse band · tables · plans · quote · footer
└── scripts/
    ├── kiln.js            initReveal · initSidenotes · initCurrentSection · initThemeToggle
    ├── theme-init.js      no-FOUC theme init (classic <head> script; default light)
    └── theme-toggle.js    manual [ DARK ]/[ LIGHT ] toggle (initThemeToggle; shake-theme key)
```

## Theme — light + dark

Default is **light** (cream stock); kiln is a daytime reading surface. The manual
`[ DARK ] / [ LIGHT ]` toggle inverts it into *the commonplace book by lamplight* — a warm
near-black stock that keeps its olive-brown, warm off-white ink, and a lifted terracotta that still
carries as the one accent. **Never pure black.**

- Choice persists per device under the shared key **`shake-theme`**; OS `prefers-color-scheme` is
  ignored (manual, matching calm-ink).
- Dark is driven entirely by the token layer: `:root[data-theme="dark"]` in `tokens.css` inverts the
  raw palette. **Components carry zero per-theme rules.**
- Note that `--terracotta-deep` goes *lighter* than `--terracotta` on the dark ground — "deep" means
  *more emphasis*, and on a dark page emphasis moves up, not down.

## Accessibility

`prefers-reduced-motion: reduce` stops all animation and transition and reveals `.rise` content.
Keyboard focus is a 2px terracotta ring at 2px offset. Sidenote markers are real anchors, so the
notes are reachable and readable with the rail collapsed or the stylesheet off.

---
*Derived from the Warm Editorial DESIGN.md · a shake design system · 2026.*
