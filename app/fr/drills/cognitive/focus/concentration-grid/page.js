import ConcentrationGridClient from '@/app/drills/cognitive/focus/concentration-grid/ConcentrationGridClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Table de Schulte en Ligne – SkillDrills",
  description: "Table de Schulte gratuite en ligne: entraînez vision périphérique, lecture rapide et exploration séquentielle sur des grilles dynamiques sans inscription.",
  keywords: [
    "table de schulte",
    "table de schulte en ligne",
    "grille de concentration en ligne",
    "test table de schulte gratuit",
    "entraînement vision périphérique lecture rapide",
    "exercice table de schulte concentration",
    "vitesse d exploration visuelle test",
    "jeux de concentration visuelle adultes",
    "recherche numérique séquentielle réflexes",
    "élargissement champ visuel parafovéal",
    "test attention soutenue et balayage oculaire",
    "exercices de lecture dynamique en ligne"
  ],
  openGraph: {
    title: "Table de Schulte en Ligne – Test de Concentration et Vision Périphérique | SkillDrills",
    description: "Entraînez votre vision périphérique, lecture rapide et vitesse d exploration visuelle avec la table de Schulte gratuite en ligne.",
    type: "website",
    url: "https://skilldrills.online/fr/drills/cognitive/focus/concentration-grid",
    siteName: "SkillDrills",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Table de Schulte en Ligne – Test de Concentration et Vision Périphérique | SkillDrills",
    description: "Entraînez votre vision périphérique, lecture rapide et vitesse d exploration visuelle avec la table de Schulte gratuite en ligne.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/cognitive/focus/concentration-grid",
    languages: getAlternateLanguages('/drills/cognitive/focus/concentration-grid'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://skilldrills.online/fr"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Entraînement Cognitif",
      "item": "https://skilldrills.online/fr/drills/cognitive"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Table de Schulte",
      "item": "https://skilldrills.online/fr/drills/cognitive/focus/concentration-grid"
    }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Table de Schulte en Ligne",
  "description": "Test gratuit de table de Schulte et grille de concentration pour développer la vision périphérique, la vitesse de balayage oculaire et la lecture dynamique.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "url": "https://skilldrills.online/fr/drills/cognitive/focus/concentration-grid",
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Table de Schulte Trainer",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Défi Table de Schulte et Grille de Concentration",
  "gamePlatform": "Web Browser",
  "genre": ["Brain Training", "Cognitive Drill", "Vision Training"]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment Réaliser l Entraînement sur Table de Schulte",
  "description": "Protocole pour maximiser l extension du champ visuel et la cadence de recherche séquentielle.",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Fixation au Centre de la Grille",
      "text": "Fixez le centre du tableau sans déplacer excessivement le regard vers chaque numéro."
    },
    {
      "@type": "HowToStep",
      "name": "Activation de la Vision Périphérique",
      "text": "Utilisez votre vision parafovéale pour repérer les chiffres dans l ordre croissant de 1 au maximum."
    },
    {
      "@type": "HowToStep",
      "name": "Sélection Rapide des Cibles",
      "text": "Cliquez sur chaque chiffre dès son identification pour déclencher l expansion de la grille."
    },
    {
      "@type": "HowToStep",
      "name": "Maintien de la Cadence sur 45s",
      "text": "Complétez autant de grilles que possible dans le délai strict de 45 secondes sans perdre en précision."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu est-ce qu une table de Schulte et quel est son but?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Conçue par le psychiatre Walter Schulte, c est une grille de chiffres disposés aléatoirement servant à évaluer et entraîner la vitesse d exploration visuelle et l étendue du champ périphérique."
      }
    },
    {
      "@type": "Question",
      "name": "Comment la table de Schulte aide-t-elle à la lecture rapide?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Elle apprend aux yeux à élargir leur champ visuel pour capter plusieurs mots d un seul coup d œil sans mouvements saccadiques inutiles."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi ne faut-il pas bouger excessivement les yeux?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le bénéfice maximal est obtenu en gardant la fovéa au centre pour contraindre le cerveau à traiter les informations situées en périphérie rétinienne."
      }
    },
    {
      "@type": "Question",
      "name": "Quelles dimensions de grilles sont proposées dans ce test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L exercice démarre sur une grille 3x3 et progresse dynamiquement vers des formats 4x4, 5x5 jusqu à 8x8 au fur et à mesure des réussites."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le temps limite pour chaque session?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chaque série dure 45 secondes exactement, ce qui permet d évaluer la résistance atencionale sous contrainte temporelle standardisée."
      }
    },
    {
      "@type": "Question",
      "name": "Que se passe-t-il en cas de clic erroné?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Une brève alerte visuelle s affiche et la précision globale est recalculée, mais le chronomètre poursuit son cours sans interruption."
      }
    },
    {
      "@type": "Question",
      "name": "À quelle fréquence est-il conseillé de s entraîner?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Une pratique quotidienne de 5 à 10 minutes est suffisante pour constater des progrès sensibles en vitesse de balayage et en concentration."
      }
    },
    {
      "@type": "Question",
      "name": "Cet outil est-il adapté aux sportifs de haut niveau?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, les pilotes, gardiens de but et athlètes d esports l utilisent régulièrement pour accélérer la détection visuelle d éléments périphériques."
      }
    },
    {
      "@type": "Question",
      "name": "Comment le score global est-il calculé?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le score pondère le nombre total de chiffres validés, la taille maximale de la grille atteinte et le taux d exactitude des sélections."
      }
    },
    {
      "@type": "Question",
      "name": "Peut-on utiliser ce test sur smartphone ou tablette?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, l interface est parfaitement adaptée aux écrans tactiles ainsi qu aux ordinateurs de bureau avec souris."
      }
    }
  ]
};

const copyFr = {
  h1Keyword: "Table de Schulte",
  h1Suffix: " en Ligne – Grille de Concentration",
  caption: "Touchez les numéros dans l ordre séquentiel strict sur des grilles de Schulte en expansion continue. Entraînez votre vision périphérique, vitesse d exploration visuelle et endurance atencionale.",
  statScore: "Points",
  statTime: "Temps",
  statGridSize: "Grille",
  statBest: "Record",
  hudTarget: "Cible:",
  startTitle: "Table de Schulte Trainer",
  startSubtitle: "Recherche Numérique Séquentielle • Grilles de Schulte Dynamiques",
  startButtonText: "Démarrer l Entraînement",
  getReady: "PRÉPAREZ-VOUS",
  statPoints: "Points",
  statAccuracy: "Précision",
  statGridsCleared: "Complétées",
  statPeakGrid: "Grille Max",
  playAgainText: "Rejouer",
  shareText: "Partager le Résultat",
  exitText: "Quitter",
  stageCaption: "Trouvez et touchez les chiffres dans l ordre croissant sur des grilles toujours plus grandes avant la fin du temps imparti.",
  rulesTitle: "Règles et Système de Points",
  rulesItems: [
    { title: "Recherche Séquentielle", text: "Sélectionnez les chiffres dans l ordre numérique strict de 1 jusqu au plus grand chiffre de la matrice." },
    { title: "Grilles en Expansion", text: "Compléter une grille débloque des formats plus vastes (3x3 → 4x4 → 5x5...), stimulant votre champ périphérique." },
    { title: "Session Fixe de 45s", text: "Vous disposez d une fenêtre unique de 45 secondes. Chaque grille validée agrandit le plateau sans modifier l horloge." },
    { title: "Précision et Focalisation", text: "Les erreurs déclenchent une brève alerte et réduisent votre précision finale, sans interrompre la manche." }
  ],
  aboutTitle: "À Propos de la Table de Schulte et de la Grille de Concentration",
  aboutLead: "La table de Schulte est une grille psychodiagnostique d exploration visuelle créée pour élargir le champ périphérique fonctionnel et réduire le temps de fixation oculaire (Lu et al., 2022; Rayner, 1998).",
  aboutCards: [
    { title: "Public Cible", text: "Athlètes de haut niveau, pilotes, étudiants et joueurs d esports devant traiter rapidement des flux visuels denses.", color: "bg-blue-600" },
    { title: "Compétences Développées", text: "Vitesse de balayage visuel, efficacité saccadique, repérage spatial et endurance atencionale soutenue.", color: "bg-emerald-600" },
    { title: "Vision Périphérique", text: "Chaque niveau supérieur élargit la matrice, forçant la rétine à englober un champ visuel étendu sans perdre la cadence.", color: "bg-purple-600" }
  ]
};

const concentrationGridGuideFr = {
  heading: "Guide Complet de la Table de Schulte et Psychologie de l Attention Visuelle",
  intro: [
    "La table de Schulte (Schulte Table) est un paradigme psychodiagnostique classique conçu en 1962 par le psychiatre allemand Walter Schulte pour mesurer l efficience de l exploration visuelle, la distribution de l attention sélective et la résistance à la fatigue mentale. Dans son format traditionnel, les chiffres de 1 à 25 sont dispersés aléatoirement sur une grille 5x5, le participant devant pointer chaque valeur dans l ordre croissant tout en fixant le centre géométrique de la matrice.",
    "En psychologie du sport appliquée, cet exercice a évolué pour devenir la 'grille de concentration' (Harris & Harris, 1984), adoptée par les préparateurs en tennis, sport automobile et baseball pour développer la vitesse d exploration et la discipline mentale sous pression temporelle. Une étude en potentiels évoqués cognitifs (ERP) menée chez des enfants de 8 à 11 ans a révélé que la recherche séquentielle de chiffres active des composantes neuronales nettement plus exigeantes que le repérage isolé, un effet amplifié par l ajout de distracteurs chromatiques (Lu et al., 2022).",
    "Le simulateur de SkillDrills hisse ce test historique au rang de tâche de performance continue (Continuous Performance Task). Plutôt qu une matrice statique isolée, la grille s élargit dynamiquement de 3x3 jusqu à 8x8 au fil des réussites, tout en introduisant des perturbations de rotation dès le niveau 5x5. Cette architecture sollicite l empan perceptif maximal et la coordination fovéale-parafovéale au sein d une fenêtre stricte de 45 secondes (Treisman & Gelade, 1980 ; Wolfe, 2007).",
    "Méthodologie chronométrique : chaque action tactile ou clic est horodatée via l horloge haute résolution performance.now() du navigateur directement sur votre terminal. Les navigateurs intègrent une atténuation délibérée pour parer aux failles matérielles de type Spectre (résolution d environ 1 ms), et votre écran quantifie chaque affichage selon sa fréquence de rafraîchissement (environ 16,7 ms par image à 60 Hz, Woods et al., 2015). Évaluez votre progression sur un même matériel.",
    "Transparence des données : SkillDrills ne collecte aucune donnée agrégée. Vos scores et configurations sont conservés exclusivement dans le localStorage de votre navigateur et ne sont jamais transmis à des serveurs distants.",
    "Ce module est un jeu d entraînement cognitif et réflexe gratuit à visée pédagogique et sportive. Il ne s agit pas d un dispositif médical, d un outil de diagnostic ou de dépistage du TDAH, de la dyslexie ou d autres troubles neurodéveloppementaux."
  ],
  benchmarks: {
    title: "Barèmes de Performance de la Table de Schulte et Grille de Concentration (45s)",
    headers: ["Niveau de Maîtrise", "Score (45s)", "Grille Maximale", "Latence de Recherche", "Interprétation Neurocognitive"],
    rows: [
      ["S+ (Élite)", "8.000+ PTS", "7x7+ (49+ cases)", "< 300 ms / chiffre", "Vitesse de balayage de classe mondiale, extension périphérique exceptionnelle et invariance rotationnelle immédiate."],
      ["S (Maître)", "6.000 – 7.999 PTS", "6x6 (36 cases)", "300 – 450 ms / chiffre", "Efficacité d exploration supérieure ; pré-lecture parafovéale fluide et arrêts de fixation minimes."],
      ["A (Avancé)", "4.500 – 5.999 PTS", "5x5 (25 cases)", "450 – 600 ms / chiffre", "Solide traitement du champ visuel ; anticipation séquentielle par paires régulière sur grilles moyennes."],
      ["B (Compétent)", "3.000 – 4.499 PTS", "4x4 (16 cases)", "600 – 800 ms / chiffre", "Discipline de repérage au-dessus de la moyenne ; pauses occasionnelles de recentrage sur grands formats."],
      ["C (Intermédiaire)", "1.800 – 2.999 PTS", "3x3 (9 cases)", "800 – 1.100 ms / chiffre", "Performance de base standard ; dépendance prédominante aux saccades fovéales successives."],
      ["D (En développement)", "< 1.800 PTS", "3x3 (partiel)", "> 1.100 ms / chiffre", "Interférence par encombrement visuel (crowding) ; saccades nombreuses et discrimination ralentie."]
    ],
    note: "Ces paliers constituent un cadre de référence fondé sur la littérature cognitive (Lu et al., 2022 ; Treisman & Gelade, 1980 ; Rayner, 1998 ; Wolfe, 2007). Les scores varient selon la fréquence de l écran, le mode de pointage et la fatigue oculaire."
  },
  techniques: {
    title: "4 Techniques Scientifiques pour Maximiser la Vitesse d'Exploration",
    items: [
      {
        name: "Ancrage Fovéal Central et Vision Parafovéale Élargie",
        desc: "Ne suivez pas chaque chiffre avec des mouvements saccadés amples. Maintenez le regard posé au centre géométrique du plateau, laissant votre vision périphérique enregistrer les chiffres candidats (Lu et al., 2022).",
        tips: "Évitez de tourner la tête ou de fixer les coins de l écran ; élargissez votre champ attentionnel."
      },
      {
        name: "Chunking Séquentiel et Anticipation Double (Lookahead)",
        desc: "Ne cherchez jamais un chiffre de manière isolée. Si vous apercevez '4' en cherchant '3', stockez ses coordonnées dans la mémoire de travail visuo-spatiale pour l enchaîner sans latence (Rayner, 1998).",
        tips: "Conservez une carte mentale de 1 à 2 chiffres d avance pour lier vos clics en continu."
      },
      {
        name: "Recherche Guidée et Intégration des Traits (Wolfe, 2007)",
        desc: "Les attentes cognitives descendantes (Top-Down) orientent la saillance perceptive. Garder en mémoire la géométrie distinctive du prochain chiffre active les détecteurs neuronaux avant tout balayage au hasard.",
        tips: "Visualisez mentalement la forme du chiffre suivant avant de scanner la grille."
      },
      {
        name: "Invariance à la Rotation et Détection de Repères Structurels",
        desc: "La rotation des chiffres perturbe la reconnaissance automatique de gabarit. Le cortex inférotemporal doit extraire des repères invariants (la boucle d un 6/9, la traverse d un 4).",
        tips: "Identifiez les traits structurels clés plutôt que d essayer de redresser le chiffre mentalement."
      }
    ]
  },
  steps: [
    "Posez votre regard au centre du plateau pour englober la matrice entière.",
    "Repérez le chiffre '1' et touchez-le promptement pour lancer la chaîne séquentielle.",
    "Anticipez : pendant la validation du chiffre actuel, scannez la périphérie pour les suivants.",
    "Progressez dans les grilles : terminez rapidement les petits plateaux pour débloquer les matrices 5x5, 6x6 et 7x7.",
    "Maintenez votre discipline visuelle face aux chiffres rotatifs durant les 45 secondes complètes."
  ],
  audience: "Lecteurs rapides, athlètes, pilotes, compétiteurs d esport (FPS/MOBA), étudiants et professionnels cherchant à élargir leur champ visuel périphérique et leur vitesse de traitement.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('lu2022', 'treisman1980', 'rayner1998', 'rayner2016', 'wolfe2007', 'woods2015'),
  related: [
    { href: "/fr/drills/cognitive/focus/distraction-fighter", label: "Test de Stroop en Ligne" },
    { href: "/drills/cognitive/attention/concentration-stamina", label: "Test d Attention Soutenue" },
    { href: "/drills/cognitive/attention/divided-attention", label: "Test d Attention Divisée" },
    { href: "/drills/cognitive/processing-speed/rsvp-reader", label: "Test de Lecture Rapide RSVP" },
    { href: "/drills/cognitive/processing-speed/symbol-matching", label: "Test de Substitution de Symboles" },
    { href: "/drills/cognitive/processing-speed/reaction-time", label: "Test de Temps de Réaction" }
  ]
};

export default function ConcentrationGridPageFr() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <ConcentrationGridClient copy={copyFr} />
      <DrillGuide guide={concentrationGridGuideFr} />
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="/drills/cognitive/focus/concentration-grid" locale="fr" />
      </div>
    </>
  );
}
