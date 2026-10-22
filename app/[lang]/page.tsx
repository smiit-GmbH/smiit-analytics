import type { Metadata } from "next"
import { LandingPage } from "@/components/pages/landing-page"
import { getDictionary } from "@/lib/dictionary"
import { resolveLocale, type LocaleParams } from "@/lib/locale-params"
import { buildPageMetadata } from "@/lib/seo"

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const lang = await resolveLocale(params)
  const { meta } = getDictionary(lang)
  // Absolute title: the home page is not "<title> – smiit Analytics".
  return {
    ...buildPageMetadata({ lang, route: "home", title: meta.title, description: meta.description }),
    title: { absolute: meta.title },
  }
}

export default async function HomePage({ params }: LocaleParams) {
  const lang = await resolveLocale(params)
  return <LandingPage lang={lang} dict={getDictionary(lang)} />
}
