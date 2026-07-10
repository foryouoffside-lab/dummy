import WideFieldClient from './WideFieldClient';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
    { "@type": "ListItem", "position": 2, "name": "Visual Training", "item": "https://skilldrills.online/drills/visual" },
    { "@type": "ListItem", "position": 3, "name": "Peripheral Vision", "item": "https://skilldrills.online/drills/visual/peripheral-vision" },
    { "@type": "ListItem", "position": 4, "name": "Wide Field Awareness", "item": "https://skilldrills.online/drills/visual/peripheral-vision/wide-field" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Wide Field Awareness – Free Visual Field Test Online",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Free visual field test and peripheral vision training. Keep foveal center fixation and recall letters flashing at the screen's four corners.",
  "url": "https://skilldrills.online/drills/visual/peripheral-vision/wide-field",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "890" }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Wide Field Awareness Drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A free online visual field test designed to exercise your peripheral attention. You fixate on a central point while letters flash in the far corners, testing your ability to recall them without direct gaze."
      }
    },
    {
      "@type": "Question",
      "name": "How does scoring work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You gain points for each correctly recalled letter. Skipping a query awards 0 points. Incorrect recalls deduct remaining time but do not penalize your score."
      }
    },
    {
      "@type": "Question",
      "name": "Who is this visual field drill for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is perfect for gamers (improving map/HUD awareness), athletes, drivers, or anyone wanting to broaden their functional visual range."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to sign up?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No registration is required. The drill works directly in any standard mobile or desktop web browser for free."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train Wide Field Awareness Online",
  "description": "Improve your peripheral character recognition and visual field span using our free online training drill.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Keep Eyes Focused on the Center",
      "text": "Start the drill and stare directly at the central cross. Avoid looking directly at the corners."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Note Corner Flashes",
      "text": "Rely entirely on your peripheral vision to detect and remember letters flashing in the four corners."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Answer the Recall Prompts",
      "text": "When prompted, enter the letters in the correct order to progress difficulty and grow your score."
    }
  ]
};

export const metadata = {
  title: "Play Wide Field Awareness Test | Free Visual Field Test Online | SkillDrills",
  description: "Train your peripheral vision online with our free Wide Field Awareness drill. Maintain foveal fixation on the center and recall letters flashed at extreme corners.",
  keywords: [
    "visual field test online",
    "eye test for peripheral vision",
    "peripheral vision training exercises",
    "wide field awareness",
    "peripheral recall game",
    "eye training exercises"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual/peripheral-vision/wide-field",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Play Wide Field Awareness Test | Free Visual Field Test Online | SkillDrills",
    description: "Train your peripheral vision online with our free Wide Field Awareness drill. Maintain foveal fixation on the center and recall letters flashed at extreme corners.",
    url: "https://skilldrills.online/drills/visual/peripheral-vision/wide-field",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: "Play Wide Field Awareness Test" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Play Wide Field Awareness Test | Free Visual Field Test Online | SkillDrills",
    description: "Train your peripheral vision online with our free Wide Field Awareness drill. Maintain foveal fixation on the center and recall letters flashed at extreme corners.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

export default function WideFieldPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <WideFieldClient />
    </>
  );
}