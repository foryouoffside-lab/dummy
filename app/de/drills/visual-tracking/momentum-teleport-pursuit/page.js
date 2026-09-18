import MomentumTeleportPursuitClient from '@/app/drills/visual-tracking/momentum-teleport-pursuit/MomentumTeleportPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// GERMAN SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "sprungziel tracking training" (Jump target tracking) / "sakkadische reakquisition"
// Secondary:    "ziel neuzentrierung sehtraining", "antizipatives tracking training", "schnelle blickspruenge uebung"
// LSI / Domain:  "augentraining blicksakkaden", "teleport zielverfolgung", "post-sakkadische folgebewegung",
//               "foveale neuzentrierung blick", "blickmotorik traegheit", "fps teleport blickziel"
// Authentic Domain Terms: Sprungziel Tracking（Jump Target Tracking）, Sakkadische Reakquisition（Saccadic Re-acquisition）, Trägheitserhaltung（Momentum Preservation）, Sakkadische Suppression（Saccadic Suppression）, Post-sakkadische Folgebewegung（Post-saccadic Smooth Pursuit）, Ballistischer Blicksprung（Ballistic Saccade）
// ============================================================

export const metadata = {
  title: "Sprungziel Tracking Training – Momentum | SkillDrills",
  description: "Kostenloses Sprungziel-Tracking: Trainiere blitzschnelle Sakkadensprünge zur Reakquisition teleportierender Ziele und Geschwindigkeitsanpassung im Browser.",
  keywords: [
    "sprungziel tracking training",
    "sakkadische reakquisition",
    "ziel neuzentrierung sehtraining",
    "antizipatives tracking training",
    "schnelle blickspruenge uebung",
    "augentraining blicksakkaden",
    "teleport zielverfolgung",
    "post-sakkadische folgebewegung",
    "foveale neuzentrierung blick",
    "blickmotorik traegheit",
    "fps teleport blickziel",
    "dynamische blickreaktion test"
  ],
  openGraph: {
    title: "Sprungziel Tracking Training – Momentum | SkillDrills",
    description: "Trainiere blitzschnelle Sakkadensprünge zur Reakquisition teleportierender Ziele und stufenlose Geschwindigkeitsanpassung unter Trägheitserhaltung.",
    type: "website",
    url: "https://skilldrills.online/de/drills/visual-tracking/momentum-teleport-pursuit",
    siteName: "SkillDrills",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sprungziel Tracking Training – Momentum | SkillDrills",
    description: "Sprungziel Tracking: Trainiere blitzschnelle Sakkadensprünge und sofortige Geschwindigkeitsanpassung bei teleportierenden Objekten.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/de/drills/visual-tracking/momentum-teleport-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/momentum-teleport-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://skilldrills.online/de" },
    { "@type": "ListItem", "position": 2, "name": "Übungen", "item": "https://skilldrills.online/de/drills" },
    { "@type": "ListItem", "position": 3, "name": "Visuelle Blickverfolgung", "item": "https://skilldrills.online/de/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "Sprungziel Tracking Training – Sakkadische Reakquisition", "item": "https://skilldrills.online/de/drills/visual-tracking/momentum-teleport-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Sprungziel Tracking Training – Sakkadische Reakquisition",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Kostenloses interaktives Blickverfolgungstraining zur Schulung ballistischer Sakkaden und post-sakkadischer Folgebewegungen auf teleportierende Ziele.",
  "url": "https://skilldrills.online/de/drills/visual-tracking/momentum-teleport-pursuit",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online/de" },
  "inLanguage": "de",
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Sprungziel Tracking Training – Sakkadische Reakquisition & Antizipative Blickführung | SkillDrills",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas-fähiger Webbrowser (Chrome, Edge, Firefox, Safari)",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "url": "https://skilldrills.online/de/drills/visual-tracking/momentum-teleport-pursuit",
  "inLanguage": "de",
  "dateModified": "2026-09-15"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Sprungziel Tracking Training – Sakkadische Reakquisition",
  "url": "https://skilldrills.online/de/drills/visual-tracking/momentum-teleport-pursuit",
  "description": "Reaktives Eye-Tracking-Spiel: Verfolge trägheitsbehaftete Ziele, die blitzschnell im Raum springen, und zentriere die Fovea unmittelbar nach der Sakkade neu.",
  "genre": ["Action", "Brain Game", "Eye Tracking", "Vision Training"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Anleitung zum Sprungziel-Tracking (Sakkaden-Reakquisition)",
  "description": "Vierstufiges Vorgehen zur Konditionierung schneller Blicksprünge und sofortiger post-sakkadischer Geschwindigkeitsanpassung.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Kopfhaltung fixieren und frontale Distanz einnehmen",
      "text": "Nimm einen stabilen Abstand von 50 bis 70 cm frontal zum Display ein. Halte Kopf und Hals absolut regungslos, um die Blickmotorik rein über die äußeren Augenmuskeln zu steuern.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/momentum-teleport-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Testdauer und Basisgeschwindigkeit festlegen",
      "text": "Wähle eine Rundenzeit (30 bis 120 Sekunden) und die Zielgeschwindigkeit (0,5x bis 9,0x). Starte bei 1,0x, um den Übergang von Sakkade zu Folgebewegung sicher zu beherrschen.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/momentum-teleport-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Ballistischer Blicksprung auf den Teleportationsort",
      "text": "Verfolge das Ziel foveal in seiner Bewegung. Teleportiert das Ziel abrupt an eine neue Koordinate, führe unverzüglich eine direkte ballistische Sakkade auf das neue Zielzentrum aus.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/momentum-teleport-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Post-sakkadische Trägheitssynchronisation und Latenzanalyse",
      "text": "Passe die Augengeschwindigkeit am Landepunkt sofort an den erhaltenen Geschwindigkeitsvektor an. Werte die Reakquisitionslatenz und eventuelles Überschießen (Overshoot) aus.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/momentum-teleport-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was bezweckt das Sprungziel-Tracking-Training (Momentum Teleport Pursuit)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dieses Training konditioniert das nahtlose Zusammenspiel zweier getrennter motorischer Teilsysteme: Einerseits der ballistischen Sakkadierung zur Überbrückung plötzlicher Raumdistanzen (Positionssprünge) und andererseits der sofortigen glatten Augenfolgebewegung (Smooth Pursuit), um die beibehaltene Trägheitsgeschwindigkeit des Ziels am Landepunkt verzögerungsfrei aufzunehmen."
      }
    },
    {
      "@type": "Question",
      "name": "Warum ist das Verfolgen teleportierender Ziele schwieriger als Standard-Tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bei kontinuierlicher Bewegung kann das Kleinhirn den Pfad stufenlos extrapolieren. Teleportiert ein Ziel jedoch instantan, bricht die räumliche Kontinuität ab. Das Gehirn muss die bisherige Blickbewegung schlagartig abbremsen, einen hochpräzisen Neuausrichtungs-Blicksprung berechnen und im selben Sekundenbruchteil die Geschwindigkeitsinformation für das post-sakkadische Tracking abrufen."
      }
    },
    {
      "@type": "Question",
      "name": "Wie greifen Sakkade (Blicksprung) und Smooth Pursuit (Folgebewegung) hier ineinander?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rashbass (1961) wies nach, dass Positionsfehler und Geschwindigkeitsfehler neurologisch getrennt verarbeitet werden. Die Sakkade eliminiert den Positionsfehler in ca. 20 bis 40 ms Flugzeit. Noch während der Landung aktiviert das Kleinhirn über fronto-striatale Bahnen den Pursuit-Antrieb, damit die Fovea nicht auf dem Landepunkt stehenbleibt, sondern sofort mit dem Ziel mitgleitet."
      }
    },
    {
      "@type": "Question",
      "name": "Stimmt es, dass man während des Blicksprungs für Sekundenbruchteile blind ist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Dieses Phänomen nennt sich sakkadische Suppression (Saccadic Suppression). Während sich der Augapfel mit bis zu 500°/s dreht, unterdrückt der visuelle Kortex die sensorische Wahrnehmung aktiv, um ein unerträgliches Wischen und Verschwimmen des Bildes zu verhindern. Erst im Moment des Aufsetzens steht die volle Sehschärfe wieder zur Verfügung."
      }
    },
    {
      "@type": "Question",
      "name": "Warum neigt der Blick beim Eintreffen am neuen Zielort zum Überschießen (Overshoot)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein Überschießen tritt auf, wenn der von den pontinen Kernen generierte Beschleunigungsimpuls für die Distanz zu groß bemessen war oder der Gegenimpuls (Bremspuls der Antagonisten-Muskeln) verspätet feuert. Durch gezieltes Training kalibriert das Kleinhirn die Sakkadenamplitude millimetergenau nach."
      }
    },
    {
      "@type": "Question",
      "name": "Welchen Nutzen hat diese Übung für Shooter wie Apex Legends, Overwatch oder Valorant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gegner nutzen Fähigkeiten wie Dash, Blink, Jump-Pads oder Teleporter (z. B. Tracer, Jett, Wraith), um Visierlinien zu brechen. Spieler ohne spezifisches Reakquisitionstraining stoppen ihr Fadenkreuz nach dem Flick oft völlig ab. Diese Übung schult den direkten Übergang vom Snap-Flick in ein magnetisches Tracking ohne Reaktionspause."
      }
    },
    {
      "@type": "Question",
      "name": "Was tun, wenn das Auge nach dem Teleport zu langsam hinter dem Ziel herhinkt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dies geschieht, wenn der visuelle Kortex erst nach dem Aufsetzen abwartet, bis das Ziel wieder sichtbar loswandert. Da neuronale Feedbackschleifen ca. 100 ms benötigen, bist du dann stets zu spät. Speichere die Bewegungsrichtung vor dem Teleport mental im sensorischen Cache und beschleunige den Blick bereits vorwegnehmend am Landepunkt."
      }
    },
    {
      "@type": "Question",
      "name": "Welchen Einfluss haben Bildwiederholrate (Hz) und Input-Lag auf die Zielreakquisition?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bei 60 Hz vergehen bis zu 16,7 ms, bevor das Ziel nach dem Sprung überhaupt gerendert wird. 144-Hz- oder 240-Hz-Monitore halbieren bzw. vierteln diese Latenz und minimieren Schlieren, wodurch die Fovea das Zielzentrum wesentlich früher lokalisieren und arretieren kann."
      }
    },
    {
      "@type": "Question",
      "name": "Wie lange sollte eine Trainingseinheit dauern und wie sehen optimale Pausen aus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vier bis sechs Durchgänge à 60 Sekunden mit jeweils 30 bis 45 Sekunden Pause sind optimal. Die maximale Kontraktionskraft der Augenmuskeln bei ballistischen Sprüngen verbraucht rasch Glykogen. Bei Anzeichen von Konzentrationsabfall sollte das Training beendet werden."
      }
    },
    {
      "@type": "Question",
      "name": "Was tun bei muskulärer Überanstrengung oder Schläfendruck während schneller Blicksprünge?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dies rührt von Verspannungen der äußeren Augenmuskeln und einer unbewussten Verkrampfung der Nacken- oder Kiefermuskulatur her. Beende die Übung, reibe deine Handflächen warm und lege sie sanft für 30 Sekunden über die geschlossenen Augen (Palming), um den okulomotorischen Tonus zu senken."
      }
    }
  ]
};

const guideProps = {
  heading: "Sprungziel Tracking & Sakkadische Reakquisition: Neurophysiologische Standards",
  intro: [
    "Das Sprungziel-Tracking mit Trägheitserhaltung (Momentum Teleport Pursuit) ist eine hochentwickelte okulomotorische Diagnostik- und Trainingsaufgabe. Hierbei bewegt sich ein Target mit stetigem Geschwindigkeitsvektor im Raum und teleportiert plötzlich und unangekündigt an eine räumlich versetzte Koordinate. Das menschliche visuelle System wird gezwungen, eine ballistische Weitwinkel-Sakkade zur sofortigen Fovea-Neuzentrierung abzufeuern und am Zielpunkt nahtlos in eine glatte Augenfolgebewegung (Smooth Pursuit) überzugehen, die der beibehaltenen Zielgeschwindigkeit exakt entspricht (Rashbass, 1961; Findlay & Walker, 1999).",
    "Trennung und Verschaltung von Positions- und Geschwindigkeitsregelkreisen: Die bahnbrechenden Arbeiten von Rashbass (1961) demonstrierten, dass das okulomotorische System Positionsfehler (räumlicher Versatz auf der Netzhaut) und Geschwindigkeitsfehler (Retinal Slip) über strikt getrennte kortikale Netzwerke verarbeitet. Positionsfehler aktivieren die Colliculi superiores und das frontale Augenfeld (FEF) zur Generation eines pulsförmigen Sakkadenbefehls. Geschwindigkeitsfehler hingegen durchlaufen die Areale MT/MST und das pontine Moosfasersystem zum Kleinhirn. Beim Teleportieren muss das Gehirn beide Programme im Millisekundentakt verketten: Der Sakkadenbremspuls muss punktgenau in den Geschwindigkeits-Pursuit-Puls übergehen (Krauzlis, 2004).",
    "Sakkadische Suppression und zerebelläre Trägheitsrepräsentation: Während des ballistischen Blicksprungs, der Geschwindigkeiten von bis zu 500 Grad pro Sekunde erreicht, setzt die sakkadische Suppression ein – eine zentrale Dämpfung visueller Reize zur Verhinderung von Bewegungsunschärfe (Bahill et al., 1980). Landet der Blick am neuen Zielpunkt, steht dem Sehsystem zunächst kein Echtzeit-Feedback über die Zielgeschwindigkeit zur Verfügung, da die sensorische Reizweiterleitung rund 100 bis 130 ms beansprucht. Um ein Abreißen des Blicks zu verhindern, muss das Kleinhirn den vor dem Sprung erfassten Geschwindigkeitsvektor in einem prädiktiven internen Modell konservieren (Velocity Memory Cache) und die Augenmuskeln antizipativ beschleunigen (Barnes, 2008).",
    "Bedeutung für professionellen E-Sport und reaktive Zielsicherheit: In modernen kompetitiven Shootern wie Apex Legends, Overwatch oder Call of Duty führen abrupte Bewegungsausbrüche wie Teleports, Dashes oder Slidings zu einem abrupten Abbruch visueller Linien. Konventionelle Zielerfassung scheitert hier oft am sogenannten 'Post-Flick-Freeze', bei dem das Fadenkreuz nach dem Blicksprung für Sekundenbruchteile regungslos verharrt. Dieses Training schließt diese Reaktionslücke: Es konditioniert das Nervensystem darauf, nach jeder ruckartigen Neuausrichtung ansatzlos in ein flüssiges, klebendes Tracking überzugehen (Woods et al., 2015)."
  ],
  benchmarks: {
    title: "Teleport-Reakquisitions- und Trägheitsmetriken (Teleport Re-acquisition Benchmarks)",
    headers: ["Leistungsstufe", "Reakquisitions-Latenz (Zielneuzentrierung)", "Lande-Oberschwingung (Overshoot)", "Trägheitssynchronisation (Velocity Match)", "Neurophysiologisches Profil"],
    rows: [
      ["Elite (Profi-Aiming & E-Sport)", "< 140 ms", "< 3% (punktgenaue Arretierung)", "97%+", "Exzellente ballistische Präzision. Unmittelbare Trägheitssynchronisation am Landepunkt ohne jegliches Nachzittern"],
      ["Fortgeschritten (Wettkampf-Level)", "140 – 180 ms", "3% – 6%", "91% – 96%", "Sehr rasche Zielreakquisition. Minimalste Korrektur nach der Landung; hohe post-sakkadische Spurtreue"],
      ["Kompetent (Gesunde Erwachsene)", "181 – 240 ms", "7% – 14%", "80% – 90%", "Solider Standardbereich. Kurze sensorische Refraktärzeit nach der Sakkade, gefolgt von stabiler Nachführung"],
      ["Aufbauend (Erhöhte Latenz)", "241 – 320 ms", "15% – 24%", "68% – 79%", "Spürbare Verzögerung beim Auslösen des Blicksprungs. Häufiges Überschießen und wiederholter Zielverlust"],
      ["Basis / Förderbedarf", "> 320 ms", "> 24%", "< 68%", "Überforderung bei Raumdistanzsprüngen. Zervikale Ausgleichsbewegungen; Grundlagenübung für Blickmotorik ratsam"]
    ],
    note: "※ Die Referenzdaten basieren auf okulomotorischen Messungen bei 50–70 cm Betrachtungsabstand und Geschwindigkeiten von 1,0x bis 2,0x über 60 Sekunden Testzeit. Die Reakquisitionslatenz misst das Intervall vom Teleportationszeitpunkt bis zum Eintreffen der Fovea auf den neuen Koordinaten."
  },
  techniques: {
    title: "Vier essenzielle Techniken für blitzschnelle Zielreakquisition",
    items: [
      {
        name: "Direkte ballistische Flugbahn ohne Krümmung (Direct Ballistic Projection)",
        desc: "Führe den Blicksprung auf die neue Koordinate als kürzeste lineare Verbindungslinie aus. Findlay & Walker (1999) betonen, dass jede zögerliche bogenförmige Suchbewegung die Latenz dramatisch verlängert.",
        tips: "Fokussiere dich nicht auf den Zwischenraum, sondern 'wirf' deinen Blick entschlossen direkt auf den peripher wahrgenommenen Lichtpunkt."
      },
      {
        name: "Mentale Konservierung des Geschwindigkeitsvektors (Velocity Vector Caching)",
        desc: "Das Ziel ändert zwar sprunghaft seine Position, behält jedoch Betrag und Richtung seiner Geschwindigkeit bei. Nutze das interne Vorwärtsmodell nach Barnes (2008) und halte den Geschwindigkeitsvektor aktiv im Arbeitsspeicher.",
        tips: "Lass dein Gehirn nicht annehmen, das Ziel sei zum Stillstand gekommen – erwarte das Weitergleiten am Landepunkt."
      },
      {
        name: "Antizipatives Vorhalten während der Sakkadenflugzeit (Anticipatory Landing Lead)",
        desc: "Da die Sakkade 20 bis 40 ms Flugzeit beansprucht, wandert das Ziel in dieser Zeit bereits weiter. Ziele deshalb nicht starr auf den Teleportationspunkt, sondern setze deinen Blick minimal vor die erwartete Zielposition auf.",
        tips: "Ein minimaler Vorhaltewinkel von wenigen Pixeln verhindert, dass du dem Ziel nach der Landung hinterherhinkst."
      },
      {
        name: "Reine okulomotorische Entkopplung ohne Kopfbewegung (Cervical Motion Isolation)",
        desc: "Große Winkelsprünge verleiten intuitiv zum Mitreißen des Kopfes. Leigh & Zee (2015) zeigen, dass Kopfbewegungen den VOR aktivieren und die Foveazentrierung destabilisieren. Fixiere dein Kinn bewusst.",
        tips: "Stütze die Kinnspitze mit den Fingern ab, um sicherzustellen, dass ausschließlich die Augäpfel beschleunigen."
      }
    ]
  },
  steps: [
    "Nimm eine aufrechte Sitzhaltung in 50 bis 70 cm Distanz ein und halte den Kopf vollkommen ruhig.",
    "Wähle Testdauer (30 bis 120 Sekunden) und Geschwindigkeitsmultiplikator (0,5x bis 9,0x).",
    "Fixiere das wandernde Ziel im Foveazentrum und folge seiner linearen Flugbahn.",
    "Teleportiert das Ziel, springe unverzüglich mit einer geradlinigen Sakkade auf die neue Position.",
    "Gleite am Landepunkt ansatzlos in die Folgebewegung über und analysiere abschließend deine Latenzwerte."
  ],
  audience: "FPS-Gamer (Apex Legends, Overwatch, Valorant, CS2), Ballsportler zur Antizipation unvorhersehbarer Abpraller sowie alle Personen, die schnelle Blicksakkaden und Reaktionspräzision trainieren wollen.",
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('rashbass1961', 'bahill1980', 'findlay1999', 'krauzlis2004', 'barnes2008', 'woods2015'),
  related: [
    { href: "/de/drills/visual-tracking/constant-slow-pursuit", label: "Glatte Augenfolgebewegung (Constant Slow)" },
    { href: "/de/drills/visual-tracking/directional-chaos-pursuit", label: "Chaotische Blickverfolgung (Directional Chaos)" },
    { href: "/de/drills/visual-tracking/dynamic-evasion-pursuit", label: "Reaktives Tracking Training (Dynamic Evasion)" },
    { href: "/de/drills/visual-tracking/ghosting-suppress-pursuit", label: "Fixationsstabilität Sehtraining (Ghosting Suppress)" },
    { href: "/de/drills/visual-tracking/infinity-pursuit", label: "Liegende Acht Augentraining (Infinity)" },
    { href: "/de/drills/visual-tracking/predictive-pursuit", label: "Prädiktives Tracking (Predictive)" }
  ]
};

export default function GermanMomentumTeleportPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <MomentumTeleportPursuitClient
        copy={{
          title: "Sprungziel Tracking Training: Sakkadische Reakquisition und Trägheitserhaltung",
          subtitle: "Kombinierte Diagnostik aus ballistischer Sakkade und post-sakkadischer Folgebewegung (Smooth Pursuit)",
          description: "Dynamisches Augentraining auf Ziele, die sich mit Geschwindigkeitsvektoren bewegen und abrupt über den Bildschirm teleportieren. Schulung des Zusammenspiels zwischen ballistischer Sakkadierung (Positionssprung) und post-sakkadischer Folgebewegung (Geschwindigkeitsanpassung) nach Rashbass (1961) und Findlay & Walker (1999). Konditioniert die sofortige foveale Neuzentrierung nach sakkadischer Suppression und die zerebelläre Trägheitsrepräsentation (Barnes, 2008). Kostenlos im Webbrowser."
        }}
      />

      <DrillGuide guide={guideProps} />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/de/drills/visual-tracking/momentum-teleport-pursuit" />
      </div>
    </>
  );
}
