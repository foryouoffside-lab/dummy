import AwarenessDrillClient from '@/app/drills/fps/180-degree-awareness/AwarenessDrillClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: "Entraînement Demi-Tour 180° – Visée FPS | SkillDrills",
  description: "Entraînez les demi-tours à 180 degrés, la vision périphérique et la réaction aux attaques de dos. Perfectionnez vos flicks et votre vitesse sur CS2.",
  keywords: [
    "entraînement demi-tour 180 fps",
    "tir réflexe 180 degrés valorant",
    "comment faire un 180 en fps",
    "entraînement vision périphérique fps",
    "esquiver les flashbangs cs2 entraînement",
    "visée 180 degrés souris pc",
    "réflexe prise à revers fps",
    "rotation rapide souris fps entraînement",
    "espace tapis de souris rotation 180",
    "simulateur de visée 180 degrés gratuit",
    "entraînement visée 180 degrés",
    "temps de réaction demi-tour souris"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/fps/180-degree-awareness",
    languages: getAlternateLanguages('/drills/fps/180-degree-awareness'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Entraînement Demi-Tour 180° – Visée FPS | SkillDrills",
    description: "Entraînez les demi-tours à 180 degrés, la vision périphérique et la réaction aux attaques de dos. Perfectionnez vos flicks et votre vitesse sur CS2.",
    url: "https://skilldrills.online/fr/drills/fps/180-degree-awareness",
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Entraînement Demi-Tour 180° – Visée FPS | SkillDrills",
    description: "Entraînez les demi-tours à 180 degrés, la vision périphérique et la réaction aux attaques de dos. Perfectionnez vos flicks et votre vitesse sur CS2.",
  },
};

export default function AwarenessDrillFrPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/fr" },
      { "@type": "ListItem", "position": 2, "name": "Drills de FPS", "item": "https://skilldrills.online/fr/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Entraînement Demi-Tour 180°", "item": "https://skilldrills.online/fr/drills/fps/180-degree-awareness" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Entraînement Demi-Tour 180°",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Navigateur Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Simulateur interactif de demi-tour 180 degrés pour FPS. Améliorez votre vitesse de bras, votre réaction aux attaques dorsales et votre vision périphérique.",
    "genre": "Entraînement FPS / Conscience Spatiale",
    "url": "https://skilldrills.online/fr/drills/fps/180-degree-awareness",
    "dateModified": "2026-09-16",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Entraînement Demi-Tour 180°",
    "url": "https://skilldrills.online/fr/drills/fps/180-degree-awareness",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Nécessite JavaScript et HTML5 Canvas avec Pointer Lock",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Aim trainer 180 degrés gratuit dans le navigateur. Entraînez vos rotations rapides, l'esquive de flashbangs et le freinage souris pour CS2 et Valorant."
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Entraînement Demi-Tour 180°",
    "gamePlatform": "Web Browser",
    "genre": ["Entraînement FPS", "Aim Trainer"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "url": "https://skilldrills.online/fr/drills/fps/180-degree-awareness",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "dateModified": "2026-09-16"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-16",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Qu'est-ce que l'entraînement à la perception et au demi-tour à 180° en FPS ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "C'est un exercice moteur ciblé visant à conditionner la vision périphérique et la rotation de la souris lorsque des cibles surgissent hors du champ visuel central."
        }
      },
      {
        "@type": "Question",
        "name": "Comment les joueurs professionnels développent-ils leur repérage spatial à 360° ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Les athlètes e-sport s'entraînent avec des scénarios de wide flick, le placement du réticule et l'écoute audio 3D pour construire une carte mentale immédiate de l'espace virtuel."
        }
      },
      {
        "@type": "Question",
        "name": "Les exercices de demi-tour 180° améliorent-ils le temps de réaction ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui. La détection périphérique stimule directement les bâtonnets rétiniens et le colliculus supérieur, réduisant l'hésitation cognitive avant de lancer le balayage balistique."
        }
      },
      {
        "@type": "Question",
        "name": "De quelle façon la vision périphérique aide-t-elle dans les jeux de tir ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La fovéa ne couvre que ~2 degrés, tandis que la rétine périphérique perçoit le mouvement jusqu'à 180 degrés, permettant de détecter les flancs sans quitter l'angle principal."
        }
      },
      {
        "@type": "Question",
        "name": "Comment éviter de se faire contourner ou éliminer dans le dos en FPS ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "En combinant les repères audio avec des rotations rapides à 180 degrés. Répéter la distance physique sur le tapis garantit de neutraliser la menace arrière avant d'être éliminé."
        }
      },
      {
        "@type": "Question",
        "name": "Qu'est-ce que la conscience situationnelle en sport électronique ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "C'est la synthèse mentale continue de la mini-carte, des bruits de pas, des éliminations et des indices visuels périphériques pour anticiper les mouvements ennemis."
        }
      },
      {
        "@type": "Question",
        "name": "Cet exercice est-il adapté pour CS2, Valorant et d'autres jeux de tir ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui. Dans les shooters tactiques comme CS2 et Valorant, pivoter à 180° est indispensable pour esquiver les flashbangs et vérifier les angles. En fast FPS, c'est vital au corps à corps."
        }
      },
      {
        "@type": "Question",
        "name": "À quelle fréquence faut-il s'entraîner aux demi-tours à 180 degrés ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Une session de 10 à 15 minutes par jour optimise la consolidation motrice sans provoquer de fatigue musculaire au niveau du poignet ou du coude."
        }
      },
      {
        "@type": "Question",
        "name": "Faut-il utiliser le poignet ou le bras pour pivoter à 180 degrés ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Les grands demi-tours à 180 degrés doivent être exécutés principalement avec l'avant-bras, le coude et l'épaule, réservant le poignet et les doigts aux micro-ajustements terminaux."
        }
      },
      {
        "@type": "Question",
        "name": "Ce simulateur prend-il en charge la saisie brute de la souris (raw input) ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui. Le drill utilise l'API HTML5 Pointer Lock pour garantir une réponse brute 1:1 sans aucune accélération ni lissage matériel du curseur."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Comment Réaliser des Demi-Tours 180° et Développer la Vision Périphérique",
    "description": "Instructions détaillées pour maîtriser les demi-tours rapides à 180 degrés et la détection d'ennemis sur les flancs.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Activez le Pointer Lock et recentrez la souris",
        "text": "Cliquez sur Démarrer pour verrouiller le curseur et placez votre souris au centre précis de votre tapis."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Détectez la cible grâce à la vision périphérique",
        "text": "Gardez le regard central détendu et repérez l'apparition de la cible en bordure d'écran avec votre vision latérale."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Exécutez le balayage balistique avec l'avant-bras",
        "text": "Lancez un swipe horizontal rapide initié par le coude et l'épaule correspondant à votre angle de 180°."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Appliquez le freinage musculaire et confirmez le tir",
        "text": "Activez les muscles antagonistes pour stabiliser le réticule sur la cible et cliquez instantanément."
      }
    ]
  };

  const awarenessGuideFr = {
    heading: "Guide de Demi-Tour 180° et Repères Psychomoteurs Spatiaux",
    intro: [
      "La visée par demi-tour à 180° est une tâche sensorimotrice complexe nécessitant une synergie parfaite entre détection visuelle périphérique, saccades oculaires d'orientation et biomécanique balistique des membres supérieurs. En neurobiologie, les bâtonnets de la rétine périphérique détectent les variations brusques de luminance et de mouvement à plus de 90° de l'axe visuel, déclenchant des saccades réflexes via le colliculus supérieur (Rayner, 1998; Leigh & Zee, 2015).",
      "Transformer cette détection en un demi-tour virtuel de 180° repose sur le modèle moteur à deux composantes (Elliott et al., 2010) : un balayage balistique en boucle ouverte initié par l'épaule et le coude couvrant 80% à 90% de la trajectoire, suivi immédiatement du freinage musculaire antagoniste pour neutraliser tout dépassement (Schmidt et al., 1979). Selon la loi de Fitts (Fitts, 1954), l'amplitude angulaire accrue élève l'indice de difficulté, rendant le pouvoir d'arrêt (stopping power) et l'espace sur le tapis prépondérants.",
      "La chronométrie numérique repose sur performance.now() et l'API HTML5 Pointer Lock. Les différences inférieures à 5 ms relèvent du bruit de quantification standard. Un taux d'interrogation de 1000 Hz et un moniteur à rafraîchissement élevé garantissent une mesure rigoureuse de votre vitesse d'acquisition spatiale (Woods et al., 2015).",
      "Mesure de la performance : chaque rotation et tir est chronométré localement sur votre machine sans téléversement. Conservez la même sensibilité (cm/360°) et un positionnement stable pour forger des automatismes musculaires durables."
    ],
    benchmarks: {
      title: "Benchmarks de Demi-Tour 180° et Réacquisition Spatiale",
      headers: ["Phase de Rotation / Métrique", "Latence Moyenne (ms)", "Mécanisme Biomécanique Moteur", "Classification Psychomotrice"],
      rows: [
        ["Détection Périphérique et Déclenchement Saccadique", "140 – 190 ms", "Bâtonnets rétiniens et colliculus supérieur", "Orientation visuelle pré-attentionnelle (Rayner 1998)"],
        ["Balayage Balistique du Bras (Rotation 180°)", "180 – 260 ms", "Propulsion de l'avant-bras, coude et épaule", "Accélération cinématique en boucle ouverte (Elliott 2010)"],
        ["Décélération et Freinage du Réticule", "60 – 110 ms", "Freinage des muscles antagonistes (stopping power)", "Amortissement de l'impulsion de freinage (Schmidt 1979)"],
        ["Micro-Correction Terminale et Clic", "70 – 130 ms", "Rétroaction visuelle fovéale et déclenchement du tir", "Phase d'approche selon la loi de Fitts (Fitts 1954)"],
        ["Temps Total de Réacquisition 180°", "450 – 690 ms", "Boucle sensorimotrice complète de rotation", "Ligne de base compétitive standard tous joueurs"],
        ["Exécution Subconsciente d'Élite 180°", "320 – 420 ms", "Synergie sensibilité et mémoire musculaire en un geste", "Maîtrise e-sport lors des situations de clutch en FPS"]
      ],
      note: "Données compilées selon les standards de la biomécanique et des sciences visuelles (Rayner 1998; Fitts 1954; Schmidt et al. 1979; Elliott et al. 2010) et de la chronométrie numérique (Woods et al. 2015). Les latences réelles dépendent de la sensibilité (cm/360°), du frottement du tapis et des hertz de l'écran."
    },
    techniques: {
      title: "Biomécanique et Astuces pour des Demi-Tours 180° Éclairs",
      items: [
        {
          name: "Mouvement de Bras et Point de Pivot",
          desc: "Effectuez les grandes rotations en prenant le coude et l'épaule comme pivots principaux plutôt que de solliciter le poignet. Gardez l'avant-bras parallèle au bureau pour assurer un balayage fluide et sans frottement.",
          tips: "Libérez suffisamment d'espace sur votre tapis de souris pour exécuter une rotation complète de 180° en un seul mouvement sans soulever la souris."
        },
        {
          name: "Calibration des cm/360° et Sensibilité",
          desc: "Dans les shooters tactiques comme Valorant et CS2, les compétiteurs calibrent généralement entre 35 et 55 cm par 360° (soit 18 à 28 cm pour 180°). Veillez à ce qu'un geste du centre au bord du tapis corresponde précisément à un demi-tour.",
          tips: "Évitez de changer fréquemment de DPI afin de stabiliser votre cartographie kinesthésique."
        },
        {
          name: "Esquive de Flashbangs et Rétablissement",
          desc: "En FPS tactique, le demi-tour instantané à 180° est essentiel pour éviter d'être aveuglé par les grenades flash. Pivoter pour fuir la grenade et se réaligner immédiatement exige un contrôle parfait de la décélération.",
          tips: "Entraînez-vous à replacer le réticule au niveau de la tête adverse immédiatement après le demi-tour d'évitement."
        },
        {
          name: "Recentrage Neutre sur le Tapis",
          desc: "Après avoir effectué un grand 180° et neutralisé une menace dans votre dos, profitez des temps morts pour replacer rapidement votre souris au centre de votre tapis afin de préserver votre zone de course.",
          tips: "Prenez l'habitude de lever légèrement la souris lors des transitions pour éviter de buter contre le bord du tapis."
        }
      ]
    },
    steps: [
      "Cliquez sur Démarrer pour passer en plein écran et verrouiller le pointeur.",
      "Gardez le réticule centré tout en maintenant une attention visuelle périphérique large.",
      "Lorsqu'une cible apparaît sur un bord extrême, effectuez un swipe horizontal dynamique vers elle.",
      "Freinez fermement à proximité de la cible, confirmez l'alignement et cliquez immédiatement.",
      "Consultez votre précision, votre temps d'acquisition et votre meilleure série sur le bilan final."
    ],
    audience: "Joueurs de CS2, Valorant, Apex Legends, Overwatch et tout FPS cherchant à perfectionner leurs demi-tours, leur défense contre les flancs et leur vitesse de rotation.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'elliott2010', 'fitts1954', 'schmidt1979', 'leigh2015', 'rayner1998'),
    related: [
      { href: "/drills/fps/flick-shot-training", label: "Entraînement au Flick Shot" },
      { href: "/drills/fps/angle-hold-trainer", label: "Entraîneur de Placement de Viseur (Crosshair Placement)" },
      { href: "/drills/fps/micro-correction-precision", label: "Entraînement aux Micro-Corrections" },
      { href: "/drills/reaction-speed/reaction-time-test", label: "Test de Temps de Réaction" }
    ]
  };

  const copyFr = {
    h1Keyword: "Entraînement Demi-Tour 180°",
    h1Suffix: " — Visée et Réflexes FPS",
    statScore: "Score",
    statTime: "Temps",
    statAccuracy: "Précision",
    statBestScore: "Meilleur Score",
    startTitle: "Entraînement Demi-Tour 180°",
    startSubtitle: "Entrée Brute de Souris • Niveaux Infinis",
    getReady: "PRÊT",
    pausedTitle: "Jeu en Pause",
    pausedSubtitle: "Cliquez pour reprendre — le verrouillage du curseur sera réactivé",
    stageCaption: "Repérez les cibles sur les bords par vision périphérique et effectuez des demi-tours à 180°.",
    rulesTitle: "Règles d'Entraînement et Système de Points",
    rulesItems: [
      { title: "Cible Touchée (+100 pts)", text: "Les tirs consécutifs augmentent le multiplicateur de combo jusqu'à 3.0x." },
      { title: "Bords 180° et Série", text: "Les cibles apparaissent aux extrémités, rétrécissent et exigent des réactions plus vives." },
      { title: "Tir Manqué / Temps Écoulé", text: "Tout tir raté réinitialise le combo. Avec pénalité, vous perdez 0.8s au chronomètre." }
    ],
    aboutTitle: "À Propos de l'Entraînement Demi-Tour 180°",
    aboutHeading: "Pourquoi entraîner les demi-tours à 180 degrés ?",
    aboutText1: "Un demi-tour à 180 degrés représente le mouvement physique le plus ample dans un jeu de tir. Selon la loi de Fitts (1954), la durée du mouvement dépend de la distance et de la taille de la cible : la difficulté majeure réside dans le freinage et l'arrêt net sur la cible après la rotation.",
    aboutText2: "180° Awareness Pro isole et affine votre capacité à traiter les informations visuelles en dehors de votre champ fovéal. Contrairement aux drills de micro-ajustement, cet exercice sollicite une grande amplitude motrice sur votre tapis.",
    aboutText3: "En répétant régulièrement ces grands demi-tours, vous synchronisez l'espace physique de votre tapis avec l'espace 3D du jeu, facilitant les réactions réflexes face aux ennemis dans votre dos sur CS2 et Valorant."
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

      <AwarenessDrillClient copy={copyFr} />

      <DrillGuide guide={awarenessGuideFr} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/180-degree-awareness"
          locale="fr"
        />
      </div>
    </>
  );
}
