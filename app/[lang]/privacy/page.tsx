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
    path: "privacy",
    title: {
      de: "smiit Analytics – Datenschutzerklärung",
      en: "smiit Analytics – Privacy policy",
    },
    description: {
      de: "Datenschutzerklärung der smiit GmbH: Welche personenbezogenen Daten wir verarbeiten (Hosting, Kontaktanfragen, Terminvereinbarung) und auf welcher Rechtsgrundlage.",
      en: "Privacy policy of smiit GmbH: what personal data we process (hosting, contact requests, appointment scheduling) and on which legal basis under GDPR.",
    },
  })
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isDe = lang === "de"

  const email = "kontakt@smiit.de"
  const phone = "+49 160 4073198"

  const L: { title: string; sections: LegalSection[] } = isDe
    ? {
        title: "Datenschutzerklärung",
        sections: [
          {
            title: "1. Verantwortlicher",
            paragraphs: [
              "smiit GmbH",
              "Reiherweg 96, 89584 Ehingen",
              `E-Mail: ${email}`,
              `Telefon: ${phone}`,
              "Datenschutzbeauftragter: Noah Neßlauer",
            ],
          },
          {
            title: "2. Allgemeine Informationen zur Datenverarbeitung",
            paragraphs: [
              "Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen, z. B. Name, E-Mail-Adresse oder IP-Adresse.",
            ],
          },
          {
            title: "3. Zwecke der Verarbeitung und Rechtsgrundlagen",
            subsections: [
              {
                label: "a) Bereitstellung und Betrieb der Website",
                paragraphs: [
                  "Diese Website wird über GitHub Pages, einen Dienst der GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA, gehostet.",
                  "Beim Aufruf dieser Website werden durch den Hosting-Dienstleister automatisch technisch erforderliche Daten verarbeitet (z. B. IP-Adresse, Browsertyp, Betriebssystem, Referrer-URL, Uhrzeit der Serveranfrage).",
                  "Beim Aufruf der Website werden durch GitHub automatisch Server-Logfiles erfasst. Dies umfasst insbesondere die IP-Adresse, Datum und Uhrzeit des Zugriffs, Browsertyp und Betriebssystem. Diese Daten werden zur Sicherstellung des technischen Betriebs und der Sicherheit der Website verarbeitet.",
                  "Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren und funktionsfähigen Betrieb der Website).",
                ],
              },
              {
                label: "b) Kontaktanfragen per Formular oder E-Mail",
                paragraphs: [
                  "Wenn Sie uns kontaktieren, verarbeiten wir die von Ihnen angegebenen Daten zur Bearbeitung Ihrer Anfrage.",
                  "Wenn Sie uns über das Kontaktformular kontaktieren, werden die von Ihnen eingegebenen Daten (Name, E-Mail-Adresse, Nachricht sowie optional Telefonnummer) zum Zweck der Bearbeitung Ihrer Anfrage verarbeitet.",
                  "Für den technischen Versand der über das Kontaktformular eingegebenen Daten nutzen wir den Dienst EmailJS der EmailJS Pte. Ltd., Singapur. Dabei werden die eingegebenen personenbezogenen Daten an EmailJS übermittelt und von dort per E-Mail an uns weitergeleitet.",
                  "Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.",
                ],
              },
              {
                label: "c) Terminvereinbarung über Calendly",
                paragraphs: [
                  "Zur Vereinbarung von Terminen nutzen wir den Dienst Calendly der Calendly LLC, USA.",
                  "Bei Nutzung der Terminbuchung werden personenbezogene Daten zur Koordination des Termins verarbeitet. Beim Aufruf der Terminbuchungsfunktion werden personenbezogene Daten (insbesondere die IP-Adresse) an Calendly übertragen. Wenn Sie einen Termin buchen, werden die von Ihnen eingegebenen Daten zur Organisation und Durchführung des Termins verarbeitet.",
                  "Rechtsgrundlage: Art. 6 Abs. 1 lit. b und f DSGVO.",
                ],
              },
              {
                label: "d) Google Ads – Conversion-Tracking",
                paragraphs: [
                  "Wir nutzen den Dienst Google Ads der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland („Google“), um die Wirksamkeit unserer Online-Werbung zu messen (Conversion-Tracking). Dabei wird bei bestimmten Interaktionen (z. B. Klick auf eine E-Mail-Adresse, Start einer Terminvereinbarung über Calendly oder Aufruf unseres LinkedIn-Profils) erfasst, ob Sie zuvor über eine unserer Anzeigen auf die Website gelangt sind.",
                  "Hierzu setzt Google Cookies bzw. vergleichbare Technologien ein und überträgt Daten (insbesondere IP-Adresse, Informationen zur Interaktion sowie eine eindeutige Kennung) an Google. Eine Verknüpfung mit Ihrer Identität durch uns findet nicht statt.",
                  "Diese Verarbeitung erfolgt ausschließlich, wenn Sie hierzu über unser Cookie-Banner Ihre Einwilligung erteilt haben. Bis zu Ihrer Einwilligung werden keine Marketing-Cookies gesetzt; Daten werden allenfalls cookielos und ohne eindeutige Kennung übertragen (Google Consent Mode v2). Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie das Cookie-Banner über den Link „Cookie-Einstellungen“ im Footer erneut öffnen und Ihre Auswahl ändern.",
                  "Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO i. V. m. § 25 Abs. 1 TDDDG (Einwilligung).",
                ],
              },
              {
                label: "e) Google Analytics",
                paragraphs: [
                  "Wir nutzen den Webanalysedienst Google Analytics 4 der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland („Google“), um die Nutzung unserer Website statistisch auszuwerten (z. B. aufgerufene Seiten, Verweildauer, ungefähre Herkunft, verwendete Geräte). Dies hilft uns, unser Angebot zu verbessern.",
                  "Hierzu setzt Google Cookies bzw. vergleichbare Technologien ein und überträgt Nutzungsdaten (insbesondere eine gekürzte IP-Adresse sowie Informationen zum Nutzungsverhalten) an Google. Wir verwenden Google Analytics mit aktivierter IP-Anonymisierung; eine Verknüpfung mit Ihrer Identität durch uns findet nicht statt.",
                  "Diese Verarbeitung erfolgt ausschließlich, wenn Sie hierzu über unser Cookie-Banner Ihre Einwilligung erteilt haben. Bis zu Ihrer Einwilligung werden keine Analyse-Cookies gesetzt; Daten werden allenfalls cookielos übertragen (Google Consent Mode v2). Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie das Cookie-Banner über den Link „Cookie-Einstellungen“ im Footer erneut öffnen und Ihre Auswahl ändern.",
                  "Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO i. V. m. § 25 Abs. 1 TDDDG (Einwilligung).",
                ],
              },
            ],
          },
          {
            title: "4. Empfänger von Daten",
            paragraphs: [
              "Zur Erbringung unserer Leistungen nutzen wir folgende Dienstleister:",
            ],
            bullets: [
              "GitHub Pages (Hosting)",
              "EmailJS (Versand von Formularnachrichten)",
              "Calendly (Terminverwaltung)",
              "Google Ads (Conversion-Tracking, nur mit Einwilligung)",
              "Google Analytics (Webanalyse, nur mit Einwilligung)",
            ],
          },
          {
            title: "5. Drittlandübermittlung",
            paragraphs: [
              "Eine Verarbeitung kann in Drittländern (z. B. USA) stattfinden. In diesen Fällen erfolgt die Übermittlung auf Basis geeigneter Garantien wie Standardvertragsklauseln (SCC) oder – sofern anwendbar – dem EU‑US Data Privacy Framework.",
              "GitHub verarbeitet Daten auch in den USA. Die Datenübermittlung erfolgt auf Grundlage der EU-Standardvertragsklauseln.",
              "Eine Datenübermittlung in Drittländer (außerhalb der EU) kann nicht ausgeschlossen werden. EmailJS verwendet geeignete Garantien gemäß Art. 46 DSGVO.",
              "Die Datenübermittlung in die USA im Zusammenhang mit Calendly erfolgt auf Grundlage der EU-Standardvertragsklauseln.",
              "Im Zusammenhang mit Google Ads und Google Analytics kann eine Datenübermittlung an Google in die USA erfolgen. Google LLC ist unter dem EU‑US Data Privacy Framework zertifiziert; ergänzend werden EU-Standardvertragsklauseln herangezogen.",
            ],
          },
          {
            title: "6. Cookies und ähnliche Technologien",
            paragraphs: [
              "Technisch notwendige Datenverarbeitungen erfolgen durch den Hosting-Dienstleister sowie zur Bereitstellung der Grundfunktionen der Website; hierfür ist keine Einwilligung erforderlich.",
              "Marketing-, Conversion- und Analyse-Cookies im Rahmen von Google Ads und Google Analytics setzen wir ausschließlich auf Grundlage Ihrer Einwilligung ein. Beim ersten Aufruf der Website können Sie über unser Cookie-Banner entscheiden, ob Sie diese zulassen; ohne Einwilligung werden keine Marketing- oder Analyse-Cookies gesetzt (Google Consent Mode v2). Ihre Auswahl wird lokal in Ihrem Browser gespeichert und kann jederzeit über den Link „Cookie-Einstellungen“ im Footer geändert werden.",
              "Bei Einbettung externer Dienste (z. B. Calendly) können durch diese Anbieter Cookies oder ähnliche Technologien eingesetzt werden.",
            ],
          },
          {
            title: "7. Speicherdauer",
            bullets: [
              "Logdaten: in der Regel bis zu 30 Tage",
              "Kontaktanfragen: 6–12 Monate nach Bearbeitung",
              "Termindaten: bis zur Abwicklung des Termins",
            ],
          },
          {
            title: "8. Rechte der betroffenen Personen",
            paragraphs: [
              "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch (Art. 21 DSGVO) und Widerruf erteilter Einwilligungen.",
            ],
          },
          {
            title: "9. Beschwerderecht",
            paragraphs: [
              "Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren.",
            ],
          },
          {
            title: "10. Erforderlichkeit der Bereitstellung",
            paragraphs: [
              "Ohne Angabe der erforderlichen Daten (z. B. E-Mail-Adresse) können wir Ihre Anfrage nicht bearbeiten.",
            ],
          },
          {
            title: "11. Automatisierte Entscheidungsfindung",
            paragraphs: [
              "Eine automatisierte Entscheidungsfindung oder Profiling findet nicht statt.",
            ],
          },
        ],
      }
    : {
        title: "Privacy policy",
        sections: [
          {
            title: "1. Responsible",
            paragraphs: [
              "smiit GmbH",
              "Reiherweg 96, 89584 Ehingen, Germany",
              `Email: ${email}`,
              `Phone: ${phone}`,
              "Data protection officer: Noah Neßlauer",
            ],
          },
          {
            title: "2. General information on data processing",
            paragraphs: [
              "Personal data is any information relating to an identified or identifiable natural person, e.g. name, email address, or IP address.",
            ],
          },
          {
            title: "3. Purposes of processing and legal bases",
            subsections: [
              {
                label: "a) Provision and operation of the website",
                paragraphs: [
                  "This website is hosted via GitHub Pages, a service provided by GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA.",
                  "When you access this website, the hosting provider automatically processes technically necessary data (e.g. IP address, browser type, operating system, referrer URL, time of the server request).",
                  "When you access this website, GitHub automatically records server log files. This includes in particular the IP address, date and time of access, browser type, and operating system. This data is processed to ensure the technical operation and security of the website.",
                  "Legal basis: Art. 6(1)(f) GDPR (legitimate interest in a secure and functional operation of the website).",
                ],
              },
              {
                label: "b) Contact requests via form or email",
                paragraphs: [
                  "If you contact us, we process the data you provide to handle your request.",
                  "If you contact us via the contact form, the data you enter (name, email address, message, and optionally phone number) will be processed for the purpose of handling your request.",
                  "For the technical delivery of data entered via the contact form, we use the service EmailJS provided by EmailJS Pte. Ltd., Singapore. The personal data you enter is transmitted to EmailJS and then forwarded to us by email.",
                  "Legal basis: Art. 6(1)(b) GDPR.",
                ],
              },
              {
                label: "c) Appointment scheduling via Calendly",
                paragraphs: [
                  "To schedule appointments, we use the service Calendly provided by Calendly LLC, USA.",
                  "When using the appointment booking feature, personal data is processed to coordinate the appointment. When you access the scheduling feature, personal data (in particular the IP address) is transmitted to Calendly. If you book an appointment, the data you enter is processed to organize and conduct the appointment.",
                  "Legal basis: Art. 6(1)(b) and (f) GDPR.",
                ],
              },
              {
                label: "d) Google Ads – conversion tracking",
                paragraphs: [
                  "We use the service Google Ads provided by Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland (“Google”) to measure the effectiveness of our online advertising (conversion tracking). On certain interactions (e.g. clicking an email address, starting an appointment booking via Calendly, or opening our LinkedIn profile), it is recorded whether you previously reached the website via one of our ads.",
                  "For this purpose, Google sets cookies or comparable technologies and transmits data (in particular the IP address, information about the interaction, and a unique identifier) to Google. We do not link this data to your identity.",
                  "This processing only takes place if you have given your consent via our cookie banner. Until you consent, no marketing cookies are set; data is transmitted, if at all, without cookies and without a unique identifier (Google Consent Mode v2). You can withdraw your consent at any time with effect for the future by reopening the cookie banner via the “Cookie settings” link in the footer and changing your choice.",
                  "Legal basis: Art. 6(1)(a) GDPR in conjunction with Section 25(1) TDDDG (consent).",
                ],
              },
              {
                label: "e) Google Analytics",
                paragraphs: [
                  "We use the web analytics service Google Analytics 4 provided by Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland (“Google”) to analyze the use of our website statistically (e.g. pages viewed, time on site, approximate origin, devices used). This helps us improve our offering.",
                  "For this purpose, Google sets cookies or comparable technologies and transmits usage data (in particular a truncated IP address and information about usage behavior) to Google. We use Google Analytics with IP anonymization enabled; we do not link this data to your identity.",
                  "This processing only takes place if you have given your consent via our cookie banner. Until you consent, no analytics cookies are set; data is transmitted, if at all, without cookies (Google Consent Mode v2). You can withdraw your consent at any time with effect for the future by reopening the cookie banner via the “Cookie settings” link in the footer and changing your choice.",
                  "Legal basis: Art. 6(1)(a) GDPR in conjunction with Section 25(1) TDDDG (consent).",
                ],
              },
            ],
          },
          {
            title: "4. Recipients of data",
            paragraphs: [
              "To provide our services, we use the following service providers:",
            ],
            bullets: [
              "GitHub Pages (hosting)",
              "EmailJS (delivery of contact form messages)",
              "Calendly (appointment management)",
              "Google Ads (conversion tracking, only with consent)",
              "Google Analytics (web analytics, only with consent)",
            ],
          },
          {
            title: "5. Transfers to third countries",
            paragraphs: [
              "Processing may take place in third countries (e.g. the USA). In such cases, transfers are carried out on the basis of appropriate safeguards such as the EU Standard Contractual Clauses (SCC) or—where applicable—the EU‑US Data Privacy Framework.",
              "GitHub also processes data in the United States. Data transfers are based on the EU Standard Contractual Clauses.",
              "A transfer of data to third countries (outside the EU) cannot be ruled out. EmailJS uses appropriate safeguards pursuant to Art. 46 GDPR.",
              "Data transfers to the United States in connection with Calendly are based on the EU Standard Contractual Clauses.",
              "In connection with Google Ads and Google Analytics, data may be transferred to Google in the United States. Google LLC is certified under the EU‑US Data Privacy Framework; in addition, the EU Standard Contractual Clauses are relied upon.",
            ],
          },
          {
            title: "6. Cookies and similar technologies",
            paragraphs: [
              "Technically necessary processing is carried out by the hosting provider and to provide the basic functions of the website; no consent is required for this.",
              "We use marketing, conversion, and analytics cookies in connection with Google Ads and Google Analytics exclusively on the basis of your consent. When you first visit the website, you can decide via our cookie banner whether to allow them; without consent, no marketing or analytics cookies are set (Google Consent Mode v2). Your choice is stored locally in your browser and can be changed at any time via the “Cookie settings” link in the footer.",
              "When embedding external services (e.g. Calendly), these providers may use cookies or similar technologies.",
            ],
          },
          {
            title: "7. Storage period",
            bullets: [
              "Log data: generally up to 30 days",
              "Contact requests: 6–12 months after completion",
              "Appointment data: until the appointment has been completed",
            ],
          },
          {
            title: "8. Data subject rights",
            paragraphs: [
              "You have the right of access, rectification, erasure, restriction of processing, data portability, as well as the right to object (Art. 21 GDPR) and to withdraw any consent given.",
            ],
          },
          {
            title: "9. Right to lodge a complaint",
            paragraphs: [
              "You have the right to lodge a complaint with a data protection supervisory authority.",
            ],
          },
          {
            title: "10. Requirement to provide data",
            paragraphs: [
              "Without providing the required data (e.g. your email address), we cannot process your request.",
            ],
          },
          {
            title: "11. Automated decision-making",
            paragraphs: [
              "No automated decision-making or profiling takes place.",
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
                Datenschutz-
                <br />
                erklärung
              </span>
              <span className="hidden sm:inline">Datenschutzerklärung</span>
            </>
          ) : (
            L.title
          )
        }
      />

      <LegalSections sections={L.sections} email={email} phone={phone} />

      <div className="h-2 md:h-4" />
    </main>
  )
}
