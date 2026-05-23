import ProTrackingClient from './ProTrackingClient';

export const metadata = {
  title: 'Pro Tracking - Raw Input Aim Drill | SkillDrills',
  description: 'Master FPS tracking with raw mouse input. Track green target among 6 bouncing balls with 1.5s switches and infinite speed scaling. +5pts/sec. No sign-up.',
  keywords: [
    'pro tracking drill', 'FPS tracking trainer', 'raw input aim trainer',
    'multi target switching', 'speed aim training', 'target switch practice',
    'FPS tracking drill free', 'high speed tracking', 'target acquisition speed',
    'adaptive speed tracking', 'professional aim trainer', 'switching targets FPS',
    'free tracking trainer', 'pointer lock aim drill', 'raw mouse input training',
    'tracking aim practice', 'smooth aim training', 'reactive tracking drill',
    'Valorant tracking practice', 'CS2 aim trainer', 'Overwatch tracking drill',
    'Apex Legends aim practice', 'esports tracking training', 'competitive FPS drill',
    'infinite speed scaling', 'combo tracking drill', 'accuracy tracking trainer',
    'skilldrills pro tracking', 'skilldrills aim trainer', 'free FPS training',
    'online aim drill', 'browser aim trainer', 'no download tracking practice',
    'mouse control training', 'hand eye coordination FPS', 'gaming aim improvement',
  ],
  openGraph: {
    title: 'Pro Tracking - Raw Input Aim Drill | SkillDrills',
    description: 'Raw mouse input tracking with 1.5s switches and infinite speed scaling. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/pro-tracking',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Pro Tracking Trainer',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pro Tracking - Raw Input Aim Drill | SkillDrills',
    description: 'Raw input tracking with infinite speed scaling. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/pro-tracking',
  },
};

export default function ProTrackingPage() {
  return (
    <>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "FPS Training", "item": "https://skilldrills.online/drills/fps" },
              { "@type": "ListItem", "position": 3, "name": "Pro Tracking" }
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
            "name": "Pro Tracking Trainer",
            "url": "https://skilldrills.online/drills/fps/pro-tracking",
            "description": "Free FPS tracking drill with raw mouse input. Track green target among 6 balls with 1.5s switches and infinite speed scaling. Real-time accuracy tracking.",
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
                "name": "What is the Pro Tracking Trainer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free FPS aim drill with raw mouse input. Track a green target among 6 bouncing balls. Target switches every 1.5s with infinite speed scaling."
                }
              },
              {
                "@type": "Question",
                "name": "How fast does the target switch?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Every 1.5 seconds. Each switch increases ball speed by 10 units. Speed scales infinitely for progressively harder tracking."
                }
              },
              {
                "@type": "Question",
                "name": "What games does this help with?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Valorant, CS2, Overwatch 2, Apex Legends, Call of Duty, Rainbow Six Siege, Fortnite, Quake Champions."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This pro tracking trainer is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <ProTrackingClient />
    </>
  );
}