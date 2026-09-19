import FineMotorClient from '@/app/drills/motor/precision-control/tracing/TracingClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — tracing (French: Jeu de Tracé à la Souris)
// PRIMARY:  "jeu de tracé à la souris"        — Core query
//           "test de suivi de curseur souris" — Diagnostic query
// SECONDARY / LSI:
//           "test de précision de tracé souris" — Precision test
//           "entraînement poursuite oculaire fluide" — Smooth pursuit
//           "contrôle moteur fin tracé souris"  — Fine motor control
//           "loi de direction d accot-zhai"     — Steering Law
//           "stabilité du tracé curseur"        — Trajectory stability
// ============================================================

export const metadata = {
  title: 'Jeu de Tracé à la Souris – Test de Précision et Tracking',
  description: 'Jeu de tracé à la souris en ligne gratuit. Suivez l\'onde sinusoïdale avec le curseur pour entraîner poursuite oculaire fluide et motricité fine.',
  keywords: [
    'jeu de tracé à la souris',
    'test de suivi de curseur souris',
    'test de précision de tracé souris',
    'entraînement poursuite oculaire fluide',
    'contrôle moteur fin tracé souris',
    'loi de direction d accot-zhai',
    'stabilité du tracé curseur',
    'jeu suivre la ligne souris',
    'entraînement aim tracking continu',
    'coordination visuo-motrice tracé',
    'fluidité du mouvement souris',
    'test de dextérité dynamique souris',
  ],
  openGraph: {
    title: 'Jeu de Tracé à la Souris – Test de Précision et Tracking | SkillDrills',
    description: 'Jeu de tracé à la souris en ligne gratuit. Suivez l\'onde sinusoïdale avec le curseur pour entraîner poursuite oculaire fluide et motricité fine.',
    type: 'article',
    url: 'https://skilldrills.online/fr/drills/motor/precision-control/tracing',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jeu de Tracé à la Souris – Test de Précision et Tracking | SkillDrills',
    description: 'Jeu de tracé à la souris en ligne gratuit. Suivez l\'onde sinusoïdale avec le curseur pour entraîner poursuite oculaire fluide et motricité fine.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/motor/precision-control/tracing',
    languages: getAlternateLanguages('/drills/motor/precision-control/tracing'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://skilldrills.online/fr' },
    { '@type': 'ListItem', position: 2, name: 'Entraînement Moteur', item: 'https://skilldrills.online/fr/drills/motor' },
    { '@type': 'ListItem', position: 3, name: 'Contrôle de Précision', item: 'https://skilldrills.online/fr/drills/motor/precision-control' },
    { '@type': 'ListItem', position: 4, name: 'Jeu de Tracé', item: 'https://skilldrills.online/fr/drills/motor/precision-control/tracing' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Jeu de Tracé à la Souris – Test de Précision Motrice',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Outil d\'évaluation interactif pour maintenir le curseur sur une onde sinusoïdale continue sans dévier.',
  url: 'https://skilldrills.online/fr/drills/motor/precision-control/tracing',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online/fr' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Jeu de Poursuite Continue en Ligne',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Navigateur moderne avec prise en charge HTML5 Canvas et Pointer Events',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  url: 'https://skilldrills.online/fr/drills/motor/precision-control/tracing',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Entraînement de Tracé et Fluidité Souris',
  url: 'https://skilldrills.online/fr/drills/motor/precision-control/tracing',
  description: 'Jeu d\'adresse cinétique renforçant la poursuite visuo-motrice fluide et supprimant les saccades parasites.',
  genre: ['Precision Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' }
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Qu\'est-ce que le Jeu de Tracé à la Souris et que mesure-t-il ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'C\'est un test neuromoteur interactif où l\'utilisateur doit maintenir son curseur sur une onde sinusoïdale en défilement continu dans un chenal de 22 pixels. Il évalue la stabilité manuelle, la vitesse de poursuite oculaire (smooth pursuit) et la régularité du guidage pendant 45 secondes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi l\'onde défile-t-elle sans attendre l\'utilisateur ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le défilement permanent impose une réactivité cinétique continue. Contrairement aux épreuves statiques où l\'on peut figer son geste, ce test exige une anticipation constante et des micro-corrections instantanées.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qu\'est-ce que l\'Intégrité de Flux (Flow Integrity) et comment est-elle notée ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'L\'Intégrité de Flux mesure la constance du tracé en direct (0 à 100%). Elle progresse tant que le pointeur reste centré dans le chenal de 22 px et décroît progressivement lors des sorties de trajectoire.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment la vitesse et l\'amplitude augmentent-elles au fil des 45 secondes ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le test démarre à 2,2 px/image avec une amplitude de 90 px, puis grimpe à plus de 4,5 px/image avec des harmoniques atteignant 125 px, sollicitant une synchronisation neuromusculaire de plus en plus fine.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quels modèles scientifiques décrivent le suivi de trajectoire continue ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ce test s\'appuie sur la loi de direction d\'Accot-Zhai (1997) et le modèle moteur de Woodworth (1899), fonctionnant en boucle fermée ininterrompue où le système visuel rectifie le mouvement toutes les 150 à 200 ms.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la différence entre poursuite fluide et saccades de rattrapage ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Comme établi par Krauzlis (2004) et Rashbass (1961), la poursuite fluide cale sa vitesse sur celle de la cible, alors que les saccades sont des impulsions balistiques brèves. En cas de décrochage, le cortex déclenche une saccade de rattrapage avant de réenclencher la poursuite.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment cet exercice favorise-t-il les performances dans les jeux FPS ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dans les jeux à temps d\'élimination long (TTK), il est crucial de garder le réticule collé sur un adversaire en mouvement. Cet exercice élimine les à-coups parasites, fluidifie le glissement du bras et facilite les inversions de sens.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle sensibilité et quel DPI de souris sont les plus adaptés ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Une sensibilité moyenne à basse (800 DPI avec 25 à 45 cm/360°) offre plus de contrôle mécanique et engage l\'avant-bras, atténuant les micro-tremblements. Un taux de rafraîchissement de 1000 Hz est vivement conseillé.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment éviter les tensions et la fatigue musculaire lors du tracé ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ne crispez pas la main sur la souris. Adoptez une prise claw ou fingertip relâchée, pilotez depuis le coude pour les amples ondulations verticales et conservez les doigts pour les micro-corrections.',
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on s\'entraîner avec une tablette graphique ou un trackball ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Grâce au protocole Pointer Events, les graphistes peuvent affûter la régularité du tracé au stylet sur tablette, tout comme les utilisateurs de trackballs de précision.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Comment s\'entraîner au tracé et au suivi continu à la souris',
  description: 'Protocole structuré pour perfectionner la poursuite fluide et éliminer les saccades parasites.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Placer le curseur sur le point d\'origine',
      text: 'Positionnez votre pointeur sur l\'amorce lumineuse de l\'onde avant le déclenchement du chronomètre.',
      url: 'https://skilldrills.online/fr/drills/motor/precision-control/tracing#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Harmoniser sa vitesse avec la trajectoire de l\'onde',
      text: 'Faites glisser la souris avec fluidité sur la courbe sinusoïdale en synchronisant votre allure.',
      url: 'https://skilldrills.online/fr/drills/motor/precision-control/tracing#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Neutraliser les micro-secousses et les saccades',
      text: 'Détendez votre poignet et portez votre regard environ 20 pixels en avant du réticule pour anticiper.',
      url: 'https://skilldrills.online/fr/drills/motor/precision-control/tracing#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Consulter son score d\'Intégrité de Flux',
      text: 'Analysez votre score de fluidité, votre temps passé sur la trajectoire et votre constance après 45 secondes.',
      url: 'https://skilldrills.online/fr/drills/motor/precision-control/tracing#step-4'
    },
  ],
};

const guideProps = {
  sources: pickSources('accot1997', 'krauzlis2004', 'rashbass1961', 'woodworth1899', 'woods2015'),
  intro: {
    title: 'Comment le suivi continu est mesuré',
    paragraphs: [
      'Fiabilité des mesures et contraintes matérielles : Le chronométrage repose sur l\'API performance.now() du navigateur (~1 ms pour des impératifs de sécurité). L\'affichage dépend du taux de rafraîchissement de l\'écran — ~16,7 ms à 60 Hz, ~6,9 ms à 144 Hz et ~4,1 ms à 240 Hz (Woods et al., 2015). Le taux de transfert de la souris introduit ~8 ms à 125 Hz contre ~1 ms à 1000 Hz. Tout écart inférieur à 5 ms relève du bruit de mesure. SkillDrills n\'enregistre aucune donnée sur des serveurs distants.',
    ],
  },
  benchmark: {
    title: 'Barème de Référence en Tracé et Poursuite Fluide',
    description: 'Grille d\'évaluation fondée sur les travaux de Krauzlis (2004) et Rashbass (1961). Analyse le score global, l\'intégrité maximale de flux et la séquence continue de maintien sur la courbe pendant 45 secondes.',
    columns: ['Niveau', 'Titre de Rang', 'Score Global', 'Pic de Flux', 'Série d\'Images', 'Niveau de Maîtrise'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Grand Maître Apex',
        stat: '1400+ pts',
        level: '95–100%',
        accuracy: '600+ frames',
        percentile: 'Exceptionnel (Top 1%)',
      },
      {
        tier: 'Tier 2',
        rank: 'Poursuiteur Émérite',
        stat: '1100–1399 pts',
        level: '85–94%',
        accuracy: '400–599 frames',
        percentile: 'Avancé (Top 5%)',
      },
      {
        tier: 'Tier 3',
        rank: 'Suiveur Compétent',
        stat: '800–1099 pts',
        level: '70–84%',
        accuracy: '250–399 frames',
        percentile: 'Solide (Top 25%)',
      },
      {
        tier: 'Tier 4',
        rank: 'Curseur Intermédiaire',
        stat: '500–799 pts',
        level: '50–69%',
        accuracy: '120–249 frames',
        percentile: 'Moyen',
      },
      {
        tier: 'Tier 5',
        rank: 'Novice en Tracé',
        stat: 'Moins de 500 pts',
        level: 'Moins de 50%',
        accuracy: 'Moins de 120 frames',
        percentile: 'En apprentissage',
      },
    ],
  },
  protocols: {
    title: 'Protocoles d\'Entraînement pour le Suivi Continu',
    description: 'Directives pour développer la poursuite oculaire fluide, supprimer les saccades imprévues et stabiliser le geste.',
    items: [
      {
        title: 'Protocole 1 : Fixation Anticipée et Poursuite Feedforward (Krauzlis 2004)',
        description: 'Fixez votre regard 15 à 25 pixels en avant de l\'onde plutôt que directement sur la cible. Cette projection visuelle permet au cortex prémoteur de programmer l\'accélération avant les points d\'inflexion.',
      },
      {
        title: 'Protocole 2 : Poursuite en Mode Double de Rashbass (1961)',
        description: 'En cas de sortie de la zone de 22 px, effectuez une brève saccade de rattrapage puis relâchez immédiatement l\'effort pour retrouver la poursuite fluide sans rebondir sur les limites.',
      },
      {
        title: 'Protocole 3 : Modulation de Courbure selon Accot-Zhai (Crêtes et Creux)',
        description: 'D\'après la loi d\'Accot-Zhai (1997), les crêtes et les creux requièrent une vitesse tangentielle plus faible que les portions planes. Ralentissez légèrement dans les tournants pour éviter les dérapages.',
      },
      {
        title: 'Protocole 4 : Glissement d\'Avant-Bras et Maîtrise de la Friciton',
        description: 'Reposez délicatement l\'avant-bras sur le tapis sans enfoncer le poignet. Pivotez depuis le coude pour encaisser les vagues verticales et réservez les doigts aux micro-ajustements de 1–2 px.',
      },
    ],
  },
  faqs: {
    title: 'Foire Aux Questions sur le Tracé à la Souris et le Suivi d\'Onde',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

const frCopy = {
  title: "Jeu de Tracé à la Souris",
  subtitle: "Suivi Continu Entrée Brute • Chrono 45s",
  startButtonText: "Démarrer l'Entraînement",
  trainAgain: "Recommencer",
  shareTitle: "Partager le Score",
  exitTitle: "Quitter",
  statFlowScore: "Score de Flux",
  statTimeLeft: "Temps Restant",
  statFlowIntegrity: "Intégrité du Flux",
  statBestScore: "Meilleur Score",
  maxStreakLabel: "Série Max d'Images",
  peakFlowLabel: "Pic d'État de Flux",
  bestScoreLabel: "Record Personnel",
  rulesTitle: "Instructions de l'Exercice et Système de Points",
  rulesItems: [
    { num: "1", text: "Tracer la Trajectoire", highlight: "Onde Émeraude", result: "+1 PT / image sur la trajectoire" },
    { num: "2", text: "Vitesse Progressive", highlight: "Onde Dynamique", result: "2,2 → 3,8 px/img sur 45s" },
    { num: "3", text: "Intégrité du Flux", highlight: "Super Flux", result: "4s de verrouillage = +5 Bonus" },
    { num: "4", text: "Suivi Précis", highlight: "Exclusif Bureau", result: "Entrée souris brute 1:1" }
  ],
};

export default function FrenchTracingPage() {
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
      <FineMotorClient copy={frCopy} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/drills/motor/precision-control/tracing" locale="fr" />
      </div>
      <DrillFooter />
    </>
  );
}
