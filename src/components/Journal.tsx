import * as React from "react"
import { useI18n } from "../content/i18n"
import { site } from "../config/site"
import { BigNum, Label, MaskHeading, gutter, tones } from "./ui"

const Journal = () => {
  const { t } = useI18n()
  const posts = [0, 1, 2, 3, 4, 5].map((i) => ({
    n: String(i + 1).padStart(2, "0"),
    bg: tones[(i + 2) % tones.length],
    offset: i % 2 === 1,
    range: `entry ${i * 7}% cover ${22 + i * 5}%`,
  }))

  return (
    <section id="journal" className="sec bg-bg">
      <div className={`relative mx-auto max-w-[1440px] py-24 md:py-36 xl:pt-[170px] xl:pb-[200px] ${gutter}`}>
        <BigNum n="05" className="top-5" />
        <div className="relative mb-12 flex flex-col items-start gap-8 md:mb-[70px] md:flex-row md:items-end md:justify-between">
          <div>
            <Label className="mb-[30px]">{t.l5}</Label>
            <MaskHeading a={t.h5a} b={t.h5b} className="text-[clamp(40px,5.2vw+16px,90px)] leading-[1.02]" />
          </div>
          <a className="ul rv text-[12px] font-medium tracking-[0.24em] uppercase" href={site.instagram.url} target="_blank" rel="noopener">
            {t.follow}
          </a>
        </div>
        <div className="drift grid grid-cols-2 items-start gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-6">
          {posts.map((p) => (
            <a
              key={p.n}
              className={`ig tileIn relative block aspect-[4/5] overflow-hidden ${p.offset ? "mt-8 md:mt-12" : ""}`}
              href={site.instagram.url}
              target="_blank"
              rel="noopener"
              aria-label={`${t.igAria} ${p.n}`}
              style={{ animationRange: p.range }}
            >
              <div className="igimg absolute inset-0" style={{ background: p.bg }} />
              <div aria-hidden="true" className="absolute bottom-3 left-[14px] text-[9px] tracking-[0.24em] text-soft uppercase">
                [ {t.post} {p.n} ]
              </div>
              <div className="igov absolute inset-0 flex items-center justify-center bg-[rgba(10,9,8,0.6)]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F4EFE7" strokeWidth="1.3" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.3" cy="6.7" r="0.6" fill="#F4EFE7" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Journal
