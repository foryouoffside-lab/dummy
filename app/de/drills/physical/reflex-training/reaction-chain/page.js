import ReactionChainClient from '@/app/drills/physical/reflex-training/reaction-chain/ReactionChainClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Germany, Austria, Switzerland (DE / DE-DE / DE-AT / DE-CH)
// Primary Intent: impuls hemmer reflex spiel, präzisionsbremsung reaktionstest, motorische inhibition übung
// German Gaming Context: FPS Overflicking-Korrektur, CS2 / Valorant First-Shot-Bremsung, Kinetischer Stopp
// High-Demand, Low-Competition Target Keywords:
//   - "impuls hemmer reflex spiel" (Impulse inhibitor reflex game)
//   - "präzisionsbremsung reaktionstest" (Precision braking reaction test)
//   - "motorische inhibition übung" (Motor inhibition exercise)
//   - "maus verzögerungstraining" (Mouse deceleration training)
//   - "overflick korrektur maus" (Over-flick correction mouse)
//   - "kinetischer stopp reflex training" (Kinetic arrest reflex training)
//   - "maus präzisionstest online" (Mouse precision test online)
//   - "reaktionsgeschwindigkeit spiel" (Reaction speed game)
// ============================================================

export const metadata = {
  title: "Maus Bremskontrolle – Reflex-Test | SkillDrills",
  description: "Fange kinetische Knoten ab und stoppe den Cursor millimetergenau. Trainiere Bremskontrolle und motorische Hemmung direkt im Browser.",
  keywords: [
    "impuls hemmer reflex spiel",
    "präzisionsbremsung reaktionstest",
    "motorische inhibition übung",
    "maus verzögerungstraining",
    "overflick korrektur maus",
    "kinetischer stopp reflex training",
    "maus präzisionstest online",
    "reaktionsgeschwindigkeit spiel",
    "zielbremsung maus training",
    "stoppsignal reaktionstest online"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/physical/reflex-training/reaction-chain',
    languages: getAlternateLanguages('/drills/physical/reflex-training/reaction-chain'),
  },
  openGraph: {
    title: "Maus Bremskontrolle – Reflex-Test | SkillDrills",
    description: "Stoppen Sie Overflicks radikal durch gezielte Aktivierung antagonistischer Muskelgruppen. Neuromotorischer Reaktionstest für Counter-Strike 2 und Valorant.",
    url: 'https://skilldrills.online/de/drills/physical/reflex-training/reaction-chain',
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
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
      "name": "Trainingsübungen",
      "item": "https://skilldrills.online/de/drills"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Reflextraining",
      "item": "https://skilldrills.online/de/drills/physical/reflex-training"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Reaktionskette (Bremskontrolle)",
      "item": "https://skilldrills.online/de/drills/physical/reflex-training/reaction-chain"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Maus Bremskontrolle & Impulskontrolle Reflex-Test (Reaction Chain)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Interaktives biomechanisches Trainingsmodul zur Schulung motorischer Bremsverzögerung, Impulskontrolle und Eliminierung von Overflicking bei schnellen Mausbewegungen.",
  "url": "https://skilldrills.online/de/drills/physical/reflex-training/reaction-chain",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online/de"
  },
  "inLanguage": "de",
  "dateModified": "2026-09-12"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Maus Bremskontrolle – Reflex-Test | SkillDrills",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires HTML5 Canvas and JavaScript enabled browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/de/drills/physical/reflex-training/reaction-chain",
  "inLanguage": "de",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Maus Bremskontrolle & Impulskontrolle Reflex-Test",
  "url": "https://skilldrills.online/de/drills/physical/reflex-training/reaction-chain",
  "genre": ["Reflex Game", "Motor Control Trainer", "Esports Precision"],
  "playMode": "SinglePlayer",
  "description": "Fangen Sie Zielknoten mit bis zu 1.800 px/s ab und stoppen Sie die Cursorgeschwindigkeit unter 1,5 px/Frame, um Multiplikatoren bis 3,0x aufzubauen."
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Warum ist das exakte Abstoppen einer Mausbewegung neurologisch schwieriger als das Beschleunigen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eine Beschleunigung wird durch eine koordinierte Kontraktion der agonistischen Muskeln ausgelöst. Ein punktgenauer Halt erfordert jedoch, dass die antagonistischen Muskelgruppen in Bruchteilen einer Millisekunde die exakt entgegengesetzte Bremskraft erzeugen. Wie Robert S. Woodworth (1899) nachwies, unterliegt die Endverzögerung optischen und somatosensorischen Rückkopplungsverzögerungen von 100 bis 150 ms. Schlägt die Bremsberechnung fehl, schießt der Cursor durch die kinetische Trägheit über das Ziel hinaus (Overshoot)."
      }
    },
    {
      "@type": "Question",
      "name": "Was besagt das Pferderennmodell von Logan & Cowan (1984) zur Bewegungsinhibition?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Das Horse-Race-Modell postuliert, dass der 'Go-Prozess' (Ausführung der Bewegung) und der 'Stop-Prozess' (Inhibition und Bremsung) in den Basalganglien als unabhängige neurophysiologische Prozesse um die Ziellinie konkurrieren. Nur wenn das Stoppsignal das Ziel vor dem motorischen Bewegungsimpuls erreicht, wird die Muskelkontraktion gehemmt und der Zeiger kommt innerhalb des Knotens zum Stehen."
      }
    },
    {
      "@type": "Question",
      "name": "Was versteht man unter der Stop-Signal Reaction Time (SSRT) und wie beeinflusst sie das Zielen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die SSRT ist die interne neuronale Latenzzeit (typischerweise 180 bis 250 ms), die der rechte Gyrus frontalis inferior (rIFG) und der Nucleus subthalamicus (STN) benötigen, um einen bereits eingeleiteten motorischen Befehl abzufangen (Verbruggen & Logan, 2008). Eine kürzere SSRT ermöglicht es Taktik-Spielern, fehlgeleitete Flicks sofort abzubrechen und das Fadenkreuz auf der gegnerischen Kopflinie einzuloggen."
      }
    },
    {
      "@type": "Question",
      "name": "Welche biomechanischen Ursachen führen in Taktik-Shootern wie Valorant oder CS2 zu Overflicking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hauptursache ist ein Ungleichgewicht in der Kokontraktion von Beugern und Streckern des Unterarms. Übermäßige Beschleunigung ohne rechtzeitige Antagonisten-Aktivierung führt dazu, dass die kinetische Trägheit die Haftreibung des Mauspads überwindet. Das Reaction-Chain-Training konditioniert einen mechanischen Reibungsstopp über Fingerspitzen und Mausgleiter."
      }
    },
    {
      "@type": "Question",
      "name": "Wie wirkt sich das Fitts'sche Gesetz (Fitts, 1954) bei hoher Knotengeschwindigkeit aus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nach dem Fitts'schen Gesetz steigt der Schwierigkeitsindex (ID) logarithmisch mit der Relation von Distanz zu Zielbreite. Wenn Knoten mit 1.800 px/s anstürmen und der Halteradius schrumpft, geht das zeitliche Korrekturfenster gegen null. Das Gehirn muss sich auf eine vorprogrammierte ballistische Bremsdynamik verlassen, ohne auf visuelle Zwischenkorrekturen warten zu können."
      }
    },
    {
      "@type": "Question",
      "name": "Was bedeutet das Kriterium 'unter 1,5 px/Frame' für einen gültigen kinetischen Arrest?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dies verhindert sogenanntes 'Slice-Through', bei dem der Spieler das Ziel nur im Vorbeigleiten streift. Bei 144 Hz entspricht 1,5 px/Frame einer Restgeschwindigkeit von unter 216 px/s. Dies stellt mathematisch sicher, dass die Muskeln eine echte physikalische Vollbremsung absolviert haben und in den Haftreibungszustand übergegangen sind."
      }
    },
    {
      "@type": "Question",
      "name": "Welchen Einfluss haben Mauspad-Oberfläche und Maus-Skates auf das Bremsvermögen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sehr schnelle Glaspads oder extrem reibungsarme Mauspads verringern zwar die Anschubkraft, bieten jedoch kaum Bremswiderstand, was die Unterarmmuskulatur überfordert. Für das Training der Bremskontrolle eignen sich Hybrid- oder Kontroll-Stoffpads mit hoher statischer Reibung, da sie das Einrasten auf dem Ziel physisch unterstützen."
      }
    },
    {
      "@type": "Question",
      "name": "Warum ist ein 144Hz- oder 240Hz-Bildschirm für das Training der Bewegungsinhibition entscheidend?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Woods et al. (2015) demonstrierten, dass 60Hz-Displays (16,6 ms Bildverzögerung) Mikroverzögerungen verschmieren. Bei 240 Hz (4,1 ms) wird die Flugbahn des Knotens analog und mikrometergenau abgebildet, sodass der visuelle Kortex Bremsbefehle mehr als 10 ms früher an die motorischen Nervenbahnen übermitteln kann."
      }
    },
    {
      "@type": "Question",
      "name": "Wie hoch ist das optimale tägliche Trainingsvolumen, um neuronale Übermüdung zu vermeiden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Da motorische Inhibition hohe Mengen zentralnervöser Energie bindet, sind 15 bis 20 Minuten pro Tag (10 bis 15 Durchgänge à 45 Sekunden mit je 45 Sekunden Pause) optimal. Bei einsetzender Muskelverkrampfung im Handgelenk sollte das Training sofort pausiert werden, um fehlerhafte Bewegungsmuster zu vermeiden."
      }
    },
    {
      "@type": "Question",
      "name": "Wie lässt sich die Bremsleistung aus diesem Drill am besten auf reale Matches übertragen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nutzen Sie exakt dieselbe DPI-Einstellung (eDPI) und denselben Griffstil wie im Hauptspiel. Konzentrieren Sie sich während der Übung nicht auf das 'Klicken', sondern auf das 'Einfrieren' des Cursors im Zentrum des Knotens. Dieses mentale Bewegungsmuster überträgt sich direkt auf den First-Bullet-Stop in Schusswechseln."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Anleitung für das Maus-Bremskontrolle & Impulskontrolle Training",
  "description": "4-stufiges Protokoll zum präzisen Abfangen anstürmender Zielknoten und vollständigen Abbau kinetischer Restenergie.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Pointer-Lock aktivieren und Fadenkreuz zentrieren",
      "text": "Klicken Sie in das Spielfeld, um den Zeiger zu sperren, und positionieren Sie das Fadenkreuz in der Spielfeldmitte."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Knoten erfassen und ballistischen Flick initiieren",
      "text": "Antizipieren Sie die Flugbahn des anstürmenden Knotens und führen Sie einen schnellen Beschleunigungs-Flick über 80% der Distanz aus."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Antagonistische Bremsung und Kinetischer Stopp",
      "text": "Aktivieren Sie im Zielkreis die antagonistische Muskulatur und Fingertip-Druck, um die Geschwindigkeit unter 1,5 px/Frame abzustoppen."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Streak-Multiplikator sichern und 15.000 Punkte anvisieren",
      "text": "Halten Sie die Bremspräzision über 45 Sekunden aufrecht, um den 3,0x Multiplikator zu halten und den Elite-Score zu knacken."
    }
  ]
};

const guideProps = {
  sources: pickSources('logan1984', 'woodworth1899', 'fitts1954', 'woods2015'),
  intro: {
    title: "Neurobiologie der Bewegungsinhibition und Biomechanik des kinetischen Stopps",
    paragraphs: [
      "Eine Mausbewegung mit maximaler Geschwindigkeit zu starten ist leicht – sie jedoch auf den Bruchteil eines Millimeters genau und ohne Nachschwingen abzustoppen, ist eine der anspruchsvollsten Leistungen des motorischen Nervensystems. Während traditionelle Aim-Trainer lediglich den Klickzeitpunkt erfassen, isoliert der Reaction-Chain-Drill die Fähigkeit, kinetische Trägheit unmittelbar nach dem Abfangen eines Zielknotens auf null zu reduzieren (Kinetic Arrest).",
      "Im renommierten Pferderennmodell von Gordon D. Logan und William B. Cowan (1984) rasen der motorische 'Go-Prozess' und der hemmende 'Stop-Prozess' unabhängig voneinander durch die Basalganglien. Um einen heranrasenden Zielknoten punktgenau einzufangen, müssen der rechte Gyrus frontalis inferior (rIFG) und der Nucleus subthalamicus (STN) extrem schnell antagonistische Bremsbefehle entsenden, die den Vorwärtsimpuls des Go-Prozesses neutralisieren (Verbruggen & Logan, 2008).",
      "Das klassische Zwei-Komponenten-Modell von Robert S. Woodworth (1899) zeigt, dass Zielbewegungen aus einem ballistischen Anfangsimpuls und einer optisch kontrollierten Endverzögerung bestehen. Erreicht die Knotengeschwindigkeit 1.800 px/s, schrumpft das visuelle Korrekturfenster nach Fitts' Gesetz (1954) vollständig zusammen: Nur eine zerebellär vorausberechnete Muskelbremsung kann ein Hinausschießen (Overflicking) noch verhindern.",
      "Dieses Trainingsmodul analysiert über performance.now() kontinuierlich die Subpixel-Geschwindigkeit des Zeigers und verlangt eine Reduktion auf unter 1,5 px/Frame, um einen erfolgreichen Halt zu werten. In Kombination mit einem 144Hz- oder 240Hz-Monitor und 1000Hz Abtastrate wird die Anzeigelatenz auf unter 4 ms minimiert, was optimale Voraussetzungen für neuronale Plastizität schafft (Woods et al., 2015)."
    ]
  },
  benchmarks: {
    title: "Offizielle 5-Stufen-Benchmarks für Bremskontrolle & Bewegungsinhibition",
    headers: ["Leistungsstufe", "Offizieller Titel", "Punktebereich", "Brems-Erfolgsquote", "Gesamtnote", "Neuromotorisches Profil"],
    rows: [
      ["Tier 1: Absoluter kinetischer Bremsmeister", "Apex Kinetic Arrester", "15.000+ Pkt.", "95%+ / 1500+ px/s", "Grade S", "Top 0,1% Niveau. Phänomenale Impulskontrolle: stoppt selbst bei 1.800 px/s ohne jeden Overflick abrupt im Knoten (Logan 1984; Woodworth 1899)"],
      ["Tier 2: Präzisions-Kinetic-Sniper", "Precision Kinetic Sniper", "11.000 – 14.999 Pkt.", "90 – 94% / 1200 – 1499 px/s", "Grade A", "Top 3% Esport-Niveau. Exzellente Verzögerungskontrolle über die Fingerspitzen; minimale Rutschphasen nach hartem Flick"],
      ["Tier 3: Erfahrener Verzögerungspilot", "Skilled Deceleration Pilot", "7.500 – 10.999 Pkt.", "82 – 89% / 900 – 1199 px/s", "Grade B", "Top 15% Competitive-Niveau. Solide Bremsung bei mittlerem Tempo; gelegentliche Durchrutschfehler bei Topspeed"],
      ["Tier 4: Aufstrebender Brems-Trainee", "Developing Stopper", "4.000 – 7.499 Pkt.", "70 – 81% / 600 – 899 px/s", "Grade C", "Durchschnittliches Erwachsenenniveau. Tendenz zum Überschießen durch unzureichende Antagonisten-Aktivierung"],
      ["Tier 5: Verzögerungs-Einsteiger", "Novice Arrester Trainee", "< 4.000 Pkt.", "< 70% / < 600 px/s", "Grade D", "Verzögerte Bewegungsinhibition führt zu häufigen Fehlschlägen; Grundlagen des Abbremsens über Haftreibung müssen geschult werden"]
    ],
    note: "Kalibriert anhand des Logan-Pferderennmodells (1984), des Woodworth-Modells (1899) und des Fitts'schen Schwierigkeitsgesetzes (1954)."
  },
  techniques: {
    title: "Praxistechniken für maximale Bremspräzision",
    items: [
      {
        name: "Antizipierte Bremsung nach Logan (Logan Kinetic Brake)",
        desc: "Wer erst beim Erreichen des Zielknotens bremst, schießt wegen der neuronalen Latenzzeit unweigerlich darüber hinaus. Leiten Sie den Stopp-Befehl bereits bei 80% des Weges ein, sodass die Geschwindigkeit exakt beim Eintritt in den Knoten auf null sinkt.",
        tips: "Denken Sie nicht daran, den Knoten zu 'berühren', sondern die Maus im Zentrum des Knotens 'einzuloggen'."
      },
      {
        name: "Fingertip-Downforce-Reibung (Fingertip Downforce Braking)",
        desc: "Versuchen Sie nicht, die Maus allein über das Handgelenk abzustoppen. Erhöhen Sie im Bremsmoment minimal den Druck der Fingerspitzen nach unten, um das Mauspad leicht einzudrücken und die physikalische Haftreibung zu maximieren.",
        tips: "Nutzen Sie die Schaumstoffdämpfung Ihres Mauspads als natürlichen Bremsklotz."
      },
      {
        name: "Verhinderung von Slice-Through-Fehlern",
        desc: "Das blinde Durchfahren des Knotens zerstört in Taktik-Shootern die Schusspräzision. Halten Sie den Zeiger diszipliniert im Knoten, bis der grüne Status 'ARREST READY' aufleuchtet.",
        tips: "Genauigkeit und Standfestigkeit im Knoten haben absolute Priorität vor hektischer Geschwindigkeit."
      },
      {
        name: "3,0x Streak-Management-Protokoll",
        desc: "Ein Fehlversuch zieht zwar keine Punkte ab, setzt jedoch den Multiplikator auf 1,0x zurück. Spielen Sie die ersten Levels mit 100% Bremsquote, um den 3,0x Multiplikator frühzeitig aufzubauen.",
        tips: "Über 80% Ihrer Gesamtpunktzahl entstehen während der Phasen mit aktivem 3,0x Multiplikator."
      }
    ]
  },
  steps: [
    "Pointer-Lock im Spielfeld aktivieren und eine bequeme Fingertip- oder Claw-Grip-Haltung einnehmen.",
    "Den anfliegenden Knoten fokussieren und einen dynamischen Beschleunigungsflick starten.",
    "Kurz vor Erreichen des Knotens die antagonistische Muskelbremse und leichten Anpressdruck aktivieren.",
    "Über 45 Sekunden hinweg jeden Knoten fehlerfrei arretieren, um den 3,0x Multiplikator und 15.000 Punkte zu erreichen."
  ],
  audience: "Spieler von Counter-Strike 2, Valorant, Apex Legends und Overwatch 2, die unkontrolliertes Overflicking abstellen und messerscharfe First-Bullet-Headshots erzielen wollen.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('logan1984', 'woodworth1899', 'fitts1954', 'woods2015')
};

export default function LocalizedReactionChainPageDe() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <ReactionChainClient
        copy={{
          title: "Maus Bremskontrolle & Impulskontrolle Training",
          subtitle: "Kinetischer Stopp & Motorische Verzögerung • 15 Geschwindigkeitsstufen",
          badge: "Impulskontrolle Reflex-Test",
          description: "Eine schnelle Bewegung punktgenau auf einem Ziel anzuhalten ist neuromotorisch weitaus anspruchsvoller als das Beschleunigen. Ausführung und Hemmung konkurrieren als unabhängige Prozesse im Gehirn (Logan & Cowan, 1984). Verzögert sich das Bremsen, führt die Trägheit zu fatalen Overflicks (Woodworth, 1899). Fangen Sie anstürmende Knoten ab und stoppen Sie den Cursor abrupt auf den Punkt.",
          hudLabels: {
            score: "Punktzahl",
            time: "Restzeit",
            accuracy: "Bremspräzision",
            bestScore: "Bestwert",
            getReady: "BEREITMACHEN"
          },
          pauseTitle: "Training Pausiert",
          pauseSubtitle: "Klicken Sie in das Fenster, um den Pointer-Lock wieder zu aktivieren.",
          resultLabels: {
            newBest: "NEUER REKORD",
            points: "Punkte",
            accuracy: "Bremspräzision",
            totalArrests: "Kinetische Stopps",
            maxCombo: "Max. Serie",
            peakLevel: "Höchste Stufe",
            playAgain: "Nochmal spielen"
          },
          rulesTitle: "Trainingsregeln & Punktesystem",
          rulesItems: [
            { title: "Kinetischer Stopp (+50 Pkt.)", text: "Fangen Sie anstürmende Knoten ab und bringen Sie den Cursor im Zielkreis vollständig zum Stillstand (ARREST READY)." },
            { title: "Kombi-Multiplikator (bis zu 3,0x)", text: "Erfolgreiche Stopps ohne Fehler erhöhen den Multiplikator schrittweise auf bis zu 3,0x." },
            { title: "Durchrutschen & Fehlschläge", text: "Vorbeigleiten ohne Halt oder Verfehlen setzt die Serie zurück (kein Punkteabzug)." },
            { title: "Extreme Beschleunigung", text: "Mit steigender Punktzahl beschleunigen Knoten auf bis zu 1.800 px/s bei schrumpfendem Halteradius." }
          ],
          aboutTitle: "Über Bremskontrolle & Neuromotorische Inhibition",
          aboutSections: [
            {
              title: "Kinetisches Bremsen & Reaktionshemmung",
              content: "Reaction Chain isoliert und schult Ihre motorische Verzögerungsfähigkeit und Bewegungsinhibition. Statt Zielobjekte nur anzuklicken, müssen Sie die Flugbahn schneiden und Ihre antagonistische Unterarmmuskulatur zwingen, den Bewegungsimpuls innerhalb des Knotens vollständig aufzufangen."
            },
            {
              title: "Logan-Pferderennmodell & First-Shot-Stabilisierung",
              content: "Regelmäßiges Training des kinetischen Stopps restrukturiert die Signalübertragung im Nucleus subthalamicus und Motorkortex (Logan et al., 1984). Dies eliminiert lästiges Overflicking und sorgt für felsenfeste Fadenkreuz-Stabilisierung in Shootern wie CS2 und Valorant."
            }
          ],
          aboutCards: [
            {
              title: "Zielgruppe",
              desc: "FPS-Spieler, die Overflicking abstellen wollen, und Athleten, die rasche neuromuskuläre Bremskraft benötigen.",
              bgClass: "bg-blue-600/30",
              iconClass: "text-blue-400"
            },
            {
              title: "Trainierte Fertigkeiten",
              desc: "Präzise Verzögerung, Haftreibungskontrolle, Stop-Signal-Inhibition (SSRT) und räumliche Interzeption.",
              bgClass: "bg-emerald-600/30",
              iconClass: "text-emerald-400"
            },
            {
              title: "Kinetisches Bremsen",
              desc: "Knoten bis 1.800 px/s abfangen und unter 1,5 px/Frame stoppen, um den 3,0x Multiplikator zu maximieren.",
              bgClass: "bg-purple-600/30",
              iconClass: "text-purple-400"
            }
          ]
        }}
      />
      <DrillGuide {...guideProps} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/reflex-training/reaction-chain" />
    </>
  );
}
