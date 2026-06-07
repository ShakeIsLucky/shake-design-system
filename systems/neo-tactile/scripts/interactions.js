// Shake System v2 — tactile interactions
//   - count-up on .stat .num (data-to / data-suffix)
//   - rhythmic sequencer on .pad-grid (.pad -> .lit, LED meter follows)
//   - cursor-tilt on .device (sense of physical mass)
//   - disclosure: .accordion, .tabs, .dropdown, modal open/close
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
  const nums = root.querySelectorAll('.stat .num[data-to], .num[data-to]');
  if (!nums.length) return;

  const run = (el) => {
    const to = parseFloat(el.getAttribute('data-to')) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    if (reduce) { el.innerHTML = '<em>' + to + '</em>' + suffix; return; }
    const start = performance.now(), dur = 1100;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(eased * to);
      el.innerHTML = '<em>' + val + '</em>' + suffix;
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

/* ---- rhythmic sequencer on a .pad-grid ---- */
function initSequencer(root, reduce) {
  root.querySelectorAll('.pad-grid').forEach((grid) => {
    const pads = Array.prototype.slice.call(grid.querySelectorAll('.pad'));
    if (!pads.length) return;
    const device = grid.closest('.device') || document;
    const leds = Array.prototype.slice.call(device.querySelectorAll('.led'));
    const cols = 4;
    const active = {};
    // seed a default rhythm
    [0, 5, 8, 11].forEach((i) => { if (pads[i]) active[i] = true; });

    pads.forEach((pad, i) => {
      pad.addEventListener('click', () => {
        active[i] = !active[i];
        pad.classList.add('pressed');
        setTimeout(() => pad.classList.remove('pressed'), 120);
      });
    });

    if (reduce) {
      pads.forEach((p, i) => p.classList.toggle('lit', !!active[i]));
      return;
    }

    let step = 0;
    setInterval(() => {
      const col = step % cols;
      pads.forEach((p, i) => p.classList.toggle('lit', !!active[i] && (i % cols) === col));
      if (leds.length) leds.forEach((l, li) => l.classList.toggle('on', li === (step % leds.length)));
      step++;
    }, 380);
  });
}

/* ---- cursor tilt for physical mass ---- */
function initDeviceTilt(root, reduce) {
  if (reduce) return;
  root.querySelectorAll('.device').forEach((device) => {
    device.style.transition = 'transform .25s ease';
    device.addEventListener('mousemove', (ev) => {
      const r = device.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width - 0.5;
      const y = (ev.clientY - r.top) / r.height - 0.5;
      device.style.transform = 'perspective(900px) rotateY(' + (x * 5).toFixed(2) + 'deg) rotateX(' + (-y * 5).toFixed(2) + 'deg)';
    });
    device.addEventListener('mouseleave', () => {
      device.style.transform = 'perspective(900px) rotateY(0) rotateX(0)';
    });
  });
}

/* ---- accordion ---- */
function initAccordion(root) {
  root.querySelectorAll('.acc-head').forEach((head) => {
    head.addEventListener('click', () => {
      const item = head.closest('.acc-item');
      if (item) item.classList.toggle('open');
    });
  });
}

/* ---- tabs ---- */
function initTabs(root) {
  root.querySelectorAll('.tabs').forEach((tabs) => {
    const buttons = tabs.querySelectorAll('.tab');
    buttons.forEach((tab) => {
      tab.addEventListener('click', () => {
        buttons.forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        const target = tab.getAttribute('data-tab') || tab.getAttribute('aria-controls');
        if (!target) return;
        // panels are siblings of .tabs, or anywhere matching by id / data-tab-panel
        const scope = tabs.parentElement || document;
        scope.querySelectorAll('[data-tab-panel]').forEach((panel) => {
          panel.hidden = panel.getAttribute('data-tab-panel') !== target;
        });
        const byId = document.getElementById(target);
        if (byId && byId.classList.contains('tab-panel')) {
          scope.querySelectorAll('.tab-panel').forEach((p) => { p.hidden = (p !== byId); });
        }
      });
    });
  });
}

/* ---- disclosure: dropdowns + modal open/close ---- */
function initDisclosure(root) {
  // dropdowns: a [data-dropdown] trigger toggles .open on its .dropdown parent
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

  // modals: [data-open-modal="#id"] opens, [data-close-modal] / scrim click closes
  root.querySelectorAll('[data-open-modal]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const sel = trigger.getAttribute('data-open-modal');
      const scrim = sel && document.querySelector(sel);
      if (scrim) scrim.classList.add('open');
    });
  });
  root.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const scrim = btn.closest('.scrim');
      if (scrim) scrim.classList.remove('open');
    });
  });
  root.querySelectorAll('.scrim').forEach((scrim) => {
    scrim.addEventListener('click', (e) => { if (e.target === scrim) scrim.classList.remove('open'); });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.querySelectorAll('.scrim.open').forEach((s) => s.classList.remove('open'));
  });
}
