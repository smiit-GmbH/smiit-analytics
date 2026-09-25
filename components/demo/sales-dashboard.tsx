"use client"

import * as React from "react"
import { SALES as D, SALES_TEXT as T } from "@/content/demo/verkauf"
import { cn } from "@/lib/utils"
import {
  AXIS_TEXT,
  Card,
  Columns,
  DashboardShell,
  GRID,
  HBars,
  KpiTile,
  LineChart,
  LIGHT,
  LineKey,
  PREV,
  SERIES,
  SERIES_HOVER,
  TITLE,
  TipRow,
  Tooltip,
  chf,
  chf2,
  columnPath,
  compact,
  keyNav,
  monthLabels,
  num,
  niceScale,
  pct,
  svgFocus,
  useToday,
  useWidth,
} from "./dashboard-kit"

/*
 * Interactive demo of the smiit Analytics sales report ("Verkauf"), built in
 * the page instead of a screenshot. Shared pieces live in ./dashboard-kit.
 */

/* ── revenue line chart ──────────────────────────────────────────────── */

function RevenueChart() {
  const months = monthLabels(useToday())
  return (
    <LineChart
      labels={months}
      series={[
        { name: T.revenueChart.current, values: D.current, color: LIGHT, dots: true },
        { name: T.revenueChart.previous, values: D.previous, color: PREV, dashed: true },
      ]}
      label={`${T.revenueChart.title}. ${T.keyboardHint}.`}
      format={chf}
      footer={(i) => {
        const up = D.current[i] >= D.previous[i]
        return (
          <p className={cn("mt-1 font-medium", up ? "text-success" : "text-danger")}>
            {up ? "+" : "–"}
            {pct(Math.abs((D.current[i] / D.previous[i] - 1) * 100))} {T.revenueChart.vsPrev}
          </p>
        )
      }}
    />
  )
}

/* ── dashboard ───────────────────────────────────────────────────────── */

export function SalesDashboard() {
  const openTotal = D.receivables.reduce((s, b) => s + b.value, 0)
  // Top customers sorted desc; share and cumulative share relative to total revenue.
  const customers = [...D.customers].sort((a, b) => b.value - a.value)
  const cumulative = customers.reduce<number[]>((acc, c) => [...acc, (acc.at(-1) ?? 0) + (c.value / D.total) * 100], [])
  const topN = 3
  const K = D.kpis
  const kpis = [
    { label: T.kpis.revenue, value: `CHF ${compact(K.revenue)}` },
    { label: T.kpis.invoices, value: num(K.invoices) },
    { label: T.kpis.avgInvoice, value: chf2(K.revenue / K.invoices) },
    { label: T.kpis.newCustomers, value: `CHF ${compact(K.newCustomers)}` },
  ]

  return (
    <DashboardShell title={T.title} asOf={T.asOf} note={T.demoNote}>
      <div className="mb-3 grid grid-cols-2 gap-3 sm:mb-4 sm:gap-4 lg:grid-cols-4">
        {kpis.map((k) => (
          <KpiTile key={k.label} {...k} />
        ))}
      </div>

      <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
        <Card
          title={T.revenueChart.title}
          className="lg:col-span-2"
          legend={
            <>
              <span className="inline-flex items-center gap-1.5">
                <LineKey color={LIGHT} />
                {T.revenueChart.current}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <LineKey color={PREV} dashed />
                {T.revenueChart.previous}
              </span>
            </>
          }
        >
          <RevenueChart />
        </Card>

        <Card
          title={T.concentration.title}
          className="hidden md:block"
          legend={
            <>
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden="true" className="block size-2 rounded-[2px]" style={{ background: SERIES }} />
                {T.concentration.legend}
              </span>
              <span className="ml-auto">{T.concentration.summary.replace("{n}", String(topN)).replace("{share}", num(cumulative[topN - 1]))}</span>
            </>
          }
        >
          <Columns
            items={customers}
            label={`${T.concentration.title}. ${T.keyboardHint}.`}
            height={170}
            angled
            tooltip={(it, i) => (
              <>
                <p className="mb-1 font-medium text-ink">{it.name}</p>
                <TipRow color={SERIES} value={chf(it.value)} label={`${pct((it.value / D.total) * 100)} ${T.concentration.share}`} />
                <p className="mt-1 text-ink-muted">
                  <span className="font-semibold text-ink">{pct(cumulative[i])}</span> {T.concentration.cumulative}
                </p>
              </>
            )}
          />
        </Card>
      </div>

      <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-4 md:grid-cols-2">
        <Card title={T.receivables.title}>
          <Columns
            items={D.receivables}
            label={`${T.receivables.title}. ${T.keyboardHint}.`}
            height={160}
            tooltip={(it) => (
              <>
                <p className="mb-1 font-medium text-ink">{it.name}</p>
                <TipRow color={SERIES} value={chf(it.value)} label={`${pct((it.value / openTotal) * 100)} ${T.receivables.share}`} />
              </>
            )}
          />
        </Card>

        <Card title={T.products.title} className="hidden md:block">
          <HBars
            items={D.products}
            height={160}
            label={`${T.products.title}. ${T.keyboardHint}.`}
            tooltip={(it) => (
              <>
                <p className="mb-1 font-medium text-ink">{it.name}</p>
                <TipRow color={SERIES} value={chf(it.value)} label={`${pct((it.value / D.total) * 100)} ${T.products.share}`} />
              </>
            )}
          />
        </Card>
      </div>
    </DashboardShell>
  )
}
