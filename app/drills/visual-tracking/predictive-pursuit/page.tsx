import PredictivePursuitClient from './PredictivePursuitClient';

export const metadata = {
  title: "Predictive Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
  description: "Interpolate path trajectory of a moving target node and execute predictive gaze shifts. Builds anticipatory tracking ahead of the target's actual position.",
  keywords: [
    "predictive pursuit",
    "visual tracking drill",
    "smooth pursuit eye training",
    "predictive gaze shifts",
    "saccadic anticipation",
    "esports vision training",
    "athletic vision drill",
    "ocular motor training",
    "eye tracking practice online"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/predictive-pursuit",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Predictive Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
    description: "Interpolate path trajectory of a moving target node and execute predictive gaze shifts. Free browser-based visual tracking drill.",
    url: "https://skilldrills.online/drills/visual-tracking/predictive-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Predictive Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
    description: "Interpolate path trajectory of a moving target node and execute predictive gaze shifts. Free browser-based visual tracking drill.",
  },
};

export default function PredictivePursuitPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Visual Tracking", "item": "https://skilldrills.online/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Predictive Pursuit", "item": "https://skilldrills.online/drills/visual-tracking/predictive-pursuit" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Predictive Pursuit Drill",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "An interactive web-based visual tracking drill to condition trajectory prediction and predictive saccadic eye movements.",
    "url": "https://skilldrills.online/drills/visual-tracking/predictive-pursuit",
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
        "name": "What is the Predictive Pursuit drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Predictive Pursuit drill exercises trajectory interpolation by requiring your eyes to predict upcoming target landing coordinates along smooth motion vectors."
        }
      },
      {
        "@type": "Question",
        "name": "Why use the 'Hide Line' setting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hiding trajectory prediction lines forces your visual motor cortex to calculate target landing points mentally without static path guides."
        }
      },
      {
        "@type": "Question",
        "name": "What does the Random Speed feature do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Random Speed introduces unpredictable interpolation speeds and variable landing intervals, strengthening eye muscle modulation under erratic speeds."
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

      <PredictivePursuitClient />
    </>
  );
}
