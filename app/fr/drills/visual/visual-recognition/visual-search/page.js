import VisualSearchClient from '@/app/drills/visual/visual-recognition/visual-search/VisualSearchClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Test de Recherche Visuelle: Balayage Conjonctif | SkillDrills",
  description: "Test de recherche visuelle et de balayage conjonctif gratuit. Repérez la cible parmi 96 distracteurs denses et optimisez votre attention sélective en 45s.",
  keywords: [
    "test de recherche visuelle",
    "recherche visuelle conjonctive",
    "balayage visuel test",
    "théorie de l'intégration des caractéristiques",
    "attention sélective visuelle",
    "discrimination de cibles visuelles",
    "inspection visuelle en ligne",
    "vitesse d'exploration visuelle",
    "charge perceptive lavie",
    "test de symboles visuels",
    "repérage visuel rapide",
    "temps de recherche visuelle"
],
  openGraph: {
    title: "Test de Recherche Visuelle: Balayage Conjonctif | SkillDrills",
    description: "Test de recherche visuelle et de balayage conjonctif gratuit. Repérez la cible parmi 96 distracteurs denses et optimisez votre attention sélective en 45s.",
    type: "website",
    url: "https://skilldrills.online/fr/drills/visual/visual-recognition/visual-search",
    siteName: "SkillDrills",
  },
  twitter: {
    card: "summary_large_image",
    title: "Test de Recherche Visuelle: Balayage Conjonctif | SkillDrills",
    description: "Test de recherche visuelle et de balayage conjonctif gratuit. Repérez la cible parmi 96 distracteurs denses et optimisez votre attention sélective en 45s.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/visual/visual-recognition/visual-search",
    languages: getAlternateLanguages('/drills/visual/visual-recognition/visual-search', 'fr'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/fr/" },
    { "@type": "ListItem", "position": 2, "name": "Entraînement Visuel", "item": "https://skilldrills.online/fr/drills/visual" },
    { "@type": "ListItem", "position": 3, "name": "Reconnaissance Visuelle", "item": "https://skilldrills.online/fr/drills/visual/visual-recognition" },
    { "@type": "ListItem", "position": 4, "name": "Test de Recherche Visuelle – Balayage Conjonctif", "item": "https://skilldrills.online/fr/drills/visual/visual-recognition/visual-search" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Test de Recherche Visuelle – Balayage Conjonctif",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Évaluation gratuite de recherche visuelle conjonctive. Balayez une grille dense de 96 lettres avec distracteurs pivotés pour mesurer votre latence et attention sélective.",
  "url": "https://skilldrills.online/fr/drills/visual/visual-recognition/visual-search",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "dateModified": "2026-09-05"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Test de Recherche Visuelle Conjonctive",
  "browserRequirements": "Requires HTML5 canvas and JavaScript",
  "url": "https://skilldrills.online/fr/drills/visual/visual-recognition/visual-search",
  "applicationCategory": "EducationalApplication",
  "dateModified": "2026-09-05"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Jeu de Recherche Visuelle et de Balayage Conjonctif",
  "url": "https://skilldrills.online/fr/drills/visual/visual-recognition/visual-search",
  "description": "Exercice cognitif de recherche visuelle. Localisez des symboles cibles au milieu de 96 caractères denses et pivotés au cours d'une session de 45 secondes.",
  "genre": ["Action", "Brain Game", "Search Game"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment développer sa vitesse de recherche visuelle et de balayage conjonctif",
  "description": "Améliorez votre latence d'acquisition de cible, votre intégration de caractéristiques et votre attention sélective grâce à notre protocole scientifique en 4 étapes.",
  "dateModified": "2026-09-05",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Mémorisez le caractère cible affiché",
      "text": "Imprimez dans votre mémoire de travail la forme géométrique et l'orientation exacte du symbole cible affiché en haut.",
      "url": "https://skilldrills.online/fr/drills/visual/visual-recognition/visual-search#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Appliquez un pré-filtrage périphérique global",
      "text": "Conservez un regard souple et utilisez votre vision périphérique pour écarter d'emblée des blocs entiers de symboles dissemblables.",
      "url": "https://skilldrills.online/fr/drills/visual/visual-recognition/visual-search#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Déployez un balayage saccadique méthodique",
      "text": "Parcourez la matrice de 96 cellules selon un motif régulier en zigzag horizontal ou vertical afin d'éliminer toute redondance.",
      "url": "https://skilldrills.online/fr/drills/visual/visual-recognition/visual-search#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Cliquez instantanément dès confirmation",
      "text": "Validez la cible dès son identification pour enregistrer votre latence d'acquisition en millisecondes.",
      "url": "https://skilldrills.online/fr/drills/visual/visual-recognition/visual-search#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-05",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Que mesure le test de recherche visuelle et comment s'organise-t-il ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Il mesure la vitesse de balayage visuel, l'efficacité de traitement des caractéristiques conjointes et l'attention sélective. L'utilisateur doit identifier un symbole cible parmi 96 lettres pivotées sur une grille de 12x8 en 45 secondes."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la différence fondamentale entre recherche simple et recherche conjonctive ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La recherche simple repose sur un attribut saillant unique et produit un pop-out instantané. La recherche conjonctive exige d'associer plusieurs traits, ce qui impose une inspection sérielle attentive de chaque candidat (Treisman & Gelade, 1980)."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi les lettres sont-elles pivotées dans ce test ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Parce qu'une orientation régulière permet au système visuel de fusionner les distracteurs en une texture de fond homogène. Les inclinaisons aléatoires brisent cette homogénéité et imposent un véritable travail de discrimination fovéale (Duncan & Humphreys, 1989)."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le principe du modèle de Recherche Guidée de Wolfe ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Il postule que les aires visuelles précoces calculent des cartes de caractéristiques en parallèle pour produire une carte corticale de priorités, guidant les saccades prioritaires vers les zones les plus probables (Wolfe, 1994)."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est un bon score lors de cette épreuve de 45 secondes ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les débutants obtiennent de 300 à 550 points (2–3 cibles). La moyenne standard non entraînée se situe entre 600 et 1 000 points (4–6 cibles), tandis que les joueurs compétitifs dépassent 1 500 points (10+ cibles avec une latence < 450 ms)."
      }
    },
    {
      "@type": "Question",
      "name": "Qu'explique la Théorie de la Charge Perceptive de Nilli Lavie ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Elle démontre qu'une forte sollicitation sensorielle consomme l'intégralité des ressources attentionnelles, neutralisant ainsi les pensées parasites ou les stimuli extérieurs sans rapport avec la tâche (Lavie, 1995)."
      }
    },
    {
      "@type": "Question",
      "name": "Comment le balayage visuel d'un expert se distingue-t-il de celui d'un novice ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les profils expérimentés appliquent un parcours en zigzag rigoureux, exploitent leur vision périphérique et limitent les fixations à 200–250 ms, alors que les débutants sautent d'un point à un autre et stagnent trop longtemps sur chaque élément."
      }
    },
    {
      "@type": "Question",
      "name": "Existe-t-il des pénalités de score en cas d'erreur de clic ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aucun point n'est retranché et aucune seconde n'est retirée. Une fausse manœuvre entraîne simplement un bref clignotement rouge, favorisant une prise de décision rapide et résolue."
      }
    },
    {
      "@type": "Question",
      "name": "Dans quelles professions et disciplines sportives cette compétence est-elle essentielle ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En radiologie, contrôle aérien, inspection de sécurité douanière, surveillance militaire, ainsi que dans les sports d'action et les jeux de tir tactiques où repérer une cible camouflée en une fraction de seconde fait toute la différence."
      }
    },
    {
      "@type": "Question",
      "name": "Comment accélérer durablement sa vitesse d'exploration visuelle ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En s'astreignant à un balayage ordonné en zigzag, en apprenant à écarter les distracteurs par lots grâce à la vision périphérique et en refusant de s'attarder plus d'un quart de seconde sur un même point."
      }
    }
  ]
};

export default function VisualSearchLocalePage() {
  const sources = pickSources('treisman1980', 'wolfe1994', 'duncan1989', 'lavie1995', 'eriksen1986', 'bacon1994', 'woods2015');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <VisualSearchClient copy={{ title: "Jeu de Recherche Visuelle et de Balayage Conjonctif" }} />
      <DrillGuide
        eyebrow="Psychophysique Cognitive & Attention Visuelle"
        title="La Science de la Recherche Visuelle, Intégration des Caractéristiques & Attention Sélective"
        sources={sources}
      >
        <p dangerouslySetInnerHTML={{ __html: `Dans les environnements visuels naturels, les cibles se présentent rarement de façon isolée. Qu'il s'agisse de scruter un écran radar de contrôle aérien, de relire des textes denses ou de repérer un adversaire embusqué dans un FPS tactique, le système visuel humain doit discriminer des signaux pertinents immergés dans un encombrement visuel dense. En psychophysique visuelle, cette aptitude est évaluée via des <strong>paradigmes de recherche visuelle</strong>, qui mesurent comment l'attention spatiale interagit avec les cartes corticales de caractéristiques au fil du temps (Treisman &amp; Gelade, 1980 ; Wolfe, 1994).` }} />

        <h3>Théorie de l&apos;Intégration des Caractéristiques : Pop-Out Parallèle vs. Recherche Conjonctive</h3>
        <p dangerouslySetInnerHTML={{ __html: `La psychophysique visuelle classique divise les mécanismes de recherche en deux régimes fondamentaux selon la saillance et la composition des traits de la cible :` }} />
        <ul className="list-disc pl-5 space-y-2 my-3 text-slate-300">
          <li>
            <strong>Recherche de Caractéristique (Pop-Out Parallèle) :</strong> Lorsqu'une cible diffère des distracteurs par une seule propriété continue (comme un cercle rouge parmi des carrés bleus), les neurones précoces de l'aire V1 détectent l'écart simultanément sur l'ensemble du champ visuel. Le temps de réaction demeure constant quelle que soit la quantité de distracteurs (Treisman &amp; Gelade, 1980 ; Wolfe, 1994).
          </li>
          <li>
            <strong>Recherche Conjonctive (Liaison Sérielle &amp; Guidée) :</strong> Lorsque la cible est définie par une combinaison de caractéristiques qui se recoupent avec les éléments environnants (comme identifier un 'C' parmi des 'O', 'Q' et 'G' orientés aléatoirement), les mécanismes préattentionnels parallèles ne peuvent résoudre la cible seuls. Le cortex visuel doit déployer l'attention focale séquentiellement de cellule en cellule, provoquant une augmentation linéaire du temps de réponse proportionnelle à la taille du stimulus (Treisman &amp; Gelade, 1980 ; Duncan &amp; Humphreys, 1989).
          </li>
        </ul>
        <p dangerouslySetInnerHTML={{ __html: `Ce phénomène met en lumière ce que les neuroscientifiques cognitifs nomment le <em>problème de la liaison visuelle (binding problem)</em> : alors que les aires visuelles précoces traitent l'orientation, la courbure et la fermeture dans des cartes de traits modulaires séparées, synthétiser ces données disparates en un percept d'objet unifié exige une allocation attentionnelle active médiée par le cortex pariétal postérieur et les champs oculaires frontaux (Treisman &amp; Gelade, 1980 ; Wolfe, 1994).` }} />

        <h3>Homogénéité des Distracteurs &amp; Efficacité du Balayage (Duncan &amp; Humphreys, 1989)</h3>
        <p dangerouslySetInnerHTML={{ __html: `Dans leurs travaux séminaux sur l'efficacité de la recherche visuelle, Duncan et Humphreys (1989) ont établi que la performance dépend de deux relations perceptives critiques :` }} />
        <ol className="list-decimal pl-5 space-y-2 my-3 text-slate-300">
          <li>
            <strong>Similarité Cible-Distracteurs :</strong> À mesure que la ressemblance visuelle entre la cible et les distracteurs s'accroît, les seuils de discrimination s'élèvent, exigeant un examen fovéal plus poussé et des temps de fixation prolongés.
          </li>
          <li>
            <strong>Homogénéité Inter-Distracteurs :</strong> Lorsque les distracteurs partagent une forme et une orientation homogènes, le système visuel les regroupe en une texture de fond unifiée selon les principes gestaltistes. En revanche, lorsque les distracteurs subissent des rotations aléatoires — comme dans cette matrice de 96 cellules —, ce regroupement s'effondre, imposant une évaluation sérielle détaillée.
          </li>
        </ol>

        <h3>Modèle du Zoom Attentionnel &amp; Charge Perceptive (Lavie, 1995 ; Eriksen &amp; St. James, 1986)</h3>
        <p dangerouslySetInnerHTML={{ __html: `Selon le modèle du zoom attentionnel (Eriksen &amp; St. James, 1986), l'attention spatiale opère comme un faisceau lumineux à focale variable. Lorsque le faisceau s'élargit pour embrasser plusieurs cellules de la grille de 96 cases, la résolution de traitement diminue ; lorsqu'il se resserre sur une cellule unique, la précision atteint son apogée au détriment de la couverture globale.` }} />
        <p dangerouslySetInnerHTML={{ __html: `Par ailleurs, la Théorie de la Charge Perceptive de Nilli Lavie (1995) démontre que la distractibilité dépend de la saturation des ressources sensorielles. En situation de faible charge, les capacités attentionnelles résiduelles s'échappent involontairement vers des stimuli non pertinents. Sous forte charge perceptive — telle que notre matrice 12x8 sous pression de 45 secondes —, la bande passante sensorielle est entièrement saturée, imposant une attention sélective stricte et neutralisant toute divagation mentale (Lavie, 1995 ; Bacon &amp; Egeth, 1994).` }} />

        <h3>Repères de Performance en Recherche Visuelle (Matrice 96 Cellules)</h3>
        <p dangerouslySetInnerHTML={{ __html: `Les paliers ci-dessous constituent un barème éditorial de référence pour interpréter vos performances sur cette grille de 96 cellules (12x8) lors de sessions chronométrées de 45 secondes :` }} />
        <div className="overflow-x-auto my-6">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Palier</th>
                <th className="py-2.5 px-3 font-semibold">Latence d&apos;Acquisition</th>
                <th className="py-2.5 px-3 font-semibold">Score 45s</th>
                <th className="py-2.5 px-3 font-semibold">Niveau Éditorial</th>
                <th className="py-2.5 px-3 font-semibold">Classification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="py-2.5 px-3 font-bold text-purple-400">Tier 1</td>
                <td className="py-2.5 px-3 font-semibold text-white">&lt; 450 ms</td>
                <td className="py-2.5 px-3 tabular-nums">&gt; 1.500 PTS (10+ cibles)</td>
                <td className="py-2.5 px-3 tabular-nums">Exceptionnel</td>
                <td className="py-2.5 px-3">Esport d&apos;Élite / Opérateur Radar</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-teal-400">Tier 2</td>
                <td className="py-2.5 px-3 font-semibold text-white">450 – 700 ms</td>
                <td className="py-2.5 px-3 tabular-nums">1.050 – 1.450 PTS (7–9 cibles)</td>
                <td className="py-2.5 px-3 tabular-nums">Avancé</td>
                <td className="py-2.5 px-3">Athlète Visuel Compétitif</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-blue-400">Tier 3</td>
                <td className="py-2.5 px-3 font-semibold text-white">701 – 1.100 ms</td>
                <td className="py-2.5 px-3 tabular-nums">600 – 1.000 PTS (4–6 cibles)</td>
                <td className="py-2.5 px-3 tabular-nums">Typique</td>
                <td className="py-2.5 px-3">Moyenne Standard Non Entraînée</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-amber-400">Tier 4</td>
                <td className="py-2.5 px-3 font-semibold text-white">1.101 – 1.600 ms</td>
                <td className="py-2.5 px-3 tabular-nums">300 – 550 PTS (2–3 cibles)</td>
                <td className="py-2.5 px-3 tabular-nums">En Dessous de la Moyenne</td>
                <td className="py-2.5 px-3">Balayage Ralenti / Fatigue Visuelle</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-rose-400">Tier 5</td>
                <td className="py-2.5 px-3 font-semibold text-white">&gt; 1.600 ms</td>
                <td className="py-2.5 px-3 tabular-nums">&lt; 300 PTS (0–1 cible)</td>
                <td className="py-2.5 px-3 tabular-nums">Débutant</td>
                <td className="py-2.5 px-3">Vision Tunnel / Surcharge Perceptive</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Protocoles Pratiques pour Développer l&apos;Efficacité du Balayage</h3>
        <ol className="list-decimal pl-5 space-y-2 my-4 text-slate-300">
          <li>
            <strong>Pré-filtrage Périphérique Global (Wolfe, 1994) :</strong> Évitez de scruter fixement chaque symbole un par un. Gardez le regard souple et fiez-vous à votre champ visuel périphérique pour écarter d&apos;un bloc les regroupements de caractères manifestement dissemblables.
          </li>
          <li>
            <strong>Parcours Saccadique en Zigzag :</strong> Ne laissez pas vos yeux errer sans direction. Suivez un balayage méthodique et régulier en zigzag sur la grille de 96 cellules afin de proscrire toute vérification redondante.
          </li>
          <li>
            <strong>Gestion du Temps de Fixation (200–250 ms) :</strong> Limitez chaque fixation fovéale au seuil physiologique strict de 200 à 250 millisecondes. Si la forme ne concorde pas immédiatement avec la cible, passez sans hésiter à la position suivante.
          </li>
          <li>
            <strong>Maintien Actif du Gabarit en Mémoire :</strong> Conservez fermement en mémoire de travail l&apos;image géométrique de la cible recherchée pour que la voie visuelle ventrale inhibe spontanément les distracteurs non pertinents (Duncan & Humphreys, 1989).
          </li>
        </ol>

        <h3>Foire Aux Questions (FAQ)</h3>
        <div className="space-y-4 my-6">
          <div>
            <h4 className="font-semibold text-white">Que mesure le test de recherche visuelle et comment s&apos;organise-t-il ?</h4>
            <p className="text-slate-300 mt-1">
              Il mesure la vitesse de balayage visuel, l&apos;efficacité de traitement des caractéristiques conjointes et l&apos;attention sélective. L&apos;utilisateur doit identifier un symbole cible parmi 96 lettres pivotées sur une grille de 12x8 en 45 secondes.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Quelle est la différence fondamentale entre recherche simple et recherche conjonctive ?</h4>
            <p className="text-slate-300 mt-1">
              La recherche simple repose sur un attribut saillant unique et produit un pop-out instantané. La recherche conjonctive exige d&apos;associer plusieurs traits, ce qui impose une inspection sérielle attentive de chaque candidat (Treisman & Gelade, 1980).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Pourquoi les lettres sont-elles pivotées dans ce test ?</h4>
            <p className="text-slate-300 mt-1">
              Parce qu&apos;une orientation régulière permet au système visuel de fusionner les distracteurs en une texture de fond homogène. Les inclinaisons aléatoires brisent cette homogénéité et imposent un véritable travail de discrimination fovéale (Duncan & Humphreys, 1989).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Quel est le principe du modèle de Recherche Guidée de Wolfe ?</h4>
            <p className="text-slate-300 mt-1">
              Il postule que les aires visuelles précoces calculent des cartes de caractéristiques en parallèle pour produire une carte corticale de priorités, guidant les saccades prioritaires vers les zones les plus probables (Wolfe, 1994).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Quel est un bon score lors de cette épreuve de 45 secondes ?</h4>
            <p className="text-slate-300 mt-1">
              Les débutants obtiennent de 300 à 550 points (2–3 cibles). La moyenne standard non entraînée se situe entre 600 et 1 000 points (4–6 cibles), tandis que les joueurs compétitifs dépassent 1 500 points (10+ cibles avec une latence &lt; 450 ms).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Qu&apos;explique la Théorie de la Charge Perceptive de Nilli Lavie ?</h4>
            <p className="text-slate-300 mt-1">
              Elle démontre qu&apos;une forte sollicitation sensorielle consomme l&apos;intégralité des ressources attentionnelles, neutralisant ainsi les pensées parasites ou les stimuli extérieurs sans rapport avec la tâche (Lavie, 1995).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Comment le balayage visuel d&apos;un expert se distingue-t-il de celui d&apos;un novice ?</h4>
            <p className="text-slate-300 mt-1">
              Les profils expérimentés appliquent un parcours en zigzag rigoureux, exploitent leur vision périphérique et limitent les fixations à 200–250 ms, alors que les débutants sautent d&apos;un point à un autre et stagnent trop longtemps sur chaque élément.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Existe-t-il des pénalités de score en cas d&apos;erreur de clic ?</h4>
            <p className="text-slate-300 mt-1">
              Aucun point n&apos;est retranché et aucune seconde n&apos;est retirée. Une fausse manœuvre entraîne simplement un bref clignotement rouge, favorisant une prise de décision rapide et résolue.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Dans quelles professions et disciplines sportives cette compétence est-elle essentielle ?</h4>
            <p className="text-slate-300 mt-1">
              En radiologie, contrôle aérien, inspection de sécurité douanière, surveillance militaire, ainsi que dans les sports d&apos;action et les jeux de tir tactiques où repérer une cible camouflée en une fraction de seconde fait toute la différence.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Comment accélérer durablement sa vitesse d&apos;exploration visuelle ?</h4>
            <p className="text-slate-300 mt-1">
              En s&apos;astreignant à un balayage ordonné en zigzag, en apprenant à écarter les distracteurs par lots grâce à la vision périphérique et en refusant de s&apos;attarder plus d&apos;un quart de seconde sur un même point.
            </p>
          </div>
        </div>
      </DrillGuide>
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/fr/drills/visual/visual-recognition/visual-search" />
      </div>
    </>
  );
}
