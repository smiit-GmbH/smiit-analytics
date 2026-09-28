import type { Dictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n"

/**
 * Every page of the site. Paths are English in all languages and sit below
 * the locale segment: /de/privacy/, /fr/privacy/, …
 */
export const ROUTES = {
  home: "",
  legalNotice: "legal-notice",
  privacy: "privacy",
  terms: "terms",
  dpa: "dpa",
} as const

export type Route = keyof typeof ROUTES

/** Pages in the sitemap. */
export const PUBLIC_ROUTES: { route: Route; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
  { route: "home", priority: 1, changeFrequency: "monthly" },
  { route: "legalNotice", priority: 0.2, changeFrequency: "yearly" },
  { route: "privacy", priority: 0.2, changeFrequency: "yearly" },
  { route: "terms", priority: 0.2, changeFrequency: "yearly" },
  { route: "dpa", priority: 0.2, changeFrequency: "yearly" },
]

/** Path of a route in a locale, with trailing slash (static export): "/de/privacy/". */
export function routePath(lang: Locale, route: Route = "home", hash?: string) {
  const segment = ROUTES[route]
  return `/${lang}/${segment ? `${segment}/` : ""}${hash ? `#${hash}` : ""}`
}

/** Section anchors of the home page. */
export const SECTIONS = {
  problem: "problem",
  howItWorks: "how-it-works",
  features: "features",
  customize: "customize",
  ai: "ai",
  automations: "automations",
  audiences: "audiences",
  testimonials: "testimonials",
  pricing: "pricing",
  security: "security",
  faq: "faq",
} as const

/** Chapter rail: every section of the home page, in page order (labels: `nav.chapters.items`). */
export const CHAPTER_SECTIONS = Object.keys(SECTIONS) as (keyof typeof SECTIONS)[]

/** Main navigation (mobile menu, footer): sections in this order, labels in `nav.items`. */
export const NAV_SECTIONS = ["features", "ai", "automations", "pricing", "faq"] as const satisfies readonly (keyof Dictionary["nav"]["items"] &
  keyof typeof SECTIONS)[]

/** Anchor of a FAQ question: "faq-mcp". */
export const faqAnchor = (id: string) => `faq-${id}`

/** Legal pages in footer order. */
export const LEGAL_ROUTES = ["legalNotice", "privacy", "terms", "dpa"] as const satisfies readonly (Route & keyof Dictionary["legal"])[]
