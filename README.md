# Onda Studios — Design Systems

*One repo, five HTML design systems, zero build step.*

The Onda mark is a **compass star inside an ellipse**; the studio palette is **deep racing-green +
gold + black** (the matte 812 with its single gold stripe). Every system reads through semantic CSS
variables and ships a kitchen-sink `index.html`.

## The systems

| System | Aesthetic | Entry stylesheet | Fonts |
|---|---|---|---|
| **[Racing-Green](./systems/racing-green/)** | dark mono · racing-green · Onda gold · zero-radius — the **flagship** | `systems/racing-green/css/shake.css` | Freight + IBM Plex Mono |
| **[Neo-Tactile](./systems/neo-tactile/)** | warm neumorphic · emboss/deboss · rounded | `systems/neo-tactile/css/shake-v2.css` | Recoleta + Halyard* |
| **[Aperture](./systems/aperture/)** | warm translucent glass · spatial depth | `systems/aperture/css/spatial-ar.css` | Forma DJR + Lust* |
| **[Calm-Ink](./systems/calm-ink/)** | calm monochrome e-ink · slow motion | `systems/calm-ink/css/calm-eink.css` | Arno Pro* |
| **[Foldwell](./systems/foldwell/)** | handcrafted die-cut paper · pop-up parallax | `systems/foldwell/css/dimensional-paper.css` | Quincy CF + Omnes* |

\* Adobe Fonts upgrades wired Adobe-first with free fallbacks — see [`docs/adobe-fonts.md`](./docs/adobe-fonts.md) for the kit-add list. Racing-Green & Neo-Tactile share the same class API (drop-in re-skin).

## Quick start

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ShakeIsLucky/shake-design-system@main/systems/racing-green/css/shake.css" />
```

Each system's README has its full palette, type, and component reference. Open any
`systems/*/index.html` to see it live.

## Repo map
```
systems/        the five design systems (each: css/ · scripts/ · index.html · README)
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
Code: MIT. Fonts: free families under their own licenses (SIL-OFL); Freight + the Adobe kit additions
require an Adobe Fonts (Creative Cloud) subscription.

---
*Onda Studios · 2026*
