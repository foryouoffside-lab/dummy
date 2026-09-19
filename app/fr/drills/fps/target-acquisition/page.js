import TargetAcquisitionClient from '@/app/drills/fps/target-acquisition/TargetAcquisitionClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Acquisition de Cibles FPS – Premier Tir | SkillDrills",
  description: "Entraînez l'acquisition de cibles, la détection visuelle et la précision du premier tir. Maîtrisez le premier coup pour CS2 et Valorant gratuitement.",
  keywords: [
    "acquisition de cibles fps",
    "entrainement acquisition de cible",
    "tir au premier coup fps",
    "precision du premier tir",
    "comment ameliorer le premier tir",
    "flick premier tir fps",
    "detection visuelle de cible",
    "visee rapide premier coup",
    "aim trainer cs2 valorant gratuit",
    "reconnaissance visuelle fps",
    "entrainement de reflexe et visee",
    "exercice acquisition de cibles"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/fps/target-acquisition",
    languages: getAlternateLanguages('/drills/fps/target-acquisition'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Acquisition de Cibles FPS – Premier Tir | SkillDrills",
    description: "Entraînez l'acquisition de cibles, la détection visuelle et la précision du premier tir. Maîtrisez le premier coup pour CS2 et Valorant gratuitement.",
    url: "https://skilldrills.online/fr/drills/fps/target-acquisition",
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Acquisition de Cibles FPS – Premier Tir | SkillDrills",
    description: "Entraînez l'acquisition de cibles, la détection visuelle et la précision du premier tir. Maîtrisez le premier coup pour CS2 et Valorant gratuitement.",
  },
};

export default function TargetAcquisitionFrPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/fr" },
      { "@type": "ListItem", "position": 2, "name": "Entraînement FPS", "item": "https://skilldrills.online/fr/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Acquisition de Cibles", "item": "https://skilldrills.online/fr/drills/fps/target-acquisition" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Entraîneur d'Acquisition de Cibles FPS",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-16",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Entraîneur en ligne d'acquisition de cibles, détection visuelle et précision du premier tir pour shooters tactiques comme CS2 et Valorant.",
    "genre": "Entraînement FPS / Précision du Premier Tir",
    "url": "https://skilldrills.online/fr/drills/fps/target-acquisition",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Entraîneur d'Acquisition de Cibles FPS",
    "url": "https://skilldrills.online/fr/drills/fps/target-acquisition",
    "description": "Entraîneur en ligne d'acquisition de cibles, détection visuelle et précision du premier tir pour shooters tactiques comme CS2 et Valorant.",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "browserRequirements": "Nécessite le support HTML5 Canvas et Pointer Lock API",
    "dateModified": "2026-09-16"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Entraîneur d'Acquisition de Cibles FPS",
    "url": "https://skilldrills.online/fr/drills/fps/target-acquisition",
    "description": "Entraîneur en ligne d'acquisition de cibles, détection visuelle et précision du premier tir pour shooters tactiques comme CS2 et Valorant.",
    "dateModified": "2026-09-16",
    "gamePlatform": "Web Browser",
    "genre": ["Entraînement FPS", "Aim Trainer", "Acquisition de Cibles"],
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
        "name": "Qu'est-ce que l'acquisition de cibles dans les FPS compétitifs ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "L'acquisition de cibles est la chaîne cognitive et motrice associant repérage visuel d'un ennemi dans le champ de vision, distinction par rapport aux éléments du décor et coéquipiers, calcul de trajectoire du curseur et tir balistique précis dès la première balle."
        }
      },
      {
        "@type": "Question",
        "name": "Quelle est la différence entre acquisition de cibles et temps de réaction simple ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le temps de réaction simple n'évalue que la latence entre un signal isolé prévisible et un clic. L'acquisition de cibles englobe recherche spatiale, attention sélective, tri par contraste/luminance et précision motrice sous pression temporelle."
        }
      },
      {
        "@type": "Question",
        "name": "Comment la Théorie de l'Intégration des Traits éclaire-t-elle la détection d'ennemis ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Établie par Anne Treisman et Garry Gelade (1980), cette théorie démontre que les traits élémentaires (luminance, teinte, orientation) sont extraits en parallèle sur l'ensemble du champ visuel avant que l'attention spatiale ne les assemble en cible individualisée."
        }
      },
      {
        "@type": "Question",
        "name": "Pourquoi les joueurs professionnels acquièrent-ils les cibles bien plus vite que les amateurs ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Les pros bénéficient d'un filtrage de saillance visuelle affûté (Wolfe, 2007) et de programmes moteurs de sous-mouvements optimisés (Meyer et al., 1988). Leur cerveau court-circuite le balayage séquentiel pour cibler sans hésiter la silhouette la plus menaçante."
        }
      },
      {
        "@type": "Question",
        "name": "Quel est l'impact de la précision du premier tir dans CS2 et Valorant ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dans les shooters tactiques où un tir à la tête élimine instantanément (Vandal ou AK-47), le joueur qui repère la tête et fait mouche en premier remporte le round. Manquer son premier coup équivaut à perdre l'avantage de précision initial."
        }
      },
      {
        "@type": "Question",
        "name": "Doit-on privilégier la vision centrale ou périphérique pour repérer les cibles ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Repérez les cibles avec la vision périphérique et alignez le viseur avec votre vision fovéale centrale. Garder les yeux rivés sur le réticule restreint la fenêtre d'attention et ralentit l'alerte périphérique."
        }
      },
      {
        "@type": "Question",
        "name": "En quoi l'encombrement visuel influence-t-il la vitesse d'acquisition ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Lorsque plusieurs éléments partagent des propriétés visuelles avec l'opposant, le traitement visuel passe d'une analyse parallèle instantanée à un balayage séquentiel laborieux, ajoutant 40 à 120 ms par distracteur présent."
        }
      },
      {
        "@type": "Question",
        "name": "Quelle prise de souris est la plus performante pour l'acquisition de cibles ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Les prises Claw et Fingertip sont idéales car elles autorisent des micro-ajustements rapides du bout des doigts et un freinage net sur le tapis, tout en préservant l'amplitude de l'avant-bras sur les grands angles."
        }
      },
      {
        "@type": "Question",
        "name": "Comment le Raw Input sans accélération régule-t-il la régularité d'acquisition ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "L'acquisition matérielle brute assure une correspondance strictement linéaire entre le geste de la main et l'écran, autorisant le cortex moteur à calculer l'impulsion balistique sans les distorsions d'accélération logicielle."
        }
      },
      {
        "@type": "Question",
        "name": "Combien de temps consacrer chaque jour au drill d'acquisition de cibles ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "De 10 à 15 minutes quotidiennes en début d'échauffement suffisent à aiguiser la discrimination visuelle et calibrer la mémoire musculaire du premier tir sans saturer le système nerveux."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Comment Maîtriser l'Acquisition de Cibles et le Premier Tir",
    "description": "Protocole pratique pour identifier les cibles majeures, supprimer les hésitations visuelles et réussir le premier tir.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Calibrer sa Sensibilité en Entrée Brute",
        "text": "Paramétrez vos DPI et votre sensibilité dans les réglages de session pour assurer une parité 1:1 et verrouiller le pointeur.",
        "url": "https://skilldrills.online/fr/drills/fps/target-acquisition#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Adopter un Regard Central Dévitalisé",
        "text": "Maintenez vos yeux détendus au milieu de l'écran pour saisir l'apparition des grappes de cibles en vision périphérique.",
        "url": "https://skilldrills.online/fr/drills/fps/target-acquisition#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Identifier la Cible Prioritaire par le Contraste",
        "text": "Repérez instantanément la cible la plus brillante sans passer en revue chaque élément un par un.",
        "url": "https://skilldrills.online/fr/drills/fps/target-acquisition#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Exécuter un Flick Balistique avec Freinage Tapis",
        "text": "Amenez franchement le viseur au centre de la cible et cliquez, en utilisant l'adhérence du tapis pour bloquer l'overshoot.",
        "url": "https://skilldrills.online/fr/drills/fps/target-acquisition#step-4"
      }
    ]
  };

  const targetAcquisitionGuide = {
    heading: "Guide de l'Acquisition de Cibles FPS et Biomécanique de la Discrimination Visuelle",
    intro: [
      "L'Entraîneur d'Acquisition de Cibles est un exercice perceptivo-cognitif mis au point pour développer la vitesse de repérage visuel, la discrimination de contrastes et la précision létale du premier tir. Dans les shooters tactiques tels que Valorant, Counter-Strike 2 et Rainbow Six Siege, l'issue d'une manche se décide dans les 300 premières millisecondes d'exposition visuelle : le tireur qui identifie, ajuste et frappe la silhouette ennemie en premier prend un avantage décisif.",
      "Le socle théorique de la prospection visuelle et de l'identification a été posé par Anne Treisman et Garry Gelade (1980) au travers de la Théorie de l'Intégration des Traits. Treisman a prouvé que les propriétés visuelles primaires — comme le contraste de brillance, les couleurs saillantes et l'orientation des bordures — sont perçues en parallèle sur tout le champ oculaire. Ce n'est qu'avec la focalisation de l'attention spatiale que ces éléments fusionnent en une cible ennemie distincte.",
      "En prolongeant le traitement parallèle, le modèle Guided Search de Jeremy M. Wolfe (1994, 2007) décrit l'interaction entre cartes de saillance sensorielle et attentes cognitives. En s'exerçant au tri de contrastes, le cortex visuel apprend à écarter immédiatement les distracteurs d'arrière-plan, réduisant le délai entre stimulus visuel et amorce motrice.",
      "En synthétisant les lois biomécaniques de Paul M. Fitts (1954), la théorie des sous-mouvements optimisés de David E. Meyer et al. (1988) et la chronométrie numérique à haute résolution (Woods et al., 2015), cet exercice prépare les réflexes à bannir toute hésitation pour enchaîner des tirs précis sous pression compétitive.",
      "Mode d'évaluation : chaque action est mesurée localement par l'horloge haute résolution performance.now() de votre navigateur sans aucun transfert distant. Contraintes matérielles : les minuteurs web intègrent une granularité de sécurité de l'ordre de 1 ms, et les écrans rafraîchissent l'image selon leur fréquence — environ 16,7 ms à 60 Hz, 6,9 ms à 144 Hz et 4,1 ms à 240 Hz (Woods et al., 2015). Le polling rate de la souris induit un décalage de 8 ms à 125 Hz contre 1 ms à 1000 Hz. Évaluez votre évolution sur une configuration fixe."
    ],
    benchmarks: {
      title: "Barèmes Scientifiques d'Acquisition de Cibles et Latence de Discrimination",
      headers: ["Niveau de Performance", "Latence d'Acquisition", "Précision du Premier Tir", "Impact Compétitif en Match"],
      rows: [
        ["Tier 1 (Apex Sentinel / Radiant Pro)", "<260 ms", "95% – 99%+", "Détection instantanée sans hésitation ; tirs tête létaux dès la première balle sans aucune hésitation de tri"],
        ["Tier 2 (Maître Compétitif / Tier-2 Esports)", "260 – 320 ms", "88% – 95%", "Remarquable vitesse d'identification ; engagement prioritaire précis avec distraction périphérique minime"],
        ["Tier 3 (Diamant / Ascendant)", "320 – 400 ms", "80% – 88%", "Précision solide au premier coup ; légers retards de 50 à 80 ms en présence de grappes de cibles denses"],
        ["Tier 4 (Intermédiaire / Or / Platine)", "400 – 500 ms", "70% – 80%", "Tendance au balayage séquentiel lent ; clics sporadiques sur des distracteurs ou dépassements de cible"],
        ["Tier 5 (Débutant / Novice)", ">500 ms", "<70%", "Désorientation face aux décors chargés ; lenteur d'acquisition causant des défaites régulières lors des premiers tirs"]
      ],
      note: "La latence d'acquisition correspond au temps écoulé entre l'apparition de la grappe et le premier clic validé sur la cible prioritaire, chronométré avec précision numérique (Woods et al., 2015)."
    },
    techniques: {
      title: "Protocoles Fondés sur la Science pour Perfectionner l'Acquisition",
      items: [
        {
          name: "Balayage Parallèle plutôt qu'Inspection Séquentielle",
          desc: "Bannissez la fouille oculaire zone par zone. Exploitez les filtres pré-attentionnels (Treisman & Gelade, 1980) pour repérer les sursauts de contraste en vision périphérique en gardant le regard au centre.",
          tips: "Gardez vos yeux détendus vers le centre ; laissez la cible la plus brillante guider votre première saccade oculaire."
        },
        {
          name: "Couplage Saccadique et Moteur lors du Flick",
          desc: "Désolidarisez le regard de la main : déclenchez d'abord la saccade oculaire fovéale pour caler le centre de la cible, puis laissez la proprioception fouetter le pointeur sur la bonne ligne.",
          tips: "Vos yeux doivent se caler sur le blanc 30 à 50 ms avant l'arrivée du réticule pour verrouiller la coordonnée."
        },
        {
          name: "Filtrage Rapide du Seuil de Contraste",
          desc: "Dans les scènes encombrées, les silhouettes ternes correspondent à des leurres, tandis qu'un contraste marqué signale l'urgence. Apprenez à éliminer le bruit visuel sans freiner votre flick.",
          tips: "Habituez-vous à ignorer totalement les cibles secondaires assombries jusqu'à neutraliser la cible principale."
        },
        {
          name: "Freinage Dynamique sur Tapis de Souris",
          desc: "Conciliez vivacité balistique et pouvoir d'arrêt (Meyer et al., 1988). Servez-vous du frottement du tapis et des doigts pour stopper net le curseur au centre sans dépassement parasite.",
          tips: "Exercez une légère pression verticale avec les doigts en fin de course pour verrouiller la souris mécaniquement."
        }
      ]
    },
    steps: [
      "Renseignez votre jeu, vos DPI et votre sensibilité dans les réglages de session pour garantir une parité 1:1 et verrouiller le pointeur.",
      "Posez votre regard au centre sans forcer, en guettant l'apparition du groupe de cibles sur l'écran.",
      "Repérez sans délai la cible la plus lumineuse grâce au pré-filtrage visuel de contraste en parallèle.",
      "Réalisez un flick net vers le centre du blanc et tirez pour engranger +100 PTS (+0,4s de temps bonus).",
      "Neutralisez les cibles restantes par ordre décroissant de brillance pour remporter le bonus de +400 PTS et valider le palier."
    ],
    audience: "Joueurs compétitifs sur Valorant, Counter-Strike 2, Apex Legends et Overwatch 2 désireux d'améliorer leur détection d'ennemis, de réussir leurs premiers tirs à la tête et d'ignorer la pollution visuelle.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'meyer1988', 'treisman1980', 'wolfe2007'),
    related: [
      { href: "/fr/drills/fps/target-prioritization", label: "Entraînement Priorisation des Cibles" },
      { href: "/fr/drills/fps/flick-shot-training", label: "Entraînement Flick Shot" },
      { href: "/fr/drills/fps/micro-correction-precision", label: "Entraînement de Micro-Correction" },
      { href: "/fr/drills/fps/strafe-tracking", label: "Entraînement Strafe Tracking" },
      { href: "/fr/drills/fps/180-degree-awareness", label: "Entraînement Conscience 180° Pro" }
    ]
  };

  const copyFr = {
    h1Keyword: "Acquisition de Cibles FPS",
    h1Suffix: " – Premier Tir",
    subtitle: "Entraînez la détection visuelle des cibles, la discrimination des menaces et la précision du premier tir avec analyse en temps réel.",
    statScore: "Score",
    statTime: "Temps",
    statAccuracy: "Précision",
    statBestScore: "Record",
    statSetsCleared: "Séries Réussies",
    statMaxCombo: "Combo Max",
    statPeakLevel: "Niveau Record",
    startTitle: "Acquisition de Cibles Pro",
    startSubtitle: "Vitesse de Reconnaissance Visuelle · Niveaux Dynamiques Illimités",
    getReady: "PRÉPAREZ-VOUS",
    toggleFlash: "Basculer le Flash d'Échec",
    toggleSound: "Basculer les Effets Sonores",
    pausedTitle: "Jeu en Pause",
    pausedSubtitle: "Cliquez pour reprendre — le verrouillage du pointeur sera réactivé.",
    stageCaption: "Repérez et cliquez sur la cible la plus brillante (plus forte opacité) de chaque grappe le plus vite et le plus précisément possible.",
    rulesTitle: "Consignes de l'Exercice et Barème",
    rulesItems: [
      { num: "1", text: "Cible Touchée", highlight: "+100 PTS (+0,4s)", result: "×Multiplicateur Combo" },
      { num: "2", text: "Série Neutralisée", highlight: "+400 PTS × Niveau", result: "Nouvelle Grappe" },
      { num: "3", text: "Niveau Supérieur", highlight: "+1 / 1400 PTS", result: "Progression Dynamique Continue" },
      { num: "4", text: "Tir Erroné / Manqué", highlight: "Pénalité", result: "Réinitialise Combo (-0,6s)" }
    ],
    aboutTitle: "À Propos de l'Acquisition de Cibles",
    aboutHeading: "Qu'est-ce que l'Acquisition de Cibles ?",
    aboutText: "L'acquisition de cibles consiste à repérer la cible adéquate et à amener le viseur sur elle. Les propriétés visuelles élémentaires telles que couleur, brillance et orientation sont traitées en parallèle sur tout le champ visuel avant que l'attention ne les lie en un objet unique (Treisman & Gelade, 1980) — raison pour laquelle un opposant contrasté est perçu bien plus rapidement qu'une silhouette camouflée."
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
      <TargetAcquisitionClient copy={copyFr} />
      <DrillGuide guide={targetAcquisitionGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/target-acquisition"
          locale="fr"
        />
      </div>
      <DrillFooter />
    </>
  );
}
