import DualTargetFlowClient from '@/app/drills/cognitive/attention/multi-tasking/DualTargetFlowClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Multitasking Test – Dual-Stream Fokus | SkillDrills",
  description: "Kostenloser Online-Multitasking-Test: Verfolge zwei gegenläufige Symbol-Streams gleichzeitig und messe kognitive Belastung und Reaktionszeit im Browser.",
  keywords: ["Multitasking Test", "Dual Stream Tracking", "Multitasking Gehirntraining", "Aufgabenumschaltung Test", "Kognitive Flexibilitat Test", "Geteilte Aufmerksamkeit Uben", "Bilateraler Sehtest", "Multitasking Fahigkeit Test", "Reaktionsschnelligkeit Test", "Exekutive Funktionen Training", "Gehirn Multitasking", "Visuelle Doppelaufgabe"],
  openGraph: {
    title: "Multitasking Test – Dual-Stream Fokus | SkillDrills",
    description: "Kostenloser Online-Multitasking-Test: Verfolge zwei gegenläufige Symbol-Streams gleichzeitig und messe kognitive Belastung und Reaktionszeit im Browser.",
    type: 'article',
    url: 'https://skilldrills.online/de/drills/cognitive/attention/multi-tasking',
    siteName: 'SkillDrills',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Multitasking Test – Dual-Stream Fokus | SkillDrills",
    description: "Kostenloser Online-Multitasking-Test: Verfolge zwei gegenläufige Symbol-Streams gleichzeitig und messe kognitive Belastung und Reaktionszeit im Browser.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/cognitive/attention/multi-tasking',
    languages: getAlternateLanguages('/drills/cognitive/attention/multi-tasking'),
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
      "name": "Multitasking Test",
      "item": "https://skilldrills.online/de/drills/cognitive/attention/multi-tasking"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Multitasking Dual-Stream Aufmerksamkeitstrainer",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "description": "Kostenloser Online-Multitasking-Test. Verfolge zwei gegenlaufige visuelle Symbol-Streams gleichzeitig und teste deine Reaktionsschnelligkeit bei geteilter Aufmerksamkeit.",
  "url": "https://skilldrills.online/de/drills/cognitive/attention/multi-tasking",
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
  "name": "Multitasking Test – Dual-Stream Zielverfolgung & Gehirntraining",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "url": "https://skilldrills.online/de/drills/cognitive/attention/multi-tasking",
  "inLanguage": "de-DE",
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Multitasking Test – Gegenlaufiges Zielverfolgungsspiel",
  "url": "https://skilldrills.online/de/drills/cognitive/attention/multi-tasking",
  "description": "Kostenloser Online-Multitasking-Test. Verfolge zwei gegenlaufige visuelle Symbol-Streams gleichzeitig und teste deine Reaktionsschnelligkeit bei geteilter Aufmerksamkeit.",
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
      "name": "Was trainiert der Multitasking Test (Dual-Target Flow)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die simultane visuelle Uberwachung zweier gegenlaufig stromender Symbolreihen zur Steigerung der bilateralen Hemispharen-Koordination."
      }
    },
    {
      "@type": "Question",
      "name": "Was sind Aufgabenwechselkosten (Switch Costs, 1995)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der messbare Zeit- und Prazisionsverlust beim Umschalten zwischen verschiedenen mentalen Handlungsregeln."
      }
    },
    {
      "@type": "Question",
      "name": "Konnen Menschen wirklich gleichzeitig multitasken?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bei anspruchsvollen kognitiven Entscheidungen nutzt das Gehirn schnelles serielles Time-Sharing statt echter paralleler Verarbeitung (Pashler, 1994)."
      }
    },
    {
      "@type": "Question",
      "name": "Was zeigten Ophir et al. (2009) uber Multitasking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gewohnheitsmassige Multitasker lassen sich oft leichter durch irrelevante Umgebungssignale ablenken."
      }
    },
    {
      "@type": "Question",
      "name": "Welcher Gehirnbereich wird besonders gefordert?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Das Zusammenspiel von Parietallappen und dem Corpus Callosum zur Synchronisierung beider Gesichtsfeldhalften."
      }
    },
    {
      "@type": "Question",
      "name": "Beste Blickstrategie fur hohe Punktzahlen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fokussieren Sie nicht ein einzelnes Band, sondern halten Sie einen weichen Blickkontakt in der Mitte zwischen beiden Streams."
      }
    },
    {
      "@type": "Question",
      "name": "Wie skaliert die Schwierigkeit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Stromungsgeschwindigkeit nimmt zu und die Formen variieren starker, was maximale Reaktionsdisziplin erfordert."
      }
    },
    {
      "@type": "Question",
      "name": "Hardware-Relevanz bei schnellen Streams?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Displays mit 144Hz+ verringern Schlierenbildung bei bewegten Objekten drastisch (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Wie lange sollte eine Trainingseinheit dauern?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "10 bis 15 Minuten pro Tag verhindern kognitive Uberlastung und fordern die synaptische Plastizitat."
      }
    },
    {
      "@type": "Question",
      "name": "Lauft das Tool auf Smartphones?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, der Drill passt sich automatisch an Hochformat (vertikale Streams) und Querformat an."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Multitasking Test",
  "description": "Kostenloser Online-Multitasking-Test. Verfolge zwei gegenlaufige visuelle Symbol-Streams gleichzeitig und teste deine Reaktionsschnelligkeit bei geteilter Aufmerksamkeit.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Blick zentriert ausrichten",
      "text": "Fixieren Sie den Zwischenraum beider Streams fur eine breite periphere Erfassung.",
      "url": "https://skilldrills.online/de/drills/cognitive/attention/multi-tasking#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Zielmuster im HUD einpragen",
      "text": "Merken Sie sich die beiden aktuellen Zielsymbole in der oberen Statusleiste.",
      "url": "https://skilldrills.online/de/drills/cognitive/attention/multi-tasking#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Ubereinstimmende Formen abfangen",
      "text": "Klicken Sie nur auf die wandernden Objekte, die mit den Zielvorlagen ubereinstimmen.",
      "url": "https://skilldrills.online/de/drills/cognitive/attention/multi-tasking#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Gleichmassigen Fluss beibehalten",
      "text": "Halten Sie das Tempo bei steigender Geschwindigkeit harmonisch stabil.",
      "url": "https://skilldrills.online/de/drills/cognitive/attention/multi-tasking#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('rogers1995', 'monsell2003', 'pashler1994', 'wickens2002', 'ophir2009', 'woods2015'),
  intro: {
    title: "Multitasking Test – Dual-Stream Zielverfolgung & Gehirntraining",
    paragraphs: [
      "Kostenloser Online-Multitasking-Test. Verfolge zwei gegenlaufige visuelle Symbol-Streams gleichzeitig und teste deine Reaktionsschnelligkeit bei geteilter Aufmerksamkeit.",
      "Der messbare Zeit- und Prazisionsverlust beim Umschalten zwischen verschiedenen mentalen Handlungsregeln.",
      "Bei anspruchsvollen kognitiven Entscheidungen nutzt das Gehirn schnelles serielles Time-Sharing statt echter paralleler Verarbeitung (Pashler, 1994).",
    ],
  },
  benchmarks: {
    title: 'Standardisierte kognitive Leistungs-Benchmarks',
    headers: ['Leistungsstufe (Tier)', 'Rangbezeichnung (Rank)', 'Leistungsbereich', 'Erreichte Stufe', 'Genauigkeit', 'Perzentil'],
    rows: [
      { tier: 'Tier 1', rank: 'Großmeister / Multitasking-Elite', stat: 'Top 1%', level: 'Meisterschaft (Mastery)', accuracy: '98%+', percentile: 'Top 1%' },
      { tier: 'Tier 2', rank: 'Fortgeschrittener Parallelprozessor', stat: 'Top 5%', level: 'Diamant (Exzellent)', accuracy: '94–97%', percentile: 'Top 5%' },
      { tier: 'Tier 3', rank: 'Kompetenter Operator', stat: 'Top 15%', level: 'Platin (Kompetent)', accuracy: '88–93%', percentile: 'Top 15%' },
      { tier: 'Tier 4', rank: 'Durchschnittlicher Erwachsener', stat: 'Top 50%', level: 'Gold (Standard)', accuracy: '78–87%', percentile: 'Top 50%' },
      { tier: 'Tier 5', rank: 'Einsteiger-Basislinie', stat: 'Basis', level: 'Silber (Basis)', accuracy: '< 78%', percentile: 'Basislinie' },
    ],
  },
  protocols: {
    title: '4 wissenschaftliche Trainingsprotokolle zur Steigerung der kognitiven Ausdauer',
    description: 'Kognitionspsychologisch fundierte Trainingsprotokolle zur Minimierung von Aufgabenwechselkosten (Rogers & Monsell, 1995) und Stärkung der interhemisphärischen Informationsintegration.',
    items: [
      { title: "Blick zentriert ausrichten", description: "Fixieren Sie den Zwischenraum beider Streams fur eine breite periphere Erfassung." },
      { title: "Zielmuster im HUD einpragen", description: "Merken Sie sich die beiden aktuellen Zielsymbole in der oberen Statusleiste." },
      { title: "Ubereinstimmende Formen abfangen", description: "Klicken Sie nur auf die wandernden Objekte, die mit den Zielvorlagen ubereinstimmen." },
      { title: "Gleichmassigen Fluss beibehalten", description: "Halten Sie das Tempo bei steigender Geschwindigkeit harmonisch stabil." },
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
      <DualTargetFlowClient copy={{ title: "Multitasking Test – Dual-Stream Zielverfolgung & Gehirntraining" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="https://skilldrills.online/de/drills/cognitive/attention/multi-tasking" />
      </div>
    </>
  );
}
