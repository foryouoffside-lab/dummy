import StrobeLatencyClient from './StrobeLatencyClient';

export const metadata = {
  title: 'Light Reaction Pro - Visual Reflex & Reaction Time Test | SkillDrills',
  description: 'Train visual reflex speed with Light Reaction test. Measure millisecond reaction latency when target flashes white, zero penalties, 45s session. Free.',
  keywords: [
    'light reaction test',
    'visual reaction time test',
    'reflex training game',
    'reaction speed test',
    'strobe latency test online',
    'simple reaction time test',
    'millisecond reaction test',
    'visual reflex drill',
    'skilldrills light reaction',
  ],
  openGraph: {
    title: 'Light Reaction Pro - Visual Reflex & Reaction Time Test | SkillDrills',
    description: 'Train visual reflex speed with Light Reaction test. Measure millisecond reaction latency when target flashes white, zero penalties. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual/reaction-speed/light-reaction',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Light Reaction Pro - Visual Reflex & Reaction Time Test | SkillDrills',
    description: 'Train visual reflex speed with Light Reaction test. Measure millisecond reaction latency when target flashes white, zero penalties. Free.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/reaction-speed/light-reaction',
  },
};

export default function StrobeLatencyPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Visual Training", "item": "https://skilldrills.online/drills/visual" },
              { "@type": "ListItem", "position": 3, "name": "Reaction Speed", "item": "https://skilldrills.online/drills/visual/reaction-speed" },
              { "@type": "ListItem", "position": 4, "name": "Light Reaction Pro" }
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
            "name": "Light Reaction Pro Drill",
            "url": "https://skilldrills.online/drills/visual/reaction-speed/light-reaction",
            "description": "Free visual reflex speed test. Measure millisecond reaction latency when target flashes white, zero negative penalties, clean 45-second timer.",
            "applicationCategory": "EducationalApplication",
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
                "name": "What is the Light Reaction Pro Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free visual reflex speed test. Tap the target as fast as possible when it flashes bright white."
                }
              },
              {
                "@type": "Question",
                "name": "What is a good visual reaction time?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Average human visual reaction time is ~250ms, while elite gamers and reflex athletes consistently achieve sub-180ms reaction latencies."
                }
              },
              {
                "@type": "Question",
                "name": "How does progressive difficulty work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Every 5 successful hits you level up, and the flash window shrinks from 300ms down to a 100ms floor, while the inter-flash delay stays randomized between 1000ms and 2500ms so the strobe timing can't be anticipated."
                }
              },
              {
                "@type": "Question",
                "name": "Are there negative score or time penalties?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Premature taps or missed flashes never deduct score points or reduce remaining timer seconds — you simply wait for the next flash."
                }
              },
              {
                "@type": "Question",
                "name": "Does difficulty decrease on mistakes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. The level remains unchanged when a mistake is made, allowing you to master your current level."
                }
              },
              {
                "@type": "Question",
                "name": "How long does each drill session last?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Each round is timed for exactly 45 seconds of continuous focus."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <StrobeLatencyClient />
    </>
  );
}