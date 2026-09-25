import * as React from "react"
import { useI18n } from "../content/i18n"
import { Label, PhCaption } from "./ui"

const Approach = () => {
  const { lang, t } = useI18n()
  const em = new Set(t.em)
  const words = t.manifesto.split(" ")

  return (
    <section id="approach" className="sec border-t border-ink/8 bg-bg">
      <div className="mx-auto grid max-w-[1440px] grid-cols-[200px_minmax(0,1fr)_300px] items-start gap-14 px-[112px] pt-[190px] pb-[180px]">
        <Label className="pt-4">
          <h2 className="m-0 font-normal">{t.l1}</h2>
        </Label>
        <div>
          <p className="m-0 font-serif text-[46px] leading-[1.34]">
            {words.map((w, i) => (
              <span key={i} className={`word ${em.has(w) ? "text-a italic" : ""}`}>
                {w}{" "}
              </span>
            ))}
          </p>
          <div className={`sign mt-11 text-[66px] leading-[1.2] text-a ${lang === "uk" ? "font-sign-uk" : "font-sign-en"}`}>{t.name}</div>
        </div>
        <div className="para relative mt-[30px]">
          <div className="imgIn relative h-[420px] w-[300px] overflow-hidden rounded-t-[150px] bg-ph3">
            <PhCaption className="text-muted">{t.edImg}</PhCaption>
          </div>
          <div className="mt-4 text-[11px] tracking-[0.24em] text-muted uppercase">{t.edCap}</div>
        </div>
      </div>
    </section>
  )
}

export default Approach
