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
      {/* Mobile/tablet: a stacked flow. ≥1280: the design's absolute 1440 geometry. */}
      <section id="top" aria-label={t.name} className="relative mx-auto max-w-[1440px] px-6 pt-14 pb-20 md:px-12 md:pt-20 md:pb-28 xl:h-[920px] xl:p-0">
        <div className="heroTxt relative z-[2] xl:pointer-events-none xl:absolute xl:inset-0">
          <div className="in flex items-center gap-[18px] text-[10px] tracking-[0.34em] text-muted uppercase md:text-[11px] xl:absolute xl:top-[150px] xl:left-[112px]" style={vars({ "--d": ".1s" })}>
            <span className="h-px w-10 bg-a md:w-14" />
            <span>{t.eyebrow}</span>
          </div>

          <h1 className="relative z-[2] m-0 mt-6 -ml-1 font-serif text-[clamp(58px,17vw,148px)] leading-[0.98] font-normal tracking-[0.005em] xl:absolute xl:top-[186px] xl:left-[104px] xl:m-0 xl:text-[min(148px,10.28vw)]">
            <span className="sr-only">{t.name}</span>
            <span aria-hidden="true" className="mb-[-0.16em] block overflow-hidden pr-[0.1em] pb-[0.16em]">
              <Letters text={t.first} base={0.2} />
            </span>
            <span aria-hidden="true" className="mb-[-0.16em] ml-[0.878em] block overflow-hidden pr-[0.12em] pb-[0.16em] text-a italic">
              <Letters text={t.last} base={0.5} />
            </span>
          </h1>

          <p className="in m-0 mt-8 flex items-baseline gap-[10px] font-serif text-[clamp(24px,5.4vw,34px)] leading-[1.3em] md:gap-[14px] xl:absolute xl:top-[530px] xl:left-[112px] xl:m-0" style={vars({ "--d": ".8s" })}>
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

          <p className="in m-0 mt-5 max-w-[470px] text-[16px] leading-[1.8] font-light text-soft md:text-[17px] xl:absolute xl:top-[608px] xl:left-[112px] xl:m-0 xl:w-[470px]" style={vars({ "--d": ".95s" })}>
            {t.tagline}
          </p>

          <div className="in pointer-events-auto mt-9 flex flex-wrap items-center gap-x-[38px] gap-y-5 xl:absolute xl:top-[730px] xl:left-[112px] xl:m-0" style={vars({ "--d": "1.1s" })}>
            <a className="btn flex h-[58px] items-center gap-[14px] rounded-full bg-a px-[30px] text-[11px] font-medium tracking-[0.24em] uppercase md:px-[34px]" href="#contact">
              {t.book}{" "}
              <span className="ar" aria-hidden="true">
                →
              </span>
            </a>
            <a className="ul text-[11px] font-medium tracking-[0.24em] uppercase" href="#services">
              {t.explore}
            </a>
          </div>

          <div aria-hidden="true" className="in hidden items-center gap-[18px] text-[10px] tracking-[0.32em] text-muted uppercase xl:absolute xl:top-[850px] xl:left-[112px] xl:flex" style={vars({ "--d": "1.5s" })}>
            <span className="relative h-px w-[72px] overflow-hidden bg-ink/15">
              <span className="scrollLine absolute inset-0 bg-a" />
            </span>
            <span>{t.scroll}</span>
          </div>
        </div>

        {/* arched "mirror" portrait */}
        <div className="heroArch relative z-[1] mt-16 md:mt-20 xl:pointer-events-none xl:absolute xl:inset-0 xl:m-0">
          <div className="relative mx-auto aspect-[460/640] w-[calc(100%-22px)] max-w-[460px] md:mx-0 md:ml-auto xl:absolute xl:top-[118px] xl:right-[100px] xl:m-0 xl:w-[460px]">
            <div aria-hidden="true" className="in absolute inset-0 translate-x-[22px] translate-y-[22px] rounded-t-full border border-a opacity-55" style={vars({ "--d": ".9s" })} />
            <div className="arch absolute inset-0 z-[1] overflow-hidden rounded-t-full bg-ph1">
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

            {/* badge overlaps the arch's lower-left corner */}
            <div className="in absolute -bottom-8 -left-3 z-[5] size-[112px] md:-left-[60px] md:size-[156px] xl:top-[492px] xl:bottom-auto xl:-left-[82px]" style={vars({ "--d": "1.4s" })}>
              <RingText id="badgeRing" size={156} r={58} text={t.badge} textLength={360} fontSize={9.5} textClassName="fill-a">
                <circle cx="78" cy="78" r="77" stroke="rgba(201,171,114,0.5)" className="fill-bg" />
              </RingText>
              <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center font-serif text-[22px] italic md:text-[30px]">
                TP
              </div>
            </div>
          </div>

          <a
            className="in pointer-events-auto absolute top-[470px] left-[calc(100%-42px)] hidden origin-top-left rotate-90 text-[10px] tracking-[0.34em] whitespace-nowrap text-muted uppercase xl:block"
            href={site.instagram.url}
            target="_blank"
            rel="noopener"
            style={vars({ "--d": "1.3s" })}
          >
            {site.instagram.handle}
          </a>
        </div>
      </section>
    </div>
  )
}

export default Hero
