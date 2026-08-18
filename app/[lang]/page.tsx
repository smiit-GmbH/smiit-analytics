import type { Metadata } from "next"
import { getDictionary, Locale } from "@/lib/dictionary"
import LandingPage from "@/components/pages/LandingPage"
import { buildPageMetadata, buildProductJsonLd } from "@/lib/seo"
import { JsonLd } from "@/components/seo/json-ld"

export async function generateStaticParams() {
  return [{ lang: "de" }, { lang: "en" }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const { lang } = await params
  return buildPageMetadata({
    lang,
    title: {
      de: "smiit Analytics – bexio Auswertungen & Dashboard mit KI",
      en: "smiit Analytics – bexio reports & dashboards with AI",
    },
    description: {
      de: "bexio Auswertungen als fertiges Dashboard: 250+ Analysen, vollständiges Datenmodell und volle Eigentümerschaft — einmaliger Preis, 30 Tage kostenlos testen.",
      en: "bexio reports as a ready-made dashboard: 250+ analyses, complete data model and full ownership — one-time price, free 30-day trial included for SMEs.",
    },
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = getDictionary(lang)

  const productJsonLd = buildProductJsonLd({
    lang,
    name: "smiit Analytics",
    description: {
      de: "Plug-and-Play Analytics-Lösung mit vorgefertigten Dashboards, KPIs und KI-Integration für den Mittelstand.",
      en: "Plug-and-play analytics solution with pre-built dashboards, KPIs and AI integration for SMEs.",
    },
  })

  return (
    <>
      <JsonLd data={productJsonLd} />
      <LandingPage lang={lang} dict={dict} />
    </>
  )
}
