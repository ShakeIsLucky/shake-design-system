/* Ledger — no-FOUC theme init.
   LIGHT is the default identity; DARK is the toggle target.
   Restores an explicit saved choice before first paint. Ignores OS preference,
   per Racing-Green precedent. Load this BEFORE the stylesheet. */
(function () {
  var theme = 'light';
  try {
    var saved = window.localStorage && window.localStorage.getItem('shake-theme');
    if (saved === 'light' || saved === 'dark') theme = saved;
  } catch (_) {
    theme = 'light';
  }
  document.documentElement.setAttribute('data-theme', theme);
})();
