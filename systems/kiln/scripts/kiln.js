/* ============================================================
   KILN · "Commonplace" — scripts/kiln.js
   The editorial half of the system.

     <script type="module" src="scripts/kiln.js"><\/script>

   (the closing tag is escaped above on purpose: PROMPT.md tells agents to
   inline-vendor a system for standalone artifacts, and an unescaped
   </ script> inside this comment would terminate that inline block)

   Auto-inits on load. Or import the pieces:
     import { initReveal, initSidenotes } from './kiln.js'

   There is deliberately very little here. Kiln is a printed page: the
   only behaviour is the entrance fade, the margin rail alignment, and
   the theme toggle. Nothing parallaxes, nothing counts up, nothing
   lifts. If you are reaching for more motion, reach for better type.
   ============================================================ */

import { initThemeToggle } from './theme-toggle.js';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Entrance: .rise elements fade up as they enter view. No scale, no lift —
   opacity and 10px of travel, and that is the whole vocabulary.

   The threshold must stay 0. Pages hang .rise on whole <section> elements,
   and a section can run many viewports tall — a 62,000px section can never
   put 15% of itself on screen at once, so any positive threshold never
   fires and the section stays at opacity 0 forever. Blank page, no error.
   Ratio is the wrong question; "has any of it arrived" is the right one. */
export function initReveal(selector = '.rise') {
  const risers = document.querySelectorAll(selector);
  if (!risers.length) return;
  if (!('IntersectionObserver' in window) || reduce) {
    risers.forEach((r) => r.classList.add('seen'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('seen'); io.unobserve(e.target); }
    });
  }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
  risers.forEach((r) => io.observe(r));
}

/* SIGNATURE: the margin rail.

   A sidenote with an id is pulled vertically alongside the `.noteref`
   that points at it — the way a printed marginal note sits beside its
   line, not at the top of the page. Notes that no ref points at are
   left alone and keep the CSS's sticky flow.

   Anchoring only runs on a wide viewport (the rail is a real margin
   there). Below 1080px the CSS drops the rail under the column, so we
   clear every inline style and hand layout back to the stylesheet.

   Overlap is impossible by construction: each note is placed at
   max(its ref's offset, the previous note's bottom + MIN_GAP). */
export function initSidenotes(railSelector = '.rail') {
  const rails = [...document.querySelectorAll(railSelector)];
  if (!rails.length) return;

  const MIN_GAP = 24;
  const wide = window.matchMedia('(min-width: 1081px)');

  function clear(rail) {
    rail.style.position = '';
    rail.style.height = '';
    rail.querySelectorAll('.sidenote').forEach((n) => {
      n.style.position = ''; n.style.top = ''; n.style.left = ''; n.style.right = '';
    });
  }

  function layout(rail) {
    const notes = [...rail.querySelectorAll('.sidenote[id]')]
      .map((note) => ({ note, ref: document.querySelector(`.noteref[href="#${CSS.escape(note.id)}"]`) }))
      .filter((pair) => pair.ref);

    if (!notes.length) { clear(rail); return; }

    // Measure first, mutate second — reading rects after we have started
    // absolutely positioning notes would measure a half-built layout.
    const railTop = rail.getBoundingClientRect().top + window.scrollY;
    const measured = notes.map(({ note, ref }) => ({
      note,
      wanted: ref.getBoundingClientRect().top + window.scrollY - railTop,
      height: note.getBoundingClientRect().height,
    }));

    rail.style.position = 'relative';
    let cursor = 0;
    measured.forEach(({ note, wanted, height }) => {
      const top = Math.max(wanted, cursor);
      note.style.position = 'absolute';
      note.style.left = '0';
      note.style.right = '0';
      note.style.top = `${Math.round(top)}px`;
      cursor = top + height + MIN_GAP;
    });
    rail.style.height = `${Math.round(cursor)}px`;
  }

  function run() {
    rails.forEach((rail) => (wide.matches ? layout(rail) : clear(rail)));
  }

  /* Pair each ref with its note so hovering or focusing either one lifts
     the other out of the whisper-level ink. */
  document.querySelectorAll('.noteref').forEach((ref) => {
    const note = document.querySelector(ref.getAttribute('href') || '');
    if (!note) return;
    const lit = (on) => note.classList.toggle('is-lit', on);
    ref.addEventListener('mouseenter', () => lit(true));
    ref.addEventListener('mouseleave', () => lit(false));
    ref.addEventListener('focus', () => lit(true));
    ref.addEventListener('blur', () => lit(false));
  });

  run();
  // Fonts land after first paint and change every measurement under them.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(run);
  window.addEventListener('load', run);

  let t;
  window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(run, 120); });
  wide.addEventListener('change', run);
}

/* Marks the nav link for the section currently in view with
   aria-current="page" — which is what draws the terracotta rule under
   it. Purely a reading aid; the page is fully usable without it. */
export function initCurrentSection(linkSelector = '.navlinks a[href^="#"]') {
  const links = [...document.querySelectorAll(linkSelector)];
  if (!links.length || !('IntersectionObserver' in window)) return;

  const targets = links
    .map((a) => ({ a, el: document.querySelector(a.getAttribute('href')) }))
    .filter((p) => p.el);
  if (!targets.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const hit = targets.find((p) => p.el === e.target);
      if (!hit) return;
      targets.forEach((p) => p.a.removeAttribute('aria-current'));
      hit.a.setAttribute('aria-current', 'page');
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  targets.forEach((p) => io.observe(p.el));
}

export function initKiln() {
  // Tells theme-init.js's safety net to stand down — this module is alive
  // and initReveal() owns the .rise elements from here.
  document.documentElement.setAttribute('data-kiln', 'ready');
  initThemeToggle();   // wires any <button class="theme-toggle"> in the page chrome
  initReveal();
  initSidenotes();
  initCurrentSection();
}

initKiln();
