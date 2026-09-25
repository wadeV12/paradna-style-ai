import * as React from "react"
import type { IGatsbyImageData } from "gatsby-plugin-image"
import { dicts } from "../content/i18n"
import { languages, site, type Lang } from "../config/site"

const ogLocale: Record<Lang, string> = { en: "en_US", uk: "uk_UA" }
const abs = (path: string) => new URL(path, site.url).href

type Props = {
  lang: Lang
  hero?: IGatsbyImageData
  ogImage?: { src: string; width: number; height: number }
}

/** Head tags for a home page: title, description, canonical, hreflang, Open Graph, hero preload.
 *  Font preloads live in gatsby-ssr.tsx. */
const Seo = ({ lang, hero, ogImage }: Props) => {
  const t = dicts[lang]
  const self = languages.find((l) => l.code === lang)!
  const avif = hero?.images.sources?.find((s) => s.type === "image/avif")

  return (
    <>
      <title>{t.metaTitle}</title>
      <meta name="description" content={t.metaDescription} />
      <meta name="theme-color" content="#0E0C0A" />
      <link rel="canonical" href={abs(self.path)} />
      {languages.map((l) => (
        <link key={l.code} rel="alternate" hrefLang={l.code} href={abs(l.path)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={abs("/")} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={t.name} />
      <meta property="og:title" content={t.metaTitle} />
      <meta property="og:description" content={t.metaDescription} />
      <meta property="og:url" content={abs(self.path)} />
      <meta property="og:locale" content={ogLocale[lang]} />
      {languages
        .filter((l) => l.code !== lang)
        .map((l) => (
          <meta key={l.code} property="og:locale:alternate" content={ogLocale[l.code]} />
        ))}
      {ogImage && (
        <>
          <meta property="og:image" content={abs(ogImage.src)} />
          <meta property="og:image:width" content={String(ogImage.width)} />
          <meta property="og:image:height" content={String(ogImage.height)} />
          <meta property="og:image:alt" content={t.portrait} />
        </>
      )}
      <meta name="twitter:card" content="summary_large_image" />

      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* LCP: the hero portrait, fetched early at high priority */}
      {avif && <link rel="preload" as="image" type="image/avif" imageSrcSet={avif.srcSet} imageSizes={avif.sizes} fetchPriority="high" />}
    </>
  )
}

export default Seo
