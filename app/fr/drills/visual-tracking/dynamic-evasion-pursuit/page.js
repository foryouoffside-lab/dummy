import DynamicEvasionPursuitClient from '@/app/drills/visual-tracking/dynamic-evasion-pursuit/DynamicEvasionPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Poursuite de Cible Évasive – Evasion Pursuit | SkillDrills",
  description: "Entraînement gratuit de tracking réactif et cibles évasives : développez la refixation fovéale et les saccades correctives sur ruptures de direction.",
  keywords: [
    "poursuite de cible évasive",
    "poursuite évasive dynamique",
    "entraînement tracking réactif",
    "refixation fovéale réactive",
    "saccades correctives exercice",
    "test motricité oculaire cibles mobiles",
    "gymnastique oculaire pour esports",
    "agilité visuelle de réaction en ligne",
    "visée tracking réactive fps",
    "suivi de mouvements brusques yeux",
    "coordination oculomotrice dynamique",
    "acuité visuelle dynamique test gratuit"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/visual-tracking/dynamic-evasion-pursuit",
    languages: getAlternateLanguages("/drills/visual-tracking/dynamic-evasion-pursuit"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Poursuite de Cible Évasive – Evasion Pursuit | SkillDrills",
    description: "Entraînement gratuit de tracking réactif et cibles évasives : développez la refixation fovéale et les saccades correctives sur ruptures de direction.",
    url: "https://skilldrills.online/fr/drills/visual-tracking/dynamic-evasion-pursuit",
    siteName: "SkillDrills",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Poursuite de Cible Évasive – Evasion Pursuit | SkillDrills",
    description: "Entraînement gratuit de tracking réactif et cibles évasives : développez la refixation fovéale et les saccades correctives sur ruptures de direction.",
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
      "name": "Poursuite Évasive Dynamique",
      "item": "https://skilldrills.online/fr/drills/visual-tracking/dynamic-evasion-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Poursuite Évasive Dynamique – Entraînement Oculaire",
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
  "name": "Test de Poursuite de Cible Évasive et Refixation Fovéale",
  "url": "https://skilldrills.online/fr/drills/visual-tracking/dynamic-evasion-pursuit",
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
  "name": "Dynamic Evasion Pursuit – Entraîneur Visuel Réactif",
  "description": "Entraîneur visuel réflexe sur navigateur pour suivre des cibles exécutant des ruptures de cap évasives sans anticipation motrice.",
  "genre": ["Outil d'Entraînement Oculaire", "Entraînement Visuel Sportif", "Aim Trainer"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment Entraîner la Refixation Saccadique sur Cibles Évasives",
  "description": "Protocole pour conditionner des réflexes visuo-moteurs réactifs et éliminer le temps de latence face aux ruptures de trajectoire.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Stabilisez Votre Posture",
      "text": "Asseyez-vous le dos droit à 50-60 cm de l'écran. Gardez la tête immobile pour éviter l'intervention du réflexe vestibulo-oculaire (RVO).",
      "url": "https://skilldrills.online/fr/drills/visual-tracking/dynamic-evasion-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Accompagnez les Segments Linéaires",
      "text": "Maintenez une poursuite fluide continue tant que la cible évolue à vitesse stable sur sa trajectoire rectiligne.",
      "url": "https://skilldrills.online/fr/drills/visual-tracking/dynamic-evasion-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Déclenchez une Saccade Immédiate à la Rupture",
      "text": "Dès que la cible effectue une rupture d'angle, laissez la rétine percevoir le décrochage et lancez une saccade nette pour recentrer la fovéa.",
      "url": "https://skilldrills.online/fr/drills/visual-tracking/dynamic-evasion-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Effectuez des Séries Courtes et Dynamiques",
      "text": "Réalisez 5 à 8 séries de 60 secondes avec des pauses régulières pour préserver une réactivité neuronale optimale sans fatigue oculaire.",
      "url": "https://skilldrills.online/fr/drills/visual-tracking/dynamic-evasion-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu’est-ce que l’exercice de poursuite évasive dynamique (Dynamic Evasion Pursuit) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "C’est un entraînement oculaire avancé combinant des portions de poursuite fluide rectiligne et de brusques déviations d'angle, forçant le système visuel à recentrer la cible en moins de 180 ms."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la différence avec la poursuite chaotique (Chaos Pursuit) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La poursuite chaotique introduit des micro-perturbations continues à chaque instant, tandis que la poursuite évasive présente des trajectoires stables interrompues par des ruptures angulaires marquées, reproduisant l'esquive intentionnelle d'un adversaire."
      }
    },
    {
      "@type": "Question",
      "name": "Que se passe-t-il sur la rétine lors d’un changement de direction imprévu ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La déviation brutale de la cible génère un glissement rétinien (retinal slip). Le colliculus supérieur et le cortex visuel calculent l'erreur et déclenchent une saccade corrective de 150 à 180 ms pour repositionner la fovéa (Krauzlis, 2004)."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est l’impact de cet exercice sur le tracking dans les jeux de tir (FPS) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dans des jeux comme Apex Legends ou Overwatch 2, les cibles enchaînent des déplacements d'esquive imprévisibles (strafe). Cet exercice affine le réflexe de recentrage fovéal, réduisant l'hésitation visuelle et augmentant la précision de visée."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi faut-il impérativement garder la tête immobile pendant le test ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bouger la tête active le réflexe vestibulo-oculaire (RVO) de l'oreille interne, compensant artificiellement le retard moteur. L'immobilité stricte de la tête garantit que les six muscles oculomoteurs réalisent l'ensemble de l'effort."
      }
    },
    {
      "@type": "Question",
      "name": "Quel volume d’entraînement quotidien est conseillé ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nous conseillons 5 à 10 minutes par jour (5 à 8 blocs de 60 secondes). Les ruptures angulaires sollicitant intensément l'attention et la motricité réflexe, des formats concis préviennent l'épuisement oculaire et stimulent la neuroplasticité."
      }
    },
    {
      "@type": "Question",
      "name": "Que faire si la cible s’échappe après une manœuvre d’esquive rapide ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ne balayez pas l'écran au hasard. Fixez calmement le champ visuel central, repérez le nouveau vecteur avec la vision périphérique et lancez une saccade directe. Si le décrochage est régulier, passez temporairement à 0.8x."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le rôle de la fréquence de rafraîchissement de l’écran (Hz) sur ce test ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un moniteur à 144 Hz ou plus réduit le délai d'affichage à moins de 6,9 ms (Woods et al., 2015), rendant les ruptures d'angles immédiatement perceptibles sans saccades parasites, optimisant la réponse motrice de l'œil."
      }
    },
    {
      "@type": "Question",
      "name": "Cet exercice apporte-t-il des bénéfices aux athlètes de sports collectifs ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. Au football, au tennis ou au basketball, les feintes d'adversaires et les trajectoires de balles déviées exigent une réacquisition fovéale immédiate. Cette agilité visuelle affine la vitesse d'anticipation motrice."
      }
    },
    {
      "@type": "Question",
      "name": "Ce test de poursuite évasive est-il gratuit et confidentiel ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, ce test fonctionne directement dans votre navigateur web sans aucun frais ni inscription, et l'intégralité de vos scores et temps reste stockée exclusivement sur votre terminal local."
      }
    }
  ]
};

const guideProps = {
  heading: "Bases Neurophysiologiques de la Poursuite Évasive et de la Refixation Saccadique",
  intro: [
    "Les entraînements oculaires traditionnels reposent souvent sur des trajectoires régulières, au sein desquelles le cervelet remplace le traitement sensoriel en temps réel par une commande motrice prédictive (Bahill, Iandolo, & Troost, 1980). La Poursuite Évasive Dynamique (Dynamic Evasion Pursuit) élimine cette anticipation : la cible parcourt des segments rectilignes avant d'exécuter des ruptures d'angle soudaines, simulant la trajectoire d'un adversaire en fuite dans les sports de haute intensité et l'esport.",
    "Cinématique du Glissement Rétinien et Saccades de Rattrapage : lors d'une déviation imprévisible, la vitesse angulaire de l'image dépasse le seuil de la poursuite fluide (~30°/s), provoquant un glissement rétinien (retinal slip). Le cortex visuel et le colliculus supérieur détectent l'erreur spatiale et déclenchent une saccade corrective (Catch-up Saccade) en 150 à 180 ms (Rashbass, 1961 ; Krauzlis, 2004 ; Barnes, 2008), recalant la fovéa sur la nouvelle trajectoire.",
    "Fréquence de Rafraîchissement et Latence d'Affichage : les écrans standards à 60 Hz imposent une latence pouvant atteindre 16,7 ms, tandis que les écrans 144 Hz ou 240 Hz réduisent cet intervalle sous 4,2 ms (Woods et al., 2015). Cette application web s'exécute directement dans votre navigateur en préservant votre vie privée via un stockage strictement local."
  ],
  benchmarks: {
    title: "Normes de Performance en Poursuite Évasive et Refixation Saccadique",
    headers: ["Niveau de Performance", "Multiplicateur de Vitesse", "Refixation Saccadique lors des Ruptures Évasives", "Profil Neuromoteur et Oculaire"],
    rows: [
      ["Niveau 1 : Apex Réactif – Réflexes d’Élite", "2.0x+ Ultra-Vitesse", "La saccade corrective intervient en moins de 150 ms ; verrouillage fovéal immédiat sans oscillation résiduelle.", "Vitesse maximale de conduction synaptique entre fovéa et noyaux oculomoteurs. Standard des compétiteurs professionnels d'esport et athlètes de pointe."],
      ["Niveau 2 : Agilité Visuelle Supérieure", "1.4x – 1.9x Haute Vitesse", "Recentrage rapide et fiable en 1 à 2 images vidéo ; reprise immédiate de la vitesse de poursuite continue.", "Contrôle remarquable des muscles oculomoteurs externes. Excellente maîtrise face aux déplacements d'esquive imprévisibles."],
      ["Niveau 3 : Standard Fonctionnel Solide", "1.0x – 1.3x Vitesse Standard", "Suivi régulier des portions linéaires ; léger retard de latence lors des ruptures à angle aigu.", "Profil représentatif des adultes sains. Parfaitement adapté à la conduite automobile, aux sports de loisir et aux jeux vidéo."],
      ["Niveau 4 : Refixation Retardée – Pratique Recommandée", "0.7x – 0.9x Vitesse Modérée", "La cible décroche de la fovéa sur la majorité des ruptures ; nécessite plusieurs saccades successives pour reprendre l'alignement.", "Latence sensori-motrice augmentée lors des changements de cap. Entraînement recommandé à vitesses réduites."],
      ["Niveau 5 : Instabilité Oculaire – Débutant", "< 0.7x Basse Vitesse", "Le regard reste figé sur l'ancienne trajectoire de la cible avant de déclencher une réaction compensatoire tardive.", "La motricité oculaire élémentaire doit d'abord être consolidée sur des trajectoires régulières avec stabilisation stricte de la tête."]
    ],
    note: "Normes fondées sur les études neurophysiologiques de la latence saccadique, du glissement rétinien et de la reprise de poursuite lors de ruptures angulaires soudaines (Bahill et al., 1980 ; Rashbass, 1961 ; Krauzlis, 2004 ; Barnes, 2008)."
  },
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('bahill1980', 'barnes2008', 'krauzlis2004', 'robinson1965', 'rashbass1961', 'woods2015'),
  related: [
    { href: "/fr/drills/visual-tracking/constant-slow-pursuit", label: "Poursuite Oculaire Lente (Constant Slow)" },
    { href: "/fr/drills/visual-tracking/directional-chaos-pursuit", label: "Poursuite Chaotique Directionnelle (Chaos Pursuit)" },
    { href: "/fr/drills/visual-tracking/sine-wave-pursuit", label: "Poursuite en Onde Sinusoïdale (Sine Wave)" },
    { href: "/fr/drills/visual-tracking/infinity-pursuit", label: "Poursuite en Huit Infini (Figure-8)" }
  ]
};

export default function DynamicEvasionPursuitPageFr() {
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
      <DynamicEvasionPursuitClient
        copy={{
          title: "Poursuite Évasive Dynamique – Entraînement Oculaire",
          subtitle: "Entraînement de Refixation Fovéale et Réaction aux Ruptures Brusques",
          description: "En alternant trajectoires linéaires régulières et ruptures d'angles imprévisibles, cet exercice empêche l'anticipation motrice cérébelleuse. Le système oculomoteur opère en boucle fermée, déclenchant des saccades rapides pour recentrer la cible sur la fovéa (Bahill et al., 1980; Krauzlis, 2004)."
        }}
      />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/fr/drills/visual-tracking/dynamic-evasion-pursuit" />
      </div>
    </>
  );
}
