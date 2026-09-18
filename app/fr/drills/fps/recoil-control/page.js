import RecoilControlClient from '@/app/drills/fps/recoil-control/RecoilControlClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: "Contrôle du Recul FPS – Spray Pattern | SkillDrills",
  description: "Entraînez le contrôle du recul et les spray patterns sur votre navigateur. Maîtrisez la compensation verticale et les tirs groupés sur CS2 et Valorant.",
  keywords: [
    "contrôle du recul fps",
    "entraînement recoil cs2",
    "gérer le spray valorant",
    "entraînement spray pattern fps",
    "compenser le recul souris",
    "baisser la souris recul",
    "aim trainer contrôle de recul",
    "spray transfer entraînement cs2",
    "maîtriser le recul des armes",
    "tir en rafale précision fps",
    "recul automatique entraînement gratuit",
    "précision premier chargeur fps"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/fps/recoil-control",
    languages: getAlternateLanguages('/drills/fps/recoil-control'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Contrôle du Recul FPS – Spray Pattern | SkillDrills",
    description: "Entraînez le contrôle du recul et les spray patterns sur votre navigateur. Maîtrisez la compensation verticale et les tirs groupés sur CS2 et Valorant.",
    url: "https://skilldrills.online/fr/drills/fps/recoil-control",
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Contrôle du Recul FPS – Spray Pattern | SkillDrills",
    description: "Entraînez le contrôle du recul et les spray patterns sur votre navigateur. Maîtrisez la compensation verticale et les tirs groupés sur CS2 et Valorant.",
  },
};

export default function RecoilControlPage() {
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
        "name": "Exercices FPS",
        "item": "https://skilldrills.online/fr/drills/fps"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Contrôle du Recul",
        "item": "https://skilldrills.online/fr/drills/fps/recoil-control"
      }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Entraîneur de Contrôle du Recul SkillDrills",
    "url": "https://skilldrills.online/fr/drills/fps/recoil-control",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Nécessite un navigateur moderne avec support Pointer Lock",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Entraînement Contrôle du Recul et Spray",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Recoil Control Pattern Trainer",
    "description": "Simulateur de compensation motrice et motifs de recul d'armes avec verrouillage de curseur.",
    "genre": ["Action", "Esports Trainer", "Aim Trainer"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Browser Game"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-16",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Qu'est-ce que le contrôle du recul (Recoil Control) dans les FPS ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le contrôle du recul est la capacité neuromotrice à contrecarrer la montée et les oscillations latérales du viseur lors d'un tir continu en déplaçant la souris dans la direction opposée au motif de dispersion de l'arme."
        }
      },
      {
        "@type": "Question",
        "name": "Pourquoi les 8 à 10 premières balles sont-elles la phase cruciale d'un spray ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dans la majorité des shooters tactiques, les 8 à 10 premiers tirs présentent une ascension purement verticale hautement prévisible. La maîtrise de cette phase assure des éliminations nettes dès la première seconde du combat."
        }
      },
      {
        "@type": "Question",
        "name": "Comment le recul diffère-t-il entre CS2, Valorant et Apex Legends ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dans CS2, chaque arme possède un spray pattern fixe et rigoureusement reproductible. Dans Valorant, la montée verticale est fixe mais les oscillations horizontales terminales intègrent de l'aléatoire. Dans Apex Legends, le recuo est continu et conçu pour le suivi sur cibles mobiles."
        }
      },
      {
        "@type": "Question",
        "name": "Comment la théorie du Programme Moteur Généralisé (GMP) théorise-t-elle le spray ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Selon Schmidt & Lee (2011), le système nerveux encode le schéma inverse de recul sous forme de programme moteur en boucle ouverte. La cadence de tir dépassant la vitesse de rétroaction visuelle (environ 200 ms), la compensation s'effectue par pure anticipation musculaire."
        }
      },
      {
        "@type": "Question",
        "name": "Qu'est-ce qu'un spray transfer et comment le réussir ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le spray transfer consiste à rediriger une rafale continue d'une cible vers une seconde sans relâcher la détente, en ajustant à la fois le stade actuel de la dispersion et la distance angulaire jusqu'au nouvel adversaire."
        }
      },
      {
        "@type": "Question",
        "name": "Quel est l'impact de la sensibilité et du tapis de souris sur le recul ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Une sensibilité modérée accorde une meilleure finesse lors de la descente de l'avant-bras. Un tapis de souris offrant un bon pouvoir de freinage aide à stopper la descente au millimètre près."
        }
      },
      {
        "@type": "Question",
        "name": "Faut-il baisser la souris avec le poignet ou avec l'avant-bras ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pour de courtes rafales de 5 à 7 tirs, les doigts et le poignet suffisent. Pour des sprays complets de 30 balles, l'avant-bras doit guider le mouvement descendant pour éviter de bloquer l'articulation du poignet."
        }
      },
      {
        "@type": "Question",
        "name": "Quelle est la différence entre la dispersion (bloom) et le motif de recul ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le recul est le décalage géométrique et compensable du canon. La dispersion (bloom) représente la divergence conique stochastique de chaque balle qui ne peut pas être entièrement anticipée."
        }
      },
      {
        "@type": "Question",
        "name": "Cet entraîneur de recul est-il accessible gratuitement en ligne ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, il s'exécute directement dans le navigateur moderne avec la Pointer Lock API, sans téléchargement, abonnement ni latence superflue."
        }
      },
      {
        "@type": "Question",
        "name": "À quelle fréquence s'entraîner au contrôle du recul ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Une pratique quotidienne de 10 à 15 minutes avant les matchs classés consolide la mémoire motrice sans fatiguer excessivement les tendons fléchisseurs de l'avant-bras."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Comment Maîtriser le Contrôle du Recul dans les FPS",
    "description": "Méthode rigoureuse pour mémoriser les motifs de dispersion et compenser le recul des armes.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Configuration et Verrouillage du Curseur",
        "text": "Paramétrez votre sensibilité et vos DPI exacts et verrouillez le pointeur avec la Pointer Lock API."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Descente Verticale au Démarrage",
        "text": "Dès le premier tir de la rafale, abaissez la souris de façon fluide à la vitesse exacte de la montée de l'arme."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Compensation des Décalages Latéraux",
        "text": "Après la dixième balle, modulez le geste latéralement à l'opposé des oscillations du motif du spray."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Maintien du Groupement Central",
        "text": "Conservez les impacts concentrés dans la zone centrale de la cible pour maximiser votre multiplicateur de score."
      }
    ]
  };

  const copyFr = {
    h1Keyword: "Contrôle du Recul",
    h1Suffix: " – Entraîneur de Spray FPS",
    caption: "Contrôlez le recul vertical et horizontal en déplaçant la souris à l'opposé du motif de dispersion pour maintenir les tirs sur la cible.",
    statScore: "Score",
    statTime: "Temps",
    statAccuracy: "Précision",
    statBest: "Record",
    statAmmo: "Munitions",
    statReloading: "RECHARGEMENT...",
    pausedTitle: "Jeu en Pause",
    pausedPrompt: "Cliquez sur la zone de jeu pour réactiver le verrouillage du curseur.",
    startTitle: "Entraîneur Professionnel de Recul",
    startSubtitle: "Motifs de Spray et Compensation Motrice • Progression Continue",
    startButtonText: "DÉMARRER L'ENTRAÎNEMENT",
    getReady: "PRÊT ?",
    statHeadshots: "Headshots",
    statMaxCombo: "Combo Max",
    statPeakLevel: "Niveau Max",
    playAgainText: "REJOUER",
    shareText: "PARTAGER LE RÉSULTAT",
    rulesTitle: "Consignes d'Entraînement et Barème",
    rulesItems: [
      { num: "1", text: "Compenser la Montée Initiale", highlight: "+10 pts/tir", result: "Abaissez la souris sur les 10 premiers tirs" },
      { num: "2", text: "Ajustement Horizontal", highlight: "jusqu'à +35 pts/tir", result: "Compensez les décalages latéraux du spray" },
      { num: "3", text: "Montée de Niveau", highlight: "tous les 1 500 pts", result: "Augmente la cadence et la dispersion" },
      { num: "4", text: "Perte de Précision", highlight: "Réinitialise Combo", result: "Les tirs hors cible remettent le combo à zéro" }
    ],
    aboutTitle: "À Propos du Contrôle du Recul",
    aboutHeading: "Qu'est-ce que le Contrôle du Recul (Recoil) ?",
    aboutText: "Le recul est le relèvement mécanique du canon lors d'un tir en rafale automatique. Sa compensation repose sur des programmes moteurs en boucle ouverte (Schmidt & Lee, 2011) qui anticipent la trajectoire sans subir le temps de réaction visuel."
  };

  const recoilControlGuide = {
    heading: "Guide de Contrôle du Recul & Motifs de Spray en FPS",
    intro: [
      "L'Entraîneur Professionnel de Contrôle du Recul est un outil sensorimoteur développé pour isoler et perfectionner la compensation musculaire des armes automatiques. Dans les jeux de tir tactiques et compétitifs tels que CS2, Valorant, Apex Legends et PUBG, la compacité des groupements de tirs décide directement de l'issue de chaque duel.",
      "Contrairement aux micro-ajustements calmes, les fusils automatiques tirent à des cadences de 600 à 900 balles par minute, expulsant un tir tous les 66 à 100 ms. Comme le délai de réaction visuelle humaine est d'environ 200 ms, compenser le recul relève de Programmes Moteurs Généralisés (GMP) en boucle ouverte (Schmidt & Lee, 2011 ; Wolpert & Kawato, 1998) préenregistrés dans la mémoire musculaire.",
      "L'exercice structure le geste en deux séquences indispensables : une traction verticale fluide sur la première moitié du chargeur, puis une modulation latérale corrective sur la seconde moitié, reflétant la dynamique réelle des fusils d'assaut majeurs.",
      "Grâce à la Pointer Lock API et à une chronométrie haute précision via performance.now() (Woods et al., 2015), le simulateur calcule la précision balistique de chaque impact par rapport au centre de la cible, permettant d'éliminer les à-coups et les tractions excessives.",
      "Mode de mesure : la précision globale par chargeur et la concentration des tirs sont mesurées localement en temps réel dans votre navigateur. Les variations inférieures à 5 ms relèvent des marges usuelles de rafraîchissement d'écran et d'échantillonnage de souris."
    ],
    benchmarks: {
      title: "Paliers de Performance de Précision par Chargeur et Contrôle de Spray",
      headers: ["Niveau de Maîtrise", "Précision par Chargeur (%)", "Caractéristiques du Contrôle Moteur", "Impact Compétitif en Match"],
      rows: [
        ["Tier 1 (Laser Apex)", "78% – 90%+", "Vitesse de compensation quasi parfaite ; micro-ajustements latéraux constants sur les 30 balles", "Spray transfers létaux sur plusieurs adversaires en CS2 Faceit Niveau 10, Valorant Radiant et Apex Predator"],
        ["Tier 2 (Pro Compétitif)", "62% – 78%", "Groupement chirurgical sur les 10 premières balles ; recentrage rapide lors des inversions de spray", "Remporte aisément les duels de fusil à moyenne distance ; grande régularité en spray transfers doubles"],
        ["Tier 3 (Haut Niveau FPS)", "48% – 62%", "Bonne traction verticale ; légères hésitations ou surcompensation entre les balles 12 et 25", "Sprays fiables à courte et moyenne distance ; légère difficulté sur transferts lointains"],
        ["Tier 4 (Intermédiaire)", "35% – 48%", "Vitesse de descente instable ; hésitation vers la septième balle laissant le canon dépasser la tête", "Vulnérable lors des duels directs en tir continu ; contraint de privilégier de courtes rafales"],
        ["Tier 5 (En Progression)", "Moins de 35%", "Traction verticale tardive ou excessive ; absence d'ajustement latéral créant une dispersion anarchique", "Pertes fréquentes de duels directs ; dispersion totale des tirs autour de la cible"]
      ],
      note: "Ces paliers mesurent le pourcentage de tirs réussis sur la silhouette centrale sur des chargeurs complets de 30 balles via performance.now() (Woods et al., 2015)."
    },
    techniques: {
      title: "Protocoles Scientifiques pour Perfectionner le Contrôle du Recul",
      items: [
        {
          name: "Décomposition du Spray en Deux Temps Moteurs",
          desc: "Abordez le chargeur comme deux mouvements distincts : une descente verticale ferme et continue sur les 10 premières balles, puis des micro-ajustements latéraux au bout des doigts.",
          tips: "La majorité des éliminations tactiques interviennent dans les 8 premiers tirs ; privilégiez la perfection de la descente initiale."
        },
        {
          name: "Guidage par l'Avant-Bras pour Libérer le Poignet",
          desc: "Faites glisser l'avant-bras sur le bureau pour assurer la descente régulière sans casser excessivement le poignet vers le bas.",
          tips: "Un poignet trop plié vers l'avant bloque la mobilité latérale requise pour corriger les oscillations finales du spray."
        },
        {
          name: "Exploitation de la Friction Dynamique du Tapis",
          desc: "Appliquez une pression descendante modérée et constante pour engager la friction dynamique du tapis et stabiliser la descente.",
          tips: "Un tapis avec une texture équilibrée évite les à-coups brusques lors des tractions verticales soutenues."
        },
        {
          name: "Fixation Visuelle sur la Cible et Non sur le Réticule",
          desc: "Gardez le regard rivé sur la silhouette ennemie. Laissez la main réaliser le geste inverse de façon automatisée.",
          tips: "Suivre des yeux le réticule induit un retard de réaction de 200 ms qui dégrade la compacité de la rafale."
        }
      ]
    },
    steps: [
      "Paramétrez vos réglages réels de sensibilité et DPI pour préserver votre distance cm/360 habituelle et activez le Pointer Lock.",
      "Dès le départ du tir, abaissez la souris de façon continue pour neutraliser la montée verticale initiale.",
      "Après la dixième balle, modulez le geste latéralement à l'opposé des oscillations du spray.",
      "Maintenez le groupement serré au centre de la silhouette pour faire grimper votre multiplicateur et progresser de niveau."
    ],
    audience: "Compétiteurs de CS2, Valorant, Apex Legends et PUBG cherchant à dominer les tirs automatiques complets, supprimer le recul et réussir des spray transfers nets.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'woodworth1899'),
    related: [
      { href: "/fr/drills/fps/flick-shot-training", label: "Entraînement Flick Shot" },
      { href: "/fr/drills/fps/pro-smooth-pursuit", label: "Tracking Fluide Professionnel" },
      { href: "/fr/drills/fps/micro-correction-precision", label: "Micro-Correction de Visée" },
      { href: "/fr/drills/fps/anti-strafe-jitter-duel", label: "Duel Anti-Strafe Jitter" }
    ]
  };

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      {/* VideoGame Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <RecoilControlClient copy={copyFr} />

      <DrillGuide guide={recoilControlGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/recoil-control"
          locale="fr"
        />
      </div>
    </>
  );
}
