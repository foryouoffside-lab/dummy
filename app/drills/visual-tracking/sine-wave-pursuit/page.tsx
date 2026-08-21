import SineWavePursuitClient from './SineWavePursuitClient';
import DrillGuide from '../../../../components/drill/DrillGuide';
import { GUIDES } from '../guides';

export const metadata = {
  title: "Sine Wave Pursuit - Smooth Pursuit Eye Training",
  description: "Track target oscillations along a horizontal sine wave curve. Builds smooth pursuit through continuous rhythmic motion.",
  keywords: [
    "sine wave pursuit",
    "visual tracking drill",
    "smooth pursuit eye training",
    "sinusoidal eye movement",
    "gaze stability exercise",
    "esports vision training",
    "athletic vision drill",
    "ocular motor training",
    "eye tracking practice online"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual-tracking/sine-wave-pursuit",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Sine Wave Pursuit - Smooth Pursuit Eye Training | SkillDrills",
    description: "Track target oscillations along a horizontal sine wave curve. Free browser-based visual tracking drill.",
    url: "https://skilldrills.online/drills/visual-tracking/sine-wave-pursuit",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sine Wave Pursuit - Smooth Pursuit Eye Training | SkillDrills",
    description: "Track target oscillations along a horizontal sine wave curve. Free browser-based visual tracking drill.",
  },
};

export default function SineWavePursuitPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Visual Tracking", "item": "https://skilldrills.online/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Sine Wave Pursuit", "item": "https://skilldrills.online/drills/visual-tracking/sine-wave-pursuit" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Sine Wave Pursuit Drill",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "An interactive web-based visual tracking drill to condition sinusoidal smooth pursuit eye movements along wave trajectories.",
    "url": "https://skilldrills.online/drills/visual-tracking/sine-wave-pursuit",
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
        "name": "What is the Sine Wave Pursuit drill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Sine Wave Pursuit drill trains smooth pursuit tracking agility by requiring your eyes to follow a target oscillating along harmonic sine wave trajectories."
        }
      },
      {
        "@type": "Question",
        "name": "Why use the 'Hide Line' setting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hiding sine wave path guide lines forces your visual cortex to track continuous motion dynamics purely from the target's real-time position."
        }
      },
      {
        "@type": "Question",
        "name": "What does the Random Speed feature do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Random Speed introduces unpredictable frequency oscillations and speed acceleration bursts, strengthening ocular motor control."
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
  const guide = GUIDES['sine-wave-pursuit'];
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

      <SineWavePursuitClient />
      <DrillGuide guide={guide} />
    </>
  );
}
