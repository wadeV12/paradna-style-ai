import * as React from "react"
import { useI18n } from "../content/i18n"
import { RingText, gutter } from "./ui"

const Testimonial = () => {
  const { t } = useI18n()
  return (
    <section aria-label={t.kind} className="sec overflow-hidden bg-bg3">
      <div className={`mx-auto grid max-w-[1440px] items-start gap-6 py-24 md:grid-cols-[110px_minmax(0,1fr)] md:gap-10 md:py-36 xl:grid-cols-[150px_minmax(0,1fr)_200px] xl:gap-14 xl:pt-[180px] xl:pb-[190px] ${gutter}`}>
        <div aria-hidden="true" className="qm h-[0.5em] font-serif text-[clamp(140px,5.6vw+140px,220px)] leading-[0.8] text-a italic md:h-auto">
          “
        </div>
        <figure className="m-0">
          <div className="rv mb-6 text-[11px] md:mb-[38px] tracking-[0.32em] text-muted uppercase">{t.kind}</div>
          <blockquote className="clipUp m-0 font-serif text-[clamp(26px,2.5vw+10px,46px)] leading-[1.34] font-normal italic">{t.quote}</blockquote>
          <figcaption className="rv mt-8 flex md:mt-[46px] items-center gap-[18px] text-[11px] tracking-[0.28em] text-muted uppercase">
            <span className="h-px w-12 bg-a" />
            <span>{t.client}</span>
          </figcaption>
        </figure>
        <div aria-hidden="true" className="relative mt-10 hidden size-[190px] xl:block">
          <RingText id="kindRing" size={190} r={78} text={t.kindRing} textLength={486} fontSize={10} textClassName="fill-ink">
            <circle cx="95" cy="95" r="94" fill="none" className="stroke-ink/18" />
          </RingText>
          <div className="absolute inset-0 flex items-center justify-center font-serif text-[32px] text-a italic">TP</div>
        </div>
      </div>
    </section>
  )
}

export default Testimonial
