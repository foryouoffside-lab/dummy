import PrecisionFlickShotClient from '@/app/drills/motor/hand-eye-coordination/precision-flick-shot/PrecisionFlickShotClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Flick Aim Trainer – Maus Zielgenauigkeit Test | SkillDrills',
  description: 'Kostenloser Flick Aim Trainer im Browser: Trainiere blitzschnelle Zielerfassung, Stopp-Präzision und Schuss-Timing für CS2 und Valorant ohne Download.',
  keywords: [
    'flick aim trainer',
    'maus zielgenauigkeit test',
    'flick shot training',
    'maus genauigkeit test',
    'aim trainer kostenlos',
    'maus praezision test',
    'fps aim training',
    'micro flick trainer',
    'reaktionsschnelligkeit maus',
    'aiming test online',
    'cs2 flick shot test',
    'valorant aim uebung',
  ],
  openGraph: {
    title: 'Flick Aim Trainer – Maus Zielgenauigkeit Test | SkillDrills',
    description: 'Kostenloser Flick Aim Trainer im Browser: Trainiere blitzschnelle Zielerfassung, Stopp-Präzision und Schuss-Timing für CS2 und Valorant ohne Download.',
    type: 'article',
    url: 'https://skilldrills.online/de/drills/motor/hand-eye-coordination/precision-flick-shot',
    siteName: 'SkillDrills',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flick Aim Trainer – Maus Zielgenauigkeit Test | SkillDrills',
    description: 'Kostenloser Flick Aim Trainer im Browser: Trainiere blitzschnelle Zielerfassung, Stopp-Präzision und Schuss-Timing für CS2 und Valorant ohne Download.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/motor/hand-eye-coordination/precision-flick-shot',
    languages: getAlternateLanguages('/drills/motor/hand-eye-coordination/precision-flick-shot'),
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
      name: 'Präzisions-Flick-Shot',
      item: 'https://skilldrills.online/de/drills/motor/hand-eye-coordination/precision-flick-shot',
    },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Flick Aim Trainer und Maus-Genauigkeitstest',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Kostenloses Browsertool zur Messung von ballistischer Flick-Geschwindigkeit, Bulls-Eye-Trefferrate und Stopp-Kontrolle.',
  url: 'https://skilldrills.online/de/drills/motor/hand-eye-coordination/precision-flick-shot',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-16',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Präzisions-Flick-Shot-Trainer',
  browserRequirements: 'Benötigt HTML5 Canvas und modernes JavaScript',
  url: 'https://skilldrills.online/de/drills/motor/hand-eye-coordination/precision-flick-shot',
  applicationCategory: 'EducationalApplication',
  dateModified: '2026-09-16',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Präzisions-Flick-Shot-Spiel',
  url: 'https://skilldrills.online/de/drills/motor/hand-eye-coordination/precision-flick-shot',
  description: 'Trainiere blitzschnelle Zielerfassung, ballistische Flicks und punktgenaues Abbremsen im interaktiven FPS-Aim-Test.',
  genre: ['Shooter-Training', 'Reaktion', 'Esports'],
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
      name: 'Was versteht man unter einem Flick Shot (Flick Aiming)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ein Flick Shot ist eine extrem schnelle, ballistische Mausbewegung zur spontanen Erfassung eines Ziels, gefolgt von sofortiger Dezeleration und Schussabgabe.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie erklärt das Zwei-Phasen-Modell (Woodworth, 1899) gezielte Mausbewegungen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Es unterteilt die Bewegung in einen ersten ballistischen Impuls (Hauptbewegung) und eine optionale zweite Kontrollphase zur optischen Nachjustierung.',
      },
    },
    {
      '@type': 'Question',
      name: 'Warum ist das Abstoppen der Maus (Deceleration) so entscheidend?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Weil ein unkontrolliertes Überschwingen (Overshoot) wertvolle Zeit für korrigierende Gegenbewegungen kostet. Gezieltes Abbremsen verhindert Trefferstreuung.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was bringt der Bulls-Eye-Bonus im Training?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Er belohnt Treffer exakt im 8-Pixel-Zentrum mit doppelten Punkten. Das zwingt das Nervensystem zur Verringerung der Streuung statt nur grober Randtreffer.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie hilft dieses Training in CS2, Valorant oder Apex Legends?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Im taktischen Gefecht entscheidet der erste Treffer. Geübte Micro-Flicks ermöglichen Kopfschusstreffer direkt aus der Vorziel-Position ohne Verzögerung.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Rolle spielt die visuelle Priorisierung bei mehreren Zielen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Erscheinen zwei Ziele parallel, schult der Verfallstimer schnelle Sakkaden und Entscheidungsfindung: Das kurz vor dem Ablauf stehende Ziel muss zuerst gelöscht werden.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Mausempfindlichkeit (DPI) ist optimal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Für FPS-Flicks empfehlen sich 800 DPI bei mittlerer Empfindlichkeit (ca. 30 bis 45 cm für eine 360-Grad-Drehung), um Armschwung und Handgelenksfeinmotorik zu balancieren.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie wird die Treffgenauigkeit und Bewertung berechnet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die Genauigkeit misst erfolgreiche Treffer pro Klickversuch. Zusammen mit Bulls-Eye-Quote, Combo-Streak und Reaktionszeit wird ein Leistungsrang von D bis S+ vergeben.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Hardware-Einstellungen optimieren das Flick-Training?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ein 144Hz+ Monitor für geringste Anzeigeverzögerung, Rohdaten-Mausabfrage ohne Zeigerbeschleunigung und eine leichte Gaming-Maus mit reibungsarmem Pad.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie oft sollte man Flick Shots trainieren?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Eine tägliche 10- bis 15-minütige Aufwärmroutine vor Wettkampfmatches schärft die neuromuskuläre Reaktionsbereitschaft optimal, ohne Ermüdung zu verursachen.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Anleitung: Präzises Flick-Shot-Training für Shooter',
  description: 'Schritt-für-Schritt-Methode zur Perfektionierung von ballistischen Flicks, Bulls-Eye-Präzision und Cursor-Abbremsung.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Fadenkreuz zentrieren',
      text: 'Bringen Sie die Maus in eine neutrale Ausgangsposition und fokussieren Sie das zentrale Fadenkreuz.',
      url: 'https://skilldrills.online/de/drills/motor/hand-eye-coordination/precision-flick-shot#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Zielerscheinung antizipieren',
      text: 'Erfassen Sie das auftauchende Ziel mit dem peripheren Blickfeld und prüfen Sie den Verfallstimer.',
      url: 'https://skilldrills.online/de/drills/motor/hand-eye-coordination/precision-flick-shot#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Ballistischen Flick ausführen',
      text: 'Führen Sie eine blitzschnelle, direkte Bewegung in Richtung des Zielzentrums ohne Zwischenstopps aus.',
      url: 'https://skilldrills.online/de/drills/motor/hand-eye-coordination/precision-flick-shot#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Präzise abbremsen und klicken',
      text: 'Aktivieren Sie die Antagonistenmuskeln zur punktgenauen Arretierung über dem Zentrum und lösen Sie den Schuss aus.',
      url: 'https://skilldrills.online/de/drills/motor/hand-eye-coordination/precision-flick-shot#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('meyer1988', 'fitts1954', 'mackenzie1992', 'elliott2010', 'woodworth1899', 'woods2015'),
  intro: {
    title: 'Biomechanik ballistischer Micro-Flicks und Submovement-Optimierung',
    paragraphs: [
      'Im wettkampforientierten E-Sport und der Mensch-Computer-Interaktion ist der Flick Shot eine hochdynamische, diskrete Zielbewegung unter extremem Zeitdruck. Robert S. Woodworth (1899) beschrieb als Erster die Zwei-Phasen-Steuerung zielgerichteter Bewegungen: ein primärer ballistischer Bewegungsimpuls schleudert das Glied zum Ziel, gefolgt von einer Kontrollphase zur visuellen Feinjustierung.',
      'In ihrem richtungsweisenden Modell (Stochastic Optimized Submovement Model) zeigten David E. Meyer et al. (1988), dass menschliche Muskelbewegungen geschwindigkeitsabhängigem neuronalen Rauschen unterliegen. Wer zu hastig flicked, riskiert eine hohe Streuung der Endpunkte. Liegt der erste Impuls außerhalb der Zielzone, muss eine korrektive Zweitbewegung (150 bis 200 ms Latenz) eingeleitet werden.',
      'Für herausragende Trefferleistungen (MacKenzie, 1992) müssen Schützen die Geschwindigkeit des Primärimpulses so tarieren, dass der Endpunkt zuverlässig im Kern liegt. Die Belohnung von Bulls-Eye-Zentrumstreffern trainiert das sensorimotorische System, Zielstreuung zu minimieren und Nachkorrekturen komplett zu eliminieren.',
      'Das Verhältnis zwischen Zieldistanz und Zielgröße gehorcht dem Fitts-Gesetz (Fitts, 1954). Die moderne Synthese von Elliott et al. (2010) belegt zudem die zentrale Rolle antagonistischer Muskelaktivierung beim Abbremsen.',
      'Messgenauigkeit im Browser: Gemessen wird mit performance.now(). Bildschirmaktualisierungsraten (16,7 ms bei 60 Hz, 6,9 ms bei 144 Hz) und Polling-Raten setzen physikalische Grenzen (Woods et al., 2015). Vergleichen Sie Ihre Resultate primär mit eigenen Werten am selben Setup.',
    ],
  },
  benchmarks: {
    title: 'Empirische Leistungsstufen für Flick Shot Präzision',
    caption: 'Klassifizierung basierend auf dem Modell von Woodworth (1899) und Meyer et al. (1988). SkillDrills speichert Daten ausschließlich lokal im Browser.',
    headers: ['Stufe', 'Klassifizierung', 'Level & Combo', 'Mittlere Latenz', 'Klick-Genauigkeit', 'Bulls-Eye-Quote', 'Neuromuskuläres Profil'],
    rows: [
      [
        'Tier 1',
        'Apex Flick Meister',
        'Lv. 15+ (Combo > 20x)',
        '< 340 ms',
        '≥ 96,0%',
        '> 65%',
        'Reine Ein-Impuls-Ballistik, nahezu keine Zweitbewegungen, blitzschnelles Abbremsen unter 10 ms.',
      ],
      [
        'Tier 2',
        'Elite Gunfighter',
        'Lv. 11–14 (Combo 14–19x)',
        '340–420 ms',
        '91,0%–95,9%',
        '45%–64%',
        'Scharfe visuelle Verifikation, minimale Mikrokorrektur unter 30 ms, kaum Trajektorienabweichung.',
      ],
      [
        'Tier 3',
        'Sicherer Schütze',
        'Lv. 7–10 (Combo 8–13x)',
        '421–520 ms',
        '84,0%–90,9%',
        '25%–44%',
        'Häufige Treffer im Außenring, leichtes Überschwingen bei schnellen Zielwechseln.',
      ],
      [
        'Tier 4',
        'Aufstrebender Fragger',
        'Lv. 4–6 (Combo 4–7x)',
        '521–660 ms',
        '74,0%–83,9%',
        '10%–24%',
        'Ruckartige Mehrfachkorrekturen, erhöhte Streuung durch Überbeschleunigung, zögerliches Auslösen.',
      ],
      [
        'Tier 5',
        'Basisniveau / Anfänger',
        'Lv. 1–3 (Combo < 4x)',
        '> 660 ms',
        '< 74,0%',
        '< 10%',
        'Zu kurze Flicks, häufige Fehlschüsse, langsame Re-Akquisitionszeit, unkoordinierte Bewegung.',
      ],
    ],
  },
  protocols: {
    title: '4 wissenschaftliche Trainingsprotokolle zur Steigerung der Flick-Präzision',
    items: [
      {
        title: 'Protokoll 1: Primärimpuls-Kalibrierung (Level 1–4)',
        description: 'Fokussieren Sie sich auf eine saubere, ununterbrochene Gleitbewegung ohne Zögern. Vertrauen Sie auf das motorische Gedächtnis für den primären Bewegungsschub.',
      },
      {
        title: 'Protokoll 2: Meyer Submovement-Minimierung (Level 5–8)',
        description: 'Zielen Sie bewusst auf das innerste 8-Pixel-Zentrum (Bulls-Eye). Die optische Verkleinerung des Sollbereichs zwingt das Gehirn zu geringerer Streuung.',
      },
      {
        title: 'Protokoll 3: Priorisierung bei Mehrfachzielen (Level 9–12)',
        description: 'Erscheinen zwei Ziele, schätzen Sie über das periphere Sehen die Ablaufzeiten ab und eliminieren Sie das ältere Ziel zuerst vor dem nächsten Snap.',
      },
      {
        title: 'Protokoll 4: Antagonistisches Bremsen gegen Overshooting (Level 13–15)',
        description: 'Aktivieren Sie bei hohem Tempo gezielt die Handgelenkstrecker kurz vor dem Ziel, um die Maus punktgenau über dem Zentrum zu stoppen.',
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

export default function PrecisionFlickShotPage() {
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
      <PrecisionFlickShotClient copy={{ title: "Maus Zielgenauigkeit Test" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="https://skilldrills.online/de/drills/motor/hand-eye-coordination/precision-flick-shot" />
      </div>
    </>
  );
}
