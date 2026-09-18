import ConcentrationStaminaClient from '@/app/drills/cognitive/attention/concentration-stamina/ConcentrationStaminaClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Konzentrationstest – Daueraufmerksamkeit | SkillDrills",
  description: "Kostenloser Online-Konzentrationstest (CPT): Teste Daueraufmerksamkeit, Impulskontrolle und kognitive Ausdauer bei dynamischen Regelwechseln direkt im Browser.",
  keywords: ["Konzentrationstest", "Daueraufmerksamkeit Test", "CPT Test Online", "Aufmerksamkeitsspanne Test", "Vigilanztest Online", "Konzentrationsfahigkeit Test", "Impulskontrolle Test", "Gehirntraining Konzentration", "Fokus Test Kostenlos", "Aufmerksamkeitsdefizit Test",
    "konzentrationstest online kostenlos",
    "vigilanz aufmerksamkeit test"],
  openGraph: {
    title: "Konzentrationstest – Daueraufmerksamkeit | SkillDrills",
    description: "Kostenloser Online-Konzentrationstest (CPT): Teste Daueraufmerksamkeit, Impulskontrolle und kognitive Ausdauer bei dynamischen Regelwechseln direkt im Browser.",
    type: 'article',
    url: 'https://skilldrills.online/de/drills/cognitive/attention/concentration-stamina',
    siteName: 'SkillDrills',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Konzentrationstest – Daueraufmerksamkeit | SkillDrills",
    description: "Kostenloser Online-Konzentrationstest (CPT): Teste Daueraufmerksamkeit, Impulskontrolle und kognitive Ausdauer bei dynamischen Regelwechseln direkt im Browser.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/cognitive/attention/concentration-stamina',
    languages: getAlternateLanguages('/drills/cognitive/attention/concentration-stamina'),
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
      "name": "Konzentrationstest",
      "item": "https://skilldrills.online/de/drills/cognitive/attention/concentration-stamina"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Konzentrationstest und Daueraufmerksamkeits-Trainer",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "description": "Kostenloser Online-Konzentrationstest (Continuous Performance Test). Teste deine Daueraufmerksamkeit, Impulskontrolle und kognitive Ausdauer bei dynamischen Regelwechseln.",
  "url": "https://skilldrills.online/de/drills/cognitive/attention/concentration-stamina",
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
  "name": "Konzentrationstest – Daueraufmerksamkeit & CPT Test Online",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "url": "https://skilldrills.online/de/drills/cognitive/attention/concentration-stamina",
  "inLanguage": "de-DE",
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Konzentrationstest – Daueraufmerksamkeits- und Reaktionsspiel",
  "url": "https://skilldrills.online/de/drills/cognitive/attention/concentration-stamina",
  "description": "Kostenloser Online-Konzentrationstest (Continuous Performance Test). Teste deine Daueraufmerksamkeit, Impulskontrolle und kognitive Ausdauer bei dynamischen Regelwechseln.",
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
      "name": "Was ist ein Continuous Performance Test (CPT)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein neuropsychologisches Messverfahren zur Erfassung der Daueraufmerksamkeit (Vigilanz) und inhibitorischen Impulskontrolle uber langere Zeitintervalle."
      }
    },
    {
      "@type": "Question",
      "name": "Was besagt der Mackworth-Vigilanzabfall (1948)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dass die menschliche Signalerkennungsleistung bei monotoner Uberwachung bereits nach 20 bis 30 Minuten drastisch nachlasst."
      }
    },
    {
      "@type": "Question",
      "name": "Warum wechseln die Regeln zwischen Vokalen und Primzahlen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Weil das standige Umschalten alle 10 Sekunden das Arbeitsgedachtnis fordert und task-set inertia (Monsell, 2003) uberwinden muss."
      }
    },
    {
      "@type": "Question",
      "name": "Unterschied zwischen selektiver und Daueraufmerksamkeit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Selektive Aufmerksamkeit blendet Storungen aus (Broadbent, 1958), wahrend Daueraufmerksamkeit die zeitliche Ausdauer dieser Filterfunktion darstellt."
      }
    },
    {
      "@type": "Question",
      "name": "Was bedeuten viele Fehlalarme (False Alarms)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein Hinweis auf unzureichende inhibitorische Kontrolle und impulsive Handlungsmuster (Robertson et al., 1997)."
      }
    },
    {
      "@type": "Question",
      "name": "Kann man mentale Ausdauer trainieren?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, gezielte Vigilanzdrills starken die frontalen Aufmerksamkeitsnetzwerke gegen kognitive Ermudung."
      }
    },
    {
      "@type": "Question",
      "name": "Welchen Einfluss hat korperliche Fitness?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ausdauertraining steigert die zerebrale Durchblutung und erhoht die kognitive Belastbarkeit deutlich."
      }
    },
    {
      "@type": "Question",
      "name": "Hardware-Prazision bei CPT-Tests?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Moderne 144Hz-Displays eliminieren Frame-Jitter (Woods et al., 2015) und sichern exakte millisekundengenaue Erfassung."
      }
    },
    {
      "@type": "Question",
      "name": "Empfohlene Trainingsfrequenz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "10 Minuten vor anspruchsvollen Lern- oder Arbeitsphasen bringen das Gehirn in optimalen Fokus."
      }
    },
    {
      "@type": "Question",
      "name": "Kostet dieser Test etwas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nein, dieser Test ist vollkommen kostenlos und ohne Anmeldung im Webbrowser nutzbar."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Konzentrationstest",
  "description": "Kostenloser Online-Konzentrationstest (Continuous Performance Test). Teste deine Daueraufmerksamkeit, Impulskontrolle und kognitive Ausdauer bei dynamischen Regelwechseln.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Blick zentrieren und Ausgangsregel erfassen",
      "text": "Fixieren Sie die Mitte des Bildschirms und beachten Sie die vorgegebene Regel (Vokale oder Primzahlen).",
      "url": "https://skilldrills.online/de/drills/cognitive/attention/concentration-stamina#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Aufblitzende Reize blitzschnell bewerten",
      "text": "Prufen Sie jeden erscheinenden Buchstaben bzw. jede Ziffer gegen das aktive Kriterium.",
      "url": "https://skilldrills.online/de/drills/cognitive/attention/concentration-stamina#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Prazise reagieren und Fehlimpulse unterdrucken",
      "text": "Tippen Sie nur bei exakter Ubereinstimmung und lassen Sie unpassende Zeichen verstreichen.",
      "url": "https://skilldrills.online/de/drills/cognitive/attention/concentration-stamina#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Blitzschneller Regelwechsel nach 10 Sekunden",
      "text": "Stellen Sie sich sofort auf das neue Kriterium um, ohne in alte Reaktionsmuster zu verfallen.",
      "url": "https://skilldrills.online/de/drills/cognitive/attention/concentration-stamina#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('mackworth1948', 'parasuraman1979', 'robertson1997', 'monsell2003', 'broadbent1958', 'woods2015'),
  intro: {
    title: "Konzentrationstest – Daueraufmerksamkeit & CPT Test Online",
    paragraphs: [
      "Kostenloser Online-Konzentrationstest (Continuous Performance Test). Teste deine Daueraufmerksamkeit, Impulskontrolle und kognitive Ausdauer bei dynamischen Regelwechseln.",
      "Dass die menschliche Signalerkennungsleistung bei monotoner Uberwachung bereits nach 20 bis 30 Minuten drastisch nachlasst.",
      "Weil das standige Umschalten alle 10 Sekunden das Arbeitsgedachtnis fordert und task-set inertia (Monsell, 2003) uberwinden muss.",
    ],
  },
  benchmarks: {
    title: 'Standardisierte kognitive Leistungs-Benchmarks',
    headers: ['Leistungsstufe (Tier)', 'Rangbezeichnung (Rank)', 'Leistungsbereich', 'Erreichte Stufe', 'Genauigkeit', 'Perzentil'],
    rows: [
      { tier: 'Tier 1', rank: 'Großmeister / Kognitive Elite', stat: 'Top 1%', level: 'Meisterschaft (Mastery)', accuracy: '98%+', percentile: 'Top 1%' },
      { tier: 'Tier 2', rank: 'Fortgeschrittener Fokus', stat: 'Top 5%', level: 'Diamant (Exzellent)', accuracy: '94–97%', percentile: 'Top 5%' },
      { tier: 'Tier 3', rank: 'Kompetenter Operator', stat: 'Top 15%', level: 'Platin (Kompetent)', accuracy: '88–93%', percentile: 'Top 15%' },
      { tier: 'Tier 4', rank: 'Durchschnittlicher Erwachsener', stat: 'Top 50%', level: 'Gold (Standard)', accuracy: '78–87%', percentile: 'Top 50%' },
      { tier: 'Tier 5', rank: 'Einsteiger-Basislinie', stat: 'Basis', level: 'Silber (Basis)', accuracy: '< 78%', percentile: 'Basislinie' },
    ],
  },
  protocols: {
    title: '4 wissenschaftliche Trainingsprotokolle zur Steigerung der kognitiven Ausdauer',
    description: 'Neurowissenschaftlich fundierte Trainingsroutinen zur Steigerung von Daueraufmerksamkeit und Impulskontrolle (CPT).',
    items: [
      { title: "Blick zentrieren und Ausgangsregel erfassen", description: "Fixieren Sie die Mitte des Bildschirms und beachten Sie die vorgegebene Regel (Vokale oder Primzahlen)." },
      { title: "Aufblitzende Reize blitzschnell bewerten", description: "Prufen Sie jeden erscheinenden Buchstaben bzw. jede Ziffer gegen das aktive Kriterium." },
      { title: "Prazise reagieren und Fehlimpulse unterdrucken", description: "Tippen Sie nur bei exakter Ubereinstimmung und lassen Sie unpassende Zeichen verstreichen." },
      { title: "Blitzschneller Regelwechsel nach 10 Sekunden", description: "Stellen Sie sich sofort auf das neue Kriterium um, ohne in alte Reaktionsmuster zu verfallen." },
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
      <ConcentrationStaminaClient copy={{ title: "Konzentrationstest – Daueraufmerksamkeit & CPT Test Online" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="https://skilldrills.online/de/drills/cognitive/attention/concentration-stamina" />
      </div>
    </>
  );
}
