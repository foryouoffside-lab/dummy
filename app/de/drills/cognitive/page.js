import CognitiveHubClient from '@/app/drills/cognitive/CognitiveHubClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const cognitiveDrills = DRILLS.filter((d) => d.category === 'cognitive');

export const metadata = {
  title: 'Gehirntraining & Kognitives Training Kostenlos | SkillDrills',
  description: 'Kostenloses Gehirntraining & kognitives Training online. 8 wissenschaftliche Drills für Konzentration, Verarbeitungsgeschwindigkeit & Schulte-Gitter.',
  keywords: [
    'Gehirntraining kostenlos online', 'Kognitives Training online', 'Konzentrationstraining online',
    'Aufmerksamkeitstraining PC', 'Verarbeitungsgeschwindigkeit Test', 'Stroop Test online kostenlos',
    'Schulte Tabelle online', 'Geteiltes Aufmerksamkeit Training', 'Arbeitsgedächtnis trainieren',
    'Exekutive Funktionen stärken', 'Gehirnjogging Übungen kostenlos', 'Multitasking Fähigkeit testen',
    'Mentale Agilität Training', 'Esports Kognitionstraining', 'Demenz Vorbeugung Gehirntraining'
  ],
  openGraph: {
    title: 'Gehirntraining & Kognitives Training Kostenlos | SkillDrills',
    description: 'Kostenloses Gehirntraining & kognitives Training online. 8 wissenschaftliche Drills für Konzentration, Verarbeitungsgeschwindigkeit & Schulte-Gitter.',
    type: 'website',
    url: 'https://skilldrills.online/de/drills/cognitive',
    siteName: 'SkillDrills',
    locale: 'de_DE',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Kostenloses Gehirntraining & Kognitive Übungen Übersicht' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gehirntraining & Kognitives Training Kostenlos | SkillDrills',
    description: 'Konzentration, Stroop-Effekt, Verarbeitungsgeschwindigkeit und Schulte-Tabellen: 8 wissenschaftliche Drills kostenlos im Browser.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/cognitive',
    languages: getAlternateLanguages('/de/drills/cognitive'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/de" },
    { "@type": "ListItem", "position": 2, "name": "Alle Trainingsdrills", "item": "https://skilldrills.online/de/drills" },
    { "@type": "ListItem", "position": 3, "name": "Gehirntraining & Kognition", "item": "https://skilldrills.online/de/drills/cognitive" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Kostenloses Gehirntraining & Kognitive Übungen (8 Drills)",
  "url": "https://skilldrills.online/de/drills/cognitive",
  "description": "8 wissenschaftliche Drills für selektive Aufmerksamkeit, Arbeitsgedächtnis, Stroop-Interferenz, visuelle Verarbeitungsgeschwindigkeit und Schulte-Tabellen.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": cognitiveDrills.map((drill) => {
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
      "name": "Was versteht man unter kognitivem Training und welche neurobiologischen Prozesse werden aktiviert?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kognitives Training umfasst strukturierte mentale Übungen zur Stärkung der im präfrontalen Kortex verankerten exekutiven Funktionen. Im Gegensatz zum Auswendiglernen von Fakten beanspruchen diese Drills fundamentale neuronale Mechanismen: selektive Aufmerksamkeit, Arbeitsgedächtniskapazität, kognitive Flexibilität (Aufgabenwechsel) und Verarbeitungsgeschwindigkeit. Durch wiederholte Beanspruchung des frontoparietalen Kontrollnetzwerks wird die Neuroplastizität gefördert und die synaptische Signalübertragung nachhaltig optimiert."
      }
    },
    {
      "@type": "Question",
      "name": "Können gezielte Gehirntraining-Übungen die visuelle Verarbeitungsgeschwindigkeit messbar beschleunigen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, zeitkritische visuelle Diskriminationsübungen verkürzen die Latenz in den visuomotorischen Schleifen zwischen primärem visuellen Kortex, parietalem Assoziationskortex und motorischen Arealen. Regelmäßiges Training verringert synaptisches Zögern bei Entscheidungen und optimiert das Top-Down-Filtern von Sinnesreizen. Dies führt dazu, dass Reize um 15 bis 30 % schneller identifiziert und in präzise motorische Aktionen umgesetzt werden – ohne Einbußen bei der Treffergenauigkeit."
      }
    },
    {
      "@type": "Question",
      "name": "Worin liegt der Unterschied zwischen fokussierter Daueraufmerksamkeit und geteilter Aufmerksamkeit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fokussierte Daueraufmerksamkeit (Vigilanz) beschreibt die Fähigkeit des Locus-Coeruleus-Noradrenalin-Systems und des präfrontalen Kortex, die Konzentration über lange Zeiträume auf eine einzige Aufgabe zu richten und innere wie äußere Ablenkungen zu unterdrücken. Geteilte Aufmerksamkeit (Dual-Tasking) hingegen beansprucht die frontoparietalen Aufmerksamkeitsnetzwerke, um kognitive Ressourcen parallel auf mehrere konkurrierende Informationsströme zu verteilen oder blitzschnell zwischen ihnen zu wechseln."
      }
    },
    {
      "@type": "Question",
      "name": "Was ist der Stroop-Effekt und wie wird damit die exekutive Hemmungskontrolle (Inhibition) gemessen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der Stroop-Effekt demonstriert den Konflikt zwischen automatisierter Reizverarbeitung (Wortlesen) und bewusster exekutiver Steuerung (Benennen der Schriftfarbe). Steht beispielsweise das Wort 'Rot' in blauer Farbe geschrieben, registriert der anteriore cinguläre Kortex (ACC) einen Konflikt, woraufhin der dorsolaterale präfrontale Kortex (DLPFC) den automatischen Lesereflex unterdrücken muss. Die gemessene Interferenzzeit dient der Neurowissenschaft als exakter Indikator für inhibitorische Impulskontrolle und kognitive Flexibilität."
      }
    },
    {
      "@type": "Question",
      "name": "Wie trainiert das Schulte-Tabellen-Gitter das periphere Sehen und die visuelle Suchgeschwindigkeit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Schulte-Tabelle ist ein 5x5-Zahlengitter, das ursprünglich in der Flugpsychologie zur Messung der visuellen Suchleistung entwickelt wurde. Während der Blick starr auf das Zentrum fixiert bleibt, sucht das Auge die Zahlen 1 bis 25 in aufsteigender Reihenfolge rein über das periphere Gesichtsfeld. Dieses Training erweitert den nutzbaren parafovealen Wahrnehmungsradius, wodurch die Anzahl notwendiger Blicksprünge (Sakkaden) drastisch reduziert und das Erfassen relevanter Bildschirminformationen beschleunigt wird."
      }
    },
    {
      "@type": "Question",
      "name": "Lassen sich die Trainingserfolge aus kognitiven Drills auf Gaming und berufliche Alltagsleistungen übertragen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die kognitive Neurowissenschaft unterscheidet klar zwischen Nah-Transfer und Fern-Transfer. Gezielte Drills erzeugen einen belegten 'Nah-Transfer': Fähigkeiten wie visuelle Suchgeschwindigkeit, Distraktor-Unterdrückung und Stroop-Hemmung verbessern sich direkt messbar und übertragen sich unmittelbar auf das Lesen von Mini-Maps in Games, fehlerfreies Multitasking im Beruf und schnelle Entscheidungsfindung unter Stress. Ein allgemeiner 'Fern-Transfer' auf den Gesamt-IQ ist wissenschaftlich nicht belegt."
      }
    },
    {
      "@type": "Question",
      "name": "Wie oft und wie lange sollte man Gehirntraining durchführen, um kognitive Ermüdung zu vermeiden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Da intensive exekutive Aufgaben erhebliche Mengen neuronaler Glukose verbrauchen, liegt das wissenschaftliche Optimum bei 10 bis 15 Minuten pro Tag, 3 bis 5 Mal pro Woche. Ein Training von über 20 Minuten führt häufig zu zentralnervöser Erschöpfung (Mental Fatigue), wodurch die Fehlerquote ansteigt und der neuroplastische Lerneffekt abflacht. Kurze, hochfokussierte Intervalle mit anschließenden Erholungsphasen bringen den maximalen Nutzen."
      }
    },
    {
      "@type": "Question",
      "name": "Hilft kognitives Training Erwachsenen mit Konzentrationsschwächen (ADHS) und zur Prävention von Demenz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, Drills zur Hemmungskontrolle und Aufmerksamkeitslenkung aktivieren dopaminerge und noradrenerge Signalwege und werden erfolgreich als ergänzende, nicht-medikamentöse Maßnahme bei ADHS-Symptomen im Erwachsenenalter eingesetzt. Zudem stärkt das regelmäßige Training von Arbeitsgedächtnis und Verarbeitungsgeschwindigkeit die sogenannte kognitive Reserve (Cognitive Reserve) des Gehirns, was maßgeblich zum Schutz vor altersbedingtem mentalen Abbau und Demenzerkrankungen beiträgt."
      }
    }
  ]
};

export default function LocalizedCognitiveHubClientPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CognitiveHubClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}
