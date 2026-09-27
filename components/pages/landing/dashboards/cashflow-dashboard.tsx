"use client"

import * as React from "react"
import { CASHFLOW as D } from "@/lib/demo/cashflow"
import { cn } from "@/lib/utils"
import {
  AXIS_TEXT,
  Card,
  Columns,
  DashboardShell,
  GRID,
  KpiTile,
  LineLegend,
  LIGHT,
  PREV,
  RED,
  RED_HOVER,
  SERIES,
  SERIES_HOVER,
  TITLE,
  TipRow,
  Tooltip,
  columnPath,
  fitLabel,
  keyNav,
  monthLabels,
  niceScale,
  svgFocus,
  useToday,
  useWidth,
  useDemo,
} from "./dashboard-kit"

/*
 * Interactive demo of the smiit Analytics cash-flow report ("Cashflow"),
 * built in the page instead of a screenshot. Shared pieces live in ./dashboard-kit.
 *
 * Polarity is encoded the same way everywhere: money in / increase = slate,
 * money out / decrease = red; the net line is dark navy, totals light slate. One y-axis per chart – inflows above zero, outflows
 * below – instead of the product's second scale.
 */

const NET = PREV // dark navy line, as in the product
const TOTAL = LIGHT
const ZERO = "#9aa3b5"

/** Column hanging down from the baseline, 4px rounded data end at the bottom. */
function columnDownPath(x: number, yEnd: number, w: number, base: number) {
  const r = Math.min(4, w / 2, yEnd - base)
  return `M${x},${base} V${yEnd - r} Q${x},${yEnd} ${x + r},${yEnd} H${x + w - r} Q${x + w},${yEnd} ${x + w},${yEnd - r} V${base} Z`
}

/** Horizontal bar growing left from zero, 4px rounded data end on the left. */
function barLeftPath(x0: number, y: number, w: number, h: number) {
  const r = Math.min(4, h / 2, w)
  const x = x0 - w
  return `M${x0},${y} H${x + r} Q${x},${y} ${x},${y + r} V${y + h - r} Q${x},${y + h} ${x + r},${y + h} H${x0} Z`
}

function Swatch({ color }: { color: string }) {
  return <span aria-hidden="true" className="block size-2 rounded-[2px]" style={{ background: color }} />
}

/* ── inflows / outflows / net ────────────────────────────────────────── */

function FlowChart({ height }: { height: number }) {
  const { t, f } = useDemo()
  const T = t.cashflow
  const months = monthLabels(useToday(), f)
  const [ref, w] = useWidth<HTMLDivElement>()
  const [active, setActive] = React.useState<number | null>(null)
  const H = height
  const n = months.length
  const m = { l: 52, r: 14, t: 6, b: 20 }
  const iw = Math.max(0, w - m.l - m.r)
  const ih = H - m.t - m.b
  const band = iw / n
  const bw = Math.min(16, band * 0.4)
  const { top, ticks } = niceScale(Math.max(...D.inflows, ...D.outflows), 3)
  const allTicks = [...ticks.slice(1).map((t) => -t).reverse(), ...ticks]
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
    <div ref={ref} className="relative" style={{ height: H }}>
      {w > 0 && (
        <svg
          width={w}
          height={H}
          role="img"
          aria-label={`${T.flows.title}. ${t.keyboardHint}.`}
          className={cn(svgFocus, "touch-pan-y")}
          onPointerMove={onMove}
          onPointerLeave={() => setActive(null)}
          {...keyNav(n, active, setActive)}
        >
          {allTicks.map((t) => (
            <g key={t}>
              <line x1={m.l} x2={w - m.r} y1={y(t)} y2={y(t)} stroke={t === 0 ? ZERO : GRID} />
              <text x={m.l - 8} y={y(t)} dy="0.32em" textAnchor="end" fontSize={10} fill={AXIS_TEXT}>
                {f.compact(t)}
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
          {active !== null && <rect x={m.l + band * active} y={m.t} width={band} height={ih} fill="#f3f4f7" />}
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
        </svg>
      )}
      {active !== null && w > 0 && (
        <Tooltip x={cx(active) + band / 2} y={m.t + ih / 2} width={w}>
          <p className="mb-1 font-medium text-ink">{months[active]}</p>
          <TipRow color={SERIES} value={f.chf(D.inflows[active])} label={T.flows.inflows} />
          <TipRow color={RED} value={f.chf(D.outflows[active])} label={T.flows.outflows} />
          <TipRow color={NET} value={f.signed(D.net[active], f.chf)} label={T.flows.net} />
        </Tooltip>
      )}
    </div>
  )
}

/* ── waterfall ───────────────────────────────────────────────────────── */

function Waterfall({ height }: { height: number }) {
  const { t, f } = useDemo()
  const T = t.cashflow
  const months = monthLabels(useToday(), f)
  const [ref, w] = useWidth<HTMLDivElement>()
  const [active, setActive] = React.useState<number | null>(null)
  const H = height
  // Running total per month, then a final "Gesamt" bar from zero.
  const steps = D.net.reduce<{ from: number; to: number }[]>((acc, v) => {
    const from = acc.at(-1)?.to ?? 0
    return [...acc, { from, to: from + v }]
  }, [])
  const total = steps.at(-1)!.to
  const bars = [
    ...steps.map((s, i) => ({ label: months[i], ...s, kind: s.to >= s.from ? ("up" as const) : ("down" as const) })),
    { label: T.waterfall.total, from: 0, to: total, kind: "total" as const },
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
  const color = (k: "up" | "down" | "total", hover: boolean) =>
    k === "up" ? (hover ? SERIES_HOVER : SERIES) : k === "down" ? (hover ? RED_HOVER : RED) : hover ? "#6878a3" : TOTAL

  return (
    <div ref={ref} className="relative" style={{ height: H }}>
      {w > 0 && (
        <svg
          width={w}
          height={H}
          role="img"
          aria-label={`${T.waterfall.title}. ${t.keyboardHint}.`}
          className={svgFocus}
          onPointerLeave={() => setActive(null)}
          {...keyNav(n, active, setActive)}
        >
          {ticks.map((t) => (
            <g key={t}>
              <line x1={m.l} x2={w - m.r} y1={y(t)} y2={y(t)} stroke={GRID} />
              <text x={m.l - 8} y={y(t)} dy="0.32em" textAnchor="end" fontSize={10} fill={AXIS_TEXT}>
                {f.compact(t)}
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
                {i < n - 2 && <line x1={cx(i) + bw / 2} x2={cx(i + 1) - bw / 2} y1={y(b.to)} y2={y(b.to)} stroke="#c3c9d4" />}
                <rect x={cx(i) - bw / 2} y={y0} width={bw} height={hgt} rx={2} fill={color(b.kind, active === i)} />
                {(last || i % every === 0) && (
                  <text x={cx(i)} y={H - 4} textAnchor="middle" fontSize={10} fontWeight={last ? 600 : 400} fill={last || active === i ? TITLE : AXIS_TEXT}>
                    {last ? b.label : b.label.split(" ")[0]}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      )}
      {active !== null && w > 0 && (
        <Tooltip x={cx(active)} y={y(Math.max(bars[active].from, bars[active].to))} width={w}>
          <p className="mb-1 font-medium text-ink">{bars[active].label}</p>
          {bars[active].kind === "total" ? (
            <TipRow color={TOTAL} value={f.signed(total, f.chf)} label={T.flows.net} />
          ) : (
            <>
              <TipRow
                color={bars[active].kind === "up" ? SERIES : RED}
                value={f.signed(bars[active].to - bars[active].from, f.chf)}
                label={bars[active].kind === "up" ? T.waterfall.up : T.waterfall.down}
              />
              <p className="mt-1 text-ink-muted">
                <span className="font-semibold text-ink">{f.signed(bars[active].to, f.chf)}</span> {T.waterfall.cumulative}
              </p>
            </>
          )}
        </Tooltip>
      )}
    </div>
  )
}

/* ── net change per bank account (diverging bars) ────────────────────── */

function BankBars({ height }: { height: number }) {
  const { t, f } = useDemo()
  const T = t.cashflow
  const [ref, w] = useWidth<HTMLDivElement>()
  const [active, setActive] = React.useState<number | null>(null)
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

  return (
    <div ref={ref} className="relative" style={{ height: H }}>
      {w > 0 && (
        <svg
          width={w}
          height={H}
          role="img"
          aria-label={`${T.banks.title}. ${t.keyboardHint}.`}
          className={svgFocus}
          onPointerLeave={() => setActive(null)}
          {...keyNav(n, active, setActive)}
        >
          {ticks.map((t) => (
            <g key={t}>
              <line x1={x(t)} x2={x(t)} y1={m.t} y2={m.t + ih} stroke={t === 0 ? ZERO : GRID} />
              <text x={x(t)} y={H - 4} textAnchor="middle" fontSize={10} fill={AXIS_TEXT}>
                {f.compact(t)}
              </text>
            </g>
          ))}
          {items.map((it, i) => {
            const cy = m.t + row * i + row / 2
            const len = Math.abs(x(it.value) - zero)
            const hover = active === i
            return (
              <g key={it.name} onPointerEnter={() => setActive(i)}>
                <rect x={0} y={m.t + row * i} width={w} height={row} fill="transparent" />
                <text x={m.l - 10} y={cy} dy="0.32em" textAnchor="end" fontSize={10} fill={hover ? TITLE : AXIS_TEXT}>
                  {fitLabel(it.name, m.l - 14)}
                </text>
                {it.value >= 0 ? (
                  <path
                    d={`M${zero},${cy - bh / 2} H${zero + len - Math.min(4, len)} Q${zero + len},${cy - bh / 2} ${zero + len},${cy - bh / 2 + Math.min(4, bh / 2)} V${cy + bh / 2 - Math.min(4, bh / 2)} Q${zero + len},${cy + bh / 2} ${zero + len - Math.min(4, len)},${cy + bh / 2} H${zero} Z`}
                    fill={hover ? SERIES_HOVER : SERIES}
                  />
                ) : (
                  <path d={barLeftPath(zero, cy - bh / 2, len, bh)} fill={hover ? RED_HOVER : RED} />
                )}
              </g>
            )
          })}
        </svg>
      )}
      {active !== null && w > 0 && (
        <Tooltip x={x(items[active].value)} y={m.t + row * active + row / 2} width={w}>
          <p className="mb-1 font-medium text-ink">{items[active].name}</p>
          <TipRow color={items[active].value >= 0 ? SERIES : RED} value={f.signed(items[active].value, f.chf)} label={T.flows.net} />
        </Tooltip>
      )}
    </div>
  )
}

/* ── dashboard ───────────────────────────────────────────────────────── */

export function CashflowDashboard() {
  const { t, f } = useDemo()
  const T = t.cashflow
  const net = D.inflowTotal - D.outflowTotal
  const overdueTotal = D.overdue.reduce((s, c) => s + c.value, 0)
  const kpis = [
    { label: T.kpis.inflows, value: f.chfCompact(D.inflowTotal) },
    { label: T.kpis.outflows, value: f.chfCompact(D.outflowTotal) },
    { label: T.kpis.net, value: f.signed(net, f.chfCompact) },
    { label: T.kpis.days, value: `${f.num(D.daysToPayment, 1)} ${T.kpis.daysUnit}` },
  ]

  return (
    <DashboardShell title={T.title}>
      <div className="mb-3 grid grid-cols-2 gap-3 sm:mb-4 sm:gap-4 lg:grid-cols-4">
        {kpis.map((k) => (
          <KpiTile key={k.label} {...k} />
        ))}
      </div>

      <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
        <Card
          title={T.flows.title}
          className="lg:col-span-2"
          legend={
            <>
              <span className="inline-flex items-center gap-1.5">
                <Swatch color={SERIES} />
                {T.flows.inflows}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Swatch color={RED} />
                {T.flows.outflows}
              </span>
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
              <span className="inline-flex items-center gap-1.5">
                <Swatch color={SERIES} />
                {T.waterfall.up}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Swatch color={RED} />
                {T.waterfall.down}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Swatch color={TOTAL} />
                {T.waterfall.total}
              </span>
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
            label={`${T.overdue.title}. ${t.keyboardHint}.`}
            height={160}
            angled
            tooltip={(it) => (
              <>
                <p className="mb-1 font-medium text-ink">{it.name}</p>
                <TipRow color={SERIES} value={f.chf(it.value)} label={`${f.pct((it.value / overdueTotal) * 100)} ${T.overdue.share}`} />
              </>
            )}
          />
        </Card>
      </div>
    </DashboardShell>
  )
}
