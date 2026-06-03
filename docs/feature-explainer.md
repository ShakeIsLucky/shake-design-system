# Guide — Feature explainer

Reference (form, not colours): Thariq `14-research-feature-explainer.html`.
Use to document a **shipped feature / capability** for the people who will use it:
what it does, the request/data path, how to configure it, gotchas, FAQ.

## Layout — single reading column, sectioned

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>…</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ShakeIsLucky/shake-design-system@main/css/shake.css">
</head>
<body>
  <div class="frame">
    <header class="hero">
      <div class="eyebrow">Feature · per-route rate limiting</div>
      <h1>Rate limits you can set <em>per route</em></h1>
      <p class="lede">One paragraph: what it is, who it's for, the one number that matters.</p>
    </header>

    <!-- TL;DR card up top — readers skim this first -->
    <div class="callout">
      <div class="co-label">TL;DR</div>
      <p>Add <code>rate_limit: 100/min</code> to any route. Excess gets a 429 with
        a <code>Retry-After</code> header. Limits are per-IP by default.</p>
    </div>

    <section class="doc-section">
      <h3>§ 01 — The request path</h3>
      <h2>How a request flows</h2>
      <div class="figure"> … inline SVG of the path (see svg.md) … </div>
      <ol class="step-list">
        <li><span class="step-n">1</span> Request hits the edge proxy.</li>
        <li><span class="step-n">2</span> Token bucket checked for the route key.</li>
        <li><span class="step-n">3</span> Pass → upstream; fail → 429.</li>
      </ol>
    </section>

    <section class="doc-section">
      <h3>§ 02 — Configuring it</h3>
      <h2>Set a limit on your route</h2>
      <pre><code>routes:
  /api/search:
    rate_limit: 100/min      <span class="cm"># per-IP</span>
    burst: 20</code></pre>
      <p>Prose explaining each knob …</p>
    </section>

    <section class="doc-section">
      <h3>§ 03 — Gotchas</h3>
      <h2>Worth knowing</h2>
      <div class="callout"><div class="co-label">Watch out</div>
        <p>Limits are per-instance unless you enable the shared Redis store.</p></div>
    </section>

    <section class="doc-section">
      <h3>§ 04 — FAQ</h3>
      <h2>FAQ</h2>
      <details class="faq"><summary>Does it count failed requests?</summary>
        <p>Yes — the bucket decrements before the upstream call.</p></details>
    </section>
  </div>
</body>
</html>
```

Explainer-specific helpers (inline):
```css
.doc-section{padding:40px 0;border-top:1px solid var(--line)}
.step-list{list-style:none;padding-left:0;counter-reset:none}
.step-list li{display:flex;gap:14px;align-items:baseline;margin-bottom:14px;
  font-family:var(--font-serif);color:var(--ink-soft)}
.step-n{font-family:var(--font-mono);font-size:12px;color:var(--accent);
  border:1px solid var(--line-strong);min-width:24px;height:24px;display:inline-flex;
  align-items:center;justify-content:center}
.faq{border-top:1px solid var(--line);padding:14px 0}
.faq summary{font-family:var(--font-display);font-size:17px;color:var(--ink);cursor:pointer}
.faq[open] summary{color:var(--accent)}
pre .cm{color:var(--ink-mute)} pre .kw{color:var(--brass)} pre .str{color:var(--sage)}
```

## Section anatomy (repeatable)

Each section is: a mono `<h3>§ NN — kicker` (use the DS section eyebrow style),
a display `<h2>` title, then prose + at most one figure or one code block. Keep one
idea per section. Lead with a **TL;DR `.callout`** so a skimmer gets the gist in 5s.

For the request-path / data-flow figure, hand-code an inline SVG — see [`svg.md`](./svg.md).

## Rules (do not break)

- Single `.frame` reading column. No full-bleed slides.
- TL;DR callout near the top; numbered `§` sections after.
- Code blocks use `<pre><code>` with `.kw/.str/.cm` spans for highlight colours.
- Any path/flow diagram is hand-coded inline SVG, never a placeholder.
- Headers = `--font-display`, kickers/code = `--font-mono`, body = `--font-serif`.
- Emphasis brass, never italic. Zero radius. Palette tokens only.
