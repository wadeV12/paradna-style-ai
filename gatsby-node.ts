import * as fs from "fs"
import * as path from "path"
import type { GatsbyNode } from "gatsby"
import { languages, site } from "./src/config/site"

// Tailwind v4 runs as a webpack loader appended to Gatsby's plain `.css` rule
// (after postcss-loader in the array, so it runs first). The HTML stages use a
// null loader for CSS, so only `develop` and `build-javascript` are touched.
export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ stage, getConfig, actions }) => {
  if (stage !== "develop" && stage !== "build-javascript") return
  const config = getConfig()
  const tailwind = { loader: "@tailwindcss/webpack", options: { base: __dirname } }
  for (const rule of config.module.rules) {
    for (const branch of rule.oneOf ?? []) {
      if (String(branch.test) === String(/\.css$/) && Array.isArray(branch.use)) branch.use.push(tailwind)
    }
  }
  actions.replaceWebpackConfig(config)
}

export const createPages: GatsbyNode["createPages"] = ({ actions }) => {
  const component = path.resolve("src/templates/home.tsx")
  for (const lang of languages) {
    actions.createPage({ path: lang.path, component, context: { lang: lang.code } })
  }
}

// sitemap.xml (with hreflang alternates) and robots.txt, written from site.url
// so they follow the domain once it is set. No plugin needed for two pages.
export const onPostBuild: GatsbyNode["onPostBuild"] = () => {
  const abs = (p: string) => new URL(p, site.url).href
  const alternates = [
    ...languages.map((l) => `    <xhtml:link rel="alternate" hreflang="${l.code}" href="${abs(l.path)}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${abs("/")}"/>`,
  ].join("\n")
  const urls = languages.map((l) => `  <url>\n    <loc>${abs(l.path)}</loc>\n${alternates}\n  </url>`).join("\n")
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`
  fs.writeFileSync(path.join("public", "sitemap.xml"), sitemap)
  fs.writeFileSync(path.join("public", "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${abs("/sitemap.xml")}\n`)
}
