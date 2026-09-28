import type { Locale } from "@/lib/i18n"

/**
 * Every outbound and placeholder link in one place. Replace the bracketed
 * values with real URLs — all CTAs on the site pick them up automatically.
 * Internal pages: lib/routes.ts.
 */

/** The smiit Analytics web app. */
export const APP_URL = "https://app.smiit-analytics.com"

export const LINKS = {
  /** Registration / free trial ("30 Tage kostenlos testen", "Kostenlos testen", …). */
  signup: APP_URL,
  /** App login. */
  login: APP_URL,
  /** Demo booking ("Demo buchen"): meeting with smiit. */
  booking: "https://nesslauer.smiit.de/meet",

  company: "https://www.smiit.de",
  linkedin: "https://de.linkedin.com/company/smiit-gmbh",
  email: "mailto:kontakt@smiit.de",
} as const

/** bexio Marketplace locale of each site language. */
const MARKETPLACE_LOCALE = { de: "de-CH", en: "en-GB", fr: "fr-CH", it: "it-CH" } as const satisfies Record<Locale, string>

/** Reviews of smiit Analytics on the bexio Marketplace, in the visitor's language. */
export const marketplaceReviews = (lang: Locale) =>
  `https://marketplace.bexio.com/${MARKETPLACE_LOCALE[lang]}/apps/128971/smiit-analytics/reviews`

/** Hosts of our own product (website + app) – opened in the same tab. */
const OWN_HOST = /(^|\.)smiit-analytics\.com$/

/** True for links that leave the product – rendered with rel="noopener" and target="_blank". */
export function isExternal(href: string) {
  if (!/^https?:\/\//.test(href)) return false
  try {
    return !OWN_HOST.test(new URL(href).hostname)
  } catch {
    return true
  }
}
