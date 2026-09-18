import ProSmoothPursuitClient from '@/app/drills/fps/pro-smooth-pursuit/ProSmoothPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: "Tracking Fluide FPS – Visée en Poursuite | SkillDrills",
  description: "Entraînez le tracking fluide et le suivi de trajectoire en courbe. Maîtrisez la visée continue sans tremblements pour Apex et Overwatch 2.",
  keywords: [
    "entraînement tracking fluide fps",
    "smooth pursuit visée fps",
    "entraînement tracking apex legends",
    "visée de poursuite continue",
    "tracking trajectoire courbe",
    "comment améliorer tracking overwatch 2",
    "mouvements oculaires de poursuite visuelle",
    "entraînement stabilité avant bras souris",
    "aim trainer tracking fluide gratuit",
    "supprimer tremblement visée souris",
    "suivi de cible continu fps",
    "poursuite visuelle cible mobile"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/fps/pro-smooth-pursuit",
    languages: getAlternateLanguages('/drills/fps/pro-smooth-pursuit'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Tracking Fluide FPS – Visée en Poursuite | SkillDrills",
    description: "Entraînez le tracking fluide et le suivi de trajectoire en courbe. Maîtrisez la visée continue sans tremblements pour Apex et Overwatch 2.",
    url: "https://skilldrills.online/fr/drills/fps/pro-smooth-pursuit",
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tracking Fluide FPS – Visée en Poursuite | SkillDrills",
    description: "Entraînez le tracking fluide et le suivi de trajectoire en courbe. Maîtrisez la visée continue sans tremblements pour Apex et Overwatch 2.",
  },
};

export default function ProSmoothPursuitPage() {
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
        "name": "Tracking Fluide Professionnel",
        "item": "https://skilldrills.online/fr/drills/fps/pro-smooth-pursuit"
      }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Entraîneur de Tracking Fluide SkillDrills",
    "url": "https://skilldrills.online/fr/drills/fps/pro-smooth-pursuit",
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
    "name": "Entraînement de Tracking Fluide et Courbes",
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
    "name": "Pro Smooth Pursuit Curve Tracking Trainer",
    "description": "Simulateur de poursuite continue sur courbes harmoniques de Lissajous avec verrouillage du curseur.",
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
        "name": "Qu'est-ce que le Smooth Pursuit (poursuite visuelle fluide) dans les FPS ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le Smooth Pursuit est la capacité neuro-oculaire et motrice de synchroniser la vitesse de la souris avec celle d'une cible en mouvement continu, permettant de coller le réticule sans interruption sur la hitbox adverse."
        }
      },
      {
        "@type": "Question",
        "name": "Quelle est la différence neurologique entre poursuite visuelle et saccades ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Les saccades (flicks) sont des mouvements balistiques brusques régulés par le colliculus supérieur, tandis que le Smooth Pursuit mobilise le cortex visuel temporal médian (aire MT/V5) et le cervelet pour moduler une vitesse constante et continue sans coupures perceptives."
        }
      },
      {
        "@type": "Question",
        "name": "Pourquoi ma visée tremble-t-elle lors du suivi de trajectoires en courbe ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le tremblement apparaît lorsqu'un joueur tente de suivre la cible via de micro-flicks successifs au lieu d'un balayage fluide. Une tension musculaire excessive dans le poignet induit une friction statique qui brise la linéarité du geste."
        }
      },
      {
        "@type": "Question",
        "name": "Qu'est-ce que l'anticipation fovéale (Foveal Gaze Leading) en tracking ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Il s'agit de positionner le regard légèrement en avant du centre de la cible dans le sens de la trajectoire. Cette anticipation visuelle transmet au cortex moteur les coordonnées d'accélération nécessaires pour ajuster la visée sans latence."
        }
      },
      {
        "@type": "Question",
        "name": "Pourquoi le Smooth Pursuit est-il indispensable sur Apex Legends et Overwatch 2 ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dans les jeux à Time-to-Kill élevé, éliminer un ennemi exige de maintenir un tir nourri pendant plusieurs secondes au fil de glissades ou sauts aériens. Une visée fluide maximise les dégâts par seconde (DPS) sans dispersion inutile."
        }
      },
      {
        "@type": "Question",
        "name": "Qu'est-ce qu'une courbe de Lissajous et pourquoi l'utiliser pour s'entraîner ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Les courbes de Lissajous sont des figures géométriques harmoniques formées par la superposition de mouvements sinusoïdaux sur deux axes. Elles contraignent les muscles du bras à moduler accélérations et décélérations diagonales, reproduisant les trajectoires d'esquives avancées."
        }
      },
      {
        "@type": "Question",
        "name": "Quel est l'impact de la fréquence de l'écran et du polling rate sur le tracking ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Un écran à taux de rafraîchissement élevé (144Hz à 360Hz) offre une densité d'images continue réduisant le flou de mouvement. Un polling rate de 1000Hz ou plus rafraîchit la position du curseur chaque milliseconde, permettant un guidage sub-pixel d'une parfaite fluidité."
        }
      },
      {
        "@type": "Question",
        "name": "Quelle prise en main de souris apporte la meilleure stabilité en suivi continu ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Une prise Palm ou Claw détendue assure un bon contact avec la coque de la souris, permettant aux grands groupes musculaires de l'avant-bras et de l'épaule de guider le déplacement sans accumuler de tension parasite dans le poignet."
        }
      },
      {
        "@type": "Question",
        "name": "À quelle fréquence s'entraîner à la poursuite visuelle fluide ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Des sessions régulières de 10 à 15 minutes avant les matchs compétitifs sont recommandées. Le tracking continu mobilisant une grande concentration sensorimotrice, de courtes pauses préservent les tendons des avant-bras."
        }
      },
      {
        "@type": "Question",
        "name": "Pourquoi quitter la cible réinitialise-t-il le combo dans cet entraîneur ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le multiplicateur récompense le temps de contact ininterrompu. En situation de duel réel, décrocher de la hitbox d'un adversaire permet la régénération de ses boucliers et interrompt l'avantage tactique acquis."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Comment Maîtriser le Tracking Fluide et Suivi en Courbe",
    "description": "Méthode pas à pas pour synchroniser la vitesse de déplacement et éliminer les tremblements sur cible mobile.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Calibration et Verrouillage du Curseur",
        "text": "Réglez vos paramètres habituels de sensibilité et DPI pour conserver votre distance cm/360 et activez le Pointer Lock."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Verrouillage Initial sur la Cible",
        "text": "Dès l'apparition de la sphère oscillante, placez le réticule au centre d'un geste souple et continu."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Guidage Continu par l'Avant-Bras",
        "text": "Suivez les courbures de Lissajous en mobilisant l'avant-bras avec une pression constante et une vitesse modulée."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Maintien de la Série de Combo",
        "text": "Restez collé à la sphère lors des décélérations aux sommets de courbe pour accumuler le multiplicateur de score maximal."
      }
    ]
  };

  const copyFr = {
    h1Keyword: "Tracking Fluide FPS",
    h1Suffix: " – Visée en Poursuite",
    statScore: "Score",
    statTime: "Temps",
    statAccuracy: "Précision",
    statBestScore: "Record",
    pausedTitle: "Jeu en Pause",
    pausedSubtitle: "Cliquez sur la zone de jeu pour réactiver le verrouillage du curseur.",
    startTitle: "Tracking Fluide Professionnel",
    startSubtitle: "Poursuite sur Courbe de Lissajous • Progression Continue",
    getReady: "PRÊT ?",
    stageCaption: "Suivez en continu la cible oscillante le long des courbes sans perdre le contact visuel.",
    rulesTitle: "Consignes d'Entraînement et Barème",
    rulesItems: [
      { num: "1", text: "Maintenir le Réticule sur la Cible", highlight: "+10 pts/seconde", result: "Suivi continu de la sphère mobile" },
      { num: "2", text: "Multiplicateur de Combo", highlight: "jusqu'à 5x bonus", result: "Augmente avec la durée de contact ininterrompue" },
      { num: "3", text: "Montée de Niveau", highlight: "tous les 1 500 points", result: "Accélère la trajectoire et réduit la cible" },
      { num: "4", text: "Perte de Contact", highlight: "Réinitialise Combo", result: "Quitter la sphère remet le multiplicateur à zéro" }
    ],
    aboutTitle: "À Propos de l'Entraîneur de Tracking Fluide",
    aboutHeading: "Qu'est-ce que la Poursuite Visuelle Fluide (Smooth Pursuit) ?",
    aboutText: "La poursuite visuelle fluide (Smooth Pursuit) est la capacité oculomotrice à maintenir le regard sur un objet en mouvement continu par une modulation précise de la vitesse oculaire et de l'avant-bras (Krauzlis, 2004 ; Barnes, 2008). Cet exercice élimine les micro-flicks superflus pour transformer votre visée en un faisceau régulier et constant."
  };

  const smoothPursuitGuide = {
    heading: "Guide de Tracking Fluide & Courbes de Lissajous",
    intro: [
      "L'Entraîneur de Tracking Fluide Professionnel est un dispositif sensorimoteur conçu pour isoler et conditionner la synchronisation continue de la vitesse manuelle et oculaire. Dans les jeux compétitifs à Time-to-Kill élevé comme Apex Legends, Overwatch 2 et The Finals, remporter des duels prolongés requiert un réticule inébranlable sur des cibles mobiles.",
      "Contrairement aux flicks balistiques régis par la loi de Fitts (1954), la poursuite fluide sollicite des réseaux corticaux spécialisés dans l'aire temporale médiane (MT/V5) et le cervelet (Krauzlis, 2004 ; Lisberger et al., 1987). Ces structures décodent les vecteurs de flux optique et ajustent le gain neuromusculaire pour épouser l'accélération adverse.",
      "La trajectoire du module s'appuie sur des courbes harmoniques de Lissajous combinant des fonctions sinusoïdales sur les axes horizontaux et verticaux. Cette structure empêche toute prévisibilité linéaire, stimulant un contrôle moteur anticipateur (Barnes, 2008) sans générer de saccades correctives saccadées.",
      "En combinant l'API Pointer Lock à une chronométrie haute précision via performance.now() (Woods et al., 2015), cet outil mesure précisément le temps de maintien effectif sur la cible, éliminant les tremblements de souris pour construire une visée implacable.",
      "Mode de mesure : le temps de contact et la régularité du faisceau sont calculés localement à chaque trame. Les variations inférieures à 5 ms relèvent des tolérances normales d'affichage et d'échantillonnage de capteur."
    ],
    benchmarks: {
      title: "Paliers de Performance de Tracking Continu et Synchronisation de Vitesse",
      headers: ["Niveau de Performance", "Temps sur Cible (%)", "État Neuromusculaire et Oculomoteur", "Impact Compétitif en Match"],
      rows: [
        ["Tier 1 (Faisceau Parfait)", "85% – 95%+", "Verrouillage fovéal ininterrompu ; vitesse parfaitement synchronisée aux sommets de courbe sans à-coups", "Visée d'élite en Apex Predator, Top 500 Overwatch et tournois majeurs"],
        ["Tier 2 (Pro Compétitif)", "72% – 85%", "Modulation souple par l'avant-bras ; adaptation immédiate de la trajectoire aux inversions de courbure", "Remporte les duels 1v1 prolongés contre des cibles mobiles avec une excellente gestion de chargeur"],
        ["Tier 3 (Haut Niveau FPS)", "58% – 72%", "Tracking linéaire solide ; légères hésitations de 10 à 15% lors d'inversions de trajectoire imprévues", "Excellente efficacité tactique ; légère perte de contact sur des manœuvres aériennes verticales"],
        ["Tier 4 (Intermédiaire)", "42% – 58%", "Tendance à enchaîner des micro-flicks plutôt qu'un glissement fluide ; crispation du poignet générant des à-coups", "Vulnérable aux cibles très agiles ; dispersion de tirs considérable"],
        ["Tier 5 (En Progression)", "Moins de 42%", "Retard constant sur la cible mobile ; difficulté à synchroniser la vitesse lors des changements de direction", "Pertes fréquentes de duels directs ; le réticule décroche continuellement de la hitbox"]
      ],
      note: "Ces paliers évaluent le pourcentage de temps passé sur la cible mobile le long de courbes de Lissajous continues mesuré via performance.now() (Woods et al., 2015)."
    },
    techniques: {
      title: "Protocoles Scientifiques pour Optimiser la Poursuite Fluide",
      items: [
        {
          name: "Balayage par l'Avant-Bras et Relâchement du Poignet",
          desc: "Effectuez la majorité du déplacement continu en faisant pivoter l'avant-bras depuis le coude, tout en maintenant le poignet relâché pour éviter la friction statique créatrice de saccades.",
          tips: "Posez confortablement l'avant-bras sur le bureau pour offrir un plan d'appui stable lors des grandes trajectoires."
        },
        {
          name: "Anticipation Visuelle Fovéale (Gaze Leading)",
          desc: "Dirigez votre regard 1 à 2 millimètres en avant du centre de la sphère dans le sens de son déplacement pour instruire le cortex moteur de l'accélération à venir.",
          tips: "Ne fixez pas votre propre réticule ; concentrez votre attention sur le bord avant de la cible mobile."
        },
        {
          name: "Transition Continue aux Points d'Inflexion",
          desc: "Aux sommets de courbe où la cible ralentit pour changer de direction, ne stoppez pas le mouvement brusquement. Décélérez progressivement et inversez la trajectoire avec souplesse.",
          tips: "Visualisez la courbe comme une onde sinusoïdale fluide plutôt que comme des lignes brisées."
        },
        {
          name: "Pression Constante sur le Tapis de Souris",
          desc: "Appliquez une pression descendante légère et constante pour garantir une résistance cinétique uniforme sous les patins de la souris tout au long du tracé.",
          tips: "Un tapis de souris avec une glisse homogène et une faible friction statique élimine les micro-blocages au départ des courbes."
        }
      ]
    },
    steps: [
      "Configurez vos réglages usuels de DPI et de sensibilité pour garantir une correspondance motrice exacte de cm/360, puis activez le Pointer Lock.",
      "Dès que la cible mobile apparaît, amenez le réticule au centre avec un mouvement progressif.",
      "Épousez les ondulations de la courbe de Lissajous en déplaçant l'avant-bras à la même vitesse que la cible.",
      "Conservez le réticule sur la sphère sans interruption pour faire grimper votre combo et progresser vers les paliers exigeants."
    ],
    audience: "Compétiteurs d'Apex Legends, d'Overwatch 2 et de The Finals souhaitant éliminer les tremblements de visée et perfectionner un tracking de haute précision.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'barnes2008', 'krauzlis2004', 'lisberger1987'),
    related: [
      { href: "/fr/drills/fps/anti-zigzag-movement-trainer", label: "Entraîneur de Mouvement Anti-Zigzag" },
      { href: "/fr/drills/fps/anti-strafe-jitter-duel", label: "Duel Anti-Strafe Jitter" },
      { href: "/fr/drills/fps/flick-shot-training", label: "Entraînement Flick Shot" },
      { href: "/fr/drills/fps/micro-correction-precision", label: "Micro-Correction de Visée" }
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

      <ProSmoothPursuitClient copy={copyFr} />

      <DrillGuide guide={smoothPursuitGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/pro-smooth-pursuit"
          locale="fr"
        />
      </div>
    </>
  );
}
