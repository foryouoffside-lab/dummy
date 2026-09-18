import ReactionSpeedDrillsClient from '@/app/drills/reaction-speed/ReactionSpeedDrillsClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const reactionDrills = DRILLS.filter((d) => d.category === 'reaction-speed');

export const metadata = {
  title: 'Test de Réflexes & Temps de Réaction | SkillDrills',
  description: 'Test de temps de réaction et entraînement de réflexes en ligne. Mesurez vos réflexes en millisecondes avec 8 exercices scientifiques sur navigateur.',
  keywords: [
    'test temps de reaction', 'test de reflexes en ligne', 'ameliorer vitesse de reaction',
    'entrainement reflexes gaming', 'temps de reaction simple et choix', 'test reflexe ecran vert',
    'exercices de poursuite oculaire', 'acuite visuelle dynamique', 'coordination oeil main',
    'input lag ecran reaction', 'jeux de reflexes gratuit navigateur',
    'vision peripherique entrainement', 'temps de reaction moyen humain',
    'esport entrainement reflexes', 'mouvements saccadiques yeux'
  ],
  openGraph: {
    title: 'Test de Réflexes & Temps de Réaction | SkillDrills',
    description: 'Test de temps de réaction et entraînement de réflexes en ligne. Mesurez vos réflexes en millisecondes avec 8 exercices scientifiques sur navigateur.',
    type: 'website',
    url: 'https://skilldrills.online/fr/drills/reaction-speed',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Test de Réflexes et Temps de Réaction en Ligne' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Test de Réflexes & Temps de Réaction | SkillDrills',
    description: 'Mesurez vos réflexes en millisecondes avec 8 exercices interactifs de vitesse de réaction sur navigateur.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/reaction-speed',
    languages: getAlternateLanguages('/fr/drills/reaction-speed'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/fr" },
    { "@type": "ListItem", "position": 2, "name": "Catalogue des Exercices", "item": "https://skilldrills.online/fr/drills" },
    { "@type": "ListItem", "position": 3, "name": "Vitesse de Réaction", "item": "https://skilldrills.online/fr/drills/reaction-speed" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Test de Réflexes Gratuit et Entraînement de Réaction en Ligne",
  "url": "https://skilldrills.online/fr/drills/reaction-speed",
  "description": "8 exercices interactifs pour mesurer le temps de réaction, l'acuité visuelle dynamique, les mouvements saccadiques et les réflexes de tir. Sans téléchargement.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": reactionDrills.map((drill) => {
    const loc = getLocalizedDrill(drill.href, 'fr', drill.name);
    return {
      "@type": "WebApplication",
      "name": loc.name,
      "url": `https://skilldrills.online/fr${drill.href}`
    };
  })
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quelle est la distinction physiologique entre temps de réaction simple (Simple RT) et temps de réaction de choix (Choice RT) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le temps de réaction simple (Simple RT) mesure l'intervalle entre l'apparition d'un stimulus unique et prévisible (comme un écran virant au vert) et l'exécution d'une réponse motrice prédéterminée (un clic de souris), soit environ 200 à 250 millisecondes chez un adulte sain. Le temps de réaction de choix (Choice RT) exige quant à lui une analyse cognitive préalable pour distinguer plusieurs stimuli (identifier un allié d'un ennemi ou choisir une direction d'esquive selon la loi de Hick), ce qui prolonge la latence à 300 voire 450 ms et plus. Dans l'esport tactique, c'est la vitesse de réaction de choix qui départage les joueurs d'élite."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le temps de réaction visuel moyen chez l'humain et peut-on atteindre le niveau professionnel ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La moyenne humaine face à un stimulus visuel se situe entre 240 et 270 ms. Cette latence incompressible comprend la phototransduction rétinienne (20 à 40 ms), la conduction nerveuse jusqu'au cortex visuel occipital (60 à 80 ms) et la commande motrice descendante le long de la moelle épinière jusqu'aux fléchisseurs de l'index (50 à 70 ms). Toutefois, grâce à un entraînement neuro-moteur assidu et à l'optimisation de la plasticité synaptique, les joueurs compétitifs et athlètes parviennent à abaisser durablement leur temps de réaction entre 150 et 180 ms."
      }
    },
    {
      "@type": "Question",
      "name": "Comment l'entraînement de l'acuité visuelle dynamique (DVA) et des saccades oculaires affine-t-il les réflexes ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La vélocité réflexe ne dépend pas uniquement de la rapidité digitale, mais de la vitesse à laquelle les yeux verrouillent la cible sur la fovéa centrale de la rétine (la zone de netteté maximale). En stimulant la poursuite oculaire continue (smooth pursuit) et les saccades balistiques rapides, on renforce la coordination des muscles oculomoteurs. Ce gain de quelques dizaines de millisecondes permet au cortex visuel de transmettre l'information décisionnelle au cerveau bien plus précocement lors d'un duel."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est l'importance du taux de rafraîchissement de l'écran (Hz) et du taux d'interrogation de la souris ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La latence matérielle influe directement sur la précision des tests. Un écran 60 Hz n'actualise l'affichage que toutes les 16,6 ms, alors qu'une dalle gaming 144 Hz (6,9 ms) ou 240 Hz (4,1 ms) affiche le stimulus presque instantanément. En combinant un écran haute fréquence avec une souris gaming à 1000 Hz ou plus et l'API Pointer Lock du W3C dans le navigateur, on contourne les filtres logiciels et mémoires tampons du système d'exploitation, permettant d'enregistrer le temps de réaction biologique réel avec une précision absolue d'une milliseconde."
      }
    },
    {
      "@type": "Question",
      "name": "De quelle manière le manque de sommeil, la caféine et la déshydratation modifient-ils les réflexes ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Des études en neurosciences prouvent qu'un déficit de sommeil de seulement 2 heures ralentit la conduction synaptique de 30 à 50 ms, provoquant un retard cognitif similaire à une alcoolémie modérée. À l'inverse, une dose équilibrée de caféine (100 à 200 mg) bloque les récepteurs de l'adénosine et accélère temporairement les réflexes de 10 à 15 ms, bien qu'un excès induise des micro-tremblements néfastes à la précision. Par ailleurs, une déshydratation de seulement 2 % dégrade sensiblement les capacités d'inhibition motrice et la vigilance du lobe frontal."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le lien direct entre le ping réseau et le temps de réaction biologique dans les jeux en ligne ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le délai total d'enregistrement d'une action sur le serveur correspond à la somme : temps de réaction biologique + latence du système + ping réseau. Si un joueur affiche 200 ms de réaction physiologique, 15 ms de latence machine et 35 ms de ping, son tir parvient au serveur après 250 ms. Face à un adversaire disposant d'un avantage de 20 ms de ping, un joueur ayant optimisé ses réflexes de 30 ms comble intégralement l'écart réseau et remporte le duel armé."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le protocole d'entraînement quotidien idéal pour progresser sans épuisement nerveux ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le système nerveux central s'épuise très vite lors d'exercices exigeant une réactivité maximale. S'entraîner en état de saturation cognitive ancre des mécanismes de réponse lents et inefficaces. La méthode recommandée consiste en sessions ciblées et explosives de 15 à 20 minutes par jour, 4 à 5 fois par semaine. Un échauffement préliminaire des doigts et des poignets ainsi que des pauses oculaires d'une minute entre chaque série favorisent la myélinisation des axones moteurs de manière optimale."
      }
    },
    {
      "@type": "Question",
      "name": "Les tests de réaction de SkillDrills sont-ils fiables sur smartphone et tablette tactile ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tous les exercices SkillDrills sont parfaitement jouables sur écran tactile comme sur PC. Cependant, les dalles tactiles capacitives des téléphones ajoutent intrinsèquement une latence matérielle de 20 à 40 ms par rapport à un clic de souris filaire. Pour des mesures scientifiques absolues et un étalonnage compétitif de pointe, l'utilisation d'un PC doté d'un écran 144 Hz+ est recommandée, le smartphone restant un outil remarquable pour l'échauffement cognitif nomade."
      }
    }
  ]
};

export default function FrenchReactionHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ReactionSpeedDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}

