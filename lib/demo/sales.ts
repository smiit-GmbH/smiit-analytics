/**
 * Fiktive Beispieldaten für das interaktive Verkaufs-Dashboard im Abschnitt
 * «Verbinden & sofort sehen». Monatswerte = die letzten 12 abgeschlossenen
 * Monate (ältester zuerst); die Monatsnamen berechnet der Browser relativ zu heute. Keine echten Kunden oder Zahlen.
 * Anteile der Kunden und Produkte beziehen sich auf den Gesamtumsatz.
 */

import type { Dictionary } from "@/lib/dictionary"

type Texts = Dictionary["demo"]["sales"]
export type ProductKey = keyof Texts["products"]["names"]
export type BucketKey = keyof Texts["receivables"]["buckets"]

const sum = (a: number[]) => a.reduce((s, v) => s + v, 0)

const REVENUE = [48200, 52600, 61400, 44800, 50300, 58900, 63700, 59200, 66800, 57400, 49900, 62300]
const REVENUE_PREV = [43100, 47800, 55200, 41900, 45600, 52300, 57100, 54800, 58900, 53600, 46200, 55700]

export const SALES = {
  current: REVENUE,
  previous: REVENUE_PREV,
  total: sum(REVENUE),
  customers: [
    { name: "Müller Holzbau GmbH", value: 118400 },
    { name: "Alpenblick Treuhand AG", value: 96200 },
    { name: "Seeland Elektro AG", value: 71500 },
    { name: "Rhein Logistik AG", value: 52800 },
    { name: "Weber & Partner", value: 38900 },
    { name: "Bergmann Consulting", value: 24600 },
  ],
  products: [
    { key: "maintenance", value: 142300 },
    { key: "installation", value: 128900 },
    { key: "consulting", value: 97400 },
    { key: "materials", value: 88600 },
    { key: "training", value: 41200 },
    { key: "support", value: 33700 },
  ] as { key: ProductKey; value: number }[],
  /** Kennzahlen der letzten 12 Monate. Ø Rechnungswert = Umsatz / Rechnungen. */
  kpis: {
    revenue: sum(REVENUE),
    invoices: 942,
    newCustomers: 88400,
  },
  /** Offene Posten per Stichtag. */
  receivables: [
    { key: "notDue", value: 38400 },
    { key: "d1to30", value: 21700 },
    { key: "d31to60", value: 9800 },
    { key: "d61to90", value: 4300 },
    { key: "over90", value: 2600 },
  ] as { key: BucketKey; value: number }[],
}

