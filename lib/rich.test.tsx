import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import { plain, rich, withLinks } from "@/lib/rich"

const html = (node: React.ReactNode) => renderToStaticMarkup(<>{node}</>)

describe("rich", () => {
  it("returns plain strings untouched", () => {
    expect(rich("No highlight")).toBe("No highlight")
  })

  it("renders *word* as a highlight", () => {
    expect(html(rich("Reports *in seconds* for bexio"))).toBe('Reports <span class="hl text-brand">in seconds</span> for bexio')
  })
})

describe("withLinks", () => {
  it("renders known keys as links and unknown keys as plain text", () => {
    const out = html(withLinks("See [[privacy|our policy]] and [[unknown|this]].", { privacy: "/de/privacy/" }))
    expect(out).toBe('See <a href="/de/privacy/">our policy</a> and this.')
  })

  it("handles adjacent links", () => {
    const out = html(withLinks("[[a|A]][[b|B]]", { a: "/a/", b: "/b/" }))
    expect(out).toBe('<a href="/a/">A</a><a href="/b/">B</a>')
  })
})

describe("plain", () => {
  it("strips highlight and link markers", () => {
    expect(plain("*Fast* reports, see [[terms|the terms]]")).toBe("Fast reports, see the terms")
  })
})
