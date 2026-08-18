import type { Metadata } from "next"
import type { Locale } from "@/lib/dictionary"
import { buildPageMetadata } from "@/lib/seo"
import { LegalHero } from "@/components/pages/legal/legal-hero"
import { LegalSections, type LegalSection } from "@/components/pages/legal/legal-sections"

export async function generateStaticParams() {
  return [{ lang: "de" }, { lang: "en" }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const { lang } = await params
  return buildPageMetadata({
    lang,
    path: "terms",
    title: {
      de: "smiit Analytics – Allgemeine Geschäftsbedingungen (AGB)",
      en: "smiit Analytics – Terms of Service",
    },
    description: {
      de: "Allgemeine Geschäftsbedingungen für smiit Analytics: Vertragsgegenstand, Testphase, Preise, Nutzungsrechte, Verfügbarkeit, Gewährleistung, Haftung und Laufzeit.",
      en: "Terms of service for smiit Analytics: scope, trial period, pricing, licence, availability, warranty, liability and contract term.",
    },
  })
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isDe = lang === "de"

  const email = "kontakt@smiit.de"
  const phone = "+49 160 4073198"

  const L: { title: string; subtitle: string; lastUpdated: string; sections: LegalSection[] } = isDe
    ? {
        title: "Allgemeine Geschäftsbedingungen",
        subtitle: "Bedingungen für die Nutzung von smiit Analytics",
        lastUpdated: "Stand: August 2026",
        sections: [
          {
            title: "1. Geltungsbereich und Anbieter",
            paragraphs: [
              "Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge über die Bereitstellung und Nutzung der Datenanalyse-Plattform smiit Analytics zwischen der smiit GmbH, Reiherweg 96, 89584 Ehingen, Deutschland (nachfolgend „Anbieter“) und ihren Kunden.",
              `E-Mail: ${email}`,
              `Telefon: ${phone}`,
              "Die Angebote des Anbieters richten sich ausschließlich an Unternehmer im Sinne des § 14 BGB, juristische Personen des öffentlichen Rechts sowie öffentlich-rechtliche Sondervermögen. Verbraucher im Sinne des § 13 BGB sind ausgeschlossen.",
              "Abweichende, entgegenstehende oder ergänzende Geschäftsbedingungen des Kunden werden nicht Vertragsbestandteil, es sei denn, der Anbieter stimmt ihrer Geltung ausdrücklich in Textform zu.",
            ],
          },
          {
            title: "2. Vertragsgegenstand",
            paragraphs: [
              "Der Anbieter stellt dem Kunden smiit Analytics zur Verfügung — eine Datenanalyse-Plattform, die Daten aus den vom Kunden freigegebenen Quellsystemen in einem Datenmodell zusammenführt und in Form von Dashboards, Auswertungen und KI-gestützten Analysefunktionen bereitstellt.",
              "Der konkrete Leistungsumfang ergibt sich aus der jeweiligen Leistungsbeschreibung, dem Angebot und der gewählten Paketvariante. Die auf dieser Website dargestellten Inhalte sind unverbindliche Beschreibungen und kein rechtsverbindliches Angebot.",
              "Der Anbieter ist berechtigt, die Plattform weiterzuentwickeln und zu aktualisieren. Wesentliche Funktionen bleiben dabei erhalten; Änderungen, die den vereinbarten Leistungsumfang nicht unerheblich einschränken, bedürfen der Zustimmung des Kunden.",
            ],
          },
          {
            title: "3. Vertragsschluss",
            paragraphs: [
              "Anfragen über das Kontaktformular, per E-Mail oder über eine Terminvereinbarung stellen kein Angebot im Rechtssinne dar.",
              "Ein Vertrag kommt zustande, wenn der Kunde ein Angebot des Anbieters in Textform annimmt oder der Anbieter eine Bestellung des Kunden in Textform bestätigt.",
            ],
          },
          {
            title: "4. Testphase",
            paragraphs: [
              "Soweit angeboten, kann der Kunde smiit Analytics für einen Zeitraum von 30 Tagen unentgeltlich testen. Die Testphase beginnt mit der Bereitstellung des Zugangs.",
              "Während der Testphase besteht kein Anspruch auf eine bestimmte Verfügbarkeit oder auf Support-Reaktionszeiten. Eine Gewährleistung ist für die Testphase ausgeschlossen, soweit gesetzlich zulässig.",
              "Die Testphase endet automatisch mit Ablauf des Testzeitraums und geht nicht selbsttätig in ein kostenpflichtiges Vertragsverhältnis über.",
            ],
          },
          {
            title: "5. Preise und Zahlungsbedingungen",
            paragraphs: [
              "Es gelten die im Angebot bzw. in der Paketübersicht genannten Preise. Alle Preise verstehen sich als Nettopreise zuzüglich der jeweils geltenden gesetzlichen Umsatzsteuer.",
              "Einmalige Entgelte für Einrichtung und Implementierung werden mit Bereitstellung fällig. Wiederkehrende Entgelte werden im Voraus für die jeweils vereinbarte Abrechnungsperiode berechnet.",
              "Rechnungen sind innerhalb von 14 Tagen ab Rechnungsdatum ohne Abzug zur Zahlung fällig.",
              "Gerät der Kunde mit der Zahlung in Verzug, ist der Anbieter berechtigt, nach vorheriger Ankündigung und Setzung einer angemessenen Nachfrist den Zugang zur Plattform bis zum vollständigen Zahlungsausgleich zu sperren. Weitergehende gesetzliche Ansprüche bleiben unberührt.",
            ],
          },
          {
            title: "6. Mitwirkungspflichten des Kunden",
            paragraphs: [
              "Der Kunde stellt die für die Leistungserbringung erforderlichen Mitwirkungsleistungen rechtzeitig, vollständig und unentgeltlich zur Verfügung. Dazu gehören insbesondere:",
            ],
            bullets: [
              "Bereitstellung der erforderlichen Zugänge zu den anzubindenden Quellsystemen",
              "Benennung eines fachlich und organisatorisch entscheidungsbefugten Ansprechpartners",
              "Prüfung und Freigabe von Zwischenergebnissen innerhalb angemessener Frist",
              "Sichere Verwahrung von Zugangsdaten und unverzügliche Meldung eines Verdachts auf missbräuchliche Nutzung",
              "Sicherstellung, dass er zur Übermittlung und Verarbeitung der eingebrachten Daten berechtigt ist",
            ],
            subsections: [
              {
                label: "Folgen unterlassener Mitwirkung",
                paragraphs: [
                  "Kommt der Kunde seinen Mitwirkungspflichten nicht nach, verschieben sich vereinbarte Termine angemessen. Zusätzlicher Aufwand, der dem Anbieter hierdurch entsteht, wird nach den jeweils gültigen Stundensätzen berechnet.",
                ],
              },
            ],
          },
          {
            title: "7. Nutzungsrechte und Eigentum",
            paragraphs: [
              "Der Anbieter räumt dem Kunden mit vollständiger Zahlung des vereinbarten Entgelts ein einfaches, zeitlich unbefristetes, nicht ausschließliches Recht ein, das für ihn erstellte Datenmodell und die zugehörigen Auswertungen innerhalb seines Unternehmens zu nutzen.",
              "Alle vom Kunden eingebrachten Daten bleiben ausschließlich sein Eigentum. Der Anbieter erwirbt hieran keine Rechte über die zur Leistungserbringung erforderliche Nutzung hinaus.",
              "An standardisierten Bestandteilen, Vorlagen, Bibliotheken und dem zugrunde liegenden Know-how des Anbieters verbleiben sämtliche Rechte beim Anbieter. Eine Weitergabe an Dritte, Unterlizenzierung oder Vermarktung dieser Bestandteile ist ohne vorherige Zustimmung in Textform nicht gestattet.",
            ],
          },
          {
            title: "8. Verfügbarkeit und Support",
            paragraphs: [
              "Soweit der Anbieter die Plattform betreibt, beträgt die angestrebte Verfügbarkeit 99 % im Jahresmittel, gemessen am Übergabepunkt zum Internet.",
              "Von der Verfügbarkeit ausgenommen sind angekündigte Wartungsfenster sowie Ausfälle, die auf Störungen bei Vorleistungsanbietern, höherer Gewalt oder auf Umständen im Verantwortungsbereich des Kunden beruhen.",
              "Support-Anfragen können per E-Mail eingereicht werden und werden während der üblichen Geschäftszeiten (Montag bis Freitag, 9:00–17:00 Uhr MEZ, ausgenommen gesetzliche Feiertage in Baden-Württemberg) bearbeitet.",
            ],
          },
          {
            title: "9. Datenschutz",
            paragraphs: [
              "Der Anbieter verarbeitet personenbezogene Daten des Kunden nach den geltenden datenschutzrechtlichen Vorschriften. Einzelheiten zur Verarbeitung im Rahmen dieser Website ergeben sich aus der Datenschutzerklärung.",
              "Soweit der Anbieter im Rahmen der Leistungserbringung personenbezogene Daten im Auftrag des Kunden verarbeitet, schließen die Parteien ergänzend den Auftragsverarbeitungsvertrag nach Art. 28 DSGVO. Dieser ist Bestandteil des Vertragsverhältnisses.",
            ],
          },
          {
            title: "10. Gewährleistung",
            paragraphs: [
              "Der Anbieter gewährleistet, dass die Leistungen die vertraglich vereinbarte Beschaffenheit aufweisen und frei von Rechten Dritter sind, die der vertragsgemäßen Nutzung entgegenstehen.",
              "Der Kunde zeigt Mängel unverzüglich in Textform unter nachvollziehbarer Beschreibung an. Der Anbieter beseitigt Mängel innerhalb angemessener Frist durch Nachbesserung oder Ersatzlieferung.",
              "Unerhebliche Abweichungen von der vereinbarten Beschaffenheit begründen keine Mängelansprüche. Gleiches gilt für Beeinträchtigungen, die aus einer nicht vertragsgemäßen Nutzung, aus Änderungen durch den Kunden oder Dritte oder aus fehlerhaften Daten des Kunden resultieren.",
            ],
          },
          {
            title: "11. Haftung",
            paragraphs: [
              "Der Anbieter haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit, bei Verletzung von Leben, Körper oder Gesundheit, nach dem Produkthaftungsgesetz sowie im Umfang einer übernommenen Garantie.",
              "Bei leicht fahrlässiger Verletzung einer wesentlichen Vertragspflicht (Kardinalpflicht) ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt. Wesentliche Vertragspflichten sind solche, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglicht und auf deren Einhaltung der Kunde regelmäßig vertrauen darf.",
              "Im Übrigen ist die Haftung ausgeschlossen.",
              "Der Kunde bleibt für die regelmäßige Sicherung seiner Daten in seinen Quellsystemen verantwortlich. Für Datenverlust haftet der Anbieter nur in dem Umfang, der bei ordnungsgemäßer Datensicherung durch den Kunden entstanden wäre.",
            ],
          },
          {
            title: "12. Vertragslaufzeit und Kündigung",
            paragraphs: [
              "Die Laufzeit richtet sich nach der im Angebot getroffenen Vereinbarung. Ist keine Laufzeit vereinbart, läuft der Vertrag auf unbestimmte Zeit und kann von beiden Parteien mit einer Frist von drei Monaten zum Ende eines Kalendermonats gekündigt werden.",
              "Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt für beide Parteien unberührt.",
              "Kündigungen bedürfen der Textform.",
              "Nach Vertragsende stellt der Anbieter dem Kunden dessen Daten auf Anforderung innerhalb von 30 Tagen in einem gängigen, maschinenlesbaren Format zur Verfügung. Danach werden die Daten nach Maßgabe des Auftragsverarbeitungsvertrags gelöscht.",
            ],
          },
          {
            title: "13. Änderungen dieser Bedingungen",
            paragraphs: [
              "Der Anbieter kann diese AGB mit Wirkung für die Zukunft ändern, soweit dies zur Anpassung an geänderte Rechtslage, Rechtsprechung oder an technische Weiterentwicklungen erforderlich ist und der Kunde dadurch nicht unangemessen benachteiligt wird.",
              "Änderungen werden dem Kunden mindestens sechs Wochen vor Inkrafttreten in Textform mitgeteilt. Widerspricht der Kunde nicht innerhalb von sechs Wochen nach Zugang, gelten die Änderungen als angenommen. Auf diese Folge wird in der Mitteilung gesondert hingewiesen.",
            ],
          },
          {
            title: "14. Schlussbestimmungen",
            paragraphs: [
              "Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.",
              "Ausschließlicher Gerichtsstand für alle Streitigkeiten aus und im Zusammenhang mit diesem Vertrag ist Ulm, sofern der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist.",
              "Änderungen und Ergänzungen dieses Vertrags bedürfen der Textform. Dies gilt auch für die Aufhebung dieses Formerfordernisses.",
              "Sollten einzelne Bestimmungen unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.",
            ],
          },
        ],
      }
    : {
        title: "Terms of Service",
        subtitle: "Conditions for the use of smiit Analytics",
        lastUpdated: "Last updated: August 2026",
        sections: [
          {
            title: "1. Scope and provider",
            paragraphs: [
              "These Terms of Service apply to all contracts on the provision and use of the smiit Analytics data analytics platform between smiit GmbH, Reiherweg 96, 89584 Ehingen, Germany (the “Provider”) and its customers.",
              `Email: ${email}`,
              `Phone: ${phone}`,
              "The Provider's offering is directed exclusively at entrepreneurs within the meaning of Sec. 14 German Civil Code (BGB), legal entities under public law and special funds under public law. Consumers within the meaning of Sec. 13 BGB are excluded.",
              "Deviating, conflicting or supplementary terms and conditions of the customer do not become part of the contract unless the Provider expressly agrees to their application in text form.",
            ],
          },
          {
            title: "2. Subject matter",
            paragraphs: [
              "The Provider makes smiit Analytics available to the customer — a data analytics platform that consolidates data from the source systems released by the customer into a data model and provides it in the form of dashboards, reports and AI-assisted analytics features.",
              "The specific scope of services follows from the applicable service description, the quote and the selected package. Content presented on this website constitutes non-binding descriptions and not a legally binding offer.",
              "The Provider is entitled to further develop and update the platform. Core functionality is preserved; changes that not insignificantly restrict the agreed scope of services require the customer's consent.",
            ],
          },
          {
            title: "3. Conclusion of contract",
            paragraphs: [
              "Enquiries via the contact form, by email or through an appointment booking do not constitute an offer in the legal sense.",
              "A contract is concluded when the customer accepts a quote from the Provider in text form, or when the Provider confirms an order from the customer in text form.",
            ],
          },
          {
            title: "4. Trial period",
            paragraphs: [
              "Where offered, the customer may test smiit Analytics free of charge for a period of 30 days. The trial period begins when access is provided.",
              "During the trial period there is no entitlement to any particular availability or support response times. Warranty is excluded for the trial period to the extent legally permissible.",
              "The trial period ends automatically upon expiry of the trial term and does not automatically convert into a paid contractual relationship.",
            ],
          },
          {
            title: "5. Prices and payment terms",
            paragraphs: [
              "The prices stated in the quote or package overview apply. All prices are net prices plus applicable statutory VAT.",
              "One-time fees for setup and implementation fall due upon provision. Recurring fees are charged in advance for the agreed billing period.",
              "Invoices are payable within 14 days of the invoice date without deduction.",
              "If the customer defaults on payment, the Provider is entitled — after prior notice and a reasonable grace period — to suspend access to the platform until payment is settled in full. Further statutory claims remain unaffected.",
            ],
          },
          {
            title: "6. Customer's duties to cooperate",
            paragraphs: [
              "The customer provides the cooperation required for the delivery of services in a timely, complete manner and free of charge. This includes in particular:",
            ],
            bullets: [
              "Providing the necessary access to the source systems to be connected",
              "Naming a contact person authorised to make technical and organisational decisions",
              "Reviewing and approving interim results within a reasonable period",
              "Keeping access credentials secure and reporting any suspected misuse without undue delay",
              "Ensuring that it is entitled to transfer and have processed the data it contributes",
            ],
            subsections: [
              {
                label: "Consequences of failure to cooperate",
                paragraphs: [
                  "If the customer fails to meet its duties to cooperate, agreed deadlines shall be postponed accordingly. Additional effort incurred by the Provider as a result will be charged at the applicable hourly rates.",
                ],
              },
            ],
          },
          {
            title: "7. Rights of use and ownership",
            paragraphs: [
              "Upon full payment of the agreed fee, the Provider grants the customer a simple, perpetual, non-exclusive right to use the data model created for it and the associated reports within its own organisation.",
              "All data contributed by the customer remains its exclusive property. The Provider acquires no rights to it beyond the use required to deliver the services.",
              "All rights to standardised components, templates, libraries and the Provider's underlying know-how remain with the Provider. Passing these components on to third parties, sub-licensing or commercialising them is not permitted without prior consent in text form.",
            ],
          },
          {
            title: "8. Availability and support",
            paragraphs: [
              "Where the Provider operates the platform, the target availability is 99 % on an annual average, measured at the handover point to the internet.",
              "Excluded from availability are announced maintenance windows as well as outages caused by disruptions at upstream providers, force majeure, or circumstances within the customer's sphere of responsibility.",
              "Support requests can be submitted by email and are handled during regular business hours (Monday to Friday, 9:00–17:00 CET, excluding public holidays in Baden-Württemberg).",
            ],
          },
          {
            title: "9. Data protection",
            paragraphs: [
              "The Provider processes the customer's personal data in accordance with applicable data protection law. Details on processing in the context of this website are set out in the privacy policy.",
              "Insofar as the Provider processes personal data on behalf of the customer in the course of delivering the services, the parties additionally conclude the data processing agreement pursuant to Art. 28 GDPR. It forms part of the contractual relationship.",
            ],
          },
          {
            title: "10. Warranty",
            paragraphs: [
              "The Provider warrants that the services have the contractually agreed characteristics and are free from third-party rights that would preclude their contractual use.",
              "The customer shall report defects without undue delay in text form, with a comprehensible description. The Provider shall remedy defects within a reasonable period by rectification or replacement.",
              "Insignificant deviations from the agreed characteristics do not give rise to warranty claims. The same applies to impairments resulting from use not in accordance with the contract, from changes made by the customer or third parties, or from faulty customer data.",
            ],
          },
          {
            title: "11. Liability",
            paragraphs: [
              "The Provider is liable without limitation in cases of intent and gross negligence, for injury to life, body or health, under the German Product Liability Act, and to the extent of any guarantee assumed.",
              "In the event of slightly negligent breach of a material contractual obligation (cardinal obligation), liability is limited to the foreseeable damage typical for this type of contract. Material contractual obligations are those whose fulfilment makes the proper performance of the contract possible in the first place and on whose observance the customer may regularly rely.",
              "Liability is otherwise excluded.",
              "The customer remains responsible for regularly backing up its data in its source systems. The Provider is liable for data loss only to the extent that would have arisen had the customer performed proper data backups.",
            ],
          },
          {
            title: "12. Term and termination",
            paragraphs: [
              "The term follows from the agreement made in the quote. If no term is agreed, the contract runs for an indefinite period and may be terminated by either party with three months' notice to the end of a calendar month.",
              "The right of either party to terminate for cause remains unaffected.",
              "Terminations must be made in text form.",
              "After the end of the contract, the Provider makes the customer's data available on request within 30 days in a common, machine-readable format. Thereafter the data is deleted in accordance with the data processing agreement.",
            ],
          },
          {
            title: "13. Changes to these terms",
            paragraphs: [
              "The Provider may amend these terms with effect for the future insofar as this is necessary to adapt to changes in the law, case law or technical developments, and provided the customer is not unreasonably disadvantaged as a result.",
              "Changes will be communicated to the customer in text form at least six weeks before they take effect. If the customer does not object within six weeks of receipt, the changes are deemed accepted. The notice will draw separate attention to this consequence.",
            ],
          },
          {
            title: "14. Final provisions",
            paragraphs: [
              "The law of the Federal Republic of Germany applies, excluding the UN Convention on Contracts for the International Sale of Goods.",
              "The exclusive place of jurisdiction for all disputes arising from or in connection with this contract is Ulm, provided the customer is a merchant, a legal entity under public law or a special fund under public law.",
              "Amendments and additions to this contract must be made in text form. This also applies to any waiver of this form requirement.",
              "Should individual provisions be or become invalid, the validity of the remaining provisions shall remain unaffected.",
            ],
          },
        ],
      }

  return (
    <main className="min-h-screen">
      <LegalHero
        title={
          isDe ? (
            <>
              <span className="sm:hidden">
                Allgemeine
                <br />
                Geschäftsbedingungen
              </span>
              <span className="hidden sm:inline">Allgemeine Geschäftsbedingungen</span>
            </>
          ) : (
            L.title
          )
        }
        subtitle={L.subtitle}
      />

      <LegalSections sections={L.sections} email={email} phone={phone}>
        <p className="mt-10 text-xs text-black/50">{L.lastUpdated}</p>
      </LegalSections>

      <div className="h-2 md:h-4" />
    </main>
  )
}
