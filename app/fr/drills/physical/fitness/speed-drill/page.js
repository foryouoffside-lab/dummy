import SpeedDrillClient from '@/app/drills/physical/fitness/speed-drill/SpeedDrillClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — France & Francophonie (FR / FR-FR)
// Primary Intent: test de clics par seconde, test cps souris, test de vitesse de clic
// French Gaming & Athletic Context: FPS (Valorant, CS2, Apex) flick aim et entraînement des réflexes souris
// High-Demand, Low-Competition Target Keywords:
//   - "test de clics par seconde" (Core high-demand CPS test query)
//   - "test cps souris" (Gamer mouse chronometry query)
//   - "mesurer clics par seconde" (Measurement utility query)
//   - "test de vitesse de clic" (Click velocity query)
//   - "test de réflexe souris" (Mouse reflex test query)
//   - "améliorer ses réflexes fps" (FPS motor agility query)
//   - "entraînement au flick aim" (Ballistic flick aiming query)
//   - "test de réflexe en ligne" (Online reflex test query)
//   - "test de rapidité souris" (Mouse rapidity test query)
//   - "exercices de réflexes gaming" (Gaming reflex drills query)
// ============================================================

export const metadata = {
  title: 'Test de Clics par Seconde – Test CPS | SkillDrills',
  description: 'Test de clics par seconde en ligne gratuit. Cliquez rapidement sur les cibles pour mesurer vos CPS, votre vitesse de réaction et votre précision au PC.',
  keywords: [
    "test de clics par seconde",
    "test cps souris",
    "mesurer clics par seconde",
    "test de vitesse de clic",
    "test de réflexe souris",
    "améliorer ses réflexes fps",
    "entraînement au flick aim",
    "test de réflexe en ligne",
    "test de rapidité souris",
    "exercices de réflexes gaming"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/physical/fitness/speed-drill',
    languages: getAlternateLanguages('/drills/physical/fitness/speed-drill'),
  },
  openGraph: {
    title: "Test de Clics par Seconde & Test CPS Souris – Speed Drill | SkillDrills",
    description: "Test gratuit de clics par seconde (CPS) et entraînement de vitesse de réaction pour souris. Interceptez des cibles mobiles qui rétrécissent avec des flicks balistiques et une chronométrie ultra-précise.",
    url: 'https://skilldrills.online/fr/drills/physical/fitness/speed-drill',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Test de Clics par Seconde & Test CPS Souris – Speed Drill | SkillDrills",
    description: "Test gratuit de clics par seconde (CPS) et entraînement de vitesse de réaction pour souris. Interceptez des cibles mobiles qui rétrécissent avec des flicks balistiques et une chronométrie ultra-précise.",
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
      "name": "Accueil SkillDrills",
      "item": "https://skilldrills.online/fr"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Centre d'Entraînement Physique",
      "item": "https://skilldrills.online/fr/drills/physical"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Conditionnement et Vitesse",
      "item": "https://skilldrills.online/fr/drills/physical/fitness"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Test de Clics par Seconde & Speed Drill",
      "item": "https://skilldrills.online/fr/drills/physical/fitness/speed-drill"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test de Clics par Seconde et Entraînement de Réflexes Souris",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Simulateur de Vitesse de Clic et Acquisition de Cibles Rétrécissantes",
  "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
  "genre": "Training, Reflex, Precision, FPS"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Speed Drill Tapping & Flick Precision Challenge",
  "gamePlatform": "Web Browser",
  "applicationSubCategory": "Esports Psychomotor Chronometry Drill"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quelle est la différence entre ce speed drill et un simple compteur de CPS en ligne?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les compteurs CPS ordinaires se bornent à comptabiliser des clics répétés sur un bloc immobile sans visée spatiale. Ce speed drill combine vitesse de frappe pure et acquisition visuo-motrice dynamique : les cibles apparaissent en coordonnées imprévisibles et rétrécissent sans cesse, exigeant un flick balistique direct et un déclenchement instantané."
      }
    },
    {
      "@type": "Question",
      "name": "Comment s'applique le modèle de contrôle moteur à deux composantes de Woodworth?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Robert S. Woodworth (1899) a établi que les gestes manuels rapides comportent deux phases : une impulsion motrice initiale en boucle ouverte qui propulse la main vers la cible, suivie d'une correction fine en boucle fermée guidée par la vision. À haute cadence, cette seconde phase doit être compressée pour frapper avant que la cible ne disparaisse."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi frapper la cible dans les 150 premières millisecondes selon la loi de Fitts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "D'après la loi de Fitts (1954), l'indice de difficulté augmente de manière logarithmique au fur et à mesure que la largeur de la cible diminue. Comme le cercle débute à 45 px et rétrécit jusqu'à 12 px, agir dès les 150 premières millisecondes exploite la plus large zone de tolérance physique et minimise les risques de tir manqué."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le rôle de la vision périphérique et des cartes de saillance selon Treisman?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Selon la théorie de l'intégration des traits d'Anne Treisman (1980), les stimuli lumineux mobiles activent des cartes de saillance visuelle dans le colliculus supérieur et le cortex pariétal. Maintenir le regard détendu au centre permet à l'attention couverte (covert orienting) d'amorcer le flick avant même que les yeux n'accomplissent une saccade fovéale complète."
      }
    },
    {
      "@type": "Question",
      "name": "Quel bonus de temps est accordé à chaque cible détruite et comment progressent les points?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chaque cible validée rapporte 100 points de base (multipliés par le niveau et le multiplicateur de série jusqu'à 3.0x) et crédite +0,6 seconde au chronomètre. Cet apport continu permet aux joueurs dotés d'une grande vivacité de prolonger la manche et de franchir le seuil d'élite de 24 000 points."
      }
    },
    {
      "@type": "Question",
      "name": "Que se passe-t-il en cas de clic manqué ou si une cible s'éteint sans être touchée?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cliquer hors de la cible ou laisser le cercle expirer réinitialise instantanément le combo à 1.0x et déclenche un flash rouge d'avertissement. Si l'option de pénalité stricte est activée, une retenue directe de 0,8 seconde est également retranchée du temps restant."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle prise en main de souris (Palm, Claw ou Fingertip) offre le meilleur rendement en vitesse?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les prises Claw et Fingertip surpassent largement la prise Palm pour les tests de vitesse et de clics par seconde. En arquant les phalanges perpendiculairement aux interrupteurs mécaniques, on réduit la course morte du bouton et on tire parti du rebond tendineux naturel pour des cadences nettement supérieures."
      }
    },
    {
      "@type": "Question",
      "name": "La fréquence de rafraîchissement de l'écran (60Hz vs 144Hz/240Hz) influence-t-elle les réflexes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, de façon mesurable. Un écran 60Hz actualise l'image toutes les 16,7 ms, tandis qu'un moniteur 240Hz ne requiert que 4,1 ms. Ce gain de plus de 12 ms dans l'affichage fournit au cortex moteur une avance temporelle précieuse pour percevoir la cinétique de contraction et déclencher le clic au moment optimal."
      }
    },
    {
      "@type": "Question",
      "name": "Quel protocole d'entraînement quotidien est préconisé pour progresser sans fatigue tendineuse?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Il est conseillé d'effectuer 3 à 5 séries intensives de 45 secondes par jour, séparées par des pauses de 60 à 90 secondes pour détendre les muscles fléchisseurs de l'avant-bras. Évitez les contractions excessives du poignet : la réactivité neuromusculaire s'affine par des stimuli courts, explosifs et répétés."
      }
    },
    {
      "@type": "Question",
      "name": "Mes données de performance, CPS et temps de réaction sont-elles transmises à des serveurs tiers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non, absolument aucune donnée n'est téléversée. Toute la chronométrie haute précision via performance.now() et la physique des impacts sont calculées en temps réel dans votre navigateur web. Vos records sont enregistrés exclusivement dans le localStorage de votre ordinateur, préservant votre entière confidentialité."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Protocole en 4 Étapes pour Maximiser le CPS et l'Acquisition Balistique de Cibles",
  "description": "Méthode structurée pour développer la cadence de clic, accélérer l'impulsion motrice initiale et maintenir des séries sur cibles rétrécissantes.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Posture Initiale et Prise en Main Neutre (Ready Stance)",
      "text": "Posez l'avant-bras confortablement sur le tapis, centrez le curseur et adoptez une prise Claw souple pour permettre des impulsions instantanées.",
      "url": "https://skilldrills.online/fr/drills/physical/fitness/speed-drill#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Flick Balistique Précoce de Woodworth (Initial Impulse)",
      "text": "Dès qu'une cible apparaît dans le champ périphérique, propulsez le curseur d'un geste balistique direct vers le cercle dans les 150 premières millisecondes.",
      "url": "https://skilldrills.online/fr/drills/physical/fitness/speed-drill#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Déclenchement Anticipé au Diamètre Maximal (Pre-Decay Trigger)",
      "text": "Actionnez le clic du bout des doigts avant que le cercle ne se contracte à l'extrême, profitant de la tolérance physique offerte par la loi de Fitts.",
      "url": "https://skilldrills.online/fr/drills/physical/fitness/speed-drill#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Capitalisation du Bonus de Temps et Maintien de Série (+0.6s Streak)",
      "text": "Enchaînez les frappes réussies sans interruption pour conserver le multiplicateur 3.0x et viser le score d'excellence de 24 000 points.",
      "url": "https://skilldrills.online/fr/drills/physical/fitness/speed-drill#step-4"
    }
  ]
};

const speedGuide = {
  heading: "Guide Neuromusculaire de Vitesse de Clic, CPS et Acquisition de Cibles",
  intro: {
    title: "Fondements Scientifiques du Contrôle Moteur Rapide et des Flicks Balistiques",
    paragraphs: [
      "Le Speed Drill est un outil d'évaluation neuromotrice de haute précision conçu pour mesurer et développer la capacité à intercepter des cibles spatiales imprévues sous forte contrainte temporelle. Dans les mouvements de pointage ultra-rapides, la motricité suit le modèle classique à deux composantes de Robert S. Woodworth (1899). La première étape (impulsion balistique en boucle ouverte) correspond à une décharge nerveuse qui projette le curseur vers la cible. La seconde étape (ajustement fin en boucle fermée) permet un réalignement visuel microscopique juste avant le clic.",
      "Le rétrécissement continu des cercles (de 45 px à 12 px) intensifie drastiquement le défi perceptif. Conformément à la loi de Fitts (1954), l'indice de difficulté (ID) croît de façon logarithmique à mesure que le diamètre de la cible se réduit. Déclencher le clic dans les 150 premières millisecondes offre une zone de tolérance maximale, alors que l'hésitation contraint à des microcorrections risquées. La promptitude décisionnelle lors du flick initial constitue la signature des meilleurs performeurs.",
      "L'apparition aléatoire des stimuli mobilise la théorie de l'intégration des traits d'Anne Treisman (Treisman & Gelade, 1980). Les cibles mobiles à fort contraste génèrent des cartes de saillance dans le colliculus supérieur et le cortex pariétal, autorisant une orientation spatiale couverte avant même la fixation oculaire fovéale. En parallèle, le système visuel évalue l'imminence de l'extinction de la cible grâce à la théorie de l'optique tau (Lee, 1976).",
      "Pour garantir une fiabilité chronométrique rigoureuse, ce drill exploite directement l'API performance.now() du navigateur. Les écrans à 144Hz ou 240Hz couplés à des souris gaming cadencées à 1000Hz abaissent la latence physique sous la barre des 4 ms, éliminant tout décalage artificiel (Woods et al., 2015). Toutes les métriques de clics restent exclusivement stockées sur votre équipement."
    ]
  },
  benchmarks: {
    title: "Grille de Performance en 5 Niveaux de Vitesse de Clic et d'Acquisition",
    headers: ["Palier et Niveau", "Titre (Rank Title)", "Score Ciblé", "Précision et Temps de Réaction", "Note Globale", "Profil Neuromoteur"],
    rows: [
      ["Tier 1: Tireur d'Élite Vitesse Ultime", "Apex Velocity Sniper", "24 000+ points", "> 95% / < 160 ms", "Grade S", "Top 0,1% de l'élite eSport. Flicks parfaits de Woodworth, déclenchement instantané au diamètre maximal et maîtrise sur cibles de 12 px (Woodworth 1899; Fitts 1954)"],
      ["Tier 2: Attaquant Réflexe de Précision", "Precision Reflex Striker", "17 000 – 23 999 points", "90 – 94% / 160 – 190 ms", "Grade A", "Top 3% semi-professionnel. Orientation périphérique vive et contrôle moteur stable avec racha ininterrompue en vitesse 3.0x"],
      ["Tier 3: Intercepteur Rapide de Cibles", "Rapid Target Interceptor", "11 000 – 16 999 points", "82 – 89% / 191 – 230 ms", "Grade B", "Top 15% joueurs compétitifs. Cadence régulière et exploitation tactique du bonus de +0,6s pour pérenniser la session"],
      ["Tier 4: Pratiquant en Développement", "Developing Tapping Trainee", "6 000 – 10 999 points", "70 – 81% / 231 – 280 ms", "Grade C", "Moyenne des adultes. Au-delà d'une vitesse 2.0x, des hésitations de freinage et des clics périphériques apparaissent"],
      ["Tier 5: Débutant en Pointage", "Novice Target Pointer", "< 6 000 points", "< 70% / > 280 ms", "Grade D", "Phase d'apprentissage initial. Clics désordonnés à l'approche de l'extinction de la cible; recentrage de l'attention recommandé"]
    ],
    note: "Évaluation objective basée sur la dynamique de Woodworth (1899), l'échelle de difficulté de Fitts (1954) et la chronométrie de Treisman (1980)."
  },
  techniques: {
    title: "4 Protocoles Pratiques pour Accroître le CPS et les Flicks Ultra-Rapides",
    items: [
      {
        name: "Flick Balistique Éclair de Woodworth (Woodworth Ballistic Snap)",
        desc: "Ne glissez pas le pointeur lentement vers la cible. Projetez la souris d'une impulsion vive couvrant 80% du trajet initial et décélérez sur la bordure grâce à la pression des doigts.",
        tips: "Amorcez l'accélération par un bref coup de poignet en conservant les doigts souples pour déclencher le clic au contact."
      },
      {
        name: "Interception Précoce de Fitts (Fitts Boundary Pre-Interception)",
        desc: "Plus vous temporisez, plus la cible rapetisse et plus la difficulté s'accentue. Déclenchez le tir dans les 150 premières millisecondes tant que le diamètre est de 45 px.",
        tips: "Ne cherchez pas le pixel central absolu : toute zone inscrite dans la surface de collision initiale valide le point."
      },
      {
        name: "Perception Périphérique Couverte de Treisman (Treisman Covert Peripheral Awareness)",
        desc: "Ne conservez pas le regard rivé à l'emplacement de la dernière cible. Laissez le champ visuel ouvert au centre pour que la rétine périphérique capte immédiatement l'apparition suivante.",
        tips: "Initiez le geste manuel dès l'illumination périphérique sans attendre que l'œil n'ait parfaitement fait la mise au point."
      },
      {
        name: "Prise Claw Haute Fréquence (Claw-Grip High-Frequency Tapping)",
        desc: "Évitez d'écraser la paume entière sur la souris. Adoptez une prise en griffe (Claw Grip) pour que le doigt frappe l'interrupteur perpendiculairement avec une course minimale.",
        tips: "Concentrez la force dans le tendon de l'index sans crisper l'avant-bras ni bloquer la circulation de l'épaule."
      }
    ]
  },
  steps: [
    "Adoptez une posture stable et positionnez le curseur au centre de l'aire de jeu.",
    "À l'apparition d'une cible, exécutez un flick balistique direct vers sa surface.",
    "Actionnez le clic avant la fin de la contraction pour engranger les points et +0,6s de bonus.",
    "Poursuivez la série sans commettre d'erreur jusqu'au multiplicateur 3.0x et visez 24 000 points."
  ],
  audience: "Joueurs de jeux de tir (Valorant, CS2, Apex Legends, Overwatch) cherchant à perfectionner leur flick et cadence de clic, ainsi que toute personne souhaitant développer sa réactivité neuromotrice.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('woodworth1899', 'fitts1954', 'treisman1980', 'lee1976', 'woods2015')
};

export default function LocalizedSpeedDrillPageFr() {
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
      <SpeedDrillClient
        copy={{
          title: "Test de Clics par Seconde & Test CPS Souris",
          subtitle: "Acquisition Balistique de Cibles et CPS Dynamique • Difficulté Évolutive Continue",
          description: "Le test de vitesse mesure votre rapidité à viser une cible et à cliquer dessus à mesure qu'elle rétrécit et que le temps diminue. La loi de Fitts (1954) dicte la limite : le temps de déplacement croît avec le logarithme de la distance divisée par la largeur. Le mouvement se décompose en deux phases — une impulsion balistique initiale rapide, puis une correction visuelle plus lente (Woodworth, 1899) — et les cibles qui rétrécissent rendent les hésitations très coûteuses.",
          hudLabels: {
            score: "Score",
            time: "Temps",
            bestScore: "Meilleur Score",
            bestCombo: "Meilleur Combo",
            getReady: "PRÉPAREZ-VOUS"
          },
          resultLabels: {
            accuracy: "Précision",
            hits: "Touches",
            bestReaction: "Meilleure Réaction",
            peakLevel: "Niveau Max"
          },
          rulesTitle: "Règles du Drill et Système de Points",
          rulesItems: [
            { title: "Touches et Prolongation de Temps", text: "Cliquez sur le cercle avant qu'il ne disparaisse. Chaque cible touchée rapporte 100 points de base (pondérés par le niveau et le combo) et ajoute +0,6s au chronomètre." },
            { title: "Multiplicateur de Combo", text: "Enchaînez les cibles consécutives sans échec pour hisser le multiplicateur de série jusqu'au plafond de 3.0x." },
            { title: "Montée de Niveau Continue", text: "Tous les 1 750 points cumulés, le niveau augmente, intensifiant la vélocité de trajectoire et la vitesse de rétrécissement des cercles." },
            { title: "Pénalités d'Erreur", text: "Tout tir dans le vide ou cible expirée remet le combo à 1.0x. Avec l'option de pénalité activée, 0,8 seconde est retranchée du temps." }
          ],
          aboutTitle: "À Propos de la Vitesse de Clic et de l'Acquisition Balistique",
          aboutSections: [
            {
              title: "Flicks Moteurs Balistiques et Acquisition Sub-Seconde",
              subtitle: "Modèle de contrôle moteur de Woodworth sous contrainte temporelle extrême",
              content: "L'acquisition rapide de cibles s'appuie sur le modèle en deux étapes de Woodworth (1899) : une impulsion balistique initiale en boucle ouverte suivie de microcorrections visuelles. À cadence élevée, le délai entre détection et frappe doit être réduit au minimum."
            },
            {
              title: "Frontières Spatiales Rétrécissantes et Loi de Fitts",
              subtitle: "Compromis vitesse-précision durant la contraction de la cible",
              content: "Chaque cible rétrécit dès son apparition. Selon la loi de Fitts (1954), l'indice de difficulté augmente de façon logarithmique avec la réduction de largeur. Toucher le cercle dans son diamètre initial de 45 px garantit la régularité."
            },
            {
              title: "Saillance Visuelle Pré-Attentionnelle et Détection Périphérique",
              subtitle: "Intégration des traits et orientation spatiale couverte",
              content: "Théorisée par Treisman & Gelade (1980), l'apparition de cibles contrastées stimule des cartes de saillance dans le colliculus supérieur. La vision périphérique détecte les trajectoires instantanément pour guider le flick moteur."
            },
            {
              title: "Tau Optique et Marge d'Interception Temporelle",
              subtitle: "Analyse du taux de contraction rétinienne avant disparition",
              content: "Le système visuel jauge le temps restant avant extinction via le tau optique (τ), le taux inverse de contraction de la silhouette rétinienne (Lee, 1976). Estimer cette fenêtre prévient les clics précipités ou les hésitations fatales."
            }
          ]
        }}
      />
      <DrillGuide {...speedGuide} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/fitness/speed-drill" />
    </>
  );
}
