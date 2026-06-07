# Guide — Concept explainer (interactive)

Reference (form, not colours): Thariq `15-research-concept-explainer.html`.
Use to teach **one idea** through a live, manipulable demo — the reader changes a
slider/button and watches the model respond. Examples: consistent hashing, a
rate limiter, a diffusion step, a scoring blend.

## Layout — two-column with sticky glossary

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>…</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ShakeIsLucky/shake-design-system@main/systems/racing-green/css/shake.css">
</head>
<body>
  <div class="frame">
    <div class="explainer-grid">         <!-- main + aside -->
      <main>
        <div class="eyebrow">Research &amp; learning · concept explainer</div>
        <h1>Consistent hashing, in one ring</h1>
        <p class="lede">One-paragraph stakes: what problem, why the naive way fails,
          what this buys you. Inline <code>code</code> and a <span class="term"
          data-term="ring">defined term</span> that links to the glossary.</p>

        <h2>The trick</h2>
        <p>Prose with <span class="term" data-term="arc">terms</span>.</p>

        <!-- the live demo -->
        <div class="demo">
          <div class="demo-grid">
            <svg class="ring" id="ring" viewBox="0 0 260 260"></svg>
            <div class="controls">
              <div class="row"><label>nodes</label>
                <input id="n" type="range" min="2" max="8" value="4"><span class="val" id="nv">4</span></div>
              <div><button id="add">add</button><button id="reset">reset</button></div>
              <div class="readout" id="out">…</div>
            </div>
          </div>
        </div>
        <p class="muted" style="font-size:13px">One line telling the reader what to look at.</p>

        <h2>Versus the naive way</h2>
        <table> … compare table … </table>

        <h2>Where you'll meet it</h2>
        <p>…</p>
      </main>

      <aside class="glossary">
        <div class="label">Glossary</div>
        <dl id="gloss">
          <dt data-g="ring">Ring</dt><dd>…</dd>
          <dt data-g="arc">Arc</dt><dd>…</dd>
        </dl>
      </aside>
    </div>
  </div>
  <script> /* render demo + hover-link terms ↔ glossary */ </script>
</body>
</html>
```

Add these small layout helpers inline (they are explainer-specific, not core DS):
```css
.explainer-grid{display:grid;grid-template-columns:minmax(0,1fr) 240px;gap:48px}
@media(max-width:960px){.explainer-grid{grid-template-columns:1fr}.glossary{order:2;position:static}}
.demo{border:1px solid var(--line);background:var(--surface);padding:24px;margin:12px 0}
.demo-grid{display:grid;grid-template-columns:320px 1fr;gap:28px;align-items:center}
@media(max-width:760px){.demo-grid{grid-template-columns:1fr}}
.term{border-bottom:1.5px dotted var(--accent);cursor:help;color:var(--ink)}
.controls input[type=range]{accent-color:var(--brass)}
.controls button{font-family:var(--font-mono);font-size:11px;border:1px solid var(--line-strong);
  background:var(--surface-inset);color:var(--ink);padding:6px 10px;cursor:pointer}
.glossary{position:sticky;top:24px;align-self:start;border:1px solid var(--line);
  background:var(--surface);padding:18px}
.glossary .label{font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;
  text-transform:uppercase;color:var(--ink-mute);margin-bottom:12px}
.glossary dt{font-family:var(--font-display);font-size:15px;color:var(--ink);margin-top:0}
.glossary dd{font-size:12.5px;line-height:1.5;color:var(--ink-soft);margin:2px 0 14px}
.glossary dt.hl,.glossary dt.hl+dd{background:color-mix(in oklab,var(--accent) 12%,transparent)}
```

## The interaction (mandatory)

A concept explainer **must be interactive** — that's the whole point. The demo SVG is
rendered by a JS function from state; controls mutate state and re-render. Keep any
hashing/seed deterministic so the demo is stable on reload. Wire `.term` ↔ glossary
`dt` highlight on `mouseenter`/`mouseleave`.

See [`svg.md`](./svg.md) for how to build the SVG itself on-brand.

## Rules (do not break)

- Two columns: `main` + sticky `.glossary` `<dl>`; collapses to one column under 960px.
- Lead paragraph states the stakes before any mechanism.
- Defined terms use `.term[data-term]` and link to `dt[data-g]` in the glossary.
- The demo SVG is hand-coded and reactive — never static, never a placeholder.
- Headers = `--font-display`, terms/labels = `--font-mono`, body = `--font-serif`.
- Slider/button accents use `--brass`; never invent a colour.
