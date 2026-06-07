// Shake System v2 — Chart.js theming (neo-tactile)
// Usage:
//   <script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
//   <script type="module">
//     import { applyShakeChartDefaults, actionGradient } from '.../shake-system-v2/scripts/chart-theme.js';
//     applyShakeChartDefaults(Chart);
//   </script>

function tokens() {
  const r = getComputedStyle(document.documentElement);
  const get = (name, fallback) => (r.getPropertyValue(name).trim() || fallback);
  return {
    ink:        get('--ink',         '#23211c'),
    inkSoft:    get('--ink-soft',    '#33302a'),
    inkMute:    get('--ink-mute',    '#6a6456'),
    line:       get('--line',        '#d0c6b1'),
    lineStrong: get('--line-strong', '#b8ad93'),
    accent:     get('--action',      '#e5462b'),
    accentDeep: get('--action-deep', '#c5371e'),
    felt:       get('--felt',        '#3f6b52'),
    surface:    get('--paper',       '#e9e3d6'),
  };
}

export function applyShakeChartDefaults(Chart) {
  const t = tokens();
  Chart.defaults.font.family = 'Space Grotesk, system-ui, sans-serif';
  Chart.defaults.font.size = 12;
  Chart.defaults.color = t.inkSoft;
  Chart.defaults.borderColor = t.line;

  // Grids — quiet hairlines
  Chart.defaults.scale.grid.color = t.line;
  Chart.defaults.scale.grid.drawTicks = false;
  Chart.defaults.scale.ticks.color = t.inkMute;
  Chart.defaults.scale.ticks.padding = 8;

  // Tooltips — embossed paper chip
  Chart.defaults.plugins.tooltip.backgroundColor = t.surface;
  Chart.defaults.plugins.tooltip.titleColor = t.ink;
  Chart.defaults.plugins.tooltip.bodyColor = t.inkSoft;
  Chart.defaults.plugins.tooltip.borderColor = t.accent;
  Chart.defaults.plugins.tooltip.borderWidth = 1;
  Chart.defaults.plugins.tooltip.cornerRadius = 10;
  Chart.defaults.plugins.tooltip.padding = 10;
  Chart.defaults.plugins.tooltip.titleFont = { family: Chart.defaults.font.family, size: 12, weight: '600' };
  Chart.defaults.plugins.tooltip.bodyFont  = { family: Chart.defaults.font.family, size: 12 };

  // Legend
  Chart.defaults.plugins.legend.labels.boxHeight = 8;
  Chart.defaults.plugins.legend.labels.boxWidth = 16;
  Chart.defaults.plugins.legend.labels.color = t.inkSoft;
}

// Vermilion top->deep gradient for bar/line fills
export function actionGradient(ctx, area) {
  const t = tokens();
  const g = ctx.createLinearGradient(0, area?.top ?? 0, 0, area?.bottom ?? 200);
  g.addColorStop(0, t.accent);
  g.addColorStop(1, t.accentDeep);
  return g;
}

// Felt-green companion gradient for a second series
export function feltGradient(ctx, area) {
  const t = tokens();
  const g = ctx.createLinearGradient(0, area?.top ?? 0, 0, area?.bottom ?? 200);
  g.addColorStop(0, t.felt);
  g.addColorStop(1, t.lineStrong);
  return g;
}
