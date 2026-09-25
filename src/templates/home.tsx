import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import type { Lang } from "../config/site"
import { I18nProvider, dicts, useI18n } from "../content/i18n"
import Layout from "../components/Layout"

type Ctx = { lang: Lang }

// Milestone 2: section stubs so the nav anchors and the EN|UA hash hand-off can
// be tested. Replaced by the real sections in milestone 3.
const Stubs = () => {
  const { t } = useI18n()
  const stubs = [
    ["top", t.name, "bg-bg"],
    ["approach", t.l1, "bg-bg"],
    ["services", t.l2, "bg-bg2"],
    ["journey", t.l3, "bg-bg"],
    ["portfolio", t.l4, "bg-bg2"],
    ["journal", t.l5, "bg-bg"],
    ["contact", t.l6, "bg-bg2"],
  ] as const
  return (
    <>
      {stubs.map(([id, label, bg], i) => (
        <section key={id} id={id} className={`${bg} border-t border-ink/10`}>
          <div className="mx-auto flex min-h-[80vh] max-w-[1440px] items-center px-[112px]">
            {i === 0 ? (
              <h1 className="font-serif text-[148px] leading-[0.98] font-normal">
                {t.first} <span className="text-a italic">{t.last}</span>
              </h1>
            ) : (
              <h2 className="font-serif text-[90px] leading-none font-normal">{label}</h2>
            )}
          </div>
        </section>
      ))}
    </>
  )
}

const Home = ({ pageContext }: PageProps<object, Ctx>) => (
  <I18nProvider lang={pageContext.lang}>
    <Layout>
      <Stubs />
    </Layout>
  </I18nProvider>
)

export default Home

export const Head: HeadFC<object, Ctx> = ({ pageContext }) => {
  const t = dicts[pageContext.lang]
  return (
    <>
      <html lang={pageContext.lang} />
      <title>{t.metaTitle}</title>
      <meta name="description" content={t.metaDescription} />
      <meta name="theme-color" content="#0E0C0A" />
    </>
  )
}
