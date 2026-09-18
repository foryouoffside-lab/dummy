import RapidTappingClient from '@/app/drills/motor/movement-speed/rapid-tapping/RapidTappingClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Test de CPS – Clics Par Seconde & Vitesse | SkillDrills',
  description: 'Test de CPS gratuit en ligne. Mesurez vos clics par seconde, votre vitesse de frappe de souris, jitter clicking et endurance des doigts sur 45 secondes.',
  keywords: [
    'test de cps',
    'cps test francais',
    'test de vitesse de clic',
    'clics par seconde test',
    'compteur de clics par seconde',
    'test de clics souris',
    'test jitter click',
    'butterfly click test',
    'vitesse de frappe souris',
    'test de clic minecraft',
    'mesurer son cps en ligne',
    'entrainement de clics rapides',
  ],
  openGraph: {
    title: 'Test de CPS – Clics Par Seconde & Vitesse | SkillDrills',
    description: 'Test de CPS gratuit en ligne. Mesurez vos clics par seconde, votre vitesse de frappe de souris, jitter clicking et endurance des doigts sur 45 secondes.',
    type: 'article',
    url: 'https://skilldrills.online/fr/drills/motor/movement-speed/rapid-tapping',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Test de CPS – Clics Par Seconde & Vitesse | SkillDrills',
    description: 'Test de CPS gratuit en ligne. Mesurez vos clics par seconde et votre vitesse de frappe de souris.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/motor/movement-speed/rapid-tapping',
    languages: getAlternateLanguages('/drills/motor/movement-speed/rapid-tapping'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills', item: 'https://skilldrills.online/fr' },
    { '@type': 'ListItem', position: 2, name: 'Contrôle Moteur', item: 'https://skilldrills.online/fr/drills/motor' },
    { '@type': 'ListItem', position: 3, name: 'Vitesse de Mouvement', item: 'https://skilldrills.online/fr/drills/motor/movement-speed' },
    { '@type': 'ListItem', position: 4, name: 'Test de CPS', item: 'https://skilldrills.online/fr/drills/motor/movement-speed/rapid-tapping' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Test de CPS – Compteur de Clics Par Seconde',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Test de CPS en ligne gratuit. Évaluez votre fréquence de clics par seconde (CPS), votre endurance musculaire et vos pics d’accélération sur 45 secondes.',
  url: 'https://skilldrills.online/fr/drills/motor/movement-speed/rapid-tapping',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Test de CPS en Ligne',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Nécessite le support HTML5 Canvas et JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  url: 'https://skilldrills.online/fr/drills/motor/movement-speed/rapid-tapping',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Test de CPS – Entraînement Clics Rapides',
  url: 'https://skilldrills.online/fr/drills/motor/movement-speed/rapid-tapping',
  description: 'Mesurez vos clics par seconde et votre régularité motrice sur une session interactive de 45 secondes.',
  genre: ['Clicker Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Qu’est-ce qu’un test de CPS (clics par seconde) ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un test de CPS mesure le nombre de clics de souris effectués en une seconde. Il évalue la fréquence d’activation des unités motrices, la rapidité neuromusculaire et l’endurance des fléchisseurs de l’avant-bras.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quel est le score de CPS moyen pour un joueur ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Avec un seul doigt régulier, un utilisateur adulte standard atteint 6 à 8 CPS. Les joueurs expérimentés oscillent entre 9 et 12 CPS, tandis que les adeptes du jitter ou butterfly clicking dépassent régulièrement les 15 à 20 CPS.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qu’est-ce que le Jitter Clicking et comment fonctionne-t-il ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le jitter clicking consiste à provoquer une contraction isométrique contrôlée dans l’avant-bras pour faire vibrer la main et transmettre cette oscillation à l’index sur le bouton gauche, atteignant 12 à 15 CPS.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment fonctionne le Butterfly Clicking ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le butterfly clicking fait alterner l’index et le majeur sur un même interrupteur de souris en tambourinant rapidement. Avec un temps de debounce bas, cette méthode permet de générer 16 à 22 CPS.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi le test dure-t-il 45 secondes au lieu de 5 ou 10 secondes ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Une courte salve de 5 secondes ne mesure que la vitesse explosive. Une épreuve de 45 secondes met à l’épreuve la résistance à l’accumulation d’acide lactique et la stabilité du rythme sous fatigue musculaire.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle souris permet d’atteindre les meilleurs scores de CPS ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Une souris gamer dotée d’interrupteurs mécaniques légers ou optiques, avec un réglage de debounce ajustable (0 à 4 ms) et une forme favorisant une prise en main stable, permet d’exploiter au mieux chaque impulsion.',
      },
    },
    {
      '@type': 'Question',
      name: 'Le CPS est-il important pour Minecraft PvP ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, dans les versions axées sur le PvP classique (notamment Minecraft 1.8), un CPS élevé réduit le recul subi (knockback) et favorise le verrouillage de combos d’attaque contre l’adversaire.',
      },
    },
    {
      '@type': 'Question',
      name: 'Le spam intensif de clics présente-t-il des risques pour la santé ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Une crispation excessive prolongée peut favoriser tendinites ou syndrome du canal carpien. Échauffez vos poignets, faites des pauses régulières et relâchez la pression dès l’apparition d’une gêne.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment la cadence de clic se transfère-t-elle aux jeux FPS ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dans les jeux de tir tactique, la régularité du tapping garantit une excellente cadence de tir semi-automatique (pistolets, fusils de précision) sans altérer la stabilité de la visée.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment le score de pic (Burst CPS) est-il mesuré ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le pic de burst correspond à la meilleure fenêtre glissante de 5 secondes enregistrée durant la session, reflétant votre potentiel neuromoteur maximal avant fatigue.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Comment Développer sa Vitesse de Clic (CPS) et son Endurance',
  description: 'Guide méthodologique pour augmenter votre cadence de frappe et maîtriser les techniques de clic avancées.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Calibrer la Prise en Main de la Souris',
      text: 'Adoptez une prise stable (claw ou fingertip) en ancrant le poignet sur le tapis et en relâchant les tensions de l’épaule.',
      url: 'https://skilldrills.online/fr/drills/motor/movement-speed/rapid-tapping#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Lancer la Première Salve de Clics',
      text: 'Cliquez dans la zone centrale pour amorcer le compte à rebours et amorcez immédiatement votre cadence de pointe.',
      url: 'https://skilldrills.online/fr/drills/motor/movement-speed/rapid-tapping#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Maintenir une Cadence Régulière sur 45 Secondes',
      text: 'Conservez un rythme métronomique pour limiter la tétanie musculaire et maintenir votre CPS moyen au plus haut.',
      url: 'https://skilldrills.online/fr/drills/motor/movement-speed/rapid-tapping#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Analyser le Rapport de Performance et d’Endurance',
      text: 'Consultez votre CPS global, votre pic de burst sur 5 secondes et la courbe d’endurance sur le tableau final.',
      url: 'https://skilldrills.online/fr/drills/motor/movement-speed/rapid-tapping#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('halstead1947', 'todor1980', 'keele1968', 'woods2015'),
  intro: {
    title: 'Fondements Physiologiques de la Fréquence de Clic',
    paragraphs: [
      'Un test de CPS mesure le débit moteur digital. Avec un seul doigt, la cadence soutenue se situe naturellement autour de 5 à 7 clics par seconde, correspondant au rythme de frappe physiologique de référence chez l’adulte sain (Halstead, 1947 ; Todor & Kyprie, 1980). Les salves supérieures relèvent de programmes moteurs en boucle ouverte (Keele, 1968).',
      'Facteurs de mesure : L’horloge interne performance.now() et la fréquence d’échantillonnage de la souris déterminent la résolution. Comparez toujours vos scores sur le même équipement.',
    ],
  },
  benchmark: {
    title: 'Tableau des Niveaux de CPS et Baremage Officiel',
    description: 'Baremage basé sur la fréquence moyenne de clics par seconde, le pic de salve sur 5 secondes et la technique mobilisée.',
    columns: ['Tier', 'Rang', 'CPS Moyen', 'Pic de Burst (5s)', 'Technique Mobilisée', 'Catégorie'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Apex Tapper',
        stat: '16.0+ CPS',
        level: '20.0+ CPS',
        accuracy: 'Butterfly / Drag Clicking',
        percentile: 'Top 1% (Élite)',
      },
      {
        tier: 'Tier 2',
        rank: 'Pro Competitor',
        stat: '12.0–15.9 CPS',
        level: '15.0–19.0 CPS',
        accuracy: 'Jitter Clicking Maîtrisé',
        percentile: 'Top 5% (Avancé)',
      },
      {
        tier: 'Tier 3',
        rank: 'Competitive Gamer',
        stat: '9.0–11.9 CPS',
        level: '11.0–14.0 CPS',
        accuracy: 'Frappe Mono-Doigt Rapide',
        percentile: 'Top 20% (Solide)',
      },
      {
        tier: 'Tier 4',
        rank: 'Proficient Casual',
        stat: '6.0–8.9 CPS',
        level: '7.5–10.0 CPS',
        accuracy: 'Mono-Doigt Standard',
        percentile: 'Moyenne Standard',
      },
      {
        tier: 'Tier 5',
        rank: 'Novice Tapper',
        stat: 'Moins de 6.0 CPS',
        level: 'Moins de 7.5 CPS',
        accuracy: 'Mono-Doigt Débutant',
        percentile: 'Débutant',
      },
    ],
  },
  protocols: {
    title: 'Protocoles d’Entraînement Méthodiques',
    description: 'Techniques pour renforcer l’activation motrice et retarder l’épuisement neuromusculaire.',
    items: [
      {
        title: 'Protocole 1 : Pivotement Métacarpien Isolé (Halstead 1947)',
        description: 'Pour le clic standard à un doigt, ancrez fermement le poignet et concentrez l’effort sur l’articulation métacarpo-phalangienne sans crisper l’avant-bras.',
      },
      {
        title: 'Protocole 2 : Intervalles de Salves Maximales (Todor & Kyprie 1980)',
        description: 'Alternez des séquences de 5 secondes à fréquence maximale suivies de 3 secondes de cadence modérée pour stimuler le recrutement des fibres rapides.',
      },
      {
        title: 'Protocole 3 : Co-Contraction Isométrique (Jitter Clicking)',
        description: 'Générez une légère tension simultanée dans les fléchisseurs et extenseurs de l’avant-bras pour faire vibrer l’index sans bloquer la glisse de la souris.',
      },
      {
        title: 'Protocole 4 : Frappe Bimanuelle en Alternance (Butterfly Clicking)',
        description: 'Posez l’index et le majeur à plat sur le commutateur et entretenez un tambourinement fluide et régulier.',
      },
    ],
  },
  faqs: {
    title: 'Foire Aux Questions (FAQ)',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function FrenchRapidTappingPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
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
      <RapidTappingClient />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/drills/motor/movement-speed/rapid-tapping" />
      </div>
    </>
  );
}
