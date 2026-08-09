import InfinityPursuitClient from './InfinityPursuitClient';

export const metadata = {
  title: "Infinity Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
  description: "Track a target moving along a continuous figure-8 Lemniscate path. Free browser-based visual tracking drill with customizable speed, duration, and random acceleration.",
  keywords: [
    "infinity pursuit",
    "visual tracking drill",
    "smooth pursuit eye training",
    "figure-8 eye exercise",
    "lemniscate gaze tracking",
    "esports vision training",
    "athletic vision drill",
    "ocular motor training",
    "eye tracking practice online"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/infinity-pursuit",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Infinity Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
    description: "Track a target moving along a continuous figure-8 Lemniscate path. Free browser-based visual tracking drill.",
    url: "https://skilldrills.online/drills/visual-tracking/infinity-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Infinity Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
    description: "Track a target moving along a continuous figure-8 Lemniscate path. Free browser-based visual tracking drill.",
  },
};

export default function InfinityPursuitPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Visual Tracking", "item": "https://skilldrills.online/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Infinity Pursuit", "item": "https://skilldrills.online/drills/visual-tracking/infinity-pursuit" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Infinity Pursuit Drill",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "An interactive web-based visual tracking drill to condition smooth ocular pursuit along continuous figure-8 trajectories.",
    "url": "https://skilldrills.online/drills/visual-tracking/infinity-pursuit",
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
        "name": "What is the Infinity Pursuit drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Infinity Pursuit drill exercises smooth pursuit eye movements by having your eyes track a target along a continuous figure-8 Lemniscate curve."
        }
      },
      {
        "@type": "Question",
        "name": "Why use the 'Hide Line' setting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hiding the figure-8 guide line forces your visual system to track the moving target purely based on real-time visual input rather than path cues."
        }
      },
      {
        "@type": "Question",
        "name": "What does the Random Speed feature do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Random Speed introduces unpredictable acceleration and deceleration along the figure-8 path, challenging your visual motor cortex to dynamically adjust focus speeds."
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

      <InfinityPursuitClient />
    </>
  );
}
