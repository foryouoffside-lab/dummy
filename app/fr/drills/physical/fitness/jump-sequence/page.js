import JumpSequenceClient from '@/app/drills/physical/fitness/jump-sequence/JumpSequenceClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// RECHERCHE DE MOTS-CLÉS NATIFS (SERP FRANCE / FR-FR)
// Requêtes à forte intention sportive et détente verticale :
// - "exercices pour sauter plus haut" (Requête dominante détente et puissance)
// - "détente verticale entraînement volley basket" (Préparation physique clé)
// - "pliométrie pour la détente verticale" (Cycle étirement-détente / puissance musculaire)
// - "comment augmenter sa détente verticale" (Recherche massive athlètes / gymnastes)
// - "test de détente verticale en ligne" (Évaluation d'impulsion et timing de saut)
// - "visée aérienne et trajectoire parabolique" (Transposition eSport FPS / tracking vertical)
// - "interception de cible en mouvement dans les airs" (Calcul de collision cinématique)
// - "temps de suspension en l'air" (Contrôle du hang time et rebond)
// ============================================================

export const metadata = {
  title: 'Détente Verticale – Sauter Plus Haut | SkillDrills',
  description: 'Exercices pour sauter plus haut en ligne gratuits. Interceptez des cibles en apesanteur pour développer votre détente verticale et vos réflexes au PC.',
  keywords: [
    "exercices pour sauter plus haut",
    "detente verticale entrainement volley basket",
    "pliometrie pour la detente verticale",
    "comment augmenter sa detente verticale",
    "test de detente verticale en ligne",
    "visee aerienne et trajectoire parabolique",
    "interception de cible en mouvement dans les airs",
    "temps de suspension en l'air",
    "puissance des jambes exercices",
    "detente seche entrainement"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/physical/fitness/jump-sequence',
    languages: getAlternateLanguages('/drills/physical/fitness/jump-sequence'),
  },
  openGraph: {
    title: "Exercices pour Sauter Plus Haut & Détente Verticale en Ligne | SkillDrills",
    description: "Entraînement en ligne gratuit de détente verticale et calcul de trajectoire aérienne. Maîtrisez le dosage d'impulsion pliométrique, la sustentation et l'interception parabolique de cibles jusqu'à 900 px/s.",
    url: 'https://skilldrills.online/fr/drills/physical/fitness/jump-sequence',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Exercices pour Sauter Plus Haut & Détente Verticale en Ligne | SkillDrills",
    description: "Entraînement en ligne gratuit de détente verticale et calcul de trajectoire aérienne. Maîtrisez le dosage d'impulsion pliométrique, la sustentation et l'interception parabolique de cibles jusqu'à 900 px/s.",
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
      "name": "Détente Verticale & Entraînement Pliométrique",
      "item": "https://skilldrills.online/fr/drills/physical/fitness/jump-sequence"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Entraîneur de Détente Verticale et Trajectoire Parabolique",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Simulateur psychomoteur pour le calcul de l'impulsion verticale, le guidage en sustentation et l'interception dynamique de cibles en cloche.",
  "url": "https://skilldrills.online/fr/drills/physical/fitness/jump-sequence",
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
  "name": "Entraîneur d'Impulsion et Timing Aérien",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Navigateur moderne compatible HTML5 Canvas et Pointer Lock API",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/fr/drills/physical/fitness/jump-sequence",
  "inLanguage": "fr-FR",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Jeu de Saut et Interception Aérienne (Jump Sequence)",
  "url": "https://skilldrills.online/fr/drills/physical/fitness/jump-sequence",
  "description": "Exercice intensif de calcul de trajectoires paraboliques et collision aérienne pour sports de détente et visée verticale sur FPS.",
  "genre": [
    "Fitness Drill",
    "Aerial Timing",
    "Trajectory Interception",
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
      "name": "Que mesure exactement ce test concernant la détente verticale et le calcul motriciel ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L'exercice reproduit la mécanique cognitive du saut vertical : la quantification de l'impulsion motrice de départ, le pilotage en phase de sustentation et l'interception au point culminant. Il mesure la précision prédictive du cerveau pour faire coïncider une cloche gravitationnelle avec des cibles mouvantes transversales."
      }
    },
    {
      "@type": "Question",
      "name": "De quelle manière le Cycle Étirement-Détente (SSC) de Komi intervient-il dans la phase d'impulsion ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "D'après Paavo Komi (2000), la restitution d'énergie élastique musculo-tendineuse atteint son maximum lorsque la phase excentrique d'amortissement s'enchaîne instantanément avec la poussée concentrique. Maintenir le clic enfoncé pour charger simule ce dosage d'impulsion proportionnelle à la hauteur requise."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le rôle des modèles internes cérébelleux théorisés par Kawato pendant le vol ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mitsuo Kawato (1999) a établi qu'en sustentation, le cervelet projette une simulation prospective de la pesanteur et de l'inertie. Le retour visuel accusant un délai incompressible (100 à 150ms), le déplacement de la main doit être guidé par une anticipation prédictive continue du point de rencontre."
      }
    },
    {
      "@type": "Question",
      "name": "Comment la théorie optique Tau (τ) de Lee s'applique-t-elle à l'impact sur la cible ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "David Lee (1976) a démontré que le système visuel déduit le temps restant avant le contact (TTC) à partir de la vitesse d'expansion de l'image sur la rétine. Dans l'exercice, cela permet de corriger la trajectoire par un micro-ajustement digital dans les 100 dernières millisecondes."
      }
    },
    {
      "@type": "Question",
      "name": "Comment évoluent la vitesse des cibles et la dimension des sphères au fil des 15 niveaux ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le niveau s'élève tous les 250 points. La vitesse de défilement horizontal des cibles passe de 120 px/s au palier initial jusqu'à 900 px/s aux paliers 12 à 15, tandis que le rayon de la sphère de contact rétrécit de 35 pixels à seulement 12 pixels."
      }
    },
    {
      "@type": "Question",
      "name": "Rater une cible ou toucher le sol sans impact fait-il perdre des points ou du temps ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aucun point acquis n'est soustrait et le compte à rebours de 45 secondes n'est pas diminué. En revanche, atterrir sans avoir percuté la sphère réinitialise immédiatement le multiplicateur de série à 1.0x, récompensant la régularité du tempo."
      }
    },
    {
      "@type": "Question",
      "name": "En quoi ce drill aide-t-il la précision sur des jeux aériens comme Apex Legends ou Overwatch 2 ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dans les FPS proposant des propulseurs ou des sauts verticaux fréquents, les adversaires décrivent des trajectoires paraboliques rapides. L'entraînement apprend à anticiper la courbure de la chute plutôt que de viser la position actuelle du joueur en l'air."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi charger l'impulsion à 100 % sur chaque saut constitue-t-il une erreur majeure ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Une charge maximale systématique propulse le curseur trop haut, obligeant à attendre la redescente pendant que la cible a déjà traversé l'écran. L'art de la maîtrise consiste à doser l'impulsion pour que le sommet de la parabole coïncide exactement avec l'altitude de l'objet."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la stratégie indispensable pour dépasser 17 000 points et décrocher le rang Apex ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Il faut réarmer l'impulsion suivante à la milliseconde précise de l'atterrissage (rebond cadencé), en maintenant le multiplicateur 3.0x de manière ininterrompue durant les 45 secondes et en assurant plus de 92 % de précision sur les niveaux les plus véloces."
      }
    },
    {
      "@type": "Question",
      "name": "Ce test requiert-il une application externe ou la collecte de données privées ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non, l'exercice s'exécute entièrement dans votre navigateur grâce à HTML5 Canvas et performance.now(). Aucune donnée nominative n'est envoyée vers l'extérieur ; vos scores et statistiques sont conservés exclusivement dans la mémoire locale de votre navigateur (LocalStorage)."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Protocole d'Exécution de Détente Verticale et Interception Parabolique",
  "description": "Guide en 4 étapes pour doser l'impulsion, piloter en sustentation et intercepter des cibles aériennes.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Positionnement sur la Ligne de Base",
      "text": "Placez le curseur sur la zone inférieure centrale marquant le point de départ de l'impulsion verticale.",
      "url": "https://skilldrills.online/fr/drills/physical/fitness/jump-sequence#etape-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Dosage Élastique Proportionnel de la Poussée",
      "text": "Maintenez le clic enfoncé pour ajuster la force à la hauteur de la cible en approche et relâchez pour bondir.",
      "url": "https://skilldrills.online/fr/drills/physical/fitness/jump-sequence#etape-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Manœuvre Aérienne et Interception Optique",
      "text": "Guidez le curseur latéralement en phase de vol pour frapper la sphère au sommet de la parabole avant la chute.",
      "url": "https://skilldrills.online/fr/drills/physical/fitness/jump-sequence#etape-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Rebond Immédiat à l'Atterrissage et Combo 3.0x",
      "text": "Réamorcez le saut suivant dès le contact avec le sol pour enchaîner la cadence et maximiser votre score sur 45 secondes.",
      "url": "https://skilldrills.online/fr/drills/physical/fitness/jump-sequence#etape-4"
    }
  ]
};

const jumpGuide = {
  heading: "Fondements Biomécaniques : Détente Verticale et Interception en Phase Aérienne",
  subtitle: "Cycle étirement-détente de Komi, modèle prospectif de Kawato et théorie optique Tau de Lee",
  intro: [
    "Le drill de séquence de saut (Jump Sequence Training) adapte les lois cinématiques de la détente verticale et de l'interception dans les airs aux exigences de la motricité réflexe. Dans des disciplines comme le volley-ball, le basket-ball ou le handball, l'efficacité d'un smash, d'un contre ou d'un rebond repose sur la coïncidence exacte entre la détente corporelle et la trajectoire du ballon ; ce simulateur isole et entraîne spécifiquement cette faculté d'anticipation gravitationnelle.",
    "Le grand physiologiste Paavo V. Komi (2000), pionnier du Cycle Étirement-Détente (Stretch-Shortening Cycle, SSC), a démontré que la mobilisation de l'énergie élastique réduit le coût énergétique et accroît la vitesse ascensionnelle. Le mécanisme de propulsion par maintien de pression de ce test reproduit cette phase de charge neuromusculaire, obligeant l'utilisateur à adapter le volume d'impulsion à l'altitude et à la vitesse du projectile.",
    "Une fois le décollage engagé, la régulation du geste relève des modèles internes cérébelleux décrits par Mitsuo Kawato (1999). Privé de points d'appui au sol, le cerveau doit projeter l'intersection spatio-temporelle de la cloche de vol. Ce calcul est constamment synchronisé par la variable optique Tau (τ) de David N. Lee (1976), qui dérive le temps restant avant collision de la vitesse d'expansion de l'objet sur la rétine, permettant des corrections millimétriques à des vitesses allant jusqu'à 900 px/s.",
    "Métrologie et fréquence d'échantillonnage : Cette épreuve est mesurée par performance.now() à une résolution inférieure à la milliseconde. La latence globale observée dépend de la fréquence de rafraîchissement de votre moniteur (60Hz = 16,6ms ; 144Hz = 6,9ms ; 240Hz = 4,1ms) et du taux d'interrogation de la souris. Les fluctuations sous 5ms correspondent aux marges physiques usuelles."
  ],
  benchmarks: {
    title: "Grille d'Évaluation et Niveaux de Détente et Interception (5 Paliers)",
    headers: ["Palier / Rang", "Titre de Maîtrise", "Score Requis", "Vitesse Cible / Précision", "Mention Globale", "Profil Neuromoteur en Sustentation"],
    rows: [
      ["Tier 1: Maître de Trajectoire Apex", "Apex Trajectory Master", "17 000+ points", "800 – 900 px/s / ≥ 92 %", "Grade S", "Anticipation gravitationnelle d'élite (top 0,1 %) ; interception parfaite sur cibles ultra-rapides et maîtrise du cycle SSC (Komi 2000 ; Kawato 1999)"],
      ["Tier 2: Attaquant Aérien de Précision", "Precision Aerial Striker", "12 000 – 16 999 pts", "650 – 799 px/s / 84 – 91 %", "Grade A", "Excellent pilotage en vol par modèle cérébelleux ; régularité d'interception sur des sphères étroites de 15-18px"],
      ["Tier 3: Intercepteur de Saut Confirmé", "Skilled Jump Interceptor", "7 500 – 11 999 pts", "500 – 649 px/s / 75 – 83 %", "Grade B", "Niveau compétitif solide ; bon dosage de l'impulsion et transition rapide dès le retour au sol"],
      ["Tier 4: Navigateur Parabolique en Progrès", "Developing Parabola Navigator", "4 000 – 7 499 pts", "350 – 499 px/s / 65 – 74 %", "Grade C", "Moyenne fonctionnelle standard ; ruptures de série dues à des sauts trop amples sur des cibles basses"],
      ["Tier 5: Apprenti Sauteur Débutant", "Novice Liftoff Trainee", "< 4 000 points", "< 350 px/s / < 65 %", "Grade D", "Difficulté à moduler la force d'impulsion ; tendance à charger la barre au maximum et à rater la phase de descente"]
    ],
    note: "Paliers établis à partir des recherches sur le cycle étirement-détente (Komi 2000), les modèles prospectifs cérébelleux (Kawato 1999) et l'optique Tau (Lee 1976)."
  },
  techniques: {
    title: "Protocoles Pratiques pour Optimiser la Détente et l'Interception en Vol",
    items: [
      {
        name: "Modulation de l'Impulsion Élastique de Komi (Proportional Impulse Charging)",
        desc: "Évitez de charger systématiquement la jauge au maximum. Analysez la hauteur de la cible et relâchez le clic dès que l'énergie correspond au sommet de parabole idéal pour intercepter la sphère.",
        tips: "Considérez cette phase comme la flexion préparatoire des jambes avant un contre : vive, mesurée et proportionnée."
      },
      {
        name: "Pilotage Parabolique via Modèle Cérébelleux de Kawato (Feedforward Air Steering)",
        desc: "Une fois décollé, ne poursuivez pas la cible par l'arrière. Orientez souplement le curseur vers le point futur où la trajectoire descendante de la cloche croisera frontalement la course du projectile.",
        tips: "Anticipez le point de rencontre plutôt que de suivre la position actuelle de la cible."
      },
      {
        name: "Micro-Ajustement Terminal par Optique Tau de Lee (Final 100ms Optical Tau Lock)",
        desc: "Dans les tout derniers instants avant l'impact, portez toute votre attention sur la vitesse d'expansion visuelle de la sphère pour effectuer une correction millimétrique de la main.",
        tips: "Visez le cœur géométrique de la sphère pour éviter les frappes effleurant la bordure."
      },
      {
        name: "Cadence de Rebond Immédiat au Contact du Sol (Rebound Cadence)",
        desc: "Ne restez pas inerte après l'atterrissage. Dès que le pointeur touche le sol, lancez instantanément la charge du saut suivant vers la nouvelle cible.",
        tips: "L'enchaînement sans temps mort est indispensable pour préserver le combo 3.0x tout au long des 45 secondes."
      }
    ]
  },
  steps: [
    "Adoptez une posture équilibrée avec le curseur placé sur la base centrale inférieure.",
    "Évaluez la hauteur et la vitesse du projectile entrant et chargez l'impulsion requise.",
    "Guidez souplement la trajectoire en l'air pour percuter le centre de la sphère en cloche.",
    "Enchaînez l'atterrissage avec le saut suivant sans marquer d'arrêt pour garder le combo 3.0x."
  ],
  audience: "Athlètes (volley-ball, basket-ball, football, athlétisme) cherchant à perfectionner le timing de détente et le sens de la trajectoire, ainsi que joueurs de FPS pour le tir en suspension et le tracking aérien.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('komi2000', 'kawato1999', 'lee1976', 'woodworth1899', 'fitts1954', 'woods2015')
};

export default function JumpSequencePageFr() {
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
      <JumpSequenceClient
        copy={{
          title: "Détente Verticale & Entraînement Pliométrique",
          subtitle: "Calcul d'Impulsion & Interception en Sustentation • 15 Niveaux",
          hudLabels: {
            score: "Score",
            timeLeft: "Temps Restant",
            bestScore: "Meilleur Score",
            bestCombo: "Meilleur Combo"
          },
          rulesTitle: "Règles du Test de Saut et Barème de Points",
          rules: [
            { title: "Charge Proportionnelle de Poussée", text: "Maintenez le clic enfoncé pour accumuler l'énergie élastique et relâchez pour décoller en arc parabolique." },
            { title: "Interception au Sommet de l'Arc", text: "Manœuvrez latéralement en vol pour percuter la sphère mouvante avant la descente au sol." },
            { title: "Accélération Continue", text: "Tous les 250 points, les cibles accélèrent de 120 à 900 px/s et leur rayon diminue." },
            { title: "Atterrissage Manqué et Reset de Combo", text: "Retomber au sol sans toucher la cible réinitialise le multiplicateur à 1.0x sans déduire de points." }
          ],
          aboutTitle: "À Propos du Saut et de la Trajectoire Parabolique",
          aboutHeading: "Biomécanique de la Détente et Interception en Cloche Gravitationnelle",
          aboutText: "S'appuyant sur les travaux sur le Cycle Étirement-Détente de Paavo Komi (2000), les modèles prospectifs de Mitsuo Kawato (1999) et la théorie optique Tau de David Lee (1976), ce simulateur développe le calcul gravitationnel intuitif indispensable aux sports de détente (volley, basket) et aux tirs de précision contre des cibles aériennes rapides.",
          aboutCards: [
            {
              title: "Public Visé",
              desc: "Athlètes cherchant à peaufiner leur timing de détente et d'interception, et joueurs de FPS entraînant leur visée contre des cibles en vol parabolique."
            },
            {
              title: "Aptitudes Développées",
              desc: "Dosage élastique de l'impulsion motrice, sustentation gravitationnelle, estimation du temps restant (TTC) et rebond sans latence."
            },
            {
              title: "Progression Véloce",
              desc: "Les cibles accélèrent de 120 à 900 px/s avec des hauteurs et amplitudes variées, exigeant une recalibration motrice instantanée."
            }
          ]
        }}
      />
      <DrillGuide guide={jumpGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="physical"
          currentHref="/drills/physical/fitness/jump-sequence"
          locale="fr"
        />
      </div>
    </>
  );
}
