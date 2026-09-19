import MicroCorrectionClient from '@/app/drills/fps/micro-correction-precision/MicroCorrectionClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: "Micro-Correction de Visée – Précision FPS | SkillDrills",
  description: "Entraînez la micro-correction de visée et la décélération terminale. Maîtrisez les micro-ajustements et la précision headshot sur Valorant et CS2.",
  keywords: [
    "entraînement micro correction visée",
    "micro ajustement visée valorant",
    "micro flicks cs2",
    "précision micro ajustement souris",
    "entraînement headshot fps",
    "décélération de visée fps",
    "contrôle micro mouvements souris",
    "aim trainer micro ajustement gratuit",
    "comment améliorer micro visée valorant",
    "précision arrêt de visée cs2",
    "visée de tête fps entraînement",
    "micro correction shoot tactique"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/fps/micro-correction-precision",
    languages: getAlternateLanguages('/drills/fps/micro-correction-precision'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Micro-Correction de Visée – Précision FPS | SkillDrills",
    description: "Entraînez la micro-correction de visée et la décélération terminale. Maîtrisez les micro-ajustements et la précision headshot sur Valorant et CS2.",
    url: "https://skilldrills.online/fr/drills/fps/micro-correction-precision",
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Micro-Correction de Visée – Précision FPS | SkillDrills",
    description: "Entraînez la micro-correction de visée et la décélération terminale. Maîtrisez les micro-ajustements et la précision headshot sur Valorant et CS2.",
  },
};

export default function MicroCorrectionPage() {
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
        "name": "Exercices FPS",
        "item": "https://skilldrills.online/fr/drills/fps"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Micro-Correction de Visée",
        "item": "https://skilldrills.online/fr/drills/fps/micro-correction-precision"
      }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Entraîneur de Micro-Correction de Visée SkillDrills",
    "url": "https://skilldrills.online/fr/drills/fps/micro-correction-precision",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Nécessite un navigateur moderne avec support Pointer Lock",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Entraînement Micro-Correction de Visée",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Micro-Correction Precision FPS Trainer",
    "description": "Simulateur de visée pour calibrer la décélération terminale et les micro-ajustements avec verrouillage du curseur.",
    "genre": ["Action", "Esports Trainer", "Aim Trainer"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Browser Game"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-16",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Qu'est-ce que le freinage moteur (décélération terminale) dans la visée FPS ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le freinage moteur est la capacité biomécanique d'arrêter net l'élan de la souris à la fin d'un déplacement vif. Une décélération parfaitement maîtrisée dissipe l'énergie cinétique et empêche le réticule de dépasser la hitbox de la tête adverse (overflick)."
        }
      },
      {
        "@type": "Question",
        "name": "Pourquoi les joueurs dépassent-ils souvent leur cible (overflick) sur Valorant et CS2 ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "L'overflick survient lorsque l'impulsion balistique initiale produit plus de vitesse que les muscles stabilisateurs de la main et la friction du tapis de souris ne peuvent en absorber. Cela découle souvent d'une sensibilité inadaptée ou d'une contraction excessive du poignet."
        }
      },
      {
        "@type": "Question",
        "name": "Comment le modèle de visée en deux composantes (Woodworth et Meyer) théorise-t-il la micro-correction ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Établi par Robert S. Woodworth (1899) et développé par Meyer et al. (1988), ce modèle décompose le ciblage en deux étapes : une impulsion balistique rapide couvrant 85% à 90% de la trajectoire, suivie d'un sous-mouvement correctif guidé par le contrôle visuel continu. C'est cette seconde phase qui convertit le mouvement en tir létal."
        }
      },
      {
        "@type": "Question",
        "name": "Comment les joueurs professionnels de CS2 et Valorant perfectionnent-ils leurs micro-ajustements ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Les joueurs professionnels associent un placement de réticule chirurgical à des exercices d'ajustements millimétriques. Ils s'exercent à ne tirer qu'après confirmation visuelle de l'alignement sur la tête, en guidant la souris par de légères flexions du bout des doigts."
        }
      },
      {
        "@type": "Question",
        "name": "Qu'est-ce que la confirmation visuelle de cible (target confirmation) avant le tir ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Il s'agit de la fraction de seconde cognitive durant laquelle le cortex visuel vérifie que le réticule est verrouillé sur la hitbox ennemie avant d'actionner le clic. Déclencher le tir précipitamment pendant la course entraîne des tirs manqués évitables."
        }
      },
      {
        "@type": "Question",
        "name": "L'entraînement aux micro-corrections augmente-t-il directement le pourcentage de headshots ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui. Dans les jeux de tir tactiques, la tête de l'adversaire occupe un angle visuel très réduit. La faculté d'effectuer un micro-ajustement réflexe de 5 à 20 pixels après le flick principal transforme instantanément des tirs de corps en éliminations nettes."
        }
      },
      {
        "@type": "Question",
        "name": "Quel est l'impact du taux de rafraîchissement (Hz) et du polling rate sur les micro-flicks ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Les écrans haute fréquence (144Hz à 360Hz) procurent une plus grande densité temporelle d'images et réduisent le délai perçu. Un taux de scrutation de souris à 1000Hz ou plus abaisse la latence de capture sous 1 ms, autorisant des micro-ajustements sub-pixel sans latence."
        }
      },
      {
        "@type": "Question",
        "name": "À quelle fréquence s'entraîner aux micro-corrections pour éviter la fatigue sensorimotrice ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Une pratique quotidienne de 10 à 15 minutes en pré-échauffement compétitif est idéale. Des sessions courtes et intenses consolident la motricité fine sans créer de tension excessive sur les tendons et articulations de la main."
        }
      },
      {
        "@type": "Question",
        "name": "Quelle prise en main de souris (Fingertip, Claw, Palm) favorise les micro-ajustements des doigts ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Les prises Claw et Fingertip sont supérieures pour les micro-corrections, car la paume ne bloque pas le corps de la souris, accordant aux articulations des doigts toute leur amplitude de flexion et d'extension pour les ajustements fins."
        }
      },
      {
        "@type": "Question",
        "name": "Pourquoi les tirs manqués ou les dépassements de temps réinitialisent-ils le combo ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La remise à zéro du combo simule l'exigence d'une manche réelle en tournoi, où un tir manqué trahit votre position et provoque votre élimination. Cette règle conditionne les joueurs à privilégier une précision absolue sur des clics précipités."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Comment Maîtriser la Micro-Correction de Visée",
    "description": "Méthode rigoureuse pour affiner la décélération terminale et les micro-ajustements sur les FPS tactiques.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Calibration et Verrouillage du Pointeur",
        "text": "Réglez votre sensibilité et vos DPI exacts pour maintenir votre ratio cm/360 habituel et activez le Pointer Lock."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Activation de la Cible Ancre",
        "text": "Cliquez sur la première cible ancre pour faire apparaître la micro-cible adjacente."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Freinage Moteur et Micro-Ajustement des Doigts",
        "text": "Couvrez 90% du trajet d'un flick souple, freinez net à l'approche et ajustez le centre avec le bout des doigts."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Confirmation Visuelle et Clic Décisif",
        "text": "Validez visuellement l'alignement sur la cible avant de cliquer pour préserver votre multiplicateur de score."
      }
    ]
  };

  const copyFr = {
    h1Keyword: "Micro-Correction de Visée",
    h1Suffix: " – Précision Headshot FPS",
    subtitle: "Maîtrisez la décélération terminale et les micro-ajustements immédiats pour une précision headshot létale.",
    statScore: "Score",
    statTime: "Temps",
    statAccuracy: "Précision",
    statBestScore: "Record",
    statAvgCorrection: "Correction Moyenne",
    statMaxCombo: "Combo Max",
    statPeakLevel: "Niveau Max",
    startTitle: "Micro-Correction de Visée",
    startSubtitle: "Entrée Brute Hardware • Progression Continue et Décélération",
    getReady: "PRÊT ?",
    toggleFlash: "Flash de tir manqué",
    toggleSound: "Effets sonores",
    stageCaption: "Cliquez sur la cible ancre puis ajustez instantanément votre réticule avec les doigts pour toucher la micro-cible.",
    rulesTitle: "Consignes d'Entraînement et Barème",
    rulesItems: [
      { num: "1", text: "Toucher l'Ancre", highlight: "+10 pts (+0,2s)", result: "Active la micro-cible" },
      { num: "2", text: "Toucher la Micro", highlight: "jusqu'à +585 pts", result: "Précision × Combo" },
      { num: "3", text: "Montée de Niveau", highlight: "+1 Niveau / 1 400 pts", result: "Échelle adaptative" },
      { num: "4", text: "Tir Manqué", highlight: "Pénalité", result: "Reset combo (-0,6s)" }
    ],
    aboutTitle: "À Propos de la Micro-Correction de Visée",
    aboutHeading: "Qu'est-ce que la Micro-Correction de Visée ?",
    aboutText: "La majorité des mouvements de visée ne sont pas un geste unique mais deux : une poussée balistique initiale rapide, suivie d'un micro-ajustement visuel de précision (Woodworth, 1899 ; Meyer et al., 1988). Cet exercice isole et perfectionne la seconde moitié du geste, là où se joue l'issue du duel."
  };

  const microCorrectionGuide = {
    heading: "Guide de Micro-Correction de Visée & Chronométrie de Précision",
    intro: [
      "L'Entraîneur de Micro-Correction de Visée est un exercice sensorimoteur empirique conçu pour isoler, calibrer et maîtriser la phase secondaire d'ajustement du ciblage visuel. Dans les jeux de tir tactiques compétitifs tels que Valorant, Counter-Strike 2 et Rainbow Six Siege, les duels se jouent fréquemment sur des corrections minimes de 5 à 25 pixels.",
      "Le cadre théorique des mouvements dirigés rapides a été établi par Robert S. Woodworth (1899) avec son modèle en deux composantes : une impulsion balistique initiale en boucle ouverte propulsant la main vers le stimulus, suivie d'une phase de contrôle continu en boucle fermée guidée par le retour sensoriel. Ce compromis vitesse-précision a été formalisé par la loi de Fitts (1954), où le temps de mouvement évolue avec la distance et la taille de la cible.",
      "Les avancées de David E. Meyer et al. (1988) avec le modèle stochastique des sous-mouvements optimisés ont démontré que le système nerveux planifie le déplacement initial pour atterrir légèrement avant la cible, comptant sur de micro-ajustements rapides pour absorber l'inertie sans dépassement chaotique.",
      "Pendant la fixation fovéale terminale, l'œil humain active des microsaccades (Rolfs, 2009 ; Martinez-Conde et al., 2004) — de minuscules mouvements involontaires à haute fréquence — pour stabiliser la rétine sur les cibles critiques. Cet entraîneur associe le Pointer Lock à une chronométrie haute précision via performance.now() (Woods et al., 2015) pour éliminer les oscillations terminales et garantir des headshots constants.",
      "Mode de mesure : chaque tir et chaque micro-ajustement sont horodatés localement dans votre navigateur en temps réel. Les variations inférieures à 5 ms relèvent des tolérances matérielles normales (fréquence de l'écran et variations de capture du capteur de souris)."
    ],
    benchmarks: {
      title: "Paliers de Latence de Micro-Correction et Acquisition de Cible",
      headers: ["Niveau de Performance", "Fenêtre de Latence de Correction", "Mécanique de Contrôle Moteur", "Impact Compétitif en Match"],
      rows: [
        ["Tier 1 (Précision Ultime)", "Moins de 280 ms", "Décélération quasi instantanée ; micro-ajustements aux doigts exécutés sans aucune oscillation", "Conversion létale du premier tir en Radiant, CS2 Faceit 10 et compétitions pro"],
        ["Tier 2 (Pro Compétitif)", "280 – 340 ms", "Freinage musculaire discipliné ; transition fluide du flick primaire au micro-ajustement", "Remporte systématiquement les duels contre les lignes agressives ; headshots fiables"],
        ["Tier 3 (Haut Niveau FPS)", "340 – 420 ms", "Bonne acquisition de cible ; léger dépassement occasionnel de 10 à 15px demandant un double ajustement", "Efficacité tactique solide ; légère hésitation sur les décalages verticaux"],
        ["Tier 4 (Intermédiaire)", "420 – 520 ms", "Décélération hésitante ; tendance à glisser au-delà de la hitbox avant de corriger la visée", "Vulnérable aux contre-strafes rapides ; difficultés lors des transferts de tirs"],
        ["Tier 5 (En Progression)", "520 ms+", "Inertie balistique excessive avec overflick régulier ; retard de confirmation visuelle", "Dépasse fréquemment la cible en duel direct ; nécessité de réajustements amples"]
      ],
      note: "Les latences correspondent au temps cumulé de freinage, de confirmation visuelle, de micro-ajustement et de clic mesuré via performance.now() (Woods et al., 2015)."
    },
    techniques: {
      title: "Protocoles Scientifiques pour Perfectionner Décélération et Micro-Visée",
      items: [
        {
          name: "Freinage Musculaire Terminal et Friction du Tapis",
          desc: "Au lieu de laisser la souris glisser librement après un flick rapide, appliquez une légère pression vers le tapis ou posez le bout des doigts annulaire et auriculaire pour dissiper instantanément l'énergie cinétique.",
          tips: "Un tapis de souris hybride offrant un bon pouvoir d'arrêt dynamique facilite la décélération sans bloquer les micro-glissements."
        },
        {
          name: "Cadence de Visée en Deux Temps",
          desc: "Décomposez consciemment votre visée en deux rythmes : un flick rapide et relâché couvrant 90% du trajet, suivi d'un micro-mouvement précis. Ne précipitez jamais le clic avant confirmation visuelle.",
          tips: "Résistez à l'envie de cliquer par réflexe en même temps que le flick ; dissociez le mouvement de la main de la pression sur le clic."
        },
        {
          name: "Articulation des Doigts pour les Décalages Sub-Degrés",
          desc: "Mobilisez le bras et le poignet pour le grand déplacement balistique, mais réservez la flexion et l'extension du bout des doigts pour les 5 à 20 derniers pixels.",
          tips: "Adoptez une prise Claw ou Fingertip relâchée laissant un espace libre sous la paume pour permettre aux doigts d'ajuster la trajectoire."
        },
        {
          name: "Verrouillage Visuel Anticipé (Microsaccades)",
          desc: "Fixez votre regard sur le pixel central de la tête adverse avant même l'arrivée du curseur. Selon la psychophysique visuelle (Rolfs, 2009), regarder la cible en avance prépare le cortex moteur avec les coordonnées exactes.",
          tips: "Gardez les yeux fixés sur le centre de la cible — ne suivez pas le réticule des yeux lors de son déplacement."
        }
      ]
    },
    steps: [
      "Configurez votre jeu, vos DPI et votre sensibilité exacte dans les paramètres pour garantir un ratio cm/360 parfait, puis activez le Pointer Lock.",
      "À l'apparition de la cible ancre, effectuez un déplacement rapide pour couvrir 90% du trajet vers la zone de la cible.",
      "Freinez net près de la bordure, effectuez un micro-ajustement précis au bout des doigts vers le centre, confirmez visuellement et cliquez.",
      "Conservez une cadence régulière sans tirs précipités pour maintenir votre combo et relever les paliers aux cibles toujours plus réduites."
    ],
    audience: "Compétiteurs FPS sur Valorant, CS2 et Rainbow Six Siege visant une létalité maximale dès la première balle, l'élimination de l'overflick et un contrôle moteur sub-degré.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'meyer1988', 'martinezConde2004', 'rolfs2009', 'woodworth1899'),
    related: [
      { href: "/fr/drills/fps/flick-shot-training", label: "Entraînement Flick Shot" },
      { href: "/fr/drills/fps/angle-hold-trainer", label: "Entraîneur de Ligne de Visée" },
      { href: "/fr/drills/fps/instant-response", label: "Réponse Instantanée" }
    ]
  };

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      {/* VideoGame Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <MicroCorrectionClient copy={copyFr} />

      <DrillGuide guide={microCorrectionGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/micro-correction-precision"
          locale="fr"
        />
      </div>
      <DrillFooter />
    </>
  );
}
