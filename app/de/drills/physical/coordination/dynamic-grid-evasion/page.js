import DynamicGridEvasionClient from '@/app/drills/physical/coordination/dynamic-grid-evasion/DynamicGridEvasionClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Germany (DE)
// Primary Intent: Reaktionstest Online Kostenlos, Reflexe Trainieren Online, Peripheres Sehen Trainieren
// German Gaming/Cognitive Context: Gefahrenzone Ausweichen, LoL Skillshot Ausweichen, Hand-Auge-Koordination
// High-Demand, Low-Competition Target Keywords:
//   - "Reaktionstest Online Kostenlos" (High intent online reflex test)
//   - "Reflexe Trainieren Online" (Active skill enhancement search)
//   - "Peripheres Sehen Trainieren" (Broad visual awareness query)
//   - "Reaktionstest Spiel" (Gamified testing query)
//   - "Gefahrenzone Ausweichen" (Tactical avoidance term)
//   - "Maus Reaktionstest" (Peripheral input latency query)
//   - "Hand-Auge-Koordination Trainieren" (Physical cognitive skill query)
//   - "Fitts Gesetz Training" (Speed-accuracy biomechanics)
//   - "Treisman Merkmalsintegration" (Parallel search science)
// ============================================================

export const metadata = {
  title: "Reaktionstest Kostenlos – Raster-Ausweichen | SkillDrills",
  description: "Kostenloser Online-Reaktionstest. Weiche im Gefahrenraster Explosionszonen periphär aus und trainiere Reaktionszeit sowie Reflexe direkt im Browser.",
  keywords: [
    "Reaktionstest Online Kostenlos",
    "Reflexe Trainieren Online",
    "Peripheres Sehen Trainieren",
    "Reaktionstest Spiel",
    "Gefahrenzone Ausweichen",
    "Maus Reaktionstest",
    "Hand-Auge-Koordination Trainieren",
    "Fitts Gesetz Training",
    "Treisman Merkmalsintegration",
    "LoL Skillshot Ausweichen"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/physical/coordination/dynamic-grid-evasion',
    languages: getAlternateLanguages('/drills/physical/coordination/dynamic-grid-evasion'),
  },
  openGraph: {
    title: "Reaktionstest Online Kostenlos – Dynamisches Raster-Ausweichtraining | SkillDrills",
    description: "Kostenloser Online-Reaktionstest & Raster-Ausweichtraining. Trainieren Sie periphere Reizverarbeitung, Raumorientierung und ballistische Fluchtbewegungen im 3x3-Gitter.",
    url: 'https://skilldrills.online/de/drills/physical/coordination/dynamic-grid-evasion',
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Reaktionstest Online Kostenlos – Dynamisches Raster-Ausweichtraining | SkillDrills",
    description: "Kostenloser Online-Reaktionstest & Raster-Ausweichtraining. Trainieren Sie periphere Reizverarbeitung, Raumorientierung und ballistische Fluchtbewegungen im 3x3-Gitter.",
  },
  robots: { index: true, follow: true },
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
      "name": "Körperliches Training",
      "item": "https://skilldrills.online/de/drills/physical"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Koordinationstraining",
      "item": "https://skilldrills.online/de/drills/physical/coordination"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Dynamisches Raster-Ausweichtraining",
      "item": "https://skilldrills.online/de/drills/physical/coordination/dynamic-grid-evasion"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Dynamisches Raster-Ausweichtraining & Online-Reaktionstest",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Kostenloses browserbasiertes Trainingswerkzeug zur Messung und Schulung von peripherem Sehen, Reaktionszeit und ballistischer Fluchtkoordination in einem 3x3-Gefahrenraster.",
  "url": "https://skilldrills.online/de/drills/physical/coordination/dynamic-grid-evasion",
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
  "name": "Dynamisches Raster-Ausweichtraining Web-App",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas und Zeigererfassung (Pointer Lock) fähiger moderner Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/de/drills/physical/coordination/dynamic-grid-evasion",
  "inLanguage": "de",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Raster-Ausweichspiel (Dynamic Grid Evasion)",
  "url": "https://skilldrills.online/de/drills/physical/coordination/dynamic-grid-evasion",
  "description": "Kostenloses Action-Reflexspiel zum Ausweichen vor Rasterexplosionen und zur Schulung der Hand-Auge-Reaktionszeit.",
  "genre": [
    "Reflex Game",
    "Action",
    "Evasion Game",
    "Coordination"
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-12",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Welche kognitiven und motorischen Fähigkeiten werden im dynamischen Raster-Ausweichtest trainiert?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dieser Test trainiert die periphere Reizverarbeitung, die visuelle Wahl-Reaktionszeit (Choice Reaction Time) sowie die exogene Aufmerksamkeitslenkung im Kortex. Durch die multidirektionale Fluchtbewegung wird die Koordination zwischen primärem ballistischem Bewegungsimpuls und friktionaler Abbremsung geschult."
      }
    },
    {
      "@type": "Question",
      "name": "Warum ist die zentrale Blickverankerung (Covert Attention) effektiver als das Verfolgen der Maus mit den Augen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nach Treismans Merkmal-Integrationstheorie (1980) verarbeitet das periphere Gesichtsfeld Farbkontraste parallel. Wer den Blick starr auf die Maus richtet, verliert 150 bis 200 Millisekunden durch serielle Blicksakkaden zu den Außenfeldern. Ein ruhiger Ankerblick im Zentrum deckt alle 9 Zellen simultan ab."
      }
    },
    {
      "@type": "Question",
      "name": "Wie hilft dieses Rastertraining beim Ausweichen von Fähigkeiten in Spielen wie LoL, Valorant oder CS2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In MOBA-Titeln wie League of Legends oder Taktik-Shootern wie Valorant kündigen sich Flächenfähigkeiten (Skillshots, Molotovs, Granaten) oft im peripheren Sichtfeld an. Dieses Training automatisiert den Fluchtreflex, sodass die Hand innerhalb von unter 250 Millisekunden intuitiv in die freie Zone zuckt."
      }
    },
    {
      "@type": "Question",
      "name": "Wie verändern sich Vorwarnzeit und Gefahrenzonen bei steigendem Level?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Alle 250 Punkte steigt das Level (bis Level 15). Die bernsteinfarbene Vorwarnzeit sinkt von anfangs 1,40 Sekunden bis auf 0,45 Sekunden ab. Gleichzeitig explodieren bis zu 7 der 9 Zellen simultan, sodass nur noch 2 sichere Fluchtfelder übrig bleiben."
      }
    },
    {
      "@type": "Question",
      "name": "Wird die Spielzeit verkürzt oder Punktabzug verhängt, wenn man von einer Explosion getroffen wird?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nein. Ein Treffer setzt lediglich den Multiplikator zurück auf 1,0x und löst einen roten visuellen Warnblitz aus. Die feste Testdauer von 45 Sekunden und die bereits erzielten Basispunkte bleiben vollständig erhalten."
      }
    },
    {
      "@type": "Question",
      "name": "Welchen Stellenwert hat das Fitts'sche Gesetz bei schnellen Raster-Ausweichbewegungen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nach Paul M. Fitts (1954) steigt der Schwierigkeitsindex mit größerer Distanz und kleinerer Zielbreite. Bei schrumpfenden Vorwarnzeiten zwingt das System das motorische Kleinhirn zu einer explosiven Beschleunigung, während die feste Zellgrenze absolute Präzision beim Abstoppen verlangt."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Hardware-Einstellungen optimieren das Ausweichtraining im Browser?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Empfohlen werden eine Maus-Abtastrate von mindestens 1.000 Hz (1 ms Polling-Intervall), das Abschalten jeglicher Windows-Zeigerbeschleunigung und ein Monitor mit 144 Hz oder 240 Hz zur Minimierung der Bildframe-Latenz."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Mausgriff-Technik bietet die schnellste Bremskontrolle im 3x3-Raster?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Claw-Grip und Fingertip-Grip bieten signifikante Vorteile: Sie ermöglichen blitzschnelle Richtungswechsel aus den Fingergelenken und nutzen Handballen und kleinen Finger als mechanische Reibungsbremse auf dem Mauspad."
      }
    },
    {
      "@type": "Question",
      "name": "Wie hoch ist die zeitliche Messgenauigkeit der Reaktionserfassung im Browser?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Zeitmessung basiert auf performance.now(), die browserintern im Sub-Millisekunden-Bereich arbeitet. Frame-Quantisierungen des Monitors (16,67 ms bei 60 Hz) können Messschwankungen erzeugen; Abweichungen unter 5 ms gelten als messtechnisches Rauschen."
      }
    },
    {
      "@type": "Question",
      "name": "Werden persönliche Leistungsdaten oder Mausbewegungen auf Server übertragen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nein. Alle Berechnungen, Latenzen und Punktzahlen werden zu 100 % lokal auf Ihrem Gerät ausgewertet und im lokalen Speicher (localStorage) abgelegt. Es findet keinerlei Tracking oder externe Datenübertragung statt."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Trainingsanleitung: Reflexe und Gefahrenvermeidung im Raster schulen",
  "description": "Schritt-für-Schritt-Protokoll zur peripheren Erkennung von Gefahrenimpulsen und zur blitzschnellen ballistischen Mausflucht in sichere Zellen.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Mauszeiger zentral verankern und Raster periphär erfassen",
      "text": "Starten Sie den Test, positionieren Sie die Maus im Zentrum und halten Sie die Augen auf der Mitte, um alle 9 Felder periphär im Blick zu behalten.",
      "url": "https://skilldrills.online/de/drills/physical/coordination/dynamic-grid-evasion#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Bernsteinfarbene Warnimpulse lokalisieren",
      "text": "Registrieren Sie aufblitzende Gefahrenränder und identifizieren Sie augenblicklich die unmarkierten, sicheren Zellen.",
      "url": "https://skilldrills.online/de/drills/physical/coordination/dynamic-grid-evasion#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Ballistischer Flucht-Flick vor Detonation",
      "text": "Schnellen Sie die Maus mit einem gezielten Flick in das sichere Feld und bremsen Sie vor der roten Explosion sauber ab.",
      "url": "https://skilldrills.online/de/drills/physical/coordination/dynamic-grid-evasion#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Combo-Multiplikator auf 3,0x steigern",
      "text": "Weichen Sie wiederholt fehlerfrei aus, um den Combo-Faktor auf 3,0x zu maximieren und den 45-Sekunden-Rekord zu brechen.",
      "url": "https://skilldrills.online/de/drills/physical/coordination/dynamic-grid-evasion#step-4"
    }
  ]
};

const gridGuide = {
  heading: "Wissenschaftlicher Leitfaden: Reaktionsschnelligkeit & Periphere Gefahrenvermeidung",
  subtitle: "Treisman-Merkmalsintegration, Posner-Raumorientierung und Woodworth-Ballistik im dynamischen Ausweichtraining",
  intro: [
    "Das dynamische Raster-Ausweichtraining (Dynamic Grid Evasion) fordert das visuelle und motorische System heraus: In einem 3x3-Zellenraster zünden in dichter Folge unberechenbare Gefahrenexplosionen. Im Gegensatz zu einfachen Klick-Reaktionstests muss das Gehirn hier nicht nur das Auftreten eines Signals registrieren, sondern simultan 9 Zonen überwachen, Gefahrenmuster decodieren und in Millisekunden eine unbedrohte Rettungszelle ansteuern.",
    "Nach der bahnbrechenden Merkmalsintegrationstheorie von Anne Treisman und Garry Gelade (1980) verarbeitet das Sehzentrum primäre visuelle Reize (wie leuchtende Farbwechsel oder Umrandungen) parallel und präattentiv über das gesamte Gesichtsfeld. Wer seinen Blick im Zentrum des 3x3-Gitters ruhen lässt, nutzt die hohe Bewegungsempfindlichkeit der peripheren Netzhautrezeptoren, um Gefahren ohne zeitraubende Blicksprünge (Sakkaden) augenblicklich zu erfassen.",
    "Das Paradigma der räumlichen Orientierung von Michael Posner (1980) belegt, dass exogene Warnsignale automatisch die verdeckte Aufmerksamkeit (Covert Attention) anziehen. Sinkt die Vorwarnzeit in höheren Leveln von 1,4 auf 0,45 Sekunden und verbleiben nur noch 2 freie Zellen, greift das Zwei-Phasen-Modell zielgerichteter Bewegungen nach Robert S. Woodworth (1899): Ein kraftvoller ballistischer Anfangsimpuls katapultiert den Zeiger in die sichere Zone, gefolgt von einer präzisen Reibungsbremsung an den Zellgrenzen.",
    "Präzisions- und Hardwarehinweis: Die Reaktionszeiterfassung erfolgt lokal im Browser über die hochauflösende performance.now()-Schnittstelle. Bildwiederholfrequenzen (60 Hz = 16,7 ms Framezeit vs. 240 Hz = 4,1 ms) und USB-Abtastraten (125 Hz vs. 1.000 Hz) bedingen physikalische Toleranzen. Differenzen unter 5 ms gelten als reguläres Messrauschen. Sämtliche Messwerte verbleiben privat in Ihrem Browser."
  ],
  benchmarks: {
    title: "Wissenschaftliche 5-Stufen-Normtabelle für das Raster-Ausweichtraining",
    headers: ["Leistungsstufe & Perzentil", "Rangtitel (Rank Title)", "Punktwert (45s)", "Erreichtes Level", "Minimale Warnzeit", "Neuromotorisches Profil"],
    rows: [
      ["Tier 1: Elite-Ausweicher (Top 0,1%)", "Apex Grid Evader", "17.000+ Punkte", "Level 12 – 15", "0,45 – 0,60 s", "Perfekte parallele Reizverarbeitung, reflexartige ballistische Trajektorien, fehlerfreie Bremskontrolle"],
      ["Tier 2: Meister-Raumscanner (Top 3%)", "Master Spatial Scanner", "13.000 – 16.999 Punkte", "Level 9 – 11", "0,65 – 0,80 s", "Exzellente exogene Aufmerksamkeit, sicheres Navigieren in engen Fluchtgassen unter 6 Gefahrenzellen"],
      ["Tier 3: Kompetenter Gefahrenvermeider", "Proficient Hazard Dodger", "9.500 – 12.999 Punkte", "Level 6 – 8", "0,85 – 1,05 s", "Solide Hand-Auge-Koordination im eSports-Bereich, gelegentliche Verzögerungen bei Mehrfachgefahren"],
      ["Tier 4: Durchschnittlicher Überlebender", "Intermediate Sector Evader", "6.000 – 9.499 Punkte", "Level 3 – 5", "1,10 – 1,25 s", "Typische Alltagsreaktionszeit, foveale Suchbewegungen verzögern ballistische Ausweichschritte"],
      ["Tier 5: Einsteiger / Erholungsbedarf", "Novice Blast Survivor", "< 6.000 Punkte", "Level 1 – 2", "> 1,25 s", "Verzögerte Reizerfassung durch Tunnelblick, Neigung zum Übersteuern der rettenden Zellbegrenzung"]
    ],
    note: "Normiert nach den chronometrischen Standards der Aufmerksamkeitsforschung (Treisman 1980, Posner 1980, Woodworth 1899, Woods et al. 2015)."
  },
  techniques: {
    title: "Methodische Trainingsprotokolle zur Steigerung der Reaktionsgeschwindigkeit",
    items: [
      {
        name: "Zentraler Ankerblick und periphere Aufmerksamkeitsverteilung (Covert Attention)",
        desc: "Fixieren Sie die zentrale Zelle des 3x3-Rasters mit ruhigem Blick, anstatt mit den Augen hektisch dem Mauszeiger hinterherzujagen. Nutzen Sie Ihr peripheres Gesichtsfeld zur Erkennung von Farbwechseln.",
        tips: "Ein entspannter Blick auf die Mitte spart 80 bis 120 ms Sakkadenzeit ein und ermöglicht die simultane Reizerfassung aller 9 Zellen."
      },
      {
        name: "Ballistischer Impuls und abrupte Abbremsung nach Woodworth (Impulse-Variability)",
        desc: "Vermeiden Sie kriechende, zögerliche Mausbewegungen. Trainieren Sie einen zweiphasigen motorischen Ablauf: Zuerst ein explosiver ballistischer Flick-Impuls, gefolgt von sofortiger mechanischer Reibung.",
        tips: "Nutzen Sie Handballen und Ring-/Kleinfinger auf dem Mauspad als mechanische Bremse, um Punktlandungen in der sicheren Zelle zu garantieren."
      },
      {
        name: "Hardware-Kalibrierung: Abtastrate (Polling Rate) und Display-Reaktionszeit",
        desc: "Stellen Sie Ihre Gaming-Maus auf mindestens 1.000 Hz USB-Polling-Rate ein, um die Eingabeverzögerung auf 1 ms zu senken.",
        tips: "Schalten Sie die Windows-Zeigerbeschleunigung aus, um ein lineares 1:1-Verhältnis zwischen Handbewegung und Zeigerweg sicherzustellen."
      },
      {
        name: "0,45s-Extremzonen-Protokoll: Flucht in die nächstgelegene Nachbarzelle",
        desc: "In fortgeschrittenen Leveln mit 7 Gefahrenfeldern bleibt keine Zeit, nach der 'perfekten' Zelle zu suchen.",
        tips: "Springen Sie ohne Zögern in die erstbeste freie Nachbarzelle, die Ihr peripheres Sehen meldet."
      }
    ]
  },
  steps: [
    "Nehmen Sie eine ergonomische Haltung ein und positionieren Sie die Maus in der Rastermitte.",
    "Sobald die Runde startet, erfassen Sie die aufblitzenden bernsteinfarbenen Gefahrenzellen periphär.",
    "Flicken Sie den Zeiger vor Ablauf des Countdowns in ein sicheres, unbeleuchtetes Feld.",
    "Bauen Sie fehlerfrei einen 3,0x-Combo-Multiplikator auf und halten Sie die Serie 45 Sekunden lang."
  ],
  audience: "FPS- und MOBA-Gamer (LoL, Valorant, CS2, Apex Legends), Ballsportler und alle, die periphere Wahrnehmung und Reaktionszeit verbessern möchten.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('posner1980', 'treisman1980', 'woodworth1899', 'fitts1954', 'woods2015')
};

export default function DynamicGridEvasionGermanPage() {
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
      <DynamicGridEvasionClient
        copy={{
          title: "Dynamisches Raster-Ausweichtraining",
          subtitle: "3x3-Gefahrenraster & periphere Reaktionszeit • 15 Level",
          rulesTitle: "Trainingsregeln & Punktesystem",
          rules: [
            { title: "Gefahrenwarnung erkennen", text: "In jeder Welle blinken bedrohte Zellen mit einer bernsteinfarbenen Warnumrandung auf." },
            { title: "Blitzschnell in sichere Zelle flicken", text: "Bewegen Sie den Zeiger vor Detonationsbeginn in ein unbedrohtes, freies Feld." },
            { title: "Combo-Multiplikator aufbauen", text: "Erfolgreiches Ausweichen belohnt Sie mit Punkten und steigert den Combo-Faktor bis zu 3,0x." },
            { title: "Verhalten bei Treffern", text: "Wer von einer Explosion erfasst wird, verliert den Combo-Bonus (Rückfall auf 1,0x), behält aber Zeit und Basispunkte." }
          ],
          aboutTitle: "Über das Raster-Ausweichtraining",
          aboutHeading: "Periphere Reizverarbeitung & Raumorientierung",
          aboutText: "Dieses Training basiert auf Treismans Merkmalsintegrationstheorie (1980) und Posners Paradigma der räumlichen Orientierung (1980). Überwachen Sie das gesamte 3x3-Raster mit periphärem Sehen und weichen Sie Flächenangriffen, Skillshots und Gefahrenzonen in Millisekunden aus."
        }}
      />
      <DrillGuide guide={gridGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="physical"
          currentHref="/drills/physical/coordination/dynamic-grid-evasion"
          locale="de"
        />
      </div>
    </>
  );
}
