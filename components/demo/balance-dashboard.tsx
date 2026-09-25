"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { BALANCE as D, BALANCE_TEXT as T, BANK_ACCOUNTS, type AccountGroup } from "@/content/demo/bilanz"
import { cn } from "@/lib/utils"
import {
  AXIS_TEXT,
  Card,
  DashboardShell,
  HBars,
  KpiTile,
  SERIES,
  TITLE,
  TipRow,
  chf,
  chf2,
  compact,
  formatDate,
  pct,
  shiftISO,
  useToday,
} from "./dashboard-kit"

/*
 * Interactive demo of the smiit Analytics balance sheet report ("Bilanz"),
 * built in the page instead of a screenshot. Shared pieces live in ./dashboard-kit.
 */

const sumGroup = (g: AccountGroup) => g.accounts.reduce((s, a) => s + a.value, 0)
const sumAll = (groups: AccountGroup[]) => groups.reduce((s, g) => s + sumGroup(g), 0)

/** Account groups with expandable rows, as in the product's balance table. */
function BalanceTree({ groups, column, defaultOpen }: { groups: AccountGroup[]; column: string; defaultOpen: string[] }) {
  const [open, setOpen] = React.useState<Set<string>>(() => new Set(defaultOpen))
  const toggle = (name: string) =>
    setOpen((s) => {
      const next = new Set(s)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })

  return (
    <table className="w-full text-[0.72rem]">
      <thead>
        <tr className="border-b border-line">
          <th scope="col" className="pb-1.5 text-left font-medium" style={{ color: AXIS_TEXT }}>
            {T.group}
          </th>
          <th scope="col" className="pb-1.5 text-right font-medium" style={{ color: AXIS_TEXT }}>
            {column}
          </th>
        </tr>
      </thead>
      <tbody>
        {groups.map((g) => {
          const isOpen = open.has(g.name)
          return (
            <React.Fragment key={g.name}>
              <tr className="border-b border-line/70 hover:bg-[#f8f9fb]">
                <th scope="row" className="py-1 text-left font-medium" style={{ color: TITLE }}>
                  <button
                    type="button"
                    onClick={() => toggle(g.name)}
                    aria-expanded={isOpen}
                    data-track={`demo_balance_toggle_${g.name}`}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded text-left outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  >
                    <ChevronDown
                      className={cn("size-3.5 shrink-0 transition-transform duration-200", !isOpen && "-rotate-90")}
                      aria-hidden="true"
                    />
                    {g.name}
                    <span className="sr-only">
                      {" "}
                      – {isOpen ? T.collapse : T.expand}
                    </span>
                  </button>
                </th>
                <td className="whitespace-nowrap py-1 pl-3 text-right font-medium tabular-nums" style={{ color: TITLE }}>
                  {chf2(sumGroup(g))}
                </td>
              </tr>
              {isOpen &&
                g.accounts.map((a) => (
                  <tr key={a.name} className="border-b border-line/70 hover:bg-[#f8f9fb]">
                    <td className="py-1 pl-5 text-ink">{a.name}</td>
                    <td className="whitespace-nowrap py-1 pl-3 text-right tabular-nums text-ink">{chf2(a.value)}</td>
                  </tr>
                ))}
            </React.Fragment>
          )
        })}
      </tbody>
      <tfoot>
        <tr className="border-t-2 border-line">
          <th scope="row" className="pt-1.5 text-left font-semibold" style={{ color: TITLE }}>
            {T.total}
          </th>
          <td className="whitespace-nowrap pt-1.5 pl-3 text-right font-semibold tabular-nums" style={{ color: TITLE }}>
            {chf2(sumAll(groups))}
          </td>
        </tr>
      </tfoot>
    </table>
  )
}

function BankTable() {
  const today = useToday()
  return (
    <table className="w-full text-[0.72rem]">
      <thead>
        <tr className="border-b border-line">
          {[T.banks.date, T.banks.account, T.banks.balance, T.banks.movements].map((h, i) => (
            <th key={h} scope="col" className={cn("pb-1.5 font-medium", i >= 2 ? "text-right" : "text-left")} style={{ color: AXIS_TEXT }}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {BANK_ACCOUNTS.map((b) => (
          <tr key={b.name} className="border-b border-line/70 last:border-0 hover:bg-[#f8f9fb]">
            <td className="py-1 tabular-nums text-ink">{formatDate(shiftISO(b.lastMovement, today))}</td>
            <td className="py-1 text-ink">{b.name}</td>
            <td className="whitespace-nowrap py-1 text-right tabular-nums text-ink">{chf2(b.value)}</td>
            <td className="py-1 text-right tabular-nums text-ink">{b.movements}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function BalanceDashboard() {
  const total = sumAll(D.assets)
  const equity = sumGroup(D.liabilities.find((g) => g.name === D.equityGroup)!)
  const banksTotal = BANK_ACCOUNTS.reduce((s, b) => s + b.value, 0)
  const kpis = [
    { label: T.kpis.total, value: `CHF ${compact(total)}` },
    { label: T.kpis.equityRatio, value: pct((equity / total) * 100) },
    { label: T.kpis.liquid, value: `CHF ${compact(D.liquid)}` },
    { label: T.kpis.debtRatio, value: pct((1 - equity / total) * 100) },
  ]

  return (
    <DashboardShell title={T.title} asOf={T.asOf} note={T.demoNote}>
      <div className="mb-3 grid grid-cols-2 gap-3 sm:mb-4 sm:gap-4 lg:grid-cols-4">
        {kpis.map((k) => (
          <KpiTile key={k.label} {...k} />
        ))}
      </div>

      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        <Card title={T.assets.title}>
          <BalanceTree groups={D.assets} column={T.assets.column} defaultOpen={[D.assets[0].name]} />
        </Card>
        <Card title={T.liabilities.title} className="hidden md:block">
          <BalanceTree groups={D.liabilities} column={T.liabilities.column} defaultOpen={[D.liabilities[0].name]} />
        </Card>
      </div>

      <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-4 md:grid-cols-2">
        <Card title={T.banks.chartTitle} className="hidden md:block">
          <HBars
            items={BANK_ACCOUNTS}
            height={141}
            labelWidth={120}
            label={`${T.banks.chartTitle}. ${T.keyboardHint}.`}
            tooltip={(it) => (
              <>
                <p className="mb-1 font-medium text-ink">{it.name}</p>
                <TipRow color={SERIES} value={chf(it.value)} label={`${pct((it.value / banksTotal) * 100)} ${T.banks.share}`} />
              </>
            )}
          />
        </Card>
        <Card title={T.banks.tableTitle} className="hidden md:block">
          <BankTable />
        </Card>
      </div>
    </DashboardShell>
  )
}
