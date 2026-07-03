import RapidTappingClient from './RapidTappingClient';

export const metadata = {
  title: "CPS Test - Click Speed Test Online | SkillDrills",
  description: "Test and improve your clicks per second with our free CPS Test. Practice jitter clicking, butterfly clicking, and rapid tapping speed online.",
  keywords: [
    "cps test",
    "click speed test",
    "clicks per second test",
    "click speed game",
    "click speed trainer",
    "cps trainer",
    "free click speed test",
    "online cps test",
    "mouse click speed test",
    "fast clicking test",
    "rapid tapping test",
    "finger tapping speed test",
    "click endurance test",
    "minecraft cps",
    "butterfly clicking",
    "jitter clicking",
    "drag clicking practice"
  ],
  openGraph: {
    title: "CPS Test - Click Speed Test Online | SkillDrills",
    description: "Test and improve your clicks per second with our free CPS Test. Practice jitter clicking, butterfly clicking, and rapid tapping speed online.",
    type: 'website',
    url: 'https://skilldrills.online/drills/motor/movement-speed/rapid-tapping',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'CPS Test - Click Speed Test Online',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "CPS Test - Click Speed Test Online | SkillDrills",
    description: "Test and improve your clicks per second with our free CPS Test. Practice jitter clicking, butterfly clicking, and rapid tapping speed online.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/movement-speed/rapid-tapping',
  },
};

export default function RapidTappingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
      { "@type": "ListItem", "position": 2, "name": "Motor Training", "item": "https://skilldrills.online/drills/motor" },
      { "@type": "ListItem", "position": 3, "name": "Movement Speed", "item": "https://skilldrills.online/drills/motor/movement-speed" },
      { "@type": "ListItem", "position": 4, "name": "Click Speed Test", "item": "https://skilldrills.online/drills/motor/movement-speed/rapid-tapping" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CPS Test - Click Speed Test Online",
    "url": "https://skilldrills.online/drills/motor/movement-speed/rapid-tapping",
    "description": "A free click speed test and CPS trainer. Survive by expanding a shrinking ball through rapid tapping. Difficulty scales dynamically based on score.",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires a modern web browser with JavaScript support.",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "author": { "@type": "Organization", "name": "SkillDrills" },
    "isAccessibleForFree": true,
    "learningResourceType": "Educational Game",
    "teaches": "Clicks Per Second (CPS), Mouse Control, Finger Dexterity, Clicking Endurance, Jitter Clicking Technique"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a Click Speed Test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A click speed test is a browser-based game that measures your CPS (Clicks Per Second). It tests how fast you can click your mouse button within a specific timeframe or survival condition, evaluating your finger speed and motor endurance."
        }
      },
      {
        "@type": "Question",
        "name": "What is a good CPS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An average CPS is around 5 to 7 clicks per second. A 'good' or competitive CPS is typically between 8 and 10. Elite gamers using techniques like jitter clicking or butterfly clicking can achieve 12 to 15+ CPS."
        }
      },
      {
        "@type": "Question",
        "name": "Does CPS matter in Minecraft?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, CPS is highly critical in Minecraft PvP. A higher click speed allows you to land more hits, deal more knockback, and trap your opponent in combos, making rapid tapping skills essential for competitive servers."
        }
      },
      {
        "@type": "Question",
        "name": "Does CPS matter in FPS games like Valorant or CS2?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In tactical FPS games, raw CPS is less important than clicking accuracy and mouse control. However, having high finger agility helps with rapid semi-automatic firing (bursting) without tensing your hand and disrupting your aim."
        }
      },
      {
        "@type": "Question",
        "name": "What is jitter clicking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Jitter clicking is a technique where you tense the muscles in your forearm and wrist to create a rapid vibration (jitter) in your finger, allowing you to click the mouse much faster than normal tapping."
        }
      },
      {
        "@type": "Question",
        "name": "What is butterfly clicking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Butterfly clicking involves alternating clicks between your index and middle fingers on the same mouse button. It is a highly effective way to double your CPS, especially in games like Minecraft."
        }
      },
      {
        "@type": "Question",
        "name": "How do I improve my click speed and endurance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can improve your click speed by routinely practicing with a CPS test, learning advanced techniques like jitter or butterfly clicking, and doing click endurance games to build forearm stamina and neuromuscular adaptation."
        }
      },
      {
        "@type": "Question",
        "name": "Is this drill free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, the SkillDrills Click Speed Test is 100% free forever. It runs directly in your browser with zero downloads, no subscriptions, and no sign-up required."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Clicks Per Second (CPS)",
    "description": "Step-by-step instructions to train mouse click speed and finger clicking endurance.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Initiate click testing session",
        "text": "Press Start. A target circle will render on the canvas. The countdown timer begins."
      },
      {
        "@type": "HowToStep",
        "name": "Click target rapidly",
        "text": "Use jitter clicking or butterfly clicking techniques to tap the mouse button on the target. Tap fast enough to prevent the target ball from shrinking completely."
      },
      {
        "@type": "HowToStep",
        "name": "Review CPS score",
        "text": "Analyze your average clicks per second (CPS) and peak click frequency to identify forearm fatigue thresholds."
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

      <RapidTappingClient />
    </>
  );
}