/* ============================================================
   SPATIAL-AR · "Aperture" — scripts/spatial-ar.js
   The interactive half of the signature qualities.

     <script type="module" src="scripts/spatial-ar.js"></script>

   Auto-inits on load. Or import the pieces and wire them yourself:
     import { initReveal, initReticle, initParallaxFloats } from './spatial-ar.js'

   All ambient motion respects prefers-reduced-motion (entrance reveal
   still runs, but the CSS keeps content visible if motion is reduced).
   ============================================================ */

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Entrance: panels rise + fade as they enter view. */
export function initReveal(selector = '[data-rise]') {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(selector).forEach((el) => io.observe(el));
}

/* Gaze reticle that smooth-follows the pointer, plus a gaze "bloom":
   any [data-tilt] panel under the cursor brightens and the ring grows. */
export function initReticle(id = 'reticle') {
  const ret = document.getElementById(id);
  if (!ret) return;
  let rx = innerWidth / 2, ry = innerHeight / 2, cx = rx, cy = ry;

  addEventListener('pointermove', (e) => { rx = e.clientX; ry = e.clientY; ret.style.opacity = '1'; });
  addEventListener('pointerleave', () => { ret.style.opacity = '0'; });

  (function loop() {
    cx += (rx - cx) * 0.18;            // 0.18 damping = the calm, weighty follow
    cy += (ry - cy) * 0.18;
    ret.style.transform = `translate(${cx}px,${cy}px)`;
    requestAnimationFrame(loop);
  })();

  const tiltEls = [...document.querySelectorAll('[data-tilt]')];
  addEventListener('pointermove', (e) => {
    const hit = document.elementFromPoint(e.clientX, e.clientY);
    let over = false;
    tiltEls.forEach((el) => {
      if (el.contains(hit)) {
        over = true;
        const r = el.getBoundingClientRect();
        const lx = ((e.clientX - r.left) / r.width) * 100;
        const ly = ((e.clientY - r.top) / r.height) * 100;
        el.style.setProperty('background',
          `radial-gradient(220px 220px at ${lx}% ${ly}%, rgba(255,255,255,0.85), var(--panel))`);
      } else {
        el.style.removeProperty('background');
      }
    });
    ret.style.width = ret.style.height = over ? '64px' : '46px';
  });
}

/* Parallax floats: each .float reads data-depth (smaller = nearer = moves more).
   Nearer panels also bob gently, sells the "anchored in space" feeling. */
export function initParallaxFloats(floatSel = '.float') {
  const floats = [...document.querySelectorAll(floatSel)];
  if (!floats.length) return;
  let px = 0, py = 0, tpx = 0, tpy = 0, bob = 0;

  addEventListener('pointermove', (e) => {
    tpx = e.clientX / innerWidth - 0.5;
    tpy = e.clientY / innerHeight - 0.5;
  });

  (function loop() {
    px += (tpx - px) * 0.06;           // eased target
    py += (tpy - py) * 0.06;
    bob += 0.012;
    floats.forEach((f, i) => {
      const d = parseFloat(f.getAttribute('data-depth')) || 1;
      const shift = 2.2 - d;           // nearer objects move more
      const tx = -px * 46 * shift;
      const ty = -py * 34 * shift + Math.sin(bob + i) * 6;  // gentle float
      const tz = shift * 60;
      const rotY = px * 10 * (shift * 0.5);
      const rotX = -py * 8 * (shift * 0.5);
      f.style.transform =
        `translate3d(${tx}px,${ty}px,${tz}px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
    });
    requestAnimationFrame(loop);
  })();
}

export function initSpatialAR() {
  initReveal();                        // entrance always wires up (CSS handles reduced-motion)
  if (reduce) return;                  // the rest is ambient motion — honour the preference
  initReticle();
  initParallaxFloats();
}

initSpatialAR();
