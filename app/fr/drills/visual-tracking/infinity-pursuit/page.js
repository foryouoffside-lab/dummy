import InfinityPursuitClient from '@/app/drills/visual-tracking/infinity-pursuit/InfinityPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Exercice Oculaire du Huit Couché – Infinity | SkillDrills",
  description: "Exercice gratuit de poursuite oculaire en huit couché : renforcez le passage de la ligne médiane, la coordination binoculaire et la motricité en ligne.",
  keywords: [
    "exercice oculaire du huit couché",
    "entraînement poursuite en huit",
    "coordination oculaire binoculaire",
    "franchissement de la ligne médiane yeux",
    "poursuite visuelle en lemniscate",
    "gymnastique oculaire huit infini",
    "motricité oculaire exercice gratuit",
    "test poursuite visuelle en ligne",
    "entraînement visuel sportif",
    "stabilité fovéale sur courbes fluides",
    "visée tracking réactive esports",
    "acuité visuelle dynamique test"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/visual-tracking/infinity-pursuit",
    languages: getAlternateLanguages("/drills/visual-tracking/infinity-pursuit"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Exercice Oculaire du Huit Couché – Infinity | SkillDrills",
    description: "Exercice gratuit de poursuite oculaire en huit couché : renforcez le passage de la ligne médiane, la coordination binoculaire et la motricité en ligne.",
    url: "https://skilldrills.online/fr/drills/visual-tracking/infinity-pursuit",
    siteName: "SkillDrills",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exercice Oculaire du Huit Couché – Infinity | SkillDrills",
    description: "Exercice gratuit de poursuite oculaire en huit couché : renforcez le passage de la ligne médiane, la coordination binoculaire et la motricité en ligne.",
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
      "name": "Poursuite Visuelle",
      "item": "https://skilldrills.online/fr/drills/visual-tracking"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Poursuite en Huit Infini",
      "item": "https://skilldrills.online/fr/drills/visual-tracking/infinity-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Poursuite en Huit Infini – Entraînement Oculaire",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Test de Poursuite Oculaire en Huit Couché et Ligne Médiane",
  "url": "https://skilldrills.online/fr/drills/visual-tracking/infinity-pursuit",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires JavaScript. Requires HTML5 Canvas.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Infinity Pursuit – Entraîneur Visuel en Lemniscate",
  "description": "Entraîneur visuel sur navigateur pour harmoniser la motricité oculaire binoculaire le long de trajectoires en huit couché sans saccades parasites.",
  "genre": ["Outil d'Entraînement Oculaire", "Entraînement Visuel Sportif", "Aim Trainer"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment Réaliser l’Exercice du Huit Couché pour les Yeux",
  "description": "Protocole pour entraîner la poursuite fluide et la coordination binoculaire le long de la lemniscate de Bernoulli.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Stabilisez Votre Posture",
      "text": "Placez-vous à 50-70 cm de l'écran avec la tête immobile pour mobiliser exclusivement les muscles oculomoteurs.",
      "url": "https://skilldrills.online/fr/drills/visual-tracking/infinity-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Démarrez à Vitesse Standard",
      "text": "Choisissez 1.0x afin d'habituer votre regard à la bascule continue entre les boucles gauche et droite.",
      "url": "https://skilldrills.online/fr/drills/visual-tracking/infinity-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Franchissez le Centre de Manière Fluide",
      "text": "Lors du croisement de la ligne médiane centrale, maintenez un glissement oculaire régulier sans clignement ni saccade corrective.",
      "url": "https://skilldrills.online/fr/drills/visual-tracking/infinity-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Enchaînez des Séries Courtes",
      "text": "Réalisez 5 à 8 blocs de 60 secondes avec des pauses pour renforcer le modèle moteur prédictif du cervelet.",
      "url": "https://skilldrills.online/fr/drills/visual-tracking/infinity-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu’est-ce que l’exercice de poursuite en huit infini (Infinity Pursuit) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "C’est un entraînement de motricité oculaire guidant le regard le long de la lemniscate de Bernoulli (huit couché), stimulant les six paires de muscles extraoculaires et le franchissement continu de la ligne médiane."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi le franchissement de la ligne médiane visuelle est-il fondamental ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La ligne médiane sépare les hémichamps visuels et requiert un transfert rapide de données inter-hémisphériques via le corps calleux. Sans entraînement, le regard subit souvent des saccades parasites ou des micro-blocages au centre."
      }
    },
    {
      "@type": "Question",
      "name": "Quels muscles oculaires travaillent sur cette trajectoire en huit couché ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les six muscles extraoculaires de chaque œil (droits interne, externe, supérieur, inférieur, ainsi que grands et petits obliques) sont sollicités en alternance continue pour négocier les courbures diagonales."
      }
    },
    {
      "@type": "Question",
      "name": "Que représente le gain de poursuite (Pursuit Gain) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le gain de poursuite est le rapport entre la vitesse angulaire de l'œil et celle de la cible. Une valeur de 1,0 représente un suivi parfait. Sous 0,80, le regard décroche et exige des saccades de rattrapage (Barnes, 2008)."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est l’intérêt de cet exercice pour la visée dans les jeux vidéo (FPS) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dans les jeux avec déplacements verticaux et courbes, les cibles décrivent des arcs complexes. L'exercice en huit fluidifie le tracking en supprimant les à-coups mécaniques lors des transitions diagonales."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi faut-il maintenir la tête strictement immobile ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bouger la tête active le réflexe vestibulo-oculaire (RVO), compensant le suivi par l'oreille interne. Garder la tête fixe force les muscles oculaires à supporter l'intégralité de l'effort neuromuscular."
      }
    },
    {
      "@type": "Question",
      "name": "Quel temps de pratique quotidienne est recommandé ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nous recommandons 5 à 10 minutes quotidiennes (5 à 8 séries de 60 secondes). Des formats courts et réguliers favorisent l'apprentissage moteur tout en préservant les yeux de la fatigue visuelle."
      }
    },
    {
      "@type": "Question",
      "name": "Cet exercice aide-t-il à réduire la fatigue oculaire devant les écrans ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. Le travail bureautique fige le regard sur des plans statiques. Trazar des trajectoires amples en huit étire les muscles extraoculaires et détend la mise au point fovéale."
      }
    },
    {
      "@type": "Question",
      "name": "Existe-t-il un transfert vers les sports réels comme le tennis ou le football ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolument. Les trajectoires de balles aériennes et brossées combinent courbures et variations d'angles. Une poursuite binoculaire affûtée permet de maintenir la fovéa sur la trajectoire sans temps mort."
      }
    },
    {
      "@type": "Question",
      "name": "Ce test de poursuite en huit est-il gratuit et confidentiel ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, ce test fonctionne gratuitement et directement dans votre navigateur web sans création de compte, et toutes vos métriques de suivi restent enregistrées localement sur votre terminal."
      }
    }
  ]
};

const guideProps = {
  heading: "Bases Neurophysiologiques de la Lemniscate et de la Coordination Binoculaire",
  intro: [
    "La trajectoire en forme de huit couché (lemniscate de Bernoulli) constitue l'un des exercices les plus complets pour évaluer et développer la motricité oculaire. Contrairement aux déplacements purement horizontaux ou verticaux, la lemniscate impose l'activation coordonnée et continue des six muscles extraoculaires selon des vecteurs hélicoïdaux et diagonaux réguliers (Robinson, 1965 ; Barnes, 2008).",
    "Neurodynamique du Franchissement de la Ligne Médiane : au centre de la courbe, la cible traverse le méridien vertical fovéal. Ce franchissement exige un transfert rapide d'informations inter-hémisphériques entre les cortex visuels et moteurs via le corps calleux (Leigh & Zee, 2015). Chez les sujets non entraînés, le gain de poursuite fluide chute fréquemment à ce niveau, provoquant des saccades de compensation.",
    "Fréquence d'Affichage et Fluidité Cinétique : les écrans à 144 Hz ou plus assurent un rendu ultra-fluide avec des temps de trame inférieurs à 6,9 ms (Woods et al., 2015). L'application s'exécute intégralement dans le navigateur avec un stockage strictement local de vos performances."
  ],
  benchmarks: {
    title: "Métriques de Performance en Huit Couché (Lemniscate Pursuit Benchmarks)",
    headers: ["Niveau de Performance", "Gain de Poursuite (Pursuit Gain)", "Taux de Saccades à la Ligne Médiane", "Précision de Trajectoire", "Profil Neurophysiologique"],
    rows: [
      ["Élite (Athlètes Professionnels & Esports)", "0,96 – 1,02", "< 2% (Glissement Parfait)", "98%+", "Coordination neuromusculaire sans faille. Aucune saccade au croisement ; modèle prédictif cérébelleux synchronisé (Barnes, 2008)."],
      ["Avancé (Niveau Compétitif)", "0,90 – 0,95", "2% – 5%", "92% – 97%", "Remarquable stabilité de la poursuite fluide. Déphasage minime uniquement aux sommets extrêmes ; ancrage fovéal solide (Krauzlis, 2004)."],
      ["Compétent (Adultes Sains)", "0,80 – 0,89", "6% – 12%", "82% – 91%", "Bon niveau fonctionnel pour les tâches du quotidien. Saccades occasionnelles de rattrapage au centre ou dans les virages serrés."],
      ["En Développement (Fatigue / Latence)", "0,68 – 0,79", "13% – 22%", "70% – 81%", "Retard de poursuite perceptible ; ruptures saccadiques répétées ; signes de fatigue musculaire ou de compensation cervicale."],
      ["Débutant / Instabilité", "< 0,68", "> 22%", "< 70%", "La poursuite fluide décroche fréquemment ; le regard recherche la cible par à-coups ; entraînement à basse vitesse conseillé."]
    ],
    note: "※ Valeurs normatives déterminées pour une distance de visionnage de 50 à 70 cm. Le gain de poursuite correspond au ratio vitesse angulaire de l'œil / vitesse de la cible (idéal = 1,0) d'après Barnes (2008) et Leigh & Zee (2015)."
  },
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('barnes2008', 'krauzlis2004', 'robinson1965', 'leighzee2015', 'woods2015', 'salthouse1980'),
  related: [
    { href: "/fr/drills/visual-tracking/constant-slow-pursuit", label: "Poursuite Oculaire Lente (Constant Slow)" },
    { href: "/fr/drills/visual-tracking/directional-chaos-pursuit", label: "Poursuite Chaotique Directionnelle (Chaos Pursuit)" },
    { href: "/fr/drills/visual-tracking/dynamic-evasion-pursuit", label: "Poursuite Évasive Dynamique (Dynamic Evasion)" },
    { href: "/fr/drills/visual-tracking/sine-wave-pursuit", label: "Poursuite en Onde Sinusoïdale (Sine Wave)" }
  ]
};

export default function InfinityPursuitPageFr() {
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
      <InfinityPursuitClient
        copy={{
          title: "Poursuite en Huit Infini – Entraînement Oculaire",
          subtitle: "Coordination Binoculaire et Franchissement de la Ligne Médiane",
          description: "Exercice de poursuite fluide continue le long de la lemniscate de Bernoulli. Renforce la coordination des six muscles extraoculaires et la stabilité fovéale sans rupture saccadique au franchissement du méridien central (Robinson, 1965; Barnes, 2008)."
        }}
      />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/fr/drills/visual-tracking/infinity-pursuit" />
      </div>
    </>
  );
}
