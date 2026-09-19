import NBackClient from '@/app/drills/memory/working-memory/n-back/NBackClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test N-Back en Ligne – Mémoire de Travail | SkillDrills",
  description: "Test N-back en ligne gratuit: Entrainez votre memoire de travail et la mise a jour continue de l information a 2-back et 3-back sans inscription.",
  keywords: [
    "test n-back en ligne",
    "memoire de travail test",
    "dual n-back francais",
    "tache n-back",
    "entrainement memoire de travail",
    "test 3-back gratuit",
    "intelligence fluide n-back",
    "mise a jour memoire de travail",
    "test n-back gratuit",
    "controle executif test",
    "exercice dual n-back en ligne",
    "evaluation cognitive n-back"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/memory/working-memory/n-back",
    languages: getAlternateLanguages('/drills/memory/working-memory/n-back'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Test N-Back en Ligne – Mémoire de Travail | SkillDrills",
    description: "Test N-back en ligne gratuit: Entrainez votre memoire de travail et la mise a jour continue de l information a 2-back et 3-back sans inscription.",
    url: "https://skilldrills.online/fr/drills/memory/working-memory/n-back",
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test N-Back en Ligne – Mémoire de Travail | SkillDrills",
    description: "Test N-back en ligne gratuit: Entrainez votre memoire de travail et la mise a jour continue de l information a 2-back et 3-back sans inscription.",
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
      "name": "Memoire de Travail",
      "item": "https://skilldrills.online/fr/drills/memory/working-memory"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Test N-Back",
      "item": "https://skilldrills.online/fr/drills/memory/working-memory/n-back"
    }
  ]
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test N-Back en Ligne (Mémoire de Travail)",
  "url": "https://skilldrills.online/fr/drills/memory/working-memory/n-back",
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
  "name": "Test N-Back en Ligne (Mémoire de Travail)",
  "url": "https://skilldrills.online/fr/drills/memory/working-memory/n-back",
  "description": "Test interactif mesurant la mise a jour continue de la memoire de travail, l attention soutenue et le controle executif a 2-back, 3-back et au-dela.",
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
  "name": "Test N-Back en Ligne (Mémoire de Travail)",
  "url": "https://skilldrills.online/fr/drills/memory/working-memory/n-back",
  "description": "Jeu d entrainement cognitif mesurant la capacite d actualisation de flux sequentiels de lettres sous contrainte temporelle.",
  "dateModified": "2026-09-16",
  "gamePlatform": "Web Browser",
  "genre": ["Memory Game", "Cognitive Training", "Brain Training", "Working Memory"],
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
  "name": "Comment s entrainer a la tache N-Back",
  "description": "Protocole en 4 etapes pour actualiser en continu la memoire de travail et detecter les correspondances a N pas d ecart.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/fr/drills/memory/working-memory/n-back#step-1",
      "name": "Observer le flux de lettres",
      "text": "Fixez le centre de l ecran et memorisez les premieres lettres presentees sans reagir prematurement."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/fr/drills/memory/working-memory/n-back#step-2",
      "name": "Maintenir une file d attente glissante",
      "text": "Repetez mentalement les N dernieres lettres en expulsant l element le plus ancien a chaque nouvelle arrivee."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/fr/drills/memory/working-memory/n-back#step-3",
      "name": "Comparer avec l element N pas en arriere",
      "text": "Verifiez immediatement si la lettre actuelle correspond exactement a celle survenue il y a N etapes."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/fr/drills/memory/working-memory/n-back#step-4",
      "name": "Cliquer sur Correspondance ou Ignorer",
      "text": "Validez votre reponse en cliquant sur Correspondance si le stimulus concorde, ou laissez defiler sans cliquer en cas de difference."
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
      "name": "Qu est-ce que le test de memoire de travail N-Back ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La tache N-Back est un paradigme neuropsychologique concu pour evaluer l actualisation continue de la memoire de travail. Le participant doit determiner si le stimulus actuel est identique a celui presente N pas plus tot."
      }
    },
    {
      "@type": "Question",
      "name": "Qui a invente la tache N-Back et dans quel but ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wayne K. Kirchner a introduit la tache N-Back en 1958 afin d etudier les differences de retention a court terme d informations dynamiques a renouvellement rapide chez les sujets jeunes et ages."
      }
    },
    {
      "@type": "Question",
      "name": "Quelles fonctions executives le N-Back sollicite-t-il principalement ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Selon Adele Diamond (2013), le N-Back sollicite la triade executive: la mise a jour active du contenu mnesique, l inhibition des leurres recents et la flexibilite cognitive prefrontale dorsolaterale."
      }
    },
    {
      "@type": "Question",
      "name": "En quoi le N-Back differe-t-il des tests de memorisation statiques ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Contrairement aux tests d empan statique (comme retenir une liste de chiffres), le N-Back exige une manipulation dynamique permanente: chaque nouvelle lettre requiert d oublier l element le plus ancien et d inserer le nouveau."
      }
    },
    {
      "@type": "Question",
      "name": "Le N-Back permet-il d augmenter l intelligence fluide ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L etude retentissante de Susanne Jaeggi et al. (2008) a demontre un transfert significatif vers le raisonnement matriciel non verbal (intelligence fluide Gf) apres un entrainement adaptatif et intensif au Dual N-Back."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la performance normale d un adulte au 3-Back ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chez les adultes sains sans entrainement prealable, le taux de precision au 3-Back se situe entre 65 % et 80 %. Maintenir un score superieur a 90 % a 3-Back ou reussir le 4-Back reflete un niveau exceptionnel."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la difference entre Single N-Back et Dual N-Back ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le Single N-Back suit une seule modalite sensorielle (par exemple, des lettres visuelles), tandis que le Dual N-Back presente simultanement deux flux independants (position spatiale sur une grille et lettre sonore)."
      }
    },
    {
      "@type": "Question",
      "name": "Comment la repetition subvocalique aide-t-elle a gerer le flux ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Prononcer interieurement la sequence comme une boucle continue (ex: 'K-R-T' devenant 'R-T-M') engage la boucle phonologique de Baddeley et stabilise la trace sensorielle contre la perte d attention."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi les performances chutent-elles a 4-Back et au-dela ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Selon le modele de Nelson Cowan (2001), le foyer de l attention consciente humaine est limite a environ 4 unites non groupees. Traiter 4 ou 5 elements depasse la bande passante biologique sans compression abstraite."
      }
    },
    {
      "@type": "Question",
      "name": "Comment la memoire de travail se transfere-t-elle au quotidien ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Elle optimise le traitement de problemes complexes a plusieurs variables, la programmation informatique, la comprehension de textes denses, ainsi que la prise de decision rapide sous pression dans l e-sport."
      }
    }
  ]
};

const nBackClientCopyFr = {
  h1Keyword: "Test N-Back en Ligne",
  h1Suffix: " – Entraînement de Mémoire de Travail",
  caption: "La tâche N-Back exige d'évaluer en continu si le stimulus actuel coïncide avec celui d'il y a N étapes. Selon le modèle de Baddeley & Hitch (1974), cette épreuve associe stockage tampon temporaire et actualisation active.",
  statScore: "Score",
  statTime: "Temps",
  statLevel: "Niveau",
  statBest: "Record",
  hudScore: "Score",
  hudTime: "Temps",
  modeSuffix: "-BACK TRAINING",
  memorizingText: "Mémorisez les {n} premières lettres...",
  btnMatch: "CORRESPONDANCE (MATCH)",
  btnNoMatch: "AUCUN MATCH",
  startTitle: "Entraînement N-Back Pro",
  startSubtitle: "Mémoire de travail • Mise à jour séquentielle",
  countdownSubtitle: "PRÉPAREZ-VOUS",
  newBest: "NOUVEAU RECORD",
  pointsLabel: "Points",
  statAccuracy: "Précision",
  statPeakLevel: "Niveau Max",
  statPerfects: "Succès",
  btnPlayAgain: "Rejouer",
  rulesTitle: "Instructions et Système de Points",
  rulesItems: [
    { num: "1", text: "Match / Pas de match (N étapes avant)", highlight: "+150 Points", result: "Pour chaque décision exacte" },
    { num: "2", text: "Montée de niveau", highlight: "3-Back → 4-Back+", result: "Tous les 1 200 points" },
    { num: "3", text: "Accélération du stimulus", highlight: "2 000 ms → 1 200 ms", result: "Rythme plus rapide aux paliers supérieurs" },
    { num: "4", text: "Délai dépassé", highlight: "Aucune pénalité", result: "Aucune perte de score ni pénalité de temps" },
    { num: "5", text: "Erreur de saisie", highlight: "Interrompt la série", result: "Aucune déduction de temps — manche complète de 45s" }
  ]
};

const guideFr = {
  heading: "Guide du Test N-Back et Baremos Cognitifs",
  intro: [
    "Le test de mémoire de travail N-Back est le paradigme neuropsychologique de référence pour évaluer l'actualisation continue des représentations mentales, le contrôle exécutif préfrontal et le maintien dynamique de l'information sous contrainte temporelle. Issu des travaux séminaux de Wayne K. Kirchner (1958) sur la rétention d'informations à renouvellement rapide, la tâche N-Back s'est imposée comme le standard de référence en neurosciences cognitives.",
    "À la différence des épreuves d'empan passif qui évaluent une simple capacité de stockage brut, la tâche N-Back exige la mise à jour permanente d'une mémoire tampon dynamique de type FIFO (premier entré, premier sorti). Au fil de l'apparition séquentielle des lettres, l'utilisateur doit décider si le caractère affiché correspond à celui présenté exactement N étapes plus tôt (débutant au 3-Back et progressant vers le 4-Back et au-delà), en éliminant immédiatement les jetons obsolètes pour encoder les nouveaux stimuli.",
    "Méthodologie de mesure : chaque événement est horodaté au moyen de l'horloge haute résolution performance.now() du navigateur, s'exécutant intégralement sur votre machine locale sans transmission de scores vers un serveur. Les horloges logicielles subissent une quantification de sécurité (atténuation Spectre d'environ 1 ms) et l'affichage quantifie chaque transition selon la fréquence de rafraîchissement de l'écran (environ 16,7 ms par trame à 60 Hz, Woods et al., 2015). Considérez tout écart inférieur à 5 ms comme du bruit de mesure et comparez vos séries sur un matériel identique.",
    "Transparence des données : SkillDrills ne recueille aucune donnée télémétrique ni résultat agrégé. Vos scores et configurations demeurent strictement confinés au stockage local (localStorage) de votre navigateur. Toutes les valeurs de référence et percentiles cités ci-dessous proviennent exclusivement de la littérature scientifique révisée par les pairs.",
    "Ce drill est un jeu en ligne gratuit destiné à l'entraînement et à la curiosité cognitive. Il ne constitue en aucun cas un dispositif médical, un instrument d'évaluation clinique ou un protocole thérapeutique. Si vous avez des inquiétudes concernant votre mémoire ou vos facultés cognitives, veuillez consulter un professionnel de santé qualifié."
  ],
  metrics: [
    { label: "Niveau N-Back maximal", desc: "Plus haut palier de profondeur atteint dans la session (3-Back fondamental, 4-Back avancé, 5-Back+ élite)." },
    { label: "Score cumulé de session", desc: "Total des points accumulés en 45 secondes (+150 PTS par décision exacte de correspondance ou non-correspondance, sans pénalité négative)." },
    { label: "Précision de jugement", desc: "Pourcentage de jugements corrects par rapport aux erreurs d'omission et de fausse alerte." },
    { label: "Vitesse d'actualisation", desc: "Rapidité décisionnelle et latence de réponse durant les fenêtres d'exposition des stimuli reflétant l'efficacité exécutive." }
  ],
  benchmarks: [
    { tier: "Palier 1 : Mémoire de Travail d'Élite (Top 1%)", range: "4-Back à 5-Back+ (1 200+ pts)", desc: "Maintien d une file glissante de 4 à 5 lettres ; latence inférieure à 600 ms ; précision supérieure à 92 %." },
    { tier: "Palier 2 : Supérieur à la moyenne (Top 5–15%)", range: "3-Back stable avec transition 4-Back (900 – 1 199 pts)", desc: "Dépassement net de la norme adulte ; maîtrise du 3-Back avec erreurs minimes ; précision de 80 % à 91 %." },
    { tier: "Palier 3 : Norme Adulte Standard (Médiane)", range: "3-Back solide (600 – 899 pts)", desc: "Ligne de base normative chez l adulte sain (Kirchner, 1958) ; 65 % à 79 % de précision." },
    { tier: "Palier 4 : En développement (15–30%)", range: "3-Back instable (400 – 599 pts)", desc: "Difficultés à maintenir 3 éléments ; confusion fréquente avec le 2-Back ; précision de 50 % à 64 %." },
    { tier: "Palier 5 : Débutant (< 15%)", range: "Inférieur à 3-Back (< 400 pts)", desc: "Goulot d étranglement dans la mise à jour continue des lettres ; précision inférieure à 50 %." }
  ],
  science: [
    { title: "Wayne K. Kirchner (1958) : Origine du paradigme N-Back", body: "Kirchner a concu cette epreuve pour analyser les mecanismes d actualisation de donnees a renouvellement rapide." },
    { title: "Alan Baddeley (1986, 2000) : L administrateur central", body: "Dans le modele de Baddeley, le N-Back mobilise la coordination entre la boucle phonologique et le cortex prefrontal dorsolateral." },
    { title: "Adele Diamond (2013) : Triade des fonctions executives", body: "Diamond a etabli que la mise a jour de la memoire de travail, l inhibition et la flexibilite mentale forment le socle cognitif." },
    { title: "Susanne M. Jaeggi et al. (2008) : Transfert vers l intelligence fluide", body: "A demontre des gains mesurables sur les tests de raisonnement matriciel grace a l entrainement adaptatif au N-Back." },
    { title: "Nelson Cowan (2001) : La limite de 4 unites", body: "Le foyer attentionnel actif de l etre humain retient environ 4 entites non structurees avant saturation." },
    { title: "David L. Woods et al. (2015) : Standards chronometriques", body: "A standardise la mesure precise des temps de reaction informatises et de la theorie de detection du signal." }
  ],
  protocols: [
    { title: "File d attente phonologique glissante", body: "Repetez mentalement les 3 dernieres lettres comme un ruban continu (ex: 'B-M-T' devient 'M-T-R')." },
    { title: "Controle inhibiteur face aux leurres", body: "Evitez les clics impulsifs sur les lettres apparues il y a 1 ou 2 etapes (leurres frequents)." },
    { title: "Ancrage visuo-spatial des cases", body: "Visualisez trois compartiments mentaux dans lesquels les lettres glissent de droite a gauche." },
    { title: "Reinitialisation mentale rapide", body: "Si vous perdez le fil du flux, reconnectez-vous immediatement sur la lettre suivante sans paniquer." }
  ],
  sources: pickSources('baddeley1974', 'baddeley1986', 'cowan2001', 'woods2015'),
  faqs: [
    { q: "Qu est-ce que le test de memoire de travail N-Back ?", a: "Un paradigme neuropsychologique destine a evaluer la mise a jour continue et l attention soutenue." },
    { q: "Qui a invente la tache N-Back et pour quelle raison ?", a: "Wayne K. Kirchner l a concue en 1958 pour analyser la retention d informations dynamiques." },
    { q: "Quelles fonctions executives sont principalement sollicitees ?", a: "L actualisation de la memoire de travail, l inhibition prefrontale et le controle cognitif." },
    { q: "En quoi le N-Back differe-t-il d un simple test d empan ?", a: "Il requiert un renouvellement constant des traces mnesiques plutot qu un stockage fige." },
    { q: "L entrainement au N-Back ameliore-t-il le QI fluide ?", a: "Les recherches de Jaeggi et al. (2008) mettent en evidence un transfert vers le raisonnement matriciel." },
    { q: "Quelle est la moyenne habituelle pour un adulte au 3-Back ?", a: "Un adulte en bonne sante obtient generalement entre 65 % et 80 % de reussite." },
    { q: "Quelle distinction existe-t-il entre Single et Dual N-Back ?", a: "Le Single N-Back utilise un flux unique ; le Dual N-Back gere simultanement deux canaux distincts." },
    { q: "Quel est l interet de la vocalisation interieure ?", a: "Elle active la boucle phonologique pour empecher l estompement rapide de la trace mnesique." },
    { q: "Pourquoi le 4-Back est-il particulierement difficile ?", a: "Parce qu il atteint le plafond biologique de capacite attentionnelle humaine de 4 unites (Cowan, 2001)." },
    { q: "Comment ce travail s applique-t-il aux situations de la vie reelle ?", a: "Il developpe le multitache, la resolution de bugs, la prise de decision tactique et la clarte mentale." }
  ],
  related: [
    { href: "/fr/drills/memory/spatial-memory/path-tracing", title: "Test des Blocs de Corsi", desc: "Memoriser et reproduire des trajectoires sur grille animee." },
    { href: "/fr/drills/memory/spatial-memory/grid-memorization", title: "Test de Memoire Visuelle", desc: "Retenir des matrices de motifs geometriques sans indice verbal." },
    { href: "/fr/drills/memory/spatial-memory/object-location", title: "Test de Localisation d Objets", desc: "Associer symboles et coordonnees spatiales precises." },
    { href: "/fr/drills/memory/short-term-memory/digit-span", title: "Test d Empan de Chiffres", desc: "Mesurer la capacite de la boucle phonologique." },
    { href: "/fr/drills/memory/short-term-memory/word-recall", title: "Test de Rappel de Mots", desc: "Evaluer le rappel libre immediat et la memoire semantique." },
    { href: "/fr/drills/memory/short-term-memory/color-sequence", title: "Sequence de Couleurs", desc: "Reproduire des suites chromatiques a vitesse croissante." }
  ]
};

export default function NBackFrenchPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <NBackClient copy={nBackClientCopyFr} />

      <DrillGuide {...guideFr} />

      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="memory" currentHref="/drills/memory/working-memory/n-back" locale="fr" />
      </div>
    </>
  );
}
