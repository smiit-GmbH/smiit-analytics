import type { Dictionary } from "@/lib/dictionary"
import { locales, type Locale } from "@/lib/i18n"
import { DEMO_VIDEO_LANGS } from "@/lib/media"

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
  demo: "demo",
} as const

export type Route = keyof typeof ROUTES

/** Pages that exist in some languages only — the demo video is spoken German. All others exist in every language. */
const ROUTE_LOCALES: Partial<Record<Route, readonly Locale[]>> = { demo: DEMO_VIDEO_LANGS }

/** The languages a route exists in (static params, sitemap, hreflang, language switcher). */
export function routeLocales(route: Route): readonly Locale[] {
  return ROUTE_LOCALES[route] ?? locales
}

/** The route a path segment belongs to ("privacy" → privacy, "" → home); null for an unknown segment. */
export function routeOfSegment(segment: string): Route | null {
  return (Object.keys(ROUTES) as Route[]).find((r) => ROUTES[r] === segment) ?? null
}

/** Pages in the sitemap. */
export const PUBLIC_ROUTES: { route: Route; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
  { route: "home", priority: 1, changeFrequency: "monthly" },
  { route: "demo", priority: 0.6, changeFrequency: "monthly" },
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

/**
 * Customer logos (Trust, below the hero) and customer quotes (Testimonials) stay in the code but are hidden until
 * there is real content. `true` shows both again, including the "testimonials" chapter.
 */
export const SHOW_SOCIAL_PROOF = false

/** Chapter rail: every visible section of the home page, in page order (labels: `nav.chapters.items`). */
export const CHAPTER_SECTIONS = (Object.keys(SECTIONS) as (keyof typeof SECTIONS)[]).filter(
  (s) => SHOW_SOCIAL_PROOF || s !== "testimonials",
)

/** Main navigation (mobile menu, footer): sections in this order, labels in `nav.items`. */
export const NAV_SECTIONS = [
  "features",
  "ai",
  "automations",
  "pricing",
  "faq",
] as const satisfies readonly (keyof Dictionary["nav"]["items"] & keyof typeof SECTIONS)[]

/** Anchor of a FAQ question: "faq-mcp". */
export const faqAnchor = (id: string) => `faq-${id}`

/** Legal pages in footer order. */
export const LEGAL_ROUTES = ["legalNotice", "privacy", "terms", "dpa"] as const satisfies readonly (Route & keyof Dictionary["legal"])[]
