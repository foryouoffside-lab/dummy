import KineticInterceptClient from '@/app/drills/visual/tracking-accuracy/moving-target/KineticInterceptClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Poursuite de Cibles Mobiles: Vision Dynamique | SkillDrills",
  description: "Test de poursuite de cibles mobiles gratuit. Interceptez des cibles dynamiques pour mesurer votre poursuite oculaire lente et vos réflexes visuels.",
  keywords: [
    "test de poursuite de cible en mouvement",
    "test d'acuité visuelle dynamique",
    "entraînement de visée cible mobile",
    "poursuite oculaire lente test",
    "interception de cible dynamique",
    "coordination œil-main cibles mobiles",
    "test de vision dynamique en ligne",
    "anticipation de trajectoire visuelle",
    "entraînement tracking fps",
    "mouvements saccadiques et poursuite visuelle",
    "test de vitesse de poursuite visuelle",
    "vision cinétique et interception motrice"
  ],
  openGraph: {
    title: "Poursuite de Cibles Mobiles: Vision Dynamique | SkillDrills",
    description: "Interceptez des cibles mobiles accélérées et évaluez votre poursuite oculaire lente et votre acuité visuelle en ligne.",
    type: 'article',
    url: 'https://skilldrills.online/fr/drills/visual/tracking-accuracy/moving-target',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Poursuite de Cibles Mobiles: Vision Dynamique | SkillDrills",
    description: "Test d'interception cinétique de cibles en temps réel pour sportifs et joueurs d'esport.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/visual/tracking-accuracy/moving-target',
    languages: getAlternateLanguages('/drills/visual/tracking-accuracy/moving-target'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://skilldrills.online/fr" },
    { "@type": "ListItem", "position": 2, "name": "Catalogue des Drills", "item": "https://skilldrills.online/fr/drills" },
    { "@type": "ListItem", "position": 3, "name": "Entraînement Visuel", "item": "https://skilldrills.online/fr/drills/visual" },
    { "@type": "ListItem", "position": 4, "name": "Précision de Poursuite", "item": "https://skilldrills.online/fr/drills/visual/tracking-accuracy" },
    { "@type": "ListItem", "position": 5, "name": "Interception de Cible Mobile", "item": "https://skilldrills.online/fr/drills/visual/tracking-accuracy/moving-target" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test d'Interception de Cibles Mobiles",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/fr/drills/visual/tracking-accuracy/moving-target",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "description": "Test psychophysique interactif pour évaluer la poursuite oculaire lente, l'extrapolation de trajectoire et la justesse d'interception motrice.",
  "featureList": [
    "Physique de trajectoire 2D avec vecteurs de collision et rebonds sur les parois",
    "Chronométrie en millisecondes et multiplicateurs de combo évolutifs",
    "Accélération continue et réduction progressive de la hitbox des sphères",
    "Enregistrement 100% local dans le navigateur sans collecte externe"
  ],
  "dateModified": "2026-09-05"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Test d'Interception de Cibles Mobiles — Vision Dynamique | SkillDrills",
  "alternateName": "Moving Target Pro",
  "url": "https://skilldrills.online/fr/drills/visual/tracking-accuracy/moving-target",
  "dateModified": "2026-09-05",
  "description": "Test gratuit de poursuite visuelle cinétique. Interceptez des cibles sphériques accélérées et rebondissantes avec calcul prédictif.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Navigateur moderne supportant HTML5 Canvas.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Poursuite Oculaire Lente, Acuité Visuelle Dynamique, Extrapolation de Vitesse, Interception Balistique, Boucle de Rétroaction Motrice"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Drill d'Interception de Cibles Mobiles",
  "url": "https://skilldrills.online/fr/drills/visual/tracking-accuracy/moving-target",
  "description": "Jeu de visée dynamique pour perfectionner les réflexes et la coordination œil-main en mouvement.",
  "genre": ["Action", "Aim Trainer", "Visual Tracking"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment Réaliser le Test d'Interception de Cibles Mobiles",
  "dateModified": "2026-09-05",
  "description": "Protocole en 4 phases pour développer la poursuite oculaire lente, l'anticipation de trajectoire et l'exactitude d'interception.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Localiser et Verrouiller le Regard",
      "text": "Repérez la sphère mobile dès sa matérialisation et fixez sa zone centrale pour engager la poursuite oculaire lente.",
      "url": "https://skilldrills.online/fr/drills/visual/tracking-accuracy/moving-target#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Prédire la Trajectoire et les Rebonds",
      "text": "Évaluez la vélocité et l'angle de rebond contre les bords, en plaçant le curseur légèrement en avant de la sphère.",
      "url": "https://skilldrills.online/fr/drills/visual/tracking-accuracy/moving-target#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Déclencher le Clic Balistique",
      "text": "Cliquez nettement sur la cible avant l'expiration du temps imparti (+150 PTS × Combo × Niveau et +0,6 s de délai additionnel).",
      "url": "https://skilldrills.online/fr/drills/visual/tracking-accuracy/moving-target#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Préserver la Série de Combos à Haute Vitesse",
      "text": "Maintenez votre régularité malgré l'accélération et le rétrécissement de la cible, en évitant tout tir précipité.",
      "url": "https://skilldrills.online/fr/drills/visual/tracking-accuracy/moving-target#step-4"
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
      "name": "Qu'est-ce que le test d'interception de cibles mobiles ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "C'est un test psychophysique conçu pour évaluer la poursuite oculaire lente (smooth pursuit), l'anticipation spatiale de trajectoire et la précision de pointage moteur. L'utilisateur intercepte des sphères qui rebondissent à vitesses variables."
      }
    },
    {
      "@type": "Question",
      "name": "Comment le cerveau suit-il et intercepte-t-il une cible visuelle en mouvement ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les signaux de mouvement détectés par la rétine atteignent l'aire temporale moyenne (MT/V5) pour extraire vecteurs et vitesse. Les champs oculaires frontaux (FEF) et le cervelet coordonnent les muscles oculomoteurs pour égaler la vitesse de la cible, tandis que le cortex pariétal orchestre le clic."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la différence physiologique entre la poursuite oculaire lente et les saccades ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Selon Rashbass (1961), ces mouvements dépendent de circuits distincts : la poursuite lente est une réponse continue (jusqu'à 30–40°/s) calée sur la vitesse de glissement rétinien pour conserver la netteté fovéale. Les saccades sont des sauts balistiques vifs (jusqu'à 900°/s) pour replacer la fovéa sur une cible décentrée."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi est-il nécessaire d'anticiper la trajectoire (tirer en avant) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le délai sensorimoteur humain impose un temps de latence de 150 à 220 ms entre la détection et le clic. Une cible naviguant à 500 px/s parcourt plus de 100 pixels durant ce laps de temps. Viser sa position apparente mène à l'échec ; il faut viser le point d'impact futur (Land & McLeod, 2000)."
      }
    },
    {
      "@type": "Question",
      "name": "Quelles sont les limites de vitesse de la poursuite oculaire humaine ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La poursuite lente fonctionne de façon optimale en deçà de 30°/s de vitesse angulaire (Bahill et al., 1980 ; Krauzlis, 2004). Au-delà ou lors d'accélérations brutales, le gain chute sous 1,0, forçant l'émission de saccades correctrices de rattrapage."
      }
    },
    {
      "@type": "Question",
      "name": "Peut-on améliorer son acuité visuelle dynamique et sa précision en mouvement ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. Des séances ciblées renforcent le traitement cortical dans l'aire MT/V5, affinent les calculs prédictifs du cervelet et réduisent la latence de correction motrice lors des changements brusques de direction."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est l'impact du taux de rafraîchissement (60 Hz vs 144 Hz vs 240 Hz) sur le tracking ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "À 60 Hz, l'écran actualise la position toutes les 16,7 ms, produisant des saccades visibles. Les dalles 144 Hz (6,9 ms) et 240 Hz (4,1 ms) délivrent un mouvement continu et limpide, diminuant l'erreur rétinienne et haussant la précision de tir (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Comment l'accélération et les rebonds sur les parois affectent-ils la précision ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les trajectoires constantes sont aisément extrapolées. Toutefois, une collision contre un bord brise le schéma prédictif, imposant 150 à 200 ms pour actualiser le modèle vectoriel et lancer une saccade de recadrage."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la différence entre contrôle visuo-moteur en boucle ouverte et boucle fermée ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les premiers ~100 ms de la trajectoire du geste se font en boucle ouverte (tir balistique sans ajustement possible). Ensuite s'active la boucle fermée, où le retour visuel affine la course du pointeur en temps réel jusqu'à l'impact."
      }
    },
    {
      "@type": "Question",
      "name": "Ce test de cibles mobiles est-il gratuit et garantit-il la confidentialité ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. Le test de SkillDrills est entièrement gratuit, sans publicité intrusive ni création de compte. Toutes les métriques restent strictement cantonnées dans le stockage local de votre navigateur."
      }
    }
  ]
};

const movingTargetGuide = {
  heading: "Principes Scientifiques du Rastreamento Cinétique et de l'Interception Spatiale",
  intro: [
    "L'interception de cibles dynamiques constitue une aptitude sensorimotrice charnière dans les sports de haut niveau, l'aviation, les arts martiaux et l'esport tactique. Réussir à toucher un objet accéléré aux trajectoires non linéaires réclame la synchronisation de la poursuite oculaire lente, de l'extrapolation vectorielle et d'un contrôle moteur en boucle fermée.",
    "Le traitement neuronal du mouvement visuel s'amorce dans les neurones sélectifs à la direction de l'aire temporale moyenne (MT/V5) et temporale supérieure médiane (MST). Ces structures calculent les vecteurs de vitesse et projettent des flux vers les champs oculaires frontaux (FEF) et le cervelet afin de maintenir le gain de poursuite oculaire (Krauzlis, 2004).",
    "Dans sa publication princeps, Rashbass (1961) a prouvé que la poursuite lente et les saccades obéissent à des modes de commande distincts : la poursuite répond à l'erreur de vitesse du glissement rétinien, tandis que les saccades réduisent les écarts de position. Dès que la cible excède 30 à 40°/s ou ricoche, le gain s'affaisse et des saccades correctrices prennent le relais (Bahill et al., 1980).",
    "Par ailleurs, les travaux de Land & McLeod (2000) auprès d'athlètes de sports de balle mettent en lumière que les spécialistes ne suivent pas passivement la trajectoire intégrale de la balle ; ils projettent des saccades d'anticipation vers les points de rebond et d'impact calculés. Cet exercice forge cette exactitude prédictive sous contrainte temporelle sévère."
  ],
  benchmarks: {
    title: "Paliers de Performance en Interception de Cibles Mobiles (Normes SRT)",
    headers: ["Palier de Performance", "Fenêtre de Pacing", "Score & Seuil de Combo", "Profil de Poursuite et d'Interception"],
    rows: [
      ["Tier 1: Intercepteur Cinétique Apex", "< 0.25s Fenêtre", "16 000+ PTS | Combo 25x+", "Poursuite lente de niveau pro ; extrapolation parfaite sans latence de saccade correctrice. Niveau pilotes et joueurs d'élite."],
      ["Tier 2: Traqueur Dynamique Supérieur", "0.25 – 0.45s Fenêtre", "10 500 – 15 999 PTS | Combo 16x+", "Fluidité oculaire remarquable ; corrections vives en boucle fermée avec dépassement minime sur des cibles accélérées."],
      ["Tier 3: Standard Adulte Équilibré", "0.46 – 0.70s Fenêtre", "6 000 – 10 499 PTS | Combo 9x+", "Suivi régulier sur les trajectoires directes ; léger délai d'ajustement lors des rebonds inattendus contre les parois."],
      ["Tier 4: Traqueur en Évolution", "0.71 – 1.00s Fenêtre", "2 500 – 5 999 PTS | Combo 4x+", "Forte dépendance envers les saccades réactives au détriment de la poursuite fluide ; hésitation marquée à grande vitesse."],
      ["Tier 5: Jitter de Suivi (Base)", "> 1.00s Fenêtre", "< 2 500 PTS | Combo < 4x", "Dépassement moteur constant ; difficulté à maintenir la fovéa centrée sur l'objet mobile ; requiert une stabilisation de base."]
    ],
    note: "Ces paliers reposent sur la psychophysique de la vision dynamique et la chronométrie motrice (Rashbass, 1961 ; Krauzlis, 2004 ; Land & McLeod, 2000 ; Bahill et al., 1980 ; Woods et al., 2015). Les scores varient selon la fréquence d'écran et la souris."
  },
  techniques: {
    title: "Méthodes Clés pour Perfectionner l'Interception de Cibles",
    items: [
      {
        name: "Anticipation Vectorielle du Trajet (Ajustement de Rashbass)",
        desc: "En raison du délai de réaction biologique de 150 à 220 ms, cliquer sur l'emplacement actuel de la cible provoque un tir manqué (Rashbass, 1961).",
        tips: "Extrapolez la vélocité et décochez votre clic 5 à 15 pixels en avant de la sphère le long de son axe de déplacement."
      },
      {
        name: "Anticipation des Rebonds (Ancrage Saccadique de Land & McLeod)",
        desc: "Les sportifs chevronnés déplacent le regard vers la zone de rebond anticipée avant même que la cible ne percute le mur (Land & McLeod, 2000).",
        tips: "Dès que l'objet frôle une paroi, portez votre réticule vers l'angle de sortie prévisible au lieu de suivre la cible jusqu'au contact."
      },
      {
        name: "Stabilisation Fovéale Continue (Boucle de Krauzlis)",
        desc: "Un tracking fluide impose de retenir l'objet dans l'axe fovéal afin de supprimer tout flou rétinien parasite (Krauzlis, 2004).",
        tips: "Glissez doucement votre regard au rythme de la cible au lieu de laisser vos yeux statiques en espérant son passage."
      },
      {
        name: "Rupture de Rythme et Discipline de Clic",
        desc: "Des variations brutales provoquent des saccades correctrices (Bahill et al., 1980) ; spammer frénétiquement brise la série de combos.",
        tips: "Ne cliquez pas selon une cadence automatique. Validez visuellement la superposition entre le réticule et la cible avant de presser le bouton."
      }
    ]
  },
  steps: [
    "Cliquez sur Démarrer le Drill pour débuter la session de 45 secondes d'interception cinétique.",
    "Repérez la sphère mouvante avec vos yeux et instaurez une poursuite oculaire ininterrompue.",
    "Anticipez le vecteur de vol et visez légèrement en amont de la trajectoire de la cible.",
    "Cliquez posément sur la sphère avant l'échéance (+150 PTS × Multiplicateur et +0,6 s de rallonge).",
    "Analysez votre total d'interceptions réussies, votre pic de combo et votre échelon de performance au terme du chrono."
  ],
  audience: "Joueurs d'esport (FPS, MOBAs), sportifs de disciplines de contact et de raquette, pilotes de course et toute personne désireuse d'aiguiser sa poursuite visuelle cinétique.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('rashbass1961', 'krauzlis2004', 'land2000', 'bahill1980', 'woods2015'),
  related: [
    { href: "/fr/drills/visual/tracking-accuracy/multiple-targets", label: "Poursuite d'Objets Multiples" },
    { href: "/fr/drills/visual/tracking-accuracy/pursuit-tracker", label: "Traqueur de Poursuite Oculaire Lente" },
    { href: "/fr/drills/visual/reaction-speed/light-reaction", label: "Test de Réaction Lumineuse" },
    { href: "/fr/drills/visual/reaction-speed/go/no-go", label: "Test Go / No-Go d'Inhibition Motrice" },
    { href: "/fr/drills/visual/depth-perception/distance-judgment", label: "Jugement de Distance et Perception de Profondeur" },
    { href: "/fr/drills/visual/visual-recognition/entropic-grid", label: "Recherche sur Grille Entropique" }
  ]
};

export default function KineticInterceptPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <KineticInterceptClient copy={{ title: "Poursuite de Cibles Mobiles: Vision Dynamique" }} />
      <DrillGuide guide={movingTargetGuide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/fr/drills/visual/tracking-accuracy/moving-target" />
      </div>
    </>
  );
}
