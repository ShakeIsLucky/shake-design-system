# The War Room Wall

*The page is a wall. Everything printed lives on paper.*

A reusable, zero-build design system generalized from the shipped Meta-Ads war-room page. Every piece of content is a physical artifact pinned or taped to a deep spruce agency wall: printed briefs, typed transcript slips, index cards, sharpie annotations, masking tape, pins. The wall owns every margin; **reading text never sits on it** — the surface always wins over its ground. One CSS file, one ES module.

## Quick start

```html
<link rel="stylesheet" href="css/war-room.css" />
<!-- ...content, arranged on .wall / .cluster... -->
<script type="module">
  import { initWarRoom } from "./scripts/war-room.js";
  initWarRoom();
</script>
```

`initWarRoom()` wires reveal-on-scroll, flip cards, the agenda scroll-spy, and any persistent checklists. Every behaviour guards its own elements, so a page can omit the agenda, the deck, or the checklist and the rest still runs.

## The three commitments

Everything in the system follows from the metaphor:

1. **Nothing floats.** Text never sits directly on the background unless it is hand-written (marker voice). Everything printed lives on paper — `.artifact`.
2. **Voice = material.** Each typographic voice is a different physical artifact, never a styling whim. Oswald is the printed header; Archivo is the printed brief; Courier is the typed transcript; Permanent Marker is the sharpie in someone's hand.
3. **Emphasis is analog.** Highlighter swipes, sharpie circles and red arrows do the work that bold text, colored callout borders and badges do in ordinary systems.

## Palette discipline

**One committed field — the spruce wall — carries the whole surface. Paper is content, not ground.** The wall gets an SVG `feTurbulence` grain at 6% plus a soft corner vignette so it reads as painted material, not flat hex. Secondary text on the wall is **tinted from the wall's own green (`--wall-soft`), never gray.**

| Token | Value | Role |
|---|---|---|
| `--wall` | `#1C332C` | deep spruce wall — owns every gutter and margin; colour commits at page scale |
| `--wall-deep` | `#142620` | bottom of the wall gradient; also the `html` background |
| `--paper` | `#FCFBF7` | printed brief / index-card stock (bright, deliberately **not** cream) |
| `--paper2` | `#F6F3E9` | transcript-slip stock (one step warmer = older, typed paper) |
| `--ink` | `#161B18` | printed ink |
| `--ink-soft` | `#4D5751` | secondary printed ink — labels, captions, source lines |
| `--porcelain` | `#F2EFE5` | short text set directly on the wall (annotations only) |
| `--wall-soft` | `#A9C4B8` | secondary wall text — **tinted from the green, never gray** |
| `--hl` | `#FFE45C` | highlighter yellow — **verbatim + load-bearing lines only** |
| `--red` / `--red-deep` | `#D93A26` / `#B32E1D` | sharpie red — annotations, checks, circles, focus, urgency |
| `--blue` / `--blue-ink` | `#1877F2` / `#0D5BD0` | external-product blue — chips, links, borrowed vocabulary **only** |
| `--tape` | `rgba(240,229,196,.62)` | masking tape (no blur — glass is banned) |

Semantic aliases (`--bg` / `--surface` / `--surface-warm` / `--on-surface` / `--on-wall` / `--accent` / `--highlight` / `--external`) are the handles components read; page markup never touches a raw hex.

## Typography — four voices, four materials

| Token | Stack | Weights | Material / role |
|---|---|---|---|
| `--font-display` | `'Oswald', 'Arial Narrow', 'Helvetica Neue', Arial, sans-serif` | 500, 600 | **the printed header** — condensed caps for tabs, titles, display moments (max ~6rem) |
| `--font-body` | `'Archivo', 'Helvetica Neue', Helvetica, Arial, sans-serif` | 400, 500, 700 | **the printed brief** — all body copy on paper; measure 60–72ch |
| `--font-mono` | `'Courier Prime', 'Courier New', Courier, monospace` | 400, 700 | **the typed transcript** — verbatim quotes only; mono is earned by the artifact, never a "technical" costume |
| `--font-marker` | `'Permanent Marker', 'Comic Sans MS', cursive` | 400 | **the sharpie** — annotations, agenda header, margin notes, checks; **never body copy, never a heading** |

All four load from Google Fonts (`@import` at the top of `war-room.css`, `display=swap`). The honest fallback stacks mean the page still reads correctly with fonts off.

## Components — the artifacts

| Component | Class | Notes |
|---|---|---|
| Paper artifact | `.artifact` (`.lift`, `.card-ruled`) | `--paper` ground, near-zero radius, `--r` rotation (±1.2°), two-layer physical shadow |
| Printed brief | `.brief` (`.lede`, `h3`) | all body copy, at reading measure |
| Transcript slip | `.slip` + `.srcline` + `.q` + `<mark>` | Courier stock, source header with a flexing rule, highlighter with `box-decoration-break: clone` |
| Index card | `.card-ruled` | repeating 27px faint-blue rule — the earned exception to "no ruled lines" (the rule *is* the card) |
| Hardware | `.tape` (`.t2`,`.t3`) · `.pin` (`.p2`,`.p3`) | every artifact hangs by one; tape has no blur, the pin casts a real shadow |
| Marker layer | `.marker` · `.margin-note` · `.circle-mark` · `.arrow-note` | analog emphasis; the circle uses an uneven `border-radius` so it reads hand-drawn |
| Chip | `.chip` (`.red`,`.ink`,`.hl`,`.ext`) | printed source/category tag; **default is ink** — `.ext` is the only blue, opt-in for external-product vocabulary |
| Chapter tab | `.tabrow > .tab` + `.tabnote` | paper tab with a red mono `CH.n` and an Oswald title; marker one-liner beside it |
| Stat card | `.statcard` | index card with a big figure; circle the load-bearing number |
| Poster | `.poster` | a lone statement artifact (`em` takes the accent) |
| Flip card | `.deck > .fcard` | 3D flip on `button[aria-pressed]`; front = ruled index card, back = transcript. **Gotcha:** the `.inner` wrapper must be `display:block` with an explicit height |
| Process rail | `.rail-steps > .step` | pinned steps joined by marker arrows |
| Tag card | `.tagwall > .tagcard` | a small labelled note (printed-ink label) |
| Checklist | `.check` + `[data-checklist]` | sharpie checks, `localStorage` persistence, live `n of N` counter |
| Buttons | `.btn` · `.btn-ghost` | a paper tab pinned on: paper ground, Oswald caps, a red marker underline that swipes in on hover/focus |
| Table | `.wr-table` (in `.wr-scroll`) | a printed brief table on paper, ruled in faint blue |
| Swatches | `.swatches > .swatch` | palette documentation chrome (doc only) |
| Agenda | `.agenda.rail` + `#agendaList` | run-of-show card; fixed left lane ≥1240px, mobile "Index" overlay below |
| Footer | `.footer-note` / `.footer-slip` | a small taped slip |

### Layout

- **`.wall`** is the reading column, centered by default. Add **`.has-rail`** and it shifts past a fixed agenda card on the left lane at ≥1240px (`margin-left: max(18px, 50vw − 645px) + 288px`) — no overlap at any width.
- **`.cluster`** is a 12-column grid (`.w-4`…`.w-12`, `.push-1`…`.push-6`) with tiny alternating rotations, so the wall looks arranged by hand. Span + start-line use two-value `grid-column: auto / span n`. Below 900px the grid is abandoned — clusters become a flex column and everything stacks full-width; rotations remain.

## Motion

One authored moment: the hero cluster **pins in** on load (drop + settle, staggered ~180ms). Everything else is a single quiet fade-up per artifact (`IntersectionObserver`), card flips, and the agenda's marker check appearing as chapters are passed. **Full `prefers-reduced-motion` support** — reveals resolve to their final state instantly, the pin-in is disabled, and no timers spin.

## Theme — a single identity

There is **no light/dark toggle**: the spruce wall *is* the theme. `color-scheme` is `dark` (the wall is a dark ground), but the reading surface is always bright paper, so contrast holds without a second mode.

## Hard rules (kept from the craft floor)

- **No gradient text.**
- **No glass / blur decoration.** Tape and pins are opaque; the sticky nothing frosts.
- **No colored `border-left` callouts.** Emphasis is analog, not a colored bar.
- **No icon-tile card grids.** A deck of flippable index cards is the world's own device and the only card grid allowed.
- **Contrast ≥ 4.5:1 for body text on every surface** (checked on wall, paper, and index card).
- **Focus states: a 3px dashed red outline** (reads as marker).
- **Highlighter = verbatim-and-load-bearing only.** It emphasizes; it never paraphrases. Editorial cuts are visible, not silent.
- **Blue = external-product vocabulary only.** A borrowed voice for chips and links to outside products — never decoration.
- **No thin repeated ruled lines as decoration.** The 27px index-card rule is the earned exception — it *is* the artifact.
- **Rotation stays subtle (±1.2°).** Wobble is craft, not mess.

## File map

```
war-room/
├── README.md
├── index.html            kitchen-sink demo (every artifact, real neutral copy)
├── css/
│   ├── war-room.css      the single <link> target — @imports fonts + the three below
│   ├── tokens.css        wall/paper/ink material tokens · type · spacing · shadow · rotation · motion · semantic aliases
│   ├── base.css          the wall ground (gradient + grain + vignette) · reset · printed/annotation type · focus
│   └── components.css     the artifact family · layout (wall/cluster) · reveal + hero pin-in
└── scripts/
    └── war-room.js       initWarRoom: reveal · flip cards · agenda scroll-spy (live n/N) · mobile Index overlay · checklist persistence (reduced-motion aware)
```

## Accessibility

`prefers-reduced-motion: reduce` stops all animation and transition, reveals every `.rv` artifact, and disables the hero pin-in and card-flip motion. A skip link drops in on focus; focus is a 3px dashed red outline everywhere. Nothing depends on motion or colour alone.

---
*Generalized from `meta-ads-war-room-claude-07-23-26.html` · a shake design system · 2026.*
