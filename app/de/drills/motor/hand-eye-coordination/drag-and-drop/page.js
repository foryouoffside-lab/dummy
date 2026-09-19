import DragAndDropClient from '@/app/drills/motor/hand-eye-coordination/drag-and-drop/DragAndDropClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Drag and Drop Test – Maus Präzision Training | SkillDrills',
  description: 'Kostenloser Drag and Drop Test im Browser: Trainiere Mauspräzision, Zieh- und Haltekontrolle sowie präzises Loslassen nach dem Steering Law ohne Download.',
  keywords: [
    'drag and drop test',
    'drag and drop test maus',
    'maus drag and drop trainer',
    'maus praezision testen',
    'mausbedienung test',
    'hand auge koordination maus',
    'maus ziehen uebung',
    'rts maus training',
    'maus klick halten test',
    'feinmotorik maus test',
    'cursor kontrolle training',
    'aim trainer drag drop',
  ],
  openGraph: {
    title: 'Drag and Drop Test – Maus Präzision Training | SkillDrills',
    description: 'Kostenloser Drag and Drop Test im Browser: Trainiere Mauspräzision, Zieh- und Haltekontrolle sowie präzises Loslassen nach dem Steering Law ohne Download.',
    type: 'article',
    url: 'https://skilldrills.online/de/drills/motor/hand-eye-coordination/drag-and-drop',
    siteName: 'SkillDrills',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Drag and Drop Test – Maus Präzision Training | SkillDrills',
    description: 'Kostenloser Drag and Drop Test im Browser: Trainiere Mauspräzision, Zieh- und Haltekontrolle sowie präzises Loslassen nach dem Steering Law ohne Download.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/motor/hand-eye-coordination/drag-and-drop',
    languages: getAlternateLanguages('/drills/motor/hand-eye-coordination/drag-and-drop'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'SkillDrills Startseite',
      item: 'https://skilldrills.online/de',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Motorisches Training',
      item: 'https://skilldrills.online/de/drills/motor',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Hand-Auge-Koordination',
      item: 'https://skilldrills.online/de/drills/motor/hand-eye-coordination',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Drag and Drop Maus-Trainer',
      item: 'https://skilldrills.online/de/drills/motor/hand-eye-coordination/drag-and-drop',
    },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Drag and Drop Maus-Trainer und Praezisionstest',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Kostenloses Browsertool zur Messung von Drag-and-Drop-Geschwindigkeit, Cursor-Führung und Abwurftiming.',
  url: 'https://skilldrills.online/de/drills/motor/hand-eye-coordination/drag-and-drop',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-16',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Drag and Drop Maus-Trainer',
  browserRequirements: 'Benötigt HTML5 Canvas und modernes JavaScript',
  url: 'https://skilldrills.online/de/drills/motor/hand-eye-coordination/drag-and-drop',
  applicationCategory: 'EducationalApplication',
  dateModified: '2026-09-16',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Drag and Drop Maus-Trainer',
  url: 'https://skilldrills.online/de/drills/motor/hand-eye-coordination/drag-and-drop',
  description: 'Trainiere Zieh-Genauigkeit, Bremskontrolle und Abwurf-Timing im interaktiven Browsertest.',
  genre: ['Geschicklichkeit', 'Motorik-Training', 'Esports'],
  gamePlatform: ['Web Browser', 'Desktop'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-16',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Was wird im Drag and Drop Maus-Trainer genau gemessen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Der Test quantifiziert die sensomotorische Koordination: Transportzeit, Pfadtreue entlang der Trajektorie, Abbremskontrolle vor der Zielzone und das exakte Timing beim Loslassen der Maustaste.',
      },
    },
    {
      '@type': 'Question',
      name: 'Warum ist Drag and Drop motorisch anspruchsvoller als einfaches Klicken?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Weil der Zeigefinger eine kontinuierliche isometrische Haltekraft ausüben muss, während Handgelenk und Arm gleichzeitig eine dynamische Führungsbewegung über das Mauspad ausführen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was fanden MacKenzie et al. (1991) über Drag-and-Drop heraus?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ihre Studien belegen, dass Zieh-Operationen im Vergleich zu einfachen Klicks signifikant langsamer sind und eine um 15 bis 25 Prozent reduzierte motorische Bandbreite aufweisen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Bedeutung hat das Steering Law (Accot und Zhai, 1997)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Es beschreibt mathematisch die Bewegungszeit in begrenzten Pfaden: Je enger die Toleranzbreite des Zielkorridors, desto mehr kontinuierliche visuelle Rückkopplungsschleifen benötigt das Nervensystem.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie verhindert man Handkrämpfe bei langem Ziehen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nutzen Sie minimalen Auslösedruck auf den Schalter, meiden Sie Verkrampfungen im Handgelenk und stützen Sie den Unterarm flach auf einer ergonomischen Schreibtischkante ab.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie trifft man die Ablagezone am zuverlässigsten?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bremsen Sie den Cursor bereits kurz vor dem Zielkorridor sanft ab, anstatt mit maximaler Ballistik hineinzugleiten, um ein Überschwingen (Overshoot) zu vermeiden.',
      },
    },
    {
      '@type': 'Question',
      name: 'Für welche Anwendungen ist dieses Training besonders nützlich?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Für RTS-Spieler (Einheiten-Auswahlrahmen), FPS-Looting (Inventar-Swaps in Apex Legends oder PUBG) sowie CAD-Konstrukteure und Videoschnitt-Editoren mit intensiver Zeitleisten-Arbeit.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie skaliert die Schwierigkeit im Verlauf des Tests?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Höhere Stufen verkleinern die Zielbehälter, beschleunigen deren Bewegungsmuster und verkürzen das Zeitfenster für den erfolgreichen Abwurf.',
      },
    },
    {
      '@type': 'Question',
      name: 'Spielt die Hardware eine wichtige Rolle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Ein moderner Sensor ohne Zeigerbeschleunigung, ein sauberes Stoff-Mauspad mit berechenbarer Gleitreibung und eine Abtastrate von 1000 Hz minimieren Hardware-Latenzen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kostet die Nutzung auf SkillDrills etwas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nein, das Tool ist völlig kostenlos, läuft direkt im Browser und erfordert keinerlei Registrierung oder Installation.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Drag and Drop Maus-Trainer – Präzises Ziehen und Ablegen',
  description: 'Kostenloser Drag and Drop Maus-Trainer zur Messung der Hand-Auge-Koordination beim Halten, Bewegen und präzisen Ablegen von Objekten auf dynamische Zielzonen unter Zeitdruck.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Objekt erfassen und Taste gedrückt halten',
      text: 'Bewegen Sie das Fadenkreuz auf das Objekt und drücken Sie die linke Maustaste kontinuierlich durch.',
      url: 'https://skilldrills.online/de/drills/motor/hand-eye-coordination/drag-and-drop#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Schneller Transport auf direktem Pfad',
      text: 'Führen Sie das Objekt auf der kürzesten Linie zur vorgegebenen Zielzone.',
      url: 'https://skilldrills.online/de/drills/motor/hand-eye-coordination/drag-and-drop#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Zentrieren im Zielslot',
      text: 'Stabilisieren Sie das Objekt innerhalb der Begrenzungslinien der Zielzone.',
      url: 'https://skilldrills.online/de/drills/motor/hand-eye-coordination/drag-and-drop#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Präzises Loslassen (Release)',
      text: 'Geben Sie die Maustaste frei, sobald sich das Objekt vollständig im Slot befindet, um maximale Bonuspunkte zu erzielen.',
      url: 'https://skilldrills.online/de/drills/motor/hand-eye-coordination/drag-and-drop#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('accot1997', 'mackenzie1991', 'fitts1954', 'elliott2010', 'woods2015'),
  intro: {
    title: 'Biomechanik des Ziehens, Führens und sensorimotorischen Abbremsens',
    paragraphs: [
      'In der Mensch-Computer-Interaktion stellt das kontinuierliche Ziehen und Ablegen (Drag and Drop) eine grundlegend andere neuromuskuläre Herausforderung dar als einfache Klick-Aktionen. Während diskretes Zeigen durch das Fitts-Gesetz (Fitts, 1954) modelliert wird, verlangt das Ziehen eine anhaltende isometrische Ko-Kontraktion der Beugemuskulatur im Zeigefinger bei gleichzeitiger multi-axialer Translation der Gliedmaße über die Unterlage.',
      'In ihrer empirischen Pionierstudie zeigten MacKenzie, Sellen und Buxton (1991), dass Zieh-Aufgaben gegenüber einfachen Klicks einen typischen Durchsatzverlust von 15 bis 25 Prozent aufweisen. Der permanente Anpressdruck verändert den Reibungskoeffizienten der Mausgleiter auf dem Mauspad, schränkt feine Fingerartikulationen ein und erhöht motorisches Rauschen.',
      'Darüber hinaus formulierten Johnny Accot und Shumin Zhai (1997) das Steering Law zur mathematischen Beschreibung pfadbegrenzter Motorik. Bei dynamischen Ziehaufgaben müssen Nutzer Beschleunigungsimpulse und antagonistische Bremsungen (Elliott et al., 2010) exakt koordinieren, um ein Überschwingen der Zielzone zu verhindern.',
      'Messgenauigkeit und Grenzen: Die Zeitnahme basiert auf dem browserinternen performance.now()-Takt. Hardware-Latenzen wie Display-Aktualisierungsraten (16,7 ms bei 60 Hz, 6,9 ms bei 144 Hz) und Polling-Raten beeinflussen die Messwerte (Woods et al., 2015). Vergleichen Sie Ihre Resultate primär mit früheren eigenen Sitzungen am identischen System.',
    ],
  },
  benchmarks: {
    title: 'Empirische Leistungsstufen für Drag and Drop Präzision',
    caption: 'Klassifizierung basierend auf Steering-Modellen nach Accot und Zhai (1997) sowie MacKenzie, Sellen und Buxton (1991). SkillDrills speichert Daten ausschließlich lokal im Browser.',
    headers: ['Stufe', 'Klassifizierung', 'Level & Combo', 'Mittlere Transportzeit', 'Abwurf-Genauigkeit', 'Neuromuskuläres Profil'],
    rows: [
      [
        'Tier 1',
        'Elite / Profi-Designer',
        'Lv. 12–15 (Combo > 18x)',
        '< 420 ms',
        '≥ 98,0%',
        'Perfekt glockenförmiges Geschwindigkeitsprofil, punktgenaue Abbremsung, keine verfrühten Abwürfe.',
      ],
      [
        'Tier 2',
        'Fortgeschritten / Kompetitiv',
        'Lv. 9–11 (Combo 12–17x)',
        '420–510 ms',
        '94,0%–97,9%',
        'Kontrollierte Dezeleration, saubere Korridorfuhrung, minimale terminale Mikro-Korrekturen (< 35 ms).',
      ],
      [
        'Tier 3',
        'Geübt / Mittelfeld',
        'Lv. 6–8 (Combo 7–11x)',
        '511–640 ms',
        '87,0%–93,9%',
        'Gelegentliches Überschwingen in der Beschleunigungsphase, spürbare Tempoverluste kurz vor dem Zielslot.',
      ],
      [
        'Tier 4',
        'Einsteiger / In Entwicklung',
        'Lv. 3–5 (Combo 3–6x)',
        '641–800 ms',
        '78,0%–86,9%',
        'Ruckartige Mehrfachimpulse, zu hohe Griffspannung führt zu Mauspad-Verkantung und Randfehlern.',
      ],
      [
        'Tier 5',
        'Basisniveau / Anfänger',
        'Lv. 1–2 (Combo < 3x)',
        '> 800 ms',
        '< 78,0%',
        'Zögerliche Transportbewegung, häufiges Loslassen außerhalb der Behälterbegrenzung, Ermüdung.',
      ],
    ],
  },
  protocols: {
    title: 'Wissenschaftliche Trainingsprotokolle zur Steigerung der Feinmotorik',
    items: [
      {
        title: 'Protokoll 1: Isometrische Haltekraft-Stabilisierung (Level 1–4)',
        description: 'Konzentrieren Sie sich darauf, den Auslösedruck während der gesamten Mausbewegung minimal und entspannt zu halten. Zu starkes Drücken versteift die Handgelenkbeuger und erzeugt Zittern.',
      },
      {
        title: 'Protokoll 2: Accot-Zhai Pfadtunnel-Kalibrierung (Level 5–8)',
        description: 'Minimieren Sie die räumliche Pfadabweichung zwischen Aufnahme- und Zielkoordinate. Stellen Sie sich eine gerade Verbindungslinie vor und eliminieren Sie seitliche Kurvenschwünge.',
      },
      {
        title: 'Protokoll 3: Antagonistische Dezeleration und Bremsung (Level 9–12)',
        description: 'Aktivieren Sie die Unterarm-Streckmuskeln etwa 50 ms vor dem Erreichen des Zielbehälters, um den Bewegungsschwung punktgenau abzufangen und sauberes Loslassen zu ermöglichen.',
      },
      {
        title: 'Protokoll 4: Dynamischer Vorhaltewinkel bei bewegten Zielen (Level 13–15)',
        description: 'Führen Sie das Objekt nicht auf die aktuelle, sondern auf die vorausberechnete Schnittpunkt-Koordinate des Zielbehälters, um den Ball fließend in dessen Bewegungsbahn abzulegen.',
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

const copyDe = {
  title: "Drag and Drop Test – Maus Präzision Training",
  subtitle: "Räumliches Ziehen & Ablegen • 15 Stufen Progression",
  startButtonText: "DRILL STARTEN",
  playAgainText: "Nochmal spielen",
  shareText: "Ergebnis teilen",
  exitText: "Beenden",
  accuracyLabel: "Genauigkeit",
  targetDropsLabel: "Ziel-Treffer",
  maxComboLabel: "Max Combo",
  peakLevelLabel: "Höchste Stufe",
  rulesTitle: "Drill-Anleitung & Punktesystem",
  rulesItems: [
    { num: "1", text: "Ziel-Treffer", highlight: "+100 PKT × Combo", result: "Ball in den beweglichen Behälter ziehen" },
    { num: "2", text: "Kontinuierliche Combo", highlight: "Bis zu 3,0× Multiplikator", result: "Aufeinanderfolgende Treffer verketten" },
    { num: "3", text: "Stufenaufstieg", highlight: "+1 Stufe / 250 PKT", result: "Behälter schrumpfen & beschleunigen" },
    { num: "4", text: "Fehlschuss & Zeitablauf", highlight: "Combo-Reset", result: "Ablegen außerhalb setzt Multiplikator zurück" }
  ],
};

export default function DragAndDropPage() {
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
      <DragAndDropClient copy={copyDe} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="motor"
          currentHref="/drills/motor/hand-eye-coordination/drag-and-drop"
          locale="de"
        />
      </div>
      <DrillFooter />
    </>
  );
}
