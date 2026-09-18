import DirectionalChaosPursuitClient from '@/app/drills/visual-tracking/directional-chaos-pursuit/DirectionalChaosPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// GERMAN SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "chaotische augenfolgebewegungen" (Erratic pursuit eye movement)
// Secondary:    "Sakkadische Rückholbewegung", "unvorhersehbares tracking training", "blickverfolgung reflex"
// LSI / Domain:  "augenfolgebewegung training", "sakkaden training", "retinaler schlupf",
//               "strafe tracking aim", "dynamische sehkraft", "foveale refixation"
// Authentic Domain Terms: Chaotische Augenfolgebewegungen, Sakkadische Rückholbewegung (Catch-up Saccade), Glatte Augenfolgebewegung (Smooth Pursuit), Retinaler Schlupf (Retinal Slip), Foveale Refixation, Reaktive visuelle Rückkopplung (Closed-loop Feedback), Frontales Augenfeld (FEF)
// ============================================================

export const metadata = {
  title: "Chaotische Augenfolgebewegung – Chaos Pursuit | SkillDrills",
  description: "Kostenloses Training für chaotische Augenfolgebewegungen: Trainiere sofortige Refixation und sakkadische Rückholung bei unvorhersehbaren Richtungswechseln.",
  keywords: [
    "chaotische augenfolgebewegungen",
    "Sakkadische Rückholbewegung",
    "unvorhersehbares tracking training",
    "blickverfolgung reflex",
    "augenfolgebewegung training",
    "sakkaden training",
    "retinaler schlupf",
    "strafe tracking aim",
    "dynamische sehkraft",
    "foveale refixation",
    "visuelle reaktionszeit",
    "esport sehtraining"
  ],
  openGraph: {
    title: "Chaotische Augenfolgebewegung – Chaos Pursuit | SkillDrills",
    description: "Wissenschaftliches Training für chaotische Augenfolgebewegungen und reaktive sakkadische Rückholung. Trainieren Sie die sofortige Refixation unvorhersehbarer Richtungswechsel für eSport und Sport.",
    type: "website",
    url: "https://skilldrills.online/de/drills/visual-tracking/directional-chaos-pursuit",
    siteName: "SkillDrills",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chaotische Augenfolgebewegung – Chaos Pursuit | SkillDrills",
    description: "Kostenloses okulomotorisches Training zur Beherrschung unvorhersehbarer Ausweichbewegungen und blitzschneller Blick-Refixation.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/de/drills/visual-tracking/directional-chaos-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/directional-chaos-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://skilldrills.online/de" },
    { "@type": "ListItem", "position": 2, "name": "Übungen", "item": "https://skilldrills.online/de/drills" },
    { "@type": "ListItem", "position": 3, "name": "Blickverfolgung & Sehtraining", "item": "https://skilldrills.online/de/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "Chaotische Augenfolgebewegung (Directional Chaos)", "item": "https://skilldrills.online/de/drills/visual-tracking/directional-chaos-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Chaotische Augenfolgebewegung – Unvorhersehbare Zielverfolgung (Directional Chaos Pursuit)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/de/drills/visual-tracking/directional-chaos-pursuit",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Kostenloses browserbasiertes Trainingsmodul zur Messung und Schulung von sakkadischen Rückholbewegungen und reaktiver Blickverfolgung bei stochastisch abrupter Zielauslenkung.",
  "featureList": [
    "Deterministisch unvorhersehbare chaotische Richtungs- und Geschwindigkeitswechsel",
    "Geschwindigkeitsstufen von 0.5x bis 9.0x mit dynamischen Beschleunigungsimpulsen",
    "Echtzeit-Visualisierung mit Ziel-Trails, Scanlines und Helligkeitsanpassungen",
    "Vollständige clientseitige Datenverarbeitung ohne Serverübertragung"
  ],
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Chaotische Augenfolgebewegung – Sakkadische Rückholung Online Trainer | SkillDrills",
  "alternateName": "Directional Chaos Pursuit Germany",
  "url": "https://skilldrills.online/de/drills/visual-tracking/directional-chaos-pursuit",
  "dateModified": "2026-09-15",
  "description": "Wissenschaftlich fundierter Online-Trainer für reaktives okulomotorisches Tracking. Schult die sofortige visuelle Fehlerkorrektur und Fovea-Zentrierung bei unvorhersehbaren Reizverläufen.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Moderner Webbrowser mit Unterstützung für HTML5 Canvas",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Chaotische Augenfolgebewegung, Sakkadische Rückholbewegung, Retinaler Schlupf, Foveale Refixation, Reaktive Blickmotorik"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Chaotische Augenfolgebewegung – Unvorhersehbare Zielverfolgung (Directional Chaos Pursuit)",
  "url": "https://skilldrills.online/de/drills/visual-tracking/directional-chaos-pursuit",
  "description": "Kostenloses interaktives Sehtraining-Spiel. Verfolgen Sie ein chaotisch abprallendes Ziel und trainieren Sie Ihre okulomotorische Reflex- und Haltefähigkeit.",
  "genre": ["Eye Tracking", "Visual Training", "Reaction Speed"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Anleitung für das Training chaotischer Augenfolgebewegungen",
  "dateModified": "2026-09-15",
  "description": "Schritt-für-Schritt-Anleitung zur optimalen Durchführung des chaotischen Tracking- und Sakkaden-Rückholtrainings.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Geschwindigkeit und Sitzungsparameter wählen",
      "text": "Wählen Sie zu Beginn eine moderate Geschwindigkeit (1.0x) und eine Übungsdauer von 60 Sekunden, um sich an die unvorhersehbare Dynamik zu gewöhnen.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/directional-chaos-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Kopf stabilisieren und zentrale Blickposition einnehmen",
      "text": "Halten Sie 50 bis 70 cm Abstand zum Monitor. Stabilisieren Sie Kopf und Nacken vollständig, sodass nur die Augenmuskeln das Ziel steuern.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/directional-chaos-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Sofortige Ausführung von Korrektursakkaden bei Richtungswechseln",
      "text": "Sobald das Ziel abrupt abbiegt und aus der Fovea gleitet, führen Sie eine kurze, scharfe Korrektursakkade aus, um das Ziel wieder in den Sehschärfenbereich zu holen.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/directional-chaos-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Nahtloser Übergang zurück in die glatte Folgebewegung",
      "text": "Stoppen Sie den Blick nach der Sakkade nicht abrupt, sondern koppeln Sie die Bewegung sofort wieder sanft an den neuen Bewegungsvektor des Ziels an.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/directional-chaos-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-15",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was ist das Training für chaotische Augenfolgebewegungen (Directional Chaos Pursuit)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Directional Chaos Pursuit ist ein hochspezifisches okulomotorisches Trainingsmodul, bei dem sich der Stimulus in stochastisch variierenden Richtungen und Geschwindigkeiten bewegt. Da keine harmonischen Vorhersagemodelle greifen, wird die neuronale Verschaltung zwischen retinaler Fehlererkennung und sofortiger Korrektursakkade unter realen Reaktionsbedingungen geschult (Bahill et al., 1980)."
      }
    },
    {
      "@type": "Question",
      "name": "Was versteht man unter einer sakkadischen Rückholbewegung (Catch-up Saccade)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wenn ein Ziel abrupt abbiegt oder beschleunigt, reicht die Maximalgeschwindigkeit der glatten Augenfolgebewegung (ca. 30°/s) nicht aus, und das Bild rutscht von der Fovea ab (retinaler Schlupf). Das Sehzentrum im Gehirn berechnet diesen Positionsfehler und feuert nach ca. 150–200 ms eine ballistische Korrektursakkade ab, um das Ziel wieder ins Schärfezentrum zu bugsieren (Krauzlis, 2004; Barnes, 2008)."
      }
    },
    {
      "@type": "Question",
      "name": "Wie unterscheidet sich chaotisches Tracking von periodischen Bahnen (Lissajous, Sinus)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bei periodischen Bewegungen baut das Kleinhirn ein internes Vorwärtsmodell auf, das die sensorische Verzögerung kompensiert. Bei chaotischen Bahnen versagt jede Antizipation. Das visuelle System ist gezwungen, in einer reinen geschlossenen Feedback-Schleife (Closed-Loop) rein reaktiv auf visuelle Reize zu antworten (Robinson, 1965)."
      }
    },
    {
      "@type": "Question",
      "name": "Welchen konkreten Nutzen hat diese Übung für FPS-Gamer (z. B. ADAD-Strafe Tracking)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In Spielen wie Overwatch 2 oder Apex Legends wechseln Gegner im Nahkampf permanent unvorhersehbar die Richtung (Strafe-Spam). Ein geschultes Sakkaden-Rückholvermögen reduziert die Reaktionsverzögerung beim Richtungswechsel drastisch, sodass das Fadenkreuz ohne langes Nachziehen sofort wieder auf der Hitbox einrastet (Yang et al., 2025)."
      }
    },
    {
      "@type": "Question",
      "name": "Warum darf der Kopf während des Tests absolut nicht mitbewegt werden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bei Kopfbewegungen greift der vestibulookuläre Reflex (VOR), der die Augen reflektorisch stabilisiert. Um jedoch die kortikalen und zerebellären Zentren für Sakkaden und reine Folgebewegungen gezielt zu isolieren und zu stärken, müssen die äußeren Augenmuskeln vollkommen unabhängig vom Nacken arbeiten (Leigh & Zee, 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Wie viel Trainingszeit pro Tag ist empfehlenswert?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wir empfehlen 3 bis 5 Durchgänge à 60 Sekunden mit jeweils 30 Sekunden Pause dazwischen (ca. 5 bis 8 Minuten Gesamtdauer). Da unvorhersehbares Verfolgen eine sehr hohe neuronale Belastung für das Sehzentrum darstellt, führen kurze, hochkonzentrierte tägliche Einheiten zu den besten neuroplastischen Anpassungen."
      }
    },
    {
      "@type": "Question",
      "name": "Was tun, wenn das Ziel zu schnell ausbricht und verloren geht?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reduzieren Sie über das Steuerungsmenü die Geschwindigkeit auf 0.6x bis 0.8x und vergrößern Sie den Zielpunkt auf 24 px. Sobald Sie das Ziel auch bei abrupten Wechseln kontinuierlich bündeln können, steigern Sie die Geschwindigkeit stufenweise."
      }
    },
    {
      "@type": "Question",
      "name": "Welchen Einfluss hat die Bildwiederholfrequenz (Hz) des Monitors auf das chaotische Tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eine hohe Bildwiederholrate ist bei chaotischen Bewegungen extrem wichtig. Während bei 60 Hz zwischen den Einzelbildern 16,7 ms vergehen, liefert ein 144-Hz- oder 240-Hz-Monitor alle 4 bis 7 ms eine frische Position. Dies ermöglicht es dem visuellen Kortex, den neuen Bewegungsvektor bis zu 12 ms früher wahrzunehmen und die Korrektursakkade schneller auszulösen (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Verbessert dieses Training auch die sportliche Leistung im Fußball oder Tennis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Bei unberechenbar abspringenden Tennisbällen oder Körpertäuschungen im Fußball entscheidet die visuelle Agilität – also das blitzschnelle Wiederauffinden des Objekts nach einer unerwarteten Richtungsänderung – über erfolgreiche Reaktionsbewegungen (Appelbaum & Erickson, 2018)."
      }
    },
    {
      "@type": "Question",
      "name": "Ist dieser Test für unvorhersehbare Augenfolgebewegungen kostenlos und datensicher?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, wie alle Module auf SkillDrills ist die Übung zu 100 % kostenlos, werbefrei im Kern und ohne Registrierung nutzbar. Sämtliche Parameter und Leistungsdaten werden ausschließlich verschlüsselt im lokalen Browser-Speicher abgelegt."
      }
    }
  ]
};

const guideProps = {
  heading: "Neurowissenschaftliche Grundlagen chaotischer Augenfolgebewegungen & Sakkaden-Rückholung",
  intro: [
    "Das Training chaotischer Augenfolgebewegungen (Directional Chaos Pursuit) konfrontiert das okulomotorische System mit Reizen, deren Geschwindigkeitsvektoren und Abbiegewinkel stochastisch wechseln. Im Gegensatz zu zyklischen oder linearen Bewegungsmustern, bei denen prädiktive interne Modelle des Kleinhirns die sensorischen Latenzen überbrücken, wird hier eine rein reaktive Blickverfolgung im geschlossenen Regelkreis (Closed-Loop-Feedback) erzwungen (Bahill, Iandolo, & Troost, 1980).",
    "Sakkadische Rückholbewegung und Gain-Wiederherstellung: Vollzieht das Ziel eine plötzliche Richtungsänderung, übersteigt die Winkelgeschwindigkeit die maximale Arbeitsgrenze der glatten Folgebewegung (ca. 30°/s). Das Netzhautbild rutscht aus der Fovea centralis ab (retinaler Schlupf). Die visuelle Großhirnrinde und der Colliculus superior berechnen den Vektorfehler und feuern nach einer Latenzzeit von 150 bis 200 ms eine kompensatorische Korrektursakkade (Catch-up Saccade) ab (Rashbass, 1961; Krauzlis, 2004). Die Schnelligkeit, mit der das Ziel danach wieder stabil in einer glatten Folgebewegung geführt werden kann, definiert die dynamische Sehkraft.",
    "Bedeutung für professionellen eSport und High-Speed-Ballsportarten: In taktischen Ego-Shootern setzen Gegner komplexe Ausweichmanöver (ADAD-Strafing) ein, um das Fadenkreuz des Gegners abzuschütteln (Yang et al., 2025). Auch im Ballsport (z. B. Squash, Tennis, Fußball) treten permanente unvorhersehbare Flugbahnänderungen auf (Appelbaum & Erickson, 2018). Dieses Training konditioniert die äußeren Augenmuskeln und die frontalen Augenfelder darauf, Zielabrisse minimal zu halten und Auslenkungen verzögerungsfrei zu parieren.",
    "Einfluss der Hardware und optimale Testbedingungen: Da plötzliche Richtungswechsel eine blitzschnelle visuelle Erkennung der ersten Bewegungsframes erfordern, sind Monitore mit 144 Hz oder 240 Hz klassischen 60-Hz-Geräten deutlich überlegen (Woods et al., 2015). Ein stabiler Sitzabstand von 50–70 cm und ein fixierter Kopf stellen sicher, dass vestibuläre Kompensationsmechanismen ausgeschaltet bleiben. Alle Testeinstellungen und Messwerte verbleiben privat im Browser des Nutzers."
  ],
  benchmarks: {
    title: "Leistungsstandards für chaotische Augenfolgebewegung & Sakkadische Rückholung (Redaktioneller Leitfaden)",
    headers: ["Leistungsstufe", "Ziel-Geschwindigkeit (Speed Multiplier)", "Sakkadische Rückholzeit & Blickstabilität", "Okulomotorisches & Neuronales Profil"],
    rows: [
      ["Stufe 1: Apex Reaktiv – Absolute Spitzenreflexe", "Ab 2.0x Ultra-Speed", "Korrektursakkade trifft unmittelbar nach dem Richtungswechsel ein; sofortige bruchlose Fixation auf neuem Vektor.", "Höchste synaptische Übertragungsgeschwindigkeit zwischen Fovea und okulomotorischen Zentren. Profi-Niveau in eSport und Reaktionssport."],
      ["Stufe 2: Exzellente Sakkaden-Rückholung", "1.4x – 1.9x High-Speed", "Schnelle und präzise Re-Zentrierung auch bei abrupten Richtungswechseln; geringe Nachschwingungen.", "Ausgezeichnete Rekrutierung der äußeren Augenmuskeln. Schnelle Anpassung an unregelmäßige Strafe-Bewegungen."],
      ["Stufe 3: Solider Leistungsstandard", "1.0x – 1.3x Standardbereich", "Verlässliche Verfolgung bei normaler Geschwindigkeit; bei extrem spitzen Wendungen tritt eine kurze Verzögerung auf.", "Typischer Leistungsbereich gesunder Erwachsener. Vollkommen ausreichend für Freizeitsport und normales Gaming."],
      ["Stufe 4: Verzögerte Refixation – Trainingsbedarf", "0.7x – 0.9x Niedrigbereich", "Ziel wird bei fast jedem Richtungswechsel vollständig verloren; mehrere Sakkaden notwendig, um Anschluss zu finden.", "Verzögerte sensorimotorische Signalverarbeitung bei Richtungswechseln. Gezieltes Training im niedrigen Geschwindigkeitsbereich angeraten."],
      ["Stufe 5: Erhöhte Latenz – Einsteigerbereich", "Unter 0.7x", "Blickbewegungen hängen stark hinterher oder irren unkoordiniert über den Bildschirm.", "Grundlegende Okulomotorik sollte zunächst bei langsamen, kontrollierten Richtungswechseln aufgebaut werden."]
    ],
    note: "Diese Benchmarks basieren auf wissenschaftlichen Erkenntnissen zur okulomotorischen Reaktionskinematik und sakkadischen Fehlerkorrektur unter chaotischen Zielbewegungen (Bahill et al., 1980; Barnes, 2008; Krauzlis, 2004; Robinson, 1965)."
  },
  techniques: {
    title: "Vier Kerntechniken zur Optimierung der sakkadischen Rückholung",
    items: [
      {
        name: "Strikte Kopfstabilisierung zur Isolierung der Okulomotorik",
        desc: "Wie Leigh & Zee (2015) nachweisen, aktiviert das Mitbewegen des Kopfes den vestibulookulären Reflex (VOR), wodurch der spezifische Trainingseffekt auf kortikale Sakkadenzentren verloren geht.",
        tips: "Fixieren Sie das Kinn und halten Sie den Nacken ruhig, sodass die Bewegung ausschließlich aus den Augenmuskeln generiert wird."
      },
      {
        name: "Erkennung des Richtungsvektors und ultrakurze Korrektursakkaden",
        desc: "Krauzlis (2004) zeigt, dass bei abrupten Abrissen der Folgebewegung kein krampfhaftes Hinterherziehen hilft, sondern eine blitzschnelle ballistische Sakkade erforderlich ist.",
        tips: "Springen Sie mit dem Blick gezielt auf den neuen Schwerpunkt des Ziels, anstatt zu versuchen, die Kurve weich auszufahren."
      },
      {
        name: "Vollständige Antizipationspause – Reine Feedback-Fokussierung",
        desc: "Bahill et al. (1980) belegen, dass Raten bei echten chaotischen Bahnen zu Fehlsakkaden in die falsche Richtung führt, was den Zeitverlust verdoppelt.",
        tips: "Warten Sie nicht auf eine vermutete Flugbahn, sondern reagieren Sie rein auf die tatsächlich sichtbare Auslenkung."
      },
      {
        name: "Einsatz von High-Refresh-Rate-Monitoren (144 Hz+)",
        desc: "Woods et al. (2015) heben hervor, dass höhere Bildwiederholraten die Darstellung der ersten Richtungsänderungsframes physikalisch beschleunigen.",
        tips: "Nutzen Sie wenn möglich Monitore mit 144 Hz oder mehr und sorgen Sie für eine ermüdungsfreie Raumausleuchtung."
      }
    ]
  },
  steps: [
    "Wählen Sie die gewünschte Geschwindigkeit (0.5x bis 2.0x) und starten Sie die 60-Sekunden-Sitzung.",
    "Nehmen Sie eine aufrechte Sitzposition im Abstand von 50 bis 70 cm ein und fixieren Sie Ihren Kopf vollständig.",
    "Konzentrieren Sie Ihren Blick auf den sich unvorhersehbar bewegenden Stimulus auf dem Canvas.",
    "Führen Sie bei abrupten Richtungsänderungen sofort eine präzise Korrektursakkade aus und gehen Sie wieder in die Folgebewegung über.",
    "Analysieren Sie nach Ablauf der Zeit Ihre Blickkonstanz und passen Sie das Tempo für die nächste Runde an."
  ],
  audience: "FPS- und eSport-Athleten (Apex Legends, Overwatch, CS2), Ballsportler (Tennis, Tischtennis, Badminton, Fußball), sowie alle Personen, die ihre visuelle Reaktionsfähigkeit und Augenmuskelpräzision wissenschaftlich fundiert steigern möchten.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('bahill1980', 'barnes2008', 'krauzlis2004', 'robinson1965', 'rashbass1961', 'woods2015'),
  related: [
    { href: "/de/drills/visual-tracking/constant-slow-pursuit", label: "Langsame Augenfolgebewegung (Constant Slow)" },
    { href: "/de/drills/visual-tracking/sine-wave-pursuit", label: "Sinuswellen-Verfolgungstraining (Sine Wave)" },
    { href: "/de/drills/visual-tracking/infinity-pursuit", label: "Achter-Schleifen-Blickübung (Infinity)" },
    { href: "/de/drills/visual-tracking/predictive-pursuit", label: "Prädiktive Blickverfolgung (Predictive)" },
    { href: "/de/drills/visual-tracking/dynamic-evasion-pursuit", label: "Dynamische Zielausweichung (Dynamic Evasion)" },
    { href: "/de/drills/visual-tracking/ghosting-suppress-pursuit", label: "Blickstabilisierung gegen Nachbilder (Ghosting Suppress)" }
  ]
};

export default function LocalizedPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DirectionalChaosPursuitClient
        copy={{
          title: "Chaotische Augenfolgebewegung – Unvorhersehbare Zielverfolgung",
          subtitle: "Sakkadische Rückholbewegung & Reaktives Blickverfolgungs-Training",
          description: "Bei unvorhersehbaren, chaotischen Richtungswechseln wird das prädiktive Vorwärtsmodell des Kleinhirns ausgeschaltet und eine reine reaktive visuelle Rückkopplung erzwungen (Bahill et al., 1980). Sobald das Ziel die Fovea verlässt, feuert das okulomotorische System blitzschnelle Korrektursakkaden (Catch-up Saccades), um das Ziel zu refixieren und den Folgebewegungs-Gain wiederherzustellen (Barnes, 2008; Krauzlis, 2004)."
        }}
      />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/de/drills/visual-tracking/directional-chaos-pursuit" />
      </div>
    </>
  );
}
