import * as React from "react"
import { useI18n } from "../content/i18n"

// Full-screen name card that lifts away. Server-rendered so it covers the page
// from the first paint; the pre-paint script adds `html.nointro` when it has
// already played this session (CSS then hides it).
const Intro = () => {
  const { t } = useI18n()
  React.useEffect(() => {
    try {
      sessionStorage.setItem("tp-intro", "1")
    } catch {}
  }, [])
  return (
    <div aria-hidden="true" className="intro pointer-events-none fixed inset-0 z-[200] flex flex-col items-center justify-center gap-[26px] bg-bg3">
      <div className="im font-serif text-[30px] tracking-[0.3em] whitespace-nowrap uppercase">{t.name}</div>
      <div className="ih h-px w-[280px] bg-a" />
    </div>
  )
}

export default Intro
