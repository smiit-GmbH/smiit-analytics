import { LegalPage } from "@/components/legal-page"
import { getContent } from "@/content"
import { pageMetadata } from "@/lib/seo"

const t = getContent().legal.avv

// Soft hyphens only help the on-page heading wrap; keep them out of <title>.
export const metadata = pageMetadata({ title: t.title.replace(/\u00AD/g, ""), description: t.description, path: "/avv/" })

export default function AvvPage() {
  return <LegalPage title={t.title} body={t.body} />
}
