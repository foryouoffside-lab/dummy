import ReflexTrainingDrillWrapper from '@/app/drills/reaction-speed/reflex-training-drill/ReflexTrainingDrillWrapperLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — fr-FR (reaction-speed / reflex-training-drill)
// PRIMARY: "entraînement des réflexes" / "test de réflexes"
// SECONDARY / LSI:
//   "travailler ses réflexes" / "jeu de réflexe" / "attention partagée"
//   "rapidité de réaction" / "agilité visuelle"
// ============================================================

export const metadata = {
  title: "Entraînement des Réflexes – Test d'Agilité | SkillDrills",
  description:
    "Entraînement des réflexes gratuit en ligne. Réagissez aux cibles multiples en simultané, affûtez votre attention partagée et améliorez vos réflexes esport.",
  keywords: [
    'entraînement des réflexes',
    'test de réflexes',
    'travailler ses réflexes',
    'jeu de réflexe',
    'jeux de réflexes',
    'rapidité de réaction',
    'vitesse de réaction',
    'attention partagée',
    'agilité visuelle',
    'temps de réaction',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/reaction-speed/reflex-training-drill',
    languages: getAlternateLanguages('/drills/reaction-speed/reflex-training-drill'),
  },
  openGraph: {
    title: "Entraînement des Réflexes – Test d'Agilité | SkillDrills",
    description:
      'Entraînement des réflexes et test de temps de réaction multi-cibles en ligne. Développez votre attention partagée et votre coordination œil-main.',
    url: 'https://skilldrills.online/fr/drills/reaction-speed/reflex-training-drill',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Entraînement des Réflexes – Test d'Agilité | SkillDrills",
    description:
      'Entraînez vos réflexes et votre attention divisée gratuitement dans votre navigateur.',
  },
  robots: { index: true, follow: true },
};

// --- Structured Data Schemas ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills Accueil', item: 'https://skilldrills.online/fr' },
    { '@type': 'ListItem', position: 2, name: 'Hub des Exercices', item: 'https://skilldrills.online/fr/drills' },
    { '@type': 'ListItem', position: 3, name: 'Vitesse de Réaction', item: 'https://skilldrills.online/fr/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'Entraînement des Réflexes', item: 'https://skilldrills.online/fr/drills/reaction-speed/reflex-training-drill' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: "Entraînement des Réflexes – Test d'Agilité Multi-Cibles",
  alternateName: ['Jeu de Réflexe', 'Entraînement des Réflexes', 'Test d Agilité Visuelle', 'Reflex Trainer'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description:
    'Outil interactif de stimulation cognitive et motrice pour développer l attention divisée et la vitesse d acquisition de cibles multiples.',
  browserRequirements: 'Navigateur web moderne avec support JavaScript (Chrome, Firefox, Safari, Edge)',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: "Entraînement des Réflexes — Test d'Agilité | SkillDrills",
  url: 'https://skilldrills.online/fr/drills/reaction-speed/reflex-training-drill',
  description:
    'Jeu de réflexe gratuit pour entraîner la vitesse de réaction motrice et l attention partagée directement dans le navigateur.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'Nécessite un navigateur web moderne avec JavaScript activé.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: 'Réflexes moteurs, Attention partagée, Acquisition multi-cibles, Coordination œil-main, Mouvements saccadiques',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Entraînement des Réflexes - Rafale Multi-Cibles',
  url: 'https://skilldrills.online/fr/drills/reaction-speed/reflex-training-drill',
  description: 'Jeu de réflexes et d agilité visuelle avec cibles multiples en simultané.',
  genre: ['Reflex Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Comment entraîner ses réflexes et son attention partagée',
  description: 'Protocole pour améliorer la prise de décision rapide et la vitesse d élimination de cibles simultanées.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Lancer l exercice',
      text: 'Cliquez sur « Commencer l exercice » pour activer la zone de test en plein écran.',
      url: 'https://skilldrills.online/fr/drills/reaction-speed/reflex-training-drill#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Analyser la rafale de cibles',
      text: 'Balayez du regard les différentes cibles qui apparaissent en même temps et observez leurs anneaux de compte à rebours.',
      url: 'https://skilldrills.online/fr/drills/reaction-speed/reflex-training-drill#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Cliquer selon l ordre de priorité',
      text: 'Cliquez en priorité sur les cibles dont le temps est presque écoulé afin d éviter les pénalités d expiration.',
      url: 'https://skilldrills.online/fr/drills/reaction-speed/reflex-training-drill#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Maintenir la série et monter de niveau',
      text: 'Enchaînez les frappes précises pour franchir les paliers de difficulté et affronter des groupes de cibles plus denses.',
      url: 'https://skilldrills.online/fr/drills/reaction-speed/reflex-training-drill#step-4',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-15',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Qu'est-ce qu'un entraînement des réflexes multi-cibles ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "C'est un exercice cognitif et neuromusculaire où plusieurs cibles apparaissent simultanément à l'écran, exigeant une priorisation visuelle et un déclenchement moteur ultra-rapide avant expiration de chaque cible.",
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on réellement améliorer la vitesse de ses réflexes ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Si la vitesse de conduction nerveuse périphérique est en grande partie biologique, le temps de traitement cérébral (discrimination du stimulus et sélection de la réponse motrice) peut être réduit de 20 à 30 % grâce à un entraînement régulier (Donders, 1868).',
      },
    },
    {
      '@type': 'Question',
      name: "Quelle est la différence entre temps de réaction simple et temps de réaction de choix ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le temps de réaction simple (SRT) implique une réponse unique à un stimulus unique (~180–220 ms). Le temps de réaction de choix (CRT) propose plusieurs cibles ou options motrices, ce qui impose une étape de discrimination cognitive ajoutant 60 à 150 ms de latence.',
      },
    },
    {
      '@type': 'Question',
      name: "Comment la loi de Hick affecte-t-elle l'agilité face à plusieurs cibles ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "La loi de Hick-Hyman (Hick, 1952 ; Hyman, 1953) démontre que le temps de décision croît de façon logarithmique selon le nombre de choix possibles. L'entraînement permet au cerveau de regrouper les cibles en motifs géométriques pour compresser ce délai.",
      },
    },
    {
      '@type': 'Question',
      name: "Qu'est-ce que l'attention partagée dans le jeu vidéo et l'esport ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "L'attention partagée (ou divisée) est l'aptitude à surveiller et traiter plusieurs sources visuelles distinctes sans tomber dans l'effet tunnel. Selon le modèle de Broadbent (1958), la pratique élargit la bande passante perceptuelle et accélère la commutation attentionnelle.",
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la meilleure trajectoire pour éliminer un groupe de cibles ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Reliez mentalement les cibles par le chemin géométrique le plus court (ligne ou arc fluide) et priorisez les cibles dont le décompte est le plus critique, plutôt que de déplacer le curseur de façon chaotique.",
      },
    },
    {
      '@type': 'Question',
      name: "Pourquoi ressent-on un ralentissement face à des stimuli successifs très rapides ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Ce phénomène s'appelle la période réfractaire psychologique (Welford, 1952) : lorsque le système nerveux central traite un premier événement sensoriel, le traitement du stimulus suivant est mis en file d'attente s'il survient dans les 300 ms.",
      },
    },
    {
      '@type': 'Question',
      name: "Quel est l'impact du taux de rafraîchissement de l'écran sur les réflexes ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Un écran 60 Hz n'affiche une nouvelle image que toutes les 16,7 ms. Un moniteur 144 Hz descend à 6,9 ms et un 240 Hz à 4,1 ms, éliminant le flou de mouvement et révélant les cibles plus tôt pour votre système visuel (Woods et al., 2015).",
      },
    },
    {
      '@type': 'Question',
      name: "Combien de temps faut-il s'entraîner chaque jour ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Une session ciblée de 10 à 15 minutes par jour suffit amplement à stimuler la plasticité neuronale et les réflexes moteurs sans saturer le système nerveux ni fatiguer les tendons du poignet.",
      },
    },
    {
      '@type': 'Question',
      name: 'Ce test de réflexes est-il gratuit et sans inscription ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui. L'exercice SkillDrills est 100 % gratuit, s'exécute directement dans le navigateur sans aucun téléchargement et horodate chaque interaction avec l'API High Resolution Time (performance.now()).",
      },
    },
  ],
};

const reflexDrillGuide = {
  heading: "Guide d'Entraînement des Réflexes : Acquisition Multi-Cibles & Vitesse de Réaction",
  intro: [
    "L'entraînement des réflexes comble le fossé entre la réaction simple face à un stimulus unique et la réaction de choix dans un environnement dynamique. Dans les jeux vidéo compétitifs (Valorant, CS2, Overwatch) et les sports de réaction rapide, les menaces n'arrivent presque jamais isolées : plusieurs stimuli apparaissent en même temps sur des angles visuels étendus, nécessitant une analyse instantanée et des choix d'engagement décisifs.",
    "Les fondements de la chronométrie mentale établis par Donders (1868) séparent la réaction simple (Type A) de la réaction de choix (Type B), qui exige une discrimination sensorielle et une sélection motrice. D'après la loi de Hick-Hyman (Hick, 1952 ; Hyman, 1953), le temps de décision augmente proportionnellement au logarithme du nombre d'alternatives. Broadbent (1958) a formalisé les limites de l'attention partagée humaine, tandis que Welford (1952) a mis en évidence la période réfractaire psychologique (PRP), un goulot d'étranglement central qui retarde la réponse aux stimuli consécutifs trop rapprochés.",
    "Cet exercice s'exécute entièrement côté client à l'aide de l'API Canvas 2D HTML5 et de la boucle requestAnimationFrame. Chaque frappe est horodatée via l'API High Resolution Time (performance.now()). La résolution des minuteurs de navigateur est volontairement quantifiée pour des raisons de sécurité (environ 1 ms), et l'écran introduit sa propre quantification : ~16,7 ms par image à 60 Hz, ~6,9 ms à 144 Hz et ~4,1 ms à 240 Hz (Woods et al., 2015). Le taux d'interrogation de la souris (polling rate) ajoute ~8 ms à 125 Hz contre ~1 ms à 1000 Hz. En pratique, les variations inférieures à 5 ms relèvent du bruit de mesure.",
    "Mesure locale et confidentielle : tous les calculs sont effectués en local sur votre machine sans téléversement de vos résultats. Comparez vos performances sur le même matériel afin de suivre votre progression neuromusculaire réelle au fil des semaines.",
  ],
  benchmarks: {
    title: "Paliers de Vitesse d'Acquisition Multi-Cibles",
    headers: ['Délai Moyen par Cible', 'Niveau de Performance', 'Profil de Décision', 'Caractéristiques Cognitives', 'Axe de Travail Prioritaire'],
    rows: [
      ['< 250 ms / cible', 'Apex / Pro', 'Délai de choix quasi nul', 'Regroupement spatial immédiat sans pénalité de Hick', 'Maintenir la vitesse sur les rafales les plus denses'],
      ['250 – 320 ms / cible', 'Élite', 'Latence de décision compressée', 'Priorisation rapide et transitions saccadiques fluides', 'Réduire le temps de maintien entre deux clics consécutifs'],
      ['321 – 400 ms / cible', 'Compétiteur Avancé', 'Temps de choix standard', 'Bonne précision initiale avec légère hésitation en périphérie', 'Élargir le champ visuel périphérique pour repérer les cibles excentrées'],
      ['401 – 500 ms / cible', 'Intermédiaire', 'Charge cognitive notable', 'Réflexe solide sur cible isolée ; hésitation sur amas denses', 'Prioriser strictement les cibles dont le compte à rebours expire'],
      ['> 500 ms / cible', 'En Développement', 'Retard de décision élevé', 'Sensible au goulot d étranglement PRP et recherche visuelle lente', 'Construire des trajectoires géométriques propres avant d accélérer'],
    ],
    note: "Ces paliers constituent une référence empirique fondée sur les travaux en chronométrie humaine (Donders, 1868 ; Hick, 1952). La latence matérielle et le taux de rafraîchissement influencent les scores.",
  },
  techniques: {
    title: "Techniques d'Optimisation des Réflexes Multi-Cibles",
    items: [
      {
        name: "Triage et Séquençage du Chemin le Plus Court",
        desc: "Dès l'apparition d'un groupe de cibles, visualisez le tracé le plus direct reliant les points au lieu de sauter au hasard à travers l'écran. Éliminer les cibles selon un arc ou une ligne continue réduit la distance parcourue par la main.",
        tips: "Considérez le groupe comme une forme globale unique plutôt que comme des points individuels.",
      },
      {
        name: "Détection Périphérique Anticipée",
        desc: "Votre vision fovéale centrale sert au clic précis, mais votre rétine périphérique est beaucoup plus véloce pour détecter les flashs soudains. Utilisez des repères périphériques pour localiser la cible suivante pendant que votre main clique la cible en cours.",
        tips: "Gardez votre regard au centre du groupe de cibles plutôt que de fixer continuellement votre curseur.",
      },
      {
        name: "Freinage Net et Précision d'Arrêt",
        desc: "L'enchaînement de cibles rapides exige une décélération immédiate. Dépasser une cible (overshoot) et devoir rectifier sa trajectoire fait perdre 50 à 100 ms par cible. Entraînez-vous à stopper net au centre de chaque cible.",
        tips: "Optez pour un tapis de souris axé sur le contrôle si votre curseur glisse au-delà des cibles.",
      },
      {
        name: "Échauffement Neuromusculaire",
        desc: "La réactivité nerveuse dépend de l'état d'éveil du système nerveux central, de la température corporelle et du sommeil. Cinq à dix minutes d'exercices de réflexes avant une partie compétitive augmentent sensiblement la vivacité de base.",
        tips: "Veillez à garder les mains et les doigts au chaud pour maximiser la vitesse de conduction axonale.",
      },
    ],
  },
  steps: [
    "Configurez la durée et la difficulté de la session, puis cliquez sur Commencer l'exercice.",
    "Fixez votre regard au centre de l'espace d'entraînement.",
    "Dès que la rafale de cibles apparaît, identifiez immédiatement l'ordre de passage optimal.",
    "Cliquez sur chaque cible avec précision avant la fin de son décompte.",
    "Terminez la session pour consulter votre temps moyen par cible et votre taux d'élimination.",
  ],
  audience: "Joueurs de FPS compétitifs (Valorant, CS2, R6 Siege), adeptes de battle royale, athlètes esport, pratiquants d'arts martiaux et toute personne souhaitant développer des réflexes moteurs vifs.",
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('donders1969', 'hick1952', 'hyman1953', 'welford1952', 'woods2015'),
  related: [
    { href: '/fr/drills/reaction-speed', label: 'Hub Vitesse de Réaction' },
    { href: '/fr/drills/reaction-speed/reaction-time-test', label: 'Test de Temps de Réaction' },
    { href: '/fr/drills/reaction-speed/reaction-game', label: 'Jeu de Réflexe et de Réaction' },
    { href: '/fr/drills/reaction-speed/fps-tracking-trainer', label: 'Entraîneur de Suivi FPS' },
  ],
};

export default function FrenchReflexTrainingDrillPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ReflexTrainingDrillWrapper copy={{ title: 'Entraînement des Réflexes' }} />
      <DrillGuide guide={reflexDrillGuide} />
      <DrillFooter />
    </>
  );
}
