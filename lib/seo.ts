import type { Metadata } from "next"
import { COMPANY, SITE, SITE_URL } from "@/config/site"
import { LINKS } from "@/config/links"
import { getContent } from "@/content"
import { plain } from "@/lib/rich"

type PageMetaInput = {
  title: string
  description: string
  /** Path with leading and trailing slash, e.g. "/impressum/". */
  path: string
  noindex?: boolean
}

export function pageMetadata({ title, description, path, noindex }: PageMetaInput): Metadata {
  const c = getContent()
  const image = { url: SITE.ogImage, width: 1200, height: 630, alt: c.meta.ogImageAlt }
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "de_CH",
      siteName: SITE.name,
      url: path,
      title,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    robots: noindex ? { index: false, follow: true } : undefined,
  }
}

const ORG_ID = `${COMPANY.website}/#organization`

export function organizationJsonLd() {
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

export function softwareApplicationJsonLd() {
  const c = getContent()
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.name,
    url: `${SITE_URL}/`,
    description: c.meta.description,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: c.meta.appCategory,
    operatingSystem: "Web",
    inLanguage: SITE.locale,
    image: `${SITE_URL}${SITE.ogImage}`,
    publisher: { "@id": ORG_ID },
    sameAs: [LINKS.marketplaceReviews],
    offers: Object.values(c.pricing.billing).map((b) => ({
      "@type": "Offer",
      name: `${SITE.name} – ${b.label}`,
      price: b.price,
      priceCurrency: "CHF",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: b.price,
        priceCurrency: "CHF",
        unitText: plain(c.pricing.unit.replace(/^\/\s*/, "")),
        billingDuration: "P1M",
      },
    })),
  }
}

export function faqJsonLd() {
  const c = getContent()
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.items.map((item) => ({
      "@type": "Question",
      name: plain(item.question),
      acceptedAnswer: { "@type": "Answer", text: plain(item.answer) },
    })),
  }
}
