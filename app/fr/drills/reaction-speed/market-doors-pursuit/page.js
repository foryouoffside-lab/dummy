import MarketDoorsPursuitClient from '@/app/drills/reaction-speed/market-doors-pursuit/MarketDoorsPursuitWrapperLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS – fr-FR (reaction-speed / market-doors-pursuit)
// PRIMARY DOMESTIC: "entraînement prise d angle" / "nettoyer les angles fps"
// SECONDARY / LSI:
//   "technique du camembert fps" / "vérification des coins fps"
//   "réflexe ouverture de porte" / "tir réflexe angle mort"
// ============================================================

export const metadata = {
  title: 'Prise d Angle FPS – Nettoyage de Coins | SkillDrills',
  description: 'Entraînement de prise d angle et nettoyage de coins gratuit en ligne. Maîtrisez le camembert et les réflexes d embrasure pour FPS tactique sur navigateur.',
  keywords: [
    'entrainement prise d angle',
    'nettoyer les angles fps',
    'technique du camembert fps',
    'verification des coins fps',
    'reflexe ouverture de porte',
    'tir reflexe angle mort',
    'balayage visuel tactique',
    'temps de reaction embrasure',
    'pre aim entrainement',
    'visee tactique valorant',
    'exercices saccadiques angles',
    'jeu de reflexe fps navigateur',
  ],
  openGraph: {
    title: 'Prise d Angle FPS – Nettoyage de Coins | SkillDrills',
    description: 'Entraînement de prise d angle et nettoyage de coins gratuit en ligne. Maîtrisez le camembert et les réflexes d embrasure pour FPS tactique sur navigateur.',
    type: 'article',
    url: 'https://skilldrills.online/fr/drills/reaction-speed/market-doors-pursuit',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prise d Angle FPS – Nettoyage de Coins | SkillDrills',
    description: 'Entraînement de prise d angle et nettoyage de coins gratuit en ligne. Maîtrisez le camembert et les réflexes d embrasure pour FPS tactique sur navigateur.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/reaction-speed/market-doors-pursuit',
    languages: getAlternateLanguages('/drills/reaction-speed/market-doors-pursuit'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://skilldrills.online/fr' },
    { '@type': 'ListItem', position: 2, name: 'Exercices', item: 'https://skilldrills.online/fr/drills' },
    { '@type': 'ListItem', position: 3, name: 'Vitesse de Réaction', item: 'https://skilldrills.online/fr/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'Prise d Angle', item: 'https://skilldrills.online/fr/drills/reaction-speed/market-doors-pursuit' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Entraînement Prise d Angle et Nettoyage de Coins',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Entraînement en ligne à la prise d angle, technique du camembert et réflexes sur cibles en embrasure pour FPS tactiques.',
  url: 'https://skilldrills.online/fr/drills/reaction-speed/market-doors-pursuit',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  inLanguage: 'fr-FR',
  dateModified: '2026-09-15',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Entraîneur de Prise d Angle',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'HTML5 Canvas, navigateur moderne supportant le Pointer Lock',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  url: 'https://skilldrills.online/fr/drills/reaction-speed/market-doors-pursuit',
  inLanguage: 'fr-FR',
  dateModified: '2026-09-15',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Corner Checking Trainer – Nettoyage Tactique de Portes et Réflexes',
  url: 'https://skilldrills.online/fr/drills/reaction-speed/market-doors-pursuit',
  description: 'Jeu de réflexe et balayage d angles pour développer les saccades oculaires et la vitesse de réaction en FPS.',
  genre: ['Action', 'Entraînement Tactique', 'Vision Esports'],
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
      name: 'Qu est-ce que le nettoyage des coins (corner checking) en FPS tactique ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'C est la méthode méthodique consistant à inspecter les angles d embuscade potentiels un par un, pour ne jamais s exposer à plus d une ligne de tir ennemie à la fois.',
      },
    },
    {
      '@type': 'Question',
      name: 'En quoi consiste la technique du camembert (slicing the pie) ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Elle consiste à se déplacer en arc de cercle autour d un obstacle pour dévoiler progressivement de minces portions de la pièce afin d isoler les duels en 1 contre 1.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment les saccades oculaires interviennent-elles lors d une prise d angle ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'À chaque nouvel angle dévoilé, les yeux effectuent une saccade ultrarapide (20 à 40 ms ; Rayner, 1998) suivie d une fixation fovéale immédiate pour confirmer la présence d une menace.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi les joueurs se font-ils souvent éliminer en passant les coins ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les erreurs courantes sont le franchissement précipité (over-peeking), exposant le corps à plusieurs angles, ou la fixation passive du réticule sans scruter la profondeur de l espace.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quel est le rôle du pré-aiming lors du passage des portes ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le pré-aiming consiste à placer son réticule à hauteur de tête à travers le mur avant d apparaître, éliminant ainsi le délai de flick lors de l acquisition visuelle.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment l exercice dynamique de passage de portes renforce-t-il les réflexes ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Il fait surgir des cibles de façon imprévisible depuis des embrasures consécutives, mettant à l épreuve la vitesse de discrimination d angle et le freinage immédiat de la visée.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quel lien existe-t-il entre la chronométrie de Donders (1868) et la vérification des angles ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Contrairement à une réaction simple (~200 ms), plusieurs ouvertures imposent un temps de réaction de choix (Donders, 1868), le cerveau devant analyser la priorité avant le tir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quel avantage procurent les écrans 144 Hz ou 240 Hz lors des prises d angle ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les dalles à haut taux de rafraîchissement réduisent la latence d affichage sous 4 à 7 ms (Woods et al., 2015), permettant d apercevoir les premiers pixels de l adversaire plus vite.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien de temps faut-il consacrer par jour au nettoyage des angles ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Une session de 10 à 15 minutes avant vos parties compétitives suffit à ancrer des automatismes de balayage visuel et à éviter les rushs aveugles coûteux.',
      },
    },
    {
      '@type': 'Question',
      name: 'Cet outil d entraînement est-il totalement gratuit ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, SkillDrills propose cet outil 100 % gratuitement dans le navigateur, sans téléchargement, installation ni inscription préalable.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Comment S entraîner à la Prise d Angle et au Nettoyage de Coins',
  description: 'Guide en 4 étapes pour perfectionner la technique du camembert, les saccades oculaires et les tirs de réaction.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Analyser la géométrie de l embrasure et préparer les saccades',
      text: 'Identifiez l orientation de la porte ou du coin et définissez l ordre de priorité des lignes de vue à vérifier.',
      url: 'https://skilldrills.online/fr/drills/reaction-speed/market-doors-pursuit#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Découper l angle progressivement (technique du camembert)',
      text: 'Progressez en arc de cercle régulier en ne révélant qu une mince bande de vision à chaque déplacement.',
      url: 'https://skilldrills.online/fr/drills/reaction-speed/market-doors-pursuit#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Verrouiller la fovéa sur la cible émergente',
      text: 'Dès l apparition de la cible dans l embrasure, fixez instantanément son centre avec le regard sans bouger la tête.',
      url: 'https://skilldrills.online/fr/drills/reaction-speed/market-doors-pursuit#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Déclencher un tir centré et stabiliser la visée',
      text: 'Enregistrez le clic décisif au cœur de la cible avant qu elle ne dépasse votre seuil de franchissement.',
      url: 'https://skilldrills.online/fr/drills/reaction-speed/market-doors-pursuit#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('rayner1998', 'donders1868', 'woods2015'),
  intro: {
    title: 'Guide de Prise d Angle et Nettoyage Tactique de Coins',
    paragraphs: [
      'Dans les jeux de tir tactiques compétitifs comme Valorant ou CS2, la compétence la plus déterminante est la maîtrise de la prise d angle. Traverser des embrasures sans isoler chaque ligne de tir expose le joueur à plusieurs adversaires simultanés.',
      'La technique du camembert (Slicing the Pie) découpe l espace en sections géométriques sécurisées. À chaque portion dévoilée, le système visuel enchaîne des saccades rapides (Rayner, 1998) et des fixations fovéales pour détecter les adversaires dissimulés.',
      'Sur le plan cognitif, il s agit d un temps de réaction de choix (Choice RT ; Donders, 1868), le cerveau devant distinguer l espace vide de la menace active. Sur les écrans à haut rafraîchissement (Woods et al., 2015), un entraînement assidu automatise le pré-placement du réticule et réduit la latence au minimum.',
    ],
  },
  benchmarks: {
    title: 'Paliers de Performance en Nettoyage d Angles et Portes',
    headers: ['Niveau (Tier)', 'Classement', 'Temps d Identification', 'Précision du Tir', 'Centile'],
    rows: [
      ['Tier 1', 'Grandmaster / Pro', '< 160 ms', '98 %+', 'Top 1 %'],
      ['Tier 2', 'Elite / Master', '160 – 210 ms', '94 – 97 %', 'Top 5 %'],
      ['Tier 3', 'Pro / Diamond', '211 – 270 ms', '88 – 93 %', 'Top 15 %'],
      ['Tier 4', 'Intermédiaire / Gold', '271 – 350 ms', '78 – 87 %', 'Top 50 %'],
      ['Tier 5', 'Débutant / Silver', '> 350 ms', '< 78 %', 'Base'],
    ],
    note: 'Classification établie d après les études sur l oculomotricité et le temps de réaction de choix (Rayner, 1998 ; Donders, 1868) combinées aux performances du matériel moderne (Woods et al., 2015).',
  },
  protocols: {
    title: 'Protocoles d Entraînement en 4 Phases',
    description: 'Routines méthodiques pour transformer la recherche visuelle en réflexe neuromoteur instantané.',
    items: [
      {
        title: 'Analyser la géométrie de l embrasure et préparer les saccades',
        description: 'Identifiez l orientation de la porte ou du coin et définissez l ordre de priorité des lignes de vue à vérifier.',
      },
      {
        title: 'Découper l angle progressivement (technique du camembert)',
        description: 'Progressez en arc de cercle régulier en ne révélant qu une mince bande de vision à chaque déplacement.',
      },
      {
        title: 'Verrouiller la fovéa sur la cible émergente',
        description: 'Dès l apparition de la cible dans l embrasure, fixez instantanément son centre avec le regard sans bouger la tête.',
      },
      {
        title: 'Déclencher un tir centré et stabiliser la visée',
        description: 'Enregistrez le clic décisif au cœur de la cible avant qu elle ne dépasse votre seuil de franchissement.',
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

export default function FrenchMarketDoorsPursuitPage() {
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
      <MarketDoorsPursuitClient copy={{ title: 'Prise d Angle' }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="reaction-speed"
          currentHref="https://skilldrills.online/fr/drills/reaction-speed/market-doors-pursuit"
        />
      </div>
      <DrillFooter />
    </>
  );
}
