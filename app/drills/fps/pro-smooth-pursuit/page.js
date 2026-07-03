import ProSmoothPursuitClient from './ProSmoothPursuitClient';

export const metadata = {
  title: "Smooth Tracking Aim Trainer - Mouse Control | SkillDrills",
  description: "Improve your mouse control with our Smooth Tracking Aim Trainer. Practice continuous target pursuit and smoothness for Apex Legends and Overwatch.",
  keywords: [
    "smooth tracking aim trainer",
    "aim smoothness trainer",
    "tracking consistency trainer",
    "fps tracking practice",
    "smooth pursuit aim training",
    "apex tracking practice",
    "continuous tracking trainer",
    "target tracking drill",
    "mouse control trainer",
    "overwatch tracking trainer",
    "halo infinite aim training",
    "velocity tracking trainer",
    "smooth aim training",
    "free tracking aim trainer",
    "target following drill",
    "fluid aim training"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/pro-smooth-pursuit",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Smooth Tracking Aim Trainer - Mouse Control | SkillDrills",
    description: "Improve your mouse control with our Smooth Tracking Aim Trainer. Practice continuous target pursuit and smoothness for Apex Legends and Overwatch.",
    url: "https://skilldrills.online/drills/fps/pro-smooth-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: "Smooth Tracking Aim Trainer - Mouse Control",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Smooth Tracking Aim Trainer - Mouse Control | SkillDrills",
    description: "Improve your mouse control with our Smooth Tracking Aim Trainer. Practice continuous target pursuit and smoothness for Apex Legends and Overwatch.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

export default function ProSmoothPursuitPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Smooth Tracking Trainer", "item": "https://skilldrills.online/drills/fps/pro-smooth-pursuit" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Smooth Tracking Aim Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "A free browser FPS drill for improving smooth tracking, mouse control consistency, and continuous target pursuit for Apex Legends, Overwatch 2, and other tracking-intensive shooters.",
    "genre": "FPS Training / Smooth Tracking",
    "url": "https://skilldrills.online/drills/fps/pro-smooth-pursuit",
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
        "name": "What is smooth pursuit aim training in FPS games?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Smooth pursuit tracking is the ability to continuously follow a moving target with your crosshair, matching its velocity and direction without overshooting or losing contact. It is the primary aiming skill needed in games like Apex Legends and Overwatch 2 where enemies move continuously at high speed and require sustained crosshair contact to deal damage."
        }
      },
      {
        "@type": "Question",
        "name": "How is smooth tracking different from reactive tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Smooth tracking follows targets moving in predictable, continuous paths — curved arcs, steady velocities, and gradual direction changes. Reactive tracking handles sudden, unpredictable direction changes like ADAD strafes. This drill trains smooth pursuit specifically: the ability to match velocity and follow a target without jerky corrections."
        }
      },
      {
        "@type": "Question",
        "name": "What causes shaky or imprecise tracking aim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Shaky tracking is caused by excessive micro-adjustments from mouse sensitivity being too high, lack of arm stability, over-correction reflexes, or wrist grip tension. Smooth pursuit training teaches the nervous system to use broad, smooth arm movements to track velocity while leaving fine adjustments to subtle wrist motion."
        }
      },
      {
        "@type": "Question",
        "name": "Does smooth tracking training help in Apex Legends?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes significantly. Apex Legends gunfights occur over longer ranges and longer durations than most tactical shooters. Continuous damage requires keeping your crosshair on a moving target for 0.5-2 seconds — a skill set entirely based on smooth pursuit tracking. Regular practice directly translates to higher damage per engagement and more confirmed kills."
        }
      },
      {
        "@type": "Question",
        "name": "How many sessions per week improve tracking aim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For tracking aim improvement, 5-6 sessions per week of 10-15 minutes each yields faster progress than fewer, longer sessions. Tracking is a motor skill that benefits from frequent repetition across multiple days rather than marathon single sessions. Daily warm-up practice before ranked play is ideal."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Smooth Tracking",
    "description": "Step-by-step instructions to train continuous target following and eliminate aim shakiness.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Acquire target center",
        "text": "Align your crosshair onto the target center immediately. Keep your hand relaxed."
      },
      {
        "@type": "HowToStep",
        "name": "Match Target Speed",
        "text": "Predict the target trajectory. Move your arm at the same velocity as the target's movement path."
      },
      {
        "@type": "HowToStep",
        "name": "Minimize Flicking Adjustments",
        "text": "Keep your motion smooth and fluid. Do not try to flick to correct minor offsets; instead, make slow, continuous velocity changes."
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

      <ProSmoothPursuitClient />
    </>
  );
}

