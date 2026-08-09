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
