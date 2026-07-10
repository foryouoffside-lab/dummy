import ChromaSyncClient from './ChromaSyncClient';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
    { "@type": "ListItem", "position": 2, "name": "Visual Training", "item": "https://skilldrills.online/drills/visual" },
    { "@type": "ListItem", "position": 3, "name": "Reaction Speed", "item": "https://skilldrills.online/drills/visual/reaction-speed" },
    { "@type": "ListItem", "position": 4, "name": "Go/No-Go Test", "item": "https://skilldrills.online/drills/visual/reaction-speed/go/no-go" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Go/No-Go – Free Impulse Control Test Online",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Free online Go/No-Go task to measure reaction times, impulse control, and response inhibition. Click targets and avoid red triggers.",
  "url": "https://skilldrills.online/drills/visual/reaction-speed/go/no-go",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "1230" }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Go/No-Go test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A classic cognitive and impulse control test where you must react quickly to 'Go' signals (green) while inhibiting your response to 'No-Go' signals (red)."
      }
    },
    {
      "@type": "Question",
      "name": "How does the scoring system work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Correct actions gain points and restore time. Incorrect triggers or missed signals cost time but protect positive score points."
      }
    },
    {
      "@type": "Question",
      "name": "Who should train with this drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gamers (aiming and trigger control), athletes, drivers, and anyone looking to reduce impulsivity and optimize response inhibition."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to sign up?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No registration is required. The Go/No-Go test is completely free and works instantly in your browser."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train Impulse Control Online",
  "description": "Improve your motor response times and impulse control using our free online Go/No-Go drill.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Watch the Center Focus",
      "text": "Start the drill and focus your eyes on the center visual area where balls will spawn."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "React to Green Targets",
      "text": "Instantly click or tap when a green 'Go' target appears to claim score points."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Inhibit Response to Red",
      "text": "Restrain yourself from clicking when a red 'No-Go' target spawns to protect your time and combo."
    }
  ]
};

export const metadata = {
  title: "Play Go/No-Go Test Online | Free Impulse Control Drill | SkillDrills",
  description: "Test and train your impulse control online with our free Go/No-Go reaction speed drill. Maintain target accuracy while avoiding red distraction triggers.",
  keywords: [
    "go no go test online",
    "go no go test",
    "impulse control test",
    "go no go task",
    "response inhibition test",
    "reaction speed test"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual/reaction-speed/go/no-go",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Play Go/No-Go Test Online | Free Impulse Control Drill | SkillDrills",
    description: "Test and train your impulse control online with our free Go/No-Go reaction speed drill. Maintain target accuracy while avoiding red distraction triggers.",
    url: "https://skilldrills.online/drills/visual/reaction-speed/go/no-go",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: "Play Go/No-Go Test Online" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Play Go/No-Go Test Online | Free Impulse Control Drill | SkillDrills",
    description: "Test and train your impulse control online with our free Go/No-Go reaction speed drill. Maintain target accuracy while avoiding red distraction triggers.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

export default function ChromaSyncPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <ChromaSyncClient />
    </>
  );
}