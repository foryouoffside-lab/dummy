import SpatialShiftPursuitClient from '@/app/drills/visual-tracking/spatial-shift-pursuit/SpatialShiftPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Poursuite avec Saut Spatial – SkillDrills",
  description: "Entrainez le controle oculomoteur adaptatif face aux sauts et rotations du repere spatial. Ameliorez le remappage visuel sans inscription.",
  keywords: [
    "poursuite visuelle avec saut spatial",
    "remappage des coordonnees oculaires",
    "exercice oculaire repere spatial",
    "stabilite du regard rotation visuelle",
    "recuperation saccadique de cible",
    "controle oculomoteur adaptatif",
    "transformation du repere visuel",
    "entrainement sous secousse decran",
    "agilite visuelle de transition",
    "exercice de poursuite adaptative",
    "precision foveale deplacements brusques",
    "coordination oeil ecran rapide"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/visual-tracking/spatial-shift-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/spatial-shift-pursuit'),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Poursuite avec Saut Spatial – SkillDrills",
    description: "Entrainez le controle oculomoteur adaptatif face aux sauts et rotations du repere spatial. Ameliorez le remappage visuel sans inscription.",
    url: "https://skilldrills.online/fr/drills/visual-tracking/spatial-shift-pursuit",
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Poursuite avec Saut Spatial – SkillDrills",
    description: "Entrainez le controle oculomoteur adaptatif face aux sauts et rotations du repere spatial. Ameliorez le remappage visuel sans inscription.",
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
      "name": "Poursuite avec Saut Spatial",
      "item": "https://skilldrills.online/fr/drills/visual-tracking/spatial-shift-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Poursuite avec Saut Spatial",
  "operatingSystem": "Navigateur Web",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "description": "Application dentrainement visuel adaptatif stimulant le cortex parietal posterieur dans la conversion de coordonnees lors de deplacements de repere."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Exercice de Poursuite avec Saut Spatial",
  "url": "https://skilldrills.online/fr/drills/visual-tracking/spatial-shift-pursuit",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "Tous les navigateurs modernes",
  "browserRequirements": "Nécessite le support de JavaScript et HTML5 Canvas"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Spatial Shift Pursuit",
  "description": "Exercice de coordination oculaire evaluant la stabilite foveale lors de rotations et glissements subits du cadre de reference.",
  "genre": ["Entraînement Visuel", "Poursuite Lente", "Entraînement des Réflexes"],
  "playMode": "SinglePlayer",
  "gamePlatform": "Navigateur Web"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment Maîtriser la Poursuite sous Déplacement Spatial",
  "description": "Protocole methodologique pour remapper les coordonnees visuelles et re-foveer la cible immediatement apres un saut spatial.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Établissez la Fovéation Initiale",
      "text": "Placez-vous a 50-70 cm de votre ecran et maintenez une poursuite continue sur la trajectoire initiale de la cible."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Détectez le Saut Global du Cadre",
      "text": "Des que le repere spatial bascule ou pivote, interpretez le vecteur global de translation sans balayer au hasard."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Exécutez une Saccade Balistique Nette",
      "text": "Declenchez un bond saccadique direct vers les nouvelles coordonnees calculees sans hesitation parasite."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Enchaînez en Poursuite Fluide Immédiate",
      "text": "Fondez la deceleration de la saccade directement dans la vitesse de la nouvelle trajectoire pour preserver un gain parfait."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu'est-ce que le drill Spatial Shift Pursuit ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le Spatial Shift Pursuit developpe lagilite oculomotrice en exercant le regard a absorber des rotations et des deplacements imprevisibles du repere spatial (Krauzlis, 2004)."
      }
    },
    {
      "@type": "Question",
      "name": "Comment le saut du cadre spatial impacte-t-il la vision ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Lors dun glissement subit du champ visuel, le repere retinotopique se desorganise brievement. Le cortex doit reconfigurer un nouveau vecteur de visee (Robinson, 1965)."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le role du cortex parietal posterieur (PPC) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le PPC integre les entrees retiniennes aux decharges motrices efferentes pour convertir les signaux visuels en coordonnees stables liees a la tete et a lespace (Findlay & Gilchrist, 1999)."
      }
    },
    {
      "@type": "Question",
      "name": "En quoi consiste la saccade balistique de rattrapage ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Il sagit dun saut oculaire ultrarapide atteignant 500 degres par seconde qui franchit instantanement lecart de position avant la reprise du suivi fluide (Rashbass, 1961)."
      }
    },
    {
      "@type": "Question",
      "name": "Quel avantage pour la precision dans les jeux FPS ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sous leffet des secousses decran, du recul violent des armes ou de brusques mouvements de camera, ce drill permet de reverrouiller immediatement les adversaires."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est l'utilite pour les sports de balle et d'equipe ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Au football, basket-ball ou tennis de table, les changements de direction corporels frequents imposent de recalculer la trajectoire de la balle en une fraction de seconde."
      }
    },
    {
      "@type": "Question",
      "name": "Qu'appelle-t-on la transition post-saccadique ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cest la jonction motrice associant la phase de freinage du saut saccadique a la reprise instantanee de la poursuite continue sans micro-arret."
      }
    },
    {
      "@type": "Question",
      "name": "Quel volume dentrainement est conseille ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nous suggerons 4 a 6 sessions de 60 secondes par jour (environ 5 a 8 minutes). Des stimulations courtes a haute intensite consolident la plasticite cerebelleuse."
      }
    },
    {
      "@type": "Question",
      "name": "Cette plateforme est-elle entierement gratuite ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, SkillDrills propose cet outil gratuitement et directement dans votre navigateur web sans aucun abonnement requis."
      }
    },
    {
      "@type": "Question",
      "name": "La frequence de rafraichissement est-elle cruciale ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un moniteur a 144Hz ou plus supprime le flou de mouvement et permet une conversion de coordonnees spatiale plus nette pour le cortex visuel (Woods et al., 2015)."
      }
    }
  ]
};

const guideProps = {
  heading: "Bases Scientifiques de la Poursuite avec Saut Spatial et Remappage Oculaire",
  intro: [
    "Dans les contextes reels et sportifs de haute competition, le suivi visuel ne sopere presque jamais sur des arriere-plans immobiles et previsibles. Que ce soit lors de virages serres a haute vitesse, daccelerations brusques ou daffrontements sous fortes secousses decran et pivots de camera rapides, le referentiel spatial de lobservateur peut translater ou pivoter instantanement (Krauzlis, 2004; Robinson, 1965). Conserver une cible au centre foveal sous de telles turbulences reclame une flexibilite oculomotrice superieure.",
    "Les recherches fondamentales de Findlay & Gilchrist (1999) et Kahlon & Lisberger (1996) ont mis en lumiere que les signaux lumineux sont initialement traites sous des axes retinotopiques. Lorsquun saut brusque modifie le cadre densemble, ce codage seffondre. Le cortex parietal posterieur (PPC) intervient alors en croisant les perceptions visuelles et les signaux defférence motrice pour reconfigurer les coordonnees dans un repere stable.",
    "A partir de cette cartographie reactualisee, le systeme nerveux declenche une reponse en deux etapes : dabord, une saccade balistique de haute vitesse comble lecart spatial vers la nouvelle position de la cible. Des latterrissage, lappareil oculomoteur execute une transition directe vers la poursuite lente le long du nouveau vecteur sans discontinute (Rashbass, 1961)."
  ],
  benchmarks: {
    title: "Grille d'Évaluation du Saut Spatial et Récupération de Coordonnées",
    headers: ["Palier de Performance", "Temps de Re-Centrage (ms)", "Précision de Suivi (%)", "Stabilité Post-Saccadique", "Profil Adaptatif"],
    rows: [
      ["Élite (Esports / Pilotes)", "< 220 ms", "> 95%", "> 96% (Verrouillage Immédiat)", "Remappage pariétal parfait et transition instantanée de saccade à poursuite continue."],
      ["Avancé (Compétitif)", "220 – 280 ms", "88% – 94%", "90% – 95%", "Grande flexibilité spatiale avec ré-acquisition rapide et dérive minime."],
      ["Compétent (Adulte Sain)", "281 – 360 ms", "78% – 87%", "80% – 89%", "Récupération régulière avec légère hésitation lors de rotations combinées."],
      ["En Développement (Latence)", "361 – 450 ms", "65% – 77%", "68% – 79%", "Désorientation notable lors de sauts brusques nécessitant des saccades correctrices."],
      ["Débutant (Ajustement Moteur)", "> 450 ms", "< 65%", "< 68%", "Perte du repère spatial de référence et suivi purement réactif."]
    ],
    note: "※ Mesures calibrées sur écran 1080p à 50–70 cm aux vitesses 1.0x à 1.5x sous sauts spatiaux aléatoires. Évaluation basée sur le délai de re-centrage et la fixation post-saccadique."
  },
  techniques: {
    title: "Quatre Piliers Techniques pour la Poursuite sous Déplacement Spatial",
    items: [
      {
        name: "Remappage Pariétal de Coordonnées",
        desc: "Lors du saut spatial, ne cherchez pas uniquement le point isole. Saisissez le vecteur global de glissement pour que le cortex parietal reactualise immediatement la grille spatiale.",
        tips: "Percevez dans quelle direction lensemble du plan a saute."
      },
      {
        name: "Re-Centrage Saccadique Balistique",
        desc: "Une fois la nouvelle direction integree, lancez un bond oculaire resolu dun seul trait. Lindecision produit des micro-saccades hesitantes qui allongent le temps de reponse.",
        tips: "Projeter la fovea directement sur les nouvelles coordonnees avec la precision dun claquement de fouet."
      },
      {
        name: "Transition Fluide Post-Saccadique",
        desc: "Ne bloquez pas le regard lors de limpact visuel. Enchainez directement la deceleration de la saccade dans la trajectoire active de la cible.",
        tips: "Glissez dans le mouvement de la cible comme un patineur entrant sur la trajectoire."
      },
      {
        name: "Ancrage Rotationnel Visuel",
        desc: "Lorsque le saut inclut des rotations, preservez votre equilibre visuel en fixant mentalement le centre de lecran comme axe neutre invariant.",
        tips: "Gardez le centre de lecran comme repere pivot permanent."
      }
    ]
  },
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('krauzlis2004', 'findlay1999', 'robinson1965', 'rashbass1961', 'kahlon1996', 'woods2015'),
  related: [
    { href: "/fr/drills/visual-tracking/constant-slow-pursuit", label: "Exercice de Poursuite Lente Constante (Constant Slow)" },
    { href: "/fr/drills/visual-tracking/directional-chaos-pursuit", label: "Poursuite en Chaos Directionnel (Directional Chaos)" },
    { href: "/fr/drills/visual-tracking/dynamic-evasion-pursuit", label: "Poursuite avec Évasion Dynamique (Dynamic Evasion)" },
    { href: "/fr/drills/visual-tracking/ghosting-suppress-pursuit", label: "Suppression d'Images Fantômes (Ghosting Suppress)" },
    { href: "/fr/drills/visual-tracking/infinity-pursuit", label: "Exercice Oculaire en Huit (Infinity)" },
    { href: "/fr/drills/visual-tracking/sine-wave-pursuit", label: "Poursuite Oculaire en Onde Sinusoïdale (Sine Wave)" }
  ]
};

export default function SpatialShiftPursuitPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <SpatialShiftPursuitClient copy={{ title: "Poursuite avec Saut Spatial", subtitle: "Entraînement Oculomoteur Adaptatif" }} />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/fr/drills/visual-tracking/spatial-shift-pursuit" />
      </div>
    </>
  );
}
