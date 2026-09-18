import VerticalAirTrackClient from '@/app/drills/fps/vertical-air-track/VerticalAirTrackClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Visée Verticale FPS – Suivi Aérien et Axe Y | SkillDrills',
  description: "Entraînez la visée verticale et le suivi aérien. Maîtrisez l'axe Y et les trajectoires paraboliques sur Apex Legends et Overwatch 2 gratuitement.",
  keywords: [
    'visee verticale fps',
    'entrainement de visee verticale',
    'tracking vertical shooter',
    'suivi aerien apex legends',
    'controle de souris axe y',
    'vertical aim trainer',
    'trajectoire parabolique overwatch',
    'smooth pursuit vertical',
    'aim trainer gratuit',
    'precision souris verticale',
    'sensibilite verticale souris',
    'tir aerien fps'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/fps/vertical-air-track',
    languages: getAlternateLanguages('/drills/fps/vertical-air-track'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Visée Verticale FPS – Suivi Aérien et Axe Y | SkillDrills',
    description: "Entraînez la visée verticale et le suivi aérien. Maîtrisez l'axe Y et les trajectoires paraboliques sur Apex Legends et Overwatch 2 gratuitement.",
    url: 'https://skilldrills.online/fr/drills/fps/vertical-air-track',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visée Verticale FPS – Suivi Aérien et Axe Y | SkillDrills',
    description: "Entraînez la visée verticale et le suivi aérien. Maîtrisez l'axe Y et les trajectoires paraboliques sur Apex Legends et Overwatch 2 gratuitement.",
  },
};

export default function VerticalAirTrackFrPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/fr" },
      { "@type": "ListItem", "position": 2, "name": "Entraînements FPS", "item": "https://skilldrills.online/fr/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Vertical Air-Track", "item": "https://skilldrills.online/fr/drills/fps/vertical-air-track" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Entraîneur de Visée Verticale FPS SkillDrills",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Any (Web Browser)",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Entraîneur en ligne gratuit de contrôle de souris sur l'axe Y et de poursuite oculaire de cibles aériennes pour Apex Legends et Overwatch 2."
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Vertical Air-Track – Entraînement au Suivi Vertical",
    "url": "https://skilldrills.online/fr/drills/fps/vertical-air-track",
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
    "name": "Vertical Air-Track",
    "description": "Simulateur de suivi de cibles aériennes sous contrainte gravitationnelle pour perfectionner la motricité sur l'axe Y et intercepter les cibles volantes.",
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
        "name": "Qu'est-ce que l'entraînement à la visée verticale dans les FPS ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Il cible les mouvements de souris sur l'axe Y (haut et bas), souvent négligés par rapport aux déplacements horizontaux. Il est crucial pour ajuster son tir sur des cibles sautant, volant ou chutant dans Apex Legends et Overwatch 2."
        }
      },
      {
        "@type": "Question",
        "name": "Qu'est-ce que le popcorn tracking et comment ce module l'entraîne-t-il ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "C'est la capacité à suivre des cibles qui rebondissent dans les airs selon des trajectoires paraboliques. L'exercice conditionne la poursuite oculaire continue et l'anticipation de la pesanteur au sommet de chaque courbe."
        }
      },
      {
        "@type": "Question",
        "name": "En quoi la visée verticale est-elle primordiale sur Apex Legends ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Apex Legends exploite une grande verticalité : tremplins d'Octane, ascenseurs d'Horizon, grappins de Pathfinder. Maîtriser l'axe Y permet d'infliger un spray complet sur les ennemis en vol sans perdre son alignement."
        }
      },
      {
        "@type": "Question",
        "name": "Qu'est-ce qu'un 'elevator peek' dans les jeux compétitifs ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "C'est lorsqu'un adversaire emprunte une corde ou un dénivelé pour surgir brutalement au-dessus de votre viseur. L'exercice entraîne l'élévation immédiate du réticule et le maintien du tir sur la tête."
        }
      },
      {
        "@type": "Question",
        "name": "Pourquoi le tracking vertical est-il plus difficile biomécaniquement ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le tracking horizontal repose sur la rotation naturelle de l'avant-bras et du poignet. Le tracking vertical impose l'extension inconfortable du poignet, la crispation des doigts ou le glissement du bras contre la friction du tapis."
        }
      },
      {
        "@type": "Question",
        "name": "Comment les joueurs d'Overwatch 2 s'entraînent-ils contre les cibles aériennes ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ils s'exercent contre des héros volants comme Pharah, Echo ou Mercy et les bonds plongeants de Winston, en synchronisant la vitesse de leur souris sur l'axe Y sans temps de retard."
        }
      },
      {
        "@type": "Question",
        "name": "Le tracking vertical aide-t-il sur Halo Infinite ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, Halo Infinite intègre des canons de projection, des répulseurs et des grappins. Cet entraînement garantit de placer les quatre salves complètes du Battle Rifle sur un Spartan en plein saut."
        }
      },
      {
        "@type": "Question",
        "name": "Comment les erreurs sont-elles pénalisées dans Vertical Air-Track ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Perdre le contact avec la cible réinitialise votre multiplicateur de combo. Avec la pénalité de temps optionnelle, laisser une cible toucher le sol déduit 0,6s du chrono de session."
        }
      },
      {
        "@type": "Question",
        "name": "À quelle fréquence s'entraîner sur la visée verticale ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pratiquer 10 à 15 minutes, 3 à 4 fois par semaine, développe l'endurance des muscles extenseurs du poignet et supprime les tremblements lors des combats à forte dénivellation."
        }
      },
      {
        "@type": "Question",
        "name": "Ce simulateur de visée verticale est-il gratuit ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, 100% gratuit, sans téléchargement ni inscription. Il fonctionne directement dans votre navigateur via la Pointer Lock API, avec votre sensibilité de souris habituelle."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Comment Entraîner la Visée Verticale et le Suivi Aérien sur Navigateur",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Paramétrer la Sensibilité et Verrouiller le Curseur",
        "text": "Configurez vos DPI et votre sensibilité à l'identique de votre FPS favori dans les options et capturez le curseur."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Intercepter la Cible Dès son Éjection",
        "text": "Positionnez le réticule sur la trajectoire ascendante de la cible aérienne dès son apparition."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Accompagner la Décélération au Sommet du Vol",
        "text": "Ralentissez la vitesse de glisse au sommet de la trajectoire où la cible marque une courte pause."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Accélérer Pendant la Descente Gravitationnelle",
        "text": "Tirez vivement la souris vers le bas pour épouser l'accélération de pesanteur (g = 9,81 m/s²)."
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Maintenir le Combo et Détruire les Cibles",
        "text": "Gardez le viseur collé à la cible pour empocher les bonus d'altitude (+75) et débloquer des vitesses accrues."
      }
    ]
  };

  const verticalAirTrackGuide = {
    heading: "Guide de Visée Verticale FPS & Poursuite Parabolique Aérienne",
    intro: [
      "Le Vertical Aim Trainer (Vertical Air-Track) est un exercice de contrôle neuromusculaire spécialement conçu pour isoler la précision sur l'axe Y, la prédiction d'arcs balistiques et l'interception de cibles aériennes. Dans les fast-FPS tels qu'Apex Legends, Overwatch 2, Halo Infinite et Destiny 2, les adversaires utilisent en permanence les tremplins, tyroliennes, ascenseurs de gravité et chutes pour contourner le placement horizontal classique du réticule.",
      "La neurophysiologie de la poursuite visuelle verticale se distingue fondamentalement de l'axe horizontal. Richard J. Krauzlis (2004) a démontré que le smooth pursuit vertical mobilise des réseaux cérébelleux et tronc-encéphaliques distincts, montrant une vulnérabilité plus marquée aux micro-saccades en raison de l'asymétrie musculo-squelettique du bras. Cyril Rashbass (1961) a prouvé que la poursuite continue dépend de l'écart de vitesse rétinienne (retinal slip) et non d'un repositionnement statique par flicks.",
      "Suivre une cible en l'air exige d'intégrer intuitivement la pesanteur (g = 9,81 m/s²). Peter R. Cavanagh et al. (1984) ainsi que Michael F. Land & Peter McLeod (2000) ont mis en lumière la façon dont le système visuo-moteur anticipe la décélération à l'apex et l'accélération brutale à la chute. Ne pas anticiper cette courbe parabolique conduit inévitablement à décrocher lors de la redescente.",
      "Mesure de vos performances : chaque événement est horodaté par l'horloge performance.now() du navigateur, exécutée localement sur votre ordinateur. Précision matérielle : les navigateurs arrondissent les minuteurs (~1 ms) par sécurité Spectre et les écrans affichent l'image à intervalles fixes (16,7 ms à 60 Hz, 6,9 ms à 144 Hz, 4,1 ms à 240 Hz ; Woods et al., 2015). Les écarts inférieurs à 5 ms relèvent de la marge normale de mesure."
    ],
    benchmarks: {
      title: "Barème de Performance : Suivi Vertical et Temps de Contact Aérien",
      headers: ["Palier Compétitif", "Temps de Contact Utile", "Latence d'Inversion", "Impact en Partie Réelle"],
      rows: [
        ["Tier 1 (Predator / Grand Maître / Pro)", "> 82% Uptime", "Moins de 180 ms", "Suivi chirurgical sur tyroliennes et vols ; transition parfaite à l'apex du saut"],
        ["Tier 2 (Maître Compétitif / Tier 2)", "70% – 82% Uptime", "180 – 230 ms", "Poursuite régulière ; légères hésitations lors des inversions rapides de trajectoire"],
        ["Tier 3 (Diamant / Avancé)", "58% – 70% Uptime", "230 – 290 ms", "Bonne montée ; décrochage fréquent lors de l'accélération de chute libre"],
        ["Tier 4 (Platine / Or / Intermédiaire)", "45% – 58% Uptime", "290 – 360 ms", "Recourt à des micro-flicks saccadés au lieu d'un mouvement fluide continu sur l'axe Y"],
        ["Tier 5 (Argent / Bronze / Débutant)", "< 45% Uptime", "Plus de 360 ms", "Poignet figé ; le réticule reste constamment à la traîne des cibles en chute"]
      ],
      note: "Le temps de contact utile mesure le pourcentage de présence du réticule sur la cible durant le vol ; la latence d'inversion mesure le temps de réaction à l'apex (Woods et al., 2015)."
    },
    techniques: {
      title: "Protocoles Scientifiques pour Dompter la Visée Verticale",
      items: [
        {
          name: "Égalisation de Vitesse Rétinienne sur l'Axe Y",
          desc: "Concentrez-vous sur l'ajustement continu de la vitesse angulaire de la main sur celle de la cible plutôt que sur des micro-flicks (Rashbass, 1961 ; Krauzlis, 2004).",
          tips: "Fixez le centre du projectile aérien et laissez votre main glisser sans à-coups."
        },
        {
          name: "Anticipation de l'Apex Parabolique",
          desc: "Ralentissez la vitesse de glisse juste avant le point culminant pour préparer la redescente rapide (Land & McLeod, 2000).",
          tips: "Mettez à profit la décélération au sommet du bond pour engranger le bonus d'altitude (+75 PTS)."
        },
        {
          name: "Coordination Doigts et Avant-Bras",
          desc: "En prise claw ou fingertip, pliez et allongez les doigts pour des micro-ajustements verticaux vifs sans lever la main.",
          tips: "Pour les grands trajets verticaux, déplacez l'avant-bras de manière fluide sans bloquer le coude."
        },
        {
          name: "Contrôle de la Friction Statique Verticale",
          desc: "Ne plaquez pas excessivement la souris sur le tapis pour conserver une glisse aérienne sans résistance au démarrage.",
          tips: "Si la souris accroche lors de la montée, relâchez la pression de la paume et dépoussiérez le tapis."
        }
      ]
    },
    steps: [
      "Ajustez vos DPI et votre sensibilité à l'identique de votre FPS compétitif et capturez la souris.",
      "Repérez le départ de la cible aérienne et positionnez immédiatement votre viseur.",
      "Accompagnez l'ascension de la trajectoire parabolique en gardant le viseur centré.",
      "Synchronisez votre freinage au point culminant pour récolter les points de bonus d'apex.",
      "Accélérez la descente vers le bas jusqu'à neutraliser totalement la cible en vol."
    ],
    audience: "Joueurs d'Apex Legends, Overwatch 2, Halo et Destiny 2 cherchant à maîtriser les cibles aériennes, grappins, sauts verticaux et éliminer l'asymétrie de l'axe Y.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'krauzlis2004', 'rashbass1961', 'land2000'),
    related: [
      { href: "/fr/drills/fps/pro-smooth-pursuit", label: "Pro Smooth Pursuit" },
      { href: "/fr/drills/fps/strafe-tracking", label: "Suivi de Strafe" },
      { href: "/fr/drills/fps/target-switching-swarm", label: "Target Switching Swarm" },
      { href: "/fr/drills/fps/target-acquisition", label: "Acquisition de Cible FPS" },
      { href: "/fr/drills/fps/flow-state", label: "Flow State" }
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

      <VerticalAirTrackClient
        copy={{
          h1Keyword: "Visée Verticale FPS",
          h1Suffix: " – Suivi Aérien et Maîtrise de l'Axe Y",
          statScore: "Score",
          statTime: "Temps",
          statAccuracy: "Précision",
          statBestScore: "Meilleur Score",
          statTargetsDestroyed: "Cibles Détruites",
          statMaxCombo: "Combo Max",
          statPeakLevel: "Niveau Max",
          startTitle: "Vertical Air-Track",
          startSubtitle: "Entrée Souris Brute (Raw Input) • Progression Dynamique",
          pausedTitle: "En Pause",
          pausedSubtitle: "Cliquez pour reprendre – le verrouillage du curseur sera réactivé",
          stageCaption: "Suivez les cibles sur des trajectoires paraboliques soumises à la gravité pour une précision verticale optimale.",
          rulesTitle: "Consignes de l'Exercice & Système de Points",
          aboutTitle: "À Propos du Simulateur Vertical Air-Track",
          rulesItems: [
            {
              num: "1",
              text: "Suivre la Cible Aérienne",
              highlight: "+100 PTS / +0,4s par élimination",
              result: "Accompagnez l'arc parabolique de façon ininterrompue"
            },
            {
              num: "2",
              text: "Bonus d'Altitude",
              highlight: "Jusqu'à +75 PTS de bonus",
              result: "Détruisez les cibles à proximité de l'apex"
            },
            {
              num: "3",
              text: "Règle de Pénalité",
              highlight: "Reset de combo en cas de décrochage",
              result: "Toucher le sol réinitialise le combo (-0,6s avec pénalité)"
            },
            {
              num: "4",
              text: "Montée en Niveau",
              highlight: "+1 Niveau tous les 1 500 PTS",
              result: "La vitesse verticale et la gravité augmentent au fil du score"
            }
          ]
        }}
      />
      <DrillGuide guide={verticalAirTrackGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/vertical-air-track"
          locale="fr"
        />
      </div>
    </>
  );
}
