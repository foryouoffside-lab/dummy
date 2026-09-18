import MotorDrillsClient from '@/app/drills/motor/MotorDrillsClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const motorDrills = DRILLS.filter((d) => d.category === 'motor');

export const metadata = {
  title: 'Maus-Präzision & CPS Test: Motorik Training | SkillDrills',
  description: 'Kostenloses Motorik- & Klick-Training online. 9 wissenschaftliche Drills für Klickgeschwindigkeit (CPS), ruhige Hand, Tastatur-Speed & Zielgenauigkeit.',
  keywords: [
    'Maus Präzision Test online', 'Aim Trainer kostenlos deutsch', 'CPS Test Klickgeschwindigkeit',
    'Klicks pro Sekunde testen', 'Maus Handzittern Test', 'Tastatur Geschwindigkeitstest online',
    'Tastatur Ghosting Test', 'Tastatur Chattering testen', 'Hand-Auge-Koordination Übungen',
    'Maus Feinkoordination trainieren', 'Jitter Click Test kostenlos', 'Butterfly Click Technik lernen',
    'Heißer Draht Spiel online', 'FPS Maus Genauigkeit verbessern', 'eDPI Rechner Maus Empfindlichkeit'
  ],
  openGraph: {
    title: 'Maus-Präzision & CPS Test: Motorik Training | SkillDrills',
    description: 'Kostenloses Motorik- & Klick-Training online. 9 wissenschaftliche Drills für Klickgeschwindigkeit (CPS), ruhige Hand, Tastatur-Speed & Zielgenauigkeit.',
    type: 'website',
    url: 'https://skilldrills.online/de/drills/motor',
    siteName: 'SkillDrills',
    locale: 'de_DE',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Maus-Präzision und Motorik-Training auf SkillDrills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maus-Präzision & CPS Test: Motorik Training | SkillDrills',
    description: 'Klickgeschwindigkeit (CPS), ruhige Hand, Tastatur-Testing und Aim-Präzision: 9 wissenschaftliche Drills kostenlos im Browser trainieren.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/motor',
    languages: getAlternateLanguages('/de/drills/motor'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/de" },
    { "@type": "ListItem", "position": 2, "name": "Alle Trainingsdrills", "item": "https://skilldrills.online/de/drills" },
    { "@type": "ListItem", "position": 3, "name": "Motorik & Maus-Präzision", "item": "https://skilldrills.online/de/drills/motor" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Maus-Präzision & Motorik-Drills (9 Übungen)",
  "url": "https://skilldrills.online/de/drills/motor",
  "description": "9 interaktive Übungen für Klickgeschwindigkeit (CPS), Aim-Präzision, Tremor-Unterdrückung, Tastatur-Testing und feinmotorische Hand-Auge-Koordination.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": motorDrills.map((drill) => {
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
      "name": "Wie stärken motorische Trainingsdrills die neuronale Hand-Auge-Koordination?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Motorische Drills festigen den sensomotorischen Regelkreis zwischen retinaler Bilderkennung im visuellen Kortex, motorischer Bewegungsplanung im Kleinhirn und präziser Signalübertragung über den primären motorischen Kortex an die Handmuskulatur. Durch hochfrequente Mikrojjustierungen und Feedback-Iterationen wird die neuromuskuläre Latenzzeit minimiert, wodurch Reaktionsbewegungen unter 180 ms präzise ausgeführt werden können."
      }
    },
    {
      "@type": "Question",
      "name": "Wie hoch ist ein durchschnittlicher CPS-Wert und welche Klicktechniken gibt es?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Beim normalen Einzelfinger-Klicken liegt die durchschnittliche Klickgeschwindigkeit bei 6 bis 8 Klicks pro Sekunde (CPS). Im E-Sport und Gaming kommen spezialisierte Techniken zum Einsatz: Jitter-Clicking (bewusst erzeugte Muskelvibration im Unterarm, 10–14 CPS) und Butterfly-Clicking (abwechselndes Anschlagen mit zwei Fingern, 15–22 CPS). Zur Vermeidung von Sehnenscheidenentzündungen empfiehlt sich ein kontrolliertes, entspanntes Klicktraining mit Pausen."
      }
    },
    {
      "@type": "Question",
      "name": "Wie eliminieren Pfadverfolgung und ruhige Hand-Übungen das gefürchtete Maus-Zittern?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ungewolltes Überschießen (Overshooting) und feines Handzittern entstehen meist durch eine unzureichende Bremskraft der antagonistischen Muskelgruppen. Schmale Korridor-Übungen ('Heißer Draht') und Wellen-Tracing zwingen zu subpixelgenauer Cursorführung. Dadurch werden die stabilisierenden Muskelfasern in Handgelenk und Unterarm gestärkt, was unwillkürliche Mikrotremore spürbar dämpft."
      }
    },
    {
      "@type": "Question",
      "name": "Was besagt das Fitts'sche Gesetz (Fitts's Law) für Geschwindigkeit und Zielgenauigkeit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Das Fitts'sche Gesetz besagt, dass die für eine Zielbewegung benötigte Zeit logarithmisch vom Verhältnis zwischen Distanz und Zielbreite abhängt (MT = a + b * log2(2D/W)). Präzise Zielerfassung gliedert sich in eine ballistische Anfangsphase (schnelles Überbrücken von 80–90 % der Strecke) und eine visuell kontrollierte Korrekturphase zum exakten Einloggen ins Zentrum ohne Geschwindigkeitsverlust."
      }
    },
    {
      "@type": "Question",
      "name": "Warum ist die Unabhängigkeit einzelner Finger für Tastaturgeschwindigkeit entscheidend?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Anatomisch teilen sich Ring- und kleiner Finger gemeinsame Sehnenstränge, was eine unabhängige Ansteuerung erschwert. Gezieltes Tastatur-Geschwindigkeitstraining differenziert die kortikalen motorischen Repräsentationen der einzelnen Finger. Dadurch verringern sich Umschaltverzögerungen und Tastenklemmer bei hohen Anschlagzahlen (APM) in dynamischen Spielsituationen."
      }
    },
    {
      "@type": "Question",
      "name": "Wie zuverlässig und genau sind browserbasierte Maus- und Tastaturtests?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SkillDrills nutzt moderne Web-APIs wie performance.now() mit einer Sub-Millisekunden-Auflösung von 0,1 ms. Die Messgrenzen werden primär durch die Hardware bestimmt: die Bildwiederholrate des Monitors (z. B. ~4,1 ms bei 240 Hz) und die Abfragerate (Polling-Rate) der Maus oder Tastatur (1 ms bei 1000 Hz). Die Genauigkeit reicht vollkommen aus, um zuverlässige Benchmark-Vergleiche und Hardwaretests durchzuführen."
      }
    },
    {
      "@type": "Question",
      "name": "Welchen Einfluss haben DPI, In-Game-Sensitivität und eDPI auf das Muskelgedächtnis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die effektive Sensitivität (eDPI = DPI * Sensor-Multiplikator) entscheidet, ob primär die Feinmotorik aus den Fingern und dem Handgelenk oder die Grobmotorik aus Unterarm und Schulter beansprucht wird. High-Sensitivität ermöglicht schnelle Drehungen bei höherem Tremor-Risiko, während Low-Sensitivität gleichmäßigere Flugbahnen garantiert. Ein konsistenter eDPI-Wert ist essenziell, damit das Kleinhirn verlässliche interne Bewegungsmuster verankern kann."
      }
    },
    {
      "@type": "Question",
      "name": "Was bedeuten Tastatur-Chattering und Ghosting für die Eingabepräzision?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chattering bezeichnet einen mechanischen Prellfehler der Tastenkontakte, bei dem ein einzelner Tastenanschlag fälschlich mehrfach registriert wird. Ghosting tritt auf, wenn durch Matrix-Fehlschaltungen nicht gedrückte Tasten ausgelöst oder gleichzeitige Eingaben verschluckt werden. Unser integrierter Tastaturtester prüft N-Key-Rollover (NKRO) und Prellstabilität in Echtzeit, um Hardwarefehler zuverlässig aufzudecken."
      }
    }
  ]
};

export default function GermanMotorHubPage() {
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
      <MotorDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}

