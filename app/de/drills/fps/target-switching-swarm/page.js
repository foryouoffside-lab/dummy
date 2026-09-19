import TargetSwitchingSwarmClient from '@/app/drills/fps/target-switching-swarm/TargetSwitchingSwarmClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Target Switching Aim Trainer – Zielwechsel | SkillDrills",
  description: "Kostenloses Target-Switching-Training im Browser: Trainiere schnelle Zielwechsel, Spray Transfers und verzögerungsfreie Flicks für CS2 und Valorant.",
  keywords: [
    "Target Switching Aim Trainer",
    "Zielwechsel FPS Training",
    "Multi-Target Aiming CS2",
    "Spray Transfer Training",
    "Target Switching Übungen",
    "Flick Übergang FPS",
    "Speed Switching Aiming",
    "Zielwechsel Übung Valorant",
    "Multikill Aiming FPS",
    "Kinematischer Zielwechsel",
    "Target Switching Deutsch",
    "Zielbestätigung Hesitation"
  ],
  alternates: {
    canonical: "https://skilldrills.online/de/drills/fps/target-switching-swarm",
    languages: getAlternateLanguages('/drills/fps/target-switching-swarm'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Target Switching Aim Trainer – Zielwechsel | SkillDrills",
    description: "Kostenloses Target-Switching-Training im Browser: Trainiere schnelle Zielwechsel, Spray Transfers und verzögerungsfreie Flicks für CS2 und Valorant.",
    url: "https://skilldrills.online/de/drills/fps/target-switching-swarm",
    siteName: 'SkillDrills',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Target Switching Aim Trainer – Zielwechsel | SkillDrills",
    description: "Kostenloses Target-Switching-Training im Browser: Trainiere schnelle Zielwechsel, Spray Transfers und verzögerungsfreie Flicks für CS2 und Valorant.",
  },
};

export default function TargetSwitchingSwarmDePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/de" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/de/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Target Switching Swarm", "item": "https://skilldrills.online/de/drills/fps/target-switching-swarm" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Target Switching Aim Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-11",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
    "description": "Kostenloses Browsertraining für Multi-Target-Flicks, Spray Transfers und kognitive Zielwechsel in dynamischen Target Swarms.",
    "genre": "FPS Training / Target Switching",
    "url": "https://skilldrills.online/de/drills/fps/target-switching-swarm",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Target Switching Aim Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-11",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
    "browserRequirements": "Erfordert Pointer Lock API, JavaScript, HTML5 Canvas",
    "description": "Kostenloses Browsertraining für Multi-Target-Flicks, Spray Transfers und kognitive Zielwechsel in dynamischen Target Swarms.",
    "url": "https://skilldrills.online/de/drills/fps/target-switching-swarm"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Target Switching Aim Trainer",
    "url": "https://skilldrills.online/de/drills/fps/target-switching-swarm",
    "description": "Kostenloses Browsertraining für Multi-Target-Flicks, Spray Transfers und kognitive Zielwechsel in dynamischen Target Swarms.",
    "dateModified": "2026-09-11",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Target Switching"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-11",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Was versteht man unter Target Switching im FPS-Aiming?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Target Switching (Zielwechsel) beschreibt die mechanische und visuo-motorische Fähigkeit, das Fadenkreuz in schneller Abfolge von einem Ziel zum nächsten zu bewegen und jeden Treffer ohne Abstoppen oder Zögern nahtlos zu exekutieren."
        }
      },
      {
        "@type": "Question",
        "name": "Worin unterscheidet sich Target Switching von isoliertem Flick-Training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Klassische Flick-Trainer zeigen isolierte Einzelziele, die nach dem Schuss verschwinden und dem Fadenkreuz eine Neutralpause erlauben. Target Switching konfrontiert dich mit dichten Ziel-Schwärmen (Swarms), die unterbrechungsfreie kinetische Übergänge und kontinuierliche visuelle Pfadfindung fordern."
        }
      },
      {
        "@type": "Question",
        "name": "Wie verbessert das Target-Swarm-Format Multikill-Mechaniken in Gefechten?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Das Swarm-Format zwingt den motorischen Kortex dazu, die ballistische Flick-Trajektorie zum nächsten Ziel bereits während der sensorischen Rückmeldung des aktuellen Treffers vorzubereiten. Dies spiegelt Multi-Enemy-Pushes in CS2 und Valorant wider, bei denen mehrere Gegner binnen Millisekunden fallen müssen."
        }
      },
      {
        "@type": "Question",
        "name": "Warum zögern viele Spieler zwischen Zielen nach einem erfolgreichen Kill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dieses Zögern (Confirmation Hesitation) entsteht, wenn Spieler auf visuelle oder akustische Kill-Bestätigungen warten, bevor sie die nächste Augen- und Mausbewegung starten. Strukturiertes Switching-Training konditioniert das Vertrauen in ballistische Subbewegungen, sodass die Sakkade bereits vor Schussabschluss einsetzt."
        }
      },
      {
        "@type": "Question",
        "name": "Wie unterstützt Target Switching Spray Transfers in CS2 und Valorant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ein Spray Transfer verlangt eine winkelstabile Fadenkreuzverlagerung unter laufendem Rückstoß. Target Switching trainiert die neuromuskuläre Beschleunigungs- und Bremskraft, die notwendig ist, um das Fadenkreuz über Bildschirmquadranten hinweg präzise auf den nächsten Kopf zu ziehen."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Spieletitel verlangen die ausgeprägtesten Target-Switching-Fähigkeiten?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Target Switching ist unverzichtbar in taktischen Hero-Shootern wie Valorant und Overwatch 2, schnellen Battle Royales wie Apex Legends und Warzone sowie klassischen Taktik-Shootern wie Counter-Strike 2 bei schnellen Site-Retakes."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Mausgriffart begünstigt schnelle und flüssige Zielwechsel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Claw- und Fingertip-Grips bieten überlegene vertikale und horizontale Mikro-Anpassungsfähigkeit, da sie den MCP-Gelenken der Finger und dem Handgelenk erlauben, unabhängig von der Unterarm-Gleitbewegung feine Bremskorrekturen vorzunehmen."
        }
      },
      {
        "@type": "Question",
        "name": "Welcher Zusammenhang besteht zwischen Target Switching und dem Fitts'schen Gesetz?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nach Fitts' Gesetz (1954) und dem stochastischen Modell optimierter Subbewegungen (Meyer et al. 1988) besteht ein Zielwechsel aus einem ballistischen Hauptimpuls über 90% der Distanz gefolgt von abrupter terminaler Bremsung. Profis minimieren den Bremsweg durch optimal getimte Muskelantagonisten."
        }
      },
      {
        "@type": "Question",
        "name": "Wie oft sollten ambitionierte Gamer Target-Switching-Szenarien trainieren?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "10 bis 15 Minuten hochintensives Target-Switching 3 bis 4 Mal pro Woche oder als integraler Bestandteil der Pre-Match-Warmup-Routine liefern optimale Reize zur Eliminierung mentaler Verzögerungen und für flüssiges Flick-Chaining."
        }
      },
      {
        "@type": "Question",
        "name": "Ist dieses Target Switching Swarm Trainingsprogramm komplett kostenlos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, der Target Switching Aim Trainer ist vollständig kostenlos, werbefrei im Trainingscanvas nutzbar und läuft ohne Download oder Registrierung direkt im modernen Webbrowser über native HTML5 Canvas- und Pointer-Lock-Schnittstellen."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Target Switching und Multi-Target-Flicks trainieren",
    "description": "Schritt-für-Schritt-Anleitung zur Beherrschung schneller Zielwechsel, visueller Pfadfindung und flüssiger Multikill-Kinematik.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Mausempfindlichkeit kalibrieren",
        "text": "Stimme DPI und In-Game-Sensitivität in den Einstellungen ab, klicke Start und sperre den Hardware-Mauszeiger im Canvas.",
        "url": "https://skilldrills.online/de/drills/fps/target-switching-swarm#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Erstes Schwarmziel erfassen",
        "text": "Flicke blitzschnell auf das nächstgelegene Ziel im Schwarm und eliminiere es für +100 Punkte und einen Zeitbonus.",
        "url": "https://skilldrills.online/de/drills/fps/target-switching-swarm#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Verzögerungsfrei zum nächsten Ziel wechseln",
        "text": "Starte sofort den nächsten ballistischen Flick zum folgenden Ziel, ohne auf eine Kill-Bestätigung des ersten Schusses zu warten.",
        "url": "https://skilldrills.online/de/drills/fps/target-switching-swarm#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Flüssigen Wechsel-Rhythmus aufrechterhalten",
        "text": "Löse Muskelverspannungen im Handgelenk, um saubere Zielwechselketten aufzubauen und höhere Schwierigkeitsstufen freizuschalten.",
        "url": "https://skilldrills.online/de/drills/fps/target-switching-swarm#step-4"
      }
    ]
  };

  const targetSwitchingGuide = {
    heading: "Target Switching Aim Trainer Guide & Kinematik des Zielwechsels",
    intro: [
      "Target Switching Swarm ist ein intensives visuo-motorisches Trainingssystem zur Ausbildung rasanter, zögerungsfreier Übergänge zwischen mehreren feindlichen Zielen. In taktischen Shootern wie Counter-Strike 2 und Valorant sowie dynamischen Battle Royales wie Apex Legends entscheiden Multikill-Situationen über den Rundenausgang: Nach dem Ausschalten des ersten Gegners muss das Fadenkreuz ohne kognitive Verzögerung unmittelbar auf den zweiten Flankierenden einrasten.",
      "Die Psychophysik schneller Zielwechsel gehorcht dem Fitts'schen Gesetz (Fitts, 1954) und dem stochastischen Modell optimierter Subbewegungen von David E. Meyer et al. (1988). Eine gezielte Mausbewegung besteht aus einem ballistischen Primärschub über rund 90% der Flugbahn und einer sensomotorisch geführten terminalen Mikrokontraktion. Unerfahrene Spieler verlieren 100–250 ms durch passives Abwarten der Kill-Bestätigung. Profi-Schützen hingegen leiten die primäre Augensakkade zum nächsten Ziel bereits ein, während der vorherige Treffer registriert wird.",
      "Die visuelle Orientierung in dichten Zielschwärmen beruht auf der Feature Integration Theory und präattentiver visueller Suche (Anne M. Treisman & Garry Gelade, 1980; Jeremy M. Wolfe, 2007). Das menschliche Sehzentrum kann räumliche Bezugspunkte über Visual Indexing (FINST-Theorie) simultan erfassen. Dadurch optimieren erfahrene Spieler ihre Flick-Pfade durch Ziel-Cluster nach dem Prinzip der kürzesten Winkelabstände.",
      "Messmethodik: Jedes Ereignis wird clientseitig über die hochauflösende performance.now()-Uhr deines Browsers registriert – absolut latenzfrei ohne Server-Roundtrip. Zu beachten: Browser-Timer werden aus Sicherheitsgründen (Spectre-Schutz) auf ca. 1 ms gerundet; Displays quantisieren visuelle Reize über ihre Bildwiederholrate (16,7 ms bei 60 Hz, 6,9 ms bei 144 Hz, 4,1 ms bei 240 Hz). Die USB-Abfragerate der Maus fügt ca. 1 ms bei 1000 Hz hinzu. Differenzen unter 5 ms stellen messtechnisches Rauschen dar; vergleiche Trainingsläufe stets auf demselben Setup."
    ],
    benchmarks: {
      title: "Benchmarks für Target Switching & Übergangslatenz",
      headers: ["Leistungsstufe", "Wechsel-Latenz", "Eliminationsrate (Ziele/Min)", "Wettkampf-Implikation (In-Game)"],
      rows: [
        ["Tier 1 (Radiant / Faceit Level 10 / Profi)", "Unter 210 ms", "110+ Ziele/min", "Perfekte Multi-Target Spray Transfers; 0 ms Kill-Bestätigungs-Zögern; mühelose 1v3 Site-Verteidigungen"],
        ["Tier 2 (Immortal / Faceit 8-9 / Master)", "210 – 260 ms", "92 – 110 Ziele/min", "Messerscharfe Zielsequenzierung; minimale Bremswobbler bei weiten Diagonal-Switches; zuverlässige Multikills"],
        ["Tier 3 (Ascendant / Diamond / Fortgeschritten)", "260 – 320 ms", "74 – 92 Ziele/min", "Solide Zielwechsel in engen Clustern; spürbarer Zeitverlust bei Weitwinkel-Transfers über die Bildschirmmitte"],
        ["Tier 4 (Platin / Gold / Erfahren)", "320 – 400 ms", "56 – 74 Ziele/min", "Deutliche Bestätigungspause (über 100 ms Zögern nach Kills); häufiges Überschießen durch mangelnde Bremskraft"],
        ["Tier 5 (Silber / Bronze / Einsteiger)", "Über 400 ms", "Unter 56 Ziele/min", "Stoppt die Maus zwischen Zielen vollständig ab; visuelle Suche startet nach jedem Schuss neu; verkrampfte Hand"]
      ],
      note: "Die Wechsel-Latenz beziffert die Zeitspanne von der Zerstörung eines Ziels bis zum validen Eintreffen des Fadenkreuzes auf dem nächsten Ziel; die Eliminationsrate misst die Trefferdichte über die Trainingsdauer (Woods et al., 2015)."
    },
    techniques: {
      title: "Evidenzbasierte Protokolle zur Perfektionierung von Target Switching",
      items: [
        {
          name: "Sakkadische Pfadplanung & Visual Indexing",
          desc: "Verschiebe deinen Blick auf das sekundäre Ziel, während deine Hand noch die finale Mikro-Anpassung auf dem primären Ziel ausführt (Treisman & Gelade, 1980; Wolfe, 2007). Augenbewegungen gehen Handbewegungen um 50–80 ms voraus.",
          tips: "Starre niemals auf ein Ziel, nachdem du geklickt hast; lass die Zerstörung im peripheren Sehen ablaufen, während die Fovea bereits das nächste Ziel fokussiert."
        },
        {
          name: "Terminale Muskelbremsung & Subbewegungs-Optimierung",
          desc: "Aktiviere antagonistische Muskelgruppen auf den letzten 10% der Flick-Strecke, um die Maus abrupt über dem Zielzentrum zu stoppen, ohne nachzuschwingen (Meyer et al., 1988).",
          tips: "Stelle dir deine Maus wie mit hydraulischen Bremsen vor: Explosiv beschleunigen, dann direkt über dem Ziel zupacken."
        },
        {
          name: "Räumliche Pfadoptimierung (Nearest-Neighbor-Routing)",
          desc: "Löse Zielschwärme entlang minimaler Winkelabstände auf, statt erratisch über den gesamten Bildschirm hin- und herzufliegen (Fitts, 1954).",
          tips: "Räume eng beieinander liegende Paare zuerst ab, bevor du Flicks über große Bildschirmdiagonalen ansetzt."
        },
        {
          name: "Entkoppelte Griffspannung & Mikro-Mobilität",
          desc: "Halte deine Griffspannung auf einem moderaten Niveau (Stufe 3 von 10), um feine Finger- und Handgelenkskorrekturen bei Höchstgeschwindigkeit ohne Muskelblockade auszuführen.",
          tips: "Verkrampft deine Hand bei langen Zielwechseln, lockere bewusst den Druck von Daumen und kleinem Finger."
        }
      ]
    },
    steps: [
      "Stimme In-Game-Sensitivität und DPI in den Einstellungen ab und aktiviere die Hardware-Mauszeigersperre.",
      "Überblicke den Zielschwarm, um dichte Gruppierungen mit minimalen Abständen zu identifizieren.",
      "Flicke explosiv auf das erste Ziel (+100 Punkte, +0,35s Bonuszeit auf die Runden-Uhr).",
      "Leite den Mausimpuls unmittelbar zum nächsten Ziel weiter, ohne auf visuelle Bestätigung zu warten.",
      "Halte den Rhythmus aufrecht, um Multiplikator-Combos aufzubauen und höhere Zieldichten zu meistern."
    ],
    audience: "Wettkampforientierte FPS-Spieler in Counter-Strike 2, Valorant, Apex Legends und Overwatch 2, die überragende Multi-Target-Geschwindigkeit, präzise Spray Transfers und zögerungsfreie Multikills anstreben.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'meyer1988', 'treisman1980', 'wolfe2007'),
    related: [
      { href: "/de/drills/fps/target-prioritization", label: "Zielpriorisierung FPS Training" },
      { href: "/de/drills/fps/flick-shot-training", label: "Flick Shot Training" },
      { href: "/de/drills/fps/target-acquisition", label: "Zielerfassung FPS Training" },
      { href: "/de/drills/fps/180-degree-awareness", label: "180 Grad Aiming" },
      { href: "/de/drills/fps/recoil-control", label: "Recoil Control Training" }
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
      <TargetSwitchingSwarmClient
        copy={{
          h1Keyword: "Target Switching Aim Trainer",
          h1Suffix: " – Zielwechsel & Spray Transfer",
          subtitle: "Trainiere blitzschnelle Zielübergänge, Spray Transfers und visuelle Indexierung ohne Verzögerungspause.",
          statScore: "Punkte",
          statTime: "Zeit",
          statAccuracy: "Präzision",
          statBestScore: "Highscore",
          statTargetsDestroyed: "Ziele zerstört",
          statMaxCombo: "Max Combo",
          statPeakLevel: "Höchstlevel",
          startTitle: "Target Switching Swarm",
          startSubtitle: "Hardware Raw Input • Endlose Levelprogression",
          stageCaption: "Flicke rasant zwischen Zielen hin und her, bevor deren Timer abläuft. Vermeide Fehlschüsse für maximale Combo-Boni!",
          rulesTitle: "Trainingsregeln & Punktesystem",
          aboutTitle: "Über Target Switching im FPS-Gaming",
          rulesItems: [
            { num: "1", text: "Zielzerstörung", highlight: "Cyan-Ziele (+100 PKT / +0,35s)", result: "+100 PKT / +0,35s" },
            { num: "2", text: "Dynamischer Schwarm", highlight: "Sofortiger Respawn", result: "Dauerhafter Schwarm" },
            { num: "3", text: "Fehlerstrafe", highlight: "Fehlschuss / Zeitablauf", result: "Combo-Reset" },
            { num: "4", text: "Level-Progression", highlight: "+1 Level / 2.100 PKT", result: "Schneller & Kleiner" }
          ]
        }}
      />
      <DrillGuide guide={targetSwitchingGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/target-switching-swarm"
          locale="de"
        />
      </div>
      <DrillFooter />
    </>
  );
}
