import DualTargetFlowClient from '@/app/drills/cognitive/attention/multi-tasking/DualTargetFlowClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test de Multitâche – Focale à Double Flux | SkillDrills",
  description: "Test de multitache et flexibilite cognitive en ligne gratuit: Suivez deux flux visuels opposes en simultane et evaluez le cout d alternance sans inscription.",
  keywords: [
    "test de multitache",
    "test de flexibilite cognitive",
    "test de changement de tache",
    "test d attention partagee en ligne",
    "jeu de multitache cerebral",
    "entrainement traitement parallele",
    "evaluation surcharge cognitive",
    "cout du switch cognitif test",
    "test de capacite multitache",
    "exercice agilite mentale gratuit",
    "coordination interhemispherique test",
    "vitesse d alternance attentionnelle"
  ],
  openGraph: {
    title: "Test de Multitâche – Focale à Double Flux | SkillDrills",
    description: "Test de multitache et flexibilite cognitive en ligne gratuit: Suivez deux flux visuels opposes en simultane et evaluez le cout d alternance sans inscription.",
    type: 'article',
    url: 'https://skilldrills.online/fr/drills/cognitive/attention/multi-tasking',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test de Multitâche – Focale à Double Flux | SkillDrills",
    description: "Test de multitache et flexibilite cognitive en ligne gratuit: Suivez deux flux visuels opposes en simultane et evaluez le cout d alternance sans inscription.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/cognitive/attention/multi-tasking',
    languages: getAlternateLanguages('/drills/cognitive/attention/multi-tasking'),
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
      "name": "Entrainements",
      "item": "https://skilldrills.online/fr/drills"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Entrainement Cognitif",
      "item": "https://skilldrills.online/fr/drills/cognitive"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Test de Multitache",
      "item": "https://skilldrills.online/fr/drills/cognitive/attention/multi-tasking"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test de Multitache — Entrainement Attentionnel a Double Flux",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Test de multitache et flexibilite cognitive en ligne gratuit: Suivez deux flux visuels opposes en simultane et evaluez le cout d alternance sans inscription.",
  "url": "https://skilldrills.online/fr/drills/cognitive/attention/multi-tasking",
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
  "name": "Test de Multitache",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Necessite un navigateur moderne avec support JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/fr/drills/cognitive/attention/multi-tasking",
  "inLanguage": "fr-FR",
  "dateModified": "2026-09-16"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Jeu de Multitache – Suivi a Double Flux",
  "url": "https://skilldrills.online/fr/drills/cognitive/attention/multi-tasking",
  "description": "Test de multitache et flexibilite cognitive en ligne gratuit: Suivez deux flux visuels opposes en simultane et evaluez le cout d alternance sans inscription.",
  "genre": [
    "Action",
    "Jeu Cerebral",
    "Entrainement Cognitif"
  ],
  "gamePlatform": [
    "Navigateur Web",
    "Bureau",
    "Appareils Mobiles"
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
      "name": "Qu est-ce que le Test de Multitache (Dual-Target Flow) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "C est un exercice neurocognitif qui met au defi le cerveau en lui demandant de suivre deux flux continus de formes geometriques dans des directions opposees, testant l attention bi-hemispherique."
      }
    },
    {
      "@type": "Question",
      "name": "Qu est-ce que le cout de changement (switch cost) selon Rogers et Monsell (1995) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le cout d alternance est la baisse mesurable de rapidite et de precision qui survient lorsque le cortex prefrontal doit reorganiser ses reperes mentaux pour changer de consigne de tache."
      }
    },
    {
      "@type": "Question",
      "name": "Le cerveau humain est-il capable de multitache reel simultane ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les recherches en neurosciences cognitives attestent que pour les operations non automatisees, le cerveau effectue une alternance serielle a grande vitesse plutot qu un calcul parallele pur (Pashler, 1994)."
      }
    },
    {
      "@type": "Question",
      "name": "Qu ont decouvert Ophir, Nass et Wagner (2009) sur les adeptes du multitache ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ils ont mis en evidence que les utilisateurs chroniques du multitache numerique eprouvent plus de difficultes a filtrer les stimuli non pertinents et presentent un controle attentionnel moins performant."
      }
    },
    {
      "@type": "Question",
      "name": "Comment s active la coordination bi-hemispherique dans cet entrainement ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La projection simultanee d elements visuels dans les deux champs de vision sollicite les voies occipito-parietales des deux hemispheres et requiert une communication fluide par le corps calleux."
      }
    },
    {
      "@type": "Question",
      "name": "Quelles strategies permettent d ameliorer son score ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Maintenez votre point de fixation au centre de la zone de vision et appuyez-vous sur votre regard peripherique pour anticiper les formes valides avant de declencher le geste moteur."
      }
    },
    {
      "@type": "Question",
      "name": "Comment la difficulte evolue-t-elle au fil des niveaux ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La vitesse de defilement augmente, les cibles actives changent plus souvent et le temps de decision se reduit, poussant l efficacite executive a son niveau maximal."
      }
    },
    {
      "@type": "Question",
      "name": "La latence d affichage influe-t-elle sur les resultats ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, des moniteurs a 144Hz ou plus et des peripheriques a faible retard reduisent le flou de mouvement (Woods et al., 2015), assurant une distinction nette des formes rapides."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la duree ideale pour une session de travail multitache ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Une pratique ciblee de 10 a 15 minutes par jour suffit a solliciter la plasticite cerebrale sans provoquer d epuisement attentionnel prolongé."
      }
    },
    {
      "@type": "Question",
      "name": "Ce test de multitache est-il gratuit ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, SkillDrills fournit cet outil en acces direct et gratuit dans votre navigateur, sans inscription requise ni telechargement."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment Passer le Test de Multitache",
  "description": "Methode pratique pour surveiller deux flux simultanes et entrainer l alternance attentionnelle sous contrainte de vitesse.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Stabilisez Votre Regard au Centre",
      "text": "Fixez la zone mediane entre les deux flux pour observer de maniere homogene les mouvements descendants ou lateraux.",
      "url": "https://skilldrills.online/fr/drills/cognitive/attention/multi-tasking#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Reperer les Symboles Cibles",
      "text": "Identifiez les formes actives presentees dans le bandeau superieur d affichage.",
      "url": "https://skilldrills.online/fr/drills/cognitive/attention/multi-tasking#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Cliquez Rapidement sur les Correspondances",
      "text": "Appuyez sans tarder sur les figures correspondantes avant qu elles ne franchissent les bords de l ecran.",
      "url": "https://skilldrills.online/fr/drills/cognitive/attention/multi-tasking#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Gerez l Acceleration Progressive",
      "text": "Ajustez vos reflexes au fur et a mesure que les objets accelerent pour conserver votre multiplicateur de combo.",
      "url": "https://skilldrills.online/fr/drills/cognitive/attention/multi-tasking#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('rogers1995', 'monsell2003', 'pashler1994', 'wickens2002', 'ophir2009', 'woods2015'),
  intro: {
    title: "Test de Multitâche et Flexibilité Cognitive",
    paragraphs: [
      "Le test de multitache a double flux permet d evaluer la resilience du reseau executif central face a des flux perceptifs concurrents soumis a une pression temporelle progressive.",
      "Le cout du switch cognitif (switch cost) designe la degradation transitoire de reactivite et de precision observee lors de la bascule entre differentes regles d action (Rogers & Monsell, 1995).",
      "Les decouvertes en ergonomie cognitive confirment que la coordination attentionnelle s optimise durablement par un entrainement methodique a l alternance mentale (Pashler, 1994; Wickens, 2002).",
    ],
  },
  benchmarks: {
    title: 'Niveaux et Baremes de Performance en Multitache',
    headers: ['Palier', 'Rang', 'Evaluation', 'Precision', 'Percentile'],
    rows: [
      { tier: 'Tier 1', rank: 'Grand Maitre / Elite', stat: 'Top 1%', level: 'Maitrise', accuracy: '98%+', percentile: 'Top 1%' },
      { tier: 'Tier 2', rank: 'Focalisation Avancee', stat: 'Top 5%', level: 'Diamant', accuracy: '94-97%', percentile: 'Top 5%' },
      { tier: 'Tier 3', rank: 'Operateur Qualifie', stat: 'Top 15%', level: 'Platine', accuracy: '88-93%', percentile: 'Top 15%' },
      { tier: 'Tier 4', rank: 'Moyenne Adulte', stat: 'Top 50%', level: 'Or', accuracy: '78-87%', percentile: 'Top 50%' },
      { tier: 'Tier 5', rank: 'Base Novice', stat: 'Base', level: 'Argent', accuracy: '<78%', percentile: 'Base' },
    ],
  },
  protocols: {
    title: 'Protocoles de Renforcement Neurocognitif',
    description: 'Directives basees sur les neurosciences pour affuter l alternance attentionnelle et l endurance mentale.',
    items: [
      { title: "Stabilisez Votre Regard au Centre", description: "Fixez la zone mediane entre les deux flux pour observer de maniere homogene les mouvements descendants ou lateraux." },
      { title: "Reperer les Symboles Cibles", description: "Identifiez les formes actives presentees dans le bandeau superieur d affichage." },
      { title: "Cliquez Rapidement sur les Correspondances", description: "Appuyez sans tarder sur les figures correspondantes avant qu elles ne franchissent les bords de l ecran." },
      { title: "Gerez l Acceleration Progressive", description: "Ajustez vos reflexes au fur et a mesure que les objets accelerent pour conserver votre multiplicateur de combo." },
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

export default function EnhancedPage() {
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
      <DualTargetFlowClient copy={{ title: "Test de Multitâche – Focale à Double Flux" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="https://skilldrills.online/fr/drills/cognitive/attention/multi-tasking" />
      </div>
    </>
  );
}
