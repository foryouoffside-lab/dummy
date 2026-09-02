import VerticalAirTrackClient from './VerticalAirTrackClient';

export const metadata = {
  title: "Vertical Aim Trainer — Y-Axis Tracking | SkillDrills",
  description: "Improve your Y-axis mouse control with our free Vertical Aim Trainer. Practice aerial tracking and arc prediction for Apex Legends & Overwatch.",
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
    "vertical aim practice",
    "overwatch air tracking",
    "apex air tracking trainer",
    "halo infinite vertical aim",
    "parabolic arc tracking"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/vertical-air-track",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Vertical Aim Trainer — Y-Axis Tracking | SkillDrills",
    description: "Improve your Y-axis mouse control with our free Vertical Aim Trainer. Practice aerial tracking and arc prediction for Apex Legends & Overwatch.",
    url: "https://skilldrills.online/drills/fps/vertical-air-track",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Vertical Aim Trainer — Y-Axis Tracking | SkillDrills",
    description: "Improve your Y-axis mouse control with our free Vertical Aim Trainer. Practice aerial tracking and arc prediction for Apex Legends & Overwatch.",
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
    "description": "A free browser FPS drill training vertical aim, aerial target tracking, Y-axis mouse control, and jump shot prediction for Apex Legends, Overwatch 2, and Halo Infinite.",
    "genre": "FPS Training / Vertical & Aerial Tracking",
    "url": "https://skilldrills.online/drills/fps/vertical-air-track",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Vertical Air Track",
    "url": "https://skilldrills.online/drills/fps/vertical-air-track",
    "description": "A free browser FPS drill training vertical aim, aerial target tracking, Y-axis mouse control, and jump shot prediction for Apex Legends, Overwatch 2, and Halo Infinite.",
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
        "name": "What is vertical aim training in FPS games?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vertical aim training focuses on the Y-axis (up and down) movement of your mouse, which is systematically under-trained compared to horizontal tracking. Airborne targets require vertical mouse tracking to follow cleanly in games like Apex Legends and Overwatch 2."
        }
      },
      {
        "@type": "Question",
        "name": "What is popcorn tracking and does this drill train it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Popcorn tracking is tracking targets that bounce or hop vertically, creating irregular parabolic movement patterns — similar to popcorn kernels popping. This drill trains the specific vertical mouse control needed to track bouncing aerial movement."
        }
      },
      {
        "@type": "Question",
        "name": "How does vertical aim training help in Apex Legends?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Apex Legends features high vertical movement — grappling hooks, jump pads, Horizon lifts, and air gliding all create aerial targets. Training vertical aim specifically enables you to track and punish opponents in the air rather than losing crosshair alignment."
        }
      },
      {
        "@type": "Question",
        "name": "What is an elevator peek in FPS shooters?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An elevator peek is when an opponent uses a building's height advantage or zipline to appear above your crosshair level unexpectedly. This drill trains the upward flick and hold motion needed to instantly adjust vertical crosshair position."
        }
      },
      {
        "@type": "Question",
        "name": "Why is vertical tracking harder than horizontal tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Horizontal mouse movement is practiced constantly in daily computer use. Vertical mouse movement for precise aim is an unnatural motion that receives far less daily muscle memory training, making dedicated vertical practice essential."
        }
      },
      {
        "@type": "Question",
        "name": "How do Overwatch 2 players train aerial tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Overwatch players practice tracking high-mobility heroes like Pharah, Echo, Mercy, or Winston during leaps. Using vertical aim trainers helps smooth out Y-axis tracking adjustments."
        }
      },
      {
        "@type": "Question",
        "name": "Does vertical aim training help in Halo Infinite?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Halo Infinite features grapples, repulsors, and jump pads that launch players high into the air. Vertical tracking practice helps you land consistent shots on airborne targets."
        }
      },
      {
        "@type": "Question",
        "name": "How are errors penalised in Vertical Air-Track?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Losing tracking contact resets your active combo streak. When the optional Time Penalty setting is enabled, allowing an airborne target to drop past the bottom boundary without destroying it deducts 0.6s from your timer."
        }
      },
      {
        "@type": "Question",
        "name": "How do professional players track parabolic arcs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pros anticipate target acceleration at the start of a jump and slow down their tracking near the apex of the arc where vertical velocity drops to zero, securing high-damage tracking ticks."
        }
      },
      {
        "@type": "Question",
        "name": "What is Y-axis mouse sensitivity calibration?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Y-axis sensitivity calibration ensures your vertical mouse movements feel natural and proportional to horizontal movements. Some players run a 1:1 ratio, while others adjust Y-sensitivity to compensate for wrist biomechanics."
        }
      },
      {
        "@type": "Question",
        "name": "Does vertical tracking help in Titanfall 2?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Titanfall 2 features extreme verticality, wall-running, and double jumping, which require excellent vertical tracking skills to counter."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I train vertical aim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We recommend training vertical aim for 10-15 minutes daily as part of your FPS warm-up routine to build consistent muscle memory on the Y-axis."
        }
      },
      {
        "@type": "Question",
        "name": "Is this vertical aim trainer free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, this Vertical Air Track Aim Trainer is 100% free, runs in any desktop browser using raw hardware pointer input, and contains no ads."
        }
      },
      {
        "@type": "Question",
        "name": "What skills does this drill improve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This drill trains vertical tracking, air tracking, parabolic arc prediction, Y-axis mouse control, visual processing speed, and tracking consistency."
        }
      },
      {
        "@type": "Question",
        "name": "Can vertical aim training improve overall tracking consistency?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, isolating vertical aim training smooths out jittery vertical movements, making your overall mouse tracking more consistent across both axes."
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

      {/* VideoGame Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
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
