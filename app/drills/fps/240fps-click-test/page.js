import ReactionDrillClient from './ReactionDrillClient';

export const metadata = {
  title: 'Free 240FPS Reaction Drill - Click Timing & Reflex Training for FPS Gaming | SkillDrills',
  description: 'Train your click timing and reflex speed with this free FPS reaction drill. Features a 200ms flash window, 5 lives system with penalty scoring, millisecond reaction tracking, combo streaks, and detailed accuracy analytics. Essential training for Valorant, CS2, Overwatch, and all competitive shooters. No sign-up required.',
  keywords: [
    '240fps reaction drill', 'click timing test', 'FPS reflex training', 'reaction time drill',
    'click reflex test', 'gaming reaction speed', '200ms reaction window',
    'reflex training FPS', 'aim reaction drill', 'click speed test online',
    'reaction time training', 'FPS click drill', 'free reaction test',
    'gaming reflexes practice', 'pointer lock aim trainer', 'raw input trainer',
    'Valorant reflex training', 'CS2 reaction drill', 'Overwatch aim practice',
    'esports reaction training', 'competitive gaming drills', 'free FPS trainer',
    'skilldrills reaction', 'skilldrills FPS drill', 'online reflex test',
    'visual reaction speed', 'hand-eye coordination test', 'mouse click speed',
  ],
  openGraph: {
    title: 'Free 240FPS Reaction Drill - FPS Click Timing & Reflex Training | SkillDrills',
    description: 'Train click timing with a 200ms flash window. Features raw input, lives system, and analytics. Free for all FPS gamers.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/240fps-click-test',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: '240FPS Reaction Drill - FPS Gaming Reflex Training',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free 240FPS Reaction Drill | SkillDrills',
    description: 'Train your FPS reflexes. 200ms flash, 5 lives, raw input. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': 320,
    },
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/240fps-click-test',
    languages: {
      'en': 'https://skilldrills.online/drills/fps/240fps-click-test',
      'en-US': 'https://skilldrills.online/drills/fps/240fps-click-test',
      'x-default': 'https://skilldrills.online/drills/fps/240fps-click-test',
    },
  },
  verification: {
    google: 'bf3e19be4c41802b',
  },
};

export default function ReactionDrillPage() {
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
              { "@type": "ListItem", "position": 3, "name": "240FPS Reaction Drill" }
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
            "name": "240FPS Reaction Drill - FPS Click Timing & Reflex Training",
            "url": "https://skilldrills.online/drills/fps/240fps-click-test",
            "description": "Free interactive FPS reaction training drill with a 200ms flash window, 5 lives system, and raw mouse input via Pointer Lock API. Tracks reaction time in milliseconds, combo streaks, and accuracy.",
            "applicationCategory": "GamingApplication",
            "operatingSystem": "All",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
            "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
            "publisher": { "@type": "Organization", "name": "SkillDrills" },
            "educationalUse": ["FPS Gaming Training", "Reflex Training", "Click Timing Practice", "Esports Preparation"],
            "learningResourceType": ["Interactive Exercise", "Reflex Drill", "Speed Test"],
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Reaction Time", "Click Timing", "Hand-Eye Coordination", "Visual Processing Speed"],
            "datePublished": "2026-05-20",
            "dateModified": new Date().toISOString().split('T')[0],
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
                "name": "What is the 240FPS Reaction Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "It's a free FPS training tool where a target flashes white for 200ms. You must click during this window to score points. It uses Pointer Lock API for raw mouse input, features a 5 lives system, and tracks your reaction time down to the millisecond."
                }
              },
              {
                "@type": "Question",
                "name": "How does the scoring system work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You get +1 point for a successful hit during the 200ms flash. You have 5 lives, and lose one for clicking when the target is not white. If you run out of lives, further early clicks deduct points from your score. Consecutive hits build a combo streak."
                }
              },
              {
                "@type": "Question",
                "name": "Is this drill helpful for FPS games like Valorant or CS2?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, absolutely. This drill directly trains the visual reaction time and click timing accuracy needed for winning gunfights in tactical shooters. The raw input mode eliminates OS mouse acceleration for more consistent practice."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up to use this reaction trainer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration, no sign-up, and no login is required. This reaction drill is completely free and works instantly in your browser. Your best scores are saved locally."
                }
              }
            ]
          })
        }}
      />
      <ReactionDrillClient />
    </>
  );
}