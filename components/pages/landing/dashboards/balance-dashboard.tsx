"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { BALANCE as D, BANK_ACCOUNTS, type AccountGroup } from "@/lib/demo/balance"
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
  shiftISO,
  useToday,
  useDemo,
} from "./dashboard-kit"

/*
 * Interactive demo of the smiit Analytics balance sheet report ("Bilanz"),
 * built in the page instead of a screenshot. Shared pieces live in ./dashboard-kit.
 */

const sumGroup = (g: AccountGroup) => g.accounts.reduce((s, a) => s + a.value, 0)
const sumAll = (groups: AccountGroup[]) => groups.reduce((s, g) => s + sumGroup(g), 0)

/** Account groups with expandable rows, as in the product's balance table. */
function BalanceTree({ groups, column, defaultOpen }: { groups: AccountGroup[]; column: string; defaultOpen: string[] }) {
  const { t, f } = useDemo()
  const T = t.balance
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
          const isOpen = open.has(g.key)
          return (
            <React.Fragment key={g.key}>
              <tr className="border-b border-line/70 hover:bg-[#f8f9fb]">
                <th scope="row" className="py-1 text-left font-medium" style={{ color: TITLE }}>
                  <button
                    type="button"
                    onClick={() => toggle(g.key)}
                    aria-expanded={isOpen}
                    data-track={`demo_balance_toggle_${g.key}`}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded text-left outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  >
                    <ChevronDown
                      className={cn("size-3.5 shrink-0 transition-transform duration-200", !isOpen && "-rotate-90")}
                      aria-hidden="true"
                    />
                    {T.groups[g.key]}
                    <span className="sr-only">
                      {" "}
                      – {isOpen ? T.collapse : T.expand}
                    </span>
                  </button>
                </th>
                <td className="whitespace-nowrap py-1 pl-3 text-right font-medium tabular-nums" style={{ color: TITLE }}>
                  {f.chf2(sumGroup(g))}
                </td>
              </tr>
              {isOpen &&
                g.accounts.map((a) => (
                  <tr key={a.key} className="border-b border-line/70 hover:bg-[#f8f9fb]">
                    <td className="py-1 pl-5 text-ink">{T.accounts[a.key]}</td>
                    <td className="whitespace-nowrap py-1 pl-3 text-right tabular-nums text-ink">{f.chf2(a.value)}</td>
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
            {f.chf2(sumAll(groups))}
          </td>
        </tr>
      </tfoot>
    </table>
  )
}

function BankTable() {
  const { t, f } = useDemo()
  const T = t.balance
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
          <tr key={b.key} className="border-b border-line/70 last:border-0 hover:bg-[#f8f9fb]">
            <td className="py-1 tabular-nums text-ink">{f.date(shiftISO(b.lastMovement, today))}</td>
            <td className="py-1 text-ink">{t.banks[b.key]}</td>
            <td className="whitespace-nowrap py-1 text-right tabular-nums text-ink">{f.chf2(b.value)}</td>
            <td className="py-1 text-right tabular-nums text-ink">{b.movements}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function BalanceDashboard() {
  const { t, f } = useDemo()
  const T = t.balance
  const total = sumAll(D.assets)
  const equity = sumGroup(D.liabilities.find((g) => g.key === D.equityGroup)!)
  const banksTotal = BANK_ACCOUNTS.reduce((s, b) => s + b.value, 0)
  const kpis = [
    { label: T.kpis.total, value: f.chfCompact(total) },
    { label: T.kpis.equityRatio, value: f.pct((equity / total) * 100) },
    { label: T.kpis.liquid, value: f.chfCompact(D.liquid) },
    { label: T.kpis.debtRatio, value: f.pct((1 - equity / total) * 100) },
  ]

  return (
    <DashboardShell title={T.title}>
      <div className="mb-3 grid grid-cols-2 gap-3 sm:mb-4 sm:gap-4 lg:grid-cols-4">
        {kpis.map((k) => (
          <KpiTile key={k.label} {...k} />
        ))}
      </div>

      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        <Card title={T.assets.title}>
          <BalanceTree groups={D.assets} column={T.assets.column} defaultOpen={[D.assets[0].key]} />
        </Card>
        <Card title={T.liabilities.title} className="hidden md:block">
          <BalanceTree groups={D.liabilities} column={T.liabilities.column} defaultOpen={[D.liabilities[0].key]} />
        </Card>
      </div>

      <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-4 md:grid-cols-2">
        <Card title={T.banks.chartTitle} className="hidden md:block">
          <HBars
            items={BANK_ACCOUNTS.map((b) => ({ name: t.banks[b.key], value: b.value }))}
            height={141}
            labelWidth={120}
            label={`${T.banks.chartTitle}. ${t.keyboardHint}.`}
            tooltip={(it) => (
              <>
                <p className="mb-1 font-medium text-ink">{it.name}</p>
                <TipRow color={SERIES} value={f.chf(it.value)} label={`${f.pct((it.value / banksTotal) * 100)} ${T.banks.share}`} />
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
