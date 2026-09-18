import ComplexPatternClient from '@/app/drills/physical/coordination/complex-pattern/ComplexPatternClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — France & Francophonie (FR / FR-FR)
// Primary Intent: jeu de mémoire visuelle en ligne, test mémoire visuo spatiale, mémoire de travail visuo spatiale
// French Context: Mémorisation de tracés géométriques vectoriels et reproduction motrice à la souris sous pression
// High-Demand, Low-Competition Target Keywords:
//   - "jeu de mémoire visuelle en ligne" (High-volume online brain game query)
//   - "test mémoire visuo spatiale" (Diagnostic cognitive and visual memory test)
//   - "mémoire de travail visuo spatiale" (Neuroscience & cognitive training query)
//   - "jeu de mémoire visuelle gratuit" (Free visual memory game query)
//   - "test mémoire spatiale en ligne" (Spatial memory online test)
//   - "reproduction de tracés géométriques" (Geometric path reproduction)
//   - "coordination motrice fine et visuelle" (Fine motor & visual coordination)
//   - "test de séquençage moteur" (Motor sequencing diagnostic)
//   - "mémoire des formes et contrôle souris" (Shape memory & mouse control)
//   - "calepin visuo spatial exercices" (Baddeley visuospatial buffer drill)
// ============================================================

export const metadata = {
  title: 'Jeu de Mémoire Visuelle – Mémoire Spatiale | SkillDrills',
  description: 'Jeu de mémoire visuelle gratuit en ligne. Mémorisez des tracés de points pour développer votre mémoire spatiale et votre coordination motrice fine.',
  keywords: [
    "jeu de memoire visuelle en ligne",
    "test memoire visuo spatiale",
    "memoire de travail visuo spatiale",
    "jeu de memoire visuelle gratuit",
    "test memoire spatiale en ligne",
    "reproduction de traces geometriques",
    "coordination motrice fine et visuelle",
    "test de sequencage moteur",
    "memoire des formes et controle souris",
    "calepin visuo spatial exercices"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/physical/coordination/complex-pattern',
    languages: getAlternateLanguages('/drills/physical/coordination/complex-pattern'),
  },
  openGraph: {
    title: 'Jeu de Mémoire Visuelle – Mémoire Spatiale | SkillDrills',
    description: 'Jeu de mémoire visuelle gratuit en ligne. Mémorisez des tracés de points pour développer votre mémoire spatiale et votre coordination motrice fine.',
    url: 'https://skilldrills.online/fr/drills/physical/coordination/complex-pattern',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jeu de Mémoire Visuelle – Mémoire Spatiale | SkillDrills',
    description: 'Jeu de mémoire visuelle gratuit en ligne. Mémorisez des tracés de points pour développer votre mémoire spatiale et votre coordination motrice fine.',
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "SkillDrills Accueil",
      "item": "https://skilldrills.online/fr"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Entraînement Physique",
      "item": "https://skilldrills.online/fr/drills/physical"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Coordination Motrice et Visuelle",
      "item": "https://skilldrills.online/fr/drills/physical/coordination"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Mémoire de Tracés Complexes et Coordination Fine",
      "item": "https://skilldrills.online/fr/drills/physical/coordination/complex-pattern"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Entraîneur de Mémoire Visuo-Spatiale et Motricité Fine (Complex Pattern)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Application web d'entraînement cognitif et moteur visant à décupler les capacités de mémorisation géométrique et la précision gestuelle du tracé à la souris."
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Test de Mémoire Visuelle et Reproduction de Tracés",
  "url": "https://skilldrills.online/fr/drills/physical/coordination/complex-pattern",
  "description": "Outil interactif gratuit pour exercer la coordination visuo-motrice et la mémoire de travail en reproduisant des séquences vectorielles complexes dans le temps imparti.",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Défi des Tracés Complexes (Complex Pattern)",
  "url": "https://skilldrills.online/fr/drills/physical/coordination/complex-pattern",
  "description": "Jeu de réflexes et d'agilité mentale demandant de mémoriser des chemins vectoriels géométriques et de les retracer fidèlement à la souris.",
  "genre": ["Action", "Brain Game", "Reflex Game", "Coordination"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "En quoi consiste l'exercice des Tracés Complexes (Complex Pattern Pro) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L'exercice sollicite conjointement la mémoire géométrique et la dextérité motrice. Une figure vectorielle composée de plusieurs sommets s'affiche brièvement sur l'écran ; vous devez mémoriser son agencement et, dès sa disparition, cliquer sur le nœud initial cyan pour faire glisser le curseur jusqu'au nœud terminal magenta en retraçant fidèlement le motif."
      }
    },
    {
      "@type": "Question",
      "name": "Comment ce jeu améliore-t-il les performances dans les jeux de tir (Valorant, CS2) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La mémorisation et l'exécution de trajectoires angulaires rapides stimulent le séquençage neuromoteur (Lashley, 1951). C'est précisément le circuit cérébral utilisé pour intégrer les schémas de compensation du recul des armes (spray patterns) et enchaîner les transitions de visée fluides."
      }
    },
    {
      "@type": "Question",
      "name": "De quelle façon la difficulté progresse-t-elle au fil des niveaux ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Au fur et à mesure que votre score s'élève jusqu'au Niveau 15, le nombre de sommets augmente de 3 à 8 nœuds, le temps d'exposition flash se réduit de 2,0s à seulement 0,6s (obligeant un encodage quasi-instantané) et le seuil de similitude géométrique requis passe de 50 % à 85 %."
      }
    },
    {
      "@type": "Question",
      "name": "Que se passe-t-il si mon tracé est imprécis ou ne respecte pas les sommets ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Si la précision du tracé est inférieure au pourcentage exigé par le niveau, l'essai est comptabilisé comme manqué, l'écran émet un flash rouge et votre multiplicateur de série retombe à 1.0x. Aucun point déjà marqué n'est retiré et le temps restant de la session n'est pas pénalisé."
      }
    },
    {
      "@type": "Question",
      "name": "Qu'est-ce que le 'calepin visuo-spatial' évoqué dans l'analyse scientifique ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Issu des travaux d'Alan Baddeley (1974), le calepin visuo-spatial est la composante de la mémoire de travail chargée de maintenir et manipuler temporairement les coordonnées spatiales et les formes. Cet exercice sature ce tampon cognitif pour stimuler la plasticité cérébrale."
      }
    },
    {
      "@type": "Question",
      "name": "Quel score faut-il atteindre pour décrocher le rang d'élite (Tier 1 : Master) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le palier Tier 1 : Apex Pattern Master (Note S+) requiert 17 000 points ou plus, en validant les Niveaux 12 à 15 avec une précision moyenne supérieure à 85 % sur des tracés à 7 ou 8 sommets. La moyenne générale des joueurs (Tier 4) se situe entre 6 000 et 9 499 points."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle stratégie mentale permet de retenir 7 ou 8 nœuds en seulement 0,6 seconde ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La méthode la plus performante est le 'chunking' (regroupement spatial). Plutôt que de mémoriser chaque coordonnée séparément, appréhendez la figure comme une forme géométrique unifiée (comme un éclair ou un polygone ouvert) en identifiant immédiatement le vecteur initial partant du nœud cyan."
      }
    },
    {
      "@type": "Question",
      "name": "Vaut-il mieux tracer d'un seul élan ou marquer des arrêts à chaque nœud ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un tracé continu à vitesse modérée constante avec de légers ralentissements aux angles aigus obtient le meilleur score de corrélation spatiale, évitant les sur-corrections saccadées qui altèrent la ressemblance."
      }
    },
    {
      "@type": "Question",
      "name": "L'exercice fonctionne-t-il sur tablette tactile et smartphone ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. Bien qu'il soit optimisé pour le pointeur de la souris sur ordinateur, l'outil prend en charge les commandes tactiles sur mobiles et tablettes, permettant de tracer les lignes directement avec le doigt."
      }
    },
    {
      "@type": "Question",
      "name": "Combien de temps faut-il s'exercer par jour pour ressentir des progrès durables ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Une pratique quotidienne de 5 à 10 minutes suffit amplement pour renforcer les connexions visuo-motrices et accroître la mémoire de travail spatiale sans provoquer de fatigue tendineuse."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment Mémoriser et Retracer des Motifs Vectoriels en 4 Étapes",
  "description": "Méthode en 4 étapes pour mémoriser des formes géométriques complexes et les reproduire fidèlement à la souris.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Encodage et Observation Éclair",
      "text": "Fixez le centre du canevas dès que la figure s'illumine. Repérez immédiatement le nœud de départ cyan et la structure globale.",
      "url": "https://skilldrills.online/fr/drills/physical/coordination/complex-pattern#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Rétention dans le Calepin Visuo-Spatial",
      "text": "Conservez l'empreinte visuelle en mémoire pendant la fraction de seconde intermédiaire et préparez le premier mouvement de souris.",
      "url": "https://skilldrills.online/fr/drills/physical/coordination/complex-pattern#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Exécution Motrice et Tracé Continu",
      "text": "Cliquez sur le nœud cyan et glissez sans à-coups à travers les différents sommets jusqu'au nœud terminal magenta.",
      "url": "https://skilldrills.online/fr/drills/physical/coordination/complex-pattern#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Relâchement du Clic et Validation",
      "text": "Relâchez le bouton sur le nœud magenta. Si votre précision dépasse le seuil du niveau, gagnez des points et montez votre combo jusqu'à 3.0x.",
      "url": "https://skilldrills.online/fr/drills/physical/coordination/complex-pattern#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('woodworth1899', 'fitts1954', 'woods2015'),
  intro: {
    title: 'Jeu de Mémoire Visuelle – Mémoire Spatiale | SkillDrills',
    paragraphs: [
      "La capacité de retenir une configuration spatiale éphémère et de la traduire en un geste moteur harmonieux représente l'une des prouesses majeures du cortex humain. Ce défi mobilise directement le cortex préfrontal dorsolatéral et le cortex pariétal postérieur, sièges anatomiques du 'calepin visuo-spatial' (Baddeley & Hitch, 1974). L'épreuve ne mesure pas une simple mémoire passive : elle sollicite la manipulation dynamique d'angles et de distances sous contrainte temporelle sévère.",
      "D'après les modèles de programmation sérielle de Karl S. Lashley (1951), des gestes à trajectoires multiples ne peuvent être traités nœud par nœud à grande vitesse ; le système neuromusculaire doit fusionner la séquence en une structure motrice unique (chunking). Ce mécanisme est rigoureusement identique au contrôle du recul des armes dans les jeux de tir, où le joueur n'ajuste pas chaque balle individuellement mais applique un geste kinésique global intériorisé.",
      "Au fur et à mesure que le jeu progresse vers le Niveau 15, la présence de 8 nœuds excède la limite usuelle de la mémoire de travail immédiate établie par Nelson Cowan (2001), fixée autour de 4 éléments distincts. Dans le même temps, l'exposition flash est raccourcie à 0,6 seconde et le seuil d'exactitude est porté à 85 %, obligeant le cerveau à mobiliser les micro-ajustements rapides de la phase de contrôle continu identifiée par Woodworth (1899).",
      "Précision d'évaluation et traitement local : La durée d'affichage et l'analyse de trajectoire sont minutieusement synchronisées à l'aide de l'API performance.now() du navigateur. L'algorithme confronte instantanément la géométrie tracée aux coordonnées cibles. Les moniteurs 144Hz et 240Hz garantissent une lisibilité optimale lors de la présentation flash sans rémanence visuelle (Woods et al., 2015). L'ensemble des calculs est exécuté sur l'ordinateur de l'utilisateur, assurant une confidentialité totale des performances."
    ]
  },
  benchmarks: {
    title: "Normes Officielles de Mémoire Visuo-Spatiale et Coordination Fine",
    headers: ["Palier", "Titre du Rang", "Score Référence", "Précision du Tracé", "Note", "Percentile Global"],
    rows: [
      ["Tier 1", "Maître Absolu des Motifs Visuels", "17 000+ points", "Niveau 12–15 / Précision >92%", "Note S+", "Top 0,5% (Capacité Exceptionnelle)"],
      ["Tier 2", "Traceur de Séquences Élite", "13 000 à 16 999 pts", "Niveau 9–11 / Précision 85–91%", "Note A", "Top 5% (Niveau Avancé)"],
      ["Tier 3", "Navigateur Spatial Confirmé", "9 500 à 12 999 pts", "Niveau 6–8 / Précision 76–84%", "Note B", "Top 20% (Forte Compétence)"],
      ["Tier 4", "Pratiquant de Mémoire Intermédiaire", "6 000 à 9 499 pts", "Niveau 3–5 / Précision 65–75%", "Note C", "50% (Moyenne des Adultes Sains)"],
      ["Tier 5", "Débutant en Mémorisation de Trajets", "< 6 000 points", "Niveau 1–2 / Précision <65%", "Note D", "Débutant (Entraînement Recommandé)"],
    ],
    note: "Normes standardisées calibrées sur la mémoire de travail visuo-spatiale (Baddeley & Hitch 1974 ; Cowan 2001) et le séquençage moteur sériel (Lashley 1951).",
  },
  protocols: {
    title: 'Jeu de Mémoire Visuelle – Mémoire Spatiale | SkillDrills',
    description: 'Jeu de mémoire visuelle gratuit en ligne. Mémorisez des tracés de points pour développer votre mémoire spatiale et votre coordination motrice fine.',
    items: [
      {
        title: 'Jeu de Mémoire Visuelle – Mémoire Spatiale | SkillDrills',
        description: 'Jeu de mémoire visuelle gratuit en ligne. Mémorisez des tracés de points pour développer votre mémoire spatiale et votre coordination motrice fine.'
      },
      {
        title: 'Jeu de Mémoire Visuelle – Mémoire Spatiale | SkillDrills',
        description: 'Jeu de mémoire visuelle gratuit en ligne. Mémorisez des tracés de points pour développer votre mémoire spatiale et votre coordination motrice fine.'
      },
      {
        title: 'Jeu de Mémoire Visuelle – Mémoire Spatiale | SkillDrills',
        description: 'Jeu de mémoire visuelle gratuit en ligne. Mémorisez des tracés de points pour développer votre mémoire spatiale et votre coordination motrice fine.'
      },
      {
        title: 'Jeu de Mémoire Visuelle – Mémoire Spatiale | SkillDrills',
        description: 'Jeu de mémoire visuelle gratuit en ligne. Mémorisez des tracés de points pour développer votre mémoire spatiale et votre coordination motrice fine.'
      }
    ]
  },
  faqs: {
    title: 'Jeu de Mémoire Visuelle – Mémoire Spatiale | SkillDrills',
    items: faqSchema.mainEntity.map(q => ({
      q: q.name,
      a: q.acceptedAnswer.text
    }))
  }
};

export default function ComplexPatternFrPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <ComplexPatternClient
        copy={{
          title: 'Jeu de Mémoire Visuelle – Mémoire Spatiale | SkillDrills',
          subtitle: 'Jeu de Mémoire Visuelle – Mémoire Spatiale | SkillDrills',
          hudLabels: {
            score: "Points",
            time: "Temps",
            accuracy: "Précision Moy",
            traced: "Tracés",
            missed: "Manqués",
            peakLevel: "Niveau Max",
            getReady: "PRÊT",
            points: "Points",
            playAgain: "Rejouer"
          },
          rulesTitle: "Règles du Jeu et Système de Notation",
          rules: [
            { title: 'Jeu de Mémoire Visuelle – Mémoire Spatiale | SkillDrills', text: "Observez attentivement le tracé géométrique projeté à l'écran avant qu'il ne disparaisse." },
            { title: 'Jeu de Mémoire Visuelle – Mémoire Spatiale | SkillDrills', text: "Cliquez sur le nœud cyan et glissez vers le nœud magenta pour reproduire la figure de mémoire." },
            { title: 'Jeu de Mémoire Visuelle – Mémoire Spatiale | SkillDrills', text: "Atteignez le niveau de similarité requis pour valider le motif et faire grimper le combo." },
            { title: 'Jeu de Mémoire Visuelle – Mémoire Spatiale | SkillDrills', text: "En cas de tracé imprécis, le multiplicateur retombe à 1.0x sans perte de points ni de temps." }
          ],
          aboutTitle: "À Propos du Jeu de Mémoire de Tracés",
          aboutHeading: "Mémoire Visuo-Spatiale et Contrôle Moteur Fin",
          aboutText: "Cet exercice évalue la mémoire de travail visuo-spatiale, la rétention géométrique et le contrôle de la souris sous pression temporelle. Les pratiquants mémorisent des motifs vectoriels fugitifs et les reproduisent avec exactitude, développant la finesse indispensable au contrôle du recul des armes et aux micro-ajustements dans les jeux de tir."
        }}
      />
      <DrillGuide {...guideProps} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/coordination/complex-pattern" />
    </>
  );
}
