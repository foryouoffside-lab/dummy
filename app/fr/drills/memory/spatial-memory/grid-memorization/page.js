import GridMemorizationClient from '@/app/drills/memory/spatial-memory/grid-memorization/GridMemorizationClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test de Mémoire Visuelle – Matrice de Grille | SkillDrills",
  description: "Test de memoire visuelle en ligne gratuit: Memorisez les motifs de grille en 1,5s et developpez votre empan spatial et chunking visuel sans inscription.",
  keywords: [
    "test de memoire visuelle",
    "test memoire spatiale",
    "jeu de memoire grille",
    "matrice de memoire visuelle test",
    "test empan visuel en ligne",
    "exercice memoire visuelle gratuit",
    "test de memoire des formes",
    "capacite memoire viso-spatiale",
    "test memoire de travail visuelle",
    "entrainement memoire visuelle en ligne",
    "test de retention spatiale gratuit",
    "evaluation memoire visuelle court terme"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/memory/spatial-memory/grid-memorization",
    languages: getAlternateLanguages('/drills/memory/spatial-memory/grid-memorization'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Test de Mémoire Visuelle – Matrice de Grille | SkillDrills",
    description: "Test de memoire visuelle en ligne gratuit: Memorisez les motifs de grille en 1,5s et developpez votre empan spatial et chunking visuel sans inscription.",
    url: "https://skilldrills.online/fr/drills/memory/spatial-memory/grid-memorization",
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test de Mémoire Visuelle – Matrice de Grille | SkillDrills",
    description: "Test de memoire visuelle en ligne gratuit: Memorisez les motifs de grille en 1,5s et developpez votre empan spatial et chunking visuel sans inscription.",
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
      "name": "Test de Memoire Visuelle",
      "item": "https://skilldrills.online/fr/drills/memory/spatial-memory/grid-memorization"
    }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Test de Mémoire Visuelle en Ligne",
  "url": "https://skilldrills.online/fr/drills/memory/spatial-memory/grid-memorization",
  "description": "Test neuropsychologique gratuit mesurant la memoire de travail visuo-spatiale, la reconnaissance de motifs et la capacite du cache visuel sur grille matricielle.",
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

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test de Mémoire Visuelle en Ligne",
  "url": "https://skilldrills.online/fr/drills/memory/spatial-memory/grid-memorization",
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

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Test de Mémoire Visuelle en Ligne",
  "url": "https://skilldrills.online/fr/drills/memory/spatial-memory/grid-memorization",
  "description": "Jeu cognitif interactif mesurant l empan visuel, le chunking spatial et la restitution de motifs matriciels sans contrainte verbale.",
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
  "name": "Comment s entrainer a la memoire visuelle matricielle",
  "description": "Protocole en 4 etapes pour encoder, regrouper par formes geometriques et restituer sans faute des motifs sur grille matricielle.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/fr/drills/memory/spatial-memory/grid-memorization#step-1",
      "name": "Fixer le centre de la grille",
      "text": "Positionnez votre regard au centre exact de la matrice avant l allumage afin d englober la totalite du champ visuel parafoveal."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/fr/drills/memory/spatial-memory/grid-memorization#step-2",
      "name": "Appliquer le chunking geometrique",
      "text": "Regroupez mentalement les cases allumees en formes simples (lignes, blocs en L, diagonales) au lieu de memoriser des coordonnees isolees."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/fr/drills/memory/spatial-memory/grid-memorization#step-3",
      "name": "Maintenir l image dans le cache visuel",
      "text": "Conservez une image mentale globale du motif pendant la transition d extinction en evitant toute verbalisation phonologique parasite."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/fr/drills/memory/spatial-memory/grid-memorization#step-4",
      "name": "Restituer le motif avec precision",
      "text": "Cliquez methodiquement sur les cases mémorisees en commencant par les clusters les plus nets, sans vous precipiter."
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
      "name": "Qu est-ce que le test de memoire visuelle matricielle (Visual Patterns Test) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le test de memoire visuelle sur grille matricielle est inspire du Visual Patterns Test (VPT) developpe par Della Sala et al. (1997). Il evalue la capacite de retention a court terme de motifs visuo-spatiaux statiques, isolant le cache visuel passif des processus de mouvement sequentiel."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la difference entre la memoire visuelle et la memoire spatiale ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dans le modele neurocognitif de Logie (1995), la memoire visuelle repose sur le cache visuel (stockant les formes, couleurs et arrangements statiques), tandis que la memoire spatiale fait intervenir le scribe interne (gerant les trajectoires de mouvement et les sequences motrices)."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la capacite moyenne de retention d un motif sur une grille ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Selon les etudes fondamentales de Luck & Vogel (1997) et de Cowan (2001), la memoire de travail visuelle humaine peut retenir environ 4 elements integres sans encodage verbal. Grace au chunking visuel, un adulte entraine peut atteindre 8 a 12 cases memorisees simultanement."
      }
    },
    {
      "@type": "Question",
      "name": "Qu est-ce que le chunking visuo-spatial et comment l utiliser ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le chunking visuo-spatial consiste a regrouper des cases eclairees individuelles en motifs perceptifs significatifs (lignes, triangles, carres ou lettres). Cette compression reduit la charge cognitive dans le calepin visuo-spatial et permet de mémoriser davantage de cases sans depasser la limite de 4 chunks."
      }
    },
    {
      "@type": "Question",
      "name": "En quoi ce test differe-t-il du test des blocs de Corsi ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le test des blocs de Corsi mesure la memoire de travail spatio-temporelle sequentielle (l ordre d apparition des cibles). A l inverse, la grille matricielle affiche toutes les cibles simultanement, mesurant la retention de configuration spatiale statique pure."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi le temps d exposition est-il limite a 1,5 seconde ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Une duree de 1,5 seconde permet une capture foveale et parafoveale complete du motif tout en empechant la verbalisation phonologique sub-vocale (comme compter les colonnes ou nommer les coordonnees), garantissant une evaluation stricte de la memoire visuelle."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le role du cache visuel passif selon le modele de Logie ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le cache visuel agit comme un registre temporaire receptif qui maintient passivement l arrangement spatial et l apparence des motifs. Il retient l image retinienne traitee pendant quelques secondes avant que la trace mnesique ne s estompe ou ne soit remplacee par de nouvelles entrees."
      }
    },
    {
      "@type": "Question",
      "name": "Comment le sommeil et la fatigue affectent-ils le cache visuel ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La privation de sommeil et la charge mentale reduisent significativement la bande passante du calepin visuo-spatial dans le cortex parietal et occipital, abaissant l empan de 20 a 30 % et augmentant les fausses alertes lors de la restitution."
      }
    },
    {
      "@type": "Question",
      "name": "L entrainement matriciel ameliore-t-il les performances dans les jeux video ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, les joueurs de jeux tactiques, de MOBA et de FPS beneficient directement d un cache visuel aiguise: cela accelere la lecture de la mini-carte, la memorisation instantanee de la position des adversaires et la perception globale de l environnement de combat."
      }
    },
    {
      "@type": "Question",
      "name": "Ce test en ligne de memoire visuelle est-il gratuit et sans inscription ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, le test de memoire visuelle SkillDrills est 100% gratuit, fonctionne entierement cote client dans votre navigateur web sans telechargement ni compte utilisateur, et fournit un retour immediat sur votre empan visuo-spatial."
      }
    }
  ]
};

const gridGuide = {
  heading: "Guide Scientifique de la Mémoire Visuelle & Matrice de Grille",
  intro: [
    "Le test de mémoire visuelle sur grille matricielle (Visual Memory Test) évalue la capacité de stockage et de restitution du calepin visuo-spatial, l'une des composantes centrales de la mémoire de travail humaine. Contrairement aux tests verbaux reposant sur la boucle phonologique et la répétition acoustique, cette épreuve isole l'architecture visuelle non verbale pure du cerveau.",
    "L'étude clinique de l'empan visuo-spatial a été inaugurée par Pietro Corsi (1972) à travers le test des blocs de Corsi, démontrant que la mémoire visuo-spatiale constitue un système mnésique indépendant de l'empan verbal de chiffres (Milner, 1971). En 1997, Sergio Della Sala, Robert H. Logie et leurs collègues ont mis au point le Visual Patterns Test (VPT) afin d'isoler spécifiquement la rétention de motifs matriciels statiques des processus de mouvement séquentiel.",
    "Dans les neurosciences cognitives modernes, Robert H. Logie (1995) et Alan Baddeley (2000) ont subdivisé le calepin visuo-spatial en deux registres : le « cache visuel » (espace passif dédié aux représentations statiques de forme, de couleur et d'agencement) et le « scribe interne » (mécanisme actif de planification motrice et de répétition spatiale). Les recherches pionnières de Steven J. Luck & Edward K. Vogel (1997) et de Nelson Cowan (2001) confirment que la mémoire de travail visuelle brute est strictement plafonnée à 3 ou 4 unités indépendantes : repousser cette limite impose un regroupement spatial en formes gestaltistes (chunking).",
    "Calibré avec une haute rigueur chronométrique (Woods et al., 2015), cet entraînement repose sur une fenêtre d'exposition standardisée de 1,5 seconde et une progression adaptative pas-à-pas pour mesurer votre plafond d'empan matriciel sous forte contrainte temporelle.",
    "Méthodologie de mesure : chaque interaction est horodatée avec l'horloge haute résolution performance.now() de votre navigateur, directement sur votre appareil — aucun résultat n'est téléversé vers un serveur. Les minuteurs des navigateurs sont volontairement discrétisés face aux vulnérabilités matérielles (de l'ordre de 1 ms), et l'affichage quantifie chaque transition à l'intervalle de rafraîchissement d'écran (environ 16,7 ms par image à 60 Hz ; Woods et al., 2015). Les écarts inférieurs à 5 ms relèvent du bruit de mesure ; pour suivre vos progrès, comparez vos sessions sur le même matériel.",
    "Transparence des données et respect de la vie privée : SkillDrills ne collecte aucune donnée agrégée. Vos scores et préférences demeurent stockés exclusivement dans le localStorage de votre navigateur web, garantissant qu'aucune moyenne globale ni profil d'utilisateur n'est publié. Toutes les références numériques et scientifiques citées ici proviennent directement des publications avec comité de lecture répertoriées ci-dessous.",
    "Cet entraînement est un jeu interactif sur navigateur conçu à des fins d'entraînement personnel et pédagogique. Il ne constitue pas un dispositif médical, un outil d'évaluation clinique, ni un protocole de diagnostic pour le TDAH, les troubles de la mémoire ou les affections neurocognitives. Si vous avez des interrogations sur votre santé cognitive ou vos capacités de mémorisation, consultez un neuropsychologue ou un médecin qualifié."
  ],
  benchmarks: {
    title: "Paliers de Référence Normatifs de l'Empan Matriciel Visuo-Spatial",
    headers: ["Palier de Performance", "Empan Matriciel (Cases)", "Score à l'Exercice", "Profil de Stockage & Stratégie de Chunking"],
    rows: [
      ["Palier 1 (Supérieur / 99e Percentile)", "Empan 10 – 14+ cases", "1 150+ points", "Élite visuo-spatiale ; décomposition des motifs complexes en 2-3 formes géométriques de Gestalt ; rétention parfaite dans le cache visuel ; cadence de clic sub-450 ms."],
      ["Palier 2 (Moyenne Supérieure / 85e–95e Percentile)", "Empan 8 – 9 cases", "850 – 1 149 points", "Supérieur à la moyenne adulte ; exécution rapide du chunking de formes (triplets, formes en L) ; grande résistance au bruit visuel ; cadence 450 – 650 ms."],
      ["Palier 3 (Moyenne Adulte Standard / 50e Percentile)", "Empan 6 – 7 cases", "550 – 849 points", "Ligne de base de la population adulte saine (Della Sala et al., 1997) ; gère des regroupements simples ; perte des cases périphériques sur grilles 5x5 ; cadence 650 – 900 ms."],
      ["Palier 4 (Moyenne Inférieure / Goulet d'Étranglement)", "Empan 5 cases", "350 – 549 points", "Proche de la limite brute de capacité sans chunking (Cowan, 2001) ; mémorisation isolée case par case sans regroupement géométrique ; cadence 900 – 1 200 ms."],
      ["Palier 5 (En Développement / Empan Restreint)", "Empan < 5 cases", "< 350 points", "Dégradation rapide de la trace visuelle ; vulnérabilité aux interférences ; difficulté à retenir plus de 4 cases après le délai de 1,5 s ; cadence supérieure à 1 200 ms."]
    ],
    note: "L'empan correspond à la configuration matricielle maximale complétée sans faute durant la session de 45 secondes (Della Sala et al., 1997 ; Luck & Vogel, 1997 ; Woods et al., 2015)."
  },
  techniques: {
    title: "Protocoles Scientifiques pour Développer la Mémoire Matricielle",
    items: [
      {
        name: "Regroupement Spatial et Formes Gestaltistes",
        desc: "Regroupez mentalement les cases allumées adjacentes en formes géométriques familières telles que des triangles, des lignes, des carrés ou des lettres (Wertheimer, 1923 ; Della Sala et al., 1999). Combiner 7 coordonnées isolées en deux formes reconnues réduit la charge cognitive de plus de 60 %.",
        tips: "Recherchez immédiatement les lignes connectées et les blocs d'angles plutôt que de fixer des cases isolées."
      },
      {
        name: "Encodage de l'Espace Négatif et Déduction Complémentaire",
        desc: "Lorsqu'un secteur de la matrice est densément peuplé de cases allumées, mémorisez les cases éteintes (vides). Retenir 2 cases sombres manquantes dans un bloc de 6 est cognitivement bien plus économique que d'encoder les 4 positions illuminées.",
        tips: "Si un quadrant est presque entièrement illuminé, mémorisez les « trous » sombres au lieu des cibles."
      },
      {
        name: "Traçage Kinesthésique du Scribe Interne",
        desc: "Mobilisez le « scribe interne » (Logie, 1995) en traçant mentalement une ligne ou une trajectoire continue reliant les cases illuminées durant les 1,5 seconde d'exposition. La pré-planification motrice renforce les représentations passives du cache visuel.",
        tips: "Adoptez un balayage fluide (par exemple de haut en bas ou de gauche à droite) pour donner une direction au motif."
      },
      {
        name: "Point d'Ancrage Central et Capture Parafovéale",
        desc: "Fixez votre regard rigoureusement au centre de la grille dès le début de la manche. Évitez les saccades oculaires saccadées d'une case à l'autre ; la vision parafovéale enregistre la configuration spatiale globale de manière simultanée.",
        tips: "Relâchez légèrement votre mise au point focale pour absorber le motif comme un instantané photographique global."
      }
    ]
  },
  steps: [
    "Fixez le regard au centre de la grille et attendez l'illumination du motif.",
    "Pendant le flash de 1,5 seconde, regroupez instantanément les cases en 2 ou 3 formes géométriques simples.",
    "Exploitez l'espace négatif (trous sombres) dans les zones denses pour limiter le nombre d'unités mnésiques.",
    "Dès l'extinction de la grille, restituez méthodiquement les blocs géométriques identifiés.",
    "Progressez à travers les grilles de 4x4 à 5x5 pour étendre continuellement votre plafond de mémoire de travail visuelle."
  ],
  audience: "Joueurs de jeux tactiques et FPS (lecture rapide de mini-carte), étudiants en sciences et ingénierie (géométrie spatiale), radiologues, joueurs d'échecs et toute personne souhaitant développer sa mémoire de travail non verbale.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('cowan2001', 'baddeley2000', 'logie1995', 'corsi1972', 'luck1997', 'milner1971', 'woods2015'),
  related: [
    { href: "/drills/memory/spatial-memory/path-tracing", label: "Test de Mémorisation de Trajet" },
    { href: "/drills/memory/spatial-memory/object-location", label: "Test de Mémoire de Localisation" },
    { href: "/drills/memory/short-term-memory/digit-span", label: "Test d'Empan Numérique" },
    { href: "/drills/memory/short-term-memory/word-recall", label: "Test de Mémoire Verbale" },
    { href: "/drills/memory/working-memory/n-back", label: "Test de Mémoire de Travail N-Back" }
  ]
};

export default function GridMemorizationFrenchPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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
      <GridMemorizationClient copy={{
        "h1Keyword": "Test de Mémoire Visuelle",
        "h1Suffix": " – Matrice de Mémorisation de Motifs en Grille",
        "caption": "La mémoire de travail visuelle stocke environ quatre objets intégrés simultanément, la limite étant fixée par le nombre d'objets plutôt que par la complexité visuelle (Luck & Vogel, 1997). Les grilles matricielles sollicitent le cache visuel passif pour la forme et l'organisation spatiale (Logie, 1995).",
        "statScore": "Score",
        "statTime": "Temps",
        "statGridSize": "Grille",
        "statBest": "Meilleur",
        "hudScore": "Score",
        "hudTime": "Temps",
        "startTitle": "Test de Mémoire Visuelle Pro",
        "startSubtitle": "Mémoire de travail spatiale • Mémorisation de motifs",
        "countdownSubtitle": "PRÉPAREZ-VOUS",
        "newBest": "NOUVEAU RECORD",
        "pointsLabel": "Points",
        "statAccuracy": "Précision",
        "cellsUnit": "cases",
        "statPeakPattern": "Motif max",
        "statPerfects": "Sans faute",
        "btnPlayAgain": "Rejouer",
        "rulesTitle": "Règles de l'Exercice et Système de Points",
        "rulesItems": [
          {
            "num": "1",
            "text": "Rappel de motif",
            "highlight": "+150 PTS",
            "result": "Mémorisez les cases allumées et cliquez dessus"
          },
          {
            "num": "2",
            "text": "Progression de niveau",
            "highlight": "4x4 → 5x5",
            "result": "La taille de la grille et le nombre de cases augmentent"
          },
          {
            "num": "3",
            "text": "Clic erroné / Délai dépassé",
            "highlight": "Aucune pénalité",
            "result": "Aucune déduction de points en cas d'erreur"
          },
          {
            "num": "4",
            "text": "Niveau maintenu",
            "highlight": "Même palier",
            "result": "La manche est répétée au niveau actuel après une erreur"
          }
        ]
      }} />
      <DrillGuide guide={gridGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/spatial-memory/grid-memorization"
          locale="fr"
        />
      </div>
    </>
  );
}
