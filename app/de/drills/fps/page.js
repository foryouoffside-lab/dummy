import FPSHubClient from '@/app/drills/fps/FPSHubClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const fpsDrills = DRILLS.filter((d) => d.category === 'fps');

export const metadata = {
  title: 'Kostenloser Aim Trainer – FPS Aiming Online | SkillDrills',
  description: 'Kostenloser Online-Aim-Trainer für Valorant, CS2 & Apex. 15 Profi-Übungen: Flick-Shots, Tracking, Recoil Control und Reaktionszeit direkt im Browser.',
  keywords: [
    'Aim Trainer Kostenlos', 'Aiming verbessern Valorant', 'CS2 Aim Training',
    'Maus Zielgenauigkeit', 'Flick Shot Übung', 'Tracking Aiming',
    'Fadenkreuz Platzierung', 'Mausempfindlichkeit einstellen', 'FPS Reflexe Trainieren',
    'Recoil Kontrolle online', 'Arm Aiming Handgelenk', 'Zielgenauigkeit Test',
    'Maus Präzision verbessern', 'eDPI Rechner Shooter', 'Browser Aim Trainer'
  ],
  openGraph: {
    title: 'Kostenloser Aim Trainer – FPS Aiming Online | SkillDrills',
    description: 'Kostenloser Online-Aim-Trainer für Valorant, CS2 & Apex. 15 Profi-Übungen: Flick-Shots, Tracking, Recoil Control und Reaktionszeit direkt im Browser.',
    type: 'website',
    url: 'https://skilldrills.online/de/drills/fps',
    siteName: 'SkillDrills',
    locale: 'de_DE',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Kostenloser FPS Aim Trainer Hub' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kostenloser Aim Trainer – FPS Aiming Online | SkillDrills',
    description: 'Kostenloser Online-Aim-Trainer für Valorant, CS2 & Apex. 15 Profi-Übungen direkt im Browser.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/fps',
    languages: getAlternateLanguages('/de/drills/fps'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/de" },
    { "@type": "ListItem", "position": 2, "name": "Trainingsdrills Übersicht", "item": "https://skilldrills.online/de/drills" },
    { "@type": "ListItem", "position": 3, "name": "FPS Aiming", "item": "https://skilldrills.online/de/drills/fps" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Kostenloser FPS Aim Trainer – Online Aiming Hub",
  "url": "https://skilldrills.online/de/drills/fps",
  "description": `15 professionelle FPS-Aim-Training-Drills für Valorant, CS2 und Apex Legends. Flick-Shots, Tracking, Recoil Control, Reaktionsgeschwindigkeit und Fadenkreuz-Platzierung. Kostenlos und ohne Installation im Browser.`,
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": fpsDrills.map((drill) => {
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
      "name": "Wie überträgt sich gezieltes Aim-Training auf taktische Shooter wie Valorant und CS2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In taktischen Shootern wie Valorant und CS2 liegt die Time-to-Kill (TTK) oft unter 200 Millisekunden, wodurch der erste Schuss und präzise Mikroadjustierungen spielentscheidend sind. Ein reines Deathmatch im Spiel beinhaltet lange Respawn-Zeiten und Laufwege, während ein dedizierter Browser-Aim-Trainer in 10 Minuten hunderte reine Flick- und Bremsbewegungen isoliert. Dies automatisiert die neuromuskuläre Bewegungskontrolle im motorischen Kortex, sodass im Match kognitive Kapazitäten für Fadenkreuz-Platzierung (Crosshair Placement) und Spielübersicht frei bleiben."
      }
    },
    {
      "@type": "Question",
      "name": "Was ist der Unterschied zwischen Klicktiming (Flicks), Tracking und Target Switching?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die mechanische Zielgenauigkeit in FPS-Spielen basiert auf drei Säulen: 1) Klicktiming / Flicks: Die Maus wird explosionsartig auf ein Ziel bewegt und genau im Schnittpunkt der Hitbox ausgelöst – essenziell für Einzelschusswaffen wie Vandal oder AK-47. 2) Tracking (Verfolgung): Das Fadenkreuz synchronisiert sich kontinuierlich mit der Bewegungsbahn eines Ziels, was bei Dauerfeuerwaffen in Apex Legends und Overwatch 2 entscheidend ist. 3) Target Switching: Schnelles, ballistisches Umschalten zwischen mehreren Zielen mit minimaler Verweilzeit, unabdingbar in 1-gegen-Mehrere-Kupplungssituationen."
      }
    },
    {
      "@type": "Question",
      "name": "Sollte man mit dem Handgelenk, dem Unterarm oder einer Hybridtechnik zielen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Im professionellen E-Sport dominiert die Hybrid-Aiming-Technik: Der Unterarm und die Schulter führen weite 180°-Drehungen und großräumige Schwenks aus, das Handgelenk steuert mittlere Zielerfassungen, und die Fingerspitzen übernehmen subpixelgenaue Mikroadjustierungen sowie vertikale Rückstoßkontrolle. Reines Handgelenk-Zielen schränkt den Bewegungsradius ein und erhöht das Risiko für ein Karpaltunnelsyndrom, während reines Arm-Zielen oft die Feinkoordination für präzise Headshots vermissen lässt."
      }
    },
    {
      "@type": "Question",
      "name": "Wie ermittelt man die optimale Mausempfindlichkeit und cm/360?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Empfindlichkeit wird am verlässlichsten in Zentimetern pro 360-Grad-Umdrehung (cm/360) gemessen. Für taktische Shooter (Valorant, CS2) bietet eine niedrige Sensitivität von 35 bis 55 cm/360 (eDPI 200 bis 320) maximale Stabilität für Mikroadjustierungen. Für tracking-lastige Arena-Shooter (Apex Legends, Overwatch 2) ist eine mittlere Sensitivität von 24 bis 38 cm/360 ideal. Teste die Einstellung, indem du während des seitlichen Ausweichens (Strafing) ein festes Ziel ohne Fadenkreuz-Zittern dauerhaft anvisierst."
      }
    },
    {
      "@type": "Question",
      "name": "Warum zittert mein Aim oder schießt über das Ziel hinaus (Overshooting), und wie behebe ich das?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unruhiges Zielen und Überschwingen entstehen meist durch zu hohe Muskelanspannung im Unterarm, einen verkrampften Mausgriff oder eine Sensitivität, die über der aktuellen motorischen Bremskontrolle liegt. Zur Behebung: 1) Trainiere die gezielte Reibung auf dem Mauspad, indem du die Maus am Endpunkt des Flicks sanft andrückst (Braking-Mechanismus); 2) Absolviere Smooth-Pursuit-Tracking-Drills, um flüssige, spannungsfreie Bewegungen zu konditionieren; 3) Senke die Sensitivität um 10 bis 15%, um die Fehlertoleranz zu vergrößern."
      }
    },
    {
      "@type": "Question",
      "name": "Ist ein Online-Browser-Aim-Trainer genauso reaktionsschnell wie installierte Software?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. SkillDrills nutzt die standardisierte W3C Raw Pointer Lock API und hardwarebeschleunigte HTML5-Canvas-Technologie. Dadurch werden Mausbeschleunigungskurven des Betriebssystems und Desktopgrenzen umgangen und reine Rohdaten-Deltas (movementX / movementY) verarbeitet. In Kombination mit entkoppelter Fixed-Timestep-Physik ermöglicht dies latenzfreies Zielen bei 144Hz, 240Hz und 360Hz ohne Installation und ohne Speicherbelastung."
      }
    },
    {
      "@type": "Question",
      "name": "Was ist wichtiger: Fadenkreuz-Platzierung (Crosshair Placement) oder rohes Flick-Aiming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In taktischen Shootern entscheidet das proaktive Fadenkreuz-Platzieren (Vorzielen auf Kopfhöhe an Kanten vor dem Peeken) etwa 70% aller Duelle. Allerdings eröffnen unvorhersehbare gegnerische Off-Angles, weite Swings und unübersichtliche Retake-Situationen Momente, in denen kein Vorzielen möglich ist. In diesen verbleibenden 30% entscheidet die ballistische Flick-Präzision und Mikroadjustierungs-Geschwindigkeit unter 200ms über Sieg oder Niederlage."
      }
    },
    {
      "@type": "Question",
      "name": "Wie lange sollte man täglich Aim-Drills für optimalen Fortschritt trainieren?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Neurowissenschaftliche Studien zur motorischen Plastizität zeigen, dass nach etwa 30 bis 35 Minuten intensiven Zieltrainings neuromuskuläre Ermüdung einsetzt und die Lerneffizienz sinkt. Die ideale Routine besteht aus 15 bis 25 Minuten fokussiertem Training an 4 bis 6 Tagen pro Woche. Kurze, hochkonzentrierte Einheiten mit anschließendem erholsamem Schlaf fördern die Myelinisierung der Nervenbahnen und festigen das Muskelgedächtnis deutlich effektiver als mehrstündige Marathonsitzungen am Wochenende."
      }
    }
  ]
};

export default function GermanFPSHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FPSHubClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}

