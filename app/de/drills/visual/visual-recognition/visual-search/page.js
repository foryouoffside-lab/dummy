import VisualSearchClient from '@/app/drills/visual/visual-recognition/visual-search/VisualSearchClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Visuelle Suche Test: Konjunktives Scanning | SkillDrills",
  description: "Kostenloser Visuelle Suche Test: Scanne 96 rotierte Zeichen und isoliere Zielreize unter Zeitdruck. Trainiere Merkmalsintegration und Scanning online.",
  keywords: [
    "visuelle suche test",
    "konjunktive suche test",
    "merkmalsintegration theorie",
    "visuelles scanning training",
    "selektive aufmerksamkeit test",
    "suchzeit psychologie",
    "zielreiz diskrimination",
    "visuelle inspektion test",
    "foveales scanning geschwindigkeit",
    "symbolsuche test"
],
  openGraph: {
    title: "Visuelle Suche Test: Konjunktives Scanning | SkillDrills",
    description: "Wissenschaftlicher Visuelle Suche Test: Scanne 96 rotierte Zeichen und isoliere Zielreize unter Zeitdruck. Trainiere Merkmalsintegration und Scanning online.",
    type: "website",
    url: "https://skilldrills.online/de/drills/visual/visual-recognition/visual-search",
    siteName: "SkillDrills",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visuelle Suche Test: Konjunktives Scanning | SkillDrills",
    description: "Wissenschaftlicher Visuelle Suche Test: Scanne 96 rotierte Zeichen und isoliere Zielreize unter Zeitdruck. Trainiere Merkmalsintegration und Scanning online.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/de/drills/visual/visual-recognition/visual-search",
    languages: getAlternateLanguages('/drills/visual/visual-recognition/visual-search', 'de'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/de/" },
    { "@type": "ListItem", "position": 2, "name": "Visuelles Training", "item": "https://skilldrills.online/de/drills/visual" },
    { "@type": "ListItem", "position": 3, "name": "Visuelle Erkennung", "item": "https://skilldrills.online/de/drills/visual/visual-recognition" },
    { "@type": "ListItem", "position": 4, "name": "Visuelle Suche Test – Konjunktives Scanning", "item": "https://skilldrills.online/de/drills/visual/visual-recognition/visual-search" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Visuelle Suche Test – Konjunktives Scanning",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Kostenloser Test zur konjunktiven visuellen Suche. Scanne hochdichte Buchstabengitter mit rotierten Distraktoren zur Messung von Latenz und selektiver Aufmerksamkeit.",
  "url": "https://skilldrills.online/de/drills/visual/visual-recognition/visual-search",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "dateModified": "2026-09-05"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Konjunktiver Visuelle Suche Test",
  "browserRequirements": "Requires HTML5 canvas and JavaScript",
  "url": "https://skilldrills.online/de/drills/visual/visual-recognition/visual-search",
  "applicationCategory": "EducationalApplication",
  "dateModified": "2026-09-05"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Visuelle Suche: Konjunktives Zielreiz-Training",
  "url": "https://skilldrills.online/de/drills/visual/visual-recognition/visual-search",
  "description": "Kostenloses wissenschaftliches Suchspiel. Finde Zielbuchstaben in dichten Matrizen rotierter Störreize in 45 Sekunden.",
  "genre": ["Action", "Brain Game", "Search Game"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Wie man visuelle Suche und konjunktives Scanning trainiert",
  "description": "Optimiere deine Suchgeschwindigkeit, Merkmalsintegration und Zielreizisolation mit wissenschaftlichen Scanning-Protokollen.",
  "dateModified": "2026-09-05",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Erfasse den vorgegebenen Zielbuchstaben",
      "text": "Präge dir die genaue Form und Ausrichtung des gesuchten Zeichens im Kopfbereich des Bildschirms ein.",
      "url": "https://skilldrills.online/de/drills/visual/visual-recognition/visual-search#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Führe ein grobes peripheres Vorfiltern durch",
      "text": "Halte deinen Blick leicht angehoben und nutze das periphere Sehfeld, um Cluster völlig unähnlicher Zeichen sofort auszuschließen.",
      "url": "https://skilldrills.online/de/drills/visual/visual-recognition/visual-search#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Starte eine strukturierte zickzackförmige Sakkadenfolge",
      "text": "Bewege deine Fovea in gleichmäßigen horizontalen und vertikalen Schwüngen über die 96-Zellen-Matrix.",
      "url": "https://skilldrills.online/de/drills/visual/visual-recognition/visual-search#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Bestätige den Zielreiz mit sofortigem Klick",
      "text": "Klicke unverzüglich auf den erkannten Zielbuchstaben, um Latenz und Durchsatz in Millisekunden zu erfassen.",
      "url": "https://skilldrills.online/de/drills/visual/visual-recognition/visual-search#step-4"
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
      "name": "Was misst der Visual Search Test und wie funktioniert er?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der Test misst die visuelle Suchgeschwindigkeit, Scanning-Effizienz und selektive Aufmerksamkeit. Nutzer müssen einen Zielbuchstaben in einer dichten 12x8-Matrix aus 96 rotierten Störbuchstaben in 45 Sekunden so oft wie möglich finden."
      }
    },
    {
      "@type": "Question",
      "name": "Was ist der Unterschied zwischen einfacher Feature-Suche und Konjunktionssuche?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eine Feature-Suche basiert auf einem isolierten Merkmal und erzeugt sofortiges Pop-out unabhängig von der Distraktoranzahl. Eine Konjunktionssuche erfordert das Verknüpfen mehrerer Merkmale, was eine serielle, aufmerksamkeitsgesteuerte Inspektion erzwingt (Treisman & Gelade, 1980)."
      }
    },
    {
      "@type": "Question",
      "name": "Warum rotieren die Buchstaben in diesem Test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Weil rotierte Zeichen die automatische gestaltpsychologische Gruppierung des Hintergrunds aufbrechen. Das Sehsystem kann die Distraktoren nicht als einheitliche Textur abtun, sondern muss jedes Zeichen aktiv evaluieren (Duncan & Humphreys, 1989)."
      }
    },
    {
      "@type": "Question",
      "name": "Wie beeinflusst die 'Guided Search'-Theorie das menschliche Suchverhalten?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nach Wolfe (1994) berechnen frühe visuelle Areale parallele Merkmalskarten, die eine Prioritätskarte im Kortex füttern. Aufmerksamkeitsfokussierte Sakkaden werden sequenziell zu den vielversprechendsten Positionen gelenkt."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Punktzahl gilt im 45-Sekunden-Test als überdurchschnittlich?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Einsteiger erzielen 300 bis 550 Punkte (2–3 Treffer). Gute Durchschnittswerte liegen bei 600 bis 1.000 Punkten (4–6 Treffer), während Top-Gamer und Analysten über 1.500 Punkte (10+ Treffer) bei Latenzen unter 450 ms erreichen."
      }
    },
    {
      "@type": "Question",
      "name": "Was besagt die Perceptual Load Theory von Nilli Lavie?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sie besagt, dass Ablenkbarkeit davon abhängt, wie stark sensorische Kanäle ausgelastet sind. Hohe visuelle Last wie in dieser 96-Zellen-Matrix sättigt die Kapazität vollständig und schützt vor mentalem Abschweifen (Lavie, 1995)."
      }
    },
    {
      "@type": "Question",
      "name": "Wie unterscheidet sich die Suchstrategie von Experten von Anfängern?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Experten nutzen breitere periphere Aufmerksamkeitsfenster, führen zielgerichtete Sakkaden durch und verweilen nur 200–250 ms pro Fixation, während Anfänger sprunghaft und unstrukturiert suchen."
      }
    },
    {
      "@type": "Question",
      "name": "Gibt es Strafen bei Fehlklicks?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nein. Fehlklicks lösen ein kurzes visuelles Signal aus, reduzieren jedoch weder die erreichte Punktzahl noch die verbleibende Restzeit, um eine hohe Entscheidungsbereitschaft zu fördern."
      }
    },
    {
      "@type": "Question",
      "name": "In welchen Berufen und Sportarten ist visuelle Suchleistung entscheidend?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In der Radiologie, Flugsicherung, Gepäckkontrolle, im Militär sowie in schnellen Sportarten und kompetitiven Taktik-Shootern (CS2, Valorant), wo getarnte Zielreize in Sekundenbruchteilen isoliert werden müssen."
      }
    },
    {
      "@type": "Question",
      "name": "Wie lässt sich die visuelle Suchzeit gezielt verkürzen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Durch tägliches Training mit dichten Matrizen, strukturierte Sakkadenführung (Zickzack-Scanning) und das bewusste Vermeiden von überlangen Verweilzeiten auf einzelnen Distraktoren."
      }
    }
  ]
};

export default function VisualSearchLocalePage() {
  const sources = pickSources('treisman1980', 'wolfe1994', 'duncan1989', 'lavie1995', 'eriksen1986', 'bacon1994', 'woods2015');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <VisualSearchClient copy={{ title: "Visuelle Suche: Konjunktives Zielreiz-Training" }} />
      <DrillGuide
        eyebrow="Visuelle Kognition & Aufmerksamkeitspsychophysik"
        title="Die Wissenschaft der visuellen Suche, Merkmalsintegration & selektiven Aufmerksamkeit"
        sources={sources}
      >
        <p dangerouslySetInnerHTML={{ __html: `Die Fähigkeit, ein gesuchtes Objekt in einer unübersichtlichen, visuell überladenen Umgebung schnell zu lokalisieren, ist eine fundamentale kognitive Leistung. Ob beim Durchsuchen von Röntgenbildern in der Radiologie, beim Erkennen von getarnten Bedrohungen im Einsatz oder beim Auffinden gegnerischer Spielfiguren in komplexen 3D-Spielwelten – die visuelle Suche beansprucht ein hochentwickeltes Netzwerk aus retinalen Rezeptoren, frontoparietalen Aufmerksamkeitszentren und okulomotorischen Steuerungskreisen (Treisman & Gelade, 1980; Wolfe, 1994).` }} />

        <h3>Merkmalsintegrationstheorie: Paralleles Pop-out vs. serielle Konjunktionssuche</h3>
        <p dangerouslySetInnerHTML={{ __html: `In ihrer wegweisenden Arbeit etablierten Treisman und Gelade (1980) die Merkmalsintegrationstheorie (Feature Integration Theory, FIT). Unterscheidet sich ein Zielobjekt durch ein einziges elementares Merkmal (z. B. eine leuchtend rote Scheibe unter blauen Quadraten), erfolgt die Erkennung <strong>vorattentiv und parallel</strong> über das gesamte Sehfeld. Die Reaktionszeit bleibt unabhängig von der Anzahl der Störreize konstant flach ('Pop-out-Effekt'). Definiert sich das Ziel jedoch durch eine <strong>Kombination mehrerer Merkmale</strong> (Konjunktionssuche) oder sind Störreize wie in diesem Drill unregelmäßig rotiert, versagt das parallele Pop-out. Das Sehsystem muss fokussierte Aufmerksamkeit seriell von Objekt zu Objekt lenken, wodurch die Suchzeit linear mit jedem zusätzlichen Distraktor ansteigt (Treisman & Gelade, 1980; Duncan & Humphreys, 1989).` }} />

        <h3>Guided Search Model & Ähnlichkeitsgesetze (Wolfe, 1994; Duncan & Humphreys, 1989)</h3>
        <p dangerouslySetInnerHTML={{ __html: `Jeremy Wolfes 'Guided Search'-Modell (Wolfe, 1994) verfeinerte Treismans Modell: Das menschliche Gehirn sucht nicht rein stochastisch, sondern nutzt parallele vorattentive Merkmalskarten, um eine 'Prioritätskarte' zu berechnen. Fokussierte Aufmerksamkeit wird bevorzugt zu den Positionen mit der höchsten Aktivität gelenkt. Wie Duncan und Humphreys (1989) bewiesen, wird die Effizienz dieser Führung von zwei Faktoren bestimmt: <em>Ziel-Distraktor-Ähnlichkeit</em> (je ähnlicher das Ziel den Störreizen ist, desto höher die Fixationsdauer) und <em>Distraktor-Homogenität</em>. Wenn Distraktoren wie in unserem 96-Zellen-Gitter zufällig gedreht sind, bricht die gestaltpsychologische Hintergrundgruppierung zusammen und erzwingt eine individuelle foveale Auswertung.` }} />

        <h3>Aufmerksamkeits-Zoomlinse & perzeptive Belastung (Lavie, 1995; Eriksen & St. James, 1986)</h3>
        <p dangerouslySetInnerHTML={{ __html: `Nach dem Zoom-Lens-Modell der räumlichen Aufmerksamkeit (Eriksen & St. James, 1986) agiert die visuelle Aufmerksamkeit wie ein Scheinwerfer mit variablem Durchmesser. Weitet sich der Fokus, sinkt die Detailauflösung; verengt er sich auf eine einzelne Zelle, erreicht die Auflösung ihr Maximum. Nilli Lavies Perceptual Load Theory (Lavie, 1995) belegt zudem, dass kognitive Ablenkbarkeit vom sensorischen Ressourcenverbrauch abhängt. In hochgradig beladenden Bedingungen – wie unserem 96-Zellen-Buchstabengitter unter 45 Sekunden Zeitdruck – ist die perzeptive Kapazität vollständig gesättigt, was störende Gedanken unterdrückt und höchste selektive Konzentration erzwingt (Lavie, 1995; Bacon & Egeth, 1994).` }} />

        <h3>Suchlatenz- und Durchsatz-Standards (96-Zellen-Gitter)</h3>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Stufe</th>
                <th className="py-2.5 px-3 font-semibold">Zielerfassungs-Latenz</th>
                <th className="py-2.5 px-3 font-semibold">45s Punktzahl</th>
                <th className="py-2.5 px-3 font-semibold">Leistungsbereich</th>
                <th className="py-2.5 px-3 font-semibold">Klassifikation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="py-2.5 px-3 font-bold text-purple-400">Tier 1</td>
                <td className="py-2.5 px-3 font-semibold text-white">&lt; 450 ms</td>
                <td className="py-2.5 px-3 tabular-nums">&gt; 1.500 Pkt (10+ Treffer)</td>
                <td className="py-2.5 px-3 tabular-nums">Außergewöhnlich</td>
                <td className="py-2.5 px-3">Elite Esports / Radar-Überwachung</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-teal-400">Tier 2</td>
                <td className="py-2.5 px-3 font-semibold text-white">450 – 700 ms</td>
                <td className="py-2.5 px-3 tabular-nums">1.050 – 1.450 Pkt (7–9 Treffer)</td>
                <td className="py-2.5 px-3 tabular-nums">Fortgeschritten</td>
                <td className="py-2.5 px-3">Kompetitiver visueller Athlet</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-blue-400">Tier 3</td>
                <td className="py-2.5 px-3 font-semibold text-white">701 – 1.100 ms</td>
                <td className="py-2.5 px-3 tabular-nums">600 – 1.000 Pkt (4–6 Treffer)</td>
                <td className="py-2.5 px-3 tabular-nums">Durchschnitt</td>
                <td className="py-2.5 px-3">Typisches ungeschultes Ergebnis</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-amber-400">Tier 4</td>
                <td className="py-2.5 px-3 font-semibold text-white">1.101 – 1.600 ms</td>
                <td className="py-2.5 px-3 tabular-nums">300 – 550 Pkt (2–3 Treffer)</td>
                <td className="py-2.5 px-3 tabular-nums">Unterdurchschnittlich</td>
                <td className="py-2.5 px-3">Verlangsamtes Scanning / Ermüdung</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-rose-400">Tier 5</td>
                <td className="py-2.5 px-3 font-semibold text-white">&gt; 1.600 ms</td>
                <td className="py-2.5 px-3 tabular-nums">&lt; 300 Pkt (0–1 Treffer)</td>
                <td className="py-2.5 px-3 tabular-nums">Grundstufe</td>
                <td className="py-2.5 px-3">Tunnelblick / Visuelle Reizüberflutung</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Wissenschaftliche Trainingsprotokolle für schnellere Suchdurchsätze</h3>
        <ol className="list-decimal pl-5 space-y-2 my-4 text-slate-300">
          <li>
            <strong>Paralleles Vorfiltern grober Konturen (Wolfe, 1994):</strong> Vermeide es, jedes Zeichen isoliert scharfzustellen. Halte den Blick leicht diffus über Texturblöcken und eliminiere grob abweichende Glyphenformen periphere im Vorfeld.
          </li>
          <li>
            <strong>Systematische Sakkaden-Choreografie:</strong> Scanne niemals sprunghaft quer über das Feld. Nutze strukturierte Zickzack- oder Quadrantenmuster, um redundante Doppelüberprüfungen zu minimieren.
          </li>
          <li>
            <strong>Optimales Foveations-Intervall (200–250 ms):</strong> Begrenze jede Fixation auf das physiologische Minimum von 200 bis 250 Millisekunden. Wenn der Zielreiz nicht sofort matcht, bewege die Augen sofort weiter.
          </li>
          <li>
            <strong>Distraktor-Unterdrückung durch Ziel-Template:</strong> Halte das mentale Bild der Zielform im Arbeitsgedächtnis aktiv, um Störreize im ventralen Pfad automatisch zu hemmen (Duncan & Humphreys, 1989).
          </li>
        </ol>

        <h3>Häufig gestellte Fragen (FAQ)</h3>
        <div className="space-y-4 my-6">
          <div>
            <h4 className="font-semibold text-white">Was misst der Visual Search Test und wie funktioniert er?</h4>
            <p className="text-slate-300 mt-1">
              Der Test misst die visuelle Suchgeschwindigkeit, Scanning-Effizienz und selektive Aufmerksamkeit. Nutzer müssen einen Zielbuchstaben in einer dichten 12x8-Matrix aus 96 rotierten Störbuchstaben in 45 Sekunden so oft wie möglich finden.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Was ist der Unterschied zwischen einfacher Feature-Suche und Konjunktionssuche?</h4>
            <p className="text-slate-300 mt-1">
              Eine Feature-Suche basiert auf einem isolierten Merkmal und erzeugt sofortiges Pop-out unabhängig von der Distraktoranzahl. Eine Konjunktionssuche erfordert das Verknüpfen mehrerer Merkmale, was eine serielle, aufmerksamkeitsgesteuerte Inspektion erzwingt (Treisman & Gelade, 1980).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Warum rotieren die Buchstaben in diesem Test?</h4>
            <p className="text-slate-300 mt-1">
              Weil rotierte Zeichen die automatische gestaltpsychologische Gruppierung des Hintergrunds aufbrechen. Das Sehsystem kann die Distraktoren nicht als einheitliche Textur abtun, sondern muss jedes Zeichen aktiv evaluieren (Duncan & Humphreys, 1989).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Wie beeinflusst die &apos;Guided Search&apos;-Theorie das menschliche Suchverhalten?</h4>
            <p className="text-slate-300 mt-1">
              Nach Wolfe (1994) berechnen frühe visuelle Areale parallele Merkmalskarten, die eine Prioritätskarte im Kortex füttern. Aufmerksamkeitsfokussierte Sakkaden werden sequenziell zu den vielversprechendsten Positionen gelenkt.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Welche Punktzahl gilt im 45-Sekunden-Test als überdurchschnittlich?</h4>
            <p className="text-slate-300 mt-1">
              Einsteiger erzielen 300 bis 550 Punkte (2–3 Treffer). Gute Durchschnittswerte liegen bei 600 bis 1.000 Punkten (4–6 Treffer), während Top-Gamer und Analysten über 1.500 Punkte (10+ Treffer) bei Latenzen unter 450 ms erreichen.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Was besagt die Perceptual Load Theory von Nilli Lavie?</h4>
            <p className="text-slate-300 mt-1">
              Sie besagt, dass Ablenkbarkeit davon abhängt, wie stark sensorische Kanäle ausgelastet sind. Hohe visuelle Last wie in dieser 96-Zellen-Matrix sättigt die Kapazität vollständig und schützt vor mentalem Abschweifen (Lavie, 1995).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Wie unterscheidet sich die Suchstrategie von Experten von Anfängern?</h4>
            <p className="text-slate-300 mt-1">
              Experten nutzen breitere periphere Aufmerksamkeitsfenster, führen zielgerichtete Sakkaden durch und verweilen nur 200–250 ms pro Fixation, während Anfänger sprunghaft und unstrukturiert suchen.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Gibt es Strafen bei Fehlklicks?</h4>
            <p className="text-slate-300 mt-1">
              Nein. Fehlklicks lösen ein kurzes visuelles Signal aus, reduzieren jedoch weder die erreichte Punktzahl noch die verbleibende Restzeit, um eine hohe Entscheidungsbereitschaft zu fördern.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">In welchen Berufen und Sportarten ist visuelle Suchleistung entscheidend?</h4>
            <p className="text-slate-300 mt-1">
              In der Radiologie, Flugsicherung, Gepäckkontrolle, im Militär sowie in schnellen Sportarten und kompetitiven Taktik-Shootern (CS2, Valorant), wo getarnte Zielreize in Sekundenbruchteilen isoliert werden müssen.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Wie lässt sich die visuelle Suchzeit gezielt verkürzen?</h4>
            <p className="text-slate-300 mt-1">
              Durch tägliches Training mit dichten Matrizen, strukturierte Sakkadenführung (Zickzack-Scanning) und das bewusste Vermeiden von überlangen Verweilzeiten auf einzelnen Distraktoren.
            </p>
          </div>
        </div>
      </DrillGuide>
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/de/drills/visual/visual-recognition/visual-search" />
      </div>
    </>
  );
}
