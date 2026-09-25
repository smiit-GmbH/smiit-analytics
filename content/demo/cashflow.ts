/**
 * Fiktive Beispieldaten für das interaktive Cashflow-Dashboard im Abschnitt
 * «Verbinden & sofort sehen». Monatswerte = die letzten 12 abgeschlossenen
 * Monate (ältester zuerst); die Monatsnamen berechnet der Browser relativ zu heute. Keine echten Zahlen.
 *
 * In sich stimmig: Zuflüsse – Abflüsse je Monat ergeben die Netto-Veränderung
 * (CHF 41’800), und die Bankkonten ergeben zusammen dieselbe Summe.
 * Kunden und Konten passen zu den Dashboards Verkauf und Bilanz.
 */

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
    { name: "Geschäftskonto CHF", value: 32450 },
    { name: "Sparkonto", value: 10000 },
    { name: "Postkonto", value: -1290 },
    { name: "Konto EUR", value: 640 },
  ],
  overdue: [
    { name: "Alpenblick Treuhand AG", value: 9850 },
    { name: "Müller Holzbau GmbH", value: 7200 },
    { name: "Rhein Logistik AG", value: 6100 },
    { name: "Weber & Partner", value: 4950 },
    { name: "Seeland Elektro AG", value: 3400 },
    { name: "Bergmann Consulting", value: 2600 },
  ],
}

/** UI-Texte des Dashboards. */
export const CASHFLOW_TEXT = {
  title: "Cashflow",
  asOf: "25.09.2026 15:06",
  demoNote: "Beispieldaten",
  kpis: {
    inflows: "Zahlungseingänge",
    outflows: "Zahlungsausgänge",
    net: "Netto-Cashveränderung",
    days: "Ø Tage bis Zahlungseingang",
    daysUnit: "Tage",
  },
  flows: { title: "Zu- und Abflüsse je Monat", inflows: "Zuflüsse", outflows: "Abflüsse", net: "Netto-Veränderung" },
  waterfall: { title: "Cashverlauf je Monat", up: "Zunahme", down: "Abnahme", total: "Gesamt", cumulative: "kumuliert" },
  banks: { title: "Netto-Veränderung je Bankkonto" },
  overdue: { title: "Überfällige Forderungen je Kunde", share: "der überfälligen Forderungen" },
  keyboardHint: "Mit Pfeiltasten durch die Werte navigieren",
}
