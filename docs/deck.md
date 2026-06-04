# Guide — Slide deck (full-bleed presentation)

Reference: `css/deck.css` (flagship deck HTML archived at
`commerce-brain/_archive/2026-06-type-exploration/onda-top-ads-deck.html`).
Use for pitches, performance reviews, research read-outs — anything meant to be
scrolled / presented one screen at a time.

## Page setup

```html
<!doctype html>
<html lang="en" class="deck">   <!-- class="deck" turns on snap scrolling -->
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>…</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ShakeIsLucky/shake-design-system@main/css/shake.css">
</head>
<body>
  <div id="pbar"></div>
  <!-- slides … -->
  <div id="counter"></div>
  <div class="navhint">↑ ↓ / SPACE · F fullscreen</div>
  <script type="module">
    import { initDeckNav } from 'https://cdn.jsdelivr.net/gh/ShakeIsLucky/shake-design-system@main/scripts/deck-nav.js';
    initDeckNav();
  </script>
</body>
</html>
```

## Slide grammar

Every slide is:
```html
<section class="slide"><div class="slide-inner"> … </div></section>
```
Variants: `.slide.wide` (1180px inner), `.slide.paper` (parchment contrast slide),
`.slide.ad-slide` (media + body two-column), `.slide.title-slide`.

A typical deck runs in this order:

1. **Title** — `.title-slide`: `.ornament` star → `.eyebrow` →
   `<span class="hangtag accent head-kicker">By blended effectiveness</span>` →
   `<h1>Top 10 Ads</h1>` (one line, no `<em>` split) → `.subtitle` → `.kpi-row` → `.byline`.
2. **Methodology** — `.method-grid` of two `.figure`s (inline SVGs) + a `.callout`.
3. **Leaderboard / data** — `table.lead-tbl` (see below).
4. **Positioning chart** — one big `.figure` with a scatter/bar SVG + `.legend-row`.
5. **Detail slides** — `.ad-slide` with `.ad-grid` (media left, body right).
6. **Takeaways** — `.big-state` headline + `.tk-grid` with `.dash-list`.
7. **Decision** — `.decision` with two `.option` columns + verdict hangtags.

## Key blocks (copy these class names exactly)

**KPI row**
```html
<div class="kpi-row">
  <div class="kpi"><div class="kv">$4,683</div><div class="kl">spend · top 10</div></div>
  <div class="kpi"><div class="kv">1.15x</div><div class="kl">blended ROAS</div></div>
</div>
```

**Leaderboard table** — color-code metric cells with `.sage` (good) / `.brass`
(borderline) / `.terra` (under), keep numbers in `.num` (tabular):
```html
<table class="lead-tbl">
  <thead><tr><th>#</th><th>Item</th><th class="num">ROAS</th></tr></thead>
  <tbody>
    <tr>
      <td class="lb-rk">01</td>
      <td class="lb-nm">Sunstroke Hat <span class="hangtag success mini">video</span></td>
      <td class="num sage">1.07x</td>
    </tr>
  </tbody>
</table>
```

**Metric strip**
```html
<div class="metrics">
  <div><div class="mk">ROAS</div><div class="mv">2.05<small>x</small></div></div>
  <div><div class="mk">CPM</div><div class="mv"><small>$</small>21.52</div></div>
</div>
```

**Media slide** — frame images in `.figure.media .g{n}` so they letterbox instead of
stretch (`g1 g2 g3 g4 g6` set the column count):
```html
<section class="slide ad-slide"><div class="slide-inner">
  <div class="ad-grid">
    <div class="ad-figure">
      <div class="figure media g3">
        <div class="shot"><img src="…"></div>
        <div class="shot"><img src="…"></div>
        <div class="shot"><img src="…"></div>
      </div>
    </div>
    <div class="ad-body">
      <div class="dh">03 / 10</div>
      <h3 class="ad-name">Flannel Flatlay</h3>
      <p class="ad-one">Distressed plaid across three clean studio shots.</p>
      <div class="ad-metrics"> … metric strip … </div>
      <div class="ad-desc"><p>…</p></div>
    </div>
  </div>
</div></section>
```

**Takeaways**
```html
<h2 class="big-state">The account is a test bed, not a winner yet.</h2>
<div class="tk-grid">
  <ul class="dash-list"><li>…</li><li>…</li></ul>
  <div class="callout big"><p>…</p></div>
</div>
```

## Rules (do not break)

- `<html class="deck">` for snap scroll; one `<section class="slide">` per screen.
- Headers = `--font-display`; KPI/metric numbers + labels = `--font-mono`;
  body/subtitle = `--font-serif`. No other fonts.
- Title emphasis = **hangtag kicker** (`.hangtag.accent.head-kicker` before `h1`/`h2`; parchment `.hangtag` for section labels). Do **not** use coloured `<em>` in headlines. Body quotes may use `<em>` italic.
- Optional inline device: `<span class="em-bracket">term</span>` (bracket colour uses `--brass-deep`).
- Charts are hand-coded inline SVG inside `.figure` — see [`svg.md`](./svg.md). Never a placeholder.
- Images go in `.figure.media .g{n}` — never a raw stretched `<img>`.
- Include `#pbar`, `#counter`, `.navhint`; wire `initDeckNav()`.
- Freight via Adobe Fonts kit `lao8mse` (same embed as `css/base.css`). Bump `?v=` if
  fonts look stale after editing the kit.
