import ProSmoothPursuitClient from '@/app/drills/fps/pro-smooth-pursuit/ProSmoothPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';

export const metadata = {
  title: "Smooth Pursuit Aim Trainer – Kurven-Tracking | SkillDrills",
  description: "Kostenloser Smooth Pursuit Aim Trainer. Trainiere kontinuierliches Kurven-Tracking und flüssige Mausführung für High-TTK-Shooter wie Apex und Overwatch 2.",
  keywords: [
    "Smooth Pursuit Aim Trainer",
    "Smooth Tracking Training",
    "Kurven-Tracking FPS",
    "Lissajous Tracking Übung",
    "Aim Zittern verhindern",
    "Apex Legends Tracking üben",
    "Overwatch 2 Tracking Aim",
    "Blickfolgebewegungen FPS",
    "Flüssiges Zielen lernen",
    "High-TTK Aim Trainer",
    "Unterarm Stabilisierung Aim",
    "Aim Trainer kostenlos"
  ],
  alternates: {
    canonical: "https://skilldrills.online/de/drills/fps/pro-smooth-pursuit",
    languages: getAlternateLanguages('/drills/fps/pro-smooth-pursuit'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Smooth Pursuit Aim Trainer – Kurven-Tracking | SkillDrills",
    description: "Kostenloser Smooth Pursuit Aim Trainer. Trainiere kontinuierliches Kurven-Tracking und flüssige Mausführung für High-TTK-Shooter wie Apex und Overwatch 2.",
    url: "https://skilldrills.online/de/drills/fps/pro-smooth-pursuit",
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Smooth Pursuit Aim Trainer – Kurven-Tracking | SkillDrills",
    description: "Kostenloser Smooth Pursuit Aim Trainer. Trainiere kontinuierliches Kurven-Tracking und flüssige Mausführung für High-TTK-Shooter wie Apex und Overwatch 2.",
  },
};

export default function GermanProSmoothPursuitPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/de" },
      { "@type": "ListItem", "position": 2, "name": "FPS Training", "item": "https://skilldrills.online/de/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Smooth Pursuit Aim Trainer", "item": "https://skilldrills.online/de/drills/fps/pro-smooth-pursuit" }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Smooth Pursuit Aim Trainer",
    "url": "https://skilldrills.online/de/drills/fps/pro-smooth-pursuit",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
    "inLanguage": "de",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "description": "Kostenloser browserbasierter Smooth-Pursuit-Aim-Trainer. Trainiere kontinuierliches Kurven-Tracking, harmonische Lissajous-Muster und zitterfreie Mausführung."
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Smooth Pursuit Aim Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-15",
    "inLanguage": "de",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
    "description": "Kostenlose Trainingssoftware für kontinuierliche Blickfolgebewegungen, Kurven-Tracking und Unterarm-Stabilisierung für kompetitive Shooter.",
    "genre": "FPS Training / Smooth Pursuit Aim",
    "url": "https://skilldrills.online/de/drills/fps/pro-smooth-pursuit",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Smooth Pursuit Aim Trainer",
    "url": "https://skilldrills.online/de/drills/fps/pro-smooth-pursuit",
    "description": "Kostenlose Trainingssoftware für kontinuierliche Blickfolgebewegungen, Kurven-Tracking und Unterarm-Stabilisierung für kompetitive Shooter.",
    "dateModified": "2026-09-15",
    "inLanguage": "de",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Smooth Pursuit"],
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
        "name": "Was ist Smooth-Pursuit-Training beim FPS-Aiming?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Smooth-Pursuit-Training schult die Fähigkeit des okulomotorischen Systems, sich kontinuierlich bewegende Ziele entlang geschwungener Bahnen flüssig zu fixieren, ohne in abrupte Korrektursakkaden oder ruckartige Flicks zu verfallen. Es trainiert den präzisen Abgleich zwischen Augenfolgebewegung und Mausgeschwindigkeit."
        }
      },
      {
        "@type": "Question",
        "name": "Wie unterscheidet sich Smooth Pursuit neurologisch von Sakkaden?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cyril Rashbass wies 1961 nach, dass Sakkaden und Blickfolgebewegungen (Smooth Pursuit) über voneinander unabhängige neuronale Schaltkreise gesteuert werden. Sakkaden sind ballistische Sprünge, ausgelöst durch Positionsfehler. Smooth Pursuit hingegen ist ein geschlossener Regelkreis, der auf Netzhaut-Geschwindigkeitsschlupf reagiert und über die Hirnareale MT/V5 und frontale Augenfelder vermittelt wird (Krauzlis, 2004)."
        }
      },
      {
        "@type": "Question",
        "name": "Warum zittert mein Aim beim Verfolgen gekrümmter Flugbahnen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Zittern entsteht meist durch zu hohe Muskelspannung im Unterarm, übermäßige Reibung auf dem Mauspad oder das Fixieren des Fadenkreuzes statt des Ziels. Wer das Fadenkreuz anstarrt, verleitet das Gehirn zu hektischen Mikrokontrollen, die sich als Handzittern manifestieren."
        }
      },
      {
        "@type": "Question",
        "name": "Was versteht man unter fovealem Blick-Voraus-Führen (Gaze Leading)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nach Land & McLeod (2000) blicken Eliteschützen nicht starr auf das Zentrum, sondern richten den fovealen Blick 2–5 Pixel vor die führende Kante des Zielobjekts. Dieses vorausschauende Führen erlaubt dem motorischen Kortex, bevorstehende Richtungsänderungen vorab zu planen."
        }
      },
      {
        "@type": "Question",
        "name": "Warum ist Smooth Pursuit in High-TTK-Spielen wie Apex Legends und Overwatch 2 entscheidend?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In Shootern mit langer Time-to-Kill (High TTK) überstehen Gegner mehrere Sekunden Dauerbeschuss, während sie Ausweichmanöver wie Slides oder Wallbounces vollziehen. Duelle gewinnt man nur durch ununterbrochene Treffer-Uptime via Smooth Pursuit statt durch einzelne Glückstreffer."
        }
      },
      {
        "@type": "Question",
        "name": "Was ist eine Lissajous-Kurve und warum wird sie für Tracking-Training genutzt?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Eine Lissajous-Kurve entsteht durch zwei senkrecht aufeinanderstehende Sinusschwingungen mit unterschiedlichen Frequenzen. Sie erzeugt stetig wechselnde Beschleunigungsmuster, die lineares Auswendiglernen unmöglich machen und echte Reaktionsverfolgung fordern."
        }
      },
      {
        "@type": "Question",
        "name": "Wie beeinflussen Monitor-Bildwiederholrate und Maus-Polling das Tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Monitore mit 144 bis 360 Hz liefern kontinuierliche Bewegungsinformationen ohne störende Bewegungsunschärfe (Woods et al., 2015). Eine Mausabfragerate von 1000 Hz oder mehr garantiert verzögerungsfreie Sensorübertragung ohne störende Stufenbildung."
        }
      },
      {
        "@type": "Question",
        "name": "Welcher Mausgriff bietet die höchste Stabilität für kontinuierliches Tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ein entspannter Claw- oder Palm-Claw-Griff mit stabiler Handflächenauflage bietet überlegene Tracking-Ruhe. Er verankert die Bewegung am Ellbogen und verhindert unkontrollierte Fingerzuckungen bei weiten Kreisbögen."
        }
      },
      {
        "@type": "Question",
        "name": "Wie oft sollte Smooth Pursuit trainiert werden?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tägliche Einheiten von 10 bis 15 Minuten vor kompetitiven Matches wärmen die Unterarmmuskulatur auf und synchronisieren die Augenfolgebewegung. Länger als 30 Minuten sollte nicht am Stück geübt werden, um Sehnenermüdung zu vermeiden."
        }
      },
      {
        "@type": "Question",
        "name": "Warum setzt das Verlassen des Ziels den Multiplikator zurück?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Das Zurücksetzen der Combo belohnt kontinuierliche Treffer-Uptime und disziplinierte Strahlführung. Wer die Zielzone für 1,0 Sekunde verlässt, verliert seinen Multiplikator und erhält bei aktiver Zeitstrafe einen Abzug von 0,6 Sekunden."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Anleitung: Smooth-Pursuit-Tracking trainieren",
    "description": "Schritt-für-Schritt-Anleitung zur Verfeinerung kontinuierlicher Blickfolgebewegungen und Unterarm-Mausführung entlang Lissajous-Kurven.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Sensitivität präzise einstellen",
        "text": "Stelle DPI und Spielsensitivität in den Session-Optionen ein, um dein gewohntes 1:1-Muskelgedächtnis zu bewahren.",
        "url": "https://skilldrills.online/de/drills/fps/pro-smooth-pursuit#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Pointer Lock aktivieren",
        "text": "Starte den Drill im Vollbildmodus, um den Mauszeiger hardwarenah ohne Windows-Beschleunigung zu binden.",
        "url": "https://skilldrills.online/de/drills/fps/pro-smooth-pursuit#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Fovealen Blick auf das Ziel richten",
        "text": "Fixiere deine Augen direkt auf die führende Kante des Zielmodells, statt auf das eigene Fadenkreuz zu schauen.",
        "url": "https://skilldrills.online/de/drills/fps/pro-smooth-pursuit#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Kurvengeschwindigkeit flüssig anpassen",
        "text": "Führe die Maus mit entspanntem Unterarm aus dem Ellbogen heraus und passe dein Tempo harmonisch an Kurvenwechsel an.",
        "url": "https://skilldrills.online/de/drills/fps/pro-smooth-pursuit#step-4"
      }
    ]
  };

  const proSmoothPursuitGuide = {
    heading: "Smooth Pursuit Aim Trainer Guide & Tracking-Biomechanik",
    intro: [
      "Der Smooth Pursuit Aim Trainer ist eine empirisch entwickelte sensomotorische Trainingsübung zur Perfektionierung kontinuierlicher Augenfolgebewegungen, dem Lesen harmonischer Lissajous-Kurven und zitterfreier Unterarm-Stabilisierung. In modernen High-TTK-Shootern wie Apex Legends, Overwatch 2 und The Finals entscheidet die sogenannte Treffer-Uptime über den Ausgang von Duellen: Schützen müssen das Fadenkreuz über mehrere Sekunden hinweg ununterbrochen auf agil manövrierenden Zielen halten.",
      "Die neurobiologischen Grundlagen der Blickfolgebewegung wurden maßgeblich von Richard J. Krauzlis (2004) entschlüsselt: Oszillierende Augenbewegungen werden über kortikale Rückkopplungsschleifen zwischen dem medialen superioren temporalen Areal (MST), dem frontalen Augenfeld (FEF) und dem primären visuellen Bewegungskortex (MT/V5) reguliert. Statt bloß passiv zu reagieren, modelliert dieser neuronale Schaltkreis Geschwindigkeitsvektoren voraus, um die Augenmuskulatur in Echtzeit anzusteuern.",
      "Bereits 1961 bewies Cyril Rashbass in wegweisenden psychophysischen Experimenten, dass Blickfolgebewegungen und Sakkaden anatomisch wie funktional getrennt agieren: Sakkaden springen auf Positionsfehler an, während Smooth Pursuit rein auf visuelle Geschwindigkeitsdifferenzen (Netzhaut-Schlupf) reagiert. Versuchen Spieler, einem bewegten Ziel mit ruckartigen Mini-Flicks hinterherzujagen, unterbrechen sie diesen geschlossenen Regelkreis und provozieren unfreiwillige Korrektursakkaden, die das Fadenkreuz unruhig zucken lassen.",
      "Durch die Verbindung harmonischer Lissajous-Koordinaten mit den Prinzipien des fovealen Blick-Voraus-Führens (Land & McLeod, 2000), dynamischer Aufmerksamkeits-Erweiterung (Green & Bavelier, 2003) und digitaler Hochfrequenz-Chronometrie (Woods et al., 2015) schult dieser Trainer das vollständige Lösen von Unterarmverkrampfungen und das Führen eines lasergleichen Trefferstrahls.",
      "Messmethodik: Jedes Ereignis wird mit dem hochauflösenden performance.now()-Zeitstempel deines Browsers lokal erfasst – es werden keine Daten hochgeladen. Zu beachten: Aus Sicherheitsgründen (Spectre-Schutz) runden Browser Zeitmessungen auf etwa 1 ms. Bildschirme quantisieren die Darstellung auf Bildintervalle (~16,7 ms bei 60 Hz, 6,9 ms bei 144 Hz und 4,1 ms bei 240 Hz nach Woods et al., 2015). Differenzen unter 5 ms stellen messtechnisches Rauschen dar. Vergleiche deine Ergebnisse daher primär auf demselben Setup."
    ],
    benchmarks: {
      title: "Tracking-Verweildauer & Geschwindigkeits-Kompensations-Stufen",
      headers: ["Leistungsstufe", "Ziel-Verweildauer %", "Neuromuskulärer & Okulomotorischer Zustand", "Kompetitive Ingame-Bedeutung"],
      rows: [
        ["Stufe 1 (Apex Beam)", "85 % – 95 %+", "Lückenlose foveale Fixation; perfekter Geschwindigkeitsabgleich in Wendepunkten ohne Korrektursakkaden", "Tödliches Strahl-Tracking auf Apex-Predator- und Top-500-Overwatch-Niveau"],
        ["Stufe 2 (Kompetitiver Pro)", "72 % – 85 %", "Flüssige Unterarm-Modulation; sofortige Geschwindigkeitskompensation am Scheitelpunkt", "Gewinnt ausgedehnte High-TTK-1v1-Duelle gegen strafende Gegner mit hoher Waffen-Effizienz"],
        ["Stufe 3 (Fortgeschritten)", "58 % – 72 %", "Solides lineares Tracking; leichtes Zögern und 10–15 % Trackingverlust bei schnellen Richtungswechseln", "Kompetitive Tracking-Leistung; leichte Defizite bei extrem erratischen Mobility-Manövern"],
        ["Stufe 4 (Mittelstufe)", "42 % – 58 %", "Neigung zum Nachflicken statt Gleiten; Unterarm-Anspannung erzeugt Ruckler und Übersteuern", "Anfällig für agile Charaktere; häufige Abrisse des Trefferstrahls während des Sprays"],
        ["Stufe 5 (Basis / Zittrig)", "Unter 42 %", "Hohe okulomotorische Latenz; Fadenkreuz hinkt hinterher und erfordert weite korrigierende Flicks", "Verfehlt Großteil der Schüsse; zu hohe Mausreibung oder Muskelkrampf verursacht Stottern"]
      ],
      note: "Tracking-Uptime-Prozentsätze spiegeln die kumulierte Verweildauer auf dem Ziel geteilt durch die Gesamtlaufzeit wider, gemessen via performance.now() (Woods et al., 2015)."
    },
    techniques: {
      title: "Evidenzbasierte Protokolle für perfektes Smooth Pursuit Aiming",
      items: [
        {
          name: "Foveales Blick-Voraus-Führen statt Fadenkreuz-Fixierung",
          desc: "Schauen Sie niemals direkt auf Ihr Fadenkreuz während des Trackings. Wie Land & McLeod (2000) bewiesen, stört das Fokussieren des Werkzeugs die visuelle Geschwindigkeitsvorhersage. Richten Sie Ihren Blick 2–5 Pixel vor die vordere Zielkante – Hand und Fadenkreuz folgen der fovealen Führung automatisch.",
          tips: "Wenn sich das Zielen ruckelig anfühlt, richten Sie die Augen bewusst ganz auf die Zieloberfläche und atmen Sie langsam aus."
        },
        {
          name: "Lösen von Muskel-Mikrospannungen & Gelenkentkopplung",
          desc: "Muskelanspannung ist die Hauptursache für Zitterbewegungen. Ein verkrampfter Unterarm aktiviert antagonistische Muskelgruppen und erzeugt Zittern. Legen Sie den Unterarm entspannt auf das Mauspad auf und führen Sie weite Kurven aus dem Ellbogengelenk statt aus dem Handgelenk.",
          tips: "Halten Sie die Maus mit nur 30–40 % der maximalen Griffkraft – eine lockere Hand führt zu flüssigem Tracking."
        },
        {
          name: "Harmonische Kurvengeschwindigkeit antizipieren",
          desc: "Lissajous-Kurven folgen sinusförmigen Bewegungsgesetzen: Sie verlangsamen sich an den Wendepunkten und beschleunigen im Zentrum. Das Kleinhirn kann diese Harmonik erlernen (Krauzlis, 2004), sodass Sie vor der Kurve sanft abbremsen und danach beschleunigen, ohne den Anschluss zu verlieren.",
          tips: "Achten Sie auf den Rhythmus der Zielbewegung und antizipieren Sie die Kurvenumkehr."
        },
        {
          name: "Unterdrückung von Korrektur-Sakkaden",
          desc: "Wenn Sie vom Ziel abrutschen, widerstehen Sie dem Drang, ruckartig zurückzuflicken. Rashbass (1961) wies nach, dass abrupte Sakkaden die visuelle Informationsverarbeitung für 20–50 ms lähmen. Beschleunigen Sie Ihre Gleitbewegung stattdessen geschmeidig, um das Ziel wieder einzufangen.",
          tips: "Betrachten Sie Tracking wie das Steuern eines Wagens auf nasser Fahrbahn – weiches Nachlenken schlägt hektisches Reißen."
        }
      ]
    },
    steps: [
      "Stelle deine gewohnte Ingame-Sensitivität und DPI ein, um 1:1-Hardware-Koordinaten zu wahren, und sperre den Zeiger.",
      "Fixiere das leuchtende Zielmodell, sobald es seine harmonische Lissajous-Bahn über den Bildschirm beginnt.",
      "Gleite mit entspanntem Unterarm aus dem Ellbogen heraus und passe deine Geschwindigkeit nahtlos an die Kurven an.",
      "Baue deine kontinuierliche Trefferzeit auf, um den Combo-Multiplikator auf bis zu 3,0x zu steigern und alle 1400 Punkte aufzusteigen.",
      "Analysiere deine prozentuale Verweildauer und Abrisszeiten im Abschlussbericht, um Schwachstellen bei Richtungswechseln zu erkennen."
    ],
    audience: "Kompetitive FPS-Tracking-Spezialisten in Apex Legends, Overwatch 2, The Finals und Warzone, die zitterfreie Strahlpräzision, ruhige Augenführung und hohe Schadens-Uptime gegen agile Gegner aufbauen wollen.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'krauzlis2004', 'green2003', 'rashbass1961', 'land2000'),
    related: [
      { href: "/de/drills/fps/anti-zigzag-movement-trainer", label: "Anti-Zigzag Aim Trainer" },
      { href: "/de/drills/fps/anti-strafe-jitter-duel", label: "Anti-Strafe Jitter Trainer" },
      { href: "/de/drills/fps/fps-tracking-trainer", label: "FPS Tracking Trainer" },
      { href: "/de/drills/fps/flick-shot-training", label: "Flick Shot Trainer" },
      { href: "/de/drills/reaction-speed/visual-tracking-speed-test", label: "Visual Tracking Speed Test" }
    ]
  };

  const copyDe = {
    h1Keyword: "Smooth Pursuit Aim Trainer",
    h1Suffix: " – Kurven-Tracking",
    statScore: "Punkte",
    statTime: "Verbleibende Zeit",
    statAccuracy: "Tracking-Präzision",
    statBestScore: "Highscore",
    startTitle: "Pro Smooth Pursuit",
    startSubtitle: "Lissajous-Kurven Smooth Pursuit • Stufenlose Progression",
    getReady: "BEREIT MACHEN",
    stageCaption: "Führe dein Fadenkreuz kontinuierlich und ohne Ruckeln auf dem oszillierenden Ziel entlang flüssiger Kurvenbahnen.",
    rulesTitle: "Trainingsanleitung & Punktesystem",
    rulesItems: [
      { num: "1", text: "Ziel-Tracking", highlight: "+50 PTS (+0.4s/s)", result: "×Combo-Multiplikator" },
      { num: "2", text: "Kontinuierliche Combo", highlight: "Bis zu 3.0×", result: "Max. Multiplikator" },
      { num: "3", text: "Levelaufstieg", highlight: "+1 Level / 1400 PTS", result: "Adaptive Kurven" },
      { num: "4", text: "Zielverlust-Strafe", highlight: "1.0s Zielverlust", result: "Combo-Reset (-0.6s)" }
    ],
    aboutTitle: "Über den Smooth Pursuit Aim Trainer"
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
      <ProSmoothPursuitClient copy={copyDe} />
      <div className="max-w-6xl mx-auto px-4 w-full pb-12">
        <RelatedDrills currentCategory="fps" currentHref="/drills/fps/pro-smooth-pursuit" locale="de" />
      </div>
      <DrillGuide guide={proSmoothPursuitGuide} />
      <DrillFooter />
    </>
  );
}
