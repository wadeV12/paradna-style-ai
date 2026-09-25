import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import type { Lang } from "../config/site"

type Ctx = { lang: Lang }

const swatches = ["page", "bg", "bg2", "bg3", "a", "ink", "muted", "soft", "ph1", "ph2", "ph3", "ph5", "ph8", "ph11"]

// Milestone 1: token + font check. Replaced by the real page in milestone 2.
const Home = ({ pageContext }: PageProps<object, Ctx>) => {
  const toggle = () => {
    const html = document.documentElement
    const next = html.classList.contains("light") ? "dark" : "light"
    html.classList.remove("dark", "light")
    html.classList.add(next)
  }
  return (
    <main className="min-h-screen bg-bg px-[112px] py-24 text-ink">
      <p className="text-[11px] uppercase tracking-[0.34em] text-muted">Scaffold · {pageContext.lang}</p>
      <h1 className="mt-6 font-serif text-[148px] leading-[0.98] font-normal">
        Tetyana <span className="text-a italic">Paradna</span>
      </h1>
      <p className="mt-8 max-w-[470px] text-[17px] leading-[1.8] font-light text-soft">
        Personal styling for women who want their wardrobe to say what they mean — before they say a word.
      </p>
      <p className="mt-6 font-serif text-[34px]">
        Тетяна <em className="text-a">Парадна</em>
      </p>
      <p className="mt-6 font-sign-en text-[66px] text-a">Tetyana Paradna</p>
      <p className="font-sign-uk text-[66px] text-a">Тетяна Парадна</p>
      <button type="button" onClick={toggle} className="mt-10 rounded-full border border-ink/40 px-6 py-3 text-[11px] tracking-[0.22em] uppercase">
        Toggle theme
      </button>
      <div className="mt-12 grid grid-cols-7 gap-4">
        {swatches.map((s) => (
          <div key={s} className="text-[10px] tracking-[0.2em] uppercase text-muted">
            <div className="mb-2 h-20 border border-ink/10" style={{ background: `var(--${s})` }} />
            {s}
          </div>
        ))}
      </div>
    </main>
  )
}

export default Home

export const Head: HeadFC<object, Ctx> = ({ pageContext }) => (
  <>
    <html lang={pageContext.lang} />
    <title>Tetyana Paradna</title>
  </>
)
