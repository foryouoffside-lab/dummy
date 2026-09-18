import ObjectLocationClient from '@/app/drills/memory/spatial-memory/object-location/ObjectLocationClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';

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
    "La memoire de localisation d objets (Object Location Memory - OLM) constitue un sous-domaine fondamental de la cognition spatiale. Elle quantifie l aptitude du systeme nerveux a encoder simultanement deux flux d informations distincts: l identite visuelle d un symbole et ses coordonnees matricielles precises.",
    "La theorie fondatrice d Irwin Silverman et Marion Eals (1992, 1994) a mis en evidence que le rappel de positions spatiales relatives d objets statiques constitue un mecanisme specialise, evolutivement dissocie des epreuves de rotation mentale 3D ou d orientation dynamique.",
    "Sur le plan neuro-anatomique, cette performance exige l integration des deux courants visuels decrits par Ungerleider et Mishkin (1982) et Goodale et Milner (1992): la voie ventrale (qui identifie 'ce que' sont les objets) et la voie dorsale (qui determine 'ou' ils se situent). La liaison de ces caracteristiques s opere au sein du reseau parieto-hippocampique.",
    "Steven Luck et Edward Vogel (1997) ont demontre que la memoire de travail visuelle presente une capacite finie d environ quatre unites integrees. Lorsque la taille de la matrice augmente de 3x3 a 7x7, la reussite depend etroitement du developpement de reperes spatiaux allocentriques et egocentriques efficaces.",
    "Chronometrie et fidelite des mesures: les clics et le temps de reponse sont enregistres au moyen de l horloge performance.now() integree a votre navigateur. Les ecrans conventionnels a 60 Hz rafraichissent l affichage toutes les 16,7 ms. Pour evaluer vos gains reels, effectuez vos series d entrainement dans des conditions techniques comparables.",
    "Transparence et respect de la vie privee: SkillDrills n envoie aucune donnee d evaluation vers des serveurs distants. Votre progression est stockee localement sur votre terminal (localStorage). Cet outil constitue un banc d essai cognitif destine a l entrainement intellectuel et non a un bilan clinique."
  ],
  benchmarks: {
    title: "Paliers de Référence : Empan et Rétention Spatiale",
    headers: ["Palier de Performance", "Taille de Grille", "Précision de Localisation", "Profil Neurocognitif & Liaison Spatiale"],
    rows: [
      ["Palier 1 : Maître", "Grille 6x6 – 7x7", "≥ 90 % de réussite", "Liaison spatiale d élite : cartographie mentale instantanée et ancrage par quadrants."],
      ["Palier 2 : Avancé", "Grille 5x5 – 6x6", "75 % – 89 % de précision", "Haute rétention : structuration géométrique rapide et dissociation des distracteurs."],
      ["Palier 3 : Compétent", "Grille 4x4 – 5x5", "60 % – 74 % de précision", "Capacité solide : maintien fiable de 4 à 5 liaisons objets-positions simultanées."],
      ["Palier 4 : En développement", "Grille 3x3 – 4x4", "45 % – 59 % de précision", "Niveau moyen standard : application du seuil de base de Luck & Vogel."],
      ["Palier 5 : Débutant", "Grille 3x3", "< 45 % de précision", "Vulnérabilité à l interférence visuelle et perte des coordonnées cibles."]
    ],
    note: "Ces reperes de performance ont ete etablis sur la base d exercices cognitifs interactifs; ils sont fournis a titre indicatif et ne remplacent pas une expertise neuropsychologique."
  }
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
