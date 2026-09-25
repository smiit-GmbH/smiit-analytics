/**
 * Every outbound and placeholder link in one place. Replace the bracketed
 * values with real URLs — all CTAs on the site pick them up automatically.
 */
export const LINKS = {
  /** Registration / free trial. */
  signup: "[LINK_SIGNUP]",
  /** App login. */
  login: "[LINK_LOGIN]",
  /** Demo booking (e.g. Calendly). */
  booking: "[LINK_BOOKING]",

  marketplaceReviews: "https://marketplace.bexio.com/de-CH/apps/128971/smiit-analytics/reviews",
  company: "https://www.smiit.de",
  linkedin: "https://www.linkedin.com/company/smiit-gmbh/",
  email: "mailto:kontakt@smiit.de",

  impressum: "/impressum/",
  datenschutz: "/datenschutz/",
} as const

/** True for links that leave the site — rendered with rel="noopener" and target="_blank". */
export function isExternal(href: string) {
  return /^https?:\/\//.test(href)
}
