# Racing-Green — Onda Studios

*Mono structure · deep racing-green surfaces · Onda gold accent · zero radius.*

The flagship Onda Studios system for everything the studio ships: research briefs, plan / diff /
recap reviews, digests, decision artifacts, slide decks. Dark by default; a light variant ships for
print / PDF / email. Zero build step — pure CSS plus a couple of ES modules for Mermaid + Chart.js.

Brand-matched to the studio's matte racing-green Ferrari 812 with a single gold stripe: deep green
surfaces, **Onda gold** (`#E8B23A`) accent, the **Onda compass-star** mark, **Freight** serif.

## Use it

```html
<!-- CDN (public) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ShakeIsLucky/shake-design-system@main/systems/racing-green/css/shake.css" />
<!-- or vendored -->
<link rel="stylesheet" href="./systems/racing-green/css/shake.css" />
```

```html
<button class="theme-toggle">LIGHT</button>
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  import { initShakeMermaid } from 'https://cdn.jsdelivr.net/gh/ShakeIsLucky/shake-design-system@main/systems/racing-green/scripts/mermaid-theme.js';
  import { initThemeToggle } from 'https://cdn.jsdelivr.net/gh/ShakeIsLucky/shake-design-system@main/systems/racing-green/scripts/theme-toggle.js';
  initThemeToggle('.theme-toggle');
  initShakeMermaid(mermaid);
</script>
```

Open [`index.html`](./index.html) for the kitchen-sink reference.

## Palette discipline

**Never invent a new hex.** Every token is sourced from the Onda palette.

```
Surfaces      canvas-deep #06130C · panel #0D2A1B (racing green) · panel-raised #123524
Ink           ivory #FAF8F2 · parchment #DFDAC6 · sage-mute #99A08A
Hangtags      paper #EFE8D0 · paper-warm #DACBC2
Lines         line-1 #1C3D2B · line-2 #2C5440
Accent        gold #E8B23A (Onda gold — the 812 stripe) · gold-deep #C5862A
Status        terracotta #844F3B (error) · sage #A3A473 (success) · tidal-blue #4B607C (info) · brass #E1B06E (chart focus)
```

The accent is **Onda gold**; emphasis is **gold colour, never italic**. `--cream` and `--brass`
remain in the palette for chart focus / soft fills.

## Typography

| Token | Role | Stack |
|---|---|---|
| `--font-display` | Display + h1/h2 | Freight Display Pro → EB Garamond / Georgia |
| `--font-serif` | Body / reading | Freight Text Pro → EB Garamond / Georgia |
| `--font-mono` | Labels · data · code | IBM Plex Mono → DepartureMono |

Headings = **Freight Display Pro, upright**. Body = **Freight Text Pro**. Labels/data/code = **IBM
Plex Mono**. Title emphasis = **hangtag kicker** (`.hangtag.accent.head-kicker`), not coloured `<em>`.

- **IBM Plex Mono** — free (SIL-OFL), Google Fonts `@import` in `css/base.css`.
- **Freight** — Adobe Fonts kit `lao8mse` `@import` in `css/base.css`; cannot be self-hosted, needs
  http(s) (no `file://`). Bump `?v=` after editing the kit. Falls back to EB Garamond / Georgia.
- **DepartureMono** — SIL-OFL, vendored in `fonts/` as a mono fallback.

## File map
```
systems/racing-green/
├── index.html            kitchen-sink reference
├── css/  shake.css (entry) · tokens · base · components · deck · viz
├── fonts/ DepartureMono-Regular.woff2 (+ license)
└── scripts/ mermaid-theme · chart-theme · deck-nav · theme-toggle
```

## Brand
Topbar/footer use the **Onda compass-star** (`brand/onda-star.svg`) + **ONDA STUDIOS** wordmark in
Freight. Full mark (star-in-ellipse): `brand/onda-mark.svg`.

## Mermaid rules
1. Always `theme: 'base'` (only theme where `themeVariables` apply — `mermaid-theme.js` does this).
2. Never set `color:` in `classDef`; let `viz.css` bind text to `var(--ink)`.
3. 8-digit hex alpha for fills (`fill:#E8B23A22`).
4. Max ~10–12 nodes; `<br/>` for multi-line labels; quote labels with parens/colons/commas.

## Theming
Dark default. Manual override `<html data-theme="light|dark">`; `theme-toggle.js` persists to
`localStorage["shake-theme"]`. Mermaid re-renders on theme change.

## License
Code: MIT. Fonts: see `fonts/` (DepartureMono SIL-OFL). Freight via Adobe subscription.
