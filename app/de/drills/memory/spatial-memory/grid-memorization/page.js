import GridMemorizationClient from '@/app/drills/memory/spatial-memory/grid-memorization/GridMemorizationClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Visueller Gedächtnistest – Memory Matrix | SkillDrills",
  description: "Kostenloser visueller Gedächtnistest online: Merke dir Gittermuster auf der Matrix in 1,5s und trainiere dein visuelles Arbeitsgedächtnis ohne Anmeldung.",
  keywords: ['visueller gedaechtnistest', 'raeumliches gedaechtnis test', 'muster gedaechtnis test', 'visuelles arbeitsgedaechtnis', 'memory matrix online', 'visueller mustertest', 'visuelle speicherkapazitaet', 'gitter muster gedaechtnis', 'kurzzeitgedaechtnis visuell', 'visuelle aufmerksamkeit training', 'corsi block alternative', 'raeumliches chunking test'],
  openGraph: {
    title: "Visueller Gedächtnistest Online (Memory Matrix) - Kostenloser Mustertest | SkillDrills",
    description: "Kostenloser visueller Gedächtnistest online (Memory Matrix). Präge dir aufleuchtende Gittermuster auf 4x4 bis 5x5 Matrizen in 1,5 Sekunden ein und trainiere räumliches Chunking und visuelles Arbeitsgedächtnis. Ohne Anmeldung direkt im Browser spielbar.",
    type: 'website',
    url: 'https://skilldrills.online/de/drills/memory/spatial-memory/grid-memorization',
    siteName: 'SkillDrills',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Visueller Gedächtnistest Online (Memory Matrix) - Kostenloser Mustertest | SkillDrills",
    description: "Kostenloser visueller Gedächtnistest online (Memory Matrix). Präge dir aufleuchtende Gittermuster auf 4x4 bis 5x5 Matrizen in 1,5 Sekunden ein und trainiere räumliches Chunking und visuelles Arbeitsgedächtnis. Ohne Anmeldung direkt im Browser spielbar.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/memory/spatial-memory/grid-memorization',
    languages: getAlternateLanguages('/drills/memory/spatial-memory/grid-memorization'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://skilldrills.online/de" },
    { "@type": "ListItem", "position": 2, "name": "Gedächtnistraining", "item": "https://skilldrills.online/de/drills/memory" },
    { "@type": "ListItem", "position": 3, "name": "Räumliches Gedächtnis", "item": "https://skilldrills.online/de/drills/memory/spatial-memory" },
    { "@type": "ListItem", "position": 4, "name": "Visueller Gedächtnistest", "item": "https://skilldrills.online/de/drills/memory/spatial-memory/grid-memorization" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Visueller Gedächtnistest Online (Memory Matrix)",
  "url": "https://skilldrills.online/de/drills/memory/spatial-memory/grid-memorization",
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
  "name": "Visueller Gedächtnistest Online (Memory Matrix)",
  "url": "https://skilldrills.online/de/drills/memory/spatial-memory/grid-memorization",
  "description": "Interaktiver neuropsychologischer Test zur Messung des räumlich-visuellen Arbeitsgedächtnisses, der Mustererkennung und der visuellen Speicherkapazität auf Matrixgittern.",
  "dateModified": "2026-09-11",
  "gamePlatform": "Web Browser",
  "genre": ["Memory Game", "Cognitive Training", "Brain Training", "Spatial Memory"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};


const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Visueller Gedächtnistest Online (Memory Matrix)",
  "url": "https://skilldrills.online/de/drills/memory/spatial-memory/grid-memorization",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "dateModified": "2026-09-11",
  "author": { "@type": "Organization", "name": "SkillDrills" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Wie man das visuelle Arbeitsgedächtnis auf Matrixgittern trainiert",
  "description": "Vierstufiges evidenzbasiertes Protokoll zur Kodierung, Gestaltbündelung (Chunking) und fehlerfreien Rekonstruktion räumlicher Gittermuster.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/de/drills/memory/spatial-memory/grid-memorization#step-1",
      
      "name": "Zentralen Blick fixieren",
      "text": "Richte deine Augen vor dem Aufleuchten fest auf das Gitterzentrum, um das parafoveale Sehfeld über die gesamte Matrix zu nutzen."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/de/drills/memory/spatial-memory/grid-memorization#step-2",
      
      "name": "Gestalt-Form-Chunking anwenden",
      "text": "Gruppiere leuchtende Zellen in geometrische Einheiten (Ecken, Linien, Blöcke), statt isolierte Einzelkoordinaten zu memorieren."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/de/drills/memory/spatial-memory/grid-memorization#step-3",
      
      "name": "Motorisch-räumliches Nachzeichnen",
      "text": "Ziehe während der 1,5-sekündigen Einprägephase mental eine kontinuierliche Linie durch die markierten Zellen, um den motorischen Abruf vorzubereiten."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/de/drills/memory/spatial-memory/grid-memorization#step-4",
      
      "name": "Systematische Matrix-Rekonstruktion",
      "text": "Klicke zuerst die erkannten zusammenhängenden Formcluster an und fülle anschließend isolierte Randzellen auf."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was ist ein visueller Gedächtnistest?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein visueller Gedächtnistest erfasst das räumlich-visuelle Arbeitsgedächtnis – insbesondere die Fähigkeit, visuelle Muster und räumliche Koordinaten ohne sprachliche Wiederholung wahrzunehmen, zu enkodieren und kurzfristig abzurufen."
      }
    },
    {
      "@type": "Question",
      "name": "Wie funktioniert die Gitter-Gedächtnisübung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Auf einem 4x4- oder 5x5-Gitter leuchtet 1,5 Sekunden lang ein Muster weißer Kacheln auf. Sobald das Gitter erlischt, klickst du alle zuvor beleuchteten Felder an. Mit jedem Erfolg steigt die Musterkomplexität."
      }
    },
    {
      "@type": "Question",
      "name": "Was ist der Visual Patterns Test (VPT)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der 1997 von Sergio Della Sala, Robert H. Logie und Kollegen entwickelte Visual Patterns Test (VPT) gilt als neuropsychologischer Goldstandard zur Messung des reinen statischen visuellen Kurzzeitgedächtnisses, unabhängig von sequenziellen Bewegungsabläufen."
      }
    },
    {
      "@type": "Question",
      "name": "Wie unterscheidet sich dieser Test vom Corsi-Block-Tapping-Test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der Corsi-Block-Test (Corsi, 1972) misst das sequenzielle räumliche Gedächtnis (zeitliche Tippabfolge) über den aktiven 'Inner Scribe'. Diese Gitterübung präsentiert alle Zellen simultan und isoliert die statische Kapazität des 'Visual Cache'."
      }
    },
    {
      "@type": "Question",
      "name": "Was ist ein normaler Durchschnittswert bei einem visuellen Matrixtest?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Normdaten gesunder Erwachsener (Della Sala et al., 1997, 1999) zeigen eine durchschnittliche Musterkapazität von 6 bis 8 Feldern auf 4x4- bis 5x5-Gittern. Spitzenreiter erreichen 10 bis 14+ Felder durch fortgeschrittenes geometrisches Chunking."
      }
    },
    {
      "@type": "Question",
      "name": "Wie verbessert räumliches Chunking das visuelle Erinnerungsvermögen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Das visuelle Arbeitsgedächtnis besitzt einen physiologischen Engpass von 3 bis 4 Einheiten (Luck & Vogel, 1997; Cowan, 2001). Räumliches Chunking überwindet dies, indem benachbarte Zellen zu Formen (z.B. Dreiecke, Linien, 'L'-Formen) zusammengefasst und als Einzelobjekt gespeichert werden."
      }
    },
    {
      "@type": "Question",
      "name": "Was ist der Unterschied zwischen Visual Cache und Inner Scribe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In Logies (1995) Modell ist der 'Visual Cache' ein passiver Speicher für statische visuelle Formen, Farben und Matrizen. Der 'Inner Scribe' ist ein aktiver Mechanismus zur Planung und mentalen Wiederholung räumlicher Bewegungen."
      }
    },
    {
      "@type": "Question",
      "name": "Warum verblassen Gittermuster nach 1,5 Sekunden so schnell?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Das ikonische sensorische Bildgedächtnis zerfällt innerhalb von 250 bis 500 Millisekunden. Ohne rasche Übertragung ins Arbeitsgedächtnis durch Chunking oder mentale Linienführung wird die visuelle Spur sofort durch neue Reize überschrieben."
      }
    },
    {
      "@type": "Question",
      "name": "Gibt es Punktabzüge für falsche Klicks?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nein. Ein falscher Klick zieht weder Punkte ab noch verkürzt er die verbleibende Zeit. Die Runde startet einfach auf derselben Schwierigkeitsstufe neu, sodass du stressfrei an deiner Leistungsgrenze trainieren kannst."
      }
    },
    {
      "@type": "Question",
      "name": "Wie nützt visuelles Gedächtnis im Alltag und beim Gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein starkes visuelles Arbeitsgedächtnis verbessert die Übersicht auf der Minikarte in Taktik-Shootern (Valorant, CS2), beschleunigt das Erfassen von Bauplänen und Diagrammen und schärft die 3D-Vorstellungskraft in MINT-Fächern."
      }
    }
  ]
};

const gridGuide = {
  intro: [
  "Der Visuelle Gedächtnistest (Grid Memorization / Memory Matrix) ist eine wissenschaftlich fundierte neurokognitive Übung zur Messung des räumlich-visuellen Arbeitsgedächtnisses, der Musterenkodierung und des statischen Matrixabrufs. Im Gegensatz zu verbalen Gedächtnistests isoliert diese Aufgabe das reine visuelle Verarbeitungssystem des Gehirns.",
  "Die klinische Untersuchung der räumlich-visuellen Gedächtnisspanne wurde durch Pietro Corsi (1972) mit dem Corsi-Block-Tapping-Test begründet, der nachwies, dass räumliche Gedächtnissysteme anatomisch getrennt von der verbalen Zahlenspanne arbeiten (Milner, 1971). 1997 entwickelten Sergio Della Sala, Robert H. Logie und Kollegen den Visual Patterns Test (VPT), um statische Matrixmuster von sequenziellen Bewegungspfaden abzugrenzen.",
  "In der modernen kognitiven Neurowissenschaft unterteilten Robert H. Logie (1995) und Alan Baddeley (2000) den räumlich-visuellen Notizblock in den passiven 'Visual Cache' (Speicher für Farben, Helligkeit und statische Formen) und den aktiven 'Inner Scribe' (Mechanismus für räumliche Bewegungsplanung). Studien von Steven J. Luck & Edward K. Vogel (1997) sowie Nelson Cowan (2001) belegen, dass ungebündelte visuelle Information strikt auf 3 bis 4 Objekte begrenzt ist. Das Erweitern der Gedächtnisspanne erfordert räumliches Chunking – das Zusammenfassen von Feldern zu ganzheitlichen Gestaltmustern.",
  "Diese Übung ist mit digitaler chronometrischer Präzision kalibriert (Woods et al., 2015), nutzt ein standardisiertes 1,5-Sekunden-Einprägefenster und passt die Schwierigkeit adaptiv an, um deine visuelle Kapazitätsgrenze exakt zu bestimmen.",
  "Messmethodik: Alle Zeitstempel werden über die hochauflösende performance.now()-Schnittstelle deines Browsers lokal verarbeitet. Es werden keine Messdaten übertragen. Browser-Timer sind aus Sicherheitsgründen auf ca. 1 ms gerundet und mit der Bildwiederholrate deines Monitors (ca. 16,7 ms bei 60 Hz) synchronisiert (Woods et al., 2015). Differenzen unter 5 ms sind Messrauschen. Vergleiche deine Werte daher auf demselben Gerät.",
  "Datentransparenz: SkillDrills speichert keine Nutzerdaten auf Servern. Alle Highscores verbleiben lokal in deinem Browser (localStorage). Alle Richtwerte stammen aus peer-reviewten Fachpublikationen.",
  "Diese Übung dient der kognitiven Unterhaltung und dem Training. Sie ist kein Medizinprodukt und stellt keine klinische Diagnose dar. Bei gesundheitlichen Bedenken wende dich an medizinisches Fachpersonal."
],
  benchmarks: {
    title: "Normative Benchmarks für visuelle Musterspannen",
    headers: ["Leistungsstufe", "Musterspanne (Felder)", "Punktzahl", "Kognitives Profil & Chunking-Muster"],
    rows: [
  [
    "Tier 1 (Exzellent / Top 1%)",
    "10 – 14+ Felder",
    "1.150+ Punkte",
    "Hervorragende räumliche Merkfähigkeit; zerlegt komplexe Muster in 2–3 Gestalt-Primitive; fehlerfreie Beibehaltung im visuellen Cache; Klickfrequenz unter 450 ms."
  ],
  [
    "Tier 2 (Überdurchschnittlich / Top 15%)",
    "8 – 9 Felder",
    "850 – 1.149 Punkte",
    "Übertrifft den normalen Erwachsenen-Durchschnitt; wendet schnelles Formen-Chunking an; robust gegen visuelle Ablenkung; 450 – 650 ms Klickintervall."
  ],
  [
    "Tier 3 (Erwachsenen-Basis / 50%)",
    "6 – 7 Felder",
    "550 – 849 Punkte",
    "Standardwert gesunder Erwachsener (Della Sala et al., 1997); bewältigt einfache Paare; verliert Randfelder auf 5x5-Gittern; 650 – 900 ms Kadenz."
  ],
  [
    "Tier 4 (Unterdurchschnittlich / Engpass)",
    "5 Felder",
    "350 – 549 Punkte",
    "Arbeitet nahe der reinen physiologischen Kapazitätsgrenze (Cowan, 2001); versucht Felder einzeln ohne Formenbildung zu merken; 900 – 1.200 ms Kadenz."
  ],
  [
    "Tier 5 (Trainingsbedarf / Niedrig)",
    "< 5 Felder",
    "< 350 Punkte",
    "Rascher Zerfall der visuellen Spur; anfällig für visuelles Rauschen; Schwierigkeiten bei Mustern über 4 Feldern nach 1,5s Pause; Kadenz über 1.200 ms."
  ]
],
    note: "Die Musterspanne entspricht der maximal fehlerfrei rekonstruierten Matrixkonfiguration während des 45-Sekunden-Durchgangs (Della Sala et al., 1997; Woods et al., 2015)."
  },
  techniques: {
    title: "Evidenzbasierte Techniken zur Steigerung des Matrix-Gedächtnisses",
    items: [
  {
    "name": "Gestalt-Form-Chunking",
    "desc": "Gruppiere benachbarte leuchtende Felder mental zu bekannten geometrischen Grundformen wie Dreiecken, Linien oder Buchstaben (Wertheimer, 1923; Della Sala et al., 1999). 7 Koordinaten in 2 Formen zu bündeln senkt die kognitive Last um über 60 %.",
    "tips": "Suche gezielt nach zusammenhängenden Kanten und Eckblöcken statt isolierten Einzelfeldern."
  },
  {
    "name": "Negativraum-Enkodierung (Ausschlussprinzip)",
    "desc": "Wenn ein Bereich dicht mit leuchtenden Feldern gefüllt ist, merke dir die unbeleuchteten dunklen Lücken. In einem 6er-Block 2 dunkle Aussparungen zu kodieren ist effizienter, als 4 Leuchtfelder zu speichern.",
    "tips": "Fokussiere dich bei hoher Felddichte bewusst auf die dunklen 'Löcher'."
  },
  {
    "name": "Kinästhetisches Linientracking",
    "desc": "Aktiviere den 'Inner Scribe' (Logie, 1995), indem du während der 1,5 Sekunden Einprägezeit mental eine durchgehende Linie durch alle Punkte ziehst. Das Vorplanen von Bewegungspfaden stärkt den passiven Abruf.",
    "tips": "Folge einem festen Lesemuster (z.B. von oben links nach unten rechts), um dem Muster Struktur zu verleihen."
  },
  {
    "name": "Zentrale Blickanker & Parafoveales Abbild",
    "desc": "Halte deinen Blick starr auf das Zentrum des Gitters gerichtet. Hektische Blicksprünge (Sakkaden) verwischen das Bild; das parafoveale Sehfeld erfasst das Gesamtmuster simultan.",
    "tips": "Entspanne deinen Fokus leicht, um das Muster wie ein fotografisches Standbild aufzunehmen."
  }
]
  },
  steps: [
  "Blicke auf die Mitte des Gitters und warte auf das Aufleuchten des Musters.",
  "Fasse die leuchtenden Felder innerhalb von 1,5 Sekunden zu 2 bis 3 geometrischen Formen zusammen.",
  "Nutze bei dichten Clustern den Negativraum (dunkle Lücken), um die Informationsmenge zu reduzieren.",
  "Tippe nach dem Erlöschen die gemerkten Formen zügig auf dem Gitter ein.",
  "Steigere dich von 4x4- auf 5x5-Matrizen, um deine visuelle Kapazitätsgrenze kontinuierlich zu verschieben."
],
  audience: "Gamer für verbesserte Minikarten-Wahrnehmung, MINT-Studenten für räumliches Denken, Schachspieler, Radiologen und alle, die ihr nonverbales Arbeitsgedächtnis trainieren wollen.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('cowan2001', 'baddeley2000', 'logie1995', 'corsi1972', 'luck1997', 'milner1971', 'woods2015'),
  related: [
  {
    "href": "/drills/memory/working-memory/n-back",
    "label": "N-Back Arbeitsgedächtnis-Test"
  },
  {
    "href": "/drills/cognitive/focus/concentration-grid",
    "label": "Schulte-Tabelle (Konzentrationsgitter)"
  },
  {
    "href": "/drills/memory/short-term-memory/digit-span",
    "label": "Zahlenspannen-Test"
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

export default function LocalizedGridMemorizationPage() {
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
      <GridMemorizationClient copy={{
        "h1Keyword": "Visueller Gedächtnistest",
        "h1Suffix": " – Kostenloser Matrix-Muster-Speichertest",
        "caption": "Das visuelle Arbeitsgedächtnis speichert etwa vier separate Objekte gleichzeitig, wobei die Kapazitätsgrenze durch die Objektanzahl und nicht durch den Detailgrad bestimmt wird (Luck & Vogel, 1997). Statische Matrixgitter testen den visuellen Cache – den passiven Speicher für Form und räumliche Anordnung (Logie, 1995).",
        "statScore": "Punkte",
        "statTime": "Restzeit",
        "statGridSize": "Gittergröße",
        "statBest": "Bestwert",
        "hudScore": "Punkte",
        "hudTime": "Zeit",
        "startTitle": "Visueller Gedächtnistest Pro",
        "startSubtitle": "Räumliches Kurzzeitgedächtnis • Musterabruf",
        "countdownSubtitle": "BEREIT MACHEN",
        "newBest": "NEUER REKORD",
        "pointsLabel": "Punkte",
        "statAccuracy": "Präzision",
        "cellsUnit": "Felder",
        "statPeakPattern": "Spitzenmuster",
        "statPerfects": "Perfekt",
        "btnPlayAgain": "Erneut spielen",
        "rulesTitle": "Übungsregeln & Bewertungssystem",
        "rulesItems": [
                {
                        "num": "1",
                        "text": "Musterabruf",
                        "highlight": "+150 PKT",
                        "result": "Positionen aufleuchtender Felder einprägen und antippen"
                },
                {
                        "num": "2",
                        "text": "Level-Progression",
                        "highlight": "4x4 → 5x5",
                        "result": "Schwierigkeit skaliert stufenweise mit jedem Treffer"
                },
                {
                        "num": "3",
                        "text": "Fehlklick / Timeout",
                        "highlight": "Keine Abzüge",
                        "result": "Kein Punkteverlust oder Zeitabzug bei Fehlern"
                },
                {
                        "num": "4",
                        "text": "Schwierigkeit bleibt",
                        "highlight": "Aktuelles Level",
                        "result": "Bei Fehler wird die Runde auf gleicher Stufe wiederholt"
                }
        ]
}} />
      <DrillGuide guide={gridGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/spatial-memory/grid-memorization"
          locale="de"
        />
      </div>
    </>
  );
}
