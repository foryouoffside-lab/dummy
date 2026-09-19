import TargetSwitchingSwarmClient from '@/app/drills/fps/target-switching-swarm/TargetSwitchingSwarmClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Target Switching FPS – Changement de Cibles | SkillDrills',
  description: "Entraînez le target switching et le changement de cible. Éliminez l'hésitation et maîtrisez les spray transfers sur CS2 et Valorant gratuitement.",
  keywords: [
    'target switching aim trainer',
    'changement de cible fps',
    'entrainement de visee fps',
    'spray transfer cs2',
    'visee multi cibles valorant',
    'flick rapide enchaine',
    'entrainement reflexe fps',
    'aim trainer gratuit',
    'transition de cible shooter',
    'precision souris gaming',
    'viser rapidement fps',
    'vitesse d acquisition cible'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/fps/target-switching-swarm',
    languages: getAlternateLanguages('/drills/fps/target-switching-swarm'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Target Switching FPS – Changement de Cibles | SkillDrills',
    description: "Entraînez le target switching et le changement de cible. Éliminez l'hésitation et maîtrisez les spray transfers sur CS2 et Valorant gratuitement.",
    url: 'https://skilldrills.online/fr/drills/fps/target-switching-swarm',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Target Switching FPS – Changement de Cibles | SkillDrills',
    description: "Entraînez le target switching et le changement de cible. Éliminez l'hésitation et maîtrisez les spray transfers sur CS2 et Valorant gratuitement.",
  },
};

export default function TargetSwitchingSwarmFrPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/fr" },
      { "@type": "ListItem", "position": 2, "name": "Entraînements FPS", "item": "https://skilldrills.online/fr/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Target Switching Swarm", "item": "https://skilldrills.online/fr/drills/fps/target-switching-swarm" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Entraîneur de Target Switching FPS SkillDrills",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Any (Web Browser)",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Outil d'entraînement en ligne gratuit au target switching et aux transitions rapides pour les joueurs de CS2, Valorant et Apex Legends."
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Target Switching Swarm – Visée et Changement de Cible",
    "url": "https://skilldrills.online/fr/drills/fps/target-switching-swarm",
    "browserRequirements": "Requires Pointer Lock API and WebGL support",
    "applicationCategory": "ShooterTraining",
    "creator": {
      "@type": "Organization",
      "name": "SkillDrills"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Target Switching Swarm",
    "description": "Simulateur d'essaim de cibles dynamiques pour développer la vitesse d'enchaînement, le spray transfer et supprimer l'hésitation cognitive post-élimination.",
    "genre": ["First-Person Shooter", "Aim Trainer", "Reaction Training"],
    "playMode": "SinglePlayer",
    "gamePlatform": ["PC", "Web Browser"]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Qu'est-ce que le target switching dans l'entraînement au tir FPS ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le target switching (changement de cible) est l'aptitude mécanique à détruire un premier ennemi et à transférer instantanément le viseur sur une seconde cible sans marquer de temps d'arrêt perceptif ni réinitialiser sa posture."
        }
      },
      {
        "@type": "Question",
        "name": "Quelle est la différence entre le target switching et un flick shot classique ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le flick classique se concentre sur un tir balistique isolé depuis une posture neutre. Le target switching exige d'enchaîner plusieurs flicks consécutifs avec un freinage précis au centre de chaque cible en conservant l'inertie du mouvement."
        }
      },
      {
        "@type": "Question",
        "name": "Comment le format d'essaim (swarm) améliore-t-il les éliminations multiples (multi-kills) ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "L'apparition simultanée de plusieurs cibles à durée de vie limitée contraint le regard périphérique à pré-calculer la trajectoire suivante pendant que la main finalise le tir actuel, développant l'indexation visuelle rapide."
        }
      },
      {
        "@type": "Question",
        "name": "Pourquoi observe-t-on souvent une hésitation après avoir éliminé un adversaire ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cette pause de 100 à 250 ms survient quand le cerveau attend le son ou l'animation de confirmation de mort avant de chercher la cible suivante. L'entraînement sépare l'analyse du kill de l'engagement sacadique vers le prochain ennemi."
        }
      },
      {
        "@type": "Question",
        "name": "Le target switching facilite-t-il les spray transfers sur CS2 et Valorant ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolument. Réussir un spray transfer nécessite de transférer une rafale continue d'un ennemi à l'autre en quelques millisecondes. Cet exercice automatise la décélération précise sur la nouvelle cible sans perdre le contrôle du recul."
        }
      },
      {
        "@type": "Question",
        "name": "Quels jeux compétitifs tirent le plus grand bénéfice du target switching ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Counter-Strike 2, Valorant, Apex Legends, Overwatch 2 et Call of Duty. Dans les FPS tactiques, il permet d'enchaîner des têtes en 1vX ; dans les battle royales, il permet de basculer de tir dès qu'un blindage est brisé."
        }
      },
      {
        "@type": "Question",
        "name": "Quelle prise de souris (grip) optimise les enchaînements rapides de cibles ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Les prises Claw grip et Fingertip grip sont idéales car elles combinent l'amplitude du bras pour les grands changements d'angle avec la mobilité des doigts pour effectuer des micro-arrêts millimétrés."
        }
      },
      {
        "@type": "Question",
        "name": "Quel est le rapport entre le target switching et la loi de Fitts ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Selon la loi de Fitts (Fitts, 1954), le temps d'exécution dépend de la distance et de la taille de la cible. Cibler prioritairement les ennemis proches réduit la distance angulaire et accélère la cadence globale d'élimination."
        }
      },
      {
        "@type": "Question",
        "name": "À quelle fréquence convient-il de s'entraîner au target switching ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Une routine de 10 à 15 minutes par jour en guise d'échauffement avant vos parties compétitives réveille la coordination œil-main et l'acuité sacadique sans provoquer de fatigue musculaire excessive."
        }
      },
      {
        "@type": "Question",
        "name": "Cet entraîneur de target switching en ligne est-il gratuit et fluide ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, 100% gratuit et sans téléchargement. Il tourne directement dans votre navigateur via la Pointer Lock API, sans latence artificielle et avec votre sensibilité souris habituelle."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Comment Maîtriser le Target Switching et l'Enchaînement de Cibles FPS",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Régler la Sensibilité et Verrouiller le Curseur",
        "text": "Configurez vos DPI et votre sensibilité identique à votre jeu principal dans les paramètres et cliquez pour capturer la souris."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Repérer les Groupes de Cibles les Plus Proches",
        "text": "Scannez l'arène pour identifier les cibles disposant de la plus faible séparation angulaire."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Détruire la Première Cible et Prolonger le Temps",
        "text": "Éliminez la première cible pour remporter +100 points et ajouter +0,35s au compte à rebours."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Enchaîner la Cible Suivante sans Pause",
        "text": "Basculez directement sur la cible voisine sans marquer de temps d'arrêt pour valider le kill précédent."
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Maintenir la Série de Combos et Gravir les Niveaux",
        "text": "Enchaînez les cibles avec précision pour augmenter le multiplicateur de combo et franchir les paliers de difficulté."
      }
    ]
  };

  const targetSwitchingGuide = {
    heading: "Guide de Target Switching & Cinématique Multi-Cibles en FPS",
    intro: [
      "Le Target Switching Swarm est un exercice d'entraînement moteur et d'indexation visuelle conçu pour conditionner des transitions ultra-rapides et sans hésitation entre plusieurs cibles adverses. Dans les jeux de tir tactiques comme Counter-Strike 2 et Valorant, ou les jeux dynamiques comme Apex Legends, les situations d'action ne se limitent que rarement à des duels 1v1 isolés. Remporter des rounds décisifs exige d'abattre un premier adversaire et de basculer instantanément sur une seconde cible sans subir de délai cognitif post-élimination.",
      "La psychophysique du target switching repose sur la loi de Fitts (Fitts, 1954) et sur le modèle stochastique des sous-mouvements optimisés de David E. Meyer et al. (1988). Selon cette approche, un mouvement de visée comprend un sous-mouvement balistique primaire couvrant environ 90% de la trajectoire, suivi de micro-ajustements secondaires guidés par la rétroaction visuelle. Les joueurs novices perdent 100 à 250 ms immobiles après chaque tir pour s'assurer que l'ennemi est bien tombé. Les joueurs d'élite déclenchent la saccade oculaire vers la cible suivante avant même la fin de l'impact précédent.",
      "L'indexation visuelle dans un groupe dense fait appel aux mécanismes d'intégration des caractéristiques et de recherche visuelle préattentionnelle (Anne M. Treisman & Garry Gelade, 1980 ; Jeremy M. Wolfe, 2007). Le cortex visuel humain suit plusieurs repères spatiaux simultanément (théorie FINST), permettant d'organiser des trajets optimisés entre cibles adjacentes afin de minimiser la distance angulaire parcourue par le poignet.",
      "Mesure de vos performances : chaque clic est horodaté à l'aide de l'horloge haute résolution performance.now() du navigateur, localement sur votre machine — aucune donnée n'est envoyée vers l'extérieur. Précision matérielle : les navigateurs arrondissent les minuteurs (~1 ms) pour bloquer les failles Spectre, et les écrans affichent l'image à intervalles fixes (16,7 ms à 60 Hz, 6,9 ms à 144 Hz, 4,1 ms à 240 Hz ; Woods et al., 2015). Le taux de rafraîchissement de la souris induit environ 8 ms à 125 Hz contre 1 ms à 1000 Hz. Les écarts sous 5 ms relèvent de la marge de mesure."
    ],
    benchmarks: {
      title: "Barème de Performance : Target Switching et Vitesse de Transition",
      headers: ["Palier de Compétence", "Temps de Transition", "Cadence d'Élimination (Cibles/Min)", "Impact en Partie Classée"],
      rows: [
        ["Tier 1 (Radiant / Faceit Niveau 10 / Pro)", "Moins de 210 ms", "110+ Cibles/min", "Spray transfers parfaits ; zéro hésitation ; clutches 1v3 remportés avec assurance"],
        ["Tier 2 (Immortal / Faceit 8-9 / Master)", "210 – 260 ms", "92 – 110 Cibles/min", "Excellente régularité d'enchaînement ; légères oscillations sur les grands angles ; multi-kills réguliers"],
        ["Tier 3 (Ascendant / Diamant / Avancé)", "260 – 320 ms", "74 – 92 Cibles/min", "Solide sur cibles regroupées ; difficultés sur les bascules traversant l'écran"],
        ["Tier 4 (Platine / Or / Intermédiaire)", "320 – 400 ms", "56 – 74 Cibles/min", "Hésitation nette après chaque élimination (100+ ms) ; dépassements fréquents par freinage tardif"],
        ["Tier 5 (Argent / Bronze / Débutant)", "Plus de 400 ms", "Moins de 56 Cibles/min", "Replace la souris entre chaque tir ; recherche visuelle repartant de zéro ; crispation musculaire"]
      ],
      note: "Le temps de transition mesure l'intervalle entre la destruction d'une cible et l'arrivée du réticule sur la suivante ; la cadence d'élimination mesure le volume continu sur la session (Woods et al., 2015)."
    },
    techniques: {
      title: "Protocoles Scientifiques pour Perfectionner le Changement de Cible",
      items: [
        {
          name: "Pré-Routage Saccadique et Indexation Visuelle",
          desc: "Dirigez votre regard vers la cible suivante pendant que votre main finalise le tir sur la cible courante (Treisman & Gelade, 1980 ; Wolfe, 2007). Les yeux précèdent la main de 50 à 80 ms.",
          tips: "Ne fixez jamais une cible après avoir tiré ; laissez la vision périphérique valider la destruction tandis que votre fovéa verrouille la prochaine cible."
        },
        {
          name: "Freinage Terminal et Contrôle des Sous-Mouvements",
          desc: "Appliquez une fermeté musculaire de contre-tension dans les 10% finaux du mouvement pour immobiliser la souris au centre sans rebond (Meyer et al., 1988).",
          tips: "Voyez votre souris comme un bolide avec des freins hydrauliques : accélérez fort au départ, puis bloquez net au centre du prochain blanc."
        },
        {
          name: "Enchaînement Spatial par Cibles Voisines",
          desc: "Éliminez les groupes de cibles présentant le moins d'écart angulaire plutôt que de traverser le moniteur de manière désordonnée (Fitts, 1954).",
          tips: "Neutralisez d'abord les binômes proches pour accumuler les points avant d'entamer de grandes diagonales."
        },
        {
          name: "Détente Musculaire et Micro-Ajustabilité",
          desc: "Adoptez une force de prise détendue (3 sur 10) pour permettre des micro-ajustements rapides avec les doigts sans verrouiller l'avant-bras.",
          tips: "Si vous ressentez des tensions ou des à-coups, relâchez consciemment la pression du pouce et de l'auriculaire."
        }
      ]
    },
    steps: [
      "Ajustez vos DPI et votre sensibilité à l'identique de votre FPS compétitif favori et verrouillez le curseur.",
      "Identifiez les grappes de cibles proches afin de définir l'ordre d'élimination le plus court.",
      "Détruisez la première cible pour obtenir +100 points et +0,35s au compte à rebours.",
      "Transférez immédiatement votre visée sur la cible voisine sans marquer de temps de validation.",
      "Enchaînez les cibles consécutives pour accroître le multiplicateur de combo et franchir les paliers de score."
    ],
    audience: "Joueurs compétitifs de Valorant, CS2, Apex Legends et Overwatch souhaitant accélérer la prise de cible, maîtriser les spray transfers et éliminer toute hésitation en combat.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'meyer1988', 'treisman1980', 'wolfe2007'),
    related: [
      { href: "/fr/drills/fps/target-prioritization", label: "Priorisation des Cibles FPS" },
      { href: "/fr/drills/fps/flick-shot-training", label: "Entraînement au Flick Shot" },
      { href: "/fr/drills/fps/target-acquisition", label: "Acquisition de Cible FPS" },
      { href: "/fr/drills/fps/180-degree-awareness", label: "Perception 180° Pro" },
      { href: "/fr/drills/fps/recoil-control", label: "Contrôle du Recul" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <TargetSwitchingSwarmClient
        copy={{
          h1Keyword: "Entraînement Target Switching FPS",
          h1Suffix: " – Changement de Cibles et Spray Transfer",
          subtitle: "Entraînez les transitions rapides de cibles, les spray transfers et l'indexation visuelle sans pause de réajustement.",
          statScore: "Score",
          statTime: "Temps",
          statAccuracy: "Précision",
          statBestScore: "Meilleur Score",
          statTargetsDestroyed: "Cibles Détruites",
          statMaxCombo: "Combo Max",
          statPeakLevel: "Niveau Max",
          startTitle: "Target Switching Swarm",
          startSubtitle: "Entrée Souris Brute (Raw Input) • Progression Continue",
          stageCaption: "Enchaînez les tirs rapidement entre les cibles avant la fin de leur chronomètre. Évitez les tirs manqués pour maximiser le combo !",
          rulesTitle: "Règles d'Entraînement & Système de Score",
          aboutTitle: "À Propos du Target Switching dans les FPS",
          rulesItems: [
            { num: "1", text: "Destruction de Cible", highlight: "Cibles Cyan (+100 PTS / +0,35s)", result: "+100 PTS / +0,35s" },
            { num: "2", text: "Essaim Dynamique", highlight: "Réapparition Immédiate", result: "Essaim Continu" },
            { num: "3", text: "Pénalité d'Échec", highlight: "Tir Manqué / Expiration", result: "Reset de Combo" },
            { num: "4", text: "Progression de Niveau", highlight: "+1 Niveau / 2 100 PTS", result: "Plus Rapide & Petit" }
          ]
        }}
      />
      <DrillGuide guide={targetSwitchingGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/target-switching-swarm"
          locale="fr"
        />
      </div>
      <DrillFooter />
    </>
  );
}
