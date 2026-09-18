import PrecisionFlickShotClient from '@/app/drills/motor/hand-eye-coordination/precision-flick-shot/PrecisionFlickShotClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Test de Flick Shot – Précision de Souris FPS | SkillDrills',
  description: 'Test de flick shot et precision de souris gratuit: Evaluez la vitesse balistique, le freinage moteur et la precision plein centre pour CS2 et Valorant.',
  keywords: [
    'flick aim trainer',
    'test de flick shot',
    'test precision souris',
    'entrainement flick shot fps',
    'precision souris valorant',
    'entrainement aim cs2',
    'micro flick trainer',
    'tir reflexe souris test',
    'vitesse acquisition cible',
    'precision curseur test en ligne',
    'entrainement de visee souris',
    'flick shot gratuit navigateur',
  ],
  openGraph: {
    title: 'Test de Flick Shot – Précision de Souris FPS | SkillDrills',
    description: 'Test de flick shot et precision de souris gratuit: Evaluez la vitesse balistique, le freinage moteur et la precision plein centre pour CS2 et Valorant.',
    type: 'article',
    url: 'https://skilldrills.online/fr/drills/motor/hand-eye-coordination/precision-flick-shot',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Test de Flick Shot – Précision de Souris FPS | SkillDrills',
    description: 'Test de flick shot et precision de souris gratuit: Evaluez la vitesse balistique, le freinage moteur et la precision plein centre pour CS2 et Valorant.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/motor/hand-eye-coordination/precision-flick-shot',
    languages: getAlternateLanguages('/drills/motor/hand-eye-coordination/precision-flick-shot'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'SkillDrills Accueil',
      item: 'https://skilldrills.online/fr',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Entraînement Moteur',
      item: 'https://skilldrills.online/fr/drills/motor',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Coordination Œil-Main',
      item: 'https://skilldrills.online/fr/drills/motor/hand-eye-coordination',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Flick Shot de Précision',
      item: 'https://skilldrills.online/fr/drills/motor/hand-eye-coordination/precision-flick-shot',
    },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Test de Flick Shot et Précision Souris',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Outil en ligne gratuit d entraînement au flick shot. Évaluez la vitesse de déplacement balistique, le freinage moteur et les tirs plein centre.',
  url: 'https://skilldrills.online/fr/drills/motor/hand-eye-coordination/precision-flick-shot',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-16',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Entraîneur de Flick Shot',
  browserRequirements: 'Nécessite HTML5 Canvas et JavaScript activé',
  url: 'https://skilldrills.online/fr/drills/motor/hand-eye-coordination/precision-flick-shot',
  applicationCategory: 'EducationalApplication',
  dateModified: '2026-09-16',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Jeu de Tir Flick Shot et Précision FPS',
  url: 'https://skilldrills.online/fr/drills/motor/hand-eye-coordination/precision-flick-shot',
  description: 'Améliorez vos réflexes et la précision de vos tirs instantanés sur cibles dynamiques.',
  genre: ['Tir', 'Réflexes', 'Esport'],
  gamePlatform: ['Web Browser', 'Desktop'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-16',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Qu est-ce qu un flick shot dans les jeux de tir FPS ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un flick shot est un mouvement balistique ultra-rapide et discontinu permettant d aligner instantanément le curseur sur la cible avant de déclencher le tir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment fonctionne le modèle à deux phases de Woodworth (1899) ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Il établit que tout mouvement visé se compose d une première impulsion balistique majeure, suivie d une phase de contrôle visuel terminal pour l ajustement fin.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi la décélération motrice est-elle si importante ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Parce que dépasser la cible (overshoot) oblige à effectuer des micro-corrections pénalisantes en temps. Le freinage musculaire net stabilise le tir dès le premier impact.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quel est l avantage des points bonus au centre (bulls-eye) ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En récompensant les impacts dans le noyau de 8 pixels, le système nerveux est incité à resserrer la dispersion des tirs plutôt qu à se satisfaire des bords.',
      },
    },
    {
      '@type': 'Question',
      name: 'Cet entraînement aide-t-il directement sur CS2 et Valorant ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolument. La réussite des duels repose sur la précision du premier coup ; un micro-flick net élimine les tremblements lors des prises de ligne.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment réagir face à deux cibles simultanées ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Utilisez votre vision périphérique pour identifier la cible dont le cercle de vie expire le plus vite et détruisez-la avant d enchaîner sur la seconde.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle sensibilité et quel DPI choisir pour le flick ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'À 800 DPI, une sensibilité nécessitant 30 à 45 cm pour un tour complet à 360 degrés équilibre idéalement balayage du bras et micro-précision du poignet.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment sont calculés les scores et les grades ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le système compile le taux de précision au clic, la proportion de tirs plein centre, la série de combo et le temps d acquisition pour attribuer un rang de D à S+.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quels réglages matériels optimisent la vitesse de flick ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un écran 144 Hz ou plus, la désactivation de l accélération Windows et une souris légère (moins de 65 g) pour diminuer l inertie physique.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien de temps faut-il s entraîner par jour ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Une session de 10 à 15 minutes en pré-échauffement stimule les synapses motrices sans risquer de tendinite ou de fatigue du poignet.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Comment s entraîner aux flick shots et à la précision souris',
  description: 'Méthodologie progressive pour maîtriser les déplacements balistiques, les tirs plein centre et le freinage moteur.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Calibrez la sensibilité et fixez le réticule',
      text: 'Harmonisez les réglages avec votre jeu compétitif principal et focalisez le regard sur le réticule central.',
      url: 'https://skilldrills.online/fr/drills/motor/hand-eye-coordination/precision-flick-shot#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Repérez et priorisez la cible active',
      text: 'Balayez le canevas et évaluez les anneaux de décomposition pour engager en premier la cible la plus urgente.',
      url: 'https://skilldrills.online/fr/drills/motor/hand-eye-coordination/precision-flick-shot#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Exécutez un flick balistique direct',
      text: 'Propulsez le curseur d un geste net et fluide sans marquer d hésitation ou de saccade à mi-chemin.',
      url: 'https://skilldrills.online/fr/drills/motor/hand-eye-coordination/precision-flick-shot#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Freinez net sur le centre et cliquez',
      text: 'Activez les extenseurs du poignet pour figer le mouvement pile au centre de la cible avant de presser le bouton.',
      url: 'https://skilldrills.online/fr/drills/motor/hand-eye-coordination/precision-flick-shot#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('meyer1988', 'fitts1954', 'mackenzie1992', 'elliott2010', 'woodworth1899', 'woods2015'),
  intro: {
    title: 'Biomécanique des Micro-Flicks Balistiques et Optimisation des Mouvements',
    paragraphs: [
      'Dans le tir compétitif et les interactions homme-machine, le flick shot est un mouvement manuel rapide et discontinu produit sous contrainte temporelle extrême. Robert S. Woodworth (1899) a mis en évidence le fait que les actions orientées vers un but obéissent à un contrôle en deux étapes : une impulsion balistique initiale qui projette le membre vers la cible, suivie d une phase de contrôle continu visuel pour ajuster la position terminale.',
      'Dans leur modèle théorique majeur (Stochastic Optimized Submovement Model), David E. Meyer et al. (1988) ont démontré que la commande motrice humaine est sujette à un bruit neuronal proportionnel à la vitesse. Une accélération excessive élargit la dispersion finale. Si le premier élan manque la zone cible, un sous-mouvement correctif secondaire (latence de 150 à 200 ms) est inévitable.',
      'Pour maximiser l efficacité de visée (MacKenzie, 1992), les tireurs doivent ajuster la vitesse de l impulsion principale afin que la trajectoire atteigne directement la cible. La bonification des impacts plein centre (bulls-eye) conditionne le système nerveux à réduire la dispersion et à perfectionner le freinage antagoniste.',
      'Le compromis distance-taille répond à la loi de Fitts (Fitts, 1954), avec des éclairages biomécaniques récents issus des travaux d Elliott et al. (2010).',
      'Précision de mesure du navigateur : Les temps sont relevés avec performance.now(). Le rafraîchissement d écran (16,7 ms à 60 Hz, 6,9 ms à 144 Hz) et la fréquence de scrutation de la souris quantifient les données (Woods et al., 2015). Vos performances sont conservées localement dans votre navigateur.',
    ],
  },
  benchmarks: {
    title: 'Niveaux de Performance en Flick Shot et Précision Souris',
    caption: 'Échelle d évaluation inspirée des études de Woodworth (1899) et Meyer et al. (1988). SkillDrills n effectue aucune collecte externe de données.',
    headers: ['Palier (Tier)', 'Classification', 'Niveau et Combo', 'Latence Moyenne', 'Précision au Clic', 'Ratio Plein Centre', 'Profil Neuromoteur'],
    rows: [
      [
        'Tier 1',
        'Maître du Flick Apex',
        'Nv. 15+ (Combo > 20x)',
        '< 340 ms',
        '≥ 96,0%',
        '> 65%',
        'Trajectoires balistiques pures à impulsion unique, absence de mouvements secondaires, freinage < 10 ms.',
      ],
      [
        'Tier 2',
        'Tireur d Élite',
        'Nv. 11–14 (Combo 14–19x)',
        '340–420 ms',
        '91,0%–95,9%',
        '45%–64%',
        'Contrôle fovéal percutant, micro-ajustement sous 30 ms, dérive de trajectoire négligeable.',
      ],
      [
        'Tier 3',
        'Tireur Confirmé',
        'Nv. 7–10 (Combo 8–13x)',
        '421–520 ms',
        '84,0%–90,9%',
        '25%–44%',
        'Impacts fréquents en périphérie, légers dépassements lors des enchaînements rapides de cibles.',
      ],
      [
        'Tier 4',
        'Fragger en Progression',
        'Nv. 4–6 (Combo 4–7x)',
        '521–660 ms',
        '74,0%–83,9%',
        '10%–24%',
        'Corrections saccadées, dispersion accrue par suraccélération, hésitation avant le tir.',
      ],
      [
        'Tier 5',
        'Base / Novice',
        'Nv. 1–3 (Combo < 4x)',
        '> 660 ms',
        '< 74,0%',
        '< 10%',
        'Flicks trop courts, tirs manqués réguliers, réacquisition lente, coordination poignet-bras instable.',
      ],
    ],
  },
  protocols: {
    title: 'Protocoles d Entraînement pour Perfectionner le Flick',
    items: [
      {
        title: 'Protocole 1 : Calibrage de l Impulsion Balistique (Niveaux 1–4)',
        description: 'Privilégiez un geste fluide et direct sans à-coups. Fiez-vous à la mémoire motrice en boucle ouverte pour atteindre la cible sans marquer de temps d arrêt.',
      },
      {
        title: 'Protocole 2 : Minimisation des Sous-Mouvements de Meyer (Niveaux 5–8)',
        description: 'Visez délibérément le noyau central de 8 pixels. Réduire la cible virtuelle oblige le cortex moteur à resserrer le faisceau de dispersion.',
      },
      {
        title: 'Protocole 3 : Séquençage Prioritaire Multi-Cibles (Niveaux 9–12)',
        description: 'Lorsqu au moins deux cibles coexistent, fiez-vous à votre vision périphérique pour éliminer la cible la plus proche de l expiration avant de pivoter.',
      },
      {
        title: 'Protocole 4 : Freinage Antagoniste contre l Overshoot (Niveaux 13–15)',
        description: 'À grande vitesse, contractez activement les extenseurs du poignet pour bloquer net le curseur pile sur le centre sans glissement d inertie.',
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

export default function PrecisionFlickShotPage() {
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
      <PrecisionFlickShotClient copy={{ title: "Flick Shot de Précision" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="https://skilldrills.online/fr/drills/motor/hand-eye-coordination/precision-flick-shot" />
      </div>
    </>
  );
}
