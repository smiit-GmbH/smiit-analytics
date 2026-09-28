"use client"

import * as React from "react"
import { WORKTIME as D } from "@/lib/demo/worktime"
import { cn } from "@/lib/utils"
import {
  AXIS_TEXT,
  Card,
  DashboardShell,
  HBars,
  KpiTile,
  LIGHT,
  LineChart,
  LineLegend,
  PALE,
  PREV,
  SERIES,
  TITLE,
  TipRow,
  Tooltip,
  keyNav,
  monthLabels,
  svgFocus,
  useToday,
  useWidth,
  useDemo,
  leaveUnlessTouch,
  useTouchDismiss,
} from "./dashboard-kit"

/*
 * Interactive demo of the smiit Analytics time-tracking report ("Arbeitszeiten"),
 * built in the page instead of a screenshot. Shared pieces live in ./dashboard-kit.
 *
 * Service colours: the product's 4-step blue ramp (validated as ordinal).
 * Identity never rests on colour alone: 2px surface gaps between slices and a
 * legend with name + share next to the ring.
 */

// Ordinal blue ramp; slots arranged so neighbouring slices always differ clearly in lightness.
const SERVICE_COLORS = [LIGHT, PREV, PALE, SERIES]

/** Hours with the unit of the current language ("1’234 Std." / "1’234 h"). */
function useHours() {
  const { t, f } = useDemo()
  const hours = (n: number) => `${f.num(n)} ${t.worktime.unit}`
  return { hours, signedHours: (n: number) => f.signed(n, hours) }
}

/* ── donut ───────────────────────────────────────────────────────────── */

function arc(cx: number, cy: number, R: number, r: number, a0: number, a1: number) {
  const p = (rad: number, a: number) => [cx + rad * Math.cos(a), cy + rad * Math.sin(a)]
  const large = a1 - a0 > Math.PI ? 1 : 0
  const [x0, y0] = p(R, a0)
  const [x1, y1] = p(R, a1)
  const [x2, y2] = p(r, a1)
  const [x3, y3] = p(r, a0)
  return `M${x0},${y0} A${R},${R} 0 ${large} 1 ${x1},${y1} L${x2},${y2} A${r},${r} 0 ${large} 0 ${x3},${y3} Z`
}

function ServiceDonut({ height }: { height: number }) {
  const { t, f } = useDemo()
  const T = t.worktime
  const { hours } = useHours()
  const [ref, w] = useWidth<HTMLDivElement>()
  const [active, setActive] = React.useState<number | null>(null)
  useTouchDismiss(ref, active, setActive)
  const items = D.services.map((s) => ({ ...s, name: T.services.names[s.key] }))
  const total = items.reduce((s, i) => s + i.value, 0)
  // Ring scales with the card so the legend always has room for full names.
  const size = w > 0 ? Math.round(Math.min(height, 148, Math.max(96, w * 0.48))) : 148
  const R = size / 2 - 4
  const r = R * 0.58
  const c = size / 2

  // Angles clockwise from 12 o'clock.
  let acc = -Math.PI / 2
  const slices = items.map((it) => {
    const a0 = acc
    const a1 = acc + (it.value / total) * Math.PI * 2
    acc = a1
    return { ...it, a0, a1, mid: (a0 + a1) / 2 }
  })

  return (
    <div ref={ref} className="relative flex items-center gap-5" style={{ height }} onPointerLeave={leaveUnlessTouch(setActive)}>
      <svg
        width={size}
        height={size}
        role="img"
        aria-label={`${T.services.title}. ${t.keyboardHint}.`}
        className={cn(svgFocus, "shrink-0 rounded-full")}
        {...keyNav(items.length, active, setActive)}
      >
        {slices.map((s, i) => (
          <path
            key={s.name}
            d={arc(c, c, active === i ? R + 3 : R, r, s.a0, s.a1)}
            fill={SERVICE_COLORS[s.slot]}
            stroke="#fff"
            strokeWidth={2}
            onPointerEnter={() => setActive(i)}
          />
        ))}
        <text x={c} y={c - 4} textAnchor="middle" fontSize={15} fontWeight={600} fill={TITLE}>
          {f.num(total)}
        </text>
        <text x={c} y={c + 12} textAnchor="middle" fontSize={10} fill={AXIS_TEXT}>
          {T.unit}
        </text>
      </svg>

      {/* Legend doubles as direct labels: name + share, identity never colour-only. */}
      <ul className="min-w-0 flex-1 space-y-1.5 text-[0.72rem]">
        {slices.map((s, i) => (
          <li
            key={s.name}
            onPointerEnter={() => setActive(i)}
            className={cn("flex items-start gap-2 rounded px-1 py-0.5 transition-colors", active === i && "bg-[#f3f4f7]")}
          >
            <span aria-hidden="true" className="mt-1 block size-2.5 shrink-0 rounded-[2px]" style={{ background: SERVICE_COLORS[s.slot] }} />
            <span className="min-w-0 leading-tight">
              <span className="block" style={{ color: active === i ? TITLE : AXIS_TEXT }}>
                {s.name}
              </span>
              <span className="block font-semibold tabular-nums text-ink">{f.pct((s.value / total) * 100)}</span>
            </span>
          </li>
        ))}
      </ul>

      {active !== null && w > 0 && (
        <Tooltip x={c + (R * 0.8) * Math.cos(slices[active].mid)} y={c + (R * 0.8) * Math.sin(slices[active].mid) + (height - size) / 2} width={w}>
          <p className="mb-1 font-medium text-ink">{slices[active].name}</p>
          <TipRow
            color={SERVICE_COLORS[slices[active].slot]}
            value={hours(slices[active].value)}
            label={`${f.pct((slices[active].value / total) * 100)} ${T.services.share}`}
          />
        </Tooltip>
      )}
    </div>
  )
}

/* ── dashboard ───────────────────────────────────────────────────────── */

export function WorktimeDashboard() {
  const { t, f } = useDemo()
  const T = t.worktime
  const { hours, signedHours } = useHours()
  const months = monthLabels(useToday(), f)
  const kpis = [
    { label: T.kpis.hours, value: hours(D.total) },
    { label: T.kpis.billable, value: hours(D.billableTotal) },
    { label: T.kpis.utilization, value: f.pct((D.billableTotal / D.total) * 100) },
    { label: T.kpis.overtime, value: signedHours(D.total - D.target) },
  ]
  const shareTip = (share: string) => (it: { name: string; value: number }) => (
    <>
      <p className="mb-1 font-medium text-ink">{it.name}</p>
      <TipRow color={SERIES} value={hours(it.value)} label={`${f.pct((it.value / D.total) * 100)} ${share}`} />
    </>
  )

  return (
    <DashboardShell title={T.title}>
      <div className="mb-3 grid grid-cols-2 gap-3 sm:mb-4 sm:gap-4 lg:grid-cols-4">
        {kpis.map((k) => (
          <KpiTile key={k.label} {...k} />
        ))}
      </div>

      <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
        <Card
          title={T.monthly.title}
          className="lg:col-span-2"
          legend={
            <>
              <LineLegend color={LIGHT}>{T.monthly.hours}</LineLegend>
              <LineLegend color={PREV}>{T.monthly.billable}</LineLegend>
            </>
          }
        >
          <LineChart
            labels={months}
            series={[
              { name: T.monthly.hours, values: D.hours, color: LIGHT, dots: true },
              { name: T.monthly.billable, values: D.billable, color: PREV, dots: true },
            ]}
            label={`${T.monthly.title}. ${t.keyboardHint}.`}
            format={hours}
            tickFormat={(n) => f.num(n)}
          />
        </Card>

        <Card title={T.services.title} className="hidden md:block">
          <ServiceDonut height={194} />
        </Card>
      </div>

      <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-4 md:grid-cols-2">
        <Card title={T.employees.title}>
          <HBars
            items={D.employees}
            height={160}
            labelWidth={104}
            tickFormat={(n) => f.num(n)}
            label={`${T.employees.title}. ${t.keyboardHint}.`}
            tooltip={shareTip(T.employees.share)}
          />
        </Card>
        <Card title={T.projects.title} className="hidden md:block">
          <HBars
            items={D.projects.map((p) => ({ name: t.projectNames[p.key], value: p.value }))}
            height={160}
            labelWidth={140}
            tickFormat={(n) => f.num(n)}
            label={`${T.projects.title}. ${t.keyboardHint}.`}
            tooltip={shareTip(T.projects.share)}
          />
        </Card>
      </div>
    </DashboardShell>
  )
}
