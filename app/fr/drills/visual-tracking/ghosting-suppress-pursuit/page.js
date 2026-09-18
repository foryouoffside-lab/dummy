import GhostingSuppressPursuitClient from '@/app/drills/visual-tracking/ghosting-suppress-pursuit/GhostingSuppressPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Stabilité de Fixation Oculaire – Ghosting | SkillDrills",
  description: "Entraînement gratuit de fixation fovéale et suppression des traînées visuelles : améliorez la netteté dynamique et la stabilité du regard en ligne.",
  keywords: [
    "stabilité de fixation oculaire",
    "suppression des images rémanentes",
    "entraînement fixation fovéale dynamique",
    "flou de mouvement oculaire exercice",
    "contrôle des microsaccades visuelles",
    "acuité visuelle dynamique test en ligne",
    "gymnastique oculaire pour esports",
    "tracking visuel haute stabilité",
    "motricité oculaire anti traînée",
    "stabilisation du regard exercice gratuit",
    "coordination oculomotrice de précision",
    "test de poursuite oculaire sans rémanence"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/visual-tracking/ghosting-suppress-pursuit",
    languages: getAlternateLanguages("/drills/visual-tracking/ghosting-suppress-pursuit"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Stabilité de Fixation Oculaire – Ghosting | SkillDrills",
    description: "Entraînement gratuit de fixation fovéale et suppression des traînées visuelles : améliorez la netteté dynamique et la stabilité du regard en ligne.",
    url: "https://skilldrills.online/fr/drills/visual-tracking/ghosting-suppress-pursuit",
    siteName: "SkillDrills",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stabilité de Fixation Oculaire – Ghosting | SkillDrills",
    description: "Entraînement gratuit de fixation fovéale et suppression des traînées visuelles : améliorez la netteté dynamique et la stabilité du regard en ligne.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "SkillDrills",
      "item": "https://skilldrills.online/fr"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Poursuite Visuelle",
      "item": "https://skilldrills.online/fr/drills/visual-tracking"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Suppression des Traînées et Fixation",
      "item": "https://skilldrills.online/fr/drills/visual-tracking/ghosting-suppress-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Suppression des Traînées Visuelles – Fixation Oculaire",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Test de Stabilité de Fixation Oculaire et Neutralisation du Flou Visuel",
  "url": "https://skilldrills.online/fr/drills/visual-tracking/ghosting-suppress-pursuit",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires JavaScript. Requires HTML5 Canvas.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Ghosting Suppress Pursuit – Entraîneur de Fixation Fovéale",
  "description": "Entraîneur visuel réflexe sur navigateur pour développer un ancrage fovéal inébranlable et neutraliser activement les traînées de mouvement.",
  "genre": ["Outil d'Entraînement Oculaire", "Entraînement Visuel Sportif", "Aim Trainer"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment Entraîner la Fixation Fovéale Face aux Traînées Visuelles",
  "description": "Protocole pour stimuler le défloutage cortical et verrouiller le regard sur des cibles avec artefacts visuels.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Stabilisez Votre Tête et Votre Posture",
      "text": "Asseyez-vous à 50-60 cm de l'écran avec la tête parfaitement immobile pour forcer l'action directe des muscles oculomoteurs sans intervention vestibulaire.",
      "url": "https://skilldrills.online/fr/drills/visual-tracking/ghosting-suppress-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Verrouillez le Centre du Noyau",
      "text": "Portez votre attention exclusivement sur le cœur de la cible, en refusant activement de suivre les anneaux rémanents qui traînent à l'arrière.",
      "url": "https://skilldrills.online/fr/drills/visual-tracking/ghosting-suppress-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Inhibez le Décrochage Rétinien",
      "text": "Empêchez votre fovéa de glisser vers l'arrière. Maintenez des microsaccades d'ajustement stables sur la partie avant du vecteur.",
      "url": "https://skilldrills.online/fr/drills/visual-tracking/ghosting-suppress-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Enchaînez des Séries Intenses et Concises",
      "text": "Effectuez 5 à 8 séries de 60 secondes avec des pauses pour préserver la précision synaptique du cortex visuel sans fatigue prématurée.",
      "url": "https://skilldrills.online/fr/drills/visual-tracking/ghosting-suppress-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu’est-ce que le test de suppression des traînées et fixation (Ghosting Suppress Pursuit) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "C’est un exercice neuro-oculaire conçu pour développer la stabilité de la fovéa et la neutralisation active des traînées visuelles (motion blur/ghosting) causées par des cibles à vive allure, optimisant la clarté visuelle perçue."
      }
    },
    {
      "@type": "Question",
      "name": "Comment le cerveau élimine-t-il le flou de mouvement (motion deblurring) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le cortex visuel primaire (V1) et l'aire temporale médiane (MT) exercent une inhibition temporelle rétroactive qui étouffe les signaux résiduels des photorécepteurs décalés afin de préserver la netteté des contours (Burr, 1980)."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le rôle des microsaccades dans la fixation oculaire ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Même lors d'une fixation stable, les yeux réalisent des microsaccades imperceptibles qui rafraîchissent la fovéa et préviennent l'évanouissement visuel (effet Troxler) sans dévier de la cible (Martinez-Conde et al., 2004)."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi le regard a-t-il tendance à être attiré vers l’arrière par les traînées (ghost rings) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La rétine périphérique détecte spontanément tout contraste lumineux. Sans filtrage cortical rigoureux, le cerveau prend le sillage pour un nouveau stimulus et tracte involontairement le regard vers l'arrière."
      }
    },
    {
      "@type": "Question",
      "name": "Quels sont les bénéfices directs de cet entraînement pour les joueurs de FPS ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dans les affrontements chargés d'explosions et d'effets visuels complexes, maintenir le réticule exactement au cœur de la cible adverse sans être perturbé par les traînées lumineuses garantit une précision de tir constante."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi faut-il maintenir la tête strictement immobile lors du test ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les mouvements de tête déclenchent le réflexe vestibulo-oculaire (RVO), compensant le suivi via l'oreille interne. L'immobilité de la tête garantit que les muscles oculomoteurs assument la totalité de la charge de stabilisation."
      }
    },
    {
      "@type": "Question",
      "name": "Quel temps d’entraînement quotidien est recommandé ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nous conseillons 5 à 10 minutes quotidiennes (5 à 8 blocs de 60 secondes). La suppression de stimuli parasites exigeant une grande énergie cognitive, des séances courtes évitent la fatigue oculaire et maximisent l'apprentissage."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est l’influence de la réactivité de l’écran (GtG) et de sa fréquence (Hz) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Une dalle gaming rapide (1 ms GtG et 144 Hz ou plus) supprime le flou propre au moniteur (Woods et al., 2015), assurant que l'exercice sollicite exclusivement les filtres neuronaux et le contrôle visuo-moteur du regard."
      }
    },
    {
      "@type": "Question",
      "name": "Ce protocole s’applique-t-il aux sports de balle comme le tennis ou le football ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolument. Une balle rapide crée une traînée sur la rétine. Les athlètes dotés d'une fixation d'élite isolent la rotation et les coutures de la balle en dépit de la vitesse, améliorant ainsi leur réactivité spatiale."
      }
    },
    {
      "@type": "Question",
      "name": "Ce test de suppression des traînées visuelles est-il gratuit et confidentiel ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, ce test fonctionne gratuitement et directement dans votre navigateur web sans création de compte, et l'ensemble de vos données de performance est conservé localement sur votre terminal."
      }
    }
  ]
};

const guideProps = {
  heading: "Bases Neurophysiologiques de la Fixation Fovéale et Neutralisation du Flou Visuel",
  intro: [
    "La poursuite visuelle d'objets rapides confronte la rétine à une contrainte majeure : la rémanence chimique des photorécepteurs a tendance à créer un flou de mouvement (motion smear) qui estompe les contours. Chez les sujets non préparés, le regard se laisse happer par ces sillages lumineux postérieurs, ce qui décroche la cible de la fovéa centrale (Burr, 1980 ; Burr & Morgan, 1997).",
    "Mécanisme de Défloutage Cortical et Microsaccades de Fixation : le cortex visuel primaire (V1) et les aires pariétales déploient une inhibition temporelle active, atténuant le bruit résiduel rétinien pour que la fovéa isole uniquement le noyau net de l'objet. Concomitamment, le système oculomoteur déclenche des microsaccades de haute fidélité (< 1° d'amplitude) pour contrecarrer la dérive oculaire et verrouiller le regard sur la cible mobile (Martinez-Conde, Macknik, & Hubel, 2004 ; Rolfs, 2009 ; Krauzlis, 2004).",
    "Interaction Matérielle et Taux de Rafraîchissement : les moniteurs classiques à 60 Hz cumulent le flou inhérent à la transition des cristaux liquides. Les écrans esport de 144 Hz à 240 Hz éliminent ce délai (Woods et al., 2015), permettant à l'exercice d'isoler le filtrage neuronal biologique. Tout s'exécute dans votre navigateur avec une confidentialité absolue et un stockage 100 % local."
  ],
  benchmarks: {
    title: "Normes de Performance en Fixation Fovéale et Suppression des Traînées Visuelles",
    headers: ["Niveau de Performance", "Multiplicateur de Vitesse", "Stabilité de Fixation Face aux Traînées Visuelles", "Profil Neuromoteur et Oculaire"],
    rows: [
      ["Niveau 1 : Apex Fixation – Verrouillage Fovéal Pur", "2.0x+ Ultra-Vitesse", "Le regard demeure ancré sur le noyau de la cible malgré les anneaux d'artefacts denses et les rebonds rapides.", "Inhibition corticale parfaite du flou de mouvement et précision absolue des microsaccades (Burr, 1980 ; Martinez-Conde et al., 2004). Standard d'élite en sport et esport."],
      ["Niveau 2 : Acuité de Fixation Supérieure", "1.4x – 1.9x Haute Vitesse", "Contour de la cible parfaitement isolé à vive allure ; distraction négligeable face aux traînées résiduelles.", "Remarquable filtrage sensorimoteur des muscles extraoculaires. Très grande efficacité dans les environnements riches en particules."],
      ["Niveau 3 : Standard Fonctionnel Solide", "1.0x – 1.3x Vitesse Standard", "Poursuite régulière à vitesse de référence ; brève hésitation lors des rebonds ou lorsque la traînée se densifie.", "Profil représentatif des adultes sains. Parfaitement adapté à la conduite automobile, aux loisirs sportifs et au jeu vidéo standard."],
      ["Niveau 4 : Dérive Oculaire – Pratique Recommandée", "0.7x – 0.9x Vitesse Modérée", "Le regard est régulièrement attiré vers l'arrière par les traînées ; le noyau de la cible s'échappe souvent de la fovéa.", "Filtrage cortical ralenti face au bruit visuel. Entraînement recommandé sur les paliers de vitesse inférieurs."],
      ["Niveau 5 : Perte de Fixation – Débutant", "< 0.7x Basse Vitesse", "Les yeux oscillent de façon désordonnée entre le centre de la cible et les anneaux fantômes, entraînant un décrochage complet.", "La coordination neuromusculaire de base doit d'abord être stabilisée à vitesse réduite avec immobilisation stricte de la tête."]
    ],
    note: "Normes établies d'après les recherches neurophysiologiques sur le contrôle de la fixation fovéale, la dynamique des microsaccades et la suppression corticale du flou de mouvement (Burr, 1980 ; Martinez-Conde et al., 2004 ; Rolfs, 2009 ; Krauzlis, 2004)."
  },
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('burr1980', 'martinezconde2004', 'rolfs2009', 'krauzlis2004', 'barnes2008', 'woods2015'),
  related: [
    { href: "/fr/drills/visual-tracking/constant-slow-pursuit", label: "Poursuite Oculaire Lente (Constant Slow)" },
    { href: "/fr/drills/visual-tracking/directional-chaos-pursuit", label: "Poursuite Chaotique Directionnelle (Chaos Pursuit)" },
    { href: "/fr/drills/visual-tracking/dynamic-evasion-pursuit", label: "Poursuite Évasive Dynamique (Dynamic Evasion)" },
    { href: "/fr/drills/visual-tracking/infinity-pursuit", label: "Poursuite en Huit Infini (Figure-8)" }
  ]
};

export default function GhostingSuppressPursuitPageFr() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GhostingSuppressPursuitClient
        copy={{
          title: "Suppression des Traînées Visuelles – Fixation Oculaire",
          subtitle: "Entraînement à la Stabilité Fovéale et à la Neutralisation du Flou Visuel",
          description: "En affichant des traînées d'arrachement et des anneaux fantômes stochastiques, cet exercice entraîne le cortex visuel à inhiber activement les perturbations d'arrière-plan pour focaliser la fovéa sur le noyau de la cible (Burr, 1980; Martinez-Conde et al., 2004)."
        }}
      />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/fr/drills/visual-tracking/ghosting-suppress-pursuit" />
      </div>
    </>
  );
}
