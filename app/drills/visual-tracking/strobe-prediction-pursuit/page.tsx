import StrobePredictionPursuitClient from './StrobePredictionPursuitClient';

export const metadata = {
  title: "Strobe Prediction Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
  description: "Predict target locations during cyclic strobe occlusion intervals. Trains gaze prediction through brief target occlusion.",
  keywords: [
    "strobe prediction pursuit",
    "visual tracking drill",
    "smooth pursuit eye training",
    "strobe vision training",
    "occluded target tracking",
    "esports vision training",
    "athletic vision drill",
    "ocular motor training",
    "eye tracking practice online"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/strobe-prediction-pursuit",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Strobe Prediction Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
    description: "Predict target locations during cyclic strobe occlusion intervals. Free browser-based visual tracking drill.",
    url: "https://skilldrills.online/drills/visual-tracking/strobe-prediction-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Strobe Prediction Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
    description: "Predict target locations during cyclic strobe occlusion intervals. Free browser-based visual tracking drill.",
  },
};

export default function StrobePredictionPursuitPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Visual Tracking", "item": "https://skilldrills.online/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Strobe Prediction Pursuit", "item": "https://skilldrills.online/drills/visual-tracking/strobe-prediction-pursuit" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Strobe Prediction Pursuit Drill",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "An interactive web-based visual tracking drill to condition mental trajectory extrapolation during cyclic target strobe occlusion phases.",
    "url": "https://skilldrills.online/drills/visual-tracking/strobe-prediction-pursuit",
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
        "name": "What is the Strobe Prediction Pursuit drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Strobe Prediction Pursuit drill conditions visual trajectory extrapolation by periodically occluding the target in dark strobe phases, forcing your brain to predict continuous motion."
        }
      },
      {
        "@type": "Question",
        "name": "Why use the 'Hide Line' setting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hiding ghost target outlines during the dark strobe phase forces pure mental extrapolation without visual reference cues."
        }
      },
      {
        "@type": "Question",
        "name": "What does the Random Speed feature do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Random Speed modulates strobe flash frequency and velocity spikes unpredictably, strengthening ocular motor control."
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

      <StrobePredictionPursuitClient />
    </>
  );
}
