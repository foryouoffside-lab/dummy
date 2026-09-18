import RSVPReaderClient from '@/app/drills/cognitive/processing-speed/rsvp-reader/RSVPReaderClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Schnelllesetest RSVP – Lesegeschwindigkeit | SkillDrills",
  description: "Kostenloser RSVP-Schnelllesetest: Trainiere Wortverarbeitung bis 850 WPM ohne Sakkaden durch serielle optische Textprasentation direkt im Browser.",
  keywords: ["Schnelllesetest RSVP", "Lesegeschwindigkeit Test WPM", "RSVP Speed Reader", "Speed Reading Online Kostenlos", "Worter pro Minute Test", "Optimal Recognition Point ORP", "Kognitive Lesegeschwindigkeit", "Augenbewegungen Reduzieren", "Schneller Lesen Trainieren", "WPM Rechner",
    "rsvp speed reader deutsch",
    "lesetest online kostenlos"],
  openGraph: {
    title: "Schnelllesetest RSVP – Lesegeschwindigkeit | SkillDrills",
    description: "Kostenloser RSVP-Schnelllesetest: Trainiere Wortverarbeitung bis 850 WPM ohne Sakkaden durch serielle optische Textprasentation direkt im Browser.",
    type: 'article',
    url: 'https://skilldrills.online/de/drills/cognitive/processing-speed/rsvp-reader',
    siteName: 'SkillDrills',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Schnelllesetest RSVP – Lesegeschwindigkeit | SkillDrills",
    description: "Kostenloser RSVP-Schnelllesetest: Trainiere Wortverarbeitung bis 850 WPM ohne Sakkaden durch serielle optische Textprasentation direkt im Browser.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/cognitive/processing-speed/rsvp-reader',
    languages: getAlternateLanguages('/drills/cognitive/processing-speed/rsvp-reader'),
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
      "name": "RSVP Schnelllesetest",
      "item": "https://skilldrills.online/de/drills/cognitive/processing-speed/rsvp-reader"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "RSVP Schnelllesetest und WPM-Geschwindigkeitsmesser",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "description": "Kostenloser RSVP-Schnelllesetest. Trainiere Wortverarbeitungsgeschwindigkeiten bis 850 WPM ohne Sakkaden durch serielle optische Textprasentation (Optimal Recognition Point).",
  "url": "https://skilldrills.online/de/drills/cognitive/processing-speed/rsvp-reader",
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
  "name": "Schnelllesetest RSVP – Lesegeschwindigkeit Test WPM",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "url": "https://skilldrills.online/de/drills/cognitive/processing-speed/rsvp-reader",
  "inLanguage": "de-DE",
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "RSVP Schnelllesetest – High-Speed Wortprasentationsspiel",
  "url": "https://skilldrills.online/de/drills/cognitive/processing-speed/rsvp-reader",
  "description": "Kostenloser RSVP-Schnelllesetest. Trainiere Wortverarbeitungsgeschwindigkeiten bis 850 WPM ohne Sakkaden durch serielle optische Textprasentation (Optimal Recognition Point).",
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
      "name": "Was ist RSVP (Rapid Serial Visual Presentation)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein Verfahren, bei dem Worter nacheinander an einem festen Bildschirmpunkt aufblitzen, wodurch Blicksprunge (Sakkaden) vollstandig entfallen."
      }
    },
    {
      "@type": "Question",
      "name": "Was ist der Optimal Recognition Point (ORP)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die optimale Fixationsstelle innerhalb eines Wortes, an der das visuelle System das Wort am schnellsten decodiert (Rayner, 1998)."
      }
    },
    {
      "@type": "Question",
      "name": "Warum lesen die meisten Menschen langsam?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bis zu 80 % der Lesezeit gehen fur Sakkaden und unbewusste Ruckspul-Blicksprunge (Regressionen) verloren (Rayner, 2016)."
      }
    },
    {
      "@type": "Question",
      "name": "Was ist die durchschnittliche Lesegeschwindigkeit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Erwachsene lesen durchschnittlich 200–250 Worter pro Minute (WPM). Mit Training sind 400–600 WPM realistisch."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Geschwindigkeitsstufen gibt es?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Level 1 (250 WPM) bis hin zu Spitzenwerten in Level 5 (850 WPM)."
      }
    },
    {
      "@type": "Question",
      "name": "Warum muss man Zielworter bestatigen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Um sicherzustellen, dass die Worter kognitiv erfasst und nicht nur passiv ubersehen werden."
      }
    },
    {
      "@type": "Question",
      "name": "Fordert RSVP die Denkgeschwindigkeit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, es trainiert die schnelle lexikalische Entschlusselung im visuellen Wortformareal."
      }
    },
    {
      "@type": "Question",
      "name": "Einfluss der Bildwiederholrate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Monitore mit 144Hz sichern prazise Frame-Intervalle ohne Bildflackern (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Fur wen eignet sich das Training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fur Studenten, Forscher, Viel-Leser und Gamer, die Textnachrichten in Sekundenschnelle erfassen wollen."
      }
    },
    {
      "@type": "Question",
      "name": "Ist das Tool kostenlos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, SkillDrills stellt diesen Schnelllesetest vollig kostenfrei im Browser zur Verfugung."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Schnelllesetest RSVP",
  "description": "Kostenloser RSVP-Schnelllesetest. Trainiere Wortverarbeitungsgeschwindigkeiten bis 850 WPM ohne Sakkaden durch serielle optische Textprasentation (Optimal Recognition Point).",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Zielwort in der Anzeige einpragen",
      "text": "Merken Sie sich das oben eingeblendete gesuchte Zielwort.",
      "url": "https://skilldrills.online/de/drills/cognitive/processing-speed/rsvp-reader#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Fokussierung auf den roten ORP-Mittelpunkt",
      "text": "Halten Sie den Blick starr auf dem farblich markierten Ankerbuchstaben.",
      "url": "https://skilldrills.online/de/drills/cognitive/processing-speed/rsvp-reader#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "High-Speed-Wortstrom erfassen",
      "text": "Nehmen Sie die voruberziehenden Worter ohne Augenbewegungen flussig auf.",
      "url": "https://skilldrills.online/de/drills/cognitive/processing-speed/rsvp-reader#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Rechtzeitiger Klick bei Zielwort-Erscheinen",
      "text": "Tippen Sie sofort auf TARGET DETECTED, wenn das Wort im Fokus aufleuchtet.",
      "url": "https://skilldrills.online/de/drills/cognitive/processing-speed/rsvp-reader#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('rayner1998', 'rayner2016', 'woods2015'),
  intro: {
    title: "Schnelllesetest RSVP – Lesegeschwindigkeit Test WPM",
    paragraphs: [
      "Kostenloser RSVP-Schnelllesetest. Trainiere Wortverarbeitungsgeschwindigkeiten bis 850 WPM ohne Sakkaden durch serielle optische Textprasentation (Optimal Recognition Point).",
      "Die optimale Fixationsstelle innerhalb eines Wortes, an der das visuelle System das Wort am schnellsten decodiert (Rayner, 1998).",
      "Bis zu 80 % der Lesezeit gehen fur Sakkaden und unbewusste Ruckspul-Blicksprunge (Regressionen) verloren (Rayner, 2016).",
    ],
  },
  benchmarks: {
    title: 'Standardisierte kognitive Leistungs-Benchmarks',
    headers: ['Leistungsstufe (Tier)', 'Rangbezeichnung (Rank)', 'Leistungsbereich', 'Erreichte Stufe', 'Genauigkeit', 'Perzentil'],
    rows: [
      { tier: 'Tier 1', rank: 'Großmeister / Elite-Textverarbeiter', stat: 'Top 1%', level: 'Meisterschaft (Mastery)', accuracy: '98%+', percentile: 'Top 1%' },
      { tier: 'Tier 2', rank: 'Fortgeschrittener Schnellleser', stat: 'Top 5%', level: 'Diamant (Exzellent)', accuracy: '94–97%', percentile: 'Top 5%' },
      { tier: 'Tier 3', rank: 'Kompetenter Informationserfasser', stat: 'Top 15%', level: 'Platin (Kompetent)', accuracy: '88–93%', percentile: 'Top 15%' },
      { tier: 'Tier 4', rank: 'Durchschnittlicher Erwachsener', stat: 'Top 50%', level: 'Gold (Standard)', accuracy: '78–87%', percentile: 'Top 50%' },
      { tier: 'Tier 5', rank: 'Einsteiger-Basislinie', stat: 'Basis', level: 'Silber (Basis)', accuracy: '< 78%', percentile: 'Basislinie' },
    ],
  },
  protocols: {
    title: '4 wissenschaftliche Trainingsprotokolle zur Steigerung der kognitiven Ausdauer',
    description: 'Wissenschaftlich fundiertes RSVP-Schnelllesetraining zur Fixierung des optimalen Erkennungspunkts (ORP, Rayner, 1998) und Eliminierung sakkadischer Blickbewegungsverluste für maximale visuelle Wortverarbeitungsgeschwindigkeit.',
    items: [
      { title: "Zielwort in der Anzeige einpragen", description: "Merken Sie sich das oben eingeblendete gesuchte Zielwort." },
      { title: "Fokussierung auf den roten ORP-Mittelpunkt", description: "Halten Sie den Blick starr auf dem farblich markierten Ankerbuchstaben." },
      { title: "High-Speed-Wortstrom erfassen", description: "Nehmen Sie die voruberziehenden Worter ohne Augenbewegungen flussig auf." },
      { title: "Rechtzeitiger Klick bei Zielwort-Erscheinen", description: "Tippen Sie sofort auf TARGET DETECTED, wenn das Wort im Fokus aufleuchtet." },
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
      <RSVPReaderClient copy={{ title: "Schnelllesetest RSVP – Lesegeschwindigkeit Test WPM" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="https://skilldrills.online/de/drills/cognitive/processing-speed/rsvp-reader" />
      </div>
    </>
  );
}
