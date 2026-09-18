import FingerSequencingClient from '@/app/drills/motor/movement-speed/finger-sequencing/FingerSequencingClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Sequenz Aim Trainer – Klick-Tempo Test | SkillDrills',
  description: 'Kostenloser Sequenz Aim Trainer: Teste Zielwechsel-Geschwindigkeit und Klick-Präzision auf nummerierte Ziele. Verbessere serielles Zielen ohne Download.',
  keywords: [
    'Sequenz Aim Trainer',
    'Maus Klick Reihenfolge Test',
    'Sequentielles Klicken Trainieren',
    'Nummerierte Ziele Klicken',
    'Target Switching Drill',
    'Finger Schnelligkeitstest',
    'Motorische Sequenzkontrolle',
    'Aim Trainer Zielreihenfolge',
    'Klick Präzision Online',
    'FPS Zielwechsel Training',
    'Klickgeschwindigkeit Test',
    'Tastatur Finger Koordination',
  ],
  openGraph: {
    title: 'Sequenz Aim Trainer – Klick-Tempo Test | SkillDrills',
    description: 'Kostenloser Sequenz Aim Trainer: Teste Zielwechsel-Geschwindigkeit und Klick-Präzision auf nummerierte Ziele. Verbessere serielles Zielen ohne Download.',
    type: 'article',
    url: 'https://skilldrills.online/de/drills/motor/movement-speed/finger-sequencing',
    siteName: 'SkillDrills',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sequenz Aim Trainer – Klick-Tempo Test | SkillDrills',
    description: 'Kostenloser Sequenz Aim Trainer: Teste Zielwechsel-Geschwindigkeit und Klick-Präzision auf nummerierte Ziele.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/motor/movement-speed/finger-sequencing',
    languages: getAlternateLanguages('/drills/motor/movement-speed/finger-sequencing'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills', item: 'https://skilldrills.online/de' },
    { '@type': 'ListItem', position: 2, name: 'Motorik Training', item: 'https://skilldrills.online/de/drills/motor' },
    { '@type': 'ListItem', position: 3, name: 'Bewegungsgeschwindigkeit', item: 'https://skilldrills.online/de/drills/motor/movement-speed' },
    { '@type': 'ListItem', position: 4, name: 'Sequenz Aim Trainer', item: 'https://skilldrills.online/de/drills/motor/movement-speed/finger-sequencing' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Sequenz Aim Trainer – Klick-Geschwindigkeit Test',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Kostenloser browserbasierter Sequenz-Aim-Trainer und Fingertempo-Test. Trainiere serielle Zielakquise, Pfadplanung und Klick-Timing.',
  url: 'https://skilldrills.online/de/drills/motor/movement-speed/finger-sequencing',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Sequenz Aim Trainer',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Benötigt HTML5 Canvas und JavaScript-Unterstützung',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  url: 'https://skilldrills.online/de/drills/motor/movement-speed/finger-sequencing',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Sequenz Aim Trainer – Finger Schnelligkeitstest',
  url: 'https://skilldrills.online/de/drills/motor/movement-speed/finger-sequencing',
  description: 'Messe die Geschwindigkeit deines Zielwechsels in fester Reihenfolge auf Basis serieller motorischer Programme.',
  genre: ['Aim Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Was ist ein Sequenz Aim Trainer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ein Sequenz Aim Trainer ist ein motorisches Reaktionstraining, bei dem nummerierte Ziele in einer exakten Größen- und Ziffernreihenfolge angeklickt werden müssen. Es trainiert ballistische Flicks, visuelles Vorab-Scanning und flüssige Cursor-Trajektorien.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie verbessert sequentielles Klicken das Zielen in Valorant und CS2?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In taktischen Shootern müssen bei Gefechten gegen mehrere Gegner mehrere Ziele nacheinander priorisiert und neutralisiert werden. Sequenztraining konditioniert den motorischen Kortex darauf, Trajektorien vorzuprogrammieren (Lashley 1951), wodurch Verzögerungen zwischen Zielen eliminiert werden.',
      },
    },
    {
      '@type': 'Question',
      name: 'Worin liegt der Unterschied zwischen CPS-Tests und Sequenz-Training?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ein einfacher CPS-Test misst stationäres Schnellklicken ohne räumliche Bewegung. Der Sequenz-Trainer verknüpft Klickkadenz mit räumlicher Navigation unter Fitts-Gesetz-Bedingungen, inklusive Abbremskontrolle und Zielkorrektur.',
      },
    },
    {
      '@type': 'Question',
      name: 'Warum verkleinern sich die Zielscheiben in der Sequenz?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Verkleinerte Trefferflächen simulieren reale Gefechte: Zuerst wird eine grobe Fläche rasch anvisiert, gefolgt von mikroskopischen Korrekturen auf kleinere Trefferzonen (z. B. Kopfhörer/Headshot-Hitboxen). Dies fordert sowohl die offene als auch die geschlossene Regelkreis-Motorik.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Mausempfindlichkeit wird für das Sequenztraining empfohlen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Verwende exakt deine gewohnte Shooter-Empfindlichkeit, üblicherweise 25 bis 45 cm pro 360-Grad-Drehung (800 DPI mit 0,3–0,5 in Valorant oder 1,0–1,6 in CS2). Nur so baut sich stabiles motorisches Gedächtnis auf.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was versteht man unter motorischem Chunking (Lashley 1951)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Motorisches Chunking bezeichnet die neurologische Bündelung einzelner Bewegungselemente zu einem zusammenhängenden Programm. Das Gehirn entscheidet nicht an jedem Punkt neu, sondern startet eine vorgeplante Bewegungskette, was die Latenz drastisch senkt.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie lange sollte eine Trainingseinheit täglich dauern?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '10 bis 15 Minuten tägliches, hochkonzentriertes Training in mehreren kurzen Intervallen mit 60 Sekunden Pause sind optimal. Übermüdung führt zu muskulärer Verkrampfung und schadet der Feinmotorik.',
      },
    },
    {
      '@type': 'Question',
      name: 'Überträgt sich das Training auch auf Rhythmusspiele wie osu!?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, das geordnete Treffen von Zielclustern schult direkt die visuell-motorische Antizipation und Rhythmusgenauigkeit, die in Titeln wie osu! für präzise Notenketten gefordert wird.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Hardware-Einstellungen liefern die verlässlichsten Messergebnisse?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ein 144-Hz- oder 240-Hz-Monitor, eine Gaming-Maus mit 1000 Hz Polling-Rate und deaktivierte Zeigerbeschleunigung in Windows sorgen für unverzögerte und reproduzierbare 1:1-Messungen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie wird die Treffergenauigkeit (Accuracy) berechnet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die Genauigkeit beziffert das Verhältnis von korrekten, sequenzgetreuen Treffern zur Gesamtzahl aller Klicks (einschließlich Fehlschlägen ins Leere oder falscher Reihenfolge). Werte über 95 Prozent belegen optimale Beherrschung des Speed-Accuracy-Tradeoffs.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'So trainierst du sequentielles Zielen und Fingertempo',
  description: 'Schritt-für-Schritt-Anleitung zur Beherrschung geordneter Mehrfachklicks und schneller Zielwechsel.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Zielkette visuell erfassen',
      text: 'Verschaffe dir beim Auftauchen der Zielscheiben einen Überblick über die Positionen und plane die kürzeste Trajektorie.',
      url: 'https://skilldrills.online/de/drills/motor/movement-speed/finger-sequencing#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Erstes Ziel rasch anvisieren',
      text: 'Führe einen schnellen ballistischen Flick zum Startziel aus und löse den Klick aus, um die Sequenz zu starten.',
      url: 'https://skilldrills.online/de/drills/motor/movement-speed/finger-sequencing#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Kette in numerischer Reihenfolge abarbeiten',
      text: 'Wechsle ohne zögernde Pausen von Ziel zu Ziel (1 zu 2 zu 3) und halte eine gleichmäßige Klickfrequenz.',
      url: 'https://skilldrills.online/de/drills/motor/movement-speed/finger-sequencing#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Ergebnisse und Latenz analysieren',
      text: 'Werte Übergangslatenzen, Fehlerquoten und Pfadoptimierung auf der detaillierten Auswertungskarte aus.',
      url: 'https://skilldrills.online/de/drills/motor/movement-speed/finger-sequencing#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('lashley1951', 'keele1968', 'fitts1954', 'mackenzie1992', 'woods2015'),
  intro: {
    title: 'Wissenschaftliche Grundlagen des Sequenz-Zielens',
    paragraphs: [
      'Sequentielles Zielen bedeutet, vorgegebene Ziele in einer festgelegten Reihenfolge anzusteuern, anstatt das jeweils nächstgelegene Ziel zu wählen. Jeder Übergang zwischen zwei Punkten folgt Fitts’ Gesetz (Fitts, 1954; MacKenzie, 1992), während die Abfolge als vorprogrammiertes motorisches Muster im Nervensystem hinterlegt wird (Lashley, 1951; Keele, 1968).',
      'Messgenauigkeit im Browser: Die Zeitmessung erfolgt über performance.now() mit einer hardwarebedingten Diskretisierung. Die Bildwiederholrate quantisiert Bildschirmereignisse (16,7 ms bei 60 Hz, 4,1 ms bei 240 Hz). Vergleiche deine Werte stets auf demselben Monitor- und Maus-Setup.',
    ],
  },
  benchmark: {
    title: 'Standardisierte Leistungs-Benchmarks für Sequenz-Aiming',
    description: 'Orientierungswerte zur persönlichen Leistungsbeurteilung. Dargestellt werden Latenz zwischen Klicks, Level-Obergrenze und Ketten-Genauigkeit.',
    columns: ['Tier', 'Rang', 'Übergangs-Latenz', 'Level-Erreichung', 'Ketten-Genauigkeit', 'Kategorie'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Apex-Sequenzer (Apex Sequencer)',
        stat: 'Unter 180 ms',
        level: 'Stufe 12+',
        accuracy: '98–100%',
        percentile: 'Top 1% (Elite)',
      },
      {
        tier: 'Tier 2',
        rank: 'Meister-Taktiker (Master Tactician)',
        stat: '180–230 ms',
        level: 'Stufe 9–11',
        accuracy: '95–97%',
        percentile: 'Top 5% (Fortgeschritten)',
      },
      {
        tier: 'Tier 3',
        rank: 'Erfahrener Operator (Proficient Operator)',
        stat: '230–300 ms',
        level: 'Stufe 6–8',
        accuracy: '90–94%',
        percentile: 'Top 20% (Solide)',
      },
      {
        tier: 'Tier 4',
        rank: 'Mittlerer Klicker (Intermediate Clicker)',
        stat: '300–400 ms',
        level: 'Stufe 3–5',
        accuracy: '82–89%',
        percentile: 'Durchschnitt',
      },
      {
        tier: 'Tier 5',
        rank: 'Einsteiger-Sequenzer (Novice Sequencer)',
        stat: 'Über 400 ms',
        level: 'Stufe 1–2',
        accuracy: 'Unter 82%',
        percentile: 'Einsteiger',
      },
    ],
  },
  protocols: {
    title: 'Strukturierte Trainingsprotokolle',
    description: 'Gezielte Methoden zur Steigerung von Zielwechsel-Frequenz und Präzision.',
    items: [
      {
        title: 'Protokoll 1: Motorisches Chunking (Lashley 1951)',
        description: 'Scanne die Zielanordnung vor dem ersten Klick komplett ab. Speichere den gesamten Pfad als eine einzige Bewegungseinheit im motorischen Kortex ab, um Zwischenpausen zu vermeiden.',
      },
      {
        title: 'Protokoll 2: Ballistisches Pacing (Keele 1968)',
        description: 'Bewege den Cursor über weite Distanzen mit maximaler Geschwindigkeit ohne Zwischenkorrektur und bremse erst unmittelbar vor dem Ziel präzise ab.',
      },
      {
        title: 'Protokoll 3: Adaptive Bremskraftkontrolle',
        description: 'Passe den Bremsdruck der Hand an abnehmende Zielgrößen an: Große Armbewegungen für das Startziel, feine Finger-Mikrokorrekturen für die kleineren Endziele.',
      },
      {
        title: 'Protokoll 4: Rhythmus-Stabilisierung',
        description: 'Halte ein gleichmäßiges Klicktempo ein. Hektisches Beschleunigen erzeugt Zielfehler und Zeitstrafen, während ein metronomischer Takt stabile Ketten sichert.',
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

export default function GermanFingerSequencingPage() {
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
      <FingerSequencingClient copy={{ title: 'Sequenz Aim Trainer' }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/drills/motor/movement-speed/finger-sequencing" />
      </div>
    </>
  );
}
