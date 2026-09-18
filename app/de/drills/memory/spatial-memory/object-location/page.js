import ObjectLocationClient from '@/app/drills/memory/spatial-memory/object-location/ObjectLocationClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Räumlicher Gedächtnistest – Objektposition | SkillDrills",
  description: "Kostenloser räumlicher Gedächtnistest online: Merke dir Objektpositionen auf dem Gitter in 1,5s und lokalisiere Zielkoordinaten ohne Anmeldung.",
  keywords: ['raeumlicher gedaechtnistest', 'objektposition gedaechtnis', 'raeumliches vorstellungsvermoegen test', 'visuell raeumliches arbeitsgedaechtnis', 'object location memory test', 'silverman eals test', 'objektplatzierung merken', 'raeumliche orientierung test', 'wo war was test online', 'koordinaten gedaechtnistraining', 'matrix positionsgdaechtnis', 'raeumliche erinnerungsfaehigkeit'],
  alternates: {
    canonical: "https://skilldrills.online/de/drills/memory/spatial-memory/object-location",
    languages: getAlternateLanguages('/drills/memory/spatial-memory/object-location', 'de'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Räumliches Gedächtnistest (Objektposition) - Kostenloser Online-Test | SkillDrills",
    description: "Kostenloser räumliches Gedächtnis Test (Objekt-Positions-Gedächtnis / Object Location Memory). Prägen Sie sich Anordnungen von Objekten auf 3x3 bis 7x7 Rastern in 1,5 Sekunden ein und lokalisieren Sie Zielkoordinaten präzise. Ohne Anmeldung.",
    url: "https://skilldrills.online/de/drills/memory/spatial-memory/object-location",
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Räumliches Gedächtnistest (Objektposition) - Kostenloser Online-Test | SkillDrills",
    description: "Kostenloser räumliches Gedächtnis Test (Objekt-Positions-Gedächtnis / Object Location Memory). Prägen Sie sich Anordnungen von Objekten auf 3x3 bis 7x7 Rastern in 1,5 Sekunden ein und lokalisieren Sie Zielkoordinaten präzise. Ohne Anmeldung.",
  },
};

export const dynamic = 'force-static';

export default function LocalizedObjectLocationPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://skilldrills.online/de" },
      { "@type": "ListItem", "position": 2, "name": "Gedächtnistraining", "item": "https://skilldrills.online/de/drills/memory" },
      { "@type": "ListItem", "position": 3, "name": "Räumliches Gedächtnis", "item": "https://skilldrills.online/de/drills/memory/spatial-memory" },
      { "@type": "ListItem", "position": 4, "name": "Räumliches Gedächtnistest", "item": "https://skilldrills.online/de/drills/memory/spatial-memory/object-location" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Räumliches Gedächtnistest (Objekt-Positions-Gedächtnis)",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Interaktiver neuropsychologischer Test zur Erfassung von Objekt-Orts-Bindung (Feature Binding), räumlicher Orientierung und Matrix-Positionswiedergabe auf expandierenden Rastern.",
    "genre": "Cognitive Assessment / Spatial Memory",
    "url": "https://skilldrills.online/de/drills/memory/spatial-memory/object-location",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Räumliches Gedächtnistest (Objekt-Positions-Gedächtnis)",
    "url": "https://skilldrills.online/de/drills/memory/spatial-memory/object-location",
    "description": "Interaktiver neuropsychologischer Test zur Erfassung von Objekt-Orts-Bindung (Feature Binding), räumlicher Orientierung und Matrix-Positionswiedergabe auf expandierenden Rastern.",
    "dateModified": "2026-09-05",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "isAccessibleForFree": true,
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Räumliches Gedächtnistest (Objekt-Positions-Gedächtnis)",
    "description": "Interaktiver neuropsychologischer Test zur Erfassung von Objekt-Orts-Bindung (Feature Binding), räumlicher Orientierung und Matrix-Positionswiedergabe auf expandierenden Rastern.",
    "url": "https://skilldrills.online/de/drills/memory/spatial-memory/object-location",
    "genre": ["Memory Game", "Cognitive Training", "Spatial Memory"],
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
            "name": "Was ist ein räumlicher Gedächtnistest (Object Location Memory Test)?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ein kognitiver Test, der erfasst, wie effektiv das Gehirn visuelle Objektmerkmale ('Was ist es?') mit exakten Raumkoordinaten ('Wo befindet es sich?') zu einer einheitlichen Repräsentation verknüpft (Feature Binding)."
            }
      },
      {
            "@type": "Question",
            "name": "Wie funktioniert dieser Übungsmodus?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Auf einem Raster von 3x3 bis 7x7 werden verschiedene Emoji-Objekte für 1,5 Sekunden eingeblendet. Nach dem Ausblenden erscheint oben ein bestimmtes Zielobjekt, dessen ursprüngliche Position auf dem leeren Raster angeklickt werden muss."
            }
      },
      {
            "@type": "Question",
            "name": "Was ist das Silverman-Eals-Paradigma zur Objektposition?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ein 1994 von Marion Eals und Irwin Silverman vorgestellter Meilenstein der Neuropsychologie, der bewies, dass das Ortsgedächtnis für Objekte evolutionär unabhängig von mentaler Rotation und euklidischer Raumorientierung funktioniert."
            }
      },
      {
            "@type": "Question",
            "name": "Was bedeutet 'Feature Binding' in den kognitiven Neurowissenschaften?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Der Prozess, bei dem der ventrale visuelle Pfad (Objekterkennung) und der dorsale Pfad (räumliche Lokalisation) im Hippocampus und parahippocampalen Kortex zu einer zusammenhängenden Erinnerung verschmolzen werden."
            }
      },
      {
            "@type": "Question",
            "name": "Was ist eine durchschnittliche Leistung bei diesem Test?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "In klinischen Tests wie CANTAB PAL lokalisieren gesunde Erwachsene typischerweise 4 bis 6 Objekte auf mittleren Rastern. Da dies ein browserbasiertes Trainingsspiel ist, dienen die Punkte Ihrer persönlichen Orientierung und sind keine medizinische Diagnostik."
            }
      },
      {
            "@type": "Question",
            "name": "Worin liegt der Unterschied zu einem reinen Matrix-Gedächtnistest?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ein reiner Matrix-Test erfordert nur das Merken erleuchteter Felder (binäres Muster), was einfache Gestalt-Gruppierungen erlaubt. Beim Objekt-Positions-Test muss jedoch für jedes Feld die exakte Objektidentität mit der Koordinate verknüpft werden."
            }
      },
      {
            "@type": "Question",
            "name": "Warum ist das Merken von Objektpositionen anspruchsvoller als einfache Formen?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Weil das Verknüpfen zweier Merkmalsdimensionen (Identität und Raum) erhebliche Aufmerksamkeitsressourcen im Arbeitsgedächtnis bindet (Luck & Vogel, 1997) und die kognitive Last verdoppelt."
            }
      },
      {
            "@type": "Question",
            "name": "Welche Hirnareale steuern das räumliche Objektgedächtnis?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Hauptsächlich der bilaterale Hippocampus, der Gyrus parahippocampalis, der posteriore Parietalkortex sowie der dorsolaterale präfrontale Kortex (DLPFC) zur aktiven Koordination."
            }
      },
      {
            "@type": "Question",
            "name": "Gibt es Strafpunkte für Fehlklicks?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Nein. Falsche Klicks führen weder zu Punktabzügen noch zu Zeitverlust. Die Runde wird im selben Level wiederholt, sodass Sie Ihre Ankertechnik stressfrei verbessern können."
            }
      },
      {
            "@type": "Question",
            "name": "Wie hilft das Training im Alltag und beim Gaming?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Es verbessert das Merken von Schlüsselablageorten, Parkplätzen und Werkzeugen und schärft beim Gaming (FPS, MOBA) die Übersicht über gegnerische Positionen und Minimap-Ereignisse."
            }
      }
]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Wie Sie das Objekt-Positions-Gedächtnis und räumliche Anker trainieren",
    "description": "Systematisches 4-Stufen-Protokoll mit Quadranten-Scanning und Landmark-Verankerung zur Steigerung der visuellen Bindungskapazität.",
    "step": [
      {
            "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/de/drills/memory/spatial-memory/object-location#step-1",
            
            "name": "Quadranten-Scanning durchführen",
            "text": "Teilen Sie das Raster in den ersten 500 ms mental in 4 Sektoren (oben links, oben rechts, unten links, unten rechts) ein, um die Verteilung zu erfassen."
      },
      {
            "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/de/drills/memory/spatial-memory/object-location#step-2",
            
            "name": "An markanten Fixpunkten verankern",
            "text": "Binden Sie die Position jedes Objekts an topologische Landmarken wie Ecken, Außenkanten oder die Rastermitte."
      },
      {
            "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/de/drills/memory/spatial-memory/object-location#step-3",
            
            "name": "Semantisch-räumliche Paare bilden",
            "text": "Erstellen Sie blitzschnelle gedankliche Verknüpfungen zwischen Objektidentität und Position (z. B. 'Stern oben rechts, Schlüssel unten')."
      },
      {
            "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/de/drills/memory/spatial-memory/object-location#step-4",
            
            "name": "Zielkoordinaten abrufen und anklicken",
            "text": "Sobald das Raster geleert und das Zielsymbol angezeigt wird, rufen Sie Ihre mentale Karte ab und tippen auf die exakte Zelle."
      }
]
  };

  const objectLocationGuide = {
    intro: [
      "Der Räumliche Gedächtnistest (Object Location Memory Test) ist ein interaktives neuropsychologisches Assessment zur Erfassung von Positionsgedächtnis, visuellem Feature Binding (Merkmalsverknüpfung) und räumlicher Rekonstruktion. Im Gegensatz zu simplen Matrix-Tests, die lediglich das Aufleuchten anonymer Zellen messen, verlangt diese Aufgabe das feste Verknüpfen konkreter visueller Tokens mit exakten Raumkoordinaten.",
      "Die wissenschaftliche Grundlage schufen Marion Eals und Irwin Silverman (1994) in ihren Pionierarbeiten zur Raumkognition. Sie wiesen nach, dass das Gedächtnis für Objektpositionen als spezialisierter evolutionärer Mechanismus getrennt von mentaler Rotation agiert. Bereits zuvor begründete Edward C. Tolman (1948) das Konzept der kognitiven Landkarte (Cognitive Map), das beschreibt, wie Organismen interne Raummodelle ihrer Umwelt konstruieren.",
      "Im Modell des Arbeitsgedächtnisses zeigten Robert H. Logie (1995) und Alan Baddeley (2000), dass die Objekt-Orts-Bindung durch den episodischen Puffer (Episodic Buffer) gesteuert wird, der Eingaben des visuellen Zwischenspeichers (Objektidentitäten) mit denen des inneren Schreibers (Raumkoordinaten) zusammenführt. Steven J. Luck und Edward K. Vogel (1997) bewiesen, dass Merkmalsverknüpfungen erhebliche Aufmerksamkeitsressourcen binden, während Nelson Cowan (2001) nachwies, dass das ungestützte fokale Arbeitsgedächtnis strikt auf 3 bis 4 Elementpaare begrenzt ist.",
      "Unter Einhaltung der von Woods et al. (2015) definierten chronometrischen Standards nutzt diese Übung ein festes 1,5-Sekunden-Einprägefenster und eine adaptive Schwierigkeitstreppe (von 3x3 bis 7x7 Rastern), um Ihre individuelle Bindungsgrenze präzise zu ermitteln.",
      "Funktionsweise der Messung: Jede Eingabe wird lokal über den hochauflösenden performance.now()-Timer Ihres Browsers erfasst – es findet keinerlei Datenübertragung an externe Server statt. Browsertimer werden aus Sicherheitsgründen (Spectre-Schutz) auf etwa 1 ms gerundet; Bildschirme quantisieren Änderungen anhand ihrer Bildwiederholrate (bei 60 Hz ca. 16,7 ms pro Frame; Woods et al., 2015). Differenzen unter 5 ms sind als Messrauschen zu betrachten.",
      "Datentransparenz: SkillDrills speichert keinerlei Nutzerdaten zentral. Ihre Rekorde und Einstellungen verbleiben ausschließlich im localStorage Ihres Browsers. Wir veröffentlichen keine globalen Durchschnittswerte oder Ranglisten; sämtliche Benchmarks basieren auf publizierten Fachstudien im Referenzbereich.",
      "Dieses Tool ist ein kostenloses kognitives Browserspiel zur Übung und Selbstbeobachtung. Es stellt kein medizinisches Diagnoseinstrument dar und ersetzt keine ärztliche Abklärung. Wenden Sie sich bei Gedächtnisproblemen an qualifiziertes medizinisches Fachpersonal."
],
    benchmarks: {
      title: "Normative Benchmarks zur räumlichen Objekt-Bindungskapazität",
      headers: ["Leistungsstufe", "Objektanzahl & Raster", "Punkte", "Kognitives Bindungs- & Raumprofil"],
      rows: [
        [
                "Stufe 1 (Herausragend / Top 1%)",
                "Level 8 – 10+ (8–10+ Objekte, 6x6–7x7 Raster)",
                "1.000+ Punkte",
                "Visuospaziale Elite; nutzt Quadranten-Scanning und Landmark-Verankerung; bindet 8+ Objekt-Orts-Paare mühelos; Zielsuche unter 500 ms"
        ],
        [
                "Stufe 2 (Überdurchschnittlich / Top 15%)",
                "Level 6 – 7 (6–7 Objekte, 5x5–6x6 Raster)",
                "750 – 999 Punkte",
                "Deutlich über Normbereich; robuste semantisch-räumliche Paarung; hohe Resistenz gegen visuelle Interferenz; Zielsuche 500–700 ms"
        ],
        [
                "Stufe 3 (Durchschnitt Erwachsener / Median)",
                "Level 4 – 5 (4–5 Objekte, 4x4–5x5 Raster)",
                "450 – 749 Punkte",
                "Normaler Populationsdurchschnitt (Eals & Silverman, 1994); bewältigt ca. 4 Verknüpfungen (Cowan-Limit); verliert zentrale Objekte auf 5x5; 700–950 ms"
        ],
        [
                "Stufe 4 (Unterdurchschnittlich / Bindungsengpass)",
                "Level 3 (3 Objekte, 3x3–4x4 Raster)",
                "250 – 449 Punkte",
                "Erinnert nur 2–3 isolierte Objekte; verwechselt benachbarte Koordinaten; anfällig bei Zunahme von Distraktoren; 950–1.300 ms"
        ],
        [
                "Stufe 5 (Trainingsbedarf / Geringe Merkspanne)",
                "Level 1 – 2 (2 Objekte, 3x3 Raster)",
                "< 250 Punkte",
                "Schneller Zerfall visueller Spuren; mangelnde Objekt-Orts-Verknüpfung; Zielfindung selbst nach 1,5 s Verzögerung erschwert; über 1.300 ms Latenz"
        ]
],
      note: "Objektanzahl und Rastergröße entsprechen der höchsten in 45 Sekunden erreichten Stufe; normiert nach Silverman-Eals OLM und CANTAB PAL Standards."
    },
    techniques: {
      title: "Evidenzbasierte Strategien zur Steigerung der Objekt-Orts-Bindung",
      items: [
        {
                "name": "Landmark-Verankerung (Landmark Anchoring)",
                "desc": "Verankern Sie Objekte an festen topologischen Fixpunkten wie den 4 Ecken, Kanten oder der Mitte (Tolman, 1948). 'Der Diamant ist in der linken oberen Ecke' ersetzt komplexe Koordinatenberechnungen durch markante Baken.",
                "tips": "Prüfen Sie in den ersten 500 ms gezielt, welche Symbole an Ecken oder Rändern liegen."
        },
        {
                "name": "Semantisch-räumliche Paarung",
                "desc": "Knüpfen Sie assoziative Geschichten zwischen Objektbedeutung und Raumposition (Baddeley, 2000). Ein Stern oben wird mit dem Himmel verknüpft, ein Schlüssel unten mit einer Bodenschublade.",
                "tips": "Nutzen Sie kurze mentale Etiketten wie 'Stern oben, Schlüssel unten'."
        },
        {
                "name": "Quadranten-Zoning",
                "desc": "Unterteilen Sie größere 5x5- oder 7x7-Raster mental in 4 Quadranten. Das Vorabzählen der Objekte pro Quadrant schränkt das spätere Suchfeld enorm ein.",
                "tips": "Zählen Sie erst die Anzahl der Objekte pro Sektor, bevor Sie deren genaue Zellen fixieren."
        },
        {
                "name": "Parafovealer Zentrums-Blick",
                "desc": "Fixieren Sie die Rastermitte, um die globale Verteilung periphere zu erfassen, und nutzen Sie 1–2 gezielte Mikrosakkaden zur Verifikation unklarer Icons.",
                "tips": "Vermeiden Sie hektische Augenbewegungen; halten Sie den Kopf ruhig und scannen Sie gleichmäßig."
        }
]
    },
    steps: [
      "Fokussieren Sie die Mitte des Rasters und erfassen Sie die Gesamtanordnung.",
      "Verbinden Sie während der 1,5 s Präsentation jedes Objekt mit festen Landmarken.",
      "Bilden Sie blitzschnelle semantisch-räumliche Assoziationen zwischen Symbol und Ort.",
      "Rufen Sie nach dem Leeren des Rasters Ihre mentale Karte ab und tippen Sie das gesuchte Feld an.",
      "Meistern Sie schrittweise erweiterte 3x3- bis 7x7-Matrizen zur Steigerung Ihrer Bindungskapazität."
],
    audience: "Gamer (Minimap- und Cooldown-Tracking), Radiologen, Studierende technischer Fächer und alle, die ihr visuell-räumliches Arbeitsgedächtnis trainieren möchten.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('cowan2001', 'baddeley2000', 'logie1995', 'luck1997', 'tolman1948', 'eals1994', 'woods2015'),
    related: [
      {
            "href": "/drills/memory/spatial-memory/grid-memorization",
            "label": "Visueller Gedächtnistest (Memory Matrix)"
      },
      {
            "href": "/drills/memory/spatial-memory/path-tracing",
            "label": "Pfade-Nachzeichnen Test (Path Tracing)"
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
      <ObjectLocationClient
        copy={{
        "h1Keyword": "Räumliches Gedächtnistest",
        "h1Suffix": " (Objektposition)",
        "subtitle": "Das Objekt-Positions-Gedächtnis speichert, was sich wo befand. Eals und Silverman (1994) maßen diese Fähigkeit mit Objektanordnungen wie dieser, die wie andere visuelle Arbeitsgedächtnisaufgaben bei etwa vier Objekten an ihre Kapazitätsgrenze stößt (Luck & Vogel, 1997).",
        "statScore": "Punkte",
        "statTime": "Zeit",
        "statLevel": "Level",
        "statBestScore": "Bester Score",
        "levelPrefix": "Lv.",
        "memorizePrompt": "OBJEKTPOSITIONEN EINPRÄGEN",
        "targetPrompt": "ZIEL:",
        "startTitle": "Objektposition Pro",
        "startSubtitle": "Räumliches Gedächtnis • Positionserkennung",
        "countdownSubtitle": "BEREITMACHEN",
        "newBest": "NEUER REKORD",
        "pointsLabel": "Punkte",
        "statAccuracy": "Genauigkeit",
        "statPeakLevel": "Höchstes Level",
        "statPerfects": "Perfekt",
        "btnPlayAgain": "Erneut spielen",
        "rulesTitle": "Anleitung & Punktesystem",
        "aboutTitle": "Über das Objekt-Positions-Training",
        "rulesItems": [
                {
                        "num": "1",
                        "text": "Positionen merken & Ziel finden",
                        "highlight": "+150 PKT",
                        "result": "Objekte in 1,5 s einprägen und danach das gesuchte Ziel anklicken"
                },
                {
                        "num": "2",
                        "text": "Raster-Progression",
                        "highlight": "3x3 → 7x7",
                        "result": "Mit steigendem Level wachsen Rastergröße und Objektanzahl"
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
                        "result": "Schwierigkeit sinkt nicht, sodass Sie Ihre Raumanker festigen können"
                }
        ]
}}
      />
      <DrillGuide guide={objectLocationGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/spatial-memory/object-location"
          locale="de"
        />
      </div>
    </>
  );
}
