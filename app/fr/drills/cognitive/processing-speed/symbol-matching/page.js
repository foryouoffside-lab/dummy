import SymbolMatchingClient from '@/app/drills/cognitive/processing-speed/symbol-matching/SymbolMatchingClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test SDMT – Symboles et Chiffres en Ligne | SkillDrills",
  description: "Test SDMT en ligne gratuit: Évaluez votre vitesse de traitement cognitif, votre balayage visuel et votre mémoire associative de travail sans inscription.",
  keywords: [
    "test symboles et chiffres",
    "test sdmt en ligne",
    "vitesse de traitement cognitif test",
    "substitution symboles chiffres",
    "test dsst en ligne",
    "balayage visuel cognitif",
    "memoire associative test",
    "agilite mentale test gratuit",
    "evaluation neuropsychologique gratuite",
    "test attention et rapidite",
    "exercice appariement de symboles",
    "test cognitif de symboles"
  ],
  openGraph: {
    title: "Test SDMT – Symboles et Chiffres en Ligne | SkillDrills",
    description: "Test SDMT en ligne gratuit: Évaluez votre vitesse de traitement cognitif, votre balayage visuel et votre mémoire associative de travail sans inscription.",
    type: 'article',
    url: 'https://skilldrills.online/fr/drills/cognitive/processing-speed/symbol-matching',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test SDMT – Symboles et Chiffres en Ligne | SkillDrills",
    description: "Test SDMT en ligne gratuit: Évaluez votre vitesse de traitement cognitif, votre balayage visuel et votre mémoire associative de travail sans inscription.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/cognitive/processing-speed/symbol-matching',
    languages: getAlternateLanguages('/drills/cognitive/processing-speed/symbol-matching'),
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
      "name": "Test SDMT Symboles",
      "item": "https://skilldrills.online/fr/drills/cognitive/processing-speed/symbol-matching"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test SDMT – Symboles et Chiffres",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Test SDMT en ligne gratuit: Évaluez votre vitesse de traitement cognitif, votre balayage visuel et votre mémoire associative de travail sans inscription.",
  "url": "https://skilldrills.online/fr/drills/cognitive/processing-speed/symbol-matching",
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
  "name": "Test SDMT en Ligne",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Nécessite un navigateur moderne avec support JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/fr/drills/cognitive/processing-speed/symbol-matching",
  "inLanguage": "fr-FR",
  "dateModified": "2026-09-16"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Jeu d Appariement Symboles et Chiffres",
  "url": "https://skilldrills.online/fr/drills/cognitive/processing-speed/symbol-matching",
  "description": "Test SDMT en ligne gratuit: Évaluez votre vitesse de traitement cognitif, votre balayage visuel et votre mémoire associative de travail sans inscription.",
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
      "name": "Qu'est-ce que le test SDMT (Symbol Digit Modalities Test) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le SDMT est un test neuropsychologique standardisé créé par Aaron Smith (1973) pour mesurer la vitesse de traitement cérébral de l'information et le balayage visuel."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la différence entre le test SDMT et le DSST ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dans le DSST (Wechsler), les symboles sont écrits à la main. Dans le SDMT, on sélectionne des chiffres associés à des symboles, isolant la vitesse cognitive sans biais graphique."
      }
    },
    {
      "@type": "Question",
      "name": "Quelles fonctions cognitives sont mesurées dans cet exercice ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La vitesse de traitement perceptuel, l'efficacité de balayage oculaire, la mémoire de travail associative et l'attention exécutive soutenue."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi le SDMT est-il une référence clinique majeure ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En raison de sa grande sensibilité pour détecter les variations dans l'intégrité de la substance blanche cérébrale et la fatigue mentale centrale."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le rôle de la mémoire de travail dans la performance ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En mémorisant les paires symbole-chiffre, le sujet n'a plus besoin de vérifier la grille de référence à chaque essai, décuplant sa cadence de frappe."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi ressent-on une forte fatigue mentale pendant le test ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L'exigence ininterrompue d'encodage visuel et de décision motrice sollicite continuellement les cortex pariétaux, visuels et préfrontaux."
      }
    },
    {
      "@type": "Question",
      "name": "En quoi cet exercice bénéficie-t-il aux joueurs compétitifs ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Il accélère l'identification des indicateurs d'interface et des symboles tactiques sous pression temporelle stricte."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle durée d'entraînement quotidien est recommandée ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Une session de 5 à 10 minutes par jour est idéale pour développer la plasticité associative sans provoquer de saturation cognitive."
      }
    },
    {
      "@type": "Question",
      "name": "La vitesse de traitement décline-t-elle avec l'âge ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, un ralentissement progressif survient à partir de 30 ans (Der & Deary, 2006), mais une stimulation cognitive ciblée aide à préserver cette vivacité."
      }
    },
    {
      "@type": "Question",
      "name": "Ce test de symboles et chiffres est-il gratuit ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, SkillDrills met cet outil à disposition gratuitement sur le web, sans inscription ni téléchargement."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment Réaliser le Test SDMT d Appariement",
  "description": "Test SDMT en ligne gratuit: Évaluez votre vitesse de traitement cognitif, votre balayage visuel et votre mémoire associative de travail sans inscription.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Consultez la Légende Supérieure",
      "text": "Examinez la table de correspondance qui associe chaque symbole géométrique à un chiffre de 1 à 9.",
      "url": "https://skilldrills.online/fr/drills/cognitive/processing-speed/symbol-matching#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Identifiez le Symbole Cible",
      "text": "Observez le symbole affiché au centre et déterminez le chiffre correspondant dans la grille.",
      "url": "https://skilldrills.online/fr/drills/cognitive/processing-speed/symbol-matching#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Saisissez le Chiffre Associé",
      "text": "Appuyez sur la touche numérique ou le bouton correspondant le plus vite possible sans erreur.",
      "url": "https://skilldrills.online/fr/drills/cognitive/processing-speed/symbol-matching#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Mémorisez les Associations",
      "text": "En retenant les paires de mémoire, répondez instantanément sans revenir à la grille de référence.",
      "url": "https://skilldrills.online/fr/drills/cognitive/processing-speed/symbol-matching#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('smith1973', 'der2006', 'woods2015'),
  intro: {
    title: "Neurosciences du Test SDMT & Vitesse de Traitement de l Information",
    paragraphs: [
      "Le Test des Modalités des Chiffres et des Symboles (SDMT - Symbol Digit Modalities Test) est un instrument neuropsychologique de référence pour mesurer la célérité cognitive cérébrale (Smith, 1973).",
      "Contrairement aux tests papier DSST, la version numérique standardisée neutralise les variations de motricité fine pour isoler la vitesse de décodage perceptif corticale pure.",
      "La tâche mobilise en temps réel la reconnaissance géométrique occipitale, le balayage visuo-spatial pariétal et la mémoire de travail préfrontale (Der & Deary, 2006; Woods et al., 2015).",
    ],
  },
  benchmarks: {
    title: 'Standards de Performance Cognitive & Échelle du Test SDMT',
    headers: ['Niveau', 'Rang', 'Efficacité', 'Exactitude', 'Centile'],
    rows: [
      { tier: 'Tier 1', rank: 'Grand Maître / Élite', stat: 'Top 1%', level: 'Maîtrise', accuracy: '98%+', percentile: 'Top 1%' },
      { tier: 'Tier 2', rank: 'Focus Avancé', stat: 'Top 5%', level: 'Diamant', accuracy: '94-97%', percentile: 'Top 5%' },
      { tier: 'Tier 3', rank: 'Opérateur Compétent', stat: 'Top 15%', level: 'Platine', accuracy: '88-93%', percentile: 'Top 15%' },
      { tier: 'Tier 4', rank: 'Moyenne Adulte Standard', stat: 'Top 50%', level: 'Or', accuracy: '78-87%', percentile: 'Top 50%' },
      { tier: 'Tier 5', rank: 'Niveau d Initiation', stat: 'Base', level: 'Argent', accuracy: '< 78%', percentile: 'Base' },
    ],
  },
  protocols: {
    title: 'Protocoles d Entraînement Neuroplastique',
    description: 'Directives validées pour maximiser la vitesse d exploration visuelle et l appariement mental.',
    items: [
      { title: "Consultez la Légende Supérieure", description: "Examinez la table de correspondance qui associe chaque symbole géométrique à un chiffre de 1 à 9." },
      { title: "Identifiez le Symbole Cible", description: "Observez le symbole affiché au centre et déterminez le chiffre correspondant dans la grille." },
      { title: "Saisissez le Chiffre Associé", description: "Appuyez sur la touche numérique ou le bouton correspondant le plus vite possible sans erreur." },
      { title: "Mémorisez les Associations", description: "En retenant les paires de mémoire, répondez instantanément sans revenir à la grille de référence." },
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
      <SymbolMatchingClient copy={{ title: "Test SDMT Symboles et Chiffres" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="https://skilldrills.online/fr/drills/cognitive/processing-speed/symbol-matching" />
      </div>
    </>
  );
}
