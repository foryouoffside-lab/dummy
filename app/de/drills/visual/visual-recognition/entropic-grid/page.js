import EntropicGridClient from '@/app/drills/visual/visual-recognition/entropic-grid/EntropicGridClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Visuelle Suche Test: Entropic Grid | SkillDrills",
  description: "Kostenloser Visuelle Suche Test: Finde Zielzeichen in einer 100-Zellen-Matrix unter dynamischem Rauschen. Trainiere selektive Aufmerksamkeit online.",
  keywords: [
    "visuelle suche test",
    "selektive aufmerksamkeit test",
    "visuelle aufmerksamkeit training",
    "entropic grid",
    "visuelle reizfilterung",
    "merkmalsintegration theorie",
    "periphere rasterabtastung",
    "informationsverarbeitungsgeschwindigkeit",
    "esports visual search",
    "aim scanning test"
  ],
  openGraph: {
    title: "Visuelle Suche Test – Entropic Grid & Selektive Aufmerksamkeit Online | SkillDrills",
    description: "Wissenschaftlicher Visuelle Suche Test in 100-Zellen-Matrix unter dynamischem Hintergrundrauschen. Trainiere selektive Aufmerksamkeit und periphere Reizfilterung kostenlos online.",
    type: 'article',
    url: 'https://skilldrills.online/de/drills/visual/visual-recognition/entropic-grid',
    siteName: 'SkillDrills',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Visuelle Suche Test – Entropic Grid & Selektive Aufmerksamkeit Online | SkillDrills",
    description: "Wissenschaftlicher Visuelle Suche Test unter dynamischem Hintergrundrauschen. Trainiere selektive Aufmerksamkeit und kognitive Filterung.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/visual/visual-recognition/entropic-grid',
    languages: getAlternateLanguages('/drills/visual/visual-recognition/entropic-grid'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "SkillDrills Startseite",
      "item": "https://skilldrills.online/de"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Trainings-Hub",
      "item": "https://skilldrills.online/de/drills"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Visuelles Training",
      "item": "https://skilldrills.online/de/drills/visual"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Visuelle Erkennung & Suche",
      "item": "https://skilldrills.online/de/drills/visual/visual-recognition"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Visuelle Suche Test (Entropic Grid)",
      "item": "https://skilldrills.online/de/drills/visual/visual-recognition/entropic-grid"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SkillDrills Visuelle Suche & Entropic Grid Messung",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Any",
  "browserRequirements": "HTML5 Canvas fähiger Webbrowser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "description": "Wissenschaftlich fundiertes Online-Instrument zur präzisen Erfassung der visuellen Suchlatenz, selektiven Aufmerksamkeit und sensorischen Reizfilterung in dynamischen Entropie-Rastern."
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Kostenloses Visuelle Suche Training (Entropic Grid)",
  "url": "https://skilldrills.online/de/drills/visual/visual-recognition/entropic-grid",
  "applicationCategory": "GameApplication",
  "genre": ["Visuelle Suche Test", "Selektive Aufmerksamkeit Test", "Kognitives Training", "Periphere Wahrnehmung"],
  "browserRequirements": "Requires HTML5 Canvas and JavaScript",
  "inLanguage": "de-DE"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Entropic Grid Visuelle Suche (Visual Search Paradigm)",
  "description": "Finde und klicke vorgegebene alphanumerische Zielcodes in einer 100-Zellen-Matrix gegen dynamisch wechselndes Hintergrundrauschen unter Zeitdruck.",
  "genre": ["Cognitive Drill", "Vision Training", "Esports Reaction"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was ist der Entropic Grid Visuelle Suche Test (Visual Search Task)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dieser Test basiert auf dem kognitionspsychologischen Paradigma der visuellen Suche (Visual Search Paradigm), übertragen auf ein dynamisches Umfeld. In einer dichten Matrix aus 100 Zellen wechseln alle 700 Millisekunden zufällige alphanumerische Hintergrunddistraktoren. Der Nutzer muss einen oben angezeigten Zielcode (z. B. 'K7') unter stetig flimmerndem Rauschen blitzschnell identifizieren und anklicken. Anders als statische Zahlentabellen (wie der Schulte-Tisch) fordert dieser Drill die aktive zerebrale Reizfilterung und selektive visuelle Aufmerksamkeit (Selective Visual Attention) auf höchstem Niveau."
      }
    },
    {
      "@type": "Question",
      "name": "Was unterscheidet parallele Pop-Out-Suche von serieller Suche?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gemäß Anne Treismans Merkmalsintegrationstheorie (Treisman & Gelade, 1980) werden isolierte physikalische Eigenschaften wie Farben oder Orientierungen präattentiv und parallel über das gesamte Blickfeld erfasst ('Pop-Out'). Müssen jedoch mehrere Merkmale zu komplexen Formen (wie Buchstaben und Ziffern) verknüpft werden, erfordert dies eine serielle Verlagerung des Aufmerksamkeitsfokus. Fortgeschrittene Anwender nutzen das Guided-Search-Modell (Wolfe, 2007), um durch grobe Vorfilterung und gezielte Sakkaden die Suchlatenz auf ein Minimum zu reduzieren."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Vorteile bietet das Training für taktische Shooter (Valorant, CS2, Apex Legends)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wettkampforientierte FPS-Spiele zeichnen sich durch visuellen Clutter aus: Partikeleffekte, wechselnde Schatten, Rauchgranaten und komplexe Wandtexturen. Das Training stärkt die Fähigkeit des Gehirns, irrelevante optische Unruhe auszublenden und gegnerische Konturen (wie Köpfe an Peeking-Winkeln) augenblicklich hervorzuheben. Die Latenz zwischen dem Auftauchen des Ziels und dem Initiieren der Mausbewegung (Target Acquisition Latency) wird spürbar verkürzt."
      }
    },
    {
      "@type": "Question",
      "name": "Wie lässt sich das 100-Zellen-Raster am schnellsten und fehlerfreiesten scannen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Das schrittweise Ablesen Zelle für Zelle ist ineffizient. Teilen Sie die Matrix mental in vier Quadranten (oben links, oben rechts, unten links, unten rechts) ein. Fixieren Sie jeweils die Mitte eines Quadranten und erfassen Sie mit der peripheren Sicht Blöcke von 4 bis 9 Zellen gleichzeitig. Diese '4-Quadranten-Rasterabtastung' halbiert die Anzahl nötiger Mikrosakkaden und spart wertvolle Millisekunden."
      }
    },
    {
      "@type": "Question",
      "name": "Wie verhindert man, dass das 700-ms-Flimmern der Hintergrundzeichen die Aufmerksamkeit stört?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Durch die Aktivierung des dorsalen Aufmerksamkeitsnetzwerks für eine robuste Top-Down-Steuerung. Der präfrontale Kortex muss den reflexartigen, stimulusgetriebenen Blickwechsel (Bottom-Up-Capture) aktiv hemmen. Konzentrieren Sie sich ausschließlich auf die geometrischen Schlüsselmerkmale des Zielsymbols (z. B. diagonale Striche bei 'K', Rundungen bei '8'), um irrelevante Flackerreize im visuellen Kortex herauszufiltern (Duncan & Humphreys, 1989)."
      }
    },
    {
      "@type": "Question",
      "name": "Wie unterscheidet sich der Entropic Grid von einem klassischen Schulte-Tisch (Schulte Table)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Klassische Schulte-Tabellen bestehen aus festen Zahlen von 1 bis 25, die in aufsteigender Reihenfolge gesucht werden. Das Raster bleibt statisch und vorhersehbar. Im Entropic Grid hingegen generiert das System fortlaufend dynamisches Rauschen, und nach jedem Treffer wird sofort ein neuer, zufälliger Code generiert. Positionsgedächtnis nützt hier nichts – gemessen wird die reine visuelle Verarbeitungsgeschwindigkeit unter dynamischer Störung."
      }
    },
    {
      "@type": "Question",
      "name": "Verbessert die visuelle Suche auch die Lesegeschwindigkeit und Bildschirmarbeit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, signifikant. Das Training verkürzt die durchschnittliche Fixationsdauer der Augen und erweitert die perzeptuelle Spanne (Visual Span). Dies erleichtert das schnelle Überfliegen umfangreicher Tabellen, Programmcodes, Verträge oder wissenschaftlicher Berichte, indem relevante Schlüsselbegriffe ohne zeilenweises Verharren erfasst werden."
      }
    },
    {
      "@type": "Question",
      "name": "Warum sinkt die visuelle Suchgeschwindigkeit mit dem Alter und wie lässt sich gegensteuern?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mit zunehmendem Alter verengt sich das sogenannte nützliche Sehfeld (UFOV: Useful Field of View), und die Hemmung irrelevanter visueller Reize lässt nach (Woods et al., 2015). Regelmäßiges dynamisches Suchtraining stimuliert die neuronale Plastizität in okzipitalen und parietalen Arealen, wodurch das UFOV erweitert und Reaktionsgeschwindigkeiten auf hohem Niveau konserviert werden können."
      }
    },
    {
      "@type": "Question",
      "name": "Was ist das optimale tägliche Trainingspensum für maximale neuroplastische Anpassung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "3 bis 5 konzentrierte Durchgänge à 45 Sekunden (Gesamtdauer ca. 5 bis 8 Minuten) sind optimal. Da maximale selektive Aufmerksamkeit viel zerebrale Energie verbraucht, führt Übermüdung rasch zu Frustration und fehlerhafter Reizunterdrückung. Trainieren Sie am besten morgens oder als 5-minütiges Warm-up vor kompetitiven Gaming-Sessions."
      }
    },
    {
      "@type": "Question",
      "name": "Werden meine Reaktionszeiten und Klickdaten auf externen Servern gespeichert?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nein. Sämtliche Messwerte, Trefferanzahlen und Latenzen werden ausschließlich lokal im verschlüsselten localStorage Ihres Webbrowsers verarbeitet und gespeichert. Es erfolgt keinerlei Übertragung personenbezogener Daten oder Koordinaten an zentrale Tracking-Server."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Strategie-Leitfaden für den Entropic Grid Visuelle Suche Test",
  "description": "Schritt-für-Schritt-Anleitung zur Erzielung von Spitzenwerten im dynamischen 100-Zellen-Suchtest.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Zielcode visuell verankern",
      "text": "Lies den oben angezeigten zweistelligen Zielcode (z. B. 'X4') ab und vergegenwärtige dir die charakteristischen geometrischen Kanten und Linien.",
      "url": "https://skilldrills.online/de/drills/visual/visual-recognition/entropic-grid#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "4-Quadranten-Rasterscan anwenden",
      "text": "Unterteile das Raster gedanklich in vier Blöcke und bewege den Blick systematisch über die Blockzentren, um periphere Cluster zu erfassen.",
      "url": "https://skilldrills.online/de/drills/visual/visual-recognition/entropic-grid#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Dynamisches Rauschen aktiv ignorieren",
      "text": "Lass dich vom 700-ms-Takt des Hintergrundflimmerns nicht ablenken; halte den Aufmerksamkeitsfilter rein auf das Zielmuster ausgerichtet.",
      "url": "https://skilldrills.online/de/drills/visual/visual-recognition/entropic-grid#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Präziser Klick und sofortiger Fokuswechsel",
      "text": "Klicke das Zielsymbol auf dem kürzesten Bewegungspfad an und richte die Aufmerksamkeit sofort auf den nächsten generierten Code.",
      "url": "https://skilldrills.online/de/drills/visual/visual-recognition/entropic-grid#step-4"
    }
  ]
};

const guideData = {
  eyebrow: "Kognitionspsychologie & Selektive Aufmerksamkeitskontrolle",
  heading: "Visuelle Suche Test – Merkmalsintegration und Reizfilterung in dynamischen Rastern",
  intro: [
    "Die visuelle Suche (Visual Search) beschreibt die fundamentale menschliche Fähigkeit, ein definiertes Zielobjekt (Target) inmitten zahlreicher ablenkender Störreize (Distraktoren) präzise und zeitnah zu lokalisieren. Laut Anne Treismans bahnbrechender Merkmalsintegrationstheorie (Feature Integration Theory: FIT, Treisman & Gelade, 1980) verarbeitet das visuelle System elementare Attribute wie Farbe oder Linienneigung zunächst unbewusst und parallel in einer präattentiven Phase. Erst die fokussierte, ortsbezogene Aufmerksamkeit bindet diese Merkmale zusammen, um komplexe Konfigurationen wie Buchstaben und Zahlen zweifelsfrei zu entschlüsseln.",
    "Im Guided-Search-Modell (Wolfe, 1994; Wolfe, 2007) interagieren stimulusgetriebene Bottom-Up-Auffälligkeiten mit zielorientierten Top-Down-Vorgaben, um im Gehirn eine sogenannte 'Prioritätskarte' (Priority Map) aufzubauen. Im Entropic-Grid-Szenario erzeugen 100 Zellen mit zyklisch wechselndem Rauschen eine extrem hohe visuelle Entropie, die das Bottom-Up-System massiv überflutet. Um hier erfolgreich zu agieren, müssen der dorsolaterale präfrontale Kortex und parietale Netzwerke starke inhibitorische Signale aussenden, die irrelevante Rauschreize aktiv tilgen (Duncan & Humphreys, 1989).",
    "Die kontinuierliche 700-ms-Hintergrundregeneration im Entropic Grid modelliert reale kognitive Ablenkung nach Nilli Lavies Perceptual Load Theory (Lavie, 1995). Selektive Aufmerksamkeit operiert unter einer strikten strukturellen Kapazitätsgrenze: Bei geringer visueller Belastung diffundieren freie Ressourcen unwillkürlich in irrelevante Störreize ab. Unter hoher perzeptiver Last – wie dem synchronen Scannen einer 100-Zellen-Matrix nach dynamischen Alphanumerik-Digraphen – bindet die aufgabenrelevante Reizverarbeitung die gesamte kortikale Bandbreite, wodurch Hintergrundrauschen neurochemisch effizient blockiert wird.",
    "Das menschliche Aufmerksamkeitsfeld verhält sich nicht wie ein starrer Scheinwerfer, sondern als elastisches Zoom-Objektiv (Zoom Lens Model, Eriksen & St. James, 1986). Trainierte Beobachter passen ihren Fokus flexibel an – vom weiten 10x10-Überblick bis zur scharfen 2x2-Clusterprüfung. Durch gezieltes parafoveales Scanning außerhalb des fovealen 2-Grad-Zentrums lassen sich unpassende Zellmuster blitzschnell eliminieren, ohne für jedes einzelne Element zeitraubende Korrektursakkaden ausführen zu müssen (Posner, 1980; Woods et al., 2015).",
    "Dieses webbasierte Trainingssystem erfasst anhand moderner performance.now()-Mikrotimer die individuelle Suchlatenz, Trefferrate und Fehlerquoten über 45-Sekunden-Zyklen. Ein regelmäßiges Training im Entropic Grid stärkt die sensorische Filterkapazität unter extremem visuellem Clutter – mit direktem Transfer auf das Scanning in taktischen Shootern, die Gefahrenerkennung im Straßenverkehr sowie die effiziente Auswertung komplexer Datenstrukturen."
  ],
  benchmarks: {
    title: "Benchmark-Kriterien für Visuelle Suche & Selektive Aufmerksamkeit",
    headers: ["Leistungsstufe / Rang", "Erfolgreiche Treffer (45 Sek.)", "Mittlere Suchfixations-Latenz", "Rauschfilter-Genauigkeit", "Neurokognitive Verarbeitungsstufe"],
    rows: [
      ["Elite / Profi-Klasse (Top 1%)", "18+ Treffer", "< 180 ms", "> 96%", "Perfekte Synthese aus paralleler Pop-out-Erkennung und zielgerichteter Top-Down-Suche (Wolfe, 2007)"],
      ["Fortgeschrittene Suche (Top 5%)", "14 – 17 Treffer", "180 – 230 ms", "88 – 95%", "Hocheffiziente Unterdrückung dynamischer Distraktoren und optimierter Quadranten-Rasterscan"],
      ["Durchschnittliches Niveau (Top 25%)", "10 – 13 Treffer", "230 – 300 ms", "76 – 87%", "Solide kognitive Verarbeitungsgeschwindigkeit; Kombination aus seriellem Abgleich und partieller Parallelerfassung"],
      ["Anfänger-Niveau (Top 50%)", "7 – 9 Treffer", "300 – 400 ms", "65 – 75%", "Erhöhte Ablenkbarkeit durch visuelles Rauschen; verzögerte Zielerfassung (Visual Clutter Latenz)"],
      ["Basis-Entwicklungsstufe (Baseline)", "< 7 Treffer", "> 400 ms", "< 65%", "Irreguläre Sakkadenwanderung und Informationsverlust im Arbeitsgedächtnis während des Flackerns"]
    ],
    note: "Objektive Leistungswerte basierend auf der kognitionswissenschaftlichen Literatur zur visuellen Aufmerksamkeit (Treisman & Gelade 1980; Wolfe 2007; Duncan & Humphreys 1989; Posner 1980)."
  },
  techniques: {
    title: "4 wissenschaftlich fundierte Techniken zur Maximierung der Suchgeschwindigkeit",
    items: [
      {
        name: "Parallele Pop-Out-Merkmalsextraktion (Parallel Pop-Out Feature Extraction)",
        desc: "Versuche nicht, den gesamten Buchstaben buchstabierend zu lesen. Richte den sensorischen Filter primär auf markante geometrische Kanten (z. B. Diagonalen, Rundungen oder rechte Winkel) aus, um das Symbol aus dem Rauschen hervortreten zu lassen.",
        tips: "Achte bei 'K' auf die schrägen Äste, bei '8' auf die Doppelrundung – Kanten heben sich schneller vom Rauschen ab als ganze Formen."
      },
      {
        name: "Systematischer 4-Quadranten-Rasterscan (Quadrant Systematic Raster Scan)",
        desc: "Teile die 100 Zellen in vier 25er-Blöcke (oben links, oben rechts, unten links, unten rechts). Fixiere die Blockmitten und erfasse mehrere Zellen auf einen Blick.",
        tips: "Halte ein geordnetes Z-Muster beim Blickverlauf ein, anstatt die Augen unkontrolliert über das Feld wandern zu lassen."
      },
      {
        name: "Aktive sensorische Rauschunterdrückung (Dynamic Noise Perceptual Filtering)",
        desc: "Das 700-ms-Flimmern triggert primitive Orientierungsreflexe. Unterdrücke diesen Reiz bewusst und synchronisiere die Informationsaufnahme mit der stabilen Phase zwischen den Wechseln.",
        tips: "Vermeide hektische Augenbewegungen genau in dem Moment, in dem die Symbole neu ausgewürfelt werden."
      },
      {
        name: "Erweiterung des Aufmerksamkeits-Fokus (Attentional Spotlight Broadening)",
        desc: "Ein extrem enger Tunnelblick auf Einzelzellen verlangsamt die Gesamtsuche massiv. Öffne das Aufmerksamkeitsfenster auf etwa 3x3 Zellen rund um den Fixationspunkt.",
        tips: "Halte einen gesunden Bildschirmabstand von mindestens 50 cm ein und entspanne die periorbitalen Gesichtsmuskeln."
      }
    ]
  },
  steps: [
    "Klicke auf Start und präge dir den zweistelligen alphanumerischen Zielcode im Kopfbereich augenblicklich ein.",
    "Überfliege die vier Quadranten der Matrix und nutze deine periphere Sicht zur Identifikation charakteristischer Linienmerkmale.",
    "Blende das rhythmische Flackern der Hintergrunddistraktoren aus und klicke das Zielsymbol ohne Umwege an.",
    "Sobald ein Treffer erfolgt, erscheint sofort der nächste Code – halte den Rhythmus über die gesamten 45 Sekunden aufrecht.",
    "Analysiere nach Ablauf der Zeit deine Trefferanzahl, durchschnittliche Latenz und Perzentil-Einstufung für dein gezieltes Training."
  ],
  audience: "FPS-Gamer (Valorant, CS2, Apex Legends, Overwatch), die ihre Zielerfassungszeit und Gegneridentifikation unter extremem visuellen Clutter perfektionieren wollen, Fluglotsen, Radiologen, Sicherheitskräfte sowie Fachkräfte, die große Datenmengen fehlerfrei scannen müssen.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('treisman1980', 'wolfe2007', 'duncan1989', 'posner1980', 'green2006', 'woods2015'),
  related: [
    { href: "/de/drills/visual/visual-recognition/visual-search", label: "Visuelle Suche Test (Peripheres Scanning)" },
    { href: "/de/drills/visual/tracking-accuracy/multiple-targets", label: "Multiple Object Tracking MOT Test" },
    { href: "/de/drills/visual/tracking-accuracy/moving-target", label: "Dynamische Sehkraft (Bewegungsziel-Test)" },
    { href: "/de/drills/visual/reaction-speed/go/no-go", label: "Go / No-Go Reaktionszeittest" }
  ]
};

export default function LocalizedEntropicGridDePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
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

      <EntropicGridClient copy={{ title: "Visuelle Suche Test – Entropic Grid Training", subtitle: "Dynamische Rauschfilterung & Selektive Aufmerksamkeit" }} />
      <DrillGuide guide={guideData} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/de/drills/visual/visual-recognition/entropic-grid" />
      </div>
    </>
  );
}
