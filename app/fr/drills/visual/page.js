import VisualDrillsClient from '@/app/drills/visual/VisualDrillsClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const visualDrills = DRILLS.filter((d) => d.category === 'visual');

export const metadata = {
  title: 'Entraînement Visuel & Test de Vue en Ligne | SkillDrills',
  description: 'Entraînement visuel en ligne : 9 exercices d\'acuité visuelle dynamique, vision du relief, poursuite oculaire, temps de réaction et recherche visuelle.',
  keywords: [
    'test de vue en ligne gratuit', 'exercices de gymnastique oculaire', 'test acuite visuelle dynamique',
    'perception de la profondeur test', 'test vision du relief', 'temps de reaction visuel en ligne',
    'test de reaction a la lumiere', 'poursuite visuelle oculaire', 'mouvements oculaires saccadiques',
    'recherche visuelle attention selective', 'champ visuel utile entrainement', 'fatigue oculaire exercices ecran',
    'discrimination temporelle visuelle', 'poursuite dobjets multiples mot', 'sports vision entrainement visuel'
  ],
  openGraph: {
    title: 'Entraînement Visuel & Test de Vue en Ligne | SkillDrills',
    description: 'Entraînement visuel en ligne : 9 exercices d\'acuité visuelle dynamique, vision du relief, poursuite oculaire, temps de réaction et recherche visuelle.',
    type: 'website',
    url: 'https://skilldrills.online/fr/drills/visual',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Entraînement de la Vision et de l\'Acuité Visuelle sur SkillDrills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Entraînement Visuel & Test de Vue en Ligne | SkillDrills',
    description: '9 exercices scientifiques d\'acuité visuelle dynamique, vision du relief, poursuite oculaire et recherche visuelle.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/visual',
    languages: getAlternateLanguages('/fr/drills/visual'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/fr" },
    { "@type": "ListItem", "position": 2, "name": "Exercices de Performance", "item": "https://skilldrills.online/fr/drills" },
    { "@type": "ListItem", "position": 3, "name": "Perception Visuelle & Profondeur", "item": "https://skilldrills.online/fr/drills/visual" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Entraînement de Perception Visuelle & Relief (9 Exercices)",
  "url": "https://skilldrills.online/fr/drills/visual",
  "description": "9 exercices interactifs d'acuité visuelle dynamique, vision stéréoscopique, poursuite oculaire continue, recherche visuelle et réflexe lumineux.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": visualDrills.map((drill) => {
    const loc = getLocalizedDrill(drill.href, 'fr', drill.name);
    return {
      "@type": "WebApplication",
      "name": loc.name,
      "url": `https://skilldrills.online/fr${drill.href}`,
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
      "name": "Comment l'entraînement de l'acuité visuelle dynamique (AVD) améliore-t-il la performance sportive et gaming ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Contrairement à l'acuité statique sur l'échelle de Monoyer, l'acuité visuelle dynamique mesure la capacité de la fovéa centrale à maintenir nette l'image rétinienne d'un objet en déplacement rapide. Intercepter des trajectoires complexes stimule les six muscles oculomoteurs et le cortex visuel, réduisant le temps de décision motrice au tennis, au football et dans les FPS."
      }
    },
    {
      "@type": "Question",
      "name": "Que mesure le test de perception de la profondeur basé sur le principe des trois tiges ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ce test évalue la stéréoscopie via la disparité binoculaire, c'est-à-dire le décalage géométrique projeté sur chaque rétine. Détecter l'instant exact où des tiges mobiles s'alignent sur un plan identique est fondamental pour évaluer les distances de freinage sur la route et calculer la profondeur des passes dans les sports collectifs."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi la poursuite d'objets multiples (MOT) élargit-elle le champ visuel périphérique ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le protocole MOT mobilise l'attention spatiale partagée dans le lobe pariétal et la mémoire de travail visuo-spatiale. Fixer le regard au centre tout en suivant plusieurs cibles oscillant dans les zones périphériques accroît le champ visuel fonctionnel (UFOV), améliorant la prise d'information sous haute pression temporelle."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la différence entre la poursuite oculaire continue (Smooth Pursuit) et les saccades ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La poursuite continue permet aux yeux de glisser sans heurt le long d'une trajectoire fluide sans rupture visuelle. Les saccades sont des sauts abrupts qui induisent une brève suppression de la perception (cécité saccadique). Travailler la poursuite continue empêche les cibles mobiles de devenir floues lors des phases critiques."
      }
    },
    {
      "@type": "Question",
      "name": "En quoi le test de réaction à la lumière diffère-t-il d'un test de réflexe conventionnel ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les tests de réaction classiques engagent des étapes cognitives de discrimination sémantique ou chromatique. Le test à la lumière isole la latence visuo-motrice primitive : il mesure strictement le délai entre la phototransduction rétinienne sous flash stroboscopique et l'activation électromyographique de l'index."
      }
    },
    {
      "@type": "Question",
      "name": "Quelles fonctions cérébrales sont stimulées par l'exploration visuelle sur matrices denses ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les tâches de recherche visuelle parmi des distracteurs orientés stimulent l'intégration des traits élémentaires dans le cortex strié et le filtrage inhibiteur dans le cortex préfrontal dorsolatéral. Le cerveau apprend ainsi à neutraliser le bruit visuel parasite et à identifier les indices critiques en quelques millisecondes."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la posologie recommandée pour l'entraînement oculaire et la gymnastique visuelle ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La recommandation scientifique est de 15 à 20 minutes de haute concentration, 3 à 5 fois par semaine. Les muscles ciliaires et oculomoteurs se fatiguant rapidement, dépasser 25 minutes consécutives génère une asthénopie (fatigue oculaire) qui bloque la plasticité synaptique. La régularité prime sur la durée."
      }
    },
    {
      "@type": "Question",
      "name": "Les exercices visuels sur navigateur remplacent-ils les examens chez l'ophtalmologiste ou l'orthoptiste ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non. Ces outils fournissent un entraînement perceptivo-moteur et fonctionnel pour optimiser les performances des personnes saines et des athlètes, mais ils ne sauraient se substituer aux bilans orthoptiques ou médicaux de réfraction, de fond d'œil et de santé rétinienne."
      }
    }
  ]
};

export default function VisualDrillsPage() {
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
      <VisualDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}
