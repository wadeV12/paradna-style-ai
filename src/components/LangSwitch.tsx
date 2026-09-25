import * as React from "react"
import { useI18n } from "../content/i18n"
import { languages } from "../config/site"

// Plain links between / and /ua/: a full page load, animated by a cross-document
// view transition (see `@view-transition` in global.css). Gatsby's client-side
// navigation stalls inside startViewTransition, so it isn't used here.
const LangSwitch = () => {
  const { lang, t } = useI18n()

  // Keep the section the reader is on.
  const keepHash = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.currentTarget.href = path + window.location.hash
  }

  return (
    <div role="group" aria-label={t.langGroup} className="flex items-center text-[11px] font-medium tracking-[0.2em]">
      {languages.map((l, i) => {
        const active = l.code === lang
        return (
          <React.Fragment key={l.code}>
            {i > 0 && <span aria-hidden="true" className="h-[14px] w-px bg-ink/30" />}
            <a
              href={l.path}
              hrefLang={l.code}
              lang={l.code}
              aria-current={active ? "page" : undefined}
              onClick={(e) => (active ? e.preventDefault() : keepHash(e, l.path))}
              className={`langBtn flex h-[46px] w-[44px] items-center justify-center hover:text-ink ${active ? "text-a-sm" : "text-muted"}`}
              style={{ "--on": active ? 1 : 0 } as React.CSSProperties}
            >
              {l.label}
            </a>
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default LangSwitch
