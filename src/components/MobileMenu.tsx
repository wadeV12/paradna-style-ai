import * as React from "react"
import { useI18n } from "../content/i18n"
import { pathFor, site } from "../config/site"
import type { NavLink } from "./Nav"
import { vars } from "./ui"

// Full-screen menu below the nav breakpoint (1200px). The header stays on top,
// so the menu button doubles as the close button; the page behind is inert.
// Visibility flips instantly on open (so focus can move in) and only fades out on close.
const MobileMenu = ({ open, onClose, links }: { open: boolean; onClose: () => void; links: NavLink[] }) => {
  const { lang, t } = useI18n()
  const first = React.useRef<HTMLAnchorElement>(null)

  React.useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const behind = [document.getElementById("main"), document.querySelector("footer")].filter(Boolean) as HTMLElement[]
    root.style.overflow = "hidden"
    behind.forEach((el) => (el.inert = true))
    first.current?.focus({ preventScroll: true })

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    const wide = window.matchMedia("(min-width: 1200px)")
    const onWide = () => wide.matches && onClose()
    window.addEventListener("keydown", onKey)
    wide.addEventListener("change", onWide)
    return () => {
      root.style.overflow = ""
      behind.forEach((el) => (el.inert = false))
      window.removeEventListener("keydown", onKey)
      wide.removeEventListener("change", onWide)
    }
  }, [open, onClose])

  return (
    <div
      id="mobile-menu"
      inert={!open}
      className={`menu fixed inset-0 z-40 flex flex-col overflow-y-auto bg-bg3 px-6 pt-[112px] pb-10 duration-500 md:px-10 md:pt-[140px] nav:hidden ${open ? "is-open visible opacity-100 transition-opacity" : "invisible opacity-0 transition-[opacity,visibility]"}`}
    >
      <nav aria-label={t.menu} className="flex flex-col gap-2">
        {links.map(([href, label], i) => (
          <a
            key={href}
            ref={i === 0 ? first : undefined}
            href={href}
            onClick={onClose}
            className="menu-item flex items-baseline gap-5 py-2 font-serif text-[clamp(38px,9vw,64px)] leading-[1.1]"
            style={vars({ "--i": i })}
          >
            <span className="font-serif text-[14px] text-a italic">{String(i + 1).padStart(2, "0")}</span>
            {label}
          </a>
        ))}
      </nav>
      <div className="menu-item mt-auto flex flex-wrap items-center gap-x-8 gap-y-5 pt-12" style={vars({ "--i": links.length })}>
        <a
          className="btn flex h-[54px] items-center gap-[14px] rounded-full bg-a px-[30px] text-[11px] font-medium tracking-[0.24em] uppercase"
          href={`${pathFor(lang)}#contact`}
          onClick={onClose}
        >
          {t.book}
        </a>
        <a className="ul text-[11px] tracking-[0.24em] text-muted uppercase" href={site.instagram.url} target="_blank" rel="noopener">
          {site.instagram.handle}
        </a>
      </div>
    </div>
  )
}

export default MobileMenu
