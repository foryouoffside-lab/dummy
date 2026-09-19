import AutoPursuitClient from '@/app/drills/visual/tracking-accuracy/pursuit-tracker/AutoPursuitClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test Smooth Pursuit: Poursuite Oculaire | SkillDrills",
  description: "Test de poursuite oculaire continue (Smooth Pursuit) gratuit en ligne. Évaluez la stabilité du regard, le glissement rétinien et la motilité oculaire.",
  keywords: [
    "test de poursuite oculaire continue",
    "test smooth pursuit en ligne",
    "entraînement oculomoteur",
    "mouvements oculaires de poursuite",
    "motilité oculaire test",
    "suppression des saccades de rattrapage",
    "stabilité du regard fovéal",
    "glissement rétinien vision",
    "exercices de vision sportive",
    "précision de suivi de cible",
    "neuro-ophtalmologie regard",
    "aim tracking entraînement visuel"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/visual/tracking-accuracy/pursuit-tracker",
    languages: getAlternateLanguages('/drills/visual/tracking-accuracy/pursuit-tracker'),
  },
  openGraph: {
    title: "Test Smooth Pursuit: Poursuite Oculaire | SkillDrills",
    description: "Test de poursuite oculaire continue (Smooth Pursuit) gratuit en ligne. Évaluez la stabilité du regard, le glissement rétinien et la motilité oculaire.",
    url: "https://skilldrills.online/fr/drills/visual/tracking-accuracy/pursuit-tracker",
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US", "de_DE", "ko_KR", "ja_JP", "pt_PT", "es_ES"],
    images: [{ url: "https://skilldrills.online/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Test Smooth Pursuit: Poursuite Oculaire | SkillDrills",
    description: "Test de poursuite oculaire continue (Smooth Pursuit) gratuit en ligne. Évaluez la stabilité du regard, le glissement rétinien et la motilité oculaire.",
    images: ["https://skilldrills.online/og-default.svg"],
  },
};

const guideData = {
  eyebrow: "Neuro-ophtalmologie & Contrôle Oculomoteur",
  heading: "Smooth Pursuit Eye-Tracking – Poursuite Oculaire & Précision Visuo-Motrice",
  intro: [
    "Le système des mouvements de poursuite oculaire continue (Smooth Pursuit Eye Movements - SPEM) assure l'orientation continue et fluide de la fovéa centrale sur des objets en déplacement dynamique dans l'espace. Physiologiquement, ce mécanisme en boucle fermée se distingue fondamentalement des saccades balistiques, qui répondent à une erreur de positionnement statique et sont générées par des circuits prémoteurs distincts du tronc cérébral (Rashbass, 1961 ; Krauzlis, 2004).",
    "Le principal signal neurophysiologique qui déclenche et soutient la poursuite continue est le glissement rétinien (retinal slip), c'est-à-dire la vitesse de dérive de l'image de la cible sur la rétine (Leigh & Zee, 2015). Les signaux de mouvement issus de l'aire visuelle primaire (V1) sont décodés en vecteurs de direction et de vélocité au sein des aires corticales MT/V5 et MST. Via les champs oculaires frontaux (FEF) et les noyaux du pont, ces informations convergent vers le cervelet (flocculus et vermis dorsal), transmettant des commandes ultra-précises aux noyaux oculomoteurs (Krauzlis, 2004 ; Lisberger, 2010).",
    "Les contraintes biomécaniques de la poursuite oculaire se manifestent dès que la vitesse angulaire de la cible franchit le seuil de 30 à 40 degrés par seconde ou amorce des trajectoires imprévisibles (Bahill, Iandolo & Troost, 1980). Dans ces conditions limites, le système oculomoteur perd son gain unitaire (rapport de vitesse œil/cible égal à 1,0). Dès que l'erreur de position rétinienne dépasse un seuil critique, le système nerveux central déclenche des saccades de rattrapage (catch-up saccades) — de brusques sauts balistiques de 20 à 40 millisecondes destinés à recoller à la cible (Leigh & Zee, 2015). Les compétiteurs de haut niveau minimisent l'amplitude de ces saccades correctives grâce à une anticipation fine des accélérations.",
    "En raison du délai physiologique incompressible de 100 à 130 millisecondes entre la stimulation sensorielle et l'exécution motrice, un suivi purement réactif conduit inévitablement au dépassement d'amplitude (overshoot) et au décrochage (Woods et al., 2015). Pour surmonter ce retard, le cortex moteur et le cervelet mobilisent des modèles prédictifs internes (Internal Predictive Models), anticipant la trajectoire future de l'objet et ses rebonds aux bordures (Land & McLeod, 2000 ; Barnes, 2008).",
    "Ce banc de test web s'appuie sur la précision sub-milliseconde de l'API performance.now() et sur un moteur de rendu subpixel pour quantifier en temps réel le temps passé sur la cible (Time on Target), la dérive moyenne et la série maximale de maintien continu sur 45 secondes. Un entraînement régulier de poursuite oculaire optimise la synergie motrice main-œil, offrant des gains directs pour le tracking aim dans les fast-FPS, l'interception de trajectoires dans les sports de balle et le confort visuel sur écran."
  ],
  benchmarks: {
    title: "Grille d'Évaluation Standardisée en Poursuite Oculaire Smooth Pursuit",
    headers: ["Niveau / Rang", "Temps sur la Cible (Time-on-Target)", "Précision Moyenne de Poursuite", "Suppression des Saccades", "Palier Neurophysiologique"],
    rows: [
      ["Palier 1 : Élite Mondiale (Top 1%)", "≥ 88%", "≥ 92%", "≥ 95% Suppression", "Poursuite fluide continue sans faille, glissement rétinien quasi nul. Modèle interne cérébelleux parfaitement calibré (Lisberger, 2010)."],
      ["Palier 2 : Athlète Confirmé (Top 5%)", "76 – 87%", "84 – 91%", "88 – 94% Suppression", "Excellente motilité oculaire et synchronisation de phase immédiate lors des inversions de cap."],
      ["Palier 3 : Standard Solide (Top 25%)", "62 – 75%", "72 – 83%", "78 – 87% Suppression", "Suivi régulier sur trajectoires lentes, légères saccades correctives lors des pointes d'accélération."],
      ["Palier 4 : Niveau de Base (Top 50%)", "48 – 61%", "60 – 71%", "65 – 77% Suppression", "Décrochages récurrents du curseur et recours systématique à des saccades de rattrapage par paliers."],
      ["Palier 5 : Débutant (Baseline)", "< 48%", "< 60%", "< 65% Suppression", "Forte latence visuelle, gestes manuels heurtés et dépassements permanents (overshoot)."]
    ],
    note: "Établi d'après la littérature neuro-ophtalmologique et biomécanique sportive (Rashbass 1961 ; Krauzlis 2004 ; Leigh & Zee 2015 ; Lisberger 2010)."
  },
  techniques: {
    title: "Principes Moteurs pour Perfectionner la Poursuite Oculaire",
    items: [
      {
        name: "Ancrage Fovéal sur le Bord Avant",
        desc: "Focalisez votre regard sur le bord d'attaque de la sphère en mouvement, jamais sur le curseur. Laissez la proprioception de votre bras aligner le curseur en vision motrice périphérique pendant que la fovéa analyse la vitesse.",
        tips: "Ne quittez pas la sphère des yeux ; le guidage manuel inconscient est plus rapide que la vérification fovéale du curseur."
      },
      {
        name: "Guidage par l'Avant-Bras et Pivot du Coude",
        desc: "Gardez le poignet droit et faites glisser l'avant-bras sur le bureau pour tracer de larges courbes fluides. Cela évite les spasmes des micromuscles de la main générateurs de micro-saccades.",
        tips: "Ajustez la hauteur de votre siège pour que le coude repose à angle droit avec le plan de travail."
      },
      {
        name: "Absorption Inertielle des Changements de Cap",
        desc: "Lorsqu'une cible change brusquement d'orientation, n'appliquez pas d'à-coup brutal. Décélérez de façon progressive en exploitant la friction du tapis.",
        tips: "Un tapis de souris de contrôle intermédiaire stabilise les décélérations d'urgence."
      },
      {
        name: "Respiration Diaphragmatique Fluide",
        desc: "Bloquer sa respiration en phase de haute intensité contracte les épaules et altère la précision motrice fine.",
        tips: "Inspirez calmement par le nez et expirez de façon régulière pendant toute l'épreuve de 45 secondes."
      }
    ]
  },
  steps: [
    "Placez votre curseur au centre de la sphère pour enclencher le compte à rebours de 3 secondes.",
    "Suivez la sphère verte en mouvement en maintenant le curseur centré sur elle durant les 45 secondes.",
    "Restez en contact continu pour faire monter la jauge de multiplicateur et marquer un bonus de série maximal.",
    "Au coup de sifflet final, analysez votre pourcentage de Time-on-Target, votre précision moyenne et votre taux de suppression des saccades.",
    "Répétez 3 à 5 séries par jour pour stimuler la plasticité cérébrale oculomotrice."
  ],
  audience: "Indispensable pour les compétiteurs de shooters dynamiques (Overwatch, Apex Legends, CS2), les pongistes, tennismen, pilotes et toute personne souhaitant consolider sa stabilité d'attention visuelle en mouvement.",
  faqs: [
    {
        "q": "Qu'est-ce que le mouvement de poursuite oculaire continue (Smooth Pursuit) ?",
        "a": "Le système de poursuite oculaire continue (SPEM - Smooth Pursuit Eye Movements) est la fonction oculomotrice volontaire permettant d'orienter en continu l'axe visuel afin de stabiliser l'image d'un objet en mouvement sur la fovéa centrale. Il se distingue physiologiquement des saccades oculaires, qui correspondent à des bonds brusques entre points d'intérêt statiques (Rashbass, 1961)."
    },
    {
        "q": "Pourquoi le regard saccade-t-il ou saute-t-il par paliers lors des accélérations de cible ?",
        "a": "Lorsque la vitesse ou l'accélération de la cible dépasse la capacité de gain du circuit cervelet-tronc cérébral, l'image glisse hors de la fovéa (retinal slip). Le système visuel réagit en déclenchant des saccades de rattrapage (catch-up saccades), provoquant l'effet visuel de ressauts ou de décrochages."
    },
    {
        "q": "En quoi ce test est-il déterminant pour les jeux de tir (FPS) comme Apex Legends ou Overwatch ?",
        "a": "Dans les jeux exigeant un suivi continu de cibles esquivant rapidement (strafe), maintenir le réticule calé sur la cible sans saccades parasites réduit fortement le temps d'élimination (TTK). Le smooth pursuit assure la fluidité motrice indispensable aux armes automatiques."
    },
    {
        "q": "Quels réglages de sensibilité et de DPI de souris sont les plus adaptés ?",
        "a": "Une sensibilité moyenne à modérément basse (800 DPI avec une sensibilité en jeu équivalente à 28–45 cm/360°) offre une stabilité supérieure. Une sensibilité trop élevée sollicite excessivement les micromuscles des doigts, provoquant des tremblements et des décrochages involontaires."
    },
    {
        "q": "L'entraînement à la poursuite oculaire améliore-t-il l'attention et le confort visuel au quotidien ?",
        "a": "Oui. Renforcer la motilité oculaire et la stabilité fovéale soulage la fatigue visuelle liée aux écrans (asthénopie), améliore la fluidité de lecture et consolide l'attention soutenue lors de tâches dynamiques intenses."
    },
    {
        "q": "Les sports réels tels que le tennis, le tennis de table ou le sport automobile en bénéficient-ils ?",
        "a": "Absolument. Pilotes de course et joueurs de sports de raquette s'appuient sur un smooth pursuit performant pour estimer les trajectoires balistiques à grande vitesse et négocier les courbes sans rupture de fixation (Land & McLeod, 2000)."
    },
    {
        "q": "Faut-il guider la souris plutôt avec le poignet ou avec l'avant-bras ?",
        "a": "Pour les amples trajectoires courbes, le mouvement doit être initié par l'avant-bras avec le coude pour pivot. Le poignet et les doigts n'interviennent que pour les microajustements à l'intérieur de la cible, prévenant ainsi les tendinopathies."
    },
    {
        "q": "Quelle est la meilleure approche face aux changements imprévisibles de direction ?",
        "a": "N'essayez pas d'anticiper le rebond à l'aveugle, car une mauvaise prédiction entraîne un décrochage sévère (overshoot). Maintenez votre attention sur le bord avant de la cible et utilisez la friction maîtrisée du tapis pour freiner sans à-coup."
    },
    {
        "q": "Quelle routine quotidienne adopter sans fatiguer les yeux ?",
        "a": "Il est conseillé de réaliser 3 à 5 sessions de 45 secondes par jour, entrecoupées de 30 secondes de pause. Clignez régulièrement des yeux et observez un repère lointain à au moins 6 mètres pendant 10 secondes après chaque série."
    },
    {
        "q": "Mes données de visée et mes coordonnées de souris sont-elles transmises à des serveurs tiers ?",
        "a": "Non. Toutes les coordonnées vectorielles, l'interpolation canvas et l'évaluation du temps de contact s'exécutent exclusivement en mémoire locale dans votre navigateur via JavaScript client-side. Aucune donnée n'est collectée à distance."
    }
],
  sources: pickSources([
    "rashbass1961smooth",
    "lisberger2010visual",
    "krauzlis2004recurrent",
    "leigh2015neurology",
    "land2000eye"
  ]),
  related: [
    { href: "/fr/drills/visual/tracking-accuracy/moving-target", label: "Poursuite de Cibles Mobiles" },
    { href: "/fr/drills/visual/tracking-accuracy/multiple-targets", label: "Poursuite d'Objets Multiples" },
    { href: "/fr/drills/visual/reaction-speed/go/no-go", label: "Test Go/No-Go" },
    { href: "/fr/drills/visual/reaction-speed/light-reaction", label: "Réaction à la Lumière" },
    { href: "/fr/drills/fps/strafe-tracking", label: "Strafe Tracking FPS" },
    { href: "/fr/drills/fps/pro-smooth-pursuit", label: "Pro Smooth Pursuit FPS" }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://skilldrills.online/fr" },
    { "@type": "ListItem", "position": 2, "name": "Entraînements", "item": "https://skilldrills.online/fr/drills" },
    { "@type": "ListItem", "position": 3, "name": "Perception Visuelle", "item": "https://skilldrills.online/fr/drills/visual" },
    { "@type": "ListItem", "position": 4, "name": "Précision de Poursuite", "item": "https://skilldrills.online/fr/drills/visual/tracking-accuracy" },
    { "@type": "ListItem", "position": 5, "name": "Poursuite Oculaire Continue", "item": "https://skilldrills.online/fr/drills/visual/tracking-accuracy/pursuit-tracker" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test de Poursuite Oculaire Continue (Smooth Pursuit)",
  "operatingSystem": "Web Browser",
  "applicationCategory": "HealthApplication",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "publisher": { "@type": "Organization", "name": "SkillDrills" }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Test de Poursuite Oculaire Continue (Smooth Pursuit)",
  "url": "https://skilldrills.online/fr/drills/visual/tracking-accuracy/pursuit-tracker",
  "applicationCategory": "SportsApplication",
  "browserRequirements": "Requires JavaScript. Canvas support required.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Entraînement de Poursuite Visuelle Continue Smooth Pursuit",
  "gamePlatform": "Web Browser",
  "genre": ["Vision Sportive", "Entraînement Cognitif", "Contrôle Oculomoteur"],
  "numberOfPlayers": { "@type": "QuantitativeValue", "value": 1 }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment Réaliser le Test de Smooth Pursuit",
  "description": "Protocole étape par étape pour mesurer et perfectionner le suivi visuel continu et le contrôle oculomoteur.",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Étape 1", "text": "Placez votre curseur au centre de la sphère pour enclencher le compte à rebours de 3 secondes." },
    { "@type": "HowToStep", "position": 2, "name": "Étape 2", "text": "Suivez la sphère verte en mouvement en maintenant le curseur centré sur elle durant les 45 secondes." },
    { "@type": "HowToStep", "position": 3, "name": "Étape 3", "text": "Restez en contact continu pour faire monter la jauge de multiplicateur et marquer un bonus de série maximal." },
    { "@type": "HowToStep", "position": 4, "name": "Étape 4", "text": "Au coup de sifflet final, analysez votre pourcentage de Time-on-Target, votre précision moyenne et votre taux de suppression des saccades." },
    { "@type": "HowToStep", "position": 5, "name": "Étape 5", "text": "Répétez 3 à 5 séries par jour pour stimuler la plasticité cérébrale oculomotrice." }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
        "@type": "Question",
        "name": "Qu'est-ce que le mouvement de poursuite oculaire continue (Smooth Pursuit) ?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le système de poursuite oculaire continue (SPEM - Smooth Pursuit Eye Movements) est la fonction oculomotrice volontaire permettant d'orienter en continu l'axe visuel afin de stabiliser l'image d'un objet en mouvement sur la fovéa centrale. Il se distingue physiologiquement des saccades oculaires, qui correspondent à des bonds brusques entre points d'intérêt statiques (Rashbass, 1961)."
        }
    },
    {
        "@type": "Question",
        "name": "Pourquoi le regard saccade-t-il ou saute-t-il par paliers lors des accélérations de cible ?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Lorsque la vitesse ou l'accélération de la cible dépasse la capacité de gain du circuit cervelet-tronc cérébral, l'image glisse hors de la fovéa (retinal slip). Le système visuel réagit en déclenchant des saccades de rattrapage (catch-up saccades), provoquant l'effet visuel de ressauts ou de décrochages."
        }
    },
    {
        "@type": "Question",
        "name": "En quoi ce test est-il déterminant pour les jeux de tir (FPS) comme Apex Legends ou Overwatch ?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Dans les jeux exigeant un suivi continu de cibles esquivant rapidement (strafe), maintenir le réticule calé sur la cible sans saccades parasites réduit fortement le temps d'élimination (TTK). Le smooth pursuit assure la fluidité motrice indispensable aux armes automatiques."
        }
    },
    {
        "@type": "Question",
        "name": "Quels réglages de sensibilité et de DPI de souris sont les plus adaptés ?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Une sensibilité moyenne à modérément basse (800 DPI avec une sensibilité en jeu équivalente à 28–45 cm/360°) offre une stabilité supérieure. Une sensibilité trop élevée sollicite excessivement les micromuscles des doigts, provoquant des tremblements et des décrochages involontaires."
        }
    },
    {
        "@type": "Question",
        "name": "L'entraînement à la poursuite oculaire améliore-t-il l'attention et le confort visuel au quotidien ?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui. Renforcer la motilité oculaire et la stabilité fovéale soulage la fatigue visuelle liée aux écrans (asthénopie), améliore la fluidité de lecture et consolide l'attention soutenue lors de tâches dynamiques intenses."
        }
    },
    {
        "@type": "Question",
        "name": "Les sports réels tels que le tennis, le tennis de table ou le sport automobile en bénéficient-ils ?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolument. Pilotes de course et joueurs de sports de raquette s'appuient sur un smooth pursuit performant pour estimer les trajectoires balistiques à grande vitesse et négocier les courbes sans rupture de fixation (Land & McLeod, 2000)."
        }
    },
    {
        "@type": "Question",
        "name": "Faut-il guider la souris plutôt avec le poignet ou avec l'avant-bras ?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pour les amples trajectoires courbes, le mouvement doit être initié par l'avant-bras avec le coude pour pivot. Le poignet et les doigts n'interviennent que pour les microajustements à l'intérieur de la cible, prévenant ainsi les tendinopathies."
        }
    },
    {
        "@type": "Question",
        "name": "Quelle est la meilleure approche face aux changements imprévisibles de direction ?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "N'essayez pas d'anticiper le rebond à l'aveugle, car une mauvaise prédiction entraîne un décrochage sévère (overshoot). Maintenez votre attention sur le bord avant de la cible et utilisez la friction maîtrisée du tapis pour freiner sans à-coup."
        }
    },
    {
        "@type": "Question",
        "name": "Quelle routine quotidienne adopter sans fatiguer les yeux ?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Il est conseillé de réaliser 3 à 5 sessions de 45 secondes par jour, entrecoupées de 30 secondes de pause. Clignez régulièrement des yeux et observez un repère lointain à au moins 6 mètres pendant 10 secondes après chaque série."
        }
    },
    {
        "@type": "Question",
        "name": "Mes données de visée et mes coordonnées de souris sont-elles transmises à des serveurs tiers ?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Non. Toutes les coordonnées vectorielles, l'interpolation canvas et l'évaluation du temps de contact s'exécutent exclusivement en mémoire locale dans votre navigateur via JavaScript client-side. Aucune donnée n'est collectée à distance."
        }
    }
]
};

export default function PursuitTrackerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <AutoPursuitClient copy={{ title: "Test de Poursuite Oculaire Continue (Smooth Pursuit)", subtitle: "Poursuite Oculaire Lisse & Précision Motrice" }} />
        <DrillGuide guide={guideData} />
        <RelatedDrills related={guideData.related} />
      </main>
    </>
  );
}
