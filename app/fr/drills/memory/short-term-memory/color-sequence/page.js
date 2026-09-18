import ColorSequenceClient from '@/app/drills/memory/short-term-memory/color-sequence/ColorSequenceClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: "Jeu Simon en Ligne – Mémoire des Couleurs | SkillDrills",
  description: "Jeu Simon en ligne gratuit: Retenez des suites de couleurs croissantes et testez votre mémoire de travail visuelle directement dans le navigateur sans compte.",
  keywords: [
    "jeu simon en ligne gratuit",
    "jeu de memoire des couleurs",
    "jeu du simon en ligne",
    "test de memoire a court terme",
    "test memoire de travail visuelle",
    "jeu pour travailler la memoire",
    "retenir suite de couleurs jeu",
    "exercice memoire visuelle gratuit",
    "test de memoire sequentielle",
    "technique de chunking memoire",
    "capacite empan mnemonique test",
    "entrainement cognitif memoire"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/memory/short-term-memory/color-sequence",
    languages: getAlternateLanguages('/drills/memory/short-term-memory/color-sequence'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Jeu Simon en Ligne – Mémoire des Couleurs | SkillDrills",
    description: "Jeu Simon en ligne gratuit: Retenez des suites de couleurs croissantes et testez votre mémoire de travail visuelle directement dans le navigateur sans compte.",
    url: "https://skilldrills.online/fr/drills/memory/short-term-memory/color-sequence",
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Jeu Simon en Ligne – Mémoire des Couleurs | SkillDrills",
    description: "Jeu Simon en ligne gratuit: Retenez des suites de couleurs croissantes et testez votre mémoire de travail visuelle directement dans le navigateur sans compte.",
  },
};

export default function FrenchColorSequencePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/fr" },
      { "@type": "ListItem", "position": 2, "name": "Entrainements de Memoire", "item": "https://skilldrills.online/fr/drills/memory" },
      { "@type": "ListItem", "position": 3, "name": "Memoire a Court Terme", "item": "https://skilldrills.online/fr/drills/memory" },
      { "@type": "ListItem", "position": 4, "name": "Jeu Simon des Couleurs", "item": "https://skilldrills.online/fr/drills/memory/short-term-memory/color-sequence" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Jeu Simon en Ligne",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-16",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
    "description": "Entrainement interactif gratuit de la memoire de travail visuelle evaluant la retention de suites chromatiques sequentielles et le chunking.",
    "genre": "Entrainement Cognitif / Memoire Visuelle de Travail",
    "url": "https://skilldrills.online/fr/drills/memory/short-term-memory/color-sequence",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Jeu Simon en Ligne",
    "url": "https://skilldrills.online/fr/drills/memory/short-term-memory/color-sequence",
    "description": "Jeu de memoire Simon en ligne gratuit pour navigateur avec 6 touches colorees et difficulte adaptative en escalier.",
    "dateModified": "2026-09-16",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "isAccessibleForFree": true,
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Jeu Simon – Suite de Couleurs",
    "url": "https://skilldrills.online/fr/drills/memory/short-term-memory/color-sequence",
    "description": "Jeu electronique classique de sequence de couleurs dans le navigateur pour developper l empan mnesique et la vivacite.",
    "genre": ["Jeu de Memoire", "Entrainement Cerebral", "Puzzle"],
    "gamePlatform": ["Navigateur Web", "Mobile", "Tablette", "Bureau"],
    "applicationCategory": "Game",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Qu est-ce que le Jeu Simon et comment fonctionne-t-il ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le jeu Simon est un defi classique de memorisation sequentielle. L appareil emet une suite croissante de signaux lumineux et sonores. Le joueur doit enregistrer la sequence et la restituer sans faute dans le meme ordre en cliquant sur les touches."
        }
      },
      {
        "@type": "Question",
        "name": "Quelles fonctions cerebrales sont sollicitees par ce jeu ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Il mobilise principalement la memoire de travail visuelle et le calepin visuo-spatial (Baddeley & Hitch, 1974), stimulant l attention soutenue, l encodage en serie et l activite synaptique du cortex prefrontal."
        }
      },
      {
        "@type": "Question",
        "name": "Quelle est la limite d empan selon Luck et Vogel (1997) ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Steven Luck et Edward Vogel ont etabli que la memoire de travail visuelle humaine plafonne a environ 3 ou 4 unites d information simultanees. Au-dela de 4 elements, le recours au regroupement mental devient indispensable."
        }
      },
      {
        "@type": "Question",
        "name": "Qu est-ce que la methode de chunking et comment l appliquer ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le chunking (Miller, 1956) consiste a fusionner des items distincts en blocs porteurs de sens. En retenant deux groupes de trois couleurs plutot que six couleurs separees, la charge cognitive imposee au cerveau est reduite de moitie."
        }
      },
      {
        "@type": "Question",
        "name": "Pourquoi cet entrainement comporte-t-il 6 couleurs au lieu de 4 ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "L ajout du violet et de l orange etend la configuration a 6 touches, augmentant l entropie de choix et offrant un defi cognitif superieur aux utilisateurs souhaitant repousser leurs limites."
        }
      },
      {
        "@type": "Question",
        "name": "Existe-t-il une penalite de temps lors d une erreur ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Aucun temps n est deduit du chronometre. En cas d echec, le moteur adaptatif reduit simplement la sequence d un palier pour permettre la poursuite de l exercice sans blocage."
        }
      },
      {
        "@type": "Question",
        "name": "Quel palier correspond a une performance de haut niveau ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Franchir les niveaux 7 ou 8 (sequences de 7 a 8 couleurs) represente un score solide. Depasser le niveau 10 (plus de 1 300 points) suppose un chunking rigoureux et correspond au centile d elite."
        }
      },
      {
        "@type": "Question",
        "name": "Ce jeu reduit-il les oublis de la vie courante ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui. L entrainement a l encodage sequentiel renforce la resistance attentionnelle quotidienne, facilitant la retention rapide de codes, de consignes etapes par etapes et de listes courtes."
        }
      },
      {
        "@type": "Question",
        "name": "Le jeu est-il adapte aux ecrans tactiles ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "L interface reagit de maniere instantanee aux gestes tactiles sur smartphones et tablettes ainsi qu aux clics de souris sur ordinateur de bureau."
        }
      },
      {
        "@type": "Question",
        "name": "Ce jeu Simon est-il gratuit et sans inscription ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, SkillDrills propose cet outil gratuitement et sans publicite bloquante, directement dans le navigateur sans installation ni collecte de donnees."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Comment Jouer au Jeu Simon des Couleurs",
    "description": "Guide en 4 etapes pour entrainer sa memoire de travail visuelle et restituer de longues suites chromatiques.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "url": "https://skilldrills.online/fr/drills/memory/short-term-memory/color-sequence#step-1",
        "name": "Suivez Attentivement l Allumage des Touches",
        "text": "Concentrez votre regard au centre des 6 boutons pour capter la succession de lumieres et de sons sans precipitation."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "url": "https://skilldrills.online/fr/drills/memory/short-term-memory/color-sequence#step-2",
        "name": "Associez les Couleurs en Blocs Rhythmiques",
        "text": "Regroupez les stimuli par doublets ou triplets mentaux pour depasser le goulot d etranglement des 4 items."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "url": "https://skilldrills.online/fr/drills/memory/short-term-memory/color-sequence#step-3",
        "name": "Reproduisez la Sequence sans Hesitation",
        "text": "Des l apparition du signal actif, cliquez sur les touches dans l ordre exact avec un rythme regulier."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "url": "https://skilldrills.online/fr/drills/memory/short-term-memory/color-sequence#step-4",
        "name": "Augmentez les Paliers pour un Score Record",
        "text": "A chaque reussite, la chaine s enrichit d une couleur supplementaire, augmentant le multiplicateur de points."
      }
    ]
  };

  const frCopy = {
    title: 'Jeu Simon en Ligne',
    subtitle: 'Test de Memoire de Travail Visuelle et Retention de Suites Colorees',
    caption: 'Suivez et restituez la suite lumineuse dans l ordre exact au fil de son allongement progressif.',
    statScore: 'Score',
    statTime: 'Temps',
    statLevel: 'Niveau',
    statBestScore: 'Record',
    rulesTitle: 'Regles du Jeu et Attribution des Points',
    rule1Text: 'Restitution Sequentielle',
    rule1Highlight: '+100 PTS',
    rule1Result: 'Reproduisez les touches eclairees dans l ordre exact de defilement',
    rule2Text: 'Bonus de Niveau',
    rule2Highlight: '+10% PTS / Niveau',
    rule2Result: 'Les chaines plus longues declenchent des multiplicateurs accrus',
    rule3Text: 'Erreur ou Delai Depasse',
    rule3Highlight: '-1 Niveau',
    rule3Result: 'Aucune perte de points accumules; reajustement de la difficulte',
    rule4Text: 'Difficulte Adaptative',
    rule4Highlight: 'Dynamique',
    rule4Result: 'La longueur de chaine correspond fidelement a votre capacite actuelle',
    aboutTitle: 'A Propos du Jeu Simon de Suite de Couleurs',
    overviewTitle: 'Que developpe le jeu de memoire des couleurs ?',
    overviewLead: 'La memoire visuelle de travail ne peut maintenir simultanement que 4 items simples (Luck & Vogel, 1997; Cowan, 2001). Une chaine chromatique expansive sollicite directement cette frontiere neurobiologique.',
    aboutIntro: [
      'L entrainement mnemonique visuel cible la capacite cerebrale a encoder, maintenir et restituer des sequences de stimuli dans un ordre temporel rigoureux.',
      'En exercant la repetition de couleurs, vous affinez vos reflexe de regroupement cognitif (chunking) et renforcez votre stabilite face a la contrainte de temps.',
    ],
    aboutCards: [
      { title: 'A qui s adresse ce jeu ?', text: 'Etudiants, candidats aux concours, seniors et joueurs d e-sport souhaitant stimuler leur empan mnesique et leur reactivite.' },
      { title: 'Capacites sollicitees', text: 'Empan visuel, encodage serie dans le calepin visuo-spatial (Baddeley & Hitch, 1974) et vitesse d execution.' },
      { title: 'Strategie de Chunking', text: 'Assemblez les couleurs en blocs melodiques ou trajets visuels pour depasser aisement le seuil des 4 elements (Miller, 1956).' },
    ],
  };

  const frColorSequenceGuide = {
    heading: 'Guide du Jeu Simon et de la Memoire Visuelle de Travail',
    intro: [
      'La reproduction de suites chromatiques est une technique eprouvee pour evaluer et entrainer l attention serielle et le calepin visuo-spatial. Cree par Ralph Baer et Howard Morrison avec le jeu Simon en 1978, ce protocole teste la retention immediate de motifs dynamiques.',
      'La contrainte fondamentale repose sur la limitation stricte du calepin visuo-spatial (Baddeley & Hitch, 1974). Les travaux de Steven J. Luck & Edward K. Vogel (1997) ainsi que de Nelson Cowan (2001) confirment que le reservoir de travail visuel humain ne conserve guere plus de 3 a 4 unites distinctes.',
      'Pour franchir de longs parcours, le cerveau deploie des mecanismes de regroupement mnemonique ou chunking (Miller, 1956) : les couleurs sont regroupees par duos rythmiques ou motifs geometriques, condensant plusieurs stimuli en une seule unite mentale.',
      'Toutes les reactivites sont enregistrees a la milliseconde pres via les APIs natives de synchronisation du navigateur (Woods et al., 2015).'
    ],
    benchmarks: {
      title: 'Baremes de Performance au Jeu Simon (Session de 45 secondes)',
      headers: ['Palier de Competence', 'Niveau Atteint', 'Score (45s)', 'Strategie Mnemonique et Diagnostic'],
      rows: [
        ['Tier 1 (Grand Maitre / Elite)', 'Niveau 11+', 'Plus de 1 500 PTS', 'Chunking multimodal parfait; encodage visuel et auditif simultane'],
        ['Tier 2 (Avance / Niveau Tournoi)', 'Niveau 8 – 10', '1 100 – 1 499 PTS', 'Depassement solide de la limite de Cowan (4 items); regroupement binaire fluide'],
        ['Tier 3 (Moyenne Solide)', 'Niveau 5 – 7', '700 – 1 099 PTS', 'Capacite classique de memoire a court terme; hesitation lors des cadences rapides'],
        ['Tier 4 (Base / Oublis Ponctuels)', 'Niveau 3 – 4', '350 – 699 PTS', 'Memoire de travail a son seuil biologique; absence de chunking structure'],
        ['Tier 5 (Debutant / Taux d Erreur Eleve)', 'Sous le Niveau 3', 'Moins de 350 PTS', 'Difficulte des le 3e signal; interference liee a la persistance retinienne']
      ],
      note: 'Baremes standardises pour des sequences dynamiques a 6 teintes sur une epreuve de 45 secondes (Luck & Vogel, 1997; Cowan, 2001; Woods et al., 2015).'
    },
    techniques: {
      title: '4 methodes scientifiques pour memoriser des suites de couleurs plus longues',
      items: [
        {
          name: 'Regroupement Rythmique (Chunking de Miller)',
          desc: 'N enregistrez pas les couleurs une a une. Repetez mentalement les initiales selon une cadence cadensee (ex. "Rouge-Bleu ... Vert-Jaune").',
          tips: 'Scindez systematiquement la chaine en paires des qu elle depasse 4 elements.'
        },
        {
          name: 'Visualisation d un Trajet Spatial',
          desc: 'Reliez les positions des touches eclairees par un fil imaginaire (triangle, diagonale ou arc de cercle) au lieu de manipuler des noms de couleurs abstraits.',
          tips: 'Le cortex parietal traite la figure geometrique comme un ensemble indivisible.'
        },
        {
          name: 'Exploitation des Frequences Sonores',
          desc: 'Chaque couleur possede sa tonalite propre. Retenez la petite melodie creee pour doubler le stockage visuel par un encodage auditif fiable.',
          tips: 'Conservez le son active pour beneficier du double codage sensoriel.'
        },
        {
          name: 'Concentration Ciblee sur la Dernière Touche',
          desc: 'La base de la sequence reste identique d un tour a l autre ; portez l essentiel de votre attention sur le nouvel element qui vient s ajouter a la fin.',
          tips: 'Consolidez le debut en boucle de fond et concentrez l attention vive sur la derniere pulsation.'
        }
      ]
    },
    steps: [
      'Lancez la session de 45 secondes et stabilisez votre regard sur le centre.',
      'Observez avec precision la suite d illuminations et de signaux sonores.',
      'Reorganisez mentalement la suite en blocs couples de deux ou trois teintes.',
      'Des que la commande passe a vous, pressez les touches dans l ordre avec assurance.',
      'Franchissez les paliers successifs pour accroitre vos multiplicateurs et votre record.'
    ],
    audience: 'Etudiants, candidats, professionnels et joueurs competitifs souhaitant optimiser leur memoire de travail, leurs strategies de chunking et leur sang-froid.',
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('miller1956', 'cowan2001', 'baddeley1974', 'luck1997', 'woods2015'),
    related: [
      { href: "/fr/drills/memory/short-term-memory/digit-span", label: "Test d Empan de Chiffres" },
      { href: "/fr/drills/memory/short-term-memory/word-recall", label: "Test de Memoire Verbale" },
      { href: "/fr/drills/memory/spatial-memory/grid-memorization", label: "Memoire Spatiale sur Grille" },
      { href: "/fr/drills/cognitive/focus/concentration-grid", label: "Table de Schulte en Ligne" },
      { href: "/fr/drills/cognitive/focus/distraction-fighter", label: "Test de Stroop en Ligne" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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
      <ColorSequenceClient copy={frCopy} />
      <DrillGuide guide={frColorSequenceGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="memory" currentHref="/drills/memory/short-term-memory/color-sequence" locale="fr" />
      </div>
    </>
  );
}
