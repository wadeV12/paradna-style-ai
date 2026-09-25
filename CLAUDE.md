# Tetyana Paradna — personal stylist website

Brief for Claude Code. Read this whole file before doing anything, then look at the design reference.

## Goal

Build the production website for **Tetyana Paradna**, a personal stylist (Instagram: [@tania.paradna](https://www.instagram.com/tania.paradna/)), as a **Gatsby** site styled with **Tailwind CSS**. The design is finished and approved. Your job is to reproduce it faithfully, make it responsive, and ship it as clean, maintainable code.

The owner of this project is **Roman**. He will review in the browser as you go. Before installing anything, propose a short plan and wait for his OK. Ask before any decision that changes the design or adds a paid/external service.

## What's in this folder

> The handoff files below now live under **`/handoff`** (e.g. `handoff/design/canvas-source/Main.dc.html`). The copy and hero photo are copied into `src/content/` and `src/images/`.

| Path | What it is |
|---|---|
| `design/reference-en.html`, `design/reference-ua.html`* | The approved design as standalone pages (desktop, 1440 px). Open in Chrome. Theme and language switches work. Add `?still` to the URL to see everything with animations off, `?theme=light` for light mode. |
| `design/screenshots/` | Full-page and section screenshots (dark/light, EN/UA) to compare against. |
| `design/canvas-source/Main.dc.html` | **The source of truth.** Original design file: all CSS (tokens, keyframes, scroll-driven animations), markup structure, and the EN/UA dictionary inside the script. It's a template format: `{{hole}}` = value, `<sc-for>` = loop, `<sc-if>` = conditional, and `renderVals()` in the script computes the values. Don't try to run it; read it. |
| `content/en.json`, `content/uk.json` | All copy in English and Ukrainian (same keys). |
| `assets/hero-portrait.jpg` | Hero photo (1440×1800). |

\* Naming: in code and HTML use the ISO language code **`uk`** (hence `content/uk.json`, `<html lang="uk">`). The label users see is **UA**, and the URL is `/ua/`.

Keep these handoff folders in the repo (for example under `/handoff`) or delete them once the site matches. Ask Roman first.

## Stack (latest stable, check current docs before installing)

- **Gatsby 5.16** (January 2026). Supports React 19 and Node 24. Use **React 19**. Note: Gatsby disables React 19 document metadata hoisting; use the Gatsby **Head API** for `<title>`, meta, `<html lang>`. Avoid Partial Hydration (incompatible with React 19).
- **Tailwind CSS 4.2**: CSS-first config (`@import "tailwindcss"`, `@theme`, `@utility`, `@custom-variant`), no `tailwind.config.js` needed. Gatsby is webpack-based. Prefer the official **`@tailwindcss/webpack`** plugin (new in 4.2), wired in through `onCreateWebpackConfig` in `gatsby-node`. If that fights Gatsby's CSS pipeline, fall back to `gatsby-plugin-postcss` + `@tailwindcss/postcss`. Verify the exact setup against the Tailwind docs; both are recent.
- **TypeScript** preferred (Gatsby supports it natively).
- **Images**: `gatsby-plugin-image` + `gatsby-plugin-sharp` + `gatsby-source-filesystem` (or `StaticImage`).
- **Fonts: self-host with `@fontsource`**. Don't load from Google's CDN: it's a GDPR problem in the EU, and it's slower.
  - `@fontsource/playfair-display`: 400, 500, 400-italic, 500-italic. Display/headings.
  - `@fontsource/montserrat`: 300, 400, 500. Body/UI.
  - `@fontsource/pinyon-script`: signature, EN only.
  - `@fontsource/marck-script`: signature, UA only (Pinyon has no Cyrillic).
- Keep dependencies minimal. **No animation library is needed**: every animation is plain CSS (keyframes, scroll-driven `animation-timeline`) plus the View Transitions API. Don't add GSAP/Framer Motion unless Roman asks.
- Node 22 or 24 LTS. npm (unless Roman prefers pnpm).

## Design system

### Colour tokens

Two themes; **dark is the default**. The accent (champagne) is a single variable; light mode derives a darker accent from it for contrast.

| Token | Dark | Light | Use |
|---|---|---|---|
| `--accent` | `#C9AB72` | same base | brand champagne (alternatives from design: `#D1A392` rose gold, `#D9D3C7` pearl, `#AEB8A6` sage) |
| `--a` (effective accent) | `var(--accent)` | `color-mix(in oklab, var(--accent) 58%, #1A1208)` | all accent text, lines, fills |
| `--on-a` | `#0E0C0A` | `#F7F2EA` | text on accent fills (buttons, orb) |
| `--ink` / `--ink-rgb` | `#EFE8DC` / `239,232,220` | `#1A1510` / `26,21,16` | main text; hairlines use `rgba(var(--ink-rgb), .08–.4)` |
| `--muted` | `#A79E90` | `#5F5548` | labels, captions |
| `--soft` | `#BDB4A6` | `#4A4239` | body paragraphs |
| `--bg` / `--bg-rgb` | `#0E0C0A` / `14,12,10` | `#F4EFE7` / `244,239,231` | main section background; nav uses `rgba(var(--bg-rgb), .74)` + blur |
| `--bg2` | `#15120F` | `#ECE5D9` | alternate sections (services, portfolio, footer) |
| `--bg3` | `#0A0908` | `#E4DBCC` | testimonial, intro overlay |
| `--page` | `#050404` | `#CFC5B5` | page backdrop visible between "card" sections |
| `--ph1…--ph11` | dark taupes | light taupes | image placeholders (exact values in the source CSS) |

Implement as CSS variables on `html` (class `dark` / `light`) and expose them to Tailwind with `@theme inline` (for example `--color-ink: var(--ink)`) so utilities like `bg-bg2 text-ink border-ink/10` work.

### Typography

- Display: Playfair Display 400, often italic in accent colour for the second line of headings. Sizes at 1440: hero name 148px (line-height .98); section h2 90–116px; service titles 42px; step titles 28px.
- Body/UI: Montserrat. Paragraphs 15–17px, weight 300, line-height 1.75–1.85. Labels 10–12px uppercase, letter-spacing .22–.34em.
- Signature: Pinyon Script (EN) / Marck Script (UA), 66px, accent colour.
- Use `clamp()` so sizes scale down responsively.

### Layout

- Desktop design width 1440; content column 1216 (112px side padding); nav 88px tall with 72px side padding.
- Section vertical padding ~170–190px at desktop.
- Hero portrait: an **arch** 460×640 (`border-radius: 230px 230px 0 0`) with a 1px accent outline arch offset 22px right and 22px down at 55% opacity; `object-position: 54% 0%`.

## Page structure (single page, two languages)

1. **Intro overlay**: full-screen `--bg3`, name in spaced uppercase + gold hairline, then lifts away (clip-path) at ~1.15s. Plays **once per session** (sessionStorage), never with reduced motion.
2. **Nav (sticky)**: TP monogram + name · links (Approach, Services, Journey, Portfolio, Journal → in-page anchors) · **EN | UA** switch · **theme toggle** (sun/moon) · "Book a consultation" ghost button. 1px accent **scroll-progress bar** under it (`animation-timeline: scroll()`).
3. **Hero**: eyebrow · name (letters rise one by one) · "Style is ___" rotating word ticker (5 words, 11s loop) · tagline · CTA buttons · "Scroll to discover" line · arched portrait with reveal + slow Ken Burns + recurring light sweep ("mirror") · rotating circular badge · vertical @handle link.
4. **Approach (01)**: manifesto text revealed word by word on scroll; key words italic accent · handwritten signature revealed left to right · arched editorial image placeholder with parallax.
5. **Services (02)**: heading + intro · 5 service rows (number, title, description, price, arrow). Hover: other rows dim, title slides + goes italic accent, gold underline draws, arrow rotates, **an arched preview image follows the cursor** (one per service). Giant outlined "02" drifting behind.
6. **Journey (03)**: 4 steps (roman numerals as outlined text that fill on hover) · gold line with glowing dot drawn by scroll · steps stagger in.
7. **Portfolio (04)**: **pinned horizontal gallery**: vertical scroll moves a track of 7 look cards sideways (`view-timeline` on a 2600px-tall section, sticky inner), with a progress line. Cards alternate rectangle/arch shapes and vertical offsets.
8. **Testimonial**: big quote mark swings in · quote reveals bottom-up · rotating ring text.
9. **Journal (05)**: Instagram grid of 6 tiles (staggered offsets, bottom-up reveal, hover zoom + IG icon overlay), link to Instagram.
10. **Footer / Contact (06)**: "Let's define your style." · rotating "Book a consultation" orb (mailto) · contacts: Email, Instagram, **YouTube**, Phone · huge outlined name that spreads its letters on scroll · © line + back to top.

## Motion spec

Port the keyframes **verbatim** from `design/canvas-source/Main.dc.html` into your global CSS (Tailwind v4 lets you keep raw `@keyframes` next to `@theme`). Key behaviours:

- **Load choreography**: all offsets from `--t0` (1.35s after intro, 0.1s without). Easing `cubic-bezier(.19,1,.22,1)` for reveals, `cubic-bezier(.77,0,.18,1)` for wipes.
- **Scroll-driven, all inside `@supports (animation-timeline: view())`**:
  - **Sections as cards**: `.sec` gets two animations at once: `secIn` (entry 0–70%: from radius 80px top + scale .95) and `secOut` (exit 35–100%: to scale .9, opacity .15, radius 80px bottom). Page backdrop `--page` shows between them.
  - **Hero exit** (named timeline `--hero`): text layer moves up 160px, fades, blurs 6px; arch layer moves down 200px, scales 1.07.
  - **Heading lines rise out of a mask** (`.mask` sets `view-timeline-name: --m`; `.lu` animates from translateY(110%) rotate(2.5deg)).
  - Word-by-word manifesto ink (opacity .14 → 1), signature clip reveal, drifting giant numerals (±160px), image and tile clip reveals with staggered `animation-range`, drawn journey line, quote mark swing, footer name letter-spacing spread, page progress bar.
- **Browsers without scroll-driven animations** (Safari/Firefox today) must still show all content, un-animated. The portfolio falls back to a horizontal swipe row. Don't polyfill unless Roman asks.
- **Theme switch**: View Transitions API. New theme revealed as a circle expanding from the click point (1.1s). Instant fallback.
- **Language switch**: soft blur/fade view transition when navigating between `/` and `/ua/`. Instant fallback.
- **Custom cursor** (34px ring, `mix-blend-mode: difference`, grows to 84px over links) and the **service preview follower**: `requestAnimationFrame` lerp. Only for `(hover: hover) and (pointer: fine)`.
- **Reduced motion**: `prefers-reduced-motion: reduce` disables all of the above (no intro, no transitions, no cursor), with content fully visible.

## Internationalisation

- Routes: **`/` = English**, **`/ua/` = Ukrainian**. Generate both from the same page component + `content/*.json`. Move the JSON into `src/content/`.
- The **EN | UA** switch is a pair of links to the same section on the other route (keep the `#hash`). Active language in accent with an underline. `aria-current`/`aria-pressed` on the active one.
- Head API per page: `<html lang="en|uk">`, translated `<title>` + meta description (write them; ask Roman to approve), `hreflang` alternates (en, uk, x-default → en), canonical, Open Graph (hero photo as image).
- Hero name letters come from `first` / `last` in the JSON. Ticker words `w1…w5`. Manifesto emphasis words are listed in `em`. Portfolio card titles in `looks`.
- Don't auto-redirect by browser language. Offer it to Roman as an option only.

## Theme

- Default **dark**. Persist the choice in `localStorage` (`tp-theme`).
- Set the class on `<html>` **before first paint** with a tiny inline script (via `onRenderBody` in `gatsby-ssr`) so there's no flash of the wrong theme.
- Toggle button: sun icon in dark mode, moon in light mode, `aria-label` translated.

## Responsive behaviour (the design is desktop-only; you define mobile)

Breakpoints: design at ≥1280; tablet 768–1279; mobile <768 (test 390 and 375 wide).
- **Nav**: below ~1100px collapse links into a menu button → full-screen overlay menu (same fonts; links stagger in). EN|UA and theme stay visible.
- **Hero**: stack. Name first (size via `clamp`), then ticker, tagline and CTAs, then the arch portrait (full width, max 460px), badge overlapping its corner. Hero scroll-exit parallax only on desktop.
- **Services**: rows become stacked cards (number + title, then description, then price). No cursor preview on touch.
- **Journey**: 2×2 on tablet, 1 column on mobile. The line becomes vertical on mobile, or hide it.
- **Portfolio**: pinned horizontal scroll only ≥1024px. Below that, a native horizontal scroll-snap carousel.
- **Journal**: 3 columns on tablet, 2 on mobile.
- **Footer**: stack heading, orb and contacts. Outlined name scales with `vw`.
- Giant section numerals: hide on mobile.
- Section "card" effect: keep on all sizes but reduce radius (32px on mobile).

## Accessibility and quality bar

- Semantic landmarks, one `h1`, logical `h2`/`h3`. Skip-to-content link. Visible `:focus-visible` styles (2px accent outline; the design has none, so add them).
- Real `<a>`/`<button>` elements; decorative SVGs `aria-hidden`. Alt text for the hero is in the JSON (`portrait`).
- Contrast ≥ 4.5:1 for text in both themes (tokens above were chosen for this; recheck if you change them).
- Lighthouse (mobile) ≥ 90 for Performance, Accessibility, Best Practices, SEO. Hero image is the LCP: eager + high priority, sized properly.
- No layout shift from fonts: preload the 2 critical faces and use `font-display: swap`.
- No console errors. `gatsby build` must pass.

## Placeholders to replace (ask Roman)

City · email · phone · prices (5 services) · YouTube channel URL and name · client testimonial + name · portfolio photos (7) · editorial image (Approach) · service preview images (5) · Instagram tiles (6; static images are fine, or ask whether he wants a live feed) · meta descriptions · final Ukrainian copy check by a native speaker · favicon (TP monogram) · domain.

Keep placeholders visible as `[LIKE THIS]` so nothing ships by accident. Collect them in one place (the JSON files + a `src/config/site.ts` for contacts/links).

## Suggested structure

```
src/
  components/  Nav, LangSwitch, ThemeToggle, Intro, Cursor, Hero, Approach,
               Services, Journey, Portfolio, Testimonial, Journal, Footer, Seo
  content/     en.json, uk.json
  config/      site.ts        (contacts, social links, languages)
  images/      hero-portrait.jpg, …
  styles/      global.css     (Tailwind import, @theme tokens, keyframes, scroll-driven CSS)
  templates/   home.tsx       (one template, rendered for / and /ua/)
gatsby-config.ts  gatsby-node.ts  gatsby-ssr.tsx  gatsby-browser.tsx
```

## Working agreement

1. Start with a plan: packages + exact versions, the Tailwind integration approach, file structure, milestones. Wait for approval.
2. Milestones (commit after each, conventional commit messages):
   1. scaffold + Tailwind + fonts + tokens
   2. layout, nav, theme, i18n routes
   3. sections, static
   4. animations
   5. responsive
   6. SEO/a11y/performance
   7. deploy config
3. After each milestone, tell Roman what to look at on `http://localhost:8000` and compare with `design/screenshots/`.
4. When the design and a best practice conflict, flag it and propose. Don't silently change the look.
