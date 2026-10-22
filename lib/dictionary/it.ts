/**
 * Italian (Switzerland)
 *
 * Conventions: see lib/dictionary/index.ts.
 */
import type { Dictionary } from "./de.ts"

export const it: Dictionary = {
  meta: {
    title: "Reporting bexio e dashboard in 5 minuti | smiit Analytics",
    description:
      "Reporting per bexio: collegato in 5 minuti, poi vendite, bilancio, flusso di cassa e liquidità in un dashboard. Analisi IA incluse. 30 giorni gratis.",
    ogImageAlt: "smiit Analytics – Analisi per bexio",
    appCategory: "Business analytics per bexio",
    home: "Pagina iniziale",
  },

  format: {
    group: "’",
    decimal: ".",
    percent: "{n}%",
    thousands: "{n}k",
    millions: "{n} mio",
    months: ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"],
  },

  common: {
    skipLink: "Vai al contenuto",
    close: "Chiudi",
    externalHint: "(si apre in una nuova scheda)",
    homeLabel: "smiit Analytics – alla pagina iniziale",
    productName: "smiit Analytics",
  },

  language: {
    label: "Scegliere la lingua",
    current: "Lingua attuale: {language}",
    names: { de: "Deutsch", en: "English", fr: "Français", it: "Italiano" },
  },

  nav: {
    label: "Navigazione principale",
    chapters: {
      label: "Capitoli",
      items: {
        problem: "Problema",
        howItWorks: "Avvio",
        features: "Report",
        customize: "Su misura",
        ai: "IA",
        automations: "Routine",
        audiences: "Per chi",
        testimonials: "Clienti",
        pricing: "Prezzi",
        security: "Sicurezza",
        faq: "FAQ",
      },
    },
    items: {
      features: "Funzioni",
      ai: "IA",
      automations: "Automazioni",
      pricing: "Prezzi",
      faq: "FAQ",
    },
    cta: "Prova gratuita",
    login: "Login",
    menuOpen: "Apri menu",
    menuClose: "Chiudi menu",
  },

  home: {
    hero: {
      title: "Capire i Suoi dati bexio? *Bastano 5 minuti.*",
      subtitle:
        "Colleghi bexio e veda subito come sta andando la Sua azienda. Crei i report in autonomia e lasci all'IA domande e lavoro di routine.",
      ctaPrimary: "Prova gratuita di 30 giorni",
      ctaSecondary: "Guarda la demo di 2 min",
      demoTitle: "smiit Analytics in 2 minuti",
    },

    trust: {
      title: "Queste aziende lavorano con smiit Analytics",
      rating: {
        value: "5,0",
        label: "sul bexio Marketplace",
        srLabel: "su 5 stelle – vedere le recensioni (si apre in una nuova scheda)",
      },
    },

    problem: {
      eyebrow: "Il problema",
      title: "I numeri sono in bexio. *Manca la visione d'insieme.*",
      pains: [
        {
          icon: "code",
          title: "Automazioni mancanti",
          text: "Solleciti, report e analisi si fanno a mano – oppure vanno sviluppati su misura, con costi di programmazione elevati.",
        },
        {
          icon: "clock",
          title: "I report mensili richiedono ore",
          text: "Quando il report è pronto, i numeri sono già superati.",
        },
        {
          icon: "eyeOff",
          title: "Nessuna visione d'insieme nel quotidiano",
          text: "Come va il fatturato? Chi non ha ancora pagato? La risposta si trova da qualche parte in bexio.",
        },
      ],
      solution:
        "smiit Analytics preleva i Suoi dati direttamente da bexio e li trasforma in report comprensibili. In modo automatico e senza Excel.",
    },

    steps: {
      eyebrow: "Colleghi bexio in 5 minuti",
      title: "In tre passi *al reporting bexio*",
      items: [
        {
          title: "Collegare bexio",
          text: "Crei un account e colleghi bexio. Ci vogliono circa 5 minuti – senza installazione.",
          media: "IMG_STEP_1",
        },
        {
          title: "Consultare i report",
          text: "I report standard su vendite, bilancio, flusso di cassa e altro sono subito disponibili.",
          media: "IMG_STEP_2",
        },
        {
          title: "Personalizzare",
          text: "Modifichi gli indicatori con il drag & drop o chieda semplicemente all'IA.",
          media: "IMG_STEP_3",
        },
      ],
    },

    reports: {
      eyebrow: "Report standard per bexio",
      title: "Report bexio pronti. *Dal primo giorno.*",
      intro: "Dopo il collegamento, le Sue analisi più importanti sono pronte. Non deve configurare nulla.",
      tabsLabel: "Scegliere l'ambito del report",
      tabs: {
        sales: "Vendite",
        balance: "Bilancio",
        worktime: "Ore di lavoro",
        projects: "Progetti",
        cashflow: "Flusso di cassa",
      },
    },

    customize: {
      eyebrow: "Editor di dashboard",
      title: "Il Suo dashboard. *Esattamente come lo desidera.*",
      intro: "Trascini indicatori e grafici semplicemente al posto giusto. Senza programmare, senza Excel.",
      points: [
        {
          icon: "layout",
          title: "Creare report propri",
          text: "Componga indicatori e analisi come Le servono – con il drag & drop.",
        },
        {
          icon: "download",
          title: "Esportare e condividere",
          text: "Esporti i Suoi report ([EXPORT_FORMATE]) – per la riunione, la banca o il consiglio di amministrazione.",
        },
        {
          icon: "users",
          title: "Più utenti e aziende",
          text: "Inviti il Suo team e colleghi più aziende bexio in un'unica organizzazione.",
        },
      ],
      trustee: {
        title: "Per le fiduciarie: *tutti i mandanti con un solo login.*",
        text: "Colleghi le aziende bexio dei Suoi mandanti in un'unica organizzazione e li tenga tutti sotto controllo.",
      },
    },

    ai: {
      eyebrow: "Analisi IA per bexio",
      title: "Interroghi i Suoi numeri bexio. *L'IA risponde.*",
      intro:
        "Ponga domande in linguaggio del tutto normale, ad esempio «Quali clienti hanno generato più fatturato quest'anno?». L'IA risponde direttamente dai Suoi dati bexio.",
      capabilities: [
        { title: "Rispondere alle domande", text: "Risposte alle Sue domande – senza cercare e senza formule." },
        { title: "Adattare le analisi", text: "«Mostramelo per trimestre» – e l'analisi cambia." },
        { title: "Creare report completi", text: "Descriva ciò che desidera vedere. L'IA crea il report." },
      ],
      mcp: {
        badge: "Per ChatGPT, Claude & co.",
        title: "Utilizzabile anche nel Suo assistente IA abituale",
        text: "Lavora già con ChatGPT o Claude? Allora colleghi smiit Analytics direttamente. Chieda al Suo assistente il fatturato o le fatture aperte – la risposta arriva dai Suoi dati bexio.",
        link: "Come funziona?",
      },
    },

    automations: {
      eyebrow: "Automazioni per bexio",
      title: "Lavoro di routine? *Si sbriga da solo.*",
      intro: "Stabilisca una volta cosa deve succedere. smiit Analytics controlla i Suoi dati bexio e agisce per Lei.",
      flow: {
        label: "Flusso d'esempio",
        live: "Funziona in automatico",
        srSummary:
          "Flusso d'esempio: una fattura è scaduta da 14 giorni. smiit Analytics recupera da bexio il cliente e l'importo aperto e verifica se il cliente è già stato sollecitato. In caso negativo, il cliente riceve un cortese promemoria via e-mail; in caso affermativo, un secondo sollecito con termine. In seguito Lei riceve un avviso.",
        trigger: { kind: "Attivatore", title: "Fattura scaduta da 14 giorni", icon: "fileClock" },
        fetch: { kind: "Dati bexio", title: "Recuperare cliente e importo aperto", icon: "database" },
        condition: { kind: "Condizione", title: "Già sollecitato?", icon: "branch" },
        branchA: { label: "No", kind: "Azione", title: "Promemoria e-mail al cliente", icon: "mail" },
        branchB: { label: "Sì", kind: "Azione", title: "2° sollecito con termine", icon: "mailWarning" },
        notify: { kind: "Avviso", title: "Avviso per Lei", icon: "bell" },
      },
      examples: [
        {
          icon: "mail",
          title: "Promemoria di pagamento",
          text: "Ricordare ai clienti le fatture aperte in modo automatico e cortese.",
        },
        {
          icon: "calendar",
          title: "Sintesi settimanale via e-mail",
          text: "Ogni lunedì i numeri più importanti nella Sua casella di posta.",
        },
        {
          icon: "alert",
          title: "Avviso in caso di anomalie",
          text: "Un messaggio non appena un indicatore supera o scende sotto un valore da Lei stabilito.",
        },
        {
          icon: "clock",
          title: "Riepilogo del rapporto ore",
          text: "I Suoi collaboratori ricevono regolarmente una panoramica delle ore registrate.",
        },
      ],
      custom: {
        title: "Non vincolato a modelli",
        text: "Configuri qualsiasi automazione. Descriva all'IA con parole Sue cosa deve succedere – l'IA crea l'automazione per Lei.",
      },
    },

    audiences: {
      eyebrow: "Per PMI e fiduciarie",
      title: "Pensato per le persone, *non per i reparti IT.*",
      items: [
        {
          title: "Direzione di PMI",
          text: "Sa in ogni momento a che punto è la Sua azienda. Senza dover raccogliere i numeri da solo. Senza perdite di tempo.",
          media: "IMG_PERSONA_MANAGEMENT",
        },
        {
          title: "Fiduciarie e contabilità",
          text: "Tutti i mandanti con un solo login – con analisi che può mostrare direttamente ai Suoi clienti.",
          media: "IMG_PERSONA_TRUSTEE",
        },
        {
          title: "Responsabili di team",
          text: "Gli indicatori del Suo settore a colpo d'occhio – senza attendere il report mensile.",
          media: "IMG_PERSONA_TEAM_LEAD",
        },
      ],
    },

    testimonials: {
      eyebrow: "Testimonianze",
      title: "Cosa dicono i nostri clienti",
      reviewsLink: "Tutte le recensioni sul bexio Marketplace",
      items: [
        {
          quote: "[TESTIMONIAL_1_ZITAT]",
          name: "[TESTIMONIAL_1_NAME]",
          role: "[TESTIMONIAL_1_FUNKTION]",
          company: "[TESTIMONIAL_1_FIRMA]",
          image: undefined as string | undefined,
        },
        {
          quote: "[TESTIMONIAL_2_ZITAT]",
          name: "[TESTIMONIAL_2_NAME]",
          role: "[TESTIMONIAL_2_FUNKTION]",
          company: "[TESTIMONIAL_2_FIRMA]",
          image: undefined as string | undefined,
        },
        {
          quote: "[TESTIMONIAL_3_ZITAT]",
          name: "[TESTIMONIAL_3_NAME]",
          role: "[TESTIMONIAL_3_FUNKTION]",
          company: "[TESTIMONIAL_3_FIRMA]",
          image: undefined as string | undefined,
        },
      ],
    },

    pricing: {
      eyebrow: "Prezzi",
      title: "Un solo prezzo. *Per azienda bexio.*",
      intro: "Tutte le funzioni incluse. Paga per ogni azienda bexio collegata – il primo mese è gratuito.",
      billingLabel: "Scegliere la fatturazione",
      billing: {
        monthly: { label: "Mensile", note: "Fatturazione mensile" },
        yearly: { label: "Annuale", note: "Fatturazione annuale" },
      },
      savingsBadge: "–{percent}%",
      unit: "al mese per azienda bexio",
      plan: {
        name: "smiit Analytics",
        badge: "Tutte le funzioni",
        description: "Report, assistente IA e automazioni – tutto incluso.",
      },
      breakdown: {
        title: "Come si compone il prezzo",
        company: "Per azienda bexio",
        firstUser: "Primo utente per azienda",
        moreUsers: "Ogni utente supplementare",
        perMonth: "/ mese",
        free: "gratuito",
        note: "Tutti i prezzi in CHF. IVA esclusa.",
      },
      cta: "Prova gratuita di 30 giorni",
      trial: {
        badge: "Gratuito",
        title: "Primo mese gratuito",
        text: "Provi smiit Analytics per un mese – senza limitazioni.",
        features: ["Aziende illimitate", "Accesso fiduciaria", "Utenti illimitati"],
        after: "In seguito da CHF {price} al mese per azienda bexio.",
        cta: "Provi ora gratuitamente",
      },
    },

    security: {
      eyebrow: "Sicurezza e protezione dei dati",
      title: "Trasparenza *su dove si trovano i Suoi dati.*",
      items: [
        { icon: "server", title: "Hosting", text: "[HOSTING_STANDORT]" },
        { icon: "shield", title: "Protezione dei dati", text: "[DATENSCHUTZ_DSG_DSGVO]" },
        { icon: "key", title: "Accesso a bexio", text: "[BEXIO_ZUGRIFFSART]" },
      ],
      privacyLink: "All'informativa sulla protezione dei dati",
    },

    faq: {
      eyebrow: "FAQ",
      title: "Domande frequenti *su smiit Analytics*",
      items: {
        setup: {
          question: "Quanto dura la configurazione?",
          answer:
            "Dipende dalla quantità di dati nel Suo bexio. Di solito bastano circa 5 minuti: crea un account, collega bexio e vede subito i Suoi report standard. Per aziende più grandi con molte registrazioni, la prima sincronizzazione può richiedere più tempo.",
        },
        skills: {
          question: "Servono conoscenze informatiche?",
          answer:
            "No. smiit Analytics funziona nel browser, non deve installare nulla. Il collegamento a bexio si configura con pochi clic. I report si adattano con il drag & drop – oppure chieda semplicemente all'IA.",
        },
        trial: {
          question: "Cosa succede dopo i 30 giorni di prova?",
          answer:
            "Dopo 30 giorni la prova termina semplicemente – non si trasforma in un abbonamento e non viene addebitato nulla automaticamente. Se desidera continuare a usare smiit Analytics, sceglie attivamente un pacchetto. Senza pacchetto l'accesso termina. Nessun rinnovo automatico, nessuna sorpresa nascosta.",
        },
        mcp: {
          question: "Che cos'è MCP?",
          answer:
            "MCP sta per «Model Context Protocol». È uno standard aperto che permette ad assistenti IA come ChatGPT o Claude di collaborare con altri programmi. Lo si può immaginare come una presa di corrente per l'IA. Se collega smiit Analytics tramite MCP, il Suo assistente abituale risponde a domande sui Suoi dati bexio – senza che debba copiare numeri.",
        },
        data: {
          question: "Chi vede i miei dati?",
          answer:
            "Solo Lei e le persone che autorizza attivamente. Nemmeno noi di smiit Analytics vediamo i Suoi dati. Unica eccezione: in caso di richiesta di supporto possiamo chiedere un accesso limitato nel tempo – che anche Lei deve accettare attivamente. Maggiori informazioni nell'[[privacy|informativa sulla protezione dei dati]].",
        },
        cancellation: {
          question: "Come posso disdire?",
          answer:
            "Può disdire in qualsiasi momento per la fine del periodo già pagato. Con l'abbonamento mensile ciò vale per ogni periodo mensile: se si è abbonato il 10, può disdire fino al 9. L'abbonamento annuale funziona allo stesso modo, su base annua. Dettagli nelle [[terms|condizioni d'uso]].",
        },
        companies: {
          question: "Posso collegare più aziende bexio?",
          answer:
            "Sì. Per ogni organizzazione collega tutte le aziende bexio che desidera e le vede tutte con un solo login – ideale per fiduciarie con più mandanti. Paga per azienda: CHF {yearly} al mese con l'abbonamento annuale o CHF {monthly} con l'abbonamento mensile.",
        },
      },
    },

    finalCta: {
      title: "Pronto per *la visione d'insieme?*",
      text: "Colleghi bexio e veda i Suoi primi report in circa 5 minuti.",
      primary: "Prova gratuita di 30 giorni",
      secondary: "Prenota una demo",
    },
  },

  demo: {
    note: "Dati di esempio",
    keyboardHint: "Navighi tra i valori con i tasti freccia",
    banks: {
      business: "Conto aziendale CHF",
      savings: "Conto di risparmio",
      postal: "Conto postale",
      eur: "Conto EUR",
    },
    projectNames: {
      seeblick: "Nuova costruzione Seeblick",
      oldTown: "Risanamento casa centro storico",
      maintenance: "Manutenzione clienti",
      officeRhein: "Finiture interne ufficio Rhein",
      lindenhof: "Ristrutturazione studio Lindenhof",
      facadeNord: "Facciata edificio commerciale Nord",
      internal: "Interno",
      smallJobs: "Piccoli incarichi",
    },
    sales: {
      title: "Vendite",
      kpis: {
        revenue: "Fatturato",
        invoices: "Fatture",
        avgInvoice: "Valore medio fattura",
        newCustomers: "Fatturato con nuovi clienti",
      },
      revenueChart: {
        title: "Fatturato mensile con anno precedente",
        current: "Fatturato",
        previous: "Fatturato, anno precedente",
        vsPrev: "vs. anno precedente",
      },
      concentration: {
        title: "Concentrazione del fatturato per cliente",
        legend: "Fatturato",
        summary: "Top {n} = {share} del fatturato",
        share: "del fatturato",
        cumulative: "cumulato",
      },
      receivables: {
        title: "Debitori per scadenza",
        share: "delle partite aperte",
        buckets: {
          notDue: "Non scaduto",
          d1to30: "1–30 giorni",
          d31to60: "31–60 giorni",
          d61to90: "61–90 giorni",
          over90: "oltre 90 giorni",
        },
      },
      products: {
        title: "Prodotti principali per fatturato",
        share: "del fatturato",
        names: {
          maintenance: "Contratti di manutenzione",
          installation: "Installazione",
          consulting: "Consulenza",
          materials: "Materiale e ricambi",
          training: "Formazioni",
          support: "Pacchetti di supporto",
        },
      },
    },
    balance: {
      title: "Bilancio",
      kpis: {
        total: "Totale di bilancio",
        equityRatio: "Quota di capitale proprio",
        liquid: "Liquidità",
        debtRatio: "Quota di capitale di terzi",
      },
      assets: { title: "Bilancio – Attivi", column: "Attivi" },
      liabilities: { title: "Bilancio – Passivi", column: "Passivi" },
      group: "Gruppo di conti",
      total: "Totale",
      expand: "espandi",
      collapse: "comprimi",
      groups: {
        current: "Attivo circolante",
        fixed: "Attivo fisso",
        shortTerm: "Capitale di terzi a breve termine",
        longTerm: "Capitale di terzi a lungo termine",
        equity: "Capitale proprio",
      },
      accounts: {
        cash: "Liquidità",
        receivables: "Crediti da forniture e prestazioni",
        inventory: "Scorte",
        prepaid: "Ratei e risconti attivi",
        movables: "Immobilizzazioni materiali mobiliari",
        realEstate: "Immobilizzazioni materiali immobiliari",
        financial: "Immobilizzazioni finanziarie",
        payables: "Debiti per forniture e prestazioni",
        interestBearing: "Debiti onerosi a breve termine",
        otherShortTerm: "Altri debiti a breve termine",
        bankLoan: "Prestito bancario",
        provisions: "Accantonamenti",
        shareCapital: "Capitale sociale",
        legalReserve: "Riserva legale da utili",
        retained: "Utile riportato",
        profit: "Utile d'esercizio",
      },
      banks: {
        chartTitle: "Saldo bancario per conto",
        tableTitle: "Conti bancari",
        date: "Ultimo movimento",
        account: "Conto bancario",
        balance: "Saldo",
        movements: "Movimenti",
        share: "del saldo bancario",
      },
    },
    worktime: {
      title: "Ore di lavoro",
      unit: "h",
      kpis: {
        hours: "Ore",
        billable: "Ore fatturabili",
        utilization: "Tasso di occupazione",
        overtime: "Ore in più/in meno",
      },
      monthly: { title: "Ore per mese", hours: "Ore", billable: "Ore fatturabili" },
      services: {
        title: "Ore per prestazione",
        share: "delle ore",
        names: {
          execution: "Esecuzione",
          administration: "Amministrazione",
          planning: "Pianificazione",
          consulting: "Consulenza",
        },
      },
      employees: { title: "Ore per collaboratore", share: "delle ore" },
      projects: { title: "Ore per progetto", share: "delle ore" },
    },
    projects: {
      title: "Progetti",
      kpis: {
        projects: "Progetti",
        active: "Progetti attivi",
        budget: "Budget di progetto",
        open: "Budget residuo",
      },
      gantt: {
        title: "Progetti nel tempo",
        today: "Oggi",
        status: { done: "Concluso", active: "Attivo", planned: "Pianificato" },
        progress: "Avanzamento",
        lead: "Capoprogetto",
      },
      scatter: {
        title: "Budget vs. fatturato per progetto",
        x: "Budget di progetto",
        y: "Fatturato",
        reference: "100% del budget",
      },
      utilization: {
        title: "Utilizzo del budget per progetto",
        ratio: "Utilizzo",
        over: "oltre il budget",
        budget: "Budget",
        invoiced: "Fatturato",
      },
    },
    cashflow: {
      title: "Flusso di cassa",
      kpis: {
        inflows: "Incassi",
        outflows: "Pagamenti",
        net: "Variazione netta di liquidità",
        days: "Ø giorni fino all'incasso",
        daysUnit: "giorni",
      },
      flows: { title: "Entrate e uscite per mese", inflows: "Entrate", outflows: "Uscite", net: "Variazione netta" },
      waterfall: {
        title: "Andamento della liquidità per mese",
        up: "Aumento",
        down: "Diminuzione",
        total: "Totale",
        cumulative: "cumulato",
      },
      banks: { title: "Variazione netta per conto bancario" },
      overdue: { title: "Crediti scaduti per cliente", share: "dei crediti scaduti" },
    },
  },

  footer: {
    tagline: "Analisi comprensibili per bexio – per PMI svizzere e fiduciarie.",
    productOf: "Un prodotto di",
    company: "smiit GmbH",
    contactTitle: "Contatto",
    legalTitle: "Note legali",
    productTitle: "Prodotto",
    linkedin: "LinkedIn",
    copyright: "smiit GmbH. Tutti i diritti riservati.",
  },

  legal: {
    legalNotice: {
      nav: "Note legali",
      title: "Note legali",
      description: "Note legali di smiit Analytics, un prodotto di smiit GmbH: indirizzo, direzione, registro di commercio e contatti.",
      subtitle: "Informazioni ai sensi del § 5 della legge tedesca sui servizi digitali (DDG)",
      contact: "Contatto",
      phone: "Telefono",
      email: "E-mail",
      representedBy: "Rappresentata da",
      managingDirectors: "Amministratori",
      register: "Registro di commercio",
      registerCourt: "Tribunale locale (Amtsgericht) di Ulma",
      vatId: "Partita IVA",
      responsible: "Responsabile dei contenuti (§ 18 cpv. 2 MStV)",
      dispute: "Risoluzione delle controversie",
      disputeText:
        "Non siamo tenuti a partecipare a procedure di risoluzione delle controversie dinanzi a un organo di conciliazione per i consumatori e non vi partecipiamo.",
      country: "Germania",
    },
    privacy: {
      nav: "Protezione dei dati",
      title: "Informativa sulla protezione dei dati",
      description: "Informativa sulla protezione dei dati di smiit Analytics.",
      body: "[DATENSCHUTZ_TEXT]",
    },
    terms: {
      nav: "Condizioni d'uso",
      title: "Condizioni d'uso",
      description: "Condizioni d'uso di smiit Analytics.",
      body: "[NUTZUNGSBEDINGUNGEN_TEXT]",
    },
    dpa: {
      nav: "Trattamento su mandato",
      title: "Contratto di trattamento dei dati su mandato",
      description: "Contratto di trattamento dei dati su mandato per smiit Analytics.",
      body: "[AVV_TEXT]",
    },
  },

  notFound: {
    title: "Pagina non trovata",
    text: "Purtroppo la pagina che cerca non esiste.",
    cta: "Alla pagina iniziale",
    imageAlt: "Due persone sedute su dei cubi lavorano al laptop",
  },

  error: {
    title: "Qualcosa è andato storto",
    text: "Si è verificato un errore durante il caricamento di questa pagina. La preghiamo di riprovare.",
    retry: "Riprova",
    home: "Torna alla pagina iniziale",
  },

  consent: {
    label: "Avviso sui cookie",
    text: "[CONSENT_TEXT]",
    accept: "Accetta",
    decline: "Rifiuta",
    more: "Maggiori informazioni",
  },

  illustrations: {
    connect: {
      title: "Collegare fonte dati",
      text: ["Colleghi una fonte dati a questo workspace", "per creare il Suo primo report."],
      bexio: "Colleghi la Sua azienda bexio.",
    },
    packages: {
      names: ["Standard", "Vendite", "Finanze", "Direzione"],
      ready: "Pronto",
    },
    editor: {
      elements: "Elementi",
      items: ["KPI", "Linea", "Barre", "Tabella"],
      revenue: "Ricavi",
      invoices: "Fatture",
      drop: "Rilascia qui",
      prompt: "Mostrami i ricavi per trimestre",
    },
    workspaces: {
      account: "Il Suo account",
      clients: "Mandanti",
      create: "Crea workspace",
      report: "Vendite",
      revenue: "Ricavi",
      invoices: "Fatture",
    },
    owner: {
      overview: "Panoramica",
      revenueMonth: "Ricavi mese",
      vsPrev: "{change} vs. anno prec.",
      openInvoices: "Fatture aperte",
      revenueYear: "Ricavi 12 mesi",
      weekly: "Sintesi settimana",
      weeklyText: "Ricavi {change} vs. anno prec.",
      paid: "Pagamento ricevuto",
      monthly: "Report mensile pronto",
      monthlyText: "Creato automaticamente",
    },
    trustee: {
      revenue: "Ricavi",
      open: "Aperto",
      export: "Esporta",
    },
    teamLead: {
      title: "Il mio team",
      subtitle: "Montaggio · ultimi 12 mesi",
      utilization: "Occupazione",
      billable: "Fatturabile",
      of: "di {total}",
      perPerson: "Ore per persona",
    },
  },

  media: {
    VIDEO_HERO: "Visita guidata di smiit Analytics: dashboard con fatturato, fatture aperte e indicatori",
    VIDEO_DEMO_FULL: "Demo del prodotto smiit Analytics",
    LOGO_1: "[LOGO_1_FIRMENNAME]",
    LOGO_2: "[LOGO_2_FIRMENNAME]",
    LOGO_3: "[LOGO_3_FIRMENNAME]",
    LOGO_4: "[LOGO_4_FIRMENNAME]",
    LOGO_5: "[LOGO_5_FIRMENNAME]",
    IMG_STEP_1: "Creare il collegamento a bexio in smiit Analytics",
    IMG_STEP_2: "Panoramica dei report con i pacchetti Standard, Vendite, Finanze e Direzione, tutti pronti",
    IMG_STEP_3: "Un report viene adattato con il drag & drop",
    VIDEO_DRAGDROP: "Un indicatore viene trascinato in un report",
    IMG_MULTI_COMPANY:
      "Un solo login per la fiduciaria: elenco dei workspace con tutti i mandanti, un clic apre il report del mandante scelto",
    VIDEO_AI_CHAT: "Domanda all'IA e risposta sotto forma di grafico",
    IMG_PERSONA_MANAGEMENT:
      "Smartphone con fatturato e fatture aperte, accanto avvisi automatici come sintesi settimanale e pagamento ricevuto",
    IMG_PERSONA_TRUSTEE: "Report di più mandanti sovrapposti, quello in primo piano con il pulsante Esporta",
    IMG_PERSONA_TEAM_LEAD: "Vista del reparto con occupazione del team e ore per persona",
  },
}
