// Shake DS v2 — manual theme toggle
// Adds a [ DARK / LIGHT ] button if one isn't already in the DOM.
// Persists choice in localStorage under "shake-theme".

const KEY = 'shake-theme';

function savedTheme() {
  try {
    const saved = localStorage.getItem(KEY);
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch (_) {
    return null;
  }
}

function persist(theme) {
  try {
    localStorage.setItem(KEY, theme);
  } catch (_) {
    /* Ignore storage failures; the DOM theme still changes. */
  }
}

function apply(theme) {
  if (theme === 'dark' || theme === 'light') {
    document.documentElement.setAttribute('data-theme', theme);
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

function current() {
  return document.documentElement.getAttribute('data-theme') || 'dark';
}

function nextLabel(t) { return t === 'light' ? 'DARK' : 'LIGHT'; }

export function initThemeToggle(buttonSelector = '.theme-toggle') {
  // Restore explicit user choice only. Otherwise pages default to dark,
  // regardless of OS color-scheme preference.
  const saved = savedTheme();
  if (saved) apply(saved);
  else apply('dark');

  const btn = document.querySelector(buttonSelector);
  if (!btn) return;
  btn.textContent = nextLabel(current());

  btn.addEventListener('click', () => {
    const next = current() === 'light' ? 'dark' : 'light';
    apply(next);
    persist(next);
    btn.textContent = nextLabel(next);
  });
}
