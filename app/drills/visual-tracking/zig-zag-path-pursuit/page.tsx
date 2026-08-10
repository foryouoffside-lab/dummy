import ZigZagPathPursuitClient from './ZigZagPathPursuitClient';

export const metadata = {
  title: "Zig-Zag Path Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
  description: "Track target movements along a multi-segment zig-zag guide path. Builds gaze accuracy through sharp directional corners.",
  keywords: [
    "zig zag path pursuit",
    "visual tracking drill",
    "smooth pursuit eye training",
    "zig zag eye tracking",
    "saccadic direction shifts",
    "esports vision training",
    "athletic vision drill",
    "ocular motor training",
    "eye tracking practice online"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/zig-zag-path-pursuit",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Zig-Zag Path Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
    description: "Track target movements along a multi-segment zig-zag guide path. Free browser-based visual tracking drill.",
    url: "https://skilldrills.online/drills/visual-tracking/zig-zag-path-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Zig-Zag Path Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
    description: "Track target movements along a multi-segment zig-zag guide path. Free browser-based visual tracking drill.",
  },
};

export default function ZigZagPathPursuitPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Visual Tracking", "item": "https://skilldrills.online/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Zig-Zag Path Pursuit", "item": "https://skilldrills.online/drills/visual-tracking/zig-zag-path-pursuit" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Zig-Zag Path Pursuit Drill",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "An interactive web-based visual tracking drill to condition smooth pursuit eye movements across multi-segment zig-zag paths.",
    "url": "https://skilldrills.online/drills/visual-tracking/zig-zag-path-pursuit",
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
        "name": "What is the Zig-Zag Path Pursuit drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Zig-Zag Path Pursuit drill conditions visual pursuit accuracy across acute direction changes as a target traverses a multi-segment zig-zag polyline."
        }
      },
      {
        "@type": "Question",
        "name": "Why use the 'Hide Line' setting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hiding the zig-zag guide path forces your eyes to anticipate sharp diagonal turns without visual path indicators."
        }
      },
      {
        "@type": "Question",
        "name": "What does the Random Speed feature do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Random Speed introduces variable segment traversal speeds and abrupt direction reversals, strengthening ocular motor control."
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

      <ZigZagPathPursuitClient />
    </>
  );
}
