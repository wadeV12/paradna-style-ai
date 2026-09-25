import * as React from "react"
import { useI18n, type Dict } from "../content/i18n"
import { BigNum, Label, MaskHeading, gutter } from "./ui"

const numerals = ["I", "II", "III", "IV"]
// staggered scroll ranges from the design
const ranges = ["entry 0% cover 24%", "entry 12% cover 32%", "entry 24% cover 40%", "entry 36% cover 48%"]

const Journey = () => {
  const { t } = useI18n()
  return (
    <section id="journey" className="sec bg-bg">
      <div className={`relative mx-auto max-w-[1440px] py-24 md:py-36 xl:pt-[170px] xl:pb-[180px] ${gutter}`}>
        <BigNum n="03" className="top-[30px]" />
        <Label className="relative mb-[30px]">{t.l3}</Label>
        <MaskHeading a={t.h3a} b={t.h3b} className="relative mb-14 text-[clamp(40px,5.2vw+16px,90px)] leading-[1.02] md:mb-[100px]" />

        <div aria-hidden="true" className="relative mb-12 hidden h-6 md:block">
          <div className="absolute top-[11px] right-0 left-0 h-px bg-ink/12" />
          <div className="drawline absolute top-0 left-0 h-6 w-full">
            <div className="absolute top-[11px] right-0 left-0 h-px bg-a" />
            <div className="dot absolute top-[6px] -right-[6px] size-3 rounded-full bg-a" />
          </div>
        </div>

        <ol className="m-0 grid list-none gap-12 p-0 md:grid-cols-2 md:gap-x-12 md:gap-y-16 xl:grid-cols-4 xl:gap-[52px]">
          {numerals.map((num, i) => (
            <li key={num} className="step rv" style={{ animationRange: ranges[i] }}>
              <div aria-hidden="true" className="num outline-a font-serif text-[clamp(72px,2.3vw+71px,104px)] leading-none italic">
                {num}
              </div>
              <h3 className="mt-5 mb-[14px] font-serif text-[clamp(24px,0.4vw+23px,28px)] font-normal md:mt-[26px]">{t[`j${i + 1}t` as keyof Dict] as string}</h3>
              <p className="m-0 text-[15px] leading-[1.8] font-light text-soft">{t[`j${i + 1}d` as keyof Dict] as string}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Journey
