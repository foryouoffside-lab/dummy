import AntiZigzagClient from '@/app/drills/fps/anti-zigzag-movement-trainer/AntiZigzagClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: "Anti-Zigzag Aim Trainer – Zickzack Tracking | SkillDrills",
  description: "Kostenloser Anti-Zigzag-Trainer im Browser: Meistere reaktives Tracking gegen Zickzack-Ausweichbewegungen und Slide-Cancels für Apex Legends und Warzone.",
  keywords: [
    "Anti-Zigzag Aim Trainer",
    "Zickzack Aiming Training",
    "Ausweichbewegung Tracking",
    "Gleitabbruch Tracking",
    "Zickzack Bewegung Tracken",
    "Reaktives Tracking Apex",
    "V-Crossover Tracking",
    "Zickzack Tracking Übungen",
    "Fadenkreuz Überschwingen verhindern",
    "Fadenkreuz Abbremsen Übung",
    "Nahkampf Tracking Warzone",
    "Richtungswechsel Fadenkreuz"
  ],
  alternates: {
    canonical: "https://skilldrills.online/de/drills/fps/anti-zigzag-movement-trainer",
    languages: getAlternateLanguages('/drills/fps/anti-zigzag-movement-trainer'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Anti-Zigzag Aim Trainer – Zickzack Tracking | SkillDrills",
    description: "Kostenloser Anti-Zigzag-Trainer im Browser: Meistere reaktives Tracking gegen Zickzack-Ausweichbewegungen und Slide-Cancels für Apex Legends und Warzone.",
    url: "https://skilldrills.online/de/drills/fps/anti-zigzag-movement-trainer",
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Anti-Zigzag Aim Trainer – Zickzack Tracking | SkillDrills",
    description: "Kostenloser Anti-Zigzag-Trainer im Browser: Meistere reaktives Tracking gegen Zickzack-Ausweichbewegungen und Slide-Cancels für Apex Legends und Warzone.",
  },
};

export default function AntiZigzagDePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/de" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/de/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Anti-Zigzag Trainer", "item": "https://skilldrills.online/de/drills/fps/anti-zigzag-movement-trainer" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Anti-Zigzag Aim Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
    "description": "Kostenloses Browsertraining zur Beherrschung reaktiven Trackings gegen unberechenbare Zickzack-Ausweichmanöver und Slide-Cancels.",
    "genre": "FPS Training / Anti-Zigzag",
    "url": "https://skilldrills.online/de/drills/fps/anti-zigzag-movement-trainer",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Anti-Zigzag Aim Trainer",
    "url": "https://skilldrills.online/de/drills/fps/anti-zigzag-movement-trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Erfordert Pointer Lock API, JavaScript und HTML5 Canvas Unterstützung",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "description": "Kostenloses Browsertraining zur Beherrschung reaktiven Trackings gegen unberechenbare Zickzack-Ausweichmanöver und Slide-Cancels."
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Anti-Zigzag Aim Trainer",
    "url": "https://skilldrills.online/de/drills/fps/anti-zigzag-movement-trainer",
    "description": "Kostenloses Browsertraining zur Beherrschung reaktiven Trackings gegen unberechenbare Zickzack-Ausweichmanöver und Slide-Cancels.",
    "dateModified": "2026-09-05",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Reactive Tracking"],
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
        "name": "Warum nutzen Spieler in FPS-Spielen unberechenbare Zickzack-Bewegungen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Spieler nutzen Zickzack-Muster, um die Fadenkreuz-Ausrichtung des Gegners zu brechen, Richtungswechsel jenseits der menschlichen Reaktionszeit zu erzwingen und Netcode-Desynchronisation auszunutzen, bei der Hitbox und gerendertes Modell bei extremen Wendungen kurzzeitig auseinanderdriften."
        }
      },
      {
        "@type": "Question",
        "name": "Wie verfolgt man erratische Zickzack-Bewegungen in Apex Legends und Warzone?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Zickzack-Bewegungen tracked man, indem man das Fadenkreuz auf der zentralen V-Crossover-Achse verankert, statt den äußeren Wendepunkten hinterherzujagen. Die Unterarmmuskulatur bleibt entspannt, der Blick ruht auf dem Torso des Gegners und die Geschwindigkeit wird beim Kreuzen des Zentrums angepasst."
        }
      },
      {
        "@type": "Question",
        "name": "Was versteht man unter der V-Crossover Tracking-Technik?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die V-Crossover-Technik verankert das Fadenkreuz im zentralen Korridor der gegnerischen Strafe-Bahn. Da ausweichende Ziele zwingend durch die Mitte kreuzen müssen, um die Richtung zu wechseln, minimiert dies den Mausweg und verhindert verhängnisvolles Überschießen an den Wendepunkten."
        }
      },
      {
        "@type": "Question",
        "name": "Wie tracked man Gegner, die Slide Canceling einsetzen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Slide-Canceling kombiniert horizontale Beschleunigung mit plötzlichem Höhenabfall. Um dies zu meistern, trainiert man diagonale Mehrachsen-Verfolgung und wartet den Beginn der Rutsch-Animation ab, bevor das Fadenkreuz auf Brusthöhe nachjustiert wird."
        }
      },
      {
        "@type": "Question",
        "name": "Warum überschwingt das Fadenkreuz bei abrupten Richtungswechseln?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Überschwingen (Overshoot) entsteht durch übermäßige Muskelanspannung (Death Gripping) und prädiktives Rucken. Bei abrupten Wendepunkten verhindert die Co-Kontraktion von Antagonistenmuskeln eine weiche Abbremsung, wodurch die Hand über das Ziel hinausschießt."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Mausempfindlichkeit ist optimal für das Verfolgen von Ausweichbewegungen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Eine mittlere Sensitivität zwischen 28 cm und 42 cm pro 360° bietet die ideale Balance: Schnell genug, um diagonale Nahkampf-Swipes ohne Umsetzen der Maus abzufedern, und stabil genug für jitterfreie Mikrokontrolle."
        }
      },
      {
        "@type": "Question",
        "name": "Hilft eine höhere Bildschirm-Bildwiederholrate beim Zickzack-Tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja. 144-Hz- oder 240-Hz-Monitore aktualisieren Frames alle 4,1 bis 6,9 ms (statt 16,7 ms bei 60 Hz), reduzieren Bewegungsunschärfe drastisch und stellen Vektoränderungen früher dar, sodass das visuelle Sehzentrum Umkehrimpulse schneller verarbeiten kann."
        }
      },
      {
        "@type": "Question",
        "name": "Wie führen Zickzack-Bewegungen zu Hitbox-Desynchronisation im Online-Multiplayer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bei clientseitiger Interpolation und Lag-Kompensation erzeugen schnelle Richtungswechsel minimale Latenz-Diskrepanzen zwischen der serverseitig berechneten Hitbox und dem auf dem Bildschirm dargestellten Charaktermodell."
        }
      },
      {
        "@type": "Question",
        "name": "Wie verbessere ich meine Dwell-Tracking-Präzision?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dwell-Tracking (Halte-Präzision) verbessert sich durch den Verzicht auf spekulatives Raten, dauerhafte Fixierung des Blicks auf die Zielmitte und kontinuierliche, weiche Gleitanpassungen anstelle abgehackter Klick-Flicks."
        }
      },
      {
        "@type": "Question",
        "name": "Können Anti-Zigzag-Drills Nahkampfduelle mit SMGs und Schrotflinten verbessern?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja. Im extremen Nahkampf treten die höchsten Winkelgeschwindigkeiten auf dem Monitor auf. Das Training reaktiven Zickzack-Trackings baut die neuromuskuläre Feinkontrolle auf, die für lückenlosen Dauerschaden gegen ausweichende Kontrahenten nötig ist."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Anti-Zigzag Strafe Tracking trainieren",
    "description": "Schritt-für-Schritt-Anleitung zur Beherrschung reaktiven Trackings gegen unberechenbare Zickzack-Ausweichmanöver.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Mausempfindlichkeit kalibrieren",
        "text": "Stimme deine Spiel-Sensitivität in den Session-Einstellungen ab, um 1:1-Hardwarekoordinaten für dein Muskelgedächtnis zu sichern.",
        "url": "https://skilldrills.online/de/drills/fps/anti-zigzag-movement-trainer#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Mauszeigersperre im Vollbild aktivieren",
        "text": "Klicke auf Start, um den Vollbildmodus zu starten und den Mauszeiger ohne Windows-Beschleunigungskurven direkt im Canvas zu sperren.",
        "url": "https://skilldrills.online/de/drills/fps/anti-zigzag-movement-trainer#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Im zentralen V-Korridor verankern",
        "text": "Fokussiere deine visuelle Aufmerksamkeit auf den Mittelkorridor des Bewegungspfads, statt den unberechenbaren Außenpunkten hinterherzuflicken.",
        "url": "https://skilldrills.online/de/drills/fps/anti-zigzag-movement-trainer#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Kontinuierlichen Dwell-Kontakt halten",
        "text": "Halte das Fadenkreuz stabil im Zielkörper, um die Gesundheit des Ziels vor Ablauf des Timers abzubauen und Combos aufzubauen.",
        "url": "https://skilldrills.online/de/drills/fps/anti-zigzag-movement-trainer#step-4"
      }
    ]
  };

  const antiZigzagGuide = {
    heading: "Anti-Zigzag Aim Training Guide & Biomechanik des Ausweichtrackings",
    intro: [
      "In kompetitiven Ego-Shootern mit dynamischen Bewegungsmechaniken – wie Apex Legends, Call of Duty: Warzone und Overwatch 2 – setzen geschickte Gegner auf unregelmäßige Zickzack-Läufe, Slide-Canceling und Hocksprünge, um das Fadenkreuz des Angreifers abzuschütteln und visuo-motorische Desynchronisation hervorzurufen. Während lineares Folgetracking (Smooth Pursuit) auf der Vorhersehbarkeit einer kontinuierlichen Flugbahn beruht (Krauzlis, 2004), zwingt Zickzack-Tracking das motorische System in eine fortlaufende Steuerungsaufgabe unter dynamischen Geschwindigkeits-Genauigkeits-Grenzen (Fitts, 1954; Accot & Zhai, 1997). Zwar verfügen erfahrene Gamer über gesteigerte visuelle Aufmerksamkeit und Kontrastschärfe (Green & Bavelier, 2003), doch bei abrupten schrägen Richtungswechseln erfährt das Sehsystem akuten retinalen Schlupf (Rashbass, 1961), der blitzschnelle Abbremsung und mehrachsige Handgelenksanpassungen fordert.",
      "Der fundamentale mechanische Fehler ungeübter Schützen bei Ausweichbewegungen ist das Über-Flicken hinter den äußeren Scheitelpunkten der gegnerischen Kurve. Führt ein Gegner ein Zickzack-Muster in V-Form aus, fällt seine Geschwindigkeit am äußeren Umkehrpunkt für einen Sekundenbruchteil auf null ab, bevor er beschleunigt zurück durch die Mitte zieht. Wer versucht, den Wendepunkt hektisch zu jagen, überschießt unweigerlich und gerät in antagonistische Muskelblockaden. Elite-Tracker nutzen stattdessen das 'V-Crossover-Anchoring': Sie verankern ihren visuellen Fokus nahe der Mittelachse und vollziehen feine, geschwindigkeitsangepasste Mikro-Korrekturen, während der Gegner durch das Fadenkreuz zurückkehrt.",
      "Der Anti-Zigzag Aim Trainer läuft direkt im modernen Webbrowser über die HTML5 Pointer Lock API mit nativer 1:1-Hardwareübertragung, performance.now()-Chronometrie und ohne künstliche Mausglättung. Durch die Minimierung von USB-Abfrage-Jitter (Woods et al., 2015) und das Trainieren kontinuierlicher Dwell-Time-Schadensmechaniken gegen steigende Zickzack-Frequenzen konditioniert diese Übung die notwendige sensomotorische Ruhe, um Panik-Flicks abzubauen und Ausweichduelle souverän zu dominieren.",
      "Messmethodik: Alle Tracking-Ereignisse werden clientseitig über die performance.now()-Hochpräzisionsuhr deines Browsers erfasst – absolut verzögerungsfrei ohne Server-Latenzen. Zu berücksichtigen: Browser runden Zeitstempel aus Sicherheitsgründen (Spectre-Schutz) auf ca. 1 ms; Bildschirme quantisieren visuelle Reize über die Bildwiederholrate (16,7 ms bei 60 Hz, 6,9 ms bei 144 Hz, 4,1 ms bei 240 Hz). Die USB-Abfragerate fügt bei 1000 Hz ca. 1 ms hinzu. Latenzunterschiede unter 5 ms stellen messtechnisches Rauschen dar; vergleiche Trainingsläufe stets auf identischer Hardware."
    ],
    benchmarks: {
      title: "Benchmarks für Ausweichbewegungen & Zickzack-Umkehrlatenz",
      headers: ["Tracking-Phase / Sensomotorische Stufe", "Typischer Latenzbereich", "Neuronale Bahn & Biomechanische Funktion", "Wettkampf-Implikation"],
      rows: [
        ["Lateral-zu-Diagonal Crossover Erkennung", "160 – 210 ms", "Retinaler Schlupf verarbeitet in V1 und MT/V5 Bewegungsarealen", "Latenzspanne, bis das Auge die Richtungsänderung des Gegners erfasst"],
        ["Antagonistische Bremsung & Umvektorierung", "85 – 135 ms", "Kortikospinaler Impuls an Unterarm-Beuger/Thenarmuskeln; Stoppen der Trägheit", "Physische Zeit zum Abstoppen des Mausvektors und Einleiten der Gegenrichtung"],
        ["Foveale Re-Zentrierung & Korridor-Ausrichtung", "65 – 105 ms", "Korrektive Mikro-Sakkade und Handgelenksartikulation zur Fadenkreuz-Bindung", "Wiederherstellen des Dwell-Kontakts auf der Hitbox zur Schadensreaktivierung"],
        ["Unvorbereitetes Gesamtreaktionsfenster", "310 – 450 ms", "Gesamtdauer vom unvorhersehbaren Zickzack-Flip bis zum bestätigten Dwell-Lock", "Natürlicher Latenzverlust, in dem Projektilschaden bei Ausweichbewegungen einbricht"],
        ["Elite Reaktives Ausweichtracking", "215 – 295 ms", "Antizipatorische Geschwindigkeitsanpassung & entspannte Muskelkontrolle im V-Korridor", "Meisterschaftsniveau von Apex Predators und Call of Duty Warzone Profis"]
      ],
      note: "Metriken synthetisiert aus okulomotorischer Forschung (Rashbass, 1961; Krauzlis, 2004), Lenkgesetzen (Accot & Zhai, 1997; Fitts, 1954) und digitaler Chronometrie (Woods et al., 2015)."
    },
    techniques: {
      title: "Evidenzbasierte Protokolle für Ausweichtracking & Anti-Zigzag",
      items: [
        {
          name: "Zentrierte V-Crossover Verankerung",
          desc: "Jage erratischen Zielen nicht zu ihren äußeren Wendepunkten hinterher, an denen unberechenbare Richtungswechsel stattfinden. Verankere dein Fadenkreuz näher am zentralen Achsenkorridor, den der Gegner wiederholt durchqueren muss.",
          tips: "Lass das Ziel kontrolliert in dein Fadenkreuz zurückkreuzen und passe die Geschwindigkeit weich an, statt panisch nachzureißen."
        },
        {
          name: "Dämpfung der Unterarmmuskeln (Lockerer Griff)",
          desc: "Das Verkrampfen der Unterarmmuskulatur (Death Gripping) führt dazu, dass Antagonisten gegeneinander arbeiten, was bei schrägen Richtungswechseln zu eckigen, abgehackten Trackinglinien führt.",
          tips: "Halte die Maus mit leichtem Fingertip- oder entspanntem Claw-Grip, damit Finger und Handgelenk Richtungswechsel ohne Unterarm-Trägheit absorbieren."
        },
        {
          name: "Fokussierung auf das gegnerische Modell",
          desc: "Fixiere deinen Blick direkt auf den Rumpf des gegnerischen Charakters statt auf das eigene Fadenkreuz. Das visuelle Sehzentrum extrahiert Geschwindigkeits- und Richtungssignale automatisch über retinale Bewegung.",
          tips: "Hinkt dein Fadenkreuz hinterher, verlagere 100% deiner visuellen Aufmerksamkeit auf Hüfte und Torso des Gegners."
        },
        {
          name: "Verzögerungs-Frames und Körperneigung lesen",
          desc: "In Shootern mit physikalischer Trägheit (wie Warzone und Apex Legends) neigen sich Spielfiguren vor einer Richtungsumkehr leicht in die Kurve und zeigen minimale Verzögerungs-Frames.",
          tips: "Achte auf Modellneigungen, um den motorischen Kortex 30–50 ms vor dem eigentlichen Vektorwechsel vorzubereiten."
        }
      ]
    },
    steps: [
      "Stimme In-Game-Sensitivität und DPI in den Session-Einstellungen ab, um 1:1-Hardwarekoordinaten zu sichern.",
      "Klicke auf Start, um den Vollbildmodus zu aktivieren und den Hardware-Mauszeiger ohne Glättung zu sperren.",
      "Fixiere deinen Blick auf der Zielkugel, während sie schnelle, mehrachsige Zickzack-Muster ausführt.",
      "Halte dauerhaften Fadenkreuzkontakt auf dem Zielkörper und konzentriere dich auf die zentrale V-Achse.",
      "Eliminiere Ziele vor Ablauf ihrer Lebensdauer, um Combo-Multiplikatoren aufzubauen und höhere Level zu erreichen."
    ],
    audience: "Wettkampforientierte FPS-Spieler in Apex Legends, Call of Duty: Warzone, Overwatch 2, The Finals und CODM, die Ausweichmanöver, Slide-Cancels und zittriges Über-Flicken überwinden möchten.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'krauzlis2004', 'fitts1954', 'green2003', 'rashbass1961', 'accotZhai1997'),
    related: [
      { href: "/de/drills/fps/anti-strafe-jitter-duel", label: "Anti-Strafe Jitter Trainer" },
      { href: "/de/drills/fps/target-switching-swarm", label: "Target Switching Aim Trainer" },
      { href: "/de/drills/fps/pro-smooth-pursuit", label: "Smooth Pursuit Aim Trainer" },
      { href: "/de/drills/fps/flick-shot-training", label: "Flick Shot Training" },
      { href: "/de/drills/fps/180-degree-awareness", label: "180 Grad Aiming" }
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
      <AntiZigzagClient
        copy={{
          h1Keyword: "Anti-Zigzag Aim Trainer",
          h1Suffix: " – Ausweichbewegung & Zickzack-Tracking",
          statScore: "Punkte",
          statTime: "Zeit",
          statAccuracy: "Präzision",
          statBestScore: "Highscore",
          startTitle: "Anti-Zigzag Movement",
          startSubtitle: "Reaktives Tracking • Endlose Levelprogression",
          getReady: "BEREIT MACHEN",
          pausedTitle: "PAUSIERT",
          pausedSubtitle: "Klicken zum Fortsetzen — Mauszeiger wird wieder gesperrt.",
          stageCaption: "Halte dein Fadenkreuz auf ausweichenden Zielen mit unberechenbaren Zickzack-Mustern. Konzentriere dich auf den Mittelkorridor!",
          rulesTitle: "Trainingsregeln & Punktesystem",
          rulesItems: [
            { num: "1", text: "Zielerfassung", highlight: "+50 PKT (+0,4s/s)", result: "×Combo-Multiplikator" },
            { num: "2", text: "Zielzerstörung", highlight: "+25 Bonus-PKT", result: "HP-Reset & Respawn" },
            { num: "3", text: "Levelprogression", highlight: "+1 Stufe / 1400 PKT", result: "Adaptives Zickzack-Tempo" },
            { num: "4", text: "Zielverlust", highlight: "Lebensdauer abgelaufen", result: "Setzt Combo zurück (-0,6s)" }
          ],
          aboutTitle: "Über Anti-Zigzag Movement Tracking"
        }}
      />
      <DrillGuide guide={antiZigzagGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/anti-zigzag-movement-trainer"
          locale="de"
        />
      </div>
      <DrillFooter />
    </>
  );
}
