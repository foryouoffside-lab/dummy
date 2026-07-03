import SteadyHandClient from './SteadyHandClient';

export const metadata = {
  title: "Steady Hand Test - Mouse Stability Game | SkillDrills",
  description: "Play the classic Steady Hand Game online. Trace the winding corridor and test your hand stability, mouse precision, and coordination.",
  keywords: [
    "steady hand game",
    "steady hand test",
    "wire loop game",
    "buzz wire game",
    "mouse precision test",
    "hand stability game",
    "cursor control test",
    "mouse precision training",
    "hand eye coordination game",
    "motor coordination training",
    "fine motor skills game",
    "cursor control game",
    "mouse control training",
    "path tracing game",
    "fps mouse training",
    "mouse tracking"
  ],
  openGraph: {
    title: "Steady Hand Test - Mouse Stability Game | SkillDrills",
    description: "Play the classic Steady Hand Game online. Trace the winding corridor and test your hand stability, mouse precision, and coordination.",
    type: 'website',
    url: 'https://skilldrills.online/drills/motor/precision-control/steady-hand',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Steady Hand Test - Mouse Stability Game',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Steady Hand Test - Mouse Stability Game | SkillDrills",
    description: "Play the classic Steady Hand Game online. Trace the winding corridor and test your hand stability, mouse precision, and coordination.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/precision-control/steady-hand',
  },
};

export default function SteadyHandPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
      { "@type": "ListItem", "position": 2, "name": "Motor Training", "item": "https://skilldrills.online/drills/motor" },
      { "@type": "ListItem", "position": 3, "name": "Precision Control", "item": "https://skilldrills.online/drills/motor/precision-control" },
      { "@type": "ListItem", "position": 4, "name": "Steady Hand Game", "item": "https://skilldrills.online/drills/motor/precision-control/steady-hand" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Steady Hand Game - Mouse Precision Training",
    "url": "https://skilldrills.online/drills/motor/precision-control/steady-hand",
    "description": "Free steady hand game and mouse path tracing drill. Trace a winding corridor with your cursor to build elite mouse precision and fine motor control. Endless survival difficulty scaling.",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires a modern web browser with JavaScript and Pointer Lock API support.",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "author": { "@type": "Organization", "name": "SkillDrills" },
    "isAccessibleForFree": true,
    "learningResourceType": "Educational Game",
    "teaches": "Mouse Precision, Fine Motor Skills, Hand Steadiness, Continuous Cursor Control, Hand-Eye Coordination"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the Steady Hand Game?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Steady Hand Game is a browser-based cursor control drill that tests your fine motor skills. You must carefully guide your mouse through a glowing, randomly generated path without touching the edges to survive."
        }
      },
      {
        "@type": "Question",
        "name": "How does a steady hand test work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A steady hand test measures the stability of your mouse hand. Guided by a wire loop game mechanic, it evaluates your coordination and reaction time to identify hand tremor thresholds."
        }
      },
      {
        "@type": "Question",
        "name": "How do I improve my mouse accuracy with this drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "By forcing you to keep your cursor perfectly aligned within a narrow, highly jagged path, this drill trains the micro-muscles in your wrist and forearm, eliminating mouse jitter and improving raw aiming stability."
        }
      },
      {
        "@type": "Question",
        "name": "Does the difficulty increase?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, this is an endless survival game. Every time you score 100 points, the level increases. The path becomes narrower, the wave amplitude becomes sharper, and the amount of micro-corrections required scales infinitely."
        }
      },
      {
        "@type": "Question",
        "name": "What happens when I make a mistake?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If your cursor slips off the glowing line, your combo multiplier resets to 1x and you lose 3 seconds off your survival clock. Your score is never reduced, meaning your final score directly reflects how long you survived."
        }
      },
      {
        "@type": "Question",
        "name": "Is this a good warmup for FPS games like Valorant or CS2?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Before practicing fast flick shots, you must calibrate your mouse stability. Tracing paths builds the foundation for smooth tracking aim and controlled recoil compensation."
        }
      },
      {
        "@type": "Question",
        "name": "Is this Steady Hand drill free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our mouse precision training game is 100% free to play online. There are no downloads or sign-ups required, and it uses hardware pointer-lock for 1:1 raw mouse input."
        }
      },
      {
        "@type": "Question",
        "name": "How does the Combo System work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Every time you successfully complete a lap without slipping off the path, your combo multiplier increases. This multiplier drastically boosts the points you receive per lap. One mistake breaks the combo back to 1x."
        }
      },
      {
        "@type": "Question",
        "name": "What is Adrenaline Mode?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When your survival timer drops below 15 seconds, Adrenaline Mode activates. The screen pulses, heartbeat audio begins, and tension increases, training you to maintain fine motor control under high pressure."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Steady Hands and Mouse Control",
    "description": "Step-by-step instructions to train wrist stability and eliminate cursor jitter.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Lock raw pointer coordinates",
        "text": "Press Start. Lock your mouse pointer to raw input mode to enable 1:1 sensor calibration."
      },
      {
        "@type": "HowToStep",
        "name": "Trace the wire path",
        "text": "Guide the cursor smoothly through the center of the winding corridor path without letting it brush the border edges."
      },
      {
        "@type": "HowToStep",
        "name": "Recover from slip-offs",
        "text": "If you brush the edges, quickly micro-adjust your wrist back into the corridor path to resume tracking multipliers before the timer expires."
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

      <SteadyHandClient />
    </>
  );
}