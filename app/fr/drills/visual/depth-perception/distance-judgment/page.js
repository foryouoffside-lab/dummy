import DistanceJudgmentClient from '@/app/drills/visual/depth-perception/distance-judgment/DistanceJudgmentClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — distance-judgment (French: Perception de la Profondeur)
// PRIMARY:  "test de perception de la profondeur" — Core query
//           "appréciation des distances test"     — Practical driving test
// SECONDARY / LSI:
//           "test de vision stéréoscopique"       — Clinical stereopsis
//           "test du sens du relief en ligne"     — Relief and depth
//           "estimation de distance visuelle"     — Estimation query
//           "expansion optique looming"           — Optical looming
//           "test de howard-dolman"               — Classical test
// ============================================================

export const metadata = {
  title: 'Test de Perception de la Profondeur – Relief et Distances',
  description: 'Test de perception de la profondeur en ligne gratuit. Évaluez votre appréciation des distances et votre précision d\'interception par expansion optique (TTC).',
  keywords: [
    'test de perception de la profondeur',
    'appréciation des distances test',
    'test de vision stéréoscopique',
    'test du sens du relief en ligne',
    'estimation de distance visuelle',
    'expansion optique looming',
    'temps avant contact ttc',
    'test de howard-dolman',
    'vision tridimensionnelle test',
    'perception spatiale des yeux',
    'coordination visuo-motrice distance',
    'évaluation acuité stéréoscopique',
  ],
  openGraph: {
    title: 'Test de Perception de la Profondeur – Relief et Distances | SkillDrills',
    description: 'Test de perception de la profondeur en ligne gratuit. Évaluez votre appréciation des distances et votre précision d\'interception par expansion optique (TTC).',
    type: 'article',
    url: 'https://skilldrills.online/fr/drills/visual/depth-perception/distance-judgment',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Test de Perception de la Profondeur – Relief et Distances | SkillDrills',
    description: 'Test de perception de la profondeur en ligne gratuit. Évaluez votre appréciation des distances et votre précision d\'interception par expansion optique (TTC).',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/visual/depth-perception/distance-judgment',
    languages: getAlternateLanguages('/drills/visual/depth-perception/distance-judgment'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://skilldrills.online/fr' },
    { '@type': 'ListItem', position: 2, name: 'Entraînement Visuel', item: 'https://skilldrills.online/fr/drills/visual' },
    { '@type': 'ListItem', position: 3, name: 'Perception de la Profondeur', item: 'https://skilldrills.online/fr/drills/visual/depth-perception' },
    { '@type': 'ListItem', position: 4, name: 'Appréciation des Distances', item: 'https://skilldrills.online/fr/drills/visual/depth-perception/distance-judgment' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Test de Perception de la Profondeur et des Distances',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Évaluation visuelle interactive mesurant la précision d\'appréciation des distances et le temps de contact par expansion optique.',
  url: 'https://skilldrills.online/fr/drills/visual/depth-perception/distance-judgment',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online/fr' },
  dateModified: '2026-09-05',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Simulateur d\'Appréciation des Distances 3D',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Navigateur moderne avec prise en charge HTML5 Canvas et Pointer Events',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  url: 'https://skilldrills.online/fr/drills/visual/depth-perception/distance-judgment',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Entraînement d\'Interception Visuelle en Relief',
  url: 'https://skilldrills.online/fr/drills/visual/depth-perception/distance-judgment',
  description: 'Exercice cinétique testant la précision temporelle dans l\'interception d\'une cible en approche tridimensionnelle.',
  genre: ['Precision Game', 'Visual Training', 'Esports'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Comment entraîner la perception de la profondeur et des distances',
  description: 'Protocole structuré pour coordonner l\'expansion optique rétinienne avec le timing d\'interception.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Fixer l\'anneau cible au centre du tunnel',
      text: 'Portez votre regard sur l\'anneau repère stationnaire au milieu du tunnel virtuel.',
      url: 'https://skilldrills.online/fr/drills/visual/depth-perception/distance-judgment#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Suivre la progression de la sphère',
      text: 'Observez l\'objet qui s\'approche depuis l\'arrière-plan et grandit sur la rétine.',
      url: 'https://skilldrills.online/fr/drills/visual/depth-perception/distance-judgment#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Cliquer à la superposition exacte',
      text: 'Appuyez sur la barre d\'espace ou cliquez précisément quand la sphère coïncide avec l\'anneau.',
      url: 'https://skilldrills.online/fr/drills/visual/depth-perception/distance-judgment#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Analyser l\'écart d\'interception',
      text: 'Vérifiez votre pourcentage d\'erreur et calibrez votre anticipation pour les vitesses supérieures.',
      url: 'https://skilldrills.online/fr/drills/visual/depth-perception/distance-judgment#step-4'
    }
  ]
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Qu\'est-ce que le test de perception de la profondeur et que mesure-t-il ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ce test évalue l\'aptitude du cortex visuel à évaluer les distances en 3D et à estimer le temps restant avant impact (Time-to-Contact) d\'après le taux d\'expansion de l\'image sur la rétine.',
      },
    },
    {
      '@type': 'Question',
      name: 'En quoi diffère-t-il du test traditionnel de Howard-Dolman ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'L\'appareil de Howard-Dolman (1919) utilise des tiges réelles pour mesurer la disparité binoculaire. Sur un écran plat en 2D, ce test mesure la composante dynamique de l\'expansion optique (Lee, 1976), capitale lors de la conduite et dans le sport.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qu\'est-ce que la variable Tau et le temps avant contact (TTC) ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'David Lee (1976) a prouvé que le cerveau déduit le délai avant collision en divisant la taille rétinienne par son taux d\'élargissement, sans avoir besoin de connaître la distance métrique réelle.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi l\'appréciation des distances est-elle exigée pour le permis poids lourd ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les conducteurs professionnels de camions et autocars doivent juger les distances de sécurité au millimètre près pour dépasser et freiner sans risquer de carambolage.',
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on avoir 10/10 à chaque œil et échouer au test de profondeur ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Une vision nette à chaque œil n\'empêche pas un déséquilibre de fusion binoculaire (anisométropie), un astigmatisme mal corrigé ou une fatigue visuelle réduisant l\'acuité spatiale.',
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on améliorer son appréciation des distances par l\'entraînement ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Bien que les troubles structurels relèvent de l\'ophtalmologie, la vitesse à laquelle le cerveau traite les indices d\'expansion optique gagne en vivacité avec des exercices réguliers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment est calculée la marge d\'erreur du score ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le système calcule l\'écart relatif en pourcentage entre le diamètre de la sphère lors de l\'appui et le diamètre exact de l\'anneau. Un écart inférieur à 5% accorde le score maximal.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quel est l\'intérêt dans les sports de raquette et de ballon ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Au tennis, au baseball ou au football, les sportifs n\'ont que 300 millisecondes pour analyser la trajectoire de balle et déclencher leur geste au moment parfait.',
      },
    },
    {
      '@type': 'Question',
      name: 'Le taux de rafraîchissement de l\'écran (Hz) joue-t-il un rôle ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un écran 144 Hz ou 240 Hz réduit le délai d\'affichage à moins de 7 ms contre 16,7 ms à 60 Hz, offrant une perception beaucoup plus fluide de l\'instant de chevauchement.',
      },
    },
    {
      '@type': 'Question',
      name: 'Mes scores et données personnelles sont-ils protégés ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Toutes les mesures et données de session sont enregistrées uniquement en local dans votre navigateur (LocalStorage), garantissant une confidentialité totale.',
      },
    },
  ],
};

const distanceGuideFr = {
  heading: 'Critères d\'Évaluation de la Perception de Profondeur',
  intro: [
    'La perception de la profondeur (vision stéréoscopique et sens du relief) est la fonction sensorielle et neurologique permettant d\'interpréter l\'environnement en trois dimensions et de jauger avec une rigueur absolue la distance, le volume et la trajectoire des objets en mouvement. Dans le sport de haut niveau (tennis, baseball, sports mécaniques), l\'aviation, la conduite d\'urgence et l\'eSport compétitif, estimer une distance à la milliseconde près fait la différence entre une interception parfaite et une collision critique.',
    'Ce drill transpose fidèlement sur le web les principes optiques de l\'appareil stéréoscopique classique de Howard-Dolman (Howard, 1919) et la théorie écologique de l\'expansion optique de David N. Lee (1976) ainsi que David Regan & Kenneth I. Beverley (1978). En projetant une sphère 3D le long d\'un tunnel virtuel vers un plan de référence fixe, l\'exercice entraîne le cortex visuel à extraire le taux de grossissement rétinien (looming) et à calculer le temps de contact résiduel (Time-to-Contact, τ) sous des vitesses d\'approche croissantes.',
    'Métrologie & Précision d\'Échantillonnage : Tous les écarts d\'interception sont chronométrés localement à l\'aide de l\'API haute résolution performance.now() à l\'échelle de la sous-milliseconde. L\'erreur correspond au pourcentage de déviation relative (|Diamètre Réel - Diamètre Repère| / Diamètre Repère). Les latences matérielles (quantification d\'affichage de ~16,7 ms à 60 Hz, ~6,9 ms à 144 Hz, ~4,1 ms à 240 Hz) et les fréquences d\'interrogation de la souris (125 Hz vs 1000 Hz) introduisent une dispersion incompressible (Woods et al., 2015). Toute variation inférieure à 5 ms relève du bruit de mesure ; comparez vos séries sur le même matériel.',
    'Confidentialité et Protection des Données : SkillDrills ne collecte aucune donnée personnelle, aucun bilan ophtalmologique ni aucune métrique d\'usage centralisée. L\'ensemble de vos scores, records et niveaux franchis reste strictement confiné dans le stockage local (LocalStorage) de votre navigateur.'
  ],
  benchmarks: {
    title: 'Barème de Référence en Perception de Profondeur',
    headers: ['Niveau de Maîtrise', 'Erreur Moyenne de Profondeur', 'Points & Niveau', 'Profil Visuo-Moteur'],
    rows: [
      ['Tier 1 : Maître Stéréoscopique Apex', 'Moins de 5,0% d\'erreur', '1500+ pts | Niveau 7+', 'Sensibilité hors pair à l\'expansion optique ; synchronisation infaillible.'],
      ['Tier 2 : Haute Acuité de Profondeur', '5,0% – 9,9% d\'erreur', '1100 – 1499 pts | Niveau 5–6', 'Excellente anticipation spatiale ; adaptation fluide aux vitesses soutenues.'],
      ['Tier 3 : Niveau Standard Régulier', '10,0% – 15,9% d\'erreur', '750 – 1099 pts | Niveau 3–4', 'Moyenne saine ; léger retard d\'estimation sur les pointes de vitesse.'],
      ['Tier 4 : Sensibilité Modérée', '16,0% – 25,0% d\'erreur', '450 – 749 pts | Niveau 2', 'Tendance à déclencher la frappe prématurément avant alignement.'],
      ['Tier 5 : En Apprentissage', 'Plus de 25,0% d\'erreur', 'Moins de 450 pts | Niveau 1', 'Erreur d\'estimation notable ; un entraînement régulier est conseillé.'],
    ],
  },
  protocols: {
    title: 'Protocoles pour Développer l\'Appréciation des Distances',
    items: [
      {
        title: 'Protocole 1 : Analyse du Taux d\'Expansion Optique (Lee 1976)',
        description: 'Fixez votre attention sur l\'accélération d\'élargissement des bords plutôt que sur le centre de la sphère.',
      },
      {
        title: 'Protocole 2 : Contrôle de l\'Impulsivité Motrice',
        description: 'Ne cédez pas à la panique de la vitesse ; attendez la superposition spatiale intégrale avant de cliquer.',
      },
      {
        title: 'Protocole 3 : Ancrage du Regard sur l\'Anneau Repère',
        description: 'Laissez votre vision fixée sur le plan d\'arrivée et laissez la sphère pénétrer votre zone focale.',
      },
      {
        title: 'Protocole 4 : Clignements et Prévention de la Sécheresse Oculaire',
        description: 'Pensez à cligner des yeux entre chaque tentative pour préserver un film lacrymal net et reposé.',
      },
    ],
  },
  steps: [
    'Cliquez sur "Démarrer le Test" pour initialiser la session d\'évaluation de 45 secondes.',
    'Fixez votre regard de manière stable sur l\'anneau de référence cyan situé au plan médian.',
    'Suivez l\'approche de la sphère 3D apparaissant au fond du corridor et accélérant vers vous.',
    'Cliquez avec la souris, touchez l\'écran ou appuyez sur la barre d\'espace à la milliseconde exacte où la sphère s\'ajuste au diamètre de l\'anneau cible.',
    'Consultez votre niveau de précision (<5% d\'erreur : Parfait / +150 PTS) et adaptez votre réflexe aux accélérations progressives durant 45 secondes.'
  ],
  audience: 'Conducteurs et candidats aux permis de conduire professionnels (poids lourds, transport en commun), opérateurs d\'engins de manutention, athlètes de sports de raquette et de balle (tennis, badminton, baseball), pilotes et joueurs d\'eSport tactique cherchant à aiguiser leur appréciation des distances.',
  faqs: {
    title: 'Foire Aux Questions sur la Perception de Profondeur et des Distances',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
  sources: pickSources('howard1919', 'lee1976', 'regan1978', 'julesz1971', 'woods2015'),
  related: [
    { href: "/drills/visual/tracking-accuracy/moving-target", label: "Interception de Cible Mobile" },
    { href: "/drills/visual/reaction-speed/light-reaction", label: "Test de Réaction à la Lumière" },
    { href: "/drills/visual/tracking-accuracy/multiple-targets", label: "Poursuite d'Objets Multiples" },
    { href: "/drills/visual/tracking-accuracy/pursuit-tracker", label: "Suivi Oculaire Continu" },
    { href: "/drills/visual/reaction-speed/go/no-go", label: "Contrôle d'Impulsion Go / No-Go" },
    { href: "/drills/visual/visual-recognition/entropic-grid", label: "Exploration de Grille Entropique" }
  ]
};

const copyFr = {
  title: 'Test de Perception de la Profondeur',
  subtitle: 'Appréciation des Distances et Interception 3D',
  caption: 'La perception de la profondeur permet d\'évaluer l\'éloignement et l\'ordre des objets. Sur un écran plat, le taux d\'expansion optique (Lee, 1976; Regan & Beverley, 1978) permet de mesurer le temps avant contact (TTC) sans nécessiter la connaissance de la taille de l\'objet.',
  statScore: 'Points',
  statTime: 'Temps',
  statLevel: 'Niveau',
  statBestScore: 'Record',
  startTitle: 'Appréciation des Distances Pro',
  startSubtitle: 'Vision 3D • Interception Visuelle en Relief',
  startBtn: 'Démarrer le Test',
  getReady: 'PRÉPAREZ-VOUS',
  newBest: 'NOUVEAU RECORD',
  statPoints: 'Points',
  statAccuracy: 'Précision',
  statPeakLevel: 'Niveau Max',
  statIntercepts: 'Pleins Succès',
  playAgain: 'Rejouer',
  shareScore: 'Partager le Score',
  returnOptions: 'Retour',
  rulesTitle: 'Règles et Attribution des Points',
  rule1Text: 'Interception Parfaite',
  rule1Highlight: '+150 PTS',
  rule1Result: 'Moins de 5% d\'erreur',
  rule2Text: 'Interception Rapprochée',
  rule2Highlight: '+100 PTS',
  rule2Result: 'Moins de 12% d\'erreur',
  rule3Text: 'Accélération Progressive',
  rule3Highlight: 'Plus Rapide',
  rule3Result: 'La sphère s\'approche plus vite',
  rule4Text: 'Temps Écoulé / Manqué',
  rule4Highlight: 'Aucune Pénalité',
  rule4Result: 'Nouvelle cible sans perte de points',
  aboutTitle: 'À Propos du Test de Perception de la Profondeur',
  overviewTitle: 'Que mesure cette épreuve ?',
  overviewLead: 'Elle évalue la vitesse et la justesse avec lesquelles le cerveau décrypte une approche spatiale en 3D.',
  overviewBody: 'En analysant le moment exact de coïncidence par expansion de contour, le test perfectionne la coordination visuo-motrice des conducteurs, pilotes et athlètes.',
  aboutCards: [
    { iconBg: 'bg-blue-600', title: 'Public Visé', text: 'Automobilistes, pilotes, joueurs de sports de balle et amateurs de jeux vidéo d\'action rapide.' },
    { iconBg: 'bg-cyan-600', title: 'Aptitudes Entraînées', text: 'Expansion optique, estimation du temps de contact, anticipation visuelle et acuité spatiale.' },
    { iconBg: 'bg-purple-600', title: 'Conseil Clé', text: 'Fixez l\'anneau cible et déclenchez votre clic au millimètre près quand les contours coïncident.' }
  ]
};

export default function FrenchDistanceJudgmentPage() {
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
      <DistanceJudgmentClient copy={copyFr} />
      <DrillGuide guide={distanceGuideFr} />
      <RelatedDrills currentCategory="visual" currentHref="/drills/visual/depth-perception/distance-judgment" locale="fr" />
    </>
  );
}
