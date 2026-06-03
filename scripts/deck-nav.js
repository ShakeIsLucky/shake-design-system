/* ============================================================
   SHAKE DS v2 — deck-nav.js
   Wires slide-deck chrome: #counter, #pbar progress, keyboard nav.
   Optional — the deck works visually without it; this just makes
   the chrome live.

   Usage:
     <html class="deck"> ... </html>
     <div id="pbar"></div>
     <div id="counter">… / …</div>
     <div class="navhint">↑ ↓ / SPACE · F for fullscreen</div>

     <script type="module">
       import { initDeckNav } from '.../scripts/deck-nav.js';
       initDeckNav();
     </script>
   ============================================================ */

export function initDeckNav(opts = {}) {
  const slideSel = opts.slideSelector || '.slide';
  const slides = Array.from(document.querySelectorAll(slideSel));
  if (!slides.length) return;

  const total = slides.length;
  const counter = document.getElementById('counter');
  const pbar = document.getElementById('pbar');
  let current = 0;

  function setCounter(i) {
    if (counter) counter.innerHTML = `<b>${String(i + 1).padStart(2, '0')}</b> / ${String(total).padStart(2, '0')}`;
    if (pbar) pbar.style.width = `${((i + 1) / total) * 100}%`;
  }

  // Track the most-visible slide.
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && e.intersectionRatio >= 0.5) {
        current = slides.indexOf(e.target);
        setCounter(current);
      }
    });
  }, { threshold: [0.5] });
  slides.forEach((s) => io.observe(s));

  function goTo(i) {
    current = Math.max(0, Math.min(total - 1, i));
    slides[current].scrollIntoView({ behavior: 'smooth', block: 'start' });
    setCounter(current);
  }

  document.addEventListener('keydown', (e) => {
    const k = e.key;
    if (k === 'ArrowDown' || k === 'ArrowRight' || k === ' ' || k === 'PageDown') {
      e.preventDefault(); goTo(current + 1);
    } else if (k === 'ArrowUp' || k === 'ArrowLeft' || k === 'PageUp') {
      e.preventDefault(); goTo(current - 1);
    } else if (k === 'Home') {
      e.preventDefault(); goTo(0);
    } else if (k === 'End') {
      e.preventDefault(); goTo(total - 1);
    } else if (k === 'f' || k === 'F') {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
      else document.exitFullscreen?.();
    }
  });

  setCounter(0);
}
