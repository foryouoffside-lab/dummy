import WordRecallClient from '@/app/drills/memory/short-term-memory/word-recall/WordRecallClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Verbaler Gedächtnistest – Wortlisten-Recall | SkillDrills",
  description: "Kostenloser verbaler Gedächtnistest online: Präge dir Wortlisten ein, überwinde den seriellen Positionseffekt und trainiere dein Arbeitsgedächtnis im Browser.",
  keywords: [
    "verbales gedaechtnis test",
    "wortliste gedaechtnis test",
    "verbaler gedaechtnistest",
    "freie wiedergabe test",
    "serieller positionseffekt test",
    "woerter merken spiel",
    "kurzzeitgedaechtnis woerter test",
    "verbales arbeitsgedaechtnis",
    "wortabruf test online",
    "semantisches chunking lernen",
    "gedaechtnistraining woerter",
    "verbal memory test online"
  ],
  alternates: {
    canonical: "https://skilldrills.online/de/drills/memory/short-term-memory/word-recall",
    languages: getAlternateLanguages('/drills/memory/short-term-memory/word-recall', 'de'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Verbaler Gedächtnistest – Wortlisten-Recall | SkillDrills",
    description: "Kostenloser verbaler Gedächtnistest online: Präge dir Wortlisten ein, überwinde den seriellen Positionseffekt und trainiere dein Arbeitsgedächtnis im Browser.",
    url: "https://skilldrills.online/de/drills/memory/short-term-memory/word-recall",
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Verbaler Gedächtnistest – Wortlisten-Recall | SkillDrills",
    description: "Kostenloser verbaler Gedächtnistest online: Präge dir Wortlisten ein, überwinde den seriellen Positionseffekt und trainiere dein Arbeitsgedächtnis im Browser.",
  },
};

export const dynamic = 'force-static';

export default function LocalizedWordRecallPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://skilldrills.online/de" },
      { "@type": "ListItem", "position": 2, "name": "Gedächtnistraining", "item": "https://skilldrills.online/de/drills/memory" },
      { "@type": "ListItem", "position": 3, "name": "Kurzzeitgedächtnis", "item": "https://skilldrills.online/de/drills/memory/short-term-memory" },
      { "@type": "ListItem", "position": 4, "name": "Verbaler Gedächtnistest", "item": "https://skilldrills.online/de/drills/memory/short-term-memory/word-recall" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Verbaler Gedächtnistest (Wortlisten-Recall Test)",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Kostenloser neuropsychologischer Gedächtnistest im Browser zur Messung von freier Wortwiedergabe, semantischer Enkodierung und verbaler Arbeitsgedächtnisspanne.",
    "genre": "Cognitive Assessment / Verbal Memory",
    "url": "https://skilldrills.online/de/drills/memory/short-term-memory/word-recall",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Verbaler Gedächtnistest (Wortlisten-Recall Test)",
    "url": "https://skilldrills.online/de/drills/memory/short-term-memory/word-recall",
    "description": "Kostenloser neuropsychologischer Gedächtnistest im Browser zur Messung von freier Wortwiedergabe, semantischer Enkodierung und verbaler Arbeitsgedächtnisspanne.",
    "dateModified": "2026-09-05",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "isAccessibleForFree": true,
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Verbaler Gedächtnistest (Wortlisten-Recall Test)",
    "description": "Kostenloser neuropsychologischer Gedächtnistest im Browser zur Messung von freier Wortwiedergabe, semantischer Enkodierung und verbaler Arbeitsgedächtnisspanne.",
    "url": "https://skilldrills.online/de/drills/memory/short-term-memory/word-recall",
    "genre": ["Memory Game", "Cognitive Training", "Brain Game"],
    "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
    "applicationCategory": "Game",
    "operatingSystem": "Any",
    "numberOfPlayers": {
      "@type": "QuantitativeValue",
      "value": 1
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-05",
    "mainEntity": [
    {
        "@type": "Question",
        "name": "Was ist der verbale Gedächtnistest (Word Recall)?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ein neuropsychologisches Verfahren zur Messung des verbalen Kurzzeitgedächtnisses, der Arbeitsgedächtnisspanne und der unmittelbaren freien Wiedergabe. Teilnehmer prägen sich Wortlisten ein und reproduzieren ohne Reihenfolgebeschränkung so viele Wörter wie möglich."
        }
    },
    {
        "@type": "Question",
        "name": "Was unterscheidet freie Wiedergabe (Free Recall) von Wiedererkennen (Recognition)?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Wiedererkennen erfordert lediglich die passive Identifikation zuvor gesehener Reize. Freie Wiedergabe verlangt das aktive, ungestützte Auffinden von Gedächtnisspuren im Gehirn, was kognitiv wesentlich anspruchsvoller ist und die wahre Speicherkapazität abbildet."
        }
    },
    {
        "@type": "Question",
        "name": "Was ist ein durchschnittliches Ergebnis bei einem Wortabruftest?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "In klinischen Standardtests wie dem RAVLT erinnern gesunde Erwachsene im ersten Durchgang einer unbekannten Liste im Schnitt etwa 4 bis 6 Wörter. Mnemotechniken können diese Spanne deutlich erweitern."
        }
    },
    {
        "@type": "Question",
        "name": "Was ist der Rey Auditory Verbal Learning Test (RAVLT)?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ein 1958 von André Rey entwickelter klinischer Test zur quantitativen Erfassung von Lernrate, verbaler Merkspanne, retroaktiver und proaktiver Interferenz sowie verzögertem Abruf über mehrere Durchgänge."
        }
    },
    {
        "@type": "Question",
        "name": "Was ist der serielle Positionseffekt bei Wortlisten?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "1962 von Bennet B. Murdock Jr. mathematisch beschrieben: Die Wiedergabewahrscheinlichkeit folgt einer U-Kurve. Erste Wörter profitieren vom Primacy-Effekt (Langzeitspeicherung), letzte Wörter vom Recency-Effekt (flüchtiger Echospeicher), während die Mitte am stärksten vergessen wird."
        }
    },
    {
        "@type": "Question",
        "name": "Warum vergisst man Wörter in der Mitte einer Liste am schnellsten?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Mittlere Wörter leiden unter doppelter Interferenz: proaktiver Interferenz durch vorangegangene Wörter und retroaktiver Interferenz durch nachfolgende Wörter, was zu einem Engpass im Arbeitsgedächtnis führt."
        }
    },
    {
        "@type": "Question",
        "name": "Wie verbessert narrative Verknüpfung das Behalten von Wörtern?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Gemäß dem Levels-of-Processing-Modell (Craik & Lockhart, 1972) überführt tiefe semantische Elaboration isolierte Wörter in ein zusammenhängendes episodisches Schema, was die Wiederauffindbarkeit im Gedächtnis vervielfacht."
        }
    },
    {
        "@type": "Question",
        "name": "Spielt die Reihenfolge bei der freien Wiedergabe eine Rolle?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nein. Beim Free-Recall-Paradigma dürfen die Wörter in beliebiger Reihenfolge eingegeben werden. Ohne serielle Restriktionen wird das reine Speichervolumen anstatt der Sequenzkontrolle gemessen."
        }
    },
    {
        "@type": "Question",
        "name": "Verbessert dieses Training das Gedächtnis im Alltag?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sie verbessern sich gezielt bei dieser Aufgabe, und erlernte Strategien (Geschichtenmethode, semantische Gruppierung) lassen sich auf Einkaufszettel oder Lernstoff übertragen. Es handelt sich jedoch um kein Medizinprodukt oder Diagnoseinstrument."
        }
    },
    {
        "@type": "Question",
        "name": "Ist dieser Online-Wortgedächtnistest kostenlos?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ja, der SkillDrills Wort-Recall-Test ist zu 100 % kostenlos, läuft vollständig clientseitig im Browser ohne Registrierung und liefert sofortige Auswertungen Ihrer verbalen Gedächtnisleistung."
        }
    }
]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Wie man die verbale freie Wiedergabe und Wortspanne trainiert",
    "description": "Schritt-für-Schritt-Methode zur Verknüpfung von Wortlisten durch narrative Verknüpfung und sofortiges Entladen des Recency-Puffers.",
    "step": [
    {
        "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/de/drills/memory/short-term-memory/word-recall#step-1",
        "name": "Aufmerksamkeitsfokus und semantische Enkodierung",
        "text": "Fixieren Sie die Wörter in der Präsentationsphase, sprechen Sie jedes Wort innerlich aus und erzeugen Sie eine lebendige visuelle Vorstellung."
    },
    {
        "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/de/drills/memory/short-term-memory/word-recall#step-2",
        "name": "Konstruktion einer assoziativen Minigeschichte",
        "text": "Verbinden Sie die Wörter zu einer zusammenhängenden, übertriebenen Bildgeschichte (z. B. 'Der Ritter erstieg den Berg mit einer Laterne')."
    },
    {
        "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/de/drills/memory/short-term-memory/word-recall#step-3",
        "name": "Sofortiges Niederschreiben der letzten Wörter (Recency)",
        "text": "Tippen Sie bei Freigabe des Eingabefeldes sofort die letzten 2-3 Wörter ein, solange sie im flüchtigen echoischen Kurzzeitspeicher liegen."
    },
    {
        "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/de/drills/memory/short-term-memory/word-recall#step-4",
        "name": "Abrufen der Geschichte und Absenden",
        "text": "Rollen Sie anschließend Ihre Eingangsgeschichte von vorne auf, tippen Sie die restlichen Wörter getrennt durch Leerzeichen ein und senden Sie ab."
    }
]
  };

  const wordRecallGuide = {
    heading: "Leitfaden zum verbalen Gedächtnistest & Freie Wiedergabe",
    intro: [
      "Der verbale Gedächtnistest (Word Recall) ist eine anspruchsvolle kognitive Übung zur Erfassung und Stärkung des verbalen Arbeitsgedächtnisses, der semantischen Assoziationsbildung und der freien Wiedergabekapazität.",
      "Die wissenschaftliche Erforschung begann mit Hermann Ebbinghaus (1885) und seiner Vergessenskurve. 1958 standardisierte André Rey den RAVLT, um Wortlistenlernen und Interferenzanfälligkeit in klinischen Stichproben zu quantifizieren.",
      "Bennet B. Murdock Jr. formalisierte 1962 den seriellen Positionseffekt, und Craik & Lockhart (1972) bewiesen im 'Levels of Processing'-Ansatz, dass tiefe semantische Einbettung das bloße Auswendiglernen weit übertrifft.",
      "Dank browserbasierter Hochpräzision (performance.now()) misst dieser Drill Ihre Wortspanne objektiv über eine adaptive Treppenstufenmethode. Alle Daten bleiben strikt lokal auf Ihrem Gerät."
],
    benchmarks: {
      title: "Normative Benchmarks für verbale freie Wiedergabe",
      headers: ["Leistungsstufe", "Wortspanne (Anzahl)", "Freie Wiedergabe Punkte", "Kognitives Profil & Abrufverhalten"],
      rows: [
        [
                "Tier 1 (Hervorragend / 99. Perzentil)",
                "8 – 11+ Wörter",
                "1.100+ Punkte",
                "Mnemotechnischer Meister; nutzt narrative Ketten; überwindet retroaktive Interferenz mühelos; Abruftakt unter 800 ms"
        ],
        [
                "Tier 2 (Überdurchschnittlich / 85.–95. Perzentil)",
                "6 – 7 Wörter",
                "850 – 1.099 Punkte",
                "Übertrifft Standard-Erwachsenennorm; gruppiert Wörter paarweise; stabiler Abruf unter Zeitdruck"
        ],
        [
                "Tier 3 (Durchschnitt Erwachsene / 50. Perzentil)",
                "4 – 5 Wörter",
                "550 – 849 Punkte",
                "Normbereich bei unvertrauten Listen im ersten Durchgang; zeigt typischen U-Kurven-Abfall in der Listenmitte"
        ],
        [
                "Tier 4 (Unterdurchschnittlich / Engpass)",
                "3 Wörter",
                "350 – 549 Punkte",
                "Stützt sich rein auf den phonologischen Echospeicher ohne semantische Kodierung"
        ],
        [
                "Tier 5 (Reduzierte Wortspanne)",
                "< 3 Wörter",
                "< 350 Punkte",
                "Schneller Zerfall von Gedächtnisspuren; hohe Anfälligkeit für proaktive Interferenz"
        ]
],
      note: "Die Wortspanne gibt die maximale fehlerfreie Listenlänge auf der adaptiven Treppe an; Normwerte spiegeln Durchgang 1 bei Erwachsenen wider (Rey, 1964; Murdock, 1962)."
    },
    techniques: {
      title: "Evidenzbasierte Protokolle zur Erweiterung der verbalen Wortspanne",
      items: [
        {
                "name": "Narrative Verknüpfung & Assoziationsketten",
                "desc": "Verbinden Sie unzusammenhängende Wörter zu einer lebhaften, bizarren Minigeschichte (Craik & Lockhart, 1972). 'Adler', 'Schloss' und 'Laterne' zu 'Ein Adler mit brennender Laterne landete auf dem Schloss' verschmilzt 3 Token zu einer Szene.",
                "tips": "Je übertriebener, farbenfroher und physikalisch unmöglicher das Vorstellungsbild, desto haltbarer die Gedächtnisspur."
        },
        {
                "name": "Duale Kodierung (Mentales Bild + Auditiver Echo)",
                "desc": "Aktivieren Sie Allan Paivios duale Kodierung, indem Sie das Aussehen jedes Substantivs visualisieren und gleichzeitig den Klang innerlich artikulieren.",
                "tips": "Stellen Sie sich Farbe und Struktur des Gegenstands für eine halbe Sekunde bildhaft vor."
        },
        {
                "name": "Kategoriale & Semantische Clusterung",
                "desc": "Organisieren Sie die Liste mental in Sinneinheiten um (Natur, Bauwerke, Edelmetalle, Werkzeuge), unabhängig von der Einblendreihenfolge (Tulving, 1962).",
                "tips": "Vergeben Sie mentale Schlagwörter für gemeinsame Eigenschaften."
        },
        {
                "name": "Recency-First Entladestrategie",
                "desc": "Tippen Sie bei Beginn der Eingabephase sofort die letzten 2-3 Wörter ein (Murdock, 1962). Diese liegen noch im flüchtigen Echospeicher vor und verblassen nach 3 bis 5 Sekunden.",
                "tips": "Zuerst die frischesten Wörter abladen, danach entspannt die Anfangsgeschichte abrufen."
        }
]
    },
    steps: [
      "Richten Sie den Blick auf das Display und fokussieren Sie die Merkphase.",
      "Verbinden Sie auftauchende Wörter sofort zu einer lebhaften gedanklichen Szene.",
      "Bauen Sie kontrastreiche visuelle Vorstellungsbilder für duale Gedächtnisspuren auf.",
      "Tippen Sie im Eingabefenster zuerst die letzten Wörter ein und entfalten Sie dann die Geschichte.",
      "Lassen Sie die adaptive Treppe Ihre Wortspanne ermitteln und schrittweise erweitern."
],
    audience: "Schüler, Studenten, Berufstätige und alle, die ihre sprachliche Merkfähigkeit und ihr verbales Arbeitsgedächtnis gezielt trainieren möchten.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('craik1972', 'murdock1962', 'tulving1962', 'woods2015'),
    related: [
      { href: "/drills/memory/short-term-memory/digit-span", label: "Digit Span Memory Test" },
      { href: "/drills/memory/short-term-memory/color-sequence", label: "Color Memory Game" },
      { href: "/drills/memory/spatial-memory/grid-memorization", label: "Visual Memory Test" },
      { href: "/drills/memory/spatial-memory/object-location", label: "Object Location Memory Test" },
      { href: "/drills/memory/working-memory/n-back", label: "3-Back Working Memory Test" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <WordRecallClient copy={{
          "h1Keyword": "Verbaler Gedächtnistest",
          "h1Suffix": " – Kostenloser Wortlisten-Recall Test",
          "subtitle": "Die freie Wiedergabe einer Wortliste verläuft nie gleichmäßig: Anfangs- und Endwörter werden am besten erinnert, während die Mitte dem seriellen Positionseffekt (Murdock, 1962) zum Opfer fällt. Tiefe semantische Verarbeitung (Craik & Lockhart, 1972) schlägt oberflächliches Anstarren.",
          "statScore": "Punkte",
          "statTime": "Zeit",
          "statWords": "Wörter",
          "wordsUnit": "Wörter",
          "statBestScore": "Bestwert",
          "memorizePhase": "WÖRTER EINPRÄGEN",
          "btnSkip": "Überspringen",
          "inputPhase": "ERINNERTE WÖRTER EINGEBEN",
          "inputPlaceholder": "Erinnerte Wörter mit Leerzeichen getrennt eingeben...",
          "btnSubmit": "ANTWORT ABSENDEN",
          "inputHint": "Enter-Taste zum Absenden drücken",
          "feedbackPhase": "ERGEBNISAUSWERTUNG",
          "extraWordsLabel": "Überflüssige oder falsch eingegebene Wörter:",
          "startTitle": "Wort-Recall Pro",
          "startSubtitle": "Verbales Kurzzeitgedächtnis • Freie Wortwiedergabe",
          "countdownSubtitle": "BEREITMACHEN",
          "newBest": "NEUER REKORD",
          "pointsLabel": "Punkte",
          "statAccuracy": "Genauigkeit",
          "statPeakWords": "Max. Wörter",
          "statPerfects": "Perfekt",
          "btnPlayAgain": "Nochmal spielen",
          "rulesTitle": "Regeln & Punktesystem",
          "aboutTitle": "Über den verbalen Gedächtnistest (Word Recall)",
          "rulesItems": [
                    {
                              "num": "1",
                              "text": "Wortlisten-Abruf",
                              "highlight": "+150 PKT",
                              "result": "Wörter während der Merkphase einprägen und danach frei eintippen"
                    },
                    {
                              "num": "2",
                              "text": "Stufen-Bonus",
                              "highlight": "Bis zu +135%",
                              "result": "Längere Wortlisten bringen deutlich mehr Punkte pro Durchgang"
                    },
                    {
                              "num": "3",
                              "text": "Fehlversuch / Timeout",
                              "highlight": "-1 Wort",
                              "result": "Kein Punkteabzug; die Wortanzahl sinkt adaptiv um 1 Wort"
                    },
                    {
                              "num": "4",
                              "text": "Adaptive Wortspanne",
                              "highlight": "Steigt & fällt",
                              "result": "Konvergiert präzise auf Ihre tatsächliche verbale Gedächtnisgrenze"
                    }
          ],
          "wordBank": [
                    "Apfel",
                    "Brücke",
                    "Schloss",
                    "Diamant",
                    "Adler",
                    "Wald",
                    "Garten",
                    "Hammer",
                    "Insel",
                    "Dschungel",
                    "Ritter",
                    "Laterne",
                    "Berg",
                    "Nadel",
                    "Ozean",
                    "Palast",
                    "Königin",
                    "Rakete",
                    "Sonnenuntergang",
                    "Tempel",
                    "Regenschirm",
                    "Tal",
                    "Fenster",
                    "Zebra",
                    "Kerze",
                    "Drache",
                    "Feder",
                    "Silber",
                    "Gold",
                    "Marmor",
                    "Samt",
                    "Kristall",
                    "Bronze",
                    "Kupfer",
                    "Schatten",
                    "Geist",
                    "Weisheit",
                    "Ehre",
                    "Ruhm",
                    "Traum",
                    "Sturm",
                    "Fluss",
                    "Wolke",
                    "Flamme",
                    "Stein",
                    "Donner",
                    "Regenbogen",
                    "Phönix",
                    "Uhr",
                    "Spiegel"
          ]
}} />
      <DrillGuide guide={wordRecallGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/short-term-memory/word-recall"
          locale="de"
        />
      </div>
    </>
  );
}
