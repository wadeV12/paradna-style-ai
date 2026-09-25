import type { GatsbyConfig } from "gatsby"
import { site } from "./src/config/site"

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Tetyana Paradna",
    siteUrl: site.url,
  },
  graphqlTypegen: false,
  trailingSlash: "always",
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "images", path: `${__dirname}/src/images` },
    },
  ],
}

export default config
