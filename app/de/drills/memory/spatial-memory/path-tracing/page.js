import PathTracingClient from '@/app/drills/memory/spatial-memory/path-tracing/PathTracingClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Corsi-Block-Test – Sequenzgedächtnis | SkillDrills",
  description: "Kostenloser Corsi-Block-Test online: Merke dir Schrittfolgen auf dem Gitter und reproduziere Pfade in exakter Reihenfolge ohne Anmeldung.",
  keywords: ['corsi block test', 'sequenzgedaechtnis test', 'corsi block tapping test', 'raeumliche sequenz merkfaehigkeit', 'path tracing test online', 'sequentielles arbeitsgedaechtnis', 'pfad gedaechtnistest', 'bewegungsmuster merken', 'corsi spanne messen', 'visomotorische sequenz test', 'raeumlicher abruftest', 'wegetest neuropsychologie'],
  alternates: {
    canonical: "https://skilldrills.online/de/drills/memory/spatial-memory/path-tracing",
    languages: getAlternateLanguages('/drills/memory/spatial-memory/path-tracing', 'de'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Corsi-Block-Test (Sequenzgedächtnis) - Kostenloser Online-Test | SkillDrills",
    description: "Kostenloser Corsi-Block-Test online (Sequenzgedächtnis / Path Tracing). Prägen Sie sich Schrittabfolgen auf 3x3 bis 7x7 Rastern ein und zeichnen Sie Pfade in exakter Reihenfolge nach. Ohne Anmeldung.",
    url: "https://skilldrills.online/de/drills/memory/spatial-memory/path-tracing",
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Corsi-Block-Test (Sequenzgedächtnis) - Kostenloser Online-Test | SkillDrills",
    description: "Kostenloser Corsi-Block-Test online (Sequenzgedächtnis / Path Tracing). Prägen Sie sich Schrittabfolgen auf 3x3 bis 7x7 Rastern ein und zeichnen Sie Pfade in exakter Reihenfolge nach. Ohne Anmeldung.",
  },
};

export const dynamic = 'force-static';

export default function LocalizedPathTracingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://skilldrills.online/de" },
      { "@type": "ListItem", "position": 2, "name": "Gedächtnistraining", "item": "https://skilldrills.online/de/drills/memory" },
      { "@type": "ListItem", "position": 3, "name": "Räumliches Gedächtnis", "item": "https://skilldrills.online/de/drills/memory/spatial-memory" },
      { "@type": "ListItem", "position": 4, "name": "Corsi-Block-Test", "item": "https://skilldrills.online/de/drills/memory/spatial-memory/path-tracing" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Corsi-Block-Test (Sequenzgedächtnis Online)",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Interaktiver neuropsychologischer Test zur Erfassung von sequentiellem visuell-räumlichem Arbeitsgedächtnis, Routenrekonstruktion und Corsi-Block-Spanne auf expandierenden Rastern.",
    "genre": "Cognitive Assessment / Spatial Memory",
    "url": "https://skilldrills.online/de/drills/memory/spatial-memory/path-tracing",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Corsi-Block-Test (Sequenzgedächtnis Online)",
    "url": "https://skilldrills.online/de/drills/memory/spatial-memory/path-tracing",
    "description": "Interaktiver neuropsychologischer Test zur Erfassung von sequentiellem visuell-räumlichem Arbeitsgedächtnis, Routenrekonstruktion und Corsi-Block-Spanne auf expandierenden Rastern.",
    "dateModified": "2026-09-05",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "isAccessibleForFree": true,
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Corsi-Block-Test (Sequenzgedächtnis Online)",
    "description": "Interaktiver neuropsychologischer Test zur Erfassung von sequentiellem visuell-räumlichem Arbeitsgedächtnis, Routenrekonstruktion und Corsi-Block-Spanne auf expandierenden Rastern.",
    "url": "https://skilldrills.online/de/drills/memory/spatial-memory/path-tracing",
    "genre": ["Memory Game", "Cognitive Training", "Spatial Sequence Memory"],
    "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
    "applicationCategory": "Game",
    "operatingSystem": "Any",
    "numberOfPlayers": {
      "@type": "QuantitativeValue",
      "value": 1
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-05",
    "mainEntity": [
      {
            "@type": "Question",
            "name": "Was ist der Corsi-Block-Test (Path Tracing Memory Test)?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ein neuropsychologisches Messverfahren zur Bestimmung des sequentiellen visuell-räumlichen Arbeitsgedächtnisses. Die Testperson beobachtet eine Abfolge aufleuchtender Felder und muss den Pfad in exakt gleicher Reihenfolge wiederholen."
            }
      },
      {
            "@type": "Question",
            "name": "Was misst die Corsi-Block-Spanne im Gehirn?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sie erfasst die Kapazität des 'Inner Scribe' im visuell-räumlichen Arbeitsgedächtnis (Logie, 1995), der für dynamische Bewegungsabläufe, motorische Planung und zeitlich geordnete Pfadsequenzen zuständig ist."
            }
      },
      {
            "@type": "Question",
            "name": "Was ist der 'Inner Scribe' im Arbeitsgedächtnismodell?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Robert H. Logie (1995) unterteilte das visuell-räumliche Arbeitsgedächtnis in den passiven 'Visual Cache' (für statische Bilder) und den aktiven 'Inner Scribe' (ein motorisch-räumliches Rehearsal-System für Bewegungsfolgen)."
            }
      },
      {
            "@type": "Question",
            "name": "Was ist eine normale Corsi-Spanne bei gesunden Erwachsenen?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "In normierten Studien (Kessels et al., 2000) liegt die durchschnittliche Vorwärtsspanne gesunder Erwachsener bei 5,4 ± 0,9 Schritten. Werte ab 8 Schritten gelten als herausragend."
            }
      },
      {
            "@type": "Question",
            "name": "Wie funktioniert Richtungsvektor-Chunking?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Statt einzelne Rasterpunkte separat abzuspeichern, fasst man diese zu Richtungsblöcken zusammen (z. B. 'Diagonale nach rechts, Haken nach unten'). Dadurch wird die Belastung unter das Cowan-Limit (4 Einheiten) gesenkt."
            }
      },
      {
            "@type": "Question",
            "name": "Worin unterscheidet sich dieser Test von Matrix-Mustern?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Statische Matrizen blitzen alle gleichzeitig auf und werden als ein einziges Bild gespeichert. Pfadverfolgung erfordert hingegen die exakte zeitliche Reihenfolgekodierung jedes einzelnen Schrittes."
            }
      },
      {
            "@type": "Question",
            "name": "Warum fallen lange Schrittfolgen so schwer?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Weil das ungestützte fokale Arbeitsgedächtnis laut Nelson Cowan (2001) strikt auf etwa 4 Elemente begrenzt ist. Ohne geometrisches Chunking zerfällt die Spur nach 4 bis 5 Schritten."
            }
      },
      {
            "@type": "Question",
            "name": "Wie hilft räumliches Sequenzgedächtnis im Alltag und beim Gaming?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Es steuert die Wegfindung im Straßenverkehr, das Erlernen von Choreografien und beim Gaming das automatisierte Abrufen von Rotationspfaden und Fähigkeitskombinationen."
            }
      },
      {
            "@type": "Question",
            "name": "Gibt es Strafpunkte für falsche Schritte?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Nein. Fehlklicks führen weder zu Punktabzügen noch zu Zeitverlust. Die Runde wird im selben Level wiederholt, sodass Sie Ihre Chunking-Technik stressfrei verfeinern können."
            }
      },
      {
            "@type": "Question",
            "name": "Lässt sich das Pfadgedächtnis gezielt trainieren?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja. Gezieltes Üben automatisiert die Vektorbündelung, stärkt den Inner Scribe und erhöht die Abrufgeschwindigkeit unter Zeitdruck."
            }
      }
]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Wie Sie Ihr räumliches Sequenzgedächtnis mit Pfadverfolgung trainieren",
    "description": "Systematisches 4-Phasen-Protokoll mit Richtungsvektor-Chunking und innerem Bewegungssimulations-Rehearsal.",
    "step": [
      {
            "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/de/drills/memory/spatial-memory/path-tracing#step-1",
            
            "name": "Startpunkt fixieren und Bewegung antizipieren",
            "text": "Richten Sie den Blick auf den ersten aufblitzenden Punkt, ohne den Augen hektisch hinterherzuspringen, um den Gesamtvektor wahrzunehmen."
      },
      {
            "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/de/drills/memory/spatial-memory/path-tracing#step-2",
            
            "name": "Einzelschritte in Richtungsvektoren bündeln",
            "text": "Fassen Sie benachbarte Punkte mental zu Sinneinheiten zusammen (z. B. 'zwei rechts, einer hoch' oder 'L-Form')."
      },
      {
            "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/de/drills/memory/spatial-memory/path-tracing#step-3",
            
            "name": "Dynamische Route im Inner Scribe wiederholen",
            "text": "Nutzen Sie die kurze Verzögerung, um den Pfad im motorischen Kortex innerlich als kontinuierliche Linie nachzuziehen."
      },
      {
            "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/de/drills/memory/spatial-memory/path-tracing#step-4",
            
            "name": "In gleichmäßigem motorischem Rhythmus abrufen",
            "text": "Tippen Sie die Felder zügig und rhythmisch an. Zögern beschleunigt den Zerfall der Gedächtnisspur."
      }
]
  };

  const pathTracingGuide = {
    intro: [
      "Der Corsi-Block-Test (Path Tracing Memory Test) ist ein interaktives neuropsychologisches Assessment zur Erfassung des sequentiellen räumlichen Arbeitsgedächtnisses, der dynamischen Routenerinnerung und der Rekonstruktion von Richtungstrajektorien auf Matrizen von 3x3 bis 7x7. Verwurzelt im klassischen Corsi-Block-Tapping-Paradigma (Milner, 1971; Corsi, 1972) und Robert H. Logies (1995) 'Inner Scribe'-Modell, isoliert dieser Test die aktive raumzeitliche Bewegungskodierung von statischen Bildmustern.",
      "In jedem Durchgang leuchtet eine Sequenz von Feldern in standardisierten 500-ms-Intervallen auf. Die Testperson muss sowohl die Koordinaten als auch die zeitliche Abfolge behalten und anschließend in exakter chronologischer Reihenfolge innerhalb eines 45-Sekunden-Fensters nachzeichnen.",
      "Im Modell des Arbeitsgedächtnisses wiesen Logie (1995) und Alan Baddeley (2000) nach, dass sequentielle Bewegungsabläufe vom 'Inner Scribe' – einer aktiven räumlichen Wiederholungsschleife – gestützt werden. George A. Miller (1956) und Herbert A. Simon (1974) bewiesen die Notwendigkeit hierarchischer Bündelung (Chunking), während Nelson Cowan (2001) die Kapazitätsgrenze des ungestützten fokalen Arbeitsgedächtnisses auf etwa 4 Elemente festlegte.",
      "Standardisierte Normdaten computerisierter Corsi-Aufgaben (Kessels et al., 2000) beziffern die durchschnittliche Spanne gesunder Erwachsener auf 5,4 ± 0,9 Schritte. Diese Spanne reagiert hochsensibel auf kognitive Ermüdung, Schlafmangel und exekutive Funktionen.",
      "Funktionsweise der Messung: Jede Eingabe wird lokal über den hochauflösenden performance.now()-Timer Ihres Browsers erfasst – ohne Datenübertragung an externe Server. Browsertimer werden aus Sicherheitsgründen (Spectre-Schutz) auf etwa 1 ms gerundet; Bildschirme quantisieren Änderungen anhand ihrer Bildwiederholrate (bei 60 Hz ca. 16,7 ms; Woods et al., 2015). Differenzen unter 5 ms sind als Messrauschen zu betrachten.",
      "Datentransparenz: SkillDrills speichert keinerlei Nutzerdaten zentral. Ihre Rekorde und Einstellungen verbleiben ausschließlich im localStorage Ihres Browsers. Wir veröffentlichen keine globalen Durchschnittswerte oder Ranglisten; sämtliche Benchmarks basieren auf publizierten Fachstudien im Referenzbereich.",
      "Dieses Tool ist ein kostenloses kognitives Browserspiel zur Übung und Selbstbeobachtung. Es stellt kein medizinisches Diagnoseinstrument dar und ersetzt keine ärztliche Abklärung. Wenden Sie sich bei Gedächtnisproblemen an qualifiziertes medizinisches Fachpersonal."
],
    benchmarks: {
      title: "Normative Benchmarks zum sequentiellen Corsi-Block-Gedächtnis",
      headers: ["Leistungsstufe", "Spannengröße & Raster", "Punkte", "Kognitives Profil & Trajektorien-Repertoire"],
      rows: [
        [
                "Stufe 1 (Herausragend / Top 1%)",
                "Spanne 10 – 14+ Schritte (6x6–7x7 Raster)",
                "1.200+ Punkte",
                "Visuospaziale Elite; zerlegt komplexe Routen in 2–3 Makrovektoren; exzellentes Inner-Scribe-Rehearsal; flüssiger Abruf unter 400 ms"
        ],
        [
                "Stufe 2 (Überdurchschnittlich / Top 15%)",
                "Spanne 8 – 9 Schritte (5x5–6x6 Raster)",
                "900 – 1.199 Punkte",
                "Deutlich über Populationsdurchschnitt; nutzt geometrisches Chunking (L-Turns, Zickzack); hohe Interferenzresistenz; 400–600 ms"
        ],
        [
                "Stufe 3 (Durchschnitt Erwachsener / Median)",
                "Spanne 5 – 7 Schritte (4x4–5x5 Raster)",
                "600 – 899 Punkte",
                "Normaler Populationsdurchschnitt (Corsi, 1972; Kessels et al., 2000, 5,4 ± 0,9 Spanne); meistert 5–6 Schritte; verliert Wegpunkte auf 5x5; 600–850 ms"
        ],
        [
                "Stufe 4 (Unterdurchschnittlich / Sequenzzerfall)",
                "Spanne 4 Schritte (3x3–4x4 Raster)",
                "400 – 599 Punkte",
                "Arbeitet an der Cowan-Grenze (2001); versucht Punkte isoliert zu merken; anfällig für Reihenfolgefehler; 850–1.100 ms"
        ],
        [
                "Stufe 5 (Trainingsbedarf / Geringe Merkspanne)",
                "Spanne < 4 Schritte (3x3 Raster)",
                "< 400 Punkte",
                "Schneller Spurenzerfall; häufige Vertauschung der Reihenfolge; Schwierigkeiten ab 3 Schritten; Latenz über 1.100 ms"
        ]
],
      note: "Spannenlänge und Rastergröße entsprechen der höchsten in 45 Sekunden erreichten Stufe; normiert nach Corsi-Block-Tapping-Standards."
    },
    techniques: {
      title: "Evidenzbasierte Strategien zur Steigerung der Sequenzspanne",
      items: [
        {
                "name": "Richtungsvektor-Chunking (Miller 1956; Simon 1974)",
                "desc": "Fassen Sie Schritte mental zu Makropfeilen zusammen (z. B. 'zwei rechts, einer hoch'). Die Bündelung zu geometrischen Figuren senkt die kognitive Last um mehr als 60 %.",
                "tips": "Suchen Sie nach L-Mustern, Dreiecken oder Treppenformen statt nach einzelnen Punkten."
        },
        {
                "name": "Kinästhetisches Inner-Scribe-Rehearsal (Logie 1995)",
                "desc": "Aktivieren Sie während des Zusehens den motorischen Kortex, indem Sie die Linie gedanklich mit den Fingern nachziehen. Motorisches Vorplanen festigt die Spur.",
                "tips": "Spüren Sie die Bewegung in der Hand, bevor Sie den Bildschirm berühren."
        },
        {
                "name": "Parafoveale Zentrums-Fixierung",
                "desc": "Fixieren Sie die Rastermitte, um die Bewegung periphere zu erfassen, statt hektische Blicksprünge zu jedem einzelnen Feld auszuführen.",
                "tips": "Halten Sie Augen und Kopf ruhig und erfassen Sie die Sequenz im Gesamtblick."
        },
        {
                "name": "Rhythmische Ausführung (Pacing)",
                "desc": "Tippen Sie die Folge zügig in einem gleichmäßigen Takt ein. Zögern führt zum Verfall späterer Wegpunkte; führen Sie den Chunk als geschlossenen motorischen Burst aus.",
                "tips": "Tippen Sie im Takt eines inneren Metronoms, ohne bei Einzelschritten innezuhalten."
        }
]
    },
    steps: [
      "Fokussieren Sie die Mitte des Rasters und beobachten Sie die aufleuchtende Schrittfolge.",
      "Bündeln Sie die Einzelschritte mental zu zusammenhängenden Richtungsvektoren.",
      "Wiederholen Sie die kontinuierliche Linie in der kurzen Pause mit dem Inner Scribe.",
      "Tippen Sie die Koordinaten in exakter Reihenfolge mit rhythmischem Schwung ab.",
      "Erweitern Sie Ihre sequentielle Raumspanne auf Rastern von 3x3 bis 7x7."
],
    audience: "Gamer (Laufwege und Skill-Sequenzen), Tänzer, Sportler, MINT-Studierende und alle, die ihr visuell-räumliches Sequenzgedächtnis schärfen wollen.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('corsi1972', 'milner1971', 'logie1995', 'cowan2001', 'baddeley2000', 'miller1956', 'simon1974', 'kessels2000', 'woods2015'),
    related: [
      {
            "href": "/drills/memory/spatial-memory/grid-memorization",
            "label": "Visueller Gedächtnistest (Memory Matrix)"
      },
      {
            "href": "/drills/memory/spatial-memory/object-location",
            "label": "Objekt-Positions-Gedächtnis (Object Location)"
      },
      {
            "href": "/drills/memory/short-term-memory/digit-span",
            "label": "Zahlenspannen-Test (Digit Span)"
      },
      {
            "href": "/drills/memory/short-term-memory/word-recall",
            "label": "Verbaler Gedächtnistest (Word Recall)"
      },
      {
            "href": "/drills/memory/working-memory/n-back",
            "label": "Dual N-Back Test"
      }
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
      <PathTracingClient
        copy={{
        "h1Keyword": "Corsi-Block-Test",
        "h1Suffix": " (Sequenzgedächtnis)",
        "subtitle": "Die Raumspanne ist die längste Positionsabfolge, die Sie in exakter Reihenfolge wiederholen können. Der klassische Corsi-Block-Test beziffert die durchschnittliche Spanne gesunder Erwachsener auf etwa fünf bis sieben Schritte (Milner, 1971; Corsi, 1972) und nutzt ein anderes System als die verbale Zahlenspanne (Logie, 1995).",
        "statScore": "Punkte",
        "statTime": "Zeit",
        "statLevel": "Level",
        "statBestScore": "Bester Score",
        "levelPrefix": "Lv.",
        "startTitle": "Pfadverfolgung Pro",
        "startSubtitle": "Räumliches Sequenzgedächtnis • Corsi-Block-Test",
        "countdownSubtitle": "BEREITMACHEN",
        "newBest": "NEUER REKORD",
        "pointsLabel": "Punkte",
        "statAccuracy": "Genauigkeit",
        "statPeakLevel": "Höchstes Level",
        "statPerfects": "Perfekt",
        "btnPlayAgain": "Erneut spielen",
        "rulesTitle": "Anleitung & Punktesystem",
        "aboutTitle": "Über das Pfadverfolgungs- & Corsi-Block-Training",
        "rulesItems": [
                {
                        "num": "1",
                        "text": "Pfad merken & Reihenfolge nachzeichnen",
                        "highlight": "+150 PKT",
                        "result": "Aufleuchtende Sequenz einprägen und in exakter Reihenfolge antippen"
                },
                {
                        "num": "2",
                        "text": "Raster- & Spannen-Progression",
                        "highlight": "3x3 → 7x7",
                        "result": "Mit steigendem Level wachsen Rastergröße und Pfadlänge"
                },
                {
                        "num": "3",
                        "text": "Fehlklick / Zeitablauf",
                        "highlight": "Keine Strafpunkte",
                        "result": "Kein Punkte- oder Zeitverlust; Runde wird wiederholt"
                },
                {
                        "num": "4",
                        "text": "Level bleibt stabil",
                        "highlight": "Kein Abstieg",
                        "result": "Schwierigkeit sinkt nicht, sodass Sie Ihre Vektor-Chunking-Strategie festigen können"
                }
        ]
}}
      />
      <DrillGuide guide={pathTracingGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/spatial-memory/path-tracing"
          locale="de"
        />
      </div>
    </>
  );
}
