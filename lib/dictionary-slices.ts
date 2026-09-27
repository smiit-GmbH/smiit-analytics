import type { Dictionary } from "@/lib/dictionary"
import { LEGAL_ROUTES } from "@/lib/routes"

/*
 * Parts of the dictionary that are handed to client components. Only these
 * slices are serialized into the page, never the whole dictionary.
 */

type LegalRoute = (typeof LEGAL_ROUTES)[number]

export type HeaderDict = Pick<Dictionary, "nav" | "common" | "language">

export type FooterDict = Pick<Dictionary, "footer" | "nav" | "common"> & {
  /** Footer labels of the legal pages (without their long bodies). */
  legalNav: Record<LegalRoute, string>
}

export const pickHeaderDict = (dict: Dictionary): HeaderDict => ({
  nav: dict.nav,
  common: dict.common,
  language: dict.language,
})

export const pickFooterDict = (dict: Dictionary): FooterDict => ({
  footer: dict.footer,
  nav: dict.nav,
  common: dict.common,
  legalNav: Object.fromEntries(LEGAL_ROUTES.map((r) => [r, dict.legal[r].nav])) as Record<LegalRoute, string>,
})
