// Shake DS v2 — Chart.js theming
// Usage:
//   <script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
//   <script type="module">
//     import { applyShakeChartDefaults } from '../_assets/shake-design-system/v2/scripts/chart-theme.js';
//     applyShakeChartDefaults(Chart);
//   </script>

function tokens() {
  const r = getComputedStyle(document.documentElement);
  return {
    ink:        r.getPropertyValue('--ink').trim()        || '#FAF8F2',
    inkSoft:    r.getPropertyValue('--ink-soft').trim()   || '#DFDAC6',
    inkMute:    r.getPropertyValue('--ink-mute').trim()   || '#99A08A',
    line:       r.getPropertyValue('--line').trim()       || '#1C3D2B',
    lineStrong: r.getPropertyValue('--line-strong').trim()|| '#2C5440',
    accent:     r.getPropertyValue('--accent').trim()     || '#E1B06E',
    accentDeep: r.getPropertyValue('--accent-deep').trim()|| '#A85E0A',
    surface:    r.getPropertyValue('--surface').trim()    || '#0D2A1B',
    surfaceRaised: r.getPropertyValue('--surface-raised').trim() || '#123524',
  };
}

export function applyShakeChartDefaults(Chart) {
  const t = tokens();
  Chart.defaults.font.family = 'DepartureMono, JetBrains Mono, ui-monospace, monospace';
  Chart.defaults.font.size = 11;
  Chart.defaults.color = t.inkSoft;
  Chart.defaults.borderColor = t.line;

  // Grids — minimal Linear-style
  Chart.defaults.scale.grid.color = t.line;
  Chart.defaults.scale.grid.drawTicks = false;
  Chart.defaults.scale.ticks.color = t.inkMute;
  Chart.defaults.scale.ticks.padding = 8;

  // Tooltips — parchment hangtag
  Chart.defaults.plugins.tooltip.backgroundColor = '#EFE8D0';
  Chart.defaults.plugins.tooltip.titleColor = '#0D2A1B';
  Chart.defaults.plugins.tooltip.bodyColor = '#0D2A1B';
  Chart.defaults.plugins.tooltip.borderColor = t.accent;
  Chart.defaults.plugins.tooltip.borderWidth = 1;
  Chart.defaults.plugins.tooltip.cornerRadius = 0;
  Chart.defaults.plugins.tooltip.titleFont = { family: Chart.defaults.font.family, size: 11, weight: '500' };
  Chart.defaults.plugins.tooltip.bodyFont  = { family: Chart.defaults.font.family, size: 12 };

  // Legend — quiet mono
  Chart.defaults.plugins.legend.labels.boxHeight = 8;
  Chart.defaults.plugins.legend.labels.boxWidth = 16;
  Chart.defaults.plugins.legend.labels.color = t.inkSoft;
}

export function brassGradient(ctx, area) {
  const t = tokens();
  const g = ctx.createLinearGradient(0, area?.top ?? 0, 0, area?.bottom ?? 200);
  g.addColorStop(0, t.accent);
  g.addColorStop(1, t.accentDeep);
  return g;
}
