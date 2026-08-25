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
        "text": "You earn +5 PTS every time you keep your cursor locked onto the moving target for a full continuous second."
      }
    },
    {
      "@type": "Question",
      "name": "How does difficulty scale?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As your score and streak increase, the orb's maximum speed rises and its hitbox shrinks slightly — with no hard ceiling on either, so the challenge keeps building the longer you last."
      }
    },
    {
      "@type": "Question",
      "name": "Are there negative score or time penalties?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Losing the target for more than 2 seconds resets your streak, but you never lose accrued score points or remaining timer seconds."
      }
    },
    {
      "@type": "Question",
      "name": "How long does each drill session last?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Each round is timed for exactly 45 seconds of continuous tracking."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to sign up?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No registration required. This drill runs directly in your browser with instant response."
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
  title: "Smooth Pursuit Test - Free Eye Tracking Accuracy Game",
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
    title: "Smooth Pursuit Test - Free Eye Tracking Accuracy Game | SkillDrills",
    description: "Measure your continuous hand-eye target follow accuracy. Keep your cursor on the unpredictably moving orb to evaluate smooth pursuit speed and coordination.",
    url: "https://skilldrills.online/drills/visual/tracking-accuracy/pursuit-tracker",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Smooth Pursuit Test - Free Eye Tracking Accuracy Game | SkillDrills",
    description: "Measure your continuous hand-eye target follow accuracy. Keep your cursor on the unpredictably moving orb to evaluate smooth pursuit speed and coordination.",
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