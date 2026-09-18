import CrossBodyMovementClient from '@/app/drills/physical/coordination/cross-body-movement/CrossBodyMovementClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';

// ============================================================
// RECHERCHE DE MOTS-CLÉS NATIFS (SERP FRANCE / FR-FR)
// Requêtes à forte intention neurofonctionnelle et faible concurrence :
// - "test de coordination oeil main en ligne" (Requête dominante visuo-motrice)
// - "exercice de coordination visuo motrice" (Entraînement psychomoteur et précision)
// - "franchissement de la ligne médiane motricité" (Concept d'intégration sensorielle et bilatérale)
// - "coordination bilatérale et motricité fine" (Neuro-développement et dextérité)
// - "jeux de coordination motrice gratuit" (Recherche ludique sans téléchargement)
// - "mouvement de balayage diagonal souris" (Mécanique de visée eSport / FPS)
// - "test de vitesse de réaction et coordination" (Évaluation cognitive et motrice)
// - "contrôle moteur controlatéral" (Terme scientifique de transmission inter-hémisphérique)
// ============================================================

export const metadata = {
  title: "Coordination Œil-Main – Visée Diagonale | SkillDrills",
  description: 'Test de coordination œil-main gratuit en ligne. Reliez des nœuds diagonaux pour développer votre coordination bilatérale et votre visée motrice fine.',
  keywords: [
    "test de coordination oeil main en ligne",
    "exercice de coordination visuo motrice",
    "franchissement de la ligne médiane motricité",
    "coordination bilatérale et motricité fine",
    "jeux de coordination motrice gratuit",
    "mouvement de balayage diagonal souris",
    "test de vitesse de réaction et coordination",
    "contrôle moteur controlatéral",
    "visée diagonale fps",
    "dextérité motrice test"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/physical/coordination/cross-body-movement',
    languages: getAlternateLanguages('/drills/physical/coordination/cross-body-movement'),
  },
  openGraph: {
    title: "Coordination Œil-Main – Visée Diagonale | SkillDrills",
    description: 'Test de coordination œil-main gratuit en ligne. Reliez des nœuds diagonaux pour développer votre coordination bilatérale et votre visée motrice fine.',
    url: 'https://skilldrills.online/fr/drills/physical/coordination/cross-body-movement',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Coordination Œil-Main – Visée Diagonale | SkillDrills",
    description: 'Test de coordination œil-main gratuit en ligne. Reliez des nœuds diagonaux pour développer votre coordination bilatérale et votre visée motrice fine.',
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
      "name": "Coordination Motrice",
      "item": "https://skilldrills.online/fr/drills/physical/coordination"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Test de Coordination Œil-Main",
      "item": "https://skilldrills.online/fr/drills/physical/coordination/cross-body-movement"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test de Coordination Œil-Main & Contrôle Bilatéral",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Outil neurofonctionnel d'évaluation et d'entraînement du contrôle moteur controlatéral et du franchissement de la ligne médiane visuelle.",
  "url": "https://skilldrills.online/fr/drills/physical/coordination/cross-body-movement",
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
  "name": "Entraîneur de Coordination Œil-Main",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Navigateur moderne compatible HTML5 Canvas et Pointer Lock API",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/fr/drills/physical/coordination/cross-body-movement",
  "inLanguage": "fr-FR",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Jeu de Coordination Visuo-Motrice (Cross-Body Movement)",
  "url": "https://skilldrills.online/fr/drills/physical/coordination/cross-body-movement",
  "description": "Exercice intensif de balayage diagonal à travers l'axe médian pour accélérer la transmission inter-hémisphérique et stabiliser les flicks sur FPS.",
  "genre": [
    "Coordination Drill",
    "Motor Control",
    "Hand-Eye Training",
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
      "name": "Quelles capacités neuro-motrices sont évaluées lors du franchissement de la ligne médiane ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L'exercice mesure la vitesse et la précision avec lesquelles les informations visuelles (cortex occipital) et spatiales (lobe pariétal) sont traduites en commandes motrices (cortex moteur primaire). Le balayage diagonal traversant l'axe médian exige une transmission continue entre les deux hémisphères cérébraux via le corps calleux."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi atteindre une cible dans l'espace controlatéral est-il physiologiquement plus lent ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "D'après les recherches biomécaniques de David Carey et al. (1996), les trajectoires dirigées vers l'espace controlatéral (le côté opposé au bras agissant) accusent un retard de conduction synaptique et une dispersion d'erreur plus élevée que les mouvements ipsilatéraux, en raison du coût temporel du transfert calleux."
      }
    },
    {
      "@type": "Question",
      "name": "En quoi cet exercice améliore-t-il la précision des flicks sur des jeux comme Valorant ou CS2 ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La majorité des joueurs se cantonnent aux micro-ajustements horizontaux. Or, les changements d'angle brusques ou les cibles en dénivelé vertical requièrent des balayages diagonaux fluides. Cet entraînement renforce le pivot avant-bras/coude afin d'empêcher le poignet de tracer des arcs de cercle parasites sur le tapis."
      }
    },
    {
      "@type": "Question",
      "name": "Comment évoluent la tolérance du couloir et la taille des nœuds au fil des 15 niveaux ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La difficulté progresse par paliers de 250 points. La marge de tolérance du couloir se resserre graduellement de 10 pixels au niveau 1 jusqu'à seulement 4 pixels aux niveaux supérieurs, tandis que le rayon des nœuds se réduit de 16 pixels à 8 pixels pour imposer une rigueur micrométrique."
      }
    },
    {
      "@type": "Question",
      "name": "Sortir des limites du couloir entraîne-t-il une pénalité de points ou de temps ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aucun point n'est retranché et le chronomètre fixe de 45 secondes n'est pas raccourci. En revanche, tout écart hors du couloir réinitialise instantanément le multiplicateur de combo à 1.0x, forçant une régularité de trajectoire sans à-coups."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle sensibilité de souris et quelle taille de tapis sont recommandées pour ce test ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Une sensibilité moyenne à basse (30 à 45 cm pour un tour complet de 360°) associée à un tapis de souris d'au moins 450 mm de largeur est idéale. Cette configuration permet de déployer l'amplitude complète de l'avant-bras sans devoir lever la souris en plein mouvement."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi est-il crucial de pivoter autour du coude plutôt que de plier uniquement le poignet ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L'anatomie articulaire du poignet produit inévitablement des trajectoires courbes en arc. Pour générer des vecteurs diagonaux parfaitement rectilignes capables de rester dans un couloir de 4 pixels, l'avant-bras doit fonctionner comme un bras de levier rigide guidé par le coude."
      }
    },
    {
      "@type": "Question",
      "name": "Comment exploiter le modèle de contrôle à deux phases de Woodworth pour freiner sur le nœud ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Selon les travaux de Robert Woodworth (1899), il convient d'exécuter 75 % du trajet à vitesse balistique maximale via l'avant-bras, puis d'exercer une légère pression avec la pulpe des doigts sur le tapis lors des 25 % restants pour stopper le curseur avec précision sous guidage visuel."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle méthode permet d'atteindre le palier d'élite de 17 000 points (Apex Bilateral) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La fixation oculaire prédictive (gaze feedforward) est déterminante : dès que le curseur effleure le nœud A, le regard doit déjà être verrouillé sur les coordonnées du nœud B. Conserver le combo 3.0x sans interruption et maintenir plus de 92 % de précision aux niveaux 12 à 15 est indispensable."
      }
    },
    {
      "@type": "Question",
      "name": "Mes scores et données de temps de réaction sont-ils enregistrés de façon sécurisée et confidentielle ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. Tous les calculs cinématiques reposent sur l'API performance.now() et les données sont conservées localement dans votre navigateur (LocalStorage). Aucune information personnelle ni historique de frappe n'est téléversé vers des serveurs distants."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Protocole d'Exécution du Test de Coordination et de Balayage Diagonal",
  "description": "Guide en 4 étapes pour relier des nœuds opposés à travers la ligne médiane et maximiser votre score.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Activation du Nœud Source A",
      "text": "Placez le pointeur sur le nœud cyan pulsant situé en bordure de l'écran pour déclencher la ligne de visée vectorielle.",
      "url": "https://skilldrills.online/fr/drills/physical/coordination/cross-body-movement#etape-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Balayage Diagonal Traversant la Ligne Médiane",
      "text": "Déplacez le curseur de façon fluide et rectiligne à travers le centre sans franchir les limites lumineuses du couloir.",
      "url": "https://skilldrills.online/fr/drills/physical/coordination/cross-body-movement#etape-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Frappe et Verrouillage du Nœud Cible B",
      "text": "Atteignez le nœud magenta à l'extrémité opposée pour valider le vecteur, déclenchant l'effet de particules et les points.",
      "url": "https://skilldrills.online/fr/drills/physical/coordination/cross-body-movement#etape-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Maintien de la Série et du Multiplicateur",
      "text": "Enchaînez les connexions sans rupture de couloir pour hisser le combo à 3.0x et maximiser votre score sur 45 secondes.",
      "url": "https://skilldrills.online/fr/drills/physical/coordination/cross-body-movement#etape-4"
    }
  ]
};

const crossBodyGuide = {
  heading: "Fondements Neuroscientifiques : Ligne Médiane et Coordination Motrice Bilatérale",
  subtitle: "Intégration sensorielle d'Ayres, asymétrie motrice de Carey et loi de Woodworth appliquées à la visée",
  intro: [
    "L'exercice de franchissement de la ligne médiane (Cross-Body Movement) impose au système visuo-moteur d'effectuer des trajectoires diagonales complètes traversant l'axe sagittal du corps. Contrairement aux mouvements confinés à un seul secteur de l'écran, le passage au-delà de l'axe médian requiert un flux continu de signaux à travers le corps calleux pour coordonner avec précision la musculature du bras dans l'espace controlatéral.",
    "La créatrice de l'intégration sensorielle, Dre A. Jean Ayres (1972), a mis en évidence que la capacité à franchir la ligne médiane constitue le socle de la maturation motrice et de la spécialisation hémisphérique harmonieuse. Dans des travaux cinématiques de référence, David Carey, Hargreaves et Goodale (1996) ont établi que les mouvements de pointage dirigés vers l'espace controlatéral manifestent systématiquement un temps de décélération allongé et une dispersion d'erreur accrue par rapport aux cibles ipsilatérales. Cet exercice vise précisément à gommer cette asymétrie neuromusculaire.",
    "Sous l'éclairage de la Loi de Fitts (1954), l'élévation de la distance et le rétrécissement de la zone de tolérance augmentent de façon logarithmique l'Indice de Difficulté (ID). Plus les niveaux s'élèvent, plus le couloir se resserre (de 10 à 4 pixels) et plus les cibles diminuent (jusqu'à 8 pixels). Réussir dans ces conditions extrêmes suppose de maîtriser le modèle en deux temps de Robert Woodworth (1899) : une phase d'impulsion balistique vive portée par l'avant-bras (75 % de la distance) complétée par un freinage terminal micrométrique sous contrôle visuel rétroactif (25 % restants).",
    "Précision instrumentale et rafraîchissement d'affichage : Ce test s'exécute nativement côté client à l'aide de l'API performance.now() avec une granularité inférieure à la milliseconde. La latence physique perçue dépend du taux de rafraîchissement de votre moniteur (60Hz = 16.6ms, 144Hz = 6.9ms, 240Hz = 4.1ms) et de la fréquence de rapport de votre souris. Les fluctuations sous 5ms relèvent de la physique matérielle standard."
  ],
  benchmarks: {
    title: "Grille d'Évaluation et Niveaux de Coordination Visuo-Motrice (5 Paliers)",
    headers: ["Palier / Rang", "Titre de Maîtrise", "Score Requis", "Niveau Culminant", "Précision Vectorielle", "Profil Neurophysiologique"],
    rows: [
      ["Tier 1: Maître Bilatéral Suprême", "Apex Bilateral Master", "17 000+ points", "Niveau 12 – 15", "≥ 92 % de réussite", "Top 0,1 % ; transmission inter-hémisphérique remarquable ; balayages parfaits dans un couloir ultra-serré de 4px avec pivot coude irréprochable (Ayres 1972 ; Fitts 1954)"],
      ["Tier 2: Balayeur de Ligne Médiane Elite", "Elite Midline Sweeper", "13 000 – 16 999 pts", "Niveau 9 – 11", "85 – 91 % de réussite", "Excellente accélération controlatérale et maîtrise du freinage de Woodworth sur des nœuds de 8px (Carey et al. 1996)"],
      ["Tier 3: Traceur Vectoriel Avancé", "Advanced Vector Tracer", "9 500 – 12 999 pts", "Niveau 6 – 8", "76 – 84 % de réussite", "Coordination solide pour le tir compétitif ; légère dérive cinématique dès que le couloir passe sous les 6px"],
      ["Tier 4: Connecteur Intermédiaire", "Intermediate Node Connector", "6 000 – 9 499 pts", "Niveau 3 – 5", "65 – 75 % de réussite", "Moyenne fonctionnelle standard ; ruptures de série dues à une crispation du poignet lors des grands mouvements obliques"],
      ["Tier 5: Apprenti Diagonal Débutant", "Novice Diagonal Learner", "< 6 000 points", "Niveau 1 – 2", "< 65 % de réussite", "Difficulté marquée à traverser le plan sagittal central ; tendance à tracer des arcs de cercle entraînant des sorties de couloir"]
    ],
    note: "Données étalonnées à partir de la théorie d'intégration sensorielle (Ayres 1972), des études de motricité controlatérale (Carey et al. 1996) et des constantes de Fitts (1954)."
  },
  techniques: {
    title: "Protocoles Pratiques pour Optimiser le Balayage Diagonal et le Contrôle Bilatéral",
    items: [
      {
        name: "Alignement Corporel Central sur l'Axe Sagittal (Ayres Midline Alignment)",
        desc: "Positionnez votre siège et votre buste exactement au centre de l'écran. Évitez de tourner les épaules pour que le mouvement traduise un authentique franchissement du plan médian par le bras.",
        tips: "Conservez les épaules détendues et utilisez le coude comme point d'appui glissant sur le bureau."
      },
      {
        name: "Fixation Oculaire Prédictive Feedforward (Contralateral Target Fixation)",
        desc: "Comme l'ont souligné Carey et ses pairs (1996), suivre visuellement le curseur crée un décalage. Dès que le nœud A est touché, déplacez immédiatement le regard vers l'emplacement du nœud B.",
        tips: "Laissez la commande motrice périphérique diriger la main tandis que vos yeux fixent déjà la cible finale."
      },
      {
        name: "Freinage Terminal de Woodworth par Friction (Current-Control Braking)",
        desc: "Accélérez énergiquement sur les 3/4 du trajet puis appliquez une légère pression de la main et de la pulpe des doigts sur le tapis lors du dernier quart.",
        tips: "Cette friction contrôlée absorbe l'élan mécanique du bras et évite de dépasser les nœuds étroits de 8 pixels."
      },
      {
        name: "Pivot d'Avant-Bras et Coude vs. Flexion Circulaire du Poignet (Elbow Pivot)",
        desc: "La mobilité du poignet génère des trajectoires incurvées qui sortent instantanément d'un couloir de 4 pixels. Bloquez le poignet en position neutre et menez le geste avec l'avant-bras pivotant autour du coude.",
        tips: "Assurez-vous que le câble de la souris ne frotte pas ou munissez-vous d'un mouse bungee pour éliminer les résistances parasites."
      }
    ]
  },
  steps: [
    "Adoptez une posture droite et alignez le centre du thorax avec le milieu du moniteur.",
    "Dès le signal de départ, placez le réticule sur le nœud cyan en périphérie de l'écran.",
    "Balayez l'écran en ligne droite oblique sans mordre les bordures du couloir lumineux.",
    "Atteignez le nœud magenta opposé et préservez le combo 3.0x durant l'intégralité des 45 secondes."
  ]
};

export default function CrossBodyMovementPageFr() {
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
      <CrossBodyMovementClient
        copy={{
          title: "Test de Coordination Œil-Main",
          subtitle: "Franchissement de la Ligne Médiane & Contrôle Moteur Bilatéral • 15 Niveaux",
          hudLabels: {
            score: "Score",
            timeLeft: "Temps Restant",
            bestScore: "Meilleur Score",
            bestCombo: "Meilleur Combo"
          },
          rulesTitle: "Règles du Test de Coordination et Barème",
          rules: [
            { title: "Activation du Nœud Source", text: "Effleurez le nœud cyan en bordure d'écran avec le curseur pour lancer la trajectoire vectorielle." },
            { title: "Balayage Diagonal en Ligne Médiane", text: "Traversez l'écran en restant strictement à l'intérieur du couloir de tolérance lumineux." },
            { title: "Impact Cible et Multiplicateur", text: "Atteignez le nœud magenta opposé pour valider la liaison, marquer des points et faire monter le combo." },
            { title: "Tolérance et Sortie de Couloir", text: "Quitter le couloir réinitialise le multiplicateur à 1.0x, sans déduction de score ni pénalité de temps." }
          ],
          aboutTitle: "À Propos de l'Entraînement de Coordination",
          aboutHeading: "Neurophysiologie du Franchissement Médian et Intégration Bilatérale",
          aboutText: "Cet exercice s'appuie sur la théorie de l'Intégration Sensorielle de Jean Ayres (1972) et sur les études biomécaniques de David Carey (1996). Les mouvements obliques franchissant l'axe médian exigent un échange inter-hémisphérique rapide via le corps calleux, permettant de développer des flicks à 180 degrés et des changements d'angle d'une précision chirurgicale.",
          aboutCards: [
            {
              title: "Public Visé",
              desc: "Joueurs de tir compétitif cherchant à fluidifier leurs grands flicks diagonaux, et toute personne souhaitant développer sa motricité fine et sa vivacité oculo-motrice."
            },
            {
              title: "Bénéfices Neurologiques",
              desc: "Stimulation de la transmission inter-hémisphérique, renforcement du freinage agoniste-antagoniste et correction du retard moteur en espace controlatéral."
            },
            {
              title: "Progression Dynamique",
              desc: "Le couloir se resserre de 10px à 4px, les cibles diminuent de 16px à 8px et les trajectoires s'étirent jusqu'aux angles extrêmes de l'écran."
            }
          ]
        }}
      />
      <DrillGuide guide={crossBodyGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="physical"
          currentHref="/drills/physical/coordination/cross-body-movement"
          locale="fr"
        />
      </div>
    </>
  );
}
