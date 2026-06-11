(function () {
  try {
    var saved = window.localStorage && window.localStorage.getItem('shake-theme');
    if (saved === 'light' || saved === 'dark') {
      document.documentElement.setAttribute('data-theme', saved);
    }
  } catch (_) {
    /* Leave the CSS default / OS preference in control. */
  }
})();
