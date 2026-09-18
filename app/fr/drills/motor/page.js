import MotorDrillsClient from '@/app/drills/motor/MotorDrillsClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const motorDrills = DRILLS.filter((d) => d.category === 'motor');

export const metadata = {
  title: 'Précision de Souris & Test CPS en Ligne | SkillDrills',
  description: 'Entraînement moteur et visée en ligne. 9 exercices scientifiques pour vitesse de clic (CPS), main ferme, vitesse de frappe et coordination œil-main.',
  keywords: [
    'test de précision souris en ligne', 'aim trainer gratuit en ligne', 'test cps vitesse de clic',
    'clics par seconde test', 'test tremblement main souris', 'test vitesse frappe clavier en ligne',
    'test ghosting clavier en ligne', 'test chattering clavier mecanique', 'exercices coordination main oeil',
    'contrôle micromoteur souris', 'jitter click test gratuit', 'technique butterfly click entraînement',
    'jeu du fil chaud en ligne', 'améliorer précision souris fps', 'calculateur edpi sensibilité souris'
  ],
  openGraph: {
    title: 'Précision de Souris & Test CPS en Ligne | SkillDrills',
    description: 'Entraînement moteur et visée en ligne. 9 exercices scientifiques pour vitesse de clic (CPS), main ferme, vitesse de frappe et coordination œil-main.',
    type: 'website',
    url: 'https://skilldrills.online/fr/drills/motor',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Précision de Souris et Entraînement Moteur sur SkillDrills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Précision de Souris & Test CPS en Ligne | SkillDrills',
    description: 'Vitesse de clic (CPS), main ferme, test de clavier et visée de précision : 9 exercices scientifiques gratuits dans le navigateur.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/motor',
    languages: getAlternateLanguages('/fr/drills/motor'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/fr" },
    { "@type": "ListItem", "position": 2, "name": "Exercices de Performance", "item": "https://skilldrills.online/fr/drills" },
    { "@type": "ListItem", "position": 3, "name": "Contrôle Moteur & Précision", "item": "https://skilldrills.online/fr/drills/motor" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Précision de Souris & Contrôle Moteur (9 Exercices)",
  "url": "https://skilldrills.online/fr/drills/motor",
  "description": "9 exercices interactifs pour la vitesse de clic (CPS), la visée de précision, la suppression des tremblements, le test clavier et la coordination œil-main.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": motorDrills.map((drill) => {
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
      "name": "Comment les exercices moteurs en ligne renforcent-ils la coordination œil-main ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les exercices de motricité stimulent la boucle sensori-motrice reliant la détection rétinienne dans le cortex visuel, la planification motrice dans le cervelet et la transmission synaptique via le cortex moteur primaire vers la musculature de la main. Les micro-ajustements à haute fréquence réduisent la latence neuromusculaire, permettant d'exécuter des trajectoires motrices précises en moins de 180 ms."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le score moyen de CPS (clics par seconde) et quelles sont les techniques de clic ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Avec la frappe classique à un doigt, la moyenne se situe entre 6 et 8 CPS. Dans l'esport, des techniques spécialisées sont employées : le Jitter Click (vibration volontaire des muscles de l'avant-bras, 10–14 CPS) et le Butterfly Click (martèlement alternatif avec deux doigts, 15–22 CPS). Pour préserver les tendons et éviter les tendinites, il est recommandé de privilégier la fluidité et un rythme régulier sans tension excessive."
      }
    },
    {
      "@type": "Question",
      "name": "Comment le tracé de courbes et le jeu de la main ferme éliminent-ils les tremblements de visée ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les dépassements de cible (overshooting) et les micro-secousses résultent d'un manque de force de freinage des muscles antagonistes. Parcourir des couloirs étroits ou suivre des ondes sinusoïdales impose un contrôle sous-pixel du curseur. Cela renforce les fibres stabilisatrices du poignet et de l'avant-bras, atténuant considérablement les micro-tremblements involontaires."
      }
    },
    {
      "@type": "Question",
      "name": "Qu'énonce la loi de Fitts et comment optimise-t-elle le compromis vitesse-précision ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La loi de Fitts démontre que le temps nécessaire pour atteindre une cible est proportionnel au logarithme du rapport entre la distance et la largeur de la cible (MT = a + b * log2(2D/W)). Une visée experte décompose le geste en une phase balistique initiale rapide (80–90 % de la distance) et une phase de correction visuelle finale pour se caler exactement au centre sans perte de cadence."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi l'indépendance motrice des doigts est-elle cruciale pour la vitesse de frappe au clavier ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sur le plan anatomique, l'annulaire et l'auriculaire partagent des attaches tendineuses communes au niveau des fléchisseurs, limitant leur mobilité autonome. L'entraînement de vitesse au clavier dissocie les représentations motrices corticales de chaque doigt, réduisant le temps de transition et éliminant les frappes parasites lors de cadences d'actions par minute (APM) intenses."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la précision scientifique des mesures de souris et de clavier dans le navigateur ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SkillDrills exploite l'API standard performance.now(), qui offre une résolution chronométrique inférieure à 0,1 milliseconde. Les mesures ne sont contraintes que par le matériel : le taux de rafraîchissement de l'écran (~4,1 ms à 240 Hz) et le polling rate du périphérique (1 ms à 1000 Hz). Cette précision est parfaitement comparable à celle d'un banc d'essai biomécanique en laboratoire."
      }
    },
    {
      "@type": "Question",
      "name": "Comment les DPI, la sensibilité en jeu et l'eDPI modifient-ils le contrôle neuromusculaire ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L'eDPI (produit des DPI du capteur par la sensibilité du jeu) détermine si le mouvement recrute la motricité fine des doigts et du poignet ou la motricité globale du bras et de l'épaule. Une sensibilité élevée permet des demi-tours rapides mais amplifie les tremblements, tandis qu'une sensibilité basse stabilise les trajectoires. Conserver un eDPI constant est fondamental pour l'ancrage des schémas moteurs dans le cervelet."
      }
    },
    {
      "@type": "Question",
      "name": "Quels problèmes le chattering et le ghosting provoquent-ils sur les performances de jeu ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le chattering est un défaut de rebond mécanique des contacteurs provoquant des doubles frappes involontaires, tandis que le ghosting provient d'interférences sur la matrice du circuit imprimé qui ignorent des touches simultanées ou déclenchent des touches fantômes. Notre testeur de clavier analyse le rollover complet (NKRO) et la stabilité des interrupteurs en temps réel afin d'écarter toute anomalie matérielle."
      }
    }
  ]
};

export default function FrenchMotorHubPage() {
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
      <MotorDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}

