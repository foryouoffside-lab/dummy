import DrillsDirectoryClient from '@/app/drills/DrillsDirectoryClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

export const metadata = {
  title: 'Aim Trainer : 82 Exercices Gratuits | SkillDrills',
  description: '82 exercices en ligne gratuits en 8 catégories : aim trainer FPS, test de réflexes, mémoire, CPS et acuité visuelle directement sur navigateur.',
  keywords: [
    'aim trainer gratuit',
    'entrainement au tir en ligne',
    'test de reflexe en ligne',
    'jeux dentrainement cerebral gratuit',
    'test de memoire gratuit',
    'poursuite visuelle exercices',
    'test cps clic par seconde',
    'entrainer son aim valorant',
    'flick shot entrainement',
    'tracking aim entrainement',
    'test de stroop en ligne',
    'table de schulte en ligne',
    'memoire de travail exercices',
    'vision peripherique entrainement',
    'coordination oeil main test'
  ],
  openGraph: {
    title: 'Aim Trainer : 82 Exercices Gratuits | SkillDrills',
    description: '82 exercices en ligne gratuits en 8 catégories : aim trainer FPS, test de réflexes, mémoire, CPS et acuité visuelle directement sur navigateur.',
    type: 'website',
    url: 'https://skilldrills.online/fr/drills',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Catalogue Complet des 82 Exercices SkillDrills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aim Trainer : 82 Exercices Gratuits | SkillDrills',
    description: '82 exercices en ligne pour la visée, les réflexes, la mémoire et l\'acuité visuelle.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills',
    languages: getAlternateLanguages('/fr/drills'),
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
      "name": "Tous les Exercices",
      "item": "https://skilldrills.online/fr/drills"
    }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Catalogue Complet des 82 Exercices de Performance SkillDrills",
  "description": "Collection scientifique complète de 82 exercices interactifs pour la visée FPS, la vitesse de réaction, la poursuite visuelle, la cognition, la mémoire et la motricité fine.",
  "url": "https://skilldrills.online/fr/drills",
  "inLanguage": "fr",
  "hasPart": DRILLS.map((drill) => {
    const loc = getLocalizedDrill(drill.href, 'fr', drill.name);
    return {
      "@type": "WebApplication",
      "name": loc.name,
      "url": `https://skilldrills.online/fr${drill.href}`,
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "All",
      "browserRequirements": "Nécessite JavaScript et la prise en charge de HTML5 Canvas",
      "description": loc.tagline || drill.description,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR"
      }
    };
  })
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quels principes neuroscientifiques sous-tendent les 82 exercices de SkillDrills ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SkillDrills s'appuie sur des paradigmes validés de neurobiologie motrice et de psychologie cognitive, notamment la Loi de Fitts (arbitrage vitesse-précision), la Loi de Hick (temps de décision face à choix multiples), la théorie d'intégration des caractéristiques visuelles et la plasticité synaptique. Chaque exercice isole des circuits neuromusculaires spécifiques pour induire des adaptations pérennes."
      }
    },
    {
      "@type": "Question",
      "name": "Comment SkillDrills garantit-il une mesure de latence sans décalage dans le navigateur ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La plateforme exploite l'API standard performance.now(), fournissant des horodatages à résolution millisecondaire (environ 1 ms). Grâce à des boucles de rendu matériellement accélérées (requestAnimationFrame) sur Canvas HTML5 et à la Pointer Lock API pour une capture directe de la souris sans accélération artificielle, les goulots d'étranglement de rendu sont éliminés."
      }
    },
    {
      "@type": "Question",
      "name": "Quel protocole d'entraînement quotidien permet d'optimiser la progression ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un entraînement structuré de 15 à 20 minutes par jour avant vos sessions de jeu ou de travail est recommandé : 5 minutes d'échauffement oculomoteur (poursuite de trajectoires), 10 minutes d'exercices moteurs isolés (flick shot ou contrôle micromoteur) et 5 minutes de contrôle inhibiteur ou de mémoire de travail. La régularité quotidienne renforce la myélinisation des voies motrices."
      }
    },
    {
      "@type": "Question",
      "name": "Comment la visée entraînée sur SkillDrills se transfère-t-elle aux FPS comme VALORANT, CS2 et Apex ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nos exercices de visée FPS ciblent les invariants biomoteurs essentiels : freinage balistique de la souris (mouse braking), tenue d'angle (crosshair placement), suivi de cibles en strafe erratique et micro-ajustements. En conservant un ratio de sensibilité identique à votre tapis de souris, la mémoire musculaire se transfère fidèlement en jeu compétitif."
      }
    },
    {
      "@type": "Question",
      "name": "En quoi SkillDrills se distingue-t-il des jeux cérébraux et casuals traditionnels ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Contrairement aux jeux de distraction grand public, SkillDrills utilise des protocoles de laboratoire standardisés (N-Back dual, effet Stroop, grilles de Schulte) assortis de métriques quantitatives rigoureuses. Les utilisateurs bénéficient de percentiles de performance et de distributions physiologiques comparées à des cohortes mondiales."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est l'impact de la fréquence de rafraîchissement de l'écran sur les tests de réflexes ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un écran 60 Hz rafraîchit l'image toutes les 16,6 ms, alors qu'un moniteur 144 Hz (6,9 ms) ou 240 Hz (4,1 ms) réduit considérablement le décalage de trame et le flou cinétique. SkillDrills synchronise ses mesures sur le taux de rafraîchissement natif de votre moniteur, permettant d'exploiter pleinement les écrans de jeu haut de gamme."
      }
    },
    {
      "@type": "Question",
      "name": "Faut-il installer un logiciel ou créer un compte pour s'entraîner sur SkillDrills ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non. Les 82 exercices fonctionnent entièrement côté client dans votre navigateur web. Aucun téléchargement de logiciel ni création de compte obligatoire ne sont requis. Toutes vos performances et données personnelles restent stockées localement dans votre navigateur afin de respecter scrupuleusement votre vie privée."
      }
    },
    {
      "@type": "Question",
      "name": "Les exercices peuvent-ils être pratiqués sur smartphone ou tablette ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les exercices cognitifs, de mémoire, de réflexes tactiles et de recherche visuelle sont pleinement optimisés pour les interfaces tactiles sur mobiles et tablettes. En revanche, pour les modules de visée FPS et de motricité fine au curseur, l'utilisation d'un ordinateur de bureau équipé d'une souris physique est indispensable."
      }
    }
  ]
};

export default function FrenchDrillsDirectoryPage() {
  const faqs = faqSchema.mainEntity.map((item) => ({
    q: item.name,
    a: item.acceptedAnswer.text,
  }));

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
      <DrillsDirectoryClient faqs={faqs} />
    </>
  );
}

