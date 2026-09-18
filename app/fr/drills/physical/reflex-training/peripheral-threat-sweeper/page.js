import PeripheralThreatSweeperClient from '@/app/drills/physical/reflex-training/peripheral-threat-sweeper/PeripheralThreatSweeperClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — France & Francophonie (FR / FR-FR)
// Primary Intent: entraîner sa vision périphérique, test de vision périphérique en ligne, élargir son champ visuel exercices
// French Gaming & Athletic Context: Prévention de la vision en tunnel dans les FPS (Valorant, CS2) et extension du champ visuel utile (UFOV)
// High-Demand, Low-Competition Target Keywords:
//   - "entraîner sa vision périphérique" (Core high-demand vision conditioning query)
//   - "test de vision périphérique en ligne" (Visual field testing query)
//   - "élargir son champ visuel exercices" (Visual field expansion exercises)
//   - "éviter la vision en tunnel gaming" (Tunnel vision prevention in gaming)
//   - "test de réflexes périphériques" (Peripheral reaction chronometry)
//   - "test champ visuel utile ufov" (Useful Field of View assessment query)
//   - "exercices de vision périphérique sport" (Athletic vision training)
//   - "attention visuelle couverte test" (Covert visual orienting paradigm)
//   - "entraînement visuel esport" (Esports visual training query)
//   - "rapidité de balayage visuel" (Visual sweeping speed query)
// ============================================================

export const metadata = {
  title: "Vision Périphérique – Test en Ligne | SkillDrills",
  description: "Test de vision périphérique gratuit en ligne. Neutralisez les menaces à 360° du coin des yeux et élargissez votre champ visuel utile (UFOV) au PC.",
  keywords: [
    "entraîner sa vision périphérique",
    "test de vision périphérique en ligne",
    "élargir son champ visuel exercices",
    "éviter la vision en tunnel gaming",
    "test de réflexes périphériques",
    "test champ visuel utile ufov",
    "exercices de vision périphérique sport",
    "attention visuelle couverte test",
    "entraînement visuel esport",
    "rapidité de balayage visuel"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/physical/reflex-training/peripheral-threat-sweeper',
    languages: getAlternateLanguages('/drills/physical/reflex-training/peripheral-threat-sweeper'),
  },
  openGraph: {
    title: "Vision Périphérique – Test en Ligne | SkillDrills",
    description: "Test de vision périphérique gratuit en ligne. Neutralisez les menaces à 360° du coin des yeux et élargissez votre champ visuel utile (UFOV) au PC.",
    url: 'https://skilldrills.online/fr/drills/physical/reflex-training/peripheral-threat-sweeper',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Vision Périphérique – Test en Ligne | SkillDrills",
    description: "Test de vision périphérique gratuit en ligne. Neutralisez les menaces à 360° du coin des yeux et élargissez votre champ visuel utile (UFOV) au PC.",
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
      "name": "Entraînement des Réflexes",
      "item": "https://skilldrills.online/fr/drills/physical/reflex-training"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Vision Périphérique et Balayage Radial",
      "item": "https://skilldrills.online/fr/drills/physical/reflex-training/peripheral-threat-sweeper"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Simulateur de Vision Périphérique et Champ Visuel Utile (UFOV)",
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
  "name": "Entraîneur d'Attention Visuelle Couverte et Balayage Radial 360°",
  "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
  "genre": "Training, Reflex, Vision, Attention"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Peripheral Threat Sweeper 360 Challenge",
  "gamePlatform": "Web Browser",
  "applicationSubCategory": "Esports Cognitive Vision Drill"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Comment cet exercice entraîne-t-il la vision périphérique sans bouger les yeux?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ce module s'appuie sur le paradigme d'orientation de l'attention spatiale couverte de Michael Posner (1980). En maintenant le regard rigoureusement fixé sur le noyau central, le joueur apprend à projeter son attention par le coin de l'œil sur l'ensemble des 360° périphériques, épargnant les 150 à 200 ms nécessaires aux saccades oculaires fovéales."
      }
    },
    {
      "@type": "Question",
      "name": "Quel rôle joue la théorie de l'intégration des traits d'Anne Treisman dans la détection?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "D'après Anne Treisman (1980), les stimuli périphériques à fort contraste (nœuds rouges et orangés en mouvement convergent) stimulent directement des détecteurs de traits pré-attentionnels sur la rétine périphérique. Ils produisent un effet d'émergence instantané (pop-out) qui alerte le cortex pariétal sans balayage oculaire fastidieux."
      }
    },
    {
      "@type": "Question",
      "name": "Comment s'articule le modèle moteur de Woodworth (1899) lors des balayages radiaux?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chaque frappe radiale suit les deux étapes théorisées par Robert S. Woodworth : une propulsion balistique initiale du poignet en boucle ouverte franchissant plus de 85% du trajet, complétée par une micro-décélération visuelle finale en boucle fermée pour neutraliser le nœud avant qu'il ne franchisse le bouclier."
      }
    },
    {
      "@type": "Question",
      "name": "Qu'est-ce que le Champ Visuel Utile (UFOV) et comment ce drill contribue-t-il à son expansion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le Useful Field of View (UFOV), documenté par Karlene Ball et al. (1988), désigne l'emprise spatiale à l'intérieur de laquelle le cerveau capte des données en un éclair sans mouvement de la tête ni des yeux. Accélérer les vecteurs à 520 px/s et resserrer le délai d'apparition à 0,20 s contraint le système visuel à élargir ce périmètre fonctionnel, éradiquant la vision en tunnel."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi est-il crucial de repositionner le curseur au centre après chaque frappe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le recentrage immédiat préserve une équidistance parfaite de 360° vis-à-vis de toute menace ultérieure. Laisser la souris égarée en bordure extérieure double la distance de réaction requise pour intercepter une cible arrivant du côté opposé selon la loi de Fitts, provoquant des brèches fatales."
      }
    },
    {
      "@type": "Question",
      "name": "Que se passe-t-il lorsqu'un vecteur franchit le bouclier et heurte le noyau central?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Si un nœud pénètre le périmètre central (brèche), le multiplicateur de série accumulé retombe instantanément à 1.0x et l'écran émet un flash rouge d'alerte. Préserver l'étanchéité du noyau est indispensable pour maintenir le rythme de score et atteindre les 24 000 points d'élite."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle sensibilité de souris privilégier pour les frappes périphériques à 360 degrés?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Une sensibilité moyenne à modérément élevée (eDPI entre 800 et 1400 dans les FPS compétitifs) est préconisée. Elle autorise des flicks dynamiques dans n'importe quel quadrant sans décoller la souris ni forcer sur l'épaule, sollicitant les mouvements fins du poignet et des doigts."
      }
    },
    {
      "@type": "Question",
      "name": "Comment une fréquence d'affichage élevée (144Hz/240Hz) favorise-t-elle la rétine périphérique?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La rétine périphérique est ultrasensible au mouvement et aux variations de contraste. Les dalles 144Hz et 240Hz rafraîchissent les nœuds filant à 520 px/s avec une précision de 4,1 ms, stimulant les cellules ganglionnaires magnocellulaires bien plus promptement qu'un écran standard à 60Hz."
      }
    },
    {
      "@type": "Question",
      "name": "Combien de séries par jour sont conseillées pour éviter la fatigue visuelle?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Il est suggéré d'accomplir 3 à 5 sessions de 45 secondes par jour, en observant une minute de détente visuelle au loin entre chaque manche (règle des 20-20-20). L'effort attentionnel pariétal étant soutenu, la brièveté des séries garantit une assimilation nerveuse optimale."
      }
    },
    {
      "@type": "Question",
      "name": "Mes données de performance et métriques de balayage sont-elles conservées en toute sécurité?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, sans aucune exception. Le moteur Canvas, la chronométrie haute précision via performance.now() et la détection de collision opèrent intégralement dans votre navigateur. Vos scores sont stockés exclusivement dans le localStorage de votre équipement, sans télémesure externe."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Protocole en 4 Étapes pour le Balayage Périphérique et la Défense Radiale 360°",
  "description": "Méthode scientifique pour élargir le champ visuel utile, développer l'attention couverte et protéger le noyau contre des attaques simultanées.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Fixation Fovéale Centrale et Attention Couverte (Core Eye Fixation)",
      "text": "Fixez fermement le regard sur le noyau central sans scruter les bordures, en ouvrant votre champ perceptif du coin de l'œil (Posner, 1980).",
      "url": "https://skilldrills.online/fr/drills/physical/reflex-training/peripheral-threat-sweeper#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Détection Pré-Attentionnelle Pop-Out de Treisman (Feature Saliency)",
      "text": "Identifiez sans délai les nœuds rouges et orangés en trajectoire convergente sur la rétine périphérique via les cartes de saillance directe.",
      "url": "https://skilldrills.online/fr/drills/physical/reflex-training/peripheral-threat-sweeper#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Flick Balistique Radial de Woodworth (Radial Ballistic Snap)",
      "text": "Propulsez la souris d'une impulsion vive du poignet vers le vecteur et cliquez avant que le nœud ne traverse le bouclier (+0,6s de temps).",
      "url": "https://skilldrills.online/fr/drills/physical/reflex-training/peripheral-threat-sweeper#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Recentrage Systématique et Pérennité du Combo (Recentering)",
      "text": "Ramenez instantanément le curseur au centre après chaque touche pour reconstituer la couverture équidistante à 360° vers les 24 000 points.",
      "url": "https://skilldrills.online/fr/drills/physical/reflex-training/peripheral-threat-sweeper#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('posner1980', 'treisman1980', 'woodworth1899', 'fitts1954', 'woods2015'),
  intro: {
    title: "Fondements Biomécaniques de la Vision Périphérique et du Champ Visuel Utile (UFOV)",
    paragraphs: [
      "Dans l'appareil visuel humain, la fovéa centrale — zone de netteté maximale et de discrimination chromatique — ne couvre que 1 à 2 degrés de l'ensemble du champ visuel. Toute la périphérie environnante perd en pouvoir séparateur statique, mais possède une remarquable concentration de cellules photoréceptrices à bâtonnets, dévolues à la détection ultra-rapide des flux cinétiques, du scintillement et des contrastes. Cet exercice a été spécialement pensé pour conditionner l'attention spatiale couverte (Posner, 1980) : l'aptitude neuronale à déplacer ses ressources d'analyse sur les marges latérales sans bouger les yeux de leur cible centrale.",
      "La cinétique de chaque balayage périphérique s'accorde avec la loi de Fitts (1954) et le modèle de commande motrice en deux temps de Woodworth (1899). Le temps d'action augmente de façon logarithmique selon la distance radiale à franchir et la finesse de la cible. Face à des nœuds plongeant vers le centre, le participant doit amorcer un flick balistique en boucle ouverte parcourant plus de 85% de la distance, puis opérer un micro-freinage optique au moment précis du déclenchement.",
      "Les travaux fondateurs de Karlene Ball et al. (1988) démontrent que sous pression cognitive et fatigue compétitive, le champ de perception visuel fonctionnel peut subir une constriction brutale communément appelée 'vision en tunnel'. Ce programme prévient cette dégradation en débutant à un rythme accessible de 1,4 seconde pour atteindre progressivement 0,20 seconde à des allures de 520 px/s. Ce conditionnement force le cortex pariétal à dilater durablement le Useful Field of View (UFOV), procurant une lucidité spatiale intégrale.",
      "Pour offrir une rigueur chronométrique irréprochable, l'application s'appuie sur l'API performance.now() du navigateur. Sur les écrans de jeu cadencés à 144Hz ou 240Hz, le déchirement visuel des nœuds radiaux filant à 520 px/s disparaît, autorisant une détection sans aucune latence de trame (Woods et al., 2015). Vos statistiques restent rigoureusement conservées sur votre terminal."
    ]
  },
  benchmarks: {
    title: "Grille Officielle d'Évaluation pour la Vision Périphérique et la Défense Radiale",
    headers: ['Palier (Tier)', 'Titre et Qualification', 'Score Ciblé', 'Précision et Vitesse', 'Note', 'Niveau de Perception'],
    rows: [
      ['Tier 1', 'Gardien Suprême du Champ Visuel (Apex Peripheral Guardian)', '24 000+ pts', '90%+ Touches / 450+ px/s', 'Note S', 'Top 1% (UFOV Remarquable)'],
      ['Tier 2', 'Intercepteur Radial de Précision (Precision Radial Sweeper)', '17 000 – 23 999 pts', '82–89% Touches / 350–449 px/s', 'Note A', 'Top 10% (Niveau Compétitif)'],
      ['Tier 3', 'Défenseur de Champ Agile (Skilled Field Defender)', '11 000 – 16 999 pts', '74–81% Touches / 250–349 px/s', 'Note B', 'Top 30% (Perception Robuste)'],
      ['Tier 4', 'Pratiquant Parafovéal en Évolution (Developing Parafoveal Tracker)', '6 000 – 10 999 pts', '65–73% Touches / 160–249 px/s', 'Note C', 'Moyenne (Joueurs Réguliers)'],
      ['Tier 5', 'Débutant Vulnérable au Tunnel (Novice Tunnel Vision Vulnerable)', '< 6 000 pts', '< 65% Touches / < 160 px/s', 'Note D', 'Base (Élargissement UFOV Préconisé)'],
    ],
    note: "Le classement intègre le score global, le nombre de brèches subies au noyau, la vitesse de pointe survécue et la longueur de série ininterrompue.",
  },
  protocols: {
    title: "Protocole en 4 Phases pour le Développement de la Vision Périphérique",
    description: "Méthode systématique pour consolider la fixation fovéale, élargir le champ visuel et enchaîner les réceptions radiales sans délai.",
    items: [
      {
        title: "Protocole 1: Conditionnement d'Attention Couverte de Posner",
        description: "Fixez le noyau central et réprimez l'envie réflexe de suivre les cibles avec les yeux. Éliminez la latence des saccades en projetant votre attention mentale dans les 4 quadrants (Posner 1980)."
      },
      {
        title: "Protocole 2: Reconnaissance Pré-Attentionnelle Pop-Out de Treisman",
        description: "Entraînez la rétine périphérique à traiter les nœuds convergents rouges et orangés comme des indices saillants immédiats sans recherche séquentielle (Treisman & Gelade 1980)."
      },
      {
        title: "Protocole 3: Flick Radial Balistique de Woodworth avec Décélération",
        description: "À la vue de la trajectoire, projetez la souris d'un coup de poignet sec en boucle ouverte, avant d'ajuster du bout des doigts au moment du clic (Woodworth 1899)."
      },
      {
        title: "Protocole 4: Dilatation UFOV sous Haute Densité et Tri des Priorités",
        description: "Dans les paliers avancés à cadence de 0,20 s, estimez la proximité de plusieurs nœuds en parallèle et neutralisez en premier lieu les plus menaçants (Woods et al. 2015)."
      }
    ]
  },
  faqs: {
    title: "Foire Aux Questions (FAQ) sur la Vision Périphérique et la Défense",
    items: faqSchema.mainEntity.map(q => ({
      q: q.name,
      a: q.acceptedAnswer.text
    }))
  }
};

export default function LocalizedPeripheralThreatSweeperPageFr() {
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
      <PeripheralThreatSweeperClient
        copy={{
          title: "Entraîner sa Vision Périphérique & Test de Champ Visuel en Ligne",
          subtitle: "Balayage Radial 360° et Défense de Bouclier • Difficulté Évolutive Continue",
          description: "La vision périphérique correspond à ce que vous percevez sans regarder directement. Les détails s'estompent rapidement depuis le centre du regard, mais l'attention peut être orientée vers la périphérie pendant que les yeux demeurent immobiles, accélérant la réaction motrice (Posner, 1980). Un trait unique comme la couleur se repère en un temps constant indépendamment des distracteurs, tandis que des cibles combinant plusieurs critères imposent une recherche active (Treisman & Gelade, 1980) — ce qui rend certaines menaces aisées à cueillir en bordure et d'autres plus exigeantes.",
          hudLabels: {
            score: "Score",
            time: "Temps",
            bestScore: "Meilleur Score",
            bestCombo: "Meilleur Combo",
            getReady: "PRÉPAREZ-VOUS",
            accuracy: "Précision",
            sweeps: "Balayages",
            breaches: "Brèches",
            peakLevel: "Niveau Max"
          },
          resultLabels: {
            accuracy: "Précision",
            sweeps: "Balayages",
            breaches: "Brèches",
            peakLevel: "Niveau Max"
          },
          rulesTitle: "Règles du Drill et Système de Points",
          rulesItems: [
            { title: "Défense du Noyau et Points", text: "Cliquez sur les nœuds rouges et orangés convergents avant qu'ils ne touchent le noyau central. Chaque neutralisation rapporte 100 points de base (pondérés par le niveau et le combo) et +0,6s de temps." },
            { title: "Sanction en Cas de Brèche", text: "Si un nœud pénètre le noyau central, une brèche (breach) est décomptée : la série de combo retombe à 1.0x et l'écran émet un flash rouge d'alerte." },
            { title: "Accélération Évolutive", text: "À mesure que les points augmentent, l'intervalle de spawn se réduit de 1,4s à 0,20s et la vitesse des vecteurs grimpe de 160 px/s à 520 px/s." },
            { title: "Recentrage Tactique", text: "Ramenez le curseur sur le noyau central après chaque frappe pour conserver une couverture équidistante à 360° vers tous les quadrants." }
          ],
          aboutTitle: "À Propos de la Vision Périphérique et de l'Attention Couverte",
          aboutSections: [
            {
              title: "Orientation Attentionnelle Couverte et Balayage Périphérique",
              subtitle: "Guidage spatial de Posner sans déviation de la fixation fovéale",
              content: "L'interception des menaces périphériques entraîne l'attention spatiale couverte (Posner, 1980). Au lieu de promener son regard, le joueur conserve son point d'ancrage central tout en projetant son attention sur l'ensemble des 360° extérieurs."
            },
            {
              title: "Intégration Pré-Attentionnelle et Cartes de Saillance",
              subtitle: "Exploration visuelle parallèle de Treisman à travers les angles radiaux",
              content: "L'émergence de nouveaux vecteurs alerte des détecteurs pré-attentionnels de mouvement et de couleur sur la rétine périphérique (Treisman & Gelade, 1980). Les nœuds contrastés créent l'effet pop-out, guidant le cerveau vers la frappe."
            },
            {
              title: "Flick Balistique et Sauvegarde du Noyau",
              subtitle: "Mouvement rapide de Woodworth complété par un freinage millimétré",
              content: "Les balayages nécessitent le contrôle en deux temps de Woodworth (1899) : une détente balistique initiale du poignet couvrant plus de 85% de la trajectoire, relayée par des micro-corrections visuelles avant le clic."
            },
            {
              title: "Champ Visuel Utile et Traitement Multi-Vectoriel",
              subtitle: "Élargissement de la capacité cognitive sous haute fréquence d'apparition",
              content: "En compressant les délais de spawn et en accélérant les cibles à 520 px/s, le module développe le Useful Field of View (UFOV), habituant le système nerveux à parer simultanément des attaques multiples."
            }
          ]
        }}
      />
      <DrillGuide {...guideProps} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/reflex-training/peripheral-threat-sweeper" />
    </>
  );
}
