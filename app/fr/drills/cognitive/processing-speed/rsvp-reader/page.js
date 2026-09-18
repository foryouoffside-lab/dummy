import RSVPReaderClient from '@/app/drills/cognitive/processing-speed/rsvp-reader/RSVPReaderClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Lecteur RSVP – Test de Vitesse de Lecture WPM | SkillDrills",
  description: "Lecteur RSVP et test de lecture rapide en ligne gratuit: Éliminez les saccades oculaires et entraînez votre vitesse de traitement lexical jusqu à 850 MPM.",
  keywords: [
    "lecteur rsvp",
    "lecture rapide en ligne",
    "test de vitesse de lecture",
    "présentation visuelle sérielle rapide",
    "test mots par minute wpm",
    "point de reconnaissance optimal orp",
    "entraînement lecture rapide gratuit",
    "traitement lexical visuel",
    "lecteur rsvp en ligne gratuit",
    "exercice de lecture rapide",
    "test compréhension de lecture",
    "vitesse de lecture test gratuit"
  ],
  openGraph: {
    title: "Lecteur RSVP – Test de Vitesse de Lecture WPM | SkillDrills",
    description: "Lecteur RSVP et test de lecture rapide en ligne gratuit: Éliminez les saccades oculaires et entraînez votre vitesse de traitement lexical jusqu à 850 MPM.",
    type: 'article',
    url: 'https://skilldrills.online/fr/drills/cognitive/processing-speed/rsvp-reader',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Lecteur RSVP – Test de Vitesse de Lecture WPM | SkillDrills",
    description: "Lecteur RSVP et test de lecture rapide en ligne gratuit: Éliminez les saccades oculaires et entraînez votre vitesse de traitement lexical jusqu à 850 MPM.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/cognitive/processing-speed/rsvp-reader',
    languages: getAlternateLanguages('/drills/cognitive/processing-speed/rsvp-reader'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://skilldrills.online/fr"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Exercices",
      "item": "https://skilldrills.online/fr/drills"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Cognitif",
      "item": "https://skilldrills.online/fr/drills/cognitive"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Lecteur RSVP",
      "item": "https://skilldrills.online/fr/drills/cognitive/processing-speed/rsvp-reader"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Lecteur RSVP – Test de Vitesse de Lecture WPM",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Lecteur RSVP et test de lecture rapide en ligne gratuit: Éliminez les saccades oculaires et entraînez votre vitesse de traitement lexical jusqu à 850 MPM.",
  "url": "https://skilldrills.online/fr/drills/cognitive/processing-speed/rsvp-reader",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online"
  },
  "inLanguage": "fr-FR",
  "dateModified": "2026-09-16"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Lecteur RSVP en Ligne",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Nécessite un navigateur moderne avec support JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/fr/drills/cognitive/processing-speed/rsvp-reader",
  "inLanguage": "fr-FR",
  "dateModified": "2026-09-16"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Entraînement de Lecture Rapide RSVP",
  "url": "https://skilldrills.online/fr/drills/cognitive/processing-speed/rsvp-reader",
  "description": "Lecteur RSVP et test de lecture rapide en ligne gratuit: Éliminez les saccades oculaires et entraînez votre vitesse de traitement lexical jusqu à 850 MPM.",
  "genre": [
    "Action",
    "Brain Game",
    "Cognitive Training"
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu'est-ce que le système RSVP (Présentation Visuelle Sérielle Rapide) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La méthode RSVP est un procédé d'affichage qui présente les mots successivement au même emplacement fixe, supprimant les saccades oculaires et les régressions."
      }
    },
    {
      "@type": "Question",
      "name": "Qu'est-ce que le Point de Reconnaissance Optimal (ORP) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L'ORP (Optimal Recognition Point) est la position précise au sein d'un mot (légèrement à gauche du centre) où la fovéa décode le terme le plus rapidement (Rayner, 1998)."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi la lecture conventionnelle sur papier est-elle plus lente ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dans la lecture classique, près de 80% du temps est mobilisé par les saccades oculaires (20 à 40ms) et les fixations, limitant la cadence à 200-250 mots par minute (Rayner, 2016)."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la cadence de lecture standard et le palier de lecture rapide ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La moyenne adulte se situe entre 200 et 250 mots par minute (MPM). Grâce au système RSVP, un lecteur entraîné peut progresser de 500 à 850 MPM avec une bonne mémorisation."
      }
    },
    {
      "@type": "Question",
      "name": "Conserve-t-on une bonne compréhension avec la lecture RSVP ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pour des textes descriptifs ou narratifs, la compréhension demeure constante jusqu'à 500-600 MPM. Au-delà de 800 MPM, un entraînement spécifique est nécessaire."
      }
    },
    {
      "@type": "Question",
      "name": "Comment la méthode RSVP permet-elle d'éliminer la subvocalisation ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La subvocalisation est la prononciation mentale des mots. En affichant les mots à une cadence supérieure à la parole (>350 MPM), le cerveau traite directement le concept sans voix intérieure."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle durée d'entraînement quotidien est préconisée ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Une pratique quotidienne de 10 à 15 minutes avec une augmentation graduelle de 50 MPM suffit pour stimuler la vitesse de reconnaissance sans fatigue visuelle."
      }
    },
    {
      "@type": "Question",
      "name": "Le lecteur RSVP est-il adapté aux écrans de smartphones ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, il est particulièrement adapté aux petits écrans mobiles car il supprime le besoin de zoomer ou de faire défiler le texte de gauche à droite."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi une lettre est-elle mise en valeur en rouge sur chaque mot ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La lettre colorée désigne le point ORP du mot, permettant au regard de se verrouiller instantanément sur le centre de décodage lexical optimal."
      }
    },
    {
      "@type": "Question",
      "name": "Ce test et ce lecteur RSVP sont-ils totalement gratuits ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, SkillDrills met à disposition cet outil en ligne entièrement gratuitement, sans inscription préalable ni logiciel à télécharger."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment S'entraîner avec le Lecteur RSVP",
  "description": "Lecteur RSVP et test de lecture rapide en ligne gratuit: Éliminez les saccades oculaires et entraînez votre vitesse de traitement lexical jusqu à 850 MPM.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Fixez le Point Focal Central",
      "text": "Gardez le regard détendu sur la mire centrale rouge sans bouger les yeux de gauche à droite.",
      "url": "https://skilldrills.online/fr/drills/cognitive/processing-speed/reaction-time#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Réglez la Vitesse Initiale (MPM)",
      "text": "Commencez par une cadence modérée (ex: 300 MPM) pour habituer votre cortex visuel au flux continu.",
      "url": "https://skilldrills.online/fr/drills/cognitive/processing-speed/reaction-time#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Supprimez la Prononciation Mentale",
      "text": "Ne prononcez pas les mots dans votre esprit: laissez le sens global des termes émerger directement.",
      "url": "https://skilldrills.online/fr/drills/cognitive/processing-speed/reaction-time#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Augmentez Progressivement la Cadence",
      "text": "Dès que vous êtes à l'aise, augmentez la vitesse par paliers de 50 MPM jusqu'à franchir le seuil des 600 MPM.",
      "url": "https://skilldrills.online/fr/drills/cognitive/processing-speed/reaction-time#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('rayner1998', 'rayner2016', 'woods2015'),
  intro: {
    title: "Neurosciences de la Lecture Rapide RSVP & Point de Reconnaissance Optimal (ORP)",
    paragraphs: [
      "La Présentation Visuelle Sérielle Rapide (RSVP - Rapid Serial Visual Presentation) est un paradigme expérimental des neurosciences cognitives visant à éliminer les contraintes motrices de l'appareil oculaire.",
      "Dans la lecture classique d'une page, 80% du temps global est absorbé par l'exécution de saccades de translation (20 à 40ms) et de fixations discontinues (200 à 250ms), souvent alourdies par des régressions d'inattention (Rayner, 1998, 2016).",
      "En présentant chaque mot exactement à l'emplacement de son Point de Reconnaissance Optimal (ORP), le protocole RSVP projette les unités lexicales au centre de la fovéa, propulsant le traitement d'information jusqu'à 850 mots par minute.",
    ],
  },
  benchmarks: {
    title: 'Standards de Vitesse de Lecture & Barèmes Cognitifs (MPM)',
    headers: ['Niveau', 'Catégorie', 'Vitesse de Lecture', 'Taux d Exactitude', 'Centile'],
    rows: [
      { tier: 'Tier 1', rank: 'Lecteur Rapide d Élite', stat: '650 – 850+ MPM', level: 'Maîtrise', accuracy: '95%+', percentile: 'Top 1%' },
      { tier: 'Tier 2', rank: 'Lecteur Avancé Rapide', stat: '450 – 649 MPM', level: 'Diamant', accuracy: '90-94%', percentile: 'Top 5%' },
      { tier: 'Tier 3', rank: 'Compétent Supérieur', stat: '300 – 449 MPM', level: 'Platine', accuracy: '85-89%', percentile: 'Top 15%' },
      { tier: 'Tier 4', rank: 'Moyenne Adulte Standard', stat: '200 – 299 MPM', level: 'Or', accuracy: '75-84%', percentile: 'Top 50%' },
      { tier: 'Tier 5', rank: 'Débutant / Lecture Lente', stat: '< 200 MPM', level: 'Argent', accuracy: '< 75%', percentile: 'Base' },
    ],
  },
  protocols: {
    title: 'Protocoles d Optimisation de la Vitesse de Lecture',
    description: 'Directives validées pour développer une assimilation textuelle ultra-rapide.',
    items: [
      { title: "Fixez le Point Focal Central", description: "Gardez le regard détendu sur la mire centrale rouge sans bouger les yeux de gauche à droite." },
      { title: "Réglez la Vitesse Initiale (MPM)", description: "Commencez par une cadence modérée (ex: 300 MPM) pour habituer votre cortex visuel au flux continu." },
      { title: "Supprimez la Prononciation Mentale", description: "Ne prononcez pas les mots dans votre esprit: laissez le sens global des termes émerger directement." },
      { title: "Augmentez Progressivement la Cadence", description: "Dès que vous êtes à l'aise, augmentez la vitesse par paliers de 50 MPM jusqu'à franchir le seuil des 600 MPM." },
    ],
  },
  faqs: {
    title: 'Foire Aux Questions (FAQ)',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function EnhancedPageFr() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
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
      <RSVPReaderClient copy={{ title: "Lecteur RSVP – Test de Vitesse de Lecture" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="https://skilldrills.online/fr/drills/cognitive/processing-speed/rsvp-reader" />
      </div>
    </>
  );
}
