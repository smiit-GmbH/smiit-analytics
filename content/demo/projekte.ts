/**
 * Fiktive Beispieldaten für das interaktive Projekte-Dashboard im Abschnitt
 * «Verbinden & sofort sehen». Keine echten Projekte oder Zahlen.
 * Projekt- und Personennamen passen zum Arbeitszeiten-Dashboard.
 */

export type ProjectStatus = "done" | "active" | "planned"

export type Project = {
  name: string
  lead: string
  /** ISO-Datum (JJJJ-MM-TT). */
  start: string
  end: string
  status: ProjectStatus
  /** Fortschritt in Prozent (nur für aktive Projekte relevant). */
  progress: number
  budget: number
  invoiced: number
}

export const PROJECTS: Project[] = [
  { name: "Wartung Kunden", lead: "Luca Bernasconi", start: "2026-01-05", end: "2026-12-31", status: "active", progress: 73, budget: 64000, invoiced: 45900 },
  { name: "Sanierung Altstadthaus", lead: "Marco Frei", start: "2026-01-12", end: "2026-08-28", status: "done", progress: 100, budget: 185000, invoiced: 196300 },
  { name: "Neubau Seeblick", lead: "Anna Keller", start: "2026-02-03", end: "2026-12-18", status: "active", progress: 68, budget: 420000, invoiced: 286400 },
  { name: "Innenausbau Büro Rhein", lead: "Sandra Huber", start: "2026-04-01", end: "2026-07-30", status: "done", progress: 100, budget: 96000, invoiced: 88700 },
  { name: "Umbau Praxis Lindenhof", lead: "Sandra Huber", start: "2026-06-15", end: "2026-11-13", status: "active", progress: 55, budget: 138000, invoiced: 71200 },
  { name: "Fassade Gewerbehaus Nord", lead: "Anna Keller", start: "2026-10-12", end: "2026-12-19", status: "planned", progress: 0, budget: 152000, invoiced: 0 },
]

/**
 * Zeitachse des Gantt-Charts. Wie alle Projektdaten relativ zum Referenzdatum
 * (content/demo/common.ts) erfasst; im Browser wird alles auf heute verschoben.
 */
export const TIMELINE = { start: "2026-01-01", end: "2026-12-31" }

/** UI-Texte des Dashboards. */
export const PROJECTS_TEXT = {
  title: "Projekte",
  asOf: "25.09.2026 15:06",
  demoNote: "Beispieldaten",
  kpis: {
    projects: "Projekte",
    active: "Aktive Projekte",
    budget: "Projektbudget",
    open: "Offenes Budget",
  },
  gantt: {
    title: "Projekte im Zeitverlauf",
    today: "Heute",
    status: { done: "Abgeschlossen", active: "Aktiv", planned: "Geplant" } as Record<ProjectStatus, string>,
    progress: "Fortschritt",
    lead: "Projektleitung",
  },
  scatter: {
    title: "Budget vs. Fakturiert je Projekt",
    x: "Projektbudget",
    y: "Fakturiert",
    reference: "100 % Budget",
  },
  utilization: {
    title: "Budgetausschöpfung je Projekt",
    over: "über Budget",
    budget: "Budget",
    invoiced: "Fakturiert",
  },
  keyboardHint: "Mit Pfeiltasten durch die Werte navigieren",
}
