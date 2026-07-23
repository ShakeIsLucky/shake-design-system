/* ============================================================
   THE WAR ROOM WALL · war-room.js  (ES module)

   One import, one call:
     import { initWarRoom } from "scripts/war-room.js";
     initWarRoom();

   Everything degrades: each behaviour guards its own elements, so
   a page can omit the agenda, the deck, or the checklist and the
   rest still runs. Full prefers-reduced-motion support — reveals
   resolve to their final state instantly and no timers spin.
   ============================================================ */

/* Mark the document as JS-capable the moment this module is imported.
   The .rv hidden state is gated on `html.js` in CSS, so if this module
   never loads (stale/failed pin) artifacts stay visible instead of blank. */
document.documentElement.classList.add("js");

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---- reveal: a single quiet fade-up per artifact ---- */
function initReveal(root = document) {
  const items = root.querySelectorAll(".rv");
  if (!items.length) return;
  if (REDUCED || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
  );
  items.forEach((el) => io.observe(el));
}

/* ---- flip cards: toggle aria-pressed (CSS turns the card) ---- */
function initFlipCards(root = document) {
  root.querySelectorAll(".fcard").forEach((card) => {
    card.addEventListener("click", () => {
      const on = card.getAttribute("aria-pressed") === "true";
      card.setAttribute("aria-pressed", on ? "false" : "true");
    });
  });
  // optional "shuffle the stack" control(s)
  root.querySelectorAll("[data-shuffle]").forEach((btn) => {
    const deck = root.querySelector(btn.getAttribute("data-shuffle"));
    if (!deck) return;
    btn.addEventListener("click", () => {
      const cards = Array.prototype.slice.call(deck.children);
      cards.forEach((c) => c.setAttribute("aria-pressed", "false"));
      cards.sort(() => Math.random() - 0.5).forEach((c) => deck.appendChild(c));
    });
  });
}

/* ---- agenda: scroll-spy, marker checks, live n/N counter ---- */
function initAgenda(root = document) {
  const list = root.getElementById
    ? root.getElementById("agendaList")
    : document.getElementById("agendaList");
  const railNav = document.getElementById("agendaRail");
  // chapters are the page's sections — NOT the agenda's own <li data-ch> items,
  // which carry data-ch only to map themselves to a chapter id.
  const chapters = Array.prototype.slice
    .call(document.querySelectorAll("[data-ch]"))
    .filter((el) => !el.closest("#agendaList"));

  // scroll-spy + progress
  if (list && chapters.length) {
    const items = {};
    list.querySelectorAll("li").forEach((li) => {
      items[li.getAttribute("data-ch")] = li;
    });
    const prog = document.getElementById("agendaProg");
    // total = countable chapters (a chapter may opt out with data-ch-skip)
    const total = chapters.filter((c) => !c.hasAttribute("data-ch-skip")).length;
    const skipIds = new Set(
      chapters.filter((c) => c.hasAttribute("data-ch-skip")).map((c) => c.id)
    );
    const updateProg = () => {
      if (!prog) return;
      let done = 0;
      list.querySelectorAll("li.done").forEach((li) => {
        if (!skipIds.has(li.getAttribute("data-ch"))) done++;
      });
      prog.textContent = done + "/" + total;
    };
    if (prog) prog.textContent = "0/" + total;

    // Sweep every chapter and mark any whose top has scrolled above the
    // viewport as done. Per-entry intersection transitions never fire for
    // chapters that jump straight from below-viewport to above-viewport
    // (an instant anchor jump — which is EVERY agenda click under
    // prefers-reduced-motion, since scroll-behavior is auto). Sweeping on
    // each callback + on scrollend earns those ticks too.
    const sweepDone = () => {
      let changed = false;
      chapters.forEach((c) => {
        const li = items[c.id];
        if (!li || li.classList.contains("done")) return;
        if (c.getBoundingClientRect().top < 0) {
          li.classList.add("done");
          changed = true;
        }
      });
      if (changed) updateProg();
    };

    if ("IntersectionObserver" in window) {
      const spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            const li = items[e.target.id];
            if (!li) return;
            if (e.isIntersecting) {
              Object.keys(items).forEach((k) => items[k].classList.remove("now"));
              li.classList.add("now");
            }
          });
          sweepDone();
        },
        { rootMargin: "-20% 0px -60% 0px" }
      );
      chapters.forEach((s) => spy.observe(s));
    }

    // Instant jumps (reduced-motion clicks, or landing on a #hash) settle
    // without an IO transition; scrollend catches them, with a throttled
    // scroll fallback where scrollend is unsupported.
    if ("onscrollend" in window) {
      window.addEventListener("scrollend", sweepDone, { passive: true });
    } else {
      let ticking = false;
      window.addEventListener(
        "scroll",
        () => {
          if (ticking) return;
          ticking = true;
          requestAnimationFrame(() => {
            sweepDone();
            ticking = false;
          });
        },
        { passive: true }
      );
    }
    sweepDone();
  }

  // mobile overlay
  const btn = document.getElementById("agendaBtn");
  const scrim = document.getElementById("scrim");
  if (btn && railNav) {
    const close = () => {
      railNav.classList.remove("open");
      if (scrim) scrim.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    };
    btn.addEventListener("click", () => {
      const open = railNav.classList.toggle("open");
      if (scrim) scrim.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    if (scrim) scrim.addEventListener("click", close);
    railNav.addEventListener("click", (e) => {
      if (e.target.closest("a")) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }
}

/* ---- checklist: sharpie checks that persist on the device ---- */
function initChecklists(root = document) {
  root.querySelectorAll("[data-checklist]").forEach((listEl) => {
    const key = "warroom-" + listEl.getAttribute("data-checklist");
    const progEl = document.querySelector(
      '[data-checklist-prog="' + listEl.getAttribute("data-checklist") + '"]'
    );
    const boxes = listEl.querySelectorAll('input[type="checkbox"]');
    if (!boxes.length) return;

    let saved = {};
    try {
      saved = JSON.parse(localStorage.getItem(key) || "{}");
    } catch (_) {
      saved = {};
    }

    const render = () => {
      if (!progEl) return;
      let n = 0;
      boxes.forEach((b) => {
        if (b.checked) n++;
      });
      progEl.innerHTML =
        "<b>" + n + "</b> of " + boxes.length + " pinned" +
        (n === boxes.length ? " &mdash; ship it." : "");
    };

    boxes.forEach((b) => {
      const k = b.getAttribute("data-k");
      if (k && saved[k]) b.checked = true;
      b.addEventListener("change", () => {
        if (k) {
          saved[k] = b.checked;
          try {
            localStorage.setItem(key, JSON.stringify(saved));
          } catch (_) {
            /* private mode — checks just won't persist */
          }
        }
        render();
      });
    });
    render();
  });
}

/* ---- the one public entry point ---- */
export function initWarRoom(root = document) {
  initReveal(root);
  initFlipCards(root);
  initAgenda(root);
  initChecklists(root);
}

export default initWarRoom;
