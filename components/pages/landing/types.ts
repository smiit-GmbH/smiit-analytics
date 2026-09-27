import type { Dictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n"

/** Props of every landing page section (server components). */
export type SectionProps = {
  lang: Locale
  dict: Dictionary
}
