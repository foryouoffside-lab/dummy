import DirectionalChaosPursuitClient from '@/app/drills/visual-tracking/directional-chaos-pursuit/DirectionalChaosPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Poursuite Oculaire Chaotique – Chaos Pursuit | SkillDrills",
  description: "Entraînement gratuit de poursuite oculaire chaotique : développez la réactivité des saccades et la refixation fovéale sur trajectoires imprévisibles.",
  keywords: [
    "poursuite visuelle chaotique",
    "entraînement saccades de rattrapage",
    "test motricité oculaire réactive",
    "poursuite oculaire erratique",
    "refixation fovéale rapide",
    "tracking visuel imprévisible",
    "gymnastique oculaire réflexe",
    "réflexe oculomoteur exercice",
    "visée tracking réactive esports",
    "acuité visuelle dynamique test gratuit",
    "coordination oculomotrice en ligne",
    "stabilisation du regard dynamique"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/visual-tracking/directional-chaos-pursuit",
    languages: getAlternateLanguages("/drills/visual-tracking/directional-chaos-pursuit"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Poursuite Oculaire Chaotique – Chaos Pursuit | SkillDrills",
    description: "Entraînement gratuit de poursuite oculaire chaotique : développez la réactivité des saccades et la refixation fovéale sur trajectoires imprévisibles.",
    url: "https://skilldrills.online/fr/drills/visual-tracking/directional-chaos-pursuit",
    siteName: "SkillDrills",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Poursuite Oculaire Chaotique – Chaos Pursuit | SkillDrills",
    description: "Entraînement gratuit de poursuite oculaire chaotique : développez la réactivité des saccades et la refixation fovéale sur trajectoires imprévisibles.",
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
      "name": "Poursuite Chaotique Directionnelle",
      "item": "https://skilldrills.online/fr/drills/visual-tracking/directional-chaos-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Poursuite Chaotique Directionnelle – Entraînement Oculaire",
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
  "name": "Test de Poursuite Oculaire Chaotique et Récupération Saccadique",
  "url": "https://skilldrills.online/fr/drills/visual-tracking/directional-chaos-pursuit",
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
  "name": "Directional Chaos Pursuit – Entraîneur de Motricité Oculaire",
  "description": "Entraîneur visuel réflexe sur navigateur pour suivre des cibles aux trajectoires imprévisibles sans anticipation motrice.",
  "genre": ["Outil d'Entraînement Oculaire", "Entraînement Visuel Sportif", "Aim Trainer"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment Entraîner la Récupération Saccadique en Poursuite Chaotique",
  "description": "Protocole pour conditionner des réflexes visuo-moteurs réactifs rapides face à des mouvements erratiques.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Stabilisez Votre Posture et Isolez les Yeux",
      "text": "Asseyez-vous le dos droit à 50-60 cm de l'écran. Gardez la tête et le cou parfaitement immobiles pour forcer le travail exclusif des muscles oculomoteurs sans réflexe vestibulo-oculaire.",
      "url": "https://skilldrills.online/fr/drills/visual-tracking/directional-chaos-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Sélectionnez Votre Vitesse de Référence",
      "text": "Commencez à 1.0x pour habituer la rétine périphérique aux rebonds et aux accélérations stochastiques sans saturation.",
      "url": "https://skilldrills.online/fr/drills/visual-tracking/directional-chaos-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Déclenchez des Saccades de Rattrapage Immédiates",
      "text": "Lorsqu'une brusque rupture survient, n'essayez pas de deviner la trajectoire. Laissez la rétine détecter le glissement et déclenchez une microsaccade pour replacer la fovéa.",
      "url": "https://skilldrills.online/fr/drills/visual-tracking/directional-chaos-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Maintenez des Séries Courtes et Intenses",
      "text": "Effectuez 5 à 8 séries de 60 secondes avec des pauses pour préserver la réactivité synaptique maximale de vos centres visuels.",
      "url": "https://skilldrills.online/fr/drills/visual-tracking/directional-chaos-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu’est-ce que l’exercice de poursuite chaotique directionnelle (Directional Chaos Pursuit) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "C’est un exercice de motricité oculaire avancée où la cible subit des variations de vitesse imprévisibles et des rebonds stochastiques, neutralisant les modèles prédictifs cérébelleux pour forcer un contrôle réflexe en boucle fermée."
      }
    },
    {
      "@type": "Question",
      "name": "Qu’appelle-t-on une saccade de rattrapage (Catch-up Saccade) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Lorsqu’une cible change brutalement de vecteur, sa vitesse dépasse les limites de la poursuite fluide (~30°/s), créant un glissement rétinien. Le colliculus supérieur déclenche alors un saut oculaire balistique de 150 à 200 ms pour replacer la cible sur la fovéa."
      }
    },
    {
      "@type": "Question",
      "name": "En quoi ce test chaotique diffère-t-il d’un suivi de trajectoire prévisible (cercle, Lissajous) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sur des trajectoires prévisibles, le cervelet anticipe le mouvement avec une latence quasi nulle (Bahill et al., 1980). Dans le mouvement chaotique, aucune trajectoire ne se répète : l'anticipation échoue, exigeant un traitement visuel réactif en temps réel."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est l’intérêt direct de cet entraînement pour le tracking dans les jeux de tir (FPS) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dans des jeux comme Apex Legends, Overwatch 2 ou CS2, les adversaires utilisent des strafes imprévisibles pour casser la visée. Cet entraînement réduit la désorientation visuelle et accélère la réacquisition fovéale des cibles mobiles."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi est-il indispensable de garder la tête immobile pendant l’exercice ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bouger la tête active le réflexe vestibulo-oculaire (RVO) issu de l’oreille interne, ce qui soulage artificiellement les muscles oculaires. L'immobilité de la tête garantit que les six muscles extraoculaires supportent toute la charge d'entraînement."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le volume d’entraînement quotidien conseillé ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nous préconisons 5 à 10 minutes par jour (5 à 8 sessions de 60 secondes). En raison de la forte sollicitation attentionnelle et des saccades répétées, des sessions concises évitent la fatigue oculaire et maximisent l'apprentissage moteur."
      }
    },
    {
      "@type": "Question",
      "name": "Que faire si la cible accélère et que je perds totalement son suivi ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Si vous perdez la cible, évitez de balayer l’écran au hasard. Fixez le regard au centre, détectez l'apparition périphérique du mouvement et lancez une saccade nette vers le nouveau vecteur. Réduisez à 0.8x si nécessaire."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est l’impact de la fréquence de rafraîchissement de l’écran (Hz) sur la performance de suivi ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un écran gamer à 144 Hz ou 240 Hz abaisse le délai d’affichage sous les 4 ms (Woods et al., 2015). Cela permet à l'œil d'enregistrer les ruptures de trajectoire avec une clarté temporelle supérieure, optimisant le timing des saccades correctives."
      }
    },
    {
      "@type": "Question",
      "name": "Cet entraînement apporte-t-il des bénéfices concrets dans les sports réels (tennis, football) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. Les balles à effet, rebonds sur gazon et déviations aériennes sollicitent exactement ce mécanisme de refixation fovéale d'urgence. Les athlètes dotés d'une réacquisition rapide conservent la trajectoire visuelle sans décrochage."
      }
    },
    {
      "@type": "Question",
      "name": "Ce test de poursuite chaotique est-il gratuit et sans risque pour les yeux ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, l’outil est 100 % gratuit, fonctionne directement dans votre navigateur web sans inscription, et toutes vos données de vitesse et scores restent strictement enregistrés dans la mémoire locale de votre appareil."
      }
    }
  ]
};

const guideProps = {
  heading: "Bases Neuroscientifiques de la Poursuite Oculaire Chaotique et des Saccades",
  intro: [
    "La plupart des exercices de suivi visuel recourent à des figures géométriques prévisibles, ce qui permet aux circuits cérébelleux de remplacer la boucle sensorielle en temps réel par une commande motrice prédictive (Bahill, Iandolo, & Troost, 1980). La Poursuite Chaotique Directionnelle (Directional Chaos Pursuit) élimine ce raccourci : des perturbations vectorielles continues et des rebonds aléatoires empêchent toute prédiction, contraignant les centres oculomoteurs à opérer en boucle réflexe fermée (Closed-Loop Tracking).",
    "Dynamique des Saccades de Rattrapage et Glissement Rétinien : dès qu'une rupture ou une accélération imprévue survient, la vitesse angulaire dépasse la capacité de la poursuite fluide (~30°/s), projetant l'image hors de la fovéa centrale. Le cortex visuel et le colliculus supérieur mesurent l'erreur de position et déclenchent une saccade corrective (Catch-up Saccade) en 150 à 200 ms (Rashbass, 1961 ; Krauzlis, 2004 ; Barnes, 2008). La rapidité avec laquelle le regard recentre la cible et rétablit le gain continu définit l'agilité oculomotrice de haut niveau.",
    "Latence Matérielle et Échantillonnage Temporel : les écrans standards à 60 Hz ajoutent jusqu'à 16,7 ms de latence d'affichage, tandis que les dalles à 144 Hz ou 240 Hz réduisent ce délai sous 4,2 ms (Woods et al., 2015). Cet outil fonctionne intégralement dans le navigateur, assurant la protection absolue de vos données avec un stockage exclusivement local."
  ],
  benchmarks: {
    title: "Normes de Performance en Poursuite Chaotique et Récupération Saccadique",
    headers: ["Niveau de Performance", "Multiplicateur de Vitesse", "Délai de Refixation et Stabilité du Regard", "Profil Neuromoteur et Oculaire"],
    rows: [
      ["Niveau 1 : Apex Réactif – Réflexes d’Élite", "2.0x+ Ultra-Vitesse", "La saccade corrective intervient dès la rupture de trajectoire ; refixation fluide et immédiate sur le nouveau vecteur.", "Vitesse de transmission synaptique optimale entre rétine et noyaux oculomoteurs. Standard des compétiteurs professionnels d’esport et de sport dynamique."],
      ["Niveau 2 : Récupération Saccadique Supérieure", "1.4x – 1.9x Haute Vitesse", "Recentrage fovéal rapide avec dépassement oscillatoire minime ; poursuite fluide rétablie en moins de 180 ms.", "Coordination remarquable des muscles oculomoteurs externes. Excellente réactivité face aux variations d’angles brutales."],
      ["Niveau 3 : Standard Fonctionnel Solide", "1.0x – 1.3x Vitesse Standard", "Poursuite régulière de la trajectoire ; bref délai de latence lors des rebonds à angles très aigus.", "Profil habituel de l’adulte sain. Parfaitement adapté à la conduite, aux sports de loisir et aux jeux vidéo."],
      ["Niveau 4 : Refixation Retardée – Pratique Recommandée", "0.7x – 0.9x Vitesse Modérée", "La cible s’échappe fréquemment de la zone fovéale ; plusieurs saccades successives sont nécessaires pour retrouver l’alignement.", "Latence sensori-motrice accrue lors des changements de cap. Entraînement recommandé à vitesses réduites."],
      ["Niveau 5 : Instabilité Oculaire – Débutant", "< 0.7x Basse Vitesse", "Décrochage oculaire fréquent ; le regard balaie l’écran de manière désordonnée au lieu d’accompagner la cible.", "Le contrôle fondamental de motilité doit d’abord être renforcé sur des trajectoires sinusoïdales prévisibles avant cet exercice."]
    ],
    note: "Barèmes établis d’après la cinématique oculomotrice et la correction saccadique sous perturbations chaotiques (Bahill et al., 1980 ; Barnes, 2008 ; Krauzlis, 2004 ; Robinson, 1965)."
  },
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('bahill1980', 'barnes2008', 'krauzlis2004', 'robinson1965', 'rashbass1961', 'woods2015'),
  related: [
    { href: "/fr/drills/visual-tracking/constant-slow-pursuit", label: "Poursuite Oculaire Lente (Constant Slow)" },
    { href: "/fr/drills/visual-tracking/sine-wave-pursuit", label: "Poursuite en Onde Sinusoïdale (Sine Wave)" },
    { href: "/fr/drills/visual-tracking/infinity-pursuit", label: "Poursuite en Huit Infini (Figure-8)" },
    { href: "/fr/drills/visual-tracking/dynamic-evasion-pursuit", label: "Poursuite Évasive Dynamique (Dynamic Evasion)" }
  ]
};

export default function DirectionalChaosPursuitPageFr() {
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
      <DirectionalChaosPursuitClient
        copy={{
          title: "Poursuite Oculaire Chaotique – Chaos Pursuit",
          subtitle: "Entraînement aux Saccades de Rattrapage et Refixation Visuelle",
          description: "Face à des trajectoires imprévisibles et des rebonds stochastiques, le cerveau ne peut exploiter les modèles prédictifs du cervelet. Le système oculomoteur bascule en boucle réflexe fermée, déclenchant des saccades de rattrapage rapides pour ramener immédiatement la cible sur la fovéa centrale (Bahill et al., 1980; Krauzlis, 2004)."
        }}
      />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/fr/drills/visual-tracking/directional-chaos-pursuit" />
      </div>
    </>
  );
}
