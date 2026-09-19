import SteadyHandClient from '@/app/drills/motor/precision-control/steady-hand/SteadyHandClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — steady-hand (French: Jeu du Fil Électrique)
// PRIMARY:  "jeu du fil électrique"          — Cultural identity query
//           "jeu de la main ferme"           — Steadiness gaming query
// SECONDARY / LSI:
//           "test de précision souris"       — Diagnostic mouse test
//           "test de tremblement main en ligne" — Tremor assessment
//           "contrôle moteur fin souris"     — Fine motor control
//           "loi de direction d accot-zhai"  — Steering Law
//           "stabilité du curseur"           — Cursor stability
// ============================================================

export const metadata = {
  title: 'Jeu du Fil Électrique – Test de Précision et Dextérité',
  description: 'Jeu du fil électrique en ligne gratuit. Guidez le curseur dans un couloir sinueux sans toucher les bords. Mesurez votre stabilité selon la loi d\'Accot-Zhai.',
  keywords: [
    'jeu du fil électrique',
    'jeu de la main ferme',
    'test de précision souris',
    'test de tremblement main en ligne',
    'contrôle moteur fin souris',
    'parcours souris précision',
    'loi de direction d accot-zhai',
    'stabilité du curseur',
    'entraînement aim souris',
    'test de dextérité manuelle',
    'jeu du fil de fer en ligne',
    'coordination motrice fine',
  ],
  openGraph: {
    title: 'Jeu du Fil Électrique – Test de Précision et Dextérité | SkillDrills',
    description: 'Jeu du fil électrique en ligne gratuit. Guidez le curseur dans un couloir sinueux sans toucher les bords. Mesurez votre stabilité selon la loi d\'Accot-Zhai.',
    type: 'article',
    url: 'https://skilldrills.online/fr/drills/motor/precision-control/steady-hand',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jeu du Fil Électrique – Test de Précision et Dextérité | SkillDrills',
    description: 'Jeu du fil électrique en ligne gratuit. Guidez le curseur dans un couloir sinueux sans toucher les bords. Mesurez votre stabilité selon la loi d\'Accot-Zhai.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/motor/precision-control/steady-hand',
    languages: getAlternateLanguages('/drills/motor/precision-control/steady-hand'),
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://skilldrills.online/fr' },
    { '@type': 'ListItem', position: 2, name: 'Entraînement Moteur', item: 'https://skilldrills.online/fr/drills/motor' },
    { '@type': 'ListItem', position: 3, name: 'Contrôle de Précision', item: 'https://skilldrills.online/fr/drills/motor/precision-control' },
    { '@type': 'ListItem', position: 4, name: 'Jeu du Fil Électrique', item: 'https://skilldrills.online/fr/drills/motor/precision-control/steady-hand' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Jeu du Fil Électrique – Test de Précision Souris et Tremblement',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Jeu du fil électrique et test de motricité fine gratuit sur navigateur. Guidez votre curseur dans des couloirs de plus en plus étroits et évaluez votre stabilité manuelle.',
  url: 'https://skilldrills.online/fr/drills/motor/precision-control/steady-hand',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online/fr' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Jeu du Fil Électrique en Ligne',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Navigateur moderne avec support HTML5 Canvas et Pointer Events haute fréquence',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  url: 'https://skilldrills.online/fr/drills/motor/precision-control/steady-hand',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Jeu du Fil Électrique & Dextérité Motrice',
  url: 'https://skilldrills.online/fr/drills/motor/precision-control/steady-hand',
  description: 'Épreuve de précision gestuelle mesurant la stabilité de la main et le contrôle du tremblement au curseur.',
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
      name: 'Qu\'est-ce que le Jeu du Fil Électrique et que mesure-t-il ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le Jeu du Fil Électrique (Steady Hand Game) est une évaluation neuromotrice exigeant de guider un curseur le long d\'un couloir sinueux sans heurter les parois. Il mesure la stabilité de guidage, l\'efficacité de la boucle visuo-motrice et l\'atténuation du tremblement physiologique sous rétrécissement progressif.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle loi scientifique régit le déplacement de la souris dans un couloir étroit ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La trajectoire dans des passages délimités est modélisée par la loi de direction d\'Accot-Zhai (1997), extension de la loi de Fitts. Elle établit que le temps de parcours est proportionnel à l\'intégrale de la longueur divisée par la largeur du chenal : plus le couloir rétrécit, plus la vitesse doit mathématiquement diminuer pour éviter la faute.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi le curseur revient-il au départ dès qu\'il touche un bord ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le moteur de jeu calcule en continu la distance euclidienne entre le pointeur et la ligne médiane. Dès que l\'écart dépasse la demi-largeur autorisée, une collision est constatée, entraînant un retour instantané au point de départ pour imposer une rigueur absolue.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment la largeur du couloir rétrécit-elle au fil des tours ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le circuit s\'ouvre sur une largeur confortable de 50 pixels au premier tour, puis se resserre à chaque tour validé pour n\'offrir plus qu\'une fente millimétrique de 12 pixels à partir du niveau 12.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qu\'est-ce qui provoque le tremblement de la main lors de tracés précis ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le tremblement physiologique naturel (8–12 Hz) résulte des décharges synchrones des unités motrices et de la résonance mécanique du bras. Une crispation excessive (co-contraction des muscles fléchisseurs et extenseurs), le stress ou le café amplifient ces oscillations.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle prise en main et quelle sensibilité DPI sont recommandées ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Une prise fingertip ou claw détendue permet d\'associer le glissement de l\'avant-bras aux micro-ajustements des doigts. Une sensibilité basse (400 à 800 DPI) atténue les micro-tressaillements de façon bien plus stable qu\'un DPI trop élevé.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment s\'applique le modèle à deux composantes de Woodworth (1899) ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Robert S. Woodworth a démontré que tout geste dirigé combine une impulsion balistique initiale et une phase de contrôle continu sous retour visuel. Dans ce jeu, ce contrôle en boucle fermée s\'exécute en continu pour rectifier la trajectoire avant le contact.',
      },
    },
    {
      '@type': 'Question',
      name: 'L\'exercice de main ferme est-il utile aux chirurgiens, graphistes et joueurs e-sport ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolument. La chirurgie mini-invasive, l\'encrage graphique sur tablette et le tracking de cible dans les jeux de tir requièrent tous une régulation gestuelle continue sans tremblement ni saccade.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment prévenir la fatigue musculaire et les crampes lors de l\'exercice ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Posez votre coude à 90 degrés sur le bureau sans écraser la souris sur le tapis. Expirez calmement avant d\'aborder les épingles à cheveux pour dénouer les épaules et ménagez des pauses d\'une minute toutes les 5 minutes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Le test est-il compatible avec les trackballs et les stylets graphiques ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Grâce à la conformité aux normes Pointer Events, l\'exercice fonctionne parfaitement avec une souris optique, un trackball ou un stylet de tablette graphique pour analyser votre dextérité sur tout périphérique.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Comment entraîner la stabilité de la main et la précision souris',
  description: 'Protocole méthodique pour parcourir des couloirs sinueux et maîtriser la loi de guidage gestuel.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      url: 'https://skilldrills.online/fr/drills/motor/precision-control/steady-hand#step-1',
      name: 'Placer le curseur dans la zone de départ',
      text: 'Cliquez sur „Lancer l\'exercice“ et placez votre pointeur dans le sas vert à gauche pour enclencher le chronomètre de 45 secondes.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      url: 'https://skilldrills.online/fr/drills/motor/precision-control/steady-hand#step-2',
      name: 'Maintenir une vitesse fluide et régulière',
      text: 'Glissez le long de la ligne cyan en dosant l\'allure pour respecter le temps imparti sans heurter les bordures.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      url: 'https://skilldrills.online/fr/drills/motor/precision-control/steady-hand#step-3',
      name: 'Ralentir avant les virages en épingle',
      text: 'Réduisez votre allure d\'environ 40% à l\'approche des angles aigus et portez votre regard 20 à 30 pixels en avant du pointeur.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      url: 'https://skilldrills.online/fr/drills/motor/precision-control/steady-hand#step-4',
      name: 'Atteindre l\'arrivée pour le niveau supérieur',
      text: 'Rejoignez le sas d\'arrivée vert pour boucler le tour. Le chronomètre est réinitialisé et le couloir rétrécit pour l\'étape suivante.',
    },
  ],
};

const guideProps = {
  sources: pickSources('accot1997', 'woodworth1899', 'fitts1954', 'woods2015'),
  intro: {
    title: 'Comment la stabilité de la main et la précision sont mesurées',
    paragraphs: [
      'Fiabilité des mesures et contraintes matérielles : La mesure temporelle provient de l\'API performance.now() du navigateur, quantifiée à ~1 ms pour des raisons de sécurité. L\'affichage est synchronisé avec le taux de rafraîchissement de l\'écran — ~16,7 ms à 60 Hz, ~6,9 ms à 144 Hz et ~4,1 ms à 240 Hz (Woods et al., 2015). Le taux d\'interrogation de la souris ajoute ~8 ms à 125 Hz contre ~1 ms à 1000 Hz. Tout écart inférieur à 5 ms relève du bruit de mesure. SkillDrills stocke vos performances uniquement dans votre navigateur.',
    ],
  },
  benchmark: {
    title: 'Barème de Référence du Jeu du Fil Électrique',
    description: 'Grille d\'évaluation issue du modèle de guidage d\'Accot & Zhai (1997). Les échelons intègrent le niveau atteint, la largeur du couloir et l\'écart moyen par rapport au centre.',
    columns: ['Niveau', 'Titre de Rang', 'Palier Validé', 'Largeur de Voie', 'Écart Moyen', 'Niveau de Maîtrise'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Chirurgien d\'Élite (Apex Surgeon)',
        stat: 'Niveau 12+',
        level: '12–15 px',
        accuracy: 'Moins de 2,5 px',
        percentile: 'Exceptionnel (Top 1%)',
      },
      {
        tier: 'Tier 2',
        rank: 'Navigateur Émérite',
        stat: 'Niveau 9–11',
        level: '16–22 px',
        accuracy: 'Moins de 4,0 px',
        percentile: 'Avancé (Top 5%)',
      },
      {
        tier: 'Tier 3',
        rank: 'Timonier Averti',
        stat: 'Niveau 6–8',
        level: '23–32 px',
        accuracy: 'Moins de 6,5 px',
        percentile: 'Solide (Top 25%)',
      },
      {
        tier: 'Tier 4',
        rank: 'Curseur Intermédiaire',
        stat: 'Niveau 3–5',
        level: '33–42 px',
        accuracy: 'Moins de 9,0 px',
        percentile: 'Moyen',
      },
      {
        tier: 'Tier 5',
        rank: 'Novice Sujet au Tremblement',
        stat: 'Niveau 1–2',
        level: '43–50 px',
        accuracy: 'Plus de 9,0 px',
        percentile: 'En apprentissage',
      },
    ],
  },
  protocols: {
    title: 'Protocoles d\'Entraînement pour une Main Parfaitement Stable',
    description: 'Recommandations pour supprimer le tremblement gestuel et négocier les passages étroits avec fluidité.',
    items: [
      {
        title: 'Protocole 1 : Régulation de Vitesse selon Accot-Zhai (Gestion du Rythme)',
        description: 'Selon la loi d\'Accot-Zhai (1997), la traversée d\'un tunnel étroit requiert d\'adapter sa vitesse en proportion inverse de la largeur. Accélérez sur les lignes droites pour engranger de l\'avance et ralentissez de 40% dans les passages resserrés.',
      },
      {
        title: 'Protocole 2 : Anticipation Visuelle de Woodworth (Contrôle Continu)',
        description: 'Fixez votre regard 20 à 30 pixels en avant du curseur et non directement dessus. Cette projection visuelle donne au cortex moteur environ 150 ms pour amorcer les micro-corrections avant toute sortie de piste.',
      },
      {
        title: 'Protocole 3 : Amortissement du Tremblement (8–12 Hz) et Découplage',
        description: 'Exécutez les courbes amples avec l\'avant-bras en réservant les doigts au centrage fin. Évitez de serrer excessivement la souris, car la co-contraction musculaire amplifie le tremblement physiologique.',
      },
      {
        title: 'Protocole 4 : Trajectoire par le Point de Corde en Virage',
        description: 'Dès le niveau 6 (largeur inférieure à 30 px), privilégiez la rigueur géométrique à la vitesse pure. Serrer l\'intérieur des courbes offre une marge de sécurité maximale contre la dérive centrifuge.',
      },
    ],
  },
  faqs: {
    title: 'Foire Aux Questions sur le Jeu du Fil Électrique et la Précision Souris',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

const frCopy = {
  h1Keyword: 'Jeu du Fil Électrique',
  h1Suffix: ' (Test de Précision Souris)',
  caption: 'Le jeu du fil électrique teste la stabilité de votre main et votre motricité fine en guidant le curseur sans toucher les parois d\'un parcours étroit. Fondé sur la loi de direction d\'Accot-Zhai (1997) et le contrôle en boucle fermée de Woodworth (1899).',
  statLaps: 'Tours',
  statTime: 'Temps Restant',
  statStreak: 'Série',
  statBest: 'Record',
  pausedTitle: 'En Pause',
  pausedPrompt: 'Cliquez sur l\'écran pour verrouiller le curseur et reprendre.',
  startTitle: 'Parcours du Fil Électrique',
  startSubtitle: 'Précision Motrice & Chenal Étroit • Défi 45s',
  startBtn: 'Lancer l\'exercice',
  countdownSubtitle: 'PRÉPAREZ-VOUS',
  newBest: 'NOUVEAU RECORD',
  errorsLabel: 'Touches de Paroi',
  maxStreakLabel: 'Série Max',
  difficultyLabel: 'Niveau Atteint',
  trainAgain: 'Recommencer',
  shareTitle: 'Partager le Score',
  exitTitle: 'Quitter et Revenir',
  rulesTitle: 'Consignes et Modalités de Score',
  rulesItems: [
    { num: '1', text: 'Suivez la ligne émeraude', highlight: 'lumineuse avec exactitude', result: 'L\'arrivée réinitialise le temps à 45s' },
    { num: '2', text: 'Tour validé', highlight: 'Difficulté progressive', result: 'Couloirs plus étroits et virages serrés' },
    { num: '3', text: 'Touche de paroi', highlight: 'Retour au départ', result: 'Tour invalidé et faute enregistrée' },
    { num: '4', text: 'Maniement souris', highlight: 'Recommandé sur PC', result: 'Entrée brute 1:1 sans accélération' },
  ],
  rule1Text: 'Suivez la ligne émeraude',
  rule1Highlight: 'lumineuse avec exactitude',
  rule1Result: 'L\'arrivée réinitialise le temps à 45s',
  rule2Text: 'Tour validé',
  rule2Highlight: 'Difficulté progressive',
  rule2Result: 'Couloirs plus étroits et virages serrés',
  rule3Text: 'Touche de paroi',
  rule3Highlight: 'Retour au départ',
  rule3Result: 'Tour invalidé et faute enregistrée',
  rule4Text: 'Maniement souris',
  rule4Highlight: 'Recommandé sur PC',
  rule4Result: 'Entrée brute 1:1 sans accélération',
  aboutTitle: 'À Propos du Jeu du Fil Électrique',
  aboutHeading: 'Stabilité de Guidage et Atténuation du Tremblement Gestuel',
  aboutP1: 'Le Jeu du Fil Électrique est un outil d\'entraînement conçu pour développer la coordination œil-main, la motricité fine des doigts et la régularité du pointeur. Franchir ces méandres étroits sollicite les muscles stabilisateurs du poignet et de l\'avant-bras.',
  aboutP2: 'Selon la loi de direction de Johnny Accot et Shumin Zhai (1997), le temps de guidage s\'accroît à mesure que le chenal rétrécit. De 50 px à 12 px, l\'exercice requiert une correction visuelle constante (Woodworth, 1899) et un contrôle parfait du tremblement.',
  aboutCard1Title: 'Public Visé',
  aboutCard1Text: 'Joueurs e-sport (FPS/MOBA), illustrateurs numériques, chirurgiens et toute personne désireuse d\'éliminer les micro-tremblements du curseur.',
  aboutCard2Title: 'Bénéfices Moteurs',
  aboutCard2Text: 'Coordination motrice fine, régularité de la trajectoire, dosage de la vitesse en virage et élimination des tensions parasites.',
  aboutCard3Title: 'Rétrécissement Dynamique',
  aboutCard3Text: 'Le couloir se contracte à chaque tour franchi et les angles s\'accentuent pour forger une précision chirurgicale au millimètre.',
  gradeLabels: {
    'S+': 'Stabilité Chirurgicale (Grandmaster)',
    'S': 'Maîtrise Parfaite (Master)',
    'A': 'Précision Remarquable (Diamond)',
    'B': 'Bonne Stabilité (Platinum)',
    'C': 'Validation Basique (Gold)',
  },
  shareDrillName: 'Jeu du Fil Électrique',
  shareUrl: 'https://skilldrills.online/fr/drills/motor/precision-control/steady-hand',
  shareTextTemplate: '🖐️ J\'ai bouclé {laps} tours au {drillName} avec {acc} de précision ! Évaluez gratuitement votre stabilité et votre dextérité sur skilldrills.online',
  copiedAlert: 'Score copié dans le presse-papiers !',
};

export default function FrenchSteadyHandPage() {
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
      <SteadyHandClient copy={frCopy} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/drills/motor/precision-control/steady-hand" locale="fr" />
      </div>
      <DrillFooter />
    </>
  );
}
