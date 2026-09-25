import * as React from "react"
import { navigate } from "gatsby"
import { useI18n } from "../content/i18n"
import { languages, type Lang } from "../config/site"
import { viewTransition } from "../lib/motion"

// Resolves once the page for `lang` has rendered (the template marks <main data-lang>).
const rendered = (lang: Lang) =>
  new Promise<void>((resolve) => {
    const start = performance.now()
    const check = () => {
      if (document.querySelector(`[data-lang="${lang}"]`) || performance.now() - start > 3000) resolve()
      else requestAnimationFrame(check)
    }
    check()
  })

const LangSwitch = () => {
  const { lang, t } = useI18n()

  const go = (e: React.MouseEvent<HTMLAnchorElement>, to: Lang, path: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    if (to === lang) return
    // Keep the section the reader is on.
    const target = path + window.location.hash
    viewTransition("lang", async () => {
      await navigate(target)
      await rendered(to)
    })
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
              onClick={(e) => go(e, l.code, l.path)}
              className={`langBtn flex h-[46px] w-[44px] items-center justify-center hover:text-ink ${active ? "text-a" : "text-muted"}`}
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
