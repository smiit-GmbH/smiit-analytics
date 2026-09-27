import type { Dictionary } from "@/lib/dictionary"

export type FormatConfig = Dictionary["format"]

/**
 * Number and date formatting for one locale (config: `format` in the dictionary).
 *
 * Deliberately not Intl: Node and browsers ship different ICU data (e.g. ’ vs '
 * for de-CH), which breaks hydration of the statically exported pages.
 */
export function createFormatter(cfg: FormatConfig) {
  /** 12’345.6 – trailing zeros of the fraction are dropped. */
  const num = (n: number, decimals = 0) => {
    const [int, frac] = Math.abs(n).toFixed(decimals).split(".")
    const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, cfg.group)
    const trimmed = frac && Number(frac) !== 0 ? `${cfg.decimal}${frac.replace(/0+$/, "")}` : ""
    return `${n < 0 ? "–" : ""}${grouped}${trimmed}`
  }
  const pct = (n: number, decimals = 1) => cfg.percent.replace("{n}", num(n, decimals))
  /** Axis ticks and compact amounts: "12.5 Tsd." / "12.5k". */
  const compact = (n: number) => cfg.thousands.replace("{n}", n === 0 ? "0" : num(n / 1000, 1))
  const chf = (n: number) => `CHF ${num(n)}`
  /** "CHF 675.5 Tsd.", from one million on "CHF 1.02 Mio.". */
  const chfCompact = (n: number) =>
    `CHF ${Math.abs(n) >= 1_000_000 ? cfg.millions.replace("{n}", num(Math.round(n / 10_000) / 100, 2)) : compact(n)}`
  /** Always two decimals: "CHF 1’234.50". */
  const chf2 = (n: number) => `CHF ${num(Math.trunc(n))}${cfg.decimal}${Math.abs(n).toFixed(2).split(".")[1]}`
  const pad = (n: number) => String(n).padStart(2, "0")
  /** "25.09.2026" (Swiss format in every language). */
  const date = (d: Date) => `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`
  const dateTime = (d: Date) => `${date(d)} ${pad(d.getHours())}:${pad(d.getMinutes())}`
  /** Explicit sign: "+CHF 1’200" / "–CHF 800". */
  const signed = (n: number, format: (abs: number) => string) => `${n >= 0 ? "+" : "–"}${format(Math.abs(n))}`
  /** Short month name, 0-based. */
  const month = (index: number) => cfg.months[index]

  return { num, pct, compact, chf, chfCompact, chf2, signed, date, dateTime, month }
}

export type Formatter = ReturnType<typeof createFormatter>
