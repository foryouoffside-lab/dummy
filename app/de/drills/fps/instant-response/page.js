import InstantResponseClient from '@/app/drills/fps/instant-response/InstantResponseClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

// ============================================================
// GERMAN SEARCH KEYWORD RESEARCH & INTENT CLUSTERING (DACH)
// Primary queries: "FPS Reaktionszeit Test" (Core domestic query for shooter reflex measurement)
//                  "Klick Reaktionszeit FPS" (High technical category intent for click latency)
// Secondary:       "Aim Reflexe Trainieren", "Reaktionsgeschwindigkeit Shooter", "Maus Klick Latenz Test",
//                  "CS2 Reaktionszeit verbessern", "Valorant Trigger Reaktionszeit",
//                  "Visuelle Reaktionszeit Test", "Reflexe testen Gaming", "Trigger Finger Speed Test"
// Domain / LSI:    "Einfache visuelle Reaktionszeit" (Donders 1969), "Hick'sches Gesetz" (Hick 1952),
//                  "Visuelle Aufmerksamkeit" (Posner 1990), "Neuromuskuläre Latenz",
//                  "Hardware-Latenzkette" (Woods et al. 2015), "Display Refresh Rate",
//                  "Schalter-Vorlaufweg" (Pre-Travel Actuation), "Feint-Unterdrückung"
// Authentic Domain Terms: Reaktionszeit, Klicklatenz, Reflex-Training, Trigger-Geschwindigkeit,
//                         Angle-Holding-Reaktion, Schalter-Vorlauf
// ============================================================

export const metadata = {
  title: "FPS Reaktionszeit Test – Aim Reflex Trainer | SkillDrills",
  description: "Kostenloser FPS-Reaktionszeit-Test im Browser: Miss visuelle Reaktionszeit, Klicklatenz und Trigger-Reflexe in Millisekunden für CS2 und Valorant.",
  keywords: [
    "FPS Reaktionszeit Test",
    "Klick Reaktionszeit FPS",
    "Aim Reflexe Trainieren",
    "Reaktionsgeschwindigkeit Shooter",
    "Maus Klick Latenz Test",
    "CS2 Reaktionszeit verbessern",
    "Valorant Trigger Reaktionszeit",
    "Visuelle Reaktionszeit Test",
    "Reflexe testen Gaming",
    "Trigger Finger Speed Test",
    "Winkel Halten Reaktion",
    "Visuelle Latenz Shooter"
  ],
  alternates: {
    canonical: "https://skilldrills.online/de/drills/fps/instant-response",
    languages: getAlternateLanguages('/drills/fps/instant-response'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "FPS Reaktionszeit Test – Aim Reflex Trainer | SkillDrills",
    description: "Kostenloser FPS-Reaktionszeit-Test im Browser: Miss visuelle Reaktionszeit, Klicklatenz und Trigger-Reflexe in Millisekunden für CS2 und Valorant.",
    url: "https://skilldrills.online/de/drills/fps/instant-response",
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "FPS Reaktionszeit Test – Aim Reflex Trainer | SkillDrills",
    description: "Kostenloser FPS-Reaktionszeit-Test im Browser: Miss visuelle Reaktionszeit, Klicklatenz und Trigger-Reflexe in Millisekunden für CS2 und Valorant.",
  },
};

export default function InstantResponseDePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/de" },
      { "@type": "ListItem", "position": 2, "name": "FPS Aim Training", "item": "https://skilldrills.online/de/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "FPS Reaktionszeit Test", "item": "https://skilldrills.online/de/drills/fps/instant-response" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FPS Reaktionszeit Test – Aim Reflex Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "FPS Reaktionszeit Trainer",
    "url": "https://skilldrills.online/de/drills/fps/instant-response",
    "applicationCategory": "Trainer",
    "browserRequirements": "Requires Pointer Lock API, modern web browser, 60Hz+ monitor recommended"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "FPS Reaktionszeit Trainer",
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
        "name": "Was ist der Unterschied zwischen einfacher visueller Reaktionszeit und FPS-In-Game-Reaktionszeit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die einfache visuelle Reaktionszeit (Donders, 1969) misst lediglich die Latenz auf einen simplen Farbumschlag (ca. 160–220 ms). In einem FPS wie CS2 oder Valorant kommen Entscheidungszeiten (Hick, 1952), räumliche Zielidentifikation und Fadenkreuz-Ausrichtung hinzu, wodurch Ingame-Reaktionen meist zwischen 200 und 350 ms liegen."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Reaktionszeit gilt unter professionellen CS2- und Valorant-Spielern als Richtwert?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Professionelle Esportler erreichen bei einfachen visuellen Stimuli Reaktionszeiten von 140 bis 180 ms. In echten Wettkampf-Peeks und beim Verteidigen enger Blickwinkel (Angle Holding) liegen ihre Reaktionswerte typischerweise zwischen 180 und 230 ms."
        }
      },
      {
        "@type": "Question",
        "name": "Wie setzt sich die menschliche neuromuskuläre Kette bis zum Klick zusammen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die Kette umfasst vier Stationen: 1. Photoneneinfall auf die Netzhaut (ca. 20–40 ms), 2. Signalübertragung über Sehnerv zum visuellen Kortex (ca. 30–50 ms), 3. Kortikale Reizverarbeitung und Signal an den Motorkortex (ca. 40–70 ms), 4. Efferente Nervenleitung in die Zeigefingermuskulatur und Schalterauslösung (ca. 30–50 ms)."
        }
      },
      {
        "@type": "Question",
        "name": "Warum bestraft dieser Trainer verfrühtes Klicken (Pre-Firing)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Klicken auf Verdacht ohne echten visuellen Reiz (Anticipation) führt im echten Shooter zu fehlerhaftem Sprühen, Positionsverrat und sofortigem Duellverlust. Der Trainer erzwingt strikte Schussdisziplin, indem er Täuschungsreize einstreut und Fehlstarts mit Combo-Verlust ahndet."
        }
      },
      {
        "@type": "Question",
        "name": "Wie viel Latenz steuern Monitor, Maus-Polling-Rate und Mausschalter bei?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ein 60-Hz-Display erzeugt bis zu 16,6 ms Bildverzögerung, ein 240-Hz-Monitor nur 4,1 ms. Eine 1000-Hz-Maus liefert Signale im 1-ms-Takt, während mechanische Schalter oft 2–8 ms Entprellzeit (Debounce Delay) benötigen. Optische Schalter reduzieren diesen Wert auf unter 0,2 ms (Woods et al., 2015)."
        }
      },
      {
        "@type": "Question",
        "name": "Kann man seine Reaktionszeit durch gezieltes Training dauerhaft verkürzen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja. Während die reine Leitungsgeschwindigkeit der Nervenbahnen biologisch begrenzt ist, lässt sich die kortikale Verarbeitungszeit und motorische Reaktionsbereitschaft durch regelmäßiges Training um 15 bis 40 Millisekunden optimieren."
        }
      },
      {
        "@type": "Question",
        "name": "Welchen Einfluss haben Schlaf, Koffein und Ermüdung auf die Klicklatenz?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Schlafmangel und kognitive Erschöpfung verlangsamen die Reaktionszeit messbar um 30 bis 80 ms. Mäßiger Koffeinkonsum kann die Wachheit kurzfristig um 10 bis 20 ms steigern, führt bei Überdosierung jedoch zu Zittern und Fehlklicks."
        }
      },
      {
        "@type": "Question",
        "name": "Was unterscheidet diesen Trainer von einfachen Online-Ampel-Tests?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dieser Trainer läuft in einer 3D-Canvas-Umgebung mit hardwarenahem Pointer-Lock, dynamisch skalierenden Zeitfenstern, visuellen Täuschungsreizen (Feints) und einer progressiven Schwierigkeitskurve – exakt abgestimmt auf Wettkampf-Shooter."
        }
      },
      {
        "@type": "Question",
        "name": "Wie sollte man den Zeigefinger positionieren, um die Klickverzögerung zu minimieren?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Der Zeigefinger sollte leicht vorgespannt direkt auf der Klickfläche der Maustaste ruhen, ohne Spiel (Pre-Travel). Dadurch entfällt der mechanische Leerweg, und die Auslösung erfolgt unmittelbar bei Kontraktion der Beugemuskulatur."
        }
      },
      {
        "@type": "Question",
        "name": "Warum nutzt dieser Trainer die Pointer-Lock-API?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die HTML5-Pointer-Lock-API umgeht die Windows-Zeigerbeschleunigung und Verarbeitungsengpässe des Desktop-Window-Managers, um direkte Hardware-Rohdaten ohne Verzerrung bereitzustellen."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "FPS-Reaktionszeit & Trigger-Geschwindigkeit in 4 Schritten trainieren",
    "description": "Strukturierte Anleitung zur Minimierung von Klicklatenz und Schussverzögerung in Shootern.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Mauszeiger sperren und Hardware kalibrieren",
        "text": "Klicke auf Training starten, um den Vollbildmodus und die Pointer-Lock-API zu aktivieren. Schließe Hintergrundprogramme für minimale Systemlatenz."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Blickpunkt zentrieren und Finger vorspannen",
        "text": "Richte deine Aufmerksamkeit auf das Fadenkreuz im Zentrum und lege den Zeigefinger spielfrei auf die linke Maustaste."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Blitzartiges Auslösen bei echtem Farbumschlag",
        "text": "Sobald das Ziel grün aufleuchtet, löse den Klickimpuls reflexartig aus. Ignoriere dunklere Täuschungsreize."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Reaktions-Latenz analysieren und steigern",
        "text": "Prüfe deine mittlere Reaktionszeit in Millisekunden und halte deine Trefferserie aufrecht, um höhere Tempolevels freizuschalten."
      }
    ]
  };

  const instantResponseGuideDe = {
    heading: "FPS-Reaktionszeit & Reflex-Aiming – Wissenschaftlicher Trainingsleitfaden",
    subtitle: "Messung und Steigerung von visueller Reaktionslatenz, Klickgeschwindigkeit und Schussdisziplin für CS2 und Valorant",
    intro: [
      "Die visuelle Reaktionszeit ist das fundamentalste physiologische Nadelöhr im Ego-Shooter. Wenn zwei gleichwertige Spieler aufeinandertreffen und beide ihr Fadenkreuz perfekt platziert haben, entscheidet die Millisekundendifferenz zwischen Reizwahrnehmung und Schalterauslösung über Sieg oder Niederlage. Die grundlegende Reaktionszeit eines gesunden Erwachsenen auf einen einfachen visuellen Stimulus liegt bei 200 bis 250 Millisekunden (Donders, 1969; Luce, 1986). Ambitionierte Esportler drücken diesen Wert durch neuronales Training und Hardware-Optimierung auf unter 170 Millisekunden.",
      "Die sensorische Latenzkette gliedert sich in vier präzise Abschnitte: Zunächst treffen Photonen auf die Photorezeptoren der Netzhaut (Transduktion: 20–40 ms). Das Signal wandert über den Nervus opticus zum primären visuellen Kortex (30–50 ms). Dort erfolgt die Reizerkennung und die Weiterleitung an den Motorkortex (Posner, 1990; Hick, 1952). Schließlich feuert das pyramidale motorische System ein efferentes Aktionspotenzial über das Rückenmark in die Beugemuskeln des Zeigefingers (Flexor digitorum: 30–50 ms).",
      "Zu dieser biologischen Latenzkette addiert sich die physikalische Hardware-Verzögerung deines Gaming-Setups (Woods et al., 2015). Ein Standard-60-Hz-Monitor zeigt Bilder nur alle 16,6 Millisekunden an. Ein 240-Hz-Display reduziert diese Anzeigelatenz auf 4,1 Millisekunden. In Kombination mit einer 1000-Hz-Maus (1 ms Abfrageintervall) und optischen Mikroschaltern (unter 0,2 ms Debounce) wird sichergestellt, dass deine physiologische Reaktionsfähigkeit verlustfrei im Spiel ankommt.",
      "Messpräzision & Transparenz: Dieser Trainer erfasst Klickzeiten über die hochpräzise performance.now()-Schnittstelle deines Browsers auf Mikrosekunden-Ebene. Abweichungen im Bereich von 3 bis 7 ms spiegeln das Hardware-Frame-Intervall deines Monitors wider. Ein systematisches Training stärkt die synaptische Plastizität und stabilisiert deine Reflexe auch in nervenaufreibenden Clutch-Runden."
    ],
    benchmarks: {
      title: "FPS-Reaktionszeit & Klick-Latenz-Benchmarks (Millisekunden & Perzentile)",
      headers: ["Leistungsstufe (Tier)", "Reaktionszeit (ms)", "Neurologische Klassifikation", "Wettkampf-Einfluss im Spiel"],
      rows: [
        ["Tier 1 (Profi / Tier 1 Esport)", "< 160 ms", "Genetisch & trainingstechnisch maximale neuronale Leitgeschwindigkeit", "Gewinnt praktisch jedes direkte Halte- und Peek-Duell auf der Kopflinie."],
        ["Tier 2 (Elite / Faceit Lv10 & Radiant)", "160 – 190 ms", "Außergewöhnlich schnelle Reizverarbeitung und efferente Entladung", "Dominante Reflexe; kontert Crosshair-Placement-Fehler blitzschnell."],
        ["Tier 3 (Erfahren / Diamant & Ascendant)", "190 – 225 ms", "Überdurchschnittliche Reaktionsfähigkeit ambitionierter Gamer", "Solide Klickgeschwindigkeit; verliert nur gegen Spitzenreaktionen."],
        ["Tier 4 (Fortgeschritten / Gold & Platin)", "225 – 265 ms", "Durchschnittliche visuelle Reaktionszeit gesunder Erwachsener", "Gute Reaktionszeit; erfordert exzellentes Crosshair Placement als Ausgleich."],
        ["Tier 5 (Einsteiger / Silber & Casual)", "> 265 ms", "Verzögerte Reiz-Reaktions-Kopplung oder Hardware-Latenzen", "Häufiges Unterliegen in Reaktionsduellen; Schüsse fallen spürbar zu spät."]
      ],
      note: "Die Werte umfassen die vollständige Kette aus sensorischer Reizleitung, kortikaler Verarbeitung, motorischer Impulsauslösung und Display-/Maus-Hardwarelatenz (Donders, 1969; Posner, 1990; Hick, 1952; Woods et al., 2015)."
    },
    techniques: {
      title: "Biomechanische & kognitive Methoden zur Reaktionszeitverkürzung",
      items: [
        {
          name: "Fingerkuppen-Vorspannung am Mausschalter",
          desc: "Halte den Zeigefinger in permanentem, leichtem Kontakt mit dem Auslösepunkt der Maustaste. Das Voraktivieren des motorischen Kortex eliminiert den mechanischen Leerweg und spart 20 bis 35 Millisekunden Auslöseverzögerung.",
          tips: "Halte das Handgelenk entspannt, sodass ausschließlich das vorderste Fingerglied den Schalter betätigt."
        },
        {
          name: "Foveale Reizfokussierung",
          desc: "Fokussiere deine visuelle Aufmerksamkeit scharf auf das Fadenkreuzzentrum. Die foveale Netzhautmitte besitzt die höchste Dichte an Zapfenrezeptoren für maximale Kontrastwahrnehmung (Posner, 1990).",
          tips: "Vermeide starres Starren ohne Blinzeln; trockene Augen verlängern die Reizleitungszeit."
        },
        {
          name: "Disziplinierte Feint-Unterdrückung",
          desc: "Unterdrücke verfrühtes reflexartiges Klicken auf Verdacht. Echtes Wettkampf-Aiming verlangt die Kombination aus maximaler Schnelligkeit und konsequenter Impulskontrolle bei Täuschungsreizen.",
          tips: "Atme zwischen den Runden tief durch die Nase, um nervöse Fehlauslösungen durch Adrenalinspitzen zu neutralisieren."
        },
        {
          name: "Hardware-Latenzminimierung",
          desc: "Verwende einen Gaming-Monitor mit mindestens 144 Hz oder 240 Hz, aktiviere NVIDIA Reflex / AMD Anti-Lag und deaktiviere V-Sync, um Bildpufferverzögerungen vollständig zu eliminieren.",
          tips: "Eine Maus-Abfragerate von 1000 Hz oder höher stellt sicher, dass der Klickimpuls innerhalb von 1 ms an das Spiel übertragen wird."
        }
      ]
    },
    steps: [
      "Stelle sicher, dass Hintergrundprogramme geschlossen sind, um maximale FPS und minimale Systemlatenz zu garantieren.",
      "Klicke auf Training starten, um den Vollbildmodus und die Pointer-Lock-API zu aktivieren.",
      "Fokussiere das zentrale Fadenkreuz, während dein Zeigefinger spielfrei auf der Maustaste aufliegt.",
      "Klicke blitzartig im exakten Moment des grünen Farbumschlags und widerstehe verfrühten Täuschungsreizen.",
      "Analysiere nach Rundenende deine Durchschnittsreaktionszeit in Millisekunden und optimiere deine Klickdisziplin."
    ],
    audience: "Wettkampfspieler in Counter-Strike 2, Valorant, Rainbow Six Siege, Apex Legends und Call of Duty, die ihre Klickreaktionszeit auf Millisekunden-Niveau trimmen wollen.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'posner1990', 'donders1969', 'hick1952'),
    related: [
      { href: "/de/drills/fps/flick-shot-training", label: "Flick Shot Training" },
      { href: "/de/drills/fps/micro-correction-precision", label: "Mikrokorrektur Aiming" },
      { href: "/de/drills/fps/180-degree-awareness", label: "180 Grad Aiming" },
      { href: "/de/drills/reaction-speed/reaction-time-test", label: "Reaktionszeittest" }
    ]
  };

  const copyDe = {
    h1Keyword: "FPS Reaktionszeit Test",
    h1Suffix: " – Aim Reflex Trainer",
    statScore: "Punkte",
    statTime: "Zeit",
    statAccuracy: "Präzision",
    statBestScore: "Highscore",
    startTitle: "FPS Reaktionszeit Test",
    startSubtitle: "Visuelle Reaktionslatenz & Reflexe • Endlose Levelprogression",
    getReady: "BEREITMACHEN",
    pausedTitle: "Spiel Pausiert",
    pausedSubtitle: "Klicke in das Spielfeld, um die Mauszeiger-Sperre zu reaktivieren",
    stageCaption: "Klicke im exakten Moment des grünen Aufleuchtens. Halte strikte Disziplin gegen verfrühte Täuschungsreize.",
    rulesTitle: "Trainingsregeln & Punktesystem",
    rulesItems: [
      { num: "1", text: "Reflex-Treffer", highlight: "+100 Pkt", result: "Sofortiger Klick bei grünem Farbumschlag" },
      { num: "2", text: "Geschwindigkeits-Bonus", highlight: "bis zu +150 Pkt", result: "Extrapunkte für Reaktionen unter 150 ms" },
      { num: "3", text: "Levelaufstieg", highlight: "alle 1.400 Punkte", result: "Kürzere Aufleuchtzeiten fordern schnellere Reflexe" },
      { num: "4", text: "Fehlklick / Frühstart", highlight: "Strafe", result: "Combo-Reset (bei Strafzeit-Option -0,8s)" }
    ],
    aboutTitle: "Über das FPS-Reaktionszeit-Training",
    aboutHeading: "Was ist das FPS-Reaktionszeit-Training?",
    aboutText1: "Die FPS-Reaktionszeit bezeichnet das zeitliche Intervall vom ersten optischen Erfassen eines Gegners bis zum physischen Mausklick. Bei gesunden Erwachsenen liegt dieser Wert bei 200 bis 250 Millisekunden (Donders, 1969; Woods et al., 2015).",
    aboutText2: "Dieser Trainer isoliert deine visuelle Klickreaktion und schult dein Nervensystem darauf, Reize im zentralen Sichtfeld mit minimaler synaptischer Verzögerung in motorische Impulse umzusetzen.",
    aboutText3: "Gleichzeitig trainierst du deine Impulskontrolle: Zufällige Verzögerungen und Täuschungsreize zwingen dich dazu, erst bei echter Reizbestätigung auszulösen, statt unkontrolliert auf Verdacht vorzuschießen."
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

      <InstantResponseClient copy={copyDe} />

      <DrillGuide guide={instantResponseGuideDe} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/instant-response"
          locale="de"
        />
      </div>
    </>
  );
}
