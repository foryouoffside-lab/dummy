import PathTracingClient from '@/app/drills/memory/spatial-memory/path-tracing/PathTracingClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test des Blocs de Corsi – Mémoire Séquentielle | SkillDrills",
  description: "Test des blocs de corsi en ligne gratuit: Memorisez les trajectoires animees sur grille et reproduisez les sequences dans l ordre exact sans inscription.",
  keywords: [
    "test des blocs de corsi",
    "test memoire sequentielle visuelle",
    "test empan de corsi en ligne",
    "memoire de travail viso-spatiale",
    "exercice path tracing gratuit",
    "test de trajectoire spatiale",
    "scribe interne memoire test",
    "reproduction de sequence motrice",
    "evaluation memoire spatio-temporelle",
    "jeu memoire de parcours en ligne",
    "test neuropsychologique de corsi",
    "entrainement memoire visuo-motrice"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/memory/spatial-memory/path-tracing",
    languages: getAlternateLanguages('/drills/memory/spatial-memory/path-tracing'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Test des Blocs de Corsi – Mémoire Séquentielle | SkillDrills",
    description: "Test des blocs de corsi en ligne gratuit: Memorisez les trajectoires animees sur grille et reproduisez les sequences dans l ordre exact sans inscription.",
    url: "https://skilldrills.online/fr/drills/memory/spatial-memory/path-tracing",
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test des Blocs de Corsi – Mémoire Séquentielle | SkillDrills",
    description: "Test des blocs de corsi en ligne gratuit: Memorisez les trajectoires animees sur grille et reproduisez les sequences dans l ordre exact sans inscription.",
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
      "name": "Test des Blocs de Corsi",
      "item": "https://skilldrills.online/fr/drills/memory/spatial-memory/path-tracing"
    }
  ]
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test des Blocs de Corsi (Mémoire Séquentielle)",
  "url": "https://skilldrills.online/fr/drills/memory/spatial-memory/path-tracing",
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
  "name": "Test des Blocs de Corsi (Mémoire Séquentielle)",
  "url": "https://skilldrills.online/fr/drills/memory/spatial-memory/path-tracing",
  "description": "Test interactif mesurant l empan spatial de Corsi, la retention de trajectoires et la memoire visuo-motrice sequentielle.",
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
  "name": "Test des Blocs de Corsi (Mémoire Séquentielle)",
  "url": "https://skilldrills.online/fr/drills/memory/spatial-memory/path-tracing",
  "description": "Jeu cognitif mesurant la capacite a reproduire des parcours spatiaux animes de difficulte croissante sur grille dynamique.",
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
  "name": "Comment s entrainer a la memoire sequentielle de Corsi",
  "description": "Methode en 4 etapes pour encoder les trajectoires spatiales et reproduire des suites de clics sans hesitation.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/fr/drills/memory/spatial-memory/path-tracing#step-1",
      "name": "Suivre le point lumineux des yeux",
      "text": "Fixez chaque activation lumineuse sans bouger la souris pour capturer le rythme et l orientation de la trajectoire."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/fr/drills/memory/spatial-memory/path-tracing#step-2",
      "name": "Encoder les vecteurs directionnels",
      "text": "Traduisez les deplacements successifs en vecteurs mentaux continus (ex: haut-droite, diagonale bas, gauche) pour former une ligne unifiee."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/fr/drills/memory/spatial-memory/path-tracing#step-3",
      "name": "Rejouer le parcours mentalement",
      "text": "Pendant la courte pause avant votre tour, faites defiler mentalement le chemin dans le scribe interne visuo-spatial."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/fr/drills/memory/spatial-memory/path-tracing#step-4",
      "name": "Cliquer dans l ordre chronologique",
      "text": "Reproduisez methodiquement la serie de blocs dans le meme ordre temporel pour valider le niveau et etendre votre empan."
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
      "name": "Qu est-ce que le test des blocs de Corsi et le Path Tracing ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Concu a l origine par Philip M. Corsi en 1972 a l Universite McGill, ce test neuropsychologique evalue la memoire de travail visuo-spatiale sequentielle en mesurant la plus longue suite d emplacements qu un individu peut reproduire dans l ordre exact."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la valeur normale de l empan spatial de Corsi chez l adulte ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Selon les etalonnages cliniques de Kessels et al. (2000, 2008), l empan moyen chez l adulte sain se situe entre 5 et 6 blocs (environ 5,4 ± 0,8). Un score de 7 ou plus reflete une excellente capacite de retention sequentielle."
      }
    },
    {
      "@type": "Question",
      "name": "En quoi le test de Corsi differe-t-il de l empan de chiffres ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L empan de chiffres sollicite la boucle phonologique verbale (hemisphere gauche), tandis que le test des blocs de Corsi engage activement le calepin visuo-spatial et l hemisphere droit, sans mediation linguistique obligatoire."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le role du scribe interne selon le modele de Logie ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Robert Logie (1995) a demontre que le scribe interne est le mecanisme de repetition actif de la memoire spatiale: il rafraichit continuellement les coordonnees motrices et la sequence des deplacements pour eviter l estompement de la trace mnesique."
      }
    },
    {
      "@type": "Question",
      "name": "Quelles sont les bases neurologiques de la memoire spatiale sequentielle ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les recherches de Milner (1971) et les etudes d imagerie moderne demontrent que le test de Corsi recrute l hippocampe droit, le lobe temporal median et le cortex prefrontal dorsolateral droit responsable de l ordonnancement temporel."
      }
    },
    {
      "@type": "Question",
      "name": "Comment le chunking vectoriel permet-il d augmenter son empan ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Plutot que de memoriser des cases separees, le chunking vectoriel relie les etapes en segments geometriques (formes en Z, triangles ou lignes droites), condensant plusieurs cibles en un trace continu unique."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi l empan arriere est-il plus difficile que l empan direct ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reproduire la trajectoire en sens inverse exige d inverser l ordre temporel stocke tout en maintenant les positions spatiales, sollicitant fortement les fonctions executives et le controle inhibiteur prefrontal."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est l impact de la fatigue sur la precision sequentielle ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La fatigue mentale degrade l attention soutenue necessaire pour suivre les transitions de cibles, entrainant des omissions d etapes intermediaires et une reduction moyenne de l empan de 1 a 2 unites."
      }
    },
    {
      "@type": "Question",
      "name": "L entrainement de Corsi aide-t-il dans les jeux video et le sport ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, memoriser des patterns de deplacement, anticiper les rotations d adversaires et executer des sequences motrices complexes constituent des facteurs cles de succes en e-sport et dans les sports collectifs rapides."
      }
    },
    {
      "@type": "Question",
      "name": "Ce test des blocs de Corsi en ligne est-il gratuit ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, le test des blocs de Corsi SkillDrills est 100% gratuit, fonctionne de maniere fluide sur ordinateur et mobile sans enregistrement requis, et calcule automatiquement votre empan spatial."
      }
    }
  ]
};

const pathTracingGuide = {
  heading: "Guide Scientifique : Test des Blocs de Corsi & Mémoire Séquentielle",
  intro: [
    "Le test de mémoire de trajectoire spatiale (Path Tracing / Blocs de Corsi) évalue la mémoire de travail visuo-spatiale séquentielle, la rétention d'itinéraires dynamiques et la reconstruction vectorielle à travers des matrices évolutives de 3x3 à 7x7. Ancré dans le paradigme neuropsychologique historique des blocs de Corsi (Milner, 1971 ; Corsi, 1972) et le modèle du « scribe interne » de Robert H. Logie (1995), ce test isole l'encodage spatio-temporel actif du stockage passif de motifs statiques.",
    "Durant chaque manche, une cible animée illumine une série de coordonnées matricielles à intervalles calibrés de 500 ms. L'utilisateur doit encoder à la fois les coordonnées spatiales et l'ordre chronologique strict, puis retracer fidèlement la trajectoire complète durant la fenêtre d'évaluation de 45 secondes.",
    "Dans l'architecture cognitive de la mémoire de travail, Logie (1995) et Alan Baddeley (2000) ont établi que les mouvements séquentiels sont répétés et maintenus par le scribe interne, boucle de répétition spatiale active. George A. Miller (1956) et Herbert A. Simon (1974) ont prouvé que la rétention séquentielle repose sur le regroupement vectoriel directionnel (chunking), tandis que Nelson Cowan (2001) a formalisé que la mémoire focale humaine est bornée à environ 4 unités d'information non assistées.",
    "Les études normatives standardisées sur tâches de Corsi informatisées (Kessels et al., 2000) situent l'empan spatial moyen de l'adulte sain à 5,4 ± 0,9 étapes, démontrant une forte sensibilité à la fatigue cognitive, au sommeil et aux fonctions exécutives préfrontales.",
    "Méthodologie de mesure : chaque étape est horodatée avec l'horloge haute résolution performance.now() de votre navigateur, directement sur votre appareil — aucune donnée n'est téléversée vers un serveur distant. Les minuteurs des navigateurs sont volontairement discrétisés face aux vulnérabilités matérielles (de l'ordre de 1 ms), et l'affichage quantifie chaque transition à l'intervalle de rafraîchissement d'écran (environ 16,7 ms par trame à 60 Hz ; Woods et al., 2015). Les variations inférieures à 5 ms relèvent du bruit expérimental ; pour évaluer vos progrès réels, préservez le même matériel.",
    "Transparence et respect de la vie privée : SkillDrills ne collecte aucune donnée agrégée. Vos scores et préférences demeurent exclusivement enregistrés dans le localStorage de votre navigateur web, garantissant qu'aucune moyenne globale ni profil d'utilisateur n'est diffusé. Toutes les références numériques et scientifiques mentionnées ici proviennent directement des publications scientifiques évaluées par des pairs répertoriées ci-dessous.",
    "Cet entraînement est une application interactive sur navigateur destinée à l'entraînement cognitif personnel et à l'intérêt pédagogique. Il ne constitue pas un dispositif médical, un outil de diagnostic neuropsychologique formel, ni un protocole de dépistage clinique pour les troubles de la mémoire, le TDAH ou les déficits exécutifs. En cas de préoccupation médicale sur vos capacités cognitives, consultez un neuropsychologue ou un médecin qualifié."
  ],
  benchmarks: {
    title: "Paliers Normatifs de l'Empan Séquentiel de Trajectoire Spatiale",
    headers: ["Palier de Performance", "Empan & Échelle de Grille", "Score à l'Exercice", "Profil Cognitif & Rétention de Trajectoire"],
    rows: [
      ["Palier 1 (Supérieur / 99e Percentile)", "Empan 10 – 14+ étapes (grille 6x6–7x7)", "1 200+ points", "Élite séquentielle visuo-spatiale ; décomposition des parcours complexes en 2–3 macro-vecteurs directionnels ; mémorisation parfaite dans le scribe interne ; cadence de clic sub-400 ms."],
      ["Palier 2 (Moyenne Supérieure / 85e–95e Percentile)", "Empan 8 – 9 étapes (grille 5x5–6x6)", "900 – 1 199 points", "Dépassement net des moyennes adultes standards ; groupement vectoriel robuste (virages en L, diagonales, zigzags) ; résistance aux interférences sérielles ; cadence 400 – 600 ms."],
      ["Palier 3 (Moyenne Adulte Standard / 50e Percentile)", "Empan 5 – 7 étapes (grille 4x4–5x5)", "600 – 899 points", "Norme adulte saine (Corsi, 1972 ; Kessels et al., 2000, empan 5,4 ± 0,9) ; rétention fluide de séquences de 5–6 étapes ; perte des points de virage intermédiaires sur grilles 5x5 ; cadence 600 – 850 ms."],
      ["Palier 4 (Moyenne Inférieure / Dégradation Sérielle)", "Empan 4 étapes (grille 3x3–4x4)", "400 – 599 points", "Proche de la limite brute sans chunking (Cowan, 2001) ; tentative de mémoriser chaque coordonnée isolément sans regrouper les vecteurs ; cadence 850 – 1 100 ms."],
      ["Palier 5 (En Développement / Empan Restreint)", "Empan < 4 étapes (grille 3x3)", "< 400 points", "Dégradation temporelle rapide de la trace ; vulnérabilité aux inversions d'ordre séquentiel ; difficulté à maintenir plus de 3 étapes après le délai de rétention ; cadence supérieure à 1 100 ms."]
    ],
    note: "La longueur de l'empan et la dimension de la grille reflètent le niveau maximal validé durant la session de 45 secondes ; percentiles normatifs calibrés sur les standards des Blocs de Corsi (Corsi, 1972 ; Kessels et al., 2000 ; Woods et al., 2015)."
  },
  techniques: {
    title: "Protocoles Scientifiques pour Développer la Mémoire de Trajectoire",
    items: [
      {
        name: "Chunking Vectoriel Directionnel (Miller 1956 ; Simon 1974)",
        desc: "Regroupez mentalement les étapes séquentielles isolées en macro-vecteurs de direction. Par exemple, au lieu de mémoriser 5 coordonnées distinctes, encodez le trajet comme « deux cases à droite, une case en haut, deux cases à gauche ». Cette compression vectorielle réduit la charge mnésique brute de plus de 60 %.",
        tips: "Identifiez des formes géométriques telles que des virages en L, des triangles ou des escaliers plutôt que des points individuels."
      },
      {
        name: "Pré-Planification Kinésique du Scribe Interne (Logie 1995)",
        desc: "Mobilisez le cortex moteur dès la présentation du stimulus en traçant mentalement la ligne continue reliant les cases illuminées. Pré-activer les circuits de planification motrice renforce les traces visuelles passives par une répétition kinesthésique active.",
        tips: "Ressentez le geste dans votre main avant même d'entrer en contact avec l'écran."
      },
      {
        name: "Ancrage Parafovéal sur le Centroïde de la Grille",
        desc: "Fixez votre regard au centre géométrique de la matrice plutôt que d'effectuer des saccades oculaires précipitées sur chaque case allumée. La vision parafovéale enregistre fidèlement le vecteur de mouvement sans subir la latence de suppression saccadique.",
        tips: "Gardez la tête et les yeux stables pour laisser les flashs lumineux s'imprimer dans l'ensemble de votre champ visuel."
      },
      {
        name: "Cadence et Rythme Moteur Fluide",
        desc: "Restituez la trajectoire enregistrée avec une frappe régulière et rythmée. Hésiter entre les clics favorise l'oubli temporel des étapes tardives du parcours. Exécutez le vecteur mémorisé en une seule séquence motrice fluide.",
        tips: "Enchaînez la séquence d'un geste continu sans marquer de temps d'arrêt entre deux cases."
      }
    ]
  },
  steps: [
    "Fixez votre regard sur le centre de la grille et suivez le parcours lumineux de la cible.",
    "Regroupez mentalement les coordonnées illuminées en vecteurs de direction continus (ex. « droite-haut-droite »).",
    "Pendant le court délai de rétention, répétez mentalement la trajectoire avec le scribe interne.",
    "Retracez la séquence de coordonnées dans l'ordre chronologique exact avec une cadence rythmique fluide.",
    "Progressez à travers les matrices de 3x3 à 7x7 pour étendre votre empan spatial séquentiel."
  ],
  audience: "Joueurs compétitifs (gestion des routes de patrouille et rotations de compétences), étudiants en sciences et ingénierie, chorégraphes, conducteurs et toute personne souhaitant renforcer sa mémoire de travail spatio-temporelle.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('corsi1972', 'milner1971', 'logie1995', 'cowan2001', 'baddeley2000', 'miller1956', 'simon1974', 'kessels2000', 'woods2015'),
  related: [
    { href: "/drills/memory/spatial-memory/grid-memorization", label: "Test de Mémoire Visuelle" },
    { href: "/drills/memory/spatial-memory/object-location", label: "Test de Mémoire de Localisation" },
    { href: "/drills/memory/short-term-memory/digit-span", label: "Test d'Empan Numérique" },
    { href: "/drills/memory/short-term-memory/word-recall", label: "Test de Mémoire Verbale" },
    { href: "/drills/memory/working-memory/n-back", label: "Test de Mémoire de Travail N-Back" }
  ]
};

export default function PathTracingFrenchPage() {
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
      <PathTracingClient
        copy={{
          "h1Keyword": "Test des Blocs de Corsi",
          "h1Suffix": " (Mémoire Séquentielle)",
          "subtitle": "L'empan spatial correspond à la plus longue séquence de positions qu'il est possible de reproduire dans l'ordre exact. Le test de Corsi établit la moyenne des adultes sains entre cinq et sept étapes (Milner, 1971; Corsi, 1972) via le scribe interne (Logie, 1995).",
          "statScore": "Score",
          "statTime": "Temps",
          "statLevel": "Niveau",
          "statBestScore": "Meilleur Score",
          "levelPrefix": "Niv.",
          "startTitle": "Suivi de Trajectoire Pro",
          "startSubtitle": "Mémoire spatiale séquentielle • Blocs de Corsi",
          "countdownSubtitle": "PRÉPAREZ-VOUS",
          "newBest": "NOUVEAU RECORD",
          "pointsLabel": "Points",
          "statAccuracy": "Précision",
          "statPeakLevel": "Niveau Max",
          "statPerfects": "Sans faute",
          "btnPlayAgain": "Rejouer",
          "rulesTitle": "Instructions et Système de Points",
          "aboutTitle": "À propos du test de Corsi et de la mémoire séquentielle",
          "rulesItems": [
            {
              "num": "1",
              "text": "Mémoriser et reproduire la trajectoire",
              "highlight": "+150 PTS",
              "result": "Mémorisez la séquence lumineuse et cliquez dans l'ordre exact"
            },
            {
              "num": "2",
              "text": "Progression de difficulté",
              "highlight": "Niveau supérieur",
              "result": "La grille s'étend et le parcours s'allonge avec chaque manche réussie"
            },
            {
              "num": "3",
              "text": "Clic hors séquence",
              "highlight": "Aucune pénalité",
              "result": "Aucune perte de points ni pénalité de chronomètre en cas d'erreur"
            },
            {
              "num": "4",
              "text": "Maintien de manche",
              "highlight": "Même palier",
              "result": "La manche est rejouée au même niveau après une erreur de parcours"
            }
          ]
        }}
      />
      <DrillGuide guide={pathTracingGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/spatial-memory/path-tracing"
          locale="fr"
        />
      </div>
    </>
  );
}
