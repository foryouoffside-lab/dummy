import ReflexTrainingDrillWrapper from '@/app/drills/reaction-speed/reflex-training-drill/ReflexTrainingDrillWrapperLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — de-DE (reaction-speed / reflex-training-drill)
// PRIMARY DOMESTIC: "reflex test"       — 31 exact / 35 broad searches/mo
//                    "reaktionstest"     — 476 exact / 550 broad searches/mo
// SECONDARY / LSI:
//                    "reaktionsspiel"    — Gaming intent
//                    "reflexe trainieren"— Training intent
//                    "reflexe testen"    — Testing intent
// WINNER TITLE:      Reflex-Training & Reaktionsspiel – Multi-Target Reflex-Test | SkillDrills
// ============================================================

export const metadata = {
  title: 'Reflextraining Online – Reflexe trainieren | SkillDrills',
  description:
    'Kostenloses Reflex-Training online. Reagiere auf simultane Ziel-Bursts, schärfe geteilte Aufmerksamkeit und steigere deine Reaktionszeit im Browser.',
  keywords: [
    'reflextraining online',
    'reaktionsspiel',
    'reflextest',
    'reaktionszeit trainieren',
    'reflexe verbessern',
    'zielerfassung trainieren',
    'gaming reflexe',
    'reaktionstest',
    'geteilte aufmerksamkeit',
    'reflexe trainieren',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/reaction-speed/reflex-training-drill',
    languages: getAlternateLanguages('/drills/reaction-speed/reflex-training-drill'),
  },
  openGraph: {
    title: 'Reflex-Training & Reaktionsspiel – Multi-Target Reflex-Test | SkillDrills',
    description:
      'Kostenloses Reflex-Training und Reaktionsspiel online. Reagieren Sie blitzschnell auf mehrere gleichzeitige Ziele im Browser.',
    url: 'https://skilldrills.online/de/drills/reaction-speed/reflex-training-drill',
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reflex-Training & Reaktionsspiel – Multi-Target Reflex-Test | SkillDrills',
    description:
      'Trainieren Sie Reflexe und geteilte Aufmerksamkeit kostenlos online im Browser.',
  },
  robots: { index: true, follow: true },
};

// --- Structured Data Schemas ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills Startseite', item: 'https://skilldrills.online/de' },
    { '@type': 'ListItem', position: 2, name: 'Drills Übersicht', item: 'https://skilldrills.online/de/drills' },
    { '@type': 'ListItem', position: 3, name: 'Reaktionsschnelligkeit', item: 'https://skilldrills.online/de/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'Reflex-Training & Reaktionsspiel', item: 'https://skilldrills.online/de/drills/reaction-speed/reflex-training-drill' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Reflex-Training & Reaktionsspiel – Multi-Target Reflex-Test',
  alternateName: ['Reflex-Training', 'Reaktionsspiel Online', 'Multi-Target Reflex Trainer', 'Reflexspiel'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description:
    'Interaktives Online-Werkzeug zur Steigerung der visuellen Reaktionsgeschwindigkeit und geteilten Aufmerksamkeit bei simultan auftretenden Zielen.',
  browserRequirements: 'Moderner Webbrowser mit JavaScript-Unterstützung (Chrome, Firefox, Safari, Edge)',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Reflex-Training & Reaktionsspiel — Multi-Target Reflex-Test | SkillDrills',
  url: 'https://skilldrills.online/de/drills/reaction-speed/reflex-training-drill',
  description:
    'Kostenloses Reaktionsspiel zum Training von Reflexen und geteilter Aufmerksamkeit im Browser.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'Erfordert einen modernen Webbrowser mit JavaScript.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: 'Reflexe, Reaktionszeit, Geteilte Aufmerksamkeit, Sakkadische Augenbewegungen',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Reflex-Training - Multi-Target Burst Reaktionsspiel',
  url: 'https://skilldrills.online/de/drills/reaction-speed/reflex-training-drill',
  description: 'Reflex-Training - Multi-Target Burst Reaktionsspiel',
  genre: ['Reflex Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Anleitung: Multi-Target Reflexe trainieren',
  description: 'So schulen Sie Ihre Reaktionsgeschwindigkeit bei mehreren gleichzeitigen Zielen.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Drill starten',
      text: 'Klicken Sie auf «Drill starten», um das Vollbild-Trainingsfeld zu aktivieren.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/reflex-training-drill#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Ziele blitzschnell erfassen',
      text: 'Erfassen Sie alle gleichzeitig aufblitzenden Zielscheiben und deren Countdown-Ringe im peripheren Blickfeld.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/reflex-training-drill#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Priorisiert klicken',
      text: 'Klicken Sie die Ziele an, deren Zeitring am schnellsten abläuft, bevor sie verblassen.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/reflex-training-drill#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Combo halten & aufsteigen',
      text: 'Treffen Sie Ziele fehlerfrei in Serie, um mehr Bonuszeit und höhere Combo-Multiplikatoren freizuschalten.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/reflex-training-drill#step-4'
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-11',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Was ist ein Multi-Target Reflex-Training?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Es ist ein interaktives Training, bei dem mehrere Ziele gleichzeitig im Sichtfeld erscheinen und in Sekundenbruchteilen vor ihrem Ablauf präzise angeklickt werden müssen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Lässt sich die Reaktionsfähigkeit auf mehrere Reize verbessern?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Zwar ist die Leitgeschwindigkeit peripherer Nerven weitgehend biologisch vorgegeben, aber die zentrale Wahlreaktionszeit (Reizerkennung und Entscheidung) lässt sich durch regelmäßiges Training um 20 bis 30 % beschleunigen (Donders, 1868).',
      },
    },
    {
      '@type': 'Question',
      name: 'Was besagt das Hicksche Gesetz (Hick\'s Law)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Das Hick-Hyman-Gesetz besagt, dass die Reaktionszeit logarithmisch mit der Anzahl möglicher Entscheidungen ansteigt (RT = a + b * log2(n + 1)). Durch Training lernt das Gehirn, Zielcluster als Einheit zu verarbeiten und die Wahlverzögerung zu minimieren.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was versteht man unter geteilter Aufmerksamkeit im Gaming?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die Fähigkeit, mehrere visuelle Brennpunkte parallel im Blickfeld zu überwachen, ohne in einen Tunnelblick zu verfallen. Entscheidend für das Erkennen von Flankierungen in Taktik-Shootern.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Strategie ist beim Anklicken am effektivsten?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ziele mit der kürzesten verbleibenden Ablaufzeit priorisieren und eine zusammenhängende Weglinie (Bogen oder Linie) abfahren, anstatt kreuz und quer über den Bildschirm zu springen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welchen Vorteil bringt ein 144Hz oder 240Hz Monitor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Höhere Bildwiederholraten reduzieren die Anzeigelatenz von 16,7 ms (60 Hz) auf bis zu 4,2 ms (240 Hz), wodurch Ziele flüssiger und messbar früher sichtbar werden (Woods et al., 2015).',
      },
    },
    {
      '@type': 'Question',
      name: 'Funktioniert dieses Spiel auch auf Mobilgeräten?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, es ist für Touchscreens optimiert. Im Querformat steht Ihnen ein breiteres Sichtfeld zur Verfügung.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie viel Training pro Tag ist optimal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Täglich 10 bis 15 Minuten konzentriertes Training reichen völlig aus, um neuromuskuläre Anpassungen ohne Übermüdung zu fördern.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was ist der Unterschied zwischen einfacher und Wahlreaktionszeit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Einfache Reaktionszeit misst einen einzigen bekannten Reiz (~200–250 ms), während Wahlreaktionszeit zusätzliche kognitive Bewertung erfordert (Donders, 1868).',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Rolle spielt die Maus-Polling-Rate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Eine Polling-Rate von 1000 Hz meldet Positionsänderungen jede Millisekunde an den PC und minimiert Eingabelatenzen.',
      },
    },
  ],
};
const reflexDrillGuide = {
  heading: 'Reflex-Training Leitfaden: Multi-Target Erfassung & Geteilte Aufmerksamkeit',
  intro: [
    'Das Reflex-Training schlägt die Brücke zwischen der einfachen Reaktionszeit (Reaktion auf einen einzelnen Reiz) und der komplexen Wahlreaktion in hektischen Spielsituationen.',
    'In Wettkampfspielen wie CS2, Valorant oder Apex Legends stehen Ihnen selten isolierte Einzelreize gegenüber. Häufig tauchen mehrere Kontrahenten zeitgleich auf, was rasche Prioritätensetzung und präzise Zielwechsel erfordert.',
    'Wissenschaftliche Grundlagen: Nach Donders (1868) erfordert die Wahlreaktion (Typ B) zusätzliche Reizunterscheidung und motorische Vorbereitung. Das Hick-Hyman-Gesetz (Hick, 1952) beschreibt den logarithmischen Anstieg der Entscheidungszeit bei mehreren Zielen.',
    'Präzise Technik: Der Drill läuft direkt clientseitig im Browser unter Nutzung von performance.now() mit Sub-Millisekunden-Genauigkeit (Woods et al., 2015).',
  ],
  benchmarks: {
    title: 'Referenztabelle: Multi-Target Verarbeitungsgeschwindigkeit',
    headers: ['Durchschn. Zeit pro Ziel', 'Leistungsstufe', 'Entscheidungslatenz', 'Kognitives Profil', 'Empfohlener Trainingsfokus'],
    rows: [
      ['< 250 ms / Ziel', 'Apex / Pro', 'Minimalste Auswahllatenz', 'Blitzschnelle Clustererfassung und präzise Sakkaden', 'Höchste Zieldichte beibehalten'],
      ['250 – 320 ms / Ziel', 'Elite', 'Kompakte Entscheidungszeit', 'Schnelle Priorisierung und sichere Zielübergänge', 'Klickpause (Dwell Time) reduzieren'],
      ['321 – 400 ms / Ziel', 'Fortgeschritten', 'Normale Wahlreaktionszeit', 'Sichere Treffer mit leichten Verzögerungen am Rand', 'Peripheres Sichtfeld aktiv einbinden'],
      ['401 – 500 ms / Ziel', 'Mittelstufe', 'Erhöhte kognitive Last', 'Solide Einzelreflexe, kurzes Zögern bei dichten Clustern', 'Fokus auf Countdown-Ringe richten'],
      ['> 500 ms / Ziel', 'Aufbauend', 'Hohe Entscheidungsverzögerung', 'Suchbewegungen und Zögern dominieren', 'Saubere geometrische Mauslinien üben'],
    ],
    note: 'Werte basieren auf neurowissenschaftlicher Chronometrie-Literatur (Donders, 1868; Hick, 1952).',
  },
  techniques: {
    title: 'Techniken zur Optimierung der Reflexgeschwindigkeit',
    items: [
      {
        name: 'Triage & Kürzeste Wegstrecke',
        desc: 'Nicht wahllos klicken, sondern die Ziele mit ablaufender Lebensdauer in einer logischen Linie oder einem Bogen abarbeiten.',
        tips: 'Das Zielmuster als zusammenhängende geometrische Form betrachten.',
      },
      {
        name: 'Periphere Zielregistrierung',
        desc: 'Während das Auge das aktuelle Ziel anklickt, nimmt die periphere Netzhaut bereits den nächsten Lichtimpuls auf.',
        tips: 'Den Blickpunkt zwischen den Zielen ruhen lassen, nicht dem Cursor hinterherschauen.',
      },
      {
        name: 'Präziser Stopp (Stopping Power)',
        desc: 'Das Überfahren eines Ziels mit anschließendem Zurückkorrigieren kostet wertvolle 50 bis 100 ms.',
        tips: 'Kontrollorientierte Mauspads bieten mehr Reibung für präzises Abstoppen.',
      },
      {
        name: 'Regelmäßiges Warmup vor Wettkämpfen',
        desc: 'Ein 5- bis 10-minütiger Drill vor Matches aktiviert das Zentralnervensystem spürbar.',
        tips: 'Warme Hände und Finger erhöhen die neuronale Leitgeschwindigkeit.',
      },
    ],
  },
  steps: [
    'Klicken Sie auf «Drill starten», um das Trainingsfeld zu öffnen.',
    'Richten Sie Ihren Blick auf die Mitte des Spielfelds.',
    'Scannen Sie die aufblitzenden Zielcluster und bestimmen Sie die Reihenfolge.',
    'Klicken Sie jedes Ziel an, bevor dessen Countdown abgelaufen ist.',
  ],
  audience: 'FPS- und MOBA-Spieler, Rennsportler und alle, die ihre Reflexe und geteilte Aufmerksamkeit trainieren wollen.',
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('woods2015', 'kosinski2008', 'dye2009', 'shelton2010', 'jain2015'),
  related: [
    { href: '/de/drills/reaction-speed', label: 'Reaktionsschnelligkeit Hub' },
    { href: '/de/drills/reaction-speed/reaction-time-test', label: 'Reaktionstest (Reaktionszeit Test)' },
    { href: '/de/drills/motor/movement-speed/rapid-tapping', label: 'CPS Test & Klick-Geschwindigkeit' },
    { href: '/de/drills/reaction-speed/fps-tracking-trainer', label: 'FPS Tracking Trainer' },
  ],
};

export default function GermanReflexTrainingDrillPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ReflexTrainingDrillWrapper copy={{ title: 'Reflex-Training & Reaktionsspiel' }} />
      <DrillGuide guide={reflexDrillGuide} />
    </>
  );
}
