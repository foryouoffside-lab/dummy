import PeripheralFlashClient from './PeripheralFlashClient';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
    { "@type": "ListItem", "position": 2, "name": "Visual Training", "item": "https://skilldrills.online/drills/visual" },
    { "@type": "ListItem", "position": 3, "name": "Peripheral Vision", "item": "https://skilldrills.online/drills/visual/peripheral-vision" },
    { "@type": "ListItem", "position": 4, "name": "Peripheral Flash", "item": "https://skilldrills.online/drills/visual/peripheral-vision/peripheral-flash" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Peripheral Flash – Free Peripheral Vision Test Online",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Free peripheral vision training game. Keep eyes on the center focal point and identify fast shape sequences flashing in the peripheral field.",
  "url": "https://skilldrills.online/drills/visual/peripheral-vision/peripheral-flash",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "1040" }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Peripheral Flash Drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A free peripheral vision exercise. Fast shapes flash at 300ms in your peripheral visual field while your eyes remain fixed on the center marker."
      }
    },
    {
      "@type": "Question",
      "name": "How does scoring work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "+1 correct match, 0 points for skip, and no negative points on incorrect answers. Time is deducted on errors to enforce careful speed."
      }
    },
    {
      "@type": "Question",
      "name": "Who should use this drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Athletes, drivers, gamers, and individuals seeking to expand their functional visual field size."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to sign up?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No registration required. The peripheral flash drill is completely free and works instantly in your browser."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train Peripheral Vision Online",
  "description": "Improve your peripheral awareness and shape detection speed using our free online vision training drill.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Fixate on the Center",
      "text": "Start the drill and keep your eyes locked on the central crosshair indicator."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Notice the Flashing Shapes",
      "text": "Without moving your gaze from the center, utilize your peripheral vision to detect the location or shape of the outer flashes."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Identify the Sequences",
      "text": "Select the correct flashed shape from the multiple-choice panel to complete the trial and advance difficulty."
    }
  ]
};

export const metadata = {
  title: "Play Peripheral Vision Test Online | Free Peripheral Flash Drill | SkillDrills",
  description: "Test and expand your peripheral vision online with our free Peripheral Flash drill. Keep your focus on the center and train your visual field detection speed.",
  keywords: [
    "peripheral vision test online",
    "peripheral vision training",
    "peripheral vision game",
    "visual field test online",
    "eye test for peripheral vision",
    "peripheral flash game",
    "improve peripheral vision"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual/peripheral-vision/peripheral-flash",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Play Peripheral Vision Test Online | Free Peripheral Flash Drill | SkillDrills",
    description: "Test and expand your peripheral vision online with our free Peripheral Flash drill. Keep your focus on the center and train your visual field detection speed.",
    url: "https://skilldrills.online/drills/visual/peripheral-vision/peripheral-flash",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: "Play Peripheral Vision Test Online" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Play Peripheral Vision Test Online | Free Peripheral Flash Drill | SkillDrills",
    description: "Test and expand your peripheral vision online with our free Peripheral Flash drill. Keep your focus on the center and train your visual field detection speed.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

export default function PeripheralFlashPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <PeripheralFlashClient />
    </>
  );
}