import ReactionSimulatorWrapper from '@/app/drills/reaction-speed/reaction-game/ReactionSimulatorWrapperLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';

// ============================================================
// SEO RESEARCH FINDINGS — fr-FR (reaction-speed / reaction-game)
// PRIMARY DOMESTIC: "jeu de reflexe" — Top reflex gaming query in France
//                   "jeux de reflexe" — Plural gaming query
// SECONDARY / LSI:  "jeu de reaction" — Reaction game search
//                   "test de reflexe en ligne" — Reflex test online
//                   "jeux de rapidite" — Speed reaction games
// WINNER TITLE:     Jeu de Réflexe en Ligne – Test de Réaction | SkillDrills
// ============================================================

export const metadata = {
  title: 'Jeu de Réflexe en Ligne – Test de Réaction | SkillDrills',
  description:
    'Jeu de réflexe et de réaction en ligne gratuit : interceptez les cibles en chute rapide, entraînez votre suivi visuel et vos réflexes dans le navigateur.',
  keywords: [
    'jeu de reflexe',
    'jeux de reflexe',
    'jeu de reaction',
    'test de reflexe en ligne',
    'jeux de rapidite',
    'coordination oeil main',
    'reflexes fps souris',
    'cibles en chute',
    'entrainement reflexe en ligne',
    'vitesse de reaction jeu',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/reaction-speed/reaction-game',
    languages: getAlternateLanguages('/drills/reaction-speed/reaction-game'),
  },
  openGraph: {
    title: 'Jeu de Réflexe en Ligne – Test de Réaction | SkillDrills',
    description:
      'Jeu de réflexe et de réaction en ligne gratuit : interceptez les cibles en chute rapide, entraînez votre suivi visuel et vos réflexes dans le navigateur.',
    url: 'https://skilldrills.online/fr/drills/reaction-speed/reaction-game',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jeu de Réflexe en Ligne – Test de Réaction | SkillDrills',
    description:
      'Entraînez votre vitesse de réaction et vos réflexes visuels dans ce jeu gratuit sur navigateur sans téléchargement.',
  },
  robots: { index: true, follow: true },
};

// --- Structured Data Schemas ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills Accueil', item: 'https://skilldrills.online/fr' },
    { '@type': 'ListItem', position: 2, name: 'Exercices', item: 'https://skilldrills.online/fr/drills' },
    { '@type': 'ListItem', position: 3, name: 'Vitesse de Réaction', item: 'https://skilldrills.online/fr/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'Jeu de Réflexe', item: 'https://skilldrills.online/fr/drills/reaction-speed/reaction-game' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Jeu de Réflexe en Ligne – Interception de Cibles',
  alternateName: ['Jeu de Réflexe', 'Jeux de Réflexes', 'Jeu de Réaction en Ligne', 'Entraînement Réflexes FPS'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description:
    'Simulateur gratuit dans le navigateur pour intercepter des cibles en chute accélérée et entraîner la coordination œil-main et les réflexes visuels.',
  browserRequirements: 'Navigateur web moderne avec JavaScript (Chrome, Safari, Firefox, Edge)',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Jeu de Réflexe en Ligne — Test de Réaction | SkillDrills',
  url: 'https://skilldrills.online/fr/drills/reaction-speed/reaction-game',
  description:
    'Jeu gratuit sur navigateur pour mesurer et optimiser la vitesse de réaction et la coordination oculomotrice.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'Nécessite un navigateur moderne avec support JavaScript.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: 'Vitesse de Réaction, Réflexes Visuels, Suivi Vertical, Coordination Œil-Main',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Jeu de Réflexe et Interception Cinétique',
  url: 'https://skilldrills.online/fr/drills/reaction-speed/reaction-game',
  description: 'Interceptez des cibles en chute accélérée pour tester et développer vos réflexes moteurs.',
  genre: ['Reflex Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Comment Jouer au Jeu de Réflexe en Ligne',
  description: 'Protocole en 4 étapes pour intercepter les cibles descendantes et aiguiser vos réflexes visuels.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Lancer l\'Exercice',
      text: 'Cliquez sur « Démarrer l\'exercice » pour afficher l\'arène de réaction en plein écran.',
      url: 'https://skilldrills.online/fr/drills/reaction-speed/reaction-game#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Suivre les Cibles en Chute',
      text: 'Gardez un regard panoramique en haut de l\'écran pour repérer les sphères dès leur apparition.',
      url: 'https://skilldrills.online/fr/drills/reaction-speed/reaction-game#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Intercepter dans la Zone Haute',
      text: 'Cliquez sur les cibles dans le tiers supérieur de l\'écran pour engranger un maximum de points bonus.',
      url: 'https://skilldrills.online/fr/drills/reaction-speed/reaction-game#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Maintenir les Combos et Progresser',
      text: 'Enchaînez les frappes réussies pour déclencher le multiplicateur 3.0x et découvrez votre palier.',
      url: 'https://skilldrills.online/fr/drills/reaction-speed/reaction-game#step-4'
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
      name: 'Qu\'est-ce qu\'un jeu de réflexe ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un jeu de réflexe est un outil d\'entraînement interactif conçu pour évaluer et conditionner la rapidité de réponse neuromusculaire, la poursuite oculaire et la coordination œil-main face à des cibles mouvantes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quel est le temps de réaction visuel moyen chez l\'humain ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le temps de réaction simple moyen oscille entre 200 et 250 ms (Kosinski, 2008). Dans un jeu à choix multiple avec plusieurs couloirs de chute, la Loi de Hick (Hick, 1952) porte ce temps entre 250 et 350 ms.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi le suivi vertical (Vertical Tracking) est-il crucial dans les FPS ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dans des jeux comme Apex Legends ou Overwatch 2, les adversaires sautent, chutent et utilisent des propulseurs. Le suivi vertical garantit un contrôle fluide de l\'axe Y sans décrochage de réticule.',
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on réellement améliorer ses réflexes grâce aux jeux vidéo ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Une pratique répétée de l\'interception visuelle optimise la transmission synaptique et réduit les délais de commande motrice de 15 à 30 ms (Dye et al., 2009).',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la différence entre réaction simple et réaction de choix ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La réaction simple consiste à réagir à un signal unique prévisible. La réaction de choix impose d\'identifier d\'abord le couloir où tombe la sphère avant d\'envoyer l\'ordre moteur au doigt.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment maximiser son score dans ce jeu de réflexe ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La clé réside dans l\'interception des cibles dès le tiers supérieur de l\'écran, ce qui octroie des bonus temporels importants et maintient le multiplicateur de combo.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quel est le temps de réaction des joueurs professionnels d\'esport ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les pros de CS2 et Valorant affichent des temps de réaction de 150 à 190 ms, conférant un avantage décisif lors des duels en ligne.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi mes réflexes fluctuent-ils d\'un jour à l\'autre ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le manque de sommeil, la charge mentale, les rythmes circadiens et la latence d\'affichage des écrans 60Hz influent directement sur les temps de réponse.',
      },
    },
    {
      '@type': 'Question',
      name: 'Un écran 144Hz ou 240Hz apporte-t-il un réel avantage ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolument. Les dalles 144Hz (6,9 ms) ou 240Hz (4,1 ms) affichent les images bien plus rapidement qu\'un écran 60Hz (16,7 ms), réduisant le délai matériel de plus de 10 ms (Woods et al., 2015).',
      },
    },
    {
      '@type': 'Question',
      name: 'Le jeu fonctionne-t-il sur smartphone et tablette tactile ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Le canvas est entièrement adapté aux interactions tactiles et s\'exécute avec fluidité directement dans le navigateur mobile sans aucune installation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment fonctionne la difficulté adaptative ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Au fur et à mesure que les points et combos s\'accumulent, la vitesse de chute s\'accélère, la fréquence d\'apparition s\'intensifie et la taille des cibles diminue.',
      },
    },
    {
      '@type': 'Question',
      name: 'À quelle fréquence doit-on s\'entraîner ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Une session d\'échauffement de 5 à 10 minutes par jour avant vos parties compétitives suffit pour réveiller la coordination motrice sans fatiguer la main.',
      },
    },
  ],
};

const reactionGameGuideFr = {
  heading: 'Guide du Jeu de Réflexe : Suivi Vertical et Interception Cinétique',
  intro: [
    'Un jeu de réflexe est un outil d\'entraînement interactif conçu pour évaluer et conditionner la rapidité de réponse neuromusculaire, la poursuite oculaire et la coordination œil-main face à des cibles mouvantes.',
    'À la différence des tests de clic basiques à signal unique, ce jeu multi-couloirs mobilise le temps de réaction avec choix régi par la Loi de Hick (Hick, 1952) : le cerveau doit repérer les cibles en chute libre, calculer leur accélération et déclencher le clic avant qu\'elles n\'atteignent le bas de l\'écran.',
    'Méthodologie de Mesure & Latence : Les chronométrages sont réalisés en local par l\'API haute résolution performance.now(). Un écran 60Hz standard impose jusqu\'à 16,7 ms de délai d\'affichage, alors qu\'un écran gaming 144Hz (6,9 ms) ou 240Hz (4,1 ms) réduit drastiquement la latence matérielle (Woods et al., 2015).',
  ],
  benchmarks: {
    title: 'Tableau de Rendement et Paliers de Score du Jeu de Réflexe (45 secondes)',
    headers: ['Plage de Points', 'Niveau de Compétence', 'Profil Neuromusculaire', 'Objectif Recommandé'],
    rows: [
      ['15 000+ points', 'Grand Maître / Pro', 'Capture fovéale instantanée et libération motrice ultra-rapide', 'Maintenir son sang-froid lors des chutes simultanées multi-couloirs'],
      ['10 000 – 14 999 points', 'Élite Compétitive', 'Anticipation cinématique précise avec quasi aucun tir manqué', 'Intercepter les cibles dans le tiers supérieur de l\'écran'],
      ['6 000 – 9 999 points', 'Avancé', 'Réflexes constants et bonne adaptation aux vagues accélérées', 'Privilégier la vision périphérique plutôt que le suivi isolé'],
      ['2 500 – 5 999 points', 'Intermédiaire', 'Efficace sur cibles uniques, mis à l\'épreuve lors des vagues denses', 'Minimiser la course de la souris en gardant le curseur au centre'],
      ['< 2 500 points', 'Débutant', 'Clics purement réactifs avec hésitation perceptive', 'Prioriser la précision sur la vitesse pour installer un bon rythme'],
    ],
    note: 'Ces paliers s\'appuient sur la littérature neuroscientifique en chronométrie mentale et interception cinétique (Hick, 1952; Carpenter, 1988; Woods et al., 2015). Les moniteurs 60Hz ajoutent environ 16,7 ms de retard.',
  },
  techniques: {
    title: 'Mécaniques d\'Interception Cinétique et Réflexes',
    items: [
      {
        name: 'Interception en Zone Haute',
        desc: 'Cliquer sur les cibles dès leur arrivée en haut de l\'écran offre une marge de sécurité maximale et génère d\'importants bonus temporels.',
        tips: 'Placez votre curseur légèrement au-dessus du centre de l\'écran pour réduire les déplacements vers les nouvelles cibles.',
      },
      {
        name: 'Projection de Trajectoire et Anticipation',
        desc: 'Plutôt que de courir après une sphère déjà en chute, anticipez sa position 100 à 150 ms à l\'avance et laissez-la croiser votre réticule (Carpenter, 1988).',
        tips: 'La pré-activation des aires motrices corticales élimine les mouvements parasites et les surcorrections de la souris.',
      },
      {
        name: 'Vision Périphérique pour Détection Immédiate',
        desc: 'Fixer un couloir unique rend aveugle aux zones adjacentes. Maintenez un regard détendu au sommet de l\'écran.',
        tips: 'Les cellules à bâtonnets de la rétine périphérique réagissent beaucoup plus vite aux mouvements soudains.',
      },
      {
        name: 'Optimisation du Matériel et Fréquence de Scrutation',
        desc: 'Un écran 60Hz ajoute 16,7 ms par image, tandis qu\'un écran 240Hz descend à 4,1 ms (Woods et al., 2015).',
        tips: 'Utilisez une souris gamer avec polling rate à 1000Hz et désactivez la synchronisation verticale (V-Sync).',
      },
    ],
  },
  steps: [
    'Cliquez sur « Démarrer l\'exercice » pour ouvrir l\'arène en plein écran.',
    'Positionnez le curseur au centre haut avec une prise en main souple.',
    'Observez la ligne de chute avec un champ visuel large pour détecter les apparitions.',
    'Cliquez sur les cibles dans la partie supérieure avant qu\'elles ne prennent trop de vitesse.',
    'Enchaînez les cibles pour faire grimper le multiplicateur et évaluez votre rang.',
  ],
  audience: 'Joueurs de FPS avec duels verticaux (Apex Legends, Overwatch 2, Fortnite), athlètes en quête de réflexes aiguisés et toute personne souhaitant développer sa coordination œil-main.',
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('hick1952', 'carpenter1988', 'woods2015', 'kosinski2008'),
  related: [
    { href: '/fr/drills/reaction-speed/reaction-time-test', label: 'Test de Temps de Réaction' },
    { href: '/fr/drills/reaction-speed/reflex-training-drill', label: 'Entraînement des Réflexes' },
    { href: '/fr/drills/reaction-speed/fps-tracking-trainer', label: 'Entraîneur de Visée Tracking FPS' },
    { href: '/fr/drills/motor/movement-speed/rapid-tapping', label: 'Test CPS et Vitesse de Clic' },
  ],
};

export default function FrenchReactionGamePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <ReactionSimulatorWrapper copy={{ title: 'Jeu de Réflexe en Ligne' }} />
      <DrillGuide guide={reactionGameGuideFr} />
    </>
  );
}
