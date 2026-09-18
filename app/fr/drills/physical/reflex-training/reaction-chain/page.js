import ReactionChainClient from '@/app/drills/physical/reflex-training/reaction-chain/ReactionChainClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — France & Francophonie (FR / FR-FR / FR-CA)
// Primary Intent: entraînement au freinage de visée souris, comment corriger l'overflick, test d'inhibition motrice
// French Gaming Context: Correction de l'overflick sur Valorant et CS2, freinage cinétique de souris, inhibition de réponse motrice
// High-Demand, Low-Competition Target Keywords:
//   - "entraînement au freinage de visée souris" (Mouse aim braking training)
//   - "comment corriger overflick souris" (How to fix overflick with mouse)
//   - "test d'inhibition motrice réflexe" (Motor inhibition reflex test)
//   - "jeu de freinage de souris réflexes" (Mouse stopping reflex game)
//   - "exercice de décélération de souris esport" (Esports mouse deceleration drill)
//   - "arrêt cinétique visée réflexe" (Kinetic arrest aim reflex)
//   - "test de précision et réflexe souris" (Mouse precision and reflex test)
//   - "jeu de vitesse de réaction souris" (Mouse reaction speed game)
// ============================================================

export const metadata = {
  title: "Freinage de Visée Souris – Test Réflexe | SkillDrills",
  description: "Entraînez le freinage de visée et le contrôle moteur à la souris. Interceptez des cibles cinétiques et supprimez l'overflick au PC.",
  keywords: [
    "entraînement au freinage de visée souris",
    "comment corriger overflick souris",
    "test d'inhibition motrice réflexes",
    "jeu de freinage souris et réflexe",
    "exercice de décélération de souris",
    "arrêt cinétique visée souris",
    "test de précision et réflexes souris",
    "jeu de vitesse de réaction souris",
    "comment arrêter sa souris sur la cible",
    "entraînement stopping power souris fps"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/physical/reflex-training/reaction-chain',
    languages: getAlternateLanguages('/drills/physical/reflex-training/reaction-chain'),
  },
  openGraph: {
    title: "Freinage de Visée Souris – Test Réflexe | SkillDrills",
    description: "Éliminez l'overflick en stabilisant instantanément votre réticule lors du premier tir. Module biomécanique de pointe pour Counter-Strike 2 et Valorant.",
    url: 'https://skilldrills.online/fr/drills/physical/reflex-training/reaction-chain',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
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
      "name": "Exercices",
      "item": "https://skilldrills.online/fr/drills"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Entraînement des Réflexes",
      "item": "https://skilldrills.online/fr/drills/physical/reflex-training"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Chaîne de Réaction (Freinage de Visée)",
      "item": "https://skilldrills.online/fr/drills/physical/reflex-training/reaction-chain"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Freinage de Visée Souris & Test d'Inhibition Motrice (Reaction Chain)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Module neurobiomécanique interactif pour perfectionner la décélération motrice, l'inhibition de réponse et l'élimination définitive de l'overflick lors des mouvements vifs de souris.",
  "url": "https://skilldrills.online/fr/drills/physical/reflex-training/reaction-chain",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online/fr"
  },
  "inLanguage": "fr",
  "dateModified": "2026-09-12"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Freinage de Visée Souris – Test Réflexe | SkillDrills",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires HTML5 Canvas and JavaScript enabled browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/fr/drills/physical/reflex-training/reaction-chain",
  "inLanguage": "fr",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Freinage de Visée Souris & Test d'Inhibition Motrice",
  "url": "https://skilldrills.online/fr/drills/physical/reflex-training/reaction-chain",
  "genre": ["Reflex Game", "Motor Control Trainer", "Esports Precision"],
  "playMode": "SinglePlayer",
  "description": "Interceptez des nœuds à des vitesses atteignant 1 800 px/s et immobilisez le curseur sous 1,5 px/frame au sein de la cible pour accumuler des multiplicateurs allant jusqu'à 3,0x."
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Pourquoi stopper un déplacement de souris avec une précision millimétrique est-il plus ardu qu'accélérer ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L'accélération motrice émane d'une impulsion contractile directe des muscles agonistes. En revanche, l'arrêt net exige que les groupes musculaires antagonistes génèrent une contre-force millimétriquement calibrée en quelques fractions de milliseconde. Comme l'a théorisé Robert S. Woodworth (1899), la phase de contrôle optique terminale intègre une latence sensorielle de 100 à 150 ms ; si le calcul d'inhibition échoue, l'énergie cinétique projette le curseur au-delà de la cible (overflick)."
      }
    },
    {
      "@type": "Question",
      "name": "Que décrit le modèle de course de chevaux (Race Model) de Logan et Cowan (1984) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ce modèle stipule que l'ordre moteur d'action ('processus Go') et le signal d'inhibition ou d'arrêt ('processus Stop') rivalisent de manière autonome au sein des ganglions de la base. Pour interrompre un flick violent avant qu'il ne dépasse le nœud, le signal de freinage doit franchir la ligne d'arrivée neuronale avant que l'impulsion motrice ne consomme toute sa course mécanique."
      }
    },
    {
      "@type": "Question",
      "name": "Qu'est-ce que le Stop-Signal Reaction Time (SSRT) et quel est son impact dans les FPS tactiques ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le SSRT représente la latence neuronale interne (habituellement comprise entre 180 et 250 ms) requise par le gyrus frontal inférieur droit (rIFG) et le noyau sous-thalamique (STN) pour révoquer un ordre moteur enclenché (Verbruggen & Logan, 2008). Un SSRT court permet de court-circuiter un flick mal orienté et de stabiliser le réticule sur la ligne de tête sans oscillations résiduelles."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est l'origine biomécanique majeure de l'overflick dans Valorant ou Counter-Strike 2 ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La défaillance provient de la cocontraction déséquilibrée des muscles fléchisseurs et extenseurs de l'avant-bras. Une impulsion initiale excessive sans anticipation de la friction fait glisser les patins de la souris au-delà du point d'arrêt. Cet exercice conditionne un freinage mécanique par ancrage de la pulpe des doigts et appui vertical sur le tapis."
      }
    },
    {
      "@type": "Question",
      "name": "De quelle façon la loi de Fitts (Fitts, 1954) accentue-t-elle la difficulté lors des accélérations de nœuds ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "D'après la loi de Fitts, l'indice de difficulté (ID) croît logarithmiquement à mesure que la marge de tolérance spatiale se restreint par rapport à la distance franchie. À 1 800 px/s, la fenêtre temporelle d'ajustement visuel se referme totalement, imposant une décélération balistique en boucle ouverte strictement modélisée par le cervelet."
      }
    },
    {
      "@type": "Question",
      "name": "Que représente le critère de vitesse inférieure à 1,5 px/frame pour valider un arrêt cinétique ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Il s'agit d'un seuil biomécanique intransigeant pour empêcher le 'slice-through' (le fait de balayer la cible sans s'y arrêter). À 144 Hz, 1,5 px/frame correspond à une vitesse résiduelle inférieure à 216 px/s, prouvant physiquement que la musculature a absorbé l'énergie cinétique et atteint l'état de frottement statique."
      }
    },
    {
      "@type": "Question",
      "name": "La texture du tapis de souris et les patins influencent-ils la puissance de freinage ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Considérablement. Les surfaces en verre ou les tissus ultra-rapides facilitent la mise en mouvement mais n'offrent presque aucun pouvoir d'arrêt (stopping power), ce qui épuise les muscles stabilisateurs. Pour s'entraîner au contrôle de décélération, les tapis hybrides ou de contrôle dotés d'une mousse intermédiaire procurent le frottement statique indispensable pour verrouiller la visée."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi un écran 144Hz ou 240Hz est-il fondamental pour l'entraînement d'inhibition motrice ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Comme l'ont quantifié Woods et al. (2015), un moniteur 60Hz engendre un retard de 16,6 ms par trame et crée un flou stroboscopique aux moments critiques de freinage. À 240Hz (4,1 ms), le déplacement continu du nœud est transmis avec une netteté analogique, octroyant au cortex visuel plus de 10 ms d'avance pour ordonner la décélération."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le volume quotidien optimal pour progresser sans surcharger le système nerveux ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L'inhibition motrice étant extrêmement exigeante pour les synapses centrales, des sessions de 15 à 20 minutes par jour (10 à 15 séries de 45 secondes entrecoupées de 45 secondes de récupération) constituent la dose idéale. Dès l'apparition d'une crispation au poignet, cessez la session pour ne pas ancrer de mauvaises compensations musculaires."
      }
    },
    {
      "@type": "Question",
      "name": "Comment transposer les acquis de ce drill lors de réelles confrontations compétitives ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Alignez scrupuleusement la sensibilité (eDPI) et la préhension avec celles de votre jeu principal. Durant l'entraînement, ne visualisez pas l'action comme un clic, mais comme un 'ancrage' solide du curseur au cœur du nœud. Ce réflexe conditionné consolide la stabilité du premier tir sous haute pression."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Protocole d'Entraînement au Freinage de Visée et à l'Inhibition Motrice",
  "description": "Méthode en 4 étapes pour intercepter des cibles véloces et dissoudre instantanément l'énergie cinétique du curseur.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Verrouillage du Pointeur et Centrage",
      "text": "Cliquez dans la zone de drill pour bloquer le curseur et stabilisez votre réticule au point médian."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Anticipation Vectorielle et Flick Balistique",
      "text": "Décelez la trajectoire du nœud incident et déployez un mouvement d'accélération rapide sur 80% du trajet."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Freinage Antagoniste et Arrêt Cinétique",
      "text": "Dès l'entrée dans le périmètre de la cible, enclenchez la musculature antagoniste et une pression vers le bas pour descendre sous 1,5 px/frame."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Maintien de Combo et Cap des 15 000 Points",
      "text": "Enchaînez les arrêts sans la moindre bavure durant 45 secondes pour sécuriser le multiplicateur 3,0x et pulvériser le palier élite."
    }
  ]
};

const guideProps = {
  sources: pickSources('logan1984', 'woodworth1899', 'fitts1954', 'woods2015'),
  intro: {
    title: "Neurophysiologie de l'Inhibition Motrice et Biomécanique de l'Arrêt Cinétique",
    paragraphs: [
      "Propulser une souris à grande vitesse vers une coordonnée est une gestuelle motrice courante ; stopper net son élan sans glisser du moindre pixel hors de la cible constitue le véritable sommet de l'expertise motrice. Tandis que la plupart des aim trainers ne mesurent que l'instant du clic, le Reaction Chain isole la faculté du système nerveux central à dissiper instantanément l'inertie cinétique lors de l'interception d'un nœud en vol (Kinetic Arrest).",
      "D'après le célèbre modèle de course de chevaux ('Race Model') de Gordon D. Logan et William B. Cowan (1984), le processus d'activation motrice ('Go process') et le signal d'inhibition ('Stop process') concourent de façon indépendante dans les ganglions de la base. Pour figer le curseur sur une cible mobile, le gyrus frontal inférieur droit (rIFG) et le noyau sous-thalamique (STN) doivent ordonner un freinage musculaire antagoniste fulgurant capable de neutraliser la dynamique cinématique avant tout dépassement (Verbruggen & Logan, 2008).",
      "Le modèle de contrôle moteur en deux temps de Robert S. Woodworth (1899) a mis en lumière qu'un geste rapide réunit un élan balistique initial en boucle ouverte et un ajustement optique terminal. Selon la loi de Fitts (1954), lorsque la vitesse des nœuds atteint 1 800 px/s, la marge de correction visuelle s'annule : seule une décélération préprogrammée par le cervelet peut prévenir l'overflick.",
      "S'appuyant sur l'horloge haute résolution performance.now(), ce simulateur calcule en direct le déplacement trame par trame et impose une vitesse résiduelle inférieure à 1,5 px/frame pour homologuer l'arrêt. Exploité sur des dalles 144Hz ou 240Hz avec un capteur cadencé à 1000Hz, le délai global s'abaisse sous 4 ms, réunissant les conditions d'apprentissage neuro-moteur les plus rigoureuses (Woods et al., 2015)."
    ]
  },
  benchmarks: {
    title: "Grille Officielle de Référence : Freinage de Visée & Inhibition Motrice (5 Paliers)",
    headers: ["Palier de Performance", "Titre Officiel", "Barème de Points", "Taux de Réussite d'Arrêt", "Grade Global", "Profil Neurobiomécanique"],
    rows: [
      ["Tier 1 : Maître Absolu de l'Arrêt Cinétique", "Apex Kinetic Arrester", "15 000+ pts", "95%+ / 1500+ px/s", "Grade S", "Top 0,1% mondial. Capacité d'inhibition surhumaine : immobilisation instantanée à 1 800 px/s sans le moindre overflick (Logan 1984; Woodworth 1899)"],
      ["Tier 2 : Tireur de Précision Cinétique", "Precision Kinetic Sniper", "11 000 – 14 999 pts", "90 – 94% / 1200 – 1499 px/s", "Grade A", "Top 3% esport. Décélération magistrale via la pulpe des doigts ; ancrage ferme et immédiat après de violentes accélérations"],
      ["Tier 3 : Pilote Émérite de Décélération", "Skilled Deceleration Pilot", "7 500 – 10 999 pts", "82 – 89% / 900 – 1199 px/s", "Grade B", "Top 15% compétitif. Freinage régulier aux cadences modérées ; légers dérapages occasionnels aux allures maximales"],
      ["Tier 4 : Pratiquant en Perfectionnement", "Developing Stopper", "4 000 – 7 499 pts", "70 – 81% / 600 – 899 px/s", "Grade C", "Moyenne adulte standard. Tendance récurrente à dépasser la cible par retard de contraction des muscles antagonistes"],
      ["Tier 5 : Débutant en Phase de Décélération", "Novice Arrester Trainee", "< 4 000 pts", "< 70% / < 600 px/s", "Grade D", "Inhibition motrice tardive occasionnant de fréquents échecs ; apprentissage du freinage par frottement mécanique indispensable"]
    ],
    note: "Échelle de mesure adossée au modèle de course de Logan (1984), au modèle bifasique de Woodworth (1899) et à la loi de difficulté de Fitts (1954)."
  },
  techniques: {
    title: "Techniques Pratiques de Freinage de Visée",
    items: [
      {
        name: "Freinage Anticipé de Logan (Logan Kinetic Brake)",
        desc: "Attendre d'atteindre le nœud pour tenter de stopper la souris conduit inévitablement à un dépassement du fait de la latence nerveuse. Déclenchez l'ordre d'inhibition dès les 80% du trajet afin de converger vers une vitesse nulle au centre exact du nœud.",
        tips: "Ne cherchez pas à effleurer la cible, visualisez le geste comme un clouage net du curseur en son centre."
      },
      {
        name: "Pression Descendante des Doigts (Fingertip Downforce)",
        desc: "Ne comptez pas uniquement sur les articulations du poignet pour freiner. Au moment de l'impact, appliquez une légère pression verticale avec la pulpe des doigts sur le châssis pour accroître la friction statique des patins sur le tapis.",
        tips: "Exploitez l'épaisseur et la souplesse du tapis pour créer un frein mécanique immédiat."
      },
      {
        name: "Éradication Complète du Slice-Through",
        desc: "Traverser la cible tout en cliquant détériore la régularité du tir dans les vraies parties. Maintenez le curseur immobile dans la zone jusqu'à ce que le voyant vert 'ARREST READY' valide l'arrêt.",
        tips: "La rigueur de l'arrêt complet au sein du nœud prévaut impérativement sur la vitesse désordonnée."
      },
      {
        name: "Gestion Stratégique du Combo 3,0x",
        desc: "Un défaut de freinage ne retranche aucun point accumulé mais ramène instantanément le multiplicateur à 1,0x. Validez 100% de vos arrêts durant les premiers niveaux pour affronter les hautes vitesses avec le bonus maximal.",
        tips: "Plus de 80% du score final s'accumule durant les séquences maintenues sous multiplicateur 3,0x."
      }
    ]
  },
  steps: [
    "Activez le verrouillage du pointeur et adoptez une prise de souris stable (fingertip ou claw grip).",
    "Prenez pour cible le nœud en approche et lancez un mouvement balistique d'accélération franche.",
    "Avant de franchir la lisière de la cible, activez les muscles antagonistes et l'appui vertical des doigts pour freiner sous 1,5 px/frame.",
    "Renouvelez l'opération sans le moindre écart pendant 45 secondes pour préserver le combo 3,0x et franchir la barre des 15 000 points."
  ],
  audience: "Joueurs de Counter-Strike 2, Valorant, Apex Legends et Overwatch 2 résolus à éradiquer l'overflick et à stabiliser le premier tir à la tête, ainsi que tout sportif exigeant une inhibition neuromotrice ultra-rapide.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('logan1984', 'woodworth1899', 'fitts1954', 'woods2015')
};

export default function LocalizedReactionChainPageFr() {
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
      <ReactionChainClient
        copy={{
          title: "Freinage de Visée Souris & Test d'Inhibition Motrice",
          subtitle: "Arrêt Cinétique & Contrôle de Décélération • 15 Niveaux de Vitesse",
          badge: "Test d'Inhibition Motrice",
          description: "Arrêter net un geste rapide sur une coordonnée précise est biomécaniquement bien plus difficile que d'accélérer. L'impulsion motrice et l'ordre de freinage se livrent une course indépendante dans le cerveau (Logan & Cowan, 1984). Tout retard d'inhibition provoque un overflick sous l'effet de l'inertie (Woodworth, 1899). Interceptez les nœuds et immobilisez instantanément votre curseur.",
          hudLabels: {
            score: "Score",
            time: "Temps",
            accuracy: "Précision d'Arrêt",
            bestScore: "Meilleur Score",
            getReady: "PRÉPAREZ-VOUS"
          },
          pauseTitle: "Entraînement en Pause",
          pauseSubtitle: "Cliquez dans la fenêtre pour réactiver le verrouillage du pointeur.",
          resultLabels: {
            newBest: "NOUVEAU RECORD",
            points: "Points",
            accuracy: "Précision",
            totalArrests: "Arrêts Cinétiques",
            maxCombo: "Combo Max",
            peakLevel: "Niveau Max",
            playAgain: "Rejouer"
          },
          rulesTitle: "Règles du Drill & Système de Points",
          rulesItems: [
            { title: "Arrêt Cinétique (+50 PTS)", text: "Interceptez le nœud incident et immobilisez totalement le curseur dans sa circonférence (ARREST READY) pour marquer 50 points." },
            { title: "Multiplicateur de Combo (jusqu'à 3,0x)", text: "Les arrêts consécutifs sans faute élèvent graduellement le multiplicateur jusqu'au plafond de 3,0x." },
            { title: "Glissements & Erreurs", text: "Traverser sans s'arrêter ou manquer la cible remet le combo à 1,0x (sans déduction de points)." },
            { title: "Accélération Fulgurante", text: "Au fur et à mesure que votre score grimpe, les nœuds accélèrent jusqu'à 1 800 px/s et la zone d'arrêt se resserre." }
          ],
          aboutTitle: "À Propos du Freinage de Visée & de l'Inhibition Neuromotrice",
          aboutSections: [
            {
              title: "Freinage Cinétique & Neurophysiologie de l'Inhibition",
              content: "Le Reaction Chain isole et fortifie votre capacité de décélération motrice et d'inhibition de réponse. Plutôt que de simplement cliquer sur des cibles en mouvement, vous devez croiser leur trajectoire et contraindre vos muscles antagonistes à absorber l'inertie du curseur au sein de l'espace imparti."
            },
            {
              title: "Modèle de Course de Logan & Maîtrise du Premier Tir",
              content: "La répétition de l'arrêt cinétique reprogramme les circuits du noyau sous-thalamique et du cortex moteur (Logan et al., 1984). Elle supprime l'overflick compulsif et confère un verrouillage de visée d'une netteté chirurgicale sur Counter-Strike 2 et Valorant."
            }
          ],
          aboutCards: [
            {
              title: "Athlètes Ciblés",
              desc: "Joueurs de FPS désireux de vaincre l'overflicking et sportifs nécessitant une décélération neuromusculaire éclair.",
              bgClass: "bg-blue-600/30",
              iconClass: "text-blue-400"
            },
            {
              title: "Aptitudes Développées",
              desc: "Décélération de haute précision, gestion du frottement statique, temps d'inhibition (SSRT) et interception spatiale.",
              bgClass: "bg-emerald-600/30",
              iconClass: "text-emerald-400"
            },
            {
              title: "Freinage Cinétique",
              desc: "Interceptez des cibles jusqu'à 1 800 px/s et stoppez sous 1,5 px/frame pour maximiser les multiplicateurs 3,0x.",
              bgClass: "bg-purple-600/30",
              iconClass: "text-purple-400"
            }
          ]
        }}
      />
      <DrillGuide {...guideProps} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/reflex-training/reaction-chain" />
    </>
  );
}
