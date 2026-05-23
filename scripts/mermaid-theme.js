// Shake DS v2 — Mermaid theming
// Usage:
//   import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
//   import { initShakeMermaid } from '../_assets/shake-design-system/v2/scripts/mermaid-theme.js';
//   initShakeMermaid(mermaid);
//
// Reads the current [data-theme] off <html> and picks dark or light vars.
// Listens for the same attribute changing so toggles re-render.

const DARK = {
  // surfaces / nodes
  primaryColor:        '#123524',  // panel-raised
  primaryBorderColor:  '#E1B06E',  // brass
  primaryTextColor:    '#F0EAD7',
  secondaryColor:      '#1C3D2B',
  secondaryBorderColor:'#A3A473',  // sage
  secondaryTextColor:  '#F0EAD7',
  tertiaryColor:       '#DACBC2',  // parchment highlight
  tertiaryBorderColor: '#844F3B',  // terracotta
  tertiaryTextColor:   '#0D2A1B',

  // backgrounds
  mainBkg:             '#0D2A1B',
  clusterBkg:          'rgba(225,176,110,0.05)',
  clusterBorder:       '#2C5440',

  // edges
  lineColor:           '#E1B06E',

  // sequence diagrams
  actorBkg:            '#123524',
  actorBorder:         '#E1B06E',
  actorTextColor:      '#F0EAD7',
  actorLineColor:      '#2C5440',
  signalColor:         '#E1B06E',
  signalTextColor:     '#F0EAD7',
  labelBoxBkgColor:    '#1C3D2B',
  labelBoxBorderColor: '#2C5440',
  labelTextColor:      '#F0EAD7',
  loopTextColor:       '#F0EAD7',
  noteBorderColor:     '#E1B06E',
  noteBkgColor:        '#EFE8D0',
  noteTextColor:       '#0D2A1B',
  sequenceNumberColor: '#0D2A1B',

  // typography
  fontSize:   '14px',
  fontFamily: 'DepartureMono, JetBrains Mono, ui-monospace, monospace',
};

const LIGHT = {
  primaryColor:        '#FAF5E3',
  primaryBorderColor:  '#8B5A1C',
  primaryTextColor:    '#0D2A1B',
  secondaryColor:      '#E3DAC0',
  secondaryBorderColor:'#626245',
  secondaryTextColor:  '#0D2A1B',
  tertiaryColor:       '#EFE8D0',
  tertiaryBorderColor: '#844F3B',
  tertiaryTextColor:   '#0D2A1B',

  mainBkg:             '#FAF5E3',
  clusterBkg:          'rgba(139,90,28,0.05)',
  clusterBorder:       '#B8A982',

  lineColor:           '#8B5A1C',

  actorBkg:            '#FFFFFF',
  actorBorder:         '#8B5A1C',
  actorTextColor:      '#0D2A1B',
  actorLineColor:      '#B8A982',
  signalColor:         '#8B5A1C',
  signalTextColor:     '#0D2A1B',
  labelBoxBkgColor:    '#E3DAC0',
  labelBoxBorderColor: '#B8A982',
  labelTextColor:      '#0D2A1B',
  loopTextColor:       '#0D2A1B',
  noteBorderColor:     '#8B5A1C',
  noteBkgColor:        '#0D2A1B',
  noteTextColor:       '#F0EAD7',
  sequenceNumberColor: '#F0EAD7',

  fontSize:   '14px',
  fontFamily: 'DepartureMono, JetBrains Mono, ui-monospace, monospace',
};

function currentTheme() {
  const explicit = document.documentElement.getAttribute('data-theme');
  if (explicit === 'light' || explicit === 'dark') return explicit;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(mermaid) {
  const themeVariables = currentTheme() === 'light' ? LIGHT : DARK;
  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    look: 'classic',
    securityLevel: 'loose',
    flowchart: { htmlLabels: true, curve: 'basis', padding: 16 },
    themeVariables,
  });
}

async function rerender(mermaid) {
  // Restore raw source, then re-run
  document.querySelectorAll('.mermaid[data-source]').forEach(el => {
    el.removeAttribute('data-processed');
    el.innerHTML = el.getAttribute('data-source');
  });
  await mermaid.run({ querySelector: '.mermaid' });
}

export function initShakeMermaid(mermaid) {
  // Stash original source so we can rebuild after theme switches
  document.querySelectorAll('.mermaid').forEach(el => {
    if (!el.hasAttribute('data-source')) {
      el.setAttribute('data-source', el.textContent.trim());
    }
  });

  applyTheme(mermaid);
  mermaid.run({ querySelector: '.mermaid' });

  // React to [data-theme] toggling on <html>
  const obs = new MutationObserver(() => {
    applyTheme(mermaid);
    rerender(mermaid);
  });
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // React to OS theme changes if no manual override is set
  const mq = window.matchMedia('(prefers-color-scheme: light)');
  mq.addEventListener('change', () => {
    if (!document.documentElement.hasAttribute('data-theme')) {
      applyTheme(mermaid);
      rerender(mermaid);
    }
  });
}

export const SHAKE_MERMAID_THEMES = { DARK, LIGHT };
