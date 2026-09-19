import KeyboardRecognitionClient from '@/app/drills/motor/movement-speed/keyboard-recognition/KeyboardRecognitionClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Test de Réaction Clavier – Vitesse de Touches | SkillDrills',
  description: 'Test de réaction et vitesse de clavier gratuit. Mesurez votre temps de réponse aux touches, réflexes sur keybinds et mémoire musculaire sur navigateur.',
  keywords: [
    'test de vitesse de clavier',
    'entrainement reflexe clavier',
    'test de reaction clavier en ligne',
    'entrainement raccourcis clavier gaming',
    'memoire musculaire clavier',
    'temps de reaction frappe clavier',
    'test de reflexes gamer clavier',
    'vitesse de frappe de touches',
    'entrainement touches gamer zqsd',
    'test d inhibition de frappe',
    'agilite motrice clavier',
    'test reflexe frappe instantanee',
  ],
  openGraph: {
    title: 'Test de Réaction Clavier – Vitesse de Touches | SkillDrills',
    description: 'Test de réaction et vitesse de clavier gratuit. Mesurez votre temps de réponse aux touches, réflexes sur keybinds et mémoire musculaire sur navigateur.',
    type: 'article',
    url: 'https://skilldrills.online/fr/drills/motor/movement-speed/keyboard-recognition',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Test de Réaction Clavier – Vitesse de Touches | SkillDrills',
    description: 'Test de réaction et vitesse de clavier gratuit. Mesurez votre temps de réponse aux touches et vos réflexes sur keybinds.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/motor/movement-speed/keyboard-recognition',
    languages: getAlternateLanguages('/drills/motor/movement-speed/keyboard-recognition'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills', item: 'https://skilldrills.online/fr' },
    { '@type': 'ListItem', position: 2, name: 'Contrôle Moteur', item: 'https://skilldrills.online/fr/drills/motor' },
    { '@type': 'ListItem', position: 3, name: 'Vitesse de Mouvement', item: 'https://skilldrills.online/fr/drills/motor/movement-speed' },
    { '@type': 'ListItem', position: 4, name: 'Test de Réaction Clavier', item: 'https://skilldrills.online/fr/drills/motor/movement-speed/keyboard-recognition' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Test de Réaction Clavier – Entraîneur de Keybinds',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Test de vitesse et réflexes de touches gratuit sur navigateur. Mesurez temps de réaction de choix, mémoire musculaire et contrôle inhibiteur.',
  url: 'https://skilldrills.online/fr/drills/motor/movement-speed/keyboard-recognition',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Test de Réaction Clavier',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Nécessite le support HTML5 Canvas et JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  url: 'https://skilldrills.online/fr/drills/motor/movement-speed/keyboard-recognition',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Test de Réaction Clavier – Réflexes Gamer',
  url: 'https://skilldrills.online/fr/drills/motor/movement-speed/keyboard-recognition',
  description: 'Mesurez la rapidité avec laquelle vous pressez la touche requise en réponse à des stimuli visuels selon la loi de Hick.',
  genre: ['Keyboard Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Qu’est-ce qu’un test de temps de réaction et de vitesse de clavier ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Il évalue le temps écoulé entre l’affichage d’un symbole à l’écran et la frappe de la touche physique correspondante sur votre clavier. Il mesure le temps de réaction de choix, l’orientation spatiale et le contrôle inhibiteur.',
      },
    },
    {
      '@type': 'Question',
      name: 'En quoi l’entraînement aux raccourcis est-il crucial dans les FPS ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dans des jeux comme Valorant ou CS2, déclencher des compétences ou switcher d’arme sous les tirs ennemis exige une spontanéité totale. Cet exercice automatise la réponse motrice sans que vous ayez à regarder vos doigts.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qu’est-ce que le temps de réaction de choix et la loi de Hick ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La loi de Hick (Hick 1952) démontre que le temps de réaction croît de façon logarithmique selon le nombre d’options. La mémoire musculaire réduit cette délibération cognitive pour l’amener au niveau d’un réflexe quasi instantané.',
      },
    },
    {
      '@type': 'Question',
      name: 'À quoi sert la fonction des pièges (Fake Prompts) ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Elle évalue l’inhibition motrice (paradigme du signal de stop de Logan 1984). Face à un piège, le cortex préfrontal doit interrompre la décharge motrice avant que le commutateur ne s’enfonce, évitant les lancements accidentels.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quel est le temps de réaction standard sur une touche de jeu ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un utilisateur non entraîné se situe entre 380 et 480 ms. Les joueurs réguliers atteignent 240 à 300 ms, tandis que les joueurs compétitifs d’élite descendent sous la barre des 240 ms.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment le mode séquentiel stimule-t-il la mémoire de travail ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En imposant des enchaînements rapides de 3 à 5 touches, il sollicite le chunking moteur et la mémoire de travail (Sternberg 1966). La séquence est exécutée comme un geste global et fluide.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quel clavier offre la latence la plus faible pour ces mesures ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un clavier mécanique à switchs linéaires, optiques ou à effet Hall magnétique (avec Rapid Trigger activé) et un taux de rafraîchissement USB de 1000 Hz garantissent une transmission électrique quasi instantanée.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien de minutes par jour consacrer à cet exercice ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '10 à 15 minutes par jour en 3 ou 4 séries courtes. L’adaptation neuronale est rapide, mais la fatigue cérébrale altère immédiatement la capacité de retenue sur les pièges.',
      },
    },
    {
      '@type': 'Question',
      name: 'Cet entraînement aide-t-il aussi sur les MOBA (LoL, Dota 2) ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Les enchaînements de sorts (A-Z-E-R / Q-W-E-R) et l’usage des objets actifs demandent une indépendance totale des doigts et une maîtrise spatiale instinctive.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment sont calculés les KPM (touches par minute) et la précision ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les KPM correspondent au nombre de touches validées divisé par la durée de session en minutes. La précision représente le ratio de touches correctes sur le total des appuis effectués.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Comment Développer sa Vitesse de Frappe et ses Réflexes Clavier',
  description: 'Procédure pour perfectionner ses temps de réponse aux touches et son contrôle inhibiteur.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Adopter la Position de Départ Gaming',
      text: 'Placez la main gauche sur votre groupe de touches de référence (tel que ZQSD ou WASD), doigts relâchés sur les switchs.',
      url: 'https://skilldrills.online/fr/drills/motor/movement-speed/keyboard-recognition#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Identifier le Symbole sans Regarder les Mains',
      text: 'Fixez le centre du moniteur. Dès l’apparition de la touche cible, déclenchez la trajectoire par simple mémoire proprioceptive.',
      url: 'https://skilldrills.online/fr/drills/motor/movement-speed/keyboard-recognition#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Enfoncer Franchement ou Bloquer l’Appui',
      text: 'Pressez la touche avec fermeté. Si un piège (Fake Prompt) surgit, stoppez net la frappe avant d’atteindre le point d’actionnement.',
      url: 'https://skilldrills.online/fr/drills/motor/movement-speed/keyboard-recognition#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Consulter la Latence et la Régularité KPM',
      text: 'Vérifiez votre temps moyen de réaction, votre vitesse de frappe en KPM et votre taux d’évitement des pièges sur la fiche récapitulative.',
      url: 'https://skilldrills.online/fr/drills/motor/movement-speed/keyboard-recognition#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('donders1868', 'hick1952', 'logan1984', 'sternberg1966', 'woods2015'),
  intro: {
    title: 'Fondements Scientifiques de la Vitesse de Clavier',
    paragraphs: [
      'La rapidité de frappe est modélisée par le temps de réaction de choix (Donders, 1868 ; Hick, 1952). Le traitement du signal visuel prend environ 200–250 ms, chaque option supplémentaire complexifiant la prise de décision. La pratique régulière automatise la commande nerveuse et réduit la phase délibérative.',
      'Mesures dans le navigateur : L’horloge interne performance.now() et la fréquence de rafraîchissement d’écran (16,7 ms à 60 Hz ; 4,1 ms à 240 Hz) quantifient les mesures. Les écarts sous les 5 ms font partie de la marge de tolérance technique.',
    ],
  },
  benchmark: {
    title: 'Tableau des Performances en Vitesse et Réflexe Clavier',
    description: 'Baremage pour évaluer votre progression. Comprend la latence sur touche unique, le rythme séquentiel (KPM) et la précision inhibitrice.',
    columns: ['Tier', 'Rang', 'Latence Touche Unique', 'Cadence KPM', 'Précision Inhibitrice', 'Catégorie'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Apex Keybinder',
        stat: 'Moins de 240 ms',
        level: '320+ KPM',
        accuracy: '98–100%',
        percentile: 'Top 1% (Élite)',
      },
      {
        tier: 'Tier 2',
        rank: 'Master Tactician',
        stat: '240–300 ms',
        level: '260–319 KPM',
        accuracy: '95–97%',
        percentile: 'Top 5% (Avancé)',
      },
      {
        tier: 'Tier 3',
        rank: 'Proficient Operator',
        stat: '300–380 ms',
        level: '200–259 KPM',
        accuracy: '90–94%',
        percentile: 'Top 20% (Solide)',
      },
      {
        tier: 'Tier 4',
        rank: 'Intermediate Typist',
        stat: '380–480 ms',
        level: '140–199 KPM',
        accuracy: '80–89%',
        percentile: 'Moyenne Standard',
      },
      {
        tier: 'Tier 5',
        rank: 'Novice Keybinder',
        stat: 'Plus de 480 ms',
        level: 'Moins de 140 KPM',
        accuracy: 'Moins de 80%',
        percentile: 'Débutant',
      },
    ],
  },
  protocols: {
    title: 'Protocoles d’Entraînement Méthodiques',
    description: 'Protocoles conçus pour accélérer l’influx cortico-spinal et renforcer le contrôle inhibiteur.',
    items: [
      {
        title: 'Protocole 1 : Compression de la Latence de Choix (Donders 1868)',
        description: 'Fixez l’écran sans regarder les doigts. Forcez le cortex pré-moteur à retrouver les touches par pure mémoire proprioceptive.',
      },
      {
        title: 'Protocole 2 : Partitionnement par Zones Fonctionnelles (Hick 1952)',
        description: 'Segmentez mentalement votre clavier en sous-ensembles (déplacements ZQSD, utilitaires et compétences, barre de chiffres) pour limiter l’entropie.',
      },
      {
        title: 'Protocole 3 : Inhibition par Signal d’Arrêt (Logan 1984)',
        description: 'Entraînez-vous à bloquer l’impulsion motrice sur les stimuli pièges avant que le switch n’atteigne son point de contact mécanique.',
      },
      {
        title: 'Protocole 4 : Chunking Moteur Séquentiel (Sternberg 1966)',
        description: 'Abordez les enchaînements de plusieurs touches comme une séquence indivisible, déclenchée d’un seul élan gestuel.',
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

export default function FrenchKeyboardRecognitionPage() {
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
      <KeyboardRecognitionClient />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/drills/motor/movement-speed/keyboard-recognition" />
      </div>
    </>
  );
}
