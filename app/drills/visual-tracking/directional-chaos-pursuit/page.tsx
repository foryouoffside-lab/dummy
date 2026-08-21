import DirectionalChaosPursuitClient from './DirectionalChaosPursuitClient';
import DrillGuide from '../../../../components/drill/DrillGuide';
import { GUIDES } from '../guides';

export const metadata = {
  title: "Directional Chaos Pursuit - Erratic Motion Eye Drill",
  description: "Track a bouncing target subjected to continuous chaotic velocity nudges. Trains gaze recovery from unpredictable, erratic motion.",
  keywords: [
    "directional chaos pursuit",
    "visual tracking drill",
    "smooth pursuit eye training",
    "chaotic movement tracking",
    "gaze stability exercise",
    "esports vision training",
    "athletic vision drill",
    "ocular motor training",
    "eye tracking practice online"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/directional-chaos-pursuit",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Directional Chaos Pursuit - Erratic Motion Eye Drill | SkillDrills",
    description: "Track a bouncing target subjected to continuous chaotic velocity nudges. Free browser-based visual tracking drill.",
    url: "https://skilldrills.online/drills/visual-tracking/directional-chaos-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Directional Chaos Pursuit - Erratic Motion Eye Drill | SkillDrills",
    description: "Track a bouncing target subjected to continuous chaotic velocity nudges. Free browser-based visual tracking drill.",
  },
};

export default function DirectionalChaosPursuitPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Visual Tracking", "item": "https://skilldrills.online/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Directional Chaos Pursuit", "item": "https://skilldrills.online/drills/visual-tracking/directional-chaos-pursuit" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Directional Chaos Pursuit Drill",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "An interactive web-based visual tracking drill to condition eye pursuit against erratic chaotic velocity changes.",
    "url": "https://skilldrills.online/drills/visual-tracking/directional-chaos-pursuit",
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
        "name": "What is the Directional Chaos Pursuit drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Directional Chaos Pursuit drill conditions visual tracking agility by forcing your eyes to follow a target moving with continuous random velocity nudges and boundary bounces."
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
  const guide = GUIDES['directional-chaos-pursuit'];
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

      <DirectionalChaosPursuitClient />
      <DrillGuide guide={guide} />
    </>
  );
}
