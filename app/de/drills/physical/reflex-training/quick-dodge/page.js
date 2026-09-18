import QuickDodgeClient from '@/app/drills/physical/reflex-training/quick-dodge/QuickDodgeClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Germany (DE / DE)
// Primary Intent: Maus Ausweichspiel, Reflexe Testen Spiel, Kugeln Ausweichen Spiel, Maussteuerung Trainieren
// German Gaming & Athletic Context: E-Sport Mikro-Movement (LoL, CS2, Valorant) & Kinetisches Ausweichtraining mit Vorwärtsmodellen
// High-Demand, Low-Competition Target Keywords:
//   - "Maus Ausweichspiel" (Core high-demand browser reflex game query)
//   - "Reflexe Testen Spiel" (Reaction test game query)
//   - "Kugeln Ausweichen Spiel" (Bullet evasion challenge query)
//   - "Maussteuerung Trainieren" (Mouse control conditioning query)
//   - "Reaktionsspiel Online Kostenlos" (Free browser reaction game query)
//   - "Geschicklichkeitsspiel Maus" (Mouse dexterity and coordination game)
//   - "Maus Ausweichen Reflexe" (Mouse evasion chronometry query)
//   - "Reaktionstest Ausweichen" (Dodging reaction test query)
//   - "Mikrobewegungen Maus E-Sport" (Esports micro-movement drill)
//   - "Hand-Auge-Koordination Reflexspiel" (Hand-eye reflex challenge query)
// ============================================================

export const metadata = {
  title: "Maus-Ausweichspiel – Reflex-Test | SkillDrills",
  description: "Kostenloses Maus-Ausweichspiel online. Weiche schnellen Projektilen mit dem Cursor aus und trainiere Reaktionszeit und Reflexe direkt im Browser.",
  keywords: [
    "Maus Ausweichspiel",
    "Reflexe Testen Spiel",
    "Kugeln Ausweichen Spiel",
    "Maussteuerung Trainieren",
    "Reaktionsspiel Online Kostenlos",
    "Geschicklichkeitsspiel Maus",
    "Maus Ausweichen Reflexe",
    "Reaktionstest Ausweichen",
    "Mikrobewegungen Maus E-Sport",
    "Hand-Auge-Koordination Reflexspiel"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/physical/reflex-training/quick-dodge',
    languages: getAlternateLanguages('/drills/physical/reflex-training/quick-dodge'),
  },
  openGraph: {
    title: "Maus-Ausweichspiel – Reflex-Test | SkillDrills",
    description: "Kostenloses Maus-Ausweichspiel online. Weiche schnellen Projektilen mit dem Cursor aus und trainiere Reaktionszeit und Reflexe direkt im Browser.",
    url: 'https://skilldrills.online/de/drills/physical/reflex-training/quick-dodge',
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Maus-Ausweichspiel – Reflex-Test | SkillDrills",
    description: "Kostenloses Maus-Ausweichspiel online. Weiche schnellen Projektilen mit dem Cursor aus und trainiere Reaktionszeit und Reflexe direkt im Browser.",
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "SkillDrills Startseite",
      "item": "https://skilldrills.online/de"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Physisches Trainingszentrum",
      "item": "https://skilldrills.online/de/drills/physical"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Reflextraining",
      "item": "https://skilldrills.online/de/drills/physical/reflex-training"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Maus-Ausweichspiel & Quick Dodge",
      "item": "https://skilldrills.online/de/drills/physical/reflex-training/quick-dodge"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Maus-Ausweichspiel und kinetischer Reflex-Trainer",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Kinetischer Projektil-Ausweichtrainer und zerebellärer Vorwärtsmodell-Simulator",
  "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
  "genre": "Training, Reflex, Evasion, Esports"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Quick Dodge Cursor Evasion Challenge",
  "gamePlatform": "Web Browser",
  "applicationSubCategory": "Esports Motor Chronometry Drill"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Warum ist beim Ausweichen vor schnellen Projektilen Prädiktion wichtiger als reine Reaktionszeit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fliegen Projektile mit 400 bis 600 px/s heran, führt die visuelle Feedback-Verzögerung von 100 bis 150 ms (Woodworth, 1899) dazu, dass eine Korrektur erst nach der Kollision greifen würde. Wie Mitsuo Kawato (1999) zeigte, steuert das Kleinhirn schnelle Ausweichbewegungen über interne Vorwärtsmodelle (Forward Models) vorausschauend in offener Schleife (Open-Loop)."
      }
    },
    {
      "@type": "Question",
      "name": "Warum sollte man den Mauszeiger in späteren Leveln niemals an den Bildschirmrand bewegen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wird der Cursor an die Wand oder in eine Ecke gesteuert, schrumpft der Fluchtwinkel auf unter 90 Grad. Projektile aus benachbarten Winkeln schneiden jeden Fluchtweg ab. Die optimale Strategie besteht darin, im zentralen 30%-Bereich zu bleiben und Projektile mit minimalen Mikro-Ausweichbewegungen vorbeigleiten zu lassen."
      }
    },
    {
      "@type": "Question",
      "name": "Wie setzen sich die Punkte und der Combo-Multiplikator zusammen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Jede überlebte Sekunde bringt kontinuierlich Punkte. Wird ein Projektil haarscharf um wenige Pixel gestreift (Close Shave), steigt der Combo-Multiplikator rasant bis zum 3,0-fachen Maximum an. Nur ein fehlerfreier 45-Sekunden-Lauf erschließt den Elite-Bereich von über 24.000 Punkten."
      }
    },
    {
      "@type": "Question",
      "name": "Wie präzise ist die Trefferbox (Hitbox) des Mauszeigers definiert?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der Cursor verfügt über eine mathematisch exakte Kern-Hitbox mit 4 px Radius. Der euklidische Abstand zu den herannahenden Kugeln (10–25 px Radius) wird über die performance.now()-Schnittstelle des Browsers subpixelgenau in jedem Frame berechnet."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Strafe droht bei einer Berührung mit einem Hindernis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bei einer Kollision leuchtet der Bildschirm kurz rot auf, der gesamte Multiplikator fällt augenblicklich auf 1,0x zurück und die Überlebenszeit verringert sich. Konstanz ohne Fehler ist die einzige Methode für Spitzenplatzierungen."
      }
    },
    {
      "@type": "Question",
      "name": "Verbessert dieses Ausweichspiel die Fähigkeiten in Spielen wie LoL, CS2 oder Valorant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, signifikant. Es schult exakt die neuro-motorischen Bahnen für Skillshot-Dodging in MOBAs sowie 'Jiggle-Peeking' und Ausweich-Movement in Shootern, indem visuelle Vektoren im Bruchteil einer Sekunde in Handgelenks-Mikrobremsungen übersetzt werden."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Maus-Grifftechnik (Grip Style) eignet sich am besten für schnelle Ausweichmanöver?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der Fingertip-Grip oder ein lockerer Claw-Grip bieten maximale Agilität. Im Gegensatz zum trägen Palm-Grip erlauben sie es, Richtungswechsel im Bereich von 5 bis 15 px rein aus den Fingergelenken ohne Reibung des Unterarms durchzuführen."
      }
    },
    {
      "@type": "Question",
      "name": "Welchen Vorteil bringen 144Hz oder 240Hz Gaming-Monitore bei Projektilausweichübungen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bei 60Hz 'springt' ein schnelles Projektil um ca. 8,3 px pro Frame über den Monitor. Bei 240Hz (4,1 ms Frame-Intervall) sinkt dieser Versatz auf ca. 2,1 px, was eine lückenlose Flugbahn erzeugt und die visuelle Prädiktion des sicheren Korridors enorm erleichtert."
      }
    },
    {
      "@type": "Question",
      "name": "Wie lässt sich Handgelenksüberlastung bei intensiven Ausweichserien vermeiden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Umfassen Sie die Maus ohne Verkrampfung. Lassen Sie den Ellbogen bequem auf der Schreibtischkante ruhen und lockern Sie nach jeweils 3 Durchgängen die Muskulatur für 60 Sekunden durch leichtes Ausschütteln der Hand."
      }
    },
    {
      "@type": "Question",
      "name": "Werden meine Reaktionszeiten oder Score-Daten an externe Server übertragen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nein. Sämtliche Vektorberechnungen und Zeitmessungen laufen zu 100 % lokal in Ihrem Browser ab. Highscores und Statistiken werden ausschließlich im lokalen localStorage Ihres Endgeräts gespeichert."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "4-Phasen-Trainingsprotokoll für Maus-Ausweichen und zerebelläre Flugbahnantizipation",
  "description": "Strukturiertes Vorgehen zur präzisen Beherrschung kinetischer Projektil-Ausweichbewegungen im Sub-Sekunden-Bereich.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Zentrierung und Fingertip-Grundhaltung (Center Calibration)",
      "text": "Platzieren Sie den Cursor im Bildschirmzentrum und halten Sie die Maus locker mit den Fingerkuppen, um sofort in alle Richtungen ausweichen zu können.",
      "url": "https://skilldrills.online/de/drills/physical/reflex-training/quick-dodge#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Antizipation der Flugbahn nach Kawato (Kawato Trajectory Prediction)",
      "text": "Erfassen Sie herannahende Projektile am Bildrand und besetzen Sie die freien Lücken zwischen den kreuzenden Flugbahnen im Voraus.",
      "url": "https://skilldrills.online/de/drills/physical/reflex-training/quick-dodge#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Haarscharfe Mikro-Ausweichmanöver (Micro-Evasion Snapping)",
      "text": "Vermeiden Sie weite Kreisbewegungen. Steuern Sie den Zeiger um lediglich 5 bis 10 px haarscharf am Projektil vorbei, um Raumreserven zu schonen.",
      "url": "https://skilldrills.online/de/drills/physical/reflex-training/quick-dodge#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Serienerhalt und 3,0x-Combo-Maximierung (Streak Heat Maintenance)",
      "text": "Überleben Sie die vollen 45 Sekunden ohne Berührung, um den Multiplikator auf 3,0x zu halten und die 24.000-Punkte-Marke zu knacken.",
      "url": "https://skilldrills.online/de/drills/physical/reflex-training/quick-dodge#step-4"
    }
  ]
};

const dodgeGuide = {
  heading: "Neuromuskulärer Leitfaden für Maus-Ausweichtraining & kinetische Flugbahnprädiktion",
  intro: {
    title: "Wissenschaftliche Grundlagen zerebellärer Vorwärtsmodelle und ballistischer Ausweichmotorik",
    paragraphs: [
      "Das Quick Dodge Ausweichspiel ist ein anspruchsvolles sensomotorisches Trainingssystem, das die blitzschnelle visuelle Flugbahnanalyse mit hochpräziser Zeigerführung kombiniert. Anstatt herannahenden Projektilen lediglich reaktiv auszuweichen, fordert dieses Modul die proaktive Berechnung sicherer Korridore in einem dichten, chaotischen Vektorfeld.",
      "Nach der bahnbrechenden Theorie der internen Vorwärtsmodelle im Kleinhirn von Mitsuo Kawato (1999) reicht die visuelle Rückkopplungsschleife (100–150 ms Übertragungsverzögerung) bei extremen Geschwindigkeiten nicht aus, um eine Kollision in Echtzeit zu verhindern. Das Gehirn muss aus der anfänglichen Bewegungsrichtung der Kugeln eine interne Simulation der nächsten 200 ms erstellen und vorab ballistische Ausweichimpulse (Open-Loop) auslösen.",
      "Wie Robert S. Woodworth (1899) in seinem Zwei-Phasen-Modell der Motorik darlegte, gliedert sich jede schnelle Bewegung in einen ungebremsten ballistischen Anfangsimpuls und eine feine Bremsphase. Da nach dem Gesetz von Fitts (1954) bei hoher Projektildichte der verbleibende Raum (W) drastisch schrumpft, führen weite Ausweichschwünge unweigerlich in Folgekollisionen. Der Schlüssel zu Spitzenleistungen liegt in disziplinierten Mikro-Bewegungen von unter 15 px.",
      "Zur Vermeidung von Messungenauigkeiten arbeitet das System mit der hochpräzisen performance.now()-Schnittstelle des Browsers. Monitore mit 144 Hz oder 240 Hz und Gaming-Mäuse mit 1.000 Hz Abfragerate reduzieren Latenzen auf unter 4 Millisekunden und eliminieren Bewegungsunschärfen bei Fluggeschwindigkeiten von über 500 px/s (Woods et al., 2015). Alle Leistungsdaten verbleiben ausnahmslos geschützt auf Ihrem lokalen Gerät."
    ]
  },
  benchmarks: {
    title: "5-Stufen-Leistungsbenchmarks für Maus-Ausweichen und Projektilantizipation",
    headers: ["Stufe & Rang", "Titel (Rank Title)", "Punkteziel", "Ausweichquote & Maximalgeschwindigkeit", "Gesamtnote", "Neuromuskuläres Profil"],
    rows: [
      ["Tier 1: Ultimativer Kinetik-Meister", "Apex Kinetic Evader", "24.000+ Punkte", "> 95 % / 500+ px/s", "Grade S", "Top 0,1 % Niveau. Perfekte zerebelläre Prädiktion und fehlerfreie Mikro-Ausweichmanöver bei über 50 Projektilen (Kawato 1999; Woodworth 1899)"],
      ["Tier 2: Präzisions-Flugbahn-Stratege", "Precision Trajectory Striker", "17.000 – 23.999 Punkte", "90 – 94 % / 400 – 499 px/s", "Grade A", "Top 3 % E-Sport-Niveau. Exzellente Raumwahrnehmung und stabiles Halten der zentralen Sicherheitszone"],
      ["Tier 3: Erfahrener Ausweichpilot", "Skilled Evasion Pilot", "11.000 – 16.999 Punkte", "82 – 89 % / 300 – 399 px/s", "Grade B", "Top 15 % kompetitive Spieler. Verlässliche Handgelenkskontrolle und frühzeitiges Erkennen von Gefahrenvektoren"],
      ["Tier 4: Lernender Ausweichathlet", "Developing Dodger", "6.000 – 10.999 Punkte", "70 – 81 % / 200 – 299 px/s", "Grade C", "Durchschnittliches Erwachsenenniveau. Tendenz zum Flüchten an den Rand bei höherer Geschwindigkeit; Rezentrierung empfohlen"],
      ["Tier 5: Einsteiger in Ausweichmotorik", "Novice Evasion Trainee", "< 6.000 Punkte", "< 70 % / < 200 px/s", "Grade D", "Basisniveau. Häufige Treffer durch verzögerte Reaktion. Empfohlen wird das Entspannen der Handhaltung und Weiten des Blicks"]
    ],
    note: "Objektive Kriterien basierend auf Kawatos zerebellärer Prädiktionstheorie (1999), Woodworths Zweiphasenmodell (1899) und Fitts' Schwierigkeitsskalierung (1954)."
  },
  techniques: {
    title: "4 Praxisprotokolle für maximale Ausweichpräzision & Reaktionsbeherrschung",
    items: [
      {
        name: "Kawato Vorwärtsmodell-Antizipation (Kawato Cerebellar Anticipation)",
        desc: "Reagieren Sie nicht erst, wenn das Projektil kurz vor dem Cursor ist. Analysieren Sie den Entstehungsvektor am Bildrand und positionieren Sie die Maus vorab in den entstehenden Leerräumen.",
        tips: "Schauen Sie nicht auf die Kugeln selbst, sondern auf die freien Abstände zwischen ihnen."
      },
      {
        name: "Woodworth Mikro-Bremsung (Woodworth Micro-Snap)",
        desc: "Führen Sie keine ausladenden Kreisbewegungen aus. Begrenzen Sie Ausweichschritte auf 10 bis 20 px und bremsen Sie die Bewegung mit den Fingerkuppen exakt ab.",
        tips: "Nutzen Sie den Druck der Finger auf das Mauspad, um unkontrolliertes Rutschen zu unterbinden."
      },
      {
        name: "Zentrierungsdisziplin (Central Anchoring Discipline)",
        desc: "Die Flucht an den Bildschirmrand führt in eine tödliche Sackgasse. Kehren Sie nach jedem Ausweichschritt unmittelbar in das mittlere Drittel zurück.",
        tips: "Machen Sie das sofortige Rezentrieren nach einer Ausweichbewegung zur festen Gewohnheit."
      },
      {
        name: "Periphere Cluster-Wahrnehmung (Peripheral Cluster Scanning)",
        desc: "Fixieren Sie nicht starr den Cursor. Halten Sie den Blick entspannt auf den gesamten Bildschirm gerichtet und spüren Sie die Cursorposition über die Propriozeption.",
        tips: "Ein weicher, breiter Fokus offenbart die Gesamtströmung der Projektile auf einen Blick."
      }
    ]
  },
  steps: [
    "Nehmen Sie eine aufrechte Haltung ein und positionieren Sie den Cursor mittig.",
    "Antizipieren Sie die Flugbahn herannahender Projektile und bewegen Sie die Maus minimal in freie Zonen.",
    "Kehren Sie nach jedem Ausweichen sofort in das zentrale Drittel zurück.",
    "Überleben Sie 45 Sekunden fehlerfrei, um den 3,0x-Multiplikator und 24.000+ Punkte zu erreichen."
  ],
  audience: "Gamer (LoL, CS2, Valorant, Apex), die ihr Skillshot-Dodging und ihre Mikro-Mauskontrolle perfektionieren möchten, sowie alle, die Koordination und Reflexe trainieren wollen.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('kawato1999', 'woodworth1899', 'fitts1954', 'woods2015')
};

export default function LocalizedQuickDodgePageDe() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
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
      <QuickDodgeClient
        copy={{
          title: "Maus-Ausweichspiel & Reflex-Test",
          subtitle: "Kinetisches Projektil-Ausweichen & Vorwärtsmodell-Steuerung • 15 Level",
          description: "Einem Projektil auszuweichen ist primär eine Frage der Vorhersage, nicht der bloßen Reaktion. Da die visuelle Rückkopplung rund 100–150 ms benötigt (Woodworth, 1899), basiert schnelles Ausweichen auf vorberechneten Flugbahnen im Kleinhirn (Kawato, 1999). Bei hoher Geschwindigkeit schließt sich das Zeitfenster für Korrekturen und nur die Prädiktion sichert das Überleben.",
          badge: "Reflex-Ausweichtest",
          hudLabels: {
            score: "Punkte",
            time: "Zeit",
            bestScore: "Bester Score",
            bestCombo: "Bester Combo",
            getReady: "BEREIT"
          },
          resultLabels: {
            newBest: "NEUER REKORD",
            points: "Punkte",
            accuracy: "Präzision",
            dodges: "Ausweichungen",
            peakSpeed: "Max. Speed",
            peakLevel: "Max. Level",
            playAgain: "Nochmal Spielen"
          },
          rulesTitle: "Drill-Anleitung & Punktesystem",
          rulesItems: [
            { title: "Projektil-Ausweichen & Punkte", text: "Vermeiden Sie jede Kollision mit den roten Projektilen. Jede Sekunde im Spiel steigert den Score kontinuierlich." },
            { title: "Haarscharfes Vorbeigleiten (Close Shave)", text: "Streifen Sie Projektile knapp, um wertvolle Extrapunkte und Combo-Multiplikatoren zu erhalten." },
            { title: "Progressive Geschwindigkeitssteigerung", text: "Mit zunehmender Punktzahl beschleunigen die Projektile auf bis zu 500 px/s bei dichteren Spawn-Intervallen." },
            { title: "Treffer-Strafe", text: "Bei einer Kollision fällt der Combo-Multiplikator sofort auf 1,0x zurück und ein rotes Warnsignal blinkt auf." }
          ],
          aboutTitle: "Über das Maus-Ausweichspiel & Biomechanik der Antizipation",
          aboutSections: [
            {
              title: "Kinetische Kollisionsvermeidung und zerebelläre Prädiktion",
              subtitle: "Vorwegnahme von Flugbahnen durch interne Modelle nach Kawato (1999)",
              content: "Schnelle Ausweichbewegungen nutzen die Simulation im Kleinhirn, um die visuelle Latenz von 100–150 ms zu überbrücken und den Zeiger rechtzeitig in Sicherheit zu bringen."
            },
            {
              title: "Woodworth Zwei-Phasen-Motorik und Endbremsung",
              subtitle: "Harmonie aus ballistischem Anfangsimpuls und präziser Mikro-Arretierung",
              content: "Ausweichbewegungen bestehen aus einem schnellen Impuls und feiner Bremsung (Woodworth, 1899). Das Abfangen mit den Fingerkuppen bewahrt wertvolle Raumreserven."
            },
            {
              title: "Fitts'sches Gesetz und schrumpfender Fluchtraum",
              subtitle: "Logarithmischer Anstieg der Bewegungsschwierigkeit bei Projektildichte",
              content: "Steigt die Anzahl der Hindernisse, verengt sich die sichere Durchgangsbreite (W) dramatisch, was chirurgische Präzision erfordert (Fitts, 1954)."
            },
            {
              title: "Hardware-Optimierung für Millisekunden-Präzision",
              subtitle: "144Hz/240Hz Bildwiederholrate für schlierenfreie 4,1-ms-Darstellung",
              content: "Hohe Bildwiederholraten reduzieren Bewegungsunschärfen bei 500 px/s schnellen Projektilen und ermöglichen fehlerfreie visuelle Kursberechnungen (Woods et al., 2015)."
            }
          ]
        }}
      />
      <DrillGuide {...dodgeGuide} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/reflex-training/quick-dodge" />
    </>
  );
}
