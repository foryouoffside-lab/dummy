import TriangularPursuitClient from '@/app/drills/visual-tracking/triangular-pursuit/TriangularPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Dreieckige Blickverfolgung – Polygon-Training | SkillDrills",
  description: "Trainieren Sie kontinuierliche Blickfolgebewegungen und Fangsakkaden entlang dreieckiger Vektorbahnen. Präzises Kanten-Tracking online. Kostenlos.",
  keywords: [
    "dreieckige blickverfolgung uebung",
    "polygon tracking training",
    "eckpunkt erfassung sakkaden",
    "fangsakkaden richtungswechsel",
    "diagonale blickfolgebewegung",
    "retinaler schlupf korrektur",
    "dynamische blickstabilisierung",
    "sportvisus augenuebung",
    "okulomotorik ecken tracking",
    "blicksteuerung richtungswechsel",
    "augenmuskeltraining richtungswechsel online",
    "visuelle reaktionszeit augentest"
  ],
  openGraph: {
    title: "Dreieckige Blickverfolgung – Polygon-Training | SkillDrills",
    description: "Trainieren Sie kontinuierliche Blickfolgebewegungen und Fangsakkaden entlang dreieckiger Vektorbahnen. Präzises Kanten-Tracking online. Kostenlos.",
    url: 'https://skilldrills.online/de/drills/visual-tracking/triangular-pursuit',
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Dreieckige Blickverfolgung – Polygon-Training | SkillDrills",
    description: "Trainieren Sie kontinuierliche Blickfolgebewegungen und Fangsakkaden entlang dreieckiger Vektorbahnen. Präzises Kanten-Tracking online. Kostenlos.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/visual-tracking/triangular-pursuit',
    languages: getAlternateLanguages('/drills/visual-tracking/triangular-pursuit'),
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
      "name": "Trainingsübersicht",
      "item": "https://skilldrills.online/de/drills"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Blickverfolgung & Okulomotorik",
      "item": "https://skilldrills.online/de/drills/visual-tracking"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Dreieckige Blickverfolgung",
      "item": "https://skilldrills.online/de/drills/visual-tracking/triangular-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Dreieckige Blickverfolgung – Polygon-Augentraining",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Trainieren Sie kontinuierliche Blickfolgebewegungen und Fangsakkaden entlang dreieckiger Vektorbahnen. Präzises Kanten-Tracking online.",
  "url": "https://skilldrills.online/de/drills/visual-tracking/triangular-pursuit",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online"
  },
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Dreieckige Blickverfolgung – Polygon-Augentraining",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Benötigt HTML5 Canvas und JavaScript-fähigen Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/de/drills/visual-tracking/triangular-pursuit",
  "dateModified": "2026-09-15"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Dreieckige Blickverfolgung – Polygon-Augentraining",
  "url": "https://skilldrills.online/de/drills/visual-tracking/triangular-pursuit",
  "description": "Trainieren Sie kontinuierliche Blickfolgebewegungen und Fangsakkaden entlang dreieckiger Vektorbahnen. Präzises Kanten-Tracking online.",
  "genre": [
    "Action",
    "Augentraining",
    "Aim Trainer"
  ],
  "gamePlatform": [
    "Web Browser",
    "Desktop",
    "Mobile"
  ],
  "applicationCategory": "Game",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Anleitung zum Training der dreieckigen Blickverfolgung",
  "description": "Methodischer 4-Schritte-Leitfaden zur Koordination von stetiger Vektor-Blickfolge und fovealen Fangsakkaden an spitzen Dreieckswinkeln.",
  "dateModified": "2026-09-15",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Geometrische Tracking-Parameter einstellen",
      "text": "Wählen Sie Sessiondauer (30 bis 120 Sekunden), Geschwindigkeitsmultiplikator, Zielgröße und Zielfarbe. Aktivieren Sie bei Bedarf 'Hide Line' für höhere neuronale Anforderung.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/triangular-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Lineare Vektor-Blickfolge etablieren",
      "text": "Halten Sie die Fovea centralis exakt auf dem Ziel entlang der geraden Dreieckskanten. Stimmen Sie horizontale und vertikale Augenmuskelgruppen gleichmäßig ab.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/triangular-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Prädiktives Bremsen und Fangsakkade am Eckpunkt",
      "text": "Verzögern Sie den Blick unmittelbar vor dem 60°-Eckpunkt, um Überschwinger zu verhindern, und fangen Sie das Ziel mit einer präzisen Sakkade auf der neuen Kante ein.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/triangular-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Progression mit Geschwindigkeit und Zufallsprofilen",
      "text": "Erhöhen Sie schrittweise die Geschwindigkeit und schalten Sie 'Random Speed' hinzu, um unvorhersehbare Richtungs- und Geschwindigkeitsübergänge zu meistern.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/triangular-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was ist die dreieckige Blickverfolgung (Triangular Pursuit)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Triangular Pursuit ist eine interaktive okulomotorische Trainingsübung, bei der ein visuelles Ziel entlang einer geschlossenen gleichseitigen Dreiecksbahn verfolgt wird. Sie kombiniert kontinuierliche lineare Blickfolgebewegungen (Smooth Pursuit) auf den Kanten mit präzisen Fangsakkaden (Catch-up Saccades) an 60°-Eckpunkten (de Brouwer et al., 2002)."
      }
    },
    {
      "@type": "Question",
      "name": "Warum ist die Verfolgung entlang eines Dreiecks anspruchsvoller als kreisförmiges Tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kreisförmiges Tracking basiert auf kontinuierlicher Richtungsänderung mit konstanter Krümmung. Ein Dreieck hingegen wechselt abrupt zwischen gleichförmiger linearer Bewegung und diskreten 120°-Richtungsbrüchen an den Scheitelpunkten. Das okulomotorische System muss schlagartig vom Folgemodus in den Sakkadenmodus umschalten (Orban de Xivry & Lefèvre, 2007)."
      }
    },
    {
      "@type": "Question",
      "name": "Wie steuert das zentrale Nervensystem diagonale Augenbewegungen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Diagonale Augenbewegungen erfordern die synchrone, proportionale Aktivierung horizontaler pontiner Zentren (PPRF) und vertikaler Mittelhirnzentren (riMLF). Das Kleinhirn (Flocculus und Vermis Lobuli VI-VII) fusioniert diese beiden orthogonalen Signale in Echtzeit zu einem einheitlichen Geschwindigkeitsvektor."
      }
    },
    {
      "@type": "Question",
      "name": "Warum neigen die Augen dazu, spitze Scheitelpunkte kurvenschneidend abzukürzen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Das Gehirn antizipiert die nächste Kante und löst vorzeitig eine Fangsakkade aus, bevor das Ziel den Eckpunkt erreicht (Bennett & Barnes, 2006). Das bewusste Unterdrücken dieser Abkürzung und das exakte Verfolgen bis zum Scheitelpunkt stärkt die geometrische Bewegungskontrolle."
      }
    },
    {
      "@type": "Question",
      "name": "Was verursacht ein Überschwingen (Overshoot) des Blicks an Eckpunkten und wie verhindert man es?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Trägheit der Augenmuskeln und neuronale Übertragungsverzögerungen (~100–150 ms) führen dazu, dass Bremsbefehle zu spät greifen. Durch gezieltes Training aktiviert das Kleinhirn interne Vorwärtsmodelle, die den Blick etwa 40 ms vor dem Scheitelpunkt gezielt abbremsen (Barnes, 2008)."
      }
    },
    {
      "@type": "Question",
      "name": "Wie profitieren Spieler von Ego-Shootern (CS2, Valorant, Apex Legends) von diesem Training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In taktischen Shootern wechseln Gegner häufig abrupt die Richtung an Kanten oder führen Wall-Jumps und Sliding-Moves aus. Das Dreieckstracking schult das Fadenkreuz-Handling bei scharfen Richtungswechseln und minimiert Zielabweichungen bei der ersten Schussabgabe."
      }
    },
    {
      "@type": "Question",
      "name": "Welchen Nutzen bringt das Dreieckstracking für Athleten in Ballsportarten (Squash, Tennis, Fußball)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In Sportarten wie Squash, Tennis oder Eishockey prallen Bälle und Pucks in spitzen Winkeln von Wänden oder Böden ab. Das Training verkürzt die visuelle Wiedererfassungszeit (Re-Fixation) nach abrupten Richtungsänderungen erheblich (Heinen et al., 2005)."
      }
    },
    {
      "@type": "Question",
      "name": "Welche tägliche Trainingsdauer und Satzstruktur wird wissenschaftlich empfohlen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Empfohlen werden 2 bis 3 Durchgänge von jeweils 45 bis 60 Sekunden Dauer (ca. 3 bis 5 Minuten pro Tag). Da die abrupte Scheitelpunkt-Bremsung hohe neuromuskuläre Anforderungen stellt, maximieren kurze, hochfokussierte Einheiten den Trainingseffekt ohne visuelle Ermüdung."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Rolle spielt die Bildschirmwiederholrate (144Hz / 240Hz) beim Scheitelpunkt-Timing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein 144Hz- (6,9 ms) oder 240Hz-Monitor (4,2 ms) visualisiert den Moment des Richtungswechsels wesentlich präziser als 60Hz-Displays (16,7 ms). Dies eliminiert zeitliche Quantisierungsfehler und ermöglicht exaktes prädiktives Bremsen (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Welche neuroplastischen Veränderungen entstehen im Kleinhirn durch regelmäßiges Polygon-Tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Über synaptische Langzeitdepression (LTD) der Purkinje-Zellen im Kleinhirn optimiert das Gehirn seine internen Bewegungsvorhersagemodelle. Dies führt zu höherem Folgebewegungsgewinn (Gain) und einer Reduktion korrigierender Mikrosakkaden um über 60 % (Leigh & Zee, 2015)."
      }
    }
  ]
};

const guide = {
  heading: "Dreieckige Blickverfolgung – Polygon-Augentraining: Winkelwechsel und sakkadische Bremsung",
  intro: [
    "Das Nachverfolgen visueller Reize entlang geschlossener geometrischer Polygone stellt höchste Anforderungen an das Zusammenspiel horizontaler und vertikaler Augenmuskelgruppen. Bewegt sich ein Stimulus entlang der Kanten eines gleichseitigen Dreiecks, operiert das okulomotorische System in einer non-kardinalen, diagonalen Vektorebene. Dies verlangt eine synchrone, hochpräzise Kopplung pontiner horizontaler Blickzentren (PPRF) und Mittelhirn-Schaltkreise (riMLF), koordiniert durch das Kleinhirn (Orban de Xivry & Lefèvre, 2007).",
    "Die wesentliche neurophysiologische Barriere tritt an den drei spitzen Scheitelpunkten (60°-Winkel) des Dreiecks auf. An jedem Eckpunkt bricht die translationale Geschwindigkeit schlagartig um, während der retinale Positionsfehler sprunghaft ansteigt. Wie wegweisende Studien von de Brouwer et al. (2002) und Heinen et al. (2005) belegen, triggern die frontalen Augenfelder (FEF) und die supplementären Augenfelder (SEF) an solchen Diskontinuitäten prädiktive Fangsakkaden (Catch-up Saccades), basierend auf der simultanen Verrechnung von Positionsfehler und retinaler Schlupfgeschwindigkeit.",
    "Bei untrainierten Personen führt die Trägheit des okulomotorischen Systems regelmäßig dazu, dass der Blick über den Eckpunkt hinausschießt (Overshoot) oder in vorauseilender Antizipation die Kurve schneidet. Beide Fehlmuster zerstören die foveale Fixation und erzwingen mehrere korrigierende Suchsakkaden. Kontinuierliches Polygon-Tracking aktiviert hingegen cerebelläre Vorwärtsmodelle (Bennett & Barnes, 2006; Barnes, 2008), die eine prädiktive Verlangsamung der Folgebewegung kurz vor dem Eckpunkt einleiten und die Fangsakkade präzise auf den neuen Richtungsvektor ausrichten.",
    "Die Trainingsübung 'Dreieckige Blickverfolgung (Triangular Pursuit)' schult diese geometrische Wendigkeit direkt im Webbrowser. Durch die Verfolgung des Ziels entlang der Dreiecksbahn werden stetige Diagonal-Folgebewegungen und abrupte Scheitelpunkt-Bremsungen systematisch gekoppelt. Mit 'Hide Line' lässt sich die visuelle Orientierungshilfe ausblenden, um reine sensomotorische Bewegungskontrolle zu testen, während 'Random Speed' mechanische Rhythmusgewohnheiten aufbricht. In Verbindung mit moderner Gaming-Hardware (Woods et al., 2015) erreichen Sie maximale Blickstabilität und foveale Zielerfassung."
  ],
  benchmarks: {
    title: "Leistungsstandards der dreieckigen Blickverfolgung (Geschwindigkeit & Scheitelpunkt-Präzision)",
    headers: ["Leistungsstufe", "Empfohlene Geschwindigkeit", "Landefehler am Eckpunkt", "Sakkadische Latenz am Scheitelpunkt", "Populationsanteil"],
    rows: [
      ["Elite / Perfekte neuronale Adaptation (Elite)", "3.5x〜5.0x+", "Fehler < 12px (exakte Haftung am Scheitelpunkt)", "Latenz < 110ms (perfekte Vorwärtsbremsung)", "Top 1.5%"],
      ["Meister / Höchste Vektorkontrolle (Master)", "2.5x〜3.5x", "Fehler < 22px (nur minimale Mikrosakkaden)", "Latenz < 140ms (präzises Eckpunkt-Handling)", "Top 8%"],
      ["Fortgeschritten / Wettkampfniveau (Advanced)", "1.8x〜2.5x", "Fehler < 38px (schnelle Wiedererfassung)", "Latenz < 180ms (solide Richtungswechsel)", "Top 25%"],
      ["Mittelstufe / Grundlegend geübt (Intermediate)", "1.2x〜1.8x", "Fehler 38〜70px (Kurvenschneiden / Überschwinger)", "Latenz 180〜240ms (mehrere Korrektursakkaden)", "Mittlere 45%"],
      ["Einsteiger / Untrainiert (Novice)", "0.5x〜1.2x", "Fehler > 70px (völliger Zielverlust am Eckpunkt)", "Latenz > 250ms (ausgeprägter Overshoot)", "Basisniveau"]
    ],
    note: "Die Richtwerte basieren auf de Brouwer et al. (2002) zur Dynamik von Fangsakkaden sowie Heinen et al. (2005) zur neuronalen Steuerung an abrupten Richtungsumkehrpunkten."
  },
  techniques: [
    {
      title: "Präzise Vektorkoordination horizontaler und vertikaler Augenmuskeln auf Diagonalen",
      description: "Entlang der schrägen Dreieckskanten müssen Musculus rectus medialis/lateralis und die vertikalen Recti/Obliqui mit absolut identischem Spannungsverhältnis aktiviert werden, um ein wellenartiges Auswandern des Blicks zu verhindern.",
      tips: [
        "Fokussieren Sie stets die vordere Spitze des Zielpunkts und führen Sie den Blick wie an einem Lineal gezogen",
        "Halten Sie den Kopf ruhig und vermeiden Sie Neigebewegungen, um reine okulomotorische Isolation zu trainieren",
        "Vermeiden Sie Lidschläge während der linearen Kantenpassage zur Sicherung kontinuierlichen retinalen Feedbacks"
      ]
    },
    {
      title: "Prädiktives Abbremsen vor spitzen Scheitelpunkten zur Vermeidung von Überschwingern",
      description: "Wenige Millisekunden vor Erreichen des 60°-Eckpunkts muss das Kleinhirn die Geschwindigkeit der Blickfolgebewegung aktiv drosseln, um ein trägheitsbedingtes Überschießen über den Scheitelpunkt zu verhindern.",
      tips: [
        "Richten Sie 30 bis 50 ms vor dem Eckpunkt Ihre volle visuelle Aufmerksamkeit auf den nahenden Scheitelpunkt",
        "Stellen Sie sich vor, den Blick am Eckpunkt für einen winzigen Sekundenbruchteil regelrecht 'einzurasten'",
        "Atmen Sie beim Passieren der Scheitelpunkte ruhig und flach aus, um Nacken- und Augenmuskeltonus zu senken"
      ]
    },
    {
      title: "Minimierung von Fangsakkaden (Catch-Up Saccades) bei abruptem 60°-Winkelwechsel",
      description: "Nach dem Richtungswechsel sollte der Blick nicht in mehreren zittrigen Sakkaden nach dem Ziel suchen, sondern mit einem einzigen, exakt bemessenen Sprung zentriert auf der neuen Kante landen.",
      tips: [
        "Lassen Sie den Blick nach dem Knickpunkt präzise auf den neuen Bewegungsvektor schnappen",
        "Warten Sie das tatsächliche Erreichen des Scheitelpunkts ab, anstatt die Kurve spekulativ innen abzukürzen",
        "Schalten Sie innerhalb von 100 ms nach der Sakkade sofort wieder in den kontinuierlichen Folgemodus"
      ]
    },
    {
      title: "Deaktivierung der Hilfslinie (Hide Line) zur Aktivierung interner geometrischer Vorwärtsmodelle",
      description: "Das Ausblenden der Pfadlinie zwingt das visuelle System, die geometrischen Koordinaten des gleichseitigen Dreiecks rein intern im Arbeitsgedächtnis und Kleinhirn abzubilden.",
      tips: [
        "Nutzen Sie Bildschirmränder und Bildmitte als räumliche Referenzpunkte für die drei virtuellen Eckpunkte",
        "Verinnerlichen Sie das Bewegungstempo als akustisch-rhythmisches Muster (Eins-Zwei-Drei)",
        "Wiederholen Sie die Übung ohne Hilfslinie, bis die Eckpunkt-Abweichung stabil unter 20 Pixeln bleibt"
      ]
    }
  ],
  deviceCalibration: {
    title: "Hardware- und Ergonomie-Standards für polygonale Blickverfolgung",
    points: [
      "Bildschirmwiederholrate: Zur Vermeidung von Bewegungsunschärfe und Ruckeln an den 60°-Eckpunkten wird ein Display mit mindestens 144 Hz empfohlen. Die Bildabfolge von 6,9 ms sichert exaktes Scheitelpunkt-Timing (Woods et al., 2015).",
      "Reaktionszeit und Ghosting-Kontrolle: Bei scharfen Richtungswechseln führen Panel-Schlieren zur Fehllokalisation des Zielzentrums; Panels mit ≤ 1 ms Reaktionszeit (IPS/OLED) bieten optimale Klarheit.",
      "Sitzabstand und Augenhöhe: Ein Betrachtungsabstand von 50 bis 65 cm sorgt dafür, dass das Dreieck einen horizontalen Blickwinkel von ca. 40° einnimmt. Der obere Scheitelpunkt sollte auf Augenhöhe liegen.",
      "Kontrast- und Helligkeitsabstimmung: Maximieren Sie den Kontrast zwischen tiefschwarzem Hintergrund (#050508) und rotem Ziel (#ef4444) bei blendfreier Raumbeleuchtung (120–150 cd/m²)."
    ]
  },
  faqs: [
    {
      "q": "Was ist die dreieckige Blickverfolgung (Triangular Pursuit)?",
      "a": "Triangular Pursuit ist eine interaktive okulomotorische Trainingsübung, bei der ein visuelles Ziel entlang einer geschlossenen gleichseitigen Dreiecksbahn verfolgt wird. Sie kombiniert kontinuierliche lineare Blickfolgebewegungen (Smooth Pursuit) auf den Kanten mit präzisen Fangsakkaden (Catch-up Saccades) an 60°-Eckpunkten (de Brouwer et al., 2002)."
    },
    {
      "q": "Warum ist die Verfolgung entlang eines Dreiecks anspruchsvoller als kreisförmiges Tracking?",
      "a": "Kreisförmiges Tracking basiert auf kontinuierlicher Richtungsänderung mit konstanter Krümmung. Ein Dreieck hingegen wechselt abrupt zwischen gleichförmiger linearer Bewegung und diskreten 120°-Richtungsbrüchen an den Scheitelpunkten. Das okulomotorische System muss schlagartig vom Folgemodus in den Sakkadenmodus umschalten (Orban de Xivry & Lefèvre, 2007)."
    },
    {
      "q": "Wie steuert das zentrale Nervensystem diagonale Augenbewegungen?",
      "a": "Diagonale Augenbewegungen erfordern die synchrone, proportionale Aktivierung horizontaler pontiner Zentren (PPRF) und vertikaler Mittelhirnzentren (riMLF). Das Kleinhirn (Flocculus und Vermis Lobuli VI-VII) fusioniert diese beiden orthogonalen Signale in Echtzeit zu einem einheitlichen Geschwindigkeitsvektor."
    },
    {
      "q": "Warum neigen die Augen dazu, spitze Scheitelpunkte kurvenschneidend abzukürzen?",
      "a": "Das Gehirn antizipiert die nächste Kante und löst vorzeitig eine Fangsakkade aus, bevor das Ziel den Eckpunkt erreicht (Bennett & Barnes, 2006). Das bewusste Unterdrücken dieser Abkürzung und das exakte Verfolgen bis zum Scheitelpunkt stärkt die geometrische Bewegungskontrolle."
    },
    {
      "q": "Was verursacht ein Überschwingen (Overshoot) des Blicks an Eckpunkten und wie verhindert man es?",
      "a": "Die Trägheit der Augenmuskeln und neuronale Übertragungsverzögerungen (~100–150 ms) führen dazu, dass Bremsbefehle zu spät greifen. Durch gezieltes Training aktiviert das Kleinhirn interne Vorwärtsmodelle, die den Blick etwa 40 ms vor dem Scheitelpunkt gezielt abbremsen (Barnes, 2008)."
    },
    {
      "q": "Wie profitieren Spieler von Ego-Shootern (CS2, Valorant, Apex Legends) von diesem Training?",
      "a": "In taktischen Shootern wechseln Gegner häufig abrupt die Richtung an Kanten oder führen Wall-Jumps und Sliding-Moves aus. Das Dreieckstracking schult das Fadenkreuz-Handling bei scharfen Richtungswechseln und minimiert Zielabweichungen bei der ersten Schussabgabe."
    },
    {
      "q": "Welchen Nutzen bringt das Dreieckstracking für Athleten in Ballsportarten (Squash, Tennis, Fußball)?",
      "a": "In Sportarten wie Squash, Tennis oder Eishockey prallen Bälle und Pucks in spitzen Winkeln von Wänden oder Böden ab. Das Training verkürzt die visuelle Wiedererfassungszeit (Re-Fixation) nach abrupten Richtungsänderungen erheblich (Heinen et al., 2005)."
    },
    {
      "q": "Welche tägliche Trainingsdauer und Satzstruktur wird wissenschaftlich empfohlen?",
      "a": "Empfohlen werden 2 bis 3 Durchgänge von jeweils 45 bis 60 Sekunden Dauer (ca. 3 bis 5 Minuten pro Tag). Da die abrupte Scheitelpunkt-Bremsung hohe neuromuskuläre Anforderungen stellt, maximieren kurze, hochfokussierte Einheiten den Trainingseffekt ohne visuelle Ermüdung."
    },
    {
      "q": "Welche Rolle spielt die Bildschirmwiederholrate (144Hz / 240Hz) beim Scheitelpunkt-Timing?",
      "a": "Ein 144Hz- (6,9 ms) oder 240Hz-Monitor (4,2 ms) visualisiert den Moment des Richtungswechsels wesentlich präziser als 60Hz-Displays (16,7 ms). Dies eliminiert zeitliche Quantisierungsfehler und ermöglicht exaktes prädiktives Bremsen (Woods et al., 2015)."
    },
    {
      "q": "Welche neuroplastischen Veränderungen entstehen im Kleinhirn durch regelmäßiges Polygon-Tracking?",
      "a": "Über synaptische Langzeitdepression (LTD) der Purkinje-Zellen im Kleinhirn optimiert das Gehirn seine internen Bewegungsvorhersagemodelle. Dies führt zu höherem Folgebewegungsgewinn (Gain) und einer Reduktion korrigierender Mikrosakkaden um über 60 % (Leigh & Zee, 2015)."
    }
  ],
  sources: pickSources('debrouwer2002', 'heinen2005', 'orbandexivry2007', 'bennett2006', 'barnes2008', 'woods2015'),
};

export default function LocalizedPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
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

      <TriangularPursuitClient copy={{
        title: "Dreieckige Blickverfolgung (Polygonales Winkeltraining)",
        subtitle: "3 Eckpunkte mit scharfem Richtungswechsel – Vektor-Tracking und Fangsakkaden",
        description: "Fixieren Sie ein Ziel entlang geschlossener dreieckiger Vektorbahnen und trainieren Sie den nahtlosen Übergang zwischen linearer Blickfolgebewegung und abrupten Fangsakkaden an 60°-Eckpunkten. Schult die cerebelläre Vorwärtssteuerung und eliminiert Überschwinger an scharfen Scheitelpunkten (de Brouwer et al., 2002; Orban de Xivry & Lefèvre, 2007)."
      }} />
      <DrillGuide guide={guide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/de/drills/visual-tracking/triangular-pursuit" />
      </div>
    </>
  );
}
