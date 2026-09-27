/**
 * Fiktive Beispieldaten für das interaktive Arbeitszeiten-Dashboard im
 * Abschnitt «Verbinden & sofort sehen». Monatswerte = die letzten 12 abgeschlossenen
 * Monate (ältester zuerst); die Monatsnamen berechnet der Browser relativ zu heute. Keine echten Personen oder Zahlen.
 *
 * In sich stimmig (12 Monate, 8’834 Std.): Mitarbeitende, Projekte und
 * Leistungen ergeben je die Gesamtstunden; alle Projekte ausser «Intern»
 * ergeben die verrechenbaren Stunden (6’813 Std.).
 */

import type { Dictionary } from "@/lib/dictionary"
import type { ProjectKey } from "./projects"

export type ServiceKey = keyof Dictionary["demo"]["worktime"]["services"]["names"]

const sum = (a: number[]) => a.reduce((s, v) => s + v, 0)

const HOURS = [742, 768, 781, 612, 736, 758, 790, 744, 781, 752, 648, 722]
const BILLABLE = [571, 598, 612, 452, 559, 589, 621, 577, 609, 583, 486, 556]

export const WORKTIME = {
  hours: HOURS,
  billable: BILLABLE,
  total: sum(HOURS),
  billableTotal: sum(BILLABLE),
  /** Sollstunden im Zeitraum (für Über-/Unterstunden). */
  target: 8700,
  /** Farbe je Leistung ist fest (slot), unabhängig von der Reihenfolge. */
  services: [
    { key: "execution", value: 4418, slot: 0 },
    { key: "administration", value: 2021, slot: 1 },
    { key: "planning", value: 1943, slot: 2 },
    { key: "consulting", value: 452, slot: 3 },
  ] as { key: ServiceKey; value: number; slot: number }[],
  employees: [
    { name: "Anna Keller", value: 1962 },
    { name: "Marco Frei", value: 1874 },
    { name: "Sandra Huber", value: 1808 },
    { name: "Luca Bernasconi", value: 1746 },
    { name: "Nina Schmid", value: 1444 },
  ],
  projects: [
    { key: "seeblick", value: 2140 },
    { key: "internal", value: 2021 },
    { key: "oldTown", value: 1685 },
    { key: "maintenance", value: 1320 },
    { key: "officeRhein", value: 1012 },
    { key: "smallJobs", value: 656 },
  ] as { key: ProjectKey; value: number }[],
}

