/* ============================================================
   KILN · "Commonplace" — scripts/theme-init.js
   No-FOUC theme init. Drop this in <head> BEFORE the stylesheet as a
   CLASSIC (non-module) script so the theme is committed before paint:

     <script src="scripts/theme-init.js"><\/script>   (closing tag escaped
   so this file survives being inline-vendored into a standalone artifact)

   Default is LIGHT (cream stock) — kiln is a daytime reading surface.
   Dark applies ONLY on an explicit prior choice; OS preference is
   ignored (racing-green precedent, shared with calm-ink). Storage key
   "shake-theme" is shared across every shake system so a reader's
   choice carries between them.
   ============================================================ */
(function () {
  var theme = 'light';
  try {
    var saved = window.localStorage && window.localStorage.getItem('shake-theme');
    if (saved === 'light' || saved === 'dark') theme = saved;
  } catch (_) {
    theme = 'light';
  }
  /* Only stamp the attribute for dark; the bare :root is already light. */
  if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

  /* Enables the .rise entrance in components.css. Because this runs here —
     in a CLASSIC script, which loads everywhere — the hidden-then-revealed
     state exists ONLY when scripting is actually working. */
  document.documentElement.classList.add('js');

  /* Safety net: kiln.js is an ES module, and modules are blocked outright
     on file:// (and may fail behind a strict CSP). kiln.js stamps
     data-kiln="ready" on <html> as soon as it runs; if that never appears,
     nothing is going to reveal the .rise elements, so we reveal them all.
     Guarded on the flag rather than on a timer alone — otherwise this
     would also fire when kiln.js IS running and simply has not scrolled
     to the below-fold elements yet. */
  window.addEventListener('load', function () {
    window.setTimeout(function () {
      if (document.documentElement.hasAttribute('data-kiln')) return;
      var hidden = document.querySelectorAll('.rise:not(.seen)');
      for (var i = 0; i < hidden.length; i++) hidden[i].classList.add('seen');
    }, 1000);
  });
})();
