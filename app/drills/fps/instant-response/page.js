import InstantResponseClient from './InstantResponseClient';

export const metadata = {
  title: 'Instant Response Trainer - Raw Reflex FPS Aim Drill | SkillDrills',
  description: 'Train pure reaction speed with raw mouse input. Adaptive 80-1200ms response window, 3 lives, millisecond tracking. For Valorant, CS2, Apex. No sign-up.',
  keywords: [
    'instant response drill', 'reaction speed test', 'adaptive window training',
    'FPS reflex drill', 'center flash reaction', 'pure reaction time',
    'response window training', 'reaction click test', 'FPS reaction practice',
    'instant reflex drill', 'adaptive reaction training', 'free reaction test',
    'speed response drill', 'reaction time improvement',
    'raw input aim trainer', 'pointer lock reflex', 'FPS aim reflex',
    'Valorant reflex training', 'CS2 reaction drill', 'Overwatch aim practice',
    'Apex Legends reflex', 'competitive FPS training', 'esports reflex drill',
    'mouse reflex test', 'click timing practice', 'target flash reaction',
    'free FPS trainer', 'online reflex test', 'browser aim drill',
    'skilldrills instant response', 'skilldrills reflex drill',
    'free reaction time test', 'adaptive aim trainer', 'raw mouse input drill',
    'reflex improvement', 'reaction speed training', 'gaming reflex practice',
  ],
  openGraph: {
    title: 'Instant Response Trainer - FPS Reflex Drill | SkillDrills',
    description: 'Raw mouse input. Adaptive 80-1200ms window. 3 lives. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/instant-response',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Instant Response Trainer',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Instant Response Trainer | SkillDrills',
    description: 'Raw mouse input reflex drill. Adaptive window. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/instant-response',
  },
};

export default function InstantResponsePage() {
  return (
    <>
      <noscript>
        <h1>Instant Response Trainer - Raw Reflex & Adaptive Window FPS Aim Drill</h1>
        <p>Free FPS reflex drill with raw mouse input and adaptive response window. No sign-up required.</p>
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
              { "@type": "ListItem", "position": 3, "name": "Instant Response" }
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
            "name": "Instant Response Trainer",
            "url": "https://skilldrills.online/drills/fps/instant-response",
            "description": "Free FPS reflex drill with raw mouse input. Adaptive 80-1200ms response window, 3 lives, and millisecond reaction tracking.",
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
                "name": "What is the Instant Response Trainer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free FPS reflex drill with raw mouse input. Target flashes at center randomly. Adaptive 80-1200ms window shrinks with fast hits, expands on misses."
                }
              },
              {
                "@type": "Question",
                "name": "How does the adaptive window work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Starts at 250ms. Fast hits shrink window to 80ms minimum. Misses expand to 1200ms maximum. Always challenging at your skill level."
                }
              },
              {
                "@type": "Question",
                "name": "What FPS games does this help?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Valorant, CS2, Overwatch 2, Apex Legends, Call of Duty, Rainbow Six Siege, Fortnite, Escape from Tarkov, and Destiny 2."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This reflex trainer is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <InstantResponseClient />
    </>
  );
}