import GhostLinkClient from './GhostLinkClient';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
    { "@type": "ListItem", "position": 2, "name": "Visual Training", "item": "https://skilldrills.online/drills/visual" },
    { "@type": "ListItem", "position": 3, "name": "Tracking Accuracy", "item": "https://skilldrills.online/drills/visual/tracking-accuracy" },
    { "@type": "ListItem", "position": 4, "name": "Multiple Object Tracking Test", "item": "https://skilldrills.online/drills/visual/tracking-accuracy/multiple-targets" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Multiple Object Tracking Test – Free Visual Attention Game",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Measure your divided attention and visual memory. Track multiple target balls among moving distractors and identify them in this free online MOT cognitive test.",
  "url": "https://skilldrills.online/drills/visual/tracking-accuracy/multiple-targets",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "930" }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Multiple Object Tracking test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A visual cognitive test based on the Multiple Object Tracking (MOT) paradigm where you track specific targets among moving distractors."
      }
    },
    {
      "@type": "Question",
      "name": "How does the tracking phase work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "First, the target objects are highlighted in green. Then they fade to match the distractors and all objects bounce around the screen. Finally, you select the original targets."
      }
    },
    {
      "@type": "Question",
      "name": "What cognitive skills are measured?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sustained attention, divided attention, visual working memory, spatial location tracking, and distractor suppression."
      }
    },
    {
      "@type": "Question",
      "name": "Are there negative score penalties?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Selecting a wrong ball costs zero points — you only earn +20 PTS per correctly identified target, and the engine enforces a strict minimum score floor of 0."
      }
    },
    {
      "@type": "Question",
      "name": "How do collisions work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The engine runs a custom 2D elastic collision loop where balls perfectly exchange momentum vectors upon impact."
      }
    },
    {
      "@type": "Question",
      "name": "How long does each session last?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Session tracking duration is configurable from 15 to 60 seconds."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to sign up?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No registration is required. The Multiple Object Tracking test is completely free and works instantly in your browser."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Measure Your Divided Attention with Multiple Object Tracking",
  "description": "Test and train your visual working memory using our free online Multiple Object Tracking (MOT) drill.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Identify the Targets",
      "text": "Observe the green targets highlighted on the screen during the initial preview phase."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Track Moving Spheres",
      "text": "Keep your eyes locked on the target spheres as they turn grey and bounce around with the distractors."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Select Original Targets",
      "text": "Once movement stops, click or tap the spheres you tracked to evaluate your coordination score."
    }
  ]
};

export const metadata = {
  title: "Multiple Object Tracking Test | Free Visual Attention Game",
  description: "Measure your divided attention and visual memory. Track multiple target balls among moving distractors and identify them in this free online MOT cognitive test.",
  keywords: [
    "multiple object tracking test",
    "visual tracking test online",
    "multiple object tracking game",
    "visual search and tracking test",
    "MOT training online"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual/tracking-accuracy/multiple-targets",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Multiple Object Tracking Test | Free Visual Attention Game | SkillDrills",
    description: "Measure your divided attention and visual memory. Track multiple target balls among moving distractors and identify them in this free online MOT cognitive test.",
    url: "https://skilldrills.online/drills/visual/tracking-accuracy/multiple-targets",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Multiple Object Tracking Test | Free Visual Attention Game | SkillDrills",
    description: "Measure your divided attention and visual memory. Track multiple target balls among moving distractors and identify them in this free online MOT cognitive test.",
  },
};

export default function GhostLinkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <GhostLinkClient />
    </>
  );
}