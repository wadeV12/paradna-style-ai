// Contacts, social links and languages. Everything in [BRACKETS] is a placeholder
// waiting for real content from Roman; keep them visible so nothing ships by accident.

export type Lang = "en" | "uk"

export const languages: { code: Lang; label: string; path: string }[] = [
  { code: "en", label: "EN", path: "/" },
  { code: "uk", label: "UA", path: "/ua/" },
]

export const site = {
  url: "https://example.com", // [DOMAIN]
  email: "[EMAIL]",
  phone: "[PHONE]",
  instagram: { handle: "@tania.paradna", url: "https://www.instagram.com/tania.paradna/" },
  youtube: { url: "https://www.youtube.com/" }, // [YOUTUBE CHANNEL URL]; the name is translated in content/*.json (`yt`)
}

export const pathFor = (lang: Lang) => languages.find((l) => l.code === lang)!.path
