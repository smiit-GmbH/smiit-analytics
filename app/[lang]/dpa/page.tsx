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
    path: "dpa",
    title: {
      de: "smiit Analytics – Auftragsverarbeitungsvertrag (AVV)",
      en: "smiit Analytics – Data Processing Agreement (DPA)",
    },
    description: {
      de: "Auftragsverarbeitungsvertrag nach Art. 28 DSGVO für smiit Analytics: Gegenstand, Weisungen, technische und organisatorische Maßnahmen, Unterauftragsverarbeiter und Betroffenenrechte.",
      en: "Data processing agreement under Art. 28 GDPR for smiit Analytics: subject matter, instructions, technical and organisational measures, sub-processors and data subject rights.",
    },
  })
}

export default async function DpaPage({
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
        title: "Auftragsverarbeitungsvertrag",
        subtitle: "Vereinbarung zur Auftragsverarbeitung gemäß Art. 28 DSGVO",
        lastUpdated: "Stand: August 2026",
        sections: [
          {
            title: "1. Vertragsparteien",
            paragraphs: [
              "Auftragsverarbeiter:",
              "smiit GmbH, Reiherweg 96, 89584 Ehingen, Deutschland",
              `E-Mail: ${email}`,
              `Telefon: ${phone}`,
              "Datenschutzbeauftragter: Noah Neßlauer",
              "Verantwortlicher: der Kunde, der smiit Analytics gemäß den Allgemeinen Geschäftsbedingungen nutzt (nachfolgend „Verantwortlicher“).",
              "Diese Vereinbarung konkretisiert die datenschutzrechtlichen Pflichten der Parteien für die Verarbeitung personenbezogener Daten im Rahmen der Bereitstellung und des Betriebs von smiit Analytics.",
            ],
          },
          {
            title: "2. Gegenstand und Dauer der Verarbeitung",
            paragraphs: [
              "Gegenstand der Verarbeitung ist die Erbringung der in den Allgemeinen Geschäftsbedingungen und im jeweiligen Einzelvertrag beschriebenen Leistungen rund um smiit Analytics — insbesondere die Anbindung der Datenquellen des Verantwortlichen, der Aufbau und Betrieb des Datenmodells sowie die Bereitstellung von Dashboards, Auswertungen und KI-gestützten Analysefunktionen.",
              "Die Dauer der Verarbeitung entspricht der Laufzeit des zugrunde liegenden Hauptvertrags. Sie endet mit dessen Beendigung, sofern nicht gesetzliche Aufbewahrungspflichten eine längere Speicherung erfordern.",
            ],
          },
          {
            title: "3. Art und Zweck der Verarbeitung",
            paragraphs: [
              "Die Verarbeitung erfolgt ausschließlich zu dem Zweck, die vertraglich vereinbarten Leistungen zu erbringen. Eine Verarbeitung zu eigenen Zwecken des Auftragsverarbeiters findet nicht statt.",
              "Die Verarbeitung umfasst insbesondere folgende Tätigkeiten:",
            ],
            bullets: [
              "Erheben, Erfassen und Auslesen von Daten aus den vom Verantwortlichen freigegebenen Quellsystemen",
              "Speichern, Organisieren und Strukturieren der Daten im Datenmodell",
              "Auswerten, Aggregieren und Visualisieren der Daten in Dashboards und Berichten",
              "Verarbeitung durch KI-gestützte Analyse- und Assistenzfunktionen, soweit vom Verantwortlichen aktiviert",
              "Löschen und Vernichten von Daten nach Weisung oder nach Vertragsende",
            ],
          },
          {
            title: "4. Art der Daten und Kategorien betroffener Personen",
            paragraphs: [
              "Je nach den vom Verantwortlichen angebundenen Quellsystemen können folgende Datenarten verarbeitet werden:",
            ],
            bullets: [
              "Stammdaten (z. B. Name, Firmenzugehörigkeit, Kunden- und Lieferantennummer)",
              "Kontaktdaten (z. B. Anschrift, E-Mail-Adresse, Telefonnummer)",
              "Vertrags- und Abrechnungsdaten (z. B. Angebote, Aufträge, Rechnungen, Zahlungsinformationen)",
              "Leistungs- und Zeiterfassungsdaten, soweit im Quellsystem vorhanden",
              "Nutzungs- und Protokolldaten der Analyseplattform (z. B. Anmeldezeitpunkte, aufgerufene Berichte)",
            ],
          },
          {
            title: "5. Kategorien betroffener Personen",
            bullets: [
              "Kunden und Interessenten des Verantwortlichen",
              "Lieferanten und Dienstleister des Verantwortlichen",
              "Beschäftigte und Ansprechpartner des Verantwortlichen",
              "Nutzerinnen und Nutzer der Analyseplattform",
            ],
          },
          {
            title: "6. Rechte und Pflichten des Verantwortlichen",
            paragraphs: [
              "Der Verantwortliche ist für die Rechtmäßigkeit der Verarbeitung sowie für die Wahrung der Rechte betroffener Personen allein verantwortlich.",
              "Der Verantwortliche erteilt alle Weisungen grundsätzlich in Textform. Mündliche Weisungen sind unverzüglich in Textform zu bestätigen.",
              "Der Verantwortliche informiert den Auftragsverarbeiter unverzüglich, wenn er Fehler oder Unregelmäßigkeiten bei der Prüfung der Verarbeitungsergebnisse feststellt.",
            ],
          },
          {
            title: "7. Pflichten des Auftragsverarbeiters",
            subsections: [
              {
                label: "a) Weisungsgebundenheit",
                paragraphs: [
                  "Der Auftragsverarbeiter verarbeitet personenbezogene Daten ausschließlich auf dokumentierte Weisung des Verantwortlichen, es sei denn, er ist nach Unionsrecht oder dem Recht eines Mitgliedstaats zur Verarbeitung verpflichtet. In diesem Fall teilt er dem Verantwortlichen diese rechtlichen Anforderungen vor der Verarbeitung mit, sofern das betreffende Recht dies nicht wegen eines wichtigen öffentlichen Interesses verbietet.",
                  "Ist der Auftragsverarbeiter der Auffassung, dass eine Weisung gegen datenschutzrechtliche Vorschriften verstößt, weist er den Verantwortlichen unverzüglich darauf hin. Er ist berechtigt, die Durchführung der betreffenden Weisung bis zu deren Bestätigung oder Änderung auszusetzen.",
                ],
              },
              {
                label: "b) Vertraulichkeit",
                paragraphs: [
                  "Der Auftragsverarbeiter stellt sicher, dass sich alle zur Verarbeitung befugten Personen zur Vertraulichkeit verpflichtet haben oder einer angemessenen gesetzlichen Verschwiegenheitspflicht unterliegen. Die Verpflichtung besteht auch nach Beendigung des Vertragsverhältnisses fort.",
                ],
              },
              {
                label: "c) Datensicherheit",
                paragraphs: [
                  "Der Auftragsverarbeiter trifft alle nach Art. 32 DSGVO erforderlichen technischen und organisatorischen Maßnahmen (siehe Ziffer 9) und hält diese während der gesamten Vertragslaufzeit aufrecht. Maßnahmen dürfen fortentwickelt werden, sofern das vereinbarte Schutzniveau nicht unterschritten wird.",
                ],
              },
              {
                label: "d) Unterstützung des Verantwortlichen",
                paragraphs: [
                  "Der Auftragsverarbeiter unterstützt den Verantwortlichen mit geeigneten technischen und organisatorischen Maßnahmen bei der Erfüllung von Anträgen betroffener Personen (Art. 12 bis 23 DSGVO) sowie bei der Einhaltung der Pflichten aus Art. 32 bis 36 DSGVO, insbesondere bei Datenschutz-Folgenabschätzungen.",
                  "Wendet sich eine betroffene Person unmittelbar an den Auftragsverarbeiter, leitet dieser das Anliegen unverzüglich an den Verantwortlichen weiter.",
                ],
              },
              {
                label: "e) Meldung von Datenschutzverletzungen",
                paragraphs: [
                  "Der Auftragsverarbeiter meldet dem Verantwortlichen jede Verletzung des Schutzes personenbezogener Daten unverzüglich, spätestens jedoch innerhalb von 24 Stunden nach Kenntniserlangung, und unterstützt ihn bei der Erfüllung der Melde- und Benachrichtigungspflichten nach Art. 33 und 34 DSGVO.",
                ],
              },
              {
                label: "f) Nachweise und Kontrollen",
                paragraphs: [
                  "Der Auftragsverarbeiter stellt dem Verantwortlichen alle Informationen zur Verfügung, die zum Nachweis der Einhaltung der Pflichten aus Art. 28 DSGVO erforderlich sind, und ermöglicht Überprüfungen einschließlich Inspektionen.",
                  "Kontrollen sind mit angemessener Vorlaufzeit von mindestens 14 Tagen anzukündigen, während der üblichen Geschäftszeiten durchzuführen und dürfen den Betriebsablauf nicht unverhältnismäßig beeinträchtigen. Der Nachweis kann auch durch aktuelle Zertifikate, Testate oder Prüfberichte unabhängiger Stellen erbracht werden.",
                ],
              },
            ],
          },
          {
            title: "8. Unterauftragsverarbeiter",
            paragraphs: [
              "Der Verantwortliche erteilt dem Auftragsverarbeiter die allgemeine Genehmigung, weitere Auftragsverarbeiter hinzuzuziehen. Der Auftragsverarbeiter informiert den Verantwortlichen über beabsichtigte Änderungen in Bezug auf die Hinzuziehung oder Ersetzung von Unterauftragsverarbeitern; der Verantwortliche kann hiergegen innerhalb von 14 Tagen aus wichtigem Grund Einspruch erheben.",
              "Der Auftragsverarbeiter verpflichtet jeden Unterauftragsverarbeiter vertraglich auf ein Datenschutzniveau, das dem dieser Vereinbarung entspricht, und haftet für dessen Verhalten wie für eigenes.",
              "Zum Zeitpunkt des Vertragsschlusses sind insbesondere folgende Unterauftragsverarbeiter eingesetzt:",
            ],
            bullets: [
              "Microsoft Ireland Operations Ltd., Irland — Hosting und Betrieb der Datenplattform (Microsoft Azure, Microsoft Fabric, Power BI)",
              "GitHub Inc., USA — Hosting dieser Website",
              "EmailJS Pte. Ltd., Singapur — technischer Versand von Kontaktformular-Nachrichten",
              "Calendly LLC, USA — Terminvereinbarung",
            ],
          },
          {
            title: "9. Technische und organisatorische Maßnahmen",
            paragraphs: [
              "Der Auftragsverarbeiter hat die folgenden Maßnahmen nach Art. 32 DSGVO umgesetzt:",
            ],
            bullets: [
              "Zutrittskontrolle: Verarbeitung in zertifizierten Rechenzentren der eingesetzten Cloud-Anbieter mit physischen Zugangssicherungen",
              "Zugangskontrolle: individuelle Benutzerkonten, Mehr-Faktor-Authentifizierung, Passwortrichtlinien, automatische Sperrung inaktiver Sitzungen",
              "Zugriffskontrolle: rollenbasiertes Berechtigungskonzept nach dem Prinzip der geringsten Rechte, Trennung von Administrations- und Anwenderrollen",
              "Weitergabekontrolle: Transportverschlüsselung (TLS 1.2 oder höher) für alle Übertragungen, Verschlüsselung ruhender Daten",
              "Eingabekontrolle: Protokollierung von Anmeldungen, administrativen Änderungen und Zugriffen auf Berichte",
              "Verfügbarkeitskontrolle: regelmäßige Sicherungen, redundante Speicherung, dokumentierte Wiederherstellungsverfahren",
              "Trennungskontrolle: mandantengetrennte Speicherung und Verarbeitung der Daten je Verantwortlichem",
              "Verfahren zur regelmäßigen Überprüfung, Bewertung und Evaluierung der Wirksamkeit der Maßnahmen",
            ],
          },
          {
            title: "10. Verarbeitung in Drittländern",
            paragraphs: [
              "Eine Verarbeitung personenbezogener Daten in einem Drittland findet nur statt, wenn die besonderen Voraussetzungen der Art. 44 ff. DSGVO erfüllt sind — insbesondere auf Grundlage eines Angemessenheitsbeschlusses oder der Standardvertragsklauseln der Europäischen Kommission nebst ergänzender Schutzmaßnahmen.",
              "Der Betrieb der Datenplattform erfolgt standardmäßig in Rechenzentren innerhalb der Europäischen Union.",
            ],
          },
          {
            title: "11. Löschung und Rückgabe der Daten",
            paragraphs: [
              "Nach Abschluss der Erbringung der Verarbeitungsleistungen löscht der Auftragsverarbeiter alle personenbezogenen Daten oder gibt sie nach Wahl des Verantwortlichen zurück, sofern keine gesetzliche Pflicht zur Speicherung besteht.",
              "Die Rückgabe erfolgt in einem gängigen, maschinenlesbaren Format. Sicherungskopien werden im Rahmen der regulären Backup-Zyklen gelöscht.",
              "Die Löschung wird dem Verantwortlichen auf Anfrage in Textform bestätigt.",
            ],
          },
          {
            title: "12. Haftung",
            paragraphs: [
              "Für die Haftung der Parteien gilt Art. 82 DSGVO. Im Übrigen gelten die Haftungsregelungen des Hauptvertrags.",
            ],
          },
          {
            title: "13. Schlussbestimmungen",
            paragraphs: [
              "Änderungen und Ergänzungen dieser Vereinbarung bedürfen der Textform. Dies gilt auch für die Aufhebung dieses Formerfordernisses.",
              "Sollten einzelne Bestimmungen dieser Vereinbarung unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.",
              "Bei Widersprüchen zwischen dieser Vereinbarung und dem Hauptvertrag gehen die Regelungen dieser Vereinbarung vor, soweit die Verarbeitung personenbezogener Daten betroffen ist.",
              "Es gilt das Recht der Bundesrepublik Deutschland.",
            ],
          },
        ],
      }
    : {
        title: "Data Processing Agreement",
        subtitle: "Agreement on processing on behalf of a controller pursuant to Art. 28 GDPR",
        lastUpdated: "Last updated: August 2026",
        sections: [
          {
            title: "1. Parties",
            paragraphs: [
              "Processor:",
              "smiit GmbH, Reiherweg 96, 89584 Ehingen, Germany",
              `Email: ${email}`,
              `Phone: ${phone}`,
              "Data protection officer: Noah Neßlauer",
              "Controller: the customer using smiit Analytics under the Terms of Service (the “Controller”).",
              "This agreement specifies the data protection obligations of the parties for the processing of personal data in connection with the provision and operation of smiit Analytics.",
            ],
          },
          {
            title: "2. Subject matter and duration of processing",
            paragraphs: [
              "The subject matter of the processing is the provision of the services described in the Terms of Service and the applicable individual agreement — in particular connecting the Controller's data sources, building and operating the data model, and providing dashboards, reports and AI-assisted analytics features.",
              "The duration of the processing corresponds to the term of the underlying main agreement. It ends upon termination of that agreement, unless statutory retention obligations require longer storage.",
            ],
          },
          {
            title: "3. Nature and purpose of processing",
            paragraphs: [
              "Processing is carried out solely for the purpose of delivering the contractually agreed services. The Processor does not process the data for its own purposes.",
              "The processing comprises in particular the following activities:",
            ],
            bullets: [
              "Collection, recording and retrieval of data from the source systems released by the Controller",
              "Storage, organisation and structuring of the data within the data model",
              "Analysis, aggregation and visualisation of the data in dashboards and reports",
              "Processing through AI-assisted analytics and assistance features, where enabled by the Controller",
              "Erasure and destruction of data on instruction or after the end of the contract",
            ],
          },
          {
            title: "4. Types of personal data",
            paragraphs: [
              "Depending on the source systems connected by the Controller, the following types of data may be processed:",
            ],
            bullets: [
              "Master data (e.g. name, company affiliation, customer and supplier numbers)",
              "Contact data (e.g. address, email address, phone number)",
              "Contract and billing data (e.g. quotes, orders, invoices, payment information)",
              "Service and time-tracking data, where present in the source system",
              "Usage and log data of the analytics platform (e.g. sign-in times, reports accessed)",
            ],
          },
          {
            title: "5. Categories of data subjects",
            bullets: [
              "Customers and prospects of the Controller",
              "Suppliers and service providers of the Controller",
              "Employees and contact persons of the Controller",
              "Users of the analytics platform",
            ],
          },
          {
            title: "6. Rights and obligations of the Controller",
            paragraphs: [
              "The Controller is solely responsible for the lawfulness of the processing and for safeguarding the rights of data subjects.",
              "The Controller issues all instructions in text form as a matter of principle. Verbal instructions must be confirmed in text form without undue delay.",
              "The Controller shall inform the Processor without undue delay if it detects errors or irregularities when reviewing the processing results.",
            ],
          },
          {
            title: "7. Obligations of the Processor",
            subsections: [
              {
                label: "a) Processing on instructions",
                paragraphs: [
                  "The Processor processes personal data solely on documented instructions from the Controller, unless required to process by Union or Member State law. In that case, the Processor informs the Controller of that legal requirement before processing, unless that law prohibits such information on important grounds of public interest.",
                  "If the Processor considers that an instruction infringes data protection law, it shall inform the Controller without undue delay. The Processor is entitled to suspend the execution of the instruction until it is confirmed or amended.",
                ],
              },
              {
                label: "b) Confidentiality",
                paragraphs: [
                  "The Processor ensures that all persons authorised to process the data have committed themselves to confidentiality or are under an appropriate statutory obligation of confidentiality. This obligation survives the termination of the contractual relationship.",
                ],
              },
              {
                label: "c) Security of processing",
                paragraphs: [
                  "The Processor implements all technical and organisational measures required under Art. 32 GDPR (see section 9) and maintains them throughout the term of the contract. Measures may be further developed provided the agreed level of protection is not reduced.",
                ],
              },
              {
                label: "d) Assistance to the Controller",
                paragraphs: [
                  "The Processor assists the Controller with appropriate technical and organisational measures in responding to requests from data subjects (Art. 12 to 23 GDPR) and in complying with the obligations under Art. 32 to 36 GDPR, in particular data protection impact assessments.",
                  "If a data subject contacts the Processor directly, the Processor forwards the request to the Controller without undue delay.",
                ],
              },
              {
                label: "e) Notification of personal data breaches",
                paragraphs: [
                  "The Processor notifies the Controller of any personal data breach without undue delay, and no later than 24 hours after becoming aware of it, and assists the Controller in complying with its notification obligations under Art. 33 and 34 GDPR.",
                ],
              },
              {
                label: "f) Evidence and audits",
                paragraphs: [
                  "The Processor makes available to the Controller all information necessary to demonstrate compliance with the obligations under Art. 28 GDPR and allows for and contributes to audits, including inspections.",
                  "Audits must be announced with reasonable notice of at least 14 days, carried out during regular business hours and must not disproportionately disrupt operations. Evidence may also be provided by way of current certifications, attestations or audit reports from independent bodies.",
                ],
              },
            ],
          },
          {
            title: "8. Sub-processors",
            paragraphs: [
              "The Controller grants the Processor general authorisation to engage further processors. The Processor informs the Controller of any intended changes concerning the addition or replacement of sub-processors; the Controller may object on important grounds within 14 days.",
              "The Processor contractually obliges every sub-processor to a level of data protection equivalent to this agreement and is liable for their conduct as for its own.",
              "At the time this agreement is concluded, the following sub-processors are engaged in particular:",
            ],
            bullets: [
              "Microsoft Ireland Operations Ltd., Ireland — hosting and operation of the data platform (Microsoft Azure, Microsoft Fabric, Power BI)",
              "GitHub Inc., USA — hosting of this website",
              "EmailJS Pte. Ltd., Singapore — technical delivery of contact form messages",
              "Calendly LLC, USA — appointment scheduling",
            ],
          },
          {
            title: "9. Technical and organisational measures",
            paragraphs: [
              "The Processor has implemented the following measures pursuant to Art. 32 GDPR:",
            ],
            bullets: [
              "Physical access control: processing in certified data centres of the cloud providers used, with physical access safeguards",
              "System access control: individual user accounts, multi-factor authentication, password policies, automatic locking of inactive sessions",
              "Data access control: role-based authorisation concept following the principle of least privilege, separation of administrative and end-user roles",
              "Transfer control: transport encryption (TLS 1.2 or higher) for all transmissions, encryption of data at rest",
              "Input control: logging of sign-ins, administrative changes and access to reports",
              "Availability control: regular backups, redundant storage, documented recovery procedures",
              "Separation control: tenant-separated storage and processing of data per Controller",
              "Procedures for regularly testing, assessing and evaluating the effectiveness of the measures",
            ],
          },
          {
            title: "10. Processing in third countries",
            paragraphs: [
              "Personal data is processed in a third country only where the specific requirements of Art. 44 et seq. GDPR are met — in particular on the basis of an adequacy decision or the European Commission's standard contractual clauses together with supplementary safeguards.",
              "The data platform is operated by default in data centres within the European Union.",
            ],
          },
          {
            title: "11. Erasure and return of data",
            paragraphs: [
              "After the end of the provision of processing services, the Processor erases all personal data or returns it at the Controller's choice, unless there is a statutory obligation to store it.",
              "The return is made in a common, machine-readable format. Backup copies are deleted as part of the regular backup cycles.",
              "Erasure is confirmed to the Controller in text form upon request.",
            ],
          },
          {
            title: "12. Liability",
            paragraphs: [
              "Art. 82 GDPR applies to the liability of the parties. In all other respects, the liability provisions of the main agreement apply.",
            ],
          },
          {
            title: "13. Final provisions",
            paragraphs: [
              "Amendments and additions to this agreement must be made in text form. This also applies to any waiver of this form requirement.",
              "Should individual provisions of this agreement be or become invalid, the validity of the remaining provisions shall remain unaffected.",
              "In the event of contradictions between this agreement and the main agreement, the provisions of this agreement shall prevail insofar as the processing of personal data is concerned.",
              "The law of the Federal Republic of Germany applies.",
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
                Auftrags-
                <br />
                verarbeitungsvertrag
              </span>
              <span className="hidden sm:inline">Auftragsverarbeitungsvertrag</span>
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
