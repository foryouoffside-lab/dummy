import StaircaseStepClient from './StaircaseStepClient';
import DrillGuide from '../../../../components/drill/DrillGuide';
import { GUIDES } from '../guides';

export const metadata = {
  title: "Vertical Zig-Zag - Vertical Eye Tracking Exercise",
  description: "Track target movements along a vertical multi-segment zig-zag polyline. Builds vertical gaze accuracy through sharp directional steps.",
  keywords: [
    "vertical zig zag pursuit",
    "visual tracking drill",
    "smooth pursuit eye training",
    "vertical eye tracking",
    "saccadic direction shifts",
    "esports vision training",
    "athletic vision drill",
    "ocular motor training",
    "eye tracking practice online"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/staircase-step",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Vertical Zig-Zag - Vertical Eye Tracking Exercise | SkillDrills",
    description: "Track target movements along a vertical multi-segment zig-zag polyline. Free browser-based visual tracking drill.",
    url: "https://skilldrills.online/drills/visual-tracking/staircase-step",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Vertical Zig-Zag - Vertical Eye Tracking Exercise | SkillDrills",
    description: "Track target movements along a vertical multi-segment zig-zag polyline. Free browser-based visual tracking drill.",
  },
};

export default function StaircaseStepPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Visual Tracking", "item": "https://skilldrills.online/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Vertical Zig-Zag Pursuit", "item": "https://skilldrills.online/drills/visual-tracking/staircase-step" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Vertical Zig-Zag Pursuit Drill",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "An interactive web-based visual tracking drill to condition smooth pursuit eye movements across vertical multi-segment zig-zag paths.",
    "url": "https://skilldrills.online/drills/visual-tracking/staircase-step",
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
        "name": "What is the Vertical Zig-Zag Pursuit drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Vertical Zig-Zag Pursuit drill conditions visual tracking precision across acute direction changes as a target traverses a vertical multi-segment zig-zag polyline."
        }
      },
      {
        "@type": "Question",
        "name": "Why use the 'Hide Line' setting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hiding guide lines forces your visual cortex to adapt to sharp vertical direction changes without pre-rendered path indicators."
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

  // The guide block below renders extra Q&As; append them to the FAQPage
  // schema so the structured data matches what is actually on the page.
  const guide = GUIDES['staircase-step'];
  faqSchema.mainEntity = faqSchema.mainEntity.concat(
    (guide?.faqs || []).map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    }))
  );


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

      <StaircaseStepClient />
      <DrillGuide guide={guide} />
    </>
  );
}
