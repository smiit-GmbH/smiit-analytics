import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { Analytics } from "@/components/analytics"
import { JsonLd } from "@/components/json-ld"
import { SITE, SITE_URL } from "@/config/site"
import { getContent } from "@/content"
import { organizationJsonLd, pageMetadata } from "@/lib/seo"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap", preload: false })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" })

const c = getContent()

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE.name,
  ...pageMetadata({ title: c.meta.title, description: c.meta.description, path: "/" }),
  title: { default: c.meta.title, template: `%s – ${SITE.name}` },
}

export const viewport: Viewport = {
  themeColor: SITE.themeColor,
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE.locale} className={`${geist.variable} ${geistMono.variable} ${playfair.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-navy focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
        >
          {c.common.skipLink}
        </a>
        <Header nav={c.nav} common={c.common} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <Analytics />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  )
}
