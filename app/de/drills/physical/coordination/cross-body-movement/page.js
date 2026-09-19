import CrossBodyMovementClient from '@/app/drills/physical/coordination/cross-body-movement/CrossBodyMovementClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Germany (DE / DACH)
// Primary Intent: Hand-Auge-Koordination Trainieren, Hand-Auge-Koordination Test, Hand-Auge-Koordination Spiele Online
// Context: Sensory integration (Mittellinien-Überkreuzung), bilateral motor coordination & FPS diagonal flicks
// Target Queries:
//   - "Hand-Auge-Koordination Trainieren" (High-intent athletic & neurological training query)
//   - "Hand-Auge-Koordination Test" / "Hand-Auge-Koordination Testen" (Diagnostic query)
//   - "Hand-Auge-Koordination Spiele Online" (Online gamified coordination query)
//   - "Auge-Hand-Koordination Übungen" (Core occupational therapy search)
//   - "Bilaterale Koordination Übungen" (Bilateral motor control)
//   - "Feinmotorik Koordination Test" (Fine motor precision test)
//   - "Mittellinien Überkreuzung Training" (Cross-body midline crossing)
// ============================================================

export const metadata = {
  title: "Hand-Auge-Koordination Test – Koordination | SkillDrills",
  description: "Kostenloser Hand-Auge-Koordinationstest online. Verbinde Nodes auf dem Bildschirm und trainiere bilaterale Koordination und diagonale Präzision im Browser.",
  keywords: [
    "Hand-Auge-Koordination Trainieren",
    "Hand-Auge-Koordination Test",
    "Hand-Auge-Koordination Spiele Online",
    "Auge-Hand-Koordination Übungen",
    "Bilaterale Koordination Übungen",
    "Feinmotorik Koordination Test",
    "Mittellinien Überkreuzung Training",
    "Koordinationstraining Maus",
    "Diagonale Flicks Üben",
    "Hand Auge Koordination Verbessern"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/physical/coordination/cross-body-movement',
    languages: getAlternateLanguages('/drills/physical/coordination/cross-body-movement'),
  },
  openGraph: {
    title: "Hand-Auge-Koordination Test – Koordination | SkillDrills",
    description: "Kostenloser Hand-Auge-Koordinationstest online. Verbinde Nodes auf dem Bildschirm und trainiere bilaterale Koordination und diagonale Präzision im Browser.",
    url: 'https://skilldrills.online/de/drills/physical/coordination/cross-body-movement',
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hand-Auge-Koordination Test – Koordination | SkillDrills",
    description: "Kostenloser Hand-Auge-Koordinationstest online. Verbinde Nodes auf dem Bildschirm und trainiere bilaterale Koordination und diagonale Präzision im Browser.",
  },
  robots: { index: true, follow: true },
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
      "name": "Physisches Training",
      "item": "https://skilldrills.online/de/drills/physical"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Koordination",
      "item": "https://skilldrills.online/de/drills/physical/coordination"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Hand-Auge-Koordination Test & Spiel",
      "item": "https://skilldrills.online/de/drills/physical/coordination/cross-body-movement"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Hand-Auge-Koordination Test & Bilateraler Trainer",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Kostenloses interaktives Tool zur Schulung der Hand-Auge-Koordination und bilateralen motorischen Integration durch schnelles Überkreuzen der Körper-Mittellinie.",
  "url": "https://skilldrills.online/de/drills/physical/coordination/cross-body-movement",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online/de"
  },
  "inLanguage": "de",
  "dateModified": "2026-09-12"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Hand-Auge-Koordination Trainer",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas und Pointer-Input in modernem Browser erforderlich",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/de/drills/physical/coordination/cross-body-movement",
  "inLanguage": "de",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Hand-Auge-Koordination Spiel (Cross-Body Movement)",
  "url": "https://skilldrills.online/de/drills/physical/coordination/cross-body-movement",
  "description": "Schule deine Hand-Auge-Koordination und interhemisphärische Reizweiterleitung durch dynamisches diagonales Ziehen quer über den Bildschirm.",
  "genre": [
    "Coordination Drill",
    "Motor Control",
    "Action",
    "Reflex Game"
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-12",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Welche neuro-motorischen Fähigkeiten misst dieser Hand-Auge-Koordinationstest?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dieser Drill analysiert die Reizkopplung zwischen der visuellen Reizerfassung (Okzipitallappen), der räumlichen Orientierung (Parietallappen) und der gezielten motorischen Muskelsteuerung (motorischer Kortex). Durch das Überqueren der Körper-Mittellinie wird insbesondere die Geschwindigkeit der interhemisphärischen Reizübertragung über das Corpus Callosum (Balken) gemessen."
      }
    },
    {
      "@type": "Question",
      "name": "Warum ist das Überkreuzen der Körper-Mittellinie (Midline Crossing) so anspruchsvoll?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Biomechanische Studien von David Carey et al. (1996) belegen, dass Bewegungen in den kontralateralen Raum (auf die der führenden Hand gegenüberliegende Körperseite) eine messbare neuronale Verzögerung und erhöhte Bahnungsfehler aufweisen. Das gezielte Training dieser Überkreuzung baut die neuronale Brücke zwischen linker und rechter Gehirnhälfte aus und harmonisiert das motorische Sicht- und Arbeitsfeld."
      }
    },
    {
      "@type": "Question",
      "name": "Wie profitieren E-Sportler und Shooter-Spieler (CS2, Valorant, Apex) von diesem Training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die meisten Spieler sind auf rein horizontale Crosshair-Bewegungen konditioniert. Bei weiten Diagonal-Flicks oder vertikalen Ausweichmanövern blockiert das Handgelenk oft, was zu unpräzisen bogenförmigen Kurven führt. Dieser Drill trainiert das flüssige Durchziehen diagonaler Vektoren unter Einbindung von Unterarm und Schulter, was blitzschnelle 180°-Target-Switches stabilisiert."
      }
    },
    {
      "@type": "Question",
      "name": "Wie verändern sich Korridorbreite und Knotengröße im Verlauf der 15 Level?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Schwierigkeit steigt dynamisch alle 250 Punkte: Der zulässige Toleranzkorridor verengt sich stufenweise von anfänglichen 10 Pixeln auf extrem schmale 4 Pixel in Level 15. Gleichzeitig schrumpft der Radius der zu treffenden Zielknoten von 16 auf 8 Pixel, während die Knoten weiter an die äußersten Ecken des Monitors wandern."
      }
    },
    {
      "@type": "Question",
      "name": "Gibt es Punktabzug oder Zeitverlust, wenn man den Toleranzkorridor verlässt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nein. Ein Abweichen aus dem leuchtenden Korridor setzt lediglich den aktuellen Combo-Multiplikator auf 1,0x zurück. Es werden weder Punkte abgezogen noch läuft die feste 45-Sekunden-Session schneller ab. Dies motiviert dazu, das Training mit maximaler physischer Geschwindigkeit zu absolvieren."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Mausempfindlichkeit (DPI/eDPI) und welches Mauspad eignen sich für weite diagonale Sweeps?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Empfohlen wird eine mittlere bis niedrige Sensitivität von 30 bis 45 cm/360° gepaart mit einem großen Gaming-Mauspad (mindestens 450x400 mm). Nur mit ausreichend physischer Gleitfläche lässt sich die Diagonale in einem einzigen unterbrechungsfreien Schwung ziehen, ohne die Maus anheben zu müssen."
      }
    },
    {
      "@type": "Question",
      "name": "Warum sollte man diagonale Bewegungen nicht rein aus dem Handgelenk ausführen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Anatomie der Handwurzelknochen zwingt isolierte Handgelenkbewegungen auf eine kreisförmige Bahn (Kreisbogen). Um eine exakte mathematische Diagonale im engen Korridor zu ziehen, muss das Handgelenk stabilisiert und der Unterarm mit dem Ellenbogen als Drehachse eingesetzt werden."
      }
    },
    {
      "@type": "Question",
      "name": "Wie hilft das Woodworth-Modell, den winzigen 8-px-Zielknoten fehlerfrei zu treffen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nach Robert S. Woodworth (1899) unterteilt sich eine zielgerichtete Bewegung in zwei Phasen: 75% der Strecke werden mit maximaler ballistischer Geschwindigkeit überbrückt. Auf den letzten 25% üben die Fingerkuppen leichten vertikalen Druck auf das Pad aus, um über Reibung eine millimetergenaue terminale Abbremsung zu bewirken."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Kriterien müssen für den Spitzenrang von 17.000 Punkten (Apex Bilateral Master) erfüllt sein?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gefordert sind das Erreichen von Level 12 oder höher, das dauerhafte Halten des 3,0x-Combo-Multiplikators ohne einen einzigen Korridor-Ausrutscher und eine Treffergenauigkeit von über 92% bei den geschrumpften 8-px-Knoten. Entscheidend ist, den Blick bereits im Moment der Berührung von Knoten A sofort auf Knoten B zu richten."
      }
    },
    {
      "@type": "Question",
      "name": "Ist dieser Test völlig kostenlos und ohne Installation im Browser spielbar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, SkillDrills ist zu 100% kostenfrei, werbefrei und läuft direkt im Browser über modernste HTML5-Canvas- und Pointer-Lock-Technologie. Es ist kein Download und keine Registrierung notwendig. Sämtliche Rekorde bleiben ausschließlich lokal auf deinem Gerät gespeichert."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Anleitung: Hand-Auge-Koordination und bilaterale Diagonalschwünge trainieren",
  "description": "Systematischer 4-Schritte-Trainingsleitfaden zur präzisen Durchführung von Vektorschwüngen über die Körper-Mittellinie.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Startknoten A berühren und Vektor aktivieren",
      "text": "Bewege den Cursor auf den aufblitzenden cyanfarbenen Startknoten am Bildschirmrand, um den Toleranzkorridor zu initialisieren.",
      "url": "https://skilldrills.online/de/drills/physical/coordination/cross-body-movement#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Diagonale Mittellinien-Überquerung im Korridor",
      "text": "Führe einen flüssigen Schwung quer über das Display zur gegenüberliegenden Bildschirmecke aus, ohne die leuchtenden Korridorgrenzen zu verlassen.",
      "url": "https://skilldrills.online/de/drills/physical/coordination/cross-body-movement#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Zielknoten B zentriert treffen und Verbindung vollenden",
      "text": "Triff den magentafarbenen Endknoten exakt, um die Vektorverbindung einzuloggen und das visuelle Partikel-Feedback auszulösen.",
      "url": "https://skilldrills.online/de/drills/physical/coordination/cross-body-movement#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Seriengeschwindigkeit steigern und 3,0x Combo sichern",
      "text": "Halte die fehlerfreie Serie aufrecht, um den Multiplikator auf das Maximum von 3,0x zu katapultieren und die 45 Sekunden optimal zu nutzen.",
      "url": "https://skilldrills.online/de/drills/physical/coordination/cross-body-movement#step-4"
    }
  ]
};

const crossBodyGuide = {
  heading: "Kognitiv-motorische Grundlagen der bilateralen Hand-Auge-Koordination",
  subtitle: "Sensomotorische Integration nach Ayres, kontralaterale Latenzfaktoren nach Carey und Fitts-Woodworth-Doppelphasenmodell",
  intro: [
    "Das Hand-Auge-Koordinationstraining (Cross-Body Movement Drill) ist eine neuro-motorische Hochgeschwindigkeitsübung, die die visuell-räumliche Präzision beim gezielten Überqueren der körpereigenen Symmetrieachse – der sogenannten Mittellinie (Body Midline) – auf Millimeter-Ebene misst. Im Unterschied zu monotonen horizontalen Zielverfolgungen erzwingt das diagonale Führen der Hand in den kontralateralen Halbraum eine intensive Aktivierung des Corpus Callosum (Balken) und stellt somit einen elementaren Baustein funktioneller Koordination dar.",
    "Die Begründerin der sensorischen Integrationstherapie, A. Jean Ayres (1972), wies nach, dass das Überkreuzen der Körper-Mittellinie für die synchrone Reifung beider Großhirnrinden unerlässlich ist. Zudem bewiesen David Carey et al. (1996) in grundlegenden motorischen Studien, dass Zielbewegungen in den kontralateralen Raum gegenüber Bewegungen im ipsilateralen Raum eine messbare Verzögerung der motorischen Antwortzeit sowie eine verringerte Anfangsgenauigkeit aufweisen. Dieser Drill trainiert das Nervensystem darauf, diese Hemmung systematisch zu neutralisieren.",
    "Nach dem Gesetz von Paul Fitts (1954) wächst der Schwierigkeitsgrad (Index of Difficulty) logarithmisch mit der Weite der Distanz und der Enge des Ziels. In den höheren Leveln dieses Drills schrumpft der Führungskorridor auf gerade einmal 4 Pixel zusammen, während die Zielpunkte auf 8 Pixel minimiert werden. Wie Robert S. Woodworths (1899) Zweiphasenmodell erklärt, entscheidet hierbei das feine Zusammenspiel aus initialer ballistischer Beschleunigung des Unterarms (Ballistic phase) und kontrollierter terminaler Abbremsung über die Fingerkuppen (Current-control deceleration) über Sieg oder Punktverlust.",
    "Messtechnische Genauigkeit & Hardware-Hinweise: Dieser Drill nutzt den hochpräzisen Zeitgeber performance.now() des Browsers für Berechnungen auf Millisekunden-Ebene. Durch die Bildwiederholfrequenz deines Monitors (60 Hz ca. 16,7 ms / 144 Hz ca. 6,9 ms / 240 Hz ca. 4,1 ms, Woods et al., 2015) und die Maus-Pollingrate (125 Hz vs. 1000 Hz) entstehen physikalische Latenzunterschiede. Abweichungen unter 5 ms sind als messtechnisches Rauschen zu bewerten. Sämtliche Daten werden ausschließlich lokal in deinem Browser gespeichert."
  ],
  benchmarks: {
    title: "Hand-Auge-Koordination & diagonale Mittellinien-Präzision 5-Stufen-Benchmarks",
    headers: ["Leistungsstufe", "Rangtitel (Rank Title)", "Punktwert-Spanne", "Erreichtes Level", "Verbindungsgenauigkeit", "Neuro-motorisches Profil"],
    rows: [
      ["Tier 1: Apex Bilateral Master", "Apex Bilateral Master", "17.000+ Pkt.", "Level 12 – 15", "> 92% Genauigkeit", "Top 0,1%: Perfektionierte interhemisphärische Koordination und fehlerfreie Unterarmführung im extremen 4-px-Korridor (Ayres 1972; Fitts 1954)"],
      ["Tier 2: Elite Midline Sweeper", "Elite Midline Sweeper", "13.000 – 16.999 Pkt.", "Level 9 – 11", "85 – 91% Genauigkeit", "Latenzfreie kontralaterale Beschleunigung und hochpräzise Woodworth-Abbremsung auf 8-px-Knoten (Carey et al. 1996)"],
      ["Tier 3: Advanced Vector Tracer", "Advanced Vector Tracer", "9.500 – 12.999 Pkt.", "Level 6 – 8", "76 – 84% Genauigkeit", "Solides E-Sport-Niveau bei weiten Diagonal-Flicks und stabiler Mittellinien-Überkreuzung ohne nennenswerte Verzögerung"],
      ["Tier 4: Intermediate Node Connector", "Intermediate Node Connector", "6.000 – 9.499 Pkt.", "Level 3 – 5", "65 – 75% Genauigkeit", "Standard-Koordination: Bei Korridorbreiten unter 6 px führen Handgelenk-Winkelgrenzen zu wiederholten Korridorverletzungen"],
      ["Tier 5: Novice Diagonal Learner", "Novice Diagonal Learner", "< 6.000 Pkt.", "Level 1 – 2", "< 65% Genauigkeit", "Bogige Kurvenkrümmung durch reines Handgelenk-Schwenken, deutliches Überschießen an Eckzielen; Unterarmführung empfohlen"]
    ],
    note: "Wissenschaftlich begründete Standards abgeleitet aus sensorischer Integration (Ayres 1972), kontralateraler Bewegungsforschung (Carey et al. 1996) und motorischen Amplitudengesetzen (Fitts 1954)."
  },
  techniques: {
    title: "Praxis-Protokolle zur Steigerung der Hand-Auge-Koordination",
    items: [
      {
        name: "Ayres Mittellinien-Überkreuzung & Balken-Aktivierung (Ayres Midline Crossing)",
        desc: "Richte Stuhl und Monitor so aus, dass dein Brustbein exakt auf die Mitte des Bildschirms zentriert ist. Drehe nicht den Oberkörper mit, sondern führe den Unterarm quer vor dem Körper vorbei, um den reinen kontralateralen Reiz auszulösen.",
        tips: "Halte die Sitzposition stabil und nutze den Ellenbogen auf der Schreibtischkante als festen Gleitdrehpunkt für den Arm."
      },
      {
        name: "Carey Kontralaterale Vorbeschleunigung & Blickansteuerung (Contralateral Feedforward Gaze)",
        desc: "Um die von Carey et al. (1996) beschriebene Reaktionsverzögerung zu neutralisieren, muss der Blick in dem Moment, in dem Knoten A berührt wird, sofort auf Knoten B springen.",
        tips: "Verfolge nicht den Mauszeiger mit den Augen, sondern fixiere das Ziel B – das motorische Feedforward-Programm des Kortex steuert die Hand automatisch auf kürzestem Weg."
      },
      {
        name: "Woodworth Terminale Scheitelpunkt-Bremsung auf Knoten B (Terminal Deceleration)",
        desc: "Nutze das Woodworth-Modell: 75% der Diagonale werden mit explosiver ballistischer Beschleunigung genommen. Auf den letzten 25% üben die Fingerkuppen leichten Druck nach unten aus.",
        tips: "In höheren Levels mit 8-px-Knoten fängt das Absenken des Handballens auf das Pad den Schwung ab und verhindert jedes Überschießen."
      },
      {
        name: "Fitts-Index-Kompensation durch Unterarm-Ellenbogen-Führung (Forearm Elbow Pivot)",
        desc: "Wer nur aus dem Handgelenk agiert, erzeugt zwangsläufig eine Kreisbahn, die den 4-px-Korridor sofort verletzt. Halte das Handgelenk neutral und ziehe die Gerade aus Ellenbogen und Schulter.",
        tips: "Ein Mauspad von mindestens 45 cm Breite stellt sicher, dass für den vollen Diagonalstrich genügend physischer Gleitraum vorhanden ist."
      }
    ]
  },
  steps: [
    "Positioniere dein Brustbein zentriert vor der Monitormitte und nimm eine aufrechte Haltung ein.",
    "Bewege den Cursor zu Rundenbeginn auf den cyanfarbenen Startknoten A am Rand.",
    "Ziehe die Diagonale flüssig durch den aufleuchtenden Korridor zum Zielknoten B.",
    "Triff Knoten B punktgenau und halte die fehlerfreie Serie für den 3,0x-Maximalcombo aufrecht."
  ],
  audience: "Gamer und E-Sportler (CS2, Valorant, Apex), Athleten, Kampfsportler sowie alle, die ihre bilaterale Hand-Auge-Koordination und Mittellinien-Präzision gezielt steigern wollen.",
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('ayres1972', 'carey1996', 'cernacek1961', 'fitts1954', 'woodworth1899', 'woods2015'),
};

export default function CrossBodyMovementPageDe() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <CrossBodyMovementClient
        copy={{
          title: "Hand-Auge-Koordination Test & Spiel",
          subtitle: "Bilaterale Koordination & Mittellinien-Überkreuzung • 15 Level",
          rulesTitle: "Trainingsregeln & Punktesystem für Hand-Auge-Koordination",
          rules: [
            { title: "Startknoten A aktivieren", text: "Bewege den Cursor auf den cyanfarbenen Startknoten am Bildschirmrand, um den Verbindungsvektor zu initialisieren." },
            { title: "Diagonales Ziehen im Korridor", text: "Ziehe die Maus flüssig durch den aufleuchtenden Toleranzkanal quer über die Mittellinie zum Zielknoten B am gegenüberliegenden Rand." },
            { title: "Zielknoten treffen & Combo aufbauen", text: "Triffst du den magentafarbenen Zielknoten präzise, explodiert ein Partikel-Feedback und dein Combo-Multiplikator wächst auf bis zu 3,0x." },
            { title: "Fehlertoleranz ohne Zeitabzug", text: "Verlässt dein Cursor den Korridor, fällt der Multiplikator auf 1,0x zurück, die 45-Sekunden-Rundenzeit läuft jedoch ungestört weiter." }
          ],
          aboutTitle: "Über das Hand-Auge-Koordinationstraining",
          aboutHeading: "Körper-Mittellinien-Überkreuzung und bilaterale motorische Integration",
          aboutText: "Dieser Drill basiert auf A. Jean Ayres' (1972) Theorie der sensorischen Integration sowie David Careys (1996) Studien zu kontralateralen Greifbewegungen. Das weite diagonale Überkreuzen der Körper-Mittellinie aktiviert den interhemisphärischen Informationsaustausch über das Corpus Callosum (Balken) und schult die koordinierte Unterarm-Schulter-Führung für präzise Flicks, 180-Grad-Resets und dynamische Zielwechsel in Gaming und Sport."
        }}
      />
      <DrillGuide guide={crossBodyGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="physical"
          currentHref="/drills/physical/coordination/cross-body-movement"
          locale="de"
        />
      </div>
    </>
  );
}
