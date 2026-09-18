import KineticInterceptClient from '@/app/drills/visual/tracking-accuracy/moving-target/KineticInterceptClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Augentraining: Dynamische Sehschärfe Test | SkillDrills",
  description: "Kostenloses Augentraining online: Fange beschleunigte, abprallende Ziele mit prädiktiver Blickverfolgung ab. Messe dynamische Sehschärfe kostenlos.",
  keywords: [
    "Augentraining Online",
    "Visuelle Reaktionszeit Test",
    "Dynamische Sehschärfe Test",
    "Maus Tracking Test",
    "Auge Hand Koordination",
    "bewegliches ziel abfangen",
    "smooth pursuit augenbewegung",
    "kinetisches zieltracking",
    "vorhaltemaß ballistik test",
    "reaktionsspiel zielverfolgung",
    "blickfolge test",
    "e-sport aim tracking"
  ],
  openGraph: {
    title: "Augentraining: Dynamische Sehschärfe Test | SkillDrills",
    description: "Trainiere dynamische Sehschärfe, prädiktive Trajektorienberechnung und Smooth-Pursuit-Augenbewegungen online.",
    type: 'article',
    url: 'https://skilldrills.online/de/drills/visual/tracking-accuracy/moving-target',
    siteName: 'SkillDrills',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Augentraining: Dynamische Sehschärfe Test | SkillDrills",
    description: "Kostenloses kinetisches Zieltracking-Training zur Steigerung von Blickfolge und Abfanggenauigkeit.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/visual/tracking-accuracy/moving-target',
    languages: getAlternateLanguages('/drills/visual/tracking-accuracy/moving-target'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://skilldrills.online/de" },
    { "@type": "ListItem", "position": 2, "name": "Trainingskatalog", "item": "https://skilldrills.online/de/drills" },
    { "@type": "ListItem", "position": 3, "name": "Visuelles Training", "item": "https://skilldrills.online/de/drills/visual" },
    { "@type": "ListItem", "position": 4, "name": "Blickverfolgung", "item": "https://skilldrills.online/de/drills/visual/tracking-accuracy" },
    { "@type": "ListItem", "position": 5, "name": "Bewegtes Ziel Abfangen", "item": "https://skilldrills.online/de/drills/visual/tracking-accuracy/moving-target" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Kinetischer Zielinterzeptions-Test",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/de/drills/visual/tracking-accuracy/moving-target",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "description": "Interaktiver psychophysischer Test zur Messung von Smooth-Pursuit-Augenfolgebewegungen, Trajektorienprädiktion und motorischer Interzeptionspräzision.",
  "featureList": [
    "Kinetische 2D-Flugbahnphysik mit realistischen Randabprallvektoren",
    "Echtzeit-Trefferchronometrie und dynamische Combo-Skalierung",
    "Kontinuierlich ansteigende Fluggeschwindigkeit bei schrumpfender Zielgröße",
    "Lokale Speicherung der Leistungskennzahlen ohne externe Telemetrie"
  ],
  "dateModified": "2026-09-05"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Kinetischer Zielinterzeptions-Test — Blicktracking Online | SkillDrills",
  "alternateName": "Moving Target Pro",
  "url": "https://skilldrills.online/de/drills/visual/tracking-accuracy/moving-target",
  "dateModified": "2026-09-05",
  "description": "Kostenloses Online-Augentraining: Fange beschleunigte, abprallende Zielkugeln mit prädiktivem Vorhaltemaß auf dem Canvas ab.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas-fähiger moderner Webbrowser.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Smooth Pursuit Blickverfolgung, dynamische Sehschärfe, Bewegungsextrapolation, ballistische Zielinterzeption"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Bewegtes Ziel Abfang-Drill",
  "url": "https://skilldrills.online/de/drills/visual/tracking-accuracy/moving-target",
  "description": "Online-Zielverfolgungsspiel zur Schulung dynamischer Sehschärfe und Auge-Hand-Koordination.",
  "genre": ["Action", "Aim Trainer", "Visual Tracking"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "So trainierst du mit dem Bewegten Ziel Abfang-Test",
  "dateModified": "2026-09-05",
  "description": "4-Schritte-Anleitung zur Optimierung von Blickfolge, Flugbahn-Antizipation und Treffsicherheit.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Kinetisches Ziel foveal erfassen",
      "text": "Lokalisiere die wandernde Zielkugel sofort beim Erscheinen und verankere den fovealen Blickpunkt im Zentrum des Objekts.",
      "url": "https://skilldrills.online/de/drills/visual/tracking-accuracy/moving-target#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Flugbahnvektor und Wandabpraller antizipieren",
      "text": "Berechne Geschwindigkeit und Reflexionswinkel voraus und führe das Fadenkreuz leicht vor das aktuelle Ziel.",
      "url": "https://skilldrills.online/de/drills/visual/tracking-accuracy/moving-target#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Präzisen ballistischen Klick auslösen",
      "text": "Klicke das Ziel sauber ab, bevor das Zeitintervall abläuft (+150 Pkt. × Combo × Level und +0,6 s Zeitbonus).",
      "url": "https://skilldrills.online/de/drills/visual/tracking-accuracy/moving-target#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Combo-Serie bei steigendem Tempo halten",
      "text": "Wahre die Präzision bei zunehmender Zielgeschwindigkeit und kleinerem Radius, um Fehlklicks zu vermeiden.",
      "url": "https://skilldrills.online/de/drills/visual/tracking-accuracy/moving-target#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-05",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was misst der Bewegte Ziel Interzeptions-Test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der Test erfasst die dynamische Sehschärfe, die Qualität von Smooth-Pursuit-Augenbewegungen sowie die prädiktive Auge-Hand-Koordination. Gemessen wird die Fähigkeit, beschleunigte Zielobjekte auf wechselnden 2D-Flugbahnen vorausschauend abzufangen."
      }
    },
    {
      "@type": "Question",
      "name": "Wie verarbeitet das Gehirn sich bewegende visuelle Objekte?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bewegungsreize gelangen von der Netzhaut in das Areal MT/V5, wo Richtungs- und Geschwindigkeitsvektoren berechnet werden. Das frontale Augenfeld (FEF) und das Kleinhirn synchronisieren die Augenmuskeln, während der parietale Kortex den motorischen Abfangklick plant."
      }
    },
    {
      "@type": "Question",
      "name": "Was unterscheidet Smooth Pursuit von sakkadischen Augenbewegungen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nach Rashbass (1961) unterliegen beide getrennten Kontrollschleifen: Smooth Pursuit ist eine kontinuierliche Verfolgungsbewegung (bis 30–40°/s) zur Vermeidung retinaler Bildunschärfe. Sakkaden sind ruckartige Sprünge (bis 900°/s) zur schnellen Neupositionierung der Fovea."
      }
    },
    {
      "@type": "Question",
      "name": "Warum ist ein Vorhaltemaß (Vorhalten) bei bewegten Zielen zwingend nötig?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die sensorimotorische Latenz des Menschen beträgt 150 bis 220 ms. Bei einem mit 500 px/s wandernden Ziel legt das Objekt in dieser Reaktionszeit über 100 Pixel zurück. Wer direkt auf die aktuelle Position zielt, klickt ins Leere (Land & McLeod, 2000)."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Geschwindigkeitsgrenzen hat die menschliche Blickfolge?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Smooth Pursuit arbeitet bis etwa 30°/s Zielgeschwindigkeit optimal (Bahill et al., 1980; Krauzlis, 2004). Überschreitet das Ziel dieses Tempo, sinkt die Verstärkung unter 1,0, und das Gehirn muss aufholende Korrektursakkaden einstreuen."
      }
    },
    {
      "@type": "Question",
      "name": "Lässt sich dynamische Sehschärfe durch Training verbessern?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Gezieltes Verfolgungstraining optimiert die kortikale Signalverarbeitung im Areal MT/V5, verfeinert die zerebelläre Kalibrierung und verkürzt die Korrekturlatenz bei plötzlichen Richtungswechseln."
      }
    },
    {
      "@type": "Question",
      "name": "Welchen Einfluss hat die Bildwiederholrate (60 Hz vs 144 Hz vs 240 Hz)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Auf 60 Hz aktualisiert sich die Position alle 16,7 ms, was zu Mikroruckeln und höheren Schätzfehlern führt. 144 Hz (6,9 ms) und 240 Hz (4,1 ms) Displays liefern flüssige Bewegungsmuster für exaktere Prädiktion (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Wie beeinflussen Zielbeschleunigung und Wandabpraller die Trefferquote?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gleichförmige Bewegungen lassen sich mit hoher Genauigkeit antizipieren. Plötzliche Richtungsänderungen (Wandkollisionen) entwerten das bestehende Bewegungsmodell und fordern 150–200 ms Anpassungszeit für Neuausrichtung."
      }
    },
    {
      "@type": "Question",
      "name": "Was unterscheidet Open-Loop von Closed-Loop motorischer Kontrolle?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In den ersten ~100 ms erfolgt die Bewegung als Open-Loop (ballistisch auf Basis früher Schätzwerte ohne Korrekturmöglichkeit). Danach greift der Closed-Loop-Modus, bei dem visuelles Feedback den Mauscursor kontinuierlich auf das Ziel nachkorrigiert."
      }
    },
    {
      "@type": "Question",
      "name": "Ist das Augentraining kostenlos und bleiben meine Daten geschützt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Der Moving Target Intercept Test auf SkillDrills ist komplett kostenlos, werbefrei und ohne Benutzerkonto nutzbar. Alle Punktzahlen und Leistungsdaten verbleiben ausschließlich lokal im Browser-Speicher."
      }
    }
  ]
};

const movingTargetGuide = {
  heading: "Wissenschaftliche Grundlagen der kinetischen Zielverfolgung & Trajektorien-Interzeption",
  intro: [
    "Das präzise Abfangen dynamischer Ziele ist eine elementare senso-motorische Kernkompetenz in Ballsportarten, im Motorsport, in der Luftfahrt und im wettbewerbsorientierten E-Sport. Das erfolgreiche Treffen eines beschleunigten Objekts verlangt die lückenlose Synchronisation von stetigen Blickfolgebewegungen, prädiktiver Bahnextrapolation und feinstabgestimmtem Bewegungstiming.",
    "Die neuronale Verarbeitung visueller Bewegung beginnt in richtungsselektiven Neuronen des mittleren temporalen Areals (MT/V5) und des medialen superioren temporalen Areals (MST). Diese Zentren berechnen Geschwindigkeits- und Richtungsvektoren und leiten Steuersignale an das frontale Augenfeld (FEF) und die Purkinje-Zellen des Kleinhirns weiter, um den Blickgewinn aufrechtzuerhalten (Krauzlis, 2004).",
    "In seiner grundlegenden Arbeit wies Rashbass (1961) nach, dass Smooth Pursuit und Sakkaden unabhängigen Kontrollsystemen unterliegen: Verfolgung wird durch die retinale Bildschlupfgeschwindigkeit gesteuert, während Sakkaden Positionsfehler kompensieren. Beschleunigt das Ziel über 30 bis 40°/s oder prallt ab, greifen aufholende Korrektursakkaden ein (Bahill et al., 1980).",
    "Untersuchungen von Land & McLeod (2000) im Hochleistungssport belegen, dass Spitzenathleten ein bewegtes Objekt nicht passiv verfolgen, sondern antizipatorische Blicksprünge zu künftigen Abprall- und Treffpunkten ausführen. Genau diese Fähigkeit schult dieser Drill unter Realzeit-Bedingungen."
  ],
  benchmarks: {
    title: "Leistungsstufen der kinetischen Zielinterzeption (Wissenschaftliche Richtwerte)",
    headers: ["Leistungsband", "Pacing-Zeitfenster", "Punkte & Combo-Schwelle", "Visuelles Tracking- & Interzeptionsprofil"],
    rows: [
      ["Tier 1: Apex Kinetischer Interzeptor", "< 0.25s Zeitfenster", "16.000+ Pkt. | Combo 25x+", "Profi-Blickfolge; makellose Geschwindigkeits-Extrapolation ohne Sakkaden-Latenz. Typisch für Spitzen-Gamer und Kampfjetpiloten."],
      ["Tier 2: Fortgeschrittener Tracker", "0.25 – 0.45s Zeitfenster", "10.500 – 15.999 Pkt. | Combo 16x+", "Flüssige Augenfolge; rasche Closed-Loop-Korrekturen mit minimalem Überschwingen bei beschleunigten Objekten."],
      ["Tier 3: Solide Verfolgungsleistung", "0.46 – 0.70s Zeitfenster", "6.000 – 10.499 Pkt. | Combo 9x+", "Verlässlicher Standard; konstantes Timing auf linearen Bahnen mit leichten Verzögerungen bei abrupten Wandabprallern."],
      ["Tier 4: Entwicklungsstufe", "0.71 – 1.00s Zeitfenster", "2.500 – 5.999 Pkt. | Combo 4x+", "Starke Abhängigkeit von reaktiven Aufholsakkaden statt prädiktiver Verfolgung; spürbare Zögerlichkeit bei hohem Tempo."],
      ["Tier 5: Hohe Tracking-Streuung (Basis)", "> 1.00s Zeitfenster", "< 2.500 Pkt. | Combo < 4x", "Ausgeprägtes motorisches Überschwingen; Schwierigkeiten bei dauerhafter Foveation; erfordert grundlegende Blickstabilisierung."]
    ],
    note: "Diese Richtwerte basieren auf Verfolgungspsychophysik und Interzeptionschronometrie (Rashbass, 1961; Krauzlis, 2004; Land & McLeod, 2000; Bahill et al., 1980; Woods et al., 2015). Ergebnisse skalieren mit Monitor-Bildwiederholrate und Maus-Abtastrate."
  },
  techniques: {
    title: "Methoden zur Perfektionierung der Zielinterzeption",
    items: [
      {
        name: "Prädiktives Vorhaltemaß (Rashbass-Geschwindigkeitsanpassung)",
        desc: "Aufgrund der menschlichen Reaktionszeit von 150–220 ms führt das direkte Klicken auf die aktuelle Position zu Fehlschüssen (Rashbass, 1961).",
        tips: "Extrapoliere den Richtungsvektor und platziere den Klick 5–15 Pixel voraus auf der antizipierten Flugbahn."
      },
      {
        name: "Antizipation von Randabprallern (Land & McLeod Sakkadische Anker)",
        desc: "Elite-Athleten springen mit dem Blick voraus zum vorausberechneten Abprallpunkt, anstatt dem Objekt in die Wand zu folgen (Land & McLeod, 2000).",
        tips: "Nähert sich das Ziel einer Wand, versetze das Fadenkreuz vorab auf den Ausfallswinkel des Abprallers."
      },
      {
        name: "Kontinuierliche Fovealisierung (Krauzlis Pursuit-Loop)",
        desc: "Effektive Blickfolge verlangt das Halten des Ziels im fovealen Zentrum, um retinale Unschärfe zu eliminieren (Krauzlis, 2004).",
        tips: "Gleite mit den Augen weich mit dem Ziel mit, anstatt den Blick starr auf Koordinaten ruhen zu lassen."
      },
      {
        name: "Rhythmische Entkopplung & Klickdisziplin",
        desc: "Unvorhersehbare Flugbahnen erzwingen Korrektursakkaden (Bahill et al., 1980); blindes Spam-Klicken bricht Serien ab.",
        tips: "Klicke nicht in monotonem Takt. Verifiziere die Deckung von Fadenkreuz und Zielkugel vor der Betätigung."
      }
    ]
  },
  steps: [
    "Klicke auf Drill Starten, um die 45-Sekunden-Zielinterzeptionsrunde zu beginnen.",
    "Erfasse die wandernde Zielkugel mit den Augen und baue eine kontinuierliche Blickfolge auf.",
    "Berechne die Flugbahn voraus und führe den Cursor leicht vor das Ziel.",
    "Klicke die Kugel sauber ab, bevor das Intervall abläuft (+150 Pkt. × Multiplikator und +0,6 s Zeitbonus).",
    "Analysiere nach Rundenende deine Trefferanzahl, Treffsicherheit und erreichte Bewertungsstufe."
  ],
  audience: "E-Sportler (FPS, MOBAs), Kampfsportler, Tennis- und Racketsportler, Motorsportler, Drohnenpiloten und alle Personen, die ihr dynamisches Blicktracking schärfen wollen.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('rashbass1961', 'krauzlis2004', 'land2000', 'bahill1980', 'woods2015'),
  related: [
    { href: "/de/drills/visual/tracking-accuracy/multiple-targets", label: "Multi-Objekt-Tracking" },
    { href: "/de/drills/visual/tracking-accuracy/pursuit-tracker", label: "Kontinuierlicher Blickfolge-Tracker" },
    { href: "/de/drills/visual/reaction-speed/light-reaction", label: "Licht-Reaktionstest" },
    { href: "/de/drills/visual/reaction-speed/go/no-go", label: "Go / No-Go Impulskontrolle" },
    { href: "/de/drills/visual/depth-perception/distance-judgment", label: "Tiefenwahrnehmung & Distanzurteil" },
    { href: "/de/drills/visual/visual-recognition/entropic-grid", label: "Entropisches Gitter-Suchspiel" }
  ]
};

export default function KineticInterceptPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <KineticInterceptClient copy={{ title: "Augentraining: Dynamische Sehschärfe Test" }} />
      <DrillGuide guide={movingTargetGuide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/de/drills/visual/tracking-accuracy/moving-target" />
      </div>
    </>
  );
}
