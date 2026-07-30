# Onda Studios — Design Systems

*One repo, four HTML design systems, zero build step.*

The Onda mark is a **compass star inside an ellipse**; the studio palette is **deep racing-green +
gold + black** (the matte 812 with its single gold stripe). Every system reads through semantic CSS
variables and ships a kitchen-sink `index.html`.

## The systems

| System | Aesthetic | Entry stylesheet | Fonts |
|---|---|---|---|
| **[Calm-Ink](./systems/calm-ink/)** | calm monochrome e-ink · slow motion | `systems/calm-ink/css/calm-eink.css` + `scripts/theme-init.js` + `scripts/calm-eink.js` | Baskerville* |
| **[Lupine](./systems/lupine/)** | one-ink field station · light default · living backdrop — the **default** | `systems/lupine/css/lupine.css` + `scripts/lupine.js` | Arno Pro* + Courier Prime |
| **[Blue](./systems/blue/)** | midnight paper workspace · leaf shadows · mini-app shell | `systems/blue/css/blue.css` + `scripts/blue.js` | PlantinNow + DepartureMono |
| **[Kiln](./systems/kiln/)** | warm editorial · terracotta on cream · notes in the margin · no shadows | `systems/kiln/css/kiln.css` + `scripts/theme-init.js` + `scripts/kiln.js` | Quincy CF* + Halyard Text* |

\* Adobe Fonts (live in kit `lao8mse`), wired Adobe-first with free fallbacks — see [`docs/adobe-fonts.md`](./docs/adobe-fonts.md). Lupine backdrop scenes are page-level assets, not shipped in the system repo. Blue ships reference shadow video in `assets/video/`.

## Quick start

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ShakeIsLucky/shake-design-system@00e4c66/systems/lupine/css/lupine.css" />
<script type="module" src="https://cdn.jsdelivr.net/gh/ShakeIsLucky/shake-design-system@00e4c66/systems/lupine/scripts/lupine.js"></script>
```

Each system's README has its full palette, type, and component reference. Open any
`systems/*/index.html` to see it live.

## Repo map
```
systems/        the four design systems (each: css/ · scripts/ · index.html · README)
brand/          Onda mark — onda-star.svg, onda-mark.svg (+ usage notes)
docs/           agent authoring guides (deck, explainer, plan, report, svg) + adobe-fonts + hosting
research/       liquid-glass-next exploration: dissection.md, 20 page sketches, gallery, build workflow
PROMPT.md       condensed agent contract (paste into any agent generating Onda HTML)
```

## For agents
Point at one [`docs/`](./docs/README.md) guide + the system's entry stylesheet; never invent parallel
palettes or heading patterns. Publishing built HTML → the private `shake-pages` repo (auto-deploys to
the studio's unlisted host; URL configured privately). See [`docs/shake-pages-hosting.md`](./docs/shake-pages-hosting.md).

## License
Code: MIT. Fonts: free families under their own licenses (SIL-OFL); the Adobe kit additions
(Arno Pro, Baskerville, etc.) require an Adobe Fonts (Creative Cloud) subscription.

---
*Onda Studios · 2026*
