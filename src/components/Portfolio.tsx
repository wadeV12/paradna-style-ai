import * as React from "react"
import { useI18n } from "../content/i18n"
import { PhCaption, gutter, tones } from "./ui"

const Portfolio = () => {
  const { t } = useI18n()
  const looks = t.looks.map((name, i) => ({
    name,
    n: String(i + 1).padStart(2, "0"),
    bg: tones[i],
    arch: i % 3 === 1,
    lift: i % 2 === 1,
  }))

  const intro = (
    <>
      <div className="mb-6 text-[11px] tracking-[0.32em] text-muted uppercase md:mb-[30px]">{t.l4}</div>
      <h2 className="m-0 font-serif text-[clamp(44px,5.4vw+15px,92px)] leading-none font-normal">
        {t.pfA}
        <br />
        <span className="text-a italic">{t.pfB}</span>
      </h2>
      <p className="mt-6 mb-0 max-w-[340px] text-[15px] leading-[1.8] font-light text-soft md:mt-[30px]">{t.pfIntro}</p>
    </>
  )

  return (
    <section id="portfolio" className="gal sec bg-bg2 pt-24 md:pt-36 lg:pt-0">
      {/* below 1024px the intro sits above the carousel; from 1024px it rides in the track */}
      <div className={`mb-12 lg:hidden ${gutter}`}>{intro}</div>
      <div className="galStick snap-x snap-mandatory scroll-px-6 pb-24 [scrollbar-width:thin] md:scroll-px-12 md:pb-36 lg:py-24 xl:scroll-px-[112px]">
        <div className={`galTrack ${gutter}`}>
          <div className="hidden w-[460px] shrink-0 self-center pr-10 lg:block">{intro}</div>
          {looks.map((k) => (
            <a key={k.n} className={`card block w-[72vw] max-w-[360px] shrink-0 snap-start ${k.lift ? "mb-10 lg:mb-[70px]" : ""}`} href="#contact">
              <div className={`relative aspect-[360/480] w-full overflow-hidden ${k.arch ? "rounded-t-full" : ""}`}>
                <div className="cimg absolute inset-0" style={{ background: k.bg }} />
                <PhCaption className="text-soft">{t.clientPhoto}</PhCaption>
              </div>
              <div className="mt-[22px] flex items-baseline gap-4">
                <span className="font-serif text-[15px] text-a-sm italic">{k.n}</span>
                <h3 className="m-0 font-serif text-[clamp(22px,0.6vw+18px,26px)] font-normal">{k.name}</h3>
              </div>
              <div className="cl mt-[14px] h-px bg-a" />
            </a>
          ))}
        </div>
        <div aria-hidden="true" className="galBar mx-auto mt-14 h-px w-[calc(100%-224px)] max-w-[1216px] bg-ink/12">
          <div className="galProg h-px origin-left bg-a" />
        </div>
      </div>
    </section>
  )
}

export default Portfolio
