import ProFlickClient from '@/app/drills/fps/flick-shot-training/ProFlickClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Entraînement Flick Shot – Tir Réflexe et Visée | SkillDrills",
  description: "Entraînez le flick shot et le tir réflexe sur PC. Maîtrisez la propulsion balistique et le freinage de souris pour réussir vos tirs sur CS2 et Valorant.",
  keywords: [
    "entraînement flick shot",
    "visée réflexe rapide fps",
    "comment améliorer son flick valorant",
    "entraînement tir réflexe souris",
    "exercices de flick shot cs2",
    "comment freiner sa souris sur un flick",
    "entraînement snap aim en ligne",
    "comment réussir ses flick shots",
    "précision premier tir entraînement",
    "simulateur de flick shot navigateur",
    "entraînement de visée gratuit pc",
    "exercices de tir balistique souris"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/fps/flick-shot-training",
    languages: getAlternateLanguages('/drills/fps/flick-shot-training'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Entraînement Flick Shot – Tir Réflexe et Visée | SkillDrills",
    description: "Entraînez le flick shot et le tir réflexe sur PC. Maîtrisez la propulsion balistique et le freinage de souris pour réussir vos tirs sur CS2 et Valorant.",
    url: "https://skilldrills.online/fr/drills/fps/flick-shot-training",
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Entraînement Flick Shot – Tir Réflexe et Visée | SkillDrills",
    description: "Entraînez le flick shot et le tir réflexe sur PC. Maîtrisez la propulsion balistique et le freinage de souris pour réussir vos tirs sur CS2 et Valorant.",
  },
};

export default function FlickShotFrPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/fr" },
      { "@type": "ListItem", "position": 2, "name": "Entraînements FPS", "item": "https://skilldrills.online/fr/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Entraînement Flick Shot", "item": "https://skilldrills.online/fr/drills/fps/flick-shot-training" }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Entraîneur de Flick Shot en Ligne",
    "url": "https://skilldrills.online/fr/drills/fps/flick-shot-training",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Nécessite un navigateur prenant en charge HTML5 Canvas et JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Simulateur gratuit d'entraînement au flick shot dans le navigateur. Perfectionnez l'accélération balistique et le freinage de souris pour CS2 et Valorant."
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Entraîneur de Flick Shot SkillDrills",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Outil biomécanique d'évaluation et de perfectionnement du tir réflexe pour joueurs compétitifs de FPS.",
    "genre": "Entraînement FPS / Tir Réflexe",
    "url": "https://skilldrills.online/fr/drills/fps/flick-shot-training",
    "dateModified": "2026-09-05",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Entraînement au Flick Shot FPS",
    "url": "https://skilldrills.online/fr/drills/fps/flick-shot-training",
    "description": "Entraîneur interactif de tir réflexe avec cibles dynamiques pour optimiser le temps d'acquisition et la précision du premier tir.",
    "gamePlatform": "Web Browser",
    "genre": ["Entraînement FPS", "Entraîneur de Visée"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-05",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Qu'est-ce qu'un flick shot dans les jeux FPS ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le flick shot (ou tir réflexe balistique) est la faculté neuromusculaire de déplacer le réticule d'une position neutre vers une cible périphérique dans une trajectoire explosive unique, suivie d'un clic immédiat."
        }
      },
      {
        "@type": "Question",
        "name": "Comment améliorer son flick shot sur Valorant et CS2 ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Travaillez une accélération balistique constante associée à un freinage musculaire net sur le tapis, désactivez toute accélération logicielle et réalisez 15 à 20 minutes d'exercices ciblés par jour."
        }
      },
      {
        "@type": "Question",
        "name": "Quelle est la différence entre le tracking et le flick shot ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le tracking consiste à maintenir continuellement le viseur sur une cible en mouvement constant (crucial dans Apex et Overwatch). Le flick shot est une impulsion balistique rapide pour éliminer instantanément une cible statique ou imprévue."
        }
      },
      {
        "@type": "Question",
        "name": "Comment corriger le dépassement de cible (overflick) ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "L'overflick est causé par un défaut de freinage mécanique. Engagez la contraction des muscles antagonistes et appliquez une pression descendante sur le tapis de souris au terme du déplacement, ou réduisez légèrement votre eDPI."
        }
      },
      {
        "@type": "Question",
        "name": "Quelle est la sensibilité eDPI idéale pour le flick shot ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sur Valorant, une plage de 200 à 320 eDPI (ex. 800 DPI avec 0,25 à 0,4) assure une décélération optimale. Sur CS2, une sensibilité de 600 à 1000 eDPI garantit réactivité et contrôle des tirs à la tête."
        }
      },
      {
        "@type": "Question",
        "name": "Comment la loi de Fitts s'applique-t-elle à la visée réflexe ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La loi de Fitts démontre que le temps de visée dépend de la distance et du diamètre de la cible (ID = log2(2D/W)). S'exercer avec des diamètres variés améliore la précision motrice sous forte contrainte temporelle."
        }
      },
      {
        "@type": "Question",
        "name": "Doit-on privilégier la vitesse ou la précision ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Privilégiez la propreté de l'arrêt (90% à 95% de coups réussis) avant de chercher une vitesse extrême. Une mémoire motrice sans oscillations parasites permet d'augmenter naturellement la cadence de tir."
        }
      },
      {
        "@type": "Question",
        "name": "Quel est l'impact de la fréquence de l'écran sur les tirs réflexes ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Des écrans à 144 Hz (6,94 ms) et 240 Hz (4,17 ms) affichent l'apparition de la cible bien plus tôt qu'un moniteur 60 Hz (16,67 ms), facilitant la phase de micro-ajustement visuel terminal."
        }
      },
      {
        "@type": "Question",
        "name": "Combien de temps faut-il s'entraîner chaque jour ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Une séance concentrée de 15 à 20 minutes par jour optimise la consolidation motrice sans provoquer de fatigue musculaire ou de tension excessive au poignet."
        }
      },
      {
        "@type": "Question",
        "name": "L'exercice augmente-t-il la difficulté lors des séries ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui. En plus des 15 niveaux de progression, un algorithme adaptatif réduit la taille des cibles et resserre les intervalles d'apparition lors de séries ininterrompues de tirs réussis."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Comment S'entraîner au Flick Shot et au Tir Réflexe sur Navigateur",
    "description": "Instructions étape par étape pour développer l'accélération et le freinage mécanique de souris.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Calibrer la Sensibilité et la Posture Neutre",
        "text": "Ajustez votre eDPI sur vos paramètres en jeu et recentrez la souris en posture neutre sur le tapis."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Fixation Visuelle Souple et Détection Périphérique",
        "text": "Fixez le centre sans forcer pour détecter l'apparition de la cible périphérique dès les premières millisecondes."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Impulsion Balistique Directe et Clic Immédiat",
        "text": "Propulsez le curseur en ligne directe vers le centre de la cible et cliquez avant l'expiration du temps de la cible."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Freinage Musculaire et Friction sur le Tapis",
        "text": "Appliquez une pression descendante avec les doigts sur le tapis de souris pour stopper net sur la cible."
      }
    ]
  };

  const flickGuide = {
    heading: "Guide Scientifique d'Entraînement au Flick Shot et Contrôle Moteur",
    intro: [
      "Le flick shot (ou visée balistique réflexe) est le processus biomécanique consistant à convertir une fixation oculaire en une trajectoire motrice rectiligne du bras et du poignet. Dans la science du contrôle moteur, le modèle à deux composants d'Elliott et al. (2010) modélise ce geste : une impulsion balistique initiale en boucle ouverte couvrant la quasi-totalité de la distance, suivie d'une phase terminale de guidage visuel en boucle fermée pour corriger les micro-écarts.",
      "Selon la loi de Fitts (Fitts, 1954), la durée du mouvement dépend de la difficulté de la tâche : ID = log2(2D/W), où la distance (D) et le diamètre de la cible (W) déterminent le temps nécessaire. Un entraînement méthodique développe la décélération coordonnée des muscles antagonistes (Schmidt et al., 1979), permettant au joueur de stopper net sur la cible sans rebond ni dépassement.",
      "La latence du matériel et la chronométrie numérique du navigateur influencent directement les mesures temporelles. Cet outil s'appuie sur performance.now() pour horodater chaque tir à la milliseconde près. Avec une souris à 1000 Hz (1,0 ms) et un écran à haut rafraîchissement (144 Hz à 6,94 ms, 240 Hz à 4,17 ms), le bruit de quantification est minimisé pour isoler le pur temps d'acquisition neuromusculaire (Woods et al., 2015).",
      "Mesure technique sur votre appareil : chaque événement de clic est horodaté localement par le navigateur, sans envoi de données vers des serveurs distants. Les navigateurs limitent la précision temporelle à environ 1 ms pour des raisons de sécurité liées à Spectre, et les écrans affichent les images par intervalles réguliers (16,7 ms à 60 Hz contre 4,1 ms à 240 Hz). Suivez vos progrès en comparant vos sessions sur un même poste de travail."
    ],
    benchmarks: {
      title: "Repères d'Acquisition de Cible et Temps de Mouvement (TM)",
      headers: ["Phase du Mouvement / Métrique", "Latence Typique (ms)", "Mécanisme de Contrôle Moteur", "Niveau et Loi de Fitts"],
      rows: [
        ["Saccade Visuelle Initiale et Latence", "180 – 220 ms", "Fovéation oculaire et latence du cortex visuel", "Détection du stimulus avant l'amorce de l'impulsion (Woods et al. 2015)"],
        ["Mouvement Balistique Principal (Impulsion)", "120 – 180 ms", "Activation musculaire agoniste-antagoniste", "Trajectoire balistique en boucle ouverte couvrant 80–90% du trajet (Elliott et al. 2010)"],
        ["Micro-Correction Secondaire (Guidage)", "60 – 120 ms", "Rétroaction visuelle et freinage mécanique", "Phase finale en boucle fermée résolvant l'indice de difficulté (Fitts 1954)"],
        ["Temps Total d'Acquisition (Brut)", "360 – 520 ms", "Boucle sensorimotrice complète + déclenchement du clic", "Norme compétitive standard chez les joueurs réguliers"],
        ["Acquisition Subconsciente d'Élite", "240 – 320 ms", "Synergie motrice automatisée sans corrections superflues", "Maîtrise compétitive de haut niveau en FPS tactique avec arrêt net sur cible"]
      ],
      note: "Données synthétisées d'après la recherche en contrôle moteur (Fitts 1954; Schmidt et al. 1979; Elliott et al. 2010) et la chronométrie numérique (Woods et al. 2015). Les résultats varient selon le rafraîchissement de l'écran, le taux d'interrogation de la souris et l'amplitude de la cible."
    },
    techniques: {
      title: "Sensibilités eDPI Recommandées par Jeu",
      items: [
        {
          name: "Calibration pour Valorant",
          desc: "Plage eDPI recommandée : 200 - 320 (DPI × Sensibilité en jeu). Ex. : 800 DPI avec 0,25 à 0,4. Optimise la stabilité et la précision du premier tir à la tête.",
          tips: "Utilisez le bras pour les grands repositionnements et le poignet pour les micro-ajustements."
        },
        {
          name: "Calibration pour Counter-Strike 2 (CS2)",
          desc: "Plage eDPI recommandée : 600 - 1000. Ex. : 800 DPI avec 0,8 à 1,25. Offre un équilibre parfait entre tenue de ligne et tir réflexe.",
          tips: "Positionnez toujours le réticule à hauteur de tête avant d'amorcer le tir réflexe."
        },
        {
          name: "Calibration pour Apex Legends et Shooters Rapides",
          desc: "Plage eDPI recommandée : 1000 - 1600. Permet des rotations fluides à 360° et un suivi dynamique en combat rapproché.",
          tips: "Privilégiez un tapis à glisse fluide et combinez le flick shot avec des exercices de poursuite."
        },
        {
          name: "Calibration pour Overwatch 2 (Héros Hitscan)",
          desc: "Plage eDPI recommandée : 800 - 1200 pour les tireurs comme Cassidy ou Fatale.",
          tips: "Gardez la main détendue pour éviter les crispations qui provoquent des tremblements à l'arrêt."
        }
      ]
    },
    scientificPrinciples: {
      title: "Principes Biomécaniques du Tir Réflexe",
      items: [
        {
          name: "Loi de Fitts et Compromis Vitesse-Précision",
          desc: "Accélérer prématurément sans patron moteur stable dégrade l'impact terminal. Développez d'abord une ligne droite et constante avant d'augmenter la vitesse."
        },
        {
          name: "Modèle de Double Boucle d'Elliott",
          desc: "Les joueurs d'élite éliminent la quasi-totalité de la phase de correction secondaire en atteignant la cible en un seul mouvement fluide."
        },
        {
          name: "Freinage Mécanique et Co-Contraction Antagoniste",
          desc: "Un arrêt immédiat repose sur l'action simultanée des fléchisseurs et extenseurs combinée au frottement de la main sur le tapis."
        }
      ]
    },
    steps: [
      "Cliquez sur Démarrer le Drill pour lancer l'arène de flick shot en plein écran.",
      "Fixez votre regard au centre du réticule.",
      "Dès l'apparition de la cible, propulsez vivement la souris vers son centre et cliquez instantanément.",
      "Évitez les glissements lents : focalisez-vous sur une accélération franche suivie d'un freinage net sur la cible.",
      "Analysez votre taux de précision, votre temps moyen d'acquisition et votre rang sur le récapitulatif."
    ],
    audience: "Compétiteurs de FPS tactiques (Valorant, CS2, Rainbow Six Siege), joueurs de Battle Royale (Apex Legends, Fortnite) et tout joueur cherchant une précision chirurgicale sur le premier tir.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'elliott2010', 'fitts1954', 'schmidt1979'),
    related: [
      { href: "/fr/drills/fps/180-degree-awareness", label: "Conscience Spatiale 180°" },
      { href: "/fr/drills/fps/angle-hold-trainer", label: "Placement du Réticule et Tenue d'Angle" },
      { href: "/fr/drills/reaction-speed/reaction-time-test", label: "Test de Temps de Réaction" },
      { href: "/fr/drills/motor/movement-speed/rapid-tapping", label: "Test CPS et Vitesse de Clic" }
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
      <ProFlickClient
        copy={{
          h1Keyword: "Entraînement Flick Shot",
          h1Suffix: " – Tir Réflexe et Précision",
          subtitle: "Entraînez votre snap aim, mémoire motrice balistique, acquisition de cibles et freinage de souris avec analyse en temps réel.",
          statScore: "Score",
          statTime: "Temps Restant",
          statAccuracy: "Précision",
          statBestScore: "Meilleur Score",
          statAvgFlick: "Flick Moyen",
          statMaxCombo: "Combo Max",
          statPeakLevel: "Niveau Max",
          startTitle: "Pro Flick Trainer",
          startSubtitle: "Flicks Balistiques & Acquisition de Cibles • Progression Dynamique Infinie",
          getReady: "Préparez-vous",
          toggleFlash: "Flash de Tir Manqué",
          toggleSound: "Effets Sonores",
          pausedTitle: "En Pause",
          pausedSubtitle: "Cliquez pour reprendre — Le verrouillage du curseur sera réactivé.",
          stageCaption: "Visez rapidement les cibles aléatoires et tirez avec précision avant l'expiration du temps imparti.",
          rulesTitle: "Règles d'Entraînement & Système de Score",
          rulesItems: [
            { num: "1", text: "Cible Touchée", highlight: "+100 PTS (+0,6s)", result: "×Multiplicateur Combo" },
            { num: "2", text: "Série de Combos", highlight: "Jusqu'à 3.0×", result: "Cibles Plus Rapides" },
            { num: "3", text: "Niveau Supérieur", highlight: "+1 / 1800 PTS", result: "Progression Adaptative" },
            { num: "4", text: "Tir Manqué / Expiration", highlight: "Pénalité", result: "Réinitialise Combo (-0,8s)" }
          ],
          aboutTitle: "À Propos du Pro Flick Trainer",
          aboutHeading: "Qu'est-ce que le Flick Aim ?",
          aboutText: "Le flick aim est la capacité neuromotrice à propulser le réticule en une seule impulsion balistique directe vers la cible et à le stabiliser instantanément. Selon la loi de Fitts (1954), la difficulté dépend de la distance et de la taille. La maîtrise réside dans le freinage mécanique antagoniste sur le tapis (Elliott et al., 2010)."
        }}
      />
      <DrillGuide guide={flickGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/flick-shot-training"
          locale="fr"
        />
      </div>
      <DrillFooter />
    </>
  );
}
