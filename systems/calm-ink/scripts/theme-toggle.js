/* ============================================================
   CALM-EINK · "Margin" — scripts/theme-toggle.js
   Manual [ DARK ] / [ LIGHT ] toggle. Wired automatically by
   calm-eink.js (initThemeToggle runs inside initCalmEink); a page
   only needs a `<button class="theme-toggle">` in its chrome.

   Default is LIGHT. The button shows the mode it will switch TO.
   Choice persists per device under "shake-theme" (shared key).
   ============================================================ */

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
  // Light is the default paper, so we clear the attribute rather than
  // stamp data-theme="light" — keeps the DOM quiet and matches theme-init.
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

function current() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function nextLabel(t) { return t === 'dark' ? 'LIGHT' : 'DARK'; }

export function initThemeToggle(buttonSelector = '.theme-toggle') {
  // Restore an explicit prior choice; otherwise stay LIGHT (ignore OS).
  const saved = savedTheme();
  apply(saved || 'light');

  const btn = document.querySelector(buttonSelector);
  if (!btn) return;
  btn.setAttribute('aria-label', 'Toggle dark and light theme');
  btn.textContent = nextLabel(current());

  btn.addEventListener('click', () => {
    const next = current() === 'dark' ? 'light' : 'dark';
    apply(next);
    persist(next);
    btn.textContent = nextLabel(next);
  });
}
