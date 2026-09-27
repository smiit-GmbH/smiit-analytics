import { defaultLocale, locales, type Locale } from "@/lib/dictionary"

export { defaultLocale, locales, type Locale }

export function isLocale(value: string | undefined): value is Locale {
  return (locales as readonly string[]).includes(value ?? "")
}

/** Locale of a URL path ("/fr/privacy/" → "fr"); the default locale if there is none. */
export function localeFromPath(pathname: string | null | undefined): Locale {
  const segment = pathname?.split("/")[1]
  return isLocale(segment) ? segment : defaultLocale
}

/** `<html lang>` – Swiss variants where the site follows Swiss conventions. */
export const HTML_LANG: Record<Locale, string> = {
  de: "de-CH",
  en: "en",
  fr: "fr-CH",
  it: "it-CH",
}

/** Open Graph `og:locale`. */
export const OG_LOCALE: Record<Locale, string> = {
  de: "de_CH",
  en: "en_GB",
  fr: "fr_CH",
  it: "it_CH",
}
