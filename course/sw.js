/* Eye Training — offline service worker. Precaches the whole course on install. */
const CACHE = 'eye-training-v1';
const ASSETS = [
  "./01-hierarchy.html",
  "./02-typography.html",
  "./03-space.html",
  "./04-color.html",
  "./05-form.html",
  "./06-motion.html",
  "./07-system.html",
  "./08-taste.html",
  "./index.html",
  "./css/course.css",
  "./manifest.webmanifest",
  "./assets/fonts/literata-italic-200-900.woff2",
  "./assets/fonts/literata-normal-200-900.woff2",
  "./assets/fonts/plexmono-normal-400.woff2",
  "./assets/fonts/plexmono-normal-500.woff2",
  "./assets/fonts/plexmono-normal-600.woff2",
  "./assets/img/ch1-braun-sk4-radio-phonograph-snow-white-s-coffin.jpg",
  "./assets/img/ch1-braun-t3-pocket-radio.jpg",
  "./assets/img/ch1-church-of-the-light-ibaraki.jpg",
  "./assets/img/ch1-pantheon-rotunda-interior.jpg",
  "./assets/img/ch1-the-row-lookbook-restraint-debut-collections.jpg",
  "./assets/img/ch1-under-the-wave-off-kanagawa-the-great-wave.jpg",
  "./assets/img/ch2-braun-aw-10-wristwatch.jpg",
  "./assets/img/ch2-seagram-building.jpg",
  "./assets/img/ch3-farnsworth-house.jpg",
  "./assets/img/ch3-friendship.jpg",
  "./assets/img/ch3-herm-s-carr-jeu-des-omnibus-et-dames-blanches-fi.jpg",
  "./assets/img/ch3-iphone-os-1-springboard-home-screen.jpg",
  "./assets/img/ch3-katsura-imperial-villa.jpg",
  "./assets/img/ch3-mercedes-benz-230-sl-pagoda-w113.jpg",
  "./assets/img/ch3-range-rover-classic-two-door.jpg",
  "./assets/img/ch3-ry-an-ji-karesansui-rock-garden.jpg",
  "./assets/img/ch3-salk-institute-for-biological-studies.jpg",
  "./assets/img/ch3-shaker-peg-rail-ladder-back-chairs-mount-lebanon.jpg",
  "./assets/img/ch3-vitsoe-606-universal-shelving-system.jpg",
  "./assets/img/ch3-yohji-yamamoto-paris-debut-all-black-oversized-s.jpg",
  "./assets/img/ch4-a-p-c-raw-selvedge-denim-new-standard-jean.jpg",
  "./assets/img/ch4-barcelona-pavilion-german-pavilion-1929-internat.jpg",
  "./assets/img/ch4-bloomberg-terminal.jpg",
  "./assets/img/ch4-casa-gilardi-indoor-pool-room.jpg",
  "./assets/img/ch4-gulf-livery-porsche-917k.jpg",
  "./assets/img/ch4-herm-s-kelly-bag-construction-sac-d-p-ches-saddl.jpg",
  "./assets/img/ch4-herm-s-orange-box.jpg",
  "./assets/img/ch4-mercedes-benz-w25-silver-arrow.jpg",
  "./assets/img/ch4-orange-and-yellow.jpg",
  "./assets/img/ch4-therme-vals.jpg",
  "./assets/img/ch4-wassily-chair-model-b3.jpg",
  "./assets/img/ch5-audemars-piguet-royal-oak-ref-5402st-jumbo.jpg",
  "./assets/img/ch5-barcelona-chair.jpg",
  "./assets/img/ch5-burberry-trench-coat-tielocken-lineage.jpg",
  "./assets/img/ch5-ferrari-open-gate-manual-shifter-308-gtb.jpg",
  "./assets/img/ch5-jaguar-e-type-series-1-fixed-head-coup.jpg",
  "./assets/img/ch5-lamborghini-miura-p400.jpg",
  "./assets/img/ch5-noguchi-coffee-table-in-50.jpg",
  "./assets/img/ch5-untitled-stack.jpg",
  "./assets/img/ch5-villa-la-rotonda-villa-almerico-capra.jpg",
  "./assets/img/ch5-villa-savoye.jpg",
  "./assets/img/ch5-wishbone-chair-ch24.jpg",
  "./assets/img/ch6-anderson-sheppard-drape-cut.jpg",
  "./assets/img/ch6-anglepoise-original-1227-lamp.jpg",
  "./assets/img/ch6-citro-n-ds-19.jpg",
  "./assets/img/ch6-eames-lounge-chair-670-ottoman-671.jpg",
  "./assets/img/ch6-mercedes-benz-w123-door-bank-vault-close.jpg",
  "./assets/img/ch6-rubinacci-london-house-neapolitan-jacket-spalla.jpg",
  "./assets/img/ch6-solomon-r-guggenheim-museum-new-york-rotunda-ram.jpg",
  "./assets/img/ch6-webos-card-multitasking-palm-pre.jpg",
  "./assets/img/ch7-abbey-of-our-lady-of-nov-dv-r.jpg",
  "./assets/img/ch7-henry-poole-dinner-suit-the-first-dinner-jacket.jpg",
  "./assets/img/ch7-maison-martin-margiela-blank-white-label-with-fo.jpg",
  "./assets/img/ch7-singer-vehicle-design-reimagined-porsche-911.jpg",
  "./assets/img/ch7-usm-haller-modular-furniture-system.jpg",
  "./assets/img/ch8-cora-full.jpg",
  "./assets/img/ch8-cora-hero.jpg",
  "./assets/img/ch8-designjoy-full.jpg",
  "./assets/img/ch8-designjoy-hero.jpg",
  "./assets/img/ch8-hermes-full.jpg",
  "./assets/img/ch8-hermes-hero.jpg",
  "./assets/img/ch8-lefos-app.jpg",
  "./assets/img/ch8-lefos-full.jpg",
  "./assets/img/ch8-lefos-hero.jpg",
  "./assets/img/ch8-mymind-full.jpg",
  "./assets/img/ch8-mymind-hero.jpg",
  "./assets/img/ch8-torque-og.jpg",
  "./assets/video/ch1-church-of-the-light.mp4",
  "./assets/video/ch3-katsura-veranda.mp4",
  "./assets/video/ch6-anglepoise.mp4",
  "./assets/video/ch6-citroen-ds.mp4",
  "./assets/video/ch6-eames-orbit.mp4",
  "./assets/video/ch7-porsche-911.mp4",
  "./assets/icon-180.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png"
];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // Add individually so one failure doesn't abort the whole precache.
    await Promise.allSettled(ASSETS.map((u) => cache.add(u)));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith((async () => {
    const cached = await caches.match(e.request, { ignoreSearch: true });
    if (cached) return cached;
    try {
      const res = await fetch(e.request);
      const cache = await caches.open(CACHE);
      cache.put(e.request, res.clone());
      return res;
    } catch (err) {
      // Offline and uncached: fall back to the index for navigations.
      if (e.request.mode === 'navigate') {
        const idx = await caches.match('./index.html');
        if (idx) return idx;
      }
      throw err;
    }
  })());
});
