// Shake System v2 — scroll reveal
// Adds .in to each .reveal element as it scrolls into view, then unobserves.
// Respects prefers-reduced-motion (shows everything immediately).

export function initReveal(selector = '.reveal') {
  const els = document.querySelectorAll(selector);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach((el) => io.observe(el));
}
