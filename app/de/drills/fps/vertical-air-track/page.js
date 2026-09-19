import VerticalAirTrackClient from '@/app/drills/fps/vertical-air-track/VerticalAirTrackClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — de-DE (fps / vertical-air-track)
// PRIMARY DOMESTIC: "Vertikales Aim Training"   — High-intent core query
//                   "Y-Achse Aiming"             — Common DACH competitive FPS term
//                   "Vertikales Tracking"        — Technical smooth pursuit search
//                   "Luftziel Tracking"          — High conversion tactical query
//                   "Flugkurven Tracking FPS"    — Trajectory prediction phrase
// SECONDARY / LSI:
//                   "Apex Legends vertikales Zielen" — High demand game-specific term
//                   "Overwatch 2 Luftziele"          — Game-specific anti-air phrase
//                   "Aim Trainer kostenlos"          — High volume category query
//                   "Y-Achsen Mauskontrolle"         — Mechanical precision keyword
//                   "Smooth Pursuit Y-Achse"         — Scientific motor control term
// WINNER TITLE:     Vertikales Aim Training – Y-Achse Tracking | SkillDrills
// ============================================================

export const metadata = {
  title: "Vertikales Aim Training – Y-Achse Tracking | SkillDrills",
  description: "Kostenloser Vertical Aim Trainer: Trainiere Y-Achsen-Mauskontrolle, Parabel-Flugkurven und Luftziel-Tracking für Apex Legends und Overwatch 2.",
  keywords: [
    "Vertikales Aim Training",
    "Y-Achse Aiming",
    "Vertikales Tracking",
    "Luftziel Tracking",
    "Y-Achsen Mauskontrolle",
    "Flugkurven Tracking FPS",
    "Apex Legends vertikales Zielen",
    "Overwatch 2 Luftziele",
    "Aim Trainer kostenlos",
    "Vertical Tracking Trainer",
    "Parabelflug Zielen",
    "Smooth Pursuit Y-Achse"
  ],
  alternates: {
    canonical: "https://skilldrills.online/de/drills/fps/vertical-air-track",
    languages: getAlternateLanguages('/drills/fps/vertical-air-track'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Vertikales Aim Training – Y-Achse Tracking | SkillDrills",
    description: "Kostenloser Vertical Aim Trainer: Trainiere Y-Achsen-Mauskontrolle, Parabel-Flugkurven und Luftziel-Tracking für Apex Legends und Overwatch 2.",
    url: "https://skilldrills.online/de/drills/fps/vertical-air-track",
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Vertikales Aim Training – Y-Achse Tracking | SkillDrills",
    description: "Kostenloser Vertical Aim Trainer: Trainiere Y-Achsen-Mauskontrolle, Parabel-Flugkurven und Luftziel-Tracking für Apex Legends und Overwatch 2.",
  },
};

export default function VerticalAirTrackPageDe() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://skilldrills.online/de" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/de/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Vertikales Aim Training", "item": "https://skilldrills.online/de/drills/fps/vertical-air-track" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Vertikales Aim Training (Vertical Air-Track)",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-15",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Kostenloser browserbasierter Vertical Aim Trainer mit Hardware-RAW-Mauseingabe. Trainiert Y-Achsen-Tracking und parabolische Flugkurven-Vorhersage.",
    "genre": "FPS Training / Vertikales Tracking",
    "url": "https://skilldrills.online/de/drills/fps/vertical-air-track",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Vertikales Aim Training (Vertical Air-Track)",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-15",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "browserRequirements": "Pointer Lock API, JavaScript, HTML5 Canvas fähiger Webbrowser",
    "description": "Kostenloser browserbasierter Vertical Aim Trainer mit Hardware-RAW-Mauseingabe. Trainiert Y-Achsen-Tracking und parabolische Flugkurven-Vorhersage.",
    "url": "https://skilldrills.online/de/drills/fps/vertical-air-track"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Vertikales Aim Training (Vertical Air-Track)",
    "url": "https://skilldrills.online/de/drills/fps/vertical-air-track",
    "description": "Kostenloser browserbasierter Vertical Aim Trainer mit Hardware-RAW-Mauseingabe. Trainiert Y-Achsen-Tracking und parabolische Flugkurven-Vorhersage.",
    "dateModified": "2026-09-15",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Vertikales Tracking"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-15",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Was versteht man unter vertikalem Aim Training auf der Y-Achse?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vertikales Aim Training isoliert die Auf- und Abwärtsbewegungen der Maus entlang der Y-Achse. Da die meisten Standard-Shooter primär horizontales Crosshair-Placement fordern, ist die motorische Koordination für vertikale Kurven oft unterentwickelt und bedarf gezielter Isolation."
        }
      },
      {
        "@type": "Question",
        "name": "Warum fällt vielen FPS-Spielern vertikales Tracking schwerer als horizontales?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Biomechanisch nutzt horizontales Tracking die natürliche Drehbewegung des Unterarms um den Ellenbogen oder das Handgelenk. Vertikale Mausbewegungen hingegen erfordern Fingerbeugung, Handgelenksextension oder das Verschieben des gesamten Unterarms gegen den Reibungswiderstand des Mauspads."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Vorteile bringt dieser Drill für Apex Legends Spieler?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In Apex Legends nutzen Legenden wie Octane (Sprungkissen), Horizon (Gravitationslift) oder Pathfinder (Greifhaken) häufig vertikale Mobilität. Das Beherrschen parabolischer Flugkurven erlaubt es, Feinde im Flug konstant mit vollem Waffenschaden zu lasern."
        }
      },
      {
        "@type": "Question",
        "name": "Wie hilft das vertikale Tracking gegen Pharah und Echo in Overwatch 2?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Flugziele wie Pharah oder Echo bewegen sich permanent im dreidimensionalen Raum oberhalb der normalen Sichtlinie. Dieser Drill schult das kontinuierliche Smooth-Pursuit-Tracking ohne ruckartige Sakkaden, wodurch Hitscan-Helden wie Cassidy oder Soldier: 76 signifikant mehr Treffer landen."
        }
      },
      {
        "@type": "Question",
        "name": "Was ist Popcorn-Tracking und wie wird es simuliert?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Popcorn-Tracking bezeichnet das Nachführen von Zielen, die wie Maiskörner in einer Pfanne nach oben katapultiert werden und unter Schwerkrafteinfluss wieder herabfallen. Dieser Drill simuliert realistische Erdbeschleunigung mit Scheitelpunkt-Verlangsamung."
        }
      },
      {
        "@type": "Question",
        "name": "Sollte vertikales Zielen aus dem Handgelenk oder aus den Fingern erfolgen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Für feinste Mikro-Anpassungen auf der Y-Achse eignen sich die Fingerglieder (Fingertip- oder Claw-Grip). Für größere vertikale Distanzen sollte der Unterarm gleichmäßig über das Pad gleiten, um Handgelenkskrämpfe zu vermeiden."
        }
      },
      {
        "@type": "Question",
        "name": "Hilft ein Gaming-Arm-Sleeve bei vertikalen Mausbewegungen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, ein Arm-Sleeve reduziert die Hautreibung auf Stoff- oder Glas-Mauspads drastisch. Dadurch wird das typische Ruckeln oder Hängenbleiben bei schnellen Abwärtszügen der Maus eliminiert."
        }
      },
      {
        "@type": "Question",
        "name": "Wie funktioniert das Punktesystem im Vertical Air-Track Drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Das kontinuierliche Verweilen auf dem Flugziel generiert Schaden und Trefferpunkte. Eine Zerstörung nahe dem Scheitelpunkt belohnt dich mit bis zu +75 Höhen-Bonus-Punkten und +0,4 Sekunden zusätzlicher Rundenzeit."
        }
      },
      {
        "@type": "Question",
        "name": "Wie oft sollte ich vertikales Aiming trainieren?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Eine kurze, konzentrierte Trainingseinheit von 10 bis 15 Minuten vor deinen Wettkampf-Matches genügt. Konsistenz über mehrere Wochen baut die nötige neuronale Feinmotorik in den Finger- und Unterarmbeugern auf."
        }
      },
      {
        "@type": "Question",
        "name": "Ist dieser Vertical Aim Trainer kostenlos und ohne Download nutzbar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, dieser Trainer läuft zu 100 Prozent im Browser mit nativer Pointer-Lock-Hardware-Mausabfrage, ohne Download, ohne Werbung und ohne Anmeldung."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Anleitung für vertikales Y-Achsen Aim Training",
    "description": "In 4 Schritten parabolische Flugbahnen meistern und vertikale Mauskontrolle perfektionieren.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Mausempfindlichkeit anpassen und Pointer-Lock aktivieren",
        "text": "Stelle deine gewohnte In-Game-Sensitivität ein und klicke in das Spielfeld, um den Mauszeiger hardwarenah zu sperren.",
        "url": "https://skilldrills.online/de/drills/fps/vertical-air-track#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Aufstiegsgeschwindigkeit und Scheitelpunkt antizipieren",
        "text": "Verfolge das aufsteigende Ziel gleichmäßig und passe deine Tracking-Geschwindigkeit an, wenn das Ziel am Scheitelpunkt abbremst.",
        "url": "https://skilldrills.online/de/drills/fps/vertical-air-track#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Sanftes Abwärts-Tracking unter Gravitationsbeschleunigung",
        "text": "Ziehe die Maus flüssig nach unten, während das Ziel durch die Schwerkraft beschleunigt, ohne die Maus verkrampft auf das Pad zu drücken.",
        "url": "https://skilldrills.online/de/drills/fps/vertical-air-track#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Ziel vor Bodenkontakt zerstören und Fadenkreuz zentrieren",
        "text": "Eliminiere das Ziel rechtzeitig in der Luft, um den Höhenbonus zu sichern, und bringe das Fadenkreuz zügig in die neutrale Ausgangslage.",
        "url": "https://skilldrills.online/de/drills/fps/vertical-air-track#step-4"
      }
    ]
  };

  const verticalAirTrackGuide = {
    heading: "Leitfaden für vertikales Aim Training & Flugkurven-Physik",
    intro: [
      "Vertikales Aim Training (Vertical Air-Track) ist ein spezialisierter motorischer Präzisionsdrill für die Y-Achse, der die Beherrschung gravitativer Parabelbahnen und flüssiges Luftziel-Tracking schult. In modernen schnellen Shootern wie Apex Legends, Overwatch 2 oder Halo Infinite entscheiden vertikale Raumkämpfe, Jumppads und Ziplines regelmäßig über Sieg oder Niederlage.",
      "Die neurologische Steuerung vertikaler Augenfolgebewegungen (Smooth Pursuit) unterscheidet sich fundamental von horizontalen Blickwechseln. Wie Richard J. Krauzlis (2004) nachwies, greift das visuelle System bei vertikalen Verfolgungsbewegungen auf spezialisierte Bahnen im Kleinhirnwurm (Vermis) und Hirnstamm zurück. Cyril Rashbass (1961) demonstrierte, dass kontinuierliches Tracking nicht durch Positionsfehler, sondern durch Geschwindigkeitsfehler (Retinal Slip) angetrieben wird. Ruckartige Sakkaden führen zu sofortigem Trefferpunktverlust.",
      "Zusätzlich verlangt das Abfangen fliegender Gegner das intuitive Verinnerlichen der Erdbeschleunigung (g = 9,81 m/s²). Biomechanische Analysen von Peter R. Cavanagh et al. (1984) sowie Michael F. Land & Peter McLeod (2000) zeigen, dass erfolgreiche Schützen den Scheitelpunkt (Apex) antizipieren und ihre Augen-Hand-Koordination vorausschauend synchronisieren.",
      "Dieser Drill isoliert vertikale Bewegungsabläufe vollständig von horizontalen Gewohnheiten. Durch präzise Zeitmessung via performance.now() (Woods et al., 2015) schließt du die Lücke zwischen zweidimensionalem Horizontaltraining und echter dreidimensionaler Gefechtsbeherrschung.",
      "Hinweis zur Messgenauigkeit: Sämtliche Messungen erfolgen clientseitig im Browser über die hochauflösende performance.now() API im Sub-Millisekundenbereich. Durch browserinterne Sicherheitsmechanismen gegen Timing-Angriffe und Bildwiederholraten (z. B. 16,7 ms bei 60 Hz, 6,9 ms bei 144 Hz oder 4,1 ms bei 240 Hz) treten minimale Quantisierungsabweichungen auf. Nutze die Werte als persönlichen Fortschrittsindikator unter identischen Hardware-Bedingungen."
    ],
    benchmarks: {
      title: "Vertikale Smooth-Pursuit & Luftziel-Tracking Benchmarks",
      headers: ["Leistungsstufe", "Luftziel-Trefferquote", "Apex-Richtungswechsel-Latenz", "In-Game Gefechtswirksamkeit"],
      rows: [
        ["Tier 1 (Predator / Grandmaster / Luftabwehr-Elite)", "Mindestens 82%", "Unter 180 ms", "Perfektes Lasern fliegender Feinde bei Jumppad-Sprüngen; nahtlose Geschwindigkeitsanpassung am Scheitelpunkt"],
        ["Tier 2 (Master / Turnierspieler)", "70% – 82%", "180 – 230 ms", "Sehr stabile Y-Achsen-Führung; minimale Korrekturverzögerung beim Start, aber sichere Eliminierung in der Luft"],
        ["Tier 3 (Diamant / Ambitionierter Rang)", "56% – 70%", "230 – 290 ms", "Berechenbare Parabelbahnen werden gut getroffen; Schwierigkeiten bei abrupten Richtungswechseln im Sinkflug"],
        ["Tier 4 (Gold / Platin)", "40% – 56%", "290 – 360 ms", "Fadenkreuz fällt im beschleunigten Sinkflug zurück; Neigung zu ruckartigen Überkorrekturen"],
        ["Tier 5 (Einsteiger / Basis)", "Unter 40%", "Über 360 ms", "Starkes Zittern auf der Y-Achse; Handgelenk blockiert beim schnellen Herunterziehen der Maus"]
      ],
      note: "Die Trefferquote beschreibt den Zeitanteil, in dem das Fadenkreuz auf dem fliegenden Ziel verweilt. Die Apex-Latenz misst die Reaktionszeit beim Richtungsumkehrpunkt am Scheitelpunkt der Parabel (Woods et al., 2015)."
    },
    techniques: {
      title: "Neuronale Techniken für maximale Y-Achsen-Präzision",
      items: [
        {
          name: "Entkoppelte Fingerbeugung für Mikro-Korrekturen",
          desc: "Vermeide es, den gesamten Arm bei winzigen Höhenänderungen anzuspannen. Nutze das Beugen und Strecken der Fingerglieder für feine Justierungen entlang der Y-Achse (Fitts, 1954).",
          tips: "Ziehe die Maus mit den Fingerspitzen sanft nach hinten und drücke sie nach vorne, ohne das Handgelenk zu verdrehen."
        },
        {
          name: "Geschwindigkeitssynchronisation am Scheitelpunkt",
          desc: "Am höchsten Punkt der Flugbahn sinkt die Vertikalgeschwindigkeit kurzzeitig gegen null (Rashbass, 1961; Land & McLeod, 2000). Verlangsame deine Handbewegung rechtzeitig vor dem Stillstand.",
          tips: "Der Scheitelpunkt bietet das größte Trefferfenster. Halte kurz inne, bevor der beschleunigte Fall beginnt."
        },
        {
          name: "Blickführung unterhalb des Ziels im Sinkflug",
          desc: "Im Sturzflug beschleunigt das Ziel kontinuierlich durch die Schwerkraft. Richte deinen visuellen Fokus auf die Unterkante des Ziels, um der Bewegung voraus zu sein.",
          tips: "Schau nicht auf die Oberseite des fallenden Gegners; führe das Fadenkreuz von unten nach oben nach."
        },
        {
          name: "Reduktion der Unterarmreibung auf dem Mauspad",
          desc: "Feuchte Haut oder hohe Reibung auf Stoffpads blockieren vertikale Zugbewegungen und erzeugen ruckartiges Tracking.",
          tips: "Ein Kompressions-Sleeve oder ein glattes Hybridpad sorgen für gleichmäßigen Gleitwiderstand auf der Y-Achse."
        }
      ]
    },
    steps: [
      "Stelle deine In-Game-Sensitivität ein und klicke in das Drill-Fenster, um die Pointer-Lock-Mausabfrage zu aktivieren.",
      "Platziere das Fadenkreuz im unteren Bildschirmbereich nahe der Auswurfzone der Flugziele.",
      "Führe die Maus beim Hochschießen des Ziels mit gleichmäßiger Fingerstreckung flüssig nach oben.",
      "Atme am Scheitelpunkt kurz aus, nutze das temporäre Geschwindigkeitsminimum und feuere kontinuierlich.",
      "Ziehe die Maus im gravitativen Sinkflug beschleunigt nach unten und zerstöre das Ziel vor dem Aufprall."
    ],
    audience: "FPS-Gamer in Apex Legends, Overwatch 2, Halo Infinite und schnellen Arena-Shootern, die ihre Treffsicherheit gegen fliegende, springende und vertikal agierende Kontrahenten maximieren wollen.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'krauzlis2004', 'fitts1954', 'rashbass1961', 'land2000'),
    related: [
      { href: "/de/drills/fps/strafe-tracking", label: "Strafe Tracking Aim Trainer" },
      { href: "/de/drills/fps/pro-smooth-pursuit", label: "Smooth Pursuit Aim Trainer" },
      { href: "/de/drills/fps/target-acquisition", label: "Target Acquisition Training" },
      { href: "/de/drills/reaction-speed/reaction-game", label: "Reaktionstest Spiel" },
      { href: "/de/drills/motor/hand-eye-coordination/aim-trainer", label: "Hand-Auge Aim Trainer" }
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
      <VerticalAirTrackClient
        copy={{
          h1Keyword: "Vertikales Aim Training",
          h1Suffix: " – Kostenloser Y-Achsen & Luftziel Trainer",
          statScore: "Punkte",
          statTime: "Restzeit",
          statAccuracy: "Trefferquote",
          statBestScore: "Bestwert",
          statTargetsDestroyed: "Ziele Zerstört",
          statMaxCombo: "Max Combo",
          statPeakLevel: "Höchste Stufe",
          startTitle: "Vertical Air-Track",
          startSubtitle: "Hardware Raw Input • Dynamische Stufen-Progression",
          startButtonText: "Drill Starten",
          playAgainText: "Nochmal Spielen",
          shareText: "Ergebnis Teilen",
          exitText: "Beenden",
          stageCaption: "Verfolge Ziele auf parabolischen Y-Achsen-Flugbahnen unter Gravitationseinfluss für maximale vertikale Präzision.",
          rulesTitle: "Drill-Anleitung & Punktesystem",
          aboutTitle: "Über den Vertical Air-Track Trainer",
          rulesItems: [
            {
              num: "1",
              text: "Luftziel verfolgen",
              highlight: "+100 Pkt / +0,4s bei Zerstörung",
              result: "Parabolische Flugbahn stetig nachführen"
            },
            {
              num: "2",
              text: "Höhen-Bonus",
              highlight: "Bis zu +75 Bonus-Punkte",
              result: "Ziele nahe am Scheitelpunkt eliminieren"
            },
            {
              num: "3",
              text: "Straf-Regel",
              highlight: "Combo-Reset bei Fehlschuss",
              result: "Bodenkontakt beendet Combo (-0,6s bei Zeitstrafe)"
            },
            {
              num: "4",
              text: "Stufen-Progression",
              highlight: "+1 Stufe je 1400 Punkte",
              result: "Steigende Fallgeschwindigkeit & Gravitation"
            }
          ]
        }}
      />
      <DrillGuide guide={verticalAirTrackGuide} />
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/vertical-air-track"
          locale="de"
        />
      </div>
      <DrillFooter />
    </>
  );
}
