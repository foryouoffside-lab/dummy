import ReactionSpeedDrillsClient from '@/app/drills/reaction-speed/ReactionSpeedDrillsClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const reactionDrills = DRILLS.filter((d) => d.category === 'reaction-speed');

export const metadata = {
  title: 'Reaktionstest & Reflex Training Online | SkillDrills',
  description: 'Kostenloser Reaktionstest & Reflextraining online. Messe deine Reaktionszeit in Millisekunden mit 8 wissenschaftlichen Drills direkt im Browser.',
  keywords: [
    'Reaktionstest Online', 'Reaktionszeit Testen', 'Reflexe Trainieren Gaming',
    'Reaktionszeit Verbessern', 'Klick Geschwindigkeit Test', 'Hand-Auge-Koordination Übungen',
    'Einfache Reaktionszeit Wahlreaktionszeit', 'Sakkadische Augenbewegungen',
    'FPS Reflexe Millisekunden', 'Dynamische Sehschärfe Test', 'Gaming Monitor Input Lag',
    'Kostenlose Reflexspiele Browser', 'Peripheres Sehen Trainieren',
    'Reaktionszeit Durchschnitt Mensch', 'Esports Reflex Training'
  ],
  openGraph: {
    title: 'Reaktionstest & Reflex Training Online | SkillDrills',
    description: 'Kostenloser Reaktionstest & Reflextraining online. Messe deine Reaktionszeit in Millisekunden mit 8 wissenschaftlichen Drills direkt im Browser.',
    type: 'website',
    url: 'https://skilldrills.online/de/drills/reaction-speed',
    siteName: 'SkillDrills',
    locale: 'de_DE',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Reaktionstest und Reflex Training Online' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reaktionstest & Reflex Training Online | SkillDrills',
    description: 'Messe deine Reaktionszeit in Millisekunden mit 8 wissenschaftlich fundierten Drills im Browser.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/reaction-speed',
    languages: getAlternateLanguages('/de/drills/reaction-speed'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/de" },
    { "@type": "ListItem", "position": 2, "name": "Trainingsdrills Übersicht", "item": "https://skilldrills.online/de/drills" },
    { "@type": "ListItem", "position": 3, "name": "Reaktionsgeschwindigkeit", "item": "https://skilldrills.online/de/drills/reaction-speed" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Kostenloser Reaktionstest & Reflex-Trainingszentrum Online",
  "url": "https://skilldrills.online/de/drills/reaction-speed",
  "description": "8 interaktive Drills für Reaktionszeit, dynamische Sehschärfe, sakkadische Blicksprünge und Klick-Präzision. Ohne Download direkt im Webbrowser trainieren.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": reactionDrills.map((drill) => {
    const loc = getLocalizedDrill(drill.href, 'de', drill.name);
    return {
      "@type": "WebApplication",
      "name": loc.name,
      "url": `https://skilldrills.online/de${drill.href}`
    };
  })
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was ist der physiologische Unterschied zwischen einfacher Reaktionszeit (Simple RT) und Wahlreaktionszeit (Choice RT)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die einfache Reaktionszeit (Simple RT) bezeichnet die Latenz zwischen einem einzigen, vorhersehbaren Reiz (z. B. der Bildschirm wechselt auf Grün) und der Ausführung einer vorgegebenen motorischen Aktion (Mausklick), die bei gesunden Erwachsenen im Schnitt 200 bis 250 Millisekunden beträgt. Die Wahlreaktionszeit (Choice RT) hingegen erfordert vor der motorischen Handlung einen kognitiven Entscheidungsprozess (z. B. Identifikation von Freund/Feind oder Ausweichrichtung nach Hicks Gesetz), wodurch sich die Reaktionsdauer auf 300 bis über 450 ms verlängert. Im taktischen Esports entscheidet primär die trainierte Wahlreaktionszeit über den Ausgang dynamischer Spielsituationen."
      }
    },
    {
      "@type": "Question",
      "name": "Wie hoch ist die durchschnittliche menschliche Reaktionszeit und lässt sie sich auf Profi-Niveau senken?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bei visuellen Reizen liegt die mittlere einfache Reaktionszeit ungeschulter Erwachsener bei etwa 240 bis 270 ms. Dies umfasst die fotochemische Signaltransduktion in den Photorezeptoren der Netzhaut (20–40 ms), die Weiterleitung über den Sehnerv in den visuellen Kortex (60–80 ms) sowie die efferente Impulsübertragung über das Rückenmark in die Fingermuskulatur (50–70 ms). Durch gezieltes neurokognitives Reiz-Reaktions-Training und Optimierung synaptischer Bahnen können ambitionierte Gamer und Leistungssportler ihre visuelle Reaktionszeit nachhaltig auf 150 bis 180 ms reduzieren."
      }
    },
    {
      "@type": "Question",
      "name": "Wie verbessern dynamische Sehschärfe (DVA) und sakkadische Augenbewegungen die Reaktionsfähigkeit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Schnelle Reaktionen beginnen im Auge: Bevor das Gehirn einen motorischen Befehl senden kann, muss das Ziel scharf auf der Fovea centralis (dem Punkt des schärfsten Sehens der Netzhaut) fixiert werden. Durch das Training von flüssigen Folgebewegungen (Smooth Pursuit) und sprunghaften Blickverlagerungen (Sakkaden) wird die äußere Augenmuskulatur gestärkt. Dies verkürzt die visuelle Erfassungszeit um wertvolle Millisekunden und beschleunigt die Signalverarbeitung im visuellen Assoziationskortex erheblich."
      }
    },
    {
      "@type": "Question",
      "name": "Welchen Einfluss haben Monitor-Bildwiederholrate (Hz) und Maus-Pollingrate auf die gemessene Reaktionszeit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hardware-Latenzen verfälschen Reaktionsmessungen gravierend. Ein Standard-Monitor mit 60 Hz erneuert das Bild nur alle 16,6 ms, während ein Gaming-Bildschirm mit 144 Hz (ca. 6,9 ms) oder 240 Hz (ca. 4,1 ms) den visuellen Reiz deutlich früher anzeigt. Gepaart mit einer Gaming-Maus mit mindestens 1000 Hz Abfragerate und der W3C Pointer Lock API im Browser werden Betriebssystem-Glättungen und Pufferverzögerungen vollständig umgangen, sodass die gemessene Latenz auf 1 ms genau der physiologischen Nervenleitzeit entspricht."
      }
    },
    {
      "@type": "Question",
      "name": "Wie wirken sich Schlafmangel, Koffein und Dehydratation auf das zentrale Nervensystem aus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bereits zwei Stunden Schlafmangel verlangsamen die kortikale Signalübertragung und verlängern die Reaktionszeit um 30 bis 50 ms – ein Leistungsabfall, der mit leichtem Alkoholeinfluss vergleichbar ist. Eine moderate Dosis Koffein (100–200 mg) blockiert Adenosinrezeptoren und kann die Reaktionsfähigkeit kurzfristig um 10 bis 15 ms beschleunigen; eine Überdosierung führt jedoch zu feinschlägigem Muskeltremor und Präzisionsverlust. Bereits 2 % Flüssigkeitsverlust im Körper reduzieren zudem die Reaktionshemmung und die selektive Aufmerksamkeit im Frontallappen spürbar."
      }
    },
    {
      "@type": "Question",
      "name": "Wie hängt der Netzwerk-Ping in Online-Shootern mit der biologischen Reaktionszeit zusammen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Gesamtlatenz bis zum Servertreffer setzt sich aus biologischer Reaktionszeit, System-Input-Lag und Netzwerk-Ping zusammen. Ein Spieler mit 200 ms biologischer Reaktionszeit, 15 ms System-Lag und 35 ms Ping erreicht den Spielserver nach 250 ms. Hat ein Gegner einen um 20 ms besseren Ping, kann dieser Vorteil durch ein Training, das die biologische Reaktionszeit um 30 ms verkürzt, vollständig neutralisiert und der Schusswechsel dennoch gewonnen werden."
      }
    },
    {
      "@type": "Question",
      "name": "Wie sieht eine optimale tägliche Trainingsroutine zur Reaktionsverbesserung aus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Das zentrale Nervensystem ermüdet bei maximalen Reaktivitätsübungen extrem schnell. Ein Training im Zustand neuronaler Erschöpfung führt dazu, dass verlangsamte Reiz-Reaktions-Muster im motorischen Gedächtnis verankert werden. Optimal sind kurze, hochintensive Einheiten von 15 bis 20 Minuten an 4 bis 5 Tagen pro Woche. Leichtes Aufwärmen der Finger- und Unterarmmuskulatur vorab sowie gezielte 60-sekündige Blickpausen zwischen den Durchgängen fördern die Myelinisierung der Nervenbahnen am effektivsten."
      }
    },
    {
      "@type": "Question",
      "name": "Funktionieren die Reaktionstests auf SkillDrills auch auf Smartphones und Tablets präzise?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Alle Drills auf SkillDrills sind für mobile Touch-Eingaben und Desktop-Mäuse gleichermaßen optimiert. Allerdings weisen kapazitive Touchscreens moderner Smartphones bauartbedingt eine Touch-Hardware-Latenz von etwa 20 bis 40 ms auf. Für eine wissenschaftlich exakte Millisekunden-Messung und das Training von Mikro-Mausbewegungen empfiehlt sich daher ein PC mit 144Hz+ Monitor, während das Smartphone hervorragend für kognitive Reflexübungen unterwegs geeignet ist."
      }
    }
  ]
};

export default function GermanReactionHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ReactionSpeedDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}

