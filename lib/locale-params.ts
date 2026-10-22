import { notFound } from "next/navigation"
import { isLocale, type Locale } from "@/lib/i18n"

/** Props of every page and layout below app/[lang]/. */
export type LocaleParams = { params: Promise<{ lang: string }> }

/**
 * The validated locale of a [lang] route. `dynamicParams = false` already
 * limits the static export to known locales; this keeps the type honest
 * instead of casting, and answers 404 should an unknown one ever get through.
 */
export async function resolveLocale(params: LocaleParams["params"]): Promise<Locale> {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  return lang
}
