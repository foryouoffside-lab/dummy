import StrafeTrackingClient from './StrafeTrackingClient';

export const metadata = {
  title: "Strafe Tracking Aim Trainer - Horizontal FPS Drill | SkillDrills",
  description: "Improve your horizontal mouse smoothness with our Strafe Tracking Aim Trainer. Practice tracking side-to-side moving targets for Apex and Valorant.",
  keywords: [
    "strafe tracking aim trainer",
    "horizontal tracking trainer",
    "strafe tracking practice",
    "ADAD strafe tracking",
    "movement tracking practice",
    "Apex strafe tracker",
    "tracking aim trainer",
    "side to side tracking fps",
    "fps tracking practice",
    "mouse smoothness trainer",
    "reactive strafe tracking",
    "aim tracking game",
    "crosshair tracking drill",
    "apex legends aim trainer",
    "overwatch tracking practice",
    "valorant tracking drill"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/strafe-tracking",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Strafe Tracking Aim Trainer - Horizontal FPS Drill | SkillDrills",
    description: "Improve your horizontal mouse smoothness with our Strafe Tracking Aim Trainer. Practice tracking side-to-side moving targets for Apex and Valorant.",
    url: "https://skilldrills.online/drills/fps/strafe-tracking",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: "Strafe Tracking Aim Trainer - Horizontal FPS Drill",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Strafe Tracking Aim Trainer - Horizontal FPS Drill | SkillDrills",
    description: "Improve your horizontal mouse smoothness with our Strafe Tracking Aim Trainer. Practice tracking side-to-side moving targets for Apex and Valorant.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

export default function StrafeTrackingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Strafe Tracking", "item": "https://skilldrills.online/drills/fps/strafe-tracking" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Strafe Tracking Aim Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "A free browser FPS drill training horizontal strafe tracking, mouse smoothness, and counter-strafe reading against side-to-side moving targets.",
    "genre": "FPS Training / Strafe Tracking",
    "url": "https://skilldrills.online/drills/fps/strafe-tracking",
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
        "name": "What is strafe tracking in FPS games?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Strafe tracking is the ability to keep your crosshair on an enemy who is moving side-to-side (strafing). Unlike smooth arcing targets, strafing targets move horizontally at consistent speed in one direction before changing. This requires your mouse to match the enemy's horizontal velocity exactly, without drifting or over-correcting, making it one of the most common skill differentials between rank tiers."
        }
      },
      {
        "@type": "Question",
        "name": "Why is strafe tracking harder than smooth tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Strafe tracking appears simpler because targets move linearly rather than in curves. However, the challenge is in matching velocity precisely without over-tracking, and then reacting instantly when the strafe direction reverses. Any velocity mismatch causes your crosshair to slide ahead of or behind the target, causing misses that feel frustrating and inexplicable."
        }
      },
      {
        "@type": "Question",
        "name": "How does strafe tracking training improve my Apex Legends gunfights?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Apex Legends enemies use horizontal strafing as their primary evasion mechanic during open-field gunfights at medium range. Improving strafe tracking directly increases your damage output in these engagements — you spend more time on-target per trigger pull, increasing damage per bullet and securing kills faster than opponents with weaker tracking."
        }
      },
      {
        "@type": "Question",
        "name": "Is strafe tracking the same as smooth pursuit tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Smooth pursuit tracks targets on curved, arcing paths requiring velocity prediction and arc following. Strafe tracking follows linear horizontal movement with sudden direction reversals requiring reaction to the reversal point. The muscle memory patterns are different — strafe tracking uses wider, more responsive horizontal arm sweeps."
        }
      },
      {
        "@type": "Question",
        "name": "What sensitivity should I use for strafe tracking training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Train at your actual in-game sensitivity. For strafe tracking specifically, many coaches recommend training slightly lower sensitivity than your default to develop greater velocity control and smoothness, then returning to your normal sensitivity for ranked play. This helps your arm learn the slower, more deliberate movement needed for precise strafe tracking."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Strafe Tracking",
    "description": "Step-by-step instructions to master horizontal target following and counter-strafe reading.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Engage side-to-side tracking",
        "text": "Center your crosshair on the strafing target. Match its linear horizontal direction."
      },
      {
        "@type": "HowToStep",
        "name": "React to strafe reversals",
        "text": "Keep your eyes focused on the target's hips or center. The instant it pauses and reverses, switch your mouse sweep direction immediately."
      },
      {
        "@type": "HowToStep",
        "name": "Maintain mouse smoothness",
        "text": "Avoid jittery corrections or sudden flicks during linear segments. Keep your velocity constant to match the target speed."
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

      <StrafeTrackingClient />
    </>
  );
}

