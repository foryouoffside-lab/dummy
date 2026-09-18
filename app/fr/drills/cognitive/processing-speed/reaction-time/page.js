import EliteNeuroSwitchClient from '@/app/drills/cognitive/processing-speed/reaction-time/EliteNeuroSwitchClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test de Temps de Réaction de Choix – CRT | SkillDrills",
  description: "Test de temps de réaction de choix en ligne gratuit: Mesurez votre vitesse de décision, discrimination visuelle et flexibilité cognitive sans inscription.",
  keywords: [
    "test temps de reaction",
    "temps de reaction de choix",
    "test temps de reaction en ligne",
    "loi de hick test",
    "vitesse de prise de decision test",
    "vitesse de traitement cognitif",
    "test discrimination visuelle",
    "entraînement réflexe cognitif",
    "temps de réaction simple vs choix",
    "test agilité mentale gratuit",
    "exercice prise de décision rapide",
    "test neurocognitif temps de reaction"
  ],
  openGraph: {
    title: "Test de Temps de Réaction de Choix – CRT | SkillDrills",
    description: "Test de temps de réaction de choix en ligne gratuit: Mesurez votre vitesse de décision, discrimination visuelle et flexibilité cognitive sans inscription.",
    type: 'article',
    url: 'https://skilldrills.online/fr/drills/cognitive/processing-speed/reaction-time',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test de Temps de Réaction de Choix – CRT | SkillDrills",
    description: "Test de temps de réaction de choix en ligne gratuit: Mesurez votre vitesse de décision, discrimination visuelle et flexibilité cognitive sans inscription.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/cognitive/processing-speed/reaction-time',
    languages: getAlternateLanguages('/drills/cognitive/processing-speed/reaction-time'),
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
      "name": "Temps de Réaction de Choix",
      "item": "https://skilldrills.online/fr/drills/cognitive/processing-speed/reaction-time"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test de Temps de Réaction de Choix – CRT",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Test de temps de réaction de choix en ligne gratuit: Mesurez votre vitesse de décision, discrimination visuelle et flexibilité cognitive sans inscription.",
  "url": "https://skilldrills.online/fr/drills/cognitive/processing-speed/reaction-time",
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
  "name": "Test de Temps de Réaction de Choix",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Nécessite un navigateur moderne avec support JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/fr/drills/cognitive/processing-speed/reaction-time",
  "inLanguage": "fr-FR",
  "dateModified": "2026-09-16"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Test de Temps de Réaction de Choix – Jeu Cérébral",
  "url": "https://skilldrills.online/fr/drills/cognitive/processing-speed/reaction-time",
  "description": "Test de temps de réaction de choix en ligne gratuit: Mesurez votre vitesse de décision, discrimination visuelle et flexibilité cognitive sans inscription.",
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
      "name": "Qu'est-ce que le temps de réaction de choix (CRT) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le temps de réaction de choix est le délai nécessaire pour identifier un stimulus spécifique parmi plusieurs options et exécuter l'action motrice correspondante."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la différence entre temps simple et de choix ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le temps simple (SRT, ~200ms) réagit à un signal unique prévu. Le temps de choix (CRT, ~280-350ms) incorpore une délibération corticale et une discrimination visuelle (Donders, 1868)."
      }
    },
    {
      "@type": "Question",
      "name": "Que décrit la loi de Hick (Hick, 1952) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La loi de Hick stipule que le temps de réaction augmente de manière logarithmique en fonction du nombre d'alternatives disponibles : RT = a + b * log2(n)."
      }
    },
    {
      "@type": "Question",
      "name": "Quelles sont les valeurs moyennes observées chez l'être humain ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La moyenne générale se situe entre 280ms et 350ms. Les athlètes professionnels et joueurs esport de haut niveau atteignent 180ms à 230ms (Der & Deary, 2006)."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi les règles de couleur changent-elles en cours de session ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L'inversion dynamique des règles sollicite le cortex préfrontal pour reconfigurer la tâche et supprimer les réflexes moteurs obsolètes."
      }
    },
    {
      "@type": "Question",
      "name": "Peut-on améliorer sa vitesse de décision avec l'entraînement ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. Une pratique répétée consolide les connexions synaptiques, accélère le décodage sensoriel et réduit les latences d'hésitation motrice."
      }
    },
    {
      "@type": "Question",
      "name": "Comment l'âge influence-t-il le temps de réaction ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La rapidité culmine entre 18 et 25 ans, puis décline lentement d'environ 1 à 2ms par an. Un entraînement cognitif régulier permet d'atténuer ce ralentissement."
      }
    },
    {
      "@type": "Question",
      "name": "Le matériel informatique influe-t-il sur la mesure ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un moniteur à 144Hz ou plus et une souris cadencée à 1000Hz minimisent la latence d'affichage et de détection matérielle (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Quel protocole d'entraînement est recommandé ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Une session quotidienne de 10 à 15 minutes suffit pour stimuler la réactivité neuromusculaire avant des activités réclamant des réflexes aiguisés."
      }
    },
    {
      "@type": "Question",
      "name": "Ce test de temps de réaction est-il entièrement gratuit ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, SkillDrills propose cette évaluation gratuitement dans votre navigateur, sans téléchargement ni inscription."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment Réaliser le Test de Temps de Réaction de Choix",
  "description": "Test de temps de réaction de choix en ligne gratuit: Mesurez votre vitesse de décision, discrimination visuelle et flexibilité cognitive sans inscription.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Surveillez la Règle Active en Haut",
      "text": "Observez le bandeau supérieur indiquant la couleur de la cible valide (ex: CLIQUEZ SUR ROUGE ou CLIQUEZ SUR BLEU).",
      "url": "https://skilldrills.online/fr/drills/cognitive/processing-speed/reaction-time#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Distinguez les Cibles Visuelles",
      "text": "Dès l'apparition des cibles à l'écran, déterminez instantanément quel élément correspond à la consigne active.",
      "url": "https://skilldrills.online/fr/drills/cognitive/processing-speed/reaction-time#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Exécutez le Clic de Décision",
      "text": "Appuyez sur la cible correcte le plus vite possible avant l'expiration du décompte temporel.",
      "url": "https://skilldrills.online/fr/drills/cognitive/processing-speed/reaction-time#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Adaptez-vous aux Inversions de Règle",
      "text": "Lorsque la consigne change, inhibez immédiatement le réflexe précédent et ciblez la nouvelle couleur désignée.",
      "url": "https://skilldrills.online/fr/drills/cognitive/processing-speed/reaction-time#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('donders1969', 'hick1952', 'hyman1953', 'der2006', 'woods2015'),
  intro: {
    title: "Neurosciences du Temps de Réaction de Choix & Rapidité de Décision",
    paragraphs: [
      "Le temps de réaction de choix (CRT - Choice Reaction Time) est une métrique fondamentale en neurosciences cognitives pour évaluer l'efficacité de traitement du système nerveux central face à des alternatives multiples.",
      "Contrairement au temps de réaction simple (SRT, ~200ms) où la réponse est stéréotypée, la tâche de choix ajoute des étapes de discrimination sensorielle et de sélection d'action, portant le délai physiologique à 280–350ms (Donders, 1868).",
      "La loi de Hick-Hyman (Hick, 1952; Hyman, 1953) démontre que la latence décisionnelle augmente selon une fonction logarithmique du nombre de choix. Cet exercice introduit des renversements de règles pour solliciter le contrôle inhibiteur frontal.",
    ],
  },
  benchmarks: {
    title: 'Standards de Performance Cognitive & Barèmes de Réaction de Choix (CRT)',
    headers: ['Niveau', 'Rang', 'Latence de Réaction', 'Taux d Exactitude', 'Centile'],
    rows: [
      { tier: 'Tier 1', rank: 'Élite / Pro Gamer', stat: '< 210 ms', level: 'Maîtrise', accuracy: '98%+', percentile: 'Top 1%' },
      { tier: 'Tier 2', rank: 'Focus Avancé', stat: '210 – 249 ms', level: 'Diamant', accuracy: '94-97%', percentile: 'Top 5%' },
      { tier: 'Tier 3', rank: 'Compétent / Entraîné', stat: '250 – 289 ms', level: 'Platine', accuracy: '88-93%', percentile: 'Top 15%' },
      { tier: 'Tier 4', rank: 'Moyenne Adulte Standard', stat: '290 – 349 ms', level: 'Or', accuracy: '78-87%', percentile: 'Top 50%' },
      { tier: 'Tier 5', rank: 'Débutant / Ligne de Base', stat: '≥ 350 ms', level: 'Argent', accuracy: '< 78%', percentile: 'Base' },
    ],
  },
  protocols: {
    title: 'Protocoles d Optimisation Neuroplastique',
    description: 'Directives validées scientifiquement pour aiguiser vos réflexes et accélérer la prise de décision.',
    items: [
      { title: "Surveillez la Règle Active en Haut", description: "Observez le bandeau supérieur indiquant la couleur de la cible valide (ex: CLIQUEZ SUR ROUGE ou CLIQUEZ SUR BLEU)." },
      { title: "Distinguez les Cibles Visuelles", description: "Dès l'apparition des cibles à l'écran, déterminez instantanément quel élément correspond à la consigne active." },
      { title: "Exécutez le Clic de Décision", description: "Appuyez sur la cible correcte le plus vite possible avant l'expiration du décompte temporel." },
      { title: "Adaptez-vous aux Inversions de Règle", description: "Lorsque la consigne change, inhibez immédiatement le réflexe précédent et ciblez la nouvelle couleur désignée." },
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
      <EliteNeuroSwitchClient copy={{ title: "Test de Temps de Réaction de Choix" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="https://skilldrills.online/fr/drills/cognitive/processing-speed/reaction-time" />
      </div>
    </>
  );
}
