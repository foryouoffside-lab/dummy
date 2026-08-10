import DynamicEvasionPursuitClient from './DynamicEvasionPursuitClient';

export const metadata = {
  title: "Dynamic Evasion Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
  description: "Train fast-reaction visual pursuit tracking against rapid evasive directional changes. Sharpens gaze reaction speed against sudden evasive turns.",
  keywords: [
    "dynamic evasion pursuit",
    "visual tracking drill",
    "smooth pursuit eye training",
    "evasive target tracking",
    "gaze stability exercise",
    "esports vision training",
    "athletic vision drill",
    "ocular motor training",
    "eye tracking practice online"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/dynamic-evasion-pursuit",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Dynamic Evasion Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
    description: "Train fast-reaction visual pursuit tracking against rapid evasive directional changes. Free browser-based visual tracking drill.",
    url: "https://skilldrills.online/drills/visual-tracking/dynamic-evasion-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Dynamic Evasion Pursuit — Visual Tracking & Gaze Calibration Drill | SkillDrills",
    description: "Train fast-reaction visual pursuit tracking against rapid evasive directional changes. Free browser-based visual tracking drill.",
  },
};

export default function DynamicEvasionPursuitPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Visual Tracking", "item": "https://skilldrills.online/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Dynamic Evasion Pursuit", "item": "https://skilldrills.online/drills/visual-tracking/dynamic-evasion-pursuit" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Dynamic Evasion Pursuit Drill",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "An interactive web-based visual tracking drill to condition rapid gaze re-acquisition against sudden evasive directional shifts.",
    "url": "https://skilldrills.online/drills/visual-tracking/dynamic-evasion-pursuit",
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
        "name": "What is the Dynamic Evasion Pursuit drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Dynamic Evasion Pursuit drill conditions visual tracking agility by forcing your eyes to re-acquire targets executing sudden periodic evasion vector shifts."
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
          "text": "Random Speed introduces unpredictable acceleration bursts and random evasion timings, strengthening eye muscle modulation under erratic speeds."
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

      <DynamicEvasionPursuitClient />
    </>
  );
}
