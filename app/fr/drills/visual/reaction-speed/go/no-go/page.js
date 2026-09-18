import ChromaSyncClient from '@/app/drills/visual/reaction-speed/go/no-go/ChromaSyncClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test Go No-Go: Inhibition Motrice & Impulsion | SkillDrills",
  description: "Test Go No-Go gratuit en ligne. Cliquez sur les cibles vertes et retenez le tir sur cibles rouges. Mesurez frein moteur et contrôle de l'impulsivité.",
  keywords: [
    "test go no-go en ligne",
    "test d'inhibition motrice",
    "contrôle de l'impulsivité test",
    "tâche go no-go neuropsychologie",
    "discipline de tir fps",
    "fonctions exécutives cortex préfrontal",
    "tâche signal d'arrêt stop signal",
    "inhibition de la réponse comportementale",
    "erreurs de commission et omission",
    "entraînement réflexe et frein moteur",
    "tâche d'attention soutenue sart",
    "chronométrie mentale donders"
  ],
  openGraph: {
    title: "Test Go No-Go: Inhibition Motrice & Impulsion | SkillDrills",
    description: "Réagissez au vert et stoppez net au rouge. Évaluez votre frein moteur préfrontal gratuitement en ligne.",
    type: 'article',
    url: 'https://skilldrills.online/fr/drills/visual/reaction-speed/go/no-go',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test Go No-Go: Inhibition Motrice & Impulsion | SkillDrills",
    description: "Test neurocognitif Go/No-Go gratuit en ligne pour développer discipline de tir et contrôle de l'impulsivité.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/visual/reaction-speed/go/no-go',
    languages: getAlternateLanguages('/drills/visual/reaction-speed/go/no-go'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://skilldrills.online/fr" },
    { "@type": "ListItem", "position": 2, "name": "Catalogue des Drills", "item": "https://skilldrills.online/fr/drills" },
    { "@type": "ListItem", "position": 3, "name": "Entraînement Visuel", "item": "https://skilldrills.online/fr/drills/visual" },
    { "@type": "ListItem", "position": 4, "name": "Vitesse de Réaction", "item": "https://skilldrills.online/fr/drills/visual/reaction-speed" },
    { "@type": "ListItem", "position": 5, "name": "Test Go/No-Go Contrôle de l'Impulsion", "item": "https://skilldrills.online/fr/drills/visual/reaction-speed/go/no-go" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test Go/No-Go d'Inhibition de Réponse",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/fr/drills/visual/reaction-speed/go/no-go",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "description": "Test neurocognitif Go/No-Go interactif pour évaluer le frein moteur préfrontal, les erreurs de commission et la discipline de tir.",
  "featureList": [
    "Chronométrie en millisecondes via l'API performance.now()",
    "Rétrécissement dynamique de la fenêtre d'affichage pour sonder la retenue motrice",
    "Mesure différentielle des erreurs de commission (faux positifs) et d'omission",
    "Enregistrement 100% local dans le navigateur sans téléométrie externe"
  ],
  "dateModified": "2026-09-05"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Test Go/No-Go d'Inhibition de Réponse | SkillDrills",
  "alternateName": "Go/No-Go Pro",
  "url": "https://skilldrills.online/fr/drills/visual/reaction-speed/go/no-go",
  "dateModified": "2026-09-05",
  "description": "Test Go/No-Go gratuit en ligne. Réagissez aux disques verts et retenez votre clic sur les disques rouges No-Go.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Navigateur moderne supportant HTML5 Canvas.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Inhibition de Réponse, Frein Moteur, Contrôle de l'Impulsivité, Discipline de Tir, Fonctions Exécutives"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Drill Go/No-Go d'Inhibition Motrice",
  "url": "https://skilldrills.online/fr/drills/visual/reaction-speed/go/no-go",
  "description": "Jeu neurocognitif pour fortifier le frein moteur et la discipline de tir réflexe.",
  "genre": ["Action", "Brain Game", "Reaction Speed"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment Réaliser le Test Go/No-Go d'Inhibition de Réponse",
  "dateModified": "2026-09-05",
  "description": "Protocole en 4 étapes pour évaluer et optimiser l'inhibition motrice et la maîtrise des impulsions selon le modèle Go/No-Go.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Fixer le Regard sur le Réticule Central",
      "text": "Placez vos yeux sur le point central de l'écran où jaillissent les disques cibles, en adoptant une posture visuelle posée.",
      "url": "https://skilldrills.online/fr/drills/visual/reaction-speed/go/no-go#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Cliquer au Plus Vite sur les Cibles Vertes GO",
      "text": "Appuyez sur la souris ou la barre d'espace dès que le disque vert émeraude clignote (+150 PTS × Combo).",
      "url": "https://skilldrills.online/fr/drills/visual/reaction-speed/go/no-go#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Bloquer Instantanément le Geste sur les Cibles Rouges NO-GO",
      "text": "Immobilisez votre doigt et retenez toute impulsion dès que le disque rouge rubis apparaît (+100 PTS pour la retenue).",
      "url": "https://skilldrills.online/fr/drills/visual/reaction-speed/go/no-go#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Maintenir la Discipline de Tir à Cadence Élevée",
      "text": "Au fil de votre série, le délai d'affichage se réduit à 100 ms, sollicitant au maximum votre frein moteur préfrontal.",
      "url": "https://skilldrills.online/fr/drills/visual/reaction-speed/go/no-go#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-05",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu'est-ce que le test Go/No-Go et que mesure-t-il sur le plan neurocognitif ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le test Go/No-Go est une épreuve neurocognitive standardisée évaluant l'inhibition de réponse motrice, l'attention sélective et le contrôle de l'impulsivité. Il demande de réagir rapidement à des stimuli fréquents (Go) tout en retenant activement son geste face à des stimuli rares (No-Go)."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la différence entre une erreur de commission et une erreur d'omission ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Une erreur de commission (faux positif) survient lorsqu'on clique par mégarde sur une cible rouge No-Go, signalant une défaillance du frein inhibiteur. Une erreur d'omission survient lorsqu'on rate une cible verte Go, révélant une baisse de l'attention soutenue."
      }
    },
    {
      "@type": "Question",
      "name": "Qu'est-ce que le modèle de la course de chevaux (Horse-Race Model) de Logan ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Développé par Logan et collaborateurs (1984), ce modèle envisage l'inhibition comme une course entre deux flux cérébraux distincts : le processus Go (excitation motrice) et le processus Stop (freinage préfrontal). Si le processus Stop franchit le seuil le premier, le geste est bloqué."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi clique-t-on impulsivement sur le rouge malgré la consigne d'arrêt ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ce phénomène provient de l'amorçage moteur prépotent. La succession des cibles Go surchauffe le cortex moteur. La luminance du stimulus atteignant le cortex visuel avant la couleur dans l'aire V4, le doigt s'active avant que le cortex frontal ne freine le geste."
      }
    },
    {
      "@type": "Question",
      "name": "Quels sont les bénéfices de l'entraînement Go/No-Go pour les jeux de tir tactiques (FPS) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dans des jeux tels que Valorant, CS2 ou Rainbow Six Siege, la discipline de tir prévient les tirs réflexes sur des alliés ou des fumigènes, préservant votre placement. L'exercice découple la détection visuelle brute du déclenchement mécanique du doigt."
      }
    },
    {
      "@type": "Question",
      "name": "Quelles structures cérébrales pilotent le frein moteur inhibiteur ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ce freinage s'exécute par la voie hyperdirecte connectant le cortex frontal inférieur droit (rIFC), l'aire motrice pré-supplémentaire (preSMA) et le noyau sous-thalamique (STN) au sein des ganglions de la base (Aron et al., 2014)."
      }
    },
    {
      "@type": "Question",
      "name": "La capacité d'inhibition de la réponse peut-elle être développée par l'entraînement ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. La recherche en neuroplasticité démontre que des sessions ciblées renforcent les circuits fronto-striataux, réduisant le temps de réaction au signal d'arrêt (SSRT) et accroissant l'autocontrôle."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est l'impact de la fréquence de rafraîchissement de l'écran et du polling de la souris ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un écran 60 Hz engendre jusqu'à 16,7 ms de latence d'affichage, alors qu'un écran 144 Hz ou 240 Hz l'abaisse à 6,9 ms et 4,1 ms. Jumelé à une souris 1 000 Hz, cela offre un délai précieux pour identifier la couleur et stopper le tir."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le protocole d'entraînement quotidien idéal pour aiguiser le contrôle des impulsions ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Deux à trois séances courtes de 3 à 5 minutes par jour suffisent. Des entraînements trop prolongés induisent une fatigue des transmetteurs préfrontaux, augmentant les fautes d'impulsivité."
      }
    },
    {
      "@type": "Question",
      "name": "Mes données de temps de réaction et de taux d'erreur sont-elles enregistrées sur un serveur externe ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non. L'ensemble des métriques de temps, combos et scores demeure strictement cantonné à la mémoire locale de votre navigateur, sans aucun suivi ni transfert de données."
      }
    }
  ]
};

const goNoGoGuide = {
  heading: "Standards Scientifiques d'Inhibition Motrice et de Contrôle Préfrontal",
  intro: [
    "L'inhibition de réponse constitue la fonction exécutive maîtresse permettant d'interrompre, de différer ou de suspendre des actes moteurs devenus inadaptés ou risqués. Dans les sports de combat, l'esport tactique et la conduite d'urgence, la faculté d'endiguer un geste réflexe prépotent est bien plus capitale que la vitesse brute d'exécution.",
    "Ce paradigme s'enracine dans les travaux de Franciscus Cornelis Donders (1868) sur la méthode soustractive de la 'Réaction-C'. Donders démontra qu'identifier deux stimuli et ne répondre qu'à un seul mobilise un délai cognitif distinct par rapport au temps de réaction simple.",
    "En 1984, Gordon D. Logan et ses collaborateurs formulèrent le modèle de la course de chevaux ('Horse-Race Model'), décrivant l'inhibition comme un duel entre un flux d'activation Go et un flux d'arrêt Stop. Les recherches en IRMf (Aron et al., 2014) prouvent que cette retenue est commandée par la voie hyperdirecte liant le cortex frontal inférieur droit (rIFC) au noyau sous-thalamique (STN).",
    "Précision Chronométrique et Étalonnage : L'apparition des stimuli et les clics sont horodatés via l'API haute précision performance.now(). Les délais d'affichage et d'interrogation USB sont pris en compte selon les préconisations scientifiques (Woods et al., 2015), tout en assurant un traitement exclusivement local."
  ],
  benchmarks: {
    title: "Grille de Performance en Inhibition de Réponse (Repères Neurocognitifs)",
    headers: ["Palier de Performance", "Taux d'Erreurs de Commission (CER)", "Score & Seuil de Combo", "Profil Neuromusculaire et Exécutif"],
    rows: [
      ["Tier 1: Freinage Exécutif Apex", "< 2.0% CER", "16 000+ PTS | Combo 30x+", "Inhibition motrice hyperdirecte rIFC-STN parfaite ; découplage absolu entre flash visuel et déclenchement moteur."],
      ["Tier 2: Inhibition de Réponse Supérieure", "2.0% – 4.9% CER", "11 000 – 15 999 PTS | Combo 20x+", "Excellente discipline de tir ; rétablissement immédiat lors des changements de couleur avec anticipation minimale."],
      ["Tier 3: Standard Adulte Équilibré", "5.0% – 9.9% CER", "6 500 – 10 999 PTS | Combo 12x+", "Traitement fiable des cibles Go avec faux positifs sporadiques sous cadence soutenue."],
      ["Tier 4: Impulsivité Modérée", "10.0% – 18.0% CER", "3 000 – 6 499 PTS | Combo 6x+", "Amorçage moteur prepotent marqué ; réflexe d'enclencher le doigt dès l'apparition visuelle avant identification de la couleur."],
      ["Tier 5: Prépondérance Prepotente (Base)", "> 18.0% CER", "< 3 000 PTS | Combo < 6x", "Impulsivité comportementale prononcée ; incapacité à bloquer les tirs balistiques face aux cibles rouges No-Go."]
    ],
    note: "Ces paliers constituent des repères établis à partir des publications sur la chronométrie mentale et l'inhibition motrice (Donders, 1868 ; Logan et al., 1984 ; Robertson et al., 1997 ; Aron et al., 2014). Les scores varient selon la fatigue, les stimulants et l'écran."
  },
  techniques: {
    title: "Méthodes pour Développer le Contrôle des Impulsions",
    items: [
      {
        name: "Validation Chromatique Avant Déclenchement",
        desc: "Les signaux de luminance et de mouvement parviennent au cortex visuel primaire avant que la couleur ne soit résolue dans l'aire V4 (Donders, 1868).",
        tips: "Ne contractez pas le muscle à la simple apparition du flash ; habituez votre cortex moteur à attendre la confirmation du vert émeraude."
      },
      {
        name: "Réinitialisation du Frein selon le Horse-Race Model",
        desc: "Si le processus Stop s'enclenche avant que le potentiel Go n'atteigne le seuil critique, la commande est neutralisée dans la moelle (Logan et al., 1984).",
        tips: "Conservez le doigt souple au-dessus de la souris. Un avant-bras détendu permet au frein nerveux d'agir sans résistance mécanique."
      },
      {
        name: "Rupture de l'Automatisme Rhythmique",
        desc: "La répétition de cibles Go plonge le cerveau dans un rythme mécanique involontaire, démultipliant les faux pas sur les cibles No-Go (Robertson et al., 1997).",
        tips: "Abordez chaque apparition comme un stimulus totalement isolé et fixez attentivement le réticule central entre chaque cycle."
      },
      {
        name: "Optimisation du Matériel et Faible Latence",
        desc: "Sur des créneaux de 160 ms, un moniteur 60 Hz gaspille jusqu'à 16,7 ms de temps précieux de décision (Woods et al., 2015).",
        tips: "Privilégiez un écran 144 Hz ou 240 Hz et une souris réglée à 1 000 Hz pour éliminer tout retard parasite."
      }
    ]
  },
  steps: [
    "Cliquez sur Démarrer le Drill pour lancer la session de 45 secondes de Go/No-Go.",
    "Fixez votre regard sur le réticule central où apparaissent les cibles lumineuses.",
    "Cliquez aussitôt que le disque vert GO surgit pour engranger points et combo.",
    "Bloquez tout clic et demeurez immobile dès que le disque rouge NO-GO se manifeste pour marquer les points de retenue.",
    "Consultez votre taux d'erreurs de commission, votre latence moyenne et votre grade final à la fin du chrono."
  ],
  audience: "Joueurs de FPS tactiques (Valorant, CS2, Siege) cherchant à perfectionner leur discipline de tir, pilotes, combattants d'arts martiaux et toute personne désireuse de muscler son frein moteur et son contrôle préfrontal.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('donders1868', 'logan1984', 'robertson1997', 'aron2014', 'woods2015'),
  related: [
    { href: "/fr/drills/visual/reaction-speed/light-reaction", label: "Test de Réaction Lumineuse" },
    { href: "/fr/drills/visual/depth-perception/distance-judgment", label: "Jugement de Distance et Perception de Profondeur" },
    { href: "/fr/drills/visual/tracking-accuracy/moving-target", label: "Interception de Cible Mobile" },
    { href: "/fr/drills/visual/tracking-accuracy/multiple-targets", label: "Poursuite d'Objets Multiples" },
    { href: "/fr/drills/visual/tracking-accuracy/pursuit-tracker", label: "Traqueur de Poursuite Oculaire Lente" },
    { href: "/fr/drills/visual/visual-recognition/entropic-grid", label: "Recherche sur Grille Entropique" }
  ]
};

export default function ChromaSyncPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <ChromaSyncClient copy={{ title: "Test Go No-Go: Inhibition Motrice & Impulsion" }} />
      <DrillGuide guide={goNoGoGuide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/fr/drills/visual/reaction-speed/go/no-go" />
      </div>
    </>
  );
}
