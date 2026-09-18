import ColorSequenceClient from '@/app/drills/memory/short-term-memory/color-sequence/ColorSequenceClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';

// ============================================================
// SEO EMPIRICAL RESEARCH FINDINGS — de-DE (color-sequence)
// PRIMARY DOMESTIC: "Senso Spiel Online" — Classic Milton Bradley / MB German branding
//                   "Farben merken Spiel" — High-demand domestic search query
// SECONDARY / LSI:
//                   "Simon Says Spiel Online" — International classic query
//                   "Farben Reihenfolge merken" — Natural descriptive German query
//                   "Sequenzgedächtnis Test" — Cognitive testing phrase
//                   "Visuelles Arbeitsgedächtnis" — Neuropsychological term
//                   "Kurzzeitgedächtnis Test Online" — General memory search
//                   "Gedächtnistraining Farben" — Brain training query
//                   "Farbmuster merken" — Pattern memory term
//                   "Chunking Gedächtnistraining" — Cognitive technique search
// WINNER TITLE:     Senso Spiel Online – Farben Reihenfolge merken | SkillDrills (58 chars)
// ============================================================

export const metadata = {
  title: 'Senso Spiel Online – Farben Reihenfolge merken | SkillDrills',
  description: 'Kostenloses Senso-Spiel online: Merke dir die wachsende Farb-Reihenfolge und teste dein visuelles Arbeitsgedächtnis direkt im Browser ohne Anmeldung.',
  keywords: [
    'senso spiel online',
    'farben merken spiel',
    'simon says spiel online',
    'farbsequenz gedaechtnistest',
    'visuelles arbeitsgedaechtnis test',
    'farben reihenfolge merken',
    'kurzzeitgedaechtnis test online',
    'senso spiel kostenlos',
    'farben memory spiel',
    'chunking methode lernen',
    'visuelle merkspanne uben',
    'gehirntraining gedaechtnis',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/memory/short-term-memory/color-sequence',
    languages: getAlternateLanguages('/drills/memory/short-term-memory/color-sequence'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Senso Spiel Online – Farben Reihenfolge merken | SkillDrills',
    description: 'Kostenloses Senso-Spiel online: Merke dir die wachsende Farb-Reihenfolge und teste dein visuelles Arbeitsgedächtnis direkt im Browser ohne Anmeldung.',
    url: 'https://skilldrills.online/de/drills/memory/short-term-memory/color-sequence',
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Senso Spiel Online – Farben Reihenfolge merken | SkillDrills',
    description: 'Kostenloses Senso-Spiel online: Merke dir die wachsende Farb-Reihenfolge und teste dein visuelles Arbeitsgedächtnis direkt im Browser ohne Anmeldung.',
  },
};

const copyDe = {
  title: 'Senso-Spiel',
  subtitle: 'Farben merken & Visueller Sequenzgedächtnis-Test',
  caption: 'Beobachte und reproduziere die aufleuchtende Farb-Reihenfolge in exakter Abfolge. Mit jeder erfolgreichen Runde wächst die Sequenz.',
  statScore: 'Punkte',
  statTime: 'Restzeit',
  statLevel: 'Stufe',
  statBestScore: 'Bestwert',
  rulesTitle: 'Drill-Anleitung & Punktesystem',
  rule1Text: 'Sequenz wiederholen',
  rule1Highlight: '+100 PTS',
  rule1Result: 'Tippe die aufleuchtenden Farbfelder in exakter Reihenfolge nach',
  rule2Text: 'Stufen-Bonus',
  rule2Highlight: '+10% PTS / Stufe',
  rule2Result: 'Längere Farbfolgen bringen exponentiell mehr Punkte',
  rule3Text: 'Fehlversuch / Timeout',
  rule3Highlight: '-1 Stufe',
  rule3Result: 'Kein Punktverlust oder Zeitabzug; Sequenz wird wiederholt',
  rule4Text: 'Adaptive Schwierigkeit',
  rule4Highlight: 'Dynamisch',
  rule4Result: 'Die Kettenlänge passt sich direkt deinem Leistungsstand an',
  aboutTitle: 'Über das Senso-Spiel & Visuelles Arbeitsgedächtnis',
  overviewTitle: 'Was trainiert das Farben-Merkspiel (Senso / Simon)?',
  overviewLead: 'Das visuelle Arbeitsgedächtnis kann im Normalzustand nur etwa vier isolierte Einheiten gleichzeitig speichern (Luck & Vogel, 1997; Cowan, 2001). Eine stetig wachsende Farb-Sequenz konfrontiert das Gehirn direkt mit diesem neurobiologischen Engpass.',
  aboutCards: [
    { title: 'Für wen geeignet?', text: 'Schüler, Studierende, E-Sportler und Senioren, die ihr kurzzeitiges visuelles Erinnerungsvermögen und ihre Konzentration stärken möchten.' },
    { title: 'Trainierte Fähigkeiten', text: 'Visuelle Merkspanne, sequenzielle Enkodierung im visuell-räumlichen Notizblock (Baddeley & Hitch, 1974) und Konzentration unter Zeitdruck.' },
    { title: 'Chunking-Strategie', text: 'Fasse Einzelfarben zu Blöcken (z. B. Rot-Blau-Paare) zusammen, um die 4-Elemente-Grenze des Kurzzeitgedächtnisses zu überwinden (Miller, 1956).' },
  ],
};

export default function GermanColorSequencePage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'SkillDrills Home', item: 'https://skilldrills.online/de' },
      { '@type': 'ListItem', position: 2, name: 'Gedächtnis-Training', item: 'https://skilldrills.online/de/drills/memory' },
      { '@type': 'ListItem', position: 3, name: 'Kurzzeitgedächtnis', item: 'https://skilldrills.online/de/drills/memory/short-term-memory' },
      { '@type': 'ListItem', position: 4, name: 'Senso Spiel', item: 'https://skilldrills.online/de/drills/memory/short-term-memory/color-sequence' },
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Senso Spiel Online – Farben merken Gedächtnistest',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web Browser',
    dateModified: '2026-09-15',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    description: 'Kostenloses Online-Senso-Spiel zum Testen und Trainieren des visuellen Arbeitsgedächtnisses, der Chunking-Fähigkeit und der sequenziellen Merkspanne.',
    genre: 'Cognitive Training / Visual Working Memory',
    url: 'https://skilldrills.online/de/drills/memory/short-term-memory/color-sequence',
    publisher: {
      '@type': 'Organization',
      name: 'SkillDrills',
      url: 'https://skilldrills.online',
    },
  };

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Senso Spiel Online',
    url: 'https://skilldrills.online/de/drills/memory/short-term-memory/color-sequence',
    description: 'Kostenloses browserbasiertes Senso- und Simon-Gedächtnisspiel mit 6 leuchtenden Farben und adaptiver Längenanpassung.',
    dateModified: '2026-09-15',
    applicationCategory: 'GameApplication',
    operatingSystem: 'All',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  };

  const videoGameSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: 'Senso Spiel – Farben merken',
    url: 'https://skilldrills.online/de/drills/memory/short-term-memory/color-sequence',
    description: 'Klassisches elektronisches Farbsequenz-Gedächtnisspiel im Browser zur Steigerung von Merkspanne und Fokus.',
    genre: ['Memory Game', 'Brain Training', 'Puzzle'],
    gamePlatform: ['Web Browser', 'Mobile', 'Tablet', 'Desktop'],
    applicationCategory: 'Game',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Was ist das Senso-Spiel (Simon Says) und wie funktioniert es?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Das Senso-Spiel (international als Simon bekannt) ist ein klassisches elektronisches Gedächtnisspiel. Das System spielt eine wachsende Abfolge farbiger Lichtsignale und Töne vor. Der Spieler muss sich die Sequenz einprägen und sie anschließend fehlerfrei in derselben Reihenfolge durch Antippen der Farbfelder wiederholen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Welche Gehirnfunktionen werden beim Merken von Farbsequenzen trainiert?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Das Spiel fordert primär das visuelle Arbeitsgedächtnis und den visuell-räumlichen Notizblock (Visuospatial Sketchpad nach Baddeley & Hitch, 1974). Zudem werden selektive Aufmerksamkeit, sequenzielle Enkodierung und die synaptische Plastizität im präfrontalen Kortex beansprucht.',
        },
      },
      {
        '@type': 'Question',
        name: 'Was besagt die 4-Elemente-Grenze von Luck & Vogel (1997)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Steven J. Luck und Edward K. Vogel wiesen 1997 in Nature nach, dass das visuelle Arbeitsgedächtnis im Schnitt auf 3 bis 4 visuelle Objekte begrenzt ist. Ohne aktive Strukturierung stößt das Gehirn ab Sequenzlänge 5 an seine Kapazitätsgrenze.',
        },
      },
      {
        '@type': 'Question',
        name: 'Was ist die Chunking-Methode und wie hilft sie im Spiel?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Chunking (nach George A. Miller, 1956) bezeichnet das Zusammenfassen einzelner Informationseinheiten zu bedeutungsvollen Blöcken. Indem man sich nicht sechs Einzelfarben merkt, sondern zwei Dreiergruppen (z. B. Rot-Gelb-Blau als ein Block), wird die kognitive Belastung halbiert.',
        },
      },
      {
        '@type': 'Question',
        name: 'Warum nutzt dieser Drill 6 statt der klassischen 4 Farben?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Klassische Geräte nutzen 4 Farben (Rot, Blau, Grün, Gelb). Dieser Drill erweitert das Spektrum um Lila und Orange auf 6 Felder, was die Auswahlentropie erhöht und fortgeschrittenen Spielern eine anspruchsvollere Herausforderung für das Arbeitsgedächtnis bietet.',
        },
      },
      {
        '@type': 'Question',
        name: 'Gibt es eine Zeitstrafe bei Fehlversuchen?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nein, es gibt keinen Zeitabzug bei Fehlern. Nach einer falschen Eingabe stuft das adaptive System die Sequenzlänge lediglich um eine Stufe herab, sodass man ohne Frustration weiter trainieren kann.',
        },
      },
      {
        '@type': 'Question',
        name: 'Welche Punktzahl oder Stufe gilt als überdurchschnittlich gut?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Das Erreichen von Stufe 7 bis 8 (Sequenzlänge von 7–8 Farben) entspricht dem soliden Durchschnitt. Stufen ab Level 10 (über 1.300 Punkte) erfordern konsequentes Chunking und zählen zur Elite-Kategorie.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hilft das Training gegen Alltagsvergesslichkeit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja. Das systematische Enkodieren sequenzieller Reize stärkt die neuronale Konzentrationsausdauer und erleichtert das kurzzeitige Behalten von Telefonnummern, Codes, Wegbeschreibungen und Arbeitsschritten.',
        },
      },
      {
        '@type': 'Question',
        name: 'Ist das Senso-Spiel für Touchscreens und Smartphones optimiert?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, die Benutzeroberfläche reagiert latenzfrei auf Touch-Eingaben auf Smartphones und Tablets sowie auf Mausklicks am Desktop-PC.',
        },
      },
      {
        '@type': 'Question',
        name: 'Ist dieses Online-Senso-Spiel kostenlos und ohne Installation spielbar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, das Spiel ist vollständig kostenlos, werbefrei spielbar und erfordert weder Registrierung noch Download. Alle Bestwerte verbleiben lokal in Ihrem Browser.',
        },
      },
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Anleitung zum Senso-Farben-Merkspiel',
    description: 'In 4 Schritten die visuelle Merkspanne und Sequenzerinnerung im Senso-Spiel trainieren.',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Farbsequenz aufmerksam beobachten',
        text: 'Starte das Spiel und verfolge konzentriert die aufleuchtenden Farbfelder und Töne.',
        url: 'https://skilldrills.online/de/drills/memory/short-term-memory/color-sequence#step-1',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Muster mental zu Chunks bündeln',
        text: 'Fasse aufeinanderfolgende Farben gedanklich zu Zweier- oder Dreierpaaren zusammen.',
        url: 'https://skilldrills.online/de/drills/memory/short-term-memory/color-sequence#step-2',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Farben in exakter Reihenfolge antippen',
        text: 'Sobald die Eingabeaufforderung erscheint, tippe die Felder in der vorgegebenen Abfolge an.',
        url: 'https://skilldrills.online/de/drills/memory/short-term-memory/color-sequence#step-3',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Stufen steigern und Highscore aufbauen',
        text: 'Mit jeder gemeisterten Sequenz verlängert sich die Kette um eine Farbe für höhere Multiplikatoren.',
        url: 'https://skilldrills.online/de/drills/memory/short-term-memory/color-sequence#step-4',
      },
    ],
  };

  const sensoGuide = {
    heading: 'Leitfaden zum Senso-Farbsequenzspiel & Arbeitsgedächtnis',
    intro: [
      'Das Wiedergeben von Farbsequenzen zählt zu den traditionsreichsten und wirkungsvollsten Tests für das visuelle und serielle Arbeitsgedächtnis. Bekannt geworden durch Ralph H. Baers und Howard J. Morrisons elektronisches Senso-Spiel (1978), fordert das Prinzip die sofortige Speicherung und Rekonstruktion dynamischer Reizketten.',
      'Die neurokognitive Herausforderung beruht auf der begrenzten Kapazität des visuell-räumlichen Notizblocks (Visuospatial Sketchpad nach Baddeley & Hitch, 1974). Pionierstudien von Steven J. Luck & Edward K. Vogel (1997) sowie Nelson Cowan (2001) belegen, dass das menschliche Arbeitsgedächtnis im Reinzustand lediglich etwa 4 Informationseinheiten stabil halten kann.',
      'Um längere Sequenzen fehlerfrei zu meistern, greift das Gehirn auf sogenannte Chunking-Mechanismen (Miller, 1956) zurück: Farben werden zu rhythmischen oder klanglichen Paaren verschmolzen, wodurch mehrere Reize zu einer einzigen Gedächtniseinheit verdichtet werden.',
      'Alle Reaktionszeiten und Sequenzlängen werden über hochauflösende Browser-APIs millisekundengenau erfasst (Woods et al., 2015).'
    ],
    benchmarks: {
      title: 'Senso-Spiel & Sequenzgedächtnis Leistungsstufen (45-Sekunden-Lauf)',
      headers: ['Leistungsstufe', 'Erreichte Stufe', 'Punktzahl (45s)', 'Merkstrategie & Kognitive Bewertung'],
      rows: [
        ['Tier 1 (Großmeister / Elite-Gedächtnis)', 'Level 11+', 'Über 1.500 PTS', 'Exzellentes multimodales Chunking; simultane visuelle und rhythmisch-auditive Enkodierung'],
        ['Tier 2 (Fortgeschritten / Turnier-Niveau)', 'Level 8 – 10', '1.100 – 1.499 PTS', 'Sichere Überwindung der Cowan-Kapazitätsgrenze (4 Elemente); stabiles 2er/3er-Chunking'],
        ['Tier 3 (Solider Durchschnitt)', 'Level 5 – 7', '700 – 1.099 PTS', 'Typische gesunde Kurzzeitgedächtnis-Kapazität; leichte Unsicherheit bei schnellem Farbwechsel'],
        ['Tier 4 (Basis / Gelegentliche Aussetzer)', 'Level 3 – 4', '350 – 699 PTS', 'Arbeitsgedächtnis operiert an der natürlichen Kapazitätsgrenze; noch kein systematisches Chunking'],
        ['Tier 5 (Einsteiger / Hohe Vergessensrate)', 'Unter Level 3', 'Unter 350 PTS', 'Schwierigkeiten bei Ketten ab 3 Farben; Ablenkung durch visuelle Nachbilder']
      ],
      note: 'Die Benchmarks basieren auf einem 45-Sekunden-Durchlauf mit dynamisch wachsenden 6-Farben-Ketten (Luck & Vogel, 1997; Cowan, 2001; Woods et al., 2015).'
    },
    techniques: {
      title: '4 praxiserprobte Gedächtnisstrategien für längere Sequenzen',
      items: [
        {
          name: 'Rhythmisches Chunking (Miller-Prinzip)',
          desc: 'Merke dir nicht einzelne Farben, sondern rhythmische Blöcke. Sprich die Farbanfangsbuchstaben innerlich in festen Takten mit (z. B. "Rot-Blau ... Grün-Gelb").',
          tips: 'Gruppiere die Kette immer in Zweier- oder Dreierpaare, sobald sie 4 Farben überschreitet.'
        },
        {
          name: 'Räumliche Bewegungsmuster visualisieren',
          desc: 'Verbinde die aufleuchtenden Felder im Geist zu einer geometrischen Linie (z. B. Dreieck oder Zickzack-Muster), statt dir abstrakte Farbnamen zu merken.',
          tips: 'Das räumliche Gedächtnis im Parietallappen unterstützt die Speicherung ungemein.'
        },
        {
          name: 'Tonhöhe als auditiven Zweitkanal nutzen',
          desc: 'Jede Farbe erzeugt einen charakteristischen Synthesizer-Ton. Präge dir die Melodie der Sequenz ein, um das auditorische Kurzzeitgedächtnis als redundanten Speicher zu nutzen.',
          tips: 'Lass den Ton eingeschaltet, um von der dualen visuellen und auditiven Kodierung zu profitieren.'
        },
        {
          name: 'Fokus auf das Kettenende richten',
          desc: 'Die ersten Farben der Kette wiederholen sich in jeder Runde. Konzentriere deine Aufmerksamkeit primär auf die neu hinzugefügte Endfarbe.',
          tips: 'Verankere den Anfang fest im Langzeitpuffer und nutze den Kurzzeitspeicher für die neuesten Signale.'
        }
      ]
    },
    steps: [
      'Starte die 45-Sekunden-Session und blicke auf den zentralen Farbring.',
      'Beobachte aufmerksam die aufleuchtende Farb- und Tonfolge.',
      'Reorganisiere die Kette gedanklich in rhythmische Zweier- oder Dreierblöcke.',
      'Tippe die Farben nach Beendigung des Signals in exakt derselben Reihenfolge an.',
      'Steigere deine Stufe kontinuierlich für höhere Multiplikatoren und Punktwerte.'
    ],
    audience: 'Gedächtnissportler, Schüler, Studierende, E-Sportler und alle, die ihr Arbeitsgedächtnis, ihre Konzentration und ihre mentale Merkspanne gezielt trainieren möchten.',
    faqs: faqSchema.mainEntity.map((q) => ({ q: q.name, a: q.acceptedAnswer.text })),
    sources: pickSources('cowan2001', 'luck1997', 'baddeley1974', 'miller1956', 'woods2015'),
    related: [
      { href: '/de/drills/memory/working-memory/n-back', label: 'Dual N-Back Gedächtnistest' },
      { href: '/de/drills/memory/short-term-memory/digit-span', label: 'Digit Span Zahlenmerktest' },
      { href: '/de/drills/memory/spatial-memory/grid-memorization', label: 'Gitter Gedächtnistraining' },
      { href: '/de/drills/cognitive/focus/concentration-grid', label: 'Schulte-Tabelle Konzentrationsgitter' },
      { href: '/de/drills/cognitive/focus/distraction-fighter', label: 'Stroop-Test Online' }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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
      <ColorSequenceClient copy={copyDe} />
      <DrillGuide guide={sensoGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/short-term-memory/color-sequence"
          locale="de"
        />
      </div>
    </>
  );
}
