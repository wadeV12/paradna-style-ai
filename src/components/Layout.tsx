import * as React from "react"
import { useI18n } from "../content/i18n"
import Nav from "./Nav"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { lang, t } = useI18n()
  return (
    <div className="relative w-full overflow-x-clip bg-page text-ink">
      <a href="#main" className="skip">
        {t.skip}
      </a>
      <Nav />
      <main id="main" data-lang={lang} tabIndex={-1}>
        {children}
      </main>
    </div>
  )
}

export default Layout
