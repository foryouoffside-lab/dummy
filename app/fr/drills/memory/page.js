import MemoryClient from '@/app/drills/memory/MemoryClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const memoryDrills = DRILLS.filter((d) => d.category === 'memory');

export const metadata = {
  title: 'Jeux de Mémoire & Mémoire de Travail | SkillDrills',
  description: "Jeux de mémoire et tests gratuits en ligne. 7 exercices scientifiques pour la mémoire de travail (N-Back), l'empan mnésique et la mémoire visuo-spatiale.",
  keywords: [
    'jeux de mémoire gratuits en ligne', 'muscler sa mémoire de travail', 'test de mémoire à court terme gratuit',
    'test empan mnésique en ligne', 'n-back test en ligne gratuit', 'exercices de mémoire spatiale',
    'exercices pour améliorer la mémoire', 'test mémoire visuelle en ligne', 'test blocs de corsi en ligne',
    'méthode du chunking mémoire', 'stimulation cognitive mémoire adulte', 'exercices pertes de mémoire débutantes',
    'jeux mémoire pour seniors gratuits', 'mémoire et concentration révisions', "esport prise d'information mémoire spatiale"
  ],
  openGraph: {
    title: 'Jeux de Mémoire & Mémoire de Travail | SkillDrills',
    description: "Jeux de mémoire et tests gratuits en ligne. 7 exercices scientifiques pour la mémoire de travail (N-Back), l'empan mnésique et la mémoire visuo-spatiale.",
    type: 'website',
    url: 'https://skilldrills.online/fr/drills/memory',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Jeux de Mémoire et Tests Cognitifs sur SkillDrills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jeux de Mémoire & Mémoire de Travail | SkillDrills',
    description: "Mémoire de travail (N-Back), empan mnésique, rappel de mots et mémoire spatiale : 7 exercices scientifiques dans le navigateur.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/memory',
    languages: getAlternateLanguages('/fr/drills/memory'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/fr" },
    { "@type": "ListItem", "position": 2, "name": "Exercices de Performance", "item": "https://skilldrills.online/fr/drills" },
    { "@type": "ListItem", "position": 3, "name": "Mémoire & Mémoire de Travail", "item": "https://skilldrills.online/fr/drills/memory" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Jeux de Mémoire & Tests Cognitifs (7 Exercices)",
  "url": "https://skilldrills.online/fr/drills/memory",
  "description": "7 exercices neuroscientifiques interactifs pour entraîner la mémoire de travail (N-Back), l'empan mnésique et la mémoire visuo-spatiale.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": memoryDrills.map((drill) => {
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
      "name": "Quelle est la différence entre mémoire à court terme et mémoire de travail ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La mémoire à court terme est un système de stockage passif et temporaire qui retient une quantité limitée d'informations pendant 15 à 30 secondes sans modification. À l'inverse, la mémoire de travail (théorisée par Alan Baddeley et orchestrée par le cortex préfrontal) est un espace d'élaboration actif. Elle permet de maintenir des données tout en les manipulant, en les actualisant et en les combinant en temps réel, comme lors d'un calcul mental complexe ou de l'analyse des déplacements adverses dans une partie compétitive."
      }
    },
    {
      "@type": "Question",
      "name": "L'entraînement N-Back améliore-t-il réellement l'intelligence fluide et la mémoire ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. De nombreuses recherches en neurosciences cognitives (notamment les travaux de Jaeggi et al.) démontrent que les tâches N-Back et Dual N-Back adaptatives stimulent le réseau fronto-pariétal de contrôle exécutif. En obligeant le cerveau à rafraîchir en continu les éléments cibles tout en éliminant les interférences passées, cet entraînement accroît la capacité de rétention active et favorise un transfert positif vers l'intelligence fluide (Gf) et la résolution de problèmes inédits."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est l'empan mnésique numérique normal et comment l'augmenter ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Selon la loi de Miller, l'empan mnésique direct moyen d'un adulte est de 7 ± 2 chiffres, tandis que l'empan envers (qui requiert une manipulation active) se situe autour de 5 ± 1 chiffres. Sans stratégie de regroupement, la capacité brute tourne autour de 4 unités. Pour augmenter significativement vos résultats, la méthode la plus puissante est le chunking (fractionnement) : grouper les chiffres par blocs rythmés de 3 ou 4 en activant la boucle phonologique."
      }
    },
    {
      "@type": "Question",
      "name": "Comment les exercices de mémoire spatiale (grille et tracés) s'appliquent-ils au quotidien ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les exercices de mémoire visuo-spatiale sollicitent directement l'hippocampe, le cortex pariétal et le calepin visuo-spatial. S'entraîner à mémoriser des matrices de blocs (test de Corsi) et des trajectoires en mouvement améliore le sens de l'orientation, la lecture de plans d'architecte, la manipulation mentale d'objets en 3D et le repérage instantané sur la minicarte dans les jeux vidéo compétitifs."
      }
    },
    {
      "@type": "Question",
      "name": "Qu'est-ce que la technique du 'Chunking' (fractionnement) en psychologie cognitive ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le chunking est une stratégie cognitive consistant à regrouper des données isolées en ensembles cohérents ou familiers. Comme la mémoire de travail humaine est limitée par le nombre d'emplacements actifs et non par la quantité d'informations contenue dans chaque emplacement, regrouper une série de 12 chiffres sous forme de 3 dates historiques ou indicatifs téléphoniques permet de tripler la rétention sans surcharger les fonctions exécutives."
      }
    },
    {
      "@type": "Question",
      "name": "Un entraînement régulier de la mémoire protège-t-il contre le déclin cérébral lié à l'âge ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolument. La pratique régulière de tests de mémoire stimule la neuroplasticité et favorise la synaptogenèse dans l'hippocampe, consolidant ainsi la réserve cognitive. Un individu doté d'une solide réserve cognitive compense plus efficacement le vieillissement cérébral physiologique et conserve son autonomie intellectuelle et sa vivacité d'esprit beaucoup plus longtemps."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle durée et quelle fréquence d'entraînement sont préconisées pour des résultats optimaux ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les spécialistes en neuro-ergonomie recommandent des séances ciblées de 15 à 20 minutes, 3 à 5 fois par semaine. Les exercices de mémoire de travail sollicitant fortement les réserves énergétiques cérébrales, des sessions dépassant 25 minutes induisent une fatigue cognitive contre-productive. Des entraînements courts et intenses suivis d'un sommeil profond de qualité assurent une consolidation synaptique pérenne."
      }
    },
    {
      "@type": "Question",
      "name": "Les tests de mémoire en ligne sur navigateur offrent-ils une fiabilité scientifique ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. Les modules SkillDrills transposent fidèlement les protocoles standardisés de la neuropsychologie, tels que l'empan de chiffres de Wechsler, les cubes de Corsi et les paradigmes N-Back informatisés. Grâce à une synchronisation d'affichage et d'interaction calibrée à la milliseconde, ils garantissent une précision rigoureuse digne d'un laboratoire d'évaluation cognitive, sans aucun téléchargement requis."
      }
    }
  ]
};

export default function FrenchMemoryHubPage() {
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
      <MemoryClient faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))} />
    </>
  );
}

