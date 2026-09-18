import SaccadicGalleryClient from '@/app/drills/reaction-speed/saccadic-gallery/SaccadicGalleryClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — de-DE (reaction-speed / saccadic-gallery)
// PRIMARY DOMESTIC: "Sakkaden Sehtraining" / "Sakkadentraining Online"
// SECONDARY / LSI:
//   "Sakkadische Augenbewegungen" / "Blicksprünge trainieren"
//   "Augenbeweglichkeit Übungen" / "Reaktionszeit Augen"
// ============================================================

export const metadata = {
  title: 'Sakkaden Sehtraining – Schnelle Augenreflexe | SkillDrills',
  description:
    'Kostenloses Sakkadentraining online. Trainiere schnelle Blicksprünge (Sakkaden) zwischen Zielpunkten für schnellere visuelle Zielerfassung im Browser.',
  keywords: [
    'sakkaden sehtraining',
    'sakkadentraining online',
    'sakkadische augenbewegungen',
    'blicksprünge trainieren',
    'augenbeweglichkeit übungen',
    'reaktionszeit augen',
    'periphere wahrnehmung',
    'zielerfassung trainieren',
    'dynamisches sehtraining',
    'augenkoordination',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/reaction-speed/saccadic-gallery',
    languages: getAlternateLanguages('/drills/reaction-speed/saccadic-gallery'),
  },
  openGraph: {
    title: 'Sakkaden Sehtraining – Schnelle Augenreflexe | SkillDrills',
    description:
      'Kostenloses Sakkadentraining online. Trainiere blitzschnelle Blicksprünge (Sakkaden) zwischen Zielpunkten zur Verbesserung der Reaktionsschnelligkeit.',
    type: 'article',
    url: 'https://skilldrills.online/de/drills/reaction-speed/saccadic-gallery',
    siteName: 'SkillDrills',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sakkaden Sehtraining – Schnelle Augenreflexe | SkillDrills',
    description:
      'Kostenloses Sakkaden-Sehtraining online. Trainiere Blicksprünge und Reaktionsschnelligkeit im Browser.',
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills Startseite', item: 'https://skilldrills.online/de' },
    { '@type': 'ListItem', position: 2, name: 'Drills Übersicht', item: 'https://skilldrills.online/de/drills' },
    { '@type': 'ListItem', position: 3, name: 'Reaktionsschnelligkeit', item: 'https://skilldrills.online/de/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'Sakkaden Sehtraining', item: 'https://skilldrills.online/de/drills/reaction-speed/saccadic-gallery' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Sakkaden Sehtraining – Schnelle Augenbewegungen & Reaktions-Drill',
  alternateName: ['Sakkadentraining Online', 'Blicksprung Test', 'Visualtraining Esports'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description:
    'Wissenschaftliches Sehtraining zur Steigerung von Blicksprung-Geschwindigkeit, peripherer Zielerfassung und visueller Reaktionsfähigkeit.',
  browserRequirements: 'Moderner Webbrowser mit HTML5 Canvas und JavaScript-Unterstützung',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Sakkaden Sehtraining — Schnelle Augenbewegungen | SkillDrills',
  url: 'https://skilldrills.online/de/drills/reaction-speed/saccadic-gallery',
  description:
    'Kostenloses Reaktionsspiel zum Training sakkadischer Augenbewegungen, peripherer Wahrnehmung und fovealer Fixierung im Browser.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'Erfordert einen modernen Webbrowser mit JavaScript.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: 'Sakkaden, Blicksprünge, Periphere Wahrnehmung, Foveale Fixierung, Reaktionszeit',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Sakkaden Sehtraining - Schnelle Blicksprünge & Reaktions-Drill',
  url: 'https://skilldrills.online/de/drills/reaction-speed/saccadic-gallery',
  description: 'Trainieren von schnellen Augenbewegungen und präziser Zielerfassung im Browser.',
  genre: ['Vision Training', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Anleitung: Sakkadische Augenbewegungen und Blicksprünge trainieren',
  description: 'Schritt-für-Schritt-Anleitung zur Steigerung der visuellen Scan-Geschwindigkeit.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Sitzposition einnehmen und Blick zentrieren',
      text: 'Setzen Sie sich in ca. 50–70 cm Abstand mittig vor den Bildschirm und fixieren Sie das zentrale Kreuz.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/saccadic-gallery#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Periphere Zielblitze wahrnehmen',
      text: 'Erfassen Sie im peripheren Blickfeld aufblitzende Zielscheiben, ohne den Kopf zu drehen.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/saccadic-gallery#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Ballistischen Blicksprung ausführen',
      text: 'Schnellen Sie mit beiden Augen blitzartig auf die Zielkoordinaten, ohne Zwischenkorrekturen.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/saccadic-gallery#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Foveal erfassen und Treffer bestätigen',
      text: 'Fixieren Sie das Ziel im fovealen Zentrum und klicken Sie präzise zur Latenzerfassung.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/saccadic-gallery#step-4',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-15',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Was sind sakkadische Augenübungen (Sakkadentraining)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sakkadische Augenübungen sind strukturierte Sehtrainingsdrills, welche die Geschwindigkeit, Präzision und Latenz schneller Blicksprünge (Sakkaden) zwischen Fixationspunkten im Gesichtsfeld schulen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was genau ist eine Sakkade im menschlichen Sehsystem?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Eine Sakkade ist eine schnelle, synchrone Bewegung beider Augen von einem Fixationspunkt zum nächsten. Mit Spitzengeschwindigkeiten von 200 bis 700 Grad pro Sekunde ist sie eine der schnellsten biologischen Bewegungen überhaupt (Rayner, 1998).',
      },
    },
    {
      '@type': 'Question',
      name: 'Was versteht man unter Express-Sakkaden (Fischer & Boch, 1984)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Express-Sakkaden sind extrem kurzlatente Blicksprünge (~100–120 ms), die über subkortikale Schaltkreise im Colliculus superior ausgelöst werden, wenn die Fixationshemmung kurz vor Reizauftritt aufgehoben wird.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welchen Vorteil bringt Sakkadentraining in Shooter-Spielen und Sport?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Schnellere Sakkaden ermöglichen es Spielern, Ecken abzusuchen, die Minikarte zu erfassen und plötzlich auftauchende Gegner mit minimaler visueller Unterdrückungslatenz anzuvisieren.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was ist die sogenannte sakkadische Unterdrückung (Saccadic Suppression)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Während des 20–40 ms dauernden Blicksprungs schaltet das Gehirn die bewusste visuelle Wahrnehmung kurzzeitig stumm, um ein Verwischen des Bildes bei hohen Geschwindigkeiten zu verhindern.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was versteht man unter Sakkadendysmetrie?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sakkadendysmetrie bezeichnet das Zu-Kurz-Springen (Hypometrie) oder Über-das-Ziel-Hinausschießen (Hypermetrie) der Augen, was korrigierende Mikrosakkaden erfordert und Zeit kostet.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Rolle spielt die Bildwiederholrate des Monitors beim Sakkadentest?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ein 144Hz- oder 240Hz-Monitor aktualisiert das Bild alle 4 bis 7 ms (Woods et al., 2015), wodurch Zielwechsel früher wahrgenommen werden und das Auge rascher reagieren kann.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kann Sakkadentraining auch die Lesegeschwindigkeit steigern?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Präzise Sakkadenkontrolle sorgt für flüssige Zeilensprünge und reduziert zeitraubende Regressionen (Rücksprünge) beim schnellen Lesen von Texten.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie oft sollte man Sakkaden-Übungen durchführen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Täglich 5 bis 10 Minuten genügen vollkommen. Eine Überlastung der Augenmuskulatur führt zu Asthenopie; kurze, hochkonzentrierte Serien sind am effektivsten.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ist dieses Sehtraining kostenlos und im Browser nutzbar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, das Sakkaden-Training von SkillDrills ist zu 100 % kostenlos, läuft ohne Installationen im Browser und misst Reaktionszeiten mit Sub-Millisekunden-Präzision.',
      },
    },
  ],
};

const saccadicGuide = {
  heading: 'Leitfaden: Sakkadische Augenbewegungen & Visuelles Scan-Training',
  intro: [
    'Sakkaden sind rasche, ballistische Blicksprünge, die den Brennpunkt des Auges von einem Fixationspunkt zum nächsten katapultieren. In der Kognitionspsychologie und der Sportophthalmologie gelten sie als fundamentale Grundlage für rasche Orientierung und Reaktionsschnelligkeit (Rayner, 1998; Fischer & Boch, 1984).',
    'Mit Winkelgeschwindigkeiten von bis zu 700°/s stellen Sakkaden das menschliche Sehsystem vor besondere Herausforderungen: Um Bewegungsunschärfe zu vermeiden, unterdrückt das Gehirn während des Sprungs die Bildverarbeitung (sakkadische Suppression). Treffen die Augen das Ziel ungenau (Sakkadendysmetrie), müssen zeitaufwendige Korrektursakkaden nachgeschoben werden. Dieses Training trainiert präzise Zielansteuerung und minimiert die Reaktionslatenz.',
    'Messmethodik im Browser: Sämtliche Durchläufe werden clientseitig über die High Resolution Time API (performance.now()) gemessen. Zu beachten sind hardwarebedingte Latenzen des Displays (~16,7 ms bei 60 Hz, ~6,9 ms bei 144 Hz und ~4,1 ms bei 240 Hz; Woods et al., 2015) sowie die Abfragerate der Maus (~1 ms bei 1000 Hz). Unterschiede unter 5 ms stellen messtechnisches Grundrauschen dar.',
    'Führen Sie das Training regelmäßig auf demselben Bildschirm durch, um echte neurophysiologische Fortschritte bei der Augensteuerung zu erzielen.',
  ],
  benchmarks: {
    title: 'Referenztabelle: Sakkaden-Latenz und Blicksprung-Präzision',
    headers: ['Sakkaden-Latenz', 'Leistungsstufe', 'Sakkadische Dynamik', 'Funktionale Einstufung', 'Empfohlener Trainingsfokus'],
    rows: [
      ['< 130 ms', 'Tier 1 (Express-Sakkaden / Pro)', 'Subkortikale Direktauslösung (Colliculus Superior); minimale Hemmung', 'Profi-Esports & Kampfpiloten (Fischer & Boch, 1984)', 'Maximale Blicksprung-Weite trainieren'],
      ['130 – 170 ms', 'Tier 2 (Elite)', 'Extrem schnelle kortikale Initiierung; kaum Fixationsverzögerung', 'Leistungsstarke Wettkämpfer & Ballsportler', 'Zielstopp-Präzision (kein Overshoot) festigen'],
      ['171 – 220 ms', 'Tier 3 (Fortgeschritten)', 'Normative gesunde Blicksprung-Latenz', 'Durchschnittlicher gesunder Erwachsener (Rayner, 1998)', 'Peripheren Wahrnehmungsradius erweitern'],
      ['221 – 280 ms', 'Tier 4 (Mittelstufe)', 'Verlängerte Fixationshemmung; spürbare Suchverzögerung', 'Gelegentliche Ermüdung oder unvollständige Erholung', '20-20-20 Augenpausen einlegen'],
      ['> 280 ms', 'Tier 5 (Basis / Dysmetrie)', 'Deutliche Sakkadendysmetrie mit korrigierenden Mikrosakkaden', 'Übermüdete Augenmuskeln oder Bildschirmüberlastung', 'Zunächst auf Treffergenauigkeit vor Schnelligkeit achten'],
    ],
    note: 'Klassifikation basierend auf okulomotorischen Studien (Rayner, 1998; Fischer & Boch, 1984; Leigh & Zee, 2015) angepasst an digitale Monitore (Woods et al., 2015).',
  },
  techniques: {
    title: 'Techniken zur Optimierung der Blicksprung-Geschwindigkeit',
    items: [
      {
        name: 'Kopfbewegungen isolieren',
        desc: 'Bewegen Sie ausschließlich die Augenäpfel und halten Sie Kopf und Nacken stabil. Reine Augenbewegungen sind mehr als doppelt so schnell wie kombinierte Kopf-Auge-Drehungen.',
        tips: 'Legen Sie das Kinn bei Bedarf locker auf die Hand, um unbewusste Kopfdrehungen zu bemerken.',
      },
      {
        name: 'Periphere Reizdetektion schärfen',
        desc: 'Nutzen Sie die periphere Netzhaut, um den Zielpunkt im Augenwinkel zu orten, bevor der bewusste Blicksprung gestartet wird.',
        tips: 'Halten Sie einen weichen Blick auf der Bildschirmmitte.',
      },
      {
        name: 'Punktgenaue Fovealisierung ohne Überschießen',
        desc: 'Vermeiden Sie Sakkadendysmetrie: Bremsen Sie den Blicksprung direkt auf dem Zielzentrum ab, um Korrektursakkaden zu vermeiden.',
        tips: 'Präzision hat Vorrang vor blinder Hast.',
      },
      {
        name: 'Augenentspannung & Befeuchtung',
        desc: 'Konzentriertes Arbeiten am Bildschirm reduziert die Blinzelfrequenz um bis zu 60 %. Trockene Augen verschlechtern die motorische Steuerungsgenauigkeit.',
        tips: 'Regelmäßig bewusst blinzeln und Pausen einlegen.',
      },
    ],
  },
  steps: [
    'Setzen Sie sich mittig in circa 60 cm Distanz vor den Bildschirm.',
    'Starten Sie den Drill und fokussieren Sie den zentralen Startpunkt.',
    'Sobald im Gesichtsfeld ein Ziel aufblitzt, richten Sie die Augen blitzartig darauf.',
    'Erfassen Sie das Ziel scharf im Blickzentrum und klicken Sie es sofort an.',
    'Wiederholen Sie die Durchgänge und analysieren Sie Ihre durchschnittliche Blicksprung-Latenz.',
  ],
  audience: 'Esports-Athleten (FPS, MOBA), Rennfahrer, Sportler in temporeichen Disziplinen und alle, die ihre visuelle Reaktionsfähigkeit und Augenbeweglichkeit steigern wollen.',
  faqs: faqSchema.mainEntity.map((q) => ({ q: q.name, a: q.acceptedAnswer.text })),
  sources: pickSources('rayner1998', 'fischer1984', 'leigh2015', 'woods2015'),
  related: [
    { href: '/de/drills/reaction-speed', label: 'Reaktionsschnelligkeit Hub' },
    { href: '/de/drills/reaction-speed/reaction-time-test', label: 'Reaktionstest (Reaktionszeit Test)' },
    { href: '/de/drills/reaction-speed/reflex-training-drill', label: 'Reflextraining & Reaktionsspiel' },
    { href: '/de/drills/reaction-speed/visual-tracking-speed-test', label: 'Visueller Reaktionstest' },
  ],
};

export default function GermanSaccadicGalleryPage() {
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
      <SaccadicGalleryClient copy={{ title: 'Sakkaden Sehtraining' }} />
      <DrillGuide guide={saccadicGuide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="reaction-speed" currentHref="https://skilldrills.online/de/drills/reaction-speed/saccadic-gallery" />
      </div>
    </>
  );
}
