# Shake DS — Document-Type Guides

These guides tell any agent **exactly how to build each kind of HTML document** in
the Shake design system. They are the single source of truth for layout, structure,
and the rules an agent must not break.

Every guide assumes the brand is already owned by the design system:

- **Always** link the stylesheet — never inline a competing palette or font:
  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ShakeIsLucky/shake-design-system@main/systems/racing-green/css/shake.css" />
  ```
- **Colours** come only from the semantic tokens in `css/tokens.css`
  (`--bg --surface --ink --ink-soft --ink-mute --accent --cream --paper --brass --sage --terracotta --tidal-blue --line …`).
  Never invent a hex. `--accent` is **cream** (`#F3E2B4`); default hangtags use **parchment** (`--paper` / `#EFE8D0`).
- **Type:** headers/display = `var(--font-display)`; body = `var(--font-serif)`;
  labels/data/kickers/code = `var(--font-mono)`. No other families.
- **Title emphasis** = hangtag kicker (`.hangtag.accent.head-kicker` above `h1`/`h2`), **not** coloured `<em>` in headlines.

When the OS / page is in light mode the same tokens flip automatically — build once,
both modes work.

## The guides

| # | Doc type | When to use | Guide |
|---|----------|-------------|-------|
| 01 | **Slide deck** | Pitch / performance review / flagship presentation (full-bleed, snap-scroll) | [`deck.md`](./deck.md) |
| 02 | **Concept explainer** | Teach one idea with an *interactive* SVG demo + glossary | [`concept-explainer.md`](./concept-explainer.md) |
| 03 | **Feature explainer** | Document a shipped feature: request path, config, gotchas, FAQ | [`feature-explainer.md`](./feature-explainer.md) |
| 04 | **Implementation plan** | Hand a builder a skimmable plan: milestones, data flow, code, risks | [`implementation-plan.md`](./implementation-plan.md) |
| 05 | **Status / analytics report** | Recurring digest: summary band, highlights, shipped table, charts | [`status-report.md`](./status-report.md) |
| — | **SVG inside any doc** | How to hand-code on-brand diagrams/illustrations anywhere | [`svg.md`](./svg.md) |
| — | **Unlisted page hosting** | Share self-contained HTML with coworkers via obscure Vercel URLs | [`shake-pages-hosting.md`](./shake-pages-hosting.md) |

## How an agent should use these

1. Pick the doc type from the table above.
2. Read that one guide **and** [`svg.md`](./svg.md) if the doc needs a diagram.
3. Clone the skeleton in [`../templates/`](../templates) when one exists; fill content only.
4. Obey the "Rules (do not break)" block at the bottom of each guide.
5. **Publish** the finished HTML via [`shake-pages-hosting.md`](./shake-pages-hosting.md) — drop in
   the local `shake-pages` repo, push to `main`, return the live URL (unless the user says not to deploy).

The condensed version of all of this, suitable to paste into an agent prompt, lives in
[`../PROMPT.md`](../PROMPT.md).
