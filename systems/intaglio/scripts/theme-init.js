/* INTAGLIO - theme-init (runs before first paint, no flash)
   Applies a saved plaster/graphite choice; otherwise leaves the CSS
   default + OS preference in control. Load as a plain (non-module)
   script in <head> BEFORE the stylesheet. */
(function () {
  try {
    var saved = window.localStorage && window.localStorage.getItem('intaglio-theme');
    if (saved === 'light' || saved === 'dark') {
      document.documentElement.setAttribute('data-theme', saved);
    }
  } catch (_) {
    /* Leave the CSS default / OS preference in control. */
  }
})();
