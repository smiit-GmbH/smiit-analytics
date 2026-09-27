import type React from "react"
import { SITE } from "@/lib/site"

/** Minimal root layout for "/", which only forwards to a language (see page.tsx). */
export default function RedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-CH">
      <body style={{ margin: 0, minHeight: "100vh", background: "#f3f3ee", color: SITE.themeColor }}>{children}</body>
    </html>
  )
}
