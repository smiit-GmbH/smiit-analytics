import { LegalPage, legalPageMetadata } from "@/components/pages/legal/legal-page"
import { getDictionary } from "@/lib/dictionary"
import { resolveLocale, type LocaleParams } from "@/lib/locale-params"

export async function generateMetadata({ params }: LocaleParams) {
  return legalPageMetadata(await resolveLocale(params), "privacy")
}

export default async function PrivacyPage({ params }: LocaleParams) {
  const lang = await resolveLocale(params)
  return <LegalPage lang={lang} dict={getDictionary(lang)} route="privacy" />
}
