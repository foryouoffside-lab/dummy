import GhostingSuppressPursuitClient from '@/app/drills/visual-tracking/ghosting-suppress-pursuit/GhostingSuppressPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// GERMAN SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "fixationsstabilitaet sehtraining" / "bewegungsunschaerfe unterdrueckung"
// Secondary:    "blickstabilisation training", "foveale fixierung uebungen", "visuelle nachbilder reduzieren"
// LSI / Domain:  "augentraining blickstabilisation", "mikrosakkaden fixationsstabilitaet", "esport blickfixierung",
//               "retinaler schlupf", "distraktorunterdrueckung", "foveale zentrierung", "dynamische sehschaerfe"
// Authentic Domain Terms: Fixationsstabilität, Bewegungsunschärfe-Unterdrückung (Motion Smear Suppression), Mikrosakkaden (Microsaccades), Foveale Fixierung, Retinaler Schlupf (Retinal Slip), Glatte Augenfolgebewegung (Smooth Pursuit), VOR-Unterdrückung
// ============================================================

export const metadata = {
  title: "Fixationsstabilität Sehtraining – Ghosting | SkillDrills",
  description: "Kostenloses Sehtraining zur Unterdrückung von Bewegungsunschärfe: Trainiere foveale Fixationsstabilität und Mikrosakkaden-Präzision auf dynamische Ziele.",
  keywords: [
    "fixationsstabilitaet sehtraining",
    "bewegungsunschaerfe unterdrueckung",
    "blickstabilisation training",
    "foveale fixierung uebungen",
    "visuelle nachbilder reduzieren",
    "augentraining blickstabilisation",
    "mikrosakkaden fixationsstabilitaet",
    "esport blickfixierung",
    "retinaler schlupf",
    "distraktorunterdrueckung",
    "foveale zentrierung",
    "dynamische sehschaerfe"
  ],
  openGraph: {
    title: "Fixationsstabilität Sehtraining – Ghosting | SkillDrills",
    description: "Wissenschaftliches Sehtraining zur aktiven Unterdrückung von Bewegungsunschärfe und visuellen Nachbildern. Trainieren Sie die foveale Fixationsstabilität und Mikrosakkaden-Präzision auf dynamische Ziele.",
    type: "website",
    url: "https://skilldrills.online/de/drills/visual-tracking/ghosting-suppress-pursuit",
    siteName: "SkillDrills",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fixationsstabilität Sehtraining – Ghosting | SkillDrills",
    description: "Kostenloses Online-Training zur Ausblendung von Bewegungsunschärfe und Maximierung der fovealen Fixationsstabilität.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/de/drills/visual-tracking/ghosting-suppress-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/ghosting-suppress-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://skilldrills.online/de" },
    { "@type": "ListItem", "position": 2, "name": "Übungen", "item": "https://skilldrills.online/de/drills" },
    { "@type": "ListItem", "position": 3, "name": "Blickverfolgung & Sehtraining", "item": "https://skilldrills.online/de/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "Fixationsstabilität (Ghosting Suppress)", "item": "https://skilldrills.online/de/drills/visual-tracking/ghosting-suppress-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Fixationsstabilität Sehtraining – Bewegungsunschärfe-Unterdrückung (Ghosting Suppress Pursuit)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/de/drills/visual-tracking/ghosting-suppress-pursuit",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Kostenloses browserbasiertes Trainingsmodul zur Schulung fovealer Fixationsstabilität und Mikrosakkaden-Kontrolle unter störenden visuellen Nachbildern und Bewegungsunschärfe.",
  "featureList": [
    "Simulation dynamischer Nachbild-Artefakte und Ghosting-Ringe in Echtzeit",
    "Stufenlose Geschwindigkeitsregulierung von 0.5x bis 9.0x mit Bandenabprall-Kinematik",
    "Konfigurierbare Zielgrößen, Glow-Effekte und CRT-Scanlines für realistische Störreize",
    "Vollständige clientseitige Datenverarbeitung ohne externe Serverkommunikation"
  ],
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Fixationsstabilität Sehtraining – Ghosting-Unterdrückung Online Trainer | SkillDrills",
  "alternateName": "Ghosting Suppress Pursuit Germany",
  "url": "https://skilldrills.online/de/drills/visual-tracking/ghosting-suppress-pursuit",
  "dateModified": "2026-09-15",
  "description": "Wissenschaftlich fundierter Online-Trainer zur Bündelung der fovealen Sehschärfe. Trainiert die aktive kortikale Unterdrückung nachziehender Bildartefakte bei dynamischer Zielverfolgung.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Moderner Webbrowser mit Unterstützung für HTML5 Canvas",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Fixationsstabilität, Bewegungsunschärfe-Unterdrückung, Mikrosakkaden, Foveale Fixierung, Visuelle Reizfilterung"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Fixationsstabilität Sehtraining – Bewegungsunschärfe-Unterdrückung (Ghosting Suppress Pursuit)",
  "url": "https://skilldrills.online/de/drills/visual-tracking/ghosting-suppress-pursuit",
  "description": "Kostenloses interaktives Sehtraining-Spiel. Verfolgen Sie bewegte Ziele trotz irritierender Nachbilder und trainieren Sie Ihre foveale Fixationsschärfe.",
  "genre": ["Eye Tracking", "Visual Training", "Aim Trainer"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Anleitung für das Training zur Ghosting- und Bewegungsunschärfe-Unterdrückung",
  "dateModified": "2026-09-15",
  "description": "Schritt-für-Schritt-Anleitung zur optimalen Durchführung des Fixationsstabilitäts- und Nachbildunterdrückungstrainings.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Geschwindigkeit und Trainingsdauer festlegen",
      "text": "Wählen Sie zu Beginn eine moderate Geschwindigkeit (1.0x) und eine Dauer von 60 Sekunden, um den Zielkern inmitten der Nachbilder zu isolieren.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/ghosting-suppress-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Kopf fixieren und Blick auf dem Zielkern verankern",
      "text": "Halten Sie 50 bis 70 cm Abstand zum Display. Stabilisieren Sie Kopf und Nacken vollständig und fokussieren Sie ausschließlich das helle Zentrum des Reizes.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/ghosting-suppress-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Aktive kognitive Ausblendung der nachziehenden Schleier",
      "text": "Lassen Sie sich nicht von den hinterherziehenden Geisterringen ablenken, sondern blenden Sie diese bewusst als Hintergrundrauschen aus.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/ghosting-suppress-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Foveale Nachjustierung bei Richtungswechseln an den Rändern",
      "text": "Prallt das Ziel an den Bildschirmrändern ab, halten Sie die Fovea durch minimale Sakkaden direkt auf dem Zielkern zentriert.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/ghosting-suppress-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-15",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was ist das Training zur Ghosting-Unterdrückung (Ghosting Suppress Pursuit)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ghosting Suppress Pursuit ist ein spezialisiertes okulomotorisches Trainingsmodul, bei dem ein Stimulus verfolgt werden muss, der von dynamischen Nachbildern (Ghosting) und Bewegungsunschärfe begleitet wird. Das Modul trainiert das Sehzentrum darauf, diese Störartefakte kortikal zu filtern und den Blick unverrückbar auf dem Kern des Reizes zu fixieren (Burr, 1980; Martinez-Conde et al., 2004)."
      }
    },
    {
      "@type": "Question",
      "name": "Was versteht man unter biologischer Bewegungsunschärfe (Motion Smear)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Photorezeptoren der Netzhaut besitzen eine physikalisch bedingte Abklingzeit von mehreren Millisekunden. Wenn sich Objekte schnell bewegen, entsteht dadurch ein nachziehender Schweif (Motion Smear). Wird dieser nicht aktiv unterdrückt, führt dies zu massiven Fehleinschätzungen der tatsächlichen Zielposition."
      }
    },
    {
      "@type": "Question",
      "name": "Wie unterdrückt das menschliche Gehirn nachziehende Bewegungsunschärfe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Im frühen visuellen Kortex (V1/MT) existiert ein aktiver neuronaler Hemmungsmechanismus (temporale Maskierung), der nachziehende Helligkeitssignale entlang der Bewegungsachse gezielt abschwächt (Burr, 1980). Diese Übung stimuliert und schärft diese kortikale Filterfunktion."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Funktion erfüllen Mikrosakkaden bei der Verfolgung dynamischer Objekte?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mikrosakkaden sind winzige, unwillkürliche Blicksprünge (1–3 Mal pro Sekunde), die selbst bei starrer Fixation auftreten. Sie regenerieren die Netzhautrezeptoren, verhindern das Verblassen von Zielstrukturen (Troxler-Effekt) und korrigieren mikroskopische Fixationsdrifts in Millisekunden (Martinez-Conde et al., 2004; Rolfs, 2009)."
      }
    },
    {
      "@type": "Question",
      "name": "Wie unterscheidet sich dieses Modul vom klassischen Slow Pursuit Training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Während Constant Slow Pursuit auf die gleichmäßige Steuerung glatter Augenfolgebewegungen entlang klarer Lissajous-Bahnen abzielt, fügt Ghosting Suppress Pursuit künstliche visuelle Störringe hinzu. Es schult spezifisch die Distraktor-Unterdrückung und die Widerstandskraft gegen optische Irritationen."
      }
    },
    {
      "@type": "Question",
      "name": "Welchen praktischen Vorteil bringt dieses Training für Shooter-Gamer (FPS)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In Titeln wie Apex Legends, CS2 oder Overwatch 2 ist das Bild voll von Mündungsfeuer, Rauchgranaten, Partikeleffekten und schnellen Kamerabewegungen. Gamer mit geschulter Fixationsstabilität lassen sich nicht von visuellen Nebengeräuschen ablenken und halten das Fadenkreuz stabil auf dem gegnerischen Hitbox-Zentrum (Yang et al., 2025)."
      }
    },
    {
      "@type": "Question",
      "name": "Verbessert die Übung die Reaktionsfähigkeit bei schnellen Ballsportarten?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Bei stark rotierenden Tennis- oder Tischtennisbällen oder schnellen Täuschungen im Fußball hilft eine stabile foveale Fixierung, trotz der Bewegungsunschärfe scharfe Kanteninformationen wahrzunehmen und den optimalen Treffpunkt präzise zu antizipieren (Appelbaum & Erickson, 2018)."
      }
    },
    {
      "@type": "Question",
      "name": "Warum muss der Kopf während des Tests vollkommen ruhig gehalten werden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Jede Kopfbewegung aktiviert reflektorisch den vestibulookulären Reflex (VOR). Um jedoch die kortikalen Zentren und die feinen motorischen Einheiten der äußeren Augenmuskeln isoliert zu beanspruchen, muss der Kopf absolut stabilisiert bleiben (Leigh & Zee, 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Wie beeinflussen Panel-Reaktionszeit (GtG) und Bildwiederholfrequenz das visuelle Ghosting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Träge LCD-Monitore erzeugen physische Schlieren, die die biologische Fixationsmessung verfälschen. Ein schneller Gaming-Monitor mit Fast-IPS oder OLED und 144 Hz+ reduziert diese Hardwareartefakte auf ein Minimum, sodass reine neuronale Leistungen gemessen werden (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Welches tägliche Trainingspensum ist optimal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wir empfehlen 5 bis 8 Durchgänge à 60 Sekunden mit jeweils 30 Sekunden Pause dazwischen (Gesamtdauer ca. 5 bis 10 Minuten). Da das Ausblenden visueller Reize hohe Konzentration erfordert, sichern kurze, regelmäßige Einheiten den besten Trainingseffekt ohne Augenermüdung."
      }
    }
  ]
};

const guideProps = {
  heading: "Neurowissenschaftliche Grundlagen der Bewegungsunschärfe-Unterdrückung & Fixationsstabilität",
  intro: [
    "Das Training zur Unterdrückung von Bewegungsunschärfe (Ghosting Suppress Pursuit) zielt auf die kortikale Fähigkeit ab, retinale Nachbilder und optische Verwischungen (Motion Smear) aktiv zu filtern, um eine stabile foveale Fixation (Foveal Fixation) auf dynamische Zielobjekte zu gewährleisten. Wenn Stimuli das Gesichtsfeld queren, erzeugen Verzögerungen in den Photorezeptoren zwangsläufig visuelle Schweife, deren Unterdrückung eine wesentliche Voraussetzung für präzise Bewegungswahrnehmung ist (Burr, 1980).",
    "Kortikale Hemmungsmechanismen und die Rolle von Mikrosakkaden: Überschreitet ein Reiz eine Winkelgeschwindigkeit von etwa 30°/s, entsteht retinaler Schlupf, der nachziehende Nachbilder hinterlässt (Krauzlis, 2004). Im primären visuellen Kortex (V1/MT) greifen temporale Hemmprozesse, die diese Spuren abschwächen und das Auge davor bewahren, nach hinten gezogen zu werden (Burr, 1980). Gleichzeitig führen Mikrosakkaden (1–3 pro Sekunde) winzige Korrekturen durch, die das Verblassen von Bildinformationen (Troxler-Effekt) verhindern und die foveale Sehschärfe im Zentrum des Reizes zementieren (Martinez-Conde, Macknik, & Hubel, 2004; Rolfs, 2009).",
    "Relevanz für professionellen eSport und Hochgeschwindigkeits-Ballsport: In modernen Ego-Shootern ist das Display permanent von Mündungsfeuer, Rauchschwaden, Granateneffekten und schnellen Kameradrehungen überlagert (Yang et al., 2025). Auch im Ballsport (z. B. Tennis, Tischtennis, Badminton) rotieren Objekte mit enormem Tempo (Appelbaum & Erickson, 2018). Sportler mit hoher Fixationsstabilität widerstehen diesen Störeinflüssen und halten den visuellen Ankerpunkt ohne Blickzittern auf dem Ziel.",
    "Hardware-Latenzen und methodische Teststandards: Da träge Panel-Reaktionszeiten (GtG) physisches Hardware-Ghosting hervorrufen, sind Monitore mit 144 Hz oder 240 Hz klassischen 60-Hz-Displays bei diesem Training deutlich überlegen (Woods et al., 2015). Ein stabiler Sitzabstand von 50–70 cm und ein absolut fixierter Kopf stellen sicher, dass vestibuläre Kompensationsreflexe (VOR) ausgeschaltet bleiben und die feinen Augenmuskeln isoliert trainiert werden (Leigh & Zee, 2015). Alle Leistungsdaten werden ausschließlich verschlüsselt im lokalen Browser-Speicher abgelegt."
  ],
  benchmarks: {
    title: "Leistungsstandards für Fixationsstabilität & Ghosting-Unterdrückung (Redaktioneller Leitfaden)",
    headers: ["Leistungsstufe", "Ziel-Geschwindigkeit (Speed Multiplier)", "Fixationsstabilität unter visuellen Nachbildern", "Okulomotorisches & Neuronales Profil"],
    rows: [
      ["Stufe 1: Apex Fixation – Absolute Blickruhe", "Ab 2.0x Ultra-Speed", "Blick bleibt selbst bei dichten Ghosting-Ringen und abrupten Wandabprallern unverrückbar auf dem Zielkern verankert.", "Perfekte kortikale Bewegungsunschärfe-Unterdrückung und Mikrosakkaden-Präzision. Profi-Niveau in eSport und Reaktionssport."],
      ["Stufe 2: Exzellente Fixationsschärfe", "1.4x – 1.9x High-Speed", "Zielkontur wird auch bei hoher Geschwindigkeit scharf separiert; minimale Ablenkung durch nachziehende Schleppspuren.", "Hervorragende sensomotorische Filterung der äußeren Augenmuskeln. Hohe Treffergenauigkeit in partikelintensiven FPS-Situationen."],
      ["Stufe 3: Solider Leistungsstandard", "1.0x – 1.3x Standardbereich", "Gleichmäßige Verfolgung des Ziels; bei schnellen Richtungsänderungen oder dichten Ringen tritt ein kurzes Blickzögern auf.", "Normaler Leistungsbereich gesunder Erwachsener. Ausreichend für Freizeitsport und alltägliches Gaming."],
      ["Stufe 4: Blickdrift – Trainingsbedarf", "0.7x – 0.9x Niedrigbereich", "Blick lässt sich wiederholt von den nachziehenden Ringen nach hinten ablenken; Zielkern rutscht aus der Fovea.", "Verzögerte kortikale Reizunterdrückung. Konzentriertes Training im niedrigen Geschwindigkeitsbereich angeraten."],
      ["Stufe 5: Fixationsverlust – Einsteigerbereich", "Unter 0.7x", "Blick irrt unkoordiniert zwischen Ziel und Nachbildern umher; Ziel wird komplett aus den Augen verloren.", "Grundlagenübung bei fixiertem Kopf und reduzierter Geschwindigkeit erforderlich, um den Fokus auf einen Punkt zu bündeln."]
    ],
    note: "Diese Benchmarks basieren auf neurophysiologischen Studien zur fovealen Fixationskontrolle, Mikrosakkaden-Dynamik und kortikalen Unterdrückung von Bewegungsunschärfe (Burr, 1980; Martinez-Conde et al., 2004; Rolfs, 2009; Krauzlis, 2004)."
  },
  techniques: {
    title: "Vier Kerntechniken zur Maximierung der Fixationsstabilität",
    items: [
      {
        name: "Konsequente foveale Verankerung auf dem leuchtenden Zielkern",
        desc: "Wie Martinez-Conde et al. (2004) nachweisen, stimuliert die Bündelung der Aufmerksamkeit auf den hochkontrastigen Kern die Mikrosakkaden und maximiert die Sehschärfe.",
        tips: "Wandern Sie mit dem Blick nicht auf die äußeren Ringe, sondern fixieren Sie ausschließlich den hellen Mittelpunkt des Zielkreises."
      },
      {
        name: "Aktive neuronale Ausblendung nachziehender Schleppspuren",
        desc: "Burr (1980) zeigt, dass nachziehende Unschärfen kognitiv gedämpft werden können. Betrachten Sie die Schleier bewusst als irrelevantes Hintergrundrauschen.",
        tips: "Lassen Sie das Gehirn die Geisterringe als passive Spur verarbeiten, ohne Ihren Sehstrahl von der Hauptachse abweichen zu lassen."
      },
      {
        name: "Vollständige Kopfruhe zur Ausschaltung des VOR",
        desc: "Laut Leigh & Zee (2015) verhindert das Mitbewegen des Kopfes eine gezielte Beanspruchung der okulomotorischen Mikrobewegungen.",
        tips: "Ziehen Sie das Kinn leicht an, stabilisieren Sie den Nacken und führen Sie die Verfolgung rein aus den Augenmuskeln aus."
      },
      {
        name: "Nutzung schneller Panel-Technologien (OLED / Fast-IPS, 144 Hz+)",
        desc: "Woods et al. (2015) heben hervor, dass nur schlierenfreie Monitore eine unverfälschte biologische Fixationsmessung ermöglichen.",
        tips: "Verwenden Sie Gaming-Monitore mit kurzen Schaltzeiten und sorgen Sie für eine reflexionsfreie Arbeitsplatzbeleuchtung."
      }
    ]
  },
  steps: [
    "Wählen Sie die gewünschte Geschwindigkeit (0.5x bis 2.0x) und starten Sie die 60-Sekunden-Sitzung.",
    "Nehmen Sie eine aufrechte Sitzposition im Abstand von 50 bis 70 cm ein und fixieren Sie Ihren Kopf vollständig.",
    "Bündeln Sie Ihren Blick unverrückbar auf dem leuchtenden Kern des sich bewegenden Reizes.",
    "Blenden Sie nachziehende Ghosting-Ringe aktiv aus und behalten Sie den Fokus auch bei Wandabprallern bei.",
    "Analysieren Sie nach Ablauf der Zeit Ihre Fixationsstabilität und passen Sie das Tempo für die nächste Runde an."
  ],
  audience: "FPS- und eSport-Athleten (Apex Legends, Overwatch 2, CS2, VALORANT), Ballsportler (Tennis, Tischtennis, Badminton, Baseball), sowie alle Personen, die ihre visuelle Fixationsruhe und Blickstabilität unter optischem Rauschen wissenschaftlich steigern möchten.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('burr1980', 'martinezConde2004', 'rolfs2009', 'krauzlis2004', 'leigh2015', 'woods2015'),
  related: [
    { href: "/de/drills/visual-tracking/constant-slow-pursuit", label: "Langsame Augenfolgebewegung (Constant Slow)" },
    { href: "/de/drills/visual-tracking/directional-chaos-pursuit", label: "Chaotische Augenfolgebewegung (Directional Chaos)" },
    { href: "/de/drills/visual-tracking/dynamic-evasion-pursuit", label: "Dynamische Zielausweichung (Dynamic Evasion)" },
    { href: "/de/drills/visual-tracking/sine-wave-pursuit", label: "Sinuswellen-Verfolgungstraining (Sine Wave)" },
    { href: "/de/drills/visual-tracking/infinity-pursuit", label: "Achter-Schleifen-Blickübung (Infinity)" },
    { href: "/de/drills/visual-tracking/predictive-pursuit", label: "Prädiktive Blickverfolgung (Predictive)" }
  ]
};

export default function LocalizedPage() {
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
      <GhostingSuppressPursuitClient
        copy={{
          title: "Fixationsstabilität Sehtraining – Bewegungsunschärfe-Unterdrückung",
          subtitle: "Foveale Fixationsschärfe & Dynamische Ghosting-Unterdrückung",
          description: "Bei der Verfolgung schnell bewegter Objekte entstehen durch retinale Photorezeptor-Nachwirkzeiten und Display-Trägheiten visuelle Nachbilder und Bewegungsunschärfe (Burr, 1980). Dieses Trainingsmodul aktiviert die kortikalen Hemmungsmechanismen im primären visuellen Kortex (V1/MT) sowie Mikrosakkaden, um störende Ghosting-Artefakte auszublenden und den fovealen Blick unverrückbar auf dem Zielzentrum zu verankern (Martinez-Conde et al., 2004; Rolfs, 2009)."
        }}
      />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/de/drills/visual-tracking/ghosting-suppress-pursuit" />
      </div>
    </>
  );
}
