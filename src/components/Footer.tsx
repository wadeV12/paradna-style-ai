import * as React from "react"
import { useI18n } from "../content/i18n"
import { site } from "../config/site"
import { Label, MaskHeading, RingText } from "./ui"

const Contact = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="rv">
    <div className="mb-[14px] text-[10px] tracking-[0.32em] text-muted uppercase">{label}</div>
    <div className="text-[18px] font-light">{children}</div>
  </div>
)

const Footer = () => {
  const { t } = useI18n()
  const mailto = `mailto:${site.email}`
  return (
    <footer id="contact" className="sec overflow-hidden border-t border-ink/8 bg-bg2">
      <div className="mx-auto max-w-[1440px] px-[112px] pt-[180px] pb-[90px]">
        <div className="flex items-center justify-between gap-14">
          <div>
            <Label className="mb-[34px]">{t.l6}</Label>
            <MaskHeading a={t.h6a} b={t.h6b} indent="1.207em" className="text-[min(116px,8.06vw)] leading-[0.98]" />
          </div>
          <a className="orb rv relative block size-[220px] shrink-0 rounded-full bg-a" href={mailto} aria-label={t.book}>
            <RingText id="orbRing" size={220} r={84} text={t.orbRing} textLength={524} fontSize={11} textClassName="fill-on-a" />
            <svg className="absolute inset-0" width="220" height="220" viewBox="0 0 220 220" aria-hidden="true">
              <path d="M92 128 L128 92 M100 92 H128 V120" fill="none" strokeWidth="1.6" className="stroke-on-a" />
            </svg>
          </a>
        </div>

        <div className="mt-[120px] grid grid-cols-4 gap-12 border-t border-ink/14 pt-[42px]">
          <Contact label={t.email}>
            <a className="ul" href={mailto}>
              {site.email}
            </a>
          </Contact>
          <Contact label="Instagram">
            <a className="ul" href={site.instagram.url} target="_blank" rel="noopener">
              {site.instagram.handle}
            </a>
          </Contact>
          <Contact label="YouTube">
            <a className="ul" href={site.youtube.url} target="_blank" rel="noopener">
              {t.yt}
            </a>
          </Contact>
          <Contact label={t.phone}>{site.phone}</Contact>
        </div>
      </div>

      <div aria-hidden="true" className="spread mx-auto max-w-[1440px] pb-5 text-center font-serif text-[min(176px,12.2vw)] leading-[1.1] whitespace-nowrap text-transparent [-webkit-text-stroke:1px_rgba(201,171,114,0.45)]">
        {t.first} <span className="italic">{t.last}</span>
      </div>

      <div className="mx-auto flex max-w-[1440px] justify-between border-t border-ink/10 px-[112px] pt-7 pb-9 text-[10px] tracking-[0.28em] text-muted uppercase">
        <span suppressHydrationWarning>
          © {new Date().getFullYear()} {t.name}
        </span>
        <a className="ul" href="#top">
          {t.top}
        </a>
      </div>
    </footer>
  )
}

export default Footer
