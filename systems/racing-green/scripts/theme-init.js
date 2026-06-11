(function () {
  var theme = 'dark';
  try {
    var saved = window.localStorage && window.localStorage.getItem('shake-theme');
    if (saved === 'light' || saved === 'dark') theme = saved;
  } catch (_) {
    theme = 'dark';
  }
  document.documentElement.setAttribute('data-theme', theme);
})();
