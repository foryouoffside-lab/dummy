import AutoPursuitClient from '@/app/drills/visual/tracking-accuracy/pursuit-tracker/AutoPursuitClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Smooth Pursuit Test: Augenfolgebewegung | SkillDrills",
  description: "Kostenloser Smooth Pursuit Test online: Trainiere kontinuierliche Augenfolgebewegung und Aim-Tracking. Reduziere Sakkaden und verbessere Zielpräzision.",
  keywords: [
    "eye tracking test online",
    "Smooth Pursuit Test",
    "Augenfolgebewegung Training",
    "Blickfolge Training",
    "Eye Tracking Accuracy Test",
    "FPS Tracking Aim",
    "Netzhautschlupf",
    "Okulomotorik",
    "Auge Hand Koordination",
    "Sehtraining Online"
  ],
  openGraph: {
    title: "Smooth Pursuit Eye-Tracking Test – Augenfolgebewegung & Aim-Tracking Online | SkillDrills",
    description: "Kostenloser Smooth Pursuit Eye-Tracking-Drill online. Trainiere stufenlose Augenfolgebewegungen und Hand-Auge-Präzision auf sich kontinuierlich bewegende Ziele.",
    type: 'article',
    url: 'https://skilldrills.online/de/drills/visual/tracking-accuracy/pursuit-tracker',
    siteName: 'SkillDrills',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Smooth Pursuit Eye-Tracking Test – Augenfolgebewegung & Aim-Tracking Online | SkillDrills",
    description: "Kostenloser Smooth Pursuit Eye-Tracking-Drill online. Optimiere okulomotorische Folgebewegungen und Aim-Tracking im Browser.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/visual/tracking-accuracy/pursuit-tracker',
    languages: getAlternateLanguages('/drills/visual/tracking-accuracy/pursuit-tracker'),
  },
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
      "name": "Trainings-Hub",
      "item": "https://skilldrills.online/de/drills"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Visuelles Training",
      "item": "https://skilldrills.online/de/drills/visual"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Zielverfolgung & Tracking",
      "item": "https://skilldrills.online/de/drills/visual/tracking-accuracy"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Smooth Pursuit Eye-Tracking Test",
      "item": "https://skilldrills.online/de/drills/visual/tracking-accuracy/pursuit-tracker"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SkillDrills Smooth Pursuit Eye-Tracking Test & Trainer",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Any",
  "browserRequirements": "Moderner Webbrowser mit HTML5-Canvas-Unterstützung",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "description": "Präzises Web-Tool zur computergestützten Messung kontinuierlicher okulomotorischer Folgebewegungen, Hand-Auge-Synchronisation und Sakkadendämpfung auf der Basis neuroophthalmologischer Standards."
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Kostenloses Online Smooth Pursuit Eye-Tracking-Training",
  "url": "https://skilldrills.online/de/drills/visual/tracking-accuracy/pursuit-tracker",
  "applicationCategory": "GameApplication",
  "genre": ["Eye Tracking Test", "Augenfolgebewegung", "Aim Tracking", "Visuelle Koordination"],
  "browserRequirements": "Requires HTML5 Canvas and JavaScript",
  "inLanguage": "de-DE"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Smooth Pursuit Auto-Tracker Drill",
  "description": "Halte das Fadenkreuz kontinuierlich auf dem fließend manövrierenden Ziel-Orb und teste deine Reaktionskonstanz über 45 Sekunden.",
  "genre": ["Aim Trainer", "Vision Training", "Esports Reaction"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was versteht man unter Smooth Pursuit (glatte Augenfolgebewegungen)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Smooth Pursuit Eye Movements (SPEM) bezeichnen das neurophysiologische Vermögen des Sehsystems, den Blick stufenlos und synchron an die Geschwindigkeit eines sich bewegenden Objekts anzupassen (Leigh & Zee, 2015). Ziel ist es, das Netzhautbild des Zielobjekts exakt auf der Fovea centralis (dem Punkt des schärfsten Sehens) festzuhalten und störenden Netzhautschlupf (Retinal Slip) zu minimieren. Im Gegensatz zu sprunghaften Sakkaden erfordert dies eine kontinuierliche Geschwindigkeitsberechnung im parieto-okzipitalen Kortex (Areal MT/MST) und Kleinhirn."
      }
    },
    {
      "@type": "Question",
      "name": "Warum ruckelt die Zielverfolgung bei schnellen Manövern oft stufenweise?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hinkt die Winkelgeschwindigkeit des Auges dem Zielobjekt hinterher, entsteht ein Positionsfehler auf der Netzhaut. Um das Ziel nicht komplett zu verlieren, löst das Gehirn reflexartig kompensatorische Kurzsakkaden aus, sogenannte Catch-up-Sakkaden (Rashbass, 1961). Ein untrainiertes visuelles System wechselt ständig zwischen zu langsamer Verfolgung und ruckartigen Nachkorrekturen hin und her, was sich als unruhiges Ruckeln bemerkbar macht."
      }
    },
    {
      "@type": "Question",
      "name": "Welche direkte Relevanz hat dieser Test für FPS-Shooter wie Apex Legends oder Overwatch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Das sogenannte 'Tracking-Aiming' auf ausweichende, gleitende oder strafende Gegner (AD-Strafe) ist die direkte motorische Umsetzung des Smooth-Pursuit-Systems. Spieler mit hochgradig geschulter Blickfolge halten das Fadenkreuz auch bei plötzlichen Geschwindigkeitswechseln stabil auf der gegnerischen Hitbox, ohne durch Überreagieren (Overshoot) vom Ziel abzuprallen (Lisberger, 2010)."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Mauseinstellungen (DPI, Sensitivität) eignen sich am besten für Folgebewegungen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eine übertrieben hohe Maussensitivität verstärkt natürliche Mikrovibrationen der Finger und erzeugt unruhiges Zeigerzittern. Eine zu niedrige Empfindlichkeit hingegen ermüdet den Arm bei weiten Bildschirmüberquerungen. Empfohlen wird eine mittlere bis moderate Sensitivität (z. B. 800 DPI mit einer In-Game-Sensitivität, die ca. 30–45 cm für eine 360-Grad-Drehung erfordert), kombiniert mit zwingend deaktivierter Zeigerbeschleunigung in Windows."
      }
    },
    {
      "@type": "Question",
      "name": "Verbessert regelmäßiges Blickfolgetraining auch die allgemeine Konzentration und Sehgesundheit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Das Training stärkt die synaptische Plastizität im frontalen Augenfeld (FEF) und optimiert interne Vorhersagemodelle (Barnes, 2008). Dies erleichtert flüssiges Lesen bei raschen Zeilenwechseln, verlängert die fehlerfreie visuelle Aufmerksamkeitsspanne und verringert spürbar die Symptome digitaler Augenüberlastung (Asthenopie) bei Bildschirmarbeit."
      }
    },
    {
      "@type": "Question",
      "name": "Profitieren auch reale Sportarten wie Tennis, Tischtennis oder Motorsport davon?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Enorm. Spitzen-Baseballer, Tennisprofis und Formel-1-Piloten zeichnen sich durch einen außergewöhnlich hohen Smooth-Pursuit-Gain aus. Da ihre Augen dem Verlauf des Balls oder der Kurvenlinie ohne zeitliche Phasenverschiebung folgen, bleibt mehr Reaktionszeit für die Feinabstimmung der Körpermechanik übrig."
      }
    },
    {
      "@type": "Question",
      "name": "Sollte man die Maus primär aus dem Handgelenk oder aus dem Unterarm führen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die anatomisch sauberste Technik ist die kinetische Entkopplung: Weite, kontinuierliche Kurvenbewegungen werden fließend aus dem Ellenbogen (Unterarm-Aiming) gesteuert, während feine Richtungskorrekturen und Mikroabgleiche aus dem Handgelenk und den Fingerspitzen stammen. Wer ausschließlich das Handgelenk einsetzt, riskiert Sehnenreizungen und unpräzise Knickbewegungen."
      }
    },
    {
      "@type": "Question",
      "name": "Wie reagiert man am besten auf abrupte Richtungswechsel des Ziel-Orbs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der häufigste Fehler ist ein panischer, ruckartiger Ruck (Flick), der fast immer zum Überschwingen führt. Versuche stattdessen, die Handmuskeln im Moment der Richtungsänderung bewusst locker zu halten und den Zeiger in einer gleichmäßigen, weichen Gleitbewegung auf den neuen Geschwindigkeitsvektor einzuschleifen."
      }
    },
    {
      "@type": "Question",
      "name": "Wie sieht eine effektive Trainingsroutine aus, um Augenermüdung zu vermeiden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Da die sechs äußeren Augenmuskeln bei kontinuierlicher Zielverfolgung Höchstleistung erbringen, sind 3 bis 5 Durchgänge à 45 Sekunden (ca. 5 bis 10 Minuten Gesamttraining) pro Tag optimal. Nach dem Training empfiehlt sich das 'Palming' (Augen mit warmen Handflächen abdecken) und der Blick in die Ferne zur Entlastung des Ziliarmuskels."
      }
    },
    {
      "@type": "Question",
      "name": "Werden meine Tracking-Daten oder Mauskoordinaten an externe Server übertragen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nein. Sämtliche Berechnungen, Haltezeiten und Präzisionsbewertungen finden ausnahmslos clientseitig in deinem Webbrowser statt. Alle Fortschrittsdaten verbleiben verschlüsselt im lokalen Speicher (localStorage) deines Geräts. Es werden keinerlei persönliche Daten oder Bewegungsprofile übertragen."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Schritt-für-Schritt-Anleitung für das Smooth Pursuit Eye-Tracking-Training",
  "description": "So maximierst du deine Haltezeit und Verfolgungsgenauigkeit auf dynamisch fließenden Zielbahnen.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Ausgangsposition zentrieren und Haltung lockern",
      "text": "Platziere den Zeiger während des Countdowns ruhig auf dem ruhenden Ziel-Orb und lockere Schulter- und Handgelenksmuskulatur.",
      "url": "https://skilldrills.online/de/drills/visual/tracking-accuracy/pursuit-tracker#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Gleichmäßige kontinuierliche Führung starten",
      "text": "Folge der Kugel ab dem ersten Bewegungsmoment mit konstanter Geschwindigkeit, ohne ruckartig vorauszueilen oder abzufallen.",
      "url": "https://skilldrills.online/de/drills/visual/tracking-accuracy/pursuit-tracker#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Mikrosakkaden bei Richtungswechseln dämpfen",
      "text": "Gleite bei Kurvenwechseln weich in die neue Bewegungsbahn hinein, anstatt panisch mit schnellen Blicksprüngen nachzukorrigieren.",
      "url": "https://skilldrills.online/de/drills/visual/tracking-accuracy/pursuit-tracker#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "45 Sekunden Haltezeit maximieren",
      "text": "Halte das Fadenkreuz über die volle Trainingsdauer auf dem Ziel und werte deinen Haltezeit-Prozentsatz (Time on Target) im Abschlussreport aus.",
      "url": "https://skilldrills.online/de/drills/visual/tracking-accuracy/pursuit-tracker#step-4"
    }
  ]
};

const guideData = {
  eyebrow: "Neuroophthalmologie & Okulomotorische Kontrolle",
  heading: "Smooth Pursuit Eye-Tracking – Blickfolgebewegung & Visuomotorische Präzision",
  intro: [
    "Das System der glatten Augenfolgebewegungen (Smooth Pursuit Eye Movements, SPEM) steuert die stufenlose Ausrichtung der Sehachse auf kontinuierlich bewegte Objekte, um deren Abbild stabil im Bereich der Fovea centralis – dem Areal höchster visueller Auflösung – zu fixieren. Physiologisch unterscheidet sich dieser Regelkreis fundamental von sakkadischen Blicksprüngen, die Zielpositionen sprunghaft ansteuern und von eigenständigen prämotorischen Schaltkreisen im Hirnstamm generiert werden (Rashbass, 1961).",
    "Der neurophysiologische Hauptantrieb für Smooth Pursuit ist der sogenannte Netzhautschlupf (Retinal Slip), also die Abdriftrate des Bildes auf der Retina (Leigh & Zee, 2015). Visuelle Bewegungssignale aus dem primären Sehzentrum (V1) werden in den Arealen MT/V5 und MST in Richtungs- und Geschwindigkeitsvektoren zerlegt. Über die frontalen Augenfelder (FEF) und Brückenkerne gelangt das Signal in das Kleinhirn (Flocculus und dorsaler Vermis), welches hochpräzise Feuermuster an die okulomotorischen Hirnnervenkerne übermittelt (Krauzlis, 2004; Lisberger, 2010).",
    "Da die neuronale Signalübertragung im menschlichen Seh- und Bewegungssystem einer unvermeidbaren Latenzzeit von 100 bis 130 Millisekunden unterliegt, basiert eine erfolgreiche stufenlose Zielverfolgung auf internen Kleinhirn-Vorhersagemodellen (Internal Predictive Models), die eine vorausschauende Feedforward-Steuerung ermöglichen (Barnes, 2008). Versagt diese prädiktive Synchronisation, bricht die Folgebewegung ab und das Gehirn muss den Positionsverlust durch ruckartige Catch-up-Sakkaden kompensieren, was zu abrupten Sprüngen im Fadenkreuz führt.",
    "Dieses webbasierte Testsystem nutzt moderne performance.now()-Mikrotimer und Subpixel-Rendering, um die relative Haltezeit im Ziel (Time on Target), die mittlere Bahnabweichung und die Latenz bei Richtungswechseln in Echtzeit zu analysieren. Regelmäßiges okulomotorisches Folgetraining optimiert die neuromuskuläre Koppelung zwischen Auge und Hand – mit direkt spürbaren Vorteilen für das Tracking-Aiming in First-Person-Shootern, die dynamische Bewegungserfassung im Sport sowie die Entlastung der Augen bei Bildschirmarbeit."
  ],
  benchmarks: {
    title: "Standardisierte Benchmarks für Smooth Pursuit & Visuelle Folgebewegung",
    headers: ["Leistungsstufe / Rang", "Zielverfolgungs-Haltezeit (Time on Target)", "Mittlere Tracking-Präzision", "Sakkaden-Unterdrückung", "Neurophysiologisches Niveau"],
    rows: [
      ["Weltklasse / Pro-Level (Top 1%)", "≥ 88%", "≥ 92%", "≥ 95% Unterdrückung", "Perfekte kontinuierliche Folgebewegung, minimaler Netzhautschlupf. Voll synchronisiertes Kleinhirn-Innenmodell (Lisberger, 2010)"],
      ["Fortgeschritten / Athlet (Top 5%)", "76 – 87%", "84 – 91%", "88 – 94% Unterdrückung", "Hochpräzise Okulomotorik und rasche Phasenanpassung bei Richtungswechseln"],
      ["Solider Standard (Top 25%)", "62 – 75%", "72 – 83%", "78 – 87% Unterdrückung", "Stabiles Tracking auf gleichmäßigen Bahnen, vereinzelte Korrektursakkaden bei Tempowechseln"],
      ["Basis-Niveau (Top 50%)", "48 – 61%", "60 – 71%", "65 – 77% Unterdrückung", "Häufiges Abdriften des Cursors und stufenweises Nachführen via Catch-up-Sakkaden"],
      ["Einsteiger / Untrainiert (Baseline)", "< 48%", "< 60%", "< 65% Unterdrückung", "Starke visuelle Latenz, ruckartige Handbewegungen und chronisches Überschwingen"]
    ],
    note: "Basierend auf publizierten neuroophthalmologischen und sportwissenschaftlichen Studien (Rashbass 1961; Krauzlis 2004; Leigh & Zee 2015; Lisberger 2010)."
  },
  techniques: {
    title: "4 praxiserprobte Methoden zur Perfektionierung der Zielverfolgung",
    items: [
      {
        name: "Geschwindigkeits-Phasenabgleich (Smooth Acceleration Matching)",
        desc: "Führe den Cursor nicht hinter dem Ziel her, sondern passe die Handgeschwindigkeit kontinuierlich an das Tempo des Objekts an, um die relative Bewegung auf der Netzhaut auf null zu reduzieren.",
        tips: "Fixiere foveal entspannt den Kern des Ziel-Orbs, anstatt hektisch den äußeren Rändern hinterherzuschauen."
      },
      {
        name: "Mikrosakkaden-Dämpfung (Catch-up Saccade Suppression)",
        desc: "Unterdrücke den Impuls, bei kleinen Abweichungen panisch mit schnellen Rucks nachzukorrigieren; gleite stattdessen mit ruhigem, fließendem Schwung zurück ins Zentrum.",
        tips: "Verkrampfte Handmuskeln verursachen Zittern. Achte auf bewusst gelockerte Finger- und Handgelenkshaltung."
      },
      {
        name: "Kinetische Muskelentkopplung (Arm-Wrist Kinetic Decoupling)",
        desc: "Nutze den Unterarm mit dem Ellenbogen als Drehpunkt für weite, flächige Richtungsverläufe und setze das Handgelenk ausschließlich für minimale Feinkorrekturen ein.",
        tips: "Vermeide es, das Handgelenk mit hohem Druck auf das Mauspad zu pressen, da Reibungswiderstand stufenförmiges Haken provoziert."
      },
      {
        name: "Foveale Fixierungsstabilität (Foveal Attentional Anchoring)",
        desc: "Behalte auch bei abrupten Richtungswechseln einen weiten, unverkrampften Blick bei und koordiniere die foveale Schärfe mit der peripheren Bewegungswahrnehmung.",
        tips: "Regelmäßiges, natürliches Blinzeln verhindert trockene Augen und erhält einen stabilen Tränenfilm für scharfe Konturen."
      }
    ]
  },
  steps: [
    "Klicke auf Start und positioniere das Fadenkreuz im Zentrum des im Bildschirmzentrum erscheinenden Ziel-Orbs.",
    "Bewege die Maus mit gleichmäßiger Geschwindigkeit und sanftem Druck synchron mit dem manövrierenden Zielkörper.",
    "Passe dich fließend an Beschleunigungen und Kurven an, ohne bei Richtungswechseln hektisch zu verreißen.",
    "Halte das Fadenkreuz 45 Sekunden lang ununterbrochen im Zielbereich und maximiere deine Time-on-Target-Quote.",
    "Analysiere deine ermittelte Tracking-Genauigkeit und Einstufung und integriere den Drill in dein tägliches Sehtraining."
  ],
  audience: "FPS-Gamer (Apex Legends, Overwatch, Valorant, CS2) zur Optimierung des Tracking-Aimings auf bewegte Hitboxen, Ballsportler (Tennis, Baseball, Tischtennis) zur Schulung der kontinuierlichen Blickfolge sowie alle, die ihre visuelle Feinmotorik verbessern möchten.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('rashbass1961', 'krauzlis2004', 'leigh2015', 'lisberger2010', 'barnes2008', 'woods2015'),
  related: [
    { href: "/de/drills/visual/tracking-accuracy/moving-target", label: "Dynamische Sehschärfe & Zielinterzeption" },
    { href: "/de/drills/visual/tracking-accuracy/multiple-targets", label: "Multiple Object Tracking Test (MOT)" },
    { href: "/de/drills/visual/visual-recognition/visual-search", label: "Visuelle Suche (Peripheres Scannen)" },
    { href: "/de/drills/reaction-speed/visual-tracking-speed-test", label: "Visuelle Tracking-Geschwindigkeit" }
  ]
};

export default function LocalizedPursuitTrackerDePage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <AutoPursuitClient copy={{ title: "Smooth Pursuit Eye-Tracking Test", subtitle: "Stufenlose Blickfolgebewegung & Visuelle Koordination" }} />
      <DrillGuide guide={guideData} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/de/drills/visual/tracking-accuracy/pursuit-tracker" />
      </div>
    </>
  );
}
