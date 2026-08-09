import AwarenessDrillClient from './AwarenessDrillClient';

export const metadata = {
  title: "180° Aim Trainer — Snap Turn Awareness | SkillDrills",
  description: "Master reaction speed and 180° snap turns with our free online 180 Aim Trainer. Practice spatial awareness and dominate CS2 & Valorant.",
  keywords: [
    // Primary
    "180 aim trainer",
    // Secondary
    "180 flick aim trainer",
    "snap turn aim trainer",
    "CS2 180 turn practice",
    "Valorant 180 flick drill",
    // Long-tail
    "how to practice 180 flicks",
    "how to improve behind you awareness fps",
    "best 180 turn drill for CS2",
    "free browser 180 aim trainer",
    "180 degree spin shot training",
    "flank awareness training fps",
    "improve turn speed aim trainer"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/180-degree-awareness",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "180° Aim Trainer — Snap Turn Awareness | SkillDrills",
    description: "Master reaction speed and 180° snap turns with our free online 180 Aim Trainer. Practice spatial awareness and dominate CS2 & Valorant.",
    url: "https://skilldrills.online/drills/fps/180-degree-awareness",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    // No `images` here on purpose. opengraph-image.js in this folder generates a
    // proper 1200x630 card at build time and Next injects og:image, its width/height,
    // and twitter:image automatically. Re-adding a manual images array would put a
    // second, wrong-shaped candidate back in the tag list — the old 512x512 icon was
    // square, so `summary_large_image` silently downgraded to a small summary card.
  },
  twitter: {
    card: 'summary_large_image',
    title: "180° Aim Trainer — Snap Turn Awareness | SkillDrills",
    description: "Master reaction speed and 180° snap turns with our free online 180 Aim Trainer. Practice spatial awareness and dominate CS2 & Valorant.",
  },
};

export default function AwarenessDrillPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "180° Awareness Pro", "item": "https://skilldrills.online/drills/fps/180-degree-awareness" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "180° Awareness Pro",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "An interactive web-based 180 flick aim trainer to improve reaction speed, snap turns, and spatial awareness for CS2 and Valorant.",
    "genre": "FPS Training / Situational Awareness",
    "url": "https://skilldrills.online/drills/fps/180-degree-awareness",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "180° Awareness Pro",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "url": "https://skilldrills.online/drills/fps/180-degree-awareness",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is FPS awareness training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "FPS awareness training involves specific drills designed to improve your ability to detect, process, and react to peripheral visual information and unexpected threats in a 3D gaming environment."
        }
      },
      {
        "@type": "Question",
        "name": "How do professional FPS players and esports pros improve awareness?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pros utilize a mix of VOD reviews, dedicated aim trainers with wide field-of-view scenarios, and 180-degree flick drills to build unconscious competence in spatial mapping — the same skill many esports organizations train to maintain peak mechanical performance."
        }
      },
      {
        "@type": "Question",
        "name": "Can awareness drills improve reaction time?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, by repeatedly exposing the brain to peripheral stimuli, visual processing speed increases, reducing the cognitive load required to react to flanking enemies."
        }
      },
      {
        "@type": "Question",
        "name": "How does peripheral vision training help in FPS games?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Strong peripheral vision lets you notice subtle movements or pixel changes at the edge of your screen without taking your crosshair off your primary angle. Playing with an ultra-wide field of view (FOV) in-game and drilling edge-of-screen spawns like this trainer both reinforce that skill."
        }
      },
      {
        "@type": "Question",
        "name": "How do I stop getting flanked in FPS games?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Improving spatial audio processing and training high-speed 180-degree turnaround flicks will allow you to quickly neutralize flankers before they secure the kill."
        }
      },
      {
        "@type": "Question",
        "name": "What is situational awareness in gaming?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Situational awareness is the holistic understanding of game state, audio cues, minimap information, and peripheral visual data to anticipate enemy actions."
        }
      },
      {
        "@type": "Question",
        "name": "Does this drill help with CS2, Valorant, and other FPS games?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. In Valorant, quick target acquisition and reacting to utility or flashes off-screen is critical, and in CS2 flicking to an unexpected target on the edge of your monitor can win clutch rounds. Fast-paced shooters like Apex Legends, Overwatch 2, and Call of Duty benefit the same way."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I train 180° awareness?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For optimal results, implement 10-15 minutes of awareness and wide-flick training into your daily warmup routine before queuing competitive matches."
        }
      },
      {
        "@type": "Question",
        "name": "What skills does this drill improve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It targets peripheral detection, audio-spatial translation, saccadic eye movement, large-angle mouse flick consistency, and target acquisition speed as shrinking targets spawn across a wider horizontal plane under time pressure."
        }
      },
      {
        "@type": "Question",
        "name": "Is this awareness trainer free, and do I need to sign up?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, this drill is completely free and runs directly in your browser with 1:1 hardware raw input — no registration required."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Practice the 180 Flick Aim Drill",
    "description": "Step-by-step instructions to train your snap targets and behind-you awareness using the SkillDrills trainer.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Configure Sensitivity",
        "text": "Set up the browser mouse input sensitivity to match your in-game Valorant or CS2 sensitivity settings."
      },
      {
        "@type": "HowToStep",
        "name": "Start the Drill",
        "text": "Click 'Start' to begin the scenario. A target will spawn directly behind your initial field of view."
      },
      {
        "@type": "HowToStep",
        "name": "Snap and Shoot",
        "text": "Perform a rapid 180-degree swipe, center your crosshair, and click the target before the timer expires."
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

      <AwarenessDrillClient />
    </>
  );
}
