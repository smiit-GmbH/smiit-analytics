import { LegalPage } from "@/components/legal-page"
import { getContent } from "@/content"
import { pageMetadata } from "@/lib/seo"

const t = getContent().legal.impressum

export const metadata = pageMetadata({ title: t.title, description: t.description, path: "/impressum/" })

export default function ImpressumPage() {
  return <LegalPage title={t.title} body={t.body} />
}
