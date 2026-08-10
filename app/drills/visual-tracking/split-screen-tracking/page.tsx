import SplitScreenTrackingClient from './SplitScreenTrackingClient';

export const metadata = {
  title: "Split-Screen Tracking — Visual Tracking & Gaze Calibration Drill | SkillDrills",
  description: "Condition divided attention by tracking dual targets moving along vertical and horizontal axes. Builds split-attention tracking across two simultaneous targets.",
  keywords: [
    "split screen tracking",
    "visual tracking drill",
    "smooth pursuit eye training",
    "divided attention training",
    "dual target tracking",
    "esports vision training",
    "athletic vision drill",
    "ocular motor training",
    "eye tracking practice online"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/split-screen-tracking",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Split-Screen Tracking — Visual Tracking & Gaze Calibration Drill | SkillDrills",
    description: "Condition divided attention by tracking dual targets moving along vertical and horizontal axes. Free browser-based visual tracking drill.",
    url: "https://skilldrills.online/drills/visual-tracking/split-screen-tracking",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Split-Screen Tracking — Visual Tracking & Gaze Calibration Drill | SkillDrills",
    description: "Condition divided attention by tracking dual targets moving along vertical and horizontal axes. Free browser-based visual tracking drill.",
  },
};

export default function SplitScreenTrackingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Visual Tracking", "item": "https://skilldrills.online/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Split-Screen Tracking", "item": "https://skilldrills.online/drills/visual-tracking/split-screen-tracking" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Split-Screen Tracking Drill",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "An interactive web-based visual tracking drill to condition divided attention across dual independent movement planes.",
    "url": "https://skilldrills.online/drills/visual-tracking/split-screen-tracking",
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
        "name": "What is the Split-Screen Tracking drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Split-Screen Tracking drill conditions divided visual attention by requiring your eyes to monitor two targets moving along orthogonal vertical and horizontal planes simultaneously."
        }
      },
      {
        "@type": "Question",
        "name": "Why use the 'Hide Line' setting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hiding the center split line and movement axes forces your visual cortex to process dual-field movements without visual region dividers."
        }
      },
      {
        "@type": "Question",
        "name": "What does the Random Speed feature do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Random Speed introduces independent velocity fluctuations between the left vertical and right horizontal targets, strengthening ocular motor control."
        }
      },
      {
        "@type": "Question",
        "name": "How long should I practice visual tracking daily?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We recommend 5 to 10 minutes of daily visual tracking training before gaming or athletic practice to warm up ocular muscles and reduce eye fatigue."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SplitScreenTrackingClient />
    </>
  );
}
