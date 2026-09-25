import type { GatsbyBrowser } from "gatsby"
import "@fontsource/playfair-display/400.css"
import "@fontsource/playfair-display/500.css"
import "@fontsource/playfair-display/400-italic.css"
import "@fontsource/playfair-display/500-italic.css"
import "@fontsource/montserrat/300.css"
import "@fontsource/montserrat/400.css"
import "@fontsource/montserrat/500.css"
import "@fontsource/pinyon-script/400.css"
import "@fontsource/marck-script/400.css"
import "./src/styles/global.css"

// Client-side page changes (EN ⇄ UA) remount the layout: don't replay the
// intro, and start the hero choreography immediately.
export const onPreRouteUpdate: GatsbyBrowser["onPreRouteUpdate"] = ({ location, prevLocation }) => {
  if (prevLocation && prevLocation.pathname !== location.pathname) document.documentElement.classList.add("nointro")
}

// Gatsby renders the Head API into a hidden <div>, and silences React's
// "<html> inside <div>" dev warning, but only in React 18's wording. Same
// filter for React 19's wording. Development only.
if (process.env.NODE_ENV === "development") {
  const original = console.error.bind(console)
  console.error = (...args: unknown[]) => {
    const [msg, el] = args
    if (typeof msg === "string" && msg.startsWith("In HTML, %s cannot be a child of") && (el === "<html>" || el === "<body>")) return
    original(...args)
  }
}
