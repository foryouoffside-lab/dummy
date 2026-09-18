import TargetAcquisitionClient from '@/app/drills/fps/target-acquisition/TargetAcquisitionClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

// ============================================================
// GERMAN SEARCH KEYWORD RESEARCH & INTENT CLUSTERING (DACH)
// Primary queries: "Zielerfassung FPS Training" (Natural domestic query for target acquisition)
//                  "Target Acquisition Aiming" (Established technical shooter search term in DACH)
// Secondary:       "Erster Schuss Genauigkeit", "Gegner schneller erkennen FPS",
//                  "Visuelle Zielerkennung Shooter", "First Shot Precision CS2",
//                  "Valorant Gegner Erfassen", "Maus Zielerfassung Übung",
//                  "Target Selection Aim Training", "Schnelles Anvisieren FPS"
// Domain / LSI:    "Merkmals-Integrations-Theorie" (Treisman & Gelade 1980), "Guided Search Modell" (Wolfe 2007),
//                  "Fitts Gesetz" (Fitts 1954), "Submovement-Theorie" (Meyer et al. 1988),
//                  "Pop-Out-Effekt", "Foveale Fixation", "Peripheres Scanning", "Kontrastunterscheidung"
// Authentic Domain Terms: Zielerfassung, Target Acquisition, Erster Schuss, Kontrast-Erkennung,
//                         Visuelles Scanning, Foveale Fixierung
// ============================================================

export const metadata = {
  title: "Zielerfassung FPS Training – First Shot Aim | SkillDrills",
  description: "Kostenloses Zielerfassungs-Training im Browser: Trainiere visuelle Zielerkennung, Kontrastunterscheidung und präzise erste Schüsse für CS2 und Valorant.",
  keywords: [
    "Zielerfassung FPS Training",
    "Target Acquisition Aiming",
    "Erster Schuss Genauigkeit",
    "Gegner schneller erkennen FPS",
    "Visuelle Zielerkennung Shooter",
    "Erster Schuss Präzision CS2",
    "Valorant Gegner Erfassen",
    "Maus Zielerfassung Übung",
    "Target Selection Aim Training",
    "Schnelles Anvisieren FPS",
    "Erster Treffer Aim Training",
    "Gegner Identifikation Shooter"
  ],
  alternates: {
    canonical: "https://skilldrills.online/de/drills/fps/target-acquisition",
    languages: getAlternateLanguages('/drills/fps/target-acquisition'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Zielerfassung FPS Training – First Shot Aim | SkillDrills",
    description: "Kostenloses Zielerfassungs-Training im Browser: Trainiere visuelle Zielerkennung, Kontrastunterscheidung und präzise erste Schüsse für CS2 und Valorant.",
    url: "https://skilldrills.online/de/drills/fps/target-acquisition",
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Zielerfassung FPS Training – First Shot Aim | SkillDrills",
    description: "Kostenloses Zielerfassungs-Training im Browser: Trainiere visuelle Zielerkennung, Kontrastunterscheidung und präzise erste Schüsse für CS2 und Valorant.",
  },
};

export default function TargetAcquisitionDePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/de" },
      { "@type": "ListItem", "position": 2, "name": "FPS Aim Training", "item": "https://skilldrills.online/de/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Zielerfassung FPS", "item": "https://skilldrills.online/de/drills/fps/target-acquisition" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Zielerfassung FPS Training – First Shot Aim",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Zielerfassungs-Trainer",
    "url": "https://skilldrills.online/de/drills/fps/target-acquisition",
    "applicationCategory": "Trainer",
    "browserRequirements": "Requires Pointer Lock API, modern web browser, 60Hz+ monitor recommended"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Zielerfassungs-Trainer",
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-15",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Was bedeutet Zielerfassung (Target Acquisition) in taktischen Ego-Shootern?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Zielerfassung ist der kognitive und motorische Prozess, bei dem ein Spieler ein feindliches Ziel inmitten visueller Hintergrundreize blitzschnell identifiziert, das Fadenkreuz darauf ausrichtet und den ersten Schuss präzise platziert."
        }
      },
      {
        "@type": "Question",
        "name": "Wie unterscheidet sich Zielerfassung von reiner Reaktionszeit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Reine Reaktionszeit misst nur die Latenz auf einen simplen, erwarteten Reiz an bekannter Position. Zielerfassung erfordert zusätzlich visuelle Suche, räumliche Selektion, Kontrastunterscheidung und eine ballistische Zielbewegung unter Zeitdruck."
        }
      },
      {
        "@type": "Question",
        "name": "Was besagt die Merkmals-Integrations-Theorie (Treisman & Gelade) über das Erkennen von Zielen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Basale Merkmale wie Helligkeit, Farbe und Silhouette werden im menschlichen Sehsystem zunächst unbewusst und parallel verarbeitet (Pre-Attentive Phase). Erst im zweiten Schritt bündelt fokussierte Aufmerksamkeit diese Merkmale zu einem identifizierten Zielobjekt."
        }
      },
      {
        "@type": "Question",
        "name": "Warum können Profi-Spieler Ziele so viel schneller erkennen und anvisieren?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Profis nutzen das Guided Search Modell (Wolfe, 2007) und periphere Kontrastwahrnehmung: Sie scannen den Bildschirm nicht zeilenweise ab, sondern koppeln Sakkaden unmittelbar an die auffälligsten Bedrohungsmerkmale und vollziehen den Flick synchron."
        }
      },
      {
        "@type": "Question",
        "name": "Warum entscheidet der erste Schuss (First Shot Accuracy) in CS2 und Valorant über den Duellsieg?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bei extrem niedriger Time-to-Kill (TTK) führt ein Kopfschuss mit dem ersten Projektil zum sofortigen Rundengewinn. Verfehlt der erste Schuss, zwingt der einsetzende Waffenrückstoß zu ungenauem Dauerfeuer und erhöht das Risiko, selbst eliminiert zu werden."
        }
      },
      {
        "@type": "Question",
        "name": "Sollte man beim Suchen von Gegnern den Blick starr zentrieren oder die Augen bewegen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ideal ist ein entspannter Soft Focus: Das Sehzentrum bleibt auf der vermuteten Vorhaltelinie (Crosshair Placement), während das periphere Sehen weite Winkel überwacht. Sobald ein Reiz auftritt, führt eine gezielte Sakkade das Fadenkreuz direkt heran."
        }
      },
      {
        "@type": "Question",
        "name": "Wie beeinflusst visuelle Unruhe (Visual Clutter) die Zielerfassungszeit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Partikeleffekte, Rauch und komplexe Texturen stören den automatischen Pop-Out-Effekt. Das Gehirn wird gezwungen, von paralleler Reizverarbeitung auf zeitraubende serielle Suche umzuschalten, was 100 bis 200 ms Verzögerung verursacht."
        }
      },
      {
        "@type": "Question",
        "name": "Welcher Mausgriff eignet sich am besten für schnelle Zielerfassung?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Claw-Grip und Fingertip-Grip bieten optimale Hebelverhältnisse: Der Unterarm liefert die Kraft für weite Flicks, während die Fingergelenke im Moment der Zielankunft sofortige Mikrokontrolle garantieren."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Rolle spielen Monitor-Kontrast und Black-Equalizer-Einstellungen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ein sauber eingestellter Gamma- und Kontrastwert sowie Gaming-Features wie Black eQualizer heben dunkle Spielermodelle vor schattigen Hintergründen hervor und verkürzen die biologische Erkennungslatenz signifikant."
        }
      },
      {
        "@type": "Question",
        "name": "Warum führt ein Klick auf das falsche Ziel in diesem Trainer zum Combo-Verlust?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Der Trainer belohnt Zielpriorisierung: Das Ziel mit der höchsten Helligkeit symbolisiert die unmittelbare Bedrohung. Unkontrolliertes Klicken ohne visuelle Differenzierung wird konsequent sanktioniert."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Zielerfassung & First-Shot-Präzision in 4 Schritten trainieren",
    "description": "Systematische Anleitung zur Steigerung von Zielidentifikations-Geschwindigkeit und Erstschuss-Präzision.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Mausempfindlichkeit kalibrieren & Pointer Lock aktivieren",
        "text": "Klicke ins Spielfeld, um die Pointer-Lock-API zu starten. Halte deine gewohnte Ingame-Sensibilität für konsistentes Muskellernen."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Zentralen Soft Focus einnehmen",
        "text": "Halte die Augen entspannt auf die Bildmitte gerichtet und nimm neu erscheinende Zielgruppen über dein peripheres Gesichtsfeld wahr."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Hellstes Ziel blitzschnell identifizieren",
        "text": "Filtere visuelle Störfaktoren heraus und erfasse das Ziel mit der höchsten Deckkraft (höchste Bedrohungspriorität) in Sekundenbruchteilen."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Präziser Flick und Schussabgabe",
        "text": "Bewege das Fadenkreuz in einer sauberen Linie auf das Zielzentrum, stoppe über Handballenreibung ab und löse sauber aus."
      }
    ]
  };

  const targetAcquisitionGuideDe = {
    heading: "Zielerfassung FPS Training – Wissenschaftlicher Leitfaden",
    subtitle: "Visuelle Erkennungsgeschwindigkeit, Kontrastdiskriminierung und fehlerfreie Erstschuss-Präzision für CS2 und Valorant",
    intro: [
      "Zielerfassung (Target Acquisition) ist die übergeordnete Fähigkeit, in einem optisch komplexen virtuellen Raum innerhalb von Millisekunden den Gegner zu lokalisieren, ihn von Umgebungsstrukturen zu unterscheiden und die Waffe mit dem ersten Schuss punktgenau auf die Hitbox zu bringen. Nach der Merkmals-Integrations-Theorie von Anne Treisman und Garry Gelade (1980) werden grundlegende optische Reize wie Helligkeit, Farbe und Kantenorientierung im menschlichen Sehsystem zunächst vorattentiv und parallel über das gesamte Sehfeld verarbeitet.",
      "Das Guided Search Modell von Jeremy M. Wolfe (1994, 2007) beschreibt, wie das Gehirn sensorische Auffälligkeit (Bottom-Up-Signale) mit taktischer Vorerwartung (Top-Down-Fokus) verknüpft. Werden Zielkontraste trainiert, lernt der visuelle Kortex, irrelevante Hintergrunddetails auszublenden. Dadurch wird die Latenz zwischen dem ersten visuellen Reizkontakt und dem Beginn der motorischen Zielbewegung drastisch minimiert.",
      "Die anschließende Zeigerbewegung folgt den biomechanischen Gesetzmäßigkeiten von Fitts' Gesetz (Fitts, 1954) und der stochastischen Submovement-Theorie von David E. Meyer et al. (1988): Nach einem initialen schnellen Flick bringt eine feinmotorische Endphasen-Bremsung das Fadenkreuz auf den Kopf des Ziels. In Shootern mit minimaler Time-to-Kill entscheidet dieser Erstkontakt unmittelbar über das Duell.",
      "Messpräzision & Hardware-Transparenz: Alle Erfassungs- und Klicklatenzen werden über performance.now() im Mikrosekundenbereich gemessen (Woods et al., 2015). Bei 144-Hz- und 240-Hz-Monitoren sinkt das framebedingte Anzeigefenster auf 6,9 ms bzw. 4,1 ms. Kleinste Latenzabweichungen unter 5 ms spiegeln Hardware-Aktualisierungszyklen wider."
    ],
    benchmarks: {
      title: "Zielerfassungs-Latenz & Erstschuss-Benchmarks (Millisekunden & Trefferquote)",
      headers: ["Leistungsstufe (Tier)", "Erfassungs-Latenz", "Erstschuss-Präzision", "Wettkampf-Einfluss im Match"],
      rows: [
        ["Tier 1 (Profi / Radiant & Faceit Lv10)", "< 260 ms", "95% – 99%+", "Reflexartiges Bedrohungsscreening; fehlerfreie One-Tap-Kopfschüsse ohne Zögern."],
        ["Tier 2 (Elite / Unsterblich & Faceit Lv8-9)", "260 – 320 ms", "88% – 95%", "Hervorragende Zielerkennung; schaltet Primärziele auch in dichten Szenarien blitzschnell aus."],
        ["Tier 3 (Erfahren / Diamant & Ascendant)", "320 – 400 ms", "80% – 88%", "Solide Erstschussquote; bei mehreren Zielen entsteht gelegentlich eine kurze Orientierungslatenz."],
        ["Tier 4 (Fortgeschritten / Gold & Platin)", "400 – 500 ms", "70% – 80%", "Verzögerte Zielselektion; neigt zu Fehlklicks auf sekundäre Ziele oder leichten Überrissen."],
        ["Tier 5 (Einsteiger / Silber & Bronze)", "> 500 ms", "< 70%", "Suchbewegungen der Augen dauern zu lange; verliert Peek-Duelle durch verspätete Schussabgabe."]
      ],
      note: "Die Erfassungs-Latenz bemisst die Zeit vom Erscheinen der Zielgruppe bis zum erfolgreichen Treffer auf das hellste Primärziel (Woods et al., 2015)."
    },
    techniques: {
      title: "Biomechanische & kognitive Methoden für maximale Erfassungsgeschwindigkeit",
      items: [
        {
          name: "Peripheres Scanning & Soft Focus",
          desc: "Vermeide es, den Bildschirm zeilenweise mit den Augen abzusuchen. Halte deinen Blick entspannt auf der Bildschirmmitte und nutze das periphere Sehen für automatische Helligkeits-Erkennung (Treisman & Gelade, 1980).",
          tips: "Ein weicher Blickwinkel erweitert das wahrgenommene Sichtfeld und beschleunigt das Erkennen auftauchender Konturen."
        },
        {
          name: "Sakkadische Blickkopplung",
          desc: "Kopple Augen- und Handbewegung: Zuerst springt der Blick (Sakkade) auf das Zielzentrum, gefolgt vom sofortigen Mausschwung entlang desselben Vektors.",
          tips: "Die Augen sollten 30 bis 50 ms vor dem Fadenkreuz am Ziel ankommen, um die Trefferfläche foveal scharfzustellen."
        },
        {
          name: "Helligkeits-Diskriminierungsschwelle",
          desc: "Trainiere dein Gehirn darauf, subtile Deckkraft- und Farbabweichungen zu gewichten und sekundäre Störelemente konsequent zu ignorieren.",
          tips: "Schieße erst, wenn du das hellste Ziel im Cluster eindeutig identifiziert hast – Disziplin schlägt Hektik."
        },
        {
          name: "Endphasen-Bremsung über das Mauspad",
          desc: "Nutze die Reibung deines Mauspads und leichten Fingerkuppendruck, um den ballistischen Anfangsflick exakt im Zielzentrum abzustoppen (Meyer et al., 1988).",
          tips: "Ein definierter Stopp verhindert Überschwingen und sichert die First-Shot-Accuracy."
        }
      ]
    },
    steps: [
      "Passe DPI und Ingame-Sensibilität identisch an und aktiviere die Pointer-Lock-Mauseingabe.",
      "Halte das Fadenkreuz in ruhiger Bereitschaft und scanne das Display mit entspanntem Soft Focus.",
      "Erfasse im erscheinenden Cluster sofort das Ziel mit der höchsten Helligkeit/Deckkraft.",
      "Führe einen präzisen ballistischen Flick auf das Ziel aus und sichere dir +100 Punkte (+0,4s Zeitzugewinn).",
      "Räume verbleibende Ziele nach Helligkeit ab, um den Multiplikator-Bonus (+400 Punkte × Level) zu maximieren."
    ],
    audience: "Wettkampfspieler in Counter-Strike 2, Valorant, Rainbow Six Siege, Apex Legends und Overwatch 2, die ihre visuelle Reaktionsschnelligkeit und Erstschuss-Präzision perfektionieren wollen.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'meyer1988', 'treisman1980', 'wolfe2007'),
    related: [
      { href: "/de/drills/fps/flick-shot-training", label: "Flick Shot Training" },
      { href: "/de/drills/fps/micro-correction-precision", label: "Mikrokorrektur Aiming" },
      { href: "/de/drills/fps/180-degree-awareness", label: "180 Grad Aiming" },
      { href: "/de/drills/fps/instant-response", label: "FPS Reaktionszeit Test" }
    ]
  };

  const copyDe = {
    h1Keyword: "Zielerfassung FPS Training",
    h1Suffix: " – First Shot Precision",
    statScore: "Punkte",
    statTime: "Zeit",
    statAccuracy: "Präzision",
    statBestScore: "Highscore",
    statSetsCleared: "Sets gelöscht",
    statMaxCombo: "Max Combo",
    statPeakLevel: "Level",
    startTitle: "Target Acquisition Pro",
    startSubtitle: "Visuelle Erkennung • Endlose Levelprogression & Kontrast-Aiming",
    getReady: "BEREITMACHEN",
    toggleFlash: "Fehlschuss-Aufleuchten umschalten",
    toggleSound: "Soundeffekte umschalten",
    pausedTitle: "Spiel Pausiert",
    pausedSubtitle: "Klicke in das Spielfeld, um die Mauszeiger-Sperre zu reaktivieren",
    stageCaption: "Finde und klicke in jedem Ziel-Cluster das hellste Ziel (höchste Deckkraft) mit maximaler Geschwindigkeit und Präzision.",
    rulesTitle: "Trainingsregeln & Punktesystem",
    rulesItems: [
      { title: "Richtiges Ziel treffen (+100 Pkt / +0,4s)", text: "Klicke immer das hellste Ziel zuerst an. Skaliert mit Combo- und Level-Bonus." },
      { title: "Set-Clear-Bonus (+400 Pkt × Level)", text: "Das fehlerfreie Abräumen einer Zielgruppe erzeugt sofort das nächste Cluster." },
      { title: "Levelaufstieg (alle 1.400 Pkt)", text: "Dichtere Gruppen, kleinere Zielradien und feinere Kontrastunterschiede." },
      { title: "Fehlklick / Fehlschuss", text: "Falsches Ziel oder Miss setzt die Combo auf 0 zurück (mit Strafzeit -0,6s)." }
    ],
    aboutTitle: "Über das Zielerfassungs-Training",
    aboutHeading: "Was bedeutet Zielerfassung (Target Acquisition) im Shooter?",
    aboutText: "Zielerfassung ist der kognitive und motorische Prozess, feindliche Ziele in komplexen Szenarien sofort zu erkennen und mit dem ersten Schuss auszuschalten. Da Helligkeitsunterschiede im Sehsystem parallel verarbeitet werden (Treisman & Gelade, 1980), trainiert dieser Drill dein Gehirn auf unfehlbare Erstschuss-Reflexe."
  };

  return (
    <>
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      {/* VideoGame Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <TargetAcquisitionClient copy={copyDe} />

      <DrillGuide guide={targetAcquisitionGuideDe} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/target-acquisition"
          locale="de"
        />
      </div>
    </>
  );
}
