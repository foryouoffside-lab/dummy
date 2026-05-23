import ProSmoothPursuitClient from './ProSmoothPursuitClient';

export const metadata = {
  title: 'Pro Smooth Pursuit - Lissajous Track | SkillDrills',
  description: 'Track Lissajous curve targets at 360Hz with raw mouse input. +1pt every 2 seconds on target. 60-second FPS aim challenge. No sign-up.',
  keywords: [
    'pro smooth pursuit', 'Lissajous tracking', 'precision aim trainer',
    '360Hz aim drill', 'professional FPS training', 'smooth pursuit aim',
    'tracking accuracy drill', 'pro level tracking', 'continuous aim training',
    'mouse precision drill', 'FPS aim practice', 'competitive gaming training',
    'free aim trainer online', 'high refresh tracking', 'smooth aim practice',
    'pointer lock aim trainer', 'raw mouse input training', 'Valorant aim trainer',
    'CS2 tracking practice', 'Overwatch aim drill', 'Apex Legends tracking',
    'FPS tracking exercise', 'mouse control practice', 'hand eye coordination FPS',
    'smooth tracking drill', 'target tracking practice', 'aim consistency training',
    'esports tracking drill', 'gaming mouse practice', 'pro gamer aim training',
    'skilldrills tracking', 'skilldrills FPS', 'free FPS drills',
    'online aim practice', 'browser aim trainer', 'no download aim practice',
  ],
  openGraph: {
    title: 'Pro Smooth Pursuit - Lissajous Track | SkillDrills',
    description: 'Lissajous curve tracking with raw mouse input. Free FPS aim training.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/pro-smooth-pursuit',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Pro Smooth Pursuit',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pro Smooth Pursuit - Lissajous Track | SkillDrills',
    description: '360Hz Lissajous curve tracking. Raw mouse input. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/pro-smooth-pursuit',
  },
};

export default function ProSmoothPursuitPage() {
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
              { "@type": "ListItem", "position": 3, "name": "Pro Smooth Pursuit" }
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
            "name": "Pro Smooth Pursuit",
            "url": "https://skilldrills.online/drills/fps/pro-smooth-pursuit",
            "description": "Free pro-level tracking drill with Lissajous curve movement at 360Hz. Raw mouse input via Pointer Lock API. +1 point every 2 seconds on target.",
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
                "name": "What is the Pro Smooth Pursuit drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free advanced FPS aim drill using Lissajous curve patterns at 360Hz. Raw mouse input via Pointer Lock API for the most accurate tracking practice."
                }
              },
              {
                "@type": "Question",
                "name": "What is a Lissajous curve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A complex mathematical pattern from two perpendicular sine waves. Creates unpredictable figure-8 or spiral movement that simulates real player movement."
                }
              },
              {
                "@type": "Question",
                "name": "What games does this help with?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Valorant, CS2, Overwatch 2, Apex Legends, Call of Duty, Rainbow Six Siege, Fortnite, Escape from Tarkov, Destiny 2, and Quake."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This smooth pursuit drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <ProSmoothPursuitClient />
    </>
  );
}