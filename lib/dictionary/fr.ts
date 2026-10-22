/**
 * French (Switzerland)
 *
 * Conventions: see lib/dictionary/index.ts.
 */
import type { Dictionary } from "./de.ts"

export const fr: Dictionary = {
  meta: {
    title: "Reporting bexio & tableaux de bord | smiit Analytics",
    description:
      "Reporting pour bexio : connecté en 5 minutes, puis ventes, bilan, cash-flow et liquidités dans un tableau de bord. Analyses IA incluses. 30 jours gratuits.",
    ogImageAlt: "smiit Analytics – analyses pour bexio",
    appCategory: "Business analytics pour bexio",
    home: "Accueil",
  },

  format: {
    group: " ",
    decimal: ",",
    percent: "{n} %",
    thousands: "{n} k",
    millions: "{n} mio",
    months: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
  },

  common: {
    skipLink: "Aller au contenu",
    close: "Fermer",
    externalHint: "(s'ouvre dans un nouvel onglet)",
    homeLabel: "smiit Analytics – vers l'accueil",
    productName: "smiit Analytics",
  },

  language: {
    label: "Choisir la langue",
    current: "Langue actuelle : {language}",
    names: { de: "Deutsch", en: "English", fr: "Français", it: "Italiano" },
  },

  nav: {
    label: "Navigation principale",
    chapters: {
      label: "Chapitres",
      items: {
        problem: "Problème",
        howItWorks: "Démarrage",
        features: "Rapports",
        customize: "Sur mesure",
        ai: "IA",
        automations: "Routines",
        audiences: "Pour qui",
        testimonials: "Clients",
        pricing: "Prix",
        security: "Sécurité",
        faq: "FAQ",
      },
    },
    items: {
      features: "Fonctions",
      ai: "IA",
      automations: "Automatisations",
      pricing: "Prix",
      faq: "FAQ",
    },
    cta: "Essai gratuit",
    login: "Connexion",
    menuOpen: "Ouvrir le menu",
    menuClose: "Fermer le menu",
  },

  home: {
    hero: {
      title: "Vos données bexio. *En 5 minutes*, tout est clair.",
      subtitle:
        "Connectez bexio et voyez immédiatement où en est votre entreprise. Créez vos propres rapports et confiez les questions et les tâches répétitives à l'IA.",
      ctaPrimary: "Essai gratuit de 30 jours",
      ctaSecondary: "Voir la démo de 2 min",
      demoTitle: "smiit Analytics en 2 minutes",
    },

    trust: {
      title: "Ces entreprises travaillent avec smiit Analytics",
      rating: {
        value: "5,0",
        label: "sur le bexio Marketplace",
        srLabel: "sur 5 étoiles – voir les avis (s'ouvre dans un nouvel onglet)",
      },
    },

    problem: {
      eyebrow: "Le problème",
      title: "Les chiffres sont dans bexio. *La vue d'ensemble manque.*",
      pains: [
        {
          icon: "code",
          title: "Automatisations manquantes",
          text: "Relances, rapports et analyses se font à la main – ou doivent être développés sur mesure, avec des coûts de programmation élevés.",
        },
        {
          icon: "clock",
          title: "Des heures pour chaque rapport mensuel",
          text: "Quand le rapport est prêt, les chiffres sont déjà dépassés.",
        },
        {
          icon: "eyeOff",
          title: "Aucune vue d'ensemble au quotidien",
          text: "Comment évolue le chiffre d'affaires ? Qui n'a pas encore payé ? La réponse se cache quelque part dans bexio.",
        },
      ],
      solution:
        "smiit Analytics récupère vos données directement dans bexio et en fait des rapports clairs. Automatiquement et sans Excel.",
    },

    steps: {
      eyebrow: "Connecter bexio en 5 minutes",
      title: "Trois étapes *vers le reporting bexio*",
      items: [
        {
          title: "Connecter bexio",
          text: "Créez un compte et connectez bexio. Cela prend environ 5 minutes – sans installation.",
          media: "IMG_STEP_1",
        },
        {
          title: "Consulter les rapports",
          text: "Des rapports standard sur les ventes, le bilan, le cash-flow et plus encore sont disponibles aussitôt.",
          media: "IMG_STEP_2",
        },
        {
          title: "Personnaliser",
          text: "Modifiez les indicateurs par glisser-déposer ou demandez simplement à l'IA.",
          media: "IMG_STEP_3",
        },
      ],
    },

    reports: {
      eyebrow: "Rapports standard pour bexio",
      title: "Des rapports bexio prêts à l'emploi. *Dès le premier jour.*",
      intro: "Une fois la connexion établie, vos principales analyses sont prêtes. Vous n'avez rien à configurer.",
      tabsLabel: "Choisir le domaine du rapport",
      tabs: {
        sales: "Ventes",
        balance: "Bilan",
        worktime: "Temps de travail",
        projects: "Projets",
        cashflow: "Cash-flow",
      },
    },

    customize: {
      eyebrow: "Éditeur de tableaux de bord",
      title: "Votre tableau de bord. *Exactement comme vous le souhaitez.*",
      intro: "Placez simplement indicateurs et graphiques au bon endroit. Sans programmation, sans Excel.",
      points: [
        {
          icon: "layout",
          title: "Créer vos propres rapports",
          text: "Assemblez les indicateurs et analyses dont vous avez besoin – par glisser-déposer.",
        },
        {
          icon: "download",
          title: "Exporter et partager",
          text: "Exportez vos rapports ([EXPORT_FORMATE]) – pour la séance, la banque ou le conseil d'administration.",
        },
        {
          icon: "users",
          title: "Plusieurs utilisateurs et entreprises",
          text: "Invitez votre équipe et connectez plusieurs entreprises bexio dans une même organisation.",
        },
      ],
      trustee: {
        title: "Pour les fiduciaires : *tous vos mandants en un seul login.*",
        text: "Connectez les entreprises bexio de vos mandants dans une même organisation et gardez-les toutes à l'œil.",
      },
    },

    ai: {
      eyebrow: "Analyse IA pour bexio",
      title: "Interrogez vos chiffres bexio. *L'IA répond.*",
      intro:
        "Posez vos questions en langage courant, par exemple «Quels clients ont généré le plus de chiffre d'affaires cette année ?». L'IA répond directement à partir de vos données bexio.",
      capabilities: [
        { title: "Répondre aux questions", text: "Des réponses à vos questions – sans chercher ni écrire de formules." },
        { title: "Adapter les analyses", text: "«Montre-moi cela par trimestre» – et l'analyse s'adapte." },
        { title: "Créer des rapports entiers", text: "Décrivez ce que vous voulez voir. L'IA construit le rapport." },
      ],
      mcp: {
        badge: "Pour ChatGPT, Claude & co.",
        title: "Aussi utilisable dans votre assistant IA habituel",
        text: "Vous travaillez déjà avec ChatGPT ou Claude ? Connectez-y directement smiit Analytics. Interrogez votre assistant sur le chiffre d'affaires ou les factures ouvertes – il trouve la réponse dans vos données bexio.",
        link: "Comment ça marche ?",
      },
    },

    automations: {
      eyebrow: "Automatisations pour bexio",
      title: "Les tâches répétitives ? *Elles se font toutes seules.*",
      intro: "Définissez une fois ce qui doit se passer. smiit Analytics vérifie vos données bexio et agit pour vous.",
      flow: {
        label: "Exemple de déroulement",
        live: "Fonctionne automatiquement",
        srSummary:
          "Exemple de déroulement : une facture est en retard de 14 jours. smiit Analytics récupère le client et le montant ouvert dans bexio et vérifie si le client a déjà reçu un rappel. Si non, un e-mail de rappel aimable est envoyé au client ; si oui, un deuxième rappel avec délai. Vous recevez ensuite une information.",
        trigger: { kind: "Déclencheur", title: "Facture en retard de 14 jours", icon: "fileClock" },
        fetch: { kind: "Données bexio", title: "Récupérer client et montant ouvert", icon: "database" },
        condition: { kind: "Condition", title: "Déjà relancé ?", icon: "branch" },
        branchA: { label: "Non", kind: "Action", title: "E-mail de rappel au client", icon: "mail" },
        branchB: { label: "Oui", kind: "Action", title: "2e rappel avec délai", icon: "mailWarning" },
        notify: { kind: "Info", title: "Information pour vous", icon: "bell" },
      },
      examples: [
        {
          icon: "mail",
          title: "Rappels de paiement",
          text: "Rappeler automatiquement et aimablement les factures ouvertes à vos clients.",
        },
        {
          icon: "calendar",
          title: "Aperçu hebdomadaire par e-mail",
          text: "Chaque lundi, les chiffres clés dans votre boîte de réception.",
        },
        {
          icon: "alert",
          title: "Alerte en cas d'anomalie",
          text: "Un message dès qu'un indicateur dépasse une valeur que vous avez définie ou passe en dessous.",
        },
        {
          icon: "clock",
          title: "Résumé des heures saisies",
          text: "Vos collaborateurs reçoivent régulièrement un aperçu de leurs heures saisies.",
        },
      ],
      custom: {
        title: "Pas limité aux modèles",
        text: "Configurez toutes les automatisations que vous voulez. Décrivez à l'IA avec vos propres mots ce qui doit se passer – elle crée l'automatisation pour vous.",
      },
    },

    audiences: {
      eyebrow: "Pour les PME et les fiduciaires",
      title: "Conçu pour les personnes, *pas pour les services informatiques.*",
      items: [
        {
          title: "Direction de PME",
          text: "Vous savez à tout moment où en est votre entreprise. Sans rassembler vous-même les chiffres. Sans y passer du temps.",
          media: "IMG_PERSONA_MANAGEMENT",
        },
        {
          title: "Fiduciaire et comptabilité",
          text: "Tous vos mandants en un seul login – avec des analyses que vous pouvez montrer directement à vos clients.",
          media: "IMG_PERSONA_TRUSTEE",
        },
        {
          title: "Responsable d'équipe",
          text: "Les indicateurs de votre secteur en un coup d'œil – sans attendre le rapport mensuel.",
          media: "IMG_PERSONA_TEAM_LEAD",
        },
      ],
    },

    testimonials: {
      eyebrow: "Témoignages",
      title: "Ce que disent nos clients",
      reviewsLink: "Tous les avis sur le bexio Marketplace",
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
      eyebrow: "Prix",
      title: "Un seul prix. *Par entreprise bexio.*",
      intro: "Toutes les fonctions incluses. Vous payez par entreprise bexio connectée – le premier mois est gratuit.",
      billingLabel: "Choisir la facturation",
      billing: {
        monthly: { label: "Mensuel", note: "Facturation mensuelle" },
        yearly: { label: "Annuel", note: "Facturation annuelle" },
      },
      savingsBadge: "–{percent} %",
      unit: "par mois et par entreprise bexio",
      plan: {
        name: "smiit Analytics",
        badge: "Toutes les fonctions",
        description: "Rapports, assistant IA et automatisations – tout est inclus.",
      },
      breakdown: {
        title: "Composition du prix",
        company: "Par entreprise bexio",
        firstUser: "Premier utilisateur par entreprise",
        moreUsers: "Chaque utilisateur supplémentaire",
        perMonth: "/ mois",
        free: "gratuit",
        note: "Tous les prix en CHF. TVA non comprise.",
      },
      cta: "Essai gratuit de 30 jours",
      trial: {
        badge: "Gratuit",
        title: "Premier mois offert",
        text: "Testez smiit Analytics pendant un mois – sans restriction.",
        features: ["Entreprises illimitées", "Accès fiduciaire", "Utilisateurs illimités"],
        after: "Ensuite dès CHF {price} par mois et par entreprise bexio.",
        cta: "Essayer gratuitement",
      },
    },

    security: {
      eyebrow: "Sécurité et protection des données",
      title: "Transparence *sur l'emplacement de vos données.*",
      items: [
        { icon: "server", title: "Hébergement", text: "[HOSTING_STANDORT]" },
        { icon: "shield", title: "Protection des données", text: "[DATENSCHUTZ_DSG_DSGVO]" },
        { icon: "key", title: "Accès à bexio", text: "[BEXIO_ZUGRIFFSART]" },
      ],
      privacyLink: "Vers la déclaration de protection des données",
    },

    faq: {
      eyebrow: "FAQ",
      title: "Questions fréquentes *sur smiit Analytics*",
      items: {
        setup: {
          question: "Combien de temps prend la mise en place ?",
          answer:
            "Cela dépend du volume de données dans votre bexio. En général, comptez environ 5\u00A0minutes\u00A0: vous créez un compte, connectez bexio et voyez ensuite vos rapports standard. Pour les grandes entreprises avec de nombreuses écritures, la première synchronisation peut prendre plus de temps.",
        },
        skills: {
          question: "Ai-je besoin de connaissances informatiques ?",
          answer:
            "Non. smiit Analytics fonctionne dans le navigateur, vous n'installez rien. La connexion à bexio se configure en quelques clics. Vous adaptez les rapports par glisser-déposer – ou vous demandez simplement à l'IA.",
        },
        trial: {
          question: "Que se passe-t-il après les 30 jours d'essai ?",
          answer:
            "Après 30\u00A0jours, l'essai prend simplement fin – il ne se transforme pas en abonnement et rien n'est facturé automatiquement. Pour continuer à utiliser smiit Analytics, vous choisissez activement une formule. Sans formule, l'accès prend fin. Pas de renouvellement automatique, pas de piège caché.",
        },
        mcp: {
          question: "Qu'est-ce que MCP ?",
          answer:
            "MCP signifie «Model Context Protocol». C'est un standard ouvert qui permet à des assistants IA comme ChatGPT ou Claude de collaborer avec d'autres programmes. On peut se le représenter comme une prise électrique pour l'IA. Si vous connectez smiit Analytics via MCP, votre assistant habituel répond aux questions sur vos données bexio – sans que vous ayez à copier des chiffres.",
        },
        data: {
          question: "Qui voit mes données ?",
          answer:
            "Uniquement vous et les personnes que vous autorisez activement. Même nous, chez smiit Analytics, ne voyons pas vos données. Seule exception\u00A0: lors d'une demande d'assistance, nous pouvons solliciter un accès limité dans le temps – que vous devez également accepter activement. Plus d'informations dans la [[privacy|déclaration de protection des données]].",
        },
        cancellation: {
          question: "Comment puis-je résilier ?",
          answer:
            "Vous pouvez résilier à tout moment pour la fin de la période déjà payée. Avec l'abonnement mensuel, cela vaut pour chaque période mensuelle\u00A0: si vous vous êtes abonné le 10, vous pouvez résilier jusqu'au 9. L'abonnement annuel fonctionne de la même manière, par année. Détails dans les [[terms|conditions d'utilisation]].",
        },
        companies: {
          question: "Puis-je connecter plusieurs entreprises bexio ?",
          answer:
            "Oui. Par organisation, vous connectez autant d'entreprises bexio que vous le souhaitez et les voyez toutes en un seul login – idéal pour les fiduciaires avec plusieurs mandants. Vous payez par entreprise : CHF {yearly} par mois en abonnement annuel ou CHF {monthly} en abonnement mensuel.",
        },
      },
    },

    finalCta: {
      title: "Prêt pour *la vue d'ensemble ?*",
      text: "Connectez bexio et découvrez vos premiers rapports en 5 minutes environ.",
      primary: "Essai gratuit de 30 jours",
      secondary: "Réserver une démo",
    },
  },

  demo: {
    note: "Données fictives",
    keyboardHint: "Naviguer entre les valeurs avec les touches fléchées",
    banks: {
      business: "Compte courant CHF",
      savings: "Compte d'épargne",
      postal: "Compte postal",
      eur: "Compte EUR",
    },
    projectNames: {
      seeblick: "Construction Seeblick",
      oldTown: "Rénovation maison vieille ville",
      maintenance: "Maintenance clients",
      officeRhein: "Aménagement bureau Rhein",
      lindenhof: "Transformation cabinet Lindenhof",
      facadeNord: "Façade bâtiment commercial Nord",
      internal: "Interne",
      smallJobs: "Petits mandats",
    },
    sales: {
      title: "Ventes",
      kpis: {
        revenue: "Chiffre d'affaires",
        invoices: "Factures",
        avgInvoice: "Valeur moy. des factures",
        newCustomers: "CA nouveaux clients",
      },
      revenueChart: {
        title: "Chiffre d'affaires mensuel vs année précédente",
        current: "Chiffre d'affaires",
        previous: "Chiffre d'affaires, année préc.",
        vsPrev: "vs année précédente",
      },
      concentration: {
        title: "Concentration du chiffre d'affaires par client",
        legend: "Chiffre d'affaires",
        summary: "Top {n} = {share} du chiffre d'affaires",
        share: "du chiffre d'affaires",
        cumulative: "cumulé",
      },
      receivables: {
        title: "Débiteurs par échéance",
        share: "des postes ouverts",
        buckets: {
          notDue: "Non échu",
          d1to30: "1–30 jours",
          d31to60: "31–60 jours",
          d61to90: "61–90 jours",
          over90: "plus de 90 jours",
        },
      },
      products: {
        title: "Top produits par chiffre d'affaires",
        share: "du chiffre d'affaires",
        names: {
          maintenance: "Contrats de maintenance",
          installation: "Installation",
          consulting: "Conseil",
          materials: "Matériel et pièces de rechange",
          training: "Formations",
          support: "Forfaits de support",
        },
      },
    },
    balance: {
      title: "Bilan",
      kpis: {
        total: "Total du bilan",
        equityRatio: "Taux de fonds propres",
        liquid: "Liquidités",
        debtRatio: "Taux d'endettement",
      },
      assets: { title: "Bilan – Actifs", column: "Actifs" },
      liabilities: { title: "Bilan – Passifs", column: "Passifs" },
      group: "Groupe de comptes",
      total: "Total",
      expand: "déplier",
      collapse: "replier",
      groups: {
        current: "Actifs circulants",
        fixed: "Actifs immobilisés",
        shortTerm: "Capitaux étrangers à court terme",
        longTerm: "Capitaux étrangers à long terme",
        equity: "Capitaux propres",
      },
      accounts: {
        cash: "Liquidités",
        receivables: "Créances résultant de ventes et de prestations de services",
        inventory: "Stocks",
        prepaid: "Actifs de régularisation",
        movables: "Immobilisations corporelles meubles",
        realEstate: "Immobilisations corporelles immeubles",
        financial: "Immobilisations financières",
        payables: "Dettes résultant d'achats et de prestations de services",
        interestBearing: "Dettes à court terme portant intérêt",
        otherShortTerm: "Autres dettes à court terme",
        bankLoan: "Prêt bancaire",
        provisions: "Provisions",
        shareCapital: "Capital social",
        legalReserve: "Réserve légale issue du bénéfice",
        retained: "Bénéfice reporté",
        profit: "Bénéfice de l'exercice",
      },
      banks: {
        chartTitle: "Avoirs bancaires par compte",
        tableTitle: "Comptes bancaires",
        date: "Dernier mouvement",
        account: "Compte bancaire",
        balance: "Solde",
        movements: "Mouvements",
        share: "des avoirs bancaires",
      },
    },
    worktime: {
      title: "Temps de travail",
      unit: "h",
      kpis: {
        hours: "Heures",
        billable: "Heures facturables",
        utilization: "Taux d'occupation",
        overtime: "Heures sup./manquantes",
      },
      monthly: { title: "Heures par mois", hours: "Heures", billable: "Heures facturables" },
      services: {
        title: "Heures par prestation",
        share: "des heures",
        names: {
          execution: "Exécution",
          administration: "Administration",
          planning: "Planification",
          consulting: "Conseil",
        },
      },
      employees: { title: "Heures par collaborateur", share: "des heures" },
      projects: { title: "Heures par projet", share: "des heures" },
    },
    projects: {
      title: "Projets",
      kpis: {
        projects: "Projets",
        active: "Projets actifs",
        budget: "Budget des projets",
        open: "Budget restant",
      },
      gantt: {
        title: "Projets dans le temps",
        today: "Aujourd'hui",
        status: { done: "Terminé", active: "Actif", planned: "Planifié" },
        progress: "Avancement",
        lead: "Direction de projet",
      },
      scatter: {
        title: "Budget vs facturé par projet",
        x: "Budget du projet",
        y: "Facturé",
        reference: "100 % du budget",
      },
      utilization: {
        title: "Utilisation du budget par projet",
        ratio: "Utilisation",
        over: "hors budget",
        budget: "Budget",
        invoiced: "Facturé",
      },
    },
    cashflow: {
      title: "Cash-flow",
      kpis: {
        inflows: "Encaissements",
        outflows: "Décaissements",
        net: "Variation nette de trésorerie",
        days: "Délai moy. d'encaissement",
        daysUnit: "jours",
      },
      flows: { title: "Entrées et sorties par mois", inflows: "Entrées", outflows: "Sorties", net: "Variation nette" },
      waterfall: { title: "Évolution de la trésorerie par mois", up: "Hausse", down: "Baisse", total: "Total", cumulative: "cumulé" },
      banks: { title: "Variation nette par compte bancaire" },
      overdue: { title: "Créances échues par client", share: "des créances échues" },
    },
  },

  footer: {
    tagline: "Des analyses claires pour bexio – pour les PME et fiduciaires suisses.",
    productOf: "Un produit de",
    company: "smiit GmbH",
    contactTitle: "Contact",
    legalTitle: "Informations légales",
    productTitle: "Produit",
    linkedin: "LinkedIn",
    copyright: "smiit GmbH. Tous droits réservés.",
  },

  legal: {
    legalNotice: {
      nav: "Mentions légales",
      title: "Mentions légales",
      description:
        "Mentions légales de smiit Analytics, un produit de smiit GmbH\u00A0: adresse, direction, registre du commerce et contact.",
      subtitle: "Informations selon le § 5 de la loi allemande sur les services numériques (DDG)",
      contact: "Contact",
      phone: "Téléphone",
      email: "E-mail",
      representedBy: "Représentée par",
      managingDirectors: "Gérants",
      register: "Registre du commerce",
      registerCourt: "Tribunal d'instance (Amtsgericht) d'Ulm",
      vatId: "Numéro de TVA",
      responsible: "Responsable du contenu (§ 18, al. 2 MStV)",
      dispute: "Règlement des litiges",
      disputeText:
        "Nous ne sommes pas tenus de participer à une procédure de règlement des litiges devant un organe de conciliation pour les consommateurs et n'y participons pas.",
      country: "Allemagne",
    },
    privacy: {
      nav: "Protection des données",
      title: "Déclaration de protection des données",
      description: "Déclaration de protection des données de smiit Analytics.",
      body: "[DATENSCHUTZ_TEXT]",
    },
    terms: {
      nav: "Conditions d'utilisation",
      title: "Conditions d'utilisation",
      description: "Conditions d'utilisation de smiit Analytics.",
      body: "[NUTZUNGSBEDINGUNGEN_TEXT]",
    },
    dpa: {
      nav: "Sous-traitance",
      title: "Contrat de sous-traitance des données",
      description: "Contrat de sous-traitance des données pour smiit Analytics.",
      body: "[AVV_TEXT]",
    },
  },

  notFound: {
    title: "Page introuvable",
    text: "La page que vous recherchez n'existe malheureusement pas.",
    cta: "Vers l'accueil",
    imageAlt: "Deux personnes assises sur des cubes travaillent sur un ordinateur portable",
  },

  error: {
    title: "Une erreur s'est produite",
    text: "Une erreur est survenue lors du chargement de cette page. Veuillez réessayer.",
    retry: "Réessayer",
    home: "Retour à l'accueil",
  },

  consent: {
    label: "Avis sur les cookies",
    text: "[CONSENT_TEXT]",
    accept: "Accepter",
    decline: "Refuser",
    more: "En savoir plus",
  },

  illustrations: {
    connect: {
      title: "Connecter une source",
      text: ["Connectez une source de données à ce workspace", "pour créer votre premier rapport."],
      bexio: "Connectez votre entreprise bexio.",
    },
    packages: {
      names: ["Standard", "Ventes", "Finances", "Direction"],
      ready: "Prêt",
    },
    editor: {
      elements: "Éléments",
      items: ["KPI", "Ligne", "Barres", "Tableau"],
      revenue: "Chiffre d'affaires",
      invoices: "Factures",
      drop: "Déposer ici",
      prompt: "Montre-moi le chiffre d'affaires par trimestre",
    },
    workspaces: {
      account: "Votre compte",
      clients: "Mandants",
      create: "Créer un workspace",
      report: "Ventes",
      revenue: "Chiffre d'affaires",
      invoices: "Factures",
    },
    owner: {
      overview: "Aperçu",
      revenueMonth: "CA du mois",
      vsPrev: "{change} sur un an",
      openInvoices: "Factures ouvertes",
      revenueYear: "CA 12 mois",
      weekly: "Aperçu hebdo",
      weeklyText: "CA {change} sur un an",
      paid: "Paiement reçu",
      monthly: "Rapport mensuel prêt",
      monthlyText: "Créé automatiquement",
    },
    trustee: {
      revenue: "CA",
      open: "Ouvert",
      export: "Exporter",
    },
    teamLead: {
      title: "Mon secteur",
      subtitle: "Montage · 12 derniers mois",
      utilization: "Occupation",
      billable: "Facturable",
      of: "sur {total}",
      perPerson: "Heures/personne",
    },
  },

  media: {
    VIDEO_HERO: "Visite de smiit Analytics : tableau de bord avec chiffre d'affaires, factures ouvertes et indicateurs",
    VIDEO_DEMO_FULL: "Démo produit de smiit Analytics",
    LOGO_1: "[LOGO_1_FIRMENNAME]",
    LOGO_2: "[LOGO_2_FIRMENNAME]",
    LOGO_3: "[LOGO_3_FIRMENNAME]",
    LOGO_4: "[LOGO_4_FIRMENNAME]",
    LOGO_5: "[LOGO_5_FIRMENNAME]",
    IMG_STEP_1: "Établir la connexion bexio dans smiit Analytics",
    IMG_STEP_2: "Aperçu des rapports avec les forfaits Standard, Ventes, Finances et Direction, tous prêts",
    IMG_STEP_3: "Rapport personnalisé par glisser-déposer",
    VIDEO_DRAGDROP: "Un indicateur est glissé-déposé dans un rapport",
    IMG_MULTI_COMPANY:
      "Un seul login pour la fiduciaire : liste des workspaces avec tous les mandants, un clic ouvre le rapport du mandant choisi",
    VIDEO_AI_CHAT: "Question à l'IA et réponse sous forme de graphique",
    IMG_PERSONA_MANAGEMENT:
      "Smartphone avec chiffre d'affaires et factures ouvertes, à côté des notifications automatiques comme l'aperçu hebdomadaire et le paiement reçu",
    IMG_PERSONA_TRUSTEE: "Rapports de plusieurs mandants superposés, celui du premier plan avec un bouton Exporter",
    IMG_PERSONA_TEAM_LEAD: "Vue du secteur avec taux d'occupation de l'équipe et heures par personne",
  },
}
