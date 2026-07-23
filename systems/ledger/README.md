# Ledger — Onda Studios

*Racing-green rules on ivory stock. Green is structure, never the reading ground.*

Everything Shake loves about **Racing-Green** — the palette, **Freight Display / Freight Text /
IBM Plex Mono**, the `[ bracketed ]` gold buttons, the hangtag rail — moved onto a light, readable
field. The mental model is **ledger paper**: ivory stock, ruled in green, entries in green-black ink,
one gold stamp. Green frames the page and carries the voice; it never becomes the ground you read on.

**Light is the default identity.** `[ DARK ]` is the toggle target, and dark is essentially the old
Racing-Green — so a page toggled dark feels like coming home. Theme choice persists per device and
ignores OS preference, per Racing-Green precedent.

## Use it

```html
<!-- theme-init before the stylesheet: restores a saved theme with no flash -->
<script src="./systems/ledger/scripts/theme-init.js"></script>
<link rel="stylesheet" href="./systems/ledger/css/ledger.css" />

<button class="theme-toggle" type="button">DARK</button>
<script type="module">
  import { initThemeToggle } from './systems/ledger/scripts/theme-toggle.js';
  initThemeToggle('.theme-toggle');
</script>
```

Open [`index.html`](./index.html) for the kitchen-sink reference.

## Palette discipline

**Never invent a hex.** The raw palette is Racing-Green's, verbatim; Ledger only re-points the
semantic aliases so light is the identity.

```
Stock (light)   --stock #FAF8F2 (ivory) · --surface-inset #EFE8D0 (parchment) · --row-alt #F6F2E7
Ink (light)     --ink #0D2A1B (green-black) · --ink-soft #1C3D2B · --ink-mute #5C6154
Ruling (light)  --line #D8DECE · --line-strong #A9B69F   (green on ivory, not gray)
Chrome          --chrome-bg #0D2A1B (deep green) with ivory ink — top bar, table head, footer
Accent          --accent #C5862A (light) · #E8B23A (dark)  — the one gold stamp
Status          --sage #A3A473 · --brass #E1B06E · --terracotta #844F3B · --tidal-blue #4B607C
Canvas (dark)   --canvas-deep #06130C · --panel #0D2A1B · --panel-raised #123524
```

Green covers roughly 10–15% of the light canvas — chrome only. Zero green under the reading column.
Gold is spent exactly as Racing-Green spends it: brackets, the kicker underline, one primary action,
the single top/bottom stripe. Never paragraphs of gold.

## Typography

| Token | Role | Stack |
|---|---|---|
| `--font-display` | Display + h1/h2 | Freight Display Pro → EB Garamond / Georgia |
| `--font-serif` | Body / reading | Freight Text Pro → EB Garamond / Georgia |
| `--font-mono` | Labels · data · brackets | IBM Plex Mono → ui-monospace |

Headings = **Freight Display Pro, upright**. Body = **Freight Text Pro**, green-black on ivory.
Labels/data/brackets = **IBM Plex Mono**. Title emphasis = **hangtag kicker**, not coloured `<em>`.

- **IBM Plex Mono** — free (SIL-OFL), Google Fonts `@import` in `css/base.css`.
- **Freight** — Adobe Fonts kit `lao8mse` `@import` in `css/base.css`; cannot be self-hosted, needs
  http(s) (no `file://`). Domain-locked; falls back to EB Garamond / Georgia off-domain, so the
  fallback stays respectable. Bump `?v=` after editing the kit.

## Components (kitchen sink shows all)

Top bar (green band, mono wordmark, gold stripe, `[ DARK ]` toggle) · hero with gold-underlined mono
kickers · **stat row as ledger totals** (mono figures under a double green rule) · **callout "the
take"** (parchment inset, green-ruled, one gold stripe) · pull-quote with gold bracket marks · list
with gold square markers · **table as a ledger** (green header band, ivory ink, alternating stock
rows, right-aligned mono numerals) · buttons (`.btn` mono hairline + `.btn.primary` gold
`[ bracketed ]`) · hangtag badges in sage / brass / terracotta / tidal · footer green band. A single
vertical green rule with a gold tick marks the left of the reading sheet — the ledger's ruled margin,
one line, never a repeating scanline.

## Theming

Light default. `scripts/theme-init.js` (before the stylesheet) restores a saved manual theme before
first paint; `scripts/theme-toggle.js` persists to `localStorage["shake-theme"]`. Dark
(`[data-theme="dark"]`) is essentially Racing-Green's dark semantics — deep canvas, panel surfaces,
ivory ink, gold `#E8B23A`, paper hangtags.

## File map
```
systems/ledger/
├── index.html            kitchen-sink reference
├── css/  ledger.css (entry) · tokens · base · components
└── scripts/ theme-init · theme-toggle
```

## License
Code: MIT. IBM Plex Mono: SIL-OFL. Freight: via Adobe subscription (kit `lao8mse`).
