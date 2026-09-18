import MotorSequencingClient from '@/app/drills/physical/fitness/agility-ladder/MotorSequencingClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';

// ============================================================
// RECHERCHE DE MOTS-CLÉS NATIFS (SERP FRANCE / FR-FR)
// Requêtes à forte intention sportive et psychomotrice :
// - "exercices échelle d'agilité" (Requête dominante entraînement et footwork)
// - "échelle de rythme exercices" (Cadence neuromusculaire et coordination)
// - "échelle de vélocité entraînement" (Vitesse d'appuis en football et athlétisme)
// - "travail des appuis et vivacité" (Terminologie de préparation physique française)
// - "entraînement agilité et vitesse" (Développement des qualités motrices)
// - "coordination motrice bilatérale souris" (Transposition eSport / bureautique)
// - "rythme counter strafe" (Mécanique de tir et arrêt instantané en FPS)
// - "test de vitesse et vivacité" (Évaluation de réactivité sur navigateur)
// ============================================================

export const metadata = {
  title: "Échelle d'Agilité – Travail des Appuis | SkillDrills",
  description: "Exercices d'échelle d'agilité en ligne gratuits. Développez votre vitesse d'appuis, coordination motrice et jeu de jambes pour le football et le sport.",
  keywords: [
    "exercices echelle d'agilite",
    "echelle de rythme exercices",
    "echelle de velocite entrainement",
    "travail des appuis et vivacite",
    "entrainement agilite et vitesse",
    "coordination motrice bilaterale souris",
    "rythme counter strafe",
    "test de vitesse et vivacite",
    "sequencage moteur reflexe",
    "jeu de rythme moteur"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/physical/fitness/agility-ladder',
    languages: getAlternateLanguages('/drills/physical/fitness/agility-ladder'),
  },
  openGraph: {
    title: "Échelle d'Agilité – Travail des Appuis | SkillDrills",
    description: "Exercices d'échelle d'agilité en ligne gratuits. Développez votre vitesse d'appuis, coordination motrice et jeu de jambes pour le football et le sport.",
    url: 'https://skilldrills.online/fr/drills/physical/fitness/agility-ladder',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Échelle d'Agilité – Travail des Appuis | SkillDrills",
    description: "Exercices d'échelle d'agilité en ligne gratuits. Développez votre vitesse d'appuis, coordination motrice et jeu de jambes pour le football et le sport.",
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
      "name": "Condition Physique et Vivacité",
      "item": "https://skilldrills.online/fr/drills/physical/fitness"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Échelle d'Agilité & Travail des Appuis",
      "item": "https://skilldrills.online/fr/drills/physical/fitness/agility-ladder"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Exercices d'Échelle d'Agilité et Séquençage Moteur",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Simulateur numérique d'échelle de rythme et de vivacité motrice pour développer la coordination bilatérale et le tempo des appuis.",
  "url": "https://skilldrills.online/fr/drills/physical/fitness/agility-ladder",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online/fr"
  },
  "inLanguage": "fr-FR",
  "dateModified": "2026-09-12"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Entraîneur de Cadence et Vivacité Motrice",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Navigateur moderne compatible HTML5 Canvas et Pointer Lock API",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/fr/drills/physical/fitness/agility-ladder",
  "inLanguage": "fr-FR",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Jeu d'Échelle d'Agilité (Agility Ladder Drill)",
  "url": "https://skilldrills.online/fr/drills/physical/fitness/agility-ladder",
  "description": "Entraînement de vivacité neuromusculaire et séquençage moteur sur des échelons défilants pour maîtriser le jeu de jambes et le counter-strafing.",
  "genre": [
    "Fitness Drill",
    "Motor Sequencing",
    "Rhythm Training",
    "Action"
  ],
  "gamePlatform": [
    "Web Browser",
    "Desktop",
    "Mobile"
  ],
  "applicationCategory": "Game",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-12",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quelle est la base biomécanique de l'échelle d'agilité appliquée au contrôle du curseur ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L'exercice adapte l'échelle de rythme athlétique au déplacement manuel. En franchissant rapidement les échelons descendants (gauche-droite-gauche-droite), le cortex moteur mobilise le séquençage sériel de Lashley (1951), réunissant plusieurs ajustements balistiques en un schéma moteur fluide et unifié."
      }
    },
    {
      "@type": "Question",
      "name": "Qu'apporte le Programme Moteur Généralisé (GMP) de Schmidt à la gestion de la cadence ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Richard Schmidt (1975) a démontré que les gestes cycliques rapides conservent une invariance temporelle relative. Même lorsque la vitesse des échelons accélère de 150 à 750 px/s, la proportion temporelle entre chaque transition (1:1:1:1) reste stable, permettant d'accélérer la cadence sans déformer le mouvement."
      }
    },
    {
      "@type": "Question",
      "name": "En quoi cet exercice améliore-t-il la technique de counter-strafing dans CS2 et Valorant ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le counter-strafing parfait réclame une inversion d'appuis latéraux dans une fraction de seconde calibrée pour stopper l'inertie du personnage avant le tir. Ce drill renforce le tempo d'alternance gauche-droite au niveau cérébral, garantissant une stabilisation immédiate du réticule."
      }
    },
    {
      "@type": "Question",
      "name": "Comment progressent la vitesse de défilement et la dimension des échelons sur les 15 niveaux ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La difficulté progresse par tranches de 250 points. La vitesse de défilement vertical passe de 150 px/s au niveau 1 jusqu'à 750 px/s aux niveaux 12 à 15, tandis que la zone de contact des échelons se resserre de 18 pixels à seulement 10 pixels."
      }
    },
    {
      "@type": "Question",
      "name": "Manquer un échelon ou briser la série entraîne-t-il une pénalité de score ou de temps ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aucun point acquis n'est soustrait et le temps de 45 secondes ne subit aucune déduction. En revanche, rater un échelon ou inverser la séquence réinitialise instantanément le combo à 1.0x, encourageant une régularité rythmique stricte."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi convient-il d'intercepter les échelons légèrement sous leur centre géométrique ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L'échelle descendant de façon ininterrompue, viser le centre visible au moment de l'observation conduit à frapper dans le vide. Selon la loi d'interception de cibles mouvantes de Fitts (1954), il faut anticiper le déplacement en visant 2 à 3 pixels sous le centre pour assurer la collision exacte."
      }
    },
    {
      "@type": "Question",
      "name": "Quels réglages de sensibilité et de prise en main facilitent les oscillations rapides ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Une prise de type 'claw' ou 'fingertip' associée à une sensibilité moyenne (30 à 40 cm par tour complet) favorise les micro-balayages latéraux du poignet, permettant de soutenir la cadence sans raidir les muscles de l'avant-bras."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle méthode permet d'atteindre le seuil d'élite de 17 000 points (Apex Ladder Master) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Il est impératif d'exécuter les 4 échelons comme un seul bloc moteur sans temps mort réflexif, en conservant le multiplicateur de 3.0x tout au long des 45 secondes. Maintenir une précision sans faille au-delà de 600 px/s caractérise le niveau maître."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle stratégie visuelle adopter lors des vitesses extrêmes excédant 500 px/s ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ne cherchez pas à suivre chaque échelon des yeux. Maintenez le regard détendu sur l'axe vertical central de l'échelle et laissez la vision périphérique piloter le battement oscillatoire de la main comme un métronome bien réglé."
      }
    },
    {
      "@type": "Question",
      "name": "L'outil conserve-t-il mes données et statistiques de manière sécurisée et confidentielle ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. L'intégralité des calculs de fréquence et d'horodatage repose sur l'API locale performance.now(). Aucune donnée de partie n'est transmise à des serveurs distants ; vos records sont stockés exclusivement dans la mémoire locale de votre navigateur (LocalStorage)."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Protocole d'Exécution de l'Échelle d'Agilité et Séquençage Moteur",
  "description": "Guide en 4 étapes pour valider les échelons en cadence alternée et maîtriser le travail des appuis.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Positionnement Médian sur l'Axe de l'Échelle",
      "text": "Placez le curseur sur la ligne centrale située entre les deux montants verticaux de l'échelle descendante.",
      "url": "https://skilldrills.online/fr/drills/physical/fitness/agility-ladder#etape-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Premier Contact Balistique sur l'Échelon 1",
      "text": "Dès l'amorce de la descente, effectuez un déplacement vif vers le premier échelon actif sur le côté gauche.",
      "url": "https://skilldrills.online/fr/drills/physical/fitness/agility-ladder#etape-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Enchaînement Rythmé des 4 Échelons",
      "text": "Parcourez la série complète (1 Gauche → 2 Droite → 3 Gauche → 4 Droite) en un geste continu pour valider le tronçon.",
      "url": "https://skilldrills.online/fr/drills/physical/fitness/agility-ladder#etape-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Montée en Combo et Accélération jusqu'à 750 px/s",
      "text": "Préservez la cadence sans omission pour hisser le combo à 3.0x et dominer les vitesses extrêmes des derniers paliers.",
      "url": "https://skilldrills.online/fr/drills/physical/fitness/agility-ladder#etape-4"
    }
  ]
};

const ladderGuide = {
  heading: "Fondements Biomécaniques : Séquençage Moteur Sériel et Cadence Rythmique",
  subtitle: "Organisation sérielle de Lashley, invariance temporelle de Schmidt (GMP) et cinématique d'interception de Fitts",
  intro: [
    "L'exercice sur échelle d'agilité (Agility Ladder Drill) représente un standard incontournable de la préparation physique en football, athlétisme, boxe et basket-ball pour affiner la vivacité des appuis (footwork) et la réactivité neuromusculaire. Dans cette adaptation numérique, l'échelle au sol devient un défilement vertical continu qui sollicite la capacité du système nerveux à exécuter des séquences bilatérales rapides face à des cibles en mouvement.",
    "Le neurobiologiste Karl Lashley (1951), dans sa contribution majeure sur 'Le Problème de l'Ordre Sériel dans le Comportement', a mis en lumière que les enchaînements moteurs à grande vitesse ne peuvent reposer sur un guidage sensoriel étape par étape en raison des délais incompressibles de transmission synaptique (100 à 150ms). Le cerveau doit pré-programmer les 4 appuis de l'échelle sous forme d'un 'bloc moteur indivisible' (chunk), libérant l'alternance d'un seul jet harmonieux.",
    "Cette organisation est appuyée par la Théorie du Programme Moteur Généralisé (GMP) de Richard A. Schmidt (1975), qui formalise l'invariance temporelle relative : les proportions internes du rythme demeurent fixes quelle que soit l'accélération globale de la tâche. Tandis que la descente s'accélère de 150 px/s à 750 px/s et que les zones de frappe se réduisent à 10 pixels, l'exécutant applique les principes d'interception de Fitts (1954), compensant la chute par une visée légèrement abaissée sans altérer le tempo métronomique.",
    "Précision temporelle et matériel : Ce test s'exécute directement sur votre équipement via l'API performance.now() à une granularité inférieure à la milliseconde. La latence physique perçue est tributaire du taux de rafraîchissement de votre moniteur (60Hz = 16,6ms ; 144Hz = 6,9ms ; 240Hz = 4,1ms) et de la fréquence d'échantillonnage de la souris. Les écarts sous 5ms relèvent des marges physiques courantes."
  ],
  benchmarks: {
    title: "Grille d'Évaluation et Niveaux de Vivacité Motrice (5 Paliers)",
    headers: ["Palier / Rang", "Titre de Maîtrise", "Score Requis", "Niveau Culminant", "Vitesse de Défilement", "Profil Neuromusculaire de Cadence"],
    rows: [
      ["Tier 1: Maître d'Échelle Apex", "Apex Ladder Master", "17 000+ points", "Niveau 12 – 15", "600 – 750 px/s", "Chunking sériel parfait des 4 appuis (top 0,1 %) ; maintien impeccable d'une cadence métronomique à 750 px/s (Lashley 1951 ; Schmidt 1975)"],
      ["Tier 2: Sprinteur de Rythme Elite", "Elite Rhythm Sprinter", "13 000 – 16 999 pts", "Niveau 9 – 11", "480 – 599 px/s", "Excellente alternance bilatérale à haute fréquence ; interception prédictive régulière sur des échelons de 10-12px (Fitts 1954)"],
      ["Tier 3: Séquenceur d'Appuis Confirmé", "Proficient Step Sequencer", "9 500 – 12 999 pts", "Niveau 6 – 8", "350 – 479 px/s", "Niveau solide pour compétiteurs et athlètes ; bonne mobilité du poignet et stabilité du tempo périodique"],
      ["Tier 4: Apprenant de Cadence Moyenne", "Intermediate Cadence Learner", "6 000 – 9 499 pts", "Niveau 3 – 5", "230 – 349 px/s", "Moyenne fonctionnelle standard ; hésitations et ruptures de tempo dès que le défilement excède 350 px/s"],
      ["Tier 5: Grimpeur Débutant", "Novice Rung Climber", "< 6 000 points", "Niveau 1 – 2", "< 230 px/s", "Difficulté à intégrer la succession des 4 échelons ; tendance à réagir pas à pas avec désynchronisation"]
    ],
    note: "Paliers établis à partir de l'ordonnancement sériel moteur (Lashley 1951), de la théorie du GMP (Schmidt 1975) et des modèles d'interception de Fitts (1954)."
  },
  techniques: {
    title: "Protocoles Pratiques pour Développer le Rythme et la Vivacité sur l'Échelle",
    items: [
      {
        name: "Chunking Moteur en Bloc Unique de Lashley (4-Step Serial Chunking)",
        desc: "Ne considérez pas chaque échelon comme une étape isolée. Concevez la trajectoire 'Gauche-Droite-Gauche-Droite' comme un geste unique et fluide, amorcé dès le premier contact.",
        tips: "Supprimez la vérification visuelle entre chaque échelon et laissez la main osciller avec régularité comme un pendule."
      },
      {
        name: "Invariance Temporelle de Schmidt (GMP Metronomic Cadence)",
        desc: "Face à l'accélération progressive de l'échelle, conservez strictement la répartition 1:1:1:1 du temps. Modulez uniquement l'énergie musculaire de la main sans altérer la pulsation interne.",
        tips: "Adoptez un comptage mental à quatre temps ('un-deux-trois-quatre') pour cadencer vos impulsions."
      },
      {
        name: "Interception Prédictive avec Décalage vers le Bas (Moving Target Interception)",
        desc: "L'échelle descendant continuellement, visez 2 à 3 pixels sous le centre de l'échelon. Le mouvement de chute viendra amener la cible directement sous votre réticule.",
        tips: "Ne visez pas le sommet de l'échelon pour éviter qu'il ne glisse sous le pointeur avant l'impact."
      },
      {
        name: "Focalisation Oculaire Centrale en Ligne Médiane (Central Axis Gaze)",
        desc: "Au-delà de 500 px/s, suivre les échelons du regard désoriente le système visuel. Fixez calmement l'axe central de l'échelle et utilisez la vision périphérique pour piloter le poignet.",
        tips: "Fiez-vous à la perception périphérique des bordures pour rythmer les battements de la main."
      }
    ]
  },
  steps: [
    "Positionnez-vous confortablement et alignez le curseur au centre des deux montants verticaux.",
    "Dès le départ de la descente, effectuez le snap initial vers le premier échelon à gauche.",
    "Validez les échelons 2, 3 et 4 dans un enchaînement rythmé sans interruption.",
    "Conservez le multiplicateur de 3.0x de bout en bout pour atteindre le statut Apex sur 45 secondes."
  ]
};

export default function AgilityLadderPageFr() {
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
      <MotorSequencingClient
        copy={{
          title: "Exercices d'Échelle d'Agilité & Footwork",
          subtitle: "Séquençage Moteur Bilatéral & Cadence Rythmique • 15 Niveaux",
          hudLabels: {
            score: "Score",
            timeLeft: "Temps Restant",
            bestScore: "Meilleur Score",
            bestCombo: "Meilleur Combo"
          },
          rulesTitle: "Règles du Test d'Échelle d'Agilité et Barème",
          rules: [
            { title: "Validation Séquentielle des Échelons", text: "Touchez les échelons dans l'ordre strict de descente (1 Gauche → 2 Droite → 3 Gauche → 4 Droite) pour valider chaque volée." },
            { title: "Multiplicateur de Série", text: "Franchissez les échelles successives sans accroc pour porter le combo jusqu'à 3.0x." },
            { title: "Accélération Continue", text: "Tous les 250 points, la vitesse de descente s'accroît de 150 à 750 px/s et les hitboxes diminuent." },
            { title: "Rupture de Cadence", text: "Omettre un échelon ou inverser la séquence réinitialise le multiplicateur à 1.0x sans déduire de points." }
          ],
          aboutTitle: "À Propos de l'Échelle d'Agilité et du Séquençage Moteur",
          aboutHeading: "Coordination Bilatérale et Rythme Neuromusculaire du Footwork",
          aboutText: "Inspiré des exercices classiques d'échelle d'agilité du football et de la boxe, cet entraînement renforce la vitesse d'appuis et l'agencement sériel de Lashley (1951). L'alternance cadencée du curseur affine les réflexes indispensables au counter-strafing dans les jeux de tir et rehausse la précision motrice des compétiteurs et athlètes.",
          aboutCards: [
            {
              title: "Public Visé",
              desc: "Joueurs souhaitant perfectionner le tempo de counter-strafe et les arrêts nets de visée, athlètes travaillant la vivacité des appuis et passionnés de motricité fine."
            },
            {
              title: "Aptitudes Développées",
              desc: "Cadence rythmique bilatérale, programmation motrice en bloc de 4 pas, interception dynamique de cibles en défilement et régulation du freinage."
            },
            {
              title: "Vitesse Évolutive",
              desc: "Le défilement s'accélère de 150 à 750 px/s avec de légères variations latérales, exigeant une réactivité soutenue sous forte contrainte temporelle."
            }
          ]
        }}
      />
      <DrillGuide guide={ladderGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="physical"
          currentHref="/drills/physical/fitness/agility-ladder"
          locale="fr"
        />
      </div>
    </>
  );
}
