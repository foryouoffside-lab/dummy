import PhysicalDrillsClient from '@/app/drills/physical/PhysicalDrillsClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const physicalDrills = DRILLS.filter((d) => d.category === 'physical');

export const metadata = {
  title: 'Agility Training & Reflexe Testen (11 Drills) | SkillDrills',
  description: 'Agility- & Reflextraining online: 11 wissenschaftliche Drills für Reaktionszeit, Gleichgewicht, Hand-Auge-Koordination, Ausweichen und Beinarbeit.',
  keywords: [
    'Reaktionstest Online kostenlos', 'Reflexe trainieren Übungen', 'Hand-Auge-Koordination Übungen',
    'Gleichgewichtstraining Online', 'Koordinationsleiter Übungen Online', 'Ausweichspiel online kostenlos',
    'Peripheres Sehen trainieren', 'Go-No-Go Test online', 'Maus Stabilitätstest',
    'Linealtest Reaktionszeit', 'Reaktionszeit verbessern Gaming', 'Schnelligkeitstraining Beinarbeit',
    'Motorische Fähigkeiten trainieren', 'Körperliche Koordination Übungen', 'Browser Geschicklichkeitsspiel'
  ],
  openGraph: {
    title: 'Agility Training & Reflexe Testen (11 Drills) | SkillDrills',
    description: 'Agility- & Reflextraining online: 11 wissenschaftliche Drills für Reaktionszeit, Gleichgewicht, Hand-Auge-Koordination, Ausweichen und Beinarbeit.',
    type: 'website',
    url: 'https://skilldrills.online/de/drills/physical',
    siteName: 'SkillDrills',
    locale: 'de_DE',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Agility Training und Physische Reflexe auf SkillDrills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agility Training & Reflexe Testen (11 Drills) | SkillDrills',
    description: '11 wissenschaftliche Drills für Reaktionszeit, Gleichgewicht, Ausweichen und Hand-Auge-Koordination kostenlos im Browser.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/physical',
    languages: getAlternateLanguages('/de/drills/physical'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/de" },
    { "@type": "ListItem", "position": 2, "name": "Alle Leistungstests", "item": "https://skilldrills.online/de/drills" },
    { "@type": "ListItem", "position": 3, "name": "Physische Reflexe & Agility", "item": "https://skilldrills.online/de/drills/physical" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Agility- & Reflextraining Online (11 Übungen)",
  "url": "https://skilldrills.online/de/drills/physical",
  "description": "11 wissenschaftliche Online-Übungen für Reaktionsschnelligkeit, Gleichgewicht, Hand-Auge-Koordination, Ausweichen und Beinarbeit.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": physicalDrills.map((drill) => {
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
      "name": "Wie überträgt sich computergestütztes Koordinationsleiter-Training auf echte Beinarbeit und Athletik?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Digitale Koordinationsleiter-Drills schulen die Hochgeschwindigkeits-Mustererkennung und Rhythmissynchronisation im visuellen Kortex. Indem das Gehirn darauf trainiert wird, millisekundengenaue Bewegungsentscheidungen synchron zu visuellen Cues zu treffen, beschleunigt der motorische Kortex die neuronale Reizleitung. Dies verkürzt die Bodenkontaktzeit und optimiert Richtungswechsel (Change-of-Direction, COD) in Sportarten wie Fußball, Basketball oder Tennis."
      }
    },
    {
      "@type": "Question",
      "name": "Was ist eine Reaktionskette mit Impulskontrolle und wie verhindert sie Überreaktionen (Over-Committing)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein Impuls-Stopp-Test misst die neuromuskuläre Fähigkeit, eine bereits eingeleitete Bewegung bei plötzlichem Auftreten von Täuschungssignalen (Finten) abrupt abzubrechen. Das Training inhibitorischer Schaltkreise in den Basalganglien und im präfrontalen Kortex ermöglicht es Athleten, Vorwärtsimpulse in unter 150 Millisekunden zu stoppen und Finten des Gegners souverän zu neutralisieren."
      }
    },
    {
      "@type": "Question",
      "name": "Wie verbessert das virtuelle Gleichgewichtstraining (Widerstand gegen Kraftvektoren) die physische Stabilität?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dynamisches Gleichgewicht basiert auf der sensorischen Integration von visuellem Blickfeld, vestibulärem System im Innenohr und propriozeptiven Rezeptoren in Muskeln und Gelenken. Das Ausbalancieren des Cursors gegen dynamische Kraftvektoren trainiert das ZNS darin, mikromotorische Gegenkräfte in Echtzeit zu berechnen und posturale Stabilisatoren reflexartig zu aktivieren."
      }
    },
    {
      "@type": "Question",
      "name": "Warum sind diagonale Überkreuzbewegungen (Cross-Body Movement) für die koordinative Leistungsfähigkeit essenziell?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bewegungen über die Körpermittellinie hinweg erfordern den permanenten Informationsaustausch zwischen linker und rechter Gehirnhälfte über das Corpus Callosum. Multidirektionale Abfangdrills synchronisieren diagonale kinetische Ketten, was die Rotationskraft, Agilität und dreidimensionale Raumwahrnehmung signifikant steigert."
      }
    },
    {
      "@type": "Question",
      "name": "Wie verkürzen dynamische 3x3-Gitter-Ausweichdrills die reale Ausweichreaktionszeit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Im Gegensatz zu statischen Reaktionsprüfungen erfordern chaotisch kreuzende Gefahrenzonen eine kontinuierliche Aktualisierung der räumlichen Umgebung im Parietallappen. Dies senkt die Wahlreaktionszeit (Choice Reaction Time) unter Zeitdruck von durchschnittlich 280 ms auf unter 190 ms."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Rolle spielt peripheres Sehtraining bei der Antizipation von Gefahren und der Verletzungsprävention?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Das Training mit peripheren Bedrohungsscannern erweitert das funktionelle Sehfeld (FFOV: Functional Field of View). Reize im äußeren Gesichtsfeld stimulieren die magnozelluläre Sehbahnen, wodurch reflexartige Ausweichbewegungen ausgelöst werden, ohne dass die Augen das Ziel direkt fixieren müssen – ein entscheidender Faktor zur Vermeidung von Zusammenstößen im Mannschaftssport."
      }
    },
    {
      "@type": "Question",
      "name": "Was ist der optimale Trainingsumfang für Agility- und Reflextraining?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Empfohlen werden hochkonzentrierte Einheiten von 15 bis 25 Minuten, 3 bis 5 Mal pro Woche. Da neuromuskuläre Präzision hohe synaptische Energiereserven erfordert, führt ein Training über 30 Minuten hinaus zu Ermüdung des zentralen Nervensystems (ZNS), was die Reaktionsmechanik verfälscht und den Trainingseffekt mindert."
      }
    },
    {
      "@type": "Question",
      "name": "Können browserbasierte Reaktionsdrills das reale Training auf dem Sportplatz oder im Fitnessstudio ergänzen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Digitale Drills ersetzen zwar kein Kraft- oder Schnellkrafttraining, sie isolieren und optimieren jedoch gezielt die perzeptiv-kognitive Phase von Bewegungsabläufen. Durch die Beschleunigung von Sehreiz-Erkennung, Situationsanalyse und Muskelbefehlsübertragung wird die vorhandene Muskelkraft auf dem Spielfeld verzögerungsfrei und mit maximaler Effizienz umgesetzt."
      }
    }
  ]
};

export default function PhysicalDrillsPage() {
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
      <PhysicalDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}
