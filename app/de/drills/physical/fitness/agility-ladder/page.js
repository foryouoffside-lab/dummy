import MotorSequencingClient from '@/app/drills/physical/fitness/agility-ladder/MotorSequencingClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Germany (DE)
// Primary Intent: Koordinationsleiter Übungen, Koordinationsleiter Fußball, Beinarbeit Trainieren, Schnelligkeitstraining
// German Context: Beinarbeit & Rhythmus im Fußball/Handball/Tennis & eSports Counter-Strafing
// High-Demand, Low-Competition Target Keywords:
//   - "Koordinationsleiter Übungen" (High-intent athletic agility ladder exercises)
//   - "Koordinationsleiter Fußball" (Sport-specific agility search)
//   - "Beinarbeit Trainieren" (Footwork agility training)
//   - "Schnelligkeitstraining Übungen" (Speed & quickness conditioning)
//   - "Agility Leiter Training" (Ladder coordination training)
//   - "Motorische Sequenzierung" (Motor sequencing & neural programming)
//   - "Hand-Auge-Rhythmus" (Sensomotoric rhythm query)
//   - "Koordinationsleiter Sportabzeichen" (Fitness evaluation test)
//   - "Counter Strafing Rhythmus" (Gaming strafe movement rhythm)
//   - "Schnelligkeit Beinarbeit" (Quickness footwork coordination)
// ============================================================

export const metadata = {
  title: "Koordinationsleiter Übungen – Beinarbeit | SkillDrills",
  description: 'Kostenlose Koordinationsleiter-Übungen online. Trainiere Beinarbeit, Schrittfolgen und neuromuskuläre Schnelligkeit für Fußball und Sport im Browser.',
  keywords: [
    "Koordinationsleiter Übungen",
    "Koordinationsleiter Fußball",
    "Beinarbeit Trainieren",
    "Schnelligkeitstraining Übungen",
    "Agility Leiter Training",
    "Motorische Sequenzierung",
    "Hand-Auge-Rhythmus",
    "Koordinationsleiter Sportabzeichen",
    "Counter Strafing Rhythmus",
    "Schnelligkeit Beinarbeit"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/physical/fitness/agility-ladder',
    languages: getAlternateLanguages('/drills/physical/fitness/agility-ladder'),
  },
  openGraph: {
    title: "Koordinationsleiter Übungen & Beinarbeit Trainieren – Agility-Leiter-Spiel | SkillDrills",
    description: "Kostenloses Online-Training für Koordinationsleiter-Übungen & Beinarbeit. Meistern Sie alternierende Sprossenwechsel und motorische Rhythmusprogramme am Bildschirm.",
    url: 'https://skilldrills.online/de/drills/physical/fitness/agility-ladder',
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Koordinationsleiter Übungen & Beinarbeit Trainieren – Agility-Leiter-Spiel | SkillDrills",
    description: "Kostenloses Online-Training für Koordinationsleiter-Übungen & Beinarbeit. Meistern Sie alternierende Sprossenwechsel und motorische Rhythmusprogramme am Bildschirm.",
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "SkillDrills Startseite",
      "item": "https://skilldrills.online/de"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Körperliches Training",
      "item": "https://skilldrills.online/de/drills/physical"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Fitness & Schnelligkeit",
      "item": "https://skilldrills.online/de/drills/physical/fitness"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Koordinationsleiter-Übungen & Beinarbeit",
      "item": "https://skilldrills.online/de/drills/physical/fitness/agility-ladder"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Koordinationsleiter-Training & Motorische Sequenzierung",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Kostenloses browserbasiertes Trainingswerkzeug zur Schulung von Beinarbeits-Rhythmus, motorischer Sequenzierung und Schnelligkeit an herabscrollenden Leitersprossen.",
  "url": "https://skilldrills.online/de/drills/physical/fitness/agility-ladder",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online/de"
  },
  "inLanguage": "de",
  "dateModified": "2026-09-12"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Koordinationsleiter-Übungen Web-App",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas und Zeigererfassung (Pointer Lock) fähiger moderner Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/de/drills/physical/fitness/agility-ladder",
  "inLanguage": "de",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Agility-Leiter Rhythmus-Spiel (Agility Ladder)",
  "url": "https://skilldrills.online/de/drills/physical/fitness/agility-ladder",
  "description": "Kostenloses Action- und Fitness-Geschicklichkeitsspiel zum Durchqueren alternierender Sprossenleitern.",
  "genre": [
    "Fitness Game",
    "Coordination",
    "Rhythm Game",
    "Agility"
  ],
  "gamePlatform": [
    "Web Browser",
    "Desktop",
    "Mobile"
  ],
  "applicationCategory": "Game",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-12",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Wie überträgt sich das digitale Sprossentraining auf die echte Beinarbeit und Schnelligkeit im Sport (z. B. Fußball, Handball, Tennis)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die zentralnervöse Bewegungssteuerung in Basalganglien, prämotorischem Kortex und Kleinhirn nutzt für rhythmische Muskelaktivierungen bei Händen und Füßen identische neuronale Taktgeber. Das präzise Abfangen alternierender Leitersprossen im festen Metronom-Rhythmus schärft die zeitliche Taktung (Temporal Cadence) und verbessert Richtungswechsel sowie schnelle Beinarbeit auf dem Spielfeld."
      }
    },
    {
      "@type": "Question",
      "name": "Was besagt Karl Lashleys (1951) Theorie der seriellen Bewegungsordnung und des motorischen Chunkings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Karl Lashley wies nach, dass blitzschnelle motorische Sequenzen unmöglich Schritt für Schritt über sensorisches Feedback gesteuert werden können, da neuronale Rückkopplungsschleifen 100 bis 150 ms beanspruchen. Stattdessen fasst das motorische Zentrum die 4 Sprossen (Links-Rechts-Links-Rechts) vorab zu einem geschlossenen Bewegungspaket (Motor Chunk) zusammen und führt diesen Schwung als eine einzige fließende Einheit aus."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Rolle spielt die 'relative Timing-Invarianz' nach Richard A. Schmidts (1975) Generalized Motor Program (GMP)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nach Schmidts Konzept des verallgemeinerten motorischen Programms (GMP) behält ein Sportler bei steigender Geschwindigkeit das relative Zeitverhältnis der Teilbewegungen (1:1:1:1) exakt bei. Beschleunigt die Leiter von 150 px/s auf 750 px/s, ändert das Gehirn nicht die relative Struktur der Bewegung, sondern erhöht lediglich den skalierenden Kraft- und Ausführungsparameter."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Vorteile bietet das Agility-Leiter-Training für das Counter-Strafing und Movement in Ego-Shootern (CS2, Valorant)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Erfolgreiches Counter-Strafing verlangt exakt getaktete A/D-Tastaturwechsel kombiniert mit stabiler Fadenkreuzführung. Die alternierenden horizontalen Cursorschwünge in diesem Drill schulen die rhythmische Muskelinhibition und verhindern Verkrampfungen im Handgelenk bei rasanten Richtungswechseln an Türrahmen und Ecken."
      }
    },
    {
      "@type": "Question",
      "name": "Wie verändern sich Scrollgeschwindigkeit und Sprossentrefferzonen mit steigendem Level?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Alle 250 Punkte klettert der Schwierigkeitsgrad um ein Level (bis Level 15). Die Abwärtsgeschwindigkeit steigt von anfänglichen 150 px/s bis auf 750 px/s an, während die Trefferbreite der Sprossen von 18 px auf 10 px abnimmt. Ab Level 4 treten zudem leichte Zufallsversätze auf, die starres Durchklicken verhindern."
      }
    },
    {
      "@type": "Question",
      "name": "Gibt es Punktabzug oder Zeitverlust, wenn eine Sprosse verfehlt wird oder eine Leiter durchrutscht?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nein. Ein Fehler oder das Verfehlen einer Sprosse setzt lediglich den Combo-Multiplikator auf 1,0x zurück und erzeugt einen roten optischen Warnblitz. Die erreichte Gesamtpunktzahl und die 45-Sekunden-Uhr bleiben unberührt, um mutige Höchstgeschwindigkeitsversuche zu fördern."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Mauseinstellungen (DPI) und Grifftechniken sind für schnelle horizontale Sprossenwechsel optimal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der Fingertip- oder Claw-Grip bietet klare Vorteile: Schnelle 80-px-Schwünge können präzise aus den Fingergrundgelenken und dem Handgelenk ausgeführt werden, ohne den gesamten Unterarm ermüdend zu versetzen. Eine mittlere Mausempfindlichkeit ohne Windows-Zeigerbeschleunigung gewährleistet eine lineare 1:1-Wegstrecke."
      }
    },
    {
      "@type": "Question",
      "name": "Wie sollte der Blick fokussiert werden, um bei Maximalgeschwindigkeit (750 px/s) nicht den Faden zu verlieren?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Das starre visuelle Verfolgen jeder einzelnen Sprosse scheitert an der Verzögerung sakkadischer Augenbewegungen (30–50 ms). Der Blick sollte stattdessen entspannt auf der zentralen vertikalen Mittelachse verankert bleiben, sodass das periphere Sehen beide Leitersprossen simultan erfasst."
      }
    },
    {
      "@type": "Question",
      "name": "Welchen Einfluss haben Monitor-Bildwiederholraten (60 Hz vs. 144 Hz/240 Hz) auf das Treffen bewegter Sprossen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bei 750 px/s springt ein Objekt auf einem 60-Hz-Monitor um 12,5 Pixel pro Bild frame, was das exakte Treffen einer 10 px schmalen Sprosse erschwert. Gaming-Displays mit 144 Hz (5,2 px) oder 240 Hz (3,1 px) bieten eine flüssige, kontinuierliche Bewegungskurve und erleichtern das präzise Abfangen nach Fitts' Gesetz erheblich."
      }
    },
    {
      "@type": "Question",
      "name": "Werden während der Trainingseinheit persönliche Bewegungs- oder Leistungsdaten an Server übertragen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nein. Alle Berechnungen, Zeitstempel via performance.now() und Combo-Metriken laufen zu 100 % lokal im Browser auf Ihrem Rechner. Ihre Highscores verbleiben verschlüsselt im browserinternen localStorage. Es findet keinerlei Tracking oder Datenweitergabe statt."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Koordinationsleiter-Training: 4-Stufen-Protokoll für Schnelligkeit und Rhythmus",
  "description": "Systematische Anleitung zum fehlerfreien Durchqueren herabscrollender Sprossenleitern und zur Schulung motorischer Sequenzierung.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Blick zentrieren und Zeiger sperren",
      "text": "Aktivieren Sie die Zeigererfassung per Startklick, richten Sie den Blick auf die vertikale Mittelachse und erwarten Sie die erste Leiter.",
      "url": "https://skilldrills.online/de/drills/physical/fitness/agility-ladder#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Oberste Sprosse abfangen und Richtungswechsel einleiten",
      "text": "Steuern Sie die oberste linke Sprosse 1 mit einem scharfen Flick an und leiten Sie sofort den Gegenimpuls zur rechten Sprosse 2 ein.",
      "url": "https://skilldrills.online/de/drills/physical/fitness/agility-ladder#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "4-Sprossen-Sequenz als Einheit vollenden",
      "text": "Durchqueren Sie Sprosse 3 (links) und Sprosse 4 (rechts) in einem einzigen, ununterbrochenen Rhythmus-Chunk, um das grüne Häkchen zu setzen.",
      "url": "https://skilldrills.online/de/drills/physical/fitness/agility-ladder#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "3,0x-Combo aufrechterhalten und Höchsttempo meistern",
      "text": "Halten Sie die Kette ohne Fehltritt aufrecht, maximieren Sie den Combo-Faktor auf 3,0x und überstehen Sie die 750-px/s-Zone über 45 Sekunden.",
      "url": "https://skilldrills.online/de/drills/physical/fitness/agility-ladder#step-4"
    }
  ]
};

const ladderGuide = {
  heading: "Wissenschaftlicher Leitfaden: Koordinationsleiter & Motorische Sequenzierung",
  subtitle: "Lashley-Bewegungsordnung, Schmidt-GMP und Fitts-Interzeption im schnelligkeitsorientierten Rhythmustraining",
  intro: [
    "Das Training an der Koordinationsleiter (Agility Ladder Drill) bildet im Spitzenfußball, Handball, Kampfsport und in der Leichtathletik das Fundament für blitzschnelle Beinarbeit, Gewandtheit und neuromuskuläre Richtungswechsel. Diese digitale Trainingsanwendung überträgt die Bodenleiter auf eine dynamische vertikale Achse und trainiert die beidseitige motorische Sequenzierung (Bilateral Motor Sequencing) – das taktreine, wechselseitige Abfangen herabscrollender Leitersprossen.",
    "Nach Karl Lashleys bahnbrechender Arbeit zur 'seriellen Ordnung im Verhalten' (1951) können Hochgeschwindigkeitssequenzen nicht durch schrittweises Feedback reguliert werden, da die sensorische Reizleitung zu träge ist. Der prämotorische Kortex muss die 4-teilige Sprossenfolge (Links-Rechts-Links-Rechts) vor Bewegungsbeginn als integriertes motorisches Paket ('Motor Chunk') vorbereiten und als kontinuierliche Impulswelle abrufen.",
    "Richard A. Schmidts (1975) Theorie des verallgemeinerten motorischen Programms (GMP) beweist, dass koordinierte Athleten bei Geschwindigkeitssteigerungen die relative Phasenzeit (1:1:1:1) stabil beibehalten. Wenn sich die Scrollgeschwindigkeit von 150 px/s auf 750 px/s verfünffacht, bewahrt der geübte Sportler die metronomische Rhythmusstruktur und erhöht lediglich den neuromuskulären Grundantrieb.",
    "Präzisions- und Hardwarehinweis: Die Zeiterfassung erfolgt lokal im Browser über die hochauflösende performance.now()-Schnittstelle. Bildwiederholfrequenzen (60 Hz = 16,7 ms Framezeit vs. 240 Hz = 4,1 ms) und USB-Abtastraten (125 Hz vs. 1.000 Hz) bedingen physikalische Toleranzen. Differenzen unter 5 ms gelten als reguläres Messrauschen. Sämtliche Messwerte verbleiben privat in Ihrem Browser."
  ],
  benchmarks: {
    title: "Wissenschaftliche 5-Stufen-Normtabelle für die Koordinationsleiter",
    headers: ["Leistungsstufe & Perzentil", "Rangtitel (Rank Title)", "Punktwert (45s)", "Erreichtes Level", "Max. Scrollgeschwindigkeit", "Neuromotorisches Profil"],
    rows: [
      ["Tier 1: Elite-Leitermeister (Top 0,1%)", "Apex Ladder Master", "17.000+ Punkte", "Level 12 – 15", "600 – 750 px/s", "Vollendetes Lashley-Chunking, fehlerfreies Halten des relativen Timings bei maximalem Tempo von 750 px/s (Lashley 1951; Schmidt 1975)"],
      ["Tier 2: Rhythmus-Sprinter (Top 3%)", "Elite Rhythm Sprinter", "13.000 – 16.999 Punkte", "Level 9 – 11", "480 – 599 px/s", "Exzellente beidseitige Umschaltgeschwindigkeit, präzise Fitts-Abbremskurven auf komprimierten 10–12-px-Sprossen"],
      ["Tier 3: Kompetenter Sprossensequenzer", "Proficient Step Sequencer", "9.500 – 12.999 Punkte", "Level 6 – 8", "350 – 479 px/s", "Solides Leistungsniveau im Leistungs- und eSport, stabile Links-Rechts-Rhythmik mit kontrolliertem Handgelenksnap"],
      ["Tier 4: Mittlerer Rhythmuslerner", "Intermediate Cadence Learner", "6.000 – 9.499 Punkte", "Level 3 – 5", "230 – 349 px/s", "Durchschnittliches motorisches Reaktionsniveau, sensorische Feedback-Verzögerungen führen ab 350 px/s zu Sprossenfehlern"],
      ["Tier 5: Einsteiger / Basisschulung", "Novice Rung Climber", "< 6.000 Punkte", "Level 1 – 2", "< 230 px/s", "Stockende Einzelreaktionen, Rhythmusabbrüche durch visuelles Suchen, Übung von Blickzentrierung und Vorprogrammierung empfohlen"]
    ],
    note: "Normiert nach den chronometrischen Standards der motorischen Programmierung (Lashley 1951, Schmidt 1975, Fitts 1954, Woods et al. 2015)."
  },
  techniques: {
    title: "Methodische Trainingsprotokolle für Beinarbeit & Sprossenschnelligkeit",
    items: [
      {
        name: "Lashley 4-Sprossen-Bewegungschunking (Lashley Serial Chunking)",
        desc: "Versuchen Sie niemals, jede Sprosse einzeln mit den Augen abzusichern. Programmieren Sie die 4-fache Zickzack-Bewegung (Links-Rechts-Links-Rechts) als geschlossene Einheit im Kopf vor und lösen Sie den Schwung mit dem ersten Kontakt explosiv aus.",
        tips: "Verbinden Sie die Sprossen im Geiste zu einer fließenden Wellenlinie, anstatt an jeder Kante ruckartig abzustoppen."
      },
      {
        name: "Schmidt Rhythmus-Invarianz bei Tempoverschärfung (GMP Invariant Rhythm)",
        desc: "Lassen Sie sich durch zunehmende Scrollgeschwindigkeit nicht zu hektischem Zittern verleiten. Das relative Timing (1:1:1:1) bleibt unverändert – erhöhen Sie lediglich die Spannkraft und Entschlossenheit des Cursorschwungs.",
        tips: "Zählen Sie innerlich einen gleichmäßigen 4er-Takt mit und synchronisieren Sie die Amplitude Ihrer Handbewegung mit diesem Metronom."
      },
      {
        name: "Fitts Vertikaler Vorhaltewinkel und Abbremsung (Moving Target Interception)",
        desc: "Da die Leiter senkrecht nach unten wandert, zielt ein direkter horizontaler Schwung hinter die Sprosse. Führen Sie den Cursorschwung in einem leichten Abwärtswinkel aus, um die Sprosse auf ihrer Falllinie abzufangen.",
        tips: "Zielen Sie 2 bis 3 Pixel unterhalb der Sprossenoberkante, um durch das Nachrücken der Leiter exakt in der Treffermitte zu landen."
      },
      {
        name: "Zentraler Ankerblick bei 750 px/s Höchstgeschwindigkeit (Metronomic Fixation)",
        desc: "Ab Level 10 bricht die foveale Blickverfolgung bei über 550 px/s zusammen. Fixieren Sie die vertikale Leitermitte mit ruhigem Blick und nutzen Sie das periphere Sehfeld.",
        tips: "Verlassen Sie sich im Grenzbereich voll auf das antizipierte Muskelgedächtnis und den Rhythmustakt Ihrer Finger."
      }
    ]
  },
  steps: [
    "Nehmen Sie eine ergonomische Sitzhaltung ein und zentrieren Sie den Zeiger auf der Mittelachse.",
    "Sobald die erste Leiter erscheint, flicken Sie blitzschnell auf die oberste linke Sprosse 1.",
    "Durchqueren Sie Sprosse 2 (rechts), 3 (links) und 4 (rechts) in einem einzigen, ununterbrochenen Rhythmus.",
    "Halten Sie die Serie fehlerfrei aufrecht, maximieren Sie den 3,0x-Combo-Faktor und überstehen Sie 45 Sekunden."
  ],
  audience: "Sportler (Fußball, Handball, Tennis, Kampfsport) zur Schulung von Fußschnelligkeit und Rhythmus sowie FPS-Gamer zur Optimierung von Counter-Strafing und Fadenkreuzruhe.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('lashley1951', 'schmidt1975', 'fitts1954', 'woodworth1899', 'woods2015')
};

export default function AgilityLadderPageDe() {
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
      <MotorSequencingClient
        copy={{
          title: "Koordinationsleiter-Training",
          subtitle: "Motorische Sequenzierung & Rhythmus-Beinarbeit • 15 Level",
          rulesTitle: "Trainingsregeln & Punktesystem",
          rules: [
            { title: "4-Sprossen-Sequenz meistern", text: "Durchqueren Sie die Sprossen der herabscrollenden Leiter in exakter Links-Rechts-Folge (1→2→3→4)." },
            { title: "Combo-Multiplikator aufbauen", text: "Vollenden Sie Leitern in Serie fehlerfrei, um den Combo-Faktor bis auf 3,0x zu steigern." },
            { title: "Beschleunigung & Präzision", text: "Alle 250 Punkte steigt das Level; das Scrolltempo zieht an und die Sprossentrefferzonen verengen sich." },
            { title: "Verhalten bei Fehltritten", text: "Das Auslassen einer Sprosse setzt den Combo-Multiplikator auf 1,0x zurück, ohne dass Punkte abgezogen werden." }
          ],
          aboutTitle: "Über das Koordinationsleiter-Training",
          aboutHeading: "Motorische Sequenzierung und Beinarbeit-Neurobiologie",
          aboutText: "Das digitale Koordinationsleiter-Training (Motor Sequencing) basiert auf Karl Lashleys (1951) Theorie der seriellen Bewegungsordnung und Richard A. Schmidts (1975) verallgemeinertem motorischen Programm (GMP). Es schult das neuromuskuläre System darin, bei Geschwindigkeiten von 150 bis 750 px/s eine invariante zeitliche Taktung zu wahren – unverzichtbar für athletische Fußschnelligkeit und taktisches Counter-Strafing im eSport."
        }}
      />
      <DrillGuide guide={ladderGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="physical"
          currentHref="/drills/physical/fitness/agility-ladder"
          locale="de"
        />
      </div>
    </>
  );
}
