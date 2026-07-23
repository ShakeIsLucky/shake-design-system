export const meta = {
  name: 'author-chapters',
  description: 'Author the 7 chapter HTML pages of the UI fundamentals course',
  phases: [{ title: 'Author', detail: 'one agent per chapter' }],
}

const BASE = '/Users/notshake/Projects/shake-design-system/course'

const CHAPTER_MAP = [
  { n: 1, file: '01-hierarchy.html', title: 'Hierarchy', sub: 'One thing first. The squint test.' },
  { n: 2, file: '02-typography.html', title: 'Typography', sub: 'Type is the interface.' },
  { n: 3, file: '03-space.html', title: 'Space & grid', sub: 'Whitespace is a material.' },
  { n: 4, file: '04-color.html', title: 'Color & material', sub: 'Neutrals, one accent, honest surfaces.' },
  { n: 5, file: '05-form.html', title: 'Form & affordance', sub: 'Proportion systems. Controls that announce themselves.' },
  { n: 6, file: '06-motion.html', title: 'Motion & feel', sub: 'Easing, weight, restraint.' },
  { n: 7, file: '07-system.html', title: 'A system of your own', sub: 'Constraints as identity.' },
  { n: 8, file: '08-taste.html', title: 'Reading your own taste', sub: 'Your favorite sites, dissected.' },
]

const VIDEOS = {
  1: ['assets/video/ch1-church-of-the-light.mp4 — the cruciform light slit slowly intensifying (Tadao Ando, Church of the Light, 1989)'],
  3: ['assets/video/ch3-katsura-veranda.mp4 — walking-pace tracking shot along the Katsura Imperial Villa veranda (ma)'],
  6: [
    'assets/video/ch6-eames-orbit.mp4 — slow studio orbit of the Eames Lounge Chair (hidden compliance)',
    'assets/video/ch6-citroen-ds.mp4 — Citroën DS rising on its hydropneumatic suspension (damped motion reads as quality)',
    'assets/video/ch6-anglepoise.mp4 — hand repositioning an Anglepoise 1227; sprung arms settle instantly (weighted, damped motion)',
  ],
  7: ['assets/video/ch7-porsche-911.mp4 — air-cooled 911 side profile at constant speed, misty road (one silhouette, defended for decades)'],
}

const FIVE_SYSTEMS = `Shake's five hand-built design systems (for the personal tie-in section):
1. racing-green — dark editorial flagship: deep racing-green panels #0D2A1B, ivory text, one Onda-gold accent #E8B23A, zero border-radius, Freight serif + IBM Plex Mono, dense briefs/digests/decks.
2. neo-tactile — neumorphic re-skin: warm cream paper #e9e3d6, emboss/deboss surfaces with 2-3px travel, rounded corners, single vermilion action color #e5462b, Fraunces + Space Grotesk.
3. calm-ink — e-ink reading system: paper #eceae3, near-black ink (never #000), single sage accent #7f8c72, paper grain, deliberately slow motion (1.1s transitions). THIS COURSE IS SET IN IT.
4. foldwell — die-cut paper craft: three warm paper stocks, four accents (terracotta/sage/sky/mustard), rotated tabs, hard offset shadows, playful boing easing.
5. aperture — spatial-AR glass: warm room backdrop, translucent floating panels, 4-layer volumetric shadows, single orange accent #ff7a45, gaze-reactive bloom.`

const STYLE_CONTRACT = `VOICE — write like a good museum wall label: concrete, specific, unhurried. Facts and numbers over adjectives. Short declarative sentences. Second person sparingly. BANNED: "isn't just / not just X but Y", "it's about", "delve", "elevate", marketing triplets ("clean, clear, and confident"), starting consecutive sections with the same word, more than one em dash per paragraph.

TEXT BUDGET — at most ~550 words of body prose for the whole chapter (excluding figcaptions, demo captions, vocabulary list). The lede is at most 45 words. Each section gets at most two short paragraphs. The plates carry the argument; the prose only aims the eye.

CAPTIONS — every plate uses this exact pattern:
<figure class="plate"><div class="frame"><img src="assets/img/FILE.png" alt="DESCRIPTIVE ALT" loading="lazy"></div>
<figcaption><b>Name</b> <span class="meta">· year · designer · AI plate</span><br>One caption sentence that tells the reader what decision to look at — at most 30 words, drawn from the reference's "lesson"/"why" facts.</figcaption></figure>
For videos use the same .plate pattern with <video src="assets/video/FILE.mp4" autoplay muted loop playsinline></video> inside .frame, and "· AI film" in the meta.
Side-by-side pairs: wrap two .plate in <div class="plates two">…</div>. Comparisons with verdict tags: <div class="compare"> with <span class="tag">before</span> / <span class="tag yes">after</span> above each plate.

LIVE DEMOS (css-recreation items) — rebuild the UI moment inside:
<div class="demo"><div class="demo-stage"> …recreation… </div></div>
<p class="demo-caption"><b>Name · year.</b> What to notice. Built live in CSS — inspect it.</p>
Namespace every demo class with .ch{N}- prefixes. Define demo styles in ONE <style> block in <head>. Faithful colors and proportions matter more than completeness; approximate the original's typeface with the bundled fonts (Literata, IBM Plex Mono) or system-ui and SAY SO in the demo caption when it matters (e.g. GOV.UK's New Transport). Interactivity (hover, click, toggles) is encouraged where the original was interactive — tiny inline <script> at end of body, vanilla JS only.

SVG RECREATIONS (svg-recreation items) — hand-code an inline <svg viewBox="…"> diagram inside a .plate .frame (white or paper background rect first). Use the reference's fal_prompt field as the spec for what to draw. Flat fills, precise geometry, no filters. Caption it like a plate but with "· SVG study" in the meta.

OFFLINE — HARD RULE: zero network requests. The ONLY stylesheet link is css/course.css. No external URLs in any src/href/@import anywhere. No web fonts beyond the bundled ones (already in course.css). Sources may be MENTIONED as plain text but never linked.

ACCESSIBILITY — alt text on every img; decorative SVGs get aria-hidden="true" with a preceding visually meaningful caption; demos keyboard-reachable where interactive (use <button> for toggles).`

const SKELETON = (c, prev, next) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>0${c.n} · ${c.title} · Eye Training</title>
<link rel="stylesheet" href="css/course.css" />
<style>/* chapter demo styles, all classes prefixed .ch${c.n}- */</style>
</head>
<body>
<nav class="course-nav"><div class="wrap">
  <a href="index.html">Eye Training</a>
  <span class="which">Chapter ${c.n} of 8</span>
  <a href="${next ? next.file : 'index.html'}">${next ? 'Next →' : 'Index'}</a>
</div></nav>
<header class="page-header wrap">
  <span class="eyebrow">Chapter ${c.n} · about 8 minutes</span>
  <h1>…</h1>
  <p class="lede">…</p>
</header>
<main class="wrap">
  …sections…
  <div class="takeaway"><span class="eyebrow">The takeaway</span><p>…pedagogy one_line_takeaway…</p></div>
  …"In your systems" section…
  <div class="exercise"><span class="eyebrow">Five-minute exercise</span><p>…pedagogy exercise…</p></div>
  <section><h2>Vocabulary</h2>…key_concepts as a compact list with sources…<p class="src">Sources: …</p></section>
</main>
<footer class="chapter-end"><div class="wrap">
  ${prev ? `<a class="prev" href="${prev.file}"><span class="eyebrow">Previous</span>0${prev.n} · ${prev.title}</a>` : `<a class="prev" href="index.html"><span class="eyebrow">Back</span>Index</a>`}
  ${next ? `<a class="next" href="${next.file}"><span class="eyebrow">Next</span>0${next.n} · ${next.title}</a>` : `<a class="next" href="index.html"><span class="eyebrow">Done</span>Back to index</a>`}
</div></footer>
</body>
</html>`

const RESULT_SCHEMA = {
  type: 'object',
  properties: {
    file: { type: 'string' },
    word_count: { type: 'number' },
    n_plates: { type: 'number' },
    n_demos: { type: 'number' },
    n_svgs: { type: 'number' },
    n_videos: { type: 'number' },
    excluded_images: { type: 'array', items: { type: 'string' } },
    notes: { type: 'string' },
  },
  required: ['file', 'word_count', 'n_plates', 'n_demos', 'n_svgs', 'n_videos', 'excluded_images', 'notes'],
}

phase('Author')
const results = await parallel(CHAPTER_MAP.slice(0, 7).map((c, i) => () => {
  const prev = CHAPTER_MAP[i - 1] || null
  const next = CHAPTER_MAP[i + 1] || null
  const vids = (VIDEOS[c.n] || []).map((v) => '- ' + v).join('\n') || '(none for this chapter)'
  return agent(
    `You are authoring chapter ${c.n} of "Eye Training", a 7-chapter offline HTML course teaching UI design fundamentals through real pre-2023 designs across software, furniture, architecture, art, cars, and fashion. The learner is Shake, a designer-engineer who hand-codes design systems in pure CSS and ships iOS apps; he is here to train his eye, not to learn tools.

Working directory: ${BASE}
Write EXACTLY ONE file: ${BASE}/${c.file}

CHAPTER: ${c.n} — ${c.title} (${c.sub})

DATA (read these first):
1. ${BASE}/tools/references.json — use items where chapter == ${c.n}. Each item: name/year/designer/domain/lesson/why, visual_treatment (fal-photo → embed its "img" path; css-recreation → build live demo; svg-recreation → hand-code SVG; spec in fal_prompt), and "img" path when fal-photo.
2. ${BASE}/tools/pedagogy.json — use chapter_takeaways for chapter ${c.n}: one_line_takeaway (the .takeaway block), key_concepts (Vocabulary section), exercise (the .exercise block, lightly edited for flow).

SELECTION — you have ~11-17 references; use the best 9-13. Cover at least 4 different domains. Order for teaching: open with the most arresting non-software plate as a hook, then build the argument, placing live software demos in the middle, and close before the takeaway with the most timeless object. You may pair items into .plates.two or .compare when the juxtaposition itself teaches (e.g. across domains: a Braun control panel next to a homepage).

VIDEOS available for this chapter (use each at most once, as a .plate):
${vids}

IMAGE VERIFICATION — before captioning any image, use the Read tool on the actual png file and look at it. The caption must match what is visible. If an image clearly fails its teaching purpose, exclude it and list it in excluded_images.

${STYLE_CONTRACT}

${FIVE_SYSTEMS}

PERSONAL TIE-IN — after the .takeaway, write a short section titled "In your systems" (≤120 words): apply this chapter's lens to the most relevant of his five systems — name the system, name the specific token or pattern (e.g. calm-ink's 1.1s transitions, racing-green's single gold accent, neo-tactile's 2-3px emboss travel), and pose one pointed question he should ask of his own work. For chapter 7, treat all five systems as one portfolio and ask what single rule unifies them.

SKELETON — start from exactly this structure (fill the …; keep nav/footer hrefs verbatim):
${SKELETON(c, prev, next)}

QUALITY BAR — this page must read like it shipped from the calm-ink system itself: restrained, precise, no decoration without argument. Demos must be genuinely faithful recreations someone could learn from by inspecting. When done, count your prose words honestly and return the summary.`,
    { label: `ch${c.n}:${c.title}`, phase: 'Author', schema: RESULT_SCHEMA }
  )
}))

const ok = results.filter(Boolean)
log(`authored ${ok.length}/7 chapters`)
return ok