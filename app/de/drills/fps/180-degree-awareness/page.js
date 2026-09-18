import AwarenessDrillClient from '@/app/drills/fps/180-degree-awareness/AwarenessDrillClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

// ============================================================
// GERMAN SEARCH KEYWORD RESEARCH & INTENT CLUSTERING (DACH)
// Primary queries: "180 Grad Aiming" (High domestic search demand in CS2 & Valorant communities)
//                  "180 Turn Training FPS" (Technical category query for snap turns)
// Secondary:       "Mauspad Reset Übungen", "Flanken Reaktionszeit FPS", "180 Flick Shot Übung",
//                  "Flashbang Ausweichen CS2", "Peripheres Sehen Aiming", "Schnelle Drehung FPS Maus",
//                  "Großraum Flick Training", "Arm Aiming 180 Drehung"
// Domain / LSI:    "Zwei-Komponenten-Modell" (Elliott et al. 2010), "Antagonisten-Bremskraft" (Schmidt et al. 1979),
//                  "Periphere Netzhautstäbchen" (Rayner 1998, Leigh & Zee 2015), "Sakkadische Augenbewegungen",
//                  "Colliculus Superior", "Fitts Gesetz" (Fitts 1954), "cm/360° Sensitivitäts-Kalibrierung"
// Authentic Domain Terms: 180-Grad-Drehung, Snap Turn, Flashbang Ausweichen, Peripheres Sehen,
//                         Arm-Aiming, Mauspad-Reset, Bremskraft
// ============================================================

export const metadata = {
  title: "180 Grad Aiming – FPS Snap Turn Trainer | SkillDrills",
  description: "Kostenloses 180-Grad-Aim-Training im Browser: Trainiere schnelle 180°-Drehungen, peripheres Sehen und Flashbang-Reaktionen für CS2, Valorant und Apex.",
  keywords: [
    "180 Grad Aiming",
    "180 Grad Drehung Übung FPS",
    "Mauspad Reset Übungen",
    "Flanken Reaktionszeit FPS",
    "180 Grad Schnappschuss Übung",
    "Flashbang Ausweichen CS2",
    "Peripheres Sehen Aiming",
    "Schnelle Drehung FPS Maus",
    "Weitwinkel Zielwechsel Maus",
    "Arm Aiming 180 Drehung",
    "Rückwärtige Zielerfassung FPS",
    "Umsehen Geschwindigkeit FPS"
  ],
  alternates: {
    canonical: "https://skilldrills.online/de/drills/fps/180-degree-awareness",
    languages: getAlternateLanguages('/drills/fps/180-degree-awareness'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "180 Grad Aiming – FPS Snap Turn Trainer | SkillDrills",
    description: "Kostenloses 180-Grad-Aim-Training im Browser: Trainiere schnelle 180°-Drehungen, peripheres Sehen und Flashbang-Reaktionen für CS2, Valorant und Apex.",
    url: "https://skilldrills.online/de/drills/fps/180-degree-awareness",
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "180 Grad Aiming – FPS Snap Turn Trainer | SkillDrills",
    description: "Kostenloses 180-Grad-Aim-Training im Browser: Trainiere schnelle 180°-Drehungen, peripheres Sehen und Flashbang-Reaktionen für CS2, Valorant und Apex.",
  },
};

export default function AwarenessDrillDePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/de" },
      { "@type": "ListItem", "position": 2, "name": "FPS Aim Training", "item": "https://skilldrills.online/de/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "180 Grad Aiming", "item": "https://skilldrills.online/de/drills/fps/180-degree-awareness" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "180 Grad Aiming – FPS Snap Turn Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "180 Grad Aiming Trainer",
    "url": "https://skilldrills.online/de/drills/fps/180-degree-awareness",
    "applicationCategory": "Trainer",
    "browserRequirements": "Requires Pointer Lock API, modern web browser, 60Hz+ monitor recommended"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "180 Grad Aiming Trainer",
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
        "name": "Was versteht man unter 180-Grad-Aiming in modernen FPS-Spielen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "180-Grad-Aiming bezeichnet die biomechanische Fähigkeit, periphere oder hinter der Spielfigur auftauchende akustische und optische Reize blitzschnell zu erfassen, das Blickfeld um 180 Grad herumzureißen und das Fadenkreuz ohne Überschwingen punktgenau auf den Gegner zu setzen."
        }
      },
      {
        "@type": "Question",
        "name": "Wie trainieren Profis ihre 180-Grad-Drehungen und Raumorientierung?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Professionelle Spieler verankern ihre exakte Distanz für eine 360°-Drehung (cm/360°) im Muskelgedächtnis. Sie nutzen den Unterarm und die Schulter für den weiten Schwung und kombinieren dies mit kontrollierter Handballenbremsung, um das Fadenkreuz im Zielbereich sofort zu arretieren."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Rolle spielt das periphere Sehen bei schnellen Drehungen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Das zentrale Sehfeld (Fovea) umfasst nur etwa 2 Grad. Die Stäbchenzellen der peripheren Netzhaut erkennen jedoch Bewegungen und Kontrastwechsel bis zu 180 Grad extrem schnell. Diese Signalübertragung über das Mittelhirn (Colliculus Superior) löst eine reflektorische Sakkade aus, die die Mausbewegung einleitet."
        }
      },
      {
        "@type": "Question",
        "name": "Sollte man für 180°-Drehungen das Handgelenk oder den Arm nutzen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Große Winkel über 90 Grad müssen zwingend aus dem Ellenbogen und der Schulter ausgeführt werden (Arm Aiming). Das schont die Handgelenkssehnen vor Überlastung und ermöglicht die notwendige Hebelwirkung für weite, lineare Mauswege auf dem Pad."
        }
      },
      {
        "@type": "Question",
        "name": "Wie reagiert man am effektivsten auf Gegner im Rücken (Flank-Angriffe)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Entscheidend ist die Verknüpfung von räumlichem 3D-Sound mit einem sofortigen, unzögerlichen Vollschwung der Maus. Nach dem 180-Grad-Turn erfolgt eine kurze visuelle Zielbestätigung (Target Confirmation), bevor der Schuss abgegeben wird."
        }
      },
      {
        "@type": "Question",
        "name": "Hilft dieses Training beim Ausweichen von Flashbangs in CS2 und Valorant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, in hohem Maße. Ein zentraler Spielzug auf hohem Niveau ist das blitzschnelle Wegdrehen um 180 Grad bei herannahenden Blendgranaten mit anschließender sofortiger Rückkehr auf die ursprüngliche Kopflinie."
        }
      },
      {
        "@type": "Question",
        "name": "Wie oft sollte man 180-Grad-Snap-Turns trainieren?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tägliche Einheiten von 5 bis 10 Minuten vor dem eigentlichen Match eignen sich hervorragend als Warm-up. Dies reaktiviert das räumliche Koordinatengefühl auf dem Mauspad, ohne die Schultermuskulatur vorzeitig zu ermüden."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Mauspad-Größe ist für 180-Grad-Drehungen optimal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Für Low- bis Mid-Sense-Spieler wird eine Pad-Breite von mindestens 45 bis 50 cm empfohlen. Die Mausempfindlichkeit sollte so kalibriert sein, dass eine Bewegung von der Mitte zum Rand genau eine 180-Grad-Drehung erzeugt."
        }
      },
      {
        "@type": "Question",
        "name": "Unterstützt dieser Trainer echte Hardware-Rohdaten (Pointer Lock API)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja. Der Trainer nutzt die HTML5-Pointer-Lock-API für direkte 1:1 Rohdatenübertragung ohne Windows-Mausbeschleunigung oder Glättungsfilter – identisch zu deinem Ingame-Mausverhalten."
        }
      },
      {
        "@type": "Question",
        "name": "Warum setzt ein Fehlklick oder Zeitablauf den Combo-Multiplikator zurück?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Der Combo-Reset erzwingt präzise Bremskontrolle. Blindes, hektisches Schleudern der Maus ohne visuelle Fixierung führt zu Fehlschüssen, während kontrolliertes Anhalten und Treffen mit maximalen Punkten belohnt wird."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "180-Grad-Aiming & Raumorientierung in 4 Schritten",
    "description": "Schritt-für-Schritt-Anleitung zur Beherrschung weiter 180°-Drehungen und peripherer Zielerfassung.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Sensitivität einstellen und Maus zentral positionieren",
        "text": "Aktiviere Pointer Lock und platziere die Maus exakt in der Mitte deines Mauspads, um in beide Richtungen vollen Bewegungsradius zu sichern."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Periphere Zielerkennung am Bildschirmrand",
        "text": "Halte deinen Blick zentriert und nimm Ziele an den äußeren Monitorrändern bewusst über das periphere Gesichtsfeld wahr."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Dynamischer Armschwung aus Schulter und Ellenbogen",
        "text": "Vollführe einen raumgreifenden, schnellen Schwung mit dem gesamten Unterarm, um die 180-Grad-Distanz in einer einzigen Bewegung zu überbrücken."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Muskuläre Bremsung und präziser Klick",
        "text": "Bremse die Maus kurz vor dem Ziel über Gegendruck und Handballenfriktion ab und löse bei visueller Bestätigung sauber aus."
      }
    ]
  };

  const awarenessGuideDe = {
    heading: "180-Grad-Aiming & Raumwahrnehmung – Wissenschaftlicher Trainingsleitfaden",
    subtitle: "Optimiere periphere Zielerfassung, großwinklige Arm-Flicks und Bremskraft für dominante Clutches in taktischen FPS-Titeln",
    intro: [
      "Eine 180-Grad-Drehung (Snap Turn) ist die motorisch anspruchsvollste Einzelleistung im Wettkampf-Shooter. Sie erfordert das synchrone Zusammenspiel aus peripherer Reizwahrnehmung, sakkadischer Blickumkehr und einem großwinkligen ballistischen Armschwung. In der menschlichen Netzhaut sind die lichtempfindlichen Stäbchenzellen in der Peripherie darauf spezialisiert, selbst minimale Helligkeits- und Bewegungsimpulse bis zu 90 Grad außerhalb des Sehzentrums wahrzunehmen (Rayner, 1998; Leigh & Zee, 2015). Über den Colliculus Superior im Mittelhirn wird daraufhin innerhalb von 140 bis 190 Millisekunden eine reflektorische Ausrichtungs-Sakkade ausgelöst.",
      "Die biomechanische Ausführung einer 180-Grad-Drehung folgt dem Zwei-Komponenten-Modell zielgerichteter Bewegungen (Elliott et al., 2010). Aus Schulter und Ellenbogen wird ein ungeführter, ballistischer Schwung (Open-Loop) generiert, der rund 80 bis 90 Prozent der Gesamtdistanz abdeckt. Unmittelbar vor Erreichen der Zielzone greift die Antagonisten-Muskulatur (Schmidt et al., 1979) und bremst die Trägheit des Arms ab. Nach Fitts' Gesetz (Fitts, 1954) steigt die Schwierigkeit mit der Weite des Sprungs logarithmisch an: Je größer der Drehwinkel, desto kritischer ist eine exakt dosierte Bremsung zur Vermeidung zeitraubender Korrekturen.",
      "Dieser Trainer schult die synchrone Abstimmung von physischem Mauspad-Raum und virtuellem Raum. Das Gehirn lernt, wie viele Zentimeter Mausweg auf dem Pad exakt einer 180-Grad-Drehung im Spiel entsprechen. Dies ermöglicht blinde Instinkt-Flicks auf Flankenangreifer und blitzschnelles Abwenden von Flashbangs mit verlässlicher Rückkehr auf die Kopflinie.",
      "Messpräzision & Hardware-Transparenz: Alle Reaktionszeiten werden direkt im Browser über performance.now() mit Mikrosekunden-Auflösung erfasst (Woods et al., 2015). Die Pointer-Lock-API garantiert direkte Rohdaten ohne künstliche Glättung. Beachte die Bildwiederholrate deines Monitors: Ein 144-Hz-Display aktualisiert alle 6,9 ms, ein 240-Hz-Display alle 4,1 ms. Abweichungen unter 5 ms spiegeln systembedingte Frame-Intervalle wider."
    ],
    benchmarks: {
      title: "180-Grad-Drehung & Zielerfassungs-Benchmarks (Latenz & Biomechanik)",
      headers: ["Rotationsphase / Messparameter", "Mittlere Latenz (ms)", "Biomechanischer Bewegungsablauf", "Sensomotorische Klassifikation"],
      rows: [
        ["Periphere Erkennung & Sakkaden-Start", "140 – 190 ms", "Netzhautstäbchen erfassen Reiz; Sakkade via Colliculus Superior", "Präattentive Orientierung (Rayner, 1998)"],
        ["Ballistischer 180°-Swipe (Armschwung)", "180 – 260 ms", "Vorantrieb aus Schulter-Ellenbogen-Achse über das Mauspad", "Open-Loop Bewegungsimpuls (Elliott et al., 2010)"],
        ["Endphasen-Bremsung & Verzögerung", "60 – 110 ms", "Antagonistische Muskelbremsung stoppt die Armträgheit ab", "Dämpfungskontrolle (Schmidt et al., 1979)"],
        ["Foveale Feinjustierung & Klick", "70 – 130 ms", "Optische Zentrierung auf Zielmitte und Schussabgabe", "Fitts' Homing-Phase (Fitts, 1954)"],
        ["Gesamte 180°-Zielerfassungszeit", "450 – 690 ms", "Vollständiger Zyklus von Reizwahrnehmung bis Treffer", "Standardbereich für engagierte Shooter-Spieler"],
        ["Elite Pro-Turn (Tier 1 Esport)", "320 – 420 ms", "Vollautomatisierter Einzelschwung mit perfektem Stopp", "Profi-Niveau in CS2 & Valorant Clutch-Duellen"]
      ],
      note: "Die Benchmark-Werte basieren auf empirischen motorischen Reaktionsdaten und bewegungswissenschaftlicher Literatur (Rayner, 1998; Fitts, 1954; Schmidt et al., 1979; Elliott et al., 2010; Woods et al., 2015)."
    },
    techniques: {
      title: "Biomechanische Schlüsseltechniken für maximale 180°-Konsistenz",
      items: [
        {
          name: "Geometrischer Drehpunkt des Unterarms",
          desc: "Vermeide es, 180-Grad-Turns aus dem Handgelenk zu erzwingen. Nutze den Ellenbogen und die Schulter als Rotationsachse. Halte den Unterarm waagerecht zur Tischkante, um ruckfreie, lineare Schwünge zu gewährleisten.",
          tips: "Sorge für mindestens 20 bis 25 cm freie Fläche auf beiden Seiten der Maus, bevor die Runde beginnt."
        },
        {
          name: "cm/360°-Sensitivitätsverankerung",
          desc: "Taktische FPS-Profis nutzen meist Empfindlichkeiten zwischen 35 und 55 cm pro 360-Grad-Drehung (ca. 18 bis 28 cm für einen 180°-Turn). Präge dir den nötigen Mausweg physisch ein, anstatt die Sensitivität ständig zu ändern.",
          tips: "Eine fixe Mausempfindlichkeit ist das Fundament für verlässliche Muskelgedächtnis-Muster bei Blind-Flicks."
        },
        {
          name: "Flashbang-Ausweich- & Rückkehrbewegung",
          desc: "Trainiere das blitzschnelle Wegdrehen um 180 Grad bei herannahenden Blendgranaten mit sofortiger Rückkehr auf den ursprünglichen Winkel. So vermeidest du Blindheit und bleibst sofort feuerbereit.",
          tips: "Übe den Hin- und Rückschwung als zusammenhängende Doppelbewegung in unter 400 Millisekunden."
        },
        {
          name: "Zentrales Mauspad-Reset",
          desc: "Gewöhne dir an, die Maus in kurzen Feuerpausen oder beim Nachladen leicht anzuheben und wieder in die Mitte des Pads zurückzusetzen, um nicht am Pad-Rand festzuhängen.",
          tips: "Ein sauberer Zentrierungs-Reset garantiert, dass dir im nächsten Überraschungsduell nicht der Platz ausgeht."
        }
      ]
    },
    steps: [
      "Aktiviere den Trainer mit Klick ins Spielfeld, um die hardwarenahe Pointer-Lock-Mauseingabe zu starten.",
      "Platziere deine Maus exakt in der Mitte des Mauspads und halte das Fadenkreuz im Vorfeld ruhig.",
      "Sobald an den Bildschirmecken ein Ziel aufleuchtet, reiße die Maus mit weitem Armschwung in Richtung des Reizes.",
      "Bremse den Mausschwung vor dem Ziel ab und klicke erst, wenn das Fadenkreuz zentriert auf dem Target ruht.",
      "Nutze Trefferserien für maximale Combo-Punkte und meistere immer kleinere, schneller verschwindende Ziele."
    ],
    audience: "Spieler in Counter-Strike 2, Valorant, Apex Legends, Overwatch 2 und Rainbow Six Siege, die Flanken-Überraschungen eliminieren und Blind-Turns perfektionieren wollen.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'elliott2010', 'fitts1954', 'schmidt1979', 'leigh2015', 'rayner1998'),
    related: [
      { href: "/de/drills/fps/flick-shot-training", label: "Flick Shot Training" },
      { href: "/de/drills/fps/recoil-control", label: "Recoil Control Training" },
      { href: "/de/drills/fps/strafe-tracking", label: "Strafe Tracking Übung" },
      { href: "/de/drills/fps/micro-correction-precision", label: "Mikrokorrektur Aiming" }
    ]
  };

  const copyDe = {
    h1Keyword: "180 Grad Aiming",
    h1Suffix: " – FPS Snap Turn Trainer",
    statScore: "Punkte",
    statTime: "Zeit",
    statAccuracy: "Präzision",
    statBestScore: "Highscore",
    startTitle: "180° Awareness Pro",
    startSubtitle: "Hardware-Rohdaten • Endlose Levelprogression & Raumwahrnehmung",
    getReady: "BEREITMACHEN",
    pausedTitle: "Spiel Pausiert",
    pausedSubtitle: "Klicke in das Spielfeld, um die Mauszeiger-Sperre zu reaktivieren",
    stageCaption: "Erfasse Ziele an den Bildschirmrändern über dein peripheres Sehen und führe präzise 180-Grad-Drehungen aus.",
    rulesTitle: "Trainingsregeln & Punktesystem",
    rulesItems: [
      { title: "Zieltreffer (+100 Pkt)", text: "Trefferserien erhöhen den Combo-Multiplikator auf bis zu 3,0x." },
      { title: "180° Randzonen & Level-Steigerung", text: "Ziele erscheinen an den äußeren Rändern, schrumpfen und verlangen schnellere Reaktionszeiten." },
      { title: "Fehlschuss / Timeout", text: "Fehlklicks oder verpasste Ziele setzen die Combo zurück. Mit Strafzeit-Option verlierst du 0,8s." }
    ],
    aboutTitle: "Über das 180-Grad-Aim-Training",
    aboutHeading: "Was ist 180-Grad-Awareness-Training?",
    aboutText1: "Eine 180-Grad-Drehung ist die längste Mausbewegung im Shooter. Nach Fitts' Gesetz hängt die benötigte Zeit von der Distanz und der Zielgröße ab (Fitts, 1954). Die größte Herausforderung liegt im präzisen Abstoppen und blitzschnellen Einrasten auf dem Ziel.",
    aboutText2: "180° Awareness Pro trainiert gezielt die Verarbeitung visueller Reize außerhalb deines primären Blickfelds. Im Gegensatz zu reinen Mikrokorrektur-Übungen fordert dieser Drill weite räumliche Koordinatensprünge.",
    aboutText3: "Regelmäßiges Raumorientierungstraining verbindet deine physische Mauspad-Fläche nahtlos mit der virtuellen Spielwelt. Das ermöglicht instinktive Blind-Flicks und sofortige Reaktionen bei Flankenangriffen in CS2 und Valorant."
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

      <AwarenessDrillClient copy={copyDe} />

      <DrillGuide guide={awarenessGuideDe} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/180-degree-awareness"
          locale="de"
        />
      </div>
    </>
  );
}
