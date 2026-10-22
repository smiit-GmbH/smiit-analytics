import { describe, expect, it } from "vitest"
import { defaultLocale, getDictionary, locales } from "@/lib/dictionary"

/*
 * TypeScript already guarantees every language has the same keys as German.
 * These tests cover what the types cannot: the markers inside the strings and
 * the length of lists.
 */

type Leaf = { path: string; value: string }

function leaves(node: unknown, path = ""): Leaf[] {
  if (typeof node === "string") return [{ path, value: node }]
  if (Array.isArray(node)) return node.flatMap((v, i) => leaves(v, `${path}[${i}]`))
  if (node && typeof node === "object") return Object.entries(node).flatMap(([k, v]) => leaves(v, path ? `${path}.${k}` : k))
  return []
}

/** `{name}` values filled in by the code, `[[key|` link keys and the number of `*highlights*`. */
function markers(text: string) {
  return {
    placeholders: [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort(),
    links: [...text.matchAll(/\[\[(\w+)\|/g)].map((m) => m[1]).sort(),
    highlights: [...text.matchAll(/\*[^*]+\*/g)].length,
  }
}

const reference = leaves(getDictionary(defaultLocale))

describe.each(locales.filter((l) => l !== defaultLocale))("dictionary %s", (lang) => {
  const translated = new Map(leaves(getDictionary(lang)).map((l) => [l.path, l.value]))

  it("has every list entry German has (same list lengths)", () => {
    const missing = reference.filter((l) => !translated.has(l.path)).map((l) => l.path)
    expect(missing).toEqual([])
  })

  it("keeps the placeholders, link keys and highlights of every text", () => {
    const differing = reference
      .filter((l) => JSON.stringify(markers(translated.get(l.path) ?? "")) !== JSON.stringify(markers(l.value)))
      .map((l) => ({ path: l.path, de: l.value, [lang]: translated.get(l.path) }))
    expect(differing).toEqual([])
  })

  it("has no empty texts", () => {
    // Not trimmed: a space is a valid value (e.g. the French thousands separator).
    expect([...translated].filter(([, v]) => v === "").map(([p]) => p)).toEqual([])
  })
})
