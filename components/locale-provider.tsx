"use client"

import * as React from "react"
import type { Dictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n"

type LocaleContextValue = {
  lang: Locale
  /** Texts of the error page – error boundaries cannot receive props. */
  error: Dictionary["error"]
}

const LocaleContext = React.createContext<LocaleContextValue | null>(null)

/** Mounted in app/[lang]/layout.tsx; makes the language available to client-only UI such as error.tsx. */
export function LocaleProvider({ value, children }: { value: LocaleContextValue; children: React.ReactNode }) {
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale(): LocaleContextValue {
  const value = React.useContext(LocaleContext)
  if (!value) throw new Error("useLocale must be used inside <LocaleProvider>.")
  return value
}
