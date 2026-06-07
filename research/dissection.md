# Dissecting Apple "Liquid Glass"

Liquid Glass is the design language Apple rolled across iOS 26 / macOS Tahoe in 2025 — the
biggest visual reset since iOS 7's flattening in 2013. Where iOS 7 took depth *away*, Liquid
Glass puts a very specific kind of depth back: not skeuomorphic texture, but **optical
material**. The interface behaves like a sheet of real glass floating above your content.

## The five mechanics that actually define it

1. **Real-time refraction, not just blur.** Earlier "glassmorphism" was a backdrop-blur plus a
   translucent fill. Liquid Glass adds *lensing* — edges bend and magnify the content behind them,
   like the rim of an actual glass lens. The bend is strongest at the curved edges and falls off
   toward the center.

2. **Specular highlights + dynamic light response.** Controls catch a moving highlight along their
   rim. The light source shifts with device tilt and with the content scrolling underneath, so the
   material reads as physically present, not painted.

3. **Adaptive contrast / legibility.** The layer continuously samples what's behind it and adjusts
   its own tint and the text color on top so labels stay readable over any wallpaper or video. The
   material is *aware* of its background.

4. **Concentricity & the squircle.** Everything is built on Apple's continuous-curvature corners
   (the superellipse "squircle"), and nested elements share concentric radii. Glass pieces are
   lozenge / pill shaped and morph fluidly between states rather than hard-cutting.

5. **Fluid morphing motion.** Tab bars shrink on scroll, buttons swell on press, sheets stretch
   like a viscous liquid. The "liquid" is in the *motion model* as much as the look — elements
   feel like they're made of a soft, surface-tension-bound fluid.

## Why it caught on — and its tensions

- **Hierarchy through depth.** Floating a translucent control layer over content gives instant
  z-order legibility without heavy chrome. Chrome gets out of the way without disappearing.
- **It signals "premium / spatial."** It's continuous with visionOS and reads as the look of
  spatial computing, which is where Apple is steering.
- **The costs are real:** GPU-expensive (blur + refraction + adaptive sampling every frame),
  accessibility friction (contrast, motion sensitivity), and a strong **sameness** — once every
  app is a frosted pane, the material stops differentiating anyone. It also leans on Apple's
  hardware/OS compositor; faithful reproduction on the web is costly and approximate.

## The opening for "what's next"

Trends move by **reaction** and by **escalation**. Liquid Glass is *light, translucent, smooth,
frictionless, optical, machine-perfect, and uniform.* The successors will pull on exactly those
axes:

- **Against translucency →** honest opaque materials, paper, metal, e-ink calm.
- **Against frictionless smoothness →** tactility, weight, squish, hand-made imperfection.
- **Escalating the optics →** crystalline facets, holographic foil, liquid metal, true volumetric depth.
- **Against uniformity →** maximalist anti-design, riso-print texture, sound-reactive synesthesia.
- **Beyond the flat sheet →** spatial/AR-native panels, generative self-composing layouts, tangible data.

Those vectors are exactly what the 20 explorations below probe.
