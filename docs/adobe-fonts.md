# Adobe Fonts — kit `lao8mse` additions (de-boilerplate the systems)

The core **Racing-Green** system uses **Freight Display/Text** (already in the kit) + IBM Plex Mono.
The other four systems ship free Google fonts that read a bit boilerplate. Below are the **ideal
Adobe Fonts upgrades** — every family is confirmed in the Adobe Fonts library and included with a
Creative Cloud subscription.

The CSS is **already wired**: each system's `tokens.css` lists the Adobe family **first** with the
old Google font as fallback, and each entry stylesheet `@import`s the kit. So the moment you add a
family to kit `lao8mse` and **Publish**, it activates automatically — until then the free fallback
renders, so nothing breaks (including `file://`).

## What to add, per system

| System | Role | Add to kit | Adobe web name (CSS) | Falls back to |
|---|---|---|---|---|
| **Neo-Tactile** | display | **Recoleta** — warm 70s rounded serif, perfect for tactile/soft | `recoleta` | Fraunces |
| | body/labels | **Halyard Display** — warm humanist geometric sans | `halyard-display` | Space Grotesk |
| **Aperture** | UI/text | **Forma DJR Text** — optical-size grotesque, true "spatial/next-OS" | `forma-djr-text` | Geist |
| | display serif | **Lust** — high-contrast glassy didone accent | `lust` | Instrument Serif |
| **Calm-Ink** | reading | **Arno Pro** — Adobe Originals, optical, built for long reading (e-ink calm) | `arno-pro` | Literata |
| **Foldwell** | display | **Quincy CF** — warm geometric papercraft serif | `quincy-cf` | Fraunces |
| | body | **Omnes** — rounded friendly sans, tactile warmth | `omnes` | Baloo 2 |
| **Racing-Green** | — | *(Freight already in kit — flagship, no change)* | `freight-display-pro` | EB Garamond |

Best-case picks if you want one alternate: Aperture display serif → **Kepler** (`kepler`) instead of
Lust for a quieter editorial feel; Calm-Ink reading → **Brioso Pro** (`brioso-pro`) instead of Arno
for a touch more humanist warmth; Neo-Tactile body → **Brandon Grotesque** (`brandon-grotesque`)
instead of Halyard for a rounder geometric.

## How to add them (one-time, ~3 min)
1. Go to [fonts.adobe.com](https://fonts.adobe.com) → **Web Projects** → kit **`lao8mse`**.
2. For each family above, open its Adobe Fonts page and **Add to Web Project → lao8mse**:
   [Recoleta](https://fonts.adobe.com/fonts/recoleta) ·
   [Halyard](https://fonts.adobe.com/fonts/halyard) ·
   [Forma DJR Text](https://fonts.adobe.com/fonts/forma-djr-text) ·
   [Lust](https://fonts.adobe.com/fonts/lust) ·
   [Arno Pro](https://fonts.adobe.com/fonts/arno-pro) ·
   [Quincy CF](https://fonts.adobe.com/fonts/quincy-cf) ·
   [Omnes](https://fonts.adobe.com/fonts/omnes)
3. **Publish** the kit, then bump the cache-buster (`lao8mse.css?v=8`) in each entry stylesheet so
   browsers refetch.
4. Confirm the CSS web-name matches (Adobe shows it under the family — usually the slug above). If a
   name differs, update the first entry in that system's `--font-*` token.

Notes: Adobe fonts need **http(s)** (they won't load on `file://`); on `file://` every system falls
back to its Google/system font. Keep the free fallbacks in the token stacks.
