import PredictiveTrackingClient from './PredictiveTrackingClient';

export const metadata = {
  title: 'Predictive Tracking Trainer - FPS Lead Aim & Anticipation | SkillDrills',
  description: 'Master predictive aim by clicking where targets WILL be. 12-frame lead prediction, velocity arrows, raw mouse input. For Valorant, CS2, Apex. No sign-up.',
  keywords: [
    'predictive tracking', 'lead aim training', 'movement anticipation drill',
    'predictive aim FPS', 'enemy prediction practice', 'leading shots training',
    'velocity prediction drill', 'target leading aim', 'FPS prediction trainer',
    'movement reading drill', 'predictive click training', 'free aim prediction',
    'lead aim practice', 'anticipation tracking FPS', 'raw input aim trainer',
    'pointer lock aim drill', 'prediction circle trainer', 'ghost target tracking',
    'FPS aim improvement', 'Valorant aim trainer', 'CS2 tracking practice',
    'Apex Legends aim drill', 'Overwatch tracking trainer', 'competitive FPS practice',
    'mouse accuracy training', 'target prediction exercise', 'shoot ahead training',
    'skilldrills predictive', 'skilldrills FPS drill', 'free FPS aim practice',
    'online aim trainer free', 'browser FPS trainer', 'no download aim practice',
    'tracking weapons practice', 'SMG tracking drill', 'AR aim training',
  ],
  openGraph: {
    title: 'Predictive Tracking Trainer - FPS Lead Aim | SkillDrills',
    description: 'Raw mouse input, 12-frame prediction, shatter effects. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/predictive-tracking',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Predictive Tracking Trainer',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Predictive Tracking Trainer | SkillDrills',
    description: 'Master lead aim with 12-frame prediction. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/predictive-tracking',
  },
};

export default function PredictiveTrackingPage() {
  return (
    <>
      <noscript>
        <h1>Predictive Tracking Trainer - FPS Enemy Movement Anticipation & Lead Aim Drill</h1>
        <p>Free predictive tracking drill with 12-frame lead prediction and raw mouse input. No sign-up required.</p>
      </noscript>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "FPS Training", "item": "https://skilldrills.online/drills/fps" },
              { "@type": "ListItem", "position": 3, "name": "Predictive Tracking" }
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
            "name": "Predictive Tracking Trainer",
            "url": "https://skilldrills.online/drills/fps/predictive-tracking",
            "description": "Free FPS predictive tracking drill with 12-frame lead prediction, velocity arrows, raw mouse input, and shatter effects. 60-second challenge.",
            "applicationCategory": "GamingApplication",
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
                "name": "What is predictive tracking in FPS?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The skill of aiming where a target WILL be, not where it is. A 12-frame prediction circle shows the lead point. Click it to score hits."
                }
              },
              {
                "@type": "Question",
                "name": "How does the 12-frame prediction work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Calculates target velocity and displays a prediction circle 12 frames ahead. Velocity arrows and dashed lines guide your aim."
                }
              },
              {
                "@type": "Question",
                "name": "What games does this help with?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Valorant, CS2, Overwatch 2, Apex Legends, Call of Duty, Rainbow Six Siege, Fortnite, Rust, Escape from Tarkov, Destiny 2."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This predictive tracking trainer is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <PredictiveTrackingClient />
    </>
  );
}