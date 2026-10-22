"use client"

import * as React from "react"
import { DEMO_CLOCK } from "@/lib/demo/clock"
import type { Formatter } from "@/lib/format"
import { useClientValue } from "@/lib/use-client-value"
import { cn } from "@/lib/utils"
import { DEMO_CANVAS, useDemo } from "./demo-context"

export { DemoProvider, useDemo } from "./demo-context"

/*
 * Shared building blocks for the interactive demo dashboards (sales, balance, …),
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
 * series colour). Every chart has a hover/focus tooltip, arrow-key navigation
 * and a live region that reads the tooltip to screen readers.
 *
 * A chart is useChart() + <ChartFrame>: the frame owns measuring, the <svg>
 * with its accessible name and keys, and the tooltip; the chart only draws.
 */

/* ── palette (the only place for demo colours) ───────────────────────── */

export const SERIES = "#4a5a80" // main bars / primary series (product slate)
export const SERIES_HOVER = "#5f709a"
export const PREV = "#2b3752" // dark navy: comparison series (prior year, billable, net)
export const LIGHT = "#7d8cb3" // light slate: primary lines, totals
export const LIGHT_HOVER = "#6878a3"
export const PALE = "#a5b0cf" // lightest ramp step (>= 2:1 on white)
export const RED = "#c53030" // negatives only: outflows, decreases, over budget
export const RED_HOVER = "#d94a4a"
export const GRID = "#eceef2"
export const ZERO_LINE = "#9aa3b5" // zero / 100 % reference line, stronger than the grid
export const GUIDE = "#cfd4dc" // crosshair
export const CONNECTOR = "#c3c9d4" // waterfall steps
export const REFERENCE = "#b9c1d0" // diagonal "invoiced = budget"
export const AXIS_TEXT = "#6b7280"
export const TITLE = "#1f2937"
const CANVAS = DEMO_CANVAS
const BORDER = "#e5e7eb"
export const HOVER_BG = "#f3f4f7" // hovered band, row or legend entry

/**
 * The surface colours as CSS variables on the DashboardShell, so Tailwind
 * classes inside it can use them (`bg-(--demo-hover)`) without a second copy.
 */
const SHELL_VARS = { "--demo-canvas": CANVAS, "--demo-border": BORDER, "--demo-hover": HOVER_BG } as React.CSSProperties

/* ── demo clock ──────────────────────────────────────────────────────── */

/*
 * All demo data is authored relative to DEMO_CLOCK.reference. In the browser,
 * every date is shifted by the whole days between that reference and today,
 * so month axes, the Gantt timeline and dates always look current.
 * Server render (static export) uses the reference date; the real date is
 * applied right after hydration, before charts draw (they wait for their width).
 */

const DAY_MS = 86_400_000

/** Local-midnight Date from "YYYY-MM-DD" (Date.parse would use UTC). */
function parseISO(iso: string) {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d)
}

export const REFERENCE_DATE = parseISO(DEMO_CLOCK.reference)

/** Local midnight of today, as a timestamp (a primitive, so `useClientValue` can compare it). */
function todayTimestamp() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
}

export function useToday(): Date {
  const timestamp = useClientValue(todayTimestamp, REFERENCE_DATE.getTime())
  return React.useMemo(() => new Date(timestamp), [timestamp])
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

/** Labels of the last `count` complete months, oldest first, e.g. "Sep 25" … "Aug 26". */
export function monthLabels(today: Date, f: Formatter, count = 12) {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(today.getFullYear(), today.getMonth() - count + i, 1)
    return `${f.month(d.getMonth())} ${String(d.getFullYear()).slice(-2)}`
  })
}

/* ── scales, paths, labels ───────────────────────────────────────────── */

/** Clean axis: top value and ticks at 1 / 2 / 2.5 / 5 × 10ⁿ steps. Empty or all-zero data gets a 0…1 axis. */
export function niceScale(max: number, count = 4) {
  if (!(max > 0)) return { top: 1, ticks: [0, 1] }
  const raw = max / count
  const mag = 10 ** Math.floor(Math.log10(raw))
  const norm = raw / mag
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag
  const top = Math.ceil(max / step) * step
  const ticks: number[] = []
  for (let v = 0; v <= top + step / 2; v += step) ticks.push(v)
  return { top, ticks }
}

/* Bars and columns: square at the baseline, 4px rounded data end. */

/** Column rising from `base` up to `y`. */
export function columnPath(x: number, y: number, w: number, base: number) {
  const r = Math.min(4, w / 2, base - y)
  return `M${x},${base} V${y + r} Q${x},${y} ${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${base} Z`
}

/** Column hanging down from `base` to `yEnd` (negative values). */
export function columnDownPath(x: number, yEnd: number, w: number, base: number) {
  const r = Math.min(4, w / 2, yEnd - base)
  return `M${x},${base} V${yEnd - r} Q${x},${yEnd} ${x + r},${yEnd} H${x + w - r} Q${x + w},${yEnd} ${x + w},${yEnd - r} V${base} Z`
}

/** Horizontal bar growing right from `x`. */
export function barPath(x: number, y: number, w: number, h: number) {
  const r = Math.min(4, h / 2, w)
  return `M${x},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h - r} Q${x + w},${y + h} ${x + w - r},${y + h} H${x} Z`
}

/** Horizontal bar growing left from `x0` (negative values). */
export function barLeftPath(x0: number, y: number, w: number, h: number) {
  const r = Math.min(4, h / 2, w)
  const x = x0 - w
  return `M${x0},${y} H${x + r} Q${x},${y} ${x},${y + r} V${y + h - r} Q${x},${y + h} ${x + r},${y + h} H${x0} Z`
}

/** Average glyph width of the 10px axis font, for fitting labels without measuring. */
const CHAR_W = 5.4

/** Cuts a label to `max` characters with an ellipsis; the tooltip shows the full name. */
export function truncate(label: string, max: number) {
  return label.length > max ? `${label.slice(0, max - 1).trimEnd()}…` : label
}

/** Shortens an axis label to fit `width` px at the 10px axis font. */
export const fitLabel = (label: string, width: number) => truncate(label, Math.floor(width / CHAR_W))

/** Whether a label fits `width` px at the 10px axis font. */
export const labelFits = (label: string, width: number) => label.length * CHAR_W <= width

/* ── interaction ─────────────────────────────────────────────────────── */

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

/*
 * Touch: a tap fires pointerleave right after pointerup, which would close the
 * tooltip at once. On touch screens the tooltip therefore stays open after a tap
 * and closes with a tap anywhere outside the chart.
 */

/** pointerleave handler that ignores touch input. */
export const leaveUnlessTouch = (setActive: (i: number | null) => void) => (e: React.PointerEvent) => {
  if (e.pointerType !== "touch") setActive(null)
}

/** Closes an open tooltip when the user taps outside the chart. */
function useTouchDismiss(ref: React.RefObject<HTMLElement | null>, active: number | null, setActive: (i: number | null) => void) {
  React.useEffect(() => {
    if (active === null) return
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setActive(null)
    }
    document.addEventListener("pointerdown", onDown)
    return () => document.removeEventListener("pointerdown", onDown)
  }, [ref, active, setActive])
}

/** Arrow-key navigation shared by all charts (plain function, no hooks). Escape closes the tooltip. */
export function keyNav(count: number, active: number | null, setActive: (i: number | null) => void) {
  return {
    tabIndex: 0,
    onFocus: () => active === null && setActive(0),
    onBlur: () => setActive(null),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Escape" && active !== null) {
        e.preventDefault()
        setActive(null)
        return
      }
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return
      e.preventDefault()
      const back = e.key === "ArrowLeft" || e.key === "ArrowUp"
      const cur = active ?? (back ? count : -1)
      setActive(Math.min(count - 1, Math.max(0, cur + (back ? -1 : 1))))
    },
  }
}

export const svgFocus = "block rounded outline-none focus-visible:ring-2 focus-visible:ring-brand"

/** Accessible name of a chart: its title plus how to explore it with the keys. */
export function useChartLabel(title: string) {
  return `${title}. ${useDemo().t.keyboardHint}.`
}

/** State of one chart: its measured width and the active (hovered/focused) data point. */
export function useChart() {
  const [ref, width] = useWidth<HTMLDivElement>()
  const [active, setActive] = React.useState<number | null>(null)
  useTouchDismiss(ref, active, setActive)
  return { ref, width, active, setActive }
}

export type ChartState = ReturnType<typeof useChart>

/**
 * Frame of every chart: measures its width, draws `children` into an <svg>
 * with accessible name and arrow-key navigation once the width is known, and
 * shows the tooltip of the active point.
 */
export function ChartFrame({
  chart,
  title,
  count,
  height,
  tooltip,
  onPointerMove,
  svgClassName,
  children,
}: {
  chart: ChartState
  /** Chart title; the keyboard hint is added for screen readers. */
  title: string
  /** Number of data points the arrow keys move through. */
  count: number
  height: number
  /** Anchor and content of the tooltip of point `index`. */
  tooltip: (index: number) => { x: number; y: number; content: React.ReactNode }
  /** For crosshair / nearest-point charts: maps the pointer to the active point (also on pointerdown). */
  onPointerMove?: (e: React.PointerEvent<SVGSVGElement>) => void
  svgClassName?: string
  children: React.ReactNode
}) {
  const { ref, width, active, setActive } = chart
  const label = useChartLabel(title)
  const tip = active !== null && width > 0 ? tooltip(active) : null
  return (
    <div ref={ref} className="relative" style={{ height }}>
      {width > 0 && (
        <svg
          width={width}
          height={height}
          role="img"
          aria-label={label}
          className={cn(svgFocus, svgClassName)}
          onPointerMove={onPointerMove}
          onPointerDown={onPointerMove}
          onPointerLeave={leaveUnlessTouch(setActive)}
          {...keyNav(count, active, setActive)}
        >
          {children}
        </svg>
      )}
      {tip && (
        <Tooltip x={tip.x} y={tip.y} width={width}>
          {tip.content}
        </Tooltip>
      )}
    </div>
  )
}

/* ── tooltip ─────────────────────────────────────────────────────────── */

/**
 * Screen readers cannot see the tooltip – charts are `role="img"`. Every
 * tooltip therefore hands its text to the live region of the DashboardShell,
 * which reads it out while the visitor moves through the chart with the keys.
 */
const AnnounceContext = React.createContext<(text: string) => void>(() => {})

/** Near the right edge the tooltip opens to the left; ≈ its widest content plus the 12px offset. */
const TOOLTIP_FLIP = 170

export function Tooltip({ x, y, width, children }: { x: number; y: number; width: number; children: React.ReactNode }) {
  const flip = x > width - TOOLTIP_FLIP
  const ref = React.useRef<HTMLDivElement>(null)
  const announce = React.useContext(AnnounceContext)
  // No dependency list: the content changes with every data point. Same text = no update.
  React.useEffect(() => {
    const text = ref.current?.innerText.replace(/\s+/g, " ").trim()
    if (text) announce(text)
  })
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute z-10 min-w-36 rounded-md bg-white px-3 py-2 text-xs whitespace-nowrap shadow-card ring-1 ring-black/10"
      style={{ left: x, top: y, transform: `translate(${flip ? "calc(-100% - 12px)" : "12px"}, -50%)` }}
    >
      {children}
    </div>
  )
}

/** First line of a tooltip: the name of the data point. */
export function TipTitle({ children }: { children: React.ReactNode }) {
  return <p className="mb-1 font-medium text-ink">{children}</p>
}

export function TipRow({ color, dashed, value, label }: { color?: string; dashed?: boolean; value: string; label: string }) {
  return (
    <div className="flex items-center gap-2 py-0.5">
      {color && <LineKey color={color} dashed={dashed} />}
      <span className="font-semibold text-ink tabular-nums">{value}</span>
      <span className="text-ink-muted">{label}</span>
    </div>
  )
}

/* ── legend keys ─────────────────────────────────────────────────────── */

/** Short line key (mirrors a line mark). */
export function LineKey({ color, dashed }: { color: string; dashed?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="block h-0.5 w-3.5 shrink-0 rounded-full"
      style={
        dashed
          ? { backgroundImage: `linear-gradient(90deg, ${color} 60%, transparent 60%)`, backgroundSize: "5px 2px" }
          : { background: color }
      }
    />
  )
}

/** Small square key (mirrors a bar or slice). */
export function Swatch({ color, className }: { color: string; className?: string }) {
  return <span aria-hidden="true" className={cn("block size-2 shrink-0 rounded-[2px]", className)} style={{ background: color }} />
}

/** One legend entry: a key followed by its text. */
export function LegendItem({ marker, children }: { marker: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {marker}
      {children}
    </span>
  )
}

export function LineLegend({ color, dashed, children }: { color: string; dashed?: boolean; children: React.ReactNode }) {
  return <LegendItem marker={<LineKey color={color} dashed={dashed} />}>{children}</LegendItem>
}

export function SwatchLegend({ color, children }: { color: string; children: React.ReactNode }) {
  return <LegendItem marker={<Swatch color={color} />}>{children}</LegendItem>
}

/* ── layout: card, KPIs ──────────────────────────────────────────────── */

export function Card({
  title,
  legend,
  className,
  children,
}: {
  title: string
  legend?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <section className={cn("min-w-0 rounded-lg border border-(--demo-border) bg-white px-4 pt-3.5 pb-3", className)}>
      <h4 className="text-[0.82rem] font-semibold" style={{ color: TITLE }}>
        {title}
      </h4>
      {legend && (
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.68rem]" style={{ color: AXIS_TEXT }}>
          {legend}
        </div>
      )}
      <div className="mt-2">{children}</div>
    </section>
  )
}

/** KPI panel: title, value below (left-aligned). */
export function KpiTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-lg border border-(--demo-border) bg-white px-4 py-3">
      <p className="text-[0.78rem] leading-snug font-semibold" style={{ color: TITLE }}>
        {label}
      </p>
      <p className="mt-2 text-[1.1rem] leading-tight font-semibold tracking-tight whitespace-nowrap text-ink sm:text-[1.3rem]">{value}</p>
    </div>
  )
}

/** The row of four KPI tiles at the top of every dashboard (2 × 2 on phones). */
export function KpiRow({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="mb-3 grid grid-cols-2 gap-3 sm:mb-4 sm:gap-4 lg:grid-cols-4">
      {items.map((k) => (
        <KpiTile key={k.label} {...k} />
      ))}
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
  title,
  format,
  tickFormat,
  footer,
  height = 170,
}: {
  labels: string[]
  series: LineSeries[]
  title: string
  /** Value format in the tooltip. */
  format: (n: number) => string
  tickFormat?: (n: number) => string
  /** Optional extra line at the bottom of the tooltip. */
  footer?: (index: number) => React.ReactNode
  height?: number
}) {
  const { f } = useDemo()
  const tick = tickFormat ?? f.compact
  const chart = useChart()
  const { width: w, active, setActive } = chart
  const H = height
  const m = { l: 48, r: 18, t: 6, b: 20 }
  const n = labels.length
  const iw = Math.max(0, w - m.l - m.r)
  const ih = H - m.t - m.b
  const { top, ticks } = niceScale(Math.max(...series.flatMap((s) => s.values)), 4)
  // A single point sits in the middle instead of dividing by zero.
  const x = (i: number) => (n > 1 ? m.l + (i * iw) / (n - 1) : m.l + iw / 2)
  const y = (v: number) => m.t + ih - (v / top) * ih
  const line = (vals: number[]) => vals.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ")
  const every = iw / n < 48 ? 2 : 1

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const px = e.clientX - e.currentTarget.getBoundingClientRect().left
    setActive(Math.min(n - 1, Math.max(0, Math.round(((px - m.l) / iw) * (n - 1)))))
  }

  return (
    <ChartFrame
      chart={chart}
      title={title}
      count={n}
      height={H}
      onPointerMove={onMove}
      svgClassName="touch-pan-y"
      tooltip={(i) => ({
        x: x(i),
        y: y(Math.max(...series.map((s) => s.values[i]))),
        content: (
          <>
            <TipTitle>{labels[i]}</TipTitle>
            {series.map((s) => (
              <TipRow key={s.name} color={s.color} dashed={s.dashed} value={format(s.values[i])} label={s.name} />
            ))}
            {footer?.(i)}
          </>
        ),
      })}
    >
      {ticks.map((t) => (
        <g key={t}>
          <line x1={m.l} x2={w - m.r} y1={y(t)} y2={y(t)} stroke={GRID} />
          <text x={m.l - 8} y={y(t)} dy="0.32em" textAnchor="end" fontSize={10} fill={AXIS_TEXT}>
            {tick(t)}
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
      {active !== null && <line x1={x(active)} x2={x(active)} y1={m.t} y2={m.t + ih} stroke={GUIDE} />}
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
              <circle
                key={i}
                cx={x(i)}
                cy={y(v)}
                r={active === i ? 4.5 : 2.5}
                fill={s.color}
                stroke="#fff"
                strokeWidth={active === i ? 2 : 1}
              />
            ))}
          {!s.dots && active !== null && (
            <circle cx={x(active)} cy={y(s.values[active])} r={4.5} fill={s.color} stroke="#fff" strokeWidth={2} />
          )}
        </g>
      ))}
    </ChartFrame>
  )
}

/* ── column chart ────────────────────────────────────────────────────── */

export type BarItem = { name: string; value: number }

/** Angled labels: up to 11 characters at 45° stay within one band. */
const ANGLED_CHARS = 11

export function Columns({
  items,
  title,
  tooltip,
  height,
  angled,
}: {
  items: BarItem[]
  title: string
  tooltip: (item: BarItem, index: number) => React.ReactNode
  height: number
  /** Slanted category labels (as in the product), for long names. */
  angled?: boolean
}) {
  const { f } = useDemo()
  const chart = useChart()
  const { width: w, active, setActive } = chart
  const H = height
  const n = items.length
  const ml = 48
  const mr = 6
  // Straight labels wrap onto two lines when a band is too narrow.
  const band0 = Math.max(0, w - ml - mr) / n
  const lines = items.map((it) =>
    !angled && !labelFits(it.name, band0 - 4) && it.name.includes(" ") ? it.name.split(/ (.+)/).slice(0, 2) : [it.name],
  )
  const twoLines = lines.some((l) => l.length > 1)
  const m = { l: ml, r: mr, t: 6, b: angled ? 54 : twoLines ? 30 : 20 }
  const iw = Math.max(0, w - m.l - m.r)
  const ih = H - m.t - m.b
  const base = m.t + ih
  const band = iw / n
  const bw = Math.min(24, band * 0.55)
  const { top, ticks } = niceScale(Math.max(...items.map((i) => i.value)), 4)
  const y = (v: number) => base - (v / top) * ih
  const cx = (i: number) => m.l + band * i + band / 2

  return (
    <ChartFrame
      chart={chart}
      title={title}
      count={n}
      height={H}
      tooltip={(i) => ({ x: cx(i), y: y(items[i].value), content: tooltip(items[i], i) })}
    >
      {ticks.map((t) => (
        <g key={t}>
          <line x1={m.l} x2={w - m.r} y1={y(t)} y2={y(t)} stroke={GRID} />
          <text x={m.l - 8} y={y(t)} dy="0.32em" textAnchor="end" fontSize={10} fill={AXIS_TEXT}>
            {f.compact(t)}
          </text>
        </g>
      ))}
      {items.map((it, i) => (
        <g key={it.name} onPointerEnter={() => setActive(i)}>
          {/* hit target: the whole band, taller than the mark */}
          <rect x={m.l + band * i} y={m.t} width={band} height={ih + m.b} fill="transparent" />
          <path d={columnPath(cx(i) - bw / 2, y(it.value), bw, base)} fill={active === i ? SERIES_HOVER : SERIES} />
          {angled ? (
            <text
              transform={`translate(${cx(i) + 4},${base + 10}) rotate(-45)`}
              textAnchor="end"
              fontSize={10}
              fill={active === i ? TITLE : AXIS_TEXT}
            >
              {truncate(it.name, ANGLED_CHARS)}
            </text>
          ) : (
            <text x={cx(i)} y={base + 14} textAnchor="middle" fontSize={10} fill={active === i ? TITLE : AXIS_TEXT}>
              {lines[i].map((line, li) => (
                <tspan key={li} x={cx(i)} dy={li ? 11 : 0}>
                  {line}
                </tspan>
              ))}
            </text>
          )}
        </g>
      ))}
    </ChartFrame>
  )
}

/* ── horizontal bars ─────────────────────────────────────────────────── */

export function HBars({
  items,
  height,
  title,
  tooltip,
  labelWidth = 128,
  tickFormat,
}: {
  items: BarItem[]
  height: number
  title: string
  tooltip: (item: BarItem, index: number) => React.ReactNode
  labelWidth?: number
  tickFormat?: (n: number) => string
}) {
  const { f } = useDemo()
  const tick = tickFormat ?? f.compact
  const chart = useChart()
  const { width: w, active, setActive } = chart
  const H = height
  const n = items.length
  const m = { l: labelWidth, r: 18, t: 2, b: 20 }
  const iw = Math.max(0, w - m.l - m.r)
  const ih = H - m.t - m.b
  const row = ih / n
  const bh = Math.min(14, row * 0.6)
  const { top, ticks } = niceScale(Math.max(...items.map((i) => i.value)), 4)
  const x = (v: number) => m.l + (v / top) * iw
  const cy = (i: number) => m.t + row * i + row / 2

  return (
    <ChartFrame
      chart={chart}
      title={title}
      count={n}
      height={H}
      tooltip={(i) => ({ x: x(items[i].value), y: cy(i), content: tooltip(items[i], i) })}
    >
      {ticks.map((t) => (
        <g key={t}>
          <line x1={x(t)} x2={x(t)} y1={m.t} y2={m.t + ih} stroke={GRID} />
          <text x={x(t)} y={H - 4} textAnchor="middle" fontSize={10} fill={AXIS_TEXT}>
            {tick(t)}
          </text>
        </g>
      ))}
      {items.map((it, i) => (
        <g key={it.name} onPointerEnter={() => setActive(i)}>
          <rect x={0} y={m.t + row * i} width={w} height={row} fill="transparent" />
          <text x={m.l - 10} y={cy(i)} dy="0.32em" textAnchor="end" fontSize={10} fill={active === i ? TITLE : AXIS_TEXT}>
            {fitLabel(it.name, m.l - 14)}
          </text>
          <path d={barPath(m.l, cy(i) - bh / 2, x(it.value) - m.l, bh)} fill={active === i ? SERIES_HOVER : SERIES} />
        </g>
      ))}
    </ChartFrame>
  )
}

/* ── dashboard shell ─────────────────────────────────────────────────── */

/**
 * Outer shell shared by all demo dashboards: page title + "as of" chip (as in
 * the product), light canvas, "sample data" note, and the live region that
 * reads tooltips to screen readers.
 *
 * The chip shows the visitor's current date and time. The page is statically
 * exported, so it is set in the browser after hydration; until then the chip
 * stays invisible (no flash of the build-time date).
 */
export function DashboardShell({ title, children }: { title: string; children: React.ReactNode }) {
  const { t, f } = useDemo()
  const now = useClientValue<string | null>(() => f.dateTime(new Date()), null)
  const [announcement, setAnnouncement] = React.useState("")
  return (
    <AnnounceContext.Provider value={setAnnouncement}>
      <div className="bg-(--demo-canvas) p-3 text-left sm:p-4" style={SHELL_VARS}>
        {/* Always mounted, so screen readers pick up every change (see Tooltip). */}
        <p aria-live="polite" className="sr-only">
          {announcement}
        </p>
        <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4">
          <h3 className="text-lg font-semibold tracking-tight" style={{ color: TITLE }}>
            {title}
          </h3>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border border-(--demo-border) bg-white px-2.5 py-1 text-[0.68rem] tabular-nums transition-opacity duration-300",
              now ? "opacity-100" : "opacity-0",
            )}
            style={{ color: AXIS_TEXT }}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-3"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
              <path d="M3 3v5h5" />
              <path d="M12 7v5l3 2" />
            </svg>
            {now ?? f.date(REFERENCE_DATE)}
          </span>
        </div>
        {children}
        <p className="mt-2 text-right text-[0.65rem]" style={{ color: AXIS_TEXT }}>
          {t.note}
        </p>
      </div>
    </AnnounceContext.Provider>
  )
}
