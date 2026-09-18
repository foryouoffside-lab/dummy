import MarketDoorsPursuitClient from '@/app/drills/reaction-speed/market-doors-pursuit/MarketDoorsPursuitWrapperLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS – de-DE (reaction-speed / market-doors-pursuit)
// PRIMARY DOMESTIC: "Ecken Clearen Trainer" / "Winkel Abfragen Drill"
// SECONDARY / LSI:
//   "Slicing the Pie Training" / "FPS Ecken checken"
//   "Taktisches Aufklären" / "Winkelkontrolle Aim"
// ============================================================

export const metadata = {
  title: 'Ecken Clearen Trainer – Winkel Abfragen | SkillDrills',
  description: 'Kostenloser Corner-Checking-Trainer online. Trainiere Ecken-Clearing, Slicing the Pie und blitzschnelle visuelle Zielerfassung im Browser.',
  keywords: [
    'ecken clearen trainer',
    'winkel abfragen drill',
    'slicing the pie training',
    'fps ecken checken',
    'winkelkontrolle aim',
    'taktisches aufklären',
    'blicksprünge ecken',
    'reaktionszeit türdurchgang',
    'pre aim training',
    'taktisches aim training',
    'reaktionstest türöffnung',
    'periphere wahrnehmung fps',
  ],
  openGraph: {
    title: 'Ecken Clearen Trainer – Winkel Abfragen | SkillDrills',
    description: 'Kostenloser Corner-Checking-Trainer online. Trainiere Ecken-Clearing, Slicing the Pie und blitzschnelle visuelle Zielerfassung im Browser.',
    type: 'article',
    url: 'https://skilldrills.online/de/drills/reaction-speed/market-doors-pursuit',
    siteName: 'SkillDrills',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ecken Clearen Trainer – Winkel Abfragen | SkillDrills',
    description: 'Kostenloser Corner-Checking-Trainer online. Trainiere Ecken-Clearing, Slicing the Pie und blitzschnelle visuelle Zielerfassung im Browser.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/reaction-speed/market-doors-pursuit',
    languages: getAlternateLanguages('/drills/reaction-speed/market-doors-pursuit'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills Startseite', item: 'https://skilldrills.online/de' },
    { '@type': 'ListItem', position: 2, name: 'Drills Hub', item: 'https://skilldrills.online/de/drills' },
    { '@type': 'ListItem', position: 3, name: 'Reaktionsschnelligkeit', item: 'https://skilldrills.online/de/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'Ecken Clearen Trainer', item: 'https://skilldrills.online/de/drills/reaction-speed/market-doors-pursuit' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Ecken Clearen Trainer – Winkel Abfragen & Reaktions-Drill',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Online-Training für Ecken-Aufklärung, Slicing the Pie und Zielerfassung beim Durchschreiten von Türen und Winkeln.',
  url: 'https://skilldrills.online/de/drills/reaction-speed/market-doors-pursuit',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  inLanguage: 'de-DE',
  dateModified: '2026-09-15',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Ecken Clearen Trainer',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'HTML5 Canvas, moderner Webbrowser mit Pointer-Lock-Unterstützung',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  url: 'https://skilldrills.online/de/drills/reaction-speed/market-doors-pursuit',
  inLanguage: 'de-DE',
  dateModified: '2026-09-15',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Corner Checking Trainer – Taktisches Ecken-Clearing & Sakkadischer Reaktions-Drill',
  url: 'https://skilldrills.online/de/drills/reaction-speed/market-doors-pursuit',
  description: 'Taktisches Ecken-Clearing und Reaktionsspiel zur Beherrschung von Türdurchgängen und Blickwinkeln in Ego-Shootern.',
  genre: ['Action', 'Taktiktraining', 'Esports Sehtraining'],
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
      name: 'Was versteht man unter Ecken-Clearing (Corner Checking) in taktischen Shootern?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ecken-Clearing bezeichnet das systematische und isolierte Abfragen potenzieller Hinterhalt-Winkel. Ziel ist es, den eigenen Sichtbereich geometrisch so aufzuteilen, dass man zu jedem Zeitpunkt nur einer einzigen Bedrohungslinie ausgesetzt ist.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was bedeutet die Taktik „Slicing the Pie“?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Slicing the Pie beschreibt eine kreisförmige Bewegung um eine Ecke oder Türöffnung. Man tastet den Raum in winzigen Winkelscheiben schrittweise ab, um Gegner einzeln zu isolieren, bevor der gesamte Raum betreten wird.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Rolle spielen sakkadische Blicksprünge beim Ecken-Check?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Beim Aufdecken jedes neuen Winkels führt das Sehsystem rasche Sakkaden (20–40 ms; Rayner, 1998) aus, gefolgt von sofortiger Foveation, um blitzschnell zu verifizieren, ob im freigelegten Raumsegment eine Bedrohung lauert.',
      },
    },
    {
      '@type': 'Question',
      name: 'Warum werden Spieler beim Ecken-Clearen häufig eliminiert?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Häufigste Ursachen sind Überhastung, gleichzeitiges Freilegen mehrerer Schusslinien (Over-Peeking) oder das Starren auf das Fadenkreuz statt das aktive visuelle Abtasten der Raumtiefe hinter der Kante.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was versteht man unter Pre-Aiming bei Türdurchgängen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pre-Aiming bedeutet, das Fadenkreuz bereits vor dem Heraustreten durch die Wand präzise auf die Kopfhöhe und Position zu richten, an der ein Verteidiger am wahrscheinlichsten steht, wodurch die Flick-Distanz auf null sinkt.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie trainiert der dynamische Türdurchgangs-Drill das Reaktionsvermögen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Der Drill lässt Ziele unerwartet aus aufeinanderfolgenden Türen hervorbrechen. Dies schult die visuelle Erkennungsgeschwindigkeit und das sofortige Abstoppen des Fadenkreuzes (Stopping-Power) unter Zeitdruck.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Rolle spielt die mentale Chronometrie nach Donders (1868)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Während einfache Reaktionen ca. 200 ms dauern, erfordert das Überprüfen mehrerer Türen Wahlreaktionszeit (Choice RT; Donders, 1868): Das Gehirn muss Raumdaten diskriminieren und Bedrohungsprioritäten abwägen, was die Reaktionslatenz verlängert.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welchen Vorteil bieten Monitore mit 144 Hz oder 240 Hz beim Ecken-Check?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Monitore mit hohen Bildwiederholraten reduzieren Frame-Latenzen auf unter 4 bis 7 ms (Woods et al., 2015). Dadurch wird das Auftauchen einer Zielkontur hinter der Türschwelle messbar früher wahrgenommen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie viel Trainingszeit pro Tag ist für Corner Checking optimal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '10 bis 15 Minuten konzentriertes Winkeltraining vor Wettkampfspielen reichen aus, um automatisierte visuelle Scanmuster zu verankern und tödliche Blind-Rushes zu verhindern.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ist dieses Winkel-Training auf SkillDrills vollständig kostenlos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, SkillDrills stellt dieses Werkzeug uneingeschränkt kostenlos direkt im Browser bereit – ohne Downloads, Installationen oder Registrierung.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Ecken Clearen Trainer Anleitung',
  description: 'Schritt-für-Schritt-Anleitung für optimales Ecken-Clearing, Slicing the Pie und präzise Zielerfassung an Türöffnungen.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Türgeometrie analysieren und Blicksprünge vorbereiten',
      text: 'Erfassen Sie die Ausrichtung des Durchgangs und planen Sie die Priorität der aufeinanderfolgenden Sichtwinkel.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/market-doors-pursuit#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Winkel schrittweise abtasten (Slicing the Pie)',
      text: 'Nähern Sie sich der Kante in feinen Schritten, um jeweils nur ein schmales Sichtsegment des Raumes freizugeben.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/market-doors-pursuit#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Zielausbruch sofort foveal erfassen',
      text: 'Fixieren Sie auftauchende Konturen an den Türrahmen blitzartig mit den Augen, ohne den Kopf ruckartig zu verdrehen.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/market-doors-pursuit#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Präzisen Zentriertreffer setzen',
      text: 'Lösen Sie den gezielten Schuss direkt auf die Zielmitte aus, bevor das Ziel den Erfassungsbereich verlässt.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/market-doors-pursuit#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('rayner1998', 'donders1868', 'woods2015'),
  intro: {
    title: 'Ecken Clearen Trainer & Taktische Winkelaufklärung',
    paragraphs: [
      'Das Beherrschen von Raumkanten, Durchgängen und Türen gehört zu den fundamentalen Fähigkeiten in kompetitiven Taktik-Shootern (Valorant, CS2). Wer unkontrolliert um Ecken rennt, setzt sich simultan mehreren gegnerischen Schusslinien aus und verliert das Duell bereits vor dem ersten Schuss.',
      'Slicing the Pie ist die bewährte Methode, um Raumgeometrien in überschaubare Scheiben zu zerlegen. Bei jedem Teilschritt führen die Augen eine präzise Sakkade (Rayner, 1998) aus, gefolgt von einer extrem schnellen Foveation zur Erkennung verdeckter Gegner.',
      'Mental-chronometrisch handelt es sich um komplexe Wahlreaktionen (Donders, 1868), bei denen das Sehsystem unter Zeitdruck zwischen leerem Raum und aktiven Bedrohungen differenzieren muss. Durch gezieltes Training automatisieren Sie die Vorhaltelinie und minimieren Ihre Reaktionslatenz an Kanten auf Monitoren mit hohen Bildwiederholraten (Woods et al., 2015).',
    ],
  },
  benchmarks: {
    title: 'Leistungs-Benchmarks: Ecken-Clearing und Winkelaufklärung',
    headers: ['Leistungsstufe', 'Rang', 'Aufklärungszeit', 'Präzision', 'Perzentil'],
    rows: [
      ['Tier 1', 'Grandmaster / Pro', '< 160 ms', '98 %+', 'Top 1 %'],
      ['Tier 2', 'Master / Elite', '160 – 210 ms', '94 – 97 %', 'Top 5 %'],
      ['Tier 3', 'Pro / Diamond', '211 – 270 ms', '88 – 93 %', 'Top 15 %'],
      ['Tier 4', 'Intermediate / Gold', '271 – 350 ms', '78 – 87 %', 'Top 50 %'],
      ['Tier 5', 'Novice / Silver', '> 350 ms', '< 78 %', 'Basis'],
    ],
    note: 'Klassifikation basierend auf Reaktions- und Blickbewegungsmessungen (Rayner, 1998; Donders, 1868) unter Berücksichtigung moderner Gaming-Hardware (Woods et al., 2015).',
  },
  protocols: {
    title: 'Wissenschaftliche Trainingsprotokolle',
    description: 'Strukturierte Übungsabläufe zur Festigung taktischer Scan-Muster.',
    items: [
      {
        title: 'Türgeometrie analysieren und Blicksprünge vorbereiten',
        description: 'Erfassen Sie die Ausrichtung des Durchgangs und planen Sie die Priorität der aufeinanderfolgenden Sichtwinkel.',
      },
      {
        title: 'Winkel schrittweise abtasten (Slicing the Pie)',
        description: 'Nähern Sie sich der Kante in feinen Schritten, um jeweils nur ein schmales Sichtsegment des Raumes freizugeben.',
      },
      {
        title: 'Zielausbruch sofort foveal erfassen',
        description: 'Fixieren Sie auftauchende Konturen an den Türrahmen blitzartig mit den Augen, ohne den Kopf ruckartig zu verdrehen.',
      },
      {
        title: 'Präzisen Zentriertreffer setzen',
        description: 'Lösen Sie den gezielten Schuss direkt auf die Zielmitte aus, bevor das Ziel den Erfassungsbereich verlässt.',
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

export default function GermanMarketDoorsPursuitPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
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
      <MarketDoorsPursuitClient copy={{ title: 'Ecken Clearen Trainer' }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="reaction-speed"
          currentHref="https://skilldrills.online/de/drills/reaction-speed/market-doors-pursuit"
        />
      </div>
    </>
  );
}
