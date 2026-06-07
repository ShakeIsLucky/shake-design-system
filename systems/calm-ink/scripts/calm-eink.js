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

export function initCalmEink() {
  initReveal();
  initReader();
  initClock();
  initBegin();
}

initCalmEink();
