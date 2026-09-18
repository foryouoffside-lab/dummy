import DynamicEvasionPursuitClient from '@/app/drills/visual-tracking/dynamic-evasion-pursuit/DynamicEvasionPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// GERMAN SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "reaktives tracking training" / "ausweichende zielverfolgung" (Evasive target pursuit)
// Secondary:    "dynamische blickverfolgung", "sakkadische neuzentrierung", "strafe tracking uebungen"
// LSI / Domain:  "augenfolgebewegung reaktion", "dynamische sehschaerfe reflexe", "visuelles tracking reaktionszeit",
//               "korrektursakkade", "retinaler schlupf", "foveale zentrierung", "esport sehtraining"
// Authentic Domain Terms: Reaktives Tracking, Ausweichende Zielverfolgung, Korrektursakkade (Catch-up Saccade), Folgebewegungs-Gain (Pursuit Gain), Retinaler Schlupf (Retinal Slip), Frontales Augenfeld (FEF), Colliculus Superior
// ============================================================

export const metadata = {
  title: "Reaktives Tracking Training – Evasion Pursuit | SkillDrills",
  description: "Kostenloses Training für reaktives Tracking und dynamische Ausweichziele: Trainiere foveale Neuzentrierung bei abrupten Richtungswechseln im Browser.",
  keywords: [
    "reaktives tracking training",
    "ausweichende zielverfolgung",
    "dynamische blickverfolgung",
    "sakkadische neuzentrierung",
    "strafe tracking uebungen",
    "augenfolgebewegung reaktion",
    "dynamische sehschaerfe reflexe",
    "visuelles tracking reaktionszeit",
    "korrektursakkade",
    "retinaler schlupf",
    "foveale zentrierung",
    "esport sehtraining"
  ],
  openGraph: {
    title: "Reaktives Tracking Training – Evasion Pursuit | SkillDrills",
    description: "Wissenschaftliches Training für reaktives Tracking und dynamische Ausweichziel-Verfolgung. Trainieren Sie die sofortige foveale Neuzentrierung bei abrupten Richtungsbrüchen für FPS und Leistungssport.",
    type: "website",
    url: "https://skilldrills.online/de/drills/visual-tracking/dynamic-evasion-pursuit",
    siteName: "SkillDrills",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reaktives Tracking Training – Evasion Pursuit | SkillDrills",
    description: "Kostenloses Reaktives Tracking Training für unvorhersehbare Richtungswechsel und blitzschnelle Sakkaden-Neuzentrierung.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/de/drills/visual-tracking/dynamic-evasion-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/dynamic-evasion-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://skilldrills.online/de" },
    { "@type": "ListItem", "position": 2, "name": "Übungen", "item": "https://skilldrills.online/de/drills" },
    { "@type": "ListItem", "position": 3, "name": "Blickverfolgung & Sehtraining", "item": "https://skilldrills.online/de/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "Reaktives Tracking Training (Dynamic Evasion)", "item": "https://skilldrills.online/de/drills/visual-tracking/dynamic-evasion-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Reaktives Tracking Training – Dynamische Ausweichziel-Verfolgung (Dynamic Evasion Pursuit)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/de/drills/visual-tracking/dynamic-evasion-pursuit",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Kostenloses browserbasiertes Trainingsmodul zur Schulung reaktiver Blickverfolgung und sakkadischer Neuzentrierung bei abrupt ausweichenden Zielobjekten.",
  "featureList": [
    "Simulation linearer Zielvektoren mit abrupten, unangekündigten Richtungsbrüchen",
    "Geschwindigkeitsstufen von 0.5x bis 9.0x mit millimetergenauer Fixationserfassung",
    "Visuelle Anpassungsmöglichkeiten für Nachziehtrails, Scanlines und Helligkeit",
    "Vollständige clientseitige Datenverarbeitung ohne externe Serverkommunikation"
  ],
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Reaktives Tracking Training – Sakkadische Neuzentrierung Online | SkillDrills",
  "alternateName": "Dynamic Evasion Pursuit Germany",
  "url": "https://skilldrills.online/de/drills/visual-tracking/dynamic-evasion-pursuit",
  "dateModified": "2026-09-15",
  "description": "Wissenschaftlich fundierter Online-Trainer für reaktives okulomotorisches Tracking. Schult die sofortige visuelle Fehlerkorrektur und Fovea-Neuzentrierung bei abrupt ausweichenden Stimuli.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Moderner Webbrowser mit Unterstützung für HTML5 Canvas",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Ausweichziel-Tracking, Korrektursakkaden, Folgebewegungs-Gain, Retinaler Schlupf, Reaktives Aiming"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Reaktives Tracking Training – Dynamische Ausweichziel-Verfolgung (Dynamic Evasion Pursuit)",
  "url": "https://skilldrills.online/de/drills/visual-tracking/dynamic-evasion-pursuit",
  "description": "Kostenloses interaktives Sehtraining-Spiel. Verfolgen Sie aktiv ausweichende Ziele und trainieren Sie Ihre okulomotorische Reaktions- und Neuzentrierungsfähigkeit.",
  "genre": ["Eye Tracking", "Visual Training", "Aim Trainer"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Anleitung für das reaktive Ausweichziel-Tracking-Training",
  "dateModified": "2026-09-15",
  "description": "Schritt-für-Schritt-Anleitung zur optimalen Durchführung des reaktiven Tracking- und Sakkaden-Neuzentrierungstrainings.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Geschwindigkeit und Sitzungsparameter wählen",
      "text": "Wählen Sie zu Beginn eine moderate Geschwindigkeit (1.0x) und eine Übungsdauer von 60 Sekunden, um die Dynamik der Richtungsbrüche kennenzulernen.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/dynamic-evasion-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Kopf stabilisieren und lineare Bahn glatt verfolgen",
      "text": "Halten Sie 50 bis 70 cm Abstand zum Monitor. Stabilisieren Sie Kopf und Nacken vollständig und folgen Sie der geraden Flugbahn des Ziels.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/dynamic-evasion-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Sofortige Korrektursakkade bei abrupten Richtungsbrüchen",
      "text": "Sobald das Ziel abrupt ausweicht und die Fovea verlässt, führen Sie eine kurze, scharfe Korrektursakkade aus, um das Ziel wieder ins Sehzentrum zu holen.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/dynamic-evasion-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Nahtlose Wiederherstellung des Folgebewegungs-Gains",
      "text": "Stoppen Sie den Blick nach der Sakkade nicht abrupt ab, sondern schalten Sie sofort auf die neue Zielgeschwindigkeit und Richtung um.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/dynamic-evasion-pursuit#step-4"
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
      "name": "Was ist das reaktive Tracking-Training (Dynamic Evasion Pursuit)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dynamic Evasion Pursuit ist ein hochspezifisches okulomotorisches Trainingsmodul, bei dem sich der Stimulus entlang geradliniger Vektoren bewegt und in unregelmäßigen Abständen abrupte, unangekündigte Richtungsbrüche vollzieht. Da kontinuierliche Antizipation unmöglich ist, schult die Übung die Kette aus retinaler Fehlererkennung, sofortiger Korrektursakkade und Wiederherstellung des Folgebewegungs-Gains (Rashbass, 1961; Bahill et al., 1980)."
      }
    },
    {
      "@type": "Question",
      "name": "Worin besteht der Unterschied zwischen harmonischem Tracking (z. B. Lissajous) und Ausweichziel-Tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bei kontinuierlichen harmonischen Kurven baut das Kleinhirn ein prädiktives Vorwärtsmodell auf, das die sensorische Latenz fast auf null reduziert (Robinson, 1965). Bei Ausweichbewegungen bricht dieses Vorwärtsmodell schlagartig zusammen, was eine reine reaktive Closed-Loop-Reaktion auf visuelle Reize erzwingt."
      }
    },
    {
      "@type": "Question",
      "name": "Was geschieht neurobiologisch bei einer Korrektursakkade (Catch-up Saccade)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vollzieht das Ziel einen abrupten Knick, übersteigt die Zielauslenkung die physiologische Maximalgeschwindigkeit der glatten Folgebewegung (ca. 30°/s). Das Bild verlässt das Sehzentrum (retinaler Schlupf). Das frontale Augenfeld (FEF) und der Colliculus superior berechnen den Positions- und Geschwindigkeitsfehler und feuern nach ca. 150–200 ms eine ballistische Sakkade ab, um das Ziel wieder in die Fovea zu holen (Krauzlis, 2004; Barnes, 2008)."
      }
    },
    {
      "@type": "Question",
      "name": "Wie unterscheidet sich Dynamic Evasion Pursuit von Directional Chaos Pursuit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Directional Chaos Pursuit wendet kontinuierliche mikroskopische Perturbationen auf jedem Frame an (permanenter Kurvendrift). Dynamic Evasion Pursuit bewegt sich entlang klarer linearer Vektoren mit diskreten, harten Abknickungen alle paar Hundert Millisekunden – mit Fokus auf dynamische Neuzentrierung statt ständiger Zitterkorrektur."
      }
    },
    {
      "@type": "Question",
      "name": "Welchen Nutzen hat diese Übung für Shooter-Gamer (z. B. Apex Legends, Overwatch 2)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In taktischen FPS-Titeln weichen Gegner Fadenkreuzen durch abruptes ADAD-Strafing, Rutschen oder Ausweichsprünge aus. Ein geschultes Sakkaden-Rückholvermögen reduziert die Reaktionsverzögerung beim Richtungswechsel drastisch, sodass das Fadenkreuz ohne langes Nachziehen sofort wieder auf der Hitbox einrastet (Yang et al., 2025)."
      }
    },
    {
      "@type": "Question",
      "name": "Verbessert dieses Training auch die sportliche Leistung im Fußball oder Tennis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Bei Körpertäuschungen des Gegners im Zweikampf oder unberechenbar verspringenden Tennisbällen entscheidet die visuelle Agilität – also das blitzschnelle Wiederauffinden des Objekts nach einer unerwarteten Richtungsänderung – über erfolgreiche motorische Reaktionen (Appelbaum & Erickson, 2018)."
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
      "name": "Wie viel Trainingszeit pro Tag ist optimal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wir empfehlen 5 bis 8 Durchgänge à 60 Sekunden mit jeweils 30 Sekunden Pause dazwischen (ca. 5 bis 10 Minuten Gesamtdauer). Da abrupte Re-Zentrierungen eine extrem hohe neuronale Belastung darstellen, führen kurze, hochkonzentrierte Einheiten zu den besten Fortschritten."
      }
    },
    {
      "@type": "Question",
      "name": "Was tun, wenn das ausweichende Ziel zu schnell abreißt und verloren geht?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reduzieren Sie über das Einstellungsmenü die Geschwindigkeit auf 0.6x bis 0.8x und vergrößern Sie den Zielpunkt auf 24 px. Sobald Sie die ersten Frames der Richtungsbrüche sicher erkennen und parieren können, steigern Sie das Tempo stufenweise."
      }
    },
    {
      "@type": "Question",
      "name": "Welchen Einfluss haben Monitor-Bildwiederholrate (Hz) und Maus-Pollingrate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eine hohe Bildwiederholrate ist bei abrupten Ausweichbewegungen entscheidend. Während 60-Hz-Monitore den ersten Knick mit bis zu 16,7 ms Verzögerung anzeigen, liefert ein 144-Hz- oder 240-Hz-Monitor alle 4 bis 7 ms ein frisches Bild. Dies ermöglicht es dem visuellen Kortex, die Korrektursakkade physikalisch ca. 10 ms früher auszulösen (Woods et al., 2015)."
      }
    }
  ]
};

const guideProps = {
  heading: "Neurowissenschaftliche Grundlagen reaktiver Ausweichziel-Verfolgung & Sakkaden-Neuzentrierung",
  intro: [
    "Das Training für reaktive Ausweichziel-Verfolgung (Dynamic Evasion Pursuit) konfrontiert das okulomotorische System mit Stimuli, die geradlinige Vektoren mit abrupten, unangekündigten Richtungsbrüchen (Directional Breaks) kombinieren. Im Gegensatz zu zyklischen Bewegungsmustern, bei denen prädiktive interne Modelle des Kleinhirns sensorische Latenzen ausgleichen, wird hier eine rein reaktive Blickverfolgung im geschlossenen Regelkreis (Closed-Loop-Feedback) erzwungen (Bahill, Iandolo, & Troost, 1980; Robinson, 1965).",
    "Retinaler Schlupf, Sakkadische Neuzentrierung und Wiederherstellung des Folgebewegungs-Gains: Vollzieht das Ziel einen plötzlichen Haken, übersteigt die Winkelgeschwindigkeit die Arbeitsgrenze der glatten Folgebewegung (ca. 30°/s). Das Netzhautbild rutscht schlagartig aus der Fovea centralis ab (retinaler Schlupf). Die visuelle Großhirnrinde und der Colliculus superior berechnen den Vektorfehler und feuern nach einer Latenzzeit von 150 bis 200 ms eine kompensatorische Korrektursakkade (Catch-up Saccade) ab (Rashbass, 1961; Krauzlis, 2004). Die Schnelligkeit, mit der das Ziel nach dem Sakkadensprung ohne Überschwingen wieder stabil mit optimalem Gain (Gain = Augengeschwindigkeit / Zielgeschwindigkeit) geführt werden kann, definiert die dynamische Sehkraft (Barnes, 2008).",
    "Bedeutung für professionellen eSport und High-Speed-Ballsportarten: In kompetitiven FPS-Spielen setzen Gegner komplexe Ausweichmanöver (ADAD-Strafing, Slide-Cancels) ein, um das Fadenkreuz abzuschütteln (Yang et al., 2025). Auch im Ballsport (z. B. Tennis, Fußball, Basketball) treten permanente unvorhersehbare Haken und Flugbahnänderungen auf (Appelbaum & Erickson, 2018). Dieses Training konditioniert die äußeren Augenmuskeln und die frontalen Augenfelder darauf, Zielabrisse minimal zu halten und Auslenkungen verzögerungsfrei zu parieren.",
    "Hardware-Latenzen und methodische Teststandards: Da plötzliche Richtungswechsel eine blitzschnelle visuelle Erkennung der ersten Bewegungsframes erfordern, sind Monitore mit 144 Hz oder 240 Hz klassischen 60-Hz-Geräten deutlich überlegen (Woods et al., 2015). Ein stabiler Sitzabstand von 50–70 cm und ein fixierter Kopf stellen sicher, dass vestibuläre Kompensationsmechanismen (VOR) ausgeschaltet bleiben und die okulomotorische Muskulatur isoliert trainiert wird (Leigh & Zee, 2015). Alle Testeinstellungen und Messwerte verbleiben privat im Browser des Nutzers."
  ],
  benchmarks: {
    title: "Leistungsstandards für reaktive Ausweichziel-Verfolgung & Sakkaden-Neuzentrierung (Redaktioneller Leitfaden)",
    headers: ["Leistungsstufe", "Ziel-Geschwindigkeit (Speed Multiplier)", "Sakkadische Neuzentrierung bei Richtungsbrüchen", "Okulomotorisches & Neuronales Profil"],
    rows: [
      ["Stufe 1: Apex Reaktiv – Absolute Spitzenreflexe", "Ab 2.0x Ultra-Speed", "Korrektursakkade trifft mit minimaler Latenz (< 150 ms) präzise ein; sofortige foveale Kopplung ohne Überschwingen.", "Höchste synaptische Verarbeitungsgeschwindigkeit. Profi-Niveau in eSport und Reaktionssport."],
      ["Stufe 2: Exzellente Blickagilität", "1.4x – 1.9x High-Speed", "Schnelle und verlässliche Neuzentrierung innerhalb von 1–2 Frames; nahtlose Wiederaufnahme der Folgebewegung.", "Sehr gut trainierte äußere Augenmuskeln. Ausgezeichnete Beherrschung gegnerischer Strafe-Bewegungen."],
      ["Stufe 3: Solider Leistungsstandard", "1.0x – 1.3x Standardbereich", "Verlässliche Verfolgung linearer Abschnitte; bei abrupten Ausweichbrüchen tritt eine kurze Verzögerung auf.", "Normativer Leistungsbereich gesunder Erwachsener. Vollkommen ausreichend für Freizeitsport und Gaming."],
      ["Stufe 4: Verzögerte Refixation – Trainingsbedarf", "0.7x – 0.9x Niedrigbereich", "Ziel wird bei fast jedem Ausweichmanöver verloren; mehrere Sakkaden notwendig, um wieder anzuschließen.", "Verzögerte sensorimotorische Signalverarbeitung bei Richtungsbrüchen. Gezieltes Grundlagentraining angeraten."],
      ["Stufe 5: Erhöhte Latenz – Einsteigerbereich", "Unter 0.7x", "Blickbewegungen hängen stark hinterher und verbleiben auf der alten Bahn des Zielobjekts.", "Grundlegendes Okulomotorik-Training bei langsamer Geschwindigkeit und fixiertem Kopf erforderlich."]
    ],
    note: "Diese Benchmarks basieren auf biomechanischen und neurophysiologischen Studien zur Sakkadenreaktion und Folgebewegungskontrolle unter abrupten Richtungsänderungen (Bahill et al., 1980; Rashbass, 1961; Krauzlis, 2004; Barnes, 2008)."
  },
  techniques: {
    title: "Vier Kerntechniken zur Optimierung der Ausweichziel-Neuzentrierung",
    items: [
      {
        name: "Vollständige Kopfstabilisierung zur Ausschaltung des VOR",
        desc: "Wie Leigh & Zee (2015) nachweisen, aktiviert das Mitbewegen des Kopfes den vestibulookulären Reflex (VOR), wodurch der spezifische Trainingseffekt auf kortikale Sakkadenzentren verloren geht.",
        tips: "Fixieren Sie das Kinn und halten Sie den Nacken ruhig, sodass die Bewegung ausschließlich aus den Augenmuskeln generiert wird."
      },
      {
        name: "Erkennung des ersten Richtungsbruchs und ultrakurze Korrektursakkade",
        desc: "Krauzlis (2004) zeigt, dass bei abrupten Abrissen kein krampfhaftes Hinterherziehen hilft, sondern eine blitzschnelle ballistische Sakkade erforderlich ist.",
        tips: "Springen Sie mit dem Blick gezielt auf den neuen Schwerpunkt des Ziels, anstatt zu versuchen, die Kurve weich auszufahren."
      },
      {
        name: "Nahtlose Wiederaufnahme des Folgebewegungs-Gains ohne Überschwingen",
        desc: "Rashbass (1961) und Barnes (2008) betonen, dass das Auge nach dem Sakkadenstopp nicht verharren darf, sondern sofort auf die neue Zielgeschwindigkeit aufspringen muss.",
        tips: "Koppeln Sie den Blick beim Auftreffen direkt an die neue Richtung an, ohne zögerliche Zwischenstopps einzulegen."
      },
      {
        name: "Einsatz von High-Refresh-Rate-Displays (144 Hz+) zur Latenzminimierung",
        desc: "Woods et al. (2015) heben hervor, dass höhere Bildwiederholraten die Darstellung der ersten Richtungsänderungsframes physikalisch beschleunigen.",
        tips: "Nutzen Sie wenn möglich Monitore mit 144 Hz oder mehr und sorgen Sie für eine ermüdungsfreie Raumausleuchtung."
      }
    ]
  },
  steps: [
    "Wählen Sie die gewünschte Geschwindigkeit (0.5x bis 2.0x) und starten Sie die 60-Sekunden-Sitzung.",
    "Nehmen Sie eine aufrechte Sitzposition im Abstand von 50 bis 70 cm ein und fixieren Sie Ihren Kopf vollständig.",
    "Folgen Sie der geradlinigen Flugbahn des Zielobjekts mit ruhigen, gleichmäßigen Augenbewegungen.",
    "Führen Sie beim abrupten Ausweichknick sofort eine präzise Korrektursakkade aus und koppeln Sie wieder nahtlos an.",
    "Analysieren Sie nach Ablauf der Zeit Ihre Blickkonstanz und passen Sie das Tempo für die nächste Runde an."
  ],
  audience: "FPS- und eSport-Athleten (Apex Legends, Overwatch, CS2, VALORANT), Ballsportler (Tennis, Tischtennis, Badminton, Fußball, Basketball), sowie alle Personen, die ihre visuelle Reaktionsfähigkeit und Augenmuskelpräzision wissenschaftlich fundiert steigern möchten.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('bahill1980', 'rashbass1961', 'krauzlis2004', 'robinson1965', 'barnes2008', 'woods2015'),
  related: [
    { href: "/de/drills/visual-tracking/constant-slow-pursuit", label: "Langsame Augenfolgebewegung (Constant Slow)" },
    { href: "/de/drills/visual-tracking/directional-chaos-pursuit", label: "Chaotische Augenfolgebewegung (Directional Chaos)" },
    { href: "/de/drills/visual-tracking/sine-wave-pursuit", label: "Sinuswellen-Verfolgungstraining (Sine Wave)" },
    { href: "/de/drills/visual-tracking/infinity-pursuit", label: "Achter-Schleifen-Blickübung (Infinity)" },
    { href: "/de/drills/visual-tracking/predictive-pursuit", label: "Prädiktive Blickverfolgung (Predictive)" },
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
      <DynamicEvasionPursuitClient
        copy={{
          title: "Reaktives Tracking Training – Dynamische Ausweichziel-Verfolgung",
          subtitle: "Sakkadische Neuzentrierung & Reaktives Blickverfolgungs-Training",
          description: "Die Verfolgung aktiv ausweichender Ziele erfordert den nahtlosen Wechsel zwischen glatter Folgebewegung entlang linearer Vektoren und sofortigen Korrektursakkaden (Catch-up Saccades) bei abrupten Richtungsbrüchen (Rashbass, 1961). Sobald das Ziel ausweicht, minimiert das okulomotorische System die sensomotorische Latenz (~150–200 ms), um die Fovea blitzschnell neu zu zentrieren und den Folgebewegungs-Gain wiederherzustellen (Krauzlis, 2004; Barnes, 2008)."
        }}
      />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/de/drills/visual-tracking/dynamic-evasion-pursuit" />
      </div>
    </>
  );
}
