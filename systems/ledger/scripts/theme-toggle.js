// Ledger — manual theme toggle.
// LIGHT is the default; the button toggles to [ DARK ] (the old Racing-Green).
// Persists choice in localStorage under "shake-theme". Ignores OS preference.

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
  document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
}

function current() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

// The button always advertises the theme it switches TO.
function nextLabel(t) { return t === 'dark' ? 'LIGHT' : 'DARK'; }

export function initThemeToggle(buttonSelector = '.theme-toggle') {
  // Restore explicit user choice only; otherwise default to light.
  const saved = savedTheme();
  apply(saved || 'light');

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
