"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { DEMO_CANVAS } from "./demo-context"

/*
 * The demo dashboards are the heaviest part of the home page (SVG charts,
 * demo data, interaction code). They are not part of the initial page: each
 * one is its own chunk, loaded once the reports section comes near the
 * viewport. That keeps them out of the first load and out of hydration,
 * which is what blocked the main thread on phones.
 */

const loaders = {
  sales: () => import("./sales-dashboard").then((m) => m.SalesDashboard),
  balance: () => import("./balance-dashboard").then((m) => m.BalanceDashboard),
  worktime: () => import("./worktime-dashboard").then((m) => m.WorktimeDashboard),
  projects: () => import("./projects-dashboard").then((m) => m.ProjectsDashboard),
  cashflow: () => import("./cashflow-dashboard").then((m) => m.CashflowDashboard),
}

export type DashboardName = keyof typeof loaders

const DASHBOARDS = Object.fromEntries(
  Object.entries(loaders).map(([name, load]) => [name, dynamic(load, { ssr: false, loading: () => <Placeholder /> })]),
) as Record<DashboardName, React.ComponentType>

/** Start loading this far before the section scrolls into view, so it is usually ready on arrival. */
const PRELOAD_MARGIN = "600px"

/**
 * Skeleton with the exact height of the first tab's dashboard (sales) at each
 * breakpoint, so nothing below moves when it arrives. Checked by an e2e test
 * (e2e/dashboards.spec.ts) – update the heights there if the dashboard layout changes.
 * Shown both before the section is near and while a chunk loads; tests wait for
 * `data-dashboard-placeholder` to disappear.
 */
function Placeholder() {
  return (
    <div
      aria-hidden="true"
      data-dashboard-placeholder=""
      className="h-[753px] overflow-hidden p-3 sm:h-[768px] sm:p-4 md:h-[1034px] lg:h-[674px]"
      style={{ background: DEMO_CANVAS }}
    >
      <div className="mb-4 h-7 w-40 rounded-md bg-black/5" />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="h-[5.6rem] rounded-lg bg-white" />
        ))}
      </div>
      <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-4 lg:grid-cols-3">
        <div className="h-[15.5rem] rounded-lg bg-white lg:col-span-2" />
        <div className="hidden h-[15.5rem] rounded-lg bg-white md:block" />
      </div>
      <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-4 md:grid-cols-2">
        <div className="h-[14.5rem] rounded-lg bg-white" />
        <div className="hidden h-[14.5rem] rounded-lg bg-white md:block" />
      </div>
      <div className="mt-2 h-4" />
    </div>
  )
}

/** Renders a demo dashboard once it is near the viewport; until then a placeholder of the same size. */
export function LazyDashboard({ name }: { name: DashboardName }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [near, setNear] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el || near) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setNear(true)
        // The visitor is about to see the reports: fetch the other tabs' chunks too, so switching is instant.
        Object.values(loaders).forEach((load) => void load())
      },
      { rootMargin: PRELOAD_MARGIN },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [near])

  const Dashboard = DASHBOARDS[name]
  return <div ref={ref}>{near ? <Dashboard /> : <Placeholder />}</div>
}
