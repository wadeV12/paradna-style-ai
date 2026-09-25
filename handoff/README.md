# Tetyana Paradna: website handoff

Everything needed to build the approved homepage design as a real **Gatsby + Tailwind CSS** website with Claude Code in VS Code.

---

## What's inside

```
tetyana-paradna-site-handoff/
├── README.md              ← you are here (instructions for you)
├── CLAUDE.md              ← the full brief; Claude Code reads it automatically
├── design/
│   ├── reference-en.html  ← the finished design, open it in Chrome
│   ├── reference-ua.html  ← the Ukrainian version
│   ├── screenshots/       ← 10 reference screenshots (dark/light, EN/UA)
│   └── canvas-source/     ← original design file (source of truth for CSS and animations)
├── content/
│   ├── en.json            ← all English text
│   └── uk.json            ← all Ukrainian text
└── assets/
    └── hero-portrait.jpg  ← hero photo
```

**See the design first:** double-click `design/reference-en.html` (Chrome or Edge shows every animation). Try the sun/moon button and the EN | UA switch. Handy URL add-ons:
- `…/reference-en.html?theme=light`: open in light mode
- `…/reference-en.html?still`: all animations off, everything visible

The live design canvas is at https://claude.ai/artifact/3KURYzak5kL2V9RguJM4Dh

---

## Before you start (one-time)

1. **Node.js 22 or 24 (LTS)**: check with `node -v`. If missing, install from nodejs.org.
2. **Git**: check with `git --version`.
3. **VS Code** with the **Claude Code extension**, signed in to your Claude account ([setup guide](https://code.claude.com/docs/en/vs-code)).
4. Optional: a GitHub account, if you want the code backed up and to deploy from it.

---

## Step by step

### 1. Create the project folder
Unzip this package and rename the folder to what the project should be called, for example:

```
~/Projects/tetyana-paradna
```

### 2. Open it in VS Code
`File → Open Folder…` → choose that folder.

### 3. Start Claude Code
Open the Claude Code panel in VS Code. Because `CLAUDE.md` sits in the folder root, Claude loads the brief automatically.

### 4. Paste this first message

> Read CLAUDE.md, open design/reference-en.html and look at the screenshots in design/screenshots.
> Then give me a short plan: the packages and exact versions you'll use, how you'll set up Tailwind 4.2 with Gatsby 5.16, how you'll handle the EN/UA routes and the theme switch, and the milestones.
> Don't install anything until I approve the plan.

### 5. Approve the plan, then let it build
Claude works in milestones:
1. scaffold
2. theme and languages
3. sections
4. animations
5. mobile
6. SEO and performance
7. deploy

It will ask for permission before running commands. Read what it wants to run, then approve.

### 6. Watch it live
When the scaffold is done (Claude will tell you), the dev server runs with:

```
npm run develop
```

Open **http://localhost:8000**. The page reloads as Claude edits files. Compare it with `design/reference-en.html` side by side.

### 7. Review each milestone
After each step, check:
- Desktop and mobile (Chrome DevTools → device toolbar → iPhone)
- Dark and light theme
- `/` (English) and `/ua/` (Ukrainian)

Tell Claude what to change in plain words ("the hero name is too big on mobile", "slow down the ticker"). It will also commit to git after each milestone, so any step can be rolled back.

---

## Content you still need to provide

Everything marked like `[THIS]` in the text is a placeholder. Collect these and give them to Claude when ready:

- [ ] City / studio location
- [ ] Email and phone
- [ ] Prices for the 5 services
- [ ] **YouTube channel link and name**
- [ ] A real client testimonial (and the client's permission to use it)
- [ ] 7 portfolio photos (client looks), 1 editorial photo, 5 small service images
- [ ] 6 photos for the Instagram grid (or decide on a live feed)
- [ ] Short SEO descriptions in EN and UA
- [ ] Ukrainian text checked by a native speaker
- [ ] Domain name

---

## Putting it online

When the site is ready, `npm run build` creates the finished site in the `public/` folder. Easiest hosts (all have free tiers and connect to GitHub):
- **Netlify**
- **Vercel**
- **Cloudflare Pages**

Ask Claude: *"Set up deployment to Netlify from GitHub"* (or whichever you pick), and it will prepare the config and walk you through connecting the domain.

---

## Good to know

- **Fonts are self-hosted** (not loaded from Google). That's faster and avoids GDPR issues in the EU.
- **Animations** use modern CSS. In Chrome and Edge everything moves; in Safari and Firefox some scroll effects are skipped, but all content is still shown correctly.
- **Accessibility**: visitors who turn on "reduce motion" on their device get a calm, static version automatically.
- If Claude ever drifts from the design, point it back: *"Compare with design/screenshots/04-hero-dark-en.jpg and match it."*
