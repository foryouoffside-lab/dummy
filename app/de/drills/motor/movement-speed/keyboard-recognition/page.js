import KeyboardRecognitionClient from '@/app/drills/motor/movement-speed/keyboard-recognition/KeyboardRecognitionClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Tastatur Reaktionszeit Test – Keybind Trainer | SkillDrills',
  description: 'Kostenloser Tastatur-Reaktionszeit-Test: Messe Tastengeschwindigkeit, Keybind-Reflexe und Wahlreaktionszeit direkt im Browser ohne Anmeldung.',
  keywords: [
    'tastatur reaktionszeit test',
    'tastatur geschwindigkeitstest',
    'keybind trainer deutsch',
    'tastatur reaktionsgeschwindigkeit',
    'tasten reaktionszeit messen',
    'tastatur reflex test',
    'keybind muscle memory',
    'wahlreaktionszeit tastatur',
    'gaming tastatur reaktion',
    'reaktionszeit tastenanschlag',
    'finger schnelligkeit tastatur',
    'esports keybind training',
  ],
  openGraph: {
    title: 'Tastatur Reaktionszeit Test – Keybind Trainer | SkillDrills',
    description: 'Kostenloser Tastatur-Reaktionszeit-Test: Messe Tastengeschwindigkeit, Keybind-Reflexe und Wahlreaktionszeit direkt im Browser.',
    type: 'article',
    url: 'https://skilldrills.online/de/drills/motor/movement-speed/keyboard-recognition',
    siteName: 'SkillDrills',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tastatur Reaktionszeit Test – Keybind Trainer | SkillDrills',
    description: 'Kostenloser Tastatur-Reaktionszeit-Test: Messe Tastengeschwindigkeit und Keybind-Reflexe.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/motor/movement-speed/keyboard-recognition',
    languages: getAlternateLanguages('/drills/motor/movement-speed/keyboard-recognition'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills', item: 'https://skilldrills.online/de' },
    { '@type': 'ListItem', position: 2, name: 'Motorik Training', item: 'https://skilldrills.online/de/drills/motor' },
    { '@type': 'ListItem', position: 3, name: 'Bewegungsgeschwindigkeit', item: 'https://skilldrills.online/de/drills/motor/movement-speed' },
    { '@type': 'ListItem', position: 4, name: 'Tastatur Reaktionszeit Test', item: 'https://skilldrills.online/de/drills/motor/movement-speed/keyboard-recognition' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Tastatur Reaktionszeit Test – Keybind Trainer',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Kostenloser browserbasierter Tastatur-Reaktionszeit-Test und Keybind-Trainer. Messe Wahlreaktionszeit, Tasten-Reflexe und inhibitorische Kontrolle.',
  url: 'https://skilldrills.online/de/drills/motor/movement-speed/keyboard-recognition',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Tastatur Reaktionszeit Test',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Benötigt HTML5 Canvas und JavaScript-Unterstützung',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  url: 'https://skilldrills.online/de/drills/motor/movement-speed/keyboard-recognition',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Tastatur Reaktionszeit Test – Keybind Trainer',
  url: 'https://skilldrills.online/de/drills/motor/movement-speed/keyboard-recognition',
  description: 'Messe, wie schnell du die richtige Taste auf einen visuellen Reiz hin drückst, basierend auf Hicks Gesetz der Wahlreaktionszeit.',
  genre: ['Keyboard Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Was misst ein Tastatur-Reaktionszeit-Test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Er misst die Latenz zwischen dem Erscheinen eines Tastensymbols auf dem Bildschirm und dem Auslösen der physischen Taste. Dies prüft Wahlreaktionszeit, räumliche Tastaturorientierung und motorische Impulskontrolle.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie verbessert Keybind-Training das Gameplay in Shooter-Spielen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In taktischen Shootern wie CS2 oder Valorant muss das Wechseln von Waffen und der Einsatz von Fähigkeiten ohne Blick auf die Tastatur erfolgen. Das Training automatisiert motorische Pfade und eliminiert Zögern in Drucksituationen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was besagt Hicks Gesetz über die Wahlreaktionszeit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hicks Gesetz (Hick 1952) besagt, dass die Reaktionszeit logarithmisch mit der Anzahl der Entscheidungsmöglichkeiten ansteigt. Gelerntes Muskelgedächtnis reduziert diese kognitive Wahlstufe und nähert die Reaktionszeit einem einfachen Reflex an.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welchen Zweck erfüllen Schein-Befehle (Fake Prompts)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fake Prompts prüfen die inhibitorische Verhaltenskontrolle (Stop-Signal-Paradigma nach Logan 1984). Der präfrontale Kortex muss einen bereits vorbereiteten Tastendruck aktiv unterdrücken, wenn ein Köder-Reiz aufleuchtet.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was ist eine normale Reaktionszeit für einzelne Tasten?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Untrainierte Nutzer erreichen typischerweise 380 bis 480 ms. Geübte Spieler erzielen 240 bis 300 ms, während Elite-Esportler Latenzen unter 240 ms bei minimaler Fehlerquote realisieren.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie fordert der Sequenz-Modus das Gehirn heraus?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Der Sequenz-Modus fordert das motorische Chunking und Arbeitsgedächtnis (Sternberg 1966). Tastenkombinationen werden nicht Taste für Taste gedacht, sondern als eine geschlossene motorische Geste abgefeuert.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Tastatur liefert die besten Messergebnisse?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mechanische Tastaturen mit linearen Schaltern, optischer Auslösung oder magnetischen Hall-Effekt-Schaltern (Rapid Trigger) und mindestens 1000 Hz USB-Polling bieten minimale Signalverzögerung.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie oft und wie lange sollte man Keybinds trainieren?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Täglich 10 bis 15 Minuten in 3 bis 4 konzentrierten Blöcken sind ideal. Die neuronale Anpassung erfolgt schnell, während Übermüdung zu Schlampigkeit bei der Tastenunterdrückung führt.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hilft das Training auch in MOBA-Spielen wie League of Legends oder Dota 2?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Präzise Fähigkeitskombinationen (Q-W-E-R) und schnelle Item-Aktivierungen verlangen blindes Tastenvertrauen und unabhängige Fingerbeweglichkeit.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie werden KPM (Tasten pro Minute) und Genauigkeit berechnet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'KPM ist die Gesamtzahl richtiger Anschläge geteilt durch die Testzeit in Minuten. Die Genauigkeit stellt das Verhältnis von Treffern zu allen Tastendrücken inklusive Fehleingaben und ausgelöster Fallen dar.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Tastatur-Reaktionszeit und Keybind-Reflexe trainieren',
  description: 'Schritt-für-Schritt-Anleitung zur Steigerung von Tastenschnelligkeit und Reaktionshemmung.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Ausgangsposition einnehmen',
      text: 'Lege die Finger der linken Hand auf dein gewohntes Gaming-Tastencluster (z. B. WASD) und halte die Hand entspannt.',
      url: 'https://skilldrills.online/de/drills/motor/movement-speed/keyboard-recognition#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Tasten-Reiz fixieren und identifizieren',
      text: 'Richte deinen Blick fest auf die Bildschirmmitte. Sobald die Taste erscheint, löse den Anschlag blind aus.',
      url: 'https://skilldrills.online/de/drills/motor/movement-speed/keyboard-recognition#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Präziser Anschlag oder Impulsstopp',
      text: 'Drücke die geforderte Taste sauber durch. Erscheint ein Schein-Befehl (Fake Prompt), stoppe den Anschlag rechtzeitig.',
      url: 'https://skilldrills.online/de/drills/motor/movement-speed/keyboard-recognition#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Latenz und Fehlerquote auswerten',
      text: 'Prüfe deine durchschnittliche Wahlreaktionszeit, KPM-Geschwindigkeit und Hemmungsrate auf der Auswertungskarte.',
      url: 'https://skilldrills.online/de/drills/motor/movement-speed/keyboard-recognition#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('donders1868', 'hick1952', 'logan1984', 'sternberg1966', 'woods2015'),
  intro: {
    title: 'Wissenschaftliche Messung der Tastatur-Reaktionszeit',
    paragraphs: [
      'Die Messung von Tastengeschwindigkeit basiert auf der Wahlreaktionszeit (Donders, 1868; Hick, 1952). Die visuelle Reizverarbeitung benötigt physiologisch rund 200–250 ms, während jede zusätzliche Tastenoption die neuronale Verarbeitungszeit vergrößert. Gezieltes Training automatisiert die Reiz-Reaktions-Verknüpfung, sodass der Entscheidungsschritt minimiert wird.',
      'Browserbasierte Messgenauigkeit: Die Zeiterfassung über performance.now() unterliegt einer hardwarebedingten Diskretisierung und der Bildwiederholrate deines Monitors. Vergleiche deine Ergebnisse stets auf demselben Setup.',
    ],
  },
  benchmark: {
    title: 'Tastatur-Geschwindigkeit & Keybind-Reaktionsbenchmarks',
    description: 'Orientierungswerte zur Leistungsbeurteilung. Beurteilt werden Wahlreaktionszeit bei Einzeltasten, Sequenz-Tipptempo und Fallen-Inhibition.',
    columns: ['Tier', 'Rang', 'Einzeltasten-Latenz', 'Sequenz KPM', 'Hemmungs-Genauigkeit', 'Kategorie'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Apex Keybinder',
        stat: 'Unter 240 ms',
        level: '320+ KPM',
        accuracy: '98–100%',
        percentile: 'Top 1% (Elite)',
      },
      {
        tier: 'Tier 2',
        rank: 'Master Tactician',
        stat: '240–300 ms',
        level: '260–319 KPM',
        accuracy: '95–97%',
        percentile: 'Top 5% (Fortgeschritten)',
      },
      {
        tier: 'Tier 3',
        rank: 'Proficient Operator',
        stat: '300–380 ms',
        level: '200–259 KPM',
        accuracy: '90–94%',
        percentile: 'Top 20% (Solide)',
      },
      {
        tier: 'Tier 4',
        rank: 'Intermediate Typist',
        stat: '380–480 ms',
        level: '140–199 KPM',
        accuracy: '80–89%',
        percentile: 'Durchschnitt',
      },
      {
        tier: 'Tier 5',
        rank: 'Novice Keybinder',
        stat: 'Über 480 ms',
        level: 'Unter 140 KPM',
        accuracy: 'Unter 80%',
        percentile: 'Einsteiger',
      },
    ],
  },
  protocols: {
    title: 'Strukturierte Trainingsprotokolle',
    description: 'Gezielte Methoden zur Reduktion von Entscheidungsentropie und Steigerung der Tastenreaktion.',
    items: [
      {
        title: 'Protokoll 1: Kompression der Wahlreaktionszeit (Donders 1868)',
        description: 'Blicke strikt auf den Bildschirm ohne Blickkontakt zur Tastatur. Zwinge das Nervensystem zur rein propriozeptiven Tastenansteuerung.',
      },
      {
        title: 'Protokoll 2: Zonale Tastenorganisation (Hick 1952)',
        description: 'Unterteile dein Tastenfeld mental in Funktionszonen (Bewegung WASD, Taktik QECX, Zahlenreihe 1-4), um Entscheidungsentropie zu senken.',
      },
      {
        title: 'Protokoll 3: Impulsstopp & Stop-Signal-Hemmung (Logan 1984)',
        description: 'Trainiere das gezielte Abbremsen des Fingers bei Schein-Reizen, bevor der Schaltkontakt mechanisch betätigt wird.',
      },
      {
        title: 'Protokoll 4: Sequenz-Chunking (Sternberg 1966)',
        description: 'Fasse mehrstellige Tastenabfolgen als eine einzige zusammenhängende motorische Geste auf, anstatt Tasten isoliert zu tippen.',
      },
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

export default function GermanKeyboardRecognitionPage() {
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
      <KeyboardRecognitionClient />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/drills/motor/movement-speed/keyboard-recognition" />
      </div>
    </>
  );
}
