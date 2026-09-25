import * as React from "react"
import { useI18n } from "../content/i18n"
import { site } from "../config/site"
import { Label, MaskHeading, RingText, gutter } from "./ui"

const Contact = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="rv">
    <div className="mb-[14px] text-[10px] tracking-[0.32em] text-muted uppercase">{label}</div>
    <div className="text-[17px] font-light break-words md:text-[18px]">{children}</div>
  </div>
)

const Footer = () => {
  const { t } = useI18n()
  const mailto = `mailto:${site.email}`
  return (
    <footer id="contact" className="sec overflow-hidden border-t border-ink/8 bg-bg2">
      <div className={`mx-auto max-w-[1440px] pt-24 pb-16 md:pt-36 xl:pt-[180px] xl:pb-[90px] ${gutter}`}>
        <div className="flex flex-col items-start gap-12 md:flex-row md:items-center md:justify-between md:gap-14">
          <div>
            <Label className="mb-[34px]">{t.l6}</Label>
            <MaskHeading a={t.h6a} b={t.h6b} indent="1.207em" className="text-[clamp(48px,6.8vw+19px,116px)] leading-[0.98]" />
          </div>
          <a className="orb rv relative block size-[170px] shrink-0 self-end rounded-full bg-a md:size-[200px] md:self-auto xl:size-[220px]" href={mailto} aria-label={t.book}>
            <RingText id="orbRing" size={220} r={84} text={t.orbRing} textLength={524} fontSize={11} textClassName="fill-on-a" />
            <svg className="absolute inset-0 size-full" width="220" height="220" viewBox="0 0 220 220" aria-hidden="true">
              <path d="M92 128 L128 92 M100 92 H128 V120" fill="none" strokeWidth="1.6" className="stroke-on-a" />
            </svg>
          </a>
        </div>

        <div className="mt-16 grid gap-8 border-t border-ink/14 pt-[42px] sm:grid-cols-2 md:mt-[120px] md:gap-12 xl:grid-cols-4">
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

      <div className={`mx-auto flex max-w-[1440px] flex-col gap-4 border-t border-ink/10 pt-7 pb-9 sm:flex-row sm:justify-between ${gutter} text-[10px] tracking-[0.28em] text-muted uppercase`}>
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
