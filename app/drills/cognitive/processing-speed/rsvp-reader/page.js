import RSVPReaderClient from './RSVPReaderClient';

export const metadata = {
  title: 'RSVP Speed Reader - Visual Training | SkillDrills',
  description: 'Train visual processing speed with RSVP target-detection. Words flash at the Optimal Recognition Point across 5 progressive levels, 250-850 WPM. Free, no sign-up.',
  keywords: [
    'RSVP reader', 'speed reading tool', 'rapid serial visual presentation',
    'optimal recognition point training', 'reading speed training', 'WPM improvement',
    'speed reading practice', 'visual reading drill', 'fast reading practice online',
    'RSVP training', 'reading comprehension speed', 'cognitive reading',
    'free speed reading app', 'online RSVP reader',
    'word flashing reader', 'single point reading', 'fixation reading',
    'eye movement reduction', 'reading speed booster',
    'speed reading technique', 'rapid reading method', 'visual word recognition',
    'reading fluency training', 'text processing speed', 'reading efficiency',
    'speed reading for students', 'speed reading for professionals', 'exam reading prep',
    'IELTS reading practice', 'TOEFL reading speed', 'GRE verbal practice',
    'GMAT reading comprehension', 'SAT reading improvement',
    'speed reading for adults', 'beginner speed reading',
    'advanced speed reading', 'reading speed tracker', 'WPM calculator',
    'words per minute test', 'reading pace trainer', 'speed reading online free',
    'skilldrills RSVP', 'skilldrills speed reader', 'skilldrills reading drill',
    'free online reading tool', 'browser speed reader', 'no download RSVP',
  ],
  openGraph: {
    title: 'RSVP Speed Reader - Visual Training | SkillDrills',
    description: 'Train visual processing speed with RSVP target-detection. Words flash at the Optimal Recognition Point across 5 progressive levels, 250-850 WPM. Free, no sign-up.',
    type: 'website',
    url: 'https://skilldrills.online/drills/cognitive/processing-speed/rsvp-reader',
    siteName: 'SkillDrills',
    locale: 'en_US',
    // No `images` here on purpose — opengraph-image.js in this folder generates a
    // proper 1200x630 card at build time and Next injects og:image automatically.
    // A manually hardcoded 512x512 icon here would be the wrong aspect ratio and
    // silently downgrade the twitter summary_large_image card.
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RSVP Speed Reader - Visual Training | SkillDrills',
    description: 'Train visual processing speed with RSVP target-detection. Words flash at the Optimal Recognition Point across 5 progressive levels, 250-850 WPM. Free, no sign-up.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/processing-speed/rsvp-reader',
  },
};

export default function RSVPReaderPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Cognitive Drills", "item": "https://skilldrills.online/drills/cognitive" },
              { "@type": "ListItem", "position": 3, "name": "Processing Speed", "item": "https://skilldrills.online/drills/cognitive/processing-speed" },
              { "@type": "ListItem", "position": 4, "name": "RSVP Speed Reader" }
            ]
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "RSVP Speed Reader",
            "applicationCategory": "GameApplication",
            "operatingSystem": "Web Browser",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "description": "Free interactive RSVP target-detection drill. Words flash at the Optimal Recognition Point across 5 progressive levels from 250 to 850 WPM.",
            "genre": "Cognitive Training / Processing Speed",
            "url": "https://skilldrills.online/drills/cognitive/processing-speed/rsvp-reader",
            "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" }
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoGame",
            "name": "RSVP Speed Reader",
            "gamePlatform": "Web Browser",
            "genre": ["Cognitive Training", "Processing Speed Trainer"],
            "playMode": "SinglePlayer",
            "applicationCategory": "Game",
            "url": "https://skilldrills.online/drills/cognitive/processing-speed/rsvp-reader",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
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
                "name": "What is an RSVP speed reader?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "RSVP displays words one at a time at a single focal point, eliminating eye movements. Words flash at the Optimal Recognition Point for maximum comprehension at speeds from 100 to 1000 WPM."
                }
              },
              {
                "@type": "Question",
                "name": "What is the Optimal Recognition Point?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The ORP is the position within a word where the eye can most efficiently recognize it. Aligning each word at its ORP maximizes recognition speed and comprehension."
                }
              },
              {
                "@type": "Question",
                "name": "How fast does this drill get?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The drill has 5 progressive speed tiers: Level 1 (250 WPM) up to Level 5 (850 WPM). Catching target words accurately advances you to the next tier, and each session runs for 45 seconds against a 5-life budget."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This RSVP speed reader is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Play RSVP Speed Reader",
            "description": "Step-by-step instructions for training reading speed and processing speed with the SkillDrills RSVP trainer.",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Watch the Word Stream",
                "text": "Words flash rapidly at a single focal point (Optimal Recognition Point) in the central display."
              },
              {
                "@type": "HowToStep",
                "name": "Track the Target Word",
                "text": "A designated target word is assigned at the start of each passage segment — watch the stream closely for it."
              },
              {
                "@type": "HowToStep",
                "name": "Tap on Detection",
                "text": "Tap 'Target Detected' immediately when the designated target word flashes. Every 200 points earned increases your level and reading speed, up to 850 WPM. Wrong taps and missed targets cost 1 of your 5 lives."
              }
            ]
          })
        }}
      />

      <RSVPReaderClient />
    </>
  );
}