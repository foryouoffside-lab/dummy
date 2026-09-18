import AntiStrafeJitterClient from '@/app/drills/fps/anti-strafe-jitter-duel/AntiStrafeJitterClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: "Tracking Réactif – Entraînement Anti-Strafe | SkillDrills",
  description: "Entraînez le tracking réactif face aux strafes rapides ADAD sur PC. Maîtrisez le suivi à courte distance et les micro-ajustements sur Apex et Overwatch 2.",
  keywords: [
    "entraînement tracking réactif fps",
    "anti strafe entraînement souris",
    "comment suivre un strafe adad",
    "tracking courte distance apex",
    "jitter aim entraînement pc",
    "suivi de cible en mouvement rapide",
    "micro corrections visée tracking",
    "visée contre strafe rapide overwatch",
    "aim trainer tracking gratuit navigateur",
    "duels au corps à corps fps visée",
    "changement de direction suivi souris",
    "entraînement réflexe tracking réactif"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/fps/anti-strafe-jitter-duel",
    languages: getAlternateLanguages('/drills/fps/anti-strafe-jitter-duel'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Tracking Réactif – Entraînement Anti-Strafe | SkillDrills",
    description: "Entraînez le tracking réactif face aux strafes rapides ADAD sur PC. Maîtrisez le suivi à courte distance et les micro-ajustements sur Apex et Overwatch 2.",
    url: "https://skilldrills.online/fr/drills/fps/anti-strafe-jitter-duel",
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tracking Réactif – Entraînement Anti-Strafe | SkillDrills",
    description: "Entraînez le tracking réactif face aux strafes rapides ADAD sur PC. Maîtrisez le suivi à courte distance et les micro-ajustements sur Apex et Overwatch 2.",
  },
};

export default function AntiStrafeJitterFrPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/fr" },
      { "@type": "ListItem", "position": 2, "name": "Drills de FPS", "item": "https://skilldrills.online/fr/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Entraîneur Anti-Strafe", "item": "https://skilldrills.online/fr/drills/fps/anti-strafe-jitter-duel" }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Anti-Strafe Jitter Trainer",
    "url": "https://skilldrills.online/fr/drills/fps/anti-strafe-jitter-duel",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Nécessite JavaScript et HTML5 Canvas avec Pointer Lock",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Simulateur gratuit de tracking réactif contre les strafes ADAD rapides. Maîtrisez la visée sur cibles imprévisibles pour Apex Legends et Overwatch 2."
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Anti-Strafe Jitter Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-16",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Améliorez le tracking réactif, la visée anti-strafe et le suivi à courte portée avec entrée brute de souris.",
    "genre": "Entraînement FPS / Anti-Strafe",
    "url": "https://skilldrills.online/fr/drills/fps/anti-strafe-jitter-duel",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Anti-Strafe Jitter Trainer",
    "gamePlatform": "Web Browser",
    "genre": ["Entraînement FPS", "Aim Trainer"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "url": "https://skilldrills.online/fr/drills/fps/anti-strafe-jitter-duel",
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
        "name": "Qu'est-ce que le tracking réactif dans les jeux de tir ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "C'est l'aptitude neuromusculaire à réajuster immédiatement le réticule lorsqu'une cible change brusquement de sens sans suivre de trajectoire linéaire continue."
        }
      },
      {
        "@type": "Question",
        "name": "Comment battre des adversaires qui effectuent des strafes ADAD rapides ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "En évitant de crisper la main sur la souris (death grip) et en fixant le centre du modèle adverse. L'avant-bras effectue des décélérations fluides sans à-coups."
        }
      },
      {
        "@type": "Question",
        "name": "Pourquoi est-il si difficile de suivre les changements rapides de direction ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "En raison du délai de traitement visuel (glissement rétinien), le cerveau a besoin de 160 à 200 ms rien que pour détecter que la cible a inversé sa trajectoire."
        }
      },
      {
        "@type": "Question",
        "name": "Qu'est-ce que le 'death grip' et pourquoi nuit-il à la visée ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "C'est l'habitude de serrer la souris trop fort sous le stress. Cela bloque le poignet et contracte les muscles antagonistes, rendant la visée rigide et imprécise."
        }
      },
      {
        "@type": "Question",
        "name": "Cet exercice aide-t-il sur Apex Legends, Overwatch 2 et Warzone ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui. Dans les jeux à temps pour éliminer (TTK) élevé, les duels à courte distance se gagnent en maintenant le réticule collé sur la hitbox pendant les strafes."
        }
      },
      {
        "@type": "Question",
        "name": "Dois-je regarder mon réticule ou directement l'adversaire ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fixez toujours le regard sur le modèle adverse. Le cortex visuel évalue la vitesse par les contours de la cible et guide la main via la voie visuelle dorsale."
        }
      },
      {
        "@type": "Question",
        "name": "Quelle est la sensibilité idéale pour le tracking à courte portée ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Des sensibilités moyennes situées entre 28 et 38 cm pour un 360° assurent la réactivité nécessaire au poignet tout en conservant la stabilité du bras."
        }
      },
      {
        "@type": "Question",
        "name": "À quelle fréquence faut-il pratiquer le tracking réactif ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Une pratique quotidienne de 10 à 15 minutes ancre les réflexes neuromusculaires sans provoquer de fatigue tendineuse ni d'inconfort au poignet."
        }
      },
      {
        "@type": "Question",
        "name": "Quelle est la différence entre le tracking lisse et le tracking réactif ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le tracking lisse suit des mouvements réguliers et prévisibles. Le tracking réactif gère les accélérations brusques, feintes et arrêts nets inattendus."
        }
      },
      {
        "@type": "Question",
        "name": "Le simulateur gère-t-il la saisie brute de souris (raw input) ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui. Le drill fonctionne avec l'API HTML5 Pointer Lock et le chronométrage performance.now(), garantissant une correspondance directe 1:1 sans accélération."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Comment Travailler la Visée Anti-Strafe et le Tracking Réactif",
    "description": "Instructions pas à pas pour développer un tracking haute fréquence face aux strafes rapides.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Calibrez la sensibilité de votre jeu",
        "text": "Ajustez votre sensibilité pour reproduire fidèlement la mémoire musculaire 1:1 de votre jeu compétitif."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Activez le Pointer Lock dans le navigateur",
        "text": "Cliquez sur Démarrer pour verrouiller le curseur et supprimer toute accélération logicielle parasite."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Verrouillez votre attention visuelle sur la cible",
        "text": "Gardez le regard fixé sur la masse centrale de la cible pour détecter les changements de sens sans délai."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Exécutez des micro-inversions fluides sans crispation",
        "text": "Conservez une prise souple et absorbez les oscillations avec les doigts et le poignet sans coups secs."
      }
    ]
  };

  const antiStrafeGuideFr = {
    heading: "Guide de Tracking Réactif et Repères Psychomoteurs Anti-Strafe",
    intro: [
      "Dans les affrontements rapprochés au corps à corps, les duels se jouent en fractions de seconde où les adversaires multiplient les strafes ADAD imprévisibles, les accroupissements répétés et les inversions de vitesse instantanées. Contrairement à la poursuite oculaire lisse où l'observateur suit une trajectoire continue (Krauzlis, 2004), le tracking réactif exige une détection d'erreur rétinienne en boucle fermée permanente et des corrections motrices vives (Rashbass, 1961). Les joueurs de jeux d'action font preuve d'une attention visuelle et d'une bande passante temporelle accrues (Green & Bavelier, 2003), mais subissent les contraintes physiologiques incontournables de la boucle sensorimotrice humaine.",
      "Lorsqu'une cible change brutalement de sens, l'image glisse hors de la fovéa. Le cerveau ne peut pas anticiper l'inversion : il doit détecter le ralentissement, envoyer l'ordre moteur de freinage, arrêter la main en mouvement et relancer l'accélération en sens inverse. Dans les jeux à TTK élevé — comme Apex Legends, Overwatch 2 et Warzone — la victoire revient au joueur qui maintient son réticule le plus longtemps collé sur la hitbox ennemie.",
      "Anti-Strafe Jitter Trainer s'appuie sur l'API HTML5 Pointer Lock avec prise en charge matérielle directe 1:1 et chronométrie haute résolution via performance.now(). En éliminant les délais d'interpolation logicielle (Woods et al., 2015), le simulateur permet d'éduquer les muscles antagonistes et de faire disparaître les saccades et tremblements sur la cible.",
      "Mesure de la progression : chaque dixième de seconde de visée est mesuré localement sur votre ordinateur sans transmission réseau. Conservez la même sensibilité et la même prise en main pour développer des réflexes solides."
    ],
    benchmarks: {
      title: "Benchmarks de Latence en Changement de Direction et Tracking",
      headers: ["Phase de Traitement / Palier", "Plage Typique de Latence", "Voie Neurale et Rôle Biomécanique", "Implication en Combat"],
      rows: [
        ["Détection Visuelle de l'Inversion de Sens", "160 – 210 ms", "Signaux de glissement rétinien traités par V1 et l'aire visuelle MT/V5", "Délai initial avant de percevoir que la cible a inversé sa direction"],
        ["Latence d'Inversion Motrice du Bras", "80 – 130 ms", "Transmission corticospinale aux fléchisseurs/extenseurs et freinage", "Temps physique nécessaire pour arrêter la souris et inverser le geste"],
        ["Micro-Alignement Fovéal Terminal", "60 – 100 ms", "Recentrage fovéal fin et ajustement correctif sous-cortical", "Suppression du dépassement et verrouillage net du réticule sur la hitbox"],
        ["Fenêtre Totale de Réacquisition Imprévue", "300 – 440 ms", "Cumul de détection visuelle, inversion motrice et recentrage", "Pénalité humaine incompressible sur changement de direction inattendu"],
        ["Tracking Réactif d'Élite avec Préparation", "210 – 290 ms", "Amortissement anticipé et suppression motrice antagoniste décontractée", "Niveau de maîtrise observé chez les professionnels d'Apex Legends et Overwatch"]
      ],
      note: "Données synthétisées d'après les recherches oculomotrices (Rashbass, 1961; Krauzlis, 2004), la science cognitive des jeux vidéo (Green & Bavelier, 2003) et la chronométrie numérique (Woods et al., 2015). Les performances réelles dépendent des hertz de l'écran et du relâchement musculaire."
    },
    techniques: {
      title: "Méthodes Validées de Tracking et d'Anti-Strafe",
      items: [
        {
          name: "Relâchement des Muscles Antagonistes (Pas de Death Grip)",
          desc: "L'erreur la plus fréquente lors de strafes rapides consiste à crisper les muscles du bras. La co-contraction des muscles antagonistes bloque le poignet, produisant des trajectoires hachées et des dépassements importants.",
          tips: "Gardez une prise légère. Laissez les doigts et le poignet absorber les oscillations rapides pendant que le bras gère les décalages amples."
        },
        {
          name: "Point d'Ancrage Visuel Centré sur la Cible",
          desc: "Ne regardez pas votre réticule. Fixez intensément le torse de la cible. Le cortex visuel évalue automatiquement les vecteurs de vitesse grâce au contraste des contours.",
          tips: "Si votre visée décroche sur les strafes rapides, placez 100% de votre attention sur les hanches et le torse de l'adversaire."
        },
        {
          name: "Inversions Fluides (Évitez les Flicks Excessifs)",
          desc: "Quand la cible repart dans l'autre sens, les débutants ont tendance à lancer un grand flick réactif qui dépasse la cible. Les joueurs expérimentés décélèrent en douceur et glissent vers le centre.",
          tips: "Envisagez chaque changement de sens comme une transition continue de freinage et d'accélération."
        },
        {
          name: "Lecture des Hanches et Frames de Ralentissement",
          desc: "Dans les shooters avec physique d'inertie (comme Apex Legends), le personnage ralentit avant de changer de sens. Observer l'orientation du bassin offre 30 à 50 ms d'anticipation visuelle.",
          tips: "Surveillez l'inclinaison du corps pour préparer votre commande motrice avant l'inversion complète."
        }
      ]
    },
    steps: [
      "Paramétrez votre sensibilité pour conserver la mémoire musculaire exacte de votre jeu habituel.",
      "Cliquez sur Démarrer pour passer en plein écran et verrouiller le curseur avec réponse brute 1:1.",
      "Fixez la sphère mobile qui effectue des déplacements latéraux haute fréquence en ADAD.",
      "Gardez le réticule sur la cible en absorbant les inversions par de légères corrections du poignet.",
      "Prolongez le temps de contact pour gravir les niveaux et consultez votre bilan de précision final."
    ],
    audience: "Joueurs d'Apex Legends, Overwatch 2, Warzone, The Finals et shooters à TTK élevé cherchant à perfectionner leur tracking rapproché et éliminer les tremblements à la souris.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'krauzlis2004', 'green2003', 'rashbass1961'),
    related: [
      { href: "/drills/fps/fps-tracking-trainer", label: "Entraîneur de Tracking FPS" },
      { href: "/drills/fps/pro-smooth-pursuit", label: "Entraîneur de Poursuite Lisse" },
      { href: "/drills/fps/flick-shot-training", label: "Entraînement au Flick Shot" },
      { href: "/drills/fps/180-degree-awareness", label: "Entraînement Demi-Tour 180°" },
      { href: "/drills/reaction-speed/reaction-time-test", label: "Test de Temps de Réaction" }
    ]
  };

  const copyFr = {
    h1Keyword: "Tracking Réactif",
    h1Suffix: " — Entraînement Anti-Strafe",
    statScore: "Score",
    statTime: "Temps",
    statAccuracy: "Précision",
    statBestScore: "Meilleur Score",
    startTitle: "Duel Anti-Strafe Jitter",
    startSubtitle: "Tracking Réactif • Niveaux Infinis",
    getReady: "PRÊT",
    pausedTitle: "PAUSE",
    pausedSubtitle: "Cliquez pour reprendre — le curseur sera de nouveau verrouillé.",
    stageCaption: "Maintenez le réticule sur les cibles rapides en ADAD. Relâchez la main pour inverser la trajectoire en souplesse !",
    rulesTitle: "Règles d'Entraînement et Points",
    rulesItems: [
      { num: "1", text: "Contact de Visée", highlight: "+10 PTS par tick", result: "Maintien continu sur la cible" },
      { num: "2", text: "Inversion de Sens", highlight: "Tracking Réactif", result: "Réponse sensorielle immédiate" },
      { num: "3", text: "Progression de Niveau", highlight: "+1 Niveau tous les 1 400 PTS", result: "Vitesse et fréquence accrues" },
      { num: "4", text: "Stabilité du Geste", highlight: "Sans Death Grip", result: "Glisse fluide sans à-coups" }
    ],
    aboutTitle: "À Propos du Tracking Réactif Anti-Strafe"
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
      <AntiStrafeJitterClient copy={copyFr} />
      <DrillGuide guide={antiStrafeGuideFr} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/anti-strafe-jitter-duel"
          locale="fr"
        />
      </div>
    </>
  );
}
