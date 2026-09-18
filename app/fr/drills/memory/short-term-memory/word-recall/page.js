import WordRecallClient from '@/app/drills/memory/short-term-memory/word-recall/WordRecallClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: "Test de Mémoire Verbale – Rappel de Mots | SkillDrills",
  description: "Test de memoire verbale en ligne gratuit: Retenez des listes de mots, maitrisez l effet de position serielle et entrainez votre memoire de travail sans compte.",
  keywords: [
    "test de memoire verbale",
    "test rappel de mots gratuit",
    "test de rappel libre en ligne",
    "effet de position serielle test",
    "memoire des mots exercice",
    "test memoire a court terme mots",
    "empan verbal et rappel libre",
    "exercice memoire semantique gratuit",
    "test de memoire des listes de mots",
    "entrainement memoire verbale",
    "test neuropsychologique rappel de mots",
    "evaluation memoire de travail verbale"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/memory/short-term-memory/word-recall",
    languages: getAlternateLanguages('/drills/memory/short-term-memory/word-recall'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Test de Mémoire Verbale – Rappel de Mots | SkillDrills",
    description: "Test de memoire verbale en ligne gratuit: Retenez des listes de mots, maitrisez l effet de position serielle et entrainez votre memoire de travail sans compte.",
    url: "https://skilldrills.online/fr/drills/memory/short-term-memory/word-recall",
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test de Mémoire Verbale – Rappel de Mots | SkillDrills",
    description: "Test de memoire verbale en ligne gratuit: Retenez des listes de mots, maitrisez l effet de position serielle et entrainez votre memoire de travail sans compte.",
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
      "name": "Memoire a Court Terme",
      "item": "https://skilldrills.online/fr/drills/memory/short-term-memory"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Test de Memoire Verbale",
      "item": "https://skilldrills.online/fr/drills/memory/short-term-memory/word-recall"
    }
  ]
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test de Memoire Verbale en Ligne (Word Recall)",
  "url": "https://skilldrills.online/fr/drills/memory/short-term-memory/word-recall",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "dateModified": "2026-09-16",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "description": "Evaluation neuropsychologique de la memoire verbale a court terme, du rappel libre et des strategies de regroupement semantique."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Test de Memoire Verbale en Ligne (Word Recall)",
  "url": "https://skilldrills.online/fr/drills/memory/short-term-memory/word-recall",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "isAccessibleForFree": true,
  "dateModified": "2026-09-16"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Jeu de Rappel de Mots – Test de Memoire Verbale",
  "url": "https://skilldrills.online/fr/drills/memory/short-term-memory/word-recall",
  "description": "Exercice cognitif interactif mesurant l empan de rappel libre de listes de mots et la resilience face a l oubli.",
  "dateModified": "2026-09-16",
  "gamePlatform": "Web Browser",
  "genre": ["Memory Game", "Cognitive Training", "Brain Training", "Verbal Memory"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment passer le Test de Memoire Verbale",
  "description": "Protocole en 4 etapes pour retenir un maximum de mots grace a l imagerie mentale et au regroupement semantique.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/fr/drills/memory/short-term-memory/word-recall#step-1",
      "name": "Lisez Attentivement la Liste de Mots",
      "text": "Observez les mots presentes a l ecran pendant la fenetre d exposition en evitant toute distraction."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/fr/drills/memory/short-term-memory/word-recall#step-2",
      "name": "Creez des Liens Visuels et Semantiques",
      "text": "Imaginez une histoire ou associez les mots par categories pour faciliter leur transfert en memoire temporaire."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/fr/drills/memory/short-term-memory/word-recall#step-3",
      "name": "Restituez les Mots sans Ordre Impose",
      "text": "Saisissez rapidement au clavier tous les mots dont vous vous souvenez avant la fin du compte a rebours."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/fr/drills/memory/short-term-memory/word-recall#step-4",
      "name": "Mesurez Votre Capacite Limite",
      "text": "Observez le diagnostic detaille base sur l effet de position serielle et la longueur de liste maximale atteinte."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu est-ce que le test de rappel libre de mots (Word Recall) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "C est une epreuve standard de neuropsychologie cognitive. Le participant memorise une liste de mots et doit ensuite restituer le plus grand nombre possible d elements, quel que soit leur ordre d apparition initial."
      }
    },
    {
      "@type": "Question",
      "name": "Qu est-ce que l effet de position serielle (Murdoch, 1962) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "C est le phenomene selon lequel les premiers mots d une liste (effet de primaute) et les derniers mots (effet de recence) sont nettement mieux retenus que les mots situes au milieu de la sequence."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi oublie-t-on facilement les mots du milieu d une liste ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les mots centraux subissent une double interférence : l interférence proactive des premiers mots deja enregistres et l interférence retroactive des derniers mots venant saturer le magasin de travail."
      }
    },
    {
      "@type": "Question",
      "name": "Comment l imagerie mentale aide-t-elle a retenir plus de mots ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La theorie du double codage de Paivio demontre que relier un mot a une image mentale concrete active a la fois les circuits linguistiques de l hemisphere gauche et les circuits visuels de l hemisphere droit."
      }
    },
    {
      "@type": "Question",
      "name": "Combien de mots un adulte retient-il habituellement lors d un rappel libre ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sur une liste non structuree de 15 mots, la plupart des adultes retiennent spontanement entre 5 et 8 mots. Avec des techniques de chunking semantique, cette performance peut depasser 12 a 14 mots."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la difference entre rappel libre et rappel ordonne ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le rappel libre permet de restituer les mots dans n importe quel ordre, testant la charge globale du reseau lexical. Le rappel ordonne exige de respecter strictement la chronologie, mobilisant davantage le controle executif."
      }
    },
    {
      "@type": "Question",
      "name": "La subvocalisation ameliore-t-elle le rappel de mots ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, repeter interieurement les mots a voix basse maintient les traces phonologiques actives dans la boucle de Baddeley, prevenant leur effacement spontane apres quelques secondes."
      }
    },
    {
      "@type": "Question",
      "name": "Le test prend-il en compte les fautes de frappe ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le systeme compare la saisie au lexique reference et accepte les correspondances directes ainsi que les variantes d accentuation courantes pour eviter les penalites motrices inutiles."
      }
    },
    {
      "@type": "Question",
      "name": "Peut-on s entrainer tous les jours pour developper sa memoire verbale ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, deux a trois sessions de rappel libre quotidiennes suffisent a renforcer l automatisme des associations lexicales et a developper des strategies mnesiques transposables aux etudes et au travail."
      }
    },
    {
      "@type": "Question",
      "name": "Ce test est-il gratuit et securise ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, SkillDrills fournit cet outil 100% gratuitement, sans compte utilisateur, sans publicite invasive et avec sauvegarde locale sur votre appareil."
      }
    }
  ]
};

const wordRecallGuide = {
  heading: "Guide Neurocognitif du Rappel Libre et de la Memoire Verbale",
  intro: [
    "Le paradigme du rappel libre de mots constitue la reference historique pour etudier la structure de la memoire a court terme et son interface avec le stock lexical a long terme. Standardise par Bennet B. Murdock en 1962, il met en lumiere la dynamique temporelle de l encodage verbal.",
    "L architecture sous-jacente s appuie sur les modeles de Baddeley & Hitch (1974) et d Atkinson & Shiffrin (1968) : les premiers elements de la liste beneficient de repetitions subvocales privilegiees et s ancrent en memoire a long terme (effet de primaute), tandis que les derniers elements sont immediatement recuperes depuis la boucle phonologique active (effet de recence).",
    "Pour depasser le goulot d etranglement attentionnel decrit par Cowan (2001) et Miller (1956), le sujet doit deployer une strategie d elaboration semantique en reliant les termes isoles par des liens logiques, thematiques ou narratifs.",
    "La validation experimentale et les chronometres d affichage reposent sur les protocoles de reaction standardises de Woods et al. (2015)."
  ],
  benchmarks: {
    title: "Baremes Normatifs de Rappel Libre de Mots (Population Adulte)",
    headers: ["Palier de Performance", "Mots Restitues (Liste de 15)", "Score Moyen", "Diagnostic Cognitif"],
    rows: [
      ["Tier 1 (Elite / Memoire Remarquable)", "13 – 15 Mots", "1 800+ PTS", "Organisation semantique categorielle spontanee ; elimination de l affaissement central"],
      ["Tier 2 (Superieur / Tres Bon Rappel)", "10 – 12 Mots", "1 400 – 1 799 PTS", "Usage efficace de l imagerie visuelle ; bonne preservation des mots du milieu"],
      ["Tier 3 (Moyenne Normative Standard)", "7 – 9 Mots", "900 – 1 399 PTS", "Courbe en U classique de Murdock (1962) ; primaute et recence nettement preservees"],
      ["Tier 4 (Sous la Moyenne / Effacement)", "5 – 6 Mots", "500 – 899 PTS", "Recuperation quasi exclusive des derniers mots presentes ; saturation rapide de la boucle"],
      ["Tier 5 (Empan Fragile / Oublis)", "Moins de 5 Mots", "Moins de 500 PTS", "Interference proactive majeure ; difficulte a fixer plus de 2 a 3 concepts consecutifs"]
    ],
    note: "Baremes adaptes des protocoles de rappel libre de Murdock (1962) et des travaux de Baddeley (1974) sur des listes de 15 mots concrets."
  },
  techniques: {
    title: "4 strategies scientifiques pour maximiser le rappel de listes de mots",
    items: [
      {
        name: "Regroupement Semantique par Categories",
        desc: "Classez mentalement les mots selon des themes communs (animaux, outils, nature, objets) des leur affichage.",
        tips: "Le regroupement thematique multiplie par deux le nombre d unites de sens memorisables."
      },
      {
        name: "Methode de l Histoire Narree (Scenario Mental)",
        desc: "Inventez une micro-histoire loufoque reliant les mots entre eux au fur et a mesure de leur presentation.",
        tips: "L emotion et la singularite d une scene renforcent l encodage profond."
      },
      {
        name: "Restitution Immediate des Mots Centraux",
        desc: "A l ouverture de la phase de rappel, commencez par taper les mots du milieu avant que leur trace ne s estompe.",
        tips: "Inverse la vulnerabilite habituelle de l effet de position serielle."
      },
      {
        name: "Double Codage Visuo-Semantique",
        desc: "Associez chaque mot a une image visuelle nette et coloree plutot que de vous limiter au son du mot.",
        tips: "Mobilise les deux hemispheres cerebraux selon la theorie de Paivio."
      }
    ]
  },
  steps: [
    "Prenez connaissance de la consigne et fixez l ecran d affichage.",
    "Lisez chaque mot et associez-le immediatement a une categorie ou une image mentale.",
    "Des la fin de la presentation, saisissez tous les mots retenus dans la zone de texte.",
    "Analysez votre score pour identifier vos points forts et equilibrer votre courbe de rappel."
  ],
  audience: "Etudiants, professionnels, personnes preparant des concours ou souhaitant entretenir leur agilite verbale et leur plasticite neuronale au quotidien.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('miller1956', 'cowan2001', 'baddeley1974', 'woods2015'),
  related: [
    { href: "/fr/drills/memory/short-term-memory/digit-span", label: "Test d Empan de Chiffres" },
    { href: "/fr/drills/memory/short-term-memory/color-sequence", label: "Jeu Simon des Couleurs" },
    { href: "/fr/drills/memory/spatial-memory/grid-memorization", label: "Memoire Spatiale sur Grille" },
    { href: "/fr/drills/memory/working-memory/n-back", label: "Test Dual N-Back" }
  ]
};

export default function FrenchWordRecallPage() {
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
      <WordRecallClient copy={{
        wordsLabel: "Mots",
        scoreLabel: "Score",
        timeLeftLabel: "Temps",
        recallTitle: "RESTITUEZ LES MOTS",
        memorizeTitle: "MEMORISEZ LA LISTE",
        evaluating: "Evaluation...",
        startTitle: "Test de Memoire Verbale Pro",
        startSubtitle: "Memoire a Court Terme • Rappel Libre de Mots",
        countdownSubtitle: "PREPAREZ-VOUS",
        newBest: "NOUVEAU RECORD",
        pointsLabel: "Points",
        statAccuracy: "Precision",
        statPeakWords: "Mots Max",
        statPerfects: "Parfaits",
        btnPlayAgain: "Rejouer",
        rulesTitle: "Instructions de l Exercice et Bareme",
        aboutTitle: "A Propos du Test de Memoire Verbale (Word Recall)",
        rulesItems: [
          {
            num: "1",
            text: "Rappel de Liste",
            highlight: "+150 PTS",
            result: "Memorisez les mots et tapez-les durant la phase de rappel"
          },
          {
            num: "2",
            text: "Bonus de Niveau",
            highlight: "Jusqu a +135%",
            result: "Les listes plus longues rapportent beaucoup plus de points"
          },
          {
            num: "3",
            text: "Erreur / Temps Ecoule",
            highlight: "-1 Mot",
            result: "Aucune perte de points ; recul d un mot pour recalibrer"
          },
          {
            num: "4",
            text: "Ampleur Adaptative",
            highlight: "Ajustement continu",
            result: "Converge fidelement vers votre limite reelle de memoire verbale"
          }
        ],
        wordBank: [
          "pomme", "pont", "chateau", "diamant", "aigle", "foret", "jardin", "marteau",
          "ile", "jungle", "chevalier", "lanterne", "montagne", "aiguille", "ocean",
          "palais", "reine", "fusee", "couchant", "temple", "parapluie", "vallee",
          "fenetre", "zebre", "navire", "flamme", "riviere", "horloge", "miroir", "etoile"
        ]
      }} />
      <DrillGuide guide={wordRecallGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/short-term-memory/word-recall"
          locale="fr"
        />
      </div>
    </>
  );
}
