import ConcentrationStaminaClient from '@/app/drills/cognitive/attention/concentration-stamina/ConcentrationStaminaClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test de Concentration – Attention Soutenue | SkillDrills",
  description: "Test de concentration et d attention soutenue en ligne gratuit: Évaluez le déclin de vigilance, la stabilité attentionnelle et le contrôle inhibiteur.",
  keywords: [
    "test de concentration",
    "test attention soutenue",
    "test cpt en ligne",
    "test de vigilance cognitive",
    "fatigue mentale test en ligne",
    "endurance cognitive test",
    "resistance a la distraction test",
    "entrainement concentration gratuit",
    "test deficit de l attention en ligne",
    "controle inhibiteur et attention",
    "evaluation neuropsychologique attention",
    "exercice de concentration continue"
  ],
  openGraph: {
    title: "Test de Concentration – Attention Soutenue | SkillDrills",
    description: "Test de concentration et d attention soutenue en ligne gratuit: Évaluez le déclin de vigilance, la stabilité attentionnelle et le contrôle inhibiteur.",
    type: 'article',
    url: 'https://skilldrills.online/fr/drills/cognitive/attention/concentration-stamina',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test de Concentration – Attention Soutenue | SkillDrills",
    description: "Test de concentration et d attention soutenue en ligne gratuit: Évaluez le déclin de vigilance, la stabilité attentionnelle et le contrôle inhibiteur.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/cognitive/attention/concentration-stamina',
    languages: getAlternateLanguages('/drills/cognitive/attention/concentration-stamina'),
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
      "name": "Attention Soutenue et Concentration",
      "item": "https://skilldrills.online/fr/drills/cognitive/attention/concentration-stamina"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test de Concentration et d Attention Soutenue",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Test de concentration et d attention soutenue en ligne gratuit: Évaluez le déclin de vigilance, la stabilité attentionnelle et le contrôle inhibiteur.",
  "url": "https://skilldrills.online/fr/drills/cognitive/attention/concentration-stamina",
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
  "name": "Test de Concentration en Ligne",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Nécessite un navigateur moderne avec support JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/fr/drills/cognitive/attention/concentration-stamina",
  "inLanguage": "fr-FR",
  "dateModified": "2026-09-16"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Jeu d Endurance de Focus et Concentration",
  "url": "https://skilldrills.online/fr/drills/cognitive/attention/concentration-stamina",
  "description": "Test de concentration et d attention soutenue en ligne gratuit: Évaluez le déclin de vigilance, la stabilité attentionnelle et le contrôle inhibiteur.",
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
      "name": "Qu'est-ce que le test d'attention soutenue et d'endurance de concentration ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Il s'agit d'une évaluation continue (CPT) mesurant la stabilité de l'attention sélective, la résistance à la fatigue mentale et le contrôle inhibiteur dans le temps."
      }
    },
    {
      "@type": "Question",
      "name": "Que désigne le déclin de vigilance de Mackworth (1948) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "C'est la dégradation prévisible de la détection de signaux critiques après 20 à 30 minutes d'effort continu, causée par l'épuisement des ressources attentionnelles centrales."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi les règles changent-elles au cours de la session ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L'inversion régulière de consignes sollicite le cortex préfrontal pour surmonter l'inertie motrice et réinitialiser les critères en mémoire de travail (Monsell, 2003)."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle différence avec un simple test de temps de réaction ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ce test évalue l'endurance attentionnelle sur la durée et comptabilise les erreurs d'inattention (omission) et les erreurs d'impulsivité (commission)."
      }
    },
    {
      "@type": "Question",
      "name": "Quels sont les indices révélateurs d'une baisse de concentration ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un allongement progressif des temps de réaction ou des déclenchements impulsifs sur des cibles invalides signalent une dégradation de la vigilance."
      }
    },
    {
      "@type": "Question",
      "name": "Cet entraînement est-il utile pour les personnes atteintes de TDAH ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, les exercices de type CPT renforcent la capacité de régulation du focus et la résistance aux distractions en milieu répétitif."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le rythme d'entraînement recommandé ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Une pratique quotidienne de 10 à 15 minutes avant le travail ou les études prépare idéalement le cerveau à des phases d'attention prolongée."
      }
    },
    {
      "@type": "Question",
      "name": "Quel impact le manque de sommeil a-t-il sur les résultats ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La privation de sommeil accélère fortement le déclin de vigilance et multiplie par trois les erreurs de déclenchement intempestif."
      }
    },
    {
      "@type": "Question",
      "name": "Que signifient les paliers de performance indiqués ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ils positionnent votre score par rapport aux données normatives de vigilance établies lors d'études neuropsychologiques standardisées."
      }
    },
    {
      "@type": "Question",
      "name": "Ce test d'attention soutenue est-il totalement gratuit ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, SkillDrills propose cette évaluation gratuitement dans votre navigateur, sans inscription requise ni abonnement."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment Réaliser le Test de Concentration Soutenue",
  "description": "Test de concentration et d attention soutenue en ligne gratuit: Évaluez le déclin de vigilance, la stabilité attentionnelle et le contrôle inhibiteur.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Consultez la Règle Active Supérieure",
      "text": "Repérez la consigne sur le bandeau en haut qui définit les cibles valides (ex: Voyelles ou Nombres Premiers).",
      "url": "https://skilldrills.online/fr/drills/cognitive/attention/concentration-stamina#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Maintenez une Vigilance Ininterrompue",
      "text": "Surveillez attentivement le défilement continu des stimuli sans quitter la zone focale des yeux.",
      "url": "https://skilldrills.online/fr/drills/cognitive/attention/concentration-stamina#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Réagissez Uniquement aux Cibles Valides",
      "text": "Appuyez sur la touche ou touchez l écran uniquement lorsque l élément affiché satisfait la consigne.",
      "url": "https://skilldrills.online/fr/drills/cognitive/attention/concentration-stamina#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Ajustez-vous aux Inversions de Règles",
      "text": "Toutes les 10 secondes, adaptez instantanément votre sélection selon le nouveau critère affiché sans précipitation.",
      "url": "https://skilldrills.online/fr/drills/cognitive/attention/concentration-stamina#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('mackworth1948', 'parasuraman1979', 'robertson1997', 'monsell2003', 'broadbent1958', 'woods2015'),
  intro: {
    title: "Neurosciences de l Attention Soutenue & Déclin de Vigilance de Mackworth",
    paragraphs: [
      "L attention soutenue (vigilance continue) constitue l aptitude du système nerveux central à maintenir un traitement cognitif stable sur de longues périodes d exécution.",
      "Démontré par Norman Mackworth (1948) lors de travaux avec des opérateurs radar, le taux de détection de signaux décline systématiquement après 20 à 30 minutes sous l effet de la déplétion des ressources préfrontales et pariétales (Parasuraman, 1979; Robertson et al., 1997).",
      "Ce protocole intègre des renversements périodiques de consignes toutes les 10 secondes pour contraindre le cerveau à désactiver les schémas moteurs automatiques et maintenir une vigilance active (Monsell, 2003).",
    ],
  },
  benchmarks: {
    title: 'Standards de Performance Cognitive & Échelle de Vigilance Continue (CPT)',
    headers: ['Niveau', 'Rang', 'Performance', 'Exactitude', 'Centile'],
    rows: [
      { tier: 'Tier 1', rank: 'Grand Maître / Élite', stat: 'Top 1%', level: 'Maîtrise', accuracy: '98%+', percentile: 'Top 1%' },
      { tier: 'Tier 2', rank: 'Focus Avancé', stat: 'Top 5%', level: 'Diamant', accuracy: '94-97%', percentile: 'Top 5%' },
      { tier: 'Tier 3', rank: 'Opérateur Compétent', stat: 'Top 15%', level: 'Platine', accuracy: '88-93%', percentile: 'Top 15%' },
      { tier: 'Tier 4', rank: 'Moyenne Adulte Standard', stat: 'Top 50%', level: 'Or', accuracy: '78-87%', percentile: 'Top 50%' },
      { tier: 'Tier 5', rank: 'Ligne de Base Initiale', stat: 'Base', level: 'Argent', accuracy: '< 78%', percentile: 'Base' },
    ],
  },
  protocols: {
    title: 'Protocoles d Optimisation de la Vigilance',
    description: 'Directives neuroscientifiques pour muscler votre résistance à l inattention.',
    items: [
      { title: "Consultez la Règle Active Supérieure", description: "Repérez la consigne sur le bandeau en haut qui définit les cibles valides (ex: Voyelles ou Nombres Premiers)." },
      { title: "Maintenez une Vigilance Ininterrompue", description: "Surveillez attentivement le défilement continu des stimuli sans quitter la zone focale des yeux." },
      { title: "Réagissez Uniquement aux Cibles Valides", description: "Appuyez sur la touche ou touchez l écran uniquement lorsque l élément affiché satisfait la consigne." },
      { title: "Ajustez-vous aux Inversions de Règles", description: "Toutes les 10 secondes, adaptez instantanément votre sélection selon le nouveau critère affiché sans précipitation." },
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
      <ConcentrationStaminaClient copy={{ title: "Test de Concentration et d Attention Soutenue" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="https://skilldrills.online/fr/drills/cognitive/attention/concentration-stamina" />
      </div>
    </>
  );
}
