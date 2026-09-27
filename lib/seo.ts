import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionary"
import { HTML_LANG, OG_LOCALE, locales, defaultLocale, type Locale } from "@/lib/i18n"
import { marketplaceReviews } from "@/lib/links"
import { PRICING } from "@/lib/pricing"
import { plain } from "@/lib/rich"
import { routePath, type Route } from "@/lib/routes"
import { COMPANY, SITE, SITE_URL } from "@/lib/site"

type PageMetadataInput = {
  lang: Locale
  route: Route
  title: string
  description: string
  noindex?: boolean
}

/** Canonical + hreflang alternates of a route (x-default = default locale). */
export function alternates(lang: Locale, route: Route): Metadata["alternates"] {
  return {
    canonical: routePath(lang, route),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, routePath(l, route)])),
      "x-default": routePath(defaultLocale, route),
    },
  }
}

/** Title, description, canonical, hreflang, Open Graph and Twitter card of a page. */
export function buildPageMetadata({ lang, route, title, description, noindex }: PageMetadataInput): Metadata {
  const dict = getDictionary(lang)
  const url = routePath(lang, route)
  const image = { url: SITE.ogImage, width: 1200, height: 630, alt: dict.meta.ogImageAlt }
  return {
    title,
    description,
    alternates: alternates(lang, route),
    openGraph: {
      type: "website",
      locale: OG_LOCALE[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      siteName: SITE.name,
      url,
      title,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    robots: noindex ? { index: false, follow: true } : undefined,
  }
}

/* ── structured data ─────────────────────────────────────────────────── */

const ORG_ID = `${COMPANY.website}/#organization`

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: COMPANY.name,
    url: COMPANY.website,
    logo: `${SITE_URL}${COMPANY.logo}`,
    email: COMPANY.email,
    sameAs: [COMPANY.linkedin],
  }
}

export function buildSoftwareApplicationJsonLd(lang: Locale) {
  const dict = getDictionary(lang)
  const t = dict.home.pricing
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.name,
    url: `${SITE_URL}${routePath(lang)}`,
    description: dict.meta.description,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: dict.meta.appCategory,
    operatingSystem: "Web",
    inLanguage: HTML_LANG[lang],
    image: `${SITE_URL}${SITE.ogImage}`,
    publisher: { "@id": ORG_ID },
    sameAs: [marketplaceReviews(lang)],
    offers: (Object.keys(PRICING.company) as (keyof typeof PRICING.company)[]).map((billing) => ({
      "@type": "Offer",
      name: `${SITE.name} – ${t.billing[billing].label}`,
      price: PRICING.company[billing],
      priceCurrency: "CHF",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: PRICING.company[billing],
        priceCurrency: "CHF",
        unitText: t.unit,
        billingDuration: "P1M",
      },
    })),
  }
}

/** FAQ items with prices filled in – shared by the page and its JSON-LD. */
export function faqItems(lang: Locale) {
  return Object.entries(getDictionary(lang).home.faq.items).map(([id, item]) => ({
    id,
    question: item.question,
    answer: item.answer.replace("{yearly}", String(PRICING.company.yearly)).replace("{monthly}", String(PRICING.company.monthly)),
  }))
}

export function buildFaqJsonLd(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: HTML_LANG[lang],
    mainEntity: faqItems(lang).map((item) => ({
      "@type": "Question",
      name: plain(item.question),
      acceptedAnswer: { "@type": "Answer", text: plain(item.answer) },
    })),
  }
}

type BreadcrumbItem = { name: string; route: Route }

export function buildBreadcrumbJsonLd(lang: Locale, items: BreadcrumbItem[]) {
  const all = [{ name: getDictionary(lang).meta.home, route: "home" as Route }, ...items]
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: plain(item.name).replace(/­/g, ""),
      item: `${SITE_URL}${routePath(lang, item.route)}`,
    })),
  }
}
