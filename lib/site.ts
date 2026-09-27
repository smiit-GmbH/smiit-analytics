/**
 * Site-wide settings. Canonical URLs, sitemap, robots.txt, Open Graph and
 * structured data all derive from DOMAIN.
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
  themeColor: "#0b162d",
} as const

/** The company behind the product – legal notice, footer and structured data. Same as on www.smiit.de. */
export const COMPANY = {
  name: "smiit GmbH",
  website: "https://www.smiit.de",
  email: "kontakt@smiit.de",
  phone: "+49 160 4073198",
  linkedin: "https://de.linkedin.com/company/smiit-gmbh",
  logo: "/brand/logo_black.webp",
  address: {
    street: "Reiherweg 96",
    postalCode: "89584",
    city: "Ehingen",
    /** ISO 3166-1 alpha-2; the country name is in the dictionary (`legal.legalNotice.country`). */
    country: "DE",
  },
  managingDirectors: ["Sebastian Grab", "Noah Neßlauer"],
  /** Register court: `legal.legalNotice.registerCourt` in the dictionary. */
  registerNumber: "HRB 741965",
  vatId: "DE357299821",
  /** Responsible for content (§ 18 Abs. 2 MStV), at the company address. */
  contentResponsible: "Noah Neßlauer",
} as const
