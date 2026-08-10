import ConcentrationGridClient from './ConcentrationGridClient';

export const metadata = {
  title: "Concentration Grid — Sequential Number Search Trainer | SkillDrills",
  description: "Sharpen visual search speed and sustained focus with Concentration Grid — tap numbers in order on expanding 3x3 to 8x8 grids. Free, browser-based cognitive training.",
  keywords: [
    "concentration grid",
    "visual search training",
    "sequential number search",
    "cognitive training game",
    "sustained attention drill",
    "focus training online",
    "visual scanning speed",
    "peripheral vision training",
    "free brain training game",
    "improve concentration online",
    "number grid game",
    "attention span training"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/cognitive/focus/concentration-grid",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Concentration Grid — Sequential Number Search Trainer | SkillDrills",
    description: "Sharpen visual search speed and sustained focus with Concentration Grid — tap numbers in order on expanding 3x3 to 8x8 grids. Free, browser-based cognitive training.",
    url: "https://skilldrills.online/drills/cognitive/focus/concentration-grid",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    // No `images` here on purpose — opengraph-image.js in this folder generates a
    // proper 1200x630 card at build time and Next injects og:image automatically.
  },
  twitter: {
    card: 'summary_large_image',
    title: "Concentration Grid — Sequential Number Search Trainer | SkillDrills",
    description: "Sharpen visual search speed and sustained focus with Concentration Grid — tap numbers in order on expanding 3x3 to 8x8 grids. Free, browser-based cognitive training.",
  },
};

export default function ConcentrationGridPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Cognitive Drills", "item": "https://skilldrills.online/drills/cognitive" },
      { "@type": "ListItem", "position": 3, "name": "Concentration Grid", "item": "https://skilldrills.online/drills/cognitive/focus/concentration-grid" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Concentration Grid",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "An interactive web-based cognitive trainer that tests visual search speed and sustained attention by tapping sequential numbers on expanding grids.",
    "genre": "Cognitive Training / Focus",
    "url": "https://skilldrills.online/drills/cognitive/focus/concentration-grid",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Concentration Grid",
    "gamePlatform": "Web Browser",
    "genre": ["Cognitive Training", "Focus Trainer"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "url": "https://skilldrills.online/drills/cognitive/focus/concentration-grid",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Concentration Grid?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Concentration Grid is a timed cognitive exercise where players find and tap numbers in sequential order (1, 2, 3...) on a randomized, expanding grid as fast as possible."
        }
      },
      {
        "@type": "Question",
        "name": "How is score calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Score is awarded for each correct sequential tap, with a speed bonus for fast reaction time. Completing a full grid also grants a large clear bonus based on grid dimension."
        }
      },
      {
        "@type": "Question",
        "name": "Why do grid sizes change?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "As you complete smaller grids, the board expands to larger sizes. Tighter spacing and more numbers increase visual clutter, forcing your brain to expand its peripheral scanning field."
        }
      },
      {
        "@type": "Question",
        "name": "Does the timer ever change during a session?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Every session runs on one fixed 45-second clock with zero time bonuses or penalties. Clearing a grid grows the board to the next size, but the clock keeps counting down the whole time — chain clears together to rack up as many grids as you can before time's up."
        }
      },
      {
        "@type": "Question",
        "name": "What happens when I run out of lives?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You start each session with 3 lives, shown as hearts in the HUD. Every wrong tap costs one life; losing your last life ends the run immediately, regardless of time remaining."
        }
      },
      {
        "@type": "Question",
        "name": "What cognitive skill does Concentration Grid actually train?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It primarily trains visual search efficiency — the speed at which your brain scans a cluttered field and locates a specific target among distractors. This relies on efficient micro-saccadic eye movements and peripheral vision rather than central foveal focus alone."
        }
      },
      {
        "@type": "Question",
        "name": "Where did the concentration grid exercise originate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Numbered scanning grids trace back to sports psychology performance labs and are a staple warm-up in football, tennis, and combat sports training. Coaches use them to sharpen an athlete's ability to process a busy visual field quickly before switching attention to the actual game action."
        }
      },
      {
        "@type": "Question",
        "name": "Why do the numbers rotate at larger grid sizes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "From the 5x5 grid onward, each number tile is rendered at a slight random rotation. This removes the shortcut of recognizing a number purely by its shape and orientation, forcing genuine digit recognition and keeping visual search difficulty climbing alongside grid size."
        }
      },
      {
        "@type": "Question",
        "name": "How does this compare to a standard Schulte table?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This drill is a timed, gamified evolution of the classic Schulte table (a fixed 5x5 number grid used in speed-reading and attention training). Instead of one static grid, it chains progressively larger grids together against a single countdown clock, rewarding sustained accuracy over the whole run rather than one isolated attempt."
        }
      },
      {
        "@type": "Question",
        "name": "Is this concentration grid test free to play?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Concentration Grid on SkillDrills is completely free with no sign-up, downloads, or paywalls. It runs directly in your browser on desktop and mobile."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Play Concentration Grid",
    "description": "Step-by-step instructions for training visual search speed and sustained focus with the SkillDrills Concentration Grid trainer.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Start the Drill",
        "text": "Click 'Start' to begin. A 3x3 grid of scattered numbers appears on screen."
      },
      {
        "@type": "HowToStep",
        "name": "Tap in Sequence",
        "text": "Find and tap each number in strict numerical order, starting from 1, as quickly as possible."
      },
      {
        "@type": "HowToStep",
        "name": "Clear and Advance",
        "text": "Clearing a full grid advances you to a larger grid, testing broader peripheral vision, all within one fixed 45-second clock. Avoid wrong taps — you only have 3 lives."
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

      <ConcentrationGridClient />
    </>
  );
}
