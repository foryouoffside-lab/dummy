import GestureSpeedClient from './GestureSpeedClient';

export const metadata = {
  title: "Gesture Speed Test - Mouse Gesture Speed Trainer | SkillDrills",
  description: "Test and improve your cursor swipe velocity and reaction speed with our free Gesture Speed Test. Train mouse gesture control and mouse speed online.",
  keywords: [
    "gesture speed test",
    "mouse gesture speed trainer",
    "swipe gesture speed test",
    "mouse gesture game",
    "mouse gesture training",
    "improve mouse control",
    "hand eye coordination game",
    "mouse speed test",
    "mouse speed game",
    "mouse accuracy test",
    "mouse precision training",
    "fps aim trainer",
    "aim trainer online",
    "free aim trainer",
    "browser aim trainer",
    "gesture speed test online",
    "mouse acceleration test",
    "mouse dexterity game"
  ],
  openGraph: {
    title: "Gesture Speed Test - Mouse Gesture Speed Trainer | SkillDrills",
    description: "Test and improve your cursor swipe velocity and reaction speed with our free Gesture Speed Test. Train mouse gesture control and mouse speed online.",
    type: 'website',
    url: 'https://skilldrills.online/drills/motor/movement-speed/gesture-speed',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Gesture Speed Test - Mouse Gesture Speed Trainer',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Gesture Speed Test - Mouse Gesture Speed Trainer | SkillDrills",
    description: "Test and improve your cursor swipe velocity and reaction speed with our free Gesture Speed Test. Train mouse gesture control and mouse speed online.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/movement-speed/gesture-speed',
  },
};

export default function GestureSpeedPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
      { "@type": "ListItem", "position": 2, "name": "Motor Training", "item": "https://skilldrills.online/drills/motor" },
      { "@type": "ListItem", "position": 3, "name": "Movement Speed", "item": "https://skilldrills.online/drills/motor/movement-speed" },
      { "@type": "ListItem", "position": 4, "name": "Gesture Speed Test", "item": "https://skilldrills.online/drills/motor/movement-speed/gesture-speed" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Gesture Speed Test - Mouse Gesture Speed Trainer",
    "url": "https://skilldrills.online/drills/motor/movement-speed/gesture-speed",
    "description": "Free online gesture speed test and mouse speed trainer. Hover center to spawn gates, swipe or flick to activate them, and return to center to build massive speed combos.",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires a modern web browser with JavaScript and Pointer Lock API support.",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "author": { "@type": "Organization", "name": "SkillDrills" },
    "isAccessibleForFree": true,
    "learningResourceType": "Educational Game",
    "teaches": "Mouse precision, gesture speed, reflex speed, stopping power, flick aim accuracy."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a gesture speed test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A gesture speed test is a specialized motor skill exercise where users practice rapidly moving their mouse from a resting point to a target and immediately returning. It measures your physical hand gesture velocity and cursor acceleration."
        }
      },
      {
        "@type": "Question",
        "name": "How does gesture training improve mouse control?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It forces you to execute the 'swipe-and-return' mechanic. By swiping to a target, clicking, and instantly returning to the center point, you build the stopping power and muscle memory necessary for high-precision cursor control."
        }
      },
      {
        "@type": "Question",
        "name": "How do professional gamers train gesture speed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Professional gamers use browser-based mouse speed tests and gesture trainers to isolate their wrist and arm movements. They perform thousands of repetitive swipes under aggressive time limits to train their nervous system to act automatically."
        }
      },
      {
        "@type": "Question",
        "name": "Is this gesture speed test free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our Gesture Speed Test is 100% free. There are no downloads, no subscriptions, and no sign-ups required to access the full training platform."
        }
      },
      {
        "@type": "Question",
        "name": "Does it improve hand-eye coordination?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, it is a highly effective hand-eye coordination game. You must visually process the location of the outer gate and translate that into an exact physical mouse swipe within fractions of a second."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Gesture Speed",
    "description": "Step-by-step instructions to train gesture velocity and rapid recentering accuracy.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Spawn the active gate",
        "text": "Click Start. Place your cursor inside the center hub circle to activate the tracking grid and spawn a gate."
      },
      {
        "@type": "HowToStep",
        "name": "Swipe quickly to target",
        "text": "Make a rapid, clean mouse swipe directly through the spawned target gate. Execute a click if required by the drill settings."
      },
      {
        "@type": "HowToStep",
        "name": "Recenter cursor immediately",
        "text": "Instantly decelerate your cursor and pull it back to the center hub zone to reset the sequence and build your speed combo."
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

      <GestureSpeedClient />
    </>
  );
}