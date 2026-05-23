// Shake DS v2 — manual theme toggle
// Adds a [ DARK / LIGHT ] button if one isn't already in the DOM.
// Persists choice in localStorage under "shake-theme".

const KEY = 'shake-theme';

function apply(theme) {
  if (theme === 'dark' || theme === 'light') {
    document.documentElement.setAttribute('data-theme', theme);
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

function current() {
  return document.documentElement.getAttribute('data-theme')
      || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
}

function nextLabel(t) { return t === 'light' ? 'DARK' : 'LIGHT'; }

export function initThemeToggle(buttonSelector = '.theme-toggle') {
  // Restore saved theme on load
  const saved = localStorage.getItem(KEY);
  if (saved === 'light' || saved === 'dark') apply(saved);

  const btn = document.querySelector(buttonSelector);
  if (!btn) return;
  btn.textContent = nextLabel(current());

  btn.addEventListener('click', () => {
    const next = current() === 'light' ? 'dark' : 'light';
    apply(next);
    localStorage.setItem(KEY, next);
    btn.textContent = nextLabel(next);
  });
}
