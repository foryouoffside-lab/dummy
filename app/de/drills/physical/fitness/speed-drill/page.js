import SpeedDrillClient from '@/app/drills/physical/fitness/speed-drill/SpeedDrillClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Germany (DE / DE)
// Primary Intent: Klickgeschwindigkeit Test, Klick Test Online, Klicks pro Sekunde, Maus Reaktionszeit
// German Gaming/Athletic Context: FPS (CS2, Valorant, Apex) Flick-Aiming & Schnelligkeitstraining Reflexe
// High-Demand, Low-Competition Target Keywords:
//   - "Klickgeschwindigkeit Test" (Core high-demand click rate query)
//   - "Klicks pro Sekunde Test" (CPS test / measurement query)
//   - "Klickgeschwindigkeit Messen" (Intent-driven measurement tool query)
//   - "Maus Klicks pro Sekunde" (Hardware & tapping rate query)
//   - "Klick Test Online" (Interactive browser trainer query)
//   - "Maus Reaktionszeit Test" (Mouse reaction time test query)
//   - "Reaktionszeit Maus Verbessern" (Reflex training & improvement query)
//   - "Aiming Geschwindigkeit Trainieren" (Aim velocity & acquisition query)
//   - "Schnelligkeitstraining Reflexe" (Cognitive motor speed query)
//   - "Schrumpfende Ziele Treffen" (Dynamic shrinking boundary interception)
// ============================================================

export const metadata = {
  title: 'Klickgeschwindigkeit Test – Klick-Speed | SkillDrills',
  description: 'Kostenloser Klickgeschwindigkeitstest online. Klicke blitzschnell auf auftauchende Ziele und trainiere CPS, Reaktionszeit und Zielgenauigkeit im Browser.',
  keywords: [
    "Klickgeschwindigkeit Test",
    "Klicks pro Sekunde Test",
    "Klickgeschwindigkeit Messen",
    "Maus Klicks pro Sekunde",
    "Klick Test Online",
    "Maus Reaktionszeit Test",
    "Reaktionszeit Maus Verbessern",
    "Aiming Geschwindigkeit Trainieren",
    "Schnelligkeitstraining Reflexe",
    "Schrumpfende Ziele Treffen"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/physical/fitness/speed-drill',
    languages: getAlternateLanguages('/drills/physical/fitness/speed-drill'),
  },
  openGraph: {
    title: "Klickgeschwindigkeit Test & Klick Test Online – Schnelligkeitstraining | SkillDrills",
    description: "Kostenloser Klickgeschwindigkeit Test und Reflex-Speed-Drill. Erfasse schrumpfende Ziele mit ballistischen Flicks und maximaler Klickrate pro Sekunde mit mikrosekundengenauer Chronometrie.",
    url: 'https://skilldrills.online/de/drills/physical/fitness/speed-drill',
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Klickgeschwindigkeit Test & Klick Test Online – Schnelligkeitstraining | SkillDrills",
    description: "Kostenloser Klickgeschwindigkeit Test und Reflex-Speed-Drill. Erfasse schrumpfende Ziele mit ballistischen Flicks und maximaler Klickrate pro Sekunde mit mikrosekundengenauer Chronometrie.",
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
      "name": "Fitness & Schnelligkeit",
      "item": "https://skilldrills.online/de/drills/physical/fitness"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Klickgeschwindigkeit Test & Speed Drill",
      "item": "https://skilldrills.online/de/drills/physical/fitness/speed-drill"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Klickgeschwindigkeit Test & Reflex Speed Trainer",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Kostenloses biomechanisches Online-Training zur Messung von Klickgeschwindigkeit, Fitts-Grenzkontrolle und ballistischer Flick-Präzision.",
  "url": "https://skilldrills.online/de/drills/physical/fitness/speed-drill",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online/de"
  },
  "inLanguage": "de",
  "dateModified": "2026-09-12"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Speed Drill Klick- und Reaktions-App",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Moderner Browser mit Unterstützung für HTML5 Canvas und Pointer-Events",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/de/drills/physical/fitness/speed-drill",
  "inLanguage": "de",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Speed Drill: Schrumpfende Ziele Abfangen (Speed Drill Game)",
  "url": "https://skilldrills.online/de/drills/physical/fitness/speed-drill",
  "description": "Erfasse dynamisch schrumpfende und beschleunigende Kreisziele vor Ablauf der Zeit in diesem rasanten Reaktionsspiel.",
  "genre": [
    "Action Game",
    "Aim Trainer",
    "Reflex Game",
    "Coordination"
  ],
  "gamePlatform": [
    "Web Browser",
    "Desktop",
    "Mobile"
  ],
  "applicationCategory": "Game",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-12",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Wie fördert das Konzept schrumpfender Zielradien die neuronale Klickgeschwindigkeit und Reaktionszeit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sobald ein Zielobjekt erscheint, verringert sich sein Radius kontinuierlich von 45 px auf bis zu 12 px. Gemäß dem Gesetz von Fitts (Fitts's Law, 1954) steigt der Schwierigkeitsindex (Index of Difficulty, ID) mit kleiner werdender Zielbreite logarithmisch an. Der Zeitdruck zwingt den motorischen Kortex dazu, langsame sensorische Kontrollschleifen zu überbrücken und stattdessen direkte, offene ballistische Bewegungsimpulse (Open-Loop Flicks) abzurufen."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Rolle spielt das Zwei-Komponenten-Modell nach Woodworth (1899) beim schnellen Flick-Aiming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Robert S. Woodworth zeigte, dass zielgerichtete Hochgeschwindigkeitsbewegungen aus zwei distinkten Phasen bestehen: einem explosiven Anfangsimpuls (Initial Ballistic Impulse), der etwa 75 % der Distanz überbrückt, und einer anschließenden feinen Abbremsphase (Current Control Deceleration) am Zielrand. Im Speed Drill lernen Sportler und Gamer, die Abbremsphase zu minimieren und das Ziel bereits mit dem ersten Bewegungsimpuls mittig zu treffen."
      }
    },
    {
      "@type": "Question",
      "name": "Was versteht man unter visueller Salienz (Treisman, 1980) und verdeckter Aufmerksamkeitslenkung (Covert Orienting)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nach der Merkmals-Integrationstheorie von Anne Treisman lösen kontrastreiche, bewegte Kreisziele im peripheren Sichtfeld einen unwillkürlichen Pop-out-Effekt aus. Diese sensorischen Reize erreichen das Tektum (Colliculus superior) und den Parietallappen millisekundenlang, bevor eine bewusste Sakkade (Augenbewegung) stattfindet, wodurch der Bewegungsimpuls der Hand unbewusst vorbereitet wird."
      }
    },
    {
      "@type": "Question",
      "name": "Wie überträgt sich dieses Schnellklick-Training auf First-Person-Shooter (CS2, Valorant, Apex Legends)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In taktischen Shootern entscheiden oft Bruchteile von Millisekunden bei der Erstzielerfassung (Target Acquisition) und beim ersten Schuss (First Bullet Accuracy). Das Training gegen dynamisch auftauchende, beschleunigende Ziele schärft die neuromuskuläre Klickbereitschaft und die Präzision blitzschneller Mikro-Flicks auf feindliche Trefferzonen unter extremem Zeitdruck."
      }
    },
    {
      "@type": "Question",
      "name": "Wie skalieren Zielgeschwindigkeit, Schrumpfrate und Schwierigkeit über die Level hinweg?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Alle 1.750 Punkte steigt das Level kontinuierlich auf bis zu Level 15 und darüber hinaus. Die Maximalradien verringern sich von 45 px auf 12 px, die Fluggeschwindigkeit beschleunigt sich von 1,0x auf das 3,8-Fache und die Schrumpfrate steigt von 0,6x auf 2,2x. Bei aktiver Trefferserie verstärkt das Streak-Heat-System zusätzlich die Dynamik für fortgeschrittene Spieler."
      }
    },
    {
      "@type": "Question",
      "name": "Warum ist der Zeitbonus von +0,6 Sekunden pro Treffer ein entscheidendes Spielelement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Trainingsrunde startet mit einem Basistimer von 45 Sekunden. Jeder erfolgreiche Treffer fügt dem Zeitkonto 0,6 Sekunden hinzu. Gelingt es dem Spieler, Treffer ohne Unterbrechung aneinanderzureihen, kann er die Runde auf über 60 bis 90 Sekunden ausdehnen, maximale Multiplikatoren (bis zu 3,0x) aufbauen und Elite-Punktzahlen jenseits von 24.000 Punkten erreichen."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Konsequenzen haben ein Zielablauf oder ein Klick ins Leere?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sobald ein Ziel vollständig verschwindet oder ein Fehlschuss registriert wird, wird die aktive Combo-Serie sofort auf 1,0x zurückgesetzt. Ist in den Einstellungen die Zeitstrafe aktiviert, werden zusätzlich 0,8 Sekunden vom Rundentimer abgezogen, was absolute Disziplin zwischen Klickkadenz und Zielgenauigkeit einfordert."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Mausgriffe (Claw/Fingertip) und DPI-Werte eignen sich am besten für maximale Klickraten?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein Palm-Grip (Aufliegen der gesamten Handfläche) schränkt die Gelenkbewegung bei High-Speed-Clicks ein. Empfohlen wird ein Claw-Grip oder Fingertip-Grip mit aufgestellten Fingergelenken. Dadurch federt der Zeigefinger schneller in die Ausgangsposition zurück. Ein DPI-Bereich zwischen 800 und 1.600 DPI bietet die ideale Balance aus Reichweite und Mikrokontrolle."
      }
    },
    {
      "@type": "Question",
      "name": "Welchen Einfluss haben Monitore mit 144 Hz oder 240 Hz sowie 1.000-Hz-Mäuse auf die Klickmessung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein Standard-60-Hz-Monitor aktualisiert das Bild alle 16,6 ms, während ein 240-Hz-Display die Bildlatenz auf 4,16 ms senkt. Bei schrumpfenden Zielen eliminiert die hohe Bildwiederholrate Bewegungsunschärfe und zeigt den Zielrand gestochen scharf. Eine Polling-Rate von 1.000 Hz stellt sicher, dass jeder Klick im 1-ms-Raster ohne Verzögerung registriert wird (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Werden persönliche Klickraten, Reaktionszeiten oder Mausbewegungen auf externe Server übertragen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nein. Alle Trainingsmetriken, Reaktionszeiten, Genauigkeitsstatistiken und Bestwerte verbleiben zu 100 % lokal im Browser-Speicher (LocalStorage) Ihres Endgeräts. Es findet keinerlei Übermittlung von Bewegungsdaten an externe Rechenzentren statt."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "4-Schritte-Trainingsprotokoll für maximale Klickgeschwindigkeit und Zielerfassung",
  "description": "Wissenschaftlich fundierter Ablauf zur Steigerung von Klickkadenz und ballistischer Treffsicherheit nach Fitts und Woodworth.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Periphere Bereitschaft & zentrale Ausgangsposition (Peripheral Orienting)",
      "text": "Positionieren Sie den Mauszeiger im Bildschirmzentrum und öffnen Sie das periphere Sichtfeld, um neu auftauchende Ziele über den Pop-out-Effekt blitzartig zu erfassen.",
      "url": "https://skilldrills.online/de/drills/physical/fitness/speed-drill#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Explosiver ballistischer Flick (Woodworth Initial Impulse)",
      "text": "Schnappen Sie mit der Maus ansatzlos etwa 75 % der Wegstrecke zum Zielobjekt, ohne den Bewegungsimpuls künstlich zu verlangsamen.",
      "url": "https://skilldrills.online/de/drills/physical/fitness/speed-drill#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Präzises Abfangen vor Schrumpfungsende (Boundary Interception & Click)",
      "text": "Bremsen Sie den Zeiger mit feiner Fingerkontrolle im Zielrand ab und lösen Sie den Klick sofort aus, bevor der Radius unter die Trefferschwelle fällt.",
      "url": "https://skilldrills.online/de/drills/physical/fitness/speed-drill#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Nutzung des Zeitbonus & Combo-Maximierung (Bonus Time & Streak Heat)",
      "text": "Nutzen Sie den Zeitgewinn von +0,6s pro Treffer, um die Serie bis auf den 3,0x-Multiplikator auszubauen und das 24.000-Punkte-Elite-Ziel zu erreichen.",
      "url": "https://skilldrills.online/de/drills/physical/fitness/speed-drill#step-4"
    }
  ]
};

const speedGuide = {
  heading: "Neuromuskulärer Leitfaden für Klickgeschwindigkeit & Zielerfassung",
  intro: {
    title: "Wissenschaftliche Grundlagen motorischer Schnelligkeit und Zielakquise",
    paragraphs: [
      "Der Speed Drill ist ein hochintensives neuromuskuläres Trainingssystem zur präzisen Erfassung und blitzschnellen Zerstörung autonomer, kontinuierlich schrumpfender Kreisziele. Hochgeschwindigkeitsbewegungen mit der Maus basieren auf dem klassischen Zwei-Komponenten-Modell von Robert S. Woodworth (1899). In der ersten Phase (Open-Loop Initial Impulse) überbrückt ein kraftvoller motorischer Stoß den Großteil der Distanz. In der zweiten Phase (Closed-Loop Deceleration) erfolgt die mikroskopische Kurskorrektur und der finale Klickauslöser innerhalb der Zielgrenze.",
      "Das dynamische Schrumpfen der Zielscheiben von anfangs 45 px auf bis zu 12 px verschärft die biomechanische Anforderung drastisch. Nach dem Gesetz von Fitts (Fitts's Law, 1954) wächst der Schwierigkeitsindex (Index of Difficulty) logarithmisch mit schmaler werdender Zielzone. Ein Treffer in den ersten 150 Millisekunden bietet ein breites Toleranzfenster, während ein Hinauszögern chirurgische Mikropäzision erfordert. Schnelle Entschlossenheit beim ersten Flick ist daher die Voraussetzung für Bestleistungen.",
      "Das unvorhersehbare Erscheinen der Ziele aktiviert Mechanismen der Merkmals-Integrationstheorie nach Anne Treisman (Treisman & Gelade, 1980). Die kontrastreichen visuellen Reize erzeugen im parietalen Kortex und im Colliculus superior eine vorattentive Salienzkarte, die eine verdeckte Ausrichtung (Covert Orienting) auslöst, noch bevor die Augen das Ziel fokussieren. Gleichzeitig berechnet das visuelle System über die optische Tau-Theorie (Lee, 1976) die verbleibende Restzeit bis zum Erlöschen des Ziels.",
      "Für unverfälschte Messergebnisse nutzt dieses Trainingsmodul die hochpräzise Schnittstelle performance.now() des Browsers. Monitore mit 144 Hz oder 240 Hz und Mäuse mit 1.000 Hz Abfragerate reduzieren Latenzen auf unter 4 Millisekunden und ermöglichen verzögerungsfreie motorische Reaktionen (Woods et al., 2015). Alle Klickmetriken und Bestleistungen bleiben zum Schutz Ihrer Privatsphäre ausnahmslos lokal auf Ihrem Computer gespeichert."
    ]
  },
  benchmarks: {
    title: "5-Stufen-Leistungsbenchmarks für Klickgeschwindigkeit und Zielerfassung",
    headers: ["Stufe & Rang", "Titel (Rank Title)", "Punkteziel", "Trefferquote & Reaktionszeit", "Gesamtnote", "Neuromuskuläres Profil"],
    rows: [
      ["Tier 1: Ultimativer Velocity-Scharfschütze", "Apex Velocity Sniper", "24.000+ Punkte", "> 95 % / < 160 ms", "Grade S", "Top 0,1 % der E-Sport-Elite. Perfekte Woodworth-Flicks und blitzartige Treffer auf 12-px-Schrumpfziele (Woodworth 1899; Fitts 1954)"],
      ["Tier 2: Präzisions-Reflex-Striker", "Precision Reflex Striker", "17.000 – 23.999 Punkte", "90 – 94 % / 160 – 190 ms", "Grade A", "Top 3 % semiprofessionelles Niveau. Exzellente verdeckte Zielorientierung und stabile Serien bei 3,0-facher Zieldynamik"],
      ["Tier 3: Erfahrener Ziel-Abfänger", "Rapid Target Interceptor", "11.000 – 16.999 Punkte", "82 – 89 % / 191 – 230 ms", "Grade B", "Top 15 % kompetitive Gamer. Zuverlässige Klickkadenz und taktische Nutzung des +0,6s-Zeitbonus für lange Überlebensdauer"],
      ["Tier 4: Lernender Tapping-Athlet", "Developing Tapping Trainee", "6.000 – 10.999 Punkte", "70 – 81 % / 231 – 280 ms", "Grade C", "Durchschnittliches Erwachsenenniveau. Bei Geschwindigkeiten über 2,0x treten Bremsverzögerungen und Kantenfehlschüsse auf"],
      ["Tier 5: Einsteiger in Zielerfassung", "Novice Target Pointer", "< 6.000 Punkte", "< 70 % / > 280 ms", "Grade D", "Basisniveau. Häufige Hektik-Klicks kurz vor Zielablauf. Empfohlen wird das Weiten des peripheren Sichtfelds aus der Mitte"]
    ],
    note: "Objektive Evaluierung auf Grundlage der Bewegungsanalyse nach Woodworth (1899), der Fitts'schen Schwierigkeitsskalierung (1954) und der visuellen Salienzforschung (Treisman 1980)."
  },
  techniques: {
    title: "4 Praxisprotokolle für maximale Klickgeschwindigkeit & Flick-Präzision",
    items: [
      {
        name: "Explosiver Woodworth-Flick-Impuls (Woodworth Ballistic Snap)",
        desc: "Führen Sie den Mauszeiger nicht langsam zum Ziel. Schleudern Sie die Maus mit einem schnellen Impuls über 75 % der Distanz und bremsen Sie die Bewegung erst im Zielbereich durch sanften Druck der Fingerspitzen ab.",
        tips: "Nutzen Sie ein kontrolliertes Abknicken aus dem Handgelenk, um maximale Anfangsbeschleunigung zu erzielen."
      },
      {
        name: "Fitts-Grenzabfangung in der Frühphase (Fitts Boundary Pre-Interception)",
        desc: "Je länger Sie warten, desto kleiner wird das Ziel und desto steiler steigt der Schwierigkeitsindex. Lösen Sie den Klick in den ersten 150 ms aus, wenn das Ziel noch den vollen Durchmesser besitzt.",
        tips: "Versuchen Sie nicht zwingend den absoluten Mittelpunkt zu treffen – nutzen Sie die gesamte anfängliche Trefferfläche."
      },
      {
        name: "Treisman Periphere Wahrnehmungsbereitschaft (Treisman Covert Peripheral Awareness)",
        desc: "Fixieren Sie den Blick nicht starr auf einen Punkt. Halten Sie den Fokus entspannt im Bildschirmzentrum, damit die Bewegungssensoren im peripheren Sichtfeld sofort anspringen und den Zeiger instinktiv lenken.",
        tips: "Warten Sie nicht, bis die Augen vollständig umfokussiert haben, sondern lassen Sie Hand und Blick synchron starten."
      },
      {
        name: "High-Frequency-Claw-Grip (Claw-Grip High-Frequency Tapping)",
        desc: "Vermeiden Sie es, die Handfläche träge auf der Maus abzulegen. Stellen Sie die Fingerkuppen im Claw-Grip auf, um den Federweg der Maustaster maximal zu verkürzen und die Rückstellkraft für schnelle Klickfolgen zu nutzen.",
        tips: "Halten Sie den Unterarm locker und erzeugen Sie den Klickdruck ausschließlich aus dem Zeigefingergelenk."
      }
    ]
  },
  steps: [
    "Nehmen Sie eine aufrechte Sitzhaltung ein und positionieren Sie den Mauszeiger mittig.",
    "Sobald ein Ziel auftaucht, schnappen Sie mit einem explosiven Flick direkt in den Kreisbereich.",
    "Lösen Sie den Klick vor Ablauf der Schrumpfung aus, um Punkte und +0,6s Zeitgutschrift zu sichern.",
    "Bauen Sie eine ununterbrochene Serie bis zum 3,0x-Multiplikator auf und streben Sie 24.000+ Punkte an."
  ],
  audience: "E-Sportler (CS2, Valorant, Apex, Overwatch), die ihre Erstzielerfassung und Klickkadenz maximieren wollen, sowie alle, die Reaktionszeit und Fingerfertigkeit trainieren möchten.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('woodworth1899', 'fitts1954', 'treisman1980', 'lee1976', 'woods2015')
};

export default function LocalizedSpeedDrillPageDe() {
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
      <SpeedDrillClient
        copy={{
          title: "Klickgeschwindigkeit Test & Speed Drill",
          subtitle: "Schrumpfende Ziele abfangen & ballistische Flicks • 15 dynamische Level",
          hudLabels: {
            score: "Punkte",
            time: "Zeit",
            bestScore: "Rekord",
            bestCombo: "Max Combo"
          },
          rulesTitle: "Drill-Regeln & Punktesystem",
          rulesItems: [
            { title: "Ziele erfassen & Zeitbonus", text: "Klicken Sie auf schrumpfende Ziele, bevor sie erlöschen. Jeder Treffer bringt 100 Punkte (skaliert mit Multiplikator) und verlängert die Runde um +0,6 Sekunden." },
            { title: "Combo-Multiplikator aufbauen", text: "Treffer ohne Unterbrechung steigern den Multiplikator kontinuierlich auf bis zu 3,0x." },
            { title: "Level-Progression", text: "Alle 1.750 Punkte steigt das Level. Zielgeschwindigkeit und Schrumpfrate ziehen dynamisch an." },
            { title: "Fehlschuss- und Zeitstrafen", text: "Ein Verfehlen oder Erlöschen setzt die Combo zurück (und kostet bei aktiver Option 0,8 Sekunden)." }
          ],
          aboutTitle: "Über den Speed Drill & Reaktions-Biomechanik",
          aboutSections: [
            {
              title: "Ballistische Flicks & Zielerfassung im Millisekundenbereich",
              subtitle: "Woodworths (1899) Modell unter extremen Geschwindigkeitsanforderungen",
              content: "Schnelles Treffen beruht auf einem offenen Anfangsimpuls gefolgt von feiner Endabbremsung. Bei höheren Levels verlangt der Drill einen ansatzlosen Erstflick ohne Zögern."
            },
            {
              title: "Schrumpfende Raumgrenzen & das Gesetz von Fitts",
              subtitle: "Logarithmischer Anstieg des Schwierigkeitsindex bei Zielverkleinerung",
              content: "Von 45 px auf 12 px sinkt die Fehlertoleranz dramatisch. Frühes Abfangen bei großem Durchmesser belohnt mutiges, schnelles Zielen."
            },
            {
              title: "Visuelle Salienz & periphere Erkennung",
              subtitle: "Merkmalsintegration und vorattentive Zielerfassung nach Treisman (1980)",
              content: "Bewegte Kreisziele aktivieren neuronale Pop-out-Muster, die den Bewegungsimpuls der Hand vorbereiten, noch bevor der Blick voll fokussiert."
            },
            {
              title: "Optische Tau-Theorie & Abfangzeitspanne",
              subtitle: "Zeit bis zur Auslöschung nach Lee (1976)",
              content: "Das visuelle System leitet die verbleibende Reaktionsspanne direkt aus der relativen Schrumpfungsrate ab und verhindert überhastete Klicks."
            }
          ]
        }}
      />
      <DrillGuide {...speedGuide} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/fitness/speed-drill" />
    </>
  );
}
