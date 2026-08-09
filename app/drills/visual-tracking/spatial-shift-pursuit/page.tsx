import SpatialShiftPursuitClient from './SpatialShiftPursuitClient';

export const metadata = {
  title: "Spatial Shift Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
  description: "Track a bouncing target undergoing randomized spatial shifts in speed and direction. Free browser-based visual tracking drill with customizable speed, duration, and random acceleration.",
  keywords: [
    "spatial shift pursuit",
    "visual tracking drill",
    "smooth pursuit eye training",
    "spatial gaze re-acquisition",
    "gaze stability exercise",
    "esports vision training",
    "athletic vision drill",
    "ocular motor training",
    "eye tracking practice online"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/spatial-shift-pursuit",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Spatial Shift Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
    description: "Track a bouncing target undergoing randomized spatial shifts in speed and direction. Free browser-based visual tracking drill.",
    url: "https://skilldrills.online/drills/visual-tracking/spatial-shift-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Spatial Shift Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
    description: "Track a bouncing target undergoing randomized spatial shifts in speed and direction. Free browser-based visual tracking drill.",
  },
};

export default function SpatialShiftPursuitPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Visual Tracking", "item": "https://skilldrills.online/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Spatial Shift Pursuit", "item": "https://skilldrills.online/drills/visual-tracking/spatial-shift-pursuit" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Spatial Shift Pursuit Drill",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "An interactive web-based visual tracking drill to condition spatial velocity shift re-acquisition and ocular tracking agility.",
    "url": "https://skilldrills.online/drills/visual-tracking/spatial-shift-pursuit",
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
        "name": "What is the Spatial Shift Pursuit drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Spatial Shift Pursuit drill conditions visual tracking agility by forcing your eyes to adapt to sudden randomized shifts in target velocity and spatial vectors."
        }
      },
      {
        "@type": "Question",
        "name": "Why use the 'Hide Line' setting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hiding velocity path vectors forces your visual system to track instantaneous direction shifts without visual motion cues."
        }
      },
      {
        "@type": "Question",
        "name": "What does the Random Speed feature do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Random Speed introduces unpredictable shift frequencies and magnitude spikes, strengthening ocular motor control."
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

      <SpatialShiftPursuitClient />
    </>
  );
}
