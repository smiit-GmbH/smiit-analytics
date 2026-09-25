/**
 * Fiktive Beispieldaten für das interaktive Bilanz-Dashboard im Abschnitt
 * «Verbinden & sofort sehen». Keine echten Zahlen.
 *
 * In sich stimmig: Aktiven = Passiven (CHF 798’850.40), und die flüssigen
 * Mittel entsprechen Kasse + Summe der Bankkonten. Datumsangaben sind relativ
 * zum Referenzdatum (content/demo/common.ts) erfasst und wandern im Browser mit.
 */

export type AccountGroup = { name: string; accounts: { name: string; value: number }[] }

const CASH = 2180.15

export const BANK_ACCOUNTS = [
  { name: "Geschäftskonto CHF", value: 74520.4, lastMovement: "2026-09-24", movements: 212 },
  { name: "Sparkonto", value: 30000, lastMovement: "2026-08-31", movements: 4 },
  { name: "Postkonto", value: 18209.6, lastMovement: "2026-09-23", movements: 67 },
  { name: "Konto EUR", value: 3520, lastMovement: "2026-09-12", movements: 9 },
]

const liquid = CASH + BANK_ACCOUNTS.reduce((s, b) => s + b.value, 0)

export const BALANCE = {
  assets: [
    {
      name: "Umlaufvermögen",
      accounts: [
        { name: "Flüssige Mittel", value: liquid },
        { name: "Forderungen aus Lieferungen und Leistungen", value: 214860.5 },
        { name: "Vorräte", value: 98740 },
        { name: "Aktive Rechnungsabgrenzungen", value: 44219.75 },
      ],
    },
    {
      name: "Anlagevermögen",
      accounts: [
        { name: "Mobile Sachanlagen", value: 184300 },
        { name: "Immobile Sachanlagen", value: 118000 },
        { name: "Finanzanlagen", value: 10300 },
      ],
    },
  ] satisfies AccountGroup[],
  liabilities: [
    {
      name: "Kurzfristiges Fremdkapital",
      accounts: [
        { name: "Verbindlichkeiten aus Lieferungen und Leistungen", value: 87350.2 },
        { name: "Kurzfristige verzinsliche Verbindlichkeiten", value: 40000 },
        { name: "Übrige kurzfristige Verbindlichkeiten", value: 69070.2 },
      ],
    },
    {
      name: "Langfristiges Fremdkapital",
      accounts: [
        { name: "Bankdarlehen", value: 150000 },
        { name: "Rückstellungen", value: 30000 },
      ],
    },
    {
      name: "Eigenkapital",
      accounts: [
        { name: "Stammkapital", value: 100000 },
        { name: "Gesetzliche Gewinnreserve", value: 20000 },
        { name: "Gewinnvortrag", value: 214180 },
        { name: "Jahresgewinn", value: 88250 },
      ],
    },
  ] satisfies AccountGroup[],
  equityGroup: "Eigenkapital",
  liquid,
}

/** UI-Texte des Dashboards. */
export const BALANCE_TEXT = {
  title: "Bilanz",
  asOf: "25.09.2026 15:06",
  demoNote: "Beispieldaten",
  kpis: {
    total: "Bilanzsumme",
    equityRatio: "Eigenkapitalquote",
    liquid: "Liquide Mittel",
    debtRatio: "Fremdkapitalquote",
  },
  assets: { title: "Bilanz – Aktiven", column: "Aktiven" },
  liabilities: { title: "Bilanz – Passiven", column: "Passiven" },
  group: "Kontengruppe",
  total: "Gesamt",
  expand: "aufklappen",
  collapse: "zuklappen",
  banks: {
    chartTitle: "Bankguthaben je Konto",
    tableTitle: "Bankkonten",
    date: "Letzte Bewegung",
    account: "Bankkonto",
    balance: "Kontostand",
    movements: "Bewegungen",
    share: "der Bankguthaben",
  },
  keyboardHint: "Mit Pfeiltasten durch die Werte navigieren",
}
