import TargetPrioritizationClient from '@/app/drills/fps/target-prioritization/TargetPrioritizationClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Priorisation des Cibles FPS – Visée Décisive | SkillDrills",
  description: "Entraînez la priorisation des cibles, l'analyse des menaces et la discipline de tir. Maîtrisez la décision tactique pour Valorant et CS2.",
  keywords: [
    "priorisation des cibles fps",
    "entrainement priorisation de cibles",
    "evaluation des menaces fps",
    "controle d inhibition de tir",
    "comment choisir sa cible en shoot",
    "prise de decision tir fps",
    "discipline de tir shooter",
    "selection de cibles valorant",
    "aim trainer cognitif gratuit",
    "identification de cibles fps",
    "entrainement go no go fps",
    "exercice priorisation de cibles"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/fps/target-prioritization",
    languages: getAlternateLanguages('/drills/fps/target-prioritization'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Priorisation des Cibles FPS – Visée Décisive | SkillDrills",
    description: "Entraînez la priorisation des cibles, l'analyse des menaces et la discipline de tir. Maîtrisez la décision tactique pour Valorant et CS2.",
    url: "https://skilldrills.online/fr/drills/fps/target-prioritization",
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Priorisation des Cibles FPS – Visée Décisive | SkillDrills",
    description: "Entraînez la priorisation des cibles, l'analyse des menaces et la discipline de tir. Maîtrisez la décision tactique pour Valorant et CS2.",
  },
};

export default function TargetPrioritizationFrPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/fr" },
      { "@type": "ListItem", "position": 2, "name": "Entraînement FPS", "item": "https://skilldrills.online/fr/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Priorisation des Cibles", "item": "https://skilldrills.online/fr/drills/fps/target-prioritization" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Entraîneur de Priorisation des Cibles FPS",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-16",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Entraîneur cognitif de priorisation de cibles, évaluation des menaces et contrôle d'inhibition motrice (Go/No-Go) pour shooters compétitifs.",
    "genre": "Entraînement FPS / Visée Cognitive et Prise de Décision",
    "url": "https://skilldrills.online/fr/drills/fps/target-prioritization",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Entraîneur de Priorisation des Cibles FPS",
    "url": "https://skilldrills.online/fr/drills/fps/target-prioritization",
    "description": "Entraîneur cognitif de priorisation de cibles, évaluation des menaces et contrôle d'inhibition motrice (Go/No-Go) pour shooters compétitifs.",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "browserRequirements": "Nécessite le support HTML5 Canvas et Pointer Lock API",
    "dateModified": "2026-09-16"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Entraîneur de Priorisation des Cibles FPS",
    "url": "https://skilldrills.online/fr/drills/fps/target-prioritization",
    "description": "Entraîneur cognitif de priorisation de cibles, évaluation des menaces et contrôle d'inhibition motrice (Go/No-Go) pour shooters compétitifs.",
    "dateModified": "2026-09-16",
    "gamePlatform": "Web Browser",
    "genre": ["Entraînement FPS", "Aim Trainer", "Priorisation des Cibles"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-16",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Qu'est-ce que la priorisation des cibles dans les FPS compétitifs ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La priorisation des cibles est la fonction exécutive cognitive qui consiste à analyser immédiatement plusieurs ennemis à l'écran, à identifier la menace la plus urgente et à la neutraliser en priorité, tout en retenant son tir devant les cibles secondaires et alliées."
        }
      },
      {
        "@type": "Question",
        "name": "Pourquoi les joueurs tirent-ils en panique sur la mauvaise cible ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sous l'effet de l'adrénaline, le système visuel réagit par réflexe en ciblant le premier objet en mouvement plutôt que le joueur le plus dangereux. L'entraînement d'inhibition exécutive apprend au cortex préfrontal à garder le contrôle sous stress intense."
        }
      },
      {
        "@type": "Question",
        "name": "Comment le paradigme Go/No-Go s'applique-t-il au tir tactique ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Créé par Franciscus Donders (1868), le protocole Go/No-Go mesure l'aptitude à tirer sans délai sur les cibles valides et à bloquer le geste devant les éléments neutres ou alliés, empêchant ainsi le tir ami et les pertes d'avantage tactique."
        }
      },
      {
        "@type": "Question",
        "name": "Qu'est-ce que le Temps de Réaction au Signal d'Arrêt (SSRT) ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le SSRT (Logan & Cowan, 1984) chiffre le délai pour annuler un ordre moteur déjà enclenché. En match, les professionnels stoppent leur tir en 200 à 240 ms lorsqu'ils s'aperçoivent que leur curseur dérive vers un coéquipier ou un leurre."
        }
      },
      {
        "@type": "Question",
        "name": "Comment les professionnels hiérarchisent-ils les menaces en duel multiple ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Les joueurs d'élite évaluent la ligne de vue directe, l'armement et l'imminence de la riposte. Un opposant qui a déjà son viseur sur vous doit être abattu avant un joueur en plein déplacement de profil."
        }
      },
      {
        "@type": "Question",
        "name": "Qu'est-ce que la suppression des distracteurs en neurosciences de la vision ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "C'est la capacité d'attention sélective permettant au cerveau d'inhiber les données visuelles superflues (Treisman, 1980), concentrant ainsi la fovéa sur la cible critique sans se faire piéger par les leurres périphériques."
        }
      },
      {
        "@type": "Question",
        "name": "Quel est le coût d'un tir sur un allié ou un leurre dans Valorant et CS2 ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tirer sur un clone (comme un leurre de Yoru) révèle votre position sonore, gaspille vos balles et écarte le viseur du danger authentique, ce qui conduit presque toujours à l'élimination de votre agent."
        }
      },
      {
        "@type": "Question",
        "name": "Quelle sensibilité de souris facilite la sélection rapide de cibles ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Une sensibilité moyenne à modérément basse (30 à 42 cm par 360°) offre une adhérence mécanique supérieure sur le tapis, évitant que le curseur ne déborde vers une mauvaise cible lors de grappes compactes."
        }
      },
      {
        "@type": "Question",
        "name": "Pourquoi l'adrénaline altère-t-elle la vitesse de décision tactique ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Une stimulation sympathique aiguë restreint le champ de vision (effet tunnel) et surcharge la mémoire de travail, diminuant la capacité à traiter plusieurs silhouettes simultanément sans entraînement préalable."
        }
      },
      {
        "@type": "Question",
        "name": "Combien de temps faut-il consacrer à la priorisation de cibles chaque jour ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Consacrer 10 minutes à cet exercice avant vos parties compétitives affûte la vitesse de discernement et la discipline de tir sans occasionner de fatigue musculaire."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Comment Maîtriser la Priorisation de Cibles et la Discipline de Tir",
    "description": "Protocole étape par étape pour calibrer la sensibilité, catégoriser les menaces et abattre les cibles dans le bon ordre.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Calibrer sa Sensibilité en Entrée Brute 1:1",
        "text": "Ajustez vos DPI et votre sensibilité conformément à votre jeu favori pour maintenir une mémoire musculaire parfaite.",
        "url": "https://skilldrills.online/fr/drills/fps/target-prioritization#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Intégrer le Code Couleur des Menaces",
        "text": "Identifiez les cibles rouges comme urgence absolue (+100 PTS), les jaunes comme secondaires (+50 PTS) et les vertes comme alliées protégées.",
        "url": "https://skilldrills.online/fr/drills/fps/target-prioritization#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Éliminer les Cibles Rouges Immédiates",
        "text": "Envoyez des flicks incisifs vers les cibles rouges avant que leur compte à rebours n'expire et n'ampute votre score.",
        "url": "https://skilldrills.online/fr/drills/fps/target-prioritization#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Retenir son Tir sur les Cibles Vertes Alliées",
        "text": "Bloquez tout réflexe de clic au survol des silhouettes vertes pour conserver intact votre multiplicateur de combo.",
        "url": "https://skilldrills.online/fr/drills/fps/target-prioritization#step-4"
      }
    ]
  };

  const targetPrioritizationGuide = {
    heading: "Guide de la Priorisation de Cibles FPS et Prise de Décision Tactique",
    intro: [
      "L'Entraîneur de Priorisation de Cibles est un exercice perceptivo-cognitif mis au point pour développer la vitesse d'évaluation des menaces, le filtrage de l'attention et l'inhibition motrice de tir. Dans les shooters tactiques modernes — tout particulièrement Valorant, Counter-Strike 2, Rainbow Six Siege et Apex Legends — l'issue des escarmouches contre plusieurs adversaires dépend de l'ordre d'engagement : le combattant qui neutralise la menace la plus critique en premier prend le dessus.",
      "Le mécanisme neurobiologique de l'inhibition motrice a été documenté par Gordon D. Logan et William B. Cowan (1984) au travers du modèle horse-race : quand un signal d'arrêt se manifeste, l'ordre d'inhibition entre en compétition avec la commande motrice déjà initiée. Interrompre un geste en cours requiert des circuits spécifiques au niveau du cortex préfrontal, ce qui explique la fréquence des tirs réflexes désastreux chez les débutants.",
      "En combinant la chronométrie mentale de Franciscus Cornelis Donders (1868/1969) relative aux temps de réaction de choix et la théorie d'intégration des traits d'Anne Treisman et Garry Gelade (1980), cet entraînement force le système visuel à hiérarchiser les cibles selon leur dangerosité avant d'autoriser la pression sur la souris.",
      "En associant le modèle attentionnel de Michael I. Posner (1990), les recherches spatiales de C. Shawn Green et Daphne Bavelier (2003) et la mesure numérique à haute résolution (Woods et al., 2015), l'exercice éradique les tirs de panique pour instaurer une visée sélective et clinique en compétition.",
      "Protocole de mesure : chaque action est mesurée en millisecondes avec performance.now() localement dans votre navigateur sans aucune fuite de données. Contraintes matérielles : les minuteurs web intègrent une précision de 1 ms, et les écrans se rafraîchissent par paliers de 16,7 ms (60 Hz), 6,9 ms (144 Hz) et 4,1 ms (240 Hz). Le taux de rafraîchissement de la souris génère 8 ms à 125 Hz contre 1 ms à 1000 Hz (Woods et al., 2015). Évaluez votre évolution sur un équipement identique."
    ],
    benchmarks: {
      title: "Barèmes Scientifiques de Priorisation des Menaces et Temps de Décision",
      headers: ["Niveau de Performance", "Latence de Résolution", "Précision de Priorité", "Impact Compétitif en Match"],
      rows: [
        ["Tier 1 (Apex Commander / Radiant)", "<280 ms", "96% – 99%+", "Évaluation des menaces infaillible ; élimination immédiate du danger majeur avec 0% de tir ami lors d'assauts frénétiques"],
        ["Tier 2 (Maître Compétitif / Pro Tier-2)", "280 – 340 ms", "90% – 96%", "Vitesse de décision remarquable ; reprise rapide après escalade des cibles ; moins de 1% d'erreurs de tir"],
        ["Tier 3 (Diamant / Ascendant)", "340 – 420 ms", "82% – 90%", "Sélection solide des priorités ; brève hésitation de 60 à 90 ms lorsque des cibles rouges et jaunes apparaissent proches"],
        ["Tier 4 (Intermédiaire / Or / Platine)", "420 – 520 ms", "72% – 82%", "Sujet aux tirs de panique ; touche parfois des alliés verts ou vise les jaunes avant de neutraliser les rouges"],
        ["Tier 5 (Débutant / Tir Réflexe)", ">520 ms", "<72%", "Multiples erreurs d'impulsion ; taux de tir ami élevé ; difficulté à traiter la surcharge visuelle lors des reprises de site"]
      ],
      note: "La latence de résolution chronomètre l'intervalle entre l'apparition de la menace rouge et le tir validé ; la précision de priorité rapporte les éliminations valides au nombre total de clics (Woods et al., 2015)."
    },
    techniques: {
      title: "Protocoles Fondés sur la Science pour Perfectionner la Priorisation",
      items: [
        {
          name: "Inhibition Motrice Exécutive (Discipline Go/No-Go)",
          desc: "Entraînez le blocage délibéré du clic réflexe dès l'apparition d'un mouvement. Conditionnez votre index à patienter jusqu'à validation de la couleur par le cortex visuel avant d'actionner le commutateur de tir.",
          tips: "Gardez votre doigt légèrement posé sur le bouton gauche, sans tension musculaire préalable."
        },
        {
          name: "Balayage Dynamique de la Hiérarchie des Dangers",
          desc: "Inspectez la zone en recherchant prioritairement la couleur de danger critique (rouge). Neutralisez l'urgence absolue avant de consacrer votre visée aux menaces secondaires en compte à rebours (jaune).",
          tips: "Réglez toutes les cibles rouges avant de changer d'axe ; considérez les jaunes comme des urgences imminentes."
        },
        {
          name: "Suppression des Distracteurs Périphériques",
          desc: "Apprenez à occulter les éléments neutres ou alliés verts émergeant en périphérie, maintenant votre regard fovéal sur les couloirs occupés par des hostiles.",
          tips: "Ne détournez pas le réticule vers des silhouettes vertes même si elles se situent près de votre trajectoire."
        },
        {
          name: "Visée Balistique Cadencée et Arrêt Net",
          desc: "Considérez chaque flick comme un acte réfléchi et rythmé. Accélérez franchement vers le centre de la cible prioritaire et immobilisez la souris avec fermeté sur le tapis.",
          tips: "Privilégiez un déplacement net et contrôlé plutôt qu'une succession de secousses sans contrôle chromatique."
        }
      ]
    },
    steps: [
      "Indiquez votre jeu de référence, votre sensibilité et vos DPI dans les réglages pour garantir une parité 1:1 rigoureuse.",
      "Concentrez votre regard au centre sans forcer et attendez l'apparition simultanée de cibles rouges, jaunes et vertes.",
      "Repérez et neutralisez les cibles rouges d'urgence avec des tirs nets (+100 PTS / +0,4s de bonus au chronomètre).",
      "Éliminez les cibles jaunes secondaires (+50 PTS / +0,4s) avant qu'elles ne virent au rouge.",
      "Retenez impérativement votre tir face aux cibles vertes alliées ; tirer dessus ou rater une cible remet le combo à zéro."
    ],
    audience: "Joueurs compétitifs sur Valorant, Counter-Strike 2, Rainbow Six Siege et Apex Legends cherchant à éliminer les tirs réflexes, à maîtriser la discipline de tir et à dominer les combats à cibles multiples.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'posner1990', 'green2003', 'donders1969', 'treisman1980', 'logan1984'),
    related: [
      { href: "/fr/drills/fps/target-acquisition", label: "Entraînement Acquisition de Cibles" },
      { href: "/fr/drills/fps/target-switching-swarm", label: "Entraînement Target Switching Swarm" },
      { href: "/fr/drills/fps/vertical-air-track", label: "Entraînement Poursuite Aérienne Verticale" },
      { href: "/fr/drills/fps/strafe-tracking", label: "Entraînement Strafe Tracking" },
      { href: "/fr/drills/fps/flick-shot-training", label: "Entraînement Flick Shot" }
    ]
  };

  const copyFr = {
    h1Keyword: "Priorisation des Cibles FPS",
    h1Suffix: " – Prise de Décision",
    subtitle: "Entraînez l'évaluation des menaces, le filtrage cognitif et l'inhibition du tir avec analyse en temps réel.",
    statScore: "Score",
    statTime: "Temps",
    statAccuracy: "Précision",
    statBestScore: "Record",
    statThreatsCleared: "Menaces Éliminées",
    statMaxCombo: "Combo Max",
    statPeakLevel: "Niveau Record",
    startTitle: "Priorisation des Cibles Pro",
    startSubtitle: "Évaluation des Menaces · Filtrage Cognitif · Niveaux Dynamiques",
    getReady: "PRÉPAREZ-VOUS",
    toggleFlash: "Basculer le Flash d'Échec",
    toggleSound: "Basculer le Son",
    pausedTitle: "Jeu en Pause",
    pausedSubtitle: "Cliquez pour reprendre — le verrouillage du pointeur sera réactivé.",
    stageCaption: "Neutralisez d'abord les cibles rouges prioritaires puis les jaunes. Retenez votre tir sur les alliés verts !",
    rulesTitle: "Consignes de l'Exercice et Barème",
    rulesItems: [
      { num: "1", text: "Cible Haute Menace", highlight: "Rouge (+100 PTS / +0,4s)", result: "Priorité Absolue" },
      { num: "2", text: "Menace Moyenne", highlight: "Jaune (+50 PTS / +0,4s)", result: "Devient Rouge après expiration" },
      { num: "3", text: "Unité Alliée", highlight: "Vert (NE PAS TIRER)", result: "Tir allié ou manqué réinitialise combo" },
      { num: "4", text: "Niveau Supérieur", highlight: "+1 / 1400 PTS", result: "Progression Dynamique Continue" }
    ],
    aboutTitle: "À Propos de la Priorisation de Cibles FPS",
    aboutHeading: "Qu'est-ce que la Priorisation des Cibles ?",
    aboutText: "La priorisation des cibles est la compétence exécutive qui permet de sélectionner en une fraction de seconde la menace à abattre tout en retenant son tir sur le reste de la scène. Interrompre un geste déjà enclenché constitue un processus neurobiologique indépendant qui rivalise avec l'ordre de tir (Logan & Cowan, 1984) — c'est pourquoi retenir son tir est bien plus difficile que presser la détente."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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
      <TargetPrioritizationClient copy={copyFr} />
      <DrillGuide guide={targetPrioritizationGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/target-prioritization"
          locale="fr"
        />
      </div>
      <DrillFooter />
    </>
  );
}
