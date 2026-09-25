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

