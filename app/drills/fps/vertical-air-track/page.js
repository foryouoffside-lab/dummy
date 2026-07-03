import VerticalAirTrackClient from './VerticalAirTrackClient';

export const metadata = {
  title: "Vertical Aim Trainer - Aerial Y-Axis Tracking | SkillDrills",
  description: "Improve your Y-axis mouse control with our Vertical Aim Trainer. Practice aerial target tracking and popcorn tracking for Apex and Overwatch.",
  keywords: [
    "vertical aim training",
    "popcorn tracking aim practice",
    "Y-axis mouse control drill",
    "aerial target tracking",
    "Apex vertical aim trainer",
    "vertical aim trainer",
    "vertical tracking trainer",
    "air tracking trainer",
    "aerial aim training",
    "y axis aim training",
    "airborne target tracking",
    "vertical mouse control",
    "jump shot training fps",
    "popcorn tracking trainer",
    "elevator peek aim",
    "vertical aim practice"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/vertical-air-track",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Vertical Aim Trainer - Aerial Y-Axis Tracking | SkillDrills",
    description: "Improve your Y-axis mouse control with our Vertical Aim Trainer. Practice aerial target tracking and popcorn tracking for Apex and Overwatch.",
    url: "https://skilldrills.online/drills/fps/vertical-air-track",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: "Vertical Aim Trainer - Aerial Y-Axis Tracking",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Vertical Aim Trainer - Aerial Y-Axis Tracking | SkillDrills",
    description: "Improve your Y-axis mouse control with our Vertical Aim Trainer. Practice aerial target tracking and popcorn tracking for Apex and Overwatch.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

export default function VerticalAirTrackPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Vertical Air Track", "item": "https://skilldrills.online/drills/fps/vertical-air-track" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Vertical Aim Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "A free browser FPS drill training vertical aim, aerial target tracking, Y-axis mouse control, and jump shot prediction for Apex Legends, Overwatch 2, and Titanfall 2.",
    "genre": "FPS Training / Vertical & Aerial Tracking",
    "url": "https://skilldrills.online/drills/fps/vertical-air-track",
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
        "name": "What is vertical aim training in FPS games?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vertical aim training focuses on the Y-axis (up and down) movement of your mouse, which is systematically under-trained compared to horizontal tracking. Aerial targets — enemies who are jumping, climbing, or moving through vertical space — require vertical mouse tracking to follow. Most aim trainers use primarily horizontal movement, leaving vertical tracking as a significant skill gap for most players."
        }
      },
      {
        "@type": "Question",
        "name": "What is \"popcorn tracking\" and does this drill train it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Popcorn tracking is the colloquial term for tracking targets that bounce or hop vertically, creating irregular up-down movement patterns — similar to popcorn bouncing in a bag. It is a critical skill for Apex Legends where characters like Pathfinder and Octane use vertical movement to evade shots. This drill trains the specific vertical mouse control needed to track bouncing aerial movement."
        }
      },
      {
        "@type": "Question",
        "name": "How does vertical aim training help in Apex Legends?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Apex Legends has more vertical movement than almost any other battle royale — grappling hooks, jump pads, elevated terrain, and air gliding all create aerial targets. Shooting players in the air requires Y-axis tracking that horizontal practice never develops. Training vertical aim specifically closes this gap, enabling you to punish opponents in the air rather than losing them when they go vertical."
        }
      },
      {
        "@type": "Question",
        "name": "What is an elevator peek and how does this drill prepare you for it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An elevator peek is when an opponent uses a building's height advantage to appear above your crosshair level unexpectedly, requiring you to flick or track vertically upward immediately. This drill trains the upward flick and hold motion, building the mouse control needed to instantly adjust vertical crosshair position when enemies appear from elevated positions."
        }
      },
      {
        "@type": "Question",
        "name": "Is vertical tracking harder than horizontal tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For most players, yes. Horizontal mouse movement is practiced constantly in daily computer use (browsing, working). Vertical mouse movement for precise aim is an unnatural motion that receives far less daily training. The asymmetry in practice explains why most FPS players track horizontal movement more consistently than vertical — and why dedicated vertical training provides outsized improvement."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Vertical Y-Axis Tracking",
    "description": "Step-by-step instructions to train aerial tracking and vertical mouse control.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Position at vertical center",
        "text": "Center your crosshair on the grid. Relax your shoulder and wrist to enable clean vertical movement paths."
      },
      {
        "@type": "HowToStep",
        "name": "Follow the aerial arc",
        "text": "Track the target as it arcs up and down. Focus on matching the acceleration at the start of the jump and deceleration at the peak."
      },
      {
        "@type": "HowToStep",
        "name": "Incorporate smooth pull downs",
        "text": "When targets drop quickly, draw your mouse straight down without side-to-side jitter to maintain a smooth vertical alignment."
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

      <VerticalAirTrackClient />
    </>
  );
}

