import { LegalPage } from "@/components/legal-page"
import { getContent } from "@/content"
import { pageMetadata } from "@/lib/seo"

const t = getContent().legal.datenschutz

export const metadata = pageMetadata({ title: t.title, description: t.description, path: "/datenschutz/" })

export default function DatenschutzPage() {
  return <LegalPage title={t.title} body={t.body} />
}
