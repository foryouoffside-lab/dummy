import { pickSources } from '@/lib/drillSources';
import KeyboardTesterClient from '@/app/drills/motor/keyboard-tester/KeyboardTesterClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: 'Test Clavier en Ligne – Testeur de Touches | SkillDrills',
  description:
    'Testez chaque touche de votre clavier en ligne gratuitement. Détection des touches défectueuses, test anti-ghosting et rollover sans installation.',
  keywords: [
    'test clavier',
    'testeur de clavier',
    'keyboard tester',
    'test touche clavier',
    'tester son clavier',
    'clavier azerty test',
    'anti ghosting test',
    'test clavier mecanique',
    'testeur de touches',
    'verifier touche clavier',
    'test rollover clavier',
    'test clavier en ligne gratuit',
  ],
  openGraph: {
    title: 'Test Clavier en Ligne – Testeur de Touches | SkillDrills',
    description:
      'Testez chaque touche de votre clavier en ligne gratuitement. Détection des touches défectueuses, test anti-ghosting et rollover sans installation.',
    type: 'article',
    url: 'https://skilldrills.online/fr/drills/motor/keyboard-tester',
    siteName: 'SkillDrills',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Test Clavier en Ligne – Testeur de Touches | SkillDrills',
    description:
      'Testez chaque touche de votre clavier en ligne gratuitement. Détection des touches défectueuses, test anti-ghosting et rollover sans installation.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/fr/drills/motor/keyboard-tester',
    languages: getAlternateLanguages('/drills/motor/keyboard-tester'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills Accueil', item: 'https://skilldrills.online/fr' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Entraînement Moteur',
      item: 'https://skilldrills.online/fr/drills/motor',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Testeur de Clavier',
      item: 'https://skilldrills.online/fr/drills/motor/keyboard-tester',
    },
  ],
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Testeur de Clavier en Ligne',
  alternateName: ['Test Clavier', 'Vérificateur de Touches'],
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'All',
  browserRequirements: 'Nécessite un navigateur web moderne et un clavier physique',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description:
    'Outil web gratuit pour tester vos touches, détecter les pannes matérielles, mesurer le key rollover et vérifier l anti-ghosting.',
  url: 'https://skilldrills.online/fr/drills/motor/keyboard-tester',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-16',
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Testeur de Clavier et Anti-Ghosting en Ligne',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Outil gratuit en ligne pour tester la frappe, détecter les touches bloquées et vérifier le rollover.',
  url: 'https://skilldrills.online/fr/drills/motor/keyboard-tester',
  dateModified: '2026-09-16',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' }
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Testeur de Clavier et Rollover',
  url: 'https://skilldrills.online/fr/drills/motor/keyboard-tester',
  description: 'Outil interactif de diagnostic pour tester les commutateurs et les frappes simultanées.',
  dateModified: '2026-09-16',
  gamePlatform: 'Web Browser',
  genre: ['Testeur de Clavier', 'Utilitaires', 'Diagnostic Matériel'],
  playMode: 'SinglePlayer',
  applicationCategory: 'Game',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Comment tester les touches de son clavier en ligne',
  description: 'Guide pratique pour détecter les touches inopérantes, le ghosting et le chattering.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      url: 'https://skilldrills.online/fr/drills/motor/keyboard-tester#step-1',
      name: 'Pressez chaque touche individuellement',
      text: 'Appuyez successivement sur chaque touche. Les touches fonctionnelles s allument en bleu puis restent vertes après relâchement.'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      url: 'https://skilldrills.online/fr/drills/motor/keyboard-tester#step-2',
      name: 'Vérifiez le key rollover et l anti-ghosting',
      text: 'Maintenez plusieurs touches enfoncées en même temps (ex: ZQSD, Shift, Espace) pour observer le nombre de frappes simultanées.'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      url: 'https://skilldrills.online/fr/drills/motor/keyboard-tester#step-3',
      name: 'Analysez les signaux d événements',
      text: 'Consultez les informations en direct (event.code, event.key) pour isoler les dysfonctionnements de disposition.'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      url: 'https://skilldrills.online/fr/drills/motor/keyboard-tester#step-4',
      name: 'Validez le diagnostic et réinitialisez',
      text: 'Repérez les touches non confirmées pour distinguer un commutateur encrassé d un souci logiciel, puis réinitialisez.'
    }
  ]
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-16',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Comment tester si les touches de mon clavier fonctionnent correctement ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ouvrez cette page et appuyez sur chaque touche une par une. Chaque touche fonctionnelle s illumine en bleu lors de la pression et reste verte ensuite. Toute touche restant éteinte ne transmet aucun signal au navigateur.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qu est-ce que cela signifie si une touche ne s allume pas ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le signal de la touche n atteint pas le système. Cela indique généralement un commutateur mécanique défectueux, une poussière sous la touche, une piste coupée sur le circuit imprimé ou un problème de pilote.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi certaines touches comme Alt+Tab ou Ctrl+Alt+Suppr ne s affichent pas ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le système d exploitation intercepte ces raccourcis avant le navigateur. De plus, les touches F5 ou F11 sont transmises pour préserver l actualisation et le plein écran.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ce test est-il compatible avec la disposition AZERTY française ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Le test repose sur les codes matériels event.code et s adapte parfaitement aux claviers AZERTY français et belges ainsi qu aux claviers QWERTY.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment tester l anti-ghosting et le key rollover (NKRO) ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pressez plusieurs touches simultanément. Les claviers pour joueurs avec vrai NKRO reconnaissent chaque touche sans blocage ni omission.',
      },
    },
    {
      '@type': 'Question',
      name: 'Que faire en cas de rebond de touche (chattering / double frappe involontaire) ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le chattering est dû à une lamelle métallique oxydée ou encrassée dans le switch mécanique. Nettoyer à l alcool isopropylique ou remplacer le switch résout généralement le problème.',
      },
    },
    {
      '@type': 'Question',
      name: 'Mes données de frappe ou mots de passe sont-ils enregistrés ou envoyés sur un serveur ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Non. Tous les événements sont traités uniquement en mémoire vive dans la sandbox locale de votre navigateur. Aucune donnée n est stockée ou transmise.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ce testeur de clavier fonctionne-t-il avec les claviers mécaniques et à membrane ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, il fonctionne avec tous les claviers : mécaniques, optiques, magnétiques à effet Hall, ainsi que les claviers à membrane d ordinateurs portables.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la différence entre event.code et event.key dans le navigateur ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'event.code identifie l emplacement physique de la touche sans dépendre de la langue. event.key indique le caractère produit en tenant compte de la disposition et des modificateurs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ce testeur de clavier en ligne est-il entièrement gratuit ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, l outil SkillDrills est 100 % gratuit, sans inscription et s exécute instantanément dans n importe quel navigateur moderne.',
      },
    },
  ],
};

const guideProps = {
  intro: {
    title: 'Ce qu un testeur de clavier permet réellement de vérifier',
    sources: pickSources('woods2015'),
    paragraphs: [
      'Un testeur de clavier vérifie que chaque touche physique transmet un événement matériel reconnu par l ordinateur. Si une touche pressée ne génère aucun signal, elle n est pas lue par le système.',
      'Cet outil permet d isoler avec certitude les défaillances mécaniques des erreurs de configuration logicielle, directement depuis votre navigateur.',
    ],
  },
  benchmarks: {
    title: 'Niveaux de Rollover et Barem Technique de Clavier',
    caption: 'Classifications techniques fondées sur le balayage de matrice, le temps d anti-rebond et la fréquence d interrogation USB. SkillDrills traite les signaux uniquement en local.',
    headers: ['Palier (Tier)', 'Architecture Matérielle', 'Capacité de Rollover', 'Matrice Anti-Ghosting', 'Latence du Switch', 'Profil de Diagnostic et Jeu'],
    rows: [
      [
        'Tier 1',
        'NKRO Complet (Magnétique Effet Hall / Optique)',
        'Vrai N-Key (> 50 touches)',
        'Diode individuelle par touche; aucun blocage de matrice',
        'Moins de 1,0 ms (Polling de 8000 Hz / 1000 Hz)',
        'Niveau e-sport d élite : Reconnaissance d accords instantanée, rapid trigger, absence totale de chattering.',
      ],
      [
        'Tier 2',
        '6KRO / 10KRO Mécanique (Switches Mécaniques)',
        '6 à 10 touches simultanées',
        'Diodes dédiées sur les touches alphanumériques et modificatrices',
        '2,0–5,0 ms (Polling 1000 Hz, anti-rebond mécanique)',
        'Standard gaming : Reconnaissance parfaite pour les combinaisons de déplacement complexes et macros.',
      ],
      [
        'Tier 3',
        'Matrice Gaming Optimisée (Membrane Hybride)',
        '4 à 6 touches (Zone ZQSD)',
        'Anti-ghosting par zone sur les touches de jeu fréquentes',
        '8,0–15,0 ms (Polling de 125–500 Hz)',
        'Usage loisir régulier : Fiable pour les FPS classiques, blocages occasionnels sur les touches excentrées.',
      ],
      [
        'Tier 4',
        'Matrice Bureautique Standard (Membrane Simple)',
        '2 à 3 touches (2KRO)',
        'Matrice partagée en lignes et colonnes; omissions courantes',
        '15,0–30,0 ms (Polling USB de 125 Hz)',
        'Bureautique basique : Risque d omissions ou de ghosting lors de combinaisons rapides de 3 touches ou plus.',
      ],
      [
        'Tier 5',
        'Matériel Défectueux / Chattering (Switch Altéré)',
        'Panne intermittente / Touche inopérante',
        'Oxydation des contacts, ressort détendu ou piste rompue',
        'Instable / Double frappe involontaire (> 35 ms jitter)',
        'Panne matérielle : Double frappe parasite (chattering), touche muette ou blocage mécanique permanent.',
      ],
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

export default function KeyboardTesterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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
      <KeyboardTesterClient />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/fr/drills/motor/keyboard-tester" />
      </div>
    </>
  );
}
