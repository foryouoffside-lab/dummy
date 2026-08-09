import MicroCorrectionClient from './MicroCorrectionClient';

export const metadata = {
  title: "Micro-Correction Aim Trainer | SkillDrills",
  description: "Refine your headshot accuracy with our Micro-Correction Aim Trainer. Eliminate overflicking and improve snap deceleration and precision clicks.",
  keywords: [
    "micro-adjustment aim training",
    "micro-correction aim practice",
    "micro adjustment aim trainer",
    "precision aim trainer",
    "headshot accuracy trainer",
    "snap deceleration training",
    "micro flick trainer",
    "post flick correction",
    "overflick correction trainer",
    "aim refinement training",
    "cs2 precision aim",
    "headshot consistency training",
    "aim adjustment training",
    "click timing trainer"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/micro-correction-precision",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Micro-Correction Aim Trainer | SkillDrills",
    description: "Refine your headshot accuracy with our Micro-Correction Aim Trainer. Eliminate overflicking and improve snap deceleration and precision clicks.",
    url: "https://skilldrills.online/drills/fps/micro-correction-precision",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Micro-Correction Aim Trainer | SkillDrills",
    description: "Refine your headshot accuracy with our Micro-Correction Aim Trainer. Eliminate overflicking and improve snap deceleration and precision clicks.",
  },
};

export default function MicroCorrectionPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Micro-Correction Aim Trainer", "item": "https://skilldrills.online/drills/fps/micro-correction-precision" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Micro-Correction Aim Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "A free browser FPS drill training micro-corrections, snap deceleration after large flicks, and precision headshot consistency for tactical shooters.",
    "genre": "FPS Training / Precision Aim",
    "url": "https://skilldrills.online/drills/fps/micro-correction-precision",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Micro-Correction Aim Trainer",
    "url": "https://skilldrills.online/drills/fps/micro-correction-precision",
    "description": "A free browser FPS drill training micro-corrections, snap deceleration after large flicks, and precision headshot consistency for tactical shooters.",
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
        "name": "What is a micro-correction in aiming?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A micro-correction is a tiny, precise adjustment made to your crosshair position after your initial flick aim lands close to the target. It bridges the gap between a fast flick and a perfect headshot, which is critical in tactical shooters like Valorant and CS2."
        }
      },
      {
        "@type": "Question",
        "name": "How do I improve headshot accuracy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Improve headshot accuracy by practicing crosshair placement, training mouse deceleration to stop flicks cleanly, using micro-correction drills to refine your aim on tiny targets, and ensuring target confirmation before clicking."
        }
      },
      {
        "@type": "Question",
        "name": "Why do I overflick targets?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Overflicking is caused by poor mouse deceleration control, tensing your muscles, or running an excessively high sensitivity. Training micro-correction helps build the motor control to stop the mouse exactly on target."
        }
      },
      {
        "@type": "Question",
        "name": "What is mouse deceleration?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mouse deceleration is the mechanical skill of stopping your mouse quickly and stably at the end of a swipe. Developing deceleration control prevents your crosshair from sliding past the enemy model."
        }
      },
      {
        "@type": "Question",
        "name": "How do pro Valorant players aim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Professional Valorant players aim by keeping their crosshair at head-height (crosshair placement), executing clean flicks close to the target, making immediate micro-corrections, and timing their clicks perfectly."
        }
      },
      {
        "@type": "Question",
        "name": "How do CS2 players train precision?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CS2 players train precision using tactical aim drills, practicing counter-strafing timing, refining their crosshair micro-adjustments, and repeating click-timing patterns on static micro-targets."
        }
      },
      {
        "@type": "Question",
        "name": "Can micro-correction drills improve aim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Most players miss targets because their initial flick is slightly off. Micro-correction drills train the brain and hand muscles to automatically adjust and hit the target center, increasing hit consistency."
        }
      },
      {
        "@type": "Question",
        "name": "Why do I miss easy headshots?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Missing headshots is usually due to clicking before your crosshair has fully stopped on the target's center (poor click-timing) or failing to correct a near-miss flick."
        }
      },
      {
        "@type": "Question",
        "name": "What is target confirmation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Target confirmation is the cognitive split-second where your visual cortex registers that the crosshair is locked onto the target model before you trigger your index finger to click/shoot."
        }
      },
      {
        "@type": "Question",
        "name": "What is precision aiming?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Precision aiming is the mechanical capacity to hit extremely small targets consistently. It depends on fine motor control of the wrist and fingers, low-friction mouse movements, and disciplined click timing."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I train micro-corrections?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We recommend training micro-corrections for 10–15 minutes daily as part of your FPS warm-up routine, or up to 30 minutes for a dedicated mechanical accuracy training session."
        }
      },
      {
        "@type": "Question",
        "name": "Can this improve flick accuracy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. By training the deceleration and correction phase, your muscle memory learns to flick close and transition smoothly into a micro-flick adjustment rather than overshooting."
        }
      },
      {
        "@type": "Question",
        "name": "Does this help tactical shooters?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Definitely. Tactical shooters like Valorant, CS2, Rainbow Six Siege, Spectre Divide, and FragPunk rely heavily on low-TTK headshots, making micro-adjustments the most common aiming mechanic in gunfights."
        }
      },
      {
        "@type": "Question",
        "name": "Is this aim trainer free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, this Micro-Correction Precision Aim Trainer is 100% free, runs in any desktop browser using raw hardware pointer input, and contains no ads."
        }
      },
      {
        "@type": "Question",
        "name": "What skills does this drill improve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This drill improves micro-flicking adjustments, click timing, snap deceleration, target reacquisition speed, headshot precision, and consistency under pressure."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Practice Aim Micro-Adjustments",
    "description": "Step-by-step instructions to train micro-correction speed and snap deceleration.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Perform the Large Flick",
        "text": "Flick quickly toward the target's general area. Expect a slight overshoot or undershoot."
      },
      {
        "@type": "HowToStep",
        "name": "Decelerate and Stop",
        "text": "Apply immediate friction braking to decelerate and stop your crosshair near the target edge."
      },
      {
        "@type": "HowToStep",
        "name": "Micro-Correct and Fire",
        "text": "Make a tiny, controlled wrist or finger adjustment to align onto the target center, then click immediately."
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

      <MicroCorrectionClient />
    </>
  );
}
