import ReactionDrillClient from './ReactionDrillClient';

export const metadata = {
  title: '240FPS Reaction Drill - Click Timing & FPS Reflex Training | SkillDrills',
  description: 'Train click timing with a 200ms flash window. Raw mouse input, 5 lives, millisecond reaction tracking, and combo streaks. For Valorant, CS2, and all FPS games. No sign-up.',
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
    title: '240FPS Reaction Drill - FPS Reflex Training | SkillDrills',
    description: 'Train click timing with 200ms flash window. Raw input, 5 lives. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/240fps-click-test',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: '240FPS Reaction Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '240FPS Reaction Drill | SkillDrills',
    description: 'Train FPS reflexes with 200ms flash window. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/240fps-click-test',
  },
};

export default function ReactionDrillPage() {
  return (
    <>
      <noscript>
        <h1>240FPS Reaction Drill - Click Timing & Reflex Training for FPS Gaming</h1>
        <p>Free FPS reaction drill with 200ms flash window and raw mouse input. No sign-up required.</p>
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
            "name": "240FPS Reaction Drill",
            "url": "https://skilldrills.online/drills/fps/240fps-click-test",
            "description": "Free FPS reaction drill with 200ms flash window. Raw mouse input via Pointer Lock API. 5 lives, millisecond reaction tracking, and combo streaks.",
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
                "name": "What is the 240FPS Reaction Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free FPS training tool where a target flashes white for 200ms. Click during this window to score. Raw mouse input via Pointer Lock API with millisecond reaction tracking."
                }
              },
              {
                "@type": "Question",
                "name": "How does scoring work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "+1 point per successful hit during the flash. 5 lives lost on early clicks. After lives are gone, early clicks deduct points. Consecutive hits build combo streaks."
                }
              },
              {
                "@type": "Question",
                "name": "Does this help with Valorant and CS2?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Directly trains visual reaction time and click timing needed for winning gunfights in tactical shooters."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This reaction drill is completely free and works instantly in your browser."
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