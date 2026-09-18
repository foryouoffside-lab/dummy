import VisualTrackingDrillsClient from '@/app/drills/visual-tracking/VisualTrackingDrillsClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const trackingDrills = DRILLS.filter((d) => d.category === 'visual-tracking');

export const metadata = {
  title: 'Visuelles Tracking & Dynamische Sehschärfe | SkillDrills',
  description: 'Kostenloses Augentraining & visuelles Tracking online. 14 wissenschaftliche Übungen: Augenfolgebewegungen, Sakkaden, Blickstabilisierung & Antizipation.',
  keywords: [
    'Augenfolgebewegungen trainieren', 'Dynamische Sehschärfe Test', 'Blickstabilisierung Training',
    'Sakkadische Augenbewegungen Übungen', 'Visuelles Tracking Online', 'Augentraining am PC kostenlos',
    'Blickmotorik trainieren', 'Smooth Pursuit Augentraining', 'Peripheres Sehen verbessern',
    'Sportsvision Training Online', 'Vestibulookulärer Reflex Übungen', 'Reaktion und Blickmotorik',
    'Zielverfolgung Training Gaming', 'Augenmuskeltraining Übungen', 'Antizipation Flugbahn Training'
  ],
  openGraph: {
    title: 'Visuelles Tracking & Dynamische Sehschärfe | SkillDrills',
    description: 'Kostenloses Augentraining & visuelles Tracking online. 14 wissenschaftliche Übungen: Augenfolgebewegungen, Sakkaden, Blickstabilisierung & Antizipation.',
    type: 'website',
    url: 'https://skilldrills.online/de/drills/visual-tracking',
    siteName: 'SkillDrills',
    locale: 'de_DE',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Visuelles Tracking & Augentraining Übersicht' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visuelles Tracking & Dynamische Sehschärfe | SkillDrills',
    description: 'Von glatten Augenfolgebewegungen bis zur Flugbahnvorhersage: 14 professionelle Blickmotorik-Drills kostenlos im Browser.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/visual-tracking',
    languages: getAlternateLanguages('/de/drills/visual-tracking'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/de" },
    { "@type": "ListItem", "position": 2, "name": "Alle Trainingsdrills", "item": "https://skilldrills.online/de/drills" },
    { "@type": "ListItem", "position": 3, "name": "Visuelles Tracking & Augentraining", "item": "https://skilldrills.online/de/drills/visual-tracking" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Kostenloses Visuelles Tracking & Augentraining (14 Drills)",
  "url": "https://skilldrills.online/de/drills/visual-tracking",
  "description": "14 wissenschaftliche Übungen für Augenfolgebewegungen (Smooth Pursuit), Sinuswellen-Tracking, Unendlichkeitsbahnen, ballistische Vorhersage und peripheres Sehen.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": trackingDrills.map((drill) => {
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
      "name": "Was unterscheidet physiologisch glatte Augenfolgebewegungen (Smooth Pursuit) von Sakkaden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Glatte Augenfolgebewegungen (Smooth Pursuit Eye Movements, SPEM) sind kontinuierliche, flüssige Augenbewegungen, die dazu dienen, ein sich bewegendes Objekt – wie einen fliegenden Ball oder einen Spielcharakter – exakt auf der Fovea centralis (der Stelle des schärfsten Sehens) zu halten. Sakkaden hingegen sind blitzschnelle, ballistische Blicksprünge mit Geschwindigkeiten von bis zu 900 Grad pro Sekunde zwischen zwei Fixationspunkten. Während Sakkaden den Blick neu positionieren, ermöglicht erst ein stabiles Smooth Pursuit die ununterbrochene Analyse von Flugbahnen und Geschwindigkeitsänderungen."
      }
    },
    {
      "@type": "Question",
      "name": "Welchen Einfluss hat das Training der dynamischen Sehschärfe auf die sportliche Leistung und FPS-Gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Statische Sehschärfe nützt wenig, wenn sich ein Objekt mit hoher Geschwindigkeit bewegt. Das Training der dynamischen Sehschärfe (Dynamic Visual Acuity, DVA) schult das Zusammenspiel der sechs äußeren Augenmuskeln, sodass die Randschärfe schnell bewegter Reize erhalten bleibt. Dies verkürzt die visuelle Verarbeitungszeit im visuellen Kortex um 50 bis 80 Millisekunden. In Sportarten wie Tennis oder Baseball verschafft dies wertvolle Zeit zur Flugbahnbeurteilung; in Shootern verbessert es das kontinuierliche Aim-Tracking entscheidend."
      }
    },
    {
      "@type": "Question",
      "name": "Was versteht man unter prädiktiver Blickverfolgung (Predictive Pursuit) bei temporärer Verdeckung des Ziels?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Prädiktive Blickverfolgung ist eine kognitiv-motorische Höchstleistung des Kleinhirns (Cerebellum). Verschwindet ein Ziel kurzzeitig hinter einem Hindernis (Okklusion), berechnet das Gehirn anhand der zuvor erfassten Geschwindigkeit und Beschleunigung die wahrscheinliche Flugbahn voraus. Durch gezielte Drills lernt das visuelle System, den Blick antizipativ an den Austrittspunkt zu führen, wodurch Reaktionen ohne Verzögerung und mit maximaler Präzision erfolgen."
      }
    },
    {
      "@type": "Question",
      "name": "Warum treten beim Tracking aufholende Sakkaden (Catch-up Saccades) auf und wie lassen sie sich minimieren?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aufholende Sakkaden (Catch-up Saccades) entstehen, wenn die Geschwindigkeit der Augenfolgebewegung hinter der Zielgeschwindigkeit zurückbleibt (Pursuit Gain < 1,0). Das Auge muss dann ruckartig nach vorne springen, um das Ziel wieder im Sehzentrum zu zentrieren, was zu Bildunruhe führt. Die Korrektur erfolgt durch systematisches Training mit langsamen, gleichförmigen Bewegungen und Sinuskurven, wodurch die neuromuskuläre Verstärkung (Gain) schrittweise gesteigert und Blickruckeln eliminiert wird."
      }
    },
    {
      "@type": "Question",
      "name": "Wie unterstützen visuelle Tracking-Drills die Sehtherapie und die Rehabilitation nach Gehirnerschütterungen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In der Neuroophthalmologie und Sportmedizin sind Augenfolgeübungen Standard in der Behandlung des Post-Concussion-Syndroms (PCS). Nach Schädel-Hirn-Traumata ist die Koordination der Augenbewegungen häufig gestört, was zu Schwindel, Kopfschmerzen und Konzentrationsschwächen führt. Strukturierte Blickfolge-Drills fördern die Neuroplastizität im Hirnstamm und Kleinhirn und unterstützen die Wiederherstellung stabiler beidäugiger Zusammenarbeit."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Rolle spielt der vestibulookuläre Reflex (VOR) für die Blickstabilisierung bei Körperbewegungen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der vestibulookuläre Reflex (VOR) koppelt das Innenohr-Gleichgewichtsorgan mit den Augenmuskeln. Bewegt sich der Kopf oder Körper im Raum, dreht der VOR die Augen reflexartig mit exakt gleicher Geschwindigkeit in die Gegenrichtung, um das Sichtfeld stabil zu halten. Regelmäßiges Tracking-Training verfeinert diese neuromuskuläre Abstimmung, sodass auch bei dynamischen Eigenbewegungen im Sport oder Gaming das Fadenkreuz ruhig im Ziel verbleibt."
      }
    },
    {
      "@type": "Question",
      "name": "Wie lange sollte ein effektives Augentraining täglich durchgeführt werden, um Überlastung zu vermeiden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die sechs äußeren Augenmuskeln bestehen aus hochsensiblen, schnell ermüdenden Muskelfasern. Die wissenschaftlich empfohlene Trainingsdauer liegt bei 10 bis 15 Minuten pro Tag, 3 bis 5 Mal pro Woche. Um Akkommodationskrämpfe und digitale Augenbelastung (Asthenopie) zu verhindern, sollte die '20-20-20-Regel' eingehalten werden: alle 20 Minuten für 20 Sekunden in eine Entfernung von mindestens 6 Metern blicken, um die Augenmuskulatur vollständig zu entspannen."
      }
    },
    {
      "@type": "Question",
      "name": "Warum ist ein Monitor mit hoher Bildwiederholrate (144Hz bis 360Hz) für das Augentraining entscheidend?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bei herkömmlichen 60Hz-Monitoren wird das Bild nur alle 16,7 ms aktualisiert, was bei schnellen Zielbewegungen zu Mikrorucklern und Bewegungsschlieren (Ghosting) führt. Dies zwingt das Auge zu unnatürlichen Korrektursakkaden. Monitore mit 144Hz, 240Hz oder 360Hz reduzieren den Bildabstand auf bis zu 2,8 ms, bilden echte physikalische Kontinuität ab und ermöglichen den Augenmuskeln ein physiologisch einwandfreies, vollkommen flüssiges Bewegungslernen."
      }
    }
  ]
};

export default function LocalizedVisualTrackingDrillsClientPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <VisualTrackingDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}
