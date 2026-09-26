import { LegalPage } from "@/components/legal-page"
import { getContent } from "@/content"
import { pageMetadata } from "@/lib/seo"

const t = getContent().legal.nutzungsbedingungen

export const metadata = pageMetadata({ title: t.title, description: t.description, path: "/nutzungsbedingungen/" })

export default function NutzungsbedingungenPage() {
  return <LegalPage title={t.title} body={t.body} />
}
