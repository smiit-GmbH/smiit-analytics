import type { Metadata } from "next"
import type { Locale } from "@/lib/dictionary"

/**
 * Single source of truth for the site origin — `app/sitemap.ts` and `app/robots.ts`
 * import it from here instead of redeclaring it.
 */
export const SITE_URL = "https://www.smiit-analytics.com"
export const SITE_NAME = "smiit Analytics"

const defaultOgImage = {
  url: "/og/home.png",
  width: 1200,
  height: 630,
  alt: "smiit Analytics",
}

type LocalizedText = { de: string; en: string }

type BuildPageMetadataInput = {
  lang: Locale
  /** Path segments after the lang segment, no leading/trailing slash. Empty for the home page. */
  path?: string
  title: LocalizedText
  description: LocalizedText
  ogImage?: { url: string; width: number; height: number; alt: string }
  /** If true, this page should not be indexed (e.g. redirect targets). */
  noindex?: boolean
}

type BreadcrumbItem = { name: string; path: string }

export function buildBreadcrumbJsonLd(lang: Locale, items: BreadcrumbItem[], includeHome = true) {
  const home = { name: lang === "de" ? "Start" : "Home", path: "" }
  const all = includeHome ? [home, ...items] : items
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}/${lang}${item.path ? `/${item.path}` : ""}/`,
    })),
  }
}

type AggregateRatingInput = {
  ratingValue: number
  reviewCount: number
  bestRating?: number
  worstRating?: number
}

function buildAggregateRatingNode({ ratingValue, reviewCount, bestRating = 5, worstRating = 1 }: AggregateRatingInput) {
  return {
    "@type": "AggregateRating",
    ratingValue,
    reviewCount,
    bestRating,
    worstRating,
  }
}

type FaqItem = { question: string; answer: string }

export function buildFaqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

type ProductReviewInput = {
  author: string
  company?: string
  reviewBody: string
  ratingValue: number
  datePublished: string
}

function buildProductReviewNode({ author, company, reviewBody, ratingValue, datePublished }: ProductReviewInput) {
  return {
    "@type": "Review",
    author: {
      "@type": "Person",
      name: author,
      ...(company ? { worksFor: { "@type": "Organization", name: company } } : {}),
    },
    reviewBody,
    reviewRating: {
      "@type": "Rating",
      ratingValue,
      bestRating: 5,
      worstRating: 1,
    },
    datePublished,
    publisher: {
      "@type": "Organization",
      name: "bexio Marketplace",
    },
  }
}

type ProductJsonLdInput = {
  lang: Locale
  /** Path segments after the lang segment, no leading/trailing slash. Empty for the landing page. */
  path?: string
  name: string
  description: LocalizedText
  image?: string
  reviews?: ProductReviewInput[]
  aggregateRating?: AggregateRatingInput
}

export function buildProductJsonLd({ lang, path = "", name, description, image, reviews, aggregateRating }: ProductJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description: description[lang],
    image: image ?? `${SITE_URL}/og/home.png`,
    url: `${SITE_URL}/${lang}${path ? `/${path}` : ""}/`,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    ...(reviews && reviews.length > 0 ? { review: reviews.map(buildProductReviewNode) } : {}),
    ...(aggregateRating ? { aggregateRating: buildAggregateRatingNode(aggregateRating) } : {}),
  }
}

export function buildPageMetadata({
  lang,
  path = "",
  title,
  description,
  ogImage = defaultOgImage,
  noindex = false,
}: BuildPageMetadataInput): Metadata {
  const localizedTitle = title[lang]
  const localizedDescription = description[lang]
  const suffix = path ? `/${path}` : ""
  const canonical = `/${lang}${suffix}/`

  return {
    metadataBase: new URL(SITE_URL),
    title: localizedTitle,
    description: localizedDescription,
    alternates: {
      canonical,
      languages: {
        de: `/de${suffix}/`,
        en: `/en${suffix}/`,
        "x-default": `/de${suffix}/`,
      },
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/site.webmanifest",
    openGraph: {
      title: localizedTitle,
      description: localizedDescription,
      url: canonical,
      siteName: SITE_NAME,
      locale: lang === "de" ? "de_DE" : "en_US",
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: localizedTitle,
      description: localizedDescription,
      images: [ogImage],
    },
  }
}
