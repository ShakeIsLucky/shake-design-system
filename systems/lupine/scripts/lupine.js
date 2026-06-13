/* ============================================================
   LUPINE · "One-Ink Field Station" — scripts/lupine.js
   Mode toggle, clock-stop backdrop rig, datestamp.

     <script type="module" src="scripts/lupine.js"></script>

   Auto-inits on load. Or import:
     import { initLupine } from './lupine.js';
   ============================================================ */

const KEY = 'lupine-mode';

function clockStop(h) {
  if (h >= 5 && h < 8) return 'dawn';
  if (h >= 8 && h < 17) return 'day';
  if (h >= 17 && h < 20) return 'dusk';
  return 'night';
}

function clockMode() {
  return clockStop(new Date().getHours()) === 'night' ? 'night' : 'day';
}

export function initLupine(options = {}) {
  const doc = document.documentElement;
  const toggle = document.getElementById(options.toggleId || 'mode-toggle');
  const autoChip = document.getElementById(options.autoChipId || 'auto-chip');
  const datestamp = document.getElementById(options.datestampId || 'datestamp');
  const params = new URLSearchParams(location.search);
  let urlMode = params.get('mode');
  const urlStop = params.get('stop');

  function effectiveMode() {
    if (urlMode === 'day' || urlMode === 'night') return urlMode;
    const saved = localStorage.getItem(KEY);
    return saved === 'day' || saved === 'night' ? saved : clockMode();
  }

  function render(userAction) {
    const mode = effectiveMode();
    const overridden = !!localStorage.getItem(KEY);
    doc.setAttribute('data-mode', mode);
    if (toggle) {
      toggle.textContent = mode === 'night' ? 'Day' : 'Night';
      toggle.setAttribute('aria-pressed', String(mode === 'night'));
    }
    if (autoChip) autoChip.hidden = !overridden;

    const want = urlStop || (mode === 'night' ? 'night' : clockStop(new Date().getHours()));
    const imgs = document.querySelectorAll('.world img');
    let match = null;
    imgs.forEach((im) => { if (im.dataset.stop === want) match = im; });
    if (!match) imgs.forEach((im) => { if (im.dataset.stop === 'day') match = im; });
    if (match && !match.getAttribute('src')) match.src = match.dataset.src;
    doc.style.setProperty('--fade', userAction ? '400ms' : '120s');
    imgs.forEach((im) => { im.classList.toggle('is-active', im === match); });
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      localStorage.setItem(KEY, effectiveMode() === 'night' ? 'day' : 'night');
      urlMode = null;
      render(true);
    });
  }
  if (autoChip) {
    autoChip.addEventListener('click', () => {
      localStorage.removeItem(KEY);
      render(true);
    });
  }

  if (datestamp) {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    datestamp.textContent = `${pad(d.getMonth() + 1)}·${pad(d.getDate())}·${d.getFullYear()}`;
  }

  render(true);
  setInterval(() => { render(false); }, 60000);
}

initLupine();
