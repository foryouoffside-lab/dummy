import AngleHoldClient from '@/app/drills/fps/angle-hold-trainer/AngleHoldClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Placement du Viseur – Tenue de Ligne FPS | SkillDrills",
  description: "Entraînez le placement du viseur et la tenue de ligne sur PC. Calibrez votre distance au mur et neutralisez le peeker advantage sur CS2 et Valorant.",
  keywords: [
    "placement du viseur entraînement",
    "comment tenir une ligne valorant",
    "tenir un angle cs2",
    "peeker advantage comment contrer",
    "entraînement pre aim fps",
    "distance du viseur par rapport au mur",
    "viseur à hauteur de tête",
    "temps de réaction tenue de ligne",
    "punir les peekers fps entraînement",
    "tenue de coin cs2 entraînement",
    "entraînement réflexe pour les angles",
    "simulateur de tenue de ligne fps"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/fps/angle-hold-trainer",
    languages: getAlternateLanguages('/drills/fps/angle-hold-trainer'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Placement du Viseur – Tenue de Ligne FPS | SkillDrills",
    description: "Entraînez le placement du viseur et la tenue de ligne sur PC. Calibrez votre distance au mur et neutralisez le peeker advantage sur CS2 et Valorant.",
    url: "https://skilldrills.online/fr/drills/fps/angle-hold-trainer",
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Placement du Viseur – Tenue de Ligne FPS | SkillDrills",
    description: "Entraînez le placement du viseur et la tenue de ligne sur PC. Calibrez votre distance au mur et neutralisez le peeker advantage sur CS2 et Valorant.",
  },
};

export default function FrenchAngleHoldPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/fr" },
      { "@type": "ListItem", "position": 2, "name": "Drills de FPS", "item": "https://skilldrills.online/fr/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Placement du Viseur", "item": "https://skilldrills.online/fr/drills/fps/angle-hold-trainer" }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Angle Hold Pro",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Entraîneur en ligne de placement de viseur, de tenue de ligne défensive et de pré-visée pour les jeux de tir tactiques.",
    "genre": "Entraînement FPS / Placement du Viseur",
    "url": "https://skilldrills.online/fr/drills/fps/angle-hold-trainer",
    "dateModified": "2026-09-16",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Angle Hold Pro",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Simulateur interactif de tenue de ligne et de discipline de tir pour contrer le peeker's advantage sur CS2 et Valorant.",
    "genre": "Entraînement FPS / Placement du Viseur",
    "url": "https://skilldrills.online/fr/drills/fps/angle-hold-trainer",
    "dateModified": "2026-09-16",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Angle Hold Pro",
    "url": "https://skilldrills.online/fr/drills/fps/angle-hold-trainer",
    "description": "Simulateur interactif de réflexes et de placement de réticule aux angles pour les jeux de tir compétitifs.",
    "gamePlatform": "Web Browser",
    "genre": ["Entraînement FPS", "Aim Trainer"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-16"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-16",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Qu'est-ce que le placement du viseur (crosshair placement) ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "C'est la technique tactique de base consistant à maintenir le réticule constamment à hauteur de tête là où l'ennemi va apparaître, évitant les flicks réactifs d'urgence."
        }
      },
      {
        "@type": "Question",
        "name": "Qu'est-ce que l'avantage du peeker (peeker's advantage) en FPS tactique ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "C'est le délai de transmission réseau client-serveur. L'attaquant qui décale envoie ses données avant que le défenseur immobile ne les reçoive, offrant un avantage de 40 à 90 ms."
        }
      },
      {
        "@type": "Question",
        "name": "Comment les joueurs de CS2 et Valorant tiennent-ils les lignes et les angles ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "En décalant légèrement leur viseur du coin du mur. Cet espace absorbe le temps de réaction visuel et la vitesse de course ennemie pour cliquer dès qu'il traverse le réticule."
        }
      },
      {
        "@type": "Question",
        "name": "À quelle distance du mur le viseur doit-il être placé lors d'une tenue d'angle ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cela dépend de la vitesse adverse : contre les décalages larges en pleine course, tenez plus large. Contre les jiggle peeks serrés ou les approches lentes, tenez plus près du coin."
        }
      },
      {
        "@type": "Question",
        "name": "Pourquoi certains joueurs tirent-ils trop tôt (pre-fire involontaire) ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "À cause de la tension anticipatoire et d'un échec de discrimination cognitive Go/No-Go face à des feintes. Travailler la discipline de tir apprend à déclencher uniquement sur cible confirmée."
        }
      },
      {
        "@type": "Question",
        "name": "Quelle est la différence entre tenir une ligne et faire du jiggle peek ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tenir une ligne est une posture défensive statique misant sur le temps de réaction pur. Le jiggle peek est un mouvement actif en pas latéraux pour prendre l'information sans s'exposer."
        }
      },
      {
        "@type": "Question",
        "name": "Quelle est la formule réseau expliquant le peeker's advantage ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La formule est : T_advantage = (RTT_peeker / 2) + (RTT_holder / 2) + T_interp. Le délai découle du ping cumulé des deux joueurs et du tampon d'interpolation du serveur."
        }
      },
      {
        "@type": "Question",
        "name": "La fréquence de rafraîchissement de l'écran influence-t-elle la tenue de ligne ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui. Un écran à 240 Hz rafraîchit l'affichage toutes les 4,17 ms contre 16,67 ms à 60 Hz, affichant les premiers pixels de l'adversaire bien plus tôt et abaissant la latence globale."
        }
      },
      {
        "@type": "Question",
        "name": "À quelle fréquence faut-il entraîner son placement de viseur ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Une session de 10 à 15 minutes par jour combinée à des parties de deathmatch permet d'ancrer les réflexes neuromusculaires sans surcharger le poignet ni les tendons."
        }
      },
      {
        "@type": "Question",
        "name": "Ce simulateur prend-il en charge l'entrée brute de la souris (raw input) ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui. Le simulateur exploite l'API HTML5 Pointer Lock avec chronométrie performance.now() pour garantir une réponse brute directe sans lissage ni accélération logicielle."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Comment Pratiquer le Placement du Viseur et la Tenue de Ligne",
    "description": "Étapes détaillées pour ajuster la hauteur du réticule, l'écartement au mur et contrer le peeker's advantage.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Calibrez l'écartement du viseur par rapport à l'angle du mur",
        "text": "Placez le réticule légèrement décollé de l'arête du mur pour laisser la marge imposée par votre temps de réaction.",
        "url": "https://skilldrills.online/fr/drills/fps/angle-hold-trainer#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Verrouillez le viseur exactement à hauteur de tête",
        "text": "Ajustez la hauteur sur des repères visuels du décor pour que la tête adverse apparaisse directement sous le réticule.",
        "url": "https://skilldrills.online/fr/drills/fps/angle-hold-trainer#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Anticipez la vitesse de course de l'adversaire",
        "text": "Élargissez l'écartement contre les décalages en pleine course et resserrez-le face aux approches prudentes.",
        "url": "https://skilldrills.online/fr/drills/fps/angle-hold-trainer#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Tirez dès l'entrée de la cible dans le réticule",
        "text": "Faites confiance à votre pré-visée et cliquez instantanément lors du passage sans tenter de microflick réactif.",
        "url": "https://skilldrills.online/fr/drills/fps/angle-hold-trainer#step-4"
      }
    ]
  };

  const angleHoldGuideFr = {
    heading: "Guide de Placement du Viseur et Tenue de Ligne — Latence et Géométrie",
    intro: [
      "La tenue de ligne défensive est une discipline fondamentale du tir tactique régie par le temps de réaction simple de Donders (Donders, 1868) et la discrimination cognitive Go/No-Go. Contrairement au tir par flick qui requiert deux phases d'accélération et de décélération motrice (Woodworth, 1899; Meyer et al., 1988), tenir une ligne pré-aligne le réticule sur le plan horizontal de la tête, transformant une recherche spatiale 2D en une pure synchronisation temporelle de clic 1D.",
      "Sur les réseaux multijoueurs (tels que le sub-tick de CS2 et l'infrastructure de Valorant), le délai d'acheminement des paquets engendre le peeker's advantage : T_advantage = (RTT_peeker / 2) + (RTT_holder / 2) + T_interp. Pour compenser ce déficit, le défenseur doit écarter son viseur de l'arête du mur selon D_offset = v_peeker × T_reaction, permettant à l'attaquant d'entrer dans le réticule pile au moment où le tir se déclenche.",
      "La précision motrice obéit à la loi de Fitts (Fitts, 1954) : rajouter des microcorrections de dernière seconde produit du bruit moteur parasite. Angle Hold Pro s'appuie sur des horodatages de haute précision via performance.now() et une synchronisation à l'écran pour mesurer avec rigueur votre discipline de tir et votre discernement face aux feintes (Hick, 1952; Woods et al., 2015).",
      "Évaluation des performances : chaque tir et chaque réaction sont mesurés en local sur votre appareil. Maintenez les mêmes réglages de sensibilité et d'espace de bureau d'une session à l'autre pour forger une mémoire kinesthésique durable."
    ],
    benchmarks: {
      title: "Benchmarks de Tenue Défensive et Temps de Réaction au Peek",
      headers: ["Phase d'Engagement / Métrique", "Latence Moyenne (ms)", "Facteur Sensorimoteur et Réseau", "Classification de Performance"],
      rows: [
        ["Latence de Déclenchement Visuel Simple", "150 – 190 ms", "Activation rétinienne fovéale et clic du cortex moteur", "Déclenchement moteur inconscient sur stimulus anticipé (Donders, 1868)"],
        ["Latence de Discrimination (Fake/Jiggle Peek)", "210 – 280 ms", "Identification cognitive Go/No-Go de l'engagement réel", "Discipline de tir sous pression de feinte (Hick, 1952)"],
        ["Déficit de Latence du Peeker's Advantage", "40 – 90 ms", "Transit réseau RTT client-serveur + tampon d'interpolation", "Avantage de transmission pour l'attaquant en mouvement"],
        ["Fenêtre Efficace de Réponse Défensive Nette", "250 – 340 ms", "Latence visuelle cumulée + compensation du déficit réseau", "Ligne de base standard pour défenseurs en FPS tactique"],
        ["Précision d'Élite en Tenue avec Pré-Visée", "170 – 220 ms", "Écartement optimal en phase avec la vitesse adverse", "Maîtrise défensive de haut niveau (Valorant Radiant / CS2 Faceit 10)"]
      ],
      note: "Données compilées selon les standards de la chronométrie cognitive (Donders, 1868; Hick, 1952; Woods et al., 2015) et des analyses réseau de Riot Games et Valve. Les latences effectives dépendent des hertz de l'écran, du polling de la souris et de la vigilance."
    },
    techniques: {
      title: "Géométrie de Placement et Règles de Tenue d'Angle",
      items: [
        {
          name: "Calibration de l'Écartement par Rapport au Coin",
          desc: "Ne collez pas le viseur directement contre l'arête du mur. Laissez un espacement horizontal proportionnel à votre temps de réaction : plus large face aux courses rapides et plus resserré face aux décalages lents.",
          tips: "Si les adversaires dépassent souvent votre viseur avant le tir, augmentez l'écartement de 15 à 20%."
        },
        {
          name: "Discipline Horizontale à Hauteur de Tête",
          desc: "Alignez la hauteur de votre réticule à l'aide de repères de décor comme les caisses, chambranles de portes ou bandes de peinture correspondant à la tête aux distances clés.",
          tips: "Évitez le relâchement musculaire qui fait dériver le viseur vers le bas lors des phases passives."
        },
        {
          name: "La Règle 'Cliquez, N'Ajustez Pas'",
          desc: "En tenant une ligne pré-visée calibrée, engagez-vous à cliquer dès que l'ennemi franchit le réticule, sans chercher à faire un microflick réactif qui rajouterait 80 à 120 ms de latence.",
          tips: "Ayez confiance en votre placement et fixez votre regard légèrement en avant du réticule."
        },
        {
          name: "Positionnement en Off-Angle",
          desc: "Les angles standards s'exposent aux tirs de précaution (prefires). Décalez-vous d'un demi-pas vers une position inattendue pour désynchroniser la pré-visée ennemie tout en préservant votre ligne.",
          tips: "Assurez-vous d'avoir une ligne de repli immédiate avant de prendre un off-angle agressif."
        }
      ]
    },
    steps: [
      "Cliquez sur Démarrer pour passer en plein écran et verrouiller le curseur.",
      "Placez votre réticule à hauteur de tête face à l'angle en réglant l'écartement avec le mur.",
      "Gardez la main stable avec une tension musculaire modérée pour éviter les tremblements d'anticipation.",
      "Dès que la cible franchit le plan du réticule, effectuez un unique clic instantané.",
      "Suivez votre temps de réaction moyen (ms) et votre discipline de tir au fil des manches."
    ],
    audience: "Joueurs de CS2, Valorant et Rainbow Six Siege désirant perfectionner leur placement de viseur, leur discipline de tir et leurs réflexes de défense aux coins.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'meyer1988', 'woodworth1899'),
    related: [
      { href: "/drills/fps/flick-shot-training", label: "Entraînement au Flick Shot" },
      { href: "/drills/fps/180-degree-awareness", label: "Entraînement Demi-Tour 180°" },
      { href: "/drills/fps/micro-correction-precision", label: "Entraînement aux Micro-Corrections" },
      { href: "/drills/reaction-speed/reaction-time-test", label: "Test de Temps de Réaction" }
    ]
  };

  const copyFr = {
    h1Prefix: null,
    h1Keyword: "Placement du Viseur",
    h1Suffix: " — Tenue de Ligne FPS",
    subtitle: "Entraînement à la Tenue d'Angle et Défense contre le Peeker's Advantage",
    rulesItems: [
      { num: "1", text: "Cible Touchée", highlight: "+100 PTS (+0,6s)", result: "× Combo × Multiplicateur de Niveau" },
      { num: "2", text: "Multiplicateur de Combo", highlight: "Jusqu'à 3,0x points", result: "Les séries plus longues provoquent des décalages plus agressifs" },
      { num: "3", text: "Progression de Niveau", highlight: "+1 Niveau tous les 1400 PTS", result: "Fenêtre temporelle raccourcie et cibles plus vives" },
      { num: "4", text: "Tir Raté / Tir Anticipé", highlight: "Pénalité d'Erreur", result: "Réinitialisation du combo (avec pénalité : -0,8s)" }
    ],
    aboutCards: [
      { iconBg: "bg-blue-600", title: "Recommandé pour", text: "Les défenseurs de site sur Valorant, les anchors sur CS2, les joueurs de R6 Siege et quiconque veut tenir une ligne avec rigueur." },
      { iconBg: "bg-orange-600", title: "Compétences Développées", text: "Calibration de l'écartement au mur, discipline de tir contre les jiggle peeks, temps de réaction et régularité à hauteur de tête." },
      { iconBg: "bg-purple-600", title: "Détection des Fausses Décalages", text: "Les niveaux supérieurs simulent des feintes. Entraînez votre décision Go/No-Go pour ne tirer que sur décalage complet." }
    ],
    aboutSections: [
      {
        title: "Écartement Idéal par Rapport au Mur (Géométrie d'Offset)",
        paragraphs: [
          "L'erreur la plus fréquente en tenant une ligne est de coller son viseur au ras de l'arête du mur. Comme le traitement visuel et la commande motrice prennent de 180 à 220 ms, un ennemi décalant en course dépasse le viseur avant que le doigt ne puisse cliquer.",
          "En laissant un écart horizontal (D_offset = v_peeker × T_reaction), l'assaillant se jette exactement dans la trajectoire de votre balle sans nécessiter de micro-ajustement d'urgence."
        ]
      },
      {
        title: "Neutralisation Mathématique du Peeker's Advantage",
        paragraphs: [
          "En raison de la latence réseau (RTT), l'attaquant en mouvement perçoit le défenseur immobile 40 à 90 ms plus tôt. Ce déficit ne peut être comblé qu'en élargissant l'angle de visée pour compenser l'accélération transversale adverse."
        ]
      },
      {
        title: "Méthode de Mesure et Précision des Capteurs",
        paragraphs: [
          "Angle Hold Pro s'appuie sur l'API HTML5 Pointer Lock et performance.now() pour chronométrer les temps de clic à la milliseconde près, sans accélération logicielle de la souris."
        ]
      }
    ]
  };

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <AngleHoldClient copy={copyFr} />

      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="fps" currentHref="/drills/fps/angle-hold-trainer" locale="fr" />
      </div>

      <DrillGuide guide={angleHoldGuideFr} />
    </>
  );
}
