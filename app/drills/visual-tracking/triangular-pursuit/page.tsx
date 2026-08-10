import TriangularPursuitClient from './TriangularPursuitClient';

export const metadata = {
  title: "Triangular Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
  description: "Track target transitions along a triangular vector path. Builds smooth pursuit through sharp triangular direction changes.",
  keywords: [
    "triangular pursuit",
    "visual tracking drill",
    "smooth pursuit eye training",
    "triangular vector tracking",
    "gaze stability exercise",
    "esports vision training",
    "athletic vision drill",
    "ocular motor training",
    "eye tracking practice online"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/triangular-pursuit",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Triangular Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
    description: "Track target transitions along a triangular vector path. Free browser-based visual tracking drill.",
    url: "https://skilldrills.online/drills/visual-tracking/triangular-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Triangular Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
    description: "Track target transitions along a triangular vector path. Free browser-based visual tracking drill.",
  },
};

export default function TriangularPursuitPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Visual Tracking", "item": "https://skilldrills.online/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Triangular Pursuit", "item": "https://skilldrills.online/drills/visual-tracking/triangular-pursuit" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Triangular Pursuit Drill",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "An interactive web-based visual tracking drill to condition smooth pursuit eye movements along triangular vertex vectors.",
    "url": "https://skilldrills.online/drills/visual-tracking/triangular-pursuit",
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
        "name": "What is the Triangular Pursuit drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Triangular Pursuit drill conditions smooth pursuit agility by requiring your eyes to follow a target moving continuously around a triangular geometric path."
        }
      },
      {
        "@type": "Question",
        "name": "Why use the 'Hide Line' setting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hiding triangular vector guide lines forces your visual cortex to track vertex transitions purely from the target's real-time position."
        }
      },
      {
        "@type": "Question",
        "name": "What does the Random Speed feature do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Random Speed introduces variable segment transition speeds and random direction reversals across triangular vertices."
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

      <TriangularPursuitClient />
    </>
  );
}
