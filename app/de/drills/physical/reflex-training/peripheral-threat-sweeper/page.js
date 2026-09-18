import PeripheralThreatSweeperClient from '@/app/drills/physical/reflex-training/peripheral-threat-sweeper/PeripheralThreatSweeperClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Germany (DE / DE)
// Primary Intent: peripheres sehen trainieren, peripheres sehen test, blickfeld erweitern
// German Context: Tunnelblick verhindern in FPS (CS2, Valorant) & Gesichtsfeld/UFOV-Erweiterung für Athleten
// High-Demand, Low-Competition Target Keywords:
//   - "peripheres sehen trainieren" (Top high-demand athletic & vision training query)
//   - "peripheres sehen test" (Core visual field test query)
//   - "blickfeld erweitern übungen" (Visual field expansion exercises query)
//   - "reaktionsschnelligkeit trainieren" (Athletic reaction speed query)
//   - "ufov test online" (Useful Field of View cognitive/clinical query)
//   - "augentraining online kostenlos" (Free online visual exercise query)
//   - "tunnelblick vermeiden" (Tunnel vision prevention under stress query)
//   - "periphere wahrnehmung verbessern" (Improving peripheral perception query)
//   - "hand-auge-koordination trainieren" (Hand-eye coordination query)
//   - "visuelle reaktionszeit test" (Visual reaction time test query)
// ============================================================

export const metadata = {
  title: "Peripheres Sehen Trainieren & Test | SkillDrills",
  description: "Kostenloser Online-Test für peripheres Sehen. Wehre 360°-Bedrohungen aus dem Augenwinkel ab und erweitere dein Blickfeld (UFOV) direkt im Browser.",
  keywords: [
    "peripheres sehen trainieren",
    "peripheres sehen test",
    "blickfeld erweitern übungen",
    "reaktionsschnelligkeit trainieren",
    "ufov test online",
    "augentraining online kostenlos",
    "tunnelblick vermeiden",
    "periphere wahrnehmung verbessern",
    "hand auge koordination trainieren",
    "visuelle reaktionszeit test"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/physical/reflex-training/peripheral-threat-sweeper',
    languages: getAlternateLanguages('/drills/physical/reflex-training/peripheral-threat-sweeper'),
  },
  openGraph: {
    title: "Peripheres Sehen Trainieren & Test | SkillDrills",
    description: "Kostenloser Online-Test für peripheres Sehen. Wehre 360°-Bedrohungen aus dem Augenwinkel ab und erweitere dein Blickfeld (UFOV) direkt im Browser.",
    url: 'https://skilldrills.online/de/drills/physical/reflex-training/peripheral-threat-sweeper',
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Peripheres Sehen Trainieren & Test | SkillDrills",
    description: "Kostenloser Online-Test für peripheres Sehen. Wehre 360°-Bedrohungen aus dem Augenwinkel ab und erweitere dein Blickfeld (UFOV) direkt im Browser.",
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
      "name": "Reflextraining & Reaktionszeit",
      "item": "https://skilldrills.online/de/drills/physical/reflex-training"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Peripheres Sehen & Bedrohungsabwehr",
      "item": "https://skilldrills.online/de/drills/physical/reflex-training/peripheral-threat-sweeper"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Peripheres Sehtraining & Bedrohungsabwehr-Trainer",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Wissenschaftlich fundiertes visuo-motorisches Trainingsprogramm zur Erweiterung des nutzbaren Sehfelds (UFOV), verdeckten Raumaufmerksamkeit (Posner) und Beseitigung von Tunnelblick."
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Online-Trainer für peripheres Sehen (Peripheral Threat Sweeper)",
  "url": "https://skilldrills.online/de/drills/physical/reflex-training/peripheral-threat-sweeper",
  "description": "Kostenloses Online-Tool zur Messung und Schulung des peripheren Gesichtsfelds. Schützen Sie den Schildkern vor 360°-Bedrohungen aus den Augenwinkeln.",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Periphere Bedrohungsabwehr (Peripheral Threat Sweeper)",
  "url": "https://skilldrills.online/de/drills/physical/reflex-training/peripheral-threat-sweeper",
  "description": "High-Speed-Reflexspiel: Verteidigen Sie den Kern vor radial konvergierenden Bedrohungen durch blitzschnelle Reaktionen aus dem Augenwinkel.",
  "genre": ["Action", "Sports Game", "Reflex Game", "Visual Training"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was versteht man unter dem Training des peripheren Sehens und wie unterscheidet es sich vom zentralen Sehen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Während die zentrale Sehschärfe (foveales Sehen) im Zentrum von 1–2 Grad Details, Farben und Schriftzeichen analysiert, trainiert das periphere Sehtraining die Stäbchenzellen der Netzhautperipherie. Es schult das Gehirn darin, Reize, schnelle Bewegungen und herannahende Gefahren im Augenwinkel zu erfassen, ohne die Blickachse zu verändern (Erweiterung des Useful Field of View, UFOV)."
      }
    },
    {
      "@type": "Question",
      "name": "Wie funktioniert der Peripheral Threat Sweeper (Periphere Bedrohungsabwehr) genau?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der Anwender fixiert ununterbrochen den zentralen Schildkern in der Bildschirmmitte. Am 360-Grad-Außenrand spawnen Bedrohungsknoten in variierenden Winkeln und bewegen sich nach innen. Der Nutzer muss diese Angreifer aus dem peripheren Blickfeld registrieren und per präzisem Maus-Flick neutralisieren, bevor sie den Kern berühren."
      }
    },
    {
      "@type": "Question",
      "name": "Worin liegt der neurobiologische Unterschied zwischen verdeckter Aufmerksamkeit (Covert Orienting) und Blickbewegungen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wie der Kognitionswissenschaftler Michael Posner (1980) nachwies, erfordern offene Augenbewegungen (Sakkaden) eine physische Rotation des Augapfels mit einer Latenz von mindestens 200 ms. Verdeckte Raumaufmerksamkeit (Covert Orienting) hingegen verschiebt den mentalen Aufmerksamkeitsfokus im Gehirn bei starrer Blickfixierung in etwa 100 ms – was eine Verdopplung der visuellen Reaktionsgeschwindigkeit ermöglicht."
      }
    },
    {
      "@type": "Question",
      "name": "Warum ist peripheres Sehen in kompetitiven FPS-Spielen (CS2, Valorant, Apex) und im Sport entscheidend?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In Shootern muss das Fadenkreuz auf wahrscheinliche Eingangswinkel gerichtet bleiben, während Minimap, Cooldowns und Flankenangriffe simultan im Augenwinkel überwacht werden. Ein unzureichendes peripheres Sehfeld führt unter Stress zu fatalem 'Tunnelblick', wodurch Gegner aus seitlichen Winkeln zu spät bemerkt werden."
      }
    },
    {
      "@type": "Question",
      "name": "Welche unterschiedlichen Verhaltensmuster und Geschwindigkeiten weisen die eindringenden Bedrohungsknoten auf?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Es gibt drei Bedrohungsklassen: Standard-Knoten (bewegen sich linear mit Basisgeschwindigkeit), Schnelle Knoten (1,6-fache Geschwindigkeit für abrupte Reflexprüfungen) und Ausweichende Knoten (Evasive), die auf oszillierenden Schlangenlinien einschwenken und die räumliche Trajektorienvorhersage fordern."
      }
    },
    {
      "@type": "Question",
      "name": "Wie steigert sich der Schwierigkeitsgrad hinsichtlich Knoten-Geschwindigkeit und Spawn-Intervallen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mit steigendem Punktestand skaliert das Level stufenlos von Lv. 1 bis über Lv. 15. Die Geschwindigkeit der Knoten beschleunigt von 80 px/s auf bis zu 520 px/s, während die Spawn-Intervalle von 1,4 s auf atemberaubende 0,20 s schrumpfen – was die kognitive Belastungsgrenze der Multi-Target-Verarbeitung testet."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Konsequenzen hat ein Kern-Durchbruch (Core Breach) für den Score und die verbleibende Zeit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dringt ein Knoten ungehindert bis in den Kern vor, blitzt der Bildschirm rot auf und die aktive Combo-Serie fällt schlagartig auf 1,0x zurück. Ist in den Einstellungen die 'Zeitstrafe' aktiviert, werden zusätzlich 0,8 Sekunden Restzeit abgezogen, was das Überleben der Runde massiv erschwert."
      }
    },
    {
      "@type": "Question",
      "name": "Wie funktioniert die Zeitverlängerung von +0,6 Sekunden pro erfolgreichem Treffer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Jede erfolgreiche Neutralisierung bringt neben den Basispunkten (+100 Pkt. × Combo-Multiplikator) eine Verlängerung der Rundenzeit um 0,6 Sekunden ein. Konstante Treffer ohne Fehlschüsse erlauben es Spitzenathleten, die 30-Sekunden-Basisgrenze weit zu überschreiten und riesige Punktzahlen anzuhäufen."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Kriterien müssen für die Elite-Kategorie Tier 1 (Apex Peripheral Guardian, Note S) erfüllt werden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Für Tier 1 (Note S) sind mindestens 24.000 Punkte, eine Trefferquote von 90 % oder höher sowie das erfolgreiche Abfangen von Geschwindigkeiten über 450 px/s erforderlich. Fortgeschrittene Spieler bewegen sich typischerweise im Bereich von Tier 3 (11.000 bis 16.999 Punkte)."
      }
    },
    {
      "@type": "Question",
      "name": "Welcher Monitorabstand und welche Mauseinstellungen sind für das periphere Sehtraining optimal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein Betrachtungsabstand von 50–70 cm sorgt dafür, dass die Monitorränder ein Gesichtsfeld von 40–50 Grad abdecken. Ein 144Hz+ Display sowie eine optische Maus mit 1000Hz Polling-Rate reduzieren Latenz und Bildruckeln auf unter 4 ms (Woods et al., 2015), was für saubere Reizwahrnehmung essenziell ist."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Anleitung zur peripheren Bedrohungsabwehr in 4 Schritten",
  "description": "Wissenschaftlich fundierte 4-Stufen-Methode zur Verankerung des Blicks, Schärfung des Augenwinkels und radialen Treffsicherheit.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Blickanker im Zentrum fixieren (Central Anchor)",
      "text": "Richten Sie den Blick unerschütterlich auf den zentralen Schildkern. Vermeiden Sie den Impuls, auftauchende Reize direkt mit den Augen anzuschauen.",
      "url": "https://skilldrills.online/de/drills/physical/reflex-training/peripheral-threat-sweeper#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Periphere Reizerfassung am Bildschirmrand (Parafoveal Detection)",
      "text": "Nutzen Sie die hohe Bewegungssensitivität der Netzhautstäbchen, um kontrastreiche rote und orangefarbene Knoten am Bildrand intuitiv wahrzunehmen.",
      "url": "https://skilldrills.online/de/drills/physical/reflex-training/peripheral-threat-sweeper#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Ballistischer Radial-Flick zur Zielneutralisierung (Radial Flick)",
      "text": "Führen Sie eine blitzschnelle Handgelenksbewegung zum Ziel aus und klicken Sie, bevor der Knoten den Kern erreicht (+0,6s Zeitgutschrift).",
      "url": "https://skilldrills.online/de/drills/physical/reflex-training/peripheral-threat-sweeper#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Sofortige Rückkehr ins Zentrum & Combo-Pflege (Recentering)",
      "text": "Führen Sie den Cursor nach jedem Treffer augenblicklich in die Mitte zurück, um das 360°-Blickfeld für die nächste Bedrohung schussbereit zu halten.",
      "url": "https://skilldrills.online/de/drills/physical/reflex-training/peripheral-threat-sweeper#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('posner1980', 'treisman1980', 'woodworth1899', 'fitts1954', 'woods2015'),
  intro: {
    title: "Messprinzipien des peripheren Sehens und des nutzbaren Sehfelds (UFOV)",
    paragraphs: [
      "Im menschlichen Sehsystem umfasst die Fovea centralis – der Bereich schärfsten Sehens – lediglich 1 bis 2 Grad des gesamten Gesichtsfelds. Nur dort können feine Details und Farbnuancen in Reinform aufgelöst werden. Die umgebende Netzhautperipherie verliert zwar drastisch an statischer Auflösung, besitzt jedoch eine immense Dichte an licht- und bewegungsempfindlichen Stäbchenzellen. Diese Übung quantifiziert und schult die Fähigkeit, kognitive Aufmerksamkeitsressourcen ohne Blickrichtungsänderung in den Augenwinkel zu verlagern – die sogenannte 'verdeckte Raumaufmerksamkeit' (Covert Spatial Orienting, Posner 1980).",
      "Jeder Abfangvorgang in diesem Trainingssystem unterliegt den Gesetzen von Fitts's Law (1954) und Woodworths (1899) Zweiphasen-Modell der Motorik. Die Bewegungszeit wächst logarithmisch mit dem Verhältnis aus Distanz zum Ziel und Zielgröße. Bei der Abwehr radial heranschießender Knoten überbrückt die Hand in einer offenen, ungebremsten ballistischen Phase über 85 % der Strecke, bevor kurz vor dem Klick eine mikrofeine optische Endbremsung greift.",
      "Untersuchungen von Karlene Ball et al. (1988) belegen, dass unter extremer Stress- und Reizbelastung der funktionelle Wahrnehmungsradius des Menschen kollabieren kann – ein Phänomen, das als 'Tunnelblick' bekannt ist. Das vorliegende Drill-System startet mit entspannten 1,4-Sekunden-Intervallen und beschleunigt progressiv auf eine Kadenz von 0,20 Sekunden bei Vektorgeschwindigkeiten von 520 px/s. Dieser Stimulus zwingt den Parietallappen, das Useful Field of View (UFOV) dauerhaft zu erweitern, um selbst in chaotischen Situationen periphere Gefahren unverzüglich zu verarbeiten.",
      "Messgenauigkeit und Hardware-Grenzen: Reaktionszeiten und Trefferpräzision werden im Browser über die performance.now()-Schnittstelle im Millisekundentakt erfasst. Aufgrund von Sicherheitsvorgaben (Spectre-Schutz) ist die Uhrenauflösung auf ca. 1 ms gerundet. Zudem quantisiert das Display jedes visuelle Ereignis gemäß seiner Bildwiederholrate – ca. 16,7 ms bei 60 Hz, 6,9 ms bei 144 Hz und 4,1 ms bei 240 Hz (Woods et al., 2015). Standardmäuse fügen bei 125 Hz ca. 8 ms Latenz hinzu, moderne 1000Hz-Gamingmäuse unter 1 ms. Abweichungen unter 5 ms sollten daher als gerätespezifisches Rauschen gewertet werden; vergleichen Sie eigene Serien stets auf identischer Hardware. SkillDrills speichert alle Leistungsdaten ausschließlich lokal in Ihrem Browser und übermittelt keine Telemetrie an Dritte."
    ]
  },
  benchmarks: {
    title: "Offizielle Benchmarks für peripheres Reaktionsvermögen & Bedrohungsabwehr",
    headers: ['Stufe (Tier)', 'Rang & Klassifikation', 'Zielpunktzahl', 'Präzision & Geschwindigkeit', 'Note', 'Leistungsniveau'],
    rows: [
      ['Tier 1', 'Erhabener Wächter des Blickfelds (Apex Peripheral Guardian)', '24.000+ Pkt.', '90%+ Treffer / 450+ px/s', 'Note S', 'Top 1% (Phänomenales UFOV)'],
      ['Tier 2', 'Präzisions-Radialabfangjäger (Precision Radial Sweeper)', '17.000 – 23.999 Pkt.', '82–89% Treffer / 350–449 px/s', 'Note A', 'Top 10% (Turnier-Niveau)'],
      ['Tier 3', 'Erfahrener Feldverteidiger (Skilled Field Defender)', '11.000 – 16.999 Pkt.', '74–81% Treffer / 250–349 px/s', 'Note B', 'Top 30% (Stabile Wahrnehmung)'],
      ['Tier 4', 'Fortschreitender Raumverfolger (Developing Parafoveal Tracker)', '6.000 – 10.999 Pkt.', '65–73% Treffer / 160–249 px/s', 'Note C', 'Durchschnitt (Reguläre Spieler)'],
      ['Tier 5', 'Tunnelblick-Gefährdeter Einsteiger (Novice Tunnel Vision Vulnerable)', '< 6.000 Pkt.', '< 65% Treffer / < 160 px/s', 'Note D', 'Basis (UFOV-Ausbau empfohlen)'],
    ],
    note: "Die Einstufung berücksichtigt Gesamtpunkte, Anzahl der Kern-Durchbrüche, höchste überlebte Knotengeschwindigkeit und maximale Combo-Länge.",
  },
  protocols: {
    title: "4-Stufen-Protokoll zur Maximierung des peripheren Sehvermögens",
    description: "Systematisches Konditionierungsprogramm zur Verankerung des Blicks, Schärfung des Augenwinkels und blitzschnellen Multi-Target-Koordination.",
    items: [
      {
        title: "Protokoll 1: Posner-Konditionierung zur verdeckten Aufmerksamkeitslenkung",
        description: "Blick starr auf den Kern heften und das unwillkürliche Verfolgen auftauchender Reize mit den Augen unterdrücken. Sakkadische Latenzen werden eliminiert, indem der mentale Fokus flexibel in alle vier Quadranten projiziert wird (Posner 1980)."
      },
      {
        title: "Protokoll 2: Treisman-Parallelerfassung & Saliency-Erkennung",
        description: "Schulung der retinalen Merkmalskarten, um kontraststarke rote und orangefarbene Knoten am äußersten Rand ohne sequenzielle Suchbewegungen sofort als Pop-out-Signal zu verarbeiten (Treisman & Gelade 1980)."
      },
      {
        title: "Protokoll 3: Woodworth-Ballistischer Radial-Snap mit Endverzögerung",
        description: "Sobald ein Vektor erfasst wird, schnellt der Cursor durch neuromuskuläre Aktivierung von Handgelenk und Unterarm zum Zielort, gefolgt von einer minimalen Bremsung vor dem Klick (Woodworth 1899)."
      },
      {
        title: "Protokoll 4: UFOV-Hochdichte-Erweiterung & Prioritätenanalyse",
        description: "In hohen Leveln mit 0,20s-Spawn-Frequenz die verbleibende Distanz mehrfacher Knoten simultan berechnen und nach unmittelbarer Bedrohung abarbeiten (Woods et al. 2015)."
      }
    ]
  },
  faqs: {
    title: "Häufig gestellte Fragen (FAQ) zu peripherem Sehen & Bedrohungsabwehr",
    items: faqSchema.mainEntity.map(q => ({
      q: q.name,
      a: q.acceptedAnswer.text
    }))
  }
};

export default function PeripheralThreatSweeperDePage() {
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
      <PeripheralThreatSweeperClient
        copy={{
          title: "Peripheres Sehtraining & Bedrohungsabwehr",
          subtitle: "Blickfeld-Verteidigung & Reaktionsschnelligkeit • 15 Level kontinuierliche Skalierung",
          hudLabels: {
            score: "Punkte",
            time: "Restzeit",
            bestScore: "Bestwert",
            bestCombo: "Max Combo",
            accuracy: "Präzision",
            sweeps: "Treffer",
            breaches: "Durchbrüche",
            peakLevel: "Level",
            getReady: "BEREIT"
          },
          rulesTitle: "Ablauf, Regeln und Punktesystem",
          rulesItems: [
            { title: "Bedrohungsabwehr & Zeitgutschrift", text: "Klicken Sie herannahende Knoten am Rand an: +100 Punkte (skaliert mit Multiplikator) und +0,6s Zeitverlängerung." },
            { title: "Combo-Multiplikator", text: "Treffen Sie kontinuierlich ohne Fehlschlag, um den Multiplikator stufenweise auf bis zu 3,0x zu steigern." },
            { title: "Dynamische Schwierigkeit", text: "Mit steigender Punktzahl beschleunigen die Knoten (bis 520 px/s) und die Spawn-Intervalle schrumpfen auf bis zu 0,20s." },
            { title: "Kern-Durchbruch & Fehlklicks", text: "Erreicht ein Knoten den Schildkern oder klicken Sie ins Leere, wird die Combo auf 1,0x zurückgesetzt (-0,8s bei Strafe)." }
          ],
          aboutTitle: "Biomechanik des peripheren Sehens und der Reaktionsmotorik",
          aboutSections: [
            {
              title: "Verdeckte Aufmerksamkeit & Peripheres Scanning",
              subtitle: "Posner (1980) Raumaufmerksamkeit ohne Sakkaden",
              content: "Der Blick bleibt auf dem zentralen Kern verankert, während die geistige Aufmerksamkeit 360 Grad im Raum verteilt wird. Dies eliminiert träge Augenbewegungen und halbiert die Reaktionszeit."
            },
            {
              title: "Parallele Merkmalsintegration & Saliency-Erkennung",
              subtitle: "Treisman (1980) Retina-Pop-out bei hohem Kontrast",
              content: "Eindringende rote und orangefarbene Knoten stimulieren die Bewegungssensoren der Netzhautperipherie unmittelbar, sodass der Abfangvektor ohne sequenzielle Suche sofort berechnet wird."
            },
            {
              title: "Woodworth-Zweiphasen-Motorik & Kernschutz",
              subtitle: "Woodworth (1899) & Fitts (1954) Ballistischer Stoß und Endbremsung",
              content: "Über 85 % der Distanz werden durch einen schnellen Handgelenks-Flick im offenen Regelkreis überwunden, gefolgt von einer blitzartigen optischen Korrektur direkt auf den Knoten."
            },
            {
              title: "UFOV-Erweiterung & Beseitigung von Tunnelblick",
              subtitle: "Ball et al. (1988) Kognitive Kapazitätserweiterung unter Hochlast",
              content: "Durch dichte Spawn-Kadenzen und hohe Geschwindigkeiten wird der nutzbare Sehbereich erweitert, sodass Sie auch in hektischen Spiel- und Sportszenarien nicht mehr in Tunnelblick verfallen."
            }
          ]
        }}
      />
      <DrillGuide {...guideProps} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/reflex-training/peripheral-threat-sweeper" />
    </>
  );
}
