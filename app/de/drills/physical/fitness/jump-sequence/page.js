import JumpSequenceClient from '@/app/drills/physical/fitness/jump-sequence/JumpSequenceClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Germany (DE)
// Primary Intent: Sprungkraft Trainieren Übungen, Plyometrisches Training Sprungkraft, Vertikalsprung Trainieren
// German Context: Sprungkraft & Timing im Volleyball/Basketball/Fußball & Flugbahnantizipation
// High-Demand, Low-Competition Target Keywords:
//   - "Sprungkraft Trainieren Übungen" (High-intent vertical jump workout search)
//   - "Plyometrisches Training Sprungkraft" (Scientific plyometric power conditioning)
//   - "Sprungkraft Trainieren Zuhause" (Home vertical power training)
//   - "Vertikalsprung Trainieren" (Vertical jump measurement & performance drill)
//   - "Flugbahn Antizipation Training" (Trajectory anticipation & interception drill)
//   - "Abfang-Timing Spiel" (Dynamic target interception timing)
//   - "Dehnungs-Verkürzungs-Zyklus" (Stretch-shortening cycle biomechanics)
//   - "Flugbahn Berechnen Spiel" (Trajectory estimation game)
//   - "Sprungkraft Volleyball Übungen" (Volleyball jump spike timing)
//   - "Reaktionsschnelligkeit Sprung" (Jump reflex & cadence)
// ============================================================

export const metadata = {
  title: 'Sprungkraft Trainieren – Plyometrik | SkillDrills',
  description: 'Kostenloses Sprungkraft-Training online. Fange parabelförmige Sprungziele am Scheitelpunkt ab und trainiere Timing und plyometrischen Rhythmus im Browser.',
  keywords: [
    "Sprungkraft Trainieren Übungen",
    "Plyometrisches Training Sprungkraft",
    "Sprungkraft Trainieren Zuhause",
    "Vertikalsprung Trainieren",
    "Flugbahn Antizipation Training",
    "Abfang-Timing Spiel",
    "Dehnungs-Verkürzungs-Zyklus",
    "Flugbahn Berechnen Spiel",
    "Sprungkraft Volleyball Übungen",
    "Reaktionsschnelligkeit Sprung"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/physical/fitness/jump-sequence',
    languages: getAlternateLanguages('/drills/physical/fitness/jump-sequence'),
  },
  openGraph: {
    title: "Sprungkraft Trainieren & Plyometrisches Training – Flugbahn-Abfang-Spiel | SkillDrills",
    description: "Kostenloses Online-Training für Sprungkraft & plyometrisches Timing. Schulen Sie vertikalen Impuls, parabolische Flugbahn-Steuerung und das präzise Abfangen dynamischer Ziele.",
    url: 'https://skilldrills.online/de/drills/physical/fitness/jump-sequence',
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sprungkraft Trainieren & Plyometrisches Training – Flugbahn-Abfang-Spiel | SkillDrills",
    description: "Kostenloses Online-Training für Sprungkraft & plyometrisches Timing. Schulen Sie vertikalen Impuls, parabolische Flugbahn-Steuerung und das präzise Abfangen dynamischer Ziele.",
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
      "name": "Sprungkraft & Plyometrisches Training",
      "item": "https://skilldrills.online/de/drills/physical/fitness/jump-sequence"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Sprungkraft- & Flugbahn-Abfang-Trainer",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Kostenloses biomechanisches Trainingswerkzeug zur Schulung von vertikalem Sprungimpuls, parabolischer Flugbahnsteuerung und dynamischem Zielabfangen.",
  "url": "https://skilldrills.online/de/drills/physical/fitness/jump-sequence",
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
  "name": "Sprungkraft-Training Web-App",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas und Zeigererfassung (Pointer Lock) fähiger moderner Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/de/drills/physical/fitness/jump-sequence",
  "inLanguage": "de",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Sprungsequenz-Abfangspiel (Jump Sequence)",
  "url": "https://skilldrills.online/de/drills/physical/fitness/jump-sequence",
  "description": "Kostenloses Action-Geschicklichkeitsspiel zur Flugbahnsteuerung und zum Abfangen fliegender Ziele.",
  "genre": [
    "Action Game",
    "Physics Game",
    "Timing Drill",
    "Coordination"
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
      "name": "Wie überträgt sich das digitale Impuls- und Flugbahn-Training auf die reale Sprungkraft im Sport (Volleyball, Basketball, Fußball)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Das Training modelliert Paavo V. Komis (2000) Dehnungs-Verkürzungs-Zyklus (DVZ): Das Nervensystem lernt, elastische Energie im Moment des Bodenkontakts aufzuladen und als explosive Kraftentwicklungsrate (RFD) abzurufen. Die laterale Steuerung der Flugbahn schult das räumliche Vorstellungsvermögen für das Abfangen von Bällen am höchsten Sprungpunkt (Apex)."
      }
    },
    {
      "@type": "Question",
      "name": "Was versteht man unter dem Dehnungs-Verkürzungs-Zyklus (DVZ / SSC) nach Paavo V. Komi (2000)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der Dehnungs-Verkürzungs-Zyklus beschreibt die physiologische Kopplung einer exzentrischen Vordehnung des Muskel-Sehnen-Apparates mit einer unmittelbar anschließenden konzentrischen Verkürzung. Durch den Dehnungsreflex (Ia-Spindel-Afferenzen) und elastische Speichereffekte im Sehnengewebe wird die Absprungleistung um bis zu 25 % gegenüber rein statischen Sprüngen gesteigert."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Funktion haben Vorwärtsmodelle des Kleinhirns (Kawato, 1999) bei der Flugbahnsteuerung im Sprung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Da während des freien Fluges keine Bodenreaktionskraft mehr aufgebaut werden kann, reicht visuelles Feedback (100–150 ms Latenz) für Korrekturen nicht aus. Das Kleinhirn nutzt interne Vorwärtsmodelle (Forward Models), um die parabolische Flugkurve im Voraus zu berechnen und antizipierende Steuerungsimpulse zur Schnittpunktkonvergenz auszusenden."
      }
    },
    {
      "@type": "Question",
      "name": "Wie funktioniert die optische Tau-Theorie (David N. Lee, 1976) zur Berechnung der Time-to-Contact (TTC)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Das Sehzentrum errechnet die verbleibende Zeit bis zur Kollision (Time-to-Contact) direkt aus der relativen optischen Expansionsrate des Netzhautbildes – der sogenannten optischen Tau-Variable (τ). Weder die absolute Distanz noch die exakte physikalische Geschwindigkeit müssen getrennt bestimmt werden, was blitzschnelles Abfangen bei bis zu 900 px/s ermöglicht."
      }
    },
    {
      "@type": "Question",
      "name": "Wie steigern sich Zielgeschwindigkeit und Trefferradius über die 15 Schwierigkeitsstufen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Alle 250 Punkte klettert der Schwierigkeitsgrad um ein Level (bis Level 15). Die Geschwindigkeit der Flugziele beschleunigt von 120 px/s bis auf 900 px/s, während der effektive Trefferradius von 35 px auf 12 px schrumpft. In höheren Stufen erzeugen elastische Wandabpraller unvorhersehbare Flugkurven."
      }
    },
    {
      "@type": "Question",
      "name": "Gibt es Punktabzug oder Zeitverlust, wenn das Ziel verfehlt wird und man am Boden aufkommt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nein. Ein Verfehlen des Ziels setzt lediglich den Combo-Multiplikator auf 1,0x zurück und löst einen roten Warnblitz aus. Die Gesamtpunktzahl und die 45-Sekunden-Uhr bleiben vollständig erhalten, um mutige Höchstgeschwindigkeitsabfänge zu fördern."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Mauseinstellungen (DPI) und Griffstile sind für das laterale Steuern in der Luft am besten geeignet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der Fingertip- oder Claw-Grip bietet optimale Hebelverhältnisse: Er erlaubt feine laterale Kurvenanpassungen aus den Fingergelenken und dem Handgelenk innerhalb des kurzen 100-ms-Zeitfensters vor der Scheitelpunkterreichung. Eine mittlere Mausempfindlichkeit (eDPI 200–350) verhindert Übersteuern."
      }
    },
    {
      "@type": "Question",
      "name": "Wie hält man den optimalen Lande- und Absprung-Rhythmus (Rebound Cadence) aufrecht?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Im Moment der Landung darf die Handbewegung nicht stoppen. Bereits im Landeanflug fixiert der Blick die nächste Zieltrajektorie, sodass im Moment der Bodenberührung die nächste Ladephase ohne Pausenverzug startet – analog zum reaktiven Pufferkontakt im plyometrischen Sprungtraining."
      }
    },
    {
      "@type": "Question",
      "name": "Welchen Einfluss haben Gaming-Monitore mit 144 Hz oder 240 Hz auf das Abfangen von Zielen bei 900 px/s?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bei 900 px/s springt ein Ziel auf einem 60-Hz-Monitor um 15 Pixel pro Frame; bei 240 Hz sinkt dieser Abstand auf 3,75 Pixel. Dies ermöglicht eine kontinuierliche optische Tau-Berechnung und verhindert, dass das Fadenkreuz an schmalen 12-px-Zielen vorbeirutscht."
      }
    },
    {
      "@type": "Question",
      "name": "Werden während der Trainingseinheit persönliche Bewegungs- oder Leistungsdaten an externe Server übermittelt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nein. Alle Physik- und Latenzberechnungen laufen zu 100 % lokal im Browser via performance.now(). Highscores und Statistiken verbleiben privat im localStorage Ihres Geräts. Es findet keinerlei Tracking oder externe Datenerfassung statt."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Sprungsequenz-Training: 4-Stufen-Protokoll zur Flugbahnsteuerung",
  "description": "Wissenschaftlich fundierte Anleitung zur Optimierung von Absprungimpuls, parabolischer Flugkurve und optischem Zielabfangen.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Vertikalen Absprungimpuls aufladen (Charge Impulse)",
      "text": "Positionieren Sie den Zeiger auf dem Basispunkt, halten Sie die Maustaste gedrückt und stimmen Sie den Ladebalken auf die Zielhöhe ab.",
      "url": "https://skilldrills.online/de/drills/physical/fitness/jump-sequence#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Ballistischer Start & Flugbahnsteuerung (Liftoff & Steering)",
      "text": "Lassen Sie die Maustaste los für den ballistischen Aufstieg und steuern Sie die Flugkurve mit sanften Mausbewegungen Richtung Zielvektor.",
      "url": "https://skilldrills.online/de/drills/physical/fitness/jump-sequence#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Optisches Tau-Abfangen am Scheitelpunkt (Tau Interception)",
      "text": "Verfolgen Sie die Zielannäherung und bringen Sie den eigenen Punkt vor Beginn des Gravitationsabfalls mit dem Zielkern zur Deckung.",
      "url": "https://skilldrills.online/de/drills/physical/fitness/jump-sequence#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Bodenberührung & Rebound-Kadenz (Touchdown & Rebound)",
      "text": "Leiten Sie bei der Landung sofort die nächste Ladesequenz ein und halten Sie den 3,0x-Combo-Multiplikator über 45 Sekunden stabil.",
      "url": "https://skilldrills.online/de/drills/physical/fitness/jump-sequence#step-4"
    }
  ]
};

const jumpGuide = {
  heading: "Wissenschaftlicher Leitfaden: Sprungkraft-Timing & Parabolische Flugbahnsteuerung",
  subtitle: "Komi-DVZ-Kinetik, Kawato-Kleinhirn-Vorwärtsmodelle und Lee-Optisches-Tau im dynamischen Abfangtraining",
  intro: [
    "Das Training der Sprungsequenz (Jump Sequence Training) überträgt die neuromuskuläre Koordination des Vertikalsprungs auf eine interaktive biomechanische Simulation. Im Volleyball, Basketball, Torwartspiel und im Hochsprung entscheidet nicht allein die maximale Sprunghöhe, sondern die Fähigkeit, den Scheitelpunkt (Apex) einer ballistischen Parabel zeitlich und räumlich exakt mit einem fliegenden Objekt zur Konvergenz zu bringen.",
    "Nach Paavo V. Komis (2000) Forschung zum Dehnungs-Verkürzungs-Zyklus (DVZ) maximiert der menschliche Bewegungsapparat seine Kraftentwicklungsrate (RFD) durch das elastische Zusammenspiel von Vordehnung und konzentrischem Abstoß. Der Charge-and-Launch-Mechanismus dieses Drills visualisiert diesen Vorgang: Der Athlet lernt, den vertikalen Kraftimpuls intuitiv an die Flughöhe des herannahenden Ziels anzupassen.",
    "Die Steuerung im freien Flug unterliegt den internen Vorwärtsmodellen des Kleinhirns (Kawato, 1999). Weil in der Luft keine Bodenreaktionskräfte mehr wirken, muss das zentrale Nervensystem die Flugkurve vorausschauend planen. Zusammen mit David N. Lees (1976) optischer Tau-Theorie (τ), die den Kollisionszeitpunkt aus der Bildexpansionsrate ermittelt, wird das Abfangen von Zielen bei Geschwindigkeiten von bis zu 900 px/s trainiert.",
    "Präzisions- und Hardwarehinweis: Die Zeiterfassung erfolgt lokal im Browser über die hochauflösende performance.now()-Schnittstelle. Bildwiederholfrequenzen (60 Hz = 16,7 ms Framezeit vs. 240 Hz = 4,1 ms) und USB-Abtastraten (125 Hz vs. 1.000 Hz) bedingen physikalische Toleranzen. Differenzen unter 5 ms gelten als reguläres Messrauschen. Sämtliche Messwerte verbleiben privat in Ihrem Browser."
  ],
  benchmarks: {
    title: "Wissenschaftliche 5-Stufen-Normtabelle für das Sprungsequenz-Training",
    headers: ["Leistungsstufe & Perzentil", "Rangtitel (Rank Title)", "Punktwert (45s)", "Genauigkeit & Geschwindigkeit", "Gesamtnote", "Neuromotorisches Profil"],
    rows: [
      ["Tier 1: Elite-Trajektorienmeister (Top 0,1%)", "Apex Trajectory Master", "17.000+ Punkte", "92%+ / 800 – 900 px/s", "Grade S", "Perfekte DVZ-Impulsberechnung, makelloses optisches Tau-Abfangen fliegender Ziele bei 900 px/s (Komi 2000; Kawato 1999; Lee 1976)"],
      ["Tier 2: Präzisions-Flugangreifer (Top 3%)", "Precision Aerial Striker", "12.000 – 16.999 Punkte", "84 – 91% / 650 – 799 px/s", "Grade A", "Hervorragende Kleinhirn-Steuerung im freien Flug, stabile Konvergenz auf komprimierte 15–18-px-Ziele"],
      ["Tier 3: Kompetenter Sprungabfänger", "Skilled Jump Interceptor", "7.500 – 11.999 Punkte", "75 – 83% / 500 – 649 px/s", "Grade B", "Solides Niveau im Leistungs- und eSport, verlässliche Impulsdosierung und gute Rebound-Rhythmik"],
      ["Tier 4: Parabel-Navigator (Durchschnitt)", "Developing Parabola Navigator", "4.000 – 7.499 Punkte", "65 – 74% / 350 – 499 px/s", "Grade C", "Durchschnittliche zeitliche Koordination, bei Zielgeschwindigkeiten über 500 px/s häufen sich Landefehler"],
      ["Tier 5: Einsteiger / Basistraining", "Novice Liftoff Trainee", "< 4.000 Punkte", "< 65% / < 350 px/s", "Grade D", "Fehldosierte Ladeimpulse, Verzögerung bei der Flugbahnkorrektur, Übung von Vorsteuerung empfohlen"]
    ],
    note: "Normiert nach den chronometrischen Standards des Dehnungs-Verkürzungs-Zyklus (Komi 2000), der Kleinhirn-Modellierung (Kawato 1999) und der optischen Tau-Theorie (Lee 1976)."
  },
  techniques: {
    title: "Methodische Trainingsprotokolle für Sprungkraft & Flugbahnsteuerung",
    items: [
      {
        name: "Komi DVZ-Impulsdosierung nach Maß (Komi Impulse Potentiation)",
        desc: "Laden Sie den Impulsbalken nicht blind auf 100 %. Erfassen Sie die Höhe des Zielobjekts und laden Sie die Energie nur so weit auf, dass der Scheitelpunkt der Flugparabel exakt die Zielhöhe schneidet.",
        tips: "Führen Sie das Drücken und Loslassen wie das Spannen und Schnellenlassen einer Sehne aus – kurz, explosiv und zielgenau."
      },
      {
        name: "Kawato Kleinhirn-Vorwärtssteuerung in der Luft (Cerebellar Parabolic Steering)",
        desc: "Blicken Sie während des Flugs nicht auf den eigenen Punkt, sondern auf den vorausberechneten Schnittpunkt. Lassen Sie die Hand der gedachten Kurve sanft vorausgleiten.",
        tips: "Fliegen Sie dorthin, wo das Ziel in 100 ms sein wird – niemals dorthin, wo es sich gerade befindet."
      },
      {
        name: "Lee Optisches Tau im Landeanflug (Optical Tau Final Interception)",
        desc: "In den letzten 100 ms vor der Zielberührung fokussiert die Wahrnehmung auf die optische Ausdehnungsrate (τ). Führen Sie mit feinen Fingerbewegungen die Endkorrektur durch.",
        tips: "Visieren Sie nicht den Rand des Zielkreises an, sondern durchdringen Sie den Kern der Kugel frontal."
      },
      {
        name: "900 px/s Rebound-Kadenz bei Bodenkontakt (Rebound Cadence Maintenance)",
        desc: "Verharren Sie nach der Landung nicht in Passivität. Starten Sie im Moment des Aufkommens sofort den nächsten Ladezyklus, um einen metronomischen Rebound-Rhythmus zu etablieren.",
        tips: "Bringen Sie die Maus bereits während des Sinkflugs in die Ausgangsposition für den nächsten Impuls."
      }
    ]
  },
  steps: [
    "Nehmen Sie eine aufrechte Haltung ein und positionieren Sie den Zeiger auf dem Basispunkt.",
    "Erfassen Sie Zielhöhe und Tempo, halten Sie die Taste zum Aufladen gedrückt und lösen Sie aus.",
    "Steuern Sie die Maus in der Luft lateral, um die Flugparabel mit dem Zielvektor zu schneiden.",
    "Starten Sie bei der Landung sofort den nächsten Absprung und halten Sie den 3,0x-Combo über 45 Sekunden."
  ],
  audience: "Sportler (Volleyball, Basketball, Fußball, Leichtathletik) zur Schulung von Sprunghöhen-Timing und Flugbahngefühl sowie FPS-Gamer für präzise Sprungschüsse und Aerial Tracking.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('komi2000', 'kawato1999', 'lee1976', 'woodworth1899', 'fitts1954', 'woods2015')
};

export default function JumpSequencePageDe() {
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
      <JumpSequenceClient
        copy={{
          title: "Sprungsequenz & Flugbahn-Abfangen",
          subtitle: "Vertikaler Absprungimpuls & Flugbahnsteuerung • 15 Level",
          rulesTitle: "Trainingsregeln & Punktesystem",
          rules: [
            { title: "Impuls aufladen und abspringen", text: "Halten Sie die Maustaste auf dem Spielerpunkt gedrückt, um Sprungenergie zu sammeln, und lassen Sie los." },
            { title: "Flugbahnsteuerung in der Luft", text: "Bewegen Sie die Maus im Flug lateral, um Ihre parabolische Flugkurve auf das fliegende Ziel auszurichten." },
            { title: "Combo-Multiplikator aufbauen", text: "Jeder erfolgreiche Treffer vor der Landung belohnt Sie mit Punkten und steigert den Combo-Faktor bis auf 3,0x." },
            { title: "Verhalten bei Fehltritten", text: "Ein Aufkommen am Boden ohne Zieltreffer setzt den Combo-Multiplikator auf 1,0x zurück; Punkte bleiben erhalten." }
          ],
          aboutTitle: "Über das Sprungsequenz-Training",
          aboutHeading: "Dehnungs-Verkürzungs-Zyklus (DVZ) und Flugbahnsteuerung",
          aboutText: "Das Sprungsequenz-Training (Jump Sequence) basiert auf Paavo V. Komis (2000) Dehnungs-Verkürzungs-Zyklus und Mitsuo Kawatos (1999) Kleinhirn-Vorwärtsmodellen. Es trainiert das neuromuskuläre System darin, vertikalen Absprungimpuls millimetergenau an fliegende Ziele anzupassen und Flugbahnen nach David N. Lees (1976) optischer Tau-Theorie im Scheitelpunkt punktgenau abzufangen. Unverzichtbar für Volleyball, Basketball und präzise Sprungschüsse in modernen Action- und Taktik-Shootern."
        }}
      />
      <DrillGuide guide={jumpGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="physical"
          currentHref="/drills/physical/fitness/jump-sequence"
          locale="de"
        />
      </div>
    </>
  );
}
