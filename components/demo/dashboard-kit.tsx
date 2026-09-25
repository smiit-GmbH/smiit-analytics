"use client"

import * as React from "react"
import { DEMO_CLOCK } from "@/content/demo/common"
import { cn } from "@/lib/utils"

/*
 * Shared building blocks for the interactive demo dashboards (Verkauf, Bilanz),
 * styled after the smiit Analytics product UI. Plain SVG + HTML, no chart library.
 *
 * Palette follows the product: slate/navy blues, red only for negatives
 * (outflows, decreases, over budget). Checked with the dataviz validator:
 * pairs are distinguishable for CVD and normal vision and clear 3:1; the
 * slates read low-chroma by design (product look). The 4-step blue ramp
 * passes as an ordinal scale.
 *
 * Chart rules (dataviz method): one axis per chart, 2px lines, bars ≤ 24px
 * with a 4px rounded data end, hairline grid, text in ink tokens (never the
 * series colour). Series colours were validated for CVD and contrast:
 * slate/navy blues + red for negatives. Every chart has a hover/focus tooltip
 * and arrow-key navigation.
 */

export const SERIES = "#4a5a80" // main bars / primary series (product slate)
export const SERIES_HOVER = "#5f709a"
export const PREV = "#2b3752" // dark navy: comparison series (prior year, billable, net)
export const LIGHT = "#7d8cb3" // light slate: primary lines, totals
export const PALE = "#a5b0cf" // lightest ramp step (>= 2:1 on white)
export const RED = "#c53030" // negatives only: outflows, decreases, over budget
export const RED_HOVER = "#d94a4a"
export const GRID = "#eceef2"
export const AXIS_TEXT = "#6b7280"
export const TITLE = "#1f2937"

/**
 * Swiss number format (12’345.6). Deliberately not Intl: Node and browsers ship
 * different ICU data for de-CH (’ vs '), which breaks hydration.
 */
export function num(n: number, decimals = 0) {
  const [int, frac] = Math.abs(n).toFixed(decimals).split(".")
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, "’")
  const trimmed = frac && Number(frac) !== 0 ? `.${frac.replace(/0+$/, "")}` : ""
  return `${n < 0 ? "–" : ""}${grouped}${trimmed}`
}
export const chf = (n: number) => `CHF ${num(n)}`
export const compact = (n: number) => (n === 0 ? "0 Tsd." : `${num(n / 1000, 1)} Tsd.`)
export const pct = (n: number) => `${num(n, 1)} %`
export const chf2 = (n: number) => `CHF ${num(Math.trunc(n))}.${n.toFixed(2).split(".")[1]}`

/* ── demo clock ──────────────────────────────────────────────────────── */

/*
 * All demo data is authored relative to DEMO_CLOCK.reference. In the browser,
 * every date is shifted by the whole days between that reference and today,
 * so month axes, the Gantt timeline and dates always look current.
 * Server render (static export) uses the reference date; the real date is
 * applied right after hydration, before charts draw (they wait for their width).
 */

const DAY_MS = 86_400_000
export const MONTHS = DEMO_CLOCK.months

/** Local-midnight Date from "YYYY-MM-DD" (Date.parse would use UTC). */
function parseISO(iso: string) {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d)
}

export const REFERENCE_DATE = parseISO(DEMO_CLOCK.reference)

export function useToday(): Date {
  const [today, setToday] = React.useState(REFERENCE_DATE)
  React.useEffect(() => {
    const now = new Date()
    setToday(new Date(now.getFullYear(), now.getMonth(), now.getDate()))
  }, [])
  return today
}

/** Authored ISO date moved by the same number of days as today is from the reference. */
export function shiftISO(iso: string, today: Date) {
  const days = Math.round((today.getTime() - REFERENCE_DATE.getTime()) / DAY_MS) // round: DST-safe
  const d = parseISO(iso)
  d.setDate(d.getDate() + days)
  return d
}

export function addDays(d: Date, n: number) {
  const r = new Date(d)
  r.setDate(r.getDate() + n)
  return r
}

/** "25.09.2026" */
export function formatDate(d: Date) {
  const p = (n: number) => String(n).padStart(2, "0")
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}`
}

/** Labels of the last `count` complete months, oldest first, e.g. "Sep 25" … "Aug 26". */
export function monthLabels(today: Date, count = 12) {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(today.getFullYear(), today.getMonth() - count + i, 1)
    return `${MONTHS[d.getMonth()]} ${String(d.getFullYear()).slice(-2)}`
  })
}

/* ── helpers ─────────────────────────────────────────────────────────── */

export function useWidth<T extends HTMLElement>() {
  const ref = React.useRef<T>(null)
  const [width, setWidth] = React.useState(0)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setWidth(Math.round(e.contentRect.width)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, width] as const
}

/** Clean axis: top value and ticks at 1 / 2 / 2.5 / 5 × 10ⁿ steps. */
export function niceScale(max: number, count = 4) {
  const raw = max / count
  const mag = 10 ** Math.floor(Math.log10(raw))
  const norm = raw / mag
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag
  const top = Math.ceil(max / step) * step
  const ticks: number[] = []
  for (let v = 0; v <= top + step / 2; v += step) ticks.push(v)
  return { top, ticks }
}

/** Column path with a 4px rounded data end and a square baseline. */
export function columnPath(x: number, y: number, w: number, base: number) {
  const r = Math.min(4, w / 2, base - y)
  return `M${x},${base} V${y + r} Q${x},${y} ${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${base} Z`
}

/** Horizontal bar path: square at the baseline (left), 4px rounded data end (right). */
export function barPath(x: number, y: number, w: number, h: number) {
  const r = Math.min(4, h / 2, w)
  return `M${x},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h - r} Q${x + w},${y + h} ${x + w - r},${y + h} H${x} Z`
}

/** Arrow-key navigation shared by all charts (plain function, no hooks). */
export function keyNav(count: number, active: number | null, setActive: (i: number | null) => void) {
  return {
    tabIndex: 0,
    onFocus: () => active === null && setActive(0),
    onBlur: () => setActive(null),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return
      e.preventDefault()
      const back = e.key === "ArrowLeft" || e.key === "ArrowUp"
      const cur = active ?? (back ? count : -1)
      setActive(Math.min(count - 1, Math.max(0, cur + (back ? -1 : 1))))
    },
  }
}

export const svgFocus = "block rounded outline-none focus-visible:ring-2 focus-visible:ring-brand"

export function Tooltip({ x, y, width, children }: { x: number; y: number; width: number; children: React.ReactNode }) {
  const flip = x > width - 170 // flip to the left near the right edge
  return (
    <div
      className="pointer-events-none absolute z-10 min-w-36 whitespace-nowrap rounded-md bg-white px-3 py-2 text-xs shadow-card ring-1 ring-black/10"
      style={{ left: x, top: y, transform: `translate(${flip ? "calc(-100% - 12px)" : "12px"}, -50%)` }}
    >
      {children}
    </div>
  )
}

export function LineKey({ color, dashed }: { color: string; dashed?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="block h-0.5 w-3.5 shrink-0 rounded-full"
      style={dashed ? { backgroundImage: `linear-gradient(90deg, ${color} 60%, transparent 60%)`, backgroundSize: "5px 2px" } : { background: color }}
    />
  )
}

export function TipRow({ color, dashed, value, label }: { color?: string; dashed?: boolean; value: string; label: string }) {
  return (
    <div className="flex items-center gap-2 py-0.5">
      {color && <LineKey color={color} dashed={dashed} />}
      <span className="font-semibold tabular-nums text-ink">{value}</span>
      <span className="text-ink-muted">{label}</span>
    </div>
  )
}

export function Card({ title, legend, className, children }: { title: string; legend?: React.ReactNode; className?: string; children: React.ReactNode }) {
  return (
    <section className={cn("min-w-0 rounded-lg border border-[#e5e7eb] bg-white px-4 pb-3 pt-3.5", className)}>
      <h4 className="text-[0.82rem] font-semibold" style={{ color: TITLE }}>
        {title}
      </h4>
      {legend && <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.68rem]" style={{ color: AXIS_TEXT }}>{legend}</div>}
      <div className="mt-2">{children}</div>
    </section>
  )
}

/* ── KPI tiles ───────────────────────────────────────────────────────── */

/** KPI panel: title, value below (left-aligned). */
export function KpiTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-lg border border-[#e5e7eb] bg-white px-4 py-3">
      <p className="text-[0.78rem] font-semibold leading-snug" style={{ color: TITLE }}>
        {label}
      </p>
      <p className="mt-2 whitespace-nowrap text-[1.1rem] font-semibold leading-tight tracking-tight text-ink sm:text-[1.3rem]">{value}</p>
    </div>
  )
}

/* ── line chart ──────────────────────────────────────────────────────── */

export type LineSeries = {
  name: string
  values: number[]
  color: string
  /** Dashed stroke, e.g. for a prior-year comparison. */
  dashed?: boolean
  /** Small markers on every point. */
  dots?: boolean
}

/**
 * Multi-series line chart with a crosshair: the pointer snaps to the nearest
 * X and one tooltip lists every series there. The first series is drawn on top.
 */
export function LineChart({
  labels,
  series,
  label,
  format,
  tickFormat = compact,
  footer,
  height = 170,
}: {
  labels: string[]
  series: LineSeries[]
  /** Accessible name of the chart. */
  label: string
  /** Value format in the tooltip. */
  format: (n: number) => string
  tickFormat?: (n: number) => string
  /** Optional extra line at the bottom of the tooltip. */
  footer?: (index: number) => React.ReactNode
  height?: number
}) {
  const [ref, w] = useWidth<HTMLDivElement>()
  const [active, setActive] = React.useState<number | null>(null)
  const H = height
  const m = { l: 48, r: 18, t: 6, b: 20 }
  const n = labels.length
  const iw = Math.max(0, w - m.l - m.r)
  const ih = H - m.t - m.b
  const { top, ticks } = niceScale(Math.max(...series.flatMap((s) => s.values)), 4)
  const x = (i: number) => m.l + (i * iw) / (n - 1)
  const y = (v: number) => m.t + ih - (v / top) * ih
  const line = (vals: number[]) => vals.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ")
  const every = iw / n < 48 ? 2 : 1

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const px = e.clientX - e.currentTarget.getBoundingClientRect().left
    setActive(Math.min(n - 1, Math.max(0, Math.round(((px - m.l) / iw) * (n - 1)))))
  }

  return (
    <div ref={ref} className="relative" style={{ height: H }}>
      {w > 0 && (
        <svg
          width={w}
          height={H}
          role="img"
          aria-label={label}
          className={cn(svgFocus, "touch-pan-y")}
          onPointerMove={onMove}
          onPointerLeave={() => setActive(null)}
          {...keyNav(n, active, setActive)}
        >
          {ticks.map((t) => (
            <g key={t}>
              <line x1={m.l} x2={w - m.r} y1={y(t)} y2={y(t)} stroke={GRID} />
              <text x={m.l - 8} y={y(t)} dy="0.32em" textAnchor="end" fontSize={10} fill={AXIS_TEXT}>
                {tickFormat(t)}
              </text>
            </g>
          ))}
          {labels.map((l, i) =>
            i % every === 0 ? (
              <text key={l} x={x(i)} y={H - 4} textAnchor="middle" fontSize={10} fill={AXIS_TEXT}>
                {l}
              </text>
            ) : null,
          )}
          {active !== null && <line x1={x(active)} x2={x(active)} y1={m.t} y2={m.t + ih} stroke="#cfd4dc" />}
          {[...series].reverse().map((s) => (
            <g key={s.name}>
              <path
                d={line(s.values)}
                fill="none"
                stroke={s.color}
                strokeWidth={2}
                strokeDasharray={s.dashed ? "5 4" : undefined}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {s.dots &&
                s.values.map((v, i) => (
                  <circle key={i} cx={x(i)} cy={y(v)} r={active === i ? 4.5 : 2.5} fill={s.color} stroke="#fff" strokeWidth={active === i ? 2 : 1} />
                ))}
              {!s.dots && active !== null && <circle cx={x(active)} cy={y(s.values[active])} r={4.5} fill={s.color} stroke="#fff" strokeWidth={2} />}
            </g>
          ))}
        </svg>
      )}
      {active !== null && w > 0 && (
        <Tooltip x={x(active)} y={y(Math.max(...series.map((s) => s.values[active])))} width={w}>
          <p className="mb-1 font-medium text-ink">{labels[active]}</p>
          {series.map((s) => (
            <TipRow key={s.name} color={s.color} dashed={s.dashed} value={format(s.values[active])} label={s.name} />
          ))}
          {footer?.(active)}
        </Tooltip>
      )}
    </div>
  )
}

/** Legend entry with a short line key (mirrors a line mark). */
export function LineLegend({ color, dashed, children }: { color: string; dashed?: boolean; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <LineKey color={color} dashed={dashed} />
      {children}
    </span>
  )
}

/* ── column chart ────────────────────────────────────────────────────── */



export function Columns({
  items,
  label,
  tooltip,
  height,
  angled,
}: {
  items: BarItem[]
  label: string
  tooltip: (item: BarItem, index: number) => React.ReactNode
  height: number
  /** Slanted category labels (as in the product), for long names. */
  angled?: boolean
}) {
  const [ref, w] = useWidth<HTMLDivElement>()
  const [active, setActive] = React.useState<number | null>(null)
  const H = height
  const n = items.length
  // Straight labels wrap onto two lines when a band is too narrow (≈5.4px per character at 10px).
  const band0 = Math.max(0, w - 54) / n
  const lines = items.map((it) => (!angled && it.name.length * 5.4 > band0 - 4 && it.name.includes(" ") ? it.name.split(/ (.+)/).slice(0, 2) : [it.name]))
  const twoLines = lines.some((l) => l.length > 1)
  const m = { l: 48, r: 6, t: 6, b: angled ? 54 : twoLines ? 30 : 20 }
  const iw = Math.max(0, w - m.l - m.r)
  const ih = H - m.t - m.b
  const base = m.t + ih
  const band = iw / n
  const bw = Math.min(24, band * 0.55)
  const { top, ticks } = niceScale(Math.max(...items.map((i) => i.value)), 4)
  const y = (v: number) => base - (v / top) * ih
  // Angled labels: ≤ 11 characters at 45° stay within one band; the full name is in the tooltip.
  const short = (s: string) => (s.length > 11 ? `${s.slice(0, 10).trimEnd()}…` : s)

  return (
    <div ref={ref} className="relative" style={{ height: H }}>
      {w > 0 && (
        <svg
          width={w}
          height={H}
          role="img"
          aria-label={label}
          className={svgFocus}
          onPointerLeave={() => setActive(null)}
          {...keyNav(n, active, setActive)}
        >
          {ticks.map((t) => (
            <g key={t}>
              <line x1={m.l} x2={w - m.r} y1={y(t)} y2={y(t)} stroke={GRID} />
              <text x={m.l - 8} y={y(t)} dy="0.32em" textAnchor="end" fontSize={10} fill={AXIS_TEXT}>
                {compact(t)}
              </text>
            </g>
          ))}
          {items.map((it, i) => {
            const cx = m.l + band * i + band / 2
            return (
              <g key={it.name} onPointerEnter={() => setActive(i)}>
                {/* hit target: the whole band, taller than the mark */}
                <rect x={m.l + band * i} y={m.t} width={band} height={ih + m.b} fill="transparent" />
                <path d={columnPath(cx - bw / 2, y(it.value), bw, base)} fill={active === i ? SERIES_HOVER : SERIES} />
                {angled ? (
                  <text
                    transform={`translate(${cx + 4},${base + 10}) rotate(-45)`}
                    textAnchor="end"
                    fontSize={10}
                    fill={active === i ? TITLE : AXIS_TEXT}
                  >
                    {short(it.name)}
                  </text>
                ) : (
                  <text x={cx} y={base + 14} textAnchor="middle" fontSize={10} fill={active === i ? TITLE : AXIS_TEXT}>
                    {lines[i].map((line, li) => (
                      <tspan key={li} x={cx} dy={li ? 11 : 0}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      )}
      {active !== null && w > 0 && (
        <Tooltip x={m.l + band * active + band / 2} y={y(items[active].value)} width={w}>
          {tooltip(items[active], active)}
        </Tooltip>
      )}
    </div>
  )
}

/* ── horizontal bars ─────────────────────────────────────────────────── */

export type BarItem = { name: string; value: number }

export function HBars({
  items,
  height,
  label,
  tooltip,
  labelWidth = 128,
  tickFormat = compact,
}: {
  items: BarItem[]
  height: number
  /** Accessible name of the chart. */
  label: string
  tooltip: (item: BarItem, index: number) => React.ReactNode
  labelWidth?: number
  tickFormat?: (n: number) => string
}) {
  const [ref, w] = useWidth<HTMLDivElement>()
  const [active, setActive] = React.useState<number | null>(null)
  const H = height
  const n = items.length
  const m = { l: labelWidth, r: 18, t: 2, b: 20 }
  const iw = Math.max(0, w - m.l - m.r)
  const ih = H - m.t - m.b
  const row = ih / n
  const bh = Math.min(14, row * 0.6)
  const { top, ticks } = niceScale(Math.max(...items.map((i) => i.value)), 4)
  const x = (v: number) => m.l + (v / top) * iw

  return (
    <div ref={ref} className="relative" style={{ height: H }}>
      {w > 0 && (
        <svg
          width={w}
          height={H}
          role="img"
          aria-label={label}
          className={svgFocus}
          onPointerLeave={() => setActive(null)}
          {...keyNav(n, active, setActive)}
        >
          {ticks.map((t) => (
            <g key={t}>
              <line x1={x(t)} x2={x(t)} y1={m.t} y2={m.t + ih} stroke={GRID} />
              <text x={x(t)} y={H - 4} textAnchor="middle" fontSize={10} fill={AXIS_TEXT}>
                {tickFormat(t)}
              </text>
            </g>
          ))}
          {items.map((it, i) => {
            const cy = m.t + row * i + row / 2
            return (
              <g key={it.name} onPointerEnter={() => setActive(i)}>
                <rect x={0} y={m.t + row * i} width={w} height={row} fill="transparent" />
                <text x={m.l - 10} y={cy} dy="0.32em" textAnchor="end" fontSize={10} fill={active === i ? TITLE : AXIS_TEXT}>
                  {it.name}
                </text>
                <path d={barPath(m.l, cy - bh / 2, x(it.value) - m.l, bh)} fill={active === i ? SERIES_HOVER : SERIES} />
              </g>
            )
          })}
        </svg>
      )}
      {active !== null && w > 0 && (
        <Tooltip x={x(items[active].value)} y={m.t + row * active + row / 2} width={w}>
          {tooltip(items[active], active)}
        </Tooltip>
      )}
    </div>
  )
}

/** "25.09.2026 15:06" – built by hand, not Intl, so it matches the product format everywhere. */
function formatNow(d: Date) {
  const p = (n: number) => String(n).padStart(2, "0")
  return `${formatDate(d)} ${p(d.getHours())}:${p(d.getMinutes())}`
}

/**
 * Outer shell shared by all demo dashboards: page title + "as of" chip (as in
 * the product), light canvas, "Beispieldaten" note.
 *
 * The chip shows the visitor's current date and time. The page is statically
 * exported, so it is set in the browser after hydration; until then the chip
 * stays invisible (no flash of the build-time date). `asOf` is the no-JS fallback.
 */
export function DashboardShell({ title, asOf, note, children }: { title: string; asOf: string; note: string; children: React.ReactNode }) {
  const [now, setNow] = React.useState<string | null>(null)
  React.useEffect(() => setNow(formatNow(new Date())), [])
  return (
    <div className="bg-[#f8f9fb] p-3 text-left sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4">
        <h3 className="text-lg font-semibold tracking-tight" style={{ color: TITLE }}>
          {title}
        </h3>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border border-[#e5e7eb] bg-white px-2.5 py-1 text-[0.68rem] tabular-nums transition-opacity duration-300",
            now ? "opacity-100" : "opacity-0",
          )}
          style={{ color: AXIS_TEXT }}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
            <path d="M3 3v5h5" />
            <path d="M12 7v5l3 2" />
          </svg>
          {now ?? asOf}
        </span>
      </div>
      {children}
      <p className="mt-2 text-right text-[0.65rem]" style={{ color: AXIS_TEXT }}>
        {note}
      </p>
    </div>
  )
}
