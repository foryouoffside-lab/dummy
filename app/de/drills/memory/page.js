import MemoryClient from '@/app/drills/memory/MemoryClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const memoryDrills = DRILLS.filter((d) => d.category === 'memory');

export const metadata = {
  title: 'Gedächtnistraining & Arbeitsgedächtnis Test | SkillDrills',
  description: 'Kostenloses Gedächtnistraining online. 7 wissenschaftliche Drills für Arbeitsgedächtnis (N-Back), Zahlenspanne, Kurzzeitgedächtnis & räumliches Erinnern.',
  keywords: [
    'Gedächtnistraining kostenlos online', 'Arbeitsgedächtnis trainieren', 'Kurzzeitgedächtnis Test online',
    'Zahlenspanne Test online', 'N-Back Training kostenlos', 'Räumliches Gedächtnis trainieren',
    'Gehirnjogging Gedächtnis Übungen', 'Visuelles Gedächtnis Test', 'Gitter Gedächtnistest',
    'Merkfähigkeit verbessern Übungen', 'Chunking Methode Gedächtnis', 'Vergesslichkeit im Alter vorbeugen',
    'Konzentration und Merkfähigkeit steigern', 'Demenz Prävention Gehirntraining', 'Esports Map Awareness Raumgedächtnis'
  ],
  openGraph: {
    title: 'Gedächtnistraining & Arbeitsgedächtnis Test | SkillDrills',
    description: 'Kostenloses Gedächtnistraining online. 7 wissenschaftliche Drills für Arbeitsgedächtnis (N-Back), Zahlenspanne, Kurzzeitgedächtnis & räumliches Erinnern.',
    type: 'website',
    url: 'https://skilldrills.online/de/drills/memory',
    siteName: 'SkillDrills',
    locale: 'de_DE',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Kostenloses Gedächtnistraining & Arbeitsgedächtnis Drills Übersicht' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gedächtnistraining & Arbeitsgedächtnis Test | SkillDrills',
    description: 'Arbeitsgedächtnis (N-Back), Zahlenspanne, Kurzzeitgedächtnis und Raumorientierung: 7 wissenschaftliche Drills kostenlos im Browser.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/memory',
    languages: getAlternateLanguages('/de/drills/memory'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/de" },
    { "@type": "ListItem", "position": 2, "name": "Alle Trainingsdrills", "item": "https://skilldrills.online/de/drills" },
    { "@type": "ListItem", "position": 3, "name": "Gedächtnis & Arbeitsgedächtnis", "item": "https://skilldrills.online/de/drills/memory" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Kostenloses Gedächtnistraining & Merkfähigkeit (7 Drills)",
  "url": "https://skilldrills.online/de/drills/memory",
  "description": "7 wissenschaftliche Übungen für Arbeitsgedächtnis (N-Back), Zahlenspanne, Kurzzeitgedächtnis und räumliches Vorstellungsvermögen.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": memoryDrills.map((drill) => {
    const loc = getLocalizedDrill(drill.href, 'de', drill.name);
    return {
      "@type": "WebApplication",
      "name": loc.name,
      "url": `https://skilldrills.online/de${drill.href}`,
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5 Canvas.",
      "description": loc.tagline || drill.description,
    };
  })
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was unterscheidet das Kurzzeitgedächtnis vom Arbeitsgedächtnis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Das Kurzzeitgedächtnis dient als passiver Zwischenspeicher, der geringe Informationsmengen für etwa 15 bis 30 Sekunden unverändert bereithält. Das Arbeitsgedächtnis hingegen – gesteuert durch den präfrontalen Kortex und das Modell von Alan Baddeley – ist eine aktive mentale Werkbank. Hier werden Daten nicht nur gehalten, sondern gleichzeitig verarbeitet, aktualisiert und für logische Schlussfolgerungen, Kopfrechnen oder strategische Entscheidungen im Gaming herangezogen."
      }
    },
    {
      "@type": "Question",
      "name": "Steigert N-Back-Training tatsächlich die fluide Intelligenz und Merkspanne?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Zahlreiche kognitionsneurowissenschaftliche Studien belegen, dass adaptives N-Back- und Dual-N-Back-Training das frontoparietale Kontrollnetzwerk nachhaltig stärkt. Das kontinuierliche Aktualisieren von Zielreizen bei gleichzeitiger Hemmung veralteter Störreize erweitert die Arbeitsgedächtniskapazität und zeigt signifikante Transfereffekte auf die fluide Intelligenz (Gf) sowie die analytische Problemlösekompetenz."
      }
    },
    {
      "@type": "Question",
      "name": "Was ist eine normale Zahlenspanne (Digit Span) und wie lässt sie sich steigern?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nach dem Millerschen Gesetz (Miller's Law) liegt die durchschnittliche Vorwärts-Zahlenspanne gesunder Erwachsener bei 7 ± 2 Ziffern, während die anspruchsvollere Rückwärts-Spanne im Schnitt 5 ± 1 Ziffern umfasst. Ohne Strukturierung fasst das Arbeitsgedächtnis rund 4 Informationseinheiten. Durch die Anwendung von Chunking (das rhythmische Gruppieren von Zahlen in 3er- oder 4er-Blöcke) lässt sich das phonologische Rehearsal-System gezielt optimieren und die Merkspanne verdoppeln."
      }
    },
    {
      "@type": "Question",
      "name": "Wie übertragen sich räumliche Gedächtnisübungen auf Alltag und Gaming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Räumliche Gedächtnisübungen aktivieren den Hippocampus, den parietalen Kortex und den visuell-räumlichen Notizblock. Das Merken dynamischer Gittermuster und das Nachverfolgen mehrschrittiger Pfade schärft die Orientierungsfähigkeit im Raum, das mentale Rotieren dreidimensionaler Objekte sowie die blitzschnelle Erfassung der Minikarte und gegnerischer Laufwege in kompetitiven Esports-Titeln."
      }
    },
    {
      "@type": "Question",
      "name": "Was bedeutet Chunking in der Kognitionspsychologie und wie funktioniert es?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chunking bezeichnet die strategische Organisation isolierter Einzeldaten zu bedeutungsvollen, strukturierten Einheiten. Da das menschliche Arbeitsgedächtnis durch die Anzahl aktiver Speicherplätze limitiert ist – nicht durch die Informationsdichte pro Platz –, erlaubt das Chunking, komplexe Zeichenketten oder Zahlenreihen (wie Postleitzahlen, Telefonnummern oder IP-Adressen) als kompakte Einheiten abzuspeichern, ohne die exekutive Kapazität zu überlasten."
      }
    },
    {
      "@type": "Question",
      "name": "Kann tägliches Gedächtnistraining dem geistigen Abbau im Alter vorbeugen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Systematisches kognitives Training regt die neuronale Plastizität an und fördert die synaptische Verzweigung im Hippocampus. Dies trägt zum Aufbau der sogenannten kognitiven Reserve bei. Ein Gehirn mit hoher kognitiver Reserve kann altersbedingte degenerative Prozesse und Verlangsamungen wesentlich besser kompensieren und die geistige Selbstständigkeit bis ins hohe Alter bewahren."
      }
    },
    {
      "@type": "Question",
      "name": "Wie viel Gedächtnistraining pro Tag ist für optimale Ergebnisse empfehlenswert?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Empfohlen wird ein gezieltes Training von 15 bis 20 Minuten an 3 bis 5 Tagen pro Woche. Da intensive Arbeitsgedächtnisaufgaben die neuronalen Glukosereserven rasch beanspruchen, sinkt die Effizienz nach mehr als 25 Minuten kontinuierlicher Belastung. Kurze, fordernde Übungseinheiten in Kombination mit erholsamem Tiefschlaf garantieren eine stabile synaptische Konsolidierung des Gelernten."
      }
    },
    {
      "@type": "Question",
      "name": "Wie präzise und wissenschaftlich fundiert sind browserbasierte Gedächtnistests?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Drills auf SkillDrills basieren auf international etablierten neuropsychologischen Testparadigmen wie dem Wechsler-Zahlennachsprechen (Digit Span), dem Corsi-Block-Tapping-Test und dem Kirby-N-Back-Verfahren. Durch die präzise Taktung im Browser auf Millisekunden-Ebene wird eine Messgenauigkeit erreicht, die professionellen Testlaboren entspricht – völlig kostenfrei und ohne Installation."
      }
    }
  ]
};

export default function LocalizedMemoryClientPage() {
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
      <MemoryClient faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))} />
    </>
  );
}

