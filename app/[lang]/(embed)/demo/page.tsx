import { notFound } from "next/navigation"
import { DemoPage, demoPageMetadata } from "@/components/pages/demo/demo-page"
import { getDictionary } from "@/lib/dictionary"
import { resolveLocale, type LocaleParams } from "@/lib/locale-params"
import { routeLocales } from "@/lib/routes"

/** Only the languages the demo video exists in (German) — /en/demo/ etc. are not built. */
export function generateStaticParams() {
  return routeLocales("demo").map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: LocaleParams) {
  return demoPageMetadata(await resolveLocale(params))
}

export default async function DemoVideoPage({ params }: LocaleParams) {
  const lang = await resolveLocale(params)
  if (!routeLocales("demo").includes(lang)) notFound()
  return <DemoPage lang={lang} dict={getDictionary(lang)} />
}
