import * as React from "react"
import { useI18n, type Dict } from "../content/i18n"
import { BigNum, Label, MaskHeading } from "./ui"

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
      <div className="relative mx-auto max-w-[1440px] px-[112px] pt-[170px] pb-[180px]">
        <BigNum n="02" className="top-10" />
        <div className="relative mb-20 grid grid-cols-[minmax(0,1fr)_400px] items-end gap-14">
          <div>
            <Label className="mb-[30px]">{t.l2}</Label>
            <MaskHeading a={t.h2a} b={t.h2b} indent="1.25em" className="text-[min(96px,6.67vw)] leading-none" />
          </div>
          <p className="rv m-0 text-[16px] leading-[1.85] font-light text-soft">{t.svIntro}</p>
        </div>

        <div className="svlist relative">
          <div className="rows border-b border-ink/14">
            {items.map((s) => (
              <a key={s.n} className="svc rv grid grid-cols-[90px_minmax(0,1fr)_400px_120px_40px] items-center gap-8 border-t border-ink/14 px-2 py-10" href="#contact">
                <span className="svn font-serif text-[18px] text-a italic">{s.n}</span>
                <h3 className="svt m-0 font-serif text-[42px] font-normal">{s.title}</h3>
                <span className="text-[15px] leading-[1.75] font-light text-soft">{s.desc}</span>
                <span className="text-[11px] tracking-[0.22em] text-muted uppercase">{t.price}</span>
                <svg className="arr" width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
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
