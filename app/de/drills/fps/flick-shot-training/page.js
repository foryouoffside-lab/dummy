import ProFlickClient from '@/app/drills/fps/flick-shot-training/ProFlickClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';

// ============================================================
// GERMAN SEARCH KEYWORD RESEARCH & INTENT CLUSTERING (DACH)
// Primary query: "flick shot training" (Core German gaming query)
// Secondary:    "snap aim uebungen", "maus flick praezision", "flick aim lernen", "aim trainer deutsch"
// LSI / Domain:  "ballistische mausbewegung", "korrektursakkade", "mauspad reibungswiderstand",
//               "ueberschwingen verhindern", "antagonistische muskelkontraktion", "fitts gesetz"
// Authentic Domain Terms: Flick Shot Training, Snap Aiming, Zielerfassung (Target Acquisition),
//                         Korrektursakkade (Corrective Saccade), Muskelbremsung (Decelerative Braking)
// ============================================================

export const metadata = {
  title: "Flick Shot Training – Snap Aim und Präzision | SkillDrills",
  description: "Kostenloses Flick Shot Training im Browser. Trainiere Snap Aiming, Mausbeschleunigung und Reibungsbremsung für präzise Headshots in CS2 und Valorant.",
  keywords: [
    "Flick Shot Training",
    "Snap Aiming Übungen",
    "Maus Flick Präzision",
    "Flick Aim lernen",
    "Aim Trainer kostenlos",
    "CS2 Flick Shot",
    "Valorant Aim Training",
    "Mausbeschleunigung stoppen",
    "Headshot Präzision verbessern",
    "Reaktionsschnelles Zielen",
    "Zielerfassung FPS Übung",
    "Ballistische Mausbewegung"
  ],
  alternates: {
    canonical: "https://skilldrills.online/de/drills/fps/flick-shot-training",
    languages: getAlternateLanguages('/drills/fps/flick-shot-training'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Flick Shot Training – Snap Aim und Präzision | SkillDrills",
    description: "Kostenloses Flick Shot Training im Browser. Trainiere Snap Aiming, Mausbeschleunigung und Reibungsbremsung für präzise Headshots in CS2 und Valorant.",
    url: "https://skilldrills.online/de/drills/fps/flick-shot-training",
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Flick Shot Training – Snap Aim und Präzision | SkillDrills",
    description: "Kostenloses Flick Shot Training im Browser. Trainiere Snap Aiming, Mausbeschleunigung und Reibungsbremsung für präzise Headshots in CS2 und Valorant.",
  },
};

export default function FlickShotDePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/de" },
      { "@type": "ListItem", "position": 2, "name": "FPS Aim Training", "item": "https://skilldrills.online/de/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Flick Shot Training", "item": "https://skilldrills.online/de/drills/fps/flick-shot-training" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Flick Shot Training",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-15",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
    "description": "Kostenloses Browser-Aim-Training zur Perfektionierung von Snap Aiming, Muskelgedächtnis und Reibungsbremsung.",
    "genre": "FPS Training / Flick Shot",
    "url": "https://skilldrills.online/de/drills/fps/flick-shot-training",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Flick Shot Training",
    "url": "https://skilldrills.online/de/drills/fps/flick-shot-training",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Benötigt JavaScript und HTML5 Canvas Unterstützung",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "description": "Kostenloses Browser-Aim-Training zur Perfektionierung von Snap Aiming, Muskelgedächtnis und Reibungsbremsung."
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Flick Shot Training",
    "url": "https://skilldrills.online/de/drills/fps/flick-shot-training",
    "description": "Kostenloses Browser-Aim-Training zur Perfektionierung von Snap Aiming, Muskelgedächtnis und Reibungsbremsung.",
    "dateModified": "2026-09-15",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Flick Shot"],
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
        "name": "Was versteht man unter einem Flick Shot (Snap Aim) im FPS-Bereich?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ein Flick Shot bezeichnet die blitzschnelle, ballistische Bewegung des Fadenkreuzes aus der Ruheposition auf ein plötzlich erscheinendes Ziel, gefolgt von einer sofortigen Bremsung zur präzisen Schussabgabe."
        }
      },
      {
        "@type": "Question",
        "name": "Wie kann man das Übersteuern (Overshooting) beim Flicken verhindern?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Overshooting wird verhindert, indem man die antagonistische Muskelbremsung trainiert und den vertikalen Druck der Hand auf das Mauspad dosiert, um die Reibung im exakten Moment des Eintreffens zu maximieren."
        }
      },
      {
        "@type": "Question",
        "name": "Worin liegt der Unterschied zwischen Tracking Aim und Flick Aim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tracking Aim erfordert kontinuierliche visuelle Verfolgung eines sich bewegenden Ziels (Closed-Loop-Kontrolle), während Flick Aiming ein diskreter, ballistischer Bewegungssprung mit anschließender Mikrokontrolle ist."
        }
      },
      {
        "@type": "Question",
        "name": "Sollte man für Flicks eher das Handgelenk oder den ganzen Arm nutzen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Für große Winkel (über 45 Grad) nutzt man den gesamten Unterarm aus der Schulter heraus, während die finale Mikrokorrektur und das Einrasten auf dem Kopf durch Handgelenk und Fingerspitzen erfolgen."
        }
      },
      {
        "@type": "Question",
        "name": "Wie wirkt sich das Fitts'sche Gesetz (Fitts's Law) auf das Flick-Aiming aus?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Das Fitts'sche Gesetz besagt, dass die Bewegungszeit logarithmisch mit zunehmender Distanz und kleiner werdender Zielgröße ansteigt. Profis optimieren die Bewegung, indem sie 85 % der Strecke im ersten Bewegungsimpuls zurücklegen."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Rolle spielen Monitor-Bildwiederholrate und Maus-Pollingrate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Höhere Bildwiederholraten (144 Hz oder 240 Hz) und 1000 Hz Polling-Raten minimieren Input-Lag und Bewegungsunschärfe, wodurch das menschliche Auge Zielpositionen bis zu 15 Millisekunden früher wahrnehmen kann."
        }
      },
      {
        "@type": "Question",
        "name": "Wie findet man die optimale eDPI-Sensitivität für Flick Shots?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die optimale Sensitivität erlaubt eine bequeme 180-Grad-Drehung auf dem Mauspad, ohne die Kontrolle über minimale 1-Pixel-Mikrojustierungen im Fadenkreuz zu verlieren (typisch 200-320 eDPI in Valorant)."
        }
      },
      {
        "@type": "Question",
        "name": "Hilft dieses Flick-Training direkt in taktischen Shootern wie CS2 und Valorant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, das Training schult die sogenannte Time-to-Damage (TTD). In taktischen Shootern entscheidet der erste Treffer oft über das Duell, weshalb automatisiertes Snap-Aiming zu signifikant höheren Win-Rates führt."
        }
      },
      {
        "@type": "Question",
        "name": "Wie lange sollte eine tägliche Flick-Shot-Trainingseinheit dauern?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fokussierte Einheiten von 15 bis 20 Minuten täglich vor dem Spielen sind optimal. Längere Sessions ohne Pausen führen zu kognitiver Ermüdung und fehlerhaftem motorischem Lernen."
        }
      },
      {
        "@type": "Question",
        "name": "Steigt der Schwierigkeitsgrad des Trainers mit zunehmender Punktzahl automatisch an?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, alle 1.400 Punkte steigt der Trainer um ein Level. Dabei schrumpfen die Zielkreise kontinuierlich und die Lebensdauer der Ziele verkürzt sich, um das Reaktionszeitfenster dynamisch zu verengen."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Anleitung: Flick Shots in 4 Schritten meistern",
    "description": "Wissenschaftlich fundierter Trainingsablauf zur Perfektionierung von ballistischer Beschleunigung und Bremsung.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Zentrierung und Sensitivitätsabgleich",
        "text": "Positioniere das Fadenkreuz im Zentrum des Monitors und stelle sicher, dass die Mausempfindlichkeit exakt deinem gewohnten Ingame-eDPI entspricht."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Periphere Zielerfassung",
        "text": "Halte einen entspannten Weitwinkelfokus (Soft Focus) auf dem Fadenkreuz, um das Erscheinen neuer Targets im peripheren Blickfeld sofort wahrzunehmen."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Ballistische Beschleunigung",
        "text": "Bewege die Maus in einer flüssigen, ununterbrochenen Beschleunigungskurve direkt auf das Zielzentrum, noch bevor das Zeitfenster des Ziels abläuft."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Gezieltes Abbremsen und Klick",
        "text": "Stoppe die Maus punktgenau durch antagonistische Muskelspannung und Handballdruck auf das Pad ab und löse im Stillstand den Klick aus."
      }
    ]
  };

  const flickGuide = {
    heading: "Flick Shot Guide & Biomechanische Benchmarks",
    subtitle: "Wissenschaftliche Trainingsmethodik für ballistische Zielbeschleunigung, Muskelgedächtnis und millimetergenaue Mausbremsung",
    intro: [
      "Flick Aiming (Snap Aiming) ist die essenzielle Kernfähigkeit in kompetitiven First-Person-Shootern wie Counter-Strike 2, Valorant und Apex Legends. Es bezeichnet den motorischen Vorgang, das Fadenkreuz aus einer Vorhalteposition in minimaler Zeitspanne exakt auf den Kopf des Gegners zu peitschen und dort ohne Wackeln zu arretieren.",
      "In der Biomechanik und Neurowissenschaft folgt zielgerichtetes manuelles Zeigen dem Zwei-Phasen-Modell motorischer Kontrolle (Elliott et al., 2010). In der ersten Phase überwindet ein ballistischer, offener Impuls (Open-Loop) etwa 80 bis 90 Prozent der Distanz. Die zweite Phase erfordert eine geschlossene visuelle Rückkopplung (Closed-Loop), um das Ziel foveal einzufangen und den Schuss präzise zu setzen.",
      "Gemäß dem Fitts'schen Gesetz (Fitts, 1954) steigt der Schwierigkeitsindex (Index of Difficulty) logarithmisch mit zunehmender Entfernung und abnehmender Zielgröße. Dieser Trainer konditioniert die Reziproke Innervation und antagonistische Muskelimpulse (Schmidt et al., 1979), wodurch das berüchtigte Übersteuern (Overshooting) systematisch eliminiert wird.",
      "Hinweis zur Messgenauigkeit: Dieser Drill nutzt die hochauflösende Browser-Schnittstelle performance.now() für Latenzmessungen im Sub-Millisekundenbereich. Die Bildausgabe unterliegt der Bildwiederholrate deines Monitors (60Hz, 144Hz, 240Hz), weshalb Abweichungen unter 5 ms auf hardwarebedingte Framerate-Toleranzen zurückzuführen sind."
    ],
    benchmarks: {
      title: "Zielerfassungs- & Reaktionszeit-Benchmarks (Movement Time)",
      headers: ["Bewegungsphase / Messgröße", "Standard-Latenz", "Motorischer Kontrollmechanismus", "Leistungsstufe & Bewertung"],
      rows: [
        ["Initiale Blicksakkade (Augensprung)", "180 – 220 ms", "Foveale Zielerfassung im visuellen Kortex", "Visuelle Reizidentifikation vor Mausbewegung (Woods et al., 2015)"],
        ["Ballistische Hauptbewegung (Initialimpuls)", "120 – 180 ms", "Agonistischer Muskelkraftstoß (Arm/Handgelenk)", "Überwindet 80–90 % der Gesamtdistanz (Elliott et al., 2010)"],
        ["Korrektives Abbremsen (Homing-Bremsung)", "60 – 120 ms", "Visuelle Rückkopplung & Mauspad-Reibung", "Closed-Loop Feinjustierung zur Zielerfassung (Fitts, 1954)"],
        ["Gesamte Zielerfassungszeit (Durchschnitt)", "360 – 520 ms", "Kompletter sensomotorischer Reaktionskreis", "Solide Basis für kompetitive Ranked-Matches"],
        ["Elite-Präzision (Tier-1-Profi)", "240 – 320 ms", "Nahezu fehlerfreie automatisierte Motorsynergie", "Perfekt synchronisierte Mausbremsung auf Profiniveau"]
      ],
      note: "Wissenschaftliche Benchmark-Werte basierend auf Fitts (1954), Schmidt et al. (1979), Elliott et al. (2010) und Woods et al. (2015)."
    },
    techniques: {
      title: "Optimale eDPI-Sensitivitäts-Kalibrierung nach Spiel",
      items: [
        {
          name: "Valorant Sensitivitäts-Kalibrierung",
          desc: "Empfohlener eDPI-Bereich: 200 – 320 (z. B. 800 DPI × 0,25 – 0,4). Höchste Priorität für stabile Headshot-Linien.",
          tips: "Führe Flicks über 45 Grad primär aus dem Ellenbogengelenk aus und überlasse die letzten Millimeter dem Handgelenk."
        },
        {
          name: "Counter-Strike 2 (CS2) Kalibrierung",
          desc: "Empfohlener eDPI-Bereich: 600 – 1000 (z. B. 800 DPI × 0,8 – 1,25). Perfekte Balance für Winkelhalten und Spray-Bremsung.",
          tips: "Achte beim Flicken darauf, die horizontale Kopfhöhe exakt parallel zur Bodenachse beizubehalten."
        },
        {
          name: "Apex Legends & Fast-Paced Arena Shooter",
          desc: "Empfohlener eDPI-Bereich: 1000 – 1600. Ermöglicht schnelle 180-Grad-Reaktionen im Nahkampf gegen mobile Gegner.",
          tips: "Nutze vorzugsweise ein Mauspad mit ausgewogenem Gleit- und Stoppverhalten (Hybrid-Pad) für verlässliche Bremswirkung."
        },
        {
          name: "Overwatch 2 (Hitscan-Helden)",
          desc: "Empfohlener eDPI-Bereich: 3200 – 4800 für Cassidy/Widowmaker. Erfordert blitzschnelle Reaktionen gegen Sprungtrajektorien.",
          tips: "Trenne das Muskelgedächtnis für Klick-Timing-Helden strikt von reinen Tracking-Helden wie Tracer oder Zarya."
        }
      ]
    },
    steps: [
      "Passe die Mausempfindlichkeit und DPI exakt an dein Spiel an und klicke in das Spielfeld, um den Zeiger zu sperren.",
      "Richte deinen Blick entspannt auf das zentrale Fadenkreuz.",
      "Sobald ein Ziel erscheint, bewege die Maus blitzschnell und ohne Zögern direkt in das Zielzentrum und klicke.",
      "Vermeide langsames Nachkorrigieren — konzentriere dich auf maximale Beschleunigung und scharfes Abstoppen.",
      "Analysiere auf der Auswertungskarte deine durchschnittliche Flick-Latenz sowie Trefferquote und starte den nächsten Durchgang."
    ],
    audience: "Ambitionierte FPS-Spieler in CS2, Valorant, Apex Legends und Overwatch 2, die ihre Erstschusspräzision, Snap-Aim-Reaktionszeiten und mechanische Mausbeherrschung systematisch maximieren wollen.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'elliott2010', 'fitts1954', 'schmidt1979'),
    related: [
      { href: "/de/drills/motor/hand-eye-coordination/aim-trainer", label: "Allgemeiner Aim Trainer Online" },
      { href: "/de/drills/reaction-speed/reaction-time-test", label: "Reaktionszeit Test Online" },
      { href: "/de/drills/motor/movement-speed/rapid-tapping", label: "Klick-Geschwindigkeitstest (CPS)" },
      { href: "/de/drills/reaction-speed/reflex-training-drill", label: "Reflex Training Drill" }
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
      <ProFlickClient
        copy={{
          h1Keyword: "Flick Shot Training",
          h1Suffix: " – Snap Aim & Präzision",
          subtitle: "Trainiere Snap Aiming, ballistisches Muskelgedächtnis, Zielerfassung und Mausbremsung mit Echtzeit-Feedback.",
          statScore: "Punkte",
          statTime: "Verbleibende Zeit",
          statAccuracy: "Präzision",
          statBestScore: "Highscore",
          statAvgFlick: "Ø Flick-Zeit",
          statMaxCombo: "Max Combo",
          statPeakLevel: "Höchstes Level",
          startTitle: "Pro Flick Trainer",
          startSubtitle: "Ballistische Flicks & Zielerfassung • Dynamische Levelprogression",
          getReady: "Bereitmachen",
          toggleFlash: "Fehlschuss-Blitz umschalten",
          toggleSound: "Soundeffekte umschalten",
          pausedTitle: "Pausiert",
          pausedSubtitle: "Klicken zum Fortsetzen — Mauszeiger-Sperre wird reaktiviert.",
          stageCaption: "Ziele blitzschnell auf zufällig erscheinende Ziele und klicke präzise, bevor das Zeitlimit abläuft.",
          rulesTitle: "Trainingsregeln & Punktesystem",
          rulesItems: [
            { num: "1", text: "Zieltreffer", highlight: "+100 PTS (+0,6s)", result: "×Combo-Multiplikator" },
            { num: "2", text: "Trefferserie", highlight: "Bis zu 3,0×", result: "Schnellere Ziele" },
            { num: "3", text: "Levelaufstieg", highlight: "+1 / 1800 PTS", result: "Adaptive Skalierung" },
            { num: "4", text: "Fehlschuss / Timeout", highlight: "Strafe", result: "Combo-Reset (-0,8s)" }
          ],
          aboutTitle: "Über den Pro Flick Trainer",
          aboutHeading: "Was ist Flick Aiming?",
          aboutText: "Flick Aiming ist die Fähigkeit, das Fadenkreuz in einer einzigen ballistischen Bewegung präzise auf ein erblicktes Ziel zu beschleunigen und sofort abzustoppen. Gemäß Fitts' Law (1954) skaliert die Schwierigkeit mit Distanz und Zielgröße. Meisterschaft entsteht durch die Beherrschung der mechanischen Bremsphase (Elliott et al., 2010)."
        }}
      />
      <DrillGuide guide={flickGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/flick-shot-training"
          locale="de"
        />
      </div>
      <DrillFooter />
    </>
  );
}
