import BarrierSequencePursuitClient from '@/app/drills/reaction-speed/barrier-sequence-pursuit/BarrierSequencePursuitWrapperLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS – fr-FR (reaction-speed / barrier-sequence-pursuit)
// PRIMARY DOMESTIC: "entraînement jiggle peek" / "tenir une ligne fps"
// SECONDARY / LSI:
//   "peeker advantage counter" / "visée d attente fps"
//   "shoulder peek entraînement" / "contre mitraillage fps"
// ============================================================

export const metadata = {
  title: 'Entraînement Jiggle Peek – Tenir une Ligne | SkillDrills',
  description: 'Entraînement de jiggle peek et ligne défensive gratuit en ligne. Apprenez à contrer le peeker advantage et ajuster le décalage de visée sur navigateur.',
  keywords: [
    'entrainement jiggle peek',
    'tenir une ligne fps',
    'peeker advantage counter',
    'visee d attente fps',
    'shoulder peek entrainement',
    'contre mitraillage fps',
    'placement du reticule',
    'temps de reaction couverture',
    'decalage de visee cs2',
    'entrainement visee valorant',
    'exercices de reflexe coins',
    'peeking defensif en ligne',
  ],
  openGraph: {
    title: 'Entraînement Jiggle Peek – Tenir une Ligne | SkillDrills',
    description: 'Entraînement de jiggle peek et ligne défensive gratuit en ligne. Apprenez à contrer le peeker advantage et ajuster le décalage de visée sur navigateur.',
    type: 'article',
    url: 'https://skilldrills.online/fr/drills/reaction-speed/barrier-sequence-pursuit',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Entraînement Jiggle Peek – Tenir une Ligne | SkillDrills',
    description: 'Entraînement de jiggle peek et ligne défensive gratuit en ligne. Apprenez à contrer le peeker advantage et ajuster le décalage de visée sur navigateur.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/reaction-speed/barrier-sequence-pursuit',
    languages: getAlternateLanguages('/drills/reaction-speed/barrier-sequence-pursuit'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://skilldrills.online/fr' },
    { '@type': 'ListItem', position: 2, name: 'Exercices', item: 'https://skilldrills.online/fr/drills' },
    { '@type': 'ListItem', position: 3, name: 'Vitesse de Réaction', item: 'https://skilldrills.online/fr/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'Entraînement Jiggle Peek', item: 'https://skilldrills.online/fr/drills/reaction-speed/barrier-sequence-pursuit' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Entraînement Jiggle Peek – Tenue de Ligne et Réflexes de Couverture',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Entraînement en ligne pour tenir des lignes défensives, contrer le peeker advantage et calibrer le décalage du réticule.',
  url: 'https://skilldrills.online/fr/drills/reaction-speed/barrier-sequence-pursuit',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  inLanguage: 'fr-FR',
  dateModified: '2026-09-15',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Entraîneur de Jiggle Peek',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'HTML5 Canvas, navigateur moderne compatible avec le Pointer Lock',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  url: 'https://skilldrills.online/fr/drills/reaction-speed/barrier-sequence-pursuit',
  inLanguage: 'fr-FR',
  dateModified: '2026-09-15',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Jiggle Peek Trainer – Jeu de Ligne Défensive et Tir Réflexe',
  url: 'https://skilldrills.online/fr/drills/reaction-speed/barrier-sequence-pursuit',
  description: 'Jeu de réflexe tactique pour perfectionner le temps de réaction aux angles et maîtriser le contre-mitraillage en FPS.',
  genre: ['Action', 'Entraîneur de Visée', 'FPS Tactique'],
  gamePlatform: ['Navigateur Web', 'Ordinateur'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Qu est-ce qu un entraîneur de jiggle peek ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'C est un outil de réflexe esport conçu pour simuler des sorties rapides d épaule derrière un obstacle et la tenue d angles étroits face à des assaillants en FPS.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qu est-ce que le peeker’s advantage ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'C est le décalage temporel créé par le ping réseau et l interpolation client-serveur (deWet & Straily, 2020), permettant à l attaquant en mouvement de voir le défenseur statique quelques millisecondes plus tôt.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment tenir une ligne pour contrer le peeker’s advantage ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ne collez jamais votre réticule contre le bord du mur. Décalez-le d environ 100 à 150 ms de distance de réaction humaine pour que l adversaire se jette directement dans votre tir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Que révèle la chronométrie mentale de Donders (1868) sur la tenue d angle ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Donders a établi que le traitement du stimulus visuel et la commande motrice imposent un délai minimal de 200 ms. Le décalage du réticule compense exactement cette inertie biologique.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi le shoulder peek (sortie d épaule) est-il si efficace ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Il ne montre que l épaule ou le bras pendant 50 à 100 ms afin d appâter les tirs de snipers sans exposer la hitbox de la tête.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qu est-ce que le contre-mitraillage (counter-strafing) ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'C est annuler l inertie de mouvement en appuyant brièvement sur la touche directionnelle opposée, ramenant instantanément la dispersion de l arme à zéro pour un premier tir parfaitement précis.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi le pré-placement du réticule économise-t-il du temps ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Il supprime le besoin d ajuster la visée par un flick. Au lieu d un mouvement de souris en 2D, l élimination devient un simple clic cadencé au bon timing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment le taux de rafraîchissement de l écran influence-t-il la tenue de ligne ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un écran 240 Hz rafraîchit l image toutes les 4,1 ms contre 16,7 ms à 60 Hz (Woods et al., 2015), offrant une marge d anticipation supérieure face aux sorties rapides.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la routine d entraînement recommandée pour le jiggle peek ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '10 minutes quotidiennes alternant tenue de lignes serrées et exercices de décalage rapide suffisent à ancrer l espacement correct du réticule.',
      },
    },
    {
      '@type': 'Question',
      name: 'Cet exercice de visée est-il gratuit ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, SkillDrills propose cet outil 100 % gratuitement dans le navigateur, sans téléchargement, installation ni inscription.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Comment S entraîner au Jiggle Peek et à la Tenue de Ligne',
  description: 'Guide méthodique en 4 étapes pour maîtriser l espacement du réticule, l anticipation du réflexe et les tirs de couverture.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Configurer la géométrie de couverture et l angle d engagement',
      text: 'Ajustez la position du mur selon les passages étroits caractéristiques de votre FPS tactique habituel.',
      url: 'https://skilldrills.online/fr/drills/reaction-speed/barrier-sequence-pursuit#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Appliquer le décalage de réticule selon le temps de réaction',
      text: 'Positionnez le réticule légèrement espacé du rebord du mur afin de compenser votre délai visuel naturel.',
      url: 'https://skilldrills.online/fr/drills/reaction-speed/barrier-sequence-pursuit#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Focaliser l attention sur le seuil d apparition',
      text: 'Conservez le regard braqué sur la ligne frontière de l obstacle pour détecter les premiers pixels de la cible.',
      url: 'https://skilldrills.online/fr/drills/reaction-speed/barrier-sequence-pursuit#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Déclencher le tir lors du franchissement',
      text: 'Actionnez le clic immédiat à la milliseconde où la cible traverse le plan de mire, sans tenter de corriger à la main.',
      url: 'https://skilldrills.online/fr/drills/reaction-speed/barrier-sequence-pursuit#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('donders1868', 'dewet2020', 'kosinski2008', 'woods2015'),
  intro: {
    title: 'Guide de Jiggle Peek et Tenue de Ligne Défensive',
    paragraphs: [
      'Dans les jeux compétitifs comme Valorant ou CS2, tenir un angle défensif ne se limite pas à attendre sans bouger. L erreur la plus fréquente consiste à coller son réticule au ras du mur, laissant l avantage total au joueur qui surgit (Peeker’s Advantage ; deWet & Straily, 2020).',
      'La chronométrie mentale de Donders (1868) prouve que le cerveau nécessite environ 200 ms pour convertir une information visuelle en déclenchement moteur. Les meilleurs compétiteurs décalent donc délibérément leur réticule de la distance exacte que franchira l adversaire durant ce laps de temps.',
      'Cet entraînement synchronise votre réflexe sur les écrans à haut rafraîchissement (Woods et al., 2015), transformant la défense d angle en un tir automatique et décisif.',
    ],
  },
  benchmarks: {
    title: 'Paliers de Performance en Tenue de Ligne et Couverture',
    headers: ['Niveau (Tier)', 'Classement', 'Temps de Réaction Ligne', 'Précision du Tir', 'Centile'],
    rows: [
      ['Tier 1', 'Grandmaster / Pro', '< 150 ms', '98 %+', 'Top 1 %'],
      ['Tier 2', 'Elite / Master', '150 – 190 ms', '94 – 97 %', 'Top 5 %'],
      ['Tier 3', 'Pro / Diamond', '191 – 240 ms', '88 – 93 %', 'Top 15 %'],
      ['Tier 4', 'Intermédiaire / Gold', '241 – 310 ms', '78 – 87 %', 'Top 50 %'],
      ['Tier 5', 'Débutant / Silver', '> 310 ms', '< 78 %', 'Base'],
    ],
    note: 'Barème fondé sur les données neurophysiologiques du temps de réaction (Donders, 1868 ; Kosinski, 2008) et les dynamiques de latence réseau (deWet & Straily, 2020).',
  },
  protocols: {
    title: 'Protocoles d Entraînement en 4 Phases',
    description: 'Étapes progressives pour inscrire la tenue de ligne dans la mémoire neuromotrice.',
    items: [
      {
        title: 'Configurer la géométrie de couverture et l angle d engagement',
        description: 'Ajustez la position du mur selon les passages étroits caractéristiques de votre FPS tactique habituel.',
      },
      {
        title: 'Appliquer le décalage de réticule selon le temps de réaction',
        description: 'Positionnez le réticule légèrement espacé du rebord du mur afin de compenser votre délai visuel naturel.',
      },
      {
        title: 'Focaliser l attention sur le seuil d apparition',
        description: 'Conservez le regard braqué sur la ligne frontière de l obstacle pour détecter les premiers pixels de la cible.',
      },
      {
        title: 'Déclencher le tir lors du franchissement',
        description: 'Actionnez le clic immédiat à la milliseconde où la cible traverse le plan de mire, sans tenter de corriger à la main.',
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

export default function FrenchBarrierSequencePursuitPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
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
      <BarrierSequencePursuitClient copy={{ title: 'Entraînement Jiggle Peek' }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="reaction-speed"
          currentHref="https://skilldrills.online/fr/drills/reaction-speed/barrier-sequence-pursuit"
        />
      </div>
    </>
  );
}
