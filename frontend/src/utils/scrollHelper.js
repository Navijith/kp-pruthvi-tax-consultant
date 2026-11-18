/**
 * Smoothly scrolls an element directly to the center of the viewport
 * and applies a subtle highlight ring.
 */
export function centerElement(elementOrId) {
  const el = typeof elementOrId === 'string'
    ? document.getElementById(elementOrId)
    : elementOrId

  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
    el.classList.add('highlight-centered')
    setTimeout(() => {
      el.classList.remove('highlight-centered')
    }, 2200)
  }
}
