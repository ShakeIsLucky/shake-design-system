// Shake System v2 — manual theme toggle (paper <-> graphite)
// Light (paper) is the default identity, so the polarity is flipped vs v1:
// the fallback theme is 'light', and we only report 'dark' when the OS asks.
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
  return document.documentElement.getAttribute('data-theme')
      || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

// The button shows the theme you'd switch TO.
function nextLabel(t) { return t === 'dark' ? 'LIGHT' : 'DARK'; }

export function initThemeToggle(buttonSelector = '.theme-toggle') {
  // Restore saved theme on load
  const saved = savedTheme();
  if (saved) apply(saved);

  const btn = document.querySelector(buttonSelector);
  if (!btn) return;
  btn.textContent = nextLabel(current());

  btn.addEventListener('click', () => {
    const next = current() === 'dark' ? 'light' : 'dark';
    apply(next);
    persist(next);
    btn.textContent = nextLabel(next);
  });
}
