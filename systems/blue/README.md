# Blue — "Midnight Paper Workspace"

*Midnight blue · drifting leaf shadows · serif-italic titles · bracketed mono chrome.*

A reusable design system for agent companion mini-apps: a sheet of paper inside a dim garden.
Dark default (midnight blue, never black), light twin (moonstone + parchment), procedural grain,
multiplied shadow video, feed-hole paper card. Zero build step: one CSS file, one ES module.

## Quick start

```html
<link rel="stylesheet" href="css/blue.css" />
<!-- atmosphere layers + shell markup — see Shell contract below -->
<script type="module" src="scripts/blue.js"></script>
```

Add the theme-flash inline script in `<head>` before paint (see `index.html`).

Published pages pin both URLs to the same commit SHA on jsDelivr:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ShakeIsLucky/shake-design-system@<SHA>/systems/blue/css/blue.css" />
<script type="module" src="https://cdn.jsdelivr.net/gh/ShakeIsLucky/shake-design-system@<SHA>/systems/blue/scripts/blue.js"></script>
```

## Palette discipline

**Midnight is blue, never black.** Light mode stays tactile parchment, not white.

| Token | Dark | Light |
|---|---|---|
| `--bg` | `#161d27` midnight | `#ebe7e4` moonstone |
| `--surface` | `#252f3d` evening-blue | `#dacbc2` parchment |
| `--text` | `#f0f2f3` cool-white | `#13110f` warm-black |
| `--text-muted` | `#9fa4ab` | `#5c5650` |
| `--primary` | moonstone on midnight | evening-blue on moonstone |
| `--interactive` | cool-muted | driftwood |

Status: `--status-info-*` (tidal-blue), `--status-error-*` (terracotta), `--status-success-text` (sage).

## Typography

| Voice | Token / class | Role |
|---|---|---|
| Serif | `--font-serif` · `.page-title` `.content-section__heading` `.list-row-title` | Content and titles — **italic** for headings |
| Mono | `--font-mono` · `.bracket-button` `.crumb` `.chrome-label` `.data-table` | Chrome, labels, data — uppercase + tracking |

PlantinNow (variable upright + italic) is self-hosted in `fonts/`. DepartureMono is self-hosted (SIL-OFL).

**Two-voice rule:** serif italic carries content; bracketed mono carries chrome. Sans is fallback only.

## Atmosphere contract

A Blue surface without the shadow layer is not Blue. Layer in this order:

```html
<div class="noise-overlay" aria-hidden="true"></div>
<video class="leaf-shadows" muted autoplay loop playsinline disablepictureinpicture aria-hidden="true" tabindex="-1">
  <source src="assets/video/shadows-loop.webm" type="video/webm" />
  <source src="assets/video/shadows-loop.mp4" type="video/mp4" />
</video>
```

Reference loops ship in `assets/video/`. Production pages may substitute their own video but must keep `.leaf-shadows` markup and `mix-blend-mode: multiply`.

| Control | Behavior |
|---|---|
| `data-theme="dark\|light"` | Set by `blue.js` from auto / night / day mode |
| `data-fx="on\|off"` | Toggles shadow video playback |
| `?theme=auto\|night\|day` | URL override for theme |
| `?fx=on\|off` | URL override for shadows |
| `prefers-reduced-motion` | Hides video, disables CSS animations |

## Shell DOM tree

```
.app-shell
├── .noise-overlay
├── .leaf-shadows (video)
├── .logo
├── .top-bar
├── main.app-content#app-content
│   └── article.paper-card.paper-page
│       ├── header.paper-page__header
│       └── .paper-page__content
└── footer.bottom-controls
    ├── #btn-fx
    └── #btn-theme
```

Optional: `#btn-expand` toggles `.app-content.is-expanded` for wide layouts.

## Components

| Component | Class | Notes |
|---|---|---|
| Bracket button | `.bracket-button` | Literal `[ label ]` — mono uppercase |
| Bare bracket | `.bracket-button--bare` | In-chrome actions (expand, inline) |
| Segmented | `.segmented` / `.segmented__item` | Window pickers; `aria-pressed` |
| Content section | `.content-section` | Dashed dividers between blocks |
| List row | `.list-row` / `.list-row--hoverable` | Italic title + mono action |
| Badge | `.badge` / `.badge--success` etc. | Small status chips |
| Status note | `.status-note` | Info / error callouts |
| Data table | `.data-table` | Tabular nums, mono |
| Chrome button | `.chrome-button` | Bottom-bar FX / theme toggles |

## Do's and don'ts

### Do
- Layer atmosphere (grain + shadows) before chrome
- Use midnight *blue* (`#161d27`), never neutral black
- Set titles in PlantinNow italic; controls in bracketed DepartureMono
- Keep motion quiet: 150–400ms fades, organic video drift
- Honor `prefers-reduced-motion`

### Don't
- Use bounce, glassmorphism, gradient text, or rounded-everything
- Ship flat SaaS card grids or heavy chrome
- Use sans as identity — it's fallback plumbing only
- Ship `@main` in published pages — pin a commit SHA

## File map

```
systems/blue/
├── index.html          kitchen-sink specimen
├── README.md           this file
├── css/
│   ├── blue.css        THE entry (link this)
│   ├── tokens.css
│   ├── shell.css
│   └── components.css
├── scripts/
│   └── blue.js         theme + FX + noise rig
├── fonts/
│   ├── PlantinNowVariable-*.woff2
│   ├── DepartureMono-Regular.woff2
│   └── DepartureMono-LICENSE.txt
└── assets/video/
    ├── shadows-loop.webm
    └── shadows-loop.mp4
```

## License

Code: MIT. DepartureMono: SIL-OFL (see `fonts/DepartureMono-LICENSE.txt`). PlantinNow is vendored from the Lefos/Gardens reference extraction; Georgia serves as the free fallback — confirm licensing for production use.

Extended reverse-engineering docs live in the sibling [`design-blue`](https://github.com/ShakeIsLucky/design-blue) repo.
