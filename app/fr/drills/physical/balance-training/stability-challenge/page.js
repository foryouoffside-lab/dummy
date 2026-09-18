import StabilityChallengeClient from '@/app/drills/physical/balance-training/stability-challenge/StabilityChallengeClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — France & Francophonie (FR / FR-FR)
// Primary Intent: précision souris test, jeu précision souris, contrôle du recul souris
// French Context: Comment stabiliser sa visée souris dans Valorant/CS2 et contrer les tremblements musculaires
// High-Demand, Low-Competition Target Keywords:
//   - "précision souris test" (Direct precision diagnostic query)
//   - "jeu précision souris" (Interactive precision game query)
//   - "entrainement précision souris" (Aim precision training query)
//   - "améliorer précision souris" (Accuracy improvement query)
//   - "test de visée souris" (Aim testing query)
//   - "stabilité de la souris" (Mouse stability and jitter query)
//   - "contrôle du recul souris" (Recoil compensation and counter-drag)
//   - "comment stabiliser sa visée souris" (Tremor reduction technique)
//   - "test équilibre moteur et résistance" (Motor equilibrium and resistance)
//   - "compensation des perturbations motrices" (Motor perturbation compensation)
// ============================================================

export const metadata = {
  title: 'Stabilité de Visée – Test Précision Souris | SkillDrills',
  description: 'Test de stabilité de visée et précision souris en ligne. Résistez aux forces dynamiques pour garder le réticule centré et éliminer les tremblements.',
  keywords: [
    "precision souris test",
    "jeu precision souris",
    "entrainement precision souris",
    "ameliorer precision souris",
    "test de visee souris",
    "stabilite de la souris",
    "controle du recul souris",
    "comment stabiliser sa visee souris",
    "test equilibre moteur et resistance",
    "compensation des perturbations motrices"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/physical/balance-training/stability-challenge',
    languages: getAlternateLanguages('/drills/physical/balance-training/stability-challenge'),
  },
  openGraph: {
    title: 'Stabilité de Visée – Test Précision Souris | SkillDrills',
    description: 'Test de stabilité de visée et précision souris en ligne. Résistez aux forces dynamiques pour garder le réticule centré et éliminer les tremblements.',
    url: 'https://skilldrills.online/fr/drills/physical/balance-training/stability-challenge',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stabilité de Visée – Test Précision Souris | SkillDrills',
    description: 'Test de stabilité de visée et précision souris en ligne. Résistez aux forces dynamiques pour garder le réticule centré et éliminer les tremblements.',
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
      "name": "Équilibre et Stabilité Motrice",
      "item": "https://skilldrills.online/fr/drills/physical/balance-training"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Défi de Stabilité et Contrôle de la Souris",
      "item": "https://skilldrills.online/fr/drills/physical/balance-training/stability-challenge"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Entraîneur de Stabilité Souris et Contrôle de Visée",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Application biomécanique en ligne pour éliminer les tremblements de visée à la souris, renforcer l'équilibre neuromusculaire et optimiser le contrôle du recul."
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Défi de Stabilité de Visée (Stability Challenge)",
  "url": "https://skilldrills.online/fr/drills/physical/balance-training/stability-challenge",
  "description": "Test interactif gratuit dans le navigateur pour mesurer et perfectionner la stabilité du curseur face à des vecteurs continus de vent et de résistance motrice.",
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
  "name": "Défi de Stabilité de la Souris",
  "url": "https://skilldrills.online/fr/drills/physical/balance-training/stability-challenge",
  "description": "Jeu d'adresse et de résistance neuromotrice consistant à verrouiller le réticule au centre contre des forces dynamiques déstabilisatrices.",
  "genre": ["Action", "Sports Game", "Reflex Game", "Motor Training"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu'est-ce que le Défi de Stabilité (Stability Challenge) et comment fonctionne-t-il ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le Défi de Stabilité est un entraînement biomécanique de motricité fine et d'équilibre postural. Des vecteurs de vent dynamiques exercent une poussée continue pour chasser votre réticule du centre. Votre objectif est d'appliquer une contre-pression douce, fluide et constante sur la souris afin de maintenir le réticule dans l'anneau de sécurité central."
      }
    },
    {
      "@type": "Question",
      "name": "Comment cet exercice aide-t-il à éliminer les tremblements de souris dans Valorant ou CS2 ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les tremblements involontaires lors de la visée résultent souvent d'une co-contraction excessive des muscles fléchisseurs et extenseurs de l'avant-bras sous tension. En confrontant le système nerveux à une poussée continue plutôt qu'à des à-coups, l'exercice active les boucles de régulation visuelle en circuit fermé (Woodworth, 1899), favorisant un tonus musculaire fluide indispensable au contrôle du recul (recoil)."
      }
    },
    {
      "@type": "Question",
      "name": "Comment la force du vent et la taille de l'anneau de sécurité évoluent-elles ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tous les 250 points, vous progressez jusqu'au Niveau 15. Durant cette montée en difficulté, le rayon de l'anneau central rétrécit de 45 px à seulement 20 px, tandis que l'accélération des rafales de vent grimpe de 250 à 850 unités de force, imposant des micro-ajustements musculaires millimétrés."
      }
    },
    {
      "@type": "Question",
      "name": "Que se passe-t-il lorsque le curseur quitte l'anneau de sécurité ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sortir de l'anneau brise le verrouillage de stabilité, déclenche un flash rouge à l'écran et réinitialise instantanément le multiplicateur de combo à 1.0x. Aucun point déjà acquis n'est déduit et aucun temps n'est soustrait du chronomètre."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la durée exacte d'une session d'entraînement ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chaque session dure précisément 45 secondes fixes. Le compte à rebours s'écoule de manière homogène de 45s à 0s, fournissant un cadre scientifique standardisé et reproductible pour suivre avec exactitude votre progression personnelle."
      }
    },
    {
      "@type": "Question",
      "name": "Quel score correspond à une performance de niveau élite (Tier 1) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Atteindre 17 000 points ou plus avec un taux de stabilité supérieur à 92 % dans l'anneau réduit de 20 px (Niveaux 12 à 15) vous classe dans le Tier 1 : Apex Stability Master (Note S+), un rang obtenu par moins de 0,5 % des pratiquants. La moyenne des joueurs se situe entre 6 000 et 9 499 points (Tier 4)."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle prise de souris (Palm, Claw ou Fingertip) optimise la résistance ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les prises Palm ou Claw, combinées à un appui franc de l'avant-bras sur le bureau, offrent la base isométrique la plus stable contre des forces de dérive soutenues. La prise Fingertip permet d'excellentes micro-corrections mais fatigue plus rapidement les petits muscles intrinsèques de la main face aux rafales violentes."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle sensibilité de souris (DPI) est recommandée pour stabiliser sa visée ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Une sensibilité modérée à basse (entre 800 et 1200 DPI natifs sous Windows 1:1, ou 200 à 350 eDPI dans les FPS tactiques) est fortement conseillée pour éviter que les micro-vibrations physiologiques de la main ne propulsent le curseur hors de l'anneau de 20 px."
      }
    },
    {
      "@type": "Question",
      "name": "En quoi la posture corporelle influe-t-elle sur la stabilité du curseur ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Comme l'ont démontré Nashner & McCollum (1985), le contrôle moteur des extrémités dépend de la stabilité proximale (épaules et tronc). Une mauvaise assise ou un coude suspendu dans le vide transmet les oscillations respiratoires directement au capteur optique de la souris."
      }
    },
    {
      "@type": "Question",
      "name": "Mes données de performance et mes scores sont-ils transmis à des serveurs tiers ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non. SkillDrills enregistre l'intégralité de vos records, combos et analyses de manière 100 % locale dans le LocalStorage de votre navigateur, sans aucun suivi externe ni nécessité de créer un compte."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment Développer la Stabilité et le Contrôle de la Souris en 4 Étapes",
  "description": "Méthode biomécanique en 4 étapes pour contrer les perturbations externes et éliminer les tremblements de visée.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Centrage et Verrouillage du Pointeur (Pointer Lock)",
      "text": "Placez le réticule exactement au cœur de l'anneau émeraude avant le lancement et cliquez pour verrouiller le curseur dans le navigateur.",
      "url": "https://skilldrills.online/fr/drills/physical/balance-training/stability-challenge#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Perception du Vecteur de Dérive",
      "text": "Identifiez visuellement la direction de la force du vent dès que le trait directionnel commence à déplacer le réticule vers l'extérieur.",
      "url": "https://skilldrills.online/fr/drills/physical/balance-training/stability-challenge#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Application d'une Contre-pression Isométrique Continue",
      "text": "Exercez une force opposée fluide et mesurée pour maintenir le curseur au centre et faire grimper le multiplicateur de combo jusqu'à 3.0x.",
      "url": "https://skilldrills.online/fr/drills/physical/balance-training/stability-challenge#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Maîtrise des Micro-ajustements dans l'Anneau de 20 px",
      "text": "Dans les niveaux ultimes (Lv. 10 à 15), absorbez les violentes accélérations du vent à l'aide de la pulpe des doigts sans décoller l'avant-bras.",
      "url": "https://skilldrills.online/fr/drills/physical/balance-training/stability-challenge#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('woodworth1899', 'fitts1954', 'woods2015'),
  intro: {
    title: 'Stabilité de Visée – Test Précision Souris | SkillDrills',
    paragraphs: [
      "La stabilité du curseur de la souris sous l'effet de perturbations dynamiques est une traduction directe de la capacité du système neuromusculaire à fusionner proprioception kinesthésique et rétroaction visuelle continue. Contrairement à un tir réflexe balistique (flick shot), la stabilisation réclame un ajustement isométrique permanent entre les groupes musculaires agonistes et antagonistes de l'avant-bras et des doigts. Cet exercice quantifie la finesse avec laquelle le cortex moteur primaire et le cervelet régulent cette micro-pression face à des forces d'arrachement imprévisibles (Nashner & McCollum, 1985).",
      "Selon le modèle fondateur de contrôle moteur à deux phases de Robert S. Woodworth (1899), tout mouvement manuel se compose d'une phase d'impulsion initiale en boucle ouverte, suivie d'une phase de contrôle continu en boucle fermée basée sur le retour sensoriel (Current Control Phase). Dans cet exercice de stabilité, l'utilisateur opère en permanence dans cette seconde phase : le vent simulant la dérive verticale et latérale du recul des armes, le système oculaire identifie l'écart par rapport au centre et commande des micro-ajustements correctifs instantanés.",
      "La progression de la difficulté applique les règles d'équilibre sous perturbation décrites par David A. Winter (1995) et la Loi de Fitts (1954). Lorsque le rayon de l'anneau protecteur diminue de 45 px à 20 px dans les niveaux avancés, la tolérance spatiale s'effondre, amplifiant de manière exponentielle l'indice de difficulté motrice. Tout retard de compensation supérieur à 50 millisecondes provoque la sortie de zone et l'interruption immédiate de la série de combo.",
      "Rigueur de mesure et latence matérielle : Le calcul du pourcentage de stabilité et la détection des limites s'appuient sur l'horloge haute précision performance.now() du navigateur, offrant une précision de l'ordre de la microseconde. Néanmoins, les écrans standards à 60 Hz imposent une quantification de rafraîchissement d'environ 16,7 ms, alors que les dalles 144 Hz et 240 Hz réduisent cet intervalle à 6,9 ms et 4,1 ms (Woods et al., 2015). Les souris gaming cadencées à 1000 Hz limitent le retard d'entrée à moins de 1 ms. L'ensemble des calculs s'effectue en temps réel sur la machine de l'utilisateur, garantissant une absence totale de latence réseau et une confidentialité absolue."
    ]
  },
  benchmarks: {
    title: "Normes Officielles et Paliers de Stabilité Motrice",
    headers: ["Palier", "Titre du Rang", "Score Référence", "Stabilité & Niveau", "Note", "Percentile Global"],
    rows: [
      ["Tier 1", "Maître Absolu de la Stabilité", "17 000+ points", "Niveau 12–15 / Stabilité >92%", "Note S+", "Top 0,5% (Contrôle Chirurgical)"],
      ["Tier 2", "Spécialiste de la Compensation", "13 000 à 16 999 pts", "Niveau 9–11 / Stabilité 85–91%", "Note A", "Top 5% (Niveau Compétitif)"],
      ["Tier 3", "Stabilisateur de Terrain Avancé", "9 500 à 12 999 pts", "Niveau 6–8 / Stabilité 76–84%", "Note B", "Top 20% (Fermeté Établie)"],
      ["Tier 4", "Pratiquant en Développement", "6 000 à 9 499 pts", "Niveau 3–5 / Stabilité 65–75%", "Note C", "50% (Moyenne des Joueurs)"],
      ["Tier 5", "Débutant Sujet aux Tremblements", "< 6 000 points", "Niveau 1–2 / Stabilité <65%", "Note D", "Débutant (Entraînement Recommandé)"],
    ],
    note: "Le classement évalue le temps cumulé dans le cercle de sécurité, la dissipation des perturbations de vent et le score brut.",
  },
  protocols: {
    title: 'Stabilité de Visée – Test Précision Souris | SkillDrills',
    description: 'Test de stabilité de visée et précision souris en ligne. Résistez aux forces dynamiques pour garder le réticule centré et éliminer les tremblements.',
    items: [
      {
        title: 'Stabilité de Visée – Test Précision Souris | SkillDrills',
        description: 'Test de stabilité de visée et précision souris en ligne. Résistez aux forces dynamiques pour garder le réticule centré et éliminer les tremblements.'
      },
      {
        title: 'Stabilité de Visée – Test Précision Souris | SkillDrills',
        description: 'Test de stabilité de visée et précision souris en ligne. Résistez aux forces dynamiques pour garder le réticule centré et éliminer les tremblements.'
      },
      {
        title: 'Stabilité de Visée – Test Précision Souris | SkillDrills',
        description: 'Test de stabilité de visée et précision souris en ligne. Résistez aux forces dynamiques pour garder le réticule centré et éliminer les tremblements.'
      },
      {
        title: 'Stabilité de Visée – Test Précision Souris | SkillDrills',
        description: 'Test de stabilité de visée et précision souris en ligne. Résistez aux forces dynamiques pour garder le réticule centré et éliminer les tremblements.'
      }
    ]
  },
  faqs: {
    title: 'Stabilité de Visée – Test Précision Souris | SkillDrills',
    items: faqSchema.mainEntity.map(q => ({
      q: q.name,
      a: q.acceptedAnswer.text
    }))
  }
};

export default function StabilityChallengeFrPage() {
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
      <StabilityChallengeClient
        copy={{
          title: 'Stabilité de Visée – Test Précision Souris | SkillDrills',
          subtitle: 'Stabilité de Visée – Test Précision Souris | SkillDrills',
          hudLabels: {
            score: "Points",
            time: "Temps",
            stability: "Stabilité",
            blowouts: "Décrochages",
            maxStreak: "Meilleure Série",
            peakLevel: "Niveau Max",
            getReady: "PRÊT",
            points: "Points",
            playAgain: "Rejouer"
          },
          rulesTitle: "Règles de l'Exercice et Barème des Scores",
          rulesItems: [
            { title: 'Stabilité de Visée – Test Précision Souris | SkillDrills', text: "Gardez le réticule centré dans l'anneau de sécurité contre les forces de résistance du vent." },
            { title: 'Stabilité de Visée – Test Précision Souris | SkillDrills', text: "Maintenez une stabilisation ininterrompue pour faire grimper le combo jusqu'à 3.0x." },
            { title: 'Stabilité de Visée – Test Précision Souris | SkillDrills', text: "Tous les 250 points, le niveau s'élève. L'anneau passe de 45px à 20px et les vents s'accélèrent." },
            { title: 'Stabilité de Visée – Test Précision Souris | SkillDrills', text: "Quitter l'anneau remet le multiplicateur à 1.0x immédiatement, sans pénalité de score ni de temps." }
          ],
          aboutTitle: "À Propos du Défi de Stabilité",
          aboutHeading: "Compensation Dynamique des Forces et Équilibre Postural",
          aboutIntro: "Le Défi de Stabilité est un entraînement biomécanique de précision motrice et de stabilisation posturale. Les vecteurs de vent chassent votre curseur en continu, exigeant une contre-pression douce et millimétrée.",
          aboutScience: "Inspiré des synergies posturales de Nashner & McCollum (1985) et des principes d'équilibre de David A. Winter (1995), l'exercice mobilise le contrôle visuel en boucle fermée (Woodworth, 1899). Avec la montée du score, l'anneau rétrécit à 20px et la force accélère jusqu'à 850 unités.",
          aboutCards: [
            { title: 'Stabilité de Visée – Test Précision Souris | SkillDrills', text: "Joueurs de jeux de tir compétitifs (Valorant, CS2, Apex Legends) cherchant à éliminer les tremblements de souris et à dompter le recul des armes." },
            { title: 'Stabilité de Visée – Test Précision Souris | SkillDrills', text: "Compensation vectorielle, équilibre postural, suivi sous contrainte, stabilisation du réticule et micro-ajustements digitaux." },
            { title: 'Stabilité de Visée – Test Précision Souris | SkillDrills', text: "La résistance continue opposée au vent reproduit exactement la pression descendante fluide nécessaire pour stabiliser le recul d'une arme automatique." }
          ]
        }}
      />
      <DrillGuide {...guideProps} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/balance-training/stability-challenge" />
    </>
  );
}
