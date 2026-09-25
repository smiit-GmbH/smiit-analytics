/**
 * Fiktive Beispieldaten für das interaktive Arbeitszeiten-Dashboard im
 * Abschnitt «Verbinden & sofort sehen». Monatswerte = die letzten 12 abgeschlossenen
 * Monate (ältester zuerst); die Monatsnamen berechnet der Browser relativ zu heute. Keine echten Personen oder Zahlen.
 *
 * In sich stimmig (12 Monate, 8’834 Std.): Mitarbeitende, Projekte und
 * Leistungen ergeben je die Gesamtstunden; alle Projekte ausser «Intern»
 * ergeben die verrechenbaren Stunden (6’813 Std.).
 */

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
    { name: "Ausführung", value: 4418, slot: 0 },
    { name: "Administration", value: 2021, slot: 1 },
    { name: "Planung", value: 1943, slot: 2 },
    { name: "Beratung", value: 452, slot: 3 },
  ],
  employees: [
    { name: "Anna Keller", value: 1962 },
    { name: "Marco Frei", value: 1874 },
    { name: "Sandra Huber", value: 1808 },
    { name: "Luca Bernasconi", value: 1746 },
    { name: "Nina Schmid", value: 1444 },
  ],
  projects: [
    { name: "Neubau Seeblick", value: 2140 },
    { name: "Intern", value: 2021 },
    { name: "Sanierung Altstadthaus", value: 1685 },
    { name: "Wartung Kunden", value: 1320 },
    { name: "Innenausbau Büro Rhein", value: 1012 },
    { name: "Kleinaufträge", value: 656 },
  ],
}

/** UI-Texte des Dashboards. */
export const WORKTIME_TEXT = {
  title: "Arbeitszeiten",
  asOf: "25.09.2026 15:06",
  demoNote: "Beispieldaten",
  unit: "Std.",
  kpis: {
    hours: "Stunden",
    billable: "Verrechenbare Stunden",
    utilization: "Auslastung",
    overtime: "Über-/Unterstunden",
  },
  monthly: { title: "Stunden je Monat", hours: "Stunden", billable: "Verrechenbare Stunden" },
  services: { title: "Stunden je Leistung", share: "der Stunden" },
  employees: { title: "Stunden je Mitarbeitende", share: "der Stunden" },
  projects: { title: "Stunden je Projekt", share: "der Stunden" },
  keyboardHint: "Mit Pfeiltasten durch die Werte navigieren",
}
