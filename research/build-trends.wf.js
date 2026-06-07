export const meta = {
  name: 'next-ui-trends',
  description: 'Fan out 20 subagents to design + build one beautiful example page each for the post-Liquid-Glass UI trend',
  phases: [
    { title: 'Design+Build', detail: '20 agents, one self-contained trend page each' },
  ],
}

const OUT = '/Users/notshake/liquid-glass-next/pages'

// 20 distinct "next trend" hypotheses, each a deliberate move away from / beyond Apple Liquid Glass.
const TRENDS = [
  { n: 1,  slug: 'spatial-depth',       name: 'Volumetric Depth',          hint: 'Multi-layer parallax with real depth-of-field. Cards float at different Z planes, mouse/scroll drives perspective, far layers blur. The opposite of glass-as-flat-sheet: glass becomes literal stacked space.', palette: 'deep indigo to violet, cool cyan rim light' },
  { n: 2,  slug: 'neo-tactile',         name: 'Neo-Tactile / Honest Materials', hint: 'Buttons that look physically pressable — embossed, debossed, soft contact shadows, felt/paper/aluminium textures. A reaction against frictionless glass: tactility, weight, satisfying press states.', palette: 'warm paper cream, graphite, single vivid action color' },
  { n: 3,  slug: 'bioluminescent',      name: 'Bioluminescent Living Glow', hint: 'Near-black organic canvas with glowing veins, reactive light that follows the cursor like deep-sea life. Light is emitted from within elements, not refracted through them.', palette: 'abyssal black-teal, electric cyan, jellyfish magenta' },
  { n: 4,  slug: 'soft-matter',         name: 'Soft Matter / Gummy UI',    hint: 'Squishy jelly elements with gel highlights, gooey merge on hover, bounce/wobble physics. Everything looks edible and deformable. Claymorphism grown up.', palette: 'candy pastels, glossy highlight whites' },
  { n: 5,  slug: 'kinetic-type',        name: 'Kinetic Typography-First',  hint: 'Giant variable type IS the layout. Words scale, track, and animate on scroll; imagery is secondary. Editorial, loud, motion-driven.', palette: 'paper white, ink black, one hot accent' },
  { n: 6,  slug: 'generative-adaptive', name: 'Generative Adaptive UI',    hint: 'The interface visibly composes itself: a shifting modular grid that reflows, modules that morph to context, a sense of an AI arranging the page live. Show the assembly.', palette: 'soft neutral surfaces, signal-blue, generative accent gradients' },
  { n: 7,  slug: 'holographic-foil',    name: 'Holographic Iridescence',   hint: 'Trading-card foil: shifting rainbow sheen that moves with tilt/cursor, refractive prism edges, conic-gradient holo surfaces. Specular, premium, alive.', palette: 'iridescent rainbow over charcoal, silver foil' },
  { n: 8,  slug: 'riso-grain',          name: 'Riso Grain / Tactile Print', hint: 'Risograph print aesthetic: heavy film grain, halftone dots, overprint multiply blends, slight off-register misalignment, limited spot inks. Screens that feel printed.', palette: 'riso fluoro pink, federal blue, paper stock cream' },
  { n: 9,  slug: 'spatial-ar',          name: 'Depth-Aware Spatial (AR-native)', hint: 'visionOS-beyond: panels truly floating in space over a passthrough-like backdrop, volumetric soft shadows, gaze/hover targets that bloom, content anchored in 3D not on a page.', palette: 'translucent neutral panels, warm passthrough backdrop, focus-glow white' },
  { n: 10, slug: 'anti-design',         name: 'Maximalist Anti-Design',    hint: 'Intentional tension: clashing type, dense overlap, raw HTML brutalism dressed up, visible structure, default-ish system fonts weaponized. Anti-polish as the new polish.', palette: 'high-contrast primaries, web-safe blue links, stark white' },
  { n: 11, slug: 'liquid-metal',        name: 'Liquid Metal / Chrome',     hint: 'Mercury and molten chrome: reflective metallic surfaces, flowing liquid-metal blobs, environment-mapped specular. T-1000 made into UI. The heavy, reflective successor to light glass.', palette: 'gunmetal, mercury silver, oily blue-violet reflections' },
  { n: 12, slug: 'calm-eink',           name: 'Ambient Calm / E-ink',      hint: 'Low-stimulation paper-white interface, near-monochrome, slow deliberate motion, generous rest. A wellness-era backlash against maximal glassy spectacle. Quiet software.', palette: 'e-ink paper, soft graphite, one muted sage' },
  { n: 13, slug: 'tangible-data',       name: 'Tangible Data',             hint: 'Data rendered as physical objects with weight and dimension: stacked blocks, extruded bars, draggable tokens with mass. Charts you could pick up. Dimensional data-physicalization.', palette: 'concrete grey, structural orange, blueprint blue' },
  { n: 14, slug: 'aurora-mesh',         name: 'Aurora Mesh Fields',        hint: 'Animated mesh-gradient color clouds drifting behind crisp content. Soft, atmospheric, ever-shifting light fields. The gradient as living weather.', palette: 'aurora teal-violet-rose mesh over near-black' },
  { n: 15, slug: 'frutiger-aero',       name: 'Frutiger Aero Revival',     hint: 'Y2K optimism returns: glossy water droplets, bubbles, lush nature photography, skeuomorphic gloss, sky gradients, hopeful eco-tech. 2007 Vista/Aqua nostalgia, modernized.', palette: 'sky blue, leaf green, glossy white, water aqua' },
  { n: 16, slug: 'humanist-hand',       name: 'Humanist / Hand-Drawn',     hint: 'Imperfect human warmth: sketchy hand-drawn strokes, slight wobble, handwriting, marker fills, off-grid placement. A counter to machine-perfect glass. Designed by a person, visibly.', palette: 'sketchbook off-white, ink navy, marker coral + highlighter yellow' },
  { n: 17, slug: 'variable-fluid-type', name: 'Fluid Variable Type',       hint: 'Type that breathes: weight, width and optical size morph live on scroll, hover, and proximity. The letterforms themselves are the interaction. Hyper-typographic.', palette: 'monochrome ink on bone, one molten-orange reactive accent' },
  { n: 18, slug: 'crystalline',         name: 'Crystalline / Faceted Gem',  hint: 'Sharp refractive facets and prismatic edges — gemstone surfaces, cut-crystal panels, hard specular glints. Glass crystallized: angular, faceted, jewel-like, not smooth.', palette: 'obsidian, amethyst, prismatic edge-light spectrum' },
  { n: 19, slug: 'synesthetic',         name: 'Synesthetic Sound-Reactive', hint: 'Visuals driven by rhythm/sound: equalizer-pulsed elements, beat-reactive bloom, waveforms as layout, audio as a first-class design input. UI you can almost hear.', palette: 'club black, neon spectrum bars, bass-pulse magenta' },
  { n: 20, slug: 'dimensional-paper',   name: 'Dimensional Paper Cutout',  hint: 'Layered paper-cutout depth: stacked die-cut shapes, crisp drop shadows, folds and tabs, pop-up-book parallax. Tactile craft and warmth, built from layers of stock.', palette: 'warm paper layers, terracotta, sage, soft shadow grey' },
]

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['number','slug','name','tagline','essence','lineage','whyNext','palette','signatureTechniques','filePath'],
  properties: {
    number: { type: 'integer' },
    slug: { type: 'string' },
    name: { type: 'string' },
    tagline: { type: 'string', description: '4-8 word punchy tagline' },
    essence: { type: 'string', description: '2-3 sentence description of the trend' },
    lineage: { type: 'string', description: 'what it evolves from or reacts against, vs Liquid Glass' },
    whyNext: { type: 'string', description: '1-2 sentences on why this could be the next dominant trend' },
    palette: { type: 'array', items: { type: 'string' }, description: '4-6 representative hex colors actually used in the page' },
    signatureTechniques: { type: 'array', items: { type: 'string' }, description: '3-5 concrete CSS/UX techniques that define the look' },
    filePath: { type: 'string' },
  },
}

phase('Design+Build')

const SHARED = `You are an elite UI designer + front-end engineer. The reigning UI trend is Apple "Liquid Glass" (translucent, blurred, refractive, light-bending frosted layers with specular highlights, used across iOS/macOS 2025). Your job is to design and BUILD ONE complete, genuinely beautiful example web page that embodies a DIFFERENT, FORWARD-LOOKING trend — a credible successor to Liquid Glass.

HARD REQUIREMENTS:
- Produce a SINGLE self-contained .html file: all CSS in one <style> tag, any JS in one <script> tag. No external assets, no network fonts except Google Fonts via <link> if you want (allowed). No build step. No frameworks.
- It must be a real, polished EXAMPLE PAGE — a believable product/landing/app screen for a fictional brand that lives this aesthetic. Include: a nav/header, a hero with headline + sub + CTA, at least 2 content sections (e.g. feature cards, a pricing or stats block, a footer). Real-feeling copy, not lorem ipsum.
- Commit FULLY to the assigned aesthetic. It must be instantly distinguishable from the other 19 trends and from Liquid Glass. Push it hard and tastefully.
- Add tasteful motion: entrance animations, hover states, and at least one signature interactive/animated effect that defines the trend (CSS animations, transitions, or a small vanilla-JS effect — e.g. cursor-reactive light, scroll parallax, tilt, audio-less rhythm pulse via setInterval, etc.). Respect prefers-reduced-motion.
- Responsive enough to look good at 1280px wide (primary) and degrade gracefully.
- Aim for ~400-900 lines of clean, well-structured HTML/CSS/JS. Quality over length.
- Use the EXACT output path given. Write the file with the Write tool, then return the structured metadata.

DO NOT just make a generic dark gradient page. Each trend has a strong, specific visual language — realize it precisely.`

const results = await pipeline(
  TRENDS,
  (t) => {
    const filePath = `${OUT}/${String(t.n).padStart(2,'0')}-${t.slug}.html`
    return agent(
      `${SHARED}

YOUR ASSIGNED TREND #${t.n}: "${t.name}"
Aesthetic brief: ${t.hint}
Suggested palette direction (you may refine): ${t.palette}

Write the finished page to EXACTLY this path: ${filePath}

After writing, return the metadata object. filePath must be "${filePath}".`,
      { label: `${String(t.n).padStart(2,'0')}-${t.slug}`, phase: 'Design+Build', schema: SCHEMA }
    )
  }
)

return results.filter(Boolean)
