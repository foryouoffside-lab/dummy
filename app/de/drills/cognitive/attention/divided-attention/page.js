import DividedAttentionClient from '@/app/drills/cognitive/attention/divided-attention/DividedAttentionClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Geteilte Aufmerksamkeit Test – Dual-Task | SkillDrills",
  description: "Kostenloser Online-Test für geteilte Aufmerksamkeit (Dual-Task): Verfolge visuelle Ziele und klassifiziere Zahlenreihen zur Messung kognitiver Engpässe.",
  keywords: ["Geteilte Aufmerksamkeit Test", "Dual Task Training", "Multitasking Aufmerksamkeit", "Geteilte Aufmerksamkeit Ubungen", "Psychologische Refraktarperiode", "Kognitiver Engpass Test", "Visuelle Multitasking Ubung", "Aufmerksamkeit Spalten", "Gehirntraining Dual Task", "Konzentrationstest",
    "dual task test online",
    "geteilte aufmerksamkeit aufgaben"],
  openGraph: {
    title: "Geteilte Aufmerksamkeit Test – Dual-Task | SkillDrills",
    description: "Kostenloser Online-Test für geteilte Aufmerksamkeit (Dual-Task): Verfolge visuelle Ziele und klassifiziere Zahlenreihen zur Messung kognitiver Engpässe.",
    type: 'article',
    url: 'https://skilldrills.online/de/drills/cognitive/attention/divided-attention',
    siteName: 'SkillDrills',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Geteilte Aufmerksamkeit Test – Dual-Task | SkillDrills",
    description: "Kostenloser Online-Test für geteilte Aufmerksamkeit (Dual-Task): Verfolge visuelle Ziele und klassifiziere Zahlenreihen zur Messung kognitiver Engpässe.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/cognitive/attention/divided-attention',
    languages: getAlternateLanguages('/drills/cognitive/attention/divided-attention'),
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
      "name": "Kognitives Training",
      "item": "https://skilldrills.online/de/drills/cognitive"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Geteilte Aufmerksamkeit",
      "item": "https://skilldrills.online/de/drills/cognitive/attention/divided-attention"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Geteilte Aufmerksamkeit Dual-Task Trainer",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "description": "Kostenloser Online-Test fur geteilte Aufmerksamkeit (Dual-Task). Verfolge bewegte visuelle Ziele und klassifiziere gleichzeitig Zahlenreihen zur Messung kognitiver Engpasse und Reaktionszeiten.",
  "url": "https://skilldrills.online/de/drills/cognitive/attention/divided-attention",
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
  "name": "Geteilte Aufmerksamkeit Test – Dual-Task Aufmerksamkeits-Drill",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "url": "https://skilldrills.online/de/drills/cognitive/attention/divided-attention",
  "inLanguage": "de-DE",
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Geteilte Aufmerksamkeit – Dual-Task Zielverfolgungs-Spiel",
  "url": "https://skilldrills.online/de/drills/cognitive/attention/divided-attention",
  "description": "Kostenloser Online-Test fur geteilte Aufmerksamkeit (Dual-Task). Verfolge bewegte visuelle Ziele und klassifiziere gleichzeitig Zahlenreihen zur Messung kognitiver Engpasse und Reaktionszeiten.",
  "genre": [
    "Action",
    "Brain Game",
    "Cognitive Training"
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
    "priceCurrency": "EUR"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was versteht man unter geteilter Aufmerksamkeit (Divided Attention)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Fahigkeit, mentale Ressourcen gleichzeitig auf zwei oder mehr unabhangige Informationsquellen zu verteilen und parallel zu verarbeiten."
      }
    },
    {
      "@type": "Question",
      "name": "Was ist die Psychologische Refraktarperiode (PRP, Pashler 1994)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die messbare Verzogerung der zweiten Reaktion, wenn zwei Reize in extrem kurzem Abstand aufeinander folgen, bedingt durch einen zentralen Verarbeitungsengpass."
      }
    },
    {
      "@type": "Question",
      "name": "Was besagt die Multiple-Ressourcen-Theorie (Wickens, 2002)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aufgaben teilen sich Aufmerksamkeit besser, wenn sie unterschiedliche Sinneskanale und Kodes ansprechen (z. B. raumlich-visuell vs. numerisch-verbal)."
      }
    },
    {
      "@type": "Question",
      "name": "Kann man geteilte Aufmerksamkeit trainieren?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Spelke et al. (1976) bewiesen, dass gezieltes Training Teile der Verarbeitung automatisiert und so den zentralen Flaschenhals entlastet."
      }
    },
    {
      "@type": "Question",
      "name": "Welchen Nutzen bringt dies im Alltag und Gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Besseres Situationsbewusstsein beim Autofahren, gleichzeitige Auswertung von Minimap und Fadenkreuz im Gaming sowie hohere Multitasking-Resistenz."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Punktzahl gilt als exzellent?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Uber 15.000 Punkte bei einer Gesamtgenauigkeit von uber 92% entsprechen dem obersten Leistungs-Perzentil."
      }
    },
    {
      "@type": "Question",
      "name": "Wie wirkt sich Ubermudung aus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Schlafmangel verengt die kognitiven Ressourcen drastisch und fuhrt zum volligen Ubersehen peripherer Reize (Tunnelblick)."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Rolle spielt die Hardware-Latenz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein 144Hz-Monitor stellt Bewegungskonturen praziser dar (Woods et al., 2015), was die raumliche Belastung verringert."
      }
    },
    {
      "@type": "Question",
      "name": "Wie oft sollte trainiert werden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "10 bis 15 Minuten taglich reichen vollkommen aus, um kognitive Flexibilitat aufzubauen."
      }
    },
    {
      "@type": "Question",
      "name": "Ist der Test vollstandig kostenlos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, SkillDrills stellt den Drill komplett kostenfrei ohne Registrierung im Webbrowser bereit."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Geteilte Aufmerksamkeit Test",
  "description": "Kostenloser Online-Test fur geteilte Aufmerksamkeit (Dual-Task). Verfolge bewegte visuelle Ziele und klassifiziere gleichzeitig Zahlenreihen zur Messung kognitiver Engpasse und Reaktionszeiten.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Dual-Task-Sitzung starten",
      "text": "Klicken Sie auf Start, um sowohl das visuelle Zielfeld als auch die seitliche Zahlenreihe zu aktivieren.",
      "url": "https://skilldrills.online/de/drills/cognitive/attention/divided-attention#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Bewegte Zielpunkte erfassen",
      "text": "Tippen Sie auf wandernde blaue Zielkreise, bevor deren Timer ablauft, um Zeitboni zu erhalten.",
      "url": "https://skilldrills.online/de/drills/cognitive/attention/divided-attention#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Zahlenreihe simultan klassifizieren",
      "text": "Behalten Sie das Seitenpanel im Blick und klicken Sie bei GERADEN Zahlen sofort auf MATCH.",
      "url": "https://skilldrills.online/de/drills/cognitive/attention/divided-attention#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Balance beider Kanale wahren",
      "text": "Vermeiden Sie Fehlklicks auf beiden Kanalen, um maximale Combo-Multiplikatoren aufzubauen.",
      "url": "https://skilldrills.online/de/drills/cognitive/attention/divided-attention#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('pashler1994', 'wickens2002', 'strayer2001', 'spelke1976', 'woods2015'),
  intro: {
    title: "Geteilte Aufmerksamkeit Test – Dual-Task Aufmerksamkeits-Drill",
    paragraphs: [
      "Kostenloser Online-Test fur geteilte Aufmerksamkeit (Dual-Task). Verfolge bewegte visuelle Ziele und klassifiziere gleichzeitig Zahlenreihen zur Messung kognitiver Engpasse und Reaktionszeiten.",
      "Die messbare Verzogerung der zweiten Reaktion, wenn zwei Reize in extrem kurzem Abstand aufeinander folgen, bedingt durch einen zentralen Verarbeitungsengpass.",
      "Aufgaben teilen sich Aufmerksamkeit besser, wenn sie unterschiedliche Sinneskanale und Kodes ansprechen (z. B. raumlich-visuell vs. numerisch-verbal).",
    ],
  },
  benchmarks: {
    title: 'Standardisierte kognitive Leistungs-Benchmarks',
    headers: ['Leistungsstufe (Tier)', 'Rangbezeichnung (Rank)', 'Leistungsbereich', 'Erreichte Stufe', 'Genauigkeit', 'Perzentil'],
    rows: [
      { tier: 'Tier 1', rank: 'Großmeister / Dual-Task-Elite', stat: 'Top 1%', level: 'Meisterschaft (Mastery)', accuracy: '98%+', percentile: 'Top 1%' },
      { tier: 'Tier 2', rank: 'Fortgeschrittener Multitasker', stat: 'Top 5%', level: 'Diamant (Exzellent)', accuracy: '94–97%', percentile: 'Top 5%' },
      { tier: 'Tier 3', rank: 'Kompetenter Operator', stat: 'Top 15%', level: 'Platin (Kompetent)', accuracy: '88–93%', percentile: 'Top 15%' },
      { tier: 'Tier 4', rank: 'Durchschnittlicher Erwachsener', stat: 'Top 50%', level: 'Gold (Standard)', accuracy: '78–87%', percentile: 'Top 50%' },
      { tier: 'Tier 5', rank: 'Einsteiger-Basislinie', stat: 'Basis', level: 'Silber (Basis)', accuracy: '< 78%', percentile: 'Basislinie' },
    ],
  },
  protocols: {
    title: '4 wissenschaftliche Trainingsprotokolle zur Steigerung der kognitiven Ausdauer',
    description: 'Kognitionspsychologisch fundierte Dual-Task-Protokolle zur Überwindung des zentralen Verarbeitungsengpasses (PRP) und Maximierung der geteilten Aufmerksamkeit.',
    items: [
      { title: "Dual-Task-Sitzung starten", description: "Klicken Sie auf Start, um sowohl das visuelle Zielfeld als auch die seitliche Zahlenreihe zu aktivieren." },
      { title: "Bewegte Zielpunkte erfassen", description: "Tippen Sie auf wandernde blaue Zielkreise, bevor deren Timer ablauft, um Zeitboni zu erhalten." },
      { title: "Zahlenreihe simultan klassifizieren", description: "Behalten Sie das Seitenpanel im Blick und klicken Sie bei GERADEN Zahlen sofort auf MATCH." },
      { title: "Balance beider Kanale wahren", description: "Vermeiden Sie Fehlklicks auf beiden Kanalen, um maximale Combo-Multiplikatoren aufzubauen." },
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

export default function LocalizedCognitivePage() {
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
      <DividedAttentionClient copy={{ title: "Geteilte Aufmerksamkeit Test – Dual-Task Aufmerksamkeits-Drill" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="https://skilldrills.online/de/drills/cognitive/attention/divided-attention" />
      </div>
    </>
  );
}
