export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

type VT = { ready: Promise<void>; finished: Promise<void> }
type DocWithVT = Document & { startViewTransition?: (cb: () => void | Promise<void>) => VT }

// View Transition wrapper (ported from the design's `_vt`): tags <html> with
// `vt-<kind>` for the duration so CSS can pick the animation. Falls back to an
// instant update when unsupported, with reduced motion, or with `?still`.
export function viewTransition(kind: string, apply: () => void | Promise<void>, after?: () => void) {
  const doc = document as DocWithVT
  const root = document.documentElement
  if (!doc.startViewTransition || prefersReducedMotion() || root.classList.contains("still")) {
    void apply()
    return
  }
  root.classList.add(`vt-${kind}`)
  try {
    const vt = doc.startViewTransition(apply)
    if (after) vt.ready.then(after).catch(() => {})
    vt.finished.finally(() => root.classList.remove(`vt-${kind}`))
  } catch {
    root.classList.remove(`vt-${kind}`)
    void apply()
  }
}
