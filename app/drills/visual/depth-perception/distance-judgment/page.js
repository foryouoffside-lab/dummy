import DistanceJudgmentClient from './DistanceJudgmentClient';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
    { "@type": "ListItem", "position": 2, "name": "Visual Training", "item": "https://skilldrills.online/drills/visual" },
    { "@type": "ListItem", "position": 3, "name": "Depth Perception", "item": "https://skilldrills.online/drills/visual/depth-perception" },
    { "@type": "ListItem", "position": 4, "name": "Distance Judgment", "item": "https://skilldrills.online/drills/visual/depth-perception/distance-judgment" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Distance Judgment – Free Depth Perception Test Online",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Free depth perception drill. Intercept moving sphere at target depth. Color feedback (green/yellow/red), auto-leveling speed, and 60-second time challenge.",
  "url": "https://skilldrills.online/drills/visual/depth-perception/distance-judgment",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "890" }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Distance Judgment Lab?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A free depth perception drill. Intercept a moving sphere at target depth. PERFECT (<5% error), CLOSE (<15%), FAR (15%+). Color feedback green/yellow/red."
      }
    },
    {
      "@type": "Question",
      "name": "How does auto-leveling work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As your score increases, the speed scale rises and velocity profiling becomes faster, forcing visual reaction adaptation."
      }
    },
    {
      "@type": "Question",
      "name": "Who should use this drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Athletes, drivers, designers, gamers, and anyone wanting better depth perception and spatial awareness."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to sign up?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No registration required. This distance judgment lab is completely free and works instantly in your browser."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train Depth Perception Online",
  "description": "Improve your stereoscopic vision and visual interceptive timing using our free Distance Judgment drill.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Start the Drill",
      "text": "Press Start Drill to activate the 3D visual projection field and begin the 60-second timer."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Track the Approaching Sphere",
      "text": "Watch the 3D sphere as it approaches from the back of the visual field. Its velocity changes randomly to prevent rhythm-based cheating."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Intercept at Target Depth",
      "text": "Tap the screen or click at the exact millisecond the approaching sphere lines up inside the dashed target ring."
    }
  ]
};

export const metadata = {
  title: "Play Depth Perception Test Online | Free Distance Judgment Game | SkillDrills",
  description: "Test and train your depth perception online with our free Distance Judgment game. Estimate distance, intercept moving spheres at target depth, and improve stereoscopic visual accuracy.",
  keywords: [
    "depth perception test online",
    "depth perception game",
    "distance judgment test",
    "stereopsis test online",
    "Howard-Dolman test",
    "distance estimation test",
    "3D perception drill",
    "hand-eye coordination"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual/depth-perception/distance-judgment",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Play Depth Perception Test Online | Free Distance Judgment Game | SkillDrills",
    description: "Test and train your depth perception online with our free Distance Judgment game. Estimate distance, intercept moving spheres at target depth, and improve stereoscopic visual accuracy.",
    url: "https://skilldrills.online/drills/visual/depth-perception/distance-judgment",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: "Play Depth Perception Test Online" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Play Depth Perception Test Online | Free Distance Judgment Game | SkillDrills",
    description: "Test and train your depth perception online with our free Distance Judgment game. Estimate distance, intercept moving spheres at target depth, and improve stereoscopic visual accuracy.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

export default function DistanceJudgmentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <DistanceJudgmentClient />
    </>
  );
}