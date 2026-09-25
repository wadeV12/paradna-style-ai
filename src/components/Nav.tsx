import * as React from "react"
import { useI18n } from "../content/i18n"
import LangSwitch from "./LangSwitch"
import ThemeToggle from "./ThemeToggle"

const Nav = () => {
  const { t } = useI18n()
  const links = [
    ["#approach", t.nApproach],
    ["#services", t.nServices],
    ["#journey", t.nJourney],
    ["#portfolio", t.nPortfolio],
    ["#journal", t.nJournal],
  ] as const

  return (
    <header className="down sticky top-0 z-50 border-b border-ink/10 bg-bg/74 backdrop-blur-[16px]" style={{ "--d": ".55s" } as React.CSSProperties}>
      <nav className="mx-auto flex h-[88px] w-full max-w-[1440px] items-center justify-between px-[72px]">
        <a href="#top" aria-label={t.homeAria} className="flex items-center gap-4">
          <span className="flex size-[50px] items-center justify-center rounded-full border border-a font-serif text-[19px] text-a italic" aria-hidden="true">
            TP
          </span>
          <span className="text-[12px] font-medium tracking-[0.32em] whitespace-nowrap uppercase">{t.name}</span>
        </a>
        <div className="flex gap-[38px] text-[12px] tracking-[0.22em] uppercase">
          {links.map(([href, label]) => (
            <a key={href} className="ul" href={href}>
              {label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-[14px]">
          <LangSwitch />
          <ThemeToggle />
          <a
            className="btn ghost flex h-[46px] items-center rounded-full border border-ink/40 px-[26px] text-[11px] font-medium tracking-[0.22em] whitespace-nowrap uppercase"
            href="#contact"
          >
            {t.navBook}
          </a>
        </div>
      </nav>
      <div className="pageProg absolute right-0 -bottom-px left-0 h-px bg-a" aria-hidden="true" />
    </header>
  )
}

export default Nav
