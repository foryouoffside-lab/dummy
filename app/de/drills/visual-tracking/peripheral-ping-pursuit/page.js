import PeripheralPingPursuitClient from '@/app/drills/visual-tracking/peripheral-ping-pursuit/PeripheralPingPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// GERMAN SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "peripheres sehen trainieren" (Train peripheral vision) / "peripheres blickfeld uebungen"
// Secondary:    "tunnelblick abbauen training", "gesichtsfeld erweitern uebungen", "augentraining peripheres sehen", "blickfeld vergroessern"
// LSI / Domain:  "verdeckte raumaufmerksamkeit", "foveale fixation", "nutzbares gesichtsfeld ufov",
//               "visuelle aufmerksamkeit verteilen", "reaktionszeit randbereich", "dual-task blicksteuerung"
// Authentic Domain Terms: Peripheres Sehen Trainieren, Verdeckte Raumaufmerksamkeit (Covert Spatial Attention), Foveale Fixation (Foveal Fixation), Nutzbarkeit des Gesichtsfelds (Useful Field of View / UFOV), Netzhaut-Stäbchen (Retinal Rods), Sakkadische Unterdrückung (Saccadic Suppression), Zoom-Lens-Modell
// ============================================================

export const metadata = {
  title: "Peripheres Sehen Training – Ping Pursuit | SkillDrills",
  description: "Kostenloses Peripheres Sehen Training: Verfolge das zentrale Ziel flüssig und erfasse periphere Lichtimpulse ohne Blicksprünge direkt online im Browser.",
  keywords: [
    "peripheres sehen trainieren",
    "peripheres blickfeld uebungen",
    "tunnelblick abbauen training",
    "gesichtsfeld erweitern uebungen",
    "augentraining peripheres sehen",
    "blickfeld vergroessern",
    "verdeckte raumaufmerksamkeit",
    "foveale fixation",
    "nutzbares gesichtsfeld ufov",
    "visuelle aufmerksamkeit verteilen",
    "reaktionszeit randbereich",
    "dual-task blicksteuerung"
  ],
  openGraph: {
    title: "Peripheres Sehen Training – Ping Pursuit | SkillDrills",
    description: "Trainiere dein peripheres Blickfeld und baue Tunnelblick ab. Wissenschaftliches Dual-Task-Augentraining ohne Installation.",
    type: "website",
    url: "https://skilldrills.online/de/drills/visual-tracking/peripheral-ping-pursuit",
    siteName: "SkillDrills",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peripheres Sehen Training – Ping Pursuit | SkillDrills",
    description: "Erweitere dein nutzbares Gesichtsfeld und trainiere verdeckte Aufmerksamkeit bei kontinuierlicher Blickverfolgung.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/de/drills/visual-tracking/peripheral-ping-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/peripheral-ping-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://skilldrills.online/de" },
    { "@type": "ListItem", "position": 2, "name": "Übungen", "item": "https://skilldrills.online/de/drills" },
    { "@type": "ListItem", "position": 3, "name": "Visuelles Tracking", "item": "https://skilldrills.online/de/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "Peripheres Sehen Training & Ping Pursuit", "item": "https://skilldrills.online/de/drills/visual-tracking/peripheral-ping-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Peripheres Sehen Training & Ping Pursuit",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Any (Web Browser)",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Wissenschaftlich fundiertes Online-Augentraining zur simultanen Schulung von fovealer Zielverfolgung und peripherer Lichtimpulserkennung zur Beseitigung von Tunnelblick.",
  "url": "https://skilldrills.online/de/drills/visual-tracking/peripheral-ping-pursuit",
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Peripherer Ping Tracker (SkillDrills Peripheral Ping Pursuit)",
  "url": "https://skilldrills.online/de/drills/visual-tracking/peripheral-ping-pursuit",
  "browserRequirements": "Requires HTML5 canvas and JavaScript ES6+",
  "applicationCategory": "SportsApplication"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Peripheres Sehen Ping Pursuit",
  "description": "Interaktives kognitives Sehtrainingstool für E-Sportler und Athleten zur Maximierung des nutzbaren Gesichtsfelds.",
  "genre": ["E-sports Trainer", "Vision Training", "Cognitive Drill"],
  "playMode": "SinglePlayer"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Anleitung zum Training des peripheren Sehens und simultaner Wahrnehmung",
  "description": "Praktischer Trainingsablauf zur Verankerung der fovealen Fixation bei gleichzeitiger verdeckter Aufmerksamkeitsverteilung auf Randreize.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Zentrales Ziel fixieren",
      "text": "Richte den Blick auf das sich sanft bewegende Hauptziel in der Bildschirmmitte und verfolge es mittels kontinuierlicher Blickfolge (Smooth Pursuit)."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Verdeckte Aufmerksamkeit aufspannen",
      "text": "Halte die Augen starr auf dem Hauptziel, weite jedoch deinen mentalen Wahrnehmungsfokus auf die gesamten Außenränder des Monitors aus."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Periphere Pings per Leertaste bestätigen",
      "text": "Sobald am äußeren Rand ein kurzer Lichtimpuls aufleuchtet, drücke blitzschnell die Leertaste – ohne die Augen dorthin zu bewegen."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Auswertung des nutzbaren Gesichtsfelds analysieren",
      "text": "Überprüfe nach Abschluss der Session Erkennungsrate, Latenzzeiten und Tracking-Präzision zur Überwachung des Lernfortschritts."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was versteht man unter peripherem Sehen und warum trainiert man es mit zentralem Fixpunkt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Das menschliche Sehsystem trennt die foveale Fovea centralis (hochauflösendes Scharfsehen im Zentrum) von der peripheren Netzhaut (starke Empfindlichkeit für Bewegung und Helligkeitswechsel). Das Training mit zentraler Fixation spiegelt reale Wettkampfsituationen wider: Im Shooter muss das Fadenkreuz auf der Deckungskante ruhen, während das periphere Sichtfeld gleichzeitig Flankenbewegungen und Minikarteninformationen erfassen muss."
      }
    },
    {
      "@type": "Question",
      "name": "Warum verliert man Punkte, wenn man mit den Augen direkt zum peripheren Ping springt (Sakkade)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wenn Sie die Augen direkt auf den Ping richten, nutzen Sie offene Aufmerksamkeit (Overt Attention) via Sakkaden. Ziel dieses Drills ist jedoch die Stärkung der verdeckten Raumaufmerksamkeit (Covert Spatial Attention). Jede Sakkade löst eine sakkadische Unterdrückung (Saccadic Suppression) von ca. 50 bis 100 ms aus, während der die visuelle Wahrnehmung kurzzeitig blockiert ist und das zentrale Ziel verloren geht."
      }
    },
    {
      "@type": "Question",
      "name": "Wie entsteht der sogenannte Tunnelblick und wie baut dieses Training ihn ab?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unter hohem Stress und kognitiver Überlastung zieht sich der Aufmerksamkeitsfokus gemäß dem Zoom-Lens-Modell von Eriksen reflexartig zusammen (Tunnelblick). Periphere Reize werden vom Gehirn herausgefiltert. Dieses Dual-Task-Training konditioniert das fronto-parietale Aufmerksamkeitsnetzwerk darauf, auch bei anspruchsvoller Verfolgungsarbeit ein weites Sichtfeld aktiv aufrechtzuerhalten."
      }
    },
    {
      "@type": "Question",
      "name": "Welchen spürbaren Vorteil bietet ein trainiertes peripheres Sichtfeld in E-Sports und Shootern?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Spieler mit geschultem peripherem Sehen erkennen gegnerische Pixel-Veränderungen, Rauchgrenzen und Fertigkeitseffekte am Bildschirmrand, ohne das Fadenkreuz zu verreißen. Das spart zwischen 100 und 200 Millisekunden entscheidender Reaktionszeit und ermöglicht blitzschnelle Richtungswechsel (Flicks)."
      }
    },
    {
      "@type": "Question",
      "name": "Worin liegt der Unterschied zwischen verdeckter (covert) und offener (overt) Aufmerksamkeit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Offene Aufmerksamkeit (Overt Attention) beschreibt die physische Ausrichtung der Sehachse auf ein Objekt. Verdeckte Aufmerksamkeit (Covert Attention, Posner 1980) bezeichnet die Fähigkeit des Gehirns, den mentalen Wahrnehmungsfokus auf einen Raumpunkt zu richten, ohne die Augen dorthin zu bewegen. Sie fungiert als Frühwarnsystem für das Sehsystem."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Rolle spielen Stäbchen und Zapfen der Netzhaut bei der peripheren Signalerkennung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Während die Zapfen in der Fovea für Farberkennung und Detailschärfe zuständig sind, dominieren in der peripheren Retina hochsensible Stäbchen und großzellige Ganglienzellen (magnozelluläres System). Sie reagieren extrem empfindlich auf kleinste Helligkeitsschwankungen und schnelle Bewegungen, eignen sich jedoch nicht zum Lesen von Text."
      }
    },
    {
      "@type": "Question",
      "name": "Wie oft und wie lange sollte das Training des peripheren Sehens durchgeführt werden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Da die Dual-Task-Verarbeitung das visuelle Arbeitsgedächtnis stark beansprucht, sind kurze Einheiten von 5 bis 10 Minuten 3- bis 5-mal pro Woche optimal. Bei einsetzender Augenmüdigkeit sollte eine Pause eingelegt werden, um kognitive Ermüdung und Sehstress zu vermeiden."
      }
    },
    {
      "@type": "Question",
      "name": "Haben Monitorgröße und Sitzabstand Einfluss auf den Trainingseffekt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Ein idealer Sehabstand beträgt ca. 50 bis 70 cm bei einem 24- bis 27-Zoll-Monitor, sodass der Bildschirm ca. 35 bis 45 Grad des horizontalen Gesichtsfelds abdeckt. Sitzt man zu weit entfernt, rücken die Randreize zu nahe an die Fovea heran, was den Trainingseffekt für das echte periphere Feld verringert."
      }
    },
    {
      "@type": "Question",
      "name": "Warum ist die Reaktionszeit bei peripheren Reizen anfangs oft spürbar verzögert?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Das Gehirn teilt seine Aufmerksamkeit auf zwei konkurrierende Aufgaben auf: die kontinuierliche Steuerung der Augenmuskeln für das Verfolgen und die ständige Überwachung des Randbereichs. Zu Beginn entsteht ein kognitiver Engpass (Bottleneck), der sich mit fortschreitender Automatisierung der Blickfolge auflöst."
      }
    },
    {
      "@type": "Question",
      "name": "Bringt das Training des peripheren Blicks auch Vorteile im Straßenverkehr und im Alltag?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unbedingt. Studien zum nutzbaren Gesichtsfeld (UFOV, Useful Field of View) belegen, dass Autofahrer mit geschultem peripherem Sehen herantretende Fußgänger und einscherende Fahrzeuge deutlich früher bemerken, was das Unfallrisiko um bis zu 50 % senkt."
      }
    }
  ]
};

const guideProps = {
  heading: "Wissenschaftliche Grundlagen des peripheren Sehens und Trainingsleitfaden",
  intro: [
    "Das menschliche visuelle System beruht auf einer neurofunktionellen Arbeitsteilung: Die Fovea centralis sorgt für hochauflösendes, farbgetreues Detailsehen im Zentrum (Parvozelluläres System), während die retinale Peripherie von Stäbchen und dem magnozellulären Pfad beherrscht wird, die auf Lichtdynamik und translatorische Bewegungsreize spezialisiert sind. Während klassische Tracking-Drills fast ausschließlich foveale Präzision fordern, trainiert die Übung 'Peripherer Ping' (Peripheral Ping Pursuit) gezielt die Verdeckte Raumaufmerksamkeit (Covert Spatial Attention) – das Erfassen von Umgebungsereignissen ohne fovealen Blickverlust.",
    "Der US-Kognitionspsychologe Michael Posner (1980) wies mit seinem Paradigma des räumlichen Hinweisreizes nach, dass Menschen ihren mentalen Aufmerksamkeitsscheinwerfer (Attentional Spotlight) vollkommen unabhängig von der Augenposition steuern können. Dieses Entkoppeln von Augenmuskelmotorik und kortikaler Aufmerksamkeit ist essenziell: Wer den Blick bei jedem Reiz saccadisch ablenkt, erleidet eine sakkadische Unterdrückung (Saccadic Suppression), während der für ca. 80 bis 120 Millisekunden kaum verwertbare visuelle Information verarbeitet werden kann.",
    "Unter realen Belastungsbedingungen im Wettkampf greift häufig das Zoom-Lens-Modell von Eriksen (1986): Steigt die kognitive Belastung oder das physiologische Erregungsniveau, engt das Gehirn das nutzbare Gesichtsfeld (Useful Field of View / UFOV) drastisch ein. Dieser klassische Tunnelblick führt dazu, dass herannahende Gefahren oder taktische Chancen am Rand schlichtweg nicht ins Bewusstsein gelangen. Dieser Drill durchbricht das Phänomen durch eine rigorose Dual-Task-Struktur (kontinuierliches Smooth Pursuit im Zentrum plus stochastische Impulserkennung in der Peripherie).",
    "Durch konsequentes Training erweitern Athleten und E-Sportler ihr effektives Überwachungsfeld. Das Resultat ist eine beschleunigte Reaktionskette auf periphere Bedrohungen, ein drastisch verbessertes Situationsbewusstsein (Situational Awareness) sowie der Erhalt maximaler Zielpräzision im Zentrum, ohne dass das Auge hektisch zwischen Informationsquellen hin- und herspringen muss."
  ],
  benchmarks: {
    title: "Standard-Benchmarks für Peripheres Gesichtsfeld & Reaktionslatenz (UFOV & Latenz)",
    headers: ["Leistungsstufe", "Nutzbares Gesichtsfeld (UFOV %)", "Periphere Ping-Reaktionszeit", "Tracking-Stabilität", "Kognitives Profil"],
    rows: [
      ["Elite", "Über 92%", "Unter 280 ms", "Über 95%", "Perfekte foveale Entkopplung & maximale periphere Sensitivität"],
      ["Meister", "85% – 92%", "280 ms – 340 ms", "90% – 95%", "Exzellente Aufmerksamkeitsverteilung & minimale Latenzen"],
      ["Diamant", "75% – 84%", "341 ms – 410 ms", "82% – 89%", "Solide Dual-Task-Leistung mit leichtem Tunnelblick bei Tempo"],
      ["Gold", "60% – 74%", "411 ms – 500 ms", "70% – 81%", "Verzögerte Reizweiterleitung & gelegentliche Blickabrisse"],
      ["Basis", "Unter 60%", "Über 500 ms", "Unter 70%", "Starker Tunnelblick & Dominanz offener Blickkorrekturen"]
    ],
    note: "※ Messwerte basieren auf standardisierten Tests bei 60 cm Sehabstand und 1080p-Bildschirmauflösung. Nur Messungen mit stabiler zentraler Verfolgung werden gewertet."
  },
  techniques: {
    title: "Vier Kernstrategien zur Erweiterung des peripheren Blickfelds",
    items: [
      {
        name: "Foveale Verankerungstechnik (Foveal Anchoring)",
        desc: "Diszipliniere deine Augenmuskeln darauf, strikt auf dem grünen Kern des Hauptziels zu verweilen. Sobald der Rand aufleuchtet, widerstehe dem Reflex, die Pupille dorthin zu bewegen. Jeder Blicksprung unterbricht die Kontinuität der Spurführung.",
        tips: "Stelle dir vor, deine Sehachse sei ein Magnet auf dem Ziel, während dein Bewusstsein wie ein weiter Nebel den gesamten Monitor umhüllt."
      },
      {
        name: "Radiäre Aufmerksamkeitsausbreitung (Covert Spread)",
        desc: "Öffne deinen mentalen Fokus kreisförmig vom Zentrum bis an die Gehäusekanten deines Bildschirms. Anstatt Details zu fokussieren, schalte auf 'Soft Focus' um, der primär auf Luminanzsprünge und Kontrastflimmern anspricht.",
        tips: "Versuche nicht zu erkennen, welche Farbe der Ping hat – drücke die Taste in dem Moment, in dem deine Netzhautrandbereiche 'Licht' melden."
      },
      {
        name: "Aktivierung des dorsalen Verarbeitungsstroms (Dorsal Stream Activation)",
        desc: "Das Sehsystem leitet Signale entweder über den ventralen Pfad ('Was ist es?') oder den dorsalen Pfad ('Wo ist es und bewegt es sich?'). Die periphere Signalerkennung profitiert vom dorsalen System: Verzichte auf Identifikation zugunsten reiner räumlicher Bewegungswahrnehmung.",
        tips: "Vermeide aktives Nachdenken. Lass den Reflex der Hand direkt durch den Helligkeitsimpuls triggern."
      },
      {
        name: "Parasympathische Atemregulierung (Anti-Tunnel-Breathing)",
        desc: "Hyperarousal und flache Atmung aktivieren den Sympathikus, was unmittelbar zur Verengung des Gesichtsfelds führt. Eine ruhige, tiefe Bauchatmung senkt den Puls und hält das Gesichtsfeld weit geöffnet.",
        tips: "Atme 4 Sekunden durch die Nase ein und 6 Sekunden ruhig aus, um Augeninnendruck und Nackenspannung zu minimieren."
      }
    ]
  },
  steps: [
    "Arbeitsplatz optimal einrichten: Positioniere dich in ca. 60 cm Entfernung mittig vor dem Bildschirm und stelle eine entspannte Sitzhaltung sicher.",
    "Zentrales Tracking starten: Klicke auf [Übung starten] und fixiere die sanft schwebende Kugel mit gleichmäßigen Augenbewegungen.",
    "Peripheren Wahrnehmungsraum aktivieren: Halte den Blick im Zentrum, richte deine Aufmerksamkeit jedoch auf das gesamte Displayfeld.",
    "Impulse verzögerungsfrei bestätigen: Sobald im Augenwinkel ein Lichtimpuls aufleuchtet, betätige ohne Blickwechsel sofort die [Leertaste].",
    "Auswertung analysieren: Überprüfe die Aufschlüsselung nach Quadranten (oben, unten, links, rechts), um persönliche tote Winkel und Reaktionsdefizite zu erkennen."
  ],
  audience: "FPS- und Battle-Royale-Spieler zur Minimap- und Flankenüberwachung, Ballsportler zur Raum- und Mitspielerwahrnehmung, Autofahrer zur Früherkennung von Kreuzungsgefahren.",
  faqs: faqSchema.mainEntity.map(q => ({
    q: q.name,
    a: q.acceptedAnswer.text
  })),
  sources: pickSources('posner1980', 'eriksen1986', 'wolfe1994', 'findlay1999', 'leigh2015', 'woods2015'),
  related: [
    { href: "/de/drills/visual-tracking/constant-slow-pursuit", label: "Konstantes langsames Blickfolgetraining (Constant Slow)" },
    { href: "/de/drills/visual-tracking/directional-chaos-pursuit", label: "Richtungs-Chaos Blickverfolgung (Directional Chaos)" },
    { href: "/de/drills/visual-tracking/dynamic-evasion-pursuit", label: "Dynamische Ausweich-Blickverfolgung (Dynamic Evasion)" },
    { href: "/de/drills/visual-tracking/ghosting-suppress-pursuit", label: "Nachbild-Unterdrückung Blickverfolgung (Ghosting Suppress)" },
    { href: "/de/drills/visual-tracking/infinity-pursuit", label: "Liegende Acht Augentraining (Infinity)" },
    { href: "/de/drills/visual-tracking/momentum-teleport-pursuit", label: "Momentum-Teleport Tracking (Momentum Teleport)" }
  ]
};

export default function DePeripheralPingPursuitPage() {
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

      <PeripheralPingPursuitClient
        copy={{
          title: "Peripheres Sehen Training: Peripherer Ping & Blickfeld-Erweiterung",
          subtitle: "Simultane foveale Verfolgung und periphere Lichtimpulserkennung zur Maximierung des nutzbaren Gesichtsfelds (UFOV)",
          description: "Kostenloses Online-Augentraining zur Erweiterung des peripheren Sehens. Verfolge das zentrale Ziel flüssig und erfasse periphere Lichtimpulse ohne Blicksprünge. Trainiert verdeckte Aufmerksamkeit (Covert Attention) und baut Tunnelblick unter kognitiver Last systematisch ab. Direkt im Browser ohne Registrierung."
        }}
      />

      <DrillGuide guide={guideProps} />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/de/drills/visual-tracking/peripheral-ping-pursuit" />
      </div>
    </>
  );
}
