import DrillsDirectoryClient from '@/app/drills/DrillsDirectoryClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

export const metadata = {
  title: 'Aim Trainer & Gehirntraining: 82 Übungen | SkillDrills',
  description: '82 wissenschaftliche Online-Drills in 8 Kategorien: Aim Trainer für Shooter, Reaktionstest, Gedächtnistraining, CPS & Sehschärfe direkt im Browser.',
  keywords: [
    'aim trainer kostenlos',
    'aim training online',
    'reaktionstest online kostenlos',
    'gehirntraining online spiele',
    'gedaechtnistraining kostenlos',
    'visuelle wahrnehmung trainieren',
    'cps test mausklicks',
    'flick aim uebungen',
    'tracking aim trainieren',
    'stroop test online deutsch',
    'schulte tabelle uebung',
    'arbeitsgedaechtnis trainieren online',
    'peripheres sehen uebungen',
    'hand auge koordination test',
    'sports vision training online'
  ],
  openGraph: {
    title: 'Aim Trainer & Gehirntraining: 82 Übungen | SkillDrills',
    description: '82 wissenschaftliche Online-Drills in 8 Kategorien: Aim Trainer für Shooter, Reaktionstest, Gedächtnistraining, CPS & Sehschärfe direkt im Browser.',
    type: 'website',
    url: 'https://skilldrills.online/de/drills',
    siteName: 'SkillDrills',
    locale: 'de_DE',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'SkillDrills Gesamtkatalog aller 82 Trainingsübungen',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aim Trainer & Gehirntraining: 82 Übungen | SkillDrills',
    description: '82 wissenschaftliche Online-Drills für Aiming, Reaktionszeit, Kognition und Sehschärfe.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills',
    languages: getAlternateLanguages('/de/drills'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Startseite",
      "item": "https://skilldrills.online/de"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Alle Trainingsübungen",
      "item": "https://skilldrills.online/de/drills"
    }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "SkillDrills Gesamtkatalog aller 82 Trainingsübungen",
  "description": "Umfassende wissenschaftliche Sammlung von 82 interaktiven Leistungsdrills für FPS-Aiming, Reaktionsgeschwindigkeit, visuelle Nachverfolgung, Kognition, Gedächtnis, Feinmotorik, Ausdauer und dynamisches Sehen.",
  "url": "https://skilldrills.online/de/drills",
  "inLanguage": "de",
  "hasPart": DRILLS.map((drill) => {
    const loc = getLocalizedDrill(drill.href, 'de', drill.name);
    return {
      "@type": "WebApplication",
      "name": loc.name,
      "url": `https://skilldrills.online/de${drill.href}`,
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "All",
      "browserRequirements": "Benötigt JavaScript und HTML5 Canvas-Unterstützung",
      "description": loc.tagline || drill.description,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR"
      }
    };
  })
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Welche wissenschaftlichen Prinzipien liegen den 82 SkillDrills-Trainingsübungen zugrunde?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SkillDrills basiert auf etablierten Modellen der kognitiven Psychologie und motorischen Neurobiologie, darunter das Fitts'sche Gesetz (Geschwindigkeits-Genauigkeits-Abwägung), das Hick'sche Gesetz (Reaktionszeit bei Mehrfachwahl), okulomotorische Sakkaden- und Blickfolgemodelle sowie die Theorie der neuronalen Plastizität. Jede Übung isoliert spezifische sensorimotorische Signalwege zur gezielten Leistungssteigerung."
      }
    },
    {
      "@type": "Question",
      "name": "Wie berechnet SkillDrills Latenz und Reaktionszeit im Webbrowser ohne Verzögerung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Plattform nutzt die hochpräzise Browser-API performance.now(), die Zeitstempel im Sub-Millisekunden-Bereich (Mikrosekundengenauigkeit) liefert. Visuelle Stimuli und Benutzereingaben werden direkt über hardwarebeschleunigte Canvas-Rendering-Schleifen (requestAnimationFrame) und die Pointer Lock API ohne Render-Queues verarbeitet."
      }
    },
    {
      "@type": "Question",
      "name": "Wie sollte ich mein tägliches Training aufbauen, um maximale Fortschritte zu erzielen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Empfohlen wird ein strukturiertes 15- bis 20-minütiges Trainingsprotokoll vor Gaming-Sessions oder kognitiver Arbeit: Beginnen Sie mit 5 Minuten okulomotorischem Aufwärmen (Blickverfolgung), gefolgt von 10 Minuten isoliertem Präzisionstraining (Flick-Aiming oder Klick-Timing) und schließen Sie mit 5 Minuten kognitiver Reizunterdrückung ab. Regelmäßigkeit ist entscheidend für die synaptische Konsolidierung."
      }
    },
    {
      "@type": "Question",
      "name": "Unterstützt SkillDrills das Aim-Training für kompetitive Shooter wie CS2, VALORANT und Apex Legends?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Die FPS-Kategorie umfasst spezialisierte Module für Micro-Adjustments, Target-Switching, Fadenkreuzstabilität, Vorhaltemaß (Angle Holding) und dynamische Rückstoßkontrolle. Durch standardisierte Sensitivitätsanpassungen und RAW-Mausabfrage über die Pointer Lock API werden Muskelgedächtnis und Mikromotorik 1:1 auf kompetitive Shooter übertragen."
      }
    },
    {
      "@type": "Question",
      "name": "Was unterscheidet SkillDrills von klassischen Gehirnjogging- oder Casual-Gaming-Seiten?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Im Gegensatz zu rein unterhaltenden Gelegenheitsspielen bietet SkillDrills empirisch validierte neuropsychologische Testparadigmen (wie N-Back, Stroop-Interferenz, Schulte-Gitter und Posner-Cueing) mit metrischer Auswertung. Nutzer erhalten detaillierte Perzentil-Benchmarks und physiologische Verteilungsdaten im Vergleich zu globalen Leistungsprofilen."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Auswirkung hat die Bildwiederholfrequenz meines Monitors auf die Messergebnisse?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein 60-Hz-Monitor weist ein Frame-Intervall von ca. 16,6 ms auf, während 144 Hz (6,9 ms), 240 Hz (4,1 ms) oder 360 Hz (2,7 ms) die Quantisierungslatenz von Bildausgabe und Eingabeerfassung drastisch verringern. SkillDrills synchronisiert Messungen direkt mit der nativen Bildwiederholrate Ihres Bildschirms, um hardwarebedingte Messartefakte zu minimieren."
      }
    },
    {
      "@type": "Question",
      "name": "Werden für die Nutzung von SkillDrills Downloads, Installationen oder Registrierungen benötigt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nein. Sämtliche 82 Trainingsübungen sind als reine Web-Applikationen konzipiert und laufen vollständig clientseitig im Webbrowser. Es werden weder zusätzliche Plugins noch Registrierungen benötigt. Leistungsdaten und persönliche Rekorde werden lokal im Browser gespeichert, wodurch vollständiger Datenschutz gewährleistet ist."
      }
    },
    {
      "@type": "Question",
      "name": "Können die Übungen auch auf Tablets und Smartphones durchgeführt werden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kognitive Drills, Reaktionszeittests, Farb- und Gedächtnisspiele sind vollständig touch-kompatibel und auf mobilen Geräten nutzbar. Für FPS-Aim-Drills, Mikro-Mauskontrolle und Tastatur-Präzisionsübungen wird jedoch ein Desktop-Computer mit physischer Maus und stabiler Unterlage empfohlen, um kinästhetische Verfälschungen zu vermeiden."
      }
    }
  ]
};

export default function LocalizedDirectoryPage() {
  const faqs = faqSchema.mainEntity.map((item) => ({
    q: item.name,
    a: item.acceptedAnswer.text,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DrillsDirectoryClient faqs={faqs} />
    </>
  );
}

