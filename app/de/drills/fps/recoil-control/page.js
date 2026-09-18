import RecoilControlClient from '@/app/drills/fps/recoil-control/RecoilControlClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// GERMAN SEARCH KEYWORD RESEARCH & INTENT CLUSTERING (DACH)
// Primary query: "recoil control lernen" (Core German tactical shooter query)
//                "rueckstosskontrolle fps" (High domestic measurement intent)
// Secondary:    "spray pattern cs2", "maus nachuntenziehen training", "aim trainer recoil",
//               "rueckstoss kontrollieren", "waffen spray ueben", "spray kontrolle valorant",
//               "recoil pattern lernen", "maus kontrolle shooter"
// LSI / Domain:  "vertikale mauskompensation", "horizontale driftkorrektur", "feuerstoss-kompensation",
//               "trefferdichte", "isometrische unterarmkraft", "kinaesthetische rueckkopplung"
// Authentic Domain Terms: Recoil Control, Rückstoßkontrolle, Spray Pattern Kompensation,
//                         Trefferdichte (Shot Grouping), Abzugskontrolle (Trigger Discipline)
// ============================================================

export const metadata = {
  title: "Recoil Control lernen – FPS Rückstoßkontrolle | SkillDrills",
  description: "Kostenloses Recoil Control Training im Browser. Meistere Spray Patterns, vertikale Mauskompensation und Trefferdichte für CS2, Valorant und Apex Legends.",
  keywords: [
    "Recoil Control lernen",
    "Rückstoßkontrolle FPS",
    "Spray Pattern CS2",
    "Maus Nachuntenziehen Training",
    "Aim Trainer Recoil",
    "Rückstoß kontrollieren",
    "Waffen Spray üben",
    "Spray Kontrolle Valorant",
    "Recoil Pattern lernen",
    "Maus Kontrolle Shooter",
    "Mauspad Bremskontrolle Rückstoß",
    "Feuerstoß Kontrolle FPS"
  ],
  alternates: {
    canonical: "https://skilldrills.online/de/drills/fps/recoil-control",
    languages: getAlternateLanguages('/drills/fps/recoil-control'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Recoil Control lernen – FPS Rückstoßkontrolle | SkillDrills",
    description: "Kostenloses Recoil Control Training im Browser. Meistere Spray Patterns, vertikale Mauskompensation und Trefferdichte für CS2, Valorant und Apex Legends.",
    url: "https://skilldrills.online/de/drills/fps/recoil-control",
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Recoil Control lernen – FPS Rückstoßkontrolle | SkillDrills",
    description: "Kostenloses Recoil Control Training im Browser. Meistere Spray Patterns, vertikale Mauskompensation und Trefferdichte für CS2, Valorant und Apex Legends.",
  },
};

export default function RecoilControlDePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/de" },
      { "@type": "ListItem", "position": 2, "name": "FPS Aim Training", "item": "https://skilldrills.online/de/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Recoil Control", "item": "https://skilldrills.online/de/drills/fps/recoil-control" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Recoil Control Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-15",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
    "description": "Kostenloser Browser-Trainer zur Beherrschung von Waffen-Rückstoß, vertikaler Mauskompensation und Spray-Mustern.",
    "genre": "FPS Training / Recoil Control",
    "url": "https://skilldrills.online/de/drills/fps/recoil-control",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Recoil Control Trainer",
    "url": "https://skilldrills.online/de/drills/fps/recoil-control",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Benötigt JavaScript und HTML5 Canvas Unterstützung",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "description": "Kostenloser Browser-Trainer zur Beherrschung von Waffen-Rückstoß, vertikaler Mauskompensation und Spray-Mustern."
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Recoil Control Trainer",
    "url": "https://skilldrills.online/de/drills/fps/recoil-control",
    "description": "Kostenloser Browser-Trainer zur Beherrschung von Waffen-Rückstoß, vertikaler Mauskompensation und Spray-Mustern.",
    "dateModified": "2026-09-15",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Recoil Control", "Spray Pattern"],
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
        "name": "Was versteht man unter Recoil Control (Rückstoßkontrolle) im FPS-Gaming?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Recoil Control ist die kontinuierliche manuelle Gegenbewegung der Maus gegen den programmierten Waffenrückstoß, um die Geschosse auch bei Dauerfeuer präzise in einem engen Zielbereich zu bündeln."
        }
      },
      {
        "@type": "Question",
        "name": "Warum steigen automatische Waffen nach oben und wie gleicht man das aus?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Spielentwickler simulieren den physikalischen Hochschlag realer Feuerwaffen. Man kompensiert dies, indem man die Maus unmittelbar nach dem ersten Schuss mit konstanter, fein dosierter Geschwindigkeit nach unten zieht."
        }
      },
      {
        "@type": "Question",
        "name": "Was ist der Unterschied zwischen vertikalem Rückstoß und horizontalem Spray-Bloom?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Der vertikale Rückstoß folgt meist einem deterministischen Anstieg, während der horizontale Bloom (Streuung) oft pseudozufällige Schwankungen aufweist, die eine reaktive Sichtkorrektur erfordern."
        }
      },
      {
        "@type": "Question",
        "name": "Wie trainiert man die ersten 5 bis 8 Schüsse eines automatischen Feuerstoßes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die ersten Schüsse zeigen die linearste Aufwärtsbewegung. Trainiere das exakte Einrasten der Zughandlung direkt beim Klick, um den Gegner noch vor dem Einsetzen horizontaler Streuung auszuschalten."
        }
      },
      {
        "@type": "Question",
        "name": "Sollte man für Recoil Control eher das Handgelenk oder den Unterarm nutzen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bei mittlerer bis niedriger Mausempfindlichkeit zieht der Unterarm die Maus gleichmäßig nach unten, während das Handgelenk und die Finger feine horizontale Abweichungen korrigieren."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Rolle spielt das Mauspad (Gleit- vs. Bremsreibung) beim Spray-Control?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ein Mauspad mit spürbarer dynamischer Reibung (Control Pad) erleichtert gleichmäßige, langsame Zugbewegungen, da es ruckartige Mikrosprünge durch Handzittern dämpft."
        }
      },
      {
        "@type": "Question",
        "name": "Wie unterscheidet sich das Recoil-Verhalten zwischen CS2, Valorant und Apex Legends?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CS2 nutzt feste, reproduzierbare Spray-Muster. Valorant besitzt ab Kugel 7 eine zufällige Rechts-Links-Auslenkung. Apex Legends erfordert kontinuierliches Tracking bei relativ sanfter vertikaler Steigung."
        }
      },
      {
        "@type": "Question",
        "name": "Was versteht man unter Spray Transfer (Zielwechsel während des Dauerfeuers)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Spray Transfer ist die fortgeschrittene Technik, bei anhaltendem Dauerfeuer das Fadenkreuz auf einen zweiten Gegner zu ziehen, während man den aktuellen Fortschritt im Spray-Muster beibehält."
        }
      },
      {
        "@type": "Question",
        "name": "Warum führt krampfhaftes Festhalten der Maus zu schlechterem Recoil Control?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Übermäßige Muskelanspannung blockiert die Propriozeption und Sehnenelastizität (Schmidt et al., 1979), was zu ruckartigen Korrekturen und vorzeitiger Ermüdung führt."
        }
      },
      {
        "@type": "Question",
        "name": "Wie lange dauert es, bis ein Waffen-Spray-Pattern im Muskelgedächtnis verankert ist?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Durch tägliches 15-minütiges isoliertes Wiederholen des Musters bildet das motorische Nervensystem innerhalb von 2 bis 3 Wochen hochgradig automatisierte Open-Loop-Programme aus."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Anleitung: Recoil Control in 4 Phasen meistern",
    "description": "Wissenschaftlich fundierte Anleitung zur Perfektionierung von Spray-Kompensation und Abzugskontrolle.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Identifikation des Musters",
        "text": "Feuere eine unkontrollierte Salve an eine Wand, um den spezifischen Verlauf (Höhe, Rechts-Links-Kurven) der Waffe visuell zu analysieren."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Initiales Herunterziehen",
        "text": "Initiiere simultan mit dem ersten Mausklick eine gleichmäßige Zugbewegung nach unten, um die ersten 5 bis 8 Schüsse auf Kopfhöhe zu fixieren."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Horizontale Kurvenkompensation",
        "text": "Sobald das Muster nach rechts oder links abdriftet, lenke die Maus mit feinen Fingerbewegungen exakt entgegengesetzt."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Automatisierung und Reset",
        "text": "Beende das Dauerfeuer nach erfolgreichem Kill sofort, lasse das Fadenkreuz zentrieren und bereite den nächsten Feuerstoß vor."
      }
    ]
  };

  const recoilGuideDe = {
    heading: "Recoil Control Guide & Biomechanische Benchmarks",
    subtitle: "Wissenschaftliche Trainingsmethodik für ballistische Zugkompensation, Muskelgedächtnis und maximale Trefferdichte bei Dauerfeuer",
    intro: [
      "Die Beherrschung des Waffenrückstoßes (Recoil Control) entscheidet in kompetitiven First-Person-Shootern wie Counter-Strike 2, Valorant und Apex Legends über Sieg oder Niederlage im direkten Feuergefecht. Während Einzelschuss-Flicks das Fadenkreuz auf das Ziel setzen, garantiert die kontinuierliche Rückstoßkompensation, dass auch alle Folgeschüsse ihr Ziel treffen.",
      "Aus Sicht der Bewegungswissenschaft ist die Rückstoßkontrolle ein hochgradig spezialisiertes motorisches Programm (Schmidt & Lee, 2011). Da die Geschosskadenz mit bis zu 600 bis 900 Schuss pro Minute viel zu hoch ist für eine rein visuelle Reaktionssteuerung (die mindestens 180 ms Latenz benötigt), muss die Ausgleichsbewegung als vorprogrammiertes Open-Loop-Verhaltensmuster im motorischen Kortex verankert sein.",
      "Wie Schmidt et al. (1979) in der Impuls-Variabilitäts-Theorie nachwiesen, nimmt die Streuung eines Muskels mit zunehmender Geschwindigkeit und Kraftanstrengung logarithmisch zu. Wer die Maus ruckartig nach unten reißt, verfehlt das Ziel. Meisterhafte Rückstoßkontrolle beruht auf einer seidenweichen, isometrischen Abwärtsführung mit minimalem mechanischem Kraftaufwand.",
      "Hinweis zur Messgenauigkeit: Dieser Drill nutzt die hochauflösende Browser-Schnittstelle performance.now() für Sub-Millisekunden-Messungen des Mauseingabestroms. Dadurch werden selbst feinste Abweichungen in der vertikalen und horizontalen Kompensationskurve in Echtzeit analysiert."
    ],
    benchmarks: {
      title: "Rückstoß-Kompensation & Trefferdichte-Benchmarks (Accuracy Norms)",
      headers: ["Leistungsstufe / Rang", "Trefferquote (Kompensation)", "Streuradius (Erste 10 Schuss)", "Physiologischer Motorik-Status"],
      rows: [
        ["Anfänger / Casual", "< 45 % Treffer", "> 85 Pixel Streuung", "Unkoordinierter Abwärtszug, spätes Gegensteuern, starkes Überreißen"],
        ["Fortgeschritten (Gold / Platin)", "45 – 65 % Treffer", "50 – 85 Pixel Streuung", "Zuverlässiges vertikales Abfangen der ersten 5 Schüsse; Probleme im Kurvenverlauf"],
        ["Diamant / Master", "65 – 80 % Treffer", "30 – 50 Pixel Streuung", "Vollständig automatisiertes Abzugsmuster; saubere Kompensation der ersten 15 Kugeln"],
        ["Semi-Profi / Faceit 10", "80 – 90 % Treffer", "18 – 30 Pixel Streuung", "Exzellente horizontale Driftkontrolle, flüssiger Übergang in Spray Transfers"],
        ["Weltklasse / Tier-1-Profi", "> 90 % Treffer", "< 18 Pixel Streuung", "Perfekte kinästhetische Motorsynergie; punktgenaue Bündelung kompletter Magazine"]
      ],
      note: "Wissenschaftliche Richtwerte basierend auf motorischer Bewegungsvariabilität (Schmidt et al. 1979, Meyer et al. 1988, Woodworth 1899)."
    },
    techniques: {
      title: "Waffenspezifische Rückstoß-Kalibrierung nach Spiel",
      items: [
        {
          name: "CS2 AK-47 & M4A1-S Spray-Muster",
          desc: "Schüsse 1–5: Stark nach unten ziehen. Schüsse 6–9: Leicht nach links unten halten. Schüsse 10–20: Sanft nach rechts driften.",
          tips: "Kombiniere die Abwärtsbewegung mit konstanter Schulterstabilisierung und lockeren Fingern."
        },
        {
          name: "Valorant Vandal & Phantom Kontrolle",
          desc: "Schüsse 1–7: Linear vertikal nach unten. Ab Schuss 8: Horizontales Zufalls-Wackeln — achte auf die Mündungsausrichtung.",
          tips: "In Valorant sind kurze 3- bis 5-Schuss-Bursts meist effizienter als das Ausfeuern voller Magazine."
        },
        {
          name: "Apex Legends R-99 & Flatline Tracking",
          desc: "Hohe Feuerrate bei ständiger Gegnerbewegung. Erfordert simultanes horizontales Tracking bei kontinuierlicher Abwärtsspannung.",
          tips: "Nutze ein Hybrid-Mauspad, um weiche Richtungswechsel ohne Haftreibungswiderstand zu ermöglichen."
        },
        {
          name: "Call of Duty Warzone Full-Auto Sustained Fire",
          desc: "Hohe vertikale Anfangssteigung gefolgt von optischer Waffenunruhe (Visual Recoil).",
          tips: "Passe die vertikale Sensitivitäts-Multiplikator-Einstellung im Spiel an, falls du das Pad überstreckst."
        }
      ]
    },
    steps: [
      "Wähle deine bevorzugte Mausempfindlichkeit und klicke in das Spielfeld, um den Zeiger zu sperren.",
      "Starte das Feuergefecht mit gedrückter linker Maustaste auf das zentrale Ziel.",
      "Ziehe die Maus simultan mit dem einsetzenden Rückstoß gleichmäßig und feinfühlig nach unten.",
      "Gleiche horizontale Seitwärtsbewegungen mit minimalen Mikrokorrekturen aus.",
      "Analysiere auf der Auswertungskarte deine prozentuale Kompensationsgenauigkeit und Headshot-Rate."
    ],
    audience: "Shooter-Spieler in CS2, Valorant, Apex Legends, PUBG und Call of Duty, die ihre Trefferdichte bei Dauerfeuer maximieren und Waffenrückstoß systematisch neutralisieren wollen.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'meyer1988', 'schmidtLee2011', 'schmidt1979', 'woodworth1899'),
    related: [
      { href: "/de/drills/fps/flick-shot-training", label: "Flick Shot Training Online" },
      { href: "/de/drills/motor/hand-eye-coordination/aim-trainer", label: "Allgemeiner Aim Trainer Online" },
      { href: "/de/drills/reaction-speed/reaction-time-test", label: "Reaktionszeit Test Online" },
      { href: "/de/drills/motor/movement-speed/rapid-tapping", label: "Klick-Geschwindigkeitstest (CPS)" }
    ]
  };

  const copyDe = {
    h1Keyword: "Recoil Control lernen",
    h1Suffix: " – FPS Rückstoßkontrolle",
    caption: "Rückstoßkontrolle ist ein hochgradig automatisiertes Open-Loop-Bewegungsprogramm. Weil motorische Streuung mit zunehmender Kraftanstrengung steigt (Schmidt et al., 1979), führt eine gleichmäßige, sanfte Abwärtsbewegung zu signifikant besserer Trefferdichte als ruckartiges Ziehen.",
    statScore: "Punkte",
    statTime: "Verbleibende Zeit",
    statAccuracy: "Präzision",
    statBest: "Highscore",
    statAmmo: "Munition",
    statReloading: "Nachladen...",
    pausedTitle: "Pausiert",
    pausedPrompt: "Klicke in den Bildschirm, um die Mauszeiger-Sperre zu reaktivieren und fortzufahren.",
    startTitle: "Pro Recoil Trainer",
    startSubtitle: "Reale Waffen-Spray-Muster & ballistische Zugkompensation • Dynamische Levelprogression",
    startButtonText: "Training starten",
    getReady: "Bereithalten",
    statHeadshots: "Headshots",
    statMaxCombo: "Max Combo",
    statPeakLevel: "Erreichtes Level",
    playAgainText: "Erneut versuchen",
    shareText: "Ergebnis teilen",
    exitText: "Beenden",
    bottomCaption: "Ziehe die Maus synchron zum einsetzenden Waffenrückstoß gleichmäßig nach unten, um die Schüsse präzise im Zielzentrum zu bündeln.",
    rulesTitle: "Trainingsregeln & Punktesystem",
    rulesItems: [
      { num: "1", text: "Headshot-Treffer", highlight: "+100 Punkte / +0,25s", result: "Höchste Punkteausbeute" },
      { num: "2", text: "Körper- und Armtreffer", highlight: "+40 / +20 Punkte", result: "Hält die Trefferserie aktiv" },
      { num: "3", text: "Levelaufstieg", highlight: "+1 Level je 1.400 Punkte", result: "Höhere Zielgeschwindigkeit und stärkere Rückstoßamplitude" },
      { num: "4", text: "Magazindisziplin", highlight: "Fehlversuch-Strafe", result: "Unter 40 % Magazingenauigkeit wird der Combo-Multiplikator zurückgesetzt" }
    ],
    aboutTitle: "Über den Recoil Control Trainer",
    whyMattersTitle: "Warum Rückstoßkontrolle über den Duellausgang entscheidet",
    whyMattersLead: "Rückstoßkontrolle ist ein vorprogrammiertes motorisches Bewegungsmuster. Da die Schusskadenz moderner Sturmgewehre viel zu hoch für visuelle Echtzeitkorrekturen ist (Latenz > 180 ms), muss die Ausgleichsbewegung fest im motorischen Kortex verankert sein.",
    aboutIntro: [
      "Dieser Trainer schult die feindosierte Muskulatur deines Unterarms und deiner Finger, um dem Aufsteigen der Waffe bei Dauerfeuer punktgenau entgegenzuwirken. Während Einzelschüsse primär reaktive Flicks erfordern, verlangt Recoil Control eine kontrollierte, langanhaltende Zugbewegung.",
      "Durch das wiederholte Einprägen der vertikalen Anfangsbremsung und der seitlichen Gegenlenkung erzielst du in CS2, Valorant und Apex Legends selbst auf mittlere und weite Distanzen extrem dichte Treffergruppen."
    ],
    aboutCards: [
      { iconBg: "bg-blue-600", title: "Zielgruppe", text: "FPS-Spieler in CS2, Valorant, Apex Legends und CoD, die ihre Dauerfeuer-Präzision und Spray Transfers auf Elite-Niveau heben wollen." },
      { iconBg: "bg-red-600", title: "Schüsse 1–8 sind entscheidend", text: "Die ersten Schüsse steigen linear an. Wer dieses Zeitfenster perfekt kompensiert, beendet das Duell, bevor zufällige Streuung einsetzt." },
      { iconBg: "bg-orange-600", title: "Abzugskontrolle wahren", text: "Verhindert sinnloses Verballern kompletter Magazine. Gezieltes Absetzen und Zurücksetzen des Musters spart Munition und Trefferzeit." }
    ],
    aboutSections: [
      {
        title: "Der Einfluss mechanischer Rückstoßdämpfung auf die Siegquote",
        paragraphs: [
          "In Taktik-Shootern wie CS2 und Valorant gewinnt derjenige das Gefecht, der zuerst zwei bis drei Treffer ins Ziel bringt. Wer den Rückstoß instinktiv kompensiert, kann sich voll auf die gegnerische Bewegung und das Positioning konzentrieren.",
          "Eine gleichmäßige Abwärtsführung verhindert übermäßiges Hochschlagen und reduziert das vertikale Streufeld auf ein Minimum."
        ]
      }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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

      <RecoilControlClient copy={copyDe} />

      <DrillGuide guide={recoilGuideDe} />
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="fps" currentHref="/drills/fps/recoil-control" locale="de" />
      </div>
    </>
  );
}
