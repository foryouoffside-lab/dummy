import MouseTrackingTrainerClient from './MouseTrackingTrainerClient';

export const metadata = {
  title: "Mouse Tracking Game - Hand Eye Coordination | SkillDrills",
  description: "Improve your cursor control and smooth tracking with our free Mouse Tracking Game. Train hand-eye coordination and motor accuracy online.",
  keywords: [
    "mouse tracking game",
    "hand eye coordination game",
    "cursor tracking game",
    "tracking accuracy test",
    "mouse control training",
    "tracking trainer",
    "hand eye coordination training",
    "mouse tracking exercise",
    "cursor control game",
    "tracking aim trainer",
    "free mouse tracking game",
    "free hand eye coordination game",
    "tracking game online",
    "fine motor control game",
    "motor skills training",
    "visual tracking game",
    "smooth pursuit training",
    "tracking accuracy training",
    "gaming mouse training",
    "aim tracking practice"
  ],
  openGraph: {
    title: "Mouse Tracking Game - Hand Eye Coordination | SkillDrills",
    description: "Improve your cursor control and smooth tracking with our free Mouse Tracking Game. Train hand-eye coordination and motor accuracy online.",
    type: 'website',
    url: 'https://skilldrills.online/drills/motor/hand-eye-coordination/kinetic-target-tracking',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Mouse Tracking Game - Hand Eye Coordination'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mouse Tracking Game - Hand Eye Coordination | SkillDrills",
    description: "Improve your cursor control and smooth tracking with our free Mouse Tracking Game. Train hand-eye coordination and motor accuracy online.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/hand-eye-coordination/kinetic-target-tracking'
  }
};

export default function MouseTrackingTrainerPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
      { "@type": "ListItem", "position": 2, "name": "Motor Training", "item": "https://skilldrills.online/drills/motor" },
      { "@type": "ListItem", "position": 3, "name": "Hand-Eye Coordination", "item": "https://skilldrills.online/drills/motor" },
      { "@type": "ListItem", "position": 4, "name": "Mouse Tracking Game", "item": "https://skilldrills.online/drills/motor/hand-eye-coordination/kinetic-target-tracking" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Mouse Tracking Game - Hand Eye Coordination Training",
    "url": "https://skilldrills.online/drills/motor/hand-eye-coordination/kinetic-target-tracking",
    "description": "Improve hand eye coordination and tracking accuracy with this free mouse tracking game. Train cursor control, motor skills and smooth tracking online.",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "author": { "@type": "Organization", "name": "SkillDrills" },
    "isAccessibleForFree": true
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a mouse tracking game?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A mouse tracking game is a specialized browser tool designed to help gamers and athletes improve their tracking accuracy and cursor control by keeping their crosshair continuously locked onto a dynamically moving target."
        }
      },
      {
        "@type": "Question",
        "name": "How does tracking training improve hand eye coordination?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It forces your brain to process spatial velocity and translate it into real-time physical hand movements, enhancing fine motor skills and reducing latency between visual tracking and exact cursor adjustments."
        }
      },
      {
        "@type": "Question",
        "name": "Can tracking games improve FPS aim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, engaging in smooth pursuit tracking directly translates to better aim training in first-person shooters, particularly for high-TTK (Time to Kill) games like Apex Legends that require sustained cursor control."
        }
      },
      {
        "@type": "Question",
        "name": "How do professional gamers train tracking accuracy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Professional gamers use an aim tracking practice routine daily, utilizing tools like our mouse tracking game to refine their micro-adjustments, target prediction, and smooth pursuit mechanics under pressure."
        }
      },
      {
        "@type": "Question",
        "name": "What skills does this tracking trainer improve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This tool vastly improves fine motor skills, continuous tracking accuracy, visual tracking, cursor control efficiency, and overall hand-eye coordination through dynamic gravity-shifted exercises."
        }
      },
      {
        "@type": "Question",
        "name": "Is this mouse tracking game free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our tracking trainer is completely free to play online with no downloads required, offering immediate browser-based access to top-tier hand eye coordination training."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Mouse Tracking Accuracy",
    "description": "Step-by-step instructions to train mouse tracking and smooth pursuit cursor control.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Activate the tracking session",
        "text": "Click Start. A moving target sphere will appear and begin traveling across the training grid."
      },
      {
        "@type": "HowToStep",
        "name": "Lock cursor onto target",
        "text": "Move your cursor directly over the target sphere. Keep your crosshair aligned as the target changes direction."
      },
      {
        "@type": "HowToStep",
        "name": "Maintain continuous contact",
        "text": "Smoothly match target acceleration and deceleration. The system measures accuracy as the percentage of time your cursor remains on the target."
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
      
      {/* WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      
      <MouseTrackingTrainerClient />
    </>
  );
}