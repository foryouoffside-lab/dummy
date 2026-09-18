import DynamicGridEvasionClient from '@/app/drills/physical/coordination/dynamic-grid-evasion/DynamicGridEvasionClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';

// ============================================================
// RECHERCHE DE MOTS-CLÉS NATIFS (SERP FRANCE / FR-FR)
// Requêtes à forte intention et faible concurrence :
// - "jeu d'esquive à la souris en ligne" (Requête dominante gaming réflexe)
// - "test de vision périphérique en ligne gratuit" (Évaluation visuelle et cognitive)
// - "jeu d'esquive de zone réflexe" (Entraînement à la détection spatiale)
// - "entraînement aux réflexes spatiaux" (Neuro-motricité appliquée)
// - "esquiver les sorts jeu d'entraînement" / "esquive skillshot" (eSports / MOBA / FPS)
// - "test d'attention visuelle et de détection périphérique" (Mesure psychologique)
// - "jeu de rapidité et d'évitement souris" (Recherche ludique sur navigateur)
// - "réflexe d'évitement et coordination visuelle" (Capacité psychomotrice)
// ============================================================

export const metadata = {
  title: "Jeu d'Esquive Souris – Vision Périphérique | SkillDrills",
  description: "Jeu d'esquive à la souris gratuit en ligne. Détectez les zones d'explosion sur la grille 3x3 et fuyez vers les cases sûres pour booster vos réflexes.",
  keywords: [
    "jeu d'esquive a la souris en ligne",
    "test de vision peripherique en ligne gratuit",
    "jeu d'esquive de zone reflexe",
    "entrainement aux reflexes spatiaux",
    "esquiver les sorts jeu d'entrainement",
    "test d'attention visuelle et de detection peripherique",
    "jeu de rapidite et d'evitement souris",
    "reflexe d'evitement et coordination visuelle",
    "esquive skillshots",
    "reflexes souris entrainement"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/physical/coordination/dynamic-grid-evasion',
    languages: getAlternateLanguages('/drills/physical/coordination/dynamic-grid-evasion'),
  },
  openGraph: {
    title: "Jeu d'Esquive Souris – Vision Périphérique | SkillDrills",
    description: "Jeu d'esquive à la souris gratuit en ligne. Détectez les zones d'explosion sur la grille 3x3 et fuyez vers les cases sûres pour booster vos réflexes.",
    url: 'https://skilldrills.online/fr/drills/physical/coordination/dynamic-grid-evasion',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Jeu d'Esquive Souris – Vision Périphérique | SkillDrills",
    description: "Jeu d'esquive à la souris gratuit en ligne. Détectez les zones d'explosion sur la grille 3x3 et fuyez vers les cases sûres pour booster vos réflexes.",
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
      "name": "Entraînement Physique",
      "item": "https://skilldrills.online/fr/drills/physical"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Coordination Motrice",
      "item": "https://skilldrills.online/fr/drills/physical/coordination"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Jeu d'Esquive à la Souris & Vision Périphérique",
      "item": "https://skilldrills.online/fr/drills/physical/coordination/dynamic-grid-evasion"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Jeu d'Esquive à la Souris et Vision Périphérique",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Outil neurocognitif d'évaluation des réflexes spatiaux, du balayage périphérique et de l'évitement rapide sur une grille 3x3 sous contrainte temporelle.",
  "url": "https://skilldrills.online/fr/drills/physical/coordination/dynamic-grid-evasion",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online/fr"
  },
  "inLanguage": "fr-FR",
  "dateModified": "2026-09-12"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Entraîneur d'Évitement et Réflexes Spatiaux",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Navigateur moderne supportant HTML5 Canvas et Pointer Lock API",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/fr/drills/physical/coordination/dynamic-grid-evasion",
  "inLanguage": "fr-FR",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Jeu d'Évitement sur Grille Dynamique (Dynamic Grid Evasion)",
  "url": "https://skilldrills.online/fr/drills/physical/coordination/dynamic-grid-evasion",
  "description": "Exercice intensif d'évitement d'explosions sur une matrice 3x3 pour aiguiser la vision périphérique et la vivacité de réaction dans les jeux compétitifs.",
  "genre": [
    "Coordination Drill",
    "Reflex Training",
    "Spatial Awareness",
    "Action"
  ],
  "gamePlatform": [
    "Web Browser",
    "Desktop",
    "Mobile"
  ],
  "applicationCategory": "Game",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-12",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quel est le principe du test d'esquive et de vision périphérique sur la grille 3x3 ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L'écran est fractionné en 9 cases tactiques. Des impulsions ambrées signalent des détonations imminentes dans plusieurs secteurs. L'utilisateur doit conserver un regard panoramique, repérer via sa vision périphérique les cases restant inactives et y projeter son curseur avant l'explosion rouge."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi une fixation visuelle au centre est-elle plus efficace qu'un balayage case par case ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "D'après la théorie de l'intégration des attributs d'Anne Treisman (1980), le traitement pré-attentionnel traite les contrastes lumineux de manière parallèle et instantanée. Inspecter les cases de façon séquentielle créerait un encombrement cognitif insurmontable lorsque le délai d'alerte tombe à 0,45 seconde."
      }
    },
    {
      "@type": "Question",
      "name": "De quelle façon cet entraînement aide-t-il à esquiver les sorts et capacités dans LoL, Valorant ou CS2 ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En situation de tournoi, les capacités de zone (cocktails Molotov, grenades, ultimes) et les skillshots exigent une manœuvre d'évitement réflexe sans perdre l'orientation du combat. Cet exercice automatise l'attention exogène de Posner, permettant d'esquiver les menaces périphériques par pur réflexe moteur."
      }
    },
    {
      "@type": "Question",
      "name": "Comment s'accentuent la contrainte temporelle et le nombre de cases dangereuses au fil des 15 niveaux ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le niveau s'élève tous les 250 points. Le délai d'avertissement se comprime graduellement de 1,4 seconde au niveau 1 jusqu'à seulement 0,45 seconde aux niveaux 12 à 15, tandis que le nombre de zones compromises monte de 3 jusqu'à 7 cases simultanées, ne laissant que 2 refuges sécurisés."
      }
    },
    {
      "@type": "Question",
      "name": "Subir une détonation fait-il perdre des points ou réduit-il la durée de l'exercice ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aucun point acquis n'est retranché et le chronomètre de 45 secondes ne subit aucun raccourcissement. En revanche, être surpris dans une zone rouge remet immédiatement le multiplicateur de série à 1.0x, stimulant des décisions vives et sans hésitation."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la cinématique motrice optimale pour immobiliser le curseur au sein de la zone refuge ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "On met en pratique le modèle biphasique de Robert Woodworth (1899) : un flick balistique très rapide vers la case sécurisée complété par un freinage instantané obtenu en exerçant une légère pression verticale de la pulpe des doigts et de la paume sur le tapis de souris pour absorber l'inertie."
      }
    },
    {
      "@type": "Question",
      "name": "En quoi le réglage de la sensibilité souris influence-t-il la survie lors des paliers experts ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Une sensibilité trop basse nécessite des mouvements de bras d'une grande amplitude qui gaspillent la fenêtre critique de 0,45s. Une sensibilité intermédiaire bien équilibrée (28 à 38 cm par tour de 360°) permet d'enchaîner les transitions d'une case à l'autre par de courtes impulsions du poignet et des doigts."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle ligne de conduite permet d'excéder les 17 000 points pour décrocher le titre Apex Grid Evader ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La clé réside dans le maintien d'une vision périphérique ouverte au centre exact de la grille 3x3 et l'adoption systématique du refuge sécurisé adjacent le plus immédiat. Conserver le multiplicateur maximum de 3.0x de manière ininterrompue pendant les 45 secondes garantit le score d'élite."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la nuance fondamentale entre attention endogène et exogène lors de ce drill ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Selon Michael Posner (1980), l'attention endogène est volontaire et nécessite environ 300ms, tandis que l'attention exogène est automatique et déclenchée par des éclairs visuels en 100 à 150ms. Cet entraînement conditionne le réflexe exogène face à l'apparition des bordures ambrées."
      }
    },
    {
      "@type": "Question",
      "name": "L'exercice nécessite-t-il le moindre téléchargement ou l'enregistrement de données personnelles ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aucune installation n'est requise. L'ensemble des calculs cinématiques s'exécute localement dans le navigateur grâce à HTML5 Canvas et l'API haute fidélité performance.now(). Vos records et bilans statistiques demeurent rigoureusement stockés dans la mémoire de votre navigateur (LocalStorage)."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Protocole d'Exécution du Test d'Évitement sur Grille et Réflexes Spatiaux",
  "description": "Guide en 4 étapes pour surveiller la grille 3x3, identifier les secteurs sécurisés et éviter les détonations.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Positionnement Médian et Focale Décentralisée",
      "text": "Placez le curseur au centre de la grille 3x3 et adoptez un regard ouvert englobant la totalité des 9 compartiments.",
      "url": "https://skilldrills.online/fr/drills/physical/coordination/dynamic-grid-evasion#etape-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Détection Périphérique des Lignes d'Avertissement",
      "text": "Repérez instantanément par vision périphérique les cases qui ne clignotent pas en ambre et constituent des zones sûres.",
      "url": "https://skilldrills.online/fr/drills/physical/coordination/dynamic-grid-evasion#etape-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Flick Balistique et Verrouillage en Zone Sûre",
      "text": "Projettez le curseur vers le secteur sécurisé le plus accessible avant la fin du décompte et l'explosion rouge.",
      "url": "https://skilldrills.online/fr/drills/physical/coordination/dynamic-grid-evasion#etape-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Maintien de Série et Prolongation du Combo 3.0x",
      "text": "Enchaînez les évitements consécutifs pour stabiliser le multiplicateur à 3.0x et maximiser votre résultat sur 45 secondes.",
      "url": "https://skilldrills.online/fr/drills/physical/coordination/dynamic-grid-evasion#etape-4"
    }
  ]
};

const gridGuide = {
  heading: "Fondements Neurocognitifs : Attention Spatiale et Évitement Réflexe Périphérique",
  subtitle: "Théorie de Treisman, paradigme d'orientation de Posner et freinage de Woodworth appliqués à la réactivité",
  intro: [
    "L'exercice d'évitement sur grille dynamique (Dynamic Grid Evasion) place le système visuo-moteur sous une haute densité de contraintes temporelles. Au lieu d'effectuer le suivi d'une cible isolée, l'exécutant doit surveiller en continu 9 compartiments tactiques au sein d'une matrice 3x3, décoder en une fraction de seconde quelles cases vont exploser et engager une trajectoire de fuite balistique vers une zone préservée.",
    "La chercheuse en psychologie cognitive Anne Treisman et Garry Gelade (1980), dans leur célèbre Théorie de l'Intégration des Attributs, ont démontré que les caractéristiques visuelles primaires saillantes (clignotements, ruptures chromatiques) sont extraites en parallèle au stade pré-attentionnel par le cortex visuel. En fixant paisiblement le centre de la grille, la rétine périphérique met à contribution ses cellules magnocellulaires, ce qui permet de capter l'état des 9 compartiments d'un seul coup d'œil sans mouvements oculaires saccadiques lents.",
    "Ce modèle est corroboré par les travaux pionniers de Michael Posner (1980) sur l'orientation de l'attention spatiale dissimulée (covert attention). Lorsque la session atteint les niveaux 12 à 15, la fenêtre de réaction s'amenuise de 1,4 seconde à un éclair de 0,45 seconde tandis que 7 cases sur 9 deviennent explosives. Dans ces circonstances extrêmes, la commande motrice s'organise selon le modèle en deux phases de Robert Woodworth (1899) : une accélération balistique initiale fulgurante suivie d'un freinage micrométrique par frottement digital sur le tapis.",
    "Précision d'échantillonnage et latence d'affichage : Ce test tourne intégralement sur la machine cliente via l'API performance.now() à une résolution inférieure à la milliseconde. La latence globale observée dépend du taux de rafraîchissement de votre écran (60Hz = 16,6ms ; 144Hz = 6,9ms ; 240Hz = 4,1ms) et de la fréquence de rapport de la souris. Les fluctuations sous 5ms correspondent aux tolérances matérielles usuelles."
  ],
  benchmarks: {
    title: "Grille d'Évaluation et Niveaux d'Évitement Spatial (5 Paliers)",
    headers: ["Palier / Rang", "Titre de Maîtrise", "Score Requis", "Niveau Atteint", "Délai d'Alerte Maîtrisé", "Profil Neurofonctionnel d'Évitement"],
    rows: [
      ["Tier 1: Évacuateur Apex Suprême", "Apex Grid Evader", "17 000+ points", "Niveau 12 – 15", "0,45 – 0,60 s d'alerte", "Extraction périphérique parallèle d'élite (top 0,1 %) ; flicks balistiques parfaits vers les zones libres sous 7 menaces actives (Treisman 1980 ; Posner 1980)"],
      ["Tier 2: Maître du Balayage Spatial", "Master Spatial Scanner", "13 000 – 16 999 pts", "Niveau 9 – 11", "0,65 – 0,80 s d'alerte", "Remarquable attention exogène de Posner ; évitement fluide face à 5 ou 6 détonations avec contrôle de décélération de Woodworth"],
      ["Tier 3: Évitateur Tactique Confirmé", "Proficient Hazard Dodger", "9 500 – 12 999 pts", "Niveau 6 – 8", "0,85 – 1,05 s d'alerte", "Très bon niveau pour le tir compétitif ; prise de décision instantanée et friction bien dosée sur le tapis"],
      ["Tier 4: Rescapé de Secteur Moyen", "Intermediate Sector Evader", "6 000 – 9 499 pts", "Niveau 3 – 5", "1,10 – 1,25 s d'alerte", "Moyenne fonctionnelle standard ; ruptures de série causées par une vision tunnel lorsque le délai descend sous 1,0 seconde"],
      ["Tier 5: Apprenti Évacuateur Novice", "Novice Blast Survivor", "< 6 000 points", "Niveau 1 – 2", "> 1,25 s d'alerte", "Difficulté à appréhender la périphérie du regard ; tendance à fixer un seul secteur et à dépasser les limites de la case sûre"]
    ],
    note: "Paliers définis à partir de la Théorie de l'Intégration des Attributs (Treisman & Gelade 1980), des études d'attention spatiale de Posner (1980) et du modèle moteur de Woodworth (1899)."
  },
  techniques: {
    title: "Protocoles Pratiques pour Développer la Vision Périphérique et l'Évitement sur Grille",
    items: [
      {
        name: "Fixation Décentralisée au Centroïde de la Matrice (Treisman Decentralized Fixation)",
        desc: "Maintenez le regard détendu au centre géométrique de la grille 3x3 sans vous focaliser sur une cellule en particulier. Ouvrez votre champ visuel périphérique afin que la rétine capte l'éclat ambré simultanément sur l'ensemble des zones.",
        tips: "Ne suivez pas le curseur des yeux ; fiez-vous au guidage proprioceptif de votre bras pour orienter le pointeur vers la zone dégagée."
      },
      {
        name: "Déclenchement Exogène Réflexe de Posner (Exogenous Attention Trigger)",
        desc: "Mettez à profit l'orientation exogène établie par Posner (1980). Plutôt que de réfléchir activement à l'emplacement du danger, déplacez la main de manière réflexe vers le compartiment resté sombre et sans clignotement.",
        tips: "L'absence d'éclairage ambré constitue votre feu vert pour une évacuation instantanée."
      },
      {
        name: "Flick Balistique et Freinage par Friction de Woodworth (Boundary Deceleration)",
        desc: "Amorcez le déplacement à vitesse balistique maximale puis appuyez légèrement la tranche de la paume et l'auriculaire contre le tapis au moment de pénétrer dans la case cible.",
        tips: "Ce contact freine net le curseur et empêche tout dérapage hors du périmètre sécurisé."
      },
      {
        name: "Règle de Fuite vers la Case Sécurisée la Plus Proche (Nearest Safe Sector Rule)",
        desc: "Dans les derniers niveaux où 7 cases détonent à un rythme effréné de 0,45s, vouloir choisir la zone 'idéale' provoque un temps d'arrêt fatal.",
        tips: "Fuyez sans la moindre hésitation vers le compartiment libre le plus proche de votre curseur (horizontal, vertical ou diagonal immédiat)."
      }
    ]
  },
  steps: [
    "Installez-vous confortablement et positionnez le pointeur au centre de la grille 3x3.",
    "Gardez les yeux détendus au centre afin de surveiller les signaux lumineux par vision périphérique.",
    "Glissez promptement le curseur vers la case sûre la plus proche avant l'explosion rouge.",
    "Maintenez le combo 3.0x sans interruption pour décrocher le rang Apex au bout des 45 secondes."
  ]
};

export default function DynamicGridEvasionPageFr() {
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
      <DynamicGridEvasionClient
        copy={{
          title: "Jeu d'Esquive à la Souris & Vision Périphérique",
          subtitle: "Évitement Dynamique sur Grille 3x3 & Réflexes Spatiaux • 15 Niveaux",
          hudLabels: {
            score: "Score",
            timeLeft: "Temps Restant",
            bestScore: "Meilleur Score",
            bestCombo: "Meilleur Combo"
          },
          rulesTitle: "Règles du Test d'Évitement et Barème de Points",
          rules: [
            { title: "Évitement des Zones Dangereuses", text: "Dirigez le réticule vers les cases sécurisées avant que les bordures ambrées n'explosent en rouge." },
            { title: "Multiplicateur de Série", text: "Survivez à plusieurs vagues consécutives sans dégât pour élever le combo jusqu'à 3.0x." },
            { title: "Montée en Difficulté", text: "Tous les 250 points le niveau augmente, réduisant le délai d'avertissement de 1,4s à 0,45s et imposant jusqu'à 7 zones dangereuses." },
            { title: "Impact d'une Détonation", text: "Être touché par une détonation ramène le combo à 1.0x sans la moindre déduction de score." }
          ],
          aboutTitle: "À Propos de l'Entraînement d'Évitement sur Grille",
          aboutHeading: "Attention Spatiale Périphérique et Évitement Balistique des Dangers",
          aboutText: "Cet exercice repose sur la Théorie de l'Intégration des Attributs d'Anne Treisman (1980) et sur le Paradigme d'Orientation Spatiale de Michael Posner (1980). La configuration sur matrice 3x3 stimule la vision périphérique et développe des réactions de dégagement indispensables pour échapper aux zones d'effet (AOE), tirs de suppression et grenades dans les jeux compétitifs.",
          aboutCards: [
            {
              title: "Public Visé",
              desc: "Joueurs de FPS et de MOBA désireux de fluidifier l'esquive des sorts de zone et tirs ennemis, et toute personne cherchant à aiguiser ses réflexes spatiaux."
            },
            {
              title: "Aptitudes Développées",
              desc: "Balayage visuel parallèle, attention exogène réflexe, réduction du temps de réaction de choix et maîtrise du freinage moteur."
            },
            {
              title: "Vision Périphérique",
              desc: "La focalisation au centre de la grille combat la vision en tunnel et développe une perception spatiale panoramique à 360 degrés."
            }
          ]
        }}
      />
      <DrillGuide guide={gridGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="physical"
          currentHref="/drills/physical/coordination/dynamic-grid-evasion"
          locale="fr"
        />
      </div>
    </>
  );
}
