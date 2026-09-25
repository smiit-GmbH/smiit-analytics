/**
 * Fiktive Beispieldaten für das interaktive Verkaufs-Dashboard im Abschnitt
 * «Verbinden & sofort sehen». Monatswerte = die letzten 12 abgeschlossenen
 * Monate (ältester zuerst); die Monatsnamen berechnet der Browser relativ zu heute. Keine echten Kunden oder Zahlen.
 * Anteile der Kunden und Produkte beziehen sich auf den Gesamtumsatz.
 */

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
    { name: "Wartungsverträge", value: 142300 },
    { name: "Installation", value: 128900 },
    { name: "Beratung", value: 97400 },
    { name: "Material & Ersatzteile", value: 88600 },
    { name: "Schulungen", value: 41200 },
    { name: "Support-Pakete", value: 33700 },
  ],
  /** Kennzahlen der letzten 12 Monate. Ø Rechnungswert = Umsatz / Rechnungen. */
  kpis: {
    revenue: sum(REVENUE),
    invoices: 942,
    newCustomers: 88400,
  },
  /** Offene Posten per Stichtag. */
  receivables: [
    { name: "Nicht fällig", value: 38400 },
    { name: "1–30 Tage", value: 21700 },
    { name: "31–60 Tage", value: 9800 },
    { name: "61–90 Tage", value: 4300 },
    { name: "über 90 Tage", value: 2600 },
  ],
}

/** UI-Texte des Dashboards. */
export const SALES_TEXT = {
  title: "Verkauf",
  asOf: "25.09.2026 15:06",
  demoNote: "Beispieldaten",
  kpis: {
    revenue: "Umsatz",
    invoices: "Rechnungen",
    avgInvoice: "Ø Rechnungswert",
    newCustomers: "Umsatz mit Neukunden",
  },
  revenueChart: {
    title: "Umsatz je Monat mit Vorjahr",
    current: "Umsatz",
    previous: "Umsatz, Vorjahr",
    vsPrev: "vs. Vorjahr",
  },
  concentration: {
    title: "Umsatzkonzentration je Kunde",
    legend: "Umsatz",
    /** {n} Kunden, {share} Prozent */
    summary: "Top {n} = {share} % des Umsatzes",
    share: "des Umsatzes",
    cumulative: "kumuliert",
  },
  receivables: { title: "Debitoren nach Fälligkeit", share: "der offenen Posten" },
  products: { title: "Top-Produkte nach Umsatz", share: "des Umsatzes" },
  keyboardHint: "Mit Pfeiltasten durch die Werte navigieren",
}
