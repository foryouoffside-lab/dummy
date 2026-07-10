import AutoPursuitClient from './AutoPursuitClient';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
    { "@type": "ListItem", "position": 2, "name": "Visual Training", "item": "https://skilldrills.online/drills/visual" },
    { "@type": "ListItem", "position": 3, "name": "Tracking Accuracy", "item": "https://skilldrills.online/drills/visual/tracking-accuracy" },
    { "@type": "ListItem", "position": 4, "name": "Smooth Pursuit Tracker", "item": "https://skilldrills.online/drills/visual/tracking-accuracy/pursuit-tracker" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Smooth Pursuit Tracker – Free Visual Aim Training Game",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Measure your continuous hand-eye target follow accuracy. Keep your cursor on the unpredictably moving orb to evaluate smooth pursuit speed and coordination.",
  "url": "https://skilldrills.online/drills/visual/tracking-accuracy/pursuit-tracker",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "1205" }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Smooth Pursuit Tracker?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An interactive tool to train and assess smooth pursuit eye movement and hand-eye alignment by maintaining a cursor on a moving visual target."
      }
    },
    {
      "@type": "Question",
      "name": "How is the performance score calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You gain points continuously for every half-second (+1 PTS) that your cursor remains inside the bounds of the moving target."
      }
    },
    {
      "@type": "Question",
      "name": "How does difficulty scale?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As your score increases, the target's base speed increases and the size of the target shrinks, demanding more precise smooth tracking."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a score penalty for losing track?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. When your cursor exits the target, scoring pauses, but you do not lose any accrued points."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Train Eye Tracking Speed with Smooth Pursuit Drill",
  "description": "Improve your motor coordination and tracking alignment using our free online Smooth Pursuit Tracker.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Start the Trial",
      "text": "Click START to spawn the target orb in the center of the tracking canvas."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Follow the Target",
      "text": "Hover your mouse cursor or position your touch input directly over the green target orb."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Maintain Contact",
      "text": "Keep your cursor locked inside the moving target as it changes direction and accelerates to compound your score."
    }
  ]
};

export const metadata = {
  title: "Smooth Pursuit Tracker | Free Visual Aim Training Game | SkillDrills",
  description: "Measure your continuous hand-eye target follow accuracy. Keep your cursor on the unpredictably moving orb to evaluate smooth pursuit speed and coordination.",
  keywords: [
    "visual pursuit test",
    "smooth pursuit training",
    "visual tracking exercises",
    "dynamic visual tracking test",
    "pursuit aim trainer"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/visual/tracking-accuracy/pursuit-tracker",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Smooth Pursuit Tracker | Free Visual Aim Training Game | SkillDrills",
    description: "Measure your continuous hand-eye target follow accuracy. Keep your cursor on the unpredictably moving orb to evaluate smooth pursuit speed and coordination.",
    url: "https://skilldrills.online/drills/visual/tracking-accuracy/pursuit-tracker",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: "Smooth Pursuit Tracker" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Smooth Pursuit Tracker | Free Visual Aim Training Game | SkillDrills",
    description: "Measure your continuous hand-eye target follow accuracy. Keep your cursor on the unpredictably moving orb to evaluate smooth pursuit speed and coordination.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
};

export default function AutoPursuitPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <AutoPursuitClient />
    </>
  );
}