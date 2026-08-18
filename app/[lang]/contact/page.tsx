import type { Metadata } from "next"
import { getDictionary, Locale } from "@/lib/dictionary"
import ContactPage from "@/components/pages/ContactPage"
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo"
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
    path: "contact",
    title: {
      de: "smiit Analytics – Kontakt & Termin vereinbaren",
      en: "smiit Analytics – Contact & schedule a call",
    },
    description: {
      de: "Sprechen Sie mit smiit GmbH über Ihr digitales Vorhaben — per E-Mail, Telefon oder direkt einen kostenlosen 30-Minuten-Termin online vereinbaren.",
      en: "Talk to smiit GmbH about your digital initiative — by email, phone, or schedule a free 30-minute online consultation directly with the team.",
    },
    ogImage: { url: "/og/contact.png", width: 1200, height: 630, alt: "smiit Analytics – Kontakt" },
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = getDictionary(lang)

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(lang, [
    { name: lang === "de" ? "Kontakt" : "Contact", path: "contact" },
  ])

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <ContactPage lang={lang} dict={dict} />
    </>
  )
}
