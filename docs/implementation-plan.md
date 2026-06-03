# Guide — Implementation plan

Reference (form, not colours): Thariq `16-implementation-plan.html`.
Use to hand a builder a plan they can execute as-is: prompt echo, summary band,
milestones, data flow, the actual code to write, a risk table, open questions.
Must be **skimmable on a phone**.

## Layout — single column, dense sections

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Implementation plan — …</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ShakeIsLucky/shake-design-system@main/css/shake.css">
</head>
<body>
  <div class="frame">
    <header class="hero">
      <div class="eyebrow">Implementation plan · Acme web client</div>
      <h1>Comment threads on task cards</h1>
      <div class="callout"><div class="co-label">Prompt</div>
        <p>Echo the request verbatim so the plan is self-describing.</p></div>
    </header>

    <!-- summary band: the at-a-glance numbers -->
    <div class="summary-band">
      <div class="stat-card"><div class="stat-label">Effort</div><div class="stat-num accent">~2 weeks</div></div>
      <div class="stat-card"><div class="stat-label">Surfaces</div><div class="stat-num">3 packages</div></div>
      <div class="stat-card"><div class="stat-label">New tables</div><div class="stat-num">2</div></div>
      <div class="stat-card"><div class="stat-label">Flag</div><div class="stat-num">task_comments_v1</div></div>
    </div>

    <section class="doc-section">
      <div class="sec-head"><span class="num">01</span><h2>Milestones</h2></div>
      <p class="muted">Ship in slices, each independently reviewable behind the flag.</p>
      <ol class="milestones">
        <li class="milestone"><span class="dot done"></span>
          <div><div class="when">Week 1 · Mon–Tue</div><b>Schema + migration</b><p>…</p></div></li>
        <li class="milestone"><span class="dot"></span>
          <div><div class="when">Week 1 · Wed–Fri</div><b>API endpoints</b><p>…</p></div></li>
      </ol>
    </section>

    <section class="doc-section">
      <div class="sec-head"><span class="num">02</span><h2>Data flow</h2></div>
      <div class="figure"> … inline SVG: client → API → store (see svg.md) … </div>
    </section>

    <section class="doc-section">
      <div class="sec-head"><span class="num">03</span><h2>Key code</h2></div>
      <div class="code-grid">
        <div><div class="file-label">migrations/0007_comments.sql</div>
          <pre><code>…</code></pre></div>
        <div><div class="file-label">api/comments.ts</div>
          <pre><code>…</code></pre></div>
      </div>
    </section>

    <section class="doc-section">
      <div class="sec-head"><span class="num">04</span><h2>Risks</h2></div>
      <table class="lead-tbl">
        <thead><tr><th>Risk</th><th>Severity</th><th>Mitigation</th></tr></thead>
        <tbody>
          <tr><td>N+1 on thread load</td>
              <td><span class="hangtag error mini">High</span></td>
              <td>Batch-load with a single windowed query.</td></tr>
          <tr><td>Flag leak in tests</td>
              <td><span class="hangtag warning mini">Med</span></td>
              <td>Default flag off in test harness.</td></tr>
        </tbody>
      </table>
    </section>

    <section class="doc-section">
      <div class="sec-head"><span class="num">05</span><h2>Open questions</h2></div>
      <div class="q"><div class="qt">Soft-delete or hard-delete comments?</div>
        <div class="qd">Affects the schema and the audit trail.</div>
        <div class="owner">owner · @shake</div></div>
    </section>
  </div>
</body>
</html>
```

Plan-specific helpers (inline):
```css
.summary-band{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--line);
  border:1px solid var(--line);margin:24px 0 48px}
@media(max-width:720px){.summary-band{grid-template-columns:1fr 1fr}}
.stat-card{background:var(--surface);padding:16px 18px}
.stat-label{font-family:var(--font-mono);font-size:10px;letter-spacing:.08em;
  text-transform:uppercase;color:var(--ink-mute);margin-bottom:8px}
.stat-num{font-family:var(--font-mono);font-size:22px;color:var(--ink)}
.stat-num.accent{color:var(--accent)}
.sec-head{display:flex;align-items:baseline;gap:14px;margin-bottom:8px}
.sec-head .num{font-family:var(--font-mono);font-size:12px;color:var(--accent)}
.milestones{list-style:none;padding-left:0}
.milestone{display:flex;gap:14px;margin-bottom:18px}
.milestone .dot{width:10px;height:10px;border:1px solid var(--line-strong);margin-top:6px;flex:none}
.milestone .dot.done{background:var(--sage);border-color:var(--sage)}
.when{font-family:var(--font-mono);font-size:11px;color:var(--ink-mute);margin-bottom:4px}
.code-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px}
@media(max-width:980px){.code-grid{grid-template-columns:1fr}}
.file-label{font-family:var(--font-mono);font-size:12px;color:var(--ink-mute);margin-bottom:10px}
.q{background:var(--surface);border:1px solid var(--line);border-left:4px solid var(--accent);padding:16px 20px;margin-bottom:14px}
.q .qt{font-family:var(--font-display);font-size:16px;color:var(--ink);margin-bottom:4px}
.q .qd{font-size:13.5px;color:var(--ink-mute)}
.q .owner{font-family:var(--font-mono);font-size:11px;color:var(--ink-mute);margin-top:8px}
```

## Severity colour mapping (reuse status hangtags)

- High → `.hangtag.error` (terracotta)
- Med → `.hangtag.warning` (brass)
- Low → `.hangtag.success` (sage)

## Rules (do not break)

- Echo the originating prompt in a `.callout` so the plan stands alone.
- Open with a 4-cell `.summary-band` of the at-a-glance numbers.
- Numbered `.sec-head` sections: milestones → data flow → code → risks → open Qs.
- Data-flow diagram is hand-coded inline SVG — see [`svg.md`](./svg.md).
- Risk table reuses `.lead-tbl` + status hangtags; never new colours.
- Skimmable on phone: every grid collapses to one column (helpers above do this).
- Headers = `--font-display`, code/labels = `--font-mono`, body = `--font-serif`.
