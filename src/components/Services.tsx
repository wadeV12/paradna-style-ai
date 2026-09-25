import * as React from "react"
import { useI18n, type Dict } from "../content/i18n"
import { BigNum, Label, MaskHeading, gutter } from "./ui"

const previewTones = ["bg-ph2", "bg-ph4", "bg-ph5", "bg-ph6", "bg-ph7"]

const Services = () => {
  const { t } = useI18n()
  const items = [1, 2, 3, 4, 5].map((n) => ({
    n: String(n).padStart(2, "0"),
    title: t[`s${n}t` as keyof Dict] as string,
    desc: t[`s${n}d` as keyof Dict] as string,
  }))

  return (
    <section id="services" className="sec bg-bg2">
      <div className={`relative mx-auto max-w-[1440px] py-24 md:py-36 xl:pt-[170px] xl:pb-[180px] ${gutter}`}>
        <BigNum n="02" className="top-10" />
        <div className="relative mb-12 grid items-end gap-8 md:mb-20 xl:grid-cols-[minmax(0,1fr)_400px] xl:gap-14">
          <div>
            <Label className="mb-[30px]">{t.l2}</Label>
            <MaskHeading a={t.h2a} b={t.h2b} indent="1.25em" className="text-[clamp(44px,5.5vw+17px,96px)] leading-none" />
          </div>
          <p className="rv m-0 max-w-[560px] text-[15px] leading-[1.85] font-light text-soft md:text-[16px]">{t.svIntro}</p>
        </div>

        <div className="svlist relative">
          <div className="rows border-b border-ink/14">
            {items.map((s) => (
              <a key={s.n} className="svc rv grid grid-cols-[36px_minmax(0,1fr)_34px] items-center gap-x-4 gap-y-3 border-t border-ink/14 py-8 md:grid-cols-[64px_minmax(0,1fr)_34px] md:px-2 xl:grid-cols-[90px_minmax(0,1fr)_400px_120px_40px] xl:gap-8 xl:py-10" href="#contact">
                <span className="svn font-serif text-[18px] text-a italic">{s.n}</span>
                <h3 className="svt m-0 font-serif text-[clamp(26px,1.4vw+22px,42px)] leading-tight font-normal">{s.title}</h3>
                <span className="col-start-2 col-end-4 text-[15px] leading-[1.75] font-light text-soft xl:col-auto">{s.desc}</span>
                <span className="col-start-2 text-[11px] tracking-[0.22em] text-muted uppercase xl:col-auto">{t.price}</span>
                <svg className="arr col-start-3 row-start-1 xl:col-auto xl:row-auto" width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
                  <path d="M8 17 H26 M20 11 L26 17 L20 23" fill="none" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </a>
            ))}
          </div>
          {/* cursor-following arched preview, one per service (driven by Cursor in milestone 4) */}
          <div className="pv pointer-events-none absolute top-0 left-0 z-[6] -mt-[150px] -ml-[115px] h-[300px] w-[230px]" aria-hidden="true" data-preview>
            {previewTones.map((bg) => (
              <div
                key={bg}
                className={`pi absolute inset-0 flex items-end justify-center rounded-t-[115px] pb-[18px] text-[10px] tracking-[0.26em] text-soft uppercase ${bg}`}
              >
                {t.img}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
