import FPSTrackingTrainerClient from '@/app/drills/reaction-speed/fps-tracking-trainer/FPSTrackingTrainerWrapperLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS – fr-FR (reaction-speed / fps-tracking-trainer)
// PRIMARY DOMESTIC: "Entraînement Tracking FPS" / "Visée de Suivi"
// SECONDARY / LSI:
//   "Visée de Suivi Souris" / "Comment Améliorer son Tracking FPS"
//   "Visée Saccadée Souris Solution" / "Smoothness Aim Entraînement"
// ============================================================

export const metadata = {
  title: 'Entraînement Tracking FPS – Visée de Suivi | SkillDrills',
  description: 'Entraîneur de tracking FPS gratuit en ligne. Maîtrisez la visée de suivi fluide et éliminez les tremblements de souris pour CS2, Valorant et Apex.',
  keywords: [
    'entrainement tracking fps',
    'visee de suivi',
    'visee de suivi souris',
    'comment ameliorer son tracking fps',
    'visee saccadee souris solution',
    'smoothness aim entrainement',
    'strafe tracking exercice',
    'precision souris tir continu',
    'controle de la souris fps',
    'apex legends routine tracking',
    'stabilite visee souris',
    'poursuite oculaire lisse',
  ],
  openGraph: {
    title: 'Entraînement Tracking FPS – Visée de Suivi | SkillDrills',
    description: 'Entraîneur de tracking FPS gratuit en ligne. Maîtrisez la visée de suivi fluide et éliminez les tremblements de souris pour CS2, Valorant et Apex.',
    type: 'article',
    url: 'https://skilldrills.online/fr/drills/reaction-speed/fps-tracking-trainer',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Entraînement Tracking FPS – Visée de Suivi | SkillDrills',
    description: 'Entraîneur de tracking FPS gratuit en ligne. Maîtrisez la visée de suivi fluide et éliminez les tremblements de souris pour CS2, Valorant et Apex.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/reaction-speed/fps-tracking-trainer',
    languages: getAlternateLanguages('/drills/reaction-speed/fps-tracking-trainer'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills Accueil', item: 'https://skilldrills.online/fr' },
    { '@type': 'ListItem', position: 2, name: 'Drills Hub', item: 'https://skilldrills.online/fr/drills' },
    { '@type': 'ListItem', position: 3, name: 'Vitesse de Réaction', item: 'https://skilldrills.online/fr/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'FPS Tracking Trainer', item: 'https://skilldrills.online/fr/drills/reaction-speed/fps-tracking-trainer' },
  ],
};

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'FPS Tracking Trainer — Entraînement Visée de Suivi',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Simulateur web de visée continue et de tracking cinétique pour FPS tactiques et battle royale.',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'FPS Tracking Trainer en Ligne',
  applicationCategory: 'GameApplication',
  browserRequirements: 'Requires modern browser with Pointer Lock API support',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'FPS Tracking Trainer Drill',
  gameItem: ['Visée de Suivi', 'Smoothness Test', 'Strafe Reading'],
  numberOfPlayers: { '@type': 'QuantitativeValue', value: 1 },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Qu\'est-ce que le tracking dans un FPS et quelle est la différence avec le flick ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le tracking est la capacité neuromotrice à maintenir le réticule en continu sur une cible en déplacement fluide (poursuite oculaire lisse). Le flick shot, quant à lui, est un déplacement balistique ponctuel reposant sur une saccade oculaire rapide.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi ma visée de tracking tremble-t-elle lors du suivi ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les micro-tremblements résultent souvent d\'une co-contraction musculaire excessive du poignet et des doigts ou d\'une sensibilité trop élevée. Le relâchement des tensions et l\'utilisation de l\'avant-bras pour guider la souris suppriment ces secousses.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quel est le rôle de la poursuite oculaire lisse (smooth pursuit) dans le tracking ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les travaux de Rashbass (1961) et Krauzlis (2004) prouvent que le système visuel calcule en temps réel la vitesse rétinienne de la cible. Fixer la cible elle-même plutôt que son propre réticule permet d\'ajuster naturellement le guidage moteur.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment réagir efficacement quand l\'adversaire change subitement de direction (strafe) ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'N\'essayez pas de deviner le mouvement à l\'avance. Attendez la confirmation visuelle de l\'inversion et réorientez le curseur avec une accélération souple plutôt qu\'un geste saccadé de panique.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle sensibilité de souris privilégier pour le tracking continu ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Une sensibilité modérément basse (entre 30 cm et 45 cm pour un tour complet de 360°) offre une grande stabilité mécanique contre les micro-vibrations tout en conservant une amplitude suffisante.',
      },
    },
    {
      '@type': 'Question',
      name: 'En quoi le tapis de souris et les patins influencent-ils la fluidité ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un tapis doté d\'une friction dynamique uniforme et des patins en PTFE pur garantissent un glissement régulier sans à-coups ni résistance d\'accroche lors des micro-ajustements.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien de temps par jour consacrer à l\'entraînement du tracking ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Des séances quotidiennes de 15 à 20 minutes axées sur la fluidité et le zéro tension suffisent. Prolonger l\'effort au-delà crée de la fatigue nerveuse et des compensations néfastes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ce drill sur navigateur est-il transposable sur CS2, Valorant et Apex Legends ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Le contrôle neuromusculaire et l\'anticipation cinétique acquis en 2D se transfèrent directement dans l\'espace 3D de tous les FPS modernes dotés d\'une visée sans accélération logicielle.',
      },
    },
    {
      '@type': 'Question',
      name: 'Vaut-il mieux viser au poignet ou à l\'avant-bras pour le tracking ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'L\'avant-bras permet des trajectoires amples et continues avec moins de fatigue articulaire, tandis que les doigts et le poignet assurent uniquement les micro-corrections fines.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quel pourcentage de temps sur cible correspond à un niveau compétitif ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un taux supérieur à 72% de temps effectif sur la cible avec un écart moyen inférieur à 14 pixels classe le joueur dans le Top 5%, propre aux rangs Maître et Radiant.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Comment Travailler son Tracking FPS',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Calibrer sa Sensibilité et Lancer en Plein Écran',
      text: 'Définissez la vitesse de la cible et activez le mode plein écran pour éliminer les distractions et garantir une capture fidèle du curseur.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Fixer Directement la Cible en Mouvement',
      text: 'Concentrez votre regard sur le centre de la cible mobile plutôt que sur votre réticule.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Guider la Souris Sans Contraction Musculaire',
      text: 'Maintenez le bras détendu et laissez l\'avant-bras épouser la vitesse de déplacement de la trajectoire.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Gérer les Inversions de Sens Avec Calme',
      text: 'Lors des changements de direction, réajustez le mouvement de manière fluide sans à-coups de panique.',
    },
  ],
};

const guideProps = {
  title: 'Entraîneur de Tracking FPS — Précision de Suivi et Contrôle Continu',
  subtitle:
    'Développez la poursuite oculaire lisse, la stabilité face aux strafes et la fluidité de tir face à des cibles véloces.',
  scientificIntro: `Le suivi de cible (tracking) dans les jeux de tir à la première personne mobilise l'interaction entre le système oculomoteur de poursuite lisse (smooth pursuit) et le contrôle proprioceptif du membre supérieur (Rashbass, 1961 ; Krauzlis, 2004). Contrairement aux tirs balistiques ponctuels (flicks), le suivi continu impose d'annuler en temps réel l'erreur de vitesse rétinienne.

Lorsque la cible traverse l'espace visuel, le cortex et l'aire temporale médiane supérieure (MST) décodent son vecteur cinétique afin de guider les ordres cérébelleux vers les muscles du bras. L'apparition de saccades parasites ou de tremblements traduit une co-contraction involontaire des muscles agonistes et antagonistes, forçant le système visuel à effectuer des micro-recalages saccadiques inefficaces.

Ce drill isole la cinétique de la poursuite fluide, permettant au joueur d'atténuer la rigidité musculaire et d'affiner la coordination visomotrice. Une pratique régulière garantit une stabilité de visée supérieure et un temps de contact maximal sur cible en situation de combat dynamique.`,
  sources: pickSources('krauzlis2004', 'rashbass1961', 'green2003', 'woods2015'),
  benchmarks: {
    title: 'Paliers de Performance en Précision du Tracking et Temps sur Cible',
    headers: ['Niveau', 'Percentil', 'Temps sur Cible (%)', 'Écart Moyen', 'Jalon Neuromoteur'],
    rows: [
      ['Élite / Radiant', 'Top 1%', '≥ 85%', '< 8 px', 'Poursuite oculaire lisse parfaite sans secousses correctrices'],
      ['Maître / Avancé', 'Top 5%', '72% – 84%', '8 – 14 px', 'Réaction quasi-instantanée aux changements de vecteur'],
      ['Compétitif / Intermédiaire', 'Top 20%', '58% – 71%', '15 – 22 px', 'Suivi cinétique linéaire régulier avec légères surcorrections'],
      ['Pratiquant', 'Top 50%', '42% – 57%', '23 – 32 px', 'Mouvements saccadés et retards lors des accélérations'],
      ['Débutant', 'Base', '< 42%', '≥ 33 px', 'Décrochage fréquent de la cible et crispation musculaire'],
    ],
    note: 'Normes physiologiques calibrées sur le maintien continu du réticule sur cibles mobiles (Rashbass 1961 ; Krauzlis 2004).',
  },
  protocols: {
    title: 'Protocoles d\'Entraînement au Tracking',
    description: 'Exercices progressifs pour éliminer les tensions et parfaire la fluidité de visée continue.',
    items: [
      {
        title: 'Échauffement de Fluidité Linéaire (5 min)',
        description: 'Faites glisser la souris à vitesse constante sur des trajectoires droites en gardant la main détendue.',
      },
      {
        title: 'Entraînement à la Lecture de Strafes (10 min)',
        description: 'Ajustez votre mouvement lors des changements de trajectoire brusques sans sur-corriger.',
      },
      {
        title: 'Surcharge à Haute Vitesse (5 min)',
        description: 'Accélérez la cadence de la cible pour forcer l\'adaptation nerveuse et la réactivité du bras.',
      },
    ],
  },
  faqs: {
    title: 'Foire Aux Questions sur le Tracking FPS',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function EnhancedPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <FPSTrackingTrainerClient copy={{ title: 'Entraînement Tracking FPS' }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="reaction-speed"
          currentHref="https://skilldrills.online/fr/drills/reaction-speed/fps-tracking-trainer"
        />
      </div>
    </>
  );
}
