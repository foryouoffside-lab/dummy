import PhysicalDrillsClient from '@/app/drills/physical/PhysicalDrillsClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const physicalDrills = DRILLS.filter((d) => d.category === 'physical');

export const metadata = {
  title: 'Entraînement d\'Agilité & Test de Réflexes | SkillDrills',
  description: 'Entraînement d\'agilité et réflexes en ligne : 11 exercices scientifiques pour temps de réaction, équilibre, coordination œil-main, esquive et appuis vifs.',
  keywords: [
    'test de réflexe en ligne gratuit', 'exercices coordination oeil main', 'échelle de rythme exercices en ligne',
    'test d équilibre en ligne', 'jeu d esquive souris réflexe', 'entraînement vision périphérique',
    'test go no go en ligne', 'test de la règle temps de réaction', 'test vitesse de réaction en ligne',
    'améliorer vitesse de réaction et réflexes', 'exercices de vivacité motrice', 'vitesse des appuis et agilité sport',
    'mouvement bilatéral ligne médiane', 'contrôle postural et stabilité motrice', 'jeu de réflexes esquive projectiles'
  ],
  openGraph: {
    title: 'Entraînement d\'Agilité & Test de Réflexes | SkillDrills',
    description: 'Entraînement d\'agilité et réflexes en ligne : 11 exercices scientifiques pour temps de réaction, équilibre, coordination œil-main, esquive et appuis vifs.',
    type: 'website',
    url: 'https://skilldrills.online/fr/drills/physical',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Entraînement d\'Agilité et Réflexes Physiques sur SkillDrills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Entraînement d\'Agilité & Test de Réflexes | SkillDrills',
    description: '11 exercices scientifiques d\'agilité, équilibre, coordination motrice et réflexes rapides gratuits dans le navigateur.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/physical',
    languages: getAlternateLanguages('/fr/drills/physical'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/fr" },
    { "@type": "ListItem", "position": 2, "name": "Exercices de Performance", "item": "https://skilldrills.online/fr/drills" },
    { "@type": "ListItem", "position": 3, "name": "Réflexes Physiques & Agilité", "item": "https://skilldrills.online/fr/drills/physical" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Entraînement d'Agilité & Réflexes (11 Exercices)",
  "url": "https://skilldrills.online/fr/drills/physical",
  "description": "11 exercices interactifs pour le temps de réaction, l'équilibre, la coordination motrice, l'échelle de rythme et l'esquive d'obstacles.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": physicalDrills.map((drill) => {
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
      "name": "Comment l'entraînement digital à l'échelle de rythme se transfère-t-il aux appuis et à l'agilité athlétique ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les exercices d'échelle d'agilité sur écran entraînent la reconnaissance ultra-rapide des stimuli visuels et la synchronisation du rythme dans le cortex visuel. En stimulant le cortex moteur à prendre des décisions motrices en millisecondes face à des cibles mouvantes, la vitesse de conduction nerveuse s'accélère, réduisant le temps de contact au sol et optimisant les changements de direction (COD) au football, au basketball et au tennis."
      }
    },
    {
      "@type": "Question",
      "name": "Qu'est-ce qu'une chaîne de réaction avec inhibition d'impulsion et comment évite-t-elle l'engagement excessif ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le test d'arrêt d'impulsion (Impulse Arrest) évalue la capacité neuromusculaire à interrompre ou réorienter instantanément une action déjà amorcée lorsqu'un leurre ou une feinte adverse survient. Le renforcement des voies inhibitrices dans les ganglions de la base et le cortex préfrontal permet de freiner son élan en moins de 150 ms, neutralisant les feintes sans se faire déborder."
      }
    },
    {
      "@type": "Question",
      "name": "Comment le travail virtuel de stabilité contre des vecteurs de force renforce-t-il l'équilibre physique ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L'équilibre dynamique repose sur l'intégration sensorielle continue entre la fixation oculaire, le système vestibulaire de l'oreille interne et les propriocepteurs musculaires et articulaires. Résister à des vecteurs dynamiques de vent et de force sur l'écran force le système nerveux central à calculer des micro-forces antagonistes en temps réel, activant les muscles stabilisateurs posturaux face aux perturbations brutales."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi le franchissement de la ligne médiane (Cross-Body Movement) est-il capital pour la coordination corporelle ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les mouvements croisant la ligne médiane du corps exigent une transmission synaptique soutenue à travers le corps calleux entre les deux hémisphères cérébraux. Les exercices d'interception synchronisent les chaînes cinétiques diagonales, amplifiant l'agilité multidirectionnelle, la puissance rotationnelle et la perception spatiale tridimensionnelle."
      }
    },
    {
      "@type": "Question",
      "name": "De combien les exercices d'esquive sur grille 3x3 réduisent-ils le temps de réaction en situation d'évitement ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Contrairement aux tests statiques prévisibles, les zones de danger dynamiques imposent une mise à jour permanente de la cartographie spatiale dans le lobe pariétal. Cela abaisse le temps de réaction de choix (Choice Reaction Time) sous pression d'une moyenne de 280 ms à moins de 190 ms."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le rôle de la vision périphérique (champ visuel utile UFOV) dans l'anticipation et la prévention des blessures ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le balayage des menaces périphériques élargit le champ visuel fonctionnel (FFOV). Les stimuli en périphérie stimulent la voie visuelle magnocellulaire, déclenchant des mouvements moteurs réflexes d'esquive sans exiger une fixation fovéale directe, ce qui prévient les collisions et chocs imprévus dans les sports de contact."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la routine d'entraînement optimale pour l'agilité et les réflexes physiques ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le protocole recommandé est de 15 à 25 minutes de haute intensité, 3 à 5 fois par semaine. La précision neuromusculaire mobilisant des réserves synaptiques massives, dépasser 30 minutes déclenche une fatigue du système nerveux central (SNC), dégradant la mécanique réflexe et limitant les gains d'apprentissage."
      }
    },
    {
      "@type": "Question",
      "name": "Les exercices de réflexes sur navigateur peuvent-ils compléter l'entraînement physique en salle ou sur le terrain ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. S'ils ne remplacent pas le renforcement musculaire ou la pliométrie, les exercices numériques isolent et perfectionnent la phase perceptivo-cognitive du geste sportif. En accélérant la détection visuelle, l'évaluation des risques et la commande motrice, ils permettent à la puissance athlétique de s'exprimer sur le terrain sans retard d'exécution."
      }
    }
  ]
};

export default function PhysicalDrillsPage() {
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
      <PhysicalDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}
