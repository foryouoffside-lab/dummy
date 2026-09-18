import StabilityChallengeClient from '@/app/drills/physical/balance-training/stability-challenge/StabilityChallengeClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Germany (DE / DE)
// Primary Intent: Maus Präzision Testen, Maus Stabilitätstest Online, Mauszeiger Zittern Beseitigen
// Target Queries:
//   - "Maus Präzision Testen Online" (Mouse precision test online)
//   - "Maus Stabilitätstest Online" (Mouse stability test)
//   - "Mauszeiger Zittern Beseitigen" (Eliminate cursor tremor/jitter)
//   - "Gleichgewichtssinn Trainieren Online" (Balance and equilibrium training)
//   - "Recoil Kontrolle Übungen" (Recoil control training)
//   - "Hand Auge Koordination Training" (Hand-eye coordination training)
// ============================================================

export const metadata = {
  title: 'Maus Stabilitätstest – Balance & Präzision | SkillDrills',
  description: 'Kostenloser Maus-Stabilitätstest online. Halte das Fadenkreuz gegen dynamische Windkräfte stabil und trainiere Fadenkreuz-Kontrolle direkt im Browser.',
  keywords: [
    'Maus Präzision Testen Online',
    'Maus Stabilitätstest Online',
    'Mauszeiger Zittern Beseitigen',
    'Maus Genauigkeit Testen',
    'Gleichgewichtssinn Trainieren Online',
    'Recoil Kontrolle Übungen',
    'Fadenkreuz Stabilisierung',
    'Hand Auge Koordination Training',
    'Maus Test Online Kostenlos',
    'maus gleichgewichtstest',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/physical/balance-training/stability-challenge',
    languages: getAlternateLanguages('/drills/physical/balance-training/stability-challenge'),
  },
  openGraph: {
    title: 'Maus Stabilitätstest – Balance & Präzision | SkillDrills',
    description: 'Kostenloser Maus-Stabilitätstest online. Halte das Fadenkreuz gegen dynamische Windkräfte stabil und trainiere Fadenkreuz-Kontrolle direkt im Browser.',
    url: 'https://skilldrills.online/de/drills/physical/balance-training/stability-challenge',
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maus Stabilitätstest – Balance & Präzision | SkillDrills',
    description: 'Kostenloser Maus-Stabilitätstest online. Halte das Fadenkreuz gegen dynamische Windkräfte stabil und trainiere Fadenkreuz-Kontrolle direkt im Browser.',
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
      "name": "Körper- & Motorik-Hub",
      "item": "https://skilldrills.online/de/drills/physical"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Gleichgewichtstraining",
      "item": "https://skilldrills.online/de/drills/physical/balance-training"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Maus-Präzision & Stabilitätstest",
      "item": "https://skilldrills.online/de/drills/physical/balance-training/stability-challenge"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Maus-Präzision & Stabilitätstest",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Kostenloses Online-Tool zur Messung der Maus-Stabilität und posturalen Gleichgewichtskontrolle gegen dynamische Auslenkungs- und Windkraftvektoren.",
  "url": "https://skilldrills.online/de/drills/physical/balance-training/stability-challenge",
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
  "name": "Maus-Präzision & Stabilitäts-Trainer",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires HTML5 Canvas and JavaScript enabled browser with Pointer Lock support",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/de/drills/physical/balance-training/stability-challenge",
  "inLanguage": "de",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Stabilitäts-Challenge - Maus-Präzision & Recoil-Drill",
  "url": "https://skilldrills.online/de/drills/physical/balance-training/stability-challenge",
  "description": "Präzises Maus-Stabilisierungsspiel gegen dynamische stochastische Kraftvektoren für verbesserte FPS-Recoil-Kontrolle.",
  "genre": [
    "Action",
    "Precision Drill",
    "Balance Training",
    "Motor Control"
  ],
  "gamePlatform": [
    "Web Browser",
    "Desktop"
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
      "name": "Welche neuromuskulären Fähigkeiten misst der Maus-Stabilitätstest?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der Test misst die posturale Gleichgewichtskontrolle (Postural Equilibrium), die antagonistische Ko-Kontraktion der Unterarmmuskeln sowie die Fähigkeit zur hochfrequenten visuellen Closed-Loop-Mikrokorrektur (in Intervallen von 150 bis 200 ms) gegen unvorhersehbare Kraftvektoren."
      }
    },
    {
      "@type": "Question",
      "name": "Wie funktionieren die dynamischen Windkraft-Vektoren in diesem Drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Während der gesamten 45-Sekunden-Sitzung erzeugen stochastische Beschleunigungsvektoren eine kontinuierliche Kraft, die das Fadenkreuz aus dem geometrischen Zentrum drückt. Der Anwender muss mit dosierter Gegenbewegung der Maus einen entgegengesetzten Ausgleichsimpuls erzeugen."
      }
    },
    {
      "@type": "Question",
      "name": "Welche biomechanischen Modelle erklären die Kraftkompensation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Das Verfahren basiert auf Nashner & McCollums (1985) posturalem Synergiemodell sowie David A. Winters (1995) biomechanischen Gleichgewichtsprinzipien. Bei Störungen reguliert das zentrale Nervensystem Gelenkmomente blitzschnell, um ein Ausbrechen des Schwerpunkts zu verhindern."
      }
    },
    {
      "@type": "Question",
      "name": "Wie skaliert die Schwierigkeit über die 15 Progressions-Level?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Alle 250 Punkte steigt das Level. Dabei verengt sich der Radius des Sicherheitskreises von anfänglich 45 Pixeln auf nur noch 20 Pixel, während die abdrängende Windkraft von 250 auf bis zu 850 Krafteinheiten ansteigt."
      }
    },
    {
      "@type": "Question",
      "name": "Was geschieht, wenn das Fadenkreuz den Sicherheitskreis verlässt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Beim Verlassen des Rings blinkt ein roter Warnrahmen auf und der aktive Combo-Multiplikator wird unmittelbar auf 1.0x zurückgesetzt. Es gibt keinen Punktabzug und keinen Zeitverlust, sodass eine sofortige Rückkehr ins Zentrum belohnt wird."
      }
    },
    {
      "@type": "Question",
      "name": "Wie lässt sich Woodworths Closed-Loop-Modell auf das Zielen anwenden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Robert S. Woodworth (1899) wies nach, dass zielgerichtete Motorik aus einem initialen ballistischen Impuls und kontinuierlicher visuell gesteuerter Stromkontrolle (Current Control) besteht. Dieser Drill schult genau diese kontinuierliche Feedback-Korrektur."
      }
    },
    {
      "@type": "Question",
      "name": "Wie überträgt sich dieses Training auf das Recoil-Verhalten in CS2, Valorant und Apex?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Waffenrückstoß (Spray Patterns) übt eine kontinuierliche Aufwärts- und Seitwärtsverschiebung auf das Fadenkreuz aus. Das kontinuierliche Gegensteuern gegen Auslenkungsvektoren bildet das Muskelgedächtnis für gleichmäßiges, präzises Pull-Down-Kompensieren."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Mausempfindlichkeit (DPI) und Griffart sind für Stabilitätstests optimal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Empfohlen wird eine mittlere bis niedrige Empfindlichkeit (400 bis 800 DPI bei 30–45 cm/360°). Niedrige DPI-Werte dämpfen unbeabsichtigtes Muskelzittern. Ein Palm-Grip oder Claw-Grip mit aufliegendem Unterarm bietet die stabilste Reibungsfläche."
      }
    },
    {
      "@type": "Question",
      "name": "Wie vermeidet man Muskelverkrampfungen im Unterarm bei starker Windkraft?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vermeide ein zu festes Umklammern der Maus. Halte eine leichte, elastische Grundspannung in den Beuge- und Streckmuskeln des Unterarms aufrecht und nutze die Oberflächenreibung des Mauspads durch sanften Druck nach unten als Bremskraft."
      }
    },
    {
      "@type": "Question",
      "name": "Ist der Stabilitätstest vollkommen kostenlos und bleiben meine Daten privat?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Der Stabilitätstest auf SkillDrills ist 100% kostenlos und läuft vollständig in deinem Browser. Sämtliche Bestwerte und Messdaten werden ausschließlich lokal im Browser-Speicher (localStorage) abgelegt und niemals extern verarbeitet."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "4-Stufen-Trainingsprotokoll für Maus-Stabilität & Vektor-Kompensation",
  "description": "Wissenschaftlich fundierte Schritte zur Beherrschung stochastischer Auslenkungskräfte und Maximierung des Combo-Multiplikators.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Pointer Lock aktivieren und Fadenkreuz im Sicherheitskreis zentrieren",
      "text": "Klicke auf Start, um den Pointer Lock zu aktivieren, und positioniere das Fadenkreuz im grünen Sicherheitsring.",
      "url": "https://skilldrills.online/de/drills/physical/balance-training/stability-challenge#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Kraftvektoren wahrnehmen und entgegengesetzt ausgleichen",
      "text": "Erkenne visuell, in welche Richtung die Windkraft das Fadenkreuz abdrängt, und führe die Maus mit gleichmäßiger Gegenkraft zurück.",
      "url": "https://skilldrills.online/de/drills/physical/balance-training/stability-challenge#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Dauerhafte Zentrierung für bis zu 3.0x Combo-Multiplikator halten",
      "text": "Verbleibe ohne Ausbrechen im Sicherheitskreis, um den Multiplikator auf maximal 3.0x zu steigern und den Highscore zu maximieren.",
      "url": "https://skilldrills.online/de/drills/physical/balance-training/stability-challenge#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Kreisverengung und Sturmbeschleunigung mit Mikrostopps abfangen",
      "text": "In den höheren Levels ab Stufe 12 verengt sich der Kreis auf 20px – nutze dosierten Reibungsdruck nach unten, um Überschwingen zu verhindern.",
      "url": "https://skilldrills.online/de/drills/physical/balance-training/stability-challenge#step-4"
    }
  ]
};

const stabilityGuideDe = {
  heading: "Maus-Stabilität & Kraftvektor-Kompensation: Biomechanischer Leitfaden",
  subtitle: "Posturale Synergien, Closed-Loop-Mikrokorrekturen und Antagonisten-Ko-Kontraktion zur Beseitigung von Mauszeiger-Zittern",
  intro: [
    "Die Stabilitäts-Challenge (Stability Challenge) ist ein präziser kontinuierlicher Korrektur-Drill, bei dem das Fadenkreuz gegen stochastische externe Kraftvektoren ununterbrochen im geometrischen Zentrum gehalten werden muss. Im Gegensatz zu isolierten Flick-Schüssen erfordert diese Aufgabe über 45 Sekunden hinweg eine ununterbrochene sensorisch-motorische Reaktionsschleife im visuell-motorischen Kortex.",
    "In der Bewegungswissenschaft folgt zielgerichtetes Stabilisieren Robert S. Woodworths (1899) 'Zwei-Komponenten-Modell': Einem initialen Impuls folgt eine kontinuierliche Closed-Loop-Regulierung mit visuellem Feedback in Zyklen von 150 bis 200 ms. Gemäß Nashner & McCollums (1985) posturalem Synergiemodell und David A. Winters (1995) Gelenkmoment-Regulierung ist die synchrone Ko-Kontraktion (Co-contraction) von Beuge- und Streckmuskeln des Unterarms der entscheidende Schlüssel, um unvorhersehbare Auslenkungsimpulse stoßfrei abzufedern.",
    "Nach dem Fitts'schen Gesetz (Fitts, 1954) steigt die motorische Schwierigkeit (Index of Difficulty) logarithmisch an, sobald sich die Zielgröße halbiert. Dieser Drill verengt den Sicherheitsradius graduell von 45 auf 20 Pixel und beschleunigt gleichzeitig die Abdrängkraft von 250 auf 850 Einheiten, um eSports-taugliche Bremskontrolle und belastbares Muskelgedächtnis für Waffen-Recoil aufzubauen.",
    "Hinweise zu Zeitmessung & Hardware: Dieser Drill nutzt die hochpräzise Browser-Uhr performance.now() für submillisekündliche Berechnungen. Abhängig von der Display-Bildwiederholrate (60Hz = 16,7ms / 144Hz = 6,9ms / 240Hz = 4,1ms) und der Maus-Abtastrate (125Hz vs. 1000Hz Polling) treten minimale Quantisierungsverzögerungen auf (Woods et al., 2015). Alle Bestwerte verbleiben privat in deinem lokalen Browser-Speicher."
  ],
  benchmarks: {
    title: "Maus-Präzision & Stabilitäts-Benchmarks (5 Leistungsstufen)",
    headers: ["Leistungsstufe & Tier", "Rang-Titel", "Punkte-Benchmark", "Erreichtes Level", "Sicherheitszonen-Halterate", "Neuromuskuläres Profil"],
    rows: [
      ["Tier 1: Apex Stabilisator", "Apex Stabilizer", "15.300+ Punkte", "Level 12 – 15", "> 94% Halterate", "Elite-Antagonisten-Ko-Kontraktion und submillisekündliche Mikrostopp-Präzision (Nashner & McCollum, 1985)"],
      ["Tier 2: Meister-Anker", "Master Anchor", "12.000 – 15.299 Punkte", "Level 9 – 11", "86 – 93% Halterate", "Exzellente Vektor-Kompensation und unerschütterliche Fadenkreuz-Zentrierung (Winter, 1995)"],
      ["Tier 3: Erfahrener Konterer", "Proficient Counterer", "9.500 – 11.999 Punkte", "Level 6 – 8", "75 – 85% Halterate", "Gehobener Wettkampf-Standard mit verlässlicher Gleichgewichtskontrolle und schneller Rückkehr"],
      ["Tier 4: Intermediärer Kern", "Intermediate Core", "6.000 – 9.499 Punkte", "Level 3 – 5", "60 – 74% Halterate", "Vorübergehendes Abdriften bei Kraftspitzen, gezieltes Unterarm-Bremstraining empfohlen"],
      ["Tier 5: Einsteiger / Unruhig", "Novice Perturbed", "< 6.000 Punkte", "Level 1 – 2", "< 60% Halterate", "Verkrampfte Handgelenkshaltung und deutliches Überschwingen (Overshooting), DPI-Anpassung ratsam"]
    ],
    note: "Integrierter Standard basierend auf posturaler Störungsforschung (Nashner & McCollum 1985; Winter 1995) und Closed-Loop-Bewegungsregelung (Woodworth 1899; Woods et al. 2015)."
  },
  techniques: {
    title: "Praxis-Protokolle zur Beseitigung von Maus-Zittern & Maximierung der Bremskraft",
    items: [
      {
        name: "Antagonistische Ko-Kontraktion des Unterarms (Antagonist Co-contraction)",
        desc: "Gemäß dem Synergiemodell von Nashner & McCollum (1985) erfordert das Ausgleichen unberechenbarer Kräfte eine simultane Grundspannung in Beugern und Streckern des Unterarms zur Erhöhung der Gelenksteifigkeit.",
        tips: "Umfasse die Maus nicht krampfhaft, sondern halte eine kontinuierliche Grundspannung von etwa 20–30% im gesamten Unterarm, um Stöße geschmeidig zu absorbieren."
      },
      {
        name: "Kontinuierliche Closed-Loop-Visus-Rückkopplung (Closed-loop Visual Feedback)",
        desc: "Wie Woodworth (1899) zeigte, ist das Halten einer Position kein einmaliger Entschluss, sondern ein fortlaufender Korrekturzyklus alle 150 bis 200 ms.",
        tips: "Fixiere nicht starr den Fadenkreuzpunkt, sondern beobachte den Abstand zwischen Zielkreisrand und Fadenkreuz, um Abdriften blitzschnell wahrzunehmen."
      },
      {
        name: "Mittlere bis niedrige eDPI-Kalibrierung (400–800 DPI)",
        desc: "Hohe Empfindlichkeit verstärkt natürliches Muskelzittern (Tremor) auf dem Bildschirm und führt bei plötzlichen Kraftspitzen zu heftigem Überschwingen.",
        tips: "Wähle einen Bereich von 30 bis 45 cm pro 360°-Drehung und sorge für eine breite Auflagefläche des Unterarms auf dem Schreibtisch."
      },
      {
        name: "Vertikaler Anpressdruck auf das Mauspad (Vertical Downward Friction Braking)",
        desc: "In höheren Stufen reicht reine Muskelkraft oft nicht aus, um die Maus bei schnellen Richtungswechseln sofort abzustoppen.",
        tips: "Drücke den Handballen und die Fingerspitzen bei Ausgleichsbewegungen leicht nach unten auf das Mauspad, um die Reibung als natürliche Bremse zu nutzen."
      }
    ]
  },
  steps: [
    "Passe deine Ingame-Empfindlichkeit und DPI 1:1 an und aktiviere den Pointer Lock.",
    "Positioniere das Fadenkreuz im grünen zentralen Sicherheitskreis.",
    "Sobald die Windkraft das Fadenkreuz verschiebt, führe die Maus mit sanfter Gegenkraft in die entgegengesetzte Richtung.",
    "Halte das Fadenkreuz im Ring, um den Combo-Multiplikator auf bis zu 3.0x zu maximieren.",
    "Nutze bei schrumpfendem Kreis und Sturmbeschleunigung die Oberflächenreibung des Mauspads für präzise Mikrostopps."
  ],
  audience: "FPS-Spieler (Valorant, CS2, Apex Legends), Anwender mit zitterndem Mauszeiger sowie Personen, die ihre Hand-Auge-Koordination, Feinmotorik und das Gleichgewichtsgefühl gezielt trainieren möchten.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('nashner1985', 'winter1995', 'woodworth1899', 'fitts1954', 'woods2015'),
  related: [
    { href: "/de/drills/physical/coordination/complex-pattern", label: "Komplexe Bewegungsmuster-Koordination" },
    { href: "/de/drills/physical/coordination/cross-body-movement", label: "Diagonale Körperkoordination" },
    { href: "/de/drills/physical/reflex-training/reaction-chain", label: "Reaktionsketten-Stopptraining" },
    { href: "/de/drills/physical/reflex-training/quick-dodge", label: "Schnelles Ausweichen & Reflexe" }
  ]
};

export default function StabilityChallengeDePage() {
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
      <StabilityChallengeClient
        copy={{
          title: "Maus Präzision & Stabilitätstest",
          subtitle: "Kraftvektor-Kompensation & Fadenkreuz-Stabilisierung",
          rules: [
            { title: "Sicherheitskreis halten", text: "Halte das Fadenkreuz gegen stochastische Wind- und Kraftvektoren im zentralen Sicherheitsring." },
            { title: "Combo-Multiplikator aufbauen", text: "Je länger du das Fadenkreuz ununterbrochen im Zentrum stabilisierst, desto höher steigt der Combo-Multiplikator (bis zu 3.0x)." },
            { title: "Dynamische Schwierigkeitsskalierung", text: "Alle 250 Punkte steigt das Level. Der Sicherheitsring verkleinert sich und die ablenkende Windkraft verstärkt sich kontinuierlich." },
            { title: "Combo-Reset bei Drift", text: "Verlässt das Fadenkreuz den Sicherheitsring, wird der Combo-Multiplikator auf 1.0x zurückgesetzt – ohne Punktabzug oder Zeitverlust." }
          ],
          aboutTitle: "Über den Stabilitäts-Challenge",
          aboutHeading: "Maus-Präzision, Antagonisten-Koordination & Recoil-Kontrolle",
          aboutText: "Dieser Drill trainiert die neuromuskuläre Fähigkeit, dynamische Auslenkungsvektoren in Echtzeit wahrzunehmen und durch sanfte Gegenbewegungen der Maus zu neutralisieren. Perfektioniere deine Fadenkreuz-Stabilität und Waffen-Recoil-Kontrolle in CS2, Valorant und Apex Legends."
        }}
      />
      <DrillGuide guide={stabilityGuideDe} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="physical"
          currentHref="/drills/physical/balance-training/stability-challenge"
          locale="de"
        />
      </div>
    </>
  );
}
