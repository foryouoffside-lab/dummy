import AimTrainerClient from '@/app/drills/motor/hand-eye-coordination/aim-trainer/AimTrainerClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — de-DE (motor / hand-eye-coordination / aim-trainer)
// PRIMARY DOMESTIC: "aim trainer" — 917 exact / 1,376 broad Bing searches/mo (Domestic #1 winner in Germany)
//                   "aim test" — 77 exact / 81 broad searches/mo
//                   "aim trainer online" — 23 exact / 30 broad searches/mo
// SECONDARY / LSI:
//                   "valorant aim trainer" — 64 exact searches/mo
//                   "maus präzision testen" — Gaming mouse accuracy query
//                   "reaktionstest" — General speed query
// WINNER TITLE:     Aim Trainer Online – Kostenloser FPS Aim Test & Maus-Präzisionstraining | SkillDrills
// ============================================================

export const metadata = {
  title: "Aim Trainer Online – FPS Maus-Präzision | SkillDrills",
  description: "Kostenloser Aim Trainer online im Browser: Trainiere Mauspräzision, Micro-Flicks und Reaktionsgeschwindigkeit nach Fitts Gesetz ohne Installation.",
  keywords: ['aim trainer online', 'fps aim trainer kostenlos', 'maus praezisionstraining', 'aim test online', 'micro flick training', 'fitts gesetz aim', 'aim trainer browser', 'zielerfassung test', 'reaktionszeit maus test', 'aimbot training legal', 'valorant aim warm up', 'cs2 aim trainer online'],
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/motor/hand-eye-coordination/aim-trainer',
    languages: getAlternateLanguages('/drills/motor/hand-eye-coordination/aim-trainer'),
  },
  openGraph: {
    title: 'Aim Trainer Online – Kostenloser FPS Aim Test & Maus-Präzisionstraining | SkillDrills',
    description:
      'Kostenloser FPS Aim Trainer im Browser. Verbessere deine Maus-Präzision und Klick-Timing mit dynamischer Schwierigkeitsskalierung.',
    url: 'https://skilldrills.online/de/drills/motor/hand-eye-coordination/aim-trainer',
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aim Trainer Online – Kostenloser FPS Aim Test & Maus-Präzisionstraining | SkillDrills',
    description:
      'Kostenloses Maus-Präzisionstraining im Browser. Trainiere Micro-Flicks und Treffsicherheit für Taktik-Shooter.',
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
    { '@type': 'ListItem', position: 3, name: 'Motorik & Maussteuerung', item: 'https://skilldrills.online/de/drills/motor' },
    { '@type': 'ListItem', position: 4, name: 'Hand-Auge-Koordination', item: 'https://skilldrills.online/de/drills/motor' },
    { '@type': 'ListItem', position: 5, name: 'Aim Trainer Online', item: 'https://skilldrills.online/de/drills/motor/hand-eye-coordination/aim-trainer' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Aim Trainer Online – Kostenloser FPS Aim Test',
  alternateName: ['Aim Trainer', 'FPS Aim Trainer', 'Maus Präzisionstest', 'Aim Trainer Online'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description:
    'Kostenloses Online-Training zur Steigerung von Maus-Präzision, Micro-Flicks und Hand-Auge-Koordination im Browser.',
  browserRequirements: 'Moderner Webbrowser mit JavaScript- und Pointer-Lock-Unterstützung (Chrome, Firefox, Edge, Safari)',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Aim Trainer Online — Kostenloses FPS Präzisionstraining | SkillDrills',
  url: 'https://skilldrills.online/de/drills/motor/hand-eye-coordination/aim-trainer',
  description:
    'Trainiere Zielgenauigkeit und Reaktionszeit mit dynamisch schrumpfenden Zielen im Browser.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'Moderner Browser mit JavaScript und Pointer Lock API.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: 'Zielgenauigkeit, Micro-Flicks, Maus-Präzision, Hand-Auge-Koordination, Klick-Timing',
};


const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Aim Trainer Online",
  "url": "https://skilldrills.online/de/drills/motor/hand-eye-coordination/aim-trainer",
  "description": "Free online browser-based 2D aim trainer for FPS gamers. Practice target acquisition, mouse accuracy, and click timing.",
  "dateModified": "2026-09-11",
  "gamePlatform": "Web Browser",
  "genre": ["Aim Trainer", "FPS Training", "Hand-Eye Coordination", "Reaction Speed"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Anleitung zum Aim Training im Browser',
  description: 'Schritt-für-Schritt-Anleitung zur Steigerung deiner Zielgenauigkeit mit dem SkillDrills Aim Trainer.',
  step: [
    {
      '@type': 'HowToStep',
      "position": 1,
      "url": "https://skilldrills.online/de/drills/motor/hand-eye-coordination/aim-trainer#step-1",
      
      name: 'Training starten',
      text: 'Klicke auf „Training starten“, um den Vollbildmodus und die Mauszeigerfixierung zu aktivieren.',
    },
    {
      '@type': 'HowToStep',
      "position": 2,
      "url": "https://skilldrills.online/de/drills/motor/hand-eye-coordination/aim-trainer#step-2",
      
      name: 'Ziel erfassen',
      text: 'Richte deinen Blick unmittelbar auf das neu erscheinende, sich bewegende Ziel aus.',
    },
    {
      '@type': 'HowToStep',
      "position": 3,
      "url": "https://skilldrills.online/de/drills/motor/hand-eye-coordination/aim-trainer#step-3",
      
      name: 'Ballistischer Flick & Präzisionsklick',
      text: 'Bewege die Maus zügig in Richtung Ziel und klicke präzise auf den Mittelpunkt, bevor die Zeit abläuft.',
    },
    {
      '@type': 'HowToStep',
      "position": 4,
      "url": "https://skilldrills.online/de/drills/motor/hand-eye-coordination/aim-trainer#step-4",
      
      name: 'Combo ausbauen & Level aufsteigen',
      text: 'Vermeide Fehlschüsse, um den Multiplikator auf 3.0x zu maximieren und höhere Schwierigkeitsstufen zu meistern.',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-11',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Was ist ein Aim Trainer und wie funktioniert er?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ein Aim Trainer ist ein interaktives Trainingstool, das misst, wie schnell und präzise du Ziele mit der Maus anvisieren und anklicken kannst. Durch schrumpfende und beschleunigende Ziele wird die sensorimotorische Präzision geschult.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie erklärt das Fitts\'sche Gesetz das Aim Training?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Das Gesetz besagt, dass die benötigte Bewegungszeit logarithmisch vom Verhältnis zwischen Zieldistanz und Zielgröße abhängt. Kleinere Ziele erhöhen den Schwierigkeitsindex (ID) und fordern maximale Bewegungskontrolle.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was ist das Zwei-Komponenten-Modell zielgerichteter Bewegungen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Jede schnelle Zielbewegung besteht aus einem ballistischen Anfangsimpuls (ca. 80–90% der Strecke) und einer feinfühligen Brems- und Korrekturphase kurz vor dem Auslösen des Klicks.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hilft dieser Aim Trainer bei Spielen wie Valorant und CS2?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, absolut. Taktik-Shooter erfordern präzise Micro-Flicks von 5 bis 15 Grad auf gegnerische Trefferzonen. Genau dieses Zusammenspiel aus schnellem Flick und stabilem Klick wird hier isoliert trainiert.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Punktzahl gilt im Aim Trainer als gut?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Einsteiger erreichen meist unter 8.000 Punkte. Fortgeschrittene Spieler erzielen 18.000 bis 31.999 Punkte (Level 6–8), während E-Sportler und Profis über 48.000 Punkte bei über 95% Genauigkeit erreichen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie steigt der Schwierigkeitsgrad im Verlauf des Drills?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Alle 1.750 Punkte steigt das Level. Zielradien schrumpfen von 26px auf 8px, Geschwindigkeiten steigen von 80px/s auf 370px/s und die Ziel-Lebensdauer sinkt von 2,8s auf 0,40s.',
      },
    },
    {
      '@type': 'Question',
      name: 'Warum werden Fehlschüsse bestraft?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fehlschüsse setzen die Combo-Serie auf 1.0x zurück. Dies fördert diszipliniertes Zielen und verhindert unkontrolliertes Dauerfeuer auf gut Glück.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kann ich meine gewohnte Mausempfindlichkeit nutzen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, dank Pointer Lock API und universellem Sensitivitäts-Slider trainierst du exakt mit der gleichen Zentimeter-pro-360-Grad-Drehung wie in deinen Lieblingsspielen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Rolle spielen Monitor-Bildwiederholrate und Abtastrate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Monitore mit 144Hz oder 240Hz und Mäuse mit 1000Hz Abtastrate verringern die visuelle Latenz um 10 bis 12 ms, wodurch Zielkorrekturen in der Endphase spürbar sauberer gelingen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was ist das beste tägliche Warm-up-Programm?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '10 bis 15 Minuten tägliches Warm-up vor Ranglistenspielen mit Fokus auf mindestens 90% Trefferquote aktiviert die Feinmotorik und stabilisiert die Treffsicherheit unter Druck.',
      },
    },
  ],
};

export default function AimTrainerGermanPage() {
  const sources = pickSources('fitts1954', 'mackenzie1992', 'elliott2010', 'woodworth1899', 'woods2015');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <AimTrainerClient
        copy={{
          title: 'Aim Trainer Online',
          subtitle: 'Dynamische Zielerfassung & Präzises Klick-Timing • Endlose Level-Progression',
          caption: 'Erfasse und klicke sich bewegende Ziele so schnell und präzise wie möglich, bevor sie verschwinden. Basiert auf Fitts Gesetz.',
        }}
      />

      <DrillGuide
        eyebrow="Motorikforschung, Psychophysik & Human-Computer Interaction (HCI)"
        title="Die Wissenschaft des Aim Trainings: Fitts's Law und motorische Zielerfassung"
        sources={sources}
      >
        <p>
          Die Zielerfassung mit der Computermaus gehört zu den anspruchsvollsten feinmotorischen Aufgaben in der Psychophysik und HCI-Forschung. Ob beim Clearing von Winkeln in kompetitiven Ego-Shootern oder bei computergestützten Präzisionsaufgaben: Das menschliche neuromuskuläre System muss zweidimensionale visuelle Reize in Sekundenbruchteilen in mikrometergenaue Muskelkontraktionen von Hand, Handgelenk und Unterarm umsetzen (Fitts, 1954; MacKenzie, 1992).
        </p>

        <h3>Das Fitts&apos;sche Gesetz &amp; der Index of Difficulty (ID)</h3>
        <p>
          Paul M. Fitts bewies 1954, dass die Zeit (\(MT\)), die für eine Zielbewegung benötigt wird, eine mathematische Funktion aus Distanz (\(D\)) und Zielbreite (\(W\)) ist:
        </p>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 my-3 text-center font-mono text-sm text-cyan-300">
          MT = a + b · log₂(2D / W) = a + b · ID
        </div>
        <p>
          Der logarithmische Term ist der <strong>Index of Difficulty (ID)</strong>. Im SkillDrills <em>Aim Trainer</em> schrumpft der Zielradius von 26 auf 8 Pixel, während sich die Distanzen dynamisch vergrößern. Dadurch skaliert der Schwierigkeitsgrad kontinuierlich und fordert das sensomotorische Kontrollsystem bis an seine physiologischen Grenzen (Fitts, 1954; MacKenzie, 1992).
        </p>

        <h3>Das Zwei-Komponenten-Modell zielgerichteter Bewegungen (Woodworth 1899; Elliott et al. 2010)</h3>
        <p>
          Mausbewegungen sind keine einfachen geraden Impulse. Nach Woodworth (1899) und modernen Synthesen von Elliott et al. (2010) gliedert sich die Bewegung in zwei Phasen:
        </p>
        <ol className="list-decimal pl-5 space-y-2 my-3 text-slate-300">
          <li>
            <strong>Initialer ballistischer Impuls (Open-Loop):</strong> Ein vorprogrammierter neuromuskulärer Schub legt 80–90% der Strecke in 120–180 Millisekunden zurück – zu schnell für visuelle Korrekturen.
          </li>
          <li>
            <strong>Terminale Abbremsung &amp; Feinkorrektur (Closed-Loop):</strong> Sobald sich das Fadenkreuz dem Zielrand nähert, verarbeitet das Gehirn Retinalfehler und führt millimetergenaue Nachkorrekturen vor dem Klick aus.
          </li>
        </ol>
        <p>
          Unerfahrene Spieler neigen zu <em>Over-Flicks</em> (Überschießen mit zeitintensiven Rückbewegungen) oder <em>Under-Flicks</em> (zaghaftes Heranschleichen). Spitzenspieler optimieren ihren Anfangsimpuls so exakt, dass der Cursor direkt am Ziel stoppt (Elliott et al., 2010; Woods et al., 2015).
        </p>

        <h3>Hardware-Latenz &amp; Bildwiederholraten</h3>
        <p>
          Echtes Aiming erfordert minimale Signalverzögerungen. Wie Woods et al. (2015) feststellten, beanspruchen physiologische Signalwege im Körper rund 130–190 ms. An einem 60Hz-Monitor entstehen alle 16,7 ms neue Bilder; bei 144Hz oder 240Hz sinkt dies auf 6,9 bzw. 4,1 ms, was schnellere visuelle Rückmeldungen in der entscheidenden Bremsphase ermöglicht.
        </p>

        <h3>Leistungs-Benchmarks im Aim Trainer (45-Sekunden-Test)</h3>
        <p>
          Die folgende Übersicht dient der Einordnung deiner Ergebnisse im Aim Trainer:
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-left border-collapse border border-white/10 text-xs sm:text-sm">
            <thead>
              <tr className="bg-white/5 text-slate-200">
                <th className="p-2.5 border border-white/10 font-bold">Stufe</th>
                <th className="p-2.5 border border-white/10 font-bold">Punkte</th>
                <th className="p-2.5 border border-white/10 font-bold">Level</th>
                <th className="p-2.5 border border-white/10 font-bold">Trefferquote</th>
                <th className="p-2.5 border border-white/10 font-bold">Klassifizierung</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-emerald-400">Tier 1</td>
                <td className="p-2.5 border border-white/10">&gt; 48.000 PTS</td>
                <td className="p-2.5 border border-white/10">Level 12+</td>
                <td className="p-2.5 border border-white/10">&gt; 95% (Combo 25+)</td>
                <td className="p-2.5 border border-white/10">Profi-Niveau / Elite-Marksman</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-cyan-400">Tier 2</td>
                <td className="p-2.5 border border-white/10">32.000 – 47.999 PTS</td>
                <td className="p-2.5 border border-white/10">Level 9–11</td>
                <td className="p-2.5 border border-white/10">88% – 94% (Combo 18–24)</td>
                <td className="p-2.5 border border-white/10">Turnierspieler / High-Rank FPS</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-blue-400">Tier 3</td>
                <td className="p-2.5 border border-white/10">18.000 – 31.999 PTS</td>
                <td className="p-2.5 border border-white/10">Level 6–8</td>
                <td className="p-2.5 border border-white/10">78% – 87% (Combo 12–17)</td>
                <td className="p-2.5 border border-white/10">Solider Durchschnitt / Fortgeschritten</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-amber-400">Tier 4</td>
                <td className="p-2.5 border border-white/10">8.000 – 17.999 PTS</td>
                <td className="p-2.5 border border-white/10">Level 3–5</td>
                <td className="p-2.5 border border-white/10">65% – 77% (Combo 6–11)</td>
                <td className="p-2.5 border border-white/10">Gelegenheitsspieler / Ausbaufähig</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-rose-400">Tier 5</td>
                <td className="p-2.5 border border-white/10">&lt; 8.000 PTS</td>
                <td className="p-2.5 border border-white/10">Level 1–2</td>
                <td className="p-2.5 border border-white/10">&lt; 65% (Combo &lt; 6)</td>
                <td className="p-2.5 border border-white/10">Hohe Ungenauigkeit / Hektisches Klicken</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>4 wissenschaftlich fundierte Trainingsregeln</h3>
        <ul className="list-disc pl-5 space-y-2 my-3 text-slate-300">
          <li>
            <strong>Mut zum zügigen Anfangsimpuls (Woodworth, 1899):</strong> Starte jeden Flick entschlossen und überbrücke den Großteil der Distanz in einem Zug ohne Zögern.
          </li>
          <li>
            <strong>Präzise Endabbremsung (Fitts, 1954):</strong> Reduziere vor dem Klick sanft die Geschwindigkeit, um das Fadenkreuz im Zielzentrum zu fixieren.
          </li>
          <li>
            <strong>Konstante Mausempfindlichkeit (MacKenzie, 1992):</strong> Behalte deine cm/360-Einstellung über alle Spiele und Trainingsmodule hinweg bei.
          </li>
          <li>
            <strong>Entspannte Griffhaltung (Woods et al., 2015):</strong> Halte die Hand locker auf der Maus, um Verkrampfungen beim schnellen Klicken zu vermeiden.
          </li>
        </ul>

        <h3>Häufig gestellte Fragen (FAQ)</h3>
        <div className="space-y-4 my-4">
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">Was ist ein Aim Trainer und wie funktioniert er?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Ein Aim Trainer ist ein interaktives Trainingstool, das misst, wie schnell und präzise du Ziele mit der Maus anvisieren und anklicken kannst. Durch schrumpfende und beschleunigende Ziele wird die sensorimotorische Präzision geschult.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">Wie erklärt das Fitts&apos;sche Gesetz das Aim Training?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Das Gesetz besagt, dass die benötigte Bewegungszeit logarithmisch vom Verhältnis zwischen Zieldistanz und Zielgröße abhängt. Kleinere Ziele erhöhen den Schwierigkeitsindex (ID) und fordern maximale Bewegungskontrolle.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">Was ist das Zwei-Komponenten-Modell zielgerichteter Bewegungen?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Jede schnelle Zielbewegung besteht aus einem ballistischen Anfangsimpuls (ca. 80–90% der Strecke) und einer feinfühligen Brems- und Korrekturphase kurz vor dem Auslösen des Klicks.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">Hilft dieser Aim Trainer bei Spielen wie Valorant und CS2?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Ja, absolut. Taktik-Shooter erfordern präzise Micro-Flicks von 5 bis 15 Grad auf gegnerische Trefferzonen. Genau dieses Zusammenspiel aus schnellem Flick und stabilem Klick wird hier isoliert trainiert.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">Welche Punktzahl gilt im Aim Trainer als gut?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Einsteiger erreichen meist unter 8.000 Punkte. Fortgeschrittene Spieler erzielen 18.000 bis 31.999 Punkte (Level 6–8), während E-Sportler und Profis über 48.000 Punkte bei über 95% Genauigkeit erreichen.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">Wie steigt der Schwierigkeitsgrad im Verlauf des Drills?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Alle 1.750 Punkte steigt das Level. Zielradien schrumpfen von 26px auf 8px, Geschwindigkeiten steigen von 80px/s auf 370px/s und die Ziel-Lebensdauer sinkt von 2,8s auf 0,40s.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">Warum werden Fehlschüsse bestraft?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Fehlschüsse setzen die Combo-Serie auf 1.0x zurück. Dies fördert diszipliniertes Zielen und verhindert unkontrolliertes Dauerfeuer auf gut Glück.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">Kann ich meine gewohnte Mausempfindlichkeit nutzen?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Ja, dank Pointer Lock API und universellem Sensitivitäts-Slider trainierst du exakt mit der gleichen Zentimeter-pro-360-Grad-Drehung wie in deinen Lieblingsspielen.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">Welche Rolle spielen Monitor-Bildwiederholrate und Abtastrate?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Monitore mit 144Hz oder 240Hz und Mäuse mit 1000Hz Abtastrate verringern die visuelle Latenz um 10 bis 12 ms, wodurch Zielkorrekturen in der Endphase spürbar sauberer gelingen.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">Was ist das beste tägliche Warm-up-Programm?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              10 bis 15 Minuten tägliches Warm-up vor Ranglistenspielen mit Fokus auf mindestens 90% Trefferquote aktiviert die Feinmotorik und stabilisiert die Treffsicherheit unter Druck.
            </p>
          </div>
        </div>
      </DrillGuide>
    </>
  );
}
