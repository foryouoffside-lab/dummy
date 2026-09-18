import ReactionTimeTestWrapper from '@/app/drills/reaction-speed/reaction-time-test/ReactionTimeTestWrapperLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — de-DE (reaction-speed / reaction-time-test)
// PRIMARY DOMESTIC: "reaktionstest"     — 476 exact / 550 broad searches/mo (Domestic #1 winner)
//                    "reaktionszeit test" — 283 exact / 306 broad searches/mo (Domestic #2 winner)
// SECONDARY / LSI:
//                    "reaktionszeit"     — 820+ broad searches/mo
//                    "reflex test"       — 140+ searches/mo
//                    "reaktionstest online" — High utility intent
//                    "reaktionszeit messen" — Measurement intent
//                    "reaktionstest gaming" — Gaming & Esports intent
// DUAL-WINNER TITLE: Reaktionstest (Reaktionszeit Test) – Kostenloser Reflex-Test online | SkillDrills
// ============================================================

export const metadata = {
  title: 'Reaktionstest Online – Reaktionszeit messen | SkillDrills',
  description:
    'Kostenloser Reaktionstest online: Messe deine visuelle Reaktionszeit in Millisekunden (ms) und vergleiche deinen Wert mit Benchmarks im Browser.',
  keywords: [
    'reaktionstest',
    'reaktionszeit test',
    'reaktionszeit',
    'reaktionstest online',
    'reaktionszeit messen',
    'millisekunden reaktionstest',
    'reaktionstest gaming',
    'reflexe trainieren',
    'reaktionsgeschwindigkeit',
    'reflextest online',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/reaction-speed/reaction-time-test',
    languages: getAlternateLanguages('/drills/reaction-speed/reaction-time-test'),
  },
  openGraph: {
    title: 'Reaktionstest Online – Reaktionszeit messen | SkillDrills',
    description:
      'Kostenloser Reaktionstest online: Messe deine visuelle Reaktionszeit in Millisekunden (ms) und vergleiche deinen Wert mit wissenschaftlichen Benchmarks.',
    url: 'https://skilldrills.online/de/drills/reaction-speed/reaction-time-test',
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reaktionstest Online – Reaktionszeit messen | SkillDrills',
    description:
      'Messe deine visuelle Reaktionszeit in Millisekunden (ms) online kostenlos. Präzise Messung und Einstufung im Browser ohne Download.',
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
    { '@type': 'ListItem', position: 4, name: 'Reaktionstest', item: 'https://skilldrills.online/de/drills/reaction-speed/reaction-time-test' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Reaktionstest (Reaktionszeit Test) – Kostenloses Reflex-Messwerkzeug',
  alternateName: ['Reaktionstest', 'Reaktionszeit Test', 'Reflex Test Online', 'Gaming Reaktionstest'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description:
    'Präzises browserbasiertes Werkzeug zur Messung der visuellen Reaktionszeit in Millisekunden. Enthält wissenschaftliche Benchmarks, Esports-Ranglisten und Intervall-Timing-Training.',
  browserRequirements: 'Moderner Webbrowser mit JavaScript-Unterstützung (Chrome, Firefox, Safari, Edge)',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Reaktionstest — Kostenloser visueller Reflex-Test | SkillDrills',
  url: 'https://skilldrills.online/de/drills/reaction-speed/reaction-time-test',
  description:
    'Kostenloses Online-Tool zur Messung der visuellen Reaktionszeit und Reflexe in Millisekunden.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'Erfordert einen modernen Webbrowser mit JavaScript.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: 'Reaktionszeit, Reaktionsgeschwindigkeit, Visuelle Reizverarbeitung, Neuromuskuläre Latenz',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Reaktionstest - Kostenloser visueller Reflex-Geschwindigkeitstest',
  url: 'https://skilldrills.online/de/drills/reaction-speed/reaction-time-test',
  description: 'Reaktionstest - Kostenloser visueller Reflex-Geschwindigkeitstest',
  genre: ['Reflex Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Anleitung: Visuelle Reaktionszeit messen',
  description: 'So messen Sie Ihre Reaktionsgeschwindigkeit präzise im Browser.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Test starten',
      text: 'Klicken Sie auf «Drill starten», um das Testfeld im Vollbildmodus zu öffnen.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/reaction-time-test#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Zielintervall einprägen',
      text: 'Merken Sie sich das angezeigte Millisekunden-Zielintervall und konzentrieren Sie sich auf die Mitte.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/reaction-time-test#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Im richtigen Moment klicken',
      text: 'Klicken Sie mit der Maus oder tippen Sie auf den Bildschirm, sobald das Signal ausgelöst wird.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/reaction-time-test#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Millisekunden-Auswertung prüfen',
      text: 'Überprüfen Sie Ihre durchschnittliche Abweichung, Genauigkeit und Gaming-Rangstufe.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/reaction-time-test#step-4'
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
      name: 'Was ist eine gute Reaktionszeit beim Menschen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die durchschnittliche menschliche Reaktionszeit auf visuelle Reize liegt bei etwa 200 bis 250 Millisekunden (ms) (Kosinski, 2008). Werte unter 200 ms gelten als überdurchschnittlich schnell, und Zeiten unter 180 ms erreichen das Niveau von professionellen E-Sportlern und Formel-1-Fahrern.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie wird die Reaktionszeit online gemessen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die Zeitspanne zwischen dem Erscheinen des visuellen Reizes auf dem Monitor und dem Registrieren des Klicks wird über die hochauflösende performance.now() API des Browsers im Sub-Millisekundenbereich clientseitig erfasst (Woods et al., 2015).',
      },
    },
    {
      '@type': 'Question',
      name: 'Kann man seine Reaktionszeit durch Training verbessern?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Durch regelmäßiges Reaktionstraining werden die visuellen Wahrnehmungswege und die motorische Signalübertragung optimiert, was die Reaktionszeit typischerweise um 15 bis 30 Millisekunden verkürzen kann (Dye, Green, & Bavelier, 2009).',
      },
    },
    {
      '@type': 'Question',
      name: 'Warum schwankt die Reaktionszeit von Tag zu Tag?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Reaktionszeiten hängen stark von Schlafdauer, zirkadianem Rhythmus, kognitiver Ermüdung, Konzentration, Kaffeekonsum sowie der Monitor-Bildwiederholrate und Eingabeverzögerung der Hardware ab.',
      },
    },
    {
      '@type': 'Question',
      name: 'Beeinflusst die Bildwiederholrate (Hz) des Monitors das Ergebnis?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, signifikant. Ein standardmäßiger 60-Hz-Monitor hat eine Bildaufbauzeit von 16,67 ms pro Frame. Gaming-Monitore mit 144 Hz (6,94 ms) oder 240 Hz (4,17 ms) stellen den Reiz früher dar und reduzieren die gemessene Hardware-Latenz um rund 10 bis 12 ms (Woods et al., 2015).',
      },
    },
    {
      '@type': 'Question',
      name: 'Was ist der Unterschied zwischen einem Reflex und einer Reaktion?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ein Reflex ist ein unwillkürlicher Rückenmarksbogen (wie der Kniesehnenreflex), der ohne Beteiligung des Gehirns in 20 bis 50 ms abläuft. Eine Reaktion erfordert die bewusste Reizverarbeitung im visuellen Kortex und motorische Befehle des Gehirns (150 bis 250+ ms).',
      },
    },
    {
      '@type': 'Question',
      name: 'Warum reagiert man auf Töne schneller als auf optische Reize?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Auditorische Signale erreichen den auditorischen Kortex im Hirnstamm in 8 bis 10 ms, während die Signalumwandlung in der Netzhaut und der Weg zum visuellen Kortex 20 bis 40 ms dauert. Akustische Reaktionen (140–160 ms) sind daher 30 bis 50 ms schneller (Shelton & Kumar, 2010).',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie verändert sich die Reaktionsgeschwindigkeit im Alter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die einfache Reaktionszeit erreicht zwischen dem 18. und 24. Lebensjahr ihren Höchstwert und verlangsamt sich danach um etwa 2 bis 6 ms pro Jahrzehnt (Der & Deary, 2006). Regelmäßiges Training und Sport verlangsamen diesen Prozess deutlich.',
      },
    },
    {
      '@type': 'Question',
      name: 'Verkürzt Koffein die Reaktionszeit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Eine moderate Dosis Koffein blockiert Adenosinrezeptoren im Zentralnervensystem, erhöht die Wachheit und kann die Reaktionszeit vorübergehend um 10 bis 20 ms verbessern (Smith, 2002).',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie unterscheidet sich dieser Test von Human Benchmark?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Während Human Benchmark primär einfache Rot-zu-Grün-Klicks misst, trainiert SkillDrills die mentale Chronometrie (Zeitintervallschätzung), verhindert unüberlegtes Vorabklicken und bietet Combo-Multiplikatoren für realistischere Wettkampfbedingungen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche E-Sport-Titel profitieren von schnellen Reflexen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Taktische Shooter wie CS2 und Valorant, Battle-Royale-Games wie Apex Legends sowie MOBAs (League of Legends) verlangen blitzschnelle Reaktionen beim Abfangen von Peeks und Ausweichen von Fähigkeiten.',
      },
    },
    {
      '@type': 'Question',
      name: 'Funktioniert der Reaktionstest auf Smartphones und Tablets?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, das Testfeld ist vollständig responsiv für Touchscreens optimiert und funktioniert auf iOS und Android im Hoch- sowie Querformat ohne Installation.',
      },
    },
  ],
};

const reactionGuide = {
  heading: 'Reaktionstest Leitfaden & Benchmarks',
  intro: [
    'Die visuelle Reaktionszeit beschreibt das Intervall zwischen dem Auftreten eines optischen Reizes und der Ausführung der entsprechenden Muskelbewegung (z. B. Mausklick).',
    'In kompetitiven Shootern wie Valorant und CS2 sowie im Motorsport entscheiden Millisekunden darüber, wer das Duell gewinnt oder Hindernissen rechtzeitig ausweicht.',
    'Messmethode: Alle Zeitmessungen erfolgen lokal im Browser über die hochauflösende performance.now() API mit Sub-Millisekunden-Präzision. Es findet keine Verzögerung durch Server-Übertragungen statt.',
    'Hardware-Einfluss: Ein Standardmonitor mit 60 Hz fügt bis zu 16,7 ms Anzeigelatenz pro Frame hinzu, während 144 Hz (6,9 ms) oder 240 Hz (4,2 ms) Monitore und eine Gaming-Maus mit 1000 Hz Polling-Rate Messverfälschungen minimieren (Woods et al., 2015).',
  ],
  benchmarks: {
    title: 'Reaktionszeit Referenztabelle & Gaming-Einstufung',
    headers: ['Reaktionszeit (ms)', 'Klassifizierung', 'Perzentil', 'Gaming-Rang Äquivalent', 'Neurologisches Profil'],
    rows: [
      ['< 150 ms', 'Übermenschlich / Godlike', 'Top 1%', 'F1-Fahrer / Radiant-Profis', 'Extremes Timing-Gefühl, Vorwegnahme und neuronale Bestwerte'],
      ['150 – 190 ms', 'Elite-Kompetitiv', 'Top 5%', 'Immortal / Faceit Level 10', 'Herausragende Reizverarbeitung und blitzschnelle Muskelkontraktion'],
      ['190 – 240 ms', 'Fortgeschrittener Gamer', 'Top 25%', 'Diamond / Ascendant', 'Sehr gute Reizunterscheidung und stabiles Abfeuern des Fadenkreuzes'],
      ['240 – 280 ms', 'Menschlicher Durchschnitt', 'Mittelwert 50%', 'Gold / Platinum', 'Typischer gesunder Erwachsener unter Standard-60Hz-Bedingungen'],
      ['> 300 ms', 'Gelegenheitsspieler', 'Unterste 20%', 'Silber / Bronze', 'Verlangsamung durch Müdigkeit, Unaufmerksamkeit oder Hardware-Latenz'],
    ],
    note: 'Diese Werte basieren auf neurowissenschaftlicher Reaktionszeit-Literatur (Kosinski, 2008; Woods et al., 2015). 60Hz-Monitore fügen ca. 16,7 ms Bildverzögerung hinzu.',
  },
  techniques: {
    title: 'Sensorische Latenz & Physiologische Mechanismen',
    items: [
      {
        name: 'Visuelle Reizübertragung (~200–250 ms)',
        desc: 'Photonen treffen auf die Netzhaut, werden in elektrische Nervenimpulse umgewandelt, erreichen den primären visuellen Kortex (V1) und senden den Klickbefehl über den motorischen Kortex an den Finger (Kosinski, 2008).',
        tips: 'Halten Sie einen entspannten, weiten Blickwinkel, damit die peripheren Stäbchenzellen Lichtblitze schneller erfassen können.',
      },
      {
        name: 'Auditorische Reaktionsüberlegenheit (~140–170 ms)',
        desc: 'Schallwellen erreichen die Hörrinde über den Hirnstamm deutlich schneller als Lichtsignale die Sehrinde. Deshalb reagiert das Gehirn auf Töne 30 bis 50 ms schneller (Shelton & Kumar, 2010; Jain et al., 2015).',
        tips: 'Nutzen Sie in Shootern stets akustische Hinweise wie Schritte oder Nachladegeräusche als primären Auslöser.',
      },
      {
        name: 'Taktile Reizverarbeitung (~130–160 ms)',
        desc: 'Vibrationen und Berührungsreize umgehen komplexe visuelle Auswertungsstufen und führen zu extrem schnellen Reflexreaktionen.',
        tips: 'Mechanische Mausschalter mit klarem taktilem Druckpunkt verringern die Auslöseverzögerung.',
      },
      {
        name: 'Optimierung von Bildschirm & Peripherie',
        desc: 'Ein 60Hz-Monitor benötigt 16,7 ms pro Frame, während ein 240Hz-Esports-Monitor die Bildlatenz auf 4,1 ms senkt (Woods et al., 2015).',
        tips: 'Nutzen Sie eine Gaming-Maus mit 1000 Hz Abtastrate und schalten Sie V-Sync im Grafiktreiber aus.',
      },
    ],
  },
  steps: [
    'Klicken Sie auf «Drill starten», um den Vollbild-Reaktionstest zu öffnen.',
    'Beachten Sie das angezeigte Zielintervall und fokussieren Sie die Mitte.',
    'Klicken Sie sofort mit der Maus oder tippen Sie, sobald das Signal ausgelöst wird.',
    'Wiederholen Sie den Test mehrfach, um Ihre Latenz, Genauigkeit und Rangstufe zu ermitteln.',
  ],
  audience: 'FPS- und MOBA-Spieler, Rennsportler, Athleten und alle, die ihre Reaktionsschnelligkeit und Reflexe objektiv messen und trainieren wollen.',
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('kosinski2008', 'woods2015', 'jain2015', 'shelton2010', 'dye2009', 'der2006', 'smith2002'),
  related: [
    { href: '/de/drills/reaction-speed', label: 'Reaktionsschnelligkeit Hub' },
    { href: '/de/drills/motor/movement-speed/rapid-tapping', label: 'CPS Test & Klick-Geschwindigkeit' },
    { href: '/de/drills/reaction-speed/fps-tracking-trainer', label: 'FPS Tracking Trainer' },
    { href: '/de/drills/fps/flick-shot-training', label: 'Flick Shot Trainer' },
  ],
};

export default function GermanReactionTimeTestPage() {
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
      <ReactionTimeTestWrapper copy={{ title: 'Reaktionstest' }} />
      <DrillGuide guide={reactionGuide} />
    </>
  );
}
