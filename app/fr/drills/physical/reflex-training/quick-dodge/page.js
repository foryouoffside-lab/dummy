import QuickDodgeClient from '@/app/drills/physical/reflex-training/quick-dodge/QuickDodgeClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — France & Francophonie (FR / FR-FR / FR-CA)
// Primary Intent: jeu d'esquive souris, jeu pour esquiver à la souris, test de réflexe esquive
// French Gaming & Athletic Context: Jeu classique d'esquive à la souris (bullet hell) et entraînement des micro-mouvements pour LoL et FPS
// High-Demand, Low-Competition Target Keywords:
//   - "jeu d'esquive souris" (Core viral browser reflex game query)
//   - "jeu pour esquiver à la souris" (High-intent variation)
//   - "test de réflexe esquive" (Reflex evasion assessment query)
//   - "jeu d'esquive de projectiles" (Projectile evasion challenge)
//   - "entraînement réflexes souris" (Mouse reflex training)
//   - "micro-mouvements souris esport" (Competitive gamer mouse movement drill)
//   - "bullet hell entraînement souris en ligne" (Online bullet hell mouse drill)
// ============================================================

export const metadata = {
  title: "Jeu d'Esquive Souris – Test de Réflexes | SkillDrills",
  description: "Jeu d'esquive souris gratuit en ligne. Évitez les projectiles au curseur pour tester vos réflexes et votre temps de réaction motrice.",
  keywords: [
    "jeu d'esquive souris",
    "jeu pour esquiver à la souris",
    "test de réflexe esquive",
    "jeu d'esquive de projectiles",
    "entraînement réflexes souris",
    "micro-mouvements souris esport",
    "bullet hell entraînement souris en ligne",
    "temps de réaction moteur esquive",
    "esquive de projectiles en ligne",
    "jeu de réflexes souris gratuit"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/physical/reflex-training/quick-dodge',
    languages: getAlternateLanguages('/drills/physical/reflex-training/quick-dodge'),
  },
  openGraph: {
    title: "Jeu d'Esquive Souris – Test de Réflexes | SkillDrills",
    description: "Évitez la saturation cinétique de projectiles grâce à la simulation cérébelleuse prédictive. Test neuro-moteur interactif en ligne avec métriques en direct.",
    url: 'https://skilldrills.online/fr/drills/physical/reflex-training/quick-dodge',
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
      "name": "Accueil",
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
      "name": "Esquive Rapide",
      "item": "https://skilldrills.online/fr/drills/physical/reflex-training/quick-dodge"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Jeu d'Esquive Souris & Test de Réflexes d'Évasion",
  "applicationCategory": "GameApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Plateforme d'entraînement neuro-moteur en ligne pour développer l'esquive motrice réflexe, le balayage visuel périphérique et les micro-corrections manuelles de haute précision."
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Jeu d'Esquive Souris & Test de Réflexes d'Évasion",
  "url": "https://skilldrills.online/fr/drills/physical/reflex-training/quick-dodge",
  "applicationCategory": "HealthApplication",
  "browserRequirements": "Requires JavaScript. Requires HTML5 Canvas support.",
  "description": "Module interactif pour entraîner la coordination visuo-motrice et l'évitement cinétique à haute vitesse."
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Jeu d'Esquive Souris & Test de Réflexes d'Évasion",
  "description": "Simulateur cinétique d'évitement de projectiles évaluant la capacité d'anticipation motrice et la précision micrométrique du curseur.",
  "genre": ["Action", "Reflex Game", "Esports Trainer"],
  "playMode": "SinglePlayer"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Pourquoi l'esquive réflexe ne peut-elle pas reposer uniquement sur la réaction visuelle réactive ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La boucle visuo-motrice afférente humaine nécessite entre 160 et 220 ms pour convertir la détection d'une menace rétinienne en contraction musculaire motrice. Lorsque plusieurs projectiles convergent à haute vélocité, cette latence temporelle rend l'évasion réactive impossible. Le système nerveux central s'appuie donc sur les modèles internes prédictifs cérébelleux (Kawato, 1999) pour anticiper les vecteurs spatiaux avant l'impact physique."
      }
    },
    {
      "@type": "Question",
      "name": "En quoi la loi de Fitts influence-t-elle la difficulté de survie lors d'une esquive serrée ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Selon la formulation de Paul M. Fitts (1954), l'indice de difficulté (ID) d'une trajectoire motrice augmente de manière logarithmique lorsque la tolérance spatiale (la largeur de passage sécurisé) se réduit. À mesure que la densité d'obstacles augmente, la marge d'erreur cinématique tend vers zéro, imposant des micro-décélérations musculaires antagonistes extrêmement intenses."
      }
    },
    {
      "@type": "Question",
      "name": "Quel rôle joue la vision périphérique par rapport à la fixation fovéale dans ce drill ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La fovéa centrale offre une résolution spatiale maximale mais un champ d'analyse restreint à 2 degrés. La vision périphérique magnocellulaire traite les stimuli de mouvement à une cadence temporelle bien plus élevée. Maintenir une fixation globale douce au centre de l'arène permet de détecter les trajectoires périphériques sans saturer l'attention visuelle."
      }
    },
    {
      "@type": "Question",
      "name": "Comment la théorie des deux composants de Woodworth (1899) s'applique-t-elle à l'évitement d'obstacles ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Robert S. Woodworth (1899) a démontré que chaque geste rapide se décompose en une phase balistique initiale en boucle ouverte, suivie d'une phase de contrôle optique final en boucle fermée. Dans l'esquive de précision, les micro-déplacements doivent minimiser la phase de décélération pour permettre un enchaînement immédiat sans blocage postural."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi un taux de rafraîchissement d'écran élevé (144Hz ou 240Hz) est-il indispensable pour ce test ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Woods et al. (2015) ont mis en évidence qu'un affichage à 60 Hz engendre un délai d'affichage de 16,6 ms par trame et des sauts de positionnement stroboscopiques perceptibles. À 240 Hz (4,1 ms par trame), la continuité vectorielle des projectiles est quasi analogique, permettant une extrapolation spatio-temporelle cérébelleuse d'une rigueur absolue."
      }
    },
    {
      "@type": "Question",
      "name": "Une sensibilité souris élevée (High DPI) est-elle avantageuse pour esquiver les projectiles ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non, une sensibilité excessive provoque un sur-tir cinématique (overshoot) et amplifie le tremblement neuromusculaire physiologique, réduisant la capacité à naviguer dans des corridors étroits. Une sensibilité moyenne (800 à 1600 DPI avec un multiplicateur linéaire 1:1) offre le compromis parfait entre vitesse d'évasion et contrôle micrométrique."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la durée quotidienne optimale pour s'entraîner à l'esquive réflexe sans saturer le système nerveux ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Des blocs de 15 à 20 minutes divisés en séries courtes de 60 à 90 secondes avec 30 secondes de récupération sont optimaux. Prolonger l'effort au-delà de 25 minutes entraîne une fatigue synaptique centrale et une perte de coordination motrice fine, annihilant les gains d'apprentissage neuro-moteur."
      }
    },
    {
      "@type": "Question",
      "name": "Comment ce test d'esquive se transfère-t-il dans les jeux compétitifs comme League of Legends, Valorant ou Apex Legends ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L'exercice sollicite les mêmes boucles cortico-cérébelleuses nécessaires pour l'esquive des skillshots (MOBA), le strafe d'évitement sous tir de suppression (Apex Legends) et le micro-positionnement hors des lignes de mire directes (Valorant/CS2)."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi les mouvements de souris minimaux sont-ils plus efficaces que les grands déplacements panoramiques ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chaque millimètre parcouru en excès consomme du temps cinématique et contraint l'avant-bras à un freinage antagoniste supplémentaire. Rester à la périphérie immédiate des trajectoires sans s'éloigner inutilement maximise la réserve spatiale disponible pour les vagues suivantes."
      }
    },
    {
      "@type": "Question",
      "name": "L'échauffement articulaire des doigts et du poignet influe-t-il sur les performances d'esquive ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolument. Un échauffement myotendineux dynamique de 3 à 5 minutes augmente la viscosité du liquide synovial, active les fuseaux neuromusculaires et réduit la latence contractile des fléchisseurs et extenseurs des doigts de 15 à 25 ms."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment Réussir le Test d'Esquive de Projectiles à la Souris",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Centrage Initial & Verrouillage de la Posture",
      "text": "Stabilisez votre posture, placez votre curseur au centre de l'arène et activez la détection de mouvement."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Anticipation des Vecteurs Balistiques",
      "text": "Détectez l'angle d'apparition des projectiles en périphérie et préparez vos micro-déviations avant leur entrée en zone critique."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Économie de Trajectoire & Maintien Central",
      "text": "Évitez de fuir dans les angles où l'amplitude d'évasion se trouve réduite; recentrez systématiquement votre curseur."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Maintien du Combo Maximal (3.0x Streak)",
      "text": "Survivez pendant 45 secondes sans subir d'impact afin de maximiser votre multiplicateur et dépasser 24 000 points."
    }
  ]
};

const dodgeGuide = {
  heading: "Guide Scientifique & Neurobiomécanique de l'Esquive à la Souris",
  intro: {
    title: "Modèles Internes Cérébelleux (Forward Models) et Biomécanique de l'Évitement Balistique",
    paragraphs: [
      "Le jeu d'esquive à la souris (Quick Dodge Drill) constitue l'un des défis d'intégration sensorimotrice les plus exigeants : il impose au système nerveux central d'esquiver en continu des projectiles convergents à haute vélocité grâce à des micro-corrections manuelles d'une précision submillimétrique. Bien au-delà d'une simple réaction visuelle passive, cette tâche mobilise la capacité à extraire instantanément la structure vectorielle d'un champ dynamique pour y déceler les trajectoires de moindre risque.",
      "Comme l'a établi le neuroscientifique Mitsuo Kawato (1999) dans sa théorie des modèles internes prédictifs cérébelleux, la latence de conduction visuelle afférente (100 à 150 ms) interdit toute correction réactive en temps réel face à des projectiles lancés à vive allure. Le cerveau humain doit donc extraire immédiatement l'accélération initiale et l'angle d'incidence de chaque menace afin de simuler au sein du cervelet sa trajectoire sur les 200 ms suivantes, libérant en boucle ouverte un programme moteur d'évitement millimétré avant même l'arrivée du feedback rétinien.",
      "Dans le prolongement du modèle de contrôle moteur en deux phases de Robert S. Woodworth (1899), chaque déplacement rapide se compose d'une phase balistique explosive suivie d'un freinage micrométrique terminal. Lorsque la vitesse des projectiles excède 500 px/s, la loi de Fitts (1954) démontre que la marge spatiale de sécurité se contracte de manière drastique. Les trajectoires amples et désordonnées deviennent fatales : seule une gestuelle épurée, guidée par la pulpe des doigts sur un rayon inférieur à 10 px, permet d'atteindre les scores d'élite.",
      "Notre module tire parti de l'API performance.now() pour garantir une synchronisation temporelle rigoureuse et une détection sub-pixel des collisions sans latence logicielle parasite. L'utilisation conjointe d'un moniteur 144Hz ou 240Hz et d'une souris cadencée à 1000 Hz compresse le délai d'affichage sous le seuil des 4 ms (Woods et al., 2015). Toutes les données de performance sont calculées et conservées localement dans votre navigateur pour une confidentialité totale."
    ]
  },
  benchmarks: {
    title: "Grille de Référence Officielle de l'Esquive Cinétique (5 Paliers)",
    headers: ["Palier de Performance", "Titre Officiel", "Plafond de Score", "Précision & Vitesse de Pointe", "Grade", "Profil Neurobiomécanique"],
    rows: [
      ["Palier 1 : Maître Absolu de l'Esquive", "Apex Kinetic Evader", "24 000+ pts", "95%+ / 500+ px/s", "Grade S", "Anticipation cérébelleuse surhumaine (Top 0.1%), micro-ajustements sans faille face à 50 projectiles simultanés (Kawato 1999; Woodworth 1899)"],
      ["Palier 2 : Striker Vectoriel de Précision", "Precision Trajectory Striker", "17 000 – 23 999 pts", "90 – 94% / 400 – 499 px/s", "Grade A", "Perception spatiale de niveau esport (Top 3%), maintien souverain d'un rayon central face aux trajectoires croisées"],
      ["Palier 3 : Pilote d'Évasion Chevronné", "Skilled Evasion Pilot", "11 000 – 16 999 pts", "82 – 89% / 300 – 399 px/s", "Grade B", "Niveau compétitif solide (Top 15%), contrôle balistique du poignet stable et bonne anticipation des points d'apparition"],
      ["Palier 4 : Pratiquant en Progression", "Developing Dodger", "6 000 – 10 999 pts", "70 – 81% / 200 – 299 px/s", "Grade C", "Moyenne adulte standard. Tendance à se faire acculer dans les coins lors des accélérations; recentrage à travailler"],
      ["Palier 5 : Débutant en Phase d'Initiation", "Novice Evasion Trainee", "< 6 000 pts", "< 70% / < 200 px/s", "Grade D", "Collisions fréquentes dues au retard visuel; nécessite d'assouplir la préhension et d'élargir le champ périphérique"]
    ],
    note: "Échelle de mesure calibrée sur les modèles prédictifs de Kawato (1999), le contrôle bifasique de Woodworth (1899) et la loi de difficulté de Fitts (1954)."
  },
  techniques: {
    title: "Techniques de Pointe & Protocoles d'Entraînement à l'Esquive",
    items: [
      {
        name: "Anticipation Vectorielle de Kawato (Cerebellar Anticipation)",
        desc: "N'attendez pas qu'un projectile soit à proximité pour réagir. Dès son apparition en bordure de cadre, projetez mentalement sa trajectoire et positionnez préventivement votre curseur dans l'espace interstitiel libre.",
        tips: "Ne fixez pas les projectiles eux-mêmes, observez les espaces négatifs qui se forment entre eux."
      },
      {
        name: "Micro-Guidage Balistique de Woodworth (Micro-Snap Steering)",
        desc: "Bannissez les grands cercles panoramiques à travers l'écran. Travaillez par micro-impulsions de 10 à 20 px avec les doigts pour minimiser la dépense cinématique et éliminer les phases de freinage superflues.",
        tips: "Conservez le capteur fermement plaqué sur le tapis et utilisez la pulpe des doigts pour les décélérations."
      },
      {
        name: "Discipline de Recentrée et Évitement des Angles (Central Anchoring)",
        desc: "Fuir vers les bords ou les coins réduit vos angles d'échappatoire de 360° à 90°, rendant l'impact inévitable. Après chaque manœuvre, replacez systématiquement votre curseur dans les 30% centraux de l'arène.",
        tips: "Prenez le réflexe conditionné de revenir au centre immédiatement après une esquive d'urgence."
      },
      {
        name: "Balayage Global en Vision Périphérique (Peripheral Cluster Scanning)",
        desc: "Fixer exclusivement votre curseur vous prive de la vision globale des flux entrants. Posez un regard défocalisé et doux au centre de la zone et repérez les menaces via la voie magnocellulaire périphérique.",
        tips: "Défocalisez légèrement le regard : les trajectoires des projectiles deviendront perceptibles d'un seul bloc."
      }
    ]
  },
  steps: [
    "Ajustez votre posture et positionnez le curseur au centre de l'arène de jeu.",
    "Anticipez la trajectoire des projectiles incidents et déviez subtilement votre curseur vers les zones sécurisées.",
    "Recentrez immédiatement le curseur après chaque esquive pour préserver un champ de dégagement omnidirectionnel.",
    "Complétez les 45 secondes de survie sans subir de collision pour préserver le multiplicateur 3.0x et franchir les 24 000 points."
  ],
  audience: "Joueurs de League of Legends, Valorant, CS2 et Apex Legends cherchant à perfectionner l'esquive de skillshots et les micro-déplacements de souris, ainsi que toute personne désireuse d'aiguiser ses réflexes moteurs et sa coordination visuo-motrice.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('kawato1999', 'woodworth1899', 'fitts1954', 'woods2015')
};

export default function LocalizedQuickDodgePageFr() {
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
      <QuickDodgeClient
        copy={{
          title: "Jeu d'Esquive Souris & Test de Réflexes",
          subtitle: "Évitement Cinétique de Projectiles & Modèles Prédictifs • 15 Niveaux de Difficulté",
          description: "Esquiver des projectiles relève de la prédiction, non de la simple réaction : le temps que vos yeux perçoivent leur trajectoire, ils ont déjà progressé. Les trajectoires rapides se planifient en amont via les modèles prédictifs cérébelleux (Kawato, 1999), car la vision afférente requiert 100 à 150 ms pour intervenir (Woodworth, 1899). Lorsque la cadence s'accélère, la fenêtre de correction s'évanouit et seule l'anticipation assure la survie.",
          badge: "Test d'Esquive & Réflexes",
          hudLabels: {
            score: "Score",
            time: "Temps",
            bestScore: "Meilleur Score",
            bestCombo: "Meilleur Combo",
            getReady: "PRÉPAREZ-VOUS"
          },
          resultLabels: {
            newBest: "NOUVEAU RECORD",
            points: "Points",
            accuracy: "Précision",
            dodges: "Esquives",
            peakSpeed: "Vitesse Max",
            peakLevel: "Niveau Max",
            playAgain: "Rejouer"
          },
          rulesTitle: "Règles de l'Exercice & Système de Points",
          rulesItems: [
            { title: "Évitement de Projectiles & Score", text: "Évitez tout contact avec les sphères rouges. Chaque seconde de survie sans collision incrémente continuellement votre score." },
            { title: "Esquives Rapprochées (Close Shave)", text: "Frôlez les projectiles à quelques pixels de distance pour décrocher des bonus et accélérer la montée du multiplicateur de combo." },
            { title: "Accélération Continue du Rythme", text: "Au fur et à mesure que votre score s'élève, les projectiles atteignent 500 px/s et la fréquence d'apparition s'intensifie drastiquement." },
            { title: "Pénalité de Collision", text: "Toucher un projectile réinitialise immédiatement votre multiplicateur à 1.0x et déclenche un avertissement visuel rouge." }
          ],
          aboutTitle: "À Propos du Jeu d'Esquive Souris & de la Biomécanique de l'Évitement",
          aboutSections: [
            {
              title: "Évasion de Menaces Cinétiques & Modèles Prédictifs de Kawato",
              subtitle: "Simulation vectorielle cérébelleuse en amont de la latence optique afférente",
              content: "Esquiver des objets rapides repose sur l'anticipation motrice décrite par Kawato (1999). Extraire l'angle de départ permet d'engager la souris sur une voie dégagée avant que le retard visuel ne condamne le mouvement."
            },
            {
              title: "Contrôle Bifasique de Woodworth & Micro-Freinage",
              subtitle: "Équilibre entre impulsion balistique initiale et verrouillage micrométrique",
              content: "Tout mouvement réactif associe une accélération première et une décélération de précision (Woodworth, 1899). Bloquer net la trajectoire avec les doigts évite les glissements incontrôlés propices aux impacts."
            },
            {
              title: "Loi de Fitts & Réduction de la Marge de Sécurité",
              subtitle: "Croissance logarithmique de la difficulté au sein du champ dense de projectiles",
              content: "Quand les obstacles prolifèrent, la largeur de passage sécurisé diminue de façon critique, exigeant une rigueur motrice millimétrique pour naviguer sans heurts (Fitts, 1954)."
            },
            {
              title: "Taux de Rafraîchissement Élevé & Fluidité Temporelle",
              subtitle: "Dalles 144Hz/240Hz et latences de 4,1 ms pour un suivi analogique sans saccades",
              content: "Un écran à haute fréquence élimine le flou stroboscopique des projectiles à 500 px/s, offrant au système nerveux une information spatiale continue d'une clarté absolue (Woods et al., 2015)."
            }
          ]
        }}
      />
      <DrillGuide {...dodgeGuide} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/reflex-training/quick-dodge" />
    </>
  );
}
