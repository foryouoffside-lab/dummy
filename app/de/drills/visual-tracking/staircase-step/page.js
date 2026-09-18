import StaircaseStepClient from '@/app/drills/visual-tracking/staircase-step/StaircaseStepClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Vertikales Augentraining – Stufen-Tracking | SkillDrills",
  description: "Trainieren Sie vertikale Blickfolgebewegungen und Höhensakkaden entlang stufenförmiger Zickzack-Bahnen. Mittelhirn-Stimulation online. Kostenlos.",
  keywords: [
    "vertikales blicktracking uebung",
    "stufenfoermige blickverfolgung",
    "vertikale blickfolge augentraining",
    "hoehenunterschied aim training",
    "vertikale blicksakkaden ueben",
    "mittelhirn rimlf stimulation",
    "vertikale blickmotorik test",
    "esports recoil blickkontrolle",
    "augengymnastik vertikal",
    "fangssakkaden hoehensteuerung",
    "vertikale blickstabilisierung",
    "stufenweises sehtraining"
  ],
  alternates: {
    canonical: "https://skilldrills.online/de/drills/visual-tracking/staircase-step",
    languages: getAlternateLanguages("/drills/visual-tracking/staircase-step"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Vertikales Augentraining – Stufen-Tracking | SkillDrills",
    description: "Trainieren Sie vertikale Blickfolgebewegungen und Höhensakkaden entlang stufenförmiger Zickzack-Bahnen. Mittelhirn-Stimulation online. Kostenlos.",
    url: "https://skilldrills.online/de/drills/visual-tracking/staircase-step",
    siteName: "SkillDrills",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vertikales Augentraining – Stufen-Tracking | SkillDrills",
    description: "Trainieren Sie vertikale Blickfolgebewegungen und Höhensakkaden entlang stufenförmiger Zickzack-Bahnen. Mittelhirn-Stimulation online. Kostenlos.",
  },
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
      "name": "Blickverfolgung & Augentraining",
      "item": "https://skilldrills.online/de/drills/visual-tracking"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Stufenförmiges Blicktracking",
      "item": "https://skilldrills.online/de/drills/visual-tracking/staircase-step"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Vertikales Augentraining – Stufen-Tracking",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Trainieren Sie vertikale Blickfolgebewegungen und Höhensakkaden entlang stufenförmiger Zickzack-Bahnen. Mittelhirn-Stimulation online.",
  "url": "https://skilldrills.online/de/drills/visual-tracking/staircase-step",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online"
  },
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Vertikales Augentraining – Stufen-Tracking",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas und JavaScript-fähiger moderner Webbrowser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/de/drills/visual-tracking/staircase-step",
  "dateModified": "2026-09-15"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Vertikales Augentraining – Stufen-Tracking",
  "url": "https://skilldrills.online/de/drills/visual-tracking/staircase-step",
  "description": "Trainieren Sie vertikale Blickfolgebewegungen und Höhensakkaden entlang stufenförmiger Zickzack-Bahnen. Mittelhirn-Stimulation online.",
  "genre": [
    "Action",
    "Aim Training",
    "Visuelles Training"
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

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Anleitung für das stufenförmige vertikale Augentraining",
  "description": "Schritt-für-Schritt-Anleitung zur Steigerung der vertikalen Blickfolgegüte und Höhensakkadenpräzision entlang mehrteiliger Treppenbahnen.",
  "dateModified": "2026-09-15",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Parameter der Trainingseinheit anpassen",
      "text": "Wählen Sie Sitzungsdauer (30 bis 120 Sekunden), Geschwindigkeit und Zielgröße. Aktivieren Sie optional die Linienausblendung (Hide Line).",
      "url": "https://skilldrills.online/de/drills/visual-tracking/staircase-step#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Kopf und Nacken absolut ruhigstellen",
      "text": "Halten Sie das Kinn gerade und fixieren Sie die Kopfhaltung. Vermeiden Sie jedes Nicken, damit die vertikalen Augenmuskeln isoliert beansprucht werden.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/staircase-step#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Präzises Re-Targeting an den Stufenkanten",
      "text": "Folgen Sie dem Ziel auf geraden Abschnitten mit stetiger Blickfolge und fangen Sie abrupte 90-Grad-Winkelwechsel mit exakten Mikrosakkaden ab.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/staircase-step#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Aufwärts-Abwärts-Symmetrie vergleichen und Tempo steigern",
      "text": "Analysieren Sie, ob Sie bei Aufwärts- oder Abwärtsstufen mehr Verzögerung zeigen, und erhöhen Sie das Tempo sukzessive für neuromuskuläre Adaptation.",
      "url": "https://skilldrills.online/de/drills/visual-tracking/staircase-step#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was ist das stufenförmige vertikale Augentraining (Staircase Step)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein spezialisiertes okulomotorisches Trainingsprogramm, bei dem ein Zielobjekt einer vertikalen Zickzack-Stufenbahn folgt. Es verbindet kontinuierliche diagonale Blickfolgebewegungen mit abrupten Richtungswechseln an den Stufenkanten und trainiert gezielt die vertikale Augenmotorik bei fixiertem Kopf."
      }
    },
    {
      "@type": "Question",
      "name": "Warum fällt vertikale Blickverfolgung schwerer als horizontales Tracking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Neuroanatomisch wird die horizontale Blickmotorik in der Brücke (PPRF) gesteuert, während vertikale Augenbewegungen über separate Kerngebiete im Mittelhirn koordiniert werden – den rostralen interstitiellen Kern des medialen Längsbündels (riMLF) und den Nucleus interstitialis von Cajal (Büttner-Ennever & Horn, 1997). Da unser Alltag fast ausschließlich aus horizontalen Blickbewegungen besteht, weisen vertikale Blickfolgen von Natur aus geringere Geschwindigkeitsgewinne (Gains) und größere Phasenverzögerungen auf (Rottach et al., 1996)."
      }
    },
    {
      "@type": "Question",
      "name": "Warum ist das Verfolgen nach oben (Elevation) oft mühsamer als nach unten?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ke et al. (2013) wiesen ausgeprägte Richtungsasymmetrien bei vertikalen Blickfolgebewegungen nach. Die Aufwärtsbewegung erfordert eine komplexe Koaktivierung von Musculus rectus superior und Musculus obliquus inferior. Zudem besitzt das visuelle System für aufwärts gerichteten retinalen Schlupf eine geringere neuronale Verstärkung, weshalb Aufwärtsbewegungen häufiger durch kompensatorische Fangsakkaden (Catch-up Saccades) gestört werden."
      }
    },
    {
      "@type": "Question",
      "name": "Warum darf der Kopf während des Trainings auf keinen Fall mitbewegt werden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sobald der Kopf nickt oder kippt, setzt sofort der vestibulookuläre Reflex (VOR) ein. Dadurch wird die vertikale Bewegung auf der Netzhaut in eine passive Fixierung oder leichte horizontale Kompensation umgewandelt. Um die spezialisierten Mittelhirnbahnen (riMLF) und die vertikalen Augenmuskeln isoliert zu trainieren, muss der Kopf absolut ruhig bleiben."
      }
    },
    {
      "@type": "Question",
      "name": "Warum verliert das Auge an den 90-Grad-Kanten oft kurz das Ziel?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bei rechtwinkligen Richtungswechseln bricht die Bewegungsvorhersage des Blickfolgesystems schlagartig zusammen. Da die glatte Blickfolge eine neuronale Latenz von rund 100 ms hat (Lisberger, 2010), kann sie scharfe Ecken nicht kontinuierlich durchlaufen. Das Gehirn muss blitzschnell auf das Sakkadensystem umschalten, um das Ziel wieder einzufangen. Die Minimierung dieser Umschaltdauer ist das Hauptziel dieser Übung."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Vorteile bietet dieses Training für FPS-Gamer (Apex Legends, Overwatch)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In modernen Shootern bewegen sich Gegner häufig vertikal – über Jump-Pads, Seilrutschen, Luftangriffe oder mehrstöckige Gebäudestrukturen. Wer seine vertikale Blickfolge trainiert, hält das Fadenkreuz stabil auf airborne Gegnern und kann den vertikalen Waffenrückstoß (Recoil) visuell fehlerfrei ausgleichen."
      }
    },
    {
      "@type": "Question",
      "name": "Haben Ballsportler (Volleyball, Tennis, Basketball) einen Nutzen davon?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Bei Volleybällen über Kopf, Tennis-Lobs oder Basketball-Rebounds muss die Flugbahn steil aufsteigender Bälle sekundenschnell taxiert werden. Ein optimierter vertikaler Blickfolge-Gain ermöglicht präzisere Treffpunktantizipation und verbesserte Raumorientierung."
      }
    },
    {
      "@type": "Question",
      "name": "Was bewirkt das Ausschalten der Führungslinie (Hide Line)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ohne sichtbare Stufenlinien fehlen externe geometrische Anhaltspunkte. Der visuelle Kortex und das Kleinhirn müssen nun rein intern antizipieren, wo sich die nächste Stufenkante befindet, was die vorausschauende Blicksteuerung (Feedforward Control) und das Arbeitsgedächtnis extrem fordert."
      }
    },
    {
      "@type": "Question",
      "name": "Wie lange sollte man täglich trainieren?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ideal sind 2 bis 3 Durchgänge à 45 bis 60 Sekunden, insgesamt 3 bis 5 Minuten pro Tag. Die vertikalen Augenmuskeln ermüden wesentlich rascher als die horizontalen Muskeln. Kurze Einheiten mit voller Konzentration bringen daher den größten Trainingsgewinn."
      }
    },
    {
      "@type": "Question",
      "name": "Warum ist ein 144Hz+-Monitor für vertikales Tracking entscheidend?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bei 60Hz (16,7 ms Frame-Intervall) entsteht an den Stufenkanten ein optisches Ruckeln, das die präzise Lokalisation der Wendepunkte erschwert. Bei 144Hz (6,9 ms) wird der rechtwinklige Vektorwechsel gestochen scharf dargestellt, sodass die Burst-Neuronen des Mittelhirns punktgenaue Korrektursakkaden auslösen können (Woods et al., 2015)."
      }
    }
  ]
};

const guide = {
  heading: "Vertikales Augentraining & Höhensakkaden: Stufenförmige Blickverfolgung",
  intro: [
    "Das menschliche Blickmotorik-System (Oculomotor System) verfügt über grundlegend getrennte neuroanatomische Leitungsbahnen für horizontale und vertikale Augenbewegungen. Während horizontale Blickfolgen und Sakkaden über Netzwerke der pontinen Formatio reticularis (PPRF) gesteuert werden, unterliegt die vertikale Blickmotorik der exklusiven Kontrolle spezialisierter Mittelhirn-Kerne – insbesondere des rostralen interstitiellen Kerns des medialen Längsbündels (riMLF) und des Cajal-Kerns (Büttner-Ennever & Horn, 1997).",
    "Psychophysikalische Messungen (Rottach et al., 1996; Ke et al., 2013) belegen, dass die vertikale Blickfolge von Natur aus einen signifikant niedrigeren Geschwindigkeitsgewinn (Gain), längere Reaktionslatenzen und eine stärkere Phasenverzögerung als die horizontale Blickfolge aufweist. Zudem besteht eine ausgeprägte Richtungsasymmetrie: Die Verfolgung nach oben (Elevation) bricht bei Geschwindigkeitssteigerungen deutlich schneller ein und löst mehr kompensatorische Fangsakkaden (Catch-up Saccades) aus als die Verfolgung nach unten.",
    "Da moderne Zivilisationsgewohnheiten wie Lesen, Smartphone-Nutzung und Breitbildmonitore das Sehsystem fast ausschließlich horizontal fordern, verbleiben die vertikalen neuronalen Schaltkreise in einem Zustand relativer Unterstimulation. Dieses Ungleichgewicht führt bei schnellen Höhenwechseln – etwa beim Visieren auf vertikal springende Gegner in E-Sport-Titeln oder beim Verfolgen hoch aufsteigender Bälle im Sport – zu sichtbarem Blickzittern und Kontrollverlust.",
    "Der Trainingsdrill 'Staircase Step' konditioniert genau diese vernachlässigten Signalwege. Durch das Steuern eines Reizes entlang mehrstufiger Zickzack-Stufenbahnen kombiniert die Übung kontinuierliche diagonale Blickfolgebewegungen mit abrupten Verzögerungen und Re-Targeting-Sakkaden an rechtwinkligen Kanten (Collewijn & Tamminga, 1984; Lisberger, 2010). Bei minimaler Latenz auf 144Hz+-Displays (Woods et al., 2015) stärkt dieser Drill die synaptische Plastizität des Mittelhirns. Alle Ergebnisse verbleiben sicher in Ihrem lokalen Browser."
  ],
  benchmarks: {
    title: "Leistungsstandards für vertikale Blickverfolgung & Höhensakkaden",
    headers: ["Leistungsstufe", "Geschwindigkeit", "Kanten-Re-Targeting", "Vertikaler Gain (geschätzt)", "Populationsanteil"],
    rows: [
      ["Elite / Voll adaptiert (Elite)", "3,5x bis 5,0x+", "Kein Überschießen an Stufenkanten", "Gain 0,92 bis 0,98 (nahezu verzögerungsfrei)", "Top 1,5%"],
      ["Master / Hohe Höhenkontrolle (Master)", "2,5x bis 3,5x", "Sofortiges Einrasten per Mikrosakkade", "Gain 0,85 bis 0,92 (sehr stabil)", "Top 8%"],
      ["Advanced / Wettkampfniveau (Advanced)", "1,8x bis 2,5x", "Gleichmäßig auf Schrägen, minimale Kantenabweichung", "Gain 0,75 bis 0,85 (gute Führung)", "Top 25%"],
      ["Intermediate / Grundstufe (Intermediate)", "1,2x bis 1,8x", "Verzögerungen bei Aufwärtsstufen, Nackenausgleich", "Gain 0,60 bis 0,75 (häufige Fangsakkaden)", "Mittlere 45%"],
      ["Novice / Untrainiert (Novice)", "0,5x bis 1,2x", "Totalverlust an Stufenkanten, Kopf bewegt mit", "Gain < 0,60 (hektische Blicksprünge)", "Einstiegsbereich"]
    ],
    note: "Die Richtwerte basieren auf den vertikalen Blickfolge-Gains von Rottach et al. (1996) und den Asymmetrie-Modellen von Ke et al. (2013)."
  },
  techniques: [
    {
      title: "Vollständige Kopffixierung und reine Augenisolation",
      description: "Bei vertikalen Bewegungen neigt der Mensch dazu, unwillkürlich mit dem Kopf zu nicken. Jede Kopfbewegung aktiviert den VOR-Reflex und entlastet die zu trainierenden Augenmuskeln. Ziehen Sie das Kinn leicht an und bewegen Sie ausschließlich die Augäpfel nach oben und unten.",
      tips: [
        "Legen Sie den Hinterkopf sanft an eine Kopfstütze, um minimale Ausweichbewegungen sofort zu spüren",
        "Entspannen Sie die Nacken- und Schultermuskulatur, damit das Sichtfeld absolut horizontal bleibt",
        "Senken Sie das Tempo auf 0,8x, falls der Kopf reflexartig mitgehen will, bis die reine Augenisolation gelingt"
      ]
    },
    {
      title: "Prädiktives Abbremsen an den Stufenkanten und Fangsakkaden",
      description: "Wer versucht, rechtwinklige Ecken mit gleichbleibender Geschwindigkeit zu durchlaufen, schießt unweigerlich über das Ziel hinaus (Overshoot). Verlangsamen Sie die Blickführung kurz vor der Ecke und nutzen Sie eine gezielte Mikrosakkade, um den Richtungswechsel zu vollziehen.",
      tips: [
        "Erfassen Sie das Stufengitter im peripheren Sehbereich, um den Rhythmus der Kanten vorauszuahnen",
        "Kompensieren Sie die 100-ms-Verzögerung der Blickfolge (Lisberger, 2010) durch einen winzigen Vorhalteblick",
        "Trainieren Sie mit der Option 'Hide Line', um sich voll auf das interne Zeitgefühl der Wendepunkte zu stützen"
      ]
    },
    {
      title: "Kompensation des Gain-Abfalls bei Aufwärtsbewegungen",
      description: "Die meisten Menschen verlieren bei Aufwärtsstufen schneller den Kontakt zum Ziel als bei Abwärtsstufen (Ke et al., 2013). Richten Sie Ihren Blickfokus bei aufsteigenden Stufen bewusst auf den oberen Rand des Ziels, um der Nacheilung entgegenzuwirken.",
      tips: [
        "Fixieren Sie in der Steigphase nicht den Mittelpunkt, sondern ziehen Sie den oberen Rand des Zielkreises gedanklich nach oben",
        "Nutzen Sie die Abwärtsphase zur Entspannung, da das Auge der Schwerkraftrichtung natürlicher folgt",
        "Atmen Sie beim Wechsel von Steigen auf Fallen bewusst aus, um Verspannungen der Augenringmuskeln zu lösen"
      ]
    },
    {
      title: "Trennung der vertikalen Höhenkomponente aus dem Mischvektor",
      description: "Die Zickzack-Bahn verbindet horizontale (X) und vertikale (Y) Vektoren. Um zu verhindern, dass die dominanteren horizontalen Augenmuskeln die Führung übernehmen, konzentrieren Sie 70 % Ihrer Aufmerksamkeit auf die Höhenänderung.",
      tips: [
        "Fokussieren Sie mental primär auf das 'Klettern' des Ziels und überlassen Sie die Seitenbewegung dem peripheren Blick",
        "Überprüfen Sie an den obersten und untersten Wendepunkten, ob die Augen ihren vollen vertikalen Bewegungsradius ausschöpfen",
        "Nutzen Sie kontrastreiche Zielfarben (Cyber Red), um deutliche retinale Reizspuren zu erzeugen"
      ]
    }
  ],
  deviceCalibration: {
    title: "Ergonomie- und Hardware-Vorgaben für vertikales Augentraining",
    points: [
      "Monitorhöhe und vertikaler Blickwinkel: Stellen Sie den Bildschirm so ein, dass sich das obere Bildschirmdrittel auf Augenhöhe befindet. Ein zu hoher Monitor überstreckt den Nacken, ein zu tiefer staucht die Abwärtsmuskeln.",
      "Bildwiederholrate: Mindestens 144 Hz empfohlen, um die 90-Grad-Kanten ohne Nachzieheffekte scharf darzustellen. Verringert die Bildlatenz auf 6,9 ms gegenüber 16,7 ms bei 60 Hz (Woods et al., 2015).",
      "Sitzabstand: Halten Sie einen Abstand von 50 bis 65 cm ein, sodass der Bildschirm ca. 25 bis 30 Grad des vertikalen Gesichtsfelds einnimmt. Zu nahes Sitzen erzwingt Nackenbewegungen.",
      "Kontrast & Beleuchtung: Dunkler Modus mit Cyber-Red (#ef4444) oder Neon-Blau; indirekte Beleuchtung verhindert störende Reflexionen auf der Monitoroberfläche."
    ]
  },
  faqs: [
    {
      q: "Was ist das stufenförmige vertikale Augentraining (Staircase Step)?",
      a: "Ein spezialisiertes okulomotorisches Trainingsprogramm, bei dem ein Zielobjekt einer vertikalen Zickzack-Stufenbahn folgt. Es verbindet kontinuierliche diagonale Blickfolgebewegungen mit abrupten Richtungswechseln an den Stufenkanten und trainiert gezielt die vertikale Augenmotorik bei fixiertem Kopf."
    },
    {
      q: "Warum fällt vertikale Blickverfolgung schwerer als horizontales Tracking?",
      a: "Neuroanatomisch wird die horizontale Blickmotorik in der Brücke (PPRF) gesteuert, während vertikale Augenbewegungen über separate Kerngebiete im Mittelhirn koordiniert werden – den rostralen interstitiellen Kern des medialen Längsbündels (riMLF) und den Nucleus interstitialis von Cajal (Büttner-Ennever & Horn, 1997). Da unser Alltag fast ausschließlich aus horizontalen Blickbewegungen besteht, weisen vertikale Blickfolgen von Natur aus geringere Geschwindigkeitsgewinne (Gains) und größere Phasenverzögerungen auf (Rottach et al., 1996)."
    },
    {
      q: "Warum ist das Verfolgen nach oben (Elevation) oft mühsamer als nach unten?",
      a: "Ke et al. (2013) wiesen ausgeprägte Richtungsasymmetrien bei vertikalen Blickfolgebewegungen nach. Die Aufwärtsbewegung erfordert eine komplexe Koaktivierung von Musculus rectus superior und Musculus obliquus inferior. Zudem besitzt das visuelle System für aufwärts gerichteten retinalen Schlupf eine geringere neuronale Verstärkung, weshalb Aufwärtsbewegungen häufiger durch kompensatorische Fangsakkaden (Catch-up Saccades) gestört werden."
    },
    {
      q: "Warum darf der Kopf während des Trainings auf keinen Fall mitbewegt werden?",
      a: "Sobald der Kopf nickt oder kippt, setzt sofort der vestibulookuläre Reflex (VOR) ein. Dadurch wird die vertikale Bewegung auf der Netzhaut in eine passive Fixierung oder leichte horizontale Kompensation umgewandelt. Um die spezialisierten Mittelhirnbahnen (riMLF) und die vertikalen Augenmuskeln isoliert zu trainieren, muss der Kopf absolut ruhig bleiben."
    },
    {
      q: "Warum verliert das Auge an den 90-Grad-Kanten oft kurz das Ziel?",
      a: "Bei rechtwinkligen Richtungswechseln bricht die Bewegungsvorhersage des Blickfolgesystems schlagartig zusammen. Da die glatte Blickfolge eine neuronale Latenz von rund 100 ms hat (Lisberger, 2010), kann sie scharfe Ecken nicht kontinuierlich durchlaufen. Das Gehirn muss blitzschnell auf das Sakkadensystem umschalten, um das Ziel wieder einzufangen. Die Minimierung dieser Umschaltdauer ist das Hauptziel dieser Übung."
    },
    {
      q: "Welche Vorteile bietet dieses Training für FPS-Gamer (Apex Legends, Overwatch)?",
      a: "In modernen Shootern bewegen sich Gegner häufig vertikal – über Jump-Pads, Seilrutschen, Luftangriffe oder mehrstöckige Gebäudestrukturen. Wer seine vertikale Blickfolge trainiert, hält das Fadenkreuz stabil auf airborne Gegnern und kann den vertikalen Waffenrückstoß (Recoil) visuell fehlerfrei ausgleichen."
    },
    {
      q: "Haben Ballsportler (Volleyball, Tennis, Basketball) einen Nutzen davon?",
      a: "Ja. Bei Volleybällen über Kopf, Tennis-Lobs oder Basketball-Rebounds muss die Flugbahn steil aufsteigender Bälle sekundenschnell taxiert werden. Ein optimierter vertikaler Blickfolge-Gain ermöglicht präzisere Treffpunktantizipation und verbesserte Raumorientierung."
    },
    {
      q: "Was bewirkt das Ausschalten der Führungslinie (Hide Line)?",
      a: "Ohne sichtbare Stufenlinien fehlen externe geometrische Anhaltspunkte. Der visuelle Kortex und das Kleinhirn müssen nun rein intern antizipieren, wo sich die nächste Stufenkante befindet, was die vorausschauende Blicksteuerung (Feedforward Control) und das Arbeitsgedächtnis extrem fordert."
    },
    {
      q: "Wie lange sollte man täglich trainieren?",
      a: "Ideal sind 2 bis 3 Durchgänge à 45 bis 60 Sekunden, insgesamt 3 bis 5 Minuten pro Tag. Die vertikalen Augenmuskeln ermüden wesentlich rascher als die horizontalen Muskeln. Kurze Einheiten mit voller Konzentration bringen daher den größten Trainingsgewinn."
    },
    {
      q: "Warum ist ein 144Hz+-Monitor für vertikales Tracking entscheidend?",
      a: "Bei 60Hz (16,7 ms Frame-Intervall) entsteht an den Stufenkanten ein optisches Ruckeln, das die präzise Lokalisation der Wendepunkte erschwert. Bei 144Hz (6,9 ms) wird der rechtwinklige Vektorwechsel gestochen scharf dargestellt, sodass die Burst-Neuronen des Mittelhirns punktgenaue Korrektursakkaden auslösen können (Woods et al., 2015)."
    }
  ],
  related: [
    { href: "/de/drills/visual-tracking/split-screen-tracking", label: "Split-Screen Augentraining" },
    { href: "/de/drills/visual-tracking/sine-wave-pursuit", label: "Sinuswellen-Augentraining" },
    { href: "/de/drills/visual-tracking/directional-chaos-pursuit", label: "Chaotische Blickverfolgung" },
    { href: "/de/drills/visual-tracking/predictive-pursuit", label: "Prädiktives Tracking Training" },
    { href: "/de/drills/visual-tracking/constant-slow-pursuit", label: "Gleichmäßige Blickfolge-Übung" }
  ],
  sources: pickSources('rottach1996', 'collewijn1984', 'ke2013', 'buttner1997', 'lisberger2010', 'woods2015'),
};

export default function StaircaseStepDePage() {
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

      <StaircaseStepClient
        copy={{
          title: "Stufenförmiges Blicktracking",
          subtitle: "Vertikales Augentraining & Höhensakkaden",
          description: "Folgen Sie einem Zielobjekt entlang stufenförmiger vertikaler Zickzack-Bahnen zur Aktivierung der Mittelhirn-Signalwege (riMLF). Isolieren Sie die Augenmuskeln ohne Kopfbewegung und optimieren Sie Höhensakkaden und Blickfolgebewegungen bei Kantenrichtungswechseln."
        }}
      />
      <DrillGuide guide={guide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/de/drills/visual-tracking/staircase-step" />
      </div>
    </>
  );
}
