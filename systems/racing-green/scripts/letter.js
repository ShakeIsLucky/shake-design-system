/* ============================================================
   RACING-GREEN — scripts/letter.js
   The "letter" affordances for Hermes digest pages.

     import { initLetter } from "./letter.js";
     initLetter();

   Progressive enhancement only: pages without the footer slots
   (or readers with JS off) render exactly as before. Both marks
   are static — no motion, nothing to reduce.
   ============================================================ */

/* The letter knows when it was opened. The footer carries a span with
   data-printed-utc (set at generation time); we add the reader's local
   opened time beside it. Unparseable stamp: nothing happens. */
export function initOpened(selector = '.opened[data-printed-utc]') {
  const el = document.querySelector(selector);
  if (!el) return;
  const printed = new Date(el.dataset.printedUtc);
  if (Number.isNaN(printed.getTime())) return;
  const now = new Date();
  const pad = (n) => (n < 10 ? '0' : '') + n;
  el.textContent = 'opened ' + pad(now.getHours()) + ':' + pad(now.getMinutes());
}

/* Daily postmark: a hairline franking mark, unique to each letter and
   stable on reload (rotation seeded by kind+date). Series name curves
   along the top arc; number and date sit in the middle. Drawn in
   currentColor so the light variant flips it with the tokens. */
export function initPostmark(selector = '.postmark[data-kind][data-date]') {
  const el = document.querySelector(selector);
  if (!el) return;
  const kind = el.dataset.kind, date = el.dataset.date, no = el.dataset.no;
  let h = 0;
  for (const c of kind + date) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const angle = (h % 15) - 7;
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const center = [no ? '№ ' + no : null, date].filter(Boolean);
  el.innerHTML =
    `<svg viewBox="0 0 76 76" width="64" height="64" aria-hidden="true" style="transform:rotate(${angle}deg)">` +
    `<circle cx="38" cy="38" r="36" fill="none" stroke="currentColor" stroke-width="1"/>` +
    `<circle cx="38" cy="38" r="29" fill="none" stroke="currentColor" stroke-width="0.5" opacity=".55"/>` +
    `<path id="pm-arc" d="M 8 38 a 30 30 0 1 1 0 0.01" fill="none"/>` +
    `<text font-family="IBM Plex Mono, ui-monospace, monospace" font-size="6.5" letter-spacing="1" fill="currentColor">` +
    `<textPath href="#pm-arc" startOffset="25%" text-anchor="middle">${esc(kind.toUpperCase())}</textPath></text>` +
    center.map((t, i) =>
      `<text x="38" y="${41 + (i - (center.length - 1) / 2) * 11}" text-anchor="middle" ` +
      `font-family="IBM Plex Mono, ui-monospace, monospace" font-size="7.5" fill="currentColor">${esc(t)}</text>`
    ).join('') +
    `</svg>`;
}

export function initLetter() {
  initOpened();
  initPostmark();
}
