import VisualTrackingDrillsClient from '@/app/drills/visual-tracking/VisualTrackingDrillsClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const trackingDrills = DRILLS.filter((d) => d.category === 'visual-tracking');

export const metadata = {
  title: 'Poursuite Oculaire & Acuité Visuelle Dynamique | SkillDrills',
  description: 'Exercices de poursuite oculaire et acuité visuelle dynamique en ligne gratuits. 14 entraînements scientifiques : motricité oculaire et vision périphérique.',
  keywords: [
    'poursuite oculaire entrainement', 'acuite visuelle dynamique test', 'exercices de motricite oculaire',
    'mouvements saccadiques exercices', 'tracking visuel en ligne gratuit', 'entrainement des yeux sport',
    'stabilite du regard reflexe vestibulo oculaire', 'vision peripherique exercices', 'gymnastique oculaire fatigue ecran',
    'exercices oculomoteurs orthoptie', 'prediction de trajectoire visuelle', 'ameliorer poursuite oculaire',
    'test vision dynamique gratuit', 'aim tracking entrainement fps', 'reflexes visuels et coordination'
  ],
  openGraph: {
    title: 'Poursuite Oculaire & Acuité Visuelle Dynamique | SkillDrills',
    description: 'Exercices de poursuite oculaire et acuité visuelle dynamique en ligne gratuits. 14 entraînements scientifiques : motricité oculaire et vision périphérique.',
    type: 'website',
    url: 'https://skilldrills.online/fr/drills/visual-tracking',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Exercices de Poursuite Oculaire et Suivi Visuel' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Poursuite Oculaire & Acuité Visuelle Dynamique | SkillDrills',
    description: 'De la poursuite continue à la prédiction balistique : 14 exercices professionnels de motricité oculaire gratuits.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/visual-tracking',
    languages: getAlternateLanguages('/fr/drills/visual-tracking'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/fr" },
    { "@type": "ListItem", "position": 2, "name": "Répertoire des Entraînements", "item": "https://skilldrills.online/fr/drills" },
    { "@type": "ListItem", "position": 3, "name": "Poursuite Oculaire & Suivi Visuel", "item": "https://skilldrills.online/fr/drills/visual-tracking" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Exercices de Poursuite Oculaire et Acuité Visuelle Dynamique Gratuits (14 Drills)",
  "url": "https://skilldrills.online/fr/drills/visual-tracking",
  "description": "14 entraînements scientifiques de poursuite oculaire continue (Smooth Pursuit), trajectoires sinusoïdales, prédiction balistique et vision périphérique.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": trackingDrills.map((drill) => {
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
      "name": "Quelle est la différence physiologique entre la poursuite oculaire lisse (Smooth Pursuit) et les saccades ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La poursuite oculaire lisse (Smooth Pursuit Eye Movement) est un mouvement continu et fluide guidé par le système visuel afin de maintenir l'image d'un objet en mouvement (comme une balle ou un adversaire) stabilisée sur la fovéa, zone de vision maximale de la rétine. Les saccades, en revanche, sont des déplacements balistiques ultrarapides (jusqu'à 900 degrés par seconde) entre deux points d'intérêt distincts. Dans le sport de haut niveau et les FPS, une poursuite continue impeccable est indispensable pour évaluer précisément les trajectoires et accélérations cibles."
      }
    },
    {
      "@type": "Question",
      "name": "Comment l'entraînement de l'acuité visuelle dynamique améliore-t-il la performance sportive et le gaming FPS ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Une excellente vision statique ne garantit pas la netteté des cibles se déplaçant à vive allure. L'entraînement de l'acuité visuelle dynamique (DVA) renforce la coordination neuromusculaire des six muscles oculomoteurs externes, éliminant le flou cinétique rétinien. Ce gain réduit le délai de traitement dans le cortex visuel de 50 à 80 millisecondes, offrant un avantage décisif aux joueurs de tennis ou de baseball pour décrypter un effet, et aux joueurs d'esport pour verrouiller leur tracking sans décrocher."
      }
    },
    {
      "@type": "Question",
      "name": "Qu'est-ce que la poursuite visuelle prédictive (Predictive Pursuit) lors de l'occultation temporaire d'une cible ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La poursuite prédictive est une fonction cognitive orchestrée par le cervelet : lorsque la cible disparaît momentanément derrière un obstacle (occultation stroboscopique), le cerveau extrapole sa vitesse et son accélération pour anticiper sa position future. En s'entraînant avec des cibles masquées, le regard prend de l'avance pour accueillir la cible exactement là où elle réapparaît, permettant un tir réflexe sans aucune hésitation."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi des saccades de rattrapage (Catch-up Saccades) surviennent-elles et comment les corriger ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les saccades de rattrapage apparaissent lorsque la vitesse de poursuite oculaire est inférieure à celle du mobile (gain de poursuite < 1,0). L'œil prend du retard et doit exécuter un petit saut saccadique brutal pour recentrer la cible, ce qui hache le champ visuel. La correction s'obtient par une surcharge progressive : débuter par des trajectoires linéaires lentes et des sinusoïdes régulières, en veillant au relâchement des tensions faciales et cervicales."
      }
    },
    {
      "@type": "Question",
      "name": "En quoi les exercices de motricité oculaire aident-ils en orthoptie et après une commotion cérébrale ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En orthoptie et en neurologie sportive, les exercices de poursuite lente et de stabilisation du regard sont incontournables dans la prise en charge du syndrome post-commotionnel (PCS) et des troubles oculomoteurs. La pratique régulière stimule la plasticité cérébrale au niveau du tronc cérébral et du cervelet, restaurant la vision binoculaire et apaisant céphalées, vertiges et instabilités visuelles."
      }
    },
    {
      "@type": "Question",
      "name": "Quel rôle joue le réflexe vestibulo-oculaire (RVO) dans la stabilité du regard pendant les mouvements corporels ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le réflexe vestibulo-oculaire (RVO ou VOR) relie le système vestibulaire de l'oreille interne aux muscles des yeux. Lorsque la tête effectue une rotation, le RVO commande une rotation oculaire opposée à la même vitesse, maintenant l'environnement stable et net. Les drills de suivi visuel affinent ce réflexe, garantissant que le réticule reste ancré sur la cible même lors de déplacements ou strafes effrénés."
      }
    },
    {
      "@type": "Question",
      "name": "Combien de minutes par jour consacrer aux exercices de motricité oculaire pour éviter la fatigue visuelle ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les muscles oculomoteurs sont constitués de fibres extrêmement délicates et sensibles à la fatigue. La durée optimale est de 10 à 15 minutes par séance, 3 à 5 fois par semaine. Il est essentiel d'appliquer la règle '20-20-20' : toutes les 20 minutes d'entraînement, fixer un objet éloigné à au moins 6 mètres pendant 20 secondes pour relâcher l'accommodation ciliaire et préserver le confort oculaire."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi un écran à taux de rafraîchissement élevé (144Hz à 360Hz) est-il indispensable pour l'entraînement oculaire ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sur un écran 60Hz standard, chaque image reste affichée 16,7 ms, provoquant des saccades de compensation dues au flou de mouvement et aux micro-saccades induites. Les dalles 144Hz, 240Hz et 360Hz réduisent cet intervalle à 2,8 ms, offrant une continuité cinétique parfaite qui permet aux muscles oculaires de développer une véritable poursuite fluide, identique aux mouvements dans le monde réel."
      }
    }
  ]
};

export default function LocalizedVisualTrackingDrillsClientPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <VisualTrackingDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}
