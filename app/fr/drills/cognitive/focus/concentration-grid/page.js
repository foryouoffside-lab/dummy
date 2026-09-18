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
    "La table de Schulte (Concentration Grid) compte parmi les dispositifs psychodiagnostiques et d entraînement cognitif les plus étudiés en neurosciences visuelles. Conçue à l origine par le psychiatre Walter Schulte, sa mission consiste à élargir le champ visuel fonctionnel (Functional Field of View) et à diminuer la latence de fixation oculaire durant la prospection ordonnée (Lu et al., 2022; Rayner, 1998).",
    "À l inverse des épreuves de repérage statiques, ce module déploie des matrices progressives (de 3x3 jusqu à 8x8) sous une contrainte stricte de 45 secondes. Au fil de la résolution, la densité de distracteurs s accroît, confrontant le cerveau à un phénomène d encombrement perceptif (Crowding Effect) qui sollicite une intégration cognitive rigoureuse (Treisman & Gelade, 1980; Wolfe, 2007).",
    "Application à la lecture rapide et au sport de haut niveau: Les recherches attestent que les lecteurs chevronnés ne fixent pas isolément chaque mot mais exploitent leur vision parafovéale pour anticiper les blocs textuels suivants, une faculté directement entraînée par ce protocole."
  ],
  benchmarks: {
    title: "Barèmes de Performance et Étendue du Champ Visuel Périphérique",
    headers: ["Niveau de Performance", "Score (45s)", "Grille Maximale", "Interprétation Neurocognitive"],
    rows: [
      ["Élite (Pilotes / Pros Esports)", "7.500+ pts", "7x7 ou plus", "Remarquable extension parafovéale. Latence saccadique minimale, détection simultanée de chiffres contigus sans fixation centrale obligatoire."],
      ["Avancé (Lecteurs Rapides)", "5.500 – 7.499 pts", "6x6 – 7x7", "Haute discipline atencionale. Planification préalable des micro-saccades sans égarements oculaires."],
      ["Compétent (Moyenne Entraînée)", "3.500 – 5.499 pts", "5x5 – 6x6", "Exploration ordonnée. Léger ralentissement sur les zones périphériques éloignées."],
      ["Intermédiaire", "2.000 – 3.499 pts", "4x4 – 5x5", "Dépendance au balayage fovéal successif. Tendance à hésiter lors des transitions de lignes."],
      ["Débutant", "< 2.000 pts", "3x3 – 4x4", "Recherche désordonnée avec régressions visuelles fréquentes face aux distracteurs proches."]
    ],
    note: "Scores établis sur des sessions standardisées de 45 secondes. Les grilles nettoyées avec plus de 95% de précision reflètent un contrôle parfait de l attention soutenue."
  },
  instructions: [
    "Fixez le centre du plateau et évitez de déplacer la tête durant l exercice.",
    "Repérez les chiffres du 1 au maximum par vision périphérique sans fixer directement chaque case.",
    "Sélectionnez les chiffres dans l ordre croissant le plus promptement possible.",
    "Validez un maximum de grilles dans l intervalle de 45 secondes sans commettre de fautes."
  ],
  tips: [
    "Respirez posément pour maintenir un tonus musculaire oculaire détendu.",
    "Ne balayez pas la grille comme une page de texte: englobez l ensemble du cadre d un regard global.",
    "Privilégiez la précision à la précipitation pour éviter les pénalités d exactitude."
  ],
  sources: pickSources(
    "Lu et al. (2022) - Saccadic Eye Movements and Peripheral Vision in Visual Search",
    "Rayner (1998) - Eye Movements in Reading and Information Processing",
    "Treisman & Gelade (1980) - A Feature-Integration Theory of Attention",
    "Wolfe (2007) - Guided Search 4.0: Current Progress With a Variant of Feature Integration"
  )
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
