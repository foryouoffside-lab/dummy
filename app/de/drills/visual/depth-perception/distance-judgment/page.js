import DistanceJudgmentClient from '@/app/drills/visual/depth-perception/distance-judgment/DistanceJudgmentClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — distance-judgment (German: Räumliches Sehen)
// PRIMARY:  "Räumliches Sehen Test"          — Core diagnostic query
//           "Tiefenwahrnehmung Test Online"  — High intent visual query
// SECONDARY / LSI:
//           "Stereosehen Test"               — Clinical stereopsis search
//           "Entfernungsschätzung Übung"     — Distance estimation
//           "Sehtest räumliches Sehen"       — Driver license / occupational check
//           "Tiefensehen Führerschein"       — License visual requirement
//           "Optisches Looming"              — Expansion rate perception
//           "Howard-Dolman-Test"             — Classic rod test
// ============================================================

export const metadata = {
  title: 'Räumliches Sehen Test – Tiefenwahrnehmung & Stereosehen',
  description: 'Kostenloser Test für räumliches Sehen online. Trainiere Entfernungsschätzung und optisches Looming bei herannahenden Zielen. Wissenschaftlicher Sehtest.',
  keywords: [
    'Räumliches Sehen Test',
    'Tiefenwahrnehmung Test Online',
    'Stereosehen Test',
    'Entfernungsschätzung Übung',
    'Sehtest räumliches Sehen',
    'Tiefensehen Führerschein',
    'Optisches Looming Wahrnehmung',
    'Howard-Dolman-Test',
    'Entfernung schätzen lernen',
    '3D Sehen Test',
    'Augenabstand Sehtest',
    'Tiefenschärfe Auge trainieren',
  ],
  openGraph: {
    title: 'Räumliches Sehen Test – Tiefenwahrnehmung & Stereosehen | SkillDrills',
    description: 'Kostenloser Test für räumliches Sehen online. Trainiere Entfernungsschätzung und optisches Looming bei herannahenden Zielen. Wissenschaftlicher Sehtest.',
    type: 'article',
    url: 'https://skilldrills.online/de/drills/visual/depth-perception/distance-judgment',
    siteName: 'SkillDrills',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Räumliches Sehen Test – Tiefenwahrnehmung & Stereosehen | SkillDrills',
    description: 'Kostenloser Test für räumliches Sehen online. Trainiere Entfernungsschätzung und optisches Looming bei herannahenden Zielen. Wissenschaftlicher Sehtest.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/visual/depth-perception/distance-judgment',
    languages: getAlternateLanguages('/drills/visual/depth-perception/distance-judgment'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://skilldrills.online/de' },
    { '@type': 'ListItem', position: 2, name: 'Visuelle Wahrnehmung', item: 'https://skilldrills.online/de/drills/visual' },
    { '@type': 'ListItem', position: 3, name: 'Tiefenwahrnehmung', item: 'https://skilldrills.online/de/drills/visual/depth-perception' },
    { '@type': 'ListItem', position: 4, name: 'Räumliches Sehen Test', item: 'https://skilldrills.online/de/drills/visual/depth-perception/distance-judgment' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Räumliches Sehen & Tiefenwahrnehmung Test',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Wissenschaftlicher Online-Test für räumliches Sehen, optisches Looming und präzise Entfernungsschätzung herannahender Objekte.',
  url: 'https://skilldrills.online/de/drills/visual/depth-perception/distance-judgment',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online/de' },
  dateModified: '2026-09-05',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Tiefenwahrnehmung Simulator Online',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Moderner Webbrowser mit HTML5 Canvas und kontinuierlicher Pointer-Event-Unterstützung',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  url: 'https://skilldrills.online/de/drills/visual/depth-perception/distance-judgment',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Distance Judgment 3D Wahrnehmungsdrill',
  url: 'https://skilldrills.online/de/drills/visual/depth-perception/distance-judgment',
  description: 'Visueller Interzeptions-Drill zum Training von Tiefenschärfe, Time-to-Contact (TTC) und Zielabfanggenauigkeit.',
  genre: ['Precision Game', 'Visual Training', 'Esports'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Anleitung zur Verbesserung von räumlichem Sehen und Entfernungsschätzung',
  description: 'Systematisches Trainingsprotokoll zur Erkennung optischer Expansion und präzisen zeitlichen Abfangung.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Referenzring und Fluchtpunkt fixieren',
      text: 'Blicke auf den stationären Zielring in der Mitte des virtuellen Tunnels.',
      url: 'https://skilldrills.online/de/drills/visual/depth-perception/distance-judgment#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Herannahendes Objekt beobachten',
      text: 'Verfolge die Kugel, wie sie aus der Tiefe herannaht und auf der Netzhaut expandiert.',
      url: 'https://skilldrills.online/de/drills/visual/depth-perception/distance-judgment#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Exakter Koinzidenz-Abfang',
      text: 'Drücke die Leertaste oder klicke im exakten Moment, in dem die Kugel den Zielring schneidet.',
      url: 'https://skilldrills.online/de/drills/visual/depth-perception/distance-judgment#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Tiefenabweichung analysieren',
      text: 'Überprüfe deine prozentuale Fehlerabweichung und passe deine zeitliche Vorausschau bei höherem Tempo an.',
      url: 'https://skilldrills.online/de/drills/visual/depth-perception/distance-judgment#step-4'
    }
  ]
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Was ist der Test für räumliches Sehen und Entfernungsschätzung?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dieser Test misst deine Fähigkeit, Entfernungen und Annäherungsgeschwindigkeiten im dreidimensionalen Raum präzise zu beurteilen. Er nutzt monokulare Tiefenhinweise wie optisches Looming (Netzhautbildexpansion), um die Time-to-Contact (TTC) zu bestimmen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie unterscheidet sich dieser Test vom klassischen Howard-Dolman-Test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Der Howard-Dolman-Test (1919) verwendet drei physische Stäbchen zur Messung der binokularen Disparität (Stereosehschärfe). Auf einem flachen 2D-Bildschirm entfällt echte Stereoskopie; stattdessen trainiert dieser Test die dynamische optische Expansionsrate (Lee, 1976), die im realen Straßenverkehr und Sport entscheidend ist.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was versteht man unter optischem Looming und Time-to-Contact (TTC)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wenn sich ein Objekt nähert, wächst sein Bild auf der Netzhaut exponentiell. David Lee (1976) bewies mit der Tau-Variable, dass das Gehirn die verbleibende Zeit bis zur Kollision direkt aus dem Verhältnis von Bildgröße zu Expansionsrate berechnet, ohne die absolute Größe oder Distanz zu kennen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Warum ist räumliches Sehen für den Führerschein und Berufskraftfahrer vorgeschrieben?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Beim Überholen, Einfädeln und Rangieren müssen Fahrer Entfernungen zu anderen Fahrzeugen in Sekundenbruchteilen einschätzen. Eine Störung des räumlichen Sehens führt zu gravierenden Fehleinschätzungen des Bremswegs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Warum scheitern viele Menschen an Sehtests für räumliches Sehen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Häufige Ursachen sind unkorrigierte Fehlsichtigkeiten (unterschiedliche Sehstärke beider Augen / Anisometropie), Astigmatismus, Schielen (Strabismus) oder starke Übermüdung der Augenmuskeln durch Bildschirmarbeit.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kann man räumliches Sehen und Entfernungsschätzung trainieren?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Während grobe anatomische Defekte augenärztlich korrigiert werden müssen, kann die neuronale Verarbeitungsgeschwindigkeit für optisches Looming und zeitliche Interzeption durch wiederholtes dynamisches Training messbar geschärft werden.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie wird die Fehlerabweichung im Test berechnet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die Abweichung wird als relativer prozentualer Fehler zwischen dem Durchmesser des Objekts beim Klick und dem Durchmesser des Referenzrings berechnet. Ein Fehler unter 5 % gilt als perfekte Koinzidenz.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Rolle spielt räumliches Sehen in Sportarten wie Tennis oder Baseball?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Athleten müssen die Flugbahn eines schnellen Balls in 200 bis 400 Millisekunden antizipieren. Die visuelle Extraktion der Expansionsrate steuert den exakten Zeitpunkt des Schwungs auf die Millisekunde genau.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Rolle spielt die Bildwiederholrate (Hz) des Monitors bei diesem Test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Monitore mit 144 Hz oder 240 Hz reduzieren die Anzeigeverzögerung auf unter 7 ms gegenüber 16,7 ms bei 60 Hz. Dies ermöglicht eine feinkörnigere visuelle Erkennung der Expansionskante im Moment des Abfangs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Werden persönliche Daten oder Ergebnisse auf externen Servern gespeichert?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nein. Sämtliche Messungen und Bestleistungen werden ausschließlich lokal im LocalStorage deines Browsers gespeichert. Es erfolgt keine Weitergabe oder zentrale Profilbildung.',
      },
    },
  ],
};

const distanceGuideDe = {
  heading: 'Standards für räumliches Sehen & Tiefenwahrnehmung',
  intro: [
    'Tiefenwahrnehmung (Stereosehen und räumliches Urteilsvermögen) ist die sensorische und neurologische Fähigkeit, den Raum dreidimensional zu erfassen und Entfernungen, räumliche Tiefenstaffelungen sowie Annäherungsgeschwindigkeiten von Objekten präzise zu beurteilen. Im Motorsport, in der Luftfahrt, beim Führen von Nutzfahrzeugen (Führerschein-Sehtest nach FeV) und im wettbewerbsorientierten E-Sport entscheidet diese Fähigkeit im Bruchteil einer Sekunde über erfolgreiches Abfangen oder folgenschwere Kollisionen.',
    'Dieser Drill operationalisiert die geometrischen Grundlagen des klassischen Howard-Dolman-Stereoapparats (Howard, 1919) und der ökologischen Optik von David N. Lee (1976) sowie David Regan & Kenneth I. Beverley (1978). Durch das Projizieren einer dreidimensionalen Kugel entlang eines virtuellen Tunnels auf eine feste Referenzebene trainiert der Drill das visuelle System, optische Expansionsraten (Looming) und die geschätzte Kontaktzeit (Time-to-Contact, τ) unter stetig ansteigenden Geschwindigkeiten exakt zu berechnen.',
    'Präzision & Messmethodik: Sämtliche Zeitstempel werden lokal über die hochauflösende performance.now()-Schnittstelle des Browsers mit Submillisekunden-Genauigkeit erfasst. Die Abweichung wird als relativer prozentualer Durchmesserfehler errechnet (|Tatsächlicher Durchmesser - Zieldurchmesser| / Zieldurchmesser). Physikalische Latenzen wie Monitor-Quantisierungszeiten (~16,7 ms bei 60 Hz, ~6,9 ms bei 144 Hz, ~4,1 ms bei 240 Hz) und USB-Abtastraten (125 Hz vs. 1000 Hz) bedingen messtechnische Toleranzen (Woods et al., 2015). Differenzen unter 5 ms stellen Messrauschen dar; vergleichen Sie Ergebnisse primär auf demselben Hardwaresetup.',
    'Datenschutz & Transparenz: SkillDrills erfasst keinerlei personenbezogene Daten, diagnostische Sehprofile oder zentrale Telemetrie. Sämtliche Bestleistungen, Fehlerquoten und Levelstufen verbleiben ausschließlich im lokalen Speicher (LocalStorage) Ihres Webbrowsers.'
  ],
  benchmarks: {
    title: 'Referenztabelle für Tiefenwahrnehmung & Abfanggenauigkeit',
    headers: ['Leistungsstufe', 'Mittlere Tiefenabweichung', 'Punkte & Level', 'Visuelles Profil'],
    rows: [
      ['Tier 1: Apex Stereoskopie-Meister', 'Unter 5,0 % Fehler', '1500+ Pkt | Level 7+', 'Exzellente Looming-Wahrnehmung, perfekte zeitliche Koinzidenz.'],
      ['Tier 2: Hohe Tiefenschärfe', '5,0 % – 9,9 % Fehler', '1100 – 1499 Pkt | Level 5–6', 'Starke räumliche Vorausschau, sichere Anpassung an hohes Tempo.'],
      ['Tier 3: Solide Basis-Wahrnehmung', '10,0 % – 15,9 % Fehler', '750 – 1099 Pkt | Level 3–4', 'Durchschnittliche gesunde Schärfe, leichte Latenz bei Höchsttempo.'],
      ['Tier 4: Mäßige Tiefensensitivität', '16,0 % – 25,0 % Fehler', '450 – 749 Pkt | Level 2', 'Neigung zu verfrühtem Auslösen vor echter Deckungsgleichheit.'],
      ['Tier 5: Entwicklungsbedarf', 'Über 25,0 % Fehler', 'Unter 450 Pkt | Level 1', 'Erhebliche zeitliche Schätzfehler, erhöhte Reaktionsstreuung.'],
    ],
  },
  protocols: {
    title: 'Trainingsprotokolle zur Schärfung des räumlichen Sehens',
    items: [
      {
        title: 'Protokoll 1: Optische Expansion & TTC-Kalkulation (Lee 1976)',
        description: 'Fokussiere nicht die Kugelmitte, sondern achte auf die Wachstumsgeschwindigkeit des äußeren Rands im Verhältnis zum Zielring.',
      },
      {
        title: 'Protokoll 2: Unterdrückung von vorzeitigem Auslösedrang',
        description: 'Widerstehe dem Impuls, bei Beschleunigung zu früh zu klicken. Warte auf die vollständige geometrische Überlappung.',
      },
      {
        title: 'Protokoll 3: Blickverankerung auf der Zielebene',
        description: 'Halte den Blick fest auf dem Zielring verankert, anstatt mit den Augen der herannahenden Kugel hinterherzuspringen.',
      },
      {
        title: 'Protokoll 4: Rhythmische Atmung & okuläre Entspannung',
        description: 'Vermeide Verkrampfung der Augenlider; blinzle zwischen den Versuchen, um den Tränenfilm stabil zu halten.',
      },
    ],
  },
  steps: [
    'Klicken Sie auf "Test starten", um die 45-sekündige Sitzung zur Tiefenwahrnehmung zu beginnen.',
    'Fixieren Sie den Blick stabil auf dem zyanfarbenen Zielring in der mittleren Tiefenebene.',
    'Beobachten Sie die 3D-Kugel, die am fernen Ende des Tunnels erscheint und auf Sie zubeschleunigt.',
    'Klicken Sie mit der Maus, tippen Sie auf den Bildschirm oder drücken Sie die Leertaste genau in dem Moment, in dem die Kugel den Zielring perfekt ausfüllt.',
    'Verfolgen Sie Ihre Präzisionsauswertung (<5% Fehler: Perfekt / +150 PKT) und passen Sie sich den steigenden Geschwindigkeiten über 45 Sekunden an.'
  ],
  audience: 'Kraftfahrer und Berufskraftfahrer zur Vorbereitung auf den Sehtest für LKW- und Personenbeförderungs-Führerscheine, Sportler in Ballsportarten (Tennis, Baseball, Tischtennis), Piloten sowie Gamer, die ihre räumliche Einschätzung und ihr Abfang-Timing schulen möchten.',
  faqs: {
    title: 'Häufig gestellte Fragen zu räumlichem Sehen & Tiefentest',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
  sources: pickSources('howard1919', 'lee1976', 'regan1978', 'julesz1971', 'woods2015'),
  related: [
    { href: "/drills/visual/tracking-accuracy/moving-target", label: "Bewegtes Ziel Abfangen" },
    { href: "/drills/visual/reaction-speed/light-reaction", label: "Licht-Reaktionstest" },
    { href: "/drills/visual/tracking-accuracy/multiple-targets", label: "Multi-Objekt-Tracking" },
    { href: "/drills/visual/tracking-accuracy/pursuit-tracker", label: "Blickfolge-Tracker" },
    { href: "/drills/visual/reaction-speed/go/no-go", label: "Go / No-Go Impulskontrolle" },
    { href: "/drills/visual/visual-recognition/entropic-grid", label: "Entropisches Rastersuchen" }
  ]
};

const copyDe = {
  title: 'Räumliches Sehen Test',
  subtitle: 'Tiefenwahrnehmung & 3D-Interzeptions-Labor',
  caption: 'Tiefenwahrnehmung ist die Beurteilung von Entfernung und räumlicher Reihenfolge. Auf einem flachen Bildschirm wird vor allem die optische Expansionsrate (Lee, 1976; Regan & Beverley, 1978) gemessen — die Geschwindigkeit, mit der das Bild auf der Netzhaut wächst, bestimmt die Time-to-Contact ohne Vorkenntnis von Größe oder Distanz.',
  statScore: 'Punkte',
  statTime: 'Zeit',
  statLevel: 'Level',
  statBestScore: 'Rekord',
  startTitle: 'Räumliches Sehen Pro',
  startSubtitle: '3D-Tiefenbeurteilung • Optischer Interzeptionsdrill',
  startBtn: 'Test starten',
  getReady: 'BEREITMACHEN',
  newBest: 'NEUER REKORD',
  statPoints: 'Punkte',
  statAccuracy: 'Genauigkeit',
  statPeakLevel: 'Höchstlevel',
  statIntercepts: 'Volltreffer',
  playAgain: 'Nochmal spielen',
  shareScore: 'Ergebnis teilen',
  returnOptions: 'Zurück',
  rulesTitle: 'Testregeln & Bewertung',
  rule1Text: 'Perfekter Koinzidenz-Abfang',
  rule1Highlight: '+150 PKT',
  rule1Result: 'Unter 5% Tiefenfehler',
  rule2Text: 'Guter Koinzidenz-Abfang',
  rule2Highlight: '+100 PKT',
  rule2Result: 'Unter 12% Tiefenfehler',
  rule3Text: 'Stufenweise Beschleunigung',
  rule3Highlight: 'Höheres Tempo',
  rule3Result: 'Objekt nähert sich schneller',
  rule4Text: 'Verfehlen / Zeitüberschreitung',
  rule4Highlight: 'Kein Punktabzug',
  rule4Result: 'Nächstes Objekt startet sofort',
  aboutTitle: 'Über den Test für räumliches Sehen',
  overviewTitle: 'Was misst dieser Tiefenwahrnehmungstest?',
  overviewLead: 'Räumliches Sehen ermöglicht es dem Menschen, Entfernungen einzuschätzen und Objekte im dreidimensionalen Raum zielsicher abzufangen.',
  overviewBody: 'Der Test nutzt die optische Expansionsrate (Looming), um die Reaktionsgenauigkeit bei herannahenden Zielen zu bewerten. Er schult das Zusammenspiel von visueller Wahrnehmung und motorischer Timing-Präzision.',
  aboutCards: [
    { iconBg: 'bg-blue-600', title: 'Zielgruppe', text: 'Autofahrer, Sportler (Tennis, Ballsport), Gamer und Berufstätige mit hohen Anforderungen an räumliche Orientierung.' },
    { iconBg: 'bg-cyan-600', title: 'Trainierte Fähigkeiten', text: 'Optisches Looming, Time-to-Contact Berechnung, Auge-Hand-Timing und räumliche Antizipation.' },
    { iconBg: 'bg-purple-600', title: 'Erfolgstipp', text: 'Blicke auf den stationären Zielring und löse im Moment der vollständigen Deckungsgleichheit aus.' }
  ]
};

export default function GermanDistanceJudgmentPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DistanceJudgmentClient copy={copyDe} />
      <DrillGuide guide={distanceGuideDe} />
      <RelatedDrills currentCategory="visual" currentHref="/drills/visual/depth-perception/distance-judgment" locale="de" />
    </>
  );
}
