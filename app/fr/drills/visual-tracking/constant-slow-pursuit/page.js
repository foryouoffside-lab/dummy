import ConstantSlowPursuitClient from '@/app/drills/visual-tracking/constant-slow-pursuit/ConstantSlowPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Mouvements Oculaires – Poursuite Visuelle | SkillDrills',
  description: "Entraînez la poursuite oculaire le long d'une courbe de Lissajous. Améliorez la stabilité du regard et supprimez les saccades parasites en ligne.",
  keywords: [
    'entrainement mouvements oculaires',
    'poursuite oculaire lente',
    'smooth pursuit en ligne',
    'stabilite du regard',
    'suivi visuel continu',
    'exercices oculaires lissajous',
    'suppression des saccades',
    'fixation foveale',
    'acuite visuelle dynamique',
    'gymnastique oculaire ecran',
    'motilite oculaire exercices',
    'entrainement visuel gratuit'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/visual-tracking/constant-slow-pursuit',
    languages: getAlternateLanguages('/drills/visual-tracking/constant-slow-pursuit'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Mouvements Oculaires – Poursuite Visuelle | SkillDrills',
    description: "Entraînez la poursuite oculaire le long d'une courbe de Lissajous. Améliorez la stabilité du regard et supprimez les saccades parasites en ligne.",
    url: 'https://skilldrills.online/fr/drills/visual-tracking/constant-slow-pursuit',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mouvements Oculaires – Poursuite Visuelle | SkillDrills',
    description: "Entraînez la poursuite oculaire le long d'une courbe de Lissajous. Améliorez la stabilité du regard et supprimez les saccades parasites en ligne.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/fr" },
    { "@type": "ListItem", "position": 2, "name": "Poursuite Visuelle", "item": "https://skilldrills.online/fr/drills/visual-tracking" },
    { "@type": "ListItem", "position": 3, "name": "Constant Slow Pursuit", "item": "https://skilldrills.online/fr/drills/visual-tracking/constant-slow-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Entraîneur de Poursuite Oculaire Lente SkillDrills",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Any (Web Browser)",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Outil en ligne gratuit d'entraînement oculomoteur pour stabiliser la poursuite fovéale continue le long de courbes de Lissajous."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Constant Slow Pursuit – Entraînement de Poursuite Oculaire",
  "url": "https://skilldrills.online/fr/drills/visual-tracking/constant-slow-pursuit",
  "browserRequirements": "Requires Canvas and High-Resolution Performance Timer API",
  "applicationCategory": "EyeTrainingApplication",
  "creator": {
    "@type": "Organization",
    "name": "SkillDrills"
  }
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Constant Slow Pursuit",
  "description": "Simulateur de poursuite oculaire continue pour supprimer les saccades parasites et maximiser la précision fovéale en sport et jeux vidéo.",
  "genre": ["Visual Training", "Eye Exercise", "Reaction Training"],
  "playMode": "SinglePlayer",
  "gamePlatform": ["PC", "Web Browser", "Mobile"]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu'est-ce que la poursuite oculaire continue (smooth pursuit) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "C'est la rotation continue et fluide des globes oculaires permettant de maintenir l'image d'un objet mobile centrée sur la fovéa sans à-coups ni saccades."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi s'exercer sur une courbe de Lissajous ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La courbe de Lissajous marie des fréquences sinusoïdales harmoniques sans angles droits, forçant les muscles oculaires à ajuster continuellement leur vitesse de glisse sans anticiper de ligne droite."
      }
    },
    {
      "@type": "Question",
      "name": "Que sont les saccades de rattrapage (catch-up saccades) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ce sont de petites saccades involontaires qui surviennent lorsque les yeux décrochent de la vitesse de la cible. Les éliminer permet d'assurer une vision parfaitement stable."
      }
    },
    {
      "@type": "Question",
      "name": "En quoi cet exercice profite-t-il aux joueurs de FPS (Apex, Overwatch) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Il permet de verrouiller le regard sur les adversaires en déplacement sans flou de mouvement rétinien, synchronisant la visée de la souris sur la cible."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi faut-il maintenir la tête strictement immobile ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bouger la tête active le Réflexe Vestibulo-Oculaire (RVO) de l'oreille interne, qui stabilise mécaniquement la vue et annule le renforcement neuromusculaire des yeux."
      }
    },
    {
      "@type": "Question",
      "name": "Cet exercice convient-il aux sportifs (tennis, baseball) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, suivre une balle jusqu'au point de contact fovéal améliore le timing d'impact et la précision spatiale lors des frappes rapides."
      }
    },
    {
      "@type": "Question",
      "name": "Aide-t-il à réduire la fatigue visuelle liée aux écrans ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, regarder des écrans statiques crispe les muscles oculaires. Des mouvements de poursuite fluide détendent les muscles droits et obliques et stimulent le clignement naturel."
      }
    },
    {
      "@type": "Question",
      "name": "À quelle vitesse commencer l'entraînement ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Démarrez à 1.0x. Si vous remarquez des petits soubresauts du regard, descendez à 0.7x jusqu'à obtenir une glisse parfaite, puis progressez vers 1.5x."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la durée quotidienne recommandée ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "De 3 à 5 minutes, 1 à 2 fois par jour, suffisent pour stimuler la plasticité cérébrale sans générer de fatigue oculaire."
      }
    },
    {
      "@type": "Question",
      "name": "Cet outil est-il gratuit et compatible mobile ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, 100% gratuit, sans inscription ni téléchargement, compatible avec tous les navigateurs sur PC, tablette et smartphone."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment S'entraîner à la Poursuite Oculaire Continue sur Navigateur",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Stabiliser la Tête et la Posture",
      "text": "Asseyez-vous à environ 50–70 cm de l'écran avec la tête immobile, le menton calé si nécessaire."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Choisir la Vitesse Initiale",
      "text": "Sélectionnez le multiplicateur (1.0x pour débuter) et lancez la session de 60 secondes."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Verrouiller le Regard sur le Centre de la Cible",
      "text": "Fixez précisément le centre du point lumineux lorsqu'il commence son parcours sur la courbe."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Glisser Continuellement sans Saccades",
      "text": "Accompagnez la vitesse du point de manière fluide sans anticiper ni donner d'à-coups de rattrapage."
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Augmenter la Difficulté",
      "text": "Une fois le mouvement stabilisé, passez à 1.5x ou désactivez la ligne guide pour solliciter la mémoire visuelle."
    }
  ]
};

const guideProps = {
  heading: "Guide de Poursuite Oculaire Lente & Fixation Fovéale",
  intro: [
    "La poursuite oculaire continue (smooth pursuit) est la rotation continue et volontaire des yeux visant à maintenir l'image d'un objet en mouvement focalisée sur la fovéa centrale de la rétine. Lorsqu'un objet se déplace, le système oculomoteur évalue l'écart de vitesse rétinienne (retinal slip) et sollicite les circuits cérébelleux et corticaux (aire temporale médiane et champs oculaires frontaux) pour émettre des commandes motrices en continu (Krauzlis, 2004). À faible vitesse, maintenir cette fluidité requiert un gain neuronal élevé ; si la vitesse oculaire chute, le cerveau est contraint de déclencher des saccades de rattrapage intempestives (Robinson, 1965).",
    "Constant Slow Pursuit propose une trajectoire continue en courbe de Lissajous, conçue sans angles droits afin de renforcer la poursuite à vitesse modérée sans s'appuyer sur des mouvements linéaires prévisibles. En supprimant les virages brusques et en permettant de masquer la ligne guide, cet exercice développe la stabilité fovéale essentielle aux sports de réflexe, au suivi de cible dans les eSports et à la détente visuelle sur écran.",
    "Rigueur ergonomique : L'efficacité motrice repose sur l'isolation du Réflexe Vestibulo-Oculaire (RVO). Si la tête tourne avec le regard, l'oreille interne prend le relais et annule l'entraînement des muscles oculaires (Leigh & Zee, 2015). Gardez la tête parfaitement immobile. Les écrans à 144 Hz ou plus éliminent les saccades de rafraîchissement d'image (Woods et al., 2015). Aucune donnée n'est transmise vers des serveurs distants."
  ],
  benchmarks: {
    title: "Barème de Performance en Poursuite Oculaire & Fixation Fovéale",
    headers: ["Palier de Maîtrise", "Multiplicateur de Vitesse", "Stabilité du Regard & Suppression des Saccades", "Profil Neuromoteur Oculaire"],
    rows: [
      ["Tier 1: Apex Gaze Lock", "2.0x et plus", "Zéro saccade de rattrapage ; fovéa collée sur la cible même dans les virages serrés.", "Synchronisation cérébelleuse prédictive parfaite (Barnes, 2008) ; niveau des joueurs professionnels et sportifs d'élite."],
      ["Tier 2: Poursuite Supérieure", "1.4x – 1.9x", "Glisse continue et fluide ; très légères oscillations aux inversions avec réajustement instantané.", "Excellente coordination des muscles droits et obliques ; netteté optimale des cibles rapides."],
      ["Tier 3: Standard Sain Régulier", "1.0x – 1.3x", "Poursuite stable à vitesse normale ; micro-saccades occasionnelles aux changements de courbure.", "Niveau physiologique sain chez l'adulte ; amplement suffisant pour les activités quotidiennes et le jeu casual."],
      ["Tier 4: Poursuite en Développement", "0.7x – 0.9x", "Le regard décroche fréquemment, entraînant de petits sauts de correction en palier.", "Gain neuromusculaire insuffisant à vitesse lente ; nécessite un entraînement isolé avec tête fixe."],
      ["Tier 5: Phase Initiale", "Inférieur à 0.7x", "Perte répétée de la trajectoire ; mouvements involontaires de la tête ou fatigue rapide.", "Stade d'adaptation initiale ; commencez à la vitesse minimale en veillant au relâchement musculaire."]
    ],
    note: "Barème fondé sur les publications en neurosciences visuelles et oculomotricité (Robinson, 1965 ; Rashbass, 1961 ; Krauzlis, 2004 ; Leigh & Zee, 2015) pour l'évaluation de la continuité fovéale."
  },
  techniques: {
    title: "Quatre Méthodes Scientifiques pour Perfectionner le Smooth Pursuit",
    items: [
      {
        name: "Immobilisation de la Tête pour Isoler le RVO",
        desc: "Comme l'ont établi Leigh & Zee (2015), bouger la tête active le réflexe vestibulaire, neutralisant l'effort d'adaptation des circuits corticaux.",
        tips: "Posez le menton sur la main si besoin et veillez à ne mouvoir que les globes oculaires."
      },
      {
        name: "Ancrage Fovéal au Centre de la Cible",
        desc: "Krauzlis (2004) a prouvé que le glissement rétinien guide le regard. Fixer le centre exact limite la dispersion sensorielle.",
        tips: "Ne regardez pas le point dans sa globalité, visez le centre microscopique de la lumière."
      },
      {
        name: "Projection Prédictive Cérébelleuse",
        desc: "Barnes (2008) a démontré que le cervelet modélise les trajectoires harmoniques, gommant ainsi les 100 ms de délai nerveux.",
        tips: "Anticipez la courbe mentalement pour que le regard s'écoule sans heurts lors des virages."
      },
      {
        name: "Clignements Réguliers et Taux de Rafraîchissement",
        desc: "Un écran 144 Hz ou 240 Hz procure une trajectoire parfaitement continue sans effet de stroboscope (Woods et al., 2015).",
        tips: "Clignez fermement des yeux entre les séries pour maintenir le film lacrymal intact."
      }
    ]
  },
  steps: [
    "Choisissez la vitesse de départ (0.7x à 1.2x) et démarrez la session de 60 secondes.",
    "Gardez la tête immobile à environ 60 cm de votre écran d'ordinateur.",
    "Fixez le centre du point lumineux dès qu'il entame sa translation.",
    "Suivez le mouvement avec une glisse oculaire régulière sans saccades de rattrapage.",
    "Une fois la trajectoire maîtrisée, augmentez la vitesse ou masquez la ligne guide."
  ],
  audience: "Joueurs d'eSports et de FPS (Apex Legends, Valorant, CS2), athlètes de sports de balle (tennis, baseball, tennis de table), étudiants et professionnels exposés aux écrans.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('robinson1965', 'rashbass1961', 'krauzlis2004', 'barnes2008', 'leigh2015', 'woods2015'),
  related: [
    { href: "/fr/drills/visual-tracking/sine-wave-pursuit", label: "Poursuite en Onde Sinusoïdale" },
    { href: "/fr/drills/visual-tracking/infinity-pursuit", label: "Poursuite en Boucle Infinie" },
    { href: "/fr/drills/visual-tracking/directional-chaos-pursuit", label: "Poursuite en Chaos Directionnel" },
    { href: "/fr/drills/visual-tracking/predictive-pursuit", label: "Poursuite Prédictive" },
    { href: "/fr/drills/visual-tracking/dynamic-evasion-pursuit", label: "Poursuite d'Évasion Dynamique" },
    { href: "/fr/drills/visual-tracking/ghosting-suppress-pursuit", label: "Stabilité et Suppression de Ghosting" }
  ]
};

export default function ConstantSlowPursuitFrPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ConstantSlowPursuitClient
        copy={{
          title: "Mouvements Oculaires – Poursuite Visuelle Lente",
          subtitle: "Exercice de Smooth Pursuit et Stabilité Fovéale sur Courbe de Lissajous"
        }}
      />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="/drills/visual-tracking/constant-slow-pursuit" locale="fr" />
      </div>
    </>
  );
}
