import MicroCorrectionClient from '@/app/drills/fps/micro-correction-precision/MicroCorrectionClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

// ============================================================
// GERMAN SEARCH KEYWORD RESEARCH & INTENT CLUSTERING (DACH)
// Primary queries: "Mikrokorrektur Aiming" (Core technical micro-adjustment query in DACH)
//                  "Micro Adjustment FPS" (Widespread technical shooter term in DE/AT/CH)
// Secondary:       "Headshot Feinjustierung", "Maus Mikrokorrektur CS2", "Flick Shot Feinkorrektur",
//                  "Aim Präzision verbessern", "Mikro Flick Training", "Maus Bremskontrolle",
//                  "Valorant Headshot Training", "Mauspad Reibung Kontrolle"
// Domain / LSI:    "Zwei-Komponenten-Modell" (Woodworth 1899, Meyer 1988), "Fitts Gesetz" (Index of Difficulty),
//                  "Endphasen-Verzögerung" (Terminal Deceleration), "Mikrosakkaden" (Martinez-Conde 2004, Rolfs 2009),
//                  "Foveale Zielerfassung", "Fingertip-Feinjustierung", "Target Confirmation"
// Authentic Domain Terms: Mikrokorrektur, Micro Adjustment, Bremskontrolle (Deceleration Braking),
//                         Feinjustierung, Zielbestätigung (Target Confirmation)
// ============================================================

export const metadata = {
  title: "Mikrokorrektur Aiming – FPS Headshot Trainer | SkillDrills",
  description: "Mikrokorrektur-Aiming im Browser: Trainiere Feinjustierung nach dem ersten Flick, Bremskontrolle und Headshot-Präzision für CS2 und Valorant.",
  keywords: [
    "Mikrokorrektur Aiming",
    "Mikrojustierung FPS",
    "Headshot Feinjustierung",
    "Maus Mikrokorrektur CS2",
    "Flick-Shot Feinkorrektur",
    "Aim Präzision verbessern",
    "Mikro Flick Training",
    "Maus Bremskontrolle",
    "Valorant Headshot Training",
    "Mauspad Gleitkontrolle",
    "Sub-Pixel Aiming Deutsch",
    "Taktischer Shooter Präzision"
  ],
  alternates: {
    canonical: "https://skilldrills.online/de/drills/fps/micro-correction-precision",
    languages: getAlternateLanguages('/drills/fps/micro-correction-precision'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Mikrokorrektur Aiming – FPS Headshot Trainer | SkillDrills",
    description: "Mikrokorrektur-Aiming im Browser: Trainiere Feinjustierung nach dem ersten Flick, Bremskontrolle und Headshot-Präzision für CS2 und Valorant.",
    url: "https://skilldrills.online/de/drills/fps/micro-correction-precision",
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mikrokorrektur Aiming – FPS Headshot Trainer | SkillDrills",
    description: "Mikrokorrektur-Aiming im Browser: Trainiere Feinjustierung nach dem ersten Flick, Bremskontrolle und Headshot-Präzision für CS2 und Valorant.",
  },
};

export default function MicroCorrectionDePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/de" },
      { "@type": "ListItem", "position": 2, "name": "FPS Aim Training", "item": "https://skilldrills.online/de/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Mikrokorrektur Aiming", "item": "https://skilldrills.online/de/drills/fps/micro-correction-precision" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Mikrokorrektur Aiming – FPS Headshot Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Mikrokorrektur Aiming Trainer",
    "url": "https://skilldrills.online/de/drills/fps/micro-correction-precision",
    "applicationCategory": "Trainer",
    "browserRequirements": "Requires Pointer Lock API, modern web browser, 60Hz+ monitor recommended"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Mikrokorrektur Aiming Trainer",
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
        "name": "Was versteht man unter 'Bremskontrolle' (Terminal Deceleration) beim Zielen in FPS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bremskontrolle beschreibt die neuromuskuläre Fähigkeit, eine schnelle ballistische Mausbewegung kurz vor dem Zielpunkt gezielt abzubremsen. Dies geschieht durch kontrollierten Gegendruck der Fingermuskulatur und gezielte Nutzung der Mauspad-Reibung, um ein Überschießen (Overshoot) der gegnerischen Hitbox zu verhindern."
        }
      },
      {
        "@type": "Question",
        "name": "Warum verfehlt der erste schnelle Flick oft knapp den Kopf des Gegners (Overflick)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Initiale Flickbewegungen erfolgen rein ballistisch (Open-Loop), da das visuelle Feedbacksystem des Menschen etwa 120 bis 160 ms benötigt, um Korrekturen vorzunehmen. Ist die eDPI zu hoch oder die Antagonisten-Muskulatur der Finger noch nicht optimal eingespielt, überwindet die Trägheit der Hand die Zielbremse, was zu einem knappen Vorbeischießen führt."
        }
      },
      {
        "@type": "Question",
        "name": "Wie beschreibt das Zwei-Komponenten-Modell (Woodworth & Meyer) die Mikrokorrektur?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bereits 1899 stellte Robert S. Woodworth fest, dass gezielte menschliche Bewegungen in zwei Phasen ablaufen: eine schnelle Anfangsphase zur groben Raumüberbrückung und eine finale, visuell geführte Feinkorrekturphase (Closed-Loop). Meyer et al. (1988) wiesen mathematisch nach, dass die finale Mikrokorrektur über den eigentlichen Treffererfolg entscheidet."
        }
      },
      {
        "@type": "Question",
        "name": "Wie trainieren professionelle Valorant- und CS2-Spieler ihre Feinjustierung?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Profis trainieren eine saubere Zweiteilung: Sie führen den ersten groben Flick mit Unterarm oder Handgelenk aus, stoppen die Bewegung über das Mauspad ab und nutzen für die verbleibenden 5 bis 15 Pixel ausschließlich die Fingerkuppen (Fingertip-Micro-Adjustment), um das Fadenkreuz pixelgenau auf die Kopflinie zu setzen."
        }
      },
      {
        "@type": "Question",
        "name": "Was versteht man unter 'Target Confirmation' (Zielbestätigung) vor dem Schuss?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Target Confirmation bezeichnet die bewusste mikrosekundenschnelle visuelle Verifizierung, dass das Fadenkreuz tatsächlich zentriert auf dem Kopfziel ruht, bevor der Klickimpuls ausgelöst wird (Rolfs, 2009). Dieses Prinzip verhindert hastige Fehlschüsse und Recoil-Verschwendung."
        }
      },
      {
        "@type": "Question",
        "name": "Verbessert regelmäßiges Mikro-Flick-Training die Headshot-Trefferquote messbar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, signifikant. In taktischen Shootern gelingt der initiale Flick selten zu 100 % perfekt auf der Stirn des Gegners. Spieler mit geschulter Mikrokorrektur verwandeln unvollständige Flicks innerhalb von 120 bis 180 ms in tödliche One-Taps, anstatt in unkontrollierte Spray-Duelle abzugleiten."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Rolle spielen Bildwiederholfrequenz (Hz) und Maus-Polling-Rate bei Mikrobewegungen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Eine hohe Bildwiederholfrequenz (144 Hz, 240 Hz oder 360 Hz) verkürzt den Bildabstand auf 4 bis 7 ms und eliminiert Bewegungsunschärfe. Eine Maus-Polling-Rate von 1000 Hz oder höher liefert lückenlose Mikrobewegungssignale, sodass selbst 1-Pixel-Korrekturen verzögerungsfrei umgesetzt werden."
        }
      },
      {
        "@type": "Question",
        "name": "Wie oft und wie lange sollte man Mikrokorrekturen trainieren, um Überlastung zu vermeiden?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tägliche Trainingseinheiten von 15 bis 20 Minuten genügen vollkommen. Da Mikrobewegungen höchste neuromuskuläre Konzentration der kleinen Hand- und Fingermuskeln erfordern, führt Übermüdung rasch zu fehlerhaftem motorischem Lernen."
        }
      },
      {
        "@type": "Question",
        "name": "Welcher Mausgriff (Fingertip, Claw, Palm) eignet sich am besten für feine Korrekturen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fingertip-Grip und entspannter Claw-Grip bieten die größte Bewegungsfreiheit, da die Fingergelenke den Mauskörper vertikal und horizontal um wenige Millimeter verschieben können. Ein reiner Palm-Grip blockiert diese Fingerbewegung meist und zwingt zu unpräziseren Handgelenksbewegungen."
        }
      },
      {
        "@type": "Question",
        "name": "Warum führen Fehlklicks oder Zeitüberschreitungen in diesem Trainer zum Combo-Reset?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Der Combo-Reset erzwingt Schussdisziplin (Shot Discipline). Reines unkontrolliertes Schnellfeuern ohne optische Zielbestätigung wird konsequent bestraft, um ein biomechanisch sauberes Zusammenspiel aus Bremsung, Feinjustierung und Klick zu etablieren."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Mikrokorrektur & Bremskontrolle in 4 Trainingsschritten",
    "description": "Strukturierte Anleitung zur Beherrschung von Terminal Deceleration und Fingerkuppen-Feinkorrektur im FPS-Aiming.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Mausempfindlichkeit und Raw-Input kalibrieren",
        "text": "Stelle DPI und Ingame-Sensibilität identisch zu deinem Hauptspiel ein. Stelle sicher, dass die Pointer-Lock-API aktiv ist und keine Windows-Mausbeschleunigung stört."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Initial-Flick auf das primäre Ankerziel",
        "text": "Führe einen schnellen ballistischen Flick auf das erscheinende Ankerziel aus und klicke es zügig an, um das benachbarte Mikroziel freizuschalten."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Aktives Abbremsen über Handballendruck",
        "text": "Stoppe die Restenergie der Mausbewegung unmittelbar im Nahbereich des Mikroziels ab, indem du leichten Druck auf das Mauspad ausübst."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Fingertip-Feinjustierung und Zielbestätigung",
        "text": "Bewege das Fadenkreuz mit den Fingergelenken die letzten Pixel ins Zentrum des Mikroziels und löse den Klick erst nach visueller Verifizierung aus."
      }
    ]
  };

  const microCorrectionGuideDe = {
    heading: "Mikrokorrektur Aiming – Wissenschaftlicher Trainingsleitfaden",
    subtitle: "Meistere Bremskontrolle, Endphasen-Verzögerung und Fingerkuppen-Feinjustierung für maximale Headshot-Präzision in taktischen Shootern",
    intro: [
      "Mikrokorrektur Aiming (Micro-Adjustment) ist die entscheidende biomechanische Schnittstelle im modernen Wettkampf-Shooter. Wenn in Counter-Strike 2 oder Valorant ein 30-Grad-Flick nur 10 bis 15 Pixel neben der Schläfe des Gegners stoppt, gewinnt derjenige das Duell, der diese minimale Distanz innerhalb von 120 bis 160 Millisekunden ohne Überschwingen schließt. Der erste ballistische Impuls bringt das Fadenkreuz in die Nahzone – erst die nachfolgende Mikrokorrektur erzielt den tödlichen Kopfschuss.",
      "Die wissenschaftliche Grundlage dieses Bewegungsmusters legten Robert S. Woodworth (1899) und später David E. Meyer et al. (1988) mit dem Zwei-Komponenten-Modell zielgerichteter Bewegungen. Jeder Zielvorgang spaltet sich in eine schnelle, ungeführte ballistische Anfangsbewegung (Open-Loop) und eine darauffolgende visuell rückgekoppelte Feinkorrekturphase (Closed-Loop). Ergänzend belegen Susana Martinez-Conde et al. (2004) sowie Martin Rolfs (2009), dass das menschliche Sehsystem winzige Mikrosakkaden nutzt, um die foveale Mitte scharfzustellen – ein Prozess, der eine millimetergenaue Zielbestätigung vor der Klickauslösung erfordert.",
      "Nach Paul M. Fitts (1954) steigt der Schwierigkeitsgrad einer Zielaufgabe (Index of Difficulty) logarithmisch an, je kleiner das Trefferziel im Verhältnis zur Bewegungsdistanz wird. Bei extrem kleinen Kopfhitboxen auf Distanz stößt das Arm- und Handgelenk an seine mechanischen Grenzen. Dieser Trainer schult die Entkopplung von Arm-Schwung und Fingerkuppen-Bremsung (Woods et al., 2015), um die Trägheit des Mauskörpers über Mauspad-Friktion schlagartig zu neutralisieren.",
      "Messpräzision & Hardware-Transparenz: Dieses Training nutzt performance.now() mit Mikrosekundenauflösung zur exakten Zeitmessung zwischen Anker-Klick und Mikroziel-Treffer. Beachte, dass dein Monitor bei 60 Hz alle 16,6 ms ein neues Bild darstellt, während ein 240-Hz-Display diesen Intervall auf 4,1 ms senkt. Gemessene Abweichungen unter 5 ms spiegeln daher die physikalischen Aktualisierungszyklen deines Monitors wider."
    ],
    benchmarks: {
      title: "Mikrokorrektur-Latenz & Präzisions-Benchmarks (Millisekunden & Trefferquote)",
      headers: ["Leistungsstufe (Skill-Tier)", "Korrekturzeit (ms)", "Mikro-Trefferquote", "Taktischer Nutzen im Match"],
      rows: [
        ["Tier 1 (Profi / Radiant & Faceit Lv10)", "< 140 ms", "95% – 99%+", "Flick und Feinjustierung verschmelzen zu einer reflexartigen Einheit; maximale One-Tap-Quote."],
        ["Tier 2 (Elite / Unsterblich & Faceit Lv8-9)", "140 – 190 ms", "88% – 95%", "Hervorragende Bremskontrolle; verfehlte Initial-Flicks werden blitzschnell korrigiert."],
        ["Tier 3 (Erfahren / Diamant & Ascendant)", "190 – 250 ms", "80% – 88%", "Solide Feinkorrektur; leichte Handgelenksanspannung führt gelegentlich zu minimalem Overshoot."],
        ["Tier 4 (Fortgeschritten / Gold & Platin)", "250 – 340 ms", "70% – 80%", "Verzögerte Bremsung; Ziel wird oft überrissen, was zeitraubende Doppelkorrekturen erzwingt."],
        ["Tier 5 (Einsteiger / Silber & Bronze)", "> 340 ms", "< 70%", "Fehlende Fingergelenk-Nutzung; Korrekturen erfolgen mit dem ganzen Arm, was zu Fehlschüssen führt."]
      ],
      note: "Die durchschnittliche Korrekturzeit bemisst das Intervall zwischen dem Klick auf das Ankerziel und dem präzisen Treffer auf das nachfolgende Mikro-Ziel (Woods et al., 2015)."
    },
    techniques: {
      title: "Biomechanische Kerntechniken für fehlerfreie Mikrokorrekturen",
      items: [
        {
          name: "Fingertip-Mikro-Stroke (Fingerkuppen-Führung)",
          desc: "Verändere bei Distanzen unter 20 Pixeln nicht die Arm- oder Handgelenksposition, sondern beuge und strecke ausschließlich Daumen, Ringfinger und kleinen Finger, um die Maus feinfühlig zu verschieben.",
          tips: "Lege den Handballen als stabilen Anker leicht auf dem Pad ab, damit die Finger maximalen Hebel haben."
        },
        {
          name: "Friktionsbremsung über das Mauspad",
          desc: "Nutze die Reibung des Mauspads als aktive Bremse. Durch minimalen Abwärtsdruck kurz vor Zielerreichung wird die Trägheit des Mauskörpers schlagartig gestoppt.",
          tips: "Vermeide dauerhaftes Verkrampfen: Übe den Druck nur für den Bruchteil einer Sekunde beim Abstoppen aus."
        },
        {
          name: "Visuelle Zielbestätigung (Target Confirmation)",
          desc: "Drücke die Maustaste erst dann durch, wenn dein Auge das Fadenkreuz im Zentrum des Mikroziels fixiert hat. Unbestätigte Klicks führen zu unsauberen Treffermustern.",
          tips: "Trainiere zunächst auf 100 % Trefferquote, bevor du versuchst, die Korrekturzeit künstlich zu beschleunigen."
        },
        {
          name: "Zwei-Takt-Rhythmus (Anker – Stopp – Klick)",
          desc: "Etabliere einen gleichmäßigen Takt aus initialem Anker-Treffer, kontrolliertem Stopp und finalem Mikro-Klick, um unter Wettkampfstress Muskelblockaden zu verhindern.",
          tips: "Ein sauberer Bewegungsrhythmus verhindert hektisches Verreißen der Maus in engen Clutch-Situationen."
        }
      ]
    },
    steps: [
      "Stelle deine Ingame-Sensibilität ein und aktiviere die Pointer-Lock-API für direkte 1:1 Rohdatenübertragung.",
      "Führe einen raschen ballistischen Flick auf das große Ankerziel aus und klicke es an.",
      "Bremse die Mausbewegung sofort ab und lokalisiere das unmittelbar daneben auftauchende Mikro-Ziel.",
      "Justiere das Fadenkreuz mit den Fingerkuppen nach und löse bei Zielbestätigung den Schuss aus.",
      "Halte deine Trefferserie aufrecht, um hohe Combo-Boni zu erzielen und immer kleinere Zielradien zu meistern."
    ],
    audience: "Wettkampfspieler in Counter-Strike 2, Valorant, Rainbow Six Siege und Apex Legends, die ihre Kopfschuss-Quote maximieren und verfehlte Flicks blitzschnell korrigieren wollen.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'meyer1988', 'martinezConde2004', 'rolfs2009', 'woodworth1899'),
    related: [
      { href: "/de/drills/fps/flick-shot-training", label: "Flick Shot Training" },
      { href: "/de/drills/fps/recoil-control", label: "Recoil Control Training" },
      { href: "/de/drills/fps/strafe-tracking", label: "Strafe Tracking Übung" },
      { href: "/de/drills/reaction-speed/reaction-time-test", label: "Reaktionszeittest" }
    ]
  };

  const copyDe = {
    h1Keyword: "Mikrokorrektur Aiming",
    h1Suffix: " – FPS Headshot Trainer",
    statScore: "Punkte",
    statTime: "Zeit",
    statAccuracy: "Präzision",
    statBestScore: "Highscore",
    statAvgCorrection: "Korrekturzeit",
    statMaxCombo: "Max Combo",
    statPeakLevel: "Level",
    startTitle: "Mikrokorrektur Aiming Trainer",
    startSubtitle: "Hardware-Rohdaten • Endlose Levelprogression & Bremskontrolle",
    getReady: "BEREITMACHEN",
    toggleFlash: "Fehlschuss-Aufleuchten umschalten",
    toggleSound: "Soundeffekte umschalten",
    pausedTitle: "Spiel Pausiert",
    pausedSubtitle: "Klicke in das Spielfeld, um die Mauszeiger-Sperre zu reaktivieren.",
    stageCaption: "Klicke das Ankerziel an und korrigiere dein Fadenkreuz sofort mit feiner Fingerbewegung auf das Mikroziel.",
    rulesTitle: "Trainingsregeln & Punktesystem",
    rulesItems: [
      { num: "1", text: "Ankerziel treffen", highlight: "+10 Pkt (+0,2s)", result: "Schaltet benachbartes Mikroziel frei" },
      { num: "2", text: "Mikroziel treffen", highlight: "bis +585 Pkt (+0,2s)", result: "Punkte skalieren mit Präzision & Combo" },
      { num: "3", text: "Levelaufstieg", highlight: "alle 1.400 Punkte", result: "Zielgrößen schrumpfen kontinuierlich" },
      { num: "4", text: "Fehlschuss / Timeout", highlight: "Strafe", result: "Combo-Multiplikator wird sofort zurückgesetzt" }
    ],
    aboutTitle: "Über das Mikrokorrektur-Training",
    aboutHeading: "Was ist Mikrokorrektur-Aiming?",
    aboutText: "Gezielte Zielbewegungen bestehen aus zwei Phasen: einem schnellen ballistischen Schwung und einer feinen, visuell geführten Korrekturbewegung nahe dem Ziel (Woodworth, 1899; Meyer et al., 1988). Dieser Trainer schult die zweite Phase, in der über Treffer oder Vorbeischuss entschieden wird."
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

      <MicroCorrectionClient copy={copyDe} />

      <DrillGuide guide={microCorrectionGuideDe} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/micro-correction-precision"
          locale="de"
        />
      </div>
    </>
  );
}
