import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import "../globals.css"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CalendlyHandler } from "@/components/calendly-handler"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { Analytics } from "@/components/analytics"
import { SITE_NAME, SITE_URL, buildPageMetadata } from "@/lib/seo"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return buildPageMetadata({
    lang: lang === "en" ? "en" : "de",
    title: {
      de: "smiit Analytics – Datenanalyse-Plattform mit KI",
      en: "smiit Analytics – AI-powered data analytics platform",
    },
    description: {
      de: "smiit Analytics führt Ihre Unternehmensdaten in einem Datenmodell zusammen und liefert Dashboards, Auswertungen und KI-gestützte Analysen — einmaliger Preis, volle Eigentümerschaft.",
      en: "smiit Analytics consolidates your business data into one model and delivers dashboards, reports and AI-assisted analytics — one-time price, full ownership.",
    },
  })
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0B162D" },
  ],
  width: "device-width",
  initialScale: 1,
}

export async function generateStaticParams() {
  return [{ lang: "de" }, { lang: "en" }]
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  legalName: "smiit GmbH",
  url: SITE_URL,
  logo: `${SITE_URL}/logo_black.png`,
  email: "kontakt@smiit.de",
  telephone: "+49 160 4073198",
  vatID: "DE357299821",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Reiherweg 96",
    postalCode: "89584",
    addressLocality: "Ehingen",
    addressCountry: "DE",
  },
  founder: [
    {
      "@type": "Person",
      name: "Sebastian Grab",
      jobTitle: "Co-Founder & Software Engineer",
      image: `${SITE_URL}/assets/people/sebastian.webp`,
      email: "sebastian.grab@smiit.de",
      sameAs: [
        "https://www.linkedin.com/in/sebastian-grab/",
        "https://grab.smiit.de",
      ],
    },
    {
      "@type": "Person",
      name: "Noah Neßlauer",
      jobTitle: "Co-Founder & Business Analyst",
      image: `${SITE_URL}/assets/people/noah.webp`,
      email: "noah.nesslauer@smiit.de",
      sameAs: [
        "https://www.linkedin.com/in/noah-nesslauer/",
        "https://nesslauer.smiit.de",
      ],
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "kontakt@smiit.de",
      telephone: "+49 160 4073198",
      areaServed: ["DE", "AT", "CH"],
      availableLanguage: ["German", "English"],
    },
  ],
  "sameAs": [
    "https://github.com/smiit-GmbH",
    "https://www.linkedin.com/company/smiit-gmbh/"
  ]
}

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/og/home.png`,
  email: "kontakt@smiit.de",
  telephone: "+49 160 4073198",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Reiherweg 96",
    postalCode: "89584",
    addressLocality: "Ehingen",
    addressCountry: "DE",
  },
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  areaServed: ["DE", "AT", "CH", "EU"],
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params
  return (
    <html lang={lang}>
      <body className={`${geist.variable} ${geistMono.variable} ${playfair.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
        />
        <Analytics lang={lang === "en" ? "en" : "de"} />
        <SmoothScrollProvider>
          <ScrollToTop />
          <CalendlyHandler />
          <Header forceLang={lang} />
          {children}
          <Footer forceLang={lang} />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
