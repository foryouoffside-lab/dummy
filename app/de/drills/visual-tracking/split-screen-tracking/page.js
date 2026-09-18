import SplitScreenTrackingClient from '@/app/drills/visual-tracking/split-screen-tracking/SplitScreenTrackingClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Split-Screen Augentraining – Duales Tracking | SkillDrills",
  description: "Trainieren Sie geteilte Aufmerksamkeit durch simultane Verfolgung zweier orthogonaler Zielobjekte. Bilaterales Blickfolgetraining online. Kostenlos.",
  keywords: [
    "split screen augentraining",
    "geteilte aufmerksamkeit blickverfolgung",
    "bilaterales blickfolgetraining",
    "duale zielverfolgung auge",
    "peripheres blickfeld trennung",
    "tunnelblick abbauen uebungen",
    "multiple object tracking drill",
    "esports minimap blickfuehrung",
    "visuelle aufmerksamkeit teilen",
    "hemisphaerenunabhaengige blickmotorik",
    "bilaterale visuelle aufmerksamkeit",
    "duales blickverfolgungstraining"
  ],
  alternates: {
    canonical: "https://skilldrills.online/de/drills/visual-tracking/split-screen-tracking",
    languages: getAlternateLanguages("/drills/visual-tracking/split-screen-tracking"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Split-Screen Augentraining – Duales Tracking | SkillDrills",
    description: "Trainieren Sie geteilte Aufmerksamkeit durch simultane Verfolgung zweier orthogonaler Zielobjekte. Bilaterales Blickfolgetraining online. Kostenlos.",
    url: "https://skilldrills.online/de/drills/visual-tracking/split-screen-tracking",
    siteName: "SkillDrills",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Split-Screen Augentraining – Duales Tracking | SkillDrills",
    description: "Trainieren Sie geteilte Aufmerksamkeit durch simultane Verfolgung zweier orthogonaler Zielobjekte. Bilaterales Blickfolgetraining online. Kostenlos.",
  },
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
      "name": "Blickverfolgung & Augentraining",
      "item": "https://skilldrills.online/de/drills/visual-tracking"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Split-Screen Augentraining",
      "item": "https://skilldrills.online/de/drills/visual-tracking/split-screen-tracking"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Split-Screen Augentraining – Geteilte Aufmerksamkeit",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Trainieren Sie geteilte Aufmerksamkeit durch gleichzeitige Verfolgung zweier orthogonaler Zielobjekte im geteilten Sichtfeld. Bilaterales Blickfolgetraining online.",
  "url": "https://skilldrills.online/de/drills/visual-tracking/split-screen-tracking",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online"
  },
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Split-Screen Augentraining – Geteilte Aufmerksamkeit",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas und JavaScript-fähiger moderner Webbrowser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/de/drills/visual-tracking/split-screen-tracking",
  "dateModified": "2026-09-15"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Split-Screen Augentraining – Geteilte Aufmerksamkeit",
  "url": "https://skilldrills.online/de/drills/visual-tracking/split-screen-tracking",
  "description": "Trainieren Sie geteilte Aufmerksamkeit durch gleichzeitige Verfolgung zweier orthogonaler Zielobjekte im geteilten Sichtfeld. Bilaterales Blickfolgetraining online.",
  "genre": [
    "Action",
    "Gehirntraining",
    "Visuelles Training"
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

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Anleitung für das Split-Screen Augentraining",
  "description": "Schritt-für-Schritt-Anleitung zur gleichzeitigen Erfassung zweier orthogonal bewegter Reize zur Maximierung der bilateralen visuellen Aufmerksamkeit.",
  "dateModified": "2026-09-15",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Parameter der Trainingseinheit festlegen",
      "text": "Wählen Sie die Sitzungsdauer (30 bis 120 Sekunden), den Grundgeschwindigkeits-Multiplikator und die Zielgröße. Aktivieren Sie bei Bedarf die Linienausblendung (Hide Line).",
      "url": "https://skilldrills.online/de/drills/visual-tracking/split-screen-tracking#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Zentralen Blickanker auf der Trennlinie setzen",
      "text": "Positionieren Sie Ihren Kopf gerade vor dem Bildschirm und fixieren Sie entspannt die zentrale Trennlinie zwischen dem vertikalen und dem horizontalen Bewegungsfeld.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/split-screen-tracking#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Orthogonale Vektoren über verdeckte Aufmerksamkeit erfassen",
      "text": "Vermeiden Sie hektische Blicksprünge (Sakkaden) zwischen den Zielen. Halten Sie den zentralen Fokus und weiten Sie die verdeckte Aufmerksamkeit (Covert Attention) bimodal nach links und rechts aus.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/split-screen-tracking#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Bilaterale Symmetrie analysieren und steigern",
      "text": "Prüfen Sie nach Ablauf der Zeit, ob Sie eine Seite bevorzugt haben (Hemisphären-Bias), und erhöhen Sie die Geschwindigkeit schrittweise für eine breitere Aufmerksamkeitsspanne.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/split-screen-tracking#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was ist das Split-Screen Augentraining (Split-Screen Tracking)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Es ist ein interaktives okulomotorisches Trainingsprogramm zur Konditionierung geteilter visueller Aufmerksamkeit (Divided Attention). Auf einem geteilten Bildschirm oszilliert links ein Ziel vertikal und rechts ein Ziel horizontal. Der Proband fixiert die Mitte und trainiert, beide unabhängigen Bewegungsbahnen über beide visuelle Hemifelder hinweg simultan wahrzunehmen."
      }
    },
    {
      "@type": "Question",
      "name": "Kann das menschliche Auge physisch zwei Objekte gleichzeitig scharf sehen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nein. Die Fovea centralis – der Bereich des schärfsten Sehens – umfasst nur 1 bis 2 Grad des Gesichtsfelds. Man kann physisch immer nur einen Punkt scharf foveieren. Jedoch bewiesen Pylyshyn & Storm (1988) mit dem Multiple Object Tracking (MOT) und Cavanagh & Alvarez (2005) mit dem multifokalen Aufmerksamkeitsmodell, dass das Gehirn mithilfe visueller Zeiger (FINSTs) mehrere Ziele im peripheren Sichtfeld parallel überwachen kann."
      }
    },
    {
      "@type": "Question",
      "name": "Ist es besser, schnell hin- und herzugucken oder die Mitte zu fixieren?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Fixierung der Mitte in Verbindung mit bimodal ausgeweiteter verdeckter Aufmerksamkeit (Covert Attention) ist weitaus effektiver. Jeder Blicksprung (Sakkade) benötigt 20 bis 50 ms und löst eine sakkadische Suppression aus – ein kurzes neuronales Ausblenden visueller Reize während der Augenbewegung. Dies führt zu Datenverlust und Ziel-Neuakquisitionsverzögerungen."
      }
    },
    {
      "@type": "Question",
      "name": "Was versteht man unter dem bilateralen Hemifeld-Vorteil (Bilateral Hemifield Advantage)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Untersuchungen von Alvarez & Cavanagh (2005) zeigten, dass Aufmerksamkeitsressourcen für visuelle Verfolgung hemisphärenspezifisch aufgeteilt sind. Ein Ziel im linken Gesichtsfeld (verarbeitet von der rechten Gehirnhälfte) und ein Ziel im rechten Gesichtsfeld (verarbeitet von der linken Gehirnhälfte) konkurrieren kaum um neurale Kapazitäten, wodurch Verfolgungsgeschwindigkeit und Genauigkeit deutlich höher sind als bei zwei Zielen im selben Hemifeld."
      }
    },
    {
      "@type": "Question",
      "name": "Warum bewegen sich die Ziele orthogonal (vertikal vs. horizontal)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wenn sich zwei Objekte parallel in dieselbe Richtung bewegen, fasst das Gehirn sie nach dem Gestaltgesetz des gemeinsamen Schicksals zu einem einzigen übergeordneten Objekt zusammen. Durch die orthogonale Bewegungsachse (links Y-Achse, rechts X-Achse) wird diese sensorische Gruppierung verhindert, und der visuelle Kortex muss zwei getrennte Bewegungsgleichungen parallel lösen."
      }
    },
    {
      "@type": "Question",
      "name": "Welche konkreten Vorteile bringt dieses Training im E-Sport und in FPS-Spielen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In Shootern wie CS2, Valorant oder Apex Legends müssen Spieler ihr Fadenkreuz präzise zentrieren (zentrales Foveieren) und gleichzeitig Minimap, Kill-Feed, Munitionsanzeige und periphere Gegnerbewegungen überwachen (Green & Bavelier, 2006). Dieses Training verhindert Tunnelblick und ermöglicht die Informationsaufnahme aus dem peripheren Sichtfeld ohne Einbußen bei der Fadenkreuzdisziplin."
      }
    },
    {
      "@type": "Question",
      "name": "Warum verliere ich fast immer dasselbe Ziel aus den Augen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nahezu jeder Mensch besitzt eine Okulardominanz (Führungsauge) und eine Hemisphärendominanz. Wer das rechte Ziel häufiger verliert, teilt der linken Gehirnhälfte zu wenig Aufmerksamkeit zu, und umgekehrt. Durch bewusstes Nachjustieren und Fokussieren auf die schwächere Seite lässt sich eine ausgewogene bilaterale Aufmerksamkeitsverteilung trainieren."
      }
    },
    {
      "@type": "Question",
      "name": "Welchen Trainingseffekt hat das Deaktivieren der Hilfslinie (Hide Line)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ohne die grafische Führungslinie fehlen externe geometrische Anhaltspunkte. Der parietale Kortex muss nun auf Basis von Momentangeschwindigkeit und letzter Position ein rein internes prädiktives Vorwärtsmodell der Flugbahn berechnen, was die visuelle Vorstellungskraft und das räumliche Arbeitsgedächtnis intensiv stärkt."
      }
    },
    {
      "@type": "Question",
      "name": "Wie sieht die ideale tägliche Trainingsroutine aus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wir empfehlen 2 bis 3 Durchgänge à 60 Sekunden, insgesamt etwa 5 Minuten täglich. Da geteilte Aufmerksamkeit eine extrem hohe kognitive Last für das frontoparietale Netzwerk darstellt, führen kurze Einheiten mit maximaler Konzentration zu deutlich schnellerer synaptischer Plastizität als übermüdetes Dauertraining."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Rolle spielt die Bildwiederholfrequenz (144Hz+) des Monitors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bei 144Hz (6,9 ms Frame-Intervall) oder 240Hz (4,2 ms) werden beide orthogonalen Ziele mit minimalem Bewegungsunschärfe- und Quantisierungsfehler dargestellt (Woods et al., 2015). Dies eliminiert hardwarebedingte Ruckler und stellt sicher, dass das Gehirn saubere biologische Bewegungssignale verarbeitet."
      }
    }
  ]
};

const guide = {
  heading: "Split-Screen Augentraining & Geteilte Aufmerksamkeit: Bilaterale orthogonale Blickverfolgung",
  intro: [
    "Das menschliche Sehsystem ist durch eine extrem schmale Fovea centralis limitiert, deren hochauflösender Bereich lediglich einen Sehwinkel von 1 bis 2 Grad abdeckt. Bewegen sich zwei Reize simultan auf räumlich getrennten Bahnen, ist es optisch unmöglich, beide Ziele zeitgleich scharf zu foveieren. Das Sehsystem steht vor der neurobiologischen Entscheidung: Entweder springt der Blick mittels rascher Sakkaden permanent hin und her, oder der Betrachter fixiert einen zentralen Punkt und weitet seine verdeckte Aufmerksamkeit (Covert Spatial Attention) bimodal über das gesamte periphere Sichtfeld aus.",
    "Die bahnbrechende Arbeit von Pylyshyn & Storm (1988) zum Multiple Object Tracking (MOT) demonstrierte, dass das menschliche Gehirn über visuelle Zeigermechanismen (FINSTs – Visual Indices) verfügt, mit denen mehrere unabhängige Objekte parallel verfolgt werden können, ohne dass ein serielles Abtasten nötig ist. Darüber hinaus wiesen Alvarez & Cavanagh (2005) nach, dass die Ressourcen für visuelle Zielverfolgung auf die beiden Großhirnhälften aufgeteilt sind: Ein Ziel im linken Gesichtsfeld (rechte Hemisphäre) und eines im rechten Gesichtsfeld (linke Hemisphäre) führen zu einem messbaren 'bilateralen Hemifeld-Vorteil', da keine neuronale Ressourcenüberlastung innerhalb eines einzelnen Hemifeldes auftritt.",
    "Blicksprünge zwischen zwei entfernten Zielpunkten verursachen erhebliche neuro-optische Kosten. Jede Sakkade beansprucht 20 bis 50 Millisekunden und löst das Phänomen der sakkadischen Suppression aus – eine temporäre Absenkung der visuellen Wahrnehmungsschwelle, während derer wichtige Reizveränderungen übersehen werden. Ein stabiler zentraler Blickanker in Kombination mit multifokaler Aufmerksamkeit (Awh & Pashler, 2000; Cavanagh & Alvarez, 2005) ermöglicht hingegen eine unterbrechungsfreie parallele Erfassung beider Vektoren. Wie Green & Bavelier (2006) belegten, lässt sich diese Fähigkeit durch gezieltes Training im Computerumfeld signifikant plastisch ausbauen.",
    "Das vorliegende Split-Screen Augentraining koppelt eine vertikale Oszillation auf der linken Seite mit einer horizontalen Oszillation auf der rechten Seite. Diese orthogonale Ausrichtung verhindert eine sensorische Gestalt-Gruppierung ('Gemeinsames Schicksal') und zwingt das visuelle System zur parallelen Berechnung zweier unabhängiger Bewegungsgleichungen. Unter Berücksichtigung von Anzeigelatenzen (60 Hz vs. 144 Hz) und Eingabepolling-Raten (Woods et al., 2015) bietet dieser Drill eine fundierte Plattform für Athleten und E-Sportler. Sämtliche Leistungsdaten verbleiben sicher in Ihrem lokalen Browserspeicher."
  ],
  benchmarks: {
    title: "Bewertungsstandards für geteilte Aufmerksamkeit & bilaterale Blickverfolgung",
    headers: ["Leistungsstufe", "Geschwindigkeit", "Blickanker-Stabilität", "Hemisphären-Symmetrie", "Populationsanteil"],
    rows: [
      ["Elite / Voll adaptiert (Elite)", "3,5x bis 5,0x+", "Absolut stabiler zentraler Anker, 0 Sakkaden", "Fehlerraten-Differenz < 3% (perfekt bimodal)", "Top 1,5%"],
      ["Master / Fortgeschrittene Teilung (Master)", "2,5x bis 3,5x", "Sehr stabiler Anker, minimale Mikrosakkaden", "Fehlerraten-Differenz < 7% (stabile Erfassung)", "Top 8%"],
      ["Advanced / Wettkampfniveau (Advanced)", "1,8x bis 2,5x", "Weitgehend zentral, Blicksprünge bei Tempo-Peaks", "Fehlerraten-Differenz < 12% (leichte Dominanz)", "Top 25%"],
      ["Intermediate / Grundstufe (Intermediate)", "1,2x bis 1,8x", "Häufige unwillkürliche Blicksprünge zur Seite", "Spürbare Verzögerung auf einer Seite (15-25%)", "Mittlere 45%"],
      ["Novice / Untrainiert (Novice)", "0,5x bis 1,2x", "Hektisches Hin- und Herspringen der Augen", "Regelmäßiger Totalverlust eines Ziels (> 25%)", "Einstiegsbereich"]
    ],
    note: "Die Richtwerte basieren auf den MOT-Geschwindigkeitsmodellen von Pylyshyn & Storm (1988) sowie den Hemifeld-Aufmerksamkeitsmetriken von Alvarez & Cavanagh (2005)."
  },
  techniques: [
    {
      title: "Zentraler Blickanker und Weitung der verdeckten Aufmerksamkeit",
      description: "Sobald der Blick direkt auf eines der beiden Ziele gerichtet wird, verschwindet das andere im peripheren Sehbereich. Fixieren Sie die imaginäre vertikale Trennlinie in der Bildschirmmitte mit einem 'weichen Blick' (Soft Focus) und weiten Sie Ihre Aufmerksamkeit bimodal zu den Seiten aus.",
      tips: [
        "Fokussieren Sie entspannt auf den Raum kurz vor dem Bildschirm, um die Augenmuskeln zu entkrampfen",
        "Achten Sie nicht auf scharfe Kanten des Zielobjekts, sondern erfassen Sie die Bewegung über die Stäbchenzellen der Peripherie",
        "Führen Sie Ihren Blick sofort zur Mittellinie zurück, sobald Sie bemerken, dass ein Ziel Ihre Fovea anzieht"
      ]
    },
    {
      title: "Kognitive Entkopplung orthogonaler Vektoren (Vertikal vs. Horizontal)",
      description: "Die Y-Achsenbewegung links und die X-Achsenbewegung rechts neigen dazu, im Gehirn zu einem diagonalen Mischvektor zu verschmelzen. Trainieren Sie die parietale getrennte Verarbeitung, indem Sie die unterschiedlichen Wendepunkt-Rhythmen separat wahrnehmen.",
      tips: [
        "Verinnerlichen Sie, dass oberer/unterer Wendepunkt und linker/rechter Wendepunkt asynchron ablaufen",
        "Nutzen Sie die Geschwindigkeitsänderung am Wendepunkt als auditiv-visuellen Taktgeber",
        "Aktivieren Sie die Option 'Hide Line', um ohne optische Führungslinien reine kinematische Prädiktion zu fordern"
      ]
    },
    {
      title: "Kompensation von Führungsauge- und Hemisphären-Präferenzen",
      description: "Rechtshändige und rechtsäugige Menschen neigen dazu, die linke Hirnhälfte (rechtes Gesichtsfeld) zu bevorzugen und das linke Ziel zu vernachlässigen. Kontrollieren Sie in den Session-Ergebnissen Ihre schwächere Seite und gewichten Sie Ihre Aufmerksamkeit bewusst 60:40 zugunsten der benachteiligten Hemisphäre.",
      tips: [
        "Richten Sie Ihre mentale Vorbereitung während des Countdowns auf den schwächeren Zielbereich aus",
        "Verwenden Sie die Wendepunkte des schwächeren Ziels als Signal, um die Position des zweiten Ziels abzugleichen",
        "Halten Sie die Geschwindigkeit moderat, bis beide Ziele mit gleicher Sicherheit im peripheren Feld gehalten werden"
      ]
    },
    {
      title: "Mikrosakkaden-Unterdrückung und Lidschlag-Synchronisation",
      description: "Während eines 60-Sekunden-Durchgangs führen unbedachte Lidschläge zu sofortigem Informationsverlust. Synchronisieren Sie Ihr Blinzeln mit den Momenten, in denen die Ziele ihre Wendepunkte erreichen und die Bewegungsbahn kurzzeitig maximal vorhersehbar ist.",
      tips: [
        "Vermeiden Sie das Blinzeln, wenn die Ziele mit Höchstgeschwindigkeit das Zentrum ihrer Bahn kreuzen",
        "Stellen Sie Raumbeleuchtung und Displayhelligkeit homogen ein, um trockenen Augen vorzubeugen",
        "Atmen Sie gleichmäßig, um motorische Verspannungen im Nacken- und Augenmuskelbereich zu vermeiden"
      ]
    }
  ],
  deviceCalibration: {
    title: "Hardware- und Ergonomie-Standards für bilaterales Tracking",
    points: [
      "Bildwiederholrate: Ein Monitor mit 144 Hz oder höher wird dringend empfohlen. Bei 60 Hz (16,7 ms) entstehen Bewegungsunschärfen, während 144 Hz (6,9 ms) die orthogonale Flugbahn glasklar darstellt.",
      "Sitzabstand und Gesichtsfeldwinkel: Halten Sie einen Abstand von 50 bis 70 cm zum Monitor ein, sodass der Bildschirm ca. 40 bis 50 Grad Ihres horizontalen Sichtfelds einnimmt. Zu nahes Sitzen überfordert das periphere Gesichtsfeld.",
      "Kontrast und Farbwahl: Nutzen Sie den Dark-Mode mit Cyber-Red oder Neon-Blau, um die Kontrastempfindlichkeit der peripheren Netzhaut (insbesondere bei schwachem Umgebungslicht) optimal zu stimulieren.",
      "Körperausrichtung: Stellen Sie sicher, dass die vertikale Bildschirmmitte exakt mit Ihrer Nasen- und Körpermitte fluchtet, um asymmetrische Parallaxenfehler zu vermeiden."
    ]
  },
  faqs: [
    {
      q: "Was ist das Split-Screen Augentraining (Split-Screen Tracking)?",
      a: "Es ist ein interaktives okulomotorisches Trainingsprogramm zur Konditionierung geteilter visueller Aufmerksamkeit (Divided Attention). Auf einem geteilten Bildschirm oszilliert links ein Ziel vertikal und rechts ein Ziel horizontal. Der Proband fixiert die Mitte und trainiert, beide unabhängigen Bewegungsbahnen über beide visuelle Hemifelder hinweg simultan wahrzunehmen."
    },
    {
      q: "Kann das menschliche Auge physisch zwei Objekte gleichzeitig scharf sehen?",
      a: "Nein. Die Fovea centralis – der Bereich des schärfsten Sehens – umfasst nur 1 bis 2 Grad des Gesichtsfelds. Man kann physisch immer nur einen Punkt scharf foveieren. Jedoch bewiesen Pylyshyn & Storm (1988) mit dem Multiple Object Tracking (MOT) und Cavanagh & Alvarez (2005) mit dem multifokalen Aufmerksamkeitsmodell, dass das Gehirn mithilfe visueller Zeiger (FINSTs) mehrere Ziele im peripheren Sichtfeld parallel überwachen kann."
    },
    {
      q: "Ist es besser, schnell hin- und herzugucken oder die Mitte zu fixieren?",
      a: "Die Fixierung der Mitte in Verbindung mit bimodal ausgeweiteter verdeckter Aufmerksamkeit (Covert Attention) ist weitaus effektiver. Jeder Blicksprung (Sakkade) benötigt 20 bis 50 ms und löst eine sakkadische Suppression aus – ein kurzes neuronales Ausblenden visueller Reize während der Augenbewegung. Dies führt zu Datenverlust und Ziel-Neuakquisitionsverzögerungen."
    },
    {
      q: "Was versteht man unter dem bilateralen Hemifeld-Vorteil (Bilateral Hemifield Advantage)?",
      a: "Untersuchungen von Alvarez & Cavanagh (2005) zeigten, dass Aufmerksamkeitsressourcen für visuelle Verfolgung hemisphärenspezifisch aufgeteilt sind. Ein Ziel im linken Gesichtsfeld (verarbeitet von der rechten Gehirnhälfte) und ein Ziel im rechten Gesichtsfeld (verarbeitet von der linken Gehirnhälfte) konkurrieren kaum um neurale Kapazitäten, wodurch Verfolgungsgeschwindigkeit und Genauigkeit deutlich höher sind als bei zwei Zielen im selben Hemifeld."
    },
    {
      q: "Warum bewegen sich die Ziele orthogonal (vertikal vs. horizontal)?",
      a: "Wenn sich zwei Objekte parallel in dieselbe Richtung bewegen, fasst das Gehirn sie nach dem Gestaltgesetz des gemeinsamen Schicksals zu einem einzigen übergeordneten Objekt zusammen. Durch die orthogonale Bewegungsachse (links Y-Achse, rechts X-Achse) wird diese sensorische Gruppierung verhindert, und der visuelle Kortex muss zwei getrennte Bewegungsgleichungen parallel lösen."
    },
    {
      q: "Welche konkreten Vorteile bringt dieses Training im E-Sport und in FPS-Spielen?",
      a: "In Shootern wie CS2, Valorant oder Apex Legends müssen Spieler ihr Fadenkreuz präzise zentrieren (zentrales Foveieren) und gleichzeitig Minimap, Kill-Feed, Munitionsanzeige und periphere Gegnerbewegungen überwachen (Green & Bavelier, 2006). Dieses Training verhindert Tunnelblick und ermöglicht die Informationsaufnahme aus dem peripheren Sichtfeld ohne Einbußen bei der Fadenkreuzdisziplin."
    },
    {
      q: "Warum verliere ich fast immer dasselbe Ziel aus den Augen?",
      a: "Nahezu jeder Mensch besitzt eine Okulardominanz (Führungsauge) und eine Hemisphärendominanz. Wer das rechte Ziel häufiger verliert, teilt der linken Gehirnhälfte zu wenig Aufmerksamkeit zu, und umgekehrt. Durch bewusstes Nachjustieren und Fokussieren auf die schwächere Seite lässt sich eine ausgewogene bilaterale Aufmerksamkeitsverteilung trainieren."
    },
    {
      q: "Welchen Trainingseffekt hat das Deaktivieren der Hilfslinie (Hide Line)?",
      a: "Ohne die grafische Führungslinie fehlen externe geometrische Anhaltspunkte. Der parietale Kortex muss nun auf Basis von Momentangeschwindigkeit und letzter Position ein rein internes prädiktives Vorwärtsmodell der Flugbahn berechnen, was die visuelle Vorstellungskraft und das räumliche Arbeitsgedächtnis intensiv stärkt."
    },
    {
      q: "Wie sieht die ideale tägliche Trainingsroutine aus?",
      a: "Wir empfehlen 2 bis 3 Durchgänge à 60 Sekunden, insgesamt etwa 5 Minuten täglich. Da geteilte Aufmerksamkeit eine extrem hohe kognitive Last für das frontoparietale Netzwerk darstellt, führen kurze Einheiten mit maximaler Konzentration zu deutlich schnellerer synaptischer Plastizität als übermüdetes Dauertraining."
    },
    {
      q: "Welche Rolle spielt die Bildwiederholfrequenz (144Hz+) des Monitors?",
      a: "Bei 144Hz (6,9 ms Frame-Intervall) oder 240Hz (4,2 ms) werden beide orthogonalen Ziele mit minimalem Bewegungsunschärfe- und Quantisierungsfehler dargestellt (Woods et al., 2015). Dies eliminiert hardwarebedingte Ruckler und stellt sicher, dass das Gehirn saubere biologische Bewegungssignale verarbeitet."
    }
  ],
  related: [
    { href: "/de/drills/visual-tracking/peripheral-ping-pursuit", label: "Peripheres Sehen Training" },
    { href: "/de/drills/visual-tracking/spatial-shift-pursuit", label: "Spatial Shift Blickverfolgung" },
    { href: "/de/drills/visual-tracking/predictive-pursuit", label: "Prädiktives Tracking Training" },
    { href: "/de/drills/visual-tracking/directional-chaos-pursuit", label: "Chaotische Blickverfolgung" },
    { href: "/de/drills/visual-tracking/constant-slow-pursuit", label: "Gleichmäßige Blickfolge-Übung" }
  ],
  sources: pickSources('pylyshyn1988', 'alvarez2005', 'awh2000', 'cavanagh2005', 'green2006', 'woods2015'),
};

export default function SplitScreenTrackingDePage() {
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

      <SplitScreenTrackingClient
        copy={{
          title: "Split-Screen Augentraining",
          subtitle: "Geteilte Aufmerksamkeit & Bilaterale Blickverfolgung",
          description: "Konditionieren Sie geteilte visuelle Aufmerksamkeit durch die simultane Verfolgung zweier orthogonal bewegter Zielobjekte auf geteiltem Bildschirm. Erweitern Sie Ihre verdeckte Aufmerksamkeit über beide Gehirnhälften hinweg, vermeiden Sie Tunnelblick und stärken Sie die parallele Bewegungswahrnehmung."
        }}
      />
      <DrillGuide guide={guide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/de/drills/visual-tracking/split-screen-tracking" />
      </div>
    </>
  );
}
