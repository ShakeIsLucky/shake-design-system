/* ============================================================
   CALM-EINK · "Margin" — scripts/calm-eink.js
   The quiet, ambient half of the system.

     <script type="module" src="scripts/calm-eink.js"></script>

   Auto-inits on load. Or import the pieces:
     import { initReveal, initReader, initClock } from './calm-eink.js'

   Everything here is paced like a turning page. Cadences (520ms,
   3200ms, 4200ms) ARE the identity — leave them slow.
   ============================================================ */

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Entrance: .rise elements fade up as they enter view. Cards also get
   .seen, which the CSS uses to draw their line glyphs. */
export function initReveal(selector = '.rise') {
  const risers = document.querySelectorAll(selector);
  if (!('IntersectionObserver' in window) || reduce) {
    risers.forEach((r) => r.classList.add('seen'));
    document.querySelectorAll('.card').forEach((c) => c.classList.add('seen'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('seen'); io.unobserve(e.target); }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
  risers.forEach((r) => io.observe(r));
}

/* SIGNATURE: word-by-word reading illumination, paced like e-ink.
   Lights each word at a walking pace, rests, dims, and loops. */
export function initReader(selector = '#readerText .word') {
  const words = [...document.querySelectorAll(selector)];
  if (!words.length) return;
  if (reduce) { words.forEach((w) => w.classList.add('lit')); return; }

  let idx = 0;
  function step() {
    if (idx < words.length) {
      words[idx].classList.add('lit');
      idx++;
      setTimeout(step, 520);                 // deliberate, walking pace
    } else {
      setTimeout(() => {                      // gentle rest, then dim + begin again
        words.forEach((w) => w.classList.remove('lit'));
        idx = 0;
        setTimeout(step, 1400);
      }, 4200);
    }
  }
  setTimeout(step, 900);
}

/* A very slow ambient clock — one minute every ~3.2s. Confirms time
   is passing, quietly, without ever feeling urgent. */
export function initClock(id = 'clock', startMinutes = 6 * 60) {
  const clock = document.getElementById(id);
  if (!clock || reduce) return;
  let minutes = startMinutes;
  setInterval(() => {
    minutes = (minutes + 1) % (24 * 60);
    const h = Math.floor(minutes / 60), m = minutes % 60;
    clock.textContent = (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
  }, 3200);
}

/* "Open a blank page" — a calm, no-spectacle acknowledgement. */
export function initBegin(btnId = 'beginBtn', footId = 'footState') {
  const begin = document.getElementById(btnId);
  const foot = document.getElementById(footId);
  if (!begin) return;
  begin.addEventListener('click', () => {
    begin.textContent = 'The page is ready.';
    begin.style.background = 'var(--sage-deep)';
    if (foot) foot.textContent = 'a blank page is open and waiting';
    setTimeout(() => {
      begin.textContent = 'Open a blank page';
      begin.style.background = '';
    }, 4000);
  });
}

/* One e-ink refresh sweep as the page opens — wires the dormant band
   in effects.css. Felt, not seen; skipped entirely under reduced motion. */
export function initRefreshSweep() {
  if (reduce) return;
  requestAnimationFrame(() => document.body.classList.add('eink-on'));
}

/* The letter knows when it was opened. Pages stamp a footer span with
   data-printed-utc; we add the reader's local opened time beside it.
   No element, or an unparseable stamp: nothing happens. */
export function initOpened(selector = '.opened[data-printed-utc]') {
  const el = document.querySelector(selector);
  if (!el) return;
  const printed = new Date(el.dataset.printedUtc);
  if (Number.isNaN(printed.getTime())) return;
  const now = new Date();
  const pad = (n) => (n < 10 ? '0' : '') + n;
  el.textContent = 'opened ' + pad(now.getHours()) + ':' + pad(now.getMinutes());
}

/* Daily postmark: a hairline franking mark, unique to each letter and
   stable on reload (rotation seeded by kind+date). Series name curves
   along the top arc; number and date sit in the middle. */
export function initPostmark(selector = '.postmark[data-kind][data-date]') {
  const el = document.querySelector(selector);
  if (!el) return;
  const kind = el.dataset.kind, date = el.dataset.date, no = el.dataset.no;
  let h = 0;
  for (const c of kind + date) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const angle = (h % 15) - 7;
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const center = [no ? '№ ' + no : null, date].filter(Boolean);
  el.innerHTML =
    `<svg viewBox="0 0 76 76" width="68" height="68" aria-hidden="true" style="transform:rotate(${angle}deg)">` +
    `<circle cx="38" cy="38" r="36" fill="none" stroke="currentColor" stroke-width="1"/>` +
    `<circle cx="38" cy="38" r="29" fill="none" stroke="currentColor" stroke-width="0.5" opacity=".55"/>` +
    `<path id="pm-arc" d="M 8 38 a 30 30 0 1 1 0 0.01" fill="none"/>` +
    `<text font-family="IBM Plex Mono, ui-monospace, monospace" font-size="6.5" letter-spacing="1" fill="currentColor">` +
    `<textPath href="#pm-arc" startOffset="25%" text-anchor="middle">${esc(kind.toUpperCase())}</textPath></text>` +
    center.map((t, i) =>
      `<text x="38" y="${41 + (i - (center.length - 1) / 2) * 11}" text-anchor="middle" ` +
      `font-family="IBM Plex Mono, ui-monospace, monospace" font-size="7.5" fill="currentColor">${esc(t)}</text>`
    ).join('') +
    `</svg>`;
}

export function initCalmEink() {
  initReveal();
  initReader();
  initClock();
  initBegin();
  initRefreshSweep();
  initOpened();
  initPostmark();
}

initCalmEink();
