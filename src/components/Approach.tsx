import * as React from "react"
import { useI18n } from "../content/i18n"
import { Label, PhCaption, gutter } from "./ui"

const Approach = () => {
  const { lang, t } = useI18n()
  const em = new Set(t.em)
  const words = t.manifesto.split(" ")

  return (
    <section id="approach" className="sec border-t border-ink/8 bg-bg">
      <div className={`mx-auto grid max-w-[1440px] items-start gap-10 py-24 md:grid-cols-[minmax(0,1fr)_260px] md:gap-14 md:py-36 xl:grid-cols-[200px_minmax(0,1fr)_300px] xl:pt-[190px] xl:pb-[180px] ${gutter}`}>
        <Label className="md:col-span-2 xl:col-span-1 xl:pt-4">
          <h2 className="m-0 font-normal">{t.l1}</h2>
        </Label>
        <div>
          <p className="m-0 font-serif text-[clamp(27px,2.4vw+12px,46px)] leading-[1.34]">
            {words.map((w, i) => (
              <span key={i} className={`word ${em.has(w) ? "text-a italic" : ""}`}>
                {w}{" "}
              </span>
            ))}
          </p>
          <div className={`sign mt-8 text-[clamp(48px,3vw+23px,66px)] leading-[1.2] text-a md:mt-11 ${lang === "uk" ? "font-sign-uk" : "font-sign-en"}`}>{t.name}</div>
        </div>
        <div className="para relative md:mt-[30px]">
          <div className="imgIn relative aspect-[300/420] w-full max-w-[300px] overflow-hidden rounded-t-full bg-ph3">
            <PhCaption className="text-muted">{t.edImg}</PhCaption>
          </div>
          <div className="mt-4 text-[11px] tracking-[0.24em] text-muted uppercase">{t.edCap}</div>
        </div>
      </div>
    </section>
  )
}

export default Approach
