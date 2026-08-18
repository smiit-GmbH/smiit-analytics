import type { Metadata } from "next"

const title = "smiit Analytics – Datenanalyse-Plattform mit KI"
const description =
  "smiit Analytics führt Ihre Unternehmensdaten in einem Datenmodell zusammen und liefert Dashboards, Auswertungen und KI-gestützte Analysen."

const ogImage = {
  url: "/og/home.png",
  width: 1200,
  height: 630,
  alt: "smiit Analytics",
}

export const metadata: Metadata = {
  metadataBase: new URL("https://www.smiit-analytics.com"),
  title,
  description,
  alternates: {
    canonical: "/de/",
    languages: {
      de: "/de/",
      en: "/en/",
      "x-default": "/de/",
    },
  },
  robots: { index: false, follow: true },
  openGraph: {
    title,
    description,
    url: "/de/",
    siteName: "smiit Analytics",
    locale: "de_DE",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
}

export default function RootRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/de/" />
      <script
        dangerouslySetInnerHTML={{
          __html: "window.location.replace('/de/');",
        }}
      />
    </>
  )
}