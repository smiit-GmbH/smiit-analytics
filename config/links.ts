/**
 * Every outbound and placeholder link in one place. Replace the bracketed
 * values with real URLs — all CTAs on the site pick them up automatically.
 */

/** The smiit Analytics web app. */
export const APP_URL = "https://app.smiit-analytics.com"

export const LINKS = {
  /** Registration / free trial ("30 Tage kostenlos testen", "Kostenlos testen", …). */
  signup: APP_URL,
  /** App login. */
  login: APP_URL,
  /** Demo booking (e.g. Calendly). */
  booking: "[LINK_BOOKING]",

  marketplaceReviews: "https://marketplace.bexio.com/de-CH/apps/128971/smiit-analytics/reviews",
  company: "https://www.smiit.de",
  linkedin: "https://de.linkedin.com/company/smiit-gmbh",
  email: "mailto:kontakt@smiit.de",

  impressum: "/impressum/",
  datenschutz: "/datenschutz/",
  nutzungsbedingungen: "/nutzungsbedingungen/",
  avv: "/avv/",
} as const

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
