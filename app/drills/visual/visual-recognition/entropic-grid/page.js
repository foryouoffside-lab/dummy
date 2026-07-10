import EntropicGridClient from './EntropicGridClient';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
    { "@type": "ListItem", "position": 2, "name": "Visual Training", "item": "https://skilldrills.online/drills/visual" },
    { "@type": "ListItem", "position": 3, "name": "Visual Recognition", "item": "https://skilldrills.online/drills/visual/visual-recognition" },
    { "@type": "ListItem", "position": 4, "name": "Entropic Grid", "item": "https://skilldrills.online/drills/visual/visual-recognition/entropic-grid" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Entropic Grid – Free Online Concentration Grid & Visual Search Test",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Train your focus with our free online concentration grid. Find targets in a 100-cell grid while entropy adds visual noise. Test your cognitive stamina now.",
  "url": "https://skilldrills.online/drills/visual/visual-recognition/entropic-grid",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "930" }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Entropic Grid test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An advanced concentration grid test where you find 2-character targets in a 100-cell layout while real-time entropy noise continuously reshuffles cells."
      }
    },
    {
      "@type": "Question",
      "name": "How does the stamina mechanism work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You start with 100 stamina. Correct hits replenish it, while time decay and incorrect clicks drain it. The drill ends if stamina drops to 0."
      }
    },
    {
      "@type": "Question",
      "name": "What does entropy corrupting cells mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every 800ms, 3 random cells have their characters regenerated. This forces your brain to filter out dynamic visual noise while maintaining search focus."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to register?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No registration is required. The Entropic Grid drill is completely free and runs directly in your web browser."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train Attention with Entropic Grid Concentration Game",
  "description": "Improve visual scanning speed and target isolation under noise using the free online Entropic Grid.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Identify the Target",
      "text": "Observe the active 2-character target displayed at the top of the screen."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Scan the Grid",
      "text": "Quickly scan the 10x10 cell grid to locate the matching characters."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Click to Strike",
      "text": "Click the matching cell to earn score and replenish your decaying stamina bar."
    }
  ]
};

export const metadata = {
  title: "Entropic Grid | Free Online Concentration Grid & Visual Search Test",
  description: "Train your focus with our free online concentration grid. Find targets in a 100-cell grid while entropy adds visual noise. Test your cognitive stamina now.",
  keywords: [
    "concentration grid online free",
    "visual search test online",
    "entropic grid",
    "visual scanning test",
    "cognitive focus grid"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual/visual-recognition/entropic-grid",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Entropic Grid | Free Online Concentration Grid & Visual Search Test",
    description: "Train your focus with our free online concentration grid. Find targets in a 100-cell grid while entropy adds visual noise. Test your cognitive stamina now.",
    url: "https://skilldrills.online/drills/visual/visual-recognition/entropic-grid",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: "Entropic Grid Test" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Entropic Grid | Free Online Concentration Grid & Visual Search Test",
    description: "Train your focus with our free online concentration grid. Find targets in a 100-cell grid while entropy adds visual noise. Test your cognitive stamina now.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

export default function EntropicGridPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <EntropicGridClient />
    </>
  );
}