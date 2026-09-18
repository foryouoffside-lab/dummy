import SineWavePursuitClient from '@/app/drills/visual-tracking/sine-wave-pursuit/SineWavePursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// GERMAN SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "sinuswelle augentraining" (Sine wave eye training) / "harmonische blickfolgebewegung"
// Secondary:    "kurven tracking training", "phasennacheilung augen", "vertikale blickverfolgung", "wellenform sehtraining"
// LSI / Domain:  "null-phasennacheilung", "zerebellärer oszillator", "wendepunkt abbremsung",
//               "harmonische oszillation", "korrektursakkaden unterdrueckung", "blickfolge gain 1.0"
// Authentic Domain Terms: Sinuswellen-Augentraining (Sine Wave Eye Training), Harmonische Blickfolge (Harmonic Smooth Pursuit), Sinusoidale Oszillation (Sinusoidal Oscillation), Phasennacheilung (Phase Lag), Blickfolge-Gain (Pursuit Gain), Nachholsakkade (Catch-up Saccade)
// ============================================================

export const metadata = {
  title: "Sinuswellen Augentraining – Sine Wave | SkillDrills",
  description: "Kostenloses Sinuswellen-Augentraining: Trainiere harmonische Blickfolge, zerebelläre Synchronisation und Phasennacheilung online direkt im Browser.",
  keywords: [
    "sinuswelle augentraining",
    "harmonische blickfolgebewegung",
    "kurven tracking training",
    "phasennacheilung augen",
    "vertikale blickverfolgung",
    "wellenform sehtraining",
    "null-phasennacheilung",
    "zerebellärer oszillator",
    "wendepunkt abbremsung",
    "harmonische oszillation",
    "blickfolge gain 1.0",
    "dynamische blickfolgebewegung test"
  ],
  openGraph: {
    title: "Sinuswellen Augentraining – Sine Wave | SkillDrills",
    description: "Folge kontinuierlich beschleunigenden und abbremsenden Sinuswellen mit perfekter zerebellärer Phasenanpassung ohne Latenz.",
    type: "website",
    url: "https://skilldrills.online/de/drills/visual-tracking/sine-wave-pursuit",
    siteName: "SkillDrills",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sinuswellen Augentraining – Sine Wave | SkillDrills",
    description: "Wissenschaftliches Sehtraining zur Eliminierung von Phasennacheilung bei harmonischen Oszillationen.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/de/drills/visual-tracking/sine-wave-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/sine-wave-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://skilldrills.online/de" },
    { "@type": "ListItem", "position": 2, "name": "Übungen", "item": "https://skilldrills.online/de/drills" },
    { "@type": "ListItem", "position": 3, "name": "Visuelles Tracking", "item": "https://skilldrills.online/de/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "Sinuswellen-Augentraining & Harmonische Blickverfolgung", "item": "https://skilldrills.online/de/drills/visual-tracking/sine-wave-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Sinuswellen-Augentraining & Harmonische Blickverfolgung",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Interaktives browserbasiertes Sehtraining zur okulomotorischen Synchronisation mit harmonischen Schwingungsbahnen und zur Unterdrückung von Korrektursakkaden an Richtungsumkehrpunkten.",
  "url": "https://skilldrills.online/de/drills/visual-tracking/sine-wave-pursuit",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online/de" },
  "inLanguage": "de",
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Sinuswellen-Blickführungstracker (SkillDrills Sine Wave Pursuit)",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas fähiger Browser (Chrome, Edge, Firefox, Safari)",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "url": "https://skilldrills.online/de/drills/visual-tracking/sine-wave-pursuit",
  "inLanguage": "de",
  "dateModified": "2026-09-15"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Sinuswellen Tracking Training (Sine Wave Pursuit)",
  "url": "https://skilldrills.online/de/drills/visual-tracking/sine-wave-pursuit",
  "description": "Aim- und Augentrainingstool für E-Sportler und Athleten zur Perfektionierung von Kurven-Tracking, Sprungbewegungen und Wellenverfolgung.",
  "genre": ["Aim Trainer", "Eye Tracking", "Vision Training", "Esports Drill"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Anleitung zum Training harmonischer Blickfolgebewegungen auf Sinusbahnen",
  "description": "Systematischer Ablauf zur Synchronisation des Kleinhirns auf periodische Schwingungen und Erreichung einer Null-Phasennacheilung.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Schwingungsperiode und Amplitude erfassen",
      "text": "Beobachte in den ersten ein bis zwei Schwingungen bei Tempo 1.0x den Rhythmus und die maximale Auslenkung des Zielpunkts."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Zentrale Höchstgeschwindigkeit synchronisieren",
      "text": "Am Nulldurchgang der Sinuskurve erreicht das Ziel seine höchste Winkelgeschwindigkeit. Halte den Blick foveal zentriert."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Sanftes Abbremsen an den Amplituden-Wendepunkten",
      "text": "Antizipiere das Abbremsen am Scheitelpunkt, um Blicksprünge (Sakkaden) über das Ziel hinaus zu vermeiden."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Tempo schrittweise steigern",
      "text": "Erhöhe die Frequenz auf 1.5x bis 2.0x, sobald du kontinuierlich eine Tracking-Präzision von über 90 % ohne Ruckeln erzielst."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was versteht man unter Sinuswellen-Tracking (Sine Wave Pursuit) und wie unterscheidet es sich vom linearen Tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bei linearer Bewegung bewegt sich das Objekt mit konstanter Geschwindigkeit. Bei einer Sinuswelle hingegen ändern sich Position, Geschwindigkeit und Beschleunigung kontinuierlich nach den Gesetzen der harmonischen Schwingung. In der Mitte ist die Geschwindigkeit am höchsten, an den Umkehrpunkten fällt sie kurzzeitig auf null ab. Das erfordert eine ständige, fließende Drehmomentanpassung der Augenmuskeln (Robinson, 1965)."
      }
    },
    {
      "@type": "Question",
      "name": "Warum kann das menschliche Sehsystem die 150ms Signalverzögerung bei Sinuswellen auf null reduzieren?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stark et al. (1962) bewiesen, dass das Kleinhirn (Cerebellum) bei periodischen, vorhersagbaren Reizen innerhalb weniger Zyklen die Frequenz adaptiert. Dadurch steuert das Gehirn die Augenmuskeln vorausschauend per Feedforward an, wodurch die sensorische Latenz von 130–150 ms vollständig neutralisiert wird (Null-Phasennacheilung / Zero Phase Lag)."
      }
    },
    {
      "@type": "Question",
      "name": "Warum kommt es an den Wendepunkten der Kurve häufig zu Rucklern und Blicksprüngen (Sakkaden)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wenn das Ziel am Scheitelpunkt abbremst, neigt das Auge durch motorische Trägheit und zu aggressive Vorhersage zum 'Obershoot' (Überschießen). Um den Fehler zu korrigieren, feuert das Gehirn hektische Nachholsakkaden ab, was die Kontinuität der Spurführung zerstört (Bahill et al., 1980)."
      }
    },
    {
      "@type": "Question",
      "name": "Wie verbessert dieses Training das Kurven- und Strafe-Tracking in kompetitiven Shootern?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In Spielen wie Apex Legends oder Overwatch bewegen sich Gegner selten schnurgerade, sondern springen, sliden und strafen in wellenartigen Bögen. Wer Sinuskurven flüssig verfolgen kann, führt das Fadenkreuz wie auf Schienen ohne ständiges Über- und Unterkorrigieren."
      }
    },
    {
      "@type": "Question",
      "name": "Was genau bedeutet der 'Blickfolge-Gain (Pursuit Gain)'?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der Gain beschreibt das Verhältnis von Augenwinkelgeschwindigkeit zu Zielwinkelgeschwindigkeit. Ein idealer Wert liegt bei 1.0 (exakte Synchronität). Fällt der Gain unter 0.8, fällt das Auge zurück und muss durch ermüdende Korrektursakkaden nachjustieren (Rashbass, 1961)."
      }
    },
    {
      "@type": "Question",
      "name": "Warum fällt die vertikale (Auf-Ab) Sinusverfolgung oft schwerer als die horizontale (Links-Rechts)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Das oculomotorische System des Menschen ist anatomisch auf horizontale Abtastung optimiert. Vertikale Blickfolgebewegungen nutzen andere Hirnstammkerne (rostraler interstitieller Kern) und besitzen eine geringere neuronale Bandbreite, weshalb vertikale Oszillationen früher an ihre Leistungsgrenze stoßen."
      }
    },
    {
      "@type": "Question",
      "name": "Nützt das Sinuswellen-Augentraining auch im Ballsport (Fußball, Volleyball, Tennis)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sehr stark. Flatterbälle, Flugkurven und aufprallende Bälle folgen schwerkraftbedingt parabolen und wellenartigen Bahnen. Die Fähigkeit, den Scheitelpunkt einer Flugbahn und den Beschleunigungswechsel exakt mit den Augen abzutasten, erhöht die Treffsicherheit beim Schmettern und Fangen."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Rolle spielt die Monitor-Bildwiederholrate (Hz) beim harmonischen Tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Da die Sinusgeschwindigkeit kontinuierlich gleitet, wirkt sie bei 60 Hz mikroskopisch abgehackt. Monitore mit 144 Hz oder 240 Hz bilden die Geschwindigkeitsgradienten an den Wendepunkten ultra-flüssig ab, was dem Kleinhirn eine präzisere Rhythmusanpassung ermöglicht (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Wie lange und wie oft sollte die Übung durchgeführt werden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aufgrund der hohen Beanspruchung der Augenmuskeln empfehlen sich 3 bis 5 Durchgänge à 60 Sekunden (insgesamt ca. 3 bis 5 Minuten) an 3 bis 4 Tagen pro Woche. Bei einsetzendem Flimmern oder Muskelziehen sollte pausiert werden."
      }
    },
    {
      "@type": "Question",
      "name": "Kann regelmäßiges Wellen-Tracking vorzeitiger Augenermüdung am Bildschirm vorbeugen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Es mobilisiert die gesamte Augenmuskulatur in ihrem vollen Bewegungsradius, fördert die Durchblutung des Augapfels und durchbricht den starren Tunnelblick, der durch stundenlanges starres Arbeiten vor Monitoren entsteht."
      }
    }
  ]
};

const guideProps = {
  heading: "Wissenschaftliche Grundlagen des Sinuswellen-Trackings und harmonischer Blickführung",
  intro: [
    "Die Qualität des okulomotorischen Blickfolgesystems (Smooth Pursuit) offenbart sich besonders deutlich, wenn das Auge nicht simplen, gleichförmigen Bahnen folgt, sondern harmonischen Schwingungsbewegungen (Simple Harmonic Motion). Entlang einer Sinuswelle variieren Geschwindigkeit und Beschleunigung des Zielobjekts kontinuierlich: Am Nulldurchgang in der Schwingungsmitte erreicht die translatorische Geschwindigkeit ihr absolutes Maximum, während sie an den äußeren Scheitelpunkten (Wendepunkten) bis zum Stillstand abbremst, bevor sich die Bewegungsrichtung umkehrt.",
    "Klassische neurologische Studien von Stark et al. (1962) und David Robinson (1965) zeigten, dass das visuelle System bei unvorhersehbaren Reizen unvermeidbar 130 bis 150 Millisekunden hinterherhinkt (Phasennacheilung). Sobald eine Bewegung jedoch periodisch-sinusoidaler Natur ist, adaptiert das Kleinhirn (Cerebellum) binnen kürzester Zeit die Grundfrequenz. Über feedforward-gesteuerte motorische Entladungen an die Augenmuskelkerne neutralisiert das Gehirn die sensorische Latenz vollständig – ein Phänomen, das als 'Null-Phasennacheilung (Zero Phase Lag)' bekannt ist.",
    "Stoßen Schwingungsfrequenz oder Zielgeschwindigkeit jedoch an die biologischen Kapazitätsgrenzen, gerät die geschmeidige Spurführung aus dem Takt. Wie Rashbass (1961) und Bahill et al. (1980) nachwiesen, führt ein Einbruch des Geschwindigkeits-Gains (Verhältnis von Augentempo zu Zieltempo) dazu, dass der foveale Fokus abreißt. Um den Anschluss nicht zu verlieren, schaltet das Zentralnervensystem auf ruckartige 'Nachholsakkaden (Catch-up Saccades)' um, wodurch während jedes Sprungs eine sakkadische Unterdrückung die Sehschärfe kurzzeitig ausblendet.",
    "Dieser Drill (Sine Wave Pursuit) trainiert gezielt das zerebelläre Schwingungsgedächtnis sowie die feinstufige Brems- und Beschleunigungsmotorik der äußeren Augenmuskeln in horizontaler und vertikaler Dimension. Entwickle einen fehlerfreien Blickfolge-Gain von 1.0 ohne sakkadische Unterbrechungen – das unverzichtbare Fundament für flüssiges Aiming bei dynamischen Ausweichbewegungen im E-Sport und die perfekte Antizipation von Ballflugkurven im Sport."
  ],
  benchmarks: {
    title: "Standard-Benchmarks für Harmonische Blickfolge & Geschwindigkeits-Gain (Sinusoidal Gain)",
    headers: ["Leistungsstufe", "Geschwindigkeits-Gain", "Phasennacheilung", "Nachholsakkaden pro Zyklus", "Tracking-Profil"],
    rows: [
      ["Elite", "0.96 – 1.02", "Unter 15 ms (Vollsynchron)", "0 – 1 (Perfekte flüssige Spur)", "Vollständige zerebelläre Null-Phasen-Synchronisation"],
      ["Meister", "0.90 – 0.95", "15 ms – 30 ms", "2 – 3", "Sehr hohe Spurtreue, minimale Wendepunkt-Korrektur"],
      ["Diamant", "0.82 – 0.89", "31 ms – 50 ms", "4 – 5", "Solide Wellenführung, leichte Drift bei hohem Tempo"],
      ["Gold", "0.70 – 0.81", "51 ms – 80 ms", "6 – 8", "Instabil an Scheitelpunkten, häufige Korrektursakkaden"],
      ["Basis", "Unter 0.70", "Über 80 ms", "Über 9", "Fehlende Rhythmusanpassung, rein reaktive Blicksprünge"]
    ],
    note: "※ Messwerte basieren auf standardisierten Tests bei 1080p Auflösung und Geschwindigkeit 1.0x–1.5x. Bewertet wird die Übereinstimmung der Winkelgeschwindigkeiten (Gain) sowie die Sakkadenarmut."
  },
  techniques: {
    title: "Vier Kerntechniken zur Beherrschung harmonischer Sinus-Blickbahnen",
    items: [
      {
        name: "Harmonische Phasenverriegelung (Phase Locking)",
        desc: "Nutze die ersten Schwingungszyklen, um den Rhythmus der Wellenbewegung mental zu verinnerlichen. Schalte den zerebellären Taktgeber ein und führe das Auge im Takt der Schwingung, anstatt passiv auf optische Reize zu warten.",
        tips: "Zähle im Kopf einen gleichmäßigen 2er-Takt ('Eins-Zwei, Eins-Zwei') mit, um die sensorische Verzögerung komplett auszuschalten."
      },
      {
        name: "Sanfte Wendepunkt-Dämpfung (Apex Deceleration Cushioning)",
        desc: "Wenn das Ziel den oberen oder unteren Scheitelpunkt ansteuert, drossle die Augenmuskelspannung rechtzeitig. Verhindere so ein Überschießen (Overshoot) über den Bewegungsumkehrpunkt.",
        tips: "Visualisiere das sanfte Ausschwingen eines Pendels am höchsten Punkt, bevor es schwerelos die Richtung ändert."
      },
      {
        name: "Zentraler Geschwindigkeitsschub (Zero-Crossing Acceleration Boost)",
        desc: "Beim Passieren der horizontalen Mittelachse erreicht die Sinuskurve ihre höchste Geschwindigkeit. Erhöhe genau in dieser Passage aktiv den okulomotorischen Vortrieb, um nicht ins Hintertreffen zu geraten.",
        tips: "Gib dem Blick im Zentrum bewusst einen dynamischen Impuls, um den fovealen Kontakt festzuhalten."
      },
      {
        name: "Disziplinierte Sakkaden-Unterdrückung (Saccadic Suppression Control)",
        desc: "Widerstehe dem Impuls, bei kleinen Abweichungen reflexartig mit den Augen zu zucken. Gleiche minimale Distanzen lieber durch sanfte Tempoanpassung der kontinuierlichen Blickfolge aus.",
        tips: "Halte die Augenmuskeln weich und elastisch wie ein Gummiband, das sanft zum Zielpunkt zurückfedert."
      }
    ]
  },
  steps: [
    "Sitzposition einrichten: Positioniere dich in ca. 60 cm Sehabstand mittig vor dem Bildschirm und stelle eine entspannte Kopfhaltung sicher.",
    "Initialer Rhythmusabgleich: Starte die Übung bei Geschwindigkeit 1.0x und erfasse die Amplitude sowie die Frequenz der Welle.",
    "Phasensynchronisation aktivieren: Passe deine Blickfolgebewegung in den ersten 2–3 Zyklen exakt an die Beschleunigungsphasen an.",
    "60 Sekunden kontinuierliche Verfolgung: Halte den Blick für eine Minute ununterbrochen auf dem Kugelzentrum, ohne Blicksprünge einzustreuen.",
    "Auswertung analysieren: Überprüfe nach Ablauf der Runde deine Tracking-Präzision (Accuracy %) und die Konstanz deines Geschwindigkeits-Gains."
  ],
  audience: "Shooter-Gamer (Apex Legends, Overwatch) zur Beherrschung unberechenbarer Strafe- und Sprungkurven, Athleten in dynamischen Ballsportarten (Tennis, Volleyball, Fußball) zur Antizipation gekrümmter Balltrajektorien, sowie Bildschirmarbeiter zur Entlastung verspannter Augenmuskeln.",
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('stark1962', 'robinson1965', 'rashbass1961', 'bahill1980', 'barnes2008', 'woods2015'),
  related: [
    { href: "/de/drills/visual-tracking/constant-slow-pursuit", label: "Konstantes langsames Blickfolgetraining (Constant Slow)" },
    { href: "/de/drills/visual-tracking/directional-chaos-pursuit", label: "Richtungs-Chaos Blickverfolgung (Directional Chaos)" },
    { href: "/de/drills/visual-tracking/dynamic-evasion-pursuit", label: "Dynamische Ausweich-Blickverfolgung (Dynamic Evasion)" },
    { href: "/de/drills/visual-tracking/ghosting-suppress-pursuit", label: "Nachbild-Unterdrückung Blickverfolgung (Ghosting Suppress)" },
    { href: "/de/drills/visual-tracking/infinity-pursuit", label: "Liegende Acht Augentraining (Infinity)" },
    { href: "/de/drills/visual-tracking/predictive-pursuit", label: "Prädiktive Blickführung (Predictive Pursuit)" }
  ]
};

export default function GermanSineWavePursuitPage() {
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

      <SineWavePursuitClient
        copy={{
          title: "Sinuswellen-Augentraining & Harmonische Blickverfolgung: Null-Phasennacheilung",
          subtitle: "Synchronisation des Kleinhirns auf periodische Sinus-Beschleunigungen und Wendepunkt-Dämpfung",
          description: "Kostenloses Online-Augentraining entlang horizontaler und vertikaler Sinuswellen. Trainiere zerebelläre Synchronisation, harmonische Beschleunigung und eliminiere die 150ms Phasennacheilung an Richtungsumkehrpunkten. Für flüssiges Aiming in Shootern und Ballsport-Antizipation. Sofort im Browser startbar."
        }}
      />

      <DrillGuide guide={guideProps} />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/de/drills/visual-tracking/sine-wave-pursuit" />
      </div>
    </>
  );
}
