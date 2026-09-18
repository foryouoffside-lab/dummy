import StrobeLatencyClient from '@/app/drills/visual/reaction-speed/light-reaction/StrobeLatencyClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test de Réaction à la Lumière: Réflexe Visuel | SkillDrills",
  description: "Test de réaction à la lumière gratuit. Mesurez votre temps de réaction visuel simple en millisecondes face au repère de 200-250 ms. Sans inscription.",
  keywords: [
    "test de réaction à la lumière",
    "test de temps de réaction visuel",
    "test de réflexe visuel en ligne",
    "temps de réaction simple srt",
    "latence optico-motrice millisecondes",
    "test du flash lumineux réflexe",
    "entraînement des réflexes gaming",
    "loi de pieron luminance réaction",
    "chronométrie mentale vitesse de réponse",
    "phototransduction rétinienne délai moteur",
    "test de réflexe rapide gratuit",
    "vitesse de réaction simple"
  ],
  openGraph: {
    title: "Test de Réaction à la Lumière: Réflexe Visuel | SkillDrills",
    description: "Évaluez votre temps de réaction visuel simple face à des flashs stroboscopiques en millisecondes en ligne.",
    type: 'article',
    url: 'https://skilldrills.online/fr/drills/visual/reaction-speed/light-reaction',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test de Réaction à la Lumière: Réflexe Visuel | SkillDrills",
    description: "Test de réflexes visuels de haute précision en millisecondes pour sportifs et joueurs d'esport.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/visual/reaction-speed/light-reaction',
    languages: getAlternateLanguages('/drills/visual/reaction-speed/light-reaction'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://skilldrills.online/fr" },
    { "@type": "ListItem", "position": 2, "name": "Catalogue des Drills", "item": "https://skilldrills.online/fr/drills" },
    { "@type": "ListItem", "position": 3, "name": "Entraînement Visuel", "item": "https://skilldrills.online/fr/drills/visual" },
    { "@type": "ListItem", "position": 4, "name": "Vitesse de Réaction", "item": "https://skilldrills.online/fr/drills/visual/reaction-speed" },
    { "@type": "ListItem", "position": 5, "name": "Test de Réaction à la Lumière", "item": "https://skilldrills.online/fr/drills/visual/reaction-speed/light-reaction" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test de Réaction à la Lumière (Temps de Réaction Simple)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/fr/drills/visual/reaction-speed/light-reaction",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "description": "Outil neurocognitif pour mesurer le temps de réaction visuelle simple (SRT) et la latence de conduction optico-motrice en millisecondes.",
  "featureList": [
    "Chronométrie ultra-précise en millisecondes via l'API performance.now()",
    "Intervalles aléatoires de 300 ms à 2 500 ms pour éliminer l'anticipation",
    "Algorithme anti-spam pénalisant les clics spéculatifs avant l'éclair",
    "Traitement purement local dans le navigateur sans transfert de données"
  ],
  "dateModified": "2026-09-05"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Test de Réaction à la Lumière — Réflexe Visuel | SkillDrills",
  "alternateName": "Light Reaction Pro",
  "url": "https://skilldrills.online/fr/drills/visual/reaction-speed/light-reaction",
  "dateModified": "2026-09-05",
  "description": "Test de réflexes en ligne gratuit. Cliquez le plus vite possible dès que la cible centrale s'illumine en blanc.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Navigateur moderne supportant HTML5 Canvas.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Temps de Réaction Visuelle Simple, Latence Optico-Motrice, Vitesse Réflexe, Loi de Piéron, Attention Fovéale"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Drill de Réflexe de Réaction à la Lumière",
  "url": "https://skilldrills.online/fr/drills/visual/reaction-speed/light-reaction",
  "description": "Jeu de vitesse de réaction pour affûter la réponse neuromotrice face à des flashs lumineux.",
  "genre": ["Action", "Reaction Speed", "Reflex Game"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment Passer le Test de Réaction à la Lumière",
  "dateModified": "2026-09-05",
  "description": "Protocole en 4 étapes pour tester et aiguiser votre temps de réaction visuel simple face à des stimuli stroboscopiques.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Fixer le Regard sur le Disque Central",
      "text": "Placez vos yeux sur le cercle sombre au milieu de l'écran, en décontractant les doigts.",
      "url": "https://skilldrills.online/fr/drills/visual/reaction-speed/light-reaction#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Attendre le Flash Blanc Imprévisible",
      "text": "Patientez calmement durant l'intervalle aléatoire de 300 ms à 2 500 ms sans tenter de deviner le timing.",
      "url": "https://skilldrills.online/fr/drills/visual/reaction-speed/light-reaction#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Cliquer Aussitôt sur le Premier Flash",
      "text": "Enfoncez la souris ou la barre d'espace dès que le disque flashe en blanc étincelant (+150 PTS × Multiplicateur).",
      "url": "https://skilldrills.online/fr/drills/visual/reaction-speed/light-reaction#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Éviter les Clics Prématurés",
      "text": "Cliquer avant l'apparition de la lumière déclenche une pénalité de 1,2 seconde pour forcer une réaction authentique.",
      "url": "https://skilldrills.online/fr/drills/visual/reaction-speed/light-reaction#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-05",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu'est-ce que le test de réflexe de réaction à la lumière ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le test de réaction à la lumière est un protocole psychophysique rigoureux mesurant le temps de réaction simple (SRT). Il chronomètre avec une précision milliseconde le délai entre l'illumination blanche d'un repère visuel et la contraction motrice du doigt."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le temps moyen de réaction visuelle simple en millisecondes ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chez un adulte jeune et sain, la moyenne s'établit entre 200 ms et 250 ms. Les sportifs d'élite, sprinteurs et joueurs professionnels de jeux de tir atteignent fréquemment des moyennes comprises entre 160 ms et 190 ms."
      }
    },
    {
      "@type": "Question",
      "name": "Quelles étapes physiologiques se déroulent entre la vue de l'éclair et le clic ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le circuit mobilise 4 paliers : (1) phototransduction rétinienne (~20–40 ms), (2) transmission le long du nerf optique jusqu'au cortex visuel V1 (~30–50 ms), (3) programmation motrice dans les cortex pariétaux et moteurs (~50–80 ms), et (4) décharge descendante le long du faisceau cortico-spinal jusqu'aux muscles fléchisseurs (~30–50 ms)."
      }
    },
    {
      "@type": "Question",
      "name": "Qu'est-ce que la loi de Piéron et comment la luminance influence-t-elle le temps de réaction ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La loi de Piéron (1952) indique que le temps de réaction décroît selon une courbe hyperbolique à mesure que la luminance du stimulus s'élève au-dessus du fond. Un flash blanc vif sur fond sombre génère le délai de transmission sensorielle le plus bref."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi le temps de réaction auditif est-il plus rapide que le visuel ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L'oreille réagit 30 à 50 ms plus vite que l'œil (140–160 ms contre 200–250 ms). L'activation mécanique dans les cellules ciliées de la cochlée s'effectue en 1 à 3 ms, tandis que la transduction photochimique dans la rétine nécessite 20 à 40 ms."
      }
    },
    {
      "@type": "Question",
      "name": "Peut-on améliorer son temps de réaction visuel simple par l'entraînement ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. La neuroplasticité permet d'augmenter l'excitabilité des voies cortico-spinales et de perfectionner l'attention spatiale implicite (Posner, 1980). Les joueurs de jeux d'action démontrent des temps de réaction plus rapides sans dégradation de précision (Dye et al., 2009)."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est l'impact du taux de rafraîchissement de l'écran sur les scores de réflexes ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un écran 60 Hz ajoute jusqu'à 16,7 ms de délai d'affichage avant que le flash ne paraisse. Les dalles 144 Hz et 240 Hz réduisent cet écart à 6,9 ms et 4,1 ms. Une souris à 1 000 Hz limite la latence résiduelle à ~1 ms."
      }
    },
    {
      "@type": "Question",
      "name": "Qu'est-ce qui déclenche la pause anti-spam de clics prématurés ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cliquer avant l'allumage ou spammer le bouton impose une temporisation automatique de 1,2 seconde. Cette contrainte élimine les coups d'avance pris au hasard et garantit une mesure neurobiologique authentique."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est l'impact du sommeil, de la caféine et de la fatigue sur la latence en millisecondes ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le manque de sommeil et la fatigue cérébrale ralentissent la réaction de 30 ms à 80 ms. À dose modérée (100–200 mg), la caféine bloque les récepteurs à adénosine, réduisant temporairement la latence de 10 à 20 ms."
      }
    },
    {
      "@type": "Question",
      "name": "Ce test de réaction à la lumière est-il gratuit et respectueux de la vie privée ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. Le test SkillDrills est entièrement gratuit, sans compte ni paiement requis. Les données restent stockées localement dans la mémoire de votre navigateur, sans aucun suivi distant."
      }
    }
  ]
};

const lightReactionGuide = {
  heading: "Chronométrie des Réflexes Visuels et Normes de Réaction Simple (SRT)",
  intro: [
    "Le temps de réaction simple (SRT) mesure la latence sensorimotrice élémentaire s'écoulant entre la survenue impromptue d'un stimulus visuel unique et l'exécution d'un mouvement réflexe non conditionné. En sprint, en sports de combat, en compétition automobile et dans l'esport tactique, quelques infimes millisecondes déterminent l'esquive salvatrice, l'impulsion du starting-block ou le contre décisif.",
    "La cascade neuromusculaire sollicite quatre étages physiologiques ordonnés : (1) phototransduction rétinienne (~20–40 ms par isomérisation de la rhodopsine), (2) acheminement afférent par le tractus optique vers le cortex visuel primaire V1 (~30–50 ms), (3) programmation motrice dans les aires pariétales et motrices supplémentaires (~50–80 ms), et (4) décharge descendante le long du faisceau pyramidal pour contracter les fléchisseurs digitaux (~30–50 ms), établissant la fenêtre humaine saine de 200–250 ms (Kosinski, 2008 ; Jain et al., 2015 ; Shelton & Kumar, 2010).",
    "D'après la loi de Piéron (1952 ; Pins & Bonnet, 1996), la latence diminue sous forme hyperbolique avec la luminance du signal par rapport au fond. Ce drill exploite un flash stroboscopique blanc de très fort contraste sur fond noir absorbant, déclenchant une dépolarisation massive des cellules ganglionnaires. Les travaux sur l'attention spatiale (Posner, 1980) et le jeu vidéo d'action (Dye et al., 2009) attestent que l'ancrage visuel compense les délais d'exécution.",
    "Rigueur Métrologique et Calibration Matérielle : Les flashs et les clics sont relevés par l'API haute résolution performance.now(). Les délais d'affichage d'écran et d'interrogation USB (Woods et al., 2015) sont pris en considération pour assurer des scores rigoureux et conservés sur votre appareil."
  ],
  benchmarks: {
    title: "Paliers de Latence de Réaction Visuelle (Repères Scientifiques SRT)",
    headers: ["Palier de Performance", "Latence Moyenne (ms)", "Score & Seuil de Combo", "Profil Neuromusculaire et Réflexe"],
    rows: [
      ["Tier 1: Réflexe Neural Apex", "< 180 ms", "15 000+ PTS | Combo 28x+", "Excitabilité motrice maximale ; vitesse de conduction cortico-spinale exceptionnelle propre aux sprinteurs olympiques et pros de l'esport."],
      ["Tier 2: Réflexe Visuel Supérieur", "180 – 219 ms", "10 500 – 14 999 PTS | Combo 18x+", "Couplage optico-moteur remarquable ; régularité sous 220 ms avec dispersion temporelle minime."],
      ["Tier 3: Standard Adulte Équilibré", "220 – 259 ms", "6 000 – 10 499 PTS | Combo 10x+", "Valeur de référence pour un adulte en bonne santé ; réponse visuelle normale avec légères fluctuations sous fatigue."],
      ["Tier 4: Retard Modéré de Réponse", "260 – 319 ms", "2 500 – 5 999 PTS | Combo 5x+", "Traitement central étiré ; sensibilité accrue au retard d'affichage d'écran, à la fatigue oculaire ou aux baisses de vigilance."],
      ["Tier 5: Latence Étendue / Base", "> 320 ms", "< 2 500 PTS | Combo < 5x", "Délai sensoriel prononcé ; surcharge d'interprétation ou retard lié à un moniteur 60 Hz non calibré."]
    ],
    note: "Ces critères reposent sur la chronométrie mentale et la psychophysique de la vision (Kosinski, 2008 ; Woods et al., 2015 ; Pins & Bonnet, 1996 ; Jain et al., 2015). Les scores évoluent selon le rythme circadien, la caféine et le moniteur."
  },
  techniques: {
    title: "Méthodes Clés pour Réduire la Vitesse de Réaction Visuelle",
    items: [
      {
        name: "Préactivation Fovéale et Ancrage du Regard",
        desc: "Maintenir la fovéa immobile sur le repère central évite les 20 à 30 ms nécessaires aux micro-saccades de réorientation (Posner, 1980).",
        tips: "Fixez intensément le cercle sombre central sans laisser vos yeux vagabonder sur l'horloge ou le score."
      },
      {
        name: "Optimisation de Contraste selon Piéron",
        desc: "Un fort contraste de luminance stimule la fréquence de décharge des cellules ganglionnaires (Pins & Bonnet, 1996).",
        tips: "Tamisez légèrement l'éclairage de la pièce pour dilater vos pupilles et percevoir plus vivement le flash blanc."
      },
      {
        name: "Prétension Isométrique Digitale",
        desc: "La course du bouton et le debounce introduisent une latence mécanique si le doigt attend en suspension (Woods et al., 2015).",
        tips: "Reposez le doigt sur le switch de la souris avec une légère prétension sans déclencher de clic prématuré."
      },
      {
        name: "Calibration d'Écran et Taux de Rafraîchissement",
        desc: "Un écran 60 Hz engendre jusqu'à 16,7 ms de latence d'affichage, contre 4,1 ms pour une dalle 240 Hz (Woods et al., 2015).",
        tips: "Privilégiez une dalle 144 Hz ou 240 Hz ainsi qu'une souris réglée à 1 000 Hz pour éliminer les retards matériels."
      }
    ]
  },
  steps: [
    "Cliquez sur Démarrer le Drill pour lancer la session de 45 secondes de réaction à la lumière.",
    "Fixez posément le cercle sombre positionné au centre de la zone de test.",
    "Patientez durant les intervalles de délai imprévisibles (300 ms à 2 500 ms) sans anticipation.",
    "Cliquez sans attendre au moment exact où le cercle flashe en blanc pur (+150 PTS × Multiplicateur).",
    "Examinez votre temps moyen de réaction, votre niveau atteint et votre appréciation de précision finale."
  ],
  audience: "Joueurs de jeux de tir et d'esport, combattants d'arts martiaux, coureurs de vitesse, pilotes et toute personne désireuse de tester et muscler ses réflexes optiques.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('woods2015', 'kosinski2008', 'pins1996', 'posner1980', 'jain2015', 'dye2009'),
  related: [
    { href: "/fr/drills/visual/reaction-speed/go/no-go", label: "Test Go / No-Go d'Inhibition Motrice" },
    { href: "/fr/drills/visual/depth-perception/distance-judgment", label: "Jugement de Distance et Perception de Profondeur" },
    { href: "/fr/drills/visual/tracking-accuracy/moving-target", label: "Interception de Cible Mobile" },
    { href: "/fr/drills/visual/tracking-accuracy/multiple-targets", label: "Poursuite d'Objets Multiples" },
    { href: "/fr/drills/visual/tracking-accuracy/pursuit-tracker", label: "Traqueur de Poursuite Oculaire Lente" },
    { href: "/fr/drills/visual/visual-recognition/entropic-grid", label: "Recherche sur Grille Entropique" }
  ]
};

export default function StrobeLatencyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <StrobeLatencyClient copy={{ title: "Test de Réaction à la Lumière: Réflexe Visuel" }} />
      <DrillGuide guide={lightReactionGuide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/fr/drills/visual/reaction-speed/light-reaction" />
      </div>
    </>
  );
}
