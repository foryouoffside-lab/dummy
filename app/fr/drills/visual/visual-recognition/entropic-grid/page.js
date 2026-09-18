import EntropicGridClient from '@/app/drills/visual/visual-recognition/entropic-grid/EntropicGridClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test de Recherche Visuelle: Entropic Grid | SkillDrills",
  description: "Test de recherche visuelle et d'attention sélective gratuit en ligne. Identifiez des codes cibles dans une grille de 100 cases sous bruit dynamique.",
  keywords: [
    "test de recherche visuelle en ligne",
    "test d'attention sélective",
    "grille de concentration test",
    "recherche visuelle matrice 100",
    "filtrage du bruit visuel dynamique",
    "vitesse de balayage visuel",
    "attention visuospatiale entraînement",
    "effet pop-out perception",
    "neuroscience cognitive vision",
    "test de fixation fovéale",
    "détection de cibles complexes",
    "vision périphérique balayage"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/visual/visual-recognition/entropic-grid",
    languages: getAlternateLanguages('/drills/visual/visual-recognition/entropic-grid'),
  },
  openGraph: {
    title: "Test de Recherche Visuelle: Entropic Grid | SkillDrills",
    description: "Test de recherche visuelle et d'attention sélective gratuit en ligne. Identifiez des codes cibles dans une grille de 100 cases sous bruit dynamique.",
    url: "https://skilldrills.online/fr/drills/visual/visual-recognition/entropic-grid",
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US", "de_DE", "ko_KR", "ja_JP", "pt_PT", "es_ES"],
    images: [{ url: "https://skilldrills.online/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Test de Recherche Visuelle: Entropic Grid | SkillDrills",
    description: "Test de recherche visuelle et d'attention sélective gratuit en ligne. Identifiez des codes cibles dans une grille de 100 cases sous bruit dynamique.",
    images: ["https://skilldrills.online/og-default.svg"],
  },
};

const guideData = {
  eyebrow: "Psychologie Cognitive & Attention Sélective",
  heading: "Test de Recherche Visuelle Entropic Grid – Filtrage du Bruit & Discrimination",
  intro: [
    "Le test Entropic Grid s'appuie sur la théorie de l'intégration des traits (Treisman & Gelade, 1980) et sur les mécanismes de recherche guidée (Wolfe, 2007). Dans une matrice 10x10 de 100 cellules, le cerveau doit filtrer des distracteurs changeant toutes les 700 millisecondes pour repérer un code cible spécifique.",
    "Cette tâche sollicite la coordination étroite entre les voies attentionnelles ventrales et dorsales, renforçant la capacité à ignorer le bruit visuel ambiant et à accélérer la vitesse de traitement perceptif."
  ],
  benchmarks: {
    title: "Barèmes de Performance pour la Recherche Visuelle et l'Attention Sélective",
    headers: ["Palier de Performance", "Réponses Exactes (45s)", "Latence Moyenne de Fixation", "Précision de Filtrage du Bruit", "Profil Neurocognitif"],
    rows: [
      ["Palier 1 : Élite Perceptive (Top 1%)", "18+ Cibles", "< 180 ms", "> 96%", "Combinaison parfaite de détection pré-attentionnelle pop-out et de balayage top-down guidé (Wolfe, 2007)."],
      ["Palier 2 : Recherche Confirmée (Top 5%)", "14 – 17 Cibles", "180 – 230 ms", "88 – 95%", "Excellent filtrage des distracteurs dynamiques et exploration structurée par quadrants."],
      ["Palier 3 : Standard Solide (Top 25%)", "10 – 13 Cibles", "230 – 300 ms", "76 – 87%", "Vitesse d'analyse moyenne ; alterne contrôle sériel et repérage périphérique partiel."],
      ["Palier 4 : Niveau de Base (Top 50%)", "7 – 9 Cibles", "300 – 400 ms", "65 – 75%", "Vulnérabilité à l'encombrement visuel et ralentissement face aux transitions d'affichage."],
      ["Palier 5 : Débutant (Baseline)", "< 7 Cibles", "> 400 ms", "< 65%", "Saccades oculaires désordonnées et perte du modèle de la cible en mémoire de travail."]
    ],
    note: "Établi selon la littérature en psychologie cognitive visuelle (Treisman & Gelade 1980 ; Wolfe 2007 ; Duncan & Humphreys 1989 ; Posner 1980)."
  },
  techniques: {
    title: "Stratégies Visuo-Motrices pour Optimiser la Détection",
    items: [
      {
        name: "Balayage Structuré par Quadrants",
        desc: "Plutôt que de parcourir la grille ligne par ligne, divisez mentalement la matrice 10x10 en 4 blocs de 5x5 et posez votre regard au centre de chaque zone pour analyser plusieurs cellules en vision parafovéale.",
        tips: "Limitez vos saccades oculaires à 4 ou 5 fixations stratégiques par cycle d'inspection."
      },
      {
        name: "Filtrage Pré-Attentionnel par Traits Géométriques",
        desc: "Mémorisez la signature visuelle du code (ex : lignes obliques d'un 'X' ou contours arrondis d'un 'O') afin de rejeter instantanément les symboles non pertinents.",
        tips: "Évitez la répétition phonétique du code ; gardez uniquement son image géométrique en mémoire vive."
      },
      {
        name: "Résistance au Scintillement de Contraste",
        desc: "Le renouvellement de la grille attire naturellement les yeux vers les bords. Forcez votre attention à rester centrée sur le quadrant sous surveillance.",
        tips: "Ignorez les éclairs de rafraîchissement périphérique pour préserver la continuité du balayage."
      },
      {
        name: "Positionnement Médian du Curseur",
        desc: "Laissez flotter le curseur de souris au centre de la grille afin de minimiser le trajet moteur vers la case dès la confirmation visuelle.",
        tips: "Relâchez les muscles de la main pour déclencher des clics instantanés et précis."
      }
    ]
  },
  steps: [
    "Identifiez le code de deux caractères indiqué dans le bandeau supérieur de l'exercice.",
    "Cliquez sur Démarrer le Test pour lancer le compte à rebours et afficher la grille de 100 cases.",
    "Balayez la matrice et cliquez sur la bonne case avant la fin du temps imparti de 45 secondes.",
    "Chaque réponse exacte octroie des points et affiche immédiatement un nouveau code à localiser.",
    "Au coup de sifflet final, consultez votre total de cibles trouvées, votre latence moyenne et votre précision."
  ],
  audience: "Indispensable pour les joueurs d'esport tactique (Valorant, CS2, Apex Legends), les opérateurs de vidéosurveillance, les analystes de données, les pilotes et tout utilisateur souhaitant améliorer sa rapidité d'analyse visuelle sous distraction.",
  faqs: [
    {
        "q": "Qu'est-ce que le test de recherche visuelle Entropic Grid (Visual Search Task) ?",
        "a": "L'Entropic Grid constitue une déclinaison moderne des protocoles d'intégration des traits (Treisman & Gelade, 1980) et de recherche guidée (Wolfe, 2007). Il mesure la capacité du système visuo-attentionnel à extraire une cible alphanumérique dans une matrice de 100 cases soumise à des mutations périodiques toutes les 700 ms."
    },
    {
        "q": "Quelle est la différence entre recherche parallèle (pop-out) et recherche sérielle ?",
        "a": "La recherche parallèle survient lorsque la cible se distingue immédiatement par une caractéristique élémentaire isolée (couleur ou éclat), sautant aux yeux sans effort (effet pop-out). La recherche sérielle oblige à déplacer le regard fovéal de case en case pour vérifier la combinaison des traits, exigeant du temps et de l'attention."
    },
    {
        "q": "Quels sont les bénéfices pour les joueurs de FPS tactiques comme Valorant ou CS2 ?",
        "a": "Dans les affrontements rapides, les joueurs doivent repérer des silhouettes ennemies dissimulées dans des environnements visuellement denses et chargés d'effets visuels. L'Entropic Grid accroît la vitesse de discrimination figure-fond et réduit le délai avant le premier tir précis."
    },
    {
        "q": "Quelle est la stratégie de balayage la plus rapide sur une grille de 100 cases ?",
        "a": "La méthode la plus performante repose sur le découpage en 4 quadrants de 5x5. En fixant le regard au centre de chaque quadrant, la vision parafovéale filtre plusieurs caractères simultanément sans imposer 100 saccades oculaires complètes."
    },
    {
        "q": "Comment éviter la distraction induite par le scintillement toutes les 700 ms ?",
        "a": "Les changements brusques de caractères provoquent des signaux d'alerte dans le cortex visuel précoce. Pour contrer cette capture automatique de l'attention, maintenez active l'empreinte géométrique du code dans le cortex préfrontal en adoptant un contrôle descendant (top-down)."
    },
    {
        "q": "En quoi l'Entropic Grid diffère-t-il d'une table de Schulte classique ?",
        "a": "Dans une table de Schulte, les chiffres restent fixes pendant tout le test. Sur l'Entropic Grid, les distracteurs changent de configuration toutes les 700 ms, ce qui sollicite activement l'inhibition du bruit visuel et la résistance aux interférences."
    },
    {
        "q": "Ce test améliore-t-il la vitesse de lecture et le travail sur écran ?",
        "a": "Oui. Développer le filtrage rapide des symboles optimise le guidage des saccades et élargit l'empan visuel de lecture, réduisant les retours en arrière involontaires dans les textes denses et les tableaux de données."
    },
    {
        "q": "Pourquoi la vitesse de recherche visuelle baisse-t-elle avec l'âge et comment y remédier ?",
        "a": "Le vieillissement s'accompagne d'une réduction naturelle du champ visuel utile (UFOV) et d'un ralentissement de la transmission pariétale. L'entraînement régulier sur des matrices dynamiques favorise la plasticité cérébrale et préserve l'acuité de tri visuel."
    },
    {
        "q": "Quel est le volume d'entraînement quotidien idéal sans fatigue oculaire ?",
        "a": "Il est recommandé de pratiquer 4 à 6 séries de 45 secondes par jour (environ 5 à 8 minutes au total). Des pauses de 30 secondes entre chaque épreuve préviennent l'épuisement attentionnel du lobe frontal."
    },
    {
        "q": "Mes temps de réaction et mes coordonnées de clic sont-ils enregistrés sur des serveurs ?",
        "a": "Non. La génération aléatoire des symboles, la mesure de latence et le calcul du score s'effectuent intégralement en mémoire locale dans votre navigateur via JavaScript client-side. Aucune donnée n'est transmise vers l'extérieur."
    }
],
  sources: pickSources([
    "treisman1980feature",
    "wolfe2007guided",
    "duncan1989visual",
    "posner1980orienting",
    "scialfa2002visual"
  ]),
  related: [
    { href: "/fr/drills/visual/tracking-accuracy/moving-target", label: "Poursuite de Cibles Mobiles" },
    { href: "/fr/drills/visual/tracking-accuracy/multiple-targets", label: "Poursuite d'Objets Multiples" },
    { href: "/fr/drills/visual/tracking-accuracy/pursuit-tracker", label: "Poursuite Oculaire Continue" },
    { href: "/fr/drills/visual/reaction-speed/go/no-go", label: "Test Go/No-Go" },
    { href: "/fr/drills/fps/target-prioritization", label: "Priorisation des Cibles FPS" },
    { href: "/fr/drills/visual-tracking/peripheral-ping-pursuit", label: "Poursuite Périphérique" }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://skilldrills.online/fr" },
    { "@type": "ListItem", "position": 2, "name": "Entraînements", "item": "https://skilldrills.online/fr/drills" },
    { "@type": "ListItem", "position": 3, "name": "Perception Visuelle", "item": "https://skilldrills.online/fr/drills/visual" },
    { "@type": "ListItem", "position": 4, "name": "Reconnaissance Visuelle", "item": "https://skilldrills.online/fr/drills/visual/visual-recognition" },
    { "@type": "ListItem", "position": 5, "name": "Entropic Grid", "item": "https://skilldrills.online/fr/drills/visual/visual-recognition/entropic-grid" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test de Recherche Visuelle Entropic Grid",
  "operatingSystem": "Web Browser",
  "applicationCategory": "HealthApplication",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "publisher": { "@type": "Organization", "name": "SkillDrills" }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Test de Recherche Visuelle Entropic Grid",
  "url": "https://skilldrills.online/fr/drills/visual/visual-recognition/entropic-grid",
  "applicationCategory": "SportsApplication",
  "browserRequirements": "Requires JavaScript. Canvas support required.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Entraînement de Recherche Visuelle et d'Attention Sélective Entropic Grid",
  "gamePlatform": "Web Browser",
  "genre": ["Vision Sportive", "Entraînement Cognitif", "Attention Sélective"],
  "numberOfPlayers": { "@type": "QuantitativeValue", "value": 1 }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment Réaliser le Test Entropic Grid",
  "description": "Protocole étape par étape pour évaluer et entraîner l'attention sélective et la vitesse de recherche visuelle.",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Étape 1", "text": "Identifiez le code de deux caractères indiqué dans le bandeau supérieur de l'exercice." },
    { "@type": "HowToStep", "position": 2, "name": "Étape 2", "text": "Cliquez sur Démarrer le Test pour lancer le compte à rebours et afficher la grille de 100 cases." },
    { "@type": "HowToStep", "position": 3, "name": "Étape 3", "text": "Balayez la matrice et cliquez sur la bonne case avant la fin du temps imparti de 45 secondes." },
    { "@type": "HowToStep", "position": 4, "name": "Étape 4", "text": "Chaque réponse exacte octroie des points et affiche immédiatement un nouveau code à localiser." },
    { "@type": "HowToStep", "position": 5, "name": "Étape 5", "text": "Au coup de sifflet final, consultez votre total de cibles trouvées, votre latence moyenne et votre précision." }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
        "@type": "Question",
        "name": "Qu'est-ce que le test de recherche visuelle Entropic Grid (Visual Search Task) ?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "L'Entropic Grid constitue une déclinaison moderne des protocoles d'intégration des traits (Treisman & Gelade, 1980) et de recherche guidée (Wolfe, 2007). Il mesure la capacité du système visuo-attentionnel à extraire une cible alphanumérique dans une matrice de 100 cases soumise à des mutations périodiques toutes les 700 ms."
        }
    },
    {
        "@type": "Question",
        "name": "Quelle est la différence entre recherche parallèle (pop-out) et recherche sérielle ?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "La recherche parallèle survient lorsque la cible se distingue immédiatement par une caractéristique élémentaire isolée (couleur ou éclat), sautant aux yeux sans effort (effet pop-out). La recherche sérielle oblige à déplacer le regard fovéal de case en case pour vérifier la combinaison des traits, exigeant du temps et de l'attention."
        }
    },
    {
        "@type": "Question",
        "name": "Quels sont les bénéfices pour les joueurs de FPS tactiques comme Valorant ou CS2 ?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Dans les affrontements rapides, les joueurs doivent repérer des silhouettes ennemies dissimulées dans des environnements visuellement denses et chargés d'effets visuels. L'Entropic Grid accroît la vitesse de discrimination figure-fond et réduit le délai avant le premier tir précis."
        }
    },
    {
        "@type": "Question",
        "name": "Quelle est la stratégie de balayage la plus rapide sur une grille de 100 cases ?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "La méthode la plus performante repose sur le découpage en 4 quadrants de 5x5. En fixant le regard au centre de chaque quadrant, la vision parafovéale filtre plusieurs caractères simultanément sans imposer 100 saccades oculaires complètes."
        }
    },
    {
        "@type": "Question",
        "name": "Comment éviter la distraction induite par le scintillement toutes les 700 ms ?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Les changements brusques de caractères provoquent des signaux d'alerte dans le cortex visuel précoce. Pour contrer cette capture automatique de l'attention, maintenez active l'empreinte géométrique du code dans le cortex préfrontal en adoptant un contrôle descendant (top-down)."
        }
    },
    {
        "@type": "Question",
        "name": "En quoi l'Entropic Grid diffère-t-il d'une table de Schulte classique ?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Dans une table de Schulte, les chiffres restent fixes pendant tout le test. Sur l'Entropic Grid, les distracteurs changent de configuration toutes les 700 ms, ce qui sollicite activement l'inhibition du bruit visuel et la résistance aux interférences."
        }
    },
    {
        "@type": "Question",
        "name": "Ce test améliore-t-il la vitesse de lecture et le travail sur écran ?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui. Développer le filtrage rapide des symboles optimise le guidage des saccades et élargit l'empan visuel de lecture, réduisant les retours en arrière involontaires dans les textes denses et les tableaux de données."
        }
    },
    {
        "@type": "Question",
        "name": "Pourquoi la vitesse de recherche visuelle baisse-t-elle avec l'âge et comment y remédier ?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le vieillissement s'accompagne d'une réduction naturelle du champ visuel utile (UFOV) et d'un ralentissement de la transmission pariétale. L'entraînement régulier sur des matrices dynamiques favorise la plasticité cérébrale et préserve l'acuité de tri visuel."
        }
    },
    {
        "@type": "Question",
        "name": "Quel est le volume d'entraînement quotidien idéal sans fatigue oculaire ?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Il est recommandé de pratiquer 4 à 6 séries de 45 secondes par jour (environ 5 à 8 minutes au total). Des pauses de 30 secondes entre chaque épreuve préviennent l'épuisement attentionnel du lobe frontal."
        }
    },
    {
        "@type": "Question",
        "name": "Mes temps de réaction et mes coordonnées de clic sont-ils enregistrés sur des serveurs ?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Non. La génération aléatoire des symboles, la mesure de latence et le calcul du score s'effectuent intégralement en mémoire locale dans votre navigateur via JavaScript client-side. Aucune donnée n'est transmise vers l'extérieur."
        }
    }
]
};

export default function EntropicGridPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <EntropicGridClient copy={{ title: "Test de Recherche Visuelle: Entropic Grid", subtitle: "Filtrage du Bruit Dynamique & Attention Sélective" }} />
        <DrillGuide guide={guideData} />
        <RelatedDrills related={guideData.related} />
      </main>
    </>
  );
}
