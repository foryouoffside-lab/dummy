import DistractionFighterClient from '@/app/drills/cognitive/focus/distraction-fighter/DistractionFighterClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — de-DE (cognitive/focus/distraction-fighter)
// PRIMARY:  "Stroop-Test"                    — High search volume domestic test query
//           "Stroop-Test online"             — High conversion direct tool query
// SECONDARY / LSI:
//           "Stroop-Effekt"                  — Academic & psychometric query
//           "Farb-Wort-Interferenz"          — Classical German scientific term
//           "Kognitive Inhibition"           — Cognitive mechanism term
//           "Selektive Aufmerksamkeit Test"  — Diagnostic phrase
//           "Konzentrationstest kostenlos"   — Casual brain training query
//           "Stroop Test online kostenlos"   — High-intent free tool search
// WINNER TITLE: Stroop-Test Online – Kostenloser Farb-Wort-Test | SkillDrills
// ============================================================

export const metadata = {
  title: "Stroop-Test Online – Farb-Wort-Interferenz | SkillDrills",
  description: "Kostenloser Stroop-Test online: Messe kognitive Inhibition und selektive Aufmerksamkeit beim Farb-Wort-Interferenztest direkt im Browser ohne Anmeldung.",
  keywords: [
    "Stroop-Test",
    "Stroop-Test online",
    "Stroop-Effekt",
    "Farb-Wort-Interferenz",
    "Kognitive Inhibition",
    "Selektive Aufmerksamkeit Test",
    "Konzentrationstest kostenlos",
    "Stroop Test online kostenlos",
    "Gehirntraining Konzentration",
    "Impulskontrolle trainieren"
  ],
  openGraph: {
    title: "Stroop-Test Online – Farb-Wort-Interferenz | SkillDrills",
    description: "Kostenloser Stroop-Test online: Messe kognitive Inhibition und selektive Aufmerksamkeit beim Farb-Wort-Interferenztest direkt im Browser ohne Anmeldung.",
    type: "website",
    url: "https://skilldrills.online/de/drills/cognitive/focus/distraction-fighter",
    siteName: "SkillDrills",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stroop-Test Online – Farb-Wort-Interferenz | SkillDrills",
    description: "Kostenloser Stroop-Test online: Messe kognitive Inhibition und selektive Aufmerksamkeit beim Farb-Wort-Interferenztest direkt im Browser ohne Anmeldung.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/de/drills/cognitive/focus/distraction-fighter",
    languages: getAlternateLanguages('/drills/cognitive/focus/distraction-fighter'),
  },
};

export default function DistractionFighterPageDe() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://skilldrills.online/de" },
      { "@type": "ListItem", "position": 2, "name": "Kognitive Drills", "item": "https://skilldrills.online/de/drills/cognitive" },
      { "@type": "ListItem", "position": 3, "name": "Stroop-Test", "item": "https://skilldrills.online/de/drills/cognitive/focus/distraction-fighter" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Stroop-Test Online (Farb-Wort-Interferenz)",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-15",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Kostenloser interaktiver Online-Stroop-Test zur Messung von kognitiver Inhibition, selektiver Aufmerksamkeit und Impulskontrolle.",
    "genre": "Kognitives Training / Aufmerksamkeit / Stroop-Effekt",
    "url": "https://skilldrills.online/de/drills/cognitive/focus/distraction-fighter",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Stroop-Test Online (Farb-Wort-Interferenz)",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-15",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "browserRequirements": "HTML5, JavaScript fähiger Webbrowser",
    "description": "Kostenloser interaktiver Online-Stroop-Test zur Messung von kognitiver Inhibition, selektiver Aufmerksamkeit und Impulskontrolle.",
    "url": "https://skilldrills.online/de/drills/cognitive/focus/distraction-fighter"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Stroop-Test Online (Farb-Wort-Interferenz)",
    "url": "https://skilldrills.online/de/drills/cognitive/focus/distraction-fighter",
    "description": "Kostenloser browserbasierter Stroop-Test. Bestimme die Schriftfarbe inkongruenter Farbwörter und unterdrücke automatisierte Leseimpulse.",
    "dateModified": "2026-09-15",
    "gamePlatform": "Web Browser",
    "genre": ["Kognitives Training", "Gehirntraining", "Stroop-Test", "Aufmerksamkeit"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-15",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Was ist der Stroop-Test und was misst er?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Der Stroop-Test ist ein klassisches psychologisches Experiment, das 1935 von J. Ridley Stroop entwickelt wurde. Er misst die kognitive Interferenzkontrolle und selektive Aufmerksamkeit, indem er prüft, wie schnell und präzise eine Person die Druckfarbe eines Wortes benennen kann, dessen Textbedeutung eine andere Farbe beschreibt (z. B. das Wort 'BLAU' in roter Schrift)."
        }
      },
      {
        "@type": "Question",
        "name": "Warum entsteht der Stroop-Effekt im menschlichen Gehirn?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Das Lesen geschriebener Wörter ist bei geübten Erwachsenen ein automatisierter, unwillkürlicher Prozess (MacLeod, 1991). Die semantische Wortbedeutung wird schneller verarbeitet als die visuelle Farbwahrnehmung. Um die richtige Farbe auszuwählen, muss das Gehirn im präfrontalen Kortex den automatischen Leseimpuls aktiv hemmen."
        }
      },
      {
        "@type": "Question",
        "name": "Was versteht man unter kognitiver Inhibition?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Kognitive Inhibition ist die exekutive Funktion des Gehirns, irrelevante Reize, störende Gedanken oder gewohnheitsmäßige Verhaltensweisen zu unterdrücken, um zielgerichtet handeln zu können. Sie ist unverzichtbar für Konzentration in lauten Umgebungen und Impulskontrolle."
        }
      },
      {
        "@type": "Question",
        "name": "Wie kann man seine Leistung im Stroop-Test verbessern?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Versuche, die Buchstaben nicht innerlich vorzulesen (keine Subvokalisation). Richte deinen Blick auf die visuelle Kontur oder Randpixel der Buchstaben, um die reine Farbwahrnehmung vor der semantischen Bedeutung zu isolieren."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Hirnareale werden beim Stroop-Test aktiviert?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Neuroimaging-Studien zeigen eine starke Aktivierung im dorsolateralen präfrontalen Kortex (DLPFC) für die Zielaufrechterhaltung und im anterioren cingulären Kortex (ACC) für die Erkennung und Auflösung kognitiver Konflikte (Posner & Petersen, 1990)."
        }
      },
      {
        "@type": "Question",
        "name": "Was unterscheidet den Stroop-Test von der Eriksen-Flanker-Aufgabe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Beim Stroop-Test tritt der Konflikt innerhalb desselben Stimulus auf (Textbedeutung versus Druckfarbe). Bei der Flanker-Aufgabe entsteht die Interferenz durch räumlich benachbarte Ablenker (z. B. Pfeile, die in die entgegengesetzte Richtung zeigen)."
        }
      },
      {
        "@type": "Question",
        "name": "Hilft das Training gegen Ablenkungen im Großraumbüro?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja. Das regelmäßige Training der hemmenden Kontrollnetzwerke senkt den neuronalen Energieaufwand, um störende Gespräche, visuelle Bewegungen oder Smartphone-Benachrichtigungen auszublenden."
        }
      },
      {
        "@type": "Question",
        "name": "Kann dieser Test ADHS oder kognitive Störungen diagnostizieren?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nein. Dies ist ein wissenschaftlich inspirierter Trainings- und Selbsttest-Drill im Webbrowser, kein medizinisches Diagnoseinstrument. Bei Verdacht auf Aufmerksamkeitsstörungen sollte stets fachärztlicher Rat eingeholt werden."
        }
      },
      {
        "@type": "Question",
        "name": "Werden Fehlklicks mit Zeitstrafen belegt?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Falsche Antworten setzen den aktuellen Combo-Multiplikator zurück. Wenn die Zeitstrafen-Option aktiviert ist, wird zusätzlich Rundenzeit abgezogen (-0,8 Sekunden)."
        }
      },
      {
        "@type": "Question",
        "name": "Ist dieser Online-Stroop-Test kostenlos und touch-kompatibel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, der Test ist vollständig kostenlos und läuft ohne Installation auf PCs, Tablets und Smartphones mit sofortiger Touch- und Klick-Reaktion."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Anleitung zum Stroop-Farb-Wort-Interferenztest",
    "description": "In 4 Schritten kognitive Hemmung und Aufmerksamkeitskontrolle im Stroop-Test perfektionieren.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Farbwort auf dem Bildschirm fixieren",
        "text": "Betrachte das angezeigte Wort (z. B. 'BLAU' in roter Farbe), ohne es innerlich laut vorzulesen.",
        "url": "https://skilldrills.online/de/drills/cognitive/focus/distraction-fighter#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Automatisierte Wortbedeutung aktiv unterdrücken",
        "text": "Hemme den Leseimpuls und isoliere die reine Farbwahrnehmung der Buchstabenpixel.",
        "url": "https://skilldrills.online/de/drills/cognitive/focus/distraction-fighter#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Schaltfläche der Schriftfarbe auswählen",
        "text": "Tippe auf den Farb-Button, der der tatsächlichen Druckfarbe entspricht (im Beispiel: Rot).",
        "url": "https://skilldrills.online/de/drills/cognitive/focus/distraction-fighter#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Combo-Serien aufbauen und Tempo steigern",
        "text": "Halte einen gleichmäßigen Rhythmus ohne Fehlklicks, um höhere Punktmultiplikatoren und Stufen zu erreichen.",
        "url": "https://skilldrills.online/de/drills/cognitive/focus/distraction-fighter#step-4"
      }
    ]
  };

  const distractionFighterGuide = {
    heading: "Leitfaden zum Stroop-Test & Neurobiologie der kognitiven Inhibition",
    intro: [
      "Der Stroop-Effekt zählt seit seiner Erstveröffentlichung durch J. Ridley Stroop (1935) zu den am gründlichsten erforschten und replizierten Phänomenen der experimentellen Kognitionspsychologie und Neurowissenschaft. Werden Probanden mit Farbwörtern konfrontiert, deren Textinhalt von der Druckfarbe abweicht (z. B. das Wort 'GRÜN' in roter Farbe), verlangsamen sich die Reaktionszeiten dramatisch und die Fehleranfälligkeit steigt.",
      "Die neurobiologische Ursache liegt in der asymmetrischen Verarbeitungsgeschwindigkeit: Das semantische Lesen geschriebener Wörter ist im erwachsenen Gehirn durch jahrelange Praxis hochgradig automatisiert (MacLeod, 1991). Die Benennung der reinen Farbe erfordert hingegen willkürliche, kontrollierte visuelle Aufmerksamkeit. Nach dem Horse-Race-Modell von Gordon D. Logan & Nelson J. Cowan (1984) gewinnt der automatische Leseimpuls das interne Verarbeitungsrennen, sofern er nicht durch top-down-gesteuerte neuronale Hemmung aktiv gestoppt wird.",
      "Funktionelle Bildgebungsstudien belegen, dass diese kognitive Konfliktlösung primär im vorderen cingulären Kortex (ACC) und im dorsolateralen präfrontalen Kortex (DLPFC) stattfindet (Posner & Petersen, 1990). Das regelmäßige Durchlaufen dieses Drills trainiert die Fähigkeit, irrelevante Störreize im Keim zu ersticken und Aufgabenfokus unter Zeitdruck aufrechtzuerhalten.",
      "Zeit- und Messmethodik: Jedes Reaktionsereignis wird clientseitig über die hochauflösende performance.now() API des Browsers erfasst. Moderne Browser vergröbern Zeitgeber als Sicherheitsmaßnahme gegen spekulative Seitenkanalangriffe wie Spectre auf rund 1 ms, während der Bildschirm Aktualisierungen auf die jeweilige Bildwiederholrate quantisiert: ca. 16,7 ms pro Frame bei 60 Hz, 6,9 ms bei 144 Hz und 4,1 ms bei 240 Hz (Woods et al., 2015). Vergleichen Sie Ihre Fortschritte am besten auf demselben Endgerät statt Rohwerte zwischen unterschiedlichen Systemen gegenüberzustellen.",
      "Datentransparenz und medizinischer Hinweis: SkillDrills erfasst und speichert keinerlei aggregierte Nutzerdaten auf externen Servern. Sämtliche Punktzahlen und Einstellungen verbleiben ausschließlich im lokalen Speicher (localStorage) Ihres Webbrowsers. Diese Übung ist ein kostenloses kognitives Trainingsspiel zu Bildungs- und Unterhaltungszwecken. Sie stellt kein medizinisches Diagnoseinstrument und kein therapeutisches Verfahren für ADHS oder neurologische Aufmerksamkeitsstörungen dar. Bei klinischen Fragestellungen wenden Sie sich bitte an qualifizierte Mediziner oder Therapeuten."
    ],
    benchmarks: {
      title: "Stroop-Test Leistungsstufen & Interferenz-Benchmarks (45-Sekunden-Lauf)",
      headers: ["Leistungsstufe", "Punktzahl (45s)", "Genauigkeitsquote", "Neurokognitive Bewertung"],
      rows: [
        ["Tier 1 (Elite / Meister der Inhibition)", "Über 18.000 PTS", "Über 96%", "Vollständige Impulskontrolle; reflexartiges Ausblenden der Wortbedeutung bei maximaler Reaktionsschnelligkeit"],
        ["Tier 2 (Fortgeschritten / Turnier-Niveau)", "12.000 – 17.999 PTS", "92 – 95%", "Sehr geringe Stroop-Interferenz; stabiler Klicktakt bei exzellenter kognitiver Flexibilität"],
        ["Tier 3 (Solider Durchschnitt)", "7.000 – 11.999 PTS", "85 – 91%", "Typische gesunde Interferenzverzögerung; gelegentliches Zögern bei stark kontrastierenden Farben"],
        ["Tier 4 (Basis / Gelegentliche Ablenkung)", "3.000 – 6.999 PTS", "75 – 84%", "Starke Neigung, dem Leseimpuls nachzugeben; Verlangsamung bei steigender Reizdichte"],
        ["Tier 5 (Einsteiger / Hohe Impulsivität)", "Unter 3.000 PTS", "Unter 75%", "Häufige Fehlklicks und Zeitüberschreitungen; Anzeichen von mentaler Übermüdung"]
      ],
      note: "Die Punktzahlen spiegeln eine 45-Sekunden-Session mit dynamisch ansteigender Farbvielfalt und verkürzten Zeitfenstern wider (Stroop, 1935; Woods et al., 2015)."
    },
    techniques: {
      title: "4 Strategien zur Überwindung der Stroop-Interferenz",
      items: [
        {
          name: "Visuelle Fokussierung auf Buchstabenkanten",
          desc: "Blicke nicht auf das Wort als Ganzes, sondern isoliere die äußeren Kanten oder Serifen eines einzelnen Buchstabens, um das automatische Lesemuster zu unterbrechen.",
          tips: "Betrachte das Schriftzeichen wie ein abstraktes geometrisches Farbmuster."
        },
        {
          name: "Strikte Unterdrückung innerer Vorlese-Stimmen",
          desc: "Wer das Wort im Kopf ausspricht, verstärkt die Interferenz im Sprachzentrum. Das Ziel ist die direkte Verbindung von Farbwahrnehmung und motorischer Tippreaktion.",
          tips: "Atme ruhig aus und vermeide es, die Ziffern oder Farbnamen innerlich zu murmeln."
        },
        {
          name: "Rhythmisches Reaktions-Timing",
          desc: "Hektisches Schnellklicken führt zu katastrophalen Fehlerserien. Ein gleichmäßiges, kontrolliertes Tempo schützt deinen Combo-Multiplikator.",
          tips: "Priorisiere Präzision vor Höchstgeschwindigkeit; die Geschwindigkeit stellt sich automatisch ein."
        },
        {
          name: "Kurze tägliche Reizüberflutungs-Resilienz",
          desc: "Kognitive Inhibition verbraucht rasch Glukose im Präfrontalkortex. Tägliche kurze Einheiten von 3 bis 5 Minuten erzielen den größten Trainingseffekt.",
          tips: "Nutze diesen Drill ideal als Aufwärmübung vor anspruchsvoller Denkarbeit oder Wettkampf-Matches."
        }
      ]
    },
    steps: [
      "Klicke auf Start und richte deinen Fokus auf den Bildschirmmittelpunkt.",
      "Ein Farbwort erscheint in einer abweichenden Schriftfarbe (z. B. 'GELB' in blauer Farbe).",
      "Unterdrücke den Impuls, das Wort 'GELB' zu lesen, und erkenne die blaue Farbe.",
      "Tippe am unteren Bildschirmrand auf den Button der entsprechenden Druckfarbe.",
      "Halte die Serie fehlerfrei aufrecht, um Combo-Punkte und höhere Schwierigkeitsstufen zu erreichen."
    ],
    audience: "Schüler, Studierende, Wissensarbeiter, E-Sportler und alle, die ihre Konzentrationsdisziplin und Impulskontrolle gegen digitale Ablenkungen stärken wollen.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('macLeod1991', 'logan1984', 'posner1990', 'woods2015'),
    related: [
      { href: "/de/drills/cognitive/focus/concentration-grid", label: "Schulte-Tabelle Konzentrationsgitter" },
      { href: "/de/drills/cognitive/attention/concentration-stamina", label: "Konzentrations-Ausdauer Test" },
      { href: "/de/drills/cognitive/processing-speed/symbol-matching", label: "Symbol Matching Speed Test" },
      { href: "/de/drills/reaction-speed/reaction-game", label: "Reaktionstest Spiel" },
      { href: "/de/drills/reaction-speed/reaction-time-test", label: "Reaktionszeit Test" }
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
      <DistractionFighterClient
        copy={{
          title: "Stroop-Test",
          subtitle: "Farb-Wort-Interferenz & Kognitive Inhibition",
          caption: "Benenne die Schriftfarbe und ignoriere die Textbedeutung. Die Interferenz zwischen automatischem Lesen und Farberkennung misst deine kognitive Hemmungskontrolle (Stroop, 1935).",
          stageCaption: "Wähle den Button der Schriftfarbe aus und ignoriere die widersprüchliche Wortbedeutung.",
          rulesTitle: "Drill-Anleitung & Punktesystem",
          aboutTitle: "Über den Stroop-Test & Kognitive Inhibition",
          aboutText: "Der Stroop-Effekt beschreibt die Verzögerung beim Benennen der Schriftfarbe eines Wortes, wenn Text und Farbe im Widerspruch stehen (Stroop, 1935; MacLeod, 1991).\n\nLesen ist ein hochgradig automatisierter Prozess. Das Gehirn muss im präfrontalen Kortex den Leseimpuls aktiv unterdrücken, um die reine Farbwahrnehmung durchzusetzen.\n\nRegelmäßiges Training stärkt die willkürliche Aufmerksamkeitskontrolle und hilft, Störreize in lauten Umgebungen souverän auszublenden.",
          aboutCards: [
            { title: "Für wen geeignet?", desc: "Wissensarbeiter im Großraumbüro, Schüler und Studierende sowie Gamer, die ihre Impulskontrolle gegen Benachrichtigungen schärfen wollen.", color: "bg-blue-600" },
            { title: "Trainierte Fähigkeiten", desc: "Widerstandskraft gegen Stroop-Interferenz, kognitive Hemmung, Top-down-Aufmerksamkeitssteuerung und Impulsdämpfung.", color: "bg-emerald-600" },
            { title: "Inhibitionskontrolle", desc: "Unterdrücke den automatischen Leseimpuls und isoliere die reine Farbwahrnehmung unter steigendem Zeitdruck.", color: "bg-purple-600" }
          ],
          rulesItems: [
            { title: "Stroop-Interferenz", text: "Ein Farbwort erscheint auf dem Bildschirm (z. B. 'BLAU') in abweichender Schriftfarbe (z. B. rote Tinte)." },
            { title: "Auswahlregel", text: "Tippe auf den Button der SCHRIFTFARBE (im Beispiel: Rot) und ignoriere die geschriebene Bedeutung (+100 Pkt × Combo × Stufe, +0,6s)." },
            { title: "Fehlversuche", text: "Ein Fehlklick setzt deine Combo zurück (und zieht bei aktivierter Strafe 0,8s ab). Das Spiel läuft bis zum Ablauf der Zeit." },
            { title: "Serien & Boni", text: "Längere Trefferserien multiplizieren deine Punkte. Höhere Stufen fordern schnellere Entscheidungen bei mehr Farbauswahl." }
          ]
        }}
      />
      <DrillGuide guide={distractionFighterGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="cognitive"
          currentHref="/drills/cognitive/focus/distraction-fighter"
          locale="de"
        />
      </div>
    </>
  );
}
