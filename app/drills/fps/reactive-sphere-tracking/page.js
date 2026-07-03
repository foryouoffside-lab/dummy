import ReactiveSphereTrackingClient from './ReactiveSphereTrackingClient';

export const metadata = {
  title: "Reactive Aim Trainer - 3D Sphere Tracking | SkillDrills",
  description: "Improve your reactive tracking accuracy and reacquisition speed with our 3D Sphere Aim Trainer. Practice unpredictable target tracking for Apex.",
  keywords: [
    "reactive aim trainer",
    "reactive tracking trainer",
    "3d sphere tracking aim",
    "unpredictable target tracking",
    "Apex Legends tracking drill",
    "reactive sphere tracking",
    "dynamic target tracking",
    "target reacquisition trainer",
    "unpredictable tracking practice",
    "adad reactive tracking",
    "reactive aim training",
    "sphere tracking drill",
    "curved target tracking",
    "reactive aim adjustment",
    "quake tracking trainer",
    "free reactive tracking trainer"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/reactive-sphere-tracking",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Reactive Aim Trainer - 3D Sphere Tracking | SkillDrills",
    description: "Improve your reactive tracking accuracy and reacquisition speed with our 3D Sphere Aim Trainer. Practice unpredictable target tracking for Apex.",
    url: "https://skilldrills.online/drills/fps/reactive-sphere-tracking",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: "Reactive Aim Trainer - 3D Sphere Tracking",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Reactive Aim Trainer - 3D Sphere Tracking | SkillDrills",
    description: "Improve your reactive tracking accuracy and reacquisition speed with our 3D Sphere Aim Trainer. Practice unpredictable target tracking for Apex.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

export default function ReactiveSphereTrackingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Reactive Sphere Tracking", "item": "https://skilldrills.online/drills/fps/reactive-sphere-tracking" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Reactive Sphere Tracking Aim Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "A free browser FPS drill training reactive tracking, dynamic aim adjustments, and target reacquisition against unpredictably moving 3D sphere targets.",
    "genre": "FPS Training / Reactive Tracking",
    "url": "https://skilldrills.online/drills/fps/reactive-sphere-tracking",
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
        "name": "What is reactive tracking in FPS aim training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Reactive tracking is the ability to follow a target that suddenly and unpredictably changes its movement direction — as opposed to smooth pursuit tracking of predictable paths. In real gunfights, enemies strafe, dodge, and change direction constantly. Reactive tracking trains your aim to handle these sudden changes without losing the target."
        }
      },
      {
        "@type": "Question",
        "name": "What makes 3D sphere tracking different from flat target tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A 3D sphere target moves with realistic curvature and depth-perception cues, more closely simulating real enemy hitboxes in 3D game environments. The curved surface challenges your ability to track the center of a hitbox rather than a flat 2D point, building more transferable aim habits for actual FPS gameplay."
        }
      },
      {
        "@type": "Question",
        "name": "How does this differ from the smooth pursuit training drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The smooth pursuit drill trains tracking along predictable arcs at consistent velocities — the fundamental motor pattern. This reactive sphere drill adds randomized direction changes, speed variations, and reactive elements. It is the next level after smooth tracking is mastered, adding the unpredictability of real in-game opponents."
        }
      },
      {
        "@type": "Question",
        "name": "What FPS games require the most reactive tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Arena shooters like Quake Champions require the highest reactive tracking demands. Apex Legends with its high mobility characters (Pathfinder, Octane, Wraith) also requires strong reactive tracking. Overwatch 2 mobile DPS characters (Tracer, Genji) and Halo Infinite's fast-paced movement create similar reactive tracking demands."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to improve reactive tracking ability?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Reactive tracking improvements are noticeable within 2 weeks of consistent daily practice. The brain must learn to suppress the over-correction reflex triggered by sudden direction changes. After 3-4 weeks, most players report keeping their crosshair on target through direction changes that previously caused them to lose the target entirely."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train 3D Reactive Tracking",
    "description": "Step-by-step instructions to train reactive mouse control and track erratic target paths.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Initialize tracking lock",
        "text": "Position your crosshair on the sphere target. Do not try to predict target changes prematurely."
      },
      {
        "@type": "HowToStep",
        "name": "React, Don't Predict",
        "text": "Focus on the target's actual current velocity. The moment the target shifts direction, react instantly with your wrist/hand to match the change."
      },
      {
        "@type": "HowToStep",
        "name": "Reacquire target center",
        "text": "If the target breaks away, apply a quick micro-correction flick to immediately re-center your crosshair on the sphere target."
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

      <ReactiveSphereTrackingClient />
    </>
  );
}

