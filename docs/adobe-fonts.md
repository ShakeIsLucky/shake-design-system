# Adobe Fonts — kit `lao8mse` (wired & live)

Kit `lao8mse` is published and the systems are **wired to it**. Each system's `tokens.css` lists the
exact Adobe web-name **first** (with the `-1` suffix Adobe assigns) and keeps the old free font as a
fallback, so on `file://` or if a face is missing it degrades gracefully.

## Live mapping

| System | Token | Adobe web-name (primary) | Free fallback |
|---|---|---|---|
| **Racing-Green** | display / body | `freight-display-pro-1` / `freight-text-pro-1` | EB Garamond · IBM Plex Mono |
| **Neo-Tactile** | `--font-display` | `quiverleaf-cf-1` (Quiverleaf CF) | Fraunces |
| | `--font-sans` | `halyard-text-1` (Halyard) | Space Grotesk |
| **Aperture** | `--font-display` | `lust-display-1` (Lust Display) | Instrument Serif |
| | `--font-ui` | `forma-djr-text-1` (Forma DJR) | Geist |
| **Calm-Ink** | `--font-read` | `berthold-baskerville-pro-1` → `baskerville-bt-1` (Baskerville) | Literata |
| **Foldwell** | `--font-display` | `glowworm-mn-1` (Glowworm MN — playful) | Fraunces |
| | `--font-ui` | `omnes-variable-1` (Omnes) | Baloo 2 |

**Recoleta** wasn't on Adobe → replaced by **Quiverleaf CF**. **In the kit but unassigned (ready
alternates):** `quincy-cf-1` (Quincy CF), `arno-pro-1` (Arno Pro, + display/subhead/caption/small-text
opticals). To use one, set it as the first entry in a system's `--font-*` token.

## Editing the kit later
1. [fonts.adobe.com](https://fonts.adobe.com) → Web Projects → kit **`lao8mse`** → add/remove families → **Publish**.
2. Bump the cache-buster (`lao8mse.css?v=8` → `?v=9`) on each entry stylesheet that should refetch:
   `systems/*/css/{shake-v2,spatial-ar,calm-eink,dimensional-paper}.css` and `racing-green/css/base.css`.
3. The Adobe CSS web-name is shown under each family — it usually ends in `-1`. If it differs, update
   the first entry of that system's `--font-*` token to match exactly.

Notes: Adobe fonts need **http(s)** (won't load on `file://` — fallbacks render there). Optical
families (Arno, Lust, Halyard, Forma DJR, Freight) expose several `-1` faces; pick the optical that
matches the role (display vs text).
