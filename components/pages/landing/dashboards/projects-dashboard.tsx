"use client"

import * as React from "react"
import { sumBy } from "@/lib/demo/math"
import { PROJECTS, TIMELINE, type Project } from "@/lib/demo/projects"
import { cn } from "@/lib/utils"
import {
  AXIS_TEXT,
  Card,
  ChartFrame,
  DashboardShell,
  GRID,
  HOVER_BG,
  KpiRow,
  LegendItem,
  RED,
  REFERENCE,
  SERIES,
  SERIES_HOVER,
  TITLE,
  TipTitle,
  ZERO_LINE,
  addDays,
  barPath,
  fitLabel,
  niceScale,
  shiftISO,
  useChart,
  useDemo,
  useToday,
} from "./dashboard-kit"

/*
 * Interactive demo of the smiit Analytics project report ("Projekte"), built
 * in the page instead of a screenshot. Shared pieces live in ./dashboard-kit.
 *
 * Project status is never colour-only: done = muted solid bar, active = track
 * + progress fill, planned = dashed outline; plus legend and tooltip text.
 * Over-budget uses the reserved danger status colour with an icon and label.
 */

const DONE = "#9aa8c9" // muted step of the series hue
const DONE_HOVER = "#8797bd"
const TRACK = "#d9dfee" // light step of the series hue (remaining work)
const PLANNED_HOVER = "#eef1f8"

/** Projects with their name in the current language. */
function useProjects() {
  const { t } = useDemo()
  return PROJECTS.map((p) => ({ ...p, name: t.projectNames[p.key] }))
}

const ratio = (p: Project) => (p.budget ? (p.invoiced / p.budget) * 100 : 0)

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex justify-between gap-4 py-0.5">
      <span className="text-ink-muted">{label}</span>
      <span className={cn("text-ink tabular-nums", strong && "font-semibold")}>{value}</span>
    </div>
  )
}

/** Small warning triangle drawn in SVG (status icon for "over budget"), 10 × 10. */
function WarnIcon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`} aria-hidden="true">
      <path d="M5 0.8 L9.6 9 H0.4 Z" fill={RED} />
      <rect x={4.4} y={3.2} width={1.2} height={3} fill="#fff" />
      <rect x={4.4} y={7} width={1.2} height={1.1} fill="#fff" />
    </g>
  )
}

/* ── Gantt ───────────────────────────────────────────────────────────── */

function Gantt({ height }: { height: number }) {
  const { t, f } = useDemo()
  const T = t.projects
  const chart = useChart()
  const { width: w, active, setActive } = chart
  const today = useToday()
  // Window and bars are shifted from the authored dates to today.
  const start = shiftISO(TIMELINE.start, today)
  const end = addDays(shiftISO(TIMELINE.end, today), 1)
  const span = end.getTime() - start.getTime()
  const bars = useProjects().map((p) => ({ ...p, from: shiftISO(p.start, today), to: shiftISO(p.end, today) }))

  const H = height
  const n = bars.length
  const m = { l: w < 520 ? 104 : 164, r: 12, t: 14, b: 20 }
  const iw = Math.max(0, w - m.l - m.r)
  const ih = H - m.t - m.b
  const row = ih / n
  const bh = Math.min(14, row * 0.56)
  const x = (d: Date) => m.l + ((d.getTime() - start.getTime()) / span) * iw
  const cy = (i: number) => m.t + row * i + row / 2

  // Month boundaries inside the (shifted) window; each label sits centred in its month.
  const ticks: Date[] = []
  for (
    let d = new Date(start.getFullYear(), start.getMonth() + (start.getDate() === 1 ? 0 : 1), 1);
    d < end;
    d = new Date(d.getFullYear(), d.getMonth() + 1, 1)
  )
    ticks.push(d)
  const every = iw / 12 < 30 ? 3 : 1

  return (
    <ChartFrame
      chart={chart}
      title={T.gantt.title}
      count={n}
      height={H}
      tooltip={(i) => ({
        x: (x(bars[i].from) + x(addDays(bars[i].to, 1))) / 2,
        y: cy(i),
        content: (
          <>
            <TipTitle>{bars[i].name}</TipTitle>
            <Row label={T.gantt.status[bars[i].status]} value={`${f.date(bars[i].from)} – ${f.date(bars[i].to)}`} />
            {bars[i].status === "active" && <Row label={T.gantt.progress} value={f.pct(bars[i].progress, 0)} strong />}
            <Row label={T.gantt.lead} value={bars[i].lead} />
          </>
        ),
      })}
    >
      {ticks.map((d, k) => {
        const next = k < ticks.length - 1 ? x(ticks[k + 1]) : m.l + iw
        return (
          <g key={d.getTime()}>
            <line x1={x(d)} x2={x(d)} y1={m.t} y2={m.t + ih} stroke={GRID} />
            {k % every === 0 && next - x(d) > 18 && (
              <text x={(x(d) + next) / 2} y={H - 4} textAnchor="middle" fontSize={10} fill={AXIS_TEXT}>
                {f.month(d.getMonth())}
              </text>
            )}
          </g>
        )
      })}
      <line x1={m.l} x2={m.l} y1={m.t} y2={m.t + ih} stroke={GRID} />
      <line x1={m.l + iw} x2={m.l + iw} y1={m.t} y2={m.t + ih} stroke={GRID} />

      {bars.map((p, i) => {
        const xs = x(p.from)
        const xe = x(addDays(p.to, 1))
        const bw = Math.max(2, xe - xs)
        const hover = active === i
        const top = cy(i) - bh / 2
        return (
          <g key={p.name} onPointerEnter={() => setActive(i)}>
            <rect x={0} y={m.t + row * i} width={w} height={row} fill={hover ? HOVER_BG : "transparent"} />
            <text x={m.l - 10} y={cy(i)} dy="0.32em" textAnchor="end" fontSize={10} fill={hover ? TITLE : AXIS_TEXT}>
              {fitLabel(p.name, m.l - 12)}
            </text>
            {p.status === "done" && <rect x={xs} y={top} width={bw} height={bh} rx={3} fill={hover ? DONE_HOVER : DONE} />}
            {p.status === "active" && (
              <>
                <rect x={xs} y={top} width={bw} height={bh} rx={3} fill={TRACK} />
                <rect x={xs} y={top} width={(bw * p.progress) / 100} height={bh} rx={3} fill={hover ? SERIES_HOVER : SERIES} />
              </>
            )}
            {p.status === "planned" && (
              <rect
                x={xs + 0.75}
                y={top + 0.75}
                width={bw - 1.5}
                height={bh - 1.5}
                rx={3}
                fill={hover ? PLANNED_HOVER : "#fff"}
                stroke={SERIES}
                strokeWidth={1.5}
                strokeDasharray="4 3"
              />
            )}
          </g>
        )
      })}

      {/* today marker */}
      <line x1={x(today)} x2={x(today)} y1={m.t - 2} y2={m.t + ih} stroke={TITLE} strokeWidth={1} />
      <text x={x(today)} y={m.t - 5} textAnchor="middle" fontSize={9} fontWeight={600} fill={TITLE}>
        {T.gantt.today}
      </text>
    </ChartFrame>
  )
}

function GanttLegend() {
  const { t } = useDemo()
  const T = t.projects
  return (
    <>
      <LegendItem marker={<span aria-hidden="true" className="block h-2 w-3.5 rounded-[2px]" style={{ background: DONE }} />}>
        {T.gantt.status.done}
      </LegendItem>
      <LegendItem
        marker={
          <span aria-hidden="true" className="flex h-2 w-3.5 overflow-hidden rounded-[2px]" style={{ background: TRACK }}>
            <span className="block h-full w-2" style={{ background: SERIES }} />
          </span>
        }
      >
        {T.gantt.status.active}
      </LegendItem>
      <LegendItem
        marker={<span aria-hidden="true" className="block h-2 w-3.5 rounded-[2px] border border-dashed" style={{ borderColor: SERIES }} />}
      >
        {T.gantt.status.planned}
      </LegendItem>
    </>
  )
}

/* ── budget vs. invoiced (scatter) ───────────────────────────────────── */

/** Pointer distance within which a dot counts as hovered (larger than the 10px dot). */
const HIT_RADIUS = 28

function BudgetScatter({ height }: { height: number }) {
  const { t, f } = useDemo()
  const T = t.projects
  const chart = useChart()
  const { width: w, active, setActive } = chart
  const H = height
  const projects = useProjects()
  const n = projects.length
  const m = { l: 60, r: 26, t: 8, b: 32 }
  const iw = Math.max(0, w - m.l - m.r)
  const ih = H - m.t - m.b
  // Same scale on both axes so the diagonal is exactly "invoiced = budget".
  const { top, ticks } = niceScale(Math.max(...projects.flatMap((p) => [p.budget, p.invoiced])), 4)
  const x = (v: number) => m.l + (v / top) * iw
  const y = (v: number) => m.t + ih - (v / top) * ih

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const b = e.currentTarget.getBoundingClientRect()
    const px = e.clientX - b.left
    const py = e.clientY - b.top
    let best: number | null = null
    let bestD = HIT_RADIUS
    projects.forEach((p, i) => {
      const d = Math.hypot(x(p.budget) - px, y(p.invoiced) - py)
      if (d < bestD) {
        bestD = d
        best = i
      }
    })
    setActive(best)
  }

  return (
    <ChartFrame
      chart={chart}
      title={T.scatter.title}
      count={n}
      height={H}
      onPointerMove={onMove}
      tooltip={(i) => ({
        x: x(projects[i].budget),
        y: y(projects[i].invoiced),
        content: (
          <>
            <TipTitle>{projects[i].name}</TipTitle>
            <Row label={T.utilization.budget} value={f.chf(projects[i].budget)} />
            <Row label={T.utilization.invoiced} value={f.chf(projects[i].invoiced)} />
            <Row label={T.utilization.ratio} value={f.pct(ratio(projects[i]))} strong />
          </>
        ),
      })}
    >
      {ticks.map((v) => (
        <g key={v}>
          <line x1={m.l} x2={m.l + iw} y1={y(v)} y2={y(v)} stroke={GRID} />
          <line x1={x(v)} x2={x(v)} y1={m.t} y2={m.t + ih} stroke={GRID} />
          <text x={m.l - 8} y={y(v)} dy="0.32em" textAnchor="end" fontSize={10} fill={AXIS_TEXT}>
            {f.compact(v)}
          </text>
          <text x={x(v)} y={m.t + ih + 13} textAnchor="middle" fontSize={10} fill={AXIS_TEXT}>
            {f.compact(v)}
          </text>
        </g>
      ))}
      <text x={m.l + iw / 2} y={H - 2} textAnchor="middle" fontSize={10} fill={AXIS_TEXT}>
        {T.scatter.x}
      </text>
      <text transform={`translate(10,${m.t + ih / 2}) rotate(-90)`} textAnchor="middle" fontSize={10} fill={AXIS_TEXT}>
        {T.scatter.y}
      </text>

      {/* reference: invoiced = budget */}
      <line x1={x(0)} y1={y(0)} x2={x(top)} y2={y(top)} stroke={REFERENCE} strokeWidth={1} />
      <text x={x(top) - 4} y={y(top) + 12} textAnchor="end" fontSize={9} fill={AXIS_TEXT}>
        {T.scatter.reference}
      </text>

      {projects.map((p, i) => (
        <circle
          key={p.name}
          cx={x(p.budget)}
          cy={y(p.invoiced)}
          r={active === i ? 6.5 : 5}
          fill={ratio(p) > 100 ? RED : active === i ? SERIES_HOVER : SERIES}
          stroke="#fff"
          strokeWidth={2}
        />
      ))}
    </ChartFrame>
  )
}

/* ── budget utilisation (bars with 100 % reference) ─────────────────── */

/** Right of each bar: room for the value ("123.4 %" at 10px), then the 10px warning icon and a gap. */
const VALUE_W = 40
const ICON_W = 14

function UtilizationBars({ height }: { height: number }) {
  const { t, f } = useDemo()
  const T = t.projects
  const chart = useChart()
  const { width: w, active, setActive } = chart
  const items = [...useProjects()].sort((a, b) => ratio(b) - ratio(a))
  const H = height
  const n = items.length
  // Narrow cards: keep the warning icon next to the value, the "über Budget" text moves to the tooltip.
  const narrow = w < 420
  const m = { l: narrow ? 110 : 150, r: narrow ? 64 : 96, t: 2, b: 20 }
  const iw = Math.max(0, w - m.l - m.r)
  const ih = H - m.t - m.b
  const row = ih / n
  const bh = Math.min(12, row * 0.55)
  const top = 125 // axis end in percent: room beyond 100 % for over-budget bars
  const x = (v: number) => m.l + (Math.min(v, top) / top) * iw
  const cy = (i: number) => m.t + row * i + row / 2

  return (
    <ChartFrame
      chart={chart}
      title={T.utilization.title}
      count={n}
      height={H}
      tooltip={(i) => ({
        x: x(ratio(items[i])),
        y: cy(i),
        content: (
          <>
            <TipTitle>{items[i].name}</TipTitle>
            <Row label={T.utilization.budget} value={f.chf(items[i].budget)} />
            <Row label={T.utilization.invoiced} value={f.chf(items[i].invoiced)} />
            <Row label={T.utilization.ratio} value={f.pct(ratio(items[i]))} strong />
            {ratio(items[i]) > 100 && <p className="mt-1 font-medium text-danger">{T.utilization.over}</p>}
          </>
        ),
      })}
    >
      {[0, 50, 100].map((v) => (
        <g key={v}>
          <line x1={x(v)} x2={x(v)} y1={m.t} y2={m.t + ih} stroke={v === 100 ? ZERO_LINE : GRID} />
          <text x={x(v)} y={H - 4} textAnchor="middle" fontSize={10} fill={v === 100 ? TITLE : AXIS_TEXT}>
            {f.pct(v, 0)}
          </text>
        </g>
      ))}
      {items.map((p, i) => {
        const r = ratio(p)
        const over = r > 100
        const valueX = x(r) + 6
        return (
          <g key={p.name} onPointerEnter={() => setActive(i)}>
            <rect x={0} y={m.t + row * i} width={w} height={row} fill="transparent" />
            <text x={m.l - 10} y={cy(i)} dy="0.32em" textAnchor="end" fontSize={10} fill={active === i ? TITLE : AXIS_TEXT}>
              {fitLabel(p.name, m.l - 12)}
            </text>
            {r > 0 && <path d={barPath(m.l, cy(i) - bh / 2, x(r) - m.l, bh)} fill={over ? RED : active === i ? SERIES_HOVER : SERIES} />}
            <text x={valueX} y={cy(i)} dy="0.32em" fontSize={10} fontWeight={600} fill={TITLE}>
              {f.pct(r)}
            </text>
            {over && (
              <>
                <WarnIcon x={valueX + VALUE_W} y={cy(i) - 5} />
                {!narrow && (
                  <text x={valueX + VALUE_W + ICON_W} y={cy(i)} dy="0.32em" fontSize={10} fill={RED}>
                    {T.utilization.over}
                  </text>
                )}
              </>
            )}
          </g>
        )
      })}
    </ChartFrame>
  )
}

/* ── dashboard ───────────────────────────────────────────────────────── */

export function ProjectsDashboard() {
  const { t, f } = useDemo()
  const T = t.projects
  const projects = useProjects()
  const budget = sumBy(projects, (p) => p.budget)
  const invoiced = sumBy(projects, (p) => p.invoiced)

  return (
    <DashboardShell title={T.title}>
      <KpiRow
        items={[
          { label: T.kpis.projects, value: f.num(projects.length) },
          { label: T.kpis.active, value: f.num(projects.filter((p) => p.status === "active").length) },
          { label: T.kpis.budget, value: f.chfCompact(budget) },
          { label: T.kpis.open, value: f.chfCompact(budget - invoiced) },
        ]}
      />

      <Card title={T.gantt.title} legend={<GanttLegend />}>
        <Gantt height={170} />
      </Card>

      <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-4 md:grid-cols-2">
        <Card title={T.scatter.title} className="hidden md:block">
          <BudgetScatter height={160} />
        </Card>
        <Card title={T.utilization.title}>
          <UtilizationBars height={160} />
        </Card>
      </div>
    </DashboardShell>
  )
}
