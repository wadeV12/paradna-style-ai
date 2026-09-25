import * as React from "react"
import { useI18n } from "../content/i18n"
import { viewTransition } from "../lib/motion"

type Theme = "dark" | "light"

const currentTheme = (): Theme => (document.documentElement.classList.contains("light") ? "light" : "dark")

const ThemeToggle = () => {
  const { t } = useI18n()
  // SSR renders the dark state; the real class is set pre-paint and synced here.
  const [theme, setTheme] = React.useState<Theme>("dark")
  React.useEffect(() => setTheme(currentTheme()), [])

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark"
    // Keyboard activation has no pointer position: reveal from the button's centre.
    const box = e.currentTarget.getBoundingClientRect()
    const fromPointer = e.detail > 0
    const x = fromPointer ? e.clientX : box.left + box.width / 2
    const y = fromPointer ? e.clientY : box.top + box.height / 2
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    const apply = () => {
      const root = document.documentElement
      root.classList.remove("dark", "light")
      root.classList.add(next)
      try {
        localStorage.setItem("tp-theme", next)
      } catch {}
      setTheme(next)
    }
    viewTransition("theme", apply, () => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 1100, easing: "cubic-bezier(.77,0,.18,1)", pseudoElement: "::view-transition-new(root)" },
      )
    })
  }

  const label = theme === "light" ? t.themeToDark : t.themeToLight
  return (
    <button
      type="button"
      className="themeBtn flex size-[46px] items-center justify-center rounded-full border border-ink/40 bg-transparent p-0 text-ink hover:border-a"
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      {/* Icon follows the <html> class, so it is right before hydration too. */}
      <svg className="light:hidden" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
      </svg>
      <svg className="hidden light:block" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 14.6A8.2 8.2 0 1 1 9.4 4a6.6 6.6 0 0 0 10.6 10.6z" />
      </svg>
    </button>
  )
}

export default ThemeToggle
