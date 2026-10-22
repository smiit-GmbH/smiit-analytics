/**
 * All texts of the website, in every language – one file per language.
 *
 * - `de` is the source language. Its shape defines the `Dictionary` type, so
 *   every other language must provide exactly the same keys (checked by tsc).
 * - Swiss conventions: «Sie» / formal address, "ss" instead of "ß", prices in CHF.
 * - Unknown facts are kept as [PLACEHOLDERS] – never replace them with guesses.
 * - `*word*` in headlines renders as a brand-coloured highlight (lib/rich.tsx).
 * - `{name}` marks a value that is filled in by the code.
 *
 *
 * Self-contained on purpose (relative imports with .ts, nothing else):
 * scripts/build-media.mjs reads these files with plain Node to render the
 * localized illustrations.
 */
import { de, type Dictionary } from "./de.ts"
import { en } from "./en.ts"
import { fr } from "./fr.ts"
import { it } from "./it.ts"

export type { Dictionary }

export const locales = ["de", "en", "fr", "it"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "de"

const dictionaries: Record<Locale, Dictionary> = { de, en, fr, it }

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale]
