import * as React from "react"
import { prefersReducedMotion } from "../lib/motion"

// Ring cursor + the arched service preview that trails it (rAF lerp, ported
// from the design). Only for fine pointers with motion allowed.
const Cursor = () => {
  const [enabled, setEnabled] = React.useState(false)
  const ring = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    setEnabled(fine && !prefersReducedMotion() && !document.documentElement.classList.contains("still"))
  }, [])

  React.useEffect(() => {
    if (!enabled) return
    const list = document.querySelector<HTMLElement>(".svlist")
    const preview = document.querySelector<HTMLElement>("[data-preview]")
    let x = -200, y = -200, cx = -200, cy = -200, px = 0, py = 0
    let raf = 0

    const move = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      const el = ring.current
      if (!el) return
      el.classList.add("on")
      const target = e.target instanceof Element ? e.target.closest("a, button") : null
      el.classList.toggle("big", !!target)
    }
    const leave = () => ring.current?.classList.remove("on")
    const tick = () => {
      cx += (x - cx) * 0.16
      cy += (y - cy) * 0.16
      if (ring.current) ring.current.style.transform = `translate3d(${cx}px,${cy}px,0)`
      if (list && preview) {
        const r = list.getBoundingClientRect()
        px += (x - r.left - px) * 0.12
        py += (y - r.top - py) * 0.12
        preview.style.transform = `translate3d(${px}px,${py}px,0)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener("mousemove", move, { passive: true })
    document.addEventListener("mouseleave", leave)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("mousemove", move)
      document.removeEventListener("mouseleave", leave)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  return enabled ? <div ref={ring} className="cur" aria-hidden="true" /> : null
}

export default Cursor
