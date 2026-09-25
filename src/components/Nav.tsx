import * as React from "react"
import { useI18n } from "../content/i18n"
import LangSwitch from "./LangSwitch"
import ThemeToggle from "./ThemeToggle"
import MobileMenu from "./MobileMenu"
import { pathFor } from "../config/site"

export type NavLink = readonly [href: string, label: string]

const Nav = () => {
  const { lang, t } = useI18n()
  const [open, setOpen] = React.useState(false)
  // Path-qualified so the links also work from the 404 page.
  const home = pathFor(lang)
  const links: NavLink[] = [
    [`${home}#approach`, t.nApproach],
    [`${home}#services`, t.nServices],
    [`${home}#journey`, t.nJourney],
    [`${home}#portfolio`, t.nPortfolio],
    [`${home}#journal`, t.nJournal],
  ]

  return (
    <>
      <header className="down sticky top-0 z-50 border-b border-ink/10 bg-bg/74 backdrop-blur-[16px]" style={{ "--d": ".55s" } as React.CSSProperties}>
        <nav className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 md:h-[88px] md:px-10 design:px-[72px]">
          <a href={`${home}#top`} className="flex shrink-0 items-center gap-4">
            <span className="flex size-[44px] items-center justify-center rounded-full border border-a font-serif text-[17px] text-a-sm italic md:size-[50px] md:text-[19px]" aria-hidden="true">
              TP
            </span>
            <span className="sr-only text-[12px] font-medium tracking-[0.32em] whitespace-nowrap uppercase sm:not-sr-only nav:sr-only design:not-sr-only">{t.name}</span>
          </a>
          <div className="hidden gap-6 text-[12px] tracking-[0.22em] uppercase nav:flex design:gap-[38px]">
            {links.map(([href, label]) => (
              <a key={href} className="ul" href={href}>
                {label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 sm:gap-[14px]">
            <LangSwitch />
            <ThemeToggle />
            <a
              className="btn ghost hidden h-[46px] items-center rounded-full border border-ink/40 px-[26px] text-[11px] font-medium tracking-[0.22em] whitespace-nowrap uppercase lg:flex"
              href={`${home}#contact`}
            >
              {t.navBook}
            </a>
            <button
              type="button"
              className="themeBtn flex size-[46px] items-center justify-center rounded-full border border-ink/40 bg-transparent text-ink hover:border-a nav:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.menuClose : t.menuOpen}
              onClick={() => setOpen((o) => !o)}
            >
              <span aria-hidden="true" className="relative block h-[9px] w-[18px]">
                <span className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-reveal ${open ? "top-1 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-reveal ${open ? "top-1 -rotate-45" : "top-2"}`} />
              </span>
            </button>
          </div>
        </nav>
        <div className="pageProg absolute right-0 -bottom-px left-0 h-px bg-a" aria-hidden="true" />
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} links={links} />
    </>
  )
}

export default Nav
