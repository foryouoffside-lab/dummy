import FlowStateClient from '@/app/drills/fps/flow-state/FlowInductionClient';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: "Flow State Aim Trainer – FPS Fokus Training | SkillDrills",
  description: "Kostenloser Flow State Aim Trainer. Trainiere Konzentrationsausdauer, Smooth Pursuit Tracking und erreiche den mentalen Flow-Zustand für FPS-Gaming.",
  keywords: [
    "Flow State Aim Trainer",
    "Flow Zustand Gaming",
    "FPS Fokus Training",
    "Konzentration beim Zielen",
    "Smooth Pursuit Tracking FPS",
    "Konzentrationsausdauer Shooter",
    "Aim Training Tunnelblick",
    "Flow Zustand erreichen Gaming",
    "Kognitiver Aim Trainer",
    "Aim Ausdauer verbessern",
    "Fokus Training Valorant",
    "Aim Trainer kostenlos"
  ],
  alternates: {
    canonical: "https://skilldrills.online/de/drills/fps/flow-state",
    languages: getAlternateLanguages('/drills/fps/flow-state'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Flow State Aim Trainer – FPS Fokus Training | SkillDrills",
    description: "Kostenloser Flow State Aim Trainer. Trainiere Konzentrationsausdauer, Smooth Pursuit Tracking und erreiche den mentalen Flow-Zustand für FPS-Gaming.",
    url: "https://skilldrills.online/de/drills/fps/flow-state",
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Flow State Aim Trainer – FPS Fokus Training | SkillDrills",
    description: "Kostenloser Flow State Aim Trainer. Trainiere Konzentrationsausdauer, Smooth Pursuit Tracking und erreiche den mentalen Flow-Zustand für FPS-Gaming.",
  },
};

export default function GermanFlowStatePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/de" },
      { "@type": "ListItem", "position": 2, "name": "FPS Training", "item": "https://skilldrills.online/de/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Flow State Aim Trainer", "item": "https://skilldrills.online/de/drills/fps/flow-state" }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Flow State Aim Trainer",
    "url": "https://skilldrills.online/de/drills/fps/flow-state",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
    "inLanguage": "de",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "description": "Kostenloser browserbasierter Flow-State-Aim-Trainer. Erreiche tiefe Konzentration, transiente Hypofrontalität und meistere Smooth Pursuit Tracking für FPS-Gaming."
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Flow State Aim Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-15",
    "inLanguage": "de",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
    "description": "Trainiere Konzentrationsausdauer, Daueraufmerksamkeit und Flow-Zustand-Tracking für kompetitive Shooter.",
    "genre": "FPS Training / Flow State",
    "url": "https://skilldrills.online/de/drills/fps/flow-state",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Flow State Aim Trainer",
    "url": "https://skilldrills.online/de/drills/fps/flow-state",
    "description": "Trainiere Konzentrationsausdauer, Daueraufmerksamkeit und Flow-Zustand-Tracking für kompetitive Shooter.",
    "dateModified": "2026-09-15",
    "inLanguage": "de",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Cognitive Focus"],
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
        "name": "Was ist der Flow-Zustand beim Gaming und in FPS-Shootern?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Der Flow-Zustand (oft als 'in the zone' bezeichnet) ist ein optimaler psychologischer Zustand tiefer Konzentration nach Mihaly Csikszentmihalyi, in dem Handlungen intuitiv und mühelos ablaufen. In Shootern äußert sich Flow in flüssigem Tracking, dem Ausbleiben bewusster Zweifel und geschärfter räumlicher Wahrnehmung."
        }
      },
      {
        "@type": "Question",
        "name": "Wie gelangt man beim kompetitiven Spielen gezielt in den Flow-Zustand?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vier Voraussetzungen sind erforderlich: klare Nahziele (Zielverfolgung ohne Abriss), unmittelbares Feedback, Ausschalten von Ablenkungen und die Balance zwischen Anforderung und Können. Ein 5–10-minütiges Aufwärmen mit stufenlosem Smooth-Pursuit-Tracking bereitet das Gehirn optimal auf den Flow vor."
        }
      },
      {
        "@type": "Question",
        "name": "Was geschieht während des Flow-Zustands im Gehirn?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nach Arne Dietrichs Hypothese der transienten Hypofrontalität (2004) wird die Aktivität im dorsolateralen präfrontalen Kortex (DLPFC) temporär herunterreguliert. Dies schaltet störende Selbstkritik und Grübeln stumm, während Basalganglien und Kleinhirn gelernte Reflexe automatisiert und verzögerungsfrei abrufen."
        }
      },
      {
        "@type": "Question",
        "name": "Wie wichtig ist das Challenge-Skill-Gleichgewicht für den Flow?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ist eine Trainingsaufgabe zu leicht, droht Langeweile; übersteigt sie das Können, führt dies zu Frustration und Muskelspannung. Der Flow-Korridor liegt dort, wo die Herausforderung die eigenen Fähigkeiten um ca. 5–10 % übersteigt, sodass eine Erfolgsquote von 70–80 % stabil gehalten wird."
        }
      },
      {
        "@type": "Question",
        "name": "Warum eignet sich Smooth Pursuit Tracking ideal zur Flow-Induktion?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Das Verfolgen kontinuierlicher Bézier-Kurven erfordert ständigen Abgleich zwischen Netzhautbild und motorischem Input (Krauzlis, 2004). Da keine Pausen zwischen diskreten Klicks entstehen, bindet die stetige foveale Fixation die gesamte Aufmerksamkeitsbandbreite und verdrängt störende Gedanken."
        }
      },
      {
        "@type": "Question",
        "name": "Wie lange sollte man Flow-State-Aiming trainieren?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Zur mentalen Einstimmung vor Matches sind 5 bis 10 Minuten optimal. Zum Ausbau der Konzentrationsausdauer empfehlen sich 15-minütige Trainingsblöcke mit anschließenden 5-minütigen Pausen, um neuromuskuläre Ermüdung zu vermeiden."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Rolle spielt Dopamin beim Erreichen des Flow-Zustands?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dopamin und Noradrenalin modulieren das Striatum, schärfen die visuelle Signalverarbeitung und verstärken das Belohnungsgefühl bei erfolgreichen Tracking-Ketten, was die Immersion vertieft."
        }
      },
      {
        "@type": "Question",
        "name": "Warum verschlechtert mentale Ermüdung das Zielen und Tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Lange Gaming-Sessions erschöpfen Neurotransmitter im fronto-parietalen Aufmerksamkeitsnetzwerk (Posner & Petersen, 1990). Mit zunehmender mentaler Ermüdung steigen Reaktionszeiten und unruhige Korrektursakkaden ersetzen flüssiges Tracking."
        }
      },
      {
        "@type": "Question",
        "name": "Wie verhindert man Konzentrationseinbrüche bei langen Spielsessions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Regelmäßige 60-sekündige Augenpausen zwischen Runden, tiefe Zwerchfellatmung, ausreichende Flüssigkeitszufuhr und das bewusste Entspannen von Handgelenk und Unterarm verhindern sensorische Überlastung."
        }
      },
      {
        "@type": "Question",
        "name": "Lässt sich durch Flow-Aiming auch die Konzentration bei der Arbeit verbessern?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja. Daueraufmerksamkeit ist eine domänenübergreifende kognitive Fähigkeit. Das Training ununterbrochener visueller Fixation stärkt exekutive Kontrollfunktionen, die auch bei Deep Work, Programmieren oder konzentriertem Lernen gefordert sind."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Anleitung: Flow-State-Fokus im Aiming trainieren",
    "description": "Schritt-für-Schritt-Anleitung zur Steigerung von Konzentrationsausdauer und visuellem Flow-Tracking.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Sensitivität anpassen",
        "text": "Passe die Mausempfindlichkeit an dein gewohntes Shooter-Profil an, um einheitliches Muskelgedächtnis zu wahren.",
        "url": "https://skilldrills.online/de/drills/fps/flow-state#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Hardware Pointer Lock aktivieren",
        "text": "Klicke auf 'Start', um den Vollbildmodus mit nativer Pointer Lock API ohne künstliche Beschleunigung zu starten.",
        "url": "https://skilldrills.online/de/drills/fps/flow-state#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Fließende Bézier-Kurven verfolgen",
        "text": "Heftet den Blick vorausschauend an den Zielpfad und antizipiert Krümmungsänderungen, statt dem Zentrum hinterherzulaufen.",
        "url": "https://skilldrills.online/de/drills/fps/flow-state#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Kontinuierliche Flow-Ketten halten",
        "text": "Verbleibe ohne Unterbrechung auf dem Ziel, um das Flow-Meter aufzuladen und maximale Punktemultiplikatoren zu erreichen.",
        "url": "https://skilldrills.online/de/drills/fps/flow-state#step-4"
      }
    ]
  };

  const flowStateGuide = {
    heading: "Flow-State-Induktion Guide & Kognitive Fokus-Benchmarks",
    intro: [
      "Der Flow State Trainer verbindet Erkenntnisse der Kognitionspsychologie mit motorischer Neurowissenschaft, um gezielt psychologischen Flow, anhaltende Aufmerksamkeit und präzises Smooth Pursuit Tracking zu fördern. Basierend auf der Pionierarbeit von Mihaly Csikszentmihalyi (1975, 1990) beschreibt der Flow-Zustand jene optimale Balance, in der wahrgenommene Herausforderung und motorische Fähigkeiten im perfekten Einklang stehen, sodass Selbstzweifel und bewusste Zögerlichkeiten verschwinden.",
      "Ergänzend hierzu erklärt Arne Dietrichs Hypothese der transienten Hypofrontalität (2004) den zugrundeliegenden neurobiologischen Zustand: Durch die selektive Herunterregulierung des dorsolateralen präfrontalen Kortex (DLPFC) wird die motorische Steuerung primär an Basalganglien und Kleinhirn übergeben. In kompetitiven Ego-Shootern befreit dieser Zustand die Reflexe von analytischem Überdenken und ermöglicht instinktive Mikrokorrekturen unter Höchstgeschwindigkeit.",
      "Unterstützt durch hochauflösende Zeitmessung via performance.now() (Woods et al., 2015) und organisch fließende Bézier-Kurventrajektorien (Krauzlis, 2004; Posner & Petersen, 1990) bietet diese Übung die optimale, installationsfreie Grundlage zur Festigung mentaler Ausdauer und Auslöschung von Zielfehlern.",
      "Messmethodik: Jedes Ereignis wird mit dem hochauflösenden performance.now()-Zeitstempel deines Browsers lokal erfasst – es werden keine Spieldaten hochgeladen. Zu beachten: Aus Sicherheitsgründen (Spectre-Schutz) runden Browser Zeitmessungen auf rund 1 ms. Bildschirme quantisieren die Darstellung auf Bildintervalle (~16,7 ms bei 60 Hz, 6,9 ms bei 144 Hz und 4,1 ms bei 240 Hz nach Woods et al., 2015). Unterschiede unter 5 ms stellen messtechnisches Rauschen dar. Vergleiche deine Ergebnisse daher primär auf derselben Hardware."
    ],
    benchmarks: {
      title: "Kognitive Flow-Induktions- & Aufmerksamkeitsstufen",
      headers: ["Stufe", "Flow-Dimension", "Physiologischer Indikator", "Kognitiver Mechanismus", "Zielvorgabe"],
      rows: [
        ["Stufe 1", "Aufmerksamkeits-Orientierung", "Sensorisches Gating & Fixation", "Posner-Netzwerk blendet externe Umgebungsreize aus", "Sofortige foveale Zielerfassung innerhalb von 200 ms"],
        ["Stufe 2", "Herausforderung-Fähigkeit-Balance", "Dynamische Geschwindigkeits-Kalibrierung", "Csikszentmihalyi-Kanal: Zieltempo passt sich motorischer Leistung an", "70–80 % kontinuierliche Verweildauer halten"],
        ["Stufe 3", "Foveale Smooth-Pursuit-Dauer", "Kontinuierlicher Geschwindigkeitsabgleich", "Krauzlis-Kortikostriatale Bahnen eliminieren Korrektur-Sakkaden", ">85 % kontinuierliches Tracking auf komplexen Bézier-Kurven"],
        ["Stufe 4", "Transiente Hypofrontalität", "DLPFC-Herunterregulierung", "Dietrich-Hypothese: Bewusste Selbstkontrolle pausiert zugunsten von Reflex-Automation", ">30 Sekunden ununterbrochene Flow-Serie ohne Zweifel"],
        ["Stufe 5", "Maximale Konzentrationsausdauer", "Ermüdungsresistenz", "Exekutive Ausdauer verhindert Latenzdegradation und Fokusverlust", "60+ Sekunden Flow-Ketten bei maximalem Combo-Multiplikator"]
      ],
      note: "Metriken synthetisiert aus Flow-Psychologie (Csikszentmihalyi, 1975, 1990), Neurobiologie des Flow-Zustands (Dietrich, 2004), Blickfolgebewegungs-Forschung (Krauzlis, 2004) und Netzwerktheorien der Aufmerksamkeit (Posner & Petersen, 1990)."
    },
    techniques: {
      title: "Wissenschaftlich fundierte Protokolle für Gaming-Flow",
      items: [
        {
          name: "Tangentiales Blick-Voraus-Führen (Predictive Pursuit)",
          desc: "Lassen Sie Ihren Blick nicht hinter dem Zentrum des Zielpunkts herhinken, sondern fixieren Sie die Aufmerksamkeit 2–3 Grad voraus entlang des Geschwindigkeitsvektors. Diese vorausgreifende Projektion aktiviert prädiktive Blickfolgebewegungen (Krauzlis, 2004) und reduziert Augenermüdung.",
          tips: "Blicken Sie durch das Ziel hindurch in die geplante Flugbahn und lassen Sie periphere Reize minimale Korrekturen steuern."
        },
        {
          name: "Herunterregulieren der präfrontalen Selbstkritik (Hypofrontalitäts-Protokoll)",
          desc: "Flow erfordert das Beruhigen des präfrontalen Kortex (Dietrich, 2004). Innere Dialoge ('Treffe ich noch?', 'Ich rutsche ab') reaktivieren bewusste Selbstüberwachung und stören automatische Abläufe. Konzentrieren Sie sich auf ruhige Atmung und mühelose Hingabe an die Bewegung.",
          tips: "Koppeln Sie ruhige Atemzyklen an Kurvenwechsel, um das vegetative Nervensystem zu stabilisieren."
        },
        {
          name: "Dynamische Abstimmung von Anspruch und Können",
          desc: "Der Flow-Zustand reißt ab, wenn die Übung entweder unterfordert (Langeweile) oder überfordert (Anspannung). Passen Sie Ihre Spieleinstellungen so an, dass Ihre Tracking-Präzision zwischen 70 % und 80 % liegt – der von Csikszentmihalyi (1990) definierte Idealbereich.",
          tips: "Wenn der Fokus nach wenigen Sekunden abreißt, reduzieren Sie das Tempo, bis Sie 20-Sekunden-Serien stabil halten."
        },
        {
          name: "Lösen von Muskel-Mikrospannungen im Unterarm",
          desc: "Dauerhaftes Tracking führt oft zu isometrischer Verspannung im Daumenballen und Unterarm. Zu hoher Griffdruck macht feine Korrekturen ruckartig. Lösen Sie die Finger- und Handgelenksspannung bewusst bei Richtungswechseln.",
          tips: "Halten Sie die Maus mit minimalem Kraftaufwand – Lockerheit im Handgelenk ist der Schlüssel zu gleichmäßigem Tracking."
        }
      ]
    },
    steps: [
      "Wählen Sie Ihre gewohnte Ingame-Sensitivität, um das Muskelgedächtnis 1:1 zu übertragen.",
      "Klicken Sie auf 'Start', um den Vollbildmodus mit direkter Mauszeigersperre ohne Beschleunigung zu starten.",
      "Verfolgen Sie das Ziel fokussiert auf seinen organischen, fließenden Bézier-Kurven.",
      "Bleiben Sie kontinuierlich im Zielradius, um das Flow-Meter zu füllen und den Flow-Zustand zu erreichen.",
      "Halten Sie lange Fokus-Serien, um Multiplikatoren zu steigern und ausdauernde Konzentration aufzubauen."
    ],
    audience: "Kompetitive FPS-Spieler in CS2, Valorant, Apex Legends und Overwatch 2 sowie E-Sportler und Wissensarbeiter, die anhaltende Konzentration, Ablenkungsresistenz und Zielsicherheit trainieren wollen.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'krauzlis2004', 'posner1990', 'green2003', 'dietrich2004'),
    related: [
      { href: "/de/drills/fps/fps-tracking-trainer", label: "FPS Tracking Trainer" },
      { href: "/de/drills/fps/anti-zigzag-movement-trainer", label: "Anti-Zigzag Aim Trainer" },
      { href: "/de/drills/fps/anti-strafe-jitter-duel", label: "Anti-Strafe Jitter Trainer" },
      { href: "/de/drills/fps/flick-shot-training", label: "Flick Shot Trainer" },
      { href: "/de/drills/reaction-speed/visual-tracking-speed-test", label: "Visual Tracking Speed Test" }
    ]
  };

  const copyDe = {
    h1Keyword: "Flow State Aim Trainer",
    h1Suffix: " – FPS Fokus & Konzentration",
    statScore: "Punkte",
    statTime: "Verbleibende Zeit",
    statAccuracy: "Tracking-Präzision",
    statBestScore: "Highscore",
    startTitle: "Flow State Aim Trainer",
    startSubtitle: "Hardware Raw Input • Stufenlose Flow-Progression",
    pausedTitle: "Fokus Pausiert",
    pausedSubtitle: "Klicken zum Fortsetzen – Mauszeiger wird gesperrt.",
    stageCaption: "Halte deinen Rhythmus und verfolge kontinuierliche Bewegungen entlang fließender Kurven ohne Fokusverlust.",
    rulesTitle: "Trainingsanleitung & Punktesystem",
    rulesItems: [
      { num: "1", text: "Ziel-Tracking", highlight: "+10 PTS (+0,4s/s)", result: "Kontinuierliches Dwell im Radius" },
      { num: "2", text: "Flow-Multiplikator", highlight: "Bis zu 3,0x Punkte", result: "Wächst mit ununterbrochenem Fokus" },
      { num: "3", text: "Level-Progression", highlight: "+1 Level / 1400 PTS", result: "Zielgeschwindigkeit passt sich Fähigkeiten an" },
      { num: "4", text: "Fokus-Abbruch", highlight: "Streak-Reset", result: "1s Zielverlust setzt Multiplikator zurück" }
    ],
    aboutTitle: "Über den Flow State Aim Trainer"
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
      <FlowStateClient copy={copyDe} />
      <div className="max-w-6xl mx-auto px-4 w-full pb-12">
        <RelatedDrills currentCategory="fps" currentHref="/drills/fps/flow-state" locale="de" />
      </div>
      <DrillGuide guide={flowStateGuide} />
    </>
  );
}
