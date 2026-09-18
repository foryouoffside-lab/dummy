import FingerSequencingClient from '@/app/drills/motor/movement-speed/finger-sequencing/FingerSequencingClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Aim Trainer Séquentiel – Vitesse des Doigts | SkillDrills',
  description: 'Entraîneur de visée séquentielle gratuit. Améliorez la vitesse de transition entre cibles ordonnées, la motricité des doigts et la précision du clic.',
  keywords: [
    'aim trainer sequentiel',
    'entrainement de visee en sequence',
    'test de vitesse des doigts',
    'clics sequentiels test',
    'target switching entrainement',
    'changement rapide de cible souris',
    'exercices de visee valorant cs2',
    'coordination motrice des doigts',
    'precision de clic en ligne',
    'test de vitesse de clic souris',
    'vitesse de frappe et precision',
    'entrainement reflexe moteur souris',
  ],
  openGraph: {
    title: 'Aim Trainer Séquentiel – Vitesse des Doigts | SkillDrills',
    description: 'Entraîneur de visée séquentielle gratuit. Améliorez la vitesse de transition entre cibles ordonnées, la motricité des doigts et la précision du clic.',
    type: 'article',
    url: 'https://skilldrills.online/fr/drills/motor/movement-speed/finger-sequencing',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aim Trainer Séquentiel – Vitesse des Doigts | SkillDrills',
    description: 'Entraîneur de visée séquentielle gratuit. Améliorez la vitesse de transition entre cibles ordonnées.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/motor/movement-speed/finger-sequencing',
    languages: getAlternateLanguages('/drills/motor/movement-speed/finger-sequencing'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills', item: 'https://skilldrills.online/fr' },
    { '@type': 'ListItem', position: 2, name: 'Contrôle Moteur', item: 'https://skilldrills.online/fr/drills/motor' },
    { '@type': 'ListItem', position: 3, name: 'Vitesse de Mouvement', item: 'https://skilldrills.online/fr/drills/motor/movement-speed' },
    { '@type': 'ListItem', position: 4, name: 'Aim Trainer Séquentiel', item: 'https://skilldrills.online/fr/drills/motor/movement-speed/finger-sequencing' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Aim Trainer Séquentiel – Vitesse des Doigts',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Entraîneur de visée séquentielle gratuit sur navigateur. Évaluez la rapidité d’acquisition de cibles ordonnées, la trajectoire du curseur et l’agilité des doigts.',
  url: 'https://skilldrills.online/fr/drills/motor/movement-speed/finger-sequencing',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Aim Trainer Séquentiel',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Nécessite le support HTML5 Canvas et JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  url: 'https://skilldrills.online/fr/drills/motor/movement-speed/finger-sequencing',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Aim Trainer Séquentiel – Test de Doigts',
  url: 'https://skilldrills.online/fr/drills/motor/movement-speed/finger-sequencing',
  description: 'Mesurez la rapidité de transition entre cibles ordonnées selon des programmes moteurs sériels.',
  genre: ['Aim Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Qu’est-ce qu’un aim trainer séquentiel ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Il s’agit d’un exercice de motricité et de réflexe où l’utilisateur doit cliquer sur plusieurs cibles dans un ordre numérique ou de taille strict avant la fin du chronomètre. Il développe l’acquisition balistique, le balayage visuel et la fluidité des trajectoires.',
      },
    },
    {
      '@type': 'Question',
      name: 'En quoi le clic ordonné améliore-t-il la visée sur Valorant et CS2 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lors d’affrontements contre plusieurs adversaires, il est impératif d’enchaîner les tirs sans temps mort. L’entraînement séquentiel conditionne le cortex moteur à pré-programmer des blocs gestuels (Lashley 1951), supprimant l’hésitation entre deux cibles.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle différence avec un simple test de CPS (clics par seconde) ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un test de CPS mesure le spamming sur un point immobile. L’exercice séquentiel associe la cadence de frappe au déplacement spatial sous la loi de Fitts, exigeant décélération antagoniste et micro-ajustements précis.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi la taille des cibles diminue-t-elle dans la séquence ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ce rétrécissement reproduit le schéma réel du tir tactique : un premier flick large sur une grande zone (le torse), immédiatement suivi de micro-corrections millimétrées sur des zones critiques plus réduites (la tête/headshot).',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle sensibilité de souris choisir pour cet entraînement ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Conservez rigoureusement votre sensibilité habituelle en jeu (généralement entre 25 cm et 45 cm pour un tour complet à 360°). C’est la condition indispensable pour transférer la mémoire musculaire acquise vers vos parties compétitives.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qu’appelle-t-on "chunking moteur" (Lashley 1951) ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'C’est le processus neurologique par lequel le cerveau regroupe plusieurs gestes distincts en un programme moteur unique. Au lieu de recalculer chaque arrêt, le joueur déroule une séquence fluide, ce qui réduit le temps de réaction de 40 à 60 %.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien de minutes par jour consacrer à cet exercice ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Une session de 10 à 15 minutes par jour, découpée en 3 ou 4 séries courtes séparées par 60 secondes de pause. Travailler sur une fatigue musculaire excessive dégrade la coordination fine.',
      },
    },
    {
      '@type': 'Question',
      name: 'Cet exercice est-il utile pour les jeux de rythme comme osu! ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolument. L’anticipation visuelle des motifs géométriques et la frappe ordonnée en rythme renforcent directement la précision et la régularité du tapping sur les beatmaps.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle configuration matérielle offre les mesures les plus fidèles ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un écran à taux de rafraîchissement élevé (144 Hz ou plus), une souris gamer cadencée à 1000 Hz et la désactivation de l’accélération du curseur sous Windows pour garantir un suivi linéaire 1:1 parfait.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment le score de précision (Accuracy) est-il calculé ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Il correspond au ratio de cibles cliquées dans le bon ordre par rapport au total des clics émis (y compris les clics manqués dans le vide ou hors séquence). Conserver plus de 95 % à haut niveau témoigne d’une maîtrise parfaite.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Comment S’entraîner au Clic Séquentiel et Développer sa Vitesse',
  description: 'Guide étape par étape pour maîtriser l’acquisition rapide de cibles multiples ordonnées.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Analyser la Disposition des Cibles',
      text: 'Balayez du regard l’écran pour planifier mentalement le chemin géométrique le plus direct.',
      url: 'https://skilldrills.online/fr/drills/motor/movement-speed/finger-sequencing#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Engager Immédiatement la Première Cible',
      text: 'Exécutez un flick rapide vers le nœud initial et déclenchez le premier clic pour lancer la séquence.',
      url: 'https://skilldrills.online/fr/drills/motor/movement-speed/finger-sequencing#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Enchaîner les Cibles dans l’Ordre Strict',
      text: 'Progressez avec fluidité d’une cible à l’autre (1 vers 2 vers 3) en maintenant une cadence régulière.',
      url: 'https://skilldrills.online/fr/drills/motor/movement-speed/finger-sequencing#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Analyser la Latence et l’Efficacité du Trajet',
      text: 'Consultez votre temps moyen de transition, la vitesse globale et le pourcentage de précision sur la fiche récapitulative.',
      url: 'https://skilldrills.online/fr/drills/motor/movement-speed/finger-sequencing#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('lashley1951', 'keele1968', 'fitts1954', 'mackenzie1992', 'woods2015'),
  intro: {
    title: 'Fondements Scientifiques du Clic Séquentiel',
    paragraphs: [
      'L’acquisition ordonnée de cibles est un contrôle moteur supérieur : chaque transition entre deux points suit la loi de Fitts (Fitts, 1954 ; MacKenzie, 1992), le temps de déplacement dépendant du ratio distance/taille. L’ordre lui-même est pré-organisé dans le cortex sous forme de programme moteur unifié (Lashley, 1951 ; Keele, 1968).',
      'Mesures dans le navigateur : L’horloge interne performance.now() et le taux de rafraîchissement d’écran (16,7 ms à 60 Hz ; 4,1 ms à 240 Hz) quantifient les mesures. Toute variation inférieure à 5 ms relève de la tolérance technique normale.',
    ],
  },
  benchmark: {
    title: 'Tableau des Performances et Paliers en Clic Séquentiel',
    description: 'Baremage basé sur la latence de transition entre clics (Inter-Tap Latency), le palier de difficulté atteint et la précision.',
    columns: ['Tier', 'Rang', 'Latence Inter-Clics', 'Palier Atteint', 'Précision de Chaîne', 'Catégorie'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Séquenceur Apex (Apex Sequencer)',
        stat: 'Moins de 180 ms',
        level: 'Niveau 12+',
        accuracy: '98–100%',
        percentile: 'Top 1% (Élite)',
      },
      {
        tier: 'Tier 2',
        rank: 'Maître Tacticien (Master Tactician)',
        stat: '180–230 ms',
        level: 'Niveau 9–11',
        accuracy: '95–97%',
        percentile: 'Top 5% (Avancé)',
      },
      {
        tier: 'Tier 3',
        rank: 'Opérateur Qualifié (Proficient Operator)',
        stat: '230–300 ms',
        level: 'Niveau 6–8',
        accuracy: '90–94%',
        percentile: 'Top 20% (Solide)',
      },
      {
        tier: 'Tier 4',
        rank: 'Cliqueur Intermédiaire (Intermediate Clicker)',
        stat: '300–400 ms',
        level: 'Niveau 3–5',
        accuracy: '82–89%',
        percentile: 'Moyenne Standard',
      },
      {
        tier: 'Tier 5',
        rank: 'Séquenceur Débutant (Novice Sequencer)',
        stat: 'Plus de 400 ms',
        level: 'Niveau 1–2',
        accuracy: 'Moins de 82%',
        percentile: 'Débutant',
      },
    ],
  },
  protocols: {
    title: 'Protocoles d’Entraînement Méthodiques',
    description: 'Méthodes reconnues pour optimiser la cadence de transition et le centrage.',
    items: [
      {
        title: 'Protocole 1 : Chunking Moteur Hiérarchique (Lashley 1951)',
        description: 'Analysez l’ensemble des cibles avant d’enclencher le premier clic. Conservez la trajectoire complète en mémoire pré-motrice afin d’éliminer les arrêts intermédiaires.',
      },
      {
        title: 'Protocole 2 : Cadence Balistique en Boucle Ouverte (Keele 1968)',
        description: 'Franchissez les grandes distances à vitesse maximale sans hésiter à mi-parcours, puis appliquez un freinage net dès l’abord de la cible.',
      },
      {
        title: 'Protocole 3 : Décélération Fine sur Cibles Réduites',
        description: 'Adaptez la force d’arrêt au rétrécissement des cercles : mouvements amples du bras pour le départ, micro-ajustements du poignet et des doigts pour la fin.',
      },
      {
        title: 'Protocole 4 : Cadence Régulière et Tempo Métronomique',
        description: 'Préservez un rythme de clic régulier. Se précipiter désordonnément provoque des tirs ratés et des pénalités de temps dommageables.',
      },
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

export default function FrenchFingerSequencingPage() {
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
      <FingerSequencingClient copy={{ title: 'Aim Trainer Séquentiel' }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/drills/motor/movement-speed/finger-sequencing" />
      </div>
    </>
  );
}
