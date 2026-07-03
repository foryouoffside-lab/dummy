import ProFlickClient from './ProFlickClient';

export const metadata = {
  title: "Flick Shot Trainer - Snap Aim Practice | SkillDrills",
  description: "Train your snap aim and muscle memory with our online Flick Shot Trainer. Perfect for Valorant, CS2, and Apex Legends players looking to improve speed.",
  keywords: [
    "flick shot trainer",
    "flick aim trainer",
    "flick shot practice",
    "snap aim trainer",
    "fps aim trainer online",
    "mouse accuracy trainer",
    "target acquisition trainer",
    "valorant flick trainer",
    "cs2 flick practice",
    "aim training online free",
    "browser aim trainer",
    "free flick shot practice",
    "snap flick training",
    "first shot accuracy trainer",
    "precision aim training",
    "mechanical aim trainer"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/flick-shot-training",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Flick Shot Trainer - Snap Aim Practice | SkillDrills",
    description: "Train your snap aim and muscle memory with our online Flick Shot Trainer. Perfect for Valorant, CS2, and Apex Legends players looking to improve speed.",
    url: "https://skilldrills.online/drills/fps/flick-shot-training",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: "Flick Shot Trainer - Snap Aim Practice",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Flick Shot Trainer - Snap Aim Practice | SkillDrills",
    description: "Train your snap aim and muscle memory with our online Flick Shot Trainer. Perfect for Valorant, CS2, and Apex Legends players looking to improve speed.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

export default function FlickShotPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Flick Shot Trainer", "item": "https://skilldrills.online/drills/fps/flick-shot-training" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Flick Shot Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "A free browser-based FPS aim trainer for improving flick shots, snap aim, and rapid target acquisition for competitive shooters.",
    "genre": "FPS Training / Flick Aim",
    "url": "https://skilldrills.online/drills/fps/flick-shot-training",
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
        "name": "What is a flick shot in FPS games?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A flick shot is a rapid, large mouse movement that snaps your crosshair from its current position directly onto a target, followed immediately by a click. Unlike tracking shots, flick shots are instantaneous — you move to the target and shoot in a single motion. They are critical in tactical FPS games where standing still and shooting is safer than tracking while moving."
        }
      },
      {
        "@type": "Question",
        "name": "How does this flick shot trainer improve aim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The drill presents targets at randomized positions, requiring you to quickly sweep your mouse from your current position and click the target accurately. This directly trains the neural pathway between target detection and motor execution — the exact pathway that determines your flick reaction speed in Valorant and CS2."
        }
      },
      {
        "@type": "Question",
        "name": "Is this better than AimLabs for flick shot training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SkillDrills runs entirely in your browser with no download, no account, and no subscription. It uses raw hardware pointer lock input for accurate mouse feel. It is ideal for quick warm-up sessions before ranked play, especially when you want fast access without launching a separate application."
        }
      },
      {
        "@type": "Question",
        "name": "How do I improve my flick shot consistency?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Consistency improves through daily deliberate practice at your actual in-game sensitivity. Avoid randomly changing your DPI or sensitivity during training. Focus on landing each flick as close to center-mass as possible rather than speed alone. After 2-3 weeks of consistent daily training, flick accuracy transfers to real gameplay."
        }
      },
      {
        "@type": "Question",
        "name": "What sensitivity is best for flick shot training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Train at your real in-game sensitivity so your muscle memory transfers directly. Most Valorant players train flicks at 400-800 DPI with 0.3-0.5 in-game sensitivity. CS2 players typically train at eDPI values between 400-1000. The best sensitivity is the one you use in real matches."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Practice Flick Shooting and Snap Aiming",
    "description": "Step-by-step instructions to train your mouse acceleration and snapping mechanics.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Reset to Center",
        "text": "Bring your crosshair back to the neutral center area. Maintain a relaxed grip on your mouse."
      },
      {
        "@type": "HowToStep",
        "name": "Spot the Spawned Target",
        "text": "Locate the target that spawns randomly inside your field of view."
      },
      {
        "@type": "HowToStep",
        "name": "Flick and Click",
        "text": "In a single, continuous acceleration curve, snap your mouse to the target center and click immediately."
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

      <ProFlickClient />
    </>
  );
}

