/* ============================================================
   DIMENSIONAL-PAPER · "Foldwell" — scripts/dimensional-paper.js
   The tactile, springy half of the system.

     <script type="module" src="scripts/dimensional-paper.js"></script>

   Auto-inits on load. Or import the pieces:
     import { initReveal, initPopParallax, initCountUp } from './dimensional-paper.js'
   ============================================================ */

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Entrance: .reveal blocks rise + un-rotate, staggered by source order
   (60ms each, capped so a long page never feels laggy). */
export function initReveal(selector = '.reveal') {
  const revs = [...document.querySelectorAll(selector)];
  if (!('IntersectionObserver' in window) || reduce) {
    revs.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.14 });
  revs.forEach((el, i) => { el.style.transitionDelay = (Math.min(i, 6) * 60) + 'ms'; io.observe(el); });
}

/* SIGNATURE: pop-up book parallax tied to the cursor.
   Each .pop reads data-tilt (bigger = pops further); background .scene
   layers read data-depth and drift the opposite way for real depth. */
export function initPopParallax(popSel = '.pop', sceneSel = '.scene .layer') {
  if (reduce) return;
  const pops = [...document.querySelectorAll(popSel)];
  const scene = [...document.querySelectorAll(sceneSel)];
  if (!pops.length && !scene.length) return;
  let tx = 0, ty = 0, cx = 0, cy = 0;

  addEventListener('mousemove', (ev) => {
    tx = ev.clientX / innerWidth - 0.5;     // -.5 .. .5
    ty = ev.clientY / innerHeight - 0.5;
  });

  (function raf() {
    cx += (tx - cx) * 0.07;                 // gentle damping = paper weight
    cy += (ty - cy) * 0.07;
    pops.forEach((p) => {
      const d = parseFloat(p.getAttribute('data-tilt') || 0);
      const rx = (-cy * d * 0.5).toFixed(2);
      const ry = ( cx * d * 0.7).toFixed(2);
      p.style.transform =
        `translate3d(${(cx * d * 0.9).toFixed(2)}px,${(cy * d * 0.6).toFixed(2)}px,${d}px) ` +
        `rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    scene.forEach((l) => {
      const dp = parseFloat(l.getAttribute('data-depth') || 0);
      const baseX = (l.classList.contains('hill-back') || l.classList.contains('hill-mid')) ? '-50%' : '0px';
      const shift = (-cx * dp * 140).toFixed(1);
      const shiftY = (-cy * dp * 60).toFixed(1);
      l.style.transform = `translate(${baseX}) translate(${shift}px,${shiftY}px)`;
    });
    requestAnimationFrame(raf);
  })();
}

/* Count-up stats: each .num animates 0 → data-count (easeOutCubic, 1.3s)
   when the band scrolls into view. data-suffix appends "%", etc. */
export function initCountUp(numSel = '.num', bandSel = '.stats-band') {
  const band = document.querySelector(bandSel);
  let counted = false;
  function run() {
    if (counted) return; counted = true;
    document.querySelectorAll(numSel).forEach((el) => {
      const target = parseFloat(el.getAttribute('data-count'));
      if (isNaN(target)) return;
      const suffix = el.getAttribute('data-suffix') || '';
      const decimals = (target % 1 !== 0) ? 1 : 0;
      const start = performance.now(), dur = 1300;
      function step(now) {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = target.toFixed(decimals) + suffix;
      }
      requestAnimationFrame(step);
    });
  }
  if (band && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) run(); }), { threshold: 0.4 });
    io.observe(band);
  } else {
    run();
  }
}

export function initDimensionalPaper() {
  initReveal();
  initPopParallax();
  initCountUp();
}

initDimensionalPaper();
