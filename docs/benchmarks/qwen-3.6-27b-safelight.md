# Benchmark — Qwen 3.6 27B Safelight Design System

Agent benchmark for **creative design-system generation** on Apple Silicon via oMLX.

## Run summary

| Field | Value |
|---|---|
| **Task** | `design-system-gen` — invent and build an original HTML design system from scratch |
| **Model** | `Qwen3.6-27B-MLX-8bit` (dense 27B, all params active) |
| **Harness** | Pi / pilocal → oMLX |
| **Thinking** | high |
| **Date** | 2026-06-16 |
| **Outcome** | **success** |
| **Artifact** | [`systems/safelight/`](../../systems/safelight/) · [showcase](../../showcase/safelight.html) |
| **Obsidian** | [[2026-06-16-qwen-safelight-design-system]] |

> **Update 2026-06-16:** the raw output was audited + hardened (`impeccable`) and promoted to a
> canonical system at `systems/safelight/` (added to the main showcase grid, `README.md`, and
> `PROMPT.md`). The "What to watch" notes below describe Qwen's *original* output; most were
> addressed in promotion (self-hosted fonts, a11y, removed numbered eyebrows). The standalone
> `showcase/safelight/` directory was replaced by `showcase/safelight.html`.

## Context

In the same Pi session, Qwen first built seven showcase wrapper pages for the canonical systems, then — on a follow-up prompt to "generate an example webpage in a completely original theme" — produced **Safelight** without referencing any existing system CSS.

Concept: analog darkroom meets CRT instrument console. Amber safelight glow, cyan crosshair, scan lines, halftone grain, vignette, phosphor flicker.

## Model variants (when to use which)

| Variant | Active params | Typical use in your stack | Safelight / related |
|---|---|---|---|
| `Qwen3.6-27B-MLX-8bit` | 27B dense | Bounded creative tasks, high-think planning | **Safelight** (success), OpenCode v2 plan (success, no HTML) |
| `Qwen3.6-27B-UD-MLX-4bit` | 27B dense | Faster dense runs | X bearer token storage (partial) |
| `Qwen3.6-35B-A3B-MLX-4bit` | ~3B MoE active | Default pilocal model; speed | OpenCode low-think HTML (shipped), Meta ads failures |
| `Qwen3.6-35B-A3B-MLX-8bit` | ~3B MoE active | Hermes local runs | Pi skills namespace confusion |

Dense 27B trades speed for reasoning density. MoE 35B is the daily driver but weaker on original visual design and multi-step agent reliability.

## What worked

- **Original aesthetic** — not a reskin of Racing-Green or Neo-Tactile; distinct palette, effects, and metaphor
- **Layered atmosphere** — scan lines, grain, vignette, glow as separate composable layers
- **Complete deliverable** — `safelight.css` + `safelight.js` + kitchen-sink `index.html`, opened in browser
- **Bounded scope** — single-page system with no repo integration required; task matched model strength

## What to watch

- **Fonts:** JetBrains Mono + Fraunces via Google Fonts — not Adobe kit, not Freight/Plex contract
- **Radius:** instrument dials and some controls use border-radius (canonical systems are zero-radius)
- **Non-canonical:** not in `PROMPT.md` or `systems/` — agents should not default to Safelight for Onda artifacts
- **Promotion:** stays in `showcase/` until manually reviewed for canonical adoption

## Related benchmarks (Obsidian)

| Case | Model | Outcome |
|---|---|---|
| [[2026-06-08-opencode-explainer-think-levels]] | 35B MoE (low) / 27B dense (high) | Mixed — low think shipped HTML, high think wrote better plan |
| [[2026-06-16-x-bearer-token-pi]] | 27B UD 4bit | Partial — slow, unexpected bun install |
| [[2026-06-16-meta-ads-cli-troubleshoot]] | 35B MoE 4bit | Fail — generic troubleshooting page |
| [[2026-06-16-hermes-pi-skills-confusion]] | 35B MoE 8bit (Hermes) | Fail — wrong skill namespace |

Hub: [[Local AI Bottlenecks MOC]]
