import ChromaSyncClient from '@/app/drills/visual/reaction-speed/go/no-go/ChromaSyncClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Go/No-Go Test: Reaktionshemmung & Kontrolle | SkillDrills",
  description: "Wissenschaftlicher Go/No-Go Test: Klicke grüne Go-Ziele, stoppe bei roten No-Go-Signalen. Trainiere Reaktionshemmung und Impulskontrolle kostenlos online.",
  keywords: [
    "go no-go test",
    "reaktionshemmung test",
    "impulskontrolle test",
    "motorische hemmung psychologie",
    "stop signal task online",
    "exekutive funktionen go nogo",
    "donders c reaktion",
    "trigger discipline e-sport",
    "horse race modell logan",
    "reaktionszeittest hemmung",
    "commission error fehlalarm",
    "frontallappen impulskontrolle"
  ],
  openGraph: {
    title: "Go/No-Go Test: Reaktionshemmung & Kontrolle | SkillDrills",
    description: "Reagiere auf Grün und stoppe bei Rot. Trainiere motorische Reaktionshemmung und präfrontale Impulskontrolle kostenlos online.",
    type: 'article',
    url: 'https://skilldrills.online/de/drills/visual/reaction-speed/go/no-go',
    siteName: 'SkillDrills',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Go/No-Go Test: Reaktionshemmung & Kontrolle | SkillDrills",
    description: "Kostenloser neurokognitiver Go/No-Go Test: Messe motorische Notbremsung, Fehlalarmquoten und Trigger-Disziplin.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/visual/reaction-speed/go/no-go',
    languages: getAlternateLanguages('/drills/visual/reaction-speed/go/no-go'),
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
    { "@type": "ListItem", "position": 5, "name": "Go/No-Go Impulskontrolle", "item": "https://skilldrills.online/de/drills/visual/reaction-speed/go/no-go" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Go/No-Go Reaktionshemmungs-Test",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/de/drills/visual/reaction-speed/go/no-go",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "description": "Interaktiver neuropsychologischer Go/No-Go Test zur Messung präfrontaler Reaktionshemmung, motorischer Notbremsung und Trigger-Disziplin.",
  "featureList": [
    "Millisekundengenaue Latenzerfassung via performance.now() API",
    "Dynamische Stimulus-Verkürzung zur Messung des Abbruchzeitpunkts",
    "Differenzierte Erfassung von Commission Errors (Fehlalarmen) und Omission Errors",
    "Vollständig lokale Speicherung im Browser ohne Server-Telemetrie"
  ],
  "dateModified": "2026-09-05"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Go/No-Go Reaktionshemmungs-Test | SkillDrills",
  "alternateName": "Go/No-Go Pro",
  "url": "https://skilldrills.online/de/drills/visual/reaction-speed/go/no-go",
  "dateModified": "2026-09-05",
  "description": "Kostenloses neurokognitives Online-Training zur Reaktionshemmung: Reagiere auf grüne Go-Ziele und stoppe die Fingerbewegung bei roten No-Go-Reizen.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5-fähiger Browser mit Canvas-Unterstützung.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Reaktionshemmung, Impulskontrolle, präfrontale motorische Bremsung, Trigger-Disziplin"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Go/No-Go Impulskontroll-Drill",
  "url": "https://skilldrills.online/de/drills/visual/reaction-speed/go/no-go",
  "description": "Online-Reaktionsspiel zur Förderung der motorischen Impulskontrolle und Entscheidungspräzision.",
  "genre": ["Action", "Brain Game", "Reaction Speed"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "So absolvierst du den Go/No-Go Test",
  "dateModified": "2026-09-05",
  "description": "Schritt-für-Schritt-Anleitung zur Messung und Optimierung deiner motorischen Reaktionshemmung im Go/No-Go Paradigma.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Blickpunkt auf das Zentrum fixieren",
      "text": "Richte deine Augen ruhig auf das Fadenkreuz in der Mitte des Canvas-Fensters, wo die Farbsignale aufblitzen.",
      "url": "https://skilldrills.online/de/drills/visual/reaction-speed/go/no-go#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Blitzschnell auf grüne Go-Ziele klicken",
      "text": "Sobald das smaragdgrüne Go-Signal erscheint, klicke oder drücke die Leertaste so schnell wie möglich (+150 Pkt. × Combo).",
      "url": "https://skilldrills.online/de/drills/visual/reaction-speed/go/no-go#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Motorische Bewegung bei roten No-Go-Zielen abbrechen",
      "text": "Erscheint das rubinrote No-Go-Signal, halte den Finger regungslos zurück (+100 Pkt. für erfolgreiche Zurückhaltung).",
      "url": "https://skilldrills.online/de/drills/visual/reaction-speed/go/no-go#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Trigger-Disziplin bei steigender Frequenz wahren",
      "text": "Mit wachsender Serie verkürzt sich das Zeitfenster auf bis zu 100 ms, was höchste frontostriatale Bremsleistung erfordert.",
      "url": "https://skilldrills.online/de/drills/visual/reaction-speed/go/no-go#step-4"
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
      "name": "Was misst der Go/No-Go Test aus neurowissenschaftlicher Sicht?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der Go/No-Go Test evaluiert die exekutive Reaktionshemmung (Response Inhibition) und Verhaltenskontrolle. Er quantifiziert die Fähigkeit des Gehirns, einen bereits aktivierten motorischen Befehl selektiv abzubrechen, wenn sich die sensorischen Bedingungen ändern."
      }
    },
    {
      "@type": "Question",
      "name": "Was unterscheidet einen Commission Error (Fehlalarm) von einem Omission Error?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein Commission Error (Fehlalarm) entsteht, wenn du bei einem roten No-Go-Signal fälschlicherweise klickst – ein Versagen der Impulskontrolle. Ein Omission Error liegt vor, wenn du ein grünes Go-Ziel verpasst, was auf Lücken in der Daueraufmerksamkeit hinweist."
      }
    },
    {
      "@type": "Question",
      "name": "Was besagt das Horse-Race-Modell (Wettlauf-Modell) der Reaktionshemmung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Das von Logan und Cowan (1984) formulierte Modell beschreibt motorische Kontrolle als Wettlauf zwischen einem initiierenden Go-Prozess und einem inhibitorischen Stopp-Prozess. Überquert der Stopp-Prozess die neuronale Schwelle zuerst, wird die Handlung erfolgreich gehemmt."
      }
    },
    {
      "@type": "Question",
      "name": "Warum klickt der Finger oft unwillkürlich, obwohl man das rote Signal sieht?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dies liegt an motorischer Voraktivierung (Prepotent Priming). Da Go-Ziele überwiegen, feuert der motorische Kortex bei Reizbeginn reflexartig los, noch bevor die parvozelluläre Farberkennung im visuellen Areal V4 abgeschlossen ist."
      }
    },
    {
      "@type": "Question",
      "name": "Welchen Nutzen bringt Go/No-Go-Training für Shooter wie Valorant oder CS2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In taktischen E-Sport-Titeln ist Trigger-Disziplin spielentscheidend. Wer voreilig auf Teamkameraden oder verfallende Rauchgranaten schießt, gibt seine Position preis. Der Drill trainiert das Gehirn, sensorische Reizerfassung von reflexartiger Fingerkontraktion zu entkoppeln."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Areale des Gehirns steuern die motorische Notbremse?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die motorische Bremsung wird über eine hyperdirekte neuronale Bahn gesteuert, die den rechten unteren Frontallappen (rIFC), das prä-supplementär-motorische Areal (preSMA) und den Nucleus subthalamicus (STN) in den Basalganglien verbindet (Aron et al., 2014)."
      }
    },
    {
      "@type": "Question",
      "name": "Lässt sich die Impulskontrolle und Reaktionshemmung gezielt verbessern?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Neuroplastizitätsstudien belegen, dass regelmäßiges Go/No-Go-Training die funktionelle Konnektivität des präfrontalen Bremsnetzwerks stärkt und die Stopp-Signal-Reaktionszeit (SSRT) signifikant verkürzt."
      }
    },
    {
      "@type": "Question",
      "name": "Welchen Einfluss haben Monitor-Bildwiederholrate und Maus-Pollingrate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein 60-Hz-Monitor fügt bis zu 16,7 ms Frame-Latenz hinzu, während 240-Hz-Displays diesen Verzug auf 4,1 ms senken. Zusammen mit 1000-Hz-Gaming-Mäusen liefert das Setup frühere visuelle Farbdaten, was Fehlalarme nachweislich reduziert."
      }
    },
    {
      "@type": "Question",
      "name": "Was ist das ideale tägliche Trainingspensum für maximale frontale Kontrolle?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Zwei bis drei fokussierte Einheiten à 3 bis 5 Minuten genügen. Übermäßiges Training führt zu kognitiver Ermüdung der präfrontalen Transmitter, was die Fehlerrate steigen lässt."
      }
    },
    {
      "@type": "Question",
      "name": "Werden meine Reaktionszeiten und Klickdaten auf externen Servern gespeichert?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nein. Alle Auswertungen und Bestwerte werden ausschließlich lokal im Speicher deines Browsers abgelegt. Es findet keinerlei Tracking oder Datenübertragung an externe Server statt."
      }
    }
  ]
};

const goNoGoGuide = {
  heading: "Neurowissenschaftliche Standards für Reaktionshemmung & Impulskontrolle",
  intro: [
    "Reaktionshemmung (Response Inhibition) ist die fundamentale exekutive Kontrollfunktion des menschlichen Gehirns, die es gestattet, bereits vorbereitete motorische Handlungen blitzschnell zu stoppen, wenn sie unvorteilhaft oder fehlerhaft sind. In dynamischen Sportarten, beim Autofahren und im kompetitiven E-Sport entscheidet die Fähigkeit zur Verhaltensbremsung oft über Sieg oder Niederlage.",
    "Die psychophysikalischen Grundlagen gehen auf Franciscus Cornelis Donders (1868) zurück, der mit der 'C-Reaktion' nachwies, dass die selektive Unterdrückung einer Reaktion im Vergleich zur reinen Reaktionszeit zusätzliche kognitive Diskriminationszeit beansprucht.",
    "1984 formulierten Logan und Cowan das 'Horse-Race-Modell', das die Handlungshemmung als algorithmischen Wettlauf zwischen einem exzitatorischen Go-Prozess und einem inhibitorischen Stopp-Prozess beschreibt. Moderne fMRT-Studien (Aron et al., 2014) belegen, dass diese Bremsung über den rechten unteren Frontalkortex (rIFC) und den subthalamischen Nukleus (STN) realisiert wird.",
    "Methodik & Latenz-Standardisierung: Alle Reizpräsentationen und Klickeingaben werden hochpräzise über die browserinterne performance.now() API erfasst. Hardware-Latenzen durch Monitor-Quantisierung und USB-Abtastung werden nach Woods et al. (2015) minimiert, während alle Messwerte rein lokal verarbeitet werden."
  ],
  benchmarks: {
    title: "Leistungsstufen der Reaktionshemmung (Wissenschaftliche Richtwerte)",
    headers: ["Leistungsband", "Fehlalarmquote (CER)", "Punkte & Combo-Schwelle", "Neuromuskuläres & Exekutives Profil"],
    rows: [
      ["Tier 1: Apex Executive Bremsung", "< 2.0% CER", "16.000+ Pkt. | Combo 30x+", "Perfekte rIFC-STN Hyperdirekt-Hemmung; vollständige Entkopplung von Reizaufblitzung und Muskelkontraktion."],
      ["Tier 2: Fortgeschrittene Hemmung", "2.0% – 4.9% CER", "11.000 – 15.999 Pkt. | Combo 20x+", "Herausragende Trigger-Disziplin; blitzschnelle Erholung von Farbumschaltungen mit minimaler Antizipation."],
      ["Tier 3: Solider Erwachsenenstandard", "5.0% – 9.9% CER", "6.500 – 10.999 Pkt. | Combo 12x+", "Zuverlässige Go-Zieldurchführung mit gelegentlichen Fehlalarmen unter hohem Frequenztakt."],
      ["Tier 4: Moderate Impulsivität", "10.0% – 18.0% CER", "3.000 – 6.499 Pkt. | Combo 6x+", "Erhöhte motorische Voraktivierung; Tendenz zum unwillkürlichen Klick bei Reizbeginn vor Farbüberprüfung."],
      ["Tier 5: Hohe Voraktivierung (Basis)", "> 18.0% CER", "< 3.000 Pkt. | Combo < 6x", "Deutliche Verhaltensimpulsivität; Unfähigkeit, ballistische Fingerbewegungen bei roten No-Go-Signalen zu stoppen."]
    ],
    note: "Diese Richtwerte basieren auf klassischer mentaler Chronometrie und Hemmungsliteratur (Donders, 1868; Logan et al., 1984; Robertson et al., 1997; Aron et al., 2014). Tagesform, Koffeinkonsum und Bildschirmlatenz beeinflussen die Resultate."
  },
  techniques: {
    title: "Methoden zur Optimierung der Impulskontrolle",
    items: [
      {
        name: "Farberkennung vor motorischer Voraktivierung",
        desc: "Helligkeits- und Bewegungssignale erreichen das Sehzentrum vor der vollständigen Farbverarbeitung im Areal V4 (Donders, 1868).",
        tips: "Löse keinen Klick bei bloßer Helligkeitsveränderung aus, sondern warte den Sekundenbruchteil bis zur Bestätigung des grünen Farbtons ab."
      },
      {
        name: "Der Horse-Race Hemmungs-Reset",
        desc: "Wird der Stopp-Prozess initiiert, bevor das Go-Potenzial den Schwellenwert überschreitet, wird die Kontraktion im Rückenmark abgefangen (Logan et al., 1984).",
        tips: "Halte die Handmuskulatur locker und entspannt. Verspannte Beugemuskeln behindern die neuronale Notbremse mechanisch."
      },
      {
        name: "Überwindung automatischer Rhythmen",
        desc: "Serien gleichförmiger Go-Reize verleiten das Gehirn in einen rhythmischen Autopiloten, was zu drastisch erhöhten Fehlalarmen führt (Robertson et al., 1997).",
        tips: "Betrachte jedes Stimulussignal als isoliertes, neues Ereignis und fixiere das Zentrum aufmerksam zwischen den Runden."
      },
      {
        name: "Hardware-Optimierung für minimale Latenz",
        desc: "Bei engen Zeitfenstern von 160 ms verbraucht ein 60-Hz-Display wertvolle Reaktionszeit durch Bildverzögerung (Woods et al., 2015).",
        tips: "Nutze einen 144-Hz- oder 240-Hz-Monitor sowie eine Gaming-Maus mit 1000 Hz Abtastrate, um Bildverzögerungen zu eliminieren."
      }
    ]
  },
  steps: [
    "Klicke auf Drill Starten, um die 45-Sekunden-Go/No-Go-Sitzung zu aktivieren.",
    "Fixiere deinen Blick auf das zentrale Fadenkreuz, wo die Zielscheiben aufblitzen.",
    "Klicke blitzschnell, wenn die grüne Go-Scheibe erscheint, um Punkte und Combo zu sammeln.",
    "Halte den Finger regungslos zurück, wenn die rote No-Go-Scheibe aufleuchtet, um Restraint-Punkte zu sichern.",
    "Analysiere nach Rundenende deine Fehlalarmquote, Reaktionszeit und die erreichte Bewertungsstufe."
  ],
  audience: "Taktische FPS-Spieler (Valorant, CS2, Rainbow Six Siege) zur Verfeinerung der Trigger-Disziplin, Kraftfahrer, Kampfsportler und alle Personen, die ihre exekutive Impulskontrolle stärken möchten.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('donders1868', 'logan1984', 'robertson1997', 'aron2014', 'woods2015'),
  related: [
    { href: "/de/drills/visual/reaction-speed/light-reaction", label: "Licht-Reaktionstest" },
    { href: "/de/drills/visual/depth-perception/distance-judgment", label: "Tiefenwahrnehmung & Distanzurteil" },
    { href: "/de/drills/visual/tracking-accuracy/moving-target", label: "Bewegungsziel-Interzeption" },
    { href: "/de/drills/visual/tracking-accuracy/multiple-targets", label: "Multi-Objekt-Tracking" },
    { href: "/de/drills/visual/tracking-accuracy/pursuit-tracker", label: "Kontinuierlicher Blickfolge-Tracker" },
    { href: "/de/drills/visual/visual-recognition/entropic-grid", label: "Entropisches Gitter-Suchspiel" }
  ]
};

export default function ChromaSyncPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <ChromaSyncClient copy={{ title: "Go/No-Go Impulskontrolle & Reaktionshemmung" }} />
      <DrillGuide guide={goNoGoGuide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/de/drills/visual/reaction-speed/go/no-go" />
      </div>
    </>
  );
}
