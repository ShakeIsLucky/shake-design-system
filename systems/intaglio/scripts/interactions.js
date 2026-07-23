// INTAGLIO - tactile interactions
//   - count-up on .stat .num / .dial-readout .val (data-to / data-suffix)
//   - sequencer pads: click toggles an INLAID enamel state (no glow),
//     and interaction nudges the brass dial needle + mono readout
//   - cursor-tilt on .device (subtle physical mass, max 2deg)
//   - disclosure: .accordion, .tabs, .dropdown, modal open/close
// Everything is click / hover driven - nothing loops, pulses, or glows.
// All motion is guarded by prefers-reduced-motion.

export function initInteractions(root = document) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  initCountUp(root, reduce);
  initSequencer(root, reduce);
  initDeviceTilt(root, reduce);
  initAccordion(root);
  initTabs(root);
  initDisclosure(root);
}

/* ---- count-up ---- */
function initCountUp(root, reduce) {
  const nums = root.querySelectorAll('.stat .num[data-to], .num[data-to], .val[data-to]');
  if (!nums.length) return;

  const pad = (el, n) => {
    const raw = el.getAttribute('data-to') || '';
    const width = raw.replace(/[^0-9]/g, '').length;
    let s = String(n);
    while (s.length < width) s = '0' + s;
    return s;
  };
  const run = (el) => {
    const to = parseFloat(el.getAttribute('data-to')) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    const wrap = el.classList.contains('num') ? (v) => '<em>' + v + '</em>' : (v) => v;
    if (reduce) { el.innerHTML = wrap(pad(el, to)) + suffix; return; }
    const start = performance.now(), dur = 1000;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.innerHTML = wrap(pad(el, Math.round(eased * to))) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (!('IntersectionObserver' in window)) { nums.forEach(run); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.4 });
  nums.forEach((el) => io.observe(el));
}

/* ---- sequencer pads: click toggles inlaid enamel; needle follows count ---- */
function initSequencer(root, reduce) {
  root.querySelectorAll('.pad-grid').forEach((grid) => {
    const pads = Array.prototype.slice.call(grid.querySelectorAll('.pad'));
    if (!pads.length) return;
    const device = grid.closest('.device') || document;
    const leds = Array.prototype.slice.call(device.querySelectorAll('.led'));
    const dial = device.querySelector('.dial');
    const readout = device.querySelector('.dial-readout .val');

    const sync = () => {
      const litCount = pads.filter((p) => p.classList.contains('lit')).length;
      // brass needle sweeps across a fixed arc as more pads are inlaid
      if (dial) {
        const min = -132, max = 132; // degrees, -90 = up
        const frac = pads.length ? litCount / pads.length : 0;
        dial.style.setProperty('--needle', (min + frac * (max - min)).toFixed(1) + 'deg');
      }
      if (readout) readout.textContent = String(litCount).padStart(2, '0');
      // enamel indicator dots mirror the lit count
      leds.forEach((l, i) => l.classList.toggle('on', i < litCount));
    };

    pads.forEach((pad) => {
      pad.setAttribute('aria-pressed', pad.classList.contains('lit') ? 'true' : 'false');
      pad.addEventListener('click', () => {
        const lit = pad.classList.toggle('lit');
        pad.setAttribute('aria-pressed', lit ? 'true' : 'false');
        if (!reduce) {
          pad.animate(
            [{ transform: 'translateY(2px)' }, { transform: 'translateY(0)' }],
            { duration: 120, easing: 'cubic-bezier(.2,.8,.2,1)' }
          );
        }
        sync();
      });
    });

    sync();
  });
}

/* ---- cursor tilt for physical mass (max 2deg) ---- */
function initDeviceTilt(root, reduce) {
  if (reduce) return;
  root.querySelectorAll('.device').forEach((device) => {
    device.style.transition = 'transform .25s ease';
    device.addEventListener('mousemove', (ev) => {
      const r = device.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width - 0.5;
      const y = (ev.clientY - r.top) / r.height - 0.5;
      device.style.transform =
        'perspective(1100px) rotateY(' + (x * 2).toFixed(2) + 'deg) rotateX(' + (-y * 2).toFixed(2) + 'deg)';
    });
    device.addEventListener('mouseleave', () => {
      device.style.transform = 'perspective(1100px) rotateY(0) rotateX(0)';
    });
  });
}

/* ---- accordion (keeps aria-expanded in sync with the .open state) ---- */
function initAccordion(root) {
  root.querySelectorAll('.acc-head').forEach((head) => {
    const item = head.closest('.acc-item');
    head.setAttribute('aria-expanded', item && item.classList.contains('open') ? 'true' : 'false');
    head.addEventListener('click', () => {
      if (!item) return;
      const open = item.classList.toggle('open');
      head.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
}

/* ---- tabs: full ARIA tablist - roles/selection reflected on load, roving
   tabindex + arrow-key roving, panels toggled by aria-controls / data-tab ---- */
function initTabs(root) {
  root.querySelectorAll('.tabs').forEach((tabs) => {
    const buttons = Array.prototype.slice.call(tabs.querySelectorAll('.tab'));
    if (!buttons.length) return;
    const scope = tabs.parentElement || document;

    const activate = (tab, focus) => {
      buttons.forEach((t) => {
        const on = t === tab;
        t.classList.toggle('active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.setAttribute('tabindex', on ? '0' : '-1');
      });
      const target = tab.getAttribute('data-tab') || tab.getAttribute('aria-controls');
      if (target) {
        scope.querySelectorAll('[data-tab-panel]').forEach((panel) => {
          panel.hidden = panel.getAttribute('data-tab-panel') !== target;
        });
        const byId = document.getElementById(target);
        if (byId && byId.classList.contains('tab-panel')) {
          scope.querySelectorAll('.tab-panel').forEach((p) => { p.hidden = (p !== byId); });
        }
      }
      if (focus) tab.focus();
    };

    buttons.forEach((tab, i) => {
      if (!tab.hasAttribute('role')) tab.setAttribute('role', 'tab');
      const on = tab.classList.contains('active');
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
      tab.setAttribute('tabindex', on ? '0' : '-1');
      tab.addEventListener('click', () => activate(tab, false));
      tab.addEventListener('keydown', (e) => {
        let next = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = buttons[(i + 1) % buttons.length];
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = buttons[(i - 1 + buttons.length) % buttons.length];
        else if (e.key === 'Home') next = buttons[0];
        else if (e.key === 'End') next = buttons[buttons.length - 1];
        if (next) { e.preventDefault(); activate(next, true); }
      });
    });

    if (!buttons.some((t) => t.classList.contains('active'))) activate(buttons[0], false);
  });
}

/* ---- disclosure: dropdowns + modal open/close ---- */
function initDisclosure(root) {
  root.querySelectorAll('[data-dropdown]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const dd = trigger.closest('.dropdown');
      if (dd) dd.classList.toggle('open');
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown.open').forEach((dd) => dd.classList.remove('open'));
  });

  // modal: open/close with focus management + a Tab focus trap
  let lastFocused = null;
  const panelOf = (scrim) => scrim.querySelector('.modal, .dialog') || scrim;
  const focusablesIn = (el) => Array.prototype.slice.call(el.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )).filter((n) => n.offsetWidth || n.offsetHeight || n.getClientRects().length);

  const openScrim = (scrim) => {
    lastFocused = document.activeElement;
    scrim.classList.add('open');
    const panel = panelOf(scrim);
    const f = focusablesIn(panel);
    if (f.length) f[0].focus();
    else { panel.setAttribute('tabindex', '-1'); panel.focus(); }
  };
  const closeScrim = (scrim) => {
    scrim.classList.remove('open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    lastFocused = null;
  };

  root.querySelectorAll('[data-open-modal]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const sel = trigger.getAttribute('data-open-modal');
      const scrim = sel && document.querySelector(sel);
      if (scrim) openScrim(scrim);
    });
  });
  root.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const scrim = btn.closest('.scrim');
      if (scrim) closeScrim(scrim);
    });
  });
  root.querySelectorAll('.scrim').forEach((scrim) => {
    scrim.addEventListener('click', (e) => { if (e.target === scrim) closeScrim(scrim); });
  });
  document.addEventListener('keydown', (e) => {
    const open = document.querySelector('.scrim.open');
    if (!open) return;
    if (e.key === 'Escape') { closeScrim(open); return; }
    if (e.key === 'Tab') {
      const f = focusablesIn(panelOf(open));
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
}
