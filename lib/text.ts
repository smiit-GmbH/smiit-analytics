/**
 * Fills `{name}` placeholders in content strings: fill("ab {price} CHF", { price: 49 }).
 * Every occurrence is replaced; placeholders without a value stay visible, so
 * a missing value is noticed instead of silently rendering nothing.
 */
export function fill(text: string, values: Readonly<Record<string, string | number>>): string {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match))
}
