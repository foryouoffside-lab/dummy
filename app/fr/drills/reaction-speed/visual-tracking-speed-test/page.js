import VisualTrackingSpeedTestWrapper from '@/app/drills/reaction-speed/visual-tracking-speed-test/VisualTrackingSpeedTestWrapperLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — fr-FR (reaction-speed / visual-tracking-speed-test)
// PRIMARY DOMESTIC: "test de poursuite visuelle" / "acuité visuelle dynamique"
// SECONDARY / LSI:
//   "test de réflexes visuels" / "poursuite oculaire lente"
//   "vitesse de réaction visuelle" / "coordination œil main"
// ============================================================

export const metadata = {
  title: 'Test de Poursuite Visuelle – Agilité Visuelle | SkillDrills',
  description:
    'Test de poursuite visuelle gratuit en ligne. Suivez les cibles en mouvement pour mesurer votre acuité dynamique et votre vitesse de réaction motrice.',
  keywords: [
    'test de poursuite visuelle',
    'acuité visuelle dynamique',
    'test de réflexes visuels',
    'poursuite oculaire lente',
    'vitesse de réaction visuelle',
    'coordination œil main',
    'saccades de rattrapage',
    'agilité visuelle',
    'temps de réaction visuel',
    'test de réflexes',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/reaction-speed/visual-tracking-speed-test',
    languages: getAlternateLanguages('/drills/reaction-speed/visual-tracking-speed-test'),
  },
  openGraph: {
    title: 'Test de Poursuite Visuelle – Agilité & Réflexes | SkillDrills',
    description:
      'Test de poursuite visuelle et réflexe en ligne gratuit. Mesurez la fluidité de vos mouvements oculaires et vos réflexes.',
    url: 'https://skilldrills.online/fr/drills/reaction-speed/visual-tracking-speed-test',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Test de Poursuite Visuelle – Agilité & Réflexes | SkillDrills',
    description:
      'Test gratuit de poursuite visuelle et d acuité dynamique. Entraînez vos yeux et vos réflexes dans votre navigateur.',
  },
  robots: { index: true, follow: true },
};

// --- Structured Data Schemas ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills Accueil', item: 'https://skilldrills.online/fr' },
    { '@type': 'ListItem', position: 2, name: 'Hub des Exercices', item: 'https://skilldrills.online/fr/drills' },
    { '@type': 'ListItem', position: 3, name: 'Vitesse de Réaction', item: 'https://skilldrills.online/fr/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'Test de Poursuite Visuelle', item: 'https://skilldrills.online/fr/drills/reaction-speed/visual-tracking-speed-test' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Test de Poursuite Visuelle – Agilité et Réflexes Oculaires',
  alternateName: ['Test d Acuité Visuelle Dynamique', 'Test de Poursuite Oculaire', 'Simulateur de Réflexes Visuels'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description:
    'Outil interactif d évaluation de la poursuite oculaire continue, des saccades de rattrapage et de la vitesse de ré-acquisition cinétique.',
  browserRequirements: 'Navigateur web moderne avec support JavaScript (Chrome, Edge, Safari, Firefox)',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Test de Poursuite Visuelle — Agilité & Réflexes | SkillDrills',
  url: 'https://skilldrills.online/fr/drills/reaction-speed/visual-tracking-speed-test',
  description:
    'Test de réflexes visuels gratuit pour entraîner la poursuite oculaire lente, l acuité dynamique et la coordination œil-main directement dans le navigateur.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'Nécessite un navigateur web moderne avec JavaScript activé.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: 'Poursuite visuelle, Acuité visuelle dynamique, Saccades de rattrapage, Vitesse de réaction motrice, Coordination œil-main',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Test de Poursuite Visuelle - Jeu d Agilité et de Réflexes',
  url: 'https://skilldrills.online/fr/drills/reaction-speed/visual-tracking-speed-test',
  description: 'Jeu interactif pour mesurer la vitesse de poursuite visuelle et les réflexes oculomoteurs.',
  genre: ['Reflex Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Comment entraîner sa vitesse de poursuite visuelle',
  description: 'Protocole pour améliorer le suivi fovéal et réduire la latence des saccades de correction.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Lancer l exercice',
      text: 'Cliquez sur « Commencer l exercice » pour afficher l arène de poursuite en plein écran.',
      url: 'https://skilldrills.online/fr/drills/reaction-speed/visual-tracking-speed-test#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Fixer la cible en mouvement',
      text: 'Maintenez la fovéa oculaire fixée sur la sphère mobile pendant qu elle glisse sur l écran.',
      url: 'https://skilldrills.online/fr/drills/reaction-speed/visual-tracking-speed-test#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Intercepter les changements d angle soudains',
      text: 'Dès que la cible accélère ou rebondit, déclenchez une saccade de rattrapage pour recentrer votre curseur.',
      url: 'https://skilldrills.online/fr/drills/reaction-speed/visual-tracking-speed-test#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Consulter la latence de ré-acquisition',
      text: 'Examinez votre temps moyen de ré-acquisition (en millisecondes) et votre score de stabilité oculaire.',
      url: 'https://skilldrills.online/fr/drills/reaction-speed/visual-tracking-speed-test#step-4',
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
      name: 'Que mesure ce test de poursuite visuelle ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Il évalue la régularité et la précision avec lesquelles les yeux suivent des objets mobiles dans l espace (poursuite oculaire lente) et la rapidité avec laquelle ils effectuent des saccades de rattrapage lors d un décrochage soudain.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la différence entre poursuite oculaire lente et saccades ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La poursuite oculaire lente (Smooth Pursuit) est un mouvement continu maintenant l image d une cible mobile sur la fovéa (jusqu à 30°–60°/s ; Krauzlis, 2004). Les saccades sont des sauts balistiques ultrarapides (200°–700°/s) qui repositionnent le regard quand la cible accélère brusquement (Rashbass, 1961).',
      },
    },
    {
      '@type': 'Question',
      name: 'Un examen ophtalmologique classique (échelle de Snellen) détecte-t-il les troubles de poursuite ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Non. Les bilans visuels standards mesurent l acuité statique sur des lettres immobiles. Ils n évaluent pas le contrôle oculomoteur dynamique ni la vitesse de ré-acquisition cinétique.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quels facteurs dégradent la vitesse de suivi visuel ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La fatigue des muscles extraoculaires liée au temps d écran prolongé, le manque de sommeil, la sécheresse oculaire et la surcharge cognitive centrale ralentissent notablement les réflexes oculomoteurs.',
      },
    },
    {
      '@type': 'Question',
      name: 'En quoi la poursuite visuelle influence-t-elle l esport et les sports de balle ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En compétition sportive (tennis, baseball) et dans les jeux de tir (Valorant, Apex, CS2), la réactivité de poursuite dicte la vitesse à laquelle le joueur repère une trajectoire évasive et aligne son réticule (Land & McLeod, 2000).',
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on améliorer sa vitesse de poursuite visuelle par l entraînement ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. La pratique répétée renforce les voies corticales entre l aire visuelle MT/V5, les champs oculaires frontaux (FEF) et le cervelet, diminuant la latence des saccades et affinant la précision du geste.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qu est-ce qu une saccade de rattrapage (Catch-up Saccade) ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lorsque la cible dépasse la vélocité maximale du système de poursuite lente, l image glisse hors de la fovéa. Le cerveau déclenche alors une saccade brève et puissante pour combler l écart de position et recentrer la cible (Rashbass, 1961).',
      },
    },
    {
      '@type': 'Question',
      name: 'Le taux de rafraîchissement de l écran (Hz) a-t-il un impact ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Un moniteur 60 Hz rafraîchit l image toutes les 16,7 ms, tandis qu un 144 Hz descend à 6,9 ms et un 240 Hz à 4,1 ms (Woods et al., 2015). Des fréquences élevées réduisent le flou de mouvement et rendent la trajectoire bien plus fluide.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien de temps faut-il s entraîner par jour ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Une pratique ciblée de 3 à 5 minutes par jour, une à deux fois par jour, suffit amplement à stimuler les circuits neuronaux sans fatiguer excessivement la musculature oculaire.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ce test de poursuite visuelle est-il gratuit et sans téléchargement ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. L outil SkillDrills est 100 % gratuit, fonctionne directement dans votre navigateur web et horodate chaque événement grâce à l API High Resolution Time (performance.now()).',
      },
    },
  ],
};

const visualTrackingGuide = {
  heading: 'Guide de Poursuite Visuelle : Mouvements Oculaires et Ré-Acquisition de Cibles',
  intro: [
    'La vitesse de poursuite visuelle est la vitesse à laquelle les systèmes oculomoteur et moteur accompagnent les mouvements dynamiques, détectent les anomalies de trajectoire et réalignent la mise au point fovéale (Krauzlis, 2004 ; Land & McLeod, 2000).',
    'Ce test mesure votre réponse face aux accélérations et déviations imprévisibles de la cible. Tant que l objet se déplace à vitesse régulière, les yeux opèrent en poursuite oculaire lente (Smooth Pursuit). Si la trajectoire se brise brusquement, la poursuite s interrompt et le système nerveux central envoie une saccade de rattrapage (Rashbass, 1961). Notre logiciel consigne ces intervalles de ré-acquisition à l aide de l horloge de haute précision performance.now().',
    'Facteurs de mesure et environnement matériel : l ensemble des calculs s exécute en local sur votre machine. Les minuteurs de navigateurs sont quantifiés à environ 1 ms pour des raisons de sécurité, et le moniteur applique sa propre quantification (~16,7 ms à 60 Hz, ~6,9 ms à 144 Hz et ~4,1 ms à 240 Hz ; Woods et al., 2015). Le taux d interrogation de la souris (polling rate) ajoute ~8 ms à 125 Hz contre ~1 ms à 1000 Hz. Les variations inférieures à 5 ms relèvent donc du bruit de mesure.',
    'Réalisez vos sessions sur le même équipement pour observer avec rigueur votre progression neuromusculaire réelle au fil des semaines.',
  ],
  benchmarks: {
    title: 'Paliers de Performance en Poursuite Visuelle et Ré-Acquisition',
    headers: ['Latence de Ré-Acquisition', 'Classification Oculomotrice', 'Mécanique de Poursuite et Saccades', 'Contexte Fonctionnel', 'Axe de Travail Prioritaire'],
    rows: [
      ['< 180 ms', 'Ré-Acquisition Prédictive Rapide', 'Recentrage fovéal instantané ; projection de trajectoire affûtée', 'Pilotes d élite / Chasse / Joueurs professionnels (Land & McLeod, 2000)', 'Préserver le relâchement musculaire sur les longues sessions'],
      ['180 – 230 ms', 'Poursuite Dynamique à Haute Vélocité', 'Retard de saccade minimal et synchronisation rapide de la vitesse', 'Sports de balle compétitifs / Haut niveau esport (Krauzlis, 2004)', 'Ajuster la vision périphérique pour éviter les dépassements'],
      ['231 – 290 ms', 'Poursuite Standard Normative', 'Latence physiologique attendue pour une ré-acquisition visuelle chez l adulte', 'Niveau de référence pour adulte en bonne santé', 'Renforcer les muscles droits extraoculaires pour les transitions rapides'],
      ['291 – 360 ms', 'Retardée / Fatigue Visuelle', 'Délai sensible avant le déclenchement de la saccade ; le curseur traîne', 'Temps d écran excessif, yeux secs ou contraste insuffisant', 'Appliquer la règle 20-20-20 ; vérifier le taux de rafraîchissement'],
      ['> 360 ms', 'Poursuite Dysmétrique / En Développement', 'Multiples micro-saccades nécessaires pour recentrer la cible', 'Manque d entraînement oculomoteur ou distractions visuelles', 'Privilégier des trajectoires douces avant d accélérer la cadence'],
    ],
    note: 'Classification fondée sur la littérature scientifique en oculomotricité et poursuite oculaire (Rashbass, 1961 ; Krauzlis, 2004 ; Land & McLeod, 2000) adaptée aux affichages numériques (Woods et al., 2015).',
  },
  techniques: {
    title: 'Techniques d Optimisation de la Poursuite Visuelle',
    items: [
      {
        name: 'Poursuite Lente vs. Saccades de Rattrapage',
        desc: 'À vitesse modérée, gardez un regard détendu et fluide. Déclenchez une saccade vive uniquement lors d un décrochage ou d un rebond imprévu.',
        tips: 'Évitez de deviner la trajectoire à l avance sans confirmation visuelle du vecteur.',
      },
      {
        name: 'Regard Anticipateur (Anticipatory Gaze)',
        desc: 'Plutôt que de fixer l arrière de la cible, placez votre fenêtre d attention légèrement en avant de son axe de déplacement.',
        tips: 'Attendez le rebond effectif sur les bords avant d amorcer votre mouvement.',
      },
      {
        name: 'Décontraction du Poignet et de l Avant-Bras',
        desc: 'Crisper les doigts sur la souris bloque les micro-ajustements indispensables pour intercepter des cibles rapides.',
        tips: 'Respirez calmement et relâchez le poignet entre deux séries.',
      },
      {
        name: 'Amélioration de l Acuité Dynamique (DVA)',
        desc: 'La netteté avec laquelle vous distinguez les cibles mobiles bénéficie d un éclairage d ambiance équilibré et d un écran rapide.',
        tips: 'Activez le taux de rafraîchissement le plus élevé possible (144 Hz ou plus) pour éliminer le flou cinétique.',
      },
    ],
  },
  steps: [
    'Installez-vous confortablement face à votre écran, à environ une longueur de bras.',
    'Cliquez sur « Commencer l exercice » et verrouillez votre regard sur la sphère en mouvement.',
    'Accompagnez la cible de façon fluide tout au long de sa trajectoire de départ.',
    'Dès que la cible change d angle ou de vitesse, réagissez vivement et replacez le curseur au centre.',
    'À la fin du test, analysez votre latence moyenne de ré-acquisition et votre régularité.',
  ],
  audience: 'Athlètes en sports de balle (tennis, hockey, baseball), pilotes de course, joueurs de FPS compétitifs (Valorant, CS2, Overwatch) et toute personne désirant stimuler son acuité visuelle.',
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('krauzlis2004', 'rashbass1961', 'land2000', 'woods2015'),
  related: [
    { href: '/fr/drills/reaction-speed', label: 'Hub Vitesse de Réaction' },
    { href: '/fr/drills/reaction-speed/reaction-time-test', label: 'Test de Temps de Réaction' },
    { href: '/fr/drills/reaction-speed/reflex-training-drill', label: 'Entraînement des Réflexes (Multi-Cibles)' },
    { href: '/fr/drills/reaction-speed/reaction-game', label: 'Jeu de Réflexe et de Réaction' },
  ],
};

export default function FrenchVisualTrackingSpeedTestPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <VisualTrackingSpeedTestWrapper copy={{ title: 'Test de Poursuite Visuelle' }} />
      <DrillGuide guide={visualTrackingGuide} />
    </>
  );
}
