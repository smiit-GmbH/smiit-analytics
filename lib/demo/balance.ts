/**
 * Fiktive Beispieldaten für das interaktive Bilanz-Dashboard im Abschnitt
 * «Verbinden & sofort sehen». Keine echten Zahlen.
 *
 * In sich stimmig: Aktiven = Passiven (CHF 798’850.40), und die flüssigen
 * Mittel entsprechen Kasse + Summe der Bankkonten. Datumsangaben sind relativ
 * zum Referenzdatum (lib/demo/clock.ts) erfasst und wandern im Browser mit.
 */

import type { Dictionary } from "@/lib/dictionary"

type Texts = Dictionary["demo"]
export type BankKey = keyof Texts["banks"]
export type GroupKey = keyof Texts["balance"]["groups"]
export type AccountKey = keyof Texts["balance"]["accounts"]

export type AccountGroup = { key: GroupKey; accounts: { key: AccountKey; value: number }[] }

const CASH = 2180.15

export const BANK_ACCOUNTS: { key: BankKey; value: number; lastMovement: string; movements: number }[] = [
  { key: "business", value: 74520.4, lastMovement: "2026-09-24", movements: 212 },
  { key: "savings", value: 30000, lastMovement: "2026-08-31", movements: 4 },
  { key: "postal", value: 18209.6, lastMovement: "2026-09-23", movements: 67 },
  { key: "eur", value: 3520, lastMovement: "2026-09-12", movements: 9 },
]

const liquid = CASH + BANK_ACCOUNTS.reduce((s, b) => s + b.value, 0)

export const BALANCE = {
  assets: [
    {
      key: "current",
      accounts: [
        { key: "cash", value: liquid },
        { key: "receivables", value: 214860.5 },
        { key: "inventory", value: 98740 },
        { key: "prepaid", value: 44219.75 },
      ],
    },
    {
      key: "fixed",
      accounts: [
        { key: "movables", value: 184300 },
        { key: "realEstate", value: 118000 },
        { key: "financial", value: 10300 },
      ],
    },
  ] satisfies AccountGroup[],
  liabilities: [
    {
      key: "shortTerm",
      accounts: [
        { key: "payables", value: 87350.2 },
        { key: "interestBearing", value: 40000 },
        { key: "otherShortTerm", value: 69070.2 },
      ],
    },
    {
      key: "longTerm",
      accounts: [
        { key: "bankLoan", value: 150000 },
        { key: "provisions", value: 30000 },
      ],
    },
    {
      key: "equity",
      accounts: [
        { key: "shareCapital", value: 100000 },
        { key: "legalReserve", value: 20000 },
        { key: "retained", value: 214180 },
        { key: "profit", value: 88250 },
      ],
    },
  ] satisfies AccountGroup[],
  equityGroup: "equity" as GroupKey,
  liquid,
}

