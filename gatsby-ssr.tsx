import * as React from "react"
import type { GatsbySSR } from "gatsby"

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
  setHtmlAttributes({ lang: pathname.startsWith("/ua") ? "uk" : "en" })
  setHeadComponents([<script key="tp-prepaint" dangerouslySetInnerHTML={{ __html: prePaint }} />])
}
