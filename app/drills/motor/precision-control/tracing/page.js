import TracingClient from './TracingClient';

export const metadata = {
  title: "Mouse Tracking Test - Smooth Aim Trainer | SkillDrills",
  description: "Improve your tracking aim, mouse precision, and hand-eye coordination with our free online mouse tracking test. Follow the wave and survive.",
  keywords: [
    "mouse tracking test",
    "mouse tracking speed",
    "mouse tracking trainer",
    "aim tracking trainer",
    "mouse accuracy test",
    "precision tracing test",
    "fine motor precision",
    "mouse control practice",
    "hand eye coordination game",
    "fps tracking trainer",
    "cursor tracking game",
    "mouse tracing game",
    "aim trainer online",
    "smooth mouse movement"
  ],
  openGraph: {
    title: "Mouse Tracking Test - Smooth Aim Trainer | SkillDrills",
    description: "Improve your tracking aim, mouse precision, and hand-eye coordination with our free online mouse tracking test. Follow the wave and survive.",
    type: 'website',
    url: 'https://skilldrills.online/drills/motor/precision-control/tracing',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Mouse Tracking Test - Smooth Aim Trainer',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mouse Tracking Test - Smooth Aim Trainer | SkillDrills",
    description: "Improve your tracking aim, mouse precision, and hand-eye coordination with our free online mouse tracking test. Follow the wave and survive.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/precision-control/tracing',
  },
};

export default function TracingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
      { "@type": "ListItem", "position": 2, "name": "Motor Training", "item": "https://skilldrills.online/drills/motor" },
      { "@type": "ListItem", "position": 3, "name": "Precision Control", "item": "https://skilldrills.online/drills/motor/precision-control" },
      { "@type": "ListItem", "position": 4, "name": "Mouse Tracking Test", "item": "https://skilldrills.online/drills/motor/precision-control/tracing" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Mouse Tracking Test - Free Aim Tracking Trainer",
    "url": "https://skilldrills.online/drills/motor/precision-control/tracing",
    "description": "Free mouse tracking test and smooth aim trainer. Follow a dynamically shifting wave with your cursor to build elite mouse precision and continuous tracking aim. Endless survival difficulty scaling.",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires a modern web browser with JavaScript and Pointer Lock API support.",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "author": { "@type": "Organization", "name": "SkillDrills" },
    "isAccessibleForFree": true,
    "learningResourceType": "Educational Game",
    "teaches": "Mouse Tracking, Smooth Aim, Tracking Accuracy, Hand Steadiness, Continuous Cursor Control, Hand-Eye Coordination"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the Mouse Tracking Test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Mouse Tracking Test is an endless survival game that acts as an aim tracking trainer. You must keep your cursor locked onto a continuously moving, highly dynamic wave path to score points and stay alive."
        }
      },
      {
        "@type": "Question",
        "name": "How does this improve my tracking aim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tracking a highly erratic moving target trains your forearm and wrist to make continuous, smooth adjustments without jittering, directly mimicking the tracking mechanics required in competitive FPS games."
        }
      },
      {
        "@type": "Question",
        "name": "How does mouse tracking speed affect this test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your system's mouse tracking speed (sensitivity) determines how much physical movement is needed to follow the wave. A lower tracking speed (lower sensitivity) allows for more precise micro-adjustments, whereas a higher speed requires extreme hand control to avoid slipping off the path."
        }
      },
      {
        "@type": "Question",
        "name": "How can I change my mouse tracking speed on Mac and Windows?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "On Windows: Go to Settings > Bluetooth & Devices > Mouse, and adjust the 'Mouse Pointer Speed' slider. On macOS: Go to System Settings > Mouse, and adjust the 'Tracking Speed' slider. We recommend turning off 'Enhance Pointer Precision' (acceleration) to maintain consistency while practicing."
        }
      },
      {
        "@type": "Question",
        "name": "What happens if I slip off the wave?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Falling off the path is penalized severely. Your combo multiplier instantly resets to 1x, your screen shakes, and you lose 3.0 seconds off your survival clock. However, your score never decreases."
        }
      },
      {
        "@type": "Question",
        "name": "How does the difficulty increase?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Every time you score enough points to Level Up, the game scales. The wave scrolls faster, the curves become sharper and more volatile, and your hit-tolerance ring shrinks, requiring pixel-perfect tracking at high levels."
        }
      },
      {
        "@type": "Question",
        "name": "What is Adrenaline Mode?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When your survival timer drops below 15 seconds, the game triggers Adrenaline Mode. The screen begins to pulse red, heartbeat audio plays, and the pressure is maximized to simulate a clutch gaming scenario."
        }
      },
      {
        "@type": "Question",
        "name": "Is this a good warmup for FPS games like Valorant, Overwatch, or Apex Legends?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, it is specifically designed for high-TTK (Time to Kill) shooters like Apex Legends and Overwatch, where continuous smooth tracking is the most important mechanical skill."
        }
      },
      {
        "@type": "Question",
        "name": "Is this Mouse Tracking Trainer free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, it is 100% free forever. It runs directly in your browser with zero downloads, no subscriptions, and zero latency."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Mouse Tracking Accuracy",
    "description": "Step-by-step instructions to calibrate mouse tracking speed and train continuous tracking aim.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Calibrate mouse sensitivity settings",
        "text": "Before starting the test, adjust your operating system's tracking speed and disable pointer acceleration to ensure 1:1 sensor replication."
      },
      {
        "@type": "HowToStep",
        "name": "Start the aim tracking test",
        "text": "Press Start. Lock pointer focus to center on the canvas to activate continuous path tracking."
      },
      {
        "@type": "HowToStep",
        "name": "Maintain continuous lock-on",
        "text": "Trace the dynamic scrolling wave smoothly. Keep your cursor within the center ring of the target boundary to build score multiplier combos."
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

      <TracingClient />
    </>
  );
}