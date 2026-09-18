import FPSTrackingTrainerClient from '@/app/drills/reaction-speed/fps-tracking-trainer/FPSTrackingTrainerWrapperLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS – de-DE (reaction-speed / fps-tracking-trainer)
// PRIMARY DOMESTIC: "FPS Tracking Trainer" / "Tracking Aim Übung"
// SECONDARY / LSI:
//   "Smooth Aiming Trainieren" / "Maus Tracking Test"
//   "Zielverfolgung FPS" / "Zittern beim Zielen beheben"
// ============================================================

export const metadata = {
  title: 'FPS Tracking Trainer – Smooth Aiming Übung | SkillDrills',
  description: 'Kostenloser FPS-Tracking-Trainer online. Trainiere flüssiges Zielen, Strafe-Tracking und eliminiere zittriges Aiming für CS2 und Valorant im Browser.',
  keywords: [
    'fps tracking trainer',
    'tracking aim übung',
    'smooth aiming trainieren',
    'maus tracking test',
    'zielverfolgung fps',
    'zittern beim zielen beheben',
    'aim trainer strafe',
    'flüssiges zielen shooter',
    'reaktive zielverfolgung',
    'apex legends tracking routine',
    'mauskontrolle verbessern',
    'smooth pursuit training',
  ],
  openGraph: {
    title: 'FPS Tracking Trainer – Smooth Aiming Übung | SkillDrills',
    description: 'Kostenloser FPS-Tracking-Trainer online. Trainiere flüssiges Zielen, Strafe-Tracking und eliminiere zittriges Aiming für CS2 und Valorant im Browser.',
    type: 'article',
    url: 'https://skilldrills.online/de/drills/reaction-speed/fps-tracking-trainer',
    siteName: 'SkillDrills',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FPS Tracking Trainer – Smooth Aiming Übung | SkillDrills',
    description: 'Kostenloser FPS-Tracking-Trainer online. Trainiere flüssiges Zielen, Strafe-Tracking und eliminiere zittriges Aiming für CS2 und Valorant im Browser.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/reaction-speed/fps-tracking-trainer',
    languages: getAlternateLanguages('/drills/reaction-speed/fps-tracking-trainer'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills Startseite', item: 'https://skilldrills.online/de' },
    { '@type': 'ListItem', position: 2, name: 'Drills Hub', item: 'https://skilldrills.online/de/drills' },
    { '@type': 'ListItem', position: 3, name: 'Reaktionsschnelligkeit', item: 'https://skilldrills.online/de/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'FPS Tracking Trainer', item: 'https://skilldrills.online/de/drills/reaction-speed/fps-tracking-trainer' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'FPS Tracking Trainer – Smooth Aiming & Zielverfolgung',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Online-Aim-Trainer für kontinuierliche Zielverfolgung, Strafe-Tracking und Beseitigung von Fadenkreuz-Zittern in Ego-Shootern.',
  url: 'https://skilldrills.online/de/drills/reaction-speed/fps-tracking-trainer',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  inLanguage: 'de-DE',
  dateModified: '2026-09-15',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'FPS Tracking Aim Trainer',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'HTML5 Canvas, moderner Webbrowser mit Pointer-Lock-Unterstützung',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  url: 'https://skilldrills.online/de/drills/reaction-speed/fps-tracking-trainer',
  inLanguage: 'de-DE',
  dateModified: '2026-09-15',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'FPS Tracking Trainer – Reaktives Zielverfolgungsspiel',
  url: 'https://skilldrills.online/de/drills/reaction-speed/fps-tracking-trainer',
  description: 'Aim-Training-Spiel zur Perfektionierung von Smooth Pursuit Augenbewegungen und kontinuierlicher Mausführung bei unberechenbaren Zielen.',
  genre: ['Action', 'Aim Trainer', 'Esports Training'],
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
      name: 'Was ist ein FPS Tracking Aim Trainer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ein FPS Tracking Trainer schult das okulomotorische System für geschmeidige Blickfolgebewegungen (Smooth Pursuit). Er trainiert Spieler darin, das Fadenkreuz konstant und ruckelfrei auf sich bewegenden Zielen zu halten.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie verbessert man Tracking Aim in Ego-Shootern effektiv?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Durch drei fundamentale Prinzipien: Reduzierung der Griffspannung gegen Muskelzittern, Ablesen der echten Zielgeschwindigkeit statt blindem Raten und koordinierte Bewegung aus Handgelenk (Feinjustierung) und Unterarm (weite Gleitbewegungen).',
      },
    },
    {
      '@type': 'Question',
      name: 'Warum zittert das Fadenkreuz beim Tracking (Shaky Aim)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hauptursachen sind übermäßige Muskelspannung in Hand und Fingern, eine zu hohe Mausempfindlichkeit, die physiologische Mikrotremoren verstärkt, oder der Versuch, Fehler durch Mikroflicks statt flüssiger Verfolgung auszugleichen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Sollte man beim Tracking auf das Fadenkreuz oder das Ziel schauen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Schauen Sie direkt auf das Zielmodell. Nach Krauzlis (2004) muss die visuelle Aufmerksamkeit auf den Geschwindigkeitsvektor des Ziels fokussiert bleiben; das Starren auf das Fadenkreuz erzeugt kognitive Verzögerungen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was versteht man unter Smooth Pursuit beim Aiming?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Smooth Pursuit (Rashbass, 1961) ist die Fähigkeit der Augenmuskeln, die Augengeschwindigkeit kontinuierlich an die Zielgeschwindigkeit anzugleichen, wodurch das Bild auf der Fovea stabilisiert wird.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Mausempfindlichkeit (Sensitivität) eignet sich am besten für Tracking?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Eine moderate Mausempfindlichkeit zwischen 28 cm und 45 cm pro 360-Grad-Drehung bietet die optimale Balance aus feiner Präzision auf Distanz und flüssiger Armfreiheit bei Richtungswechseln im Nahkampf.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hilft ein Monitor mit 144 Hz oder 240 Hz beim Tracking Aim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, Bildschirme mit hohen Bildwiederholraten senken Darstellungsintervalle auf 4,1 ms bei 240 Hz (Woods et al., 2015). Dies reduziert Bewegungsunschärfe und ermöglicht früheres Erkennen von Tempowechseln.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie trainiert man unvorhersehbares Strafe-Tracking am besten?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nutzen Sie reaktive Szenarien mit zufälligen Richtungswechseln. Versuchen Sie nicht, die Umkehr zu erahnen, sondern warten Sie auf die visuelle Bestätigung und steuern Sie die Maus ruhig um.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie lange sollte man Tracking täglich üben?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '15 bis 25 Minuten konzentriertes Training pro Tag sind ideal. Bei längeren Einheiten setzt neuromuskuläre Ermüdung ein, die unsaubere Ausgleichsbewegungen begünstigt.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ist dieser Tracking-Trainer kostenlos nutzbar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, SkillDrills stellt den FPS Tracking Trainer vollständig kostenlos und direkt im Browser bereit – ohne Downloads, Installationen oder Registrierung.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'FPS Tracking Trainer Anleitung',
  description: 'Schritt-für-Schritt-Anleitung für flüssiges Zielen, Strafe-Tracking und Fadenkreuzkontrolle.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Sensitivität kalibrieren und Vollbild aktivieren',
      text: 'Wählen Sie Ihre Zielgeschwindigkeit und schalten Sie auf Vollbild, um Ablenkungen durch Browserleisten auszuschließen.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/fps-tracking-trainer#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Blick auf das Ziel zentrieren',
      text: 'Konzentrieren Sie Ihren Blick ausschließlich auf das sich bewegende Ziel und nicht auf Ihr Fadenkreuz.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/fps-tracking-trainer#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Gleichmäßige Verfolgung ausführen (Smooth Pursuit)',
      text: 'Gleichen Sie die Cursor-Geschwindigkeit ohne Anspannung der Hand sanft an die Zielbewegung an.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/fps-tracking-trainer#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Auf Richtungswechsel ruhig reagieren',
      text: 'Warten Sie die Richtungsänderung des Ziels optisch ab und steuern Sie ohne hektische Ruckler kontrolliert nach.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/fps-tracking-trainer#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('krauzlis2004', 'rashbass1961', 'green2003', 'woods2015'),
  intro: {
    title: 'FPS Tracking Trainer & Leitfaden für flüssiges Zielen',
    paragraphs: [
      'In modernen Shootern wie Apex Legends, Overwatch 2 und Valorant ist Tracking Aim die grundlegende mechanische Fähigkeit, um Gegner mit hohem Bewegungstempo zuverlässig auszuschalten. Im Gegensatz zum isolierten Flicking erfordert Tracking kontinuierliche neuromuskuläre Rückkopplungsschleifen.',
      'Wissenschaftlich basiert dieses Zielen auf Blickfolgebewegungen (Smooth Pursuit; Rashbass, 1961). Während Sakkaden durch Positionsfehler ausgelöst werden, orientiert sich Smooth Pursuit primär am Geschwindigkeitsfehler des Ziels. Ruckeliges Zielen entsteht fast immer durch übermäßige Griffkraft und den falschen Versuch, Geschwindigkeitsunterschiede durch ständige Mikroflicks auszugleichen.',
      'Auf Monitoren mit hohen Bildwiederholraten (Woods et al., 2015) ermöglicht dieser Drill das Training reaktiver Richtungswechsel (Krauzlis, 2004; Green & Bavelier, 2003), sodass Ihr Fadenkreuz wie magnetisch am Ziel haften bleibt.',
    ],
  },
  benchmarks: {
    title: 'Leistungs-Benchmarks: Tracking-Präzision und Haltezeit',
    headers: ['Leistungsstufe', 'Rang', 'Tracking-Genauigkeit', 'Verfolgungszeit', 'Perzentil'],
    rows: [
      ['Tier 1', 'Grandmaster / Pro', '95 %+', '> 90 % Haltezeit', 'Top 1 %'],
      ['Tier 2', 'Master / Elite', '88 – 94 %', '80 – 89 % Haltezeit', 'Top 5 %'],
      ['Tier 3', 'Pro / Diamond', '78 – 87 %', '68 – 79 % Haltezeit', 'Top 15 %'],
      ['Tier 4', 'Intermediate / Gold', '65 – 77 %', '50 – 67 % Haltezeit', 'Top 50 %'],
      ['Tier 5', 'Novice / Silver', '< 65 %', '< 50 % Haltezeit', 'Basis'],
    ],
    note: 'Klassifikation basierend auf okulomotorischen Studien zu Blickfolgebewegungen (Rashbass, 1961; Krauzlis, 2004) und Reaktionszeiten auf modernen Gaming-Displays (Woods et al., 2015).',
  },
  protocols: {
    title: 'Wissenschaftliche Übungsprotokolle für Tracking',
    description: 'Strukturierte Trainingsphasen zur Beseitigung von Fadenkreuz-Zittern und Perfektionierung der Mausführung.',
    items: [
      {
        title: 'Sensitivität kalibrieren und Vollbild aktivieren',
        description: 'Wählen Sie Ihre Zielgeschwindigkeit und schalten Sie auf Vollbild, um Ablenkungen durch Browserleisten auszuschließen.',
      },
      {
        title: 'Blick auf das Ziel zentrieren',
        description: 'Konzentrieren Sie Ihren Blick ausschließlich auf das sich bewegende Ziel und nicht auf Ihr Fadenkreuz.',
      },
      {
        title: 'Gleichmäßige Verfolgung ausführen (Smooth Pursuit)',
        description: 'Gleichen Sie die Cursor-Geschwindigkeit ohne Anspannung der Hand sanft an die Zielbewegung an.',
      },
      {
        title: 'Auf Richtungswechsel ruhig reagieren',
        description: 'Warten Sie die Richtungsänderung des Ziels optisch ab und steuern Sie ohne hektische Ruckler kontrolliert nach.',
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

export default function GermanFPSTrackingTrainerPage() {
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
      <FPSTrackingTrainerClient copy={{ title: 'FPS Tracking Trainer' }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="reaction-speed"
          currentHref="https://skilldrills.online/de/drills/reaction-speed/fps-tracking-trainer"
        />
      </div>
    </>
  );
}
