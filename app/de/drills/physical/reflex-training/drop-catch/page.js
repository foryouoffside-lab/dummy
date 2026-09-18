import DropCatchClient from '@/app/drills/physical/reflex-training/drop-catch/DropCatchClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Germany (DE / DE)
// Primary Intent: Lineal Fallen Lassen Reaktionszeit, Reaktionszeit Lineal Fangen, Reaktionszeit Messen Lineal
// German Context: Klassischer Lineal-Falltest (Schule/Sport) als digitaler Drop-Catch & Go/No-Go-Reflextest
// High-Demand, Low-Competition Target Keywords:
//   - "Lineal Fallen Lassen Reaktionszeit" (Classic ruler drop reaction query)
//   - "Reaktionszeit Lineal Fangen" (Catching ruler reflex measurement)
//   - "Reaktionszeit Messen Lineal" (Measuring reaction speed via ruler drop)
//   - "Reaktionstest Online Kostenlos" (Free online reaction test query)
//   - "Wahlreaktionszeit Test" (Donders Type C choice reaction time query)
//   - "Fallende Ziele Abfangen" (Gravitational target interception query)
//   - "Impulskontrolle Reaktionstraining" (Cognitive motor inhibition query)
//   - "Reflexe Testen Online" (Reflex testing browser query)
//   - "Optische Reizdiskrimination" (Visual stimulus discrimination query)
//   - "Go No-Go Test Online" (Inhibitory stop-signal paradigm query)
// ============================================================

export const metadata = {
  title: "Lineal-Falltest – Reaktionszeit Messen | SkillDrills",
  description: "Kostenloser Lineal-Falltest online. Fange fallende Objekte im freien Fall ab und messe deine Reaktionszeit und Reflexe in Millisekunden direkt im Browser.",
  keywords: [
    "Lineal Fallen Lassen Reaktionszeit",
    "Reaktionszeit Lineal Fangen",
    "Reaktionszeit Messen Lineal",
    "Reaktionstest Online Kostenlos",
    "Wahlreaktionszeit Test",
    "Fallende Ziele Abfangen",
    "Impulskontrolle Reaktionstraining",
    "Reflexe Testen Online",
    "Optische Reizdiskrimination",
    "Go No-Go Test Online"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/physical/reflex-training/drop-catch',
    languages: getAlternateLanguages('/drills/physical/reflex-training/drop-catch'),
  },
  openGraph: {
    title: "Lineal-Falltest – Reaktionszeit Messen | SkillDrills",
    description: "Kostenloser Lineal-Falltest online. Fange fallende Objekte im freien Fall ab und messe deine Reaktionszeit und Reflexe in Millisekunden direkt im Browser.",
    url: 'https://skilldrills.online/de/drills/physical/reflex-training/drop-catch',
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Lineal-Falltest – Reaktionszeit Messen | SkillDrills",
    description: "Kostenloser Lineal-Falltest online. Fange fallende Objekte im freien Fall ab und messe deine Reaktionszeit und Reflexe in Millisekunden direkt im Browser.",
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
      "name": "Physisches Trainingszentrum",
      "item": "https://skilldrills.online/de/drills/physical"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Reflextraining & Schnelligkeit",
      "item": "https://skilldrills.online/de/drills/physical/reflex-training"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Lineal-Falltest & Drop-Catch-Reaktionsmessung",
      "item": "https://skilldrills.online/de/drills/physical/reflex-training/drop-catch"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Lineal-Falltest & Drop-Catch-Reflextrainer",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Kostenloses biomechanisches Online-Tool zum Abfangen beschleunigter Fallziele und zur Schulung der präfrontalen Impulskontrolle nach Donders und Logan.",
  "url": "https://skilldrills.online/de/drills/physical/reflex-training/drop-catch",
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
  "name": "Drop-Catch Reaktionsmessungs-Web-App",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Moderner Browser mit Unterstützung für HTML5 Canvas und Pointer-Events",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/de/drills/physical/reflex-training/drop-catch",
  "inLanguage": "de",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Drop Catch: Gravitations-Abfang- und Impulskontrollspiel (Drop Catch)",
  "url": "https://skilldrills.online/de/drills/physical/reflex-training/drop-catch",
  "description": "Fange gravitationsbeschleunigte Fallziele ab und entkomme roten Fallen in diesem reaktionsbasierten Präzisionsspiel.",
  "genre": [
    "Action Game",
    "Reflex Game",
    "Aim Trainer",
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
      "name": "Was unterscheidet den klassischen Lineal-Falltest vom digitalen Drop-Catch-Reflextraining?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der traditionelle Lineal-Falltest mit Daumen und Zeigefinger misst die freie Fallstrecke (s = 1/2gt²) als einfache Reaktionszeit (Donders Typ A). Der digitale Drop-Catch hingegen ist eine Donders-Typ-C-Wahlreaktionsaufgabe: Zwischen 400 px/s und 1250 px/s beschleunigende grüne Zielobjekte müssen von roten Täuschkörpern (Decoys) unterschieden werden. Dies testet neben der motorischen Schnelligkeit vor allem die neuronale Farberkennung und die Hemmung von Fehlauslösungen."
      }
    },
    {
      "@type": "Question",
      "name": "Wie erklärt die optische Tau-Theorie (David N. Lee, 1976) das Abfangen fallender Objekte?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wenn ein Objekt unter Erdbeschleunigung fällt, berechnet das Gehirn weder die physische Fallstrecke noch die momentane Geschwindigkeit numerisch. Stattdessen extrahiert die Sehrinde die optische Tau-Größe (τ) – den Kehrwert der relativen retinalen Expansionsrate. Dadurch wird die verbleibende Kontaktzeit (Time-to-Contact) im Millisekundenfenster intuitiv antizipiert, sodass der Klickimpuls exakt synchron zur Trefferzone ausgelöst werden kann."
      }
    },
    {
      "@type": "Question",
      "name": "Was besagt das Pferderennen-Modell (Horse-Race Model) nach Logan (1984) bezüglich roter Täuschziele?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sobald ein Objekt auf dem Bildschirm erscheint, startet im Gehirn ein interner Wettlauf zwischen dem unwillkürlichen Bewegungsimpuls ('Go'-Prozess zum Klicken) und dem präfrontalen Hemmungssignal ('Stop'-Prozess beim Erkennen der roten Signalfarbe). Um einen Fehlschuss zu verhindern, muss das Stop-Signal die Erregungsschwelle des motorischen Kortex erreichen, bevor der Finger zuckt. Drop Catch trainiert diese exekutive Veto-Kontrolle intensiv."
      }
    },
    {
      "@type": "Question",
      "name": "Wie verbessert dieses Training die Entscheidungsfindung in E-Sport-Titeln (CS2, Valorant, Apex, LoL)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In hektischen Gefechtssituationen müssen Spieler blitzschnell zwischen gegnerischen Köpfen, Verbündeten und ablenkenden Ködern (Flashes, Decoys) differenzieren. Die Fähigkeit, unüberlegte Klickreflexe bei Erkennung falscher Merkmale sofort zu stoppen, verhindert Team-Schaden (Friendly Fire), spart wertvolle Munition und schärft die taktische Schussdisziplin."
      }
    },
    {
      "@type": "Question",
      "name": "Wie entwickeln sich Fallgeschwindigkeit, Spawn-Intervalle und Täuschkörperhäufigkeit über die Level?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Alle 1.750 Punkte steigt der Schwierigkeitsgrad nahtlos auf bis zu Level 15 und darüber hinaus. Die Basisfallgeschwindigkeit zieht von 400 px/s auf bis zu 1250 px/s an, während das Spawn-Intervall von 0,8s auf 0,18s schrumpft. Zudem klettert die Wahrscheinlichkeit für rote Täuschkörper von 15 % auf bis zu 45 %, was höchste kognitive Wachsamkeit erfordert."
      }
    },
    {
      "@type": "Question",
      "name": "Welche taktische Bedeutung hat die Zeitgutschrift von +0,6 Sekunden pro gefangenem Ziel?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Runde startet mit einem Basiskonto von 45 Sekunden. Jeder erfolgreiche Treffer auf ein grünes Ziel fügt 0,6 Sekunden hinzu. Ein fehlerfreier Rhythmus ermöglicht es, die Runde über 60 oder 90 Sekunden am Leben zu halten, den 3,0x-Maximalmultiplikator auszubauen und Elite-Wertungen von über 24.000 Punkten zu erzielen."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Strafen drohen bei Fehlschüssen oder dem Auslösen eines roten Täuschkörpers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Das Berühren eines roten Täuschkörpers oder das Entkommenlassen eines grünen Ziels setzt den Multiplikator augenblicklich auf 1,0x zurück. Ist die Zeitstrafe in den Einstellungen aktiv, werden pro Fehler zusätzlich 0,8 Sekunden vom Rundentimer abgezogen, was unüberlegtes Dauerklicken sofort bestraft."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Mausführung und Blickfixierung wird für vertikale Abfangbewegungen empfohlen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Empfohlen wird ein Fingertip- oder Claw-Grip, bei dem der Handballen nicht starr auf dem Pad aufliegt, um freie vertikale Schub- und Ziehbewegungen aus den Fingergelenken zu ermöglichen. Fixieren Sie Ihren Blick im oberen Drittel des Bildschirms, um Farben bereits in den ersten 50 ms nach dem Erscheinen zu klassifizieren und die Maus vorausahnend in die Fallbahn zu schieben."
      }
    },
    {
      "@type": "Question",
      "name": "Welchen Vorteil bieten Gaming-Monitore mit 144 Hz oder 240 Hz bei Fallgeschwindigkeiten von 1250 px/s?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bei 1250 px/s springt ein Objekt auf einem 60-Hz-Display um rund 20,8 px pro Frame und zieht starke Schlieren hinter sich her. Bei 240 Hz sinkt der Bewegungssprung auf 5,2 px pro Bild. Dies liefert eine glasklare Farbtrennung und präzise Kanten, sodass Täuschkörper selbst bei Maximalgeschwindigkeit ohne Zögern enttarnt werden (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Werden Reaktionszeiten, Trefferquoten oder persönliche Daten an externe Server übertragen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nein, zu keinem Zeitpunkt. Sämtliche Leistungswerte, Latenzstatistiken, Reaktionszeiten und Rekorde werden ausschließlich lokal im Speicher Ihres Browsers (LocalStorage) verwaltet. Es findet keinerlei Tracking oder externe Datenübertragung statt."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "4-Stufen-Trainingsprotokoll für Lineal-Falltest und optische Zielabfangung",
  "description": "Wissenschaftlich fundierter Leitfaden zur Optimierung von Wahlreaktionszeit und präfrontaler Impulskontrolle nach Donders und Logan.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Visuelle Verankerung im oberen Drittel (Visual Anchoring)",
      "text": "Positionieren Sie den Fokus im oberen Bildschirmdrittel, um innerhalb der ersten 50ms nach dem Erscheinen zwischen grün (Ziel) und rot (Täuschkörper) zu differenzieren.",
      "url": "https://skilldrills.online/de/drills/physical/reflex-training/drop-catch#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Logan Stop-Signal Veto-Kontrolle (Logan Inhibitory Veto)",
      "text": "Aktivieren Sie bei Erkennung roter Signalfarben sofort die präfrontale Hemmung, um das motorische Durchdrücken des Zeigefingers zu blockieren.",
      "url": "https://skilldrills.online/de/drills/physical/reflex-training/drop-catch#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Vorausahnendes Tau-Abfangen (Optical Tau Interception)",
      "text": "Führen Sie die Maus bei grünen Zielen antizipierend in die untere Fallbahn und lösen Sie den Klick im idealen Abfangfenster sauber aus.",
      "url": "https://skilldrills.online/de/drills/physical/reflex-training/drop-catch#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Zeitgutschrift sichern & Multiplikator maximieren (Time Extension & Streak Heat)",
      "text": "Nutzen Sie den Bonus von +0,6s pro Treffer, um die Serie bis auf den 3,0x-Multiplikator auszubauen und über 24.000 Punkte zu erzielen.",
      "url": "https://skilldrills.online/de/drills/physical/reflex-training/drop-catch#step-4"
    }
  ]
};

const dropGuide = {
  heading: "Leitfaden für Lineal-Falltest & gravitative Zielabfang-Biomechanik",
  intro: {
    title: "Wissenschaftliche Grundlagen der Reizdiskrimination und Impulshemmung",
    paragraphs: [
      "Der Drop Catch ist ein spezialisiertes Reaktions- und Impulskontrollsystem, das die klassische Methode des Lineal-Falltests in eine hochdynamische digitale Testumgebung überführt. Anstelle des einfachen Greifens nach einer herabfallenden Skala erfordert dieser Drill die Bewältigung einer Donders-Typ-C-Wahlreaktionsaufgabe (Donders, 1868): Gültige grüne Zielobjekte müssen unter Zeitdruck präzise abgefangen werden, während optisch identische, jedoch rot gefärbte Täuschkörper unter strikter Hemmung des Klickreflexes passieren gelassen werden müssen.",
      "Unter Erdbeschleunigung (s = 1/2gt²) beschleunigen fallende Objekte kontinuierlich von 400 px/s bis auf 1250 px/s. Gemäß der optischen Tau-Theorie von David N. Lee (1976) berechnet das Sehzentrum die verbleibende Kontaktzeit (Time-to-Contact) anhand der relativen Expansionsrate auf der Netzhaut. Wer versucht, die Beschleunigung bewusst nachzurechnen, verliert wertvolle Millisekunden; der Schlüssel zum Erfolg liegt darin, den Mauszeiger vorausschauend auf der Fallachse zu positionieren.",
      "Die größte neuronale Herausforderung stellen die unvorhersehbar eingestreuten roten Fallen dar. Nach dem Pferderennen-Modell (Horse-Race Model) von Gordon D. Logan (1984) konkurrieren im Gehirn ein automatischer Bewegungsimpuls ('Go') und ein hemmendes Veto-Signal ('Stop'). Nur wenn die präfrontale Hemmung rechtzeitig interveniert, wird ein Fehlschuss verhindert. Dieses Training schult die exekutive Verhaltenskontrolle auf Spitzensport-Niveau.",
      "Für exakte Laborpräzision arbeitet das System mit der performance.now()-Schnittstelle moderner Browser. Auf Gaming-Monitoren mit 144 Hz oder 240 Hz wird die Bildunschärfe bei 1250 px/s drastisch reduziert, was eine verzögerungsfreie Reizdifferenzierung ermöglicht (Woods et al., 2015). Sämtliche Messwerte bleiben zum Schutz der Privatsphäre ausnahmslos auf Ihrem lokalen Endgerät gespeichert."
    ]
  },
  benchmarks: {
    title: "5-Stufen-Leistungsbenchmarks für Wahlreaktionszeit und Fallabfangung",
    headers: ["Stufe & Rang", "Titel (Rank Title)", "Punkteziel", "Wahlreaktionszeit & Genauigkeit", "Gesamtnote", "Neuromuskuläres Profil"],
    rows: [
      ["Tier 1: Ultimativer Gravitations-Abfänger", "Apex Gravitational Interceptor", "24.000+ Punkte", "< 190 ms / > 95 %", "Grade S", "Top 0,1 % Niveau von Kampfpiloten und E-Sport-Profis. Perfekte Logan-Impulskontrolle und fehlerfreies Abfangen bei 1250 px/s (Lee 1976; Logan 1984)"],
      ["Tier 2: Präzisions-Reflex-Striker", "Precision Reflex Striker", "17.000 – 23.999 Punkte", "195 – 240 ms / 90 – 94 %", "Grade A", "Top 10 % semiprofessioneller E-Sportler. Überragende Tau-Antizipation und stabiles Halten des 3,0x-Multiplikators bei 45 % Fallenquote"],
      ["Tier 3: Erfahrener Drop-Catcher", "Skilled Drop Catcher", "11.000 – 16.999 Punkte", "245 – 310 ms / 82 – 89 %", "Grade B", "Top 35 % regelmäßiger Gamer. Solide Auge-Hand-Koordination und gute Nutzung des +0,6s-Zeitbonus für lange Überlebensdauer"],
      ["Tier 4: Lernender Reflex-Athlet", "Developing Reflex Trainee", "6.000 – 10.999 Punkte", "311 – 370 ms / 70 – 81 %", "Grade C", "Durchschnittliches Erwachsenenniveau. Bei Geschwindigkeiten über 800 px/s treten Fehlklicks auf rote Fallen und Serienabbrüche auf"],
      ["Tier 5: Einsteiger in Impulskontrolle", "Novice Decoy Learner", "< 6.000 Punkte", "> 370 ms / < 70 %", "Grade D", "Basisniveau. Überhastetes Klicken auf Täuschkörper durch optische Überforderung. Blickfixierung im oberen Drittel empfohlen"]
    ],
    note: "Objektive Kriterien basierend auf der Donders-Typ-C-Chronometrie (1868), Lees optischer Tau-Theorie (1976) und Logans Hemmungsmodell (1984)."
  },
  techniques: {
    title: "4 Praxisprotokolle für maximale Fallreaktion & Impulsdisziplin",
    items: [
      {
        name: "Visuelle Verankerung im oberen Drittel (Upper Third Visual Anchoring)",
        desc: "Richten Sie den Blick nicht an den oberen Rand oder auf den Boden. Verankern Sie den Fokus im oberen Drittel, um Farben in den ersten 50 ms nach dem Auftauchen zu identifizieren und die Falllinie vorausschauend zu besetzen.",
        tips: "Verfolgen Sie Ziele nicht von hinten – fangen Sie sie am erwarteten Durchgangspunkt ab."
      },
      {
        name: "Logan Stop-Signal Veto-Kontrolle (Logan Stop-Signal Veto)",
        desc: "Unterdrücken Sie den Drang des Zeigefingers, auf jeden Reiz reflexartig zu drücken. Entspannen Sie die Fingerkuppe bei Sichtung roter Farbtöne augenblicklich und lassen Sie das Objekt ins Leere fallen.",
        tips: "Ein Klick auf Rot kostet nicht nur Punkte, sondern vernichtet den gesamten 3,0x-Multiplikator."
      },
      {
        name: "Tau-Antizipation auf der Fallachse (Optical Tau Gravitational Interception)",
        desc: "Die Fallbeschleunigung nimmt nach unten hin drastisch zu. Nutzen Sie das Zeitfenster in der Bildschirmmitte für einen sauberen Snap-Klick, bevor das Ziel die kritische Fluchtgeschwindigkeit erreicht.",
        tips: "Warten Sie nicht bis zur letzten Kante – schlagen Sie im großzügigen mittleren Drittel entschlossen zu."
      },
      {
        name: "Fingertip-Führung für vertikale Mikro-Flicks (Fingertip Vertical Micro-Steering)",
        desc: "Legen Sie die Handfläche nicht flach auf das Mauspad. Ein leichter Fingertip-Grip erlaubt blitzschnelle Vor- und Zurückbewegungen aus den Fingergelenken ohne Reibungsverlust.",
        tips: "Steuern Sie vertikale Korrekturen aus der Beugung der Finger, nicht aus dem gesamten Unterarm."
      }
    ]
  },
  steps: [
    "Nehmen Sie eine aufrechte Haltung ein und fokussieren Sie das obere Bildschirmdrittel.",
    "Klassifizieren Sie herabfallende Objekte in den ersten 50ms als grün (treffen) oder rot (meiden).",
    "Fangen Sie grüne Ziele antizipierend ab und lassen Sie rote Fallen unberührt passieren.",
    "Sichern Sie sich +0,6s Zeitbonus pro Treffer und halten Sie den 3,0x-Multiplikator für 24.000+ Punkte."
  ],
  audience: "Sportler und Schüler zur präzisen digitalen Messung des Lineal-Falltests sowie E-Sportler zur Schulung von Schussdisziplin und Reaktionsschnelligkeit.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('donders1868', 'lee1976', 'logan1984', 'woodworth1899', 'fitts1954', 'woods2015')
};

export default function LocalizedDropCatchPageDe() {
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
      <DropCatchClient
        copy={{
          title: "Lineal-Falltest & Drop Catch",
          subtitle: "Fallende Ziele abfangen & rote Fallen hemmen • 15 dynamische Level",
          hudLabels: {
            score: "Punkte",
            time: "Zeit",
            bestScore: "Rekord",
            bestCombo: "Max Combo"
          },
          rulesTitle: "Drill-Regeln & Punktesystem",
          rulesItems: [
            { title: "Grüne Ziele fangen & Zeitbonus", text: "Klicken Sie auf fallende grüne Ziele für 100 Punkte (skaliert mit Multiplikator) und sichern Sie sich +0,6 Sekunden extra." },
            { title: "Combo-Multiplikator aufbauen", text: "Treffer ohne Unterbrechung steigern den Multiplikator kontinuierlich auf bis zu 3,0x." },
            { title: "Level-Progression", text: "Alle 1.750 Punkte steigt das Level. Fallgeschwindigkeit (bis zu 1250 px/s) und Fallenquote (bis zu 45%) ziehen an." },
            { title: "Fallen- und Verfehlungsstrafen", text: "Das Verpassen grüner Ziele oder Anklicken roter Fallen setzt die Combo zurück (und kostet 0,8s bei aktiver Option)." }
          ],
          aboutTitle: "Über Drop Catch & Fallreaktions-Biomechanik",
          aboutSections: [
            {
              title: "Gravitationsbeschleunigung & optische Tau-Theorie",
              subtitle: "David N. Lee (1976) Nicht-lineare Zeit-zu-Kontakt-Berechnung",
              content: "Fallende Ziele beschleunigen. Das Gehirn liest die retinale Expansionsrate ab, um vor Erreichen der unteren Begrenzung den optimalen Trefferpunkt zu bestimmen."
            },
            {
              title: "Impulskontrolle & Logan-Stoppsignal-Modell",
              subtitle: "Gordon D. Logan (1984) Präfrontale Hemmung unwillkürlicher Klicks",
              content: "Rote Fallen erzeugen einen Wettlauf zwischen Handlungsdrang (Go) und Hemmung (Stop). Trainiert das exekutive Veto gegen überhastete Fehlbedienungen."
            },
            {
              title: "Donders-Typ-C-Wahlreaktionszeit",
              subtitle: "Reizdifferenzierung vor der motorischen Antwortauslösung",
              content: "Geht weit über einfache Reflexe hinaus: Nur auf relevante Reize reagieren und Störreize verwerfen schärft die taktische Schussdisziplin."
            },
            {
              title: "Woodworth-Flicks & Landungspräzision",
              subtitle: "Woodworth (1899) und Fitts-Gesetz (1954) bei hoher Dynamik",
              content: "85% der Distanz werden ballistisch überbrückt, gefolgt von feiner optischer Landungsverzögerung auf dem herabfallenden Zielpunkt."
            }
          ]
        }}
      />
      <DrillGuide {...dropGuide} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/reflex-training/drop-catch" />
    </>
  );
}
