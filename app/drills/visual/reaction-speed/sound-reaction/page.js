import NeuroSwitchClient from './NeuroSwitchClient';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
    { "@type": "ListItem", "position": 2, "name": "Visual Training", "item": "https://skilldrills.online/drills/visual" },
    { "@type": "ListItem", "position": 3, "name": "Reaction Speed", "item": "https://skilldrills.online/drills/visual/reaction-speed" },
    { "@type": "ListItem", "position": 4, "name": "Sound Reaction Test", "item": "https://skilldrills.online/drills/visual/reaction-speed/sound-reaction" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Sound Reaction Time Test – Free Auditory Reflex Game",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Measure your auditory reaction speed online. Listen for the pitch changes and click corresponding targets to test your reflex latency in milliseconds.",
  "url": "https://skilldrills.online/drills/visual/reaction-speed/sound-reaction",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "890" }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Sound Reaction test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An auditory reaction and decision drill where you must respond to pitch changes (high tone vs low tone) by selecting the matching color targets."
      }
    },
    {
      "@type": "Question",
      "name": "How does pitch mapping work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A high-pitch tone (1200Hz) directs you to click the green circle, while a low-pitch tone (250Hz) directs you to click the red circle."
      }
    },
    {
      "@type": "Question",
      "name": "Why is sound reaction faster than visual?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Auditory signals take around 8-10ms to reach the brain, whereas visual signals take 20-40ms, making auditory reflex arcs slightly faster than visual ones."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to sign up?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No registration is required. The Sound Reaction test is completely free and works instantly in your browser."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Measure Your Auditory Reaction Speed Online",
  "description": "Test and train your brain's audio reflex times using our free online Sound Reaction drill.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Turn Up Sound",
      "text": "Ensure your audio is active and volume is comfortable before starting the drill."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Listen for Tone Cues",
      "text": "Start the drill and listen for a random tone cue. A high pitch signals green, a low pitch signals red."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Click Matching Target",
      "text": "Immediately click or tap the corresponding color target circle to score points and add time."
    }
  ]
};

export const metadata = {
  title: "Sound Reaction Time Test | Free Auditory Reflex Game | SkillDrills",
  description: "Measure your auditory reaction speed online. Listen for the pitch changes and click corresponding targets to test your reflex latency in milliseconds.",
  keywords: [
    "sound reaction test",
    "audio reaction time test",
    "auditory reaction speed test",
    "hearing reaction speed test online",
    "sound reflex training game"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual/reaction-speed/sound-reaction",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Sound Reaction Time Test | Free Auditory Reflex Game | SkillDrills",
    description: "Measure your auditory reaction speed online. Listen for the pitch changes and click corresponding targets to test your reflex latency in milliseconds.",
    url: "https://skilldrills.online/drills/visual/reaction-speed/sound-reaction",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: "Sound Reaction Time Test" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sound Reaction Time Test | Free Auditory Reflex Game | SkillDrills",
    description: "Measure your auditory reaction speed online. Listen for the pitch changes and click corresponding targets to test your reflex latency in milliseconds.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

export default function NeuroSwitchPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <NeuroSwitchClient />
    </>
  );
}