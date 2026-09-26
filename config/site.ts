/**
 * Site-wide settings. Replace [DOMAIN] with the production host
 * (without protocol, e.g. "www.example.ch") before going live — canonical
 * URLs, sitemap, robots.txt, Open Graph and structured data derive from it.
 */
export const DOMAIN = "www.smiit-analytics.com"

const domainIsPlaceholder = DOMAIN.startsWith("[")

/**
 * Absolute origin. While DOMAIN is still a placeholder, a reserved `.invalid`
 * host is used so the build succeeds and nothing accidentally points at a
 * real site.
 */
export const SITE_URL = domainIsPlaceholder ? "https://domain-platzhalter.invalid" : `https://${DOMAIN}`

export const SITE = {
  name: "smiit Analytics",
  locale: "de-CH",
  themeColor: "#0b162d",
  /** Default Open Graph / Twitter image (1200×630). Replace the file, keep the name. */
  ogImage: "/og/og-image.png",
} as const

export const COMPANY = {
  name: "smiit GmbH",
  website: "https://www.smiit.de",
  email: "kontakt@smiit.de",
  linkedin: "https://de.linkedin.com/company/smiit-gmbh",
  logo: "/brand/logo_black.webp",
} as const
