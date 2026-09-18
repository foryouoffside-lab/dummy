import RapidTappingClient from '@/app/drills/motor/movement-speed/rapid-tapping/RapidTappingClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — de-DE (rapid-tapping / motor)
// PRIMARY DOMESTIC: "cps test"            — 3,150 exact Bing searches/mo (Dominant query)
// SECONDARY / LSI:
//                    "klickgeschwindigkeit test" — Direct speed calculation
//                    "klicks pro sekunde"        — Definition/benchmark query
//                    "klick test" / "maus klick test" — Hardware test
//                    "jitter clicking" / "butterfly clicking" — Minecraft PvP
//                    "minecraft cps test"        — Gaming specific
// NATIVE TITLE:      CPS Test – Klickgeschwindigkeit & Klicks Pro Sekunde Messen | SkillDrills
// ============================================================

export const metadata = {
  title: 'CPS Test – Klickgeschwindigkeit & CPS Messen | SkillDrills',
  description: 'Kostenloser CPS Test im Browser: Miss Klicks pro Sekunde (CPS), teste Jitter- und Butterfly-Clicking sowie Ausdauer über 45 Sekunden ohne Installation.',
  keywords: [
    'CPS Test',
    'cps test',
    'klickgeschwindigkeit test',
    'klicks pro sekunde',
    'klick test',
    'maus klick test',
    'klickgeschwindigkeit messen',
    'jitter clicking',
    'butterfly clicking',
    'minecraft cps test',
    'fingerausdauer tasten',
    'schnell klicken üben',
  ],
  openGraph: {
    title: 'CPS Test – Klickgeschwindigkeit & CPS Messen | SkillDrills',
    description:
      'Kostenloser CPS Test online im Browser. Miss deine Klicks pro Sekunde (CPS), teste Klickgeschwindigkeit, Jitter- und Butterfly-Clicking sowie Fingerausdauer.',
    type: 'article',
    url: 'https://skilldrills.online/de/drills/motor/movement-speed/rapid-tapping',
    siteName: 'SkillDrills',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CPS Test – Klickgeschwindigkeit & CPS Messen | SkillDrills',
    description:
      'Kostenloser CPS Test online im Browser. Miss deine Klicks pro Sekunde (CPS), teste Klickgeschwindigkeit, Jitter- und Butterfly-Clicking sowie Fingerausdauer.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/motor/movement-speed/rapid-tapping',
    languages: getAlternateLanguages('/drills/motor/movement-speed/rapid-tapping'),
  },
};

// --- Structured Data Schemas ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills Startseite', item: 'https://skilldrills.online/de' },
    { '@type': 'ListItem', position: 2, name: 'Trainings-Hub', item: 'https://skilldrills.online/de/drills' },
    { '@type': 'ListItem', position: 3, name: 'Motorik-Training', item: 'https://skilldrills.online/de/drills/motor' },
    { '@type': 'ListItem', position: 4, name: 'CPS Test', item: 'https://skilldrills.online/de/drills/motor/movement-speed/rapid-tapping' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CPS Test – Klickgeschwindigkeit & Klicks Pro Sekunde Trainer',
  alternateName: ['CPS Test', 'Klick-Geschwindigkeitstest', 'Klick Test'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description:
    'Kostenloser Online-CPS-Test und Klickgeschwindigkeitstrainer. Testet Einzelfinger-Klicken, Jitter-Clicking und Butterfly-Clicking gegen eine dynamisch beschleunigte Schrumpfrate über 45 Sekunden.',
  url: 'https://skilldrills.online/de/drills/motor/movement-speed/rapid-tapping',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  inLanguage: 'de-DE',
  dateModified: '2026-09-11',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'CPS Test Online',
  alternateName: ['CPS Test', 'Klickgeschwindigkeit Test'],
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Moderner Webbrowser mit HTML5 Canvas und Unterstützung für hochfrequente Mauszeiger-Eingaben',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  url: 'https://skilldrills.online/de/drills/motor/movement-speed/rapid-tapping',
  inLanguage: 'de-DE',
  dateModified: '2026-09-11',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'CPS Test – Kostenloser Klickgeschwindigkeitstest (Klicks pro Sekunde)',
  url: 'https://skilldrills.online/de/drills/motor/movement-speed/rapid-tapping',
  description: 'CPS Test – Kostenloser Klickgeschwindigkeitstest (Klicks pro Sekunde)',
  genre: ['Clicker Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' }
};


const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Was ist ein CPS Test (Clicks Per Second)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ein CPS-Test ist eine digitale motorische Messung der Häufigkeit von Mausklicks oder Touchscreen-Tipps pro Sekunde. Er bewertet die neuromuskuläre Impulsrate, Sehnen-Oszillationsgeschwindigkeit und Fingerausdauer.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was ist ein durchschnittlicher CPS-Wert für normale Spieler und E-Sportler?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Gelegenheitsspieler erreichen bei normalem Einzelfinger-Klicken durchschnittlich 5,0 bis 6,5 CPS. Erfahrene Spieler erzielen 8,0 bis 10,5 CPS, während Spezialisten in Minecraft PvP mit Jitter-Clicking 12,0 bis 16,0+ CPS und mit Butterfly-Clicking 16,0 bis 20,0+ CPS erreichen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was ist Jitter-Clicking und wie funktioniert es physiologisch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Beim Jitter-Clicking wird eine isometrische Muskel-Kokonzentration im Unterarm erzeugt. Die dadurch entstehenden hochfrequenten Mikrozuckungen werden über ein steifes Handgelenk direkt auf die Maustaste übertragen, was 11 bis 15 CPS ohne isolierte Fingerbewegungen ermöglicht.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was ist Butterfly-Clicking und wie unterscheidet es sich von Jitter-Clicking?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Butterfly-Clicking nutzt abwechselnde Schläge von Zeige- und Mittelfinger auf derselben Maustaste. Da die Finger unabhängig voneinander bei entspanntem Arm agieren, ist die Belastung geringer und Klickraten von 16 bis 22+ CPS sind auf Gaming-Mäusen mit geringer Debounce-Zeit möglich.',
      },
    },
    {
      '@type': 'Question',
      name: 'Warum ist ein hoher CPS-Wert in Minecraft PvP so wichtig?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Im klassischen Minecraft-Kampfsystem (1.8) registrieren Treffer bei höherer Klickrate schneller, wodurch der dem Gegner zugefügte Knockback maximiert und der eigene Rückstoß verringert wird. Dies ermöglicht ununterbrochene Schlag-Kombos.',
      },
    },
    {
      '@type': 'Question',
      name: 'Spielt die Klickgeschwindigkeit in Taktik-Shootern wie Valorant und CS2 eine Rolle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Obwohl Crosshair-Placement und Präzision im Vordergrund stehen, ist schnelles Tippen in Pistolenrunden (Classic, Ghost, USP-S) entscheidend, um schnelle Schussfolgen abzugeben, ohne das Fadenkreuz zu verreißen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was sind die physiologischen Grenzen des Einzelfinger-Klickens?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Studien (Halstead 1947, Todor & Kyprie 1980) zeigen, dass willkürliches Zeigefingertippen aufgrund zentralnervöser Refraktärzeiten bei etwa 5,5 bis 7,0 Hz (~55 Taps in 10s) limitiert ist. Über 10 CPS erfordert spezielle biomechanische Techniken.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie skaliert der 45-Sekunden-Test im Schwierigkeitsgrad?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Anders als statische 5-Sekunden-Tests fordert diese Übung Ausdauer: Jeder Klick vergrößert den Zielkreis, während eine dynamische Schrumpfung von bis zu 600 Pixel/Sekunde gegensteuert. Schrumpft die Kugel auf Null, gibt es einen Straf-Reset.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie kann man die Klickgeschwindigkeit steigern und Überlastungen vermeiden?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nutzen Sie Intervalltraining (45 Sekunden Sprint, 60 Sekunden Pause). Fokussieren Sie sich auf das Fingergrundgelenk (MCP) statt mit dem ganzen Arm nach unten zu drücken, und dehnen Sie regelmäßig die Unterarmsehnen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Funktioniert der CPS Test auch auf Smartphones und Tablets?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Das Tool nutzt Pointer Events, die Multitouch auf Touchscreens unterstützen, sodass auch mobile Spieler ihre Zwei-Finger-Tippfrequenz testen können.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'CPS Test – Kostenloser Klickgeschwindigkeitstest (Klicks pro Sekunde)',
  description: 'CPS Test – Kostenloser Klickgeschwindigkeitstest (Klicks pro Sekunde)',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Griffhaltung und Startposition',
      text: 'Legen Sie Ihr Handgelenk stabil auf das Mauspad und positionieren Sie den Zeigefinger über der linken Maustaste.',
      url: 'https://skilldrills.online/de/drills/motor/movement-speed/rapid-tapping#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '45-Sekunden-Sprint starten',
      text: 'Klicken Sie auf „Drill starten“ und tippen Sie nach dem Countdown mit maximaler Frequenz auf den Zielball.',
      url: 'https://skilldrills.online/de/drills/motor/movement-speed/rapid-tapping#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Ball-Schrumpfung ausgleichen',
      text: 'Jeder Klick vergrößert den Zielball. Halten Sie einen stabilen Rhythmus aufrecht, wenn die automatische Schrumpfung beschleunigt.',
      url: 'https://skilldrills.online/de/drills/motor/movement-speed/rapid-tapping#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Durchschnitts-CPS und Peak analysieren',
      text: 'Prüfen Sie auf der Auswertungskarte Ihre durchschnittliche Klickrate (CPS), Spitzenbursts und Ermüdungsresistenz.',
      url: 'https://skilldrills.online/de/drills/motor/movement-speed/rapid-tapping#step-4'
    }
  ],
};

const guideProps = {
  sources: pickSources('halstead1947', 'todor1980', 'keele1968', 'woods2015'),
  intro: {
    title: 'Messprinzipien und wissenschaftliche Grundlagen der Klickgeschwindigkeit',
    paragraphs: [
      'Ein CPS-Test zählt die ausgeführten Mausklicks in einer Sekunde. Kontinuierliches Einzelfinger-Klicken erreicht typischerweise 5 bis 7 Klicks pro Sekunde, basierend auf dem publizierten Finger-Tapping-Referenzwert von etwa 50 bis 55 Taps in 10 Sekunden für den dominanten Zeigefinger gesunder Erwachsener (Halstead, 1947; Todor & Kyprie, 1980). Höhere Werte werden über offene motorische Bewegungsprogramme gesteuert (Keele, 1968).',
      'Messgenauigkeit und Display-Quantisierung: Die Zeitmessung basiert auf der performance.now()-Uhr des Browsers (ca. 1 ms Auflösung). Bildschirme aktualisieren je nach Frequenz alle 16,7 ms (60 Hz), 6,9 ms (144 Hz) oder 4,1 ms (240 Hz, Woods et al., 2015), während Maus-Polling 1 bis 8 ms Latenz hinzufügt. Unterschiede unter 5 ms sind als Messrauschen zu betrachten. SkillDrills speichert alle Ergebnisse lokal im Browser.',
    ],
  },
  benchmark: {
    title: 'Offizielle CPS-Rangliste & Perzentil-Tabelle',
    description: 'Orientierungstabelle zur Einordnung eigener Ergebnisse. Einzelfinger-Werte basieren auf neuropsychologischen Normen (Halstead 1947; Todor & Kyprie 1980), fortgeschrittene Techniken auf Wettkampfdaten.',
    columns: ['Rang-Stufe', 'Offizieller Titel', 'Durchschnitts-CPS', 'Spitzen-CPS (5s)', 'Klicktechnik', 'Einstufung'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Apex Tapper',
        stat: '16.0+ CPS',
        level: '20.0+ CPS',
        accuracy: 'Butterfly / Drag Clicking',
        percentile: 'Top 0.1% Weltklasse',
      },
      {
        tier: 'Tier 2',
        rank: 'Pro Competitor',
        stat: '12.0–15.9 CPS',
        level: '15.0–19.0 CPS',
        accuracy: 'Jitter Clicking gemeistert',
        percentile: 'Top 3% Fortgeschritten',
      },
      {
        tier: 'Tier 3',
        rank: 'Competitive Gamer',
        stat: '9.0–11.9 CPS',
        level: '11.0–14.0 CPS',
        accuracy: 'Schneller Einzelfinger / Spannung',
        percentile: 'Top 15% Stark',
      },
      {
        tier: 'Tier 4',
        rank: 'Proficient Casual',
        stat: '6.0–8.9 CPS',
        level: '7.5–10.0 CPS',
        accuracy: 'Standard Einzelfinger',
        percentile: 'Top 50% Durchschnitt',
      },
      {
        tier: 'Tier 5',
        rank: 'Novice Tapper',
        stat: '< 6.0 CPS',
        level: '< 7.5 CPS',
        accuracy: 'Untrainierter Einzelfinger',
        percentile: 'Basis 20% Einsteiger',
      },
    ],
  },
  protocols: {
    title: '4 Trainingsprotokolle zur Steigerung der Klickgeschwindigkeit',
    description: 'Strukturierte Übungen zur Erhöhung der motorischen Entladungsrate, Sehnenstärkung und Verzögerung von Ermüdung.',
    items: [
      {
        title: 'Protokoll 1: Halstead-Rhythmus-Kalibrierung (Entspanntes MCP-Gelenk)',
        description: 'Legen Sie das Handgelenk auf das Mauspad und isolieren Sie die Bewegung auf das Fingergrundgelenk (MCP). Ein entspannter Unterarm verhindert Muskelverkrampfungen und hält das Fadenkreuz ruhig.',
      },
      {
        title: 'Protokoll 2: Todor-Kyprie Hochfrequenz-Intervalle (Mikro-Pausen)',
        description: 'Wechseln Sie zwischen 5 Sekunden maximaler Sprint-Geschwindigkeit und 3 Sekunden ruhigem Dauerklicken. Dies konditioniert das Nervensystem für hohe Entladungsraten und verzögert Laktatbildung.',
      },
      {
        title: 'Protokoll 3: Isometrische Mikrozuckungen (Jitter-Clicking-Stabilisierung)',
        description: 'Erzeugen Sie eine leichte Ko-Kontraktion der Unterarmmuskeln und lassen Sie die Vibration auf den Zeigefinger übergehen. Halten Sie den Anpressdruck leicht, um die Mausbeweglichkeit zu bewahren.',
      },
      {
        title: 'Protokoll 4: Alternierende Zweifinger-Artikulation (Butterfly-Clicking)',
        description: 'Positionieren Sie Zeige- und Mittelfinger flach auf der Taste und trommeln Sie abwechselnd. Stellen Sie die Maus-Debounce-Zeit auf ein Minimum (0–4 ms) für maximale Registrierung.',
      },
    ],
  },
  faqs: {
    title: 'Häufig gestellte Fragen zu CPS & Klickgeschwindigkeit (FAQ)',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function GermanRapidTappingPage() {
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
      <RapidTappingClient />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/drills/motor/movement-speed/rapid-tapping" />
      </div>
    </>
  );
}

