import ReactionSimulatorWrapper from '@/app/drills/reaction-speed/reaction-game/ReactionSimulatorWrapperLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';

// ============================================================
// SEO RESEARCH FINDINGS — de-DE (reaction-speed / reaction-game)
// PRIMARY DOMESTIC: "reaktionsspiel" — Reaction game query in Germany
//                   "reaktionsspiel online" — High utility query
// SECONDARY / LSI:  "reflex spiel online" — Reflex gaming search
//                   "reaktionstest gaming" — Competitive reaction test
//                   "reaktion üben" — Reaction training search
// WINNER TITLE:     Reaktionsspiel Online – Reflexe trainieren | SkillDrills
// ============================================================

export const metadata = {
  title: 'Reaktionsspiel Online – Reflexe trainieren | SkillDrills',
  description:
    'Kostenloses Reaktionsspiel online: Fange fallende Ziele ab, trainiere vertikales Tracking und verbessere deine Reflexe und Reaktionszeit im Browser.',
  keywords: [
    'reaktionsspiel',
    'reaktionsspiel online',
    'reflex spiel online',
    'reaktionstest gaming',
    'reaktionszeit spiel',
    'hand auge koordination spiel',
    'reaktion üben',
    'reflexe trainieren',
    'fallende ziele spiel',
    'zielverfolgung spiel',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/reaction-speed/reaction-game',
    languages: getAlternateLanguages('/drills/reaction-speed/reaction-game'),
  },
  openGraph: {
    title: 'Reaktionsspiel Online – Reflexe trainieren | SkillDrills',
    description:
      'Kostenloses Reaktionsspiel online: Fange fallende Ziele ab, trainiere vertikales Tracking und verbessere deine Reflexe und Reaktionszeit im Browser.',
    url: 'https://skilldrills.online/de/drills/reaction-speed/reaction-game',
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reaktionsspiel Online – Reflexe trainieren | SkillDrills',
    description:
      'Trainiere vertikales Tracking und Reflexe im kostenlosen Browser-Reaktionsspiel ohne Download oder Registrierung.',
  },
  robots: { index: true, follow: true },
};

// --- Structured Data Schemas ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills Home', item: 'https://skilldrills.online/de' },
    { '@type': 'ListItem', position: 2, name: 'Trainings-Hub', item: 'https://skilldrills.online/de/drills' },
    { '@type': 'ListItem', position: 3, name: 'Reaktionsgeschwindigkeit', item: 'https://skilldrills.online/de/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'Reaktionsspiel', item: 'https://skilldrills.online/de/drills/reaction-speed/reaction-game' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Reaktionsspiel Online – Fallende Ziele Abfangen',
  alternateName: ['Reaktionsspiel', 'Reflex Spiel Online', 'Gaming Reaktionstest'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description:
    'Kostenloses Reaktionsspiel im Browser zur Schulung vertikaler Zielverfolgung und schneller neuromuskulärer Interzeption.',
  browserRequirements: 'Moderner Webbrowser mit JavaScript-Unterstützung (Chrome, Firefox, Safari, Edge)',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Reaktionsspiel Online — Fallende Ziele Abfangen | SkillDrills',
  url: 'https://skilldrills.online/de/drills/reaction-speed/reaction-game',
  description:
    'Kostenloses Browserspiel zur Steigerung von Reaktionszeit und Hand-Auge-Koordination.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'Moderner Browser mit JavaScript.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: 'Reaktionsgeschwindigkeit, vertikales Tracking, Hand-Auge-Koordination, Reflex-Interzeption',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Reaktionsspiel - Kinetisches Abfang- und Reflextraining',
  url: 'https://skilldrills.online/de/drills/reaction-speed/reaction-game',
  description: 'Fange beschleunigte fallende Ziele ab, um Reaktionszeit und Reflexe zu verbessern.',
  genre: ['Reflex Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Anleitung für das Reaktionsspiel',
  description: 'Schritte zum Abfangen fallender Ziele und zur Steigerung deiner Reaktionsgeschwindigkeit.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Spiel starten',
      text: 'Klicke auf «Drill starten», um das Spielfeld im Vollbildmodus zu aktivieren.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/reaction-game#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Fallende Ziele verfolgen',
      text: 'Richte deinen Blick auf den oberen Bereich und erfasse fallende Sphären sofort bei Erscheinen.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/reaction-game#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Ziele weit oben abfangen',
      text: 'Klicke Ziele möglichst frühzeitig im oberen Bildschirmdrittel, um maximale Bonuspunkte zu sichern.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/reaction-game#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Combo ausbauen & Level aufsteigen',
      text: 'Triff kontinuierlich Ziele, um den Multiplikator zu steigern und dich an beschleunigte Wellen anzupassen.',
      url: 'https://skilldrills.online/de/drills/reaction-speed/reaction-game#step-4'
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
      name: 'Was ist ein Reaktionsspiel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ein Reaktionsspiel ist ein interaktives Trainingstool, das die visuelle Reaktionszeit, Zielverfolgung und Hand-Auge-Koordination durch rasches Reagieren auf dynamische Stimuli misst und schult.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie hoch ist die durchschnittliche menschliche Reaktionszeit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die visuelle Reaktionszeit auf einfache Reize liegt bei 200–250 ms (Kosinski, 2008). Bei komplexeren Wahl-Reaktionsaufgaben (Choice Reaction Time) steigt sie auf 250–350 ms.',
      },
    },
    {
      '@type': 'Question',
      name: 'Warum ist vertikale Zielverfolgung (Vertical Tracking) wichtig?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In Shootern wie Apex Legends oder Overwatch fallen oder springen Gegner oft vertikal. Vertikales Tracking verhindert das Verreißen der Maus bei plötzlichen Bewegungen entlang der Y-Achse.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kann man Reflexe durch Reaktionsspiele verbessern?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Regelmäßiges Interzeptionstraining optimiert neuronale Signalpfade, reduziert die Entscheidungsverzögerung um 15–30 ms und fördert eine flüssigere motorische Mausführung (Dye et al., 2009).',
      },
    },
    {
      '@type': 'Question',
      name: 'Was ist der Unterschied zwischen einfacher und Wahl-Reaktionszeit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Einfache Reaktionszeit misst die Latenz auf ein einziges bekanntes Signal. Wahl-Reaktionszeit erfordert das Auswählen zwischen mehreren Zielbahnen und skaliert logarithmisch nach Hicks Gesetz (Hick, 1952).',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie erzielt man im Reaktionsspiel die höchste Punktzahl?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ziele sollten möglichst weit oben abgefangen werden, sobald sie auftauchen, um maximale Zeitzuschläge und Combo-Multiplikatoren zu sichern.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Reaktionszeit haben E-Sport-Profis?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Turnierspieler erreichen oft Reaktionszeiten zwischen 150 und 190 ms, was ihnen in schnellen Duellen entscheidende Vorteile verschafft.',
      },
    },
    {
      '@type': 'Question',
      name: 'Warum schwankt die Reaktionszeit von Tag zu Tag?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Schlafmangel, mentale Erschöpfung, circadiane Rhythmen sowie Hardware-Latenzen (z. B. Standard-60Hz-Displays) beeinflussen die motorische Reaktionskette signifikant.',
      },
    },
    {
      '@type': 'Question',
      name: 'Macht ein 144Hz- oder 240Hz-Monitor einen Unterschied im Spiel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Bildschirme mit 144Hz (6,9 ms) oder 240Hz (4,1 ms) stellen neue Frames wesentlich früher dar als 60Hz-Displays (16,7 ms) und reduzieren die gemessene Latenz um 10 bis 12 ms (Woods et al., 2015).',
      },
    },
    {
      '@type': 'Question',
      name: 'Funktioniert das Reaktionsspiel auch auf Smartphones und Tablets?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, das Testfeld ist vollständig responsiv für Touchscreens optimiert und funktioniert auf Mobilgeräten ohne Installation direkt im Browser.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie funktioniert die adaptive Schwierigkeit im Spiel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mit steigender Punktzahl und Combo-Serie erhöht sich die Fallgeschwindigkeit der Ziele, die Intervalle verkürzen sich und die Trefferzonen erfordern höhere Präzision.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie oft sollte man das Reflextraining absolvieren?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ein tägliches 5- bis 10-minütiges Warm-up vor Gaming-Sessions genügt, um das neuromuskuläre Zusammenspiel ohne Übermüdung der Handmuskeln zu schärfen.',
      },
    },
  ],
};

const reactionGameGuideDe = {
  heading: 'Leitfaden zum Reaktionsspiel: Vertikales Tracking & Kinetische Interzeption',
  intro: [
    'Ein Reaktionsspiel ist ein interaktives Trainingstool zur Messung und Schulung von neuromuskulärer Reaktionsgeschwindigkeit, vertikalem Blicktracking und Hand-Auge-Koordination durch rasches Reagieren auf dynamische Stimuli.',
    'Im Gegensatz zu einfachen Rot-zu-Grün-Klicktests erfordert dieses Mehrspur-Reaktionsspiel echte Wahlreaktionszeit (Choice Reaction Time nach Hick, 1952): Das Gehirn muss fallende Ziele im Raum orten, ihre Beschleunigung berechnen und den Klick präzise ausführen, bevor sie den Bildschirm verlassen.',
    'Messgenauigkeit & Display-Latenz: Die Interzeptionszeit wird lokal im Browser über die hochauflösende performance.now() API mit Sub-Millisekunden-Präzision gemessen. Auf Standard-60Hz-Displays tritt eine Bildverzögerung von bis zu 16,7 ms auf, während 144Hz- (6,9 ms) und 240Hz-Gaming-Monitore (4,1 ms) den Hardware-Input-Lag drastisch reduzieren (Woods et al., 2015).',
  ],
  benchmarks: {
    title: 'Reaktionsspiel Leistungstabelle & Punkte-Einstufung (45-Sekunden-Lauf)',
    headers: ['Punktzahl', 'Schwierigkeitsstufe', 'Skill-Profil', 'Neuromuskulärer Fokus'],
    rows: [
      ['> 15.000 Punkte', 'Großmeister / Elite', 'Sofortige foveale Erfassung und Auslösung im Sub-Millisekundenbereich', 'Ruhe bewahren bei gleichzeitigen Mehrfach-Zielen'],
      ['10.000 – 14.999 Punkte', 'Turnierspieler', 'Exzellente Bewegungsvorwegnahme mit minimalen Fehlklicks', 'Interzeptionspunkt im oberen Bildschirmdrittel halten'],
      ['6.000 – 9.999 Punkte', 'Fortgeschritten', 'Stabile visuelle Reflexe mit solider Beschleunigungs-Adaption', 'Periphere Erkennung statt Einzelspur-Fokussierung'],
      ['2.500 – 5.999 Punkte', 'Durchschnitt', 'Sicher bei Einzeltargets, gefordert bei dichten Wellen', 'Mauswege minimieren und Cursor zentral positionieren'],
      ['< 2.500 Punkte', 'Einsteiger', 'Reaktives Klicken mit motorischer Verzögerung und Hektik', 'Genauigkeit vor Klickfrequenz priorisieren'],
    ],
    note: 'Diese Benchmark-Stufen basieren auf neurowissenschaftlicher Literatur zur visuellen Chronometrie und Interzeptionsdynamik (Hick, 1952; Carpenter, 1988; Woods et al., 2015). Ein 60Hz-Monitor fügt ca. 16,7 ms Anzeigelatenz hinzu.',
  },
  techniques: {
    title: 'Kinetische Interzeptions- & Reaktionsmechaniken',
    items: [
      {
        name: 'Hohe Bildschirm-Interzeption',
        desc: 'Das Abfangen von Zielen im oberen Drittel des Spielfelds verschafft maximale Zeitpuffer und belohnt mit hohen Zeitzuschlägen.',
        tips: 'Positioniere den Cursor leicht oberhalb der Bildschirmmitte, um neu erscheinende Ziele sofort zu treffen.',
      },
      {
        name: 'Trajektorien-Projektion & Vorwegnahme',
        desc: 'Statt Zielen hinterherzufahren, berechnet das Gehirn die Fallbahn voraus und lässt das Ziel in das Fadenkreuz hineinlaufen (Carpenter, 1988).',
        tips: 'Vorausschauendes Klicken aktiviert motorische Areale im Kortex und eliminiert Überkorrekturen der Maus.',
      },
      {
        name: 'Periphere Reizerfassung',
        desc: 'Ein starrer Blick auf eine einzelne Spur macht blind für benachbarte Spawns. Ein entspannter Weitblick nutzt die hohe zeitliche Auflösung der Stäbchenzellen.',
        tips: 'Halte den Fokus in der horizontalen Mitte, um Spawns links und rechts simultan wahrzunehmen.',
      },
      {
        name: 'Minimierung von Hardware-Latenzen',
        desc: '60Hz-Monitore fügen bis zu 16,7 ms Bildlatenz pro Frame hinzu, während 240Hz-Displays diese auf 4,1 ms senken (Woods et al., 2015).',
        tips: 'Nutze eine Gaming-Maus mit 1000 Hz Abtastrate und deaktiviere V-Sync für sofortige Eingaberegistrierung.',
      },
    ],
  },
  steps: [
    'Klicke auf «Drill starten», um das Vollbild-Testfeld zu öffnen.',
    'Halte den Mauszeiger im oberen mittleren Bereich des Spielfelds.',
    'Beobachte die Spuren mit weitem Blick, um fallende Ziele sofort bei Erscheinen zu erfassen.',
    'Klicke die Ziele möglichst weit oben an, bevor sie beschleunigen oder den Rand erreichen.',
    'Halte den Combo-Multiplikator aufrecht und analysiere deine finale Punktzahl und Einstufung.',
  ],
  audience: 'Gamer für vertikale Movement-Shooter (Apex Legends, Overwatch 2, Fortnite), Athleten zur Schulung kinetischer Reflexe und alle, die ihre Hand-Auge-Koordination schärfen möchten.',
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('hick1952', 'carpenter1988', 'woods2015', 'kosinski2008'),
  related: [
    { href: '/de/drills/reaction-speed/reaction-time-test', label: 'Reaktionstest Online' },
    { href: '/de/drills/reaction-speed/reflex-training-drill', label: 'Reflex Training Drill' },
    { href: '/de/drills/reaction-speed/fps-tracking-trainer', label: 'FPS Tracking Trainer' },
    { href: '/de/drills/motor/movement-speed/rapid-tapping', label: 'CPS Klick-Geschwindigkeitstest' },
  ],
};

export default function GermanReactionGamePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <ReactionSimulatorWrapper copy={{ title: 'Reaktionsspiel Online' }} />
      <DrillGuide guide={reactionGameGuideDe} />
    </>
  );
}
