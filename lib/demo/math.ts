/** Sum of a list of numbers (0 for an empty list). */
export const sum = (values: readonly number[]) => values.reduce((s, v) => s + v, 0)

/** Sum of one numeric field of a list: sumBy(accounts, (a) => a.value). */
export const sumBy = <T>(items: readonly T[], value: (item: T) => number) => sum(items.map(value))
