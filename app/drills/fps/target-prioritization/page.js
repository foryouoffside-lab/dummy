import TargetPrioritizationClient from './TargetPrioritizationClient';

export const metadata = {
  title: "Target Prioritization Trainer | SkillDrills",
  description: "Improve your threat assessment speed, visual filtering, distractor suppression, and impulse control for competitive FPS games like Valorant & CS2.",
  keywords: [
    "target prioritization aim trainer",
    "cognitive FPS threat assessment",
    "visual filtering aim practice",
    "distractor suppression trainer",
    "Valorant target selection",
    "CS2 threat sorting drill",
    "tactical decision making aim",
    "impulse control aim drill",
    "multi target threat prioritization",
    "fps cognitive aim training",
    "rainbow six siege visual filtering",
    "overwatch target selection",
    "apex legends threat assessment",
    "target discrimination practice",
    "decoy target suppression",
    "free cognitive aim trainer",
    "fps decision speed training",
    "panic firing fix aim drill",
    "target hierarchy practice",
    "multi threat engagement drill"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/target-prioritization",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Target Prioritization Trainer | SkillDrills",
    description: "Improve your threat assessment speed, visual filtering, distractor suppression, and impulse control for competitive FPS games like Valorant & CS2.",
    url: "https://skilldrills.online/drills/fps/target-prioritization",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Target Prioritization Trainer | SkillDrills",
    description: "Improve your threat assessment speed, visual filtering, distractor suppression, and impulse control for competitive FPS games like Valorant & CS2.",
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
    "name": "Target Prioritization Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Improve your threat assessment speed, visual filtering, distractor suppression, and impulse control for competitive FPS games.",
    "genre": "FPS Training / Cognitive Threat Sorting",
    "url": "https://skilldrills.online/drills/fps/target-prioritization",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Target Prioritization",
    "url": "https://skilldrills.online/drills/fps/target-prioritization",
    "description": "Improve your threat assessment speed, visual filtering, distractor suppression, and impulse control for competitive FPS games.",
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
        "name": "What is target prioritization in FPS games?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Target prioritization is the cognitive process of evaluating multiple enemies on screen and deciding which threat to shoot first based on proximity, weapon threat level, and role."
        }
      },
      {
        "@type": "Question",
        "name": "How do professional FPS players choose targets?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Professional players assess threats instantaneously, prioritizing low-health enemies, immediate headshot threats, active duelists, and high-DPS opponents while ignoring non-threat distractors."
        }
      },
      {
        "@type": "Question",
        "name": "Why do I shoot the wrong enemy under pressure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Shooting the wrong enemy is often caused by panic firing or poor visual filtering. Under high adrenaline, the brain defaults to shooting the first movement it detects rather than sorting target threat levels."
        }
      },
      {
        "@type": "Question",
        "name": "What is threat assessment training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Threat assessment training uses cognitive drills to condition the brain to identify, rank, and eliminate targets in order of threat level (e.g., Red vs. Yellow) rather than raw visual proximity."
        }
      },
      {
        "@type": "Question",
        "name": "How can I improve target selection?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can improve target selection by training with cognitive aim tools that actively punish you for shooting decoys, helping you build impulse control and target confirmation habits."
        }
      },
      {
        "@type": "Question",
        "name": "What is distractor suppression?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Distractor suppression is the ability to ignore moving visual elements, friendly teammates, or non-threatening details (like decoy targets) to maintain absolute focus on critical targets."
        }
      },
      {
        "@type": "Question",
        "name": "Can this drill improve decision making?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, this drill forces you to make split-second decisions under time pressure. Repeated practice builds the neural pathways required to make accurate tactical decisions in games."
        }
      },
      {
        "@type": "Question",
        "name": "Does this help Valorant players?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Valorant features decoy abilities (like Yoru clones or flashes) and chaotic team fights. Target prioritization training helps you ignore decoys and target the actual threat."
        }
      },
      {
        "@type": "Question",
        "name": "Does this help CS2 players?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, CS2 requires high target discrimination, especially when holding angles or encountering multiple enemies pushing through choke points."
        }
      },
      {
        "@type": "Question",
        "name": "Does this help Rainbow Six Siege players?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Siege features visual clutter, friendly teammates close to enemies, and decoy gadgets. Visual filtering is critical to prevent friendly fire and eliminate threats."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I train target prioritization?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We recommend practicing target selection for 10 minutes daily during your warm-up routine to build visual discipline and reduce panic-firing habits."
        }
      },
      {
        "@type": "Question",
        "name": "Is this drill free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, this Target Prioritization Trainer is 100% free, open-source, and runs directly in your web browser with zero downloads required."
        }
      },
      {
        "@type": "Question",
        "name": "What skills does this drill improve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It trains threat assessment, visual filtering, distractor suppression, impulse control, tactical decision making, and target selection under intense cognitive pressure."
        }
      },
      {
        "@type": "Question",
        "name": "Can cognitive training improve FPS performance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, mechanical aim is only half the battle. Cognitive training helps you make better decisions, ensuring that your physical aim is directed at the correct target."
        }
      },
      {
        "@type": "Question",
        "name": "Why is target selection important in competitive shooters?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Even with perfect aim, shooting a friendly teammate or a low-threat target while a high-threat enemy is shooting at you will result in losing the engagement. Target selection ensures you eliminate the most critical threats first."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Target Prioritization",
    "description": "Step-by-step instructions to train cognitive threat sorting and impulse control.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Adjust Sensitivity",
        "text": "Set your Universal Sens to match your main game."
      },
      {
        "@type": "HowToStep",
        "name": "Target High-Threat Reds",
        "text": "Focus on clearing active High-Threat (Red) targets immediately before they expire."
      },
      {
        "@type": "HowToStep",
        "name": "Filter Distractors",
        "text": "Ignore Friendly (Green) units — hitting one resets your decision combo streak, so hold your fire and stay locked on active threats."
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
      <TargetPrioritizationClient />
    </>
  );
}
