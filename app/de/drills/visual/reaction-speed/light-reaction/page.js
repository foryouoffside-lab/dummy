import StrobeLatencyClient from '@/app/drills/visual/reaction-speed/light-reaction/StrobeLatencyClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Lichtreaktionstest: Visuelle Reaktionszeit | SkillDrills",
  description: "Kostenloser Lichtreaktionstest online: Messe deine visuelle Reaktionszeit in Millisekunden und trainiere optomotorische Reflexe ohne Registrierung.",
  keywords: [
    "lichtreaktion test",
    "Lichtreaktionstest",
    "reaktionsgeschwindigkeit test",
    "visueller reflextest",
    "einfache reaktionszeit test",
    "strobe reaktionszeit",
    "reaktionszeit messen millisekunden",
    "optischer reflextest",
    "fototransduktion auge reaktion",
    "pieron gesetz reaktionszeit",
    "reaktionszeittest kostenlos",
    "visuelles training online"
  ],
  openGraph: {
    title: "Lichtreaktionstest: Visuelle Reaktionszeit | SkillDrills",
    description: "Messe deine einfache visuelle Reaktionszeit (SRT) in Millisekunden auf optische Strobe-Blitze. Präzise neuromuskuläre Latenzdiagnostik.",
    type: 'article',
    url: 'https://skilldrills.online/de/drills/visual/reaction-speed/light-reaction',
    siteName: 'SkillDrills',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Lichtreaktionstest: Visuelle Reaktionszeit | SkillDrills",
    description: "Kostenloser Lichtreaktionstest zur Messung der optomotorischen Reaktionslatenz auf Strobe-Blitze in Millisekunden.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/visual/reaction-speed/light-reaction',
    languages: getAlternateLanguages('/drills/visual/reaction-speed/light-reaction'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://skilldrills.online/de" },
    { "@type": "ListItem", "position": 2, "name": "Trainingskatalog", "item": "https://skilldrills.online/de/drills" },
    { "@type": "ListItem", "position": 3, "name": "Visuelles Training", "item": "https://skilldrills.online/de/drills/visual" },
    { "@type": "ListItem", "position": 4, "name": "Reaktionsschnelligkeit", "item": "https://skilldrills.online/de/drills/visual/reaction-speed" },
    { "@type": "ListItem", "position": 5, "name": "Lichtreaktionstest", "item": "https://skilldrills.online/de/drills/visual/reaction-speed/light-reaction" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Lichtreaktionstest (Visuelle Reaktionszeit)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/de/drills/visual/reaction-speed/light-reaction",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "description": "Hochpräziser optischer Reaktionstest zur Bestimmung der einfachen visuellen Reaktionszeit (SRT) und neuromuskulären Signalübertragungszeit.",
  "featureList": [
    "Millisekundengenaue Latenzerfassung via browserinterner performance.now() API",
    "Zufallsgesteuerte inter-stimulare Verzögerungsintervalle (300 ms bis 2.500 ms)",
    "Anti-Spam-Heuristik zur Unterbindung von spekulativem Klick-Antizipieren",
    "Vollständig lokale Speicherung der Bestzeiten ohne Server-Tracking"
  ],
  "dateModified": "2026-09-05"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Lichtreaktionstest — Visuelle Reflexzeit Online | SkillDrills",
  "alternateName": "Light Reaction Pro",
  "url": "https://skilldrills.online/de/drills/visual/reaction-speed/light-reaction",
  "dateModified": "2026-09-05",
  "description": "Kostenloser visueller Reaktionstest: Klicke blitzschnell bei Aufleuchten des weißen Strobe-Signals im Zentrum des Bildschirms.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas-fähiger Browser.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Einfache visuelle Reaktionszeit, optomotorische Latenz, neuromuskuläre Reflexgeschwindigkeit, Piéron-Gesetz"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Lichtreaktions-Reflextest",
  "url": "https://skilldrills.online/de/drills/visual/reaction-speed/light-reaction",
  "description": "Interaktives Reaktionsspiel zur Steigerung der visuellen Impulsreaktion auf Lichtblitze.",
  "genre": ["Action", "Reaction Speed", "Reflex Game"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "So führst du den Lichtreaktionstest durch",
  "dateModified": "2026-09-05",
  "description": "Schritt-für-Schritt-Anleitung zur Bestimmung und Schulung der einfachen visuellen Reaktionszeit im optischen Strobe-Paradigma.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Blickpunkt auf das Zentrum fixieren",
      "text": "Richte deine Augen ruhig auf den dunklen Zielkreis in der Mitte des Canvas aus und vermeide Muskelanspannung.",
      "url": "https://skilldrills.online/de/drills/visual/reaction-speed/light-reaction#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Auf den unvorhersehbaren Lichtblitz warten",
      "text": "Warte geduldig das zufällige Intervall zwischen 300 ms und 2.500 ms ab, ohne voreilig zu spekulieren.",
      "url": "https://skilldrills.online/de/drills/visual/reaction-speed/light-reaction#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Blitzschnell beim ersten Photonenimpuls klicken",
      "text": "Klicke oder drücke die Leertaste in dem Moment, in dem der Kreis schneeweiß aufblitzt (+150 Pkt. × Combo × Level).",
      "url": "https://skilldrills.online/de/drills/visual/reaction-speed/light-reaction#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Spekulatives Spam-Klicken vermeiden",
      "text": "Ein Klick vor dem Aufblitzen löst eine 1,2-sekündige Abklingzeit aus, um genuine neuromuskuläre Reaktionen zu sichern.",
      "url": "https://skilldrills.online/de/drills/visual/reaction-speed/light-reaction#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-05",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was ist der Lichtreaktionstest und was misst er?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der Lichtreaktionstest ist ein hochpräzises Verfahren zur Erfassung der einfachen visuellen Reaktionszeit (Simple Reaction Time, SRT). Er misst die exakte Latenzzeit in Millisekunden vom Aufblitzen eines optischen Reizes bis zum Auslösen des motorischen Tastendrucks."
      }
    },
    {
      "@type": "Question",
      "name": "Was gilt als normale visuelle Reaktionszeit in Millisekunden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bei gesunden jungen Erwachsenen liegt die einfache visuelle Reaktionszeit im Mittel zwischen 200 ms und 250 ms. Trainierte E-Sportler, Sprinter und Kampfsportler erreichen regelmäßig Latenzen von 160 ms bis 190 ms."
      }
    },
    {
      "@type": "Question",
      "name": "Welche physiologischen Schritte laufen zwischen Lichtreiz und Klick ab?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Reaktionskette umfasst vier Phasen: (1) retinale Fototransduktion (~20–40 ms), (2) afferente Übertragung über Sehnerv und Thalamus zum primären visuellen Kortex V1 (~30–50 ms), (3) motorische Handlungsinitiierung im Kortex (~50–80 ms), und (4) efferente Übertragung via Pyramidenbahn zur Fingermuskulatur (~30–50 ms)."
      }
    },
    {
      "@type": "Question",
      "name": "Was besagt das Piéron-Gesetz über Lichtstärke und Reaktionszeit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Das Piéron-Gesetz (Piéron, 1952; Pins & Bonnet, 1996) besagt, dass die Reaktionszeit hyperbolisch abnimmt, je stärker die Leuchtdichte des Reizes den Hintergrundkontrast übersteigt. Ein harter weißer Blitz erzeugt maximale retinale Entladungsfrequenz."
      }
    },
    {
      "@type": "Question",
      "name": "Warum ist die akustische Reaktion schneller als die visuelle?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Akustische Reaktionszeiten sind 30 bis 50 ms schneller (140–160 ms gegenüber 200–250 ms). Die mechanische Transduktion in der Cochlea dauert nur 1–3 ms, während die fotochemische Umwandlung in der Netzhaut 20–40 ms beansprucht."
      }
    },
    {
      "@type": "Question",
      "name": "Kann die einfache visuelle Reaktionszeit trainiert werden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Gezieltes Reaktionstraining steigert die neuronale Erregbarkeit der Pyramidenbahn und optimiert die verdeckte räumliche Aufmerksamkeit (Posner, 1980). E-Sportler reagieren signifikant schneller als Nicht-Spieler (Dye et al., 2009)."
      }
    },
    {
      "@type": "Question",
      "name": "Welchen Einfluss hat die Monitor-Bildwiederholrate auf das Ergebnis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein 60-Hz-Monitor verursacht bis zu 16,7 ms Bildverzögerung, während ein 240-Hz-Bildschirm diesen Puffer auf 4,1 ms reduziert. In Kombination mit einer 1000-Hz-Gaming-Maus (~1 ms Polling) wird die technische Latenz minimiert."
      }
    },
    {
      "@type": "Question",
      "name": "Was löst die Anti-Spam-Abkühlphase in diesem Drill aus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wer vor dem Blitz klickt oder mehr als 3 Mal pro Sekunde ungezielt tippt, aktiviert die automatische Sperre für 1,2 Sekunden. Dies verhindert spekulatives Raten und erzwingt authentische Reflexe."
      }
    },
    {
      "@type": "Question",
      "name": "Wie beeinflussen Schlaf, Koffein und Müdigkeit die Reaktionszeit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Schlafmangel und mentale Ermüdung verschlechtern die Latenz um 30 ms bis 80 ms. Moderater Koffeinkonsum (100–200 mg) blockiert Adenosin-Rezeptoren und kann die einfache visuelle Reaktionszeit temporär um 10 bis 20 ms beschleunigen."
      }
    },
    {
      "@type": "Question",
      "name": "Ist dieser Lichtreaktionstest kostenlos und datenschutzsicher?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Der Test auf SkillDrills ist zu 100 % kostenlos, ohne Benutzerkonto oder Bezahlung nutzbar. Alle gemessenen Reaktionszeiten und Bestwerte verbleiben rein lokal in deinem Browser."
      }
    }
  ]
};

const lightReactionGuide = {
  heading: "Neurowissenschaftliche Standards der visuellen Reaktionszeit & Chronometrie",
  intro: [
    "Die einfache visuelle Reaktionszeit (Simple Reaction Time, SRT) definiert das elementare psychomotorische Zeitintervall zwischen dem plötzlichen Auftreten eines einzelnen optischen Reizes und der Auslösung einer unkonditionierten motorischen Bewegung. In der Leichtathletik, im Motorsport, in Kampfsportarten und im professionellen E-Sport bestimmen Millisekunden über Ausweichen, Startblockablösung und erfolgreichen Konter.",
    "Die neuromuskuläre Kaskade umfasst vier distinkte physiologische Phasen: (1) retinale Fototransduktion (~20–40 ms für Rhodopsin-Isomerisierung), (2) afferente Weiterleitung über die Sehbahn zum primären visuellen Kortex V1 (~30–50 ms), (3) kortikale Wahrnehmungs- und Bewegungsvorbereitung im motorischen Kortex (~50–80 ms), und (4) efferente Weiterleitung über die Pyramidenbahn zur Fingermuskulatur (~30–50 ms), was den typischen gesunden Standardbereich von 200–250 ms begründet (Kosinski, 2008; Jain et al., 2015; Shelton & Kumar, 2010).",
    "Gemäß dem Piéron-Gesetz (Piéron, 1952; Pins & Bonnet, 1996) verkürzt sich die Reaktionszeit als hyperbolische Funktion der Stimulus-Leuchtdichte über den Hintergrundkontrast. Dieser Drill maximiert den Effekt durch einen schneeweißen Strobe-Blitz vor tiefschwarzem Hintergrund, um die maximale Ganglienzellen-Depolarisation zu erzeugen. Erkenntnisse zur räumlichen Aufmerksamkeit (Posner, 1980) und E-Sport-Reaktionsstudien (Dye et al., 2009) belegen die Trainierbarkeit dieses Systems.",
    "Messmethodik & Hardware-Standardisierung: Alle Reize und Tastenfreigaben werden hochpräzise mit der browserinternen performance.now() API erfasst. Hardware-Latenzen durch Monitor-Quantisierung und USB-Abtastung werden nach Woods et al. (2015) berücksichtigt, während alle Daten ausschließlich lokal auf dem Endgerät gespeichert werden."
  ],
  benchmarks: {
    title: "Normative Leistungsklassen der einfachen visuellen Reaktionszeit (SRT)",
    headers: ["Leistungsklasse", "Mittlere Latenzzeit (ms)", "Score- & Combo-Schwelle", "Neuromuskuläres & Reflex-Profil"],
    rows: [
      ["Tier 1: Spitzenklasse / Apex-Reflex", "< 180 ms", "15.000+ Punkte | Combo 28x+", "Außergewöhnliche kortikospinale Erregbarkeit und minimale synaptische Verzögerung; typisch für E-Sport-Profis und olympische Sprinter."],
      ["Tier 2: Überdurchschnittlich / Superior", "180 – 219 ms", "10.500 – 14.999 Punkte | Combo 18x+", "Exzellente optomotorische Kopplung; gleichmäßige sub-220ms Latenzen mit minimaler Streuung über lange Sitzungen."],
      ["Tier 3: Solider Standard / Baseline", "220 – 259 ms", "6.000 – 10.499 Punkte | Combo 10x+", "Gesunder Erwachsenen-Standard; typische unvorbereitete motorische Antwort mit leichter Varianz bei Ermüdung."],
      ["Tier 4: Moderate Verzögerung", "260 – 319 ms", "2.500 – 5.999 Punkte | Combo 5x+", "Verlängerte zentrale Signalverarbeitung; anfällig für Monitor-Latenz, Augenmüdigkeit oder Konzentrationsschwankungen."],
      ["Tier 5: Verlängerte Latenz (Basis)", "> 320 ms", "< 2.500 Punkte | Combo < 5x", "Deutliche sensorische Verzögerung; unkalibrierte Hardware, 60-Hz-Display-Latenzen oder starke kognitive Ermüdung."]
    ],
    note: "Diese Richtwerte basieren auf klassischer Chronometrie und Reaktionspsychophysik (Kosinski, 2008; Woods et al., 2015; Pins & Bonnet, 1996; Jain et al., 2015). Ergebnisse variieren je nach Tageszeit, Koffein und Bildschirmlatenz."
  },
  techniques: {
    title: "Methoden zur Steigerung der visuellen Reaktionsschnelligkeit",
    items: [
      {
        name: "Foveale Voraktivierung & Blickverankerung",
        desc: "Das starre Fixieren der Fovea centralis auf das Zentrum eliminiert den 20–30 ms Zeitverlust für verdeckte Aufmerksamkeitssprünge (Posner, 1980).",
        tips: "Halte deinen Blick unbeweglich auf den dunklen Zielkreis gerichtet und lass die Augen nicht zu HUD-Elementen abschweifen."
      },
      {
        name: "Piéron-Kontrastoptimierung & Fotorezeptor-Priming",
        desc: "Maximaler Kontrast erzeugt die höchste retinale Entladungsfrequenz und verkürzt die Übertragungszeit (Pins & Bonnet, 1996).",
        tips: "Dunkle das Zimmer leicht ab, sodass sich deine Pupillen weiten und der weiße Blitz einen maximalen Kontrastimpuls auslöst."
      },
      {
        name: "Isometrische Fingervorspannung",
        desc: "Mechanischer Tastenhub und Entprellzeit addieren unnötige Verzögerungen, wenn die Finger über der Taste schweben (Woods et al., 2015).",
        tips: "Lege die Fingerkuppe mit leichter, entspannter Vorspannung direkt auf den Mausschalter, um ohne Leerweg auszulösen."
      },
      {
        name: "Hardware-Optimierung für minimale Verzögerung",
        desc: "Ein 60-Hz-Monitor fügt bis zu 16,7 ms Anzeigeverzug hinzu, während 240-Hz-Displays diesen auf 4,1 ms drücken (Woods et al., 2015).",
        tips: "Nutze einen Monitor mit 144 Hz oder 240 Hz sowie eine Gaming-Maus mit 1000 Hz Abtastrate für reaktionsgetreue Erfassung."
      }
    ]
  },
  steps: [
    "Klicke auf Drill Starten, um die 45-Sekunden-Lichtreaktions-Sitzung zu aktivieren.",
    "Fixiere deinen Blick ruhig auf den dunklen Kreis in der Mitte des Bildschirms.",
    "Warte geduldig die zufällige Verzögerung ab (300 ms bis 2.500 ms), ohne voreilig zu raten.",
    "Klicke sofort bei Aufleuchten des weißen Strobe-Signals (+150 Pkt. × Multiplikator).",
    "Analysiere nach Rundenende deine mittlere Reaktionszeit, den erreichten Level und die Bewertungsstufe."
  ],
  audience: "E-Sportler (FPS, MOBAs), Sprinter, Kampfsportler, Motorsportler, Piloten und alle Personen, die ihre optomotorische Reaktionszeit verbessern wollen.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('woods2015', 'kosinski2008', 'pins1996', 'posner1980', 'jain2015', 'dye2009'),
  related: [
    { href: "/de/drills/visual/reaction-speed/go/no-go", label: "Go / No-Go Impulskontrolle" },
    { href: "/de/drills/visual/depth-perception/distance-judgment", label: "Tiefenwahrnehmung & Distanzurteil" },
    { href: "/de/drills/visual/tracking-accuracy/moving-target", label: "Bewegungsziel-Interzeption" },
    { href: "/de/drills/visual/tracking-accuracy/multiple-targets", label: "Multi-Objekt-Tracking" },
    { href: "/de/drills/visual/tracking-accuracy/pursuit-tracker", label: "Kontinuierlicher Blickfolge-Tracker" },
    { href: "/de/drills/visual/visual-recognition/entropic-grid", label: "Entropisches Gitter-Suchspiel" }
  ]
};

export default function StrobeLatencyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <StrobeLatencyClient copy={{ title: "Lichtreaktionstest: Visuelle Reaktionszeit" }} />
      <DrillGuide guide={lightReactionGuide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/de/drills/visual/reaction-speed/light-reaction" />
      </div>
    </>
  );
}
