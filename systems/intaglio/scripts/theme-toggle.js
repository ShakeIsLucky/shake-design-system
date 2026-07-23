// INTAGLIO - manual theme toggle (plaster <-> graphite)
// Plaster (light) is the default identity, so the fallback theme is
// 'light' and we only report 'dark' when the OS asks. Persists the
// choice per device under "intaglio-theme". OS-following is preserved:
// with no saved choice, the CSS @media(prefers-color-scheme) drives.

const KEY = 'intaglio-theme';

function savedTheme() {
  try {
    const saved = localStorage.getItem(KEY);
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch (_) {
    return null;
  }
}

function persist(theme) {
  try { localStorage.setItem(KEY, theme); } catch (_) { /* DOM theme still changes */ }
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
