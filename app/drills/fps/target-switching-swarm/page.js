import TargetSwitchingSwarmClient from './TargetSwitchingSwarmClient';

export const metadata = {
  title: "Target Switching Aim Trainer - Swarm Drill | SkillDrills",
  description: "Improve multi-target transitions with our Target Switching Aim Trainer. Practice rapid flicks, target swarm control, and multi-kill aim online.",
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
    "free multi target aim trainer"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/target-switching-swarm",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Target Switching Aim Trainer - Swarm Drill | SkillDrills",
    description: "Improve multi-target transitions with our Target Switching Aim Trainer. Practice rapid flicks, target swarm control, and multi-kill aim online.",
    url: "https://skilldrills.online/drills/fps/target-switching-swarm",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: "Target Switching Aim Trainer - Swarm Drill",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Target Switching Aim Trainer - Swarm Drill | SkillDrills",
    description: "Improve multi-target transitions with our Target Switching Aim Trainer. Practice rapid flicks, target swarm control, and multi-kill aim online.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is target switching in FPS aim training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Target switching is the mechanical skill of rapidly flicking your crosshair from one target to the next and clicking accurately during the transition. Unlike single-target flicking (same position repeatedly), target switching involves continuous movement between different target locations — more closely simulating real multi-kill scenarios in competitive matches."
        }
      },
      {
        "@type": "Question",
        "name": "How does the target swarm format improve multi-kill mechanics?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The swarm format presents multiple targets simultaneously or in rapid succession, requiring you to engage them in a fluid sequence rather than waiting for each to appear one at a time. This trains the specific challenge of maintaining momentum during a multi-kill — not losing your aim rhythm between kills the way many players do during real match clutches."
        }
      },
      {
        "@type": "Question",
        "name": "How is target switching different from a standard flick trainer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A standard flick trainer presents targets at random positions and you click each independently with no time pressure between them. A target switching trainer presents multiple active targets and measures your ability to transition between them rapidly. It trains the full multi-kill kinematic chain: flick to target A, click, immediately flick to target B, click — with speed and accuracy on each."
        }
      },
      {
        "@type": "Question",
        "name": "Which games need the best target switching mechanics?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Arena shooters (Quake, Diabotical) require the fastest raw target switching. In team shooters, Valorant with its 5v5 close-range spray duels, CS2 eco and pistol rounds (where multi-kills happen at short range), Apex Legends team wipes, and Overwatch 2 aggressive flanking DPS all demand proficient target switching sequences."
        }
      },
      {
        "@type": "Question",
        "name": "Should I train target switching at higher or lower sensitivity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Train target switching at your standard in-game sensitivity. Some players temporarily increase sensitivity slightly to build faster large-movement reflexes, then return to standard for precision refinement. Focus on accuracy across all switch targets equally — it is common to be strong on the first 2 targets but fall off on the 3rd and 4th."
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

      <TargetSwitchingSwarmClient />
    </>
  );
}

