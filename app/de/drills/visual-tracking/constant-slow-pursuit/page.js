import ConstantSlowPursuitClient from '@/app/drills/visual-tracking/constant-slow-pursuit/ConstantSlowPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// GERMAN SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "Augenfolgebewegung Training" / "augenfolgebewegungen uebungen" (High-intent vision training query)
// Secondary:    "blickstabilisation uebungen", "augentraining online"
// LSI / Domain:  "glatte augenfolgebewegung smooth pursuit", "lissajous kurve blickverfolgung",
//               "sakkadenunterdrueckung", "foveale blickfixierung", "visuelles tracking training", "gaming tracking aim"
// Authentic Domain Terms: Glatte Augenfolgebewegungen (Smooth Pursuit / SPEM), Sakkaden (Blicksprünge), Retinaler Schlupf (Retinal Slip), Vestibulookulärer Reflex (VOR), Flocculus & Paraflocculus
// ============================================================

export const metadata = {
  title: 'Augenfolgebewegung Training – Smooth Pursuit | SkillDrills',
  description: 'Kostenloses Augenfolgebewegungs-Training im Browser: Trainiere glatte Augenfolgebewegungen, Fovea-Blickstabilität und minimiere Sakkadensprünge online.',
  keywords: [
    "Augenfolgebewegung Training",
    "augenfolgebewegungen uebungen",
    "blickstabilisation uebungen",
    "augentraining online",
    "visuelles tracking training",
    "smooth pursuit training",
    "glatte augenfolgebewegungen",
    "sakkaden unterdruecken",
    "foveale fixierung",
    "lissajous blickuebung",
    "gaming tracking aim",
    "dynamische sehschaerfe"
  ],
  openGraph: {
    title: 'Augenfolgebewegung Training – Smooth Pursuit | SkillDrills',
    description: 'Kostenloses Augenfolgebewegungs-Training im Browser: Trainiere glatte Augenfolgebewegungen, Fovea-Blickstabilität und minimiere Sakkadensprünge online.',
    type: "website",
    url: "https://skilldrills.online/de/drills/visual-tracking/constant-slow-pursuit",
    siteName: "SkillDrills",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: 'Augenfolgebewegung Training – Smooth Pursuit | SkillDrills',
    description: 'Kostenloses Augenfolgebewegungs-Training im Browser: Trainiere glatte Augenfolgebewegungen, Fovea-Blickstabilität und minimiere Sakkadensprünge online.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/de/drills/visual-tracking/constant-slow-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/constant-slow-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://skilldrills.online/de" },
    { "@type": "ListItem", "position": 2, "name": "Trainingskatalog", "item": "https://skilldrills.online/de/drills" },
    { "@type": "ListItem", "position": 3, "name": "Visuelles Tracking", "item": "https://skilldrills.online/de/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "Augenfolgebewegung Training (Slow Pursuit)", "item": "https://skilldrills.online/de/drills/visual-tracking/constant-slow-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Augenfolgebewegung Training – Visuelle Blickstabilisation (Constant Slow Pursuit)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/de/drills/visual-tracking/constant-slow-pursuit",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Präzises Web-Trainingsprogramm zur Konditionierung glatter Augenfolgebewegungen (Smooth Pursuit) entlang kontinuierlicher Lissajous-Kurven zur Minimierung korrigierender Sakkaden.",
  "featureList": [
    "Ecken- und kantenfreie harmonische Lissajous-Kurventrajektorie für ununterbrochene Verfolgung",
    "Stufenlos einstellbare Geschwindigkeiten von 0,5x bis 9,0x mit optionaler Zufallsbeschleunigung",
    "Individuelle Anpassung von Hilfslinien, Schweif-Effekten und Target-Leuchtstärken",
    "Vollständig lokale Client-Verarbeitung mit absolutem Schutz aller Nutzerdaten"
  ],
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Augenfolgebewegung Training – Smooth Pursuit Online Trainer | SkillDrills",
  "alternateName": "Constant Slow Pursuit Germany",
  "url": "https://skilldrills.online/de/drills/visual-tracking/constant-slow-pursuit",
  "dateModified": "2026-09-15",
  "description": "Kostenloses Online-Augentraining für Sportler und Gamer. Halte den Kopf still und verfolge das Ziel rein okulomotorisch, um die zerebelläre Blickfolgeregelung zu optimieren.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas-fähiger moderner Webbrowser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Glatte Augenfolgebewegungen (SPEM), Foveale Fixationsstabilität, Sakkadenunterdrückung, VOR-Entkopplung, Dynamische Zielverfolgung"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Augenfolgebewegung Training – Visuelle Blickstabilisation (Constant Slow Pursuit)",
  "url": "https://skilldrills.online/de/drills/visual-tracking/constant-slow-pursuit",
  "description": "Kostenloses visuelles Tracking-Trainingsspiel. Verfolge harmonisch oszillierende Ziele rein mit den Augenmuskeln und schärfe deine visuelle Ausdauer.",
  "genre": ["Eye Tracking", "Visual Training", "Reaction Speed"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "So trainierst du glatte Augenfolgebewegungen korrekt",
  "dateModified": "2026-09-15",
  "description": "Praktischer Leitfaden zur Steigerung der fovealen Verfolgungsgenauigkeit und Vermeidung von Blicksprüngen entlang kontinuierlicher Lissajous-Kurven.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Geschwindigkeitsmultiplikator und Dauer festlegen",
      "text": "Wähle für den Einstieg eine moderate Basisgeschwindigkeit (1,0x oder darunter) und stelle die Trainingszeit auf 60 oder 90 Sekunden ein.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/constant-slow-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Ergonomische Kopfruhehaltung einnehmen",
      "text": "Positioniere dich ca. 50 bis 70 cm vor dem Bildschirm und halte den Kopf absolut bewegungslos, um nur die Augenmuskeln arbeiten zu lassen.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/constant-slow-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Foveale Blickfixierung auf das Zentrum des Zielobjekts",
      "text": "Starte die Übung und fixiere beide Augen starr auf den Kern des auf der Lissajous-Bahn gleitenden Ziels.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/constant-slow-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Sakkadische Aufholsprünge unterdrücken und Tempo steigern",
      "text": "Achte darauf, dass die Augenbewegung kontinuierlich gleitet, ohne ruckartig vor- oder zurückzuspringen; erhöhe das Tempo erst bei vollständiger Laufruhe.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/constant-slow-pursuit#step-4"
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
      "name": "Was sind glatte Augenfolgebewegungen (Smooth Pursuit Eye Movements / SPEM)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Glatte Augenfolgebewegungen (Smooth Pursuit Eye Movements / SPEM) sind kontinuierliche, willkürliche Rotationen der Augen, um ein bewegtes Objekt im Zentrum des schärfsten Sehens (der Fovea centralis) zu halten. Im Unterschied zu Sakkaden – extrem schnellen, ballistischen Blicksprüngen zwischen festen Punkten – handelt es sich um eine stufenlose Gleitbewegung, die durch kortikale Geschwindigkeitsberechnungen und die Minimierung des retinalen Schlupfes im Kleinhirn gesteuert wird (Rashbass, 1961; Krauzlis, 2004)."
      }
    },
    {
      "@type": "Question",
      "name": "Warum ist die Verfolgung bei niedriger Geschwindigkeit besonders anspruchsvoll?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wenn sich ein Reiz langsam bewegt, führt bereits die kleinste Abweichung der Blickgeschwindigkeit von der Zielgeschwindigkeit zu einem retinalen Abbildungsfehler. Das Gehirn sieht sich dann gezwungen, abrupte korrigierende Blicksprünge (sogenannte Catch-up-Sakkaden) einzustreuen (Robinson, 1965). Da man bei geringen Geschwindigkeiten nicht auf ballistischen Schwung vertrauen kann, verlangt dies eine permanente zerebelläre Hochverstärkung (High-Gain-Kontrolle)."
      }
    },
    {
      "@type": "Question",
      "name": "Welche biomechanischen Vorteile bietet die Lissajous-Kurventrajektorie?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eine Lissajous-Kurve entsteht durch die Überlagerung zweier aufeinander senkrecht stehender Sinusschwingungen mit unterschiedlichen Frequenzen. Sie verläuft völlig nahtlos und besitzt weder scharfe Ecken noch abrupte Stillstandspunkte. Dadurch ermöglicht sie ein unterbrechungsfreies, multidirektionales Training sämtlicher sechs Augenmuskelpaare in alle Raumachsen."
      }
    },
    {
      "@type": "Question",
      "name": "Wie überträgt sich dieses Augentraining auf E-Sport (Tracking Aim) und Ballsportarten?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In Shootern wie Apex Legends, Overwatch oder Valorant führt ein unruhiger Blick beim Verfolgen strafender Gegner unweigerlich zu Fehlschüssen. Ein stabiler Smooth Pursuit verhindert Bewegungsunschärfe auf der Netzhaut und synchronisiert das Fadenkreuz mit der gegnerischen Bewegung (Yang et al., 2025). In Sportarten wie Tennis, Baseball oder Tischtennis erlaubt die Folgebewegung eine präzise Ballfluganalyse bis zum Treffpunkt (Appelbaum & Erickson, 2018)."
      }
    },
    {
      "@type": "Question",
      "name": "Warum darf der Kopf während des Trackings nicht mitbewegt werden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wird der Kopf mitgedreht, übernehmen die Bogengänge des Innenohrs über den vestibulookulären Reflex (VOR) automatisch die Bildstabilisierung (Leigh & Zee, 2015). Dieser Hirnstamm-Reflex umgeht jedoch die Großhirn- und Kleinhirnbahnen, die für das gezielte Willkür-Tracking (SPEM) zuständig sind. Um die okulomotorischen Muskeln isoliert zu trainieren, muss der Kopf strikt unbeweglich bleiben."
      }
    },
    {
      "@type": "Question",
      "name": "Welches tägliche Trainingsvolumen ist für optimale neuronale Plastizität ratsam?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ideal sind 5 bis 10 Minuten pro Tag, aufgeteilt in 3 bis 5 Durchgänge à 60 bis 90 Sekunden mit kurzen Erholungspausen. Die äußeren Augenmuskeln ermüden bei anhaltender Überanstrengung rasch. Kurze, hochkonzentrierte tägliche Einheiten festigen die synaptische Plastizität im Kleinhirn weitaus effektiver als seltene lange Einheiten."
      }
    },
    {
      "@type": "Question",
      "name": "Was tun bei brennenden oder tränenden Augen während des Trackings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Intensive visuelle Fixation senkt unwillkürlich die Lidschlagfrequenz, wodurch der Tränenfilm auf der Hornhaut aufreißt. Lege sofort eine 30-sekündige Pause ein, blinzle bewusst mehrmals kräftig und blicke aus dem Fenster in die Ferne, um den Ziliarmuskel und die Augenmuskulatur zu entspannen."
      }
    },
    {
      "@type": "Question",
      "name": "Welchen Einfluss hat die Monitor-Bildwiederholfrequenz (60 Hz vs. 144 Hz vs. 240 Hz)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein Standard-60-Hz-Display aktualisiert das Bild nur alle 16,7 ms, was bei kontinuierlichen Bewegungen zu Mikrorucklern führt. Ein 144-Hz- (6,9 ms) oder 240-Hz-Monitor (4,1 ms) liefert einen wesentlich glatteren retinalen Bewegungsvektor, wodurch das okulomotorische System die tatsächliche Geschwindigkeit fehlerfrei berechnen und ruckelfrei verfolgen kann (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Was versteht man unter prädiktiver Blickfolge (Predictive Pursuit)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bei periodisch wiederkehrenden Bewegungsmustern erlernt das Kleinhirn die Bahncharakteristik und generiert vorausschauende Bewegungssignale (Barnes, 2008). Dadurch wird die physiologische sensorische Verarbeitungsverzögerung von ca. 100 ms vollständig kompensiert, sodass das Auge synchron mit dem Ziel gleitet."
      }
    },
    {
      "@type": "Question",
      "name": "Ist dieses Augentraining kostenlos und bleiben meine Leistungsdaten geschützt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Das Augentraining auf SkillDrills ist 100 % kostenlos, erfordert kein Benutzerkonto und blendet keine Werbung ein. Alle Einstellungen, Sitzungszähler und Tracking-Parameter werden ausschließlich im lokalen Speicher deines Webbrowsers (localStorage) abgelegt und niemals an externe Server übertragen."
      }
    }
  ]
};

const guideProps = {
  heading: "Neurologische Grundlagen der glatten Augenfolgebewegung (SPEM) und Blickstabilisation",
  intro: [
    "Glatte Augenfolgebewegungen (Smooth Pursuit Eye Movements / SPEM) repräsentieren ein hochkomplexes okulomotorisches System, dessen evolutionäre Aufgabe darin besteht, Bilder bewegter Objekte stabil auf der Fovea centralis – dem Areal mit der höchsten Dichte an Photorezeptoren – zu halten. Während Sakkaden den Blick sprunghaft zwischen statischen Fixationspunkten hin- und herwerfen, erfordert Smooth Pursuit eine kontinuierliche Geschwindigkeitsintegration: Der visuelle Kortex (Areale MT/MST) ermittelt das Vektorsignal des retinalen Schlupfes, woraufhin der Flocculus des Kleinhirns die motorische Verstärkung (Gain) so feinjustiert, dass die Augengeschwindigkeit exakt mit der Reizgeschwindigkeit übereinstimmt (Rashbass, 1961; Krauzlis, 2004).",
    "Die physiologische Herausforderung niedriger Geschwindigkeiten: Bewegt sich ein Ziel langsam, führt ein Zurückbleiben des Auges unweigerlich dazu, dass das Objekt die Fovea verlässt. Das Gehirn reagiert reflexartig mit störenden 'Catch-up-Sakkaden', um den Rückstand aufzuholen, was zu einem ruckartigen Seheindruck führt (Robinson, 1965). Die Fähigkeit, diese Blicksprünge bewusst zu unterdrücken und den Blick gleichmäßig gleiten zu lassen, ist das zentrale Qualitätsmerkmal einer hochgradig trainierten okulomotorischen Kontrolle.",
    "Die Lissajous-Kurve als multidirektionales Trainingsfeld: Lineare Pendelbewegungen bremsen an den Umkehrpunkten stets auf Null ab, was dem Auge unnatürliche Erholungsmomente verschafft. Die in dieser Übung implementierte Lissajous-Geometrie (orthogonale Phasenkopplung von Sinus- und Kosinusfunktionen) erzeugt eine unendliche, geschlossene Schleifenbahn ohne tote Winkel. Dadurch werden die horizontalen, vertikalen und schrägen Augenmuskeln (Mm. recti und Mm. obliqui) simultan und gleichmäßig beansprucht – eine ideale Vorbereitung für das Verfolgen ausweichender Gegner im E-Sport (Yang et al., 2025) sowie dynamischer Bälle im Sport (Appelbaum & Erickson, 2018).",
    "Methodische Standardisierung und Ergonomie: Entscheidend für den Trainingstransfer ist die vollständige Entkopplung vom vestibulookulären Reflex (VOR). Wird der Kopf mitbewegt, stabilisieren die Gleichgewichtsorgane im Innenohr das Bild mechanisch, wodurch der kortikale Trainingsreiz auf die Augenmuskeln verpufft (Leigh & Zee, 2015). Halte das Kinn daher leicht angezogen und bewege ausschließlich die Augen. Ein Display mit 144 Hz oder mehr eliminiert Bildstottern und sichert optimale Reizübertragung (Woods et al., 2015). Sämtliche Messwerte verbleiben privat im lokalen Browserspeicher."
  ],
  benchmarks: {
    title: "Leistungsstandards für Augenfolgebewegung & Blickruhe (Redaktioneller Referenzrahmen)",
    headers: ["Leistungsklasse", "Geschwindigkeitsbereich (Multiplier)", "Blickstabilität & Sakkadenunterdrückung", "Okulomotorisches & Neurologisches Profil"],
    rows: [
      ["Tier 1: Spitzenklasse / Apex Gaze Lock", "2.0x und höher", "Keinerlei Catch-up-Sakkaden; Fovea haftet wie magnetisch am Ziel selbst in engsten Kurvenradien.", "Perfekt synchronisierte zerebelläre Prädiktionsmodelle (Barnes, 2008); Leistungsniveau professioneller E-Sportler und Spitzensportler."],
      ["Tier 2: Exzellent / Superior Pursuit", "1.4x – 1.9x", "Kontinuierliches Gleiten; minimale Blickunruhe bei abrupten Richtungswechseln mit sofortiger Rekompensation.", "Hervorragende Augenmuskelkoordination und minimale retinale Schlupftoleranz; feine Konturen bewegter Ziele bleiben gestochen scharf."],
      ["Tier 3: Solider Normalstandard", "1.0x – 1.3x", "Stabile Verfolgung im Standardtempo; gelegentliche Mikrosakkaden an den Wendepunkten der Kurve.", "Typischer gesunder Erwachsenenstandard; vollkommen ausreichend für den Alltag und entspanntes Casual-Gaming."],
      ["Tier 4: Entwicklungsstufe / Leichtes Ruckeln", "0.7x – 0.9x", "Auge fällt wiederholt hinter das Ziel zurück; häufige stufenförmige Korrektursprünge.", "Unzureichender Gain bei niedrigen Tempi; gezieltes Training der reinen Augenrotation bei fixiertem Kopf erforderlich."],
      ["Tier 5: Beginnend / Erhöhte Blickunruhe", "unter 0.7x", "Blick verliert die Trajektorie; unwillkürliches Mitbewegen des Kopfes oder deutliche Ermüdungszeichen.", "Grundlagentraining im niedrigsten Geschwindigkeitsbereich empfohlen; Fokus auf Kopfruhe und Entspannung."]
    ],
    note: "Diese Normwerte stützen sich auf ophthalmologische und neurowissenschaftliche Fachpublikationen (Robinson, 1965; Rashbass, 1961; Krauzlis, 2004; Leigh & Zee, 2015) zur qualitativen Beurteilung der Folgebewegungskontinuität."
  },
  techniques: {
    title: "Vier wissenschaftliche Methoden zur Perfektionierung der Augenfolgebewegung",
    items: [
      {
        name: "Kopfruhe zur vollständigen Isolation vom VOR-Reflex",
        desc: "Wie Leigh & Zee (2015) nachwiesen, übernimmt bei Kopfdrehungen der Innenohrreflex (VOR) die Führung, was den Trainingseffekt auf die kortikale Blickfolge (SPEM) zunichtemacht.",
        tips: "Stütze das Kinn bei Bedarf leicht ab und bewege ausschließlich die Augäpfel in ihren Augenhöhlen."
      },
      {
        name: "Foveale Verankerung am inneren Zielkern",
        desc: "Krauzlis (2004) zeigte, dass der retinale Schlupf der Haupttreiber der Folgebewegung ist. Die Fokussierung auf den Kern minimiert sensorische Drift.",
        tips: "Betrachte nicht den Zielkreis als Ganzes, sondern bohre den Blick punktgenau in das Zentrum des bewegten Körpers."
      },
      {
        name: "Prädiktive Bahnprojektion im Kleinhirn (Inneres Modell)",
        desc: "Barnes (2008) belegte, dass das Kleinhirn wiederkehrende Muster lernt und Steuersignale vorausschickt, die die 100 ms Nervenlaufzeit neutralisieren.",
        tips: "Antizipiere den Schwung der Kurve gedanklich einen Bruchteil voraus, um das Auge ohne Verzögerung durch die Biegung gleiten zu lassen."
      },
      {
        name: "High-Refresh-Kalibrierung und Lidschlaghygiene",
        desc: "Nach Woods et al. (2015) liefert ein 144-Hz- oder 240-Hz-Monitor ein ruckelfreies Bewegungssignal, das dem Gehirn eine fehlerfreie Geschwindigkeitsberechnung ermöglicht.",
        tips: "Nutze einen Monitor mit hoher Bildwiederholrate und führe nach jedem Durchgang bewusst kräftige Lidschläge aus."
      }
    ]
  },
  steps: [
    "Wähle die passende Geschwindigkeitsstufe (0,5x bis 2,0x) und starte den 60-Sekunden-Durchgang.",
    "Setze dich aufrecht in ca. 50 bis 70 cm Abstand zum Monitor und halte den Kopf absolut bewegungslos.",
    "Fixiere den zentralen Kern des Zielobjekts, sobald dieses auf der Lissajous-Kurve anfährt.",
    "Führe den Blick stufenlos mit der Geschwindigkeit des Ziels mit, ohne den Kopf zu drehen.",
    "Solltest du Blicksprünge oder Ruckler bemerken, reduziere das Tempo und priorisiere die Gleitfähigkeit."
  ],
  audience: "E-Sport- und Shooter-Gamer (Apex Legends, Overwatch, Valorant), Ballsportler (Tennis, Baseball, Tischtennis), Athleten zur Schulung der Bewegungswahrnehmung sowie Personen zur Linderung digitaler Sehbelastungen.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('robinson1965', 'rashbass1961', 'krauzlis2004', 'barnes2008', 'leigh2015', 'yang2025', 'woods2015'),
  related: [
    { href: "/de/drills/visual-tracking/sine-wave-pursuit", label: "Sinuswellen-Folgebewegung (Sine Wave)" },
    { href: "/de/drills/visual-tracking/infinity-pursuit", label: "Achter-Schleifenverfolgung (Infinity)" },
    { href: "/de/drills/visual-tracking/directional-chaos-pursuit", label: "Unvorhersehbare Richtungswechsel (Directional Chaos)" },
    { href: "/de/drills/visual-tracking/predictive-pursuit", label: "Prädiktives Tracking (Predictive)" },
    { href: "/de/drills/visual-tracking/dynamic-evasion-pursuit", label: "Reaktive Ausweichverfolgung (Dynamic Evasion)" },
    { href: "/de/drills/visual-tracking/ghosting-suppress-pursuit", label: "Fixationsstabilität & Ghosting-Unterdrückung" }
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
      <ConstantSlowPursuitClient
        copy={{
          title: "Augenfolgebewegung Training – Visuelle Blickstabilisation",
          subtitle: "Glatte Augenfolgebewegungen (Smooth Pursuit) & Lissajous-Blickruhe Übung"
        }}
      />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/de/drills/visual-tracking/constant-slow-pursuit" />
      </div>
    </>
  );
}
