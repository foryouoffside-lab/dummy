import FineMotorClient from '@/app/drills/motor/precision-control/tracing/TracingClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Maus-Tracing-Spiel – Pfad-Verfolgung & Feinmotorik-Test',
  description: 'Kostenloses Maus-Tracing-Spiel zur Schulung der Feinmotorik. Halte den Cursor auf der Spur, um Handruhe, Pfadtreue und Tracking-Stabilität zu testen.',
  keywords: ["Maus Tracing Spiel", "Maus Pfad Verfolgen Test", "Feinmotorik Maus Spiel", "Maus Tracking Trainer", "Smooth Pursuit Augenbewegung", "Maus Ruhige Hand Test", "Hand-Auge-Koordination Maus", "Maus Praezision Test", "FPS Tracking Aim", "Aim Trainer Kostenlos"],
  openGraph: {
    title: 'Maus-Tracing-Spiel – Pfad-Verfolgung & Feinmotorik-Test | SkillDrills',
    description: 'Kostenloses Maus-Tracing-Spiel zur Schulung der Feinmotorik. Halte den Cursor auf der Spur, um Handruhe, Pfadtreue und Tracking-Stabilität zu testen.',
    type: 'article',
    url: 'https://skilldrills.online/de/drills/motor/precision-control/tracing',
    siteName: 'SkillDrills',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maus-Tracing-Spiel – Pfad-Verfolgung & Feinmotorik-Test | SkillDrills',
    description: 'Kostenloses Maus-Tracing-Spiel zur Schulung der Feinmotorik. Halte den Cursor auf der Spur, um Handruhe, Pfadtreue und Tracking-Stabilität zu testen.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/motor/precision-control/tracing',
    languages: getAlternateLanguages('/drills/motor/precision-control/tracing'),
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
      "name": "Motorisches Training",
      "item": "https://skilldrills.online/de/drills/motor"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Maus-Tracing-Spiel",
      "item": "https://skilldrills.online/de/drills/motor/precision-control/tracing"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Maus-Tracing Feinmotorik-Praezisionstest",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "description": "Kostenloses Maus-Tracing-Spiel zur Schulung der Feinmotorik. Halte den Mauszeiger kontinuierlich auf der sich bewegenden Spur, um Handruhe, Pfadtreue und Tracking-Stabilität zu messen.",
  "url": "https://skilldrills.online/de/drills/motor/precision-control/tracing",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online"
  },
  "inLanguage": "de-DE",
  "dateModified": "2026-09-11"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Maus-Tracing-Spiel – Pfad-Verfolgung & Feinmotorik-Präzisionstest",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas, Pointer Lock API, modern web browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "url": "https://skilldrills.online/de/drills/motor/precision-control/tracing",
  "inLanguage": "de-DE",
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Maus-Tracing-Spiel – Dynamische Pfadverfolgung und Feinmotorik-Game",
  "url": "https://skilldrills.online/de/drills/motor/precision-control/tracing",
  "description": "Kostenloses Maus-Tracing-Spiel zur Schulung der Feinmotorik. Halte den Mauszeiger kontinuierlich auf der sich bewegenden Spur, um Handruhe, Pfadtreue und Tracking-Stabilität zu messen.",
  "genre": [
    "Action",
    "Aim Trainer",
    "Esports Training"
  ],
  "gamePlatform": [
    "Web Browser",
    "Desktop"
  ],
  "applicationCategory": "Game",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was ist das Maus-Tracing-Spiel (Mouse Tracing)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein interaktiver Prazisionstest, bei dem der Mauszeiger unterbrechungsfrei auf einer kontinuierlich fliessenden Wellenlinie gehalten werden muss, um feinmotorische Spurtreue zu messen."
      }
    },
    {
      "@type": "Question",
      "name": "Worin liegt der Unterschied zum statischen Mausklick?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tracing erfordert eine kontinuierliche Regelung im geschlossenen Regelkreis (Closed-Loop), bei der Handgeschwindigkeit und Zielgeschwindigkeit standig synchronisiert werden."
      }
    },
    {
      "@type": "Question",
      "name": "Was versteht man unter Smooth Pursuit Augenbewegungen (Krauzlis, 2004)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Fahigkeit der Augen, sich kontinuierlich bewegenden Zielen glatt zu folgen, ohne standig ruckartige Korrektursakkaden ausfuhren zu mussen."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Bedeutung haben Rashbass' Experimente (1961)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rashbass bewies, dass visuelle Positionsfehler und Zielgeschwindigkeiten uber getrennte neuronale Bahnen zur motorischen Steuerung verarbeitet werden."
      }
    },
    {
      "@type": "Question",
      "name": "Wie wirkt sich das Steering Law (Accot & Zhai, 1997) aus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die maximale Lenkgeschwindigkeit entlang einer Bahn ist durch das Verhaltnis von Spurbreite und Krummungsradius mathematisch begrenzt."
      }
    },
    {
      "@type": "Question",
      "name": "Was geschieht beim Verlassen des Pfades (Off-Path)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sobald der Zeiger die Spur verlasst, fallt der Flow-Wert drastisch ab und ein visueller Warnblitz signalisiert den Prazisionsverlust."
      }
    },
    {
      "@type": "Question",
      "name": "Wie fuhrt man die Maus am ruhigsten auf der Linie?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stutzen Sie den Handballen leicht auf dem Mauspad ab, um einen stabilen Reibungspunkt zu schaffen, und steuern Sie die Welle mit feinen Fingerbewegungen."
      }
    },
    {
      "@type": "Question",
      "name": "Wie hilft dieser Drill in FPS-Titeln?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Er verbessert das Tracking-Aiming in Games wie Apex Legends, CS2 oder Overwatch, bei denen das Fadenkreuz kontinuierlich auf ausweichenden Gegnern bleiben muss."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Mauseinstellungen sind optimal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eine moderate DPI-Einstellung (z. B. 800 DPI) ohne Sensorbeschleunigung verhindert Mikroruckler beim Folgen der Kurve."
      }
    },
    {
      "@type": "Question",
      "name": "Funktioniert das Tool ohne Registrierung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, der Drill lauft sofort im Webbrowser, ist 100% kostenfrei und verlangt keine Installation."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Maus-Tracing-Spiel – Pfad-Verfolgung & Feinmotorik-Präzisionstest",
  "description": "Kostenloses Maus-Tracing-Spiel zur Schulung der Feinmotorik. Halte den Mauszeiger kontinuierlich auf der sich bewegenden Spur, um Handruhe, Pfadtreue und Tracking-Stabilität zu messen.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Pointer-Lock aktivieren und Kurs aufnehmen",
      "text": "Klicken Sie in das Feld, um die Maus zu sperren, und setzen Sie den Cursor prazise auf den Beginn der Welle.",
      "url": "https://skilldrills.online/de/drills/motor/precision-control/tracing#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Geschwindigkeitssynchrones Tracking",
      "text": "Passen Sie die Gleitgeschwindigkeit der Maus exakt an die Wellenbewegung an, um die Spurmitte zu halten.",
      "url": "https://skilldrills.online/de/drills/motor/precision-control/tracing#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Sanfte Feinjustierung in Kurvenscheiteln",
      "text": "Bremsen und lenken Sie an den Scheitelpunkten gefuhlvoll mit den Fingermuskeln, um Uberschwinger zu verhindern.",
      "url": "https://skilldrills.online/de/drills/motor/precision-control/tracing#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Aufrechterhaltung des Super-Flows",
      "text": "Bleiben Sie ohne Spurverlass auf der Linie, um den hochsten Flow-Score und beste Platzierungen zu erzielen.",
      "url": "https://skilldrills.online/de/drills/motor/precision-control/tracing#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('accot1997', 'krauzlis2004', 'rashbass1961', 'woodworth1899', 'woods2015'),
  intro: {
    title: "Maus-Tracing-Spiel – Pfad-Verfolgung & Feinmotorik-Präzisionstest",
    paragraphs: [
      "Kostenloses Maus-Tracing-Spiel zur Schulung der Feinmotorik. Halte den Mauszeiger kontinuierlich auf der sich bewegenden Spur, um Handruhe, Pfadtreue und Tracking-Stabilität zu messen.",
      "Tracing erfordert eine kontinuierliche Regelung im geschlossenen Regelkreis (Closed-Loop), bei der Handgeschwindigkeit und Zielgeschwindigkeit standig synchronisiert werden.",
      "Die Fahigkeit der Augen, sich kontinuierlich bewegenden Zielen glatt zu folgen, ohne standig ruckartige Korrektursakkaden ausfuhren zu mussen.",
    ],
  },
  benchmarks: {
    title: 'Standardisierte Leistungs-Benchmarks',
    headers: ['Leistungsstufe (Tier)', 'Rangbezeichnung (Rank)', 'Leistungsbereich', 'Erreichte Stufe', 'Genauigkeit', 'Perzentil'],
    rows: [
      { tier: 'Tier 1', rank: 'Großmeister / Präzisions-Operator', stat: 'Top 1%', level: 'Elite (Exzellent)', accuracy: '98%+', percentile: 'Top 1%' },
      { tier: 'Tier 2', rank: 'Meister / Feinfühliger Tracker', stat: 'Top 5%', level: 'Diamant (Sehr gut)', accuracy: '94–97%', percentile: 'Top 5%' },
      { tier: 'Tier 3', rank: 'Profi / Erfahrener Pfadfolger', stat: 'Top 15%', level: 'Platin (Kompetent)', accuracy: '88–93%', percentile: 'Top 15%' },
      { tier: 'Tier 4', rank: 'Fortgeschrittener Anwender', stat: 'Top 50%', level: 'Gold (Standard)', accuracy: '78–87%', percentile: 'Top 50%' },
      { tier: 'Tier 5', rank: 'Einsteiger-Basislinie', stat: 'Basis', level: 'Silber (Basis)', accuracy: '< 78%', percentile: 'Basislinie' },
    ],
  },
  protocols: {
    title: '4 wissenschaftliche Trainingsprotokolle zur Steigerung der Feinmotorik',
    description: 'Wissenschaftlich kalibriertes Feinmotorik-Protokoll auf Basis des Steering Law (Accot & Zhai, 1997) und der Blickfolgebewegung (Smooth Pursuit) zur Maximierung von Kurventreue und Zeigerstabilität.',
    items: [
      { title: "Pointer-Lock aktivieren und Kurs aufnehmen", description: "Klicken Sie in das Feld, um die Maus zu sperren, und setzen Sie den Cursor prazise auf den Beginn der Welle." },
      { title: "Geschwindigkeitssynchrones Tracking", description: "Passen Sie die Gleitgeschwindigkeit der Maus exakt an die Wellenbewegung an, um die Spurmitte zu halten." },
      { title: "Sanfte Feinjustierung in Kurvenscheiteln", description: "Bremsen und lenken Sie an den Scheitelpunkten gefuhlvoll mit den Fingermuskeln, um Uberschwinger zu verhindern." },
      { title: "Aufrechterhaltung des Super-Flows", description: "Bleiben Sie ohne Spurverlass auf der Linie, um den hochsten Flow-Score und beste Platzierungen zu erzielen." },
    ],
  },
  faqs: {
    title: 'Häufig gestellte Fragen (FAQ)',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

const deCopy = {
  title: "Maus-Tracing-Spiel",
  subtitle: "Kontinuierliches Roh-Tracking • 45s Timer",
  startButtonText: "Training Starten",
  trainAgain: "Erneut Trainieren",
  shareTitle: "Ergebnis Teilen",
  exitTitle: "Beenden",
  statFlowScore: "Flow-Punkte",
  statTimeLeft: "Verbleibende Zeit",
  statFlowIntegrity: "Flow-Stabilität",
  statBestScore: "Bestergebnis",
  maxStreakLabel: "Max. Streak-Frames",
  peakFlowLabel: "Spitzen-Flow-Zustand",
  bestScoreLabel: "Persönliche Bestleistung",
  rulesTitle: "Trainingsanleitung & Bewertungssystem",
  rulesItems: [
    { num: "1", text: "Pfad Verfolgen", highlight: "Smaragdwelle", result: "+1 Punkt / Frame auf Pfad" },
    { num: "2", text: "Geschwindigkeit", highlight: "Dynamische Welle", result: "2,2 → 3,8 px/f über 45s" },
    { num: "3", text: "Flow-Bonus", highlight: "Super Flow", result: "4s Pfadtreue bringt +5 Punkte" },
    { num: "4", text: "Präzises Tracking", highlight: "Desktop Exklusiv", result: "1:1 Rohe Mauseingabe" }
  ],
};

export default function LocalizedMotorPage() {
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
      <FineMotorClient copy={deCopy} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/de/drills/motor/precision-control/tracing" />
      </div>
      <DrillFooter />
    </>
  );
}
