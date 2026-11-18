import { LegalNotice, legalPageMetadata } from "@/components/pages/legal/legal-page"
import { getDictionary } from "@/lib/dictionary"
import { resolveLocale, type LocaleParams } from "@/lib/locale-params"

export async function generateMetadata({ params }: LocaleParams) {
  return legalPageMetadata(await resolveLocale(params), "legalNotice")
}

export default async function LegalNoticePage({ params }: LocaleParams) {
  const lang = await resolveLocale(params)
  return <LegalNotice lang={lang} dict={getDictionary(lang)} />
}
