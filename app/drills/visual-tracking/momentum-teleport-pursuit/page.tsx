import MomentumTeleportPursuitClient from './MomentumTeleportPursuitClient';

export const metadata = {
  title: "Momentum Teleport Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
  description: "Predict target direction after coordinates instantly teleport while maintaining velocity momentum. Free browser-based visual tracking drill with customizable speed, duration, and random acceleration.",
  keywords: [
    "momentum teleport pursuit",
    "visual tracking drill",
    "smooth pursuit eye training",
    "teleporting target tracking",
    "gaze stability exercise",
    "esports vision training",
    "athletic vision drill",
    "ocular motor training",
    "eye tracking practice online"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/momentum-teleport-pursuit",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Momentum Teleport Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
    description: "Predict target direction after coordinates instantly teleport while maintaining velocity momentum. Free browser-based visual tracking drill.",
    url: "https://skilldrills.online/drills/visual-tracking/momentum-teleport-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Momentum Teleport Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
    description: "Predict target direction after coordinates instantly teleport while maintaining velocity momentum. Free browser-based visual tracking drill.",
  },
};

export default function MomentumTeleportPursuitPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Visual Tracking", "item": "https://skilldrills.online/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Momentum Teleport Pursuit", "item": "https://skilldrills.online/drills/visual-tracking/momentum-teleport-pursuit" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Momentum Teleport Pursuit Drill",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "An interactive web-based visual tracking drill to condition rapid saccadic re-acquisition after coordinate teleportation while maintaining velocity momentum.",
    "url": "https://skilldrills.online/drills/visual-tracking/momentum-teleport-pursuit",
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
        "name": "What is the Momentum Teleport Pursuit drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Momentum Teleport Pursuit drill conditions visual tracking agility by forcing your eyes to snap to new target coordinates after instant teleportation while predicting its continuous momentum trajectory."
        }
      },
      {
        "@type": "Question",
        "name": "Why use the 'Hide Line' setting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hiding vector path lines forces your visual motor cortex to react dynamically to real-time object movement without visual direction cues."
        }
      },
      {
        "@type": "Question",
        "name": "What does the Random Speed feature do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Random Speed introduces unpredictable acceleration bursts and random teleport intervals, strengthening eye muscle modulation under erratic speeds."
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

      <MomentumTeleportPursuitClient />
    </>
  );
}
