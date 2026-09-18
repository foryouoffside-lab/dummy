import MomentumTeleportPursuitClient from '@/app/drills/visual-tracking/momentum-teleport-pursuit/MomentumTeleportPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// FRENCH SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "poursuite oculaire cible teleportee" / "entrainement poursuite avec teleportation"
// Secondary:    "reacquisition saccadique entrainement", "maintien inertie cinetique regard", "exercice saccades oculaires rapides"
// LSI / Domain:  "mouvement saccadique correcteur", "poursuite oculaire lente dynamique", "recentrage foveal instantane",
//               "reflexes visuels jeux de tir", "coordination visuo motrice trajectoire", "stabilite foveale cible mobile", "evaluation motricite oculaire"
// Authentic Domain Terms: Cible Téléportée（Teleported Target）, Maintien de l Inertie（Momentum Preservation）, Réacquisition Saccadique（Saccadic Re-acquisition）, Suppression Saccadique（Saccadic Suppression）, Poursuite Oculaire Post-Saccadique（Post-saccadic Smooth Pursuit）, Saut Balistique Oculaire（Ballistic Saccade）
// ============================================================

export const metadata = {
  title: "Poursuite de Cible Téléportée – Momentum | SkillDrills",
  description: "Testez la poursuite oculaire avec cibles teleportees: entrainez les saccades de reacquisition rapide et le recalibrage dynamique sans aucun telechargement.",
  keywords: [
    "poursuite oculaire cible teleportee",
    "entrainement poursuite avec teleportation",
    "reacquisition saccadique entrainement",
    "maintien inertie cinetique regard",
    "exercice saccades oculaires rapides",
    "mouvement saccadique correcteur",
    "poursuite oculaire lente dynamique",
    "recentrage foveal instantane",
    "reflexes visuels jeux de tir",
    "coordination visuo motrice trajectoire",
    "stabilite foveale cible mobile",
    "evaluation motricite oculaire"
  ],
  openGraph: {
    title: "Poursuite de Cible Téléportée – Momentum | SkillDrills",
    description: "Testez la poursuite oculaire avec cibles teleportees: entrainez les saccades de reacquisition rapide et le recalibrage dynamique sans aucun telechargement.",
    type: "website",
    url: "https://skilldrills.online/fr/drills/visual-tracking/momentum-teleport-pursuit",
    siteName: "SkillDrills",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Poursuite de Cible Téléportée – Momentum | SkillDrills",
    description: "Testez la poursuite oculaire avec cibles teleportees: entrainez les saccades de reacquisition rapide et le recalibrage dynamique sans aucun telechargement.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/visual-tracking/momentum-teleport-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/momentum-teleport-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://skilldrills.online/fr" },
    { "@type": "ListItem", "position": 2, "name": "Exercices", "item": "https://skilldrills.online/fr/drills" },
    { "@type": "ListItem", "position": 3, "name": "Poursuite Visuelle", "item": "https://skilldrills.online/fr/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "Poursuite de Cible Téléportée", "item": "https://skilldrills.online/fr/drills/visual-tracking/momentum-teleport-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Entraînement de Poursuite Oculaire sur Cible Téléportée",
  "operatingSystem": "Navigateur Web",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "description": "Exercice oculomoteur interactif pour mesurer la latence de réacquisition saccadique et la poursuite continue sur cible conservant son inertie."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Application de Poursuite Visuelle sur Cible Téléportée",
  "url": "https://skilldrills.online/fr/drills/visual-tracking/momentum-teleport-pursuit",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "Tous les navigateurs modernes",
  "browserRequirements": "Nécessite la prise en charge de JavaScript et HTML5 Canvas"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Poursuite de Cible Téléportée avec Inertie",
  "description": "Exercice de motricité oculaire où des cibles sautent instantanément de coordonnées tout en conservant leur vitesse vectorielle.",
  "genre": ["Entraînement Visuel", "Évaluation Oculomotrice", "Entraînement des Réflexes"],
  "playMode": "SinglePlayer",
  "gamePlatform": "Navigateur Web"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment Entraîner la Réacquisition Saccadique sur Cible Téléportée",
  "description": "Protocole neurophysiologique étape par étape pour rattraper instantanément des cibles mobiles subissant des sauts spatiaux.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Fixation Fovéale Initiale",
      "text": "Placez-vous à 50 ou 70 cm de votre écran sans bouger la tête. Poursuivez la trajectoire initiale avec une focalisation fovéale stable."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Détection Périphérique du Saut",
      "text": "Dès que la cible se téléporte, repérez sa nouvelle coordonnée spatiale via votre champ rétinien périphérique."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Déclenchement du Saut Saccadique",
      "text": "Projardez une saccade oculaire rectiligne directe vers le nouvel emplacement afin de replacer la fovéa sur la cible."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Reprise Immédiate de la Vitesse",
      "text": "Puisque l inertie cinétique reste constante, enclenchez instantanément la poursuite fluide sans oscillation exploratoire."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "En quoi consiste cet exercice de poursuite sur cible téléportée ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Il conditionne la transition immédiate entre une saccade balistique de réacquisition et la poursuite oculaire continue sur une cible qui saute en préservant son inertie (Rashbass, 1961)."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la distinction physiologique entre saccade et poursuite fluide ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La saccade est un saut oculaire balistique ultra-rapide (jusqu à 700 deg/s) pour rediriger la fovéa, alors que la poursuite fluide est un suivi continu (jusqu à 40 deg/s) stabilisant une image mobile."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi cet entraînement est-il bénéfique pour les joueurs de jeux vidéo (FPS) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dans des jeux comme Apex Legends, Valorant ou Overwatch, les adversaires utilisent des dashs ou des sauts instantanés. Entraîner la réacquisition immédiate supprime le temps mort de recadrage du réticule."
      }
    },
    {
      "@type": "Question",
      "name": "Comment la conservation de l inertie sollicite-t-elle l anticipation visuelle ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En conservant vitesse et direction après le saut, le cervelet exploite des modèles prédictifs internes pour maintenir la vitesse cible pendant la suppression saccadique (Barnes, 2008)."
      }
    },
    {
      "@type": "Question",
      "name": "Qu est-ce qui cause l absence de flou visuel lors d un saut saccadique ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le cerveau déclenche un phénomène appelé suppression saccadique pour atténuer le flou rétinien de rotation. La netteté réapparaît dès l arrivée sur la cible fovéale (Findlay & Walker, 1999)."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi faut-il maintenir la tête complètement immobile ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tout mouvement cervical déclenche le réflexe vestibulo-oculaire (RVO), qui génère une contre-rotation des yeux et retarde le verrouillage. Verrouillez la nuque pour n activer que les muscles oculomoteurs (Leigh & Zee, 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Qu est-ce qu une dysmétrie ou erreur de ciblage saccadique ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Il s agit d un atterrissage en deçà ou au-delà de la cible, nécessitant une micro-saccade de compensation. Un entraînement régulier affine la calibration cérébelleuse et réduit ce décalage."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est l impact du taux de rafraîchissement de l écran ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un écran à taux élevé (144Hz à 360Hz) réduit l incertitude temporelle en fournissant des images toutes les 2,7ms à 6,9ms, ce qui facilite des réacquisitions oculaires nettes (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Ce test d entraînement visuel est-il gratuit et sans publicité intrusive ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, SkillDrills propose cet outil sans frais, sans création de compte et sans abonnement, directement dans votre navigateur web."
      }
    },
    {
      "@type": "Question",
      "name": "Comment la répétition de ces mouvements stimule-t-elle la plasticité cérébrale ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L enchaînement fréquent de saccades et de poursuites sollicite le flocculus cérébelleux et les réseaux fronto-striataux, renforçant l acuité visuelle dynamique et la coordination fovéale (Bahill et al., 1980)."
      }
    }
  ]
};

const guideProps = {
  heading: "Principes Scientifiques de Poursuite Visuelle avec Inertie et Téléportation",
  intro: [
    "Dans les environnements visuels dynamiques, les objets en mouvement ne parcourent pas toujours des lignes stables et ininterrompues. Les déviations soudaines, rebonds imprévisibles et occultations spatiales forcent le système visuel humain à articuler deux sous-systèmes moteurs distincts : les saccades balistiques pour localiser l objet déplacé, et la poursuite oculaire lente pour en égaler la vitesse (Rashbass, 1961 ; Findlay & Walker, 1999).",
    "Cet exercice isole avec rigueur ce mécanisme neuromusculaire. La cible change instantanément de position spatiale tout en conservant son vecteur de vitesse et sa trajectoire. Pour exceller, les centres oculomoteurs doivent déclencher une saccade correctrice rectiligne et réenclencher immédiatement la vitesse de poursuite sans oscillation exploratoire (Bahill et al., 1980 ; Barnes, 2008).",
    "Les facteurs de latence d affichage et de fréquence d échantillonnage des périphériques influencent la précision fovéale mesurée (Woods et al., 2015). Toutes les données de performance restent stockées localement dans votre navigateur pour une confidentialité totale."
  ],
  benchmarks: {
    title: "Mesures de Réacquisition Spatiale et Synchronisation de l Inertie",
    headers: ["Niveau de Performance", "Latence de Réacquisition (Fovéation)", "Écart d Atterrissage (Overshoot)", "Synchronisation Cinétique (Gain)", "Profil Neurophysiologique"],
    rows: [
      ["Élite (Pro-Aiming & Esport)", "< 140 ms", "< 3% (verrouillage parfait)", "97%+", "Précision balistique sans faille. Enchaînement immédiat avec la poursuite fluide sans oscillation de recherche."],
      ["Avancé (Niveau Compétition)", "140 – 180 ms", "3% – 6%", "91% – 96%", "Réacquisition spatiale rapide. Micro-saccade correctrice minime avec excellente fidélité cinématique."],
      ["Compétent (Adulte Sain)", "181 – 240 ms", "7% – 14%", "80% – 90%", "Valeur de référence standard. Courte pause réfractaire après la saccade suivie d un guidage stable."],
      ["En Progression", "241 – 320 ms", "15% – 24%", "68% – 79%", "Retard sensible dans l émission du saut oculaire. Dépassages fréquents nécessitant plusieurs ajustements."],
      ["Débutant / Rééducation", "> 320 ms", "> 24%", "< 68%", "Difficulté notable sur les grands déplacements angulaires. Mouvements compensatoires de la tête présents."]
    ],
    note: "※ Valeurs de référence établies lors d études oculomotrices à 50–70 cm de distance avec des vitesses de 1,0x à 2,0x sur des séquences de 60 secondes. La latence évalue l intervalle entre le saut et le verrouillage fovéal."
  },
  techniques: {
    title: "Quatre Principes Fondamentaux pour une Réacquisition Immédiate",
    items: [
      {
        name: "Trajectoire Balistique Rectiligne Directe",
        desc: "Exécutez la saccade selon la ligne droite la plus courte reliant le point d origine et le nouvel emplacement. Tout arc de recherche ralentit la réacquisition fovéale (Findlay & Walker, 1999).",
        tips: "Faites confiance aux repères périphériques et propulsez le regard de manière franche vers la coordonnée cible."
      },
      {
        name: "Maintien Mental du Vecteur de Vitesse",
        desc: "Bien que la cible change subitement de coordonnée, son vecteur de déplacement demeure intact. Utilisez le modèle prédictif interne du cervelet durant la suppression saccadique (Barnes, 2008).",
        tips: "Ne prévoyez pas une cible immobile à l atterrissage ; préparez vos yeux à glisser dès la fin de la saccade."
      },
      {
        name: "Anticipation du Point d Atterrissage",
        desc: "La saccade oculaire requiert entre 20 et 40 ms de transit, période pendant laquelle la cible continue de progresser. Posez le regard légèrement en avant de la coordonnée d arrivée.",
        tips: "Une légère avance compense le temps de parcours et évite d atterrir en retrait du mobile."
      },
      {
        name: "Immobilité Cervicale Rigoureuse",
        desc: "Les grands sauts incitent instinctivement à faire pivoter la tête. Le réflexe vestibulo-oculaire déstabilise la fixation fovéale par une contre-rotation indésirable (Leigh & Zee, 2015).",
        tips: "Maintenez le menton parfaitement stable afin que seuls les muscles extra-oculaires réalisent l effort."
      }
    ]
  },
  steps: [
    "Installez-vous confortablement à 50–70 cm de votre écran, nuque stable et tête immobile.",
    "Sélectionnez la durée de la séance (30 à 120 secondes) et la vitesse souhaitée (0,5x à 9,0x).",
    "Fixez le centre du mobile et suivez attentivement sa trajectoire initiale.",
    "Lors du saut spatial subit, projardez immédiatement une saccade rectiligne vers la nouvelle coordonnée.",
    "Dès le contact visuel, enchaînez la poursuite continue en vous calquant sur la vitesse conservée du mobile."
  ],
  audience: "Joueurs de jeux de tir compétitifs (Valorant, CS2, Overwatch 2, Apex Legends), sportifs de disciplines de balle confrontés à des trajectoires imprévisibles et adeptes de gymnastique oculaire.",
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('rashbass1961', 'bahill1980', 'findlay1999', 'krauzlis2004', 'barnes2008', 'woods2015'),
  related: [
    { href: "/fr/drills/visual-tracking/constant-slow-pursuit", label: "Poursuite Oculaire Lente Continue (Constant Slow)" },
    { href: "/fr/drills/visual-tracking/directional-chaos-pursuit", label: "Poursuite avec Chaos Directionnel (Directional Chaos)" },
    { href: "/fr/drills/visual-tracking/dynamic-evasion-pursuit", label: "Poursuite Évasive Réactive (Dynamic Evasion)" },
    { href: "/fr/drills/visual-tracking/ghosting-suppress-pursuit", label: "Stabilité de Fixation Oculaire (Ghosting Suppress)" },
    { href: "/fr/drills/visual-tracking/infinity-pursuit", label: "Entraînement en Huit Infini (Infinity)" },
    { href: "/fr/drills/visual-tracking/predictive-pursuit", label: "Poursuite Oculaire Prédictive (Predictive)" }
  ]
};

export default function FrenchMomentumTeleportPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <MomentumTeleportPursuitClient
        copy={{
          title: "Entraînement de Poursuite Visuelle sur Cible Téléportée",
          subtitle: "Évaluation Oculomotrice de Saccades Balistiques et Reconnexion de Poursuite Fluide",
          description: "Entraînement visuel dynamique sur cibles conservant leur inertie cinétique et se téléportant subitement à l écran. Développez l alternance instantanée entre saccades balistiques et poursuite fluide sans oscillation parasite. Gratuit dans votre navigateur."
        }}
      />

      <DrillGuide guide={guideProps} />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/fr/drills/visual-tracking/momentum-teleport-pursuit" />
      </div>
    </>
  );
}
