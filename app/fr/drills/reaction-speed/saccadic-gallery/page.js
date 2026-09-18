import SaccadicGalleryClient from '@/app/drills/reaction-speed/saccadic-gallery/SaccadicGalleryClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — fr-FR (reaction-speed / saccadic-gallery)
// PRIMARY DOMESTIC: "exercices saccadiques" / "mouvements saccadiques"
// SECONDARY / LSI:
//   "entraînement saccadique" / "sauts oculaires rapides" / "balayage visuel"
//   "agilité oculaire" / "vitesse de réaction visuelle"
// ============================================================

export const metadata = {
  title: 'Exercices Saccadiques – Mouvements Oculaires | SkillDrills',
  description:
    'Exercices saccadiques gratuits en ligne. Entraînez les sauts oculaires rapides entre cibles pour accélérer le balayage visuel et l acquisition de cibles.',
  keywords: [
    'exercices saccadiques',
    'mouvements saccadiques',
    'entraînement saccadique',
    'sauts oculaires rapides',
    'balayage visuel',
    'agilité oculaire',
    'vitesse de réaction visuelle',
    'coordination oculaire',
    'acquisition de cibles',
    'fixation fovéale',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/reaction-speed/saccadic-gallery',
    languages: getAlternateLanguages('/drills/reaction-speed/saccadic-gallery'),
  },
  openGraph: {
    title: 'Exercices Saccadiques – Mouvements Oculaires | SkillDrills',
    description:
      'Exercices saccadiques gratuits en ligne. Entraînez vos sauts oculaires pour développer votre agilité visuelle.',
    type: 'article',
    url: 'https://skilldrills.online/fr/drills/reaction-speed/saccadic-gallery',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Exercices Saccadiques – Mouvements Oculaires | SkillDrills',
    description:
      'Exercices saccadiques gratuits dans le navigateur. Améliorez la vitesse de vos sauts oculaires et vos réflexes.',
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills Accueil', item: 'https://skilldrills.online/fr' },
    { '@type': 'ListItem', position: 2, name: 'Hub des Exercices', item: 'https://skilldrills.online/fr/drills' },
    { '@type': 'ListItem', position: 3, name: 'Vitesse de Réaction', item: 'https://skilldrills.online/fr/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'Exercices Saccadiques', item: 'https://skilldrills.online/fr/drills/reaction-speed/saccadic-gallery' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Exercices Saccadiques en Ligne – Entraînement Oculaire',
  alternateName: ['Simulateur de Mouvements Saccadiques', 'Entraînement Saccadique', 'Test d Agilité Oculaire'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description:
    'Outil interactif d entraînement des sauts oculaires rapides (saccades), de la fixation fovéale et de la réactivité visuelle périphérique.',
  browserRequirements: 'Navigateur web moderne avec support HTML5 Canvas et JavaScript',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Exercices Saccadiques — Mouvements Oculaires | SkillDrills',
  url: 'https://skilldrills.online/fr/drills/reaction-speed/saccadic-gallery',
  description:
    'Entraînement saccadique gratuit pour développer la vitesse de saut oculaire et l acquisition fovéale directement dans le navigateur.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'Nécessite un navigateur moderne avec JavaScript activé.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: 'Mouvements saccadiques, Sauts oculaires, Fixation fovéale, Balayage visuel, Temps de réaction',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Exercices Saccadiques - Jeu de Réflexes Oculaires',
  url: 'https://skilldrills.online/fr/drills/reaction-speed/saccadic-gallery',
  description: 'Jeu interactif pour mesurer et affûter la vitesse des sauts oculaires et les réflexes visuels.',
  genre: ['Vision Training', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Comment réaliser des exercices saccadiques et accélérer les sauts des yeux',
  description: 'Protocole pour optimiser la transition du regard entre cibles et réduire la latence saccadique.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Posture et fixation centrale',
      text: 'Asseyez-vous à 50–70 cm de l écran et fixez le repère de départ au centre.',
      url: 'https://skilldrills.online/fr/drills/reaction-speed/saccadic-gallery#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Détecter l éclair périphérique',
      text: 'Gardez la tête immobile et détectez l apparition de la cible dans votre vision périphérique sans tourner le cou.',
      url: 'https://skilldrills.online/fr/drills/reaction-speed/saccadic-gallery#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Déclencher le saut saccadique',
      text: 'Propulsez vos deux yeux de façon balistique et rectiligne vers les coordonnées de la cible.',
      url: 'https://skilldrills.online/fr/drills/reaction-speed/saccadic-gallery#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Verrouiller la fovéa et cliquer',
      text: 'Cadrez nettement le centre de la cible et cliquez instantanément pour mesurer la latence.',
      url: 'https://skilldrills.online/fr/drills/reaction-speed/saccadic-gallery#step-4',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-15',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Que sont les exercices saccadiques ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ce sont des exercices visuels structurés pour développer la vitesse, la précision et le temps de réaction des sauts balistiques des yeux (saccades) entre différents points du champ visuel.',
      },
    },
    {
      '@type': 'Question',
      name: 'À quelle vitesse se déplace une saccade chez l être humain ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La vitesse angulaire maximale d une saccade atteint 200 à 700 degrés par seconde, ce qui en fait l un des mouvements biologiques les plus rapides du corps humain (Rayner, 1998).',
      },
    },
    {
      '@type': 'Question',
      name: 'Que sont les saccades expresses (Fischer & Boch, 1984) ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les saccades expresses sont des mouvements oculaires à latence ultra-courte (~100–120 ms) déclenchés directement par les voies sous-corticales du colliculus supérieur lorsque l inhibition de fixation est levée.',
      },
    },
    {
      '@type': 'Question',
      name: 'En quoi l entraînement saccadique aide-t-il les joueurs de FPS et de jeux d action ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dans des titres comme Valorant ou CS2, des saccades vives permettent de sonder les recoins, consulter la minicarte et viser des adversaires surgissant avec un minimum de temps d interruption visuelle.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qu est-ce que la suppression saccadique ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'C est le mécanisme par lequel le cerveau suspend brièvement la perception visuelle pendant le saut de l œil (20–40 ms) afin d éviter le flou de mouvement et les vertiges.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qu appelle-t-on dysmétrie saccadique ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Elle survient lorsque l œil s arrête avant la cible (hypométrie) ou la dépasse (hypermétrie), imposant des micro-saccades de correction qui font perdre de précieux centièmes de seconde.',
      },
    },
    {
      '@type': 'Question',
      name: 'Le taux de rafraîchissement de l écran influence-t-il l entraînement ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Les écrans 144 Hz ou 240 Hz affichent les images avec seulement 4 à 7 ms de latence (Woods et al., 2015), permettant à la rétine de déceler l apparition des cibles plus tôt.',
      },
    },
    {
      '@type': 'Question',
      name: 'Les exercices saccadiques peuvent-ils améliorer la vitesse de lecture ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Une commande saccadique fluide facilite les retours à la ligne et diminue les régressions involontaires du regard lors de la lecture rapide.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la durée d entraînement quotidien recommandée ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Une séance de 5 à 10 minutes par jour est idéale. Pratiquer trop longtemps engendre de la fatigue oculaire ; des séries courtes et intensives sont bien plus profitables.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ce simulateur saccadique est-il gratuit et en ligne ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. L exercice SkillDrills est 100 % gratuit, s exécute directement dans le navigateur sans installation et horodate les événements avec l API High Resolution Time (performance.now()).',
      },
    },
  ],
};

const saccadicGuide = {
  heading: 'Guide des Exercices Saccadiques : Vélocité des Sauts Oculaires et Fixation Fovéale',
  intro: [
    'Les mouvements saccadiques sont des sauts balistiques ultrarapides transportant le centre de la vision fovéale d une coordonnée à une autre (Rayner, 1998 ; Fischer & Boch, 1984).',
    'Avec des vitesses angulaires dépassant 700°/s, le cerveau active la suppression saccadique pour éviter tout flou perceptuel. Si les yeux ne se posent pas exactement sur la cible (dysmétrie saccadique), des micro-saccades correctrices sont requises, ce qui ralentit la réaction. Cet exercice entraîne un freinage oculaire net dès le premier bond.',
    'Protocole de mesure web : tous les calculs sont réalisés localement via la High Resolution Time API (performance.now()). Tenez compte des latences de votre écran (~16,7 ms à 60 Hz, ~6,9 ms à 144 Hz et ~4,1 ms à 240 Hz ; Woods et al., 2015) et du taux d interrogation de la souris. Les écarts sous 5 ms constituent du bruit expérimental.',
    'Entraînez-vous régulièrement sur le même matériel pour évaluer fidèlement vos gains physiologiques en agilité oculaire.',
  ],
  benchmarks: {
    title: 'Paliers de Performance en Latence Saccadique et Précision',
    headers: ['Latence Saccadique', 'Niveau de Performance', 'Dynamique du Saut Oculaire', 'Contexte Fonctionnel', 'Axe de Travail Prioritaire'],
    rows: [
      ['< 130 ms', 'Palier 1 (Saccades Expresses / Pro)', 'Déclenchement sous-cortical via le colliculus supérieur ; inhibition minime', 'Sportifs d élite et pilotes de chasse (Fischer & Boch, 1984)', 'Développer l amplitude maximale du saut'],
      ['130 – 170 ms', 'Palier 2 (Élite)', 'Initiation corticale véloce ; aucun temps mort de fixation', 'Compétiteurs de haut niveau en sports de réaction', 'Consolider la précision d arrêt sans dépasser la cible'],
      ['171 – 220 ms', 'Palier 3 (Avancé / Standard)', 'Latence physiologique normale chez l adulte en bonne santé', 'Moyenne de référence pour adulte (Rayner, 1998)', 'Élargir le champ de perception périphérique'],
      ['221 – 280 ms', 'Palier 4 (Intermédiaire)', 'Délai pour lever la fixation précédente ; légère hésitation', 'Fatigue passagère ou récupération incomplète', 'Appliquer la règle 20-20-20 pour soulager les yeux'],
      ['> 280 ms', 'Palier 5 (Base / Dysmétrie)', 'Dysmétrie saccadique notable avec plusieurs corrections', 'Muscles oculaires fatigués ou dispersion visuelle', 'Privilégier un atterrissage exact avant de chercher la vitesse'],
    ],
    note: 'Classification fondée sur la littérature scientifique en oculomotricité (Rayner, 1998 ; Fischer & Boch, 1984 ; Leigh & Zee, 2015) adaptée aux affichages numériques (Woods et al., 2015).',
  },
  techniques: {
    title: 'Techniques pour Accélérer les Sauts Oculaires',
    items: [
      {
        name: 'Isoler les Mouvements de la Tête',
        desc: 'Mobilisez uniquement les globes oculaires en maintenant la tête et le cou immobiles. Les sauts purement oculaires sont deux fois plus rapides que les mouvements de tête combinés.',
        tips: 'Placez la main sous le menton pour vous assurer que le visage ne tourne pas.',
      },
      {
        name: 'Détection Périphérique Anticipée',
        desc: 'Utilisez la rétine périphérique pour repérer la position de la cible avant de propulser le regard fovéal.',
        tips: 'Gardez un regard souple et détendu au centre de l écran.',
      },
      {
        name: 'Freinage Oculaire Net (Stopping Power)',
        desc: 'Évitez de dépasser la cible ou de freiner trop court : bloquer le regard en plein centre supprime les saccades correctrices.',
        tips: 'La netteté de l arrêt fait gagner plus de temps que la précipitation.',
      },
      {
        name: 'Hydratation et Repos des Yeux',
        desc: 'La concentration prolongée devant un écran réduit le clignement de 60 %, entraînant sécheresse et ralentissement musculaire.',
        tips: 'Clignez délibérément entre les manches et regardez au loin.',
      },
    ],
  },
  steps: [
    'Installez-vous face au centre de l écran à environ 60 cm de distance.',
    'Démarrez l exercice et fixez le point de repère initial.',
    'Dès qu une cible s illumine dans le champ visuel, projetez immédiatement vos yeux dessus.',
    'Cadrez le centre de la cible et cliquez pour enregistrer la latence.',
    'Enchaînez les séries pour consulter votre latence saccadique moyenne.',
  ],
  audience: 'Joueurs d esports (Valorant, CS2, Overwatch), pilotes, athlètes de sports de vitesse et toute personne souhaitant affûter sa vivacité oculaire.',
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('rayner1998', 'fischer1984', 'leigh2015', 'woods2015'),
  related: [
    { href: '/fr/drills/reaction-speed', label: 'Hub Vitesse de Réaction' },
    { href: '/fr/drills/reaction-speed/reaction-time-test', label: 'Test de Temps de Réaction' },
    { href: '/fr/drills/reaction-speed/reflex-training-drill', label: 'Entraînement des Réflexes (Multi-Cibles)' },
    { href: '/fr/drills/reaction-speed/visual-tracking-speed-test', label: 'Test de Poursuite Visuelle' },
  ],
};

export default function FrenchSaccadicGalleryPage() {
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
      <SaccadicGalleryClient copy={{ title: 'Exercices Saccadiques' }} />
      <DrillGuide guide={saccadicGuide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="reaction-speed" currentHref="https://skilldrills.online/fr/drills/reaction-speed/saccadic-gallery" />
      </div>
    </>
  );
}
