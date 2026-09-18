import StaircaseStepClient from '@/app/drills/visual-tracking/staircase-step/StaircaseStepClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Poursuite Oculaire Verticale – SkillDrills",
  description: "Conditionnez la poursuite oculaire verticale et les saccades delevation sur trajectoires en marches descalier. Entrainement gratuit en ligne.",
  keywords: [
    "entrainement poursuite oculaire verticale",
    "exercice oculaire en escalier",
    "mouvement oculaire vertical saccadique",
    "controle de visee verticale reflexe",
    "gain de vitesse oculaire vertical",
    "stimulation du mesencephale rimlf",
    "stabilite du regard en elevation",
    "entrainement de visee verticale fps",
    "exercice de poursuite en zigzag",
    "focalisation oculaire trajectoires angulaires",
    "agilite oculaire pour sports aeriens",
    "entrainement visuel controle de recul"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/visual-tracking/staircase-step",
    languages: getAlternateLanguages('/drills/visual-tracking/staircase-step'),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Poursuite Oculaire Verticale – SkillDrills",
    description: "Conditionnez la poursuite oculaire verticale et les saccades delevation sur trajectoires en marches descalier. Entrainement gratuit en ligne.",
    url: "https://skilldrills.online/fr/drills/visual-tracking/staircase-step",
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Poursuite Oculaire Verticale – SkillDrills",
    description: "Conditionnez la poursuite oculaire verticale et les saccades delevation sur trajectoires en marches descalier. Entrainement gratuit en ligne.",
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
      "name": "Poursuite en Marches d'Escalier",
      "item": "https://skilldrills.online/fr/drills/visual-tracking/staircase-step"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Poursuite Oculaire Verticale en Escalier",
  "operatingSystem": "Navigateur Web",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "description": "Programme dentrainement oculomoteur vertical stimulant les circuits du mesencephale (riMLF) pour perfectionner le gain de poursuite et les saccades delevation."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Exercice de Poursuite en Marches d'Escalier",
  "url": "https://skilldrills.online/fr/drills/visual-tracking/staircase-step",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "Tous les navigateurs modernes",
  "browserRequirements": "Nécessite le support de JavaScript et HTML5 Canvas"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Staircase Step",
  "description": "Defi visuel de motricite oculaire evaluant la stabilite foveale lors du suivi de cibles traversant des rampes et des marches orthogonales.",
  "genre": ["Entraînement Visuel", "Poursuite Verticale", "Entraînement des Réflexes"],
  "playMode": "SinglePlayer",
  "gamePlatform": "Navigateur Web"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment Entraîner la Poursuite Verticale en Marches d'Escalier",
  "description": "Protocole methodologique pour accroitre le gain de poursuite verticale et reussir les transitions dangles droits sans compensations du cou.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Immobilisez Complètement la Tête",
      "text": "Placez-vous a 50-70 cm de votre ecran et maintenez le menton fixe pour isoler lintervention motrice des muscles oculaires."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Suivez les Rampes Inclinées",
      "text": "Accompagnez la trajectoire diagonale sans sursaut foveal en maintenant une cadence reguliere."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Anticipez les Arêtes des Paliers",
      "text": "Freinez proactivement la poussee oculaire pour eviter de depasser langle droit lors du changement daxe."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Enchaînez en Saccades Rapides d'Élévation",
      "text": "Declenchez une saccade verticale instantanee pour caler fovealement le regard des le debut de la marche suivante."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu'est-ce que l'exercice Staircase Step ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le Staircase Step renforce la poursuite oculaire verticale et les saccades delevation le long de paliers orthogonaux en escalier, activant les noyaux mesencephaliques (Büttner-Ennever & Horn, 1997)."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi la poursuite verticale est-elle plus lente que l'horizontale ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les structures motrices du mesencephale (riMLF et Cajal) presentent physiologiquement un gain de vitesse moindre, un temps de latence superieur et une asymetrie vers le haut (Rottach et al., 1996)."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le role du riMLF dans le regard vertical ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le riMLF abrite les neurones en bouffee qui generent les saccades dacceleration verticale, coordonnant laction des muscles droits superieur et inferieur."
      }
    },
    {
      "@type": "Question",
      "name": "Quel interet pour les jeux de tir nerveux (FPS) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dans des jeux tels qu'Apex Legends ou Overwatch 2, les cibles grimpent et sautent frequemment. Ce drill elimine les hesitations de visee sur les decalages verticaux."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est l'utilite pour les sports de balle (volley, tennis) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Lors de smashes ou de balles hautes, la trajectoire monte en fleche. Developper la poursuite verticale affine le sens du timing aerien et le reperage de la balle."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi doit-on proscrire les mouvements de tete ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bouger le cou compense le travail des muscles de loeil et prive les circuits mesencephaliques de la charge de travail requise pour progresser (Leigh & Zee, 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "A quoi sert le masquage de la trajectoire (Hide Line) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En supprimant le trace visible, le cerveau doit maintenir une projection interne purement anticipatoire de la geometrie des paliers."
      }
    },
    {
      "@type": "Question",
      "name": "L'usage d'un moniteur 144Hz est-il important ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Une frequence elevee permet dafficher nettement les changements daxe a 90 degres, fournissant des stimuli precis aux neurones mesencephaliques (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Cette plateforme est-elle entierement gratuite ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, SkillDrills propose cette plateforme de facon totalement libre et gratuite dans votre navigateur web sans inscription requise."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le volume d'exercice conseille ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "2 a 3 sequences de 45 a 60 secondes par jour (environ 3 a 5 minutes). Les muscles oculaires verticaux satiguent rapidement, privilegiant des efforts courts et denses."
      }
    }
  ]
};

const guideProps = {
  heading: "Bases Scientifiques de la Poursuite Verticale et Contrôle Oculomoteur",
  intro: [
    "Lappareil moteur oculaire humain recourt a des circuits neuroanatomiques rigoureusement dissocies selon que les developpements sopèrent sur le plan horizontal ou vertical. Alors que les trajectoires laterales transitent par la formation reticulaire pontique paramediane (PPRF), la coordination verticale releve de noyaux tres specialises du mesencephale, principalement le noyau interstitiel rostral du faisceau longitudinal median (riMLF) et le noyau de Cajal (Büttner-Ennever & Horn, 1997).",
    "Les analyses cliniques et psychophysiques (Rottach et al., 1996; Ke et al., 2013) attestent que la poursuite oculaire verticale accuse naturellement un gain de vitesse inferieur, des delais de reaction allonges et des dephasages plus notables que son homologue horizontal. En outre, une asymetrie directionnelle majeure apparait : le suivi vers le haut (elevation) samenuise promptement lors des accelerations, appelant des saccades correctrices anticipees.",
    "Lecran large et les activites ordinaires sous-sollicitent constamment laxe vertical de la vision. Lexercice Staircase Step remédie a cette dissymetrie en propulsant le regard sur des profils en zigzag complexes, couplant poursuite fluide sur plans obliques et saccades de re-ciblage nettes sur chaque arrete orthogonale (Collewijn & Tamminga, 1984; Lisberger, 2010)."
  ],
  benchmarks: {
    title: "Grille d'Évaluation de la Poursuite Verticale et Saccades en Paliers",
    headers: ["Palier de Performance", "Vitesse de la Cible", "Précision sur les Arêtes des Marches", "Gain Vertical Estimé", "Centile de Population"],
    rows: [
      ["Élite (Esports / Pilotes)", "3.5x – 5.0x+", "Verrouillage parfait sans dépassement d'arête", "0.92 – 0.98 (synchronisation quasi-instantanée)", "Top 1.5%"],
      ["Avancé (Compétitif)", "2.5x – 3.5x", "Fovéation rapide par micro-saccade unique", "0.85 – 0.92 (regard très stable)", "Top 8%"],
      ["Compétent (Adulte Sain)", "1.8x – 2.5x", "Suivi régulier sur rampes; légère hésitation aux sommets", "0.75 – 0.85 (maîtrise solide)", "Top 25%"],
      ["En Développement (Latence)", "1.2x – 1.8x", "Retard en montée; compensation par le cou", "0.60 – 0.75 (saccades correctrices fréquentes)", "45% Intermédiaires"],
      ["Débutant (Ajustement Moteur)", "0.5x – 1.2x", "Perte de cible aux angles; mouvements de tête parasites", "< 0.60 (saccades désordonnées)", "Palier Initial"]
    ],
    note: "※ Établi d'après les métriques de latence verticale de Rottach et al. (1996) et la dynamique du riMLF (Büttner-Ennever & Horn, 1997) sur écran 1080p à 50–70 cm."
  },
  techniques: {
    title: "Quatre Piliers Techniques pour la Poursuite en Marches d'Escalier",
    items: [
      {
        name: "Immobilisation Cervicale Rigoureuse",
        desc: "Verrouillez lalignement du cou et du menton sur les plongeons et montees afin que les muscles extraoculaires supportent toute la sollicitation motrice.",
        tips: "Conservez le menton fixe pour neutraliser linclination de la tete."
      },
      {
        name: "Freinage Anticipé sur les Arêtes",
        desc: "A l'approche de chaque angle a 90 degres, moderez le flux cinetique oculaire pour eviter de depasser la bifurcation.",
        tips: "Considerez chaque marche comme un rebord ou ralentir avant de tourner."
      },
      {
        name: "Poussée d'Élévation Verticale",
        desc: "La motricite ascendante possedant un gain reflexe inferieur, impulsionez volontairement une force musculaire accrue lors des ascensions de marches.",
        tips: "Donnez une poussee volontaire vers le haut pour compenser la latence deleveation."
      },
      {
        name: "Re-Verrouillage Saccadique Post-Arête",
        desc: "Ne laissez pas le regard marquer de pause a langle de la marche. Relancez instantanement la poursuite foveale sur le plan suivant sans interruption.",
        tips: "Visualisez votre regard sautant de marche en marche avec lassurance dun grimpeur."
      }
    ]
  },
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('buttner1997', 'rottach1996', 'ke2013', 'collewijn1984', 'lisberger2010', 'woods2015'),
  related: [
    { href: "/fr/drills/visual-tracking/constant-slow-pursuit", label: "Exercice de Poursuite Lente Constante (Constant Slow)" },
    { href: "/fr/drills/visual-tracking/directional-chaos-pursuit", label: "Poursuite en Chaos Directionnel (Directional Chaos)" },
    { href: "/fr/drills/visual-tracking/dynamic-evasion-pursuit", label: "Poursuite avec Évasion Dynamique (Dynamic Evasion)" },
    { href: "/fr/drills/visual-tracking/ghosting-suppress-pursuit", label: "Suppression d'Images Fantômes (Ghosting Suppress)" },
    { href: "/fr/drills/visual-tracking/infinity-pursuit", label: "Exercice Oculaire en Huit (Infinity)" },
    { href: "/fr/drills/visual-tracking/sine-wave-pursuit", label: "Poursuite Oculaire en Onde Sinusoïdale (Sine Wave)" }
  ]
};

export default function StaircaseStepPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <StaircaseStepClient copy={{ title: "Poursuite en Marches d'Escalier", subtitle: "Exercice Oculaire Vertical et Saccadique" }} />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/fr/drills/visual-tracking/staircase-step" />
      </div>
    </>
  );
}
