import SplitScreenTrackingClient from '@/app/drills/visual-tracking/split-screen-tracking/SplitScreenTrackingClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Poursuite sur Écran Scindé – SkillDrills",
  description: "Entrainez lattention visuelle divisee en suivant deux cibles orthogonales simultanees sur ecran scinde. Exercice bilateral gratuit et en ligne.",
  keywords: [
    "entrainement attention divisee ecran divise",
    "poursuite visuelle sur ecran scinde",
    "exercice oculaire attention bilaterale",
    "vision peripherique simultanee",
    "poursuite orthogonale double cible",
    "suivi de cibles multiples mot",
    "eliminer vision tunnel exercice",
    "coordination visuelle bihemispherique",
    "poursuite visuelle ecran partage",
    "agilite visuelle attention diffuse",
    "exercice de focalisation peripherique",
    "entrainement vision peripherique esport"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/visual-tracking/split-screen-tracking",
    languages: getAlternateLanguages('/drills/visual-tracking/split-screen-tracking'),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Poursuite sur Écran Scindé – SkillDrills",
    description: "Entrainez lattention visuelle divisee en suivant deux cibles orthogonales simultanees sur ecran scinde. Exercice bilateral gratuit et en ligne.",
    url: "https://skilldrills.online/fr/drills/visual-tracking/split-screen-tracking",
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Poursuite sur Écran Scindé – SkillDrills",
    description: "Entrainez lattention visuelle divisee en suivant deux cibles orthogonales simultanees sur ecran scinde. Exercice bilateral gratuit et en ligne.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://skilldrills.online/fr"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Exercices",
      "item": "https://skilldrills.online/fr/drills"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Poursuite Visuelle",
      "item": "https://skilldrills.online/fr/drills/visual-tracking"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Poursuite sur Écran Scindé",
      "item": "https://skilldrills.online/fr/drills/visual-tracking/split-screen-tracking"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Poursuite sur Écran Scindé",
  "operatingSystem": "Navigateur Web",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "description": "Application dentrainement visuel developpant lattention divisee bimodal et le suivi parallele de trajectoires orthogonales."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Exercice de Poursuite sur Écran Scindé",
  "url": "https://skilldrills.online/fr/drills/visual-tracking/split-screen-tracking",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "Tous les navigateurs modernes",
  "browserRequirements": "Nécessite le support de JavaScript et HTML5 Canvas"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Split-Screen Tracking",
  "description": "Exercice dattention visuelle bimanuelle exigeant la surveillance simultanee de deux cibles en translation orthogonale.",
  "genre": ["Entraînement Visuel", "Attention Divisée", "Entraînement des Réflexes"],
  "playMode": "SinglePlayer",
  "gamePlatform": "Navigateur Web"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment Entraîner l'Attention Divisée sur Écran Scindé",
  "description": "Protocole methodologique pour etendre lattention peripherique et suivre deux trajectoires orthogonales sans saccades parasites.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Ancrez le Regard sur la Ligne Centrale",
      "text": "Placez-vous a 50-70 cm de votre ecran et maintenez un regard detendu sur la separation mediane scindant les deux zones."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Étendez l'Attention Périphérique Bimodale",
      "text": "Elargissez lattention spatiale aux deux hemispheres sans deplacer laxe des yeux en exploitant les batonnets retinotopiques."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Dissociez les Trajectoires Orthogonales",
      "text": "Analysez lossillation verticale a gauche et lallongement horizontal a droite comme deux composantes distinctes."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Supprimez l'Alternance Saccadique",
      "text": "Evitez de faire rebondir le regard dun cote a lautre pour ne pas creer de suppression saccadique genante."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu'est-ce que l'exercice Split-Screen Tracking ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le Split-Screen Tracking entraine lattention divisee en contraignant le systeme visuel a surveiller deux cibles se deplacant sur des axes orthogonaux dans des champs separes."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi l'oeil ne peut-il pas foveer deux cibles simultanement ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La fovea centrale nenglobe quun champ minuscule de 1 a 2 degres. La poursuite simultanee repose donc sur lattention spatiale peripherique (Pylyshyn & Storm, 1988)."
      }
    },
    {
      "@type": "Question",
      "name": "Qu'est-ce que l'avantage de l'hémichamp bilatéral ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En attribuant une cible a chaque hemichamp, chaque hemisphere cerebral traite sa trajectoire en parallele, doublant les capacites attentionnelles (Alvarez & Cavanagh, 2005)."
      }
    },
    {
      "@type": "Question",
      "name": "En quoi consiste la suppression saccadique ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Durant les mouvements saccadiques brusques, la perception visuelle est attenuee pendant 20 a 50 ms, induisant des micro-trous noirs visuels lors des allers-retours."
      }
    },
    {
      "@type": "Question",
      "name": "Quel avantage pour les joueurs de jeux de tir (FPS) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dans des jeux tels que Valorant ou Apex Legends, il permet daligner le viseur au centre tout en gardant un oeil aiguise sur la minicarte et les flancs (Green & Bavelier, 2006)."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi un des cotes est-il plus souvent perdu ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La dominance oculaire et cerebrale privilegie naturellement un cote. Porter une attention consciente vers le flanc le moins performant corrige ce biais."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est l'effet du masquage de la ligne guide (Hide Line) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Retirer les reperes graphiques force le cortex parietal a maintenir un modele cinematique interne purement predictif de la position des cibles."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est l'application aux sports collectifs et a la conduite ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Elle permet aux sportifs et automobilistes de surveiller laxe de progression tout en reperant des coequipiers ou vehicules approchants sur les cotes."
      }
    },
    {
      "@type": "Question",
      "name": "Cet exercice est-il accessible gratuitement ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, SkillDrills propose cette plateforme gratuitement et sans necessite dinscription ou dinstallation dans le navigateur web."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la duree recommandee de la session ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "2 a 3 passages de 60 secondes par jour (environ 5 minutes) constituent une charge ideale pour stimuler la plasticite sans epuisement perceptif."
      }
    }
  ]
};

const guideProps = {
  heading: "Bases Scientifiques de la Poursuite sur Écran Scindé et Attention Divisée",
  intro: [
    "Le systeme visuel de letre humain repond a une contrainte biologique absolue : la fovea centralis de haute resolution ne couvre quun angle visual etroit de 1 a 2 degres. Quand deux cibles evoluent simultanement sur des plans spatialement eloignes, foveer optiquement les deux points en meme temps est impossible. Le cerveau doit choisir : faire alterner le regard par des saccades rapides incessantes, ou creer une ancre oculaire centrale et etendre lattention peripherique de facon bimodale.",
    "Les travaux fondamentaux de Pylyshyn & Storm (1988) sur la poursuite dobjets multiples (MOT) ont mis en evidence des pointeurs visuels corticaux fonctionnant en parallele. De leur cote, Alvarez & Cavanagh (2005) ont demontre que les capacites attentionnelles sont reparties entre les deux hemispheres cerebraux : assigner une cible a lhemichamp gauche (hemisphere droit) et lautre a lhemichamp droit (hemisphere gauche) offre un avantage bilateral prouve, evitant tout encombrement.",
    "Faire rebondir le regard entre deux zones distantes induit une fatigue neurologique notable. Chaque bond oculaire reclame 20 a 50 millisecondes et declenche une suppression saccadique qui reduit la sensibilite visuelle. Split-Screen Tracking consolide un ancre visuelle centrale imperturbable assortie dune attention multifocale (Cavanagh & Alvarez, 2005; Green & Bavelier, 2006). Lorientation orthogonale empeche les effets de regroupement gestaltiste et consolide un traitement cognitif a double flux."
  ],
  benchmarks: {
    title: "Grille d'Évaluation de l'Attention Divisée et Poursuite Bilatérale",
    headers: ["Palier de Performance", "Vitesse de la Cible", "Stabilité de l'Ancre Centrale", "Symétrie Hémisphérique (Erreur)", "Centile de Population"],
    rows: [
      ["Élite (Esports / Aviateurs)", "3.5x – 5.0x+", "Ancre centrale parfaite; 0 saccade intrusive", "< 3% d'écart (verrouillage bimodal)", "Top 1.5%"],
      ["Avancé (Compétitif)", "2.5x – 3.5x", "Ancre stable; micro-saccades minimes", "< 7% d'écart (surveillance double régulière)", "Top 8%"],
      ["Compétent (Adulte Sain)", "1.8x – 2.5x", "Regard central tenu; légères saccades aux pics", "< 12% d'écart (légère préférence latérale)", "Top 25%"],
      ["En Développement (Division Inefficace)", "1.2x – 1.8x", "Saccades involontaires fréquentes vers la cible rapide", "15% – 25% de retard sur l'hémichamp faible", "45% Intermédiaires"],
      ["Débutant (Vision Tunnel)", "0.5x – 1.2x", "Allers-retours permanents des yeux entre écrans", "> 25% de perte complète d'une trajectoire", "Palier Initial"]
    ],
    note: "※ Étalonné d'après les modélisations MOT de Pylyshyn & Storm (1988) et la distribution hémisphérique d'Alvarez & Cavanagh (2005) sur écran 1080p à 50–70 cm."
  },
  techniques: {
    title: "Quatre Piliers Techniques pour l'Attention Divisée sur Écran Scindé",
    items: [
      {
        name: "Ancrage Visuel Central et Regard Doux",
        desc: "Posez laxe des yeux sur la ligne mediane partageant les ecrans. Detendez les muscles oculaires afin que les batonnets peripheriques saisissent les deplacements sur les deux bords.",
        tips: "Ne fixez aucune cible en vision centrale; la barre mediane est votre ancre invariable."
      },
      {
        name: "Dissociation des Vecteurs Orthogonaux",
        desc: "Le cerveau a tendance a synthetiser des mouvements perpendiculaires sous la forme dun axe diagonal. Compartimentez lossillation verticale et le deplacement horizontal.",
        tips: "Prenez les temps dinflexion de chaque cible comme des pulsations visuelles distinctes."
      },
      {
        name: "Équilibrage de la Dominance Hémisphérique",
        desc: "La dominance naturelle amene a privilegier un hemichamp. Dirigez deliberement 60% de votre attention mentale vers le flanc faible pour empecher le decrochage.",
        tips: "Identifiez quel trace presente la moindre regularite et projetez votre attention vers lui."
      },
      {
        name: "Suppression des Saccades et Clignement Synchrone",
        desc: "Contenez limpulsion de regarder la cible qui semballe. Synchronisez vos clignements avec les moments ou les deux cibles ralentissent aux extremites.",
        tips: "Clignez rapidement lors des points dinflexion quand la dynamique est la plus previsible."
      }
    ]
  },
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('pylyshyn1988', 'alvarez2005', 'green2006', 'cavanagh2005', 'woods2015', 'leigh2015'),
  related: [
    { href: "/fr/drills/visual-tracking/constant-slow-pursuit", label: "Exercice de Poursuite Lente Constante (Constant Slow)" },
    { href: "/fr/drills/visual-tracking/directional-chaos-pursuit", label: "Poursuite en Chaos Directionnel (Directional Chaos)" },
    { href: "/fr/drills/visual-tracking/dynamic-evasion-pursuit", label: "Poursuite avec Évasion Dynamique (Dynamic Evasion)" },
    { href: "/fr/drills/visual-tracking/ghosting-suppress-pursuit", label: "Suppression d'Images Fantômes (Ghosting Suppress)" },
    { href: "/fr/drills/visual-tracking/infinity-pursuit", label: "Exercice Oculaire en Huit (Infinity)" },
    { href: "/fr/drills/visual-tracking/sine-wave-pursuit", label: "Poursuite Oculaire en Onde Sinusoïdale (Sine Wave)" }
  ]
};

export default function SplitScreenTrackingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <SplitScreenTrackingClient copy={{ title: "Poursuite sur Écran Scindé", subtitle: "Test d'Attention Visuelle Divisée" }} />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/fr/drills/visual-tracking/split-screen-tracking" />
      </div>
    </>
  );
}
