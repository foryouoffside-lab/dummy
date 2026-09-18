import StrafeTrackingClient from '@/app/drills/fps/strafe-tracking/StrafeTrackingClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// GERMAN SEARCH KEYWORD RESEARCH & INTENT CLUSTERING (DACH)
// Primary query: "strafe tracking uebung" (Core German shooter tracking query)
//                "tracking aim training" (High technical category intent)
// Secondary:    "gegner bewegung verfolgen", "maus tracking lernen", "aim trainer strafe",
//               "ad-strafe ausweichen", "smoothness aim training", "tracking aim cs2",
//               "apex tracking uebungen"
// LSI / Domain:  "blickfolgebewegung", "korrektursakkaden", "visuomotorische synchronisation",
//               "richtungswechsel reaktionszeit", "visuelle rueckkopplungsschleife"
// Authentic Domain Terms: Strafe Tracking, Tracking Aim, Blickfolgebewegung (Smooth Pursuit),
//                         Korrektursakkade (Catch-up Saccade), Richtungswechsel-Latenz
// ============================================================

export const metadata = {
  title: "Strafe Tracking Übung – FPS Tracking Aim | SkillDrills",
  description: "Kostenlose Strafe-Tracking-Übung im Browser. Trainiere reaktives Zielen auf AD-Strafes, Smooth Pursuit und schnelle Richtungswechsel für Apex und CS2.",
  keywords: [
    "Strafe Tracking Übung",
    "Tracking Aim Training",
    "Gegner Bewegung verfolgen",
    "Maus Tracking lernen",
    "Aim Trainer Strafe",
    "AD-Strafe Ausweichen",
    "Smoothness Aim Training",
    "Tracking Aim CS2",
    "Apex Tracking Übungen",
    "Zielen bei Bewegung Shooter",
    "Maus Zielverfolgung üben",
    "FPS Fadenkreuz Zielverfolgung"
  ],
  alternates: {
    canonical: "https://skilldrills.online/de/drills/fps/strafe-tracking",
    languages: getAlternateLanguages('/drills/fps/strafe-tracking'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Strafe Tracking Übung – FPS Tracking Aim | SkillDrills",
    description: "Kostenlose Strafe-Tracking-Übung im Browser. Trainiere reaktives Zielen auf AD-Strafes, Smooth Pursuit und schnelle Richtungswechsel für Apex und CS2.",
    url: "https://skilldrills.online/de/drills/fps/strafe-tracking",
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Strafe Tracking Übung – FPS Tracking Aim | SkillDrills",
    description: "Kostenlose Strafe-Tracking-Übung im Browser. Trainiere reaktives Zielen auf AD-Strafes, Smooth Pursuit und schnelle Richtungswechsel für Apex und CS2.",
  },
};

export default function StrafeTrackingDePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/de" },
      { "@type": "ListItem", "position": 2, "name": "FPS Aim Training", "item": "https://skilldrills.online/de/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Strafe Tracking", "item": "https://skilldrills.online/de/drills/fps/strafe-tracking" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Strafe Tracking Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-15",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
    "description": "Kostenloser Browser-Trainer zur Beherrschung von Strafe-Tracking, Blickfolgebewegungen und Richtungswechseln.",
    "genre": "FPS Training / Strafe Tracking",
    "url": "https://skilldrills.online/de/drills/fps/strafe-tracking",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Strafe Tracking Trainer",
    "url": "https://skilldrills.online/de/drills/fps/strafe-tracking",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Benötigt JavaScript und HTML5 Canvas Unterstützung",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "description": "Kostenloser Browser-Trainer zur Beherrschung von Strafe-Tracking, Blickfolgebewegungen und Richtungswechseln."
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Strafe Tracking Trainer",
    "url": "https://skilldrills.online/de/drills/fps/strafe-tracking",
    "description": "Kostenloser Browser-Trainer zur Beherrschung von Strafe-Tracking, Blickfolgebewegungen und Richtungswechseln.",
    "dateModified": "2026-09-15",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Strafe Tracking", "Aim Trainer"],
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
        "name": "Was versteht man unter Strafe Tracking (Tracking Aim) im FPS-Gaming?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Strafe Tracking ist die Fähigkeit, das Fadenkreuz kontinuierlich und ohne Abzusetzen auf einem gegnerischen Ziel zu halten, während sich dieses durch Ausweichbewegungen (AD-Strafing) unregelmäßig bewegt."
        }
      },
      {
        "@type": "Question",
        "name": "Warum ist reaktives Tracking schwieriger als statisches Flick-Aiming?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Beim Flicken ist das Ziel im Moment des Schusses oft statisch. Tracking erfordert hingegen eine permanente visuelle Rückkopplungsschleife, ständige Geschwindigkeitsanpassung und Korrektur bei Richtungswechseln."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Rolle spielt die physiologische Latenz bei abrupten Richtungswechseln?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Das menschliche Gehirn benötigt etwa 120 bis 160 Millisekunden, um einen unerwarteten Richtungswechsel visuell zu registrieren und die motorische Umkehr der Handbewegung einzuleiten (Rashbass, 1961)."
        }
      },
      {
        "@type": "Question",
        "name": "Was ist der Unterschied zwischen Smooth Pursuit und Korrektursakkaden?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Smooth Pursuit ist das kontinuierliche, weiche Gleiten des Fadenkreuzes entlang der Zielbahn. Bricht das Ziel aus, fängt eine schnelle Korrektursakkade (Catch-up Saccade) den Abstand schlagartig wieder auf."
        }
      },
      {
        "@type": "Question",
        "name": "Wie verhindert man das Überreißen (Overshooting) bei schnellen Richtungswechseln?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Overshooting entsteht durch voreiliges Raten der Zielbahn. Vermeide prädiktives Ziehen und fokussiere dich auf reaktive 'Smoothness' – warte auf die visuelle Bestätigung des Richtungswechsels vor der Bewegungsumkehr."
        }
      },
      {
        "@type": "Question",
        "name": "Sollte man für Strafe Tracking eher den Arm oder das Handgelenk nutzen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Für langgezogene Verfolgungen über weite Bildschirmdistanzen führt der Unterarm aus dem Ellenbogen, während hochfrequentes Hin-und-Her-Zittern (AD-Jitter) aus dem Handgelenk und den Fingern kompensiert wird."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Maussensitivität (eDPI) eignet sich am besten für Tracking-Shooter?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In Spielen mit hohem Tracking-Anteil wie Apex Legends oder Overwatch 2 ist eine moderate bis leicht erhöhte Sensitivität (30–40 cm pro 360°-Drehung) ideal, um schnelle Richtungswechsel ohne Handgelenksblockade zu meistern."
        }
      },
      {
        "@type": "Question",
        "name": "Welches Mauspad unterstützt Tracking Aiming optimal (Speed vs. Control)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Für Tracking-Shooter werden Hybrid- oder Speed-Pads mit geringer Haftreibung (Static Friction) bevorzugt, da sie mikroskopische Richtungswechsel ohne spürbaren Anfangswiderstand ermöglichen."
        }
      },
      {
        "@type": "Question",
        "name": "Wie unterscheidet sich das Tracking in Apex Legends, Overwatch 2 und CS2?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Apex und Overwatch haben eine lange Time-to-Kill (High TTK) und extreme Spieleragilität, was permanentes Tracking verlangt. In CS2 ist Tracking primär in Pistol-Rounds und gegen sprintende Gegner entscheidend."
        }
      },
      {
        "@type": "Question",
        "name": "Wie integriert man Strafe Tracking am besten in die tägliche Aufwärmroutine?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolviere 10 bis 15 Minuten Strafe-Tracking vor deiner Spielsession. Konzentriere dich auf maximale kontinuierliche Lock-on-Zeit (Time on Target) statt auf Hektik, um den motorischen Kortex zu kalibrieren."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Anleitung: Strafe Tracking in 4 Schritten meistern",
    "description": "Wissenschaftlich fundierter Trainingsablauf zur Perfektionierung von reaktiver Blickfolge und Umkehrlatenz.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Initiales Einrasten (Target Lock)",
        "text": "Setze das Fadenkreuz mit einem präzisen Mikro-Flick direkt in die Mitte des sich bewegenden Ziels."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Geschwindigkeitssynchronisation (Smooth Pursuit)",
        "text": "Passe die kontinuierliche Mausgeschwindigkeit exakt an die Bewegungsgeschwindigkeit des Gegners an, ohne zu ruckeln."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Reaktive Richtungsanpassung",
        "text": "Sobald der Gegner die Richtung ändert, stoppe den aktuellen Zug ab und schließe die Distanz mit einer zügigen Korrektursakkade."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Zentrierung und Ausdauer",
        "text": "Halte die muskuläre Spannung im Unterarm locker, um Krämpfe bei langanhaltenden Tracking-Duellen zu vermeiden."
      }
    ]
  };

  const strafeGuideDe = {
    heading: "Strafe Tracking Guide & Biomechanische Benchmarks",
    subtitle: "Wissenschaftliche Trainingsmethodik für reaktive Blickfolgebewegungen, minimale Umkehrlatenz und maximale Verweildauer auf unberechenbaren Zielen",
    intro: [
      "Strafe Tracking (Tracking Aiming) ist die mechanische Schlüsselkompetenz in agilen First-Person-Shootern wie Apex Legends, Overwatch 2, The Finals und Call of Duty. Während Taktik-Shooter vor allem Flick-Präzision fordern, erfordern Spiele mit hoher Time-to-Kill (High TTK), dass das Fadenkreuz lückenlos auf einem sich heftig windenden Gegner haften bleibt.",
      "Aus Sicht der okulomotorischen und sensomotorischen Neurowissenschaft stützt sich das Tracking auf zwei kooperierende Systeme (Rashbass, 1961; Krauzlis, 2004): die glatte Blickfolgebewegung (Smooth Pursuit) für konstante Geschwindigkeiten und schnelle Aufholsakkaden (Catch-up Saccades), um plötzliche Richtungswechsel zu kompensieren. Die menschliche Reiz-Reaktions-Schleife benötigt bei unerwarteten Richtungswechseln eine Mindestlatenz von etwa 130 bis 160 ms (Lisberger, 2010).",
      "Erfolgreiches Strafe Tracking basiert auf der sogenannten 'Smoothness' – der Fähigkeit, mikroskopisches Handzittern und ruckartige Überkorrekturen zu dämpfen. Wer versucht, den Gegner vorab zu erraten, übersteuert fast immer. Elite-Spieler reagieren stattdessen mit seidenweichen, isometrischen Zügen auf tatsächliche visuelle Feedbacksignale.",
      "Hinweis zur Messgenauigkeit: Dieser Drill nutzt die hochauflösende Browser-Schnittstelle performance.now() für Latenz- und Zeit-auf-Ziel-Messungen (Time on Target) im Sub-Millisekundenbereich. Die Bildausgabe unterliegt der Bildwiederholrate deines Monitors (60Hz, 144Hz, 240Hz), wodurch flüssiges Tracking auf High-Refresh-Displays spürbar begünstigt wird."
    ],
    benchmarks: {
      title: "Strafe-Tracking & Verweildauer-Benchmarks (Time on Target Norms)",
      headers: ["Leistungsstufe / Rang", "Trefferquote (Time on Target)", "Max. Lock-on Streak", "Physiologische Umkehrlatenz & Status"],
      rows: [
        ["Anfänger / Casual", "< 40 % Verweildauer", "< 1,2 Sekunden", "Häufiges Überreißen, starkes Zittern, Richtungswechsel-Latenz > 240 ms"],
        ["Fortgeschritten (Gold / Platin)", "40 – 58 % Verweildauer", "1,2 – 2,5 Sekunden", "Stabiles Verfolgen auf geraden Bahnen; verliert das Ziel bei schnellen AD-Cuts"],
        ["Diamant / Master", "58 – 74 % Verweildauer", "2,5 – 4,5 Sekunden", "Sehr gute Smoothness; zügige Korrektursakkaden mit Latenz von ca. 160–180 ms"],
        ["Semi-Profi / Faceit 10", "74 – 86 % Verweildauer", "4,5 – 7,5 Sekunden", "Nahezu verzögerungsfreie Richtungsumkehr; exzellente Geschwindigkeitsanpassung"],
        ["Weltklasse / Tier-1-Profi", "> 86 % Verweildauer", "> 7,5 Sekunden", "Perfekte okulomotorische Synchronisation; Fadenkreuz klebt förmlich am Zielzentrum"]
      ],
      note: "Wissenschaftliche Richtwerte basierend auf Blickfolgestudien und sensomotorischer Reaktionsforschung (Rashbass 1961, Krauzlis 2004, Lisberger 2010)."
    },
    techniques: {
      title: "Disziplinspezifische Tracking-Kalibrierung nach Spiel",
      items: [
        {
          name: "Apex Legends High-Velocity Tracking",
          desc: "Extreme Geschwindigkeiten durch Slidetraining, Octane-Stims und Horizon-Lifts. Erfordert weite Armzüge.",
          tips: "Trainiere mit einem Hybrid-Mauspad und halte die Schultermuskulatur locker, um weite Verfolgungswinkel zu meistern."
        },
        {
          name: "Overwatch 2 ADAD Anti-Jitter",
          desc: "Keine Trägheit bei der Richtungsänderung (Instant Acceleration). Extrem fordernd für reaktive Handgelenksarbeit.",
          tips: "Blicke nicht auf dein Fadenkreuz, sondern fokussiere mit den Augen direkt den Mittelpunkt des gegnerischen Charaktermodells."
        },
        {
          name: "Counter-Strike 2 Pistol Round Strafing",
          desc: "Ausweichende Glock- und USP-Duelle auf kurze bis mittlere Distanz. Erfordert synchronisiertes Counter-Strafing.",
          tips: "Kombiniere die horizontale Mausbewegung mit deiner eigenen Tastaturbewegung (Mirroring oder Anti-Mirroring)."
        },
        {
          name: "Call of Duty Warzone Close-Quarters",
          desc: "Schnelle Nahkämpfe in Gebäuden gegen rutschende und springende Gegner.",
          tips: "Erhöhe die vertikale Reaktionsbereitschaft für Jump-Shots und Drop-Shot-Konter."
        }
      ]
    },
    steps: [
      "Wähle deine bevorzugte Mausempfindlichkeit und klicke in das Spielfeld, um den Mauszeiger zu sperren.",
      "Richte das Fadenkreuz auf das zentrale Startziel und beginne das Tracking.",
      "Halte das Fadenkreuz kontinuierlich auf dem unberechenbar nach links und rechts ausweichenden Ziel.",
      "Reagiere geschmeidig auf plötzliche Richtungswechsel und bringe das Fadenkreuz sofort wieder ins Zentrum.",
      "Prüfe auf der Auswertungskarte deine Time-on-Target-Prozentquote und deine maximale Lock-on-Serie."
    ],
    audience: "Shooter-Spieler in Apex Legends, Overwatch 2, CS2, Warzone und The Finals, die ihr kontinuierliches Zielverfolgungsverhalten, ihre Richtungswechsel-Reaktionszeit und ihre Zielsicherheit bei beweglichen Gegnern perfektionieren wollen.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('rashbass1961', 'krauzlis2004', 'lisberger2010', 'woods2015', 'fitts1954'),
    related: [
      { href: "/de/drills/fps/flick-shot-training", label: "Flick Shot Training Online" },
      { href: "/de/drills/fps/recoil-control", label: "Recoil Control lernen" },
      { href: "/de/drills/reaction-speed/reaction-time-test", label: "Reaktionszeit Test Online" },
      { href: "/de/drills/motor/hand-eye-coordination/aim-trainer", label: "Allgemeiner Aim Trainer Online" }
    ]
  };

  const copyDe = {
    h1Keyword: "Strafe Tracking Übung",
    h1Suffix: " – FPS Tracking Aim Trainer",
    caption: "Tracking Aiming ist die kontinuierliche Verfolgung eines unberechenbar ausweichenden Gegners. Da die menschliche visuelle Richtungsreaktion rund 120 bis 160 ms Latenz aufweist (Rashbass, 1961; Krauzlis, 2004), führt geschmeidige Geschwindigkeitsanpassung zu weitaus höherer Trefferdichte als hektisches Raten.",
    statStatus: "Status",
    statusTracking: "Ziel erfasst",
    statusComplete: "Abgeschlossen",
    statusStandby: "Bereit",
    statTime: "Verbleibende Zeit",
    statAccuracy: "Tracking-Quote",
    statBest: "Highscore",
    statScore: "Punkte",
    pausedTitle: "Pausiert",
    pausedPrompt: "Klicke in den Bildschirm, um die Mauszeiger-Sperre zu reaktivieren und fortzufahren.",
    startTitle: "Pro Strafe Tracking",
    startSubtitle: "Unberechenbare AD-Strafes & direkte Rohdaten-Eingabe • Dynamische Levelprogression",
    startButtonText: "Training starten",
    getReady: "Bereithalten",
    statLockStreak: "Max. Lock-on Serie",
    statPeakLevel: "Erreichtes Level",
    statOffTarget: "Zeit außerhalb",
    playAgainText: "Erneut versuchen",
    shareText: "Ergebnis teilen",
    exitText: "Beenden",
    bottomCaption: "Halte das Fadenkreuz kontinuierlich auf dem Target, während es am Boden unregelmäßig die Richtung wechselt, um deine Tracking-Ausdauer zu maximieren.",
    rulesTitle: "Trainingsregeln & Punktesystem",
    rulesItems: [
      { num: "1", text: "Zielverfolgung", highlight: "Reaktiver Zeitzugewinn (+0,4s/s)", result: "Halte das Fadenkreuz im Zielzentrum" },
      { num: "2", text: "Zeitverlängerung", highlight: "45s Startzeit", result: "Hohe Tracking-Genauigkeit verlängert die Runde dynamisch" },
      { num: "3", text: "Abriss-Strafe", highlight: "Fehlversuch-Strafe", result: "Über 1s Zielverlust setzt den Combo-Multiplikator zurück" },
      { num: "4", text: "Levelaufstieg", highlight: "+1 Level je 1.400 Punkte", result: "Höhere Zielgeschwindigkeit und schnellere Richtungswechsel" }
    ],
    aboutTitle: "Über das Strafe Tracking Training",
    whatIsTitle: "Was ist Strafe Tracking (Aim Tracking)?",
    whatIsLead: "Strafe Tracking ist die Fähigkeit, das Fadenkreuz auf einem unvorhersehbar ausweichenden Ziel arretiert zu halten. Die glatte Blickfolge des Menschen funktioniert bis zu einer Winkelgeschwindigkeit von etwa 30°/Sekunde; bei abrupten Richtungswechseln entsteht eine unvermeidliche Reaktionslatenz von 130–160 ms (Rashbass, 1961; Krauzlis, 2004).",
    aboutIntro: [
      "Dieses Training schult die Feinmotorik deines Unterarms und Handgelenks, um ruckartige Richtungswechsel und hochfrequentes ADAD-Strafing geschmeidig abzufangen und dauerhaft im Zielbereich zu verweilen."
    ],
    aboutCards: [
      { iconBg: "bg-blue-600", title: "Zielgruppe", text: "Spieler in Apex Legends, Overwatch 2, CS2 und CoD, die ihre Trefferquote gegen agile, ausweichende Gegner im Nah- und Fernkampf maximieren wollen." },
      { iconBg: "bg-fuchsia-600", title: "Trainierte Fähigkeiten", text: "Reaktives Tracking, Ziel-Smoothness, Richtungswechsel-Antizipation, Verweildauer (Time on Target) und Hand-Auge-Koordination." },
      { iconBg: "bg-orange-600", title: "Unverfälschte Mauseingabe", text: "Verwendet die Pointer-Lock-API ohne künstliche Glättung oder Beschleunigung – 1:1 identisch mit deinem Ingame-Mausgefühl." }
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

      <StrafeTrackingClient copy={copyDe} />

      <DrillGuide guide={strafeGuideDe} />
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="fps" currentHref="/drills/fps/strafe-tracking" locale="de" />
      </div>
    </>
  );
}
