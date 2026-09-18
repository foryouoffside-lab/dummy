import DigitSpanClient from '@/app/drills/memory/short-term-memory/digit-span/DigitSpanClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Zahlenspannen-Test Online – Digit Span | SkillDrills",
  description: "Kostenloser Zahlenspannen-Test online: Merke dir aufblitzende Zahlenfolgen und teste deine phonologische Schleife und Kurzzeitgedächtnis-Kapazität im Browser.",
  keywords: [
    "zahlenspanne test",
    "digit span test online",
    "zahlen gedaechtnistest",
    "phonologische schleife test",
    "arbeitsgedaechtnis test zahlen",
    "zahlen merken spiel",
    "kurzzeitgedaechtnis zahlen test",
    "gedaechtnisspanne testen",
    "wais digit span online",
    "chunking methode zahlen",
    "zahlenreihen merken uben",
    "kognitiver gedaechtnistest online"
  ],
  openGraph: {
    title: "Zahlenspannen-Test Online – Digit Span | SkillDrills",
    description: "Kostenloser Zahlenspannen-Test online: Merke dir aufblitzende Zahlenfolgen und teste deine phonologische Schleife und Kurzzeitgedächtnis-Kapazität im Browser.",
    type: 'website',
    url: 'https://skilldrills.online/de/drills/memory/short-term-memory/digit-span',
    siteName: 'SkillDrills',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Zahlenspannen-Test Online – Digit Span | SkillDrills",
    description: "Kostenloser Zahlenspannen-Test online: Merke dir aufblitzende Zahlenfolgen und teste deine phonologische Schleife und Kurzzeitgedächtnis-Kapazität im Browser.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/memory/short-term-memory/digit-span',
    languages: getAlternateLanguages('/drills/memory/short-term-memory/digit-span'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://skilldrills.online/de" },
    { "@type": "ListItem", "position": 2, "name": "Gedächtnistraining", "item": "https://skilldrills.online/de/drills/memory" },
    { "@type": "ListItem", "position": 3, "name": "Kurzzeitgedächtnis", "item": "https://skilldrills.online/de/drills/memory/short-term-memory" },
    { "@type": "ListItem", "position": 4, "name": "Zahlenspannen-Test", "item": "https://skilldrills.online/de/drills/memory/short-term-memory/digit-span" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Zahlenspannen-Test Online (Digit Span)",
  "url": "https://skilldrills.online/de/drills/memory/short-term-memory/digit-span",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "isAccessibleForFree": true,
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Zahlenspannen-Test Online (Digit Span)",
  "url": "https://skilldrills.online/de/drills/memory/short-term-memory/digit-span",
  "description": "Interaktiver neuropsychologischer Test zur Messung der Ziffernspanne, der phonologischen Schleife und der numerischen Kurzzeitgedächtnis-Kapazität.",
  "dateModified": "2026-09-11",
  "gamePlatform": "Web Browser",
  "genre": ["Memory Game", "Cognitive Training", "Brain Training", "Working Memory"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};


const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Zahlenspannen-Test Online (Digit Span)",
  "url": "https://skilldrills.online/de/drills/memory/short-term-memory/digit-span",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "dateModified": "2026-09-11",
  "author": { "@type": "Organization", "name": "SkillDrills" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Wie man die Zahlenspanne und das Arbeitsgedächtnis trainiert",
  "description": "Vierstufiges evidenzbasiertes Protokoll zur Steigerung der Ziffernspanne durch Chunking und artikulatorisches Rehearsal.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/de/drills/memory/short-term-memory/digit-span#step-1",
      
      "name": "Zentralen Blick fixieren",
      "text": "Konzentriere dich während des 3-sekündigen Präsentationsfensters auf die Bildschirmmitte, um die Ziffernfolge optimal aufzunehmen."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/de/drills/memory/short-term-memory/digit-span#step-2",
      
      "name": "Rhythmisches 3er-Chunking anwenden",
      "text": "Teile die Ziffern wie bei einer Telefonnummer in 2- bis 3-stellige Blöcke auf (z.B. '739 - 281'), um die kognitive Last zu minimieren."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/de/drills/memory/short-term-memory/digit-span#step-3",
      
      "name": "Artikulatorisches Rehearsal im Kopf",
      "text": "Wiederhole die Ziffernblöcke innerlich in einer schnellen Schleife, um den Zerfall der auditiven Spur nach 1,5–2 Sekunden zu verhindern."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/de/drills/memory/short-term-memory/digit-span#step-4",
      
      "name": "Zügige Zifferneingabe",
      "text": "Tippe die Ziffern nach Erscheinen des Tastenfelds in gleichmäßigem Tempo ein, solange die Erinnerungsspur frisch ist."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was ist der Zahlenspannen-Test (Digit Span Test)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der Zahlenspannen-Test ist ein grundlegendes neuropsychologisches Verfahren zur Messung des verbalen Kurzzeitgedächtnisses, der Arbeitsgedächtniskapazität und der Aufmerksamkeit. Testpersonen prägen sich Ziffernfolgen ein und geben sie in exakter Reihenfolge wieder."
      }
    },
    {
      "@type": "Question",
      "name": "Was ist ein normaler Durchschnittswert beim Zahlenspannen-Test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die durchschnittliche vorwärts gerichtete Zahlenspanne bei Erwachsenen liegt bei 5 bis 7 Ziffern (Standardabweichung 1–2). 7 Ziffern entsprechen George A. Millers klassischem '7 ± 2'-Richtwert; Werte ab 9 Ziffern zeugen von herausragendem Chunking."
      }
    },
    {
      "@type": "Question",
      "name": "Was ist der Unterschied zwischen Vorwärts- und Rückwärts-Zahlenspanne?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Vorwärtsspanne misst die passive Speicherung in der phonologischen Schleife. Die Rückwärtsspanne erfordert das mentale Umkehren der Folge vor der Eingabe, beansprucht die zentrale Exekutive und misst somit aktives Arbeitsgedächtnis."
      }
    },
    {
      "@type": "Question",
      "name": "Was ist der WAIS-Zahlenspannen-Untertest?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein Kernuntertest des Wechsler-Intelligenztests (WAIS-IV) zur Ermittlung des Arbeitsgedächtnisindex (AGI). Er prüft sequenzielle Verarbeitung, mentale Flexibilität und Ablenkungsresistenz."
      }
    },
    {
      "@type": "Question",
      "name": "Wie beeinflusst die phonologische Schleife die Leistung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nach Baddeleys Modell werden Ziffern im phonologischen Speicher gehalten und durch inneres Wiederholen ('inner voice') aufgefrischt. Da akustische Spuren nach 1,5 bis 2 Sekunden verblassen, bestimmt das Sprechtempo im Kopf die maximale Spanne."
      }
    },
    {
      "@type": "Question",
      "name": "Was besagt Millers Gesetz (Magische Zahl 7 ± 2)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "George A. Miller stellte 1956 fest, dass das menschliche Kurzzeitgedächtnis auf etwa 7 ± 2 Informationseinheiten begrenzt ist. Moderne Modelle (Cowan, 2001) zeigen, dass die reine Kapazität ohne Chunking bei 4 Einheiten liegt."
      }
    },
    {
      "@type": "Question",
      "name": "Wie hilft Chunking beim Merken von Zahlen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chunking fasst Einzelziffern zu rhythmischen Gruppen zusammen (z.B. '839 - 241'). Dadurch werden 6 Ziffern zu 2 Einheiten komprimiert, was den Engpass des Arbeitsgedächtnisses elegant überwindet."
      }
    },
    {
      "@type": "Question",
      "name": "Warum verringert sich die Ziffernlänge nach einem Fehler?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der Test nutzt ein adaptives 1-up / 1-down Staircase-Verfahren. Nach einem Fehler sinkt die Ziffernanzahl um 1, um deine tatsächliche Leistungsgrenze ermüdungsfrei und statistisch präzise zu bestimmen."
      }
    },
    {
      "@type": "Question",
      "name": "Kann Zahlenspannentraining Konzentration und Denkleistung steigern?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Regelmäßiges Training stärkt die Aufmerksamkeitskontrolle, verringert Tagträumen und schult das Gehirn in strategischem Chunking – vorteilhaft für Mathematik, Programmierung und Studium."
      }
    },
    {
      "@type": "Question",
      "name": "Ist dieser Online-Test kostenlos und ohne Installation nutzbar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, der SkillDrills Zahlenspannen-Test ist 100 % kostenlos, läuft vollständig im Browser ohne Anmeldung und misst Tastaturlatenzen auf die Millisekunde genau."
      }
    }
  ]
};

const digitSpanGuide = {
  intro: [
  "Der Zahlenspannen-Test (Digit Span Memory Test) ist das führende neuropsychologische Verfahren zur Erfassung des verbalen Kurzzeitgedächtnisses, der Arbeitsgedächtnisspanne und der phonologischen Verarbeitungskapazität. Seit über einem Jahrhundert bildet er das Fundament kognitiver Intelligenztests.",
  "Die theoretische Basis geht auf George A. Millers (1956) bahnbrechende Arbeit 'The Magical Number Seven, Plus or Minus Two' zurück. David Wechsler (1939, 1955, 2008) integrierte die Zahlenspanne in die Wechsler Adult Intelligence Scale (WAIS), wo sie als Goldstandard für den Arbeitsgedächtnisindex (AGI) dient.",
  "Im Mehrkomponentenmodell von Alan Baddeley (1974, 2000) werden Ziffernfolgen in der 'phonologischen Schleife' aufrechterhalten. Der auditive Speicher hält Spuren etwa 1,5 bis 2,0 Sekunden lang, bevor sie durch artikulatorisches Rehearsal erneuert werden müssen. Nelson Cowan (2001) wies zudem nach, dass die ungebündelte Fokalkapazität strikt auf 4 ± 1 Einheiten beschränkt ist – längere Spannen erfordern zwingend rhythmische Chunking-Strategien.",
  "Diese Übung ist mit digitaler Hochpräzisions-Chronometrie (Woods et al., 2015) kalibriert und ermittelt über eine adaptive Treppenprogression zuverlässig deine persönliche Leistungsgrenze.",
  "Messmethodik: Alle Eingaben werden lokal im Browser mittels performance.now() mit Millisekundenpräzision erfasst. Es werden keine Daten übertragen. Browser-Timer sind aus Sicherheitsgründen auf ca. 1 ms gerundet und mit der Bildwiederholrate (ca. 16,7 ms bei 60 Hz) synchronisiert (Woods et al., 2015). Vergleiche deine Werte stets auf demselben Gerät.",
  "Datentransparenz: SkillDrills speichert keine Messdaten auf externen Servern. Deine Bestwerte verbleiben lokal im Browser (localStorage). Alle Richtwerte stammen aus peer-reviewten Fachpublikationen.",
  "Diese Übung dient der kognitiven Unterhaltung und dem Training. Sie ist kein Medizinprodukt und stellt keine klinische Diagnose dar. Bei gesundheitlichen Bedenken wende dich an medizinisches Fachpersonal."
],
  benchmarks: {
    title: "Normative Benchmarks für Zahlenspanne und Arbeitsgedächtnis",
    headers: ["Leistungsstufe", "Zahlenspanne (Länge)", "WAIS-Skalenwert Äquiv.", "Kognitives Speicher- & Verarbeitungsprofil"],
    rows: [
  [
    "Tier 1 (Exzellent / Top 1%)",
    "9 – 12+ Ziffern",
    "Skalenwert 16 – 19",
    "Mnemotechnisches Spitzenniveau; nutzt 3- bis 4-stellige rhythmische Chunks; fehlerfreie phonologische Schleife; Klicktakt unter 350 ms."
  ],
  [
    "Tier 2 (Überdurchschnittlich / Top 15%)",
    "7 – 8 Ziffern",
    "Skalenwert 12 – 15",
    "Erreicht Millers 7-Ziffern-Schwelle; bildet stabile Ziffernpaare/-triplets; unempfindlich gegen Zeitverfall; 350 – 500 ms Kadenz."
  ],
  [
    "Tier 3 (Erwachsenen-Basis / 50%)",
    "5 – 6 Ziffern",
    "Skalenwert 8 – 11",
    "Normaler Durchschnitt gesunder Erwachsener; bewältigt einfache Paare; ab 7 Ziffern setzt akustische Überlagerung ein; 500 – 700 ms Kadenz."
  ],
  [
    "Tier 4 (Unterdurchschnittlich / Engpass)",
    "4 Ziffern",
    "Skalenwert 5 – 7",
    "Arbeitet an Cowans reiner 4-Punkte-Kapazitätsgrenze; ohne inneres Vorsagen scheitern Folgen über 4 Ziffern; 700 – 950 ms Kadenz."
  ],
  [
    "Tier 5 (Trainingsbedarf / Niedrig)",
    "3 Ziffern",
    "Skalenwert 1 – 4",
    "Schwierigkeiten bei 3 Ziffern in Folge; hohe Anfälligkeit für sofortigen Spurzerfall und Ablenkung; Tastkadenz über 950 ms."
  ]
],
    note: "Die Zahlenspanne entspricht der maximal fehlerfrei wiederholten Ziffernlänge. WAIS-Skalenwerte basieren auf offiziellen Standardisierungen (Wechsler, 2008; Woods et al., 2015)."
  },
  techniques: {
    title: "Evidenzbasierte Protokolle zur Erweiterung der Zahlenspanne",
    items: [
  {
    "name": "Phonetischer Rhythmus & 3er-Chunking",
    "desc": "Teile Ziffernketten wie eine Telefonnummer in 3er-Gruppen auf (z.B. '739 - 281 - 405') (Miller, 1956). 9 Einzelziffern schrumpfen dadurch auf 3 handhabbare Einheiten zusammen.",
    "tips": "Betone die erste Ziffer jedes Blocks gedanklich etwas höher, um klare Grenzen zu setzen."
  },
  {
    "name": "Artikulatorische Schleifen-Synchronisation",
    "desc": "Spreche die Ziffernblöcke innerlich in einer schnellen, kontinuierlichen Schleife auf (Baddeley, 1986). Schnelles inneres Wiederholen frischt das Signal vor dem Zerfall nach 2 Sekunden auf.",
    "tips": "Spreche Ziffern nicht isoliert aus, sondern wie flüssige mehrsilbige Kunstwörter."
  },
  {
    "name": "Kinästhetische Tastenfeld-Pfade",
    "desc": "Verbinde Ziffern mit Bewegungsmustern auf dem 3x3-Ziffernblock (Logie, 1995). Die Übersetzung in räumliche Fingerbewegungen aktiviert den Motorkortex als Zweitspeicher.",
    "tips": "Visualisiere den Zickzack-Pfad über das Tastenfeld, während die Zahlen aufleuchten."
  },
  {
    "name": "Primacy-Recency-Positionsaufteilung",
    "desc": "Die ersten Ziffern profitieren vom Start-Rehearsal (Primacy), während die letzten 2 Ziffern als frisches Echo im Ohr nachklingen (Recency). Konzentriere dein inneres Wiederholen auf die Ziffern in der Mitte.",
    "tips": "Sichere die ersten 3 Ziffern sofort und verlasse dich für die letzten Ziffern auf den akustischen Nachhall."
  }
]
  },
  steps: [
  "Blicke auf das Ziffernfeld und warte auf die 3-sekündige Präsentationsphase.",
  "Teile die erscheinenden Ziffern sofort in 2- oder 3-stellige rhythmische Gruppen ein.",
  "Wiederhole die Gruppen innerlich wie ein Mantra, um den Zerfall zu stoppen.",
  "Tippe die Ziffern nach Erscheinen der Tastatur zügig in exakter Reihenfolge ein.",
  "Lass das adaptive Treppenverfahren deine persönliche Kapazitätsgrenze kontinuierlich erweitern."
],
  audience: "Schüler, Studenten, Berufstätige und Kandidaten für Eignungstests (WAIS, Assessment-Center), die ihr Arbeitsgedächtnis und ihren Fokus schärfen möchten.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('miller1956', 'cowan2001', 'baddeley1974', 'baddeley2000', 'logie1995', 'woods2015'),
  related: [
  {
    "href": "/drills/memory/working-memory/n-back",
    "label": "N-Back Arbeitsgedächtnis-Test"
  },
  {
    "href": "/drills/memory/spatial-memory/grid-memorization",
    "label": "Visueller Gedächtnistest (Grid)"
  },
  {
    "href": "/drills/cognitive/focus/concentration-grid",
    "label": "Schulte-Tabelle (Konzentrationsgitter)"
  },
  {
    "href": "/drills/reaction-speed/reaction-time-test",
    "label": "Reaktionstest (Reaktionszeit messen)"
  },
  {
    "href": "/drills/reaction-speed/reflex-training-drill",
    "label": "Reflex-Training & Reaktionsspiel"
  }
]
};

export default function LocalizedDigitSpanPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DigitSpanClient copy={{
        "h1Keyword": "Zahlenspannen-Test",
        "h1Suffix": " – Kostenloser Digit Span Zahlen-Gedächtnistest",
        "caption": "Präge dir die aufblitzende Zahlenfolge ein und tippe die Ziffern anschließend in der exakten Reihenfolge ein.",
        "statScore": "Punkte",
        "statTime": "Restzeit",
        "statSpan": "Spanne",
        "digitsUnit": "Ziffern",
        "statBest": "Bestwert",
        "hudScore": "Punkte",
        "hudTime": "Zeit",
        "memorizeTitle": "ZAHLENFOLGE MERKEN",
        "evaluating": "Auswertung...",
        "startTitle": "Zahlenspanne Pro",
        "startSubtitle": "Numerisches Kurzzeitgedächtnis • Ziffernabruf",
        "countdownSubtitle": "BEREIT MACHEN",
        "newBest": "NEUER REKORD",
        "pointsLabel": "Punkte",
        "statAccuracy": "Präzision",
        "statPeakSpan": "Spitzenspanne",
        "statPerfects": "Perfekt",
        "btnPlayAgain": "Erneut spielen",
        "rulesTitle": "Übungsregeln & Bewertungssystem",
        "rulesItems": [
                {
                        "num": "1",
                        "text": "Zahlenabruf",
                        "highlight": "+100 PKT",
                        "result": "Aufblitzende Ziffernfolge merken und über das Tastenfeld eingeben"
                },
                {
                        "num": "2",
                        "text": "Level-Bonus",
                        "highlight": "Bis zu +120% PKT",
                        "result": "Höhere Ziffernspanne bringt mehr Punkte pro Treffer"
                },
                {
                        "num": "3",
                        "text": "Fehler / Timeout",
                        "highlight": "-1 Ziffer",
                        "result": "Kein Punkteverlust; Spanne sinkt um 1 Ziffer zur Stabilisierung"
                },
                {
                        "num": "4",
                        "text": "Adaptiver Test",
                        "highlight": "Steigt & fällt",
                        "result": "Konvergiert exakt auf deine tatsächliche Gedächtnisspanne"
                }
        ]
}} />
      <DrillGuide guide={digitSpanGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/short-term-memory/digit-span"
          locale="de"
        />
      </div>
    </>
  );
}
