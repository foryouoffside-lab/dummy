import DividedAttentionClient from '@/app/drills/cognitive/attention/divided-attention/DividedAttentionClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test d Attention Divisée – Double Tâche | SkillDrills",
  description: "Test d attention divisée et double tâche en ligne gratuit: Suivez des cibles visuelles en mouvement tout en classant des flux numériques sans inscription.",
  keywords: [
    "test attention divisee",
    "attention partagee exercices",
    "test double tache en ligne",
    "entrainement attention divisee",
    "periode refractaire psychologique",
    "goulot d etranglement cognitif",
    "test attention partagee gratuit",
    "multitache cognitif test",
    "poursuite visuelle et calcul",
    "evaluation neuropsychologique attention divisee",
    "exercice double concentration",
    "entrainement double tache"
  ],
  openGraph: {
    title: "Test d Attention Divisée – Double Tâche | SkillDrills",
    description: "Test d attention divisée et double tâche en ligne gratuit: Suivez des cibles visuelles en mouvement tout en classant des flux numériques sans inscription.",
    type: 'article',
    url: 'https://skilldrills.online/fr/drills/cognitive/attention/divided-attention',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test d Attention Divisée – Double Tâche | SkillDrills",
    description: "Test d attention divisée et double tâche en ligne gratuit: Suivez des cibles visuelles en mouvement tout en classant des flux numériques sans inscription.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/cognitive/attention/divided-attention',
    languages: getAlternateLanguages('/drills/cognitive/attention/divided-attention'),
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
      "name": "Attention Divisée et Double Tâche",
      "item": "https://skilldrills.online/fr/drills/cognitive/attention/divided-attention"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test d Attention Divisée – Double Tâche",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Test d attention divisée et double tâche en ligne gratuit: Suivez des cibles visuelles en mouvement tout en classant des flux numériques sans inscription.",
  "url": "https://skilldrills.online/fr/drills/cognitive/attention/divided-attention",
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
  "name": "Test d Attention Divisée en Ligne",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Nécessite un navigateur moderne avec support JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/fr/drills/cognitive/attention/divided-attention",
  "inLanguage": "fr-FR",
  "dateModified": "2026-09-16"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Jeu de Double Focalisation et Multitâche",
  "url": "https://skilldrills.online/fr/drills/cognitive/attention/divided-attention",
  "description": "Test d attention divisée et double tâche en ligne gratuit: Suivez des cibles visuelles en mouvement tout en classant des flux numériques sans inscription.",
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
      "name": "Qu'est-ce que l'attention divisée et que mesure ce test ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L'attention divisée est la capacité à traiter en parallèle plusieurs flux d'informations et à exécuter simultanément différentes tâches sans altération excessive de performance."
      }
    },
    {
      "@type": "Question",
      "name": "Qu'est-ce que la Période Réfractaire Psychologique (PRP, Pashler 1994) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La PRP représente le temps de latence induit lorsqu'un second stimulus survient peu après le premier, occasionné par un goulot d'étranglement central dans la sélection motrice."
      }
    },
    {
      "@type": "Question",
      "name": "Qu'apporte la Théorie des Ressources Multiples de Wickens (2002) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wickens a établi que l'attention se partage beaucoup plus aisément lorsque les deux tâches mobilisent des canaux sensoriels et des modalités cognitives distinctes."
      }
    },
    {
      "@type": "Question",
      "name": "Peut-on améliorer sa capacité de double tâche par l'exercice ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. L'entraînement intensif automatise les opérations de la tâche prioritaire, libérant des capacités au niveau du cortex préfrontal pour la tâche secondaire."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi associer poursuite visuelle spatiale et calcul numérique ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Parce que cet agencement recrute en simultané la voie visuelle dorsale (suivi spatial continu) et la voie ventrale préfrontale (règles logiques et symboliques)."
      }
    },
    {
      "@type": "Question",
      "name": "En quoi cet exercice améliore-t-il la performance esport et sportive ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Il prépare les compétiteurs à suivre les mouvements adverses tout en contrôlant l'interface, les ressources et les annonces audio sans temps de latence."
      }
    },
    {
      "@type": "Question",
      "name": "Que représente le coût de double tâche (dual-task cost) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "C'est la dégradation mesurable en précision ou en rapidité d'exécution subie lors de la réalisation conjointe de deux tâches par rapport à leur exécution isolée."
      }
    },
    {
      "@type": "Question",
      "name": "Quel volume d'entraînement quotidien est préconisé ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "10 à 15 minutes par jour suffisent pour élargir votre flexibilité cognitive sans induire d'épuisement attentionnel excessif."
      }
    },
    {
      "@type": "Question",
      "name": "L'âge influe-t-il sur l'attention partagée ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le coût de double tâche s'accroît modérément au fil des décennies, mais un entraînement régulier maintient la vitesse d'alternance cognitive."
      }
    },
    {
      "@type": "Question",
      "name": "Ce test d'attention divisée est-il entièrement gratuit ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, SkillDrills met cet outil à votre disposition de façon 100% gratuite et directement dans votre navigateur web, sans téléchargement."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment Réaliser le Test d Attention Divisée",
  "description": "Test d attention divisée et double tâche en ligne gratuit: Suivez des cibles visuelles en mouvement tout en classant des flux numériques sans inscription.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Suivez la Cible Visuelle Mobile",
      "text": "Gardez le focus visuel sur l élément en mouvement pour réagir immédiatement dès qu une action est requise.",
      "url": "https://skilldrills.online/fr/drills/cognitive/attention/divided-attention#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Analysez le Flux de Chiffres",
      "text": "Sans quitter des yeux la cible principale, déterminez si le chiffre affiché vérifie la consigne active.",
      "url": "https://skilldrills.online/fr/drills/cognitive/attention/divided-attention#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Déclenchez les Réponses Motrices Conjointes",
      "text": "Répondez rapidement au clavier ou à la souris aux deux flux d événements sans bloquer la poursuite visuelle.",
      "url": "https://skilldrills.online/fr/drills/cognitive/attention/divided-attention#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Équilibrez la Performance Globale",
      "text": "Veillez à ne pas privilégier une tâche au détriment de l autre: le score valorise l exactitude simultanée.",
      "url": "https://skilldrills.online/fr/drills/cognitive/attention/divided-attention#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('pashler1994', 'wickens2002', 'strayer2001', 'spelke1976', 'woods2015'),
  intro: {
    title: "Neurosciences de l Attention Divisée & Goulot d Étranglement de Pashler",
    paragraphs: [
      "L attention divisée évalue la façon dont le système cognitif répartit ses ressources exécutives limitées entre deux sollicitations simultanées.",
      "Les travaux de Harold Pashler (1994) sur la Période Réfractaire Psychologique (PRP) démontrent que si l encodage sensoriel peut être partiellement parallèle, la sélection des réponses motrices subit un goulot d étranglement sériel au sein du cortex préfrontal.",
      "S appuyant sur la Théorie des Ressources Multiples de Christopher Wickens (2002), ce test associe une tâche de poursuite spatiale à une tâche de catégorisation arithmétique discrète, favorisant une alternance ultra-rapide des processus décisionnels.",
    ],
  },
  benchmarks: {
    title: 'Standards de Performance Cognitive & Échelle de Double Tâche (Dual-Task)',
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
    title: 'Protocoles d Entraînement en Double Tâche',
    description: 'Directives neuroscientifiques pour fluidifier le traitement simultané et limiter les interférences.',
    items: [
      { title: "Suivez la Cible Visuelle Mobile", description: "Gardez le focus visuel sur l élément en mouvement pour réagir immédiatement dès qu une action est requise." },
      { title: "Analysez le Flux de Chiffres", description: "Sans quitter des yeux la cible principale, déterminez si le chiffre affiché vérifie la consigne active." },
      { title: "Déclenchez les Réponses Motrices Conjointes", description: "Répondez rapidement au clavier ou à la souris aux deux flux d événements sans bloquer la poursuite visuelle." },
      { title: "Équilibrez la Performance Globale", description: "Veillez à ne pas privilégier une tâche au détriment de l autre: le score valorise l exactitude simultanée." },
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
      <DividedAttentionClient copy={{ title: "Test d Attention Divisée – Double Tâche" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="https://skilldrills.online/fr/drills/cognitive/attention/divided-attention" />
      </div>
    </>
  );
}
