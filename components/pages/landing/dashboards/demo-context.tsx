"use client"

import * as React from "react"
import type { Dictionary } from "@/lib/dictionary"
import { createFormatter, type FormatConfig, type Formatter } from "@/lib/format"

/*
 * Texts and number format of the demo dashboards. Kept apart from the
 * dashboard kit on purpose: the page imports only this small module, the
 * charts are loaded later (see lazy-dashboard.tsx).
 */

/** Background of a dashboard (also used by the placeholder shown while it loads). */
export const DEMO_CANVAS = "#f8f9fb"

type DemoContextValue = {
  /** Dashboard texts (`demo` in the dictionary). */
  t: Dictionary["demo"]
  /** Number/date formatter of the current language. */
  f: Formatter
}

const DemoContext = React.createContext<DemoContextValue | null>(null)

/** Provides texts and number format to every dashboard below it. */
export function DemoProvider({ t, format, children }: { t: Dictionary["demo"]; format: FormatConfig; children: React.ReactNode }) {
  const value = React.useMemo(() => ({ t, f: createFormatter(format) }), [t, format])
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

export function useDemo(): DemoContextValue {
  const value = React.useContext(DemoContext)
  if (!value) throw new Error("Demo dashboards must be rendered inside <DemoProvider>.")
  return value
}
