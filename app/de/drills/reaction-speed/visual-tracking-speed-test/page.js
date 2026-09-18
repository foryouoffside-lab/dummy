import VisualTrackingSpeedTestWrapper from '@/app/drills/reaction-speed/visual-tracking-speed-test/VisualTrackingSpeedTestWrapperLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — de-DE (reaction-speed / visual-tracking-speed-test)
// PRIMARY DOMESTIC: "visueller reaktionstest" / "blickverfolgung test"
// SECONDARY / LSI:
//   "reaktionstest auge" / "blickfolgebewegung" / "dynamische sehschärfe"
//   "reaktionszeit trainieren" / "hand auge koordination"
// ============================================================

export const metadata = {
  title: 'Visueller Reaktionstest – Blickverfolgung | SkillDrills',
  description:
    'Kostenloser visueller Reaktionstest online. Trainiere Blickverfolgung, dynamische Sehschärfe und Reaktionszeit gegen bewegte Ziele direkt im Browser.',
  keywords: [
    'visueller reaktionstest',
    'reaktionstest auge',
    'blickverfolgung test',
    'blickfolgebewegung',
    'dynamische sehschärfe',
    'reaktionszeit trainieren',
    'reflexe testen',
    'visuelle reaktionszeit',
    'hand auge koordination',
    'sakkaden training',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/reaction-speed/visual-tracking-speed-test',
    languages: getAlternateLanguages('/drills/reaction-speed/visual-tracking-speed-test'),
  },
  openGraph: {
    title: 'Visueller Reaktionstest – Blickverfolgung & Reflexe | SkillDrills',
    description:
      'Kostenloser visueller Reaktionstest online. Verfolge bewegte Ziele mit den Augen und trainiere dynamische Sehschärfe und Reflexe im Browser.',
    url: 'https://skilldrills.online/de/drills/reaction-speed/visual-tracking-speed-test',
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visueller Reaktionstest – Blickverfolgung & Reflexe | SkillDrills',
    description:
      'Kostenloser visueller Reaktionstest online. Trainiere Blickverfolgung und Hand-Auge-Koordination.',
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
    { '@type': 'ListItem', position: 4, name: 'Visueller Reaktionstest', item: 'https://skilldrills.online/de/drills/reaction-speed/visual-tracking-speed-test' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Visueller Reaktionstest – Blickverfolgung & Reflexe',
  alternateName: ['Blickverfolgung Test', 'Visueller Reaktionstest Online', 'Dynamische Sehschärfe Test'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description:
    'Wissenschaftliches Online-Testverfahren zur Messung von Blickfolgebewegung, Nachholsakkaden und visueller Abfanggeschwindigkeit bei dynamischen Zielen.',
  browserRequirements: 'Moderner Webbrowser mit JavaScript-Unterstützung (Chrome, Firefox, Safari, Edge)',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Visueller Reaktionstest — Blickverfolgung & Reflexe | SkillDrills',
  url: 'https://skilldrills.online/de/drills/reaction-speed/visual-tracking-speed-test',
  description:
    'Kostenloses Reaktionsspiel zum Training von Blickverfolgung, dynamischer Sehschärfe und Sakkaden im Browser.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'Erfordert einen modernen Webbrowser mit JavaScript.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: 'Blickverfolgung, Dynamische Sehschärfe, Nachholsakkaden, Hand-Auge-Koordination, Kinetische Interzeption',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Visueller Reaktionstest - Blickverfolgung & Zielerfassung',
  url: 'https://skilldrills.online/de/drills/reaction-speed/visual-tracking-speed-test',
  description: 'Messen und Trainieren von Blickfolgebewegungen und schnellen Augenreflexen im Browser.',
  genre: ['Reflex Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Anleitung: Visuelle Verfolgungsgeschwindigkeit trainieren',
  description: 'Schritt-für-Schritt-Anleitung zur Verbesserung von Blickfolgebewegung und Abfangreaktionen.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Drill initialisieren',
      text: 'Klicken Sie auf «Drill starten», um das Vollbild-Testfeld zu aktivieren.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/visual-tracking-speed-test#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Ziel mit dem Blick fixieren',
      text: 'Richten Sie die foveale Sehachse auf den bewegten Kreis und verfolgen Sie dessen Flugbahn.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/visual-tracking-speed-test#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Plötzliche Richtungswechsel abfangen',
      text: 'Reagieren Sie bei abrupten Hakenschlägen sofort mit einer Nachholsakkade und zentrieren Sie den Mauszeiger.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/visual-tracking-speed-test#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Ergebnis & Latenz auswerten',
      text: 'Überprüfen Sie Ihre durchschnittliche Wiedererfassungszeit, Trefferquote und Tracking-Stabilität.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/visual-tracking-speed-test#step-4',
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
      name: 'Was misst dieser visuelle Reaktionstest?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Er misst, wie flüssig und präzise die Augen bewegten Objekten im Raum folgen. Erfasst werden die Stabilität der Blickfolgebewegung, die dynamische Sehschärfe sowie die Latenz von Nachholsakkaden bei plötzlichen Richtungs- oder Geschwindigkeitswechseln.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was unterscheidet Blickfolgebewegung (Smooth Pursuit) von Sakkaden?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Blickfolgebewegung (Smooth Pursuit) ist ein kontinuierlicher, willkürlicher Vorgang, der ein bewegtes Ziel auf der Fovea hält (typisch bis ca. 30°–60°/s; Krauzlis, 2004). Sakkaden sind ruckartige, ballistische Sprünge (200°–700°/s), die das Auge blitzschnell neu ausrichten, wenn das Ziel beschleunigt (Rashbass, 1961).',
      },
    },
    {
      '@type': 'Question',
      name: 'Kann ein Standard-Sehtest Defizite bei der Blickverfolgung aufdecken?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nein. Ein normaler Sehtest prüft die statische Sehschärfe an ruhenden Buchstaben. Die dynamische okulomotorische Steuerung, Geschwindigkeitsverarbeitung und kinetische Zielreerfassung werden dabei nicht gemessen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Faktoren führen zu langsamerer visueller Verfolgung?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lange Bildschirmarbeit, Ermüdung der Augenmuskeln, Schlafmangel sowie neurologische Überlastungen oder vestibuläre Dysbalancen verlängern die Verfolgungslatenz messbar.',
      },
    },
    {
      '@type': 'Question',
      name: 'Warum ist die dynamische Sehschärfe im Gaming und Sport so entscheidend?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In temporeichen Sportarten (Tennis, Motorsport, Hockey) und Shooter-Games (Apex, Valorant) entscheidet die Tracking-Geschwindigkeit darüber, wie rasch Flugbahnwechsel erkannt und Fadenkreuzbewegungen synchronisiert werden (Land & McLeod, 2000).',
      },
    },
    {
      '@type': 'Question',
      name: 'Lässt sich die visuelle Verfolgungsgeschwindigkeit trainieren?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Regelmäßige Reizwiederholung stärkt die kortikalen Verbindungen zwischen dem visuellen Areal MT/V5, den frontalen Augenfeldern (FEF) und dem Kleinhirn, was Sakkadenlatenzen verkürzt und die Abfanggenauigkeit steigert.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was sind Nachholsakkaden bei der Zielverfolgung?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Beschleunigt ein Ziel über die Kapazität der Folgebewegung hinaus, wandert das Netzhautbild von der Fovea ab. Das Gehirn löst eine rasche Nachholsakkade (Catch-up Saccade) aus, um die Distanz zu überbrücken und das Ziel wieder zu zentrieren (Rashbass, 1961).',
      },
    },
    {
      '@type': 'Question',
      name: 'Welchen Einfluss hat die Bildwiederholrate (Hz) des Monitors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ein 60-Hz-Monitor zeigt alle 16,7 ms ein neues Bild, während ein 144-Hz-Display auf 6,9 ms und 240 Hz auf 4,1 ms herabgeht (Woods et al., 2015). Höhere Bildraten minimieren Mikroruckler und ermöglichen eine deutlich flüssigere Augenverfolgung.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie oft sollte man die visuelle Blickverfolgung trainieren?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Täglich 3 bis 5 Minuten fokussiertes Training reichen aus. Kurze Einheiten fördern die neuromuskuläre Anpassung optimal, ohne die Ziliarmuskulatur der Augen zu überlasten.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ist dieser Blickverfolgungstest kostenlos und ohne Download nutzbar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Der Test von SkillDrills ist 100 % kostenlos, läuft direkt im Webbrowser ohne Installation oder Registrierung und erfasst Ereignisse mit der High Resolution Time API (performance.now()).',
      },
    },
  ],
};

const visualTrackingGuide = {
  heading: 'Leitfaden: Visuelle Verfolgungsgeschwindigkeit & Kinetische Interzeption',
  intro: [
    'Die visuelle Verfolgungsgeschwindigkeit beschreibt die koordinierte Fähigkeit des okulomotorischen und motorischen Systems, dynamischen Reizen im Raum zu folgen, plötzliche Bahnanomalien zu erkennen und den Blickpunkt unmittelbar nachzujustieren (Krauzlis, 2004; Land & McLeod, 2000).',
    'Dieser Test misst Ihre Reaktionsfähigkeit auf unvorhersehbare Haken und Geschwindigkeitsänderungen. Bewegt sich ein Ziel gleichförmig, führt das Auge eine geschmeidige Blickfolgebewegung (Smooth Pursuit) aus. Ändert das Objekt abrupt die Richtung, bricht die Folgebewegung kurzzeitig zusammen und das zentrale Nervensystem feuert eine Nachholsakkade ab (Rashbass, 1961). Die Software erfasst diese Wiedererfassungszeiten mit hochpräzisen performance.now()-Zeitstempeln.',
    'Messgenauigkeit und Hardware-Einfluss: Sämtliche Messungen laufen clientseitig in Ihrem Browser. Zu beachten ist, dass Browsertimer aus Sicherheitsgründen (Spectre-Schutz) auf ca. 1 ms gerundet werden und die Bildschirm-Bildwiederholrate eine Zeitquantisierung erzeugt (~16,7 ms bei 60 Hz, ~6,9 ms bei 144 Hz, ~4,1 ms bei 240 Hz; Woods et al., 2015). Die Polling-Rate der Maus fügt weitere ~8 ms bei 125 Hz gegenüber ~1 ms bei 1000 Hz hinzu. Differenzen unter 5 ms stellen messtechnisches Rauschen dar.',
    'Vergleichen Sie Ihre Durchgänge daher stets auf identischer Hardware, um echte neuromuskuläre Fortschritte bei der Zielverfolgung über die Wochen hinweg transparent nachzuvollziehen.',
  ],
  benchmarks: {
    title: 'Referenztabelle: Wiedererfassungszeit & Blickverfolgung',
    headers: ['Re-Akquisitionszeit', 'Okulomotorische Beurteilung', 'Verfolgungs- & Sakkadenmechanik', 'Funktionaler Kontext', 'Empfohlener Trainingsfokus'],
    rows: [
      ['< 180 ms', 'Express-Prädiktiv', 'Nahezu verzögerungsfreie Fovea-Zentrierung; antizipatorische Bahnprojektion', 'Motorsport-Elite / Kampfjetpiloten / Pro-Gamer (Land & McLeod, 2000)', 'Weichen Blickfokus bei längeren Serien stabil halten'],
      ['180 – 230 ms', 'Hochdynamische Blickfolge', 'Minimale Nachholsakkaden-Latenz mit schneller Geschwindigkeitsanpassung', 'Kompetitive Ballsportarten / High-Rank Gaming (Krauzlis, 2004)', 'Periphere Geschwindigkeitsabschätzung verfeinern'],
      ['231 – 290 ms', 'Normativer Standard', 'Typische physiologische Latenz für visuelle Neuberechnung', 'Durchschnittlicher gesunder Erwachsener', 'Augenmuskeln auf schnellere Richtungswechsel konditionieren'],
      ['291 – 360 ms', 'Verzögert / Ermüdet', 'Spürbarer Verzug vor Zünden der Sakkade; Ziel wird hinterhergezogen', 'Lange Bildschirmzeit, trockene Augen oder geringer Kontrast', '20-20-20-Regel anwenden; Monitor-Refresh-Rate prüfen'],
      ['> 360 ms', 'Erhöhte Dysmetrie', 'Mehrere korrigierende Mikrosakkaden nötig, um Ziel wieder einzufangen', 'Untrainierte Okulomotorik oder starke visuelle Ablenkung', 'Ruhige geometrische Linienführung vor Geschwindigkeitssteigerung üben'],
    ],
    note: 'Diese Werte basieren auf neurowissenschaftlicher Literatur zur Okulomotorik (Rashbass, 1961; Krauzlis, 2004; Land & McLeod, 2000), angepasst an Web-Display-Latenzen (Woods et al., 2015).',
  },
  techniques: {
    title: 'Techniken zur Optimierung der visuellen Verfolgungsleistung',
    items: [
      {
        name: 'Blickfolgebewegung vs. Nachholsakkaden',
        desc: 'Bewegt sich ein Ziel gleichmäßig unter 30 Grad Sehwinkel pro Sekunde, folgt das Auge geschmeidig. Bei plötzlichen Haken bricht die Folgebewegung ab und eine schnelle Sakkade zentriert das Ziel neu.',
        tips: 'Lernen Sie, visuell am Ziel fixiert zu bleiben, ohne vorzeitig hektisch wegzuspringen.',
      },
      {
        name: 'Antizipatorisches Vorhalten',
        desc: 'Nicht dem hinteren Rand des Ziels hinterherschauen, sondern den Blick leicht vorausführen und die Flugbahn antizipieren.',
        tips: 'Prellwinkel an Kanten nicht blind erraten, sondern den visuellen Rebound-Vektor abwarten.',
      },
      {
        name: 'Lockerung der Handmuskulatur',
        desc: 'Ein zu verkrampfter Griff an der Maus hemmt die feine Fingermuskulatur bei Hochgeschwindigkeits-Korrekturen.',
        tips: 'Zwischen den Durchgängen Handgelenke lockern und bewusst atmen.',
      },
      {
        name: 'Dynamische Sehschärfe (DVA) fördern',
        desc: 'Die Fähigkeit, feine Details an bewegten Objekten scharf zu sehen, wird durch gezieltes kinetisches Tracking gestärkt.',
        tips: 'Auf gute Raumbeleuchtung achten, um Blendung und Pupillenermüdung zu minimieren.',
      },
    ],
  },
  steps: [
    'Nehmen Sie eine bequeme Sitzhaltung etwa eine Armlänge vor dem Monitor ein.',
    'Klicken Sie auf «Drill starten» und fixieren Sie die kreisende Kugel mit den Augen.',
    'Folgen Sie dem Ziel ruhig auf seiner anfänglichen Flugbahn.',
    'Reagieren Sie bei einem abrupten Hakenschlag sofort und zentrieren Sie den Zeiger.',
    'Analysieren Sie nach Ablauf der Zeit Ihre durchschnittliche Re-Akquisitionszeit und Konstanz.',
  ],
  audience: 'Sportler in Ballsportarten, Rennfahrer, Shooter-Gamer (Valorant, CS2, Apex Legends) und alle, die ihre dynamische Sehschärfe und Reflexe schärfen wollen.',
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('krauzlis2004', 'rashbass1961', 'land2000', 'woods2015'),
  related: [
    { href: '/de/drills/reaction-speed', label: 'Reaktionsschnelligkeit Hub' },
    { href: '/de/drills/reaction-speed/reaction-time-test', label: 'Reaktionstest (Reaktionszeit Test)' },
    { href: '/de/drills/reaction-speed/reflex-training-drill', label: 'Reflextraining & Reaktionsspiel' },
    { href: '/de/drills/reaction-speed/reaction-game', label: 'Reaktionsspiel Online' },
  ],
};

export default function GermanVisualTrackingSpeedTestPage() {
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
      <VisualTrackingSpeedTestWrapper copy={{ title: 'Visueller Reaktionstest' }} />
      <DrillGuide guide={visualTrackingGuide} />
    </>
  );
}
