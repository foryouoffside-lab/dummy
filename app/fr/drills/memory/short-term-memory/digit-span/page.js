import DigitSpanClient from '@/app/drills/memory/short-term-memory/digit-span/DigitSpanClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: "Test d Empan de Chiffres – Mémoire Numérique | SkillDrills",
  description: "Test d empan de chiffres en ligne gratuit: Retenez des suites de nombres croissantes et evaluez votre boucle phonologique sans telechargement ni inscription.",
  keywords: [
    "test d empan mnemonique",
    "test empan digital en ligne",
    "test de memoire des chiffres",
    "empan mnesique test gratuit",
    "boucle phonologique test",
    "test de memoire a court terme chiffres",
    "evaluation memoire de travail chiffres",
    "exercice de retention numerique",
    "empan verbal et numerique",
    "test de chunking mnemonique",
    "test neuropsychologique empan",
    "exercice memoire des nombres"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/memory/short-term-memory/digit-span",
    languages: getAlternateLanguages('/drills/memory/short-term-memory/digit-span'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Test d Empan de Chiffres – Mémoire Numérique | SkillDrills",
    description: "Test d empan de chiffres en ligne gratuit: Retenez des suites de nombres croissantes et evaluez votre boucle phonologique sans telechargement ni inscription.",
    url: "https://skilldrills.online/fr/drills/memory/short-term-memory/digit-span",
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test d Empan de Chiffres – Mémoire Numérique | SkillDrills",
    description: "Test d empan de chiffres en ligne gratuit: Retenez des suites de nombres croissantes et evaluez votre boucle phonologique sans telechargement ni inscription.",
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
      "name": "Test d Empan de Chiffres",
      "item": "https://skilldrills.online/fr/drills/memory/short-term-memory/digit-span"
    }
  ]
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test d Empan de Chiffres en Ligne (Digit Span)",
  "url": "https://skilldrills.online/fr/drills/memory/short-term-memory/digit-span",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "dateModified": "2026-09-16",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "description": "Evaluation neuropsychologique de l empan digital et de la boucle phonologique selon les criteres psychometriques standardises."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Test d Empan de Chiffres en Ligne (Digit Span)",
  "url": "https://skilldrills.online/fr/drills/memory/short-term-memory/digit-span",
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
  "name": "Jeu d Empan Numerique – Test de Memoire des Chiffres",
  "url": "https://skilldrills.online/fr/drills/memory/short-term-memory/digit-span",
  "description": "Jeu interactif d evaluation cognitive pour mesurer la capacite de retention numerique a court terme et le chunking.",
  "dateModified": "2026-09-16",
  "gamePlatform": "Web Browser",
  "genre": ["Memory Game", "Cognitive Training", "Brain Training", "Working Memory"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment passer le Test d Empan de Chiffres",
  "description": "Protocole en 4 etapes pour ameliorer sa memorisation de suites numeriques par le regroupement rythmique.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/fr/drills/memory/short-term-memory/digit-span#step-1",
      "name": "Fixez le Centre de l Ecran",
      "text": "Gardez le regard concentre sur la zone centrale pendant l affichage successif des chiffres."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/fr/drills/memory/short-term-memory/digit-span#step-2",
      "name": "Regroupez les Chiffres en Blocs (Chunking)",
      "text": "Subvocalisez les chiffres par doublets ou triplets avec un tempo regulier pour faciliter l encodage."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/fr/drills/memory/short-term-memory/digit-span#step-3",
      "name": "Saisissez la Sequence sans Hesitation",
      "text": "Tapez les chiffres dans l ordre exact a l aide du clavier ou du pave numerique des l affichage de la zone de saisie."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/fr/drills/memory/short-term-memory/digit-span#step-4",
      "name": "Franchissez les Paliers Adaptatifs",
      "text": "Chaque succes ajoute un chiffre supplementaire, vous permettant de mesurer precisement votre empan limite."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu est-ce que le test d empan digital (Digit Span) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le Digit Span est un test neuropsychologique classique utilise dans les echelles de Wechsler (WAIS/WISC). Il evalue la quantite maximale de chiffres qu une personne peut retenir et restituer fidelement dans l ordre de presentation."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est l empan de chiffres normal chez l adulte ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Selon la regle du nombre magique sept (Miller, 1956), la moyenne se situe a 7 plus ou moins 2 chiffres (soit entre 5 et 9 chiffres). Des etudes plus recentes en neurosciences (Cowan, 2001) situent la capacite pure sans strategie a 4 unites."
      }
    },
    {
      "@type": "Question",
      "name": "Qu est-ce que la boucle phonologique selon Baddeley (1974) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La boucle phonologique est le composant de la memoire de travail dedie au maintien des informations verbales et acoustiques. Elle comprend un magasin phonologique passif et un processus de repetition articulatoire active d environ 2 secondes."
      }
    },
    {
      "@type": "Question",
      "name": "Comment le chunking permet-il d augmenter son empan numerique ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En regroupant des chiffres isoles en unites signifiantes (ex. 1-9-8-4 devient une date unique), la memoire ne traite qu un seul bloc au lieu de quatre chiffres distincts, doublant l efficacite du stockage temporaire."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la difference entre empan direct et empan inverse ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L empan direct (mesure ici) teste la capacite de retention passive de la boucle phonologique. L empan inverse exige de restituer les chiffres a l envers, sollicitant plus fortement l administrateur central pour la manipulation mentale."
      }
    },
    {
      "@type": "Question",
      "name": "L entrainement regulier peut-il ameliorer l empan mnemonique ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, une pratique reguliere renforce l automatisme des strategies de regroupement rythmique et accelere la vitesse de repetition subvocale, permettant de retenir davantage d elements dans la fenetre temporelle de 2 secondes."
      }
    },
    {
      "@type": "Question",
      "name": "Comment fonctionne le systeme adaptatif du test ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L algorithme augmente la sequence d un chiffre apres chaque bonne reponse et la reduit d un chiffre en cas d erreur. Ce protocole en escalier converge exactement vers votre capacite limite reelle."
      }
    },
    {
      "@type": "Question",
      "name": "La vitesse de prononciation influe-t-elle sur les resultats ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, plus le debit de repetition articulatoire interne est rapide, plus grand est le nombre de syllabes pouvant etre repetees avant l estompage de la trace mnesique (effet de longueur des mots de Baddeley)."
      }
    },
    {
      "@type": "Question",
      "name": "Peut-on utiliser le pave numerique sur clavier ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, la saisie prend en charge les touches numeriques du clavier physique ainsi que le pave tactile sur mobile pour garantir un temps de reponse optimal sans friction motrice."
      }
    },
    {
      "@type": "Question",
      "name": "Ce test d empan est-il gratuit et anonyme ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, le test est 100% gratuit, sans inscription ni collecte d informations personnelles. Vos scores sont enregistres localement dans votre navigateur."
      }
    }
  ]
};

const digitSpanGuide = {
  heading: "Guide Scientifique de l Empan Digital et de la Memoire de Travail",
  intro: [
    "Le test d empan digital (Digit Span Memory Test) est l evaluation neuropsychologique de reference pour mesurer la memoire de travail verbale, l empan mnesique a court terme et les capacites de traitement phonologique. Employe depuis plus d un siecle en psychologie cognitive et dans les batteries d intelligence clinique, l empan digital permet de quantifier les limites physiques du tampon de retention immediate de l esprit humain.",
    "Les fondements theoriques de l epreuve reposent sur les travaux pionniers de George A. Miller (1956), « The Magical Number Seven, Plus or Minus Two », qui identifiait la capacite brute de la memoire immediate a environ sept elements distincts. David Wechsler (1939, 1955, 2008) a integre l empan digital direct, indirect et sequentiel a l Echelle d Intelligence pour Adultes de Wechsler (WAIS), en faisant l etalon-or clinique de l Indice de Memoire de Travail (IMT).",
    "Dans le modele multicomposant d Alan Baddeley (Baddeley & Hitch, 1974 ; Baddeley, 1986, 2000), les sequences de chiffres sont maintenues dans la boucle phonologique. Le registre phonologique passif conserve les traces acoustiques qui s estompent en 1,5 a 2,0 secondes, a moins d etre continuellement rafraichies par la repetition articulatoire subvocale (« voix interieure »). Nelson Cowan (2001, 2010) a complete ces observations en demontrant que la capacite d attention focale brute non groupee est strictement limitee a 4 ± 1 elements ; l atteinte d empans superieurs repose donc exclusivement sur le regroupement strategique (chunking).",
    "Integrant une chronometrie numerique de haute precision (Woods et al., 2015), cet entrainement mesure avec exactitude votre empan brut et votre cadence de frappe, convergeant vers votre veritable seuil de performance grace a un protocole psychometrique adaptatif en escalier.",
    "Methodologie de mesure : chaque evenement est horodate a l aide de l horloge haute resolution performance.now() du navigateur, directement sur votre appareil sans aucune transmission vers des serveurs externes. Les compteurs du navigateur subissent un lissage delibere contre les failles Spectre (environ 1 ms), et l affichage quantifie chaque transition selon la frequence de rafraichissement de l ecran (environ 16,7 ms par image a 60 Hz) (Woods et al., 2015). Considerez les variations inferieures a 5 ms comme du bruit de mesure et comparez vos resultats sur le meme materiel informatique.",
    "Transparence des donnees : SkillDrills ne collecte aucune donnee consolidee. Vos scores et configurations demeurent exclusivement stockes dans le localStorage de votre navigateur et ne sont jamais televerses ; ainsi, cette plateforme ne publie pas de moyennes globales arbitraires. Chaque donnee chiffree provient directement des publications scientifiques evaluees par des pairs citees dans la section References ci-dessous.",
    "Cet exercice en ligne est un outil ludique d entrainement cerebral et de developpement personnel. Il ne constitue en aucun cas un dispositif medical, un instrument de diagnostic clinique, ni un protocole therapeutique pour les troubles cognitifs. Si vous avez des inquietudes concernant votre memoire ou votre fonctionnement cognitif, consultez un medecin ou un neuropsychologue qualifie."
  ],
  benchmarks: {
    title: "Baremes Neuropsychologiques de l Empan Digital (Population Adulte)",
    headers: ["Palier de Competence", "Empan Atteint", "Score Pondere", "Profil Neuropsychologique"],
    rows: [
      ["Tier 1 (Elite / Memoire Prodigieuse)", "10+ Chiffres", "1 500+ PTS", "Maitrise exceptionnelle du chunking ternaire/quaternaire ; cadence subvocale ultra-rapide"],
      ["Tier 2 (Superieur / Excellent Empan)", "8 – 9 Chiffres", "1 150 – 1 499 PTS", "Excellente boucle phonologique ; capacite de regroupement binaire fluide et reguliere"],
      ["Tier 3 (Moyenne Adulte Standard)", "6 – 7 Chiffres", "750 – 1 149 PTS", "Conforme a la moyenne normative de Miller (1956) ; bonne retention sans regroupement pousse"],
      ["Tier 4 (Sous la Moyenne / Vulnerabilite)", "4 – 5 Chiffres", "400 – 749 PTS", "Plafonnement au seuil unitaire de Cowan (2001) ; difficulte de repetition subvocale rapide"],
      ["Tier 5 (Empan Faible / Declins)", "Moins de 4 Chiffres", "Moins de 400 PTS", "Effacement mnesique premature ; trace phonologique degradee avant la saisie"]
    ],
    note: "Baremes etablis d apres les normes internationales de Wechsler (WAIS-IV) et les etudes de capacite de Miller (1956) et Cowan (2001)."
  },
  techniques: {
    title: "4 strategies eprouvees pour elargir son empan numerique",
    items: [
      {
        name: "Chunking Rythmique (Groupement par 2 ou 3)",
        desc: "Au lieu d enregistrer chaque chiffre independamment, fusionnez-les mentalement en nombres de 2 ou 3 chiffres (ex. 8-4-2 devient huit cent quarante-deux).",
        tips: "Adoptez une cadence melodique constante pour marquer les pauses entre blocs."
      },
      {
        name: "Acceleration de la Subvocalisation",
        desc: "Repetez interieurement la sequence aussi vite que possible pendant l intervalle de pause avant la saisie.",
        tips: "La trace mnesique s efface apres 2 secondes sans rafraichissement phonologique."
      },
      {
        name: "Visualisation sur Clavier Virtuel",
        desc: "Imaginez le cheminement de votre doigt sur un pave numerique 3x3 pour doubler l encodage auditif d une trace motrice et spatiale.",
        tips: "Mobilise le calepin visuo-spatial comme second canal de secours."
      },
      {
        name: "Ancrage des Extreinites (Effet de Primauté et de Récence)",
        desc: "Le premier et le dernier chiffre sont les plus faciles a retenir ; concentrez 80% de votre attention sur les chiffres situes au milieu de la suite.",
        tips: "Compensez la chute d attention centrale typique de la courbe de position serielle."
      }
    ]
  },
  steps: [
    "Positionnez vos mains sur le clavier et fixez le repere visuel central.",
    "Regardez defiler les chiffres et repetez-les mentalement avec une intonation rythmee.",
    "Dès que la boite de dialogue s active, tapez les chiffres dans l ordre sans hesiter.",
    "Poursuivez la montee des echelons pour determiner votre empan numerique maximal."
  ],
  audience: "Etudiants preparant des examens, professionnels sous forte charge mentale, passionnes d entrainement cerebral et personnes souhaitant preserver leur acuite cognitive.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('miller1956', 'cowan2001', 'baddeley1974', 'baddeley2000', 'logie1995', 'woods2015'),
  related: [
    { href: "/fr/drills/memory/short-term-memory/color-sequence", label: "Jeu Simon des Couleurs" },
    { href: "/fr/drills/memory/short-term-memory/word-recall", label: "Test de Memoire Verbale" },
    { href: "/fr/drills/memory/spatial-memory/grid-memorization", label: "Memoire Spatiale sur Grille" },
    { href: "/fr/drills/memory/spatial-memory/object-location", label: "Localisation d Objets" },
    { href: "/fr/drills/memory/working-memory/n-back", label: "Test Dual N-Back" }
  ]
};

export default function FrenchDigitSpanPage() {
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
      <DigitSpanClient copy={{
        digitLabel: "Chiffres",
        scoreLabel: "Score",
        timeLeftLabel: "Temps",
        recallTitle: "RESTITUEZ LA SEQUENCE",
        memorizeTitle: "MEMORISEZ LA SEQUENCE",
        evaluating: "Evaluation...",
        startTitle: "Test d Empan Pro",
        startSubtitle: "Memoire Numerique a Court Terme • Empan de Chiffres",
        countdownSubtitle: "PREPAREZ-VOUS",
        newBest: "NOUVEAU RECORD",
        pointsLabel: "Points",
        statAccuracy: "Precision",
        statPeakSpan: "Empan Max",
        statPerfects: "Parfaits",
        btnPlayAgain: "Rejouer",
        rulesTitle: "Instructions de l Exercice et Bareme",
        rulesItems: [
          {
            num: "1",
            text: "Retention de Chiffres",
            highlight: "+100 PTS",
            result: "Memorisez la sequence numerique et tapez-la au clavier"
          },
          {
            num: "2",
            text: "Bonus d Empan",
            highlight: "Jusqu a +120% PTS",
            result: "Les sequences plus longues rapportent plus de points par reussite"
          },
          {
            num: "3",
            text: "Erreur / Temps Ecoule",
            highlight: "-1 Chiffre",
            result: "Aucune perte de points ; recul d un chiffre pour recalibrer"
          },
          {
            num: "4",
            text: "Escalier Adaptatif",
            highlight: "Ajustement continu",
            result: "Converge fidelement vers votre limite reelle d empan"
          }
        ]
      }} />
      <DrillGuide guide={digitSpanGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/short-term-memory/digit-span"
          locale="fr"
        />
      </div>
    </>
  );
}
