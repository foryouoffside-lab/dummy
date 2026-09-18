import GhostLinkClient from '@/app/drills/visual/tracking-accuracy/multiple-targets/GhostLinkClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Multiple Object Tracking Test: MOT Online | SkillDrills",
  description: "Kostenloser Multiple Object Tracking Test (MOT) online: Verfolge bewegte Ziele zwischen Ablenkern. Trainiere geteilte Aufmerksamkeit und peripheres Sehen.",
  keywords: [
    "Multiple Object Tracking Test",
    "MOT Test Online",
    "Mehrzielverfolgung",
    "Geteilte visuelle Aufmerksamkeit",
    "Räumliches Arbeitsgedächtnis",
    "Dynamische Objektverfolgung",
    "Pylyshyn MOT",
    "Periphere Wahrnehmung",
    "Fluglotsen Sehtest",
    "FPS Situational Awareness"
  ],
  openGraph: {
    title: "Multiple Object Tracking Test: MOT Online | SkillDrills",
    description: "Wissenschaftlicher Multiple Object Tracking (MOT) Test online kostenlos. Verfolge mehrere identische Ziele gleichzeitig und trainiere dein peripheres Blickfeld.",
    type: 'article',
    url: 'https://skilldrills.online/de/drills/visual/tracking-accuracy/multiple-targets',
    siteName: 'SkillDrills',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Multiple Object Tracking Test: MOT Online | SkillDrills",
    description: "Wissenschaftlicher Multiple Object Tracking Test online. Trainiere simultane Zielverfolgung und peripheres Sehen im Browser.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/visual/tracking-accuracy/multiple-targets',
    languages: getAlternateLanguages('/drills/visual/tracking-accuracy/multiple-targets'),
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
      "name": "Trainings-Hub",
      "item": "https://skilldrills.online/de/drills"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Visuelles Training",
      "item": "https://skilldrills.online/de/drills/visual"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Zielverfolgung & Tracking",
      "item": "https://skilldrills.online/de/drills/visual/tracking-accuracy"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Multiple Object Tracking Test (MOT)",
      "item": "https://skilldrills.online/de/drills/visual/tracking-accuracy/multiple-targets"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SkillDrills Multiple Object Tracking (MOT) Test & Trainer",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Any",
  "browserRequirements": "Moderner Webbrowser mit HTML5-Canvas-Unterstützung",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "description": "Präzises Web-Tool zur Messung der simultanen Mehrzielverfolgung, des peripheren Blickfelds und der Kapazität des visuell-räumlichen Arbeitsgedächtnisses basierend auf dem Pylyshyn-MOT-Paradigma."
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Kostenloser Online Multiple Object Tracking (MOT) Test",
  "url": "https://skilldrills.online/de/drills/visual/tracking-accuracy/multiple-targets",
  "applicationCategory": "GameApplication",
  "genre": ["Multiple Object Tracking", "Augentraining", "Visuelle Aufmerksamkeit", "Peripheres Sehen"],
  "browserRequirements": "Requires HTML5 Canvas and JavaScript",
  "inLanguage": "de-DE"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Multiple Object Tracking Challenge (GhostLink)",
  "description": "Verfolge mehrere optisch identische Kugeln simultan im zweidimensionalen Raum und identifiziere alle Zielobjekte fehlerfrei.",
  "genre": ["Vision Training", "Esports Reaction", "Cognitive Drill"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was genau misst der Multiple Object Tracking (MOT) Test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Das von Kognitionsforscher Zenon Pylyshyn (1988) entwickelte MOT-Paradigma misst die Fähigkeit des Gehirns, mehrere optisch identische Objekte gleichzeitig über die Zeit im Raum zu verfolgen, während sie sich chaotisch zwischen identischen Ablenkern (Distraktoren) bewegen. Im Unterschied zur einfachen Zielverfolgung wird hier nicht ein Einzelobjekt mit der Fovea fixiert, sondern die geteilte visuelle Aufmerksamkeit und das visuell-räumliche Arbeitsgedächtnis des parietalen Kortex gefordert."
      }
    },
    {
      "@type": "Question",
      "name": "Wie viele Objekte kann ein gesunder Mensch maximal gleichzeitig verfolgen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Umfassende neurokognitive Studien belegen, dass die typische Kapazitätsgrenze gesunder Erwachsener bei durchschnittlich 3 bis 4 Objekten liegt (Cavanagh & Alvarez, 2005). Bei mehr als vier Zielen kommt es bei schnellen Objektkreuzungen häufig zu Verwechslungen. Professionelle E-Sportler, Jagdpiloten und Spitzensportler in Mannschaftssportarten können jedoch trainiert 5 bis 6 Ziele gleichzeitig stabil im Arbeitsgedächtnis halten (Green & Bavelier, 2006; Faubert, 2013)."
      }
    },
    {
      "@type": "Question",
      "name": "Warum scheitert man, wenn man die Kugeln nacheinander einzeln mit den Augen abtastet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Jeder Blicksprung (Sakkade) von einem Objekt zum nächsten benötigt rund 200 Millisekunden Latenzzeit. Zudem unterdrückt das Gehirn während der eigentlichen Sakkade die visuelle Wahrnehmung (sakkadische Suppression). Wer versucht, vier sich mit 300 px/s bewegende Kugeln nacheinander anzuschauen, verpasst zwangsläufig die kritischen Kreuzungsmomente der anderen drei Kugeln. Erfolgreiches Tracking erfordert daher eine parallele, periphere Informationsverarbeitung."
      }
    },
    {
      "@type": "Question",
      "name": "Was versteht man unter der Schwerpunkt-Strategie (Centroid Strategy)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Elite-Tracker fixieren ihren Blick nicht auf eine einzelne Kugel, sondern richten ihren Fokus weich auf den geometrischen Schwerpunkt (Centroid) des von allen Zielen aufgespannten Polygons. Indem die Augen im Zentrum verweilen, registriert das periphere Sehen die Formveränderungen des Gesamtsystems als Gestalt. Dadurch entfallen unruhige Sakkaden, und Verwechslungen bei Überlagerungen werden drastisch minimiert."
      }
    },
    {
      "@type": "Question",
      "name": "Was bedeutet 'Hemifield Independence' für das Tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Studien von Alvarez & Cavanagh (2005) zeigen, dass die linke und rechte Bildhaushälfte primär von getrennten Gehirnhälften (rechte vs. linke Hemisphäre) verarbeitet werden. Verteilen sich die Zielobjekte gleichmäßig über die linke und rechte Bildschirmhälfte, ist die Tracking-Leistung signifikant höher als wenn alle Ziele in einem Quadranten gedrängt sind. Ein ruhiger Blick auf die vertikale Bildschirmmitte optimiert diese beidseitige Ressourcenverteilung."
      }
    },
    {
      "@type": "Question",
      "name": "Wie profitieren Teamsportler in Fußball, Basketball oder Handball von MOT?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die sprichwörtliche 'Spielübersicht' (Court Vision) beruht fundamental auf der MOT-Kapazität. Ein Spielmacher muss den Ball kontrollieren und gleichzeitig mehrere einlaufende Mitspieler sowie gegnerische Verteidiger im peripheren Blickfeld behalten. Faubert (2013) konnte zeigen, dass Profi-Athleten in 3D-MOT-Tests signifikant steilere Lernkurven und höhere Maximalgeschwindigkeiten erzielen als Amateure."
      }
    },
    {
      "@type": "Question",
      "name": "Welche konkreten Vorteile bringt dieses Training in FPS-Titeln wie Valorant oder Apex Legends?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Es verhindert den berüchtigten 'Tunnelblick' (Tunnel Vision). Spieler behalten das Fadenkreuz im Zentrum, erfassen aber gleichzeitig Team-Positionen, herannahende Granaten, Minimap-Pings und flankierende Gegner im peripheren Sichtfeld. Das steigert die situative Aufmerksamkeit (Situational Awareness) in chaotischen Gefechten enorm."
      }
    },
    {
      "@type": "Question",
      "name": "Wie verhindert man Identitätsverwechslungen (Identity Swaps) bei Kugelüberlagerungen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Anstatt den Kollisionspunkt starr anzustarren, sollte das Gehirn die Bewegungsträgheit (den physikalischen Impulsvektor) vor der Berührung extrapolieren. Indem man antizipiert, auf welcher Bahn das Ziel nach der Kreuzung geradlinig austreten muss, verhindert man, dass die Aufmerksamkeit auf die falsche Kugel überspringt."
      }
    },
    {
      "@type": "Question",
      "name": "Wie oft sollte man trainieren, um maximale Fortschritte zu erzielen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Da MOT das parietale Arbeitsgedächtnis stark beansprucht, sind kurze, hochkonzentrierte Einheiten ideal: 10 bis 15 Minuten (5 bis 8 Durchgänge) an 4 bis 5 Tagen pro Woche fördern die synaptische Plastizität optimal, ohne kognitive Erschöpfung hervorzurufen."
      }
    },
    {
      "@type": "Question",
      "name": "Werden meine Testergebnisse auf Server hochgeladen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nein. Alle Berechnungen und Leistungsstatistiken werden ausschließlich lokal im Speicher deines Browsers (localStorage) abgelegt. Es erfolgt keinerlei Übertragung persönlicher Daten an externe Server."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Anleitung für den Multiple Object Tracking (MOT) Test",
  "description": "Schritt-für-Schritt-Vorgehensweise zur Maximierung deiner Zielverfolgung und peripheren Wahrnehmung.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Zielgruppe geometrisch einprägen",
      "text": "Merke dir zu Beginn die aufleuchtenden Zielkugeln und verbinde sie mental zu einem gemeinsamen Polygon (z. B. Dreieck oder Viereck).",
      "url": "https://skilldrills.online/de/drills/visual/tracking-accuracy/multiple-targets#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Schwerpunkt fixieren (Soft-Focus)",
      "text": "Blicke nicht auf einzelne Kugeln, sondern richte deinen Fokus entspannt auf das Zentrum der Gruppe und nutze dein peripheres Blickfeld.",
      "url": "https://skilldrills.online/de/drills/visual/tracking-accuracy/multiple-targets#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Kollisionen vektoriell antizipieren",
      "text": "Behalte bei dichten Kreuzungen mit Ablenkern die Vorwärtsbewegung im Sinn, um den Austritt der Zielkugeln fehlerfrei vorherzusehen.",
      "url": "https://skilldrills.online/de/drills/visual/tracking-accuracy/multiple-targets#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Ziele präzise markieren",
      "text": "Klicke nach dem Stillstand aller Objekte nacheinander auf die identifizierten Zielkugeln, um das Ergebnis zu erfassen.",
      "url": "https://skilldrills.online/de/drills/visual/tracking-accuracy/multiple-targets#step-4"
    }
  ]
};

const guideData = {
  eyebrow: "Kognitionspsychologie & Visuelle Neurowissenschaft",
  heading: "Multiple Object Tracking (MOT) – Parallele Wahrnehmung & Räumliches Arbeitsgedächtnis",
  intro: [
    "Das Multiple Object Tracking (MOT) Paradigma, 1988 von Kognitionswissenschaftler Zenon Pylyshyn begründet, gilt als Meilenstein der empirischen Aufmerksamkeitsforschung. Es untersucht die biologischen Leistungsgrenzen des menschlichen Sehsystems bei der parallelen Erfassung mehrerer unabhängiger Informationsträger: Aus einer Menge optisch völlig ununterscheidbarer Objekte müssen zuvor definierte Zielobjekte simultan über einen dynamischen Zeitraum hinweg verfolgt werden, während sie sich chaotisch zwischen zahlreichen Ablenkern (Distraktoren) kreuzen.",
    "Neurobiologische fMRT-Untersuchungen belegen, dass erfolgreiches MOT auf einem weit verzweigten dorsalen Aufmerksamkeitsnetzwerk beruht, das maßgeblich den Sulcus intraparietalis (IPS), die frontalen Augenfelder (FEF) und die oberen Hügelchen (Colliculi superiores) einbindet (Cavanagh & Alvarez, 2005). Das Gehirn speichert hierbei keine statischen Merkmalsbeschreibungen, sondern verankert sogenannte visuelle Zeiger (Visual Indices bzw. FINSTs) als prädiktive Koordinatenzeiger direkt im visuellen Kortex.",
    "Besonders bedeutsam ist die funktionelle Unabhängigkeit der beiden Gehirnhälften (Hemifield Independence): Das linke und das rechte Sehfeld greifen weitgehend auf getrennte Aufmerksamkeitskapazitäten in der rechten und linken Hemisphäre zu (Alvarez & Cavanagh, 2004). Wer versucht, mehrere Ziele durch sequenzielle Blicksprünge (Sakkaden) abzutasten, scheitert an der ca. 200 ms langen sakkadischen Latenzzeit. Top-Athleten und erfahrene Action-Gamer halten ihren Blick stattdessen im geometrischen Schwerpunkt der Zielformation fixiert und werten die Positionsänderungen über das periphere Sehen aus – die sogenannte Schwerpunkt-Strategie (Green & Bavelier, 2006; Faubert, 2013).",
    "Dieses webbasierte Trainingssystem steuert Kugelanzahl, Geschwindigkeitsgradienten und Kreuzungsfrequenzen millisekundengenau über die HTML5-Canvas-Engine. Ein regelmäßiges MOT-Training beseitigt zuverlässig den visuellen Tunnelblick, schult die Spielübersicht in Mannschaftssportarten, verbessert das Situationsbewusstsein (Situational Awareness) in First-Person-Shootern und schärft die periphere Gefahrenerkennung im Straßenverkehr."
  ],
  benchmarks: {
    title: "Standardisierte Benchmarks für Multiple Object Tracking (MOT)",
    headers: ["Leistungsstufe / Rang", "Simultan verfolgte Zielobjekte", "Maximales Bewegungstempo", "Trefferquote / Präzision", "Neurokognitive Leistungsstufe"],
    rows: [
      ["Weltklasse / Pro-Level (Top 1%)", "5 – 6 Ziele", "Schnell (> 400 px/s)", "≥ 92%", "Geometrische Schwerpunkt-Fixierung und vollständige hemisphärische Parallelverarbeitung (Cavanagh & Alvarez, 2005)"],
      ["Fortgeschritten / Athlet (Top 5%)", "4 – 5 Ziele", "Mittel-Schnell (300 – 400 px/s)", "82 – 91%", "Stabiles peripheres Tracking und verlässliche Trägheitsprädiktion bei dichten Kreuzungen"],
      ["Solider Standard (Top 25%)", "3 – 4 Ziele", "Moderates Tempo (200 – 300 px/s)", "72 – 81%", "Typische Kapazitätsgrenze gesunder Erwachsener bei gleichmäßigen Trajektorien"],
      ["Basis-Niveau (Top 50%)", "2 – 3 Ziele", "Niedrig-Moderat (150 – 200 px/s)", "60 – 71%", "Informationsverlust durch serielle Sakkaden (zu starke Fixierung auf Einzelobjekte)"],
      ["Einsteiger / Untrainiert (Baseline)", "< 2 Ziele", "Langsam (< 150 px/s)", "< 60%", "Überlastung des visuell-räumlichen Arbeitsgedächtnisses bei Kollisionen"]
    ],
    note: "Basierend auf publizierten neurokognitiven und sportophthalmologischen Studien (Pylyshyn 1988; Cavanagh & Alvarez 2005; Green & Bavelier 2006; Faubert 2013)."
  },
  techniques: {
    title: "4 praxiserprobte Methoden zur Steigerung der Mehrzielverfolgung",
    items: [
      {
        name: "Geometrische Schwerpunkt-Fixierung (Centroid Soft-Focus)",
        desc: "Fixiere nicht einzelne Zielkugeln, sondern richte den Blick weich auf das geometrische Zentrum des von allen Zielen aufgespannten Raumes und nimm Verformungen peripher wahr.",
        tips: "Vermeide starres Starren; behalte den gesamten Monitor entspannt als zusammenhängende Bildfläche im Blick."
      },
      {
        name: "Hemisphärische Ressourcenbalance (Hemifield Allocation)",
        desc: "Da linkes und rechtes Sichtfeld unabhängig voneinander in beiden Gehirnhälften verarbeitet werden, optimiert eine gleichmäßige Zielverteilung über die vertikale Achse die Trefferquote.",
        tips: "Nutze die Bildschirmmitte als Orientierungslinie, um beide Hemisphären gleichmäßig zu fordern."
      },
      {
        name: "Kollisionsvektor-Extrapolation (Collision Extrapolation)",
        desc: "Verfolge bei dichten Überlagerungen mit Ablenkern mental den linearen Bewegungsimpuls, um den Austrittsweg der Zielkugel unmittelbar nach der Kreuzung abzufangen.",
        tips: "Stich nicht mit dem Auge in den Kreuzungspunkt, sondern platziere die Aufmerksamkeit auf den zu erwartenden Austrittsbereich."
      },
      {
        name: "Aktives Aufmerksamkeits-Refreshing (Attentional Refreshing)",
        desc: "Sollte das Gedächtnisbild während einer langen Passage verblassen, taste die mentale Verbindungslinie der Zielgruppe im Geiste blitzschnell ab, um die Zeiger zu erneuern.",
        tips: "Bewege nicht die physischen Augen, sondern schwenke lediglich den inneren Fokus der Aufmerksamkeit im Millisekundentakt."
      }
    ]
  },
  steps: [
    "Klicke auf Start und präge dir die blinkenden Zielkugeln und deren polygonale Anordnung ein.",
    "Sobald die Kugeln ihre neutrale Farbe annehmen und in Bewegung geraten, fixiere den Schwerpunkt der Gruppe.",
    "Halte den Blick ruhig zentriert und nutze das periphere Sehen, um die Kugelbahnen simultan zu überwachen.",
    "Identifiziere nach dem Stillstand alle Zielkugeln durch fehlerfreies Anklicken.",
    "Überprüfe deine Trefferquote, Zielanzahl und Einstufung im Ergebnisreport und baue den Drill in deine Routine ein."
  ],
  audience: "Ambitionierte E-Sportler und FPS-Gamer (Valorant, Apex Legends, CS2, Overwatch) für bessere Raumübersicht, Teamsportler (Fußball, Basketball, Handball) zur Schulung der Spielübersicht sowie angehende Piloten und Fluglotsen.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('pylyshyn1988', 'cavanagh2005', 'alvarez2004', 'green2006', 'faubert2013', 'woods2015'),
  related: [
    { href: "/de/drills/visual/tracking-accuracy/moving-target", label: "Dynamische Sehschärfe & Zielinterzeption" },
    { href: "/de/drills/visual/visual-recognition/visual-search", label: "Visuelle Suche (Peripheres Scannen)" },
    { href: "/de/drills/visual/depth-perception/distance-judgment", label: "Tiefensehschärfe & Dreistäbchentest" },
    { href: "/de/drills/reaction-speed/visual-tracking-speed-test", label: "Visuelle Tracking-Geschwindigkeit" }
  ]
};

export default function LocalizedMultipleTargetsDePage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <GhostLinkClient copy={{ title: "Multiple Object Tracking Test (MOT)", subtitle: "Simultane Mehrzielverfolgung & Periphere Aufmerksamkeit" }} />
      <DrillGuide guide={guideData} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/de/drills/visual/tracking-accuracy/multiple-targets" />
      </div>
    </>
  );
}
