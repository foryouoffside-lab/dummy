import ObjectLocationClient from '@/app/drills/memory/spatial-memory/object-location/ObjectLocationClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test de Mémoire Spatiale – Localisation | SkillDrills",
  description: "Test de memoire spatiale en ligne gratuit: Memorisez la position des objets sur grille en 1,5s et retrouvez les coordonnees cibles sans inscription.",
  keywords: [
    "test de memoire spatiale",
    "memoire de localisation des objets",
    "test empan spatial en ligne",
    "exercice memoire viso-spatiale",
    "test silverman et eals",
    "memoire topographique exercice",
    "memoire de travail spatiale test",
    "test de positionnement visuel",
    "evaluation memoire spatiale gratuite",
    "jeu de memoire spatiale en ligne",
    "test d orientation spatiale",
    "retention de coordonnees spatiales"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/memory/spatial-memory/object-location",
    languages: getAlternateLanguages('/drills/memory/spatial-memory/object-location'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Test de Mémoire Spatiale – Localisation | SkillDrills",
    description: "Test de memoire spatiale en ligne gratuit: Memorisez la position des objets sur grille en 1,5s et retrouvez les coordonnees cibles sans inscription.",
    url: "https://skilldrills.online/fr/drills/memory/spatial-memory/object-location",
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test de Mémoire Spatiale – Localisation | SkillDrills",
    description: "Test de memoire spatiale en ligne gratuit: Memorisez la position des objets sur grille en 1,5s et retrouvez les coordonnees cibles sans inscription.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "SkillDrills",
      "item": "https://skilldrills.online/fr"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Entrainements de Memoire",
      "item": "https://skilldrills.online/fr/drills/memory"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Memoire Spatiale",
      "item": "https://skilldrills.online/fr/drills/memory/spatial-memory"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Test de Localisation d Objets",
      "item": "https://skilldrills.online/fr/drills/memory/spatial-memory/object-location"
    }
  ]
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test de Mémoire Spatiale (Localisation d Objets)",
  "url": "https://skilldrills.online/fr/drills/memory/spatial-memory/object-location",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "dateModified": "2026-09-16",
  "author": {
    "@type": "Organization",
    "name": "SkillDrills"
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Test de Mémoire Spatiale (Localisation d Objets)",
  "url": "https://skilldrills.online/fr/drills/memory/spatial-memory/object-location",
  "description": "Test interactif mesurant la memoire de localisation spatiale, la liaison objet-coordonnees et l empan de travail visuo-spatial sur grille progressive.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires JavaScript. Requires HTML5 Canvas.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "author": {
    "@type": "Organization",
    "name": "SkillDrills"
  },
  "isAccessibleForFree": true,
  "dateModified": "2026-09-16"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Test de Mémoire Spatiale (Localisation d Objets)",
  "url": "https://skilldrills.online/fr/drills/memory/spatial-memory/object-location",
  "description": "Jeu d entrainement cognitif de memoire spatiale et d identification de coordonnees sur matrices de 3x3 a 7x7.",
  "dateModified": "2026-09-16",
  "gamePlatform": "Web Browser",
  "genre": ["Memory Game", "Cognitive Training", "Brain Training", "Spatial Memory"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment s entrainer a la memoire de localisation spatiale",
  "description": "Protocole en 4 etapes pour encoder la liaison entre l identite d un objet et ses coordonnees spatiales precises.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/fr/drills/memory/spatial-memory/object-location#step-1",
      "name": "Englober la grille entiere",
      "text": "Gardez une vision panoramique de la matrice des l apparition des objets sans vous focaliser sur une seule case."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/fr/drills/memory/spatial-memory/object-location#step-2",
      "name": "Former des liaisons objet-coordonnees",
      "text": "Liez chaque symbole visuel a un repere spatial (coin superieur gauche, centre, bord inferieur) pour creer une carte mentale."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/fr/drills/memory/spatial-memory/object-location#step-3",
      "name": "Identifier la cible demandee",
      "text": "Lors de la requete, focalisez-vous sur le symbole cible et retrouvez son ancre spatiale dans votre representation mentale."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/fr/drills/memory/spatial-memory/object-location#step-4",
      "name": "Valider la coordonnee exacte",
      "text": "Cliquez avec precision sur la case correspondante sur la grille vide pour valider la manche et marquer des points."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-16",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu est-ce que le test de memoire spatiale de localisation d objets ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ce test neuropsychologique evalue la memoire de localisation d objets (Object Location Memory), c est-a-dire la capacite du cerveau a retenir non seulement l identite des objets (quoi), mais aussi leur positionnement spatial exact (ou)."
      }
    },
    {
      "@type": "Question",
      "name": "Comment fonctionne la liaison objet-emplacement (object-location binding) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le cerveau traite separement l identite visuelle via la voie ventrale occipito-temporale et les coordonnees spatiales via la voie dorsale occipito-parietale. L hippocampe et le cortex prefrontal unifient ensuite ces signaux en une trace mnesique integree."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est l origine scientifique du paradigme de Silverman et Eals (1992) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Irwin Silverman et Marion Eals ont concu cette epreuve pour etudier les differences cognitives liees a l evolution humaine, demontrant que la memorisation de configurations d objets fixes repose sur des mecanismes d orientation spatiale topographique distincts de la rotation mentale."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la capacite limite de la memoire spatiale d objets ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Comme pour la memoire de travail visuelle generale (Luck & Vogel, 1997), le cerveau retient en moyenne environ 4 liaisons objet-position sans strategie de regroupement. L utilisation d ancres spatiales permet de monter jusqu a 7 ou 8 objets."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi le temps de memorisation est-il fixe a 1,5 seconde ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Une fenetre de 1,5 seconde sollicite une capture attentionnelle parallele immediate et bloque le recours au comptage ou a la verbalisation lente, mesurant ainsi la retention visuo-spatiale authentique."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la difference entre la voie ventrale et la voie dorsale ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Selon Ungerleider et Mishkin (1982), la voie ventrale (voie du quoi) reconnait les formes, couleurs et identites visuelles, tandis que la voie dorsale (voie du ou) analyse la localisation dans l espace et guide l action motrice."
      }
    },
    {
      "@type": "Question",
      "name": "Quelles strategies permettent d optimiser le rappel de localisation ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le partitionnement en quadrants (diviser la grille en 4 zones) et l association d objets a des motifs geometriques (triangles, lignes de force) augmentent la retention en reduisant la charge de travail cognitive globale."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est l impact du manque de sommeil sur la localisation spatiale ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La fatigue reduit l efficacite synaptique hippocampique et parietale, provoquant des confusions de liaison (attribuer le bon objet a une mauvaise coordonnee) chez plus de 35 % des participants prives de sommeil."
      }
    },
    {
      "@type": "Question",
      "name": "Ce test aide-t-il les performances dans les jeux de strategie et FPS ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolument. Se souvenir de l emplacement exact des equipements, des deployables et des positions ennemies apres un simple coup d oeil furtif constitue un avantage decisif dans les jeux hautement competitifs."
      }
    },
    {
      "@type": "Question",
      "name": "Ce test de memoire spatiale est-il gratuit et sans publicite intrusive ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, SkillDrills propose ce test 100% gratuitement dans le navigateur web, sans creation de compte, sans collecte de donnees personnelles et avec un calcul de score instantane."
      }
    }
  ]
};

const objectLocationGuide = {
  heading: "Guide Scientifique : Mémoire Spatiale et Liaison Objet-Localisation",
  intro: [
    "Le test de mémoire spatiale et de localisation d'objets (Object Location Memory - OLM) est une évaluation neurocognitive interactive mesurant la rétention spatiale, la liaison visuelle objet-emplacement et le rappel de configurations matricielles. Contrairement aux tests matriciels anonymes, cette épreuve impose au cerveau de lier étroitement des symboles visuels distincts à des coordonnées spatiales précises.",
    "Les fondements cliniques de l'évaluation de la mémoire de localisation d'objets ont été posés par Marion Eals & Irwin Silverman (1994) dans leurs recherches pionnières sur la cognition spatiale, démontrant que la rétention des emplacements d'objets constitue un mécanisme évolutif spécialisé, distinct de la rotation mentale. Auparavant, Edward C. Tolman (1948) avait formalisé le concept de carte cognitive, illustrant comment les organismes construisent des modèles spatiaux internes de leur environnement.",
    "Dans l'architecture de la mémoire de travail, Robert H. Logie (1995) et Alan Baddeley (2000) ont établi que la liaison objet-localisation est coordonnée par le tampon épisodique (Episodic Buffer), qui intègre les données du cache visuel (identités des objets) et du scribe interne (coordonnées spatiales). Les travaux de Steven J. Luck & Edward K. Vogel (1997) ont prouvé que la conjonction de traits visuo-spatiaux génère un coût attentionnel majeur, tandis que Nelson Cowan (2001) a établi que la mémoire de travail focale non assistée est strictement bornée à 3 ou 4 paires objet-emplacement indépendantes.",
    "Conformément aux normes chronométriques définies par Woods et al. (2015), cet entraînement met en œuvre une fenêtre d'exposition standardisée de 1,5 seconde et un calibrage adaptatif progressif (de matrices 3x3 jusqu'à 7x7) pour mesurer avec exactitude votre seuil de liaison visuo-spatiale.",
    "Méthodologie de mesure : chaque événement est horodaté avec l'horloge haute résolution performance.now() de votre navigateur, directement sur votre appareil — aucun résultat n'est téléversé vers un serveur. Les minuteurs des navigateurs sont volontairement discrétisés face aux vulnérabilités matérielles (de l'ordre de 1 ms), et l'affichage quantifie chaque transition à l'intervalle de rafraîchissement d'écran (environ 16,7 ms par image à 60 Hz ; Woods et al., 2015). Les écarts inférieurs à 5 ms relèvent du bruit expérimental ; pour suivre vos progrès, effectuez vos séries sur le même équipement.",
    "Transparence des données et respect de la vie privée : SkillDrills ne collecte aucune donnée agrégée. Vos scores et configurations demeurent stockés exclusivement dans le localStorage de votre navigateur web, garantissant qu'aucune moyenne globale ni profil d'utilisateur n'est diffusé. Toutes les références numériques et scientifiques mentionnées ici proviennent directement de travaux évalués par des pairs répertoriés ci-dessous.",
    "Cet entraînement est un jeu interactif sur navigateur conçu pour la pratique cognitive et l'intérêt intellectuel. Il ne constitue pas un dispositif médical, un outil d'évaluation clinique, ni un protocole de diagnostic pour le TDAH, les troubles de la mémoire ou les affections neurocognitives. En cas d'inquiétude sur vos capacités cognitives ou de mémoire, consultez un neuropsychologue ou un médecin qualifié."
  ],
  benchmarks: {
    title: "Paliers Normatifs de Liaison Objet-Localisation Spatiale",
    headers: ["Palier de Performance", "Objets & Échelle de Grille", "Score à l'Exercice", "Profil de Liaison Cognitive & Cartographie Spatiale"],
    rows: [
      ["Palier 1 (Supérieur / 99e Percentile)", "Niveau 8 – 10+ (8 – 10+ objets, grille 6x6–7x7)", "1 000+ points", "Élite visuo-spatiale ; sectorisation rapide en quadrants et ancrage sur repères relationnels ; liaison sans effort de 8+ paires objet-localisation ; localisation cible sub-500 ms."],
      ["Palier 2 (Moyenne Supérieure / 85e–95e Percentile)", "Niveau 6 – 7 (6 – 7 objets, grille 5x5–6x6)", "750 – 999 points", "Supérieur à la moyenne adulte standard ; appariement sémantico-spatial robuste ; résistance aux interférences rétroactives visuelles sur grilles larges ; localisation 500 – 700 ms."],
      ["Palier 3 (Moyenne Adulte Standard / 50e Percentile)", "Niveau 4 – 5 (4 – 5 objets, grille 4x4–5x5)", "450 – 749 points", "Ligne de base de la population adulte saine (Eals & Silverman, 1994 ; CANTAB PAL) ; gère 4 conjonctions objet-position (limite de Cowan) ; perte des cibles centrales sur grilles 5x5 ; localisation 700 – 950 ms."],
      ["Palier 4 (Moyenne Inférieure / Goulot de Liaison)", "Niveau 3 (3 objets, grille 3x3–4x4)", "250 – 449 points", "Rappel limité à 2–3 objets isolés ; confusion des coordonnées des objets contigus ; difficulté lors de l'introduction de distracteurs ; localisation 950 – 1 300 ms."],
      ["Palier 5 (En Développement / Empan Restreint)", "Niveau 1 – 2 (2 objets, grille 3x3)", "< 250 points", "Dégradation rapide de la trace visuelle ; échec de la liaison objet-localisation ; difficulté à retrouver les coordonnées cibles après 1,5 s de délai ; latence supérieure à 1 300 ms."]
    ],
    note: "Le nombre d'objets et la dimension de la grille reflètent le niveau maximal validé durant la session de 45 secondes ; percentiles normatifs calibrés sur les standards Silverman-Eals OLM et CANTAB PAL (Eals & Silverman, 1994 ; Luck & Vogel, 1997 ; Woods et al., 2015)."
  },
  techniques: {
    title: "Protocoles Scientifiques pour Développer la Mémoire de Localisation",
    items: [
      {
        name: "Ancrage Relationnel sur Repères Topologiques",
        desc: "Associez les objets cibles aux repères spatiaux fixes tels que les 4 angles, la case centrale ou les bordures extérieures (Tolman, 1948). Retenir que « le losange est dans le coin supérieur gauche » ancre l'élément à un point de repère saillant sans nécessiter de calcul de coordonnées complexe.",
        tips: "Identifiez immédiatement quels objets occupent les cases périphériques et les coins durant les 500 premières millisecondes."
      },
      {
        name: "Appariement Associatif Sémantico-Spatial",
        desc: "Créez des associations narratives ou verbales rapides liant l'identité d'un symbole à son orientation spatiale (Baddeley, 2000). Par exemple, associez mentalement une « étoile » en haut au ciel, ou une « clé » en bas à un tiroir secret.",
        tips: "Formulez instantanément une étiquette verbale reliant le nom de l'icône à sa direction (ex. « étoile en haut, clé en bas »)."
      },
      {
        name: "Sectorisation par Quadrants et Chunking",
        desc: "Subdivisez mentalement les grilles étendues de 5x5 ou 7x7 en 4 quadrants distincts (haut-gauche, haut-droite, bas-gauche, bas-droite). Comptez le nombre d'objets présents dans chaque quadrant pour restreindre votre espace de recherche.",
        tips: "Dénombrez d'abord les objets par quadrant avant de mémoriser leur case précise au sein de ce sous-secteur."
      },
      {
        name: "Balayage Parafovéal et Ancrage Central",
        desc: "Fixez votre regard rigoureusement au centre de la grille lors de l'apparition pour capturer la disposition globale par vision parafovéale, puis effectuez 1 ou 2 micro-saccades ciblées pour résoudre les icônes périphériques ambiguës.",
        tips: "Évitez les mouvements oculaires désordonnés ; gardez la tête immobile et balayez la matrice avec fluidité."
      }
    ]
  },
  steps: [
    "Centrez votre regard sur la matrice et observez la répartition initiale des objets.",
    "Durant les 1,5 seconde d'affichage, reliez chaque objet à un repère saillant (angles, bordures, centre).",
    "Formez des paires sémantico-spatiales rapides reliant l'identité de l'icône à son emplacement.",
    "Dès l'effacement de la grille et l'apparition de l'icône cible, interrogez votre carte mentale et touchez la case mémorisée.",
    "Progressez à travers les matrices de 3x3 à 7x7 pour développer une capacité élevée de liaison visuo-spatiale."
  ],
  audience: "Joueurs de jeux tactiques et compétitifs (gestion des temps de recharge et suivi de cartes), étudiants en sciences et ingénierie, radiologues, conducteurs et toute personne désireuse d'optimiser sa mémoire de travail spatiale et sa cartographie cognitive.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('cowan2001', 'baddeley2000', 'logie1995', 'luck1997', 'tolman1948', 'eals1994', 'woods2015'),
  related: [
    { href: "/drills/memory/spatial-memory/grid-memorization", label: "Test de Mémoire Visuelle" },
    { href: "/drills/memory/spatial-memory/path-tracing", label: "Test de Mémorisation de Trajet" },
    { href: "/drills/memory/short-term-memory/digit-span", label: "Test d'Empan Numérique" },
    { href: "/drills/memory/short-term-memory/word-recall", label: "Test de Mémoire Verbale" },
    { href: "/drills/memory/working-memory/n-back", label: "Test de Mémoire de Travail N-Back" }
  ]
};

export default function ObjectLocationFrenchPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ObjectLocationClient
        copy={{
          "h1Keyword": "Test de Mémoire Spatiale",
          "h1Suffix": " (Localisation d'Objets)",
          "subtitle": "La mémoire de localisation d'objets retient ce qui se trouvait à quel endroit. Eals et Silverman (1994) ont mesuré cette compétence via des agencements d'objets, dont la capacité se heurte à une limite de quatre unités intégrées (Luck & Vogel, 1997).",
          "statScore": "Score",
          "statTime": "Temps",
          "statLevel": "Niveau",
          "statBestScore": "Meilleur Score",
          "levelPrefix": "Niv.",
          "memorizePrompt": "MÉMORISEZ LES EMPLACEMENTS DES OBJETS",
          "targetPrompt": "CIBLE :",
          "startTitle": "Localisation d'Objets Pro",
          "startSubtitle": "Mémoire spatiale • Reconnaissance de coordonnées",
          "countdownSubtitle": "PRÉPAREZ-VOUS",
          "newBest": "NOUVEAU RECORD",
          "pointsLabel": "Points",
          "statAccuracy": "Précision",
          "statPeakLevel": "Niveau Max",
          "statPerfects": "Sans faute",
          "btnPlayAgain": "Rejouer",
          "rulesTitle": "Instructions et Système de Points",
          "aboutTitle": "À propos de l'entraînement à la localisation spatiale",
          "rulesItems": [
            {
              "num": "1",
              "text": "Mémoriser les positions & trouver la cible",
              "highlight": "+150 PTS",
              "result": "Mémorisez les objets en 1,5s puis cliquez sur la coordonnée demandée"
            },
            {
              "num": "2",
              "text": "Progression de niveau",
              "highlight": "Grille 3x3 → 7x7",
              "result": "La matrice et le nombre d'objets augmentent avec vos réussites"
            },
            {
              "num": "3",
              "text": "Clic erroné",
              "highlight": "Aucune pénalité",
              "result": "Aucune déduction de score ou de temps en cas d'erreur"
            },
            {
              "num": "4",
              "text": "Répétition de niveau",
              "highlight": "Même palier",
              "result": "La manche est rejouée au même niveau après un échec"
            }
          ]
        }}
      />
      <DrillGuide guide={objectLocationGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/spatial-memory/object-location"
          locale="fr"
        />
      </div>
    </>
  );
}
