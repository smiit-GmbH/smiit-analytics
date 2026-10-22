"use client"

import { SALES as D } from "@/lib/demo/sales"
import { sumBy } from "@/lib/demo/math"
import { fill } from "@/lib/text"
import { cn } from "@/lib/utils"
import {
  Card,
  Columns,
  DashboardShell,
  HBars,
  KpiRow,
  LineChart,
  LineLegend,
  LIGHT,
  PREV,
  SERIES,
  SwatchLegend,
  TipRow,
  TipTitle,
  monthLabels,
  useToday,
  useDemo,
} from "./dashboard-kit"

/*
 * Interactive demo of the smiit Analytics sales report ("Verkauf"), built in
 * the page instead of a screenshot. Shared pieces live in ./dashboard-kit.
 */

/** Customers shown in the concentration summary ("Top 3: 62 % of revenue"). */
const TOP_N = 3

/* ── revenue line chart ──────────────────────────────────────────────── */

function RevenueChart() {
  const { t, f } = useDemo()
  const T = t.sales
  const months = monthLabels(useToday(), f)
  return (
    <LineChart
      labels={months}
      series={[
        { name: T.revenueChart.current, values: D.current, color: LIGHT, dots: true },
        { name: T.revenueChart.previous, values: D.previous, color: PREV, dashed: true },
      ]}
      title={T.revenueChart.title}
      format={f.chf}
      footer={(i) => {
        const up = D.current[i] >= D.previous[i]
        return (
          <p className={cn("mt-1 font-medium", up ? "text-success" : "text-danger")}>
            {up ? "+" : "–"}
            {f.pct(Math.abs((D.current[i] / D.previous[i] - 1) * 100))} {T.revenueChart.vsPrev}
          </p>
        )
      }}
    />
  )
}

/* ── dashboard ───────────────────────────────────────────────────────── */

export function SalesDashboard() {
  const { t, f } = useDemo()
  const T = t.sales
  const receivables = D.receivables.map((b) => ({ name: T.receivables.buckets[b.key], value: b.value }))
  const products = D.products.map((p) => ({ name: T.products.names[p.key], value: p.value }))
  const openTotal = sumBy(D.receivables, (b) => b.value)
  // Top customers sorted desc; share and cumulative share relative to total revenue.
  const customers = [...D.customers].sort((a, b) => b.value - a.value)
  const cumulative = customers.reduce<number[]>((acc, c) => [...acc, (acc.at(-1) ?? 0) + (c.value / D.total) * 100], [])
  const share = (value: number, total: number, label: string) => `${f.pct((value / total) * 100)} ${label}`
  const K = D.kpis

  return (
    <DashboardShell title={T.title}>
      <KpiRow
        items={[
          { label: T.kpis.revenue, value: f.chfCompact(K.revenue) },
          { label: T.kpis.invoices, value: f.num(K.invoices) },
          { label: T.kpis.avgInvoice, value: f.chf2(K.revenue / K.invoices) },
          { label: T.kpis.newCustomers, value: f.chfCompact(K.newCustomers) },
        ]}
      />

      <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
        <Card
          title={T.revenueChart.title}
          className="lg:col-span-2"
          legend={
            <>
              <LineLegend color={LIGHT}>{T.revenueChart.current}</LineLegend>
              <LineLegend color={PREV} dashed>
                {T.revenueChart.previous}
              </LineLegend>
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
              <SwatchLegend color={SERIES}>{T.concentration.legend}</SwatchLegend>
              <span className="ml-auto">{fill(T.concentration.summary, { n: TOP_N, share: f.pct(cumulative[TOP_N - 1], 0) })}</span>
            </>
          }
        >
          <Columns
            items={customers}
            title={T.concentration.title}
            height={170}
            angled
            tooltip={(it, i) => (
              <>
                <TipTitle>{it.name}</TipTitle>
                <TipRow color={SERIES} value={f.chf(it.value)} label={share(it.value, D.total, T.concentration.share)} />
                <p className="mt-1 text-ink-muted">
                  <span className="font-semibold text-ink">{f.pct(cumulative[i])}</span> {T.concentration.cumulative}
                </p>
              </>
            )}
          />
        </Card>
      </div>

      <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-4 md:grid-cols-2">
        <Card title={T.receivables.title}>
          <Columns
            items={receivables}
            title={T.receivables.title}
            height={160}
            tooltip={(it) => (
              <>
                <TipTitle>{it.name}</TipTitle>
                <TipRow color={SERIES} value={f.chf(it.value)} label={share(it.value, openTotal, T.receivables.share)} />
              </>
            )}
          />
        </Card>

        <Card title={T.products.title} className="hidden md:block">
          <HBars
            items={products}
            height={160}
            title={T.products.title}
            tooltip={(it) => (
              <>
                <TipTitle>{it.name}</TipTitle>
                <TipRow color={SERIES} value={f.chf(it.value)} label={share(it.value, D.total, T.products.share)} />
              </>
            )}
          />
        </Card>
      </div>
    </DashboardShell>
  )
}
