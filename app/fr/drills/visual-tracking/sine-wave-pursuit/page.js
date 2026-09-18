import SineWavePursuitClient from '@/app/drills/visual-tracking/sine-wave-pursuit/SineWavePursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Entraînement Oculaire Sinusoïdal – SkillDrills",
  description: "Suivez des trajectoires sinusoidales harmoniques. Ameliorez le gain de vitesse et eliminez le dephasage sensoriel sans inscription.",
  keywords: [
    "entrainement oculaire sinusoidal",
    "poursuite visuelle sinusoidale",
    "exercice oculaire onde sinusoide",
    "poursuite visuelle harmonique",
    "gain de vitesse oculaire",
    "controle oculomoteur rythmique",
    "synchronisation cerebelleuse vision",
    "dephasage zero poursuite oculaire",
    "suppression des saccades de rattrapage",
    "exercice de stabilite du regard",
    "poursuite cible oscillante",
    "entrainement coordination visuelle"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/visual-tracking/sine-wave-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/sine-wave-pursuit'),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Entraînement Oculaire Sinusoïdal – SkillDrills",
    description: "Suivez des trajectoires sinusoidales harmoniques. Ameliorez le gain de vitesse et eliminez le dephasage sensoriel sans inscription.",
    url: "https://skilldrills.online/fr/drills/visual-tracking/sine-wave-pursuit",
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Entraînement Oculaire Sinusoïdal – SkillDrills",
    description: "Suivez des trajectoires sinusoidales harmoniques. Ameliorez le gain de vitesse et eliminez le dephasage sensoriel sans inscription.",
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
      "name": "Poursuite Visuelle",
      "item": "https://skilldrills.online/fr/drills/visual-tracking"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Poursuite Oculaire en Onde Sinusoïdale",
      "item": "https://skilldrills.online/fr/drills/visual-tracking/sine-wave-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Entraînement Oculaire Sinusoïdal",
  "operatingSystem": "Navigateur Web",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "description": "Application de poursuite visuelle harmonique pour calibrer le gain de vitesse oculaire et la synchronisation cerebelleuse."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Exercice de Poursuite Sinusoïdale",
  "url": "https://skilldrills.online/fr/drills/visual-tracking/sine-wave-pursuit",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "Tous les navigateurs modernes",
  "browserRequirements": "Nécessite le support de JavaScript et HTML5 Canvas"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Sine Wave Pursuit",
  "description": "Exercice de poursuite oculaire continue entrainant la foveation sur des cibles soumises a des oscillations harmoniques.",
  "genre": ["Entraînement Visuel", "Poursuite Lente", "Entraînement des Réflexes"],
  "playMode": "SinglePlayer",
  "gamePlatform": "Navigateur Web"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment Maîtriser la Poursuite Harmonique Sinusoïdale",
  "description": "Protocole methodologique pour verrouiller la phase cerebelleuse et supprimer le retard sensoriel sur trajectoires ondulatoires.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Synchronisez la Frequence Harmonique",
      "text": "Placez-vous a 50-70 cm de votre ecran. Analysez les premiers cycles d'oscillation pour integrer mentalement la cadence."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Accélérez au Croisement Central",
      "text": "Augmentez la vitesse oculomotrice lors du passage de l'axe central, la ou la vitesse tangentielle de la cible est maximale."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Amortissez aux Points d'Inflexion",
      "text": "Decelerez en douceur a l'approche des cretes et des creux pour eviter tout depassement foveal de la trajectoire."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Supprimez les Saccades Correctrices",
      "text": "Maintenez une vitesse de poursuite continue au lieu de recourir a des saccades de rattrapage saccadees."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu'est-ce que l'exercice Sine Wave Pursuit ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le Sine Wave Pursuit developpe la poursuite oculaire le long de trajectoires sinusoidales horizontales et verticales, supprimant le dephasage sensoriel grace a l'anticipation cerebelleuse (Robinson, 1965)."
      }
    },
    {
      "@type": "Question",
      "name": "En quoi le suivi sinusoidal differe-t-il d'un suivi a vitesse constante ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La vitesse et l'acceleration varient continuellement : la vitesse est maximale au croisement de l'axe central et tombe a zero aux sommets avant l'inversion du sens (Stark et al., 1962)."
      }
    },
    {
      "@type": "Question",
      "name": "Qu'est-ce que le dephasage zero en poursuite oculaire ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Il s'agit de la synchronisation de l'horloge interne cerebelleuse avec le rythme de la cible, permettant a l'oeil d'anticiper le mouvement sans le retard sensoriel habituel de 130 a 150 ms."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi des saccades de rattrapage se produisent-elles ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Si le gain de poursuite oculaire descend sous 1.0, l'oeil prend du retard. Le cerveau declenche alors une saccade rapide de rattrapage pour recentrer la cible sur la fovea (Bahill et al., 1980)."
      }
    },
    {
      "@type": "Question",
      "name": "Quel avantage pour la precision dans les jeux FPS ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dans des jeux tels qu'Apex Legends ou Overwatch, les opposants effectuent des deplacements et des sauts rythmiques. Cet entrainement evite les retards de visee aux points d'inversion."
      }
    },
    {
      "@type": "Question",
      "name": "Quel benefice apporte ce drill aux sports de balle ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Au tennis, volleyball ou football, les balles decrivent des trajectoires paraboliques et sinueuses. La poursuite fluide garantit une continuite visuelle parfaite tout au long du vol."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi garder la tete parfaitement immobile ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les mouvements involontaires du cou declenchent le reflexe vestibulo-oculaire (VOR), induisant des contre-rotations qui perturbent le gain de la poursuite oculaire (Leigh & Zee, 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Le taux de rafraichissement de l'ecran est-il determinant ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un moniteur a 144Hz ou plus affiche des courbes continues sans saccades d'affichage, fournissant des stimuli visuels optimaux aux centres corticaux (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Cet entrainement oculaire est-il gratuit ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, SkillDrills propose cette plateforme d'entrainement gratuitement et directement dans votre navigateur web sans inscription requise."
      }
    },
    {
      "@type": "Question",
      "name": "A quelle frequence faut-il pratiquer ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Des sessions regulieres de 5 a 10 minutes pratiquees 3 a 5 fois par semaine augmentent le gain de vitesse et font disparaitre les saccades parasites en quelques semaines (Barnes, 2008)."
      }
    }
  ]
};

const guideProps = {
  heading: "Bases Scientifiques de la Poursuite Sinusoïdale et Contrôle Oculomoteur",
  intro: [
    "La capacite du systeme de poursuite oculaire fluide (Smooth Pursuit) se revele pleinement lorsque les yeux suivent des oscillations harmoniques plutot que de simples trajectoires rectilignes. Le long d'une onde sinusoidale, la vitesse et l'acceleration changent constamment : la vitesse atteint son apogee lors de la traversee de l'axe central d'equilibre, puis decelere jusqu'a s'arreter brievement aux cretes et aux creux avant de changer de sens (Stark et al., 1962; Robinson, 1965).",
    "Les recherches neurologiques de David Robinson (1965) et de Barnes (2008) ont etabli que les stimuli visuels aleatoires generent un delai sensori-moteur de 130 a 150 millisecondes (dephasage). Cependant, face a des oscillations periodiques, le cervelet s'adapte en quelques cycles, declenchant des commandes anticipatoires qui annulent completement le retard de phase sensoriel.",
    "Lorsque la vitesse depasse les capacites du systeme oculomoteur, le gain de poursuite s'effondre. Comme demontre par Rashbass (1961) et Bahill et al. (1980), si l'oeil prend du retard, le cerveau recourt a des saccades de rattrapage intempestives entrainant une perte passagere de clarte visuelle. Cet exercice optimise la coordination neuromusculaire pour maintenir un gain unitaire stable de 1.0."
  ],
  benchmarks: {
    title: "Grille d'Évaluation de la Poursuite Sinusoïdale et Gain de Vitesse",
    headers: ["Palier de Performance", "Gain de Vitesse", "Latence de Déphasage", "Saccades par Cycle", "Profil Oculomoteur"],
    rows: [
      ["Élite (Esports / Athlètes Pro)", "0.96 – 1.02", "< 15 ms (Synchronisation Totale)", "0 – 1 (Fluidité Absolue)", "Synchronisation rythmique cérébelleuse parfaite sans déphasage et fovéation impeccable."],
      ["Avancé (Compétitif)", "0.90 – 0.95", "15 – 30 ms", "2 – 3", "Haute fidélité de trajectoire avec micro-saccades minimes aux points d'inflexion."],
      ["Compétent (Adulte Sain)", "0.82 – 0.89", "31 – 50 ms", "4 – 5", "Bonne trajectoire harmonique avec légère dérive lors d'oscillations rapides."],
      ["En Développement (Latence)", "0.70 – 0.81", "51 – 80 ms", "6 – 8", "Instabilité aux sommets avec saccades correctrices fréquentes pour récupérer la cible."],
      ["Débutant (Ajustement Moteur)", "< 0.70", "> 80 ms", "> 9", "Incapacité à anticiper le rythme harmonique avec suivi saccadé et purement réactif."]
    ],
    note: "※ Mesures étalonnées sur écran 1080p à une distance de 50–70 cm aux vitesses 1.0x à 1.5x. Évaluation basée sur le ratio de gain de vitesse et l'absence de saccades parasites."
  },
  techniques: {
    title: "Quatre Piliers Techniques pour la Poursuite Sinusoïdale Harmonique",
    items: [
      {
        name: "Verrouillage de Phase Harmonique",
        desc: "Mettez a profit les premieres oscillations pour integrer le rythme du mouvement. Activez l'horloge cerebelleuse interne pour guider le regard en synchronie absolue (Robinson, 1965).",
        tips: "Adoptez un comptage interieur regulier ('un-deux, un-deux') pour neutraliser le retard sensoriel."
      },
      {
        name: "Amortissement à l'Apex",
        desc: "A l'approche des cretes et des creux, relachez doucement la tension musculaire oculaire pour eviter tout depassement au point d'inversion.",
        tips: "Visualisez le mouvement ralenti d'un pendule parvenant a son point d'oscillation maximal."
      },
      {
        name: "Accélération au Franchissement Central",
        desc: "La vitesse tangentielle de la cible culmine au passage de l'axe central. Donnez une impulsion oculaire proactive pour conserver le verrouillage foveal.",
        tips: "Appliquez une legere impulsion motrice au centre pour maintenir la continuite du gain."
      },
      {
        name: "Suppression Disciplinée des Saccades",
        desc: "Ne reagissez pas par des sursauts saccadiques aux petits ecarts de position. Ajustez la trajectoire par de legeres modulations de vitesse continue (Bahill et al., 1980).",
        tips: "Gardez les muscles extraoculaires detendus et souples pour un suivi continu."
      }
    ]
  },
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('stark1962', 'robinson1965', 'rashbass1961', 'bahill1980', 'barnes2008', 'woods2015'),
  related: [
    { href: "/fr/drills/visual-tracking/constant-slow-pursuit", label: "Exercice de Poursuite Lente Constante (Constant Slow)" },
    { href: "/fr/drills/visual-tracking/directional-chaos-pursuit", label: "Poursuite en Chaos Directionnel (Directional Chaos)" },
    { href: "/fr/drills/visual-tracking/dynamic-evasion-pursuit", label: "Poursuite avec Évasion Dynamique (Dynamic Evasion)" },
    { href: "/fr/drills/visual-tracking/ghosting-suppress-pursuit", label: "Suppression d'Images Fantômes (Ghosting Suppress)" },
    { href: "/fr/drills/visual-tracking/infinity-pursuit", label: "Exercice Oculaire en Huit (Infinity)" },
    { href: "/fr/drills/visual-tracking/momentum-teleport-pursuit", label: "Poursuite avec Téléportation et Inertie (Momentum)" }
  ]
};

export default function SineWavePursuitPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <SineWavePursuitClient copy={{ title: "Poursuite Sinusoïdale", subtitle: "Entraînement Oculaire Harmonique" }} />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/fr/drills/visual-tracking/sine-wave-pursuit" />
      </div>
    </>
  );
}
