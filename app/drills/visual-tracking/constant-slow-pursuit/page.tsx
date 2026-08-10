import ConstantSlowPursuitClient from './ConstantSlowPursuitClient';

export const metadata = {
  title: "Constant Slow Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
  description: "Train smooth pursuit eye movements along a continuous Lissajous curve. Adjustable speed and duration build steady low-velocity gaze control.",
  keywords: [
    "constant slow pursuit",
    "visual tracking drill",
    "smooth pursuit eye training",
    "gaze stability exercise",
    "esports vision training",
    "athletic vision drill",
    "ocular motor training",
    "eye tracking practice online"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/constant-slow-pursuit",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Constant Slow Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
    description: "Train smooth pursuit eye movements along a continuous Lissajous curve. Free browser-based visual tracking drill.",
    url: "https://skilldrills.online/drills/visual-tracking/constant-slow-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Constant Slow Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
    description: "Train smooth pursuit eye movements along a continuous Lissajous curve. Free browser-based visual tracking drill.",
  },
};

export default function ConstantSlowPursuitPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Visual Tracking", "item": "https://skilldrills.online/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Constant Slow Pursuit", "item": "https://skilldrills.online/drills/visual-tracking/constant-slow-pursuit" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Constant Slow Pursuit Drill",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "An interactive web-based visual tracking drill to condition smooth pursuit eye movement and gaze calibration.",
    "url": "https://skilldrills.online/drills/visual-tracking/constant-slow-pursuit",
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
        "name": "What is the Constant Slow Pursuit drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Constant Slow Pursuit drill exercises smooth pursuit eye movements by having your eyes track a target along a continuous Lissajous path at controlled or randomized speeds."
        }
      },
      {
        "@type": "Question",
        "name": "Why use the 'Hide Line' setting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hiding the guide lines forces your eyes to track the moving target purely based on dynamic visual input rather than relying on visual path cues."
        }
      },
      {
        "@type": "Question",
        "name": "What does the Random Speed feature do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Random Speed introduces unpredictable acceleration and deceleration along the tracking path, challenging your visual motor cortex to dynamically adjust focus speeds."
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

      <ConstantSlowPursuitClient />
    </>
  );
}
