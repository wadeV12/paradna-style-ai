import * as React from "react"
import type { GatsbySSR } from "gatsby"
// The two faces that shape the first screen (hero name + body copy), per script.
// Preloaded here rather than via the Head API, which Gatsby re-inserts after
// hydration (a second, unused preload and a console warning).
import playfairLatin from "@fontsource/playfair-display/files/playfair-display-latin-400-normal.woff2"
import playfairCyrillic from "@fontsource/playfair-display/files/playfair-display-cyrillic-400-normal.woff2"
import montserratLatin from "@fontsource/montserrat/files/montserrat-latin-300-normal.woff2"
import montserratCyrillic from "@fontsource/montserrat/files/montserrat-cyrillic-300-normal.woff2"

// Runs before first paint: theme class (localStorage `tp-theme`, default dark),
// intro once per session (sessionStorage `tp-intro`), and the reference's
// `?still` / `?theme=light` switches for side-by-side comparison.
const prePaint = `(function(){var d=document.documentElement,q=location.search,t,s;
try{t=localStorage.getItem('tp-theme')}catch(e){}
var m=q.match(/[?&]theme=(dark|light)/);if(m)t=m[1];
d.classList.remove('dark','light');d.classList.add(t==='light'?'light':'dark');
try{s=sessionStorage.getItem('tp-intro')}catch(e){}
var still=/[?&]still(&|=|$)/.test(q);
if(s||still)d.classList.add('nointro');if(still)d.classList.add('still');})()`

// `lang` is set here, not with <html lang> in the Head API: React 19 treats
// <html> as a singleton and would wipe the classes the pre-paint script adds.
export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHeadComponents, setHtmlAttributes, pathname }) => {
  const uk = pathname.startsWith("/ua")
  setHtmlAttributes({ lang: uk ? "uk" : "en" })
  const fonts = uk ? [playfairCyrillic, montserratCyrillic] : [playfairLatin, montserratLatin]
  setHeadComponents([
    <script key="tp-prepaint" dangerouslySetInnerHTML={{ __html: prePaint }} />,
    ...fonts.map((href) => <link key={href} rel="preload" as="font" type="font/woff2" href={href} crossOrigin="anonymous" />),
  ])
}
