import BarrierSequencePursuitClient from '@/app/drills/reaction-speed/barrier-sequence-pursuit/BarrierSequencePursuitWrapperLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS – de-DE (reaction-speed / barrier-sequence-pursuit)
// PRIMARY DOMESTIC: "Jiggle Peek Trainer" / "Winkel Halten Training"
// SECONDARY / LSI:
//   "Crosshair Placement FPS" / "Peeker Advantage Kontern"
//   "Schulter Peek Training" / "Counter Strafing Übung"
// ============================================================

export const metadata = {
  title: 'Jiggle Peek Trainer – Winkel Halten Training | SkillDrills',
  description: 'Kostenloser Jiggle-Peek-Trainer online. Trainiere defensives Winkel-Halten, Counter-Strafing und Crosshair-Offsetting gegen Peekers Advantage im Browser.',
  keywords: [
    'jiggle peek trainer',
    'winkel halten training',
    'crosshair placement fps',
    'peeker advantage kontern',
    'schulter peek training',
    'counter strafing übung',
    'reaktionstest deckung',
    'winkelabstand aim',
    'pre aim übung online',
    'taktisches fadenkreuz',
    'reaktionszeit shooter ecke',
    'defensives peeken',
  ],
  openGraph: {
    title: 'Jiggle Peek Trainer – Winkel Halten Training | SkillDrills',
    description: 'Kostenloser Jiggle-Peek-Trainer online. Trainiere defensives Winkel-Halten, Counter-Strafing und Crosshair-Offsetting gegen Peekers Advantage im Browser.',
    type: 'article',
    url: 'https://skilldrills.online/de/drills/reaction-speed/barrier-sequence-pursuit',
    siteName: 'SkillDrills',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jiggle Peek Trainer – Winkel Halten Training | SkillDrills',
    description: 'Kostenloser Jiggle-Peek-Trainer online. Trainiere defensives Winkel-Halten, Counter-Strafing und Crosshair-Offsetting gegen Peekers Advantage im Browser.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/reaction-speed/barrier-sequence-pursuit',
    languages: getAlternateLanguages('/drills/reaction-speed/barrier-sequence-pursuit'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills Startseite', item: 'https://skilldrills.online/de' },
    { '@type': 'ListItem', position: 2, name: 'Drills Hub', item: 'https://skilldrills.online/de/drills' },
    { '@type': 'ListItem', position: 3, name: 'Reaktionsschnelligkeit', item: 'https://skilldrills.online/de/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'Jiggle Peek Trainer', item: 'https://skilldrills.online/de/drills/reaction-speed/barrier-sequence-pursuit' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Jiggle Peek Trainer – Winkel Halten & Deckungs-Reaktionsdrill',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Online-Reflextraining für defensives Winkel-Halten, Abfangen von gegnerischen Peeks und Fadenkreuz-Offsetting.',
  url: 'https://skilldrills.online/de/drills/reaction-speed/barrier-sequence-pursuit',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  inLanguage: 'de-DE',
  dateModified: '2026-09-15',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Jiggle Peek Trainer',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'HTML5 Canvas, moderner Webbrowser mit Pointer-Lock-Unterstützung',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  url: 'https://skilldrills.online/de/drills/reaction-speed/barrier-sequence-pursuit',
  inLanguage: 'de-DE',
  dateModified: '2026-09-15',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Jiggle Peek Trainer – Taktisches Winkel-Halten & Deckungsspiel',
  url: 'https://skilldrills.online/de/drills/reaction-speed/barrier-sequence-pursuit',
  description: 'Taktischer Aim-Trainer zur Beherrschung von Deckungskanten, Reaktionsabständen und Abwehr von Peekers Advantage.',
  genre: ['Action', 'Aim Trainer', 'Taktik-Shooter'],
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
      name: 'Was ist ein Jiggle Peek Trainer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ein Jiggle Peek Trainer simuliert schnelle Schulterblicke hinter Deckungen und das statische Halten enger Winkel gegen heranstürmende Gegner in Taktik-Shootern wie CS2 und Valorant.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was versteht man unter dem Peeker’s Advantage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Der Peeker’s Advantage entsteht durch Netzwerk-Latenz und Client-Interpolation (deWet & Straily, 2020). Ein aktiver Angreifer sieht den stehenden Verteidiger wenige Millisekunden früher, als dessen Bildschirm das Signal anzeigt.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie hält man einen Winkel richtig, um den Peeker’s Advantage zu neutralisieren?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Platzieren Sie das Fadenkreuz niemals direkt bündig an die Wandkante. Versetzen Sie es um etwa 100 bis 150 ms menschliche Reaktionsstrecke nach außen, damit der Gegner direkt in den Schuss hineinläuft.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was sagt die mentale Chronometrie von Donders (1868) über das Reagieren an Kanten aus?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Donders wies nach, dass die Reizidentifikation und motorische Befehlsausgabe eine Mindestverzögerung von ca. 200–250 ms erfordern. Ein vorausschauender Crosshair-Offset gleicht genau diesen biologischen Puffer aus.',
      },
    },
    {
      '@type': 'Question',
      name: 'Warum ist Shoulder-Peeking (Schulter-Peeken) so effektiv?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Beim Shoulder-Peeking wird nur die Schulter oder der Arm für 50–100 ms kurz aus der Deckung gezeigt, um Scharfschützen-Schüsse zu ködern, ohne die kritische Kopf-Hitbox zu gefährden.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was bedeutet Counter-Strafing in Ego-Shootern?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Counter-Strafing ist das sofortige Abstoppen der Vorwärts- oder Seitwärtsbewegung durch kurzes Antippen der entgegengesetzten Richtungstaste, wodurch die Waffenstreuung augenblicklich auf null sinkt.',
      },
    },
    {
      '@type': 'Question',
      name: 'Warum spart präzises Crosshair-Placement Reaktionszeit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Richtiges Placement eliminiert die motorische Flick-Bewegung. Aus einer zweidimensionalen Zielsuche wird ein einfaches, zeitlich exakt getimtes Ein-Klick-Ereignis.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie beeinflusst die Monitor-Latenz das Halten von Winkeln?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ein 240Hz-Display liefert alle 4,1 ms ein neues Bild gegenüber 16,7 ms bei 60 Hz (Woods et al., 2015). Dieser Vorsprung vergrößert das Zeitfenster, um einen heraustretenden Angreifer abzufangen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie oft sollte man das Halten von Winkeln und Peeken trainieren?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Täglich 10 Minuten genügen, um das Gefühl für den richtigen Fadenkreuzabstand an Deckungen fest im Muskelgedächtnis zu verankern.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ist dieser Trainer kostenlos nutzbar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, SkillDrills stellt den Jiggle Peek Trainer vollkommen kostenlos und ohne Registrierung direkt im Webbrowser zur Verfügung.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Jiggle Peek Trainer Anleitung',
  description: 'Schritt-für-Schritt-Anleitung für optimales Winkel-Halten, Fadenkreuz-Offsetting und blitzschnelles Abfangen von Peeks.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Deckungsgeometrie und Winkelbreite wählen',
      text: 'Passen Sie die Kantenposition an die typischen Engpässe und Chokepoints Ihres Taktik-Shooters an.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/barrier-sequence-pursuit#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Fadenkreuz auf Reaktionsabstand versetzen (Crosshair Offset)',
      text: 'Positionieren Sie das Fadenkreuz mit leichtem Abstand zur Wandkante, um Ihre neurologische Reaktionslatenz auszugleichen.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/barrier-sequence-pursuit#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Auf Bewegungssignale an der Kante fokussieren',
      text: 'Halten Sie die Aufmerksamkeit starr auf die Kante gerichtet, um auftauchende Pixel des Gegners sofort wahrzunehmen.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/barrier-sequence-pursuit#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Im Augenblick des Durchquerens abdrücken',
      text: 'Lösen Sie den Schuss in der Millisekunde aus, in der das Ziel Ihre Visierlinie kreuzt, ohne nervös nachzujustieren.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/barrier-sequence-pursuit#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('donders1868', 'dewet2020', 'kosinski2008', 'woods2015'),
  intro: {
    title: 'Jiggle Peek Trainer & Taktisches Winkel-Halten',
    paragraphs: [
      'In Taktik-Shootern wie Valorant und Counter-Strike entscheidet oft der Bruchteil einer Sekunde an einer Deckungskante über Sieg oder Niederlage. Ein verbreiteter Fehler defensiver Spieler ist das sogenannte „Haften an der Wand“: Wer sein Fadenkreuz direkt auf die Kante klebt, wird durch menschliche Reaktionslatenz und Netzwerk-Vorteile des Gegners (Peeker’s Advantage; deWet & Straily, 2020) unweigerlich überrumpelt.',
      'Die mentale Chronometrie nach Donders (1868) belegt, dass selbst geschulte Reflexe rund 200 ms benötigen, um einen optischen Reiz in einen Fingerklick umzusetzen. Erfolgreiche Profis versetzen ihr Fadenkreuz daher bewusst um die Distanz, die der Gegner während dieser 200 ms zurücklegt.',
      'Dieser Trainer schult Ihr Timing beim Halten von Kanten und das blitzschnelle Auslösen auf Monitoren mit hohen Bildwiederholraten (Woods et al., 2015), damit Angreifer direkt in Ihre Visierlinie rennen.',
    ],
  },
  benchmarks: {
    title: 'Leistungs-Benchmarks: Winkel-Halten und Deckungsreaktion',
    headers: ['Leistungsstufe', 'Rang', 'Haltezeit-Latenz', 'Präzision', 'Perzentil'],
    rows: [
      ['Tier 1', 'Grandmaster / Pro', '< 150 ms', '98 %+', 'Top 1 %'],
      ['Tier 2', 'Master / Elite', '150 – 190 ms', '94 – 97 %', 'Top 5 %'],
      ['Tier 3', 'Pro / Diamond', '191 – 240 ms', '88 – 93 %', 'Top 15 %'],
      ['Tier 4', 'Intermediate / Gold', '241 – 310 ms', '78 – 87 %', 'Top 50 %'],
      ['Tier 5', 'Novice / Silver', '> 310 ms', '< 78 %', 'Basis'],
    ],
    note: 'Ermittelt auf Basis neurophysiologischer Reaktionszeiten (Donders, 1868; Kosinski, 2008) und Netzwerk-Interpolationsmodellen (deWet & Straily, 2020).',
  },
  protocols: {
    title: 'Wissenschaftliche Übungsprotokolle',
    description: 'Methodische Schritte zur Beherrschung von Kanten-Timings und Fadenkreuzabständen.',
    items: [
      {
        title: 'Deckungsgeometrie und Winkelbreite wählen',
        description: 'Passen Sie die Kantenposition an die typischen Engpässe und Chokepoints Ihres Taktik-Shooters an.',
      },
      {
        title: 'Fadenkreuz auf Reaktionsabstand versetzen (Crosshair Offset)',
        description: 'Positionieren Sie das Fadenkreuz mit leichtem Abstand zur Wandkante, um Ihre neurologische Reaktionslatenz auszugleichen.',
      },
      {
        title: 'Auf Bewegungssignale an der Kante fokussieren',
        description: 'Halten Sie die Aufmerksamkeit starr auf die Kante gerichtet, um auftauchende Pixel des Gegners sofort wahrzunehmen.',
      },
      {
        title: 'Im Augenblick des Durchquerens abdrücken',
        description: 'Lösen Sie den Schuss in der Millisekunde aus, in der das Ziel Ihre Visierlinie kreuzt, ohne nervös nachzujustieren.',
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

export default function GermanBarrierSequencePursuitPage() {
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
      <BarrierSequencePursuitClient copy={{ title: 'Jiggle Peek Trainer' }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="reaction-speed"
          currentHref="https://skilldrills.online/de/drills/reaction-speed/barrier-sequence-pursuit"
        />
      </div>
      <DrillFooter />
    </>
  );
}
