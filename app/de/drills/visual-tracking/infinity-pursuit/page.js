import InfinityPursuitClient from '@/app/drills/visual-tracking/infinity-pursuit/InfinityPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// GERMAN SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "liegende acht augentraining" (Lying eight eye training) / "achter schleife augenuebung"
// Secondary:    "binokulare koordination training", "mittellinienkreuzung blickuebung", "augentraining liegende 8"
// LSI / Domain:  "glatte augenfolgebewegung achterbahn", "augenmuskeltraining unendlichkeitsschleife",
//               "blickmotorik koordinationsuebung", "lemniskate augentraining online", "sakkaden unterdrueckung blick"
// Authentic Domain Terms: Liegende Acht Augentraining（Figure-8 Eye Training）, Bernoullische Lemniskate（Lemniscate of Bernoulli）, Überschreiten der Mittellinie（Midline Crossing）, Binokulare Koordination（Binocular Coordination）, Glatte Augenfolgebewegung（Smooth Pursuit）, Sakkadische Korrektursprünge（Catch-up Saccades）
// ============================================================

export const metadata = {
  title: "Liegende Acht Augentraining – Infinity | SkillDrills",
  description: "Kostenloses Augentraining entlang der liegenden Acht: Koordiniere alle 6 äußeren Augenmuskeln und trainiere die foveale Mittellinienkreuzung im Browser.",
  keywords: [
    "liegende acht augentraining",
    "achter schleife augenuebung",
    "binokulare koordination training",
    "mittellinienkreuzung blickuebung",
    "augentraining liegende 8",
    "glatte augenfolgebewegung achterbahn",
    "augenmuskeltraining unendlichkeitsschleife",
    "blickmotorik koordinationsuebung",
    "lemniskate augentraining online",
    "sakkaden unterdrueckung blick",
    "foveale blickstabilisierung acht",
    "vision training esport kostenlos"
  ],
  openGraph: {
    title: "Liegende Acht Augentraining – Infinity | SkillDrills",
    description: "Wissenschaftliches Augentraining entlang der Bernoullischen Lemniskate (liegende Acht). Koordiniert alle 6 äußeren Augenmuskeln und schult die Mittellinienkreuzung.",
    type: "website",
    url: "https://skilldrills.online/de/drills/visual-tracking/infinity-pursuit",
    siteName: "SkillDrills",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Liegende Acht Augentraining – Infinity | SkillDrills",
    description: "Liegende Acht Blickübung: Trainiere stufenlose Augenfolgebewegungen und das fehlerfreie Überschreiten der visuellen Mittellinie.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/de/drills/visual-tracking/infinity-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/infinity-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://skilldrills.online/de" },
    { "@type": "ListItem", "position": 2, "name": "Übungen", "item": "https://skilldrills.online/de/drills" },
    { "@type": "ListItem", "position": 3, "name": "Visuelle Blickverfolgung", "item": "https://skilldrills.online/de/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "Liegende Acht Augentraining – Achter-Schleifen-Blickübung", "item": "https://skilldrills.online/de/drills/visual-tracking/infinity-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Liegende Acht Augentraining – Achter-Schleifen-Blickübung",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Kostenloses interaktives Augentraining entlang der Bernoullischen Lemniskate zur Optimierung der binokularen Koordination und stufenlosen Blickführung.",
  "url": "https://skilldrills.online/de/drills/visual-tracking/infinity-pursuit",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online/de" },
  "inLanguage": "de",
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Liegende Acht Augentraining – Achter-Schleifen-Blickübung & Binokulare Koordination | SkillDrills",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas-fähiger Webbrowser (Chrome, Edge, Firefox, Safari)",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "url": "https://skilldrills.online/de/drills/visual-tracking/infinity-pursuit",
  "inLanguage": "de",
  "dateModified": "2026-09-15"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Liegende Acht Augentraining – Achter-Schleifen-Blickübung",
  "url": "https://skilldrills.online/de/drills/visual-tracking/infinity-pursuit",
  "description": "Präzises Eye-Tracking-Spiel: Verfolge ein kontinuierlich entlang der Bernoullischen Lemniskate kreisendes Ziel mit reiner Augenmotorik ohne Kopfbewegung.",
  "genre": ["Action", "Brain Game", "Eye Tracking", "Vision Training"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Anleitung zum Liegende-Acht-Augentraining (Lemniskaten-Blickführung)",
  "description": "Vierstufiges klinisches Vorgehen zur Steigerung der binokularen Koordination und fovealen Fixationsstabilität auf der Unendlichkeitsschleife.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Sitzabstand einnehmen und Kopfhaltung fixieren",
      "text": "Positioniere dich etwa 50 bis 70 cm frontal vor dem Bildschirm. Halte den Kopf absolut ruhig und richte den Blick zentriert aus, um jegliche zervikale Mitbewegung zu unterbinden.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/infinity-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Sitzungsdauer und Geschwindigkeitsstufe wählen",
      "text": "Wähle eine Übungszeit (30 bis 120 Sekunden) und einen Geschwindigkeitsmultiplikator (0,5x bis 9,0x). Beginne bei 1,0x, um die stufenlose Blickfolge sicherzustellen.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/infinity-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Kontinuierliche foveale Zentrierung auf der Achter-Schleife",
      "text": "Fixiere das kreisende Ziel exakt im Zentrum der Fovea. Verfolge die Krümmung beider Schlaufen und gleite ruckfrei durch den zentralen Kreuzungspunkt (visuelle Mittellinie).",
      "url": "https://skilldrills.online/de/drills/visual-tracking/infinity-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Sakkadenrate analysieren und Belastung adaptieren",
      "text": "Prüfe nach Abschluss der Runde deinen Tracking-Gain und die Gleichmäßigkeit der Augenführung. Erhöhe das Tempo schrittweise um 0,2x, sobald der Kreuzungspunkt ohne Blicksprünge gemeistert wird.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/infinity-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was bewirkt das Augentraining mit der liegenden Acht (Achter-Schleife)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die liegende Acht (Bernoullische Lemniskate ∞) ist eine kontinuierliche, geschlossene Bewegungsschleife, die stufenlose Augenfolgebewegungen (Smooth Pursuit) in horizontaler, vertikaler und diagonaler Richtung erzwingt. Durch die stetige Kurvenbahn werden alle sechs äußeren Augenmuskelpaare harmonisch aktiviert, ohne dass abrupte Stopps die neuronale Steuerung unterbrechen."
      }
    },
    {
      "@type": "Question",
      "name": "Warum ist die Bernoullische Lemniskate effektiver als einfache Kreise oder Linien?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Geradlinige Bewegungen besitzen an den Umkehrpunkten abrupte Geschwindigkeitsstillstände, während Kreisbahnen stereotyp in eine einzige Richtung rotieren. Die Lemniskate hingegen wechselt kontinuierlich zwischen Rechts- und Linksdrehung, variiert stetig ihren Krümmungsradius und zwingt die Augen, die vertikale Körpermittellinie diagonal zu kreuzen. Dies fordert die zerebelläre Vorsteuerung und die interhemisphärische Koordination ungleich intensiver."
      }
    },
    {
      "@type": "Question",
      "name": "Was versteht man unter dem „Überschreiten der Mittellinie“ und warum ist es oft fehleranfällig?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wenn der Blick die vertikale Gesichtsfeldmitte überquert, wechselt die primäre Verarbeitung der visuellen Reize von einer Großhirnhälfte zur anderen. Bei unzureichend synchronisierter Reizübertragung über das Corpus Callosum kommt es im Kreuzungspunkt zu einer winzigen okulomotorischen Verzögerung. Das Auge verliert das Ziel kurzzeitig und gleicht den Rückstand mit einem ruckartigen Korrektursprung (Aufholsakkade) aus, was durch gezieltes Training eliminiert wird."
      }
    },
    {
      "@type": "Question",
      "name": "Welche äußeren Augenmuskeln werden bei der liegenden Acht gezielt trainiert?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Es werden alle sechs Muskeln beansprucht: die horizontalen Musculi rectus medialis und lateralis, die vertikalen Musculi rectus superior und inferior sowie die schrägen Muskeln Musculus obliquus superior und inferior. Insbesondere in den diagonalen Kurvenpassagen und im Zentrum müssen Schräg- und Geradmuskeln in mikroskopischer Feinabstimmung zusammenwirken."
      }
    },
    {
      "@type": "Question",
      "name": "Welchen konkreten Vorteil bringt die liegende Acht für das Aiming in FPS-Games?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In Shootern wie Apex Legends, Overwatch oder Call of Duty bewegen sich Kontrahenten selten linear, sondern springen, rutschen und strafen in geschwungenen Bögen. Wer den Blick nicht stufenlos führen kann, erleidet ständige Mikrosakkaden, wodurch das Fadenkreuz zittert und Schüsse das Ziel verfehlen. Die Lemniskaten-Übung trainiert einen stabilen Pursuit-Gain von nahezu 1,0, sodass das Fadenkreuz auch bei komplexen Ausweichkurven magnetisch auf dem Ziel haftet."
      }
    },
    {
      "@type": "Question",
      "name": "Verbessert diese Übung auch die Leseflüssigkeit und kognitive Verarbeitung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Flüssiges Lesen und visuelles Scannen basieren auf präziser Koordination beider Augen beim Zeilensprung und bei Richtungswechseln. Wenn das Überschreiten der Mittellinie reibungslos funktioniert, sinkt die Neigung zu Zeilenverrutschern, Wortverdopplungen und vorzeitiger visueller Ermüdung bei Bildschirmarbeit spürbar."
      }
    },
    {
      "@type": "Question",
      "name": "Wie kann ich verhindern, dass sich mein Kopf während des Trainings mitdreht?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Kopfbewegung ist eine intuitive Ausgleichsstrategie des Nervensystems, um die Beanspruchung der Augenmuskeln zu dämpfen. Um reine Augenbewegungen zu isolieren, stütze dein Kinn locker auf deinen Daumen oder Zeigefinger auf. Achte darauf, dass Hals und Nacken vollständig entspannt bleiben und ausschließlich die Augäpfel in ihren Augenhöhlen rotieren."
      }
    },
    {
      "@type": "Question",
      "name": "Wie oft und wie lange sollte das Liegende-Acht-Training durchgeführt werden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Zwei bis drei Durchgänge von jeweils 60 bis 90 Sekunden pro Tag sind optimal. Da die Augenmuskeln hochsensibel reagieren, führt ein zu langes Üben schnell zu Ermüdungszuständen. Halte nach jeder Sitzung eine kurze Pause ein und blicke für mindestens 20 Sekunden in die Ferne (20-20-20-Regel), um die Akkommodation zu entspannen."
      }
    },
    {
      "@type": "Question",
      "name": "Welcher Bildschirmabstand und welche Displaygröße sind empfehlenswert?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein normaler Arbeitsabstand von 50 bis 70 cm ist ideal. Die Schlaufengröße auf dem Bildschirm sollte ein horizontales Blickfeld von etwa 30 bis 40 Grad abdecken. So werden die äußeren Augenmuskeln bis in ihre physiologische Enddehnung gefordert, ohne dass Überlastungen auftreten."
      }
    },
    {
      "@type": "Question",
      "name": "Was sollte ich tun, wenn ich während der Übung Augenbrennen oder Schwindel bemerke?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Leichtes Ziehen in den Muskeln ist vergleichbar mit einem leichten Muskelkater bei ungewohnten Bewegungsmustern. Bei Schwindelgefühlen brich die Übung bitte sofort ab, schließe die Augen und atme ruhig durch. Beginne bei der nächsten Einheit mit einer reduzierten Geschwindigkeit von 0,6x oder 0,8x und steigere die Intensität erst nach einigen Tagen behutsam."
      }
    }
  ]
};

const guideProps = {
  heading: "Liegende Acht Augentraining: Okulomotorische Normwerte und Neurophysiologie",
  intro: [
    "Die von Jakob Bernoulli 1694 mathematisch formulierte Lemniskate (Bernoullische Schleife) stellt eine stetig gekrümmte Bahn dar, auf der sich Orientierung und Radialbeschleunigung kontinuierlich umkehren. Für das menschliche okulomotorische System stellt das exakte visuelle Abfahren dieser Kontur eine biomechanische Meisterleistung dar: Die horizontalen Musculi rectus medialis und lateralis, die vertikalen Musculi rectus superior und inferior sowie die rotatorischen Musculi obliquus superior und inferior müssen ihre Zugkräfte fortwährend synchron modulieren (Robinson, 1965). Die kortikalen Areale MT/MST (V5) berechnen die stetig rotierenden Geschwindigkeitsvektoren und leiten diese über das frontale Augenfeld (FEF) und die pontinen Kerne an den Flocculus und Paraflocculus des Kleinhirns weiter, um den fovealen Schlupf (Retinal Slip) auf nahezu null zu minimieren (Leigh & Zee, 2015).",
    "Der biomechanisch und kognitiv kritischste Punkt der Achter-Schleife liegt im zentralen Knotenpunkt, an dem die Blickbahn die vertikale Körper- und Gesichtsfeldmittellinie kreuzt. Beim Übergang von der linken in die rechte Hemisphäre wechselt die neuronale Repräsentation der Fovealsignale schlagartig zwischen den beiden Großhirnhälften. Dieser Informationsaustausch erfordert eine hochpräzise Übertragung über das Corpus Callosum (Leigh & Zee, 2015). Bestehen hier minimale Latenzen, bricht die stufenlose Augenfolgebewegung (Smooth Pursuit) für Sekundenbruchteile ein: Das Auge gerät in Rückstand und führt eine ruckartige Ausgleichsbewegung (Korrektursakkade bzw. Catch-up Saccade) aus. Durch gezieltes Lemniskaten-Training wird dieser interhemisphärische Transfer konditioniert, wodurch Blicksprünge und Sehachsenblockaden an der Mittellinie dauerhaft beseitigt werden.",
    "Anders als bei kreisförmigen Blickübungen mit konstanter Winkelgeschwindigkeit verändert die Bernoullische Lemniskate ihren Krümmungsradius dynamisch: Während an den Scheitelpunkten der Außenschlaufen starke Richtungswechsel stattfinden, beschleunigt das Ziel im Übergangsbereich zum Zentrum. Um dieser Bahn ruckfrei zu folgen, reicht eine rein reaktive Feedback-Steuerung nicht aus, da die neuronale Signallaufzeit von der Netzhaut zu den Augenmuskeln rund 100 bis 130 Millisekunden beträgt. Das Kleinhirn muss stattdessen ein internes Vorwärtsmodell etablieren, das die Bahnkrümmung vorausschauend antizipiert und die Innervation der Augenmuskeln prädiktiv skaliert (Barnes, 2008). Regelmäßiges Üben synchronisiert diese internen Modelle und garantiert eine lückenlose foveale Zentrierung selbst bei höheren Geschwindigkeiten (Krauzlis, 2004).",
    "In der modernen Sport- und Neurovision gilt das Verfolgen der liegenden Acht als Goldstandard zur Diagnostik und Steigerung der binokularen Koordination. Im professionellen E-Sport (insbesondere in schnellen FPS-Titeln) ermöglicht die verfeinerte Lemniskaten-Folgebewegung das ruckfreie Nachführen des Fadenkreuzes bei diagonalen Sprüngen oder komplexen gegnerischen Ausweichmanövern. Im schulischen und beruflichen Alltag verhindert eine harmonische Mittellinienkreuzung das Verrutschen in Textzeilen und steigert die Lesegeschwindigkeit. Darüber hinaus wirkt die allumfassende Beanspruchung aller Augenmuskeln der starren Nahbereichsfixierung moderner Bildschirmarbeit entgegen: Sie fördert die Durchblutung des okulären Gewebes, löst Verspannungen der Ziliarmuskulatur und lindert visuelle Erschöpfungssymptome nachhaltig (Woods et al., 2015)."
  ],
  benchmarks: {
    title: "Liegende Acht Performance-Metriken (Lemniscate Pursuit Benchmarks)",
    headers: ["Leistungsstufe", "Pursuit-Gain (Blickfolge-Verhältnis)", "Mittellinien-Sakkadenrate", "Bahntreue-Effizienz (Trajectory)", "Neurophysiologisches Niveau"],
    rows: [
      ["Elite (Profi-Athleten & E-Sport)", "0,96 – 1,02", "< 2% (nahezu perfekt stufenlos)", "98%+", "Vollkommene Muskelkoordination. Keine Sakkaden an der Mittellinie; internes Kleinhirnmodell perfekt synchronisiert"],
      ["Fortgeschritten (Wettkampf-Level)", "0,90 – 0,95", "2% – 5%", "92% – 97%", "Hervorragende Blickfolgestabilität. Minimale Phasenverzögerung nur an extremen Scheitelpunkten; sichere Fovea-Arretierung"],
      ["Kompetent (Gesunde Erwachsene)", "0,80 – 0,89", "6% – 12%", "82% – 91%", "Solide Alltagsfähigkeit. Gelegentliche Korrektursakkaden beim Kreuzen des Zentrums oder am äußeren Scheitel"],
      ["Aufbauend (Erhöhte Latenz / Ermüdung)", "0,68 – 0,79", "13% – 22%", "70% – 81%", "Deutliche Nachlaufverzögerung. Wiederholte Blicksprünge, Anzeichen muskulärer Dysbalance oder zervikaler Mitbewegung"],
      ["Basis / Förderbedarf (Sehstress)", "< 0,68", "> 22%", "< 70%", "Stufenlose Verfolgung bricht ab. Häufige unwillkürliche Kopfdrehungen; Grundlagentraining für Binokularsehen und Augenmuskeln ratsam"]
    ],
    note: "※ Die Referenzwerte basieren auf okulomotorischen Messreihen bei 50–70 cm Bildschirmdistanz und Geschwindigkeiten von 1,0x bis 2,0x über 60 Sekunden Testdauer. Der Pursuit-Gain errechnet sich aus der Winkelgeschwindigkeit des Auges geteilt durch die Winkelgeschwindigkeit des Ziels (Idealwert = 1,0)."
  },
  techniques: {
    title: "Vier essenzielle Techniken für stufenlose Blickführung auf der Achter-Schleife",
    items: [
      {
        name: "Zervikale Ruhigstellung & reine okulomotorische Isolation (Cervical Stabilization)",
        desc: "Lege zwei Finger sanft an deine Kinnspitze, um jede minimale Kopfdrehung sensorisch sofort zu registrieren. Halte Hals- und Nackenmuskulatur vollkommen entspannt und bewege ausschließlich deine Augen in den Augenhöhlen. Nur so wird der vestibulookuläre Reflex (VOR) entkoppelt und die kortikale Blickmotorik direkt trainiert.",
        tips: "Atme ruhig und gleichmäßig in den Bauch, um ein unbewusstes Anspannen der Nackenmuskeln zu verhindern."
      },
      {
        name: "Antizipative Geschwindigkeitsanpassung am zentralen Knotenpunkt (Midline Modulation)",
        desc: "Vor dem Durchqueren der Schnittstelle im Zentrum beschleunigt das Ziel physikalisch bedingt. Um ein 'Überfahren' oder Abreißen des Blicks zu verhindern, richte deine foveale Aufmerksamkeit etwa 50 Millisekunden vor Eintreffen minimal in Bewegungsrichtung vor das Ziel. Dies gleicht die Leitungszeit über das Corpus Callosum aktiv aus.",
        tips: "Fixiere den Kreuzungspunkt nicht starr, sondern lasse den Blick elastisch hindurchgleiten."
      },
      {
        name: "Vollständiges Ausfahren der äußeren Scheitelradien (Full Radial Extension)",
        desc: "An den Wendepunkten der beiden Schlaufen neigt das Sehsystem dazu, die Kurve unbewusst nach innen 'abzuschneiden'. Zwinge deine Augen, das Ziel bis zum maximalen Außenpunkt zu fixieren. Dadurch werden die Musculi obliqui bis an ihre anatomische Dehngrenze gefordert.",
        tips: "Widerstehe dem Drang, vorzeitig zur Gegenkurve zu springen; nimm die gesamte Kurvenbreite mit."
      },
      {
        name: "Geschwindigkeitsleiter & 20-20-20-Regenerationszyklus (Velocity Ladder Protocol)",
        desc: "Absolviere zunächst fehlerfreie 60-Sekunden-Runden auf 1,0x ohne jegliche Sakkadensprünge. Steigere das Tempo erst dann in 0,2x-Schritten. Blicke nach jeder Einheit für 20 Sekunden auf ein mindestens 6 Meter entferntes Objekt, um die Ziliarmuskeln zu detonisieren.",
        tips: "Sobald deine Augen tränen oder brennen, lege eine Pause ein und blinzle mehrmals bewusst."
      }
    ]
  },
  steps: [
    "Positioniere dich etwa 50 bis 70 cm frontal vor dem Bildschirm und halte den Kopf absolut ruhig.",
    "Wähle eine Übungszeit (30 bis 120 Sekunden) und einen Geschwindigkeitsmultiplikator (0,5x bis 9,0x).",
    "Fixiere das kreisende Ziel exakt im Zentrum der Fovea und folge der doppelten Schleifenbahn.",
    "Gleite stufenlos durch den zentralen Kreuzungspunkt (Mittellinie), ohne den Blick ruckartig springen zu lassen.",
    "Prüfe nach Abschluss deinen Tracking-Gain und steigere die Geschwindigkeit schrittweise um 0,2x."
  ],
  audience: "E-Sportler (FPS-Shooter), Ballsportler (Tennis, Tischtennis, Badminton), Personen mit hoher Bildschirmarbeitszeit sowie alle, die visuelle Ermüdung und Sehachsenblockaden abbauen möchten.",
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('robinson1965', 'leigh2015', 'barnes2008', 'krauzlis2004', 'woods2015'),
  related: [
    { href: "/de/drills/visual-tracking/constant-slow-pursuit", label: "Glatte Augenfolgebewegung (Constant Slow)" },
    { href: "/de/drills/visual-tracking/directional-chaos-pursuit", label: "Chaotische Blickverfolgung (Directional Chaos)" },
    { href: "/de/drills/visual-tracking/dynamic-evasion-pursuit", label: "Reaktives Tracking Training (Dynamic Evasion)" },
    { href: "/de/drills/visual-tracking/ghosting-suppress-pursuit", label: "Fixationsstabilität Sehtraining (Ghosting Suppress)" },
    { href: "/de/drills/visual-tracking/sine-wave-pursuit", label: "Sinuswellen-Tracking (Sine Wave)" },
    { href: "/de/drills/visual-tracking/predictive-pursuit", label: "Prädiktives Tracking (Predictive)" }
  ]
};

export default function GermanInfinityPursuitPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <InfinityPursuitClient
        copy={{
          title: "Liegende Acht Augentraining: Achter-Schleifen-Blickübung und Binokulare Koordination",
          subtitle: "Glatte Augenfolgebewegungen und interhemisphärische Mittellinienkreuzung auf der Bernoullischen Lemniskate",
          description: "Wissenschaftliches Augentraining entlang der Bernoullischen Lemniskate (liegende Acht). Koordiniert alle sechs äußeren Augenmuskeln (Mm. recti und obliqui) in stufenlosen Blickfolgebewegungen (Smooth Pursuit) und schult die binokulare Koordination beim Überschreiten der visuellen Körpermittellinie ohne sakkadische Störimpulse (Robinson, 1965; Leigh & Zee, 2015). Kostenlos im Browser."
        }}
      />

      <DrillGuide guide={guideProps} />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/de/drills/visual-tracking/infinity-pursuit" />
      </div>
    </>
  );
}
