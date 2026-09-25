import * as path from "path"
import type { GatsbyNode } from "gatsby"
import { languages } from "./src/config/site"

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
