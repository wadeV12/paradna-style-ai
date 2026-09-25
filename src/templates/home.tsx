import * as React from "react"
import { graphql, type HeadFC, type PageProps } from "gatsby"
import type { IGatsbyImageData } from "gatsby-plugin-image"
import type { Lang } from "../config/site"
import { I18nProvider, dicts } from "../content/i18n"
import Layout from "../components/Layout"
import Hero from "../components/Hero"
import Approach from "../components/Approach"
import Services from "../components/Services"
import Journey from "../components/Journey"
import Portfolio from "../components/Portfolio"
import Testimonial from "../components/Testimonial"
import Journal from "../components/Journal"

type Ctx = { lang: Lang }
type Data = { hero: { childImageSharp: { gatsbyImageData: IGatsbyImageData } } | null }

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
        gatsbyImageData(width: 460, placeholder: NONE, formats: [AUTO, WEBP, AVIF], quality: 80, outputPixelDensities: [1, 1.5, 2, 3])
      }
    }
  }
`

export const Head: HeadFC<Data, Ctx> = ({ pageContext }) => {
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
