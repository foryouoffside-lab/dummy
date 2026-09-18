import NBackClient from '@/app/drills/memory/working-memory/n-back/NBackClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — de-DE (n-back)
// PRIMARY:  "n-back test online"          — High intent German query (15 suggestions: online, free)
//           "dual n back online"          — High volume intent
//           "n back test"                 — Core query
// SECONDARY / LSI:
//           "n back test online free"     — Cost / access query
//           "arbeitsgedächtnis test online"— Cognitive domain query
//           "arbeitsgedächtnis training"  — Training query
// ============================================================

export const metadata = {
  title: "N-Back Test Online – Arbeitsgedächtnis | SkillDrills",
  description: "Kostenloser N-Back Test online: Trainiere dein Arbeitsgedächtnis und die kontinuierliche Informationsaktualisierung bei 2-Back und 3-Back im Browser.",
  keywords: ['n-back test online', 'arbeitsgedaechtnis test', 'dual n-back online', 'n-back aufgabe', 'arbeitsgedaechtnis training', '3-back test', 'fluide intelligenz n-back', 'informationsaktualisierung test', 'n-back gedaechtnistraining', 'exekutive funktionen test', 'kognitives n-back training', 'arbeitsgedaechtniskapazitaet'],
  openGraph: {
    title: "N-Back Test Online – Kostenloses Arbeitsgedächtnis-Training | SkillDrills",
    description: "Kostenloser N-Back Test online. Trainieren Sie Ihr Arbeitsgedächtnis und die kontinuierliche Informationsaktualisierung bei 2-Back, 3-Back und darüber hinaus im Browser.",
    type: "website",
    url: "https://skilldrills.online/de/drills/memory/working-memory/n-back",
    siteName: "SkillDrills",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "N-Back Test Online – Kostenloses Arbeitsgedächtnis-Training | SkillDrills",
    description: "Kostenloser N-Back Test online. Trainieren Sie Ihr Arbeitsgedächtnis und die kontinuierliche Informationsaktualisierung bei 2-Back, 3-Back und darüber hinaus im Browser.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/de/drills/memory/working-memory/n-back",
    languages: getAlternateLanguages('/drills/memory/working-memory/n-back'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
    { "@type": "ListItem", "position": 2, "name": "Gedächtnistraining", "item": "https://skilldrills.online/de/drills/memory" },
    { "@type": "ListItem", "position": 3, "name": "Arbeitsgedächtnis", "item": "https://skilldrills.online/de/drills/memory/working-memory" },
    { "@type": "ListItem", "position": 4, "name": "N-Back Test Online", "item": "https://skilldrills.online/de/drills/memory/working-memory/n-back" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "N-Back Test Online (Arbeitsgedächtnis-Training)",
  "url": "https://skilldrills.online/de/drills/memory/working-memory/n-back",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "isAccessibleForFree": true,
  "dateModified": "2026-09-11",
  "educationalUse": ["Arbeitsgedächtnis-Kapazität", "Informationsaktualisierung", "Exekutive Funktionen", "Fluide Intelligenz"]
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "N-Back Test – Kognitives Gedächtnisspiel Online",
  "url": "https://skilldrills.online/de/drills/memory/working-memory/n-back",
  "description": "Prüfen Sie kontinuierlich, ob der aktuelle Buchstabe mit dem vor N Schritten gezeigten übereinstimmt.",
  "dateModified": "2026-09-11",
  "gamePlatform": "Web Browser",
  "genre": ["Cognitive Training", "Working Memory", "Brain Training", "N-Back"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};


const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "N-Back Test Online (Dual N-Back)",
  "url": "https://skilldrills.online/de/drills/memory/working-memory/n-back",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "dateModified": "2026-09-11",
  "author": { "@type": "Organization", "name": "SkillDrills" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Wie man das Arbeitsgedächtnis mit dem N-Back Test trainiert",
  "description": "Wissenschaftlich fundierte 4-Schritte-Strategie zur Beherrschung der kontinuierlichen Arbeitsgedächtnis-Aktualisierung.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/de/drills/memory/working-memory/n-back#step-1",
      
      "name": "Aktives Zielfenster als rotierende FIFO-Warteschlange rezitieren",
      "text": "Wiederholen Sie die letzten N Buchstaben innerlich in chronologischer Reihenfolge (phonologische Schleife) wie einen gleitenden Puffer."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/de/drills/memory/working-memory/n-back#step-2",
      
      "name": "Aktuellen Reiz mit dem vor N Schritten vergleichen",
      "text": "Sobald ein neuer Buchstabe erscheint, vergleichen Sie ihn unverzüglich mit dem ältesten Eintrag in Ihrem Puffer."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/de/drills/memory/working-memory/n-back#step-3",
      
      "name": "Ältesten Eintrag verwerfen und neuen Buchstaben anfügen",
      "text": "Führen Sie ein sofortiges mentales Update durch: Ältesten verifizierten Buchstaben löschen und neuen Buchstaben vorne anhängen."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/de/drills/memory/working-memory/n-back#step-4",
      
      "name": "Gleichmäßigen Aufmerksamkeitsrhythmus ohne Verharren halten",
      "text": "Halten Sie Ihr Tempo und verharren Sie nicht bei Fehlern. Wer Fehlern nachhängt, verliert die nachfolgenden Pufferpositionen."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was ist der N-Back Arbeitsgedächtnis-Test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der N-Back Test ist ein klassisches neuropsychologisches Paradigma zur Messung der kontinuierlichen Informationsaktualisierung im Arbeitsgedächtnis. Teilnehmer beobachten eine Reizabfolge und entscheiden, ob der aktuelle Reiz mit dem vor genau N Schritten gezeigten übereinstimmt."
      }
    },
    {
      "@type": "Question",
      "name": "Wer erfand die N-Back-Aufgabe und zu welchem Zweck?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wayne K. Kirchner entwickelte die N-Back-Aufgabe 1958, um altersbedingte Unterschiede beim kurzzeitigen Behalten sich schnell verändernder Informationen zu untersuchen."
      }
    },
    {
      "@type": "Question",
      "name": "Welche kognitiven Fähigkeiten misst N-Back primär?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "N-Back testet vor allem die kontinuierliche Aktualisierung (Updating) des Arbeitsgedächtnisses und die zentrale exekutive Kontrolle im dorsolateralen präfrontalen Kortex (DLPFC)."
      }
    },
    {
      "@type": "Question",
      "name": "Worin unterscheidet sich N-Back von einfachen Zahlen-Merktests (Digit Span)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Einfache Zahlenspannen messen die passive Speicherkapazität (statisches Halten). N-Back erfordert aktive Manipulation und ständige Aktualisierung: Bei jedem Reiz muss der älteste Eintrag gelöscht und der neueste angehängt werden."
      }
    },
    {
      "@type": "Question",
      "name": "Kann N-Back-Training die fluide Intelligenz (IQ) steigern?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die vielbeachtete Studie von Jaeggi et al. (2008, PNAS) zeigte, dass adaptives N-Back-Training zu Verbesserungen der fluiden Intelligenz (Gf) führte. Auch wenn die Transfereffekte in der Forschung diskutiert werden, stärkt N-Back nachweislich die Aufmerksamkeitskontrolle."
      }
    },
    {
      "@type": "Question",
      "name": "Was ist ein normaler Wert für Erwachsene beim 3-Back-Test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gesunde junge Erwachsene erreichen bei Standard-3-Back-Aufgaben typischerweise eine Genauigkeit von 65% bis 80%. Werte über 85% oder das Meistern von 4-Back weisen auf eine überdurchschnittliche exekutive Kapazität hin."
      }
    },
    {
      "@type": "Question",
      "name": "Was ist der Unterschied zwischen Single N-Back und Dual N-Back?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Single N-Back verwendet eine Reizmodalität (z. B. Buchstaben). Dual N-Back präsentiert zeitgleich zwei unabhängige Reizströme (typischerweise Gitterpositionen und gesprochene Laute), was geteilte Aufmerksamkeit erfordert."
      }
    },
    {
      "@type": "Question",
      "name": "Wie hilft das innerliche Mitsprechen (subvokales Wiederholen)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Subvokalisieren aktiviert die phonologische Schleife (Baddeley, 1986). Das rhythmische innerliche Wiederholen der aktuellen N Einträge schützt vor schnellem Zerfall der Gedächtnisspuren."
      }
    },
    {
      "@type": "Question",
      "name": "Warum bricht die Leistung bei 4-Back und 5-Back oft deutlich ein?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nach Nelson Cowans (2001) Arbeitsgedächtnismodell liegt die biologische Kapazität des bewussten Aufmerksamkeitsfokus bei etwa 4±1 Elementen. 4-Back und 5-Back überschreiten diese Grenze."
      }
    },
    {
      "@type": "Question",
      "name": "Wie überträgt sich die Arbeitsgedächtniskapazität auf den Alltag?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein trainiertes Arbeitsgedächtnis unterstützt komplexe Entscheidungen unter Zeitdruck, Software-Debugging, das Verfolgen mehrerer Variablen in Finanzanalysen sowie blitzschnelle Lagebeurteilungen im E-Sport."
      }
    }
  ]
};

const nBackClientCopyDe = {
  h1Keyword: "N-Back Test Online",
  h1Suffix: " – Arbeitsgedächtnis-Training",
  caption: "Die N-Back-Aufgabe verlangt die kontinuierliche Entscheidung, ob der aktuelle Reiz mit dem vor N Schritten gezeigten übereinstimmt. Gemäß dem Arbeitsgedächtnismodell von Baddeley & Hitch (1974) kombiniert dies simultane Speicherung und aktive Aktualisierung.",
  statScore: "Punkte",
  statTime: "Zeit",
  statLevel: "Level",
  statBest: "Highscore",
  hudScore: "Punkte",
  hudTime: "Zeit",
  modeSuffix: "-BACK TRAINING",
  memorizingText: "Erste {n} Buchstaben einprägen...",
  btnMatch: "TREFFER (MATCH)",
  btnNoMatch: "KEIN TREFFER",
  startTitle: "Dual N-Back Training Pro",
  startSubtitle: "Arbeitsgedächtnis • Sequenzaktualisierung",
  countdownSubtitle: "BEREITMACHEN",
  newBest: "NEUER REKORD",
  pointsLabel: "Punkte",
  statAccuracy: "Genauigkeit",
  statPeakLevel: "Höchstes Level",
  statPerfects: "Treffer",
  btnPlayAgain: "Erneut spielen",
  rulesTitle: "Anleitung & Punktesystem",
  rulesItems: [
    { num: "1", text: "Treffer / Kein Treffer (vor N Schritten)", highlight: "+150 Punkte", result: "Pro korrekte Entscheidung" },
    { num: "2", text: "Levelaufstieg", highlight: "3-Back → 4-Back+", result: "Alle 1.200 Punkte" },
    { num: "3", text: "Schnellere Reizdauer", highlight: "2.000 ms → 1.200 ms", result: "Schnellere Buchstaben auf höheren Stufen" },
    { num: "4", text: "Zeitüberschreitung", highlight: "Kein Punkteabzug", result: "Kein Verlust von Zeit oder Punkten" },
    { num: "5", text: "Falsche Eingabe", highlight: "Unterbricht Serie", result: "Kein Zeitabzug — läuft die vollen 45 Sekunden" }
  ]
};

const guideDe = {
  heading: "N-Back Test Leitfaden & Kognitive Benchmarks",
  intro: [
    "Der N-Back Arbeitsgedächtnis-Test ist das führende neuropsychologische Paradigma zur Bewertung der kontinuierlichen Informationsaktualisierung, exekutiven kognitiven Kontrolle und aktiven Informationserhaltung unter Zeitdruck. Ausgehend von Wayne K. Kirchners (1958) bahnbrechenden Untersuchungen ist die N-Back-Aufgabe zum weltweiten Standard in den kognitiven Neurowissenschaften geworden.",
    "Im Gegensatz zu passiven Gedächtnistests erfordert N-Back die kontinuierliche Aktualisierung eines dynamischen mentalen Puffers. Während Buchstaben in schneller Folge erscheinen, müssen Sie entscheiden, ob der aktuelle Buchstabe mit dem vor genau N Schritten gezeigten übereinstimmt.",
    "Messmethodik: Alle Zeitstempel werden mit der hochauflösenden performance.now() Systemuhr Ihres Browsers direkt auf Ihrem Gerät erfasst – es werden keine Daten übertragen. Behandeln Sie Differenzen unter 5 ms als Messtoleranz und vergleichen Sie Ihre Durchläufe stets auf derselben Hardware.",
    "Datentransparenz: SkillDrills erfasst keine aggregierten Nutzerdaten. Ihre Ergebnisse verbleiben ausschließlich im localStorage Ihres Browsers.",
    "Dieser Test ist ein kostenloses Browserspiel zu Übungs- und Trainingszwecken. Er ist kein Medizinprodukt und stellt kein diagnostisches Instrument dar."
  ],
  metrics: [
    { label: "Spitzen-N-Back-Level", desc: "Höchste erreichte Stufe (3-Back Basis, 4-Back Fortgeschritten, 5-Back+ Elite)." },
    { label: "Gesamtpunktzahl", desc: "In 45 Sekunden erzielte Punkte (+150 Punkte pro korrekte Entscheidung)." },
    { label: "Urteilsgenauigkeit", desc: "Prozentsatz korrekter Treffer- und Nicht-Treffer-Entscheidungen." },
    { label: "Aktualisierungsrate", desc: "Entscheidungsgeschwindigkeit und Reaktionslatenz während der Reizfenster." }
  ],
  benchmarks: [
    { tier: "Tier 1: Exzellentes Arbeitsgedächtnis (Elite / Top 1%)", range: "4-Back bis 5-Back+ (1.200+ Punkte)", desc: "Hält eine 4-5-Elemente-FIFO-Warteschlange im Kopf; Latenz unter 600 ms; Genauigkeit über 92%." },
    { tier: "Tier 2: Überdurchschnittlich (Top 5–15%)", range: "Stabiles 3-Back mit 4-Back-Übergang (900 – 1.199 Punkte)", desc: "Übertrifft die durchschnittliche Norm; meistert 3-Back mit minimalen Fehlern; Genauigkeit 80%–91%." },
    { tier: "Tier 3: Durchschnittliche Norm (50th Percentile)", range: "Solides 3-Back (600 – 899 Punkte)", desc: "Normative Basislinie gesunder Erwachsener (Kirchner, 1958); 65%–79% Genauigkeit." },
    { tier: "Tier 4: Unterdurchschnittlich (15–30%)", range: "Instabiles 3-Back (400 – 599 Punkte)", desc: "Schwierigkeiten bei 3 Elementen; häufige Verwechslung mit 2-Back; Genauigkeit 50%–64%." },
    { tier: "Tier 5: Entwicklungsbedarf (< 15%)", range: "Unter 3-Back (< 400 Punkte)", desc: "Deutlicher Engpass bei der kontinuierlichen Informationsaktualisierung; Genauigkeit unter 50%." }
  ],
  science: [
    { title: "Wayne K. Kirchner (1958): Ursprung des N-Back-Paradigmas", body: "Kirchner führte die Aufgabe ein, um das Behalten sich schnell verändernder Daten zu untersuchen." },
    { title: "Alan Baddeley (1986, 2000): Die zentrale Exekutive", body: "Im Arbeitsgedächtnismodell fordert N-Back die Koordination von phonologischer Schleife und dorsolateralem präfrontalem Kortex." },
    { title: "Adele Diamond (2013): Triade der exekutiven Funktionen", body: "Diamond identifizierte Arbeitsgedächtnisaktualisierung, Inhibition und kognitive Flexibilität als Fundament." },
    { title: "Susanne M. Jaeggi et al. (2008): Transfer auf fluide Intelligenz", body: "Zeigte signifikante Zuwächse bei Matrizentests durch adaptives N-Back-Training." },
    { title: "Nelson Cowan (2001): Das 4±1-Kapazitätslimit", body: "Der bewusste Aufmerksamkeitsfokus fasst etwa 4 unstrukturierte Informationseinheiten." },
    { title: "David L. Woods et al. (2015): Chronometrische Standards", body: "Standardisierte computergestützte Reaktionszeit- und Signalentdeckungsmetriken." }
  ],
  protocols: [
    { title: "Gleitende verbale Warteschlange", body: "Wiederholen Sie die letzten 3 Buchstaben innerlich wie eine Endlosschleife (z. B. 'B-M-T' wird zu 'M-T-R')." },
    { title: "Inhibitorische Kontrolle gegen Täuschungsreize", body: "Vermeiden Sie voreilige Klicks auf Buchstaben, die vor 1 oder 2 Schritten zu sehen waren." },
    { title: "Duale phonologisch-räumliche Verankerung", body: "Stellen Sie sich drei mentale Fächer vor, durch die die Buchstaben nach links durchwandern." },
    { title: "Schneller mentaler Neustart", body: "Wenn Sie den Faden verlieren, setzen Sie sofort beim nächsten Reiz neu an." }
  ],
  sources: pickSources('baddeley1974', 'baddeley1986', 'cowan2001', 'woods2015'),
  faqs: [
    { q: "Was ist der N-Back Arbeitsgedächtnis-Test?", a: "Ein neuropsychologisches Paradigma zur Messung der kontinuierlichen Informationsaktualisierung im Arbeitsgedächtnis." },
    { q: "Wer erfand die N-Back-Aufgabe und zu welchem Zweck?", a: "Wayne K. Kirchner entwickelte die Aufgabe 1958 zur Erforschung des Behaltens dynamischer Informationen." },
    { q: "Welche kognitiven Fähigkeiten misst N-Back primär?", a: "Kontinuierliche Aktualisierung, zentrale exekutive Kontrolle und Interferenzhemmung." },
    { q: "Worin unterscheidet sich N-Back von einfachen Zahlen-Merktests?", a: "N-Back erfordert permanente dynamische Manipulation statt bloßer statischer Speicherung." },
    { q: "Kann N-Back-Training die fluide Intelligenz (IQ) steigern?", a: "Studien wie Jaeggi et al. (2008) belegen bedeutsame Transfereffekte auf Problemlösungskompetenzen." },
    { q: "Was ist ein normaler Wert für Erwachsene beim 3-Back-Test?", a: "Gesunde Erwachsene erreichen durchschnittlich 65% bis 80% Genauigkeit." },
    { q: "Was ist der Unterschied zwischen Single N-Back und Dual N-Back?", a: "Single nutzt einen Reizkanal; Dual verarbeitet zeitgleich visuelle Positionen und akustische Buchstaben." },
    { q: "Wie hilft das innerliche Mitsprechen (subvokales Wiederholen)?", a: "Es bindet die phonologische Schleife ein und verhindert das Verblassen der Reizspuren." },
    { q: "Warum bricht die Leistung bei 4-Back und 5-Back oft deutlich ein?", a: "Weil die menschliche Aufmerksamkeitsspanne bei 4±1 Einheiten ihre biologische Grenze erreicht (Cowan, 2001)." },
    { q: "Wie überträgt sich die Arbeitsgedächtniskapazität auf den Alltag?", a: "Sie erleichtert Multitasking, Programmieren, Textverständnis und strategische Entscheidungsfindung." }
  ],
  related: [
    { href: "/de/drills/memory/spatial-memory/path-tracing", title: "Pfadverfolgungs-Gedächtnistest", desc: "Räumliche Routen auf dynamischen Gittern nachvollziehen." },
    { href: "/de/drills/memory/spatial-memory/grid-memorization", title: "Visueller Gittertest", desc: "2D-Schachbrettmuster memorieren und visuelle Speicherkapazität testen." },
    { href: "/de/drills/memory/spatial-memory/object-location", title: "Objektplatzierungs-Test", desc: "Räumliche Relationen und Positionen auf Quadrantenkarten behalten." },
    { href: "/de/drills/memory/short-term-memory/digit-span", title: "Zahlenspannen-Test (Digit Span)", desc: "Kurzzeitgedächtnis und phonologische Schleife prüfen." },
    { href: "/de/drills/memory/short-term-memory/word-recall", title: "Wort-Wiedererkennungstest", desc: "Verbales Erinnerungsvermögen unter Zeitdruck messen." },
    { href: "/de/drills/memory/short-term-memory/color-sequence", title: "Farbgedächtnis-Spiel", desc: "Farbsequenzen bei steigender Frequenz fehlerfrei wiederholen." }
  ]
};

export default function NBackPageDe() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <NBackClient copy={nBackClientCopyDe} />

      <DrillGuide
        lead={guideDe.lead}
        metrics={guideDe.metrics}
        benchmarks={guideDe.benchmarks}
        science={guideDe.science}
        protocols={guideDe.protocols}
        sources={guideDe.sources}
        faqs={guideDe.faqs}
        related={guideDe.related}
      />

      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="memory" currentHref="/drills/memory/working-memory/n-back" locale="de" />
      </div>
    </>
  );
}
