import DistractionFighterClient from '@/app/drills/cognitive/focus/distraction-fighter/DistractionFighterClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test de Stroop en Ligne – Attention | SkillDrills",
  description: "Test de Stroop gratuit en ligne: évaluez votre inhibition cognitive et votre attention sélective en nommant la couleur de police sans lire le mot écrit.",
  keywords: [
    "test de stroop",
    "test de stroop en ligne",
    "effet stroop",
    "test attention selective",
    "inhibition cognitive test",
    "test couleurs et mots",
    "interference de stroop psychologie",
    "exercices de concentration mentale",
    "flexibilite cognitive entrainement",
    "test psychologique stroop gratuit",
    "vitesse de traitement mental test",
    "jeu d attention et de reflexes en ligne"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/cognitive/focus/distraction-fighter",
    languages: getAlternateLanguages('/drills/cognitive/focus/distraction-fighter')
  },
  openGraph: {
    title: "Test de Stroop en Ligne – Attention | SkillDrills",
    description: "Test de Stroop gratuit en ligne: évaluez votre inhibition cognitive et votre attention sélective en nommant la couleur de police sans lire le mot écrit.",
    url: "https://skilldrills.online/fr/drills/cognitive/focus/distraction-fighter",
    siteName: "SkillDrills",
    locale: "fr_FR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Test de Stroop en Ligne – Attention | SkillDrills",
    description: "Test de Stroop gratuit en ligne: évaluez votre inhibition cognitive et votre attention sélective en nommant la couleur de police sans lire le mot écrit."
  }
};

export default function DistractionFighterPageFR() {
  const sources = pickSources('stroop1935', 'macleod1991', 'logan1984', 'posner1990', 'woods2015');

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://skilldrills.online/fr" },
      { "@type": "ListItem", "position": 2, "name": "Entraînement Cognitif", "item": "https://skilldrills.online/fr/drills/cognitive" },
      { "@type": "ListItem", "position": 3, "name": "Test de Stroop", "item": "https://skilldrills.online/fr/drills/cognitive/focus/distraction-fighter" }
    ]
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Test de Stroop Trainer",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Entraînement neurocognitif de contrôle exécutif et d inhibition des automatismes par le test d interférence couleur-mot de Stroop."
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Test de Stroop en Ligne Interactif",
    "url": "https://skilldrills.online/fr/drills/cognitive/focus/distraction-fighter",
    "applicationCategory": "TrainingTool",
    "browserRequirements": "Requires JavaScript. HTML5 Canvas compatible."
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Défi d Inhibition Cognitive de Stroop",
    "gamePlatform": "Web Browser",
    "genre": ["Brain Training", "Cognitive Drill", "Focus Training"]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Comment Passer le Test de Stroop en Ligne",
    "description": "Protocole pour désactiver la lecture automatique et discriminer la couleur de police.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Fixation Visuelle du Terme",
        "text": "Portez votre regard sur le mot sans prononcer intérieurement sa signification textuelle."
      },
      {
        "@type": "HowToStep",
        "name": "Inhibition du Réflexe de Lecture",
        "text": "Bloquez l automatisme de lecture sémantique et isolez la couleur physique du tracé."
      },
      {
        "@type": "HowToStep",
        "name": "Sélection de la Couleur",
        "text": "Cliquez sur le bouton désignant la couleur réelle de la police avant la fin du décompte."
      },
      {
        "@type": "HowToStep",
        "name": "Enchaînement Régulier",
        "text": "Conservez une cadence stable pendant 45 secondes afin d optimiser votre multiplicateur de points."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Qu est-ce que l effet Stroop et quelle en est la cause?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "C est le ralentissement observé lors de la dénomination de la couleur d un mot lorsque celui-ci exprime une couleur divergente. Il s explique par la primauté de la lecture automatique sur la reconnaissance volontaire des couleurs."
        }
      },
      {
        "@type": "Question",
        "name": "Quelles zones cérébrales régulent ce conflit d attention?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La régulation mobilise le cortex cingulaire antérieur (ACC), sentinelle des conflits cognitifs, et le cortex préfrontal dorsolatéral (DLPFC), chef d orchestre du contrôle attentionnel descendant."
        }
      },
      {
        "@type": "Question",
        "name": "Pourquoi la lecture prend-elle le pas sur la couleur?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La lecture de mots courants est un automatisme ancré par des années de pratique, qui s active plus rapidement que l analyse intentionnelle de la couleur."
        }
      },
      {
        "@type": "Question",
        "name": "Quel est l intérêt pour les athlètes et les joueurs d esports?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Il développe la capacité de bloquer les leurres visuels et d éliminer les tirs réflexes intempestifs en situation de stress intense."
        }
      },
      {
        "@type": "Question",
        "name": "Combien de temps faut-il s entraîner chaque jour?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Des séries de 5 à 10 minutes par jour en sessions courtes de 45 secondes suffisent à stimuler la plasticité frontale sans causer de fatigue mentale."
        }
      },
      {
        "@type": "Question",
        "name": "L effet Stroop s estompe-t-il avec l entraînement régulier?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le temps de latence se réduit significativement, mais l automatisme de lecture reste gravé et ne disparaît jamais intégralement chez un individu alphabétisé."
        }
      },
      {
        "@type": "Question",
        "name": "Existe-t-il une méthode pour réduire l interférence?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fixer le bord ou l empattement d une lettre isolée plutôt que le mot entier permet d atténuer l activation involontaire des réseaux linguistiques."
        }
      },
      {
        "@type": "Question",
        "name": "Comment le calcul de points s effectue-t-il?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le score combine la rapidité de clic en millisecondes, la régularité sans faute et l accumulation des multiplicateurs de combo successifs."
        }
      },
      {
        "@type": "Question",
        "name": "Les personnes daltoniennes peuvent-elles utiliser ce module?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Un daltonisme sévère peut poser des difficultés sur certains tons, mais l interface emploie des teintes très contrastées pour faciliter la distinction."
        }
      },
      {
        "@type": "Question",
        "name": "Quel impact ce test a-t-il sur la concentration au quotidien?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Il renforce le bouclier inhibiteur frontal, rendant plus aisé d ignorer les notifications, les discussions environnantes et les distractions numériques."
        }
      }
    ]
  };

  const guide = {
    title: "Guide Scientifique du Test de Stroop et Neurobiologie de l Inhibition",
    intro: [
      "L effet Stroop, documenté pour la première fois par J. Ridley Stroop (1935), est l une des manifestations les plus étudiées de la psychologie cognitive. Lorsque la couleur de la police contredit le texte (par exemple, le mot 'ROUGE' affiché en bleu), la vitesse de réponse chute et le taux d erreur grimpe en flèche.",
      "Ce décalage provient de la dissymétrie de vitesse entre automatismes et processus contrôlés: lire est une compétence hyper-automatisée chez l adulte (MacLeod, 1991). Suivant le modèle de Logan & Cowan (1984), le réflexe de lecture l emporte sur la désignation de la couleur à moins que les structures préfrontales ne déclenchent un freinage inhibiteur précoce.",
      "Les recherches en imagerie démontrent le rôle central du cortex cingulaire antérieur et du cortex préfrontal dorsolatéral dans la résolution de ce conflit. Un entraînement ciblé consolide l attention sélective et le filtrage des distracteurs sous contrainte de temps.",
      "Méthodologie chronométrique: chaque événement est horodaté via l'horloge haute précision performance.now() du navigateur, directement sur votre terminal. Les navigateurs intègrent une limitation délibérée pour parer aux failles matérielles de type Spectre (résolution d'environ 1 ms), et votre écran quantifie chaque rafraîchissement: environ 16,7 ms par image à 60 Hz, 6,9 ms à 144 Hz et 4,1 ms à 240 Hz (Woods et al., 2015). Évaluez votre progression sur un même matériel plutôt que de comparer des valeurs brutes entre configurations hétérogènes.",
      "Transparence des données et avertissement éducatif: SkillDrills ne collecte aucune donnée agrégée et ne transmet aucun historique à des serveurs tiers. Vos scores et préférences résident exclusivement dans le localStorage de votre navigateur. Ce module constitue un jeu d'entraînement cognitif à vocation pédagogique et ludique; il ne s'agit pas d'un dispositif médical, d'un outil de diagnostic ou de dépistage du TDAH ou d'autres troubles cognitifs."
    ],
    benchmarks: {
      title: "Repères de Performance au Test de Stroop (Session de 45 Secondes)",
      headers: ["Niveau de Maîtrise", "Score (45s)", "Taux de Précision", "Évaluation Neurocognitive"],
      rows: [
        ["Tier 1 (Élite / Maître de l Inhibition)", "18.000+ PTS", "96%+", "Contrôle des impulsions parfait; blocage réflexe de la lecture avec réactivité maximale."],
        ["Tier 2 (Avancé / Niveau Compétition)", "12.000 – 17.999 PTS", "92% – 95%", "Interférence minimale; cadence stable avec remarquable flexibilité cognitive."],
        ["Tier 3 (Moyen / Pratiquant Régulier)", "7.000 – 11.999 PTS", "85% – 91%", "Latence d interférence saine standard; hésitations ponctuelles sur fortes oppositions."],
        ["Tier 4 (Base / Attention Discontinue)", "3.000 – 6.999 PTS", "75% – 84%", "Domination du réflexe de lecture; fort ralentissement quand le rythme s accélère."],
        ["Tier 5 (Débutant / Forte Impulsivité)", "< 3.000 PTS", "< 75%", "Fautes fréquentes et temps dépassé; sensibilité prononcée à la fatigue mentale."]
      ],
      note: "Barèmes établis sur des sessions de 45 secondes avec complexité dynamique et délais de réponse rétrécis (Stroop, 1935; Woods et al., 2015)."
    },
    techniques: {
      title: "4 Stratégies pour Surmonter l'Interférence de Stroop",
      items: [
        {
          name: "Focalisation périphérique sur les contours de lettres",
          desc: "Ne lisez pas le mot dans sa globalité; fixez l'extrémité d'une seule lettre pour neutraliser le décodage automatique des aires visuo-linguistiques.",
          tips: "Traitez le signe graphique comme une forme géométrique colorée."
        },
        {
          name: "Inhibition de la subvocalisation interne",
          desc: "Prononcer mentalement le mot sature la boucle phonologique et retarde l'action. Liez directement le signal chromatique à la réponse motrice du doigt.",
          tips: "Détendez la mâchoire et maintenez une respiration fluide."
        },
        {
          name: "Gestion du tempo et préservation du combo",
          desc: "Les clics impulsifs précipités détruisent votre série de multiplicateurs. Un tempo régulier et méthodique garantit le meilleur score final.",
          tips: "Donnez toujours la priorité à l'exactitude avant la vitesse brute."
        },
        {
          name: "Entraînement fractionné à la résistance aux distracteurs",
          desc: "L'inhibition cognitive sollicite intensément le cortex préfrontal. Des blocs quotidiens de 3 à 5 minutes favorisent une meilleure régulation de l'attention sans fatigue excessive.",
          tips: "Idéal comme échauffement neurocognitif avant une session de travail exigeante."
        }
      ]
    },
    steps: [
      "Fixez le mot affiché au centre sans chercher à le décoder vocalement.",
      "Freinez le réflexe de lecture et ciblez uniquement la teinte de l'encre.",
      "Appuyez sur le bouton de couleur correspondant à l'encre affichée.",
      "Enchaînez les réponses justes pour alimenter le combo et progresser dans les paliers de difficulté."
    ],
    audience: "Étudiants, cadres en open space, esportifs et toute personne souhaitant renforcer son filtrage attentionnel face aux sollicitations numériques.",
    faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources
  };

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

      <DistractionFighterClient
        copy={{
          title: "Test de Stroop",
          subtitle: "Interférence Couleur-Mot & Inhibition Cognitive",
          caption: "Nommez la couleur de police et ignorez le sens du mot. L interférence entre lecture automatique et identification de couleur mesure votre contrôle inhibiteur exécutif (Stroop, 1935).",
          stageCaption: "Cliquez sur le bouton de la couleur de police et ignorez le mot contradictoire.",
          rulesTitle: "Consignes de l Exercice et Système de Points",
          aboutTitle: "À Propos du Test de Stroop et du Contrôle Inhibiteur",
          aboutText: "L effet Stroop caractérise le délai pour nommer la couleur d un mot lorsque l encre et le sens s opposent (Stroop, 1935; MacLeod, 1991).\n\nLire est un automatisme profond. Le cortex préfrontal doit freiner volontairement la lecture pour laisser place à la perception chromatique.\n\nUn entraînement régulier aide à ignorer les bruits et interruptions de l environnement.",
          aboutCards: [
            { title: "Public Conseillé", desc: "Professionnels en espaces ouverts, étudiants et joueurs de jeux d action compétitifs.", color: "bg-blue-600" },
            { title: "Qualités Développées", desc: "Résistance à l interférence, inhibition cognitive, attention focalisée et maîtrise des impulsions.", color: "bg-emerald-600" },
            { title: "Contrôle Inhibiteur", desc: "Freinez le réflexe de lecture et ciblez les teintes avec précision sous cadence rapide.", color: "bg-purple-600" }
          ],
          rulesItems: [
            { title: "Interférence de Stroop", text: "Un mot s affiche (ex: 'JAUNE') avec une couleur de police distincte (ex: bleu)." },
            { title: "Règle de Choix", text: "Cliquez sur le bouton de la COULEUR DE POLICE (Bleu) sans lire le mot (+100 Pts x Combo x Niveau, +0,6s)." },
            { title: "Erreurs", text: "Une faute remet le combo à zéro et fait perdre du temps. La manche prend fin à l écoulement du chronomètre." },
            { title: "Séries Réussies", text: "Enchaîner les réussites multiplie vos points alors que la variété de couleurs augmente." }
          ]
        }}
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
      <DrillGuide guide={guide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="cognitive"
          currentHref="/drills/cognitive/focus/distraction-fighter"
          locale="fr"
        />
      </div>
    </>
  );
}
