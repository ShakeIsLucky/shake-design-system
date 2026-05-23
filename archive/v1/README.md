# Shake Design System

A restrained, film-strip, monospace-and-serif UI system cast in deep **British / Irish
racing green** and aged ivory. Old-money luxury: hushed, rich, deliberately analog.
Elevation is achieved by going *darker underneath*, never lighter on top.

Pure CSS — no build step, no dependencies. Drop one stylesheet into any page and go.

---

## What's in the box

```
shake-design-system/
├── css/
│   ├── tokens.css        Design tokens — the single source of truth (colour, type, scale)
│   ├── base.css          Element defaults + the full-page canvas (bg, grain, type)
│   ├── components.css    The component vocabulary
│   └── shake.css         Entry point — @imports the three above, in order
├── assets/
│   └── star.svg          The Shake mark (oval ring + 8-point starburst, currentColor)
├── examples/
│   └── research-brief.html   A real page built with the system, zero inline styles
├── index.html            Living style guide — every token and component on one page
└── README.md
```

## Quick start

Link the one bundled file:

```html
<link rel="stylesheet" href="path/to/shake-design-system/css/shake.css" />
```

That pulls in `tokens.css` → `base.css` → `components.css` and the web fonts. Then write
markup with the component classes:

```html
<header class="site">
  <div class="left">
    <!-- inline assets/star.svg here -->
    <span class="lockup"><em>Shake</em></span>
  </div>
</header>

<div class="stage">
  <aside class="rail"></aside>
  <main class="column">
    <article class="hero"> … </article>
    <section class="panel">
      <header><h2>Section</h2><span class="id">§ 01 / 03</span></header>
      <div class="body"> … </div>
    </section>
  </main>
  <aside class="rail"></aside>
</div>
```

Open `index.html` for the full living style guide, or `examples/research-brief.html` for a
real page built entirely from the system.

### Using a subset

The three layers are independent so you can take only what you need:

- **Tokens only** — link `css/tokens.css` to get the colour/type/scale custom properties and
  style your own components against them.
- **Components without the forced canvas** — link `tokens.css` + `components.css` and skip
  `base.css` (which is what paints the dark racing-green background, film grain, and element
  defaults).
- **Everything** — link `css/shake.css`.

## Tokens

All tokens live in `css/tokens.css` under `:root`. Categories:

| Group | Examples |
|---|---|
| **Colour — raw scale** | `--canvas-deep` `--canvas` `--panel` `--panel-raised` `--panel-sunken` `--border` `--border-strong` `--border-faint` `--fg-mute` `--fg-mute-2` `--fg-body` `--fg-strong` `--fg-brand` `--fg-link` `--paper` `--warn` `--strip-bg` `--strip-dot` `--logo` |
| **Colour — semantic** | `--bg` `--surface` `--surface-2` `--surface-inset` `--hairline` `--text` `--text-strong` `--text-mute` `--text-link` `--focus-ring` `--selection-bg` |
| **Type** | `--font-serif` `--font-mono` · `--type-display` `--type-h1` `--type-h2` `--type-h3` `--type-body` `--type-body-sm` `--type-caption` `--type-bracket` |
| **Spacing** | `--space-1`…`--space-8` (4 → 64px, 4px base) |
| **Radii** | `--r-0`…`--r-4` (0 → 10px) |
| **Elevation** | `--shadow-0`…`--shadow-2` `--shadow-inset` |
| **Motion** | `--ease-quiet` `--ease-out` `--t-fast` `--t-base` `--t-slow` |
| **Layout** | `--content-max` `--strip-w` `--header-h` |

### Colour story

| Token | Hex | Role |
|---|---|---|
| `--canvas-deep` | `#06130C` | page base — near-black green |
| `--panel` | `#0D2A1B` | British racing green — main card surface |
| `--panel-raised` | `#123524` | gently lifted surface |
| `--border-strong` | `#2C5440` | hover / active dividers |
| `--fg-body` | `#CCC8B0` | body text — soft parchment |
| `--fg-strong` | `#F0EAD7` | headings / strong text — aged ivory |
| `--paper` | `#EFE8D0` | aged-ivory fills (e.g. the `paper-btn`) |

## Components

Defined in `css/components.css`:

- **Structure** — `header.site` (+ `.left` `.right` `.logo` `.lockup` `.tagline`),
  `.navbox` (+ `.navitem` `.navsep` `.caret`), `.topcrumb`, `.stage` + `.rail` + `.column`,
  `.hero`, `section.panel` (+ `header` `h2` `.id` `.body`), `footer.site` (+ `.mono`
  `.foot-right` `.foot-meta`)
- **Elements** — `.bracket` (+ `.primary` `.ghost` `.paper-btn`), `.tag` (+ `.brand` `.warn`),
  `.tag-row`, `.crumbline`, `.field`, `.composer`, `.callout`
- **Data display** — `.bars` (+ `.bar-row` `.bar-label` `.track` `.bar` `.bar.lead` `.bar-val`),
  `.statbig`, `.dtable` (+ `.dtable-row` `.dtable-cell`)
- **Style-guide helpers** — `.palette` / `.swatch`, `.type-row` / `.type-tag` / `.specimen-*`,
  `.comp-grid` / `.comp`, `.row-list` / `.row-item`, `.space-list` / `.space-row` / `.scalebar`,
  `.icon-grid` / `.icon-cell`

## The mark

`assets/star.svg` is the Shake mark — an oval ring around an 8-point starburst. It uses
`fill="currentColor"`, so **inline the SVG** and set `color` (or a token) to theme it. The
header logo and hero mark in the demos do exactly this; in the racing-green theme the mark
sits at `--logo` (aged ivory).

## Fonts

The system is set in **Cormorant Garamond** (serif italic — display and headings) and
**JetBrains Mono** (everything else). `tokens.css` pulls both from Google Fonts via `@import`.
The `--font-serif` / `--font-mono` stacks fall back to Georgia and `ui-monospace` if the web
fonts are blocked. To self-host, drop the `@import` and serve the faces yourself.

## Theming

The architecture is built to be re-skinned: every component reads through the tokens, so a
new theme means overriding only the **raw colour scale** in `tokens.css` (or in a `:root`
block that loads after it). The racing-green palette here started life as a "Shake-blue"
navy variant and an Onda "Poker Green" study — same components, different `:root`.

---

*Maintained by Shake. Built on the film-strip / monospace direction; racing-green colour
story locked 2026-05-14.*
