import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

export const dynamic = "force-static"

// AI / generative-search crawlers. Already covered by the `*` rule, but listed
// explicitly so the intent to be reachable by AI search is documented and robust
// against future `*` tightening. Names per each vendor's published docs.
const AI_CRAWLERS = [
  "OAI-SearchBot", // OpenAI — ChatGPT search results
  "GPTBot", // OpenAI — model training crawler
  "ChatGPT-User", // OpenAI — live user-triggered fetches
  "OAI-Bot", // OpenAI — operator/agent fetches
  "PerplexityBot", // Perplexity — search index
  "Perplexity-User", // Perplexity — live user-triggered fetches
  "ClaudeBot", // Anthropic — crawler
  "Claude-User", // Anthropic — live user-triggered fetches
  "Claude-SearchBot", // Anthropic — search results
  "Google-Extended", // Google — Gemini / AI Overviews opt-in
  "Applebot-Extended", // Apple — Apple Intelligence opt-in
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
