import SpatialShiftPursuitClient from '@/app/drills/visual-tracking/spatial-shift-pursuit/SpatialShiftPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// GERMAN SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "spatial shift blickverfolgung" (Spatial shift smooth pursuit) / "koordinatensystem sehtraining"
// Secondary:    "blickfeld verschiebung uebungen", "raeumliche aufmerksamkeit training", "parietallappen blicksteuerung", "bildschirmwackeln aim training"
// LSI / Domain:  "referenzrahmen transformation", "retinotopische zu allozentrische koordinaten",
//               "ballistische neuzentrierung sakkade", "posteriorer parietalkortex ppc", "blickfolge resynchronisation"
// Authentic Domain Terms: Spatial Shift Blickverfolgung (Spatial Shift Pursuit), Koordinatentransformation (Coordinate Transformation), Retinotopischer Referenzrahmen (Retinotopic Frame), Allozentrischer Referenzrahmen (Allocentric Frame), Posteriorer Parietalkortex (Posterior Parietal Cortex / PPC), Sakkadische Reakquisition (Saccadic Re-acquisition)
// ============================================================

export const metadata = {
  title: "Spatial Shift Blickverfolgung – Sehtraining | SkillDrills",
  description: "Kostenloses Sehtraining bei verschobenen Referenzrahmen: Trainiere Koordinatentransformation und Ziel-Reakquisition online direkt im Browser.",
  keywords: [
    "spatial shift blickverfolgung",
    "koordinatensystem sehtraining",
    "blickfeld verschiebung uebungen",
    "raeumliche aufmerksamkeit training",
    "parietallappen blicksteuerung",
    "bildschirmwackeln aim training",
    "referenzrahmen transformation",
    "retinotopische koordinaten",
    "ballistische neuzentrierung sakkade",
    "posteriorer parietalkortex ppc",
    "blickfeldverschiebung test",
    "dynamische raumorientierung augen"
  ],
  openGraph: {
    title: "Spatial Shift Blickverfolgung – Sehtraining | SkillDrills",
    description: "Re-zentriere Ziele bei plötzlichen Blickfeldverschiebungen, Bildschirmwackeln und Kameradrehungen ohne Latenzverlust.",
    type: "website",
    url: "https://skilldrills.online/de/drills/visual-tracking/spatial-shift-pursuit",
    siteName: "SkillDrills",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spatial Shift Blickverfolgung – Sehtraining | SkillDrills",
    description: "Wissenschaftliches Sehtraining zur okulomotorischen Anpassung an abrupte Raumverschiebungen.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/de/drills/visual-tracking/spatial-shift-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/spatial-shift-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://skilldrills.online/de" },
    { "@type": "ListItem", "position": 2, "name": "Übungen", "item": "https://skilldrills.online/de/drills" },
    { "@type": "ListItem", "position": 3, "name": "Visuelles Tracking", "item": "https://skilldrills.online/de/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "Spatial Shift Blickverfolgung & Koordinaten-Remapping", "item": "https://skilldrills.online/de/drills/visual-tracking/spatial-shift-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Spatial Shift Blickverfolgung & Koordinaten-Remapping",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Interaktives browserbasiertes Sehtraining zur Aktivierung parietaler Koordinatentransformationen und zur schnellen Re-Zentrierung von Zielen bei abrupten Raumverschiebungen.",
  "url": "https://skilldrills.online/de/drills/visual-tracking/spatial-shift-pursuit",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online/de" },
  "inLanguage": "de",
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Spatial Shift Tracker (SkillDrills Spatial Shift Pursuit)",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas fähiger Browser (Chrome, Edge, Firefox, Safari)",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "url": "https://skilldrills.online/de/drills/visual-tracking/spatial-shift-pursuit",
  "inLanguage": "de",
  "dateModified": "2026-09-15"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Spatial Shift Aim Training (Spatial Shift Pursuit)",
  "url": "https://skilldrills.online/de/drills/visual-tracking/spatial-shift-pursuit",
  "description": "Aim- und Augentrainingstool für E-Sportler und Athleten zur Beherrschung von Bildschirmwackeln, Trefferschocks und rasanten Blickfeldwechseln.",
  "genre": ["Aim Trainer", "Eye Tracking", "Vision Training", "Esports Drill"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Anleitung zum Training bei räumlichen Blickfeldverschiebungen",
  "description": "Praktischer Trainingsablauf zur Aktivierung des posterioren Parietalkortex für koordinative Remappings bei abrupten Raumverschiebungen.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Stabile Basisverfolgung etablieren",
      "text": "Verfolge das sanft gleitende Ziel im statischen Ausgangs-Koordinatensystem mit kontinuierlicher Blickfolge (Smooth Pursuit)."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Abrupten Referenzrahmen-Shift wahrnehmen",
      "text": "Registriere die plötzliche Raumverschiebung oder Rotation als ganzheitlichen Netzhautschlupf-Impuls."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Ballistische Neuzentrierungssakkade ausführen",
      "text": "Führe eine blitzschnelle, ungeteilte Korrektursakkade direkt auf die neuen Koordinaten des Ziels aus."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Nahtlose Geschwindigkeitsankopplung",
      "text": "Kopple die Augenmuskeln unmittelbar bei Landung an den Geschwindigkeitsvektor des Ziels im neuen Koordinatensystem an."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was versteht man unter Spatial Shift Blickverfolgung und wie unterscheidet sie sich vom Standard-Tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Standard-Tracking erfolgt in einem starren, ruhenden Koordinatensystem. Bei Spatial Shift Pursuit hingegen springt oder rotiert das übergeordnete räumliche Bezugssystem (Reference Frame) unvorhersehbar. Das Netzhautbild verschiebt sich schlagartig, was das Gehirn zwingt, binnen Millisekunden parietale Koordinatentransformationen durchzuführen (Kahlon & Lisberger, 1996)."
      }
    },
    {
      "@type": "Question",
      "name": "Welchen Vorteil bringt dieses Training gegen Bildschirmwackeln (Screen Shake) in Ego-Shootern?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Granatentreffer, Trefferschock (Flinch), heftige 180-Grad-Flicks und Kamera-Rotationen beim Rutschen oder Klettern werfen das Fadenkreuz oft aus der Bahn. Wer Spatial Shifts meistert, lässt sich von Bildschirmerschütterungen nicht desorientieren und stellt den Zielkontakt ohne Zeitverlust wieder her."
      }
    },
    {
      "@type": "Question",
      "name": "Was geschieht bei einer Koordinatentransformation im Gehirn?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Visuelle Reize treffen zunächst als augenzentrierte (retinotopische) Koordinaten ein. Bei Blickfeldverschiebungen sind diese jedoch unbrauchbar. Der posteriore Parietalkortex (PPC) verrechnet Augenstellung und Raumkoordinaten zu kopfzentrierten (kraniotopischen) und weltzentrierten (allozentrischen) Vektoren (Findlay & Gilchrist, 1999)."
      }
    },
    {
      "@type": "Question",
      "name": "Wie verhindert man Desorientierung und Blickverlust im Moment des Raum-Shifts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Anstatt panisch das Display abzusuchen, lernt das Sehsystem, den globalen Verschiebungsvektor des Hintergrunds ganzheitlich zu erfassen und die Augen mit einer einzigen gezielten, ballistischen Sakkade zur neuen Position zu feuern."
      }
    },
    {
      "@type": "Question",
      "name": "Warum ruckelt die Zielverfolgung nach der Landung der Sakkade anfangs oft?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eine Sakkade korrigiert lediglich die Raumposition, überträgt jedoch keine Geschwindigkeitsinformation. Wenn die Augenmuskeln nach dem Blicksprung nicht sofort auf die Zielgeschwindigkeit beschleunigen (Post-saccadic Pursuit Acceleration), reißt der Kontakt sofort wieder ab (Krauzlis, 2004)."
      }
    },
    {
      "@type": "Question",
      "name": "Ist diese visuelle Adaptionsfähigkeit auch im realen Sport (Motorsport, Kampfsport) von Bedeutung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolut. Wenn ein Rennfahrer über Curbs rattert oder ein Kampfsportler nach einem Ausweichmanöver den Gegner sofort wieder fixieren muss, leistet der posteriore Parietalkortex Höchstarbeit bei der räumlichen Stabilisierung des Gesichtsfelds."
      }
    },
    {
      "@type": "Question",
      "name": "Wie lässt sich die Trainingsintensität sinnvoll steigern?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Beginne bei Standardgeschwindigkeit 1.0x mit dem Ziel, die Re-Zentrierungszeit nach einem Shift unter 280 ms zu halten. Steigere danach das Grundtempo auf 1.5x bis 2.5x und aktiviere Rotations-Shifts für maximale kognitive Belastung."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Rolle spielt die Monitor-Latenz bei der Erkennung von Raumverschiebungen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hohe Bildwiederholraten (144 Hz+) und niedrige Pixel-Reaktionszeiten eliminieren Schlieren beim Kamerasprung. Das Gehirn erhält den neuen Ortsvektor um 30 bis 50 ms früher und schärfer übermittelt (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Wie hoch ist das empfohlene tägliche Trainingspensum?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wegen der intensiven Beanspruchung der fronto-parietalen Netzwerke genügen 3 bis 5 Runden à 60 Sekunden (ca. 3 bis 5 Minuten) an 3 bis 4 Tagen pro Woche. Danach sollten die Augen durch Blicke in die Ferne gelockert werden."
      }
    },
    {
      "@type": "Question",
      "name": "Führt kontinuierliches Training zu dauerhaften neuroplastischen Verbesserungen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Synaptische Plastizität im PPC und den frontalen Augenfeldern automatisiert die Koordinatentransformation. Das Sehsystem reagiert im Laufe der Wochen zunehmend reflexartig auf Raumverschiebungen, ohne dass bewusste Denkleistung nötig ist."
      }
    }
  ]
};

const guideProps = {
  heading: "Wissenschaftliche Grundlagen der Spatial-Shift-Blickführung und räumlichen Koordinatenadaption",
  intro: [
    "Das visuelle System des Menschen ist evolutionär nicht für eine starre, bewegungslose Umwelt konstruiert worden. Ob bei rasanten Sprints, Erschütterungen im Fahrzeug oder im wettkampforientierten E-Sport unter heftigem Kamera-Flick und Beschusseffekten – der Bezugsrahmen (Reference Frame) des gesamten Gesichtsfelds kann sich schlagartig verschieben oder rotieren. Unter solchen Extrembedingungen erfordert das Festhalten eines relevanten Ziels im hochauflösenden Sehzentrum (Fovea centralis) eine hochgradig adaptive okulomotorische Leistung: die 'Spatial-Shift-Blickverfolgung (Spatial Shift Adaptive Pursuit)'.",
    "Pionierarbeiten von Findlay & Gilchrist (1999) sowie Kahlon & Lisberger (1996) belegen, dass eintreffende Lichtmuster primär in einem retinotopischen Koordinatensystem (bezogen auf den Mittelpunkt der Netzhaut) verarbeitet werden. Verschiebt sich das Blickfeld sprunghaft, bricht dieser Code zusammen. Der posteriore Parietalkortex (PPC) übernimmt die Aufgabe, retinale Eingangssignale mit Augenstellungs- und vestibulären Rückmeldungen zu verschmelzen und binnen Millisekunden in kopfzentrierte (kraniotopische) und raumfeste (allozentrische) Bezugssysteme umzurechnen (Coordinate Transformation).",
    "Aus dieser recalculierten Raumkarte heraus steuert das Zentralnervensystem eine zweiphasige motorische Sequenz an: Zunächst überbrückt eine ballistische Sakkade (Ballistic Saccade) mit Geschwindigkeiten von bis zu 500°/s die räumliche Distanz zur neuen Position. Unmittelbar bei Landung muss das System dann nahtlos in die kontinuierliche Blickfolge (Smooth Pursuit) übergehen, indem es den Geschwindigkeitsvektor des Zielobjekts im neuen Raumgefüge sofort adaptiert (Krauzlis, 2004; Rashbass, 1961). Ein Versagen an dieser Schnittstelle führt zum totalen Zielverlust.",
    "Dieser Drill (Spatial Shift Pursuit) konfrontiert Athleten und E-Sportler mit unangekündigten Sprüngen und Drehungen des Koordinatenrahmens. Er trainiert die parietalen Remapping-Schaltkreise darauf, selbst bei heftigsten Bilderschütterungen eine unterbrechungsfreie Zielkontrolle zu garantieren."
  ],
  benchmarks: {
    title: "Standard-Benchmarks für Spatial Shift Re-Zentrierung & Koordinaten-Recovery (Spatial Shift Recovery)",
    headers: ["Leistungsstufe", "Re-Zentrierungszeit (ms)", "Räumliche Präzision (%)", "Post-sakkadische Stabilität", "Adaptives Profil"],
    rows: [
      ["Elite", "Unter 220 ms (Blitz-Recovery)", "Über 95%", "Über 96% (Sofortiger Lock-on)", "Vollständige parietale Remapping-Automatisierung"],
      ["Meister", "220 ms – 280 ms", "88% – 94%", "90% – 95%", "Hervorragende Adaption, kaum Irritation bei Shifts"],
      ["Diamant", "281 ms – 360 ms", "78% – 87%", "80% – 89%", "Solide Reakquisition, leichte Latenz bei Rotation"],
      ["Gold", "361 ms – 450 ms", "65% – 77%", "68% – 79%", "Spürbare Desorientierung, verzögerte Blickfolge"],
      ["Basis", "Über 450 ms", "Unter 65%", "Unter 68%", "Verlust des Referenzrahmens, Ziel driftet ab"]
    ],
    note: "※ Messwerte basieren auf standardisierten Tests bei 1080p Auflösung und Geschwindigkeit 1.0x–1.5x bei zufälligen Raumverschiebungen. Bewertet wird die Latenz bis zur Wiederherstellung der fovealen Zentrierung."
  },
  techniques: {
    title: "Vier Kernstrategien zur Beherrschung abrupter Raumverschiebungen",
    items: [
      {
        name: "Parietales Koordinaten-Remapping (PPC Coordinate Remapping)",
        desc: "Konzentriere dich im Moment des Shifts nicht auf das einzelne Objekt, sondern erfasse den globalen Verschiebungsvektor des Hintergrunds. Das Gehirn verschiebt dadurch die interne Raumkarte parallel und leitet das Auge zielsicher.",
        tips: "Frage dich nicht 'Wo ist der Punkt hin?', sondern spüre 'Wohin ist der gesamte Raum gesprungen?'."
      },
      {
        name: "Entschlossene ballistische Neuzentrierung (Ballistic Re-Centering)",
        desc: "Führe nach Erkennung der neuen Lage eine kompromisslose Sakkade aus. Jedes Zögern erzeugt mehrstufige Korrektursprünge, die wertvolle Reaktionszeit kosten.",
        tips: "Schlage den Blick wie einen Peitschenhieb präzise auf die neuen Koordinaten."
      },
      {
        name: "Post-sakkadische Geschwindigkeitskopplung (Pursuit Handshake)",
        desc: "Stoppe die Augenmuskeln bei Zielankunft nicht ab. Gleite im Moment der Landung direkt in die Bewegungsrichtung des Ziels hinein, um die Verfolgung ohne Unterbrechung fortzusetzen.",
        tips: "Lande nicht auf dem Ziel wie ein Stein, sondern wie ein Skifahrer, der mit vollem Schwung in die Spur gleitet."
      },
      {
        name: "Visueller Rotations-Anker (Rotational Anchor Shield)",
        desc: "Wenn die Verschiebung mit einer Drehung einhergeht, kann das Gleichgewichtsgefühl kurz irritiert werden. Fixiere mental das Zentrum des Displays als neutrale Achse, um die Orientierung stabil zu halten.",
        tips: "Halte im Hinterkopf stets die Raummitte als ruhenden Pol verankert."
      }
    ]
  },
  steps: [
    "Arbeitsplatz ausrichten: Nimm eine zentrierte Position in ca. 60 cm Sehabstand ein und fixiere den Kopf in entspannter Haltung.",
    "Basis-Verfolgung starten: Starte die Übung und nimm das gleichmäßig gleitende Ziel im Ruhesystem foveal auf.",
    "Sofortige Shift-Reaktion: Sobald der Rahmen abrupt verspringt, aktiviere die parietale Raumkarte und führe eine Re-Zentrierungssakkade aus.",
    "60 Sekunden adaptive Konzentration: Meistere eine Serie stochastischer Raumverschiebungen, ohne den fovealen Kontakt dauerhaft zu verlieren.",
    "Auswertung analysieren: Überprüfe die durchschnittliche Wiederherstellungszeit (ms) und deine Genauigkeitswerte zur Dokumentation deiner Anpassungsleistung."
  ],
  audience: "E-Sportler in actionreichen Titeln (Apex Legends, Valorant, Call of Duty) zur Beherrschung von Screen Shake und Flinch, Athleten in Kontaktsportarten und Motorsport bei Erschütterungen und raschen Körperdrehungen, sowie Gamer zur Maximierung ihrer visuellen Re-Zentrierungsgeschwindigkeit.",
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('krauzlis2004', 'findlay1999', 'robinson1965', 'rashbass1961', 'kahlon1996', 'woods2015'),
  related: [
    { href: "/de/drills/visual-tracking/constant-slow-pursuit", label: "Konstantes langsames Blickfolgetraining (Constant Slow)" },
    { href: "/de/drills/visual-tracking/directional-chaos-pursuit", label: "Richtungs-Chaos Blickverfolgung (Directional Chaos)" },
    { href: "/de/drills/visual-tracking/dynamic-evasion-pursuit", label: "Dynamische Ausweich-Blickverfolgung (Dynamic Evasion)" },
    { href: "/de/drills/visual-tracking/ghosting-suppress-pursuit", label: "Nachbild-Unterdrückung Blickverfolgung (Ghosting Suppress)" },
    { href: "/de/drills/visual-tracking/infinity-pursuit", label: "Liegende Acht Augentraining (Infinity)" },
    { href: "/de/drills/visual-tracking/predictive-pursuit", label: "Prädiktive Blickführung (Predictive Pursuit)" }
  ]
};

export default function GermanSpatialShiftPursuitPage() {
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

      <SpatialShiftPursuitClient
        copy={{
          title: "Spatial Shift Blickverfolgung & Koordinaten-Remapping: Reaktive Blickadaption",
          subtitle: "Synchronisation des posterioren Parietalkortex auf abrupte Verschiebungen des Referenzrahmens",
          description: "Kostenloses Online-Augentraining bei dynamisch verschobenen und rotierenden Referenzrahmen. Trainiere den posterioren Parietalkortex (PPC) zur blitzschnellen Koordinatentransformation und Ziel-Reakquisition bei Bildschirmwackeln und Trefferschocks. Sofort im Browser ohne Registrierung."
        }}
      />

      <DrillGuide guide={guideProps} />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/de/drills/visual-tracking/spatial-shift-pursuit" />
      </div>
    </>
  );
}
