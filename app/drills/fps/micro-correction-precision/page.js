import MicroCorrectionClient from './MicroCorrectionClient';

export const metadata = {
  title: "Micro-Adjustment Aim Trainer - Precision Drill | SkillDrills",
  description: "Refine your headshot accuracy with our Micro-Adjustment Aim Trainer. Eliminate overflicking and improve snap deceleration and precision clicks.",
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
    title: "Micro-Adjustment Aim Trainer - Precision Drill | SkillDrills",
    description: "Refine your headshot accuracy with our Micro-Adjustment Aim Trainer. Eliminate overflicking and improve snap deceleration and precision clicks.",
    url: "https://skilldrills.online/drills/fps/micro-correction-precision",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: "Micro-Adjustment Aim Trainer - Precision Drill",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Micro-Adjustment Aim Trainer - Precision Drill | SkillDrills",
    description: "Refine your headshot accuracy with our Micro-Adjustment Aim Trainer. Eliminate overflicking and improve snap deceleration and precision clicks.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

export default function MicroCorrectionPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Micro-Adjustment Aim Trainer", "item": "https://skilldrills.online/drills/fps/micro-correction-precision" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Micro-Adjustment Aim Trainer",
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a micro-correction in FPS aiming?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A micro-correction is the small, precise mouse adjustment made immediately after a large flick to land exactly on a target. Most players overshoot or undershoot during flick shots and then apply a micro-adjustment to correct onto the hitbox. Training micro-corrections reduces the correction distance and makes the final adjustment faster and more accurate."
        }
      },
      {
        "@type": "Question",
        "name": "Why do I keep overflicking my targets in Valorant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Overflicking happens when your flick speed exceeds your deceleration control. Your muscle memory moves fast enough but cannot brake precisely on the target. This drill trains the deceleration phase of the flick — teaching your wrist and arm to recognize the correct stopping point and apply only the micro-adjustment needed rather than a full correction."
        }
      },
      {
        "@type": "Question",
        "name": "How is micro-correction training different from flick training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Flick training builds speed — how fast you move your crosshair from A to B. Micro-correction training builds precision — how accurately you stop on B after the movement. They are complementary but distinct skills. Pro players practice both: raw flick speed to get close, and micro-correction precision to land on the exact pixel."
        }
      },
      {
        "@type": "Question",
        "name": "What games benefit most from micro-correction precision training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tactical shooters with low TTK benefit most: Valorant (rifles, headshots are instant kills), CS2 (rifle and pistol headshots), Rainbow Six Siege (headshot-only gameplay), FragPunk, and Spectre Divide. In these games, landing the first shot precisely is more important than DPS or spray control."
        }
      },
      {
        "@type": "Question",
        "name": "How long until I see improvement in headshot accuracy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most players notice measurable headshot accuracy improvement within 1-2 weeks of daily 10-15 minute sessions. Full integration into ranked play typically takes 3-4 weeks. Focus on precision over speed during the first two weeks — the speed naturally increases as precision becomes automatic."
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

