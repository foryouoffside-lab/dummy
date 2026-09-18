import PathTracingClient from '@/app/drills/memory/spatial-memory/path-tracing/PathTracingClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';

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
    "L empan spatial mesure la longueur maximale d une sequence de positions qu un sujet peut restituer dans l ordre chronologique exact. Concu a l origine par Philip M. Corsi en 1972 sous la direction de Brenda Milner a l Institut Neurologique de Montreal, le test des blocs de Corsi est devenu l etalon-or mondial de l evaluation de la memoire de travail visuo-spatiale.",
    "Les travaux pionniers de Milner (1971) ont etabli une double dissociation neurocognitive majeure: les lesions temporales gauches alterent l empan auditivo-verbal (Digit Span), tandis que les lesions de la region temporale droite et de l hippocampe reduisent specifiquement l empan spatial de Corsi.",
    "Dans le modele de memoire de travail de Robert Logie (1995), cette epreuve sollicite specifiquement le 'scribe interne', l element actif responsable de la repetition des mouvements et du maintien des trajectoires dynamiques dans l espace, a la difference du 'cache visuel' passif dedie aux formes immobiles.",
    "L etalonnage normatif de Kessels et al. (2000, 2008) aupres d adultes sains a confirme un empan direct moyen d environ 5 a 6 blocs. Les performances superieures reposent principalement sur la capacite a decouvrir des symetries et a integrer les vecteurs individuels au sein d une trajectoire motrice continue (chunking spatial).",
    "Precision chronometrique: les apparitions lumineuses et vos clics de reponse sont synchronises a la milliseconde pres via l horloge haute resolution performance.now() de votre navigateur. La fluidite depend du taux de rafraichissement de votre ecran (16,7 ms par image a 60 Hz). Evaluez vos resultats dans un cadre materiel stable.",
    "Confidentialite et finalite: aucune donnee privee ni aucun score individuel n est transmis a des serveurs distants. Vos performances restent conservees dans le stockage local de votre terminal (localStorage). Ce drill interactif est un outil d entrainement cognitif et ne constitue pas un diagnostic medical."
  ],
  benchmarks: {
    title: "Paliers de Référence : Empan Spatial de Corsi",
    headers: ["Palier de Performance", "Longueur de la Séquence (Empan)", "Taille de Grille", "Profil Neurocognitif & Stratégie Motrice"],
    rows: [
      ["Palier 1 : Maître", "8+ étapes", "Grille 6x6 – 7x7", "Empan d élite : fusion spatio-temporelle parfaite et chunking vectoriel instinctif."],
      ["Palier 2 : Avancé", "6–7 étapes", "Grille 5x5 – 6x6", "Performance remarquable : dépassement net des normes adultes de Kessels."],
      ["Palier 3 : Compétent", "5 étapes", "Grille 4x4 – 5x5", "Empan standard : niveau moyen attendu chez l adulte sain (5,4 ± 0,8)."],
      ["Palier 4 : En développement", "4 étapes", "Grille 3x3 – 4x4", "Capacité fonctionnelle : sensible à l interférence des trajectoires croisées."],
      ["Palier 5 : Débutant", "1–3 étapes", "Grille 3x3", "Difficulté à maintenir l ordre chronologique des transitions lumineuses."]
    ],
    note: "Ces paliers sont calibres d apres les etudes neuropsychologiques de Corsi (1972) et de Kessels et al. (2000, 2008); ils sont fournis a vocation d auto-evaluation et d entrainement personnel."
  }
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
