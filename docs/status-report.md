# Guide — Status / analytics report

Reference (form, not colours): Thariq `11-status-report.html`.
Use for recurring digests: weekly engineering status, campaign performance, analytics
roll-ups. Auto-generated feel, scannable, numbers up top.

## Layout — narrow column, banded sections

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>… — Status — Week 11</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ShakeIsLucky/shake-design-system@main/systems/racing-green/css/shake.css">
</head>
<body>
  <div class="frame report">
    <header class="hero">
      <div class="header-top">
        <h1>Engineering Status — Week 11</h1>
        <span class="hangtag ghost">auto-generated</span>
      </div>
      <div class="meta-row"><span>Mar 10 – Mar 16, 2025</span><span class="sep">·</span>
        <span class="mono">acme/app @ main</span></div>
    </header>

    <!-- summary band: stat cards with deltas -->
    <div class="summary-band">
      <div class="stat-card"><div class="stat-num">14</div><div class="stat-label">PRs merged</div>
        <div class="stat-delta up">+3 vs wk10</div></div>
      <div class="stat-card"><div class="stat-num">6</div><div class="stat-label">Deploys</div>
        <div class="stat-delta flat">±0</div></div>
      <div class="stat-card warn"><div class="stat-num">1</div><div class="stat-label">Incidents</div>
        <div class="stat-delta">SEV-2 · 47m</div></div>
    </div>

    <section class="doc-section">
      <h2>Highlights</h2>
      <ul class="dash-list sm">
        <li><b>Bulk task editing shipped to 100%.</b> Ramped with no error-rate regression.</li>
        <li><b>Sync API p95 down 38%.</b> 410ms → 255ms on the staging load test.</li>
      </ul>
    </section>

    <section class="doc-section">
      <h2>Trend</h2>
      <div class="figure"> … inline SVG line/bar of the metric over weeks (see svg.md) … </div>
    </section>

    <section class="doc-section">
      <h2>Shipped</h2>
      <table class="lead-tbl">
        <thead><tr><th>PR</th><th>Title</th><th>Author</th><th>Risk</th></tr></thead>
        <tbody>
          <tr><td class="mono"><a href="#">#4871</a></td>
              <td>Bulk edit toolbar</td><td class="muted">Mira Okafor</td>
              <td><span class="hangtag warning mini">Med</span></td></tr>
          <tr><td class="mono"><a href="#">#4879</a></td>
              <td>Idempotent reminder scheduler</td><td class="muted">Priya Anand</td>
              <td><span class="hangtag error mini">High</span></td></tr>
        </tbody>
      </table>
    </section>

    <section class="doc-section">
      <h2>Next week</h2>
      <ul class="dash-list sm"><li>Postmortem actions from Wed SEV-2.</li></ul>
    </section>
  </div>
</body>
</html>
```

Report-specific helpers (inline):
```css
.frame.report{max-width:860px}
.header-top{display:flex;align-items:baseline;justify-content:space-between;
  flex-wrap:wrap;gap:12px;margin-bottom:8px}
.summary-band{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;
  background:var(--line);border:1px solid var(--line);margin:24px 0 48px}
@media(max-width:720px){.summary-band{grid-template-columns:1fr 1fr}}
.stat-card{background:var(--surface);padding:16px 18px}
.stat-card.warn{border-top:2px solid var(--brass)}
.stat-num{font-family:var(--font-mono);font-size:30px;color:var(--ink);letter-spacing:-.02em}
.stat-label{font-family:var(--font-mono);font-size:10px;letter-spacing:.08em;
  text-transform:uppercase;color:var(--ink-mute);margin-top:6px}
.stat-delta{font-family:var(--font-mono);font-size:11px;margin-top:8px;color:var(--ink-mute)}
.stat-delta.up{color:var(--sage)} .stat-delta.down{color:var(--terracotta)} .stat-delta.flat{color:var(--ink-mute)}
.doc-section{padding:32px 0;border-top:1px solid var(--line)}
```

## What makes a report read as "flagship" not "lazy"

- **Numbers first.** A `.summary-band` of stat cards with deltas (up=sage, down=terra,
  flat=mute) sits above the fold. The reader gets the state in 3 seconds.
- **A real trend chart.** At least one hand-coded inline SVG (line/bar over time) —
  see [`svg.md`](./svg.md). Not a placeholder, not a screenshot.
- **A scannable table.** Use `.lead-tbl`; risk/status as hangtag chips
  (`error`/`warning`/`success`).
- **Tight highlights.** `.dash-list.sm` with a bold lead clause per bullet.

## Rules (do not break)

- Narrow column (`.frame.report`, ~860px). Auto-generated hangtag in the header.
- Summary band of stat cards with coloured deltas up top.
- ≥1 hand-coded inline SVG trend chart; tables use `.lead-tbl` + status hangtags.
- Delta colours: up=`--sage`, down=`--terracotta`, flat=`--ink-mute`. No new hexes.
- Headers = `--font-display`, stat numbers/labels = `--font-mono`, body = `--font-serif`.
