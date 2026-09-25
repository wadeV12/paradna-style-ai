import * as React from "react"
import type { HeadFC } from "gatsby"
import { I18nProvider } from "../content/i18n"
import Layout from "../components/Layout"

// Bilingual on purpose: a missing URL doesn't tell us which language the visitor wanted.
const NotFound = () => (
  <I18nProvider lang="en">
    <Layout>
      <section className="sec bg-bg">
        <div className="mx-auto flex min-h-[70vh] max-w-[1440px] flex-col justify-center px-[112px] py-[140px]">
          <div className="mb-[30px] text-[11px] tracking-[0.32em] text-muted uppercase">404</div>
          <h1 className="m-0 font-serif text-[min(96px,12vw)] leading-none font-normal">
            Page not found <span className="block text-a italic">Сторінку не знайдено</span>
          </h1>
          <div className="mt-12 flex gap-10 text-[11px] font-medium tracking-[0.24em] uppercase">
            <a className="ul" href="/">
              Home
            </a>
            <a className="ul" href="/ua/" lang="uk">
              На головну
            </a>
          </div>
        </div>
      </section>
    </Layout>
  </I18nProvider>
)

export default NotFound

export const Head: HeadFC = () => (
  <>
    <title>404 — Tetyana Paradna</title>
    <meta name="robots" content="noindex" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  </>
)
