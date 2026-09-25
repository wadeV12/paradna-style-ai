import * as React from "react"
import { useI18n } from "../content/i18n"
import { PhCaption, tones } from "./ui"

const Portfolio = () => {
  const { t } = useI18n()
  const looks = t.looks.map((name, i) => ({
    name,
    n: String(i + 1).padStart(2, "0"),
    bg: tones[i],
    arch: i % 3 === 1,
    lift: i % 2 === 1,
  }))

  return (
    <section id="portfolio" className="gal sec bg-bg2">
      <div className="galStick">
        <div className="galTrack px-[112px]">
          <div className="w-[460px] shrink-0 self-center pr-10">
            <div className="mb-[30px] text-[11px] tracking-[0.32em] text-muted uppercase">{t.l4}</div>
            <h2 className="m-0 font-serif text-[92px] leading-none font-normal">
              {t.pfA}
              <br />
              <span className="text-a italic">{t.pfB}</span>
            </h2>
            <p className="mt-[30px] mb-0 w-[340px] text-[15px] leading-[1.8] font-light text-soft">{t.pfIntro}</p>
          </div>
          {looks.map((k) => (
            <a key={k.n} className={`card block w-[360px] shrink-0 ${k.lift ? "mb-[70px]" : ""}`} href="#contact">
              <div className={`relative h-[480px] w-[360px] overflow-hidden ${k.arch ? "rounded-t-[180px]" : ""}`}>
                <div className="cimg absolute inset-0" style={{ background: k.bg }} />
                <PhCaption className="text-soft">{t.clientPhoto}</PhCaption>
              </div>
              <div className="mt-[22px] flex items-baseline gap-4">
                <span className="font-serif text-[15px] text-a italic">{k.n}</span>
                <h3 className="m-0 font-serif text-[26px] font-normal">{k.name}</h3>
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
