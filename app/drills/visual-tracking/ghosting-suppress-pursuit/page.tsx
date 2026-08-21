import GhostingSuppressPursuitClient from './GhostingSuppressPursuitClient';
import DrillGuide from '../../../../components/drill/DrillGuide';
import { GUIDES } from '../guides';

export const metadata = {
  title: "Ghosting Suppress - Eye Fixation Stability Training",
  description: "Train foveal tracking precision by suppressing motion ghosting artifacts and visual lag. Sharpens fixation stability against blur and afterimage drift.",
  keywords: [
    "ghosting suppress pursuit",
    "visual tracking drill",
    "smooth pursuit eye training",
    "motion blur suppression",
    "gaze stability exercise",
    "esports vision training",
    "athletic vision drill",
    "ocular motor training",
    "eye tracking practice online"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/ghosting-suppress-pursuit",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Ghosting Suppress - Eye Fixation Stability Training | SkillDrills",
    description: "Train foveal tracking precision by suppressing motion ghosting artifacts and visual lag. Free browser-based visual tracking drill.",
    url: "https://skilldrills.online/drills/visual-tracking/ghosting-suppress-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ghosting Suppress - Eye Fixation Stability Training | SkillDrills",
    description: "Train foveal tracking precision by suppressing motion ghosting artifacts and visual lag. Free browser-based visual tracking drill.",
  },
};

export default function GhostingSuppressPursuitPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Visual Tracking", "item": "https://skilldrills.online/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Ghosting Suppress Pursuit", "item": "https://skilldrills.online/drills/visual-tracking/ghosting-suppress-pursuit" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Ghosting Suppress Pursuit Drill",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "An interactive web-based visual tracking drill to suppress motion blur clutter and isolate true target trajectory.",
    "url": "https://skilldrills.online/drills/visual-tracking/ghosting-suppress-pursuit",
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
        "name": "What is the Ghosting Suppress Pursuit drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Ghosting Suppress Pursuit drill trains your visual system to suppress motion ghosting and trailing artifacts, helping your eyes lock onto true target coordinates."
        }
      },
      {
        "@type": "Question",
        "name": "Why use the 'Hide Line' setting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hiding trajectory indicators forces your visual motor cortex to react dynamically to real-time object movement without visual direction cues."
        }
      },
      {
        "@type": "Question",
        "name": "What does the Random Speed feature do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Random Speed introduces unpredictable acceleration bursts, strengthening eye muscle modulation under erratic speeds."
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
  const guide = GUIDES['ghosting-suppress-pursuit'];
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

      <GhostingSuppressPursuitClient />
      <DrillGuide guide={guide} />
    </>
  );
}
