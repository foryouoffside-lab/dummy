import TargetPrioritizationClient from '@/app/drills/fps/target-prioritization/TargetPrioritizationClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: "Zielpriorisierung FPS Training – Aim Trainer | SkillDrills",
  description: "Kostenloses Zielpriorisierungs-Training im Browser: Trainiere Bedrohungseinschätzung, Trigger-Disziplin und Schusshemmung für CS2 und Valorant.",
  keywords: [
    "Zielpriorisierung FPS",
    "Maus Zielauswahl üben",
    "Zielauswahl Aim Trainer",
    "Bedrohungseinschätzung Shooter",
    "Trigger-Disziplin trainieren",
    "Schusshemmung FPS",
    "Multi-Target Aiming CS2",
    "Gegner Priorisierung Valorant",
    "Go/No-Go Aiming Test",
    "Ablenkungsunterdrückung FPS",
    "Reflex Schussdisziplin",
    "Aiming Entscheidungszeit"
  ],
  alternates: {
    canonical: "https://skilldrills.online/de/drills/fps/target-prioritization",
    languages: getAlternateLanguages('/drills/fps/target-prioritization'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Zielpriorisierung FPS Training – Aim Trainer | SkillDrills",
    description: "Kostenloses Zielpriorisierungs-Training im Browser: Trainiere Bedrohungseinschätzung, Trigger-Disziplin und Schusshemmung für CS2 und Valorant.",
    url: "https://skilldrills.online/de/drills/fps/target-prioritization",
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Zielpriorisierung FPS Training – Aim Trainer | SkillDrills",
    description: "Kostenloses Zielpriorisierungs-Training im Browser: Trainiere Bedrohungseinschätzung, Trigger-Disziplin und Schusshemmung für CS2 und Valorant.",
  },
};

export default function TargetPrioritizationDePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/de" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/de/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Zielpriorisierung", "item": "https://skilldrills.online/de/drills/fps/target-prioritization" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Zielpriorisierung FPS Training",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
    "description": "Kostenloses Browsertraining zur Optimierung von Bedrohungseinschätzung, visueller Filterung und Trigger-Disziplin in taktischen Ego-Shootern.",
    "genre": "FPS Training / Target Prioritization",
    "url": "https://skilldrills.online/de/drills/fps/target-prioritization",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Zielpriorisierung FPS Training",
    "url": "https://skilldrills.online/de/drills/fps/target-prioritization",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Erfordert JavaScript und HTML5 Canvas Unterstützung",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "description": "Kostenloses Browsertraining zur Optimierung von Bedrohungseinschätzung, visueller Filterung und Trigger-Disziplin in taktischen Ego-Shootern."
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Zielpriorisierung FPS Training",
    "url": "https://skilldrills.online/de/drills/fps/target-prioritization",
    "description": "Kostenloses Browsertraining zur Optimierung von Bedrohungseinschätzung, visueller Filterung und Trigger-Disziplin in taktischen Ego-Shootern.",
    "dateModified": "2026-09-05",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Target Prioritization"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-05",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Was versteht man unter Zielpriorisierung in taktischen FPS-Spielen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Zielpriorisierung (Target Prioritization) ist der exekutive kognitive Prozess, bei dem in Gefechtssituationen mit mehreren sichtbaren Zielen blitzschnell die Gefährlichkeitsstufe jedes Gegners bewertet und die unmittelbar tödlichste Bedrohung zuerst eliminiert wird, während Ablenkungsziele oder Verbündete ignoriert werden."
        }
      },
      {
        "@type": "Question",
        "name": "Warum neigen Spieler in Teamkämpfen zu reflexartigem Panikfeuer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Unter akutem Adrenalinanstieg neigt das menschliche Sehsystem dazu, motorische Aktionen reflexartig auf die nächstbeste sichtbare Bewegung auszulösen. Ohne trainierte exekutive Hemmung entfällt die Bedrohungsdifferenzierung, was zu Fehlschüssen auf Attrappen oder Friendly Fire führt."
        }
      },
      {
        "@type": "Question",
        "name": "Wie funktioniert das Go/No-Go-Prinzip bei der Schusshemmung im Shooter?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Basierend auf den Forschungen von Franciscus Cornelis Donders (1868) erfordert das Go/No-Go-Paradigma, dass der motorische Kortex einen bereits vorbereiteten Klick sofort unterdrückt, sobald prohibitive Merkmale erkannt werden – wie etwa grüne Team-Outlines oder Decoy-Projektile."
        }
      },
      {
        "@type": "Question",
        "name": "Was besagt die Stop-Signal Reaction Time (SSRT) nach Logan & Cowan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die Stop-Signal Reaction Time (SSRT) beziffert die Latenz, die das Gehirn benötigt, um einen bereits initiierten motorischen Impuls abzublasen. Das Horse-Race-Modell von Logan und Cowan (1984) belegt, dass Handlungsausführung und Handlungsstopp als zwei konkurrierende neuronale Pfade um die Vorherrschaft ringen."
        }
      },
      {
        "@type": "Question",
        "name": "Nach welchen Kriterien stufen professionelle Spieler Bedrohungen beim Site-Push ein?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Profis gewichten Bedrohungen nach Sichtlinienexposition, Waffenletalität auf die gegebene Distanz (z. B. Schrotflinte im Nahkampf vs. Gewehr auf Distanz), Crosshair Placement des Gegners und Verbleib von Teamressourcen, um stets den gefährlichsten Winkel zuerst zu neutralisieren."
        }
      },
      {
        "@type": "Question",
        "name": "Was bewirkt die Ablenkungsunterdrückung (Distractor Suppression) im Gehirn?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die von Broadbent (1958) und Treisman (1964) postulierte Aufmerksamkeitsfilterung ermöglicht es dem visuellen Kortex, aufgabenirrelevante Reize wie kreuzende Teamkollegen aktiv abzuschwächen, sodass kognitive Kapazitäten vollständig für die Prioritätsbekämpfung reserviert bleiben."
        }
      },
      {
        "@type": "Question",
        "name": "Wie wirkt sich das Beschießen von Attrappen auf die Runden-Siegquote in CS2 und Valorant aus?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Das Verschwenden von Munition oder das Verraten der Fadenkreuzposition an Attrappen (z. B. Yoru-Klone oder Mirage-Illusionen) verschafft echten Gegnern ein ungestraftes Timing-Fenster, was die Clutch-Gewinnchance im 1vX um mehr als 45% mindert."
        }
      },
      {
        "@type": "Question",
        "name": "Welcher Einfluss hat die Mausempfindlichkeit auf präzise Zielwechsel und Stoppkraft?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Eine mittlere bis niedrige Mausempfindlichkeit (30–42 cm/360°) bietet überlegene mechanische Bremskraft (Antagonisten-Kontraktion), wodurch ein Überziehen über die Primärbedrohung hinaus auf benachbarte Ablenkungsziele zuverlässig verhindert wird."
        }
      },
      {
        "@type": "Question",
        "name": "Warum verringert starker Adrenalinausstoß die taktische Entscheidungsgeschwindigkeit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Starke sympathische Erregung führt zu sogenanntem Tunnelblick und hemmt die präfrontale Kortexaktivität zugunsten schneller subkortikaler Fluchtreflexe, was zu unüberlegten Klicks auf erstbeste visuelle Kontraste verleitet."
        }
      },
      {
        "@type": "Question",
        "name": "Wie oft sollte kognitive Zielpriorisierung trainiert werden?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ein tägliches 10-minütiges Warm-up mit strukturiertem Zielpriorisierungs- und Go/No-Go-Training konditioniert die präfrontalen Hemmungsbahnen, schärft die Schussdisziplin und beugt Panikfeuer in Ranglistenspielen wirksam vor."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Zielpriorisierung und Bedrohungseinschätzung trainieren",
    "description": "Schritt-für-Schritt-Anleitung zur Entwicklung blitzschneller Bedrohungsdifferenzierung, Ablenkungsunterdrückung und Schusshemmung.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Mausempfindlichkeit kalibrieren",
        "text": "Passe DPI und In-Game-Sensitivität in den Session-Einstellungen exakt an dein Hauptspiel an, um 1:1-Muskelgedächtnis zu bewahren.",
        "url": "https://skilldrills.online/de/drills/fps/target-prioritization#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Rote Primärbedrohungen erfassen",
        "text": "Scanne das Zielfeld aktiv nach auftauchenden roten Zielen mit hoher Bedrohung und schalte diese vor Ablauf des Timers ballistisch aus.",
        "url": "https://skilldrills.online/de/drills/fps/target-prioritization#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Gelbe Sekundärziele neutralisieren",
        "text": "Wechsle nach Klärung der roten Bedrohungen sofort zu gelben Zielen, bevor deren Countdown abläuft und sie zu Hochrisikozielen eskalieren.",
        "url": "https://skilldrills.online/de/drills/fps/target-prioritization#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Schusshemmung bei grünen Verbündeten wahren",
        "text": "Unterdrücke den Abzugsimpuls diszipliniert bei grünen Einheiten; das Unterlassen von Fehlschüssen erhält deine Combo-Multiplikatoren aufrecht.",
        "url": "https://skilldrills.online/de/drills/fps/target-prioritization#step-4"
      }
    ]
  };

  const targetPrioritizationGuide = {
    heading: "Zielpriorisierung FPS Training Guide & Biomechanik der Schusshemmung",
    intro: [
      "Zielpriorisierung FPS Training ist ein hochentwickeltes perzeptiv-kognitives Trainingsmodul zur Schärfung blitzschneller Bedrohungseinschätzung, selektiver visueller Ablenkungsunterdrückung und exekutiver motorischer Hemmung. In modernen taktischen Shootern wie Counter-Strike 2, Valorant, Rainbow Six Siege und Apex Legends entscheiden nicht allein rohe Flick-Geschwindigkeiten über den Rundensieg, sondern die Zielauswahl: Welcher Kontrahent muss augenblicklich neutralisiert werden, während der Schussimpuls gegenüber Verbündeten und harmlosen Attrappen diszipliniert unterdrückt wird?",
      "Die neurophysiologische Grundlage motorischer Hemmungsprozesse wurde von Gordon D. Logan und William B. Cowan (1984) im wegweisenden Stop-Signal-Paradigma formuliert. Ihr 'Horse-Race'-Modell belegt, dass Handlungsausführung (Go-Prozess) und Handlungsunterdrückung (Stop-Prozess) als zwei unabhängige neuronale Netzwerke im fronto-basalgangliären Kreislauf um die Vorherrschaft konkurrieren. Spieler ohne gezieltes Schusshemmungstraining unterliegen unter Wettkampfdruck reflexartigem Panikfeuer, indem sie den Zeigefinger krümmen, bevor die visuelle Zielverifikation abgeschlossen ist.",
      "Die Mechanismen der visuellen Reizfilterung wurden durch Donald E. Broadbent (1958) und Anne Treisman (1964) in den Modellen der selektiven Aufmerksamkeit begründet. Treffen mehrere konkurrierende Reize auf die Netzhaut ein, aktiviert das Gehirn Top-Down-Aufmerksamkeitsfilter (Posner & Petersen, 1990), um irrelevante Bewegungen peripher abzuschwächen und foveale Ressourcen voll auf die gefährlichste Bedrohungsachse zu lenken.",
      "Durch die Verknüpfung von Franciscus Cornelis Donders' (1868) Go/No-Go-Diskriminationsmodellen mit hochauflösender digitaler Chronometrie via performance.now() (Woods et al., 2015) schließt dieses Trainingssystem die Lücke zwischen reinem Mausempfinden und taktischer Entscheidungspräzision unter realem Wettkampfdruck.",
      "Messmethodik: Jedes Ereignis wird clientseitig über die hochpräzise performance.now()-Uhr deines Browsers erfasst – ohne Serververzögerung oder Datenübertragung. Zu beachten: Browser-Timer werden aus Sicherheitsgründen (Spectre-Schutz) auf ca. 1 ms gerundet; Bildschirme quantisieren visuelle Reize über die Bildwiederholrate (16,7 ms bei 60 Hz, 6,9 ms bei 144 Hz, 4,1 ms bei 240 Hz). Die USB-Abfragerate der Maus fügt ca. 1 ms bei 1000 Hz bzw. 8 ms bei 125 Hz hinzu. Latenzunterschiede unter 5 ms stellen messtechnisches Rauschen dar; vergleiche deine Trainingsläufe daher stets auf identischer Hardware."
    ],
    benchmarks: {
      title: "Benchmarks für Bedrohungseinschätzung & Reaktionshemmung",
      headers: ["Leistungsstufe", "Entscheidungslatenz", "Prioritäts-Genauigkeit", "Wettkampf-Implikation (In-Game)"],
      rows: [
        ["Tier 1 (Profi / Radiant / Global Elite)", "Unter 280 ms", "96% – 99%+", "Fehlerfreie Bedrohungsauswahl; sofortige Ausschaltung roter Gefahren ohne Friendly Fire bei Mehrfach-Pushes"],
        ["Tier 2 (Master / Tier-2 Esports)", "280 – 340 ms", "90% – 96%", "Außergewöhnliche Entscheidungsgeschwindigkeit; blitzschnelle Korrektur nach Zieleskalation; unter 1% Fehlschussquote auf Verbündete"],
        ["Tier 3 (Diamond / Ascendant)", "340 – 420 ms", "82% – 90%", "Zuverlässige Priorisierung; 60–90 ms Zögern, wenn rote und gelbe Bedrohungen in engem Sichtfeld erscheinen"],
        ["Tier 4 (Gold / Platin)", "420 – 520 ms", "72% – 82%", "Anfällig für reflexartiges Panikfeuer; feuert gelegentlich auf grüne Einheiten oder voreilig auf gelbe Ziele"],
        ["Tier 5 (Einsteiger / Panikschütze)", "Über 520 ms", "Unter 72%", "Häufige impulsive Fehlbedienungen; hohe Friendly-Fire-Quote; Überforderung bei visueller Reizüberflutung"]
      ],
      note: "Die Entscheidungslatenz misst das Zeitintervall vom Erscheinen der Hochrisiko-Bedrohung bis zum validen Klick; die Prioritäts-Genauigkeit spiegelt korrekte Zielentscheidungen im Verhältnis zu gesamten Schussaktionen wider (Woods et al., 2015)."
    },
    techniques: {
      title: "Evidenzbasierte Protokolle für perfekte Zielpriorisierung",
      items: [
        {
          name: "Exekutive Reaktionshemmung (Go/No-Go Trigger-Disziplin)",
          desc: "Konditioniere den präfrontalen Kortex darauf, vorbereitete Klickbewegungen bei Erkennen grüner Verbündetenmerkmale augenblicklich zu stoppen (Logan & Cowan, 1984). Trainiere bewusste Fingerentspannung statt reflexartigem Abdrücken auf jede Bewegung.",
          tips: "Lass deinen Zeigefinger locker ohne Muskelvorspannung auf der Maustaste ruhen, bis der Status des Ziels zweifelsfrei verifiziert ist."
        },
        {
          name: "Dynamisches Bedrohungshierarchie-Scanning",
          desc: "Fokussiere deine primäre visuelle Suche auf aktive rote Hochrisiko-Ziele und betrachte gelbe Ziele als sekundäre Bereitstellungsphase. Das Ausschalten des Gegners mit direkter Schusslinie maximiert die Runden-Siegwahrscheinlichkeit.",
          tips: "Befindet sich ein gelbes Ziel näher am Fadenkreuz, aber ein rotes Ziel ist aktiv, ziehe das Fadenkreuz zwingend zuerst zum roten Ziel."
        },
        {
          name: "Periphere Ablenkungsunterdrückung (Distractor Suppression)",
          desc: "Setze selektive Aufmerksamkeitsfilterung ein (Broadbent, 1958; Treisman, 1964), um kreuzende verbündete Einheiten im Sichtfeld auszublenden, ohne gegnerische Bewegungskorridore aus dem Auge zu verlieren.",
          tips: "Erweitere dein peripheres Sichtfeld mental, sodass freundliche Silhouetten als Hintergrundrauschen verarbeitet werden."
        },
        {
          name: "Kadenzierte ballistische Zielentscheidung",
          desc: "Vermeide unkontrolliertes Dauerfeuer. Halte eine zweistufige Kadenz ein: Nutze die ersten 30–50 ms zur kognitiven Bedrohungsprüfung, bevor du den 120–160 ms Flick ausführst, damit nur validierte Befehle an die Hand gesendet werden.",
          tips: "Eine minimale Pause von 40 ms zur visuellen Zielbestätigung verhindert verhängnisvolle Fehlschüsse und Combo-Verluste."
        }
      ]
    },
    steps: [
      "Passe In-Game-Sensitivität und DPI in den Session-Einstellungen für 1:1-Mauskoordinaten an und aktiviere die Mauszeigersperre.",
      "Überwache das Zielfeld kontinuierlich auf das Auftauchen roter Hochrisiko-Bedrohungen.",
      "Schalte vorrangig aktive rote Ziele aus (+100 Punkte, +0,4s Bonuszeit auf die Runden-Uhr).",
      "Neutralisiere gelbe Sekundärziele, bevor deren Timer abläuft und sie zu roten Bedrohungen eskalieren.",
      "Wahre strikte Trigger-Disziplin und ignoriere grüne Einheiten vollständig, um deine Combo-Multiplikatoren aufzubauen."
    ],
    audience: "Ambitionierte FPS-Spieler in Counter-Strike 2, Valorant, Rainbow Six Siege und Apex Legends, die exzellente Bedrohungsdifferenzierung, reduzierte Panikschüsse und überlegene Entscheidungsgeschwindigkeit in Clutch-Situationen anstreben.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'posner1990', 'green2003', 'donders1969', 'treisman1980', 'logan1984'),
    related: [
      { href: "/de/drills/fps/target-acquisition", label: "Zielerfassung FPS Training" },
      { href: "/de/drills/fps/flick-shot-training", label: "Flick Shot Training" },
      { href: "/de/drills/fps/180-degree-awareness", label: "180 Grad Aiming" },
      { href: "/de/drills/fps/instant-response", label: "FPS Reaktionszeit Test" },
      { href: "/de/drills/fps/recoil-control", label: "Recoil Control Training" }
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
      <TargetPrioritizationClient
        copy={{
          h1Keyword: "Zielpriorisierung FPS Training",
          h1Suffix: " – Bedrohungsauswahl & Schusshemmung",
          statScore: "Punkte",
          statTime: "Zeit",
          statAccuracy: "Präzision",
          statBestScore: "Highscore",
          statThreatsCleared: "Gefahren neutralisiert",
          statMaxCombo: "Max Combo",
          statPeakLevel: "Höchstlevel",
          startTitle: "Zielpriorisierung",
          startSubtitle: "Bedrohungseinschätzung & Kognitives Filtern • Endlose Levelprogression",
          getReady: "BEREIT MACHEN",
          toggleFlash: "Fehlschuss-Blitz an/aus",
          toggleSound: "Audio an/aus",
          pausedTitle: "PAUSIERT",
          pausedSubtitle: "Klicken zum Fortsetzen — Mauszeiger wird wieder gesperrt.",
          stageCaption: "Eliminiere zuerst rote Primärbedrohungen und anschließend gelbe Sekundärziele. Schieße niemals auf grüne Verbündete!",
          rulesTitle: "Trainingsregeln & Punktesystem",
          rulesItems: [
            { num: "1", text: "Primäre Bedrohung", highlight: "Rot (+100 PKT / +0,4s)", result: "Muss absolut vorrangig eliminiert werden" },
            { num: "2", text: "Sekundäre Bedrohung", highlight: "Gelb (+50 PKT / +0,4s)", result: "Eskaliert nach Ablauf des Timers zu Rot" },
            { num: "3", text: "Grüner Verbündeter", highlight: "Grün (NICHT SCHIESSEN)", result: "Beschuss, falsches Ziel oder Fehlschuss setzt Combo zurück" },
            { num: "4", text: "Level-Progression", highlight: "Alle 1.400 PKT +1 Level", result: "Kontinuierlich steigende Zieldichte & Geschwindigkeit" }
          ],
          aboutTitle: "Über Zielpriorisierung im FPS-Gaming",
          aboutHeading: "Was ist Zielpriorisierung (Target Prioritization)?",
          aboutText: "Zielpriorisierung beschreibt die exekutive Fähigkeit, in komplexen Kampfsituationen mehrere sichtbare Gegner blitzschnell nach ihrer unmittelbaren Gefährlichkeit zu gewichten und den tödlichsten Kontrahenten zuerst auszuschalten. Gleichzeitig erfordert dies Schusshemmung (Trigger-Disziplin), um nicht reflexartig auf Verbündete oder harmlose Attrappen zu feuern. Logan und Cowan (1984) wiesen nach, dass das Abbrechen einer bereits vorbereiteten Schussbewegung einem eigenständigen neurologischen Hemmungsprozess unterliegt."
        }}
      />
      <DrillGuide guide={targetPrioritizationGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/target-prioritization"
          locale="de"
        />
      </div>
    </>
  );
}
