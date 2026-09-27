import type { Metadata } from "next"
import { LandingPage } from "@/components/pages/landing-page"
import { getDictionary } from "@/lib/dictionary"
import { isLocale, type Locale } from "@/lib/i18n"
import { buildPageMetadata } from "@/lib/seo"

type PageProps = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const { meta } = getDictionary(lang)
  // Absolute title: the home page is not "<title> – smiit Analytics".
  return { ...buildPageMetadata({ lang, route: "home", title: meta.title, description: meta.description }), title: { absolute: meta.title } }
}

export default async function HomePage({ params }: PageProps) {
  const lang = (await params).lang as Locale
  return <LandingPage lang={lang} dict={getDictionary(lang)} />
}
