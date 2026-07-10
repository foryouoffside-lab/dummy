import DifferenceSpotterClient from './DifferenceSpotterClient';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
    { "@type": "ListItem", "position": 2, "name": "Visual Training", "item": "https://skilldrills.online/drills/visual" },
    { "@type": "ListItem", "position": 3, "name": "Visual Recognition", "item": "https://skilldrills.online/drills/visual/visual-recognition" },
    { "@type": "ListItem", "position": 4, "name": "Difference Spotter", "item": "https://skilldrills.online/drills/visual/visual-recognition/difference-spotter" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Difference Spotter – Free Online Change Detection Test",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Test your visual working memory and attention to detail. Spot which object changed color or position after a brief blink in this free change detection drill.",
  "url": "https://skilldrills.online/drills/visual/visual-recognition/difference-spotter",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.6", "reviewCount": "810" }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Difference Spotter test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A cognitive visual test based on the change detection paradigm where you spot which shape altered its color or position after a screen blink."
      }
    },
    {
      "@type": "Question",
      "name": "How does the blink phase work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "First, you study the shape layout. A brief blank screen ('blink') occurs, and then the layout returns with one shape altered. You click the changed shape."
      }
    },
    {
      "@type": "Question",
      "name": "What cognitive skills does this test measure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Visual working memory capacity, change blindness thresholds, spatial memory, and focus to detail."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to sign up?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No registration is required. The Difference Spotter test is completely free and works instantly in your browser."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Measure Change Detection with Difference Spotter Drill",
  "description": "Evaluate and train your visual working memory using our free online Difference Spotter game.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Study the Layout",
      "text": "Observe the shapes, colors, and spatial positioning during the initial study phase."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Observe the Blink",
      "text": "Keep your attention centered during the brief blank screen transition."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Identify the Altered Shape",
      "text": "Compare the new layout with your memory and click the shape that shifted positions or changed color."
    }
  ]
};

export const metadata = {
  title: "Difference Spotter | Free Online Change Detection Test | SkillDrills",
  description: "Test your visual working memory and attention to detail. Spot which object changed color or position after a brief blink in this free change detection drill.",
  keywords: [
    "change detection test",
    "spot the difference online free",
    "difference spotter game",
    "visual difference test",
    "change blindness test online"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual/visual-recognition/difference-spotter",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Difference Spotter | Free Online Change Detection Test | SkillDrills",
    description: "Test your visual working memory and attention to detail. Spot which object changed color or position after a brief blink in this free change detection drill.",
    url: "https://skilldrills.online/drills/visual/visual-recognition/difference-spotter",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: "Difference Spotter Test" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Difference Spotter | Free Online Change Detection Test | SkillDrills",
    description: "Test your visual working memory and attention to detail. Spot which object changed color or position after a brief blink in this free change detection drill.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

export default function DifferenceSpotterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <DifferenceSpotterClient />
    </>
  );
}