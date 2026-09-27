import { LegalPage, legalPageMetadata } from "@/components/pages/legal/legal-page"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n"

type PageProps = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: PageProps) {
  return legalPageMetadata((await params).lang as Locale, "legalNotice")
}

export default async function LegalNoticePage({ params }: PageProps) {
  const lang = (await params).lang as Locale
  return <LegalPage lang={lang} dict={getDictionary(lang)} route="legalNotice" />
}
