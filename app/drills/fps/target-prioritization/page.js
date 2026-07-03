import TargetPrioritizationClient from './TargetPrioritizationClient';

export const metadata = {
  title: "Target Prioritization FPS Trainer - Kill Order | SkillDrills",
  description: "Improve threat assessment and kill order decision-making. Practice multi-target selection and distractor suppression with our FPS trainer.",
  keywords: [
    "target prioritization fps trainer",
    "kill order decision making",
    "multi threat target selection",
    "clutch aim training",
    "tactical shooter focus",
    "target prioritization trainer",
    "fps target prioritization",
    "kill order training fps",
    "threat assessment trainer",
    "target selection training",
    "multi target decision making",
    "fps cognitive training",
    "visual filtering training",
    "distractor suppression drill",
    "clutch decision making training",
    "valorant target prioritization",
    "enemy prioritization game"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/target-prioritization",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Target Prioritization FPS Trainer - Kill Order | SkillDrills",
    description: "Improve threat assessment and kill order decision-making. Practice multi-target selection and distractor suppression with our FPS trainer.",
    url: "https://skilldrills.online/drills/fps/target-prioritization",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: "Target Prioritization FPS Trainer - Kill Order",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Target Prioritization FPS Trainer - Kill Order | SkillDrills",
    description: "Improve threat assessment and kill order decision-making. Practice multi-target selection and distractor suppression with our FPS trainer.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

export default function TargetPrioritizationPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Target Prioritization", "item": "https://skilldrills.online/drills/fps/target-prioritization" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Target Prioritization FPS Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "A free browser FPS drill training multi-target threat assessment, kill order decisions, and tactical target selection for competitive shooters.",
    "genre": "FPS Training / Cognitive Decision-Making",
    "url": "https://skilldrills.online/drills/fps/target-prioritization",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is target prioritization in FPS games?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Target prioritization is the cognitive skill of deciding which enemy to shoot first when multiple threats appear simultaneously. The correct kill order considers: which enemy is the most immediate danger (weapon out, closer, aggressive position), which eliminates the most threat from the round (entry fragger vs. support), and which target is most mechanically achievable in the current crosshair position. This skill is almost entirely cognitive — it is game sense."
        }
      },
      {
        "@type": "Question",
        "name": "Why is kill order important in Valorant and CS2?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In team-based tactical shooters, eliminating the highest-threat enemy first cascades into a numbers advantage for the rest of the round. Killing a support before the entry fragger allows the fragger to continue pushing. Eliminating the closest threat before the distant one prevents immediate death. Poor kill order decisions cost rounds far more often than poor aim in high-rank play."
        }
      },
      {
        "@type": "Question",
        "name": "How does this drill train threat assessment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The drill presents multiple targets with visual cues indicating their threat level, and you must click them in the optimal priority order. This trains selective attention (identifying the highest threat from multiple simultaneous visual inputs) and decision speed (making the priority call faster than the enemy can react to you)."
        }
      },
      {
        "@type": "Question",
        "name": "Does target prioritization training help in clutch situations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Significantly. Clutch situations (1vN) require near-perfect prioritization — which enemy is isolated, which is holding a position, which can be baited. Players who practice prioritization develop an intuitive threat map that updates as they collect information, enabling faster and more accurate decisions during high-pressure clutch attempts."
        }
      },
      {
        "@type": "Question",
        "name": "Is this a cognitive skill or a mechanical skill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Primarily cognitive. Target prioritization involves pattern recognition, working memory (remembering enemy positions), executive function (making the priority decision), and inhibitory control (suppressing the urge to shoot the visually dominant target instead of the most dangerous one). Mechanical aim executes the decision — but the decision itself is where most players at mid-rank lose rounds."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Target Prioritization",
    "description": "Step-by-step instructions to train kill order decisions and multi-target threat assessment.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Evaluate multiple threats",
        "text": "Observe the target grid. Identify visual cues indicating target threat priority (such as size, color, or speed)."
      },
      {
        "@type": "HowToStep",
        "name": "Filter out non-threats",
        "text": "Ignore distractors or low-priority targets. Focus your attention strictly on the active high-threat target."
      },
      {
        "@type": "HowToStep",
        "name": "Execute priority order",
        "text": "Flick and fire in the correct high-to-low priority sequence. Keep your movement fluid between acquisitions."
      }
    ]
  };

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <TargetPrioritizationClient />
    </>
  );
}

