import PeripheralPingPursuitClient from './PeripheralPingPursuitClient';

export const metadata = {
  title: "Peripheral Ping Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
  description: "Fixate on center crosshairs while detecting transient targets spawning in your peripheral view. Trains peripheral awareness without breaking central fixation.",
  keywords: [
    "peripheral ping pursuit",
    "visual tracking drill",
    "smooth pursuit eye training",
    "peripheral vision test",
    "gaze stability exercise",
    "esports vision training",
    "athletic vision drill",
    "ocular motor training",
    "eye tracking practice online"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/peripheral-ping-pursuit",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Peripheral Ping Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
    description: "Fixate on center crosshairs while detecting transient targets spawning in your peripheral view. Free browser-based visual tracking drill.",
    url: "https://skilldrills.online/drills/visual-tracking/peripheral-ping-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Peripheral Ping Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
    description: "Fixate on center crosshairs while detecting transient targets spawning in your peripheral view. Free browser-based visual tracking drill.",
  },
};

export default function PeripheralPingPursuitPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Visual Tracking", "item": "https://skilldrills.online/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Peripheral Ping Pursuit", "item": "https://skilldrills.online/drills/visual-tracking/peripheral-ping-pursuit" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Peripheral Ping Pursuit Drill",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "An interactive web-based visual tracking drill to condition peripheral awareness while maintaining central gaze fixation.",
    "url": "https://skilldrills.online/drills/visual-tracking/peripheral-ping-pursuit",
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
        "name": "What is the Peripheral Ping Pursuit drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Peripheral Ping Pursuit drill conditions peripheral visual awareness by requiring you to fixate on a center crosshair while detecting transient targets flashing across outer visual fields."
        }
      },
      {
        "@type": "Question",
        "name": "Why use the 'Hide Line' setting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hiding peripheral ring indicators forces your visual system to detect target flashes purely based on peripheral luminance changes without static grid lines."
        }
      },
      {
        "@type": "Question",
        "name": "What does the Random Speed feature do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Random Speed introduces unpredictable flash timings and variable target durations, strengthening peripheral reactivity under erratic conditions."
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

      <PeripheralPingPursuitClient />
    </>
  );
}
