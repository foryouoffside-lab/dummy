import AimTrainerClient from '@/app/drills/motor/hand-eye-coordination/aim-trainer/AimTrainerClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Aim Trainer en Ligne – Précision de Souris FPS | SkillDrills",
  description: "Aim trainer en ligne gratuit: Entrainez la precision de souris, les micro-flicks et le temps de reaction selon la loi de Fitts sans telechargement.",
  keywords: [
    "aim trainer en ligne",
    "entrainement aim fps gratuit",
    "precision souris test en ligne",
    "aim trainer navigateur",
    "exercice de flick shot souris",
    "test de visee souris fps",
    "entrainement tir valorant gratuit",
    "loi de fitts entrainement souris",
    "reflexe souris fps en ligne",
    "ameliorer son aim souris",
    "test precision clic souris",
    "echauffement aim fps en ligne"
  ],
  alternates: {
    canonical: "https://skilldrills.online/fr/drills/motor/hand-eye-coordination/aim-trainer",
    languages: getAlternateLanguages('/drills/motor/hand-eye-coordination/aim-trainer'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Aim Trainer en Ligne – Précision de Souris FPS | SkillDrills",
    description: "Aim trainer en ligne gratuit: Entrainez la precision de souris, les micro-flicks et le temps de reaction selon la loi de Fitts sans telechargement.",
    url: "https://skilldrills.online/fr/drills/motor/hand-eye-coordination/aim-trainer",
    siteName: 'SkillDrills',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Aim Trainer en Ligne – Précision de Souris FPS | SkillDrills",
    description: "Aim trainer en ligne gratuit: Entrainez la precision de souris, les micro-flicks et le temps de reaction selon la loi de Fitts sans telechargement.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "SkillDrills",
      "item": "https://skilldrills.online/fr"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Entrainements Moteurs",
      "item": "https://skilldrills.online/fr/drills/motor"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Coordination Oeil-Main",
      "item": "https://skilldrills.online/fr/drills/motor/hand-eye-coordination"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Aim Trainer en Ligne",
      "item": "https://skilldrills.online/fr/drills/motor/hand-eye-coordination/aim-trainer"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Aim Trainer en Ligne",
  "url": "https://skilldrills.online/fr/drills/motor/hand-eye-coordination/aim-trainer",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "dateModified": "2026-09-16",
  "author": {
    "@type": "Organization",
    "name": "SkillDrills"
  }
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Aim Trainer en Ligne",
  "url": "https://skilldrills.online/fr/drills/motor/hand-eye-coordination/aim-trainer",
  "description": "Entraineur de visee et de precision de souris gratuit dans le navigateur avec difficulte adaptative selon la loi de Fitts.",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires JavaScript. Requires HTML5 Canvas.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "author": {
    "@type": "Organization",
    "name": "SkillDrills"
  },
  "isAccessibleForFree": true,
  "dateModified": "2026-09-16"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Aim Trainer en Ligne",
  "url": "https://skilldrills.online/fr/drills/motor/hand-eye-coordination/aim-trainer",
  "description": "Jeu de tir et d entrainement a la precision de la souris mesurant la coordination motrice oeil-main et les micro-flicks.",
  "dateModified": "2026-09-16",
  "gamePlatform": "Web Browser",
  "genre": ["Aim Trainer", "FPS Training", "Hand-Eye Coordination", "Motor Control"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment s entrainer a la precision de souris avec Aim Trainer",
  "description": "Protocole en 4 etapes pour ameliorer la vitesse d acquisition de cibles et la precision des micro-flicks selon la loi de Fitts.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/fr/drills/motor/hand-eye-coordination/aim-trainer#step-1",
      "name": "Verrouiller la saisie de souris",
      "text": "Cliquez pour activer le verrouillage de pointeur (pointer-lock) et calibrez votre sensibilite physique en cm/360."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/fr/drills/motor/hand-eye-coordination/aim-trainer#step-2",
      "name": "Executer l impulsion balistique initiale",
      "text": "Effectuez un flick franc du poignet couvrant 90% de la distance jusqu a la cible sans hesiter."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/fr/drills/motor/hand-eye-coordination/aim-trainer#step-3",
      "name": "Appliquer la micro-correction terminale",
      "text": "Ralentissez fluidement aux abords de la cible pour caler le reticule sur le centre exact du cercle."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/fr/drills/motor/hand-eye-coordination/aim-trainer#step-4",
      "name": "Maintenir la serie de combos",
      "text": "Enchainez les clics nets sans tir dans le vide pour faire grimper le multiplicateur de score jusqu a 3,0x."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-16",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu est-ce que l Aim Trainer en ligne et comment fonctionne-t-il ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L Aim Trainer en ligne est un exercice interactif de coordination motrice concu pour entrainer la vitesse d acquisition de cible, la precision du clic et la regularite gestuelle de la souris sur des cibles dynamiques retrecissantes."
      }
    },
    {
      "@type": "Question",
      "name": "Comment la loi de Fitts s applique-t-elle a la visee FPS ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La loi de Paul M. Fitts (1954) etablit que le temps de mouvement necessaire pour atteindre une cible depend logarithmiquement du ratio entre la distance et la taille de la cible (Indice de Difficulte). Plus la cible est petite et eloignee, plus le controle neuromusculaire doit etre affine."
      }
    },
    {
      "@type": "Question",
      "name": "Qu est-ce que le modele a deux composantes de Woodworth ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Robert S. Woodworth (1899) et Elliott et al. (2010) ont demontre qu un mouvement de visee rapide comprend une premiere impulsion balistique en boucle ouverte (couvrant la majeure partie du trajet), suivie d une phase de controle terminal en boucle fermee utilisant le retour visuel."
      }
    },
    {
      "@type": "Question",
      "name": "L entrainement aux micro-flicks se transfere-t-il a Valorant et CS2 ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, les duels dans les jeux de tir tactiques reposent sur des micro-ajustements balistiques de 5 a 15 degres pour ajuster la tete d un adversaire. Cet exercice entraine precisement ces mouvements de haute precision."
      }
    },
    {
      "@type": "Question",
      "name": "Qu est-ce qu un bon score sur cet Aim Trainer ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un joueur debutant se situe generalement en dessous de 8 000 points (Niveaux 1–2). Un joueur regulier atteint 18 000 a 31 999 points (Niveaux 6–8), tandis qu un compétiteur esport depasse 48 000 points avec plus de 95 % de precision."
      }
    },
    {
      "@type": "Question",
      "name": "Comment fonctionne la difficulte adaptative dans cet exercice ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tous les 1 750 points marques, le niveau augmente: le rayon de la cible diminue de 26px a 8px, la vitesse augmente de 80px/s a 370px/s, et la duree de vie de la cible chute de 2,8s a 0,40s."
      }
    },
    {
      "@type": "Question",
      "name": "Pourquoi les tirs rates penalist-ils le multiplicateur de combo ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cliquer dans le vide ou laisser une cible disparaitre reinitialise le combo a 1,0x. Cela sanctionne le spam compulsif et encourage une visee deliberee et maitrisee."
      }
    },
    {
      "@type": "Question",
      "name": "Cet exercice prend-il en charge la sensibilite universelle de la souris ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, il utilise l API Pointer Lock du navigateur web pour assurer un suivi direct 1:1 sans acceleration logicielle Windows, correspondant a votre reglage cm/360 habituel."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est l impact du taux de rafraichissement de l ecran sur la visee ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un ecran a 144 Hz ou 240 Hz et une souris a 1 000 Hz reduisent le delai d affichage et les saccades visuelles, permettant au cortex visuel de recevoir l information de position 10 a 12 ms plus tot par mouvement."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle routine d echauffement produit les meilleurs gains de precision ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Une session quotidienne de 10 a 15 minutes axee sur la precision des micro-flicks et une acceleration progressive active le cortex moteur et stabilise la tenue de mire sous pression."
      }
    }
  ]
};

const copyFr = {
  title: "Aim Trainer en Ligne",
  subtitle: "Acquisition de cible dynamique & Précision de clic • Progression sans fin",
  caption: "Visez et cliquez sur les cibles mobiles aussi rapidement et précisément que possible avant leur disparition. Fondé sur la loi de Fitts.",
  startButtonText: "LANCER L'ENTRAÎNEMENT",
  playAgainText: "Rejouer",
  shareText: "Partager le Score",
  exitText: "Quitter",
  rulesTitle: "Instructions & Système de Score",
  aboutTitle: "À Propos d'Aim Trainer Elite",
  rulesItems: [
    {
      num: "1",
      text: "Cible Touchée",
      highlight: "+100 PTS / +0,6s",
      result: "Acquérir et cliquer sur les cibles mobiles"
    },
    {
      num: "2",
      text: "Combo Continu",
      highlight: "Jusqu'à 3,0× Multiplicateur",
      result: "Enchaîner les tirs réussis sans faute"
    },
    {
      num: "3",
      text: "Progression de Niveau",
      highlight: "+1 Niveau / 1750 PTS",
      result: "Cibles réduites et accélérées"
    },
    {
      num: "4",
      text: "Tir Raté & Expiration",
      highlight: "Combo Réinitialisé",
      result: "Pénalité active déduit -0,8s"
    }
  ]
};

export default function AimTrainerFrenchPage() {
  const sources = pickSources('fitts1954', 'mackenzie1992', 'elliott2010', 'woodworth1899', 'woods2015');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <AimTrainerClient copy={copyFr} />

      <DrillGuide
        eyebrow="Psychophysique du Contrôle Moteur & Interaction Homme-Machine"
        title="La Science de la Visée à la Souris, Loi de Fitts & Précision Motrice"
        sources={sources}
      >
        <p>
          L acquisition de cible a l aide d une souris d ordinateur figure parmi les taches de coordination motrice fine les plus exigeantes etudiees en interaction homme-machine (IHM) et en psychophysique sportive. Qu il s agisse de tenir une ligne dans un jeu de tir tactique a la premiere personne ou de manoeuvrer une interface robotisee de haute precision, le systeme neuromusculaire doit traduire des coordonnees visuelles bidimensionnelles en contractions physiques sous-millimetriques de la main, du poignet et de l avant-bras (Fitts, 1954; MacKenzie, 1992).
        </p>

        <h3>Loi de Fitts &amp; Indice de Difficulté (ID)</h3>
        <p>
          Dans ses travaux pionniers de 1954, Paul M. Fitts a etabli que le temps de mouvement (\(MT\)) necessaire pour atteindre une zone cible repond a une fonction logarithmique reliant la distance (\(D\)) a la largeur ou diametre de la cible (\(W\)) :
        </p>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 my-3 text-center font-mono text-sm text-cyan-300">
          MT = a + b · log₂(2D / W) = a + b · ID
        </div>
        <p>
          Cette composante logarithmique est appelee l <strong>Indice de Difficulte (ID)</strong>, exprimee en bits d information. Dans cet Aim Trainer, a mesure que votre score progresse, le diametre des cibles (\(W\)) retrecit de 26 pixels a seulement 8 pixels, tandis que les cibles se deplacent et apparaissent sur de plus grandes distances (\(D\)). Cette dynamique augmente exponentiellement l Indice de Difficulte, sollicitant au maximum la bande passante neuromusculaire de votre systeme moteur (Fitts, 1954; MacKenzie, 1992).
        </p>

        <h3>Le Modèle à Deux Composantes du Mouvement Visé (Woodworth 1899; Elliott et al. 2010)</h3>
        <p>
          La visee a haute vitesse n est pas un geste unique et continu. Les decouvertes historiques de Woodworth (1899) et les syntheses modernes d Elliott et al. (2010) demontrent qu un mouvement de pointage se decompose en deux sous-phases distinctes :
        </p>
        <ul className="list-disc pl-5 space-y-2 my-3 text-slate-300">
          <li>
            <strong>L impulsion balistique initiale (Boucle ouverte) :</strong> Une acceleration motrice puissante et non ajustee couvrant environ 85 % a 90 % de la trajectoire globale vers la cible.
          </li>
          <li>
            <strong>Le controle en cours de mouvement (Boucle fermee) :</strong> Une phase de deceleration guidee par la retroaction visuelle directe permettant d ajuster le reticule au centre de la cible avant le clic.
          </li>
        </ul>
        <p>
          Les joueurs non entraînés souffrent fréquemment d&apos;<em>over-flicking</em> (force balistique excessive imposant des allers-retours correctifs oscillatoires) ou d&apos;<em>under-flicking</em> (décélération prématurée entraînant une approche hésitante et lente vers la cible). Les tireurs d&apos;élite minimisent la variance motrice en calibrant l&apos;impulsion balistique pour qu&apos;elle s&apos;interrompe exactement sur le bord de la cible, ne nécessitant qu&apos;un micro-ajustement instantané (Elliott et al., 2010; Woods et al., 2015).
        </p>

        <h3>Taux de Rafraîchissement, Quantisation &amp; Délais Neuro-sensoriels</h3>
        <p>
          Un timing de clic chirurgical exige de minimiser la latence du système. Comme documenté par Woods et al. (2015), les temps de réaction motrice humains sont limités par la conduction neurosensorielle (transmission rétinienne ~30–50 ms, traitement cortical visuel ~60–80 ms, transmission corticospinale motrice ~40–60 ms). Sur un moniteur à 60 Hz, les images sont quantisées par pas de 16,7 ms ; à 144 Hz ou 240 Hz, ce délai chute à 6,9 ms ou 4,1 ms, offrant une rétroaction visuelle plus fluide qui réduit drastiquement l&apos;erreur de trajectoire lors de la phase de visée en boucle fermée.
        </p>

        <h3>Paliers de Référence : Vitesse &amp; Précision d Acquisition de Cible</h3>
        <p>
          Les paliers suivants reposent sur l analyse de sessions de tir de 45 secondes, croisant le score brut, le niveau de difficulte atteint et la regularite du combo :
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-xs sm:text-sm border-collapse border border-white/10 text-left">
            <thead>
              <tr className="bg-white/5 text-slate-200">
                <th className="p-2.5 border border-white/10 font-semibold">Palier</th>
                <th className="p-2.5 border border-white/10 font-semibold">Score Brut</th>
                <th className="p-2.5 border border-white/10 font-semibold">Niveau Atteint</th>
                <th className="p-2.5 border border-white/10 font-semibold">Précision &amp; Combo</th>
                <th className="p-2.5 border border-white/10 font-semibold">Classification Neuro-motrice</th>
              </tr>
            </thead>
            <tbody className="text-slate-300 divide-y divide-white/5">
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-amber-300">Palier 1 : Maître</td>
                <td className="p-2.5 border border-white/10">48 000+ PTS</td>
                <td className="p-2.5 border border-white/10">Niveau 12+</td>
                <td className="p-2.5 border border-white/10">&gt; 95 % (Combo 25+)</td>
                <td className="p-2.5 border border-white/10">Niveau esport élite : micro-corrections quasi-instantanées</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-cyan-300">Palier 2 : Avancé</td>
                <td className="p-2.5 border border-white/10">32 000 – 47 999 PTS</td>
                <td className="p-2.5 border border-white/10">Niveau 9–11</td>
                <td className="p-2.5 border border-white/10">88 % – 94 % (Combo 18–24)</td>
                <td className="p-2.5 border border-white/10">Excellente précision balistique et faible dispersion</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-blue-400">Palier 3 : Compétent</td>
                <td className="p-2.5 border border-white/10">18 000 – 31 999 PTS</td>
                <td className="p-2.5 border border-white/10">Niveau 6–8</td>
                <td className="p-2.5 border border-white/10">78 % – 87 % (Combo 12–17)</td>
                <td className="p-2.5 border border-white/10">Niveau intermédiaire solide : bonne tenue de trajectoire</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-amber-400">Palier 4 : En développement</td>
                <td className="p-2.5 border border-white/10">8 000 – 17 999 PTS</td>
                <td className="p-2.5 border border-white/10">Niveau 3–5</td>
                <td className="p-2.5 border border-white/10">65 % – 77 % (Combo 6–11)</td>
                <td className="p-2.5 border border-white/10">Niveau récréatif standard : hésitations fréquentes sur micro-flicks</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-rose-400">Palier 5 : Débutant</td>
                <td className="p-2.5 border border-white/10">&lt; 8 000 PTS</td>
                <td className="p-2.5 border border-white/10">Niveau 1–2</td>
                <td className="p-2.5 border border-white/10">&lt; 65 % (Combo &lt; 6)</td>
                <td className="p-2.5 border border-white/10">Forte dispersion motrice et dépassement systématique des cibles</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Protocole d Entraînement de la Visée à la Souris</h3>
        <p>
          Pour reduire methodiquement la latence d acquisition et maximiser la precision de clic, appliquez ces quatre principes fondes sur la recherche neuromotrice :
        </p>
        <ul className="list-disc pl-5 space-y-2 my-3 text-slate-300">
          <li>
            <strong>Calibration de l impulsion balistique (Woodworth, 1899; Elliott et al., 2010) :</strong> Entrainez votre flick principal a couvrir 90 % de la trajectoire en une seule impulsion nette. Evitez les micro-arrets intermediaires en cours de vol.
          </li>
          <li>
            <strong>Deceleration terminale et centrage (Fitts, 1954) :</strong> Lorsque le pointeur entre dans la zone cible, basculez sur un controle fin des doigts et du poignet pour absorber l inertie avant de declencher le tir.
          </li>
          <li>
            <strong>Sensibilite universelle en cm/360 (MacKenzie, 1992) :</strong> Calibrez la sensibilite physique de votre souris afin qu un deplacement donne de la main corresponde toujours a la meme distance sur l ecran, consolidant ainsi votre memoire musculaire.
          </li>
          <li>
            <strong>Discipline de clic et maintien souple (Woods et al., 2015) :</strong> Gardez une prise de souris souple. Veillez a ce que la pression mecanique du clic n entraine aucune torsion physique qui decalerait le reticule hors de la hitbox.
          </li>
        </ul>

        <h3>Foire Aux Questions (FAQ)</h3>
        <div className="space-y-4 my-4">
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">Qu&apos;est-ce que l&apos;Aim Trainer en ligne et comment fonctionne-t-il ?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              L&apos;Aim Trainer en ligne est un exercice interactif de coordination motrice conçu pour entraîner la vitesse d&apos;acquisition de cible, la précision du clic et la régularité gestuelle de la souris sur des cibles dynamiques rétrécissantes.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">Comment la loi de Fitts s&apos;applique-t-elle à la visée FPS ?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              La loi de Paul M. Fitts (1954) établit que le temps de mouvement nécessaire pour atteindre une cible dépend logarithmiquement du ratio entre la distance et la taille de la cible (Indice de Difficulté). Plus la cible est petite et éloignée, plus le contrôle neuromusculaire doit être affiné.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">Qu&apos;est-ce que le modèle à deux composantes de Woodworth ?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Robert S. Woodworth (1899) et Elliott et al. (2010) ont démontré qu&apos;un mouvement de visée rapide comprend une première impulsion balistique en boucle ouverte (couvrant la majeure partie du trajet), suivie d&apos;une phase de contrôle terminal en boucle fermée utilisant le retour visuel.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">L&apos;entraînement aux micro-flicks se transfère-t-il à Valorant et CS2 ?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Oui, les duels dans les jeux de tir tactiques reposent sur des micro-ajustements balistiques de 5 à 15 degrés pour ajuster la tête d&apos;un adversaire. Cet exercice entraîne précisément ces mouvements de haute précision.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">Qu&apos;est-ce qu&apos;un bon score sur cet Aim Trainer ?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Un joueur débutant se situe généralement en dessous de 8 000 points (Niveaux 1–2). Un joueur régulier atteint 18 000 à 31 999 points (Niveaux 6–8), tandis qu&apos;un compétiteur esport dépasse 48 000 points avec plus de 95 % de précision.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">Comment fonctionne la difficulté adaptative dans cet exercice ?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Tous les 1 750 points marqués, le niveau augmente : le rayon de la cible diminue de 26px à 8px, la vitesse augmente de 80px/s à 370px/s, et la durée de vie de la cible chute de 2,8s à 0,40s.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">Pourquoi les tirs ratés pénalisent-ils le multiplicateur de combo ?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Cliquer dans le vide ou laisser une cible disparaître réinitialise le combo à 1,0x. Cela sanctionne le spam compulsif et encourage une visée délibérée et maîtrisée.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">Cet exercice prend-il en charge la sensibilité universelle de la souris ?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Oui, il utilise l&apos;API Pointer Lock du navigateur web pour assurer un suivi direct 1:1 sans accélération logicielle Windows, correspondant à votre réglage cm/360 habituel.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">Quel est l&apos;impact du taux de rafraîchissement de l&apos;écran sur la visée ?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Un écran à 144 Hz ou 240 Hz et une souris à 1 000 Hz réduisent le délai d&apos;affichage et les saccades visuelles, permettant au cortex visuel de recevoir l&apos;information de position 10 à 12 ms plus tôt par mouvement.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">Quelle routine d&apos;échauffement produit les meilleurs gains de précision ?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Une session quotidienne de 10 à 15 minutes axée sur la précision des micro-flicks et une accélération progressive active le cortex moteur et stabilise la tenue de mire sous pression.
            </p>
          </div>
        </div>
      </DrillGuide>

      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/drills/motor/hand-eye-coordination/aim-trainer" locale="fr" />
      </div>
      <DrillFooter />
    </>
  );
}
