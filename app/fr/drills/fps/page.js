import FPSHubClient from '@/app/drills/fps/FPSHubClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const fpsDrills = DRILLS.filter((d) => d.category === 'fps');

export const metadata = {
  title: 'Améliorer son Aim FPS – Aim Trainer en Ligne | SkillDrills',
  description: 'Entraîneur de visée gratuit pour Valorant, CS2 et Apex. 15 exercices de flick shots, tracking, contrôle du recul et réflexes directement sur navigateur.',
  keywords: [
    'améliorer son aim fps', 'entraînement visée valorant', 'cs2 entraînement shoot',
    'flick shots exercices', 'tracking visée fps', 'placement du réticule',
    'sensibilité souris shooter', 'aim trainer en ligne gratuit', 'test réflexe gaming',
    'contrôle du recul en ligne', 'viser bras ou poignet', 'micro ajustements visée',
    'précision souris test', 'calculateur edpi valorant', 'aim trainer navigateur sans téléchargement'
  ],
  openGraph: {
    title: 'Améliorer son Aim FPS – Aim Trainer en Ligne | SkillDrills',
    description: 'Entraîneur de visée gratuit pour Valorant, CS2 et Apex. 15 exercices de flick shots, tracking, contrôle du recul et réflexes directement sur navigateur.',
    type: 'website',
    url: 'https://skilldrills.online/fr/drills/fps',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Aim Trainer FPS en Ligne Gratuit' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Améliorer son Aim FPS – Aim Trainer en Ligne | SkillDrills',
    description: 'Entraîneur de visée gratuit pour Valorant, CS2 et Apex. 15 exercices professionnels sur navigateur.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/fps',
    languages: getAlternateLanguages('/fr/drills/fps'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/fr" },
    { "@type": "ListItem", "position": 2, "name": "Catalogue des Exercices", "item": "https://skilldrills.online/fr/drills" },
    { "@type": "ListItem", "position": 3, "name": "Visée FPS", "item": "https://skilldrills.online/fr/drills/fps" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Aim Trainer FPS Gratuit – Centre d'Entraînement en Ligne",
  "url": "https://skilldrills.online/fr/drills/fps",
  "description": `15 exercices professionnels de visée pour Valorant, CS2 et Apex Legends. Flicks balistiques, tracking continu, contrôle du recul, rotations 180° et réflexes. Sans téléchargement ni inscription.`,
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": fpsDrills.map((drill) => {
    const loc = getLocalizedDrill(drill.href, 'fr', drill.name);
    return {
      "@type": "WebApplication",
      "name": loc.name,
      "url": `https://skilldrills.online/fr${drill.href}`
    };
  })
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Comment l'entraînement sur navigateur se transfère-t-il concrètement sur Valorant et CS2 ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dans les jeux de tir tactiques comme Valorant et Counter-Strike 2, le TTK moyen est souvent inférieur à 200 ms : le premier tir et la micro-correction décident de l'issue du duel. Les parties de Deathmatch en jeu imposent de longs temps morts (réapparitions, déplacements passifs), alors qu'un aim trainer dédié concentre plusieurs centaines de mouvements balistiques (flicks) et de freinages précis en seulement 10 minutes. Cette répétition à haute densité consolide les engrammes moteurs au niveau du cortex moteur, libérant l'attention cognitive du joueur pour le placement de réticule (crosshair placement) et la prise d'information tactique en partie compétitive."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la différence fondamentale entre Click-Timing (Flicks), Tracking et Target Switching ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les mécaniques de tir FPS reposent sur trois piliers physiomoteurs distincts : 1) Le Click-Timing / Flicks consiste à projeter rapidement le réticule sur une cible et à valider l'impact au moment exact de l'interception, indispensable pour les fusils semi-automatiques et snipers (Vandal, AK-47, AWP). 2) Le Tracking (poursuite oculaire et motrice) maintient continuellement la mire verrouillée sur une trajectoire dynamique en compensant les changements de vitesse, primordial dans Apex Legends et Overwatch 2. 3) Le Target Switching combine un flick ultra-rapide entre plusieurs cibles avec une stabilisation instantanée, essentiel pour neutraliser des vagues d'ennemis en situation d'embuscade."
      }
    },
    {
      "@type": "Question",
      "name": "Vaut-il mieux viser avec le bras, le poignet ou adopter une technique hybride ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Au niveau compétitif international, l'approche hybride est la norme physiologique : le bras et l'épaule gèrent les grands déplacements spatiaux, les virages à 180° et les recentrages d'urgence ; le poignet effectue les balayages d'amplitude moyenne ; et les doigts (en prise Claw ou Fingertip) exécutent les micro-ajustements sub-pixels ainsi que le contrôle fin du recul vertical. Viser uniquement avec le poignet restreint le champ d'action et augmente drastiquement les risques de tendinite ou de syndrome du canal carpien, tandis que viser uniquement avec le bras manque de la dextérité fine nécessaire aux headshots précis à longue portée."
      }
    },
    {
      "@type": "Question",
      "name": "Comment calculer sa sensibilité optimale et sa distance de rotation (cm/360) ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La métrique universelle pour calibrer sa visée est la distance physique nécessaire pour effectuer un tour complet de 360° (cm/360). Pour les shooters tactiques (Valorant, CS2), une sensibilité basse située entre 35 et 55 cm/360 (soit un eDPI d'environ 200 à 320) offre une stabilité optimale lors des micro-corrections. Pour les fast-FPS et battle royales (Apex Legends, Overwatch 2), une sensibilité moyenne entre 25 et 38 cm/360 favorise la réactivité des rotations sans sacrifier la fluidité du tracking. Le réglage parfait vous permet de compenser un strafe latéral en maintenant votre réticule immobile sur une cible fixe sans tremblement."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi mon viseur tremble-t-il ou dépasse-t-il la cible (overshooting), et comment y remédier ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les tremblements (shakiness) et les dépassements de cible (overshooting) résultent généralement d'une crispation musculaire excessive de l'avant-bras, d'une prise de souris trop serrée ou d'une sensibilité supérieure à votre capacité actuelle de décélération motrice. Pour stabiliser votre visée : 1) utilisez la friction mécanique de votre tapis de souris en appliquant une légère pression vers le bas avec la base de la paume pour freiner net ; 2) intégrez des exercices de poursuite lente et fluide (smoothness drills) afin de relâcher les tensions musculaires ; et 3) réduisez votre sensibilité de 10 % à 15 % pour élargir votre marge de tolérance neuromusculaire."
      }
    },
    {
      "@type": "Question",
      "name": "Un aim trainer en ligne sur navigateur est-il aussi performant qu'une application installée ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolument. SkillDrills utilise l'API standard Pointer Lock du W3C couplée au rendu accéléré par le GPU via HTML5 Canvas. Cette technologie contourne totalement les courbes d'accélération logicielle du système d'exploitation et capture directement les deltas bruts du capteur optique (movementX et movementY) avec une latence d'entrée quasi nulle. Grâce à une boucle physique cadencée à pas de temps fixe indépendante de l'affichage, les exercices garantissent une réactivité 1:1 parfaitement fluide, nativement optimisée pour les écrans 144 Hz, 240 Hz et 360 Hz, sans encombrer votre disque dur."
      }
    },
    {
      "@type": "Question",
      "name": "Qu'est-ce qui prime en match : le placement du réticule (crosshair placement) ou le flick réflexe ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Statistiquement, environ 70 % des duels en jeu de tir tactique sont remportés grâce à un placement préventif rigoureux du réticule à hauteur de tête (crosshair placement) avant même de franchir un angle. Cependant, face à des lignes décalées imprévues (off-angles), des sauts d'agression ou des attaques coordonnées à plusieurs, le pré-aim ne suffit plus. C'est dans ces 30 % de situations dynamiques imprévisibles que la vélocité du flick balistique et la précision de la micro-décélération en moins de 200 ms font la différence entre la survie et l'élimination."
      }
    },
    {
      "@type": "Question",
      "name": "Combien de minutes par jour faut-il s'entraîner pour progresser sans fatigue nerveuse ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les recherches en neurobiologie de l'apprentissage moteur indiquent qu'au-delà de 30 à 40 minutes d'exercices intensifs de motricité fine, la fatigue du système nerveux central entraîne une régression de la précision et favorise l'ancrage de mauvaises habitudes posturales. Le protocole d'entraînement optimal consiste en des sessions quotidiennes ciblées de 15 à 25 minutes, 4 à 5 fois par semaine. Cette stimulation brève mais intense déclenche la myélinisation des voies synaptiques motrices et optimise la rétention musculaire pendant les phases de repos et de sommeil bien plus efficacement que des sessions marathons de plusieurs heures."
      }
    }
  ]
};

export default function FrenchFPSHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FPSHubClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}

