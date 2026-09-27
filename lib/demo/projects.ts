/**
 * Fiktive Beispieldaten für das interaktive Projekte-Dashboard im Abschnitt
 * «Verbinden & sofort sehen». Keine echten Projekte oder Zahlen.
 * Projekte und Personen passen zum Arbeitszeiten-Dashboard.
 */

import type { Dictionary } from "@/lib/dictionary"

export type ProjectKey = keyof Dictionary["demo"]["projectNames"]

export type ProjectStatus = "done" | "active" | "planned"

export type Project = {
  key: ProjectKey
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
  { key: "maintenance", lead: "Luca Bernasconi", start: "2026-01-05", end: "2026-12-31", status: "active", progress: 73, budget: 64000, invoiced: 45900 },
  { key: "oldTown", lead: "Marco Frei", start: "2026-01-12", end: "2026-08-28", status: "done", progress: 100, budget: 185000, invoiced: 196300 },
  { key: "seeblick", lead: "Anna Keller", start: "2026-02-03", end: "2026-12-18", status: "active", progress: 68, budget: 420000, invoiced: 286400 },
  { key: "officeRhein", lead: "Sandra Huber", start: "2026-04-01", end: "2026-07-30", status: "done", progress: 100, budget: 96000, invoiced: 88700 },
  { key: "lindenhof", lead: "Sandra Huber", start: "2026-06-15", end: "2026-11-13", status: "active", progress: 55, budget: 138000, invoiced: 71200 },
  { key: "facadeNord", lead: "Anna Keller", start: "2026-10-12", end: "2026-12-19", status: "planned", progress: 0, budget: 152000, invoiced: 0 },
]

/**
 * Zeitachse des Gantt-Charts. Wie alle Projektdaten relativ zum Referenzdatum
 * (lib/demo/clock.ts) erfasst; im Browser wird alles auf heute verschoben.
 */
export const TIMELINE = { start: "2026-01-01", end: "2026-12-31" }

