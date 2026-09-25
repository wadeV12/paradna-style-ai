import * as React from "react"
import { graphql, type HeadFC, type PageProps } from "gatsby"
import type { IGatsbyImageData } from "gatsby-plugin-image"
import type { Lang } from "../config/site"
import { I18nProvider } from "../content/i18n"
import Layout from "../components/Layout"
import Hero from "../components/Hero"
import Approach from "../components/Approach"
import Services from "../components/Services"
import Journey from "../components/Journey"
import Portfolio from "../components/Portfolio"
import Testimonial from "../components/Testimonial"
import Journal from "../components/Journal"
import Seo from "../components/Seo"

type Ctx = { lang: Lang }
type Data = {
  hero: { childImageSharp: { gatsbyImageData: IGatsbyImageData } } | null
  og: { childImageSharp: { resize: { src: string; width: number; height: number } } } | null
}

const Home = ({ data, pageContext }: PageProps<Data, Ctx>) => (
  <I18nProvider lang={pageContext.lang}>
    <Layout>
      <Hero image={data.hero?.childImageSharp.gatsbyImageData} />
      <Approach />
      <Services />
      <Journey />
      <Portfolio />
      <Testimonial />
      <Journal />
    </Layout>
  </I18nProvider>
)

export default Home

export const query = graphql`
  query HomePage {
    hero: file(relativePath: { eq: "hero-portrait.jpg" }) {
      childImageSharp {
        gatsbyImageData(
          width: 460
          placeholder: NONE
          formats: [AUTO, WEBP, AVIF]
          quality: 80
          outputPixelDensities: [1, 1.5, 2, 3]
          # arch is 460px from 530px up; below that it spans the column minus gutters and the 22px outline
          sizes: "(min-width: 530px) 460px, calc(100vw - 70px)"
        )
      }
    }
    og: file(relativePath: { eq: "hero-portrait.jpg" }) {
      childImageSharp {
        resize(width: 1200, height: 630, cropFocus: NORTH, quality: 85) {
          src
          width
          height
        }
      }
    }
  }
`

export const Head: HeadFC<Data, Ctx> = ({ data, pageContext }) => (
  <Seo lang={pageContext.lang} hero={data.hero?.childImageSharp.gatsbyImageData} ogImage={data.og?.childImageSharp.resize} />
)
