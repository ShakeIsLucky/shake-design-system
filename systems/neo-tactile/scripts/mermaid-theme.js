// Shake System v2 — Mermaid theming (neo-tactile)
// Usage:
//   import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
//   import { initShakeMermaid } from '.../shake-system-v2/scripts/mermaid-theme.js';
//   initShakeMermaid(mermaid);
//
// Reads [data-theme] off <html> and picks paper (light) or graphite (dark).
// Light is the default; dark only when the OS asks. Re-renders on toggle.

const LIGHT = {
  // surfaces / nodes — warm paper plates
  primaryColor:        '#ece6d8',
  primaryBorderColor:  '#e5462b',  // vermilion action
  primaryTextColor:    '#23211c',
  secondaryColor:      '#ddd5c4',
  secondaryBorderColor:'#3f6b52',  // felt green
  secondaryTextColor:  '#23211c',
  tertiaryColor:       '#e2dacc',
  tertiaryBorderColor: '#6a6456',
  tertiaryTextColor:   '#23211c',

  mainBkg:             '#ece6d8',
  clusterBkg:          'rgba(229,70,43,0.05)',
  clusterBorder:       '#b8ad93',

  lineColor:           '#e5462b',

  actorBkg:            '#ece6d8',
  actorBorder:         '#e5462b',
  actorTextColor:      '#23211c',
  actorLineColor:      '#b8ad93',
  signalColor:         '#e5462b',
  signalTextColor:     '#23211c',
  labelBoxBkgColor:    '#e2dacc',
  labelBoxBorderColor: '#b8ad93',
  labelTextColor:      '#23211c',
  loopTextColor:       '#23211c',
  noteBorderColor:     '#3f6b52',
  noteBkgColor:        '#e9e3d6',
  noteTextColor:       '#23211c',
  sequenceNumberColor: '#fff8f4',

  fontSize:   '14px',
  fontFamily: 'Space Grotesk, system-ui, sans-serif',
};

const DARK = {
  primaryColor:        '#322e28',
  primaryBorderColor:  '#f15a3c',
  primaryTextColor:    '#f0ebdf',
  secondaryColor:      '#2a2722',
  secondaryBorderColor:'#5b8a6e',
  secondaryTextColor:  '#f0ebdf',
  tertiaryColor:       '#3a352d',
  tertiaryBorderColor: '#9c9482',
  tertiaryTextColor:   '#f0ebdf',

  mainBkg:             '#322e28',
  clusterBkg:          'rgba(241,90,60,0.08)',
  clusterBorder:       '#4a4339',

  lineColor:           '#f15a3c',

  actorBkg:            '#322e28',
  actorBorder:         '#f15a3c',
  actorTextColor:      '#f0ebdf',
  actorLineColor:      '#4a4339',
  signalColor:         '#f15a3c',
  signalTextColor:     '#f0ebdf',
  labelBoxBkgColor:    '#2a2722',
  labelBoxBorderColor: '#4a4339',
  labelTextColor:      '#f0ebdf',
  loopTextColor:       '#f0ebdf',
  noteBorderColor:     '#5b8a6e',
  noteBkgColor:        '#3a352d',
  noteTextColor:       '#f0ebdf',
  sequenceNumberColor: '#1c1915',

  fontSize:   '14px',
  fontFamily: 'Space Grotesk, system-ui, sans-serif',
};

function currentTheme() {
  const explicit = document.documentElement.getAttribute('data-theme');
  if (explicit === 'light' || explicit === 'dark') return explicit;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(mermaid) {
  const themeVariables = currentTheme() === 'dark' ? DARK : LIGHT;
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
  document.querySelectorAll('.mermaid[data-source]').forEach((el) => {
    el.removeAttribute('data-processed');
    el.innerHTML = el.getAttribute('data-source');
  });
  await mermaid.run({ querySelector: '.mermaid' });
}

export function initShakeMermaid(mermaid) {
  document.querySelectorAll('.mermaid').forEach((el) => {
    if (!el.hasAttribute('data-source')) el.setAttribute('data-source', el.textContent.trim());
  });

  applyTheme(mermaid);
  mermaid.run({ querySelector: '.mermaid' });

  const obs = new MutationObserver(() => { applyTheme(mermaid); rerender(mermaid); });
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener('change', () => {
    if (!document.documentElement.hasAttribute('data-theme')) { applyTheme(mermaid); rerender(mermaid); }
  });
}

export const SHAKE_MERMAID_THEMES = { DARK, LIGHT };
