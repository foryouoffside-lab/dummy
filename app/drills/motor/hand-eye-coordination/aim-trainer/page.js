import AimTrainerClient from './AimTrainerClient';

export const metadata = {
  title: 'Aim Trainer Elite - Mouse Accuracy & Coordination | SkillDrills',
  description: 'Dynamic shrinking targets from 20px to 8px with streak progression. 3-life system, reaction tracking. For FPS gaming and mouse control. No sign-up.',
  keywords: [
    'aim trainer', 'mouse accuracy', 'click trainer', 'hand-eye coordination',
    'aim training', 'fps aim practice', 'reaction time test', 'target clicking',
    'mouse precision', 'aim drill', 'accuracy trainer', 'gaming aim trainer',
    'free aim trainer', 'mouse coordination', 'click speed test',
    'aim trainer free', 'mouse accuracy drill free', 'hand eye coordination training',
    'fps aim trainer', 'target practice drill', 'mouse control training',
    'precision clicking drill', 'gaming mouse practice', 'aim training online',
    'skilldrills aim trainer', 'skilldrills motor drills', 'skilldrills fps',
    'shrinking target trainer', 'reaction time drill', 'click accuracy practice',
    'mouse precision test', 'cursor accuracy training', 'aim practice free',
  ],
  openGraph: {
    title: 'Aim Trainer Elite - Mouse Accuracy | SkillDrills',
    description: 'Dynamic shrinking targets with 3-life system. Free FPS aim training.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/hand-eye-coordination/aim-trainer',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Aim Trainer Elite',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aim Trainer Elite | SkillDrills',
    description: 'Dynamic shrinking targets. Streak-based colors. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/hand-eye-coordination/aim-trainer',
  },
};

export default function AimTrainerPage() {
  return (
    <>
      <noscript>
        <h1>Aim Trainer Elite - Mouse Accuracy & Hand-Eye Coordination Training</h1>
        <p>Free aim trainer with dynamic shrinking targets and 3-life system. No sign-up required.</p>
      </noscript>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "Motor Training", "item": "https://skilldrills.online/drills/motor" },
              { "@type": "ListItem", "position": 3, "name": "Hand-Eye Coordination", "item": "https://skilldrills.online/drills/motor/hand-eye-coordination" },
              { "@type": "ListItem", "position": 4, "name": "Aim Trainer" }
            ]
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Aim Trainer Elite",
            "url": "https://skilldrills.online/drills/motor/hand-eye-coordination/aim-trainer",
            "description": "Free aim trainer with shrinking targets (20px to 8px). 3-life system, streak-based color progression. Reaction time tracking in milliseconds.",
            "applicationCategory": "GameApplication",
            "operatingSystem": "All",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "author": { "@type": "Organization", "name": "SkillDrills" },
            "isAccessibleForFree": true
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is the Aim Trainer Elite?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free mouse accuracy drill. Targets shrink from 20px to 8px with streak. 3-life system: misclicks cost lives first, then points. Expired targets incur no penalty."
                }
              },
              {
                "@type": "Question",
                "name": "How does the shrinking target system work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Targets shrink 0.15px per streak count (min 8px). Colors: white (0-7), green (8-14), cyan (15+). Lifespan decreases with streak. 10x streak bonuses."
                }
              },
              {
                "@type": "Question",
                "name": "What skills does this improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Mouse precision, click accuracy, target tracking, reaction speed, and hand-eye coordination. Transfers to FPS gaming and general computer use."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This aim trainer is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <AimTrainerClient />
    </>
  );
}