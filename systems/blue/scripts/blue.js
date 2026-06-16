// Blue shell behavior: theme cycling, FX toggle, procedural noise, shadow video.

const THEME_KEY = 'blue-theme-mode'
const FX_KEY = 'blue-leaf-shadows'
const THEME_ORDER = ['auto', 'night', 'day']

const prefersDark = matchMedia('(prefers-color-scheme: dark)')
const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)')

// ?theme=auto|night|day and ?fx=on|off override stored prefs for this load,
// so an embedding surface (or a screenshot run) can force a state.
const params = new URLSearchParams(location.search)

function storedTheme() {
  const fromUrl = params.get('theme')
  if (THEME_ORDER.includes(fromUrl)) return fromUrl
  try {
    const v = localStorage.getItem(THEME_KEY)
    return THEME_ORDER.includes(v) ? v : 'auto'
  } catch {
    return 'auto'
  }
}

function applyTheme(mode) {
  const dark = mode === 'night' || (mode === 'auto' && prefersDark.matches)
  document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  document.documentElement.dataset.themeMode = mode
  const label = document.getElementById('theme-state')
  if (label) label.textContent = mode
  const btn = document.getElementById('btn-theme')
  if (btn) btn.setAttribute('aria-label', `Theme mode: ${mode}. Activate to change.`)
}

function storedFx() {
  const fromUrl = params.get('fx')
  if (fromUrl === 'on' || fromUrl === 'off') return fromUrl === 'on'
  try {
    return localStorage.getItem(FX_KEY) !== 'off'
  } catch {
    return true
  }
}

function applyFx(on) {
  document.documentElement.dataset.fx = on ? 'on' : 'off'
  const label = document.getElementById('fx-state')
  if (label) label.textContent = on ? 'on' : 'off'
  const btn = document.getElementById('btn-fx')
  if (btn) {
    btn.setAttribute('aria-pressed', String(on))
    btn.setAttribute('aria-label', `Leaf shadows: ${on ? 'on' : 'off'}. Activate to toggle.`)
  }
  const video = document.querySelector('.leaf-shadows')
  if (!video) return
  if (on && !prefersReducedMotion.matches) {
    video.play().catch(() => {})
  } else {
    video.pause()
  }
}

function paintNoise() {
  const layer = document.querySelector('.noise-overlay')
  if (!layer) return
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  const image = ctx.createImageData(size, size)
  const px = image.data
  for (let i = 0; i < px.length; i += 4) {
    const v = (Math.random() * 256) | 0
    px[i] = v
    px[i + 1] = v
    px[i + 2] = v
    px[i + 3] = 14 // ~5% alpha: felt, not seen
  }
  ctx.putImageData(image, 0, 0)
  layer.style.backgroundImage = `url(${canvas.toDataURL('image/png')})`
}

export function initBlue() {
  let theme = storedTheme()
  applyTheme(theme)
  prefersDark.addEventListener('change', () => applyTheme(theme))

  document.getElementById('btn-theme')?.addEventListener('click', () => {
    theme = THEME_ORDER[(THEME_ORDER.indexOf(theme) + 1) % THEME_ORDER.length]
    try { localStorage.setItem(THEME_KEY, theme) } catch {}
    applyTheme(theme)
  })

  let fx = storedFx()
  applyFx(fx)
  prefersReducedMotion.addEventListener('change', () => applyFx(fx))

  document.getElementById('btn-fx')?.addEventListener('click', () => {
    fx = !fx
    try { localStorage.setItem(FX_KEY, fx ? 'on' : 'off') } catch {}
    applyFx(fx)
  })

  paintNoise()

  const expand = document.getElementById('btn-expand')
  const content = document.getElementById('app-content')
  if (expand && content) {
    expand.addEventListener('click', () => {
      const expanded = content.classList.toggle('is-expanded')
      expand.setAttribute('aria-pressed', String(expanded))
      expand.setAttribute('aria-label', expanded ? 'Collapse page width' : 'Expand page width')
      expand.querySelector('.bracket-button__label').textContent = expanded ? 'Collapse' : 'Expand'
    })
  }

  return { theme, fx }
}

/** @deprecated Use initBlue */
export const initBlueShell = initBlue

initBlue()
