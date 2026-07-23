/* ============================================================
   CALM-EINK · "Margin" — scripts/theme-init.js
   No-FOUC theme init. Drop this in <head> BEFORE the stylesheet as a
   CLASSIC (non-module) script so the theme is committed before paint:

     <script src="scripts/theme-init.js"></script>

   Default is LIGHT (paper) — calm-ink is a daytime reading surface.
   Dark applies ONLY on an explicit prior choice; OS preference is
   ignored (racing-green precedent). Storage key "shake-theme" is
   shared across every shake system for cross-system consistency.
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
})();
