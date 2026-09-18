import ZigZagPathPursuitClient from '@/app/drills/visual-tracking/zig-zag-path-pursuit/ZigZagPathPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Poursuite Visuelle en Zigzag – SkillDrills",
  description: "Entraînez la poursuite visuelle rapide en zigzag et supprimez les dépassements de trajectoire. Test oculomoteur gratuit pour sportifs et gamers.",
  keywords: [
    "poursuite visuelle en zigzag",
    "entraînement oculomoteur trajectoire brisée",
    "exercices de changement brusque de direction visuelle",
    "freinage et accélération du regard sport",
    "suppression des dépassements du regard saccades",
    "coordination oculomotrice réflexes sportifs",
    "test de poursuite fovéale dynamique",
    "exercices de motricité oculaire rapide",
    "précision visuelle et virages rapides",
    "entraînement neuro-visuel réflexes en ligne",
    "agilité visuelle pour sportifs et gamers",
    "test de réaction visuelle dynamique gratuit"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/visual-tracking/zig-zag-path-pursuit",
    languages: getAlternateLanguages('drills/visual-tracking/zig-zag-path-pursuit')
  },
  openGraph: {
    title: "Poursuite Visuelle en Zigzag – SkillDrills",
    description: "Entraînez la poursuite visuelle rapide en zigzag et supprimez les dépassements de trajectoire. Test oculomoteur gratuit pour sportifs et gamers.",
    url: "https://skilldrills.online/fr/drills/visual-tracking/zig-zag-path-pursuit",
    siteName: "SkillDrills",
    locale: "fr_FR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Poursuite Visuelle en Zigzag – SkillDrills",
    description: "Entraînez la poursuite visuelle rapide en zigzag et supprimez les dépassements de trajectoire. Test oculomoteur gratuit pour sportifs et gamers."
  }
};

export default function ZigZagPathPursuitPageFR() {
  const sources = pickSources(
    'debrouwer2002',
    'krauzlis2004',
    'orbandexivry2007',
    'bennett2006',
    'barnes2008',
    'woods2015'
  );

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://skilldrills.online/fr" },
      { "@type": "ListItem", "position": 2, "name": "Entraînement Visuel", "item": "https://skilldrills.online/fr/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Poursuite en Zigzag", "item": "https://skilldrills.online/fr/drills/visual-tracking/zig-zag-path-pursuit" }
    ]
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Entraîneur de Poursuite en Zigzag",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Entraînement neurocognitif de poursuite en ligne brisée et extinction des dépassements saccadiques lors de virages angulaires serrés."
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Exercice de Poursuite Vectorielle en Zigzag",
    "url": "https://skilldrills.online/fr/drills/visual-tracking/zig-zag-path-pursuit",
    "applicationCategory": "TrainingTool",
    "browserRequirements": "Requires JavaScript. HTML5 Canvas compatible."
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Défi de Poursuite en Zigzag",
    "gamePlatform": "Web Browser",
    "genre": ["Visual Training", "Eye Tracking Drill", "Esports Reflex"]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Comment Maîtriser la Poursuite Oculaire en Zigzag",
    "description": "Protocole pour acquérir le freinage fovéal feedforward et éviter le dépassement aux sommets aigus.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Posture Fixe et Alignement",
        "text": "Placez-vous à environ 50-60 cm de votre moniteur, tête immobile, et fixez le repère sur sa première lancée diagonale."
      },
      {
        "@type": "HowToStep",
        "name": "Poursuite Rectiligne Harmonieuse",
        "text": "Suivez le trajet en mobilisant de manière proportionnelle les muscles droits horizontaux et verticaux."
      },
      {
        "@type": "HowToStep",
        "name": "Freinage Précis au Sommet de Virage",
        "text": "À l approche immédiate du sommet en dent de scie, enclenchez la décélération pour ne pas déborder hors du virage."
      },
      {
        "@type": "HowToStep",
        "name": "Hausse Progressivede Cadence",
        "text": "Montez en vitesse lorsque votre écart moyen aux angles reste en dessous de 38 pixels."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Pourquoi la trajectoire en zigzag est-elle particulièrement complexe à suivre?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Elle combine une vélocité constante sur les arêtes et des inversions instantanées à haute fréquence, imposant une alternance ultra-rapide entre muscles agonistes et antagonistes."
        }
      },
      {
        "@type": "Question",
        "name": "Quels centres cérébraux pilotent la décélération avant chaque virage?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le cervelet (vermis dorsal et flocculus), les ganglions de la base et le cortex frontal (FEF) émettent des décharges inhibitrices anticipatoires pour freiner le regard à l angle exact."
        }
      },
      {
        "@type": "Question",
        "name": "Qu est-ce que le dépassement (overshoot) et comment l éviter?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "C est l inertie motrice qui propulse le regard au-delà du sommet. On l élimine en renforçant le modèle prédictif feedforward par des entraînements répétés."
        }
      },
      {
        "@type": "Question",
        "name": "Quel avantage ce module offre-t-il aux sportifs et joueurs compétitifs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Il affine la faculté de bloquer net la visée sur un angle et d enchaîner sans flottement sur une cible fuyante en mouvement saccadé."
        }
      },
      {
        "@type": "Question",
        "name": "Pourquoi insister sur l immobilité stricte de la tête?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Garder la tête fixe neutralise la compensation du réflexe vestibulo-oculaire (RVO), concentrant l ensemble du travail sur la commande oculomotrice pure."
        }
      },
      {
        "@type": "Question",
        "name": "Quel est le volume quotidien optimal d entraînement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Des séquences de 6 à 10 minutes par jour, découpées en séries courtes de 60 secondes avec des pauses de repos, maximisent l adaptation synaptique."
        }
      },
      {
        "@type": "Question",
        "name": "Qu est-ce que le glissement rétinien lors des renversements de cap?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "C est le décrochage visuel instantané qui survient quand la cible bifurque, servant de stimulus biologique pour déclencher la saccade de correction."
        }
      },
      {
        "@type": "Question",
        "name": "Un écran 144Hz ou 240Hz fait-il une réelle différence?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, il restitue le point d impact du virage avec une netteté totale et sans latence d affichage, optimisant l estimation temporelle du freinage."
        }
      },
      {
        "@type": "Question",
        "name": "En quoi le zigzag diffère-t-il d une onde sinusoïdale?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "L onde sinusoïdale amortit sa course en courbe aux sommets, alors que le zigzag maintient sa pleine vitesse jusqu au point angulaire avant de bifurquer net."
        }
      },
      {
        "@type": "Question",
        "name": "Comment le calcul de performance évalue-t-il la précision?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "L algorithme scrute la distance pixel continue entre le curseur et la cible, en sanctionnant lourdement les dépassements et les coupes anticipées."
        }
      }
    ]
  };

  const guide = {
    title: "Guide Scientifique de Poursuite en Zigzag et Contrôle d Inflexion",
    intro: "La poursuite fovéale le long de trajectoires brisées en zigzag constitue un défi moteur extrême. Tandis que les segments rectilignes sollicitent la coordination fine des noyaux pontiques (PPRF) et mésencéphaliques (riMLF), les sommets aigus de 60 degrés provoquent une chute instantanée de la vitesse rétinienne et un pic d erreur spatiale. Comme le montrent de Brouwer et al. (2002) et Krauzlis (2004), la réussite dans cette tâche exige un freinage feedforward vigoureux piloté par le cortex frontal et tempéré par le cervelet pour étouffer les dépassements inertiels.",
    benchmarks: {
      title: "Normes de Performance en Zigzag (Vitesse et Précision aux Inflexions)",
      headers: ["Niveau de Maîtrise", "Multiplicateur de Vitesse", "Erreur au Sommet", "Latence Saccadique de Virage", "Percentile Mondial"],
      rows: [
        ["Élite / Maître de la Reversion Rapide", "3.5x – 5.0x+", "Erreur < 12 px (fixation parfaite au virage)", "Latence < 110 ms (freinage prédictif)", "Top 1.5%"],
        ["Maître / Haute Discipline Vectorielle", "2.5x – 3.5x", "Erreur < 22 px (microsaccades minimes)", "Latence < 140 ms (virages fluides)", "Top 8%"],
        ["Avancé / Athlète Compétitif", "1.8x – 2.5x", "Erreur < 38 px (réacquisition rapide)", "Latence < 180 ms (transitions stables)", "Top 25%"],
        ["Intermédiaire / Pratiquant Régulier", "1.2x – 1.8x", "Erreur 38 – 70 px (dépassements et virages coupés)", "Latence 180 – 240 ms (corrections multiples)", "Moyenne 45%"],
        ["Débutant / Non Initié", "0.5x – 1.2x", "Erreur > 70 px (perte complète aux sommets)", "Latence > 250 ms (dépassement marqué)", "Niveau de Base"]
      ],
      note: "Barèmes établis d après de Brouwer et al. (2002) sur la dynamique des saccades correctives et Krauzlis (2004) sur le contrôle moteur lors de rapides changements de vitesse et de direction."
    },
    instructions: [
      "Fixez la cible fovéale et suivez la course diagonale initiale.",
      "Anticipez le point de virage et déclenchez un freinage moteur souple avant la bascule.",
      "Projetez une microsaccade réactive pour vous caler sans à-coup sur le vecteur opposé.",
      "Augmentez la vitesse dès que votre erreur de virage demeure sous les 38 px."
    ],
    tips: [
      "Ne coupez pas la courbe: parcourez l arête complète jusqu au point angulaire extrême.",
      "Conservez une prise détendue sur la souris pour éviter toute tension au poignet.",
      "Gardez une respiration régulière pour stabiliser l innervation musculaire des yeux."
    ],
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

      <ZigZagPathPursuitClient
        copy={{
          title: "Poursuite en Zigzag",
          subtitle: "Entraînement Oculomoteur en Dent de Scie",
          description: "Poursuivez une cible sur des trajectoires en zigzag serrées et développez un contrôle feedforward pour freiner net le regard et supprimer les dépassements aux sommets angulaires."
        }}
      />
      <DrillGuide guide={guide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/fr/drills/visual-tracking/zig-zag-path-pursuit" />
      </div>
    </>
  );
}
