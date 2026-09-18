import CognitiveHubClient from '@/app/drills/cognitive/CognitiveHubClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const cognitiveDrills = DRILLS.filter((d) => d.category === 'cognitive');

export const metadata = {
  title: 'Entraînement Cérébral & Agilité Mentale | SkillDrills',
  description: 'Entraînement cérébral et agilité mentale gratuits en ligne. 8 exercices scientifiques pour la concentration, le test de Stroop et les tables de Schulte.',
  keywords: [
    'entraînement cérébral gratuit', 'jeux de stimulation cognitive', 'exercices de concentration en ligne',
    'test de vitesse de traitement cognitif', 'test de stroop en ligne gratuit', 'table de schulte en ligne',
    'exercices attention divisée', 'muscler sa mémoire de travail', 'jeux de gymnastique cérébrale',
    'exercices fonctions exécutives', 'flexibilité cognitive exercices', 'exercices concentration tdah adulte',
    'entraînement cognitif esport', 'agilité mentale exercices gratuits', 'jeux pour stimuler la mémoire senior'
  ],
  openGraph: {
    title: 'Entraînement Cérébral & Agilité Mentale | SkillDrills',
    description: 'Entraînement cérébral et agilité mentale gratuits en ligne. 8 exercices scientifiques pour la concentration, le test de Stroop et les tables de Schulte.',
    type: 'website',
    url: 'https://skilldrills.online/fr/drills/cognitive',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Entraînement Cérébral et Exercices Cognitifs sur SkillDrills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Entraînement Cérébral & Agilité Mentale | SkillDrills',
    description: 'Améliorez votre concentration, contrôle inhibiteur, test de Stroop et tables de Schulte avec 8 exercices scientifiques dans le navigateur.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/cognitive',
    languages: getAlternateLanguages('/fr/drills/cognitive'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/fr" },
    { "@type": "ListItem", "position": 2, "name": "Exercices de Performance", "item": "https://skilldrills.online/fr/drills" },
    { "@type": "ListItem", "position": 3, "name": "Entraînement Cérébral & Cognitif", "item": "https://skilldrills.online/fr/drills/cognitive" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Entraînement Cérébral & Jeux Cognitifs (8 Exercices)",
  "url": "https://skilldrills.online/fr/drills/cognitive",
  "description": "8 exercices neuroscientifiques interactifs pour développer l'attention sélective, le contrôle inhibiteur, la vitesse de traitement et les tables de Schulte.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": cognitiveDrills.map((drill) => {
    const loc = getLocalizedDrill(drill.href, 'fr', drill.name);
    return {
      "@type": "WebApplication",
      "name": loc.name,
      "url": `https://skilldrills.online/fr${drill.href}`,
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5 Canvas.",
      "description": loc.tagline || drill.description,
    };
  })
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu'est-ce que l'entraînement cognitif et comment renforce-t-il les capacités mentales ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L'entraînement cognitif repose sur un ensemble d'exercices structurés issus des neurosciences cognitives, conçus pour stimuler et renforcer des réseaux neuronaux spécifiques tels que la mémoire de travail, l'attention sélective et la vitesse de traitement de l'information. La pratique répétée induit une plasticité synaptique au sein du cortex préfrontal et pariétal, augmentant la résistance à la fatigue mentale, la prise de décision rapide sous pression et la clarté conceptuelle."
      }
    },
    {
      "@type": "Question",
      "name": "Quels sont les domaines cognitifs fondamentaux entraînés par ces exercices ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La suite SkillDrills cible cinq piliers majeurs des fonctions exécutives : la vitesse de traitement perceptif (temps de reconnaissance et de catégorisation visuelle), le contrôle inhibiteur (capacité à réprimer les réponses impulsives automatiques via le test de Stroop), l'attention divisée (traitement parallèle de flux d'informations concurrents), l'exploration visuelle périphérique avec les tables de Schulte, et la flexibilité cognitive (basculement fluide entre des ensembles de règles distincts)."
      }
    },
    {
      "@type": "Question",
      "name": "Comment fonctionne le test de Stroop et pourquoi est-il essentiel pour l'attention ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mis au point par le psychologue John Ridley Stroop en 1935, l'effet Stroop quantifie l'interférence cognitive lorsque le sens sémantique d'un mot (par exemple VERT) entre en conflit avec la couleur physique de sa police (par exemple rouge). Résoudre ce conflit mobilise le cortex cingulaire antérieur et le cortex préfrontal dorsolatéral afin d'inhiber le réflexe automatique de lecture et de privilégier l'identification chromatique, renforçant ainsi la maîtrise de soi et la concentration ciblée."
      }
    },
    {
      "@type": "Question",
      "name": "Quels sont les bénéfices de la table de Schulte pour la vitesse de lecture et le champ visuel ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La table de Schulte est une matrice numérique développée par Walter Schulte pour évaluer l'attention soutenue et l'amplitude du champ visuel périphérique. En fixant le centre de la grille tout en repérant les nombres en ordre séquentiel à l'aide de la vision périphérique, le cerveau apprend à élargir sa fenêtre d'attention visuelle sans saccades oculaires superflues, une compétence clé pour la lecture rapide, l'aviation et le repérage de cibles dans les jeux vidéo."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la durée d'entraînement recommandée pour observer des progrès mesurables ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les protocoles en neuro-ergonomie préconisent des séances courtes et régulières plutôt que de longues sessions éprouvantes. Une routine de 15 à 20 minutes par jour, 3 à 5 fois par semaine, suffit à stimuler la plasticité cérébrale sans générer de saturation cognitive. Intégrer ces exercices en guise d'échauffement avant une session de travail intense ou une compétition de jeu vidéo prépare de manière optimale les circuits de vigilance."
      }
    },
    {
      "@type": "Question",
      "name": "Les exercices cérébraux en ligne apportent-ils un réel avantage en compétition esport ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolument. Dans les jeux vidéo compétitifs à haute intensité, les joueurs doivent constamment traiter les alertes de la minicarte, anticiper les trajectoires adverses et exécuter des arbitrages tactiques en quelques dizaines de millisecondes. Développer le contrôle inhibiteur évite les réactions impulsives néfastes, tandis que l'entraînement de l'attention partagée permet de surveiller plusieurs menaces simultanées sans perte de précision."
      }
    },
    {
      "@type": "Question",
      "name": "Ces exercices conviennent-ils aux enfants, aux adultes et aux personnes âgées ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, les exercices de SkillDrills s'adaptent naturellement à tous les profils grâce à une mesure objective basée sur la précision et le temps de réaction en millisecondes. Chez les adolescents et adultes actifs, ils aiguisent la vitesse d'exécution et l'attention soutenue ; chez les personnes éprouvant des difficultés de concentration, ils structurent l'effort mental ; et chez les seniors, ils renforcent la réserve cognitive pour préserver l'autonomie intellectuelle."
      }
    },
    {
      "@type": "Question",
      "name": "Faut-il du matériel spécifique pour réaliser ces tests cognitifs ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aucun téléchargement ni installation n'est nécessaire : tous les drills s'exécutent directement dans le navigateur à 60-120 images par seconde. Pour des résultats chronométriques d'une fiabilité maximale, il est conseillé d'utiliser une souris réactive ou un écran tactile réactif, de désactiver l'accélération matérielle du pointeur dans les paramètres système et de fermer les onglets gourmands en arrière-plan."
      }
    }
  ]
};

export default function FrenchCognitiveHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CognitiveHubClient faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))} />
    </>
  );
}

