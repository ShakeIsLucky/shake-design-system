// MEANDER — optional progressive enhancement.
// The system is fully functional with CSS alone. This module only adds
// finer procedural grain to blue cards (crisper than the tiled SVG) and
// respects prefers-reduced-motion. No layout depends on it.

const reduced = matchMedia('(prefers-reduced-motion: reduce)')

/** Paint a fine, felt-not-seen grain onto a card's .card__field layer. */
function paintGrain(field) {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const image = ctx.createImageData(size, size)
  const px = image.data
  for (let i = 0; i < px.length; i += 4) {
    const v = (Math.random() * 256) | 0
    px[i] = px[i + 1] = px[i + 2] = v
    px[i + 3] = 20 // ~8% alpha
  }
  ctx.putImageData(image, 0, 0)
  field.style.setProperty('--grain', `url(${canvas.toDataURL('image/png')})`)
}

export function initMeander(root = document) {
  root.querySelectorAll('.card__field').forEach(paintGrain)
  return { grained: root.querySelectorAll('.card__field').length }
}

// Auto-init unless the host opts out with data-meander="manual".
if (document.documentElement.dataset.meander !== 'manual' && !reduced.matches) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initMeander())
  } else {
    initMeander()
  }
}
