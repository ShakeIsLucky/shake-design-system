# Intaglio

**Surfaces you can press. Ink, not light.**

Intaglio is a piece of machined print-shop equipment rendered in CSS: plates rise out of
the plaster stock, controls are carved into it, and state is communicated by physical travel
and inlaid pigment — never by glow. Vintage lab instrument plus letterpress plate, not a
neumorphic dribbble shot. It is a rebuild of the neo-tactile light-model with the Claude-vibe
removed: the tactile idea survives, the vermilion dies.

Specimen 04 of the Onda design library.

---

## The idea in three moves

- **Raise** (`--emboss*`) — a plate embosses OUT of the stock: bright top-left rim, warm
  bottom-right contact shadow.
- **Carve** (`--deboss*` / `--inset-band`) — a well cuts INTO the stock: the same light
  model, inverted. Code, tables, quotes and form controls are carved.
- **Inlay** — the replacement for glow. An active pad / toggle / indicator gets (1) a deboss
  (it is pressed IN), (2) a flat petrol-enamel fill (`--enamel`: colour + rim + a 1px inner
  top shadow), and (3) a 2px brass tick or needle where the control has a pointer.
  **Maximum blur radius on any state effect is 2px.** Nothing pulses, nothing glows.

## Palette

The stock reads **limestone / plaster** — a cool greige, never cream — so the reading surface
always wins over the ground. One accent voice: **petrol teal**. Brass is hardware detail,
spent in hairlines (rims, ticks, needles), never in areas.

| Token | Role | Hex (light) |
| --- | --- | --- |
| `--paper` | Page stock — plaster | `#e7e4dc` |
| `--paper-deep` | Sunken well stock | `#d7d3c6` |
| `--graphite` | Headings / strongest ink | `#22211d` |
| `--charcoal` | Body ink | `#322f2a` |
| `--taupe` | Tertiary ink | `#676253` |
| `--petrol` | **The one accent** — action plate, inlaid enamel, focus, selection | `#2E5A5C` |
| `--petrol-deep` | Deeper petrol | `#234748` |
| `--felt` | Success / secondary chips only | `#3f6b52` |
| `--brass` | Hairline rims, needles, ticks | `#A98243` |
| `--oxblood` | Error — muted, cool (not vermilion) | `#8A3A2E` |
| `--ochre` | Warning | `#c98a3c` |
| `--tidal` | Info | `#566b73` |

## Type

- **Display / headings — Quincy CF** (Adobe kit family `quincy-cf-1`): a warm mid-century
  slab-serif, the voice of a machine-age instrument label, upright and letterpressed on the
  large cuts. Fallback: `Rockwell`, Georgia, serif.
- **Body — Halyard Text** (`halyard-text-1`): a calm humanist sans for the reading column.
  Fallback: the `-apple-system` stack.
- **Mono — IBM Plex Mono** (Google Fonts): the voice of every measurement — labels, data,
  dial figures, tokens, hexes.

The Adobe kit is domain-locked (localhost is allowed); off-domain the kit faces fall back to
Rockwell/Georgia and the system sans, both of which the design accounts for. `--text-emboss`
(the letterpress shadow) is applied to large display type only.

## Components

Plates (raise) for cards and stat tiles; wells (carve) for code, tables and quotes; a
`.device` instrument cluster with a brass-needle dial, an enamel toggle, and sequencer pads
that inlay on press; buttons — primary petrol action plate with real press travel, secondary
raised paper plate, tertiary flat underline link; hangtags, chips and badges; a callout that
raises toward you and a `.quote` carved deeply in with a brass tick; a table set in a shallow
well with mono figures; a footer built as a deep plate. The full standard library (forms,
tabs, accordion, alerts, progress, meters, tooltip, spinner, skeleton, avatars, pagination,
modal) is included — see `index.html`.

## Theme behaviour

Plaster (light) is the default identity; graphite (dark) is an opt-in. The system follows the
OS by default via `prefers-color-scheme`, and a `.theme-toggle` persists a manual choice per
device under `intaglio-theme`. On dark, the highlight is a *lifted graphite* (never white) and
the page is warm mid-graphite (never black), so the elevation model holds; petrol and brass
lift for contrast. Only the colour/surface/highlight/shadow layer is redefined — every shadow
preset references the theme-aware `--hl` / `--sh`, so the whole system re-skins with zero
component edits.

## Files

```
systems/intaglio/
  css/
    intaglio.css     entry — @imports the kit + IBM Plex Mono, then the three layers below
    tokens.css       palette -> semantic aliases -> dark recompute -> type/space/radius -> presets
    base.css         reset, prose, layout primitives, scroll-reveal
    components.css   the full component library
  scripts/
    theme-init.js    pre-paint theme application (no flash)
    theme-toggle.js  plaster <-> graphite, OS-following, persists per device
    reveal.js        scroll-reveal
    interactions.js  count-up, sequencer pads + dial needle, device tilt (<=2deg), disclosure
  index.html         kitchen-sink reference page (every component)
```

Link the single entry stylesheet, and import the script modules for the toggle, reveals and
the instrument cluster:

```html
<link rel="stylesheet" href=".../systems/intaglio/css/intaglio.css" />
<script type="module">
  import { initThemeToggle }  from '.../systems/intaglio/scripts/theme-toggle.js';
  import { initReveal }       from '.../systems/intaglio/scripts/reveal.js';
  import { initInteractions } from '.../systems/intaglio/scripts/interactions.js';
  initThemeToggle('.theme-toggle'); initReveal(); initInteractions();
</script>
```
