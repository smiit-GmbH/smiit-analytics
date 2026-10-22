"use client"

import * as React from "react"
import { CASHFLOW as D } from "@/lib/demo/cashflow"
import { sumBy } from "@/lib/demo/math"
import {
  AXIS_TEXT,
  CONNECTOR,
  Card,
  ChartFrame,
  Columns,
  DashboardShell,
  GRID,
  HOVER_BG,
  KpiRow,
  LIGHT,
  LIGHT_HOVER,
  LineLegend,
  PREV,
  RED,
  RED_HOVER,
  SERIES,
  SERIES_HOVER,
  SwatchLegend,
  TITLE,
  TipRow,
  TipTitle,
  ZERO_LINE,
  barLeftPath,
  barPath,
  columnDownPath,
  columnPath,
  fitLabel,
  monthLabels,
  niceScale,
  useChart,
  useDemo,
  useToday,
} from "./dashboard-kit"

/*
 * Interactive demo of the smiit Analytics cash-flow report ("Cashflow"),
 * built in the page instead of a screenshot. Shared pieces live in ./dashboard-kit.
 *
 * Polarity is encoded the same way everywhere: money in / increase = slate,
 * money out / decrease = red; the net line is dark navy, totals light slate.
 * One y-axis per chart – inflows above zero, outflows below – instead of the
 * product's second scale.
 */

const NET = PREV // dark navy line, as in the product
const TOTAL = LIGHT

/* ── inflows / outflows / net ────────────────────────────────────────── */

function FlowChart({ height }: { height: number }) {
  const { t, f } = useDemo()
  const T = t.cashflow
  const months = monthLabels(useToday(), f)
  const chart = useChart()
  const { width: w, active, setActive } = chart
  const H = height
  const n = months.length
  const m = { l: 52, r: 14, t: 6, b: 20 }
  const iw = Math.max(0, w - m.l - m.r)
  const ih = H - m.t - m.b
  const band = iw / n
  const bw = Math.min(16, band * 0.4)
  const { top, ticks } = niceScale(Math.max(...D.inflows, ...D.outflows), 3)
  // Mirrored axis: the same steps below zero for the outflows.
  const allTicks = [
    ...ticks
      .slice(1)
      .map((v) => -v)
      .reverse(),
    ...ticks,
  ]
  const y = (v: number) => m.t + ih / 2 - (v / top) * (ih / 2)
  const base = y(0)
  const cx = (i: number) => m.l + band * i + band / 2
  const every = band < 44 ? 2 : 1
  const netLine = D.net.map((v, i) => `${i ? "L" : "M"}${cx(i)},${y(v)}`).join(" ")

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const px = e.clientX - e.currentTarget.getBoundingClientRect().left
    setActive(Math.min(n - 1, Math.max(0, Math.floor((px - m.l) / band))))
  }

  return (
    <ChartFrame
      chart={chart}
      title={T.flows.title}
      count={n}
      height={H}
      onPointerMove={onMove}
      svgClassName="touch-pan-y"
      tooltip={(i) => ({
        x: cx(i) + band / 2,
        y: m.t + ih / 2,
        content: (
          <>
            <TipTitle>{months[i]}</TipTitle>
            <TipRow color={SERIES} value={f.chf(D.inflows[i])} label={T.flows.inflows} />
            <TipRow color={RED} value={f.chf(D.outflows[i])} label={T.flows.outflows} />
            <TipRow color={NET} value={f.signed(D.net[i], f.chf)} label={T.flows.net} />
          </>
        ),
      })}
    >
      {allTicks.map((v) => (
        <g key={v}>
          <line x1={m.l} x2={w - m.r} y1={y(v)} y2={y(v)} stroke={v === 0 ? ZERO_LINE : GRID} />
          <text x={m.l - 8} y={y(v)} dy="0.32em" textAnchor="end" fontSize={10} fill={AXIS_TEXT}>
            {f.compact(v)}
          </text>
        </g>
      ))}
      {months.map((mo, i) =>
        i % every === 0 ? (
          <text key={mo} x={cx(i)} y={H - 4} textAnchor="middle" fontSize={10} fill={AXIS_TEXT}>
            {mo}
          </text>
        ) : null,
      )}
      {active !== null && <rect x={m.l + band * active} y={m.t} width={band} height={ih} fill={HOVER_BG} />}
      {months.map((mo, i) => (
        <g key={mo}>
          <path d={columnPath(cx(i) - bw / 2, y(D.inflows[i]), bw, base)} fill={active === i ? SERIES_HOVER : SERIES} />
          <path d={columnDownPath(cx(i) - bw / 2, y(-D.outflows[i]), bw, base)} fill={active === i ? RED_HOVER : RED} />
        </g>
      ))}
      <path d={netLine} fill="none" stroke={NET} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {D.net.map((v, i) => (
        <circle key={i} cx={cx(i)} cy={y(v)} r={active === i ? 4.5 : 3} fill={NET} stroke="#fff" strokeWidth={active === i ? 2 : 1.5} />
      ))}
    </ChartFrame>
  )
}

/* ── waterfall ───────────────────────────────────────────────────────── */

type StepKind = "up" | "down" | "total"

const STEP_COLOR: Record<StepKind, { base: string; hover: string }> = {
  up: { base: SERIES, hover: SERIES_HOVER },
  down: { base: RED, hover: RED_HOVER },
  total: { base: TOTAL, hover: LIGHT_HOVER },
}

function Waterfall({ height }: { height: number }) {
  const { t, f } = useDemo()
  const T = t.cashflow
  const months = monthLabels(useToday(), f)
  const chart = useChart()
  const { width: w, active, setActive } = chart
  const H = height
  // Running total per month, then a final "Gesamt" bar from zero.
  const steps = D.net.reduce<{ from: number; to: number }[]>((acc, v) => {
    const from = acc.at(-1)?.to ?? 0
    return [...acc, { from, to: from + v }]
  }, [])
  const total = steps.at(-1)?.to ?? 0
  const bars: { label: string; from: number; to: number; kind: StepKind }[] = [
    ...steps.map((s, i) => ({ label: months[i], ...s, kind: s.to >= s.from ? ("up" as const) : ("down" as const) })),
    { label: T.waterfall.total, from: 0, to: total, kind: "total" },
  ]
  const n = bars.length
  const m = { l: 52, r: 18, t: 6, b: 20 }
  const iw = Math.max(0, w - m.l - m.r)
  const ih = H - m.t - m.b
  const band = iw / n
  const bw = Math.min(18, band * 0.62)
  const { top, ticks } = niceScale(Math.max(...bars.map((b) => Math.max(b.from, b.to))), 4)
  const y = (v: number) => m.t + ih - (v / top) * ih
  const cx = (i: number) => m.l + band * i + band / 2
  const every = band < 26 ? 3 : band < 40 ? 2 : 1

  const tip = (b: (typeof bars)[number]) =>
    b.kind === "total" ? (
      <TipRow color={TOTAL} value={f.signed(total, f.chf)} label={T.flows.net} />
    ) : (
      <>
        <TipRow
          color={STEP_COLOR[b.kind].base}
          value={f.signed(b.to - b.from, f.chf)}
          label={b.kind === "up" ? T.waterfall.up : T.waterfall.down}
        />
        <p className="mt-1 text-ink-muted">
          <span className="font-semibold text-ink">{f.signed(b.to, f.chf)}</span> {T.waterfall.cumulative}
        </p>
      </>
    )

  return (
    <ChartFrame
      chart={chart}
      title={T.waterfall.title}
      count={n}
      height={H}
      tooltip={(i) => ({
        x: cx(i),
        y: y(Math.max(bars[i].from, bars[i].to)),
        content: (
          <>
            <TipTitle>{bars[i].label}</TipTitle>
            {tip(bars[i])}
          </>
        ),
      })}
    >
      {ticks.map((v) => (
        <g key={v}>
          <line x1={m.l} x2={w - m.r} y1={y(v)} y2={y(v)} stroke={GRID} />
          <text x={m.l - 8} y={y(v)} dy="0.32em" textAnchor="end" fontSize={10} fill={AXIS_TEXT}>
            {f.compact(v)}
          </text>
        </g>
      ))}
      {bars.map((b, i) => {
        const y0 = y(Math.max(b.from, b.to))
        const hgt = Math.max(1, Math.abs(y(b.from) - y(b.to)))
        const last = i === n - 1
        return (
          <g key={b.label} onPointerEnter={() => setActive(i)}>
            <rect x={m.l + band * i} y={m.t} width={band} height={ih + m.b} fill="transparent" />
            {/* connector to the next bar at the running total */}
            {i < n - 2 && <line x1={cx(i) + bw / 2} x2={cx(i + 1) - bw / 2} y1={y(b.to)} y2={y(b.to)} stroke={CONNECTOR} />}
            <rect
              x={cx(i) - bw / 2}
              y={y0}
              width={bw}
              height={hgt}
              rx={2}
              fill={active === i ? STEP_COLOR[b.kind].hover : STEP_COLOR[b.kind].base}
            />
            {(last || i % every === 0) && (
              <text
                x={cx(i)}
                y={H - 4}
                textAnchor="middle"
                fontSize={10}
                fontWeight={last ? 600 : 400}
                fill={last || active === i ? TITLE : AXIS_TEXT}
              >
                {last ? b.label : b.label.split(" ")[0]}
              </text>
            )}
          </g>
        )
      })}
    </ChartFrame>
  )
}

/* ── net change per bank account (diverging bars) ────────────────────── */

function BankBars({ height }: { height: number }) {
  const { t, f } = useDemo()
  const T = t.cashflow
  const chart = useChart()
  const { width: w, active, setActive } = chart
  const items = D.banks.map((b) => ({ ...b, name: t.banks[b.key] }))
  const H = height
  const n = items.length
  const m = { l: 124, r: 18, t: 2, b: 20 }
  const iw = Math.max(0, w - m.l - m.r)
  const ih = H - m.t - m.b
  const row = ih / n
  const bh = Math.min(14, row * 0.55)
  // Domain from the most negative to the most positive value, on one clean step.
  const { top: hi, ticks: posTicks } = niceScale(Math.max(...items.map((i) => i.value)), 3)
  const step = posTicks[1] - posTicks[0]
  const lo = -Math.ceil(Math.abs(Math.min(0, ...items.map((i) => i.value))) / step) * step
  const ticks: number[] = []
  for (let v = lo; v <= hi + step / 2; v += step) ticks.push(v)
  const x = (v: number) => m.l + ((v - lo) / (hi - lo)) * iw
  const zero = x(0)
  const cy = (i: number) => m.t + row * i + row / 2

  return (
    <ChartFrame
      chart={chart}
      title={T.banks.title}
      count={n}
      height={H}
      tooltip={(i) => ({
        x: x(items[i].value),
        y: cy(i),
        content: (
          <>
            <TipTitle>{items[i].name}</TipTitle>
            <TipRow color={items[i].value >= 0 ? SERIES : RED} value={f.signed(items[i].value, f.chf)} label={T.flows.net} />
          </>
        ),
      })}
    >
      {ticks.map((v) => (
        <g key={v}>
          <line x1={x(v)} x2={x(v)} y1={m.t} y2={m.t + ih} stroke={v === 0 ? ZERO_LINE : GRID} />
          <text x={x(v)} y={H - 4} textAnchor="middle" fontSize={10} fill={AXIS_TEXT}>
            {f.compact(v)}
          </text>
        </g>
      ))}
      {items.map((it, i) => {
        const len = Math.abs(x(it.value) - zero)
        const hover = active === i
        return (
          <g key={it.name} onPointerEnter={() => setActive(i)}>
            <rect x={0} y={m.t + row * i} width={w} height={row} fill="transparent" />
            <text x={m.l - 10} y={cy(i)} dy="0.32em" textAnchor="end" fontSize={10} fill={hover ? TITLE : AXIS_TEXT}>
              {fitLabel(it.name, m.l - 14)}
            </text>
            {it.value >= 0 ? (
              <path d={barPath(zero, cy(i) - bh / 2, len, bh)} fill={hover ? SERIES_HOVER : SERIES} />
            ) : (
              <path d={barLeftPath(zero, cy(i) - bh / 2, len, bh)} fill={hover ? RED_HOVER : RED} />
            )}
          </g>
        )
      })}
    </ChartFrame>
  )
}

/* ── dashboard ───────────────────────────────────────────────────────── */

export function CashflowDashboard() {
  const { t, f } = useDemo()
  const T = t.cashflow
  const net = D.inflowTotal - D.outflowTotal
  const overdueTotal = sumBy(D.overdue, (c) => c.value)

  return (
    <DashboardShell title={T.title}>
      <KpiRow
        items={[
          { label: T.kpis.inflows, value: f.chfCompact(D.inflowTotal) },
          { label: T.kpis.outflows, value: f.chfCompact(D.outflowTotal) },
          { label: T.kpis.net, value: f.signed(net, f.chfCompact) },
          { label: T.kpis.days, value: `${f.num(D.daysToPayment, 1)} ${T.kpis.daysUnit}` },
        ]}
      />

      <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
        <Card
          title={T.flows.title}
          className="lg:col-span-2"
          legend={
            <>
              <SwatchLegend color={SERIES}>{T.flows.inflows}</SwatchLegend>
              <SwatchLegend color={RED}>{T.flows.outflows}</SwatchLegend>
              <LineLegend color={NET}>{T.flows.net}</LineLegend>
            </>
          }
        >
          <FlowChart height={170} />
        </Card>

        <Card
          title={T.waterfall.title}
          className="hidden md:block"
          legend={
            <>
              <SwatchLegend color={SERIES}>{T.waterfall.up}</SwatchLegend>
              <SwatchLegend color={RED}>{T.waterfall.down}</SwatchLegend>
              <SwatchLegend color={TOTAL}>{T.waterfall.total}</SwatchLegend>
            </>
          }
        >
          <Waterfall height={170} />
        </Card>
      </div>

      <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-4 md:grid-cols-2">
        <Card title={T.banks.title} className="hidden md:block">
          <BankBars height={160} />
        </Card>
        <Card title={T.overdue.title}>
          <Columns
            items={D.overdue}
            title={T.overdue.title}
            height={160}
            angled
            tooltip={(it) => (
              <>
                <TipTitle>{it.name}</TipTitle>
                <TipRow color={SERIES} value={f.chf(it.value)} label={`${f.pct((it.value / overdueTotal) * 100)} ${T.overdue.share}`} />
              </>
            )}
          />
        </Card>
      </div>
    </DashboardShell>
  )
}
