import VisualDrillsClient from '@/app/drills/visual/VisualDrillsClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const visualDrills = DRILLS.filter((d) => d.category === 'visual');

export const metadata = {
  title: 'Augentraining & Tiefensehen Test Online | SkillDrills',
  description: 'Visuelles Training online: 9 wissenschaftliche Übungen für dynamische Sehschärfe, räumliches Tiefensehen, Augenfolgebewegung, Lichtreaktion und Suchzeit.',
  keywords: [
    'augentraining online kostenlos', 'tiefensehen test online', 'raumliches sehen test',
    'dynamische sehscharfe trainieren', 'augenfolgebewegung uebungen', 'visuelle reaktionszeit messen',
    'lichtreaktion test online', 'peripheres sehen trainieren', 'blickkontakt stabilisierung',
    'visuelle suche aufmerksamkeit', 'augenmuskeln trainieren computer', 'sehschulung online uebungen',
    'selektive visuelle aufmerksamkeit', 'bewegte objekte verfolgen uebung', 'sports vision training deutsch'
  ],
  openGraph: {
    title: 'Augentraining & Tiefensehen Test Online | SkillDrills',
    description: 'Visuelles Training online: 9 wissenschaftliche Übungen für dynamische Sehschärfe, räumliches Tiefensehen, Augenfolgebewegung, Lichtreaktion und Suchzeit.',
    type: 'website',
    url: 'https://skilldrills.online/de/drills/visual',
    siteName: 'SkillDrills',
    locale: 'de_DE',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Augentraining und visuelle Leistungsübungen auf SkillDrills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Augentraining & Tiefensehen Test Online | SkillDrills',
    description: '9 wissenschaftliche Übungen für dynamische Sehschärfe, Tiefensehen, Lichtreaktion und visuelle Suche im Browser.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/visual',
    languages: getAlternateLanguages('/de/drills/visual'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/de" },
    { "@type": "ListItem", "position": 2, "name": "Leistungsübungen", "item": "https://skilldrills.online/de/drills" },
    { "@type": "ListItem", "position": 3, "name": "Visuelle Wahrnehmung & Tiefensehen", "item": "https://skilldrills.online/de/drills/visual" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Visuelle Wahrnehmung & Augentraining (9 Übungen)",
  "url": "https://skilldrills.online/de/drills/visual",
  "description": "9 interaktive Übungen für dynamische Sehschärfe, stereoskopisches Tiefensehen, Augenfolgebewegung, visuelle Suche und Reaktionszeit.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": visualDrills.map((drill) => {
    const loc = getLocalizedDrill(drill.href, 'de', drill.name);
    return {
      "@type": "WebApplication",
      "name": loc.name,
      "url": `https://skilldrills.online/de${drill.href}`,
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5 Canvas.",
      "description": loc.tagline || drill.description,
    };
  })
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Wie verbessert das Training der dynamischen Sehschärfe (DVA) die Reaktionszeit im Sport und Gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Im Gegensatz zur statischen Sehschärfe auf der Sehtafel erfordert die dynamische Sehschärfe, dass die Fovea centralis die Netzhautabbildung eines sich schnell bewegenden Objekts kontinuierlich stabilisiert. Gezieltes Abfangen und Verfolgen ballistischer Bahnen trainiert die neuromuskuläre Steuerung der sechs äußeren Augenmuskeln, wodurch Trefferquoten bei Ballsportarten und Tracking-Präzision in FPS-Spielen steigen."
      }
    },
    {
      "@type": "Question",
      "name": "Was misst der Tiefensehen-Test basierend auf dem Dreistäbchen-Prinzip?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der Test prüft die stereoskopische Tiefenwahrnehmung anhand der binokularen Querdisparität – dem feinen Winkelunterschied zwischen den Netzhautbildern beider Augen. Die exakte Erkennung, wann sich Stäbe auf gleicher Tiefenebene befinden, ist essenziell für die fehlerfreie Einschätzung von Bremswegen im Straßenverkehr und Distanzpässen im Mannschaftssport."
      }
    },
    {
      "@type": "Question",
      "name": "Warum ist Multiple Object Tracking (MOT) entscheidend für die Erweiterung des peripheren Blickfelds?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MOT-Übungen beanspruchen gezielt die geteilte räumliche Aufmerksamkeit im parietalen Kortex sowie das visuelle Arbeitsgedächtnis. Indem man den Blick zentral fixiert und zeitgleich mehrere unberechenbar wandernde Ziele im peripheren Sichtfeld überwacht, vergrößert sich das nützliche Sehfeld (UFOV) signifikant, was die Übersicht im Spielgeschehen schärft."
      }
    },
    {
      "@type": "Question",
      "name": "Was unterscheidet glatte Augenfolgebewegungen (Smooth Pursuit) von sakkadischen Blicksprüngen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Glatte Augenfolgebewegungen erlauben es dem visuellen System, gleichmäßig gleitenden Objekten unterbrechungsfrei zu folgen, ohne dass das Bild durch abrupte Blicksprünge (Sakkaden) kurzzeitig maskiert wird. Regelmäßiges Folgetraining stärkt die Blickstabilisierung und verhindert, dass bewegte Details verschwimmen."
      }
    },
    {
      "@type": "Question",
      "name": "Worin liegt der wissenschaftliche Unterschied zwischen dem Lichtreaktionstest und normalen Reflextests?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Während klassische Reaktionstests kognitive Auswertungen wie Farberkennung oder semantische Zuordnung beinhalten, isoliert der Lichtreaktionstest die reine visuell-motorische Latenz. Er misst die minimale Zeitspanne von der Phototransduktion in den Photorezeptoren der Retina bis zur ersten elektromechanischen Muskelaktivierung im Zeigefinger."
      }
    },
    {
      "@type": "Question",
      "name": "Welche kognitiven Prozesse stimuliert das Training der visuellen Suche (Visual Search)?`",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Suchaufgaben in dichten Matrizen von Störreizen (Distraktoren) trainieren die parallele Merkmalsintegration im primären visuellen Kortex und die selektive Filterung im dorsolateralen präfrontalen Kortex. Dadurch lernt das Gehirn, irrelevantes visuelles Rauschen zu unterdrücken und zielrelevante Muster in Millisekunden zu lokalisieren."
      }
    },
    {
      "@type": "Question",
      "name": "Wie oft und wie lange sollte man visuelles Augentraining absolvieren?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Empfohlen werden 15 bis 20 Minuten hochkonzentriertes Training, 3 bis 5 Mal pro Woche. Da die visuellen Hirnareale und die Augenmuskeln rasch ermüden, führen Einheiten über 25 Minuten zu visueller Überanstrengung und nachlassenden Lerneffekten. Kurze, regelmäßige Reize erzielen die besten neuroplastischen Anpassungen."
      }
    },
    {
      "@type": "Question",
      "name": "Können browserbasierte Sehtests professionelle augenärztliche Untersuchungen ersetzen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nein, digitale Drills dienen als funktionelles Leistungs- und Koordinationstraining und ersetzen keine klinische Refraktionsbestimmung oder ophthalmologische Diagnostik. Für Athleten und Trainierende bieten sie jedoch eine hocheffektive Methode, um visuelle Wahrnehmungs- und Reaktionsfähigkeiten im Alltag kontinuierlich zu schärfen."
      }
    }
  ]
};

export default function VisualDrillsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <VisualDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}
