import PeripheralPingPursuitClient from '@/app/drills/visual-tracking/peripheral-ping-pursuit/PeripheralPingPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// FRENCH SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "entraînement vision périphérique" / "exercices vision périphérique"
// Secondary:    "attention spatiale diffuse", "élargissement champ visuel", "stabilité fovéale centrale"
// LSI / Domain:  "détection stimuli périphériques", "perception visuelle latérale", "poursuite visuelle et champ large",
//               "vision périphérique jeux de tir", "acuité visuelle dynamique sport", "coordination fovéale périphérique", "test champ visuel dynamique"
// Authentic Domain Terms: Entraînement de la Vision Périphérique（Peripheral Vision Training）, Attention Spatiale Diffuse（Covert Spatial Attention）, Champ Visuel Utile（Useful Field of View / UFOV）, Fixation Fovéale（Foveal Fixation）, Bâtonnets Rétiniens（Retinal Rods）, Suppression Saccadique（Saccadic Suppression）, Vision en Tunnel（Tunnel Vision）
// ============================================================

export const metadata = {
  title: "Entraînement Vision Périphérique – SkillDrills",
  description: "Entrainez votre vision peripherique: reperez les signaux lateraux en maintenant une fixation oculaire centrale stable. Gratuit et sans telechargement.",
  keywords: [
    "entraînement vision périphérique",
    "exercices vision périphérique",
    "attention spatiale diffuse",
    "élargissement champ visuel",
    "stabilité fovéale centrale",
    "détection stimuli périphériques",
    "perception visuelle latérale",
    "poursuite visuelle et champ large",
    "vision périphérique jeux de tir",
    "acuité visuelle dynamique sport",
    "coordination fovéale périphérique",
    "test champ visuel dynamique"
  ],
  openGraph: {
    title: "Entraînement Vision Périphérique – SkillDrills",
    description: "Entrainez votre vision peripherique: reperez les signaux lateraux en maintenant une fixation oculaire centrale stable. Gratuit et sans telechargement.",
    type: "website",
    url: "https://skilldrills.online/fr/drills/visual-tracking/peripheral-ping-pursuit",
    siteName: "SkillDrills",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Entraînement Vision Périphérique – SkillDrills",
    description: "Entrainez votre vision peripherique: reperez les signaux lateraux en maintenant une fixation oculaire centrale stable. Gratuit et sans telechargement.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/visual-tracking/peripheral-ping-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/peripheral-ping-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://skilldrills.online/fr" },
    { "@type": "ListItem", "position": 2, "name": "Exercices", "item": "https://skilldrills.online/fr/drills" },
    { "@type": "ListItem", "position": 3, "name": "Poursuite Visuelle", "item": "https://skilldrills.online/fr/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "Entraînement Vision Périphérique – Ping Pursuit", "item": "https://skilldrills.online/fr/drills/visual-tracking/peripheral-ping-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Entraînement de la Vision Périphérique et Attention Diffuse",
  "operatingSystem": "Navigateur Web",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "description": "Logiciel d entraînement visuel à double tâche pour évaluer la stabilité fovéale centrale et la réactivité de détection périphérique."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Application de Vision Périphérique Ping Pursuit",
  "url": "https://skilldrills.online/fr/drills/visual-tracking/peripheral-ping-pursuit",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "Tous les navigateurs modernes",
  "browserRequirements": "Nécessite la prise en charge de JavaScript et HTML5 Canvas"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Entraînement Vision Périphérique Ping Pursuit",
  "description": "Exercice visuel à double tâche où l utilisateur maintient le suivi d une cible centrale tout en détectant des signaux lumineux périphériques.",
  "genre": ["Entraînement Visuel", "Vision Périphérique", "Entraînement des Réflexes"],
  "playMode": "SinglePlayer",
  "gamePlatform": "Navigateur Web"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment Entraîner sa Vision Périphérique avec le Ping Pursuit",
  "description": "Protocole neurophysiologique pour élargir le champ visuel utile tout en conservant une fixation fovéale centrale rigoureuse.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Ancrage Fovéal Central",
      "text": "Installez-vous à 50 ou 70 cm de votre écran. Fixez rigoureusement la cible centrale en déplacement sans la quitter des yeux."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Élargissement de l Attention Diffuse",
      "text": "Ouvrez votre champ attentionnel mental vers les contours du moniteur tout en gardant vos globes oculaires ancrés au centre."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Détection des Signaux Périphériques",
      "text": "Dès qu un éclair lumineux transitoire apparaît sur les bords, repérez-le via les bâtonnets rétiniens sans tourner le regard."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Déclenchement Moteur Immédiat",
      "text": "Appuyez sur la commande d entrée sans retard tout en maintenant la continuité de la poursuite visuelle centrale."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "En quoi consiste l entraînement de vision périphérique Ping Pursuit ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "C est un protocole de double tâche visuelle qui développe l attention spatiale diffuse et élargit le champ visuel utile (UFOV) sans interrompre la poursuite fovéale continue (Posner, 1980)."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la différence physiologique entre la fovéa et la rétine périphérique ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La fovéa couvre les 1 à 2 degrés centraux avec une haute densité de cônes pour la précision. La périphérie est dominée par les bâtonnets et la voie magnocellulaire, spécialisée dans la détection des mouvements et des contrastes (Wolfe, 1994)."
      }
    },
    {
      "@type": "Question",
      "name": "Comment fonctionne l attention spatiale diffuse sans déplacer les yeux ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Elle repose sur le réseau fronto-pariétal dorsal, qui permet de déplacer le projecteur attentionnel à travers l espace visuel sans rotation physique des yeux (Eriksen & St. James, 1986)."
      }
    },
    {
      "@type": "Question",
      "name": "Comment cet exercice combat-il la vision en tunnel sous stress ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La surcharge cognitive a tendance à réduire le champ visuel utile. S entraîner en situation de double tâche conditionne le cortex à maintenir une large bande passante attentionnelle."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi ne doit-on pas regarder directement le signal lumineux périphérique ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tourner les yeux déclenche une saccade balistique provoquant une suppression saccadique de 50 à 100 ms, ce qui vous prive momentanément de toute information sur la trajectoire centrale (Findlay & Walker, 1999)."
      }
    },
    {
      "@type": "Question",
      "name": "Quel avantage cet exercice procure-t-il dans les jeux de tir (FPS) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les joueurs d élite verrouillent leur viseur au centre tout en gardant une perception aiguë de la minicarte et des menaces latérales, évitant ainsi d être pris par surprise."
      }
    },
    {
      "@type": "Question",
      "name": "Comment ce travail profite-t-il aux sportifs de disciplines traditionnelles ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Au football, basket-ball ou tennis, les joueurs doivent focaliser la balle tout en intégrant les courses des adversaires et partenaires sur les ailes (Leigh & Zee, 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est l incidence du taux de rafraîchissement de l écran ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les moniteurs à fréquence élevée (144Hz ou plus) affichent les impulsions sans flou de mouvement, permettant aux bâtonnets de capter le stimulus plus promptement (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Cette plateforme d entraînement est-elle gratuite et sans publicité gênante ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, SkillDrills propose cet outil sans frais, sans inscription et sans téléchargement, directement dans votre navigateur web."
      }
    },
    {
      "@type": "Question",
      "name": "À quelle fréquence convient-il de pratiquer pour élargir son champ visuel ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Trois à cinq sessions de 5 à 10 minutes par semaine permettent d observer un élargissement mesurable du champ visuel utile en 4 à 6 semaines."
      }
    }
  ]
};

const guideProps = {
  heading: "Bases Scientifiques de la Vision Périphérique et de l Attention Diffuse",
  intro: [
    "Le système visuel humain repose sur une division fonctionnelle stricte : la fovéa centrale assure une vision détaillée à haute résolution sur seulement 1° à 2° du champ visuel (voie parvocellulaire), tandis que l ensemble du champ périphérique est gouverné par les bâtonnets et la voie magnocellulaire, ultrasensibles au mouvement et aux fluctuations de luminance (Wolfe, 1994 ; Leigh & Zee, 2015). L instinct naturel pousse les yeux à lancer immédiatement une saccade vers tout stimulus excentré.",
    "L exercice Ping Pursuit entraîne l aptitude cognitive de l attention spatiale diffuse : la capacité à élargir son champ visuel utile et à détecter des signaux périphériques sans dévier le regard de la cible centrale (Posner, 1980 ; Eriksen & St. James, 1986). En exigeant une fixation fovéale ininterrompue au centre, l exercice conditionne le champ oculaire frontal à inhiber les saccades parasites et aiguise la détection magnocellulaire (Findlay & Walker, 1999).",
    "La latence d affichage et la fréquence d échantillonnage des périphériques influencent la détection temporelle des impulsions lumineuses (Woods et al., 2015). Toutes les données de performance sont traitées localement dans votre navigateur pour préserver votre vie privée."
  ],
  benchmarks: {
    title: "Mesures du Champ Visuel Utile (UFOV) et Temps de Réaction Périphérique",
    headers: ["Niveau de Performance", "Champ Visuel Utile (UFOV %)", "Temps de Réaction Périphérique", "Stabilité Centrale", "Profil Neurophysiologique"],
    rows: [
      ["Élite (Esport / Athlètes)", "Supérieur à 92%", "Inférieur à 280 ms", "Supérieur à 95%", "Dissociation fovéale parfaite ; perception panoramique sans déviation de l axe oculaire central."],
      ["Avancé (Niveau Compétition)", "85% – 92%", "280 ms – 340 ms", "90% – 95%", "Excellente répartition de l attention diffuse ; temps de réaction minime aux signaux latéraux."],
      ["Compétent (Adulte Sain)", "75% – 84%", "341 ms – 410 ms", "82% – 89%", "Bonne capacité de double tâche ; légère vision en tunnel sous vitesse centrale élevée."],
      ["En Progression", "60% – 74%", "411 ms – 500 ms", "70% – 81%", "Retard sensible ; micro-saccades involontaires fréquentes vers les signaux lumineux périphériques."],
      ["Débutant / Rééducation", "Inférieur à 60%", "Supérieur à 500 ms", "Inférieur à 70%", "Vision en tunnel marquée ; rupture constante de la poursuite centrale lors des apparitions périphériques."]
    ],
    note: "※ Valeurs fondées sur des tests standardisés à 50–70 cm de l écran lors de séquences de 60 secondes en double tâche. Seules les sessions avec poursuite centrale continue sont comptabilisées."
  },
  techniques: {
    title: "Quatre Principes Fondamentaux pour Développer la Vision Périphérique",
    items: [
      {
        name: "Protocole d Ancrage Fovéal",
        desc: "Exercez vos muscles oculomoteurs à rester fixés sur le mobile central. Résistez à l impulsion réflexe de regarder l éclat lumineux afin d éviter la suppression saccadique (Findlay & Walker, 1999).",
        tips: "Visualisez votre regard central comme un point magnétique solide tandis que votre attention s étale sur la totalité de l écran."
      },
      {
        name: "Déploiement de l Attention Diffuse",
        desc: "Élargissez votre projecteur mental depuis le centre jusqu aux bords du moniteur. Adoptez un regard détendu où les bâtonnets rétiniens perçoivent la lumière sans mise au point formelle (Posner, 1980).",
        tips: "Ne cherchez pas à identifier la couleur du signal latéral ; réagissez dès l apparition de la variation de contraste."
      },
      {
        name: "Mobilisation de la Voie Dorsale",
        desc: "Les informations visuelles empruntent les voies ventrale ('quoi') et dorsale ('où'). La perception périphérique repose sur la voie dorsale. Contournez la réflexion consciente pour privilégier le réflexe moteur pur.",
        tips: "Répondez directement au transitoire lumineux sans chercher à verbaliser le stimulus."
      },
      {
        name: "Régulation Respiratoire Parasympathique",
        desc: "La tension sympathique contracte le champ visuel et provoque une vision en tunnel immédiate (Eriksen & St. James, 1986). Une respiration nasale lente stabilise le rythme cardiaque et préserve une perception panoramique.",
        tips: "Inspirez calmement pendant 4 secondes et expirez pendant 6 secondes pour relâcher les tensions oculaires et cervicales."
      }
    ]
  },
  steps: [
    "Installez-vous à une distance confortable de 50 à 70 cm de votre écran, tête et menton stables.",
    "Sélectionnez la durée souhaitée (30 à 120 secondes) et la vitesse du mobile central.",
    "Fixez le centre du mobile et accompagnez sa trajectoire sans quitter l axe visuel.",
    "Dès qu un éclair lumineux surgit en périphérie, enregistrez-le sans détourner les yeux du centre.",
    "Activez immédiatement la commande d entrée et observez votre indice de champ visuel utile."
  ],
  audience: "Joueurs de jeux de tir compétitifs (Valorant, CS2, Overwatch 2, Apex Legends), sportifs de disciplines collectives et de combat, conducteurs et toute personne souhaitant contrer la vision en tunnel.",
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('posner1980', 'eriksen1986', 'wolfe1994', 'findlay1999', 'leigh2015', 'woods2015'),
  related: [
    { href: "/fr/drills/visual-tracking/constant-slow-pursuit", label: "Poursuite Oculaire Lente Continue (Constant Slow)" },
    { href: "/fr/drills/visual-tracking/directional-chaos-pursuit", label: "Poursuite avec Chaos Directionnel (Directional Chaos)" },
    { href: "/fr/drills/visual-tracking/dynamic-evasion-pursuit", label: "Poursuite Évasive Réactive (Dynamic Evasion)" },
    { href: "/fr/drills/visual-tracking/ghosting-suppress-pursuit", label: "Stabilité de Fixation Oculaire (Ghosting Suppress)" },
    { href: "/fr/drills/visual-tracking/infinity-pursuit", label: "Entraînement en Huit Infini (Infinity)" },
    { href: "/fr/drills/visual-tracking/momentum-teleport-pursuit", label: "Poursuite de Cible Téléportée (Momentum)" }
  ]
};

export default function FrenchPeripheralPingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <PeripheralPingPursuitClient
        copy={{
          title: "Entraînement de Vision Périphérique et Élargissement du Champ Visuel",
          subtitle: "Évaluation en Double Tâche : Fixation Fovéale Centrale et Détection de Signaux Latéraux",
          description: "Entraînement neurovisuel gratuit pour contrer la vision en tunnel et cultiver l attention spatiale diffuse. Poursuivez la cible centrale avec régularité tout en captant les signaux latéraux aux marges de l écran sans dévier le regard. Gratuit dans votre navigateur."
        }}
      />

      <DrillGuide guide={guideProps} />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/fr/drills/visual-tracking/peripheral-ping-pursuit" />
      </div>
    </>
  );
}
