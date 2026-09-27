"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { Icon } from "@/components/icons"
import type { Dictionary } from "@/lib/dictionary"
import { cn } from "@/lib/utils"

/*
 * Animated automation example, in the spirit of a workflow builder:
 * trigger → fetch → condition → one of two branches → notification.
 *
 * Phases: 0 idle, 1–5 = node n running, 6 = all done (hold), then it
 * restarts with the other branch. Runs only while visible; with
 * prefers-reduced-motion it shows the finished state. The graphic is
 * aria-hidden — screen readers get `srSummary` instead.
 */

type Flow = Dictionary["home"]["automations"]["flow"]
type Branch = "a" | "b"
type Status = "wait" | "run" | "done" | "skip"

const START_MS = 600
const STEP_MS = 1150
const HOLD_MS = 2600
const DONE = 6
const GAP = "0.75rem" // must match gap-3 between the branch nodes

function useFlowPhase(ref: React.RefObject<HTMLElement | null>) {
  const [phase, setPhase] = React.useState(0)
  const [branch, setBranch] = React.useState<Branch>("a")
  const [visible, setVisible] = React.useState(false)
  const [reduced, setReduced] = React.useState(false)

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [ref])

  React.useEffect(() => {
    if (reduced || !visible) return
    const delay = phase === 0 ? START_MS : phase === DONE ? HOLD_MS : STEP_MS
    const t = window.setTimeout(() => {
      if (phase === DONE) {
        setPhase(0)
        setBranch((b) => (b === "a" ? "b" : "a"))
      } else {
        setPhase((p) => p + 1)
      }
    }, delay)
    return () => window.clearTimeout(t)
  }, [phase, visible, reduced])

  return reduced ? { phase: DONE, branch: "a" as Branch } : { phase, branch }
}

function statusOf(step: number, phase: number): Status {
  if (phase < step) return "wait"
  if (phase === step) return "run"
  return "done"
}

/* ── Connector segment ─────────────────────────────────────────────── */

type SegProps = {
  style: React.CSSProperties
  axis: "x" | "y"
  /** Which end the fill starts from. */
  from: "start" | "end"
  filled: boolean
  dim?: boolean
  delay?: number
}

function Seg({ style, axis, from, filled, dim, delay = 0 }: SegProps) {
  const x = axis === "x"
  return (
    <span
      className={cn(
        "absolute rounded-full bg-line transition-opacity duration-500",
        x ? "h-0.5 -translate-y-1/2" : "w-0.5 -translate-x-1/2",
        dim && "opacity-40",
      )}
      style={style}
    >
      <span
        className={cn(
          "absolute inset-0 rounded-full bg-brand transition-transform duration-500 ease-out",
          x ? (from === "start" ? "origin-left" : "origin-right") : from === "start" ? "origin-top" : "origin-bottom",
          filled ? (x ? "scale-x-100" : "scale-y-100") : x ? "scale-x-0" : "scale-y-0",
        )}
        style={{ transitionDelay: filled ? `${delay}ms` : "0ms" }}
      />
      {filled && (
        <span
          className={cn(
            "absolute size-2 rounded-full bg-brand shadow-[0_0_10px_3px_rgba(33,86,156,0.45)]",
            x ? "top-1/2 -translate-x-1/2 -translate-y-1/2" : "left-1/2 -translate-x-1/2 -translate-y-1/2",
          )}
          style={{
            animation: `travel-${axis}${from === "end" ? "-rev" : ""} 500ms ease-out ${delay}ms both`,
          }}
        />
      )}
    </span>
  )
}

/** Straight connector between two nodes. */
function Line({ dir, filled }: { dir: "h" | "v"; filled: boolean }) {
  return (
    <div className={cn("relative shrink-0", dir === "h" ? "w-5 self-stretch" : "h-6")}>
      <Seg
        axis={dir === "h" ? "x" : "y"}
        from="start"
        filled={filled}
        style={dir === "h" ? { left: 0, right: 0, top: "50%" } : { top: 0, bottom: 0, left: "50%" }}
      />
    </div>
  )
}

/* ── Fork / merge between one node and the two branch nodes ────────── */

type SegDef = {
  style: React.CSSProperties
  axis: "x" | "y"
  from: "start" | "end"
  branch: Branch | null
  order: number
}

// Centre of the first / second branch node along the cross axis.
const A = `calc((100% - ${GAP}) / 4)`
const B = `calc(100% - (100% - ${GAP}) / 4)`

// Geometry is written for the horizontal layout; the vertical one swaps axes.
const SPLIT: SegDef[] = [
  { style: { left: 0, right: "50%", top: "50%" }, axis: "x", from: "start", branch: null, order: 0 },
  { style: { left: "50%", top: A, bottom: "50%" }, axis: "y", from: "end", branch: "a", order: 1 },
  { style: { left: "50%", top: "50%", bottom: A }, axis: "y", from: "start", branch: "b", order: 1 },
  { style: { left: "50%", right: 0, top: A }, axis: "x", from: "start", branch: "a", order: 2 },
  { style: { left: "50%", right: 0, top: B }, axis: "x", from: "start", branch: "b", order: 2 },
]
const MERGE: SegDef[] = [
  { style: { left: 0, right: "50%", top: A }, axis: "x", from: "start", branch: "a", order: 0 },
  { style: { left: 0, right: "50%", top: B }, axis: "x", from: "start", branch: "b", order: 0 },
  { style: { left: "50%", top: A, bottom: "50%" }, axis: "y", from: "start", branch: "a", order: 1 },
  { style: { left: "50%", top: "50%", bottom: A }, axis: "y", from: "end", branch: "b", order: 1 },
  { style: { left: "50%", right: 0, top: "50%" }, axis: "x", from: "start", branch: null, order: 2 },
]

const SWAP: Record<string, string> = { left: "top", right: "bottom", top: "left", bottom: "right" }

function Junction({
  kind,
  dir,
  active,
  decided,
  branch,
}: {
  kind: "split" | "merge"
  dir: "h" | "v"
  active: boolean
  decided: boolean
  branch: Branch
}) {
  const defs = kind === "split" ? SPLIT : MERGE
  return (
    <div className={cn("relative shrink-0", dir === "h" ? "w-8 self-stretch" : "h-8")}>
      {defs.map((d, i) => {
        const style =
          dir === "h"
            ? d.style
            : Object.fromEntries(Object.entries(d.style).map(([k, v]) => [SWAP[k], v]))
        const axis = dir === "h" ? d.axis : d.axis === "x" ? "y" : "x"
        const onPath = d.branch === null || d.branch === branch
        return (
          <Seg
            key={i}
            style={style}
            axis={axis}
            from={d.from}
            filled={active && onPath}
            dim={decided && !onPath}
            delay={d.order * 170}
          />
        )
      })}
    </div>
  )
}

/* ── Node ──────────────────────────────────────────────────────────── */

type NodeData = { kind: string; title: string; icon: string; label?: string }

function StatusIcon({ status }: { status: Status }) {
  if (status === "run")
    return <span className="block size-4 shrink-0 animate-spin rounded-full border-2 border-brand/20 border-t-brand" />
  if (status === "done")
    return (
      <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-success text-white animate-in zoom-in-50 duration-300">
        <Check className="size-2.5" strokeWidth={3.5} />
      </span>
    )
  return <span className={cn("block size-4 shrink-0 rounded-full border-2 border-line", status === "skip" && "border-dashed")} />
}

function Node({ data, status }: { data: NodeData; status: Status }) {
  const lit = status === "run" || status === "done"
  return (
    <div
      className={cn(
        "relative flex min-w-0 flex-1 items-center gap-2.5 rounded-tile border bg-white p-3 transition-all duration-500",
        status === "run" ? "border-brand/50 shadow-[0_0_0_4px_rgba(33,86,156,0.12)]" : "border-line",
        status === "skip" && "border-dashed opacity-45",
      )}
    >
      {data.label && (
        <span
          className={cn(
            "absolute -top-2.5 left-3 rounded-full border bg-white px-2 py-px text-[0.62rem] font-semibold uppercase tracking-wider transition-colors duration-500",
            lit ? "border-brand/40 text-brand" : "border-line text-ink-muted",
          )}
        >
          {data.label}
        </span>
      )}
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-[0.55rem] transition-colors duration-500 [&_svg]:size-4",
          lit ? "bg-brand text-white" : "bg-sand text-ink-muted",
          // Branch nodes sit side by side on phones — drop the icon there to give the text room.
          data.label && "max-sm:hidden",
        )}
      >
        <Icon name={data.icon} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <span className="truncate text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">{data.kind}</span>
          <StatusIcon status={status} />
        </span>
        <span className="mt-0.5 block text-[0.8rem] font-medium leading-snug text-ink">{data.title}</span>
      </span>
    </div>
  )
}

/* ── Diagram ───────────────────────────────────────────────────────── */

export function AutomationFlow({ flow }: { flow: Flow }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { phase, branch } = useFlowPhase(ref)

  const s = {
    trigger: statusOf(1, phase),
    fetch: statusOf(2, phase),
    condition: statusOf(3, phase),
    action: statusOf(4, phase),
    notify: statusOf(5, phase),
  }
  const decided = phase >= 4
  const branchStatus = (b: Branch): Status => (b === branch ? s.action : decided ? "skip" : "wait")

  const branchA = <Node data={flow.branchA} status={branchStatus("a")} />
  const branchB = <Node data={flow.branchB} status={branchStatus("b")} />

  return (
    <div ref={ref} className="rounded-card bg-white p-5 shadow-card sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">{flow.label}</p>
        <span className="inline-flex items-center gap-2 rounded-full bg-sand px-3 py-1 text-xs font-medium text-ink-muted" aria-hidden="true">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-success/60 motion-reduce:animate-none" />
            <span className="relative size-2 rounded-full bg-success" />
          </span>
          {flow.live}
        </span>
      </div>

      <p className="sr-only">{flow.srSummary}</p>

      {/* Desktop: left to right */}
      <div aria-hidden="true" className="hidden items-center lg:flex">
        <Node data={flow.trigger} status={s.trigger} />
        <Line dir="h" filled={phase >= 2} />
        <Node data={flow.fetch} status={s.fetch} />
        <Line dir="h" filled={phase >= 3} />
        <Node data={flow.condition} status={s.condition} />
        <Junction kind="split" dir="h" active={phase >= 4} decided={decided} branch={branch} />
        <div className="grid min-w-0 flex-[1.2] grid-rows-2 gap-3">
          {branchA}
          {branchB}
        </div>
        <Junction kind="merge" dir="h" active={phase >= 5} decided={decided} branch={branch} />
        <Node data={flow.notify} status={s.notify} />
      </div>

      {/* Mobile & tablet: top to bottom */}
      <div aria-hidden="true" className="mx-auto flex max-w-md flex-col lg:hidden">
        <Node data={flow.trigger} status={s.trigger} />
        <Line dir="v" filled={phase >= 2} />
        <Node data={flow.fetch} status={s.fetch} />
        <Line dir="v" filled={phase >= 3} />
        <Node data={flow.condition} status={s.condition} />
        <Junction kind="split" dir="v" active={phase >= 4} decided={decided} branch={branch} />
        <div className="grid grid-cols-2 gap-3">
          {branchA}
          {branchB}
        </div>
        <Junction kind="merge" dir="v" active={phase >= 5} decided={decided} branch={branch} />
        <Node data={flow.notify} status={s.notify} />
      </div>
    </div>
  )
}
