import TargetSwitchingSwarmClient from './TargetSwitchingSwarmClient';

export const metadata = {
  title: "Target Switching Trainer — Multi-Target Aim | SkillDrills",
  description: "Improve multi-target transitions with our free Target Switching Aim Trainer. Practice rapid flicks and multi-kill aim for Valorant, CS2 & Apex.",
  keywords: [
    "target switching aim trainer",
    "target switching swarm drill",
    "rapid target acquisition",
    "multi kill aim trainer",
    "Valorant target switching",
    "aim switching drill",
    "multi target aim trainer",
    "target switching practice",
    "rapid target switching",
    "multi kill aim training",
    "target swarm trainer",
    "flick transition trainer",
    "cs2 multi target practice",
    "apex aim trainer",
    "multi target flick training",
    "free multi target aim trainer",
    "cs2 spray transfer trainer",
    "target acquisition speed",
    "multi target flick practice",
    "valorant multi kill aim"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/target-switching-swarm",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Target Switching Trainer — Multi-Target Aim | SkillDrills",
    description: "Improve multi-target transitions with our free Target Switching Aim Trainer. Practice rapid flicks and multi-kill aim for Valorant, CS2 & Apex.",
    url: "https://skilldrills.online/drills/fps/target-switching-swarm",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Target Switching Trainer — Multi-Target Aim | SkillDrills",
    description: "Improve multi-target transitions with our free Target Switching Aim Trainer. Practice rapid flicks and multi-kill aim for Valorant, CS2 & Apex.",
  },
};

export default function TargetSwitchingSwarmPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Target Switching Swarm", "item": "https://skilldrills.online/drills/fps/target-switching-swarm" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Target Switching Aim Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "A free browser FPS aim trainer for improving rapid target switching, multi-kill sequences, and flick transitions between target swarms.",
    "genre": "FPS Training / Target Switching",
    "url": "https://skilldrills.online/drills/fps/target-switching-swarm",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Target Switching Swarm",
    "url": "https://skilldrills.online/drills/fps/target-switching-swarm",
    "description": "A free browser FPS aim trainer for improving rapid target switching, multi-kill sequences, and flick transitions between target swarms.",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is target switching in FPS aim training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Target switching is the mechanical skill of rapidly flicking your crosshair from one target to the next and clicking accurately during the transition. It trains continuous movement between different target locations."
        }
      },
      {
        "@type": "Question",
        "name": "How does the target swarm format improve multi-kill mechanics?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The swarm format presents multiple targets simultaneously, requiring you to engage them in a fluid sequence rather than waiting for each to appear one at a time. This maintains momentum during multi-kills."
        }
      },
      {
        "@type": "Question",
        "name": "How is target switching different from a standard flick trainer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A standard flick trainer presents targets one at a time. A target switching trainer presents multiple active targets and measures your ability to transition between them rapidly in sequence."
        }
      },
      {
        "@type": "Question",
        "name": "Which games need the best target switching mechanics?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Target switching is essential in Valorant and CS2 for multi-peek entry duels and spray transfers, Apex Legends for team wipes, and Overwatch 2 for DPS aggressive positioning."
        }
      },
      {
        "@type": "Question",
        "name": "How are errors penalised in Target Switching Swarm?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Missing a shot or letting a target's time-to-live expire resets your combo multiplier. When the optional Time Penalty setting is enabled, each error deducts 0.5s from your timer."
        }
      },
      {
        "@type": "Question",
        "name": "Why do I hesitate after eliminating a target?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hesitation occurs because your brain waits for visual confirmation before searching for the next target. Drills train you to trust your shot and move your eyes to the next target immediately."
        }
      },
      {
        "@type": "Question",
        "name": "What is target acquisition speed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Target acquisition speed is the combined cognitive process of identifying a threat on screen, predicting its path, and executing the flick to engage it."
        }
      },
      {
        "@type": "Question",
        "name": "How does target switching help with CS2 spray transfers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Target switching is the foundation of a spray transfer. Before controlling recoil between targets, your raw crosshair relocation speed must be instantaneous."
        }
      },
      {
        "@type": "Question",
        "name": "What is efficient target pathing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Efficient pathing means eliminating a cluster of targets in an order that requires the least amount of overall mouse movement, reducing total time-to-kill."
        }
      },
      {
        "@type": "Question",
        "name": "Should my eyes move before my crosshair?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Your eyes should snap to the next target the millisecond you click on the current one. Your hand will naturally follow your eye movement."
        }
      },
      {
        "@type": "Question",
        "name": "How does target switching help in Apex Legends?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In Apex Legends, target switching allows you to rapidly transfer fire between multiple squad members pushing your position or flying through the air."
        }
      },
      {
        "@type": "Question",
        "name": "Does target switching improve general flicking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Target switching is essentially chaining multiple dynamic flicks together consecutively without returning to a center resting position."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I practice target switching?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Incorporate 10-15 minutes of pure target switching drills into your daily warm-up routine alongside flicking and tracking exercises."
        }
      },
      {
        "@type": "Question",
        "name": "Is this Target Switching Aim Trainer free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, this Target Switching Aim Trainer is 100% free, runs directly in your web browser using raw hardware pointer lock, and requires no downloads."
        }
      },
      {
        "@type": "Question",
        "name": "What skills does this target switching drill improve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This drill improves multi-target transitions, target acquisition speed, flick deceleration, visual processing, pathing efficiency, and multi-kill mechanics."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Target Switching Swarm",
    "description": "Step-by-step instructions to train rapid target switches and multi-kill kinematics.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Acquire first target",
        "text": "Flick quickly to the nearest target in the swarm and click to eliminate it."
      },
      {
        "@type": "HowToStep",
        "name": "Transition instantly",
        "text": "The millisecond the first target is destroyed, release muscle tension and flick instantly to the next target. Do not pause or wait to confirm the hit."
      },
      {
        "@type": "HowToStep",
        "name": "Develop flow rhythm",
        "text": "Keep your wrist fluid. Continue switching targets in a rhythmic sweep pattern to build muscle memory autopilot."
      }
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
      <TargetSwitchingSwarmClient />
    </>
  );
}
