# Shake System v2 — Neo-Tactile

*Warm paper · embossed/debossed surfaces · one vermilion action color.*

An **alternate skin** for [`shake-design-system`](../shake-design-system). Same packaging, same class names — but rendered in a neo-tactile / neumorphic language: surfaces emboss **out** of the page and **deboss in** when you press them, with a real few pixels of travel. Where v1 is dark racing-green and mono-first, v2 is warm cream paper, **Fraunces** serif display + **Space Grotesk** body, soft contact shadows, and rounded corners.

Because it reuses v1's class names, **any artifact re-skins by swapping one `<link>`** — no markup changes.

Light (paper) by default. A graphite dark theme ships alongside and is re-tuned so the neumorphism still reads. Zero build step — pure CSS plus a few ES modules for interactions, Mermaid, and Chart.js.

## Install

### Vendored
```html
<script src="./shake-system-v2/scripts/theme-init.js"></script>
<link rel="stylesheet" href="./shake-system-v2/css/shake-v2.css" />
```

### Faster fonts (optional, when you can edit `<head>`)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<script src="./shake-system-v2/scripts/theme-init.js"></script>
<link rel="stylesheet" href="./shake-system-v2/css/shake-v2.css" />
```

### Interactions, Mermaid + theme toggle (optional)
```html
<button class="theme-toggle">DARK</button>

<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  import { initShakeMermaid } from './shake-system-v2/scripts/mermaid-theme.js';
  import { initThemeToggle } from './shake-system-v2/scripts/theme-toggle.js';
  import { initReveal }      from './shake-system-v2/scripts/reveal.js';
  import { initInteractions} from './shake-system-v2/scripts/interactions.js';
  initThemeToggle('.theme-toggle');
  initReveal();
  initInteractions();
  initShakeMermaid(mermaid);
</script>
```

Every component reads through semantic CSS variables and theme-aware shadow presets, so paper ↔ graphite toggles without any markup changes.
Put `scripts/theme-init.js` before the stylesheet when using the toggle so saved manual themes apply before first paint.

## See it

Open [`index.html`](./index.html) for the kitchen-sink reference — every component in both themes, plus Mermaid + Chart.js.

## Drop-in alternate

v2 keeps v1's class API. To move a `shake-design-system` artifact into neo-tactile, change only the stylesheet href from `shake-design-system/css/shake.css` to `shake-system-v2/css/shake-v2.css`. Two v1 affectations are intentionally dropped in the re-skin: the `[ … ]` bracket pseudo-elements on buttons/nav, and zero-radius.

## Design philosophy

| Motif | Use | Don't |
|---|---|---|
| Emboss / deboss | Raised plates; press carves them in (2–3px travel) | Don't pair a deboss with a raised gradient |
| Single action color | Vermilion CTAs, `em` accents, eyebrows, icon strokes | Not for body text (fails AA at small sizes) |
| Felt green | Secondary accent — chips, LEDs, check dots | Not for paragraphs |
| Honest materials | Name surfaces like things you can hold | No frosted glass / backdrop blur as decor |
| Rounded corners | `--r-sm/md/lg/xl` (10/18/28/40) | No zero-radius (that's v1) |

## Palette

Warm, closed palette — no pure white, no pure black.

```
Paper        #e9e3d6   page base          Action  #e5462b   vermilion CTA
Paper-2      #e2dacc   deeper             Action-deep #c5371e
Paper-deep   #ddd5c4   sunken well        Felt    #3f6b52   secondary green
Graphite     #23211c   headings           Ochre   #c98a3c   warning
Charcoal     #33302a   body               Tidal   #566b73   info
Taupe        #6a6456   tertiary
Highlight    rgba(255,252,244,.9)   top-left light
Shadow       rgba(120,108,84,.55)   bottom-right contact
```

Dark "graphite" theme re-derives the highlight (a *lifted graphite*, never white) and shadow (near-black, faintly warm) against a warm mid-graphite page, so the emboss/deboss illusion survives the inversion.

## Typography

| Token | Stack |
|---|---|
| `--font-display` | `"Fraunces", Georgia, "Times New Roman", serif` |
| `--font-sans` | `"Space Grotesk", system-ui, -apple-system, sans-serif` |
| `--font-code` | `ui-monospace, SFMono-Regular, Menlo, monospace` |

Display + headings are **Fraunces** (variable optical size, real italics for emphasis). Body, labels, and controls are **Space Grotesk**. Both load free from Google Fonts via `@import` in `shake-v2.css` — nothing vendored.

## File map

```
./
├── README.md                  (this file)
├── index.html                 (kitchen-sink reference)
├── css/
│   ├── shake-v2.css           (single link target — fonts @import + @imports the rest)
│   ├── tokens.css             (palette + semantic aliases + dark graphite + presets + type/space/motion)
│   ├── base.css               (reset, paper texture, prose, layout, .reveal)
│   ├── components.css         (the full component library)
│   └── viz.css                (Mermaid CSS, figure, legend, chart wrapper)
└── scripts/
    ├── theme-toggle.js        (paper <-> graphite, persists to localStorage; light-default)
    ├── reveal.js              (IntersectionObserver scroll reveal)
    ├── interactions.js        (count-up, pad sequencer, device tilt, accordion/tabs/dropdown/modal)
    ├── mermaid-theme.js       (paper + graphite themeVariables, auto re-render)
    └── chart-theme.js         (Chart.js defaults + actionGradient / feltGradient helpers)
```

## Components

Brand: `.knob`, `.wordmark`/`.star` · Layout: `.frame`/`.wrap`, `.column`, `.section` (+`.with-rail`), `.divider`/`.rule` · Chrome: `.topbar`, `.theme-toggle`, `.breadcrumb`, `.pagination`, `.tabs`/`.tab`, `.dropdown`/`.menu` · Labels: `.kicker`, `.eyebrow`, `.hangtag` (+`accent/success/warning/error/info/ghost`), `.tags`, `.badge`, `.chip` · Buttons: `.btn`, `.btn-action`/`.btn.primary`, `.btn-ghost`, `.btn.bare`, `.btn-block`/`-sm`/`-lg` · Forms: `.field`/`.label`/`.help`/`.error`, `input`/`textarea`/`select`, `.toggle`, `.checkbox`/`.radio`, `.range` · Hero: `.hero`, `.lede`, `.meta-row`, `.cta-row` · Device: `.device`, `.pad-grid`/`.pad`, `.leds`/`.led`, `.slider-row`, `.track`/`.thumb` · Marketing: `.cards`/`.card`/`.ic`, `.stats-band`/`.stat`/`.num`, `.price-grid`/`.plan`/`.plan.feat`/`.feat-list` · Content: `.callout`, `table`, `.list-rows`/`.list-row`, `.decision`, `.bars`/`.bar-row`, `pre`/`code`, `.accordion` · Feedback: `.alert`/`.banner`, `.progress`, `.meter`, `[data-tooltip]`, `.spinner`, `.skeleton` · Overlays: `.scrim`, `.modal`/`.dialog` · Media: `.avatar` · Motion: `.reveal` · Footer: `.site-footer`, `.foot-panel`.

## Theming

- **Light (paper) by default.** `:root` is light; `[data-theme="dark"]` opts into graphite.
- **OS respected:** `@media (prefers-color-scheme: dark) :root:not([data-theme])` switches to graphite when there's no manual choice.
- **Manual override** via `<html data-theme="dark">`. `theme-toggle.js` writes this and persists to `localStorage["shake-theme"]`.
- **Shadow presets reference theme-aware `--hl`/`--sh`**, so redefining only the color layer re-skins every emboss/deboss automatically.
- **Mermaid re-renders** on theme change via a `MutationObserver` in `mermaid-theme.js`.

## Mermaid rules

1. Always `theme: 'base'` (only theme where `themeVariables` apply) — `mermaid-theme.js` does this.
2. Never set `color:` in `classDef`; let `viz.css` bind text to `var(--ink)`.
3. Use 8-digit hex alpha for fills.
4. Max ~10–12 nodes per diagram.
5. `<br/>` for multi-line labels; quote labels containing parens/colons/commas.

## License

Design system code: MIT. Fonts (Fraunces, Space Grotesk): SIL Open Font License, free from Google Fonts.

---

*Shake · 2026 · an alternate for [shake-design-system](../shake-design-system)*
