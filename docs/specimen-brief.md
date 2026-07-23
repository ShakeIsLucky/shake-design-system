# Shared specimen content — DO NOT CHANGE THE WORDS

Every frame renders THIS EXACT COPY. The whole point of the showcase is that content is
held constant and only the design system varies. Do not paraphrase, shorten, or embellish.
Only `{SYSTEM_NAME}`, `{TAGLINE}`, `{NUMBER}` and the palette/type/table rows are per-system.

The roster is three systems; `{NUMBER}` assignments are fixed: calm-ink 01 · lupine 02 · blue 03.

---

## 1. Kicker / eyebrow
ONDA STUDIOS · SPECIMEN {NUMBER} OF 03

## 2. Title (h1)
{SYSTEM_NAME}

## 3. Dek / subtitle — the system's own one-line tagline, from its README
{TAGLINE}

## 4. Lede paragraph
The same brief, set three ways. Identical words, identical structure — only the design
system changes. What moves is tone: what a page asks you to feel before you have read a
single sentence.

## 5. Stat row (three stats)
- value `03` — label `Systems`
- value `00` — label `Build steps`
- value `01` — label `Pinned SHA`

## 6. The take (callout / pull-quote — use the system's callout component)
A design system is an argument about attention. Racing-Green argues the take leads.
Foldwell argues this was made by hand. Safelight argues instrument, not document.
Pick the argument before you pick the palette.

## 7. Section heading (h2)
What stays constant

## 8. Body paragraph
Every system ships semantic CSS variables, a kitchen-sink reference page, and zero build
step. Published pages pin a forty-character commit SHA on jsDelivr rather than a moving
branch, because silent drift is the failure mode that costs the most to find later.

## 9. List (four items)
- Semantic tokens only — never a raw hex in page markup
- One accent per system, spent sparingly
- Hairline rules and generous quiet over borders and boxes
- Theme choice persists per device, where the system has two modes

## 10. Section heading (h2)
Palette

Then: the system's REAL colour tokens as swatches, each labelled with its token name and
hex. Use the actual values from that system's tokens.css / README. Never invent a hex.

## 11. Section heading (h2)
Type

Then: a type specimen naming the system's REAL font stacks. Show the display face at
large size, the text face at reading size, and the mono face if the system has one.
Label each with its token name and role.

## 12. Small table — three rows, real tokens from this system
Columns: Token | Role | Value

## 13. Actions (two buttons, in the system's button components)
- Primary: `Kitchen sink` → href `#`
- Secondary: `All systems` → href `../index.html`

## 14. Footer line
Onda Studios · shake-design-system · pinned e47a5b3
