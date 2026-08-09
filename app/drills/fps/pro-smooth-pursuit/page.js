import ProSmoothPursuitClient from './ProSmoothPursuitClient';

export const metadata = {
  title: "Smooth Pursuit Aim Trainer — Curve Tracking | SkillDrills",
  description: "Improve your smooth pursuit aiming, curve trajectory reading, and forearm tracking stability for competitive FPS games like Apex Legends & Overwatch 2.",
  keywords: [
    "pro smooth pursuit aim trainer",
    "lissajous curve tracking drill",
    "smooth pursuit aiming practice",
    "apex legends curve tracking",
    "overwatch 2 smooth pursuit",
    "forearm tracking stability tool",
    "high ttk smooth pursuit drill",
    "free smooth pursuit aim trainer",
    "visual pursuit tracking drill",
    "foveal vision aim trainer",
    "jitter free tracking aim",
    "fps smooth pursuit practice",
    "valorant tracking practice",
    "cs2 curve pursuit trainer",
    "the finals tracking drill",
    "call of duty smooth pursuit",
    "hardware raw input pursuit tracking",
    "continuous curve tracking aim",
    "anti overflicking pursuit trainer",
    "fine motor mouse control drill"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/pro-smooth-pursuit",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Smooth Pursuit Aim Trainer — Curve Tracking | SkillDrills",
    description: "Improve your smooth pursuit aiming, curve trajectory reading, and forearm tracking stability for competitive FPS games like Apex Legends & Overwatch 2.",
    url: "https://skilldrills.online/drills/fps/pro-smooth-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Smooth Pursuit Aim Trainer — Curve Tracking | SkillDrills",
    description: "Improve your smooth pursuit aiming, curve trajectory reading, and forearm tracking stability for competitive FPS games like Apex Legends & Overwatch 2.",
  },
};

export default function ProSmoothPursuitPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Pro Smooth Pursuit", "item": "https://skilldrills.online/drills/fps/pro-smooth-pursuit" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Pro Smooth Pursuit Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Improve your smooth pursuit aiming, curve trajectory reading, and forearm tracking stability for competitive FPS games.",
    "genre": "FPS Training / Smooth Pursuit",
    "url": "https://skilldrills.online/drills/fps/pro-smooth-pursuit",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Pro Smooth Pursuit",
    "url": "https://skilldrills.online/drills/fps/pro-smooth-pursuit",
    "description": "Improve your smooth pursuit aiming, curve trajectory reading, and forearm tracking stability for competitive FPS games.",
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
        "name": "What is smooth pursuit training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Smooth pursuit training develops your eyes' ability to track a moving target smoothly and continuously, which helps your brain calculate velocity and guides your arm to move the mouse at a matching speed without stutters."
        }
      },
      {
        "@type": "Question",
        "name": "How do I improve tracking aim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To improve tracking aim, focus your eyes entirely on the target model rather than your crosshair. Maintain a relaxed wrist and arm, practice continuous tracking drills regularly, and calibrate your sensitivity for consistent muscle memory."
        }
      },
      {
        "@type": "Question",
        "name": "What is continuous tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Continuous tracking is the skill of keeping your crosshair locked onto a moving target without losing connection. Unlike flick shots, it requires constant speed adjustments and micro-corrections over a long duration."
        }
      },
      {
        "@type": "Question",
        "name": "How do pro players improve tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Professional players improve tracking by using aim trainers to practice smooth pursuit, maintaining physical relaxation to avoid mouse jitter, using lightweight mice and slick mouse pads, and playing games with high time-to-kill (TTK)."
        }
      },
      {
        "@type": "Question",
        "name": "Can tracking drills improve Apex aim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Apex Legends has a very high time-to-kill (TTK), meaning you must track enemies through multiple strafes and jumps. Smooth pursuit drills are critical to mastering weapons like the R-99, Volt, and Flatline."
        }
      },
      {
        "@type": "Question",
        "name": "Does this help Overwatch players?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Overwatch 2 features heroes with high movement speed and no inertia, meaning players must track Soldier: 76, Tracer, Zarya, and Sombra continuously to secure kills."
        }
      },
      {
        "@type": "Question",
        "name": "Why is tracking harder than flicking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tracking is harder because it requires visual feedback processing and muscular speed adjustments over several seconds, whereas flicking is a single rapid muscle command that happens in a fraction of a second."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I train tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We recommend training tracking for 10–15 minutes daily as a warm-up before matches, or 30 minutes for deep aim training to build muscle memory."
        }
      },
      {
        "@type": "Question",
        "name": "What skills does smooth pursuit improve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This drill improves smooth pursuit, visual response latency, ADAD strafe reading, target reacquisition speed, wrist micro-corrections, and tracking stability under pressure."
        }
      },
      {
        "@type": "Question",
        "name": "Is this smooth pursuit trainer free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, this tracking trainer is 100% free, requires no sign-ups or downloads, and runs natively in modern desktop browsers with 1:1 raw mouse input."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Pro Smooth Pursuit Aim",
    "description": "Step-by-step instructions to train smooth pursuit ocular tracking along Lissajous curves.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Adjust Sensitivity",
        "text": "Set your Universal Sens slider to match your primary game."
      },
      {
        "@type": "HowToStep",
        "name": "Track Lissajous Curve Target",
        "text": "Keep your crosshair centered on the target as it glides smoothly along mathematical curves."
      },
      {
        "@type": "HowToStep",
        "name": "Maintain Smooth Arm Motion",
        "text": "Relax your wrist and forearm to follow curve velocity transitions without jittery micro-flicks."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <ProSmoothPursuitClient />
    </>
  );
}
