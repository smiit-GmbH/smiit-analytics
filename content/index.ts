import { de } from "./de"

/**
 * Locale registry. Only Swiss German for now; add a dictionary with the same
 * shape (SiteContent) and list it here to add a language.
 */
export const locales = ["de-CH"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "de-CH"

export type SiteContent = typeof de

const dictionaries: Record<Locale, SiteContent> = {
  "de-CH": de,
}

export function getContent(locale: Locale = defaultLocale): SiteContent {
  return dictionaries[locale]
}
