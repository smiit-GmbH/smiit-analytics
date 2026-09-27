/**
 * Fiktive Beispieldaten für das interaktive Cashflow-Dashboard im Abschnitt
 * «Verbinden & sofort sehen». Monatswerte = die letzten 12 abgeschlossenen
 * Monate (ältester zuerst); die Monatsnamen berechnet der Browser relativ zu heute. Keine echten Zahlen.
 *
 * In sich stimmig: Zuflüsse – Abflüsse je Monat ergeben die Netto-Veränderung
 * (CHF 41’800), und die Bankkonten ergeben zusammen dieselbe Summe.
 * Kunden und Konten passen zu den Dashboards Verkauf und Bilanz.
 */

import type { BankKey } from "./balance"

const sum = (a: number[]) => a.reduce((s, v) => s + v, 0)

const INFLOWS = [51200, 47900, 55300, 58800, 42600, 49100, 57400, 61800, 58300, 63900, 55800, 50700]
const OUTFLOWS = [44800, 46300, 49900, 61200, 45800, 43700, 50100, 54900, 52600, 57200, 60400, 44100]

export const CASHFLOW = {
  inflows: INFLOWS,
  outflows: OUTFLOWS,
  net: INFLOWS.map((v, i) => v - OUTFLOWS[i]),
  inflowTotal: sum(INFLOWS),
  outflowTotal: sum(OUTFLOWS),
  /** Ø Tage von Rechnungsdatum bis Zahlungseingang. */
  daysToPayment: 27.4,
  banks: [
    { key: "business", value: 32450 },
    { key: "savings", value: 10000 },
    { key: "postal", value: -1290 },
    { key: "eur", value: 640 },
  ] as { key: BankKey; value: number }[],
  overdue: [
    { name: "Alpenblick Treuhand AG", value: 9850 },
    { name: "Müller Holzbau GmbH", value: 7200 },
    { name: "Rhein Logistik AG", value: 6100 },
    { name: "Weber & Partner", value: 4950 },
    { name: "Seeland Elektro AG", value: 3400 },
    { name: "Bergmann Consulting", value: 2600 },
  ],
}

