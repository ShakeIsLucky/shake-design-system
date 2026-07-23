/* ============================================================
   SAFELIGHT — reveal on scroll + dial jitter + crosshair parallax.
   Zero dependencies. Reduced-motion aware.
   ============================================================ */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;

  /* -- IntersectionObserver reveal (additive; content visible by default) --
     Only opt into the hidden->in transition when JS can actually drive it. */
  if (!prefersReduced && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-reveal');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
  }

  /* -- Dial needle jitter (worn potentiometers) -- */
  document.querySelectorAll('.dial').forEach(function (dial) {
    var needle = dial.querySelector('.needle');
    if (!needle) return;
    var baseAngle = parseFloat(dial.dataset.angle || 0);
    var range = parseFloat(dial.dataset.range || 30);

    var jitter = function () {
      var j = (Math.random() - 0.5) * range;
      needle.style.setProperty('--angle', (baseAngle + j) + 'deg');
    };
    var settle = function () {
      needle.style.setProperty('--angle', baseAngle + 'deg');
    };
    dial.addEventListener('mouseenter', jitter);
    dial.addEventListener('mouseleave', settle);
    dial.addEventListener('focusin', jitter);
    dial.addEventListener('focusout', settle);
  });

  /* -- Crosshair parallax (rAF-throttled, fine-pointer only) -- */
  if (!prefersReduced && finePointer) {
    var crosshair = document.querySelector('.crosshair-bg');
    if (crosshair) {
      var tx = 0, ty = 0, ticking = false;
      var apply = function () {
        crosshair.style.transform =
          'translateY(-50%) translate(' + tx + 'px, ' + ty + 'px)';
        ticking = false;
      };
      document.addEventListener('mousemove', function (e) {
        tx = (e.clientX / window.innerWidth - 0.5) * 20;
        ty = (e.clientY / window.innerHeight - 0.5) * 20;
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(apply);
        }
      });
    }
  }
})();
