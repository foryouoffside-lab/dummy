import GridMemorizationClient from '@/app/drills/memory/spatial-memory/grid-memorization/GridMemorizationClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';

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
    "Le test de memoire visuelle sur grille matricielle evalue la capacite de stockage et de restitution du calepin visuo-spatial, l une des composantes centrales de la memoire de travail humaine. Contrairement aux tests verbaux reposant sur la boucle phonologique, cette epreuve isole la capacite du cerveau a encoder, comprimer et restituer des structures geometriques sans aide linguistique.",
    "Dans les recherches fondamentales de Steven Luck et Edward Vogel (1997), il a ete demontre que la memoire de travail visuelle possede une limite structurelle stricte d environ quatre objets integres simultanement. Cette restriction ne depend pas de la complexite d un objet individuel, mais du nombre total d unites distinctes (chunks) a maintenir sous l attention focale.",
    "Robert Logie (1995) a perfectionne cette theorie en divisant le calepin visuo-spatial en deux sous-systemes: le cache visuel passif (qui stocke la forme, la taille et la couleur) et le scribe interne actif (qui traite les deplacements et la planification motrice). Le present test s adresse specifiquement a la charge du cache visuel passif a travers des motifs statiques presentes brievement.",
    "En 1997 et 1999, Sergio Della Sala et ses collegues ont standardise le Visual Patterns Test (VPT) pour etablir des normes cliniques d empan visuel, demontrant que la performance depend fortement de l aptitude du sujet a decouvrir des symetries et a effectuer du regroupement spatial (chunking).",
    "Mesure et precision: chaque interaction est chronometree via l horloge haute resolution performance.now() du navigateur. A l instar de tous les outils numeriques modernes, les mesures sont discretisees par le taux de rafraichissement de l ecran (16,7 ms a 60 Hz). Comparez vos progres sur le meme materiel pour une analyse de retention optimale.",
    "SkillDrills applique une confidentialite absolue: aucun score ni donnee personnelle n est transfere vers nos serveurs. Vos resultats restent stockes exclusivement dans votre navigateur via localStorage, et chaque reference scientifique provient d etudes evaluees par des pairs."
  ],
  benchmarks: {
    title: "Paliers de Référence de la Mémoire Visuo-Spatiale",
    headers: ["Palier de Performance", "Cases Mémorisées (Empan)", "Précision Matricielle", "Profil Neurocognitif & Stratégie de Chunking"],
    rows: [
      ["Palier 1 : Maître", "14+ cases", "≥ 90 % sans erreur", "Empan d élite : chunking géométrique complexe et vision globale instantanée."],
      ["Palier 2 : Avancé", "11–13 cases", "75 % – 89 % de précision", "Rétention supra-normale : décomposition en sous-matrices symétriques."],
      ["Palier 3 : Compétent", "8–10 cases", "60 % – 74 % de précision", "Capacité supérieure : regroupement en lignes et en blocs réguliers."],
      ["Palier 4 : En développement", "5–7 cases", "45 % – 59 % de précision", "Niveau moyen standard : application du modèle de base de Luck & Vogel."],
      ["Palier 5 : Débutant", "1–4 cases", "< 45 % de précision", "Sensibilité à la surcharge visuelle et mémorisation isolée case par case."]
    ],
    note: "Ces valeurs constituent des reperes cognitifs et d entrainement perceptif sur navigateur web; elles ne se substituent pas a un diagnostic neuropsychologique formel."
  }
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
