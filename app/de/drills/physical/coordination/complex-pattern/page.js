import ComplexPatternClient from '@/app/drills/physical/coordination/complex-pattern/ComplexPatternClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';

// ============================================================
// SEO RESEARCH FINDINGS — Germany (DE / DACH)
// Primary Intent: Muster Merken Test, Muster Merken Spiel, Räumliches Vorstellungsvermögen Test, Arbeitsgedächtnis Trainieren
// Context: German medical aptitude (TMS Muster zuordnen / Figuren lernen) & E-Sport Recoil Tracking
// Target Queries:
//   - "Muster Merken Test" (High-intent cognitive aptitude test phrase)
//   - "Muster Merken Spiel" (Brain game / pattern memory game)
//   - "Räumliches Vorstellungsvermögen Test" (Spatial visualization test)
//   - "Arbeitsgedächtnis Trainieren Spiele" (Working memory brain training)
//   - "Visuelles Gedächtnis Test Online" (Visual memory test online free)
//   - "Pfade Merken Spiel Browser" (Path tracing browser game)
//   - "Feinmotorik Koordination Maus" (Mouse fine motor coordination)
// ============================================================

export const metadata = {
  title: 'Muster Merken Test – Visuelles Gedächtnis | SkillDrills',
  description: 'Kostenloses Muster-Merken-Spiel online. Merke dir komplexe Pfade und trainiere dein räumliches Arbeitsgedächtnis und Feinmotorik direkt im Browser.',
  keywords: [
    "Muster Merken Test",
    "Muster Merken Spiel",
    "Räumliches Vorstellungsvermögen Test",
    "Arbeitsgedächtnis Trainieren Spiele",
    "Visuelles Gedächtnis Test Online",
    "Pfade Merken Spiel Browser",
    "Gedächtnisspiel Online Kostenlos",
    "Gehirntraining Muster",
    "Feinmotorik Koordination Maus",
    "Recoil Pattern Training"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/physical/coordination/complex-pattern',
    languages: getAlternateLanguages('/drills/physical/coordination/complex-pattern'),
  },
  openGraph: {
    title: 'Muster Merken Test – Visuelles Gedächtnis | SkillDrills',
    description: 'Kostenloses Muster-Merken-Spiel online. Merke dir komplexe Pfade und trainiere dein räumliches Arbeitsgedächtnis und Feinmotorik direkt im Browser.',
    url: 'https://skilldrills.online/de/drills/physical/coordination/complex-pattern',
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muster Merken Test – Visuelles Gedächtnis | SkillDrills',
    description: 'Kostenloses Muster-Merken-Spiel online. Merke dir komplexe Pfade und trainiere dein räumliches Arbeitsgedächtnis und Feinmotorik direkt im Browser.',
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
      "name": "Muster Merken Test & Räumliches Gedächtnistraining",
      "item": "https://skilldrills.online/de/drills/physical/coordination/complex-pattern"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Muster Merken Test & Räumliches Arbeitsgedächtnistraining",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Kostenloses webbasiertes Tool zur Messung und Schulung des visuell-räumlichen Arbeitsgedächtnisses und der Feinmotorik durch sequenzielle geometrische Pfadreproduktion.",
  "url": "https://skilldrills.online/de/drills/physical/coordination/complex-pattern",
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
  "name": "Muster Merken Trainer",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas und Maus-Eingabe in modernem Webbrowser erforderlich",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/de/drills/physical/coordination/complex-pattern",
  "inLanguage": "de",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Muster Merken Spiel (Pattern Memory Game)",
  "url": "https://skilldrills.online/de/drills/physical/coordination/complex-pattern",
  "description": "Präge dir kurz aufleuchtende Vektorpfade ein und zeichne sie fehlerfrei per Maus nach. Kostenloses kognitives Koordinationsspiel.",
  "genre": [
    "Brain Training",
    "Memory Test",
    "Coordination Drill",
    "Action"
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
      "name": "Welche kognitiven und feinmotorischen Fähigkeiten misst der Muster-Merken-Test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der Drill evaluiert simultan die Pufferkapazität des visuell-räumlichen Notizblocks (Visuospatial Sketchpad) im parietalen und präfrontalen Kortex sowie die serielle motorische Pfadreproduktion des primären motorischen Kortex. Gemessen wird, wie effizient flüchtige geometrische Vektorkoordinaten enkodiert und ohne zeitliche Latenz in kontinuierliche Maussteuerungsbefehle umgesetzt werden."
      }
    },
    {
      "@type": "Question",
      "name": "Inwiefern hilft dieses Training bei Eignungstests wie dem TMS (Muster zuordnen / Figuren lernen)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der Untertest 'Muster zuordnen' und 'Figuren lernen' im TMS (Test für Medizinische Studiengänge) verlangt das blitzschnelle Erfassen subtiler geometrischer Merkmale unter Zeitdruck. Durch die dynamische Skalierung auf bis zu 8 Knoten und Einprägezeiten von nur 0,6 Sekunden schult dieser Drill die Fähigkeit, visuelle Reize in Sekundenschnelle strukturiert im Arbeitsgedächtnis zu verankern."
      }
    },
    {
      "@type": "Question",
      "name": "Wie hängen Baddeleys Notizblock und Cowans 4-Elemente-Limit mit den Levelstufen zusammen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nach Alan Baddeley (1974) speichert der visuell-räumliche Notizblock räumliche Orientierungen nur temporär. Nelson Cowan (2001) wies nach, dass die reine Kapazität des unstrukturierten Arbeitsgedächtnisses bei etwa 4 Items liegt. Während Level 1 bis 4 innerhalb dieser Spanne liegen, bricht das Einprägen einzelner Punkte ab Level 5 (5 bis 8 Knoten) zusammen. Der Trainierende wird neuroplastisch gezwungen, übergeordnete geometrische Chunks (z. B. Dreiecke, Zickzacklinien) zu bilden."
      }
    },
    {
      "@type": "Question",
      "name": "Wie verändern sich Einprägezeit und Knotenanzahl im Verlauf der 15 Level?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Schwierigkeit skaliert dynamisch: Die Anzahl der miteinander zu verbindenden Wegpunkte wächst von 3 auf bis zu 8 Knoten an, während die Sichtbarkeitsdauer des Pfades von anfänglichen 2,0 Sekunden schrittweise auf 0,6 Sekunden sinkt. Gleichzeitig werden die geometrischen Winkel spitzwinkliger und erfordern anspruchsvolle Richtungswechsel."
      }
    },
    {
      "@type": "Question",
      "name": "Wie wird die prozentuale Pfadgenauigkeit (Accuracy %) mathematisch ermittelt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Genauigkeit basiert auf einer Echtzeit-Kollisionsprüfung und der euklidischen Koordinatenabweichung (Euclidean Deviation) zwischen dem gezeichneten Vektor und dem Zielpfad. Werden alle Wegpunkte in der korrekten Reihenfolge mit minimaler Abweichung passiert, werden Genauigkeitswerte von über 85% bis 95% erzielt."
      }
    },
    {
      "@type": "Question",
      "name": "Verbessert dieser Drill das Recoil-Control (Spray Patterns) in Shooter-Games wie CS2 oder Valorant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, in erheblichem Maße. Das Beherrschen von Rückstoßmustern (Spray Patterns) erfordert das blinde Abrufen gespeicherter zweidimensionaler Bewegungskurven ohne externe Hilfslinien. Dieser Drill konditioniert exakt die motorische Feedforward-Steuerung, bei der das Gehirn gespeicherte Vektoren präzise an Hand- und Fingermuskeln überträgt."
      }
    },
    {
      "@type": "Question",
      "name": "Mit welchen kognitiven Chunking-Strategien lassen sich komplexe Zickzack-Pfade am besten behalten?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Merke dir nicht die einzelnen Koordinaten, sondern fasse Wegpunkte zu bekannten geometrischen Gestalten zusammen (z. B. 'Buchstabe N', 'Pfeilspitze', 'Dreieck mit Ausleger'). Ein 7-Knoten-Pfad wird so zu '1 Dreieck + 1 Gerade' – das reduziert die kognitive Belastung von 7 isolierten Punkten auf lediglich 2 handhabbare Chunks."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Maus-Empfindlichkeit (DPI) und welcher Griff eignen sich am besten für schnelles Nachzeichnen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eine mittlere Mausempfindlichkeit von 25 bis 35 cm/360° bietet den besten Kompromiss aus Reichweite und Präzision. Als Griffhaltung empfiehlt sich der Claw-Grip oder Fingertip-Grip: Sie bieten im Vergleich zum Palm-Grip mehr Gelenkspielraum in den Fingerkuppen, um spitze Scheitelpunkte ohne Bremsverzögerung exakt auszuführen."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Kriterien müssen erfüllt sein, um den Spitzenrang von 17.000 Punkten (Apex-Rang) zu erreichen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Voraussetzung ist das fehlerfreie Erreichen von Level 12 oder höher innerhalb der 45 Sekunden, das Aufrechterhalten des maximalen 4,0x Combo-Multiplikators und eine Durchschnittsgenauigkeit von mindestens 92%. Dies gelingt nur mit ununterbrochener Voraktivierung der Bewegungsmuster im Kopf während der Aufblitzphase."
      }
    },
    {
      "@type": "Question",
      "name": "Ist dieser Test vollkommen kostenlos und ohne Installation nutzbar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, SkillDrills ist zu 100% kostenfrei und läuft direkt in jedem modernen Webbrowser (HTML5 Canvas). Es ist weder ein Download noch eine Registrierung erforderlich. Alle Rekorde und Trainingsstatistiken verbleiben ausschließlich lokal in deinem Browser."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Anleitung: Räumliches Arbeitsgedächtnis und Pfad-Reproduktion trainieren",
  "description": "4-Schritte-Trainingsprotokoll zum systematischen Einprägen geometrischer Pfade und deren exakter Rekonstruktion per Maus.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Aufblitzenden Pfad erfassen und geometrisch chunking",
      "text": "Konzentriere dich zu Rundenbeginn auf die grüne Vektorlinie. Fasse die Wegpunkte sofort zu geometrischen Unterformen (Dreiecke, Zickzack) zusammen, bevor die Linie erlischt.",
      "url": "https://skilldrills.online/de/drills/physical/coordination/complex-pattern#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Cyanfarbenen Startknoten anklicken und Pfad ziehen",
      "text": "Sobald die Zeichenphase aktiv ist, klicke auf den cyanfarbenen Startpunkt und ziehe die Maus mit gedrückter Taste los.",
      "url": "https://skilldrills.online/de/drills/physical/coordination/complex-pattern#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Wegpunkte sequenziell ansteuern und am Endknoten loslassen",
      "text": "Führe den Cursor in der gelernten Reihenfolge durch jeden Knotenpunkt und lasse die Maustaste erst auf dem magentafarbenen Zielknoten los.",
      "url": "https://skilldrills.online/de/drills/physical/coordination/complex-pattern#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Geschwindigkeit steigern und 4,0x Multiplikator halten",
      "text": "Vollende korrekte Pfade zügig, um deinen Combo-Multiplikator auf bis zu 4,0x auszubauen und innerhalb von 45 Sekunden maximale Punkte zu erzielen.",
      "url": "https://skilldrills.online/de/drills/physical/coordination/complex-pattern#step-4"
    }
  ]
};

const patternGuide = {
  heading: "Visuell-räumliches Arbeitsgedächtnis und serielle Pfad-Reproduktion",
  subtitle: 'Muster Merken Test – Visuelles Gedächtnis | SkillDrills',
  intro: [
    "Das Muster-Merken-Training (Complex Pattern Drill) ist eine koordinative High-Speed-Aufgabe, bei der flüchtige geometrische Vektorpfade innerhalb von Sekundenbruchteilen im Arbeitsgedächtnis verankert und anschließend auf einer leeren Leinwand allein aus dem Gedächtnis exakt nachgezeichnet werden müssen. Im Unterschied zu reinen Klick-Reflex-Tests erfordert diese Übung das gleichzeitige Halten mehrteiliger Raumkoordinaten unter Zeitdruck und deren verzögerungsfreie Umsetzung in kontinuierliche motorische Steuerimpulse.",
    "Nach dem vielbeachteten Modell von Alan Baddeley und Graham Hitch (1974) wird visuelle und räumliche Information im sogenannten 'visuell-räumlichen Notizblock' (Visuospatial Sketchpad) kurzzeitig repräsentiert. Nelson Cowan (2001) bewies in seinen kognitionswissenschaftlichen Arbeiten, dass die unverfälschte Haltekapazität des menschlichen Arbeitsgedächtnisses auf etwa 3 bis 4 unabhängige Elemente beschränkt ist. Sobald der Drill in höheren Levels 5 bis 8 Knotenpunkte vorgibt, stößt das isolierte Merken von Einzelpunkten an seine biologische Grenze: Der Trainierende muss die Knotenpunkte zu übergeordneten geometrischen Einheiten (z. B. Dreiecken, Buchstaben oder Zickzack-Segmenten) zusammenfassen ('Chunking').",
    "Karl Lashleys (1951) Pionierarbeit über die serielle Ordnung des Verhaltens ('The Problem of Serial Order in Behavior') zeigte auf, dass schnelle koordinative Kettenbewegungen nicht Schritt für Schritt über sensorisches Feedback korrigiert werden können. Stattdessen werden sie vorab als geschlossenes motorisches Programm ('Motor Chunk') im Kortex kompiliert. In Übereinstimmung mit Robert S. Woodworths (1899) zweiphasigem Modell harmonieren dabei die initiale ballistische Beschleunigungsphase von Knoten zu Knoten und die präzise terminale Abbremsung an den Scheitelpunkten, um ein Überschießen des Cursors zu verhindern.",
    "Messtechnische Genauigkeit & Hardware-Hinweise: Dieser Drill nutzt den hochpräzisen Zeitgeber performance.now() des Browsers für Berechnungen auf Millisekunden-Ebene. Durch die Bildwiederholfrequenz deines Monitors (60 Hz ca. 16,7 ms / 144 Hz ca. 6,9 ms / 240 Hz ca. 4,1 ms, Woods et al., 2015) und die Maus-Pollingrate (125 Hz vs. 1000 Hz) entstehen physikalische Latenzunterschiede. Abweichungen unter 5 ms sind als messtechnisches Rauschen zu bewerten. Sämtliche Daten werden ausschließlich lokal in deinem Browser gespeichert."
  ],
  benchmarks: {
    title: 'Muster Merken Test – Visuelles Gedächtnis | SkillDrills',
    headers: ["Leistungsstufe", "Rangtitel (Rank Title)", "Punktwert-Spanne", "Erreichtes Level", "Pfadgenauigkeit", "Neuro-kognitives & motorisches Profil"],
    rows: [
      ["Tier 1: Apex Pattern Master", "Apex Pattern Master", "17.000+ Pkt.", "Level 12 – 15", "> 92% Genauigkeit", "Top 0,1%: Hochgradig automatisiertes räumliches Chunking und meisterhafte Unterarm-Finger-Präzision (Cowan 2001; Lashley 1951)"],
      ["Tier 2: Elite Sequence Tracer", "Elite Sequence Tracer", "13.000 – 16.999 Pkt.", "Level 9 – 11", "85 – 91% Genauigkeit", "Top 3%: Sicheres Beherrschen spitzwinkliger 6–7-Knoten-Pfade und exzellentes motorisches Feedforward-Gedächtnis (Baddeley 1974)"],
      ["Tier 3: Advanced Spatial Navigator", "Advanced Spatial Navigator", "9.500 – 12.999 Pkt.", "Level 6 – 8", "76 – 84% Genauigkeit", "Top 15%: Solides räumliches Vorstellungsvermögen auf dem Niveau ambitionierter E-Sportler und Eignungstest-Kandidaten"],
      ["Tier 4: Intermediate Waypoint Recaller", "Intermediate Waypoint Recaller", "6.000 – 9.499 Pkt.", "Level 3 – 5", "65 – 75% Genauigkeit", "Typische biologische Kapazitätsgrenze: Bei mehr als 4 Knoten treten Verzögerungen beim Abrufen und Pfadverzerrungen auf"],
      ["Tier 5: Novice Trajectory Learner", "Novice Trajectory Learner", "< 6.000 Pkt.", "Level 1 – 2", "< 65% Genauigkeit", "Instabile Enkodierung flüchtiger Reize, deutliches Überschießen an Eckpunkten; grundlegendes Chunking-Training empfohlen"]
    ],
    note: "Objektive Standards abgeleitet aus der Arbeitsgedächtnisforschung (Baddeley & Hitch 1974; Cowan 2001) und seriellen motorischen Steuerungsmodellen (Lashley 1951; Woodworth 1899)."
  },
  techniques: {
    title: 'Muster Merken Test – Visuelles Gedächtnis | SkillDrills',
    items: [
      {
        name: "Geometrisches Sub-Shape-Chunking (Baddeley & Cowan)",
        desc: "Das menschliche Arbeitsgedächtnis kann maximal 4 isolierte Punkte stabil halten. Erscheinen 5 oder mehr Wegpunkte, betrachte sie nicht als Punkte, sondern zerlege das Gesamtmuster in vertraute Formen wie Dreiecke, Zickzack-Linien oder Rechtecke.",
        tips: "Ein komplexer 7-Knoten-Pfad lässt sich mühelos in '1 Dreieck (3 Punkte) + 1 Z-Form (4 Punkte)' unterteilen, was die kognitive Last drastisch reduziert."
      },
      {
        name: "Mentale Voraktivierung des motorischen Feedforward-Programms (Lashley)",
        desc: "Karl Lashley wies nach, dass blitzschnelle Zeichenbewegungen nicht während des Ziehens erdacht werden können. Der Pfad muss vor Beginn der Bewegung als geschlossener Ablauf im motorischen Kortex bereitliegen.",
        tips: "Simuliere in den letzten 0,2 Sekunden der Aufblitzphase den gesamten Ziehweg mental im Kopf und führe die Bewegung nach dem Erlöschen in einem entschlossenen Zug aus."
      },
      {
        name: "Terminale Scheitelpunkt-Bremsung nach Woodworth (Vertex Deceleration)",
        desc: "Nutze auf geraden Teilstrecken maximale Beschleunigung, übe jedoch exakt beim Passieren der Wegpunkte leichten vertikalen Druck mit den Fingerkuppen auf das Mauspad aus, um Richtungswechsel scharfkantig zu ziehen.",
        tips: "Bei spitzen Winkeln stabilisiert das Absenken des Handballens die Gleitreibung und verhindert ungenaues Kurvenschneiden."
      },
      {
        name: "Zentroid-Fixierung für non-verbale ikonische Enkodierung (Iconic Anchoring)",
        desc: "In höheren Levels mit 0,6 Sekunden Anzeigedauer führt inneres Verbalisieren (z. B. 'oben, links, runter') zu zeitlichen Engpässen. Nutze die reine visuelle Netzhaut-Nachwirkung.",
        tips: "Verfolge die Punkte nicht einzeln mit den Augen, sondern fixiere den geometrischen Schwerpunkt (Zentroid) des Musters, um die Silhouette per peripherem Sehen simultan aufzunehmen."
      }
    ]
  },
  steps: [
    "Stelle deine gewohnte In-Game-Mausempfindlichkeit ein und nimm eine aufrechte Sitzhaltung ein.",
    "Beobachte nach dem Countdown den grün aufleuchtenden Pfad und strukturiere die Wegpunkte.",
    "Klicke nach dem Erlöschen auf den cyanfarbenen Startknoten und starte die Zugbewegung.",
    "Verbinde alle Wegpunkte in der korrekten Reihenfolge und lasse die Maustaste am Zielknoten los."
  ]
};

export default function ComplexPatternPageDe() {
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
      <ComplexPatternClient
        copy={{
          title: 'Muster Merken Test – Visuelles Gedächtnis | SkillDrills',
          subtitle: 'Muster Merken Test – Visuelles Gedächtnis | SkillDrills',
          rulesTitle: "Trainingsregeln & Punktesystem für das Muster-Merken-Spiel",
          rules: [
            { title: 'Muster Merken Test – Visuelles Gedächtnis | SkillDrills', text: "Präge dir den kurz aufblitzenden grünen Vektorpfad und alle Wegpunkte ein, bevor die Linie vom Bildschirm verschwindet." },
            { title: 'Muster Merken Test – Visuelles Gedächtnis | SkillDrills', text: "Klicke auf den cyanfarbenen Startknoten und ziehe den Cursor in exakter Reihenfolge durch alle Wegpunkte bis zum magentafarbenen Endknoten." },
            { title: 'Muster Merken Test – Visuelles Gedächtnis | SkillDrills', text: "Erreichst du die geforderte Pfadähnlichkeit, steigt dein Combo-Multiplikator auf bis zu 4,0x für massive Punktgewinne." },
            { title: 'Muster Merken Test – Visuelles Gedächtnis | SkillDrills', text: "Weichst du zu stark ab, wird der Multiplikator auf 1,0x zurückgesetzt, deine 45-sekündige Rundenzeit bleibt jedoch unberührt." }
          ],
          aboutTitle: "Über das Muster-Merken-Training",
          aboutHeading: "Visuell-räumliches Arbeitsgedächtnis und serielle Bewegungssyntax",
          aboutText: "Dieser Drill basiert auf Alan Baddeleys (1974) visuell-räumlichem Notizblock sowie Nelson Cowans (2001) Forschung zur 4-Elemente-Kapazitätsgrenze des menschlichen Arbeitsgedächtnisses. Durch das kurzzeitige Festhalten flüchtiger geometrischer Pfade und deren fehlerfreie Übertragung in kontinuierliche Mausbewegungen (Lashley 1951, Woodworth 1899) trainierst du die visuell-motorische Präzision für Gaming und kognitive Eignungstests."
        }}
      />
      <DrillGuide guide={patternGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="physical"
          currentHref="/drills/physical/coordination/complex-pattern"
          locale="de"
        />
      </div>
    </>
  );
}
