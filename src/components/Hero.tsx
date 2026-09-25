import * as React from "react"
import { GatsbyImage, type IGatsbyImageData } from "gatsby-plugin-image"
import { useI18n } from "../content/i18n"
import { site } from "../config/site"
import { RingText, vars } from "./ui"

/** Name letters rise one by one: delay = base + i * 65ms (from the design). */
const Letters = ({ text, base }: { text: string; base: number }) => (
  <>
    {[...text].map((ch, i) => (
      <span key={i} className="ch" style={vars({ "--d": `${(base + i * 0.065).toFixed(3)}s` })}>
        {ch}
      </span>
    ))}
  </>
)

const Hero = ({ image }: { image?: IGatsbyImageData }) => {
  const { t } = useI18n()
  const words = [t.w1, t.w2, t.w3, t.w4, t.w5, t.w1]

  return (
    <div className="sec bg-bg">
      <section id="top" aria-label={t.name} className="relative mx-auto h-[920px] max-w-[1440px]">
        <div className="heroTxt pointer-events-none absolute inset-0 z-[2]">
          <div className="in absolute top-[150px] left-[112px] flex items-center gap-[18px] text-[11px] tracking-[0.34em] text-muted uppercase" style={vars({ "--d": ".1s" })}>
            <span className="h-px w-14 bg-a" />
            <span>{t.eyebrow}</span>
          </div>

          <h1 className="absolute top-[186px] left-[104px] z-[2] m-0 font-serif text-[min(148px,10.28vw)] leading-[0.98] font-normal tracking-[0.005em]">
            <span className="sr-only">{t.name}</span>
            <span aria-hidden="true" className="mb-[-0.16em] block overflow-hidden pr-[0.1em] pb-[0.16em]">
              <Letters text={t.first} base={0.2} />
            </span>
            <span aria-hidden="true" className="mb-[-0.16em] ml-[0.878em] block overflow-hidden pr-[0.12em] pb-[0.16em] text-a italic">
              <Letters text={t.last} base={0.5} />
            </span>
          </h1>

          <p className="in absolute top-[530px] left-[112px] m-0 flex items-baseline gap-[14px] font-serif text-[34px] leading-[1.3em]" style={vars({ "--d": ".8s" })}>
            <span className="sr-only">
              {t.styleIs} {t.w1}
            </span>
            <span aria-hidden="true">{t.styleIs}</span>
            <span aria-hidden="true" className="inline-block h-[1.3em] overflow-hidden text-a italic">
              <span className="tick flex flex-col">
                {words.map((w, i) => (
                  <span key={i} className="h-[1.3em] whitespace-nowrap">
                    {w}
                  </span>
                ))}
              </span>
            </span>
          </p>

          <p className="in absolute top-[608px] left-[112px] m-0 w-[470px] text-[17px] leading-[1.8] font-light text-soft" style={vars({ "--d": ".95s" })}>
            {t.tagline}
          </p>

          <div className="in pointer-events-auto absolute top-[730px] left-[112px] flex items-center gap-[38px]" style={vars({ "--d": "1.1s" })}>
            <a className="btn flex h-[58px] items-center gap-[14px] rounded-full bg-a px-[34px] text-[11px] font-medium tracking-[0.24em] uppercase" href="#contact">
              {t.book}{" "}
              <span className="ar" aria-hidden="true">
                →
              </span>
            </a>
            <a className="ul text-[11px] font-medium tracking-[0.24em] uppercase" href="#services">
              {t.explore}
            </a>
          </div>

          <div aria-hidden="true" className="in absolute top-[850px] left-[112px] flex items-center gap-[18px] text-[10px] tracking-[0.32em] text-muted uppercase" style={vars({ "--d": "1.5s" })}>
            <span className="relative h-px w-[72px] overflow-hidden bg-ink/15">
              <span className="scrollLine absolute inset-0 bg-a" />
            </span>
            <span>{t.scroll}</span>
          </div>
        </div>

        {/* arched "mirror" portrait */}
        <div className="heroArch pointer-events-none absolute inset-0 z-[1]">
          <div aria-hidden="true" className="in absolute top-[140px] right-[78px] h-[640px] w-[460px] rounded-t-[230px] border border-a opacity-55" style={vars({ "--d": ".9s" })} />
          <div className="arch absolute top-[118px] right-[100px] z-[1] h-[640px] w-[460px] overflow-hidden rounded-t-[230px] bg-ph1">
            <div className="kb absolute inset-0 bg-ph1">
              {image && (
                <GatsbyImage
                  image={image}
                  alt={t.portrait}
                  loading="eager"
                  className="!absolute inset-0 size-full"
                  objectFit="cover"
                  objectPosition="54% 0%"
                />
              )}
            </div>
            <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
              <div className="sweep absolute -top-[20%] -right-[10%] -bottom-[20%] -left-[10%] bg-[linear-gradient(105deg,rgba(255,255,255,0)_38%,rgba(255,244,222,0.16)_50%,rgba(255,255,255,0)_62%)]" />
            </div>
          </div>

          <a
            className="in pointer-events-auto absolute top-[470px] left-[calc(100%-42px)] origin-top-left rotate-90 text-[10px] tracking-[0.34em] whitespace-nowrap text-muted uppercase"
            href={site.instagram.url}
            target="_blank"
            rel="noopener"
            style={vars({ "--d": "1.3s" })}
          >
            {site.instagram.handle}
          </a>

          <div className="in absolute top-[610px] right-[486px] z-[5] size-[156px]" style={vars({ "--d": "1.4s" })}>
            <RingText id="badgeRing" size={156} r={58} text={t.badge} textLength={360} fontSize={9.5} textClassName="fill-a">
              <circle cx="78" cy="78" r="77" stroke="rgba(201,171,114,0.5)" className="fill-bg" />
            </RingText>
            <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center font-serif text-[30px] italic">
              TP
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
