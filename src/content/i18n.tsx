import * as React from "react"
import en from "./en.json"
import uk from "./uk.json"
import type { Lang } from "../config/site"

export type Dict = typeof en

export const dicts: Record<Lang, Dict> = { en, uk }

type I18n = { lang: Lang; t: Dict }

const I18nContext = React.createContext<I18n>({ lang: "en", t: en })

export const I18nProvider = ({ lang, children }: { lang: Lang; children: React.ReactNode }) => (
  <I18nContext.Provider value={{ lang, t: dicts[lang] }}>{children}</I18nContext.Provider>
)

export const useI18n = () => React.useContext(I18nContext)
