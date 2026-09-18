import DragAndDropClient from '@/app/drills/motor/hand-eye-coordination/drag-and-drop/DragAndDropClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Test Drag and Drop – Précision de Souris | SkillDrills',
  description: 'Test de drag and drop en ligne gratuit: Entrainez la precision de glisser-deposer a la souris, la deceleration du curseur et la loi de pilotage Accot-Zhai.',
  keywords: [
    'drag and drop test',
    'test drag and drop souris',
    'glisser deposer entrainement souris',
    'precision souris glisser',
    'controle du curseur test',
    'coordination motrice souris',
    'test souris en ligne gratuit',
    'deceleration souris fps',
    'loi de pilotage accot zhai',
    'gestion inventaire fps test',
    'entrainement souris rts',
    'motricite fine souris test',
  ],
  openGraph: {
    title: 'Test Drag and Drop – Précision de Souris | SkillDrills',
    description: 'Test de drag and drop en ligne gratuit: Entrainez la precision de glisser-deposer a la souris, la deceleration du curseur et la loi de pilotage Accot-Zhai.',
    type: 'article',
    url: 'https://skilldrills.online/fr/drills/motor/hand-eye-coordination/drag-and-drop',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Test Drag and Drop – Précision de Souris | SkillDrills',
    description: 'Test de drag and drop en ligne gratuit: Entrainez la precision de glisser-deposer a la souris, la deceleration du curseur et la loi de pilotage Accot-Zhai.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/motor/hand-eye-coordination/drag-and-drop',
    languages: getAlternateLanguages('/drills/motor/hand-eye-coordination/drag-and-drop'),
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
      name: 'Entraîneur Drag and Drop',
      item: 'https://skilldrills.online/fr/drills/motor/hand-eye-coordination/drag-and-drop',
    },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Test de Drag and Drop et Précision Souris',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Outil web gratuit pour évaluer et travailler la précision de glisser-déposer, la décélération du curseur et le relâchement.',
  url: 'https://skilldrills.online/fr/drills/motor/hand-eye-coordination/drag-and-drop',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-16',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Entraîneur de Drag and Drop',
  browserRequirements: 'Nécessite HTML5 Canvas et JavaScript activé',
  url: 'https://skilldrills.online/fr/drills/motor/hand-eye-coordination/drag-and-drop',
  applicationCategory: 'EducationalApplication',
  dateModified: '2026-09-16',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Jeu de Précision Drag and Drop',
  url: 'https://skilldrills.online/fr/drills/motor/hand-eye-coordination/drag-and-drop',
  description: 'Transportez des orbes vers des conteneurs mobiles en temps limité pour affiner votre motricité fine.',
  genre: ['Précision', 'Coordination Motrice', 'Esport'],
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
      name: 'Que mesure le test de Drag and Drop à la souris ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Il évalue la motricité fine continue : saisie de la cible, transport rectiligne sous contraction isométrique, freinage moteur et synchronisation exacte du relâchement du clic.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi glisser-déposer est plus difficile qu un simple clic ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Maintenir le bouton enfoncé impose une tension musculaire continue sur les fléchisseurs de l index. Cela accroît le frottement sur le tapis et réduit le débit moteur de 15% à 25% (MacKenzie et al., 1991).',
      },
    },
    {
      '@type': 'Question',
      name: 'Qu est-ce que la loi de pilotage d Accot-Zhai (Steering Law) ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Formulée en 1997 par Johnny Accot et Shumin Zhai, elle démontre que le temps de déplacement dans un corridor restreint est proportionnel à la distance divisée par la largeur du passage.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment éviter de dépasser (overshoot) le conteneur en mouvement ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Engagez les muscles extenseurs de l avant-bras environ 40 à 50 ms avant d entrer dans la cible pour amortir l élan cinétique avant de relâcher le switch.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle prise de souris favorise la stabilité en glisser-déposer ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La prise en paume (palm grip) offre un appui stable de l avant-bras pour les trajectoires directes, tandis que la prise en griffe (claw grip) favorise les micro-ajustements rapides.',
      },
    },
    {
      '@type': 'Question',
      name: 'En quoi cet exercice aide-t-il les joueurs de FPS et MOBA ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dans les FPS comme Apex Legends ou Warzone, il accélère le pillage de caisses (loot) et le swap d armure. Dans les RTS et MOBA, il optimise les sélections d unités en cadre.',
      },
    },
    {
      '@type': 'Question',
      name: 'Les graphistes et monteurs vidéo tirent-ils profit de cet exercice ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Monteurs vidéo et infographistes 3D effectuent des milliers d opérations de glisser-déposer par jour sur la timeline ; entraîner la décélération prévient les troubles musculosquelettiques.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment sont calculés les combos et les points ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Chaque dépôt réussi dans le récepteur alimente un multiplicateur de combo progressif pouvant atteindre 3.0x. Un relâchement hors zone réinitialise la série.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quels réglages matériels garantissent une précision optimale ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Désactivez l accélération du pointeur dans le système, adoptez une sensibilité entre 800 et 1600 DPI, un tapis en tissu régulier et un taux d interrogation de 1000 Hz.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quel temps d entraînement quotidien est recommandé ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Une session quotidienne de 10 à 15 minutes comprenant 4 à 6 séries de 45 secondes stabilise les schémas moteurs sans fatiguer les tendons du poignet.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Comment s entraîner à la précision de drag and drop',
  description: 'Protocole structuré en 4 étapes pour perfectionner la décélération, le guidage rectiligne et le relâchement.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Alignez le curseur sur l orbe source',
      text: 'Placez le pointeur de la souris précisément sur la sphère surlignée sur le canevas.',
      url: 'https://skilldrills.online/fr/drills/motor/hand-eye-coordination/drag-and-drop#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Maintenez le bouton gauche avec une pression souple',
      text: 'Exercez une force constante et modérée sur le clic pour agripper l objet sans raidir les doigts.',
      url: 'https://skilldrills.online/fr/drills/motor/hand-eye-coordination/drag-and-drop#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Guidez l objet le long d une trajectoire directe',
      text: 'Transportez la cible vers le conteneur en minimisant les oscillations latérales.',
      url: 'https://skilldrills.online/fr/drills/motor/hand-eye-coordination/drag-and-drop#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Relâchez avec précision au centre de la zone',
      text: 'Ouvrez les doigts dès que l orbe est aligné avec le conteneur pour valider le dépôt parfait.',
      url: 'https://skilldrills.online/fr/drills/motor/hand-eye-coordination/drag-and-drop#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('accot1997', 'mackenzie1991', 'fitts1954', 'elliott2010', 'woods2015'),
  intro: {
    title: 'Biomécanique du Glisser-Déposer, Guidage et Décélération Motrice',
    paragraphs: [
      'En interaction homme-machine, le glisser-déposer continu (drag and drop) présente un défi sensorimoteur fondamentalement distinct du simple pointage avec clic. Alors que le ciblage discret est décrit par la loi de Fitts (Fitts, 1954), le glisser-déposer exige une co-contraction isométrique prolongée des fléchisseurs digitaux pour maintenir le commutateur enfoncé tout en assurant une translation dynamique et fluide sur le tapis.',
      'Dans leur étude empirique de référence, MacKenzie, Sellen et Buxton (1991) ont mis en évidence que les tâches de glisser-déposer subissent une perte de débit moteur de 15% à 25% par rapport au simple clic. La pression d appui vertical altère le coefficient de friction des patins de la souris, restreint l articulation fine des phalanges et amplifie le bruit moteur.',
      'Par ailleurs, Johnny Accot et Shumin Zhai (1997) ont formulé la loi de pilotage (Steering Law) modélisant les déplacements dans des corridors contraints. Lors de tâches de glisser-déposer dynamiques, l utilisateur doit constamment contrebalancer l élan d accélération par une décélération antagoniste (Elliott et al., 2010) pour éviter tout dépassement de la zone de réception.',
      'Précision d échantillonnage du navigateur : Le chronométrage repose sur l horloge performance.now() du navigateur. Le taux de rafraîchissement de l écran (16,7 ms à 60 Hz, 6,9 ms à 144 Hz) et la fréquence de scrutation de la souris quantifient les mesures temporelles (Woods et al., 2015). SkillDrills conserve tous vos scores localement dans votre navigateur.',
    ],
  },
  benchmarks: {
    title: 'Niveaux de Performance et Barèmes de Drag and Drop',
    caption: 'Échelle d évaluation inspirée des modèles d Accot & Zhai (1997) et des travaux de MacKenzie et al. (1991). SkillDrills ne collecte aucune donnée externe.',
    headers: ['Palier (Tier)', 'Classification', 'Niveau et Combo', 'Temps Moyen de Transport', 'Taux de Réussite', 'Profil Neuromoteur'],
    rows: [
      [
        'Tier 1',
        'Élite / Pro Designer',
        'Nv. 12–15 (Combo > 18x)',
        '< 420 ms',
        '≥ 98,0%',
        'Profil de vitesse en cloche parfait, freinage immédiat, aucun relâchement prématuré.',
      ],
      [
        'Tier 2',
        'Avancé / Compétitif',
        'Nv. 9–11 (Combo 12–17x)',
        '420–510 ms',
        '94,0%–97,9%',
        'Décélération maîtrisée, guidage rectiligne rigoureux, micro-ajustements terminaux sous 35 ms.',
      ],
      [
        'Tier 3',
        'Compétent / Intermédiaire',
        'Nv. 6–8 (Combo 7–11x)',
        '511–640 ms',
        '87,0%–93,9%',
        'Léger dépassement en phase d accélération, ralentissement visible avant l entrée dans le récepteur.',
      ],
      [
        'Tier 4',
        'Débutant / En Progression',
        'Nv. 3–5 (Combo 3–6x)',
        '641–800 ms',
        '78,0%–86,9%',
        'Guidage saccadé en plusieurs à-coups, tension digitale trop forte provoquant des décrochages.',
      ],
      [
        'Tier 5',
        'Base / Novice',
        'Nv. 1–2 (Combo < 3x)',
        '> 800 ms',
        '< 78,0%',
        'Déplacement lent, relâchements fréquents hors récepteur, fatigue rapide des fléchisseurs.',
      ],
    ],
  },
  protocols: {
    title: 'Protocoles d Entraînement à la Précision Souris',
    items: [
      {
        title: 'Protocole 1 : Stabilisation de la Force Isométrique (Niveaux 1–4)',
        description: 'Appliquez uniquement la force minimale nécessaire pour maintenir le clic engagé sans crisper les doigts. Un excès de pression rigidifie le poignet et engendre des micro-tremblements.',
      },
      {
        title: 'Protocole 2 : Optimisation du Couloir Accot-Zhai (Niveaux 5–8)',
        description: 'Minimisez l écart spatial entre la prise et le récepteur. Visualisez un tunnel rectiligne imaginaire et éliminez tout balancement en arc de cercle.',
      },
      {
        title: 'Protocole 3 : Décélération Antagoniste et Freinage (Niveaux 9–12)',
        description: 'Contractez les muscles extenseurs de l avant-bras 50 ms avant d atteindre le récepteur mobile pour stopper la course pile à l apex spatial.',
      },
      {
        title: 'Protocole 4 : Interception Dynamique par Anticipation (Niveaux 13–15)',
        description: 'À grande vitesse, anticipez la trajectoire future du conteneur plutôt que sa position instantanée, en relâchant avec fluidité sur son point d arrivée.',
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

export default function DragAndDropPage() {
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
      <DragAndDropClient copy={{ title: "Entraîneur Drag and Drop" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="https://skilldrills.online/fr/drills/motor/hand-eye-coordination/drag-and-drop" />
      </div>
    </>
  );
}
