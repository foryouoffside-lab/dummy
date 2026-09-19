import ConcentrationGridClient from '@/app/drills/cognitive/focus/concentration-grid/ConcentrationGridClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — de-DE (concentration-grid / schulte-tabelle)
// PRIMARY:  "Schulte-Tabelle"                 — Top DACH psychodiagnostic query
//           "Schulte Tabelle online"          — High conversion web query
// SECONDARY / LSI:
//           "Schulte Tabelle kostenlos"       — High volume free tool search
//           "Peripheres Sehen Training"       — Cognitive capability query
//           "Konzentrationsgitter"            — Direct German translation of concentration grid
//           "Schnelllesen Übungen"            — Speed reading association
//           "Visuelle Suchgeschwindigkeit"    — Scientific mechanism phrase
//           "Blickspanne erweitern"           — Cognitive training goal
// WINNER TITLE: Schulte-Tabelle Online – Konzentrationsgitter | SkillDrills
// ============================================================

export const metadata = {
  title: "Schulte-Tabelle Online – Konzentrationsgitter | SkillDrills",
  description: "Kostenlose Schulte-Tabelle online: Trainiere peripheres Sehen, Schnelllesen und visuelle Suchgeschwindigkeit auf anpassbaren Zahlen-Gittern.",
  keywords: [
    "Schulte-Tabelle",
    "Schulte Tabelle online",
    "Schulte Tabelle kostenlos",
    "Konzentrationsgitter",
    "Peripheres Sehen Training",
    "Schnelllesen Übungen",
    "Visuelle Suchgeschwindigkeit",
    "Blickspanne erweitern",
    "Sakkadentraining Zahlen",
    "Aufmerksamkeitstest Schulte",
    "schulte tabelle 5x5 interaktiv",
    "augentraining fokus test online"
  ],
  openGraph: {
    title: "Schulte-Tabelle Online – Konzentrationsgitter | SkillDrills",
    description: "Kostenlose Schulte-Tabelle online: Trainiere peripheres Sehen, Schnelllesen und visuelle Suchgeschwindigkeit auf anpassbaren Zahlen-Gittern.",
    type: "website",
    url: "https://skilldrills.online/de/drills/cognitive/focus/concentration-grid",
    siteName: "SkillDrills",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Schulte-Tabelle Online – Konzentrationsgitter | SkillDrills",
    description: "Kostenlose Schulte-Tabelle online: Trainiere peripheres Sehen, Schnelllesen und visuelle Suchgeschwindigkeit auf anpassbaren Zahlen-Gittern.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/de/drills/cognitive/focus/concentration-grid",
    languages: getAlternateLanguages('/drills/cognitive/focus/concentration-grid'),
  },
};

export default function ConcentrationGridPageDe() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://skilldrills.online/de" },
      { "@type": "ListItem", "position": 2, "name": "Kognitive Drills", "item": "https://skilldrills.online/de/drills/cognitive" },
      { "@type": "ListItem", "position": 3, "name": "Schulte-Tabelle", "item": "https://skilldrills.online/de/drills/cognitive/focus/concentration-grid" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Schulte-Tabelle Online (Konzentrationsgitter)",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-15",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Kostenloses browserbasiertes Schulte-Tabellen-Training zur Erweiterung des peripheren Sehens und der visuellen Suchgeschwindigkeit.",
    "genre": "Kognitives Training / Aufmerksamkeit",
    "url": "https://skilldrills.online/de/drills/cognitive/focus/concentration-grid",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Schulte-Tabelle Online (Konzentrationsgitter)",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-15",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "browserRequirements": "HTML5 Canvas, JavaScript fähiger Browser",
    "description": "Kostenlose interaktive Schulte-Tabelle online. Trainiere peripheres Sehen und Aufmerksamkeitsausdauer auf expandierenden Zahlenfeldern.",
    "url": "https://skilldrills.online/de/drills/cognitive/focus/concentration-grid"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Schulte-Tabelle Online (Konzentrationsgitter)",
    "url": "https://skilldrills.online/de/drills/cognitive/focus/concentration-grid",
    "description": "Kostenlose interaktive Schulte-Tabelle online. Finde sequentielle Zahlen auf expandierenden Gittern von 3x3 bis 8x8.",
    "dateModified": "2026-09-15",
    "gamePlatform": "Web Browser",
    "genre": ["Kognitives Training", "Peripheres Sehen", "Schulte-Tabelle", "Konzentrationsgitter"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-15",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Was ist eine Schulte-Tabelle und wozu dient sie?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die Schulte-Tabelle wurde 1962 vom deutschen Psychiater Walter Schulte als psychodiagnostisches Verfahren entwickelt. Sie besteht aus einem Gitter mit zufällig verteilten Zahlen, die in aufsteigender Reihenfolge gefunden werden müssen, um die visuelle Verarbeitungsgeschwindigkeit und Aufmerksamkeitskapazität zu messen."
        }
      },
      {
        "@type": "Question",
        "name": "Wie erweitert das Schulte-Training das periphere Sehen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Indem der Blick auf das Zentrum des Rasters fixiert bleibt, zwingt die Übung das Gehirn, Ziffern im parafovealen und peripheren Sichtfeld wahrzunehmen, anstatt die Augen ruckartig zu jeder einzelnen Zahl zu bewegen."
        }
      },
      {
        "@type": "Question",
        "name": "Warum ist die Schulte-Tabelle für Schnellleser (Speed Reading) so wertvoll?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Schnellleser erfassen ganze Wortgruppen mit einem einzigen Blick. Das Schulte-Gitter vergrößert die perzeptuelle Blickspanne (Rayner, 1998) und reduziert die Anzahl unnötiger Sakkaden und Fixationspausen pro Textzeile drastisch."
        }
      },
      {
        "@type": "Question",
        "name": "Was besagt die zentrale Fixationsregel beim Training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die maximale Trainingswirkung entsteht, wenn der Blick ruhig in der Mitte der Tabelle ruht. Die Suche nach der nächsten Ziffer erfolgt rein über die periphere Wahrnehmung ohne direkte Augenwanderung."
        }
      },
      {
        "@type": "Question",
        "name": "Was versteht man unter visueller Suchlatenz und visueller Enge (Crowding)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mit wachsender Gittergröße (von 3x3 über 5x5 bis 8x8) rücken benachbarte Zahlen enger zusammen. Das Phänomen des visuellen Crowdings (Wolfe, 2007) erschwert die Zielerkennung und fordert fokussierte Aufmerksamkeitsfilterung."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Zeit auf einer 5x5 Schulte-Tabelle gilt als guter Richtwert?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Eine Zeit unter 30 Sekunden gilt als überdurchschnittlich gut. Elite-Leser und trainierte Athleten bewältigen ein 5x5-Gitter (Zahlen 1 bis 25) oft in unter 20 bis 25 Sekunden."
        }
      },
      {
        "@type": "Question",
        "name": "Profitieren E-Sportler und Rennfahrer von Konzentrationsgittern?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja. In wettkampforientierten Shootern und im Motorsport müssen Bedrohungen und Anzeigen am Bildschirmrand erkannt werden, ohne das Fadenkreuz von der Straßen- oder Ziellinie abzuwenden."
        }
      },
      {
        "@type": "Question",
        "name": "Wie oft sollte man mit der Schulte-Tabelle trainieren?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tägliche kurze Einheiten von 5 bis 10 Durchgängen (ca. 10 bis 15 Minuten) erzielen optimale neuroplastische Anpassungen ohne visuelle Ermüdung der Augenmuskeln."
        }
      },
      {
        "@type": "Question",
        "name": "Werden Fehlschläge oder falsche Klicks bestraft?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Falsche Klicks lösen ein kurzes optisches Warnsignal aus und senken die Genauigkeitsquote in der Abschlussstatistik, beenden die 45-Sekunden-Runde jedoch nicht vorzeitig."
        }
      },
      {
        "@type": "Question",
        "name": "Ist dieser Schulte-Trainer kostenlos und ohne Installation nutzbar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, der Trainer ist vollständig kostenlos, funktioniert direkt im Browser auf PC, Tablet und Smartphone und erfordert weder Registrierung noch Download."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Anleitung zum Schulte-Tabellen-Training",
    "description": "In 4 Schritten peripheres Sehen und Suchgeschwindigkeit auf Zahlen-Gittern trainieren.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Blick im Zentrum des Rasters fixieren",
        "text": "Richte deine Augen auf den Mittelpunkt der Tabelle und halte den Fokus dort, anstatt jede Ziffer einzeln anzuschauen.",
        "url": "https://skilldrills.online/de/drills/cognitive/focus/concentration-grid#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Periphere Wahrnehmung für Ziffer 1 aktivieren",
        "text": "Lokalisiere die Startzahl 1 im Randbereich deines Sichtfeldes und tippe sie sofort an.",
        "url": "https://skilldrills.online/de/drills/cognitive/focus/concentration-grid#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Zahlen in strikt aufsteigender Reihenfolge abarbeiten",
        "text": "Setze die Sequenz ohne Unterbrechung fort (2, 3, 4 ...), während du den nächsten Zielwert bereits im Blickfeld vorwegnimmst.",
        "url": "https://skilldrills.online/de/drills/cognitive/focus/concentration-grid#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Gitter vervollständigen und Dimension erweitern",
        "text": "Schließe das Raster vor Ablauf der 45 Sekunden ab, um auf größere Spielfelder (4x4, 5x5, 6x6) aufzusteigen.",
        "url": "https://skilldrills.online/de/drills/cognitive/focus/concentration-grid#step-4"
      }
    ]
  };

  const concentrationGridGuide = {
    heading: "Leitfaden für Schulte-Tabellen & Peripheres Sehtraining",
    intro: [
      "Die Schulte-Tabelle (Schulte Table) ist ein traditionsreiches kognitives Trainings- und Diagnosewerkzeug, das 1962 von dem deutschen Psychiater Walter Schulte an der Universität Tübingen entwickelt wurde. Ursprünglich zur Untersuchung der Aufmerksamkeitsökonomie und psychischen Leistungsfähigkeit konzipiert, fordert das klassische Raster Probanden auf, die Ziffern 1 bis 25 in aufsteigender Reihenfolge auf einem 5x5-Gitter zu lokalisieren, während der Blick im Idealfall auf der Mitte fixiert bleibt.",
      "In der angewandten Sportpsychologie entwickelte sich daraus das 'Konzentrationsgitter' (Harris & Harris, 1984), das von Spitzentrainern im Tennis, Motorsport und Baseball eingesetzt wird, um Blickgeschwindigkeit und mentale Gegenwärtigkeit unter Zeitdruck zu schulen. Eine ereigniskorrelierte Potenzialstudie (ERP) an Kindern zeigte, dass die sequentielle Zahlensuche im Schulte-Gitter signifikant höhere neuronale Ressourcen beansprucht als die Einzelsuche und dass zusätzliche Farbdistraktoren die Latenzen im EEG messbar verzögern (Lu et al., 2022).",
      "Der SkillDrills Schulte-Tabellen-Trainer transformiert diesen statischen Test in eine moderne, hochdynamische Continuous Performance Task. Anstelle einer einzelnen isolierten Matrix erweitert sich das Gitter bei jedem Abschluss dynamisch von 3x3 bis zu 8x8, wobei ab Stufe 5x5 leichte Rotationsverzerrungen hinzutreten. Dies fordert die maximale funktionelle Blickspanne und die parafoveale Koordination innerhalb eines fixen 45-Sekunden-Zeitfensters.",
      "Messmethodik und Präzision: Jedes Klick- und Touch-Ereignis wird clientseitig über die hochauflösende performance.now() API des Browsers erfasst. Moderne Browser vergröbern Zeitgeber aus Sicherheitsgründen (Spectre-Mitigation) auf rund 1 ms, während Displays Änderungen auf ihre Bildwiederholrate quantisieren (ca. 16,7 ms pro Frame bei 60 Hz, Woods et al., 2015). Vergleichen Sie Ihre Resultate am besten auf derselben Hardwarekonfiguration.",
      "Datentransparenz: SkillDrills erhebt und überträgt keinerlei aggregierte Nutzerdaten. Alle Bestwerte und Einstellungen verbleiben ausschließlich im lokalen Speicher (localStorage) Ihres Webbrowsers. Sämtliche Richtwerte und Interpretationen stützen sich auf die in den Quellen aufgeführten wissenschaftlichen Fachpublikationen.",
      "Diese Übung ist ein kostenloses Trainingsspiel für Sport, Studium und persönliche Leistungssteigerung. Sie stellt kein medizinisches Diagnoseinstrument, kein therapeutisches Hilfsmittel und kein Screening-Verfahren für ADHS oder Aufmerksamkeitsstörungen dar. Bei gesundheitlichen oder neuropsychologischen Beschwerden wenden Sie sich bitte an qualifizierte Mediziner."
    ],
    benchmarks: {
      title: "Schulte-Tabelle & Konzentrationsgitter Leistungsklassen (45-Sekunden-Lauf)",
      headers: ["Leistungsstufe", "Punktzahl (45s)", "Maximales Gitter", "Suchlatenz", "Neurokognitive Bewertung"],
      rows: [
        ["S+ (Elite)", "8.000+ PTS", "7x7+ (49+ Felder)", "< 300 ms / Ziffer", "Weltklasse-Suchgeschwindigkeit, herausragende periphere Blickspanne und sofortige Rotationsinvarianz."],
        ["S (Master)", "6.000 – 7.999 PTS", "6x6 (36 Felder)", "300 – 450 ms / Ziffer", "Exzellente visuelle Sucheffizienz; nahtloses parafoveales Caching und minimale Fixationspausen."],
        ["A (Fortgeschritten)", "4.500 – 5.999 PTS", "5x5 (25 Felder)", "450 – 600 ms / Ziffer", "Starke visuelle Feldverarbeitung; konsistente paarweise Vorausschau bei mittlerer Gitterdichte."],
        ["B (Kompetent)", "3.000 – 4.499 PTS", "4x4 (16 Felder)", "600 – 800 ms / Ziffer", "Überdurchschnittliche Suchdisziplin; gelegentliche zentrale Refixationspausen bei größeren Rastern."],
        ["C (Mittelstufe)", "1.800 – 2.999 PTS", "3x3 (9 Felder)", "800 – 1.100 ms / Ziffer", "Solide Grundleistung; stützt sich überwiegend auf serielle foveale Einzelsakkaden."],
        ["D (In Entwicklung)", "< 1.800 PTS", "3x3 (teilweise)", "> 1.100 ms / Ziffer", "Visuelle Enge (Crowding); erhöhte Sakkadenzahl und zögerliche Zifferndiskrimination."]
      ],
      note: "Diese Leistungsstufen basieren auf empirischen Forschungsarbeiten zur visuellen Suche und Aufmerksamkeit (Lu et al., 2022; Treisman & Gelade, 1980; Rayner, 1998; Wolfe, 2007). Individuelle Ergebnisse variieren je nach Bildwiederholfrequenz, Eingabemethode und Augenermüdung."
    },
    techniques: {
      title: "Wissenschaftliche Methoden für maximale Schulte-Gitter-Leistung",
      items: [
        {
          name: "Strikte Einhaltung des zentralen Fixationspunkts",
          desc: "Richte deine Augen starr auf die geometrische Mitte des Gitters. Versuche bewusst, keine Augenbewegungen zu den Ziffern am Rand auszuführen, sondern diese über das periphere Gesichtsfeld wahrzunehmen.",
          tips: "Stelle dir vor, die gesamte Matrix wie ein einheitliches Gemälde zu betrachten."
        },
        {
          name: "Parafoveales Vorab-Caching der Nachbarzahlen",
          desc: "Während du Ziffer 3 antippst, sollte deine periphere Aufmerksamkeit bereits die Ziffern 4 und 5 im Vorfeld registrieren (Rayner, 1998). Dies eliminiert die Suchpause zwischen Klicks.",
          tips: "Denke immer zwei Ziffern im Voraus, anstatt erst nach dem Klick mit der neuen Suche zu beginnen."
        },
        {
          name: "Vermeidung von subvokaler Zählung",
          desc: "Das innerliche laute Mitsprechen der Zahlen im Kopf begrenzt deine Verarbeitungsgeschwindigkeit auf das Sprechtempo (ca. 3–4 Wörter pro Sekunde).",
          tips: "Erkenne die Form der Zahl direkt als visuelles Muster, ohne ihren Namen innerlich auszusprechen."
        },
        {
          name: "Atmung und periphere Entspannung",
          desc: "Physische Anspannung und verkrampfte Augenmuskeln verengen das Gesichtsfeld (Tunnelblick). Eine ruhige, tiefe Zwerchfellatmung hält das periphere Sehfeld weit offen.",
          tips: "Atme gleichmäßig aus, lockere deine Nackenmuskeln und blicke mit weichem Fokus auf das Display."
        }
      ]
    },
    steps: [
      "Starte die 45-Sekunden-Session und fixiere den Blick auf der Gittermitte.",
      "Lokalisiere die Ziffer 1 über dein peripheres Sichtfeld und tippe sie an.",
      "Arbeite dich in exakt aufsteigender Ziffernfolge durch das aktuelle Feld.",
      "Vollende das Raster vor Ablauf des Countdowns, um auf größere Gitterebenen aufzusteigen.",
      "Werte deine Trefferquote, gelöste Gitter und Maximaldimension in der Detailstatistik aus."
    ],
    audience: "Schnellleser, Schüler und Studierende zur Konzentrationssteigerung sowie E-Sportler und Athleten, die ihre periphere Reaktionsbereitschaft optimieren wollen.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('lu2022', 'treisman1980', 'rayner1998', 'rayner2016', 'wolfe2007', 'woods2015'),
    related: [
      { href: "/de/drills/cognitive/processing-speed/symbol-matching", label: "Symbol Matching Speed Test" },
      { href: "/de/drills/cognitive/attention/concentration-stamina", label: "Konzentrations-Ausdauer Test" },
      { href: "/de/drills/cognitive/processing-speed/rsvp-reader", label: "RSVP Schnelllese-Trainer" },
      { href: "/de/drills/reaction-speed/visual-tracking-speed-test", label: "Visueller Tracking Speed Test" },
      { href: "/de/drills/reaction-speed/reaction-game", label: "Reaktionstest Spiel" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <ConcentrationGridClient
        copy={{
          h1Keyword: "Schulte-Tabelle",
          h1Suffix: " – Konzentrationsgitter Online",
          caption: "Finde fortlaufende Zahlen auf expandierenden Schulte-Gittern. Trainiere peripheres Sehen, Blickspanne und visuelle Suchgeschwindigkeit.",
          statScore: "Punkte",
          statTime: "Restzeit",
          statGridSize: "Gittergröße",
          statBest: "Bestwert",
          hudTarget: "Ziel:",
          statPoints: "Punkte",
          statAccuracy: "Genauigkeit",
          statGridsCleared: "Gelöste Gitter",
          statPeakGrid: "Max Gitter",
          playAgainText: "Nochmal spielen",
          shareText: "Ergebnis teilen",
          exitText: "Beenden",
          stageCaption: "Scanne und tippe Zahlen in strikt aufsteigender Reihenfolge auf expandierenden Schulte-Gittern.",
          rulesTitle: "Drill-Anleitung & Punktesystem",
          aboutTitle: "Über die Schulte-Tabelle & Konzentrationsgitter",
          aboutLead: "Die Schulte-Tabelle ist ein psychodiagnostisches Verfahren zur Vergrößerung des peripheren Gesichtsfeldes und zur Reduktion der Fixationslatenz bei sequentieller visueller Suche (Lu et al., 2022; Rayner, 1998).",
          aboutText: "Das Konzentrationsgitter schult schnelle Augenbewegungen (Sakkaden) und fokussierte Aufmerksamkeit unter progressiver visueller Enge (Treisman & Gelade, 1980; Wolfe, 2007).\n\nDurch das systematische Absuchen von Zahlenketten trainierst du die Effizienz mikrosakkadischer Fixationen und die periphere Zielerkennung.\n\nDa jede Session auf einem festen 45-Sekunden-Timer läuft, belohnt der Drill kontinuierliche Präzision ohne hastige Fehlschüsse.",
          aboutCards: [
            { title: "Für wen geeignet?", text: "Athleten, Piloten, Schnellleser und E-Sportler, die auf schnelle visuelle Informationsverarbeitung unter Zeitdruck angewiesen sind.", color: "bg-blue-600" },
            { title: "Trainierte Fähigkeiten", text: "Visuelle Suchgeschwindigkeit, mikrosakkadische Effizienz, periphere Blickspannenerweiterung und kognitive Aufmerksamkeitsausdauer.", color: "bg-emerald-600" },
            { title: "Peripheres Sehen", text: "Jedes gelöste Feld vergrößert das Gitter und zwingt das visuelle System, einen immer breiteren Bereich ohne direkte Blicksprünge zu überwachen.", color: "bg-purple-600" }
          ],
          rulesItems: [
            { title: "Sequenzielle Suche", text: "Tippe Zahlen in strikt aufsteigender Reihenfolge ab 1 bis zur höchsten Ziffer des aktuellen Gitters." },
            { title: "Expandierende Gitter", text: "Ein gelöstes Gitter schaltet größere Dimensionen frei (3x3 → 4x4 → 5x5 ...), die ein weiteres peripheres Sehfeld fordern." },
            { title: "Fester 45-Sekunden-Lauf", text: "Du hast exakt 45 Sekunden Zeit. Jedes gelöste Gitter vergrößert das Spielfeld, verlängert die Uhr jedoch nicht." },
            { title: "Präzision & Fokus", text: "Fehlklicks mindern deine Genauigkeit, beenden das Spiel jedoch nicht vorzeitig. Scanne gründlich vor jedem Tippen." }
          ]
        }}
      />
      <DrillGuide guide={concentrationGridGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="cognitive"
          currentHref="/drills/cognitive/focus/concentration-grid"
          locale="de"
        />
      </div>
    </>
  );
}
