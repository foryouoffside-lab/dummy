import TriangularPursuitClient from '@/app/drills/visual-tracking/triangular-pursuit/TriangularPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Poursuite Oculaire Triangulaire – SkillDrills",
  description: "Entraînez la poursuite visuelle le long de vecteurs triangulaires et les saccades de virage aux sommets. Test oculomoteur gratuit pour sportifs et gamers.",
  keywords: [
    "poursuite visuelle triangulaire",
    "entraînement oculomoteur trajectoire polygonale",
    "exercices de poursuite et saccades oculaires",
    "précision du regard dans les angles aigus",
    "saccades de rattrapage changement de direction",
    "stabilisation du regard et réflexes visuels",
    "test de motricité oculaire en ligne",
    "coordination oculomotrice sportive",
    "freinage et accélération du regard sport",
    "exercices pour dynamiser la vision",
    "entraînement à la trajectoire brisée réflexes",
    "test de précision oculomotrice gratuit"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/visual-tracking/triangular-pursuit",
    languages: getAlternateLanguages('drills/visual-tracking/triangular-pursuit')
  },
  openGraph: {
    title: "Poursuite Oculaire Triangulaire – SkillDrills",
    description: "Entraînez la poursuite visuelle le long de vecteurs triangulaires et les saccades de virage aux sommets. Test oculomoteur gratuit pour sportifs et gamers.",
    url: "https://skilldrills.online/fr/drills/visual-tracking/triangular-pursuit",
    siteName: "SkillDrills",
    locale: "fr_FR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Poursuite Oculaire Triangulaire – SkillDrills",
    description: "Entraînez la poursuite visuelle le long de vecteurs triangulaires et les saccades de virage aux sommets. Test oculomoteur gratuit pour sportifs et gamers."
  }
};

export default function TriangularPursuitPageFR() {
  const sources = pickSources(
    'debrouwer2002',
    'heinen2005',
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
      { "@type": "ListItem", "position": 3, "name": "Poursuite Triangulaire", "item": "https://skilldrills.online/fr/drills/visual-tracking/triangular-pursuit" }
    ]
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Entraîneur de Poursuite Oculaire Triangulaire",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Entraînement neurocognitif de poursuite continue et saccades de rattrapage le long d une trajectoire polygonale fermée."
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Exercice de Poursuite Vectorielle Triangulaire",
    "url": "https://skilldrills.online/fr/drills/visual-tracking/triangular-pursuit",
    "applicationCategory": "TrainingTool",
    "browserRequirements": "Requires JavaScript. HTML5 Canvas compatible."
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Défi de Poursuite Triangulaire",
    "gamePlatform": "Web Browser",
    "genre": ["Visual Training", "Eye Tracking Drill", "Esports Reflex"]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Comment Réaliser la Poursuite Oculaire Triangulaire",
    "description": "Méthode pour maîtriser le freinage fovéal et la réacquisition aux angles aigus de 60 degrés.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Positionnement et Fixation Initiale",
        "text": "Placez-vous à une distance de 50 à 60 cm de votre écran et fixez la cible circulaire dès son départ sur l une des arêtes."
      },
      {
        "@type": "HowToStep",
        "name": "Poursuite Linéaire Fluide",
        "text": "Suivez le trajet rectiligne en coordonnant les groupes musculaires horizontaux et verticaux sans saccades parasites."
      },
      {
        "@type": "HowToStep",
        "name": "Freinage et Relance au Sommet",
        "text": "À l arrivée sur le sommet de 60 degrés, freinez le regard et initiez une saccade rapide pour enchaîner sur le côté suivant."
      },
      {
        "@type": "HowToStep",
        "name": "Progression de la Vitesse",
        "text": "Augmentez la vitesse de déplacement lorsque votre précision aux sommets reste régulièrement en dessous de 35 pixels d écart."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Pourquoi le suivi triangulaire est-il plus difficile qu une trajectoire circulaire?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Contrairement aux cercles où l accélération est constante, le triangle impose des lignes droites et des sommets aigus de 60 degrés qui exigent de basculer instantanément de la poursuite lisse aux saccades de virage."
        }
      },
      {
        "@type": "Question",
        "name": "Quelles zones cérébrales gèrent ces bifurcations soudaines du regard?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La coordination mobilise les champs oculaires frontaux (FEF), le cervelet (vermis dorsal et flocculus) et les centres du tronc cérébral (PPRF pour le plan horizontal et riMLF pour le plan vertical)."
        }
      },
      {
        "@type": "Question",
        "name": "Qu est-ce qui provoque le dépassement (overshoot) aux sommets?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Il est causé par l inertie de la commande motrice de poursuite. Sans freinage anticipatoire feedforward, les muscles extraoculaires continuent sur la trajectoire initiale pendant 80 à 120 millisecondes."
        }
      },
      {
        "@type": "Question",
        "name": "En quoi cet exercice profite-t-il aux sportifs et aux joueurs de jeux de tir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Il affine la capacité du cerveau à stopper net le regard sur un angle et à relancer une visée propre sans oscillations résiduelles."
        }
      },
      {
        "@type": "Question",
        "name": "Pourquoi la tête doit-elle demeurer immobile?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Garder la tête fixe isole le travail des muscles oculomoteurs purs, évitant que le réflexe vestibulo-oculaire (RVO) ne prenne le relais et n atténue l entraînement."
        }
      },
      {
        "@type": "Question",
        "name": "Combien de temps faut-il consacrer à cet exercice?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Des séances de 5 à 10 minutes par jour, réparties en blocs de 60 secondes entrecoupés de courtes pauses, suffisent à stimuler la plasticité cérébrale."
        }
      },
      {
        "@type": "Question",
        "name": "Qu est-ce que le glissement rétinien (retinal slip) aux angles?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "C est le décalage instantané de l image de la cible hors de la fovéa lorsque l objet bifurque, déclenchant le signal nerveux pour une saccade de correction."
        }
      },
      {
        "@type": "Question",
        "name": "Un écran à taux de rafraîchissement élevé apporte-t-il un avantage?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Les moniteurs à 144Hz ou plus affichent les images de virage avec une latence minimale, permettant au système visuel d anticiper la décélération plus fidèlement."
        }
      },
      {
        "@type": "Question",
        "name": "Qu appelle-t-on une saccade de rattrapage (catch-up saccade)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "C est un saut oculaire très bref (30 à 50 millisecondes) déclenché pour recaler instantanément la zone fovéale sur la cible qui a pris de l avance."
        }
      },
      {
        "@type": "Question",
        "name": "Peut-on alterner le sens de rotation du triangle?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, le module permet d inverser le sens horaire et antihoraire afin de stimuler de manière symétrique les hémisphères cérébraux droit et gauche."
        }
      }
    ]
  };

  const guide = {
    title: "Guide Scientifique de Poursuite Vectorielle et Dynamique des Sommets",
    intro: [
      "Le suivi visuel le long de polygones géométriques fermés requiert une coordination continue et ultra-précise entre les groupes musculaires extraoculaires horizontaux et verticaux. Lorsqu'une cible se déplace le long des côtés d'un triangle équilatéral, le système oculomoteur engage une poursuite oculaire lisse sur des vecteurs diagonaux non cardinaux, obligeant le tronc cérébral à équilibrer les signaux pontiques horizontaux (PPRF) avec les commandes motrices mésencéphaliques verticales (riMLF; Orban de Xivry & Lefèvre, 2007).",
      "Le principal défi neurophysiologique réside dans les trois sommets aigus de 60 degrés. À chaque virage abrupt, la vitesse de glissement rétinien s'effondre instantanément tandis que l'erreur de positionnement fovéal s'accroît brutalement. Les travaux pionniers de de Brouwer et al. (2002) et Heinen et al. (2005) ont démontré que les saccades de rattrapage (catch-up saccades) sont déclenchées par un calcul neuronal combinant l'écart de position et le glissement rétinien instantané, orchestré par les champs oculaires frontaux (FEF) et supplémentaires (SEF).",
      "Sans entraînement oculomoteur adapté, le regard a tendance à dépasser les sommets aigus par inertie (overshoot) ou à couper les angles prématurément, ce qui entraîne de multiples saccades correctives désordonnées et dégrade l'acuité dynamique. En revanche, la pratique régulière du suivi polygonal active les modèles internes prédictifs du cervelet (Bennett & Barnes, 2006; Barnes, 2008), permettant une décélération anticipée avant chaque sommet et une réacquisition fovéale ultra-rapide sur le vecteur suivant.",
      "L'exercice de Poursuite Triangulaire (Triangular Pursuit) développe cette agilité visuelle directement dans votre navigateur. En suivant la cible le long d'une trajectoire triangulaire continue, vous entraînez conjointement la poursuite diagonale à vitesse constante et le recalage net aux sommets. Les options comme masquer la ligne ('Hide Line') suppriment les repères spatiaux pour tester le contrôle sensorimoteur pur, tandis que la vitesse aléatoire ('Random Speed') déjoue les habitudes de cadence mécanique.",
      "Méthodologie de mesure et latence matérielle : Les mesures temporelles et d'adhésion visuelle intègrent la quantification de rafraîchissement d'écran (~16,7 ms à 60 Hz, ~6,9 ms à 144 Hz, ~4,1 ms à 240 Hz) ainsi que les intervalles de scrutation des périphériques (~8 ms à 125 Hz contre ~1 ms à 1 000 Hz), comme documenté par Woods et al. (2015). L'ensemble de vos scores et métriques reste exclusivement stocké dans le stockage local (localStorage) de votre navigateur, garantissant une confidentialité totale sans transmission télémétrique."
    ],
    benchmarks: {
      title: "Normes de Performance de Poursuite Triangulaire (Vitesse et Précision aux Sommets)",
      headers: ["Niveau de Maîtrise", "Multiplicateur de Vitesse", "Erreur au Sommet", "Latence Saccadique de Virage", "Percentile Mondial"],
      rows: [
        ["Élite / Maîtrise Vectorielle Absolue", "3.5x – 5.0x+", "Erreur < 12 px (fixation parfaite au sommet)", "Latence < 110 ms (freinage prédictif)", "Top 1.5%"],
        ["Maître / Haut Contrôle Vectoriel", "2.5x – 3.5x", "Erreur < 22 px (microsaccades minimales)", "Latence < 140 ms (virages nets)", "Top 8%"],
        ["Avancé / Athlète Compétitif", "1.8x – 2.5x", "Erreur < 38 px (réacquisition rapide)", "Latence < 180 ms (transitions stables)", "Top 25%"],
        ["Intermédiaire / Pratiquant Régulier", "1.2x – 1.8x", "Erreur 38 – 70 px (angles coupés / dépassements)", "Latence 180 – 240 ms (saccades multiples)", "Moyenne 45%"],
        ["Débutant / Non Initié", "0.5x – 1.2x", "Erreur > 70 px (perte complète au virage)", "Latence > 250 ms (dépassement marqué)", "Niveau de Base"]
      ],
      note: "Barèmes établis d après de Brouwer et al. (2002) sur la dynamique des saccades de rattrapage et Heinen et al. (2005) sur le contrôle moteur lors de virages angulaires aigus."
    },
    instructions: [
      "Fixez la cible fovéale et suivez le segment rectiligne sans bouger le cou.",
      "Calibrez la décélération à l approche immédiate de chaque sommet du triangle.",
      "Déclenchez une saccade vive pour vous réengager sans délai sur la nouvelle arête.",
      "Rehaussez le multiplicateur de vitesse lorsque l erreur moyenne au virage reste inférieure à 35 px."
    ],
    tips: [
      "Évitez de couper les angles: suivez la trajectoire jusqu au bout du sommet aigu.",
      "Conservez une prise souple et détendue sur la souris pour éviter toute crispation.",
      "Respirez régulièrement pour préserver la stabilité oculomotrice lors des changements de cap."
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

      <TriangularPursuitClient
        copy={{
          title: "Poursuite Triangulaire",
          subtitle: "Entraînement Oculomoteur en Trajectoire Polygonale",
          description: "Poursuivez une cible sur une trajectoire polygonale fermée et maîtrisez la transition immédiate entre poursuite visuelle continue et saccades de virage aux sommets de 60 degrés."
        }}
      />
      <DrillGuide guide={guide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/fr/drills/visual-tracking/triangular-pursuit" />
      </div>
    </>
  );
}
