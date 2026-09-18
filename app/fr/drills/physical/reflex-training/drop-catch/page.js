import DropCatchClient from '@/app/drills/physical/reflex-training/drop-catch/DropCatchClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — France & Francophonie (FR / FR-FR)
// Primary Intent: test de la règle temps de réaction, test de réflexe règle, mesurer son temps de réaction en ligne
// French Athletic/Academic Context: Test de la règle de Nelson transposé au numérique avec paradigme Go/No-Go et cibles en chute libre
// High-Demand, Low-Competition Target Keywords:
//   - "test de la règle temps de réaction" (Core academic/athletic ruler drop query)
//   - "test de réflexe règle" (Ruler reflex measurement query)
//   - "mesurer son temps de réaction en ligne" (Online chronometry utility query)
//   - "test de temps de réaction visuel" (Visual reaction time test query)
//   - "test go no go en ligne" (Inhibitory control & stop-signal query)
//   - "temps de réaction de choix" (Donders Type C choice reaction query)
//   - "test de réflexes et contrôle inhibiteur" (Impulse control reflex query)
//   - "améliorer son temps de réaction fps" (FPS motor agility query)
//   - "test de réflexe visuo-moteur" (Visuomotor assessment query)
//   - "exercices de réflexes et discrimination" (Discriminative conditioning query)
// ============================================================

export const metadata = {
  title: "Test de la Règle – Temps de Réaction | SkillDrills",
  description: "Test de la règle en ligne gratuit. Rattrapez des cibles en chute libre pour mesurer votre temps de réaction en millisecondes et tester vos réflexes au PC.",
  keywords: [
    "test de la règle temps de réaction",
    "test de réflexe règle",
    "mesurer son temps de réaction en ligne",
    "test de temps de réaction visuel",
    "test go no go en ligne",
    "temps de réaction de choix",
    "test de réflexes et contrôle inhibiteur",
    "améliorer son temps de réaction fps",
    "test de réflexe visuo-moteur",
    "exercices de réflexes et discrimination"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/physical/reflex-training/drop-catch',
    languages: getAlternateLanguages('/drills/physical/reflex-training/drop-catch'),
  },
  openGraph: {
    title: "Test de la Règle – Temps de Réaction | SkillDrills",
    description: "Test de la règle en ligne gratuit. Rattrapez des cibles en chute libre pour mesurer votre temps de réaction en millisecondes et tester vos réflexes au PC.",
    url: 'https://skilldrills.online/fr/drills/physical/reflex-training/drop-catch',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test de la Règle – Temps de Réaction | SkillDrills",
    description: "Test de la règle en ligne gratuit. Rattrapez des cibles en chute libre pour mesurer votre temps de réaction en millisecondes et tester vos réflexes au PC.",
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil SkillDrills",
      "item": "https://skilldrills.online/fr"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Centre d'Entraînement Physique",
      "item": "https://skilldrills.online/fr/drills/physical"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Entraînement des Réflexes",
      "item": "https://skilldrills.online/fr/drills/physical/reflex-training"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Test de la Règle & Drop Catch",
      "item": "https://skilldrills.online/fr/drills/physical/reflex-training/drop-catch"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test de la Règle Numérique et Entraîneur de Réflexes Drop Catch",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Simulateur de Chute Libre, Temps de Réaction et Paradigme Go/No-Go",
  "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
  "genre": "Training, Reflex, Reaction Time, Sports Science"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Reflex Drop Catch & Impulse Restraint Drill",
  "gamePlatform": "Web Browser",
  "applicationSubCategory": "Esports Motor Chronometry Drill"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Comment ce simulateur Drop Catch transpose-t-il le test classique de la règle d'EPS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le test scolaire traditionnel calcule le temps de réaction en mesurant la chute physique d'une règle graduée selon les lois de la pesanteur (d = 1/2gt²). Drop Catch numérise cette accélération verticale non linéaire (de 400 à 1250 px/s) et y adjoint la dimension cognitive du paradigme Go/No-Go : intercepter les cibles vertes légitimes et ignorer les leurres rouges piégés."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le principe de la tâche de discrimination de type C de Donders (1868)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Franciscus Donders (1868) a défini le temps de réaction de type C comme une situation où plusieurs stimuli apparaissent mais un seul exige une action motrice. L'analyse perceptuelle préalable nécessaire pour distinguer la bonne cible allonge le temps de réponse de 80 à 120 ms par rapport à un réflexe visuel simple."
      }
    },
    {
      "@type": "Question",
      "name": "Comment la théorie de l'optique tau de David N. Lee régit-elle l'interception?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Énoncée par David N. Lee (1976), la théorie du tau optique (τ) montre que le cerveau évalue le temps restant avant impact (Time-to-Contact) directement à partir de la vitesse d'expansion de la silhouette rétinienne. Cela permet d'anticiper la milliseconde précise du clic sans avoir à calculer mathématiquement distance et vitesse."
      }
    },
    {
      "@type": "Question",
      "name": "De quelle manière le modèle de course de chevaux de Logan explique-t-il l'inhibition du tir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gordon D. Logan (1984) a démontré qu'à chaque apparition de cible, deux commandes entrent en compétition interne : l'impulsion motrice d'action ('Go') et le signal de frein préfrontal ('Stop'). Si la couleur rouge est identifiée à temps, le veto inhibiteur l'emporte et suspend la pression du doigt, évitant un clic dommageable."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle sanction est appliquée si l'on clique par mégarde sur un leurre rouge?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cliquer sur un leurre rouge réinitialise instantanément le multiplicateur de série à 1.0x, retranche des points accumulés et génère un flash visuel d'avertissement. En conditions compétitives, cela simule le tir ami avec la pénalité maximale."
      }
    },
    {
      "@type": "Question",
      "name": "Comment le crédit de temps de +0,6s par cible verte récompense-t-il la régularité?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chaque interception réussie d'un cercle vert octroie +0,6 seconde additionnelle au chronomètre. Les joueurs réguliers et maîtres de leurs impulsions peuvent prolonger leur session bien au-delà des 45 secondes de départ pour viser le palier d'élite de 24 000 points."
      }
    },
    {
      "@type": "Question",
      "name": "Où est-il optimal de fixer son regard pour anticiper la descente des cibles?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Il est recommandé de positionner sa vision dans le tiers supérieur de la zone de jeu. Observer le point d'apparition permet de discriminer la couleur verte ou rouge dans les 50 premières millisecondes et d'aligner le curseur sur l'axe de chute avant que la gravité n'accélère la trajectoire."
      }
    },
    {
      "@type": "Question",
      "name": "En quoi les écrans 144Hz ou 240Hz améliorent-ils l'interception de cibles rapides?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "À 1250 px/s, une dalle 60Hz n'actualise la cible que tous les 20,8 pixels, produisant un effet de flou cinétique marqué. À 240Hz (4,1 ms par trame), le pas de déplacement chute à 5,2 pixels, procurant une netteté totale essentielle au calcul rétinien de l'optique tau."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle prise de souris facilite les micro-ajustements verticaux d'interception?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La prise Fingertip (du bout des doigts) s'avère particulièrement adaptée aux trajectoires verticales. Elle autorise des mouvements avant-arrière très vifs par simple flexion des phalanges sans mobiliser l'avant-bras entier, faisant gagner de précieuses fractions de seconde."
      }
    },
    {
      "@type": "Question",
      "name": "Mes données de temps de réaction et statistiques sont-elles téléversées sur des serveurs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non, absolument aucune donnée n'est envoyée à l'extérieur. Toute la physique et la chronométrie basée sur performance.now() s'exécutent strictement dans votre navigateur web. Vos records sont conservés uniquement dans le localStorage de votre terminal."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Protocole en 4 Étapes pour l'Interception Gravitationnelle et le Contrôle Inhibiteur",
  "description": "Entraînement méthodique pour affiner le temps de réaction de choix, le calcul de chute libre et la discipline de tir.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Ancrage Visuel dans le Tiers Supérieur (Upper Third Visual Anchoring)",
      "text": "Maintenez le regard dans le tiers supérieur de l'écran afin de classifier la cible (verte ou rouge) dans les 50 premières millisecondes après apparition.",
      "url": "https://skilldrills.online/fr/drills/physical/reflex-training/drop-catch#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Positionnement Précédent sur l'Axe de Chute (Pre-Positioning)",
      "text": "Déplacez promptement le pointeur sur l'axe vertical de descente avant que la pesanteur ne propulse l'objet au-delà de 800 px/s.",
      "url": "https://skilldrills.online/fr/drills/physical/reflex-training/drop-catch#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Veto Inhibiteur de Logan devant les Leurres Rouges (Stop-Signal Veto)",
      "text": "Dès qu'une teinte rouge est identifiée, relâchez la tension musculaire de l'index et laissez passer l'objet sans cliquer pour préserver le combo.",
      "url": "https://skilldrills.online/fr/drills/physical/reflex-training/drop-catch#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Interception dans le Tiers Médian et Bonus Temporel (+0.6s Streak)",
      "text": "Déclenchez le clic avec assurance dans la zone médiane pour engranger +0,6s de temps par touche et stabiliser le multiplicateur 3.0x jusqu'à 24 000 points.",
      "url": "https://skilldrills.online/fr/drills/physical/reflex-training/drop-catch#step-4"
    }
  ]
};

const dropGuide = {
  heading: "Guide de Biomécanique de Chute Libre, Temps de Réaction et Contrôle Inhibiteur",
  intro: {
    title: "Bases Scientifiques de la Discrimination des Stimuli et du Frein Moteur",
    paragraphs: [
      "Le Drop Catch est un module d'évaluation chronométrique et de maîtrise des impulsions qui hisse le test traditionnel de la règle à un niveau d'exigence sportive d'élite. Au lieu de refermer mécaniquement les doigts sur une règle tombant sous gravité, le sujet réalise une tâche discriminative de type C de Donders (1868) : capturer avec justesse des cibles en accélération constante tout en inhibant scrupuleusement ses actions devant des leurres pièges.",
      "Sous l'emprise de l'accélération gravitationnelle (s = 1/2gt²), la vitesse des objets s'accroît de 400 px/s à 1250 px/s. D'après la théorie du tau optique (τ) de David N. Lee (1976), le système visuel déduit l'échéance de contact (Time-to-Contact) à partir de la vitesse d'expansion de l'image sur la rétine. Toute tentative de calcul conscient provoque un retard préjudiciable : la clé réside dans le pré-positionnement du curseur sur le couloir vertical de chute.",
      "La complexité neurologique majeure provient des leurres rouges aléatoires. Selon le modèle de course de chevaux (Horse-Race Model) de Gordon D. Logan (1984), deux mécanismes entrent en compétition dans le système nerveux : la commande motrice instinctive ('Go') et l'instruction de blocage préfrontal ('Stop'). Ce n'est que lorsque le contrôle inhibiteur prévaut sur l'impulsion automatique que l'erreur de clic est conjurée, compétence fondamentale pour les compétiteurs d'eSport.",
      "Pour fournir des données rigoureuses et sans distorsion, l'outil s'appuie sur l'API performance.now() du navigateur. Sur des écrans à 144Hz ou 240Hz, le déchirement visuel des objets plongeant à 1250 px/s est entièrement neutralisé, autorisant une discrimination instantanée (Woods et al., 2015). Vos performances restent stockées uniquement dans la mémoire locale de votre appareil."
    ]
  },
  benchmarks: {
    title: "Grille de Performance en 5 Niveaux pour le Temps de Réaction de Choix",
    headers: ["Palier et Catégorie", "Titre (Rank Title)", "Objectif de Points", "Temps de Réaction et Précision", "Note Globale", "Profil Neuromoteur"],
    rows: [
      ["Tier 1: Intercepteur Gravitationnel Ultime", "Apex Gravitational Interceptor", "24 000+ points", "< 190 ms / > 95%", "Grade S", "Top 0,1% de l'élite eSport et pilotes de chasse. Inhibition de Logan infaillible et interception parfaite à 1250 px/s (Lee 1976; Logan 1984)"],
      ["Tier 2: Attaquant Réflexe de Précision", "Precision Reflex Striker", "17 000 – 23 999 points", "195 – 240 ms / 90 – 94%", "Grade A", "Top 10% semi-professionnel. Excellente anticipation visuelle et maintien solide de la série 3.0x face à 45% de leurres rapides"],
      ["Tier 3: Intercepteur Émérite de Chute", "Skilled Drop Catcher", "11 000 – 16 999 points", "245 – 310 ms / 82 – 89%", "Grade B", "Top 35% joueurs réguliers. Coordination œil-main efficace et bonne utilisation du bonus de +0,6s pour prolonger la manche"],
      ["Tier 4: Pratiquant en Développement", "Developing Reflex Trainee", "6 000 – 10 999 points", "311 – 370 ms / 70 – 81%", "Grade C", "Niveau moyen adulte. Au-delà de 800 px/s, des clics impulsifs sur les leurres rouges surviennent et brisent les séries"],
      ["Tier 5: Débutant en Contrôle Inhibiteur", "Novice Decoy Learner", "< 6 000 points", "> 370 ms / < 70%", "Grade D", "Phase d'initiation. Difficulté à discriminer les couleurs sous vitesse; focalisation conseillée dans le tiers supérieur de l'écran"]
    ],
    note: "Critères reposant sur la chronométrie de Donders (1868), l'optique tau de Lee (1976) et le modèle inhibiteur de Logan (1984)."
  },
  techniques: {
    title: "4 Protocoles Pratiques pour Réflexes de Chute et Suppression d'Erreurs",
    items: [
      {
        name: "Ancrage Visuel dans le Tiers Supérieur (Upper Third Visual Anchoring)",
        desc: "Ne suivez pas la cible des yeux depuis le sommet jusqu'au bas de l'écran. Verrouillez votre regard dans le tiers supérieur pour catégoriser la couleur dès 50 ms et pré-positionner la souris.",
        tips: "Ne pourchassez pas la cible par l'arrière : cueillez-la au point d'interception prévu."
      },
      {
        name: "Veto Inhibiteur Stop-Signal de Logan (Logan Stop-Signal Veto)",
        desc: "Maîtrisez le réflexe primaire de l'index qui tend à presser sur tout mouvement. Dès la moindre perception de rouge, relâchez instantanément la musculature des doigts.",
        tips: "Un clic sur un leurre anéantit tout le multiplicateur 3.0x accumulé; s'abstenir est tout aussi profitable que frapper juste."
      },
      {
        name: "Interception Gravitationnelle par Tau Optique (Optical Tau Interception)",
        desc: "La vitesse croît de façon exponentielle au fil de la chute. Déclenchez le tir dans la zone médiane de l'écran avant que la cible n'atteigne une vitesse d'échappement critique.",
        tips: "N'attendez pas la bordure inférieure critique : validez le point dans la large fenêtre du tiers central."
      },
      {
        name: "Micro-Ajustement Vertical Fingertip (Fingertip Vertical Micro-Steering)",
        desc: "N'écrasez pas la main lourdement sur le tapis. Adoptez une prise du bout des doigts pour ajuster la trajectoire verticale par simple flexion des phalanges sans friction superflue.",
        tips: "Pilotez les corrections de hauteur avec les doigts tout en maintenant l'avant-bras souple et ancré."
      }
    ]
  },
  steps: [
    "Adoptez une posture équilibrée et fixez le tiers supérieur de l'aire de jeu.",
    "Déterminez en 50 ms si le cercle descendant est vert (à capturer) ou rouge (à éviter).",
    "Interceptez les cibles vertes dans la zone médiane et laissez filer les leurres rouges.",
    "Capitalisez sur le bonus de +0,6s par cible pour maintenir le multiplicateur 3.0x et viser 24 000 points."
  ],
  audience: "Élèves et sportifs désireux de mesurer le test de la règle avec une rigueur numérique, ainsi que joueurs de FPS souhaitant aiguiser leur discernement et leur rapidité décisionnelle.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('donders1868', 'lee1976', 'logan1984', 'woodworth1899', 'fitts1954', 'woods2015')
};

export default function LocalizedDropCatchPageFr() {
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
      <DropCatchClient
        copy={{
          title: "Test de la Règle & Temps de Réaction en Ligne",
          subtitle: "Discrimination Visuelle et Contrôle des Impulsions • Difficulté Évolutive Continue",
          description: "Le test de la règle et de chute libre mesure la promptitude avec laquelle vous réagissez à un objet tombant et votre capacité à vous abstenir lorsqu'il ne faut pas intervenir. Intercepter ne nécessite pas de dissocier distance et vitesse : l'image rétinienne en expansion définit le temps de contact par elle-même (Lee, 1976). La retenue procède d'un autre mécanisme — l'action et le freinage se disputent une course interne et le plus véloce l'emporte (Logan & Cowan, 1984). La réaction visuelle simple requiert déjà 200 à 250 ms avant tout début de mouvement (Woods et al., 2015).",
          hudLabels: {
            score: "Score",
            time: "Temps",
            bestScore: "Meilleur Score",
            bestCombo: "Meilleur Combo",
            getReady: "PRÉPAREZ-VOUS"
          },
          resultLabels: {
            accuracy: "Précision",
            catches: "Captures",
            fatalDecoys: "Leurres Fatals",
            peakLevel: "Niveau Max"
          },
          rulesTitle: "Règles du Drill et Barème de Points",
          rulesItems: [
            { title: "Capture des Cibles Vertes", text: "Cliquez sur les cercles verts avant qu'ils ne touchent le bas. Chaque capture rapporte 100 points de base (pondérés par le niveau et le combo) et crédite +0,6s au temps." },
            { title: "Leurres Piégés (Decoys)", text: "Ne cliquez pas sur les cercles rouges. Laissez-les tomber librement. Frapper un leurre annule l'intégralité du multiplicateur de série et déclenche une alerte visuelle." },
            { title: "Accélération Évolutive", text: "Au fil de votre score, la vitesse de chute grimpe de 400 px/s à 1250 px/s, le diamètre des cibles rétrécit et la part de leurres atteint 45%." },
            { title: "Multiplicateur et Survie", text: "Enchaînez les réceptions impeccables pour maintenir le multiplicateur 3.0x et profitez du gain continu de +0,6s par touche pour prolonger votre manche." }
          ],
          aboutTitle: "À Propos du Test de la Règle et de l'Interception Gravitationnelle",
          aboutSections: [
            {
              title: "Accélération Gravitationnelle et Tau Optique d'Interception",
              subtitle: "Évaluation du temps de contact sous accélération verticale constante",
              content: "Les objets en chute libre accélèrent continuellement sous la pesanteur. L'œil humain évalue la fenêtre d'impact par le tau optique (τ), le taux relatif inverse de l'expansion rétinienne (Lee, 1976). Cela permet d'anticiper la milliseconde précise de capture."
            },
            {
              title: "Contrôle Inhibiteur et Signaux d'Arrêt de Logan",
              subtitle: "Paradigme de contre-ordre et inhibition motrice préfrontale",
              content: "La vue de leurres rouges enclenche une compétition interne entre l'impulsion motrice réflexe 'Go' et l'inhibition 'Stop' (Logan et al., 1984). Les compétiteurs aguerris bloquent le geste involontaire jusqu'à la vérification de la couleur."
            },
            {
              title: "Chronométrie de Discrimination de Type C de Donders",
              subtitle: "Latence d'identification du stimulus avant le déclenchement moteur",
              content: "Contrairement aux tests de réflexe simple, Drop Catch reproduit la tâche de type C de Donders (1868) : plusieurs stimuli surgissent mais seuls les conformes doivent être interceptés, exigeant 80 à 120 ms de traitement supplémentaire."
            },
            {
              title: "Flick Balistique et Décélération Finale en Deux Temps",
              subtitle: "Impulsion en boucle ouverte de Woodworth combinée aux ajustements précis",
              content: "L'alignement de la souris obéit au modèle en deux phases de Woodworth (1899) : une propulsion initiale couvrant plus de 85% de la distance suivie de micro-corrections visuelles finales sous la loi de Fitts (1954)."
            }
          ]
        }}
      />
      <DrillGuide {...dropGuide} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/reflex-training/drop-catch" />
    </>
  );
}
