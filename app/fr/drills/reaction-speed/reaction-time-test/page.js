import ReactionTimeTestWrapper from '@/app/drills/reaction-speed/reaction-time-test/ReactionTimeTestWrapperLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — France & Francophonie (FR / FR-FR / FR-CA)
// Primary Intent: test de temps de réaction, test de réflexe en ligne, temps de réaction souris
// French Gaming & Athletic Context: Test de réflexe en millisecondes, chronométrie mentale pour CS2, Valorant et LoL
// High-Demand, Low-Competition Target Keywords:
//   - "test de temps de réaction" (Core French query for reaction time test)
//   - "test de réflexe en ligne" (Online reflex test)
//   - "temps de réaction souris" (Mouse reaction time)
//   - "mesurer son temps de réaction" (Measure reaction time)
//   - "test de réflexe souris gamer" (Gamer mouse reflex test)
//   - "test réflexe millisecondes" (Millisecond reflex test)
//   - "temps de réaction moyen humain" (Human average reaction time)
//   - "test réflexe fps valorant" (Esports FPS reflex test)
// ============================================================

export const metadata = {
  title: "Test Temps de Réaction – Mesure de Réflexe | SkillDrills",
  description: "Test de temps de réaction en ligne gratuit : mesurez votre vitesse de réaction visuelle en millisecondes (ms) et comparez vos scores aux benchmarks.",
  keywords: [
    "test de temps de réaction",
    "test de réflexe en ligne",
    "temps de réaction souris",
    "mesurer son temps de réaction",
    "test de réflexe souris gamer",
    "test réflexe millisecondes",
    "temps de réaction moyen humain",
    "test réflexe fps valorant"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/reaction-speed/reaction-time-test',
    languages: getAlternateLanguages('/drills/reaction-speed/reaction-time-test'),
  },
  openGraph: {
    title: "Test Temps de Réaction – Mesure de Réflexe | SkillDrills",
    description: "Test de temps de réaction en ligne gratuit : mesurez votre vitesse de réaction visuelle en millisecondes (ms) et comparez vos scores aux benchmarks.",
    url: 'https://skilldrills.online/fr/drills/reaction-speed/reaction-time-test',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test Temps de Réaction – Mesure de Réflexe | SkillDrills",
    description: "Mesurez votre vitesse de réaction visuelle en millisecondes (ms) en ligne gratuitement. Évaluez vos réflexes sans latence logicielle.",
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "SkillDrills Accueil",
      "item": "https://skilldrills.online/fr"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Exercices",
      "item": "https://skilldrills.online/fr/drills"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Vitesse de Réaction",
      "item": "https://skilldrills.online/fr/drills/reaction-speed"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Test de Temps de Réaction",
      "item": "https://skilldrills.online/fr/drills/reaction-speed/reaction-time-test"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test de Temps de Réaction & Réflexes en Ligne",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Outil chronométrique haute précision pour mesurer le temps de réaction visuel en millisecondes (ms), évaluer les latences neuromusculaires et comparer ses performances aux benchmarks esports.",
  "url": "https://skilldrills.online/fr/drills/reaction-speed/reaction-time-test",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online/fr"
  },
  "inLanguage": "fr",
  "dateModified": "2026-09-12"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Test de Temps de Réaction & Réflexes en Ligne | SkillDrills",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires HTML5 Canvas and JavaScript enabled browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/fr/drills/reaction-speed/reaction-time-test",
  "inLanguage": "fr",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Test de Temps de Réaction Visuel",
  "url": "https://skilldrills.online/fr/drills/reaction-speed/reaction-time-test",
  "genre": ["Reflex Game", "Chronometry Trainer", "Esports Precision"],
  "playMode": "SinglePlayer",
  "description": "Mesurez vos réflexes visuels purs en millisecondes en réagissant instantanément aux stimuli graphiques sans délai réseau."
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quel est le temps de réaction moyen d'un être humain face à un stimulus visuel ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le temps de réaction visuel moyen chez un adulte sain se situe entre 200 et 250 millisecondes (ms) (Kosinski, 2008). Les scores inférieurs à 190 ms sont considérés comme excellents, tandis que les athlètes d'esport de haut niveau (Valorant, CS2) et les pilotes de Formule 1 atteignent régulièrement des moyennes situées entre 150 et 170 ms."
      }
    },
    {
      "@type": "Question",
      "name": "Comment ce test mesure-t-il les millisecondes avec une telle exactitude ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Notre outil s'appuie sur l'API performance.now() native du navigateur, qui fournit des horodatages à résolution millisecondaire (environ 1 ms). Aucun aller-retour serveur (ping réseau) n'interfère : la détection est traitée localement sur le thread matériel du client (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Est-il scientifiquement possible d'améliorer son temps de réaction par l'entraînement ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. Des recherches en neurosciences cognitives (Dye, Green, & Bavelier, 2009) ont démontré qu'une pratique régulière de drills sensorimoteurs optimise le traitement visuel fovéal et réduit le délai de déclenchement moteur de 15 à 30 ms, tout en réduisant considérablement la variabilité inter-essais."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi les réflexes auditifs sont-ils systématiquement plus rapides que les réflexes visuels ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le signal auditif met seulement 8 à 10 ms pour transiter des mécanorécepteurs de la cochlée jusqu'au tronc cérébral et au cortex auditif. À l'inverse, la phototransduction rétinienne implique des réactions chimiques complexes nécessitant 20 à 40 ms. De ce fait, le temps de réaction auditif (140-160 ms) devance toujours le temps visuel (Shelton & Kumar, 2010)."
      }
    },
    {
      "@type": "Question",
      "name": "Quel impact le taux de rafraîchissement de l'écran (Hz) a-t-il sur le résultat mesuré ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un écran 60 Hz n'actualise l'image que toutes les 16,6 ms, ajoutant une latence d'affichage incompressible. Sur un écran 144 Hz (6,9 ms) ou 240 Hz (4,1 ms), le stimulus apparaît physiquement plus tôt sur la dalle, ce qui améliore mécaniquement le score mesuré de 10 à 12 ms à performance physiologique identique (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la différence entre un réflexe spinal et un temps de réaction volontaire ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un réflexe spinal (comme le réflexe rotulien) emprunte un arc réflexe monosynaptique sans transiter par les hémisphères cérébraux, s'exécutant en 20 à 50 ms. Le temps de réaction mesuré ici mobilise la rétine, les voies optiques, le cortex visuel primaire, les aires décisionnelles préfrontales et le cortex moteur, nécessitant au minimum 150 ms."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi mes scores varient-ils d'un jour à l'autre ou au cours de la journée ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La chronométrie mentale fluctue en fonction des rythmes circadiens, de la dette de sommeil, de la charge cognitive préalable, de l'hydratation et de la consommation de stimulants comme la caféine, qui peut réduire temporairement la latence motrice de 10 à 20 ms en bloquant les récepteurs d'adénosine (Smith, 2002)."
      }
    },
    {
      "@type": "Question",
      "name": "Le vieillissement dégrade-t-il inéluctablement la vitesse de réaction ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le pic de vitesse réflexe pure culmine entre 18 et 24 ans, avant de fléchir modérément d'environ 2 à 6 ms par décennie (Der & Deary, 2006). Néanmoins, le maintien d'une activité cardiovasculaire régulière et la pratique de jeux vidéo d'action préservent l'efficacité synaptique et compensent le ralentissement biologique."
      }
    },
    {
      "@type": "Question",
      "name": "En quoi le temps de réaction est-il déterminant dans des jeux comme Valorant, CS2 ou League of Legends ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Lors d'un duel de 'peeking' en ligne, l'avantage de l'attaquant combiné aux latences réseau confère une fenêtre de tir de moins de 200 ms. Disposer d'un temps de réaction sous les 170 ms permet de punir une ligne tenue ou d'activer instantanément une compétence d'esquive défensive (Flash / Zhonya)."
      }
    },
    {
      "@type": "Question",
      "name": "Le test fonctionne-t-il fidèlement sur smartphone et tablette tactile ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, le module prend en charge les événements tactiles PointerEvents avec une détection immédiate au contact de l'écran. Toutefois, les dalles tactiles des appareils mobiles introduisent généralement 10 à 30 ms de latence de numériseur supplémentaire comparé à une souris filaire 1000 Hz."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment Mesurer Précisément son Temps de Réaction en Ligne",
  "description": "Protocole en 4 étapes pour évaluer votre vitesse de réaction visuelle avec un étalonnage scientifique.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Lancement du Mode Plein Écran",
      "text": "Cliquez sur la zone de test pour activer le mode immersif et minimiser les distractions visuelles."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Fixation Attentionnelle & Préparation",
      "text": "Fixez le centre du champ et préparez votre index sur le bouton de souris sans exercer de pression prématurée."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Déclenchement Moteur Instantané",
      "text": "Dès l'apparition du signal lumineux, cliquez le plus rapidement possible sans anticiper au hasard."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Analyse de la Moyenne & Comparaison au Barème",
      "text": "Répétez 5 à 10 essais pour éliminer les valeurs aberrantes et consultez votre percentile de performance."
    }
  ]
};

const reactionGuide = {
  heading: "Guide Scientifique du Temps de Réaction & Barèmes Officiels",
  intro: [
    "Le test de temps de réaction mesure le délai total requis par le système nerveux central pour détecter un stimulus lumineux, le décoder au sein du cortex visuel primaire (V1) et transmettre l'influx moteur aux fléchisseurs de l'index via la moelle épinière.",
    "Dans l'esport de compétition (CS2, Valorant, League of Legends, Apex Legends) ainsi que dans les sports à haute vitesse (Formule 1, escrime, tennis de table), chaque gain de 10 ms décuple l'efficacité du premier engagement et la capacité d'interception d'actions imprévues.",
    "Mesure rigoureuse sans latence réseau : notre moteur exécute les calculs de chronométrie directement en local via l'API performance.now(), garantissant une précision millisecondaire exempte de toute fluctuation de connexion internet.",
    "Considérations matérielles : les écrans 60 Hz ajoutent jusqu'à 16,6 ms de délai d'affichage par trame. L'utilisation d'une dalle 144 Hz ou 240 Hz couplée à une souris optique à 1000 Hz est fortement préconisée pour révéler votre véritable potentiel physiologique (Woods et al., 2015)."
  ],
  benchmarks: {
    title: "Tableau de Référence International du Temps de Réaction Visuel",
    headers: ["Temps de Réaction (ms)", "Palier de Performance", "Percentile Mondial", "Rang Esport Estimé", "Profil Neurophysiologique"],
    rows: [
      ["< 150 ms", "Surhumain / Légendaire (Godlike)", "Top 1%", "Pilotes F1 / Joueurs Esport Pros", "Anticipation synaptique exceptionnelle, limite biologique de conduction neuronale"],
      ["150 – 190 ms", "Élite Esport (Elite Tier)", "Top 5%", "Radiant / Immortel / Challenger", "Traitement visuel fovéal ultra-rapide, activation motrice immédiate et épurée"],
      ["190 – 240 ms", "Avancé / Compétitif (Advanced)", "Top 25%", "Diamant / Ascendant", "Excellente discrimination du stimulus et coordination œil-main solide"],
      ["240 – 280 ms", "Moyenne Standard Adulte (Average)", "Médiane 50%", "Gold / Platine", "Vitesse de réaction classique chez un adulte sain sur écran standard"],
      ["300 ms+", "Débutant / Fatigue (Developing)", "Derniers 20%", "Argent / Bronze", "Fatigue nerveuse, manque de sommeil ou latence d'affichage matérielle excessive"]
    ],
    note: "Données calibrées sur les études académiques de chronométrie mentale humaine (Kosinski, 2008; Woods et al., 2015). Les affichages 60 Hz ajoutent un délai mécanique d'environ 16,7 ms par trame."
  },
  techniques: {
    title: "Physiologie Sensorielle & Principes d'Optimisation des Réflexes",
    items: [
      {
        name: "Chaîne de Traitement Visuelle (~200–250 ms)",
        desc: "Délai incompressible requis par les photons pour activer la rhodopsine rétinienne, propager l'influx le long du nerf optique vers le corps genouillé latéral, puis activer le cortex moteur via le faisceau pyramidal (Kosinski, 2008)."
      },
      {
        name: "Avantage Chronométrique Auditif (~140–160 ms)",
        desc: "La transduction mécanosensorielle de l'oreille interne s'effectue en quelques millisecondes, devançant les réactions biochimiques de la rétine de 30 à 50 ms (Shelton & Kumar, 2010)."
      },
      {
        name: "Suppression de la Latence d'Affichage Matérielle",
        desc: "Un taux de rafraîchissement élevé (144Hz/240Hz) couplé à la désactivation de la synchronisation verticale (V-Sync) élimine le tamponnage des images et libère 10 à 15 ms de gain pur (Woods et al., 2015)."
      },
      {
        name: "Posture & Régulation de la Tension Musculaire",
        desc: "Une préhension détendue des doigts sur le commutateur de la souris évite la co-contraction d'inhibition des antagonistes, accélérant la course de clic lors de la prise de décision motrice."
      }
    ]
  },
  steps: [
    "Positionnez-vous confortablement face à l'écran et centrez votre regard sur la zone d'affichage.",
    "Reposez délicatement la pulpe de l'index sur le bouton gauche de la souris sans forcer.",
    "Dès le basculement visuel de la cible, pressez instantanément le bouton sans hésitation.",
    "Répétez une série de 5 mesures complètes pour consolider votre moyenne officielle en millisecondes."
  ],
  audience: "Joueurs d'esport sur Counter-Strike 2, Valorant, Apex Legends et League of Legends, athlètes de sports de combat et de vitesse, conducteurs et toute personne désireuse d'évaluer et de perfectionner sa vivacité neuromotrice.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('kosinski2008', 'woods2015', 'shelton2010', 'der2006')
};

export default function LocalizedReactionTimeTestPageFr() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
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
      <ReactionTimeTestWrapper
        copy={{
          title: "Test de Temps de Réaction & Réflexes en Ligne",
          caption: "Chronométrie Mentale & Vitesse de Réaction Visuelle • Précision à la Milliseconde"
        }}
      />
      <DrillGuide {...reactionGuide} />
      <RelatedDrills currentCategory="reaction-speed" currentHref="/drills/reaction-speed/reaction-time-test" />
    </>
  );
}
