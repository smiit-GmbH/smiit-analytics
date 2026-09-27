"use client"

import * as React from "react"
import { PROJECTS, TIMELINE, type Project } from "@/lib/demo/projects"
import { cn } from "@/lib/utils"
import {
  AXIS_TEXT,
  Card,
  DashboardShell,
  GRID,
  KpiTile,
  RED,
  SERIES,
  SERIES_HOVER,
  TITLE,
  Tooltip,
  barPath,
  keyNav,
  niceScale,
  svgFocus,
  addDays,
  shiftISO,
  useToday,
  useWidth,
  useDemo,
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
const TRACK = "#d9dfee" // light step of the series hue (remaining work)

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
      <span className={cn("tabular-nums text-ink", strong && "font-semibold")}>{value}</span>
    </div>
  )
}

/** Small warning triangle drawn in SVG (status icon for "over budget"). */
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
  const [ref, w] = useWidth<HTMLDivElement>()
  const [active, setActive] = React.useState<number | null>(null)
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
  const maxChars = Math.floor((m.l - 12) / 5.4)
  const short = (s: string) => (s.length > maxChars ? `${s.slice(0, maxChars - 1).trimEnd()}…` : s)

  // Month boundaries inside the (shifted) window; each label sits centred in its month.
  const ticks: Date[] = []
  for (let d = new Date(start.getFullYear(), start.getMonth() + (start.getDate() === 1 ? 0 : 1), 1); d < end; d = new Date(d.getFullYear(), d.getMonth() + 1, 1))
    ticks.push(d)
  const every = iw / 12 < 30 ? 3 : 1

  return (
    <div ref={ref} className="relative" style={{ height: H }}>
      {w > 0 && (
        <svg
          width={w}
          height={H}
          role="img"
          aria-label={`${T.gantt.title}. ${t.keyboardHint}.`}
          className={svgFocus}
          onPointerLeave={() => setActive(null)}
          {...keyNav(n, active, setActive)}
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
            const cy = m.t + row * i + row / 2
            const xs = x(p.from)
            const xe = x(addDays(p.to, 1))
            const bw = Math.max(2, xe - xs)
            const hover = active === i
            return (
              <g key={p.name} onPointerEnter={() => setActive(i)}>
                <rect x={0} y={m.t + row * i} width={w} height={row} fill={hover ? "#f5f6f9" : "transparent"} />
                <text x={m.l - 10} y={cy} dy="0.32em" textAnchor="end" fontSize={10} fill={hover ? TITLE : AXIS_TEXT}>
                  {short(p.name)}
                </text>
                {p.status === "done" && <rect x={xs} y={cy - bh / 2} width={bw} height={bh} rx={3} fill={hover ? "#8797bd" : DONE} />}
                {p.status === "active" && (
                  <>
                    <rect x={xs} y={cy - bh / 2} width={bw} height={bh} rx={3} fill={TRACK} />
                    <rect x={xs} y={cy - bh / 2} width={(bw * p.progress) / 100} height={bh} rx={3} fill={hover ? SERIES_HOVER : SERIES} />
                  </>
                )}
                {p.status === "planned" && (
                  <rect
                    x={xs + 0.75}
                    y={cy - bh / 2 + 0.75}
                    width={bw - 1.5}
                    height={bh - 1.5}
                    rx={3}
                    fill={hover ? "#eef1f8" : "#fff"}
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
        </svg>
      )}
      {active !== null && w > 0 && (
        <Tooltip x={(x(bars[active].from) + x(addDays(bars[active].to, 1))) / 2} y={m.t + row * active + row / 2} width={w}>
          <p className="mb-1 font-medium text-ink">{bars[active].name}</p>
          <Row label={T.gantt.status[bars[active].status]} value={`${f.date(bars[active].from)} – ${f.date(bars[active].to)}`} />
          {bars[active].status === "active" && <Row label={T.gantt.progress} value={f.pct(bars[active].progress, 0)} strong />}
          <Row label={T.gantt.lead} value={bars[active].lead} />
        </Tooltip>
      )}
    </div>
  )
}

function GanttLegend() {
  const { t } = useDemo()
  const T = t.projects
  return (
    <>
      <span className="inline-flex items-center gap-1.5">
        <span aria-hidden="true" className="block h-2 w-3.5 rounded-[2px]" style={{ background: DONE }} />
        {T.gantt.status.done}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span aria-hidden="true" className="flex h-2 w-3.5 overflow-hidden rounded-[2px]" style={{ background: TRACK }}>
          <span className="block h-full w-2" style={{ background: SERIES }} />
        </span>
        {T.gantt.status.active}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span aria-hidden="true" className="block h-2 w-3.5 rounded-[2px] border border-dashed" style={{ borderColor: SERIES }} />
        {T.gantt.status.planned}
      </span>
    </>
  )
}

/* ── budget vs. invoiced (scatter) ───────────────────────────────────── */

function BudgetScatter({ height }: { height: number }) {
  const { t, f } = useDemo()
  const T = t.projects
  const [ref, w] = useWidth<HTMLDivElement>()
  const [active, setActive] = React.useState<number | null>(null)
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

  // Nearest point within 28px (hit target larger than the 10px dot).
  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const b = e.currentTarget.getBoundingClientRect()
    const px = e.clientX - b.left
    const py = e.clientY - b.top
    let best: number | null = null
    let bestD = 28
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
    <div ref={ref} className="relative" style={{ height: H }}>
      {w > 0 && (
        <svg
          width={w}
          height={H}
          role="img"
          aria-label={`${T.scatter.title}. ${t.keyboardHint}.`}
          className={svgFocus}
          onPointerMove={onMove}
          onPointerLeave={() => setActive(null)}
          {...keyNav(n, active, setActive)}
        >
          {ticks.map((t) => (
            <g key={t}>
              <line x1={m.l} x2={m.l + iw} y1={y(t)} y2={y(t)} stroke={GRID} />
              <line x1={x(t)} x2={x(t)} y1={m.t} y2={m.t + ih} stroke={GRID} />
              <text x={m.l - 8} y={y(t)} dy="0.32em" textAnchor="end" fontSize={10} fill={AXIS_TEXT}>
                {f.compact(t)}
              </text>
              <text x={x(t)} y={m.t + ih + 13} textAnchor="middle" fontSize={10} fill={AXIS_TEXT}>
                {f.compact(t)}
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
          <line x1={x(0)} y1={y(0)} x2={x(top)} y2={y(top)} stroke="#b9c1d0" strokeWidth={1} />
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
        </svg>
      )}
      {active !== null && w > 0 && (
        <Tooltip x={x(projects[active].budget)} y={y(projects[active].invoiced)} width={w}>
          <p className="mb-1 font-medium text-ink">{projects[active].name}</p>
          <Row label={T.utilization.budget} value={f.chf(projects[active].budget)} />
          <Row label={T.utilization.invoiced} value={f.chf(projects[active].invoiced)} />
          <Row label={T.utilization.ratio} value={f.pct(ratio(projects[active]))} strong />
        </Tooltip>
      )}
    </div>
  )
}

/* ── budget utilisation (bars with 100 % reference) ─────────────────── */

function UtilizationBars({ height }: { height: number }) {
  const { t, f } = useDemo()
  const T = t.projects
  const [ref, w] = useWidth<HTMLDivElement>()
  const [active, setActive] = React.useState<number | null>(null)
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
  const top = 125
  const x = (v: number) => m.l + (Math.min(v, top) / top) * iw
  const maxChars = Math.floor((m.l - 12) / 5.4)
  const short = (s: string) => (s.length > maxChars ? `${s.slice(0, maxChars - 1).trimEnd()}…` : s)

  return (
    <div ref={ref} className="relative" style={{ height: H }}>
      {w > 0 && (
        <svg
          width={w}
          height={H}
          role="img"
          aria-label={`${T.utilization.title}. ${t.keyboardHint}.`}
          className={svgFocus}
          onPointerLeave={() => setActive(null)}
          {...keyNav(n, active, setActive)}
        >
          {[0, 50, 100].map((t) => (
            <g key={t}>
              <line x1={x(t)} x2={x(t)} y1={m.t} y2={m.t + ih} stroke={t === 100 ? "#9aa3b5" : GRID} />
              <text x={x(t)} y={H - 4} textAnchor="middle" fontSize={10} fill={t === 100 ? TITLE : AXIS_TEXT}>
                {f.pct(t, 0)}
              </text>
            </g>
          ))}
          {items.map((p, i) => {
            const r = ratio(p)
            const over = r > 100
            const cy = m.t + row * i + row / 2
            return (
              <g key={p.name} onPointerEnter={() => setActive(i)}>
                <rect x={0} y={m.t + row * i} width={w} height={row} fill="transparent" />
                <text x={m.l - 10} y={cy} dy="0.32em" textAnchor="end" fontSize={10} fill={active === i ? TITLE : AXIS_TEXT}>
                  {short(p.name)}
                </text>
                {r > 0 && <path d={barPath(m.l, cy - bh / 2, x(r) - m.l, bh)} fill={over ? RED : active === i ? SERIES_HOVER : SERIES} />}
                <text x={x(r) + 6} y={cy} dy="0.32em" fontSize={10} fontWeight={600} fill={TITLE}>
                  {f.pct(r)}
                </text>
                {over && (
                  <>
                    <WarnIcon x={x(r) + 46} y={cy - 5} />
                    {!narrow && (
                      <text x={x(r) + 60} y={cy} dy="0.32em" fontSize={10} fill={RED}>
                        {T.utilization.over}
                      </text>
                    )}
                  </>
                )}
              </g>
            )
          })}
        </svg>
      )}
      {active !== null && w > 0 && (
        <Tooltip x={x(ratio(items[active]))} y={m.t + row * active + row / 2} width={w}>
          <p className="mb-1 font-medium text-ink">{items[active].name}</p>
          <Row label={T.utilization.budget} value={f.chf(items[active].budget)} />
          <Row label={T.utilization.invoiced} value={f.chf(items[active].invoiced)} />
          <Row label={T.utilization.ratio} value={f.pct(ratio(items[active]))} strong />
          {ratio(items[active]) > 100 && <p className="mt-1 font-medium text-danger">{T.utilization.over}</p>}
        </Tooltip>
      )}
    </div>
  )
}

/* ── dashboard ───────────────────────────────────────────────────────── */

export function ProjectsDashboard() {
  const { t, f } = useDemo()
  const T = t.projects
  const projects = useProjects()
  const budget = projects.reduce((s, p) => s + p.budget, 0)
  const invoiced = projects.reduce((s, p) => s + p.invoiced, 0)
  const kpis = [
    { label: T.kpis.projects, value: f.num(projects.length) },
    { label: T.kpis.active, value: f.num(projects.filter((p) => p.status === "active").length) },
    { label: T.kpis.budget, value: f.chfCompact(budget) },
    { label: T.kpis.open, value: f.chfCompact(budget - invoiced) },
  ]

  return (
    <DashboardShell title={T.title}>
      <div className="mb-3 grid grid-cols-2 gap-3 sm:mb-4 sm:gap-4 lg:grid-cols-4">
        {kpis.map((k) => (
          <KpiTile key={k.label} {...k} />
        ))}
      </div>

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
