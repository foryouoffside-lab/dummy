import SteadyHandClient from '@/app/drills/motor/precision-control/steady-hand/SteadyHandClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — steady-hand (German: Heißer Draht)
// PRIMARY:  "Heißer Draht Online"           — Authentic cultural query
//           "Heißer Draht Spiel"            — Gaming query
// SECONDARY / LSI:
//           "Ruhige Hand Spiel"             — Steady hand gaming query
//           "Maus Präzisionstest"           — Precision diagnostic search
//           "Handzittern Test Online"       — Physiological tremor assessment
//           "Feinmotorik Test Maus"         — Fine motor control query
//           "Mausführung trainieren"        — Training intent
//           "Accot-Zhai Steuerungsgesetz"   — Steering Law
// ============================================================

export const metadata = {
  title: 'Heißer Draht Online – Ruhige Hand & Maus Präzisionstest',
  description: 'Kostenloses Heißer Draht Spiel online. Steuere den Cursor durch engere Kurven ohne Wandkontakt. Präziser Feinmotorik-Test nach dem Accot-Zhai-Gesetz.',
  keywords: [
    'Heißer Draht Online',
    'Heißer Draht Spiel',
    'Ruhige Hand Spiel',
    'Maus Präzisionstest',
    'Handzittern Test Online',
    'Feinmotorik Test Maus',
    'Mausführung trainieren',
    'Accot-Zhai Steuerungsgesetz',
    'Maus Parcours Spiel',
    'Cursor Präzision Test',
    'Aim Stabilität Maus',
    'Zittertest Hand',
  ],
  openGraph: {
    title: 'Heißer Draht Online – Ruhige Hand & Maus Präzisionstest | SkillDrills',
    description: 'Kostenloses Heißer Draht Spiel online. Steuere den Cursor durch engere Kurven ohne Wandkontakt. Präziser Feinmotorik-Test nach dem Accot-Zhai-Gesetz.',
    type: 'article',
    url: 'https://skilldrills.online/de/drills/motor/precision-control/steady-hand',
    siteName: 'SkillDrills',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Heißer Draht Online – Ruhige Hand & Maus Präzisionstest | SkillDrills',
    description: 'Kostenloses Heißer Draht Spiel online. Steuere den Cursor durch engere Kurven ohne Wandkontakt. Präziser Feinmotorik-Test nach dem Accot-Zhai-Gesetz.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/motor/precision-control/steady-hand',
    languages: getAlternateLanguages('/drills/motor/precision-control/steady-hand'),
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://skilldrills.online/de' },
    { '@type': 'ListItem', position: 2, name: 'Motorik-Training', item: 'https://skilldrills.online/de/drills/motor' },
    { '@type': 'ListItem', position: 3, name: 'Präzisionskontrolle', item: 'https://skilldrills.online/de/drills/motor/precision-control' },
    { '@type': 'ListItem', position: 4, name: 'Heißer Draht', item: 'https://skilldrills.online/de/drills/motor/precision-control/steady-hand' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Heißer Draht – Maus-Präzision & Feinmotorik-Test',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Kostenloses browserbasiertes Heißer Draht Spiel und Maus-Präzisionstest. Bewege den Cursor durch dynamisch enger werdende Kurven und messe Handruhe sowie Steuerungsdurchsatz.',
  url: 'https://skilldrills.online/de/drills/motor/precision-control/steady-hand',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online/de' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Heißer Draht Online Parcours',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Moderner Webbrowser mit HTML5 Canvas und Pointer Events API Unterstützung',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  url: 'https://skilldrills.online/de/drills/motor/precision-control/steady-hand',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Heißer Draht Feinmotorik-Drill',
  url: 'https://skilldrills.online/de/drills/motor/precision-control/steady-hand',
  description: 'Online-Geschicklichkeitsspiel zum Testen von Mauspräzision, physiologischer Handruhe und Lenkgeschwindigkeit.',
  genre: ['Precision Game', 'Action', 'Esports Training'],
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
      name: 'Was ist das Online-Spiel „Heißer Draht“ und welche Fähigkeiten misst es?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Das Heißer-Draht-Spiel ist eine neuromotorische Präzisionsprüfung, bei der ein Cursor kontinuierlich entlang eines gewundenen Pfades gesteuert werden muss, ohne die Begrenzungswände zu berühren. Es misst Handruhe, visuelles Feedback in Echtzeit und die Dämpfung des physiologischen Zitters unter zunehmender Verengung.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welches wissenschaftliche Gesetz bestimmt die Mausbewegung in engen Kanälen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die Bewegung in begrenzten Korridoren folgt dem Accot-Zhai-Steuerungsgesetz (Accot & Zhai, 1997), einer Erweiterung von Fitts\' Gesetz für Trajektorien. Es besagt, dass die Lenkzeit proportional zum Integral aus Pfadlänge dividiert durch Kanalbreite ist: Schmalere Wege erzwingen mathematisch ein langsameres Tempo, um Kollisionen zu vermeiden.',
      },
    },
    {
      '@type': 'Question',
      name: 'Warum setzt sich der Cursor bei Wandkontakt sofort an den Start zurück?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die Spiel-Engine berechnet in jedem Frame die euklidische Distanz zwischen Mausposition und Pfadmittellinie. Übersteigt die Abweichung die halbe Kanalbreite, erfolgt ein sofortiger Abbruch, um kompromisslose Null-Toleranz-Präzision zu fordern.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie skaliert die Kanalbreite bei aufeinanderfolgenden Runden?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Der Korridor beginnt in Runde 1 mit einer großzügigen Breite von 50 Pixeln und verengt sich mit jeder fehlerfreien Runde stufenweise bis auf extrem schmale 12 Pixel ab Level 12, was höchste neuromuskuläre Kontrolle erfordert.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was verursacht Handzittern (physiologischen Tremor) bei feinen Mausbewegungen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Normaler physiologischer Tremor (8–12 Hz) entsteht durch synchrone Entladungen von motorischen Einheiten und mechanische Resonanz des Arms. Zu starkes Verkrampfen der Finger, Nervosität oder Koffein verstärken diese Schwingung und führen zu Wandkollisionen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welcher Mausgriff und welche DPI-Einstellung eignen sich am besten?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ein entspannter Fingertip- oder Claw-Grip, der Unterarmgleiten mit feinen Fingermikrokorrekturen kombiniert, ist ideal. Niedrigere Empfindlichkeiten von 400 bis 800 DPI filtern feine Zitterbewegungen mechanisch besser heraus als extrem hohe DPI-Werte.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie erklärt Woodworths Zwei-Komponenten-Modell (1899) die Pfadnavigation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Robert S. Woodworth zeigte, dass Zielbewegungen aus einem ballistischen Anfangsimpuls und einer nachfolgenden Rückkopplungsphase bestehen. Beim Heißen Draht dominiert die geschlossene Regelkreis-Phase, in der das Auge kontinuierlich Mikrokurskorrekturen vor dem Wandkontakt veranlasst.',
      },
    },
    {
      '@type': 'Question',
      name: 'Können Chirurgen, Grafiker und E-Sportler vom Heißen Draht profitieren?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Sowohl die minimalinvasive Laparoskopie als auch digitale Vektorillustration und präzises Tracking im E-Sport erfordern exzellente Tremordämpfung und kontinuierliche feinmotorische Pfadführung unter Zeitdruck.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie beugt man Unterarmkrämpfen und Ermüdung vor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Halte den Ellenbogen im 90-Grad-Winkel gestützt und drücke die Maus nicht fest auf das Pad. Atme vor engen Kurven bewusst aus, um Schultern und Unterarmmuskeln zu entspannen, und lege nach 5 Minuten kurze Pausen ein.',
      },
    },
    {
      '@type': 'Question',
      name: 'Funktioniert der Heißer Draht Test auch mit Trackballs oder Grafiktabletts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Die Plattform nutzt standardisierte Pointer Events und unterstützt optische Gaming-Mäuse, Trackballs sowie Stift-Tabletts zur individuellen Analyse der Handruhe.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Anleitung zur Steigerung der Handruhe und Mauspräzision',
  description: 'Schritt-für-Schritt-Protokoll zur Bewältigung enger Parcours-Kurven und Beherrschung des Steuerungsgesetzes.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      url: 'https://skilldrills.online/de/drills/motor/precision-control/steady-hand#step-1',
      name: 'Cursor in der Startzone platzieren',
      text: 'Klicke auf „Drill starten“ und platziere den Mauszeiger in der grünen Startzone, um die Zeitmessung und den Leuchtpfad zu aktivieren.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      url: 'https://skilldrills.online/de/drills/motor/precision-control/steady-hand#step-2',
      name: 'Gleichmäßige Geschwindigkeit auf der Linie halten',
      text: 'Gleite gleichmäßig durch den leuchtenden Pfad. Finde die Balance zwischen Vorwärtsdrang und Präzision, um das 45-Sekunden-Zeitfenster einzuhalten.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      url: 'https://skilldrills.online/de/drills/motor/precision-control/steady-hand#step-3',
      name: 'Kurven vorausschauend ansteuern',
      text: 'Verringere vor engen Haarnadelkurven die Geschwindigkeit um ca. 40 % und richte deinen Blick ca. 20 bis 30 Pixel vor den Cursor.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      url: 'https://skilldrills.online/de/drills/motor/precision-control/steady-hand#step-4',
      name: 'Zielzone erreichen für höhere Schwierigkeit',
      text: 'Erreiche die grüne Endzone, um die Runde abzuschließen. Die Zeit wird zurückgesetzt und der Korridor verengt sich für die nächste Runde.',
    },
  ],
};

const guideProps = {
  sources: pickSources('accot1997', 'woodworth1899', 'fitts1954', 'woods2015'),
  intro: {
    title: 'Wie Handruhe und Feinmotorik gemessen werden',
    paragraphs: [
      'Messgenauigkeit und Hardware-Einflüsse: Die Zeitmessung basiert auf der performance.now() API des Browsers, die zur Abwehr von Seitenkanalangriffen auf etwa 1 ms gerundet wird. Die optische Anzeige ist an die Bildwiederholrate des Monitors gebunden — ca. 16,7 ms bei 60 Hz, 6,9 ms bei 144 Hz und 4,1 ms bei 240 Hz (Woods et al., 2015). Die USB-Abfragerate der Maus fügt bei 125 Hz ca. 8 ms Verzögerung hinzu, gegenüber ca. 1 ms bei 1000 Hz. Abweichungen unter 5 ms stellen messtechnisches Rauschen dar. SkillDrills speichert alle Ergebnisse lokal in deinem Browser und sammelt keine aggregierten Daten.',
    ],
  },
  benchmark: {
    title: 'Heißer Draht Steuerungs-Benchmarks',
    description: 'Redaktionelle Richtwerte zur Einordnung deiner eigenen Leistung. Das Korridormodell folgt Accot & Zhai (1997). Die Stufen bewerten maximal erreichtes Level, Spurbreite und mittlere Abweichung von der Pfadmitte.',
    columns: ['Stufe', 'Rang-Titel', 'Parcours-Level', 'Kanalbreite', 'Mittlere Abweichung', 'Leistungsbereich'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Neurochirurg (Apex Surgeon)',
        stat: 'Level 12+',
        level: '12–15 px',
        accuracy: 'Unter 2,5 px',
        percentile: 'Exzeptionell (Top 1%)',
      },
      {
        tier: 'Tier 2',
        rank: 'Meister-Navigator',
        stat: 'Level 9–11',
        level: '16–22 px',
        accuracy: 'Unter 4,0 px',
        percentile: 'Fortgeschritten (Top 5%)',
      },
      {
        tier: 'Tier 3',
        rank: 'Geübter Steuermann',
        stat: 'Level 6–8',
        level: '23–32 px',
        accuracy: 'Unter 6,5 px',
        percentile: 'Solide (Top 25%)',
      },
      {
        tier: 'Tier 4',
        rank: 'Standard-Cursor',
        stat: 'Level 3–5',
        level: '33–42 px',
        accuracy: 'Unter 9,0 px',
        percentile: 'Durchschnitt',
      },
      {
        tier: 'Tier 5',
        rank: 'Zitternder Einsteiger',
        stat: 'Level 1–2',
        level: '43–50 px',
        accuracy: 'Über 9,0 px',
        percentile: 'Entwicklungsbedarf',
      },
    ],
  },
  protocols: {
    title: 'Trainingsprotokolle für maximale Handruhe',
    description: 'Wissenschaftlich fundierte Übungsanleitungen zur Zitterdämpfung und Beherrschung dynamischer Engpässe.',
    items: [
      {
        title: 'Protokoll 1: Geschwindigkeitsregulierung nach Accot-Zhai (Tunnel-Pacing)',
        description: 'Gemäß dem Steuerungsgesetz von Accot & Zhai (1997) erfordert ein schmalerer Kanal eine antiproportionale Drosselung des Tempos. Nutze breite Abschnitte zum schnellen Zeitgewinn und drossle vor engen Schikanen um 40 %, um Wandkollisionen zu vermeiden.',
      },
      {
        title: 'Protokoll 2: Blickantizipation nach Woodworth (Feedback-Vorlauf)',
        description: 'Fokussiere deinen Blick ca. 20 bis 30 Pixel vor den Cursor statt direkt auf den Mauszeiger. Dieser visuelle Vorlauf verschafft deinem motorischen Kortex ca. 150 ms Pufferzeit, um feinste Kursabweichungen rechtzeitig auszugleichen.',
      },
      {
        title: 'Protokoll 3: Dämpfung des 8–12 Hz Tremors & Gelenkentkopplung',
        description: 'Führe weite Bogenbewegungen aus dem Ellenbogen und Unterarm aus und nutze die Finger nur für Mikronivellierungen. Vermeide krampfhaften Druck auf die Maus, da gleichzeitige Anspannung von Beuge- und Streckmuskeln das Zittern massiv verstärkt.',
      },
      {
        title: 'Protokoll 4: Apex-Navigation in scharfen Haarnadelkurven',
        description: 'Ab Level 6 (unter 30 px Breite) steht geometrische Präzision vor Geschwindigkeit. Schneide Kurven am inneren Scheitelpunkt (Apex) leicht an, um beim Richtungswechsel maximale Reserve gegen die Zentrifugaldrift zu behalten.',
      },
    ],
  },
  faqs: {
    title: 'Häufig gestellte Fragen zu Heißer Draht & Handruhe-Training',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

const deCopy = {
  h1Keyword: 'Heißer Draht Online',
  h1Suffix: ' (Ruhige Hand Spiel)',
  caption: 'Das Heißer Draht Spiel misst deine feinmotorische Handruhe und Spurtreue: Führe den Cursor durch gewundene Kanäle, ohne die Begrenzungswand zu berühren. Geregelt durch das Accot-Zhai-Steuerungsgesetz (1997) und geschlossene visuelle Feedback-Korrekturen (Woodworth, 1899).',
  statLaps: 'Runden',
  statTime: 'Restzeit',
  statStreak: 'Serie',
  statBest: 'Rekord',
  pausedTitle: 'Pausiert',
  pausedPrompt: 'Klicke auf das Spielfeld, um den Zeiger zu fixieren und fortzusetzen.',
  startTitle: 'Heißer Draht Parcours',
  startSubtitle: 'Feinmotorik & Spurpräzision • 45s Timer',
  startBtn: 'Drill starten',
  countdownSubtitle: 'KONZENTRATION',
  newBest: 'NEUER REKORD',
  errorsLabel: 'Wandberührungen',
  maxStreakLabel: 'Max. Serie',
  difficultyLabel: 'Erreichtes Level',
  trainAgain: 'Erneut versuchen',
  shareTitle: 'Ergebnis teilen',
  exitTitle: 'Beenden & Zurück',
  rulesTitle: 'Spielregeln & Steuerung',
  rulesItems: [
    { num: '1', text: 'Folge dem leuchtenden', highlight: 'Smaragd-Parcours exakt', result: 'Ziel setzt Timer auf 45s' },
    { num: '2', text: 'Rundenerfolg', highlight: 'Endlose Steigerung', result: 'Engere Pfade & schärfere Kurven' },
    { num: '3', text: 'Wandberührung', highlight: 'Sofortiger Reset', result: 'Startposition & Fehlerzählung' },
    { num: '4', text: 'Echte Mausführung', highlight: 'Desktop empfohlen', result: '1:1 Rohdatenübertragung' },
  ],
  rule1Text: 'Folge dem leuchtenden',
  rule1Highlight: 'Smaragd-Parcours exakt',
  rule1Result: 'Ziel setzt Timer auf 45s',
  rule2Text: 'Rundenerfolg',
  rule2Highlight: 'Endlose Steigerung',
  rule2Result: 'Engere Pfade & schärfere Kurven',
  rule3Text: 'Wandberührung',
  rule3Highlight: 'Sofortiger Reset',
  rule3Result: 'Startposition & Fehlerzählung',
  rule4Text: 'Echte Mausführung',
  rule4Highlight: 'Desktop empfohlen',
  rule4Result: '1:1 Rohdatenübertragung',
  aboutTitle: 'Über das Heißer Draht Spiel',
  aboutHeading: 'Feinmotorische Spurtreue & Unterdrückung von Handzittern',
  aboutP1: 'Heißer Draht (Steady Hand Game) trainiert die Hand-Auge-Koordination, präzise Mikrobewegungen und die Stabilität der Handführung. Durch das Steuern entlang immer schmaler werdender Bahnen werden die stabilisierenden Muskeln in Handgelenk und Unterarm gezielt gefordert.',
  aboutP2: 'Basierend auf dem Steuerungsgesetz von Johnny Accot & Shumin Zhai (1997) verdoppelt eine Halbierung der Pfadbreite die erforderliche Führungszeit. Mit steigender Rundenzahl schrumpft der Kanal von 50 px auf 12 px und erfordert perfekte Zitterdämpfung.',
  aboutCard1Title: 'Zielgruppe',
  aboutCard1Text: 'E-Sportler, Grafikdesigner, Chirurgen und alle, die ihre Handruhe und Mausgenauigkeit nachhaltig verbessern möchten.',
  aboutCard2Title: 'Trainierte Fähigkeiten',
  aboutCard2Text: 'Feinmotorische Koordination, Handstabilität, Kurvengeschwindigkeitskontrolle und Vermeidung von Muskelverkrampfung.',
  aboutCard3Title: 'Dynamische Verengung',
  aboutCard3Text: 'Mit jeder Runde schrumpft die Spurbreite, während Kurvenradien schärfer werden für kompromisslose Millimeterarbeit.',
  gradeLabels: {
    'S+': 'Göttliche Stabilität (Grandmaster)',
    'S': 'Meisterhafte Führung (Master)',
    'A': 'Präziser Steuermann (Diamond)',
    'B': 'Gute Handruhe (Platinum)',
    'C': 'Basis-Kontrolle (Gold)',
  },
  shareDrillName: 'Heißer Draht',
  shareUrl: 'https://skilldrills.online/de/drills/motor/precision-control/steady-hand',
  shareTextTemplate: '🖐️ {drillName}: {laps} Runden fehlerfrei absolviert (Genauigkeit: {acc})! Teste deine Handruhe und Feinmotorik kostenlos auf skilldrills.online!',
  copiedAlert: 'Ergebniskarte in die Zwischenablage kopiert!',
};

export default function GermanSteadyHandPage() {
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
      <SteadyHandClient copy={deCopy} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/drills/motor/precision-control/steady-hand" locale="de" />
      </div>
      <DrillFooter />
    </>
  );
}
